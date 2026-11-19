/* AI PO Coach: UI and routing. Local only. No network use. */
(function () {
  "use strict";
  var BUILD = "20261119.2000";
  var KEY = "aipocoach.v1", THEME_KEY = "aipocoach.theme";
  var A = window.AIPO, L = window.Logic, M = window.Mascot;
  var DOMAINS = A.domains;
  var C = {
    domains: DOMAINS, lessons: A.lessons, questions: A.questions, cards: A.cards,
    scenarios: A.scenarios, why: A.why, glossary: A.glossary || []
  };
  var domById = {}, qById = {}, cardById = {}, lessonById = {};
  DOMAINS.forEach(function (d) { domById[d.id] = d; });
  C.questions.forEach(function (q) { qById[q.id] = q; });
  C.cards.forEach(function (c) { cardById[c.id] = c; });
  C.lessons.forEach(function (l) { lessonById[l.id] = l; });

  /* ---------- storage ---------- */
  var storageOK = true;
  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { storageOK = false; return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { storageOK = false; } }
  var S;
  function load() {
    var raw = lsGet(KEY), obj = null;
    if (raw) { try { obj = JSON.parse(raw); } catch (e) { obj = null; } }
    S = L.normalizeState(obj);
  }
  function save() { lsSet(KEY, JSON.stringify(S)); }
  function today() { return L.dayNum(new Date()); }

  /* ---------- dom helpers ---------- */
  function h(tag, props) {
    var el = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (k) {
      var v = props[k];
      if (v === null || v === undefined || v === false) return;
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k === "svg") el.innerHTML = v; /* trusted internal artwork only */
      else if (k.indexOf("on") === 0) el.addEventListener(k.slice(2), v);
      else if (v === true) el.setAttribute(k, "");
      else el.setAttribute(k, v);
    });
    for (var i = 2; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  }
  function add(el, c) {
    if (c === null || c === undefined || c === false) return;
    if (Array.isArray(c)) c.forEach(function (x) { add(el, x); });
    else if (typeof c === "string" || typeof c === "number") el.appendChild(document.createTextNode(String(c)));
    else el.appendChild(c);
  }
  function paras(text) {
    return String(text || "").split(/\n\s*\n|\\n\\n/).map(function (p) { return p.replace(/\\n/g, " ").replace(/\n/g, " ").trim(); }).filter(Boolean);
  }
  function pEls(text, cls) { return paras(text).map(function (p) { return h("p", { text: p, class: cls }); }); }
  function mascot(mood, size) { return h("span", { class: "mascot", svg: M.svg(mood, size) }); }
  function pct(x) { return Math.round(x * 100); }
  function bar(p, big) { return h("div", { class: "bar" + (big ? " big" : ""), role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(p) }, h("i", { style: "width:" + Math.max(0, Math.min(100, p)) + "%" })); }
  function btn(label, onclick, cls, extra) { return h("button", Object.assign({ type: "button", class: "btn " + (cls || ""), onclick: onclick, text: label }, extra || {})); }
  function link(label, href, cls) { return h("a", { class: "btn " + (cls || ""), href: href, text: label }); }
  function fmtDate(iso) { var d = new Date(iso + "T00:00:00"); return isNaN(d) ? iso : d.toLocaleDateString(undefined, { day: "numeric", month: "short" }); }
  function fmtDay(n) { return fmtDate(L.dayISO(n)); }
  function toast(msg) {
    var t = h("div", { class: "toast", role: "status", text: msg });
    document.body.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 2600);
  }
  var NUMW = ["", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX"];

  /* ---------- progress recording ---------- */
  function touch(domain, n) {
    var t = today();
    S.days = L.recordDay(S.days, t, n || 1);
    if (domain) S.last[domain] = t;
    S.snaps = L.takeSnapshot(S, C, DOMAINS, t);
    save();
  }
  function answerQuestion(q, correct) {
    S.q[q.id] = L.record(S.q[q.id], correct, today());
    touch(q.domain, 1);
  }
  function answerCard(c, ok) {
    S.c[c.id] = L.record(S.c[c.id], ok, today());
    touch(c.domain, 1);
  }

  /* ---------- theme ---------- */
  function applyTheme() {
    var t = lsGet(THEME_KEY), root = document.documentElement;
    if (t === "light" || t === "dark") root.setAttribute("data-theme", t); else root.removeAttribute("data-theme");
    var dark = t === "dark" || (t !== "light" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", dark ? "#0a1020" : "#0f766e");
  }

  /* ---------- routing ---------- */
  var main = document.getElementById("main"), navEl = document.querySelector("nav.tabs"), overlay = document.getElementById("overlay");
  var routes = {};
  function parse() {
    var hsh = (location.hash || "#/home").replace(/^#\/?/, "");
    var qi = hsh.indexOf("?"), qs = {};
    if (qi >= 0) { hsh.slice(qi + 1).split("&").forEach(function (kv) { var p = kv.split("="); qs[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || ""); }); hsh = hsh.slice(0, qi); }
    var parts = hsh.split("/").filter(Boolean).map(decodeURIComponent);
    return { name: parts[0] || "home", args: parts.slice(1), qs: qs };
  }
  function go(path) { if (location.hash === "#" + path) render(); else location.hash = path; }
  var TABS = [["home", "Home", "⌂"], ["learn", "Learn", "☰"], ["practice", "Practice", "✎"], ["cards", "Cards", "▣"], ["more", "More", "…"]];
  var TAB_OF = { home: "home", learn: "learn", lesson: "learn", glossary: "learn", practice: "practice", play: "practice", result: "practice", cards: "cards", more: "more", review: "more", plan: "more", capstone: "more", settings: "more", about: "more" };
  function renderNav(name) {
    navEl.textContent = "";
    TABS.forEach(function (t) {
      var a = h("a", { href: "#/" + t[0] }, h("span", { class: "ico", "aria-hidden": "true", text: t[2] }), h("span", { text: t[1] }));
      if (TAB_OF[name] === t[0]) a.setAttribute("aria-current", "page");
      navEl.appendChild(a);
    });
  }
  var lastRoute = null;
  function render() {
    var r = parse();
    var fn = routes[r.name] || routes.home;
    main.textContent = "";
    try { fn(r); } catch (e) {
      main.appendChild(h("div", { class: "card" }, h("h1", { text: "Something went wrong" }), h("p", { text: "This screen could not be shown. Your progress is safe." }), link("Go home", "#/home", "primary")));
      if (window.console) console.error(e);
    }
    renderNav(r.name);
    if (!lastRoute || lastRoute !== location.hash) { window.scrollTo(0, 0); }
    lastRoute = location.hash;
    showFirstRun();
  }

  /* ---------- first run ---------- */
  function showFirstRun() {
    overlay.textContent = "";
    if (S.ack) return;
    var ok = btn("I understand", function () { S.ack = true; save(); overlay.textContent = ""; var f = main.querySelector("h1"); if (f) { f.setAttribute("tabindex", "-1"); f.focus(); } }, "primary block", { id: "ack" });
    overlay.appendChild(h("div", { class: "modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "fr-t" },
      h("div", { class: "sheet" },
        h("div", { class: "mascot", svg: M.svg("happy", 96) }),
        h("h2", { id: "fr-t", text: "Before you start" }),
        h("p", { text: "AI PO Coach is original study material for learning AI product ownership. Please read this once." }),
        h("ul", { class: "bullets" },
          h("li", { text: "All content was drafted by AI and has not been reviewed by a human." }),
          h("li", { text: "It is not official guidance from any standards body or vendor, and it is not legal advice." }),
          h("li", { text: "It draws on public sources; the About screen lists them with versions." }),
          h("li", { text: "Everything stays on this device. Nothing is sent anywhere." })),
        ok)));
    setTimeout(function () { var a = document.getElementById("ack"); if (a) a.focus(); }, 30);
  }

  /* ---------- HOME ---------- */
  function lastPractised(dom) { return S.last[dom] ? fmtDay(S.last[dom]) : "Not yet"; }
  routes.home = function () {
    var t = today();
    if (!S.snaps[L.dayISO(t)] && (Object.keys(S.q).length || Object.keys(S.c).length || Object.keys(S.lessons).length)) { S.snaps = L.takeSnapshot(S, C, DOMAINS, t); save(); }
    var ready = L.readiness(S, C, DOMAINS), rp = pct(ready);
    var st = L.streak(S.days, t), todayN = S.days[L.dayISO(t)] || 0;
    var due = L.dueIds(S, C, t);
    var lessonsDone = C.lessons.filter(function (l) { return S.lessons[l.id]; }).length;
    var seenQ = L.countSeen(S.q);
    main.appendChild(h("div", { class: "hero" },
      h("div", { class: "badge", "aria-label": st + " day streak" }, h("span", { svg: M.svg(todayN > 0 ? "happy" : "neutral", 84) }), h("span", { class: "num", "aria-hidden": "true", text: st })),
      h("div", {}, h("h1", { text: "AI PO Coach" }), h("div", { class: "muted", text: st ? st + (st === 1 ? " day streak" : " day streak") : "Start a streak today" }))));
    var na = L.nextAction(S, C, DOMAINS, t), nac;
    if (na.type === "review") nac = ["Reviews are due", na.count + " items are ready for spaced review (" + na.qCount + " questions, " + na.cCount + " cards).", "Start review", "#/review"];
    else if (na.type === "lesson") nac = [(Object.keys(S.lessons).length ? "Next lesson in your weakest area" : "Start with the first lesson"), lessonById[na.lesson].title, "Open lesson", "#/lesson/" + na.lesson];
    else nac = ["Drill your weakest domain", domById[na.domain].name, "Start a 10 question drill", "#/play?kind=drill&domain=" + na.domain + "&n=10"];
    main.appendChild(h("section", { class: "card accent", "aria-labelledby": "nba" }, h("div", { class: "small muted", text: "Next best action" }), h("h2", { id: "nba", text: nac[0] }), h("p", { text: nac[1] }), link(nac[2], nac[3], "primary block")));
    main.appendChild(h("section", { class: "card", "aria-labelledby": "rdy" },
      h("h2", { id: "rdy", text: "Overall readiness" }),
      h("div", { class: "row" },
        h("div", { class: "ring", style: "--p:" + rp + "%", role: "img", "aria-label": "Overall readiness " + rp + " percent" }, h("div", { class: "val" }, h("b", { text: rp + "%" }), h("span", { text: "readiness" }))),
        h("p", { class: "small muted grow", text: "Weighted by domain size and based only on your own practice here. It is a study guide, not a prediction of any result." })),
      h("div", { class: "stats" },
        stat(todayN, "answered today"), stat(st, "day streak"),
        stat(lessonsDone + " of " + C.lessons.length, "lessons done"), stat(due.cards.length + " / " + due.questions.length, "cards / questions due"),
        stat(seenQ + " of " + C.questions.length, "questions seen"), stat(L.countSeen(S.c) + " of " + C.cards.length, "cards seen"))));
    var series = L.snapSeries(S.snaps, t, 14), vals = series.filter(function (s) { return s.value !== null; });
    var sp = h("div", { class: "spark", role: "img", "aria-label": vals.length ? "Readiness over the last 14 days, from " + vals[0].value + " to " + vals[vals.length - 1].value + " percent" : "No readiness history yet" });
    var maxV = Math.max(10, Math.max.apply(null, vals.map(function (s) { return s.value; }).concat([0])));
    series.forEach(function (s) { sp.appendChild(s.value === null ? h("i", { class: "none" }) : h("i", { style: "height:" + Math.max(5, s.value / maxV * 100) + "%", title: fmtDate(s.day) + ": " + s.value + "%" })); });
    main.appendChild(h("section", { class: "card", "aria-labelledby": "ot" }, h("h2", { id: "ot", text: "Readiness over time" }), sp,
      h("div", { class: "row between small muted", style: "margin-top:6px" }, h("span", { text: "14 days ago" }), h("span", { text: "Today" })),
      vals.length ? null : h("p", { class: "small muted", text: "A daily snapshot is saved when you practise. The strip fills in over the next days." })));
    var dl = h("section", { class: "card", "aria-labelledby": "dd" }, h("h2", { id: "dd", text: "Domains" }));
    DOMAINS.forEach(function (d) {
      var m = pct(L.domainMastery(S, C, d.id));
      dl.appendChild(h("a", { class: "dom", href: "#/learn/" + d.id },
        h("div", { class: "t" }, h("span", { text: d.name }), h("span", { text: m + "%" })), bar(m),
        h("div", { class: "small muted", style: "margin-top:4px", text: "Weight " + d.weight + "%. Last practised: " + lastPractised(d.id) })));
    });
    main.appendChild(dl);
    var weak = L.weakestDomains(S, C, DOMAINS, 3);
    var wl = h("section", { class: "card", "aria-labelledby": "wk" }, h("h2", { id: "wk", text: "Weakest domains" }));
    weak.forEach(function (w) {
      wl.appendChild(h("div", { class: "row between", style: "padding:6px 0;min-height:48px" }, h("div", { class: "grow" }, h("div", { style: "font-weight:600", text: domById[w.id].name }), h("div", { class: "small muted", text: pct(w.mastery) + "% mastery" })),
        link("Drill", "#/play?kind=drill&domain=" + w.id + "&n=10", "")));
    });
    main.appendChild(wl);
  };
  function stat(v, label) { return h("div", { class: "stat" }, h("b", { text: v }), h("span", { text: label })); }

  /* ---------- LEARN ---------- */
  routes.learn = function (r) {
    var dom = r.args[0];
    if (!dom) {
      main.appendChild(h("h1", { text: "Learn" }));
      DOMAINS.forEach(function (d) {
        var ls = C.lessons.filter(function (l) { return l.domain === d.id; }), done = ls.filter(function (l) { return S.lessons[l.id]; }).length;
        main.appendChild(h("a", { class: "card dom", href: "#/learn/" + d.id, style: "display:block;text-decoration:none;color:inherit" },
          h("div", { class: "t" }, h("span", { text: d.name }), h("span", { text: done + "/" + ls.length })), bar(ls.length ? done / ls.length * 100 : 0),
          h("div", { class: "small muted", style: "margin-top:6px", text: d.desc })));
      });
      return;
    }
    var d = domById[dom];
    if (!d) { go("/learn"); return; }
    main.appendChild(link("Back to all domains", "#/learn", "link"));
    main.appendChild(h("h1", { text: d.name }));
    main.appendChild(h("p", { class: "muted", text: d.desc + " (" + d.weight + "% of the blueprint)" }));
    var list = h("ul", { class: "clean" });
    C.lessons.filter(function (l) { return l.domain === dom; }).sort(function (a, b) { return a.n - b.n; }).forEach(function (l) {
      var done = !!S.lessons[l.id];
      list.appendChild(h("li", {}, h("a", { href: "#/lesson/" + l.id }, h("span", { class: "num-dot" + (done ? " done" : ""), "aria-hidden": "true", text: done ? "✓" : l.n }), h("span", { class: "grow", text: l.title }), h("span", { class: "small muted", text: done ? "Done" : "To do" }))));
    });
    main.appendChild(h("div", { class: "card" }, list));
    if (dom === "intro") main.appendChild(link("Open the glossary (" + C.glossary.length + " terms)", "#/glossary", "block"));
    main.appendChild(h("div", { class: "stack", style: "margin-top:12px" }, link("Drill this domain", "#/play?kind=drill&domain=" + dom + "&n=10", "primary block"), link("Flashcards for this domain", "#/cards?domain=" + dom, "block")));
  };
  routes.lesson = function (r) {
    var l = lessonById[r.args[0]];
    if (!l) { go("/learn"); return; }
    var d = domById[l.domain];
    main.appendChild(link("Back to " + d.name, "#/learn/" + l.domain, "link"));
    main.appendChild(h("div", { class: "small muted", text: "Lesson " + l.n + " of " + C.lessons.filter(function (x) { return x.domain === l.domain; }).length }));
    main.appendChild(h("h1", { text: l.title }));
    main.appendChild(h("article", { class: "lesson" }, pEls(l.body)));
    if (l.points && l.points.length) main.appendChild(h("section", { class: "card" }, h("h2", { text: "Key points" }), h("ul", { class: "bullets" }, l.points.map(function (p) { return h("li", { text: p }); }))));
    if (l.traps && l.traps.length) main.appendChild(h("section", { class: "card trap" }, h("h2", { text: "Common traps" }), h("ul", { class: "bullets" }, l.traps.map(function (p) { return h("li", { text: p }); }))));
    main.appendChild(h("section", { class: "card soft" }, h("h3", { text: "Sources" }), h("ul", { class: "bullets small" }, (l.sources || []).map(function (p) { return h("li", { text: p }); })),
      h("p", { class: "small muted", text: "Source version: " + (l.sourceVersion || "not stated") + ". AI-drafted, not human-reviewed." })));
    var done = !!S.lessons[l.id];
    var b = btn(done ? "Marked done (tap to undo)" : "Mark lesson done", function () {
      if (S.lessons[l.id]) { delete S.lessons[l.id]; save(); } else { S.lessons[l.id] = true; touch(l.domain, 1); }
      render();
    }, done ? "block" : "primary block");
    main.appendChild(b);
    var sib = C.lessons.filter(function (x) { return x.domain === l.domain; }).sort(function (a, b2) { return a.n - b2.n; });
    var idx = sib.indexOf(l), nav = h("div", { class: "split", style: "margin-top:12px" });
    nav.appendChild(idx > 0 ? link("Previous", "#/lesson/" + sib[idx - 1].id) : h("span"));
    nav.appendChild(idx < sib.length - 1 ? link("Next lesson", "#/lesson/" + sib[idx + 1].id, "primary") : link("Drill this domain", "#/play?kind=drill&domain=" + l.domain + "&n=10", "primary"));
    main.appendChild(nav);
  };
  routes.glossary = function () {
    main.appendChild(link("Back", "#/learn/intro", "link"));
    main.appendChild(h("h1", { text: "Glossary" }));
    var input = h("input", { type: "search", id: "gq", placeholder: "Search terms", "aria-label": "Search glossary", autocomplete: "off" });
    var out = h("dl", { class: "gl" }), count = h("p", { class: "small muted", role: "status" });
    var items = C.glossary.slice().sort(function (a, b) { return a.term.localeCompare(b.term); });
    function draw() {
      var q = input.value.trim().toLowerCase();
      out.textContent = "";
      var f = items.filter(function (g) { return !q || g.term.toLowerCase().indexOf(q) >= 0 || g.definition.toLowerCase().indexOf(q) >= 0; });
      f.forEach(function (g) { out.appendChild(h("dt", { text: g.term })); out.appendChild(h("dd", { text: g.definition })); });
      count.textContent = f.length + " of " + items.length + " terms";
    }
    input.addEventListener("input", draw);
    main.appendChild(h("div", { class: "card" }, input, count));
    main.appendChild(out);
    draw();
  };

  /* ---------- SESSIONS ---------- */
  var SES = null;
  var RESULT = null;
  function startSession(kind, qids, title, extra) {
    SES = Object.assign({ kind: kind, title: title, qids: qids, i: 0, seed: String(Date.now()), answers: [], orders: {}, sel: [], submitted: false }, extra || {});
    RESULT = null;
  }
  function launch(r) {
    var q = r.qs, kind = q.kind, ids, title;
    if (kind === "drill") {
      ids = L.drillSelect(C.questions, S, { domain: q.domain || "mixed", n: parseInt(q.n, 10) || 0, unseenFirst: q.unseen === "1", seed: L.seedFrom(Date.now()) });
      title = "Drill: " + (q.domain && domById[q.domain] ? domById[q.domain].name : "mixed domains");
    } else if (kind === "scenario") {
      ids = C.questions.filter(function (x) { return x.scenario === q.id; }).map(function (x) { return x.id; });
      title = "Scenario: " + (C.scenarios[q.id] ? C.scenarios[q.id].title : q.id);
    } else if (kind === "weak") { ids = L.shuffle(L.weakQuestionIds(S, C), Date.now()).slice(0, 20); title = "Weak spots"; }
    else if (kind === "checkup") { ids = L.checkupSelect(C.questions, DOMAINS, 30, L.seedFrom(Date.now())); title = "Check-up"; }
    else if (kind === "review") { ids = L.shuffle(L.dueIds(S, C, today()).questions, Date.now()).slice(0, 30); title = "Review: due questions"; }
    else if (kind === "missed") { ids = RESULT ? RESULT.missed.slice() : []; title = "Review of missed questions"; }
    else ids = [];
    if (!ids || !ids.length) { SES = null; return false; }
    startSession(kind, ids, title);
    return true;
  }
  routes.play = function (r) {
    if (r.qs.kind) { /* entering from a link: start, then clean the url so refresh does not restart */
      var ok = launch(r);
      if (!ok) {
        main.appendChild(emptyState("thinking", "Nothing to practise here yet", "There are no questions for this choice. Try a drill or answer some questions first."));
        main.appendChild(link("Back to practice", "#/practice", "primary block"));
        return;
      }
      history.replaceState(null, "", "#/play");
    }
    if (!SES) { go("/practice"); return; }
    if (SES.i >= SES.qids.length) { finishSession(); return; }
    drawQuestion();
  };
  function emptyState(mood, title, text) { return h("div", { class: "card empty" }, mascot(mood, 88), h("h2", { text: title }), h("p", { class: "muted", text: text })); }
  function drawQuestion() {
    var q = qById[SES.qids[SES.i]];
    var order = SES.orders[q.id] || (SES.orders[q.id] = L.optionOrder(q, SES.seed));
    var multi = q.type === "multi", pick = q.pick || q.correct.length;
    var why = C.why[q.id] || [];
    main.appendChild(h("div", { class: "row between small muted" }, h("span", { text: SES.title }), h("span", { text: "Question " + (SES.i + 1) + " of " + SES.qids.length })));
    main.appendChild(h("div", { class: "progress", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": SES.qids.length, "aria-valuenow": SES.i + (SES.submitted ? 1 : 0), "aria-label": "Session progress" }, h("i", { style: "width:" + ((SES.i + (SES.submitted ? 1 : 0)) / SES.qids.length * 100) + "%" })));
    if (q.scenario && C.scenarios[q.scenario]) {
      var sc = C.scenarios[q.scenario];
      main.appendChild(h("section", { class: "scenario", "aria-label": "Scenario" }, h("div", { class: "small muted", text: "Scenario" }), h("h2", { text: sc.title }), pEls(sc.text)));
    }
    main.appendChild(h("div", { class: "pills", style: "margin-bottom:8px" }, h("span", { class: "pill", text: domById[q.domain] ? domById[q.domain].name : q.domain })));
    var form = h("form", { novalidate: true });
    form.appendChild(h("p", { class: "stem", text: q.stem, id: "stem" }));
    form.appendChild(h("div", { class: "hint", id: "hint", text: multi ? "Choose " + (NUMW[pick] || pick) + " answers." : "Choose ONE answer." }));
    var list = h("ul", { class: "opts", "aria-labelledby": "stem", "aria-describedby": "hint" });
    var correctSet = q.correct;
    order.forEach(function (orig, pos) {
      var isCorr = correctSet.indexOf(orig) >= 0, chosen = SES.sel.indexOf(orig) >= 0;
      var inp = h("input", { type: multi ? "checkbox" : "radio", name: "opt", value: orig, id: "o" + pos, checked: chosen, disabled: SES.submitted });
      inp.addEventListener("change", function () {
        if (multi) { SES.sel = Array.prototype.filter.call(form.querySelectorAll("input"), function (x) { return x.checked; }).map(function (x) { return +x.value; }); }
        else SES.sel = [orig];
        submitBtn.disabled = !SES.sel.length;
        if (multi) hint2();
      });
      var li = h("li", { class: "opt" + (SES.submitted ? (isCorr ? " is-correct" : chosen ? " is-wrong" : "") : "") },
        h("label", { for: "o" + pos }, inp, h("span", { class: "txt", text: String.fromCharCode(65 + pos) + ". " + q.options[orig] })));
      if (SES.submitted) {
        var tag = isCorr ? (chosen ? "Correct answer (you chose this)" : "Correct answer") : (chosen ? "Your choice: incorrect" : null);
        if (tag) li.appendChild(h("div", { class: "tag " + (isCorr ? "good" : "badt"), text: (isCorr ? "✓ " : "✗ ") + tag }));
        if (why[orig]) li.appendChild(h("div", { class: "why", text: why[orig] }));
      }
      list.appendChild(li);
    });
    form.appendChild(list);
    var submitBtn = h("button", { type: "submit", class: "btn primary block", text: "Submit answer", disabled: !SES.sel.length });
    function hint2() { var el = document.getElementById("hint"); if (el) el.textContent = "Choose " + (NUMW[pick] || pick) + " answers. Selected: " + SES.sel.length + "."; }
    if (!SES.submitted) {
      form.appendChild(submitBtn);
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!SES.sel.length) return;
        var ok = L.isCorrect(q, SES.sel);
        SES.answers.push({ qid: q.id, sel: SES.sel.slice(), correct: ok });
        SES.submitted = true;
        answerQuestion(q, ok);
        render();
        var f = document.getElementById("fb"); if (f) f.focus();
      });
      main.appendChild(form);
    } else {
      var ans = SES.answers[SES.answers.length - 1], ok2 = ans && ans.qid === q.id ? ans.correct : false;
      var pills = main.querySelector(".pills");
      main.insertBefore(h("div", { class: "banner " + (ok2 ? "good" : "bad"), id: "fb", tabindex: "-1", role: "status", text: ok2 ? "✓ Correct" : "✗ Incorrect" + (multi ? ". Every correct option must be chosen and no others." : "") }), pills);
      main.appendChild(form);
      main.appendChild(h("section", { class: "card expl" }, h("h3", { text: "Explanation" }), pEls(q.explanation)));
      var more = SES.i + 1 < SES.qids.length;
      main.appendChild(btn(more ? "Next question" : "See results", function () { SES.i++; SES.sel = []; SES.submitted = false; render(); }, "primary block", { id: "next" }));
    }
    main.appendChild(btn("End session", function () { if (SES.answers.length) { finishSession(true); } else { SES = null; go("/practice"); } }, "link"));
  }
  function finishSession(early) {
    var s = SES;
    var by = L.breakdown(C.questions, s.answers, DOMAINS);
    var right = s.answers.filter(function (a) { return a.correct; }).length;
    RESULT = { kind: s.kind, title: s.title, right: right, total: s.answers.length, by: by, missed: s.answers.filter(function (a) { return !a.correct; }).map(function (a) { return a.qid; }), planned: s.qids.length };
    if (s.kind === "checkup" && s.answers.length === s.qids.length) {
      S.checkups.push({ day: today(), right: right, total: s.answers.length, by: by }); S.checkups = S.checkups.slice(-50);
      var pl = S.plan; if (pl) { var k = pl.tasks.filter(function (t) { return t.type === "checkup" && !L.taskDone(pl, t, S) && t.day <= today() + 3; })[0]; if (k) pl.done[k.key] = true; }
      save();
    }
    SES = null;
    history.replaceState(null, "", "#/result");
    render();
  }
  var MOOD_TEXT = {
    celebrate: ["Excellent work", "Outstanding. Keep the habit going and revisit anything you missed."],
    happy: ["Good result", "Solid understanding. Reading the explanations for the misses will lock it in."],
    neutral: ["A steady start", "You are part of the way there. Revisit the explanations and the related lessons."],
    thinking: ["Tricky material", "Do not worry. Re-read the lesson, then try again. Mistakes here are how this sticks."]
  };
  routes.result = function () {
    if (!RESULT) { go("/practice"); return; }
    var R = RESULT, mood = L.mascotMood(R.right, R.total), p = R.total ? pct(R.right / R.total) : 0;
    main.appendChild(h("section", { class: "card res-head" }, mascot(mood, 120), h("h1", { text: MOOD_TEXT[mood][0] }),
      h("div", { class: "score", text: R.right + " of " + R.total + " (" + p + "%)" }), h("div", { class: "muted", text: R.title }), h("p", { style: "margin-top:8px", text: MOOD_TEXT[mood][1] }),
      R.total < R.planned ? h("p", { class: "small muted", text: "You ended early, so only answered questions are counted." }) : null));
    var card = h("section", { class: "card" }, h("h2", { text: "By domain" }));
    DOMAINS.forEach(function (d) {
      var b = R.by[d.id]; if (!b || !b.total) return;
      card.appendChild(h("div", { style: "padding:8px 0" }, h("div", { class: "row between" }, h("span", { style: "font-weight:600", text: d.name }), h("span", { text: b.right + " / " + b.total })), bar(b.right / b.total * 100)));
    });
    main.appendChild(card);
    var acts = h("div", { class: "stack" });
    if (R.missed.length) acts.appendChild(link("Review missed (" + R.missed.length + ")", "#/play?kind=missed", "primary block"));
    acts.appendChild(link("Back to practice", "#/practice", "block"));
    acts.appendChild(link("Home", "#/home", "block"));
    main.appendChild(acts);
  };

  /* ---------- PRACTICE ---------- */
  routes.practice = function () {
    main.appendChild(h("h1", { text: "Practice" }));
    var domSel = h("select", { id: "pd" }, h("option", { value: "mixed", text: "All domains (mixed)" }), DOMAINS.map(function (d) { return h("option", { value: d.id, text: d.name }); }));
    var nSel = h("select", { id: "pn" }, h("option", { value: "10", text: "10 questions" }), h("option", { value: "20", text: "20 questions" }), h("option", { value: "0", text: "All questions" }));
    var un = h("input", { type: "checkbox", id: "pu" });
    main.appendChild(h("section", { class: "card stack", "aria-labelledby": "dr" }, h("h2", { id: "dr", text: "Drill" }),
      h("div", {}, h("label", { class: "field", for: "pd", text: "Domain" }), domSel), h("div", {}, h("label", { class: "field", for: "pn", text: "Length" }), nSel),
      h("label", { class: "check", for: "pu" }, un, h("span", { text: "Unseen questions first" })),
      btn("Start drill", function () { go("/play?kind=drill&domain=" + domSel.value + "&n=" + nSel.value + "&unseen=" + (un.checked ? 1 : 0)); }, "primary block")));
    var weak = L.weakQuestionIds(S, C).length;
    main.appendChild(h("section", { class: "card", "aria-labelledby": "wsp" }, h("h2", { id: "wsp", text: "Weak spots" }), h("p", { class: "muted", text: weak ? weak + " questions you missed or still find hard." : "No weak spots yet. Answer some questions first." }),
      weak ? link("Practise weak spots", "#/play?kind=weak", "primary block") : null));
    var last = S.checkups[S.checkups.length - 1];
    main.appendChild(h("section", { class: "card", "aria-labelledby": "cu" }, h("h2", { id: "cu", text: "Check-up" }), h("p", { class: "muted", text: "30 mixed questions, weighted by domain size, untimed, with a score by domain at the end." }),
      last ? h("p", { class: "small", text: "Last check-up: " + last.right + " of " + last.total + " on " + fmtDay(last.day) + "." }) : null, link("Start check-up", "#/play?kind=checkup", "primary block")));
    var sc = h("section", { class: "card", "aria-labelledby": "scn" }, h("h2", { id: "scn", text: "Scenarios" }), h("p", { class: "muted", text: "Read a short situation, then answer all the questions about it." }));
    var ul = h("ul", { class: "clean" });
    Object.keys(C.scenarios).forEach(function (id) {
      var n = C.questions.filter(function (q) { return q.scenario === id; }).length; if (!n) return;
      var dom = (C.questions.filter(function (q) { return q.scenario === id; })[0] || {}).domain;
      ul.appendChild(h("li", {}, h("a", { href: "#/play?kind=scenario&id=" + encodeURIComponent(id) }, h("span", { class: "grow" }, h("div", { style: "font-weight:600", text: C.scenarios[id].title }), h("div", { class: "small muted", text: (domById[dom] ? domById[dom].name : "") + " . " + n + " questions" })))));
    });
    sc.appendChild(ul);
    main.appendChild(sc);
  };

  /* ---------- CARDS ---------- */
  var CS = null;
  function cardPool(domain) { return C.cards.filter(function (c) { return !domain || c.domain === domain; }); }
  routes.cards = function (r) {
    var dom = r.qs.domain || "", t = today();
    if (r.qs.study) {
      var pool = cardPool(dom), mode = r.qs.study, ids;
      if (mode === "due") ids = pool.filter(function (c) { return L.isDue(S.c[c.id], t); });
      else if (mode === "new") ids = pool.filter(function (c) { return !L.isSeen(S.c[c.id]); }).slice(0, 20);
      else ids = pool;
      ids = L.shuffle(ids.map(function (c) { return c.id; }), Date.now());
      CS = ids.length ? { ids: ids, i: 0, flipped: false, got: 0, again: 0, dom: dom } : null;
      history.replaceState(null, "", "#/cards?resume=1" + (dom ? "&domain=" + dom : ""));
      if (!CS) { main.appendChild(emptyState("thinking", "No cards here", "There are no cards in this queue.")); main.appendChild(link("Back to cards", "#/cards", "primary block")); return; }
      return drawCard();
    }
    if (CS && r.qs.resume) return drawCard();
    CS = null;
    main.appendChild(h("h1", { text: "Flashcards" }));
    var sel = h("select", { id: "cd" }, h("option", { value: "", text: "All domains" }), DOMAINS.map(function (d) { return h("option", { value: d.id, text: d.name, selected: d.id === dom }); }));
    sel.addEventListener("change", function () { go("/cards" + (sel.value ? "?domain=" + sel.value : "")); });
    main.appendChild(h("div", { class: "card" }, h("label", { class: "field", for: "cd", text: "Domain filter" }), sel));
    var pool2 = cardPool(dom), due = pool2.filter(function (c) { return L.isDue(S.c[c.id], t); }).length, nw = pool2.filter(function (c) { return !L.isSeen(S.c[c.id]); }).length;
    var q = "&domain=" + dom;
    main.appendChild(h("div", { class: "card stack" },
      h("p", { class: "muted", text: due + " due today. " + nw + " not yet seen. " + pool2.length + " in total." }),
      due ? link("Study due cards (" + due + ")", "#/cards?study=due" + q, "primary block") : h("p", { class: "small", text: "Nothing due today. Well done." }),
      nw ? link("Learn new cards (up to 20)", "#/cards?study=new" + q, due ? "block" : "primary block") : null,
      link("Browse and study all (" + pool2.length + ")", "#/cards?study=all" + q, "block")));
  };
  function drawCard() {
    var c = cardById[CS.ids[CS.i]];
    if (!c) { CS = null; go("/cards"); return; }
    main.appendChild(h("div", { class: "row between small muted" }, h("span", { text: domById[c.domain] ? domById[c.domain].name : "" }), h("span", { text: "Card " + (CS.i + 1) + " of " + CS.ids.length })));
    main.appendChild(h("div", { class: "progress", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": CS.ids.length, "aria-valuenow": CS.i, "aria-label": "Card progress" }, h("i", { style: "width:" + (CS.i / CS.ids.length * 100) + "%" })));
    var face = h("section", { class: "card flash", "aria-live": "polite" }, h("div", { class: "lbl", text: CS.flipped ? "Answer" : "Question" }));
    if (!CS.flipped) face.appendChild(h("p", { style: "font-weight:600", text: c.front }));
    else { face.appendChild(h("p", { class: "small muted", text: c.front })); String(c.back).split(/\n|\\n/).filter(Boolean).forEach(function (p) { face.appendChild(h("p", { text: p })); }); }
    main.appendChild(face);
    if (!CS.flipped) main.appendChild(btn("Flip card", function () { CS.flipped = true; render(); var f = document.getElementById("got"); if (f) f.focus(); }, "primary block"));
    else {
      main.appendChild(h("div", { class: "split" },
        btn("Again", function () { advanceCard(false); }, "danger", { id: "again" }), btn("Got it", function () { advanceCard(true); }, "primary", { id: "got" })));
      main.appendChild(h("p", { class: "small muted", style: "margin-top:8px", text: "Again returns the card to box 1. Got it moves it up a box and schedules it further out." }));
    }
    main.appendChild(btn("End session", function () { endCards(); }, "link"));
  }
  function advanceCard(ok) {
    var c = cardById[CS.ids[CS.i]];
    answerCard(c, ok); if (ok) CS.got++; else CS.again++;
    CS.i++; CS.flipped = false;
    if (CS.i >= CS.ids.length) endCards(); else render();
  }
  function endCards() {
    var s = CS; CS = null;
    if (!s || !(s.got + s.again)) { go("/cards"); return; }
    main.textContent = "";
    var mood = L.mascotMood(s.got, s.got + s.again);
    main.appendChild(h("section", { class: "card res-head" }, mascot(mood, 110), h("h1", { text: "Cards done" }), h("div", { class: "score", text: s.got + " got it, " + s.again + " again" }), h("p", { class: "muted", text: "Cards marked Again come back tomorrow. The rest are scheduled further out." })));
    main.appendChild(h("div", { class: "stack" }, link("More cards", "#/cards" + (s.dom ? "?domain=" + s.dom : ""), "primary block"), link("Home", "#/home", "block")));
    renderNav("cards");
  }

  /* ---------- REVIEW ---------- */
  routes.review = function () {
    var due = L.dueIds(S, C, today());
    main.appendChild(link("Back", "#/more", "link"));
    main.appendChild(h("h1", { text: "Spaced review" }));
    main.appendChild(h("p", { class: "muted", text: "Five boxes with gaps of 1, 2, 4, 8 and 16 days. A right answer moves an item up a box. A wrong answer sends it back to box 1." }));
    if (!due.questions.length && !due.cards.length) { main.appendChild(emptyState("happy", "Nothing due", "You are all caught up. New items appear here as their review dates arrive.")); return; }
    var st = h("div", { class: "stack" });
    if (due.questions.length) st.appendChild(link("Review questions (" + due.questions.length + ")", "#/play?kind=review", "primary block"));
    if (due.cards.length) st.appendChild(link("Review cards (" + due.cards.length + ")", "#/cards?study=due", due.questions.length ? "block" : "primary block"));
    main.appendChild(st);
  };

  /* ---------- PLAN ---------- */
  function taskInfo(t) {
    var d = t.domain ? domById[t.domain] : null, dn = d ? d.name : "";
    if (t.type === "lesson") return { label: "Lesson: " + (lessonById[t.ref] ? lessonById[t.ref].title : t.ref), href: "#/lesson/" + t.ref };
    if (t.type === "cards") return { label: "Flashcards: " + dn, href: "#/cards?study=all&domain=" + t.domain };
    if (t.type === "drill") return { label: "Drill (10): " + dn, href: "#/play?kind=drill&domain=" + t.domain + "&n=10&unseen=1" };
    return { label: "Check-up (30 mixed questions)", href: "#/play?kind=checkup" };
  }
  function taskRow(item, tag) {
    var t = item.task, info = taskInfo(t), done = item.done;
    var auto = t.type === "lesson";
    var cb = h("input", { type: "checkbox", id: "t-" + t.key, checked: done, "aria-label": "Mark done: " + info.label });
    cb.addEventListener("change", function () {
      if (auto) { if (cb.checked) S.lessons[t.ref] = true; else delete S.lessons[t.ref]; } else { if (cb.checked) S.plan.done[t.key] = true; else delete S.plan.done[t.key]; }
      if (cb.checked) touch(t.domain, 1); else save();
      render();
    });
    return h("li", {}, h("div", { class: "li-btn" }, cb, h("a", { class: "grow", href: info.href, style: "color:inherit" + (done ? ";text-decoration:line-through" : ""), text: info.label }), tag ? h("span", { class: "pill", text: tag }) : null));
  }
  routes.plan = function () {
    var t = today();
    main.appendChild(link("Back", "#/more", "link"));
    main.appendChild(h("h1", { text: "Study plan" }));
    if (!S.plan) {
      var def = L.dayISO(t + 28);
      var inp = h("input", { type: "date", id: "pt", value: def, min: L.dayISO(t) });
      main.appendChild(h("section", { class: "card stack" }, h("p", { text: "Pick a target date. The plan covers every domain in blueprint order with lessons, a flashcard pass and a drill each, plus one check-up a week." }),
        h("div", {}, h("label", { class: "field", for: "pt", text: "Target date" }), inp),
        btn("Create plan", function () {
          var tg = L.dayNum(inp.value);
          if (isNaN(tg) || tg < t) { toast("Choose today or a later date."); return; }
          S.plan = L.generatePlan({ start: t, target: Math.min(tg, t + 365), domains: DOMAINS, content: C }); save(); render();
        }, "primary block")));
      return;
    }
    var v = L.planToday(S.plan, S, t), left = S.plan.target - t;
    main.appendChild(h("section", { class: "card" }, h("div", { class: "row between" }, h("b", { text: v.doneCount + " of " + v.total + " tasks done" }), h("span", { class: "muted", text: v.late ? "Target passed" : left === 0 ? "Target is today" : left + " days left" })), bar(v.total ? v.doneCount / v.total * 100 : 0, true),
      h("p", { class: "small muted", style: "margin-top:8px", text: "Target date: " + fmtDay(S.plan.target) })));
    if (v.overdue.length || v.late) {
      var cu = h("section", { class: "card", style: "border-color:var(--accent)" }, h("h2", { text: "Catch up" }),
        h("p", { class: "muted", text: v.overdue.length + " earlier tasks are not done. Do them first, or spread what is left over the remaining days." }));
      cu.appendChild(btn("Rebalance remaining tasks", function () { S.plan = L.rebalance(S.plan, S, today()); save(); toast("Plan rebalanced."); render(); }, "block"));
      var ul0 = h("ul", { class: "clean", style: "margin-top:8px" }); v.overdue.slice(0, 8).forEach(function (o) { ul0.appendChild(taskRow(o, fmtDay(o.task.day))); });
      cu.appendChild(ul0);
      if (v.overdue.length > 8) cu.appendChild(h("p", { class: "small muted", text: "And " + (v.overdue.length - 8) + " more." }));
      main.appendChild(cu);
    }
    var td = h("section", { class: "card", "aria-labelledby": "td" }, h("h2", { id: "td", text: "Today" }));
    if (!v.today.length) td.appendChild(h("p", { class: "muted", text: v.overdue.length ? "No tasks scheduled for today. Work on the catch-up list." : "Nothing scheduled today." }));
    else { var ul = h("ul", { class: "clean" }); v.today.forEach(function (o) { ul.appendChild(taskRow(o)); }); td.appendChild(ul); }
    main.appendChild(td);
    var up = v.upcoming.filter(function (o) { return o.task.day <= t + 7; });
    if (up.length) {
      var uc = h("section", { class: "card", "aria-labelledby": "up" }, h("h2", { id: "up", text: "Coming up" })), cur = null, ulx = null;
      up.forEach(function (o) {
        if (cur !== o.task.day) { cur = o.task.day; uc.appendChild(h("h3", { style: "margin-top:10px", text: fmtDay(cur) })); ulx = h("ul", { class: "clean" }); uc.appendChild(ulx); }
        ulx.appendChild(taskRow(o));
      });
      main.appendChild(uc);
    }
    main.appendChild(btn("Replace plan with a new date", function () { if (confirm("Replace the current plan? Your answers and lessons stay as they are.")) { S.plan = null; save(); render(); } }, "link"));
  };

  /* ---------- CAPSTONE ---------- */
  var AREAS = [
    { id: "need", name: "Problem and user need", domains: "Domain 3", items: [
      { id: "need1", title: "The problem comes first", guide: "Describe the user, the problem and what it costs them today without naming any technology." },
      { id: "need2", title: "Purpose and cost of errors", guide: "Write down the intended purpose, the context of use, and what a wrong output would cost, including costs that are not money." }] },
    { id: "why", name: "Why AI, compared with something simpler", domains: "Domains 3 and 4", items: [
      { id: "why1", title: "Simpler options compared", guide: "Explain what a rule, a process change or a manual step would do, and why that is not enough." },
      { id: "why2", title: "Role and scope", guide: "State whether the system automates or assists the task, what is in scope, and what it is known not to handle." }] },
    { id: "measure", name: "Success measures and thresholds", domains: "Domains 2 and 5", items: [
      { id: "measure1", title: "Outcome-based success", guide: "Define success as a change for users or the business at a measurable level, not only as a model score." },
      { id: "measure2", title: "Thresholds set first", guide: "Agree the acceptance levels and the conditions they apply to before building and before results are known." }] },
    { id: "evalp", name: "Evaluation plan with independent input", domains: "Domain 5", items: [
      { id: "evalp1", title: "Documented evidence", guide: "Name the test data, metrics and tools, and make sure they reflect the conditions the product will really face." },
      { id: "evalp2", title: "Independent assessors", guide: "Include domain experts, users or others who did not build the system when judging whether it is good enough." }] },
    { id: "human", name: "Human oversight and failure handling", domains: "Domain 6", items: [
      { id: "human1", title: "Oversight and who answers for it", guide: "Show where a person checks or can override output, and name who is accountable for that role." },
      { id: "human2", title: "Honest expectations and recovery", guide: "Tell users plainly what the system can and cannot do, and give them a way to correct or escalate a wrong result." }] },
    { id: "risk", name: "Risks and accountability for decisions", domains: "Domain 7", items: [
      { id: "risk1", title: "Risks identified and owned", guide: "List the main risks to people, fairness, privacy and security, each with an owner and a response." },
      { id: "risk2", title: "Accountable decision-maker", guide: "Name the person or body who decides which risks are accepted, and keep a record of those decisions." }] },
    { id: "ops", name: "Monitoring, escalation, fallback and switch-off", domains: "Domain 8", items: [
      { id: "ops1", title: "Monitoring with triggers", guide: "Watch quality and harm signals after release and agree the levels that trigger escalation." },
      { id: "ops2", title: "Fallback and switch-off criteria", guide: "Have a working fallback, and agree in advance the conditions under which the system is paused or turned off." }] },
    { id: "retire", name: "Retirement", domains: "Domain 8", items: [
      { id: "retire1", title: "Retirement conditions", guide: "Define when the product will be retired or replaced, and who decides." },
      { id: "retire2", title: "Wind-down plan", guide: "Plan what happens to users, data, models and third-party dependencies when the product is withdrawn." }] }
  ];
  var SCORE_LBL = ["0 Not yet", "1 Partly", "2 Yes"];
  routes.capstone = function () {
    main.appendChild(link("Back", "#/more", "link"));
    main.appendChild(h("h1", { text: "Capstone: write an AI product brief" }));
    main.appendChild(h("p", { text: "Think of an AI product, real or imagined, and draft its brief. Then rate each criterion below from 0 to 2 and keep notes. This is a self-assessment: it is your own judgement, and nobody has checked it." }));
    var sum = h("section", { class: "card accent", "aria-live": "polite", "aria-labelledby": "capsum" });
    main.appendChild(sum);
    function drawSum() {
      var r = L.capstoneResult(AREAS, S.cap);
      sum.textContent = "";
      sum.appendChild(h("h2", { id: "capsum", text: "Self-assessed result: " + r.total + " of " + r.max }));
      sum.appendChild(bar(r.max ? r.total / r.max * 100 : 0, true));
      var rated = r.by.reduce(function (a, b) { return a + b.answered; }, 0), cnt = r.by.reduce(function (a, b) { return a + b.count; }, 0);
      sum.appendChild(h("p", { class: "small muted", style: "margin-top:6px", text: rated + " of " + cnt + " criteria rated." }));
      r.by.forEach(function (b, i) { sum.appendChild(h("div", { class: "row between small", style: "margin-top:8px;align-items:flex-start" }, h("span", { class: "grow", text: AREAS[i].name }), h("span", { style: "white-space:nowrap;font-weight:600", text: b.score + " / " + b.max }))); });
      sum.appendChild(h("p", { class: "small muted", style: "margin-top:10px", text: "Self-assessed only. Not an official rating, not a certification, and not reviewed." }));
    }
    drawSum();
    AREAS.forEach(function (a) {
      var sec = h("section", { class: "card", "aria-labelledby": "a-" + a.id }, h("h2", { id: "a-" + a.id, text: a.name }), h("div", { class: "small muted", style: "margin-bottom:6px", text: "From " + a.domains }));
      a.items.forEach(function (it) {
        var cur = S.cap[it.id] || {};
        var fs = h("fieldset", { class: "seg" }, h("legend", { class: "sr", text: it.title + " score" }));
        [0, 1, 2].forEach(function (n) {
          var inp = h("input", { type: "radio", name: "s-" + it.id, value: n, checked: cur.s === n });
          inp.addEventListener("change", function () { S.cap[it.id] = Object.assign({}, S.cap[it.id], { s: n }); save(); drawSum(); });
          fs.appendChild(h("label", {}, inp, h("span", { text: SCORE_LBL[n] })));
        });
        var ta = h("textarea", { id: "n-" + it.id, "aria-label": "Notes for " + it.title, placeholder: "Your notes (saved on this device)", maxlength: 4000 });
        ta.value = cur.n || "";
        ta.addEventListener("input", function () { S.cap[it.id] = Object.assign({}, S.cap[it.id], { n: ta.value }); save(); });
        sec.appendChild(h("div", { style: "padding:10px 0;border-top:1px solid var(--border)" }, h("h3", { text: it.title }), h("p", { class: "muted", text: it.guide }), fs, ta));
      });
      main.appendChild(sec);
    });
  };

  /* ---------- MORE / SETTINGS / ABOUT ---------- */
  routes.more = function () {
    main.appendChild(h("h1", { text: "More" }));
    var items = [["#/review", "Spaced review", "Due questions and cards"], ["#/plan", "Study plan", "Target date and daily tasks"], ["#/capstone", "Capstone", "Write an AI product brief and self-assess"], ["#/glossary", "Glossary", C.glossary.length + " terms"], ["#/settings", "Settings", "Theme, backup, reset"], ["#/about", "About and sources", "What this app is and is not"]];
    var ul = h("ul", { class: "clean" });
    items.forEach(function (i) { ul.appendChild(h("li", {}, h("a", { href: i[0] }, h("span", { class: "grow" }, h("div", { style: "font-weight:600", text: i[1] }), h("div", { class: "small muted", text: i[2] })), h("span", { "aria-hidden": "true", text: "›" })))); });
    main.appendChild(h("div", { class: "card" }, ul));
  };
  function download(name, text) {
    var a = h("a", { href: URL.createObjectURL(new Blob([text], { type: "application/json" })), download: name });
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); if (a.parentNode) a.parentNode.removeChild(a); }, 500);
  }
  routes.settings = function () {
    main.appendChild(link("Back", "#/more", "link"));
    main.appendChild(h("h1", { text: "Settings" }));
    var cur = lsGet(THEME_KEY) || "auto";
    var th = h("fieldset", { class: "card" }, h("legend", { text: "Theme" }));
    [["auto", "Follow device"], ["light", "Light"], ["dark", "Dark"]].forEach(function (o) {
      var inp = h("input", { type: "radio", name: "theme", value: o[0], checked: cur === o[0] || (o[0] === "auto" && cur !== "light" && cur !== "dark") });
      inp.addEventListener("change", function () { lsSet(THEME_KEY, o[0]); applyTheme(); });
      th.appendChild(h("label", { class: "check" }, inp, h("span", { text: o[1] })));
    });
    main.appendChild(th);
    var file = h("input", { type: "file", accept: "application/json,.json", id: "imp", class: "sr" });
    file.addEventListener("change", function () {
      var f = file.files && file.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function () {
        var obj; try { obj = JSON.parse(String(rd.result)); } catch (e) { toast("That file is not valid JSON."); return; }
        var v = L.validateBackup(obj);
        if (!v.ok) { toast(v.error); return; }
        if (!confirm("Replace the progress on this device with the backup?")) return;
        S = v.state; save(); toast("Backup imported."); render();
      };
      rd.onerror = function () { toast("The file could not be read."); };
      rd.readAsText(f);
    });
    main.appendChild(h("section", { class: "card stack", "aria-labelledby": "bk" }, h("h2", { id: "bk", text: "Backup" }),
      h("p", { class: "muted", text: "Progress is stored only on this device. Export a copy now and then." + (storageOK ? "" : " Storage is unavailable here, so progress will not be kept after you close the app.") }),
      btn("Export backup (JSON)", function () { download("aipo-coach-backup-" + L.dayISO(today()) + ".json", JSON.stringify({ app: "aipocoach", exported: L.dayISO(today()), state: S }, null, 1)); }, "block"),
      h("label", { class: "btn block", for: "imp", text: "Import backup" }), file));
    main.appendChild(h("section", { class: "card stack" }, h("h2", { text: "Reset" }), h("p", { class: "muted", text: "Clears all progress, plan and capstone notes on this device." }),
      btn("Reset progress", function () { if (confirm("Reset all progress on this device? This cannot be undone.")) { var ack = S.ack; S = L.emptyState(); S.ack = ack; save(); toast("Progress reset."); render(); } }, "danger block")));
    var stats = h("section", { class: "card", "aria-labelledby": "cs" }, h("h2", { id: "cs", text: "Content stats" }));
    var bad = C.questions.filter(function (q) { var w = C.why[q.id]; return !w || w.length !== q.options.length; }).length;
    stats.appendChild(h("ul", { class: "bullets small" },
      h("li", { text: C.lessons.length + " lessons in " + DOMAINS.length + " domains" }), h("li", { text: C.questions.length + " questions, " + Object.keys(C.scenarios).length + " scenarios" }),
      h("li", { text: C.cards.length + " flashcards, " + C.glossary.length + " glossary terms" }), h("li", { text: "All items are AI-drafted and not human-reviewed." }),
      bad ? h("li", { text: bad + " questions have missing or mismatched option explanations." }) : null,
      h("li", { text: "App build: " + BUILD }), h("li", { text: "Storage: " + (storageOK ? "available" : "unavailable") })));
    var per = h("ul", { class: "bullets small" });
    DOMAINS.forEach(function (d) { per.appendChild(h("li", { text: d.name + ": " + C.questions.filter(function (q) { return q.domain === d.id; }).length + " questions, " + C.lessons.filter(function (l) { return l.domain === d.id; }).length + " lessons, " + C.cards.filter(function (c) { return c.domain === d.id; }).length + " cards" })); });
    stats.appendChild(per);
    main.appendChild(stats);
    main.appendChild(link("About and sources", "#/about", "block"));
  };
  routes.about = function () {
    main.appendChild(link("Back", "#/more", "link"));
    main.appendChild(h("div", { class: "hero" }, mascot("happy", 72), h("h1", { text: "About AI PO Coach" })));
    main.appendChild(h("section", { class: "card" }, h("h2", { text: "What this is" }),
      h("p", { text: "AI PO Coach is original study material for learning AI product ownership. It is a private study aid for one person." }),
      h("ul", { class: "bullets" },
        h("li", { text: "All content is AI-drafted and has not been reviewed by a human." }),
        h("li", { text: "It is not official guidance from any standards body or vendor." }),
        h("li", { text: "It is not legal advice. Take legal, privacy and compliance questions to the right specialists." }),
        h("li", { text: "Self-assessments and readiness scores are your own study measures, not ratings or certifications." }),
        h("li", { text: "Everything runs locally. Nothing is sent over a network, and progress stays on this device." }))));
    main.appendChild(h("section", { class: "card" }, h("h2", { text: "Sources and versions" }),
      h("ul", { class: "bullets" },
        h("li", { text: "Scrum Guide, November 2020." }),
        h("li", { text: "NIST AI RMF 1.0, January 2023." }),
        h("li", { text: "NIST AI 600-1, July 2024." }),
        h("li", { text: "Google People + AI Guidebook, concepts paraphrased." }),
        h("li", { text: "Microsoft Research human-AI interaction guidelines, count and phases only." })),
      h("p", { class: "small muted", text: "Content paraphrases ideas from these public sources. If a source is revised, the study material may be out of date." })));
    main.appendChild(link("Settings", "#/settings", "block"));
  };

  /* ---------- boot ---------- */
  load();
  applyTheme();
  window.addEventListener("hashchange", render);
  render();
  if (!window.__SINGLE__ && "serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", function () { try { navigator.serviceWorker.register("sw.js").catch(function () {}); } catch (e) {} });
  }
})();

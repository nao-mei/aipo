/* Pure study logic. Works in node and in the browser. No DOM, no storage. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.Logic = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  var INTERVALS = [1, 2, 4, 8, 16];
  var STATE_VERSION = 1;

  /* ---------- days ---------- */
  function dayNum(d) {
    if (typeof d === "number") return d;
    if (typeof d === "string") {
      var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d);
      if (!m) return NaN;
      return Math.floor(Date.UTC(+m[1], +m[2] - 1, +m[3]) / 86400000);
    }
    d = d || new Date();
    return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  }
  function dayISO(n) {
    var d = new Date(n * 86400000);
    var mm = d.getUTCMonth() + 1, dd = d.getUTCDate();
    return d.getUTCFullYear() + "-" + (mm < 10 ? "0" : "") + mm + "-" + (dd < 10 ? "0" : "") + dd;
  }

  /* ---------- seeded shuffle ---------- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function seedFrom(str) {
    var h = 2166136261;
    str = String(str);
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function shuffle(arr, seed) {
    var a = arr.slice();
    var rnd = mulberry32(typeof seed === "number" ? seed : seedFrom(seed));
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------- Leitner ---------- */
  function record(item, correct, today) {
    var prev = item && item.seen ? item : { box: 1, due: 0, seen: 0, right: 0, wrong: 0, lastOk: null };
    var box = correct ? Math.min(5, prev.box + 1) : 1;
    return {
      box: box,
      due: today + INTERVALS[box - 1],
      seen: prev.seen + 1,
      right: prev.right + (correct ? 1 : 0),
      wrong: prev.wrong + (correct ? 0 : 1),
      lastOk: !!correct
    };
  }
  function isSeen(item) { return !!(item && item.seen > 0); }
  function isDue(item, today) { return isSeen(item) && item.due <= today; }
  var BOX_SCORE = [0, 0.5, 0.7, 0.85, 1];
  function itemScore(item) { return isSeen(item) ? BOX_SCORE[Math.max(1, Math.min(5, item.box)) - 1] : 0; }

  /* ---------- mastery and readiness ---------- */
  /* Gentle blend: how much of the set you have tried (coverage, 60%) plus how well the
     items you have tried are holding (quality, 40%). A first correct answer already counts
     for something; a miss counts for nothing until it is answered correctly later. */
  function avgScore(ids, map) {
    if (!ids.length) return null;
    var seen = 0, q = 0;
    for (var i = 0; i < ids.length; i++) {
      var it = map[ids[i]];
      if (isSeen(it)) { seen++; q += itemScore(it); }
    }
    var coverage = seen / ids.length;
    var quality = seen ? q / seen : 0;
    return 0.6 * coverage + 0.4 * quality;
  }
  /* content: { questions[], cards[], lessons[] } */
  function domainMastery(state, content, dom) {
    var qs = content.questions.filter(function (x) { return x.domain === dom; }).map(function (x) { return x.id; });
    var cs = content.cards.filter(function (x) { return x.domain === dom; }).map(function (x) { return x.id; });
    var ls = content.lessons.filter(function (x) { return x.domain === dom; }).map(function (x) { return x.id; });
    var parts = [
      { v: avgScore(qs, state.q), w: 0.7 },
      { v: avgScore(cs, state.c), w: 0.2 },
      { v: ls.length ? ls.filter(function (id) { return state.lessons[id]; }).length / ls.length : null, w: 0.1 }
    ];
    var sw = 0, sv = 0;
    parts.forEach(function (p) { if (p.v !== null) { sw += p.w; sv += p.w * p.v; } });
    return sw ? sv / sw : 0;
  }
  function readiness(state, content, domains) {
    var sw = 0, sv = 0;
    domains.forEach(function (d) { sw += d.weight; sv += d.weight * domainMastery(state, content, d.id); });
    return sw ? sv / sw : 0;
  }
  function weakestDomain(state, content, domains) {
    var best = null, bv = 2;
    domains.forEach(function (d) {
      var m = domainMastery(state, content, d.id);
      if (m < bv - 1e-9) { bv = m; best = d.id; }
    });
    return best;
  }

  /* ---------- queues ---------- */
  function dueIds(state, content, today) {
    return {
      questions: content.questions.filter(function (q) { return isDue(state.q[q.id], today); }).map(function (q) { return q.id; }),
      cards: content.cards.filter(function (c) { return isDue(state.c[c.id], today); }).map(function (c) { return c.id; })
    };
  }
  function weakQuestionIds(state, content) {
    return content.questions.filter(function (q) {
      var it = state.q[q.id];
      return isSeen(it) && (it.lastOk === false || (it.wrong > 0 && it.box <= 3));
    }).map(function (q) { return q.id; });
  }
  function drillSelect(questions, state, opts) {
    var pool = questions.filter(function (q) { return !opts.domain || opts.domain === "mixed" || q.domain === opts.domain; });
    var seed = opts.seed;
    var list;
    if (opts.unseenFirst) {
      var un = shuffle(pool.filter(function (q) { return !isSeen(state.q[q.id]); }), seed);
      var se = shuffle(pool.filter(function (q) { return isSeen(state.q[q.id]); }), seed + 1);
      list = un.concat(se);
    } else list = shuffle(pool, seed);
    var n = opts.n && opts.n > 0 ? opts.n : list.length;
    return list.slice(0, n).map(function (q) { return q.id; });
  }
  /* largest remainder allocation of n across domains by weight */
  function allocate(domains, n) {
    var tot = domains.reduce(function (a, d) { return a + d.weight; }, 0);
    var res = domains.map(function (d, i) {
      var raw = n * d.weight / tot;
      return { id: d.id, i: i, base: Math.floor(raw), frac: raw - Math.floor(raw) };
    });
    var used = res.reduce(function (a, r) { return a + r.base; }, 0);
    var order = res.slice().sort(function (a, b) { return b.frac - a.frac || a.i - b.i; });
    for (var k = 0; used < n; k++, used++) order[k % order.length].base++;
    var out = {};
    res.forEach(function (r) { out[r.id] = r.base; });
    return out;
  }
  function checkupSelect(questions, domains, n, seed) {
    var alloc = allocate(domains, n);
    var picked = [];
    domains.forEach(function (d) {
      var pool = shuffle(questions.filter(function (q) { return q.domain === d.id; }), seed + seedFrom(d.id));
      picked = picked.concat(pool.slice(0, alloc[d.id]).map(function (q) { return q.id; }));
    });
    return shuffle(picked, seed + 7);
  }

  /* ---------- answers ---------- */
  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    var s = a.slice().sort(), t = b.slice().sort();
    for (var i = 0; i < s.length; i++) if (s[i] !== t[i]) return false;
    return true;
  }
  function isCorrect(q, selected) { return sameSet(q.correct, selected); }
  /* order: array of original option indexes in display order */
  function optionOrder(q, seed) {
    var idx = q.options.map(function (_, i) { return i; });
    return shuffle(idx, seed + "|" + q.id);
  }
  function breakdown(questions, answers, domains) {
    var by = {};
    domains.forEach(function (d) { by[d.id] = { right: 0, total: 0 }; });
    var qmap = {};
    questions.forEach(function (q) { qmap[q.id] = q; });
    answers.forEach(function (a) {
      var q = qmap[a.qid]; if (!q || !by[q.domain]) return;
      by[q.domain].total++; if (a.correct) by[q.domain].right++;
    });
    return by;
  }

  /* ---------- streak ---------- */
  function recordDay(days, today, n) {
    var k = dayISO(today);
    var out = {};
    for (var key in days) if (Object.prototype.hasOwnProperty.call(days, key)) out[key] = days[key];
    out[k] = (out[k] || 0) + (n || 1);
    return out;
  }
  function streak(days, today) {
    var d = today;
    if (!(days[dayISO(d)] > 0)) d = today - 1;
    var n = 0;
    while (days[dayISO(d)] > 0) { n++; d--; }
    return n;
  }

  /* ---------- dashboard helpers ---------- */
  function weakestDomains(state, content, domains, k) {
    return domains.map(function (d, i) { return { id: d.id, i: i, m: domainMastery(state, content, d.id) }; })
      .sort(function (a, b) { return a.m - b.m || a.i - b.i; }).slice(0, k).map(function (x) { return { id: x.id, mastery: x.m }; });
  }
  function takeSnapshot(state, content, domains, today) {
    var out = {};
    for (var k in state.snaps) out[k] = state.snaps[k];
    out[dayISO(today)] = Math.round(readiness(state, content, domains) * 1000) / 10;
    return out;
  }
  /* last n days ending today; value null when no snapshot, carries nothing forward */
  function snapSeries(snaps, today, n) {
    var res = [];
    for (var i = n - 1; i >= 0; i--) {
      var iso = dayISO(today - i);
      res.push({ day: iso, value: typeof snaps[iso] === "number" ? snaps[iso] : null });
    }
    return res;
  }
  function mascotMood(right, total) {
    if (!total) return "neutral";
    var p = right / total;
    return p >= 0.9 ? "celebrate" : p >= 0.7 ? "happy" : p >= 0.5 ? "neutral" : "thinking";
  }
  function countSeen(map) { return Object.keys(map).filter(function (k) { return map[k] && map[k].seen > 0; }).length; }

  /* ---------- next action ---------- */
  function nextLesson(state, content, dom) {
    var ls = content.lessons.filter(function (x) { return x.domain === dom; }).sort(function (a, b) { return a.n - b.n; });
    for (var i = 0; i < ls.length; i++) if (!state.lessons[ls[i].id]) return ls[i];
    return null;
  }
  function nextAction(state, content, domains, today) {
    var due = dueIds(state, content, today);
    var nd = due.questions.length + due.cards.length;
    if (nd > 0) return { type: "review", count: nd, qCount: due.questions.length, cCount: due.cards.length };
    var anySeen = Object.keys(state.q).length + Object.keys(state.c).length + Object.keys(state.lessons).length;
    if (!anySeen) {
      var first = nextLesson(state, content, domains[0].id);
      if (first) return { type: "lesson", lesson: first.id, domain: first.domain };
    }
    var w = weakestDomain(state, content, domains);
    var nl = nextLesson(state, content, w);
    if (nl) return { type: "lesson", lesson: nl.id, domain: w };
    return { type: "drill", domain: w };
  }

  /* ---------- study plan ---------- */
  function buildTaskList(domains, content) {
    var tasks = [];
    domains.forEach(function (d) {
      content.lessons.filter(function (l) { return l.domain === d.id; }).sort(function (a, b) { return a.n - b.n; })
        .forEach(function (l) { tasks.push({ key: "L:" + l.id, type: "lesson", domain: d.id, ref: l.id }); });
      tasks.push({ key: "C:" + d.id, type: "cards", domain: d.id });
      tasks.push({ key: "D:" + d.id, type: "drill", domain: d.id });
    });
    return tasks;
  }
  function copyTask(t) { var c = {}; for (var k in t) c[k] = t[k]; return c; }
  function spread(tasks, startDay, endDay) {
    var days = Math.max(1, endDay - startDay + 1);
    var out = [];
    for (var i = 0; i < tasks.length; i++) {
      var off = Math.min(days - 1, Math.floor(i * days / tasks.length));
      var t = copyTask(tasks[i]);
      t.day = startDay + off;
      out.push(t);
    }
    return out;
  }
  function checkupDays(startDay, endDay) {
    var res = [];
    for (var d = startDay + 6; d <= endDay; d += 7) res.push(d);
    if (!res.length || res[res.length - 1] !== endDay) res.push(endDay);
    return res;
  }
  /* opts: { start, target (day numbers), domains[], content } */
  function generatePlan(opts) {
    var start = opts.start, target = Math.max(opts.target, opts.start);
    var base = spread(buildTaskList(opts.domains, opts.content), start, target);
    var cks = checkupDays(start, target).map(function (d, i) {
      return { key: "K:" + (i + 1), type: "checkup", domain: null, day: d, label: "Check-up " + (i + 1) };
    });
    return { start: start, target: target, tasks: base.concat(cks), done: {} };
  }
  function taskDone(plan, task, state) {
    if (plan.done && plan.done[task.key]) return true;
    return task.type === "lesson" && !!(state && state.lessons && state.lessons[task.ref]);
  }
  /* returns { today[], overdue[], upcoming[], doneCount, total, late } */
  function planToday(plan, state, today) {
    var tod = [], over = [], up = [], done = 0;
    plan.tasks.forEach(function (t) {
      var d = taskDone(plan, t, state);
      if (d) done++;
      if (d) { if (t.day === today) tod.push({ task: t, done: true }); return; }
      if (t.day < today) over.push({ task: t, done: false });
      else if (t.day === today) tod.push({ task: t, done: false });
      else up.push({ task: t, done: false });
    });
    return { today: tod, overdue: over, upcoming: up, doneCount: done, total: plan.tasks.length, late: today > plan.target };
  }
  /* respread the undone tasks across the remaining days */
  function rebalance(plan, state, today) {
    var from = Math.max(today, plan.start);
    var endDay = Math.max(plan.target, from);
    var keep = [], todo = [];
    plan.tasks.forEach(function (t) {
      if (taskDone(plan, t, state)) keep.push(t);
      else if (t.type === "checkup") { var c = copyTask(t); if (c.day < from) c.day = from; keep.push(c); }
      else todo.push(t);
    });
    var res = { start: plan.start, target: endDay, tasks: keep.concat(spread(todo, from, endDay)), done: plan.done || {} };
    res.tasks.sort(function (a, b) { return a.day - b.day; });
    return res;
  }

  /* ---------- state shape ---------- */
  function emptyState() {
    return { v: STATE_VERSION, q: {}, c: {}, lessons: {}, days: {}, plan: null, cap: {}, checkups: [], ack: false, last: {}, snaps: {} };
  }
  function isObj(x) { return !!x && typeof x === "object" && !Array.isArray(x); }
  function cleanItem(it) {
    if (!isObj(it)) return null;
    var box = Math.round(+it.box), due = Math.round(+it.due), seen = Math.round(+it.seen);
    if (!(box >= 1 && box <= 5) || !isFinite(due) || !(seen >= 1)) return null;
    return { box: box, due: due, seen: seen, right: Math.max(0, Math.round(+it.right) || 0), wrong: Math.max(0, Math.round(+it.wrong) || 0), lastOk: it.lastOk === true ? true : it.lastOk === false ? false : null };
  }
  function cleanMap(m, cleaner) {
    var out = {};
    if (!isObj(m)) return out;
    Object.keys(m).forEach(function (k) { var v = cleaner(m[k]); if (v !== null && v !== undefined) out[k] = v; });
    return out;
  }
  function normalizeState(raw) {
    var s = emptyState();
    if (!isObj(raw)) return s;
    s.q = cleanMap(raw.q, cleanItem);
    s.c = cleanMap(raw.c, cleanItem);
    s.lessons = cleanMap(raw.lessons, function (v) { return v ? true : null; });
    s.days = cleanMap(raw.days, function (v) { v = +v; return v > 0 && isFinite(v) ? Math.round(v) : null; });
    s.cap = cleanMap(raw.cap, function (v) {
      if (!isObj(v)) return null;
      var sc = +v.s, o = {};
      if (v.s !== null && v.s !== "" && (sc === 0 || sc === 1 || sc === 2)) o.s = sc;
      if (typeof v.n === "string" && v.n) o.n = v.n.slice(0, 4000);
      return Object.keys(o).length ? o : null;
    });
    if (Array.isArray(raw.checkups)) {
      s.checkups = raw.checkups.filter(function (c) { return isObj(c) && isFinite(+c.day) && isFinite(+c.right) && isFinite(+c.total); })
        .map(function (c) { return { day: +c.day, right: +c.right, total: +c.total, by: isObj(c.by) ? c.by : {} }; }).slice(-50);
    }
    if (isObj(raw.plan) && isFinite(+raw.plan.start) && isFinite(+raw.plan.target) && Array.isArray(raw.plan.tasks)) {
      var tasks = raw.plan.tasks.filter(function (t) { return isObj(t) && typeof t.key === "string" && isFinite(+t.day) && typeof t.type === "string"; })
        .map(function (t) {
          var o = { key: t.key, type: t.type, domain: typeof t.domain === "string" ? t.domain : null, day: +t.day };
          if (typeof t.ref === "string") o.ref = t.ref;
          if (typeof t.label === "string") o.label = t.label;
          return o;
        });
      if (tasks.length) s.plan = { start: +raw.plan.start, target: +raw.plan.target, tasks: tasks, done: cleanMap(raw.plan.done, function (v) { return v ? true : null; }) };
    }
    s.last = cleanMap(raw.last, function (v) { v = +v; return isFinite(v) && v > 0 ? Math.round(v) : null; });
    s.snaps = cleanMap(raw.snaps, function (v) { v = +v; return isFinite(v) && v >= 0 && v <= 100 ? Math.round(v * 10) / 10 : null; });
    s.ack = raw.ack === true;
    return s;
  }
  function validateBackup(obj) {
    if (!isObj(obj)) return { ok: false, error: "Not a backup object." };
    if (obj.app !== "aipocoach") return { ok: false, error: "This file is not a backup from this app." };
    if (!isObj(obj.state)) return { ok: false, error: "Backup has no progress data." };
    if (!(obj.state.v >= 1)) return { ok: false, error: "Backup has no version." };
    if (obj.state.v > STATE_VERSION) return { ok: false, error: "Backup is from a newer version of the app." };
    return { ok: true, state: normalizeState(obj.state) };
  }

  /* ---------- capstone ---------- */
  function capstoneResult(areas, cap) {
    var total = 0, max = 0, by = areas.map(function (a) {
      var s = 0, m = 0, answered = 0;
      a.items.forEach(function (it) {
        m += 2;
        var e = cap[it.id];
        if (e && typeof e.s === "number") { s += e.s; answered++; }
      });
      total += s; max += m;
      return { id: a.id, score: s, max: m, answered: answered, count: a.items.length };
    });
    return { total: total, max: max, by: by };
  }

  return {
    INTERVALS: INTERVALS, STATE_VERSION: STATE_VERSION,
    dayNum: dayNum, dayISO: dayISO, mulberry32: mulberry32, seedFrom: seedFrom, shuffle: shuffle,
    record: record, isSeen: isSeen, isDue: isDue, itemScore: itemScore,
    domainMastery: domainMastery, readiness: readiness, weakestDomain: weakestDomain, weakestDomains: weakestDomains, takeSnapshot: takeSnapshot, snapSeries: snapSeries, mascotMood: mascotMood, countSeen: countSeen,
    dueIds: dueIds, weakQuestionIds: weakQuestionIds, drillSelect: drillSelect, allocate: allocate, checkupSelect: checkupSelect,
    isCorrect: isCorrect, optionOrder: optionOrder, breakdown: breakdown,
    recordDay: recordDay, streak: streak, nextLesson: nextLesson, nextAction: nextAction,
    generatePlan: generatePlan, planToday: planToday, rebalance: rebalance, taskDone: taskDone,
    emptyState: emptyState, normalizeState: normalizeState, validateBackup: validateBackup, capstoneResult: capstoneResult
  };
});

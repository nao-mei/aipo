/* Original robot mascot. Shapes are plain data so the same artwork can be drawn as
   inline SVG in the app and rasterised by the icon script. Viewbox is 100 x 100. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.Mascot = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  var C = { head: "#4f46e5", body: "#3730a3", plate: "#1e1b4b", glow: "#5eead4", accent: "#ff5fa2", ear: "#6366f1", white: "#ffffff" };
  var MOODS = ["neutral", "happy", "thinking", "celebrate"];

  function rect(x, y, w, h, r, fill) { return { t: "rect", x: x, y: y, w: w, h: h, r: r, fill: fill }; }
  function circle(cx, cy, r, fill) { return { t: "circle", cx: cx, cy: cy, r: r, fill: fill }; }
  /* arc stroke: angles in degrees, screen coordinates (y down); 0 = right, 90 = down */
  function arc(cx, cy, r, w, a0, a1, fill) { return { t: "arc", cx: cx, cy: cy, r: r, w: w, a0: a0, a1: a1, fill: fill }; }
  function pt(cx, cy, r, a) { var q = a * Math.PI / 180; return [cx + r * Math.cos(q), cy + r * Math.sin(q)]; }
  function capped(cx, cy, r, w, a0, a1, fill) {
    var p0 = pt(cx, cy, r, a0), p1 = pt(cx, cy, r, a1);
    return [arc(cx, cy, r, w, a0, a1, fill), circle(p0[0], p0[1], w / 2, fill), circle(p1[0], p1[1], w / 2, fill)];
  }

  function shapes(mood) {
    if (MOODS.indexOf(mood) < 0) mood = "neutral";
    var s = [];
    s.push(rect(48.5, 9, 3, 13, 1.5, C.body));
    s.push(circle(50, 8, 5, C.accent));
    s.push(rect(9, 42, 9, 20, 4.5, C.ear));
    s.push(rect(82, 42, 9, 20, 4.5, C.ear));
    s.push(rect(16, 20, 68, 58, 20, C.head));
    s.push(rect(23, 29, 54, 40, 14, C.plate));
    s.push(rect(27, 80, 46, 16, 8, C.body));
    s.push(circle(50, 88, 3.6, C.glow));
    var happyEyes = mood === "happy" || mood === "celebrate";
    if (happyEyes) {
      s = s.concat(capped(39.5, 50, 6, 3.4, 190, 350, C.glow));
      s = s.concat(capped(60.5, 50, 6, 3.4, 190, 350, C.glow));
    } else if (mood === "thinking") {
      s.push(circle(39.5, 46, 5.5, C.glow));
      s.push(circle(60.5, 44, 3.6, C.glow));
    } else {
      s.push(circle(39.5, 46, 5.5, C.glow));
      s.push(circle(60.5, 46, 5.5, C.glow));
    }
    if (mood === "happy") s = s.concat(capped(50, 53, 9, 3.4, 30, 150, C.glow));
    else if (mood === "celebrate") {
      s.push(rect(40, 56, 20, 9, 4.5, C.glow));
      s.push(rect(44, 60, 12, 5, 2.5, C.accent));
    } else if (mood === "thinking") s.push(rect(43, 59, 12, 3.4, 1.7, C.glow));
    else s.push(rect(42.5, 58.5, 15, 3.4, 1.7, C.glow));
    if (mood === "thinking") {
      s.push(circle(88, 22, 2.2, C.glow));
      s.push(circle(92, 14, 3, C.glow));
      s.push(circle(94, 5, 4, C.glow));
    }
    if (mood === "celebrate") {
      s.push(rect(8, 12, 5, 5, 1, C.accent));
      s.push(circle(90, 14, 3, C.glow));
      s.push(rect(86, 28, 5, 5, 1, C.accent));
      s.push(circle(8, 30, 2.6, C.glow));
      s.push(circle(22, 8, 2.4, C.accent));
    }
    return s;
  }

  function f(n) { return Math.round(n * 100) / 100; }
  function shapeToSvg(sh) {
    if (sh.t === "rect") return '<rect x="' + sh.x + '" y="' + sh.y + '" width="' + sh.w + '" height="' + sh.h + '" rx="' + sh.r + '" fill="' + sh.fill + '"/>';
    if (sh.t === "circle") return '<circle cx="' + f(sh.cx) + '" cy="' + f(sh.cy) + '" r="' + sh.r + '" fill="' + sh.fill + '"/>';
    var p0 = pt(sh.cx, sh.cy, sh.r, sh.a0), p1 = pt(sh.cx, sh.cy, sh.r, sh.a1);
    var large = ((sh.a1 - sh.a0 + 360) % 360) > 180 ? 1 : 0;
    return '<path d="M' + f(p0[0]) + " " + f(p0[1]) + " A" + sh.r + " " + sh.r + " 0 " + large + " 1 " + f(p1[0]) + " " + f(p1[1]) + '" fill="none" stroke="' + sh.fill + '" stroke-width="' + sh.w + '"/>';
  }
  /* inner markup only, to be placed inside any svg */
  function inner(mood) { return shapes(mood).map(shapeToSvg).join(""); }
  /* inline svg for html (no namespace attribute is needed there) */
  function svg(mood, size, label) {
    return '<svg viewBox="0 0 100 100" width="' + size + '" height="' + size + '" role="img" aria-label="' + (label || "Robot coach") + '" focusable="false">' + inner(mood) + "</svg>";
  }

  /* coverage test for the rasteriser: is point (x, y) inside the shape */
  function inside(sh, x, y) {
    if (sh.t === "circle") { var dx = x - sh.cx, dy = y - sh.cy; return dx * dx + dy * dy <= sh.r * sh.r; }
    if (sh.t === "rect") {
      if (x < sh.x || x > sh.x + sh.w || y < sh.y || y > sh.y + sh.h) return false;
      var r = Math.min(sh.r, sh.w / 2, sh.h / 2);
      var cx = x < sh.x + r ? sh.x + r : x > sh.x + sh.w - r ? sh.x + sh.w - r : x;
      var cy = y < sh.y + r ? sh.y + r : y > sh.y + sh.h - r ? sh.y + sh.h - r : y;
      return (x - cx) * (x - cx) + (y - cy) * (y - cy) <= r * r;
    }
    var ddx = x - sh.cx, ddy = y - sh.cy, d = Math.sqrt(ddx * ddx + ddy * ddy);
    if (Math.abs(d - sh.r) > sh.w / 2) return false;
    var a = Math.atan2(ddy, ddx) * 180 / Math.PI; if (a < 0) a += 360;
    var a0 = ((sh.a0 % 360) + 360) % 360, span = (sh.a1 - sh.a0 + 360) % 360;
    return ((a - a0 + 360) % 360) <= span;
  }

  return { MOODS: MOODS, colors: C, shapes: shapes, inner: inner, svg: svg, inside: inside };
});

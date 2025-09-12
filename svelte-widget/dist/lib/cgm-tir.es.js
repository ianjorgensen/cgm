var aa = Object.defineProperty;
var la = (t, e, n) => e in t ? aa(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var ar = (t, e, n) => la(t, typeof e != "symbol" ? e + "" : e, n);
function St() {
}
function ao(t) {
  return t();
}
function li() {
  return /* @__PURE__ */ Object.create(null);
}
function _n(t) {
  t.forEach(ao);
}
function lo(t) {
  return typeof t == "function";
}
function $e(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function sa(t) {
  return Object.keys(t).length === 0;
}
function Jt(t) {
  return t ?? "";
}
function p(t, e) {
  t.appendChild(e);
}
function ht(t, e, n) {
  t.insertBefore(e, n || null);
}
function ct(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function K(t) {
  return document.createElement(t);
}
function B(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function q(t) {
  return document.createTextNode(t);
}
function at() {
  return q(" ");
}
function te() {
  return q("");
}
function Te(t, e, n, r) {
  return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
}
function f(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function ua(t) {
  return Array.from(t.childNodes);
}
function Ft(t, e) {
  e = "" + e, t.data !== e && (t.data = /** @type {string} */
  e);
}
function Q(t, e, n, r) {
  n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, "");
}
function fa(t, e, { bubbles: n = !1, cancelable: r = !1 } = {}) {
  return new CustomEvent(t, { detail: e, bubbles: n, cancelable: r });
}
let dn;
function cn(t) {
  dn = t;
}
function so() {
  if (!dn) throw new Error("Function called outside component initialization");
  return dn;
}
function bn(t) {
  so().$$.on_mount.push(t);
}
function uo() {
  const t = so();
  return (e, n, { cancelable: r = !1 } = {}) => {
    const i = t.$$.callbacks[e];
    if (i) {
      const o = fa(
        /** @type {string} */
        e,
        n,
        { cancelable: r }
      );
      return i.slice().forEach((l) => {
        l.call(t, o);
      }), !o.defaultPrevented;
    }
    return !0;
  };
}
const Ie = [], Xe = [];
let qe = [];
const si = [], ca = /* @__PURE__ */ Promise.resolve();
let yr = !1;
function ha() {
  yr || (yr = !0, ca.then(fo));
}
function vr(t) {
  qe.push(t);
}
const lr = /* @__PURE__ */ new Set();
let ze = 0;
function fo() {
  if (ze !== 0)
    return;
  const t = dn;
  do {
    try {
      for (; ze < Ie.length; ) {
        const e = Ie[ze];
        ze++, cn(e), ga(e.$$);
      }
    } catch (e) {
      throw Ie.length = 0, ze = 0, e;
    }
    for (cn(null), Ie.length = 0, ze = 0; Xe.length; ) Xe.pop()();
    for (let e = 0; e < qe.length; e += 1) {
      const n = qe[e];
      lr.has(n) || (lr.add(n), n());
    }
    qe.length = 0;
  } while (Ie.length);
  for (; si.length; )
    si.pop()();
  yr = !1, lr.clear(), cn(t);
}
function ga(t) {
  if (t.fragment !== null) {
    t.update(), _n(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(vr);
  }
}
function da(t) {
  const e = [], n = [];
  qe.forEach((r) => t.indexOf(r) === -1 ? e.push(r) : n.push(r)), n.forEach((r) => r()), qe = e;
}
const ma = /* @__PURE__ */ new Set();
function pa(t, e) {
  t && t.i && (ma.delete(t), t.i(e));
}
function wa(t, e, n) {
  const { fragment: r, after_update: i } = t.$$;
  r && r.m(e, n), vr(() => {
    const o = t.$$.on_mount.map(ao).filter(lo);
    t.$$.on_destroy ? t.$$.on_destroy.push(...o) : _n(o), t.$$.on_mount = [];
  }), i.forEach(vr);
}
function ya(t, e) {
  const n = t.$$;
  n.fragment !== null && (da(n.after_update), _n(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function va(t, e) {
  t.$$.dirty[0] === -1 && (Ie.push(t), ha(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function Je(t, e, n, r, i, o, l = null, s = [-1]) {
  const u = dn;
  cn(t);
  const a = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: o,
    update: St,
    not_equal: i,
    bound: li(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (u ? u.$$.context : [])),
    // everything else
    callbacks: li(),
    dirty: s,
    skip_bound: !1,
    root: e.target || u.$$.root
  };
  l && l(a.root);
  let h = !1;
  if (a.ctx = n ? n(t, e.props || {}, (c, m, ...g) => {
    const w = g.length ? g[0] : m;
    return a.ctx && i(a.ctx[c], a.ctx[c] = w) && (!a.skip_bound && a.bound[c] && a.bound[c](w), h && va(t, c)), m;
  }) : [], a.update(), h = !0, _n(a.before_update), a.fragment = r ? r(a.ctx) : !1, e.target) {
    if (e.hydrate) {
      const c = ua(e.target);
      a.fragment && a.fragment.l(c), c.forEach(ct);
    } else
      a.fragment && a.fragment.c();
    e.intro && pa(t.$$.fragment), wa(t, e.target, e.anchor), fo();
  }
  cn(u);
}
class Ke {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    ar(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    ar(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    ya(this, 1), this.$destroy = St;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, n) {
    if (!lo(n))
      return St;
    const r = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return r.push(n), () => {
      const i = r.indexOf(n);
      i !== -1 && r.splice(i, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(e) {
    this.$$set && !sa(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const _a = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(_a);
function Yn(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ba(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function co(t) {
  let e, n, r;
  t.length !== 2 ? (e = Yn, n = (s, u) => Yn(t(s), u), r = (s, u) => t(s) - u) : (e = t === Yn || t === ba ? t : xa, n = t, r = t);
  function i(s, u, a = 0, h = s.length) {
    if (a < h) {
      if (e(u, u) !== 0) return h;
      do {
        const c = a + h >>> 1;
        n(s[c], u) < 0 ? a = c + 1 : h = c;
      } while (a < h);
    }
    return a;
  }
  function o(s, u, a = 0, h = s.length) {
    if (a < h) {
      if (e(u, u) !== 0) return h;
      do {
        const c = a + h >>> 1;
        n(s[c], u) <= 0 ? a = c + 1 : h = c;
      } while (a < h);
    }
    return a;
  }
  function l(s, u, a = 0, h = s.length) {
    const c = i(s, u, a, h - 1);
    return c > a && r(s[c - 1], u) > -r(s[c], u) ? c - 1 : c;
  }
  return { left: i, center: l, right: o };
}
function xa() {
  return 0;
}
function Ma(t) {
  return t === null ? NaN : +t;
}
const Ta = co(Yn), ka = Ta.right;
co(Ma).center;
function Ca(t, e) {
  let n = 0, r, i = 0, o = 0;
  for (let l of t)
    l != null && (l = +l) >= l && (r = l - i, i += r / ++n, o += r * (l - i));
  if (n > 1) return o / (n - 1);
}
const Da = Math.sqrt(50), Na = Math.sqrt(10), Aa = Math.sqrt(2);
function In(t, e, n) {
  const r = (e - t) / Math.max(0, n), i = Math.floor(Math.log10(r)), o = r / Math.pow(10, i), l = o >= Da ? 10 : o >= Na ? 5 : o >= Aa ? 2 : 1;
  let s, u, a;
  return i < 0 ? (a = Math.pow(10, -i) / l, s = Math.round(t * a), u = Math.round(e * a), s / a < t && ++s, u / a > e && --u, a = -a) : (a = Math.pow(10, i) * l, s = Math.round(t / a), u = Math.round(e / a), s * a < t && ++s, u * a > e && --u), u < s && 0.5 <= n && n < 2 ? In(t, e, n * 2) : [s, u, a];
}
function Sa(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const r = e < t, [i, o, l] = r ? In(e, t, n) : In(t, e, n);
  if (!(o >= i)) return [];
  const s = o - i + 1, u = new Array(s);
  if (r)
    if (l < 0) for (let a = 0; a < s; ++a) u[a] = (o - a) / -l;
    else for (let a = 0; a < s; ++a) u[a] = (o - a) * l;
  else if (l < 0) for (let a = 0; a < s; ++a) u[a] = (i + a) / -l;
  else for (let a = 0; a < s; ++a) u[a] = (i + a) * l;
  return u;
}
function _r(t, e, n) {
  return e = +e, t = +t, n = +n, In(t, e, n)[2];
}
function Fa(t, e, n) {
  e = +e, t = +t, n = +n;
  const r = e < t, i = r ? _r(e, t, n) : _r(t, e, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function Ua(t, e) {
  let n = 0, r = 0;
  for (let i of t)
    i != null && (i = +i) >= i && (++n, r += i);
  if (n) return r / n;
}
function br(t, e, n) {
  t = +t, e = +e, n = (i = arguments.length) < 2 ? (e = t, t = 0, 1) : i < 3 ? 1 : +n;
  for (var r = -1, i = Math.max(0, Math.ceil((e - t) / n)) | 0, o = new Array(i); ++r < i; )
    o[r] = t + r * n;
  return o;
}
function Ea(t) {
  return t;
}
var sr = 1, ur = 2, xr = 3, ln = 4, ui = 1e-6;
function La(t) {
  return "translate(" + t + ",0)";
}
function Ra(t) {
  return "translate(0," + t + ")";
}
function Ya(t) {
  return (e) => +t(e);
}
function Pa(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function za() {
  return !this.__axis;
}
function ho(t, e) {
  var n = [], r = null, i = null, o = 6, l = 6, s = 3, u = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, a = t === sr || t === ln ? -1 : 1, h = t === ln || t === ur ? "x" : "y", c = t === sr || t === xr ? La : Ra;
  function m(g) {
    var w = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), y = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : Ea), C = Math.max(o, 0) + s, T = e.range(), L = +T[0] + u, A = +T[T.length - 1] + u, k = (e.bandwidth ? Pa : Ya)(e.copy(), u), S = g.selection ? g.selection() : g, R = S.selectAll(".domain").data([null]), U = S.selectAll(".tick").data(w, e).order(), Y = U.exit(), z = U.enter().append("g").attr("class", "tick"), E = U.select("line"), v = U.select("text");
    R = R.merge(R.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), U = U.merge(z), E = E.merge(z.append("line").attr("stroke", "currentColor").attr(h + "2", a * o)), v = v.merge(z.append("text").attr("fill", "currentColor").attr(h, a * C).attr("dy", t === sr ? "0em" : t === xr ? "0.71em" : "0.32em")), g !== S && (R = R.transition(g), U = U.transition(g), E = E.transition(g), v = v.transition(g), Y = Y.transition(g).attr("opacity", ui).attr("transform", function(b) {
      return isFinite(b = k(b)) ? c(b + u) : this.getAttribute("transform");
    }), z.attr("opacity", ui).attr("transform", function(b) {
      var X = this.parentNode.__axis;
      return c((X && isFinite(X = X(b)) ? X : k(b)) + u);
    })), Y.remove(), R.attr("d", t === ln || t === ur ? l ? "M" + a * l + "," + L + "H" + u + "V" + A + "H" + a * l : "M" + u + "," + L + "V" + A : l ? "M" + L + "," + a * l + "V" + u + "H" + A + "V" + a * l : "M" + L + "," + u + "H" + A), U.attr("opacity", 1).attr("transform", function(b) {
      return c(k(b) + u);
    }), E.attr(h + "2", a * o), v.attr(h, a * C).text(y), S.filter(za).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === ur ? "start" : t === ln ? "end" : "middle"), S.each(function() {
      this.__axis = k;
    });
  }
  return m.scale = function(g) {
    return arguments.length ? (e = g, m) : e;
  }, m.ticks = function() {
    return n = Array.from(arguments), m;
  }, m.tickArguments = function(g) {
    return arguments.length ? (n = g == null ? [] : Array.from(g), m) : n.slice();
  }, m.tickValues = function(g) {
    return arguments.length ? (r = g == null ? null : Array.from(g), m) : r && r.slice();
  }, m.tickFormat = function(g) {
    return arguments.length ? (i = g, m) : i;
  }, m.tickSize = function(g) {
    return arguments.length ? (o = l = +g, m) : o;
  }, m.tickSizeInner = function(g) {
    return arguments.length ? (o = +g, m) : o;
  }, m.tickSizeOuter = function(g) {
    return arguments.length ? (l = +g, m) : l;
  }, m.tickPadding = function(g) {
    return arguments.length ? (s = +g, m) : s;
  }, m.offset = function(g) {
    return arguments.length ? (u = +g, m) : u;
  }, m;
}
function Ha(t) {
  return ho(xr, t);
}
function Ia(t) {
  return ho(ln, t);
}
var Wa = { value: () => {
} };
function go() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Pn(n);
}
function Pn(t) {
  this._ = t;
}
function qa(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Pn.prototype = go.prototype = {
  constructor: Pn,
  on: function(t, e) {
    var n = this._, r = qa(t + "", n), i, o = -1, l = r.length;
    if (arguments.length < 2) {
      for (; ++o < l; ) if ((i = (t = r[o]).type) && (i = Va(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++o < l; )
      if (i = (t = r[o]).type) n[i] = fi(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = fi(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Pn(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, o; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(e, n);
  }
};
function Va(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function fi(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Wa, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Mr = "http://www.w3.org/1999/xhtml";
const ci = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Mr,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function jn(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), ci.hasOwnProperty(e) ? { space: ci[e], local: t } : t;
}
function Xa(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Mr && e.documentElement.namespaceURI === Mr ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Ba(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function mo(t) {
  var e = jn(t);
  return (e.local ? Ba : Xa)(e);
}
function Oa() {
}
function Er(t) {
  return t == null ? Oa : function() {
    return this.querySelector(t);
  };
}
function Ga(t) {
  typeof t != "function" && (t = Er(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], l = o.length, s = r[i] = new Array(l), u, a, h = 0; h < l; ++h)
      (u = o[h]) && (a = t.call(u, u.__data__, h, o)) && ("__data__" in u && (a.__data__ = u.__data__), s[h] = a);
  return new Qt(r, this._parents);
}
function Za(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Qa() {
  return [];
}
function po(t) {
  return t == null ? Qa : function() {
    return this.querySelectorAll(t);
  };
}
function $a(t) {
  return function() {
    return Za(t.apply(this, arguments));
  };
}
function Ja(t) {
  typeof t == "function" ? t = $a(t) : t = po(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var l = e[o], s = l.length, u, a = 0; a < s; ++a)
      (u = l[a]) && (r.push(t.call(u, u.__data__, a, l)), i.push(u));
  return new Qt(r, i);
}
function wo(t) {
  return function() {
    return this.matches(t);
  };
}
function yo(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Ka = Array.prototype.find;
function ja(t) {
  return function() {
    return Ka.call(this.children, t);
  };
}
function tl() {
  return this.firstElementChild;
}
function el(t) {
  return this.select(t == null ? tl : ja(typeof t == "function" ? t : yo(t)));
}
var nl = Array.prototype.filter;
function rl() {
  return Array.from(this.children);
}
function il(t) {
  return function() {
    return nl.call(this.children, t);
  };
}
function ol(t) {
  return this.selectAll(t == null ? rl : il(typeof t == "function" ? t : yo(t)));
}
function al(t) {
  typeof t != "function" && (t = wo(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], l = o.length, s = r[i] = [], u, a = 0; a < l; ++a)
      (u = o[a]) && t.call(u, u.__data__, a, o) && s.push(u);
  return new Qt(r, this._parents);
}
function vo(t) {
  return new Array(t.length);
}
function ll() {
  return new Qt(this._enter || this._groups.map(vo), this._parents);
}
function Wn(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Wn.prototype = {
  constructor: Wn,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function sl(t) {
  return function() {
    return t;
  };
}
function ul(t, e, n, r, i, o) {
  for (var l = 0, s, u = e.length, a = o.length; l < a; ++l)
    (s = e[l]) ? (s.__data__ = o[l], r[l] = s) : n[l] = new Wn(t, o[l]);
  for (; l < u; ++l)
    (s = e[l]) && (i[l] = s);
}
function fl(t, e, n, r, i, o, l) {
  var s, u, a = /* @__PURE__ */ new Map(), h = e.length, c = o.length, m = new Array(h), g;
  for (s = 0; s < h; ++s)
    (u = e[s]) && (m[s] = g = l.call(u, u.__data__, s, e) + "", a.has(g) ? i[s] = u : a.set(g, u));
  for (s = 0; s < c; ++s)
    g = l.call(t, o[s], s, o) + "", (u = a.get(g)) ? (r[s] = u, u.__data__ = o[s], a.delete(g)) : n[s] = new Wn(t, o[s]);
  for (s = 0; s < h; ++s)
    (u = e[s]) && a.get(m[s]) === u && (i[s] = u);
}
function cl(t) {
  return t.__data__;
}
function hl(t, e) {
  if (!arguments.length) return Array.from(this, cl);
  var n = e ? fl : ul, r = this._parents, i = this._groups;
  typeof t != "function" && (t = sl(t));
  for (var o = i.length, l = new Array(o), s = new Array(o), u = new Array(o), a = 0; a < o; ++a) {
    var h = r[a], c = i[a], m = c.length, g = gl(t.call(h, h && h.__data__, a, r)), w = g.length, y = s[a] = new Array(w), C = l[a] = new Array(w), T = u[a] = new Array(m);
    n(h, c, y, C, T, g, e);
    for (var L = 0, A = 0, k, S; L < w; ++L)
      if (k = y[L]) {
        for (L >= A && (A = L + 1); !(S = C[A]) && ++A < w; ) ;
        k._next = S || null;
      }
  }
  return l = new Qt(l, r), l._enter = s, l._exit = u, l;
}
function gl(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function dl() {
  return new Qt(this._exit || this._groups.map(vo), this._parents);
}
function ml(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function pl(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, l = Math.min(i, o), s = new Array(i), u = 0; u < l; ++u)
    for (var a = n[u], h = r[u], c = a.length, m = s[u] = new Array(c), g, w = 0; w < c; ++w)
      (g = a[w] || h[w]) && (m[w] = g);
  for (; u < i; ++u)
    s[u] = n[u];
  return new Qt(s, this._parents);
}
function wl() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], l; --i >= 0; )
      (l = r[i]) && (o && l.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(l, o), o = l);
  return this;
}
function yl(t) {
  t || (t = vl);
  function e(c, m) {
    return c && m ? t(c.__data__, m.__data__) : !c - !m;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var l = n[o], s = l.length, u = i[o] = new Array(s), a, h = 0; h < s; ++h)
      (a = l[h]) && (u[h] = a);
    u.sort(e);
  }
  return new Qt(i, this._parents).order();
}
function vl(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function _l() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function bl() {
  return Array.from(this);
}
function xl() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var l = r[i];
      if (l) return l;
    }
  return null;
}
function Ml() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Tl() {
  return !this.node();
}
function kl(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, l = i.length, s; o < l; ++o)
      (s = i[o]) && t.call(s, s.__data__, o, i);
  return this;
}
function Cl(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Dl(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Nl(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Al(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Sl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Fl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Ul(t, e) {
  var n = jn(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Dl : Cl : typeof e == "function" ? n.local ? Fl : Sl : n.local ? Al : Nl)(n, e));
}
function _o(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function El(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ll(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Rl(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Yl(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? El : typeof e == "function" ? Rl : Ll)(t, e, n ?? "")) : Be(this.node(), t);
}
function Be(t, e) {
  return t.style.getPropertyValue(e) || _o(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Pl(t) {
  return function() {
    delete this[t];
  };
}
function zl(t, e) {
  return function() {
    this[t] = e;
  };
}
function Hl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Il(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Pl : typeof e == "function" ? Hl : zl)(t, e)) : this.node()[t];
}
function bo(t) {
  return t.trim().split(/^|\s+/);
}
function Lr(t) {
  return t.classList || new xo(t);
}
function xo(t) {
  this._node = t, this._names = bo(t.getAttribute("class") || "");
}
xo.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Mo(t, e) {
  for (var n = Lr(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function To(t, e) {
  for (var n = Lr(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function Wl(t) {
  return function() {
    Mo(this, t);
  };
}
function ql(t) {
  return function() {
    To(this, t);
  };
}
function Vl(t, e) {
  return function() {
    (e.apply(this, arguments) ? Mo : To)(this, t);
  };
}
function Xl(t, e) {
  var n = bo(t + "");
  if (arguments.length < 2) {
    for (var r = Lr(this.node()), i = -1, o = n.length; ++i < o; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Vl : e ? Wl : ql)(n, e));
}
function Bl() {
  this.textContent = "";
}
function Ol(t) {
  return function() {
    this.textContent = t;
  };
}
function Gl(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Zl(t) {
  return arguments.length ? this.each(t == null ? Bl : (typeof t == "function" ? Gl : Ol)(t)) : this.node().textContent;
}
function Ql() {
  this.innerHTML = "";
}
function $l(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Jl(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Kl(t) {
  return arguments.length ? this.each(t == null ? Ql : (typeof t == "function" ? Jl : $l)(t)) : this.node().innerHTML;
}
function jl() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ts() {
  return this.each(jl);
}
function es() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function ns() {
  return this.each(es);
}
function rs(t) {
  var e = typeof t == "function" ? t : mo(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function is() {
  return null;
}
function os(t, e) {
  var n = typeof t == "function" ? t : mo(t), r = e == null ? is : typeof e == "function" ? e : Er(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function as() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function ls() {
  return this.each(as);
}
function ss() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function us() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function fs(t) {
  return this.select(t ? us : ss);
}
function cs(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function hs(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function gs(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function ds(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function ms(t, e, n) {
  return function() {
    var r = this.__on, i, o = hs(e);
    if (r) {
      for (var l = 0, s = r.length; l < s; ++l)
        if ((i = r[l]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, n), i = { type: t.type, name: t.name, value: e, listener: o, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function ps(t, e, n) {
  var r = gs(t + ""), i, o = r.length, l;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var u = 0, a = s.length, h; u < a; ++u)
        for (i = 0, h = s[u]; i < o; ++i)
          if ((l = r[i]).type === h.type && l.name === h.name)
            return h.value;
    }
    return;
  }
  for (s = e ? ms : ds, i = 0; i < o; ++i) this.each(s(r[i], e, n));
  return this;
}
function ko(t, e, n) {
  var r = _o(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function ws(t, e) {
  return function() {
    return ko(this, t, e);
  };
}
function ys(t, e) {
  return function() {
    return ko(this, t, e.apply(this, arguments));
  };
}
function vs(t, e) {
  return this.each((typeof e == "function" ? ys : ws)(t, e));
}
function* _s() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, l; i < o; ++i)
      (l = r[i]) && (yield l);
}
var Co = [null];
function Qt(t, e) {
  this._groups = t, this._parents = e;
}
function xn() {
  return new Qt([[document.documentElement]], Co);
}
function bs() {
  return this;
}
Qt.prototype = xn.prototype = {
  constructor: Qt,
  select: Ga,
  selectAll: Ja,
  selectChild: el,
  selectChildren: ol,
  filter: al,
  data: hl,
  enter: ll,
  exit: dl,
  join: ml,
  merge: pl,
  selection: bs,
  order: wl,
  sort: yl,
  call: _l,
  nodes: bl,
  node: xl,
  size: Ml,
  empty: Tl,
  each: kl,
  attr: Ul,
  style: Yl,
  property: Il,
  classed: Xl,
  text: Zl,
  html: Kl,
  raise: ts,
  lower: ns,
  append: rs,
  insert: os,
  remove: ls,
  clone: fs,
  datum: cs,
  on: ps,
  dispatch: vs,
  [Symbol.iterator]: _s
};
function ve(t) {
  return typeof t == "string" ? new Qt([[document.querySelector(t)]], [document.documentElement]) : new Qt([[t]], Co);
}
function Rr(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Do(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function Mn() {
}
var mn = 0.7, qn = 1 / mn, Ve = "\\s*([+-]?\\d+)\\s*", pn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", fe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", xs = /^#([0-9a-f]{3,8})$/, Ms = new RegExp(`^rgb\\(${Ve},${Ve},${Ve}\\)$`), Ts = new RegExp(`^rgb\\(${fe},${fe},${fe}\\)$`), ks = new RegExp(`^rgba\\(${Ve},${Ve},${Ve},${pn}\\)$`), Cs = new RegExp(`^rgba\\(${fe},${fe},${fe},${pn}\\)$`), Ds = new RegExp(`^hsl\\(${pn},${fe},${fe}\\)$`), Ns = new RegExp(`^hsla\\(${pn},${fe},${fe},${pn}\\)$`), hi = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Rr(Mn, Ne, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: gi,
  // Deprecated! Use color.formatHex.
  formatHex: gi,
  formatHex8: As,
  formatHsl: Ss,
  formatRgb: di,
  toString: di
});
function gi() {
  return this.rgb().formatHex();
}
function As() {
  return this.rgb().formatHex8();
}
function Ss() {
  return No(this).formatHsl();
}
function di() {
  return this.rgb().formatRgb();
}
function Ne(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = xs.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? mi(e) : n === 3 ? new Gt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Un(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Un(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Ms.exec(t)) ? new Gt(e[1], e[2], e[3], 1) : (e = Ts.exec(t)) ? new Gt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ks.exec(t)) ? Un(e[1], e[2], e[3], e[4]) : (e = Cs.exec(t)) ? Un(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Ds.exec(t)) ? yi(e[1], e[2] / 100, e[3] / 100, 1) : (e = Ns.exec(t)) ? yi(e[1], e[2] / 100, e[3] / 100, e[4]) : hi.hasOwnProperty(t) ? mi(hi[t]) : t === "transparent" ? new Gt(NaN, NaN, NaN, 0) : null;
}
function mi(t) {
  return new Gt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Un(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new Gt(t, e, n, r);
}
function Fs(t) {
  return t instanceof Mn || (t = Ne(t)), t ? (t = t.rgb(), new Gt(t.r, t.g, t.b, t.opacity)) : new Gt();
}
function Tr(t, e, n, r) {
  return arguments.length === 1 ? Fs(t) : new Gt(t, e, n, r ?? 1);
}
function Gt(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Rr(Gt, Tr, Do(Mn, {
  brighter(t) {
    return t = t == null ? qn : Math.pow(qn, t), new Gt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? mn : Math.pow(mn, t), new Gt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Gt(De(this.r), De(this.g), De(this.b), Vn(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: pi,
  // Deprecated! Use color.formatHex.
  formatHex: pi,
  formatHex8: Us,
  formatRgb: wi,
  toString: wi
}));
function pi() {
  return `#${Ce(this.r)}${Ce(this.g)}${Ce(this.b)}`;
}
function Us() {
  return `#${Ce(this.r)}${Ce(this.g)}${Ce(this.b)}${Ce((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function wi() {
  const t = Vn(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${De(this.r)}, ${De(this.g)}, ${De(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Vn(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function De(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Ce(t) {
  return t = De(t), (t < 16 ? "0" : "") + t.toString(16);
}
function yi(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new ie(t, e, n, r);
}
function No(t) {
  if (t instanceof ie) return new ie(t.h, t.s, t.l, t.opacity);
  if (t instanceof Mn || (t = Ne(t)), !t) return new ie();
  if (t instanceof ie) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), l = NaN, s = o - i, u = (o + i) / 2;
  return s ? (e === o ? l = (n - r) / s + (n < r) * 6 : n === o ? l = (r - e) / s + 2 : l = (e - n) / s + 4, s /= u < 0.5 ? o + i : 2 - o - i, l *= 60) : s = u > 0 && u < 1 ? 0 : l, new ie(l, s, u, t.opacity);
}
function Es(t, e, n, r) {
  return arguments.length === 1 ? No(t) : new ie(t, e, n, r ?? 1);
}
function ie(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Rr(ie, Es, Do(Mn, {
  brighter(t) {
    return t = t == null ? qn : Math.pow(qn, t), new ie(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? mn : Math.pow(mn, t), new ie(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new Gt(
      fr(t >= 240 ? t - 240 : t + 120, i, r),
      fr(t, i, r),
      fr(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new ie(vi(this.h), En(this.s), En(this.l), Vn(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Vn(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${vi(this.h)}, ${En(this.s) * 100}%, ${En(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function vi(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function En(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function fr(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Yr = (t) => () => t;
function Ls(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Rs(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function Ys(t) {
  return (t = +t) == 1 ? Ao : function(e, n) {
    return n - e ? Rs(e, n, t) : Yr(isNaN(e) ? n : e);
  };
}
function Ao(t, e) {
  var n = e - t;
  return n ? Ls(t, n) : Yr(isNaN(t) ? e : t);
}
const Xn = function t(e) {
  var n = Ys(e);
  function r(i, o) {
    var l = n((i = Tr(i)).r, (o = Tr(o)).r), s = n(i.g, o.g), u = n(i.b, o.b), a = Ao(i.opacity, o.opacity);
    return function(h) {
      return i.r = l(h), i.g = s(h), i.b = u(h), i.opacity = a(h), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Ps(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(o) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - o) + e[i] * o;
    return r;
  };
}
function zs(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Hs(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), o = new Array(n), l;
  for (l = 0; l < r; ++l) i[l] = Pr(t[l], e[l]);
  for (; l < n; ++l) o[l] = e[l];
  return function(s) {
    for (l = 0; l < r; ++l) o[l] = i[l](s);
    return o;
  };
}
function Is(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function re(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Ws(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Pr(t[i], e[i]) : r[i] = e[i];
  return function(o) {
    for (i in n) r[i] = n[i](o);
    return r;
  };
}
var kr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, cr = new RegExp(kr.source, "g");
function qs(t) {
  return function() {
    return t;
  };
}
function Vs(t) {
  return function(e) {
    return t(e) + "";
  };
}
function So(t, e) {
  var n = kr.lastIndex = cr.lastIndex = 0, r, i, o, l = -1, s = [], u = [];
  for (t = t + "", e = e + ""; (r = kr.exec(t)) && (i = cr.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), s[l] ? s[l] += o : s[++l] = o), (r = r[0]) === (i = i[0]) ? s[l] ? s[l] += i : s[++l] = i : (s[++l] = null, u.push({ i: l, x: re(r, i) })), n = cr.lastIndex;
  return n < e.length && (o = e.slice(n), s[l] ? s[l] += o : s[++l] = o), s.length < 2 ? u[0] ? Vs(u[0].x) : qs(e) : (e = u.length, function(a) {
    for (var h = 0, c; h < e; ++h) s[(c = u[h]).i] = c.x(a);
    return s.join("");
  });
}
function Pr(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Yr(e) : (n === "number" ? re : n === "string" ? (r = Ne(e)) ? (e = r, Xn) : So : e instanceof Ne ? Xn : e instanceof Date ? Is : zs(e) ? Ps : Array.isArray(e) ? Hs : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Ws : re)(t, e);
}
function Xs(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var _i = 180 / Math.PI, Cr = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Fo(t, e, n, r, i, o) {
  var l, s, u;
  return (l = Math.sqrt(t * t + e * e)) && (t /= l, e /= l), (u = t * n + e * r) && (n -= t * u, r -= e * u), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, u /= s), t * r < e * n && (t = -t, e = -e, u = -u, l = -l), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * _i,
    skewX: Math.atan(u) * _i,
    scaleX: l,
    scaleY: s
  };
}
var Ln;
function Bs(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Cr : Fo(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Os(t) {
  return t == null || (Ln || (Ln = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ln.setAttribute("transform", t), !(t = Ln.transform.baseVal.consolidate())) ? Cr : (t = t.matrix, Fo(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Uo(t, e, n, r) {
  function i(a) {
    return a.length ? a.pop() + " " : "";
  }
  function o(a, h, c, m, g, w) {
    if (a !== c || h !== m) {
      var y = g.push("translate(", null, e, null, n);
      w.push({ i: y - 4, x: re(a, c) }, { i: y - 2, x: re(h, m) });
    } else (c || m) && g.push("translate(" + c + e + m + n);
  }
  function l(a, h, c, m) {
    a !== h ? (a - h > 180 ? h += 360 : h - a > 180 && (a += 360), m.push({ i: c.push(i(c) + "rotate(", null, r) - 2, x: re(a, h) })) : h && c.push(i(c) + "rotate(" + h + r);
  }
  function s(a, h, c, m) {
    a !== h ? m.push({ i: c.push(i(c) + "skewX(", null, r) - 2, x: re(a, h) }) : h && c.push(i(c) + "skewX(" + h + r);
  }
  function u(a, h, c, m, g, w) {
    if (a !== c || h !== m) {
      var y = g.push(i(g) + "scale(", null, ",", null, ")");
      w.push({ i: y - 4, x: re(a, c) }, { i: y - 2, x: re(h, m) });
    } else (c !== 1 || m !== 1) && g.push(i(g) + "scale(" + c + "," + m + ")");
  }
  return function(a, h) {
    var c = [], m = [];
    return a = t(a), h = t(h), o(a.translateX, a.translateY, h.translateX, h.translateY, c, m), l(a.rotate, h.rotate, c, m), s(a.skewX, h.skewX, c, m), u(a.scaleX, a.scaleY, h.scaleX, h.scaleY, c, m), a = h = null, function(g) {
      for (var w = -1, y = m.length, C; ++w < y; ) c[(C = m[w]).i] = C.x(g);
      return c.join("");
    };
  };
}
var Gs = Uo(Bs, "px, ", "px)", "deg)"), Zs = Uo(Os, ", ", ")", ")"), Oe = 0, sn = 0, en = 0, Eo = 1e3, Bn, un, On = 0, Ae = 0, tr = 0, wn = typeof performance == "object" && performance.now ? performance : Date, Lo = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function zr() {
  return Ae || (Lo(Qs), Ae = wn.now() + tr);
}
function Qs() {
  Ae = 0;
}
function Gn() {
  this._call = this._time = this._next = null;
}
Gn.prototype = Ro.prototype = {
  constructor: Gn,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? zr() : +n) + (e == null ? 0 : +e), !this._next && un !== this && (un ? un._next = this : Bn = this, un = this), this._call = t, this._time = n, Dr();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Dr());
  }
};
function Ro(t, e, n) {
  var r = new Gn();
  return r.restart(t, e, n), r;
}
function $s() {
  zr(), ++Oe;
  for (var t = Bn, e; t; )
    (e = Ae - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Oe;
}
function bi() {
  Ae = (On = wn.now()) + tr, Oe = sn = 0;
  try {
    $s();
  } finally {
    Oe = 0, Ks(), Ae = 0;
  }
}
function Js() {
  var t = wn.now(), e = t - On;
  e > Eo && (tr -= e, On = t);
}
function Ks() {
  for (var t, e = Bn, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Bn = n);
  un = t, Dr(r);
}
function Dr(t) {
  if (!Oe) {
    sn && (sn = clearTimeout(sn));
    var e = t - Ae;
    e > 24 ? (t < 1 / 0 && (sn = setTimeout(bi, t - wn.now() - tr)), en && (en = clearInterval(en))) : (en || (On = wn.now(), en = setInterval(Js, Eo)), Oe = 1, Lo(bi));
  }
}
function xi(t, e, n) {
  var r = new Gn();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var js = go("start", "end", "cancel", "interrupt"), tu = [], Yo = 0, Mi = 1, Nr = 2, zn = 3, Ti = 4, Ar = 5, Hn = 6;
function er(t, e, n, r, i, o) {
  var l = t.__transition;
  if (!l) t.__transition = {};
  else if (n in l) return;
  eu(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: js,
    tween: tu,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Yo
  });
}
function Hr(t, e) {
  var n = oe(t, e);
  if (n.state > Yo) throw new Error("too late; already scheduled");
  return n;
}
function ce(t, e) {
  var n = oe(t, e);
  if (n.state > zn) throw new Error("too late; already running");
  return n;
}
function oe(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function eu(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Ro(o, 0, n.time);
  function o(a) {
    n.state = Mi, n.timer.restart(l, n.delay, n.time), n.delay <= a && l(a - n.delay);
  }
  function l(a) {
    var h, c, m, g;
    if (n.state !== Mi) return u();
    for (h in r)
      if (g = r[h], g.name === n.name) {
        if (g.state === zn) return xi(l);
        g.state === Ti ? (g.state = Hn, g.timer.stop(), g.on.call("interrupt", t, t.__data__, g.index, g.group), delete r[h]) : +h < e && (g.state = Hn, g.timer.stop(), g.on.call("cancel", t, t.__data__, g.index, g.group), delete r[h]);
      }
    if (xi(function() {
      n.state === zn && (n.state = Ti, n.timer.restart(s, n.delay, n.time), s(a));
    }), n.state = Nr, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Nr) {
      for (n.state = zn, i = new Array(m = n.tween.length), h = 0, c = -1; h < m; ++h)
        (g = n.tween[h].value.call(t, t.__data__, n.index, n.group)) && (i[++c] = g);
      i.length = c + 1;
    }
  }
  function s(a) {
    for (var h = a < n.duration ? n.ease.call(null, a / n.duration) : (n.timer.restart(u), n.state = Ar, 1), c = -1, m = i.length; ++c < m; )
      i[c].call(t, h);
    n.state === Ar && (n.on.call("end", t, t.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = Hn, n.timer.stop(), delete r[e];
    for (var a in r) return;
    delete t.__transition;
  }
}
function nu(t, e) {
  var n = t.__transition, r, i, o = !0, l;
  if (n) {
    e = e == null ? null : e + "";
    for (l in n) {
      if ((r = n[l]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > Nr && r.state < Ar, r.state = Hn, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[l];
    }
    o && delete t.__transition;
  }
}
function ru(t) {
  return this.each(function() {
    nu(this, t);
  });
}
function iu(t, e) {
  var n, r;
  return function() {
    var i = ce(this, t), o = i.tween;
    if (o !== n) {
      r = n = o;
      for (var l = 0, s = r.length; l < s; ++l)
        if (r[l].name === e) {
          r = r.slice(), r.splice(l, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function ou(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = ce(this, t), l = o.tween;
    if (l !== r) {
      i = (r = l).slice();
      for (var s = { name: e, value: n }, u = 0, a = i.length; u < a; ++u)
        if (i[u].name === e) {
          i[u] = s;
          break;
        }
      u === a && i.push(s);
    }
    o.tween = i;
  };
}
function au(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = oe(this.node(), n).tween, i = 0, o = r.length, l; i < o; ++i)
      if ((l = r[i]).name === t)
        return l.value;
    return null;
  }
  return this.each((e == null ? iu : ou)(n, t, e));
}
function Ir(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = ce(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return oe(i, r).value[e];
  };
}
function Po(t, e) {
  var n;
  return (typeof e == "number" ? re : e instanceof Ne ? Xn : (n = Ne(e)) ? (e = n, Xn) : So)(t, e);
}
function lu(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function su(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function uu(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var l = this.getAttribute(t);
    return l === i ? null : l === r ? o : o = e(r = l, n);
  };
}
function fu(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var l = this.getAttributeNS(t.space, t.local);
    return l === i ? null : l === r ? o : o = e(r = l, n);
  };
}
function cu(t, e, n) {
  var r, i, o;
  return function() {
    var l, s = n(this), u;
    return s == null ? void this.removeAttribute(t) : (l = this.getAttribute(t), u = s + "", l === u ? null : l === r && u === i ? o : (i = u, o = e(r = l, s)));
  };
}
function hu(t, e, n) {
  var r, i, o;
  return function() {
    var l, s = n(this), u;
    return s == null ? void this.removeAttributeNS(t.space, t.local) : (l = this.getAttributeNS(t.space, t.local), u = s + "", l === u ? null : l === r && u === i ? o : (i = u, o = e(r = l, s)));
  };
}
function gu(t, e) {
  var n = jn(t), r = n === "transform" ? Zs : Po;
  return this.attrTween(t, typeof e == "function" ? (n.local ? hu : cu)(n, r, Ir(this, "attr." + t, e)) : e == null ? (n.local ? su : lu)(n) : (n.local ? fu : uu)(n, r, e));
}
function du(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function mu(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function pu(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && mu(t, o)), n;
  }
  return i._value = e, i;
}
function wu(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && du(t, o)), n;
  }
  return i._value = e, i;
}
function yu(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = jn(t);
  return this.tween(n, (r.local ? pu : wu)(r, e));
}
function vu(t, e) {
  return function() {
    Hr(this, t).delay = +e.apply(this, arguments);
  };
}
function _u(t, e) {
  return e = +e, function() {
    Hr(this, t).delay = e;
  };
}
function bu(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? vu : _u)(e, t)) : oe(this.node(), e).delay;
}
function xu(t, e) {
  return function() {
    ce(this, t).duration = +e.apply(this, arguments);
  };
}
function Mu(t, e) {
  return e = +e, function() {
    ce(this, t).duration = e;
  };
}
function Tu(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? xu : Mu)(e, t)) : oe(this.node(), e).duration;
}
function ku(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    ce(this, t).ease = e;
  };
}
function Cu(t) {
  var e = this._id;
  return arguments.length ? this.each(ku(e, t)) : oe(this.node(), e).ease;
}
function Du(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    ce(this, t).ease = n;
  };
}
function Nu(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Du(this._id, t));
}
function Au(t) {
  typeof t != "function" && (t = wo(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], l = o.length, s = r[i] = [], u, a = 0; a < l; ++a)
      (u = o[a]) && t.call(u, u.__data__, a, o) && s.push(u);
  return new ye(r, this._parents, this._name, this._id);
}
function Su(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), l = new Array(r), s = 0; s < o; ++s)
    for (var u = e[s], a = n[s], h = u.length, c = l[s] = new Array(h), m, g = 0; g < h; ++g)
      (m = u[g] || a[g]) && (c[g] = m);
  for (; s < r; ++s)
    l[s] = e[s];
  return new ye(l, this._parents, this._name, this._id);
}
function Fu(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Uu(t, e, n) {
  var r, i, o = Fu(e) ? Hr : ce;
  return function() {
    var l = o(this, t), s = l.on;
    s !== r && (i = (r = s).copy()).on(e, n), l.on = i;
  };
}
function Eu(t, e) {
  var n = this._id;
  return arguments.length < 2 ? oe(this.node(), n).on.on(t) : this.each(Uu(n, t, e));
}
function Lu(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Ru() {
  return this.on("end.remove", Lu(this._id));
}
function Yu(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Er(t));
  for (var r = this._groups, i = r.length, o = new Array(i), l = 0; l < i; ++l)
    for (var s = r[l], u = s.length, a = o[l] = new Array(u), h, c, m = 0; m < u; ++m)
      (h = s[m]) && (c = t.call(h, h.__data__, m, s)) && ("__data__" in h && (c.__data__ = h.__data__), a[m] = c, er(a[m], e, n, m, a, oe(h, n)));
  return new ye(o, this._parents, e, n);
}
function Pu(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = po(t));
  for (var r = this._groups, i = r.length, o = [], l = [], s = 0; s < i; ++s)
    for (var u = r[s], a = u.length, h, c = 0; c < a; ++c)
      if (h = u[c]) {
        for (var m = t.call(h, h.__data__, c, u), g, w = oe(h, n), y = 0, C = m.length; y < C; ++y)
          (g = m[y]) && er(g, e, n, y, m, w);
        o.push(m), l.push(h);
      }
  return new ye(o, l, e, n);
}
var zu = xn.prototype.constructor;
function Hu() {
  return new zu(this._groups, this._parents);
}
function Iu(t, e) {
  var n, r, i;
  return function() {
    var o = Be(this, t), l = (this.style.removeProperty(t), Be(this, t));
    return o === l ? null : o === n && l === r ? i : i = e(n = o, r = l);
  };
}
function zo(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Wu(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var l = Be(this, t);
    return l === i ? null : l === r ? o : o = e(r = l, n);
  };
}
function qu(t, e, n) {
  var r, i, o;
  return function() {
    var l = Be(this, t), s = n(this), u = s + "";
    return s == null && (u = s = (this.style.removeProperty(t), Be(this, t))), l === u ? null : l === r && u === i ? o : (i = u, o = e(r = l, s));
  };
}
function Vu(t, e) {
  var n, r, i, o = "style." + e, l = "end." + o, s;
  return function() {
    var u = ce(this, t), a = u.on, h = u.value[o] == null ? s || (s = zo(e)) : void 0;
    (a !== n || i !== h) && (r = (n = a).copy()).on(l, i = h), u.on = r;
  };
}
function Xu(t, e, n) {
  var r = (t += "") == "transform" ? Gs : Po;
  return e == null ? this.styleTween(t, Iu(t, r)).on("end.style." + t, zo(t)) : typeof e == "function" ? this.styleTween(t, qu(t, r, Ir(this, "style." + t, e))).each(Vu(this._id, t)) : this.styleTween(t, Wu(t, r, e), n).on("end.style." + t, null);
}
function Bu(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Ou(t, e, n) {
  var r, i;
  function o() {
    var l = e.apply(this, arguments);
    return l !== i && (r = (i = l) && Bu(t, l, n)), r;
  }
  return o._value = e, o;
}
function Gu(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Ou(t, e, n ?? ""));
}
function Zu(t) {
  return function() {
    this.textContent = t;
  };
}
function Qu(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function $u(t) {
  return this.tween("text", typeof t == "function" ? Qu(Ir(this, "text", t)) : Zu(t == null ? "" : t + ""));
}
function Ju(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Ku(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Ju(i)), e;
  }
  return r._value = t, r;
}
function ju(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Ku(t));
}
function tf() {
  for (var t = this._name, e = this._id, n = Ho(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var l = r[o], s = l.length, u, a = 0; a < s; ++a)
      if (u = l[a]) {
        var h = oe(u, e);
        er(u, t, n, a, l, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new ye(r, this._parents, t, n);
}
function ef() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, l) {
    var s = { value: l }, u = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var a = ce(this, r), h = a.on;
      h !== t && (e = (t = h).copy(), e._.cancel.push(s), e._.interrupt.push(s), e._.end.push(u)), a.on = e;
    }), i === 0 && o();
  });
}
var nf = 0;
function ye(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Ho() {
  return ++nf;
}
var we = xn.prototype;
ye.prototype = {
  constructor: ye,
  select: Yu,
  selectAll: Pu,
  selectChild: we.selectChild,
  selectChildren: we.selectChildren,
  filter: Au,
  merge: Su,
  selection: Hu,
  transition: tf,
  call: we.call,
  nodes: we.nodes,
  node: we.node,
  size: we.size,
  empty: we.empty,
  each: we.each,
  on: Eu,
  attr: gu,
  attrTween: yu,
  style: Xu,
  styleTween: Gu,
  text: $u,
  textTween: ju,
  remove: Ru,
  tween: au,
  delay: bu,
  duration: Tu,
  ease: Cu,
  easeVarying: Nu,
  end: ef,
  [Symbol.iterator]: we[Symbol.iterator]
};
function rf(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var of = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: rf
};
function af(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function lf(t) {
  var e, n;
  t instanceof ye ? (e = t._id, t = t._name) : (e = Ho(), (n = of).time = zr(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var l = r[o], s = l.length, u, a = 0; a < s; ++a)
      (u = l[a]) && er(u, t, e, a, l, n || af(u, e));
  return new ye(r, this._parents, t, e);
}
xn.prototype.interrupt = ru;
xn.prototype.transition = lf;
const Sr = Math.PI, Fr = 2 * Sr, ke = 1e-6, sf = Fr - ke;
function Io(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function uf(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return Io;
  const n = 10 ** e;
  return function(r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class ff {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Io : uf(e);
  }
  moveTo(e, n) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(e, n) {
    this._append`L${this._x1 = +e},${this._y1 = +n}`;
  }
  quadraticCurveTo(e, n, r, i) {
    this._append`Q${+e},${+n},${this._x1 = +r},${this._y1 = +i}`;
  }
  bezierCurveTo(e, n, r, i, o, l) {
    this._append`C${+e},${+n},${+r},${+i},${this._x1 = +o},${this._y1 = +l}`;
  }
  arcTo(e, n, r, i, o) {
    if (e = +e, n = +n, r = +r, i = +i, o = +o, o < 0) throw new Error(`negative radius: ${o}`);
    let l = this._x1, s = this._y1, u = r - e, a = i - n, h = l - e, c = s - n, m = h * h + c * c;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (m > ke) if (!(Math.abs(c * u - a * h) > ke) || !o)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let g = r - l, w = i - s, y = u * u + a * a, C = g * g + w * w, T = Math.sqrt(y), L = Math.sqrt(m), A = o * Math.tan((Sr - Math.acos((y + m - C) / (2 * T * L))) / 2), k = A / L, S = A / T;
      Math.abs(k - 1) > ke && this._append`L${e + k * h},${n + k * c}`, this._append`A${o},${o},0,0,${+(c * g > h * w)},${this._x1 = e + S * u},${this._y1 = n + S * a}`;
    }
  }
  arc(e, n, r, i, o, l) {
    if (e = +e, n = +n, r = +r, l = !!l, r < 0) throw new Error(`negative radius: ${r}`);
    let s = r * Math.cos(i), u = r * Math.sin(i), a = e + s, h = n + u, c = 1 ^ l, m = l ? i - o : o - i;
    this._x1 === null ? this._append`M${a},${h}` : (Math.abs(this._x1 - a) > ke || Math.abs(this._y1 - h) > ke) && this._append`L${a},${h}`, r && (m < 0 && (m = m % Fr + Fr), m > sf ? this._append`A${r},${r},0,1,${c},${e - s},${n - u}A${r},${r},0,1,${c},${this._x1 = a},${this._y1 = h}` : m > ke && this._append`A${r},${r},0,${+(m >= Sr)},${c},${this._x1 = e + r * Math.cos(o)},${this._y1 = n + r * Math.sin(o)}`);
  }
  rect(e, n, r, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function cf(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function Zn(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function Ge(t) {
  return t = Zn(Math.abs(t)), t ? t[1] : NaN;
}
function hf(t, e) {
  return function(n, r) {
    for (var i = n.length, o = [], l = 0, s = t[0], u = 0; i > 0 && s > 0 && (u + s + 1 > r && (s = Math.max(1, r - u)), o.push(n.substring(i -= s, i + s)), !((u += s + 1) > r)); )
      s = t[l = (l + 1) % t.length];
    return o.reverse().join(e);
  };
}
function gf(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var df = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Qn(t) {
  if (!(e = df.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new Wr({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  });
}
Qn.prototype = Wr.prototype;
function Wr(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Wr.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function mf(t) {
  t: for (var e = t.length, n = 1, r = -1, i; n < e; ++n)
    switch (t[n]) {
      case ".":
        r = i = n;
        break;
      case "0":
        r === 0 && (r = n), i = n;
        break;
      default:
        if (!+t[n]) break t;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? t.slice(0, r) + t.slice(i + 1) : t;
}
var Wo;
function pf(t, e) {
  var n = Zn(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1], o = i - (Wo = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, l = r.length;
  return o === l ? r : o > l ? r + new Array(o - l + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + Zn(t, Math.max(0, e + o - 1))[0];
}
function ki(t, e) {
  var n = Zn(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const Ci = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: cf,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => ki(t * 100, e),
  r: ki,
  s: pf,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Di(t) {
  return t;
}
var Ni = Array.prototype.map, Ai = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function wf(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Di : hf(Ni.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", o = t.numerals === void 0 ? Di : gf(Ni.call(t.numerals, String)), l = t.percent === void 0 ? "%" : t.percent + "", s = t.minus === void 0 ? "−" : t.minus + "", u = t.nan === void 0 ? "NaN" : t.nan + "";
  function a(c) {
    c = Qn(c);
    var m = c.fill, g = c.align, w = c.sign, y = c.symbol, C = c.zero, T = c.width, L = c.comma, A = c.precision, k = c.trim, S = c.type;
    S === "n" ? (L = !0, S = "g") : Ci[S] || (A === void 0 && (A = 12), k = !0, S = "g"), (C || m === "0" && g === "=") && (C = !0, m = "0", g = "=");
    var R = y === "$" ? n : y === "#" && /[boxX]/.test(S) ? "0" + S.toLowerCase() : "", U = y === "$" ? r : /[%p]/.test(S) ? l : "", Y = Ci[S], z = /[defgprs%]/.test(S);
    A = A === void 0 ? 6 : /[gprs]/.test(S) ? Math.max(1, Math.min(21, A)) : Math.max(0, Math.min(20, A));
    function E(v) {
      var b = R, X = U, D, j, N;
      if (S === "c")
        X = Y(v) + X, v = "";
      else {
        v = +v;
        var nt = v < 0 || 1 / v < 0;
        if (v = isNaN(v) ? u : Y(Math.abs(v), A), k && (v = mf(v)), nt && +v == 0 && w !== "+" && (nt = !1), b = (nt ? w === "(" ? w : s : w === "-" || w === "(" ? "" : w) + b, X = (S === "s" ? Ai[8 + Wo / 3] : "") + X + (nt && w === "(" ? ")" : ""), z) {
          for (D = -1, j = v.length; ++D < j; )
            if (N = v.charCodeAt(D), 48 > N || N > 57) {
              X = (N === 46 ? i + v.slice(D + 1) : v.slice(D)) + X, v = v.slice(0, D);
              break;
            }
        }
      }
      L && !C && (v = e(v, 1 / 0));
      var Tt = b.length + v.length + X.length, dt = Tt < T ? new Array(T - Tt + 1).join(m) : "";
      switch (L && C && (v = e(dt + v, dt.length ? T - X.length : 1 / 0), dt = ""), g) {
        case "<":
          v = b + v + X + dt;
          break;
        case "=":
          v = b + dt + v + X;
          break;
        case "^":
          v = dt.slice(0, Tt = dt.length >> 1) + b + v + X + dt.slice(Tt);
          break;
        default:
          v = dt + b + v + X;
          break;
      }
      return o(v);
    }
    return E.toString = function() {
      return c + "";
    }, E;
  }
  function h(c, m) {
    var g = a((c = Qn(c), c.type = "f", c)), w = Math.max(-8, Math.min(8, Math.floor(Ge(m) / 3))) * 3, y = Math.pow(10, -w), C = Ai[8 + w / 3];
    return function(T) {
      return g(y * T) + C;
    };
  }
  return {
    format: a,
    formatPrefix: h
  };
}
var Rn, qo, Vo;
yf({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function yf(t) {
  return Rn = wf(t), qo = Rn.format, Vo = Rn.formatPrefix, Rn;
}
function vf(t) {
  return Math.max(0, -Ge(Math.abs(t)));
}
function _f(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Ge(e) / 3))) * 3 - Ge(Math.abs(t)));
}
function bf(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, Ge(e) - Ge(t)) + 1;
}
function xf(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(e).domain(t);
      break;
  }
  return this;
}
function Mf(t) {
  return function() {
    return t;
  };
}
function Tf(t) {
  return +t;
}
var Si = [0, 1];
function We(t) {
  return t;
}
function Ur(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : Mf(isNaN(e) ? NaN : 0.5);
}
function kf(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function Cf(t, e, n) {
  var r = t[0], i = t[1], o = e[0], l = e[1];
  return i < r ? (r = Ur(i, r), o = n(l, o)) : (r = Ur(r, i), o = n(o, l)), function(s) {
    return o(r(s));
  };
}
function Df(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), o = new Array(r), l = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++l < r; )
    i[l] = Ur(t[l], t[l + 1]), o[l] = n(e[l], e[l + 1]);
  return function(s) {
    var u = ka(t, s, 1, r) - 1;
    return o[u](i[u](s));
  };
}
function Nf(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function Af() {
  var t = Si, e = Si, n = Pr, r, i, o, l = We, s, u, a;
  function h() {
    var m = Math.min(t.length, e.length);
    return l !== We && (l = kf(t[0], t[m - 1])), s = m > 2 ? Df : Cf, u = a = null, c;
  }
  function c(m) {
    return m == null || isNaN(m = +m) ? o : (u || (u = s(t.map(r), e, n)))(r(l(m)));
  }
  return c.invert = function(m) {
    return l(i((a || (a = s(e, t.map(r), re)))(m)));
  }, c.domain = function(m) {
    return arguments.length ? (t = Array.from(m, Tf), h()) : t.slice();
  }, c.range = function(m) {
    return arguments.length ? (e = Array.from(m), h()) : e.slice();
  }, c.rangeRound = function(m) {
    return e = Array.from(m), n = Xs, h();
  }, c.clamp = function(m) {
    return arguments.length ? (l = m ? !0 : We, h()) : l !== We;
  }, c.interpolate = function(m) {
    return arguments.length ? (n = m, h()) : n;
  }, c.unknown = function(m) {
    return arguments.length ? (o = m, c) : o;
  }, function(m, g) {
    return r = m, i = g, h();
  };
}
function Sf() {
  return Af()(We, We);
}
function Ff(t, e, n, r) {
  var i = Fa(t, e, n), o;
  switch (r = Qn(r ?? ",f"), r.type) {
    case "s": {
      var l = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(o = _f(i, l)) && (r.precision = o), Vo(r, l);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(o = bf(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = o - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(o = vf(i)) && (r.precision = o - (r.type === "%") * 2);
      break;
    }
  }
  return qo(r);
}
function Uf(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return Sa(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return Ff(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, o = r.length - 1, l = r[i], s = r[o], u, a, h = 10;
    for (s < l && (a = l, l = s, s = a, a = i, i = o, o = a); h-- > 0; ) {
      if (a = _r(l, s, n), a === u)
        return r[i] = l, r[o] = s, e(r);
      if (a > 0)
        l = Math.floor(l / a) * a, s = Math.ceil(s / a) * a;
      else if (a < 0)
        l = Math.ceil(l * a) / a, s = Math.floor(s * a) / a;
      else
        break;
      u = a;
    }
    return t;
  }, t;
}
function yn() {
  var t = Sf();
  return t.copy = function() {
    return Nf(t, yn());
  }, xf.apply(t, arguments), Uf(t);
}
const hr = /* @__PURE__ */ new Date(), gr = /* @__PURE__ */ new Date();
function he(t, e, n, r) {
  function i(o) {
    return t(o = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+o)), o;
  }
  return i.floor = (o) => (t(o = /* @__PURE__ */ new Date(+o)), o), i.ceil = (o) => (t(o = new Date(o - 1)), e(o, 1), t(o), o), i.round = (o) => {
    const l = i(o), s = i.ceil(o);
    return o - l < s - o ? l : s;
  }, i.offset = (o, l) => (e(o = /* @__PURE__ */ new Date(+o), l == null ? 1 : Math.floor(l)), o), i.range = (o, l, s) => {
    const u = [];
    if (o = i.ceil(o), s = s == null ? 1 : Math.floor(s), !(o < l) || !(s > 0)) return u;
    let a;
    do
      u.push(a = /* @__PURE__ */ new Date(+o)), e(o, s), t(o);
    while (a < o && o < l);
    return u;
  }, i.filter = (o) => he((l) => {
    if (l >= l) for (; t(l), !o(l); ) l.setTime(l - 1);
  }, (l, s) => {
    if (l >= l)
      if (s < 0) for (; ++s <= 0; )
        for (; e(l, -1), !o(l); )
          ;
      else for (; --s >= 0; )
        for (; e(l, 1), !o(l); )
          ;
  }), n && (i.count = (o, l) => (hr.setTime(+o), gr.setTime(+l), t(hr), t(gr), Math.floor(n(hr, gr))), i.every = (o) => (o = Math.floor(o), !isFinite(o) || !(o > 0) ? null : o > 1 ? i.filter(r ? (l) => r(l) % o === 0 : (l) => i.count(0, l) % o === 0) : i)), i;
}
const Ef = 1e3, qr = Ef * 60, Lf = qr * 60, vn = Lf * 24, Xo = vn * 7, Kt = he(
  (t) => t.setHours(0, 0, 0, 0),
  (t, e) => t.setDate(t.getDate() + e),
  (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * qr) / vn,
  (t) => t.getDate() - 1
);
Kt.range;
const Vr = he((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / vn, (t) => t.getUTCDate() - 1);
Vr.range;
const Rf = he((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / vn, (t) => Math.floor(t / vn));
Rf.range;
function Ue(t) {
  return he((e) => {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setDate(e.getDate() + n * 7);
  }, (e, n) => (n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * qr) / Xo);
}
const Bo = Ue(0), $n = Ue(1), Yf = Ue(2), Pf = Ue(3), Ze = Ue(4), zf = Ue(5), Hf = Ue(6);
Bo.range;
$n.range;
Yf.range;
Pf.range;
Ze.range;
zf.range;
Hf.range;
function Ee(t) {
  return he((e) => {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setUTCDate(e.getUTCDate() + n * 7);
  }, (e, n) => (n - e) / Xo);
}
const Oo = Ee(0), Jn = Ee(1), If = Ee(2), Wf = Ee(3), Qe = Ee(4), qf = Ee(5), Vf = Ee(6);
Oo.range;
Jn.range;
If.range;
Wf.range;
Qe.range;
qf.range;
Vf.range;
const Se = he((t) => {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, e) => {
  t.setFullYear(t.getFullYear() + e);
}, (t, e) => e.getFullYear() - t.getFullYear(), (t) => t.getFullYear());
Se.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : he((e) => {
  e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, n) => {
  e.setFullYear(e.getFullYear() + n * t);
});
Se.range;
const Fe = he((t) => {
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCFullYear(t.getUTCFullYear() + e);
}, (t, e) => e.getUTCFullYear() - t.getUTCFullYear(), (t) => t.getUTCFullYear());
Fe.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : he((e) => {
  e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, n) => {
  e.setUTCFullYear(e.getUTCFullYear() + n * t);
});
Fe.range;
function dr(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e;
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function mr(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e;
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function nn(t, e, n) {
  return { y: t, m: e, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function Xf(t) {
  var e = t.dateTime, n = t.date, r = t.time, i = t.periods, o = t.days, l = t.shortDays, s = t.months, u = t.shortMonths, a = rn(i), h = on(i), c = rn(o), m = on(o), g = rn(l), w = on(l), y = rn(s), C = on(s), T = rn(u), L = on(u), A = {
    a: nt,
    A: Tt,
    b: dt,
    B: kt,
    c: null,
    d: Yi,
    e: Yi,
    f: gc,
    g: Mc,
    G: kc,
    H: fc,
    I: cc,
    j: hc,
    L: Go,
    m: dc,
    M: mc,
    p: vt,
    q: Nt,
    Q: Hi,
    s: Ii,
    S: pc,
    u: wc,
    U: yc,
    V: vc,
    w: _c,
    W: bc,
    x: null,
    X: null,
    y: xc,
    Y: Tc,
    Z: Cc,
    "%": zi
  }, k = {
    a: At,
    A: _t,
    b: Ct,
    B: Dt,
    c: null,
    d: Pi,
    e: Pi,
    f: Sc,
    g: Ic,
    G: qc,
    H: Dc,
    I: Nc,
    j: Ac,
    L: Qo,
    m: Fc,
    M: Uc,
    p: ge,
    q: xt,
    Q: Hi,
    s: Ii,
    S: Ec,
    u: Lc,
    U: Rc,
    V: Yc,
    w: Pc,
    W: zc,
    x: null,
    X: null,
    y: Hc,
    Y: Wc,
    Z: Vc,
    "%": zi
  }, S = {
    a: E,
    A: v,
    b,
    B: X,
    c: D,
    d: Li,
    e: Li,
    f: ac,
    g: Ei,
    G: Ui,
    H: Ri,
    I: Ri,
    j: nc,
    L: oc,
    m: ec,
    M: rc,
    p: z,
    q: tc,
    Q: sc,
    s: uc,
    S: ic,
    u: Qf,
    U: $f,
    V: Jf,
    w: Zf,
    W: Kf,
    x: j,
    X: N,
    y: Ei,
    Y: Ui,
    Z: jf,
    "%": lc
  };
  A.x = R(n, A), A.X = R(r, A), A.c = R(e, A), k.x = R(n, k), k.X = R(r, k), k.c = R(e, k);
  function R(d, I) {
    return function(V) {
      var M = [], lt = -1, _ = 0, F = d.length, x, P, W;
      for (V instanceof Date || (V = /* @__PURE__ */ new Date(+V)); ++lt < F; )
        d.charCodeAt(lt) === 37 && (M.push(d.slice(_, lt)), (P = Fi[x = d.charAt(++lt)]) != null ? x = d.charAt(++lt) : P = x === "e" ? " " : "0", (W = I[x]) && (x = W(V, P)), M.push(x), _ = lt + 1);
      return M.push(d.slice(_, lt)), M.join("");
    };
  }
  function U(d, I) {
    return function(V) {
      var M = nn(1900, void 0, 1), lt = Y(M, d, V += "", 0), _, F;
      if (lt != V.length) return null;
      if ("Q" in M) return new Date(M.Q);
      if ("s" in M) return new Date(M.s * 1e3 + ("L" in M ? M.L : 0));
      if (I && !("Z" in M) && (M.Z = 0), "p" in M && (M.H = M.H % 12 + M.p * 12), M.m === void 0 && (M.m = "q" in M ? M.q : 0), "V" in M) {
        if (M.V < 1 || M.V > 53) return null;
        "w" in M || (M.w = 1), "Z" in M ? (_ = mr(nn(M.y, 0, 1)), F = _.getUTCDay(), _ = F > 4 || F === 0 ? Jn.ceil(_) : Jn(_), _ = Vr.offset(_, (M.V - 1) * 7), M.y = _.getUTCFullYear(), M.m = _.getUTCMonth(), M.d = _.getUTCDate() + (M.w + 6) % 7) : (_ = dr(nn(M.y, 0, 1)), F = _.getDay(), _ = F > 4 || F === 0 ? $n.ceil(_) : $n(_), _ = Kt.offset(_, (M.V - 1) * 7), M.y = _.getFullYear(), M.m = _.getMonth(), M.d = _.getDate() + (M.w + 6) % 7);
      } else ("W" in M || "U" in M) && ("w" in M || (M.w = "u" in M ? M.u % 7 : "W" in M ? 1 : 0), F = "Z" in M ? mr(nn(M.y, 0, 1)).getUTCDay() : dr(nn(M.y, 0, 1)).getDay(), M.m = 0, M.d = "W" in M ? (M.w + 6) % 7 + M.W * 7 - (F + 5) % 7 : M.w + M.U * 7 - (F + 6) % 7);
      return "Z" in M ? (M.H += M.Z / 100 | 0, M.M += M.Z % 100, mr(M)) : dr(M);
    };
  }
  function Y(d, I, V, M) {
    for (var lt = 0, _ = I.length, F = V.length, x, P; lt < _; ) {
      if (M >= F) return -1;
      if (x = I.charCodeAt(lt++), x === 37) {
        if (x = I.charAt(lt++), P = S[x in Fi ? I.charAt(lt++) : x], !P || (M = P(d, V, M)) < 0) return -1;
      } else if (x != V.charCodeAt(M++))
        return -1;
    }
    return M;
  }
  function z(d, I, V) {
    var M = a.exec(I.slice(V));
    return M ? (d.p = h.get(M[0].toLowerCase()), V + M[0].length) : -1;
  }
  function E(d, I, V) {
    var M = g.exec(I.slice(V));
    return M ? (d.w = w.get(M[0].toLowerCase()), V + M[0].length) : -1;
  }
  function v(d, I, V) {
    var M = c.exec(I.slice(V));
    return M ? (d.w = m.get(M[0].toLowerCase()), V + M[0].length) : -1;
  }
  function b(d, I, V) {
    var M = T.exec(I.slice(V));
    return M ? (d.m = L.get(M[0].toLowerCase()), V + M[0].length) : -1;
  }
  function X(d, I, V) {
    var M = y.exec(I.slice(V));
    return M ? (d.m = C.get(M[0].toLowerCase()), V + M[0].length) : -1;
  }
  function D(d, I, V) {
    return Y(d, e, I, V);
  }
  function j(d, I, V) {
    return Y(d, n, I, V);
  }
  function N(d, I, V) {
    return Y(d, r, I, V);
  }
  function nt(d) {
    return l[d.getDay()];
  }
  function Tt(d) {
    return o[d.getDay()];
  }
  function dt(d) {
    return u[d.getMonth()];
  }
  function kt(d) {
    return s[d.getMonth()];
  }
  function vt(d) {
    return i[+(d.getHours() >= 12)];
  }
  function Nt(d) {
    return 1 + ~~(d.getMonth() / 3);
  }
  function At(d) {
    return l[d.getUTCDay()];
  }
  function _t(d) {
    return o[d.getUTCDay()];
  }
  function Ct(d) {
    return u[d.getUTCMonth()];
  }
  function Dt(d) {
    return s[d.getUTCMonth()];
  }
  function ge(d) {
    return i[+(d.getUTCHours() >= 12)];
  }
  function xt(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }
  return {
    format: function(d) {
      var I = R(d += "", A);
      return I.toString = function() {
        return d;
      }, I;
    },
    parse: function(d) {
      var I = U(d += "", !1);
      return I.toString = function() {
        return d;
      }, I;
    },
    utcFormat: function(d) {
      var I = R(d += "", k);
      return I.toString = function() {
        return d;
      }, I;
    },
    utcParse: function(d) {
      var I = U(d += "", !0);
      return I.toString = function() {
        return d;
      }, I;
    }
  };
}
var Fi = { "-": "", _: " ", 0: "0" }, Et = /^\s*\d+/, Bf = /^%/, Of = /[\\^$*+?|[\]().{}]/g;
function gt(t, e, n) {
  var r = t < 0 ? "-" : "", i = (r ? -t : t) + "", o = i.length;
  return r + (o < n ? new Array(n - o + 1).join(e) + i : i);
}
function Gf(t) {
  return t.replace(Of, "\\$&");
}
function rn(t) {
  return new RegExp("^(?:" + t.map(Gf).join("|") + ")", "i");
}
function on(t) {
  return new Map(t.map((e, n) => [e.toLowerCase(), n]));
}
function Zf(t, e, n) {
  var r = Et.exec(e.slice(n, n + 1));
  return r ? (t.w = +r[0], n + r[0].length) : -1;
}
function Qf(t, e, n) {
  var r = Et.exec(e.slice(n, n + 1));
  return r ? (t.u = +r[0], n + r[0].length) : -1;
}
function $f(t, e, n) {
  var r = Et.exec(e.slice(n, n + 2));
  return r ? (t.U = +r[0], n + r[0].length) : -1;
}
function Jf(t, e, n) {
  var r = Et.exec(e.slice(n, n + 2));
  return r ? (t.V = +r[0], n + r[0].length) : -1;
}
function Kf(t, e, n) {
  var r = Et.exec(e.slice(n, n + 2));
  return r ? (t.W = +r[0], n + r[0].length) : -1;
}
function Ui(t, e, n) {
  var r = Et.exec(e.slice(n, n + 4));
  return r ? (t.y = +r[0], n + r[0].length) : -1;
}
function Ei(t, e, n) {
  var r = Et.exec(e.slice(n, n + 2));
  return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function jf(t, e, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
  return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function tc(t, e, n) {
  var r = Et.exec(e.slice(n, n + 1));
  return r ? (t.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function ec(t, e, n) {
  var r = Et.exec(e.slice(n, n + 2));
  return r ? (t.m = r[0] - 1, n + r[0].length) : -1;
}
function Li(t, e, n) {
  var r = Et.exec(e.slice(n, n + 2));
  return r ? (t.d = +r[0], n + r[0].length) : -1;
}
function nc(t, e, n) {
  var r = Et.exec(e.slice(n, n + 3));
  return r ? (t.m = 0, t.d = +r[0], n + r[0].length) : -1;
}
function Ri(t, e, n) {
  var r = Et.exec(e.slice(n, n + 2));
  return r ? (t.H = +r[0], n + r[0].length) : -1;
}
function rc(t, e, n) {
  var r = Et.exec(e.slice(n, n + 2));
  return r ? (t.M = +r[0], n + r[0].length) : -1;
}
function ic(t, e, n) {
  var r = Et.exec(e.slice(n, n + 2));
  return r ? (t.S = +r[0], n + r[0].length) : -1;
}
function oc(t, e, n) {
  var r = Et.exec(e.slice(n, n + 3));
  return r ? (t.L = +r[0], n + r[0].length) : -1;
}
function ac(t, e, n) {
  var r = Et.exec(e.slice(n, n + 6));
  return r ? (t.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function lc(t, e, n) {
  var r = Bf.exec(e.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function sc(t, e, n) {
  var r = Et.exec(e.slice(n));
  return r ? (t.Q = +r[0], n + r[0].length) : -1;
}
function uc(t, e, n) {
  var r = Et.exec(e.slice(n));
  return r ? (t.s = +r[0], n + r[0].length) : -1;
}
function Yi(t, e) {
  return gt(t.getDate(), e, 2);
}
function fc(t, e) {
  return gt(t.getHours(), e, 2);
}
function cc(t, e) {
  return gt(t.getHours() % 12 || 12, e, 2);
}
function hc(t, e) {
  return gt(1 + Kt.count(Se(t), t), e, 3);
}
function Go(t, e) {
  return gt(t.getMilliseconds(), e, 3);
}
function gc(t, e) {
  return Go(t, e) + "000";
}
function dc(t, e) {
  return gt(t.getMonth() + 1, e, 2);
}
function mc(t, e) {
  return gt(t.getMinutes(), e, 2);
}
function pc(t, e) {
  return gt(t.getSeconds(), e, 2);
}
function wc(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function yc(t, e) {
  return gt(Bo.count(Se(t) - 1, t), e, 2);
}
function Zo(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? Ze(t) : Ze.ceil(t);
}
function vc(t, e) {
  return t = Zo(t), gt(Ze.count(Se(t), t) + (Se(t).getDay() === 4), e, 2);
}
function _c(t) {
  return t.getDay();
}
function bc(t, e) {
  return gt($n.count(Se(t) - 1, t), e, 2);
}
function xc(t, e) {
  return gt(t.getFullYear() % 100, e, 2);
}
function Mc(t, e) {
  return t = Zo(t), gt(t.getFullYear() % 100, e, 2);
}
function Tc(t, e) {
  return gt(t.getFullYear() % 1e4, e, 4);
}
function kc(t, e) {
  var n = t.getDay();
  return t = n >= 4 || n === 0 ? Ze(t) : Ze.ceil(t), gt(t.getFullYear() % 1e4, e, 4);
}
function Cc(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + gt(e / 60 | 0, "0", 2) + gt(e % 60, "0", 2);
}
function Pi(t, e) {
  return gt(t.getUTCDate(), e, 2);
}
function Dc(t, e) {
  return gt(t.getUTCHours(), e, 2);
}
function Nc(t, e) {
  return gt(t.getUTCHours() % 12 || 12, e, 2);
}
function Ac(t, e) {
  return gt(1 + Vr.count(Fe(t), t), e, 3);
}
function Qo(t, e) {
  return gt(t.getUTCMilliseconds(), e, 3);
}
function Sc(t, e) {
  return Qo(t, e) + "000";
}
function Fc(t, e) {
  return gt(t.getUTCMonth() + 1, e, 2);
}
function Uc(t, e) {
  return gt(t.getUTCMinutes(), e, 2);
}
function Ec(t, e) {
  return gt(t.getUTCSeconds(), e, 2);
}
function Lc(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function Rc(t, e) {
  return gt(Oo.count(Fe(t) - 1, t), e, 2);
}
function $o(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? Qe(t) : Qe.ceil(t);
}
function Yc(t, e) {
  return t = $o(t), gt(Qe.count(Fe(t), t) + (Fe(t).getUTCDay() === 4), e, 2);
}
function Pc(t) {
  return t.getUTCDay();
}
function zc(t, e) {
  return gt(Jn.count(Fe(t) - 1, t), e, 2);
}
function Hc(t, e) {
  return gt(t.getUTCFullYear() % 100, e, 2);
}
function Ic(t, e) {
  return t = $o(t), gt(t.getUTCFullYear() % 100, e, 2);
}
function Wc(t, e) {
  return gt(t.getUTCFullYear() % 1e4, e, 4);
}
function qc(t, e) {
  var n = t.getUTCDay();
  return t = n >= 4 || n === 0 ? Qe(t) : Qe.ceil(t), gt(t.getUTCFullYear() % 1e4, e, 4);
}
function Vc() {
  return "+0000";
}
function zi() {
  return "%";
}
function Hi(t) {
  return +t;
}
function Ii(t) {
  return Math.floor(+t / 1e3);
}
var He, hn, Jo;
Xc({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function Xc(t) {
  return He = Xf(t), hn = He.format, He.parse, Jo = He.utcFormat, He.utcParse, He;
}
function Ut(t) {
  return function() {
    return t;
  };
}
function Ko(t) {
  let e = 3;
  return t.digits = function(n) {
    if (!arguments.length) return e;
    if (n == null)
      e = null;
    else {
      const r = Math.floor(n);
      if (!(r >= 0)) throw new RangeError(`invalid digits: ${n}`);
      e = r;
    }
    return t;
  }, () => new ff(e);
}
function jo(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ta(t) {
  this._context = t;
}
ta.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(t, e);
        break;
    }
  }
};
function ea(t) {
  return new ta(t);
}
function na(t) {
  return t[0];
}
function ra(t) {
  return t[1];
}
function gn(t, e) {
  var n = Ut(!0), r = null, i = ea, o = null, l = Ko(s);
  t = typeof t == "function" ? t : t === void 0 ? na : Ut(t), e = typeof e == "function" ? e : e === void 0 ? ra : Ut(e);
  function s(u) {
    var a, h = (u = jo(u)).length, c, m = !1, g;
    for (r == null && (o = i(g = l())), a = 0; a <= h; ++a)
      !(a < h && n(c = u[a], a, u)) === m && ((m = !m) ? o.lineStart() : o.lineEnd()), m && o.point(+t(c, a, u), +e(c, a, u));
    if (g) return o = null, g + "" || null;
  }
  return s.x = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : Ut(+u), s) : t;
  }, s.y = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : Ut(+u), s) : e;
  }, s.defined = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : Ut(!!u), s) : n;
  }, s.curve = function(u) {
    return arguments.length ? (i = u, r != null && (o = i(r)), s) : i;
  }, s.context = function(u) {
    return arguments.length ? (u == null ? r = o = null : o = i(r = u), s) : r;
  }, s;
}
function ne(t, e, n) {
  var r = null, i = Ut(!0), o = null, l = ea, s = null, u = Ko(a);
  t = typeof t == "function" ? t : t === void 0 ? na : Ut(+t), e = typeof e == "function" ? e : Ut(e === void 0 ? 0 : +e), n = typeof n == "function" ? n : n === void 0 ? ra : Ut(+n);
  function a(c) {
    var m, g, w, y = (c = jo(c)).length, C, T = !1, L, A = new Array(y), k = new Array(y);
    for (o == null && (s = l(L = u())), m = 0; m <= y; ++m) {
      if (!(m < y && i(C = c[m], m, c)) === T)
        if (T = !T)
          g = m, s.areaStart(), s.lineStart();
        else {
          for (s.lineEnd(), s.lineStart(), w = m - 1; w >= g; --w)
            s.point(A[w], k[w]);
          s.lineEnd(), s.areaEnd();
        }
      T && (A[m] = +t(C, m, c), k[m] = +e(C, m, c), s.point(r ? +r(C, m, c) : A[m], n ? +n(C, m, c) : k[m]));
    }
    if (L) return s = null, L + "" || null;
  }
  function h() {
    return gn().defined(i).curve(l).context(o);
  }
  return a.x = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : Ut(+c), r = null, a) : t;
  }, a.x0 = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : Ut(+c), a) : t;
  }, a.x1 = function(c) {
    return arguments.length ? (r = c == null ? null : typeof c == "function" ? c : Ut(+c), a) : r;
  }, a.y = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : Ut(+c), n = null, a) : e;
  }, a.y0 = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : Ut(+c), a) : e;
  }, a.y1 = function(c) {
    return arguments.length ? (n = c == null ? null : typeof c == "function" ? c : Ut(+c), a) : n;
  }, a.lineX0 = a.lineY0 = function() {
    return h().x(t).y(e);
  }, a.lineY1 = function() {
    return h().x(t).y(n);
  }, a.lineX1 = function() {
    return h().x(r).y(e);
  }, a.defined = function(c) {
    return arguments.length ? (i = typeof c == "function" ? c : Ut(!!c), a) : i;
  }, a.curve = function(c) {
    return arguments.length ? (l = c, o != null && (s = l(o)), a) : l;
  }, a.context = function(c) {
    return arguments.length ? (c == null ? o = s = null : s = l(o = c), a) : o;
  }, a;
}
function Wi(t) {
  return t < 0 ? -1 : 1;
}
function qi(t, e, n) {
  var r = t._x1 - t._x0, i = e - t._x1, o = (t._y1 - t._y0) / (r || i < 0 && -0), l = (n - t._y1) / (i || r < 0 && -0), s = (o * i + l * r) / (r + i);
  return (Wi(o) + Wi(l)) * Math.min(Math.abs(o), Math.abs(l), 0.5 * Math.abs(s)) || 0;
}
function Vi(t, e) {
  var n = t._x1 - t._x0;
  return n ? (3 * (t._y1 - t._y0) / n - e) / 2 : e;
}
function pr(t, e, n) {
  var r = t._x0, i = t._y0, o = t._x1, l = t._y1, s = (o - r) / 3;
  t._context.bezierCurveTo(r + s, i + s * e, o - s, l - s * n, o, l);
}
function Kn(t) {
  this._context = t;
}
Kn.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        pr(this, this._t0, Vi(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t, e) {
    var n = NaN;
    if (t = +t, e = +e, !(t === this._x1 && e === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, pr(this, Vi(this, n = qi(this, t, e)), n);
          break;
        default:
          pr(this, this._t0, n = qi(this, t, e));
          break;
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = n;
    }
  }
};
Object.create(Kn.prototype).point = function(t, e) {
  Kn.prototype.point.call(this, e, t);
};
function wr(t) {
  return new Kn(t);
}
function fn(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
fn.prototype = {
  constructor: fn,
  scale: function(t) {
    return t === 1 ? this : new fn(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new fn(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
fn.prototype;
function Bc(t) {
  let e, n, r, i, o, l, s, u = (
    /*showCanvas*/
    t[0] ? "-" : "="
  ), a, h, c, m, g, w, y, C, T, L, A, k, S, R, U, Y, z, E, v, b, X, D, j, N, nt, Tt, dt, kt, vt, Nt, At, _t;
  return {
    c() {
      e = K("div"), n = K("canvas"), i = at(), o = K("div"), l = K("div"), s = K("button"), a = q(u), h = at(), c = K("div"), m = q(
        /*periodLabel*/
        t[4]
      ), g = at(), w = K("div"), y = K("div"), C = K("button"), T = q("1d"), A = at(), k = K("button"), S = q("3d"), U = at(), Y = K("button"), z = q("1w"), v = at(), b = K("button"), X = q("2w"), j = at(), N = K("button"), nt = q("1m"), dt = at(), kt = K("button"), vt = q("3m"), f(n, "style", r = `width:100%; display:${/*showCanvas*/
      t[0] ? "block" : "none"}; border:0; padding-bottom: 10px;`), f(s, "type", "button"), f(s, "class", "qbtn svelte-1xibldd"), f(s, "title", "Hide/show calendar canvas"), Q(l, "display", "flex"), Q(l, "gap", "8px"), Q(l, "align-items", "center"), Q(l, "justify-content", "flex-end"), Q(l, "flex", "0 0 auto"), Q(c, "text-align", "left"), Q(c, "color", "#000"), Q(c, "font-size", "12px"), Q(c, "font-weight", "600"), Q(c, "min-width", "160px"), Q(c, "flex", "1 1 auto"), f(C, "type", "button"), f(C, "class", L = Jt(`qbtn ${/*activeSpan*/
      t[3] === 1 ? "active" : ""}`) + " svelte-1xibldd"), f(k, "type", "button"), f(k, "class", R = Jt(`qbtn ${/*activeSpan*/
      t[3] === 3 ? "active" : ""}`) + " svelte-1xibldd"), f(Y, "type", "button"), f(Y, "class", E = Jt(`qbtn ${/*activeSpan*/
      t[3] === 7 ? "active" : ""}`) + " svelte-1xibldd"), f(b, "type", "button"), f(b, "class", D = Jt(`qbtn ${/*activeSpan*/
      t[3] === 14 ? "active" : ""}`) + " svelte-1xibldd"), f(N, "type", "button"), f(N, "class", Tt = Jt(`qbtn ${/*activeSpan*/
      t[3] === 30 ? "active" : ""}`) + " svelte-1xibldd"), f(kt, "type", "button"), f(kt, "class", Nt = Jt(`qbtn ${/*activeSpan*/
      t[3] === 90 ? "active" : ""}`) + " svelte-1xibldd"), Q(y, "display", "flex"), Q(y, "gap", "16px"), Q(y, "flex-wrap", "wrap"), Q(y, "justify-content", "flex-end"), Q(w, "display", "flex"), Q(w, "align-items", "center"), Q(w, "gap", "20px"), Q(w, "justify-content", "flex-end"), Q(w, "margin-left", "auto"), f(o, "id", "controlBar"), Q(o, "display", "flex"), Q(o, "align-items", "center"), Q(o, "gap", "12px"), Q(o, "flex-wrap", "wrap"), Q(o, "margin", "0 0 6px"), f(e, "class", "cgm-widget"), Q(e, "contain", "layout");
    },
    m(Ct, Dt) {
      ht(Ct, e, Dt), p(e, n), t[15](n), p(e, i), p(e, o), p(o, l), p(l, s), p(s, a), p(o, h), p(o, c), p(c, m), t[17](c), p(o, g), p(o, w), p(w, y), p(y, C), p(C, T), p(y, A), p(y, k), p(k, S), p(y, U), p(y, Y), p(Y, z), p(y, v), p(y, b), p(b, X), p(y, j), p(y, N), p(N, nt), p(y, dt), p(y, kt), p(kt, vt), At || (_t = [
        Te(
          s,
          "click",
          /*click_handler*/
          t[16]
        ),
        Te(
          C,
          "click",
          /*click_handler_1*/
          t[18]
        ),
        Te(
          k,
          "click",
          /*click_handler_2*/
          t[19]
        ),
        Te(
          Y,
          "click",
          /*click_handler_3*/
          t[20]
        ),
        Te(
          b,
          "click",
          /*click_handler_4*/
          t[21]
        ),
        Te(
          N,
          "click",
          /*click_handler_5*/
          t[22]
        ),
        Te(
          kt,
          "click",
          /*click_handler_6*/
          t[23]
        )
      ], At = !0);
    },
    p(Ct, Dt) {
      Dt[0] & /*showCanvas*/
      1 && r !== (r = `width:100%; display:${/*showCanvas*/
      Ct[0] ? "block" : "none"}; border:0; padding-bottom: 10px;`) && f(n, "style", r), Dt[0] & /*showCanvas*/
      1 && u !== (u = /*showCanvas*/
      Ct[0] ? "-" : "=") && Ft(a, u), Dt[0] & /*periodLabel*/
      16 && Ft(
        m,
        /*periodLabel*/
        Ct[4]
      ), Dt[0] & /*activeSpan*/
      8 && L !== (L = Jt(`qbtn ${/*activeSpan*/
      Ct[3] === 1 ? "active" : ""}`) + " svelte-1xibldd") && f(C, "class", L), Dt[0] & /*activeSpan*/
      8 && R !== (R = Jt(`qbtn ${/*activeSpan*/
      Ct[3] === 3 ? "active" : ""}`) + " svelte-1xibldd") && f(k, "class", R), Dt[0] & /*activeSpan*/
      8 && E !== (E = Jt(`qbtn ${/*activeSpan*/
      Ct[3] === 7 ? "active" : ""}`) + " svelte-1xibldd") && f(Y, "class", E), Dt[0] & /*activeSpan*/
      8 && D !== (D = Jt(`qbtn ${/*activeSpan*/
      Ct[3] === 14 ? "active" : ""}`) + " svelte-1xibldd") && f(b, "class", D), Dt[0] & /*activeSpan*/
      8 && Tt !== (Tt = Jt(`qbtn ${/*activeSpan*/
      Ct[3] === 30 ? "active" : ""}`) + " svelte-1xibldd") && f(N, "class", Tt), Dt[0] & /*activeSpan*/
      8 && Nt !== (Nt = Jt(`qbtn ${/*activeSpan*/
      Ct[3] === 90 ? "active" : ""}`) + " svelte-1xibldd") && f(kt, "class", Nt);
    },
    i: St,
    o: St,
    d(Ct) {
      Ct && ct(e), t[15](null), t[17](null), At = !1, _n(_t);
    }
  };
}
const ee = 54;
function Oc(t, e, n) {
  let { data: r } = e, { initialRange: i = null } = e, { externalRange: o = null } = e, { preset: l = "N" } = e, { showMonthLabels: s = !0 } = e, { showData: u = !0 } = e, { showCanvas: a = !0 } = e;
  const h = uo();
  let c, m;
  const g = { l: 48, r: 12, t: 8, b: 8 }, w = [1, 3, 7, 14, 30, 90];
  let y, C, T = 24 * 60 * 60 * 1e3;
  const L = () => new Date(r.t0).getTime(), A = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol");
  function k() {
    return A() ? l === "T" ? {
      vlow: 3,
      low: 3.9,
      high: 7.8,
      vhigh: 13.9
    } : l === "P" ? {
      vlow: 3,
      low: 3.5,
      high: 7.8,
      vhigh: 13.9
    } : {
      vlow: 3,
      low: 3.9,
      high: 10,
      vhigh: 13.9
    } : l === "T" ? { vlow: 54, low: 70, high: 140, vhigh: 250 } : l === "P" ? { vlow: 54, low: 63, high: 140, vhigh: 250 } : { vlow: 54, low: 70, high: 180, vhigh: 250 };
  }
  let S = 0, R = 0, U = 0, Y = 0;
  function z(_) {
    let F = w[0], x = 1 / 0;
    for (const P of w) {
      const W = Math.abs(P - _);
      W < x && (x = W, F = P);
    }
    return F;
  }
  function E() {
    return Math.max(1, Math.floor((Y - U) / T) + 1);
  }
  let v = 14;
  const b = (_) => {
    const F = new Date(_);
    return Date.UTC(F.getUTCFullYear(), F.getUTCMonth(), F.getUTCDate());
  };
  let X;
  function D() {
    X = /* @__PURE__ */ new Map();
    for (let _ = 0; _ < C.length; _++) {
      const F = C[_];
      if (!(Number.isFinite(F) && F >= 0)) continue;
      const x = b(y[_]);
      let P = X.get(x);
      P || (P = { valid: 0, vl: 0, l: 0, t: 0, h: 0, vh: 0 }, X.set(x, P)), P.valid++;
      const W = k();
      F < W.vlow ? P.vl++ : F < W.low ? P.l++ : F <= W.high ? P.t++ : F <= W.vhigh ? P.h++ : P.vh++;
    }
  }
  function j() {
    y = Float64Array.from({ length: r.glucose.length }, (_, F) => L() + F * r.stepMs), n(12, C = Float64Array.from(r.glucose)), S = b(y[0]), R = b(y[y.length - 1]), n(13, U = (i == null ? void 0 : i.start) ?? S), n(14, Y = (i == null ? void 0 : i.end) ?? R), D();
  }
  let N;
  function nt() {
    if (!c || !(X != null && X.size)) return;
    const _ = Math.max(1, window.devicePixelRatio || 1), F = Math.max(320, c.getBoundingClientRect().width || 900), x = new Date(S).getUTCFullYear(), P = new Date(R).getUTCFullYear(), W = br(x, P + 1), st = s ? 24 : g.b, ut = g.t + W.length * ee + st;
    n(1, c.style.width = F + "px", c), n(1, c.style.height = ut + "px", c), n(1, c.width = Math.floor(F * _), c), n(1, c.height = Math.floor(ut * _), c), N.setTransform(_, 0, 0, _, 0, 0), N.clearRect(0, 0, F, ut), N.fillStyle = "#fff", N.fillRect(0, 0, F, ut);
    const rt = F - g.l - g.r;
    if (N.strokeStyle = "#f0f0f0", N.lineWidth = 1, W.forEach((ft, Mt) => {
      const it = g.t + Mt * ee;
      for (let ot = 1; ot < 12; ot++) {
        const G = Date.UTC(ft, ot, 1);
        if (G < S || G > R) continue;
        const bt = (Date.UTC(ft + 1, 0, 1) - Date.UTC(ft, 0, 1)) / T, Z = g.l + Math.round((G - Date.UTC(ft, 0, 1)) / T * (rt / bt));
        N.beginPath(), N.moveTo(Z, it + 6), N.lineTo(Z, it + ee - 6), N.stroke();
      }
    }), W.forEach((ft, Mt) => {
      const it = g.t + Mt * ee;
      N.fillStyle = "#444", N.font = "12px system-ui, sans-serif", N.textAlign = "right", N.textBaseline = "middle", N.fillText(String(ft), g.l - 8, it + ee / 2);
      const ot = Date.UTC(ft, 0, 1), G = Date.UTC(ft + 1, 0, 1) - T, bt = Math.round((Date.UTC(ft + 1, 0, 1) - Date.UTC(ft, 0, 1)) / T), Z = ($) => g.l + Math.floor(($ - Date.UTC(ft, 0, 1)) / T * (rt / bt)), et = ee - 10, J = it + 5;
      if (!u) {
        N.fillStyle = "#efefef";
        for (let $ = Math.max(ot, S); $ <= Math.min(G, R); $ += T) {
          const tt = Z($), mt = Z($ + T), wt = Math.max(1, mt - tt);
          N.fillRect(tt, J, wt, et);
        }
        return;
      }
      for (let $ = Math.max(ot, S); $ <= Math.min(G, R); $ += T) {
        const tt = Z($), mt = Z($ + T), wt = Math.max(1, mt - tt), pt = X.get($);
        if (!pt || !pt.valid) {
          N.fillStyle = "#efefef", N.globalAlpha = 1, N.fillRect(tt, J, wt, et);
          continue;
        }
        const $t = Math.max(1, Math.round(T / r.stepMs)), Zt = {
          vl: pt.vl / pt.valid,
          l: pt.l / pt.valid,
          t: pt.t / pt.valid,
          h: pt.h / pt.valid,
          vh: pt.vh / pt.valid
        };
        let Lt = J + et;
        const H = (Tn, kn, Le) => {
          const ae = Math.round(kn * et);
          ae <= 0 || (Lt -= ae, N.fillStyle = Tn, N.globalAlpha = Le, N.fillRect(tt, Lt, wt, ae));
        }, Yt = pt.valid / $t >= 0.5 ? 0.8 : 0.4, Rt = pt.valid / $t >= 0.5 ? 0.9 : 0.6;
        H("#e57373", Zt.vl, Yt), H("#ff9e80", Zt.l, Yt), H("#86c89d", Zt.t, Rt), H("#ffcc80", Zt.h, Yt), H("#ff8a65", Zt.vh, Yt), N.globalAlpha = 1;
      }
    }), u) {
      const ft = Math.max(S, Math.min(R, U)), Mt = Math.max(S, Math.min(R, Y));
      W.forEach((it, ot) => {
        const G = g.t + ot * ee, bt = Date.UTC(it, 0, 1), Z = Date.UTC(it + 1, 0, 1) - 1, et = Math.max(bt, ft), J = Math.min(Z, Mt);
        if (et > J) return;
        const $ = (Date.UTC(it + 1, 0, 1) - Date.UTC(it, 0, 1)) / T, tt = (Zt) => g.l + Math.floor((Zt - Date.UTC(it, 0, 1)) / T * (rt / $)), mt = tt(et), wt = tt(J + 1), pt = G + 5, $t = ee - 10;
        N.save(), N.fillStyle = "rgba(107,127,161,0.28)", N.fillRect(mt, pt, Math.max(1, wt - mt), $t), N.strokeStyle = "#6b7fa1", N.lineWidth = 1.5, N.beginPath(), N.moveTo(mt + 0.5, pt + 0.5), N.lineTo(mt + 0.5, pt + $t - 0.5), N.stroke(), N.beginPath(), N.moveTo(wt - 0.5, pt + 0.5), N.lineTo(wt - 0.5, pt + $t - 0.5), N.stroke(), N.restore();
      });
    }
    if (s) {
      const ft = Jo("%b"), Mt = W[W.length - 1], it = Date.UTC(Mt, 0, 1), G = (Date.UTC(Mt + 1, 0, 1) - it) / T, bt = (J) => g.l + Math.round((J - it) / T * (rt / G)), et = g.t + (W.length - 1) * ee + ee - 5 + 0.5;
      N.save(), N.strokeStyle = "#bbb", N.lineWidth = 1, N.fillStyle = "#555", N.font = "11px system-ui, sans-serif", N.textAlign = "center", N.textBaseline = "top";
      for (let J = 0; J < 12; J++) {
        const $ = Date.UTC(Mt, J, 1), tt = bt($);
        N.beginPath(), N.moveTo(tt, et), N.lineTo(tt, et + 4), N.stroke(), N.fillText(ft(new Date(Date.UTC(2e3, J, 1))), tt, et + 6);
      }
      N.restore();
    }
  }
  function Tt(_, F) {
    const x = new Date(_), P = new Date(F), W = hn("%b %e"), st = hn("%b %e, %Y"), ut = hn("%e, %Y"), rt = Date.UTC(x.getUTCFullYear(), x.getUTCMonth(), x.getUTCDate()), ft = Date.UTC(P.getUTCFullYear(), P.getUTCMonth(), P.getUTCDate());
    return rt === ft ? st(P) : x.getFullYear() === P.getFullYear() ? x.getMonth() === P.getMonth() ? `${W(x)} – ${ut(P)}` : `${W(x)} – ${st(P)}` : `${st(x)} – ${st(P)}`;
  }
  let dt = "";
  function kt() {
    const _ = E();
    n(3, v = z(_));
    const F = Math.max(0, Math.ceil((U - y[0]) / r.stepMs)), x = Math.min(C.length - 1, Math.floor((Y - y[0]) / r.stepMs));
    try {
      typeof window < "u" && window.CGM_DEBUG && console.log("[CgmTir] rangechange", {
        startISO: new Date(U).toISOString(),
        endISO: new Date(Y).toISOString(),
        days: _,
        startIdx: F,
        endIdx: x
      });
    } catch {
    }
    h("rangechange", {
      start: U,
      end: Y,
      days: _,
      startIdx: F,
      endIdx: x
    });
  }
  function vt(_) {
    n(14, Y = R), n(13, U = Math.max(S, Y - _ * T + 1)), kt(), nt();
  }
  function Nt(_) {
    const F = U + _ * T, x = Y + _ * T, P = Math.max(T, x - F);
    n(13, U = Math.max(S, Math.min(R - P, F))), n(14, Y = Math.min(R, U + P)), kt(), nt();
  }
  function At(_) {
    const F = E() * T * _;
    Nt(F / T);
  }
  function _t() {
    const _ = c;
    let F = !1, x = null, P = null, W = 0, st = 0;
    const ut = 6, rt = (ot) => {
      const G = new Date(ot);
      return Date.UTC(G.getUTCFullYear(), G.getUTCMonth(), G.getUTCDate());
    };
    function ft() {
      const ot = Math.max(320, _.getBoundingClientRect().width || 900), G = ot - g.l - g.r, bt = br(new Date(S).getUTCFullYear(), new Date(R).getUTCFullYear() + 1);
      return { cssW: ot, plotW: G, years: bt };
    }
    function Mt(ot, G) {
      const bt = (Date.UTC(ot + 1, 0, 1) - Date.UTC(ot, 0, 1)) / T;
      return (Z) => g.l + Math.floor((Z - Date.UTC(ot, 0, 1)) / T * (G / bt));
    }
    function it(ot) {
      const G = _.getBoundingClientRect(), bt = ot.clientX - G.left, Z = ot.clientY - G.top, { cssW: et, years: J } = ft(), $ = Math.floor((Z - 8) / ee);
      if ($ < 0 || $ >= J.length) return null;
      const tt = J[$], mt = g.l, wt = et - g.r, pt = Math.max(mt, Math.min(wt, bt)), $t = (Date.UTC(tt + 1, 0, 1) - Date.UTC(tt, 0, 1)) / T, Zt = (pt - mt) / (wt - mt);
      let Lt = Date.UTC(tt, 0, 1) + Zt * $t * T;
      return Lt = Math.max(S, Math.min(R, Lt)), { t: Lt, yr: tt, x: pt, rowIdx: $ };
    }
    _.addEventListener("mousedown", (ot) => {
      const G = it(ot);
      if (!G) return;
      const { plotW: bt } = ft(), Z = Mt(G.yr, bt), et = Z(Math.max(Date.UTC(G.yr, 0, 1), U)), J = Z(Math.min(Date.UTC(G.yr + 1, 0, 1) - 1, Y)) + 1;
      x = "new", G.x >= et - ut && G.x <= et + ut ? x = "resize-l" : G.x >= J - ut && G.x <= J + ut ? x = "resize-r" : G.x > et && G.x < J && (x = "move"), F = !0, P = G.t, W = U, st = Y, document.body.style.userSelect = "none", _.style.cursor = x === "move" ? "grabbing" : x === "new" ? "crosshair" : "col-resize";
    }), window.addEventListener("mousemove", (ot) => {
      const G = it(ot);
      if (!G) {
        F || (_.style.cursor = "crosshair");
        return;
      }
      if (!F) {
        const { plotW: et } = ft(), J = Mt(G.yr, et), $ = J(Math.max(Date.UTC(G.yr, 0, 1), U)), tt = J(Math.min(Date.UTC(G.yr + 1, 0, 1) - 1, Y)) + 1;
        G.x >= $ - ut && G.x <= $ + ut || G.x >= tt - ut && G.x <= tt + ut ? _.style.cursor = "col-resize" : G.x > $ && G.x < tt ? _.style.cursor = "grab" : _.style.cursor = "crosshair";
        return;
      }
      const bt = G.t, Z = T;
      if (x === "new") {
        const et = rt(Math.min(P, bt)), J = rt(Math.max(P, bt));
        let $ = Math.max(1, Math.floor((J - et) / Z) + 1);
        const tt = z($);
        if (bt >= P) {
          let mt = et, wt = mt + tt * Z - 1;
          wt > R && (wt = R, mt = Math.max(S, wt - tt * Z + 1)), n(13, U = mt), n(14, Y = wt);
        } else {
          let mt = J + Z - 1, wt = mt - tt * Z + 1;
          wt < S && (wt = S, mt = Math.min(R, wt + tt * Z - 1)), n(13, U = wt), n(14, Y = mt);
        }
      } else if (x === "resize-l") {
        const et = Math.max(1, Math.floor((st - rt(Math.min(bt, st - Z + 1)) + 1) / Z)), J = z(et);
        let $ = st - J * Z + 1;
        $ = Math.max(S, Math.min($, st - Z + 1)), n(13, U = $), n(14, Y = st);
      } else if (x === "resize-r") {
        const et = Math.max(1, Math.floor((rt(bt) + Z - 1 - W + 1) / Z)), J = z(et);
        let $ = W + J * Z - 1;
        $ = Math.min(R, Math.max($, W + Z - 1)), n(13, U = W), n(14, Y = $);
      } else if (x === "move") {
        const et = Math.round((rt(bt) - rt(P)) / Z), J = st - W + 1;
        let $ = W + et * Z;
        $ = Math.max(S, Math.min(R - J + 1, $)), n(13, U = $), n(14, Y = $ + J - 1);
      }
      kt(), nt();
    }), window.addEventListener("mouseup", () => {
      F && (F = !1, x = null, P = null, document.body.style.userSelect = "", _.style.cursor = "crosshair");
    });
  }
  bn(() => {
    N = c.getContext("2d"), j(), nt();
    const _ = Math.max(0, Math.ceil((U - y[0]) / r.stepMs)), F = Math.min(C.length - 1, Math.floor((Y - y[0]) / r.stepMs));
    h("ready", {
      start: U,
      end: Y,
      startIdx: _,
      endIdx: F,
      days: E()
    }), kt(), _t();
    const x = () => nt(), P = (W) => {
      const st = W.target && W.target.tagName ? W.target.tagName.toLowerCase() : "";
      if (!(st === "input" || st === "textarea" || st === "select" || W.defaultPrevented)) {
        if (/^[1-6]$/.test(W.key)) {
          const rt = {
            1: 1,
            2: 3,
            3: 7,
            4: 14,
            5: 30,
            6: 90
          }[W.key];
          vt(rt), W.preventDefault();
          return;
        }
        if (W.key === "ArrowLeft" || W.key === "ArrowRight") {
          W.shiftKey ? At(W.key === "ArrowLeft" ? -1 : 1) : Nt(W.key === "ArrowLeft" ? -1 : 1), W.preventDefault();
          return;
        }
      }
    };
    return window.addEventListener("resize", x), window.addEventListener("keydown", P), () => window.removeEventListener("resize", x);
  });
  function Ct(_) {
    Xe[_ ? "unshift" : "push"](() => {
      c = _, n(1, c);
    });
  }
  const Dt = () => {
    n(0, a = !a);
  };
  function ge(_) {
    Xe[_ ? "unshift" : "push"](() => {
      m = _, n(2, m);
    });
  }
  const xt = () => vt(1), d = () => vt(3), I = () => vt(7), V = () => vt(14), M = () => vt(30), lt = () => vt(90);
  return t.$$set = (_) => {
    "data" in _ && n(6, r = _.data), "initialRange" in _ && n(7, i = _.initialRange), "externalRange" in _ && n(8, o = _.externalRange), "preset" in _ && n(9, l = _.preset), "showMonthLabels" in _ && n(10, s = _.showMonthLabels), "showData" in _ && n(11, u = _.showData), "showCanvas" in _ && n(0, a = _.showCanvas);
  }, t.$$.update = () => {
    if (t.$$.dirty[0] & /*externalRange, viewStart, viewEnd*/
    24832 && o && typeof o.start == "number" && typeof o.end == "number") {
      const _ = o.start, F = o.end;
      (_ !== U || F !== Y) && (n(13, U = _), n(14, Y = F), kt(), nt());
    }
    t.$$.dirty[0] & /*viewStart, viewEnd*/
    24576 && n(4, dt = Tt(U, Y)), t.$$.dirty[0] & /*values, preset*/
    4608 && C && l && (D(), nt());
  }, n(3, v = z(E())), [
    a,
    c,
    m,
    v,
    dt,
    vt,
    r,
    i,
    o,
    l,
    s,
    u,
    C,
    U,
    Y,
    Ct,
    Dt,
    ge,
    xt,
    d,
    I,
    V,
    M,
    lt
  ];
}
class Gc extends Ke {
  constructor(e) {
    super(), Je(
      this,
      e,
      Oc,
      Bc,
      $e,
      {
        data: 6,
        initialRange: 7,
        externalRange: 8,
        preset: 9,
        showMonthLabels: 10,
        showData: 11,
        showCanvas: 0
      },
      null,
      [-1, -1]
    );
  }
}
function Zc(t) {
  let e, n, r, i, o, l, s, u, a, h, c, m, g, w, y, C, T, L, A, k, S, R, U, Y, z, E, v, b, X;
  return {
    c() {
      e = K("div"), n = K("div"), r = K("div"), i = K("b"), i.textContent = "Average Glucose", o = K("div"), o.textContent = `Goal: ${/*isMmol*/
      t[6]() ? `Target ${/*TH*/
      t[7]().low.toFixed(1)}–${/*TH*/
      t[7]().high.toFixed(1)} mmol/L` : `Target ${Math.round(
        /*TH*/
        t[7]().low
      )}–${Math.round(
        /*TH*/
        t[7]().high
      )} mg/dL`}`, l = K("div"), s = q(
        /*avgText*/
        t[0]
      ), u = at(), a = K("div"), h = K("div"), h.innerHTML = '<b>Glucose Management Indicator (GMI)</b><div class="muted svelte-1bp5ihd" style="font-size:11px;">Goal: &lt;7%</div>', c = K("div"), m = q(
        /*gmiText*/
        t[1]
      ), g = at(), w = K("div"), y = K("div"), y.innerHTML = '<b>Glucose Variability (CV)</b><div class="muted svelte-1bp5ihd" style="font-size:11px;">Goal: ≤36%</div>', C = K("div"), T = q(
        /*cvText*/
        t[2]
      ), L = at(), A = K("div"), k = K("div"), S = K("b"), S.textContent = "Target Range", R = K("div"), U = q(
        /*presetLabel*/
        t[4]
      ), Y = K("div"), z = q(
        /*targetRangeText*/
        t[5]
      ), E = at(), v = K("div"), b = q("Time CGM Active: "), X = q(
        /*activeText*/
        t[3]
      ), f(o, "class", "muted svelte-1bp5ihd"), Q(o, "font-size", "11px"), f(r, "class", "svelte-1bp5ihd"), f(l, "class", "svelte-1bp5ihd"), f(n, "class", "metric svelte-1bp5ihd"), f(h, "class", "svelte-1bp5ihd"), f(c, "class", "svelte-1bp5ihd"), f(a, "class", "metric svelte-1bp5ihd"), f(y, "class", "svelte-1bp5ihd"), f(C, "class", "svelte-1bp5ihd"), f(w, "class", "metric svelte-1bp5ihd"), f(R, "class", "muted svelte-1bp5ihd"), Q(R, "font-size", "11px"), f(k, "class", "svelte-1bp5ihd"), Q(Y, "font-weight", "normal"), f(Y, "class", "svelte-1bp5ihd"), f(A, "class", "metric svelte-1bp5ihd"), f(v, "class", "muted svelte-1bp5ihd"), Q(v, "font-size", "11px"), Q(v, "margin-top", "6px"), Q(v, "margin-left", "8px"), f(e, "class", "summary"), Q(e, "padding", "0 10px");
    },
    m(D, j) {
      ht(D, e, j), p(e, n), p(n, r), p(r, i), p(r, o), p(n, l), p(l, s), p(e, u), p(e, a), p(a, h), p(a, c), p(c, m), p(e, g), p(e, w), p(w, y), p(w, C), p(C, T), p(e, L), p(e, A), p(A, k), p(k, S), p(k, R), p(R, U), p(A, Y), p(Y, z), p(e, E), p(e, v), p(v, b), p(v, X);
    },
    p(D, [j]) {
      j & /*avgText*/
      1 && Ft(
        s,
        /*avgText*/
        D[0]
      ), j & /*gmiText*/
      2 && Ft(
        m,
        /*gmiText*/
        D[1]
      ), j & /*cvText*/
      4 && Ft(
        T,
        /*cvText*/
        D[2]
      ), j & /*presetLabel*/
      16 && Ft(
        U,
        /*presetLabel*/
        D[4]
      ), j & /*targetRangeText*/
      32 && Ft(
        z,
        /*targetRangeText*/
        D[5]
      ), j & /*activeText*/
      8 && Ft(
        X,
        /*activeText*/
        D[3]
      );
    },
    i: St,
    o: St,
    d(D) {
      D && ct(e);
    }
  };
}
function Qc(t, e, n) {
  let r, i, { data: o } = e, { range: l = null } = e, { preset: s = "N" } = e, u = "—", a = "—", h = "—", c = "—", m, g;
  const w = () => /mmol/i.test((o == null ? void 0 : o.units) || "mmol"), y = (L) => w() ? L * 18 : L;
  function C() {
    return w() ? s === "T" ? {
      vlow: 3,
      low: 3.9,
      high: 7.8,
      vhigh: 13.9
    } : s === "P" ? {
      vlow: 3,
      low: 3.5,
      high: 7.8,
      vhigh: 13.9
    } : {
      vlow: 3,
      low: 3.9,
      high: 10,
      vhigh: 13.9
    } : s === "T" ? { vlow: 54, low: 70, high: 140, vhigh: 250 } : s === "P" ? { vlow: 54, low: 63, high: 140, vhigh: 250 } : { vlow: 54, low: 70, high: 180, vhigh: 250 };
  }
  function T() {
    if (!o) return;
    const L = new Date(o.t0).getTime();
    n(11, m = Float64Array.from({ length: o.glucose.length }, (A, k) => L + k * o.stepMs)), n(12, g = Float64Array.from(o.glucose));
  }
  return bn(() => {
    T();
  }), t.$$set = (L) => {
    "data" in L && n(8, o = L.data), "range" in L && n(9, l = L.range), "preset" in L && n(10, s = L.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*preset*/
    1024 && n(4, i = s === "T" ? "Tight" : s === "P" ? "Pregnancy" : "General"), t.$$.dirty & /*data*/
    256 && o && T(), t.$$.dirty & /*data, range, time, values*/
    6912 && o && l && m && g) {
      const { start: L, end: A } = l, k = Math.max(0, Math.ceil((L - m[0]) / o.stepMs)), S = Math.min(g.length - 1, Math.floor((A - m[0]) / o.stepMs));
      try {
        typeof window < "u" && window.CGM_DEBUG && console.log("[CgmSummary] update", {
          startISO: new Date(L).toISOString(),
          endISO: new Date(A).toISOString(),
          stepMs: o.stepMs,
          i0: k,
          i1: S,
          len: g.length
        });
      } catch {
      }
      if (S < k)
        n(0, u = "—"), n(1, a = "—"), n(2, h = "—"), n(3, c = "—");
      else {
        const R = [];
        for (let Tt = k; Tt <= S; Tt++) {
          const dt = g[Tt];
          Number.isFinite(dt) && dt >= 0 && R.push(dt);
        }
        const U = Math.max(1, S - k + 1), z = 100 * R.length / U;
        n(3, c = `${z.toFixed(1)}%`);
        const E = Ua(R), v = Ca(R) ?? 0, b = Math.sqrt(v), X = Number.isFinite(E) ? 3.31 + 0.02392 * y(E) : NaN, D = Number.isFinite(E) && E !== 0 ? b / E * 100 : NaN;
        n(0, u = Number.isFinite(E) ? w() ? `${E.toFixed(1)} mmol/L` : `${Math.round(E)} mg/dL` : "—"), n(1, a = Number.isFinite(X) ? `${X.toFixed(1)}%` : "—"), n(2, h = Number.isFinite(D) ? `${D.toFixed(1)}%` : "—");
        const j = hn("%b %e, %Y"), N = new Date(L), nt = new Date(A);
        `${j(N)}${j(nt)}`, Date.UTC(N.getUTCFullYear(), N.getUTCMonth(), N.getUTCDate()), Date.UTC(nt.getUTCFullYear(), nt.getUTCMonth(), nt.getUTCDate());
      }
    }
  }, n(5, r = w() ? `${C().low.toFixed(1)}–${C().high.toFixed(1)} mmol/L` : `${Math.round(C().low)}–${Math.round(C().high)} mg/dL`), [
    u,
    a,
    h,
    c,
    i,
    r,
    w,
    C,
    o,
    l,
    s,
    m,
    g
  ];
}
class $c extends Ke {
  constructor(e) {
    super(), Je(this, e, Qc, Zc, $e, { data: 8, range: 9, preset: 10 });
  }
}
function Jc(t) {
  let e;
  return {
    c() {
      e = q("General 70–180 mg/dL");
    },
    m(n, r) {
      ht(n, e, r);
    },
    p: St,
    d(n) {
      n && ct(e);
    }
  };
}
function Kc(t) {
  let e;
  return {
    c() {
      e = q("Pregnancy 63–140 mg/dL");
    },
    m(n, r) {
      ht(n, e, r);
    },
    p: St,
    d(n) {
      n && ct(e);
    }
  };
}
function jc(t) {
  let e;
  return {
    c() {
      e = q("Tight 70–140 mg/dL");
    },
    m(n, r) {
      ht(n, e, r);
    },
    p: St,
    d(n) {
      n && ct(e);
    }
  };
}
function th(t) {
  let e;
  function n(o, l) {
    return (
      /*preset*/
      o[1] === "T" ? rh : (
        /*preset*/
        o[1] === "P" ? nh : eh
      )
    );
  }
  let r = n(t), i = r(t);
  return {
    c() {
      i.c(), e = te();
    },
    m(o, l) {
      i.m(o, l), ht(o, e, l);
    },
    p(o, l) {
      r !== (r = n(o)) && (i.d(1), i = r(o), i && (i.c(), i.m(e.parentNode, e)));
    },
    d(o) {
      o && ct(e), i.d(o);
    }
  };
}
function eh(t) {
  let e;
  return {
    c() {
      e = q("General 3.9–10.0 mmol/L");
    },
    m(n, r) {
      ht(n, e, r);
    },
    d(n) {
      n && ct(e);
    }
  };
}
function nh(t) {
  let e;
  return {
    c() {
      e = q("Pregnancy 3.5–7.8 mmol/L");
    },
    m(n, r) {
      ht(n, e, r);
    },
    d(n) {
      n && ct(e);
    }
  };
}
function rh(t) {
  let e;
  return {
    c() {
      e = q("Tight 3.9–7.8 mmol/L");
    },
    m(n, r) {
      ht(n, e, r);
    },
    d(n) {
      n && ct(e);
    }
  };
}
function ih(t) {
  let e, n, r, i, o, l, s, u, a, h, c, m, g, w, y, C = (
    /*pct*/
    t[2].targ.toFixed(1) + ""
  ), T, L, A, k, S, R, U;
  function Y(v, b) {
    var X;
    return b & /*data*/
    1 && (U = null), U == null && (U = !!/mmol/i.test(
      /*data*/
      ((X = v[0]) == null ? void 0 : X.units) || "mmol"
    )), U ? th : (
      /*preset*/
      v[1] === "T" ? jc : (
        /*preset*/
        v[1] === "P" ? Kc : Jc
      )
    );
  }
  let z = Y(t, -1), E = z(t);
  return {
    c() {
      e = K("div"), n = K("div"), r = K("div"), i = at(), o = K("div"), l = at(), s = K("div"), u = at(), a = K("div"), h = at(), c = K("div"), m = at(), g = K("div"), w = K("div"), y = K("span"), T = q(C), L = q("%"), A = q(" in range "), k = K("span"), k.textContent = "· Goal >= 70%", S = at(), R = K("div"), E.c(), f(r, "class", "seg vlow svelte-536eaw"), Q(
        r,
        "width",
        /*pct*/
        t[2].vlow + "%"
      ), f(r, "title", "Very low"), f(o, "class", "seg low svelte-536eaw"), Q(
        o,
        "width",
        /*pct*/
        t[2].low + "%"
      ), f(o, "title", "Low"), f(s, "class", "seg targ svelte-536eaw"), Q(
        s,
        "width",
        /*pct*/
        t[2].targ + "%"
      ), f(s, "title", "Target"), f(a, "class", "seg high svelte-536eaw"), Q(
        a,
        "width",
        /*pct*/
        t[2].high + "%"
      ), f(a, "title", "High"), f(c, "class", "seg vhigh svelte-536eaw"), Q(
        c,
        "width",
        /*pct*/
        t[2].vhigh + "%"
      ), f(c, "title", "Very high"), f(n, "class", "bar svelte-536eaw"), f(y, "class", "strong svelte-536eaw"), f(k, "class", "muted svelte-536eaw"), f(w, "class", "left svelte-536eaw"), f(R, "class", "right svelte-536eaw"), f(g, "class", "legend svelte-536eaw"), f(e, "class", "tirbar svelte-536eaw");
    },
    m(v, b) {
      ht(v, e, b), p(e, n), p(n, r), p(n, i), p(n, o), p(n, l), p(n, s), p(n, u), p(n, a), p(n, h), p(n, c), p(e, m), p(e, g), p(g, w), p(w, y), p(y, T), p(y, L), p(w, A), p(w, k), p(g, S), p(g, R), E.m(R, null);
    },
    p(v, [b]) {
      b & /*pct*/
      4 && Q(
        r,
        "width",
        /*pct*/
        v[2].vlow + "%"
      ), b & /*pct*/
      4 && Q(
        o,
        "width",
        /*pct*/
        v[2].low + "%"
      ), b & /*pct*/
      4 && Q(
        s,
        "width",
        /*pct*/
        v[2].targ + "%"
      ), b & /*pct*/
      4 && Q(
        a,
        "width",
        /*pct*/
        v[2].high + "%"
      ), b & /*pct*/
      4 && Q(
        c,
        "width",
        /*pct*/
        v[2].vhigh + "%"
      ), b & /*pct*/
      4 && C !== (C = /*pct*/
      v[2].targ.toFixed(1) + "") && Ft(T, C), z === (z = Y(v, b)) && E ? E.p(v, b) : (E.d(1), E = z(v), E && (E.c(), E.m(R, null)));
    },
    i: St,
    o: St,
    d(v) {
      v && ct(e), E.d();
    }
  };
}
function oh(t, e, n) {
  let { data: r } = e, { range: i = null } = e, { preset: o = "N" } = e, l, s;
  const u = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), a = () => u() ? o === "T" ? {
    vlow: 3,
    low: 3.9,
    high: 7.8,
    vhigh: 13.9
  } : o === "P" ? {
    vlow: 3,
    low: 3.5,
    high: 7.8,
    vhigh: 13.9
  } : {
    vlow: 3,
    low: 3.9,
    high: 10,
    vhigh: 13.9
  } : o === "T" ? { vlow: 54, low: 70, high: 140, vhigh: 250 } : o === "P" ? { vlow: 54, low: 63, high: 140, vhigh: 250 } : { vlow: 54, low: 70, high: 180, vhigh: 250 };
  let h = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  };
  function c() {
    if (!r) return;
    const m = new Date(r.t0).getTime();
    n(4, l = Float64Array.from({ length: r.glucose.length }, (g, w) => m + w * r.stepMs)), n(5, s = Float64Array.from(r.glucose));
  }
  return bn(() => {
    c();
  }), t.$$set = (m) => {
    "data" in m && n(0, r = m.data), "range" in m && n(3, i = m.range), "preset" in m && n(1, o = m.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*data*/
    1 && r && c(), t.$$.dirty & /*data, range, time, values, preset*/
    59 && r && i && l && s && o) {
      const { start: m, end: g } = i, w = Math.max(0, Math.ceil((m - l[0]) / r.stepMs)), y = Math.min(s.length - 1, Math.floor((g - l[0]) / r.stepMs));
      if (y < w)
        n(2, h = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        });
      else {
        const C = a();
        let T = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, L = 0;
        for (let A = w; A <= y; A++) {
          const k = s[A];
          Number.isFinite(k) && k >= 0 && (L++, k < C.vlow ? T.vlow++ : k < C.low ? T.low++ : k <= C.high ? T.targ++ : k <= C.vhigh ? T.high++ : T.vhigh++);
        }
        L === 0 ? n(2, h = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }) : n(2, h = {
          vlow: T.vlow / L * 100,
          low: T.low / L * 100,
          targ: T.targ / L * 100,
          high: T.high / L * 100,
          vhigh: T.vhigh / L * 100
        });
      }
    }
  }, [r, o, h, i, l, s];
}
class ah extends Ke {
  constructor(e) {
    super(), Je(this, e, oh, ih, $e, { data: 0, range: 3, preset: 1 });
  }
}
function lh(t) {
  let e;
  return {
    c() {
      e = B("svg"), Q(e, "width", "100%"), Q(e, "height", "260px"), Q(e, "display", "block");
    },
    m(n, r) {
      ht(n, e, r), t[6](e);
    },
    p: St,
    i: St,
    o: St,
    d(n) {
      n && ct(e), t[6](null);
    }
  };
}
function an(t, e) {
  if (!t.length) return NaN;
  const n = (t.length - 1) * e, r = Math.floor(n), i = n - r;
  return t[r] + (t[Math.min(t.length - 1, r + 1)] - t[r]) * (i || 0);
}
function sh(t, e, n) {
  let { data: r } = e, { range: i = null } = e, { preset: o = "N" } = e, l, s = 900, u = 260;
  const a = { l: 50, r: 60, t: 20, b: 26 }, h = 24 * 60 * 60 * 1e3, c = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), m = () => c() ? o === "T" ? {
    vlow: 3,
    low: 3.9,
    high: 7.8,
    vhigh: 13.9
  } : o === "P" ? {
    vlow: 3,
    low: 3.5,
    high: 7.8,
    vhigh: 13.9
  } : {
    vlow: 3,
    low: 3.9,
    high: 10,
    vhigh: 13.9
  } : o === "T" ? { vlow: 54, low: 70, high: 140, vhigh: 250 } : o === "P" ? { vlow: 54, low: 63, high: 140, vhigh: 250 } : { vlow: 54, low: 70, high: 180, vhigh: 250 };
  let g, w;
  function y() {
    const A = new Date(r.t0).getTime();
    n(4, g = Float64Array.from({ length: r.glucose.length }, (k, S) => A + S * r.stepMs)), n(5, w = Float64Array.from(r.glucose));
  }
  function C(A, k) {
    const S = Math.max(1, Math.round(h / r.stepMs)), R = Array.from({ length: S }, () => []), U = /* @__PURE__ */ new Set();
    for (let z = A; z <= k; z++) {
      const E = w[z];
      if (!(Number.isFinite(E) && E >= 0)) continue;
      const v = g[z], b = new Date(v), X = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
      U.add(X);
      let D = Math.round((v - X) / r.stepMs);
      D < 0 ? D = 0 : D >= S && (D = S - 1), R[D].push(E);
    }
    return {
      series: R.map((z, E) => {
        const v = Float64Array.from(z).sort();
        return {
          t: E,
          p05: an(v, 0.05),
          p25: an(v, 0.25),
          p50: an(v, 0.5),
          p75: an(v, 0.75),
          p95: an(v, 0.95)
        };
      }),
      samplesPerDay: S,
      dayCount: U.size
    };
  }
  function T() {
    if (!l || !r || !i || !g || !w) return;
    const A = l.getBoundingClientRect();
    s = Math.max(360, A.width || 900), u = Math.max(220, A.height || 260);
    const k = ve(l);
    k.selectAll("*").remove();
    const S = Math.max(0, Math.ceil((i.start - g[0]) / r.stepMs)), R = Math.min(w.length - 1, Math.floor((i.end - g[0]) / r.stepMs));
    if (R < S) return;
    const { series: U, samplesPerDay: Y, dayCount: z } = C(S, R);
    if (!U.flatMap((d) => [d.p05, d.p95]).filter(Number.isFinite).length) {
      k.append("text").attr("x", a.l).attr("y", u / 2).text("Not enough data in selection to compute AGP");
      return;
    }
    const v = yn().domain([0, Y - 1]).range([a.l, s - a.r]), b = m(), X = c() ? 20 : 360, D = yn().domain([b.vlow, X]).range([u - a.b, a.t]), j = ne().defined((d) => Number.isFinite(d.p05) && Number.isFinite(d.p95) && d.p05 < b.low).x((d) => v(d.t)).y0((d) => D(Math.min(d.p95, b.low))).y1((d) => D(d.p05)), N = ne().defined((d) => Number.isFinite(d.p05) && Number.isFinite(d.p95) && d.p95 > b.low && d.p05 < b.high).x((d) => v(d.t)).y0((d) => D(Math.min(d.p95, b.high))).y1((d) => D(Math.max(d.p05, b.low))), nt = ne().defined((d) => Number.isFinite(d.p05) && Number.isFinite(d.p95) && d.p95 > b.high && d.p05 < b.vhigh).x((d) => v(d.t)).y0((d) => D(Math.min(d.p95, b.vhigh))).y1((d) => D(Math.max(d.p05, b.high))), Tt = ne().defined((d) => Number.isFinite(d.p05) && Number.isFinite(d.p95) && d.p95 > b.vhigh && d.p05 < b.vhigh).x((d) => v(d.t)).y0((d) => D(d.p95)).y1((d) => D(b.vhigh)), dt = ne().defined((d) => Number.isFinite(d.p05) && Number.isFinite(d.p95) && d.p05 > b.vhigh).x((d) => v(d.t)).y0((d) => D(d.p95)).y1((d) => D(d.p05));
    k.append("rect").attr("x", a.l).attr("width", s - a.r - a.l).attr("y", D(b.high)).attr("height", D(b.low) - D(b.high)).attr("fill", "#1a9850").attr("opacity", 0.1), k.append("path").attr("d", j(U)).attr("fill", "#d73027").attr("opacity", 0.18), k.append("path").attr("d", N(U)).attr("fill", "#1a9850").attr("opacity", 0.12), k.append("path").attr("d", nt(U)).attr("fill", "#fdae61").attr("opacity", 0.18), k.append("path").attr("d", Tt(U)).attr("fill", "#f46d43").attr("opacity", 0.26), k.append("path").attr("d", dt(U)).attr("fill", "#f46d43").attr("opacity", 0.26);
    const kt = ne().defined((d) => Number.isFinite(d.p25) && Number.isFinite(d.p75) && d.p75 > b.low && d.p25 < b.high).x((d) => v(d.t)).y0((d) => D(Math.min(Math.max(d.p25, b.low), b.high))).y1((d) => D(Math.max(Math.min(d.p75, b.high), b.low))), vt = ne().defined((d) => Number.isFinite(d.p25) && Number.isFinite(d.p75) && d.p75 > b.high && d.p25 < b.vhigh).x((d) => v(d.t)).y0((d) => D(Math.min(d.p75, b.vhigh))).y1((d) => D(Math.max(d.p25, b.high))), Nt = ne().defined((d) => Number.isFinite(d.p25) && Number.isFinite(d.p75) && d.p75 > b.vhigh && d.p25 < b.vhigh).x((d) => v(d.t)).y0((d) => D(d.p75)).y1((d) => D(b.vhigh)), At = ne().defined((d) => Number.isFinite(d.p25) && Number.isFinite(d.p75) && d.p25 < b.low).x((d) => v(d.t)).y0((d) => D(d.p25)).y1((d) => D(Math.min(d.p75, b.low)));
    k.append("path").attr("d", At(U)).attr("fill", "#d73027").attr("opacity", 0.35), k.append("path").attr("d", kt(U)).attr("fill", "#1a9850").attr("opacity", 0.25), k.append("path").attr("d", vt(U)).attr("fill", "#fdae61").attr("opacity", 0.35), k.append("path").attr("d", Nt(U)).attr("fill", "#f46d43").attr("opacity", 0.45);
    try {
      let M = function(x, P, W) {
        return x < W && P >= W || x > W && P <= W;
      }, lt = function(x, P, W, st, ut) {
        return { t: x + (ut - P) * (W - x) / (st - P), p50: ut };
      };
      const d = (x) => x < b.low ? "#d73027" : x > b.vhigh ? "#f46d43" : x > b.high ? "#fdae61" : "#1a9850", I = gn().x((x) => v(x.t)).y((x) => D(x.p50)), V = (x, P, W, st) => {
        !Number.isFinite(W.p50) || !Number.isFinite(st.p50) || ((!x.length || x[x.length - 1].color !== P) && x.push({ color: P, arr: [W] }), x[x.length - 1].arr.push(st));
      };
      let _ = [], F = null;
      for (let x = 0; x < U.length; x++) {
        const P = U[x];
        if (!Number.isFinite(P.p50)) {
          F = null;
          continue;
        }
        if (!F) {
          F = P;
          continue;
        }
        const W = F.t, st = F.p50, ut = P.t, rt = P.p50;
        let ft = [{ t: W, p50: st }], Mt = st, it = W;
        const ot = [b.low, b.high, b.vhigh];
        (rt > st ? ot : ot.slice().reverse()).forEach((Z) => {
          if (M(Mt, rt, Z)) {
            const et = lt(it, Mt, ut, rt, Z);
            ft.push(et), Mt = et.p50, it = et.t;
          }
        }), ft.push({ t: ut, p50: rt });
        for (let Z = 1; Z < ft.length; Z++) {
          const et = ft[Z - 1], J = ft[Z], $ = (et.p50 + J.p50) / 2 + (J.p50 === et.p50 ? J.t > et.t ? 1e-6 : -1e-6 : 0), tt = d($);
          V(_, tt, et, J);
        }
        F = P;
      }
      _.forEach((x) => {
        x.arr.length >= 2 && k.append("path").attr("d", I(x.arr)).attr("stroke", x.color).attr("fill", "none").attr("stroke-width", 2);
      });
    } catch {
    }
    k.append("line").attr("x1", a.l).attr("x2", s - a.r).attr("y1", D(b.high)).attr("y2", D(b.high)).attr("stroke", "#6ea77b").attr("stroke-width", 1), k.append("line").attr("x1", a.l).attr("x2", s - a.r).attr("y1", D(b.low)).attr("y2", D(b.low)).attr("stroke", "#6ea77b").attr("stroke-width", 1), k.append("line").attr("x1", a.l).attr("x2", s - a.r).attr("y1", D(b.vlow)).attr("y2", D(b.vlow)).attr("stroke", "#cccccc").attr("stroke-width", 1), k.append("line").attr("x1", a.l).attr("x2", s - a.r).attr("y1", D(b.vhigh)).attr("y2", D(b.vhigh)).attr("stroke", "#cccccc").attr("stroke-width", 1);
    const _t = 60 * 60 * 1e3 / r.stepMs, Ct = br(0, 24, 3).map((d) => Math.round(d * _t)), Dt = (d) => d === 0 || d === 24 ? "12am" : d < 12 ? `${d}am` : d === 12 ? "12pm" : `${d - 12}pm`;
    k.append("g").attr("transform", `translate(0,${u - a.b})`).call(Ha(v).tickValues(Ct).tickFormat((d) => Dt(Math.round(d / _t))).tickSizeOuter(0));
    const ge = [m().vlow, m().low, m().high, m().vhigh, c() ? 20 : 360].filter((d) => d >= b.vlow && d <= X), xt = c() ? (d) => Math.round(d * 10) / 10 : (d) => Math.round(d);
    k.append("g").attr("transform", `translate(${a.l},0)`).call(Ia(D).tickValues(ge).tickFormat(xt)).call((d) => d.select(".domain").remove());
    try {
      if (z && z > 2) {
        const d = (M) => {
          for (let lt = U.length - 1; lt >= 0; lt--) {
            const _ = U[lt][M];
            if (Number.isFinite(_)) return { t: U[lt].t, v: _ };
          }
          return null;
        }, V = (M, lt) => {
          if (!lt) return;
          const _ = Math.min(s - a.r - 2, v(lt.t) + 41), F = D(lt.v);
          ve(l).append("text").attr("x", _ + 5).attr("y", F).attr("dy", "0.35em").attr("text-anchor", "start").attr("fill", "#000").attr("font-size", 11).attr("font-weight", M === 50 ? 700 : 400).text(`${M}%`);
        };
        V(5, d("p05")), V(25, d("p25")), V(50, d("p50")), V(75, d("p75")), V(95, d("p95"));
      }
    } catch {
    }
    try {
      let _ = function(F) {
        const x = D(F), P = ve(l).append("text").attr("x", -9999).attr("y", -9999).attr("fill", "#fff").attr("font-size", 11).attr("font-weight", 700).text(lt(F)), W = P.node().getBBox();
        P.remove();
        const st = Math.ceil(W.width), ut = a.l - 8 - (st + 6 * 2), rt = x - 16 / 2;
        ve(l).append("rect").attr("x", ut).attr("y", rt).attr("rx", 5).attr("ry", 5).attr("width", st + 6 * 2).attr("height", 16).attr("fill", M), ve(l).append("text").attr("x", ut + 6).attr("y", x).attr("dy", "0.35em").attr("fill", "#fff").attr("font-size", 11).attr("font-weight", 700).text(lt(F));
      };
      const M = "#1a9850", lt = (F) => {
        if (c()) {
          const x = (Math.round(F * 10) / 10).toFixed(1);
          return x.endsWith(".0") ? x.slice(0, -2) : x;
        }
        return Math.round(F).toString();
      };
      _(b.low), _(b.high);
    } catch {
    }
  }
  bn(() => {
    y(), T(), window.addEventListener("resize", T);
  });
  function L(A) {
    Xe[A ? "unshift" : "push"](() => {
      l = A, n(0, l);
    });
  }
  return t.$$set = (A) => {
    "data" in A && n(1, r = A.data), "range" in A && n(2, i = A.range), "preset" in A && n(3, o = A.preset);
  }, t.$$.update = () => {
    t.$$.dirty & /*data, range, time, values, preset*/
    62 && r && i && g && w && o && T();
  }, [l, r, i, o, g, w, L];
}
class uh extends Ke {
  constructor(e) {
    super(), Je(this, e, sh, lh, $e, { data: 1, range: 2, preset: 3 });
  }
}
function fh(t) {
  let e;
  return {
    c() {
      e = B("svg"), Q(e, "width", "100%"), Q(e, "display", "block");
    },
    m(n, r) {
      ht(n, e, r), t[5](e);
    },
    p: St,
    i: St,
    o: St,
    d(n) {
      n && ct(e), t[5](null);
    }
  };
}
function ch(t, e, n) {
  let { data: r } = e, { range: i = null } = e, { preset: o = "N" } = e, { colorWholeWeek: l = !1 } = e, s;
  const u = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol");
  function a() {
    return u() ? o === "T" ? { vlow: 3, low: 3.9, high: 7.8 } : o === "P" ? { vlow: 3, low: 3.5, high: 7.8 } : { vlow: 3, low: 3.9, high: 10 } : o === "T" ? { vlow: 54, low: 70, high: 140 } : o === "P" ? { vlow: 54, low: 63, high: 140 } : { vlow: 54, low: 70, high: 180 };
  }
  let h, c;
  function m() {
    if (!r) return;
    const y = new Date(r.t0).getTime();
    h = Float64Array.from({ length: r.glucose.length }, (C, T) => y + T * r.stepMs), c = Float64Array.from(r.glucose);
  }
  function g() {
    if (!s || !r || !i || !h || !c) return;
    const y = ve(s);
    y.selectAll("*").remove();
    const C = s.getBoundingClientRect(), T = Math.max(360, C.width || 1100), L = 7, A = 0, k = { l: 50, r: 20, t: 30, b: 10 }, S = Math.max(140, Math.floor((T - k.l - k.r - (L - 1) * A) / L)), R = 86, U = 18, Y = i.start, z = i.end, E = Kt.floor(new Date(Y)).getTime(), v = Kt.floor(new Date(z)).getTime(), b = new Date(E), X = new Date(v), D = (b.getDay() + 6) % 7, j = 7 - (X.getDay() + 6) % 7 - 1, N = Kt.offset(new Date(E), -D).getTime(), nt = Kt.offset(new Date(v), j).getTime(), Tt = Kt.offset(new Date(nt), 1).getTime(), dt = Kt.range(new Date(N), Kt.offset(new Date(nt), 1)).map((xt) => xt.getTime()), kt = dt.length, vt = Math.ceil(kt / L), Nt = k.t + vt * R + (vt - 1) * A + k.b;
    s.setAttribute("height", Nt);
    const At = new Map(dt.map((xt) => [xt, []]));
    for (let xt = 0; xt < c.length; xt++) {
      const d = c[xt];
      if (!(Number.isFinite(d) && d >= 0)) continue;
      const I = h[xt];
      if (I < N || I >= Tt) continue;
      const V = Kt.floor(new Date(I)).getTime();
      At.has(V) && At.get(V).push({ t: I - V, v: d, a: I });
    }
    const _t = a(), Ct = 60 * 60 * 1e3 / r.stepMs;
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].forEach((xt, d) => {
      vt > 0 && ve(s).append("text").attr("x", k.l + d * (S + A) + S / 2).attr("y", 16).attr("text-anchor", "middle").attr("fill", "#555").attr("font-size", 10).text(xt);
    });
    for (let xt = 1; xt <= L - 1; xt++) {
      const d = k.l + xt * (S + A);
      for (let I = 0; I < vt; I++) {
        const V = k.t + I * (R + A);
        ve(s).append("line").attr("x1", d).attr("x2", d).attr("y1", V + 4).attr("y2", V + R - 4).attr("stroke", "#e6e6e6").attr("stroke-width", 1);
      }
    }
    const ge = Kt.floor(/* @__PURE__ */ new Date()).getTime();
    dt.forEach((xt, d) => {
      const I = Math.floor(d / L), V = d % L, M = k.l + V * (S + A), lt = k.t + I * (R + A), _ = y.append("g").attr("transform", `translate(${M},${lt})`), F = yn().domain([0, 24 * Ct - 1]).range([0, S]), x = yn().domain(u() ? [0, 20] : [0, 360]).range([R - U, 0]), P = xt > ge;
      P || (_.append("rect").attr("x", 0).attr("y", x(_t.high)).attr("width", S).attr("height", Math.max(1, x(_t.low) - x(_t.high))).attr("fill", "#efefef"), _.append("line").attr("x1", 0).attr("x2", S).attr("y1", x(_t.high)).attr("y2", x(_t.high)).attr("stroke", "#2e7d32").attr("opacity", 0.7), _.append("line").attr("x1", 0).attr("x2", S).attr("y1", x(_t.low)).attr("y2", x(_t.low)).attr("stroke", "#2e7d32").attr("opacity", 0.7));
      const W = (At.get(xt) || []).slice().sort((H, Yt) => H.t - Yt.t), st = 2 * r.stepMs, ut = [];
      let rt = [];
      for (const H of W) {
        if (!Number.isFinite(H.v)) {
          rt.length && (ut.push(rt), rt = []);
          continue;
        }
        rt.length && H.t - rt[rt.length - 1].t > st ? (ut.push(rt), rt = [H]) : rt.push(H);
      }
      rt.length && ut.push(rt);
      const ft = l ? N : Y, Mt = l ? Tt - 1 : z, it = (H) => H.a >= ft && H.a <= Mt, ot = ne().defined((H) => Number.isFinite(H.v) && H.v > _t.high && it(H)).x((H) => F(H.t / r.stepMs)).y0((H) => x(_t.high)).y1((H) => x(H.v));
      P || ut.forEach((H) => {
        H.length > 1 && _.append("path").attr("d", ot(H)).attr("fill", "#fdae61").attr("opacity", 0.35);
      });
      const G = ne().defined((H) => Number.isFinite(H.v) && H.v < _t.low && it(H)).x((H) => F(H.t / r.stepMs)).y0((H) => x(H.v)).y1((H) => x(_t.low));
      P || ut.forEach((H) => {
        H.length > 1 && _.append("path").attr("d", G(H)).attr("fill", "#d73027").attr("opacity", 0.25);
      }), gn().x((H) => F(H.t / r.stepMs)).y((H) => x(H.v)).curve(wr);
      const bt = (H) => Number.isFinite(H.v) && it(H) && H.v >= _t.low && H.v <= _t.high, Z = (H) => Number.isFinite(H.v) && it(H) && H.v < _t.low, et = (H) => Number.isFinite(H.v) && it(H) && H.v > _t.high, J = (H, Yt) => gn().defined(H).x((Rt) => F(Rt.t / r.stepMs)).y((Rt) => x(Rt.v)).curve(wr), $ = J(bt), tt = J(Z), mt = J(et);
      P || ut.forEach((H) => {
        if (H.length > 1) {
          const Yt = gn().defined((Rt) => Number.isFinite(Rt.v) && !it(Rt)).x((Rt) => F(Rt.t / r.stepMs)).y((Rt) => x(Rt.v)).curve(wr);
          _.append("path").attr("d", Yt(H)).attr("stroke", "#c7c7c7").attr("fill", "none").attr("stroke-width", 1.2).attr("opacity", 0.8), _.append("path").attr("d", tt(H)).attr("stroke", "#d73027").attr("fill", "none").attr("stroke-width", 1.5), _.append("path").attr("d", mt(H)).attr("stroke", "#fdae61").attr("fill", "none").attr("stroke-width", 1.5), _.append("path").attr("d", $(H)).attr("stroke", "#1a9850").attr("fill", "none").attr("stroke-width", 1.5);
        }
      });
      const wt = new Date(xt), pt = wt.getDate(), Lt = pt === 1 ? `1 ${[
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ][wt.getMonth()]}` : String(pt);
      P || (_.append("text").attr("x", -12).attr("y", -8).attr("fill", "#777").attr("font-size", 10).attr("text-anchor", "start").text(Lt), I < vt - 1 && _.append("text").attr("x", S / 2).attr("y", R - 2).attr("text-anchor", "middle").attr("fill", "#777").attr("font-size", 10).text("12pm"));
    });
  }
  bn(() => {
    m(), g(), window.addEventListener("resize", g);
  });
  function w(y) {
    Xe[y ? "unshift" : "push"](() => {
      s = y, n(0, s);
    });
  }
  return t.$$set = (y) => {
    "data" in y && n(1, r = y.data), "range" in y && n(2, i = y.range), "preset" in y && n(3, o = y.preset), "colorWholeWeek" in y && n(4, l = y.colorWholeWeek);
  }, t.$$.update = () => {
    t.$$.dirty & /*data, range, preset*/
    14 && r && i && o && g();
  }, [s, r, i, o, l, w];
}
class hh extends Ke {
  constructor(e) {
    super(), Je(this, e, ch, fh, $e, {
      data: 1,
      range: 2,
      preset: 3,
      colorWholeWeek: 4
    });
  }
}
function Xi(t) {
  let e, n = (
    /*isMmol*/
    (t[9]() ? (
      /*TH*/
      t[10]().low.toFixed(1)
    ) : (
      /*TH*/
      t[10]().low
    )) + ""
  ), r, i, o, l = (
    /*isMmol*/
    (t[9]() ? (
      /*TH*/
      t[10]().high.toFixed(1)
    ) : (
      /*TH*/
      t[10]().high
    )) + ""
  ), s, u, a, h = (
    /*isMmol*/
    (t[9]() ? (
      /*TH*/
      t[10]().vhigh.toFixed(1)
    ) : (
      /*TH*/
      t[10]().vhigh
    )) + ""
  ), c, m;
  return {
    c() {
      e = B("text"), r = q(n), o = B("text"), s = q(l), a = B("text"), c = q(h), f(e, "x", "35"), f(e, "y", i = 30 + /*yAxisPositions*/
      t[8].low), f(e, "font-family", "Arial, sans-serif"), f(e, "font-size", "10"), f(e, "fill", "#666"), f(e, "text-anchor", "end"), f(o, "x", "35"), f(o, "y", u = 30 + /*yAxisPositions*/
      t[8].high), f(o, "font-family", "Arial, sans-serif"), f(o, "font-size", "10"), f(o, "fill", "#666"), f(o, "text-anchor", "end"), f(a, "x", "35"), f(a, "y", m = 30 + /*yAxisPositions*/
      t[8].vhigh), f(a, "font-family", "Arial, sans-serif"), f(a, "font-size", "10"), f(a, "fill", "#666"), f(a, "text-anchor", "end");
    },
    m(g, w) {
      ht(g, e, w), p(e, r), ht(g, o, w), p(o, s), ht(g, a, w), p(a, c);
    },
    p(g, w) {
      w & /*yAxisPositions*/
      256 && i !== (i = 30 + /*yAxisPositions*/
      g[8].low) && f(e, "y", i), w & /*yAxisPositions*/
      256 && u !== (u = 30 + /*yAxisPositions*/
      g[8].high) && f(o, "y", u), w & /*yAxisPositions*/
      256 && m !== (m = 30 + /*yAxisPositions*/
      g[8].vhigh) && f(a, "y", m);
    },
    d(g) {
      g && (ct(e), ct(o), ct(a));
    }
  };
}
function Bi(t) {
  let e, n, r;
  return {
    c() {
      e = B("line"), f(e, "x1", "90"), f(e, "y1", n = 30 + /*linePositions*/
      t[2].high), f(e, "x2", jt), f(e, "y2", r = /*textPositions*/
      t[7].high - 40), f(e, "stroke", "#ccc"), f(e, "stroke-width", "1");
    },
    m(i, o) {
      ht(i, e, o);
    },
    p(i, o) {
      o & /*linePositions*/
      4 && n !== (n = 30 + /*linePositions*/
      i[2].high) && f(e, "y1", n), o & /*textPositions*/
      128 && r !== (r = /*textPositions*/
      i[7].high - 40) && f(e, "y2", r);
    },
    d(i) {
      i && ct(e);
    }
  };
}
function Oi(t) {
  let e, n, r;
  return {
    c() {
      e = B("line"), f(e, "x1", "90"), f(e, "y1", n = 30 + /*linePositions*/
      t[2].targ), f(e, "x2", jt), f(e, "y2", r = /*textPositions*/
      t[7].targ - 40), f(e, "stroke", "#ccc"), f(e, "stroke-width", "1");
    },
    m(i, o) {
      ht(i, e, o);
    },
    p(i, o) {
      o & /*linePositions*/
      4 && n !== (n = 30 + /*linePositions*/
      i[2].targ) && f(e, "y1", n), o & /*textPositions*/
      128 && r !== (r = /*textPositions*/
      i[7].targ - 40) && f(e, "y2", r);
    },
    d(i) {
      i && ct(e);
    }
  };
}
function Gi(t) {
  let e, n, r;
  return {
    c() {
      e = B("line"), f(e, "x1", "90"), f(e, "y1", n = 30 + /*linePositions*/
      t[2].low), f(e, "x2", jt), f(e, "y2", r = /*textPositions*/
      t[7].low - 40), f(e, "stroke", "#ccc"), f(e, "stroke-width", "1");
    },
    m(i, o) {
      ht(i, e, o);
    },
    p(i, o) {
      o & /*linePositions*/
      4 && n !== (n = 30 + /*linePositions*/
      i[2].low) && f(e, "y1", n), o & /*textPositions*/
      128 && r !== (r = /*textPositions*/
      i[7].low - 40) && f(e, "y2", r);
    },
    d(i) {
      i && ct(e);
    }
  };
}
function Zi(t) {
  let e, n, r;
  return {
    c() {
      e = B("rect"), f(e, "x", "40"), f(e, "y", n = 30 + /*barPositions*/
      t[3].vlow), f(e, "width", "50"), f(e, "height", r = /*barHeights*/
      t[4].vlow), f(e, "fill", "#e57373");
    },
    m(i, o) {
      ht(i, e, o);
    },
    p(i, o) {
      o & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      i[3].vlow) && f(e, "y", n), o & /*barHeights*/
      16 && r !== (r = /*barHeights*/
      i[4].vlow) && f(e, "height", r);
    },
    d(i) {
      i && ct(e);
    }
  };
}
function Qi(t) {
  let e, n, r;
  return {
    c() {
      e = B("rect"), f(e, "x", "40"), f(e, "y", n = 30 + /*barPositions*/
      t[3].low), f(e, "width", "50"), f(e, "height", r = /*barHeights*/
      t[4].low), f(e, "fill", "#ff9e80");
    },
    m(i, o) {
      ht(i, e, o);
    },
    p(i, o) {
      o & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      i[3].low) && f(e, "y", n), o & /*barHeights*/
      16 && r !== (r = /*barHeights*/
      i[4].low) && f(e, "height", r);
    },
    d(i) {
      i && ct(e);
    }
  };
}
function $i(t) {
  let e, n, r;
  return {
    c() {
      e = B("rect"), f(e, "x", "40"), f(e, "y", n = 30 + /*barPositions*/
      t[3].targ), f(e, "width", "50"), f(e, "height", r = /*barHeights*/
      t[4].targ), f(e, "fill", "#86c89d");
    },
    m(i, o) {
      ht(i, e, o);
    },
    p(i, o) {
      o & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      i[3].targ) && f(e, "y", n), o & /*barHeights*/
      16 && r !== (r = /*barHeights*/
      i[4].targ) && f(e, "height", r);
    },
    d(i) {
      i && ct(e);
    }
  };
}
function Ji(t) {
  let e, n, r;
  return {
    c() {
      e = B("rect"), f(e, "x", "40"), f(e, "y", n = 30 + /*barPositions*/
      t[3].high), f(e, "width", "50"), f(e, "height", r = /*barHeights*/
      t[4].high), f(e, "fill", "#ffcc80");
    },
    m(i, o) {
      ht(i, e, o);
    },
    p(i, o) {
      o & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      i[3].high) && f(e, "y", n), o & /*barHeights*/
      16 && r !== (r = /*barHeights*/
      i[4].high) && f(e, "height", r);
    },
    d(i) {
      i && ct(e);
    }
  };
}
function Ki(t) {
  let e, n, r;
  return {
    c() {
      e = B("rect"), f(e, "x", "40"), f(e, "y", n = 30 + /*barPositions*/
      t[3].vhigh), f(e, "width", "50"), f(e, "height", r = /*barHeights*/
      t[4].vhigh), f(e, "fill", "#ff8a65");
    },
    m(i, o) {
      ht(i, e, o);
    },
    p(i, o) {
      o & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      i[3].vhigh) && f(e, "y", n), o & /*barHeights*/
      16 && r !== (r = /*barHeights*/
      i[4].vhigh) && f(e, "height", r);
    },
    d(i) {
      i && ct(e);
    }
  };
}
function ji(t) {
  let e, n, r, i, o = (
    /*barHeights*/
    t[4].vlow > 2 && /*barHeights*/
    t[4].low > 2 && to(t)
  ), l = (
    /*barHeights*/
    t[4].low > 2 && /*barHeights*/
    t[4].targ > 2 && eo(t)
  ), s = (
    /*barHeights*/
    t[4].targ > 2 && /*barHeights*/
    t[4].high > 2 && no(t)
  ), u = (
    /*barHeights*/
    t[4].high > 2 && /*barHeights*/
    t[4].vhigh > 2 && ro(t)
  );
  return {
    c() {
      o && o.c(), e = te(), l && l.c(), n = te(), s && s.c(), r = te(), u && u.c(), i = te();
    },
    m(a, h) {
      o && o.m(a, h), ht(a, e, h), l && l.m(a, h), ht(a, n, h), s && s.m(a, h), ht(a, r, h), u && u.m(a, h), ht(a, i, h);
    },
    p(a, h) {
      /*barHeights*/
      a[4].vlow > 2 && /*barHeights*/
      a[4].low > 2 ? o ? o.p(a, h) : (o = to(a), o.c(), o.m(e.parentNode, e)) : o && (o.d(1), o = null), /*barHeights*/
      a[4].low > 2 && /*barHeights*/
      a[4].targ > 2 ? l ? l.p(a, h) : (l = eo(a), l.c(), l.m(n.parentNode, n)) : l && (l.d(1), l = null), /*barHeights*/
      a[4].targ > 2 && /*barHeights*/
      a[4].high > 2 ? s ? s.p(a, h) : (s = no(a), s.c(), s.m(r.parentNode, r)) : s && (s.d(1), s = null), /*barHeights*/
      a[4].high > 2 && /*barHeights*/
      a[4].vhigh > 2 ? u ? u.p(a, h) : (u = ro(a), u.c(), u.m(i.parentNode, i)) : u && (u.d(1), u = null);
    },
    d(a) {
      a && (ct(e), ct(n), ct(r), ct(i)), o && o.d(a), l && l.d(a), s && s.d(a), u && u.d(a);
    }
  };
}
function to(t) {
  let e, n, r;
  return {
    c() {
      e = B("line"), f(e, "x1", "40"), f(e, "x2", "90"), f(e, "y1", n = 30 + /*barPositions*/
      t[3].vlow), f(e, "y2", r = 30 + /*barPositions*/
      t[3].vlow), f(e, "stroke", "#fff"), f(e, "stroke-width", "1");
    },
    m(i, o) {
      ht(i, e, o);
    },
    p(i, o) {
      o & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      i[3].vlow) && f(e, "y1", n), o & /*barPositions*/
      8 && r !== (r = 30 + /*barPositions*/
      i[3].vlow) && f(e, "y2", r);
    },
    d(i) {
      i && ct(e);
    }
  };
}
function eo(t) {
  let e, n, r;
  return {
    c() {
      e = B("line"), f(e, "x1", "40"), f(e, "x2", "90"), f(e, "y1", n = 30 + /*barPositions*/
      t[3].low), f(e, "y2", r = 30 + /*barPositions*/
      t[3].low), f(e, "stroke", "#fff"), f(e, "stroke-width", "1");
    },
    m(i, o) {
      ht(i, e, o);
    },
    p(i, o) {
      o & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      i[3].low) && f(e, "y1", n), o & /*barPositions*/
      8 && r !== (r = 30 + /*barPositions*/
      i[3].low) && f(e, "y2", r);
    },
    d(i) {
      i && ct(e);
    }
  };
}
function no(t) {
  let e, n, r;
  return {
    c() {
      e = B("line"), f(e, "x1", "40"), f(e, "x2", "90"), f(e, "y1", n = 30 + /*barPositions*/
      t[3].targ), f(e, "y2", r = 30 + /*barPositions*/
      t[3].targ), f(e, "stroke", "#fff"), f(e, "stroke-width", "1");
    },
    m(i, o) {
      ht(i, e, o);
    },
    p(i, o) {
      o & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      i[3].targ) && f(e, "y1", n), o & /*barPositions*/
      8 && r !== (r = 30 + /*barPositions*/
      i[3].targ) && f(e, "y2", r);
    },
    d(i) {
      i && ct(e);
    }
  };
}
function ro(t) {
  let e, n, r;
  return {
    c() {
      e = B("line"), f(e, "x1", "40"), f(e, "x2", "90"), f(e, "y1", n = 30 + /*barPositions*/
      t[3].high), f(e, "y2", r = 30 + /*barPositions*/
      t[3].high), f(e, "stroke", "#fff"), f(e, "stroke-width", "1");
    },
    m(i, o) {
      ht(i, e, o);
    },
    p(i, o) {
      o & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      i[3].high) && f(e, "y1", n), o & /*barPositions*/
      8 && r !== (r = 30 + /*barPositions*/
      i[3].high) && f(e, "y2", r);
    },
    d(i) {
      i && ct(e);
    }
  };
}
function gh(t) {
  let e, n, r, i, o, l, s, u, a, h, c, m, g, w, y, C, T, L, A, k, S = (
    /*getRangeText*/
    t[11]("vhigh") + ""
  ), R, U, Y, z, E = Math.round(
    /*pct*/
    t[1].vhigh
  ) + "", v, b, X, D, j, N = ue(
    /*minutes*/
    t[6].vhigh
  ) + "", nt, Tt, dt, kt, vt, Nt, At, _t, Ct, Dt, ge = (
    /*getRangeText*/
    t[11]("high") + ""
  ), xt, d, I, V, M = Math.round(
    /*pct*/
    t[1].high
  ) + "", lt, _, F, x, P, W = ue(
    /*minutes*/
    t[6].high
  ) + "", st, ut, rt, ft, Mt, it, ot, G, bt, Z, et = (
    /*getRangeText*/
    t[11]("targ") + ""
  ), J, $, tt, mt, wt = Math.round(
    /*pct*/
    t[1].targ
  ) + "", pt, $t, Zt, Lt, H, Yt = ue(
    /*minutes*/
    t[6].targ
  ) + "", Rt, Tn, kn, Le, ae, de, Re, Xr, Br, je, ia = (
    /*getRangeText*/
    t[11]("low") + ""
  ), Or, Gr, le, _e, Cn = Math.round(
    /*pct*/
    t[1].low
  ) + "", nr, Zr, Qr, be, $r, Dn = ue(
    /*minutes*/
    t[6].low
  ) + "", rr, Jr, Kr, Nn, Ye, me, Pe, jr, ti, tn, oa = (
    /*getRangeText*/
    t[11]("vlow") + ""
  ), ei, ni, pe, xe, An = Math.round(
    /*pct*/
    t[1].vlow
  ) + "", ir, ri, ii, Me, oi, Sn = ue(
    /*minutes*/
    t[6].vlow
  ) + "", or, ai, Fn, Pt = (
    /*present*/
    t[5] > 0 && Xi(t)
  ), zt = (
    /*pct*/
    t[1].high > 0 && Bi(t)
  ), Ht = (
    /*pct*/
    t[1].targ > 0 && Oi(t)
  ), It = (
    /*pct*/
    t[1].low > 0 && Gi(t)
  ), Wt = (
    /*barHeights*/
    t[4].vlow > 0 && Zi(t)
  ), qt = (
    /*barHeights*/
    t[4].low > 0 && Qi(t)
  ), Vt = (
    /*barHeights*/
    t[4].targ > 0 && $i(t)
  ), Xt = (
    /*barHeights*/
    t[4].high > 0 && Ji(t)
  ), Bt = (
    /*barHeights*/
    t[4].vhigh > 0 && Ki(t)
  ), Ot = (
    /*showSeparators*/
    t[0] && ji(t)
  );
  return {
    c() {
      e = K("div"), n = B("svg"), Pt && Pt.c(), r = B("path"), zt && zt.c(), o = te(), Ht && Ht.c(), l = te(), It && It.c(), s = B("path"), a = B("rect"), Wt && Wt.c(), h = te(), qt && qt.c(), c = te(), Vt && Vt.c(), m = te(), Xt && Xt.c(), g = te(), Bt && Bt.c(), w = te(), Ot && Ot.c(), y = B("g"), C = B("text"), T = B("tspan"), L = q("Very High"), A = at(), k = B("tspan"), R = q(S), U = at(), Y = B("text"), z = B("tspan"), v = q(E), b = q("%"), X = at(), D = B("tspan"), j = q("("), nt = q(N), Tt = q(")"), dt = at(), vt = B("g"), Nt = B("text"), At = B("tspan"), _t = q("High"), Ct = at(), Dt = B("tspan"), xt = q(ge), d = at(), I = B("text"), V = B("tspan"), lt = q(M), _ = q("%"), F = at(), x = B("tspan"), P = q("("), st = q(W), ut = q(")"), rt = at(), Mt = B("g"), it = B("text"), ot = B("tspan"), G = q("Target"), bt = at(), Z = B("tspan"), J = q(et), $ = at(), tt = B("text"), mt = B("tspan"), pt = q(wt), $t = q("%"), Zt = at(), Lt = B("tspan"), H = q("("), Rt = q(Yt), Tn = q(")"), kn = at(), ae = B("g"), de = B("text"), Re = B("tspan"), Xr = q("Low"), Br = at(), je = B("tspan"), Or = q(ia), Gr = at(), le = B("text"), _e = B("tspan"), nr = q(Cn), Zr = q("%"), Qr = at(), be = B("tspan"), $r = q("("), rr = q(Dn), Jr = q(")"), Kr = at(), Ye = B("g"), me = B("text"), Pe = B("tspan"), jr = q("Very Low"), ti = at(), tn = B("tspan"), ei = q(oa), ni = at(), pe = B("text"), xe = B("tspan"), ir = q(An), ri = q("%"), ii = at(), Me = B("tspan"), oi = q("("), or = q(Sn), ai = q(")"), f(r, "d", i = "M 40 " + (30 + /*linePositions*/
      t[2].vhigh) + " L 65 " + (30 + /*linePositions*/
      t[2].vhigh) + " L 65 25 Q 65 15 70 15 L " + jt + " 15"), f(r, "stroke", "#ccc"), f(r, "stroke-width", "1"), f(r, "fill", "none"), f(s, "d", u = "M 40 " + (30 + /*linePositions*/
      t[2].vlow) + " L 65 " + (30 + /*linePositions*/
      t[2].vlow) + " L 65 225 Q 65 230 70 230 L " + jt + " 230"), f(s, "stroke", "#ccc"), f(s, "stroke-width", "1"), f(s, "fill", "none"), f(a, "x", "40"), f(a, "y", "30"), f(a, "width", "50"), f(a, "height", "180"), f(a, "fill", "white"), f(a, "stroke", "#ccc"), f(a, "stroke-width", "1"), f(T, "font-size", "12"), f(T, "font-weight", "bold"), f(T, "fill", "#333"), f(k, "font-size", "10"), f(k, "fill", "#777"), f(C, "x", "103"), f(C, "y", "0"), f(C, "font-family", "Arial, sans-serif"), f(z, "font-size", "12"), f(z, "font-weight", "bold"), f(z, "fill", "#333"), f(D, "font-size", "10"), f(D, "fill", "#777"), f(Y, "x", jt), f(Y, "y", "0"), f(Y, "font-family", "Arial, sans-serif"), f(Y, "text-anchor", "end"), f(y, "transform", kt = "translate(0, " + /*textPositions*/
      (t[7].vhigh - 40) + ")"), f(At, "font-size", "12"), f(At, "font-weight", "bold"), f(At, "fill", "#333"), f(Dt, "font-size", "10"), f(Dt, "fill", "#777"), f(Nt, "x", "103"), f(Nt, "y", "0"), f(Nt, "font-family", "Arial, sans-serif"), f(V, "font-size", "12"), f(V, "font-weight", "bold"), f(V, "fill", "#333"), f(x, "font-size", "10"), f(x, "fill", "#777"), f(I, "x", jt), f(I, "y", "0"), f(I, "font-family", "Arial, sans-serif"), f(I, "text-anchor", "end"), f(vt, "transform", ft = "translate(0, " + /*textPositions*/
      (t[7].high - 40) + ")"), f(ot, "font-size", "12"), f(ot, "font-weight", "bold"), f(ot, "fill", "#333"), f(Z, "font-size", "10"), f(Z, "fill", "#777"), f(it, "x", "103"), f(it, "y", "0"), f(it, "font-family", "Arial, sans-serif"), f(mt, "font-size", "12"), f(mt, "font-weight", "bold"), f(mt, "fill", "#333"), f(Lt, "font-size", "10"), f(Lt, "fill", "#777"), f(tt, "x", jt), f(tt, "y", "0"), f(tt, "font-family", "Arial, sans-serif"), f(tt, "text-anchor", "end"), f(Mt, "transform", Le = "translate(0, " + /*textPositions*/
      (t[7].targ - 40) + ")"), f(Re, "font-size", "12"), f(Re, "font-weight", "bold"), f(Re, "fill", "#333"), f(je, "font-size", "10"), f(je, "fill", "#777"), f(de, "x", "103"), f(de, "y", "0"), f(de, "font-family", "Arial, sans-serif"), f(_e, "font-size", "12"), f(_e, "font-weight", "bold"), f(_e, "fill", "#333"), f(be, "font-size", "10"), f(be, "fill", "#777"), f(le, "x", jt), f(le, "y", "0"), f(le, "font-family", "Arial, sans-serif"), f(le, "text-anchor", "end"), f(ae, "transform", Nn = "translate(0, " + /*textPositions*/
      (t[7].low - 40) + ")"), f(Pe, "font-size", "12"), f(Pe, "font-weight", "bold"), f(Pe, "fill", "#333"), f(tn, "font-size", "10"), f(tn, "fill", "#777"), f(me, "x", "103"), f(me, "y", "0"), f(me, "font-family", "Arial, sans-serif"), f(xe, "font-size", "12"), f(xe, "font-weight", "bold"), f(xe, "fill", "#333"), f(Me, "font-size", "10"), f(Me, "fill", "#777"), f(pe, "x", "340"), f(pe, "y", "0"), f(pe, "font-family", "Arial, sans-serif"), f(pe, "text-anchor", "end"), f(Ye, "transform", Fn = "translate(0, " + /*textPositions*/
      (t[7].vlow - 40) + ")"), f(
        n,
        "width",
        /*svgWidth*/
        t[12]
      ), f(n, "height", io), f(n, "viewBox", "0 0 " + /*svgWidth*/
      t[12] + " " + io), f(n, "class", "svelte-1d3n1f2"), f(e, "class", "widget-container svelte-1d3n1f2");
    },
    m(O, yt) {
      ht(O, e, yt), p(e, n), Pt && Pt.m(n, null), p(n, r), zt && zt.m(n, null), p(n, o), Ht && Ht.m(n, null), p(n, l), It && It.m(n, null), p(n, s), p(n, a), Wt && Wt.m(n, null), p(n, h), qt && qt.m(n, null), p(n, c), Vt && Vt.m(n, null), p(n, m), Xt && Xt.m(n, null), p(n, g), Bt && Bt.m(n, null), p(n, w), Ot && Ot.m(n, null), p(n, y), p(y, C), p(C, T), p(T, L), p(C, A), p(C, k), p(k, R), p(C, U), p(y, Y), p(Y, z), p(z, v), p(z, b), p(Y, X), p(Y, D), p(D, j), p(D, nt), p(D, Tt), p(Y, dt), p(n, vt), p(vt, Nt), p(Nt, At), p(At, _t), p(Nt, Ct), p(Nt, Dt), p(Dt, xt), p(Nt, d), p(vt, I), p(I, V), p(V, lt), p(V, _), p(I, F), p(I, x), p(x, P), p(x, st), p(x, ut), p(I, rt), p(n, Mt), p(Mt, it), p(it, ot), p(ot, G), p(it, bt), p(it, Z), p(Z, J), p(it, $), p(Mt, tt), p(tt, mt), p(mt, pt), p(mt, $t), p(tt, Zt), p(tt, Lt), p(Lt, H), p(Lt, Rt), p(Lt, Tn), p(tt, kn), p(n, ae), p(ae, de), p(de, Re), p(Re, Xr), p(de, Br), p(de, je), p(je, Or), p(de, Gr), p(ae, le), p(le, _e), p(_e, nr), p(_e, Zr), p(le, Qr), p(le, be), p(be, $r), p(be, rr), p(be, Jr), p(le, Kr), p(n, Ye), p(Ye, me), p(me, Pe), p(Pe, jr), p(me, ti), p(me, tn), p(tn, ei), p(me, ni), p(Ye, pe), p(pe, xe), p(xe, ir), p(xe, ri), p(pe, ii), p(pe, Me), p(Me, oi), p(Me, or), p(Me, ai);
    },
    p(O, [yt]) {
      /*present*/
      O[5] > 0 ? Pt ? Pt.p(O, yt) : (Pt = Xi(O), Pt.c(), Pt.m(n, r)) : Pt && (Pt.d(1), Pt = null), yt & /*linePositions*/
      4 && i !== (i = "M 40 " + (30 + /*linePositions*/
      O[2].vhigh) + " L 65 " + (30 + /*linePositions*/
      O[2].vhigh) + " L 65 25 Q 65 15 70 15 L " + jt + " 15") && f(r, "d", i), /*pct*/
      O[1].high > 0 ? zt ? zt.p(O, yt) : (zt = Bi(O), zt.c(), zt.m(n, o)) : zt && (zt.d(1), zt = null), /*pct*/
      O[1].targ > 0 ? Ht ? Ht.p(O, yt) : (Ht = Oi(O), Ht.c(), Ht.m(n, l)) : Ht && (Ht.d(1), Ht = null), /*pct*/
      O[1].low > 0 ? It ? It.p(O, yt) : (It = Gi(O), It.c(), It.m(n, s)) : It && (It.d(1), It = null), yt & /*linePositions*/
      4 && u !== (u = "M 40 " + (30 + /*linePositions*/
      O[2].vlow) + " L 65 " + (30 + /*linePositions*/
      O[2].vlow) + " L 65 225 Q 65 230 70 230 L " + jt + " 230") && f(s, "d", u), /*barHeights*/
      O[4].vlow > 0 ? Wt ? Wt.p(O, yt) : (Wt = Zi(O), Wt.c(), Wt.m(n, h)) : Wt && (Wt.d(1), Wt = null), /*barHeights*/
      O[4].low > 0 ? qt ? qt.p(O, yt) : (qt = Qi(O), qt.c(), qt.m(n, c)) : qt && (qt.d(1), qt = null), /*barHeights*/
      O[4].targ > 0 ? Vt ? Vt.p(O, yt) : (Vt = $i(O), Vt.c(), Vt.m(n, m)) : Vt && (Vt.d(1), Vt = null), /*barHeights*/
      O[4].high > 0 ? Xt ? Xt.p(O, yt) : (Xt = Ji(O), Xt.c(), Xt.m(n, g)) : Xt && (Xt.d(1), Xt = null), /*barHeights*/
      O[4].vhigh > 0 ? Bt ? Bt.p(O, yt) : (Bt = Ki(O), Bt.c(), Bt.m(n, w)) : Bt && (Bt.d(1), Bt = null), /*showSeparators*/
      O[0] ? Ot ? Ot.p(O, yt) : (Ot = ji(O), Ot.c(), Ot.m(n, y)) : Ot && (Ot.d(1), Ot = null), yt & /*pct*/
      2 && E !== (E = Math.round(
        /*pct*/
        O[1].vhigh
      ) + "") && Ft(v, E), yt & /*minutes*/
      64 && N !== (N = ue(
        /*minutes*/
        O[6].vhigh
      ) + "") && Ft(nt, N), yt & /*textPositions*/
      128 && kt !== (kt = "translate(0, " + /*textPositions*/
      (O[7].vhigh - 40) + ")") && f(y, "transform", kt), yt & /*pct*/
      2 && M !== (M = Math.round(
        /*pct*/
        O[1].high
      ) + "") && Ft(lt, M), yt & /*minutes*/
      64 && W !== (W = ue(
        /*minutes*/
        O[6].high
      ) + "") && Ft(st, W), yt & /*textPositions*/
      128 && ft !== (ft = "translate(0, " + /*textPositions*/
      (O[7].high - 40) + ")") && f(vt, "transform", ft), yt & /*pct*/
      2 && wt !== (wt = Math.round(
        /*pct*/
        O[1].targ
      ) + "") && Ft(pt, wt), yt & /*minutes*/
      64 && Yt !== (Yt = ue(
        /*minutes*/
        O[6].targ
      ) + "") && Ft(Rt, Yt), yt & /*textPositions*/
      128 && Le !== (Le = "translate(0, " + /*textPositions*/
      (O[7].targ - 40) + ")") && f(Mt, "transform", Le), yt & /*pct*/
      2 && Cn !== (Cn = Math.round(
        /*pct*/
        O[1].low
      ) + "") && Ft(nr, Cn), yt & /*minutes*/
      64 && Dn !== (Dn = ue(
        /*minutes*/
        O[6].low
      ) + "") && Ft(rr, Dn), yt & /*textPositions*/
      128 && Nn !== (Nn = "translate(0, " + /*textPositions*/
      (O[7].low - 40) + ")") && f(ae, "transform", Nn), yt & /*pct*/
      2 && An !== (An = Math.round(
        /*pct*/
        O[1].vlow
      ) + "") && Ft(ir, An), yt & /*minutes*/
      64 && Sn !== (Sn = ue(
        /*minutes*/
        O[6].vlow
      ) + "") && Ft(or, Sn), yt & /*textPositions*/
      128 && Fn !== (Fn = "translate(0, " + /*textPositions*/
      (O[7].vlow - 40) + ")") && f(Ye, "transform", Fn);
    },
    i: St,
    o: St,
    d(O) {
      O && ct(e), Pt && Pt.d(), zt && zt.d(), Ht && Ht.d(), It && It.d(), Wt && Wt.d(), qt && qt.d(), Vt && Vt.d(), Xt && Xt.d(), Bt && Bt.d(), Ot && Ot.d();
    }
  };
}
const se = 180, io = 240, jt = 340;
function ue(t) {
  const e = Math.floor(t / 60), n = Math.round(t % 60);
  return e === 0 ? `${n}min` : `${e}h${n.toString().padStart(2, "0")}min`;
}
function dh(t, e, n) {
  let r, i, o, l, s;
  const u = uo();
  let { data: a } = e, { range: h = null } = e, { preset: c = "N" } = e, { showSeparators: m = !1 } = e, g, w;
  const y = () => /mmol/i.test((a == null ? void 0 : a.units) || "mmol"), C = () => y() ? c === "T" ? {
    vlow: 3,
    low: 3.9,
    high: 7.8,
    vhigh: 13.9
  } : c === "P" ? {
    vlow: 3,
    low: 3.5,
    high: 7.8,
    vhigh: 13.9
  } : {
    vlow: 3,
    low: 3.9,
    high: 10,
    vhigh: 13.9
  } : c === "T" ? { vlow: 54, low: 70, high: 140, vhigh: 250 } : c === "P" ? { vlow: 54, low: 63, high: 140, vhigh: 250 } : { vlow: 54, low: 70, high: 180, vhigh: 250 };
  let T = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  }, L = 0, A = 0, k = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  };
  function S() {
    if (!a) return;
    const z = new Date(a.t0).getTime();
    n(16, g = Float64Array.from({ length: a.glucose.length }, (E, v) => z + v * a.stepMs)), n(17, w = Float64Array.from(a.glucose));
  }
  function R() {
    try {
      u("stats", {
        pct: T,
        present: L,
        expected: A,
        preset: c,
        units: (a == null ? void 0 : a.units) || "mmol/L"
      });
    } catch {
    }
  }
  function U(z) {
    const E = C(), v = y() ? "mmol/L" : "mg/dL";
    return z === "vhigh" ? `>${y() ? E.vhigh.toFixed(1) : Math.round(E.vhigh)} ${v}` : z === "high" ? `${y() ? (E.high + 0.1).toFixed(1) : Math.round(E.high) + 1}-${y() ? E.vhigh.toFixed(1) : Math.round(E.vhigh)} ${v}` : z === "targ" ? `${y() ? E.low.toFixed(1) : Math.round(E.low)}-${y() ? E.high.toFixed(1) : Math.round(E.high)} ${v}` : z === "low" ? `${y() ? E.vlow.toFixed(1) : Math.round(E.vlow)}-${y() ? (E.low - 0.1).toFixed(1) : Math.round(E.low) - 1} ${v}` : z === "vlow" ? `<${y() ? E.vlow.toFixed(1) : Math.round(E.vlow)} ${v}` : "";
  }
  const Y = jt + 10;
  return t.$$set = (z) => {
    "data" in z && n(13, a = z.data), "range" in z && n(14, h = z.range), "preset" in z && n(15, c = z.preset), "showSeparators" in z && n(0, m = z.showSeparators);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*data*/
    8192 && a && S(), t.$$.dirty & /*data, range, time, values, preset*/
    253952 && a && h && g && w && c) {
      const { start: z, end: E } = h, v = Math.max(0, Math.ceil((z - g[0]) / a.stepMs)), b = Math.min(w.length - 1, Math.floor((E - g[0]) / a.stepMs));
      if (b < v)
        n(1, T = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }), n(5, L = 0), A = 0, n(6, k = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        });
      else {
        const X = C();
        let D = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, j = 0;
        for (let N = v; N <= b; N++) {
          const nt = w[N];
          Number.isFinite(nt) && nt >= 0 && (j++, nt < X.vlow ? D.vlow++ : nt < X.low ? D.low++ : nt <= X.high ? D.targ++ : nt <= X.vhigh ? D.high++ : D.vhigh++);
        }
        if (n(5, L = j), A = Math.max(1, b - v + 1), j === 0)
          n(1, T = {
            vlow: 0,
            low: 0,
            targ: 0,
            high: 0,
            vhigh: 0
          }), n(6, k = {
            vlow: 0,
            low: 0,
            targ: 0,
            high: 0,
            vhigh: 0
          });
        else {
          n(1, T = {
            vlow: D.vlow / j * 100,
            low: D.low / j * 100,
            targ: D.targ / j * 100,
            high: D.high / j * 100,
            vhigh: D.vhigh / j * 100
          });
          const N = 24 * 60;
          n(6, k = {
            vlow: D.vlow / j * N,
            low: D.low / j * N,
            targ: D.targ / j * N,
            high: D.high / j * N,
            vhigh: D.vhigh / j * N
          });
        }
      }
      R();
    }
    t.$$.dirty & /*pct*/
    2 && n(4, r = {
      vhigh: T.vhigh / 100 * se,
      high: T.high / 100 * se,
      targ: T.targ / 100 * se,
      low: T.low / 100 * se,
      vlow: T.vlow / 100 * se
    }), t.$$.dirty & /*barHeights*/
    16 && n(3, i = {
      vlow: se - r.vlow,
      low: se - r.vlow - r.low,
      targ: se - r.vlow - r.low - r.targ,
      high: se - r.vlow - r.low - r.targ - r.high,
      vhigh: se - r.vlow - r.low - r.targ - r.high - r.vhigh
    }), t.$$.dirty & /*barPositions, barHeights*/
    24 && n(2, o = {
      vhigh: i.vhigh + r.vhigh / 2,
      high: i.high + r.high / 2,
      targ: i.targ + r.targ / 2,
      low: i.low + r.low / 2,
      vlow: i.vlow + r.vlow / 2
    }), t.$$.dirty & /*barPositions*/
    8 && n(8, l = {
      low: i.vlow,
      // Boundary between vlow and low sections
      high: i.targ,
      // Boundary between target and high sections
      vhigh: i.high
      // Boundary between high and vhigh sections
    }), t.$$.dirty & /*pct, linePositions*/
    6 && n(7, s = {
      vhigh: 55,
      // Fixed at top
      high: T.high > 0 ? 70 + o.high : 105,
      targ: T.targ > 0 ? 70 + o.targ : 181,
      low: T.low > 0 ? 70 + o.low : 242,
      vlow: 270
      // Fixed at bottom
    });
  }, [
    m,
    T,
    o,
    i,
    r,
    L,
    k,
    s,
    l,
    y,
    C,
    U,
    Y,
    a,
    h,
    c,
    g,
    w
  ];
}
class mh extends Ke {
  constructor(e) {
    super(), Je(this, e, dh, gh, $e, {
      data: 13,
      range: 14,
      preset: 15,
      showSeparators: 0
    });
  }
}
function oo(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  const i = new Gc({ target: r, props: { data: e, initialRange: n.initialRange ?? null, externalRange: null, preset: n.preset || "N", showMonthLabels: n.monthLabels ?? !0, showData: n.dataVisible ?? !0, showCanvas: n.canvasVisible ?? !0 } }), o = /* @__PURE__ */ new Map();
  let l = n.initialRange ?? null;
  function s(w, y) {
    const C = o.get(w) || [];
    C.push(y), o.set(w, C);
  }
  i.$on("rangechange", (w) => {
    var C;
    const y = w.detail;
    l = { start: y.start, end: y.end }, (C = o.get("rangechange")) == null || C.forEach((T) => T(y));
  }), i.$on("ready", (w) => {
    var C;
    const y = w.detail;
    l = { start: y.start, end: y.end }, (C = o.get("ready")) == null || C.forEach((T) => T(y));
  });
  function u(w, y) {
    if (typeof w == "number" && typeof y == "number") i.$set({ externalRange: { start: w, end: y } });
    else if (w && typeof w.start == "number" && typeof w.end == "number") i.$set({ externalRange: { start: w.start, end: w.end } });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function a() {
    return l;
  }
  function h(w) {
    i.$set({ preset: w });
  }
  function c(w) {
    i.$set({ showData: !!w });
  }
  function m(w) {
    i.$set({ showMonthLabels: !!w });
  }
  function g(w) {
    i.$set({ showCanvas: !!w });
  }
  return { on: s, setRange: u, getRange: a, setPreset: h, setDataVisible: c, setMonthLabels: m, setCanvasVisible: g, destroy: () => i.$destroy() };
}
typeof window < "u" && (window.createTirCalendar = oo, window.createCgmTir = oo);
function ph(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = new $c({ target: r, props: { data: e, range: i, preset: n.preset || "N" } });
  function l(a, h) {
    if (typeof a == "number" && typeof h == "number") o.$set({ range: { start: a, end: h } });
    else if (a && typeof a.start == "number" && typeof a.end == "number") o.$set({ range: a });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function s(a) {
    o.$set({ data: a });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: a, end: h }) => l({ start: a, end: h })), n.source.on("ready", ({ start: a, end: h }) => l({ start: a, end: h })), typeof n.source.getRange == "function")) {
    const a = n.source.getRange();
    a && typeof a.start == "number" && typeof a.end == "number" && l(a);
  }
  function u(a) {
    o.$set({ preset: a });
  }
  return { setRange: l, setData: s, setPreset: u, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmSummary = ph);
function wh(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = new ah({ target: r, props: { data: e, range: i, preset: n.preset || "N" } }), l = /* @__PURE__ */ new Map();
  let s = null;
  function u(g, w) {
    const y = l.get(g) || [];
    y.push(w), l.set(g, y);
  }
  o.$on("stats", (g) => {
    var y;
    const w = g.detail;
    s = w, (y = l.get("stats")) == null || y.forEach((C) => C(w));
  });
  function a(g, w) {
    if (typeof g == "number" && typeof w == "number") o.$set({ range: { start: g, end: w } });
    else if (g && typeof g.start == "number" && typeof g.end == "number") o.$set({ range: g });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function h(g) {
    o.$set({ data: g });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: g, end: w }) => a({ start: g, end: w })), n.source.on("ready", ({ start: g, end: w }) => a({ start: g, end: w })), typeof n.source.getRange == "function")) {
    const g = n.source.getRange();
    g && typeof g.start == "number" && typeof g.end == "number" && a(g);
  }
  function c(g) {
    o.$set({ preset: g });
  }
  function m() {
    return s;
  }
  return { on: u, setRange: a, setData: h, setPreset: c, getStats: m, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmTir = wh);
function yh(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = new uh({ target: r, props: { data: e, range: i, preset: n.preset || "N" } });
  function l(a, h) {
    if (typeof a == "number" && typeof h == "number") o.$set({ range: { start: a, end: h } });
    else if (a && typeof a.start == "number" && typeof a.end == "number") o.$set({ range: a });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function s(a) {
    o.$set({ data: a });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: a, end: h }) => l({ start: a, end: h })), n.source.on("ready", ({ start: a, end: h }) => l({ start: a, end: h })), typeof n.source.getRange == "function")) {
    const a = n.source.getRange();
    a && typeof a.start == "number" && typeof a.end == "number" && l(a);
  }
  function u(a) {
    o.$set({ preset: a });
  }
  return { setRange: l, setData: s, setPreset: u, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmAgp = yh);
function vh(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = new hh({ target: r, props: { data: e, range: i, preset: n.preset || "N" } });
  function l(a, h) {
    if (typeof a == "number" && typeof h == "number") o.$set({ range: { start: a, end: h } });
    else if (a && typeof a.start == "number" && typeof a.end == "number") o.$set({ range: a });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function s(a) {
    o.$set({ data: a });
  }
  function u(a) {
    o.$set({ preset: a });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: a, end: h }) => l({ start: a, end: h })), n.source.on("ready", ({ start: a, end: h }) => l({ start: a, end: h })), typeof n.source.getRange == "function")) {
    const a = n.source.getRange();
    a && typeof a.start == "number" && typeof a.end == "number" && l(a);
  }
  return { setRange: l, setData: s, setPreset: u, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmStrips = vh);
function _h(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = new mh({ target: r, props: { data: e, range: i, preset: n.preset || "N" } }), l = /* @__PURE__ */ new Map();
  let s = null;
  function u(g, w) {
    const y = l.get(g) || [];
    y.push(w), l.set(g, y);
  }
  o.$on("stats", (g) => {
    var y;
    const w = g.detail;
    s = w, (y = l.get("stats")) == null || y.forEach((C) => C(w));
  });
  function a(g, w) {
    if (typeof g == "number" && typeof w == "number") o.$set({ range: { start: g, end: w } });
    else if (g && typeof g.start == "number" && typeof g.end == "number") o.$set({ range: g });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function h(g) {
    o.$set({ data: g });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: g, end: w }) => a({ start: g, end: w })), n.source.on("ready", ({ start: g, end: w }) => a({ start: g, end: w })), typeof n.source.getRange == "function")) {
    const g = n.source.getRange();
    g && typeof g.start == "number" && typeof g.end == "number" && a(g);
  }
  function c(g) {
    o.$set({ preset: g });
  }
  function m() {
    return s;
  }
  return { on: u, setRange: a, setData: h, setPreset: c, getStats: m, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmTirDetailed = _h);
export {
  yh as createCgmAgp,
  vh as createCgmStrips,
  ph as createCgmSummary,
  wh as createCgmTir,
  _h as createCgmTirDetailed,
  oo as createTirCalendar
};

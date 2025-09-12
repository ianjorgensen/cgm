var dl = Object.defineProperty;
var ml = (t, e, n) => e in t ? dl(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var bi = (t, e, n) => ml(t, typeof e != "symbol" ? e + "" : e, n);
function kt() {
}
function vo(t) {
  return t();
}
function br() {
  return /* @__PURE__ */ Object.create(null);
}
function zn(t) {
  t.forEach(vo);
}
function wo(t) {
  return typeof t == "function";
}
function re(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function vl(t) {
  return Object.keys(t).length === 0;
}
function ae(t) {
  return t ?? "";
}
function h(t, e) {
  t.appendChild(e);
}
function Lt(t, e, n) {
  t.insertBefore(e, n || null);
}
function Rt(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function q(t) {
  return document.createElement(t);
}
function O(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function H(t) {
  return document.createTextNode(t);
}
function et() {
  return H(" ");
}
function ze() {
  return H("");
}
function Pe(t, e, n, i) {
  return t.addEventListener(e, n, i), () => t.removeEventListener(e, n, i);
}
function u(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function wl(t) {
  return Array.from(t.childNodes);
}
function Ct(t, e) {
  e = "" + e, t.data !== e && (t.data = /** @type {string} */
  e);
}
function j(t, e, n, i) {
  n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, "");
}
function pl(t, e, { bubbles: n = !1, cancelable: i = !1 } = {}) {
  return new CustomEvent(t, { detail: e, bubbles: n, cancelable: i });
}
let Rn;
function Fn(t) {
  Rn = t;
}
function po() {
  if (!Rn) throw new Error("Function called outside component initialization");
  return Rn;
}
function Te(t) {
  po().$$.on_mount.push(t);
}
function hn() {
  const t = po();
  return (e, n, { cancelable: i = !1 } = {}) => {
    const r = t.$$.callbacks[e];
    if (r) {
      const o = pl(
        /** @type {string} */
        e,
        n,
        { cancelable: i }
      );
      return r.slice().forEach((s) => {
        s.call(t, o);
      }), !o.defaultPrevented;
    }
    return !0;
  };
}
const tn = [], Me = [];
let nn = [];
const Mr = [], yl = /* @__PURE__ */ Promise.resolve();
let Li = !1;
function _l() {
  Li || (Li = !0, yl.then(yo));
}
function Ui(t) {
  nn.push(t);
}
const Mi = /* @__PURE__ */ new Set();
let Ke = 0;
function yo() {
  if (Ke !== 0)
    return;
  const t = Rn;
  do {
    try {
      for (; Ke < tn.length; ) {
        const e = tn[Ke];
        Ke++, Fn(e), xl(e.$$);
      }
    } catch (e) {
      throw tn.length = 0, Ke = 0, e;
    }
    for (Fn(null), tn.length = 0, Ke = 0; Me.length; ) Me.pop()();
    for (let e = 0; e < nn.length; e += 1) {
      const n = nn[e];
      Mi.has(n) || (Mi.add(n), n());
    }
    nn.length = 0;
  } while (tn.length);
  for (; Mr.length; )
    Mr.pop()();
  Li = !1, Mi.clear(), Fn(t);
}
function xl(t) {
  if (t.fragment !== null) {
    t.update(), zn(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(Ui);
  }
}
function bl(t) {
  const e = [], n = [];
  nn.forEach((i) => t.indexOf(i) === -1 ? e.push(i) : n.push(i)), n.forEach((i) => i()), nn = e;
}
const Ml = /* @__PURE__ */ new Set();
function Tl(t, e) {
  t && t.i && (Ml.delete(t), t.i(e));
}
function kl(t, e, n) {
  const { fragment: i, after_update: r } = t.$$;
  i && i.m(e, n), Ui(() => {
    const o = t.$$.on_mount.map(vo).filter(wo);
    t.$$.on_destroy ? t.$$.on_destroy.push(...o) : zn(o), t.$$.on_mount = [];
  }), r.forEach(Ui);
}
function Cl(t, e) {
  const n = t.$$;
  n.fragment !== null && (bl(n.after_update), zn(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function Al(t, e) {
  t.$$.dirty[0] === -1 && (tn.push(t), _l(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function oe(t, e, n, i, r, o, s = null, f = [-1]) {
  const a = Rn;
  Fn(t);
  const l = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: o,
    update: kt,
    not_equal: r,
    bound: br(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (a ? a.$$.context : [])),
    // everything else
    callbacks: br(),
    dirty: f,
    skip_bound: !1,
    root: e.target || a.$$.root
  };
  s && s(l.root);
  let d = !1;
  if (l.ctx = n ? n(t, e.props || {}, (c, m, ...g) => {
    const v = g.length ? g[0] : m;
    return l.ctx && r(l.ctx[c], l.ctx[c] = v) && (!l.skip_bound && l.bound[c] && l.bound[c](v), d && Al(t, c)), m;
  }) : [], l.update(), d = !0, zn(l.before_update), l.fragment = i ? i(l.ctx) : !1, e.target) {
    if (e.hydrate) {
      const c = wl(e.target);
      l.fragment && l.fragment.l(c), c.forEach(Rt);
    } else
      l.fragment && l.fragment.c();
    e.intro && Tl(t.$$.fragment), kl(t, e.target, e.anchor), yo();
  }
  Fn(a);
}
class le {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    bi(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    bi(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    Cl(this, 1), this.$destroy = kt;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, n) {
    if (!wo(n))
      return kt;
    const i = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return i.push(n), () => {
      const r = i.indexOf(n);
      r !== -1 && i.splice(r, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(e) {
    this.$$set && !vl(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const Nl = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(Nl);
function Kn(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Dl(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function _o(t) {
  let e, n, i;
  t.length !== 2 ? (e = Kn, n = (f, a) => Kn(t(f), a), i = (f, a) => t(f) - a) : (e = t === Kn || t === Dl ? t : Fl, n = t, i = t);
  function r(f, a, l = 0, d = f.length) {
    if (l < d) {
      if (e(a, a) !== 0) return d;
      do {
        const c = l + d >>> 1;
        n(f[c], a) < 0 ? l = c + 1 : d = c;
      } while (l < d);
    }
    return l;
  }
  function o(f, a, l = 0, d = f.length) {
    if (l < d) {
      if (e(a, a) !== 0) return d;
      do {
        const c = l + d >>> 1;
        n(f[c], a) <= 0 ? l = c + 1 : d = c;
      } while (l < d);
    }
    return l;
  }
  function s(f, a, l = 0, d = f.length) {
    const c = r(f, a, l, d - 1);
    return c > l && i(f[c - 1], a) > -i(f[c], a) ? c - 1 : c;
  }
  return { left: r, center: s, right: o };
}
function Fl() {
  return 0;
}
function Sl(t) {
  return t === null ? NaN : +t;
}
const El = _o(Kn), Rl = El.right;
_o(Sl).center;
function Ll(t, e) {
  let n = 0, i, r = 0, o = 0;
  for (let s of t)
    s != null && (s = +s) >= s && (i = s - r, r += i / ++n, o += i * (s - r));
  if (n > 1) return o / (n - 1);
}
const Ul = Math.sqrt(50), Hl = Math.sqrt(10), Pl = Math.sqrt(2);
function ni(t, e, n) {
  const i = (e - t) / Math.max(0, n), r = Math.floor(Math.log10(i)), o = i / Math.pow(10, r), s = o >= Ul ? 10 : o >= Hl ? 5 : o >= Pl ? 2 : 1;
  let f, a, l;
  return r < 0 ? (l = Math.pow(10, -r) / s, f = Math.round(t * l), a = Math.round(e * l), f / l < t && ++f, a / l > e && --a, l = -l) : (l = Math.pow(10, r) * s, f = Math.round(t / l), a = Math.round(e / l), f * l < t && ++f, a * l > e && --a), a < f && 0.5 <= n && n < 2 ? ni(t, e, n * 2) : [f, a, l];
}
function zl(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const i = e < t, [r, o, s] = i ? ni(e, t, n) : ni(t, e, n);
  if (!(o >= r)) return [];
  const f = o - r + 1, a = new Array(f);
  if (i)
    if (s < 0) for (let l = 0; l < f; ++l) a[l] = (o - l) / -s;
    else for (let l = 0; l < f; ++l) a[l] = (o - l) * s;
  else if (s < 0) for (let l = 0; l < f; ++l) a[l] = (r + l) / -s;
  else for (let l = 0; l < f; ++l) a[l] = (r + l) * s;
  return a;
}
function Hi(t, e, n) {
  return e = +e, t = +t, n = +n, ni(t, e, n)[2];
}
function Yl(t, e, n) {
  e = +e, t = +t, n = +n;
  const i = e < t, r = i ? Hi(e, t, n) : Hi(t, e, n);
  return (i ? -1 : 1) * (r < 0 ? 1 / -r : r);
}
function ql(t, e) {
  let n = 0, i = 0;
  for (let r of t)
    r != null && (r = +r) >= r && (++n, i += r);
  if (n) return i / n;
}
function Pi(t, e, n) {
  t = +t, e = +e, n = (r = arguments.length) < 2 ? (e = t, t = 0, 1) : r < 3 ? 1 : +n;
  for (var i = -1, r = Math.max(0, Math.ceil((e - t) / n)) | 0, o = new Array(r); ++i < r; )
    o[i] = t + i * n;
  return o;
}
function Il(t) {
  return t;
}
var Ti = 1, ki = 2, zi = 3, Cn = 4, Tr = 1e-6;
function Vl(t) {
  return "translate(" + t + ",0)";
}
function Wl(t) {
  return "translate(0," + t + ")";
}
function Bl(t) {
  return (e) => +t(e);
}
function Xl(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function Gl() {
  return !this.__axis;
}
function xo(t, e) {
  var n = [], i = null, r = null, o = 6, s = 6, f = 3, a = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, l = t === Ti || t === Cn ? -1 : 1, d = t === Cn || t === ki ? "x" : "y", c = t === Ti || t === zi ? Vl : Wl;
  function m(g) {
    var v = i ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), p = r ?? (e.tickFormat ? e.tickFormat.apply(e, n) : Il), C = Math.max(o, 0) + f, E = e.range(), k = +E[0] + a, y = +E[E.length - 1] + a, _ = (e.bandwidth ? Xl : Bl)(e.copy(), a), S = g.selection ? g.selection() : g, U = S.selectAll(".domain").data([null]), R = S.selectAll(".tick").data(v, e).order(), T = R.exit(), M = R.enter().append("g").attr("class", "tick"), A = R.select("line"), w = R.select("text");
    U = U.merge(U.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), R = R.merge(M), A = A.merge(M.append("line").attr("stroke", "currentColor").attr(d + "2", l * o)), w = w.merge(M.append("text").attr("fill", "currentColor").attr(d, l * C).attr("dy", t === Ti ? "0em" : t === zi ? "0.71em" : "0.32em")), g !== S && (U = U.transition(g), R = R.transition(g), A = A.transition(g), w = w.transition(g), T = T.transition(g).attr("opacity", Tr).attr("transform", function(D) {
      return isFinite(D = _(D)) ? c(D + a) : this.getAttribute("transform");
    }), M.attr("opacity", Tr).attr("transform", function(D) {
      var x = this.parentNode.__axis;
      return c((x && isFinite(x = x(D)) ? x : _(D)) + a);
    })), T.remove(), U.attr("d", t === Cn || t === ki ? s ? "M" + l * s + "," + k + "H" + a + "V" + y + "H" + l * s : "M" + a + "," + k + "V" + y : s ? "M" + k + "," + l * s + "V" + a + "H" + y + "V" + l * s : "M" + k + "," + a + "H" + y), R.attr("opacity", 1).attr("transform", function(D) {
      return c(_(D) + a);
    }), A.attr(d + "2", l * o), w.attr(d, l * C).text(p), S.filter(Gl).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === ki ? "start" : t === Cn ? "end" : "middle"), S.each(function() {
      this.__axis = _;
    });
  }
  return m.scale = function(g) {
    return arguments.length ? (e = g, m) : e;
  }, m.ticks = function() {
    return n = Array.from(arguments), m;
  }, m.tickArguments = function(g) {
    return arguments.length ? (n = g == null ? [] : Array.from(g), m) : n.slice();
  }, m.tickValues = function(g) {
    return arguments.length ? (i = g == null ? null : Array.from(g), m) : i && i.slice();
  }, m.tickFormat = function(g) {
    return arguments.length ? (r = g, m) : r;
  }, m.tickSize = function(g) {
    return arguments.length ? (o = s = +g, m) : o;
  }, m.tickSizeInner = function(g) {
    return arguments.length ? (o = +g, m) : o;
  }, m.tickSizeOuter = function(g) {
    return arguments.length ? (s = +g, m) : s;
  }, m.tickPadding = function(g) {
    return arguments.length ? (f = +g, m) : f;
  }, m.offset = function(g) {
    return arguments.length ? (a = +g, m) : a;
  }, m;
}
function Zl(t) {
  return xo(zi, t);
}
function Ql(t) {
  return xo(Cn, t);
}
var Ol = { value: () => {
} };
function bo() {
  for (var t = 0, e = arguments.length, n = {}, i; t < e; ++t) {
    if (!(i = arguments[t] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new jn(n);
}
function jn(t) {
  this._ = t;
}
function Jl(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
jn.prototype = bo.prototype = {
  constructor: jn,
  on: function(t, e) {
    var n = this._, i = Jl(t + "", n), r, o = -1, s = i.length;
    if (arguments.length < 2) {
      for (; ++o < s; ) if ((r = (t = i[o]).type) && (r = $l(n[r], t.name))) return r;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (r = (t = i[o]).type) n[r] = kr(n[r], t.name, e);
      else if (e == null) for (r in n) n[r] = kr(n[r], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new jn(t);
  },
  call: function(t, e) {
    if ((r = arguments.length - 2) > 0) for (var n = new Array(r), i = 0, r, o; i < r; ++i) n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], i = 0, r = o.length; i < r; ++i) o[i].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var i = this._[t], r = 0, o = i.length; r < o; ++r) i[r].value.apply(e, n);
  }
};
function $l(t, e) {
  for (var n = 0, i = t.length, r; n < i; ++n)
    if ((r = t[n]).name === e)
      return r.value;
}
function kr(t, e, n) {
  for (var i = 0, r = t.length; i < r; ++i)
    if (t[i].name === e) {
      t[i] = Ol, t = t.slice(0, i).concat(t.slice(i + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Yi = "http://www.w3.org/1999/xhtml";
const Cr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Yi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function mi(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Cr.hasOwnProperty(e) ? { space: Cr[e], local: t } : t;
}
function Kl(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Yi && e.documentElement.namespaceURI === Yi ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function jl(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Mo(t) {
  var e = mi(t);
  return (e.local ? jl : Kl)(e);
}
function ta() {
}
function Oi(t) {
  return t == null ? ta : function() {
    return this.querySelector(t);
  };
}
function ea(t) {
  typeof t != "function" && (t = Oi(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = e[r], s = o.length, f = i[r] = new Array(s), a, l, d = 0; d < s; ++d)
      (a = o[d]) && (l = t.call(a, a.__data__, d, o)) && ("__data__" in a && (l.__data__ = a.__data__), f[d] = l);
  return new ie(i, this._parents);
}
function na(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ia() {
  return [];
}
function To(t) {
  return t == null ? ia : function() {
    return this.querySelectorAll(t);
  };
}
function ra(t) {
  return function() {
    return na(t.apply(this, arguments));
  };
}
function oa(t) {
  typeof t == "function" ? t = ra(t) : t = To(t);
  for (var e = this._groups, n = e.length, i = [], r = [], o = 0; o < n; ++o)
    for (var s = e[o], f = s.length, a, l = 0; l < f; ++l)
      (a = s[l]) && (i.push(t.call(a, a.__data__, l, s)), r.push(a));
  return new ie(i, r);
}
function ko(t) {
  return function() {
    return this.matches(t);
  };
}
function Co(t) {
  return function(e) {
    return e.matches(t);
  };
}
var la = Array.prototype.find;
function aa(t) {
  return function() {
    return la.call(this.children, t);
  };
}
function sa() {
  return this.firstElementChild;
}
function ua(t) {
  return this.select(t == null ? sa : aa(typeof t == "function" ? t : Co(t)));
}
var fa = Array.prototype.filter;
function ha() {
  return Array.from(this.children);
}
function ca(t) {
  return function() {
    return fa.call(this.children, t);
  };
}
function ga(t) {
  return this.selectAll(t == null ? ha : ca(typeof t == "function" ? t : Co(t)));
}
function da(t) {
  typeof t != "function" && (t = ko(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = e[r], s = o.length, f = i[r] = [], a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && f.push(a);
  return new ie(i, this._parents);
}
function Ao(t) {
  return new Array(t.length);
}
function ma() {
  return new ie(this._enter || this._groups.map(Ao), this._parents);
}
function ii(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
ii.prototype = {
  constructor: ii,
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
function va(t) {
  return function() {
    return t;
  };
}
function wa(t, e, n, i, r, o) {
  for (var s = 0, f, a = e.length, l = o.length; s < l; ++s)
    (f = e[s]) ? (f.__data__ = o[s], i[s] = f) : n[s] = new ii(t, o[s]);
  for (; s < a; ++s)
    (f = e[s]) && (r[s] = f);
}
function pa(t, e, n, i, r, o, s) {
  var f, a, l = /* @__PURE__ */ new Map(), d = e.length, c = o.length, m = new Array(d), g;
  for (f = 0; f < d; ++f)
    (a = e[f]) && (m[f] = g = s.call(a, a.__data__, f, e) + "", l.has(g) ? r[f] = a : l.set(g, a));
  for (f = 0; f < c; ++f)
    g = s.call(t, o[f], f, o) + "", (a = l.get(g)) ? (i[f] = a, a.__data__ = o[f], l.delete(g)) : n[f] = new ii(t, o[f]);
  for (f = 0; f < d; ++f)
    (a = e[f]) && l.get(m[f]) === a && (r[f] = a);
}
function ya(t) {
  return t.__data__;
}
function _a(t, e) {
  if (!arguments.length) return Array.from(this, ya);
  var n = e ? pa : wa, i = this._parents, r = this._groups;
  typeof t != "function" && (t = va(t));
  for (var o = r.length, s = new Array(o), f = new Array(o), a = new Array(o), l = 0; l < o; ++l) {
    var d = i[l], c = r[l], m = c.length, g = xa(t.call(d, d && d.__data__, l, i)), v = g.length, p = f[l] = new Array(v), C = s[l] = new Array(v), E = a[l] = new Array(m);
    n(d, c, p, C, E, g, e);
    for (var k = 0, y = 0, _, S; k < v; ++k)
      if (_ = p[k]) {
        for (k >= y && (y = k + 1); !(S = C[y]) && ++y < v; ) ;
        _._next = S || null;
      }
  }
  return s = new ie(s, i), s._enter = f, s._exit = a, s;
}
function xa(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ba() {
  return new ie(this._exit || this._groups.map(Ao), this._parents);
}
function Ma(t, e, n) {
  var i = this.enter(), r = this, o = this.exit();
  return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), e != null && (r = e(r), r && (r = r.selection())), n == null ? o.remove() : n(o), i && r ? i.merge(r).order() : r;
}
function Ta(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, i = e._groups, r = n.length, o = i.length, s = Math.min(r, o), f = new Array(r), a = 0; a < s; ++a)
    for (var l = n[a], d = i[a], c = l.length, m = f[a] = new Array(c), g, v = 0; v < c; ++v)
      (g = l[v] || d[v]) && (m[v] = g);
  for (; a < r; ++a)
    f[a] = n[a];
  return new ie(f, this._parents);
}
function ka() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], r = i.length - 1, o = i[r], s; --r >= 0; )
      (s = i[r]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function Ca(t) {
  t || (t = Aa);
  function e(c, m) {
    return c && m ? t(c.__data__, m.__data__) : !c - !m;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), o = 0; o < i; ++o) {
    for (var s = n[o], f = s.length, a = r[o] = new Array(f), l, d = 0; d < f; ++d)
      (l = s[d]) && (a[d] = l);
    a.sort(e);
  }
  return new ie(r, this._parents).order();
}
function Aa(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Na() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Da() {
  return Array.from(this);
}
function Fa() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, o = i.length; r < o; ++r) {
      var s = i[r];
      if (s) return s;
    }
  return null;
}
function Sa() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Ea() {
  return !this.node();
}
function Ra(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var r = e[n], o = 0, s = r.length, f; o < s; ++o)
      (f = r[o]) && t.call(f, f.__data__, o, r);
  return this;
}
function La(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ua(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ha(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Pa(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function za(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Ya(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function qa(t, e) {
  var n = mi(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Ua : La : typeof e == "function" ? n.local ? Ya : za : n.local ? Pa : Ha)(n, e));
}
function No(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Ia(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Va(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Wa(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function Ba(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Ia : typeof e == "function" ? Wa : Va)(t, e, n ?? "")) : on(this.node(), t);
}
function on(t, e) {
  return t.style.getPropertyValue(e) || No(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Xa(t) {
  return function() {
    delete this[t];
  };
}
function Ga(t, e) {
  return function() {
    this[t] = e;
  };
}
function Za(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Qa(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Xa : typeof e == "function" ? Za : Ga)(t, e)) : this.node()[t];
}
function Do(t) {
  return t.trim().split(/^|\s+/);
}
function Ji(t) {
  return t.classList || new Fo(t);
}
function Fo(t) {
  this._node = t, this._names = Do(t.getAttribute("class") || "");
}
Fo.prototype = {
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
function So(t, e) {
  for (var n = Ji(t), i = -1, r = e.length; ++i < r; ) n.add(e[i]);
}
function Eo(t, e) {
  for (var n = Ji(t), i = -1, r = e.length; ++i < r; ) n.remove(e[i]);
}
function Oa(t) {
  return function() {
    So(this, t);
  };
}
function Ja(t) {
  return function() {
    Eo(this, t);
  };
}
function $a(t, e) {
  return function() {
    (e.apply(this, arguments) ? So : Eo)(this, t);
  };
}
function Ka(t, e) {
  var n = Do(t + "");
  if (arguments.length < 2) {
    for (var i = Ji(this.node()), r = -1, o = n.length; ++r < o; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? $a : e ? Oa : Ja)(n, e));
}
function ja() {
  this.textContent = "";
}
function ts(t) {
  return function() {
    this.textContent = t;
  };
}
function es(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function ns(t) {
  return arguments.length ? this.each(t == null ? ja : (typeof t == "function" ? es : ts)(t)) : this.node().textContent;
}
function is() {
  this.innerHTML = "";
}
function rs(t) {
  return function() {
    this.innerHTML = t;
  };
}
function os(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function ls(t) {
  return arguments.length ? this.each(t == null ? is : (typeof t == "function" ? os : rs)(t)) : this.node().innerHTML;
}
function as() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ss() {
  return this.each(as);
}
function us() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function fs() {
  return this.each(us);
}
function hs(t) {
  var e = typeof t == "function" ? t : Mo(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function cs() {
  return null;
}
function gs(t, e) {
  var n = typeof t == "function" ? t : Mo(t), i = e == null ? cs : typeof e == "function" ? e : Oi(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function ds() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function ms() {
  return this.each(ds);
}
function vs() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function ws() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function ps(t) {
  return this.select(t ? ws : vs);
}
function ys(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function _s(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function xs(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function bs(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, r = e.length, o; n < r; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++i] = o;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function Ms(t, e, n) {
  return function() {
    var i = this.__on, r, o = _s(e);
    if (i) {
      for (var s = 0, f = i.length; s < f; ++s)
        if ((r = i[s]).type === t.type && r.name === t.name) {
          this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = o, r.options = n), r.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, n), r = { type: t.type, name: t.name, value: e, listener: o, options: n }, i ? i.push(r) : this.__on = [r];
  };
}
function Ts(t, e, n) {
  var i = xs(t + ""), r, o = i.length, s;
  if (arguments.length < 2) {
    var f = this.node().__on;
    if (f) {
      for (var a = 0, l = f.length, d; a < l; ++a)
        for (r = 0, d = f[a]; r < o; ++r)
          if ((s = i[r]).type === d.type && s.name === d.name)
            return d.value;
    }
    return;
  }
  for (f = e ? Ms : bs, r = 0; r < o; ++r) this.each(f(i[r], e, n));
  return this;
}
function Ro(t, e, n) {
  var i = No(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r);
}
function ks(t, e) {
  return function() {
    return Ro(this, t, e);
  };
}
function Cs(t, e) {
  return function() {
    return Ro(this, t, e.apply(this, arguments));
  };
}
function As(t, e) {
  return this.each((typeof e == "function" ? Cs : ks)(t, e));
}
function* Ns() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, o = i.length, s; r < o; ++r)
      (s = i[r]) && (yield s);
}
var Lo = [null];
function ie(t, e) {
  this._groups = t, this._parents = e;
}
function Yn() {
  return new ie([[document.documentElement]], Lo);
}
function Ds() {
  return this;
}
ie.prototype = Yn.prototype = {
  constructor: ie,
  select: ea,
  selectAll: oa,
  selectChild: ua,
  selectChildren: ga,
  filter: da,
  data: _a,
  enter: ma,
  exit: ba,
  join: Ma,
  merge: Ta,
  selection: Ds,
  order: ka,
  sort: Ca,
  call: Na,
  nodes: Da,
  node: Fa,
  size: Sa,
  empty: Ea,
  each: Ra,
  attr: qa,
  style: Ba,
  property: Qa,
  classed: Ka,
  text: ns,
  html: ls,
  raise: ss,
  lower: fs,
  append: hs,
  insert: gs,
  remove: ms,
  clone: ps,
  datum: ys,
  on: Ts,
  dispatch: As,
  [Symbol.iterator]: Ns
};
function xe(t) {
  return typeof t == "string" ? new ie([[document.querySelector(t)]], [document.documentElement]) : new ie([[t]], Lo);
}
function $i(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Uo(t, e) {
  var n = Object.create(t.prototype);
  for (var i in e) n[i] = e[i];
  return n;
}
function qn() {
}
var Ln = 0.7, ri = 1 / Ln, rn = "\\s*([+-]?\\d+)\\s*", Un = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", be = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Fs = /^#([0-9a-f]{3,8})$/, Ss = new RegExp(`^rgb\\(${rn},${rn},${rn}\\)$`), Es = new RegExp(`^rgb\\(${be},${be},${be}\\)$`), Rs = new RegExp(`^rgba\\(${rn},${rn},${rn},${Un}\\)$`), Ls = new RegExp(`^rgba\\(${be},${be},${be},${Un}\\)$`), Us = new RegExp(`^hsl\\(${Un},${be},${be}\\)$`), Hs = new RegExp(`^hsla\\(${Un},${be},${be},${Un}\\)$`), Ar = {
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
$i(qn, Ve, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Nr,
  // Deprecated! Use color.formatHex.
  formatHex: Nr,
  formatHex8: Ps,
  formatHsl: zs,
  formatRgb: Dr,
  toString: Dr
});
function Nr() {
  return this.rgb().formatHex();
}
function Ps() {
  return this.rgb().formatHex8();
}
function zs() {
  return Ho(this).formatHsl();
}
function Dr() {
  return this.rgb().formatRgb();
}
function Ve(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Fs.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Fr(e) : n === 3 ? new te(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Qn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Qn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Ss.exec(t)) ? new te(e[1], e[2], e[3], 1) : (e = Es.exec(t)) ? new te(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Rs.exec(t)) ? Qn(e[1], e[2], e[3], e[4]) : (e = Ls.exec(t)) ? Qn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Us.exec(t)) ? Rr(e[1], e[2] / 100, e[3] / 100, 1) : (e = Hs.exec(t)) ? Rr(e[1], e[2] / 100, e[3] / 100, e[4]) : Ar.hasOwnProperty(t) ? Fr(Ar[t]) : t === "transparent" ? new te(NaN, NaN, NaN, 0) : null;
}
function Fr(t) {
  return new te(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Qn(t, e, n, i) {
  return i <= 0 && (t = e = n = NaN), new te(t, e, n, i);
}
function Ys(t) {
  return t instanceof qn || (t = Ve(t)), t ? (t = t.rgb(), new te(t.r, t.g, t.b, t.opacity)) : new te();
}
function qi(t, e, n, i) {
  return arguments.length === 1 ? Ys(t) : new te(t, e, n, i ?? 1);
}
function te(t, e, n, i) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +i;
}
$i(te, qi, Uo(qn, {
  brighter(t) {
    return t = t == null ? ri : Math.pow(ri, t), new te(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ln : Math.pow(Ln, t), new te(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new te(Ie(this.r), Ie(this.g), Ie(this.b), oi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Sr,
  // Deprecated! Use color.formatHex.
  formatHex: Sr,
  formatHex8: qs,
  formatRgb: Er,
  toString: Er
}));
function Sr() {
  return `#${qe(this.r)}${qe(this.g)}${qe(this.b)}`;
}
function qs() {
  return `#${qe(this.r)}${qe(this.g)}${qe(this.b)}${qe((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Er() {
  const t = oi(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Ie(this.r)}, ${Ie(this.g)}, ${Ie(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function oi(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Ie(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function qe(t) {
  return t = Ie(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Rr(t, e, n, i) {
  return i <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new me(t, e, n, i);
}
function Ho(t) {
  if (t instanceof me) return new me(t.h, t.s, t.l, t.opacity);
  if (t instanceof qn || (t = Ve(t)), !t) return new me();
  if (t instanceof me) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, i = t.b / 255, r = Math.min(e, n, i), o = Math.max(e, n, i), s = NaN, f = o - r, a = (o + r) / 2;
  return f ? (e === o ? s = (n - i) / f + (n < i) * 6 : n === o ? s = (i - e) / f + 2 : s = (e - n) / f + 4, f /= a < 0.5 ? o + r : 2 - o - r, s *= 60) : f = a > 0 && a < 1 ? 0 : s, new me(s, f, a, t.opacity);
}
function Is(t, e, n, i) {
  return arguments.length === 1 ? Ho(t) : new me(t, e, n, i ?? 1);
}
function me(t, e, n, i) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +i;
}
$i(me, Is, Uo(qn, {
  brighter(t) {
    return t = t == null ? ri : Math.pow(ri, t), new me(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ln : Math.pow(Ln, t), new me(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * e, r = 2 * n - i;
    return new te(
      Ci(t >= 240 ? t - 240 : t + 120, r, i),
      Ci(t, r, i),
      Ci(t < 120 ? t + 240 : t - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new me(Lr(this.h), On(this.s), On(this.l), oi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = oi(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Lr(this.h)}, ${On(this.s) * 100}%, ${On(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Lr(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function On(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Ci(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Ki = (t) => () => t;
function Vs(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Ws(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(i) {
    return Math.pow(t + i * e, n);
  };
}
function Bs(t) {
  return (t = +t) == 1 ? Po : function(e, n) {
    return n - e ? Ws(e, n, t) : Ki(isNaN(e) ? n : e);
  };
}
function Po(t, e) {
  var n = e - t;
  return n ? Vs(t, n) : Ki(isNaN(t) ? e : t);
}
const li = function t(e) {
  var n = Bs(e);
  function i(r, o) {
    var s = n((r = qi(r)).r, (o = qi(o)).r), f = n(r.g, o.g), a = n(r.b, o.b), l = Po(r.opacity, o.opacity);
    return function(d) {
      return r.r = s(d), r.g = f(d), r.b = a(d), r.opacity = l(d), r + "";
    };
  }
  return i.gamma = t, i;
}(1);
function Xs(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, i = e.slice(), r;
  return function(o) {
    for (r = 0; r < n; ++r) i[r] = t[r] * (1 - o) + e[r] * o;
    return i;
  };
}
function Gs(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Zs(t, e) {
  var n = e ? e.length : 0, i = t ? Math.min(n, t.length) : 0, r = new Array(i), o = new Array(n), s;
  for (s = 0; s < i; ++s) r[s] = ji(t[s], e[s]);
  for (; s < n; ++s) o[s] = e[s];
  return function(f) {
    for (s = 0; s < i; ++s) o[s] = r[s](f);
    return o;
  };
}
function Qs(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(i) {
    return n.setTime(t * (1 - i) + e * i), n;
  };
}
function de(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Os(t, e) {
  var n = {}, i = {}, r;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (r in e)
    r in t ? n[r] = ji(t[r], e[r]) : i[r] = e[r];
  return function(o) {
    for (r in n) i[r] = n[r](o);
    return i;
  };
}
var Ii = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ai = new RegExp(Ii.source, "g");
function Js(t) {
  return function() {
    return t;
  };
}
function $s(t) {
  return function(e) {
    return t(e) + "";
  };
}
function zo(t, e) {
  var n = Ii.lastIndex = Ai.lastIndex = 0, i, r, o, s = -1, f = [], a = [];
  for (t = t + "", e = e + ""; (i = Ii.exec(t)) && (r = Ai.exec(e)); )
    (o = r.index) > n && (o = e.slice(n, o), f[s] ? f[s] += o : f[++s] = o), (i = i[0]) === (r = r[0]) ? f[s] ? f[s] += r : f[++s] = r : (f[++s] = null, a.push({ i: s, x: de(i, r) })), n = Ai.lastIndex;
  return n < e.length && (o = e.slice(n), f[s] ? f[s] += o : f[++s] = o), f.length < 2 ? a[0] ? $s(a[0].x) : Js(e) : (e = a.length, function(l) {
    for (var d = 0, c; d < e; ++d) f[(c = a[d]).i] = c.x(l);
    return f.join("");
  });
}
function ji(t, e) {
  var n = typeof e, i;
  return e == null || n === "boolean" ? Ki(e) : (n === "number" ? de : n === "string" ? (i = Ve(e)) ? (e = i, li) : zo : e instanceof Ve ? li : e instanceof Date ? Qs : Gs(e) ? Xs : Array.isArray(e) ? Zs : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Os : de)(t, e);
}
function Ks(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var Ur = 180 / Math.PI, Vi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Yo(t, e, n, i, r, o) {
  var s, f, a;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (a = t * n + e * i) && (n -= t * a, i -= e * a), (f = Math.sqrt(n * n + i * i)) && (n /= f, i /= f, a /= f), t * i < e * n && (t = -t, e = -e, a = -a, s = -s), {
    translateX: r,
    translateY: o,
    rotate: Math.atan2(e, t) * Ur,
    skewX: Math.atan(a) * Ur,
    scaleX: s,
    scaleY: f
  };
}
var Jn;
function js(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Vi : Yo(e.a, e.b, e.c, e.d, e.e, e.f);
}
function tu(t) {
  return t == null || (Jn || (Jn = document.createElementNS("http://www.w3.org/2000/svg", "g")), Jn.setAttribute("transform", t), !(t = Jn.transform.baseVal.consolidate())) ? Vi : (t = t.matrix, Yo(t.a, t.b, t.c, t.d, t.e, t.f));
}
function qo(t, e, n, i) {
  function r(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, d, c, m, g, v) {
    if (l !== c || d !== m) {
      var p = g.push("translate(", null, e, null, n);
      v.push({ i: p - 4, x: de(l, c) }, { i: p - 2, x: de(d, m) });
    } else (c || m) && g.push("translate(" + c + e + m + n);
  }
  function s(l, d, c, m) {
    l !== d ? (l - d > 180 ? d += 360 : d - l > 180 && (l += 360), m.push({ i: c.push(r(c) + "rotate(", null, i) - 2, x: de(l, d) })) : d && c.push(r(c) + "rotate(" + d + i);
  }
  function f(l, d, c, m) {
    l !== d ? m.push({ i: c.push(r(c) + "skewX(", null, i) - 2, x: de(l, d) }) : d && c.push(r(c) + "skewX(" + d + i);
  }
  function a(l, d, c, m, g, v) {
    if (l !== c || d !== m) {
      var p = g.push(r(g) + "scale(", null, ",", null, ")");
      v.push({ i: p - 4, x: de(l, c) }, { i: p - 2, x: de(d, m) });
    } else (c !== 1 || m !== 1) && g.push(r(g) + "scale(" + c + "," + m + ")");
  }
  return function(l, d) {
    var c = [], m = [];
    return l = t(l), d = t(d), o(l.translateX, l.translateY, d.translateX, d.translateY, c, m), s(l.rotate, d.rotate, c, m), f(l.skewX, d.skewX, c, m), a(l.scaleX, l.scaleY, d.scaleX, d.scaleY, c, m), l = d = null, function(g) {
      for (var v = -1, p = m.length, C; ++v < p; ) c[(C = m[v]).i] = C.x(g);
      return c.join("");
    };
  };
}
var eu = qo(js, "px, ", "px)", "deg)"), nu = qo(tu, ", ", ")", ")"), ln = 0, An = 0, wn = 0, Io = 1e3, ai, Nn, si = 0, We = 0, vi = 0, Hn = typeof performance == "object" && performance.now ? performance : Date, Vo = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function tr() {
  return We || (Vo(iu), We = Hn.now() + vi);
}
function iu() {
  We = 0;
}
function ui() {
  this._call = this._time = this._next = null;
}
ui.prototype = Wo.prototype = {
  constructor: ui,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? tr() : +n) + (e == null ? 0 : +e), !this._next && Nn !== this && (Nn ? Nn._next = this : ai = this, Nn = this), this._call = t, this._time = n, Wi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Wi());
  }
};
function Wo(t, e, n) {
  var i = new ui();
  return i.restart(t, e, n), i;
}
function ru() {
  tr(), ++ln;
  for (var t = ai, e; t; )
    (e = We - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --ln;
}
function Hr() {
  We = (si = Hn.now()) + vi, ln = An = 0;
  try {
    ru();
  } finally {
    ln = 0, lu(), We = 0;
  }
}
function ou() {
  var t = Hn.now(), e = t - si;
  e > Io && (vi -= e, si = t);
}
function lu() {
  for (var t, e = ai, n, i = 1 / 0; e; )
    e._call ? (i > e._time && (i = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : ai = n);
  Nn = t, Wi(i);
}
function Wi(t) {
  if (!ln) {
    An && (An = clearTimeout(An));
    var e = t - We;
    e > 24 ? (t < 1 / 0 && (An = setTimeout(Hr, t - Hn.now() - vi)), wn && (wn = clearInterval(wn))) : (wn || (si = Hn.now(), wn = setInterval(ou, Io)), ln = 1, Vo(Hr));
  }
}
function Pr(t, e, n) {
  var i = new ui();
  return e = e == null ? 0 : +e, i.restart((r) => {
    i.stop(), t(r + e);
  }, e, n), i;
}
var au = bo("start", "end", "cancel", "interrupt"), su = [], Bo = 0, zr = 1, Bi = 2, ti = 3, Yr = 4, Xi = 5, ei = 6;
function wi(t, e, n, i, r, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  uu(t, n, {
    name: e,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: au,
    tween: su,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Bo
  });
}
function er(t, e) {
  var n = ve(t, e);
  if (n.state > Bo) throw new Error("too late; already scheduled");
  return n;
}
function ke(t, e) {
  var n = ve(t, e);
  if (n.state > ti) throw new Error("too late; already running");
  return n;
}
function ve(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function uu(t, e, n) {
  var i = t.__transition, r;
  i[e] = n, n.timer = Wo(o, 0, n.time);
  function o(l) {
    n.state = zr, n.timer.restart(s, n.delay, n.time), n.delay <= l && s(l - n.delay);
  }
  function s(l) {
    var d, c, m, g;
    if (n.state !== zr) return a();
    for (d in i)
      if (g = i[d], g.name === n.name) {
        if (g.state === ti) return Pr(s);
        g.state === Yr ? (g.state = ei, g.timer.stop(), g.on.call("interrupt", t, t.__data__, g.index, g.group), delete i[d]) : +d < e && (g.state = ei, g.timer.stop(), g.on.call("cancel", t, t.__data__, g.index, g.group), delete i[d]);
      }
    if (Pr(function() {
      n.state === ti && (n.state = Yr, n.timer.restart(f, n.delay, n.time), f(l));
    }), n.state = Bi, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Bi) {
      for (n.state = ti, r = new Array(m = n.tween.length), d = 0, c = -1; d < m; ++d)
        (g = n.tween[d].value.call(t, t.__data__, n.index, n.group)) && (r[++c] = g);
      r.length = c + 1;
    }
  }
  function f(l) {
    for (var d = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(a), n.state = Xi, 1), c = -1, m = r.length; ++c < m; )
      r[c].call(t, d);
    n.state === Xi && (n.on.call("end", t, t.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = ei, n.timer.stop(), delete i[e];
    for (var l in i) return;
    delete t.__transition;
  }
}
function fu(t, e) {
  var n = t.__transition, i, r, o = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((i = n[s]).name !== e) {
        o = !1;
        continue;
      }
      r = i.state > Bi && i.state < Xi, i.state = ei, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", t, t.__data__, i.index, i.group), delete n[s];
    }
    o && delete t.__transition;
  }
}
function hu(t) {
  return this.each(function() {
    fu(this, t);
  });
}
function cu(t, e) {
  var n, i;
  return function() {
    var r = ke(this, t), o = r.tween;
    if (o !== n) {
      i = n = o;
      for (var s = 0, f = i.length; s < f; ++s)
        if (i[s].name === e) {
          i = i.slice(), i.splice(s, 1);
          break;
        }
    }
    r.tween = i;
  };
}
function gu(t, e, n) {
  var i, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = ke(this, t), s = o.tween;
    if (s !== i) {
      r = (i = s).slice();
      for (var f = { name: e, value: n }, a = 0, l = r.length; a < l; ++a)
        if (r[a].name === e) {
          r[a] = f;
          break;
        }
      a === l && r.push(f);
    }
    o.tween = r;
  };
}
function du(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var i = ve(this.node(), n).tween, r = 0, o = i.length, s; r < o; ++r)
      if ((s = i[r]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? cu : gu)(n, t, e));
}
function nr(t, e, n) {
  var i = t._id;
  return t.each(function() {
    var r = ke(this, i);
    (r.value || (r.value = {}))[e] = n.apply(this, arguments);
  }), function(r) {
    return ve(r, i).value[e];
  };
}
function Xo(t, e) {
  var n;
  return (typeof e == "number" ? de : e instanceof Ve ? li : (n = Ve(e)) ? (e = n, li) : zo)(t, e);
}
function mu(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function vu(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function wu(t, e, n) {
  var i, r = n + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === r ? null : s === i ? o : o = e(i = s, n);
  };
}
function pu(t, e, n) {
  var i, r = n + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === r ? null : s === i ? o : o = e(i = s, n);
  };
}
function yu(t, e, n) {
  var i, r, o;
  return function() {
    var s, f = n(this), a;
    return f == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), a = f + "", s === a ? null : s === i && a === r ? o : (r = a, o = e(i = s, f)));
  };
}
function _u(t, e, n) {
  var i, r, o;
  return function() {
    var s, f = n(this), a;
    return f == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), a = f + "", s === a ? null : s === i && a === r ? o : (r = a, o = e(i = s, f)));
  };
}
function xu(t, e) {
  var n = mi(t), i = n === "transform" ? nu : Xo;
  return this.attrTween(t, typeof e == "function" ? (n.local ? _u : yu)(n, i, nr(this, "attr." + t, e)) : e == null ? (n.local ? vu : mu)(n) : (n.local ? pu : wu)(n, i, e));
}
function bu(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Mu(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Tu(t, e) {
  var n, i;
  function r() {
    var o = e.apply(this, arguments);
    return o !== i && (n = (i = o) && Mu(t, o)), n;
  }
  return r._value = e, r;
}
function ku(t, e) {
  var n, i;
  function r() {
    var o = e.apply(this, arguments);
    return o !== i && (n = (i = o) && bu(t, o)), n;
  }
  return r._value = e, r;
}
function Cu(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var i = mi(t);
  return this.tween(n, (i.local ? Tu : ku)(i, e));
}
function Au(t, e) {
  return function() {
    er(this, t).delay = +e.apply(this, arguments);
  };
}
function Nu(t, e) {
  return e = +e, function() {
    er(this, t).delay = e;
  };
}
function Du(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Au : Nu)(e, t)) : ve(this.node(), e).delay;
}
function Fu(t, e) {
  return function() {
    ke(this, t).duration = +e.apply(this, arguments);
  };
}
function Su(t, e) {
  return e = +e, function() {
    ke(this, t).duration = e;
  };
}
function Eu(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Fu : Su)(e, t)) : ve(this.node(), e).duration;
}
function Ru(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    ke(this, t).ease = e;
  };
}
function Lu(t) {
  var e = this._id;
  return arguments.length ? this.each(Ru(e, t)) : ve(this.node(), e).ease;
}
function Uu(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    ke(this, t).ease = n;
  };
}
function Hu(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Uu(this._id, t));
}
function Pu(t) {
  typeof t != "function" && (t = ko(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = e[r], s = o.length, f = i[r] = [], a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && f.push(a);
  return new Se(i, this._parents, this._name, this._id);
}
function zu(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, o = Math.min(i, r), s = new Array(i), f = 0; f < o; ++f)
    for (var a = e[f], l = n[f], d = a.length, c = s[f] = new Array(d), m, g = 0; g < d; ++g)
      (m = a[g] || l[g]) && (c[g] = m);
  for (; f < i; ++f)
    s[f] = e[f];
  return new Se(s, this._parents, this._name, this._id);
}
function Yu(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function qu(t, e, n) {
  var i, r, o = Yu(e) ? er : ke;
  return function() {
    var s = o(this, t), f = s.on;
    f !== i && (r = (i = f).copy()).on(e, n), s.on = r;
  };
}
function Iu(t, e) {
  var n = this._id;
  return arguments.length < 2 ? ve(this.node(), n).on.on(t) : this.each(qu(n, t, e));
}
function Vu(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Wu() {
  return this.on("end.remove", Vu(this._id));
}
function Bu(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Oi(t));
  for (var i = this._groups, r = i.length, o = new Array(r), s = 0; s < r; ++s)
    for (var f = i[s], a = f.length, l = o[s] = new Array(a), d, c, m = 0; m < a; ++m)
      (d = f[m]) && (c = t.call(d, d.__data__, m, f)) && ("__data__" in d && (c.__data__ = d.__data__), l[m] = c, wi(l[m], e, n, m, l, ve(d, n)));
  return new Se(o, this._parents, e, n);
}
function Xu(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = To(t));
  for (var i = this._groups, r = i.length, o = [], s = [], f = 0; f < r; ++f)
    for (var a = i[f], l = a.length, d, c = 0; c < l; ++c)
      if (d = a[c]) {
        for (var m = t.call(d, d.__data__, c, a), g, v = ve(d, n), p = 0, C = m.length; p < C; ++p)
          (g = m[p]) && wi(g, e, n, p, m, v);
        o.push(m), s.push(d);
      }
  return new Se(o, s, e, n);
}
var Gu = Yn.prototype.constructor;
function Zu() {
  return new Gu(this._groups, this._parents);
}
function Qu(t, e) {
  var n, i, r;
  return function() {
    var o = on(this, t), s = (this.style.removeProperty(t), on(this, t));
    return o === s ? null : o === n && s === i ? r : r = e(n = o, i = s);
  };
}
function Go(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ou(t, e, n) {
  var i, r = n + "", o;
  return function() {
    var s = on(this, t);
    return s === r ? null : s === i ? o : o = e(i = s, n);
  };
}
function Ju(t, e, n) {
  var i, r, o;
  return function() {
    var s = on(this, t), f = n(this), a = f + "";
    return f == null && (a = f = (this.style.removeProperty(t), on(this, t))), s === a ? null : s === i && a === r ? o : (r = a, o = e(i = s, f));
  };
}
function $u(t, e) {
  var n, i, r, o = "style." + e, s = "end." + o, f;
  return function() {
    var a = ke(this, t), l = a.on, d = a.value[o] == null ? f || (f = Go(e)) : void 0;
    (l !== n || r !== d) && (i = (n = l).copy()).on(s, r = d), a.on = i;
  };
}
function Ku(t, e, n) {
  var i = (t += "") == "transform" ? eu : Xo;
  return e == null ? this.styleTween(t, Qu(t, i)).on("end.style." + t, Go(t)) : typeof e == "function" ? this.styleTween(t, Ju(t, i, nr(this, "style." + t, e))).each($u(this._id, t)) : this.styleTween(t, Ou(t, i, e), n).on("end.style." + t, null);
}
function ju(t, e, n) {
  return function(i) {
    this.style.setProperty(t, e.call(this, i), n);
  };
}
function tf(t, e, n) {
  var i, r;
  function o() {
    var s = e.apply(this, arguments);
    return s !== r && (i = (r = s) && ju(t, s, n)), i;
  }
  return o._value = e, o;
}
function ef(t, e, n) {
  var i = "style." + (t += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (e == null) return this.tween(i, null);
  if (typeof e != "function") throw new Error();
  return this.tween(i, tf(t, e, n ?? ""));
}
function nf(t) {
  return function() {
    this.textContent = t;
  };
}
function rf(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function of(t) {
  return this.tween("text", typeof t == "function" ? rf(nr(this, "text", t)) : nf(t == null ? "" : t + ""));
}
function lf(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function af(t) {
  var e, n;
  function i() {
    var r = t.apply(this, arguments);
    return r !== n && (e = (n = r) && lf(r)), e;
  }
  return i._value = t, i;
}
function sf(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, af(t));
}
function uf() {
  for (var t = this._name, e = this._id, n = Zo(), i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var s = i[o], f = s.length, a, l = 0; l < f; ++l)
      if (a = s[l]) {
        var d = ve(a, e);
        wi(a, t, n, l, s, {
          time: d.time + d.delay + d.duration,
          delay: 0,
          duration: d.duration,
          ease: d.ease
        });
      }
  return new Se(i, this._parents, t, n);
}
function ff() {
  var t, e, n = this, i = n._id, r = n.size();
  return new Promise(function(o, s) {
    var f = { value: s }, a = { value: function() {
      --r === 0 && o();
    } };
    n.each(function() {
      var l = ke(this, i), d = l.on;
      d !== t && (e = (t = d).copy(), e._.cancel.push(f), e._.interrupt.push(f), e._.end.push(a)), l.on = e;
    }), r === 0 && o();
  });
}
var hf = 0;
function Se(t, e, n, i) {
  this._groups = t, this._parents = e, this._name = n, this._id = i;
}
function Zo() {
  return ++hf;
}
var Fe = Yn.prototype;
Se.prototype = {
  constructor: Se,
  select: Bu,
  selectAll: Xu,
  selectChild: Fe.selectChild,
  selectChildren: Fe.selectChildren,
  filter: Pu,
  merge: zu,
  selection: Zu,
  transition: uf,
  call: Fe.call,
  nodes: Fe.nodes,
  node: Fe.node,
  size: Fe.size,
  empty: Fe.empty,
  each: Fe.each,
  on: Iu,
  attr: xu,
  attrTween: Cu,
  style: Ku,
  styleTween: ef,
  text: of,
  textTween: sf,
  remove: Wu,
  tween: du,
  delay: Du,
  duration: Eu,
  ease: Lu,
  easeVarying: Hu,
  end: ff,
  [Symbol.iterator]: Fe[Symbol.iterator]
};
function cf(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var gf = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cf
};
function df(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function mf(t) {
  var e, n;
  t instanceof Se ? (e = t._id, t = t._name) : (e = Zo(), (n = gf).time = tr(), t = t == null ? null : t + "");
  for (var i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var s = i[o], f = s.length, a, l = 0; l < f; ++l)
      (a = s[l]) && wi(a, t, e, l, s, n || df(a, e));
  return new Se(i, this._parents, t, e);
}
Yn.prototype.interrupt = hu;
Yn.prototype.transition = mf;
const Gi = Math.PI, Zi = 2 * Gi, Ye = 1e-6, vf = Zi - Ye;
function Qo(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function wf(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return Qo;
  const n = 10 ** e;
  return function(i) {
    this._ += i[0];
    for (let r = 1, o = i.length; r < o; ++r)
      this._ += Math.round(arguments[r] * n) / n + i[r];
  };
}
class pf {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Qo : wf(e);
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
  quadraticCurveTo(e, n, i, r) {
    this._append`Q${+e},${+n},${this._x1 = +i},${this._y1 = +r}`;
  }
  bezierCurveTo(e, n, i, r, o, s) {
    this._append`C${+e},${+n},${+i},${+r},${this._x1 = +o},${this._y1 = +s}`;
  }
  arcTo(e, n, i, r, o) {
    if (e = +e, n = +n, i = +i, r = +r, o = +o, o < 0) throw new Error(`negative radius: ${o}`);
    let s = this._x1, f = this._y1, a = i - e, l = r - n, d = s - e, c = f - n, m = d * d + c * c;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (m > Ye) if (!(Math.abs(c * a - l * d) > Ye) || !o)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let g = i - s, v = r - f, p = a * a + l * l, C = g * g + v * v, E = Math.sqrt(p), k = Math.sqrt(m), y = o * Math.tan((Gi - Math.acos((p + m - C) / (2 * E * k))) / 2), _ = y / k, S = y / E;
      Math.abs(_ - 1) > Ye && this._append`L${e + _ * d},${n + _ * c}`, this._append`A${o},${o},0,0,${+(c * g > d * v)},${this._x1 = e + S * a},${this._y1 = n + S * l}`;
    }
  }
  arc(e, n, i, r, o, s) {
    if (e = +e, n = +n, i = +i, s = !!s, i < 0) throw new Error(`negative radius: ${i}`);
    let f = i * Math.cos(r), a = i * Math.sin(r), l = e + f, d = n + a, c = 1 ^ s, m = s ? r - o : o - r;
    this._x1 === null ? this._append`M${l},${d}` : (Math.abs(this._x1 - l) > Ye || Math.abs(this._y1 - d) > Ye) && this._append`L${l},${d}`, i && (m < 0 && (m = m % Zi + Zi), m > vf ? this._append`A${i},${i},0,1,${c},${e - f},${n - a}A${i},${i},0,1,${c},${this._x1 = l},${this._y1 = d}` : m > Ye && this._append`A${i},${i},0,${+(m >= Gi)},${c},${this._x1 = e + i * Math.cos(o)},${this._y1 = n + i * Math.sin(o)}`);
  }
  rect(e, n, i, r) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${i = +i}v${+r}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}
function yf(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function fi(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, i = t.slice(0, n);
  return [
    i.length > 1 ? i[0] + i.slice(2) : i,
    +t.slice(n + 1)
  ];
}
function an(t) {
  return t = fi(Math.abs(t)), t ? t[1] : NaN;
}
function _f(t, e) {
  return function(n, i) {
    for (var r = n.length, o = [], s = 0, f = t[0], a = 0; r > 0 && f > 0 && (a + f + 1 > i && (f = Math.max(1, i - a)), o.push(n.substring(r -= f, r + f)), !((a += f + 1) > i)); )
      f = t[s = (s + 1) % t.length];
    return o.reverse().join(e);
  };
}
function xf(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var bf = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function hi(t) {
  if (!(e = bf.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new ir({
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
hi.prototype = ir.prototype;
function ir(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
ir.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Mf(t) {
  t: for (var e = t.length, n = 1, i = -1, r; n < e; ++n)
    switch (t[n]) {
      case ".":
        i = r = n;
        break;
      case "0":
        i === 0 && (i = n), r = n;
        break;
      default:
        if (!+t[n]) break t;
        i > 0 && (i = 0);
        break;
    }
  return i > 0 ? t.slice(0, i) + t.slice(r + 1) : t;
}
var Oo;
function Tf(t, e) {
  var n = fi(t, e);
  if (!n) return t + "";
  var i = n[0], r = n[1], o = r - (Oo = Math.max(-8, Math.min(8, Math.floor(r / 3))) * 3) + 1, s = i.length;
  return o === s ? i : o > s ? i + new Array(o - s + 1).join("0") : o > 0 ? i.slice(0, o) + "." + i.slice(o) : "0." + new Array(1 - o).join("0") + fi(t, Math.max(0, e + o - 1))[0];
}
function qr(t, e) {
  var n = fi(t, e);
  if (!n) return t + "";
  var i = n[0], r = n[1];
  return r < 0 ? "0." + new Array(-r).join("0") + i : i.length > r + 1 ? i.slice(0, r + 1) + "." + i.slice(r + 1) : i + new Array(r - i.length + 2).join("0");
}
const Ir = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: yf,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => qr(t * 100, e),
  r: qr,
  s: Tf,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Vr(t) {
  return t;
}
var Wr = Array.prototype.map, Br = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function kf(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Vr : _f(Wr.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", i = t.currency === void 0 ? "" : t.currency[1] + "", r = t.decimal === void 0 ? "." : t.decimal + "", o = t.numerals === void 0 ? Vr : xf(Wr.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", f = t.minus === void 0 ? "−" : t.minus + "", a = t.nan === void 0 ? "NaN" : t.nan + "";
  function l(c) {
    c = hi(c);
    var m = c.fill, g = c.align, v = c.sign, p = c.symbol, C = c.zero, E = c.width, k = c.comma, y = c.precision, _ = c.trim, S = c.type;
    S === "n" ? (k = !0, S = "g") : Ir[S] || (y === void 0 && (y = 12), _ = !0, S = "g"), (C || m === "0" && g === "=") && (C = !0, m = "0", g = "=");
    var U = p === "$" ? n : p === "#" && /[boxX]/.test(S) ? "0" + S.toLowerCase() : "", R = p === "$" ? i : /[%p]/.test(S) ? s : "", T = Ir[S], M = /[defgprs%]/.test(S);
    y = y === void 0 ? 6 : /[gprs]/.test(S) ? Math.max(1, Math.min(21, y)) : Math.max(0, Math.min(20, y));
    function A(w) {
      var D = U, x = R, I, Y, L;
      if (S === "c")
        x = T(w) + x, w = "";
      else {
        w = +w;
        var ot = w < 0 || 1 / w < 0;
        if (w = isNaN(w) ? a : T(Math.abs(w), y), _ && (w = Mf(w)), ot && +w == 0 && v !== "+" && (ot = !1), D = (ot ? v === "(" ? v : f : v === "-" || v === "(" ? "" : v) + D, x = (S === "s" ? Br[8 + Oo / 3] : "") + x + (ot && v === "(" ? ")" : ""), M) {
          for (I = -1, Y = w.length; ++I < Y; )
            if (L = w.charCodeAt(I), 48 > L || L > 57) {
              x = (L === 46 ? r + w.slice(I + 1) : w.slice(I)) + x, w = w.slice(0, I);
              break;
            }
        }
      }
      k && !C && (w = e(w, 1 / 0));
      var _t = D.length + w.length + x.length, Q = _t < E ? new Array(E - _t + 1).join(m) : "";
      switch (k && C && (w = e(Q + w, Q.length ? E - x.length : 1 / 0), Q = ""), g) {
        case "<":
          w = D + w + x + Q;
          break;
        case "=":
          w = D + Q + w + x;
          break;
        case "^":
          w = Q.slice(0, _t = Q.length >> 1) + D + w + x + Q.slice(_t);
          break;
        default:
          w = Q + D + w + x;
          break;
      }
      return o(w);
    }
    return A.toString = function() {
      return c + "";
    }, A;
  }
  function d(c, m) {
    var g = l((c = hi(c), c.type = "f", c)), v = Math.max(-8, Math.min(8, Math.floor(an(m) / 3))) * 3, p = Math.pow(10, -v), C = Br[8 + v / 3];
    return function(E) {
      return g(p * E) + C;
    };
  }
  return {
    format: l,
    formatPrefix: d
  };
}
var $n, Jo, $o;
Cf({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function Cf(t) {
  return $n = kf(t), Jo = $n.format, $o = $n.formatPrefix, $n;
}
function Af(t) {
  return Math.max(0, -an(Math.abs(t)));
}
function Nf(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(an(e) / 3))) * 3 - an(Math.abs(t)));
}
function Df(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, an(e) - an(t)) + 1;
}
function Ff(t, e) {
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
function Sf(t) {
  return function() {
    return t;
  };
}
function Ef(t) {
  return +t;
}
var Xr = [0, 1];
function en(t) {
  return t;
}
function Qi(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : Sf(isNaN(e) ? NaN : 0.5);
}
function Rf(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(i) {
    return Math.max(t, Math.min(e, i));
  };
}
function Lf(t, e, n) {
  var i = t[0], r = t[1], o = e[0], s = e[1];
  return r < i ? (i = Qi(r, i), o = n(s, o)) : (i = Qi(i, r), o = n(o, s)), function(f) {
    return o(i(f));
  };
}
function Uf(t, e, n) {
  var i = Math.min(t.length, e.length) - 1, r = new Array(i), o = new Array(i), s = -1;
  for (t[i] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < i; )
    r[s] = Qi(t[s], t[s + 1]), o[s] = n(e[s], e[s + 1]);
  return function(f) {
    var a = Rl(t, f, 1, i) - 1;
    return o[a](r[a](f));
  };
}
function Hf(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function Pf() {
  var t = Xr, e = Xr, n = ji, i, r, o, s = en, f, a, l;
  function d() {
    var m = Math.min(t.length, e.length);
    return s !== en && (s = Rf(t[0], t[m - 1])), f = m > 2 ? Uf : Lf, a = l = null, c;
  }
  function c(m) {
    return m == null || isNaN(m = +m) ? o : (a || (a = f(t.map(i), e, n)))(i(s(m)));
  }
  return c.invert = function(m) {
    return s(r((l || (l = f(e, t.map(i), de)))(m)));
  }, c.domain = function(m) {
    return arguments.length ? (t = Array.from(m, Ef), d()) : t.slice();
  }, c.range = function(m) {
    return arguments.length ? (e = Array.from(m), d()) : e.slice();
  }, c.rangeRound = function(m) {
    return e = Array.from(m), n = Ks, d();
  }, c.clamp = function(m) {
    return arguments.length ? (s = m ? !0 : en, d()) : s !== en;
  }, c.interpolate = function(m) {
    return arguments.length ? (n = m, d()) : n;
  }, c.unknown = function(m) {
    return arguments.length ? (o = m, c) : o;
  }, function(m, g) {
    return i = m, r = g, d();
  };
}
function zf() {
  return Pf()(en, en);
}
function Yf(t, e, n, i) {
  var r = Yl(t, e, n), o;
  switch (i = hi(i ?? ",f"), i.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return i.precision == null && !isNaN(o = Nf(r, s)) && (i.precision = o), $o(i, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      i.precision == null && !isNaN(o = Df(r, Math.max(Math.abs(t), Math.abs(e)))) && (i.precision = o - (i.type === "e"));
      break;
    }
    case "f":
    case "%": {
      i.precision == null && !isNaN(o = Af(r)) && (i.precision = o - (i.type === "%") * 2);
      break;
    }
  }
  return Jo(i);
}
function qf(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var i = e();
    return zl(i[0], i[i.length - 1], n ?? 10);
  }, t.tickFormat = function(n, i) {
    var r = e();
    return Yf(r[0], r[r.length - 1], n ?? 10, i);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var i = e(), r = 0, o = i.length - 1, s = i[r], f = i[o], a, l, d = 10;
    for (f < s && (l = s, s = f, f = l, l = r, r = o, o = l); d-- > 0; ) {
      if (l = Hi(s, f, n), l === a)
        return i[r] = s, i[o] = f, e(i);
      if (l > 0)
        s = Math.floor(s / l) * l, f = Math.ceil(f / l) * l;
      else if (l < 0)
        s = Math.ceil(s * l) / l, f = Math.floor(f * l) / l;
      else
        break;
      a = l;
    }
    return t;
  }, t;
}
function sn() {
  var t = zf();
  return t.copy = function() {
    return Hf(t, sn());
  }, Ff.apply(t, arguments), qf(t);
}
const Ni = /* @__PURE__ */ new Date(), Di = /* @__PURE__ */ new Date();
function Ce(t, e, n, i) {
  function r(o) {
    return t(o = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+o)), o;
  }
  return r.floor = (o) => (t(o = /* @__PURE__ */ new Date(+o)), o), r.ceil = (o) => (t(o = new Date(o - 1)), e(o, 1), t(o), o), r.round = (o) => {
    const s = r(o), f = r.ceil(o);
    return o - s < f - o ? s : f;
  }, r.offset = (o, s) => (e(o = /* @__PURE__ */ new Date(+o), s == null ? 1 : Math.floor(s)), o), r.range = (o, s, f) => {
    const a = [];
    if (o = r.ceil(o), f = f == null ? 1 : Math.floor(f), !(o < s) || !(f > 0)) return a;
    let l;
    do
      a.push(l = /* @__PURE__ */ new Date(+o)), e(o, f), t(o);
    while (l < o && o < s);
    return a;
  }, r.filter = (o) => Ce((s) => {
    if (s >= s) for (; t(s), !o(s); ) s.setTime(s - 1);
  }, (s, f) => {
    if (s >= s)
      if (f < 0) for (; ++f <= 0; )
        for (; e(s, -1), !o(s); )
          ;
      else for (; --f >= 0; )
        for (; e(s, 1), !o(s); )
          ;
  }), n && (r.count = (o, s) => (Ni.setTime(+o), Di.setTime(+s), t(Ni), t(Di), Math.floor(n(Ni, Di))), r.every = (o) => (o = Math.floor(o), !isFinite(o) || !(o > 0) ? null : o > 1 ? r.filter(i ? (s) => i(s) % o === 0 : (s) => r.count(0, s) % o === 0) : r)), r;
}
const If = 1e3, rr = If * 60, Vf = rr * 60, Pn = Vf * 24, Ko = Pn * 7, ge = Ce(
  (t) => t.setHours(0, 0, 0, 0),
  (t, e) => t.setDate(t.getDate() + e),
  (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * rr) / Pn,
  (t) => t.getDate() - 1
);
ge.range;
const or = Ce((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / Pn, (t) => t.getUTCDate() - 1);
or.range;
const Wf = Ce((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / Pn, (t) => Math.floor(t / Pn));
Wf.range;
function Ge(t) {
  return Ce((e) => {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setDate(e.getDate() + n * 7);
  }, (e, n) => (n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * rr) / Ko);
}
const jo = Ge(0), ci = Ge(1), Bf = Ge(2), Xf = Ge(3), un = Ge(4), Gf = Ge(5), Zf = Ge(6);
jo.range;
ci.range;
Bf.range;
Xf.range;
un.range;
Gf.range;
Zf.range;
function Ze(t) {
  return Ce((e) => {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setUTCDate(e.getUTCDate() + n * 7);
  }, (e, n) => (n - e) / Ko);
}
const tl = Ze(0), gi = Ze(1), Qf = Ze(2), Of = Ze(3), fn = Ze(4), Jf = Ze(5), $f = Ze(6);
tl.range;
gi.range;
Qf.range;
Of.range;
fn.range;
Jf.range;
$f.range;
const Be = Ce((t) => {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, e) => {
  t.setFullYear(t.getFullYear() + e);
}, (t, e) => e.getFullYear() - t.getFullYear(), (t) => t.getFullYear());
Be.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : Ce((e) => {
  e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, n) => {
  e.setFullYear(e.getFullYear() + n * t);
});
Be.range;
const Xe = Ce((t) => {
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCFullYear(t.getUTCFullYear() + e);
}, (t, e) => e.getUTCFullYear() - t.getUTCFullYear(), (t) => t.getUTCFullYear());
Xe.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : Ce((e) => {
  e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, n) => {
  e.setUTCFullYear(e.getUTCFullYear() + n * t);
});
Xe.range;
function Fi(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e;
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function Si(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e;
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function pn(t, e, n) {
  return { y: t, m: e, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function Kf(t) {
  var e = t.dateTime, n = t.date, i = t.time, r = t.periods, o = t.days, s = t.shortDays, f = t.months, a = t.shortMonths, l = yn(r), d = _n(r), c = yn(o), m = _n(o), g = yn(s), v = _n(s), p = yn(f), C = _n(f), E = yn(a), k = _n(a), y = {
    a: ot,
    A: _t,
    b: Q,
    B: lt,
    c: null,
    d: $r,
    e: $r,
    f: xh,
    g: Sh,
    G: Rh,
    H: ph,
    I: yh,
    j: _h,
    L: el,
    m: bh,
    M: Mh,
    p: nt,
    q: st,
    Q: to,
    s: eo,
    S: Th,
    u: kh,
    U: Ch,
    V: Ah,
    w: Nh,
    W: Dh,
    x: null,
    X: null,
    y: Fh,
    Y: Eh,
    Z: Lh,
    "%": jr
  }, _ = {
    a: At,
    A: X,
    b: P,
    B: $,
    c: null,
    d: Kr,
    e: Kr,
    f: zh,
    g: Qh,
    G: Jh,
    H: Uh,
    I: Hh,
    j: Ph,
    L: il,
    m: Yh,
    M: qh,
    p: dt,
    q: b,
    Q: to,
    s: eo,
    S: Ih,
    u: Vh,
    U: Wh,
    V: Bh,
    w: Xh,
    W: Gh,
    x: null,
    X: null,
    y: Zh,
    Y: Oh,
    Z: $h,
    "%": jr
  }, S = {
    a: A,
    A: w,
    b: D,
    B: x,
    c: I,
    d: Or,
    e: Or,
    f: dh,
    g: Qr,
    G: Zr,
    H: Jr,
    I: Jr,
    j: fh,
    L: gh,
    m: uh,
    M: hh,
    p: M,
    q: sh,
    Q: vh,
    s: wh,
    S: ch,
    u: ih,
    U: rh,
    V: oh,
    w: nh,
    W: lh,
    x: Y,
    X: L,
    y: Qr,
    Y: Zr,
    Z: ah,
    "%": mh
  };
  y.x = U(n, y), y.X = U(i, y), y.c = U(e, y), _.x = U(n, _), _.X = U(i, _), _.c = U(e, _);
  function U(B, tt) {
    return function(G) {
      var N = [], J = -1, F = 0, z = B.length, V, Z, K;
      for (G instanceof Date || (G = /* @__PURE__ */ new Date(+G)); ++J < z; )
        B.charCodeAt(J) === 37 && (N.push(B.slice(F, J)), (Z = Gr[V = B.charAt(++J)]) != null ? V = B.charAt(++J) : Z = V === "e" ? " " : "0", (K = tt[V]) && (V = K(G, Z)), N.push(V), F = J + 1);
      return N.push(B.slice(F, J)), N.join("");
    };
  }
  function R(B, tt) {
    return function(G) {
      var N = pn(1900, void 0, 1), J = T(N, B, G += "", 0), F, z;
      if (J != G.length) return null;
      if ("Q" in N) return new Date(N.Q);
      if ("s" in N) return new Date(N.s * 1e3 + ("L" in N ? N.L : 0));
      if (tt && !("Z" in N) && (N.Z = 0), "p" in N && (N.H = N.H % 12 + N.p * 12), N.m === void 0 && (N.m = "q" in N ? N.q : 0), "V" in N) {
        if (N.V < 1 || N.V > 53) return null;
        "w" in N || (N.w = 1), "Z" in N ? (F = Si(pn(N.y, 0, 1)), z = F.getUTCDay(), F = z > 4 || z === 0 ? gi.ceil(F) : gi(F), F = or.offset(F, (N.V - 1) * 7), N.y = F.getUTCFullYear(), N.m = F.getUTCMonth(), N.d = F.getUTCDate() + (N.w + 6) % 7) : (F = Fi(pn(N.y, 0, 1)), z = F.getDay(), F = z > 4 || z === 0 ? ci.ceil(F) : ci(F), F = ge.offset(F, (N.V - 1) * 7), N.y = F.getFullYear(), N.m = F.getMonth(), N.d = F.getDate() + (N.w + 6) % 7);
      } else ("W" in N || "U" in N) && ("w" in N || (N.w = "u" in N ? N.u % 7 : "W" in N ? 1 : 0), z = "Z" in N ? Si(pn(N.y, 0, 1)).getUTCDay() : Fi(pn(N.y, 0, 1)).getDay(), N.m = 0, N.d = "W" in N ? (N.w + 6) % 7 + N.W * 7 - (z + 5) % 7 : N.w + N.U * 7 - (z + 6) % 7);
      return "Z" in N ? (N.H += N.Z / 100 | 0, N.M += N.Z % 100, Si(N)) : Fi(N);
    };
  }
  function T(B, tt, G, N) {
    for (var J = 0, F = tt.length, z = G.length, V, Z; J < F; ) {
      if (N >= z) return -1;
      if (V = tt.charCodeAt(J++), V === 37) {
        if (V = tt.charAt(J++), Z = S[V in Gr ? tt.charAt(J++) : V], !Z || (N = Z(B, G, N)) < 0) return -1;
      } else if (V != G.charCodeAt(N++))
        return -1;
    }
    return N;
  }
  function M(B, tt, G) {
    var N = l.exec(tt.slice(G));
    return N ? (B.p = d.get(N[0].toLowerCase()), G + N[0].length) : -1;
  }
  function A(B, tt, G) {
    var N = g.exec(tt.slice(G));
    return N ? (B.w = v.get(N[0].toLowerCase()), G + N[0].length) : -1;
  }
  function w(B, tt, G) {
    var N = c.exec(tt.slice(G));
    return N ? (B.w = m.get(N[0].toLowerCase()), G + N[0].length) : -1;
  }
  function D(B, tt, G) {
    var N = E.exec(tt.slice(G));
    return N ? (B.m = k.get(N[0].toLowerCase()), G + N[0].length) : -1;
  }
  function x(B, tt, G) {
    var N = p.exec(tt.slice(G));
    return N ? (B.m = C.get(N[0].toLowerCase()), G + N[0].length) : -1;
  }
  function I(B, tt, G) {
    return T(B, e, tt, G);
  }
  function Y(B, tt, G) {
    return T(B, n, tt, G);
  }
  function L(B, tt, G) {
    return T(B, i, tt, G);
  }
  function ot(B) {
    return s[B.getDay()];
  }
  function _t(B) {
    return o[B.getDay()];
  }
  function Q(B) {
    return a[B.getMonth()];
  }
  function lt(B) {
    return f[B.getMonth()];
  }
  function nt(B) {
    return r[+(B.getHours() >= 12)];
  }
  function st(B) {
    return 1 + ~~(B.getMonth() / 3);
  }
  function At(B) {
    return s[B.getUTCDay()];
  }
  function X(B) {
    return o[B.getUTCDay()];
  }
  function P(B) {
    return a[B.getUTCMonth()];
  }
  function $(B) {
    return f[B.getUTCMonth()];
  }
  function dt(B) {
    return r[+(B.getUTCHours() >= 12)];
  }
  function b(B) {
    return 1 + ~~(B.getUTCMonth() / 3);
  }
  return {
    format: function(B) {
      var tt = U(B += "", y);
      return tt.toString = function() {
        return B;
      }, tt;
    },
    parse: function(B) {
      var tt = R(B += "", !1);
      return tt.toString = function() {
        return B;
      }, tt;
    },
    utcFormat: function(B) {
      var tt = U(B += "", _);
      return tt.toString = function() {
        return B;
      }, tt;
    },
    utcParse: function(B) {
      var tt = R(B += "", !0);
      return tt.toString = function() {
        return B;
      }, tt;
    }
  };
}
var Gr = { "-": "", _: " ", 0: "0" }, qt = /^\s*\d+/, jf = /^%/, th = /[\\^$*+?|[\]().{}]/g;
function Dt(t, e, n) {
  var i = t < 0 ? "-" : "", r = (i ? -t : t) + "", o = r.length;
  return i + (o < n ? new Array(n - o + 1).join(e) + r : r);
}
function eh(t) {
  return t.replace(th, "\\$&");
}
function yn(t) {
  return new RegExp("^(?:" + t.map(eh).join("|") + ")", "i");
}
function _n(t) {
  return new Map(t.map((e, n) => [e.toLowerCase(), n]));
}
function nh(t, e, n) {
  var i = qt.exec(e.slice(n, n + 1));
  return i ? (t.w = +i[0], n + i[0].length) : -1;
}
function ih(t, e, n) {
  var i = qt.exec(e.slice(n, n + 1));
  return i ? (t.u = +i[0], n + i[0].length) : -1;
}
function rh(t, e, n) {
  var i = qt.exec(e.slice(n, n + 2));
  return i ? (t.U = +i[0], n + i[0].length) : -1;
}
function oh(t, e, n) {
  var i = qt.exec(e.slice(n, n + 2));
  return i ? (t.V = +i[0], n + i[0].length) : -1;
}
function lh(t, e, n) {
  var i = qt.exec(e.slice(n, n + 2));
  return i ? (t.W = +i[0], n + i[0].length) : -1;
}
function Zr(t, e, n) {
  var i = qt.exec(e.slice(n, n + 4));
  return i ? (t.y = +i[0], n + i[0].length) : -1;
}
function Qr(t, e, n) {
  var i = qt.exec(e.slice(n, n + 2));
  return i ? (t.y = +i[0] + (+i[0] > 68 ? 1900 : 2e3), n + i[0].length) : -1;
}
function ah(t, e, n) {
  var i = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
  return i ? (t.Z = i[1] ? 0 : -(i[2] + (i[3] || "00")), n + i[0].length) : -1;
}
function sh(t, e, n) {
  var i = qt.exec(e.slice(n, n + 1));
  return i ? (t.q = i[0] * 3 - 3, n + i[0].length) : -1;
}
function uh(t, e, n) {
  var i = qt.exec(e.slice(n, n + 2));
  return i ? (t.m = i[0] - 1, n + i[0].length) : -1;
}
function Or(t, e, n) {
  var i = qt.exec(e.slice(n, n + 2));
  return i ? (t.d = +i[0], n + i[0].length) : -1;
}
function fh(t, e, n) {
  var i = qt.exec(e.slice(n, n + 3));
  return i ? (t.m = 0, t.d = +i[0], n + i[0].length) : -1;
}
function Jr(t, e, n) {
  var i = qt.exec(e.slice(n, n + 2));
  return i ? (t.H = +i[0], n + i[0].length) : -1;
}
function hh(t, e, n) {
  var i = qt.exec(e.slice(n, n + 2));
  return i ? (t.M = +i[0], n + i[0].length) : -1;
}
function ch(t, e, n) {
  var i = qt.exec(e.slice(n, n + 2));
  return i ? (t.S = +i[0], n + i[0].length) : -1;
}
function gh(t, e, n) {
  var i = qt.exec(e.slice(n, n + 3));
  return i ? (t.L = +i[0], n + i[0].length) : -1;
}
function dh(t, e, n) {
  var i = qt.exec(e.slice(n, n + 6));
  return i ? (t.L = Math.floor(i[0] / 1e3), n + i[0].length) : -1;
}
function mh(t, e, n) {
  var i = jf.exec(e.slice(n, n + 1));
  return i ? n + i[0].length : -1;
}
function vh(t, e, n) {
  var i = qt.exec(e.slice(n));
  return i ? (t.Q = +i[0], n + i[0].length) : -1;
}
function wh(t, e, n) {
  var i = qt.exec(e.slice(n));
  return i ? (t.s = +i[0], n + i[0].length) : -1;
}
function $r(t, e) {
  return Dt(t.getDate(), e, 2);
}
function ph(t, e) {
  return Dt(t.getHours(), e, 2);
}
function yh(t, e) {
  return Dt(t.getHours() % 12 || 12, e, 2);
}
function _h(t, e) {
  return Dt(1 + ge.count(Be(t), t), e, 3);
}
function el(t, e) {
  return Dt(t.getMilliseconds(), e, 3);
}
function xh(t, e) {
  return el(t, e) + "000";
}
function bh(t, e) {
  return Dt(t.getMonth() + 1, e, 2);
}
function Mh(t, e) {
  return Dt(t.getMinutes(), e, 2);
}
function Th(t, e) {
  return Dt(t.getSeconds(), e, 2);
}
function kh(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function Ch(t, e) {
  return Dt(jo.count(Be(t) - 1, t), e, 2);
}
function nl(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? un(t) : un.ceil(t);
}
function Ah(t, e) {
  return t = nl(t), Dt(un.count(Be(t), t) + (Be(t).getDay() === 4), e, 2);
}
function Nh(t) {
  return t.getDay();
}
function Dh(t, e) {
  return Dt(ci.count(Be(t) - 1, t), e, 2);
}
function Fh(t, e) {
  return Dt(t.getFullYear() % 100, e, 2);
}
function Sh(t, e) {
  return t = nl(t), Dt(t.getFullYear() % 100, e, 2);
}
function Eh(t, e) {
  return Dt(t.getFullYear() % 1e4, e, 4);
}
function Rh(t, e) {
  var n = t.getDay();
  return t = n >= 4 || n === 0 ? un(t) : un.ceil(t), Dt(t.getFullYear() % 1e4, e, 4);
}
function Lh(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + Dt(e / 60 | 0, "0", 2) + Dt(e % 60, "0", 2);
}
function Kr(t, e) {
  return Dt(t.getUTCDate(), e, 2);
}
function Uh(t, e) {
  return Dt(t.getUTCHours(), e, 2);
}
function Hh(t, e) {
  return Dt(t.getUTCHours() % 12 || 12, e, 2);
}
function Ph(t, e) {
  return Dt(1 + or.count(Xe(t), t), e, 3);
}
function il(t, e) {
  return Dt(t.getUTCMilliseconds(), e, 3);
}
function zh(t, e) {
  return il(t, e) + "000";
}
function Yh(t, e) {
  return Dt(t.getUTCMonth() + 1, e, 2);
}
function qh(t, e) {
  return Dt(t.getUTCMinutes(), e, 2);
}
function Ih(t, e) {
  return Dt(t.getUTCSeconds(), e, 2);
}
function Vh(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function Wh(t, e) {
  return Dt(tl.count(Xe(t) - 1, t), e, 2);
}
function rl(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? fn(t) : fn.ceil(t);
}
function Bh(t, e) {
  return t = rl(t), Dt(fn.count(Xe(t), t) + (Xe(t).getUTCDay() === 4), e, 2);
}
function Xh(t) {
  return t.getUTCDay();
}
function Gh(t, e) {
  return Dt(gi.count(Xe(t) - 1, t), e, 2);
}
function Zh(t, e) {
  return Dt(t.getUTCFullYear() % 100, e, 2);
}
function Qh(t, e) {
  return t = rl(t), Dt(t.getUTCFullYear() % 100, e, 2);
}
function Oh(t, e) {
  return Dt(t.getUTCFullYear() % 1e4, e, 4);
}
function Jh(t, e) {
  var n = t.getUTCDay();
  return t = n >= 4 || n === 0 ? fn(t) : fn.ceil(t), Dt(t.getUTCFullYear() % 1e4, e, 4);
}
function $h() {
  return "+0000";
}
function jr() {
  return "%";
}
function to(t) {
  return +t;
}
function eo(t) {
  return Math.floor(+t / 1e3);
}
var je, Sn, ol;
Kh({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function Kh(t) {
  return je = Kf(t), Sn = je.format, je.parse, ol = je.utcFormat, je.utcParse, je;
}
function Yt(t) {
  return function() {
    return t;
  };
}
function ll(t) {
  let e = 3;
  return t.digits = function(n) {
    if (!arguments.length) return e;
    if (n == null)
      e = null;
    else {
      const i = Math.floor(n);
      if (!(i >= 0)) throw new RangeError(`invalid digits: ${n}`);
      e = i;
    }
    return t;
  }, () => new pf(e);
}
function al(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function sl(t) {
  this._context = t;
}
sl.prototype = {
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
function ul(t) {
  return new sl(t);
}
function fl(t) {
  return t[0];
}
function hl(t) {
  return t[1];
}
function En(t, e) {
  var n = Yt(!0), i = null, r = ul, o = null, s = ll(f);
  t = typeof t == "function" ? t : t === void 0 ? fl : Yt(t), e = typeof e == "function" ? e : e === void 0 ? hl : Yt(e);
  function f(a) {
    var l, d = (a = al(a)).length, c, m = !1, g;
    for (i == null && (o = r(g = s())), l = 0; l <= d; ++l)
      !(l < d && n(c = a[l], l, a)) === m && ((m = !m) ? o.lineStart() : o.lineEnd()), m && o.point(+t(c, l, a), +e(c, l, a));
    if (g) return o = null, g + "" || null;
  }
  return f.x = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : Yt(+a), f) : t;
  }, f.y = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Yt(+a), f) : e;
  }, f.defined = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : Yt(!!a), f) : n;
  }, f.curve = function(a) {
    return arguments.length ? (r = a, i != null && (o = r(i)), f) : r;
  }, f.context = function(a) {
    return arguments.length ? (a == null ? i = o = null : o = r(i = a), f) : i;
  }, f;
}
function ce(t, e, n) {
  var i = null, r = Yt(!0), o = null, s = ul, f = null, a = ll(l);
  t = typeof t == "function" ? t : t === void 0 ? fl : Yt(+t), e = typeof e == "function" ? e : Yt(e === void 0 ? 0 : +e), n = typeof n == "function" ? n : n === void 0 ? hl : Yt(+n);
  function l(c) {
    var m, g, v, p = (c = al(c)).length, C, E = !1, k, y = new Array(p), _ = new Array(p);
    for (o == null && (f = s(k = a())), m = 0; m <= p; ++m) {
      if (!(m < p && r(C = c[m], m, c)) === E)
        if (E = !E)
          g = m, f.areaStart(), f.lineStart();
        else {
          for (f.lineEnd(), f.lineStart(), v = m - 1; v >= g; --v)
            f.point(y[v], _[v]);
          f.lineEnd(), f.areaEnd();
        }
      E && (y[m] = +t(C, m, c), _[m] = +e(C, m, c), f.point(i ? +i(C, m, c) : y[m], n ? +n(C, m, c) : _[m]));
    }
    if (k) return f = null, k + "" || null;
  }
  function d() {
    return En().defined(r).curve(s).context(o);
  }
  return l.x = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : Yt(+c), i = null, l) : t;
  }, l.x0 = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : Yt(+c), l) : t;
  }, l.x1 = function(c) {
    return arguments.length ? (i = c == null ? null : typeof c == "function" ? c : Yt(+c), l) : i;
  }, l.y = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : Yt(+c), n = null, l) : e;
  }, l.y0 = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : Yt(+c), l) : e;
  }, l.y1 = function(c) {
    return arguments.length ? (n = c == null ? null : typeof c == "function" ? c : Yt(+c), l) : n;
  }, l.lineX0 = l.lineY0 = function() {
    return d().x(t).y(e);
  }, l.lineY1 = function() {
    return d().x(t).y(n);
  }, l.lineX1 = function() {
    return d().x(i).y(e);
  }, l.defined = function(c) {
    return arguments.length ? (r = typeof c == "function" ? c : Yt(!!c), l) : r;
  }, l.curve = function(c) {
    return arguments.length ? (s = c, o != null && (f = s(o)), l) : s;
  }, l.context = function(c) {
    return arguments.length ? (c == null ? o = f = null : f = s(o = c), l) : o;
  }, l;
}
function no(t) {
  return t < 0 ? -1 : 1;
}
function io(t, e, n) {
  var i = t._x1 - t._x0, r = e - t._x1, o = (t._y1 - t._y0) / (i || r < 0 && -0), s = (n - t._y1) / (r || i < 0 && -0), f = (o * r + s * i) / (i + r);
  return (no(o) + no(s)) * Math.min(Math.abs(o), Math.abs(s), 0.5 * Math.abs(f)) || 0;
}
function ro(t, e) {
  var n = t._x1 - t._x0;
  return n ? (3 * (t._y1 - t._y0) / n - e) / 2 : e;
}
function Ei(t, e, n) {
  var i = t._x0, r = t._y0, o = t._x1, s = t._y1, f = (o - i) / 3;
  t._context.bezierCurveTo(i + f, r + f * e, o - f, s - f * n, o, s);
}
function di(t) {
  this._context = t;
}
di.prototype = {
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
        Ei(this, this._t0, ro(this, this._t0));
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
          this._point = 3, Ei(this, ro(this, n = io(this, t, e)), n);
          break;
        default:
          Ei(this, this._t0, n = io(this, t, e));
          break;
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = n;
    }
  }
};
Object.create(di.prototype).point = function(t, e) {
  di.prototype.point.call(this, e, t);
};
function Ri(t) {
  return new di(t);
}
function Dn(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
Dn.prototype = {
  constructor: Dn,
  scale: function(t) {
    return t === 1 ? this : new Dn(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Dn(this.k, this.x + this.k * t, this.y + this.k * e);
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
Dn.prototype;
function jh(t) {
  let e, n, i, r, o, s, f, a = (
    /*showCanvas*/
    t[0] ? "-" : "="
  ), l, d, c, m, g, v, p, C, E, k, y, _, S, U, R, T, M, A, w, D, x, I, Y, L, ot, _t, Q, lt, nt, st, At, X;
  return {
    c() {
      e = q("div"), n = q("canvas"), r = et(), o = q("div"), s = q("div"), f = q("button"), l = H(a), d = et(), c = q("div"), m = H(
        /*periodLabel*/
        t[4]
      ), g = et(), v = q("div"), p = q("div"), C = q("button"), E = H("1d"), y = et(), _ = q("button"), S = H("3d"), R = et(), T = q("button"), M = H("1w"), w = et(), D = q("button"), x = H("2w"), Y = et(), L = q("button"), ot = H("1m"), Q = et(), lt = q("button"), nt = H("3m"), u(n, "style", i = `width:100%; display:${/*showCanvas*/
      t[0] ? "block" : "none"}; border:0;`), u(f, "type", "button"), u(f, "class", "qbtn svelte-1xibldd"), u(f, "title", "Hide/show calendar canvas"), j(s, "display", "flex"), j(s, "gap", "8px"), j(s, "align-items", "center"), j(s, "justify-content", "flex-end"), j(s, "flex", "0 0 auto"), j(c, "text-align", "left"), j(c, "color", "#000"), j(c, "font-size", "12px"), j(c, "font-weight", "600"), j(c, "min-width", "160px"), j(c, "flex", "1 1 auto"), u(C, "type", "button"), u(C, "class", k = ae(`qbtn ${/*activeSpan*/
      t[3] === 1 ? "active" : ""}`) + " svelte-1xibldd"), u(_, "type", "button"), u(_, "class", U = ae(`qbtn ${/*activeSpan*/
      t[3] === 3 ? "active" : ""}`) + " svelte-1xibldd"), u(T, "type", "button"), u(T, "class", A = ae(`qbtn ${/*activeSpan*/
      t[3] === 7 ? "active" : ""}`) + " svelte-1xibldd"), u(D, "type", "button"), u(D, "class", I = ae(`qbtn ${/*activeSpan*/
      t[3] === 14 ? "active" : ""}`) + " svelte-1xibldd"), u(L, "type", "button"), u(L, "class", _t = ae(`qbtn ${/*activeSpan*/
      t[3] === 30 ? "active" : ""}`) + " svelte-1xibldd"), u(lt, "type", "button"), u(lt, "class", st = ae(`qbtn ${/*activeSpan*/
      t[3] === 90 ? "active" : ""}`) + " svelte-1xibldd"), j(p, "display", "flex"), j(p, "gap", "16px"), j(p, "flex-wrap", "wrap"), j(p, "justify-content", "flex-end"), j(v, "display", "flex"), j(v, "align-items", "center"), j(v, "gap", "20px"), j(v, "justify-content", "flex-end"), j(v, "margin-left", "auto"), u(o, "id", "controlBar"), j(o, "display", "flex"), j(o, "align-items", "center"), j(o, "gap", "12px"), j(o, "flex-wrap", "wrap"), j(o, "margin", "0 0 6px"), u(e, "class", "cgm-widget"), j(e, "contain", "layout");
    },
    m(P, $) {
      Lt(P, e, $), h(e, n), t[15](n), h(e, r), h(e, o), h(o, s), h(s, f), h(f, l), h(o, d), h(o, c), h(c, m), t[17](c), h(o, g), h(o, v), h(v, p), h(p, C), h(C, E), h(p, y), h(p, _), h(_, S), h(p, R), h(p, T), h(T, M), h(p, w), h(p, D), h(D, x), h(p, Y), h(p, L), h(L, ot), h(p, Q), h(p, lt), h(lt, nt), At || (X = [
        Pe(
          f,
          "click",
          /*click_handler*/
          t[16]
        ),
        Pe(
          C,
          "click",
          /*click_handler_1*/
          t[18]
        ),
        Pe(
          _,
          "click",
          /*click_handler_2*/
          t[19]
        ),
        Pe(
          T,
          "click",
          /*click_handler_3*/
          t[20]
        ),
        Pe(
          D,
          "click",
          /*click_handler_4*/
          t[21]
        ),
        Pe(
          L,
          "click",
          /*click_handler_5*/
          t[22]
        ),
        Pe(
          lt,
          "click",
          /*click_handler_6*/
          t[23]
        )
      ], At = !0);
    },
    p(P, $) {
      $[0] & /*showCanvas*/
      1 && i !== (i = `width:100%; display:${/*showCanvas*/
      P[0] ? "block" : "none"}; border:0;`) && u(n, "style", i), $[0] & /*showCanvas*/
      1 && a !== (a = /*showCanvas*/
      P[0] ? "-" : "=") && Ct(l, a), $[0] & /*periodLabel*/
      16 && Ct(
        m,
        /*periodLabel*/
        P[4]
      ), $[0] & /*activeSpan*/
      8 && k !== (k = ae(`qbtn ${/*activeSpan*/
      P[3] === 1 ? "active" : ""}`) + " svelte-1xibldd") && u(C, "class", k), $[0] & /*activeSpan*/
      8 && U !== (U = ae(`qbtn ${/*activeSpan*/
      P[3] === 3 ? "active" : ""}`) + " svelte-1xibldd") && u(_, "class", U), $[0] & /*activeSpan*/
      8 && A !== (A = ae(`qbtn ${/*activeSpan*/
      P[3] === 7 ? "active" : ""}`) + " svelte-1xibldd") && u(T, "class", A), $[0] & /*activeSpan*/
      8 && I !== (I = ae(`qbtn ${/*activeSpan*/
      P[3] === 14 ? "active" : ""}`) + " svelte-1xibldd") && u(D, "class", I), $[0] & /*activeSpan*/
      8 && _t !== (_t = ae(`qbtn ${/*activeSpan*/
      P[3] === 30 ? "active" : ""}`) + " svelte-1xibldd") && u(L, "class", _t), $[0] & /*activeSpan*/
      8 && st !== (st = ae(`qbtn ${/*activeSpan*/
      P[3] === 90 ? "active" : ""}`) + " svelte-1xibldd") && u(lt, "class", st);
    },
    i: kt,
    o: kt,
    d(P) {
      P && Rt(e), t[15](null), t[17](null), At = !1, zn(X);
    }
  };
}
const he = 54;
function tc(t, e, n) {
  let { data: i } = e, { initialRange: r = null } = e, { externalRange: o = null } = e, { preset: s = "N" } = e, { showMonthLabels: f = !0 } = e, { showData: a = !0 } = e, { showCanvas: l = !0 } = e;
  const d = hn();
  let c, m;
  const g = { l: 48, r: 12, t: 8, b: 8 }, v = [1, 3, 7, 14, 30, 90];
  let p, C, E = 24 * 60 * 60 * 1e3;
  const k = () => new Date(i.t0).getTime(), y = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol");
  function _() {
    return y() ? s === "T" ? {
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
  let S = 0, U = 0, R = 0, T = 0;
  function M(F) {
    let z = v[0], V = 1 / 0;
    for (const Z of v) {
      const K = Math.abs(Z - F);
      K < V && (V = K, z = Z);
    }
    return z;
  }
  function A() {
    return Math.max(1, Math.floor((T - R) / E) + 1);
  }
  let w = 14;
  const D = (F) => {
    const z = new Date(F);
    return Date.UTC(z.getUTCFullYear(), z.getUTCMonth(), z.getUTCDate());
  };
  let x;
  function I() {
    x = /* @__PURE__ */ new Map();
    for (let F = 0; F < C.length; F++) {
      const z = C[F];
      if (!(Number.isFinite(z) && z >= 0)) continue;
      const V = D(p[F]);
      let Z = x.get(V);
      Z || (Z = { valid: 0, vl: 0, l: 0, t: 0, h: 0, vh: 0 }, x.set(V, Z)), Z.valid++;
      const K = _();
      z < K.vlow ? Z.vl++ : z < K.low ? Z.l++ : z <= K.high ? Z.t++ : z <= K.vhigh ? Z.h++ : Z.vh++;
    }
  }
  function Y() {
    p = Float64Array.from({ length: i.glucose.length }, (F, z) => k() + z * i.stepMs), n(12, C = Float64Array.from(i.glucose)), S = D(p[0]), U = D(p[p.length - 1]), n(13, R = (r == null ? void 0 : r.start) ?? S), n(14, T = (r == null ? void 0 : r.end) ?? U), I();
  }
  let L;
  function ot() {
    if (!c || !(x != null && x.size)) return;
    const F = Math.max(1, window.devicePixelRatio || 1), z = Math.max(320, c.getBoundingClientRect().width || 900), V = new Date(S).getUTCFullYear(), Z = new Date(U).getUTCFullYear(), K = Pi(V, Z + 1), pt = f ? 24 : g.b, Mt = g.t + K.length * he + pt;
    n(1, c.style.width = z + "px", c), n(1, c.style.height = Mt + "px", c), n(1, c.width = Math.floor(z * F), c), n(1, c.height = Math.floor(Mt * F), c), L.setTransform(F, 0, 0, F, 0, 0), L.clearRect(0, 0, z, Mt), L.fillStyle = "#fff", L.fillRect(0, 0, z, Mt);
    const ut = z - g.l - g.r;
    if (L.strokeStyle = "#f0f0f0", L.lineWidth = 1, K.forEach((mt, Tt) => {
      const vt = g.t + Tt * he;
      for (let yt = 1; yt < 12; yt++) {
        const rt = Date.UTC(mt, yt, 1);
        if (rt < S || rt > U) continue;
        const wt = (Date.UTC(mt + 1, 0, 1) - Date.UTC(mt, 0, 1)) / E, it = g.l + Math.round((rt - Date.UTC(mt, 0, 1)) / E * (ut / wt));
        L.beginPath(), L.moveTo(it, vt + 6), L.lineTo(it, vt + he - 6), L.stroke();
      }
    }), K.forEach((mt, Tt) => {
      const vt = g.t + Tt * he;
      L.fillStyle = "#444", L.font = "12px system-ui, sans-serif", L.textAlign = "right", L.textBaseline = "middle", L.fillText(String(mt), g.l - 8, vt + he / 2);
      const yt = Date.UTC(mt, 0, 1), rt = Date.UTC(mt + 1, 0, 1) - E, wt = Math.round((Date.UTC(mt + 1, 0, 1) - Date.UTC(mt, 0, 1)) / E), it = (at) => g.l + Math.floor((at - Date.UTC(mt, 0, 1)) / E * (ut / wt)), ft = he - 10, gt = vt + 5;
      if (!a) {
        L.fillStyle = "#efefef";
        for (let at = Math.max(yt, S); at <= Math.min(rt, U); at += E) {
          const bt = it(at), W = it(at + E), xt = Math.max(1, W - bt);
          L.fillRect(bt, gt, xt, ft);
        }
        return;
      }
      for (let at = Math.max(yt, S); at <= Math.min(rt, U); at += E) {
        const bt = it(at), W = it(at + E), xt = Math.max(1, W - bt), ht = x.get(at);
        if (!ht || !ht.valid) {
          L.fillStyle = "#efefef", L.globalAlpha = 1, L.fillRect(bt, gt, xt, ft);
          continue;
        }
        const Et = Math.max(1, Math.round(E / i.stepMs)), Ht = {
          vl: ht.vl / ht.valid,
          l: ht.l / ht.valid,
          t: ht.t / ht.valid,
          h: ht.h / ht.valid,
          vh: ht.vh / ht.valid
        };
        let Vt = gt + ft;
        const It = (ue, Ut, Nt) => {
          const Ft = Math.round(Ut * ft);
          Ft <= 0 || (Vt -= Ft, L.fillStyle = ue, L.globalAlpha = Nt, L.fillRect(bt, Vt, xt, Ft));
        }, zt = ht.valid / Et >= 0.5 ? 0.8 : 0.4, Xt = ht.valid / Et >= 0.5 ? 0.9 : 0.6;
        It("#e57373", Ht.vl, zt), It("#ff9e80", Ht.l, zt), It("#86c89d", Ht.t, Xt), It("#ffcc80", Ht.h, zt), It("#ff8a65", Ht.vh, zt), L.globalAlpha = 1;
      }
    }), a) {
      const mt = Math.max(S, Math.min(U, R)), Tt = Math.max(S, Math.min(U, T));
      K.forEach((vt, yt) => {
        const rt = g.t + yt * he, wt = Date.UTC(vt, 0, 1), it = Date.UTC(vt + 1, 0, 1) - 1, ft = Math.max(wt, mt), gt = Math.min(it, Tt);
        if (ft > gt) return;
        const at = (Date.UTC(vt + 1, 0, 1) - Date.UTC(vt, 0, 1)) / E, bt = (Ht) => g.l + Math.floor((Ht - Date.UTC(vt, 0, 1)) / E * (ut / at)), W = bt(ft), xt = bt(gt + 1), ht = rt + 5, Et = he - 10;
        L.save(), L.fillStyle = "rgba(107,127,161,0.28)", L.fillRect(W, ht, Math.max(1, xt - W), Et), L.strokeStyle = "#6b7fa1", L.lineWidth = 1.5, L.beginPath(), L.moveTo(W + 0.5, ht + 0.5), L.lineTo(W + 0.5, ht + Et - 0.5), L.stroke(), L.beginPath(), L.moveTo(xt - 0.5, ht + 0.5), L.lineTo(xt - 0.5, ht + Et - 0.5), L.stroke(), L.restore();
      });
    }
    if (f) {
      const mt = ol("%b"), Tt = K[K.length - 1], vt = Date.UTC(Tt, 0, 1), rt = (Date.UTC(Tt + 1, 0, 1) - vt) / E, wt = (gt) => g.l + Math.round((gt - vt) / E * (ut / rt)), ft = g.t + (K.length - 1) * he + he - 5 + 0.5;
      L.save(), L.strokeStyle = "#bbb", L.lineWidth = 1, L.fillStyle = "#555", L.font = "11px system-ui, sans-serif", L.textAlign = "center", L.textBaseline = "top";
      for (let gt = 0; gt < 12; gt++) {
        const at = Date.UTC(Tt, gt, 1), bt = wt(at);
        L.beginPath(), L.moveTo(bt, ft), L.lineTo(bt, ft + 4), L.stroke(), L.fillText(mt(new Date(Date.UTC(2e3, gt, 1))), bt, ft + 6);
      }
      L.restore();
    }
  }
  function _t(F, z) {
    const V = new Date(F), Z = new Date(z), K = Sn("%b %e"), pt = Sn("%b %e, %Y"), Mt = Sn("%e, %Y"), ut = Date.UTC(V.getUTCFullYear(), V.getUTCMonth(), V.getUTCDate()), mt = Date.UTC(Z.getUTCFullYear(), Z.getUTCMonth(), Z.getUTCDate());
    return ut === mt ? pt(Z) : V.getFullYear() === Z.getFullYear() ? V.getMonth() === Z.getMonth() ? `${K(V)} – ${Mt(Z)}` : `${K(V)} – ${pt(Z)}` : `${pt(V)} – ${pt(Z)}`;
  }
  let Q = "";
  function lt() {
    const F = A();
    n(3, w = M(F));
    const z = Math.max(0, Math.ceil((R - p[0]) / i.stepMs)), V = Math.min(C.length - 1, Math.floor((T - p[0]) / i.stepMs));
    try {
      typeof window < "u" && window.CGM_DEBUG && console.log("[CgmTir] rangechange", {
        startISO: new Date(R).toISOString(),
        endISO: new Date(T).toISOString(),
        days: F,
        startIdx: z,
        endIdx: V
      });
    } catch {
    }
    d("rangechange", {
      start: R,
      end: T,
      days: F,
      startIdx: z,
      endIdx: V
    });
  }
  function nt(F) {
    n(14, T = U), n(13, R = Math.max(S, T - F * E + 1)), lt(), ot();
  }
  function st(F) {
    const z = R + F * E, V = T + F * E, Z = Math.max(E, V - z);
    n(13, R = Math.max(S, Math.min(U - Z, z))), n(14, T = Math.min(U, R + Z)), lt(), ot();
  }
  function At(F) {
    const z = A() * E * F;
    st(z / E);
  }
  function X() {
    const F = c;
    let z = !1, V = null, Z = null, K = 0, pt = 0;
    const Mt = 6, ut = (yt) => {
      const rt = new Date(yt);
      return Date.UTC(rt.getUTCFullYear(), rt.getUTCMonth(), rt.getUTCDate());
    };
    function mt() {
      const yt = Math.max(320, F.getBoundingClientRect().width || 900), rt = yt - g.l - g.r, wt = Pi(new Date(S).getUTCFullYear(), new Date(U).getUTCFullYear() + 1);
      return { cssW: yt, plotW: rt, years: wt };
    }
    function Tt(yt, rt) {
      const wt = (Date.UTC(yt + 1, 0, 1) - Date.UTC(yt, 0, 1)) / E;
      return (it) => g.l + Math.floor((it - Date.UTC(yt, 0, 1)) / E * (rt / wt));
    }
    function vt(yt) {
      const rt = F.getBoundingClientRect(), wt = yt.clientX - rt.left, it = yt.clientY - rt.top, { cssW: ft, years: gt } = mt(), at = Math.floor((it - 8) / he);
      if (at < 0 || at >= gt.length) return null;
      const bt = gt[at], W = g.l, xt = ft - g.r, ht = Math.max(W, Math.min(xt, wt)), Et = (Date.UTC(bt + 1, 0, 1) - Date.UTC(bt, 0, 1)) / E, Ht = (ht - W) / (xt - W);
      let Vt = Date.UTC(bt, 0, 1) + Ht * Et * E;
      return Vt = Math.max(S, Math.min(U, Vt)), { t: Vt, yr: bt, x: ht, rowIdx: at };
    }
    F.addEventListener("mousedown", (yt) => {
      const rt = vt(yt);
      if (!rt) return;
      const { plotW: wt } = mt(), it = Tt(rt.yr, wt), ft = it(Math.max(Date.UTC(rt.yr, 0, 1), R)), gt = it(Math.min(Date.UTC(rt.yr + 1, 0, 1) - 1, T)) + 1;
      V = "new", rt.x >= ft - Mt && rt.x <= ft + Mt ? V = "resize-l" : rt.x >= gt - Mt && rt.x <= gt + Mt ? V = "resize-r" : rt.x > ft && rt.x < gt && (V = "move"), z = !0, Z = rt.t, K = R, pt = T, document.body.style.userSelect = "none", F.style.cursor = V === "move" ? "grabbing" : V === "new" ? "crosshair" : "col-resize";
    }), window.addEventListener("mousemove", (yt) => {
      const rt = vt(yt);
      if (!rt) {
        z || (F.style.cursor = "crosshair");
        return;
      }
      if (!z) {
        const { plotW: ft } = mt(), gt = Tt(rt.yr, ft), at = gt(Math.max(Date.UTC(rt.yr, 0, 1), R)), bt = gt(Math.min(Date.UTC(rt.yr + 1, 0, 1) - 1, T)) + 1;
        rt.x >= at - Mt && rt.x <= at + Mt || rt.x >= bt - Mt && rt.x <= bt + Mt ? F.style.cursor = "col-resize" : rt.x > at && rt.x < bt ? F.style.cursor = "grab" : F.style.cursor = "crosshair";
        return;
      }
      const wt = rt.t, it = E;
      if (V === "new") {
        const ft = ut(Math.min(Z, wt)), gt = ut(Math.max(Z, wt));
        let at = Math.max(1, Math.floor((gt - ft) / it) + 1);
        const bt = M(at);
        if (wt >= Z) {
          let W = ft, xt = W + bt * it - 1;
          xt > U && (xt = U, W = Math.max(S, xt - bt * it + 1)), n(13, R = W), n(14, T = xt);
        } else {
          let W = gt + it - 1, xt = W - bt * it + 1;
          xt < S && (xt = S, W = Math.min(U, xt + bt * it - 1)), n(13, R = xt), n(14, T = W);
        }
      } else if (V === "resize-l") {
        const ft = Math.max(1, Math.floor((pt - ut(Math.min(wt, pt - it + 1)) + 1) / it)), gt = M(ft);
        let at = pt - gt * it + 1;
        at = Math.max(S, Math.min(at, pt - it + 1)), n(13, R = at), n(14, T = pt);
      } else if (V === "resize-r") {
        const ft = Math.max(1, Math.floor((ut(wt) + it - 1 - K + 1) / it)), gt = M(ft);
        let at = K + gt * it - 1;
        at = Math.min(U, Math.max(at, K + it - 1)), n(13, R = K), n(14, T = at);
      } else if (V === "move") {
        const ft = Math.round((ut(wt) - ut(Z)) / it), gt = pt - K + 1;
        let at = K + ft * it;
        at = Math.max(S, Math.min(U - gt + 1, at)), n(13, R = at), n(14, T = at + gt - 1);
      }
      lt(), ot();
    }), window.addEventListener("mouseup", () => {
      z && (z = !1, V = null, Z = null, document.body.style.userSelect = "", F.style.cursor = "crosshair");
    });
  }
  Te(() => {
    L = c.getContext("2d"), Y(), ot();
    const F = Math.max(0, Math.ceil((R - p[0]) / i.stepMs)), z = Math.min(C.length - 1, Math.floor((T - p[0]) / i.stepMs));
    d("ready", {
      start: R,
      end: T,
      startIdx: F,
      endIdx: z,
      days: A()
    }), lt(), X();
    const V = () => ot(), Z = (K) => {
      const pt = K.target && K.target.tagName ? K.target.tagName.toLowerCase() : "";
      if (!(pt === "input" || pt === "textarea" || pt === "select" || K.defaultPrevented)) {
        if (/^[1-6]$/.test(K.key)) {
          const ut = {
            1: 1,
            2: 3,
            3: 7,
            4: 14,
            5: 30,
            6: 90
          }[K.key];
          nt(ut), K.preventDefault();
          return;
        }
        if (K.key === "ArrowLeft" || K.key === "ArrowRight") {
          K.shiftKey ? At(K.key === "ArrowLeft" ? -1 : 1) : st(K.key === "ArrowLeft" ? -1 : 1), K.preventDefault();
          return;
        }
      }
    };
    return window.addEventListener("resize", V), window.addEventListener("keydown", Z), () => window.removeEventListener("resize", V);
  });
  function P(F) {
    Me[F ? "unshift" : "push"](() => {
      c = F, n(1, c);
    });
  }
  const $ = () => {
    n(0, l = !l);
  };
  function dt(F) {
    Me[F ? "unshift" : "push"](() => {
      m = F, n(2, m);
    });
  }
  const b = () => nt(1), B = () => nt(3), tt = () => nt(7), G = () => nt(14), N = () => nt(30), J = () => nt(90);
  return t.$$set = (F) => {
    "data" in F && n(6, i = F.data), "initialRange" in F && n(7, r = F.initialRange), "externalRange" in F && n(8, o = F.externalRange), "preset" in F && n(9, s = F.preset), "showMonthLabels" in F && n(10, f = F.showMonthLabels), "showData" in F && n(11, a = F.showData), "showCanvas" in F && n(0, l = F.showCanvas);
  }, t.$$.update = () => {
    if (t.$$.dirty[0] & /*externalRange, viewStart, viewEnd*/
    24832 && o && typeof o.start == "number" && typeof o.end == "number") {
      const F = o.start, z = o.end;
      (F !== R || z !== T) && (n(13, R = F), n(14, T = z), lt(), ot());
    }
    t.$$.dirty[0] & /*viewStart, viewEnd*/
    24576 && n(4, Q = _t(R, T)), t.$$.dirty[0] & /*values, preset*/
    4608 && C && s && (I(), ot());
  }, n(3, w = M(A())), [
    l,
    c,
    m,
    w,
    Q,
    nt,
    i,
    r,
    o,
    s,
    f,
    a,
    C,
    R,
    T,
    P,
    $,
    dt,
    b,
    B,
    tt,
    G,
    N,
    J
  ];
}
class ec extends le {
  constructor(e) {
    super(), oe(
      this,
      e,
      tc,
      jh,
      re,
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
function nc(t) {
  let e, n, i, r, o, s, f, a, l, d, c, m, g, v, p, C, E, k, y, _, S, U;
  return {
    c() {
      e = q("div"), n = q("div"), i = q("div"), r = q("b"), r.textContent = "Average Glucose", o = q("div"), o.textContent = `Goal: ${/*isMmol*/
      t[4]() ? `Target ${/*TH*/
      t[5]().low.toFixed(1)}–${/*TH*/
      t[5]().high.toFixed(1)} mmol/L` : `Target ${Math.round(
        /*TH*/
        t[5]().low
      )}–${Math.round(
        /*TH*/
        t[5]().high
      )} mg/dL`}`, s = q("div"), f = H(
        /*avgText*/
        t[0]
      ), a = et(), l = q("div"), d = q("div"), d.innerHTML = '<b>Glucose Management Indicator (GMI)</b><div class="muted svelte-1bp5ihd">Goal: &lt;7%</div>', c = q("div"), m = H(
        /*gmiText*/
        t[1]
      ), g = et(), v = q("div"), p = q("div"), p.innerHTML = '<b>Glucose Variability (CV)</b><div class="muted svelte-1bp5ihd">Goal: ≤36%</div>', C = q("div"), E = H(
        /*cvText*/
        t[2]
      ), k = et(), y = q("div"), _ = H("Time CGM Active: "), S = H(
        /*activeText*/
        t[3]
      ), U = H("%"), u(o, "class", "muted svelte-1bp5ihd"), u(i, "class", "svelte-1bp5ihd"), u(s, "class", "svelte-1bp5ihd"), u(n, "class", "metric svelte-1bp5ihd"), u(d, "class", "svelte-1bp5ihd"), u(c, "class", "svelte-1bp5ihd"), u(l, "class", "metric svelte-1bp5ihd"), u(p, "class", "svelte-1bp5ihd"), u(C, "class", "svelte-1bp5ihd"), u(v, "class", "metric svelte-1bp5ihd"), u(y, "class", "muted svelte-1bp5ihd"), j(y, "font-size", "11px"), j(y, "margin-top", "6px"), j(y, "margin-left", "8px"), u(e, "class", "summary"), j(e, "padding", "0 10px");
    },
    m(R, T) {
      Lt(R, e, T), h(e, n), h(n, i), h(i, r), h(i, o), h(n, s), h(s, f), h(e, a), h(e, l), h(l, d), h(l, c), h(c, m), h(e, g), h(e, v), h(v, p), h(v, C), h(C, E), h(e, k), h(e, y), h(y, _), h(y, S), h(y, U);
    },
    p(R, [T]) {
      T & /*avgText*/
      1 && Ct(
        f,
        /*avgText*/
        R[0]
      ), T & /*gmiText*/
      2 && Ct(
        m,
        /*gmiText*/
        R[1]
      ), T & /*cvText*/
      4 && Ct(
        E,
        /*cvText*/
        R[2]
      ), T & /*activeText*/
      8 && Ct(
        S,
        /*activeText*/
        R[3]
      );
    },
    i: kt,
    o: kt,
    d(R) {
      R && Rt(e);
    }
  };
}
function ic(t, e, n) {
  let { data: i } = e, { range: r = null } = e, { preset: o = "N" } = e, s = "—", f = "—", a = "—", l = "—", d, c;
  const m = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol"), g = (C) => m() ? C * 18 : C;
  function v() {
    return m() ? o === "T" ? {
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
  }
  function p() {
    if (!i) return;
    const C = new Date(i.t0).getTime();
    n(9, d = Float64Array.from({ length: i.glucose.length }, (E, k) => C + k * i.stepMs)), n(10, c = Float64Array.from(i.glucose));
  }
  return Te(() => {
    p();
  }), t.$$set = (C) => {
    "data" in C && n(6, i = C.data), "range" in C && n(7, r = C.range), "preset" in C && n(8, o = C.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*data*/
    64 && i && p(), t.$$.dirty & /*data, range, time, values*/
    1728 && i && r && d && c) {
      const { start: C, end: E } = r, k = Math.max(0, Math.ceil((C - d[0]) / i.stepMs)), y = Math.min(c.length - 1, Math.floor((E - d[0]) / i.stepMs));
      try {
        typeof window < "u" && window.CGM_DEBUG && console.log("[CgmSummary] update", {
          startISO: new Date(C).toISOString(),
          endISO: new Date(E).toISOString(),
          stepMs: i.stepMs,
          i0: k,
          i1: y,
          len: c.length
        });
      } catch {
      }
      if (y < k)
        n(0, s = "—"), n(1, f = "—"), n(2, a = "—"), n(3, l = "—");
      else {
        const _ = [];
        for (let L = k; L <= y; L++) {
          const ot = c[L];
          Number.isFinite(ot) && ot >= 0 && _.push(ot);
        }
        const S = Math.max(1, y - k + 1), R = 100 * _.length / S;
        n(3, l = `${R.toFixed(1)}%`);
        const T = ql(_), M = Ll(_) ?? 0, A = Math.sqrt(M), w = Number.isFinite(T) ? 3.31 + 0.02392 * g(T) : NaN, D = Number.isFinite(T) && T !== 0 ? A / T * 100 : NaN;
        n(0, s = Number.isFinite(T) ? m() ? `${T.toFixed(1)} mmol/L` : `${Math.round(T)} mg/dL` : "—"), n(1, f = Number.isFinite(w) ? `${w.toFixed(1)}%` : "—"), n(2, a = Number.isFinite(D) ? `${D.toFixed(1)}%` : "—");
        const x = Sn("%b %e, %Y"), I = new Date(C), Y = new Date(E);
        `${x(I)}${x(Y)}`, Date.UTC(I.getUTCFullYear(), I.getUTCMonth(), I.getUTCDate()), Date.UTC(Y.getUTCFullYear(), Y.getUTCMonth(), Y.getUTCDate());
      }
    }
  }, [
    s,
    f,
    a,
    l,
    m,
    v,
    i,
    r,
    o,
    d,
    c
  ];
}
class rc extends le {
  constructor(e) {
    super(), oe(this, e, ic, nc, re, { data: 6, range: 7, preset: 8 });
  }
}
function oc(t) {
  let e;
  return {
    c() {
      e = H("General 70–180 mg/dL");
    },
    m(n, i) {
      Lt(n, e, i);
    },
    p: kt,
    d(n) {
      n && Rt(e);
    }
  };
}
function lc(t) {
  let e;
  return {
    c() {
      e = H("Pregnancy 63–140 mg/dL");
    },
    m(n, i) {
      Lt(n, e, i);
    },
    p: kt,
    d(n) {
      n && Rt(e);
    }
  };
}
function ac(t) {
  let e;
  return {
    c() {
      e = H("Tight 70–140 mg/dL");
    },
    m(n, i) {
      Lt(n, e, i);
    },
    p: kt,
    d(n) {
      n && Rt(e);
    }
  };
}
function sc(t) {
  let e;
  function n(o, s) {
    return (
      /*preset*/
      o[1] === "T" ? hc : (
        /*preset*/
        o[1] === "P" ? fc : uc
      )
    );
  }
  let i = n(t), r = i(t);
  return {
    c() {
      r.c(), e = ze();
    },
    m(o, s) {
      r.m(o, s), Lt(o, e, s);
    },
    p(o, s) {
      i !== (i = n(o)) && (r.d(1), r = i(o), r && (r.c(), r.m(e.parentNode, e)));
    },
    d(o) {
      o && Rt(e), r.d(o);
    }
  };
}
function uc(t) {
  let e;
  return {
    c() {
      e = H("General 3.9–10.0 mmol/L");
    },
    m(n, i) {
      Lt(n, e, i);
    },
    d(n) {
      n && Rt(e);
    }
  };
}
function fc(t) {
  let e;
  return {
    c() {
      e = H("Pregnancy 3.5–7.8 mmol/L");
    },
    m(n, i) {
      Lt(n, e, i);
    },
    d(n) {
      n && Rt(e);
    }
  };
}
function hc(t) {
  let e;
  return {
    c() {
      e = H("Tight 3.9–7.8 mmol/L");
    },
    m(n, i) {
      Lt(n, e, i);
    },
    d(n) {
      n && Rt(e);
    }
  };
}
function cc(t) {
  let e, n, i, r, o, s, f, a, l, d, c, m, g, v, p, C = (
    /*pct*/
    t[2].targ.toFixed(1) + ""
  ), E, k, y, _, S, U, R;
  function T(w, D) {
    var x;
    return D & /*data*/
    1 && (R = null), R == null && (R = !!/mmol/i.test(
      /*data*/
      ((x = w[0]) == null ? void 0 : x.units) || "mmol"
    )), R ? sc : (
      /*preset*/
      w[1] === "T" ? ac : (
        /*preset*/
        w[1] === "P" ? lc : oc
      )
    );
  }
  let M = T(t, -1), A = M(t);
  return {
    c() {
      e = q("div"), n = q("div"), i = q("div"), r = et(), o = q("div"), s = et(), f = q("div"), a = et(), l = q("div"), d = et(), c = q("div"), m = et(), g = q("div"), v = q("div"), p = q("span"), E = H(C), k = H("%"), y = H(" in range "), _ = q("span"), _.textContent = "· Goal >= 70%", S = et(), U = q("div"), A.c(), u(i, "class", "seg vlow svelte-536eaw"), j(
        i,
        "width",
        /*pct*/
        t[2].vlow + "%"
      ), u(i, "title", "Very low"), u(o, "class", "seg low svelte-536eaw"), j(
        o,
        "width",
        /*pct*/
        t[2].low + "%"
      ), u(o, "title", "Low"), u(f, "class", "seg targ svelte-536eaw"), j(
        f,
        "width",
        /*pct*/
        t[2].targ + "%"
      ), u(f, "title", "Target"), u(l, "class", "seg high svelte-536eaw"), j(
        l,
        "width",
        /*pct*/
        t[2].high + "%"
      ), u(l, "title", "High"), u(c, "class", "seg vhigh svelte-536eaw"), j(
        c,
        "width",
        /*pct*/
        t[2].vhigh + "%"
      ), u(c, "title", "Very high"), u(n, "class", "bar svelte-536eaw"), u(p, "class", "strong svelte-536eaw"), u(_, "class", "muted svelte-536eaw"), u(v, "class", "left svelte-536eaw"), u(U, "class", "right svelte-536eaw"), u(g, "class", "legend svelte-536eaw"), u(e, "class", "tirbar svelte-536eaw");
    },
    m(w, D) {
      Lt(w, e, D), h(e, n), h(n, i), h(n, r), h(n, o), h(n, s), h(n, f), h(n, a), h(n, l), h(n, d), h(n, c), h(e, m), h(e, g), h(g, v), h(v, p), h(p, E), h(p, k), h(v, y), h(v, _), h(g, S), h(g, U), A.m(U, null);
    },
    p(w, [D]) {
      D & /*pct*/
      4 && j(
        i,
        "width",
        /*pct*/
        w[2].vlow + "%"
      ), D & /*pct*/
      4 && j(
        o,
        "width",
        /*pct*/
        w[2].low + "%"
      ), D & /*pct*/
      4 && j(
        f,
        "width",
        /*pct*/
        w[2].targ + "%"
      ), D & /*pct*/
      4 && j(
        l,
        "width",
        /*pct*/
        w[2].high + "%"
      ), D & /*pct*/
      4 && j(
        c,
        "width",
        /*pct*/
        w[2].vhigh + "%"
      ), D & /*pct*/
      4 && C !== (C = /*pct*/
      w[2].targ.toFixed(1) + "") && Ct(E, C), M === (M = T(w, D)) && A ? A.p(w, D) : (A.d(1), A = M(w), A && (A.c(), A.m(U, null)));
    },
    i: kt,
    o: kt,
    d(w) {
      w && Rt(e), A.d();
    }
  };
}
function gc(t, e, n) {
  let { data: i } = e, { range: r = null } = e, { preset: o = "N" } = e, s, f;
  const a = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol"), l = () => a() ? o === "T" ? {
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
  let d = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  };
  function c() {
    if (!i) return;
    const m = new Date(i.t0).getTime();
    n(4, s = Float64Array.from({ length: i.glucose.length }, (g, v) => m + v * i.stepMs)), n(5, f = Float64Array.from(i.glucose));
  }
  return Te(() => {
    c();
  }), t.$$set = (m) => {
    "data" in m && n(0, i = m.data), "range" in m && n(3, r = m.range), "preset" in m && n(1, o = m.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*data*/
    1 && i && c(), t.$$.dirty & /*data, range, time, values, preset*/
    59 && i && r && s && f && o) {
      const { start: m, end: g } = r, v = Math.max(0, Math.ceil((m - s[0]) / i.stepMs)), p = Math.min(f.length - 1, Math.floor((g - s[0]) / i.stepMs));
      if (p < v)
        n(2, d = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        });
      else {
        const C = l();
        let E = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, k = 0;
        for (let y = v; y <= p; y++) {
          const _ = f[y];
          Number.isFinite(_) && _ >= 0 && (k++, _ < C.vlow ? E.vlow++ : _ < C.low ? E.low++ : _ <= C.high ? E.targ++ : _ <= C.vhigh ? E.high++ : E.vhigh++);
        }
        k === 0 ? n(2, d = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }) : n(2, d = {
          vlow: E.vlow / k * 100,
          low: E.low / k * 100,
          targ: E.targ / k * 100,
          high: E.high / k * 100,
          vhigh: E.vhigh / k * 100
        });
      }
    }
  }, [i, o, d, r, s, f];
}
class dc extends le {
  constructor(e) {
    super(), oe(this, e, gc, cc, re, { data: 0, range: 3, preset: 1 });
  }
}
function mc(t) {
  let e;
  return {
    c() {
      e = O("svg"), j(e, "width", "100%"), j(e, "height", "260px"), j(e, "display", "block");
    },
    m(n, i) {
      Lt(n, e, i), t[6](e);
    },
    p: kt,
    i: kt,
    o: kt,
    d(n) {
      n && Rt(e), t[6](null);
    }
  };
}
function xn(t, e) {
  if (!t.length) return NaN;
  const n = (t.length - 1) * e, i = Math.floor(n), r = n - i;
  return t[i] + (t[Math.min(t.length - 1, i + 1)] - t[i]) * (r || 0);
}
function vc(t, e, n) {
  let { data: i } = e, { range: r = null } = e, { preset: o = "N" } = e, s, f = 900, a = 260;
  const l = { l: 50, r: 60, t: 20, b: 26 }, d = 24 * 60 * 60 * 1e3, c = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol"), m = () => c() ? o === "T" ? {
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
  let g, v;
  function p() {
    const y = new Date(i.t0).getTime();
    n(4, g = Float64Array.from({ length: i.glucose.length }, (_, S) => y + S * i.stepMs)), n(5, v = Float64Array.from(i.glucose));
  }
  function C(y, _) {
    const S = Math.max(1, Math.round(d / i.stepMs)), U = Array.from({ length: S }, () => []), R = /* @__PURE__ */ new Set();
    for (let M = y; M <= _; M++) {
      const A = v[M];
      if (!(Number.isFinite(A) && A >= 0)) continue;
      const w = g[M], D = new Date(w), x = new Date(D.getFullYear(), D.getMonth(), D.getDate()).getTime();
      R.add(x);
      let I = Math.round((w - x) / i.stepMs);
      I < 0 ? I = 0 : I >= S && (I = S - 1), U[I].push(A);
    }
    return { series: U.map((M, A) => {
      const w = Float64Array.from(M).sort();
      return {
        t: A,
        p05: xn(w, 0.05),
        p25: xn(w, 0.25),
        p50: xn(w, 0.5),
        p75: xn(w, 0.75),
        p95: xn(w, 0.95)
      };
    }), samplesPerDay: S };
  }
  function E() {
    if (!s || !i || !r || !g || !v) return;
    const y = s.getBoundingClientRect();
    f = Math.max(360, y.width || 900), a = Math.max(220, y.height || 260);
    const _ = xe(s);
    _.selectAll("*").remove();
    const S = Math.max(0, Math.ceil((r.start - g[0]) / i.stepMs)), U = Math.min(v.length - 1, Math.floor((r.end - g[0]) / i.stepMs));
    if (U < S) return;
    const { series: R, samplesPerDay: T } = C(S, U);
    if (!R.flatMap((b) => [b.p05, b.p95]).filter(Number.isFinite).length) {
      _.append("text").attr("x", l.l).attr("y", a / 2).text("Not enough data in selection to compute AGP");
      return;
    }
    const A = sn().domain([0, T - 1]).range([l.l, f - l.r]), w = m(), D = c() ? 20 : 360, x = sn().domain([w.vlow, D]).range([a - l.b, l.t]), I = ce().defined((b) => Number.isFinite(b.p05) && Number.isFinite(b.p95) && b.p05 < w.low).x((b) => A(b.t)).y0((b) => x(Math.min(b.p95, w.low))).y1((b) => x(b.p05)), Y = ce().defined((b) => Number.isFinite(b.p05) && Number.isFinite(b.p95) && b.p95 > w.low && b.p05 < w.high).x((b) => A(b.t)).y0((b) => x(Math.min(b.p95, w.high))).y1((b) => x(Math.max(b.p05, w.low))), L = ce().defined((b) => Number.isFinite(b.p05) && Number.isFinite(b.p95) && b.p95 > w.high && b.p05 < w.vhigh).x((b) => A(b.t)).y0((b) => x(Math.min(b.p95, w.vhigh))).y1((b) => x(Math.max(b.p05, w.high))), ot = ce().defined((b) => Number.isFinite(b.p05) && Number.isFinite(b.p95) && b.p95 > w.vhigh && b.p05 < w.vhigh).x((b) => A(b.t)).y0((b) => x(b.p95)).y1((b) => x(w.vhigh)), _t = ce().defined((b) => Number.isFinite(b.p05) && Number.isFinite(b.p95) && b.p05 > w.vhigh).x((b) => A(b.t)).y0((b) => x(b.p95)).y1((b) => x(b.p05));
    _.append("rect").attr("x", l.l).attr("width", f - l.r - l.l).attr("y", x(w.high)).attr("height", x(w.low) - x(w.high)).attr("fill", "#1a9850").attr("opacity", 0.1), _.append("path").attr("d", I(R)).attr("fill", "#d73027").attr("opacity", 0.18), _.append("path").attr("d", Y(R)).attr("fill", "#1a9850").attr("opacity", 0.12), _.append("path").attr("d", L(R)).attr("fill", "#fdae61").attr("opacity", 0.18), _.append("path").attr("d", ot(R)).attr("fill", "#f46d43").attr("opacity", 0.26), _.append("path").attr("d", _t(R)).attr("fill", "#f46d43").attr("opacity", 0.26);
    const Q = ce().defined((b) => Number.isFinite(b.p25) && Number.isFinite(b.p75) && b.p75 > w.low && b.p25 < w.high).x((b) => A(b.t)).y0((b) => x(Math.min(Math.max(b.p25, w.low), w.high))).y1((b) => x(Math.max(Math.min(b.p75, w.high), w.low))), lt = ce().defined((b) => Number.isFinite(b.p25) && Number.isFinite(b.p75) && b.p75 > w.high && b.p25 < w.vhigh).x((b) => A(b.t)).y0((b) => x(Math.min(b.p75, w.vhigh))).y1((b) => x(Math.max(b.p25, w.high))), nt = ce().defined((b) => Number.isFinite(b.p25) && Number.isFinite(b.p75) && b.p75 > w.vhigh && b.p25 < w.vhigh).x((b) => A(b.t)).y0((b) => x(b.p75)).y1((b) => x(w.vhigh)), st = ce().defined((b) => Number.isFinite(b.p25) && Number.isFinite(b.p75) && b.p25 < w.low).x((b) => A(b.t)).y0((b) => x(b.p25)).y1((b) => x(Math.min(b.p75, w.low)));
    _.append("path").attr("d", st(R)).attr("fill", "#d73027").attr("opacity", 0.35), _.append("path").attr("d", Q(R)).attr("fill", "#1a9850").attr("opacity", 0.25), _.append("path").attr("d", lt(R)).attr("fill", "#fdae61").attr("opacity", 0.35), _.append("path").attr("d", nt(R)).attr("fill", "#f46d43").attr("opacity", 0.45);
    try {
      let G = function(z, V, Z) {
        return z < Z && V >= Z || z > Z && V <= Z;
      }, N = function(z, V, Z, K, pt) {
        return { t: z + (pt - V) * (Z - z) / (K - V), p50: pt };
      };
      const b = (z) => z < w.low ? "#d73027" : z > w.vhigh ? "#f46d43" : z > w.high ? "#fdae61" : "#1a9850", B = En().x((z) => A(z.t)).y((z) => x(z.p50)), tt = (z, V, Z, K) => {
        !Number.isFinite(Z.p50) || !Number.isFinite(K.p50) || ((!z.length || z[z.length - 1].color !== V) && z.push({ color: V, arr: [Z] }), z[z.length - 1].arr.push(K));
      };
      let J = [], F = null;
      for (let z = 0; z < R.length; z++) {
        const V = R[z];
        if (!Number.isFinite(V.p50)) {
          F = null;
          continue;
        }
        if (!F) {
          F = V;
          continue;
        }
        const Z = F.t, K = F.p50, pt = V.t, Mt = V.p50;
        let ut = [{ t: Z, p50: K }], mt = K, Tt = Z;
        const vt = [w.low, w.high, w.vhigh];
        (Mt > K ? vt : vt.slice().reverse()).forEach((wt) => {
          if (G(mt, Mt, wt)) {
            const it = N(Tt, mt, pt, Mt, wt);
            ut.push(it), mt = it.p50, Tt = it.t;
          }
        }), ut.push({ t: pt, p50: Mt });
        for (let wt = 1; wt < ut.length; wt++) {
          const it = ut[wt - 1], ft = ut[wt], gt = (it.p50 + ft.p50) / 2 + (ft.p50 === it.p50 ? ft.t > it.t ? 1e-6 : -1e-6 : 0), at = b(gt);
          tt(J, at, it, ft);
        }
        F = V;
      }
      J.forEach((z) => {
        z.arr.length >= 2 && _.append("path").attr("d", B(z.arr)).attr("stroke", z.color).attr("fill", "none").attr("stroke-width", 2);
      });
    } catch {
    }
    _.append("line").attr("x1", l.l).attr("x2", f - l.r).attr("y1", x(w.high)).attr("y2", x(w.high)).attr("stroke", "#6ea77b").attr("stroke-width", 1), _.append("line").attr("x1", l.l).attr("x2", f - l.r).attr("y1", x(w.low)).attr("y2", x(w.low)).attr("stroke", "#6ea77b").attr("stroke-width", 1), _.append("line").attr("x1", l.l).attr("x2", f - l.r).attr("y1", x(w.vlow)).attr("y2", x(w.vlow)).attr("stroke", "#cccccc").attr("stroke-width", 1), _.append("line").attr("x1", l.l).attr("x2", f - l.r).attr("y1", x(w.vhigh)).attr("y2", x(w.vhigh)).attr("stroke", "#cccccc").attr("stroke-width", 1);
    const At = 60 * 60 * 1e3 / i.stepMs, X = Pi(0, 24, 3).map((b) => Math.round(b * At)), P = (b) => b === 0 || b === 24 ? "12am" : b < 12 ? `${b}am` : b === 12 ? "12pm" : `${b - 12}pm`;
    _.append("g").attr("transform", `translate(0,${a - l.b})`).call(Zl(A).tickValues(X).tickFormat((b) => P(Math.round(b / At))).tickSizeOuter(0));
    const $ = [m().vlow, m().low, m().high, m().vhigh, c() ? 20 : 360].filter((b) => b >= w.vlow && b <= D), dt = c() ? (b) => Math.round(b * 10) / 10 : (b) => Math.round(b);
    _.append("g").attr("transform", `translate(${l.l},0)`).call(Ql(x).tickValues($).tickFormat(dt)).call((b) => b.select(".domain").remove());
    try {
      const b = (G) => {
        for (let N = R.length - 1; N >= 0; N--) {
          const J = R[N][G];
          if (Number.isFinite(J)) return { t: R[N].t, v: J };
        }
        return null;
      }, tt = (G, N) => {
        if (!N) return;
        const J = Math.min(f - l.r - 2, A(N.t) + 41), F = x(N.v);
        xe(s).append("text").attr("x", J + 5).attr("y", F).attr("dy", "0.35em").attr("text-anchor", "start").attr("fill", "#000").attr("font-size", 11).attr("font-weight", G === 50 ? 700 : 400).text(`${G}%`);
      };
      tt(5, b("p05")), tt(25, b("p25")), tt(50, b("p50")), tt(75, b("p75")), tt(95, b("p95"));
    } catch {
    }
    try {
      let J = function(F) {
        const z = x(F), V = xe(s).append("text").attr("x", -9999).attr("y", -9999).attr("fill", "#fff").attr("font-size", 11).attr("font-weight", 700).text(N(F)), Z = V.node().getBBox();
        V.remove();
        const K = Math.ceil(Z.width), pt = l.l - 8 - (K + 6 * 2), Mt = z - 16 / 2;
        xe(s).append("rect").attr("x", pt).attr("y", Mt).attr("rx", 5).attr("ry", 5).attr("width", K + 6 * 2).attr("height", 16).attr("fill", G), xe(s).append("text").attr("x", pt + 6).attr("y", z).attr("dy", "0.35em").attr("fill", "#fff").attr("font-size", 11).attr("font-weight", 700).text(N(F));
      };
      const G = "#1a9850", N = (F) => {
        if (c()) {
          const z = (Math.round(F * 10) / 10).toFixed(1);
          return z.endsWith(".0") ? z.slice(0, -2) : z;
        }
        return Math.round(F).toString();
      };
      J(w.low), J(w.high);
    } catch {
    }
  }
  Te(() => {
    p(), E(), window.addEventListener("resize", E);
  });
  function k(y) {
    Me[y ? "unshift" : "push"](() => {
      s = y, n(0, s);
    });
  }
  return t.$$set = (y) => {
    "data" in y && n(1, i = y.data), "range" in y && n(2, r = y.range), "preset" in y && n(3, o = y.preset);
  }, t.$$.update = () => {
    t.$$.dirty & /*data, range, time, values, preset*/
    62 && i && r && g && v && o && E();
  }, [s, i, r, o, g, v, k];
}
class wc extends le {
  constructor(e) {
    super(), oe(this, e, vc, mc, re, { data: 1, range: 2, preset: 3 });
  }
}
function pc(t) {
  let e, n, i, r, o, s, f, a, l, d, c, m, g, v, p = pe(
    /*pct*/
    t[0].vlow
  ) + "", C, E, k, y, _ = pe(
    /*pct*/
    t[0].low
  ) + "", S, U, R, T, M, A = pe(
    /*pct*/
    t[0].targ
  ) + "", w, D, x, I, Y = pe(
    /*pct*/
    t[0].high
  ) + "", L, ot, _t, Q, lt = pe(
    /*pct*/
    t[0].vhigh
  ) + "", nt, st, At, X;
  return {
    c() {
      e = q("div"), n = q("div"), i = q("div"), r = et(), o = q("div"), s = et(), f = q("div"), a = et(), l = q("div"), d = et(), c = q("div"), m = et(), g = q("div"), v = q("div"), C = H(p), E = H(" Very Low"), k = et(), y = q("div"), S = H(_), U = H(" Low"), R = et(), T = q("div"), M = q("span"), w = H(A), D = H(" In Range"), x = et(), I = q("div"), L = H(Y), ot = H(" High"), _t = et(), Q = q("div"), nt = H(lt), st = H(" Very High"), At = et(), X = q("div"), X.textContent = `${/*presetLabel*/
      t[1]()} Range Used: ${/*rangeText*/
      t[2]()}`, u(i, "class", "seg vlow svelte-10886f1"), j(
        i,
        "flex-basis",
        /*pct*/
        t[0].vlow + "%"
      ), u(o, "class", "seg low svelte-10886f1"), j(
        o,
        "flex-basis",
        /*pct*/
        t[0].low + "%"
      ), u(f, "class", "seg targ svelte-10886f1"), j(
        f,
        "flex-basis",
        /*pct*/
        t[0].targ + "%"
      ), u(l, "class", "seg high svelte-10886f1"), j(
        l,
        "flex-basis",
        /*pct*/
        t[0].high + "%"
      ), u(c, "class", "seg vhigh svelte-10886f1"), j(
        c,
        "flex-basis",
        /*pct*/
        t[0].vhigh + "%"
      ), u(n, "class", "stack svelte-10886f1"), u(v, "class", "row small svelte-10886f1"), u(y, "class", "row small svelte-10886f1"), u(M, "class", "strong svelte-10886f1"), u(T, "class", "row big svelte-10886f1"), u(I, "class", "row small svelte-10886f1"), u(Q, "class", "row small svelte-10886f1"), u(X, "class", "note svelte-10886f1"), u(g, "class", "labels svelte-10886f1"), u(e, "class", "tir-card svelte-10886f1");
    },
    m(P, $) {
      Lt(P, e, $), h(e, n), h(n, i), h(n, r), h(n, o), h(n, s), h(n, f), h(n, a), h(n, l), h(n, d), h(n, c), h(e, m), h(e, g), h(g, v), h(v, C), h(v, E), h(g, k), h(g, y), h(y, S), h(y, U), h(g, R), h(g, T), h(T, M), h(M, w), h(T, D), h(g, x), h(g, I), h(I, L), h(I, ot), h(g, _t), h(g, Q), h(Q, nt), h(Q, st), h(g, At), h(g, X);
    },
    p(P, [$]) {
      $ & /*pct*/
      1 && j(
        i,
        "flex-basis",
        /*pct*/
        P[0].vlow + "%"
      ), $ & /*pct*/
      1 && j(
        o,
        "flex-basis",
        /*pct*/
        P[0].low + "%"
      ), $ & /*pct*/
      1 && j(
        f,
        "flex-basis",
        /*pct*/
        P[0].targ + "%"
      ), $ & /*pct*/
      1 && j(
        l,
        "flex-basis",
        /*pct*/
        P[0].high + "%"
      ), $ & /*pct*/
      1 && j(
        c,
        "flex-basis",
        /*pct*/
        P[0].vhigh + "%"
      ), $ & /*pct*/
      1 && p !== (p = pe(
        /*pct*/
        P[0].vlow
      ) + "") && Ct(C, p), $ & /*pct*/
      1 && _ !== (_ = pe(
        /*pct*/
        P[0].low
      ) + "") && Ct(S, _), $ & /*pct*/
      1 && A !== (A = pe(
        /*pct*/
        P[0].targ
      ) + "") && Ct(w, A), $ & /*pct*/
      1 && Y !== (Y = pe(
        /*pct*/
        P[0].high
      ) + "") && Ct(L, Y), $ & /*pct*/
      1 && lt !== (lt = pe(
        /*pct*/
        P[0].vhigh
      ) + "") && Ct(nt, lt);
    },
    i: kt,
    o: kt,
    d(P) {
      P && Rt(e);
    }
  };
}
function pe(t) {
  return !Number.isFinite(t) || t <= 0 ? "0 %" : t < 1 ? "<1 %" : `${Math.round(t)} %`;
}
function yc(t, e, n) {
  const i = hn();
  let { data: r } = e, { range: o = null } = e, { preset: s = "N" } = e, f, a;
  const l = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), d = () => l() ? s === "T" ? {
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
  let c = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  }, m = 0, g = 0;
  function v() {
    if (!r) return;
    const k = new Date(r.t0).getTime();
    n(6, f = Float64Array.from({ length: r.glucose.length }, (y, _) => k + _ * r.stepMs)), n(7, a = Float64Array.from(r.glucose));
  }
  function p() {
    try {
      i("stats", {
        pct: c,
        present: m,
        expected: g,
        preset: s,
        units: (r == null ? void 0 : r.units) || "mmol/L"
      });
    } catch {
    }
  }
  function C() {
    return s === "T" ? "Tight" : s === "P" ? "Pregnancy" : "General";
  }
  function E() {
    const k = d();
    if (l()) {
      const y = (_) => {
        const S = (Math.round(_ * 10) / 10).toFixed(1);
        return S.endsWith(".0") ? S.slice(0, -2) : S;
      };
      return `${y(k.low)}–${y(k.high)} mmol/L`;
    }
    return `${Math.round(k.low)}–${Math.round(k.high)} mg/dL`;
  }
  return t.$$set = (k) => {
    "data" in k && n(3, r = k.data), "range" in k && n(4, o = k.range), "preset" in k && n(5, s = k.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*data*/
    8 && r && v(), t.$$.dirty & /*data, range, time, values, preset*/
    248 && r && o && f && a && s) {
      const { start: k, end: y } = o, _ = Math.max(0, Math.ceil((k - f[0]) / r.stepMs)), S = Math.min(a.length - 1, Math.floor((y - f[0]) / r.stepMs));
      if (S < _)
        n(0, c = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }), m = 0, g = 0;
      else {
        const U = d();
        let R = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, T = 0;
        for (let M = _; M <= S; M++) {
          const A = a[M];
          Number.isFinite(A) && A >= 0 && (T++, A < U.vlow ? R.vlow++ : A < U.low ? R.low++ : A <= U.high ? R.targ++ : A <= U.vhigh ? R.high++ : R.vhigh++);
        }
        m = T, g = Math.max(1, S - _ + 1), T === 0 ? n(0, c = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }) : n(0, c = {
          vlow: R.vlow / T * 100,
          low: R.low / T * 100,
          targ: R.targ / T * 100,
          high: R.high / T * 100,
          vhigh: R.vhigh / T * 100
        });
      }
      p();
    }
  }, [c, C, E, r, o, s, f, a];
}
class _c extends le {
  constructor(e) {
    super(), oe(this, e, yc, pc, re, { data: 3, range: 4, preset: 5 });
  }
}
function xc(t) {
  let e, n, i, r, o, s, f, a, l, d, c, m, g, v, p, C, E, k, y, _, S, U, R, T, M, A, w, D = (
    /*fmtPct*/
    t[2](
      /*pct*/
      t[0].vhigh
    ) + ""
  ), x, I, Y, L, ot, _t = (
    /*fmtPct*/
    t[2](
      /*pct*/
      t[0].high
    ) + ""
  ), Q, lt, nt, st, At, X, P = (
    /*combineTop*/
    t[3]() + ""
  ), $, dt, b, B, tt, G, N, J, F = (
    /*fmtPct*/
    t[2](
      /*pct*/
      t[0].targ
    ) + ""
  ), z, V, Z, K, pt, Mt, ut, mt, Tt, vt, yt = (
    /*fmtPct*/
    t[2](
      /*pct*/
      t[0].low
    ) + ""
  ), rt, wt, it, ft, gt, at = (
    /*fmtPct*/
    t[2](
      /*pct*/
      t[0].vlow
    ) + ""
  ), bt, W, xt, ht, Et, Ht, Vt = (
    /*combineLow*/
    t[4]() + ""
  ), It, zt, Xt, ue, Ut;
  return {
    c() {
      e = q("div"), n = q("div"), i = q("div"), r = q("div"), o = et(), s = q("div"), f = et(), a = q("div"), l = et(), d = q("div"), c = et(), m = q("div"), g = et(), v = q("div"), p = q("div"), C = q("span"), C.textContent = `${/*unitValue*/
      t[5](
        /*TH*/
        t[1]().high
      )}`, E = et(), k = q("div"), y = q("span"), y.textContent = `${/*unitValue*/
      t[5](
        /*TH*/
        t[1]().vhigh
      )}`, _ = et(), S = q("div"), U = q("div"), R = q("div"), R.textContent = "Goal: <5%", T = et(), M = q("div"), A = q("div"), A.textContent = "Very High", w = q("div"), x = H(D), I = et(), Y = q("div"), L = q("div"), L.textContent = "High", ot = q("div"), Q = H(_t), lt = et(), nt = q("div"), st = q("div"), At = et(), X = q("div"), $ = H(P), dt = H("% "), b = q("span"), b.textContent = "Goal: <25%", B = et(), tt = q("div"), G = q("div"), N = q("div"), N.textContent = "Target", J = q("div"), z = H(F), V = et(), Z = q("div"), Z.textContent = "Goal: ≥70%", K = et(), pt = q("div"), pt.textContent = "Each 5% increase is clinically beneficial", Mt = et(), ut = q("div"), mt = q("div"), Tt = q("div"), Tt.textContent = "Low", vt = q("div"), rt = H(yt), wt = et(), it = q("div"), ft = q("div"), ft.textContent = "Very Low", gt = q("div"), bt = H(at), W = et(), xt = q("div"), ht = q("div"), Et = et(), Ht = q("div"), It = H(Vt), zt = H("% "), Xt = q("span"), Xt.textContent = "Goal: <4%", ue = et(), Ut = q("div"), Ut.textContent = "Each 1% time in range = about 15 minutes", u(r, "class", "seg vhigh svelte-5qe12v"), j(
        r,
        "flex-basis",
        /*pct*/
        t[0].vhigh + "%"
      ), u(s, "class", "seg high svelte-5qe12v"), j(
        s,
        "flex-basis",
        /*pct*/
        t[0].high + "%"
      ), u(a, "class", "seg targ svelte-5qe12v"), j(
        a,
        "flex-basis",
        /*pct*/
        t[0].targ + "%"
      ), u(d, "class", "seg low svelte-5qe12v"), j(
        d,
        "flex-basis",
        /*pct*/
        t[0].low + "%"
      ), u(m, "class", "seg vlow svelte-5qe12v"), j(
        m,
        "flex-basis",
        /*pct*/
        t[0].vlow + "%"
      ), u(i, "class", "stack svelte-5qe12v"), u(C, "class", "svelte-5qe12v"), u(p, "class", "tick svelte-5qe12v"), j(p, "top", "18%"), u(y, "class", "svelte-5qe12v"), u(k, "class", "tick svelte-5qe12v"), j(k, "top", "6%"), u(v, "class", "ticks svelte-5qe12v"), u(n, "class", "barcol svelte-5qe12v"), u(R, "class", "goal svelte-5qe12v"), u(A, "class", "label svelte-5qe12v"), u(w, "class", "val svelte-5qe12v"), u(M, "class", "row svelte-5qe12v"), u(L, "class", "label svelte-5qe12v"), u(ot, "class", "val svelte-5qe12v"), u(Y, "class", "row svelte-5qe12v"), u(st, "class", "brace svelte-5qe12v"), u(b, "class", "goaltext svelte-5qe12v"), u(X, "class", "sum svelte-5qe12v"), u(nt, "class", "bracket svelte-5qe12v"), u(U, "class", "group top svelte-5qe12v"), u(N, "class", "label svelte-5qe12v"), u(J, "class", "val svelte-5qe12v"), u(G, "class", "row emph svelte-5qe12v"), u(Z, "class", "goal inline svelte-5qe12v"), u(pt, "class", "note svelte-5qe12v"), u(tt, "class", "group mid svelte-5qe12v"), u(Tt, "class", "label svelte-5qe12v"), u(vt, "class", "val svelte-5qe12v"), u(mt, "class", "row svelte-5qe12v"), u(ft, "class", "label svelte-5qe12v"), u(gt, "class", "val svelte-5qe12v"), u(it, "class", "row svelte-5qe12v"), u(ht, "class", "brace svelte-5qe12v"), u(Xt, "class", "goaltext svelte-5qe12v"), u(Ht, "class", "sum svelte-5qe12v"), u(xt, "class", "bracket small svelte-5qe12v"), u(ut, "class", "group low svelte-5qe12v"), u(Ut, "class", "foot svelte-5qe12v"), u(S, "class", "rightcol svelte-5qe12v"), u(e, "class", "agp-card svelte-5qe12v");
    },
    m(Nt, Ft) {
      Lt(Nt, e, Ft), h(e, n), h(n, i), h(i, r), h(i, o), h(i, s), h(i, f), h(i, a), h(i, l), h(i, d), h(i, c), h(i, m), h(n, g), h(n, v), h(v, p), h(p, C), h(v, E), h(v, k), h(k, y), h(e, _), h(e, S), h(S, U), h(U, R), h(U, T), h(U, M), h(M, A), h(M, w), h(w, x), h(U, I), h(U, Y), h(Y, L), h(Y, ot), h(ot, Q), h(U, lt), h(U, nt), h(nt, st), h(nt, At), h(nt, X), h(X, $), h(X, dt), h(X, b), h(S, B), h(S, tt), h(tt, G), h(G, N), h(G, J), h(J, z), h(tt, V), h(tt, Z), h(tt, K), h(tt, pt), h(S, Mt), h(S, ut), h(ut, mt), h(mt, Tt), h(mt, vt), h(vt, rt), h(ut, wt), h(ut, it), h(it, ft), h(it, gt), h(gt, bt), h(ut, W), h(ut, xt), h(xt, ht), h(xt, Et), h(xt, Ht), h(Ht, It), h(Ht, zt), h(Ht, Xt), h(S, ue), h(S, Ut);
    },
    p(Nt, [Ft]) {
      Ft & /*pct*/
      1 && j(
        r,
        "flex-basis",
        /*pct*/
        Nt[0].vhigh + "%"
      ), Ft & /*pct*/
      1 && j(
        s,
        "flex-basis",
        /*pct*/
        Nt[0].high + "%"
      ), Ft & /*pct*/
      1 && j(
        a,
        "flex-basis",
        /*pct*/
        Nt[0].targ + "%"
      ), Ft & /*pct*/
      1 && j(
        d,
        "flex-basis",
        /*pct*/
        Nt[0].low + "%"
      ), Ft & /*pct*/
      1 && j(
        m,
        "flex-basis",
        /*pct*/
        Nt[0].vlow + "%"
      ), Ft & /*pct*/
      1 && D !== (D = /*fmtPct*/
      Nt[2](
        /*pct*/
        Nt[0].vhigh
      ) + "") && Ct(x, D), Ft & /*pct*/
      1 && _t !== (_t = /*fmtPct*/
      Nt[2](
        /*pct*/
        Nt[0].high
      ) + "") && Ct(Q, _t), Ft & /*pct*/
      1 && F !== (F = /*fmtPct*/
      Nt[2](
        /*pct*/
        Nt[0].targ
      ) + "") && Ct(z, F), Ft & /*pct*/
      1 && yt !== (yt = /*fmtPct*/
      Nt[2](
        /*pct*/
        Nt[0].low
      ) + "") && Ct(rt, yt), Ft & /*pct*/
      1 && at !== (at = /*fmtPct*/
      Nt[2](
        /*pct*/
        Nt[0].vlow
      ) + "") && Ct(bt, at);
    },
    i: kt,
    o: kt,
    d(Nt) {
      Nt && Rt(e);
    }
  };
}
function bc(t, e, n) {
  const i = hn();
  let { data: r } = e, { range: o = null } = e, { preset: s = "N" } = e, f, a;
  const l = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), d = () => l() ? s === "T" ? {
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
  let c = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  }, m = 0;
  function g() {
    if (!r) return;
    const y = new Date(r.t0).getTime();
    n(9, f = Float64Array.from({ length: r.glucose.length }, (_, S) => y + S * r.stepMs)), n(10, a = Float64Array.from(r.glucose));
  }
  function v() {
    try {
      i("stats", {
        pct: c,
        present: m,
        preset: s,
        units: (r == null ? void 0 : r.units) || "mmol/L"
      });
    } catch {
    }
  }
  const p = (y) => `${Math.round(y)}%`, C = () => Math.round(c.high + c.vhigh), E = () => Math.round(c.low + c.vlow), k = (y) => l() ? (Math.round(y * 10) / 10).toString() : Math.round(y).toString();
  return t.$$set = (y) => {
    "data" in y && n(6, r = y.data), "range" in y && n(7, o = y.range), "preset" in y && n(8, s = y.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*data*/
    64 && r && g(), t.$$.dirty & /*data, range, time, values, preset*/
    1984 && r && o && f && a && s) {
      const { start: y, end: _ } = o, S = Math.max(0, Math.ceil((y - f[0]) / r.stepMs)), U = Math.min(a.length - 1, Math.floor((_ - f[0]) / r.stepMs));
      if (U < S)
        n(0, c = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }), m = 0;
      else {
        const R = d();
        let T = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, M = 0;
        for (let A = S; A <= U; A++) {
          const w = a[A];
          Number.isFinite(w) && w >= 0 && (M++, w < R.vlow ? T.vlow++ : w < R.low ? T.low++ : w <= R.high ? T.targ++ : w <= R.vhigh ? T.high++ : T.vhigh++);
        }
        m = M, M === 0 ? n(0, c = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }) : n(0, c = {
          vlow: T.vlow / M * 100,
          low: T.low / M * 100,
          targ: T.targ / M * 100,
          high: T.high / M * 100,
          vhigh: T.vhigh / M * 100
        });
      }
      v();
    }
  }, [
    c,
    d,
    p,
    C,
    E,
    k,
    r,
    o,
    s,
    f,
    a
  ];
}
class Mc extends le {
  constructor(e) {
    super(), oe(this, e, bc, xc, re, { data: 6, range: 7, preset: 8 });
  }
}
function Tc(t) {
  let e;
  return {
    c() {
      e = q("canvas"), j(e, "width", "100%"), j(e, "height", "auto"), j(e, "display", "block");
    },
    m(n, i) {
      Lt(n, e, i), t[6](e);
    },
    p: kt,
    i: kt,
    o: kt,
    d(n) {
      n && Rt(e), t[6](null);
    }
  };
}
function bn(t) {
  return `${Math.round(t)}%`;
}
function kc(t, e, n) {
  const i = hn();
  let { data: r } = e, { range: o = null } = e, { preset: s = "N" } = e, f, a, l, d;
  const c = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), m = () => c() ? s === "T" ? {
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
  } : s === "T" ? { vlow: 54, low: 70, high: 140, vhigh: 250 } : s === "P" ? { vlow: 54, low: 63, high: 140, vhigh: 250 } : { vlow: 54, low: 70, high: 180, vhigh: 250 }, g = {
    vlow: "#8a2f2f",
    low: "#d65b5b",
    targ: "#169b58",
    high: "#f1aa3b",
    vhigh: "#e47c2f"
  }, v = {
    tick: 11,
    goal: 11,
    label: 16,
    targetLabel: 18,
    note: 11,
    percentXL: 30,
    percentL: 24
  };
  let p = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  }, C = 0;
  function E() {
    if (!r) return;
    const M = new Date(r.t0).getTime();
    n(4, l = Float64Array.from({ length: r.glucose.length }, (A, w) => M + w * r.stepMs)), n(5, d = Float64Array.from(r.glucose));
  }
  function k() {
    try {
      i("stats", {
        pct: p,
        present: C,
        preset: s,
        units: (r == null ? void 0 : r.units) || "mmol/L"
      });
    } catch {
    }
  }
  function y(M) {
    return c() ? (Math.round(M * 10) / 10).toString() : Math.round(M).toString();
  }
  function _(M, A, w, D, x) {
    a.beginPath(), a.moveTo(M + x, A), a.lineTo(M + w - x, A), a.arcTo(M + w, A, M + w, A + x, x), a.lineTo(M + w, A + D - x), a.arcTo(M + w, A + D, M + w - x, A + D, x), a.lineTo(M + x, A + D), a.arcTo(M, A + D, M, A + D - x, x), a.lineTo(M, A + x), a.arcTo(M, A, M + x, A, x);
  }
  function S(M, A, w, D, x) {
    a.beginPath(), a.moveTo(M, w), a.lineTo(A - x, w), a.arcTo(A, w, A, w + x, x), a.lineTo(A, D - x), a.arcTo(A, D, A - x, D, x), a.lineTo(M, D);
  }
  function U() {
    if (!f) return;
    const M = Math.max(1, window.devicePixelRatio || 1), A = Math.max(600, f.getBoundingClientRect().width || 820), w = 320;
    n(0, f.style.width = A + "px", f), n(0, f.style.height = w + "px", f), n(0, f.width = Math.floor(A * M), f), n(0, f.height = Math.floor(w * M), f), a.setTransform(M, 0, 0, M, 0, 0), a.clearRect(0, 0, A, w), a.fillStyle = "#fff", a.strokeStyle = "#e5e7eb", a.lineWidth = 1, _(8, 8, A - 16, w - 16, 12), a.fill(), a.stroke();
    const D = 56, x = 70, I = 240, Y = 36, L = 72, ot = 72, _t = 80, Q = 8, lt = 8;
    let nt = Y;
    a.strokeStyle = "#d6d9df", a.lineWidth = 1, a.strokeRect(D, Y, x, I);
    const st = (yt, rt) => {
      rt <= 0 || (a.fillStyle = yt, a.fillRect(D, nt, x, rt), nt += rt);
    };
    st(g.vhigh, L), st(g.high, ot), st(g.targ, _t), st(g.low, Q), st(g.vlow, lt), a.fillStyle = "#4b515a", a.font = `700 ${v.tick}px system-ui`, a.textAlign = "right", a.textBaseline = "middle";
    const At = Y + L, X = Y + L + ot;
    a.fillText(y(m().vhigh), D - 10, At), a.fillText(y(m().high), D - 10, X), a.textAlign = "left", a.fillText(y(m().vhigh), D + x + 10, At), a.fillText(y(m().high), D + x + 10, X);
    const P = D + x + 32;
    a.fillStyle = "#8c939e", a.font = `600 ${v.goal}px system-ui`, a.textAlign = "left", a.fillText("Goal: <5%", P, Y - 8), a.fillStyle = "#333", a.font = `800 ${v.label}px system-ui`, a.textAlign = "left", a.textBaseline = "alphabetic";
    const $ = Y + 16, dt = Y + 48;
    a.fillText("Very High", P, $), a.textAlign = "right", a.fillText(bn(p.vhigh), P + 148, $), a.textAlign = "left", a.fillText("High", P, dt), a.textAlign = "right", a.fillText(bn(p.high), P + 148, dt);
    const b = $ - 12, B = dt + 10, tt = P + 160, G = tt + 240;
    a.strokeStyle = "#b9bfc7", a.lineWidth = 2, S(tt, G, b, B, 14), a.stroke();
    const N = 10, J = P - 12, F = b;
    a.beginPath(), a.moveTo(J + N, F), a.arcTo(J, F, J, F + N, N), a.stroke(), a.font = `800 ${v.percentXL}px system-ui`, a.fillStyle = "#333", a.textAlign = "left", a.fillText(`${Math.round(p.vhigh + p.high)}%`, tt + 24, (b + B) / 2 + 10), a.textAlign = "right", a.font = `600 ${v.goal}px system-ui`, a.fillStyle = "#8c939e", a.fillText("Goal: <25%", G - 10, (b + B) / 2 + 10);
    const z = G, V = Y + 118, Z = V + 26, K = Z + 6;
    a.fillStyle = "#333", a.font = `800 ${v.targetLabel}px system-ui`, a.textAlign = "left", a.fillText("Target", P, Z), a.textAlign = "right", a.fillText(bn(p.targ), P + 148, Z), a.fillStyle = "#8c939e", a.font = `600 ${v.goal}px system-ui`, a.textAlign = "left", a.fillText("Goal: ≥70%", z - 84, Z - 2), a.strokeStyle = "#9aa1ab", a.lineWidth = 2, a.beginPath(), a.moveTo(P, K), a.lineTo(z, K), a.stroke(), a.textAlign = "center", a.font = `${v.note}px system-ui`, a.fillText("Each 5% increase is clinically beneficial", (P + z) / 2, K + 16);
    const pt = V + 86, Mt = pt + 28;
    a.fillStyle = "#333", a.font = `800 ${v.label}px system-ui`, a.textAlign = "left", a.fillText("Low", P, pt), a.textAlign = "right", a.fillText(bn(p.low), P + 148, pt), a.textAlign = "left", a.fillText("Very Low", P, Mt), a.textAlign = "right", a.fillText(bn(p.vlow), P + 148, Mt);
    const ut = P - 12, mt = pt + 6, Tt = Mt + 8, vt = z;
    a.strokeStyle = "#b9bfc7", a.lineWidth = 2, a.beginPath(), a.moveTo(ut + 12, mt), a.arcTo(ut, mt, ut, mt + 12, 12), a.lineTo(ut, Tt - 12), a.arcTo(ut, Tt, ut + 12, Tt, 12), a.lineTo(vt, Tt), a.stroke(), a.textAlign = "left", a.font = `800 ${v.percentL}px system-ui`, a.fillStyle = "#333", a.fillText(`${Math.round(p.low + p.vlow)}%`, ut + 80, Tt + 8), a.textAlign = "left", a.font = `600 ${v.goal}px system-ui`, a.fillStyle = "#8c939e", a.fillText("Goal: <4%", ut + 160, Tt - 2), a.textAlign = "right", a.fillStyle = "#8c939e", a.font = `${v.note}px system-ui`, a.fillText("Each 1% time in range = about 15 minutes", A - 24, Y + I + 28);
  }
  function R() {
    U();
  }
  Te(() => (a = f.getContext("2d"), U(), window.addEventListener("resize", R), () => window.removeEventListener("resize", R)));
  function T(M) {
    Me[M ? "unshift" : "push"](() => {
      f = M, n(0, f);
    });
  }
  return t.$$set = (M) => {
    "data" in M && n(1, r = M.data), "range" in M && n(2, o = M.range), "preset" in M && n(3, s = M.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*data*/
    2 && r && E(), t.$$.dirty & /*data, range, time, values, preset*/
    62 && r && o && l && d && s) {
      const { start: M, end: A } = o, w = Math.max(0, Math.ceil((M - l[0]) / r.stepMs)), D = Math.min(d.length - 1, Math.floor((A - l[0]) / r.stepMs));
      if (D < w)
        p = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, C = 0;
      else {
        const x = m();
        let I = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, Y = 0;
        for (let L = w; L <= D; L++) {
          const ot = d[L];
          Number.isFinite(ot) && ot >= 0 && (Y++, ot < x.vlow ? I.vlow++ : ot < x.low ? I.low++ : ot <= x.high ? I.targ++ : ot <= x.vhigh ? I.high++ : I.vhigh++);
        }
        C = Y, Y === 0 ? p = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        } : p = {
          vlow: I.vlow / Y * 100,
          low: I.low / Y * 100,
          targ: I.targ / Y * 100,
          high: I.high / Y * 100,
          vhigh: I.vhigh / Y * 100
        };
      }
      U(), k();
    }
  }, [f, r, o, s, l, d, T];
}
class Cc extends le {
  constructor(e) {
    super(), oe(this, e, kc, Tc, re, { data: 1, range: 2, preset: 3 });
  }
}
function Ac(t) {
  let e;
  return {
    c() {
      e = q("canvas"), j(e, "width", "100%"), j(e, "display", "block");
    },
    m(n, i) {
      Lt(n, e, i), t[4](e);
    },
    p: kt,
    i: kt,
    o: kt,
    d(n) {
      n && Rt(e), t[4](null);
    }
  };
}
function Nc(t, e, n) {
  const i = hn();
  let { data: r } = e, { range: o = null } = e, { preset: s = "N" } = e, f, a, l, d;
  const c = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), m = () => c() ? s === "T" ? {
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
  } : s === "T" ? { vlow: 54, low: 70, high: 140, vhigh: 250 } : s === "P" ? { vlow: 54, low: 63, high: 140, vhigh: 250 } : { vlow: 54, low: 70, high: 180, vhigh: 250 }, g = {
    vlow: "#8a2f2f",
    low: "#d65b5b",
    targ: "#169b58",
    high: "#f1aa3b",
    vhigh: "#e47c2f"
  };
  function v() {
    const T = new Date(r.t0).getTime();
    l = Float64Array.from({ length: r.glucose.length }, (M, A) => T + A * r.stepMs), d = Float64Array.from(r.glucose);
  }
  let p = { vlow: 0, vhigh: 0 };
  function C() {
    if (!o || !l) return;
    const { start: T, end: M } = o, A = Math.max(0, Math.ceil((T - l[0]) / r.stepMs)), w = Math.min(d.length - 1, Math.floor((M - l[0]) / r.stepMs));
    let D = { vlow: 0, vhigh: 0 }, x = 0;
    const I = m();
    for (let Y = A; Y <= w; Y++) {
      const L = d[Y];
      Number.isFinite(L) && L >= 0 && (x++, L < I.vlow ? D.vlow++ : L > I.vhigh && D.vhigh++);
    }
    x > 0 ? (p.vlow = D.vlow / x * 100, p.vhigh = D.vhigh / x * 100) : (p.vlow = 0, p.vhigh = 0), i("stats", {
      pct: p,
      preset: s,
      units: (r == null ? void 0 : r.units) || "mmol/L"
    });
  }
  const E = { goal: 14, label: 28, tick: 16 };
  function k(T, M, A, w) {
    a.beginPath(), a.moveTo(T + w, M), a.arcTo(T, M, T, M + w, w), a.lineTo(T, M + w), a.lineTo(T + A, M + w), a.stroke();
  }
  function y(T, M, A, w) {
    a.beginPath(), a.moveTo(T + w, M), a.arcTo(T, M, T, M - w, w), a.lineTo(T, M - w), a.lineTo(T + A, M - w), a.stroke();
  }
  function _(T) {
    return c() ? (Math.round(T * 10) / 10).toString() : Math.round(T).toString();
  }
  function S() {
    if (!f) return;
    const T = Math.max(1, window.devicePixelRatio || 1), M = Math.max(480, f.getBoundingClientRect().width || 600), A = 680;
    n(0, f.style.width = M + "px", f), n(0, f.style.height = A + "px", f), n(0, f.width = Math.floor(M * T), f), n(0, f.height = Math.floor(A * T), f), a.setTransform(T, 0, 0, T, 0, 0), a.clearRect(0, 0, M, A), a.fillStyle = "#fff", a.fillRect(0, 0, M, A);
    const w = 80, D = 90, x = 120, I = 440, Y = m(), L = 140, ot = 140, _t = 140, Q = 10, lt = 10;
    let nt = x;
    a.fillStyle = g.vhigh, a.fillRect(w, nt, D, L), nt += L, a.fillStyle = "#e9e9e9", a.fillRect(w, nt, D, 2), a.fillStyle = g.high, a.fillRect(w, nt, D, ot), nt += ot, a.fillStyle = "#e9e9e9", a.fillRect(w, nt, D, 2), a.fillStyle = g.targ, a.fillRect(w, nt, D, _t), nt += _t, a.fillStyle = "rgba(255,255,255,0.35)", a.fillRect(w + 6, nt - 6, D - 12, 2), a.fillStyle = g.low, a.fillRect(w, nt, D, Q), nt += Q, a.fillStyle = g.vlow, a.fillRect(w, nt, D, lt), a.fillStyle = "#2f3741", a.font = `700 ${E.tick}px system-ui`, a.textAlign = "right", a.textBaseline = "middle";
    const st = x + L, At = x + L + ot;
    a.fillText(_(Y.vhigh), w - 10, st), a.fillText(_(Y.high), w - 10, At), a.textAlign = "left", a.fillText(_(Y.vhigh), w + D + 10, st), a.fillText(_(Y.high), w + D + 10, At);
    const X = w + D + 20, P = x - 32;
    a.strokeStyle = "#000", a.lineWidth = 4, k(w - 22, P, 70, 14), a.fillStyle = "#8c939e", a.font = `600 ${E.goal}px system-ui`, a.textAlign = "center", a.fillText("Goal: <5%", X + 120, P - 8), a.fillStyle = "#111", a.font = `800 ${E.label}px system-ui`, a.textAlign = "left", a.fillText("Very High", X, x - 2), a.textAlign = "right", a.fillText(`${Math.round(p.vhigh)}%`, X + 260, x - 2);
    const $ = x + I + 24;
    a.strokeStyle = "#000", a.lineWidth = 4, y(w - 22, $, 70, 14), a.fillStyle = "#111", a.font = `800 ${E.label}px system-ui`, a.textAlign = "left", a.fillText("Very Low", X, $ + 10), a.textAlign = "right", a.fillText(`${Math.round(p.vlow)}%`, X + 260, $ + 10), a.fillStyle = "#8c939e", a.font = `600 ${E.goal}px system-ui`, a.textAlign = "center", a.fillText("Goal: <1%", X + 120, $ + 46);
  }
  function U() {
    S();
  }
  Te(() => (a = f.getContext("2d"), S(), window.addEventListener("resize", U), () => window.removeEventListener("resize", U)));
  function R(T) {
    Me[T ? "unshift" : "push"](() => {
      f = T, n(0, f);
    });
  }
  return t.$$set = (T) => {
    "data" in T && n(1, r = T.data), "range" in T && n(2, o = T.range), "preset" in T && n(3, s = T.preset);
  }, t.$$.update = () => {
    t.$$.dirty & /*data*/
    2 && r && v();
  }, C(), S(), [f, r, o, s, R];
}
class Dc extends le {
  constructor(e) {
    super(), oe(this, e, Nc, Ac, re, { data: 1, range: 2, preset: 3 });
  }
}
function Fc(t) {
  let e;
  return {
    c() {
      e = O("svg"), j(e, "width", "100%"), j(e, "display", "block");
    },
    m(n, i) {
      Lt(n, e, i), t[4](e);
    },
    p: kt,
    i: kt,
    o: kt,
    d(n) {
      n && Rt(e), t[4](null);
    }
  };
}
function Sc(t, e, n) {
  let { data: i } = e, { range: r = null } = e, { preset: o = "N" } = e, s;
  const f = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol");
  function a() {
    return f() ? o === "T" ? { vlow: 3, low: 3.9, high: 7.8 } : o === "P" ? { vlow: 3, low: 3.5, high: 7.8 } : { vlow: 3, low: 3.9, high: 10 } : o === "T" ? { vlow: 54, low: 70, high: 140 } : o === "P" ? { vlow: 54, low: 63, high: 140 } : { vlow: 54, low: 70, high: 180 };
  }
  let l, d;
  function c() {
    if (!i) return;
    const v = new Date(i.t0).getTime();
    l = Float64Array.from({ length: i.glucose.length }, (p, C) => v + C * i.stepMs), d = Float64Array.from(i.glucose);
  }
  function m() {
    if (!s || !i || !r || !l || !d) return;
    const v = xe(s);
    v.selectAll("*").remove();
    const p = s.getBoundingClientRect(), C = Math.max(360, p.width || 1100), E = 7, k = 0, y = { l: 50, r: 20, t: 30, b: 10 }, _ = Math.max(140, Math.floor((C - y.l - y.r - (E - 1) * k) / E)), S = 86, U = 18, R = r.start, T = r.end, M = ge.floor(new Date(R)).getTime(), A = ge.floor(new Date(T)).getTime(), w = new Date(M), D = new Date(A), x = (w.getDay() + 6) % 7, I = 7 - (D.getDay() + 6) % 7 - 1, Y = ge.offset(new Date(M), -x).getTime(), L = ge.offset(new Date(A), I).getTime(), ot = ge.range(new Date(Y), ge.offset(new Date(L), 1)).map((P) => P.getTime()), _t = ot.length, Q = Math.ceil(_t / E), lt = y.t + Q * S + (Q - 1) * k + y.b;
    s.setAttribute("height", lt);
    const nt = new Map(ot.map((P) => [P, []]));
    for (let P = 0; P < d.length; P++) {
      const $ = d[P];
      if (!(Number.isFinite($) && $ >= 0)) continue;
      const dt = l[P], b = ge.offset(new Date(L), 1).getTime();
      if (dt < Y || dt >= b) continue;
      const B = ge.floor(new Date(dt)).getTime();
      nt.has(B) && nt.get(B).push({ t: dt - B, v: $, a: dt });
    }
    const st = a(), At = 60 * 60 * 1e3 / i.stepMs;
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].forEach((P, $) => {
      Q > 0 && xe(s).append("text").attr("x", y.l + $ * (_ + k) + _ / 2).attr("y", 16).attr("text-anchor", "middle").attr("fill", "#555").attr("font-size", 10).text(P);
    });
    for (let P = 1; P <= E - 1; P++) {
      const $ = y.l + P * (_ + k);
      for (let dt = 0; dt < Q; dt++) {
        const b = y.t + dt * (S + k);
        xe(s).append("line").attr("x1", $).attr("x2", $).attr("y1", b + 4).attr("y2", b + S - 4).attr("stroke", "#e6e6e6").attr("stroke-width", 1);
      }
    }
    ot.forEach((P, $) => {
      const dt = Math.floor($ / E), b = $ % E, B = y.l + b * (_ + k), tt = y.t + dt * (S + k), G = v.append("g").attr("transform", `translate(${B},${tt})`), N = sn().domain([0, 24 * At - 1]).range([0, _]), J = sn().domain(f() ? [0, 20] : [0, 360]).range([S - U, 0]);
      G.append("rect").attr("x", 0).attr("y", J(st.high)).attr("width", _).attr("height", Math.max(1, J(st.low) - J(st.high))).attr("fill", "#efefef"), G.append("line").attr("x1", 0).attr("x2", _).attr("y1", J(st.high)).attr("y2", J(st.high)).attr("stroke", "#2e7d32").attr("opacity", 0.7), G.append("line").attr("x1", 0).attr("x2", _).attr("y1", J(st.low)).attr("y2", J(st.low)).attr("stroke", "#2e7d32").attr("opacity", 0.7);
      const F = (nt.get(P) || []).slice().sort((W, xt) => W.t - xt.t), z = 2 * i.stepMs, V = [];
      let Z = [];
      for (const W of F) {
        if (!Number.isFinite(W.v)) {
          Z.length && (V.push(Z), Z = []);
          continue;
        }
        Z.length && W.t - Z[Z.length - 1].t > z ? (V.push(Z), Z = [W]) : Z.push(W);
      }
      Z.length && V.push(Z);
      const K = (W) => W.a >= R && W.a <= T, pt = ce().defined((W) => Number.isFinite(W.v) && W.v > st.high && K(W)).x((W) => N(W.t / i.stepMs)).y0((W) => J(st.high)).y1((W) => J(W.v));
      V.forEach((W) => {
        W.length > 1 && G.append("path").attr("d", pt(W)).attr("fill", "#fdae61").attr("opacity", 0.35);
      });
      const Mt = ce().defined((W) => Number.isFinite(W.v) && W.v < st.low && K(W)).x((W) => N(W.t / i.stepMs)).y0((W) => J(W.v)).y1((W) => J(st.low));
      V.forEach((W) => {
        W.length > 1 && G.append("path").attr("d", Mt(W)).attr("fill", "#d73027").attr("opacity", 0.25);
      }), En().x((W) => N(W.t / i.stepMs)).y((W) => J(W.v)).curve(Ri);
      const ut = (W) => Number.isFinite(W.v) && K(W) && W.v >= st.low && W.v <= st.high, mt = (W) => Number.isFinite(W.v) && K(W) && W.v < st.low, Tt = (W) => Number.isFinite(W.v) && K(W) && W.v > st.high, vt = (W, xt) => En().defined(W).x((ht) => N(ht.t / i.stepMs)).y((ht) => J(ht.v)).curve(Ri), yt = vt(ut), rt = vt(mt), wt = vt(Tt);
      V.forEach((W) => {
        if (W.length > 1) {
          const xt = En().defined((ht) => Number.isFinite(ht.v) && !K(ht)).x((ht) => N(ht.t / i.stepMs)).y((ht) => J(ht.v)).curve(Ri);
          G.append("path").attr("d", xt(W)).attr("stroke", "#c7c7c7").attr("fill", "none").attr("stroke-width", 1.2).attr("opacity", 0.8), G.append("path").attr("d", rt(W)).attr("stroke", "#d73027").attr("fill", "none").attr("stroke-width", 1.5), G.append("path").attr("d", wt(W)).attr("stroke", "#fdae61").attr("fill", "none").attr("stroke-width", 1.5), G.append("path").attr("d", yt(W)).attr("stroke", "#1a9850").attr("fill", "none").attr("stroke-width", 1.5);
        }
      });
      const it = new Date(P), ft = it.getDate(), bt = ft === 1 ? `1 ${[
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
      ][it.getMonth()]}` : String(ft);
      G.append("text").attr("x", -12).attr("y", -8).attr("fill", "#777").attr("font-size", 10).attr("text-anchor", "start").text(bt), dt < Q - 1 && G.append("text").attr("x", _ / 2).attr("y", S - 2).attr("text-anchor", "middle").attr("fill", "#777").attr("font-size", 10).text("12pm");
    });
  }
  Te(() => {
    c(), m(), window.addEventListener("resize", m);
  });
  function g(v) {
    Me[v ? "unshift" : "push"](() => {
      s = v, n(0, s);
    });
  }
  return t.$$set = (v) => {
    "data" in v && n(1, i = v.data), "range" in v && n(2, r = v.range), "preset" in v && n(3, o = v.preset);
  }, t.$$.update = () => {
    t.$$.dirty & /*data, range, preset*/
    14 && i && r && o && m();
  }, [s, i, r, o, g];
}
class Ec extends le {
  constructor(e) {
    super(), oe(this, e, Sc, Fc, re, { data: 1, range: 2, preset: 3 });
  }
}
function Rc(t) {
  let e;
  return {
    c() {
      e = q("div"), j(e, "width", "100%");
    },
    m(n, i) {
      Lt(n, e, i), t[4](e);
    },
    p: kt,
    i: kt,
    o: kt,
    d(n) {
      n && Rt(e), t[4](null);
    }
  };
}
function Lc(t) {
  const e = Math.round(t / 6e4), n = Math.floor(e / 60), i = e % 60;
  return `(${n}h${String(i).padStart(2, "0")}min)`;
}
function Uc(t, e, n) {
  let { data: i } = e, { range: r = null } = e, { preset: o = "N" } = e, s;
  const f = {
    vlow: "#8a2f2f",
    low: "#d65b5b",
    targ: "#169b58",
    high: "#f1aa3b",
    vhigh: "#e47c2f"
  }, a = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol");
  function l() {
    return a() ? o === "T" ? {
      vlow: 3,
      low: 3.9,
      high: 7.8,
      vhigh: 13.9,
      unit: "mmol/L"
    } : o === "P" ? {
      vlow: 3,
      low: 3.5,
      high: 7.8,
      vhigh: 13.9,
      unit: "mmol/L"
    } : {
      vlow: 3,
      low: 3.9,
      high: 10,
      vhigh: 13.9,
      unit: "mmol/L"
    } : o === "T" ? {
      vlow: 54,
      low: 70,
      high: 140,
      vhigh: 250,
      unit: "mg/dL"
    } : o === "P" ? {
      vlow: 54,
      low: 63,
      high: 140,
      vhigh: 250,
      unit: "mg/dL"
    } : {
      vlow: 54,
      low: 70,
      high: 180,
      vhigh: 250,
      unit: "mg/dL"
    };
  }
  let d, c;
  const m = () => new Date(i.t0).getTime();
  function g() {
    return !c || !d ? {
      i0: 0,
      i1: c ? c.length - 1 : 0
    } : r ? {
      i0: Math.max(0, Math.ceil((r.start - d[0]) / i.stepMs)),
      i1: Math.min(c.length - 1, Math.floor((r.end - d[0]) / i.stepMs))
    } : { i0: 0, i1: c.length - 1 };
  }
  const v = (k) => (Math.round(k * 10) / 10).toFixed(1).replace(/\.0$/, "");
  function p(k, y) {
    if (a()) {
      const _ = (S) => v(S);
      return y === "vhigh" ? `>${_(k.vhigh)} ${k.unit}` : y === "high" ? `${_(k.high + 0.1)}–${_(k.vhigh)} ${k.unit}` : y === "targ" ? `${_(k.low)}–${_(k.high)} ${k.unit}` : y === "low" ? `${_(k.vlow)}–${_(k.low - 0.1)} ${k.unit}` : `<${_(k.vlow)} ${k.unit}`;
    } else {
      const _ = (S) => Math.round(S);
      return y === "vhigh" ? `>${_(k.vhigh)} ${k.unit}` : y === "high" ? `${_(k.high + 1)}–${_(k.vhigh)} ${k.unit}` : y === "targ" ? `${_(k.low)}–${_(k.high)} ${k.unit}` : y === "low" ? `${_(k.vlow)}–${_(k.low - 1)} ${k.unit}` : `<${_(k.vlow)} ${k.unit}`;
    }
  }
  function C() {
    if (!s || !c) return;
    const { i0: k, i1: y } = g(), _ = l();
    let S = 0, U = {
      vlow: 0,
      low: 0,
      targ: 0,
      high: 0,
      vhigh: 0
    };
    for (let Q = k; Q <= y; Q++) {
      const lt = c[Q];
      Number.isFinite(lt) && lt >= 0 && (S++, lt < _.vlow ? U.vlow++ : lt < _.low ? U.low++ : lt <= _.high ? U.targ++ : lt <= _.vhigh ? U.high++ : U.vhigh++);
    }
    const R = (Q) => S ? Math.round(1e3 * U[Q] / S) / 10 : 0, T = (Q) => U[Q] * i.stepMs, M = Math.max(700, s.getBoundingClientRect().width || 700), A = 360, w = { l: 78, r: 50, t: 20 }, D = xe(s).selectAll("svg").data([0]).join("svg").attr("width", M).attr("height", A);
    D.selectAll("*").remove();
    const x = {
      x: w.l + 20,
      w: 56,
      top: w.t + 18
    }, I = {
      vhigh: 72,
      high: 72,
      targ: 140,
      low: 20,
      vlow: 20
    };
    let Y = x.top;
    ["vhigh", "high", "targ", "low", "vlow"].forEach((Q) => {
      D.append("rect").attr("x", x.x).attr("y", Y).attr("width", x.w).attr("height", I[Q]).attr("fill", f[Q]), Y += I[Q];
    });
    const L = (Q, lt) => D.append("text").attr("x", x.x - 10).attr("y", lt).attr("text-anchor", "end").attr("dominant-baseline", "middle").attr("font-weight", 700).attr("fill", "#222").text(Q);
    L(
      a() ? v(_.vhigh) : String(Math.round(_.vhigh)),
      x.top + I.vhigh
    ), L(a() ? v(_.high) : String(Math.round(_.high)), x.top + I.vhigh + I.high), L(_.unit, x.top + I.vhigh + I.high + I.targ / 2), L(a() ? v(_.low) : String(Math.round(_.low)), x.top + I.vhigh + I.high + I.targ), L(a() ? v(_.vlow) : String(Math.round(_.vlow)), x.top + I.vhigh + I.high + I.targ + I.low);
    const ot = [
      { k: "vhigh", label: "Very High" },
      { k: "high", label: "High" },
      { k: "targ", label: "Target" },
      { k: "low", label: "Low" },
      { k: "vlow", label: "Very Low" }
    ], _t = (Q) => w.t + 30 + Q * 70;
    ot.forEach((Q, lt) => {
      const nt = _t(lt);
      lt > 0 && D.append("line").attr("x1", w.l + 110).attr("x2", M - w.r).attr("y1", nt - 24).attr("y2", nt - 24).attr("stroke", "#e1e4ea"), D.append("text").attr("x", w.l + 120).attr("y", nt).attr("font-weight", 800).attr("fill", "#111").text(Q.label), D.append("text").attr("x", w.l + 120 + 90).attr("y", nt).attr("fill", "#888").text(p(_, Q.k)), D.append("text").attr("x", M - w.r - 120).attr("y", nt).attr("text-anchor", "end").attr("font-weight", 800).attr("fill", "#111").text(`${R(Q.k)}%`), D.append("text").attr("x", M - w.r - 20).attr("y", nt).attr("fill", "#888").text(Lc(T(Q.k)));
    });
  }
  Te(() => C());
  function E(k) {
    Me[k ? "unshift" : "push"](() => {
      s = k, n(0, s);
    });
  }
  return t.$$set = (k) => {
    "data" in k && n(1, i = k.data), "range" in k && n(2, r = k.range), "preset" in k && n(3, o = k.preset);
  }, t.$$.update = () => {
    t.$$.dirty & /*data*/
    2 && i && (d = Float64Array.from({ length: i.glucose.length }, (k, y) => m() + y * i.stepMs), c = Float64Array.from(i.glucose)), t.$$.dirty & /*data, range, preset*/
    14 && i && (r || !0) && o && C();
  }, [s, i, r, o, E];
}
class Hc extends le {
  constructor(e) {
    super(), oe(this, e, Uc, Rc, re, { data: 1, range: 2, preset: 3 });
  }
}
function Pc(t) {
  let e, n, i, r = (
    /*fmt1*/
    t[3](
      /*TH*/
      t[2]().vlow
    ) + ""
  ), o, s, f = (
    /*fmt1*/
    t[3](
      /*TH*/
      t[2]().low
    ) + ""
  ), a, l, d = (
    /*fmt1*/
    t[3](
      /*TH*/
      t[2]().high
    ) + ""
  ), c, m, g = (
    /*fmt1*/
    t[3](
      /*TH*/
      t[2]().vhigh
    ) + ""
  ), v, p, C = (
    /*TH*/
    t[2]().unit + ""
  ), E, k, y, _, S, U, R, T, M, A, w = (
    /*fmt1*/
    t[3](
      /*TH*/
      t[2]().vhigh
    ) + ""
  ), D, x = (
    /*TH*/
    t[2]().unit + ""
  ), I, Y, L = (
    /*stats*/
    t[0].vhigh.pct + ""
  ), ot, _t, Q, lt = (
    /*stats*/
    t[0].vhigh.dur + ""
  ), nt, st, At, X, P = (
    /*isMmol*/
    t[1]() ? `${/*fmt1*/
    t[3](
      /*TH*/
      t[2]().high + 0.1
    )}-${/*fmt1*/
    t[3](
      /*TH*/
      t[2]().vhigh
    )} ${/*TH*/
    t[2]().unit}` : `${/*fmt1*/
    t[3](
      /*TH*/
      t[2]().high + 1
    )}-${/*fmt1*/
    t[3](
      /*TH*/
      t[2]().vhigh
    )} ${/*TH*/
    t[2]().unit}`
  ), $, dt, b = (
    /*stats*/
    t[0].high.pct + ""
  ), B, tt, G, N = (
    /*stats*/
    t[0].high.dur + ""
  ), J, F, z, V, Z = (
    /*fmt1*/
    t[3](
      /*TH*/
      t[2]().low
    ) + ""
  ), K, pt, Mt = (
    /*fmt1*/
    t[3](
      /*TH*/
      t[2]().high
    ) + ""
  ), ut, mt = (
    /*TH*/
    t[2]().unit + ""
  ), Tt, vt, yt = (
    /*stats*/
    t[0].targ.pct + ""
  ), rt, wt, it, ft = (
    /*stats*/
    t[0].targ.dur + ""
  ), gt, at, bt, W, xt = (
    /*isMmol*/
    t[1]() ? `${/*fmt1*/
    t[3](
      /*TH*/
      t[2]().vlow
    )}-${/*fmt1*/
    t[3](
      /*TH*/
      t[2]().low - 0.1
    )} ${/*TH*/
    t[2]().unit}` : `${/*fmt1*/
    t[3](
      /*TH*/
      t[2]().vlow
    )}-${/*fmt1*/
    t[3](
      /*TH*/
      t[2]().low - 1
    )} ${/*TH*/
    t[2]().unit}`
  ), ht, Et, Ht = (
    /*stats*/
    t[0].low.pct + ""
  ), Vt, It, zt, Xt = (
    /*stats*/
    t[0].low.dur + ""
  ), ue, Ut, Nt, Ft, Qe, In = (
    /*fmt1*/
    t[3](
      /*TH*/
      t[2]().vlow
    ) + ""
  ), cn, Ae = (
    /*TH*/
    t[2]().unit + ""
  ), gn, Wt, Ee = (
    /*stats*/
    t[0].vlow.pct + ""
  ), Oe, dn, ee, fe = (
    /*stats*/
    t[0].vlow.dur + ""
  ), ne;
  return {
    c() {
      e = O("svg"), n = O("rect"), i = O("text"), o = H(r), s = O("text"), a = H(f), l = O("text"), c = H(d), m = O("text"), v = H(g), p = O("text"), E = H(C), k = O("rect"), y = O("rect"), _ = O("rect"), S = O("rect"), U = O("rect"), R = O("text"), T = H("Very High"), M = O("text"), A = H(">"), D = H(w), I = H(x), Y = O("text"), ot = H(L), _t = H("%"), Q = O("text"), nt = H(lt), st = O("text"), At = H("High"), X = O("text"), $ = H(P), dt = O("text"), B = H(b), tt = H("%"), G = O("text"), J = H(N), F = O("text"), z = H("Target"), V = O("text"), K = H(Z), pt = H("-"), ut = H(Mt), Tt = H(mt), vt = O("text"), rt = H(yt), wt = H("%"), it = O("text"), gt = H(ft), at = O("text"), bt = H("Low"), W = O("text"), ht = H(xt), Et = O("text"), Vt = H(Ht), It = H("%"), zt = O("text"), ue = H(Xt), Ut = O("text"), Nt = H("Very Low"), Ft = O("text"), Qe = H("<"), cn = H(In), gn = H(Ae), Wt = O("text"), Oe = H(Ee), dn = H("%"), ee = O("text"), ne = H(fe), u(n, "x", "15"), u(n, "y", "40"), u(n, "width", "50"), u(n, "height", "210"), u(n, "fill", "white"), u(n, "stroke", "#ccc"), u(n, "stroke-width", "1"), u(i, "x", "10"), u(i, "y", "250"), u(i, "font-size", "10"), u(i, "fill", "#666"), u(i, "text-anchor", "end"), u(s, "x", "10"), u(s, "y", "220"), u(s, "font-size", "10"), u(s, "fill", "#666"), u(s, "text-anchor", "end"), u(l, "x", "10"), u(l, "y", "165"), u(l, "font-size", "10"), u(l, "fill", "#666"), u(l, "text-anchor", "end"), u(m, "x", "10"), u(m, "y", "85"), u(m, "font-size", "10"), u(m, "fill", "#666"), u(m, "text-anchor", "end"), u(p, "x", "8"), u(p, "y", "155"), u(p, "font-size", "10"), u(p, "fill", "#666"), u(p, "text-anchor", "middle"), u(p, "transform", "rotate(-90, 8, 155)"), u(k, "x", "15"), u(k, "y", "40"), u(k, "width", "50"), u(k, "height", "25"), u(k, "fill", "#ff6600"), u(y, "x", "15"), u(y, "y", "65"), u(y, "width", "50"), u(y, "height", "50"), u(y, "fill", "#ff8c00"), u(_, "x", "15"), u(_, "y", "115"), u(_, "width", "50"), u(_, "height", "120"), u(_, "fill", "#2d8f2d"), u(S, "x", "15"), u(S, "y", "235"), u(S, "width", "50"), u(S, "height", "12"), u(S, "fill", "#990000"), u(U, "x", "15"), u(U, "y", "247"), u(U, "width", "50"), u(U, "height", "3"), u(U, "fill", "#cc0000"), u(R, "x", "80"), u(R, "y", "48"), u(R, "font-size", "11"), u(R, "font-weight", "bold"), u(R, "fill", "#333"), u(M, "x", "80"), u(M, "y", "60"), u(M, "font-size", "9"), u(M, "fill", "#666"), u(Y, "x", "370"), u(Y, "y", "48"), u(Y, "font-size", "11"), u(Y, "font-weight", "bold"), u(Y, "fill", "#333"), u(Y, "text-anchor", "end"), u(Q, "x", "370"), u(Q, "y", "60"), u(Q, "font-size", "9"), u(Q, "fill", "#666"), u(Q, "text-anchor", "end"), u(st, "x", "80"), u(st, "y", "82"), u(st, "font-size", "11"), u(st, "font-weight", "bold"), u(st, "fill", "#333"), u(X, "x", "80"), u(X, "y", "94"), u(X, "font-size", "9"), u(X, "fill", "#666"), u(dt, "x", "370"), u(dt, "y", "82"), u(dt, "font-size", "11"), u(dt, "font-weight", "bold"), u(dt, "fill", "#333"), u(dt, "text-anchor", "end"), u(G, "x", "370"), u(G, "y", "94"), u(G, "font-size", "9"), u(G, "fill", "#666"), u(G, "text-anchor", "end"), u(F, "x", "80"), u(F, "y", "165"), u(F, "font-size", "11"), u(F, "font-weight", "bold"), u(F, "fill", "#333"), u(V, "x", "80"), u(V, "y", "177"), u(V, "font-size", "9"), u(V, "fill", "#666"), u(vt, "x", "370"), u(vt, "y", "165"), u(vt, "font-size", "11"), u(vt, "font-weight", "bold"), u(vt, "fill", "#333"), u(vt, "text-anchor", "end"), u(it, "x", "370"), u(it, "y", "177"), u(it, "font-size", "9"), u(it, "fill", "#666"), u(it, "text-anchor", "end"), u(at, "x", "80"), u(at, "y", "235"), u(at, "font-size", "11"), u(at, "font-weight", "bold"), u(at, "fill", "#333"), u(W, "x", "80"), u(W, "y", "247"), u(W, "font-size", "9"), u(W, "fill", "#666"), u(Et, "x", "370"), u(Et, "y", "235"), u(Et, "font-size", "11"), u(Et, "font-weight", "bold"), u(Et, "fill", "#333"), u(Et, "text-anchor", "end"), u(zt, "x", "370"), u(zt, "y", "247"), u(zt, "font-size", "9"), u(zt, "fill", "#666"), u(zt, "text-anchor", "end"), u(Ut, "x", "80"), u(Ut, "y", "265"), u(Ut, "font-size", "11"), u(Ut, "font-weight", "bold"), u(Ut, "fill", "#333"), u(Ft, "x", "80"), u(Ft, "y", "277"), u(Ft, "font-size", "9"), u(Ft, "fill", "#666"), u(Wt, "x", "370"), u(Wt, "y", "265"), u(Wt, "font-size", "11"), u(Wt, "font-weight", "bold"), u(Wt, "fill", "#333"), u(Wt, "text-anchor", "end"), u(ee, "x", "370"), u(ee, "y", "277"), u(ee, "font-size", "9"), u(ee, "fill", "#666"), u(ee, "text-anchor", "end"), u(e, "width", "400"), u(e, "height", "320"), u(e, "viewBox", "0 0 400 320"), u(e, "xmlns", "http://www.w3.org/2000/svg");
    },
    m(Pt, Bt) {
      Lt(Pt, e, Bt), h(e, n), h(e, i), h(i, o), h(e, s), h(s, a), h(e, l), h(l, c), h(e, m), h(m, v), h(e, p), h(p, E), h(e, k), h(e, y), h(e, _), h(e, S), h(e, U), h(e, R), h(R, T), h(e, M), h(M, A), h(M, D), h(M, I), h(e, Y), h(Y, ot), h(Y, _t), h(e, Q), h(Q, nt), h(e, st), h(st, At), h(e, X), h(X, $), h(e, dt), h(dt, B), h(dt, tt), h(e, G), h(G, J), h(e, F), h(F, z), h(e, V), h(V, K), h(V, pt), h(V, ut), h(V, Tt), h(e, vt), h(vt, rt), h(vt, wt), h(e, it), h(it, gt), h(e, at), h(at, bt), h(e, W), h(W, ht), h(e, Et), h(Et, Vt), h(Et, It), h(e, zt), h(zt, ue), h(e, Ut), h(Ut, Nt), h(e, Ft), h(Ft, Qe), h(Ft, cn), h(Ft, gn), h(e, Wt), h(Wt, Oe), h(Wt, dn), h(e, ee), h(ee, ne);
    },
    p(Pt, [Bt]) {
      Bt & /*stats*/
      1 && L !== (L = /*stats*/
      Pt[0].vhigh.pct + "") && Ct(ot, L), Bt & /*stats*/
      1 && lt !== (lt = /*stats*/
      Pt[0].vhigh.dur + "") && Ct(nt, lt), Bt & /*stats*/
      1 && b !== (b = /*stats*/
      Pt[0].high.pct + "") && Ct(B, b), Bt & /*stats*/
      1 && N !== (N = /*stats*/
      Pt[0].high.dur + "") && Ct(J, N), Bt & /*stats*/
      1 && yt !== (yt = /*stats*/
      Pt[0].targ.pct + "") && Ct(rt, yt), Bt & /*stats*/
      1 && ft !== (ft = /*stats*/
      Pt[0].targ.dur + "") && Ct(gt, ft), Bt & /*stats*/
      1 && Ht !== (Ht = /*stats*/
      Pt[0].low.pct + "") && Ct(Vt, Ht), Bt & /*stats*/
      1 && Xt !== (Xt = /*stats*/
      Pt[0].low.dur + "") && Ct(ue, Xt), Bt & /*stats*/
      1 && Ee !== (Ee = /*stats*/
      Pt[0].vlow.pct + "") && Ct(Oe, Ee), Bt & /*stats*/
      1 && fe !== (fe = /*stats*/
      Pt[0].vlow.dur + "") && Ct(ne, fe);
    },
    i: kt,
    o: kt,
    d(Pt) {
      Pt && Rt(e);
    }
  };
}
function Mn(t, e) {
  return e ? Math.round(1e3 * t / e) / 10 : 0;
}
function Tn(t) {
  const e = Math.round(t / 6e4), n = Math.floor(e / 60), i = e % 60;
  return `(${n}h${String(i).padStart(2, "0")}min)`;
}
function zc(t, e, n) {
  let { data: i } = e, { range: r = null } = e, { preset: o = "N" } = e;
  const s = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol");
  function f() {
    return s() ? o === "T" ? {
      vlow: 3,
      low: 3.9,
      high: 7.8,
      vhigh: 13.9,
      unit: "mmol/L"
    } : o === "P" ? {
      vlow: 3,
      low: 3.5,
      high: 7.8,
      vhigh: 13.9,
      unit: "mmol/L"
    } : {
      vlow: 3,
      low: 3.9,
      high: 10,
      vhigh: 13.9,
      unit: "mmol/L"
    } : o === "T" ? {
      vlow: 54,
      low: 70,
      high: 140,
      vhigh: 250,
      unit: "mg/dL"
    } : o === "P" ? {
      vlow: 54,
      low: 63,
      high: 140,
      vhigh: 250,
      unit: "mg/dL"
    } : {
      vlow: 54,
      low: 70,
      high: 180,
      vhigh: 250,
      unit: "mg/dL"
    };
  }
  let a, l;
  const d = () => new Date(i.t0).getTime();
  function c() {
    if (!l) return { i0: 0, i1: 0 };
    if (!r) return { i0: 0, i1: l.length - 1 };
    const p = Math.max(0, Math.ceil((r.start - a[0]) / i.stepMs)), C = Math.min(l.length - 1, Math.floor((r.end - a[0]) / i.stepMs));
    return { i0: p, i1: C };
  }
  const m = (p) => s() ? (Math.round(p * 10) / 10).toFixed(1).replace(/\.0$/, "") : String(Math.round(p));
  let g = {
    vhigh: { pct: 0, dur: "(0min)" },
    high: { pct: 0, dur: "(0min)" },
    targ: { pct: 0, dur: "(0min)" },
    low: { pct: 0, dur: "(0min)" },
    vlow: { pct: 0, dur: "(0min)" }
  };
  function v() {
    if (!l) return;
    const p = f(), { i0: C, i1: E } = c();
    let k = 0, y = {
      vlow: 0,
      low: 0,
      targ: 0,
      high: 0,
      vhigh: 0
    };
    for (let S = C; S <= E; S++) {
      const U = l[S];
      Number.isFinite(U) && U >= 0 && (k++, U < p.vlow ? y.vlow++ : U < p.low ? y.low++ : U <= p.high ? y.targ++ : U <= p.vhigh ? y.high++ : y.vhigh++);
    }
    const _ = i.stepMs;
    n(0, g = {
      vhigh: {
        pct: Mn(y.vhigh, k),
        dur: Tn(y.vhigh * _)
      },
      high: {
        pct: Mn(y.high, k),
        dur: Tn(y.high * _)
      },
      targ: {
        pct: Mn(y.targ, k),
        dur: Tn(y.targ * _)
      },
      low: {
        pct: Mn(y.low, k),
        dur: Tn(y.low * _)
      },
      vlow: {
        pct: Mn(y.vlow, k),
        dur: Tn(y.vlow * _)
      }
    });
  }
  return Te(v), t.$$set = (p) => {
    "data" in p && n(4, i = p.data), "range" in p && n(5, r = p.range), "preset" in p && n(6, o = p.preset);
  }, t.$$.update = () => {
    t.$$.dirty & /*data*/
    16 && i && (a = Float64Array.from({ length: i.glucose.length }, (p, C) => d() + C * i.stepMs), l = Float64Array.from(i.glucose)), t.$$.dirty & /*data, range, preset*/
    112 && i && (r || !0) && o && v();
  }, [g, s, f, m, i, r, o];
}
class Yc extends le {
  constructor(e) {
    super(), oe(this, e, zc, Pc, re, { data: 4, range: 5, preset: 6 });
  }
}
function qc(t) {
  let e;
  return {
    c() {
      e = q("div");
    },
    m(n, i) {
      Lt(n, e, i), t[4](e);
    },
    p: kt,
    i: kt,
    o: kt,
    d(n) {
      n && Rt(e), t[4](null);
    }
  };
}
function kn(t, e) {
  return e ? Math.round(1e3 * t / e) / 10 : 0;
}
function Ic(t, e, n) {
  let { data: i } = e, { range: r = null } = e, { preset: o = "N" } = e, s;
  const f = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol");
  function a() {
    return f() ? {
      vlow: 3,
      low: 3.9,
      high: o === "T" || o === "P" ? 7.8 : 10,
      vhigh: 13.9
    } : o === "T" ? { vlow: 54, low: 70, high: 140, vhigh: 250 } : o === "P" ? { vlow: 54, low: 63, high: 140, vhigh: 250 } : { vlow: 54, low: 70, high: 180, vhigh: 250 };
  }
  let l, d;
  const c = () => new Date(i.t0).getTime();
  function m() {
    if (!d || !l) return {
      i0: 0,
      i1: d ? d.length - 1 : 0
    };
    if (!r) return { i0: 0, i1: d.length - 1 };
    const p = Math.max(0, Math.ceil((r.start - l[0]) / i.stepMs)), C = Math.min(d.length - 1, Math.floor((r.end - l[0]) / i.stepMs));
    return { i0: p, i1: C };
  }
  function g() {
    if (!s || !d) return;
    const { i0: p, i1: C } = m(), E = a(), k = f() ? 7.8 : 140;
    let y = 0, _ = 0, S = 0, U = 0, R = 0, T = 0;
    for (let X = p; X <= C; X++) {
      const P = d[X];
      Number.isFinite(P) && P >= 0 && (y++, P < E.vlow ? _++ : P < E.low ? S++ : P <= E.high ? U++ : P <= E.vhigh ? R++ : T++, P >= E.low && P <= k);
    }
    const M = [
      {
        name: "Very Low",
        pct: kn(_, y),
        color: "#e57373",
        goal: "<1%"
      },
      {
        name: "Low",
        pct: kn(S, y),
        color: "#ff9e80",
        goal: "<4%"
      },
      {
        name: "Target",
        pct: kn(U, y),
        color: "#86c89d",
        goal: "≥70%"
      },
      {
        name: "High",
        pct: kn(R, y),
        color: "#ffcc80",
        goal: "<25%"
      },
      {
        name: "Very High",
        pct: kn(T, y),
        color: "#f46d43",
        goal: "<5%"
      }
    ], A = 300, w = Math.max(320, s.getBoundingClientRect().width || 300), D = { t: 20, r: 80, b: 30, l: 30 }, x = xe(s).selectAll("svg").data([0]).join("svg").attr("width", w).attr("height", A).style("overflow", "visible");
    x.selectAll("*").remove();
    const I = sn().domain([0, 100]).range([A - D.b, D.t]), Y = [];
    let L = null, ot = null, _t = 0;
    M.forEach((X) => {
      const P = I(_t), $ = I(_t + X.pct);
      x.append("rect").attr("x", D.l).attr("y", $).attr("width", 60).attr("height", Math.max(0, P - $)).attr("fill", X.color), X.name == "High" || X.name == "Low" ? Y.push({
        name: X.name,
        text: `${X.name} ${X.pct}%`,
        center: (P + $) / 2,
        color: X.color
      }) : Y.push({
        name: X.name,
        text: `${X.name} ${X.pct}% (goal ${X.goal})`,
        center: (P + $) / 2,
        color: X.color
      }), X.name === "High" && (L = P), X.name === "Very High" && (ot = P), _t += X.pct;
    }), y === 0 && x.append("rect").attr("x", D.l).attr("y", I(100)).attr("width", 60).attr("height", I(0) - I(100)).attr("fill", "#e6e6e6");
    const Q = 14, lt = D.t + 8, nt = A - D.b - 8;
    Y.sort((X, P) => X.center - P.center);
    for (let X = 0; X < Y.length; X++) {
      const P = Y[X - 1];
      let $ = Math.max(lt, Math.min(nt, Y[X].center));
      P && $ < P.y + Q && ($ = P.y + Q), Y[X].y = $;
    }
    for (let X = Y.length - 2; X >= 0; X--) {
      const P = Y[X + 1];
      Y[X].y > P.y - Q && (Y[X].y = P.y - Q), Y[X].y < lt && (Y[X].y = lt);
    }
    Y.forEach((X) => {
      x.append("line").attr("x1", D.l + 60).attr("x2", D.l + 66).attr("y1", X.y).attr("y2", X.y).attr("stroke", X.color).attr("opacity", 0.8), x.append("text").attr("x", D.l + 70).attr("y", X.y).attr("dy", "0.35em").attr("fill", "#000").attr("font-size", 11).text(X.text).attr("data-name", X.name);
    });
    try {
      const X = f(), P = E.high, $ = E.vhigh, dt = D.l - 6, b = (B) => B.attr("text-anchor", "end").attr("font-size", 10).attr("font-weight", 700).attr("fill", "#000");
      L !== null && x.append("text").attr("x", dt).attr("y", L).attr("dy", "0.35em").call(b).text(P), ot !== null && x.append("text").attr("x", dt).attr("y", ot).attr("dy", "0.35em").call(b).text($);
    } catch {
    }
    const st = "#000", At = "#000";
    try {
      const X = Y.find((b) => b.name === "Very High"), P = Y.find((b) => b.name === "High");
      if (X && P) {
        const b = (X.y + P.y) / 2, tt = `${Math.round((M[3].pct + M[4].pct) * 10) / 10}%  (goal ${M[1].goal})`, G = x.select('text[data-name="Very High"]').node(), N = x.select('text[data-name="High"]').node();
        let J = D.l + 70;
        try {
          const F = G ? parseFloat(G.getAttribute("x")) + G.getComputedTextLength() : J, z = N ? parseFloat(N.getAttribute("x")) + N.getComputedTextLength() : J;
          J = Math.max(F, z) + 12;
        } catch {
        }
        x.append("line").attr("x1", J - 6).attr("x2", J).attr("y1", b).attr("y2", b).attr("stroke", st).attr("opacity", 0.9), x.append("text").attr("x", J + 4).attr("y", b).attr("dy", "0.35em").attr("fill", st).attr("font-size", 11).text(tt);
      }
      const $ = Y.find((b) => b.name === "Very Low"), dt = Y.find((b) => b.name === "Low");
      if ($ && dt) {
        const b = ($.y + dt.y) / 2, tt = `${Math.round((M[0].pct + M[1].pct) * 10) / 10}% (goal ${M[3].goal})`;
        let G = D.l + 70;
        try {
          const N = x.select('text[data-name="Low"]').node(), J = x.select('text[data-name="Very Low"]').node(), F = N ? parseFloat(N.getAttribute("x")) + N.getComputedTextLength() : G, z = J ? parseFloat(J.getAttribute("x")) + J.getComputedTextLength() : G;
          G = Math.max(F, z) + 12;
        } catch {
        }
        x.append("line").attr("x1", G - 6).attr("x2", G).attr("y1", b).attr("y2", b).attr("stroke", At).attr("opacity", 0.9), x.append("text").attr("x", G + 4).attr("y", b).attr("dy", "0.35em").attr("fill", At).attr("font-size", 11).text(tt);
      }
    } catch {
    }
  }
  Te(() => {
    g();
  });
  function v(p) {
    Me[p ? "unshift" : "push"](() => {
      s = p, n(0, s);
    });
  }
  return t.$$set = (p) => {
    "data" in p && n(1, i = p.data), "range" in p && n(2, r = p.range), "preset" in p && n(3, o = p.preset);
  }, t.$$.update = () => {
    t.$$.dirty & /*data*/
    2 && i && (l = Float64Array.from({ length: i.glucose.length }, (p, C) => c() + C * i.stepMs), d = Float64Array.from(i.glucose)), t.$$.dirty & /*data, range, preset*/
    14 && i && (r || !0) && o && g();
  }, [s, i, r, o, v];
}
class Vc extends le {
  constructor(e) {
    super(), oe(this, e, Ic, qc, re, { data: 1, range: 2, preset: 3 });
  }
}
function oo(t) {
  let e, n, i;
  return {
    c() {
      e = O("line"), u(e, "x1", "90"), u(e, "y1", n = 30 + /*linePositions*/
      t[1].high), u(e, "x2", se), u(e, "y2", i = /*textPositions*/
      t[5].high - 40), u(e, "stroke", "#ccc"), u(e, "stroke-width", "1");
    },
    m(r, o) {
      Lt(r, e, o);
    },
    p(r, o) {
      o & /*linePositions*/
      2 && n !== (n = 30 + /*linePositions*/
      r[1].high) && u(e, "y1", n), o & /*textPositions*/
      32 && i !== (i = /*textPositions*/
      r[5].high - 40) && u(e, "y2", i);
    },
    d(r) {
      r && Rt(e);
    }
  };
}
function lo(t) {
  let e, n, i;
  return {
    c() {
      e = O("line"), u(e, "x1", "90"), u(e, "y1", n = 30 + /*linePositions*/
      t[1].targ), u(e, "x2", se), u(e, "y2", i = /*textPositions*/
      t[5].targ - 40), u(e, "stroke", "#ccc"), u(e, "stroke-width", "1");
    },
    m(r, o) {
      Lt(r, e, o);
    },
    p(r, o) {
      o & /*linePositions*/
      2 && n !== (n = 30 + /*linePositions*/
      r[1].targ) && u(e, "y1", n), o & /*textPositions*/
      32 && i !== (i = /*textPositions*/
      r[5].targ - 40) && u(e, "y2", i);
    },
    d(r) {
      r && Rt(e);
    }
  };
}
function ao(t) {
  let e, n, i;
  return {
    c() {
      e = O("line"), u(e, "x1", "90"), u(e, "y1", n = 30 + /*linePositions*/
      t[1].low), u(e, "x2", se), u(e, "y2", i = /*textPositions*/
      t[5].low - 40), u(e, "stroke", "#ccc"), u(e, "stroke-width", "1");
    },
    m(r, o) {
      Lt(r, e, o);
    },
    p(r, o) {
      o & /*linePositions*/
      2 && n !== (n = 30 + /*linePositions*/
      r[1].low) && u(e, "y1", n), o & /*textPositions*/
      32 && i !== (i = /*textPositions*/
      r[5].low - 40) && u(e, "y2", i);
    },
    d(r) {
      r && Rt(e);
    }
  };
}
function so(t) {
  let e, n, i;
  return {
    c() {
      e = O("rect"), u(e, "x", "40"), u(e, "y", n = 30 + /*barPositions*/
      t[2].vlow), u(e, "width", "50"), u(e, "height", i = /*barHeights*/
      t[3].vlow), u(e, "fill", "#e57373");
    },
    m(r, o) {
      Lt(r, e, o);
    },
    p(r, o) {
      o & /*barPositions*/
      4 && n !== (n = 30 + /*barPositions*/
      r[2].vlow) && u(e, "y", n), o & /*barHeights*/
      8 && i !== (i = /*barHeights*/
      r[3].vlow) && u(e, "height", i);
    },
    d(r) {
      r && Rt(e);
    }
  };
}
function uo(t) {
  let e, n, i;
  return {
    c() {
      e = O("rect"), u(e, "x", "40"), u(e, "y", n = 30 + /*barPositions*/
      t[2].low), u(e, "width", "50"), u(e, "height", i = /*barHeights*/
      t[3].low), u(e, "fill", "#ff9e80");
    },
    m(r, o) {
      Lt(r, e, o);
    },
    p(r, o) {
      o & /*barPositions*/
      4 && n !== (n = 30 + /*barPositions*/
      r[2].low) && u(e, "y", n), o & /*barHeights*/
      8 && i !== (i = /*barHeights*/
      r[3].low) && u(e, "height", i);
    },
    d(r) {
      r && Rt(e);
    }
  };
}
function fo(t) {
  let e, n, i;
  return {
    c() {
      e = O("rect"), u(e, "x", "40"), u(e, "y", n = 30 + /*barPositions*/
      t[2].targ), u(e, "width", "50"), u(e, "height", i = /*barHeights*/
      t[3].targ), u(e, "fill", "#86c89d");
    },
    m(r, o) {
      Lt(r, e, o);
    },
    p(r, o) {
      o & /*barPositions*/
      4 && n !== (n = 30 + /*barPositions*/
      r[2].targ) && u(e, "y", n), o & /*barHeights*/
      8 && i !== (i = /*barHeights*/
      r[3].targ) && u(e, "height", i);
    },
    d(r) {
      r && Rt(e);
    }
  };
}
function ho(t) {
  let e, n, i;
  return {
    c() {
      e = O("rect"), u(e, "x", "40"), u(e, "y", n = 30 + /*barPositions*/
      t[2].high), u(e, "width", "50"), u(e, "height", i = /*barHeights*/
      t[3].high), u(e, "fill", "#ffcc80");
    },
    m(r, o) {
      Lt(r, e, o);
    },
    p(r, o) {
      o & /*barPositions*/
      4 && n !== (n = 30 + /*barPositions*/
      r[2].high) && u(e, "y", n), o & /*barHeights*/
      8 && i !== (i = /*barHeights*/
      r[3].high) && u(e, "height", i);
    },
    d(r) {
      r && Rt(e);
    }
  };
}
function co(t) {
  let e, n, i;
  return {
    c() {
      e = O("rect"), u(e, "x", "40"), u(e, "y", n = 30 + /*barPositions*/
      t[2].vhigh), u(e, "width", "50"), u(e, "height", i = /*barHeights*/
      t[3].vhigh), u(e, "fill", "#ff8a65");
    },
    m(r, o) {
      Lt(r, e, o);
    },
    p(r, o) {
      o & /*barPositions*/
      4 && n !== (n = 30 + /*barPositions*/
      r[2].vhigh) && u(e, "y", n), o & /*barHeights*/
      8 && i !== (i = /*barHeights*/
      r[3].vhigh) && u(e, "height", i);
    },
    d(r) {
      r && Rt(e);
    }
  };
}
function Wc(t) {
  let e, n, i, r, o = (
    /*isMmol*/
    (t[7]() ? (
      /*TH*/
      t[8]().low.toFixed(1)
    ) : (
      /*TH*/
      t[8]().low
    )) + ""
  ), s, f, a, l = (
    /*isMmol*/
    (t[7]() ? (
      /*TH*/
      t[8]().high.toFixed(1)
    ) : (
      /*TH*/
      t[8]().high
    )) + ""
  ), d, c, m, g = (
    /*isMmol*/
    (t[7]() ? (
      /*TH*/
      t[8]().vhigh.toFixed(1)
    ) : (
      /*TH*/
      t[8]().vhigh
    )) + ""
  ), v, p, C, E, k, y, _, S, U, R, T, M, A, w, D, x, I, Y, L = (
    /*getRangeText*/
    t[9]("vhigh") + ""
  ), ot, _t, Q, lt, nt = Math.round(
    /*pct*/
    t[0].vhigh
  ) + "", st, At, X, P, $, dt = _e(
    /*minutes*/
    t[4].vhigh
  ) + "", b, B, tt, G, N, J, F, z, V, Z, K = (
    /*getRangeText*/
    t[9]("high") + ""
  ), pt, Mt, ut, mt, Tt = Math.round(
    /*pct*/
    t[0].high
  ) + "", vt, yt, rt, wt, it, ft = _e(
    /*minutes*/
    t[4].high
  ) + "", gt, at, bt, W, xt, ht, Et, Ht, Vt, It, zt = (
    /*getRangeText*/
    t[9]("targ") + ""
  ), Xt, ue, Ut, Nt, Ft = Math.round(
    /*pct*/
    t[0].targ
  ) + "", Qe, In, cn, Ae, gn, Wt = _e(
    /*minutes*/
    t[4].targ
  ) + "", Ee, Oe, dn, ee, fe, ne, Pt, Bt, lr, mn, cl = (
    /*getRangeText*/
    t[9]("low") + ""
  ), ar, sr, we, Re, Vn = Math.round(
    /*pct*/
    t[0].low
  ) + "", pi, ur, fr, Le, hr, Wn = _e(
    /*minutes*/
    t[4].low
  ) + "", yi, cr, gr, Bn, Je, Ne, $e, dr, mr, vn, gl = (
    /*getRangeText*/
    t[9]("vlow") + ""
  ), vr, wr, De, Ue, Xn = Math.round(
    /*pct*/
    t[0].vlow
  ) + "", _i, pr, yr, He, _r, Gn = _e(
    /*minutes*/
    t[4].vlow
  ) + "", xi, xr, Zn, Gt = (
    /*pct*/
    t[0].high > 0 && oo(t)
  ), Zt = (
    /*pct*/
    t[0].targ > 0 && lo(t)
  ), Qt = (
    /*pct*/
    t[0].low > 0 && ao(t)
  ), Ot = (
    /*barHeights*/
    t[3].vlow > 0 && so(t)
  ), Jt = (
    /*barHeights*/
    t[3].low > 0 && uo(t)
  ), $t = (
    /*barHeights*/
    t[3].targ > 0 && fo(t)
  ), Kt = (
    /*barHeights*/
    t[3].high > 0 && ho(t)
  ), jt = (
    /*barHeights*/
    t[3].vhigh > 0 && co(t)
  );
  return {
    c() {
      e = q("div"), n = O("svg"), i = O("rect"), r = O("text"), s = H(o), a = O("text"), d = H(l), m = O("text"), v = H(g), C = O("path"), Gt && Gt.c(), k = ze(), Zt && Zt.c(), y = ze(), Qt && Qt.c(), _ = O("path"), Ot && Ot.c(), U = ze(), Jt && Jt.c(), R = ze(), $t && $t.c(), T = ze(), Kt && Kt.c(), M = ze(), jt && jt.c(), A = O("g"), w = O("text"), D = O("tspan"), x = H("Very High"), I = et(), Y = O("tspan"), ot = H(L), _t = et(), Q = O("text"), lt = O("tspan"), st = H(nt), At = H("%"), X = et(), P = O("tspan"), $ = H("("), b = H(dt), B = H(")"), tt = et(), N = O("g"), J = O("text"), F = O("tspan"), z = H("High"), V = et(), Z = O("tspan"), pt = H(K), Mt = et(), ut = O("text"), mt = O("tspan"), vt = H(Tt), yt = H("%"), rt = et(), wt = O("tspan"), it = H("("), gt = H(ft), at = H(")"), bt = et(), xt = O("g"), ht = O("text"), Et = O("tspan"), Ht = H("Target"), Vt = et(), It = O("tspan"), Xt = H(zt), ue = et(), Ut = O("text"), Nt = O("tspan"), Qe = H(Ft), In = H("%"), cn = et(), Ae = O("tspan"), gn = H("("), Ee = H(Wt), Oe = H(")"), dn = et(), fe = O("g"), ne = O("text"), Pt = O("tspan"), Bt = H("Low"), lr = et(), mn = O("tspan"), ar = H(cl), sr = et(), we = O("text"), Re = O("tspan"), pi = H(Vn), ur = H("%"), fr = et(), Le = O("tspan"), hr = H("("), yi = H(Wn), cr = H(")"), gr = et(), Je = O("g"), Ne = O("text"), $e = O("tspan"), dr = H("Very Low"), mr = et(), vn = O("tspan"), vr = H(gl), wr = et(), De = O("text"), Ue = O("tspan"), _i = H(Xn), pr = H("%"), yr = et(), He = O("tspan"), _r = H("("), xi = H(Gn), xr = H(")"), u(i, "x", "40"), u(i, "y", "30"), u(i, "width", "50"), u(i, "height", "180"), u(i, "fill", "white"), u(i, "stroke", "#ccc"), u(i, "stroke-width", "1"), u(r, "x", "35"), u(r, "y", f = 30 + /*yAxisPositions*/
      t[6].low), u(r, "font-family", "Arial, sans-serif"), u(r, "font-size", "10"), u(r, "fill", "#666"), u(r, "text-anchor", "end"), u(a, "x", "35"), u(a, "y", c = 30 + /*yAxisPositions*/
      t[6].high), u(a, "font-family", "Arial, sans-serif"), u(a, "font-size", "10"), u(a, "fill", "#666"), u(a, "text-anchor", "end"), u(m, "x", "35"), u(m, "y", p = 30 + /*yAxisPositions*/
      t[6].vhigh), u(m, "font-family", "Arial, sans-serif"), u(m, "font-size", "10"), u(m, "fill", "#666"), u(m, "text-anchor", "end"), u(C, "d", E = "M 40 " + (30 + /*linePositions*/
      t[1].vhigh) + " L 65 " + (30 + /*linePositions*/
      t[1].vhigh) + " L 65 25 Q 65 15 70 15 L " + se + " 15"), u(C, "stroke", "#ccc"), u(C, "stroke-width", "1"), u(C, "fill", "none"), u(_, "d", S = "M 40 " + (30 + /*linePositions*/
      t[1].vlow) + " L 65 " + (30 + /*linePositions*/
      t[1].vlow) + " L 65 225 Q 65 230 70 230 L " + se + " 230"), u(_, "stroke", "#ccc"), u(_, "stroke-width", "1"), u(_, "fill", "none"), u(D, "font-size", "12"), u(D, "font-weight", "bold"), u(D, "fill", "#333"), u(Y, "font-size", "10"), u(Y, "fill", "#777"), u(w, "x", "103"), u(w, "y", "0"), u(w, "font-family", "Arial, sans-serif"), u(lt, "font-size", "12"), u(lt, "font-weight", "bold"), u(lt, "fill", "#333"), u(P, "font-size", "10"), u(P, "fill", "#777"), u(Q, "x", se), u(Q, "y", "0"), u(Q, "font-family", "Arial, sans-serif"), u(Q, "text-anchor", "end"), u(A, "transform", G = "translate(0, " + /*textPositions*/
      (t[5].vhigh - 40) + ")"), u(F, "font-size", "12"), u(F, "font-weight", "bold"), u(F, "fill", "#333"), u(Z, "font-size", "10"), u(Z, "fill", "#777"), u(J, "x", "103"), u(J, "y", "0"), u(J, "font-family", "Arial, sans-serif"), u(mt, "font-size", "12"), u(mt, "font-weight", "bold"), u(mt, "fill", "#333"), u(wt, "font-size", "10"), u(wt, "fill", "#777"), u(ut, "x", se), u(ut, "y", "0"), u(ut, "font-family", "Arial, sans-serif"), u(ut, "text-anchor", "end"), u(N, "transform", W = "translate(0, " + /*textPositions*/
      (t[5].high - 40) + ")"), u(Et, "font-size", "12"), u(Et, "font-weight", "bold"), u(Et, "fill", "#333"), u(It, "font-size", "10"), u(It, "fill", "#777"), u(ht, "x", "103"), u(ht, "y", "0"), u(ht, "font-family", "Arial, sans-serif"), u(Nt, "font-size", "12"), u(Nt, "font-weight", "bold"), u(Nt, "fill", "#333"), u(Ae, "font-size", "10"), u(Ae, "fill", "#777"), u(Ut, "x", se), u(Ut, "y", "0"), u(Ut, "font-family", "Arial, sans-serif"), u(Ut, "text-anchor", "end"), u(xt, "transform", ee = "translate(0, " + /*textPositions*/
      (t[5].targ - 40) + ")"), u(Pt, "font-size", "12"), u(Pt, "font-weight", "bold"), u(Pt, "fill", "#333"), u(mn, "font-size", "10"), u(mn, "fill", "#777"), u(ne, "x", "103"), u(ne, "y", "0"), u(ne, "font-family", "Arial, sans-serif"), u(Re, "font-size", "12"), u(Re, "font-weight", "bold"), u(Re, "fill", "#333"), u(Le, "font-size", "10"), u(Le, "fill", "#777"), u(we, "x", se), u(we, "y", "0"), u(we, "font-family", "Arial, sans-serif"), u(we, "text-anchor", "end"), u(fe, "transform", Bn = "translate(0, " + /*textPositions*/
      (t[5].low - 40) + ")"), u($e, "font-size", "12"), u($e, "font-weight", "bold"), u($e, "fill", "#333"), u(vn, "font-size", "10"), u(vn, "fill", "#777"), u(Ne, "x", "103"), u(Ne, "y", "0"), u(Ne, "font-family", "Arial, sans-serif"), u(Ue, "font-size", "12"), u(Ue, "font-weight", "bold"), u(Ue, "fill", "#333"), u(He, "font-size", "10"), u(He, "fill", "#777"), u(De, "x", "340"), u(De, "y", "0"), u(De, "font-family", "Arial, sans-serif"), u(De, "text-anchor", "end"), u(Je, "transform", Zn = "translate(0, " + /*textPositions*/
      (t[5].vlow - 40) + ")"), u(
        n,
        "width",
        /*svgWidth*/
        t[10]
      ), u(n, "height", go), u(n, "viewBox", "0 0 " + /*svgWidth*/
      t[10] + " " + go), u(n, "class", "svelte-1d3n1f2"), u(e, "class", "widget-container svelte-1d3n1f2");
    },
    m(ct, St) {
      Lt(ct, e, St), h(e, n), h(n, i), h(n, r), h(r, s), h(n, a), h(a, d), h(n, m), h(m, v), h(n, C), Gt && Gt.m(n, null), h(n, k), Zt && Zt.m(n, null), h(n, y), Qt && Qt.m(n, null), h(n, _), Ot && Ot.m(n, null), h(n, U), Jt && Jt.m(n, null), h(n, R), $t && $t.m(n, null), h(n, T), Kt && Kt.m(n, null), h(n, M), jt && jt.m(n, null), h(n, A), h(A, w), h(w, D), h(D, x), h(w, I), h(w, Y), h(Y, ot), h(w, _t), h(A, Q), h(Q, lt), h(lt, st), h(lt, At), h(Q, X), h(Q, P), h(P, $), h(P, b), h(P, B), h(Q, tt), h(n, N), h(N, J), h(J, F), h(F, z), h(J, V), h(J, Z), h(Z, pt), h(J, Mt), h(N, ut), h(ut, mt), h(mt, vt), h(mt, yt), h(ut, rt), h(ut, wt), h(wt, it), h(wt, gt), h(wt, at), h(ut, bt), h(n, xt), h(xt, ht), h(ht, Et), h(Et, Ht), h(ht, Vt), h(ht, It), h(It, Xt), h(ht, ue), h(xt, Ut), h(Ut, Nt), h(Nt, Qe), h(Nt, In), h(Ut, cn), h(Ut, Ae), h(Ae, gn), h(Ae, Ee), h(Ae, Oe), h(Ut, dn), h(n, fe), h(fe, ne), h(ne, Pt), h(Pt, Bt), h(ne, lr), h(ne, mn), h(mn, ar), h(ne, sr), h(fe, we), h(we, Re), h(Re, pi), h(Re, ur), h(we, fr), h(we, Le), h(Le, hr), h(Le, yi), h(Le, cr), h(we, gr), h(n, Je), h(Je, Ne), h(Ne, $e), h($e, dr), h(Ne, mr), h(Ne, vn), h(vn, vr), h(Ne, wr), h(Je, De), h(De, Ue), h(Ue, _i), h(Ue, pr), h(De, yr), h(De, He), h(He, _r), h(He, xi), h(He, xr);
    },
    p(ct, [St]) {
      St & /*yAxisPositions*/
      64 && f !== (f = 30 + /*yAxisPositions*/
      ct[6].low) && u(r, "y", f), St & /*yAxisPositions*/
      64 && c !== (c = 30 + /*yAxisPositions*/
      ct[6].high) && u(a, "y", c), St & /*yAxisPositions*/
      64 && p !== (p = 30 + /*yAxisPositions*/
      ct[6].vhigh) && u(m, "y", p), St & /*linePositions*/
      2 && E !== (E = "M 40 " + (30 + /*linePositions*/
      ct[1].vhigh) + " L 65 " + (30 + /*linePositions*/
      ct[1].vhigh) + " L 65 25 Q 65 15 70 15 L " + se + " 15") && u(C, "d", E), /*pct*/
      ct[0].high > 0 ? Gt ? Gt.p(ct, St) : (Gt = oo(ct), Gt.c(), Gt.m(n, k)) : Gt && (Gt.d(1), Gt = null), /*pct*/
      ct[0].targ > 0 ? Zt ? Zt.p(ct, St) : (Zt = lo(ct), Zt.c(), Zt.m(n, y)) : Zt && (Zt.d(1), Zt = null), /*pct*/
      ct[0].low > 0 ? Qt ? Qt.p(ct, St) : (Qt = ao(ct), Qt.c(), Qt.m(n, _)) : Qt && (Qt.d(1), Qt = null), St & /*linePositions*/
      2 && S !== (S = "M 40 " + (30 + /*linePositions*/
      ct[1].vlow) + " L 65 " + (30 + /*linePositions*/
      ct[1].vlow) + " L 65 225 Q 65 230 70 230 L " + se + " 230") && u(_, "d", S), /*barHeights*/
      ct[3].vlow > 0 ? Ot ? Ot.p(ct, St) : (Ot = so(ct), Ot.c(), Ot.m(n, U)) : Ot && (Ot.d(1), Ot = null), /*barHeights*/
      ct[3].low > 0 ? Jt ? Jt.p(ct, St) : (Jt = uo(ct), Jt.c(), Jt.m(n, R)) : Jt && (Jt.d(1), Jt = null), /*barHeights*/
      ct[3].targ > 0 ? $t ? $t.p(ct, St) : ($t = fo(ct), $t.c(), $t.m(n, T)) : $t && ($t.d(1), $t = null), /*barHeights*/
      ct[3].high > 0 ? Kt ? Kt.p(ct, St) : (Kt = ho(ct), Kt.c(), Kt.m(n, M)) : Kt && (Kt.d(1), Kt = null), /*barHeights*/
      ct[3].vhigh > 0 ? jt ? jt.p(ct, St) : (jt = co(ct), jt.c(), jt.m(n, A)) : jt && (jt.d(1), jt = null), St & /*pct*/
      1 && nt !== (nt = Math.round(
        /*pct*/
        ct[0].vhigh
      ) + "") && Ct(st, nt), St & /*minutes*/
      16 && dt !== (dt = _e(
        /*minutes*/
        ct[4].vhigh
      ) + "") && Ct(b, dt), St & /*textPositions*/
      32 && G !== (G = "translate(0, " + /*textPositions*/
      (ct[5].vhigh - 40) + ")") && u(A, "transform", G), St & /*pct*/
      1 && Tt !== (Tt = Math.round(
        /*pct*/
        ct[0].high
      ) + "") && Ct(vt, Tt), St & /*minutes*/
      16 && ft !== (ft = _e(
        /*minutes*/
        ct[4].high
      ) + "") && Ct(gt, ft), St & /*textPositions*/
      32 && W !== (W = "translate(0, " + /*textPositions*/
      (ct[5].high - 40) + ")") && u(N, "transform", W), St & /*pct*/
      1 && Ft !== (Ft = Math.round(
        /*pct*/
        ct[0].targ
      ) + "") && Ct(Qe, Ft), St & /*minutes*/
      16 && Wt !== (Wt = _e(
        /*minutes*/
        ct[4].targ
      ) + "") && Ct(Ee, Wt), St & /*textPositions*/
      32 && ee !== (ee = "translate(0, " + /*textPositions*/
      (ct[5].targ - 40) + ")") && u(xt, "transform", ee), St & /*pct*/
      1 && Vn !== (Vn = Math.round(
        /*pct*/
        ct[0].low
      ) + "") && Ct(pi, Vn), St & /*minutes*/
      16 && Wn !== (Wn = _e(
        /*minutes*/
        ct[4].low
      ) + "") && Ct(yi, Wn), St & /*textPositions*/
      32 && Bn !== (Bn = "translate(0, " + /*textPositions*/
      (ct[5].low - 40) + ")") && u(fe, "transform", Bn), St & /*pct*/
      1 && Xn !== (Xn = Math.round(
        /*pct*/
        ct[0].vlow
      ) + "") && Ct(_i, Xn), St & /*minutes*/
      16 && Gn !== (Gn = _e(
        /*minutes*/
        ct[4].vlow
      ) + "") && Ct(xi, Gn), St & /*textPositions*/
      32 && Zn !== (Zn = "translate(0, " + /*textPositions*/
      (ct[5].vlow - 40) + ")") && u(Je, "transform", Zn);
    },
    i: kt,
    o: kt,
    d(ct) {
      ct && Rt(e), Gt && Gt.d(), Zt && Zt.d(), Qt && Qt.d(), Ot && Ot.d(), Jt && Jt.d(), $t && $t.d(), Kt && Kt.d(), jt && jt.d();
    }
  };
}
const ye = 180, go = 240, se = 340;
function _e(t) {
  const e = Math.floor(t / 60), n = Math.round(t % 60);
  return e === 0 ? `${n}min` : `${e}h${n.toString().padStart(2, "0")}min`;
}
function Bc(t, e, n) {
  let i, r, o, s, f;
  const a = hn();
  let { data: l } = e, { range: d = null } = e, { preset: c = "N" } = e, m, g;
  const v = () => /mmol/i.test((l == null ? void 0 : l.units) || "mmol"), p = () => v() ? c === "T" ? {
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
  let C = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  }, E = 0, k = 0, y = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  };
  function _() {
    if (!l) return;
    const T = new Date(l.t0).getTime();
    n(14, m = Float64Array.from({ length: l.glucose.length }, (M, A) => T + A * l.stepMs)), n(15, g = Float64Array.from(l.glucose));
  }
  function S() {
    try {
      a("stats", {
        pct: C,
        present: E,
        expected: k,
        preset: c,
        units: (l == null ? void 0 : l.units) || "mmol/L"
      });
    } catch {
    }
  }
  function U(T) {
    const M = p(), A = v() ? "mmol/L" : "mg/dL";
    return T === "vhigh" ? `>${v() ? M.vhigh.toFixed(1) : Math.round(M.vhigh)} ${A}` : T === "high" ? `${v() ? (M.high + 0.1).toFixed(1) : Math.round(M.high) + 1}-${v() ? M.vhigh.toFixed(1) : Math.round(M.vhigh)} ${A}` : T === "targ" ? `${v() ? M.low.toFixed(1) : Math.round(M.low)}-${v() ? M.high.toFixed(1) : Math.round(M.high)} ${A}` : T === "low" ? `${v() ? M.vlow.toFixed(1) : Math.round(M.vlow)}-${v() ? (M.low - 0.1).toFixed(1) : Math.round(M.low) - 1} ${A}` : T === "vlow" ? `<${v() ? M.vlow.toFixed(1) : Math.round(M.vlow)} ${A}` : "";
  }
  const R = se + 10;
  return t.$$set = (T) => {
    "data" in T && n(11, l = T.data), "range" in T && n(12, d = T.range), "preset" in T && n(13, c = T.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*data*/
    2048 && l && _(), t.$$.dirty & /*data, range, time, values, preset*/
    63488 && l && d && m && g && c) {
      const { start: T, end: M } = d, A = Math.max(0, Math.ceil((T - m[0]) / l.stepMs)), w = Math.min(g.length - 1, Math.floor((M - m[0]) / l.stepMs));
      if (w < A)
        n(0, C = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }), E = 0, k = 0, n(4, y = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        });
      else {
        const D = p();
        let x = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, I = 0;
        for (let Y = A; Y <= w; Y++) {
          const L = g[Y];
          Number.isFinite(L) && L >= 0 && (I++, L < D.vlow ? x.vlow++ : L < D.low ? x.low++ : L <= D.high ? x.targ++ : L <= D.vhigh ? x.high++ : x.vhigh++);
        }
        if (E = I, k = Math.max(1, w - A + 1), I === 0)
          n(0, C = {
            vlow: 0,
            low: 0,
            targ: 0,
            high: 0,
            vhigh: 0
          }), n(4, y = {
            vlow: 0,
            low: 0,
            targ: 0,
            high: 0,
            vhigh: 0
          });
        else {
          n(0, C = {
            vlow: x.vlow / I * 100,
            low: x.low / I * 100,
            targ: x.targ / I * 100,
            high: x.high / I * 100,
            vhigh: x.vhigh / I * 100
          });
          const Y = 24 * 60;
          n(4, y = {
            vlow: x.vlow / I * Y,
            low: x.low / I * Y,
            targ: x.targ / I * Y,
            high: x.high / I * Y,
            vhigh: x.vhigh / I * Y
          });
        }
      }
      S();
    }
    t.$$.dirty & /*pct*/
    1 && n(3, i = {
      vhigh: C.vhigh / 100 * ye,
      high: C.high / 100 * ye,
      targ: C.targ / 100 * ye,
      low: C.low / 100 * ye,
      vlow: C.vlow / 100 * ye
    }), t.$$.dirty & /*barHeights*/
    8 && n(2, r = {
      vlow: ye - i.vlow,
      low: ye - i.vlow - i.low,
      targ: ye - i.vlow - i.low - i.targ,
      high: ye - i.vlow - i.low - i.targ - i.high,
      vhigh: ye - i.vlow - i.low - i.targ - i.high - i.vhigh
    }), t.$$.dirty & /*barPositions, barHeights*/
    12 && n(1, o = {
      vhigh: r.vhigh + i.vhigh / 2,
      high: r.high + i.high / 2,
      targ: r.targ + i.targ / 2,
      low: r.low + i.low / 2,
      vlow: r.vlow + i.vlow / 2
    }), t.$$.dirty & /*barPositions*/
    4 && n(6, s = {
      low: r.vlow,
      // Boundary between vlow and low sections
      high: r.targ,
      // Boundary between target and high sections
      vhigh: r.high
      // Boundary between high and vhigh sections
    }), t.$$.dirty & /*pct, linePositions*/
    3 && n(5, f = {
      vhigh: 55,
      // Fixed at top
      high: C.high > 0 ? 70 + o.high : 105,
      targ: C.targ > 0 ? 70 + o.targ : 181,
      low: C.low > 0 ? 70 + o.low : 242,
      vlow: 270
      // Fixed at bottom
    });
  }, [
    C,
    o,
    r,
    i,
    y,
    f,
    s,
    v,
    p,
    U,
    R,
    l,
    d,
    c,
    m,
    g
  ];
}
class Xc extends le {
  constructor(e) {
    super(), oe(this, e, Bc, Wc, re, { data: 11, range: 12, preset: 13 });
  }
}
function mo(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  const r = new ec({ target: i, props: { data: e, initialRange: n.initialRange ?? null, externalRange: null, preset: n.preset || "N", showMonthLabels: n.monthLabels ?? !0, showData: n.dataVisible ?? !0, showCanvas: n.canvasVisible ?? !0 } }), o = /* @__PURE__ */ new Map();
  let s = n.initialRange ?? null;
  function f(v, p) {
    const C = o.get(v) || [];
    C.push(p), o.set(v, C);
  }
  r.$on("rangechange", (v) => {
    var C;
    const p = v.detail;
    s = { start: p.start, end: p.end }, (C = o.get("rangechange")) == null || C.forEach((E) => E(p));
  }), r.$on("ready", (v) => {
    var C;
    const p = v.detail;
    s = { start: p.start, end: p.end }, (C = o.get("ready")) == null || C.forEach((E) => E(p));
  });
  function a(v, p) {
    if (typeof v == "number" && typeof p == "number")
      r.$set({ externalRange: { start: v, end: p } });
    else if (v && typeof v.start == "number" && typeof v.end == "number")
      r.$set({ externalRange: { start: v.start, end: v.end } });
    else
      throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function l() {
    return s;
  }
  function d(v) {
    r.$set({ preset: v });
  }
  function c(v) {
    r.$set({ showData: !!v });
  }
  function m(v) {
    r.$set({ showMonthLabels: !!v });
  }
  function g(v) {
    r.$set({ showCanvas: !!v });
  }
  return { on: f, setRange: a, getRange: l, setPreset: d, setDataVisible: c, setMonthLabels: m, setCanvasVisible: g, destroy: () => r.$destroy() };
}
typeof window < "u" && (window.createTirCalendar = mo, window.createCgmTir = mo);
function Gc(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let r = n.initialRange || null;
  const o = new rc({ target: i, props: { data: e, range: r, preset: n.preset || "N" } });
  function s(l, d) {
    if (typeof l == "number" && typeof d == "number")
      o.$set({ range: { start: l, end: d } });
    else if (l && typeof l.start == "number" && typeof l.end == "number")
      o.$set({ range: l });
    else
      throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function f(l) {
    o.$set({ data: l });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: l, end: d }) => s({ start: l, end: d })), n.source.on("ready", ({ start: l, end: d }) => s({ start: l, end: d })), typeof n.source.getRange == "function")) {
    const l = n.source.getRange();
    l && typeof l.start == "number" && typeof l.end == "number" && s(l);
  }
  function a(l) {
    o.$set({ preset: l });
  }
  return { setRange: s, setData: f, setPreset: a, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmSummary = Gc);
function Zc(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let r = n.initialRange || null;
  const o = new dc({ target: i, props: { data: e, range: r, preset: n.preset || "N" } });
  function s(l, d) {
    if (typeof l == "number" && typeof d == "number") o.$set({ range: { start: l, end: d } });
    else if (l && typeof l.start == "number" && typeof l.end == "number") o.$set({ range: l });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function f(l) {
    o.$set({ data: l });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: l, end: d }) => s({ start: l, end: d })), n.source.on("ready", ({ start: l, end: d }) => s({ start: l, end: d })), typeof n.source.getRange == "function")) {
    const l = n.source.getRange();
    l && typeof l.start == "number" && typeof l.end == "number" && s(l);
  }
  function a(l) {
    o.$set({ preset: l });
  }
  return { setRange: s, setData: f, setPreset: a, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmTir = Zc);
function Qc(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let r = n.initialRange || null;
  const o = new wc({ target: i, props: { data: e, range: r, preset: n.preset || "N" } });
  function s(l, d) {
    if (typeof l == "number" && typeof d == "number") o.$set({ range: { start: l, end: d } });
    else if (l && typeof l.start == "number" && typeof l.end == "number") o.$set({ range: l });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function f(l) {
    o.$set({ data: l });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: l, end: d }) => s({ start: l, end: d })), n.source.on("ready", ({ start: l, end: d }) => s({ start: l, end: d })), typeof n.source.getRange == "function")) {
    const l = n.source.getRange();
    l && typeof l.start == "number" && typeof l.end == "number" && s(l);
  }
  function a(l) {
    o.$set({ preset: l });
  }
  return { setRange: s, setData: f, setPreset: a, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmAgp = Qc);
function Oc(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let r = n.initialRange || null;
  const o = new Hc({ target: i, props: { data: e, range: r, preset: n.preset || "N" } });
  function s(l, d) {
    if (typeof l == "number" && typeof d == "number") o.$set({ range: { start: l, end: d } });
    else if (l && typeof l.start == "number" && typeof l.end == "number") o.$set({ range: l });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function f(l) {
    o.$set({ data: l });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: l, end: d }) => s({ start: l, end: d })), n.source.on("ready", ({ start: l, end: d }) => s({ start: l, end: d })), typeof n.source.getRange == "function")) {
    const l = n.source.getRange();
    l && typeof l.start == "number" && typeof l.end == "number" && s(l);
  }
  function a(l) {
    o.$set({ preset: l });
  }
  return { setRange: s, setData: f, setPreset: a, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmTirModern = Oc);
function Jc(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let r = n.initialRange || null;
  const o = new Yc({ target: i, props: { data: e, range: r, preset: n.preset || "N" } });
  function s(l, d) {
    if (typeof l == "number" && typeof d == "number") o.$set({ range: { start: l, end: d } });
    else if (l && typeof l.start == "number" && typeof l.end == "number") o.$set({ range: l });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function f(l) {
    o.$set({ data: l });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: l, end: d }) => s({ start: l, end: d })), n.source.on("ready", ({ start: l, end: d }) => s({ start: l, end: d })), typeof n.source.getRange == "function")) {
    const l = n.source.getRange();
    l && typeof l.start == "number" && typeof l.end == "number" && s(l);
  }
  function a(l) {
    o.$set({ preset: l });
  }
  return { setRange: s, setData: f, setPreset: a, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmTirClaude = Jc);
function $c(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let r = n.initialRange || null;
  const o = new Vc({ target: i, props: { data: e, range: r, preset: n.preset || "N" } });
  function s(l, d) {
    if (typeof l == "number" && typeof d == "number") o.$set({ range: { start: l, end: d } });
    else if (l && typeof l.start == "number" && typeof l.end == "number") o.$set({ range: l });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function f(l) {
    o.$set({ data: l });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: l, end: d }) => s({ start: l, end: d })), n.source.on("ready", ({ start: l, end: d }) => s({ start: l, end: d })), typeof n.source.getRange == "function")) {
    const l = n.source.getRange();
    l && typeof l.start == "number" && typeof l.end == "number" && s(l);
  }
  function a(l) {
    o.$set({ preset: l });
  }
  return { setRange: s, setData: f, setPreset: a, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmTirVertical = $c);
function Kc(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let r = n.initialRange || null;
  const o = new Ec({ target: i, props: { data: e, range: r, preset: n.preset || "N" } });
  function s(l, d) {
    if (typeof l == "number" && typeof d == "number") o.$set({ range: { start: l, end: d } });
    else if (l && typeof l.start == "number" && typeof l.end == "number") o.$set({ range: l });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function f(l) {
    o.$set({ data: l });
  }
  function a(l) {
    o.$set({ preset: l });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: l, end: d }) => s({ start: l, end: d })), n.source.on("ready", ({ start: l, end: d }) => s({ start: l, end: d })), typeof n.source.getRange == "function")) {
    const l = n.source.getRange();
    l && typeof l.start == "number" && typeof l.end == "number" && s(l);
  }
  return { setRange: s, setData: f, setPreset: a, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmStrips = Kc);
function jc(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let r = n.initialRange || null;
  const o = new _c({ target: i, props: { data: e, range: r, preset: n.preset || "N" } }), s = /* @__PURE__ */ new Map();
  let f = null;
  function a(g, v) {
    const p = s.get(g) || [];
    p.push(v), s.set(g, p);
  }
  o.$on("stats", (g) => {
    var p;
    const v = g.detail;
    f = v, (p = s.get("stats")) == null || p.forEach((C) => C(v));
  });
  function l(g, v) {
    if (typeof g == "number" && typeof v == "number") o.$set({ range: { start: g, end: v } });
    else if (g && typeof g.start == "number" && typeof g.end == "number") o.$set({ range: g });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function d(g) {
    o.$set({ data: g });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: g, end: v }) => l({ start: g, end: v })), n.source.on("ready", ({ start: g, end: v }) => l({ start: g, end: v })), typeof n.source.getRange == "function")) {
    const g = n.source.getRange();
    g && typeof g.start == "number" && typeof g.end == "number" && l(g);
  }
  function c(g) {
    o.$set({ preset: g });
  }
  function m() {
    return f;
  }
  return { on: a, setRange: l, setData: d, setPreset: c, getStats: m, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmTirCard = jc);
function t0(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let r = n.initialRange || null;
  const o = new Mc({ target: i, props: { data: e, range: r, preset: n.preset || "N" } }), s = /* @__PURE__ */ new Map();
  let f = null;
  function a(g, v) {
    const p = s.get(g) || [];
    p.push(v), s.set(g, p);
  }
  o.$on("stats", (g) => {
    var p;
    const v = g.detail;
    f = v, (p = s.get("stats")) == null || p.forEach((C) => C(v));
  });
  function l(g, v) {
    if (typeof g == "number" && typeof v == "number") o.$set({ range: { start: g, end: v } });
    else if (g && typeof g.start == "number" && typeof g.end == "number") o.$set({ range: g });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function d(g) {
    o.$set({ data: g });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: g, end: v }) => l({ start: g, end: v })), n.source.on("ready", ({ start: g, end: v }) => l({ start: g, end: v })), typeof n.source.getRange == "function")) {
    const g = n.source.getRange();
    g && typeof g.start == "number" && typeof g.end == "number" && l(g);
  }
  function c(g) {
    o.$set({ preset: g });
  }
  function m() {
    return f;
  }
  return { on: a, setRange: l, setData: d, setPreset: c, getStats: m, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmTirAgpCard = t0);
function e0(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let r = n.initialRange || null;
  const o = new Cc({ target: i, props: { data: e, range: r, preset: n.preset || "N" } }), s = /* @__PURE__ */ new Map();
  let f = null;
  function a(g, v) {
    const p = s.get(g) || [];
    p.push(v), s.set(g, p);
  }
  o.$on("stats", (g) => {
    var p;
    const v = g.detail;
    f = v, (p = s.get("stats")) == null || p.forEach((C) => C(v));
  });
  function l(g, v) {
    if (typeof g == "number" && typeof v == "number") o.$set({ range: { start: g, end: v } });
    else if (g && typeof g.start == "number" && typeof g.end == "number") o.$set({ range: g });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function d(g) {
    o.$set({ data: g });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: g, end: v }) => l({ start: g, end: v })), n.source.on("ready", ({ start: g, end: v }) => l({ start: g, end: v })), typeof n.source.getRange == "function")) {
    const g = n.source.getRange();
    g && typeof g.start == "number" && typeof g.end == "number" && l(g);
  }
  function c(g) {
    o.$set({ preset: g });
  }
  function m() {
    return f;
  }
  return { on: a, setRange: l, setData: d, setPreset: c, getStats: m, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmTirAgpCardCanvas = e0);
function n0(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let r = n.initialRange || null;
  const o = new Dc({ target: i, props: { data: e, range: r, preset: n.preset || "N" } }), s = /* @__PURE__ */ new Map();
  function f(c, m) {
    const g = s.get(c) || [];
    g.push(m), s.set(c, g);
  }
  o.$on("stats", (c) => {
    var g;
    const m = c.detail;
    (g = s.get("stats")) == null || g.forEach((v) => v(m));
  });
  function a(c, m) {
    if (typeof c == "number" && typeof m == "number") o.$set({ range: { start: c, end: m } });
    else if (c && typeof c.start == "number" && typeof c.end == "number") o.$set({ range: c });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function l(c) {
    o.$set({ data: c });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: c, end: m }) => a({ start: c, end: m })), n.source.on("ready", ({ start: c, end: m }) => a({ start: c, end: m })), typeof n.source.getRange == "function")) {
    const c = n.source.getRange();
    c && typeof c.start == "number" && typeof c.end == "number" && a(c);
  }
  function d(c) {
    o.$set({ preset: c });
  }
  return { on: f, setRange: a, setData: l, setPreset: d, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmTirEndsCardCanvas = n0);
function i0(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let r = n.initialRange || null;
  const o = new Xc({ target: i, props: { data: e, range: r, preset: n.preset || "N" } }), s = /* @__PURE__ */ new Map();
  let f = null;
  function a(g, v) {
    const p = s.get(g) || [];
    p.push(v), s.set(g, p);
  }
  o.$on("stats", (g) => {
    var p;
    const v = g.detail;
    f = v, (p = s.get("stats")) == null || p.forEach((C) => C(v));
  });
  function l(g, v) {
    if (typeof g == "number" && typeof v == "number") o.$set({ range: { start: g, end: v } });
    else if (g && typeof g.start == "number" && typeof g.end == "number") o.$set({ range: g });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function d(g) {
    o.$set({ data: g });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: g, end: v }) => l({ start: g, end: v })), n.source.on("ready", ({ start: g, end: v }) => l({ start: g, end: v })), typeof n.source.getRange == "function")) {
    const g = n.source.getRange();
    g && typeof g.start == "number" && typeof g.end == "number" && l(g);
  }
  function c(g) {
    o.$set({ preset: g });
  }
  function m() {
    return f;
  }
  return { on: a, setRange: l, setData: d, setPreset: c, getStats: m, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmTirDetailed = i0);
export {
  Qc as createCgmAgp,
  Kc as createCgmStrips,
  Gc as createCgmSummary,
  Zc as createCgmTir,
  t0 as createCgmTirAgpCard,
  e0 as createCgmTirAgpCardCanvas,
  jc as createCgmTirCard,
  Jc as createCgmTirClaude,
  i0 as createCgmTirDetailed,
  n0 as createCgmTirEndsCardCanvas,
  Oc as createCgmTirModern,
  $c as createCgmTirVertical,
  mo as createTirCalendar
};

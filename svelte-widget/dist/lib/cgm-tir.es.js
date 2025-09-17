var ua = Object.defineProperty;
var ca = (t, e, n) => e in t ? ua(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var br = (t, e, n) => ca(t, typeof e != "symbol" ? e + "" : e, n);
function ae() {
}
function co(t) {
  return t();
}
function ui() {
  return /* @__PURE__ */ Object.create(null);
}
function Ge(t) {
  t.forEach(co);
}
function fo(t) {
  return typeof t == "function";
}
function en(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function fa(t) {
  return Object.keys(t).length === 0;
}
function te(t) {
  return t ?? "";
}
function m(t, e) {
  t.appendChild(e);
}
function Nt(t, e, n) {
  t.insertBefore(e, n || null);
}
function At(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function tt(t) {
  return document.createElement(t);
}
function ut(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function J(t) {
  return document.createTextNode(t);
}
function vt() {
  return J(" ");
}
function Fe() {
  return J("");
}
function oe(t, e, n, r) {
  return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
}
function c(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function ha(t) {
  return Array.from(t.childNodes);
}
function qt(t, e) {
  e = "" + e, t.data !== e && (t.data = /** @type {string} */
  e);
}
function X(t, e, n, r) {
  n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, "");
}
function ga(t, e, { bubbles: n = !1, cancelable: r = !1 } = {}) {
  return new CustomEvent(t, { detail: e, bubbles: n, cancelable: r });
}
let Yn;
function Ln(t) {
  Yn = t;
}
function ho() {
  if (!Yn) throw new Error("Function called outside component initialization");
  return Yn;
}
function _n(t) {
  ho().$$.on_mount.push(t);
}
function dr() {
  const t = ho();
  return (e, n, { cancelable: r = !1 } = {}) => {
    const i = t.$$.callbacks[e];
    if (i) {
      const o = ga(
        /** @type {string} */
        e,
        n,
        { cancelable: r }
      );
      return i.slice().forEach((a) => {
        a.call(t, o);
      }), !o.defaultPrevented;
    }
    return !0;
  };
}
const fn = [], De = [];
let gn = [];
const ci = [], ma = /* @__PURE__ */ Promise.resolve();
let Lr = !1;
function da() {
  Lr || (Lr = !0, ma.then(go));
}
function Er(t) {
  gn.push(t);
}
const Mr = /* @__PURE__ */ new Set();
let un = 0;
function go() {
  if (un !== 0)
    return;
  const t = Yn;
  do {
    try {
      for (; un < fn.length; ) {
        const e = fn[un];
        un++, Ln(e), pa(e.$$);
      }
    } catch (e) {
      throw fn.length = 0, un = 0, e;
    }
    for (Ln(null), fn.length = 0, un = 0; De.length; ) De.pop()();
    for (let e = 0; e < gn.length; e += 1) {
      const n = gn[e];
      Mr.has(n) || (Mr.add(n), n());
    }
    gn.length = 0;
  } while (fn.length);
  for (; ci.length; )
    ci.pop()();
  Lr = !1, Mr.clear(), Ln(t);
}
function pa(t) {
  if (t.fragment !== null) {
    t.update(), Ge(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(Er);
  }
}
function ya(t) {
  const e = [], n = [];
  gn.forEach((r) => t.indexOf(r) === -1 ? e.push(r) : n.push(r)), n.forEach((r) => r()), gn = e;
}
const Jn = /* @__PURE__ */ new Set();
let Ke;
function wa() {
  Ke = {
    r: 0,
    c: [],
    p: Ke
    // parent group
  };
}
function va() {
  Ke.r || Ge(Ke.c), Ke = Ke.p;
}
function En(t, e) {
  t && t.i && (Jn.delete(t), t.i(e));
}
function Rr(t, e, n, r) {
  if (t && t.o) {
    if (Jn.has(t)) return;
    Jn.add(t), Ke.c.push(() => {
      Jn.delete(t), r && (n && t.d(1), r());
    }), t.o(e);
  } else r && r();
}
function _a(t) {
  t && t.c();
}
function mo(t, e, n) {
  const { fragment: r, after_update: i } = t.$$;
  r && r.m(e, n), Er(() => {
    const o = t.$$.on_mount.map(co).filter(fo);
    t.$$.on_destroy ? t.$$.on_destroy.push(...o) : Ge(o), t.$$.on_mount = [];
  }), i.forEach(Er);
}
function po(t, e) {
  const n = t.$$;
  n.fragment !== null && (ya(n.after_update), Ge(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function ba(t, e) {
  t.$$.dirty[0] === -1 && (fn.push(t), da(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function nn(t, e, n, r, i, o, a = null, l = [-1]) {
  const u = Yn;
  Ln(t);
  const s = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: o,
    update: ae,
    not_equal: i,
    bound: ui(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (u ? u.$$.context : [])),
    // everything else
    callbacks: ui(),
    dirty: l,
    skip_bound: !1,
    root: e.target || u.$$.root
  };
  a && a(s.root);
  let h = !1;
  if (s.ctx = n ? n(t, e.props || {}, (f, g, ...d) => {
    const y = d.length ? d[0] : g;
    return s.ctx && i(s.ctx[f], s.ctx[f] = y) && (!s.skip_bound && s.bound[f] && s.bound[f](y), h && ba(t, f)), g;
  }) : [], s.update(), h = !0, Ge(s.before_update), s.fragment = r ? r(s.ctx) : !1, e.target) {
    if (e.hydrate) {
      const f = ha(e.target);
      s.fragment && s.fragment.l(f), f.forEach(At);
    } else
      s.fragment && s.fragment.c();
    e.intro && En(t.$$.fragment), mo(t, e.target, e.anchor), go();
  }
  Ln(u);
}
class rn {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    br(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    br(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    po(this, 1), this.$destroy = ae;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, n) {
    if (!fo(n))
      return ae;
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
    this.$$set && !fa(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const Ma = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(Ma);
function jn(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function xa(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function yo(t) {
  let e, n, r;
  t.length !== 2 ? (e = jn, n = (l, u) => jn(t(l), u), r = (l, u) => t(l) - u) : (e = t === jn || t === xa ? t : ka, n = t, r = t);
  function i(l, u, s = 0, h = l.length) {
    if (s < h) {
      if (e(u, u) !== 0) return h;
      do {
        const f = s + h >>> 1;
        n(l[f], u) < 0 ? s = f + 1 : h = f;
      } while (s < h);
    }
    return s;
  }
  function o(l, u, s = 0, h = l.length) {
    if (s < h) {
      if (e(u, u) !== 0) return h;
      do {
        const f = s + h >>> 1;
        n(l[f], u) <= 0 ? s = f + 1 : h = f;
      } while (s < h);
    }
    return s;
  }
  function a(l, u, s = 0, h = l.length) {
    const f = i(l, u, s, h - 1);
    return f > s && r(l[f - 1], u) > -r(l[f], u) ? f - 1 : f;
  }
  return { left: i, center: a, right: o };
}
function ka() {
  return 0;
}
function Ta(t) {
  return t === null ? NaN : +t;
}
const Ca = yo(jn), Da = Ca.right;
yo(Ta).center;
function Sa(t, e) {
  let n = 0, r, i = 0, o = 0;
  for (let a of t)
    a != null && (a = +a) >= a && (r = a - i, i += r / ++n, o += r * (a - i));
  if (n > 1) return o / (n - 1);
}
const Aa = Math.sqrt(50), Fa = Math.sqrt(10), Na = Math.sqrt(2);
function nr(t, e, n) {
  const r = (e - t) / Math.max(0, n), i = Math.floor(Math.log10(r)), o = r / Math.pow(10, i), a = o >= Aa ? 10 : o >= Fa ? 5 : o >= Na ? 2 : 1;
  let l, u, s;
  return i < 0 ? (s = Math.pow(10, -i) / a, l = Math.round(t * s), u = Math.round(e * s), l / s < t && ++l, u / s > e && --u, s = -s) : (s = Math.pow(10, i) * a, l = Math.round(t / s), u = Math.round(e / s), l * s < t && ++l, u * s > e && --u), u < l && 0.5 <= n && n < 2 ? nr(t, e, n * 2) : [l, u, s];
}
function Ua(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const r = e < t, [i, o, a] = r ? nr(e, t, n) : nr(t, e, n);
  if (!(o >= i)) return [];
  const l = o - i + 1, u = new Array(l);
  if (r)
    if (a < 0) for (let s = 0; s < l; ++s) u[s] = (o - s) / -a;
    else for (let s = 0; s < l; ++s) u[s] = (o - s) * a;
  else if (a < 0) for (let s = 0; s < l; ++s) u[s] = (i + s) / -a;
  else for (let s = 0; s < l; ++s) u[s] = (i + s) * a;
  return u;
}
function Yr(t, e, n) {
  return e = +e, t = +t, n = +n, nr(t, e, n)[2];
}
function La(t, e, n) {
  e = +e, t = +t, n = +n;
  const r = e < t, i = r ? Yr(e, t, n) : Yr(t, e, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function Ea(t, e) {
  let n = 0, r = 0;
  for (let i of t)
    i != null && (i = +i) >= i && (++n, r += i);
  if (n) return r / n;
}
function zr(t, e, n) {
  t = +t, e = +e, n = (i = arguments.length) < 2 ? (e = t, t = 0, 1) : i < 3 ? 1 : +n;
  for (var r = -1, i = Math.max(0, Math.ceil((e - t) / n)) | 0, o = new Array(i); ++r < i; )
    o[r] = t + r * n;
  return o;
}
function Ra(t) {
  return t;
}
var xr = 1, kr = 2, Hr = 3, An = 4, fi = 1e-6;
function Ya(t) {
  return "translate(" + t + ",0)";
}
function za(t) {
  return "translate(0," + t + ")";
}
function Ha(t) {
  return (e) => +t(e);
}
function Pa(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function Ia() {
  return !this.__axis;
}
function wo(t, e) {
  var n = [], r = null, i = null, o = 6, a = 6, l = 3, u = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, s = t === xr || t === An ? -1 : 1, h = t === An || t === kr ? "x" : "y", f = t === xr || t === Hr ? Ya : za;
  function g(d) {
    var y = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), p = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : Ra), w = Math.max(o, 0) + l, C = e.range(), E = +C[0] + u, M = +C[C.length - 1] + u, W = (e.bandwidth ? Pa : Ha)(e.copy(), u), L = d.selection ? d.selection() : d, S = L.selectAll(".domain").data([null]), Y = L.selectAll(".tick").data(y, e).order(), z = Y.exit(), K = Y.enter().append("g").attr("class", "tick"), gt = Y.select("line"), B = Y.select("text");
    S = S.merge(S.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), Y = Y.merge(K), gt = gt.merge(K.append("line").attr("stroke", "currentColor").attr(h + "2", s * o)), B = B.merge(K.append("text").attr("fill", "currentColor").attr(h, s * w).attr("dy", t === xr ? "0em" : t === Hr ? "0.71em" : "0.32em")), d !== L && (S = S.transition(d), Y = Y.transition(d), gt = gt.transition(d), B = B.transition(d), z = z.transition(d).attr("opacity", fi).attr("transform", function(O) {
      return isFinite(O = W(O)) ? f(O + u) : this.getAttribute("transform");
    }), K.attr("opacity", fi).attr("transform", function(O) {
      var b = this.parentNode.__axis;
      return f((b && isFinite(b = b(O)) ? b : W(O)) + u);
    })), z.remove(), S.attr("d", t === An || t === kr ? a ? "M" + s * a + "," + E + "H" + u + "V" + M + "H" + s * a : "M" + u + "," + E + "V" + M : a ? "M" + E + "," + s * a + "V" + u + "H" + M + "V" + s * a : "M" + E + "," + u + "H" + M), Y.attr("opacity", 1).attr("transform", function(O) {
      return f(W(O) + u);
    }), gt.attr(h + "2", s * o), B.attr(h, s * w).text(p), L.filter(Ia).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === kr ? "start" : t === An ? "end" : "middle"), L.each(function() {
      this.__axis = W;
    });
  }
  return g.scale = function(d) {
    return arguments.length ? (e = d, g) : e;
  }, g.ticks = function() {
    return n = Array.from(arguments), g;
  }, g.tickArguments = function(d) {
    return arguments.length ? (n = d == null ? [] : Array.from(d), g) : n.slice();
  }, g.tickValues = function(d) {
    return arguments.length ? (r = d == null ? null : Array.from(d), g) : r && r.slice();
  }, g.tickFormat = function(d) {
    return arguments.length ? (i = d, g) : i;
  }, g.tickSize = function(d) {
    return arguments.length ? (o = a = +d, g) : o;
  }, g.tickSizeInner = function(d) {
    return arguments.length ? (o = +d, g) : o;
  }, g.tickSizeOuter = function(d) {
    return arguments.length ? (a = +d, g) : a;
  }, g.tickPadding = function(d) {
    return arguments.length ? (l = +d, g) : l;
  }, g.offset = function(d) {
    return arguments.length ? (u = +d, g) : u;
  }, g;
}
function Wa(t) {
  return wo(Hr, t);
}
function qa(t) {
  return wo(An, t);
}
var Va = { value: () => {
} };
function vo() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new $n(n);
}
function $n(t) {
  this._ = t;
}
function Ba(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
$n.prototype = vo.prototype = {
  constructor: $n,
  on: function(t, e) {
    var n = this._, r = Ba(t + "", n), i, o = -1, a = r.length;
    if (arguments.length < 2) {
      for (; ++o < a; ) if ((i = (t = r[o]).type) && (i = Ga(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++o < a; )
      if (i = (t = r[o]).type) n[i] = hi(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = hi(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new $n(t);
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
function Ga(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function hi(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Va, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Pr = "http://www.w3.org/1999/xhtml";
const gi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Pr,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function pr(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), gi.hasOwnProperty(e) ? { space: gi[e], local: t } : t;
}
function Xa(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Pr && e.documentElement.namespaceURI === Pr ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Oa(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function _o(t) {
  var e = pr(t);
  return (e.local ? Oa : Xa)(e);
}
function Ka() {
}
function Zr(t) {
  return t == null ? Ka : function() {
    return this.querySelector(t);
  };
}
function Za(t) {
  typeof t != "function" && (t = Zr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, l = r[i] = new Array(a), u, s, h = 0; h < a; ++h)
      (u = o[h]) && (s = t.call(u, u.__data__, h, o)) && ("__data__" in u && (s.__data__ = u.__data__), l[h] = s);
  return new xe(r, this._parents);
}
function Qa(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Ja() {
  return [];
}
function bo(t) {
  return t == null ? Ja : function() {
    return this.querySelectorAll(t);
  };
}
function ja(t) {
  return function() {
    return Qa(t.apply(this, arguments));
  };
}
function $a(t) {
  typeof t == "function" ? t = ja(t) : t = bo(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var a = e[o], l = a.length, u, s = 0; s < l; ++s)
      (u = a[s]) && (r.push(t.call(u, u.__data__, s, a)), i.push(u));
  return new xe(r, i);
}
function Mo(t) {
  return function() {
    return this.matches(t);
  };
}
function xo(t) {
  return function(e) {
    return e.matches(t);
  };
}
var tl = Array.prototype.find;
function el(t) {
  return function() {
    return tl.call(this.children, t);
  };
}
function nl() {
  return this.firstElementChild;
}
function rl(t) {
  return this.select(t == null ? nl : el(typeof t == "function" ? t : xo(t)));
}
var il = Array.prototype.filter;
function ol() {
  return Array.from(this.children);
}
function al(t) {
  return function() {
    return il.call(this.children, t);
  };
}
function ll(t) {
  return this.selectAll(t == null ? ol : al(typeof t == "function" ? t : xo(t)));
}
function sl(t) {
  typeof t != "function" && (t = Mo(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, l = r[i] = [], u, s = 0; s < a; ++s)
      (u = o[s]) && t.call(u, u.__data__, s, o) && l.push(u);
  return new xe(r, this._parents);
}
function ko(t) {
  return new Array(t.length);
}
function ul() {
  return new xe(this._enter || this._groups.map(ko), this._parents);
}
function rr(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
rr.prototype = {
  constructor: rr,
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
function cl(t) {
  return function() {
    return t;
  };
}
function fl(t, e, n, r, i, o) {
  for (var a = 0, l, u = e.length, s = o.length; a < s; ++a)
    (l = e[a]) ? (l.__data__ = o[a], r[a] = l) : n[a] = new rr(t, o[a]);
  for (; a < u; ++a)
    (l = e[a]) && (i[a] = l);
}
function hl(t, e, n, r, i, o, a) {
  var l, u, s = /* @__PURE__ */ new Map(), h = e.length, f = o.length, g = new Array(h), d;
  for (l = 0; l < h; ++l)
    (u = e[l]) && (g[l] = d = a.call(u, u.__data__, l, e) + "", s.has(d) ? i[l] = u : s.set(d, u));
  for (l = 0; l < f; ++l)
    d = a.call(t, o[l], l, o) + "", (u = s.get(d)) ? (r[l] = u, u.__data__ = o[l], s.delete(d)) : n[l] = new rr(t, o[l]);
  for (l = 0; l < h; ++l)
    (u = e[l]) && s.get(g[l]) === u && (i[l] = u);
}
function gl(t) {
  return t.__data__;
}
function ml(t, e) {
  if (!arguments.length) return Array.from(this, gl);
  var n = e ? hl : fl, r = this._parents, i = this._groups;
  typeof t != "function" && (t = cl(t));
  for (var o = i.length, a = new Array(o), l = new Array(o), u = new Array(o), s = 0; s < o; ++s) {
    var h = r[s], f = i[s], g = f.length, d = dl(t.call(h, h && h.__data__, s, r)), y = d.length, p = l[s] = new Array(y), w = a[s] = new Array(y), C = u[s] = new Array(g);
    n(h, f, p, w, C, d, e);
    for (var E = 0, M = 0, W, L; E < y; ++E)
      if (W = p[E]) {
        for (E >= M && (M = E + 1); !(L = w[M]) && ++M < y; ) ;
        W._next = L || null;
      }
  }
  return a = new xe(a, r), a._enter = l, a._exit = u, a;
}
function dl(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function pl() {
  return new xe(this._exit || this._groups.map(ko), this._parents);
}
function yl(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function wl(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, a = Math.min(i, o), l = new Array(i), u = 0; u < a; ++u)
    for (var s = n[u], h = r[u], f = s.length, g = l[u] = new Array(f), d, y = 0; y < f; ++y)
      (d = s[y] || h[y]) && (g[y] = d);
  for (; u < i; ++u)
    l[u] = n[u];
  return new xe(l, this._parents);
}
function vl() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], a; --i >= 0; )
      (a = r[i]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function _l(t) {
  t || (t = bl);
  function e(f, g) {
    return f && g ? t(f.__data__, g.__data__) : !f - !g;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var a = n[o], l = a.length, u = i[o] = new Array(l), s, h = 0; h < l; ++h)
      (s = a[h]) && (u[h] = s);
    u.sort(e);
  }
  return new xe(i, this._parents).order();
}
function bl(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Ml() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function xl() {
  return Array.from(this);
}
function kl() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var a = r[i];
      if (a) return a;
    }
  return null;
}
function Tl() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Cl() {
  return !this.node();
}
function Dl(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, a = i.length, l; o < a; ++o)
      (l = i[o]) && t.call(l, l.__data__, o, i);
  return this;
}
function Sl(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Al(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Fl(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Nl(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Ul(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Ll(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function El(t, e) {
  var n = pr(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Al : Sl : typeof e == "function" ? n.local ? Ll : Ul : n.local ? Nl : Fl)(n, e));
}
function To(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Rl(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Yl(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function zl(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Hl(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Rl : typeof e == "function" ? zl : Yl)(t, e, n ?? "")) : dn(this.node(), t);
}
function dn(t, e) {
  return t.style.getPropertyValue(e) || To(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Pl(t) {
  return function() {
    delete this[t];
  };
}
function Il(t, e) {
  return function() {
    this[t] = e;
  };
}
function Wl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function ql(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Pl : typeof e == "function" ? Wl : Il)(t, e)) : this.node()[t];
}
function Co(t) {
  return t.trim().split(/^|\s+/);
}
function Qr(t) {
  return t.classList || new Do(t);
}
function Do(t) {
  this._node = t, this._names = Co(t.getAttribute("class") || "");
}
Do.prototype = {
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
  for (var n = Qr(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function Ao(t, e) {
  for (var n = Qr(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function Vl(t) {
  return function() {
    So(this, t);
  };
}
function Bl(t) {
  return function() {
    Ao(this, t);
  };
}
function Gl(t, e) {
  return function() {
    (e.apply(this, arguments) ? So : Ao)(this, t);
  };
}
function Xl(t, e) {
  var n = Co(t + "");
  if (arguments.length < 2) {
    for (var r = Qr(this.node()), i = -1, o = n.length; ++i < o; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Gl : e ? Vl : Bl)(n, e));
}
function Ol() {
  this.textContent = "";
}
function Kl(t) {
  return function() {
    this.textContent = t;
  };
}
function Zl(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Ql(t) {
  return arguments.length ? this.each(t == null ? Ol : (typeof t == "function" ? Zl : Kl)(t)) : this.node().textContent;
}
function Jl() {
  this.innerHTML = "";
}
function jl(t) {
  return function() {
    this.innerHTML = t;
  };
}
function $l(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function ts(t) {
  return arguments.length ? this.each(t == null ? Jl : (typeof t == "function" ? $l : jl)(t)) : this.node().innerHTML;
}
function es() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ns() {
  return this.each(es);
}
function rs() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function is() {
  return this.each(rs);
}
function os(t) {
  var e = typeof t == "function" ? t : _o(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function as() {
  return null;
}
function ls(t, e) {
  var n = typeof t == "function" ? t : _o(t), r = e == null ? as : typeof e == "function" ? e : Zr(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function ss() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function us() {
  return this.each(ss);
}
function cs() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function fs() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function hs(t) {
  return this.select(t ? fs : cs);
}
function gs(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function ms(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function ds(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function ps(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function ys(t, e, n) {
  return function() {
    var r = this.__on, i, o = ms(e);
    if (r) {
      for (var a = 0, l = r.length; a < l; ++a)
        if ((i = r[a]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, n), i = { type: t.type, name: t.name, value: e, listener: o, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function ws(t, e, n) {
  var r = ds(t + ""), i, o = r.length, a;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var u = 0, s = l.length, h; u < s; ++u)
        for (i = 0, h = l[u]; i < o; ++i)
          if ((a = r[i]).type === h.type && a.name === h.name)
            return h.value;
    }
    return;
  }
  for (l = e ? ys : ps, i = 0; i < o; ++i) this.each(l(r[i], e, n));
  return this;
}
function Fo(t, e, n) {
  var r = To(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function vs(t, e) {
  return function() {
    return Fo(this, t, e);
  };
}
function _s(t, e) {
  return function() {
    return Fo(this, t, e.apply(this, arguments));
  };
}
function bs(t, e) {
  return this.each((typeof e == "function" ? _s : vs)(t, e));
}
function* Ms() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, a; i < o; ++i)
      (a = r[i]) && (yield a);
}
var No = [null];
function xe(t, e) {
  this._groups = t, this._parents = e;
}
function qn() {
  return new xe([[document.documentElement]], No);
}
function xs() {
  return this;
}
xe.prototype = qn.prototype = {
  constructor: xe,
  select: Za,
  selectAll: $a,
  selectChild: rl,
  selectChildren: ll,
  filter: sl,
  data: ml,
  enter: ul,
  exit: pl,
  join: yl,
  merge: wl,
  selection: xs,
  order: vl,
  sort: _l,
  call: Ml,
  nodes: xl,
  node: kl,
  size: Tl,
  empty: Cl,
  each: Dl,
  attr: El,
  style: Hl,
  property: ql,
  classed: Xl,
  text: Ql,
  html: ts,
  raise: ns,
  lower: is,
  append: os,
  insert: ls,
  remove: us,
  clone: hs,
  datum: gs,
  on: ws,
  dispatch: bs,
  [Symbol.iterator]: Ms
};
function Xe(t) {
  return typeof t == "string" ? new xe([[document.querySelector(t)]], [document.documentElement]) : new xe([[t]], No);
}
function Jr(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Uo(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function Vn() {
}
var zn = 0.7, ir = 1 / zn, mn = "\\s*([+-]?\\d+)\\s*", Hn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ze = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ks = /^#([0-9a-f]{3,8})$/, Ts = new RegExp(`^rgb\\(${mn},${mn},${mn}\\)$`), Cs = new RegExp(`^rgb\\(${ze},${ze},${ze}\\)$`), Ds = new RegExp(`^rgba\\(${mn},${mn},${mn},${Hn}\\)$`), Ss = new RegExp(`^rgba\\(${ze},${ze},${ze},${Hn}\\)$`), As = new RegExp(`^hsl\\(${Hn},${ze},${ze}\\)$`), Fs = new RegExp(`^hsla\\(${Hn},${ze},${ze},${Hn}\\)$`), mi = {
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
Jr(Vn, Je, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: di,
  // Deprecated! Use color.formatHex.
  formatHex: di,
  formatHex8: Ns,
  formatHsl: Us,
  formatRgb: pi,
  toString: pi
});
function di() {
  return this.rgb().formatHex();
}
function Ns() {
  return this.rgb().formatHex8();
}
function Us() {
  return Lo(this).formatHsl();
}
function pi() {
  return this.rgb().formatRgb();
}
function Je(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = ks.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? yi(e) : n === 3 ? new Me(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Xn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Xn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Ts.exec(t)) ? new Me(e[1], e[2], e[3], 1) : (e = Cs.exec(t)) ? new Me(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Ds.exec(t)) ? Xn(e[1], e[2], e[3], e[4]) : (e = Ss.exec(t)) ? Xn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = As.exec(t)) ? _i(e[1], e[2] / 100, e[3] / 100, 1) : (e = Fs.exec(t)) ? _i(e[1], e[2] / 100, e[3] / 100, e[4]) : mi.hasOwnProperty(t) ? yi(mi[t]) : t === "transparent" ? new Me(NaN, NaN, NaN, 0) : null;
}
function yi(t) {
  return new Me(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Xn(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new Me(t, e, n, r);
}
function Ls(t) {
  return t instanceof Vn || (t = Je(t)), t ? (t = t.rgb(), new Me(t.r, t.g, t.b, t.opacity)) : new Me();
}
function Ir(t, e, n, r) {
  return arguments.length === 1 ? Ls(t) : new Me(t, e, n, r ?? 1);
}
function Me(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Jr(Me, Ir, Uo(Vn, {
  brighter(t) {
    return t = t == null ? ir : Math.pow(ir, t), new Me(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? zn : Math.pow(zn, t), new Me(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Me(Qe(this.r), Qe(this.g), Qe(this.b), or(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: wi,
  // Deprecated! Use color.formatHex.
  formatHex: wi,
  formatHex8: Es,
  formatRgb: vi,
  toString: vi
}));
function wi() {
  return `#${Ze(this.r)}${Ze(this.g)}${Ze(this.b)}`;
}
function Es() {
  return `#${Ze(this.r)}${Ze(this.g)}${Ze(this.b)}${Ze((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function vi() {
  const t = or(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Qe(this.r)}, ${Qe(this.g)}, ${Qe(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function or(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Qe(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Ze(t) {
  return t = Qe(t), (t < 16 ? "0" : "") + t.toString(16);
}
function _i(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new Ue(t, e, n, r);
}
function Lo(t) {
  if (t instanceof Ue) return new Ue(t.h, t.s, t.l, t.opacity);
  if (t instanceof Vn || (t = Je(t)), !t) return new Ue();
  if (t instanceof Ue) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), a = NaN, l = o - i, u = (o + i) / 2;
  return l ? (e === o ? a = (n - r) / l + (n < r) * 6 : n === o ? a = (r - e) / l + 2 : a = (e - n) / l + 4, l /= u < 0.5 ? o + i : 2 - o - i, a *= 60) : l = u > 0 && u < 1 ? 0 : a, new Ue(a, l, u, t.opacity);
}
function Rs(t, e, n, r) {
  return arguments.length === 1 ? Lo(t) : new Ue(t, e, n, r ?? 1);
}
function Ue(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Jr(Ue, Rs, Uo(Vn, {
  brighter(t) {
    return t = t == null ? ir : Math.pow(ir, t), new Ue(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? zn : Math.pow(zn, t), new Ue(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new Me(
      Tr(t >= 240 ? t - 240 : t + 120, i, r),
      Tr(t, i, r),
      Tr(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new Ue(bi(this.h), On(this.s), On(this.l), or(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = or(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${bi(this.h)}, ${On(this.s) * 100}%, ${On(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function bi(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function On(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Tr(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const jr = (t) => () => t;
function Ys(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function zs(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function Hs(t) {
  return (t = +t) == 1 ? Eo : function(e, n) {
    return n - e ? zs(e, n, t) : jr(isNaN(e) ? n : e);
  };
}
function Eo(t, e) {
  var n = e - t;
  return n ? Ys(t, n) : jr(isNaN(t) ? e : t);
}
const ar = function t(e) {
  var n = Hs(e);
  function r(i, o) {
    var a = n((i = Ir(i)).r, (o = Ir(o)).r), l = n(i.g, o.g), u = n(i.b, o.b), s = Eo(i.opacity, o.opacity);
    return function(h) {
      return i.r = a(h), i.g = l(h), i.b = u(h), i.opacity = s(h), i + "";
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
function Is(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Ws(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), o = new Array(n), a;
  for (a = 0; a < r; ++a) i[a] = $r(t[a], e[a]);
  for (; a < n; ++a) o[a] = e[a];
  return function(l) {
    for (a = 0; a < r; ++a) o[a] = i[a](l);
    return o;
  };
}
function qs(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function Ne(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Vs(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = $r(t[i], e[i]) : r[i] = e[i];
  return function(o) {
    for (i in n) r[i] = n[i](o);
    return r;
  };
}
var Wr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Cr = new RegExp(Wr.source, "g");
function Bs(t) {
  return function() {
    return t;
  };
}
function Gs(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Ro(t, e) {
  var n = Wr.lastIndex = Cr.lastIndex = 0, r, i, o, a = -1, l = [], u = [];
  for (t = t + "", e = e + ""; (r = Wr.exec(t)) && (i = Cr.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), l[a] ? l[a] += o : l[++a] = o), (r = r[0]) === (i = i[0]) ? l[a] ? l[a] += i : l[++a] = i : (l[++a] = null, u.push({ i: a, x: Ne(r, i) })), n = Cr.lastIndex;
  return n < e.length && (o = e.slice(n), l[a] ? l[a] += o : l[++a] = o), l.length < 2 ? u[0] ? Gs(u[0].x) : Bs(e) : (e = u.length, function(s) {
    for (var h = 0, f; h < e; ++h) l[(f = u[h]).i] = f.x(s);
    return l.join("");
  });
}
function $r(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? jr(e) : (n === "number" ? Ne : n === "string" ? (r = Je(e)) ? (e = r, ar) : Ro : e instanceof Je ? ar : e instanceof Date ? qs : Is(e) ? Ps : Array.isArray(e) ? Ws : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Vs : Ne)(t, e);
}
function Xs(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var Mi = 180 / Math.PI, qr = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Yo(t, e, n, r, i, o) {
  var a, l, u;
  return (a = Math.sqrt(t * t + e * e)) && (t /= a, e /= a), (u = t * n + e * r) && (n -= t * u, r -= e * u), (l = Math.sqrt(n * n + r * r)) && (n /= l, r /= l, u /= l), t * r < e * n && (t = -t, e = -e, u = -u, a = -a), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * Mi,
    skewX: Math.atan(u) * Mi,
    scaleX: a,
    scaleY: l
  };
}
var Kn;
function Os(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? qr : Yo(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Ks(t) {
  return t == null || (Kn || (Kn = document.createElementNS("http://www.w3.org/2000/svg", "g")), Kn.setAttribute("transform", t), !(t = Kn.transform.baseVal.consolidate())) ? qr : (t = t.matrix, Yo(t.a, t.b, t.c, t.d, t.e, t.f));
}
function zo(t, e, n, r) {
  function i(s) {
    return s.length ? s.pop() + " " : "";
  }
  function o(s, h, f, g, d, y) {
    if (s !== f || h !== g) {
      var p = d.push("translate(", null, e, null, n);
      y.push({ i: p - 4, x: Ne(s, f) }, { i: p - 2, x: Ne(h, g) });
    } else (f || g) && d.push("translate(" + f + e + g + n);
  }
  function a(s, h, f, g) {
    s !== h ? (s - h > 180 ? h += 360 : h - s > 180 && (s += 360), g.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: Ne(s, h) })) : h && f.push(i(f) + "rotate(" + h + r);
  }
  function l(s, h, f, g) {
    s !== h ? g.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: Ne(s, h) }) : h && f.push(i(f) + "skewX(" + h + r);
  }
  function u(s, h, f, g, d, y) {
    if (s !== f || h !== g) {
      var p = d.push(i(d) + "scale(", null, ",", null, ")");
      y.push({ i: p - 4, x: Ne(s, f) }, { i: p - 2, x: Ne(h, g) });
    } else (f !== 1 || g !== 1) && d.push(i(d) + "scale(" + f + "," + g + ")");
  }
  return function(s, h) {
    var f = [], g = [];
    return s = t(s), h = t(h), o(s.translateX, s.translateY, h.translateX, h.translateY, f, g), a(s.rotate, h.rotate, f, g), l(s.skewX, h.skewX, f, g), u(s.scaleX, s.scaleY, h.scaleX, h.scaleY, f, g), s = h = null, function(d) {
      for (var y = -1, p = g.length, w; ++y < p; ) f[(w = g[y]).i] = w.x(d);
      return f.join("");
    };
  };
}
var Zs = zo(Os, "px, ", "px)", "deg)"), Qs = zo(Ks, ", ", ")", ")"), pn = 0, Fn = 0, kn = 0, Ho = 1e3, lr, Nn, sr = 0, je = 0, yr = 0, Pn = typeof performance == "object" && performance.now ? performance : Date, Po = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function ti() {
  return je || (Po(Js), je = Pn.now() + yr);
}
function Js() {
  je = 0;
}
function ur() {
  this._call = this._time = this._next = null;
}
ur.prototype = Io.prototype = {
  constructor: ur,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? ti() : +n) + (e == null ? 0 : +e), !this._next && Nn !== this && (Nn ? Nn._next = this : lr = this, Nn = this), this._call = t, this._time = n, Vr();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Vr());
  }
};
function Io(t, e, n) {
  var r = new ur();
  return r.restart(t, e, n), r;
}
function js() {
  ti(), ++pn;
  for (var t = lr, e; t; )
    (e = je - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --pn;
}
function xi() {
  je = (sr = Pn.now()) + yr, pn = Fn = 0;
  try {
    js();
  } finally {
    pn = 0, tu(), je = 0;
  }
}
function $s() {
  var t = Pn.now(), e = t - sr;
  e > Ho && (yr -= e, sr = t);
}
function tu() {
  for (var t, e = lr, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : lr = n);
  Nn = t, Vr(r);
}
function Vr(t) {
  if (!pn) {
    Fn && (Fn = clearTimeout(Fn));
    var e = t - je;
    e > 24 ? (t < 1 / 0 && (Fn = setTimeout(xi, t - Pn.now() - yr)), kn && (kn = clearInterval(kn))) : (kn || (sr = Pn.now(), kn = setInterval($s, Ho)), pn = 1, Po(xi));
  }
}
function ki(t, e, n) {
  var r = new ur();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var eu = vo("start", "end", "cancel", "interrupt"), nu = [], Wo = 0, Ti = 1, Br = 2, tr = 3, Ci = 4, Gr = 5, er = 6;
function wr(t, e, n, r, i, o) {
  var a = t.__transition;
  if (!a) t.__transition = {};
  else if (n in a) return;
  ru(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: eu,
    tween: nu,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Wo
  });
}
function ei(t, e) {
  var n = Le(t, e);
  if (n.state > Wo) throw new Error("too late; already scheduled");
  return n;
}
function Ie(t, e) {
  var n = Le(t, e);
  if (n.state > tr) throw new Error("too late; already running");
  return n;
}
function Le(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function ru(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Io(o, 0, n.time);
  function o(s) {
    n.state = Ti, n.timer.restart(a, n.delay, n.time), n.delay <= s && a(s - n.delay);
  }
  function a(s) {
    var h, f, g, d;
    if (n.state !== Ti) return u();
    for (h in r)
      if (d = r[h], d.name === n.name) {
        if (d.state === tr) return ki(a);
        d.state === Ci ? (d.state = er, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete r[h]) : +h < e && (d.state = er, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete r[h]);
      }
    if (ki(function() {
      n.state === tr && (n.state = Ci, n.timer.restart(l, n.delay, n.time), l(s));
    }), n.state = Br, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Br) {
      for (n.state = tr, i = new Array(g = n.tween.length), h = 0, f = -1; h < g; ++h)
        (d = n.tween[h].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = d);
      i.length = f + 1;
    }
  }
  function l(s) {
    for (var h = s < n.duration ? n.ease.call(null, s / n.duration) : (n.timer.restart(u), n.state = Gr, 1), f = -1, g = i.length; ++f < g; )
      i[f].call(t, h);
    n.state === Gr && (n.on.call("end", t, t.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = er, n.timer.stop(), delete r[e];
    for (var s in r) return;
    delete t.__transition;
  }
}
function iu(t, e) {
  var n = t.__transition, r, i, o = !0, a;
  if (n) {
    e = e == null ? null : e + "";
    for (a in n) {
      if ((r = n[a]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > Br && r.state < Gr, r.state = er, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[a];
    }
    o && delete t.__transition;
  }
}
function ou(t) {
  return this.each(function() {
    iu(this, t);
  });
}
function au(t, e) {
  var n, r;
  return function() {
    var i = Ie(this, t), o = i.tween;
    if (o !== n) {
      r = n = o;
      for (var a = 0, l = r.length; a < l; ++a)
        if (r[a].name === e) {
          r = r.slice(), r.splice(a, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function lu(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = Ie(this, t), a = o.tween;
    if (a !== r) {
      i = (r = a).slice();
      for (var l = { name: e, value: n }, u = 0, s = i.length; u < s; ++u)
        if (i[u].name === e) {
          i[u] = l;
          break;
        }
      u === s && i.push(l);
    }
    o.tween = i;
  };
}
function su(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = Le(this.node(), n).tween, i = 0, o = r.length, a; i < o; ++i)
      if ((a = r[i]).name === t)
        return a.value;
    return null;
  }
  return this.each((e == null ? au : lu)(n, t, e));
}
function ni(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = Ie(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return Le(i, r).value[e];
  };
}
function qo(t, e) {
  var n;
  return (typeof e == "number" ? Ne : e instanceof Je ? ar : (n = Je(e)) ? (e = n, ar) : Ro)(t, e);
}
function uu(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function cu(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function fu(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttribute(t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function hu(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttributeNS(t.space, t.local);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function gu(t, e, n) {
  var r, i, o;
  return function() {
    var a, l = n(this), u;
    return l == null ? void this.removeAttribute(t) : (a = this.getAttribute(t), u = l + "", a === u ? null : a === r && u === i ? o : (i = u, o = e(r = a, l)));
  };
}
function mu(t, e, n) {
  var r, i, o;
  return function() {
    var a, l = n(this), u;
    return l == null ? void this.removeAttributeNS(t.space, t.local) : (a = this.getAttributeNS(t.space, t.local), u = l + "", a === u ? null : a === r && u === i ? o : (i = u, o = e(r = a, l)));
  };
}
function du(t, e) {
  var n = pr(t), r = n === "transform" ? Qs : qo;
  return this.attrTween(t, typeof e == "function" ? (n.local ? mu : gu)(n, r, ni(this, "attr." + t, e)) : e == null ? (n.local ? cu : uu)(n) : (n.local ? hu : fu)(n, r, e));
}
function pu(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function yu(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function wu(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && yu(t, o)), n;
  }
  return i._value = e, i;
}
function vu(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && pu(t, o)), n;
  }
  return i._value = e, i;
}
function _u(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = pr(t);
  return this.tween(n, (r.local ? wu : vu)(r, e));
}
function bu(t, e) {
  return function() {
    ei(this, t).delay = +e.apply(this, arguments);
  };
}
function Mu(t, e) {
  return e = +e, function() {
    ei(this, t).delay = e;
  };
}
function xu(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? bu : Mu)(e, t)) : Le(this.node(), e).delay;
}
function ku(t, e) {
  return function() {
    Ie(this, t).duration = +e.apply(this, arguments);
  };
}
function Tu(t, e) {
  return e = +e, function() {
    Ie(this, t).duration = e;
  };
}
function Cu(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ku : Tu)(e, t)) : Le(this.node(), e).duration;
}
function Du(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    Ie(this, t).ease = e;
  };
}
function Su(t) {
  var e = this._id;
  return arguments.length ? this.each(Du(e, t)) : Le(this.node(), e).ease;
}
function Au(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Ie(this, t).ease = n;
  };
}
function Fu(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Au(this._id, t));
}
function Nu(t) {
  typeof t != "function" && (t = Mo(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, l = r[i] = [], u, s = 0; s < a; ++s)
      (u = o[s]) && t.call(u, u.__data__, s, o) && l.push(u);
  return new Be(r, this._parents, this._name, this._id);
}
function Uu(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), a = new Array(r), l = 0; l < o; ++l)
    for (var u = e[l], s = n[l], h = u.length, f = a[l] = new Array(h), g, d = 0; d < h; ++d)
      (g = u[d] || s[d]) && (f[d] = g);
  for (; l < r; ++l)
    a[l] = e[l];
  return new Be(a, this._parents, this._name, this._id);
}
function Lu(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Eu(t, e, n) {
  var r, i, o = Lu(e) ? ei : Ie;
  return function() {
    var a = o(this, t), l = a.on;
    l !== r && (i = (r = l).copy()).on(e, n), a.on = i;
  };
}
function Ru(t, e) {
  var n = this._id;
  return arguments.length < 2 ? Le(this.node(), n).on.on(t) : this.each(Eu(n, t, e));
}
function Yu(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function zu() {
  return this.on("end.remove", Yu(this._id));
}
function Hu(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Zr(t));
  for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
    for (var l = r[a], u = l.length, s = o[a] = new Array(u), h, f, g = 0; g < u; ++g)
      (h = l[g]) && (f = t.call(h, h.__data__, g, l)) && ("__data__" in h && (f.__data__ = h.__data__), s[g] = f, wr(s[g], e, n, g, s, Le(h, n)));
  return new Be(o, this._parents, e, n);
}
function Pu(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = bo(t));
  for (var r = this._groups, i = r.length, o = [], a = [], l = 0; l < i; ++l)
    for (var u = r[l], s = u.length, h, f = 0; f < s; ++f)
      if (h = u[f]) {
        for (var g = t.call(h, h.__data__, f, u), d, y = Le(h, n), p = 0, w = g.length; p < w; ++p)
          (d = g[p]) && wr(d, e, n, p, g, y);
        o.push(g), a.push(h);
      }
  return new Be(o, a, e, n);
}
var Iu = qn.prototype.constructor;
function Wu() {
  return new Iu(this._groups, this._parents);
}
function qu(t, e) {
  var n, r, i;
  return function() {
    var o = dn(this, t), a = (this.style.removeProperty(t), dn(this, t));
    return o === a ? null : o === n && a === r ? i : i = e(n = o, r = a);
  };
}
function Vo(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Vu(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = dn(this, t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function Bu(t, e, n) {
  var r, i, o;
  return function() {
    var a = dn(this, t), l = n(this), u = l + "";
    return l == null && (u = l = (this.style.removeProperty(t), dn(this, t))), a === u ? null : a === r && u === i ? o : (i = u, o = e(r = a, l));
  };
}
function Gu(t, e) {
  var n, r, i, o = "style." + e, a = "end." + o, l;
  return function() {
    var u = Ie(this, t), s = u.on, h = u.value[o] == null ? l || (l = Vo(e)) : void 0;
    (s !== n || i !== h) && (r = (n = s).copy()).on(a, i = h), u.on = r;
  };
}
function Xu(t, e, n) {
  var r = (t += "") == "transform" ? Zs : qo;
  return e == null ? this.styleTween(t, qu(t, r)).on("end.style." + t, Vo(t)) : typeof e == "function" ? this.styleTween(t, Bu(t, r, ni(this, "style." + t, e))).each(Gu(this._id, t)) : this.styleTween(t, Vu(t, r, e), n).on("end.style." + t, null);
}
function Ou(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Ku(t, e, n) {
  var r, i;
  function o() {
    var a = e.apply(this, arguments);
    return a !== i && (r = (i = a) && Ou(t, a, n)), r;
  }
  return o._value = e, o;
}
function Zu(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Ku(t, e, n ?? ""));
}
function Qu(t) {
  return function() {
    this.textContent = t;
  };
}
function Ju(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function ju(t) {
  return this.tween("text", typeof t == "function" ? Ju(ni(this, "text", t)) : Qu(t == null ? "" : t + ""));
}
function $u(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function tc(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && $u(i)), e;
  }
  return r._value = t, r;
}
function ec(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, tc(t));
}
function nc() {
  for (var t = this._name, e = this._id, n = Bo(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], l = a.length, u, s = 0; s < l; ++s)
      if (u = a[s]) {
        var h = Le(u, e);
        wr(u, t, n, s, a, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new Be(r, this._parents, t, n);
}
function rc() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, a) {
    var l = { value: a }, u = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var s = Ie(this, r), h = s.on;
      h !== t && (e = (t = h).copy(), e._.cancel.push(l), e._.interrupt.push(l), e._.end.push(u)), s.on = e;
    }), i === 0 && o();
  });
}
var ic = 0;
function Be(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Bo() {
  return ++ic;
}
var Ve = qn.prototype;
Be.prototype = {
  constructor: Be,
  select: Hu,
  selectAll: Pu,
  selectChild: Ve.selectChild,
  selectChildren: Ve.selectChildren,
  filter: Nu,
  merge: Uu,
  selection: Wu,
  transition: nc,
  call: Ve.call,
  nodes: Ve.nodes,
  node: Ve.node,
  size: Ve.size,
  empty: Ve.empty,
  each: Ve.each,
  on: Ru,
  attr: du,
  attrTween: _u,
  style: Xu,
  styleTween: Zu,
  text: ju,
  textTween: ec,
  remove: zu,
  tween: su,
  delay: xu,
  duration: Cu,
  ease: Su,
  easeVarying: Fu,
  end: rc,
  [Symbol.iterator]: Ve[Symbol.iterator]
};
function oc(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var ac = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: oc
};
function lc(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function sc(t) {
  var e, n;
  t instanceof Be ? (e = t._id, t = t._name) : (e = Bo(), (n = ac).time = ti(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], l = a.length, u, s = 0; s < l; ++s)
      (u = a[s]) && wr(u, t, e, s, a, n || lc(u, e));
  return new Be(r, this._parents, t, e);
}
qn.prototype.interrupt = ou;
qn.prototype.transition = sc;
const Xr = Math.PI, Or = 2 * Xr, Oe = 1e-6, uc = Or - Oe;
function Go(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function cc(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return Go;
  const n = 10 ** e;
  return function(r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class fc {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Go : cc(e);
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
  bezierCurveTo(e, n, r, i, o, a) {
    this._append`C${+e},${+n},${+r},${+i},${this._x1 = +o},${this._y1 = +a}`;
  }
  arcTo(e, n, r, i, o) {
    if (e = +e, n = +n, r = +r, i = +i, o = +o, o < 0) throw new Error(`negative radius: ${o}`);
    let a = this._x1, l = this._y1, u = r - e, s = i - n, h = a - e, f = l - n, g = h * h + f * f;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (g > Oe) if (!(Math.abs(f * u - s * h) > Oe) || !o)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let d = r - a, y = i - l, p = u * u + s * s, w = d * d + y * y, C = Math.sqrt(p), E = Math.sqrt(g), M = o * Math.tan((Xr - Math.acos((p + g - w) / (2 * C * E))) / 2), W = M / E, L = M / C;
      Math.abs(W - 1) > Oe && this._append`L${e + W * h},${n + W * f}`, this._append`A${o},${o},0,0,${+(f * d > h * y)},${this._x1 = e + L * u},${this._y1 = n + L * s}`;
    }
  }
  arc(e, n, r, i, o, a) {
    if (e = +e, n = +n, r = +r, a = !!a, r < 0) throw new Error(`negative radius: ${r}`);
    let l = r * Math.cos(i), u = r * Math.sin(i), s = e + l, h = n + u, f = 1 ^ a, g = a ? i - o : o - i;
    this._x1 === null ? this._append`M${s},${h}` : (Math.abs(this._x1 - s) > Oe || Math.abs(this._y1 - h) > Oe) && this._append`L${s},${h}`, r && (g < 0 && (g = g % Or + Or), g > uc ? this._append`A${r},${r},0,1,${f},${e - l},${n - u}A${r},${r},0,1,${f},${this._x1 = s},${this._y1 = h}` : g > Oe && this._append`A${r},${r},0,${+(g >= Xr)},${f},${this._x1 = e + r * Math.cos(o)},${this._y1 = n + r * Math.sin(o)}`);
  }
  rect(e, n, r, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function hc(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function cr(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function yn(t) {
  return t = cr(Math.abs(t)), t ? t[1] : NaN;
}
function gc(t, e) {
  return function(n, r) {
    for (var i = n.length, o = [], a = 0, l = t[0], u = 0; i > 0 && l > 0 && (u + l + 1 > r && (l = Math.max(1, r - u)), o.push(n.substring(i -= l, i + l)), !((u += l + 1) > r)); )
      l = t[a = (a + 1) % t.length];
    return o.reverse().join(e);
  };
}
function mc(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var dc = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function fr(t) {
  if (!(e = dc.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new ri({
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
fr.prototype = ri.prototype;
function ri(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
ri.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function pc(t) {
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
var Xo;
function yc(t, e) {
  var n = cr(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1], o = i - (Xo = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, a = r.length;
  return o === a ? r : o > a ? r + new Array(o - a + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + cr(t, Math.max(0, e + o - 1))[0];
}
function Di(t, e) {
  var n = cr(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const Si = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: hc,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Di(t * 100, e),
  r: Di,
  s: yc,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Ai(t) {
  return t;
}
var Fi = Array.prototype.map, Ni = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function wc(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Ai : gc(Fi.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", o = t.numerals === void 0 ? Ai : mc(Fi.call(t.numerals, String)), a = t.percent === void 0 ? "%" : t.percent + "", l = t.minus === void 0 ? "−" : t.minus + "", u = t.nan === void 0 ? "NaN" : t.nan + "";
  function s(f) {
    f = fr(f);
    var g = f.fill, d = f.align, y = f.sign, p = f.symbol, w = f.zero, C = f.width, E = f.comma, M = f.precision, W = f.trim, L = f.type;
    L === "n" ? (E = !0, L = "g") : Si[L] || (M === void 0 && (M = 12), W = !0, L = "g"), (w || g === "0" && d === "=") && (w = !0, g = "0", d = "=");
    var S = p === "$" ? n : p === "#" && /[boxX]/.test(L) ? "0" + L.toLowerCase() : "", Y = p === "$" ? r : /[%p]/.test(L) ? a : "", z = Si[L], K = /[defgprs%]/.test(L);
    M = M === void 0 ? 6 : /[gprs]/.test(L) ? Math.max(1, Math.min(21, M)) : Math.max(0, Math.min(20, M));
    function gt(B) {
      var O = S, b = Y, _, H, D;
      if (L === "c")
        b = z(B) + b, B = "";
      else {
        B = +B;
        var bt = B < 0 || 1 / B < 0;
        if (B = isNaN(B) ? u : z(Math.abs(B), M), W && (B = pc(B)), bt && +B == 0 && y !== "+" && (bt = !1), O = (bt ? y === "(" ? y : l : y === "-" || y === "(" ? "" : y) + O, b = (L === "s" ? Ni[8 + Xo / 3] : "") + b + (bt && y === "(" ? ")" : ""), K) {
          for (_ = -1, H = B.length; ++_ < H; )
            if (D = B.charCodeAt(_), 48 > D || D > 57) {
              b = (D === 46 ? i + B.slice(_ + 1) : B.slice(_)) + b, B = B.slice(0, _);
              break;
            }
        }
      }
      E && !w && (B = e(B, 1 / 0));
      var wt = O.length + B.length + b.length, ct = wt < C ? new Array(C - wt + 1).join(g) : "";
      switch (E && w && (B = e(ct + B, ct.length ? C - b.length : 1 / 0), ct = ""), d) {
        case "<":
          B = O + B + b + ct;
          break;
        case "=":
          B = O + ct + B + b;
          break;
        case "^":
          B = ct.slice(0, wt = ct.length >> 1) + O + B + b + ct.slice(wt);
          break;
        default:
          B = ct + O + B + b;
          break;
      }
      return o(B);
    }
    return gt.toString = function() {
      return f + "";
    }, gt;
  }
  function h(f, g) {
    var d = s((f = fr(f), f.type = "f", f)), y = Math.max(-8, Math.min(8, Math.floor(yn(g) / 3))) * 3, p = Math.pow(10, -y), w = Ni[8 + y / 3];
    return function(C) {
      return d(p * C) + w;
    };
  }
  return {
    format: s,
    formatPrefix: h
  };
}
var Zn, Oo, Ko;
vc({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function vc(t) {
  return Zn = wc(t), Oo = Zn.format, Ko = Zn.formatPrefix, Zn;
}
function _c(t) {
  return Math.max(0, -yn(Math.abs(t)));
}
function bc(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(yn(e) / 3))) * 3 - yn(Math.abs(t)));
}
function Mc(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, yn(e) - yn(t)) + 1;
}
function xc(t, e) {
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
function kc(t) {
  return function() {
    return t;
  };
}
function Tc(t) {
  return +t;
}
var Ui = [0, 1];
function hn(t) {
  return t;
}
function Kr(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : kc(isNaN(e) ? NaN : 0.5);
}
function Cc(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function Dc(t, e, n) {
  var r = t[0], i = t[1], o = e[0], a = e[1];
  return i < r ? (r = Kr(i, r), o = n(a, o)) : (r = Kr(r, i), o = n(o, a)), function(l) {
    return o(r(l));
  };
}
function Sc(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), o = new Array(r), a = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++a < r; )
    i[a] = Kr(t[a], t[a + 1]), o[a] = n(e[a], e[a + 1]);
  return function(l) {
    var u = Da(t, l, 1, r) - 1;
    return o[u](i[u](l));
  };
}
function Ac(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function Fc() {
  var t = Ui, e = Ui, n = $r, r, i, o, a = hn, l, u, s;
  function h() {
    var g = Math.min(t.length, e.length);
    return a !== hn && (a = Cc(t[0], t[g - 1])), l = g > 2 ? Sc : Dc, u = s = null, f;
  }
  function f(g) {
    return g == null || isNaN(g = +g) ? o : (u || (u = l(t.map(r), e, n)))(r(a(g)));
  }
  return f.invert = function(g) {
    return a(i((s || (s = l(e, t.map(r), Ne)))(g)));
  }, f.domain = function(g) {
    return arguments.length ? (t = Array.from(g, Tc), h()) : t.slice();
  }, f.range = function(g) {
    return arguments.length ? (e = Array.from(g), h()) : e.slice();
  }, f.rangeRound = function(g) {
    return e = Array.from(g), n = Xs, h();
  }, f.clamp = function(g) {
    return arguments.length ? (a = g ? !0 : hn, h()) : a !== hn;
  }, f.interpolate = function(g) {
    return arguments.length ? (n = g, h()) : n;
  }, f.unknown = function(g) {
    return arguments.length ? (o = g, f) : o;
  }, function(g, d) {
    return r = g, i = d, h();
  };
}
function Nc() {
  return Fc()(hn, hn);
}
function Uc(t, e, n, r) {
  var i = La(t, e, n), o;
  switch (r = fr(r ?? ",f"), r.type) {
    case "s": {
      var a = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(o = bc(i, a)) && (r.precision = o), Ko(r, a);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(o = Mc(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = o - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(o = _c(i)) && (r.precision = o - (r.type === "%") * 2);
      break;
    }
  }
  return Oo(r);
}
function Lc(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return Ua(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return Uc(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, o = r.length - 1, a = r[i], l = r[o], u, s, h = 10;
    for (l < a && (s = a, a = l, l = s, s = i, i = o, o = s); h-- > 0; ) {
      if (s = Yr(a, l, n), s === u)
        return r[i] = a, r[o] = l, e(r);
      if (s > 0)
        a = Math.floor(a / s) * s, l = Math.ceil(l / s) * s;
      else if (s < 0)
        a = Math.ceil(a * s) / s, l = Math.floor(l * s) / s;
      else
        break;
      u = s;
    }
    return t;
  }, t;
}
function In() {
  var t = Nc();
  return t.copy = function() {
    return Ac(t, In());
  }, xc.apply(t, arguments), Lc(t);
}
const Dr = /* @__PURE__ */ new Date(), Sr = /* @__PURE__ */ new Date();
function We(t, e, n, r) {
  function i(o) {
    return t(o = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+o)), o;
  }
  return i.floor = (o) => (t(o = /* @__PURE__ */ new Date(+o)), o), i.ceil = (o) => (t(o = new Date(o - 1)), e(o, 1), t(o), o), i.round = (o) => {
    const a = i(o), l = i.ceil(o);
    return o - a < l - o ? a : l;
  }, i.offset = (o, a) => (e(o = /* @__PURE__ */ new Date(+o), a == null ? 1 : Math.floor(a)), o), i.range = (o, a, l) => {
    const u = [];
    if (o = i.ceil(o), l = l == null ? 1 : Math.floor(l), !(o < a) || !(l > 0)) return u;
    let s;
    do
      u.push(s = /* @__PURE__ */ new Date(+o)), e(o, l), t(o);
    while (s < o && o < a);
    return u;
  }, i.filter = (o) => We((a) => {
    if (a >= a) for (; t(a), !o(a); ) a.setTime(a - 1);
  }, (a, l) => {
    if (a >= a)
      if (l < 0) for (; ++l <= 0; )
        for (; e(a, -1), !o(a); )
          ;
      else for (; --l >= 0; )
        for (; e(a, 1), !o(a); )
          ;
  }), n && (i.count = (o, a) => (Dr.setTime(+o), Sr.setTime(+a), t(Dr), t(Sr), Math.floor(n(Dr, Sr))), i.every = (o) => (o = Math.floor(o), !isFinite(o) || !(o > 0) ? null : o > 1 ? i.filter(r ? (a) => r(a) % o === 0 : (a) => i.count(0, a) % o === 0) : i)), i;
}
const Ec = 1e3, ii = Ec * 60, Rc = ii * 60, Wn = Rc * 24, Zo = Wn * 7, Te = We(
  (t) => t.setHours(0, 0, 0, 0),
  (t, e) => t.setDate(t.getDate() + e),
  (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * ii) / Wn,
  (t) => t.getDate() - 1
);
Te.range;
const oi = We((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / Wn, (t) => t.getUTCDate() - 1);
oi.range;
const Yc = We((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / Wn, (t) => Math.floor(t / Wn));
Yc.range;
function on(t) {
  return We((e) => {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setDate(e.getDate() + n * 7);
  }, (e, n) => (n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * ii) / Zo);
}
const Qo = on(0), hr = on(1), zc = on(2), Hc = on(3), wn = on(4), Pc = on(5), Ic = on(6);
Qo.range;
hr.range;
zc.range;
Hc.range;
wn.range;
Pc.range;
Ic.range;
function an(t) {
  return We((e) => {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setUTCDate(e.getUTCDate() + n * 7);
  }, (e, n) => (n - e) / Zo);
}
const Jo = an(0), gr = an(1), Wc = an(2), qc = an(3), vn = an(4), Vc = an(5), Bc = an(6);
Jo.range;
gr.range;
Wc.range;
qc.range;
vn.range;
Vc.range;
Bc.range;
const $e = We((t) => {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, e) => {
  t.setFullYear(t.getFullYear() + e);
}, (t, e) => e.getFullYear() - t.getFullYear(), (t) => t.getFullYear());
$e.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : We((e) => {
  e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, n) => {
  e.setFullYear(e.getFullYear() + n * t);
});
$e.range;
const tn = We((t) => {
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCFullYear(t.getUTCFullYear() + e);
}, (t, e) => e.getUTCFullYear() - t.getUTCFullYear(), (t) => t.getUTCFullYear());
tn.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : We((e) => {
  e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, n) => {
  e.setUTCFullYear(e.getUTCFullYear() + n * t);
});
tn.range;
function Ar(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e;
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function Fr(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e;
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function Tn(t, e, n) {
  return { y: t, m: e, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function Gc(t) {
  var e = t.dateTime, n = t.date, r = t.time, i = t.periods, o = t.days, a = t.shortDays, l = t.months, u = t.shortMonths, s = Cn(i), h = Dn(i), f = Cn(o), g = Dn(o), d = Cn(a), y = Dn(a), p = Cn(l), w = Dn(l), C = Cn(u), E = Dn(u), M = {
    a: bt,
    A: wt,
    b: ct,
    B: yt,
    c: null,
    d: Hi,
    e: Hi,
    f: df,
    g: Tf,
    G: Df,
    H: hf,
    I: gf,
    j: mf,
    L: jo,
    m: pf,
    M: yf,
    p: Tt,
    q: j,
    Q: Wi,
    s: qi,
    S: wf,
    u: vf,
    U: _f,
    V: bf,
    w: Mf,
    W: xf,
    x: null,
    X: null,
    y: kf,
    Y: Cf,
    Z: Sf,
    "%": Ii
  }, W = {
    a: N,
    A: x,
    b: $,
    B: ft,
    c: null,
    d: Pi,
    e: Pi,
    f: Uf,
    g: qf,
    G: Bf,
    H: Af,
    I: Ff,
    j: Nf,
    L: ta,
    m: Lf,
    M: Ef,
    p: xt,
    q: mt,
    Q: Wi,
    s: qi,
    S: Rf,
    u: Yf,
    U: zf,
    V: Hf,
    w: Pf,
    W: If,
    x: null,
    X: null,
    y: Wf,
    Y: Vf,
    Z: Gf,
    "%": Ii
  }, L = {
    a: gt,
    A: B,
    b: O,
    B: b,
    c: _,
    d: Yi,
    e: Yi,
    f: sf,
    g: Ri,
    G: Ei,
    H: zi,
    I: zi,
    j: rf,
    L: lf,
    m: nf,
    M: of,
    p: K,
    q: ef,
    Q: cf,
    s: ff,
    S: af,
    u: Qc,
    U: Jc,
    V: jc,
    w: Zc,
    W: $c,
    x: H,
    X: D,
    y: Ri,
    Y: Ei,
    Z: tf,
    "%": uf
  };
  M.x = S(n, M), M.X = S(r, M), M.c = S(e, M), W.x = S(n, W), W.X = S(r, W), W.c = S(e, W);
  function S(U, q) {
    return function(rt) {
      var k = [], Mt = -1, v = 0, dt = U.length, lt, kt, pt;
      for (rt instanceof Date || (rt = /* @__PURE__ */ new Date(+rt)); ++Mt < dt; )
        U.charCodeAt(Mt) === 37 && (k.push(U.slice(v, Mt)), (kt = Li[lt = U.charAt(++Mt)]) != null ? lt = U.charAt(++Mt) : kt = lt === "e" ? " " : "0", (pt = q[lt]) && (lt = pt(rt, kt)), k.push(lt), v = Mt + 1);
      return k.push(U.slice(v, Mt)), k.join("");
    };
  }
  function Y(U, q) {
    return function(rt) {
      var k = Tn(1900, void 0, 1), Mt = z(k, U, rt += "", 0), v, dt;
      if (Mt != rt.length) return null;
      if ("Q" in k) return new Date(k.Q);
      if ("s" in k) return new Date(k.s * 1e3 + ("L" in k ? k.L : 0));
      if (q && !("Z" in k) && (k.Z = 0), "p" in k && (k.H = k.H % 12 + k.p * 12), k.m === void 0 && (k.m = "q" in k ? k.q : 0), "V" in k) {
        if (k.V < 1 || k.V > 53) return null;
        "w" in k || (k.w = 1), "Z" in k ? (v = Fr(Tn(k.y, 0, 1)), dt = v.getUTCDay(), v = dt > 4 || dt === 0 ? gr.ceil(v) : gr(v), v = oi.offset(v, (k.V - 1) * 7), k.y = v.getUTCFullYear(), k.m = v.getUTCMonth(), k.d = v.getUTCDate() + (k.w + 6) % 7) : (v = Ar(Tn(k.y, 0, 1)), dt = v.getDay(), v = dt > 4 || dt === 0 ? hr.ceil(v) : hr(v), v = Te.offset(v, (k.V - 1) * 7), k.y = v.getFullYear(), k.m = v.getMonth(), k.d = v.getDate() + (k.w + 6) % 7);
      } else ("W" in k || "U" in k) && ("w" in k || (k.w = "u" in k ? k.u % 7 : "W" in k ? 1 : 0), dt = "Z" in k ? Fr(Tn(k.y, 0, 1)).getUTCDay() : Ar(Tn(k.y, 0, 1)).getDay(), k.m = 0, k.d = "W" in k ? (k.w + 6) % 7 + k.W * 7 - (dt + 5) % 7 : k.w + k.U * 7 - (dt + 6) % 7);
      return "Z" in k ? (k.H += k.Z / 100 | 0, k.M += k.Z % 100, Fr(k)) : Ar(k);
    };
  }
  function z(U, q, rt, k) {
    for (var Mt = 0, v = q.length, dt = rt.length, lt, kt; Mt < v; ) {
      if (k >= dt) return -1;
      if (lt = q.charCodeAt(Mt++), lt === 37) {
        if (lt = q.charAt(Mt++), kt = L[lt in Li ? q.charAt(Mt++) : lt], !kt || (k = kt(U, rt, k)) < 0) return -1;
      } else if (lt != rt.charCodeAt(k++))
        return -1;
    }
    return k;
  }
  function K(U, q, rt) {
    var k = s.exec(q.slice(rt));
    return k ? (U.p = h.get(k[0].toLowerCase()), rt + k[0].length) : -1;
  }
  function gt(U, q, rt) {
    var k = d.exec(q.slice(rt));
    return k ? (U.w = y.get(k[0].toLowerCase()), rt + k[0].length) : -1;
  }
  function B(U, q, rt) {
    var k = f.exec(q.slice(rt));
    return k ? (U.w = g.get(k[0].toLowerCase()), rt + k[0].length) : -1;
  }
  function O(U, q, rt) {
    var k = C.exec(q.slice(rt));
    return k ? (U.m = E.get(k[0].toLowerCase()), rt + k[0].length) : -1;
  }
  function b(U, q, rt) {
    var k = p.exec(q.slice(rt));
    return k ? (U.m = w.get(k[0].toLowerCase()), rt + k[0].length) : -1;
  }
  function _(U, q, rt) {
    return z(U, e, q, rt);
  }
  function H(U, q, rt) {
    return z(U, n, q, rt);
  }
  function D(U, q, rt) {
    return z(U, r, q, rt);
  }
  function bt(U) {
    return a[U.getDay()];
  }
  function wt(U) {
    return o[U.getDay()];
  }
  function ct(U) {
    return u[U.getMonth()];
  }
  function yt(U) {
    return l[U.getMonth()];
  }
  function Tt(U) {
    return i[+(U.getHours() >= 12)];
  }
  function j(U) {
    return 1 + ~~(U.getMonth() / 3);
  }
  function N(U) {
    return a[U.getUTCDay()];
  }
  function x(U) {
    return o[U.getUTCDay()];
  }
  function $(U) {
    return u[U.getUTCMonth()];
  }
  function ft(U) {
    return l[U.getUTCMonth()];
  }
  function xt(U) {
    return i[+(U.getUTCHours() >= 12)];
  }
  function mt(U) {
    return 1 + ~~(U.getUTCMonth() / 3);
  }
  return {
    format: function(U) {
      var q = S(U += "", M);
      return q.toString = function() {
        return U;
      }, q;
    },
    parse: function(U) {
      var q = Y(U += "", !1);
      return q.toString = function() {
        return U;
      }, q;
    },
    utcFormat: function(U) {
      var q = S(U += "", W);
      return q.toString = function() {
        return U;
      }, q;
    },
    utcParse: function(U) {
      var q = Y(U += "", !0);
      return q.toString = function() {
        return U;
      }, q;
    }
  };
}
var Li = { "-": "", _: " ", 0: "0" }, se = /^\s*\d+/, Xc = /^%/, Oc = /[\\^$*+?|[\]().{}]/g;
function It(t, e, n) {
  var r = t < 0 ? "-" : "", i = (r ? -t : t) + "", o = i.length;
  return r + (o < n ? new Array(n - o + 1).join(e) + i : i);
}
function Kc(t) {
  return t.replace(Oc, "\\$&");
}
function Cn(t) {
  return new RegExp("^(?:" + t.map(Kc).join("|") + ")", "i");
}
function Dn(t) {
  return new Map(t.map((e, n) => [e.toLowerCase(), n]));
}
function Zc(t, e, n) {
  var r = se.exec(e.slice(n, n + 1));
  return r ? (t.w = +r[0], n + r[0].length) : -1;
}
function Qc(t, e, n) {
  var r = se.exec(e.slice(n, n + 1));
  return r ? (t.u = +r[0], n + r[0].length) : -1;
}
function Jc(t, e, n) {
  var r = se.exec(e.slice(n, n + 2));
  return r ? (t.U = +r[0], n + r[0].length) : -1;
}
function jc(t, e, n) {
  var r = se.exec(e.slice(n, n + 2));
  return r ? (t.V = +r[0], n + r[0].length) : -1;
}
function $c(t, e, n) {
  var r = se.exec(e.slice(n, n + 2));
  return r ? (t.W = +r[0], n + r[0].length) : -1;
}
function Ei(t, e, n) {
  var r = se.exec(e.slice(n, n + 4));
  return r ? (t.y = +r[0], n + r[0].length) : -1;
}
function Ri(t, e, n) {
  var r = se.exec(e.slice(n, n + 2));
  return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function tf(t, e, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
  return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function ef(t, e, n) {
  var r = se.exec(e.slice(n, n + 1));
  return r ? (t.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function nf(t, e, n) {
  var r = se.exec(e.slice(n, n + 2));
  return r ? (t.m = r[0] - 1, n + r[0].length) : -1;
}
function Yi(t, e, n) {
  var r = se.exec(e.slice(n, n + 2));
  return r ? (t.d = +r[0], n + r[0].length) : -1;
}
function rf(t, e, n) {
  var r = se.exec(e.slice(n, n + 3));
  return r ? (t.m = 0, t.d = +r[0], n + r[0].length) : -1;
}
function zi(t, e, n) {
  var r = se.exec(e.slice(n, n + 2));
  return r ? (t.H = +r[0], n + r[0].length) : -1;
}
function of(t, e, n) {
  var r = se.exec(e.slice(n, n + 2));
  return r ? (t.M = +r[0], n + r[0].length) : -1;
}
function af(t, e, n) {
  var r = se.exec(e.slice(n, n + 2));
  return r ? (t.S = +r[0], n + r[0].length) : -1;
}
function lf(t, e, n) {
  var r = se.exec(e.slice(n, n + 3));
  return r ? (t.L = +r[0], n + r[0].length) : -1;
}
function sf(t, e, n) {
  var r = se.exec(e.slice(n, n + 6));
  return r ? (t.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function uf(t, e, n) {
  var r = Xc.exec(e.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function cf(t, e, n) {
  var r = se.exec(e.slice(n));
  return r ? (t.Q = +r[0], n + r[0].length) : -1;
}
function ff(t, e, n) {
  var r = se.exec(e.slice(n));
  return r ? (t.s = +r[0], n + r[0].length) : -1;
}
function Hi(t, e) {
  return It(t.getDate(), e, 2);
}
function hf(t, e) {
  return It(t.getHours(), e, 2);
}
function gf(t, e) {
  return It(t.getHours() % 12 || 12, e, 2);
}
function mf(t, e) {
  return It(1 + Te.count($e(t), t), e, 3);
}
function jo(t, e) {
  return It(t.getMilliseconds(), e, 3);
}
function df(t, e) {
  return jo(t, e) + "000";
}
function pf(t, e) {
  return It(t.getMonth() + 1, e, 2);
}
function yf(t, e) {
  return It(t.getMinutes(), e, 2);
}
function wf(t, e) {
  return It(t.getSeconds(), e, 2);
}
function vf(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function _f(t, e) {
  return It(Qo.count($e(t) - 1, t), e, 2);
}
function $o(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? wn(t) : wn.ceil(t);
}
function bf(t, e) {
  return t = $o(t), It(wn.count($e(t), t) + ($e(t).getDay() === 4), e, 2);
}
function Mf(t) {
  return t.getDay();
}
function xf(t, e) {
  return It(hr.count($e(t) - 1, t), e, 2);
}
function kf(t, e) {
  return It(t.getFullYear() % 100, e, 2);
}
function Tf(t, e) {
  return t = $o(t), It(t.getFullYear() % 100, e, 2);
}
function Cf(t, e) {
  return It(t.getFullYear() % 1e4, e, 4);
}
function Df(t, e) {
  var n = t.getDay();
  return t = n >= 4 || n === 0 ? wn(t) : wn.ceil(t), It(t.getFullYear() % 1e4, e, 4);
}
function Sf(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + It(e / 60 | 0, "0", 2) + It(e % 60, "0", 2);
}
function Pi(t, e) {
  return It(t.getUTCDate(), e, 2);
}
function Af(t, e) {
  return It(t.getUTCHours(), e, 2);
}
function Ff(t, e) {
  return It(t.getUTCHours() % 12 || 12, e, 2);
}
function Nf(t, e) {
  return It(1 + oi.count(tn(t), t), e, 3);
}
function ta(t, e) {
  return It(t.getUTCMilliseconds(), e, 3);
}
function Uf(t, e) {
  return ta(t, e) + "000";
}
function Lf(t, e) {
  return It(t.getUTCMonth() + 1, e, 2);
}
function Ef(t, e) {
  return It(t.getUTCMinutes(), e, 2);
}
function Rf(t, e) {
  return It(t.getUTCSeconds(), e, 2);
}
function Yf(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function zf(t, e) {
  return It(Jo.count(tn(t) - 1, t), e, 2);
}
function ea(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? vn(t) : vn.ceil(t);
}
function Hf(t, e) {
  return t = ea(t), It(vn.count(tn(t), t) + (tn(t).getUTCDay() === 4), e, 2);
}
function Pf(t) {
  return t.getUTCDay();
}
function If(t, e) {
  return It(gr.count(tn(t) - 1, t), e, 2);
}
function Wf(t, e) {
  return It(t.getUTCFullYear() % 100, e, 2);
}
function qf(t, e) {
  return t = ea(t), It(t.getUTCFullYear() % 100, e, 2);
}
function Vf(t, e) {
  return It(t.getUTCFullYear() % 1e4, e, 4);
}
function Bf(t, e) {
  var n = t.getUTCDay();
  return t = n >= 4 || n === 0 ? vn(t) : vn.ceil(t), It(t.getUTCFullYear() % 1e4, e, 4);
}
function Gf() {
  return "+0000";
}
function Ii() {
  return "%";
}
function Wi(t) {
  return +t;
}
function qi(t) {
  return Math.floor(+t / 1e3);
}
var cn, He, ai;
Xf({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function Xf(t) {
  return cn = Gc(t), He = cn.format, cn.parse, ai = cn.utcFormat, cn.utcParse, cn;
}
function le(t) {
  return function() {
    return t;
  };
}
function na(t) {
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
  }, () => new fc(e);
}
function ra(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ia(t) {
  this._context = t;
}
ia.prototype = {
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
function oa(t) {
  return new ia(t);
}
function aa(t) {
  return t[0];
}
function la(t) {
  return t[1];
}
function Rn(t, e) {
  var n = le(!0), r = null, i = oa, o = null, a = na(l);
  t = typeof t == "function" ? t : t === void 0 ? aa : le(t), e = typeof e == "function" ? e : e === void 0 ? la : le(e);
  function l(u) {
    var s, h = (u = ra(u)).length, f, g = !1, d;
    for (r == null && (o = i(d = a())), s = 0; s <= h; ++s)
      !(s < h && n(f = u[s], s, u)) === g && ((g = !g) ? o.lineStart() : o.lineEnd()), g && o.point(+t(f, s, u), +e(f, s, u));
    if (d) return o = null, d + "" || null;
  }
  return l.x = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : le(+u), l) : t;
  }, l.y = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : le(+u), l) : e;
  }, l.defined = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : le(!!u), l) : n;
  }, l.curve = function(u) {
    return arguments.length ? (i = u, r != null && (o = i(r)), l) : i;
  }, l.context = function(u) {
    return arguments.length ? (u == null ? r = o = null : o = i(r = u), l) : r;
  }, l;
}
function Ae(t, e, n) {
  var r = null, i = le(!0), o = null, a = oa, l = null, u = na(s);
  t = typeof t == "function" ? t : t === void 0 ? aa : le(+t), e = typeof e == "function" ? e : le(e === void 0 ? 0 : +e), n = typeof n == "function" ? n : n === void 0 ? la : le(+n);
  function s(f) {
    var g, d, y, p = (f = ra(f)).length, w, C = !1, E, M = new Array(p), W = new Array(p);
    for (o == null && (l = a(E = u())), g = 0; g <= p; ++g) {
      if (!(g < p && i(w = f[g], g, f)) === C)
        if (C = !C)
          d = g, l.areaStart(), l.lineStart();
        else {
          for (l.lineEnd(), l.lineStart(), y = g - 1; y >= d; --y)
            l.point(M[y], W[y]);
          l.lineEnd(), l.areaEnd();
        }
      C && (M[g] = +t(w, g, f), W[g] = +e(w, g, f), l.point(r ? +r(w, g, f) : M[g], n ? +n(w, g, f) : W[g]));
    }
    if (E) return l = null, E + "" || null;
  }
  function h() {
    return Rn().defined(i).curve(a).context(o);
  }
  return s.x = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : le(+f), r = null, s) : t;
  }, s.x0 = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : le(+f), s) : t;
  }, s.x1 = function(f) {
    return arguments.length ? (r = f == null ? null : typeof f == "function" ? f : le(+f), s) : r;
  }, s.y = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : le(+f), n = null, s) : e;
  }, s.y0 = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : le(+f), s) : e;
  }, s.y1 = function(f) {
    return arguments.length ? (n = f == null ? null : typeof f == "function" ? f : le(+f), s) : n;
  }, s.lineX0 = s.lineY0 = function() {
    return h().x(t).y(e);
  }, s.lineY1 = function() {
    return h().x(t).y(n);
  }, s.lineX1 = function() {
    return h().x(r).y(e);
  }, s.defined = function(f) {
    return arguments.length ? (i = typeof f == "function" ? f : le(!!f), s) : i;
  }, s.curve = function(f) {
    return arguments.length ? (a = f, o != null && (l = a(o)), s) : a;
  }, s.context = function(f) {
    return arguments.length ? (f == null ? o = l = null : l = a(o = f), s) : o;
  }, s;
}
function Vi(t) {
  return t < 0 ? -1 : 1;
}
function Bi(t, e, n) {
  var r = t._x1 - t._x0, i = e - t._x1, o = (t._y1 - t._y0) / (r || i < 0 && -0), a = (n - t._y1) / (i || r < 0 && -0), l = (o * i + a * r) / (r + i);
  return (Vi(o) + Vi(a)) * Math.min(Math.abs(o), Math.abs(a), 0.5 * Math.abs(l)) || 0;
}
function Gi(t, e) {
  var n = t._x1 - t._x0;
  return n ? (3 * (t._y1 - t._y0) / n - e) / 2 : e;
}
function Nr(t, e, n) {
  var r = t._x0, i = t._y0, o = t._x1, a = t._y1, l = (o - r) / 3;
  t._context.bezierCurveTo(r + l, i + l * e, o - l, a - l * n, o, a);
}
function mr(t) {
  this._context = t;
}
mr.prototype = {
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
        Nr(this, this._t0, Gi(this, this._t0));
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
          this._point = 3, Nr(this, Gi(this, n = Bi(this, t, e)), n);
          break;
        default:
          Nr(this, this._t0, n = Bi(this, t, e));
          break;
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = n;
    }
  }
};
Object.create(mr.prototype).point = function(t, e) {
  mr.prototype.point.call(this, e, t);
};
function Ur(t) {
  return new mr(t);
}
function Un(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
Un.prototype = {
  constructor: Un,
  scale: function(t) {
    return t === 1 ? this : new Un(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Un(this.k, this.x + this.k * t, this.y + this.k * e);
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
Un.prototype;
const Of = {
  label: "General",
  thresholds: {
    mg: {
      veryLow: 54,
      low: 70,
      high: 180,
      veryHigh: 250
    },
    mmol: {
      veryLow: 3,
      low: 3.9,
      high: 10,
      veryHigh: 13.9
    }
  },
  percentGoals: {
    inRange: "≥70%",
    high: "≤25%",
    veryHigh: "≤5%",
    low: "≤4%",
    veryLow: "≤1%"
  },
  metricsGoals: {
    averageGlucose: {
      mg: "<154 mg/dL",
      mmol: "<8.6 mmol/L"
    },
    gmi: "<7%",
    cv: "≤36%"
  }
}, Kf = {
  label: "Tight",
  thresholds: {
    mg: {
      veryLow: 54,
      low: 70,
      high: 140,
      veryHigh: 250
    },
    mmol: {
      veryLow: 3,
      low: 3.9,
      high: 7.8,
      veryHigh: 13.9
    }
  },
  percentGoals: {
    inRange: "≥50%",
    high: "≤45%",
    veryHigh: "≤5%",
    low: "≤4%",
    veryLow: "≤1%"
  },
  metricsGoals: {
    averageGlucose: {
      mg: "<140 mg/dL",
      mmol: "<7.8 mmol/L"
    },
    gmi: "6.5–7%",
    cv: "≤36%"
  }
}, Zf = {
  label: "Pregnancy",
  thresholds: {
    mg: {
      veryLow: 54,
      low: 63,
      high: 140,
      veryHigh: 250
    },
    mmol: {
      veryLow: 3,
      low: 3.5,
      high: 7.8,
      veryHigh: 13.9
    }
  },
  percentGoals: {
    inRange: "≥70%",
    high: "≤25%",
    veryHigh: "-",
    low: "≤4%",
    veryLow: "≤1%"
  },
  metricsGoals: {
    averageGlucose: {
      mg: "<121 mg/dL",
      mmol: "<6.7 mmol/L"
    },
    gmi: "6.0–6.2%",
    cv: "≤36%"
  }
}, Pe = {
  general: Of,
  tight: Kf,
  pregnancy: Zf
};
function Qf(t) {
  let e, n, r, i, o, a, l, u = (
    /*showCanvas*/
    t[0] ? "-" : "="
  ), s, h, f, g, d, y, p, w, C, E, M, W, L, S, Y, z, K, gt, B, O, b, _, H, D, bt, wt, ct, yt, Tt, j, N, x;
  return {
    c() {
      e = tt("div"), n = tt("canvas"), i = vt(), o = tt("div"), a = tt("div"), l = tt("button"), s = J(u), h = vt(), f = tt("div"), g = J(
        /*periodLabel*/
        t[5]
      ), d = vt(), y = tt("div"), p = tt("div"), w = tt("button"), C = J("1d"), M = vt(), W = tt("button"), L = J("3d"), Y = vt(), z = tt("button"), K = J("1w"), B = vt(), O = tt("button"), b = J("2w"), H = vt(), D = tt("button"), bt = J("1m"), ct = vt(), yt = tt("button"), Tt = J("3m"), c(n, "style", r = `width:100%; display:${/*showCanvas*/
      t[0] ? "block" : "none"}; border:0; padding-bottom: 10px;`), c(l, "type", "button"), c(l, "class", "qbtn svelte-qd9z27"), c(l, "title", "Hide/show calendar canvas"), X(a, "display", "flex"), X(a, "gap", "8px"), X(a, "align-items", "center"), X(a, "justify-content", "flex-end"), X(a, "flex", "0 0 auto"), X(f, "text-align", "left"), X(f, "color", "#000"), X(f, "font-size", "12px"), X(f, "font-weight", "600"), X(f, "min-width", "160px"), X(f, "flex", "1 1 auto"), c(w, "type", "button"), c(w, "class", E = te(`qbtn ${/*activeSpan*/
      t[4] === 1 ? "active" : ""}`) + " svelte-qd9z27"), c(W, "type", "button"), c(W, "class", S = te(`qbtn ${/*activeSpan*/
      t[4] === 3 ? "active" : ""}`) + " svelte-qd9z27"), c(z, "type", "button"), c(z, "class", gt = te(`qbtn ${/*activeSpan*/
      t[4] === 7 ? "active" : ""}`) + " svelte-qd9z27"), c(O, "type", "button"), c(O, "class", _ = te(`qbtn ${/*activeSpan*/
      t[4] === 14 ? "active" : ""}`) + " svelte-qd9z27"), c(D, "type", "button"), c(D, "class", wt = te(`qbtn ${/*activeSpan*/
      t[4] === 30 ? "active" : ""}`) + " svelte-qd9z27"), c(yt, "type", "button"), c(yt, "class", j = te(`qbtn ${/*activeSpan*/
      t[4] === 90 ? "active" : ""}`) + " svelte-qd9z27"), X(p, "display", "flex"), X(p, "gap", "16px"), X(p, "flex-wrap", "wrap"), X(p, "justify-content", "flex-end"), X(y, "display", "flex"), X(y, "align-items", "center"), X(y, "gap", "20px"), X(y, "justify-content", "flex-end"), X(y, "margin-left", "auto"), c(o, "id", "controlBar"), X(o, "display", "none"), X(o, "align-items", "center"), X(o, "gap", "12px"), X(o, "flex-wrap", "wrap"), X(o, "margin", "0 0 6px"), c(e, "class", "cgm-widget"), X(e, "contain", "layout");
    },
    m($, ft) {
      Nt($, e, ft), m(e, n), t[19](n), m(e, i), m(e, o), m(o, a), m(a, l), m(l, s), m(o, h), m(o, f), m(f, g), t[21](f), m(o, d), m(o, y), m(y, p), m(p, w), m(w, C), m(p, M), m(p, W), m(W, L), m(p, Y), m(p, z), m(z, K), m(p, B), m(p, O), m(O, b), m(p, H), m(p, D), m(D, bt), m(p, ct), m(p, yt), m(yt, Tt), t[28](e), N || (x = [
        oe(
          l,
          "click",
          /*click_handler*/
          t[20]
        ),
        oe(
          w,
          "click",
          /*click_handler_1*/
          t[22]
        ),
        oe(
          W,
          "click",
          /*click_handler_2*/
          t[23]
        ),
        oe(
          z,
          "click",
          /*click_handler_3*/
          t[24]
        ),
        oe(
          O,
          "click",
          /*click_handler_4*/
          t[25]
        ),
        oe(
          D,
          "click",
          /*click_handler_5*/
          t[26]
        ),
        oe(
          yt,
          "click",
          /*click_handler_6*/
          t[27]
        )
      ], N = !0);
    },
    p($, ft) {
      ft[0] & /*showCanvas*/
      1 && r !== (r = `width:100%; display:${/*showCanvas*/
      $[0] ? "block" : "none"}; border:0; padding-bottom: 10px;`) && c(n, "style", r), ft[0] & /*showCanvas*/
      1 && u !== (u = /*showCanvas*/
      $[0] ? "-" : "=") && qt(s, u), ft[0] & /*periodLabel*/
      32 && qt(
        g,
        /*periodLabel*/
        $[5]
      ), ft[0] & /*activeSpan*/
      16 && E !== (E = te(`qbtn ${/*activeSpan*/
      $[4] === 1 ? "active" : ""}`) + " svelte-qd9z27") && c(w, "class", E), ft[0] & /*activeSpan*/
      16 && S !== (S = te(`qbtn ${/*activeSpan*/
      $[4] === 3 ? "active" : ""}`) + " svelte-qd9z27") && c(W, "class", S), ft[0] & /*activeSpan*/
      16 && gt !== (gt = te(`qbtn ${/*activeSpan*/
      $[4] === 7 ? "active" : ""}`) + " svelte-qd9z27") && c(z, "class", gt), ft[0] & /*activeSpan*/
      16 && _ !== (_ = te(`qbtn ${/*activeSpan*/
      $[4] === 14 ? "active" : ""}`) + " svelte-qd9z27") && c(O, "class", _), ft[0] & /*activeSpan*/
      16 && wt !== (wt = te(`qbtn ${/*activeSpan*/
      $[4] === 30 ? "active" : ""}`) + " svelte-qd9z27") && c(D, "class", wt), ft[0] & /*activeSpan*/
      16 && j !== (j = te(`qbtn ${/*activeSpan*/
      $[4] === 90 ? "active" : ""}`) + " svelte-qd9z27") && c(yt, "class", j);
    },
    i: ae,
    o: ae,
    d($) {
      $ && At(e), t[19](null), t[21](null), t[28](null), N = !1, Ge(x);
    }
  };
}
const Se = 54;
function Jf(t, e, n) {
  let { data: r } = e, { initialRange: i = null } = e, { externalRange: o = null } = e, { preset: a = "general" } = e, { showMonthLabels: l = !0 } = e, { showData: u = !0 } = e, { showCanvas: s = !0 } = e, { selectionStroke: h = "#111" } = e, { selectionFill: f = "transparent" } = e;
  const g = dr();
  let d, y, p;
  const w = { l: 48, r: 12, t: 8, b: 8 }, C = [1, 7, 14, 21, 30, 90];
  let E = {
    bg: "#fff",
    grid: "#f0f0f0",
    text: "#111",
    muted: "#555",
    selFill: "transparent",
    selStroke: "#111",
    vlow: "#e57373",
    low: "#ff9e80",
    inrange: "#86c89d",
    high: "#ffcc80",
    vhigh: "#ff8a65"
  };
  function M(A, V) {
    try {
      return (getComputedStyle(p).getPropertyValue(A) || "").trim() || V;
    } catch {
      return V;
    }
  }
  function W() {
    E = {
      bg: M("--cgm-bg", E.bg),
      grid: M("--cgm-grid", E.grid),
      text: M("--cgm-text", E.text),
      muted: M("--cgm-muted", E.muted),
      selFill: M("--cgm-selection-fill", E.selFill),
      selStroke: M("--cgm-selection-stroke", E.selStroke),
      vlow: M("--cgm-very-low", E.vlow),
      low: M("--cgm-low", E.low),
      inrange: M("--cgm-in-range", E.inrange),
      high: M("--cgm-high", E.high),
      vhigh: M("--cgm-very-high", E.vhigh)
    };
  }
  let L, S, Y = 24 * 60 * 60 * 1e3;
  const z = () => new Date(r.t0).getTime(), K = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), gt = () => K() ? "mmol" : "mg";
  function B() {
    return Pe[a].thresholds[gt()];
  }
  let O = 0, b = 0, _ = 0, H = 0;
  function D(A) {
    let V = C[0], it = 1 / 0;
    for (const Z of C) {
      const Q = Math.abs(Z - A);
      Q < it && (it = Q, V = Z);
    }
    return V;
  }
  function bt() {
    return Math.max(1, Math.floor((H - _) / Y) + 1);
  }
  let wt = 14;
  const ct = (A) => {
    const V = new Date(A);
    return Date.UTC(V.getUTCFullYear(), V.getUTCMonth(), V.getUTCDate());
  };
  let yt;
  function Tt() {
    yt = /* @__PURE__ */ new Map();
    for (let A = 0; A < S.length; A++) {
      const V = S[A];
      if (!(Number.isFinite(V) && V >= 0)) continue;
      const it = ct(L[A]);
      let Z = yt.get(it);
      Z || (Z = { valid: 0, vl: 0, l: 0, t: 0, h: 0, vh: 0 }, yt.set(it, Z)), Z.valid++;
      const Q = B();
      V < Q.veryLow ? Z.vl++ : V < Q.low ? Z.l++ : V <= Q.high ? Z.t++ : V <= Q.veryHigh ? Z.h++ : Z.vh++;
    }
  }
  function j() {
    n(15, L = Float64Array.from({ length: r.glucose.length }, (A, V) => z() + V * r.stepMs)), n(16, S = Float64Array.from(r.glucose)), O = ct(L[0]), b = ct(L[L.length - 1]), n(17, _ = (i == null ? void 0 : i.start) ?? O), n(18, H = (i == null ? void 0 : i.end) ?? b), Tt();
  }
  let N;
  function x() {
    if (!d || !(yt != null && yt.size)) return;
    const A = Math.max(1, window.devicePixelRatio || 1), V = Math.max(320, d.getBoundingClientRect().width || 900), it = new Date(O).getUTCFullYear(), Z = new Date(b).getUTCFullYear(), Q = zr(it, Z + 1), zt = l ? 24 : w.b, Et = w.t + Q.length * Se + zt;
    n(1, d.style.width = V + "px", d), n(1, d.style.height = Et + "px", d), n(1, d.width = Math.floor(V * A), d), n(1, d.height = Math.floor(Et * A), d), N.setTransform(A, 0, 0, A, 0, 0), N.clearRect(0, 0, V, Et), N.fillStyle = E.bg, N.fillRect(0, 0, V, Et);
    const Vt = V - w.l - w.r;
    if (N.strokeStyle = E.grid, N.lineWidth = 1, Q.forEach((Ht, ee) => {
      const Kt = w.t + ee * Se;
      for (let Dt = 1; Dt < 12; Dt++) {
        const ot = Date.UTC(Ht, Dt, 1);
        if (ot < O || ot > b) continue;
        const T = (Date.UTC(Ht + 1, 0, 1) - Date.UTC(Ht, 0, 1)) / Y, R = w.l + Math.round((ot - Date.UTC(Ht, 0, 1)) / Y * (Vt / T));
        N.beginPath(), N.moveTo(R, Kt + 6), N.lineTo(R, Kt + Se - 6), N.stroke();
      }
    }), Q.forEach((Ht, ee) => {
      const Kt = w.t + ee * Se;
      N.fillStyle = "#444", N.font = "12px system-ui, sans-serif", N.textAlign = "right", N.textBaseline = "middle", N.fillText(String(Ht), w.l - 8, Kt + Se / 2);
      const Dt = Date.UTC(Ht, 0, 1), ot = Date.UTC(Ht + 1, 0, 1) - Y, T = Math.round((Date.UTC(Ht + 1, 0, 1) - Date.UTC(Ht, 0, 1)) / Y), R = (P) => w.l + Math.floor((P - Date.UTC(Ht, 0, 1)) / Y * (Vt / T)), G = Se - 10, I = Kt + 5;
      if (!u) {
        N.fillStyle = M("--cgm-target-band-bg", "#efefef");
        for (let P = Math.max(Dt, O); P <= Math.min(ot, b); P += Y) {
          const nt = R(P), F = R(P + Y), _t = Math.max(1, F - nt);
          N.fillRect(nt, I, _t, G);
        }
        return;
      }
      for (let P = Math.max(Dt, O); P <= Math.min(ot, b); P += Y) {
        const nt = R(P), F = R(P + Y), _t = Math.max(1, F - nt), st = yt.get(P);
        if (!st || !st.valid) {
          N.fillStyle = M("--cgm-target-band-bg", "#efefef"), N.globalAlpha = 1, N.fillRect(nt, I, _t, G);
          continue;
        }
        const Ot = Math.max(1, Math.round(Y / r.stepMs)), Ut = {
          vl: st.vl / st.valid,
          l: st.l / st.valid,
          t: st.t / st.valid,
          h: st.h / st.valid,
          vh: st.vh / st.valid
        };
        let ht = I + G;
        const jt = (ne, Wt, Qt) => {
          const Pt = Math.round(Wt * G);
          Pt <= 0 || (ht -= Pt, N.fillStyle = ne, N.globalAlpha = Qt, N.fillRect(nt, ht, _t, Pt));
        }, Bt = st.valid / Ot >= 0.5 ? 0.8 : 0.4, Zt = st.valid / Ot >= 0.5 ? 0.9 : 0.6;
        jt(E.vlow, Ut.vl, Bt), jt(E.low, Ut.l, Bt), jt(E.inrange, Ut.t, Zt), jt(E.high, Ut.h, Bt), jt(E.vhigh, Ut.vh, Bt), N.globalAlpha = 1;
      }
    }), u) {
      const Ht = Math.max(O, Math.min(b, _)), ee = Math.max(O, Math.min(b, H));
      Q.forEach((Kt, Dt) => {
        const ot = w.t + Dt * Se, T = Date.UTC(Kt, 0, 1), R = Date.UTC(Kt + 1, 0, 1) - 1, G = Math.max(T, Ht), I = Math.min(R, ee);
        if (G > I) return;
        const P = (Date.UTC(Kt + 1, 0, 1) - Date.UTC(Kt, 0, 1)) / Y, nt = (ht) => w.l + Math.floor((ht - Date.UTC(Kt, 0, 1)) / Y * (Vt / P)), F = nt(G), _t = nt(I + 1), st = ot + 5, Ot = Se - 10;
        N.save(), f && f !== "none" && f !== "transparent" && (N.fillStyle = f, N.fillRect(F, st, Math.max(1, _t - F), Ot));
        const Ut = h && h !== "#111" ? h : E.selStroke;
        N.strokeStyle = Ut, N.lineWidth = 1.5, N.beginPath(), N.moveTo(F + 0.5, st + 0.5), N.lineTo(F + 0.5, st + Ot - 0.5), N.stroke(), N.beginPath(), N.moveTo(_t - 0.5, st + 0.5), N.lineTo(_t - 0.5, st + Ot - 0.5), N.stroke(), N.restore();
      });
    }
    if (l) {
      const Ht = ai("%b"), ee = Q[Q.length - 1], Kt = Date.UTC(ee, 0, 1), ot = (Date.UTC(ee + 1, 0, 1) - Kt) / Y, T = (I) => w.l + Math.round((I - Kt) / Y * (Vt / ot)), G = w.t + (Q.length - 1) * Se + Se - 5 + 0.5;
      N.save(), N.strokeStyle = "#bbb", N.lineWidth = 1, N.fillStyle = E.muted, N.font = "11px var(--cgm-font, system-ui, sans-serif)", N.textAlign = "center", N.textBaseline = "top";
      for (let I = 0; I < 12; I++) {
        const P = Date.UTC(ee, I, 1), nt = T(P);
        N.beginPath(), N.moveTo(nt, G), N.lineTo(nt, G + 4), N.stroke(), N.fillText(Ht(new Date(Date.UTC(2e3, I, 1))), nt, G + 6);
      }
      N.restore();
    }
  }
  function $(A, V) {
    const it = new Date(A), Z = new Date(V), Q = He("%b %e"), zt = He("%b %e, %Y"), Et = He("%e, %Y"), Vt = Date.UTC(it.getUTCFullYear(), it.getUTCMonth(), it.getUTCDate()), Ht = Date.UTC(Z.getUTCFullYear(), Z.getUTCMonth(), Z.getUTCDate());
    return Vt === Ht ? zt(Z) : it.getFullYear() === Z.getFullYear() ? it.getMonth() === Z.getMonth() ? `${Q(it)} – ${Et(Z)}` : `${Q(it)} – ${zt(Z)}` : `${zt(it)} – ${zt(Z)}`;
  }
  let ft = "";
  function xt() {
    if (!L || !S) return;
    const A = bt();
    n(4, wt = D(A));
    const V = Math.max(0, Math.ceil((_ - L[0]) / r.stepMs)), it = Math.min(S.length - 1, Math.floor((H - L[0]) / r.stepMs));
    try {
      typeof window < "u" && window.CGM_DEBUG && console.log("[CgmTir] rangechange", {
        startISO: new Date(_).toISOString(),
        endISO: new Date(H).toISOString(),
        days: A,
        startIdx: V,
        endIdx: it
      });
    } catch {
    }
    g("rangechange", {
      start: _,
      end: H,
      days: A,
      startIdx: V,
      endIdx: it
    });
  }
  function mt(A) {
    const V = Y;
    let it = Math.max(O + V - 1, Math.min(b, H)), Z = it - A * V + 1;
    Z < O && (Z = O, it = Math.min(b, Z + A * V - 1)), n(17, _ = Z), n(18, H = it), xt(), x();
  }
  function U(A) {
    const V = _ + A * Y, it = H + A * Y, Z = Math.max(Y, it - V);
    n(17, _ = Math.max(O, Math.min(b - Z, V))), n(18, H = Math.min(b, _ + Z)), xt(), x();
  }
  function q(A) {
    const V = bt() * Y * A;
    U(V / Y);
  }
  function rt() {
    const A = d;
    let V = !1, it = null, Z = null, Q = 0, zt = 0;
    const Et = 6, Vt = (Dt) => {
      const ot = new Date(Dt);
      return Date.UTC(ot.getUTCFullYear(), ot.getUTCMonth(), ot.getUTCDate());
    };
    function Ht() {
      const Dt = Math.max(320, A.getBoundingClientRect().width || 900), ot = Dt - w.l - w.r, T = zr(new Date(O).getUTCFullYear(), new Date(b).getUTCFullYear() + 1);
      return { cssW: Dt, plotW: ot, years: T };
    }
    function ee(Dt, ot) {
      const T = (Date.UTC(Dt + 1, 0, 1) - Date.UTC(Dt, 0, 1)) / Y;
      return (R) => w.l + Math.floor((R - Date.UTC(Dt, 0, 1)) / Y * (ot / T));
    }
    function Kt(Dt) {
      const ot = A.getBoundingClientRect(), T = Dt.clientX - ot.left, R = Dt.clientY - ot.top, { cssW: G, years: I } = Ht(), P = Math.floor((R - 8) / Se);
      if (P < 0 || P >= I.length) return null;
      const nt = I[P], F = w.l, _t = G - w.r, st = Math.max(F, Math.min(_t, T)), Ot = (Date.UTC(nt + 1, 0, 1) - Date.UTC(nt, 0, 1)) / Y, Ut = (st - F) / (_t - F);
      let ht = Date.UTC(nt, 0, 1) + Ut * Ot * Y;
      return ht = Math.max(O, Math.min(b, ht)), { t: ht, yr: nt, x: st, rowIdx: P };
    }
    A.addEventListener("mousedown", (Dt) => {
      const ot = Kt(Dt);
      if (!ot) return;
      const { plotW: T } = Ht(), R = ee(ot.yr, T), G = R(Math.max(Date.UTC(ot.yr, 0, 1), _)), I = R(Math.min(Date.UTC(ot.yr + 1, 0, 1) - 1, H)) + 1;
      it = "new", ot.x >= G - Et && ot.x <= G + Et ? it = "resize-l" : ot.x >= I - Et && ot.x <= I + Et ? it = "resize-r" : ot.x > G && ot.x < I && (it = "move"), V = !0, Z = ot.t, Q = _, zt = H, document.body.style.userSelect = "none", A.style.cursor = it === "move" ? "grabbing" : it === "new" ? "crosshair" : "col-resize";
    }), window.addEventListener("mousemove", (Dt) => {
      const ot = Kt(Dt);
      if (!ot) {
        V || (A.style.cursor = "crosshair");
        return;
      }
      if (!V) {
        const { plotW: G } = Ht(), I = ee(ot.yr, G), P = I(Math.max(Date.UTC(ot.yr, 0, 1), _)), nt = I(Math.min(Date.UTC(ot.yr + 1, 0, 1) - 1, H)) + 1;
        ot.x >= P - Et && ot.x <= P + Et || ot.x >= nt - Et && ot.x <= nt + Et ? A.style.cursor = "col-resize" : ot.x > P && ot.x < nt ? A.style.cursor = "grab" : A.style.cursor = "crosshair";
        return;
      }
      const T = ot.t, R = Y;
      if (it === "new") {
        const G = Vt(Math.min(Z, T)), I = Vt(Math.max(Z, T));
        let P = Math.max(1, Math.floor((I - G) / R) + 1);
        const nt = D(P);
        if (T >= Z) {
          let F = G, _t = F + nt * R - 1;
          _t > b && (_t = b, F = Math.max(O, _t - nt * R + 1)), n(17, _ = F), n(18, H = _t);
        } else {
          let F = I + R - 1, _t = F - nt * R + 1;
          _t < O && (_t = O, F = Math.min(b, _t + nt * R - 1)), n(17, _ = _t), n(18, H = F);
        }
      } else if (it === "resize-l") {
        const G = Math.max(1, Math.floor((zt - Vt(Math.min(T, zt - R + 1)) + 1) / R)), I = D(G);
        let P = zt - I * R + 1;
        P = Math.max(O, Math.min(P, zt - R + 1)), n(17, _ = P), n(18, H = zt);
      } else if (it === "resize-r") {
        const G = Math.max(1, Math.floor((Vt(T) + R - 1 - Q + 1) / R)), I = D(G);
        let P = Q + I * R - 1;
        P = Math.min(b, Math.max(P, Q + R - 1)), n(17, _ = Q), n(18, H = P);
      } else if (it === "move") {
        const G = Math.round((Vt(T) - Vt(Z)) / R), I = zt - Q + 1;
        let P = Q + G * R;
        P = Math.max(O, Math.min(b - I + 1, P)), n(17, _ = P), n(18, H = P + I - 1);
      }
      xt(), x();
    }), window.addEventListener("mouseup", () => {
      V && (V = !1, it = null, Z = null, document.body.style.userSelect = "", A.style.cursor = "crosshair");
    });
  }
  _n(() => {
    N = d.getContext("2d"), W(), j(), x();
    const A = Math.max(0, Math.ceil((_ - L[0]) / r.stepMs)), V = Math.min(S.length - 1, Math.floor((H - L[0]) / r.stepMs));
    g("ready", {
      start: _,
      end: H,
      startIdx: A,
      endIdx: V,
      days: bt()
    }), xt(), rt();
    const it = () => x(), Z = (Q) => {
      const zt = Q.target && Q.target.tagName ? Q.target.tagName.toLowerCase() : "";
      if (!(zt === "input" || zt === "textarea" || zt === "select" || Q.defaultPrevented)) {
        if (/^[1-6]$/.test(Q.key)) {
          const Vt = {
            1: 1,
            2: 7,
            3: 14,
            4: 21,
            5: 30,
            6: 90
          }[Q.key];
          mt(Vt), Q.preventDefault();
          return;
        }
        if (Q.key === "ArrowLeft" || Q.key === "ArrowRight") {
          Q.shiftKey ? q(Q.key === "ArrowLeft" ? -1 : 1) : U(Q.key === "ArrowLeft" ? -1 : 1), Q.preventDefault();
          return;
        }
      }
    };
    return window.addEventListener("resize", it), window.addEventListener("keydown", Z), () => {
      window.removeEventListener("resize", it), window.removeEventListener("keydown", Z);
    };
  });
  function k(A) {
    De[A ? "unshift" : "push"](() => {
      d = A, n(1, d);
    });
  }
  const Mt = () => {
    n(0, s = !s);
  };
  function v(A) {
    De[A ? "unshift" : "push"](() => {
      y = A, n(2, y);
    });
  }
  const dt = () => mt(1), lt = () => mt(3), kt = () => mt(7), pt = () => mt(14), Ct = () => mt(30), Ft = () => mt(90);
  function at(A) {
    De[A ? "unshift" : "push"](() => {
      p = A, n(3, p);
    });
  }
  return t.$$set = (A) => {
    "data" in A && n(7, r = A.data), "initialRange" in A && n(8, i = A.initialRange), "externalRange" in A && n(9, o = A.externalRange), "preset" in A && n(10, a = A.preset), "showMonthLabels" in A && n(11, l = A.showMonthLabels), "showData" in A && n(12, u = A.showData), "showCanvas" in A && n(0, s = A.showCanvas), "selectionStroke" in A && n(13, h = A.selectionStroke), "selectionFill" in A && n(14, f = A.selectionFill);
  }, t.$$.update = () => {
    if (t.$$.dirty[0] & /*externalRange, viewStart, viewEnd, time, values*/
    492032 && o && typeof o.start == "number" && typeof o.end == "number") {
      const A = o.start, V = o.end;
      (A !== _ || V !== H) && (n(17, _ = A), n(18, H = V), L && S && (xt(), x()));
    }
    t.$$.dirty[0] & /*viewStart, viewEnd*/
    393216 && n(5, ft = $(_, H)), t.$$.dirty[0] & /*values, preset*/
    66560 && S && a && (Tt(), x());
  }, n(4, wt = D(bt())), [
    s,
    d,
    y,
    p,
    wt,
    ft,
    mt,
    r,
    i,
    o,
    a,
    l,
    u,
    h,
    f,
    L,
    S,
    _,
    H,
    k,
    Mt,
    v,
    dt,
    lt,
    kt,
    pt,
    Ct,
    Ft,
    at
  ];
}
class sa extends rn {
  constructor(e) {
    super(), nn(
      this,
      e,
      Jf,
      Qf,
      en,
      {
        data: 7,
        initialRange: 8,
        externalRange: 9,
        preset: 10,
        showMonthLabels: 11,
        showData: 12,
        showCanvas: 0,
        selectionStroke: 13,
        selectionFill: 14
      },
      null,
      [-1, -1]
    );
  }
}
function Xi(t) {
  let e, n, r, i, o, a;
  return {
    c() {
      e = tt("button"), n = J("≡"), c(e, "type", "button"), c(e, "class", "qbtn svelte-lksbul"), c(e, "title", r = /*viewMode*/
      t[0] === "line" ? "Show years stacked" : "Show years inline"), c(e, "aria-label", i = /*viewMode*/
      t[0] === "line" ? "Show years stacked" : "Show years inline");
    },
    m(l, u) {
      Nt(l, e, u), m(e, n), o || (a = oe(
        e,
        "click",
        /*click_handler*/
        t[21]
      ), o = !0);
    },
    p(l, u) {
      u[0] & /*viewMode*/
      1 && r !== (r = /*viewMode*/
      l[0] === "line" ? "Show years stacked" : "Show years inline") && c(e, "title", r), u[0] & /*viewMode*/
      1 && i !== (i = /*viewMode*/
      l[0] === "line" ? "Show years stacked" : "Show years inline") && c(e, "aria-label", i);
    },
    d(l) {
      l && At(e), o = !1, a();
    }
  };
}
function Oi(t) {
  let e, n, r, i, o = {
    data: (
      /*data*/
      t[1]
    ),
    initialRange: {
      start: (
        /*viewStart*/
        t[8]
      ),
      end: (
        /*viewEnd*/
        t[9]
      )
    },
    preset: (
      /*preset*/
      t[2]
    ),
    showMonthLabels: (
      /*showMonthLabels*/
      t[3]
    ),
    showData: (
      /*showData*/
      t[4]
    ),
    showCanvas: !0,
    selectionFill: (
      /*selectionFill*/
      t[7]
    ),
    selectionStroke: (
      /*selectionStroke*/
      t[6]
    )
  };
  return r = new sa({ props: o }), t[28](r), r.$on(
    "rangechange",
    /*rangechange_handler*/
    t[29]
  ), r.$on(
    "ready",
    /*ready_handler*/
    t[30]
  ), {
    c() {
      e = tt("div"), n = tt("div"), _a(r.$$.fragment), c(n, "class", "stack-embed"), X(n, "width", "100%"), X(n, "position", "relative"), X(n, "z-index", "1"), c(e, "class", "stacked-container"), X(e, "position", "relative"), X(e, "z-index", "1");
    },
    m(a, l) {
      Nt(a, e, l), m(e, n), mo(r, n, null), i = !0;
    },
    p(a, l) {
      const u = {};
      l[0] & /*data*/
      2 && (u.data = /*data*/
      a[1]), l[0] & /*viewStart, viewEnd*/
      768 && (u.initialRange = {
        start: (
          /*viewStart*/
          a[8]
        ),
        end: (
          /*viewEnd*/
          a[9]
        )
      }), l[0] & /*preset*/
      4 && (u.preset = /*preset*/
      a[2]), l[0] & /*showMonthLabels*/
      8 && (u.showMonthLabels = /*showMonthLabels*/
      a[3]), l[0] & /*showData*/
      16 && (u.showData = /*showData*/
      a[4]), l[0] & /*selectionFill*/
      128 && (u.selectionFill = /*selectionFill*/
      a[7]), l[0] & /*selectionStroke*/
      64 && (u.selectionStroke = /*selectionStroke*/
      a[6]), r.$set(u);
    },
    i(a) {
      i || (En(r.$$.fragment, a), i = !0);
    },
    o(a) {
      Rr(r.$$.fragment, a), i = !1;
    },
    d(a) {
      a && At(e), t[28](null), po(r);
    }
  };
}
function jf(t) {
  let e, n, r, i, o, a, l, u, s, h, f, g, d, y, p, w, C, E, M, W, L, S, Y, z, K, gt, B, O, b, _, H, D, bt, wt, ct, yt, Tt, j = (
    /*showCanvas*/
    t[5] && Xi(t)
  ), N = (
    /*showCanvas*/
    t[5] && /*viewMode*/
    t[0] === "stacked" && Oi(t)
  );
  return {
    c() {
      e = tt("div"), n = tt("div"), r = tt("div"), j && j.c(), i = vt(), o = tt("div"), a = tt("div"), l = tt("button"), u = J("1d"), h = vt(), f = tt("button"), g = J("1w"), y = vt(), p = tt("button"), w = J("2w"), E = vt(), M = tt("button"), W = J("3w"), S = vt(), Y = tt("button"), z = J("1m"), gt = vt(), B = tt("button"), O = J("3m"), _ = vt(), N && N.c(), H = vt(), D = tt("div"), bt = tt("canvas"), X(r, "display", "flex"), X(r, "gap", "8px"), X(r, "align-items", "center"), X(r, "justify-content", "flex-end"), X(r, "flex", "0 0 auto"), c(l, "type", "button"), c(l, "class", s = te(`qbtn ${/*activeSpan*/
      t[13] === 1 ? "active" : ""}`) + " svelte-lksbul"), c(f, "type", "button"), c(f, "class", d = te(`qbtn ${/*activeSpan*/
      t[13] === 7 ? "active" : ""}`) + " svelte-lksbul"), c(p, "type", "button"), c(p, "class", C = te(`qbtn ${/*activeSpan*/
      t[13] === 14 ? "active" : ""}`) + " svelte-lksbul"), c(M, "type", "button"), c(M, "class", L = te(`qbtn ${/*activeSpan*/
      t[13] === 21 ? "active" : ""}`) + " svelte-lksbul"), c(Y, "type", "button"), c(Y, "class", K = te(`qbtn ${/*activeSpan*/
      t[13] === 30 ? "active" : ""}`) + " svelte-lksbul"), c(B, "type", "button"), c(B, "class", b = te(`qbtn ${/*activeSpan*/
      t[13] === 90 ? "active" : ""}`) + " svelte-lksbul"), X(a, "display", "flex"), X(a, "gap", "16px"), X(a, "flex-wrap", "wrap"), X(a, "justify-content", "flex-end"), X(o, "display", "flex"), X(o, "align-items", "center"), X(o, "gap", "20px"), X(o, "justify-content", "flex-end"), X(o, "margin-left", "auto"), c(n, "id", "controlBar"), X(n, "display", "flex"), X(n, "align-items", "center"), X(n, "gap", "12px"), X(n, "flex-wrap", "wrap"), X(n, "margin", "0 0 0px"), X(bt, "width", "100%"), X(bt, "border", "0"), X(bt, "padding-bottom", "10px"), c(D, "class", "line-container"), c(D, "style", wt = `display:${/*showCanvas*/
      t[5] && /*viewMode*/
      t[0] === "line" ? "block" : "none"};`), c(e, "class", "cgm-widget"), X(e, "contain", "layout"), X(e, "display", "flex"), X(e, "flex-direction", "column");
    },
    m(x, $) {
      Nt(x, e, $), m(e, n), m(n, r), j && j.m(r, null), m(n, i), m(n, o), m(o, a), m(a, l), m(l, u), m(a, h), m(a, f), m(f, g), m(a, y), m(a, p), m(p, w), m(a, E), m(a, M), m(M, W), m(a, S), m(a, Y), m(Y, z), m(a, gt), m(a, B), m(B, O), m(e, _), N && N.m(e, null), m(e, H), m(e, D), m(D, bt), t[31](bt), t[32](e), ct = !0, yt || (Tt = [
        oe(
          l,
          "click",
          /*click_handler_1*/
          t[22]
        ),
        oe(
          f,
          "click",
          /*click_handler_2*/
          t[23]
        ),
        oe(
          p,
          "click",
          /*click_handler_3*/
          t[24]
        ),
        oe(
          M,
          "click",
          /*click_handler_4*/
          t[25]
        ),
        oe(
          Y,
          "click",
          /*click_handler_5*/
          t[26]
        ),
        oe(
          B,
          "click",
          /*click_handler_6*/
          t[27]
        )
      ], yt = !0);
    },
    p(x, $) {
      /*showCanvas*/
      x[5] ? j ? j.p(x, $) : (j = Xi(x), j.c(), j.m(r, null)) : j && (j.d(1), j = null), (!ct || $[0] & /*activeSpan*/
      8192 && s !== (s = te(`qbtn ${/*activeSpan*/
      x[13] === 1 ? "active" : ""}`) + " svelte-lksbul")) && c(l, "class", s), (!ct || $[0] & /*activeSpan*/
      8192 && d !== (d = te(`qbtn ${/*activeSpan*/
      x[13] === 7 ? "active" : ""}`) + " svelte-lksbul")) && c(f, "class", d), (!ct || $[0] & /*activeSpan*/
      8192 && C !== (C = te(`qbtn ${/*activeSpan*/
      x[13] === 14 ? "active" : ""}`) + " svelte-lksbul")) && c(p, "class", C), (!ct || $[0] & /*activeSpan*/
      8192 && L !== (L = te(`qbtn ${/*activeSpan*/
      x[13] === 21 ? "active" : ""}`) + " svelte-lksbul")) && c(M, "class", L), (!ct || $[0] & /*activeSpan*/
      8192 && K !== (K = te(`qbtn ${/*activeSpan*/
      x[13] === 30 ? "active" : ""}`) + " svelte-lksbul")) && c(Y, "class", K), (!ct || $[0] & /*activeSpan*/
      8192 && b !== (b = te(`qbtn ${/*activeSpan*/
      x[13] === 90 ? "active" : ""}`) + " svelte-lksbul")) && c(B, "class", b), /*showCanvas*/
      x[5] && /*viewMode*/
      x[0] === "stacked" ? N ? (N.p(x, $), $[0] & /*showCanvas, viewMode*/
      33 && En(N, 1)) : (N = Oi(x), N.c(), En(N, 1), N.m(e, H)) : N && (wa(), Rr(N, 1, 1, () => {
        N = null;
      }), va()), (!ct || $[0] & /*showCanvas, viewMode*/
      33 && wt !== (wt = `display:${/*showCanvas*/
      x[5] && /*viewMode*/
      x[0] === "line" ? "block" : "none"};`)) && c(D, "style", wt);
    },
    i(x) {
      ct || (En(N), ct = !0);
    },
    o(x) {
      Rr(N), ct = !1;
    },
    d(x) {
      x && At(e), j && j.d(), N && N.d(), t[31](null), t[32](null), yt = !1, Ge(Tt);
    }
  };
}
const Qn = 54;
function $f(t, e, n) {
  let { data: r } = e, { initialRange: i = null } = e, { externalRange: o = null } = e, { preset: a = "general" } = e, { showMonthLabels: l = !0 } = e, { showData: u = !0 } = e, { showCanvas: s = !0 } = e, { selectionStroke: h = "#111" } = e, { selectionFill: f = "transparent" } = e, { viewMode: g = "line" } = e;
  const d = dr();
  let y, p, w;
  const C = { l: 8, r: 8, t: 0, b: 6 }, E = [1, 7, 14, 21, 30, 90];
  let M = {
    bg: "#fff",
    grid: "#f0f0f0",
    text: "#111",
    muted: "#555",
    selFill: "transparent",
    selStroke: "#111",
    vlow: "#e57373",
    low: "#ff9e80",
    inrange: "#86c89d",
    high: "#ffcc80",
    vhigh: "#ff8a65",
    outLight: "#ededed",
    outMid: "#c4c4c4",
    outDark: "#b5b5b5",
    arrow: "gray"
  };
  function W(T, R) {
    try {
      return (getComputedStyle(p).getPropertyValue(T) || "").trim() || R;
    } catch {
      return R;
    }
  }
  function L() {
    M = {
      bg: W("--cgm-bg", M.bg),
      grid: W("--cgm-grid", M.grid),
      text: W("--cgm-text", M.text),
      muted: W("--cgm-muted", M.muted),
      selFill: W("--cgm-selection-fill", M.selFill),
      selStroke: W("--cgm-selection-stroke", M.selStroke),
      vlow: W("--cgm-very-low", M.vlow),
      low: W("--cgm-low", M.low),
      inrange: W("--cgm-in-range", M.inrange),
      high: W("--cgm-high", M.high),
      vhigh: W("--cgm-very-high", M.vhigh),
      outLight: W("--cgm-outside-light", M.outLight),
      outMid: W("--cgm-outside-mid", M.outMid),
      outDark: W("--cgm-outside-dark", M.outDark),
      arrow: W("--cgm-arrow", M.arrow)
    };
  }
  let S, Y, z = 24 * 60 * 60 * 1e3;
  const K = () => new Date(r.t0).getTime(), gt = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), B = () => gt() ? "mmol" : "mg";
  function O() {
    return Pe[a].thresholds[B()];
  }
  let b = 0, _ = 0, H = 0, D = 0;
  function bt(T) {
    let R = E[0], G = 1 / 0;
    for (const I of E) {
      const P = Math.abs(I - T);
      P < G && (G = P, R = I);
    }
    return R;
  }
  function wt() {
    return Math.max(1, Math.floor((D - H) / z) + 1);
  }
  let ct = 14;
  const yt = (T) => {
    const R = new Date(T);
    return Date.UTC(R.getUTCFullYear(), R.getUTCMonth(), R.getUTCDate());
  };
  let Tt;
  function j() {
    Tt = /* @__PURE__ */ new Map();
    for (let T = 0; T < Y.length; T++) {
      const R = Y[T];
      if (!(Number.isFinite(R) && R >= 0)) continue;
      const G = yt(S[T]);
      let I = Tt.get(G);
      I || (I = { valid: 0, vl: 0, l: 0, t: 0, h: 0, vh: 0 }, Tt.set(G, I)), I.valid++;
      const P = O();
      R < P.veryLow ? I.vl++ : R < P.low ? I.l++ : R <= P.high ? I.t++ : R <= P.veryHigh ? I.h++ : I.vh++;
    }
  }
  function N() {
    S = Float64Array.from({ length: r.glucose.length }, (T, R) => K() + R * r.stepMs), n(20, Y = Float64Array.from(r.glucose)), b = yt(S[0]), _ = yt(S[S.length - 1]), n(8, H = (i == null ? void 0 : i.start) ?? b), n(9, D = (i == null ? void 0 : i.end) ?? _), j();
  }
  let x, $ = 0, ft = !1;
  function xt() {
    if (!y || !(Tt != null && Tt.size) || g !== "line" || !s) return;
    const T = Math.max(1, window.devicePixelRatio || 1), R = Math.max(320, y.getBoundingClientRect().width || 900), G = l ? 24 : C.b, I = C.t + Qn + G;
    n(10, y.style.width = R + "px", y), n(10, y.style.height = I + "px", y), n(10, y.width = Math.floor(R * T), y), n(10, y.height = Math.floor(I * T), y), x.setTransform(T, 0, 0, T, 0, 0), x.clearRect(0, 0, R, I), x.fillStyle = M.bg, x.fillRect(0, 0, R, I);
    const P = R - C.l - C.r, nt = Qn - 10, F = C.t + 5, _t = Math.round((_ - b) / z) + 1, st = P / 365, Ot = P / st;
    if (!ft) {
      const Lt = Math.floor((Math.min(_, Math.max(b, D)) - b) / z);
      $ = Math.max(0, Math.min(_t - Ot, Lt - Ot + 1)), ft = !0;
    }
    $ = Math.max(0, Math.min(_t - Ot, $));
    const Ut = (Lt) => C.l + (Lt - $) * st, ht = (Lt) => C.l + ((Lt - b) / z - $) * st;
    x.strokeStyle = M.grid, x.lineWidth = 1;
    const jt = b + Math.floor($) * z, Bt = b + Math.ceil($ + Ot) * z;
    let Zt = new Date(jt), ne = Date.UTC(Zt.getUTCFullYear(), Zt.getUTCMonth(), 1);
    if (ne < jt) {
      const Lt = Zt.getUTCFullYear(), Rt = Zt.getUTCMonth();
      ne = Date.UTC(Lt, Rt + 1, 1);
    }
    const Wt = Math.max(b, Math.min(_, H)), Qt = Math.max(b, Math.min(_, D));
    if (u) {
      const Lt = Math.max(0, Math.floor($)), Rt = Math.min(_t - 1, Math.ceil($ + Ot));
      for (let St = Lt; St <= Rt; St++) {
        const re = b + St * z, Jt = Ut(St), $t = Math.max(1, Math.ceil(st)), Xt = Tt.get(re);
        if (!Xt || !Xt.valid) {
          x.fillStyle = M.bg, x.globalAlpha = 1, x.fillRect(Jt, F, $t, nt);
          continue;
        }
        const ke = Math.max(1, Math.round(z / r.stepMs)), ie = {
          vl: Xt.vl / Xt.valid,
          l: Xt.l / Xt.valid,
          t: Xt.t / Xt.valid,
          h: Xt.h / Xt.valid,
          vh: Xt.vh / Xt.valid
        };
        let ce = F + nt;
        const ue = (qe, ln, Mn) => {
          const sn = Math.round(ln * nt);
          sn <= 0 || (ce -= sn, x.fillStyle = qe, x.globalAlpha = Mn, x.fillRect(Jt, ce, $t, sn));
        }, fe = Xt.valid / ke >= 0.5 ? 0.8 : 0.4, bn = Xt.valid / ke >= 0.5 ? 0.9 : 0.6;
        re >= Wt && re <= Qt ? (ue(M.vlow, ie.vl, fe), ue(M.low, ie.l, fe), ue(M.inrange, ie.t, bn), ue(M.high, ie.h, fe), ue(M.vhigh, ie.vh, fe)) : (ue(M.outDark, ie.vl, Math.min(fe, 0.7)), ue(M.outMid, ie.l, Math.min(fe, 0.65)), ue(M.outLight, ie.t, Math.min(bn, 0.55)), ue(M.outMid, ie.h, Math.min(fe, 0.65)), ue(M.outDark, ie.vh, Math.min(fe, 0.7))), x.globalAlpha = 1;
      }
    } else {
      x.fillStyle = M.bg;
      const Lt = Math.max(0, Math.floor($)), Rt = Math.min(_t - 1, Math.ceil($ + Ot));
      for (let St = Lt; St <= Rt; St++) {
        const re = Ut(St), Jt = Math.max(1, Math.ceil(st));
        x.fillRect(re, F, Jt, nt);
      }
    }
    if (u) {
      const Lt = Math.max(b, Math.min(_, H)), Rt = Math.max(b, Math.min(_, D)), St = Math.floor(ht(Lt)), re = Math.ceil(ht(Rt + 1));
      x.save();
      const Jt = f && f !== "#111" && f !== "transparent" && f !== "none" ? f : M.selFill;
      Jt && Jt !== "none" && Jt !== "transparent" && (x.fillStyle = Jt, x.fillRect(St, F, Math.max(1, re - St), nt));
      const $t = h && h !== "#111" ? h : M.selStroke;
      x.strokeStyle = $t, x.lineWidth = 1.5, x.beginPath(), x.moveTo(St + 0.5, F + 0.5), x.lineTo(St + 0.5, F + nt - 0.5), x.stroke(), x.beginPath(), x.moveTo(re - 0.5, F + 0.5), x.lineTo(re - 0.5, F + nt - 0.5), x.stroke(), x.restore();
      try {
        const Xt = mt(Lt, Rt), ke = C.t + Qn - 5 + 0.5;
        x.save(), x.font = "11px system-ui, sans-serif";
        const ie = Math.ceil(x.measureText(Xt).width);
        x.restore();
        const ce = (St + re) / 2;
        var Pt = {
          text: Xt,
          x0: Math.round(ce - ie / 2) - 2,
          x1: Math.round(ce + ie / 2) + 2,
          yAxis: ke
        };
      } catch {
      }
    }
    if (l) {
      const Lt = ai("%b"), Rt = C.t + Qn - 5 + 0.5;
      x.save(), x.strokeStyle = M.grid, x.lineWidth = 1, x.fillStyle = M.muted, x.font = "11px var(--cgm-font, system-ui, sans-serif)", x.textAlign = "center", x.textBaseline = "top";
      let St = new Date(jt), re = Date.UTC(St.getUTCFullYear(), St.getUTCMonth(), 1);
      if (re < jt) {
        const Jt = St.getUTCFullYear(), $t = St.getUTCMonth();
        re = Date.UTC(Jt, $t + 1, 1);
      }
      for (let Jt = re; Jt <= Bt; ) {
        const $t = Math.round(ht(Jt));
        x.beginPath(), x.moveTo($t, Rt), x.lineTo($t, Rt + 4), x.stroke();
        const Xt = new Date(Jt);
        let ke = Lt(new Date(Date.UTC(2e3, Xt.getUTCMonth(), 1)));
        if (Xt.getUTCMonth() === 0) {
          const ce = String(Xt.getUTCFullYear()).slice(-2);
          ke = `${ke} ${ce}'`;
        }
        let ie = !0;
        try {
          const ce = Math.ceil(x.measureText(ke).width), ue = $t - Math.round(ce / 2) - 2, fe = $t + Math.round(ce / 2) + 2;
          typeof Pt < "u" && Pt && !(fe < Pt.x0 || ue > Pt.x1) && (ie = !1);
        } catch {
        }
        ie && x.fillText(ke, $t, Rt + 6), Jt = Date.UTC(Xt.getUTCFullYear(), Xt.getUTCMonth() + 1, 1);
      }
      x.restore();
      try {
        if (typeof Pt < "u" && Pt) {
          const Jt = Rt + 6;
          x.save(), x.fillStyle = M.text, x.font = "11px var(--cgm-font, system-ui, sans-serif)", x.textAlign = "center", x.textBaseline = "top";
          const $t = Math.round((Pt.x0 + Pt.x1) / 2);
          x.fillText(Pt.text, $t, Jt), x.restore();
        }
      } catch {
      }
    }
    const Gt = F + nt / 2;
    if (x.save(), x.fillStyle = M.arrow, $ > 0 + 0.01) {
      const Lt = C.l - 5, Rt = 5, St = 4;
      x.beginPath(), x.moveTo(Lt, Gt), x.lineTo(Lt + St, Gt - Rt), x.lineTo(Lt + St, Gt + Rt), x.closePath(), x.fill();
    }
    if ($ + Ot < _t - 0.01) {
      const Lt = R - C.r + 5, Rt = 5, St = 4;
      x.beginPath(), x.moveTo(Lt, Gt), x.lineTo(Lt - St, Gt - Rt), x.lineTo(Lt - St, Gt + Rt), x.closePath(), x.fill();
    }
    x.restore();
  }
  function mt(T, R) {
    const G = new Date(T), I = new Date(R), P = He("%b %e"), nt = He("%b %e, %Y"), F = He("%e, %Y"), _t = Date.UTC(G.getUTCFullYear(), G.getUTCMonth(), G.getUTCDate()), st = Date.UTC(I.getUTCFullYear(), I.getUTCMonth(), I.getUTCDate());
    return _t === st ? nt(I) : G.getFullYear() === I.getFullYear() ? G.getMonth() === I.getMonth() ? `${P(G)} – ${F(I)}` : `${P(G)} – ${nt(I)}` : `${nt(G)} – ${nt(I)}`;
  }
  function U() {
    if (!S || !Y) return;
    const T = wt();
    n(13, ct = bt(T));
    const R = Math.max(0, Math.ceil((H - S[0]) / r.stepMs)), G = Math.min(Y.length - 1, Math.floor((D - S[0]) / r.stepMs));
    try {
      typeof window < "u" && window.CGM_DEBUG && console.log("[CgmTir] rangechange", {
        startISO: new Date(H).toISOString(),
        endISO: new Date(D).toISOString(),
        days: T,
        startIdx: R,
        endIdx: G
      });
    } catch {
    }
    d("rangechange", {
      start: H,
      end: D,
      days: T,
      startIdx: R,
      endIdx: G
    });
  }
  function q(T) {
    const R = z;
    let G = Math.max(b + R - 1, Math.min(_, D)), I = G - T * R + 1;
    I < b && (I = b, G = Math.min(_, I + T * R - 1)), n(8, H = I), n(9, D = G), v(), U(), Mt();
  }
  function rt(T) {
    const R = H + T * z, G = D + T * z, I = Math.max(z, G - R);
    n(8, H = Math.max(b, Math.min(_ - I, R))), n(9, D = Math.min(_, H + I)), v(), U(), Mt();
  }
  function k(T) {
    const R = wt() * z * T;
    rt(R / z);
  }
  function Mt() {
    if (g === "line") xt();
    else if (w) try {
      w.$set({
        externalRange: { start: H, end: D }
      });
    } catch {
    }
  }
  function v() {
    const T = Math.round((_ - b) / z) + 1, G = Math.max(320, (y == null ? void 0 : y.getBoundingClientRect().width) || 900) - C.l - C.r, I = G / 365, P = G / I, nt = Math.floor((Math.max(b, Math.min(_, H)) - b) / z), F = Math.floor((Math.max(b, Math.min(_, D)) - b) / z);
    let st = (nt + F + 1) / 2 - P / 2;
    st = Math.max(0, Math.min(T - P, st)), $ = st;
  }
  function dt() {
    if (!y) return;
    const R = Math.max(320, y.getBoundingClientRect().width || 900) - C.l - C.r, G = Math.round((_ - b) / z) + 1, I = R / 365, P = R / I;
    $ = Math.max(0, Math.min(G - P, $));
  }
  let lt = !1, kt = null, pt = null, Ct = null, Ft = null;
  function at() {
    if (lt || !y) return;
    const T = y;
    let R = !1, G = null, I = null, P = 0, nt = 0;
    const F = 6, _t = (Ut) => {
      const ht = new Date(Ut);
      return Date.UTC(ht.getUTCFullYear(), ht.getUTCMonth(), ht.getUTCDate());
    };
    function st() {
      const Ut = Math.max(320, T.getBoundingClientRect().width || 900), ht = Ut - C.l - C.r, jt = C.l, Bt = Ut - C.r, Zt = ht / 365;
      return { cssW: Ut, plotW: ht, x0: jt, x1: Bt, dayWidth: Zt };
    }
    function Ot(Ut) {
      const ht = T.getBoundingClientRect(), jt = Ut.clientX - ht.left;
      Ut.clientY - ht.top;
      const { x0: Bt, x1: Zt, dayWidth: ne } = st(), Wt = Math.max(Bt, Math.min(Zt, jt)), Qt = (Wt - Bt) / ne;
      let Pt = b + ($ + Qt) * z;
      return Pt = Math.max(b, Math.min(_, Pt)), { t: Pt, x: Wt, rawX: jt, x0: Bt, x1: Zt, rowIdx: 0 };
    }
    kt = (Ut) => {
      const ht = Ot(Ut);
      if (!ht) return;
      const { dayWidth: jt, x0: Bt } = st(), Zt = (Qt) => Bt + ((Qt - b) / z - $) * jt, ne = Zt(H), Wt = Zt(D) + 1;
      G = "new", ht.x >= ne - F && ht.x <= ne + F ? G = "resize-l" : ht.x >= Wt - F && ht.x <= Wt + F ? G = "resize-r" : ht.x > ne && ht.x < Wt && (G = "move"), R = !0, I = ht.t, P = H, nt = D, document.body.style.userSelect = "none", T.style.cursor = G === "move" ? "grabbing" : G === "new" ? "crosshair" : "col-resize";
    }, Ft = (Ut) => {
      const { dayWidth: ht } = st(), Bt = (Math.abs(Ut.deltaX) > Math.abs(Ut.deltaY) ? Ut.deltaX : Ut.deltaY) / ht;
      $ = $ + Bt, dt(), xt(), Ut.preventDefault();
    }, T.addEventListener("wheel", Ft, { passive: !1 }), T.addEventListener("mousedown", kt), pt = (Ut) => {
      let ht = Ot(Ut);
      if (!ht) {
        R || (T.style.cursor = "crosshair");
        return;
      }
      if (!R) {
        const { dayWidth: Qt, x0: Pt } = st(), Gt = (St) => Pt + ((St - b) / z - $) * Qt, Lt = Gt(H), Rt = Gt(D) + 1;
        ht.x >= Lt - F && ht.x <= Lt + F || ht.x >= Rt - F && ht.x <= Rt + F ? T.style.cursor = "col-resize" : ht.x > Lt && ht.x < Rt ? T.style.cursor = "grab" : T.style.cursor = "crosshair";
        return;
      }
      const { x0: jt, x1: Bt, dayWidth: Zt } = st();
      if (ht.rawX < jt) {
        const Qt = jt - ht.rawX;
        $ -= Qt / Zt, dt(), ht = Ot(Ut) || ht;
      } else if (ht.rawX > Bt) {
        const Qt = ht.rawX - Bt;
        $ += Qt / Zt, dt(), ht = Ot(Ut) || ht;
      }
      const ne = ht.t, Wt = z;
      if (G === "new") {
        const Qt = _t(Math.min(I, ne)), Pt = _t(Math.max(I, ne));
        let Gt = Math.max(1, Math.floor((Pt - Qt) / Wt) + 1);
        const Lt = bt(Gt);
        if (ne >= I) {
          let Rt = Qt, St = Rt + Lt * Wt - 1;
          St > _ && (St = _, Rt = Math.max(b, St - Lt * Wt + 1)), n(8, H = Rt), n(9, D = St);
        } else {
          let Rt = Pt + Wt - 1, St = Rt - Lt * Wt + 1;
          St < b && (St = b, Rt = Math.min(_, St + Lt * Wt - 1)), n(8, H = St), n(9, D = Rt);
        }
      } else if (G === "resize-l") {
        const Qt = Math.max(1, Math.floor((nt - _t(Math.min(ne, nt - Wt + 1)) + 1) / Wt)), Pt = bt(Qt);
        let Gt = nt - Pt * Wt + 1;
        Gt = Math.max(b, Math.min(Gt, nt - Wt + 1)), n(8, H = Gt), n(9, D = nt);
      } else if (G === "resize-r") {
        const Qt = Math.max(1, Math.floor((_t(ne) + Wt - 1 - P + 1) / Wt)), Pt = bt(Qt);
        let Gt = P + Pt * Wt - 1;
        Gt = Math.min(_, Math.max(Gt, P + Wt - 1)), n(8, H = P), n(9, D = Gt);
      } else if (G === "move") {
        const Qt = Math.round((_t(ne) - _t(I)) / Wt), Pt = nt - P + 1;
        let Gt = P + Qt * Wt;
        Gt = Math.max(b, Math.min(_ - Pt + 1, Gt)), n(8, H = Gt), n(9, D = Gt + Pt - 1);
      }
      U(), xt();
    }, Ct = () => {
      R && (R = !1, G = null, I = null, document.body.style.userSelect = "", T.style.cursor = "crosshair");
    }, window.addEventListener("mousemove", pt), window.addEventListener("mouseup", Ct), lt = !0;
  }
  function A() {
    if (!(!lt || !y)) {
      try {
        y.removeEventListener("mousedown", kt);
      } catch {
      }
      try {
        y.removeEventListener("wheel", Ft);
      } catch {
      }
      try {
        window.removeEventListener("mousemove", pt);
      } catch {
      }
      try {
        window.removeEventListener("mouseup", Ct);
      } catch {
      }
      kt = pt = Ct = Ft = null, lt = !1;
    }
  }
  _n(() => {
    x = y.getContext("2d"), L(), N(), xt();
    const T = Math.max(0, Math.ceil((H - S[0]) / r.stepMs)), R = Math.min(Y.length - 1, Math.floor((D - S[0]) / r.stepMs));
    d("ready", {
      start: H,
      end: D,
      startIdx: T,
      endIdx: R,
      days: wt()
    }), U(), at();
    const G = () => {
      dt(), xt();
    }, I = (P) => {
      const nt = P.target && P.target.tagName ? P.target.tagName.toLowerCase() : "";
      if (!(nt === "input" || nt === "textarea" || nt === "select" || P.defaultPrevented)) {
        if (/^[1-6]$/.test(P.key)) {
          const _t = {
            1: 1,
            2: 7,
            3: 14,
            4: 21,
            5: 30,
            6: 90
          }[P.key];
          q(_t), P.preventDefault();
          return;
        }
        if (P.key === "ArrowLeft" || P.key === "ArrowRight") {
          P.shiftKey ? k(P.key === "ArrowLeft" ? -1 : 1) : rt(P.key === "ArrowLeft" ? -1 : 1), P.preventDefault();
          return;
        }
        if (P.key === "ArrowUp" || P.key === "ArrowDown") {
          (function() {
            return { dayWidth: (Math.max(320, (y == null ? void 0 : y.getBoundingClientRect().width) || 900) - C.l - C.r) / 365 };
          })();
          const F = Math.round(30);
          $ += P.key === "ArrowUp" ? -F : F, xt(), P.preventDefault();
          return;
        }
      }
    };
    return window.addEventListener("resize", () => {
      L(), G();
    }), window.addEventListener("keydown", I), () => {
      window.removeEventListener("resize", G), window.removeEventListener("keydown", I), A();
    };
  });
  const V = () => {
    n(0, g = g === "line" ? "stacked" : "line"), Mt();
  }, it = () => q(1), Z = () => q(7), Q = () => q(14), zt = () => q(21), Et = () => q(30), Vt = () => q(90);
  function Ht(T) {
    De[T ? "unshift" : "push"](() => {
      w = T, n(12, w);
    });
  }
  const ee = (T) => {
    const R = T.detail;
    n(8, H = R.start), n(9, D = R.end), U();
  }, Kt = (T) => {
    const R = T.detail;
    n(8, H = R.start), n(9, D = R.end), d("ready", R);
  };
  function Dt(T) {
    De[T ? "unshift" : "push"](() => {
      y = T, n(10, y);
    });
  }
  function ot(T) {
    De[T ? "unshift" : "push"](() => {
      p = T, n(11, p);
    });
  }
  return t.$$set = (T) => {
    "data" in T && n(1, r = T.data), "initialRange" in T && n(18, i = T.initialRange), "externalRange" in T && n(19, o = T.externalRange), "preset" in T && n(2, a = T.preset), "showMonthLabels" in T && n(3, l = T.showMonthLabels), "showData" in T && n(4, u = T.showData), "showCanvas" in T && n(5, s = T.showCanvas), "selectionStroke" in T && n(6, h = T.selectionStroke), "selectionFill" in T && n(7, f = T.selectionFill), "viewMode" in T && n(0, g = T.viewMode);
  }, t.$$.update = () => {
    if (t.$$.dirty[0] & /*externalRange, viewStart, viewEnd*/
    525056 && o && typeof o.start == "number" && typeof o.end == "number") {
      const T = o.start, R = o.end;
      (T !== H || R !== D) && (n(8, H = T), n(9, D = R), v(), U(), Mt());
    }
    t.$$.dirty[0] & /*viewStart, viewEnd*/
    768 && mt(H, D), t.$$.dirty[0] & /*viewMode, showCanvas*/
    33 && g === "stacked" && s && setTimeout(
      () => {
        try {
          window.dispatchEvent(new Event("resize"));
        } catch {
        }
      },
      0
    ), t.$$.dirty[0] & /*values, preset*/
    1048580 && Y && a && (j(), Mt()), t.$$.dirty[0] & /*showCanvas, viewMode*/
    33 && (s && g === "line" ? at() : A());
  }, n(13, ct = bt(wt())), [
    g,
    r,
    a,
    l,
    u,
    s,
    h,
    f,
    H,
    D,
    y,
    p,
    w,
    ct,
    d,
    U,
    q,
    Mt,
    i,
    o,
    Y,
    V,
    it,
    Z,
    Q,
    zt,
    Et,
    Vt,
    Ht,
    ee,
    Kt,
    Dt,
    ot
  ];
}
class th extends rn {
  constructor(e) {
    super(), nn(
      this,
      e,
      $f,
      jf,
      en,
      {
        data: 1,
        initialRange: 18,
        externalRange: 19,
        preset: 2,
        showMonthLabels: 3,
        showData: 4,
        showCanvas: 5,
        selectionStroke: 6,
        selectionFill: 7,
        viewMode: 0
      },
      null,
      [-1, -1, -1]
    );
  }
}
function eh(t) {
  let e, n, r, i, o, a, l, u, s, h, f, g, d, y, p, w, C, E, M, W, L, S, Y, z, K, gt, B, O, b, _, H, D, bt, wt, ct, yt, Tt, j, N, x, $, ft, xt, mt, U, q, rt, k, Mt, v, dt, lt, kt, pt, Ct, Ft, at, A, V, it;
  return {
    c() {
      e = tt("div"), n = tt("div"), r = tt("div"), i = tt("b"), o = J(
        /*spanLabel*/
        t[10]
      ), a = tt("div"), l = J(
        /*periodText*/
        t[9]
      ), u = vt(), s = tt("div"), h = tt("div"), f = tt("b"), f.textContent = "Target Range", g = vt(), d = tt("div"), y = tt("button"), p = J("General"), C = J(`·
          `), E = tt("button"), M = J("Tight"), L = J(`·
          `), S = tt("button"), Y = J("Pregnancy"), K = vt(), gt = tt("div"), B = J(
        /*targetRangeText*/
        t[4]
      ), O = vt(), b = tt("div"), _ = J("Time CGM Active: "), H = J(
        /*activeText*/
        t[8]
      ), D = vt(), bt = tt("div"), wt = tt("div"), ct = tt("b"), ct.textContent = "Average Glucose", yt = tt("div"), Tt = J("Goal: "), j = J(
        /*avgGoalText*/
        t[5]
      ), N = tt("div"), x = J(
        /*avgText*/
        t[1]
      ), $ = vt(), ft = tt("div"), xt = tt("div"), mt = tt("b"), mt.textContent = "Glucose Management Indicator (GMI)", U = tt("div"), q = J("Goal: "), rt = J(
        /*gmiGoalText*/
        t[6]
      ), k = tt("div"), Mt = J(
        /*gmiText*/
        t[2]
      ), v = vt(), dt = tt("div"), lt = tt("div"), kt = tt("b"), kt.textContent = "Glucose Variability (CV)", pt = tt("div"), Ct = J("Goal: "), Ft = J(
        /*cvGoalText*/
        t[7]
      ), at = tt("div"), A = J(
        /*cvText*/
        t[3]
      ), c(i, "class", "svelte-1fkbugc"), c(r, "class", "svelte-1fkbugc"), c(a, "class", "svelte-1fkbugc"), c(n, "class", "metric svelte-1fkbugc"), c(f, "class", "svelte-1fkbugc"), c(y, "type", "button"), c(y, "class", w = "opt " + /*preset*/
      (t[0] === "general" ? "active" : "muted") + " svelte-1fkbugc"), c(y, "aria-label", "Set target range: General"), c(E, "type", "button"), c(E, "class", W = "opt " + /*preset*/
      (t[0] === "tight" ? "active" : "muted") + " svelte-1fkbugc"), c(E, "aria-label", "Set target range: Tight"), c(S, "type", "button"), c(S, "class", z = "opt " + /*preset*/
      (t[0] === "pregnancy" ? "active" : "muted") + " svelte-1fkbugc"), c(S, "aria-label", "Set target range: Pregnancy"), c(d, "class", "target-switch svelte-1fkbugc"), c(h, "class", "svelte-1fkbugc"), X(gt, "font-weight", "normal"), c(gt, "class", "svelte-1fkbugc"), c(s, "class", "metric svelte-1fkbugc"), c(b, "class", "muted svelte-1fkbugc"), X(b, "font-size", "11px"), X(b, "margin-top", "6px"), X(b, "margin-left", "8px"), X(b, "padding-bottom", "30px"), c(ct, "class", "svelte-1fkbugc"), c(yt, "class", "muted svelte-1fkbugc"), X(yt, "font-size", "11px"), c(wt, "class", "svelte-1fkbugc"), c(N, "class", "svelte-1fkbugc"), c(bt, "class", "metric svelte-1fkbugc"), c(mt, "class", "svelte-1fkbugc"), c(U, "class", "muted svelte-1fkbugc"), X(U, "font-size", "11px"), c(xt, "class", "svelte-1fkbugc"), c(k, "class", "svelte-1fkbugc"), c(ft, "class", "metric svelte-1fkbugc"), c(kt, "class", "svelte-1fkbugc"), c(pt, "class", "muted svelte-1fkbugc"), X(pt, "font-size", "11px"), c(lt, "class", "svelte-1fkbugc"), c(at, "class", "svelte-1fkbugc"), c(dt, "class", "metric svelte-1fkbugc"), c(e, "class", "summary"), X(e, "padding", "0 10px");
    },
    m(Z, Q) {
      Nt(Z, e, Q), m(e, n), m(n, r), m(r, i), m(i, o), m(n, a), m(a, l), m(e, u), m(e, s), m(s, h), m(h, f), m(h, g), m(h, d), m(d, y), m(y, p), m(d, C), m(d, E), m(E, M), m(d, L), m(d, S), m(S, Y), m(s, K), m(s, gt), m(gt, B), m(e, O), m(e, b), m(b, _), m(b, H), m(e, D), m(e, bt), m(bt, wt), m(wt, ct), m(wt, yt), m(yt, Tt), m(yt, j), m(bt, N), m(N, x), m(e, $), m(e, ft), m(ft, xt), m(xt, mt), m(xt, U), m(U, q), m(U, rt), m(ft, k), m(k, Mt), m(e, v), m(e, dt), m(dt, lt), m(lt, kt), m(lt, pt), m(pt, Ct), m(pt, Ft), m(dt, at), m(at, A), V || (it = [
        oe(
          y,
          "click",
          /*click_handler*/
          t[17]
        ),
        oe(
          E,
          "click",
          /*click_handler_1*/
          t[18]
        ),
        oe(
          S,
          "click",
          /*click_handler_2*/
          t[19]
        )
      ], V = !0);
    },
    p(Z, [Q]) {
      Q & /*spanLabel*/
      1024 && qt(
        o,
        /*spanLabel*/
        Z[10]
      ), Q & /*periodText*/
      512 && qt(
        l,
        /*periodText*/
        Z[9]
      ), Q & /*preset*/
      1 && w !== (w = "opt " + /*preset*/
      (Z[0] === "general" ? "active" : "muted") + " svelte-1fkbugc") && c(y, "class", w), Q & /*preset*/
      1 && W !== (W = "opt " + /*preset*/
      (Z[0] === "tight" ? "active" : "muted") + " svelte-1fkbugc") && c(E, "class", W), Q & /*preset*/
      1 && z !== (z = "opt " + /*preset*/
      (Z[0] === "pregnancy" ? "active" : "muted") + " svelte-1fkbugc") && c(S, "class", z), Q & /*targetRangeText*/
      16 && qt(
        B,
        /*targetRangeText*/
        Z[4]
      ), Q & /*activeText*/
      256 && qt(
        H,
        /*activeText*/
        Z[8]
      ), Q & /*avgGoalText*/
      32 && qt(
        j,
        /*avgGoalText*/
        Z[5]
      ), Q & /*avgText*/
      2 && qt(
        x,
        /*avgText*/
        Z[1]
      ), Q & /*gmiGoalText*/
      64 && qt(
        rt,
        /*gmiGoalText*/
        Z[6]
      ), Q & /*gmiText*/
      4 && qt(
        Mt,
        /*gmiText*/
        Z[2]
      ), Q & /*cvGoalText*/
      128 && qt(
        Ft,
        /*cvGoalText*/
        Z[7]
      ), Q & /*cvText*/
      8 && qt(
        A,
        /*cvText*/
        Z[3]
      );
    },
    i: ae,
    o: ae,
    d(Z) {
      Z && At(e), V = !1, Ge(it);
    }
  };
}
function nh(t, e, n) {
  let r, { data: i } = e, { range: o = null } = e, { preset: a = "general" } = e;
  const l = dr();
  let u = "—", s = "—", h = "—", f = "—", g = "", d = "", y = "", p = "—", w = "", C = 0, E, M, W = 24 * 60 * 60 * 1e3;
  const L = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol"), S = () => L() ? "mmol" : "mg", Y = () => L() ? "mmol/L" : "mg/dL", z = (_) => L() ? _ * 18 : _;
  function K() {
    if (!i) return;
    const _ = new Date(i.t0).getTime();
    n(15, E = Float64Array.from({ length: i.glucose.length }, (H, D) => _ + D * i.stepMs)), n(16, M = Float64Array.from(i.glucose));
  }
  function gt(_) {
    _ !== a && (n(0, a = _), l("presetchange", { preset: _ }));
  }
  _n(() => {
    K();
  });
  const B = () => gt("general"), O = () => gt("tight"), b = () => gt("pregnancy");
  return t.$$set = (_) => {
    "data" in _ && n(12, i = _.data), "range" in _ && n(13, o = _.range), "preset" in _ && n(0, a = _.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*preset*/
    1 && function() {
      const _ = Pe[a].thresholds[S()];
      n(4, f = _.low + "-" + _.high + Y());
    }(), t.$$.dirty & /*preset*/
    1 && Pe[a].label, t.$$.dirty & /*preset*/
    1 && function() {
      const _ = Pe[a].metricsGoals;
      n(5, g = _.averageGlucose[S()]), n(6, d = _.gmi), n(7, y = _.cv);
    }(), t.$$.dirty & /*data*/
    4096 && i && K(), t.$$.dirty & /*data, range, time, values*/
    110592 && i && o && E && M) {
      const { start: _, end: H } = o, D = Math.max(0, Math.ceil((_ - E[0]) / i.stepMs)), bt = Math.min(M.length - 1, Math.floor((H - E[0]) / i.stepMs));
      try {
        typeof window < "u" && window.CGM_DEBUG && console.log("[CgmSummary] update", {
          startISO: new Date(_).toISOString(),
          endISO: new Date(H).toISOString(),
          stepMs: i.stepMs,
          i0: D,
          i1: bt,
          len: M.length
        });
      } catch {
      }
      if (bt < D)
        n(1, u = "—"), n(2, s = "—"), n(3, h = "—"), n(8, p = "—"), n(9, w = ""), n(14, C = 0);
      else {
        let xt = function(k, Mt) {
          const v = new Date(k), dt = new Date(Mt), lt = He("%b %e"), kt = He("%b %e, %Y"), pt = He("%e, %Y"), Ct = Date.UTC(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate()), Ft = Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate());
          return Ct === Ft ? kt(dt) : v.getFullYear() === dt.getFullYear() ? v.getMonth() === dt.getMonth() ? `${lt(v)} – ${pt(dt)}` : `${lt(v)} – ${kt(dt)}` : `${kt(v)} – ${kt(dt)}`;
        };
        const wt = [];
        for (let k = D; k <= bt; k++) {
          const Mt = M[k];
          Number.isFinite(Mt) && Mt >= 0 && wt.push(Mt);
        }
        const ct = Math.max(1, bt - D + 1), Tt = 100 * wt.length / ct;
        n(8, p = `${Tt.toFixed(1)}%`);
        const j = Ea(wt), N = Sa(wt) ?? 0, x = Math.sqrt(N), $ = Number.isFinite(j) ? 3.31 + 0.02392 * z(j) : NaN, ft = Number.isFinite(j) && j !== 0 ? x / j * 100 : NaN;
        n(1, u = Number.isFinite(j) ? L() ? `${j.toFixed(1)} mmol/L` : `${Math.round(j)} mg/dL` : "—"), n(2, s = Number.isFinite($) ? `${$.toFixed(1)}%` : "—"), n(3, h = Number.isFinite(ft) ? `${ft.toFixed(1)}%` : "—"), n(9, w = xt(_, H));
        const mt = new Date(_), U = new Date(H), q = Date.UTC(mt.getUTCFullYear(), mt.getUTCMonth(), mt.getUTCDate()), rt = Date.UTC(U.getUTCFullYear(), U.getUTCMonth(), U.getUTCDate());
        n(14, C = Math.max(1, Math.floor((rt - q) / W) + 1));
      }
    }
    t.$$.dirty & /*range, daysCount*/
    24576 && n(10, r = (() => {
      if (!o) return `${C} Days`;
      const _ = 60 * 60 * 1e3, H = Math.max(0, Math.round((o.end - o.start) / _)), D = Math.round(H / 24);
      return D === 1 ? "1 Day" : D === 7 ? "1 Week" : D === 14 ? "2 Weeks" : D === 21 ? "3 Weeks" : D === 30 ? "1 Month" : D === 90 ? "3 Months" : `${C} Days`;
    })());
  }, [
    a,
    u,
    s,
    h,
    f,
    g,
    d,
    y,
    p,
    w,
    r,
    gt,
    i,
    o,
    C,
    E,
    M,
    B,
    O,
    b
  ];
}
class rh extends rn {
  constructor(e) {
    super(), nn(this, e, nh, eh, en, { data: 12, range: 13, preset: 0 });
  }
}
function ih(t) {
  let e;
  return {
    c() {
      e = J("General");
    },
    m(n, r) {
      Nt(n, e, r);
    },
    d(n) {
      n && At(e);
    }
  };
}
function oh(t) {
  let e;
  return {
    c() {
      e = J("Pregnancy");
    },
    m(n, r) {
      Nt(n, e, r);
    },
    d(n) {
      n && At(e);
    }
  };
}
function ah(t) {
  let e;
  return {
    c() {
      e = J("Tight");
    },
    m(n, r) {
      Nt(n, e, r);
    },
    d(n) {
      n && At(e);
    }
  };
}
function lh(t) {
  let e = Math.round(
    /*TH*/
    t[4]().low
  ) + "", n, r, i = Math.round(
    /*TH*/
    t[4]().high
  ) + "", o, a;
  return {
    c() {
      n = J(e), r = J("–"), o = J(i), a = J(" mg/dL");
    },
    m(l, u) {
      Nt(l, n, u), Nt(l, r, u), Nt(l, o, u), Nt(l, a, u);
    },
    p: ae,
    d(l) {
      l && (At(n), At(r), At(o), At(a));
    }
  };
}
function sh(t) {
  let e = (
    /*TH*/
    t[4]().low.toFixed(1) + ""
  ), n, r, i = (
    /*TH*/
    t[4]().high.toFixed(1) + ""
  ), o, a;
  return {
    c() {
      n = J(e), r = J("–"), o = J(i), a = J(" mmol/L");
    },
    m(l, u) {
      Nt(l, n, u), Nt(l, r, u), Nt(l, o, u), Nt(l, a, u);
    },
    p: ae,
    d(l) {
      l && (At(n), At(r), At(o), At(a));
    }
  };
}
function uh(t) {
  let e, n, r, i, o, a, l, u, s, h, f, g, d, y, p, w = (
    /*pct*/
    t[2].targ.toFixed(1) + ""
  ), C, E, M, W, L, S;
  function Y(b, _) {
    return (
      /*preset*/
      b[0] === "tight" ? ah : (
        /*preset*/
        b[0] === "pregnancy" ? oh : ih
      )
    );
  }
  let z = Y(t), K = z(t);
  function gt(b, _) {
    return (
      /*isMmol*/
      b[3]() ? sh : lh
    );
  }
  let O = gt(t)(t);
  return {
    c() {
      e = tt("div"), n = tt("div"), r = tt("div"), i = vt(), o = tt("div"), a = vt(), l = tt("div"), u = vt(), s = tt("div"), h = vt(), f = tt("div"), g = vt(), d = tt("div"), y = tt("div"), p = tt("span"), C = J(w), E = J("%"), M = J(" in range"), W = vt(), L = tt("div"), K.c(), S = vt(), O.c(), c(r, "class", "seg vlow svelte-15po776"), X(
        r,
        "width",
        /*pct*/
        t[2].vlow + "%"
      ), c(r, "title", "Very low"), c(o, "class", "seg low svelte-15po776"), X(
        o,
        "width",
        /*pct*/
        t[2].low + "%"
      ), c(o, "title", "Low"), c(l, "class", "seg targ svelte-15po776"), X(
        l,
        "width",
        /*pct*/
        t[2].targ + "%"
      ), c(l, "title", "Target"), c(s, "class", "seg high svelte-15po776"), X(
        s,
        "width",
        /*pct*/
        t[2].high + "%"
      ), c(s, "title", "High"), c(f, "class", "seg vhigh svelte-15po776"), X(
        f,
        "width",
        /*pct*/
        t[2].vhigh + "%"
      ), c(f, "title", "Very high"), c(n, "class", "bar svelte-15po776"), c(p, "class", "strong svelte-15po776"), c(y, "class", "left svelte-15po776"), c(L, "class", "right svelte-15po776"), c(d, "class", "legend svelte-15po776"), c(e, "class", "tirbar svelte-15po776");
    },
    m(b, _) {
      Nt(b, e, _), m(e, n), m(n, r), m(n, i), m(n, o), m(n, a), m(n, l), m(n, u), m(n, s), m(n, h), m(n, f), m(e, g), m(e, d), m(d, y), m(y, p), m(p, C), m(p, E), m(y, M), m(d, W), m(d, L), K.m(L, null), m(L, S), O.m(L, null), t[9](e);
    },
    p(b, [_]) {
      _ & /*pct*/
      4 && X(
        r,
        "width",
        /*pct*/
        b[2].vlow + "%"
      ), _ & /*pct*/
      4 && X(
        o,
        "width",
        /*pct*/
        b[2].low + "%"
      ), _ & /*pct*/
      4 && X(
        l,
        "width",
        /*pct*/
        b[2].targ + "%"
      ), _ & /*pct*/
      4 && X(
        s,
        "width",
        /*pct*/
        b[2].high + "%"
      ), _ & /*pct*/
      4 && X(
        f,
        "width",
        /*pct*/
        b[2].vhigh + "%"
      ), _ & /*pct*/
      4 && w !== (w = /*pct*/
      b[2].targ.toFixed(1) + "") && qt(C, w), z !== (z = Y(b)) && (K.d(1), K = z(b), K && (K.c(), K.m(L, S))), O.p(b, _);
    },
    i: ae,
    o: ae,
    d(b) {
      b && At(e), K.d(), O.d(), t[9](null);
    }
  };
}
function ch(t, e, n) {
  let { data: r } = e, { range: i = null } = e, { preset: o = "general" } = e, a, l;
  const u = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), s = () => u() ? "mmol" : "mg", h = () => Pe[o].thresholds[s()];
  let f;
  function g(w, C) {
    try {
      return (getComputedStyle(f).getPropertyValue(w) || "").trim() || C;
    } catch {
      return C;
    }
  }
  let d = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  };
  function y() {
    if (!r) return;
    const w = new Date(r.t0).getTime();
    n(7, a = Float64Array.from({ length: r.glucose.length }, (C, E) => w + E * r.stepMs)), n(8, l = Float64Array.from(r.glucose));
  }
  _n(() => {
    y();
  });
  function p(w) {
    De[w ? "unshift" : "push"](() => {
      f = w, n(1, f);
    });
  }
  return t.$$set = (w) => {
    "data" in w && n(5, r = w.data), "range" in w && n(6, i = w.range), "preset" in w && n(0, o = w.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*data*/
    32 && r && y(), t.$$.dirty & /*data, range, time, values, preset*/
    481 && r && i && a && l && o) {
      const { start: w, end: C } = i, E = Math.max(0, Math.ceil((w - a[0]) / r.stepMs)), M = Math.min(l.length - 1, Math.floor((C - a[0]) / r.stepMs));
      if (M < E)
        n(2, d = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        });
      else {
        const W = h();
        let L = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, S = 0;
        for (let Y = E; Y <= M; Y++) {
          const z = l[Y];
          Number.isFinite(z) && z >= 0 && (S++, z < W.vlow ? L.vlow++ : z < W.low ? L.low++ : z <= W.high ? L.targ++ : z <= W.vhigh ? L.high++ : L.vhigh++);
        }
        S === 0 ? n(2, d = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }) : n(2, d = {
          vlow: L.vlow / S * 100,
          low: L.low / S * 100,
          targ: L.targ / S * 100,
          high: L.high / S * 100,
          vhigh: L.vhigh / S * 100
        });
      }
    }
  }, g("--cgm-very-low", "#e57373"), g("--cgm-low", "#ff9e80"), g("--cgm-in-range", "#86c89d"), g("--cgm-high", "#ffcc80"), g("--cgm-very-high", "#ff8a65"), [o, f, d, u, h, r, i, a, l, p];
}
class fh extends rn {
  constructor(e) {
    super(), nn(this, e, ch, uh, en, { data: 5, range: 6, preset: 0 });
  }
}
function hh(t) {
  let e;
  return {
    c() {
      e = ut("svg"), X(e, "width", "100%"), X(e, "height", "260px"), X(e, "display", "block");
    },
    m(n, r) {
      Nt(n, e, r), t[6](e);
    },
    p: ae,
    i: ae,
    o: ae,
    d(n) {
      n && At(e), t[6](null);
    }
  };
}
function Sn(t, e) {
  if (!t.length) return NaN;
  const n = (t.length - 1) * e, r = Math.floor(n), i = n - r;
  return t[r] + (t[Math.min(t.length - 1, r + 1)] - t[r]) * (i || 0);
}
function gh(t, e, n) {
  let { data: r } = e, { range: i = null } = e, { preset: o = "general" } = e, a, l = 900, u = 260;
  const s = { l: 50, r: 60, t: 20, b: 26 }, h = 24 * 60 * 60 * 1e3;
  function f(L, S) {
    try {
      return (getComputedStyle(a).getPropertyValue(L) || "").trim() || S;
    } catch {
      return S;
    }
  }
  const g = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), d = () => g() ? "mmol" : "mg", y = () => Pe[o].thresholds[d()];
  let p, w;
  function C() {
    const L = new Date(r.t0).getTime();
    n(4, p = Float64Array.from({ length: r.glucose.length }, (S, Y) => L + Y * r.stepMs)), n(5, w = Float64Array.from(r.glucose));
  }
  function E(L, S) {
    const Y = Math.max(1, Math.round(h / r.stepMs)), z = Array.from({ length: Y }, () => []), K = /* @__PURE__ */ new Set();
    for (let B = L; B <= S; B++) {
      const O = w[B];
      if (!(Number.isFinite(O) && O >= 0)) continue;
      const b = p[B], _ = new Date(b), H = new Date(_.getFullYear(), _.getMonth(), _.getDate()).getTime();
      K.add(H);
      let D = Math.round((b - H) / r.stepMs);
      D < 0 ? D = 0 : D >= Y && (D = Y - 1), z[D].push(O);
    }
    return {
      series: z.map((B, O) => {
        const b = Float64Array.from(B).sort();
        return {
          t: O,
          p05: Sn(b, 0.05),
          p25: Sn(b, 0.25),
          p50: Sn(b, 0.5),
          p75: Sn(b, 0.75),
          p95: Sn(b, 0.95)
        };
      }),
      samplesPerDay: Y,
      dayCount: K.size
    };
  }
  function M() {
    if (!a || !r || !i || !p || !w) return;
    const L = a.getBoundingClientRect();
    l = Math.max(360, L.width || 900), u = Math.max(220, L.height || 260);
    const S = Xe(a);
    S.selectAll("*").remove();
    const Y = Math.max(0, Math.ceil((i.start - p[0]) / r.stepMs)), z = Math.min(w.length - 1, Math.floor((i.end - p[0]) / r.stepMs));
    if (z < Y) return;
    const { series: K, samplesPerDay: gt, dayCount: B } = E(Y, z);
    if (!K.flatMap((v) => [v.p05, v.p95]).filter(Number.isFinite).length) {
      const v = l / 2, dt = (s.t + (u - s.b)) / 2;
      S.append("text").attr("x", v).attr("y", dt).attr("text-anchor", "middle").attr("dominant-baseline", "middle").attr("font-size", 56).attr("fill", f("--cgm-muted", "#9aa3b2")).text("∅");
      return;
    }
    const b = In().domain([0, gt - 1]).range([s.l, l - s.r]), _ = y(), H = g() ? 20 : 360, D = In().domain([_.veryLow, H]).range([u - s.b, s.t]), bt = Ae().defined((v) => Number.isFinite(v.p05) && Number.isFinite(v.p95) && v.p05 < _.low).x((v) => b(v.t)).y0((v) => D(Math.min(v.p95, _.low))).y1((v) => D(v.p05)), wt = Ae().defined((v) => Number.isFinite(v.p05) && Number.isFinite(v.p95) && v.p95 > _.low && v.p05 < _.high).x((v) => b(v.t)).y0((v) => D(Math.min(v.p95, _.high))).y1((v) => D(Math.max(v.p05, _.low))), ct = Ae().defined((v) => Number.isFinite(v.p05) && Number.isFinite(v.p95) && v.p95 > _.high && v.p05 < _.veryHigh).x((v) => b(v.t)).y0((v) => D(Math.min(v.p95, _.veryHigh))).y1((v) => D(Math.max(v.p05, _.high))), yt = Ae().defined((v) => Number.isFinite(v.p05) && Number.isFinite(v.p95) && v.p95 > _.veryHigh && v.p05 < _.veryHigh).x((v) => b(v.t)).y0((v) => D(v.p95)).y1((v) => D(_.veryHigh)), Tt = Ae().defined((v) => Number.isFinite(v.p05) && Number.isFinite(v.p95) && v.p05 > _.veryHigh).x((v) => b(v.t)).y0((v) => D(v.p95)).y1((v) => D(v.p05));
    S.append("path").attr("d", bt(K)).attr("fill", f("--cgm-low-strong", "#d73027")).attr("opacity", 0.18), S.append("path").attr("d", wt(K)).attr("fill", f("--cgm-in-range", "#1a9850")).attr("opacity", 0.12), S.append("path").attr("d", ct(K)).attr("fill", f("--cgm-high", "#fdae61")).attr("opacity", 0.18);
    const j = f("--cgm-very-high-strong", "#f46d43");
    S.append("path").attr("d", yt(K)).attr("fill", j).attr("opacity", 0.26), S.append("path").attr("d", Tt(K)).attr("fill", j).attr("opacity", 0.26);
    const N = Ae().defined((v) => Number.isFinite(v.p25) && Number.isFinite(v.p75) && v.p75 > _.low && v.p25 < _.high).x((v) => b(v.t)).y0((v) => D(Math.min(Math.max(v.p25, _.low), _.high))).y1((v) => D(Math.max(Math.min(v.p75, _.high), _.low))), x = Ae().defined((v) => Number.isFinite(v.p25) && Number.isFinite(v.p75) && v.p75 > _.high && v.p25 < _.vhigh).x((v) => b(v.t)).y0((v) => D(Math.min(v.p75, _.vhigh))).y1((v) => D(Math.max(v.p25, _.high))), $ = Ae().defined((v) => Number.isFinite(v.p25) && Number.isFinite(v.p75) && v.p75 > _.vhigh && v.p25 < _.vhigh).x((v) => b(v.t)).y0((v) => D(v.p75)).y1((v) => D(_.vhigh)), ft = Ae().defined((v) => Number.isFinite(v.p25) && Number.isFinite(v.p75) && v.p25 < _.low).x((v) => b(v.t)).y0((v) => D(v.p25)).y1((v) => D(Math.min(v.p75, _.low)));
    S.append("path").attr("d", ft(K)).attr("fill", f("--cgm-low-strong", "#d73027")).attr("opacity", 0.35), S.append("path").attr("d", N(K)).attr("fill", f("--cgm-in-range", "#1a9850")).attr("opacity", 0.25), S.append("path").attr("d", x(K)).attr("fill", f("--cgm-high", "#fdae61")).attr("opacity", 0.35), S.append("path").attr("d", $(K)).attr("fill", j).attr("opacity", 0.45);
    try {
      let kt = function(at, A, V) {
        return at < V && A >= V || at > V && A <= V;
      }, pt = function(at, A, V, it, Z) {
        return { t: at + (Z - A) * (V - at) / (it - A), p50: Z };
      };
      const v = (at) => at < _.low ? f("--cgm-low-strong", "#d73027") : at > _.vhigh ? f("--cgm-very-high-strong", "#f46d43") : at > _.high ? f("--cgm-high", "#fdae61") : f("--cgm-in-range", "#1a9850"), dt = Rn().x((at) => b(at.t)).y((at) => D(at.p50)), lt = (at, A, V, it) => {
        !Number.isFinite(V.p50) || !Number.isFinite(it.p50) || ((!at.length || at[at.length - 1].color !== A) && at.push({ color: A, arr: [V] }), at[at.length - 1].arr.push(it));
      };
      let Ct = [], Ft = null;
      for (let at = 0; at < K.length; at++) {
        const A = K[at];
        if (!Number.isFinite(A.p50)) {
          Ft = null;
          continue;
        }
        if (!Ft) {
          Ft = A;
          continue;
        }
        const V = Ft.t, it = Ft.p50, Z = A.t, Q = A.p50;
        let zt = [{ t: V, p50: it }], Et = it, Vt = V;
        const Ht = [_.low, _.high, _.vhigh];
        (Q > it ? Ht : Ht.slice().reverse()).forEach((Dt) => {
          if (kt(Et, Q, Dt)) {
            const ot = pt(Vt, Et, Z, Q, Dt);
            zt.push(ot), Et = ot.p50, Vt = ot.t;
          }
        }), zt.push({ t: Z, p50: Q });
        for (let Dt = 1; Dt < zt.length; Dt++) {
          const ot = zt[Dt - 1], T = zt[Dt], R = (ot.p50 + T.p50) / 2 + (T.p50 === ot.p50 ? T.t > ot.t ? 1e-6 : -1e-6 : 0), G = v(R);
          lt(Ct, G, ot, T);
        }
        Ft = A;
      }
      Ct.forEach((at) => {
        at.arr.length >= 2 && S.append("path").attr("d", dt(at.arr)).attr("stroke", at.color).attr("fill", "none").attr("stroke-width", 2);
      });
    } catch {
    }
    const xt = f("--cgm-threshold", "#6ea77b");
    S.append("line").attr("x1", s.l).attr("x2", l - s.r).attr("y1", D(_.high)).attr("y2", D(_.high)).attr("stroke", xt).attr("stroke-width", 1), S.append("line").attr("x1", s.l).attr("x2", l - s.r).attr("y1", D(_.low)).attr("y2", D(_.low)).attr("stroke", xt).attr("stroke-width", 1);
    const mt = 60 * 60 * 1e3 / r.stepMs, U = zr(0, 24, 3).map((v) => Math.round(v * mt)), q = (v) => v === 0 || v === 24 ? "12am" : v < 12 ? `${v}am` : v === 12 ? "12pm" : `${v - 12}pm`, rt = f("--cgm-axis-color", "#555");
    S.append("g").attr("transform", `translate(0,${u - s.b})`).call(Wa(b).tickValues(U).tickFormat((v) => q(Math.round(v / mt))).tickSizeOuter(0)).call((v) => v.selectAll("text").attr("fill", rt)).call((v) => v.selectAll("line").attr("stroke", rt)).call((v) => v.select(".domain").attr("stroke", rt));
    const k = [y().veryLow, y().low, y().high, y().veryHigh, g() ? 20 : 360].filter((v) => v >= _.veryLow && v <= H), Mt = g() ? (v) => Math.round(v * 10) / 10 : (v) => Math.round(v);
    S.append("g").attr("transform", `translate(${s.l},0)`).call(qa(D).tickValues(k).tickFormat(Mt)).call((v) => v.selectAll("text").attr("fill", rt)).call((v) => v.selectAll("line").attr("stroke", rt)).call((v) => v.select(".domain").remove());
    try {
      if (B && B > 2) {
        const v = (pt) => {
          for (let Ct = K.length - 1; Ct >= 0; Ct--) {
            const Ft = K[Ct][pt];
            if (Number.isFinite(Ft)) return { t: K[Ct].t, v: Ft };
          }
          return null;
        }, lt = f("--cgm-axis-color", "#000"), kt = (pt, Ct) => {
          if (!Ct) return;
          const Ft = Math.min(l - s.r - 2, b(Ct.t) + 41), at = D(Ct.v);
          Xe(a).append("text").attr("x", Ft + 5).attr("y", at).attr("dy", "0.35em").attr("text-anchor", "start").attr("fill", lt).attr("font-size", 11).attr("font-weight", pt === 50 ? 700 : 400).text(`${pt}%`);
        };
        kt(5, v("p05")), kt(25, v("p25")), kt(50, v("p50")), kt(75, v("p75")), kt(95, v("p95"));
      }
    } catch {
    }
    try {
      let Ft = function(at) {
        const A = D(at), V = Xe(a).append("text").attr("x", -9999).attr("y", -9999).attr("fill", pt).attr("font-size", 11).attr("font-weight", 700).text(Ct(at)), it = V.node().getBBox();
        V.remove();
        const Z = Math.ceil(it.width), Q = s.l - 8 - (Z + 6 * 2), zt = A - 16 / 2;
        Xe(a).append("rect").attr("x", Q).attr("y", zt).attr("rx", 5).attr("ry", 5).attr("width", Z + 6 * 2).attr("height", 16).attr("fill", kt), Xe(a).append("text").attr("x", Q + 6).attr("y", A).attr("dy", "0.35em").attr("fill", pt).attr("font-size", 11).attr("font-weight", 700).text(Ct(at));
      };
      const kt = f("--cgm-in-range", "#1a9850"), pt = f("--cgm-pill-text", "#fff"), Ct = (at) => {
        if (g()) {
          const A = (Math.round(at * 10) / 10).toFixed(1);
          return A.endsWith(".0") ? A.slice(0, -2) : A;
        }
        return Math.round(at).toString();
      };
      Ft(_.low), Ft(_.high);
    } catch {
    }
  }
  _n(() => {
    C(), M(), window.addEventListener("resize", M);
  });
  function W(L) {
    De[L ? "unshift" : "push"](() => {
      a = L, n(0, a);
    });
  }
  return t.$$set = (L) => {
    "data" in L && n(1, r = L.data), "range" in L && n(2, i = L.range), "preset" in L && n(3, o = L.preset);
  }, t.$$.update = () => {
    t.$$.dirty & /*data, range, time, values, preset*/
    62 && r && i && p && w && o && M();
  }, [a, r, i, o, p, w, W];
}
class mh extends rn {
  constructor(e) {
    super(), nn(this, e, gh, hh, en, { data: 1, range: 2, preset: 3 });
  }
}
function dh(t) {
  let e;
  return {
    c() {
      e = ut("svg"), X(e, "width", "100%"), X(e, "display", "block");
    },
    m(n, r) {
      Nt(n, e, r), t[5](e);
    },
    p: ae,
    i: ae,
    o: ae,
    d(n) {
      n && At(e), t[5](null);
    }
  };
}
function ph(t, e, n) {
  let { data: r } = e, { range: i = null } = e, { preset: o = "general" } = e, { colorWholeWeek: a = !1 } = e, l;
  function u(w, C) {
    try {
      return (getComputedStyle(l).getPropertyValue(w) || "").trim() || C;
    } catch {
      return C;
    }
  }
  const s = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), h = () => s() ? "mmol" : "mg";
  let f, g;
  function d() {
    if (!r) return;
    const w = new Date(r.t0).getTime();
    f = Float64Array.from({ length: r.glucose.length }, (C, E) => w + E * r.stepMs), g = Float64Array.from(r.glucose);
  }
  function y() {
    if (!l || !r || !i || !f || !g) return;
    const w = Xe(l);
    w.selectAll("*").remove();
    const C = l.getBoundingClientRect(), E = Math.max(360, C.width || 1100), M = 7, W = 0, L = 30, S = { l: 0, r: 0, t: 40, b: 0 }, Y = Math.max(100, Math.floor((E - S.l - S.r - (M - 1) * W) / M)), z = Math.round(86 * 0.8), K = Math.round(18 * 0.8), gt = i.start, B = i.end, O = Te.floor(new Date(gt)).getTime(), b = Te.floor(new Date(B)).getTime(), _ = new Date(O), H = new Date(b), D = (_.getDay() + 6) % 7, bt = 7 - (H.getDay() + 6) % 7 - 1, wt = Te.offset(new Date(O), -D).getTime(), ct = Te.offset(new Date(b), bt).getTime(), yt = Te.offset(new Date(ct), 1).getTime(), Tt = Te.range(new Date(wt), Te.offset(new Date(ct), 1)).map((q) => q.getTime()), j = Tt.length, N = Math.ceil(j / M), x = S.t + N * z + (N - 1) * L + S.b;
    l.setAttribute("height", x);
    const $ = new Map(Tt.map((q) => [q, []]));
    for (let q = 0; q < g.length; q++) {
      const rt = g[q];
      if (!(Number.isFinite(rt) && rt >= 0)) continue;
      const k = f[q];
      if (k < wt || k >= yt) continue;
      const Mt = Te.floor(new Date(k)).getTime();
      $.has(Mt) && $.get(Mt).push({ t: k - Mt, v: rt, a: k });
    }
    const ft = Pe[o].thresholds[h()], xt = 60 * 60 * 1e3 / r.stepMs;
    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((q, rt) => {
      N > 0 && Xe(l).append("text").attr("x", S.l + rt * (Y + W) + Y / 2).attr("y", 16).attr("text-anchor", "middle").attr("fill", u("--cgm-muted", "#555")).attr("font-size", 10).text(q);
    });
    const U = Te.floor(/* @__PURE__ */ new Date()).getTime();
    for (let q = 1; q <= M - 1; q++) {
      const rt = S.l + q * (Y + W);
      for (let k = 0; k < N; k++) {
        const Mt = k * M, v = Mt + (q - 1), dt = Mt + q, lt = Tt[v], kt = Tt[dt];
        if (lt !== void 0 && lt > U && kt !== void 0 && kt > U) continue;
        const pt = S.t + k * (z + L);
        Xe(l).append("line").attr("x1", rt).attr("x2", rt).attr("y1", pt + 4).attr("y2", pt + z - 4).attr("stroke", u("--cgm-grid", "#e6e6e6")).attr("stroke-width", 1);
      }
    }
    Tt.forEach((q, rt) => {
      const k = Math.floor(rt / M), Mt = rt % M, v = S.l + Mt * (Y + W), dt = S.t + k * (z + L), lt = w.append("g").attr("transform", `translate(${v},${dt})`).attr("class", "day"), kt = In().domain([0, 24 * xt - 1]).range([0, Y]), pt = In().domain(s() ? [0, 20] : [0, 360]).range([z - K, 0]), Ct = q > U;
      Ct || (lt.append("rect").attr("x", 0).attr("y", pt(ft.high)).attr("width", Y).attr("height", Math.max(1, pt(ft.low) - pt(ft.high))).attr("fill", u("--cgm-target-band-bg", "#efefef")), lt.append("line").attr("x1", 0).attr("x2", Y).attr("y1", pt(ft.high)).attr("y2", pt(ft.high)).attr("stroke", u("--cgm-threshold", "#2e7d32")).attr("opacity", 0.7), lt.append("line").attr("x1", 0).attr("x2", Y).attr("y1", pt(ft.low)).attr("y2", pt(ft.low)).attr("stroke", u("--cgm-threshold", "#2e7d32")).attr("opacity", 0.7));
      const Ft = ($.get(q) || []).slice().sort((F, _t) => F.t - _t.t), at = 2 * r.stepMs, A = [];
      let V = [];
      for (const F of Ft) {
        if (!Number.isFinite(F.v)) {
          V.length && (A.push(V), V = []);
          continue;
        }
        V.length && F.t - V[V.length - 1].t > at ? (A.push(V), V = [F]) : V.push(F);
      }
      V.length && A.push(V);
      const it = a ? wt : gt, Z = a ? yt - 1 : B, Q = (F) => F.a >= it && F.a <= Z, zt = Ae().defined((F) => Number.isFinite(F.v) && F.v > ft.high && Q(F)).x((F) => kt(F.t / r.stepMs)).y0((F) => pt(ft.high)).y1((F) => pt(F.v));
      Ct || A.forEach((F) => {
        F.length > 1 && lt.append("path").attr("d", zt(F)).attr("fill", u("--cgm-high", "#fdae61")).attr("opacity", 0.35);
      });
      const Et = Ae().defined((F) => Number.isFinite(F.v) && F.v < ft.low && Q(F)).x((F) => kt(F.t / r.stepMs)).y0((F) => pt(F.v)).y1((F) => pt(ft.low));
      Ct || A.forEach((F) => {
        F.length > 1 && lt.append("path").attr("d", Et(F)).attr("fill", u("--cgm-low-strong", "#d73027")).attr("opacity", 0.25);
      }), Rn().x((F) => kt(F.t / r.stepMs)).y((F) => pt(F.v)).curve(Ur);
      const Vt = (F) => Number.isFinite(F.v) && Q(F) && F.v >= ft.low && F.v <= ft.high, Ht = (F) => Number.isFinite(F.v) && Q(F) && F.v < ft.low, ee = (F) => Number.isFinite(F.v) && Q(F) && F.v > ft.high, Kt = (F, _t) => Rn().defined(F).x((st) => kt(st.t / r.stepMs)).y((st) => pt(st.v)).curve(Ur), Dt = Kt(Vt, u("--cgm-in-range", "#1a9850")), ot = Kt(Ht, u("--cgm-low-strong", "#d73027")), T = Kt(ee, u("--cgm-high", "#fdae61"));
      Ct || A.forEach((F) => {
        if (F.length > 1) {
          const _t = Rn().defined((st) => Number.isFinite(st.v) && !Q(st)).x((st) => kt(st.t / r.stepMs)).y((st) => pt(st.v)).curve(Ur);
          lt.append("path").attr("d", _t(F)).attr("stroke", u("--cgm-context", "#c7c7c7")).attr("fill", "none").attr("stroke-width", 1.2).attr("opacity", 0.8), lt.append("path").attr("d", ot(F)).attr("stroke", "#d73027").attr("fill", "none").attr("stroke-width", 1.5), lt.append("path").attr("d", T(F)).attr("stroke", "#fdae61").attr("fill", "none").attr("stroke-width", 1.5), lt.append("path").attr("d", Dt(F)).attr("stroke", "#1a9850").attr("fill", "none").attr("stroke-width", 1.5);
        }
      });
      const R = new Date(q), G = R.getDate(), nt = G === 1 ? `1 ${[
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
      ][R.getMonth()]}` : String(G);
      Ct || (lt.append("text").attr("class", "date-label").attr("x", 0).attr("y", -8).attr("fill", "#777").attr("font-size", 10).attr("text-anchor", "start").text(nt), k < N - 1 && lt.append("text").attr("x", Y / 2).attr("y", z - 2).attr("text-anchor", "middle").attr("fill", u("--cgm-axis-color", "#777")).attr("font-size", 10).text("12pm")), Ct || lt.append("rect").attr("x", -12).attr("y", -10).attr("width", Y + 12).attr("height", z).attr("fill", "transparent").on("mouseenter", () => lt.classed("hover", !0)).on("mouseleave", () => lt.classed("hover", !1));
    });
  }
  _n(() => {
    d(), y(), window.addEventListener("resize", y);
  });
  function p(w) {
    De[w ? "unshift" : "push"](() => {
      l = w, n(0, l);
    });
  }
  return t.$$set = (w) => {
    "data" in w && n(1, r = w.data), "range" in w && n(2, i = w.range), "preset" in w && n(3, o = w.preset), "colorWholeWeek" in w && n(4, a = w.colorWholeWeek);
  }, t.$$.update = () => {
    t.$$.dirty & /*data, range, preset*/
    14 && r && i && o && y(), t.$$.dirty & /*svg*/
    1 && l && y();
  }, [l, r, i, o, a, p];
}
class yh extends rn {
  constructor(e) {
    super(), nn(this, e, ph, dh, en, {
      data: 1,
      range: 2,
      preset: 3,
      colorWholeWeek: 4
    });
  }
}
function Ki(t) {
  let e, n = (
    /*isMmol*/
    (t[15]() ? (
      /*currentThresholds*/
      t[6].low.toFixed(1)
    ) : (
      /*currentThresholds*/
      t[6].low
    )) + ""
  ), r, i, o, a = (
    /*isMmol*/
    (t[15]() ? (
      /*currentThresholds*/
      t[6].high.toFixed(1)
    ) : (
      /*currentThresholds*/
      t[6].high
    )) + ""
  ), l, u, s, h = (
    /*isMmol*/
    (t[15]() ? (
      /*currentThresholds*/
      t[6].veryHigh.toFixed(1)
    ) : (
      /*currentThresholds*/
      t[6].veryHigh
    )) + ""
  ), f, g;
  return {
    c() {
      e = ut("text"), r = J(n), o = ut("text"), l = J(a), s = ut("text"), f = J(h), c(e, "x", "35"), c(e, "y", i = 30 + /*yAxisPositions*/
      t[11].low), c(e, "font-family", "Arial, sans-serif"), c(e, "font-size", "10"), c(e, "fill", "var(--cgm-axis-color, #666)"), c(e, "text-anchor", "end"), c(o, "x", "35"), c(o, "y", u = 30 + /*yAxisPositions*/
      t[11].high), c(o, "font-family", "Arial, sans-serif"), c(o, "font-size", "10"), c(o, "fill", "var(--cgm-axis-color, #666)"), c(o, "text-anchor", "end"), c(s, "x", "35"), c(s, "y", g = 30 + /*yAxisPositions*/
      t[11].vhigh), c(s, "font-family", "Arial, sans-serif"), c(s, "font-size", "10"), c(s, "fill", "var(--cgm-axis-color, #666)"), c(s, "text-anchor", "end");
    },
    m(d, y) {
      Nt(d, e, y), m(e, r), Nt(d, o, y), m(o, l), Nt(d, s, y), m(s, f);
    },
    p(d, y) {
      y[0] & /*currentThresholds*/
      64 && n !== (n = /*isMmol*/
      (d[15]() ? (
        /*currentThresholds*/
        d[6].low.toFixed(1)
      ) : (
        /*currentThresholds*/
        d[6].low
      )) + "") && qt(r, n), y[0] & /*yAxisPositions*/
      2048 && i !== (i = 30 + /*yAxisPositions*/
      d[11].low) && c(e, "y", i), y[0] & /*currentThresholds*/
      64 && a !== (a = /*isMmol*/
      (d[15]() ? (
        /*currentThresholds*/
        d[6].high.toFixed(1)
      ) : (
        /*currentThresholds*/
        d[6].high
      )) + "") && qt(l, a), y[0] & /*yAxisPositions*/
      2048 && u !== (u = 30 + /*yAxisPositions*/
      d[11].high) && c(o, "y", u), y[0] & /*currentThresholds*/
      64 && h !== (h = /*isMmol*/
      (d[15]() ? (
        /*currentThresholds*/
        d[6].veryHigh.toFixed(1)
      ) : (
        /*currentThresholds*/
        d[6].veryHigh
      )) + "") && qt(f, h), y[0] & /*yAxisPositions*/
      2048 && g !== (g = 30 + /*yAxisPositions*/
      d[11].vhigh) && c(s, "y", g);
    },
    d(d) {
      d && (At(e), At(o), At(s));
    }
  };
}
function Zi(t) {
  let e, n, r;
  return {
    c() {
      e = ut("line"), c(e, "x1", "90"), c(e, "y1", n = 30 + /*linePositions*/
      t[3].high), c(e, "x2", Ce), c(e, "y2", r = /*textPositions*/
      t[10].high - 40), c(e, "stroke", "#ccc"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Nt(i, e, o);
    },
    p(i, o) {
      o[0] & /*linePositions*/
      8 && n !== (n = 30 + /*linePositions*/
      i[3].high) && c(e, "y1", n), o[0] & /*textPositions*/
      1024 && r !== (r = /*textPositions*/
      i[10].high - 40) && c(e, "y2", r);
    },
    d(i) {
      i && At(e);
    }
  };
}
function Qi(t) {
  let e, n, r;
  return {
    c() {
      e = ut("line"), c(e, "x1", "90"), c(e, "y1", n = 30 + /*linePositions*/
      t[3].targ), c(e, "x2", Ce), c(e, "y2", r = /*textPositions*/
      t[10].targ - 40), c(e, "stroke", "#ccc"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Nt(i, e, o);
    },
    p(i, o) {
      o[0] & /*linePositions*/
      8 && n !== (n = 30 + /*linePositions*/
      i[3].targ) && c(e, "y1", n), o[0] & /*textPositions*/
      1024 && r !== (r = /*textPositions*/
      i[10].targ - 40) && c(e, "y2", r);
    },
    d(i) {
      i && At(e);
    }
  };
}
function Ji(t) {
  let e, n, r;
  return {
    c() {
      e = ut("line"), c(e, "x1", "90"), c(e, "y1", n = 30 + /*linePositions*/
      t[3].low), c(e, "x2", Ce), c(e, "y2", r = /*textPositions*/
      t[10].low - 40), c(e, "stroke", "#ccc"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Nt(i, e, o);
    },
    p(i, o) {
      o[0] & /*linePositions*/
      8 && n !== (n = 30 + /*linePositions*/
      i[3].low) && c(e, "y1", n), o[0] & /*textPositions*/
      1024 && r !== (r = /*textPositions*/
      i[10].low - 40) && c(e, "y2", r);
    },
    d(i) {
      i && At(e);
    }
  };
}
function ji(t) {
  let e, n, r;
  return {
    c() {
      e = ut("rect"), c(e, "x", "40"), c(e, "y", n = 30 + /*barPositions*/
      t[4].vlow), c(e, "width", "50"), c(e, "height", r = /*barHeights*/
      t[5].vlow), c(
        e,
        "fill",
        /*cssVar*/
        t[14]("--cgm-very-low", "#e57373")
      );
    },
    m(i, o) {
      Nt(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].vlow) && c(e, "y", n), o[0] & /*barHeights*/
      32 && r !== (r = /*barHeights*/
      i[5].vlow) && c(e, "height", r);
    },
    d(i) {
      i && At(e);
    }
  };
}
function $i(t) {
  let e, n, r;
  return {
    c() {
      e = ut("rect"), c(e, "x", "40"), c(e, "y", n = 30 + /*barPositions*/
      t[4].low), c(e, "width", "50"), c(e, "height", r = /*barHeights*/
      t[5].low), c(
        e,
        "fill",
        /*cssVar*/
        t[14]("--cgm-low", "#ff9e80")
      );
    },
    m(i, o) {
      Nt(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].low) && c(e, "y", n), o[0] & /*barHeights*/
      32 && r !== (r = /*barHeights*/
      i[5].low) && c(e, "height", r);
    },
    d(i) {
      i && At(e);
    }
  };
}
function to(t) {
  let e, n, r;
  return {
    c() {
      e = ut("rect"), c(e, "x", "40"), c(e, "y", n = 30 + /*barPositions*/
      t[4].targ), c(e, "width", "50"), c(e, "height", r = /*barHeights*/
      t[5].targ), c(
        e,
        "fill",
        /*cssVar*/
        t[14]("--cgm-in-range", "#86c89d")
      );
    },
    m(i, o) {
      Nt(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].targ) && c(e, "y", n), o[0] & /*barHeights*/
      32 && r !== (r = /*barHeights*/
      i[5].targ) && c(e, "height", r);
    },
    d(i) {
      i && At(e);
    }
  };
}
function eo(t) {
  let e, n, r;
  return {
    c() {
      e = ut("rect"), c(e, "x", "40"), c(e, "y", n = 30 + /*barPositions*/
      t[4].high), c(e, "width", "50"), c(e, "height", r = /*barHeights*/
      t[5].high), c(
        e,
        "fill",
        /*cssVar*/
        t[14]("--cgm-high", "#ffcc80")
      );
    },
    m(i, o) {
      Nt(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].high) && c(e, "y", n), o[0] & /*barHeights*/
      32 && r !== (r = /*barHeights*/
      i[5].high) && c(e, "height", r);
    },
    d(i) {
      i && At(e);
    }
  };
}
function no(t) {
  let e, n, r;
  return {
    c() {
      e = ut("rect"), c(e, "x", "40"), c(e, "y", n = 30 + /*barPositions*/
      t[4].vhigh), c(e, "width", "50"), c(e, "height", r = /*barHeights*/
      t[5].vhigh), c(
        e,
        "fill",
        /*cssVar*/
        t[14]("--cgm-very-high", "#ff8a65")
      );
    },
    m(i, o) {
      Nt(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].vhigh) && c(e, "y", n), o[0] & /*barHeights*/
      32 && r !== (r = /*barHeights*/
      i[5].vhigh) && c(e, "height", r);
    },
    d(i) {
      i && At(e);
    }
  };
}
function ro(t) {
  let e, n, r, i, o = (
    /*barHeights*/
    t[5].vlow > 2 && /*barHeights*/
    t[5].low > 2 && io(t)
  ), a = (
    /*barHeights*/
    t[5].low > 2 && /*barHeights*/
    t[5].targ > 2 && oo(t)
  ), l = (
    /*barHeights*/
    t[5].targ > 2 && /*barHeights*/
    t[5].high > 2 && ao(t)
  ), u = (
    /*barHeights*/
    t[5].high > 2 && /*barHeights*/
    t[5].vhigh > 2 && lo(t)
  );
  return {
    c() {
      o && o.c(), e = Fe(), a && a.c(), n = Fe(), l && l.c(), r = Fe(), u && u.c(), i = Fe();
    },
    m(s, h) {
      o && o.m(s, h), Nt(s, e, h), a && a.m(s, h), Nt(s, n, h), l && l.m(s, h), Nt(s, r, h), u && u.m(s, h), Nt(s, i, h);
    },
    p(s, h) {
      /*barHeights*/
      s[5].vlow > 2 && /*barHeights*/
      s[5].low > 2 ? o ? o.p(s, h) : (o = io(s), o.c(), o.m(e.parentNode, e)) : o && (o.d(1), o = null), /*barHeights*/
      s[5].low > 2 && /*barHeights*/
      s[5].targ > 2 ? a ? a.p(s, h) : (a = oo(s), a.c(), a.m(n.parentNode, n)) : a && (a.d(1), a = null), /*barHeights*/
      s[5].targ > 2 && /*barHeights*/
      s[5].high > 2 ? l ? l.p(s, h) : (l = ao(s), l.c(), l.m(r.parentNode, r)) : l && (l.d(1), l = null), /*barHeights*/
      s[5].high > 2 && /*barHeights*/
      s[5].vhigh > 2 ? u ? u.p(s, h) : (u = lo(s), u.c(), u.m(i.parentNode, i)) : u && (u.d(1), u = null);
    },
    d(s) {
      s && (At(e), At(n), At(r), At(i)), o && o.d(s), a && a.d(s), l && l.d(s), u && u.d(s);
    }
  };
}
function io(t) {
  let e, n, r;
  return {
    c() {
      e = ut("line"), c(e, "x1", "40"), c(e, "x2", "90"), c(e, "y1", n = 30 + /*barPositions*/
      t[4].vlow), c(e, "y2", r = 30 + /*barPositions*/
      t[4].vlow), c(e, "stroke", "#fff"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Nt(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].vlow) && c(e, "y1", n), o[0] & /*barPositions*/
      16 && r !== (r = 30 + /*barPositions*/
      i[4].vlow) && c(e, "y2", r);
    },
    d(i) {
      i && At(e);
    }
  };
}
function oo(t) {
  let e, n, r;
  return {
    c() {
      e = ut("line"), c(e, "x1", "40"), c(e, "x2", "90"), c(e, "y1", n = 30 + /*barPositions*/
      t[4].low), c(e, "y2", r = 30 + /*barPositions*/
      t[4].low), c(e, "stroke", "#fff"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Nt(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].low) && c(e, "y1", n), o[0] & /*barPositions*/
      16 && r !== (r = 30 + /*barPositions*/
      i[4].low) && c(e, "y2", r);
    },
    d(i) {
      i && At(e);
    }
  };
}
function ao(t) {
  let e, n, r;
  return {
    c() {
      e = ut("line"), c(e, "x1", "40"), c(e, "x2", "90"), c(e, "y1", n = 30 + /*barPositions*/
      t[4].targ), c(e, "y2", r = 30 + /*barPositions*/
      t[4].targ), c(e, "stroke", "#fff"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Nt(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].targ) && c(e, "y1", n), o[0] & /*barPositions*/
      16 && r !== (r = 30 + /*barPositions*/
      i[4].targ) && c(e, "y2", r);
    },
    d(i) {
      i && At(e);
    }
  };
}
function lo(t) {
  let e, n, r;
  return {
    c() {
      e = ut("line"), c(e, "x1", "40"), c(e, "x2", "90"), c(e, "y1", n = 30 + /*barPositions*/
      t[4].high), c(e, "y2", r = 30 + /*barPositions*/
      t[4].high), c(e, "stroke", "#fff"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Nt(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].high) && c(e, "y1", n), o[0] & /*barPositions*/
      16 && r !== (r = 30 + /*barPositions*/
      i[4].high) && c(e, "y2", r);
    },
    d(i) {
      i && At(e);
    }
  };
}
function wh(t) {
  let e, n, r, i, o, a, l, u, s, h, f, g, d, y, p, w, C, E, M, W, L = (
    /*getRangeText*/
    t[12]("vhigh") + ""
  ), S, Y, z, K, gt = Math.round(
    /*pct*/
    t[1].vhigh
  ) + "", B, O, b, _, H = (
    /*displayTime*/
    t[13] ? `(${Ye(
      /*minutes*/
      t[9].vhigh
    )})` : `Goal ${/*goalPct*/
    t[17]("veryHigh")}`
  ), D, bt, wt, ct, yt, Tt, j, N, x, $ = (
    /*getRangeText*/
    t[12]("high") + ""
  ), ft, xt, mt, U, q = Math.round(
    /*pct*/
    t[1].high
  ) + "", rt, k, Mt, v, dt = (
    /*displayTime*/
    t[13] ? `(${Ye(
      /*minutes*/
      t[9].high
    )})` : `Goal ${/*goalPct*/
    t[17]("high")}`
  ), lt, kt, pt, Ct, Ft, at, A, V, it, Z = (
    /*getRangeText*/
    t[12]("targ") + ""
  ), Q, zt, Et, Vt, Ht = Math.round(
    /*pct*/
    t[1].targ
  ) + "", ee, Kt, Dt, ot, T = (
    /*displayTime*/
    t[13] ? `(${Ye(
      /*minutes*/
      t[9].targ
    )})` : `Goal ${/*goalPct*/
    t[17]("inRange")}`
  ), R, G, I, P, nt, F, _t, st, Ot, Ut = (
    /*getRangeText*/
    t[12]("low") + ""
  ), ht, jt, Bt, Zt, ne = Math.round(
    /*pct*/
    t[1].low
  ) + "", Wt, Qt, Pt, Gt, Lt = (
    /*displayTime*/
    t[13] ? `(${Ye(
      /*minutes*/
      t[9].low
    )})` : `Goal ${/*goalPct*/
    t[17]("low")}`
  ), Rt, St, re, Jt, $t, Xt, ke, ie, ce, ue = (
    /*getRangeText*/
    t[12]("vlow") + ""
  ), fe, bn, Ee, qe, ln = Math.round(
    /*pct*/
    t[1].vlow
  ) + "", Mn, sn, li, xn, Bn = (
    /*displayTime*/
    t[13] ? `(${Ye(
      /*minutes*/
      t[9].vlow
    )})` : `Goal ${/*goalPct*/
    t[17]("veryLow")}`
  ), vr, Gn, _r, si, he = (
    /*present*/
    t[8] > 0 && Ki(t)
  ), ge = (
    /*pct*/
    t[1].high > 0 && Zi(t)
  ), me = (
    /*pct*/
    t[1].targ > 0 && Qi(t)
  ), de = (
    /*pct*/
    t[1].low > 0 && Ji(t)
  ), pe = (
    /*barHeights*/
    t[5].vlow > 0 && ji(t)
  ), ye = (
    /*barHeights*/
    t[5].low > 0 && $i(t)
  ), we = (
    /*barHeights*/
    t[5].targ > 0 && to(t)
  ), ve = (
    /*barHeights*/
    t[5].high > 0 && eo(t)
  ), _e = (
    /*barHeights*/
    t[5].vhigh > 0 && no(t)
  ), be = (
    /*showSeparators*/
    t[0] && ro(t)
  );
  return {
    c() {
      e = tt("div"), n = ut("svg"), he && he.c(), r = ut("path"), ge && ge.c(), o = Fe(), me && me.c(), a = Fe(), de && de.c(), l = ut("path"), s = ut("rect"), pe && pe.c(), h = Fe(), ye && ye.c(), f = Fe(), we && we.c(), g = Fe(), ve && ve.c(), d = Fe(), _e && _e.c(), y = Fe(), be && be.c(), p = ut("g"), w = ut("text"), C = ut("tspan"), E = J("Very High"), M = vt(), W = ut("tspan"), S = J(L), Y = vt(), z = ut("text"), K = ut("tspan"), B = J(gt), O = J("%"), b = vt(), _ = ut("tspan"), D = J(H), bt = vt(), ct = ut("g"), yt = ut("text"), Tt = ut("tspan"), j = J("High"), N = vt(), x = ut("tspan"), ft = J($), xt = vt(), mt = ut("text"), U = ut("tspan"), rt = J(q), k = J("%"), Mt = vt(), v = ut("tspan"), lt = J(dt), kt = vt(), Ct = ut("g"), Ft = ut("text"), at = ut("tspan"), A = J("Target"), V = vt(), it = ut("tspan"), Q = J(Z), zt = vt(), Et = ut("text"), Vt = ut("tspan"), ee = J(Ht), Kt = J("%"), Dt = vt(), ot = ut("tspan"), R = J(T), G = vt(), P = ut("g"), nt = ut("text"), F = ut("tspan"), _t = J("Low"), st = vt(), Ot = ut("tspan"), ht = J(Ut), jt = vt(), Bt = ut("text"), Zt = ut("tspan"), Wt = J(ne), Qt = J("%"), Pt = vt(), Gt = ut("tspan"), Rt = J(Lt), St = vt(), Jt = ut("g"), $t = ut("text"), Xt = ut("tspan"), ke = J("Very Low"), ie = vt(), ce = ut("tspan"), fe = J(ue), bn = vt(), Ee = ut("text"), qe = ut("tspan"), Mn = J(ln), sn = J("%"), li = vt(), xn = ut("tspan"), vr = J(Bn), c(r, "d", i = "M 40 " + (30 + /*linePositions*/
      t[3].vhigh) + " L 65 " + (30 + /*linePositions*/
      t[3].vhigh) + " L 65 25 Q 65 15 70 15 L " + Ce + " 15"), c(r, "stroke", "#ccc"), c(r, "stroke-width", "1"), c(r, "fill", "none"), c(l, "d", u = "M 40 " + (30 + /*linePositions*/
      t[3].vlow) + " L 65 " + (30 + /*linePositions*/
      t[3].vlow) + " L 65 225 Q 65 230 70 230 L " + Ce + " 230"), c(l, "stroke", "#ccc"), c(l, "stroke-width", "1"), c(l, "fill", "none"), c(s, "x", "40"), c(s, "y", "30"), c(s, "width", "50"), c(s, "height", "180"), c(s, "fill", "white"), c(s, "stroke", "#ccc"), c(s, "stroke-width", "1"), c(C, "font-size", "12"), c(C, "font-weight", "bold"), c(C, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(W, "font-size", "10"), c(W, "fill", "var(--cgm-muted, #777)"), c(w, "x", "103"), c(w, "y", "0"), c(w, "font-family", "Arial, sans-serif"), c(K, "font-size", "12"), c(K, "font-weight", "bold"), c(K, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(_, "font-size", "10"), c(_, "fill", "var(--cgm-muted, #777)"), c(z, "x", Ce), c(z, "y", "0"), c(z, "font-family", "Arial, sans-serif"), c(z, "text-anchor", "end"), c(p, "transform", wt = "translate(0, " + /*textPositions*/
      (t[10].vhigh - 40) + ")"), c(Tt, "font-size", "12"), c(Tt, "font-weight", "bold"), c(Tt, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(x, "font-size", "10"), c(x, "fill", "var(--cgm-muted, #777)"), c(yt, "x", "103"), c(yt, "y", "0"), c(yt, "font-family", "Arial, sans-serif"), c(U, "font-size", "12"), c(U, "font-weight", "bold"), c(U, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(v, "font-size", "10"), c(v, "fill", "var(--cgm-muted, #777)"), c(mt, "x", Ce), c(mt, "y", "0"), c(mt, "font-family", "Arial, sans-serif"), c(mt, "text-anchor", "end"), c(ct, "transform", pt = "translate(0, " + /*textPositions*/
      (t[10].high - 40) + ")"), c(at, "font-size", "12"), c(at, "font-weight", "bold"), c(at, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(it, "font-size", "10"), c(it, "fill", "var(--cgm-muted, #777)"), c(Ft, "x", "103"), c(Ft, "y", "0"), c(Ft, "font-family", "Arial, sans-serif"), c(Vt, "font-size", "12"), c(Vt, "font-weight", "bold"), c(Vt, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(ot, "font-size", "10"), c(ot, "fill", "var(--cgm-muted, #777)"), c(Et, "x", Ce), c(Et, "y", "0"), c(Et, "font-family", "Arial, sans-serif"), c(Et, "text-anchor", "end"), c(Ct, "transform", I = "translate(0, " + /*textPositions*/
      (t[10].targ - 40) + ")"), c(F, "font-size", "12"), c(F, "font-weight", "bold"), c(F, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(Ot, "font-size", "10"), c(Ot, "fill", "var(--cgm-muted, #777)"), c(nt, "x", "103"), c(nt, "y", "0"), c(nt, "font-family", "Arial, sans-serif"), c(Zt, "font-size", "12"), c(Zt, "font-weight", "bold"), c(Zt, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(Gt, "font-size", "10"), c(Gt, "fill", "var(--cgm-muted, #777)"), c(Bt, "x", Ce), c(Bt, "y", "0"), c(Bt, "font-family", "Arial, sans-serif"), c(Bt, "text-anchor", "end"), c(P, "transform", re = "translate(0, " + /*textPositions*/
      (t[10].low - 40) + ")"), c(Xt, "font-size", "12"), c(Xt, "font-weight", "bold"), c(Xt, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(ce, "font-size", "10"), c(ce, "fill", "var(--cgm-muted, #777)"), c($t, "x", "103"), c($t, "y", "0"), c($t, "font-family", "Arial, sans-serif"), c(qe, "font-size", "12"), c(qe, "font-weight", "bold"), c(qe, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(xn, "font-size", "10"), c(xn, "fill", "var(--cgm-muted, #777)"), c(Ee, "x", "340"), c(Ee, "y", "0"), c(Ee, "font-family", "Arial, sans-serif"), c(Ee, "text-anchor", "end"), c(Jt, "transform", Gn = "translate(0, " + /*textPositions*/
      (t[10].vlow - 40) + ")"), c(
        n,
        "width",
        /*svgWidth*/
        t[16]
      ), c(n, "height", so), c(n, "viewBox", "0 0 " + /*svgWidth*/
      t[16] + " " + so), c(n, "class", "svelte-1d3n1f2"), c(e, "class", "widget-container svelte-1d3n1f2"), c(e, "role", "img"), c(e, "aria-label", "TIR detailed");
    },
    m(et, Yt) {
      Nt(et, e, Yt), m(e, n), he && he.m(n, null), m(n, r), ge && ge.m(n, null), m(n, o), me && me.m(n, null), m(n, a), de && de.m(n, null), m(n, l), m(n, s), pe && pe.m(n, null), m(n, h), ye && ye.m(n, null), m(n, f), we && we.m(n, null), m(n, g), ve && ve.m(n, null), m(n, d), _e && _e.m(n, null), m(n, y), be && be.m(n, null), m(n, p), m(p, w), m(w, C), m(C, E), m(w, M), m(w, W), m(W, S), m(w, Y), m(p, z), m(z, K), m(K, B), m(K, O), m(z, b), m(z, _), m(_, D), m(z, bt), m(n, ct), m(ct, yt), m(yt, Tt), m(Tt, j), m(yt, N), m(yt, x), m(x, ft), m(yt, xt), m(ct, mt), m(mt, U), m(U, rt), m(U, k), m(mt, Mt), m(mt, v), m(v, lt), m(mt, kt), m(n, Ct), m(Ct, Ft), m(Ft, at), m(at, A), m(Ft, V), m(Ft, it), m(it, Q), m(Ft, zt), m(Ct, Et), m(Et, Vt), m(Vt, ee), m(Vt, Kt), m(Et, Dt), m(Et, ot), m(ot, R), m(Et, G), m(n, P), m(P, nt), m(nt, F), m(F, _t), m(nt, st), m(nt, Ot), m(Ot, ht), m(nt, jt), m(P, Bt), m(Bt, Zt), m(Zt, Wt), m(Zt, Qt), m(Bt, Pt), m(Bt, Gt), m(Gt, Rt), m(Bt, St), m(n, Jt), m(Jt, $t), m($t, Xt), m(Xt, ke), m($t, ie), m($t, ce), m(ce, fe), m($t, bn), m(Jt, Ee), m(Ee, qe), m(qe, Mn), m(qe, sn), m(Ee, li), m(Ee, xn), m(xn, vr), t[24](n), _r || (si = [
        oe(
          e,
          "mouseenter",
          /*mouseenter_handler*/
          t[25]
        ),
        oe(
          e,
          "mouseleave",
          /*mouseleave_handler*/
          t[26]
        )
      ], _r = !0);
    },
    p(et, Yt) {
      /*present*/
      et[8] > 0 ? he ? he.p(et, Yt) : (he = Ki(et), he.c(), he.m(n, r)) : he && (he.d(1), he = null), Yt[0] & /*linePositions*/
      8 && i !== (i = "M 40 " + (30 + /*linePositions*/
      et[3].vhigh) + " L 65 " + (30 + /*linePositions*/
      et[3].vhigh) + " L 65 25 Q 65 15 70 15 L " + Ce + " 15") && c(r, "d", i), /*pct*/
      et[1].high > 0 ? ge ? ge.p(et, Yt) : (ge = Zi(et), ge.c(), ge.m(n, o)) : ge && (ge.d(1), ge = null), /*pct*/
      et[1].targ > 0 ? me ? me.p(et, Yt) : (me = Qi(et), me.c(), me.m(n, a)) : me && (me.d(1), me = null), /*pct*/
      et[1].low > 0 ? de ? de.p(et, Yt) : (de = Ji(et), de.c(), de.m(n, l)) : de && (de.d(1), de = null), Yt[0] & /*linePositions*/
      8 && u !== (u = "M 40 " + (30 + /*linePositions*/
      et[3].vlow) + " L 65 " + (30 + /*linePositions*/
      et[3].vlow) + " L 65 225 Q 65 230 70 230 L " + Ce + " 230") && c(l, "d", u), /*barHeights*/
      et[5].vlow > 0 ? pe ? pe.p(et, Yt) : (pe = ji(et), pe.c(), pe.m(n, h)) : pe && (pe.d(1), pe = null), /*barHeights*/
      et[5].low > 0 ? ye ? ye.p(et, Yt) : (ye = $i(et), ye.c(), ye.m(n, f)) : ye && (ye.d(1), ye = null), /*barHeights*/
      et[5].targ > 0 ? we ? we.p(et, Yt) : (we = to(et), we.c(), we.m(n, g)) : we && (we.d(1), we = null), /*barHeights*/
      et[5].high > 0 ? ve ? ve.p(et, Yt) : (ve = eo(et), ve.c(), ve.m(n, d)) : ve && (ve.d(1), ve = null), /*barHeights*/
      et[5].vhigh > 0 ? _e ? _e.p(et, Yt) : (_e = no(et), _e.c(), _e.m(n, y)) : _e && (_e.d(1), _e = null), /*showSeparators*/
      et[0] ? be ? be.p(et, Yt) : (be = ro(et), be.c(), be.m(n, p)) : be && (be.d(1), be = null), Yt[0] & /*getRangeText*/
      4096 && L !== (L = /*getRangeText*/
      et[12]("vhigh") + "") && qt(S, L), Yt[0] & /*pct*/
      2 && gt !== (gt = Math.round(
        /*pct*/
        et[1].vhigh
      ) + "") && qt(B, gt), Yt[0] & /*displayTime, minutes*/
      8704 && H !== (H = /*displayTime*/
      et[13] ? `(${Ye(
        /*minutes*/
        et[9].vhigh
      )})` : `Goal ${/*goalPct*/
      et[17]("veryHigh")}`) && qt(D, H), Yt[0] & /*textPositions*/
      1024 && wt !== (wt = "translate(0, " + /*textPositions*/
      (et[10].vhigh - 40) + ")") && c(p, "transform", wt), Yt[0] & /*getRangeText*/
      4096 && $ !== ($ = /*getRangeText*/
      et[12]("high") + "") && qt(ft, $), Yt[0] & /*pct*/
      2 && q !== (q = Math.round(
        /*pct*/
        et[1].high
      ) + "") && qt(rt, q), Yt[0] & /*displayTime, minutes*/
      8704 && dt !== (dt = /*displayTime*/
      et[13] ? `(${Ye(
        /*minutes*/
        et[9].high
      )})` : `Goal ${/*goalPct*/
      et[17]("high")}`) && qt(lt, dt), Yt[0] & /*textPositions*/
      1024 && pt !== (pt = "translate(0, " + /*textPositions*/
      (et[10].high - 40) + ")") && c(ct, "transform", pt), Yt[0] & /*getRangeText*/
      4096 && Z !== (Z = /*getRangeText*/
      et[12]("targ") + "") && qt(Q, Z), Yt[0] & /*pct*/
      2 && Ht !== (Ht = Math.round(
        /*pct*/
        et[1].targ
      ) + "") && qt(ee, Ht), Yt[0] & /*displayTime, minutes*/
      8704 && T !== (T = /*displayTime*/
      et[13] ? `(${Ye(
        /*minutes*/
        et[9].targ
      )})` : `Goal ${/*goalPct*/
      et[17]("inRange")}`) && qt(R, T), Yt[0] & /*textPositions*/
      1024 && I !== (I = "translate(0, " + /*textPositions*/
      (et[10].targ - 40) + ")") && c(Ct, "transform", I), Yt[0] & /*getRangeText*/
      4096 && Ut !== (Ut = /*getRangeText*/
      et[12]("low") + "") && qt(ht, Ut), Yt[0] & /*pct*/
      2 && ne !== (ne = Math.round(
        /*pct*/
        et[1].low
      ) + "") && qt(Wt, ne), Yt[0] & /*displayTime, minutes*/
      8704 && Lt !== (Lt = /*displayTime*/
      et[13] ? `(${Ye(
        /*minutes*/
        et[9].low
      )})` : `Goal ${/*goalPct*/
      et[17]("low")}`) && qt(Rt, Lt), Yt[0] & /*textPositions*/
      1024 && re !== (re = "translate(0, " + /*textPositions*/
      (et[10].low - 40) + ")") && c(P, "transform", re), Yt[0] & /*getRangeText*/
      4096 && ue !== (ue = /*getRangeText*/
      et[12]("vlow") + "") && qt(fe, ue), Yt[0] & /*pct*/
      2 && ln !== (ln = Math.round(
        /*pct*/
        et[1].vlow
      ) + "") && qt(Mn, ln), Yt[0] & /*displayTime, minutes*/
      8704 && Bn !== (Bn = /*displayTime*/
      et[13] ? `(${Ye(
        /*minutes*/
        et[9].vlow
      )})` : `Goal ${/*goalPct*/
      et[17]("veryLow")}`) && qt(vr, Bn), Yt[0] & /*textPositions*/
      1024 && Gn !== (Gn = "translate(0, " + /*textPositions*/
      (et[10].vlow - 40) + ")") && c(Jt, "transform", Gn);
    },
    i: ae,
    o: ae,
    d(et) {
      et && At(e), he && he.d(), ge && ge.d(), me && me.d(), de && de.d(), pe && pe.d(), ye && ye.d(), we && we.d(), ve && ve.d(), _e && _e.d(), be && be.d(), t[24](null), _r = !1, Ge(si);
    }
  };
}
const Re = 180, so = 240, Ce = 340;
function Ye(t) {
  const e = Math.floor(t / 60), n = Math.round(t % 60);
  return e === 0 ? `${n}min` : `${e}h${n.toString().padStart(2, "0")}min`;
}
function vh(t, e, n) {
  let r, i, o, a, l, u, s, h;
  const f = dr();
  let g;
  function d(j, N) {
    try {
      return (getComputedStyle(g).getPropertyValue(j) || "").trim() || N;
    } catch {
      return N;
    }
  }
  let { data: y } = e, { range: p = null } = e, { preset: w = "general" } = e, { showSeparators: C = !1 } = e, E, M;
  const W = () => /mmol/i.test((y == null ? void 0 : y.units) || "mmol"), L = () => W() ? "mmol" : "mg", S = () => W() ? "mmol/L" : "mg/dL", Y = Pe, z = () => Y[w].thresholds[L()];
  let K = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  }, gt = 0, B = 0, O = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  }, b = !1, { showTime: _ = !1 } = e;
  function H() {
    if (!y) return;
    const j = new Date(y.t0).getTime();
    n(22, E = Float64Array.from({ length: y.glucose.length }, (N, x) => j + x * y.stepMs)), n(23, M = Float64Array.from(y.glucose));
  }
  function D() {
    try {
      f("stats", {
        pct: K,
        present: gt,
        expected: B,
        preset: w,
        units: (y == null ? void 0 : y.units) || "mmol/L"
      });
    } catch {
    }
  }
  const bt = Ce + 10;
  function wt(j) {
    return Pe[w].percentGoals[j];
  }
  function ct(j) {
    De[j ? "unshift" : "push"](() => {
      g = j, n(7, g);
    });
  }
  const yt = () => n(2, b = !0), Tt = () => n(2, b = !1);
  return t.$$set = (j) => {
    "data" in j && n(18, y = j.data), "range" in j && n(19, p = j.range), "preset" in j && n(20, w = j.preset), "showSeparators" in j && n(0, C = j.showSeparators), "showTime" in j && n(21, _ = j.showTime);
  }, t.$$.update = () => {
    if (t.$$.dirty[0] & /*preset, data*/
    1310720 && n(6, r = z()), t.$$.dirty[0] & /*hoverAll, showTime*/
    2097156 && n(13, i = b || _), t.$$.dirty[0] & /*data*/
    262144 && y && H(), t.$$.dirty[0] & /*data, range, time, values, preset*/
    14417920 && y && p && E && M && w) {
      const { start: j, end: N } = p, x = Math.max(0, Math.ceil((j - E[0]) / y.stepMs)), $ = Math.min(M.length - 1, Math.floor((N - E[0]) / y.stepMs));
      if ($ < x)
        n(1, K = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }), n(8, gt = 0), B = 0, n(9, O = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        });
      else {
        const ft = z();
        let xt = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, mt = 0;
        for (let U = x; U <= $; U++) {
          const q = M[U];
          Number.isFinite(q) && q >= 0 && (mt++, q < ft.veryLow ? xt.vlow++ : q < ft.low ? xt.low++ : q <= ft.high ? xt.targ++ : q <= ft.veryHigh ? xt.high++ : xt.vhigh++);
        }
        if (n(8, gt = mt), B = Math.max(1, $ - x + 1), mt === 0)
          n(1, K = {
            vlow: 0,
            low: 0,
            targ: 0,
            high: 0,
            vhigh: 0
          }), n(9, O = {
            vlow: 0,
            low: 0,
            targ: 0,
            high: 0,
            vhigh: 0
          });
        else {
          n(1, K = {
            vlow: xt.vlow / mt * 100,
            low: xt.low / mt * 100,
            targ: xt.targ / mt * 100,
            high: xt.high / mt * 100,
            vhigh: xt.vhigh / mt * 100
          });
          const U = 24 * 60;
          n(9, O = {
            vlow: xt.vlow / mt * U,
            low: xt.low / mt * U,
            targ: xt.targ / mt * U,
            high: xt.high / mt * U,
            vhigh: xt.vhigh / mt * U
          });
        }
      }
      D();
    }
    t.$$.dirty[0] & /*currentThresholds*/
    64 && n(12, o = (j) => {
      const N = r;
      return j === "vhigh" ? `>${N.veryHigh} ${S()}` : j === "high" ? `${N.high}-${N.veryHigh} ${S()}` : j === "targ" ? `${N.low}-${N.high} ${S()}` : j === "low" ? `${N.veryLow}-${N.low} ${S()}` : j === "vlow" ? `<${N.veryLow} ${S()}` : "";
    }), t.$$.dirty[0] & /*pct*/
    2 && n(5, a = {
      vhigh: K.vhigh / 100 * Re,
      high: K.high / 100 * Re,
      targ: K.targ / 100 * Re,
      low: K.low / 100 * Re,
      vlow: K.vlow / 100 * Re
    }), t.$$.dirty[0] & /*barHeights*/
    32 && n(4, l = {
      vlow: Re - a.vlow,
      low: Re - a.vlow - a.low,
      targ: Re - a.vlow - a.low - a.targ,
      high: Re - a.vlow - a.low - a.targ - a.high,
      vhigh: Re - a.vlow - a.low - a.targ - a.high - a.vhigh
    }), t.$$.dirty[0] & /*barPositions, barHeights*/
    48 && n(3, u = {
      vhigh: l.vhigh + a.vhigh / 2,
      high: l.high + a.high / 2,
      targ: l.targ + a.targ / 2,
      low: l.low + a.low / 2,
      vlow: l.vlow + a.vlow / 2
    }), t.$$.dirty[0] & /*barPositions*/
    16 && n(11, s = {
      low: l.vlow,
      // Boundary between vlow and low sections
      high: l.targ,
      // Boundary between target and high sections
      vhigh: l.high
      // Boundary between high and vhigh sections
    }), t.$$.dirty[0] & /*pct, linePositions*/
    10 && n(10, h = {
      vhigh: 55,
      // Fixed at top
      high: K.high > 0 ? 70 + u.high : 105,
      targ: K.targ > 0 ? 70 + u.targ : 181,
      low: K.low > 0 ? 70 + u.low : 242,
      vlow: 270
      // Fixed at bottom
    });
  }, [
    C,
    K,
    b,
    u,
    l,
    a,
    r,
    g,
    gt,
    O,
    h,
    s,
    o,
    i,
    d,
    W,
    bt,
    wt,
    y,
    p,
    w,
    _,
    E,
    M,
    ct,
    yt,
    Tt
  ];
}
class _h extends rn {
  constructor(e) {
    super(), nn(
      this,
      e,
      vh,
      wh,
      en,
      {
        data: 18,
        range: 19,
        preset: 20,
        showSeparators: 0,
        showTime: 21
      },
      null,
      [-1, -1]
    );
  }
}
function uo(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  const i = (p) => {
    if (!p) return "general";
    const w = String(p).toLowerCase();
    return w === "tight" || w === "t" ? "tight" : w === "pregnancy" || w === "p" ? "pregnancy" : "general";
  }, o = new sa({ target: r, props: { data: e, initialRange: n.initialRange ?? null, externalRange: null, preset: i(n.preset), showMonthLabels: n.monthLabels ?? !0, showData: n.dataVisible ?? !0, showCanvas: n.canvasVisible ?? !0, selectionFill: n.selectionFill ?? "transparent", selectionStroke: n.selectionStroke ?? "#111" } }), a = /* @__PURE__ */ new Map();
  let l = n.initialRange ?? null;
  function u(p, w) {
    const C = a.get(p) || [];
    C.push(w), a.set(p, C);
  }
  o.$on("rangechange", (p) => {
    var C;
    const w = p.detail;
    l = { start: w.start, end: w.end }, (C = a.get("rangechange")) == null || C.forEach((E) => E(w));
  }), o.$on("ready", (p) => {
    var C;
    const w = p.detail;
    l = { start: w.start, end: w.end }, (C = a.get("ready")) == null || C.forEach((E) => E(w));
  });
  function s(p, w) {
    if (typeof p == "number" && typeof w == "number") o.$set({ externalRange: { start: p, end: w } });
    else if (p && typeof p.start == "number" && typeof p.end == "number") o.$set({ externalRange: { start: p.start, end: p.end } });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function h() {
    return l;
  }
  function f(p) {
    o.$set({ preset: i(p) });
  }
  function g(p) {
    o.$set({ showData: !!p });
  }
  function d(p) {
    o.$set({ showMonthLabels: !!p });
  }
  function y(p) {
    o.$set({ showCanvas: !!p });
  }
  return { on: u, setRange: s, getRange: h, setPreset: f, setDataVisible: g, setMonthLabels: d, setCanvasVisible: y, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createTirCalendar = uo, window.createCgmTir = uo);
function bh(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  const i = (p) => {
    if (!p) return "general";
    const w = String(p).toLowerCase();
    return w === "tight" || w === "t" ? "tight" : w === "pregnancy" || w === "p" ? "pregnancy" : "general";
  }, o = new th({ target: r, props: { data: e, initialRange: n.initialRange ?? null, externalRange: null, preset: i(n.preset), showMonthLabels: n.monthLabels ?? !0, showData: n.dataVisible ?? !0, showCanvas: n.canvasVisible ?? !0, selectionFill: n.selectionFill ?? "transparent", selectionStroke: n.selectionStroke ?? "#111" } }), a = /* @__PURE__ */ new Map();
  let l = n.initialRange ?? null;
  function u(p, w) {
    const C = a.get(p) || [];
    C.push(w), a.set(p, C);
  }
  o.$on("rangechange", (p) => {
    var C;
    const w = p.detail;
    l = { start: w.start, end: w.end }, (C = a.get("rangechange")) == null || C.forEach((E) => E(w));
  }), o.$on("ready", (p) => {
    var C;
    const w = p.detail;
    l = { start: w.start, end: w.end }, (C = a.get("ready")) == null || C.forEach((E) => E(w));
  });
  function s(p, w) {
    if (typeof p == "number" && typeof w == "number") o.$set({ externalRange: { start: p, end: w } });
    else if (p && typeof p.start == "number" && typeof p.end == "number") o.$set({ externalRange: { start: p.start, end: p.end } });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function h() {
    return l;
  }
  function f(p) {
    o.$set({ preset: i(p) });
  }
  function g(p) {
    o.$set({ showData: !!p });
  }
  function d(p) {
    o.$set({ showMonthLabels: !!p });
  }
  function y(p) {
    o.$set({ showCanvas: !!p });
  }
  return { on: u, setRange: s, getRange: h, setPreset: f, setDataVisible: g, setMonthLabels: d, setCanvasVisible: y, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createTirCalendarLine = bh);
function Mh(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = (g) => {
    if (!g) return "general";
    const d = String(g).toLowerCase();
    return d === "tight" || d === "t" ? "tight" : d === "pregnancy" || d === "p" ? "pregnancy" : "general";
  }, a = new rh({ target: r, props: { data: e, range: i, preset: o(n.preset) } }), l = /* @__PURE__ */ new Map();
  function u(g, d) {
    if (typeof g == "number" && typeof d == "number") a.$set({ range: { start: g, end: d } });
    else if (g && typeof g.start == "number" && typeof g.end == "number") a.$set({ range: g });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function s(g) {
    a.$set({ data: g });
  }
  function h(g, d) {
    const y = l.get(g) || [];
    y.push(d), l.set(g, y);
  }
  if (a.$on("presetchange", (g) => {
    var y;
    const d = g.detail;
    if (n.onPresetChange) try {
      n.onPresetChange(d.preset);
    } catch {
    }
    (y = l.get("presetchange")) == null || y.forEach((p) => p(d));
  }), n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: g, end: d }) => u({ start: g, end: d })), n.source.on("ready", ({ start: g, end: d }) => u({ start: g, end: d })), typeof n.source.getRange == "function")) {
    const g = n.source.getRange();
    g && typeof g.start == "number" && typeof g.end == "number" && u(g);
  }
  function f(g) {
    a.$set({ preset: o(g) });
  }
  return { on: h, setRange: u, setData: s, setPreset: f, destroy: () => a.$destroy() };
}
typeof window < "u" && (window.createCgmSummary = Mh);
function xh(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = (y) => {
    if (!y) return "general";
    const p = String(y).toLowerCase();
    return p === "tight" || p === "t" ? "tight" : p === "pregnancy" || p === "p" ? "pregnancy" : "general";
  }, a = new fh({ target: r, props: { data: e, range: i, preset: o(n.preset) } }), l = /* @__PURE__ */ new Map();
  let u = null;
  function s(y, p) {
    const w = l.get(y) || [];
    w.push(p), l.set(y, w);
  }
  a.$on("stats", (y) => {
    var w;
    const p = y.detail;
    u = p, (w = l.get("stats")) == null || w.forEach((C) => C(p));
  });
  function h(y, p) {
    if (typeof y == "number" && typeof p == "number") a.$set({ range: { start: y, end: p } });
    else if (y && typeof y.start == "number" && typeof y.end == "number") a.$set({ range: y });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function f(y) {
    a.$set({ data: y });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: y, end: p }) => h({ start: y, end: p })), n.source.on("ready", ({ start: y, end: p }) => h({ start: y, end: p })), typeof n.source.getRange == "function")) {
    const y = n.source.getRange();
    y && typeof y.start == "number" && typeof y.end == "number" && h(y);
  }
  function g(y) {
    a.$set({ preset: o(y) });
  }
  function d() {
    return u;
  }
  return { on: s, setRange: h, setData: f, setPreset: g, getStats: d, destroy: () => a.$destroy() };
}
typeof window < "u" && (window.createCgmTir = xh);
function kh(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = (h) => {
    if (!h) return "general";
    const f = String(h).toLowerCase();
    return f === "tight" || f === "t" ? "tight" : f === "pregnancy" || f === "p" ? "pregnancy" : "general";
  }, a = new mh({ target: r, props: { data: e, range: i, preset: o(n.preset) } });
  function l(h, f) {
    if (typeof h == "number" && typeof f == "number") a.$set({ range: { start: h, end: f } });
    else if (h && typeof h.start == "number" && typeof h.end == "number") a.$set({ range: h });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function u(h) {
    a.$set({ data: h });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: h, end: f }) => l({ start: h, end: f })), n.source.on("ready", ({ start: h, end: f }) => l({ start: h, end: f })), typeof n.source.getRange == "function")) {
    const h = n.source.getRange();
    h && typeof h.start == "number" && typeof h.end == "number" && l(h);
  }
  function s(h) {
    a.$set({ preset: o(h) });
  }
  return { setRange: l, setData: u, setPreset: s, destroy: () => a.$destroy() };
}
typeof window < "u" && (window.createCgmAgp = kh);
function Th(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = (h) => {
    if (!h) return "general";
    const f = String(h).toLowerCase();
    return f === "tight" || f === "t" ? "tight" : f === "pregnancy" || f === "p" ? "pregnancy" : "general";
  }, a = new yh({ target: r, props: { data: e, range: i, preset: o(n.preset) } });
  function l(h, f) {
    if (typeof h == "number" && typeof f == "number") a.$set({ range: { start: h, end: f } });
    else if (h && typeof h.start == "number" && typeof h.end == "number") a.$set({ range: h });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function u(h) {
    a.$set({ data: h });
  }
  function s(h) {
    a.$set({ preset: o(h) });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: h, end: f }) => l({ start: h, end: f })), n.source.on("ready", ({ start: h, end: f }) => l({ start: h, end: f })), typeof n.source.getRange == "function")) {
    const h = n.source.getRange();
    h && typeof h.start == "number" && typeof h.end == "number" && l(h);
  }
  return { setRange: l, setData: u, setPreset: s, destroy: () => a.$destroy() };
}
typeof window < "u" && (window.createCgmStrips = Th);
function Ch(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = (p) => {
    if (!p) return "general";
    const w = String(p).toLowerCase();
    return w === "tight" || w === "t" ? "tight" : w === "pregnancy" || w === "p" ? "pregnancy" : "general";
  }, a = new _h({ target: r, props: { data: e, range: i, preset: o(n.preset), showTime: !1 } }), l = /* @__PURE__ */ new Map();
  let u = null;
  function s(p, w) {
    const C = l.get(p) || [];
    C.push(w), l.set(p, C);
  }
  a.$on("stats", (p) => {
    var C;
    const w = p.detail;
    u = w, (C = l.get("stats")) == null || C.forEach((E) => E(w));
  });
  function h(p, w) {
    if (typeof p == "number" && typeof w == "number") a.$set({ range: { start: p, end: w } });
    else if (p && typeof p.start == "number" && typeof p.end == "number") a.$set({ range: p });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function f(p) {
    a.$set({ data: p });
  }
  function g(p) {
    a.$set({ showTime: !!p });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: p, end: w }) => h({ start: p, end: w })), n.source.on("ready", ({ start: p, end: w }) => h({ start: p, end: w })), typeof n.source.getRange == "function")) {
    const p = n.source.getRange();
    p && typeof p.start == "number" && typeof p.end == "number" && h(p);
  }
  function d(p) {
    a.$set({ preset: o(p) });
  }
  function y() {
    return u;
  }
  return { on: s, setRange: h, setData: f, setPreset: d, setShowTime: g, getStats: y, destroy: () => a.$destroy() };
}
typeof window < "u" && (window.createCgmTirDetailed = Ch);
export {
  kh as createCgmAgp,
  Th as createCgmStrips,
  Mh as createCgmSummary,
  xh as createCgmTir,
  Ch as createCgmTirDetailed,
  uo as createTirCalendar,
  bh as createTirCalendarLine
};

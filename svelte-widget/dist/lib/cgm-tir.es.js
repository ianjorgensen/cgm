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
function d(t, e) {
  t.appendChild(e);
}
function Ft(t, e, n) {
  t.insertBefore(e, n || null);
}
function At(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function tt(t) {
  return document.createElement(t);
}
function st(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function Q(t) {
  return document.createTextNode(t);
}
function wt() {
  return Q(" ");
}
function Fe() {
  return Q("");
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
function Vt(t, e) {
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
function mr() {
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
const ci = [], da = /* @__PURE__ */ Promise.resolve();
let Lr = !1;
function ma() {
  Lr || (Lr = !0, da.then(go));
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
  t.$$.dirty[0] === -1 && (fn.push(t), ma(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
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
  if (s.ctx = n ? n(t, e.props || {}, (f, g, ...m) => {
    const y = m.length ? m[0] : g;
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
  t.length !== 2 ? (e = jn, n = (l, u) => jn(t(l), u), r = (l, u) => t(l) - u) : (e = t === jn || t === xa ? t : Ta, n = t, r = t);
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
function Ta() {
  return 0;
}
function ka(t) {
  return t === null ? NaN : +t;
}
const Ca = yo(jn), Da = Ca.right;
yo(ka).center;
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
var xr = 1, Tr = 2, Pr = 3, An = 4, fi = 1e-6;
function Ya(t) {
  return "translate(" + t + ",0)";
}
function za(t) {
  return "translate(0," + t + ")";
}
function Pa(t) {
  return (e) => +t(e);
}
function Ha(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function Ia() {
  return !this.__axis;
}
function wo(t, e) {
  var n = [], r = null, i = null, o = 6, a = 6, l = 3, u = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, s = t === xr || t === An ? -1 : 1, h = t === An || t === Tr ? "x" : "y", f = t === xr || t === Pr ? Ya : za;
  function g(m) {
    var y = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), p = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : Ra), w = Math.max(o, 0) + l, D = e.range(), E = +D[0] + u, x = +D[D.length - 1] + u, W = (e.bandwidth ? Ha : Pa)(e.copy(), u), U = m.selection ? m.selection() : m, S = U.selectAll(".domain").data([null]), Y = U.selectAll(".tick").data(y, e).order(), z = Y.exit(), K = Y.enter().append("g").attr("class", "tick"), dt = Y.select("line"), B = Y.select("text");
    S = S.merge(S.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), Y = Y.merge(K), dt = dt.merge(K.append("line").attr("stroke", "currentColor").attr(h + "2", s * o)), B = B.merge(K.append("text").attr("fill", "currentColor").attr(h, s * w).attr("dy", t === xr ? "0em" : t === Pr ? "0.71em" : "0.32em")), m !== U && (S = S.transition(m), Y = Y.transition(m), dt = dt.transition(m), B = B.transition(m), z = z.transition(m).attr("opacity", fi).attr("transform", function(O) {
      return isFinite(O = W(O)) ? f(O + u) : this.getAttribute("transform");
    }), K.attr("opacity", fi).attr("transform", function(O) {
      var b = this.parentNode.__axis;
      return f((b && isFinite(b = b(O)) ? b : W(O)) + u);
    })), z.remove(), S.attr("d", t === An || t === Tr ? a ? "M" + s * a + "," + E + "H" + u + "V" + x + "H" + s * a : "M" + u + "," + E + "V" + x : a ? "M" + E + "," + s * a + "V" + u + "H" + x + "V" + s * a : "M" + E + "," + u + "H" + x), Y.attr("opacity", 1).attr("transform", function(O) {
      return f(W(O) + u);
    }), dt.attr(h + "2", s * o), B.attr(h, s * w).text(p), U.filter(Ia).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === Tr ? "start" : t === An ? "end" : "middle"), U.each(function() {
      this.__axis = W;
    });
  }
  return g.scale = function(m) {
    return arguments.length ? (e = m, g) : e;
  }, g.ticks = function() {
    return n = Array.from(arguments), g;
  }, g.tickArguments = function(m) {
    return arguments.length ? (n = m == null ? [] : Array.from(m), g) : n.slice();
  }, g.tickValues = function(m) {
    return arguments.length ? (r = m == null ? null : Array.from(m), g) : r && r.slice();
  }, g.tickFormat = function(m) {
    return arguments.length ? (i = m, g) : i;
  }, g.tickSize = function(m) {
    return arguments.length ? (o = a = +m, g) : o;
  }, g.tickSizeInner = function(m) {
    return arguments.length ? (o = +m, g) : o;
  }, g.tickSizeOuter = function(m) {
    return arguments.length ? (a = +m, g) : a;
  }, g.tickPadding = function(m) {
    return arguments.length ? (l = +m, g) : l;
  }, g.offset = function(m) {
    return arguments.length ? (u = +m, g) : u;
  }, g;
}
function Wa(t) {
  return wo(Pr, t);
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
var Hr = "http://www.w3.org/1999/xhtml";
const gi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Hr,
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
    return n === Hr && e.documentElement.namespaceURI === Hr ? e.createElement(t) : e.createElementNS(n, t);
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
function To(t) {
  return new Array(t.length);
}
function ul() {
  return new xe(this._enter || this._groups.map(To), this._parents);
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
  var l, u, s = /* @__PURE__ */ new Map(), h = e.length, f = o.length, g = new Array(h), m;
  for (l = 0; l < h; ++l)
    (u = e[l]) && (g[l] = m = a.call(u, u.__data__, l, e) + "", s.has(m) ? i[l] = u : s.set(m, u));
  for (l = 0; l < f; ++l)
    m = a.call(t, o[l], l, o) + "", (u = s.get(m)) ? (r[l] = u, u.__data__ = o[l], s.delete(m)) : n[l] = new rr(t, o[l]);
  for (l = 0; l < h; ++l)
    (u = e[l]) && s.get(g[l]) === u && (i[l] = u);
}
function gl(t) {
  return t.__data__;
}
function dl(t, e) {
  if (!arguments.length) return Array.from(this, gl);
  var n = e ? hl : fl, r = this._parents, i = this._groups;
  typeof t != "function" && (t = cl(t));
  for (var o = i.length, a = new Array(o), l = new Array(o), u = new Array(o), s = 0; s < o; ++s) {
    var h = r[s], f = i[s], g = f.length, m = ml(t.call(h, h && h.__data__, s, r)), y = m.length, p = l[s] = new Array(y), w = a[s] = new Array(y), D = u[s] = new Array(g);
    n(h, f, p, w, D, m, e);
    for (var E = 0, x = 0, W, U; E < y; ++E)
      if (W = p[E]) {
        for (E >= x && (x = E + 1); !(U = w[x]) && ++x < y; ) ;
        W._next = U || null;
      }
  }
  return a = new xe(a, r), a._enter = l, a._exit = u, a;
}
function ml(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function pl() {
  return new xe(this._exit || this._groups.map(To), this._parents);
}
function yl(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function wl(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, a = Math.min(i, o), l = new Array(i), u = 0; u < a; ++u)
    for (var s = n[u], h = r[u], f = s.length, g = l[u] = new Array(f), m, y = 0; y < f; ++y)
      (m = s[y] || h[y]) && (g[y] = m);
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
function Tl() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var a = r[i];
      if (a) return a;
    }
  return null;
}
function kl() {
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
function ko(t) {
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
function Pl(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Rl : typeof e == "function" ? zl : Yl)(t, e, n ?? "")) : mn(this.node(), t);
}
function mn(t, e) {
  return t.style.getPropertyValue(e) || ko(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Hl(t) {
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
  return arguments.length > 1 ? this.each((e == null ? Hl : typeof e == "function" ? Wl : Il)(t, e)) : this.node()[t];
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
function ds(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function ms(t) {
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
    var r = this.__on, i, o = ds(e);
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
  var r = ms(t + ""), i, o = r.length, a;
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
  var r = ko(t), i = r.CustomEvent;
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
  data: dl,
  enter: ul,
  exit: pl,
  join: yl,
  merge: wl,
  selection: xs,
  order: vl,
  sort: _l,
  call: Ml,
  nodes: xl,
  node: Tl,
  size: kl,
  empty: Cl,
  each: Dl,
  attr: El,
  style: Pl,
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
var zn = 0.7, ir = 1 / zn, dn = "\\s*([+-]?\\d+)\\s*", Pn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ze = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ts = /^#([0-9a-f]{3,8})$/, ks = new RegExp(`^rgb\\(${dn},${dn},${dn}\\)$`), Cs = new RegExp(`^rgb\\(${ze},${ze},${ze}\\)$`), Ds = new RegExp(`^rgba\\(${dn},${dn},${dn},${Pn}\\)$`), Ss = new RegExp(`^rgba\\(${ze},${ze},${ze},${Pn}\\)$`), As = new RegExp(`^hsl\\(${Pn},${ze},${ze}\\)$`), Fs = new RegExp(`^hsla\\(${Pn},${ze},${ze},${Pn}\\)$`), di = {
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
  hex: mi,
  // Deprecated! Use color.formatHex.
  formatHex: mi,
  formatHex8: Ns,
  formatHsl: Us,
  formatRgb: pi,
  toString: pi
});
function mi() {
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
  return t = (t + "").trim().toLowerCase(), (e = Ts.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? yi(e) : n === 3 ? new Me(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Xn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Xn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = ks.exec(t)) ? new Me(e[1], e[2], e[3], 1) : (e = Cs.exec(t)) ? new Me(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Ds.exec(t)) ? Xn(e[1], e[2], e[3], e[4]) : (e = Ss.exec(t)) ? Xn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = As.exec(t)) ? _i(e[1], e[2] / 100, e[3] / 100, 1) : (e = Fs.exec(t)) ? _i(e[1], e[2] / 100, e[3] / 100, e[4]) : di.hasOwnProperty(t) ? yi(di[t]) : t === "transparent" ? new Me(NaN, NaN, NaN, 0) : null;
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
      kr(t >= 240 ? t - 240 : t + 120, i, r),
      kr(t, i, r),
      kr(t < 120 ? t + 240 : t - 120, i, r),
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
function kr(t, e, n) {
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
function Ps(t) {
  return (t = +t) == 1 ? Eo : function(e, n) {
    return n - e ? zs(e, n, t) : jr(isNaN(e) ? n : e);
  };
}
function Eo(t, e) {
  var n = e - t;
  return n ? Ys(t, n) : jr(isNaN(t) ? e : t);
}
const ar = function t(e) {
  var n = Ps(e);
  function r(i, o) {
    var a = n((i = Ir(i)).r, (o = Ir(o)).r), l = n(i.g, o.g), u = n(i.b, o.b), s = Eo(i.opacity, o.opacity);
    return function(h) {
      return i.r = a(h), i.g = l(h), i.b = u(h), i.opacity = s(h), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Hs(t, e) {
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
  return e == null || n === "boolean" ? jr(e) : (n === "number" ? Ne : n === "string" ? (r = Je(e)) ? (e = r, ar) : Ro : e instanceof Je ? ar : e instanceof Date ? qs : Is(e) ? Hs : Array.isArray(e) ? Ws : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Vs : Ne)(t, e);
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
  function o(s, h, f, g, m, y) {
    if (s !== f || h !== g) {
      var p = m.push("translate(", null, e, null, n);
      y.push({ i: p - 4, x: Ne(s, f) }, { i: p - 2, x: Ne(h, g) });
    } else (f || g) && m.push("translate(" + f + e + g + n);
  }
  function a(s, h, f, g) {
    s !== h ? (s - h > 180 ? h += 360 : h - s > 180 && (s += 360), g.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: Ne(s, h) })) : h && f.push(i(f) + "rotate(" + h + r);
  }
  function l(s, h, f, g) {
    s !== h ? g.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: Ne(s, h) }) : h && f.push(i(f) + "skewX(" + h + r);
  }
  function u(s, h, f, g, m, y) {
    if (s !== f || h !== g) {
      var p = m.push(i(m) + "scale(", null, ",", null, ")");
      y.push({ i: p - 4, x: Ne(s, f) }, { i: p - 2, x: Ne(h, g) });
    } else (f !== 1 || g !== 1) && m.push(i(m) + "scale(" + f + "," + g + ")");
  }
  return function(s, h) {
    var f = [], g = [];
    return s = t(s), h = t(h), o(s.translateX, s.translateY, h.translateX, h.translateY, f, g), a(s.rotate, h.rotate, f, g), l(s.skewX, h.skewX, f, g), u(s.scaleX, s.scaleY, h.scaleX, h.scaleY, f, g), s = h = null, function(m) {
      for (var y = -1, p = g.length, w; ++y < p; ) f[(w = g[y]).i] = w.x(m);
      return f.join("");
    };
  };
}
var Zs = zo(Os, "px, ", "px)", "deg)"), Qs = zo(Ks, ", ", ")", ")"), pn = 0, Fn = 0, Tn = 0, Po = 1e3, lr, Nn, sr = 0, je = 0, yr = 0, Hn = typeof performance == "object" && performance.now ? performance : Date, Ho = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function ti() {
  return je || (Ho(Js), je = Hn.now() + yr);
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
  je = (sr = Hn.now()) + yr, pn = Fn = 0;
  try {
    js();
  } finally {
    pn = 0, tu(), je = 0;
  }
}
function $s() {
  var t = Hn.now(), e = t - sr;
  e > Po && (yr -= e, sr = t);
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
    e > 24 ? (t < 1 / 0 && (Fn = setTimeout(xi, t - Hn.now() - yr)), Tn && (Tn = clearInterval(Tn))) : (Tn || (sr = Hn.now(), Tn = setInterval($s, Po)), pn = 1, Ho(xi));
  }
}
function Ti(t, e, n) {
  var r = new ur();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var eu = vo("start", "end", "cancel", "interrupt"), nu = [], Wo = 0, ki = 1, Br = 2, tr = 3, Ci = 4, Gr = 5, er = 6;
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
    n.state = ki, n.timer.restart(a, n.delay, n.time), n.delay <= s && a(s - n.delay);
  }
  function a(s) {
    var h, f, g, m;
    if (n.state !== ki) return u();
    for (h in r)
      if (m = r[h], m.name === n.name) {
        if (m.state === tr) return Ti(a);
        m.state === Ci ? (m.state = er, m.timer.stop(), m.on.call("interrupt", t, t.__data__, m.index, m.group), delete r[h]) : +h < e && (m.state = er, m.timer.stop(), m.on.call("cancel", t, t.__data__, m.index, m.group), delete r[h]);
      }
    if (Ti(function() {
      n.state === tr && (n.state = Ci, n.timer.restart(l, n.delay, n.time), l(s));
    }), n.state = Br, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Br) {
      for (n.state = tr, i = new Array(g = n.tween.length), h = 0, f = -1; h < g; ++h)
        (m = n.tween[h].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = m);
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
function du(t, e, n) {
  var r, i, o;
  return function() {
    var a, l = n(this), u;
    return l == null ? void this.removeAttributeNS(t.space, t.local) : (a = this.getAttributeNS(t.space, t.local), u = l + "", a === u ? null : a === r && u === i ? o : (i = u, o = e(r = a, l)));
  };
}
function mu(t, e) {
  var n = pr(t), r = n === "transform" ? Qs : qo;
  return this.attrTween(t, typeof e == "function" ? (n.local ? du : gu)(n, r, ni(this, "attr." + t, e)) : e == null ? (n.local ? cu : uu)(n) : (n.local ? hu : fu)(n, r, e));
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
function Tu(t, e) {
  return function() {
    Ie(this, t).duration = +e.apply(this, arguments);
  };
}
function ku(t, e) {
  return e = +e, function() {
    Ie(this, t).duration = e;
  };
}
function Cu(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Tu : ku)(e, t)) : Le(this.node(), e).duration;
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
    for (var u = e[l], s = n[l], h = u.length, f = a[l] = new Array(h), g, m = 0; m < h; ++m)
      (g = u[m] || s[m]) && (f[m] = g);
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
function Pu(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Zr(t));
  for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
    for (var l = r[a], u = l.length, s = o[a] = new Array(u), h, f, g = 0; g < u; ++g)
      (h = l[g]) && (f = t.call(h, h.__data__, g, l)) && ("__data__" in h && (f.__data__ = h.__data__), s[g] = f, wr(s[g], e, n, g, s, Le(h, n)));
  return new Be(o, this._parents, e, n);
}
function Hu(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = bo(t));
  for (var r = this._groups, i = r.length, o = [], a = [], l = 0; l < i; ++l)
    for (var u = r[l], s = u.length, h, f = 0; f < s; ++f)
      if (h = u[f]) {
        for (var g = t.call(h, h.__data__, f, u), m, y = Le(h, n), p = 0, w = g.length; p < w; ++p)
          (m = g[p]) && wr(m, e, n, p, g, y);
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
    var o = mn(this, t), a = (this.style.removeProperty(t), mn(this, t));
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
    var a = mn(this, t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function Bu(t, e, n) {
  var r, i, o;
  return function() {
    var a = mn(this, t), l = n(this), u = l + "";
    return l == null && (u = l = (this.style.removeProperty(t), mn(this, t))), a === u ? null : a === r && u === i ? o : (i = u, o = e(r = a, l));
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
  select: Pu,
  selectAll: Hu,
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
  attr: mu,
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
      let m = r - a, y = i - l, p = u * u + s * s, w = m * m + y * y, D = Math.sqrt(p), E = Math.sqrt(g), x = o * Math.tan((Xr - Math.acos((p + g - w) / (2 * D * E))) / 2), W = x / E, U = x / D;
      Math.abs(W - 1) > Oe && this._append`L${e + W * h},${n + W * f}`, this._append`A${o},${o},0,0,${+(f * m > h * y)},${this._x1 = e + U * u},${this._y1 = n + U * s}`;
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
function dc(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var mc = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function fr(t) {
  if (!(e = mc.exec(t))) throw new Error("invalid format: " + t);
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
  var e = t.grouping === void 0 || t.thousands === void 0 ? Ai : gc(Fi.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", o = t.numerals === void 0 ? Ai : dc(Fi.call(t.numerals, String)), a = t.percent === void 0 ? "%" : t.percent + "", l = t.minus === void 0 ? "−" : t.minus + "", u = t.nan === void 0 ? "NaN" : t.nan + "";
  function s(f) {
    f = fr(f);
    var g = f.fill, m = f.align, y = f.sign, p = f.symbol, w = f.zero, D = f.width, E = f.comma, x = f.precision, W = f.trim, U = f.type;
    U === "n" ? (E = !0, U = "g") : Si[U] || (x === void 0 && (x = 12), W = !0, U = "g"), (w || g === "0" && m === "=") && (w = !0, g = "0", m = "=");
    var S = p === "$" ? n : p === "#" && /[boxX]/.test(U) ? "0" + U.toLowerCase() : "", Y = p === "$" ? r : /[%p]/.test(U) ? a : "", z = Si[U], K = /[defgprs%]/.test(U);
    x = x === void 0 ? 6 : /[gprs]/.test(U) ? Math.max(1, Math.min(21, x)) : Math.max(0, Math.min(20, x));
    function dt(B) {
      var O = S, b = Y, _, P, k;
      if (U === "c")
        b = z(B) + b, B = "";
      else {
        B = +B;
        var _t = B < 0 || 1 / B < 0;
        if (B = isNaN(B) ? u : z(Math.abs(B), x), W && (B = pc(B)), _t && +B == 0 && y !== "+" && (_t = !1), O = (_t ? y === "(" ? y : l : y === "-" || y === "(" ? "" : y) + O, b = (U === "s" ? Ni[8 + Xo / 3] : "") + b + (_t && y === "(" ? ")" : ""), K) {
          for (_ = -1, P = B.length; ++_ < P; )
            if (k = B.charCodeAt(_), 48 > k || k > 57) {
              b = (k === 46 ? i + B.slice(_ + 1) : B.slice(_)) + b, B = B.slice(0, _);
              break;
            }
        }
      }
      E && !w && (B = e(B, 1 / 0));
      var yt = O.length + B.length + b.length, ht = yt < D ? new Array(D - yt + 1).join(g) : "";
      switch (E && w && (B = e(ht + B, ht.length ? D - b.length : 1 / 0), ht = ""), m) {
        case "<":
          B = O + B + b + ht;
          break;
        case "=":
          B = O + ht + B + b;
          break;
        case "^":
          B = ht.slice(0, yt = ht.length >> 1) + O + B + b + ht.slice(yt);
          break;
        default:
          B = ht + O + B + b;
          break;
      }
      return o(B);
    }
    return dt.toString = function() {
      return f + "";
    }, dt;
  }
  function h(f, g) {
    var m = s((f = fr(f), f.type = "f", f)), y = Math.max(-8, Math.min(8, Math.floor(yn(g) / 3))) * 3, p = Math.pow(10, -y), w = Ni[8 + y / 3];
    return function(D) {
      return m(p * D) + w;
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
function Tc(t) {
  return function() {
    return t;
  };
}
function kc(t) {
  return +t;
}
var Ui = [0, 1];
function hn(t) {
  return t;
}
function Kr(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : Tc(isNaN(e) ? NaN : 0.5);
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
    return arguments.length ? (t = Array.from(g, kc), h()) : t.slice();
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
  }, function(g, m) {
    return r = g, i = m, h();
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
const Ec = 1e3, ii = Ec * 60, Rc = ii * 60, Wn = Rc * 24, Zo = Wn * 7, ke = We(
  (t) => t.setHours(0, 0, 0, 0),
  (t, e) => t.setDate(t.getDate() + e),
  (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * ii) / Wn,
  (t) => t.getDate() - 1
);
ke.range;
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
const Qo = on(0), hr = on(1), zc = on(2), Pc = on(3), wn = on(4), Hc = on(5), Ic = on(6);
Qo.range;
hr.range;
zc.range;
Pc.range;
wn.range;
Hc.range;
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
function kn(t, e, n) {
  return { y: t, m: e, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function Gc(t) {
  var e = t.dateTime, n = t.date, r = t.time, i = t.periods, o = t.days, a = t.shortDays, l = t.months, u = t.shortMonths, s = Cn(i), h = Dn(i), f = Cn(o), g = Dn(o), m = Cn(a), y = Dn(a), p = Cn(l), w = Dn(l), D = Cn(u), E = Dn(u), x = {
    a: _t,
    A: yt,
    b: ht,
    B: mt,
    c: null,
    d: Pi,
    e: Pi,
    f: mf,
    g: kf,
    G: Df,
    H: hf,
    I: gf,
    j: df,
    L: jo,
    m: pf,
    M: yf,
    p: Nt,
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
    y: Tf,
    Y: Cf,
    Z: Sf,
    "%": Ii
  }, W = {
    a: F,
    A: M,
    b: $,
    B: ut,
    c: null,
    d: Hi,
    e: Hi,
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
    q: pt,
    Q: Wi,
    s: qi,
    S: Rf,
    u: Yf,
    U: zf,
    V: Pf,
    w: Hf,
    W: If,
    x: null,
    X: null,
    y: Wf,
    Y: Vf,
    Z: Gf,
    "%": Ii
  }, U = {
    a: dt,
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
    x: P,
    X: k,
    y: Ri,
    Y: Ei,
    Z: tf,
    "%": uf
  };
  x.x = S(n, x), x.X = S(r, x), x.c = S(e, x), W.x = S(n, W), W.X = S(r, W), W.c = S(e, W);
  function S(L, q) {
    return function(ot) {
      var T = [], bt = -1, v = 0, Mt = L.length, at, Ct, gt;
      for (ot instanceof Date || (ot = /* @__PURE__ */ new Date(+ot)); ++bt < Mt; )
        L.charCodeAt(bt) === 37 && (T.push(L.slice(v, bt)), (Ct = Li[at = L.charAt(++bt)]) != null ? at = L.charAt(++bt) : Ct = at === "e" ? " " : "0", (gt = q[at]) && (at = gt(ot, Ct)), T.push(at), v = bt + 1);
      return T.push(L.slice(v, bt)), T.join("");
    };
  }
  function Y(L, q) {
    return function(ot) {
      var T = kn(1900, void 0, 1), bt = z(T, L, ot += "", 0), v, Mt;
      if (bt != ot.length) return null;
      if ("Q" in T) return new Date(T.Q);
      if ("s" in T) return new Date(T.s * 1e3 + ("L" in T ? T.L : 0));
      if (q && !("Z" in T) && (T.Z = 0), "p" in T && (T.H = T.H % 12 + T.p * 12), T.m === void 0 && (T.m = "q" in T ? T.q : 0), "V" in T) {
        if (T.V < 1 || T.V > 53) return null;
        "w" in T || (T.w = 1), "Z" in T ? (v = Fr(kn(T.y, 0, 1)), Mt = v.getUTCDay(), v = Mt > 4 || Mt === 0 ? gr.ceil(v) : gr(v), v = oi.offset(v, (T.V - 1) * 7), T.y = v.getUTCFullYear(), T.m = v.getUTCMonth(), T.d = v.getUTCDate() + (T.w + 6) % 7) : (v = Ar(kn(T.y, 0, 1)), Mt = v.getDay(), v = Mt > 4 || Mt === 0 ? hr.ceil(v) : hr(v), v = ke.offset(v, (T.V - 1) * 7), T.y = v.getFullYear(), T.m = v.getMonth(), T.d = v.getDate() + (T.w + 6) % 7);
      } else ("W" in T || "U" in T) && ("w" in T || (T.w = "u" in T ? T.u % 7 : "W" in T ? 1 : 0), Mt = "Z" in T ? Fr(kn(T.y, 0, 1)).getUTCDay() : Ar(kn(T.y, 0, 1)).getDay(), T.m = 0, T.d = "W" in T ? (T.w + 6) % 7 + T.W * 7 - (Mt + 5) % 7 : T.w + T.U * 7 - (Mt + 6) % 7);
      return "Z" in T ? (T.H += T.Z / 100 | 0, T.M += T.Z % 100, Fr(T)) : Ar(T);
    };
  }
  function z(L, q, ot, T) {
    for (var bt = 0, v = q.length, Mt = ot.length, at, Ct; bt < v; ) {
      if (T >= Mt) return -1;
      if (at = q.charCodeAt(bt++), at === 37) {
        if (at = q.charAt(bt++), Ct = U[at in Li ? q.charAt(bt++) : at], !Ct || (T = Ct(L, ot, T)) < 0) return -1;
      } else if (at != ot.charCodeAt(T++))
        return -1;
    }
    return T;
  }
  function K(L, q, ot) {
    var T = s.exec(q.slice(ot));
    return T ? (L.p = h.get(T[0].toLowerCase()), ot + T[0].length) : -1;
  }
  function dt(L, q, ot) {
    var T = m.exec(q.slice(ot));
    return T ? (L.w = y.get(T[0].toLowerCase()), ot + T[0].length) : -1;
  }
  function B(L, q, ot) {
    var T = f.exec(q.slice(ot));
    return T ? (L.w = g.get(T[0].toLowerCase()), ot + T[0].length) : -1;
  }
  function O(L, q, ot) {
    var T = D.exec(q.slice(ot));
    return T ? (L.m = E.get(T[0].toLowerCase()), ot + T[0].length) : -1;
  }
  function b(L, q, ot) {
    var T = p.exec(q.slice(ot));
    return T ? (L.m = w.get(T[0].toLowerCase()), ot + T[0].length) : -1;
  }
  function _(L, q, ot) {
    return z(L, e, q, ot);
  }
  function P(L, q, ot) {
    return z(L, n, q, ot);
  }
  function k(L, q, ot) {
    return z(L, r, q, ot);
  }
  function _t(L) {
    return a[L.getDay()];
  }
  function yt(L) {
    return o[L.getDay()];
  }
  function ht(L) {
    return u[L.getMonth()];
  }
  function mt(L) {
    return l[L.getMonth()];
  }
  function Nt(L) {
    return i[+(L.getHours() >= 12)];
  }
  function j(L) {
    return 1 + ~~(L.getMonth() / 3);
  }
  function F(L) {
    return a[L.getUTCDay()];
  }
  function M(L) {
    return o[L.getUTCDay()];
  }
  function $(L) {
    return u[L.getUTCMonth()];
  }
  function ut(L) {
    return l[L.getUTCMonth()];
  }
  function xt(L) {
    return i[+(L.getUTCHours() >= 12)];
  }
  function pt(L) {
    return 1 + ~~(L.getUTCMonth() / 3);
  }
  return {
    format: function(L) {
      var q = S(L += "", x);
      return q.toString = function() {
        return L;
      }, q;
    },
    parse: function(L) {
      var q = Y(L += "", !1);
      return q.toString = function() {
        return L;
      }, q;
    },
    utcFormat: function(L) {
      var q = S(L += "", W);
      return q.toString = function() {
        return L;
      }, q;
    },
    utcParse: function(L) {
      var q = Y(L += "", !0);
      return q.toString = function() {
        return L;
      }, q;
    }
  };
}
var Li = { "-": "", _: " ", 0: "0" }, se = /^\s*\d+/, Xc = /^%/, Oc = /[\\^$*+?|[\]().{}]/g;
function Ht(t, e, n) {
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
function Pi(t, e) {
  return Ht(t.getDate(), e, 2);
}
function hf(t, e) {
  return Ht(t.getHours(), e, 2);
}
function gf(t, e) {
  return Ht(t.getHours() % 12 || 12, e, 2);
}
function df(t, e) {
  return Ht(1 + ke.count($e(t), t), e, 3);
}
function jo(t, e) {
  return Ht(t.getMilliseconds(), e, 3);
}
function mf(t, e) {
  return jo(t, e) + "000";
}
function pf(t, e) {
  return Ht(t.getMonth() + 1, e, 2);
}
function yf(t, e) {
  return Ht(t.getMinutes(), e, 2);
}
function wf(t, e) {
  return Ht(t.getSeconds(), e, 2);
}
function vf(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function _f(t, e) {
  return Ht(Qo.count($e(t) - 1, t), e, 2);
}
function $o(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? wn(t) : wn.ceil(t);
}
function bf(t, e) {
  return t = $o(t), Ht(wn.count($e(t), t) + ($e(t).getDay() === 4), e, 2);
}
function Mf(t) {
  return t.getDay();
}
function xf(t, e) {
  return Ht(hr.count($e(t) - 1, t), e, 2);
}
function Tf(t, e) {
  return Ht(t.getFullYear() % 100, e, 2);
}
function kf(t, e) {
  return t = $o(t), Ht(t.getFullYear() % 100, e, 2);
}
function Cf(t, e) {
  return Ht(t.getFullYear() % 1e4, e, 4);
}
function Df(t, e) {
  var n = t.getDay();
  return t = n >= 4 || n === 0 ? wn(t) : wn.ceil(t), Ht(t.getFullYear() % 1e4, e, 4);
}
function Sf(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + Ht(e / 60 | 0, "0", 2) + Ht(e % 60, "0", 2);
}
function Hi(t, e) {
  return Ht(t.getUTCDate(), e, 2);
}
function Af(t, e) {
  return Ht(t.getUTCHours(), e, 2);
}
function Ff(t, e) {
  return Ht(t.getUTCHours() % 12 || 12, e, 2);
}
function Nf(t, e) {
  return Ht(1 + oi.count(tn(t), t), e, 3);
}
function ta(t, e) {
  return Ht(t.getUTCMilliseconds(), e, 3);
}
function Uf(t, e) {
  return ta(t, e) + "000";
}
function Lf(t, e) {
  return Ht(t.getUTCMonth() + 1, e, 2);
}
function Ef(t, e) {
  return Ht(t.getUTCMinutes(), e, 2);
}
function Rf(t, e) {
  return Ht(t.getUTCSeconds(), e, 2);
}
function Yf(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function zf(t, e) {
  return Ht(Jo.count(tn(t) - 1, t), e, 2);
}
function ea(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? vn(t) : vn.ceil(t);
}
function Pf(t, e) {
  return t = ea(t), Ht(vn.count(tn(t), t) + (tn(t).getUTCDay() === 4), e, 2);
}
function Hf(t) {
  return t.getUTCDay();
}
function If(t, e) {
  return Ht(gr.count(tn(t) - 1, t), e, 2);
}
function Wf(t, e) {
  return Ht(t.getUTCFullYear() % 100, e, 2);
}
function qf(t, e) {
  return t = ea(t), Ht(t.getUTCFullYear() % 100, e, 2);
}
function Vf(t, e) {
  return Ht(t.getUTCFullYear() % 1e4, e, 4);
}
function Bf(t, e) {
  var n = t.getUTCDay();
  return t = n >= 4 || n === 0 ? vn(t) : vn.ceil(t), Ht(t.getUTCFullYear() % 1e4, e, 4);
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
var cn, Pe, ai;
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
  return cn = Gc(t), Pe = cn.format, cn.parse, ai = cn.utcFormat, cn.utcParse, cn;
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
    var s, h = (u = ra(u)).length, f, g = !1, m;
    for (r == null && (o = i(m = a())), s = 0; s <= h; ++s)
      !(s < h && n(f = u[s], s, u)) === g && ((g = !g) ? o.lineStart() : o.lineEnd()), g && o.point(+t(f, s, u), +e(f, s, u));
    if (m) return o = null, m + "" || null;
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
    var g, m, y, p = (f = ra(f)).length, w, D = !1, E, x = new Array(p), W = new Array(p);
    for (o == null && (l = a(E = u())), g = 0; g <= p; ++g) {
      if (!(g < p && i(w = f[g], g, f)) === D)
        if (D = !D)
          m = g, l.areaStart(), l.lineStart();
        else {
          for (l.lineEnd(), l.lineStart(), y = g - 1; y >= m; --y)
            l.point(x[y], W[y]);
          l.lineEnd(), l.areaEnd();
        }
      D && (x[g] = +t(w, g, f), W[g] = +e(w, g, f), l.point(r ? +r(w, g, f) : x[g], n ? +n(w, g, f) : W[g]));
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
function dr(t) {
  this._context = t;
}
dr.prototype = {
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
Object.create(dr.prototype).point = function(t, e) {
  dr.prototype.point.call(this, e, t);
};
function Ur(t) {
  return new dr(t);
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
}, He = {
  general: Of,
  tight: Kf,
  pregnancy: Zf
};
function Qf(t) {
  let e, n, r, i, o, a, l, u = (
    /*showCanvas*/
    t[0] ? "-" : "="
  ), s, h, f, g, m, y, p, w, D, E, x, W, U, S, Y, z, K, dt, B, O, b, _, P, k, _t, yt, ht, mt, Nt, j, F, M;
  return {
    c() {
      e = tt("div"), n = tt("canvas"), i = wt(), o = tt("div"), a = tt("div"), l = tt("button"), s = Q(u), h = wt(), f = tt("div"), g = Q(
        /*periodLabel*/
        t[5]
      ), m = wt(), y = tt("div"), p = tt("div"), w = tt("button"), D = Q("1d"), x = wt(), W = tt("button"), U = Q("3d"), Y = wt(), z = tt("button"), K = Q("1w"), B = wt(), O = tt("button"), b = Q("2w"), P = wt(), k = tt("button"), _t = Q("1m"), ht = wt(), mt = tt("button"), Nt = Q("3m"), c(n, "style", r = `width:100%; display:${/*showCanvas*/
      t[0] ? "block" : "none"}; border:0; padding-bottom: 10px;`), c(l, "type", "button"), c(l, "class", "qbtn svelte-1xibldd"), c(l, "title", "Hide/show calendar canvas"), X(a, "display", "flex"), X(a, "gap", "8px"), X(a, "align-items", "center"), X(a, "justify-content", "flex-end"), X(a, "flex", "0 0 auto"), X(f, "text-align", "left"), X(f, "color", "#000"), X(f, "font-size", "12px"), X(f, "font-weight", "600"), X(f, "min-width", "160px"), X(f, "flex", "1 1 auto"), c(w, "type", "button"), c(w, "class", E = te(`qbtn ${/*activeSpan*/
      t[4] === 1 ? "active" : ""}`) + " svelte-1xibldd"), c(W, "type", "button"), c(W, "class", S = te(`qbtn ${/*activeSpan*/
      t[4] === 3 ? "active" : ""}`) + " svelte-1xibldd"), c(z, "type", "button"), c(z, "class", dt = te(`qbtn ${/*activeSpan*/
      t[4] === 7 ? "active" : ""}`) + " svelte-1xibldd"), c(O, "type", "button"), c(O, "class", _ = te(`qbtn ${/*activeSpan*/
      t[4] === 14 ? "active" : ""}`) + " svelte-1xibldd"), c(k, "type", "button"), c(k, "class", yt = te(`qbtn ${/*activeSpan*/
      t[4] === 30 ? "active" : ""}`) + " svelte-1xibldd"), c(mt, "type", "button"), c(mt, "class", j = te(`qbtn ${/*activeSpan*/
      t[4] === 90 ? "active" : ""}`) + " svelte-1xibldd"), X(p, "display", "flex"), X(p, "gap", "16px"), X(p, "flex-wrap", "wrap"), X(p, "justify-content", "flex-end"), X(y, "display", "flex"), X(y, "align-items", "center"), X(y, "gap", "20px"), X(y, "justify-content", "flex-end"), X(y, "margin-left", "auto"), c(o, "id", "controlBar"), X(o, "display", "none"), X(o, "align-items", "center"), X(o, "gap", "12px"), X(o, "flex-wrap", "wrap"), X(o, "margin", "0 0 6px"), c(e, "class", "cgm-widget"), X(e, "contain", "layout");
    },
    m($, ut) {
      Ft($, e, ut), d(e, n), t[19](n), d(e, i), d(e, o), d(o, a), d(a, l), d(l, s), d(o, h), d(o, f), d(f, g), t[21](f), d(o, m), d(o, y), d(y, p), d(p, w), d(w, D), d(p, x), d(p, W), d(W, U), d(p, Y), d(p, z), d(z, K), d(p, B), d(p, O), d(O, b), d(p, P), d(p, k), d(k, _t), d(p, ht), d(p, mt), d(mt, Nt), t[28](e), F || (M = [
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
          k,
          "click",
          /*click_handler_5*/
          t[26]
        ),
        oe(
          mt,
          "click",
          /*click_handler_6*/
          t[27]
        )
      ], F = !0);
    },
    p($, ut) {
      ut[0] & /*showCanvas*/
      1 && r !== (r = `width:100%; display:${/*showCanvas*/
      $[0] ? "block" : "none"}; border:0; padding-bottom: 10px;`) && c(n, "style", r), ut[0] & /*showCanvas*/
      1 && u !== (u = /*showCanvas*/
      $[0] ? "-" : "=") && Vt(s, u), ut[0] & /*periodLabel*/
      32 && Vt(
        g,
        /*periodLabel*/
        $[5]
      ), ut[0] & /*activeSpan*/
      16 && E !== (E = te(`qbtn ${/*activeSpan*/
      $[4] === 1 ? "active" : ""}`) + " svelte-1xibldd") && c(w, "class", E), ut[0] & /*activeSpan*/
      16 && S !== (S = te(`qbtn ${/*activeSpan*/
      $[4] === 3 ? "active" : ""}`) + " svelte-1xibldd") && c(W, "class", S), ut[0] & /*activeSpan*/
      16 && dt !== (dt = te(`qbtn ${/*activeSpan*/
      $[4] === 7 ? "active" : ""}`) + " svelte-1xibldd") && c(z, "class", dt), ut[0] & /*activeSpan*/
      16 && _ !== (_ = te(`qbtn ${/*activeSpan*/
      $[4] === 14 ? "active" : ""}`) + " svelte-1xibldd") && c(O, "class", _), ut[0] & /*activeSpan*/
      16 && yt !== (yt = te(`qbtn ${/*activeSpan*/
      $[4] === 30 ? "active" : ""}`) + " svelte-1xibldd") && c(k, "class", yt), ut[0] & /*activeSpan*/
      16 && j !== (j = te(`qbtn ${/*activeSpan*/
      $[4] === 90 ? "active" : ""}`) + " svelte-1xibldd") && c(mt, "class", j);
    },
    i: ae,
    o: ae,
    d($) {
      $ && At(e), t[19](null), t[21](null), t[28](null), F = !1, Ge(M);
    }
  };
}
const Se = 54;
function Jf(t, e, n) {
  let { data: r } = e, { initialRange: i = null } = e, { externalRange: o = null } = e, { preset: a = "general" } = e, { showMonthLabels: l = !0 } = e, { showData: u = !0 } = e, { showCanvas: s = !0 } = e, { selectionStroke: h = "#111" } = e, { selectionFill: f = "transparent" } = e;
  const g = mr();
  let m, y, p;
  const w = { l: 48, r: 12, t: 8, b: 8 }, D = [1, 7, 14, 21, 30, 90];
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
  function x(N, V) {
    try {
      return (getComputedStyle(p).getPropertyValue(N) || "").trim() || V;
    } catch {
      return V;
    }
  }
  function W() {
    E = {
      bg: x("--cgm-bg", E.bg),
      grid: x("--cgm-grid", E.grid),
      text: x("--cgm-text", E.text),
      muted: x("--cgm-muted", E.muted),
      selFill: x("--cgm-selection-fill", E.selFill),
      selStroke: x("--cgm-selection-stroke", E.selStroke),
      vlow: x("--cgm-very-low", E.vlow),
      low: x("--cgm-low", E.low),
      inrange: x("--cgm-in-range", E.inrange),
      high: x("--cgm-high", E.high),
      vhigh: x("--cgm-very-high", E.vhigh)
    };
  }
  let U, S, Y = 24 * 60 * 60 * 1e3;
  const z = () => new Date(r.t0).getTime(), K = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), dt = () => K() ? "mmol" : "mg";
  function B() {
    return He[a].thresholds[dt()];
  }
  let O = 0, b = 0, _ = 0, P = 0;
  function k(N) {
    let V = D[0], rt = 1 / 0;
    for (const Z of D) {
      const J = Math.abs(Z - N);
      J < rt && (rt = J, V = Z);
    }
    return V;
  }
  function _t() {
    return Math.max(1, Math.floor((P - _) / Y) + 1);
  }
  let yt = 14;
  const ht = (N) => {
    const V = new Date(N);
    return Date.UTC(V.getUTCFullYear(), V.getUTCMonth(), V.getUTCDate());
  };
  let mt;
  function Nt() {
    mt = /* @__PURE__ */ new Map();
    for (let N = 0; N < S.length; N++) {
      const V = S[N];
      if (!(Number.isFinite(V) && V >= 0)) continue;
      const rt = ht(U[N]);
      let Z = mt.get(rt);
      Z || (Z = { valid: 0, vl: 0, l: 0, t: 0, h: 0, vh: 0 }, mt.set(rt, Z)), Z.valid++;
      const J = B();
      V < J.veryLow ? Z.vl++ : V < J.low ? Z.l++ : V <= J.high ? Z.t++ : V <= J.veryHigh ? Z.h++ : Z.vh++;
    }
  }
  function j() {
    n(15, U = Float64Array.from({ length: r.glucose.length }, (N, V) => z() + V * r.stepMs)), n(16, S = Float64Array.from(r.glucose)), O = ht(U[0]), b = ht(U[U.length - 1]), n(17, _ = (i == null ? void 0 : i.start) ?? O), n(18, P = (i == null ? void 0 : i.end) ?? b), Nt();
  }
  let F;
  function M() {
    if (!m || !(mt != null && mt.size)) return;
    const N = Math.max(1, window.devicePixelRatio || 1), V = Math.max(320, m.getBoundingClientRect().width || 900), rt = new Date(O).getUTCFullYear(), Z = new Date(b).getUTCFullYear(), J = zr(rt, Z + 1), It = l ? 24 : w.b, Rt = w.t + J.length * Se + It;
    n(1, m.style.width = V + "px", m), n(1, m.style.height = Rt + "px", m), n(1, m.width = Math.floor(V * N), m), n(1, m.height = Math.floor(Rt * N), m), F.setTransform(N, 0, 0, N, 0, 0), F.clearRect(0, 0, V, Rt), F.fillStyle = E.bg, F.fillRect(0, 0, V, Rt);
    const Bt = V - w.l - w.r;
    if (F.strokeStyle = E.grid, F.lineWidth = 1, J.forEach((zt, ne) => {
      const Kt = w.t + ne * Se;
      for (let St = 1; St < 12; St++) {
        const it = Date.UTC(zt, St, 1);
        if (it < O || it > b) continue;
        const C = (Date.UTC(zt + 1, 0, 1) - Date.UTC(zt, 0, 1)) / Y, R = w.l + Math.round((it - Date.UTC(zt, 0, 1)) / Y * (Bt / C));
        F.beginPath(), F.moveTo(R, Kt + 6), F.lineTo(R, Kt + Se - 6), F.stroke();
      }
    }), J.forEach((zt, ne) => {
      const Kt = w.t + ne * Se;
      F.fillStyle = "#444", F.font = "12px system-ui, sans-serif", F.textAlign = "right", F.textBaseline = "middle", F.fillText(String(zt), w.l - 8, Kt + Se / 2);
      const St = Date.UTC(zt, 0, 1), it = Date.UTC(zt + 1, 0, 1) - Y, C = Math.round((Date.UTC(zt + 1, 0, 1) - Date.UTC(zt, 0, 1)) / Y), R = (H) => w.l + Math.floor((H - Date.UTC(zt, 0, 1)) / Y * (Bt / C)), G = Se - 10, I = Kt + 5;
      if (!u) {
        F.fillStyle = x("--cgm-target-band-bg", "#efefef");
        for (let H = Math.max(St, O); H <= Math.min(it, b); H += Y) {
          const et = R(H), A = R(H + Y), vt = Math.max(1, A - et);
          F.fillRect(et, I, vt, G);
        }
        return;
      }
      for (let H = Math.max(St, O); H <= Math.min(it, b); H += Y) {
        const et = R(H), A = R(H + Y), vt = Math.max(1, A - et), lt = mt.get(H);
        if (!lt || !lt.valid) {
          F.fillStyle = x("--cgm-target-band-bg", "#efefef"), F.globalAlpha = 1, F.fillRect(et, I, vt, G);
          continue;
        }
        const Ot = Math.max(1, Math.round(Y / r.stepMs)), Ut = {
          vl: lt.vl / lt.valid,
          l: lt.l / lt.valid,
          t: lt.t / lt.valid,
          h: lt.h / lt.valid,
          vh: lt.vh / lt.valid
        };
        let ft = I + G;
        const jt = (ee, qt, Qt) => {
          const Pt = Math.round(qt * G);
          Pt <= 0 || (ft -= Pt, F.fillStyle = ee, F.globalAlpha = Qt, F.fillRect(et, ft, vt, Pt));
        }, Wt = lt.valid / Ot >= 0.5 ? 0.8 : 0.4, Zt = lt.valid / Ot >= 0.5 ? 0.9 : 0.6;
        jt(E.vlow, Ut.vl, Wt), jt(E.low, Ut.l, Wt), jt(E.inrange, Ut.t, Zt), jt(E.high, Ut.h, Wt), jt(E.vhigh, Ut.vh, Wt), F.globalAlpha = 1;
      }
    }), u) {
      const zt = Math.max(O, Math.min(b, _)), ne = Math.max(O, Math.min(b, P));
      J.forEach((Kt, St) => {
        const it = w.t + St * Se, C = Date.UTC(Kt, 0, 1), R = Date.UTC(Kt + 1, 0, 1) - 1, G = Math.max(C, zt), I = Math.min(R, ne);
        if (G > I) return;
        const H = (Date.UTC(Kt + 1, 0, 1) - Date.UTC(Kt, 0, 1)) / Y, et = (ft) => w.l + Math.floor((ft - Date.UTC(Kt, 0, 1)) / Y * (Bt / H)), A = et(G), vt = et(I + 1), lt = it + 5, Ot = Se - 10;
        F.save(), f && f !== "none" && f !== "transparent" && (F.fillStyle = f, F.fillRect(A, lt, Math.max(1, vt - A), Ot));
        const Ut = h && h !== "#111" ? h : E.selStroke;
        F.strokeStyle = Ut, F.lineWidth = 1.5, F.beginPath(), F.moveTo(A + 0.5, lt + 0.5), F.lineTo(A + 0.5, lt + Ot - 0.5), F.stroke(), F.beginPath(), F.moveTo(vt - 0.5, lt + 0.5), F.lineTo(vt - 0.5, lt + Ot - 0.5), F.stroke(), F.restore();
      });
    }
    if (l) {
      const zt = ai("%b"), ne = J[J.length - 1], Kt = Date.UTC(ne, 0, 1), it = (Date.UTC(ne + 1, 0, 1) - Kt) / Y, C = (I) => w.l + Math.round((I - Kt) / Y * (Bt / it)), G = w.t + (J.length - 1) * Se + Se - 5 + 0.5;
      F.save(), F.strokeStyle = "#bbb", F.lineWidth = 1, F.fillStyle = E.muted, F.font = "11px var(--cgm-font, system-ui, sans-serif)", F.textAlign = "center", F.textBaseline = "top";
      for (let I = 0; I < 12; I++) {
        const H = Date.UTC(ne, I, 1), et = C(H);
        F.beginPath(), F.moveTo(et, G), F.lineTo(et, G + 4), F.stroke(), F.fillText(zt(new Date(Date.UTC(2e3, I, 1))), et, G + 6);
      }
      F.restore();
    }
  }
  function $(N, V) {
    const rt = new Date(N), Z = new Date(V), J = Pe("%b %e"), It = Pe("%b %e, %Y"), Rt = Pe("%e, %Y"), Bt = Date.UTC(rt.getUTCFullYear(), rt.getUTCMonth(), rt.getUTCDate()), zt = Date.UTC(Z.getUTCFullYear(), Z.getUTCMonth(), Z.getUTCDate());
    return Bt === zt ? It(Z) : rt.getFullYear() === Z.getFullYear() ? rt.getMonth() === Z.getMonth() ? `${J(rt)} – ${Rt(Z)}` : `${J(rt)} – ${It(Z)}` : `${It(rt)} – ${It(Z)}`;
  }
  let ut = "";
  function xt() {
    if (!U || !S) return;
    const N = _t();
    n(4, yt = k(N));
    const V = Math.max(0, Math.ceil((_ - U[0]) / r.stepMs)), rt = Math.min(S.length - 1, Math.floor((P - U[0]) / r.stepMs));
    try {
      typeof window < "u" && window.CGM_DEBUG && console.log("[CgmTir] rangechange", {
        startISO: new Date(_).toISOString(),
        endISO: new Date(P).toISOString(),
        days: N,
        startIdx: V,
        endIdx: rt
      });
    } catch {
    }
    g("rangechange", {
      start: _,
      end: P,
      days: N,
      startIdx: V,
      endIdx: rt
    });
  }
  function pt(N) {
    const V = Y;
    let rt = Math.max(O + V - 1, Math.min(b, P)), Z = rt - N * V + 1;
    Z < O && (Z = O, rt = Math.min(b, Z + N * V - 1)), n(17, _ = Z), n(18, P = rt), xt(), M();
  }
  function L(N) {
    const V = _ + N * Y, rt = P + N * Y, Z = Math.max(Y, rt - V);
    n(17, _ = Math.max(O, Math.min(b - Z, V))), n(18, P = Math.min(b, _ + Z)), xt(), M();
  }
  function q(N) {
    const V = _t() * Y * N;
    L(V / Y);
  }
  function ot() {
    const N = m;
    let V = !1, rt = null, Z = null, J = 0, It = 0;
    const Rt = 6, Bt = (St) => {
      const it = new Date(St);
      return Date.UTC(it.getUTCFullYear(), it.getUTCMonth(), it.getUTCDate());
    };
    function zt() {
      const St = Math.max(320, N.getBoundingClientRect().width || 900), it = St - w.l - w.r, C = zr(new Date(O).getUTCFullYear(), new Date(b).getUTCFullYear() + 1);
      return { cssW: St, plotW: it, years: C };
    }
    function ne(St, it) {
      const C = (Date.UTC(St + 1, 0, 1) - Date.UTC(St, 0, 1)) / Y;
      return (R) => w.l + Math.floor((R - Date.UTC(St, 0, 1)) / Y * (it / C));
    }
    function Kt(St) {
      const it = N.getBoundingClientRect(), C = St.clientX - it.left, R = St.clientY - it.top, { cssW: G, years: I } = zt(), H = Math.floor((R - 8) / Se);
      if (H < 0 || H >= I.length) return null;
      const et = I[H], A = w.l, vt = G - w.r, lt = Math.max(A, Math.min(vt, C)), Ot = (Date.UTC(et + 1, 0, 1) - Date.UTC(et, 0, 1)) / Y, Ut = (lt - A) / (vt - A);
      let ft = Date.UTC(et, 0, 1) + Ut * Ot * Y;
      return ft = Math.max(O, Math.min(b, ft)), { t: ft, yr: et, x: lt, rowIdx: H };
    }
    N.addEventListener("mousedown", (St) => {
      const it = Kt(St);
      if (!it) return;
      const { plotW: C } = zt(), R = ne(it.yr, C), G = R(Math.max(Date.UTC(it.yr, 0, 1), _)), I = R(Math.min(Date.UTC(it.yr + 1, 0, 1) - 1, P)) + 1;
      rt = "new", it.x >= G - Rt && it.x <= G + Rt ? rt = "resize-l" : it.x >= I - Rt && it.x <= I + Rt ? rt = "resize-r" : it.x > G && it.x < I && (rt = "move"), V = !0, Z = it.t, J = _, It = P, document.body.style.userSelect = "none", N.style.cursor = rt === "move" ? "grabbing" : rt === "new" ? "crosshair" : "col-resize";
    }), window.addEventListener("mousemove", (St) => {
      const it = Kt(St);
      if (!it) {
        V || (N.style.cursor = "crosshair");
        return;
      }
      if (!V) {
        const { plotW: G } = zt(), I = ne(it.yr, G), H = I(Math.max(Date.UTC(it.yr, 0, 1), _)), et = I(Math.min(Date.UTC(it.yr + 1, 0, 1) - 1, P)) + 1;
        it.x >= H - Rt && it.x <= H + Rt || it.x >= et - Rt && it.x <= et + Rt ? N.style.cursor = "col-resize" : it.x > H && it.x < et ? N.style.cursor = "grab" : N.style.cursor = "crosshair";
        return;
      }
      const C = it.t, R = Y;
      if (rt === "new") {
        const G = Bt(Math.min(Z, C)), I = Bt(Math.max(Z, C));
        let H = Math.max(1, Math.floor((I - G) / R) + 1);
        const et = k(H);
        if (C >= Z) {
          let A = G, vt = A + et * R - 1;
          vt > b && (vt = b, A = Math.max(O, vt - et * R + 1)), n(17, _ = A), n(18, P = vt);
        } else {
          let A = I + R - 1, vt = A - et * R + 1;
          vt < O && (vt = O, A = Math.min(b, vt + et * R - 1)), n(17, _ = vt), n(18, P = A);
        }
      } else if (rt === "resize-l") {
        const G = Math.max(1, Math.floor((It - Bt(Math.min(C, It - R + 1)) + 1) / R)), I = k(G);
        let H = It - I * R + 1;
        H = Math.max(O, Math.min(H, It - R + 1)), n(17, _ = H), n(18, P = It);
      } else if (rt === "resize-r") {
        const G = Math.max(1, Math.floor((Bt(C) + R - 1 - J + 1) / R)), I = k(G);
        let H = J + I * R - 1;
        H = Math.min(b, Math.max(H, J + R - 1)), n(17, _ = J), n(18, P = H);
      } else if (rt === "move") {
        const G = Math.round((Bt(C) - Bt(Z)) / R), I = It - J + 1;
        let H = J + G * R;
        H = Math.max(O, Math.min(b - I + 1, H)), n(17, _ = H), n(18, P = H + I - 1);
      }
      xt(), M();
    }), window.addEventListener("mouseup", () => {
      V && (V = !1, rt = null, Z = null, document.body.style.userSelect = "", N.style.cursor = "crosshair");
    });
  }
  _n(() => {
    F = m.getContext("2d"), W(), j(), M();
    const N = Math.max(0, Math.ceil((_ - U[0]) / r.stepMs)), V = Math.min(S.length - 1, Math.floor((P - U[0]) / r.stepMs));
    g("ready", {
      start: _,
      end: P,
      startIdx: N,
      endIdx: V,
      days: _t()
    }), xt(), ot();
    const rt = () => M(), Z = (J) => {
      const It = J.target && J.target.tagName ? J.target.tagName.toLowerCase() : "";
      if (!(It === "input" || It === "textarea" || It === "select" || J.defaultPrevented)) {
        if (/^[1-6]$/.test(J.key)) {
          const Bt = {
            1: 1,
            2: 7,
            3: 14,
            4: 21,
            5: 30,
            6: 90
          }[J.key];
          pt(Bt), J.preventDefault();
          return;
        }
        if (J.key === "ArrowLeft" || J.key === "ArrowRight") {
          J.shiftKey ? q(J.key === "ArrowLeft" ? -1 : 1) : L(J.key === "ArrowLeft" ? -1 : 1), J.preventDefault();
          return;
        }
      }
    };
    return window.addEventListener("resize", rt), window.addEventListener("keydown", Z), () => {
      window.removeEventListener("resize", rt), window.removeEventListener("keydown", Z);
    };
  });
  function T(N) {
    De[N ? "unshift" : "push"](() => {
      m = N, n(1, m);
    });
  }
  const bt = () => {
    n(0, s = !s);
  };
  function v(N) {
    De[N ? "unshift" : "push"](() => {
      y = N, n(2, y);
    });
  }
  const Mt = () => pt(1), at = () => pt(3), Ct = () => pt(7), gt = () => pt(14), Et = () => pt(30), Dt = () => pt(90);
  function ct(N) {
    De[N ? "unshift" : "push"](() => {
      p = N, n(3, p);
    });
  }
  return t.$$set = (N) => {
    "data" in N && n(7, r = N.data), "initialRange" in N && n(8, i = N.initialRange), "externalRange" in N && n(9, o = N.externalRange), "preset" in N && n(10, a = N.preset), "showMonthLabels" in N && n(11, l = N.showMonthLabels), "showData" in N && n(12, u = N.showData), "showCanvas" in N && n(0, s = N.showCanvas), "selectionStroke" in N && n(13, h = N.selectionStroke), "selectionFill" in N && n(14, f = N.selectionFill);
  }, t.$$.update = () => {
    if (t.$$.dirty[0] & /*externalRange, viewStart, viewEnd, time, values*/
    492032 && o && typeof o.start == "number" && typeof o.end == "number") {
      const N = o.start, V = o.end;
      (N !== _ || V !== P) && (n(17, _ = N), n(18, P = V), U && S && (xt(), M()));
    }
    t.$$.dirty[0] & /*viewStart, viewEnd*/
    393216 && n(5, ut = $(_, P)), t.$$.dirty[0] & /*values, preset*/
    66560 && S && a && (Nt(), M());
  }, n(4, yt = k(_t())), [
    s,
    m,
    y,
    p,
    yt,
    ut,
    pt,
    r,
    i,
    o,
    a,
    l,
    u,
    h,
    f,
    U,
    S,
    _,
    P,
    T,
    bt,
    v,
    Mt,
    at,
    Ct,
    gt,
    Et,
    Dt,
    ct
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
      e = tt("button"), n = Q("≡"), c(e, "type", "button"), c(e, "class", "qbtn svelte-w4wsjb"), c(e, "title", r = /*viewMode*/
      t[0] === "line" ? "Show years stacked" : "Show years inline"), c(e, "aria-label", i = /*viewMode*/
      t[0] === "line" ? "Show years stacked" : "Show years inline");
    },
    m(l, u) {
      Ft(l, e, u), d(e, n), o || (a = oe(
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
      Ft(a, e, l), d(e, n), mo(r, n, null), i = !0;
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
  let e, n, r, i, o, a, l, u, s, h, f, g, m, y, p, w, D, E, x, W, U, S, Y, z, K, dt, B, O, b, _, P, k, _t, yt, ht, mt, Nt, j = (
    /*showCanvas*/
    t[5] && Xi(t)
  ), F = (
    /*showCanvas*/
    t[5] && /*viewMode*/
    t[0] === "stacked" && Oi(t)
  );
  return {
    c() {
      e = tt("div"), n = tt("div"), r = tt("div"), j && j.c(), i = wt(), o = tt("div"), a = tt("div"), l = tt("button"), u = Q("1d"), h = wt(), f = tt("button"), g = Q("1w"), y = wt(), p = tt("button"), w = Q("2w"), E = wt(), x = tt("button"), W = Q("3w"), S = wt(), Y = tt("button"), z = Q("1m"), dt = wt(), B = tt("button"), O = Q("3m"), _ = wt(), F && F.c(), P = wt(), k = tt("div"), _t = tt("canvas"), X(r, "display", "flex"), X(r, "gap", "8px"), X(r, "align-items", "center"), X(r, "justify-content", "flex-end"), X(r, "flex", "0 0 auto"), c(l, "type", "button"), c(l, "class", s = te(`qbtn ${/*activeSpan*/
      t[13] === 1 ? "active" : ""}`) + " svelte-w4wsjb"), c(f, "type", "button"), c(f, "class", m = te(`qbtn ${/*activeSpan*/
      t[13] === 7 ? "active" : ""}`) + " svelte-w4wsjb"), c(p, "type", "button"), c(p, "class", D = te(`qbtn ${/*activeSpan*/
      t[13] === 14 ? "active" : ""}`) + " svelte-w4wsjb"), c(x, "type", "button"), c(x, "class", U = te(`qbtn ${/*activeSpan*/
      t[13] === 21 ? "active" : ""}`) + " svelte-w4wsjb"), c(Y, "type", "button"), c(Y, "class", K = te(`qbtn ${/*activeSpan*/
      t[13] === 30 ? "active" : ""}`) + " svelte-w4wsjb"), c(B, "type", "button"), c(B, "class", b = te(`qbtn ${/*activeSpan*/
      t[13] === 90 ? "active" : ""}`) + " svelte-w4wsjb"), X(a, "display", "flex"), X(a, "gap", "16px"), X(a, "flex-wrap", "wrap"), X(a, "justify-content", "flex-end"), X(o, "display", "flex"), X(o, "align-items", "center"), X(o, "gap", "20px"), X(o, "justify-content", "flex-end"), X(o, "margin-left", "auto"), c(n, "id", "controlBar"), X(n, "display", "flex"), X(n, "align-items", "center"), X(n, "gap", "12px"), X(n, "flex-wrap", "wrap"), X(n, "margin", "0 0 0px"), X(_t, "width", "100%"), X(_t, "border", "0"), X(_t, "padding-bottom", "10px"), c(k, "class", "line-container"), c(k, "style", yt = `display:${/*showCanvas*/
      t[5] && /*viewMode*/
      t[0] === "line" ? "block" : "none"};`), c(e, "class", "cgm-widget"), X(e, "contain", "layout"), X(e, "display", "flex"), X(e, "flex-direction", "column");
    },
    m(M, $) {
      Ft(M, e, $), d(e, n), d(n, r), j && j.m(r, null), d(n, i), d(n, o), d(o, a), d(a, l), d(l, u), d(a, h), d(a, f), d(f, g), d(a, y), d(a, p), d(p, w), d(a, E), d(a, x), d(x, W), d(a, S), d(a, Y), d(Y, z), d(a, dt), d(a, B), d(B, O), d(e, _), F && F.m(e, null), d(e, P), d(e, k), d(k, _t), t[31](_t), t[32](e), ht = !0, mt || (Nt = [
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
          x,
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
      ], mt = !0);
    },
    p(M, $) {
      /*showCanvas*/
      M[5] ? j ? j.p(M, $) : (j = Xi(M), j.c(), j.m(r, null)) : j && (j.d(1), j = null), (!ht || $[0] & /*activeSpan*/
      8192 && s !== (s = te(`qbtn ${/*activeSpan*/
      M[13] === 1 ? "active" : ""}`) + " svelte-w4wsjb")) && c(l, "class", s), (!ht || $[0] & /*activeSpan*/
      8192 && m !== (m = te(`qbtn ${/*activeSpan*/
      M[13] === 7 ? "active" : ""}`) + " svelte-w4wsjb")) && c(f, "class", m), (!ht || $[0] & /*activeSpan*/
      8192 && D !== (D = te(`qbtn ${/*activeSpan*/
      M[13] === 14 ? "active" : ""}`) + " svelte-w4wsjb")) && c(p, "class", D), (!ht || $[0] & /*activeSpan*/
      8192 && U !== (U = te(`qbtn ${/*activeSpan*/
      M[13] === 21 ? "active" : ""}`) + " svelte-w4wsjb")) && c(x, "class", U), (!ht || $[0] & /*activeSpan*/
      8192 && K !== (K = te(`qbtn ${/*activeSpan*/
      M[13] === 30 ? "active" : ""}`) + " svelte-w4wsjb")) && c(Y, "class", K), (!ht || $[0] & /*activeSpan*/
      8192 && b !== (b = te(`qbtn ${/*activeSpan*/
      M[13] === 90 ? "active" : ""}`) + " svelte-w4wsjb")) && c(B, "class", b), /*showCanvas*/
      M[5] && /*viewMode*/
      M[0] === "stacked" ? F ? (F.p(M, $), $[0] & /*showCanvas, viewMode*/
      33 && En(F, 1)) : (F = Oi(M), F.c(), En(F, 1), F.m(e, P)) : F && (wa(), Rr(F, 1, 1, () => {
        F = null;
      }), va()), (!ht || $[0] & /*showCanvas, viewMode*/
      33 && yt !== (yt = `display:${/*showCanvas*/
      M[5] && /*viewMode*/
      M[0] === "line" ? "block" : "none"};`)) && c(k, "style", yt);
    },
    i(M) {
      ht || (En(F), ht = !0);
    },
    o(M) {
      Rr(F), ht = !1;
    },
    d(M) {
      M && At(e), j && j.d(), F && F.d(), t[31](null), t[32](null), mt = !1, Ge(Nt);
    }
  };
}
const Qn = 54;
function $f(t, e, n) {
  let { data: r } = e, { initialRange: i = null } = e, { externalRange: o = null } = e, { preset: a = "general" } = e, { showMonthLabels: l = !0 } = e, { showData: u = !0 } = e, { showCanvas: s = !0 } = e, { selectionStroke: h = "#111" } = e, { selectionFill: f = "transparent" } = e, { viewMode: g = "line" } = e;
  const m = mr();
  let y, p, w;
  const D = { l: 8, r: 8, t: 0, b: 6 }, E = [1, 7, 14, 21, 30, 90];
  let x = {
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
  function W(C, R) {
    try {
      return (getComputedStyle(p).getPropertyValue(C) || "").trim() || R;
    } catch {
      return R;
    }
  }
  function U() {
    x = {
      bg: W("--cgm-bg", x.bg),
      grid: W("--cgm-grid", x.grid),
      text: W("--cgm-text", x.text),
      muted: W("--cgm-muted", x.muted),
      selFill: W("--cgm-selection-fill", x.selFill),
      selStroke: W("--cgm-selection-stroke", x.selStroke),
      vlow: W("--cgm-very-low", x.vlow),
      low: W("--cgm-low", x.low),
      inrange: W("--cgm-in-range", x.inrange),
      high: W("--cgm-high", x.high),
      vhigh: W("--cgm-very-high", x.vhigh),
      outLight: W("--cgm-outside-light", x.outLight),
      outMid: W("--cgm-outside-mid", x.outMid),
      outDark: W("--cgm-outside-dark", x.outDark),
      arrow: W("--cgm-arrow", x.arrow)
    };
  }
  let S, Y, z = 24 * 60 * 60 * 1e3;
  const K = () => new Date(r.t0).getTime(), dt = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), B = () => dt() ? "mmol" : "mg";
  function O() {
    return He[a].thresholds[B()];
  }
  let b = 0, _ = 0, P = 0, k = 0;
  function _t(C) {
    let R = E[0], G = 1 / 0;
    for (const I of E) {
      const H = Math.abs(I - C);
      H < G && (G = H, R = I);
    }
    return R;
  }
  function yt() {
    return Math.max(1, Math.floor((k - P) / z) + 1);
  }
  let ht = 14;
  const mt = (C) => {
    const R = new Date(C);
    return Date.UTC(R.getUTCFullYear(), R.getUTCMonth(), R.getUTCDate());
  };
  let Nt;
  function j() {
    Nt = /* @__PURE__ */ new Map();
    for (let C = 0; C < Y.length; C++) {
      const R = Y[C];
      if (!(Number.isFinite(R) && R >= 0)) continue;
      const G = mt(S[C]);
      let I = Nt.get(G);
      I || (I = { valid: 0, vl: 0, l: 0, t: 0, h: 0, vh: 0 }, Nt.set(G, I)), I.valid++;
      const H = O();
      R < H.veryLow ? I.vl++ : R < H.low ? I.l++ : R <= H.high ? I.t++ : R <= H.veryHigh ? I.h++ : I.vh++;
    }
  }
  function F() {
    S = Float64Array.from({ length: r.glucose.length }, (C, R) => K() + R * r.stepMs), n(20, Y = Float64Array.from(r.glucose)), b = mt(S[0]), _ = mt(S[S.length - 1]), n(8, P = (i == null ? void 0 : i.start) ?? b), n(9, k = (i == null ? void 0 : i.end) ?? _), j();
  }
  let M, $ = 0, ut = !1;
  function xt() {
    if (!y || !(Nt != null && Nt.size) || g !== "line" || !s) return;
    const C = Math.max(1, window.devicePixelRatio || 1), R = Math.max(320, y.getBoundingClientRect().width || 900), G = l ? 24 : D.b, I = D.t + Qn + G;
    n(10, y.style.width = R + "px", y), n(10, y.style.height = I + "px", y), n(10, y.width = Math.floor(R * C), y), n(10, y.height = Math.floor(I * C), y), M.setTransform(C, 0, 0, C, 0, 0), M.clearRect(0, 0, R, I), M.fillStyle = x.bg, M.fillRect(0, 0, R, I);
    const H = R - D.l - D.r, et = Qn - 10, A = D.t + 5, vt = Math.round((_ - b) / z) + 1, lt = H / 365, Ot = H / lt;
    if (!ut) {
      const Tt = Math.floor((Math.min(_, Math.max(b, k)) - b) / z);
      $ = Math.max(0, Math.min(vt - Ot, Tt - Ot + 1)), ut = !0;
    }
    $ = Math.max(0, Math.min(vt - Ot, $));
    const Ut = (Tt) => D.l + (Tt - $) * lt, ft = (Tt) => D.l + ((Tt - b) / z - $) * lt;
    M.strokeStyle = x.grid, M.lineWidth = 1;
    const jt = b + Math.floor($) * z, Wt = b + Math.ceil($ + Ot) * z;
    let Zt = new Date(jt), ee = Date.UTC(Zt.getUTCFullYear(), Zt.getUTCMonth(), 1);
    if (ee < jt) {
      const Tt = Zt.getUTCFullYear(), Lt = Zt.getUTCMonth();
      ee = Date.UTC(Tt, Lt + 1, 1);
    }
    for (let Tt = ee; Tt <= Wt; ) {
      const Lt = Math.round(ft(Tt));
      M.beginPath(), M.moveTo(Lt, A + 1), M.lineTo(Lt, A + et - 1), M.stroke();
      const kt = new Date(Tt);
      Tt = Date.UTC(kt.getUTCFullYear(), kt.getUTCMonth() + 1, 1);
    }
    const qt = Math.max(b, Math.min(_, P)), Qt = Math.max(b, Math.min(_, k));
    if (u) {
      const Tt = Math.max(0, Math.floor($)), Lt = Math.min(vt - 1, Math.ceil($ + Ot));
      for (let kt = Tt; kt <= Lt; kt++) {
        const re = b + kt * z, Jt = Ut(kt), $t = Math.max(1, Math.ceil(lt)), Xt = Nt.get(re);
        if (!Xt || !Xt.valid) {
          M.fillStyle = x.bg, M.globalAlpha = 1, M.fillRect(Jt, A, $t, et);
          continue;
        }
        const Te = Math.max(1, Math.round(z / r.stepMs)), ie = {
          vl: Xt.vl / Xt.valid,
          l: Xt.l / Xt.valid,
          t: Xt.t / Xt.valid,
          h: Xt.h / Xt.valid,
          vh: Xt.vh / Xt.valid
        };
        let ce = A + et;
        const ue = (qe, ln, Mn) => {
          const sn = Math.round(ln * et);
          sn <= 0 || (ce -= sn, M.fillStyle = qe, M.globalAlpha = Mn, M.fillRect(Jt, ce, $t, sn));
        }, fe = Xt.valid / Te >= 0.5 ? 0.8 : 0.4, bn = Xt.valid / Te >= 0.5 ? 0.9 : 0.6;
        re >= qt && re <= Qt ? (ue(x.vlow, ie.vl, fe), ue(x.low, ie.l, fe), ue(x.inrange, ie.t, bn), ue(x.high, ie.h, fe), ue(x.vhigh, ie.vh, fe)) : (ue(x.outDark, ie.vl, Math.min(fe, 0.7)), ue(x.outMid, ie.l, Math.min(fe, 0.65)), ue(x.outLight, ie.t, Math.min(bn, 0.55)), ue(x.outMid, ie.h, Math.min(fe, 0.65)), ue(x.outDark, ie.vh, Math.min(fe, 0.7))), M.globalAlpha = 1;
      }
    } else {
      M.fillStyle = x.bg;
      const Tt = Math.max(0, Math.floor($)), Lt = Math.min(vt - 1, Math.ceil($ + Ot));
      for (let kt = Tt; kt <= Lt; kt++) {
        const re = Ut(kt), Jt = Math.max(1, Math.ceil(lt));
        M.fillRect(re, A, Jt, et);
      }
    }
    if (u) {
      const Tt = Math.max(b, Math.min(_, P)), Lt = Math.max(b, Math.min(_, k)), kt = Math.floor(ft(Tt)), re = Math.ceil(ft(Lt + 1));
      M.save();
      const Jt = f && f !== "#111" && f !== "transparent" && f !== "none" ? f : x.selFill;
      Jt && Jt !== "none" && Jt !== "transparent" && (M.fillStyle = Jt, M.fillRect(kt, A, Math.max(1, re - kt), et));
      const $t = h && h !== "#111" ? h : x.selStroke;
      M.strokeStyle = $t, M.lineWidth = 1.5, M.beginPath(), M.moveTo(kt + 0.5, A + 0.5), M.lineTo(kt + 0.5, A + et - 0.5), M.stroke(), M.beginPath(), M.moveTo(re - 0.5, A + 0.5), M.lineTo(re - 0.5, A + et - 0.5), M.stroke(), M.restore();
      try {
        const Xt = pt(Tt, Lt), Te = D.t + Qn - 5 + 0.5;
        M.save(), M.font = "11px system-ui, sans-serif";
        const ie = Math.ceil(M.measureText(Xt).width);
        M.restore();
        const ce = (kt + re) / 2;
        var Pt = {
          text: Xt,
          x0: Math.round(ce - ie / 2) - 2,
          x1: Math.round(ce + ie / 2) + 2,
          yAxis: Te
        };
      } catch {
      }
    }
    if (l) {
      const Tt = ai("%b"), Lt = D.t + Qn - 5 + 0.5;
      M.save(), M.strokeStyle = x.grid, M.lineWidth = 1, M.fillStyle = x.muted, M.font = "11px var(--cgm-font, system-ui, sans-serif)", M.textAlign = "center", M.textBaseline = "top";
      let kt = new Date(jt), re = Date.UTC(kt.getUTCFullYear(), kt.getUTCMonth(), 1);
      if (re < jt) {
        const Jt = kt.getUTCFullYear(), $t = kt.getUTCMonth();
        re = Date.UTC(Jt, $t + 1, 1);
      }
      for (let Jt = re; Jt <= Wt; ) {
        const $t = Math.round(ft(Jt));
        M.beginPath(), M.moveTo($t, Lt), M.lineTo($t, Lt + 4), M.stroke();
        const Xt = new Date(Jt);
        let Te = Tt(new Date(Date.UTC(2e3, Xt.getUTCMonth(), 1)));
        if (Xt.getUTCMonth() === 0) {
          const ce = String(Xt.getUTCFullYear()).slice(-2);
          Te = `${Te} ${ce}'`;
        }
        let ie = !0;
        try {
          const ce = Math.ceil(M.measureText(Te).width), ue = $t - Math.round(ce / 2) - 2, fe = $t + Math.round(ce / 2) + 2;
          typeof Pt < "u" && Pt && !(fe < Pt.x0 || ue > Pt.x1) && (ie = !1);
        } catch {
        }
        ie && M.fillText(Te, $t, Lt + 6), Jt = Date.UTC(Xt.getUTCFullYear(), Xt.getUTCMonth() + 1, 1);
      }
      M.restore();
      try {
        if (typeof Pt < "u" && Pt) {
          const Jt = Lt + 6;
          M.save(), M.fillStyle = x.text, M.font = "11px var(--cgm-font, system-ui, sans-serif)", M.textAlign = "center", M.textBaseline = "top";
          const $t = Math.round((Pt.x0 + Pt.x1) / 2);
          M.fillText(Pt.text, $t, Jt), M.restore();
        }
      } catch {
      }
    }
    const Gt = A + et / 2;
    if (M.save(), M.fillStyle = x.arrow, $ > 0 + 0.01) {
      const Tt = D.l - 5, Lt = 5, kt = 4;
      M.beginPath(), M.moveTo(Tt, Gt), M.lineTo(Tt + kt, Gt - Lt), M.lineTo(Tt + kt, Gt + Lt), M.closePath(), M.fill();
    }
    if ($ + Ot < vt - 0.01) {
      const Tt = R - D.r + 5, Lt = 5, kt = 4;
      M.beginPath(), M.moveTo(Tt, Gt), M.lineTo(Tt - kt, Gt - Lt), M.lineTo(Tt - kt, Gt + Lt), M.closePath(), M.fill();
    }
    M.restore();
  }
  function pt(C, R) {
    const G = new Date(C), I = new Date(R), H = Pe("%b %e"), et = Pe("%b %e, %Y"), A = Pe("%e, %Y"), vt = Date.UTC(G.getUTCFullYear(), G.getUTCMonth(), G.getUTCDate()), lt = Date.UTC(I.getUTCFullYear(), I.getUTCMonth(), I.getUTCDate());
    return vt === lt ? et(I) : G.getFullYear() === I.getFullYear() ? G.getMonth() === I.getMonth() ? `${H(G)} – ${A(I)}` : `${H(G)} – ${et(I)}` : `${et(G)} – ${et(I)}`;
  }
  function L() {
    if (!S || !Y) return;
    const C = yt();
    n(13, ht = _t(C));
    const R = Math.max(0, Math.ceil((P - S[0]) / r.stepMs)), G = Math.min(Y.length - 1, Math.floor((k - S[0]) / r.stepMs));
    try {
      typeof window < "u" && window.CGM_DEBUG && console.log("[CgmTir] rangechange", {
        startISO: new Date(P).toISOString(),
        endISO: new Date(k).toISOString(),
        days: C,
        startIdx: R,
        endIdx: G
      });
    } catch {
    }
    m("rangechange", {
      start: P,
      end: k,
      days: C,
      startIdx: R,
      endIdx: G
    });
  }
  function q(C) {
    const R = z;
    let G = Math.max(b + R - 1, Math.min(_, k)), I = G - C * R + 1;
    I < b && (I = b, G = Math.min(_, I + C * R - 1)), n(8, P = I), n(9, k = G), v(), L(), bt();
  }
  function ot(C) {
    const R = P + C * z, G = k + C * z, I = Math.max(z, G - R);
    n(8, P = Math.max(b, Math.min(_ - I, R))), n(9, k = Math.min(_, P + I)), v(), L(), bt();
  }
  function T(C) {
    const R = yt() * z * C;
    ot(R / z);
  }
  function bt() {
    if (g === "line") xt();
    else if (w) try {
      w.$set({
        externalRange: { start: P, end: k }
      });
    } catch {
    }
  }
  function v() {
    const C = Math.round((_ - b) / z) + 1, G = Math.max(320, (y == null ? void 0 : y.getBoundingClientRect().width) || 900) - D.l - D.r, I = G / 365, H = G / I, et = Math.floor((Math.max(b, Math.min(_, P)) - b) / z), A = Math.floor((Math.max(b, Math.min(_, k)) - b) / z);
    let lt = (et + A + 1) / 2 - H / 2;
    lt = Math.max(0, Math.min(C - H, lt)), $ = lt;
  }
  function Mt() {
    if (!y) return;
    const R = Math.max(320, y.getBoundingClientRect().width || 900) - D.l - D.r, G = Math.round((_ - b) / z) + 1, I = R / 365, H = R / I;
    $ = Math.max(0, Math.min(G - H, $));
  }
  let at = !1, Ct = null, gt = null, Et = null, Dt = null;
  function ct() {
    if (at || !y) return;
    const C = y;
    let R = !1, G = null, I = null, H = 0, et = 0;
    const A = 6, vt = (Ut) => {
      const ft = new Date(Ut);
      return Date.UTC(ft.getUTCFullYear(), ft.getUTCMonth(), ft.getUTCDate());
    };
    function lt() {
      const Ut = Math.max(320, C.getBoundingClientRect().width || 900), ft = Ut - D.l - D.r, jt = D.l, Wt = Ut - D.r, Zt = ft / 365;
      return { cssW: Ut, plotW: ft, x0: jt, x1: Wt, dayWidth: Zt };
    }
    function Ot(Ut) {
      const ft = C.getBoundingClientRect(), jt = Ut.clientX - ft.left;
      Ut.clientY - ft.top;
      const { x0: Wt, x1: Zt, dayWidth: ee } = lt(), qt = Math.max(Wt, Math.min(Zt, jt)), Qt = (qt - Wt) / ee;
      let Pt = b + ($ + Qt) * z;
      return Pt = Math.max(b, Math.min(_, Pt)), { t: Pt, x: qt, rawX: jt, x0: Wt, x1: Zt, rowIdx: 0 };
    }
    Ct = (Ut) => {
      const ft = Ot(Ut);
      if (!ft) return;
      const { dayWidth: jt, x0: Wt } = lt(), Zt = (Qt) => Wt + ((Qt - b) / z - $) * jt, ee = Zt(P), qt = Zt(k) + 1;
      G = "new", ft.x >= ee - A && ft.x <= ee + A ? G = "resize-l" : ft.x >= qt - A && ft.x <= qt + A ? G = "resize-r" : ft.x > ee && ft.x < qt && (G = "move"), R = !0, I = ft.t, H = P, et = k, document.body.style.userSelect = "none", C.style.cursor = G === "move" ? "grabbing" : G === "new" ? "crosshair" : "col-resize";
    }, Dt = (Ut) => {
      const { dayWidth: ft } = lt(), Wt = (Math.abs(Ut.deltaX) > Math.abs(Ut.deltaY) ? Ut.deltaX : Ut.deltaY) / ft;
      $ = $ + Wt, Mt(), xt(), Ut.preventDefault();
    }, C.addEventListener("wheel", Dt, { passive: !1 }), C.addEventListener("mousedown", Ct), gt = (Ut) => {
      let ft = Ot(Ut);
      if (!ft) {
        R || (C.style.cursor = "crosshair");
        return;
      }
      if (!R) {
        const { dayWidth: Qt, x0: Pt } = lt(), Gt = (kt) => Pt + ((kt - b) / z - $) * Qt, Tt = Gt(P), Lt = Gt(k) + 1;
        ft.x >= Tt - A && ft.x <= Tt + A || ft.x >= Lt - A && ft.x <= Lt + A ? C.style.cursor = "col-resize" : ft.x > Tt && ft.x < Lt ? C.style.cursor = "grab" : C.style.cursor = "crosshair";
        return;
      }
      const { x0: jt, x1: Wt, dayWidth: Zt } = lt();
      if (ft.rawX < jt) {
        const Qt = jt - ft.rawX;
        $ -= Qt / Zt, Mt(), ft = Ot(Ut) || ft;
      } else if (ft.rawX > Wt) {
        const Qt = ft.rawX - Wt;
        $ += Qt / Zt, Mt(), ft = Ot(Ut) || ft;
      }
      const ee = ft.t, qt = z;
      if (G === "new") {
        const Qt = vt(Math.min(I, ee)), Pt = vt(Math.max(I, ee));
        let Gt = Math.max(1, Math.floor((Pt - Qt) / qt) + 1);
        const Tt = _t(Gt);
        if (ee >= I) {
          let Lt = Qt, kt = Lt + Tt * qt - 1;
          kt > _ && (kt = _, Lt = Math.max(b, kt - Tt * qt + 1)), n(8, P = Lt), n(9, k = kt);
        } else {
          let Lt = Pt + qt - 1, kt = Lt - Tt * qt + 1;
          kt < b && (kt = b, Lt = Math.min(_, kt + Tt * qt - 1)), n(8, P = kt), n(9, k = Lt);
        }
      } else if (G === "resize-l") {
        const Qt = Math.max(1, Math.floor((et - vt(Math.min(ee, et - qt + 1)) + 1) / qt)), Pt = _t(Qt);
        let Gt = et - Pt * qt + 1;
        Gt = Math.max(b, Math.min(Gt, et - qt + 1)), n(8, P = Gt), n(9, k = et);
      } else if (G === "resize-r") {
        const Qt = Math.max(1, Math.floor((vt(ee) + qt - 1 - H + 1) / qt)), Pt = _t(Qt);
        let Gt = H + Pt * qt - 1;
        Gt = Math.min(_, Math.max(Gt, H + qt - 1)), n(8, P = H), n(9, k = Gt);
      } else if (G === "move") {
        const Qt = Math.round((vt(ee) - vt(I)) / qt), Pt = et - H + 1;
        let Gt = H + Qt * qt;
        Gt = Math.max(b, Math.min(_ - Pt + 1, Gt)), n(8, P = Gt), n(9, k = Gt + Pt - 1);
      }
      L(), xt();
    }, Et = () => {
      R && (R = !1, G = null, I = null, document.body.style.userSelect = "", C.style.cursor = "crosshair");
    }, window.addEventListener("mousemove", gt), window.addEventListener("mouseup", Et), at = !0;
  }
  function N() {
    if (!(!at || !y)) {
      try {
        y.removeEventListener("mousedown", Ct);
      } catch {
      }
      try {
        y.removeEventListener("wheel", Dt);
      } catch {
      }
      try {
        window.removeEventListener("mousemove", gt);
      } catch {
      }
      try {
        window.removeEventListener("mouseup", Et);
      } catch {
      }
      Ct = gt = Et = Dt = null, at = !1;
    }
  }
  _n(() => {
    M = y.getContext("2d"), U(), F(), xt();
    const C = Math.max(0, Math.ceil((P - S[0]) / r.stepMs)), R = Math.min(Y.length - 1, Math.floor((k - S[0]) / r.stepMs));
    m("ready", {
      start: P,
      end: k,
      startIdx: C,
      endIdx: R,
      days: yt()
    }), L(), ct();
    const G = () => {
      Mt(), xt();
    }, I = (H) => {
      const et = H.target && H.target.tagName ? H.target.tagName.toLowerCase() : "";
      if (!(et === "input" || et === "textarea" || et === "select" || H.defaultPrevented)) {
        if (/^[1-6]$/.test(H.key)) {
          const vt = {
            1: 1,
            2: 7,
            3: 14,
            4: 21,
            5: 30,
            6: 90
          }[H.key];
          q(vt), H.preventDefault();
          return;
        }
        if (H.key === "ArrowLeft" || H.key === "ArrowRight") {
          H.shiftKey ? T(H.key === "ArrowLeft" ? -1 : 1) : ot(H.key === "ArrowLeft" ? -1 : 1), H.preventDefault();
          return;
        }
        if (H.key === "ArrowUp" || H.key === "ArrowDown") {
          (function() {
            return { dayWidth: (Math.max(320, (y == null ? void 0 : y.getBoundingClientRect().width) || 900) - D.l - D.r) / 365 };
          })();
          const A = Math.round(30);
          $ += H.key === "ArrowUp" ? -A : A, xt(), H.preventDefault();
          return;
        }
      }
    };
    return window.addEventListener("resize", () => {
      U(), G();
    }), window.addEventListener("keydown", I), () => {
      window.removeEventListener("resize", G), window.removeEventListener("keydown", I), N();
    };
  });
  const V = () => {
    n(0, g = g === "line" ? "stacked" : "line"), bt();
  }, rt = () => q(1), Z = () => q(7), J = () => q(14), It = () => q(21), Rt = () => q(30), Bt = () => q(90);
  function zt(C) {
    De[C ? "unshift" : "push"](() => {
      w = C, n(12, w);
    });
  }
  const ne = (C) => {
    const R = C.detail;
    n(8, P = R.start), n(9, k = R.end), L();
  }, Kt = (C) => {
    const R = C.detail;
    n(8, P = R.start), n(9, k = R.end), m("ready", R);
  };
  function St(C) {
    De[C ? "unshift" : "push"](() => {
      y = C, n(10, y);
    });
  }
  function it(C) {
    De[C ? "unshift" : "push"](() => {
      p = C, n(11, p);
    });
  }
  return t.$$set = (C) => {
    "data" in C && n(1, r = C.data), "initialRange" in C && n(18, i = C.initialRange), "externalRange" in C && n(19, o = C.externalRange), "preset" in C && n(2, a = C.preset), "showMonthLabels" in C && n(3, l = C.showMonthLabels), "showData" in C && n(4, u = C.showData), "showCanvas" in C && n(5, s = C.showCanvas), "selectionStroke" in C && n(6, h = C.selectionStroke), "selectionFill" in C && n(7, f = C.selectionFill), "viewMode" in C && n(0, g = C.viewMode);
  }, t.$$.update = () => {
    if (t.$$.dirty[0] & /*externalRange, viewStart, viewEnd*/
    525056 && o && typeof o.start == "number" && typeof o.end == "number") {
      const C = o.start, R = o.end;
      (C !== P || R !== k) && (n(8, P = C), n(9, k = R), v(), L(), bt());
    }
    t.$$.dirty[0] & /*viewStart, viewEnd*/
    768 && pt(P, k), t.$$.dirty[0] & /*viewMode, showCanvas*/
    33 && g === "stacked" && s && setTimeout(
      () => {
        try {
          window.dispatchEvent(new Event("resize"));
        } catch {
        }
      },
      0
    ), t.$$.dirty[0] & /*values, preset*/
    1048580 && Y && a && (j(), bt()), t.$$.dirty[0] & /*showCanvas, viewMode*/
    33 && (s && g === "line" ? ct() : N());
  }, n(13, ht = _t(yt())), [
    g,
    r,
    a,
    l,
    u,
    s,
    h,
    f,
    P,
    k,
    y,
    p,
    w,
    ht,
    m,
    L,
    q,
    bt,
    i,
    o,
    Y,
    V,
    rt,
    Z,
    J,
    It,
    Rt,
    Bt,
    zt,
    ne,
    Kt,
    St,
    it
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
  let e, n, r, i, o, a, l, u, s, h, f, g, m, y, p, w, D, E, x, W, U, S, Y, z, K, dt, B, O, b, _, P, k, _t, yt, ht, mt, Nt, j, F, M, $, ut, xt, pt, L, q, ot, T, bt, v, Mt, at, Ct, gt, Et, Dt, ct, N, V, rt;
  return {
    c() {
      e = tt("div"), n = tt("div"), r = tt("div"), i = tt("b"), o = Q(
        /*spanLabel*/
        t[10]
      ), a = tt("div"), l = Q(
        /*periodText*/
        t[9]
      ), u = wt(), s = tt("div"), h = tt("div"), f = tt("b"), f.textContent = "Target Range", g = wt(), m = tt("div"), y = tt("button"), p = Q("General"), D = Q(`·
          `), E = tt("button"), x = Q("Tight"), U = Q(`·
          `), S = tt("button"), Y = Q("Pregnancy"), K = wt(), dt = tt("div"), B = Q(
        /*targetRangeText*/
        t[4]
      ), O = wt(), b = tt("div"), _ = Q("Time CGM Active: "), P = Q(
        /*activeText*/
        t[8]
      ), k = wt(), _t = tt("div"), yt = tt("div"), ht = tt("b"), ht.textContent = "Average Glucose", mt = tt("div"), Nt = Q("Goal: "), j = Q(
        /*avgGoalText*/
        t[5]
      ), F = tt("div"), M = Q(
        /*avgText*/
        t[1]
      ), $ = wt(), ut = tt("div"), xt = tt("div"), pt = tt("b"), pt.textContent = "Glucose Management Indicator (GMI)", L = tt("div"), q = Q("Goal: "), ot = Q(
        /*gmiGoalText*/
        t[6]
      ), T = tt("div"), bt = Q(
        /*gmiText*/
        t[2]
      ), v = wt(), Mt = tt("div"), at = tt("div"), Ct = tt("b"), Ct.textContent = "Glucose Variability (CV)", gt = tt("div"), Et = Q("Goal: "), Dt = Q(
        /*cvGoalText*/
        t[7]
      ), ct = tt("div"), N = Q(
        /*cvText*/
        t[3]
      ), c(r, "class", "svelte-1o729tz"), c(a, "class", "svelte-1o729tz"), c(n, "class", "metric svelte-1o729tz"), c(y, "type", "button"), c(y, "class", w = "opt " + /*preset*/
      (t[0] === "general" ? "active" : "muted") + " svelte-1o729tz"), c(y, "aria-label", "Set target range: General"), c(E, "type", "button"), c(E, "class", W = "opt " + /*preset*/
      (t[0] === "tight" ? "active" : "muted") + " svelte-1o729tz"), c(E, "aria-label", "Set target range: Tight"), c(S, "type", "button"), c(S, "class", z = "opt " + /*preset*/
      (t[0] === "pregnancy" ? "active" : "muted") + " svelte-1o729tz"), c(S, "aria-label", "Set target range: Pregnancy"), c(m, "class", "target-switch svelte-1o729tz"), c(h, "class", "svelte-1o729tz"), X(dt, "font-weight", "normal"), c(dt, "class", "svelte-1o729tz"), c(s, "class", "metric svelte-1o729tz"), c(b, "class", "muted svelte-1o729tz"), X(b, "font-size", "11px"), X(b, "margin-top", "6px"), X(b, "margin-left", "8px"), X(b, "padding-bottom", "30px"), c(mt, "class", "muted svelte-1o729tz"), X(mt, "font-size", "11px"), c(yt, "class", "svelte-1o729tz"), c(F, "class", "svelte-1o729tz"), c(_t, "class", "metric svelte-1o729tz"), c(L, "class", "muted svelte-1o729tz"), X(L, "font-size", "11px"), c(xt, "class", "svelte-1o729tz"), c(T, "class", "svelte-1o729tz"), c(ut, "class", "metric svelte-1o729tz"), c(gt, "class", "muted svelte-1o729tz"), X(gt, "font-size", "11px"), c(at, "class", "svelte-1o729tz"), c(ct, "class", "svelte-1o729tz"), c(Mt, "class", "metric svelte-1o729tz"), c(e, "class", "summary"), X(e, "padding", "0 10px");
    },
    m(Z, J) {
      Ft(Z, e, J), d(e, n), d(n, r), d(r, i), d(i, o), d(n, a), d(a, l), d(e, u), d(e, s), d(s, h), d(h, f), d(h, g), d(h, m), d(m, y), d(y, p), d(m, D), d(m, E), d(E, x), d(m, U), d(m, S), d(S, Y), d(s, K), d(s, dt), d(dt, B), d(e, O), d(e, b), d(b, _), d(b, P), d(e, k), d(e, _t), d(_t, yt), d(yt, ht), d(yt, mt), d(mt, Nt), d(mt, j), d(_t, F), d(F, M), d(e, $), d(e, ut), d(ut, xt), d(xt, pt), d(xt, L), d(L, q), d(L, ot), d(ut, T), d(T, bt), d(e, v), d(e, Mt), d(Mt, at), d(at, Ct), d(at, gt), d(gt, Et), d(gt, Dt), d(Mt, ct), d(ct, N), V || (rt = [
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
    p(Z, [J]) {
      J & /*spanLabel*/
      1024 && Vt(
        o,
        /*spanLabel*/
        Z[10]
      ), J & /*periodText*/
      512 && Vt(
        l,
        /*periodText*/
        Z[9]
      ), J & /*preset*/
      1 && w !== (w = "opt " + /*preset*/
      (Z[0] === "general" ? "active" : "muted") + " svelte-1o729tz") && c(y, "class", w), J & /*preset*/
      1 && W !== (W = "opt " + /*preset*/
      (Z[0] === "tight" ? "active" : "muted") + " svelte-1o729tz") && c(E, "class", W), J & /*preset*/
      1 && z !== (z = "opt " + /*preset*/
      (Z[0] === "pregnancy" ? "active" : "muted") + " svelte-1o729tz") && c(S, "class", z), J & /*targetRangeText*/
      16 && Vt(
        B,
        /*targetRangeText*/
        Z[4]
      ), J & /*activeText*/
      256 && Vt(
        P,
        /*activeText*/
        Z[8]
      ), J & /*avgGoalText*/
      32 && Vt(
        j,
        /*avgGoalText*/
        Z[5]
      ), J & /*avgText*/
      2 && Vt(
        M,
        /*avgText*/
        Z[1]
      ), J & /*gmiGoalText*/
      64 && Vt(
        ot,
        /*gmiGoalText*/
        Z[6]
      ), J & /*gmiText*/
      4 && Vt(
        bt,
        /*gmiText*/
        Z[2]
      ), J & /*cvGoalText*/
      128 && Vt(
        Dt,
        /*cvGoalText*/
        Z[7]
      ), J & /*cvText*/
      8 && Vt(
        N,
        /*cvText*/
        Z[3]
      );
    },
    i: ae,
    o: ae,
    d(Z) {
      Z && At(e), V = !1, Ge(rt);
    }
  };
}
function nh(t, e, n) {
  let r, { data: i } = e, { range: o = null } = e, { preset: a = "general" } = e;
  const l = mr();
  let u = "—", s = "—", h = "—", f = "—", g = "", m = "", y = "", p = "—", w = "", D = 0, E, x, W = 24 * 60 * 60 * 1e3;
  const U = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol"), S = () => U() ? "mmol" : "mg", Y = () => U() ? "mmol/L" : "mg/dL", z = (_) => U() ? _ * 18 : _;
  function K() {
    if (!i) return;
    const _ = new Date(i.t0).getTime();
    n(15, E = Float64Array.from({ length: i.glucose.length }, (P, k) => _ + k * i.stepMs)), n(16, x = Float64Array.from(i.glucose));
  }
  function dt(_) {
    _ !== a && (n(0, a = _), l("presetchange", { preset: _ }));
  }
  _n(() => {
    K();
  });
  const B = () => dt("general"), O = () => dt("tight"), b = () => dt("pregnancy");
  return t.$$set = (_) => {
    "data" in _ && n(12, i = _.data), "range" in _ && n(13, o = _.range), "preset" in _ && n(0, a = _.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*preset*/
    1 && function() {
      const _ = He[a].thresholds[S()];
      n(4, f = _.low + "-" + _.high + Y());
    }(), t.$$.dirty & /*preset*/
    1 && He[a].label, t.$$.dirty & /*preset*/
    1 && function() {
      const _ = He[a].metricsGoals;
      n(5, g = _.averageGlucose[S()]), n(6, m = _.gmi), n(7, y = _.cv);
    }(), t.$$.dirty & /*data*/
    4096 && i && K(), t.$$.dirty & /*data, range, time, values*/
    110592 && i && o && E && x) {
      const { start: _, end: P } = o, k = Math.max(0, Math.ceil((_ - E[0]) / i.stepMs)), _t = Math.min(x.length - 1, Math.floor((P - E[0]) / i.stepMs));
      try {
        typeof window < "u" && window.CGM_DEBUG && console.log("[CgmSummary] update", {
          startISO: new Date(_).toISOString(),
          endISO: new Date(P).toISOString(),
          stepMs: i.stepMs,
          i0: k,
          i1: _t,
          len: x.length
        });
      } catch {
      }
      if (_t < k)
        n(1, u = "—"), n(2, s = "—"), n(3, h = "—"), n(8, p = "—"), n(9, w = ""), n(14, D = 0);
      else {
        let xt = function(T, bt) {
          const v = new Date(T), Mt = new Date(bt), at = Pe("%b %e"), Ct = Pe("%b %e, %Y"), gt = Pe("%e, %Y"), Et = Date.UTC(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate()), Dt = Date.UTC(Mt.getUTCFullYear(), Mt.getUTCMonth(), Mt.getUTCDate());
          return Et === Dt ? Ct(Mt) : v.getFullYear() === Mt.getFullYear() ? v.getMonth() === Mt.getMonth() ? `${at(v)} – ${gt(Mt)}` : `${at(v)} – ${Ct(Mt)}` : `${Ct(v)} – ${Ct(Mt)}`;
        };
        const yt = [];
        for (let T = k; T <= _t; T++) {
          const bt = x[T];
          Number.isFinite(bt) && bt >= 0 && yt.push(bt);
        }
        const ht = Math.max(1, _t - k + 1), Nt = 100 * yt.length / ht;
        n(8, p = `${Nt.toFixed(1)}%`);
        const j = Ea(yt), F = Sa(yt) ?? 0, M = Math.sqrt(F), $ = Number.isFinite(j) ? 3.31 + 0.02392 * z(j) : NaN, ut = Number.isFinite(j) && j !== 0 ? M / j * 100 : NaN;
        n(1, u = Number.isFinite(j) ? U() ? `${j.toFixed(1)} mmol/L` : `${Math.round(j)} mg/dL` : "—"), n(2, s = Number.isFinite($) ? `${$.toFixed(1)}%` : "—"), n(3, h = Number.isFinite(ut) ? `${ut.toFixed(1)}%` : "—"), n(9, w = xt(_, P));
        const pt = new Date(_), L = new Date(P), q = Date.UTC(pt.getUTCFullYear(), pt.getUTCMonth(), pt.getUTCDate()), ot = Date.UTC(L.getUTCFullYear(), L.getUTCMonth(), L.getUTCDate());
        n(14, D = Math.max(1, Math.floor((ot - q) / W) + 1));
      }
    }
    t.$$.dirty & /*range, daysCount*/
    24576 && n(10, r = (() => {
      if (!o) return `${D} Days`;
      const _ = 60 * 60 * 1e3, P = Math.max(0, Math.round((o.end - o.start) / _)), k = Math.round(P / 24);
      return k === 1 ? "1 Day" : k === 7 ? "1 Week" : k === 14 ? "2 Weeks" : k === 21 ? "3 Weeks" : k === 30 ? "1 Month" : k === 90 ? "3 Months" : `${D} Days`;
    })());
  }, [
    a,
    u,
    s,
    h,
    f,
    g,
    m,
    y,
    p,
    w,
    r,
    dt,
    i,
    o,
    D,
    E,
    x,
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
      e = Q("General");
    },
    m(n, r) {
      Ft(n, e, r);
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
      e = Q("Pregnancy");
    },
    m(n, r) {
      Ft(n, e, r);
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
      e = Q("Tight");
    },
    m(n, r) {
      Ft(n, e, r);
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
      n = Q(e), r = Q("–"), o = Q(i), a = Q(" mg/dL");
    },
    m(l, u) {
      Ft(l, n, u), Ft(l, r, u), Ft(l, o, u), Ft(l, a, u);
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
      n = Q(e), r = Q("–"), o = Q(i), a = Q(" mmol/L");
    },
    m(l, u) {
      Ft(l, n, u), Ft(l, r, u), Ft(l, o, u), Ft(l, a, u);
    },
    p: ae,
    d(l) {
      l && (At(n), At(r), At(o), At(a));
    }
  };
}
function uh(t) {
  let e, n, r, i, o, a, l, u, s, h, f, g, m, y, p, w = (
    /*pct*/
    t[2].targ.toFixed(1) + ""
  ), D, E, x, W, U, S;
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
  function dt(b, _) {
    return (
      /*isMmol*/
      b[3]() ? sh : lh
    );
  }
  let O = dt(t)(t);
  return {
    c() {
      e = tt("div"), n = tt("div"), r = tt("div"), i = wt(), o = tt("div"), a = wt(), l = tt("div"), u = wt(), s = tt("div"), h = wt(), f = tt("div"), g = wt(), m = tt("div"), y = tt("div"), p = tt("span"), D = Q(w), E = Q("%"), x = Q(" in range"), W = wt(), U = tt("div"), K.c(), S = wt(), O.c(), c(r, "class", "seg vlow svelte-15po776"), X(
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
      ), c(f, "title", "Very high"), c(n, "class", "bar svelte-15po776"), c(p, "class", "strong svelte-15po776"), c(y, "class", "left svelte-15po776"), c(U, "class", "right svelte-15po776"), c(m, "class", "legend svelte-15po776"), c(e, "class", "tirbar svelte-15po776");
    },
    m(b, _) {
      Ft(b, e, _), d(e, n), d(n, r), d(n, i), d(n, o), d(n, a), d(n, l), d(n, u), d(n, s), d(n, h), d(n, f), d(e, g), d(e, m), d(m, y), d(y, p), d(p, D), d(p, E), d(y, x), d(m, W), d(m, U), K.m(U, null), d(U, S), O.m(U, null), t[9](e);
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
      b[2].targ.toFixed(1) + "") && Vt(D, w), z !== (z = Y(b)) && (K.d(1), K = z(b), K && (K.c(), K.m(U, S))), O.p(b, _);
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
  const u = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), s = () => u() ? "mmol" : "mg", h = () => He[o].thresholds[s()];
  let f;
  function g(w, D) {
    try {
      return (getComputedStyle(f).getPropertyValue(w) || "").trim() || D;
    } catch {
      return D;
    }
  }
  let m = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  };
  function y() {
    if (!r) return;
    const w = new Date(r.t0).getTime();
    n(7, a = Float64Array.from({ length: r.glucose.length }, (D, E) => w + E * r.stepMs)), n(8, l = Float64Array.from(r.glucose));
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
      const { start: w, end: D } = i, E = Math.max(0, Math.ceil((w - a[0]) / r.stepMs)), x = Math.min(l.length - 1, Math.floor((D - a[0]) / r.stepMs));
      if (x < E)
        n(2, m = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        });
      else {
        const W = h();
        let U = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, S = 0;
        for (let Y = E; Y <= x; Y++) {
          const z = l[Y];
          Number.isFinite(z) && z >= 0 && (S++, z < W.vlow ? U.vlow++ : z < W.low ? U.low++ : z <= W.high ? U.targ++ : z <= W.vhigh ? U.high++ : U.vhigh++);
        }
        S === 0 ? n(2, m = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }) : n(2, m = {
          vlow: U.vlow / S * 100,
          low: U.low / S * 100,
          targ: U.targ / S * 100,
          high: U.high / S * 100,
          vhigh: U.vhigh / S * 100
        });
      }
    }
  }, g("--cgm-very-low", "#e57373"), g("--cgm-low", "#ff9e80"), g("--cgm-in-range", "#86c89d"), g("--cgm-high", "#ffcc80"), g("--cgm-very-high", "#ff8a65"), [o, f, m, u, h, r, i, a, l, p];
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
      e = st("svg"), X(e, "width", "100%"), X(e, "height", "260px"), X(e, "display", "block");
    },
    m(n, r) {
      Ft(n, e, r), t[6](e);
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
  function f(U, S) {
    try {
      return (getComputedStyle(a).getPropertyValue(U) || "").trim() || S;
    } catch {
      return S;
    }
  }
  const g = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), m = () => g() ? "mmol" : "mg", y = () => He[o].thresholds[m()];
  let p, w;
  function D() {
    const U = new Date(r.t0).getTime();
    n(4, p = Float64Array.from({ length: r.glucose.length }, (S, Y) => U + Y * r.stepMs)), n(5, w = Float64Array.from(r.glucose));
  }
  function E(U, S) {
    const Y = Math.max(1, Math.round(h / r.stepMs)), z = Array.from({ length: Y }, () => []), K = /* @__PURE__ */ new Set();
    for (let B = U; B <= S; B++) {
      const O = w[B];
      if (!(Number.isFinite(O) && O >= 0)) continue;
      const b = p[B], _ = new Date(b), P = new Date(_.getFullYear(), _.getMonth(), _.getDate()).getTime();
      K.add(P);
      let k = Math.round((b - P) / r.stepMs);
      k < 0 ? k = 0 : k >= Y && (k = Y - 1), z[k].push(O);
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
  function x() {
    if (!a || !r || !i || !p || !w) return;
    const U = a.getBoundingClientRect();
    l = Math.max(360, U.width || 900), u = Math.max(220, U.height || 260);
    const S = Xe(a);
    S.selectAll("*").remove();
    const Y = Math.max(0, Math.ceil((i.start - p[0]) / r.stepMs)), z = Math.min(w.length - 1, Math.floor((i.end - p[0]) / r.stepMs));
    if (z < Y) return;
    const { series: K, samplesPerDay: dt, dayCount: B } = E(Y, z);
    if (!K.flatMap((v) => [v.p05, v.p95]).filter(Number.isFinite).length) {
      S.append("text").attr("x", s.l).attr("y", u / 2).text("Not enough data in selection to compute AGP");
      return;
    }
    const b = In().domain([0, dt - 1]).range([s.l, l - s.r]), _ = y(), P = g() ? 20 : 360, k = In().domain([_.veryLow, P]).range([u - s.b, s.t]), _t = Ae().defined((v) => Number.isFinite(v.p05) && Number.isFinite(v.p95) && v.p05 < _.low).x((v) => b(v.t)).y0((v) => k(Math.min(v.p95, _.low))).y1((v) => k(v.p05)), yt = Ae().defined((v) => Number.isFinite(v.p05) && Number.isFinite(v.p95) && v.p95 > _.low && v.p05 < _.high).x((v) => b(v.t)).y0((v) => k(Math.min(v.p95, _.high))).y1((v) => k(Math.max(v.p05, _.low))), ht = Ae().defined((v) => Number.isFinite(v.p05) && Number.isFinite(v.p95) && v.p95 > _.high && v.p05 < _.veryHigh).x((v) => b(v.t)).y0((v) => k(Math.min(v.p95, _.veryHigh))).y1((v) => k(Math.max(v.p05, _.high))), mt = Ae().defined((v) => Number.isFinite(v.p05) && Number.isFinite(v.p95) && v.p95 > _.veryHigh && v.p05 < _.veryHigh).x((v) => b(v.t)).y0((v) => k(v.p95)).y1((v) => k(_.veryHigh)), Nt = Ae().defined((v) => Number.isFinite(v.p05) && Number.isFinite(v.p95) && v.p05 > _.veryHigh).x((v) => b(v.t)).y0((v) => k(v.p95)).y1((v) => k(v.p05));
    S.append("path").attr("d", _t(K)).attr("fill", f("--cgm-low-strong", "#d73027")).attr("opacity", 0.18), S.append("path").attr("d", yt(K)).attr("fill", f("--cgm-in-range", "#1a9850")).attr("opacity", 0.12), S.append("path").attr("d", ht(K)).attr("fill", f("--cgm-high", "#fdae61")).attr("opacity", 0.18);
    const j = f("--cgm-very-high-strong", "#f46d43");
    S.append("path").attr("d", mt(K)).attr("fill", j).attr("opacity", 0.26), S.append("path").attr("d", Nt(K)).attr("fill", j).attr("opacity", 0.26);
    const F = Ae().defined((v) => Number.isFinite(v.p25) && Number.isFinite(v.p75) && v.p75 > _.low && v.p25 < _.high).x((v) => b(v.t)).y0((v) => k(Math.min(Math.max(v.p25, _.low), _.high))).y1((v) => k(Math.max(Math.min(v.p75, _.high), _.low))), M = Ae().defined((v) => Number.isFinite(v.p25) && Number.isFinite(v.p75) && v.p75 > _.high && v.p25 < _.vhigh).x((v) => b(v.t)).y0((v) => k(Math.min(v.p75, _.vhigh))).y1((v) => k(Math.max(v.p25, _.high))), $ = Ae().defined((v) => Number.isFinite(v.p25) && Number.isFinite(v.p75) && v.p75 > _.vhigh && v.p25 < _.vhigh).x((v) => b(v.t)).y0((v) => k(v.p75)).y1((v) => k(_.vhigh)), ut = Ae().defined((v) => Number.isFinite(v.p25) && Number.isFinite(v.p75) && v.p25 < _.low).x((v) => b(v.t)).y0((v) => k(v.p25)).y1((v) => k(Math.min(v.p75, _.low)));
    S.append("path").attr("d", ut(K)).attr("fill", f("--cgm-low-strong", "#d73027")).attr("opacity", 0.35), S.append("path").attr("d", F(K)).attr("fill", f("--cgm-in-range", "#1a9850")).attr("opacity", 0.25), S.append("path").attr("d", M(K)).attr("fill", f("--cgm-high", "#fdae61")).attr("opacity", 0.35), S.append("path").attr("d", $(K)).attr("fill", j).attr("opacity", 0.45);
    try {
      let Ct = function(ct, N, V) {
        return ct < V && N >= V || ct > V && N <= V;
      }, gt = function(ct, N, V, rt, Z) {
        return { t: ct + (Z - N) * (V - ct) / (rt - N), p50: Z };
      };
      const v = (ct) => ct < _.low ? f("--cgm-low-strong", "#d73027") : ct > _.vhigh ? f("--cgm-very-high-strong", "#f46d43") : ct > _.high ? f("--cgm-high", "#fdae61") : f("--cgm-in-range", "#1a9850"), Mt = Rn().x((ct) => b(ct.t)).y((ct) => k(ct.p50)), at = (ct, N, V, rt) => {
        !Number.isFinite(V.p50) || !Number.isFinite(rt.p50) || ((!ct.length || ct[ct.length - 1].color !== N) && ct.push({ color: N, arr: [V] }), ct[ct.length - 1].arr.push(rt));
      };
      let Et = [], Dt = null;
      for (let ct = 0; ct < K.length; ct++) {
        const N = K[ct];
        if (!Number.isFinite(N.p50)) {
          Dt = null;
          continue;
        }
        if (!Dt) {
          Dt = N;
          continue;
        }
        const V = Dt.t, rt = Dt.p50, Z = N.t, J = N.p50;
        let It = [{ t: V, p50: rt }], Rt = rt, Bt = V;
        const zt = [_.low, _.high, _.vhigh];
        (J > rt ? zt : zt.slice().reverse()).forEach((St) => {
          if (Ct(Rt, J, St)) {
            const it = gt(Bt, Rt, Z, J, St);
            It.push(it), Rt = it.p50, Bt = it.t;
          }
        }), It.push({ t: Z, p50: J });
        for (let St = 1; St < It.length; St++) {
          const it = It[St - 1], C = It[St], R = (it.p50 + C.p50) / 2 + (C.p50 === it.p50 ? C.t > it.t ? 1e-6 : -1e-6 : 0), G = v(R);
          at(Et, G, it, C);
        }
        Dt = N;
      }
      Et.forEach((ct) => {
        ct.arr.length >= 2 && S.append("path").attr("d", Mt(ct.arr)).attr("stroke", ct.color).attr("fill", "none").attr("stroke-width", 2);
      });
    } catch {
    }
    const xt = f("--cgm-threshold", "#6ea77b");
    S.append("line").attr("x1", s.l).attr("x2", l - s.r).attr("y1", k(_.high)).attr("y2", k(_.high)).attr("stroke", xt).attr("stroke-width", 1), S.append("line").attr("x1", s.l).attr("x2", l - s.r).attr("y1", k(_.low)).attr("y2", k(_.low)).attr("stroke", xt).attr("stroke-width", 1);
    const pt = f("--cgm-grid", "#cccccc");
    S.append("line").attr("x1", s.l).attr("x2", l - s.r).attr("y1", k(_.vlow)).attr("y2", k(_.vlow)).attr("stroke", pt).attr("stroke-width", 1), S.append("line").attr("x1", s.l).attr("x2", l - s.r).attr("y1", k(_.vhigh)).attr("y2", k(_.vhigh)).attr("stroke", pt).attr("stroke-width", 1);
    const L = 60 * 60 * 1e3 / r.stepMs, q = zr(0, 24, 3).map((v) => Math.round(v * L)), ot = (v) => v === 0 || v === 24 ? "12am" : v < 12 ? `${v}am` : v === 12 ? "12pm" : `${v - 12}pm`;
    S.append("g").attr("transform", `translate(0,${u - s.b})`).call(Wa(b).tickValues(q).tickFormat((v) => ot(Math.round(v / L))).tickSizeOuter(0));
    const T = [y().veryLow, y().low, y().high, y().veryHigh, g() ? 20 : 360].filter((v) => v >= _.veryLow && v <= P), bt = g() ? (v) => Math.round(v * 10) / 10 : (v) => Math.round(v);
    S.append("g").attr("transform", `translate(${s.l},0)`).call(qa(k).tickValues(T).tickFormat(bt)).call((v) => v.select(".domain").remove());
    try {
      if (B && B > 2) {
        const v = (Ct) => {
          for (let gt = K.length - 1; gt >= 0; gt--) {
            const Et = K[gt][Ct];
            if (Number.isFinite(Et)) return { t: K[gt].t, v: Et };
          }
          return null;
        }, at = (Ct, gt) => {
          if (!gt) return;
          const Et = Math.min(l - s.r - 2, b(gt.t) + 41), Dt = k(gt.v);
          Xe(a).append("text").attr("x", Et + 5).attr("y", Dt).attr("dy", "0.35em").attr("text-anchor", "start").attr("fill", "#000").attr("font-size", 11).attr("font-weight", Ct === 50 ? 700 : 400).text(`${Ct}%`);
        };
        at(5, v("p05")), at(25, v("p25")), at(50, v("p50")), at(75, v("p75")), at(95, v("p95"));
      }
    } catch {
    }
    try {
      let Et = function(Dt) {
        const ct = k(Dt), N = Xe(a).append("text").attr("x", -9999).attr("y", -9999).attr("fill", "#fff").attr("font-size", 11).attr("font-weight", 700).text(gt(Dt)), V = N.node().getBBox();
        N.remove();
        const rt = Math.ceil(V.width), Z = s.l - 8 - (rt + 6 * 2), J = ct - 16 / 2;
        Xe(a).append("rect").attr("x", Z).attr("y", J).attr("rx", 5).attr("ry", 5).attr("width", rt + 6 * 2).attr("height", 16).attr("fill", Ct), Xe(a).append("text").attr("x", Z + 6).attr("y", ct).attr("dy", "0.35em").attr("fill", "#fff").attr("font-size", 11).attr("font-weight", 700).text(gt(Dt));
      };
      const Ct = f("--cgm-in-range", "#1a9850"), gt = (Dt) => {
        if (g()) {
          const ct = (Math.round(Dt * 10) / 10).toFixed(1);
          return ct.endsWith(".0") ? ct.slice(0, -2) : ct;
        }
        return Math.round(Dt).toString();
      };
      Et(_.low), Et(_.high);
    } catch {
    }
  }
  _n(() => {
    D(), x(), window.addEventListener("resize", x);
  });
  function W(U) {
    De[U ? "unshift" : "push"](() => {
      a = U, n(0, a);
    });
  }
  return t.$$set = (U) => {
    "data" in U && n(1, r = U.data), "range" in U && n(2, i = U.range), "preset" in U && n(3, o = U.preset);
  }, t.$$.update = () => {
    t.$$.dirty & /*data, range, time, values, preset*/
    62 && r && i && p && w && o && x();
  }, [a, r, i, o, p, w, W];
}
class dh extends rn {
  constructor(e) {
    super(), nn(this, e, gh, hh, en, { data: 1, range: 2, preset: 3 });
  }
}
function mh(t) {
  let e;
  return {
    c() {
      e = st("svg"), X(e, "width", "100%"), X(e, "display", "block");
    },
    m(n, r) {
      Ft(n, e, r), t[5](e);
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
  function u(w, D) {
    try {
      return (getComputedStyle(l).getPropertyValue(w) || "").trim() || D;
    } catch {
      return D;
    }
  }
  const s = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), h = () => s() ? "mmol" : "mg";
  let f, g;
  function m() {
    if (!r) return;
    const w = new Date(r.t0).getTime();
    f = Float64Array.from({ length: r.glucose.length }, (D, E) => w + E * r.stepMs), g = Float64Array.from(r.glucose);
  }
  function y() {
    if (!l || !r || !i || !f || !g) return;
    const w = Xe(l);
    w.selectAll("*").remove();
    const D = l.getBoundingClientRect(), E = Math.max(360, D.width || 1100), x = 7, W = 0, U = 30, S = { l: 0, r: 0, t: 40, b: 0 }, Y = Math.max(100, Math.floor((E - S.l - S.r - (x - 1) * W) / x)), z = Math.round(86 * 0.8), K = Math.round(18 * 0.8), dt = i.start, B = i.end, O = ke.floor(new Date(dt)).getTime(), b = ke.floor(new Date(B)).getTime(), _ = new Date(O), P = new Date(b), k = (_.getDay() + 6) % 7, _t = 7 - (P.getDay() + 6) % 7 - 1, yt = ke.offset(new Date(O), -k).getTime(), ht = ke.offset(new Date(b), _t).getTime(), mt = ke.offset(new Date(ht), 1).getTime(), Nt = ke.range(new Date(yt), ke.offset(new Date(ht), 1)).map((q) => q.getTime()), j = Nt.length, F = Math.ceil(j / x), M = S.t + F * z + (F - 1) * U + S.b;
    l.setAttribute("height", M);
    const $ = new Map(Nt.map((q) => [q, []]));
    for (let q = 0; q < g.length; q++) {
      const ot = g[q];
      if (!(Number.isFinite(ot) && ot >= 0)) continue;
      const T = f[q];
      if (T < yt || T >= mt) continue;
      const bt = ke.floor(new Date(T)).getTime();
      $.has(bt) && $.get(bt).push({ t: T - bt, v: ot, a: T });
    }
    const ut = He[o].thresholds[h()], xt = 60 * 60 * 1e3 / r.stepMs;
    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((q, ot) => {
      F > 0 && Xe(l).append("text").attr("x", S.l + ot * (Y + W) + Y / 2).attr("y", 16).attr("text-anchor", "middle").attr("fill", u("--cgm-muted", "#555")).attr("font-size", 10).text(q);
    });
    for (let q = 1; q <= x - 1; q++) {
      const ot = S.l + q * (Y + W);
      for (let T = 0; T < F; T++) {
        const bt = S.t + T * (z + U);
        Xe(l).append("line").attr("x1", ot).attr("x2", ot).attr("y1", bt + 4).attr("y2", bt + z - 4).attr("stroke", u("--cgm-grid", "#e6e6e6")).attr("stroke-width", 1);
      }
    }
    const L = ke.floor(/* @__PURE__ */ new Date()).getTime();
    Nt.forEach((q, ot) => {
      const T = Math.floor(ot / x), bt = ot % x, v = S.l + bt * (Y + W), Mt = S.t + T * (z + U), at = w.append("g").attr("transform", `translate(${v},${Mt})`).attr("class", "day"), Ct = In().domain([0, 24 * xt - 1]).range([0, Y]), gt = In().domain(s() ? [0, 20] : [0, 360]).range([z - K, 0]), Et = q > L;
      Et || (at.append("rect").attr("x", 0).attr("y", gt(ut.high)).attr("width", Y).attr("height", Math.max(1, gt(ut.low) - gt(ut.high))).attr("fill", u("--cgm-target-band-bg", "#efefef")), at.append("line").attr("x1", 0).attr("x2", Y).attr("y1", gt(ut.high)).attr("y2", gt(ut.high)).attr("stroke", u("--cgm-threshold", "#2e7d32")).attr("opacity", 0.7), at.append("line").attr("x1", 0).attr("x2", Y).attr("y1", gt(ut.low)).attr("y2", gt(ut.low)).attr("stroke", u("--cgm-threshold", "#2e7d32")).attr("opacity", 0.7));
      const Dt = ($.get(q) || []).slice().sort((A, vt) => A.t - vt.t), ct = 2 * r.stepMs, N = [];
      let V = [];
      for (const A of Dt) {
        if (!Number.isFinite(A.v)) {
          V.length && (N.push(V), V = []);
          continue;
        }
        V.length && A.t - V[V.length - 1].t > ct ? (N.push(V), V = [A]) : V.push(A);
      }
      V.length && N.push(V);
      const rt = a ? yt : dt, Z = a ? mt - 1 : B, J = (A) => A.a >= rt && A.a <= Z, It = Ae().defined((A) => Number.isFinite(A.v) && A.v > ut.high && J(A)).x((A) => Ct(A.t / r.stepMs)).y0((A) => gt(ut.high)).y1((A) => gt(A.v));
      Et || N.forEach((A) => {
        A.length > 1 && at.append("path").attr("d", It(A)).attr("fill", u("--cgm-high", "#fdae61")).attr("opacity", 0.35);
      });
      const Rt = Ae().defined((A) => Number.isFinite(A.v) && A.v < ut.low && J(A)).x((A) => Ct(A.t / r.stepMs)).y0((A) => gt(A.v)).y1((A) => gt(ut.low));
      Et || N.forEach((A) => {
        A.length > 1 && at.append("path").attr("d", Rt(A)).attr("fill", u("--cgm-low-strong", "#d73027")).attr("opacity", 0.25);
      }), Rn().x((A) => Ct(A.t / r.stepMs)).y((A) => gt(A.v)).curve(Ur);
      const Bt = (A) => Number.isFinite(A.v) && J(A) && A.v >= ut.low && A.v <= ut.high, zt = (A) => Number.isFinite(A.v) && J(A) && A.v < ut.low, ne = (A) => Number.isFinite(A.v) && J(A) && A.v > ut.high, Kt = (A, vt) => Rn().defined(A).x((lt) => Ct(lt.t / r.stepMs)).y((lt) => gt(lt.v)).curve(Ur), St = Kt(Bt, u("--cgm-in-range", "#1a9850")), it = Kt(zt, u("--cgm-low-strong", "#d73027")), C = Kt(ne, u("--cgm-high", "#fdae61"));
      Et || N.forEach((A) => {
        if (A.length > 1) {
          const vt = Rn().defined((lt) => Number.isFinite(lt.v) && !J(lt)).x((lt) => Ct(lt.t / r.stepMs)).y((lt) => gt(lt.v)).curve(Ur);
          at.append("path").attr("d", vt(A)).attr("stroke", u("--cgm-context", "#c7c7c7")).attr("fill", "none").attr("stroke-width", 1.2).attr("opacity", 0.8), at.append("path").attr("d", it(A)).attr("stroke", "#d73027").attr("fill", "none").attr("stroke-width", 1.5), at.append("path").attr("d", C(A)).attr("stroke", "#fdae61").attr("fill", "none").attr("stroke-width", 1.5), at.append("path").attr("d", St(A)).attr("stroke", "#1a9850").attr("fill", "none").attr("stroke-width", 1.5);
        }
      });
      const R = new Date(q), G = R.getDate(), et = G === 1 ? `1 ${[
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
      Et || (at.append("text").attr("class", "date-label").attr("x", 0).attr("y", -8).attr("fill", "#777").attr("font-size", 10).attr("text-anchor", "start").text(et), T < F - 1 && at.append("text").attr("x", Y / 2).attr("y", z - 2).attr("text-anchor", "middle").attr("fill", "#777").attr("font-size", 10).text("12pm")), Et || at.append("rect").attr("x", -12).attr("y", -10).attr("width", Y + 12).attr("height", z).attr("fill", "transparent").on("mouseenter", () => at.classed("hover", !0)).on("mouseleave", () => at.classed("hover", !1));
    });
  }
  _n(() => {
    m(), y(), window.addEventListener("resize", y);
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
    super(), nn(this, e, ph, mh, en, {
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
      e = st("text"), r = Q(n), o = st("text"), l = Q(a), s = st("text"), f = Q(h), c(e, "x", "35"), c(e, "y", i = 30 + /*yAxisPositions*/
      t[11].low), c(e, "font-family", "Arial, sans-serif"), c(e, "font-size", "10"), c(e, "fill", "#666"), c(e, "text-anchor", "end"), c(o, "x", "35"), c(o, "y", u = 30 + /*yAxisPositions*/
      t[11].high), c(o, "font-family", "Arial, sans-serif"), c(o, "font-size", "10"), c(o, "fill", "#666"), c(o, "text-anchor", "end"), c(s, "x", "35"), c(s, "y", g = 30 + /*yAxisPositions*/
      t[11].vhigh), c(s, "font-family", "Arial, sans-serif"), c(s, "font-size", "10"), c(s, "fill", "#666"), c(s, "text-anchor", "end");
    },
    m(m, y) {
      Ft(m, e, y), d(e, r), Ft(m, o, y), d(o, l), Ft(m, s, y), d(s, f);
    },
    p(m, y) {
      y[0] & /*currentThresholds*/
      64 && n !== (n = /*isMmol*/
      (m[15]() ? (
        /*currentThresholds*/
        m[6].low.toFixed(1)
      ) : (
        /*currentThresholds*/
        m[6].low
      )) + "") && Vt(r, n), y[0] & /*yAxisPositions*/
      2048 && i !== (i = 30 + /*yAxisPositions*/
      m[11].low) && c(e, "y", i), y[0] & /*currentThresholds*/
      64 && a !== (a = /*isMmol*/
      (m[15]() ? (
        /*currentThresholds*/
        m[6].high.toFixed(1)
      ) : (
        /*currentThresholds*/
        m[6].high
      )) + "") && Vt(l, a), y[0] & /*yAxisPositions*/
      2048 && u !== (u = 30 + /*yAxisPositions*/
      m[11].high) && c(o, "y", u), y[0] & /*currentThresholds*/
      64 && h !== (h = /*isMmol*/
      (m[15]() ? (
        /*currentThresholds*/
        m[6].veryHigh.toFixed(1)
      ) : (
        /*currentThresholds*/
        m[6].veryHigh
      )) + "") && Vt(f, h), y[0] & /*yAxisPositions*/
      2048 && g !== (g = 30 + /*yAxisPositions*/
      m[11].vhigh) && c(s, "y", g);
    },
    d(m) {
      m && (At(e), At(o), At(s));
    }
  };
}
function Zi(t) {
  let e, n, r;
  return {
    c() {
      e = st("line"), c(e, "x1", "90"), c(e, "y1", n = 30 + /*linePositions*/
      t[3].high), c(e, "x2", Ce), c(e, "y2", r = /*textPositions*/
      t[10].high - 40), c(e, "stroke", "#ccc"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Ft(i, e, o);
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
      e = st("line"), c(e, "x1", "90"), c(e, "y1", n = 30 + /*linePositions*/
      t[3].targ), c(e, "x2", Ce), c(e, "y2", r = /*textPositions*/
      t[10].targ - 40), c(e, "stroke", "#ccc"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Ft(i, e, o);
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
      e = st("line"), c(e, "x1", "90"), c(e, "y1", n = 30 + /*linePositions*/
      t[3].low), c(e, "x2", Ce), c(e, "y2", r = /*textPositions*/
      t[10].low - 40), c(e, "stroke", "#ccc"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Ft(i, e, o);
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
      e = st("rect"), c(e, "x", "40"), c(e, "y", n = 30 + /*barPositions*/
      t[4].vlow), c(e, "width", "50"), c(e, "height", r = /*barHeights*/
      t[5].vlow), c(
        e,
        "fill",
        /*cssVar*/
        t[14]("--cgm-very-low", "#e57373")
      );
    },
    m(i, o) {
      Ft(i, e, o);
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
      e = st("rect"), c(e, "x", "40"), c(e, "y", n = 30 + /*barPositions*/
      t[4].low), c(e, "width", "50"), c(e, "height", r = /*barHeights*/
      t[5].low), c(
        e,
        "fill",
        /*cssVar*/
        t[14]("--cgm-low", "#ff9e80")
      );
    },
    m(i, o) {
      Ft(i, e, o);
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
      e = st("rect"), c(e, "x", "40"), c(e, "y", n = 30 + /*barPositions*/
      t[4].targ), c(e, "width", "50"), c(e, "height", r = /*barHeights*/
      t[5].targ), c(
        e,
        "fill",
        /*cssVar*/
        t[14]("--cgm-in-range", "#86c89d")
      );
    },
    m(i, o) {
      Ft(i, e, o);
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
      e = st("rect"), c(e, "x", "40"), c(e, "y", n = 30 + /*barPositions*/
      t[4].high), c(e, "width", "50"), c(e, "height", r = /*barHeights*/
      t[5].high), c(
        e,
        "fill",
        /*cssVar*/
        t[14]("--cgm-high", "#ffcc80")
      );
    },
    m(i, o) {
      Ft(i, e, o);
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
      e = st("rect"), c(e, "x", "40"), c(e, "y", n = 30 + /*barPositions*/
      t[4].vhigh), c(e, "width", "50"), c(e, "height", r = /*barHeights*/
      t[5].vhigh), c(
        e,
        "fill",
        /*cssVar*/
        t[14]("--cgm-very-high", "#ff8a65")
      );
    },
    m(i, o) {
      Ft(i, e, o);
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
      o && o.m(s, h), Ft(s, e, h), a && a.m(s, h), Ft(s, n, h), l && l.m(s, h), Ft(s, r, h), u && u.m(s, h), Ft(s, i, h);
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
      e = st("line"), c(e, "x1", "40"), c(e, "x2", "90"), c(e, "y1", n = 30 + /*barPositions*/
      t[4].vlow), c(e, "y2", r = 30 + /*barPositions*/
      t[4].vlow), c(e, "stroke", "#fff"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Ft(i, e, o);
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
      e = st("line"), c(e, "x1", "40"), c(e, "x2", "90"), c(e, "y1", n = 30 + /*barPositions*/
      t[4].low), c(e, "y2", r = 30 + /*barPositions*/
      t[4].low), c(e, "stroke", "#fff"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Ft(i, e, o);
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
      e = st("line"), c(e, "x1", "40"), c(e, "x2", "90"), c(e, "y1", n = 30 + /*barPositions*/
      t[4].targ), c(e, "y2", r = 30 + /*barPositions*/
      t[4].targ), c(e, "stroke", "#fff"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Ft(i, e, o);
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
      e = st("line"), c(e, "x1", "40"), c(e, "x2", "90"), c(e, "y1", n = 30 + /*barPositions*/
      t[4].high), c(e, "y2", r = 30 + /*barPositions*/
      t[4].high), c(e, "stroke", "#fff"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Ft(i, e, o);
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
  let e, n, r, i, o, a, l, u, s, h, f, g, m, y, p, w, D, E, x, W, U = (
    /*getRangeText*/
    t[12]("vhigh") + ""
  ), S, Y, z, K, dt = Math.round(
    /*pct*/
    t[1].vhigh
  ) + "", B, O, b, _, P = (
    /*displayTime*/
    t[13] ? `(${Ye(
      /*minutes*/
      t[9].vhigh
    )})` : `Goal ${/*goalPct*/
    t[17]("veryHigh")}`
  ), k, _t, yt, ht, mt, Nt, j, F, M, $ = (
    /*getRangeText*/
    t[12]("high") + ""
  ), ut, xt, pt, L, q = Math.round(
    /*pct*/
    t[1].high
  ) + "", ot, T, bt, v, Mt = (
    /*displayTime*/
    t[13] ? `(${Ye(
      /*minutes*/
      t[9].high
    )})` : `Goal ${/*goalPct*/
    t[17]("high")}`
  ), at, Ct, gt, Et, Dt, ct, N, V, rt, Z = (
    /*getRangeText*/
    t[12]("targ") + ""
  ), J, It, Rt, Bt, zt = Math.round(
    /*pct*/
    t[1].targ
  ) + "", ne, Kt, St, it, C = (
    /*displayTime*/
    t[13] ? `(${Ye(
      /*minutes*/
      t[9].targ
    )})` : `Goal ${/*goalPct*/
    t[17]("inRange")}`
  ), R, G, I, H, et, A, vt, lt, Ot, Ut = (
    /*getRangeText*/
    t[12]("low") + ""
  ), ft, jt, Wt, Zt, ee = Math.round(
    /*pct*/
    t[1].low
  ) + "", qt, Qt, Pt, Gt, Tt = (
    /*displayTime*/
    t[13] ? `(${Ye(
      /*minutes*/
      t[9].low
    )})` : `Goal ${/*goalPct*/
    t[17]("low")}`
  ), Lt, kt, re, Jt, $t, Xt, Te, ie, ce, ue = (
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
  ), de = (
    /*pct*/
    t[1].targ > 0 && Qi(t)
  ), me = (
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
      e = tt("div"), n = st("svg"), he && he.c(), r = st("path"), ge && ge.c(), o = Fe(), de && de.c(), a = Fe(), me && me.c(), l = st("path"), s = st("rect"), pe && pe.c(), h = Fe(), ye && ye.c(), f = Fe(), we && we.c(), g = Fe(), ve && ve.c(), m = Fe(), _e && _e.c(), y = Fe(), be && be.c(), p = st("g"), w = st("text"), D = st("tspan"), E = Q("Very High"), x = wt(), W = st("tspan"), S = Q(U), Y = wt(), z = st("text"), K = st("tspan"), B = Q(dt), O = Q("%"), b = wt(), _ = st("tspan"), k = Q(P), _t = wt(), ht = st("g"), mt = st("text"), Nt = st("tspan"), j = Q("High"), F = wt(), M = st("tspan"), ut = Q($), xt = wt(), pt = st("text"), L = st("tspan"), ot = Q(q), T = Q("%"), bt = wt(), v = st("tspan"), at = Q(Mt), Ct = wt(), Et = st("g"), Dt = st("text"), ct = st("tspan"), N = Q("Target"), V = wt(), rt = st("tspan"), J = Q(Z), It = wt(), Rt = st("text"), Bt = st("tspan"), ne = Q(zt), Kt = Q("%"), St = wt(), it = st("tspan"), R = Q(C), G = wt(), H = st("g"), et = st("text"), A = st("tspan"), vt = Q("Low"), lt = wt(), Ot = st("tspan"), ft = Q(Ut), jt = wt(), Wt = st("text"), Zt = st("tspan"), qt = Q(ee), Qt = Q("%"), Pt = wt(), Gt = st("tspan"), Lt = Q(Tt), kt = wt(), Jt = st("g"), $t = st("text"), Xt = st("tspan"), Te = Q("Very Low"), ie = wt(), ce = st("tspan"), fe = Q(ue), bn = wt(), Ee = st("text"), qe = st("tspan"), Mn = Q(ln), sn = Q("%"), li = wt(), xn = st("tspan"), vr = Q(Bn), c(r, "d", i = "M 40 " + (30 + /*linePositions*/
      t[3].vhigh) + " L 65 " + (30 + /*linePositions*/
      t[3].vhigh) + " L 65 25 Q 65 15 70 15 L " + Ce + " 15"), c(r, "stroke", "#ccc"), c(r, "stroke-width", "1"), c(r, "fill", "none"), c(l, "d", u = "M 40 " + (30 + /*linePositions*/
      t[3].vlow) + " L 65 " + (30 + /*linePositions*/
      t[3].vlow) + " L 65 225 Q 65 230 70 230 L " + Ce + " 230"), c(l, "stroke", "#ccc"), c(l, "stroke-width", "1"), c(l, "fill", "none"), c(s, "x", "40"), c(s, "y", "30"), c(s, "width", "50"), c(s, "height", "180"), c(s, "fill", "white"), c(s, "stroke", "#ccc"), c(s, "stroke-width", "1"), c(D, "font-size", "12"), c(D, "font-weight", "bold"), c(D, "fill", "#333"), c(W, "font-size", "10"), c(W, "fill", "#777"), c(w, "x", "103"), c(w, "y", "0"), c(w, "font-family", "Arial, sans-serif"), c(K, "font-size", "12"), c(K, "font-weight", "bold"), c(K, "fill", "#333"), c(_, "font-size", "10"), c(_, "fill", "#777"), c(z, "x", Ce), c(z, "y", "0"), c(z, "font-family", "Arial, sans-serif"), c(z, "text-anchor", "end"), c(p, "transform", yt = "translate(0, " + /*textPositions*/
      (t[10].vhigh - 40) + ")"), c(Nt, "font-size", "12"), c(Nt, "font-weight", "bold"), c(Nt, "fill", "#333"), c(M, "font-size", "10"), c(M, "fill", "#777"), c(mt, "x", "103"), c(mt, "y", "0"), c(mt, "font-family", "Arial, sans-serif"), c(L, "font-size", "12"), c(L, "font-weight", "bold"), c(L, "fill", "#333"), c(v, "font-size", "10"), c(v, "fill", "#777"), c(pt, "x", Ce), c(pt, "y", "0"), c(pt, "font-family", "Arial, sans-serif"), c(pt, "text-anchor", "end"), c(ht, "transform", gt = "translate(0, " + /*textPositions*/
      (t[10].high - 40) + ")"), c(ct, "font-size", "12"), c(ct, "font-weight", "bold"), c(ct, "fill", "#333"), c(rt, "font-size", "10"), c(rt, "fill", "#777"), c(Dt, "x", "103"), c(Dt, "y", "0"), c(Dt, "font-family", "Arial, sans-serif"), c(Bt, "font-size", "12"), c(Bt, "font-weight", "bold"), c(Bt, "fill", "#333"), c(it, "font-size", "10"), c(it, "fill", "#777"), c(Rt, "x", Ce), c(Rt, "y", "0"), c(Rt, "font-family", "Arial, sans-serif"), c(Rt, "text-anchor", "end"), c(Et, "transform", I = "translate(0, " + /*textPositions*/
      (t[10].targ - 40) + ")"), c(A, "font-size", "12"), c(A, "font-weight", "bold"), c(A, "fill", "#333"), c(Ot, "font-size", "10"), c(Ot, "fill", "#777"), c(et, "x", "103"), c(et, "y", "0"), c(et, "font-family", "Arial, sans-serif"), c(Zt, "font-size", "12"), c(Zt, "font-weight", "bold"), c(Zt, "fill", "#333"), c(Gt, "font-size", "10"), c(Gt, "fill", "#777"), c(Wt, "x", Ce), c(Wt, "y", "0"), c(Wt, "font-family", "Arial, sans-serif"), c(Wt, "text-anchor", "end"), c(H, "transform", re = "translate(0, " + /*textPositions*/
      (t[10].low - 40) + ")"), c(Xt, "font-size", "12"), c(Xt, "font-weight", "bold"), c(Xt, "fill", "#333"), c(ce, "font-size", "10"), c(ce, "fill", "#777"), c($t, "x", "103"), c($t, "y", "0"), c($t, "font-family", "Arial, sans-serif"), c(qe, "font-size", "12"), c(qe, "font-weight", "bold"), c(qe, "fill", "#333"), c(xn, "font-size", "10"), c(xn, "fill", "#777"), c(Ee, "x", "340"), c(Ee, "y", "0"), c(Ee, "font-family", "Arial, sans-serif"), c(Ee, "text-anchor", "end"), c(Jt, "transform", Gn = "translate(0, " + /*textPositions*/
      (t[10].vlow - 40) + ")"), c(
        n,
        "width",
        /*svgWidth*/
        t[16]
      ), c(n, "height", so), c(n, "viewBox", "0 0 " + /*svgWidth*/
      t[16] + " " + so), c(n, "class", "svelte-1d3n1f2"), c(e, "class", "widget-container svelte-1d3n1f2"), c(e, "role", "img"), c(e, "aria-label", "TIR detailed");
    },
    m(nt, Yt) {
      Ft(nt, e, Yt), d(e, n), he && he.m(n, null), d(n, r), ge && ge.m(n, null), d(n, o), de && de.m(n, null), d(n, a), me && me.m(n, null), d(n, l), d(n, s), pe && pe.m(n, null), d(n, h), ye && ye.m(n, null), d(n, f), we && we.m(n, null), d(n, g), ve && ve.m(n, null), d(n, m), _e && _e.m(n, null), d(n, y), be && be.m(n, null), d(n, p), d(p, w), d(w, D), d(D, E), d(w, x), d(w, W), d(W, S), d(w, Y), d(p, z), d(z, K), d(K, B), d(K, O), d(z, b), d(z, _), d(_, k), d(z, _t), d(n, ht), d(ht, mt), d(mt, Nt), d(Nt, j), d(mt, F), d(mt, M), d(M, ut), d(mt, xt), d(ht, pt), d(pt, L), d(L, ot), d(L, T), d(pt, bt), d(pt, v), d(v, at), d(pt, Ct), d(n, Et), d(Et, Dt), d(Dt, ct), d(ct, N), d(Dt, V), d(Dt, rt), d(rt, J), d(Dt, It), d(Et, Rt), d(Rt, Bt), d(Bt, ne), d(Bt, Kt), d(Rt, St), d(Rt, it), d(it, R), d(Rt, G), d(n, H), d(H, et), d(et, A), d(A, vt), d(et, lt), d(et, Ot), d(Ot, ft), d(et, jt), d(H, Wt), d(Wt, Zt), d(Zt, qt), d(Zt, Qt), d(Wt, Pt), d(Wt, Gt), d(Gt, Lt), d(Wt, kt), d(n, Jt), d(Jt, $t), d($t, Xt), d(Xt, Te), d($t, ie), d($t, ce), d(ce, fe), d($t, bn), d(Jt, Ee), d(Ee, qe), d(qe, Mn), d(qe, sn), d(Ee, li), d(Ee, xn), d(xn, vr), t[24](n), _r || (si = [
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
    p(nt, Yt) {
      /*present*/
      nt[8] > 0 ? he ? he.p(nt, Yt) : (he = Ki(nt), he.c(), he.m(n, r)) : he && (he.d(1), he = null), Yt[0] & /*linePositions*/
      8 && i !== (i = "M 40 " + (30 + /*linePositions*/
      nt[3].vhigh) + " L 65 " + (30 + /*linePositions*/
      nt[3].vhigh) + " L 65 25 Q 65 15 70 15 L " + Ce + " 15") && c(r, "d", i), /*pct*/
      nt[1].high > 0 ? ge ? ge.p(nt, Yt) : (ge = Zi(nt), ge.c(), ge.m(n, o)) : ge && (ge.d(1), ge = null), /*pct*/
      nt[1].targ > 0 ? de ? de.p(nt, Yt) : (de = Qi(nt), de.c(), de.m(n, a)) : de && (de.d(1), de = null), /*pct*/
      nt[1].low > 0 ? me ? me.p(nt, Yt) : (me = Ji(nt), me.c(), me.m(n, l)) : me && (me.d(1), me = null), Yt[0] & /*linePositions*/
      8 && u !== (u = "M 40 " + (30 + /*linePositions*/
      nt[3].vlow) + " L 65 " + (30 + /*linePositions*/
      nt[3].vlow) + " L 65 225 Q 65 230 70 230 L " + Ce + " 230") && c(l, "d", u), /*barHeights*/
      nt[5].vlow > 0 ? pe ? pe.p(nt, Yt) : (pe = ji(nt), pe.c(), pe.m(n, h)) : pe && (pe.d(1), pe = null), /*barHeights*/
      nt[5].low > 0 ? ye ? ye.p(nt, Yt) : (ye = $i(nt), ye.c(), ye.m(n, f)) : ye && (ye.d(1), ye = null), /*barHeights*/
      nt[5].targ > 0 ? we ? we.p(nt, Yt) : (we = to(nt), we.c(), we.m(n, g)) : we && (we.d(1), we = null), /*barHeights*/
      nt[5].high > 0 ? ve ? ve.p(nt, Yt) : (ve = eo(nt), ve.c(), ve.m(n, m)) : ve && (ve.d(1), ve = null), /*barHeights*/
      nt[5].vhigh > 0 ? _e ? _e.p(nt, Yt) : (_e = no(nt), _e.c(), _e.m(n, y)) : _e && (_e.d(1), _e = null), /*showSeparators*/
      nt[0] ? be ? be.p(nt, Yt) : (be = ro(nt), be.c(), be.m(n, p)) : be && (be.d(1), be = null), Yt[0] & /*getRangeText*/
      4096 && U !== (U = /*getRangeText*/
      nt[12]("vhigh") + "") && Vt(S, U), Yt[0] & /*pct*/
      2 && dt !== (dt = Math.round(
        /*pct*/
        nt[1].vhigh
      ) + "") && Vt(B, dt), Yt[0] & /*displayTime, minutes*/
      8704 && P !== (P = /*displayTime*/
      nt[13] ? `(${Ye(
        /*minutes*/
        nt[9].vhigh
      )})` : `Goal ${/*goalPct*/
      nt[17]("veryHigh")}`) && Vt(k, P), Yt[0] & /*textPositions*/
      1024 && yt !== (yt = "translate(0, " + /*textPositions*/
      (nt[10].vhigh - 40) + ")") && c(p, "transform", yt), Yt[0] & /*getRangeText*/
      4096 && $ !== ($ = /*getRangeText*/
      nt[12]("high") + "") && Vt(ut, $), Yt[0] & /*pct*/
      2 && q !== (q = Math.round(
        /*pct*/
        nt[1].high
      ) + "") && Vt(ot, q), Yt[0] & /*displayTime, minutes*/
      8704 && Mt !== (Mt = /*displayTime*/
      nt[13] ? `(${Ye(
        /*minutes*/
        nt[9].high
      )})` : `Goal ${/*goalPct*/
      nt[17]("high")}`) && Vt(at, Mt), Yt[0] & /*textPositions*/
      1024 && gt !== (gt = "translate(0, " + /*textPositions*/
      (nt[10].high - 40) + ")") && c(ht, "transform", gt), Yt[0] & /*getRangeText*/
      4096 && Z !== (Z = /*getRangeText*/
      nt[12]("targ") + "") && Vt(J, Z), Yt[0] & /*pct*/
      2 && zt !== (zt = Math.round(
        /*pct*/
        nt[1].targ
      ) + "") && Vt(ne, zt), Yt[0] & /*displayTime, minutes*/
      8704 && C !== (C = /*displayTime*/
      nt[13] ? `(${Ye(
        /*minutes*/
        nt[9].targ
      )})` : `Goal ${/*goalPct*/
      nt[17]("inRange")}`) && Vt(R, C), Yt[0] & /*textPositions*/
      1024 && I !== (I = "translate(0, " + /*textPositions*/
      (nt[10].targ - 40) + ")") && c(Et, "transform", I), Yt[0] & /*getRangeText*/
      4096 && Ut !== (Ut = /*getRangeText*/
      nt[12]("low") + "") && Vt(ft, Ut), Yt[0] & /*pct*/
      2 && ee !== (ee = Math.round(
        /*pct*/
        nt[1].low
      ) + "") && Vt(qt, ee), Yt[0] & /*displayTime, minutes*/
      8704 && Tt !== (Tt = /*displayTime*/
      nt[13] ? `(${Ye(
        /*minutes*/
        nt[9].low
      )})` : `Goal ${/*goalPct*/
      nt[17]("low")}`) && Vt(Lt, Tt), Yt[0] & /*textPositions*/
      1024 && re !== (re = "translate(0, " + /*textPositions*/
      (nt[10].low - 40) + ")") && c(H, "transform", re), Yt[0] & /*getRangeText*/
      4096 && ue !== (ue = /*getRangeText*/
      nt[12]("vlow") + "") && Vt(fe, ue), Yt[0] & /*pct*/
      2 && ln !== (ln = Math.round(
        /*pct*/
        nt[1].vlow
      ) + "") && Vt(Mn, ln), Yt[0] & /*displayTime, minutes*/
      8704 && Bn !== (Bn = /*displayTime*/
      nt[13] ? `(${Ye(
        /*minutes*/
        nt[9].vlow
      )})` : `Goal ${/*goalPct*/
      nt[17]("veryLow")}`) && Vt(vr, Bn), Yt[0] & /*textPositions*/
      1024 && Gn !== (Gn = "translate(0, " + /*textPositions*/
      (nt[10].vlow - 40) + ")") && c(Jt, "transform", Gn);
    },
    i: ae,
    o: ae,
    d(nt) {
      nt && At(e), he && he.d(), ge && ge.d(), de && de.d(), me && me.d(), pe && pe.d(), ye && ye.d(), we && we.d(), ve && ve.d(), _e && _e.d(), be && be.d(), t[24](null), _r = !1, Ge(si);
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
  const f = mr();
  let g;
  function m(j, F) {
    try {
      return (getComputedStyle(g).getPropertyValue(j) || "").trim() || F;
    } catch {
      return F;
    }
  }
  let { data: y } = e, { range: p = null } = e, { preset: w = "general" } = e, { showSeparators: D = !1 } = e, E, x;
  const W = () => /mmol/i.test((y == null ? void 0 : y.units) || "mmol"), U = () => W() ? "mmol" : "mg", S = () => W() ? "mmol/L" : "mg/dL", Y = He, z = () => Y[w].thresholds[U()];
  let K = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  }, dt = 0, B = 0, O = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  }, b = !1, { showTime: _ = !1 } = e;
  function P() {
    if (!y) return;
    const j = new Date(y.t0).getTime();
    n(22, E = Float64Array.from({ length: y.glucose.length }, (F, M) => j + M * y.stepMs)), n(23, x = Float64Array.from(y.glucose));
  }
  function k() {
    try {
      f("stats", {
        pct: K,
        present: dt,
        expected: B,
        preset: w,
        units: (y == null ? void 0 : y.units) || "mmol/L"
      });
    } catch {
    }
  }
  const _t = Ce + 10;
  function yt(j) {
    return He[w].percentGoals[j];
  }
  function ht(j) {
    De[j ? "unshift" : "push"](() => {
      g = j, n(7, g);
    });
  }
  const mt = () => n(2, b = !0), Nt = () => n(2, b = !1);
  return t.$$set = (j) => {
    "data" in j && n(18, y = j.data), "range" in j && n(19, p = j.range), "preset" in j && n(20, w = j.preset), "showSeparators" in j && n(0, D = j.showSeparators), "showTime" in j && n(21, _ = j.showTime);
  }, t.$$.update = () => {
    if (t.$$.dirty[0] & /*preset, data*/
    1310720 && n(6, r = z()), t.$$.dirty[0] & /*hoverAll, showTime*/
    2097156 && n(13, i = b || _), t.$$.dirty[0] & /*data*/
    262144 && y && P(), t.$$.dirty[0] & /*data, range, time, values, preset*/
    14417920 && y && p && E && x && w) {
      const { start: j, end: F } = p, M = Math.max(0, Math.ceil((j - E[0]) / y.stepMs)), $ = Math.min(x.length - 1, Math.floor((F - E[0]) / y.stepMs));
      if ($ < M)
        n(1, K = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }), n(8, dt = 0), B = 0, n(9, O = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        });
      else {
        const ut = z();
        let xt = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, pt = 0;
        for (let L = M; L <= $; L++) {
          const q = x[L];
          Number.isFinite(q) && q >= 0 && (pt++, q < ut.veryLow ? xt.vlow++ : q < ut.low ? xt.low++ : q <= ut.high ? xt.targ++ : q <= ut.veryHigh ? xt.high++ : xt.vhigh++);
        }
        if (n(8, dt = pt), B = Math.max(1, $ - M + 1), pt === 0)
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
            vlow: xt.vlow / pt * 100,
            low: xt.low / pt * 100,
            targ: xt.targ / pt * 100,
            high: xt.high / pt * 100,
            vhigh: xt.vhigh / pt * 100
          });
          const L = 24 * 60;
          n(9, O = {
            vlow: xt.vlow / pt * L,
            low: xt.low / pt * L,
            targ: xt.targ / pt * L,
            high: xt.high / pt * L,
            vhigh: xt.vhigh / pt * L
          });
        }
      }
      k();
    }
    t.$$.dirty[0] & /*currentThresholds*/
    64 && n(12, o = (j) => {
      const F = r;
      return j === "vhigh" ? `>${F.veryHigh} ${S()}` : j === "high" ? `${F.high}-${F.veryHigh} ${S()}` : j === "targ" ? `${F.low}-${F.high} ${S()}` : j === "low" ? `${F.veryLow}-${F.low} ${S()}` : j === "vlow" ? `<${F.veryLow} ${S()}` : "";
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
    D,
    K,
    b,
    u,
    l,
    a,
    r,
    g,
    dt,
    O,
    h,
    s,
    o,
    i,
    m,
    W,
    _t,
    yt,
    y,
    p,
    w,
    _,
    E,
    x,
    ht,
    mt,
    Nt
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
    const D = a.get(p) || [];
    D.push(w), a.set(p, D);
  }
  o.$on("rangechange", (p) => {
    var D;
    const w = p.detail;
    l = { start: w.start, end: w.end }, (D = a.get("rangechange")) == null || D.forEach((E) => E(w));
  }), o.$on("ready", (p) => {
    var D;
    const w = p.detail;
    l = { start: w.start, end: w.end }, (D = a.get("ready")) == null || D.forEach((E) => E(w));
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
  function m(p) {
    o.$set({ showMonthLabels: !!p });
  }
  function y(p) {
    o.$set({ showCanvas: !!p });
  }
  return { on: u, setRange: s, getRange: h, setPreset: f, setDataVisible: g, setMonthLabels: m, setCanvasVisible: y, destroy: () => o.$destroy() };
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
    const D = a.get(p) || [];
    D.push(w), a.set(p, D);
  }
  o.$on("rangechange", (p) => {
    var D;
    const w = p.detail;
    l = { start: w.start, end: w.end }, (D = a.get("rangechange")) == null || D.forEach((E) => E(w));
  }), o.$on("ready", (p) => {
    var D;
    const w = p.detail;
    l = { start: w.start, end: w.end }, (D = a.get("ready")) == null || D.forEach((E) => E(w));
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
  function m(p) {
    o.$set({ showMonthLabels: !!p });
  }
  function y(p) {
    o.$set({ showCanvas: !!p });
  }
  return { on: u, setRange: s, getRange: h, setPreset: f, setDataVisible: g, setMonthLabels: m, setCanvasVisible: y, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createTirCalendarLine = bh);
function Mh(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = (g) => {
    if (!g) return "general";
    const m = String(g).toLowerCase();
    return m === "tight" || m === "t" ? "tight" : m === "pregnancy" || m === "p" ? "pregnancy" : "general";
  }, a = new rh({ target: r, props: { data: e, range: i, preset: o(n.preset) } }), l = /* @__PURE__ */ new Map();
  function u(g, m) {
    if (typeof g == "number" && typeof m == "number") a.$set({ range: { start: g, end: m } });
    else if (g && typeof g.start == "number" && typeof g.end == "number") a.$set({ range: g });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function s(g) {
    a.$set({ data: g });
  }
  function h(g, m) {
    const y = l.get(g) || [];
    y.push(m), l.set(g, y);
  }
  if (a.$on("presetchange", (g) => {
    var y;
    const m = g.detail;
    if (n.onPresetChange) try {
      n.onPresetChange(m.preset);
    } catch {
    }
    (y = l.get("presetchange")) == null || y.forEach((p) => p(m));
  }), n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: g, end: m }) => u({ start: g, end: m })), n.source.on("ready", ({ start: g, end: m }) => u({ start: g, end: m })), typeof n.source.getRange == "function")) {
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
    u = p, (w = l.get("stats")) == null || w.forEach((D) => D(p));
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
  function m() {
    return u;
  }
  return { on: s, setRange: h, setData: f, setPreset: g, getStats: m, destroy: () => a.$destroy() };
}
typeof window < "u" && (window.createCgmTir = xh);
function Th(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = (h) => {
    if (!h) return "general";
    const f = String(h).toLowerCase();
    return f === "tight" || f === "t" ? "tight" : f === "pregnancy" || f === "p" ? "pregnancy" : "general";
  }, a = new dh({ target: r, props: { data: e, range: i, preset: o(n.preset) } });
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
typeof window < "u" && (window.createCgmAgp = Th);
function kh(t, e, n = {}) {
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
typeof window < "u" && (window.createCgmStrips = kh);
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
    const D = l.get(p) || [];
    D.push(w), l.set(p, D);
  }
  a.$on("stats", (p) => {
    var D;
    const w = p.detail;
    u = w, (D = l.get("stats")) == null || D.forEach((E) => E(w));
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
  function m(p) {
    a.$set({ preset: o(p) });
  }
  function y() {
    return u;
  }
  return { on: s, setRange: h, setData: f, setPreset: m, setShowTime: g, getStats: y, destroy: () => a.$destroy() };
}
typeof window < "u" && (window.createCgmTirDetailed = Ch);
export {
  Th as createCgmAgp,
  kh as createCgmStrips,
  Mh as createCgmSummary,
  xh as createCgmTir,
  Ch as createCgmTirDetailed,
  uo as createTirCalendar,
  bh as createTirCalendarLine
};

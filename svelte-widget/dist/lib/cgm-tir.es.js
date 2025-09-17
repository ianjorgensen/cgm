var ta = Object.defineProperty;
var ea = (t, e, n) => e in t ? ta(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var yr = (t, e, n) => ea(t, typeof e != "symbol" ? e + "" : e, n);
function ie() {
}
function io(t) {
  return t();
}
function oi() {
  return /* @__PURE__ */ Object.create(null);
}
function Xe(t) {
  t.forEach(io);
}
function oo(t) {
  return typeof t == "function";
}
function tn(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function na(t) {
  return Object.keys(t).length === 0;
}
function ee(t) {
  return t ?? "";
}
function d(t, e) {
  t.appendChild(e);
}
function Et(t, e, n) {
  t.insertBefore(e, n || null);
}
function Lt(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function nt(t) {
  return document.createElement(t);
}
function ht(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function O(t) {
  return document.createTextNode(t);
}
function _t() {
  return O(" ");
}
function Ae() {
  return O("");
}
function oe(t, e, n, r) {
  return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
}
function c(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function ra(t) {
  return Array.from(t.childNodes);
}
function Wt(t, e) {
  e = "" + e, t.data !== e && (t.data = /** @type {string} */
  e);
}
function J(t, e, n, r) {
  n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, "");
}
function ia(t, e, { bubbles: n = !1, cancelable: r = !1 } = {}) {
  return new CustomEvent(t, { detail: e, bubbles: n, cancelable: r });
}
let Fn;
function Sn(t) {
  Fn = t;
}
function ao() {
  if (!Fn) throw new Error("Function called outside component initialization");
  return Fn;
}
function yn(t) {
  ao().$$.on_mount.push(t);
}
function cr() {
  const t = ao();
  return (e, n, { cancelable: r = !1 } = {}) => {
    const i = t.$$.callbacks[e];
    if (i) {
      const o = ia(
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
const sn = [], Ue = [];
let cn = [];
const ai = [], oa = /* @__PURE__ */ Promise.resolve();
let Ar = !1;
function aa() {
  Ar || (Ar = !0, oa.then(lo));
}
function Fr(t) {
  cn.push(t);
}
const wr = /* @__PURE__ */ new Set();
let an = 0;
function lo() {
  if (an !== 0)
    return;
  const t = Fn;
  do {
    try {
      for (; an < sn.length; ) {
        const e = sn[an];
        an++, Sn(e), la(e.$$);
      }
    } catch (e) {
      throw sn.length = 0, an = 0, e;
    }
    for (Sn(null), sn.length = 0, an = 0; Ue.length; ) Ue.pop()();
    for (let e = 0; e < cn.length; e += 1) {
      const n = cn[e];
      wr.has(n) || (wr.add(n), n());
    }
    cn.length = 0;
  } while (sn.length);
  for (; ai.length; )
    ai.pop()();
  Ar = !1, wr.clear(), Sn(t);
}
function la(t) {
  if (t.fragment !== null) {
    t.update(), Xe(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(Fr);
  }
}
function sa(t) {
  const e = [], n = [];
  cn.forEach((r) => t.indexOf(r) === -1 ? e.push(r) : n.push(r)), n.forEach((r) => r()), cn = e;
}
const ua = /* @__PURE__ */ new Set();
function ca(t, e) {
  t && t.i && (ua.delete(t), t.i(e));
}
function fa(t, e, n) {
  const { fragment: r, after_update: i } = t.$$;
  r && r.m(e, n), Fr(() => {
    const o = t.$$.on_mount.map(io).filter(oo);
    t.$$.on_destroy ? t.$$.on_destroy.push(...o) : Xe(o), t.$$.on_mount = [];
  }), i.forEach(Fr);
}
function ha(t, e) {
  const n = t.$$;
  n.fragment !== null && (sa(n.after_update), Xe(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function ga(t, e) {
  t.$$.dirty[0] === -1 && (sn.push(t), aa(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function en(t, e, n, r, i, o, a = null, l = [-1]) {
  const u = Fn;
  Sn(t);
  const s = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: o,
    update: ie,
    not_equal: i,
    bound: oi(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (u ? u.$$.context : [])),
    // everything else
    callbacks: oi(),
    dirty: l,
    skip_bound: !1,
    root: e.target || u.$$.root
  };
  a && a(s.root);
  let h = !1;
  if (s.ctx = n ? n(t, e.props || {}, (f, g, ...p) => {
    const w = p.length ? p[0] : g;
    return s.ctx && i(s.ctx[f], s.ctx[f] = w) && (!s.skip_bound && s.bound[f] && s.bound[f](w), h && ga(t, f)), g;
  }) : [], s.update(), h = !0, Xe(s.before_update), s.fragment = r ? r(s.ctx) : !1, e.target) {
    if (e.hydrate) {
      const f = ra(e.target);
      s.fragment && s.fragment.l(f), f.forEach(Lt);
    } else
      s.fragment && s.fragment.c();
    e.intro && ca(t.$$.fragment), fa(t, e.target, e.anchor), lo();
  }
  Sn(u);
}
class nn {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    yr(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    yr(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    ha(this, 1), this.$destroy = ie;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, n) {
    if (!oo(n))
      return ie;
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
    this.$$set && !na(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const da = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(da);
function On(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ma(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function so(t) {
  let e, n, r;
  t.length !== 2 ? (e = On, n = (l, u) => On(t(l), u), r = (l, u) => t(l) - u) : (e = t === On || t === ma ? t : pa, n = t, r = t);
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
function pa() {
  return 0;
}
function ya(t) {
  return t === null ? NaN : +t;
}
const wa = so(On), va = wa.right;
so(ya).center;
function _a(t, e) {
  let n = 0, r, i = 0, o = 0;
  for (let a of t)
    a != null && (a = +a) >= a && (r = a - i, i += r / ++n, o += r * (a - i));
  if (n > 1) return o / (n - 1);
}
const ba = Math.sqrt(50), Ma = Math.sqrt(10), xa = Math.sqrt(2);
function Jn(t, e, n) {
  const r = (e - t) / Math.max(0, n), i = Math.floor(Math.log10(r)), o = r / Math.pow(10, i), a = o >= ba ? 10 : o >= Ma ? 5 : o >= xa ? 2 : 1;
  let l, u, s;
  return i < 0 ? (s = Math.pow(10, -i) / a, l = Math.round(t * s), u = Math.round(e * s), l / s < t && ++l, u / s > e && --u, s = -s) : (s = Math.pow(10, i) * a, l = Math.round(t / s), u = Math.round(e / s), l * s < t && ++l, u * s > e && --u), u < l && 0.5 <= n && n < 2 ? Jn(t, e, n * 2) : [l, u, s];
}
function ka(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const r = e < t, [i, o, a] = r ? Jn(e, t, n) : Jn(t, e, n);
  if (!(o >= i)) return [];
  const l = o - i + 1, u = new Array(l);
  if (r)
    if (a < 0) for (let s = 0; s < l; ++s) u[s] = (o - s) / -a;
    else for (let s = 0; s < l; ++s) u[s] = (o - s) * a;
  else if (a < 0) for (let s = 0; s < l; ++s) u[s] = (i + s) / -a;
  else for (let s = 0; s < l; ++s) u[s] = (i + s) * a;
  return u;
}
function Nr(t, e, n) {
  return e = +e, t = +t, n = +n, Jn(t, e, n)[2];
}
function Ta(t, e, n) {
  e = +e, t = +t, n = +n;
  const r = e < t, i = r ? Nr(e, t, n) : Nr(t, e, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function Ca(t, e) {
  let n = 0, r = 0;
  for (let i of t)
    i != null && (i = +i) >= i && (++n, r += i);
  if (n) return r / n;
}
function Ur(t, e, n) {
  t = +t, e = +e, n = (i = arguments.length) < 2 ? (e = t, t = 0, 1) : i < 3 ? 1 : +n;
  for (var r = -1, i = Math.max(0, Math.ceil((e - t) / n)) | 0, o = new Array(i); ++r < i; )
    o[r] = t + r * n;
  return o;
}
function Da(t) {
  return t;
}
var vr = 1, _r = 2, Lr = 3, kn = 4, li = 1e-6;
function Sa(t) {
  return "translate(" + t + ",0)";
}
function Aa(t) {
  return "translate(0," + t + ")";
}
function Fa(t) {
  return (e) => +t(e);
}
function Na(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function Ua() {
  return !this.__axis;
}
function uo(t, e) {
  var n = [], r = null, i = null, o = 6, a = 6, l = 3, u = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, s = t === vr || t === kn ? -1 : 1, h = t === kn || t === _r ? "x" : "y", f = t === vr || t === Lr ? Sa : Aa;
  function g(p) {
    var w = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), y = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : Da), m = Math.max(o, 0) + l, R = e.range(), M = +R[0] + u, L = +R[R.length - 1] + u, V = (e.bandwidth ? Na : Fa)(e.copy(), u), A = p.selection ? p.selection() : p, F = A.selectAll(".domain").data([null]), S = A.selectAll(".tick").data(w, e).order(), B = S.exit(), K = S.enter().append("g").attr("class", "tick"), pt = S.select("line"), X = S.select("text");
    F = F.merge(F.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), S = S.merge(K), pt = pt.merge(K.append("line").attr("stroke", "currentColor").attr(h + "2", s * o)), X = X.merge(K.append("text").attr("fill", "currentColor").attr(h, s * m).attr("dy", t === vr ? "0em" : t === Lr ? "0.71em" : "0.32em")), p !== A && (F = F.transition(p), S = S.transition(p), pt = pt.transition(p), X = X.transition(p), B = B.transition(p).attr("opacity", li).attr("transform", function(k) {
      return isFinite(k = V(k)) ? f(k + u) : this.getAttribute("transform");
    }), K.attr("opacity", li).attr("transform", function(k) {
      var x = this.parentNode.__axis;
      return f((x && isFinite(x = x(k)) ? x : V(k)) + u);
    })), B.remove(), F.attr("d", t === kn || t === _r ? a ? "M" + s * a + "," + M + "H" + u + "V" + L + "H" + s * a : "M" + u + "," + M + "V" + L : a ? "M" + M + "," + s * a + "V" + u + "H" + L + "V" + s * a : "M" + M + "," + u + "H" + L), S.attr("opacity", 1).attr("transform", function(k) {
      return f(V(k) + u);
    }), pt.attr(h + "2", s * o), X.attr(h, s * m).text(y), A.filter(Ua).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === _r ? "start" : t === kn ? "end" : "middle"), A.each(function() {
      this.__axis = V;
    });
  }
  return g.scale = function(p) {
    return arguments.length ? (e = p, g) : e;
  }, g.ticks = function() {
    return n = Array.from(arguments), g;
  }, g.tickArguments = function(p) {
    return arguments.length ? (n = p == null ? [] : Array.from(p), g) : n.slice();
  }, g.tickValues = function(p) {
    return arguments.length ? (r = p == null ? null : Array.from(p), g) : r && r.slice();
  }, g.tickFormat = function(p) {
    return arguments.length ? (i = p, g) : i;
  }, g.tickSize = function(p) {
    return arguments.length ? (o = a = +p, g) : o;
  }, g.tickSizeInner = function(p) {
    return arguments.length ? (o = +p, g) : o;
  }, g.tickSizeOuter = function(p) {
    return arguments.length ? (a = +p, g) : a;
  }, g.tickPadding = function(p) {
    return arguments.length ? (l = +p, g) : l;
  }, g.offset = function(p) {
    return arguments.length ? (u = +p, g) : u;
  }, g;
}
function La(t) {
  return uo(Lr, t);
}
function Ea(t) {
  return uo(kn, t);
}
var Ra = { value: () => {
} };
function co() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Kn(n);
}
function Kn(t) {
  this._ = t;
}
function Ya(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Kn.prototype = co.prototype = {
  constructor: Kn,
  on: function(t, e) {
    var n = this._, r = Ya(t + "", n), i, o = -1, a = r.length;
    if (arguments.length < 2) {
      for (; ++o < a; ) if ((i = (t = r[o]).type) && (i = Ha(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++o < a; )
      if (i = (t = r[o]).type) n[i] = si(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = si(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Kn(t);
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
function Ha(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function si(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Ra, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Er = "http://www.w3.org/1999/xhtml";
const ui = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Er,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function fr(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), ui.hasOwnProperty(e) ? { space: ui[e], local: t } : t;
}
function Pa(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Er && e.documentElement.namespaceURI === Er ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function za(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function fo(t) {
  var e = fr(t);
  return (e.local ? za : Pa)(e);
}
function Ia() {
}
function Br(t) {
  return t == null ? Ia : function() {
    return this.querySelector(t);
  };
}
function Wa(t) {
  typeof t != "function" && (t = Br(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, l = r[i] = new Array(a), u, s, h = 0; h < a; ++h)
      (u = o[h]) && (s = t.call(u, u.__data__, h, o)) && ("__data__" in u && (s.__data__ = u.__data__), l[h] = s);
  return new Me(r, this._parents);
}
function qa(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Va() {
  return [];
}
function ho(t) {
  return t == null ? Va : function() {
    return this.querySelectorAll(t);
  };
}
function Ba(t) {
  return function() {
    return qa(t.apply(this, arguments));
  };
}
function Xa(t) {
  typeof t == "function" ? t = Ba(t) : t = ho(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var a = e[o], l = a.length, u, s = 0; s < l; ++s)
      (u = a[s]) && (r.push(t.call(u, u.__data__, s, a)), i.push(u));
  return new Me(r, i);
}
function go(t) {
  return function() {
    return this.matches(t);
  };
}
function mo(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Ga = Array.prototype.find;
function Oa(t) {
  return function() {
    return Ga.call(this.children, t);
  };
}
function Ka() {
  return this.firstElementChild;
}
function Za(t) {
  return this.select(t == null ? Ka : Oa(typeof t == "function" ? t : mo(t)));
}
var Qa = Array.prototype.filter;
function Ja() {
  return Array.from(this.children);
}
function ja(t) {
  return function() {
    return Qa.call(this.children, t);
  };
}
function $a(t) {
  return this.selectAll(t == null ? Ja : ja(typeof t == "function" ? t : mo(t)));
}
function tl(t) {
  typeof t != "function" && (t = go(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, l = r[i] = [], u, s = 0; s < a; ++s)
      (u = o[s]) && t.call(u, u.__data__, s, o) && l.push(u);
  return new Me(r, this._parents);
}
function po(t) {
  return new Array(t.length);
}
function el() {
  return new Me(this._enter || this._groups.map(po), this._parents);
}
function jn(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
jn.prototype = {
  constructor: jn,
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
function nl(t) {
  return function() {
    return t;
  };
}
function rl(t, e, n, r, i, o) {
  for (var a = 0, l, u = e.length, s = o.length; a < s; ++a)
    (l = e[a]) ? (l.__data__ = o[a], r[a] = l) : n[a] = new jn(t, o[a]);
  for (; a < u; ++a)
    (l = e[a]) && (i[a] = l);
}
function il(t, e, n, r, i, o, a) {
  var l, u, s = /* @__PURE__ */ new Map(), h = e.length, f = o.length, g = new Array(h), p;
  for (l = 0; l < h; ++l)
    (u = e[l]) && (g[l] = p = a.call(u, u.__data__, l, e) + "", s.has(p) ? i[l] = u : s.set(p, u));
  for (l = 0; l < f; ++l)
    p = a.call(t, o[l], l, o) + "", (u = s.get(p)) ? (r[l] = u, u.__data__ = o[l], s.delete(p)) : n[l] = new jn(t, o[l]);
  for (l = 0; l < h; ++l)
    (u = e[l]) && s.get(g[l]) === u && (i[l] = u);
}
function ol(t) {
  return t.__data__;
}
function al(t, e) {
  if (!arguments.length) return Array.from(this, ol);
  var n = e ? il : rl, r = this._parents, i = this._groups;
  typeof t != "function" && (t = nl(t));
  for (var o = i.length, a = new Array(o), l = new Array(o), u = new Array(o), s = 0; s < o; ++s) {
    var h = r[s], f = i[s], g = f.length, p = ll(t.call(h, h && h.__data__, s, r)), w = p.length, y = l[s] = new Array(w), m = a[s] = new Array(w), R = u[s] = new Array(g);
    n(h, f, y, m, R, p, e);
    for (var M = 0, L = 0, V, A; M < w; ++M)
      if (V = y[M]) {
        for (M >= L && (L = M + 1); !(A = m[L]) && ++L < w; ) ;
        V._next = A || null;
      }
  }
  return a = new Me(a, r), a._enter = l, a._exit = u, a;
}
function ll(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function sl() {
  return new Me(this._exit || this._groups.map(po), this._parents);
}
function ul(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function cl(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, a = Math.min(i, o), l = new Array(i), u = 0; u < a; ++u)
    for (var s = n[u], h = r[u], f = s.length, g = l[u] = new Array(f), p, w = 0; w < f; ++w)
      (p = s[w] || h[w]) && (g[w] = p);
  for (; u < i; ++u)
    l[u] = n[u];
  return new Me(l, this._parents);
}
function fl() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], a; --i >= 0; )
      (a = r[i]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function hl(t) {
  t || (t = gl);
  function e(f, g) {
    return f && g ? t(f.__data__, g.__data__) : !f - !g;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var a = n[o], l = a.length, u = i[o] = new Array(l), s, h = 0; h < l; ++h)
      (s = a[h]) && (u[h] = s);
    u.sort(e);
  }
  return new Me(i, this._parents).order();
}
function gl(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function dl() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function ml() {
  return Array.from(this);
}
function pl() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var a = r[i];
      if (a) return a;
    }
  return null;
}
function yl() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function wl() {
  return !this.node();
}
function vl(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, a = i.length, l; o < a; ++o)
      (l = i[o]) && t.call(l, l.__data__, o, i);
  return this;
}
function _l(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function bl(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ml(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function xl(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function kl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Tl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Cl(t, e) {
  var n = fr(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? bl : _l : typeof e == "function" ? n.local ? Tl : kl : n.local ? xl : Ml)(n, e));
}
function yo(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Dl(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Sl(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Al(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Fl(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Dl : typeof e == "function" ? Al : Sl)(t, e, n ?? "")) : hn(this.node(), t);
}
function hn(t, e) {
  return t.style.getPropertyValue(e) || yo(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Nl(t) {
  return function() {
    delete this[t];
  };
}
function Ul(t, e) {
  return function() {
    this[t] = e;
  };
}
function Ll(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function El(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Nl : typeof e == "function" ? Ll : Ul)(t, e)) : this.node()[t];
}
function wo(t) {
  return t.trim().split(/^|\s+/);
}
function Xr(t) {
  return t.classList || new vo(t);
}
function vo(t) {
  this._node = t, this._names = wo(t.getAttribute("class") || "");
}
vo.prototype = {
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
function _o(t, e) {
  for (var n = Xr(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function bo(t, e) {
  for (var n = Xr(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function Rl(t) {
  return function() {
    _o(this, t);
  };
}
function Yl(t) {
  return function() {
    bo(this, t);
  };
}
function Hl(t, e) {
  return function() {
    (e.apply(this, arguments) ? _o : bo)(this, t);
  };
}
function Pl(t, e) {
  var n = wo(t + "");
  if (arguments.length < 2) {
    for (var r = Xr(this.node()), i = -1, o = n.length; ++i < o; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Hl : e ? Rl : Yl)(n, e));
}
function zl() {
  this.textContent = "";
}
function Il(t) {
  return function() {
    this.textContent = t;
  };
}
function Wl(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function ql(t) {
  return arguments.length ? this.each(t == null ? zl : (typeof t == "function" ? Wl : Il)(t)) : this.node().textContent;
}
function Vl() {
  this.innerHTML = "";
}
function Bl(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Xl(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Gl(t) {
  return arguments.length ? this.each(t == null ? Vl : (typeof t == "function" ? Xl : Bl)(t)) : this.node().innerHTML;
}
function Ol() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Kl() {
  return this.each(Ol);
}
function Zl() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ql() {
  return this.each(Zl);
}
function Jl(t) {
  var e = typeof t == "function" ? t : fo(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function jl() {
  return null;
}
function $l(t, e) {
  var n = typeof t == "function" ? t : fo(t), r = e == null ? jl : typeof e == "function" ? e : Br(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function ts() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function es() {
  return this.each(ts);
}
function ns() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function rs() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function is(t) {
  return this.select(t ? rs : ns);
}
function os(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function as(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function ls(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function ss(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function us(t, e, n) {
  return function() {
    var r = this.__on, i, o = as(e);
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
function cs(t, e, n) {
  var r = ls(t + ""), i, o = r.length, a;
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
  for (l = e ? us : ss, i = 0; i < o; ++i) this.each(l(r[i], e, n));
  return this;
}
function Mo(t, e, n) {
  var r = yo(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function fs(t, e) {
  return function() {
    return Mo(this, t, e);
  };
}
function hs(t, e) {
  return function() {
    return Mo(this, t, e.apply(this, arguments));
  };
}
function gs(t, e) {
  return this.each((typeof e == "function" ? hs : fs)(t, e));
}
function* ds() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, a; i < o; ++i)
      (a = r[i]) && (yield a);
}
var xo = [null];
function Me(t, e) {
  this._groups = t, this._parents = e;
}
function Yn() {
  return new Me([[document.documentElement]], xo);
}
function ms() {
  return this;
}
Me.prototype = Yn.prototype = {
  constructor: Me,
  select: Wa,
  selectAll: Xa,
  selectChild: Za,
  selectChildren: $a,
  filter: tl,
  data: al,
  enter: el,
  exit: sl,
  join: ul,
  merge: cl,
  selection: ms,
  order: fl,
  sort: hl,
  call: dl,
  nodes: ml,
  node: pl,
  size: yl,
  empty: wl,
  each: vl,
  attr: Cl,
  style: Fl,
  property: El,
  classed: Pl,
  text: ql,
  html: Gl,
  raise: Kl,
  lower: Ql,
  append: Jl,
  insert: $l,
  remove: es,
  clone: is,
  datum: os,
  on: cs,
  dispatch: gs,
  [Symbol.iterator]: ds
};
function Be(t) {
  return typeof t == "string" ? new Me([[document.querySelector(t)]], [document.documentElement]) : new Me([[t]], xo);
}
function Gr(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function ko(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function Hn() {
}
var Nn = 0.7, $n = 1 / Nn, fn = "\\s*([+-]?\\d+)\\s*", Un = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ye = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ps = /^#([0-9a-f]{3,8})$/, ys = new RegExp(`^rgb\\(${fn},${fn},${fn}\\)$`), ws = new RegExp(`^rgb\\(${Ye},${Ye},${Ye}\\)$`), vs = new RegExp(`^rgba\\(${fn},${fn},${fn},${Un}\\)$`), _s = new RegExp(`^rgba\\(${Ye},${Ye},${Ye},${Un}\\)$`), bs = new RegExp(`^hsl\\(${Un},${Ye},${Ye}\\)$`), Ms = new RegExp(`^hsla\\(${Un},${Ye},${Ye},${Un}\\)$`), ci = {
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
Gr(Hn, Qe, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: fi,
  // Deprecated! Use color.formatHex.
  formatHex: fi,
  formatHex8: xs,
  formatHsl: ks,
  formatRgb: hi,
  toString: hi
});
function fi() {
  return this.rgb().formatHex();
}
function xs() {
  return this.rgb().formatHex8();
}
function ks() {
  return To(this).formatHsl();
}
function hi() {
  return this.rgb().formatRgb();
}
function Qe(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = ps.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? gi(e) : n === 3 ? new be(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? qn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? qn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = ys.exec(t)) ? new be(e[1], e[2], e[3], 1) : (e = ws.exec(t)) ? new be(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = vs.exec(t)) ? qn(e[1], e[2], e[3], e[4]) : (e = _s.exec(t)) ? qn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = bs.exec(t)) ? pi(e[1], e[2] / 100, e[3] / 100, 1) : (e = Ms.exec(t)) ? pi(e[1], e[2] / 100, e[3] / 100, e[4]) : ci.hasOwnProperty(t) ? gi(ci[t]) : t === "transparent" ? new be(NaN, NaN, NaN, 0) : null;
}
function gi(t) {
  return new be(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function qn(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new be(t, e, n, r);
}
function Ts(t) {
  return t instanceof Hn || (t = Qe(t)), t ? (t = t.rgb(), new be(t.r, t.g, t.b, t.opacity)) : new be();
}
function Rr(t, e, n, r) {
  return arguments.length === 1 ? Ts(t) : new be(t, e, n, r ?? 1);
}
function be(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Gr(be, Rr, ko(Hn, {
  brighter(t) {
    return t = t == null ? $n : Math.pow($n, t), new be(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Nn : Math.pow(Nn, t), new be(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new be(Ze(this.r), Ze(this.g), Ze(this.b), tr(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: di,
  // Deprecated! Use color.formatHex.
  formatHex: di,
  formatHex8: Cs,
  formatRgb: mi,
  toString: mi
}));
function di() {
  return `#${Ke(this.r)}${Ke(this.g)}${Ke(this.b)}`;
}
function Cs() {
  return `#${Ke(this.r)}${Ke(this.g)}${Ke(this.b)}${Ke((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function mi() {
  const t = tr(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Ze(this.r)}, ${Ze(this.g)}, ${Ze(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function tr(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Ze(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Ke(t) {
  return t = Ze(t), (t < 16 ? "0" : "") + t.toString(16);
}
function pi(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new Ne(t, e, n, r);
}
function To(t) {
  if (t instanceof Ne) return new Ne(t.h, t.s, t.l, t.opacity);
  if (t instanceof Hn || (t = Qe(t)), !t) return new Ne();
  if (t instanceof Ne) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), a = NaN, l = o - i, u = (o + i) / 2;
  return l ? (e === o ? a = (n - r) / l + (n < r) * 6 : n === o ? a = (r - e) / l + 2 : a = (e - n) / l + 4, l /= u < 0.5 ? o + i : 2 - o - i, a *= 60) : l = u > 0 && u < 1 ? 0 : a, new Ne(a, l, u, t.opacity);
}
function Ds(t, e, n, r) {
  return arguments.length === 1 ? To(t) : new Ne(t, e, n, r ?? 1);
}
function Ne(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Gr(Ne, Ds, ko(Hn, {
  brighter(t) {
    return t = t == null ? $n : Math.pow($n, t), new Ne(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Nn : Math.pow(Nn, t), new Ne(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new be(
      br(t >= 240 ? t - 240 : t + 120, i, r),
      br(t, i, r),
      br(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new Ne(yi(this.h), Vn(this.s), Vn(this.l), tr(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = tr(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${yi(this.h)}, ${Vn(this.s) * 100}%, ${Vn(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function yi(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Vn(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function br(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Or = (t) => () => t;
function Ss(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function As(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function Fs(t) {
  return (t = +t) == 1 ? Co : function(e, n) {
    return n - e ? As(e, n, t) : Or(isNaN(e) ? n : e);
  };
}
function Co(t, e) {
  var n = e - t;
  return n ? Ss(t, n) : Or(isNaN(t) ? e : t);
}
const er = function t(e) {
  var n = Fs(e);
  function r(i, o) {
    var a = n((i = Rr(i)).r, (o = Rr(o)).r), l = n(i.g, o.g), u = n(i.b, o.b), s = Co(i.opacity, o.opacity);
    return function(h) {
      return i.r = a(h), i.g = l(h), i.b = u(h), i.opacity = s(h), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Ns(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(o) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - o) + e[i] * o;
    return r;
  };
}
function Us(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Ls(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), o = new Array(n), a;
  for (a = 0; a < r; ++a) i[a] = Kr(t[a], e[a]);
  for (; a < n; ++a) o[a] = e[a];
  return function(l) {
    for (a = 0; a < r; ++a) o[a] = i[a](l);
    return o;
  };
}
function Es(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function Fe(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Rs(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Kr(t[i], e[i]) : r[i] = e[i];
  return function(o) {
    for (i in n) r[i] = n[i](o);
    return r;
  };
}
var Yr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Mr = new RegExp(Yr.source, "g");
function Ys(t) {
  return function() {
    return t;
  };
}
function Hs(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Do(t, e) {
  var n = Yr.lastIndex = Mr.lastIndex = 0, r, i, o, a = -1, l = [], u = [];
  for (t = t + "", e = e + ""; (r = Yr.exec(t)) && (i = Mr.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), l[a] ? l[a] += o : l[++a] = o), (r = r[0]) === (i = i[0]) ? l[a] ? l[a] += i : l[++a] = i : (l[++a] = null, u.push({ i: a, x: Fe(r, i) })), n = Mr.lastIndex;
  return n < e.length && (o = e.slice(n), l[a] ? l[a] += o : l[++a] = o), l.length < 2 ? u[0] ? Hs(u[0].x) : Ys(e) : (e = u.length, function(s) {
    for (var h = 0, f; h < e; ++h) l[(f = u[h]).i] = f.x(s);
    return l.join("");
  });
}
function Kr(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Or(e) : (n === "number" ? Fe : n === "string" ? (r = Qe(e)) ? (e = r, er) : Do : e instanceof Qe ? er : e instanceof Date ? Es : Us(e) ? Ns : Array.isArray(e) ? Ls : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Rs : Fe)(t, e);
}
function Ps(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var wi = 180 / Math.PI, Hr = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function So(t, e, n, r, i, o) {
  var a, l, u;
  return (a = Math.sqrt(t * t + e * e)) && (t /= a, e /= a), (u = t * n + e * r) && (n -= t * u, r -= e * u), (l = Math.sqrt(n * n + r * r)) && (n /= l, r /= l, u /= l), t * r < e * n && (t = -t, e = -e, u = -u, a = -a), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * wi,
    skewX: Math.atan(u) * wi,
    scaleX: a,
    scaleY: l
  };
}
var Bn;
function zs(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Hr : So(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Is(t) {
  return t == null || (Bn || (Bn = document.createElementNS("http://www.w3.org/2000/svg", "g")), Bn.setAttribute("transform", t), !(t = Bn.transform.baseVal.consolidate())) ? Hr : (t = t.matrix, So(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Ao(t, e, n, r) {
  function i(s) {
    return s.length ? s.pop() + " " : "";
  }
  function o(s, h, f, g, p, w) {
    if (s !== f || h !== g) {
      var y = p.push("translate(", null, e, null, n);
      w.push({ i: y - 4, x: Fe(s, f) }, { i: y - 2, x: Fe(h, g) });
    } else (f || g) && p.push("translate(" + f + e + g + n);
  }
  function a(s, h, f, g) {
    s !== h ? (s - h > 180 ? h += 360 : h - s > 180 && (s += 360), g.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: Fe(s, h) })) : h && f.push(i(f) + "rotate(" + h + r);
  }
  function l(s, h, f, g) {
    s !== h ? g.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: Fe(s, h) }) : h && f.push(i(f) + "skewX(" + h + r);
  }
  function u(s, h, f, g, p, w) {
    if (s !== f || h !== g) {
      var y = p.push(i(p) + "scale(", null, ",", null, ")");
      w.push({ i: y - 4, x: Fe(s, f) }, { i: y - 2, x: Fe(h, g) });
    } else (f !== 1 || g !== 1) && p.push(i(p) + "scale(" + f + "," + g + ")");
  }
  return function(s, h) {
    var f = [], g = [];
    return s = t(s), h = t(h), o(s.translateX, s.translateY, h.translateX, h.translateY, f, g), a(s.rotate, h.rotate, f, g), l(s.skewX, h.skewX, f, g), u(s.scaleX, s.scaleY, h.scaleX, h.scaleY, f, g), s = h = null, function(p) {
      for (var w = -1, y = g.length, m; ++w < y; ) f[(m = g[w]).i] = m.x(p);
      return f.join("");
    };
  };
}
var Ws = Ao(zs, "px, ", "px)", "deg)"), qs = Ao(Is, ", ", ")", ")"), gn = 0, Tn = 0, vn = 0, Fo = 1e3, nr, Cn, rr = 0, Je = 0, hr = 0, Ln = typeof performance == "object" && performance.now ? performance : Date, No = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Zr() {
  return Je || (No(Vs), Je = Ln.now() + hr);
}
function Vs() {
  Je = 0;
}
function ir() {
  this._call = this._time = this._next = null;
}
ir.prototype = Uo.prototype = {
  constructor: ir,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Zr() : +n) + (e == null ? 0 : +e), !this._next && Cn !== this && (Cn ? Cn._next = this : nr = this, Cn = this), this._call = t, this._time = n, Pr();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Pr());
  }
};
function Uo(t, e, n) {
  var r = new ir();
  return r.restart(t, e, n), r;
}
function Bs() {
  Zr(), ++gn;
  for (var t = nr, e; t; )
    (e = Je - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --gn;
}
function vi() {
  Je = (rr = Ln.now()) + hr, gn = Tn = 0;
  try {
    Bs();
  } finally {
    gn = 0, Gs(), Je = 0;
  }
}
function Xs() {
  var t = Ln.now(), e = t - rr;
  e > Fo && (hr -= e, rr = t);
}
function Gs() {
  for (var t, e = nr, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : nr = n);
  Cn = t, Pr(r);
}
function Pr(t) {
  if (!gn) {
    Tn && (Tn = clearTimeout(Tn));
    var e = t - Je;
    e > 24 ? (t < 1 / 0 && (Tn = setTimeout(vi, t - Ln.now() - hr)), vn && (vn = clearInterval(vn))) : (vn || (rr = Ln.now(), vn = setInterval(Xs, Fo)), gn = 1, No(vi));
  }
}
function _i(t, e, n) {
  var r = new ir();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Os = co("start", "end", "cancel", "interrupt"), Ks = [], Lo = 0, bi = 1, zr = 2, Zn = 3, Mi = 4, Ir = 5, Qn = 6;
function gr(t, e, n, r, i, o) {
  var a = t.__transition;
  if (!a) t.__transition = {};
  else if (n in a) return;
  Zs(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Os,
    tween: Ks,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Lo
  });
}
function Qr(t, e) {
  var n = Le(t, e);
  if (n.state > Lo) throw new Error("too late; already scheduled");
  return n;
}
function Pe(t, e) {
  var n = Le(t, e);
  if (n.state > Zn) throw new Error("too late; already running");
  return n;
}
function Le(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Zs(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Uo(o, 0, n.time);
  function o(s) {
    n.state = bi, n.timer.restart(a, n.delay, n.time), n.delay <= s && a(s - n.delay);
  }
  function a(s) {
    var h, f, g, p;
    if (n.state !== bi) return u();
    for (h in r)
      if (p = r[h], p.name === n.name) {
        if (p.state === Zn) return _i(a);
        p.state === Mi ? (p.state = Qn, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[h]) : +h < e && (p.state = Qn, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[h]);
      }
    if (_i(function() {
      n.state === Zn && (n.state = Mi, n.timer.restart(l, n.delay, n.time), l(s));
    }), n.state = zr, n.on.call("start", t, t.__data__, n.index, n.group), n.state === zr) {
      for (n.state = Zn, i = new Array(g = n.tween.length), h = 0, f = -1; h < g; ++h)
        (p = n.tween[h].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = p);
      i.length = f + 1;
    }
  }
  function l(s) {
    for (var h = s < n.duration ? n.ease.call(null, s / n.duration) : (n.timer.restart(u), n.state = Ir, 1), f = -1, g = i.length; ++f < g; )
      i[f].call(t, h);
    n.state === Ir && (n.on.call("end", t, t.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = Qn, n.timer.stop(), delete r[e];
    for (var s in r) return;
    delete t.__transition;
  }
}
function Qs(t, e) {
  var n = t.__transition, r, i, o = !0, a;
  if (n) {
    e = e == null ? null : e + "";
    for (a in n) {
      if ((r = n[a]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > zr && r.state < Ir, r.state = Qn, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[a];
    }
    o && delete t.__transition;
  }
}
function Js(t) {
  return this.each(function() {
    Qs(this, t);
  });
}
function js(t, e) {
  var n, r;
  return function() {
    var i = Pe(this, t), o = i.tween;
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
function $s(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = Pe(this, t), a = o.tween;
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
function tu(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = Le(this.node(), n).tween, i = 0, o = r.length, a; i < o; ++i)
      if ((a = r[i]).name === t)
        return a.value;
    return null;
  }
  return this.each((e == null ? js : $s)(n, t, e));
}
function Jr(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = Pe(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return Le(i, r).value[e];
  };
}
function Eo(t, e) {
  var n;
  return (typeof e == "number" ? Fe : e instanceof Qe ? er : (n = Qe(e)) ? (e = n, er) : Do)(t, e);
}
function eu(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function nu(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ru(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttribute(t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function iu(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttributeNS(t.space, t.local);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function ou(t, e, n) {
  var r, i, o;
  return function() {
    var a, l = n(this), u;
    return l == null ? void this.removeAttribute(t) : (a = this.getAttribute(t), u = l + "", a === u ? null : a === r && u === i ? o : (i = u, o = e(r = a, l)));
  };
}
function au(t, e, n) {
  var r, i, o;
  return function() {
    var a, l = n(this), u;
    return l == null ? void this.removeAttributeNS(t.space, t.local) : (a = this.getAttributeNS(t.space, t.local), u = l + "", a === u ? null : a === r && u === i ? o : (i = u, o = e(r = a, l)));
  };
}
function lu(t, e) {
  var n = fr(t), r = n === "transform" ? qs : Eo;
  return this.attrTween(t, typeof e == "function" ? (n.local ? au : ou)(n, r, Jr(this, "attr." + t, e)) : e == null ? (n.local ? nu : eu)(n) : (n.local ? iu : ru)(n, r, e));
}
function su(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function uu(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function cu(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && uu(t, o)), n;
  }
  return i._value = e, i;
}
function fu(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && su(t, o)), n;
  }
  return i._value = e, i;
}
function hu(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = fr(t);
  return this.tween(n, (r.local ? cu : fu)(r, e));
}
function gu(t, e) {
  return function() {
    Qr(this, t).delay = +e.apply(this, arguments);
  };
}
function du(t, e) {
  return e = +e, function() {
    Qr(this, t).delay = e;
  };
}
function mu(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? gu : du)(e, t)) : Le(this.node(), e).delay;
}
function pu(t, e) {
  return function() {
    Pe(this, t).duration = +e.apply(this, arguments);
  };
}
function yu(t, e) {
  return e = +e, function() {
    Pe(this, t).duration = e;
  };
}
function wu(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? pu : yu)(e, t)) : Le(this.node(), e).duration;
}
function vu(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    Pe(this, t).ease = e;
  };
}
function _u(t) {
  var e = this._id;
  return arguments.length ? this.each(vu(e, t)) : Le(this.node(), e).ease;
}
function bu(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Pe(this, t).ease = n;
  };
}
function Mu(t) {
  if (typeof t != "function") throw new Error();
  return this.each(bu(this._id, t));
}
function xu(t) {
  typeof t != "function" && (t = go(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, l = r[i] = [], u, s = 0; s < a; ++s)
      (u = o[s]) && t.call(u, u.__data__, s, o) && l.push(u);
  return new qe(r, this._parents, this._name, this._id);
}
function ku(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), a = new Array(r), l = 0; l < o; ++l)
    for (var u = e[l], s = n[l], h = u.length, f = a[l] = new Array(h), g, p = 0; p < h; ++p)
      (g = u[p] || s[p]) && (f[p] = g);
  for (; l < r; ++l)
    a[l] = e[l];
  return new qe(a, this._parents, this._name, this._id);
}
function Tu(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Cu(t, e, n) {
  var r, i, o = Tu(e) ? Qr : Pe;
  return function() {
    var a = o(this, t), l = a.on;
    l !== r && (i = (r = l).copy()).on(e, n), a.on = i;
  };
}
function Du(t, e) {
  var n = this._id;
  return arguments.length < 2 ? Le(this.node(), n).on.on(t) : this.each(Cu(n, t, e));
}
function Su(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Au() {
  return this.on("end.remove", Su(this._id));
}
function Fu(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Br(t));
  for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
    for (var l = r[a], u = l.length, s = o[a] = new Array(u), h, f, g = 0; g < u; ++g)
      (h = l[g]) && (f = t.call(h, h.__data__, g, l)) && ("__data__" in h && (f.__data__ = h.__data__), s[g] = f, gr(s[g], e, n, g, s, Le(h, n)));
  return new qe(o, this._parents, e, n);
}
function Nu(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = ho(t));
  for (var r = this._groups, i = r.length, o = [], a = [], l = 0; l < i; ++l)
    for (var u = r[l], s = u.length, h, f = 0; f < s; ++f)
      if (h = u[f]) {
        for (var g = t.call(h, h.__data__, f, u), p, w = Le(h, n), y = 0, m = g.length; y < m; ++y)
          (p = g[y]) && gr(p, e, n, y, g, w);
        o.push(g), a.push(h);
      }
  return new qe(o, a, e, n);
}
var Uu = Yn.prototype.constructor;
function Lu() {
  return new Uu(this._groups, this._parents);
}
function Eu(t, e) {
  var n, r, i;
  return function() {
    var o = hn(this, t), a = (this.style.removeProperty(t), hn(this, t));
    return o === a ? null : o === n && a === r ? i : i = e(n = o, r = a);
  };
}
function Ro(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ru(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = hn(this, t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function Yu(t, e, n) {
  var r, i, o;
  return function() {
    var a = hn(this, t), l = n(this), u = l + "";
    return l == null && (u = l = (this.style.removeProperty(t), hn(this, t))), a === u ? null : a === r && u === i ? o : (i = u, o = e(r = a, l));
  };
}
function Hu(t, e) {
  var n, r, i, o = "style." + e, a = "end." + o, l;
  return function() {
    var u = Pe(this, t), s = u.on, h = u.value[o] == null ? l || (l = Ro(e)) : void 0;
    (s !== n || i !== h) && (r = (n = s).copy()).on(a, i = h), u.on = r;
  };
}
function Pu(t, e, n) {
  var r = (t += "") == "transform" ? Ws : Eo;
  return e == null ? this.styleTween(t, Eu(t, r)).on("end.style." + t, Ro(t)) : typeof e == "function" ? this.styleTween(t, Yu(t, r, Jr(this, "style." + t, e))).each(Hu(this._id, t)) : this.styleTween(t, Ru(t, r, e), n).on("end.style." + t, null);
}
function zu(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Iu(t, e, n) {
  var r, i;
  function o() {
    var a = e.apply(this, arguments);
    return a !== i && (r = (i = a) && zu(t, a, n)), r;
  }
  return o._value = e, o;
}
function Wu(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Iu(t, e, n ?? ""));
}
function qu(t) {
  return function() {
    this.textContent = t;
  };
}
function Vu(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Bu(t) {
  return this.tween("text", typeof t == "function" ? Vu(Jr(this, "text", t)) : qu(t == null ? "" : t + ""));
}
function Xu(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Gu(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Xu(i)), e;
  }
  return r._value = t, r;
}
function Ou(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Gu(t));
}
function Ku() {
  for (var t = this._name, e = this._id, n = Yo(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], l = a.length, u, s = 0; s < l; ++s)
      if (u = a[s]) {
        var h = Le(u, e);
        gr(u, t, n, s, a, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new qe(r, this._parents, t, n);
}
function Zu() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, a) {
    var l = { value: a }, u = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var s = Pe(this, r), h = s.on;
      h !== t && (e = (t = h).copy(), e._.cancel.push(l), e._.interrupt.push(l), e._.end.push(u)), s.on = e;
    }), i === 0 && o();
  });
}
var Qu = 0;
function qe(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Yo() {
  return ++Qu;
}
var We = Yn.prototype;
qe.prototype = {
  constructor: qe,
  select: Fu,
  selectAll: Nu,
  selectChild: We.selectChild,
  selectChildren: We.selectChildren,
  filter: xu,
  merge: ku,
  selection: Lu,
  transition: Ku,
  call: We.call,
  nodes: We.nodes,
  node: We.node,
  size: We.size,
  empty: We.empty,
  each: We.each,
  on: Du,
  attr: lu,
  attrTween: hu,
  style: Pu,
  styleTween: Wu,
  text: Bu,
  textTween: Ou,
  remove: Au,
  tween: tu,
  delay: mu,
  duration: wu,
  ease: _u,
  easeVarying: Mu,
  end: Zu,
  [Symbol.iterator]: We[Symbol.iterator]
};
function Ju(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var ju = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Ju
};
function $u(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function tc(t) {
  var e, n;
  t instanceof qe ? (e = t._id, t = t._name) : (e = Yo(), (n = ju).time = Zr(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], l = a.length, u, s = 0; s < l; ++s)
      (u = a[s]) && gr(u, t, e, s, a, n || $u(u, e));
  return new qe(r, this._parents, t, e);
}
Yn.prototype.interrupt = Js;
Yn.prototype.transition = tc;
const Wr = Math.PI, qr = 2 * Wr, Oe = 1e-6, ec = qr - Oe;
function Ho(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function nc(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return Ho;
  const n = 10 ** e;
  return function(r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class rc {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Ho : nc(e);
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
      let p = r - a, w = i - l, y = u * u + s * s, m = p * p + w * w, R = Math.sqrt(y), M = Math.sqrt(g), L = o * Math.tan((Wr - Math.acos((y + g - m) / (2 * R * M))) / 2), V = L / M, A = L / R;
      Math.abs(V - 1) > Oe && this._append`L${e + V * h},${n + V * f}`, this._append`A${o},${o},0,0,${+(f * p > h * w)},${this._x1 = e + A * u},${this._y1 = n + A * s}`;
    }
  }
  arc(e, n, r, i, o, a) {
    if (e = +e, n = +n, r = +r, a = !!a, r < 0) throw new Error(`negative radius: ${r}`);
    let l = r * Math.cos(i), u = r * Math.sin(i), s = e + l, h = n + u, f = 1 ^ a, g = a ? i - o : o - i;
    this._x1 === null ? this._append`M${s},${h}` : (Math.abs(this._x1 - s) > Oe || Math.abs(this._y1 - h) > Oe) && this._append`L${s},${h}`, r && (g < 0 && (g = g % qr + qr), g > ec ? this._append`A${r},${r},0,1,${f},${e - l},${n - u}A${r},${r},0,1,${f},${this._x1 = s},${this._y1 = h}` : g > Oe && this._append`A${r},${r},0,${+(g >= Wr)},${f},${this._x1 = e + r * Math.cos(o)},${this._y1 = n + r * Math.sin(o)}`);
  }
  rect(e, n, r, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function ic(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function or(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function dn(t) {
  return t = or(Math.abs(t)), t ? t[1] : NaN;
}
function oc(t, e) {
  return function(n, r) {
    for (var i = n.length, o = [], a = 0, l = t[0], u = 0; i > 0 && l > 0 && (u + l + 1 > r && (l = Math.max(1, r - u)), o.push(n.substring(i -= l, i + l)), !((u += l + 1) > r)); )
      l = t[a = (a + 1) % t.length];
    return o.reverse().join(e);
  };
}
function ac(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var lc = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function ar(t) {
  if (!(e = lc.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new jr({
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
ar.prototype = jr.prototype;
function jr(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
jr.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function sc(t) {
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
var Po;
function uc(t, e) {
  var n = or(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1], o = i - (Po = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, a = r.length;
  return o === a ? r : o > a ? r + new Array(o - a + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + or(t, Math.max(0, e + o - 1))[0];
}
function xi(t, e) {
  var n = or(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const ki = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: ic,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => xi(t * 100, e),
  r: xi,
  s: uc,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Ti(t) {
  return t;
}
var Ci = Array.prototype.map, Di = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function cc(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Ti : oc(Ci.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", o = t.numerals === void 0 ? Ti : ac(Ci.call(t.numerals, String)), a = t.percent === void 0 ? "%" : t.percent + "", l = t.minus === void 0 ? "−" : t.minus + "", u = t.nan === void 0 ? "NaN" : t.nan + "";
  function s(f) {
    f = ar(f);
    var g = f.fill, p = f.align, w = f.sign, y = f.symbol, m = f.zero, R = f.width, M = f.comma, L = f.precision, V = f.trim, A = f.type;
    A === "n" ? (M = !0, A = "g") : ki[A] || (L === void 0 && (L = 12), V = !0, A = "g"), (m || g === "0" && p === "=") && (m = !0, g = "0", p = "=");
    var F = y === "$" ? n : y === "#" && /[boxX]/.test(A) ? "0" + A.toLowerCase() : "", S = y === "$" ? r : /[%p]/.test(A) ? a : "", B = ki[A], K = /[defgprs%]/.test(A);
    L = L === void 0 ? 6 : /[gprs]/.test(A) ? Math.max(1, Math.min(21, L)) : Math.max(0, Math.min(20, L));
    function pt(X) {
      var k = F, x = S, _, Y, P;
      if (A === "c")
        x = B(X) + x, X = "";
      else {
        X = +X;
        var Tt = X < 0 || 1 / X < 0;
        if (X = isNaN(X) ? u : B(Math.abs(X), L), V && (X = sc(X)), Tt && +X == 0 && w !== "+" && (Tt = !1), k = (Tt ? w === "(" ? w : l : w === "-" || w === "(" ? "" : w) + k, x = (A === "s" ? Di[8 + Po / 3] : "") + x + (Tt && w === "(" ? ")" : ""), K) {
          for (_ = -1, Y = X.length; ++_ < Y; )
            if (P = X.charCodeAt(_), 48 > P || P > 57) {
              x = (P === 46 ? i + X.slice(_ + 1) : X.slice(_)) + x, X = X.slice(0, _);
              break;
            }
        }
      }
      M && !m && (X = e(X, 1 / 0));
      var wt = k.length + X.length + x.length, Mt = wt < R ? new Array(R - wt + 1).join(g) : "";
      switch (M && m && (X = e(Mt + X, Mt.length ? R - x.length : 1 / 0), Mt = ""), p) {
        case "<":
          X = k + X + x + Mt;
          break;
        case "=":
          X = k + Mt + X + x;
          break;
        case "^":
          X = Mt.slice(0, wt = Mt.length >> 1) + k + X + x + Mt.slice(wt);
          break;
        default:
          X = Mt + k + X + x;
          break;
      }
      return o(X);
    }
    return pt.toString = function() {
      return f + "";
    }, pt;
  }
  function h(f, g) {
    var p = s((f = ar(f), f.type = "f", f)), w = Math.max(-8, Math.min(8, Math.floor(dn(g) / 3))) * 3, y = Math.pow(10, -w), m = Di[8 + w / 3];
    return function(R) {
      return p(y * R) + m;
    };
  }
  return {
    format: s,
    formatPrefix: h
  };
}
var Xn, zo, Io;
fc({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function fc(t) {
  return Xn = cc(t), zo = Xn.format, Io = Xn.formatPrefix, Xn;
}
function hc(t) {
  return Math.max(0, -dn(Math.abs(t)));
}
function gc(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(dn(e) / 3))) * 3 - dn(Math.abs(t)));
}
function dc(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, dn(e) - dn(t)) + 1;
}
function mc(t, e) {
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
function pc(t) {
  return function() {
    return t;
  };
}
function yc(t) {
  return +t;
}
var Si = [0, 1];
function un(t) {
  return t;
}
function Vr(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : pc(isNaN(e) ? NaN : 0.5);
}
function wc(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function vc(t, e, n) {
  var r = t[0], i = t[1], o = e[0], a = e[1];
  return i < r ? (r = Vr(i, r), o = n(a, o)) : (r = Vr(r, i), o = n(o, a)), function(l) {
    return o(r(l));
  };
}
function _c(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), o = new Array(r), a = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++a < r; )
    i[a] = Vr(t[a], t[a + 1]), o[a] = n(e[a], e[a + 1]);
  return function(l) {
    var u = va(t, l, 1, r) - 1;
    return o[u](i[u](l));
  };
}
function bc(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function Mc() {
  var t = Si, e = Si, n = Kr, r, i, o, a = un, l, u, s;
  function h() {
    var g = Math.min(t.length, e.length);
    return a !== un && (a = wc(t[0], t[g - 1])), l = g > 2 ? _c : vc, u = s = null, f;
  }
  function f(g) {
    return g == null || isNaN(g = +g) ? o : (u || (u = l(t.map(r), e, n)))(r(a(g)));
  }
  return f.invert = function(g) {
    return a(i((s || (s = l(e, t.map(r), Fe)))(g)));
  }, f.domain = function(g) {
    return arguments.length ? (t = Array.from(g, yc), h()) : t.slice();
  }, f.range = function(g) {
    return arguments.length ? (e = Array.from(g), h()) : e.slice();
  }, f.rangeRound = function(g) {
    return e = Array.from(g), n = Ps, h();
  }, f.clamp = function(g) {
    return arguments.length ? (a = g ? !0 : un, h()) : a !== un;
  }, f.interpolate = function(g) {
    return arguments.length ? (n = g, h()) : n;
  }, f.unknown = function(g) {
    return arguments.length ? (o = g, f) : o;
  }, function(g, p) {
    return r = g, i = p, h();
  };
}
function xc() {
  return Mc()(un, un);
}
function kc(t, e, n, r) {
  var i = Ta(t, e, n), o;
  switch (r = ar(r ?? ",f"), r.type) {
    case "s": {
      var a = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(o = gc(i, a)) && (r.precision = o), Io(r, a);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(o = dc(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = o - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(o = hc(i)) && (r.precision = o - (r.type === "%") * 2);
      break;
    }
  }
  return zo(r);
}
function Tc(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return ka(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return kc(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, o = r.length - 1, a = r[i], l = r[o], u, s, h = 10;
    for (l < a && (s = a, a = l, l = s, s = i, i = o, o = s); h-- > 0; ) {
      if (s = Nr(a, l, n), s === u)
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
function En() {
  var t = xc();
  return t.copy = function() {
    return bc(t, En());
  }, mc.apply(t, arguments), Tc(t);
}
const xr = /* @__PURE__ */ new Date(), kr = /* @__PURE__ */ new Date();
function ze(t, e, n, r) {
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
  }, i.filter = (o) => ze((a) => {
    if (a >= a) for (; t(a), !o(a); ) a.setTime(a - 1);
  }, (a, l) => {
    if (a >= a)
      if (l < 0) for (; ++l <= 0; )
        for (; e(a, -1), !o(a); )
          ;
      else for (; --l >= 0; )
        for (; e(a, 1), !o(a); )
          ;
  }), n && (i.count = (o, a) => (xr.setTime(+o), kr.setTime(+a), t(xr), t(kr), Math.floor(n(xr, kr))), i.every = (o) => (o = Math.floor(o), !isFinite(o) || !(o > 0) ? null : o > 1 ? i.filter(r ? (a) => r(a) % o === 0 : (a) => i.count(0, a) % o === 0) : i)), i;
}
const Cc = 1e3, $r = Cc * 60, Dc = $r * 60, Rn = Dc * 24, Wo = Rn * 7, xe = ze(
  (t) => t.setHours(0, 0, 0, 0),
  (t, e) => t.setDate(t.getDate() + e),
  (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * $r) / Rn,
  (t) => t.getDate() - 1
);
xe.range;
const ti = ze((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / Rn, (t) => t.getUTCDate() - 1);
ti.range;
const Sc = ze((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / Rn, (t) => Math.floor(t / Rn));
Sc.range;
function rn(t) {
  return ze((e) => {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setDate(e.getDate() + n * 7);
  }, (e, n) => (n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * $r) / Wo);
}
const qo = rn(0), lr = rn(1), Ac = rn(2), Fc = rn(3), mn = rn(4), Nc = rn(5), Uc = rn(6);
qo.range;
lr.range;
Ac.range;
Fc.range;
mn.range;
Nc.range;
Uc.range;
function on(t) {
  return ze((e) => {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setUTCDate(e.getUTCDate() + n * 7);
  }, (e, n) => (n - e) / Wo);
}
const Vo = on(0), sr = on(1), Lc = on(2), Ec = on(3), pn = on(4), Rc = on(5), Yc = on(6);
Vo.range;
sr.range;
Lc.range;
Ec.range;
pn.range;
Rc.range;
Yc.range;
const je = ze((t) => {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, e) => {
  t.setFullYear(t.getFullYear() + e);
}, (t, e) => e.getFullYear() - t.getFullYear(), (t) => t.getFullYear());
je.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : ze((e) => {
  e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, n) => {
  e.setFullYear(e.getFullYear() + n * t);
});
je.range;
const $e = ze((t) => {
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCFullYear(t.getUTCFullYear() + e);
}, (t, e) => e.getUTCFullYear() - t.getUTCFullYear(), (t) => t.getUTCFullYear());
$e.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : ze((e) => {
  e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, n) => {
  e.setUTCFullYear(e.getUTCFullYear() + n * t);
});
$e.range;
function Tr(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e;
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function Cr(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e;
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function _n(t, e, n) {
  return { y: t, m: e, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function Hc(t) {
  var e = t.dateTime, n = t.date, r = t.time, i = t.periods, o = t.days, a = t.shortDays, l = t.months, u = t.shortMonths, s = bn(i), h = Mn(i), f = bn(o), g = Mn(o), p = bn(a), w = Mn(a), y = bn(l), m = Mn(l), R = bn(u), M = Mn(u), L = {
    a: Tt,
    A: wt,
    b: Mt,
    B: st,
    c: null,
    d: Ei,
    e: Ei,
    f: lf,
    g: yf,
    G: vf,
    H: rf,
    I: of,
    j: af,
    L: Bo,
    m: sf,
    M: uf,
    p: Ft,
    q: ot,
    Q: Hi,
    s: Pi,
    S: cf,
    u: ff,
    U: hf,
    V: gf,
    w: df,
    W: mf,
    x: null,
    X: null,
    y: pf,
    Y: wf,
    Z: _f,
    "%": Yi
  }, V = {
    a: b,
    A: it,
    b: ct,
    B: $,
    c: null,
    d: Ri,
    e: Ri,
    f: kf,
    g: Ef,
    G: Yf,
    H: bf,
    I: Mf,
    j: xf,
    L: Go,
    m: Tf,
    M: Cf,
    p: Dt,
    q: gt,
    Q: Hi,
    s: Pi,
    S: Df,
    u: Sf,
    U: Af,
    V: Ff,
    w: Nf,
    W: Uf,
    x: null,
    X: null,
    y: Lf,
    Y: Rf,
    Z: Hf,
    "%": Yi
  }, A = {
    a: pt,
    A: X,
    b: k,
    B: x,
    c: _,
    d: Ui,
    e: Ui,
    f: $c,
    g: Ni,
    G: Fi,
    H: Li,
    I: Li,
    j: Zc,
    L: jc,
    m: Kc,
    M: Qc,
    p: K,
    q: Oc,
    Q: ef,
    s: nf,
    S: Jc,
    u: qc,
    U: Vc,
    V: Bc,
    w: Wc,
    W: Xc,
    x: Y,
    X: P,
    y: Ni,
    Y: Fi,
    Z: Gc,
    "%": tf
  };
  L.x = F(n, L), L.X = F(r, L), L.c = F(e, L), V.x = F(n, V), V.X = F(r, V), V.c = F(e, V);
  function F(N, at) {
    return function(Z) {
      var C = [], dt = -1, v = 0, vt = N.length, Ct, ft, St;
      for (Z instanceof Date || (Z = /* @__PURE__ */ new Date(+Z)); ++dt < vt; )
        N.charCodeAt(dt) === 37 && (C.push(N.slice(v, dt)), (ft = Ai[Ct = N.charAt(++dt)]) != null ? Ct = N.charAt(++dt) : ft = Ct === "e" ? " " : "0", (St = at[Ct]) && (Ct = St(Z, ft)), C.push(Ct), v = dt + 1);
      return C.push(N.slice(v, dt)), C.join("");
    };
  }
  function S(N, at) {
    return function(Z) {
      var C = _n(1900, void 0, 1), dt = B(C, N, Z += "", 0), v, vt;
      if (dt != Z.length) return null;
      if ("Q" in C) return new Date(C.Q);
      if ("s" in C) return new Date(C.s * 1e3 + ("L" in C ? C.L : 0));
      if (at && !("Z" in C) && (C.Z = 0), "p" in C && (C.H = C.H % 12 + C.p * 12), C.m === void 0 && (C.m = "q" in C ? C.q : 0), "V" in C) {
        if (C.V < 1 || C.V > 53) return null;
        "w" in C || (C.w = 1), "Z" in C ? (v = Cr(_n(C.y, 0, 1)), vt = v.getUTCDay(), v = vt > 4 || vt === 0 ? sr.ceil(v) : sr(v), v = ti.offset(v, (C.V - 1) * 7), C.y = v.getUTCFullYear(), C.m = v.getUTCMonth(), C.d = v.getUTCDate() + (C.w + 6) % 7) : (v = Tr(_n(C.y, 0, 1)), vt = v.getDay(), v = vt > 4 || vt === 0 ? lr.ceil(v) : lr(v), v = xe.offset(v, (C.V - 1) * 7), C.y = v.getFullYear(), C.m = v.getMonth(), C.d = v.getDate() + (C.w + 6) % 7);
      } else ("W" in C || "U" in C) && ("w" in C || (C.w = "u" in C ? C.u % 7 : "W" in C ? 1 : 0), vt = "Z" in C ? Cr(_n(C.y, 0, 1)).getUTCDay() : Tr(_n(C.y, 0, 1)).getDay(), C.m = 0, C.d = "W" in C ? (C.w + 6) % 7 + C.W * 7 - (vt + 5) % 7 : C.w + C.U * 7 - (vt + 6) % 7);
      return "Z" in C ? (C.H += C.Z / 100 | 0, C.M += C.Z % 100, Cr(C)) : Tr(C);
    };
  }
  function B(N, at, Z, C) {
    for (var dt = 0, v = at.length, vt = Z.length, Ct, ft; dt < v; ) {
      if (C >= vt) return -1;
      if (Ct = at.charCodeAt(dt++), Ct === 37) {
        if (Ct = at.charAt(dt++), ft = A[Ct in Ai ? at.charAt(dt++) : Ct], !ft || (C = ft(N, Z, C)) < 0) return -1;
      } else if (Ct != Z.charCodeAt(C++))
        return -1;
    }
    return C;
  }
  function K(N, at, Z) {
    var C = s.exec(at.slice(Z));
    return C ? (N.p = h.get(C[0].toLowerCase()), Z + C[0].length) : -1;
  }
  function pt(N, at, Z) {
    var C = p.exec(at.slice(Z));
    return C ? (N.w = w.get(C[0].toLowerCase()), Z + C[0].length) : -1;
  }
  function X(N, at, Z) {
    var C = f.exec(at.slice(Z));
    return C ? (N.w = g.get(C[0].toLowerCase()), Z + C[0].length) : -1;
  }
  function k(N, at, Z) {
    var C = R.exec(at.slice(Z));
    return C ? (N.m = M.get(C[0].toLowerCase()), Z + C[0].length) : -1;
  }
  function x(N, at, Z) {
    var C = y.exec(at.slice(Z));
    return C ? (N.m = m.get(C[0].toLowerCase()), Z + C[0].length) : -1;
  }
  function _(N, at, Z) {
    return B(N, e, at, Z);
  }
  function Y(N, at, Z) {
    return B(N, n, at, Z);
  }
  function P(N, at, Z) {
    return B(N, r, at, Z);
  }
  function Tt(N) {
    return a[N.getDay()];
  }
  function wt(N) {
    return o[N.getDay()];
  }
  function Mt(N) {
    return u[N.getMonth()];
  }
  function st(N) {
    return l[N.getMonth()];
  }
  function Ft(N) {
    return i[+(N.getHours() >= 12)];
  }
  function ot(N) {
    return 1 + ~~(N.getMonth() / 3);
  }
  function b(N) {
    return a[N.getUTCDay()];
  }
  function it(N) {
    return o[N.getUTCDay()];
  }
  function ct(N) {
    return u[N.getUTCMonth()];
  }
  function $(N) {
    return l[N.getUTCMonth()];
  }
  function Dt(N) {
    return i[+(N.getUTCHours() >= 12)];
  }
  function gt(N) {
    return 1 + ~~(N.getUTCMonth() / 3);
  }
  return {
    format: function(N) {
      var at = F(N += "", L);
      return at.toString = function() {
        return N;
      }, at;
    },
    parse: function(N) {
      var at = S(N += "", !1);
      return at.toString = function() {
        return N;
      }, at;
    },
    utcFormat: function(N) {
      var at = F(N += "", V);
      return at.toString = function() {
        return N;
      }, at;
    },
    utcParse: function(N) {
      var at = S(N += "", !0);
      return at.toString = function() {
        return N;
      }, at;
    }
  };
}
var Ai = { "-": "", _: " ", 0: "0" }, le = /^\s*\d+/, Pc = /^%/, zc = /[\\^$*+?|[\]().{}]/g;
function qt(t, e, n) {
  var r = t < 0 ? "-" : "", i = (r ? -t : t) + "", o = i.length;
  return r + (o < n ? new Array(n - o + 1).join(e) + i : i);
}
function Ic(t) {
  return t.replace(zc, "\\$&");
}
function bn(t) {
  return new RegExp("^(?:" + t.map(Ic).join("|") + ")", "i");
}
function Mn(t) {
  return new Map(t.map((e, n) => [e.toLowerCase(), n]));
}
function Wc(t, e, n) {
  var r = le.exec(e.slice(n, n + 1));
  return r ? (t.w = +r[0], n + r[0].length) : -1;
}
function qc(t, e, n) {
  var r = le.exec(e.slice(n, n + 1));
  return r ? (t.u = +r[0], n + r[0].length) : -1;
}
function Vc(t, e, n) {
  var r = le.exec(e.slice(n, n + 2));
  return r ? (t.U = +r[0], n + r[0].length) : -1;
}
function Bc(t, e, n) {
  var r = le.exec(e.slice(n, n + 2));
  return r ? (t.V = +r[0], n + r[0].length) : -1;
}
function Xc(t, e, n) {
  var r = le.exec(e.slice(n, n + 2));
  return r ? (t.W = +r[0], n + r[0].length) : -1;
}
function Fi(t, e, n) {
  var r = le.exec(e.slice(n, n + 4));
  return r ? (t.y = +r[0], n + r[0].length) : -1;
}
function Ni(t, e, n) {
  var r = le.exec(e.slice(n, n + 2));
  return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function Gc(t, e, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
  return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function Oc(t, e, n) {
  var r = le.exec(e.slice(n, n + 1));
  return r ? (t.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function Kc(t, e, n) {
  var r = le.exec(e.slice(n, n + 2));
  return r ? (t.m = r[0] - 1, n + r[0].length) : -1;
}
function Ui(t, e, n) {
  var r = le.exec(e.slice(n, n + 2));
  return r ? (t.d = +r[0], n + r[0].length) : -1;
}
function Zc(t, e, n) {
  var r = le.exec(e.slice(n, n + 3));
  return r ? (t.m = 0, t.d = +r[0], n + r[0].length) : -1;
}
function Li(t, e, n) {
  var r = le.exec(e.slice(n, n + 2));
  return r ? (t.H = +r[0], n + r[0].length) : -1;
}
function Qc(t, e, n) {
  var r = le.exec(e.slice(n, n + 2));
  return r ? (t.M = +r[0], n + r[0].length) : -1;
}
function Jc(t, e, n) {
  var r = le.exec(e.slice(n, n + 2));
  return r ? (t.S = +r[0], n + r[0].length) : -1;
}
function jc(t, e, n) {
  var r = le.exec(e.slice(n, n + 3));
  return r ? (t.L = +r[0], n + r[0].length) : -1;
}
function $c(t, e, n) {
  var r = le.exec(e.slice(n, n + 6));
  return r ? (t.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function tf(t, e, n) {
  var r = Pc.exec(e.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function ef(t, e, n) {
  var r = le.exec(e.slice(n));
  return r ? (t.Q = +r[0], n + r[0].length) : -1;
}
function nf(t, e, n) {
  var r = le.exec(e.slice(n));
  return r ? (t.s = +r[0], n + r[0].length) : -1;
}
function Ei(t, e) {
  return qt(t.getDate(), e, 2);
}
function rf(t, e) {
  return qt(t.getHours(), e, 2);
}
function of(t, e) {
  return qt(t.getHours() % 12 || 12, e, 2);
}
function af(t, e) {
  return qt(1 + xe.count(je(t), t), e, 3);
}
function Bo(t, e) {
  return qt(t.getMilliseconds(), e, 3);
}
function lf(t, e) {
  return Bo(t, e) + "000";
}
function sf(t, e) {
  return qt(t.getMonth() + 1, e, 2);
}
function uf(t, e) {
  return qt(t.getMinutes(), e, 2);
}
function cf(t, e) {
  return qt(t.getSeconds(), e, 2);
}
function ff(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function hf(t, e) {
  return qt(qo.count(je(t) - 1, t), e, 2);
}
function Xo(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? mn(t) : mn.ceil(t);
}
function gf(t, e) {
  return t = Xo(t), qt(mn.count(je(t), t) + (je(t).getDay() === 4), e, 2);
}
function df(t) {
  return t.getDay();
}
function mf(t, e) {
  return qt(lr.count(je(t) - 1, t), e, 2);
}
function pf(t, e) {
  return qt(t.getFullYear() % 100, e, 2);
}
function yf(t, e) {
  return t = Xo(t), qt(t.getFullYear() % 100, e, 2);
}
function wf(t, e) {
  return qt(t.getFullYear() % 1e4, e, 4);
}
function vf(t, e) {
  var n = t.getDay();
  return t = n >= 4 || n === 0 ? mn(t) : mn.ceil(t), qt(t.getFullYear() % 1e4, e, 4);
}
function _f(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + qt(e / 60 | 0, "0", 2) + qt(e % 60, "0", 2);
}
function Ri(t, e) {
  return qt(t.getUTCDate(), e, 2);
}
function bf(t, e) {
  return qt(t.getUTCHours(), e, 2);
}
function Mf(t, e) {
  return qt(t.getUTCHours() % 12 || 12, e, 2);
}
function xf(t, e) {
  return qt(1 + ti.count($e(t), t), e, 3);
}
function Go(t, e) {
  return qt(t.getUTCMilliseconds(), e, 3);
}
function kf(t, e) {
  return Go(t, e) + "000";
}
function Tf(t, e) {
  return qt(t.getUTCMonth() + 1, e, 2);
}
function Cf(t, e) {
  return qt(t.getUTCMinutes(), e, 2);
}
function Df(t, e) {
  return qt(t.getUTCSeconds(), e, 2);
}
function Sf(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function Af(t, e) {
  return qt(Vo.count($e(t) - 1, t), e, 2);
}
function Oo(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? pn(t) : pn.ceil(t);
}
function Ff(t, e) {
  return t = Oo(t), qt(pn.count($e(t), t) + ($e(t).getUTCDay() === 4), e, 2);
}
function Nf(t) {
  return t.getUTCDay();
}
function Uf(t, e) {
  return qt(sr.count($e(t) - 1, t), e, 2);
}
function Lf(t, e) {
  return qt(t.getUTCFullYear() % 100, e, 2);
}
function Ef(t, e) {
  return t = Oo(t), qt(t.getUTCFullYear() % 100, e, 2);
}
function Rf(t, e) {
  return qt(t.getUTCFullYear() % 1e4, e, 4);
}
function Yf(t, e) {
  var n = t.getUTCDay();
  return t = n >= 4 || n === 0 ? pn(t) : pn.ceil(t), qt(t.getUTCFullYear() % 1e4, e, 4);
}
function Hf() {
  return "+0000";
}
function Yi() {
  return "%";
}
function Hi(t) {
  return +t;
}
function Pi(t) {
  return Math.floor(+t / 1e3);
}
var ln, Te, ei;
Pf({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function Pf(t) {
  return ln = Hc(t), Te = ln.format, ln.parse, ei = ln.utcFormat, ln.utcParse, ln;
}
function ae(t) {
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
  }, () => new rc(e);
}
function Zo(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Qo(t) {
  this._context = t;
}
Qo.prototype = {
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
function Jo(t) {
  return new Qo(t);
}
function jo(t) {
  return t[0];
}
function $o(t) {
  return t[1];
}
function An(t, e) {
  var n = ae(!0), r = null, i = Jo, o = null, a = Ko(l);
  t = typeof t == "function" ? t : t === void 0 ? jo : ae(t), e = typeof e == "function" ? e : e === void 0 ? $o : ae(e);
  function l(u) {
    var s, h = (u = Zo(u)).length, f, g = !1, p;
    for (r == null && (o = i(p = a())), s = 0; s <= h; ++s)
      !(s < h && n(f = u[s], s, u)) === g && ((g = !g) ? o.lineStart() : o.lineEnd()), g && o.point(+t(f, s, u), +e(f, s, u));
    if (p) return o = null, p + "" || null;
  }
  return l.x = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : ae(+u), l) : t;
  }, l.y = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : ae(+u), l) : e;
  }, l.defined = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : ae(!!u), l) : n;
  }, l.curve = function(u) {
    return arguments.length ? (i = u, r != null && (o = i(r)), l) : i;
  }, l.context = function(u) {
    return arguments.length ? (u == null ? r = o = null : o = i(r = u), l) : r;
  }, l;
}
function Se(t, e, n) {
  var r = null, i = ae(!0), o = null, a = Jo, l = null, u = Ko(s);
  t = typeof t == "function" ? t : t === void 0 ? jo : ae(+t), e = typeof e == "function" ? e : ae(e === void 0 ? 0 : +e), n = typeof n == "function" ? n : n === void 0 ? $o : ae(+n);
  function s(f) {
    var g, p, w, y = (f = Zo(f)).length, m, R = !1, M, L = new Array(y), V = new Array(y);
    for (o == null && (l = a(M = u())), g = 0; g <= y; ++g) {
      if (!(g < y && i(m = f[g], g, f)) === R)
        if (R = !R)
          p = g, l.areaStart(), l.lineStart();
        else {
          for (l.lineEnd(), l.lineStart(), w = g - 1; w >= p; --w)
            l.point(L[w], V[w]);
          l.lineEnd(), l.areaEnd();
        }
      R && (L[g] = +t(m, g, f), V[g] = +e(m, g, f), l.point(r ? +r(m, g, f) : L[g], n ? +n(m, g, f) : V[g]));
    }
    if (M) return l = null, M + "" || null;
  }
  function h() {
    return An().defined(i).curve(a).context(o);
  }
  return s.x = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : ae(+f), r = null, s) : t;
  }, s.x0 = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : ae(+f), s) : t;
  }, s.x1 = function(f) {
    return arguments.length ? (r = f == null ? null : typeof f == "function" ? f : ae(+f), s) : r;
  }, s.y = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : ae(+f), n = null, s) : e;
  }, s.y0 = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : ae(+f), s) : e;
  }, s.y1 = function(f) {
    return arguments.length ? (n = f == null ? null : typeof f == "function" ? f : ae(+f), s) : n;
  }, s.lineX0 = s.lineY0 = function() {
    return h().x(t).y(e);
  }, s.lineY1 = function() {
    return h().x(t).y(n);
  }, s.lineX1 = function() {
    return h().x(r).y(e);
  }, s.defined = function(f) {
    return arguments.length ? (i = typeof f == "function" ? f : ae(!!f), s) : i;
  }, s.curve = function(f) {
    return arguments.length ? (a = f, o != null && (l = a(o)), s) : a;
  }, s.context = function(f) {
    return arguments.length ? (f == null ? o = l = null : l = a(o = f), s) : o;
  }, s;
}
function zi(t) {
  return t < 0 ? -1 : 1;
}
function Ii(t, e, n) {
  var r = t._x1 - t._x0, i = e - t._x1, o = (t._y1 - t._y0) / (r || i < 0 && -0), a = (n - t._y1) / (i || r < 0 && -0), l = (o * i + a * r) / (r + i);
  return (zi(o) + zi(a)) * Math.min(Math.abs(o), Math.abs(a), 0.5 * Math.abs(l)) || 0;
}
function Wi(t, e) {
  var n = t._x1 - t._x0;
  return n ? (3 * (t._y1 - t._y0) / n - e) / 2 : e;
}
function Dr(t, e, n) {
  var r = t._x0, i = t._y0, o = t._x1, a = t._y1, l = (o - r) / 3;
  t._context.bezierCurveTo(r + l, i + l * e, o - l, a - l * n, o, a);
}
function ur(t) {
  this._context = t;
}
ur.prototype = {
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
        Dr(this, this._t0, Wi(this, this._t0));
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
          this._point = 3, Dr(this, Wi(this, n = Ii(this, t, e)), n);
          break;
        default:
          Dr(this, this._t0, n = Ii(this, t, e));
          break;
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = n;
    }
  }
};
Object.create(ur.prototype).point = function(t, e) {
  ur.prototype.point.call(this, e, t);
};
function Sr(t) {
  return new ur(t);
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
const zf = {
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
}, If = {
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
}, Wf = {
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
  general: zf,
  tight: If,
  pregnancy: Wf
};
function qf(t) {
  let e, n, r, i, o, a, l, u = (
    /*showCanvas*/
    t[0] ? "-" : "="
  ), s, h, f, g, p, w, y, m, R, M, L, V, A, F, S, B, K, pt, X, k, x, _, Y, P, Tt, wt, Mt, st, Ft, ot, b, it;
  return {
    c() {
      e = nt("div"), n = nt("canvas"), i = _t(), o = nt("div"), a = nt("div"), l = nt("button"), s = O(u), h = _t(), f = nt("div"), g = O(
        /*periodLabel*/
        t[5]
      ), p = _t(), w = nt("div"), y = nt("div"), m = nt("button"), R = O("1d"), L = _t(), V = nt("button"), A = O("3d"), S = _t(), B = nt("button"), K = O("1w"), X = _t(), k = nt("button"), x = O("2w"), Y = _t(), P = nt("button"), Tt = O("1m"), Mt = _t(), st = nt("button"), Ft = O("3m"), c(n, "style", r = `width:100%; display:${/*showCanvas*/
      t[0] ? "block" : "none"}; border:0; padding-bottom: 10px;`), c(l, "type", "button"), c(l, "class", "qbtn svelte-qd9z27"), c(l, "title", "Hide/show calendar canvas"), J(a, "display", "flex"), J(a, "gap", "8px"), J(a, "align-items", "center"), J(a, "justify-content", "flex-end"), J(a, "flex", "0 0 auto"), J(f, "text-align", "left"), J(f, "color", "#000"), J(f, "font-size", "12px"), J(f, "font-weight", "600"), J(f, "min-width", "160px"), J(f, "flex", "1 1 auto"), c(m, "type", "button"), c(m, "class", M = ee(`qbtn ${/*activeSpan*/
      t[4] === 1 ? "active" : ""}`) + " svelte-qd9z27"), c(V, "type", "button"), c(V, "class", F = ee(`qbtn ${/*activeSpan*/
      t[4] === 3 ? "active" : ""}`) + " svelte-qd9z27"), c(B, "type", "button"), c(B, "class", pt = ee(`qbtn ${/*activeSpan*/
      t[4] === 7 ? "active" : ""}`) + " svelte-qd9z27"), c(k, "type", "button"), c(k, "class", _ = ee(`qbtn ${/*activeSpan*/
      t[4] === 14 ? "active" : ""}`) + " svelte-qd9z27"), c(P, "type", "button"), c(P, "class", wt = ee(`qbtn ${/*activeSpan*/
      t[4] === 30 ? "active" : ""}`) + " svelte-qd9z27"), c(st, "type", "button"), c(st, "class", ot = ee(`qbtn ${/*activeSpan*/
      t[4] === 90 ? "active" : ""}`) + " svelte-qd9z27"), J(y, "display", "flex"), J(y, "gap", "16px"), J(y, "flex-wrap", "wrap"), J(y, "justify-content", "flex-end"), J(w, "display", "flex"), J(w, "align-items", "center"), J(w, "gap", "20px"), J(w, "justify-content", "flex-end"), J(w, "margin-left", "auto"), c(o, "id", "controlBar"), J(o, "display", "none"), J(o, "align-items", "center"), J(o, "gap", "12px"), J(o, "flex-wrap", "wrap"), J(o, "margin", "0 0 6px"), c(e, "class", "cgm-widget"), J(e, "contain", "layout");
    },
    m(ct, $) {
      Et(ct, e, $), d(e, n), t[19](n), d(e, i), d(e, o), d(o, a), d(a, l), d(l, s), d(o, h), d(o, f), d(f, g), t[21](f), d(o, p), d(o, w), d(w, y), d(y, m), d(m, R), d(y, L), d(y, V), d(V, A), d(y, S), d(y, B), d(B, K), d(y, X), d(y, k), d(k, x), d(y, Y), d(y, P), d(P, Tt), d(y, Mt), d(y, st), d(st, Ft), t[28](e), b || (it = [
        oe(
          l,
          "click",
          /*click_handler*/
          t[20]
        ),
        oe(
          m,
          "click",
          /*click_handler_1*/
          t[22]
        ),
        oe(
          V,
          "click",
          /*click_handler_2*/
          t[23]
        ),
        oe(
          B,
          "click",
          /*click_handler_3*/
          t[24]
        ),
        oe(
          k,
          "click",
          /*click_handler_4*/
          t[25]
        ),
        oe(
          P,
          "click",
          /*click_handler_5*/
          t[26]
        ),
        oe(
          st,
          "click",
          /*click_handler_6*/
          t[27]
        )
      ], b = !0);
    },
    p(ct, $) {
      $[0] & /*showCanvas*/
      1 && r !== (r = `width:100%; display:${/*showCanvas*/
      ct[0] ? "block" : "none"}; border:0; padding-bottom: 10px;`) && c(n, "style", r), $[0] & /*showCanvas*/
      1 && u !== (u = /*showCanvas*/
      ct[0] ? "-" : "=") && Wt(s, u), $[0] & /*periodLabel*/
      32 && Wt(
        g,
        /*periodLabel*/
        ct[5]
      ), $[0] & /*activeSpan*/
      16 && M !== (M = ee(`qbtn ${/*activeSpan*/
      ct[4] === 1 ? "active" : ""}`) + " svelte-qd9z27") && c(m, "class", M), $[0] & /*activeSpan*/
      16 && F !== (F = ee(`qbtn ${/*activeSpan*/
      ct[4] === 3 ? "active" : ""}`) + " svelte-qd9z27") && c(V, "class", F), $[0] & /*activeSpan*/
      16 && pt !== (pt = ee(`qbtn ${/*activeSpan*/
      ct[4] === 7 ? "active" : ""}`) + " svelte-qd9z27") && c(B, "class", pt), $[0] & /*activeSpan*/
      16 && _ !== (_ = ee(`qbtn ${/*activeSpan*/
      ct[4] === 14 ? "active" : ""}`) + " svelte-qd9z27") && c(k, "class", _), $[0] & /*activeSpan*/
      16 && wt !== (wt = ee(`qbtn ${/*activeSpan*/
      ct[4] === 30 ? "active" : ""}`) + " svelte-qd9z27") && c(P, "class", wt), $[0] & /*activeSpan*/
      16 && ot !== (ot = ee(`qbtn ${/*activeSpan*/
      ct[4] === 90 ? "active" : ""}`) + " svelte-qd9z27") && c(st, "class", ot);
    },
    i: ie,
    o: ie,
    d(ct) {
      ct && Lt(e), t[19](null), t[21](null), t[28](null), b = !1, Xe(it);
    }
  };
}
const De = 54;
function Vf(t, e, n) {
  let { data: r } = e, { initialRange: i = null } = e, { externalRange: o = null } = e, { preset: a = "general" } = e, { showMonthLabels: l = !0 } = e, { showData: u = !0 } = e, { showCanvas: s = !0 } = e, { selectionStroke: h = "#111" } = e, { selectionFill: f = "transparent" } = e;
  const g = cr();
  let p, w, y;
  const m = { l: 48, r: 12, t: 8, b: 8 }, R = [1, 7, 14, 21, 30, 90];
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
    vhigh: "#ff8a65"
  };
  function L(U, I) {
    try {
      return (getComputedStyle(y).getPropertyValue(U) || "").trim() || I;
    } catch {
      return I;
    }
  }
  function V() {
    M = {
      bg: L("--cgm-bg", M.bg),
      grid: L("--cgm-grid", M.grid),
      text: L("--cgm-text", M.text),
      muted: L("--cgm-muted", M.muted),
      selFill: L("--cgm-selection-fill", M.selFill),
      selStroke: L("--cgm-selection-stroke", M.selStroke),
      vlow: L("--cgm-very-low", M.vlow),
      low: L("--cgm-low", M.low),
      inrange: L("--cgm-in-range", M.inrange),
      high: L("--cgm-high", M.high),
      vhigh: L("--cgm-very-high", M.vhigh)
    };
  }
  let A, F, S = 24 * 60 * 60 * 1e3;
  const B = () => new Date(r.t0).getTime(), K = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), pt = () => K() ? "mmol" : "mg";
  function X() {
    return He[a].thresholds[pt()];
  }
  let k = 0, x = 0, _ = 0, Y = 0;
  function P(U) {
    let I = R[0], Q = 1 / 0;
    for (const G of R) {
      const j = Math.abs(G - U);
      j < Q && (Q = j, I = G);
    }
    return I;
  }
  function Tt() {
    return Math.max(1, Math.floor((Y - _) / S) + 1);
  }
  let wt = 14;
  const Mt = (U) => {
    const I = new Date(U);
    return Date.UTC(I.getUTCFullYear(), I.getUTCMonth(), I.getUTCDate());
  };
  let st;
  function Ft() {
    st = /* @__PURE__ */ new Map();
    for (let U = 0; U < F.length; U++) {
      const I = F[U];
      if (!(Number.isFinite(I) && I >= 0)) continue;
      const Q = Mt(A[U]);
      let G = st.get(Q);
      G || (G = { valid: 0, vl: 0, l: 0, t: 0, h: 0, vh: 0 }, st.set(Q, G)), G.valid++;
      const j = X();
      I < j.veryLow ? G.vl++ : I < j.low ? G.l++ : I <= j.high ? G.t++ : I <= j.veryHigh ? G.h++ : G.vh++;
    }
  }
  function ot() {
    n(15, A = Float64Array.from({ length: r.glucose.length }, (U, I) => B() + I * r.stepMs)), n(16, F = Float64Array.from(r.glucose)), k = Mt(A[0]), x = Mt(A[A.length - 1]), n(17, _ = (i == null ? void 0 : i.start) ?? k), n(18, Y = (i == null ? void 0 : i.end) ?? x), Ft();
  }
  let b;
  function it() {
    if (!p || !(st != null && st.size)) return;
    const U = Math.max(1, window.devicePixelRatio || 1), I = Math.max(320, p.getBoundingClientRect().width || 900), Q = new Date(k).getUTCFullYear(), G = new Date(x).getUTCFullYear(), j = Ur(Q, G + 1), Ut = l ? 24 : m.b, Rt = m.t + j.length * De + Ut;
    n(1, p.style.width = I + "px", p), n(1, p.style.height = Rt + "px", p), n(1, p.width = Math.floor(I * U), p), n(1, p.height = Math.floor(Rt * U), p), b.setTransform(U, 0, 0, U, 0, 0), b.clearRect(0, 0, I, Rt), b.fillStyle = M.bg, b.fillRect(0, 0, I, Rt);
    const Vt = I - m.l - m.r;
    if (b.strokeStyle = M.grid, b.lineWidth = 1, j.forEach((It, ne) => {
      const Qt = m.t + ne * De;
      for (let T = 1; T < 12; T++) {
        const D = Date.UTC(It, T, 1);
        if (D < k || D > x) continue;
        const z = (Date.UTC(It + 1, 0, 1) - Date.UTC(It, 0, 1)) / S, H = m.l + Math.round((D - Date.UTC(It, 0, 1)) / S * (Vt / z));
        b.beginPath(), b.moveTo(H, Qt + 6), b.lineTo(H, Qt + De - 6), b.stroke();
      }
    }), j.forEach((It, ne) => {
      const Qt = m.t + ne * De;
      b.fillStyle = "#444", b.font = "12px system-ui, sans-serif", b.textAlign = "right", b.textBaseline = "middle", b.fillText(String(It), m.l - 8, Qt + De / 2);
      const T = Date.UTC(It, 0, 1), D = Date.UTC(It + 1, 0, 1) - S, z = Math.round((Date.UTC(It + 1, 0, 1) - Date.UTC(It, 0, 1)) / S), H = (q) => m.l + Math.floor((q - Date.UTC(It, 0, 1)) / S * (Vt / z)), W = De - 10, tt = Qt + 5;
      if (!u) {
        b.fillStyle = L("--cgm-target-band-bg", "#efefef");
        for (let q = Math.max(T, k); q <= Math.min(D, x); q += S) {
          const ut = H(q), bt = H(q + S), E = Math.max(1, bt - ut);
          b.fillRect(ut, tt, E, W);
        }
        return;
      }
      for (let q = Math.max(T, k); q <= Math.min(D, x); q += S) {
        const ut = H(q), bt = H(q + S), E = Math.max(1, bt - ut), mt = st.get(q);
        if (!mt || !mt.valid) {
          b.fillStyle = L("--cgm-target-band-bg", "#efefef"), b.globalAlpha = 1, b.fillRect(ut, tt, E, W);
          continue;
        }
        const et = Math.max(1, Math.round(S / r.stepMs)), Bt = {
          vl: mt.vl / mt.valid,
          l: mt.l / mt.valid,
          t: mt.t / mt.valid,
          h: mt.h / mt.valid,
          vh: mt.vh / mt.valid
        };
        let Zt = tt + W;
        const $t = (Ot, Ht, Gt) => {
          const At = Math.round(Ht * W);
          At <= 0 || (Zt -= At, b.fillStyle = Ot, b.globalAlpha = Gt, b.fillRect(ut, Zt, E, At));
        }, Xt = mt.valid / et >= 0.5 ? 0.8 : 0.4, Yt = mt.valid / et >= 0.5 ? 0.9 : 0.6;
        $t(M.vlow, Bt.vl, Xt), $t(M.low, Bt.l, Xt), $t(M.inrange, Bt.t, Yt), $t(M.high, Bt.h, Xt), $t(M.vhigh, Bt.vh, Xt), b.globalAlpha = 1;
      }
    }), u) {
      const It = Math.max(k, Math.min(x, _)), ne = Math.max(k, Math.min(x, Y));
      j.forEach((Qt, T) => {
        const D = m.t + T * De, z = Date.UTC(Qt, 0, 1), H = Date.UTC(Qt + 1, 0, 1) - 1, W = Math.max(z, It), tt = Math.min(H, ne);
        if (W > tt) return;
        const q = (Date.UTC(Qt + 1, 0, 1) - Date.UTC(Qt, 0, 1)) / S, ut = (Zt) => m.l + Math.floor((Zt - Date.UTC(Qt, 0, 1)) / S * (Vt / q)), bt = ut(W), E = ut(tt + 1), mt = D + 5, et = De - 10;
        b.save(), f && f !== "none" && f !== "transparent" && (b.fillStyle = f, b.fillRect(bt, mt, Math.max(1, E - bt), et));
        const Bt = h && h !== "#111" ? h : M.selStroke;
        b.strokeStyle = Bt, b.lineWidth = 1.5, b.beginPath(), b.moveTo(bt + 0.5, mt + 0.5), b.lineTo(bt + 0.5, mt + et - 0.5), b.stroke(), b.beginPath(), b.moveTo(E - 0.5, mt + 0.5), b.lineTo(E - 0.5, mt + et - 0.5), b.stroke(), b.restore();
      });
    }
    if (l) {
      const It = ei("%b"), ne = j[j.length - 1], Qt = Date.UTC(ne, 0, 1), D = (Date.UTC(ne + 1, 0, 1) - Qt) / S, z = (tt) => m.l + Math.round((tt - Qt) / S * (Vt / D)), W = m.t + (j.length - 1) * De + De - 5 + 0.5;
      b.save(), b.strokeStyle = "#bbb", b.lineWidth = 1, b.fillStyle = M.muted, b.font = "11px var(--cgm-font, system-ui, sans-serif)", b.textAlign = "center", b.textBaseline = "top";
      for (let tt = 0; tt < 12; tt++) {
        const q = Date.UTC(ne, tt, 1), ut = z(q);
        b.beginPath(), b.moveTo(ut, W), b.lineTo(ut, W + 4), b.stroke(), b.fillText(It(new Date(Date.UTC(2e3, tt, 1))), ut, W + 6);
      }
      b.restore();
    }
  }
  function ct(U, I) {
    const Q = new Date(U), G = new Date(I), j = Te("%b %e"), Ut = Te("%b %e, %Y"), Rt = Te("%e, %Y"), Vt = Date.UTC(Q.getUTCFullYear(), Q.getUTCMonth(), Q.getUTCDate()), It = Date.UTC(G.getUTCFullYear(), G.getUTCMonth(), G.getUTCDate());
    return Vt === It ? Ut(G) : Q.getFullYear() === G.getFullYear() ? Q.getMonth() === G.getMonth() ? `${j(Q)} – ${Rt(G)}` : `${j(Q)} – ${Ut(G)}` : `${Ut(Q)} – ${Ut(G)}`;
  }
  let $ = "";
  function Dt() {
    if (!A || !F) return;
    const U = Tt();
    n(4, wt = P(U));
    const I = Math.max(0, Math.ceil((_ - A[0]) / r.stepMs)), Q = Math.min(F.length - 1, Math.floor((Y - A[0]) / r.stepMs));
    try {
      typeof window < "u" && window.CGM_DEBUG && console.log("[CgmTir] rangechange", {
        startISO: new Date(_).toISOString(),
        endISO: new Date(Y).toISOString(),
        days: U,
        startIdx: I,
        endIdx: Q
      });
    } catch {
    }
    g("rangechange", {
      start: _,
      end: Y,
      days: U,
      startIdx: I,
      endIdx: Q
    });
  }
  function gt(U) {
    const I = S;
    let Q = Math.max(k + I - 1, Math.min(x, Y)), G = Q - U * I + 1;
    G < k && (G = k, Q = Math.min(x, G + U * I - 1)), n(17, _ = G), n(18, Y = Q), Dt(), it();
  }
  function N(U) {
    const I = _ + U * S, Q = Y + U * S, G = Math.max(S, Q - I);
    n(17, _ = Math.max(k, Math.min(x - G, I))), n(18, Y = Math.min(x, _ + G)), Dt(), it();
  }
  function at(U) {
    const I = Tt() * S * U;
    N(I / S);
  }
  function Z() {
    const U = p;
    let I = !1, Q = null, G = null, j = 0, Ut = 0;
    const Rt = 6, Vt = (T) => {
      const D = new Date(T);
      return Date.UTC(D.getUTCFullYear(), D.getUTCMonth(), D.getUTCDate());
    };
    function It() {
      const T = Math.max(320, U.getBoundingClientRect().width || 900), D = T - m.l - m.r, z = Ur(new Date(k).getUTCFullYear(), new Date(x).getUTCFullYear() + 1);
      return { cssW: T, plotW: D, years: z };
    }
    function ne(T, D) {
      const z = (Date.UTC(T + 1, 0, 1) - Date.UTC(T, 0, 1)) / S;
      return (H) => m.l + Math.floor((H - Date.UTC(T, 0, 1)) / S * (D / z));
    }
    function Qt(T) {
      const D = U.getBoundingClientRect(), z = T.clientX - D.left, H = T.clientY - D.top, { cssW: W, years: tt } = It(), q = Math.floor((H - 8) / De);
      if (q < 0 || q >= tt.length) return null;
      const ut = tt[q], bt = m.l, E = W - m.r, mt = Math.max(bt, Math.min(E, z)), et = (Date.UTC(ut + 1, 0, 1) - Date.UTC(ut, 0, 1)) / S, Bt = (mt - bt) / (E - bt);
      let Zt = Date.UTC(ut, 0, 1) + Bt * et * S;
      return Zt = Math.max(k, Math.min(x, Zt)), { t: Zt, yr: ut, x: mt, rowIdx: q };
    }
    U.addEventListener("mousedown", (T) => {
      const D = Qt(T);
      if (!D) return;
      const { plotW: z } = It(), H = ne(D.yr, z), W = H(Math.max(Date.UTC(D.yr, 0, 1), _)), tt = H(Math.min(Date.UTC(D.yr + 1, 0, 1) - 1, Y)) + 1;
      Q = "new", D.x >= W - Rt && D.x <= W + Rt ? Q = "resize-l" : D.x >= tt - Rt && D.x <= tt + Rt ? Q = "resize-r" : D.x > W && D.x < tt && (Q = "move"), I = !0, G = D.t, j = _, Ut = Y, document.body.style.userSelect = "none", U.style.cursor = Q === "move" ? "grabbing" : Q === "new" ? "crosshair" : "col-resize";
    }), window.addEventListener("mousemove", (T) => {
      const D = Qt(T);
      if (!D) {
        I || (U.style.cursor = "crosshair");
        return;
      }
      if (!I) {
        const { plotW: W } = It(), tt = ne(D.yr, W), q = tt(Math.max(Date.UTC(D.yr, 0, 1), _)), ut = tt(Math.min(Date.UTC(D.yr + 1, 0, 1) - 1, Y)) + 1;
        D.x >= q - Rt && D.x <= q + Rt || D.x >= ut - Rt && D.x <= ut + Rt ? U.style.cursor = "col-resize" : D.x > q && D.x < ut ? U.style.cursor = "grab" : U.style.cursor = "crosshair";
        return;
      }
      const z = D.t, H = S;
      if (Q === "new") {
        const W = Vt(Math.min(G, z)), tt = Vt(Math.max(G, z));
        let q = Math.max(1, Math.floor((tt - W) / H) + 1);
        const ut = P(q);
        if (z >= G) {
          let bt = W, E = bt + ut * H - 1;
          E > x && (E = x, bt = Math.max(k, E - ut * H + 1)), n(17, _ = bt), n(18, Y = E);
        } else {
          let bt = tt + H - 1, E = bt - ut * H + 1;
          E < k && (E = k, bt = Math.min(x, E + ut * H - 1)), n(17, _ = E), n(18, Y = bt);
        }
      } else if (Q === "resize-l") {
        const W = Math.max(1, Math.floor((Ut - Vt(Math.min(z, Ut - H + 1)) + 1) / H)), tt = P(W);
        let q = Ut - tt * H + 1;
        q = Math.max(k, Math.min(q, Ut - H + 1)), n(17, _ = q), n(18, Y = Ut);
      } else if (Q === "resize-r") {
        const W = Math.max(1, Math.floor((Vt(z) + H - 1 - j + 1) / H)), tt = P(W);
        let q = j + tt * H - 1;
        q = Math.min(x, Math.max(q, j + H - 1)), n(17, _ = j), n(18, Y = q);
      } else if (Q === "move") {
        const W = Math.round((Vt(z) - Vt(G)) / H), tt = Ut - j + 1;
        let q = j + W * H;
        q = Math.max(k, Math.min(x - tt + 1, q)), n(17, _ = q), n(18, Y = q + tt - 1);
      }
      Dt(), it();
    }), window.addEventListener("mouseup", () => {
      I && (I = !1, Q = null, G = null, document.body.style.userSelect = "", U.style.cursor = "crosshair");
    });
  }
  yn(() => {
    b = p.getContext("2d"), V(), ot(), it();
    const U = Math.max(0, Math.ceil((_ - A[0]) / r.stepMs)), I = Math.min(F.length - 1, Math.floor((Y - A[0]) / r.stepMs));
    g("ready", {
      start: _,
      end: Y,
      startIdx: U,
      endIdx: I,
      days: Tt()
    }), Dt(), Z();
    const Q = () => it(), G = (j) => {
      const Ut = j.target && j.target.tagName ? j.target.tagName.toLowerCase() : "";
      if (!(Ut === "input" || Ut === "textarea" || Ut === "select" || j.defaultPrevented)) {
        if (/^[1-6]$/.test(j.key)) {
          const Vt = {
            1: 1,
            2: 7,
            3: 14,
            4: 21,
            5: 30,
            6: 90
          }[j.key];
          gt(Vt), j.preventDefault();
          return;
        }
        if (j.key === "ArrowLeft" || j.key === "ArrowRight") {
          j.shiftKey ? at(j.key === "ArrowLeft" ? -1 : 1) : N(j.key === "ArrowLeft" ? -1 : 1), j.preventDefault();
          return;
        }
      }
    };
    return window.addEventListener("resize", Q), window.addEventListener("keydown", G), () => {
      window.removeEventListener("resize", Q), window.removeEventListener("keydown", G);
    };
  });
  function C(U) {
    Ue[U ? "unshift" : "push"](() => {
      p = U, n(1, p);
    });
  }
  const dt = () => {
    n(0, s = !s);
  };
  function v(U) {
    Ue[U ? "unshift" : "push"](() => {
      w = U, n(2, w);
    });
  }
  const vt = () => gt(1), Ct = () => gt(3), ft = () => gt(7), St = () => gt(14), yt = () => gt(30), kt = () => gt(90);
  function lt(U) {
    Ue[U ? "unshift" : "push"](() => {
      y = U, n(3, y);
    });
  }
  return t.$$set = (U) => {
    "data" in U && n(7, r = U.data), "initialRange" in U && n(8, i = U.initialRange), "externalRange" in U && n(9, o = U.externalRange), "preset" in U && n(10, a = U.preset), "showMonthLabels" in U && n(11, l = U.showMonthLabels), "showData" in U && n(12, u = U.showData), "showCanvas" in U && n(0, s = U.showCanvas), "selectionStroke" in U && n(13, h = U.selectionStroke), "selectionFill" in U && n(14, f = U.selectionFill);
  }, t.$$.update = () => {
    if (t.$$.dirty[0] & /*externalRange, viewStart, viewEnd, time, values*/
    492032 && o && typeof o.start == "number" && typeof o.end == "number") {
      const U = o.start, I = o.end;
      (U !== _ || I !== Y) && (n(17, _ = U), n(18, Y = I), A && F && (Dt(), it()));
    }
    t.$$.dirty[0] & /*viewStart, viewEnd*/
    393216 && n(5, $ = ct(_, Y)), t.$$.dirty[0] & /*values, preset*/
    66560 && F && a && (Ft(), it());
  }, n(4, wt = P(Tt())), [
    s,
    p,
    w,
    y,
    wt,
    $,
    gt,
    r,
    i,
    o,
    a,
    l,
    u,
    h,
    f,
    A,
    F,
    _,
    Y,
    C,
    dt,
    v,
    vt,
    Ct,
    ft,
    St,
    yt,
    kt,
    lt
  ];
}
class Bf extends nn {
  constructor(e) {
    super(), en(
      this,
      e,
      Vf,
      qf,
      tn,
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
function Xf(t) {
  let e, n, r, i, o = (
    /*showCanvas*/
    t[0] ? "↑" : "↓"
  ), a, l, u, s, h, f, g, p, w, y, m, R, M, L, V, A, F, S, B, K, pt, X, k, x, _, Y, P, Tt, wt, Mt, st, Ft, ot, b, it;
  return {
    c() {
      e = nt("div"), n = nt("div"), r = nt("div"), i = nt("button"), a = O(o), s = _t(), h = nt("div"), f = nt("div"), g = nt("button"), p = O("1d"), y = _t(), m = nt("button"), R = O("1w"), L = _t(), V = nt("button"), A = O("2w"), S = _t(), B = nt("button"), K = O("3w"), X = _t(), k = nt("button"), x = O("1m"), Y = _t(), P = nt("button"), Tt = O("3m"), Mt = _t(), st = nt("div"), Ft = nt("canvas"), c(i, "type", "button"), c(i, "class", "qbtn svelte-lksbul"), c(i, "title", l = /*showCanvas*/
      t[0] ? "Hide calendar view" : "Show calendar view"), c(i, "aria-label", u = /*showCanvas*/
      t[0] ? "Hide calendar view" : "Show calendar view"), J(r, "display", "flex"), J(r, "gap", "8px"), J(r, "align-items", "center"), J(r, "justify-content", "flex-start"), J(r, "flex", "0 0 auto"), c(g, "type", "button"), c(g, "class", w = ee(`qbtn ${/*activeSpan*/
      t[3] === 1 ? "active" : ""}`) + " svelte-lksbul"), c(m, "type", "button"), c(m, "class", M = ee(`qbtn ${/*activeSpan*/
      t[3] === 7 ? "active" : ""}`) + " svelte-lksbul"), c(V, "type", "button"), c(V, "class", F = ee(`qbtn ${/*activeSpan*/
      t[3] === 14 ? "active" : ""}`) + " svelte-lksbul"), c(B, "type", "button"), c(B, "class", pt = ee(`qbtn ${/*activeSpan*/
      t[3] === 21 ? "active" : ""}`) + " svelte-lksbul"), c(k, "type", "button"), c(k, "class", _ = ee(`qbtn ${/*activeSpan*/
      t[3] === 30 ? "active" : ""}`) + " svelte-lksbul"), c(P, "type", "button"), c(P, "class", wt = ee(`qbtn ${/*activeSpan*/
      t[3] === 90 ? "active" : ""}`) + " svelte-lksbul"), J(f, "display", "flex"), J(f, "gap", "16px"), J(f, "flex-wrap", "wrap"), J(f, "justify-content", "flex-end"), J(h, "display", "flex"), J(h, "align-items", "center"), J(h, "gap", "20px"), J(h, "justify-content", "flex-end"), J(h, "margin-left", "auto"), c(n, "id", "controlBar"), J(n, "display", "flex"), J(n, "align-items", "center"), J(n, "gap", "12px"), J(n, "flex-wrap", "wrap"), J(n, "margin", "0 0 0px"), J(Ft, "width", "100%"), J(Ft, "border", "0"), J(Ft, "padding-bottom", "10px"), c(st, "class", "line-container"), c(st, "style", ot = `display:${/*showCanvas*/
      t[0] ? "block" : "none"};`), c(e, "class", "cgm-widget"), J(e, "contain", "layout"), J(e, "display", "flex"), J(e, "flex-direction", "column");
    },
    m(ct, $) {
      Et(ct, e, $), d(e, n), d(n, r), d(r, i), d(i, a), d(n, s), d(n, h), d(h, f), d(f, g), d(g, p), d(f, y), d(f, m), d(m, R), d(f, L), d(f, V), d(V, A), d(f, S), d(f, B), d(B, K), d(f, X), d(f, k), d(k, x), d(f, Y), d(f, P), d(P, Tt), d(e, Mt), d(e, st), d(st, Ft), t[24](Ft), t[25](e), b || (it = [
        oe(
          i,
          "click",
          /*click_handler*/
          t[17]
        ),
        oe(
          g,
          "click",
          /*click_handler_1*/
          t[18]
        ),
        oe(
          m,
          "click",
          /*click_handler_2*/
          t[19]
        ),
        oe(
          V,
          "click",
          /*click_handler_3*/
          t[20]
        ),
        oe(
          B,
          "click",
          /*click_handler_4*/
          t[21]
        ),
        oe(
          k,
          "click",
          /*click_handler_5*/
          t[22]
        ),
        oe(
          P,
          "click",
          /*click_handler_6*/
          t[23]
        )
      ], b = !0);
    },
    p(ct, $) {
      $[0] & /*showCanvas*/
      1 && o !== (o = /*showCanvas*/
      ct[0] ? "↑" : "↓") && Wt(a, o), $[0] & /*showCanvas*/
      1 && l !== (l = /*showCanvas*/
      ct[0] ? "Hide calendar view" : "Show calendar view") && c(i, "title", l), $[0] & /*showCanvas*/
      1 && u !== (u = /*showCanvas*/
      ct[0] ? "Hide calendar view" : "Show calendar view") && c(i, "aria-label", u), $[0] & /*activeSpan*/
      8 && w !== (w = ee(`qbtn ${/*activeSpan*/
      ct[3] === 1 ? "active" : ""}`) + " svelte-lksbul") && c(g, "class", w), $[0] & /*activeSpan*/
      8 && M !== (M = ee(`qbtn ${/*activeSpan*/
      ct[3] === 7 ? "active" : ""}`) + " svelte-lksbul") && c(m, "class", M), $[0] & /*activeSpan*/
      8 && F !== (F = ee(`qbtn ${/*activeSpan*/
      ct[3] === 14 ? "active" : ""}`) + " svelte-lksbul") && c(V, "class", F), $[0] & /*activeSpan*/
      8 && pt !== (pt = ee(`qbtn ${/*activeSpan*/
      ct[3] === 21 ? "active" : ""}`) + " svelte-lksbul") && c(B, "class", pt), $[0] & /*activeSpan*/
      8 && _ !== (_ = ee(`qbtn ${/*activeSpan*/
      ct[3] === 30 ? "active" : ""}`) + " svelte-lksbul") && c(k, "class", _), $[0] & /*activeSpan*/
      8 && wt !== (wt = ee(`qbtn ${/*activeSpan*/
      ct[3] === 90 ? "active" : ""}`) + " svelte-lksbul") && c(P, "class", wt), $[0] & /*showCanvas*/
      1 && ot !== (ot = `display:${/*showCanvas*/
      ct[0] ? "block" : "none"};`) && c(st, "style", ot);
    },
    i: ie,
    o: ie,
    d(ct) {
      ct && Lt(e), t[24](null), t[25](null), b = !1, Xe(it);
    }
  };
}
const Gn = 54;
function Gf(t, e, n) {
  let { data: r } = e, { initialRange: i = null } = e, { externalRange: o = null } = e, { preset: a = "general" } = e, { showMonthLabels: l = !0 } = e, { showData: u = !0 } = e, { showCanvas: s = !0 } = e, { selectionStroke: h = "#111" } = e, { selectionFill: f = "transparent" } = e, { viewMode: g = "line" } = e;
  const p = cr();
  let w, y;
  const m = { l: 8, r: 8, t: 0, b: 6 }, R = [1, 7, 14, 21, 30, 90];
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
  function L(T, D) {
    try {
      return (getComputedStyle(y).getPropertyValue(T) || "").trim() || D;
    } catch {
      return D;
    }
  }
  function V() {
    M = {
      bg: L("--cgm-bg", M.bg),
      grid: L("--cgm-grid", M.grid),
      text: L("--cgm-text", M.text),
      muted: L("--cgm-muted", M.muted),
      selFill: L("--cgm-selection-fill", M.selFill),
      selStroke: L("--cgm-selection-stroke", M.selStroke),
      vlow: L("--cgm-very-low", M.vlow),
      low: L("--cgm-low", M.low),
      inrange: L("--cgm-in-range", M.inrange),
      high: L("--cgm-high", M.high),
      vhigh: L("--cgm-very-high", M.vhigh),
      outLight: L("--cgm-outside-light", M.outLight),
      outMid: L("--cgm-outside-mid", M.outMid),
      outDark: L("--cgm-outside-dark", M.outDark),
      arrow: L("--cgm-arrow", M.arrow)
    };
  }
  let A, F, S = 24 * 60 * 60 * 1e3;
  const B = () => new Date(r.t0).getTime(), K = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), pt = () => K() ? "mmol" : "mg";
  function X() {
    return He[a].thresholds[pt()];
  }
  let k = 0, x = 0, _ = 0, Y = 0;
  function P(T) {
    let D = R[0], z = 1 / 0;
    for (const H of R) {
      const W = Math.abs(H - T);
      W < z && (z = W, D = H);
    }
    return D;
  }
  function Tt() {
    return Math.max(1, Math.floor((Y - _) / S) + 1);
  }
  let wt = 14;
  const Mt = (T) => {
    const D = new Date(T);
    return Date.UTC(D.getUTCFullYear(), D.getUTCMonth(), D.getUTCDate());
  };
  let st;
  function Ft() {
    st = /* @__PURE__ */ new Map();
    for (let T = 0; T < F.length; T++) {
      const D = F[T];
      if (!(Number.isFinite(D) && D >= 0)) continue;
      const z = Mt(A[T]);
      let H = st.get(z);
      H || (H = { valid: 0, vl: 0, l: 0, t: 0, h: 0, vh: 0 }, st.set(z, H)), H.valid++;
      const W = X();
      D < W.veryLow ? H.vl++ : D < W.low ? H.l++ : D <= W.high ? H.t++ : D <= W.veryHigh ? H.h++ : H.vh++;
    }
  }
  function ot() {
    A = Float64Array.from({ length: r.glucose.length }, (T, D) => B() + D * r.stepMs), n(14, F = Float64Array.from(r.glucose)), k = Mt(A[0]), x = Mt(A[A.length - 1]), n(15, _ = (i == null ? void 0 : i.start) ?? k), n(16, Y = (i == null ? void 0 : i.end) ?? x), Ft();
  }
  let b, it = 0, ct = !1;
  function $() {
    if (!w || !(st != null && st.size) || g !== "line" || !s) return;
    const T = Math.max(1, window.devicePixelRatio || 1), D = Math.max(320, w.getBoundingClientRect().width || 900), z = l ? 24 : m.b, H = m.t + Gn + z;
    n(1, w.style.width = D + "px", w), n(1, w.style.height = H + "px", w), n(1, w.width = Math.floor(D * T), w), n(1, w.height = Math.floor(H * T), w), b.setTransform(T, 0, 0, T, 0, 0), b.clearRect(0, 0, D, H), b.fillStyle = M.bg, b.fillRect(0, 0, D, H);
    const W = D - m.l - m.r, tt = Gn - 10, q = m.t + 5, ut = Math.round((x - k) / S) + 1, bt = W / 365, E = W / bt;
    if (!ct) {
      const At = Math.floor((Math.min(x, Math.max(k, Y)) - k) / S);
      it = Math.max(0, Math.min(ut - E, At - E + 1)), ct = !0;
    }
    it = Math.max(0, Math.min(ut - E, it));
    const mt = (At) => m.l + (At - it) * bt, et = (At) => m.l + ((At - k) / S - it) * bt;
    b.strokeStyle = M.grid, b.lineWidth = 1;
    const Bt = k + Math.floor(it) * S, Zt = k + Math.ceil(it + E) * S;
    let $t = new Date(Bt), Xt = Date.UTC($t.getUTCFullYear(), $t.getUTCMonth(), 1);
    if (Xt < Bt) {
      const At = $t.getUTCFullYear(), Nt = $t.getUTCMonth();
      Xt = Date.UTC(At, Nt + 1, 1);
    }
    const Yt = Math.max(k, Math.min(x, _)), Ot = Math.max(k, Math.min(x, Y));
    if (u) {
      const At = Math.max(0, Math.floor(it)), Nt = Math.min(ut - 1, Math.ceil(it + E));
      for (let xt = At; xt <= Nt; xt++) {
        const Jt = k + xt * S, Kt = mt(xt), te = Math.max(1, Math.ceil(bt)), Pt = st.get(Jt);
        if (!Pt || !Pt.valid) {
          b.fillStyle = M.bg, b.globalAlpha = 1, b.fillRect(Kt, q, te, tt);
          continue;
        }
        const re = Math.max(1, Math.round(S / r.stepMs)), jt = {
          vl: Pt.vl / Pt.valid,
          l: Pt.l / Pt.valid,
          t: Pt.t / Pt.valid,
          h: Pt.h / Pt.valid,
          vh: Pt.vh / Pt.valid
        };
        let ce = q + tt;
        const ue = (zn, Ce, Ie) => {
          const Ve = Math.round(Ce * tt);
          Ve <= 0 || (ce -= Ve, b.fillStyle = zn, b.globalAlpha = Ie, b.fillRect(Kt, ce, te, Ve));
        }, se = Pt.valid / re >= 0.5 ? 0.8 : 0.4, Ge = Pt.valid / re >= 0.5 ? 0.9 : 0.6;
        Jt >= Yt && Jt <= Ot ? (ue(M.vlow, jt.vl, se), ue(M.low, jt.l, se), ue(M.inrange, jt.t, Ge), ue(M.high, jt.h, se), ue(M.vhigh, jt.vh, se)) : (ue(M.outDark, jt.vl, Math.min(se, 0.7)), ue(M.outMid, jt.l, Math.min(se, 0.65)), ue(M.outLight, jt.t, Math.min(Ge, 0.55)), ue(M.outMid, jt.h, Math.min(se, 0.65)), ue(M.outDark, jt.vh, Math.min(se, 0.7))), b.globalAlpha = 1;
      }
    } else {
      b.fillStyle = M.bg;
      const At = Math.max(0, Math.floor(it)), Nt = Math.min(ut - 1, Math.ceil(it + E));
      for (let xt = At; xt <= Nt; xt++) {
        const Jt = mt(xt), Kt = Math.max(1, Math.ceil(bt));
        b.fillRect(Jt, q, Kt, tt);
      }
    }
    if (u) {
      const At = Math.max(k, Math.min(x, _)), Nt = Math.max(k, Math.min(x, Y)), xt = Math.floor(et(At)), Jt = Math.ceil(et(Nt + 1));
      b.save();
      const Kt = f && f !== "#111" && f !== "transparent" && f !== "none" ? f : M.selFill;
      Kt && Kt !== "none" && Kt !== "transparent" && (b.fillStyle = Kt, b.fillRect(xt, q, Math.max(1, Jt - xt), tt));
      const te = h && h !== "#111" ? h : M.selStroke;
      b.strokeStyle = te, b.lineWidth = 1.5, b.beginPath(), b.moveTo(xt + 0.5, q + 0.5), b.lineTo(xt + 0.5, q + tt - 0.5), b.stroke(), b.beginPath(), b.moveTo(Jt - 0.5, q + 0.5), b.lineTo(Jt - 0.5, q + tt - 0.5), b.stroke(), b.restore();
      try {
        const Pt = Dt(At, Nt), re = m.t + Gn - 5 + 0.5;
        b.save(), b.font = "11px system-ui, sans-serif";
        const jt = Math.ceil(b.measureText(Pt).width);
        b.restore();
        const ce = (xt + Jt) / 2;
        var Ht = {
          text: Pt,
          x0: Math.round(ce - jt / 2) - 2,
          x1: Math.round(ce + jt / 2) + 2,
          yAxis: re
        };
      } catch {
      }
    }
    if (l) {
      const At = ei("%b"), Nt = m.t + Gn - 5 + 0.5;
      b.save(), b.strokeStyle = M.grid, b.lineWidth = 1, b.fillStyle = M.muted, b.font = "11px var(--cgm-font, system-ui, sans-serif)", b.textAlign = "center", b.textBaseline = "top";
      let xt = new Date(Bt), Jt = Date.UTC(xt.getUTCFullYear(), xt.getUTCMonth(), 1);
      if (Jt < Bt) {
        const Kt = xt.getUTCFullYear(), te = xt.getUTCMonth();
        Jt = Date.UTC(Kt, te + 1, 1);
      }
      for (let Kt = Jt; Kt <= Zt; ) {
        const te = Math.round(et(Kt));
        b.beginPath(), b.moveTo(te, Nt), b.lineTo(te, Nt + 4), b.stroke();
        const Pt = new Date(Kt);
        let re = At(new Date(Date.UTC(2e3, Pt.getUTCMonth(), 1)));
        if (Pt.getUTCMonth() === 0) {
          const ce = String(Pt.getUTCFullYear()).slice(-2);
          re = `${re} ${ce}'`;
        }
        let jt = !0;
        try {
          const ce = Math.ceil(b.measureText(re).width), ue = te - Math.round(ce / 2) - 2, se = te + Math.round(ce / 2) + 2;
          typeof Ht < "u" && Ht && !(se < Ht.x0 || ue > Ht.x1) && (jt = !1);
        } catch {
        }
        jt && b.fillText(re, te, Nt + 6), Kt = Date.UTC(Pt.getUTCFullYear(), Pt.getUTCMonth() + 1, 1);
      }
      b.restore();
      try {
        if (typeof Ht < "u" && Ht) {
          const Kt = Nt + 6;
          b.save(), b.fillStyle = M.text, b.font = "11px var(--cgm-font, system-ui, sans-serif)", b.textAlign = "center", b.textBaseline = "top";
          const te = Math.round((Ht.x0 + Ht.x1) / 2);
          b.fillText(Ht.text, te, Kt), b.restore();
        }
      } catch {
      }
    }
    const Gt = q + tt / 2;
    if (b.save(), b.fillStyle = M.arrow, it > 0 + 0.01) {
      const At = m.l - 5, Nt = 5, xt = 4;
      b.beginPath(), b.moveTo(At, Gt), b.lineTo(At + xt, Gt - Nt), b.lineTo(At + xt, Gt + Nt), b.closePath(), b.fill();
    }
    {
      const At = Math.floor((Math.max(k, Math.min(x, Y)) - k) / S), Nt = Math.floor((x - k) / S), xt = it + E < ut - 0.01;
      if (At < Nt || At === Nt && xt) {
        const Kt = D - m.r + 2;
        b.font = "16px system-ui, sans-serif", b.textAlign = "left", b.textBaseline = "middle", b.fillText(">|", Kt, Gt);
      }
    }
    b.restore();
  }
  function Dt(T, D) {
    const z = new Date(T), H = new Date(D), W = Te("%b %e"), tt = Te("%b %e, %Y"), q = Te("%e, %Y"), ut = Date.UTC(z.getUTCFullYear(), z.getUTCMonth(), z.getUTCDate()), bt = Date.UTC(H.getUTCFullYear(), H.getUTCMonth(), H.getUTCDate());
    return ut === bt ? tt(H) : z.getFullYear() === H.getFullYear() ? z.getMonth() === H.getMonth() ? `${W(z)} – ${q(H)}` : `${W(z)} – ${tt(H)}` : `${tt(z)} – ${tt(H)}`;
  }
  function gt() {
    if (!A || !F) return;
    const T = Tt();
    n(3, wt = P(T));
    const D = Math.max(0, Math.ceil((_ - A[0]) / r.stepMs)), z = Math.min(F.length - 1, Math.floor((Y - A[0]) / r.stepMs));
    try {
      typeof window < "u" && window.CGM_DEBUG && console.log("[CgmTir] rangechange", {
        startISO: new Date(_).toISOString(),
        endISO: new Date(Y).toISOString(),
        days: T,
        startIdx: D,
        endIdx: z
      });
    } catch {
    }
    p("rangechange", {
      start: _,
      end: Y,
      days: T,
      startIdx: D,
      endIdx: z
    });
  }
  function N(T) {
    const D = S;
    let z = Math.max(k + D - 1, Math.min(x, Y)), H = z - T * D + 1;
    H < k && (H = k, z = Math.min(x, H + T * D - 1)), n(15, _ = H), n(16, Y = z), Ct(), gt(), dt();
  }
  function at(T) {
    const D = _ + T * S, z = Y + T * S, H = Math.max(S, z - D);
    n(15, _ = Math.max(k, Math.min(x - H, D))), n(16, Y = Math.min(x, _ + H)), Ct(), gt(), dt();
  }
  function Z(T) {
    const D = Tt() * S * T;
    at(D / S);
  }
  function C() {
    const T = Tt(), D = x, z = Math.max(k, D - T * S + 1);
    n(15, _ = z), n(16, Y = D), Ct(), gt(), dt();
  }
  function dt() {
    $();
  }
  function v() {
    if (!w) return;
    const D = Math.max(320, w.getBoundingClientRect().width || 900) - m.l - m.r, z = Math.round((x - k) / S) + 1, H = D / 365, W = D / H;
    it = Math.max(0, Math.min(z - W, it));
  }
  function vt() {
    const T = Math.max(320, (w == null ? void 0 : w.getBoundingClientRect().width) || 900), D = T - m.l - m.r, z = D / 365, H = D / z;
    return { cssW: T, plotW: D, dayWidth: z, visibleDays: H };
  }
  function Ct() {
    const { visibleDays: T } = vt(), D = Math.round((x - k) / S) + 1, z = it, H = it + T, W = Math.floor((Math.max(k, Math.min(x, _)) - k) / S), tt = Math.floor((Math.max(k, Math.min(x, Y)) - k) / S);
    let q = z;
    W < z && (q = W), tt > H && (q = tt - T), q = Math.max(0, Math.min(D - T, q)), it = q;
  }
  let ft = !1, St = null, yt = null, kt = null, lt = null;
  function U() {
    if (ft || !w) return;
    const T = w;
    let D = !1, z = null, H = null, W = 0, tt = 0;
    const q = 6, ut = (mt) => {
      const et = new Date(mt);
      return Date.UTC(et.getUTCFullYear(), et.getUTCMonth(), et.getUTCDate());
    };
    function bt() {
      const mt = Math.max(320, T.getBoundingClientRect().width || 900), et = mt - m.l - m.r, Bt = m.l, Zt = mt - m.r, $t = et / 365;
      return { cssW: mt, plotW: et, x0: Bt, x1: Zt, dayWidth: $t };
    }
    function E(mt) {
      const et = T.getBoundingClientRect(), Bt = mt.clientX - et.left;
      mt.clientY - et.top;
      const { x0: Zt, x1: $t, dayWidth: Xt } = bt(), Yt = Math.max(Zt, Math.min($t, Bt)), Ot = (Yt - Zt) / Xt;
      let Ht = k + (it + Ot) * S;
      return Ht = Math.max(k, Math.min(x, Ht)), { t: Ht, x: Yt, rawX: Bt, x0: Zt, x1: $t, rowIdx: 0 };
    }
    St = (mt) => {
      const et = E(mt);
      if (!et) return;
      const { dayWidth: Bt, x0: Zt, x1: $t } = bt();
      {
        const Gt = Math.floor((Math.max(k, Math.min(x, Y)) - k) / S), At = Math.floor((x - k) / S), { x0: Nt, x1: xt, dayWidth: Jt } = bt(), Kt = (xt - Nt) / Jt, te = Math.round((x - k) / S) + 1, Pt = it + Kt < te - 0.01;
        if ((Gt < At || Gt === At && Pt) && et.rawX >= $t - 2 && et.rawX <= $t + 24) {
          C();
          return;
        }
      }
      const Xt = (Ht) => Zt + ((Ht - k) / S - it) * Bt, Yt = Xt(_), Ot = Xt(Y) + 1;
      z = "new", et.x >= Yt - q && et.x <= Yt + q ? z = "resize-l" : et.x >= Ot - q && et.x <= Ot + q ? z = "resize-r" : et.x > Yt && et.x < Ot && (z = "move"), D = !0, H = et.t, W = _, tt = Y, document.body.style.userSelect = "none", T.style.cursor = z === "move" ? "grabbing" : z === "new" ? "crosshair" : "col-resize";
    }, lt = (mt) => {
      const { dayWidth: et } = bt(), Zt = (Math.abs(mt.deltaX) > Math.abs(mt.deltaY) ? mt.deltaX : mt.deltaY) / et;
      it = it + Zt, v(), $(), mt.preventDefault();
    }, T.addEventListener("wheel", lt, { passive: !1 }), T.addEventListener("mousedown", St), yt = (mt) => {
      let et = E(mt);
      if (!et) {
        D || (T.style.cursor = "crosshair");
        return;
      }
      if (!D) {
        const { dayWidth: Ot, x0: Ht } = bt(), Gt = (xt) => Ht + ((xt - k) / S - it) * Ot, At = Gt(_), Nt = Gt(Y) + 1;
        {
          const { x0: xt, x1: Jt } = bt(), Kt = Math.floor((Math.max(k, Math.min(x, Y)) - k) / S), te = Math.floor((x - k) / S), Pt = function() {
            return bt().dayWidth;
          }(), re = (Jt - xt) / Pt, jt = Math.round((x - k) / S) + 1, ce = it + re < jt - 0.01;
          if ((Kt < te || Kt === te && ce) && et.rawX >= Jt - 2 && et.rawX <= Jt + 24) {
            T.style.cursor = "pointer";
            return;
          }
        }
        et.x >= At - q && et.x <= At + q || et.x >= Nt - q && et.x <= Nt + q ? T.style.cursor = "col-resize" : et.x > At && et.x < Nt ? T.style.cursor = "grab" : T.style.cursor = "crosshair";
        return;
      }
      const { x0: Bt, x1: Zt, dayWidth: $t } = bt();
      if (et.rawX < Bt) {
        const Ot = Bt - et.rawX;
        it -= Ot / $t, v(), et = E(mt) || et;
      } else if (et.rawX > Zt) {
        const Ot = et.rawX - Zt;
        it += Ot / $t, v(), et = E(mt) || et;
      }
      const Xt = et.t, Yt = S;
      if (z === "new") {
        const Ot = ut(Math.min(H, Xt)), Ht = ut(Math.max(H, Xt));
        let Gt = Math.max(1, Math.floor((Ht - Ot) / Yt) + 1);
        const At = P(Gt);
        if (Xt >= H) {
          let Nt = Ot, xt = Nt + At * Yt - 1;
          xt > x && (xt = x, Nt = Math.max(k, xt - At * Yt + 1)), n(15, _ = Nt), n(16, Y = xt);
        } else {
          let Nt = Ht + Yt - 1, xt = Nt - At * Yt + 1;
          xt < k && (xt = k, Nt = Math.min(x, xt + At * Yt - 1)), n(15, _ = xt), n(16, Y = Nt);
        }
      } else if (z === "resize-l") {
        const Ot = Math.max(1, Math.floor((tt - ut(Math.min(Xt, tt - Yt + 1)) + 1) / Yt)), Ht = P(Ot);
        let Gt = tt - Ht * Yt + 1;
        Gt = Math.max(k, Math.min(Gt, tt - Yt + 1)), n(15, _ = Gt), n(16, Y = tt);
      } else if (z === "resize-r") {
        const Ot = Math.max(1, Math.floor((ut(Xt) + Yt - 1 - W + 1) / Yt)), Ht = P(Ot);
        let Gt = W + Ht * Yt - 1;
        Gt = Math.min(x, Math.max(Gt, W + Yt - 1)), n(15, _ = W), n(16, Y = Gt);
      } else if (z === "move") {
        const Ot = Math.round((ut(Xt) - ut(H)) / Yt), Ht = tt - W + 1;
        let Gt = W + Ot * Yt;
        Gt = Math.max(k, Math.min(x - Ht + 1, Gt)), n(15, _ = Gt), n(16, Y = Gt + Ht - 1);
      }
      Ct(), gt(), $();
    }, kt = () => {
      D && (D = !1, z = null, H = null, document.body.style.userSelect = "", T.style.cursor = "crosshair");
    }, window.addEventListener("mousemove", yt), window.addEventListener("mouseup", kt), ft = !0;
  }
  function I() {
    if (!(!ft || !w)) {
      try {
        w.removeEventListener("mousedown", St);
      } catch {
      }
      try {
        w.removeEventListener("wheel", lt);
      } catch {
      }
      try {
        window.removeEventListener("mousemove", yt);
      } catch {
      }
      try {
        window.removeEventListener("mouseup", kt);
      } catch {
      }
      St = yt = kt = lt = null, ft = !1;
    }
  }
  yn(() => {
    b = w.getContext("2d"), V(), ot(), $();
    const T = Math.max(0, Math.ceil((_ - A[0]) / r.stepMs)), D = Math.min(F.length - 1, Math.floor((Y - A[0]) / r.stepMs));
    p("ready", {
      start: _,
      end: Y,
      startIdx: T,
      endIdx: D,
      days: Tt()
    }), gt(), U();
    const z = () => {
      v(), $();
    }, H = (W) => {
      const tt = W.target && W.target.tagName ? W.target.tagName.toLowerCase() : "";
      if (!(tt === "input" || tt === "textarea" || tt === "select" || W.defaultPrevented)) {
        if (/^[1-6]$/.test(W.key)) {
          const ut = {
            1: 1,
            2: 7,
            3: 14,
            4: 21,
            5: 30,
            6: 90
          }[W.key];
          N(ut), W.preventDefault();
          return;
        }
        if (W.key === "ArrowLeft" || W.key === "ArrowRight") {
          W.shiftKey ? Z(W.key === "ArrowLeft" ? -1 : 1) : at(W.key === "ArrowLeft" ? -1 : 1), W.preventDefault();
          return;
        }
        if (W.key === "ArrowUp" || W.key === "ArrowDown") {
          (function() {
            return { dayWidth: (Math.max(320, (w == null ? void 0 : w.getBoundingClientRect().width) || 900) - m.l - m.r) / 365 };
          })();
          const q = Math.round(30);
          it += W.key === "ArrowUp" ? -q : q, $(), W.preventDefault();
          return;
        }
      }
    };
    return window.addEventListener("resize", () => {
      V(), z();
    }), window.addEventListener("keydown", H), () => {
      window.removeEventListener("resize", z), window.removeEventListener("keydown", H), I();
    };
  });
  const Q = () => {
    n(0, s = !s);
  }, G = () => N(1), j = () => N(7), Ut = () => N(14), Rt = () => N(21), Vt = () => N(30), It = () => N(90);
  function ne(T) {
    Ue[T ? "unshift" : "push"](() => {
      w = T, n(1, w);
    });
  }
  function Qt(T) {
    Ue[T ? "unshift" : "push"](() => {
      y = T, n(2, y);
    });
  }
  return t.$$set = (T) => {
    "data" in T && n(5, r = T.data), "initialRange" in T && n(6, i = T.initialRange), "externalRange" in T && n(7, o = T.externalRange), "preset" in T && n(8, a = T.preset), "showMonthLabels" in T && n(9, l = T.showMonthLabels), "showData" in T && n(10, u = T.showData), "showCanvas" in T && n(0, s = T.showCanvas), "selectionStroke" in T && n(11, h = T.selectionStroke), "selectionFill" in T && n(12, f = T.selectionFill), "viewMode" in T && n(13, g = T.viewMode);
  }, t.$$.update = () => {
    if (t.$$.dirty[0] & /*externalRange, viewStart, viewEnd*/
    98432 && o && typeof o.start == "number" && typeof o.end == "number") {
      const T = o.start, D = o.end;
      (T !== _ || D !== Y) && (n(15, _ = T), n(16, Y = D), Ct(), gt(), dt());
    }
    t.$$.dirty[0] & /*viewStart, viewEnd*/
    98304 && Dt(_, Y), t.$$.dirty[0] & /*values, preset*/
    16640 && F && a && (Ft(), dt()), t.$$.dirty[0] & /*showCanvas*/
    1 && (s ? U() : I());
  }, n(3, wt = P(Tt())), [
    s,
    w,
    y,
    wt,
    N,
    r,
    i,
    o,
    a,
    l,
    u,
    h,
    f,
    g,
    F,
    _,
    Y,
    Q,
    G,
    j,
    Ut,
    Rt,
    Vt,
    It,
    ne,
    Qt
  ];
}
class Of extends nn {
  constructor(e) {
    super(), en(
      this,
      e,
      Gf,
      Xf,
      tn,
      {
        data: 5,
        initialRange: 6,
        externalRange: 7,
        preset: 8,
        showMonthLabels: 9,
        showData: 10,
        showCanvas: 0,
        selectionStroke: 11,
        selectionFill: 12,
        viewMode: 13
      },
      null,
      [-1, -1, -1]
    );
  }
}
function Kf(t) {
  let e, n, r, i, o, a, l, u, s, h, f, g, p, w, y, m, R, M, L, V, A, F, S, B, K, pt, X, k, x, _, Y, P, Tt, wt, Mt, st, Ft, ot, b, it, ct, $, Dt, gt, N, at, Z, C, dt, v, vt, Ct, ft, St, yt, kt, lt, U, I, Q;
  return {
    c() {
      e = nt("div"), n = nt("div"), r = nt("div"), i = nt("b"), o = O(
        /*spanLabel*/
        t[10]
      ), a = nt("div"), l = O(
        /*periodText*/
        t[9]
      ), u = _t(), s = nt("div"), h = nt("div"), f = nt("b"), f.textContent = "Target Range", g = _t(), p = nt("div"), w = nt("button"), y = O("General"), R = O(`·
          `), M = nt("button"), L = O("Tight"), A = O(`·
          `), F = nt("button"), S = O("Pregnancy"), K = _t(), pt = nt("div"), X = O(
        /*targetRangeText*/
        t[4]
      ), k = _t(), x = nt("div"), _ = O("Time CGM Active: "), Y = O(
        /*activeText*/
        t[8]
      ), P = _t(), Tt = nt("div"), wt = nt("div"), Mt = nt("b"), Mt.textContent = "Average Glucose", st = nt("div"), Ft = O("Goal: "), ot = O(
        /*avgGoalText*/
        t[5]
      ), b = nt("div"), it = O(
        /*avgText*/
        t[1]
      ), ct = _t(), $ = nt("div"), Dt = nt("div"), gt = nt("b"), gt.textContent = "Glucose Management Indicator (GMI)", N = nt("div"), at = O("Goal: "), Z = O(
        /*gmiGoalText*/
        t[6]
      ), C = nt("div"), dt = O(
        /*gmiText*/
        t[2]
      ), v = _t(), vt = nt("div"), Ct = nt("div"), ft = nt("b"), ft.textContent = "Glucose Variability (CV)", St = nt("div"), yt = O("Goal: "), kt = O(
        /*cvGoalText*/
        t[7]
      ), lt = nt("div"), U = O(
        /*cvText*/
        t[3]
      ), c(i, "class", "svelte-1fkbugc"), c(r, "class", "svelte-1fkbugc"), c(a, "class", "svelte-1fkbugc"), c(n, "class", "metric svelte-1fkbugc"), c(f, "class", "svelte-1fkbugc"), c(w, "type", "button"), c(w, "class", m = "opt " + /*preset*/
      (t[0] === "general" ? "active" : "muted") + " svelte-1fkbugc"), c(w, "aria-label", "Set target range: General"), c(M, "type", "button"), c(M, "class", V = "opt " + /*preset*/
      (t[0] === "tight" ? "active" : "muted") + " svelte-1fkbugc"), c(M, "aria-label", "Set target range: Tight"), c(F, "type", "button"), c(F, "class", B = "opt " + /*preset*/
      (t[0] === "pregnancy" ? "active" : "muted") + " svelte-1fkbugc"), c(F, "aria-label", "Set target range: Pregnancy"), c(p, "class", "target-switch svelte-1fkbugc"), c(h, "class", "svelte-1fkbugc"), J(pt, "font-weight", "normal"), c(pt, "class", "svelte-1fkbugc"), c(s, "class", "metric svelte-1fkbugc"), c(x, "class", "muted svelte-1fkbugc"), J(x, "font-size", "11px"), J(x, "margin-top", "6px"), J(x, "margin-left", "8px"), J(x, "padding-bottom", "30px"), c(Mt, "class", "svelte-1fkbugc"), c(st, "class", "muted svelte-1fkbugc"), J(st, "font-size", "11px"), c(wt, "class", "svelte-1fkbugc"), c(b, "class", "svelte-1fkbugc"), c(Tt, "class", "metric svelte-1fkbugc"), c(gt, "class", "svelte-1fkbugc"), c(N, "class", "muted svelte-1fkbugc"), J(N, "font-size", "11px"), c(Dt, "class", "svelte-1fkbugc"), c(C, "class", "svelte-1fkbugc"), c($, "class", "metric svelte-1fkbugc"), c(ft, "class", "svelte-1fkbugc"), c(St, "class", "muted svelte-1fkbugc"), J(St, "font-size", "11px"), c(Ct, "class", "svelte-1fkbugc"), c(lt, "class", "svelte-1fkbugc"), c(vt, "class", "metric svelte-1fkbugc"), c(e, "class", "summary"), J(e, "padding", "0 10px");
    },
    m(G, j) {
      Et(G, e, j), d(e, n), d(n, r), d(r, i), d(i, o), d(n, a), d(a, l), d(e, u), d(e, s), d(s, h), d(h, f), d(h, g), d(h, p), d(p, w), d(w, y), d(p, R), d(p, M), d(M, L), d(p, A), d(p, F), d(F, S), d(s, K), d(s, pt), d(pt, X), d(e, k), d(e, x), d(x, _), d(x, Y), d(e, P), d(e, Tt), d(Tt, wt), d(wt, Mt), d(wt, st), d(st, Ft), d(st, ot), d(Tt, b), d(b, it), d(e, ct), d(e, $), d($, Dt), d(Dt, gt), d(Dt, N), d(N, at), d(N, Z), d($, C), d(C, dt), d(e, v), d(e, vt), d(vt, Ct), d(Ct, ft), d(Ct, St), d(St, yt), d(St, kt), d(vt, lt), d(lt, U), I || (Q = [
        oe(
          w,
          "click",
          /*click_handler*/
          t[17]
        ),
        oe(
          M,
          "click",
          /*click_handler_1*/
          t[18]
        ),
        oe(
          F,
          "click",
          /*click_handler_2*/
          t[19]
        )
      ], I = !0);
    },
    p(G, [j]) {
      j & /*spanLabel*/
      1024 && Wt(
        o,
        /*spanLabel*/
        G[10]
      ), j & /*periodText*/
      512 && Wt(
        l,
        /*periodText*/
        G[9]
      ), j & /*preset*/
      1 && m !== (m = "opt " + /*preset*/
      (G[0] === "general" ? "active" : "muted") + " svelte-1fkbugc") && c(w, "class", m), j & /*preset*/
      1 && V !== (V = "opt " + /*preset*/
      (G[0] === "tight" ? "active" : "muted") + " svelte-1fkbugc") && c(M, "class", V), j & /*preset*/
      1 && B !== (B = "opt " + /*preset*/
      (G[0] === "pregnancy" ? "active" : "muted") + " svelte-1fkbugc") && c(F, "class", B), j & /*targetRangeText*/
      16 && Wt(
        X,
        /*targetRangeText*/
        G[4]
      ), j & /*activeText*/
      256 && Wt(
        Y,
        /*activeText*/
        G[8]
      ), j & /*avgGoalText*/
      32 && Wt(
        ot,
        /*avgGoalText*/
        G[5]
      ), j & /*avgText*/
      2 && Wt(
        it,
        /*avgText*/
        G[1]
      ), j & /*gmiGoalText*/
      64 && Wt(
        Z,
        /*gmiGoalText*/
        G[6]
      ), j & /*gmiText*/
      4 && Wt(
        dt,
        /*gmiText*/
        G[2]
      ), j & /*cvGoalText*/
      128 && Wt(
        kt,
        /*cvGoalText*/
        G[7]
      ), j & /*cvText*/
      8 && Wt(
        U,
        /*cvText*/
        G[3]
      );
    },
    i: ie,
    o: ie,
    d(G) {
      G && Lt(e), I = !1, Xe(Q);
    }
  };
}
function Zf(t, e, n) {
  let r, { data: i } = e, { range: o = null } = e, { preset: a = "general" } = e;
  const l = cr();
  let u = "—", s = "—", h = "—", f = "—", g = "", p = "", w = "", y = "—", m = "", R = 0, M, L, V = 24 * 60 * 60 * 1e3;
  const A = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol"), F = () => A() ? "mmol" : "mg", S = () => A() ? "mmol/L" : "mg/dL", B = (_) => A() ? _ * 18 : _;
  function K() {
    if (!i) return;
    const _ = new Date(i.t0).getTime();
    n(15, M = Float64Array.from({ length: i.glucose.length }, (Y, P) => _ + P * i.stepMs)), n(16, L = Float64Array.from(i.glucose));
  }
  function pt(_) {
    _ !== a && (n(0, a = _), l("presetchange", { preset: _ }));
  }
  yn(() => {
    K();
  });
  const X = () => pt("general"), k = () => pt("tight"), x = () => pt("pregnancy");
  return t.$$set = (_) => {
    "data" in _ && n(12, i = _.data), "range" in _ && n(13, o = _.range), "preset" in _ && n(0, a = _.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*preset*/
    1 && function() {
      const _ = He[a].thresholds[F()];
      n(4, f = _.low + "-" + _.high + S());
    }(), t.$$.dirty & /*preset*/
    1 && He[a].label, t.$$.dirty & /*preset*/
    1 && function() {
      const _ = He[a].metricsGoals;
      n(5, g = _.averageGlucose[F()]), n(6, p = _.gmi), n(7, w = _.cv);
    }(), t.$$.dirty & /*data*/
    4096 && i && K(), t.$$.dirty & /*data, range, time, values*/
    110592 && i && o && M && L) {
      const { start: _, end: Y } = o, P = Math.max(0, Math.ceil((_ - M[0]) / i.stepMs)), Tt = Math.min(L.length - 1, Math.floor((Y - M[0]) / i.stepMs));
      try {
        typeof window < "u" && window.CGM_DEBUG && console.log("[CgmSummary] update", {
          startISO: new Date(_).toISOString(),
          endISO: new Date(Y).toISOString(),
          stepMs: i.stepMs,
          i0: P,
          i1: Tt,
          len: L.length
        });
      } catch {
      }
      if (Tt < P)
        n(1, u = "—"), n(2, s = "—"), n(3, h = "—"), n(8, y = "—"), n(9, m = ""), n(14, R = 0);
      else {
        let Dt = function(C, dt) {
          const v = new Date(C), vt = new Date(dt), Ct = Te("%b %e"), ft = Te("%b %e, %Y"), St = Te("%e, %Y"), yt = Date.UTC(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate()), kt = Date.UTC(vt.getUTCFullYear(), vt.getUTCMonth(), vt.getUTCDate());
          return yt === kt ? ft(vt) : v.getFullYear() === vt.getFullYear() ? v.getMonth() === vt.getMonth() ? `${Ct(v)} – ${St(vt)}` : `${Ct(v)} – ${ft(vt)}` : `${ft(v)} – ${ft(vt)}`;
        };
        const wt = [];
        for (let C = P; C <= Tt; C++) {
          const dt = L[C];
          Number.isFinite(dt) && dt >= 0 && wt.push(dt);
        }
        const Mt = Math.max(1, Tt - P + 1), Ft = 100 * wt.length / Mt;
        n(8, y = `${Ft.toFixed(1)}%`);
        const ot = Ca(wt), b = _a(wt) ?? 0, it = Math.sqrt(b), ct = Number.isFinite(ot) ? 3.31 + 0.02392 * B(ot) : NaN, $ = Number.isFinite(ot) && ot !== 0 ? it / ot * 100 : NaN;
        n(1, u = Number.isFinite(ot) ? A() ? `${ot.toFixed(1)} mmol/L` : `${Math.round(ot)} mg/dL` : "—"), n(2, s = Number.isFinite(ct) ? `${ct.toFixed(1)}%` : "—"), n(3, h = Number.isFinite($) ? `${$.toFixed(1)}%` : "—"), n(9, m = Dt(_, Y));
        const gt = new Date(_), N = new Date(Y), at = Date.UTC(gt.getUTCFullYear(), gt.getUTCMonth(), gt.getUTCDate()), Z = Date.UTC(N.getUTCFullYear(), N.getUTCMonth(), N.getUTCDate());
        n(14, R = Math.max(1, Math.floor((Z - at) / V) + 1));
      }
    }
    t.$$.dirty & /*range, daysCount*/
    24576 && n(10, r = (() => {
      if (!o) return `${R} Days`;
      const _ = 60 * 60 * 1e3, Y = Math.max(0, Math.round((o.end - o.start) / _)), P = Math.round(Y / 24);
      return P === 1 ? "1 Day" : P === 7 ? "1 Week" : P === 14 ? "2 Weeks" : P === 21 ? "3 Weeks" : P === 30 ? "1 Month" : P === 90 ? "3 Months" : `${R} Days`;
    })());
  }, [
    a,
    u,
    s,
    h,
    f,
    g,
    p,
    w,
    y,
    m,
    r,
    pt,
    i,
    o,
    R,
    M,
    L,
    X,
    k,
    x
  ];
}
class Qf extends nn {
  constructor(e) {
    super(), en(this, e, Zf, Kf, tn, { data: 12, range: 13, preset: 0 });
  }
}
function Jf(t) {
  let e;
  return {
    c() {
      e = O("General");
    },
    m(n, r) {
      Et(n, e, r);
    },
    d(n) {
      n && Lt(e);
    }
  };
}
function jf(t) {
  let e;
  return {
    c() {
      e = O("Pregnancy");
    },
    m(n, r) {
      Et(n, e, r);
    },
    d(n) {
      n && Lt(e);
    }
  };
}
function $f(t) {
  let e;
  return {
    c() {
      e = O("Tight");
    },
    m(n, r) {
      Et(n, e, r);
    },
    d(n) {
      n && Lt(e);
    }
  };
}
function th(t) {
  let e = Math.round(
    /*TH*/
    t[4]().low
  ) + "", n, r, i = Math.round(
    /*TH*/
    t[4]().high
  ) + "", o, a;
  return {
    c() {
      n = O(e), r = O("–"), o = O(i), a = O(" mg/dL");
    },
    m(l, u) {
      Et(l, n, u), Et(l, r, u), Et(l, o, u), Et(l, a, u);
    },
    p: ie,
    d(l) {
      l && (Lt(n), Lt(r), Lt(o), Lt(a));
    }
  };
}
function eh(t) {
  let e = (
    /*TH*/
    t[4]().low.toFixed(1) + ""
  ), n, r, i = (
    /*TH*/
    t[4]().high.toFixed(1) + ""
  ), o, a;
  return {
    c() {
      n = O(e), r = O("–"), o = O(i), a = O(" mmol/L");
    },
    m(l, u) {
      Et(l, n, u), Et(l, r, u), Et(l, o, u), Et(l, a, u);
    },
    p: ie,
    d(l) {
      l && (Lt(n), Lt(r), Lt(o), Lt(a));
    }
  };
}
function nh(t) {
  let e, n, r, i, o, a, l, u, s, h, f, g, p, w, y, m = (
    /*pct*/
    t[2].targ.toFixed(1) + ""
  ), R, M, L, V, A, F;
  function S(x, _) {
    return (
      /*preset*/
      x[0] === "tight" ? $f : (
        /*preset*/
        x[0] === "pregnancy" ? jf : Jf
      )
    );
  }
  let B = S(t), K = B(t);
  function pt(x, _) {
    return (
      /*isMmol*/
      x[3]() ? eh : th
    );
  }
  let k = pt(t)(t);
  return {
    c() {
      e = nt("div"), n = nt("div"), r = nt("div"), i = _t(), o = nt("div"), a = _t(), l = nt("div"), u = _t(), s = nt("div"), h = _t(), f = nt("div"), g = _t(), p = nt("div"), w = nt("div"), y = nt("span"), R = O(m), M = O("%"), L = O(" in range"), V = _t(), A = nt("div"), K.c(), F = _t(), k.c(), c(r, "class", "seg vlow svelte-15po776"), J(
        r,
        "width",
        /*pct*/
        t[2].vlow + "%"
      ), c(r, "title", "Very low"), c(o, "class", "seg low svelte-15po776"), J(
        o,
        "width",
        /*pct*/
        t[2].low + "%"
      ), c(o, "title", "Low"), c(l, "class", "seg targ svelte-15po776"), J(
        l,
        "width",
        /*pct*/
        t[2].targ + "%"
      ), c(l, "title", "Target"), c(s, "class", "seg high svelte-15po776"), J(
        s,
        "width",
        /*pct*/
        t[2].high + "%"
      ), c(s, "title", "High"), c(f, "class", "seg vhigh svelte-15po776"), J(
        f,
        "width",
        /*pct*/
        t[2].vhigh + "%"
      ), c(f, "title", "Very high"), c(n, "class", "bar svelte-15po776"), c(y, "class", "strong svelte-15po776"), c(w, "class", "left svelte-15po776"), c(A, "class", "right svelte-15po776"), c(p, "class", "legend svelte-15po776"), c(e, "class", "tirbar svelte-15po776");
    },
    m(x, _) {
      Et(x, e, _), d(e, n), d(n, r), d(n, i), d(n, o), d(n, a), d(n, l), d(n, u), d(n, s), d(n, h), d(n, f), d(e, g), d(e, p), d(p, w), d(w, y), d(y, R), d(y, M), d(w, L), d(p, V), d(p, A), K.m(A, null), d(A, F), k.m(A, null), t[9](e);
    },
    p(x, [_]) {
      _ & /*pct*/
      4 && J(
        r,
        "width",
        /*pct*/
        x[2].vlow + "%"
      ), _ & /*pct*/
      4 && J(
        o,
        "width",
        /*pct*/
        x[2].low + "%"
      ), _ & /*pct*/
      4 && J(
        l,
        "width",
        /*pct*/
        x[2].targ + "%"
      ), _ & /*pct*/
      4 && J(
        s,
        "width",
        /*pct*/
        x[2].high + "%"
      ), _ & /*pct*/
      4 && J(
        f,
        "width",
        /*pct*/
        x[2].vhigh + "%"
      ), _ & /*pct*/
      4 && m !== (m = /*pct*/
      x[2].targ.toFixed(1) + "") && Wt(R, m), B !== (B = S(x)) && (K.d(1), K = B(x), K && (K.c(), K.m(A, F))), k.p(x, _);
    },
    i: ie,
    o: ie,
    d(x) {
      x && Lt(e), K.d(), k.d(), t[9](null);
    }
  };
}
function rh(t, e, n) {
  let { data: r } = e, { range: i = null } = e, { preset: o = "general" } = e, a, l;
  const u = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), s = () => u() ? "mmol" : "mg", h = () => He[o].thresholds[s()];
  let f;
  function g(m, R) {
    try {
      return (getComputedStyle(f).getPropertyValue(m) || "").trim() || R;
    } catch {
      return R;
    }
  }
  let p = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  };
  function w() {
    if (!r) return;
    const m = new Date(r.t0).getTime();
    n(7, a = Float64Array.from({ length: r.glucose.length }, (R, M) => m + M * r.stepMs)), n(8, l = Float64Array.from(r.glucose));
  }
  yn(() => {
    w();
  });
  function y(m) {
    Ue[m ? "unshift" : "push"](() => {
      f = m, n(1, f);
    });
  }
  return t.$$set = (m) => {
    "data" in m && n(5, r = m.data), "range" in m && n(6, i = m.range), "preset" in m && n(0, o = m.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*data*/
    32 && r && w(), t.$$.dirty & /*data, range, time, values, preset*/
    481 && r && i && a && l && o) {
      const { start: m, end: R } = i, M = Math.max(0, Math.ceil((m - a[0]) / r.stepMs)), L = Math.min(l.length - 1, Math.floor((R - a[0]) / r.stepMs));
      if (L < M)
        n(2, p = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        });
      else {
        const V = h();
        let A = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, F = 0;
        for (let S = M; S <= L; S++) {
          const B = l[S];
          Number.isFinite(B) && B >= 0 && (F++, B < V.vlow ? A.vlow++ : B < V.low ? A.low++ : B <= V.high ? A.targ++ : B <= V.vhigh ? A.high++ : A.vhigh++);
        }
        F === 0 ? n(2, p = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }) : n(2, p = {
          vlow: A.vlow / F * 100,
          low: A.low / F * 100,
          targ: A.targ / F * 100,
          high: A.high / F * 100,
          vhigh: A.vhigh / F * 100
        });
      }
    }
  }, g("--cgm-very-low", "#e57373"), g("--cgm-low", "#ff9e80"), g("--cgm-in-range", "#86c89d"), g("--cgm-high", "#ffcc80"), g("--cgm-very-high", "#ff8a65"), [o, f, p, u, h, r, i, a, l, y];
}
class ih extends nn {
  constructor(e) {
    super(), en(this, e, rh, nh, tn, { data: 5, range: 6, preset: 0 });
  }
}
function oh(t) {
  let e;
  return {
    c() {
      e = ht("svg"), J(e, "width", "100%"), J(e, "height", "260px"), J(e, "display", "block");
    },
    m(n, r) {
      Et(n, e, r), t[6](e);
    },
    p: ie,
    i: ie,
    o: ie,
    d(n) {
      n && Lt(e), t[6](null);
    }
  };
}
function xn(t, e) {
  if (!t.length) return NaN;
  const n = (t.length - 1) * e, r = Math.floor(n), i = n - r;
  return t[r] + (t[Math.min(t.length - 1, r + 1)] - t[r]) * (i || 0);
}
function ah(t, e, n) {
  let { data: r } = e, { range: i = null } = e, { preset: o = "general" } = e, a, l = 900, u = 260;
  const s = { l: 50, r: 60, t: 20, b: 26 }, h = 24 * 60 * 60 * 1e3;
  function f(A, F) {
    try {
      return (getComputedStyle(a).getPropertyValue(A) || "").trim() || F;
    } catch {
      return F;
    }
  }
  const g = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), p = () => g() ? "mmol" : "mg", w = () => He[o].thresholds[p()];
  let y, m;
  function R() {
    const A = new Date(r.t0).getTime();
    n(4, y = Float64Array.from({ length: r.glucose.length }, (F, S) => A + S * r.stepMs)), n(5, m = Float64Array.from(r.glucose));
  }
  function M(A, F) {
    const S = Math.max(1, Math.round(h / r.stepMs)), B = Array.from({ length: S }, () => []), K = /* @__PURE__ */ new Set();
    for (let X = A; X <= F; X++) {
      const k = m[X];
      if (!(Number.isFinite(k) && k >= 0)) continue;
      const x = y[X], _ = new Date(x), Y = new Date(_.getFullYear(), _.getMonth(), _.getDate()).getTime();
      K.add(Y);
      let P = Math.round((x - Y) / r.stepMs);
      P < 0 ? P = 0 : P >= S && (P = S - 1), B[P].push(k);
    }
    return {
      series: B.map((X, k) => {
        const x = Float64Array.from(X).sort();
        return {
          t: k,
          p05: xn(x, 0.05),
          p25: xn(x, 0.25),
          p50: xn(x, 0.5),
          p75: xn(x, 0.75),
          p95: xn(x, 0.95)
        };
      }),
      samplesPerDay: S,
      dayCount: K.size
    };
  }
  function L() {
    if (!a || !r || !i || !y || !m) return;
    const A = a.getBoundingClientRect();
    l = Math.max(360, A.width || 900), u = Math.max(220, A.height || 260);
    const F = Be(a);
    F.selectAll("*").remove();
    const S = Math.max(0, Math.ceil((i.start - y[0]) / r.stepMs)), B = Math.min(m.length - 1, Math.floor((i.end - y[0]) / r.stepMs));
    if (B < S) return;
    const { series: K, samplesPerDay: pt, dayCount: X } = M(S, B);
    if (!K.flatMap((v) => [v.p05, v.p95]).filter(Number.isFinite).length) {
      const v = l / 2, vt = (s.t + (u - s.b)) / 2;
      F.append("text").attr("x", v).attr("y", vt).attr("text-anchor", "middle").attr("dominant-baseline", "middle").attr("font-size", 56).attr("fill", f("--cgm-muted", "#9aa3b2")).text("∅");
      return;
    }
    const x = En().domain([0, pt - 1]).range([s.l, l - s.r]), _ = w(), Y = g() ? 20 : 360, P = En().domain([_.veryLow, Y]).range([u - s.b, s.t]), Tt = Se().defined((v) => Number.isFinite(v.p05) && Number.isFinite(v.p95) && v.p05 < _.low).x((v) => x(v.t)).y0((v) => P(Math.min(v.p95, _.low))).y1((v) => P(v.p05)), wt = Se().defined((v) => Number.isFinite(v.p05) && Number.isFinite(v.p95) && v.p95 > _.low && v.p05 < _.high).x((v) => x(v.t)).y0((v) => P(Math.min(v.p95, _.high))).y1((v) => P(Math.max(v.p05, _.low))), Mt = Se().defined((v) => Number.isFinite(v.p05) && Number.isFinite(v.p95) && v.p95 > _.high && v.p05 < _.veryHigh).x((v) => x(v.t)).y0((v) => P(Math.min(v.p95, _.veryHigh))).y1((v) => P(Math.max(v.p05, _.high))), st = Se().defined((v) => Number.isFinite(v.p05) && Number.isFinite(v.p95) && v.p95 > _.veryHigh && v.p05 < _.veryHigh).x((v) => x(v.t)).y0((v) => P(v.p95)).y1((v) => P(_.veryHigh)), Ft = Se().defined((v) => Number.isFinite(v.p05) && Number.isFinite(v.p95) && v.p05 > _.veryHigh).x((v) => x(v.t)).y0((v) => P(v.p95)).y1((v) => P(v.p05));
    F.append("path").attr("d", Tt(K)).attr("fill", f("--cgm-low-strong", "#d73027")).attr("opacity", 0.18), F.append("path").attr("d", wt(K)).attr("fill", f("--cgm-in-range", "#1a9850")).attr("opacity", 0.12), F.append("path").attr("d", Mt(K)).attr("fill", f("--cgm-high", "#fdae61")).attr("opacity", 0.18);
    const ot = f("--cgm-very-high-strong", "#f46d43");
    F.append("path").attr("d", st(K)).attr("fill", ot).attr("opacity", 0.26), F.append("path").attr("d", Ft(K)).attr("fill", ot).attr("opacity", 0.26);
    const b = Se().defined((v) => Number.isFinite(v.p25) && Number.isFinite(v.p75) && v.p75 > _.low && v.p25 < _.high).x((v) => x(v.t)).y0((v) => P(Math.min(Math.max(v.p25, _.low), _.high))).y1((v) => P(Math.max(Math.min(v.p75, _.high), _.low))), it = Se().defined((v) => Number.isFinite(v.p25) && Number.isFinite(v.p75) && v.p75 > _.high && v.p25 < _.vhigh).x((v) => x(v.t)).y0((v) => P(Math.min(v.p75, _.vhigh))).y1((v) => P(Math.max(v.p25, _.high))), ct = Se().defined((v) => Number.isFinite(v.p25) && Number.isFinite(v.p75) && v.p75 > _.vhigh && v.p25 < _.vhigh).x((v) => x(v.t)).y0((v) => P(v.p75)).y1((v) => P(_.vhigh)), $ = Se().defined((v) => Number.isFinite(v.p25) && Number.isFinite(v.p75) && v.p25 < _.low).x((v) => x(v.t)).y0((v) => P(v.p25)).y1((v) => P(Math.min(v.p75, _.low)));
    F.append("path").attr("d", $(K)).attr("fill", f("--cgm-low-strong", "#d73027")).attr("opacity", 0.35), F.append("path").attr("d", b(K)).attr("fill", f("--cgm-in-range", "#1a9850")).attr("opacity", 0.25), F.append("path").attr("d", it(K)).attr("fill", f("--cgm-high", "#fdae61")).attr("opacity", 0.35), F.append("path").attr("d", ct(K)).attr("fill", ot).attr("opacity", 0.45);
    try {
      let ft = function(lt, U, I) {
        return lt < I && U >= I || lt > I && U <= I;
      }, St = function(lt, U, I, Q, G) {
        return { t: lt + (G - U) * (I - lt) / (Q - U), p50: G };
      };
      const v = (lt) => lt < _.low ? f("--cgm-low-strong", "#d73027") : lt > _.vhigh ? f("--cgm-very-high-strong", "#f46d43") : lt > _.high ? f("--cgm-high", "#fdae61") : f("--cgm-in-range", "#1a9850"), vt = An().x((lt) => x(lt.t)).y((lt) => P(lt.p50)), Ct = (lt, U, I, Q) => {
        !Number.isFinite(I.p50) || !Number.isFinite(Q.p50) || ((!lt.length || lt[lt.length - 1].color !== U) && lt.push({ color: U, arr: [I] }), lt[lt.length - 1].arr.push(Q));
      };
      let yt = [], kt = null;
      for (let lt = 0; lt < K.length; lt++) {
        const U = K[lt];
        if (!Number.isFinite(U.p50)) {
          kt = null;
          continue;
        }
        if (!kt) {
          kt = U;
          continue;
        }
        const I = kt.t, Q = kt.p50, G = U.t, j = U.p50;
        let Ut = [{ t: I, p50: Q }], Rt = Q, Vt = I;
        const It = [_.low, _.high, _.vhigh];
        (j > Q ? It : It.slice().reverse()).forEach((T) => {
          if (ft(Rt, j, T)) {
            const D = St(Vt, Rt, G, j, T);
            Ut.push(D), Rt = D.p50, Vt = D.t;
          }
        }), Ut.push({ t: G, p50: j });
        for (let T = 1; T < Ut.length; T++) {
          const D = Ut[T - 1], z = Ut[T], H = (D.p50 + z.p50) / 2 + (z.p50 === D.p50 ? z.t > D.t ? 1e-6 : -1e-6 : 0), W = v(H);
          Ct(yt, W, D, z);
        }
        kt = U;
      }
      yt.forEach((lt) => {
        lt.arr.length >= 2 && F.append("path").attr("d", vt(lt.arr)).attr("stroke", lt.color).attr("fill", "none").attr("stroke-width", 2);
      });
    } catch {
    }
    const Dt = f("--cgm-threshold", "#6ea77b");
    F.append("line").attr("x1", s.l).attr("x2", l - s.r).attr("y1", P(_.high)).attr("y2", P(_.high)).attr("stroke", Dt).attr("stroke-width", 1), F.append("line").attr("x1", s.l).attr("x2", l - s.r).attr("y1", P(_.low)).attr("y2", P(_.low)).attr("stroke", Dt).attr("stroke-width", 1);
    const gt = 60 * 60 * 1e3 / r.stepMs, N = Ur(0, 24, 3).map((v) => Math.round(v * gt)), at = (v) => v === 0 || v === 24 ? "12am" : v < 12 ? `${v}am` : v === 12 ? "12pm" : `${v - 12}pm`, Z = f("--cgm-axis-color", "#555");
    F.append("g").attr("transform", `translate(0,${u - s.b})`).call(La(x).tickValues(N).tickFormat((v) => at(Math.round(v / gt))).tickSizeOuter(0)).call((v) => v.selectAll("text").attr("fill", Z)).call((v) => v.selectAll("line").attr("stroke", Z)).call((v) => v.select(".domain").attr("stroke", Z));
    const C = [w().veryLow, w().low, w().high, w().veryHigh, g() ? 20 : 360].filter((v) => v >= _.veryLow && v <= Y), dt = g() ? (v) => Math.round(v * 10) / 10 : (v) => Math.round(v);
    F.append("g").attr("transform", `translate(${s.l},0)`).call(Ea(P).tickValues(C).tickFormat(dt)).call((v) => v.selectAll("text").attr("fill", Z)).call((v) => v.selectAll("line").attr("stroke", Z)).call((v) => v.select(".domain").remove());
    try {
      if (X && X > 2) {
        const v = (St) => {
          for (let yt = K.length - 1; yt >= 0; yt--) {
            const kt = K[yt][St];
            if (Number.isFinite(kt)) return { t: K[yt].t, v: kt };
          }
          return null;
        }, Ct = f("--cgm-axis-color", "#000"), ft = (St, yt) => {
          if (!yt) return;
          const kt = Math.min(l - s.r - 2, x(yt.t) + 41), lt = P(yt.v);
          Be(a).append("text").attr("x", kt + 5).attr("y", lt).attr("dy", "0.35em").attr("text-anchor", "start").attr("fill", Ct).attr("font-size", 11).attr("font-weight", St === 50 ? 700 : 400).text(`${St}%`);
        };
        ft(5, v("p05")), ft(25, v("p25")), ft(50, v("p50")), ft(75, v("p75")), ft(95, v("p95"));
      }
    } catch {
    }
    try {
      let kt = function(lt) {
        const U = P(lt), I = Be(a).append("text").attr("x", -9999).attr("y", -9999).attr("fill", St).attr("font-size", 11).attr("font-weight", 700).text(yt(lt)), Q = I.node().getBBox();
        I.remove();
        const G = Math.ceil(Q.width), j = s.l - 8 - (G + 6 * 2), Ut = U - 16 / 2;
        Be(a).append("rect").attr("x", j).attr("y", Ut).attr("rx", 5).attr("ry", 5).attr("width", G + 6 * 2).attr("height", 16).attr("fill", ft), Be(a).append("text").attr("x", j + 6).attr("y", U).attr("dy", "0.35em").attr("fill", St).attr("font-size", 11).attr("font-weight", 700).text(yt(lt));
      };
      const ft = f("--cgm-in-range", "#1a9850"), St = f("--cgm-pill-text", "#fff"), yt = (lt) => {
        if (g()) {
          const U = (Math.round(lt * 10) / 10).toFixed(1);
          return U.endsWith(".0") ? U.slice(0, -2) : U;
        }
        return Math.round(lt).toString();
      };
      kt(_.low), kt(_.high);
    } catch {
    }
  }
  yn(() => {
    R(), L(), window.addEventListener("resize", L);
  });
  function V(A) {
    Ue[A ? "unshift" : "push"](() => {
      a = A, n(0, a);
    });
  }
  return t.$$set = (A) => {
    "data" in A && n(1, r = A.data), "range" in A && n(2, i = A.range), "preset" in A && n(3, o = A.preset);
  }, t.$$.update = () => {
    t.$$.dirty & /*data, range, time, values, preset*/
    62 && r && i && y && m && o && L();
  }, [a, r, i, o, y, m, V];
}
class lh extends nn {
  constructor(e) {
    super(), en(this, e, ah, oh, tn, { data: 1, range: 2, preset: 3 });
  }
}
function sh(t) {
  let e;
  return {
    c() {
      e = ht("svg"), J(e, "width", "100%"), J(e, "display", "block");
    },
    m(n, r) {
      Et(n, e, r), t[5](e);
    },
    p: ie,
    i: ie,
    o: ie,
    d(n) {
      n && Lt(e), t[5](null);
    }
  };
}
function uh(t, e, n) {
  let { data: r } = e, { range: i = null } = e, { preset: o = "general" } = e, { colorWholeWeek: a = !1 } = e, l;
  function u(m, R) {
    try {
      return (getComputedStyle(l).getPropertyValue(m) || "").trim() || R;
    } catch {
      return R;
    }
  }
  const s = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), h = () => s() ? "mmol" : "mg";
  let f, g;
  function p() {
    if (!r) return;
    const m = new Date(r.t0).getTime();
    f = Float64Array.from({ length: r.glucose.length }, (R, M) => m + M * r.stepMs), g = Float64Array.from(r.glucose);
  }
  function w() {
    if (!l || !r || !i || !f || !g) return;
    const m = Be(l);
    m.selectAll("*").remove();
    const R = l.getBoundingClientRect(), M = Math.max(360, R.width || 1100), L = 7, V = 0, A = 30, F = { l: 0, r: 0, t: 40, b: 0 }, S = Math.max(100, Math.floor((M - F.l - F.r - (L - 1) * V) / L)), B = Math.round(86 * 0.8), K = Math.round(18 * 0.8), pt = i.start, X = i.end, k = xe.floor(new Date(pt)).getTime(), x = xe.floor(new Date(X)).getTime(), _ = new Date(k), Y = new Date(x), P = (_.getDay() + 6) % 7, Tt = 7 - (Y.getDay() + 6) % 7 - 1, wt = xe.offset(new Date(k), -P).getTime(), Mt = xe.offset(new Date(x), Tt).getTime(), st = xe.offset(new Date(Mt), 1).getTime(), Ft = xe.range(new Date(wt), xe.offset(new Date(Mt), 1)).map((Z) => Z.getTime()), ot = Ft.length, b = Math.ceil(ot / L), it = F.t + b * B + (b - 1) * A + F.b;
    l.setAttribute("height", it);
    const ct = new Map(Ft.map((Z) => [Z, []]));
    for (let Z = 0; Z < g.length; Z++) {
      const C = g[Z];
      if (!(Number.isFinite(C) && C >= 0)) continue;
      const dt = f[Z];
      if (dt < wt || dt >= st) continue;
      const v = xe.floor(new Date(dt)).getTime();
      ct.has(v) && ct.get(v).push({ t: dt - v, v: C, a: dt });
    }
    const $ = He[o].thresholds[h()], Dt = 60 * 60 * 1e3 / r.stepMs;
    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((Z, C) => {
      b > 0 && Be(l).append("text").attr("x", F.l + C * (S + V) + S / 2).attr("y", 16).attr("text-anchor", "middle").attr("fill", u("--cgm-muted", "#555")).attr("font-size", 10).text(Z);
    });
    const N = xe.floor(/* @__PURE__ */ new Date()).getTime();
    for (let Z = 1; Z <= L - 1; Z++) {
      const C = F.l + Z * (S + V);
      for (let dt = 0; dt < b; dt++) {
        const v = dt * L, vt = v + (Z - 1), Ct = v + Z, ft = Ft[vt], St = Ft[Ct];
        if (ft !== void 0 && ft > N && St !== void 0 && St > N) continue;
        const yt = F.t + dt * (B + A);
        Be(l).append("line").attr("x1", C).attr("x2", C).attr("y1", yt + 4).attr("y2", yt + B - 4).attr("stroke", u("--cgm-grid", "#e6e6e6")).attr("stroke-width", 1);
      }
    }
    Te("%b"), Te("%Y");
    const at = (Z) => {
      const C = Z % 100;
      if (C < 11 || C > 13) {
        const dt = Z % 10;
        if (dt === 1) return "st";
        if (dt === 2) return "nd";
        if (dt === 3) return "rd";
      }
      return "th";
    };
    Ft.forEach((Z, C) => {
      const dt = Math.floor(C / L), v = C % L, vt = F.l + v * (S + V), Ct = F.t + dt * (B + A), ft = m.append("g").attr("transform", `translate(${vt},${Ct})`).attr("class", "day"), St = En().domain([0, 24 * Dt - 1]).range([0, S]), yt = En().domain(s() ? [0, 20] : [0, 360]).range([B - K, 0]), kt = Z > N;
      kt || (ft.append("rect").attr("x", 0).attr("y", yt($.high)).attr("width", S).attr("height", Math.max(1, yt($.low) - yt($.high))).attr("fill", u("--cgm-target-band-bg", "#efefef")), ft.append("line").attr("x1", 0).attr("x2", S).attr("y1", yt($.high)).attr("y2", yt($.high)).attr("stroke", u("--cgm-threshold", "#2e7d32")).attr("opacity", 0.7), ft.append("line").attr("x1", 0).attr("x2", S).attr("y1", yt($.low)).attr("y2", yt($.low)).attr("stroke", u("--cgm-threshold", "#2e7d32")).attr("opacity", 0.7));
      const lt = (ct.get(Z) || []).slice().sort((E, mt) => E.t - mt.t), U = 2 * r.stepMs, I = [];
      let Q = [];
      for (const E of lt) {
        if (!Number.isFinite(E.v)) {
          Q.length && (I.push(Q), Q = []);
          continue;
        }
        Q.length && E.t - Q[Q.length - 1].t > U ? (I.push(Q), Q = [E]) : Q.push(E);
      }
      Q.length && I.push(Q);
      const G = a ? wt : pt, j = a ? st - 1 : X, Ut = (E) => E.a >= G && E.a <= j, Rt = Se().defined((E) => Number.isFinite(E.v) && E.v > $.high && Ut(E)).x((E) => St(E.t / r.stepMs)).y0((E) => yt($.high)).y1((E) => yt(E.v));
      kt || I.forEach((E) => {
        E.length > 1 && ft.append("path").attr("d", Rt(E)).attr("fill", u("--cgm-high", "#fdae61")).attr("opacity", 0.35);
      });
      const Vt = Se().defined((E) => Number.isFinite(E.v) && E.v < $.low && Ut(E)).x((E) => St(E.t / r.stepMs)).y0((E) => yt(E.v)).y1((E) => yt($.low));
      kt || I.forEach((E) => {
        E.length > 1 && ft.append("path").attr("d", Vt(E)).attr("fill", u("--cgm-low-strong", "#d73027")).attr("opacity", 0.25);
      }), An().x((E) => St(E.t / r.stepMs)).y((E) => yt(E.v)).curve(Sr);
      const It = (E) => Number.isFinite(E.v) && Ut(E) && E.v >= $.low && E.v <= $.high, ne = (E) => Number.isFinite(E.v) && Ut(E) && E.v < $.low, Qt = (E) => Number.isFinite(E.v) && Ut(E) && E.v > $.high, T = (E, mt) => An().defined(E).x((et) => St(et.t / r.stepMs)).y((et) => yt(et.v)).curve(Sr), D = T(It, u("--cgm-in-range", "#1a9850")), z = T(ne, u("--cgm-low-strong", "#d73027")), H = T(Qt, u("--cgm-high", "#fdae61"));
      kt || I.forEach((E) => {
        if (E.length > 1) {
          const mt = An().defined((et) => Number.isFinite(et.v) && !Ut(et)).x((et) => St(et.t / r.stepMs)).y((et) => yt(et.v)).curve(Sr);
          ft.append("path").attr("d", mt(E)).attr("stroke", u("--cgm-context", "#c7c7c7")).attr("fill", "none").attr("stroke-width", 1.2).attr("opacity", 0.8), ft.append("path").attr("d", z(E)).attr("stroke", "#d73027").attr("fill", "none").attr("stroke-width", 1.5), ft.append("path").attr("d", H(E)).attr("stroke", "#fdae61").attr("fill", "none").attr("stroke-width", 1.5), ft.append("path").attr("d", D(E)).attr("stroke", "#1a9850").attr("fill", "none").attr("stroke-width", 1.5);
        }
      });
      const W = new Date(Z), tt = W.getDate(), q = [
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
      ], ut = String(tt), bt = `${tt}${at(tt)} ${q[W.getMonth()]} ${W.getFullYear()}`;
      kt || (ft.append("text").attr("class", "date-label date-brief").attr("x", 0).attr("y", -8).attr("fill", "#777").attr("font-size", 10).attr("text-anchor", "start").text(ut), ft.append("text").attr("class", "date-label date-full").attr("x", 0).attr("y", -8).attr("fill", "#777").attr("font-size", 10).attr("text-anchor", "start").text(bt), dt < b - 1 && ft.append("text").attr("x", S / 2).attr("y", B - 2).attr("text-anchor", "middle").attr("fill", u("--cgm-axis-color", "#777")).attr("font-size", 10).text("12pm")), kt || ft.append("rect").attr("x", -12).attr("y", -10).attr("width", S + 12).attr("height", B).attr("fill", "rgba(0,0,0,0.001)").style("pointer-events", "all").on("mouseenter", () => {
        ft.classed("hover", !0);
      }).on("mouseleave", () => {
        ft.classed("hover", !1);
      });
    });
  }
  yn(() => {
    p(), w(), window.addEventListener("resize", w);
  });
  function y(m) {
    Ue[m ? "unshift" : "push"](() => {
      l = m, n(0, l);
    });
  }
  return t.$$set = (m) => {
    "data" in m && n(1, r = m.data), "range" in m && n(2, i = m.range), "preset" in m && n(3, o = m.preset), "colorWholeWeek" in m && n(4, a = m.colorWholeWeek);
  }, t.$$.update = () => {
    t.$$.dirty & /*data, range, preset*/
    14 && r && i && o && w(), t.$$.dirty & /*svg*/
    1 && l && w();
  }, [l, r, i, o, a, y];
}
class ch extends nn {
  constructor(e) {
    super(), en(this, e, uh, sh, tn, {
      data: 1,
      range: 2,
      preset: 3,
      colorWholeWeek: 4
    });
  }
}
function qi(t) {
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
      e = ht("text"), r = O(n), o = ht("text"), l = O(a), s = ht("text"), f = O(h), c(e, "x", "35"), c(e, "y", i = 30 + /*yAxisPositions*/
      t[11].low), c(e, "font-family", "Arial, sans-serif"), c(e, "font-size", "10"), c(e, "fill", "var(--cgm-axis-color, #666)"), c(e, "text-anchor", "end"), c(o, "x", "35"), c(o, "y", u = 30 + /*yAxisPositions*/
      t[11].high), c(o, "font-family", "Arial, sans-serif"), c(o, "font-size", "10"), c(o, "fill", "var(--cgm-axis-color, #666)"), c(o, "text-anchor", "end"), c(s, "x", "35"), c(s, "y", g = 30 + /*yAxisPositions*/
      t[11].vhigh), c(s, "font-family", "Arial, sans-serif"), c(s, "font-size", "10"), c(s, "fill", "var(--cgm-axis-color, #666)"), c(s, "text-anchor", "end");
    },
    m(p, w) {
      Et(p, e, w), d(e, r), Et(p, o, w), d(o, l), Et(p, s, w), d(s, f);
    },
    p(p, w) {
      w[0] & /*currentThresholds*/
      64 && n !== (n = /*isMmol*/
      (p[15]() ? (
        /*currentThresholds*/
        p[6].low.toFixed(1)
      ) : (
        /*currentThresholds*/
        p[6].low
      )) + "") && Wt(r, n), w[0] & /*yAxisPositions*/
      2048 && i !== (i = 30 + /*yAxisPositions*/
      p[11].low) && c(e, "y", i), w[0] & /*currentThresholds*/
      64 && a !== (a = /*isMmol*/
      (p[15]() ? (
        /*currentThresholds*/
        p[6].high.toFixed(1)
      ) : (
        /*currentThresholds*/
        p[6].high
      )) + "") && Wt(l, a), w[0] & /*yAxisPositions*/
      2048 && u !== (u = 30 + /*yAxisPositions*/
      p[11].high) && c(o, "y", u), w[0] & /*currentThresholds*/
      64 && h !== (h = /*isMmol*/
      (p[15]() ? (
        /*currentThresholds*/
        p[6].veryHigh.toFixed(1)
      ) : (
        /*currentThresholds*/
        p[6].veryHigh
      )) + "") && Wt(f, h), w[0] & /*yAxisPositions*/
      2048 && g !== (g = 30 + /*yAxisPositions*/
      p[11].vhigh) && c(s, "y", g);
    },
    d(p) {
      p && (Lt(e), Lt(o), Lt(s));
    }
  };
}
function Vi(t) {
  let e, n, r;
  return {
    c() {
      e = ht("line"), c(e, "x1", "90"), c(e, "y1", n = 30 + /*linePositions*/
      t[3].high), c(e, "x2", ke), c(e, "y2", r = /*textPositions*/
      t[10].high - 40), c(e, "stroke", "#ccc"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Et(i, e, o);
    },
    p(i, o) {
      o[0] & /*linePositions*/
      8 && n !== (n = 30 + /*linePositions*/
      i[3].high) && c(e, "y1", n), o[0] & /*textPositions*/
      1024 && r !== (r = /*textPositions*/
      i[10].high - 40) && c(e, "y2", r);
    },
    d(i) {
      i && Lt(e);
    }
  };
}
function Bi(t) {
  let e, n, r;
  return {
    c() {
      e = ht("line"), c(e, "x1", "90"), c(e, "y1", n = 30 + /*linePositions*/
      t[3].targ), c(e, "x2", ke), c(e, "y2", r = /*textPositions*/
      t[10].targ - 40), c(e, "stroke", "#ccc"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Et(i, e, o);
    },
    p(i, o) {
      o[0] & /*linePositions*/
      8 && n !== (n = 30 + /*linePositions*/
      i[3].targ) && c(e, "y1", n), o[0] & /*textPositions*/
      1024 && r !== (r = /*textPositions*/
      i[10].targ - 40) && c(e, "y2", r);
    },
    d(i) {
      i && Lt(e);
    }
  };
}
function Xi(t) {
  let e, n, r;
  return {
    c() {
      e = ht("line"), c(e, "x1", "90"), c(e, "y1", n = 30 + /*linePositions*/
      t[3].low), c(e, "x2", ke), c(e, "y2", r = /*textPositions*/
      t[10].low - 40), c(e, "stroke", "#ccc"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Et(i, e, o);
    },
    p(i, o) {
      o[0] & /*linePositions*/
      8 && n !== (n = 30 + /*linePositions*/
      i[3].low) && c(e, "y1", n), o[0] & /*textPositions*/
      1024 && r !== (r = /*textPositions*/
      i[10].low - 40) && c(e, "y2", r);
    },
    d(i) {
      i && Lt(e);
    }
  };
}
function Gi(t) {
  let e, n, r;
  return {
    c() {
      e = ht("rect"), c(e, "x", "40"), c(e, "y", n = 30 + /*barPositions*/
      t[4].vlow), c(e, "width", "50"), c(e, "height", r = /*barHeights*/
      t[5].vlow), c(
        e,
        "fill",
        /*cssVar*/
        t[14]("--cgm-very-low", "#e57373")
      );
    },
    m(i, o) {
      Et(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].vlow) && c(e, "y", n), o[0] & /*barHeights*/
      32 && r !== (r = /*barHeights*/
      i[5].vlow) && c(e, "height", r);
    },
    d(i) {
      i && Lt(e);
    }
  };
}
function Oi(t) {
  let e, n, r;
  return {
    c() {
      e = ht("rect"), c(e, "x", "40"), c(e, "y", n = 30 + /*barPositions*/
      t[4].low), c(e, "width", "50"), c(e, "height", r = /*barHeights*/
      t[5].low), c(
        e,
        "fill",
        /*cssVar*/
        t[14]("--cgm-low", "#ff9e80")
      );
    },
    m(i, o) {
      Et(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].low) && c(e, "y", n), o[0] & /*barHeights*/
      32 && r !== (r = /*barHeights*/
      i[5].low) && c(e, "height", r);
    },
    d(i) {
      i && Lt(e);
    }
  };
}
function Ki(t) {
  let e, n, r;
  return {
    c() {
      e = ht("rect"), c(e, "x", "40"), c(e, "y", n = 30 + /*barPositions*/
      t[4].targ), c(e, "width", "50"), c(e, "height", r = /*barHeights*/
      t[5].targ), c(
        e,
        "fill",
        /*cssVar*/
        t[14]("--cgm-in-range", "#86c89d")
      );
    },
    m(i, o) {
      Et(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].targ) && c(e, "y", n), o[0] & /*barHeights*/
      32 && r !== (r = /*barHeights*/
      i[5].targ) && c(e, "height", r);
    },
    d(i) {
      i && Lt(e);
    }
  };
}
function Zi(t) {
  let e, n, r;
  return {
    c() {
      e = ht("rect"), c(e, "x", "40"), c(e, "y", n = 30 + /*barPositions*/
      t[4].high), c(e, "width", "50"), c(e, "height", r = /*barHeights*/
      t[5].high), c(
        e,
        "fill",
        /*cssVar*/
        t[14]("--cgm-high", "#ffcc80")
      );
    },
    m(i, o) {
      Et(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].high) && c(e, "y", n), o[0] & /*barHeights*/
      32 && r !== (r = /*barHeights*/
      i[5].high) && c(e, "height", r);
    },
    d(i) {
      i && Lt(e);
    }
  };
}
function Qi(t) {
  let e, n, r;
  return {
    c() {
      e = ht("rect"), c(e, "x", "40"), c(e, "y", n = 30 + /*barPositions*/
      t[4].vhigh), c(e, "width", "50"), c(e, "height", r = /*barHeights*/
      t[5].vhigh), c(
        e,
        "fill",
        /*cssVar*/
        t[14]("--cgm-very-high", "#ff8a65")
      );
    },
    m(i, o) {
      Et(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].vhigh) && c(e, "y", n), o[0] & /*barHeights*/
      32 && r !== (r = /*barHeights*/
      i[5].vhigh) && c(e, "height", r);
    },
    d(i) {
      i && Lt(e);
    }
  };
}
function Ji(t) {
  let e, n, r, i, o = (
    /*barHeights*/
    t[5].vlow > 2 && /*barHeights*/
    t[5].low > 2 && ji(t)
  ), a = (
    /*barHeights*/
    t[5].low > 2 && /*barHeights*/
    t[5].targ > 2 && $i(t)
  ), l = (
    /*barHeights*/
    t[5].targ > 2 && /*barHeights*/
    t[5].high > 2 && to(t)
  ), u = (
    /*barHeights*/
    t[5].high > 2 && /*barHeights*/
    t[5].vhigh > 2 && eo(t)
  );
  return {
    c() {
      o && o.c(), e = Ae(), a && a.c(), n = Ae(), l && l.c(), r = Ae(), u && u.c(), i = Ae();
    },
    m(s, h) {
      o && o.m(s, h), Et(s, e, h), a && a.m(s, h), Et(s, n, h), l && l.m(s, h), Et(s, r, h), u && u.m(s, h), Et(s, i, h);
    },
    p(s, h) {
      /*barHeights*/
      s[5].vlow > 2 && /*barHeights*/
      s[5].low > 2 ? o ? o.p(s, h) : (o = ji(s), o.c(), o.m(e.parentNode, e)) : o && (o.d(1), o = null), /*barHeights*/
      s[5].low > 2 && /*barHeights*/
      s[5].targ > 2 ? a ? a.p(s, h) : (a = $i(s), a.c(), a.m(n.parentNode, n)) : a && (a.d(1), a = null), /*barHeights*/
      s[5].targ > 2 && /*barHeights*/
      s[5].high > 2 ? l ? l.p(s, h) : (l = to(s), l.c(), l.m(r.parentNode, r)) : l && (l.d(1), l = null), /*barHeights*/
      s[5].high > 2 && /*barHeights*/
      s[5].vhigh > 2 ? u ? u.p(s, h) : (u = eo(s), u.c(), u.m(i.parentNode, i)) : u && (u.d(1), u = null);
    },
    d(s) {
      s && (Lt(e), Lt(n), Lt(r), Lt(i)), o && o.d(s), a && a.d(s), l && l.d(s), u && u.d(s);
    }
  };
}
function ji(t) {
  let e, n, r;
  return {
    c() {
      e = ht("line"), c(e, "x1", "40"), c(e, "x2", "90"), c(e, "y1", n = 30 + /*barPositions*/
      t[4].vlow), c(e, "y2", r = 30 + /*barPositions*/
      t[4].vlow), c(e, "stroke", "#fff"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Et(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].vlow) && c(e, "y1", n), o[0] & /*barPositions*/
      16 && r !== (r = 30 + /*barPositions*/
      i[4].vlow) && c(e, "y2", r);
    },
    d(i) {
      i && Lt(e);
    }
  };
}
function $i(t) {
  let e, n, r;
  return {
    c() {
      e = ht("line"), c(e, "x1", "40"), c(e, "x2", "90"), c(e, "y1", n = 30 + /*barPositions*/
      t[4].low), c(e, "y2", r = 30 + /*barPositions*/
      t[4].low), c(e, "stroke", "#fff"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Et(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].low) && c(e, "y1", n), o[0] & /*barPositions*/
      16 && r !== (r = 30 + /*barPositions*/
      i[4].low) && c(e, "y2", r);
    },
    d(i) {
      i && Lt(e);
    }
  };
}
function to(t) {
  let e, n, r;
  return {
    c() {
      e = ht("line"), c(e, "x1", "40"), c(e, "x2", "90"), c(e, "y1", n = 30 + /*barPositions*/
      t[4].targ), c(e, "y2", r = 30 + /*barPositions*/
      t[4].targ), c(e, "stroke", "#fff"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Et(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].targ) && c(e, "y1", n), o[0] & /*barPositions*/
      16 && r !== (r = 30 + /*barPositions*/
      i[4].targ) && c(e, "y2", r);
    },
    d(i) {
      i && Lt(e);
    }
  };
}
function eo(t) {
  let e, n, r;
  return {
    c() {
      e = ht("line"), c(e, "x1", "40"), c(e, "x2", "90"), c(e, "y1", n = 30 + /*barPositions*/
      t[4].high), c(e, "y2", r = 30 + /*barPositions*/
      t[4].high), c(e, "stroke", "#fff"), c(e, "stroke-width", "1");
    },
    m(i, o) {
      Et(i, e, o);
    },
    p(i, o) {
      o[0] & /*barPositions*/
      16 && n !== (n = 30 + /*barPositions*/
      i[4].high) && c(e, "y1", n), o[0] & /*barPositions*/
      16 && r !== (r = 30 + /*barPositions*/
      i[4].high) && c(e, "y2", r);
    },
    d(i) {
      i && Lt(e);
    }
  };
}
function fh(t) {
  let e, n, r, i, o, a, l, u, s, h, f, g, p, w, y, m, R, M, L, V, A = (
    /*getRangeText*/
    t[12]("vhigh") + ""
  ), F, S, B, K, pt = Math.round(
    /*pct*/
    t[1].vhigh
  ) + "", X, k, x, _, Y = (
    /*displayTime*/
    t[13] ? `(${Re(
      /*minutes*/
      t[9].vhigh
    )})` : `Goal ${/*goalPct*/
    t[17]("veryHigh")}`
  ), P, Tt, wt, Mt, st, Ft, ot, b, it, ct = (
    /*getRangeText*/
    t[12]("high") + ""
  ), $, Dt, gt, N, at = Math.round(
    /*pct*/
    t[1].high
  ) + "", Z, C, dt, v, vt = (
    /*displayTime*/
    t[13] ? `(${Re(
      /*minutes*/
      t[9].high
    )})` : `Goal ${/*goalPct*/
    t[17]("high")}`
  ), Ct, ft, St, yt, kt, lt, U, I, Q, G = (
    /*getRangeText*/
    t[12]("targ") + ""
  ), j, Ut, Rt, Vt, It = Math.round(
    /*pct*/
    t[1].targ
  ) + "", ne, Qt, T, D, z = (
    /*displayTime*/
    t[13] ? `(${Re(
      /*minutes*/
      t[9].targ
    )})` : `Goal ${/*goalPct*/
    t[17]("inRange")}`
  ), H, W, tt, q, ut, bt, E, mt, et, Bt = (
    /*getRangeText*/
    t[12]("low") + ""
  ), Zt, $t, Xt, Yt, Ot = Math.round(
    /*pct*/
    t[1].low
  ) + "", Ht, Gt, At, Nt, xt = (
    /*displayTime*/
    t[13] ? `(${Re(
      /*minutes*/
      t[9].low
    )})` : `Goal ${/*goalPct*/
    t[17]("low")}`
  ), Jt, Kt, te, Pt, re, jt, ce, ue, se, Ge = (
    /*getRangeText*/
    t[12]("vlow") + ""
  ), Pn, zn, Ce, Ie, Ve = Math.round(
    /*pct*/
    t[1].vlow
  ) + "", dr, ni, ri, wn, In = (
    /*displayTime*/
    t[13] ? `(${Re(
      /*minutes*/
      t[9].vlow
    )})` : `Goal ${/*goalPct*/
    t[17]("veryLow")}`
  ), mr, Wn, pr, ii, fe = (
    /*present*/
    t[8] > 0 && qi(t)
  ), he = (
    /*pct*/
    t[1].high > 0 && Vi(t)
  ), ge = (
    /*pct*/
    t[1].targ > 0 && Bi(t)
  ), de = (
    /*pct*/
    t[1].low > 0 && Xi(t)
  ), me = (
    /*barHeights*/
    t[5].vlow > 0 && Gi(t)
  ), pe = (
    /*barHeights*/
    t[5].low > 0 && Oi(t)
  ), ye = (
    /*barHeights*/
    t[5].targ > 0 && Ki(t)
  ), we = (
    /*barHeights*/
    t[5].high > 0 && Zi(t)
  ), ve = (
    /*barHeights*/
    t[5].vhigh > 0 && Qi(t)
  ), _e = (
    /*showSeparators*/
    t[0] && Ji(t)
  );
  return {
    c() {
      e = nt("div"), n = ht("svg"), fe && fe.c(), r = ht("path"), he && he.c(), o = Ae(), ge && ge.c(), a = Ae(), de && de.c(), l = ht("path"), s = ht("rect"), me && me.c(), h = Ae(), pe && pe.c(), f = Ae(), ye && ye.c(), g = Ae(), we && we.c(), p = Ae(), ve && ve.c(), w = Ae(), _e && _e.c(), y = ht("g"), m = ht("text"), R = ht("tspan"), M = O("Very High"), L = _t(), V = ht("tspan"), F = O(A), S = _t(), B = ht("text"), K = ht("tspan"), X = O(pt), k = O("%"), x = _t(), _ = ht("tspan"), P = O(Y), Tt = _t(), Mt = ht("g"), st = ht("text"), Ft = ht("tspan"), ot = O("High"), b = _t(), it = ht("tspan"), $ = O(ct), Dt = _t(), gt = ht("text"), N = ht("tspan"), Z = O(at), C = O("%"), dt = _t(), v = ht("tspan"), Ct = O(vt), ft = _t(), yt = ht("g"), kt = ht("text"), lt = ht("tspan"), U = O("Target"), I = _t(), Q = ht("tspan"), j = O(G), Ut = _t(), Rt = ht("text"), Vt = ht("tspan"), ne = O(It), Qt = O("%"), T = _t(), D = ht("tspan"), H = O(z), W = _t(), q = ht("g"), ut = ht("text"), bt = ht("tspan"), E = O("Low"), mt = _t(), et = ht("tspan"), Zt = O(Bt), $t = _t(), Xt = ht("text"), Yt = ht("tspan"), Ht = O(Ot), Gt = O("%"), At = _t(), Nt = ht("tspan"), Jt = O(xt), Kt = _t(), Pt = ht("g"), re = ht("text"), jt = ht("tspan"), ce = O("Very Low"), ue = _t(), se = ht("tspan"), Pn = O(Ge), zn = _t(), Ce = ht("text"), Ie = ht("tspan"), dr = O(Ve), ni = O("%"), ri = _t(), wn = ht("tspan"), mr = O(In), c(r, "d", i = "M 40 " + (30 + /*linePositions*/
      t[3].vhigh) + " L 65 " + (30 + /*linePositions*/
      t[3].vhigh) + " L 65 25 Q 65 15 70 15 L " + ke + " 15"), c(r, "stroke", "#ccc"), c(r, "stroke-width", "1"), c(r, "fill", "none"), c(l, "d", u = "M 40 " + (30 + /*linePositions*/
      t[3].vlow) + " L 65 " + (30 + /*linePositions*/
      t[3].vlow) + " L 65 225 Q 65 230 70 230 L " + ke + " 230"), c(l, "stroke", "#ccc"), c(l, "stroke-width", "1"), c(l, "fill", "none"), c(s, "x", "40"), c(s, "y", "30"), c(s, "width", "50"), c(s, "height", "180"), c(s, "fill", "white"), c(s, "stroke", "#ccc"), c(s, "stroke-width", "1"), c(R, "font-size", "12"), c(R, "font-weight", "bold"), c(R, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(V, "font-size", "10"), c(V, "fill", "var(--cgm-muted, #777)"), c(m, "x", "103"), c(m, "y", "0"), c(m, "font-family", "Arial, sans-serif"), c(K, "font-size", "12"), c(K, "font-weight", "bold"), c(K, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(_, "font-size", "10"), c(_, "fill", "var(--cgm-muted, #777)"), c(B, "x", ke), c(B, "y", "0"), c(B, "font-family", "Arial, sans-serif"), c(B, "text-anchor", "end"), c(y, "transform", wt = "translate(0, " + /*textPositions*/
      (t[10].vhigh - 40) + ")"), c(Ft, "font-size", "12"), c(Ft, "font-weight", "bold"), c(Ft, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(it, "font-size", "10"), c(it, "fill", "var(--cgm-muted, #777)"), c(st, "x", "103"), c(st, "y", "0"), c(st, "font-family", "Arial, sans-serif"), c(N, "font-size", "12"), c(N, "font-weight", "bold"), c(N, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(v, "font-size", "10"), c(v, "fill", "var(--cgm-muted, #777)"), c(gt, "x", ke), c(gt, "y", "0"), c(gt, "font-family", "Arial, sans-serif"), c(gt, "text-anchor", "end"), c(Mt, "transform", St = "translate(0, " + /*textPositions*/
      (t[10].high - 40) + ")"), c(lt, "font-size", "12"), c(lt, "font-weight", "bold"), c(lt, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(Q, "font-size", "10"), c(Q, "fill", "var(--cgm-muted, #777)"), c(kt, "x", "103"), c(kt, "y", "0"), c(kt, "font-family", "Arial, sans-serif"), c(Vt, "font-size", "12"), c(Vt, "font-weight", "bold"), c(Vt, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(D, "font-size", "10"), c(D, "fill", "var(--cgm-muted, #777)"), c(Rt, "x", ke), c(Rt, "y", "0"), c(Rt, "font-family", "Arial, sans-serif"), c(Rt, "text-anchor", "end"), c(yt, "transform", tt = "translate(0, " + /*textPositions*/
      (t[10].targ - 40) + ")"), c(bt, "font-size", "12"), c(bt, "font-weight", "bold"), c(bt, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(et, "font-size", "10"), c(et, "fill", "var(--cgm-muted, #777)"), c(ut, "x", "103"), c(ut, "y", "0"), c(ut, "font-family", "Arial, sans-serif"), c(Yt, "font-size", "12"), c(Yt, "font-weight", "bold"), c(Yt, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(Nt, "font-size", "10"), c(Nt, "fill", "var(--cgm-muted, #777)"), c(Xt, "x", ke), c(Xt, "y", "0"), c(Xt, "font-family", "Arial, sans-serif"), c(Xt, "text-anchor", "end"), c(q, "transform", te = "translate(0, " + /*textPositions*/
      (t[10].low - 40) + ")"), c(jt, "font-size", "12"), c(jt, "font-weight", "bold"), c(jt, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(se, "font-size", "10"), c(se, "fill", "var(--cgm-muted, #777)"), c(re, "x", "103"), c(re, "y", "0"), c(re, "font-family", "Arial, sans-serif"), c(Ie, "font-size", "12"), c(Ie, "font-weight", "bold"), c(Ie, "fill", "var(--cgm-title, var(--cgm-text, #333))"), c(wn, "font-size", "10"), c(wn, "fill", "var(--cgm-muted, #777)"), c(Ce, "x", "340"), c(Ce, "y", "0"), c(Ce, "font-family", "Arial, sans-serif"), c(Ce, "text-anchor", "end"), c(Pt, "transform", Wn = "translate(0, " + /*textPositions*/
      (t[10].vlow - 40) + ")"), c(
        n,
        "width",
        /*svgWidth*/
        t[16]
      ), c(n, "height", no), c(n, "viewBox", "0 0 " + /*svgWidth*/
      t[16] + " " + no), c(n, "class", "svelte-1d3n1f2"), c(e, "class", "widget-container svelte-1d3n1f2"), c(e, "role", "img"), c(e, "aria-label", "TIR detailed");
    },
    m(rt, zt) {
      Et(rt, e, zt), d(e, n), fe && fe.m(n, null), d(n, r), he && he.m(n, null), d(n, o), ge && ge.m(n, null), d(n, a), de && de.m(n, null), d(n, l), d(n, s), me && me.m(n, null), d(n, h), pe && pe.m(n, null), d(n, f), ye && ye.m(n, null), d(n, g), we && we.m(n, null), d(n, p), ve && ve.m(n, null), d(n, w), _e && _e.m(n, null), d(n, y), d(y, m), d(m, R), d(R, M), d(m, L), d(m, V), d(V, F), d(m, S), d(y, B), d(B, K), d(K, X), d(K, k), d(B, x), d(B, _), d(_, P), d(B, Tt), d(n, Mt), d(Mt, st), d(st, Ft), d(Ft, ot), d(st, b), d(st, it), d(it, $), d(st, Dt), d(Mt, gt), d(gt, N), d(N, Z), d(N, C), d(gt, dt), d(gt, v), d(v, Ct), d(gt, ft), d(n, yt), d(yt, kt), d(kt, lt), d(lt, U), d(kt, I), d(kt, Q), d(Q, j), d(kt, Ut), d(yt, Rt), d(Rt, Vt), d(Vt, ne), d(Vt, Qt), d(Rt, T), d(Rt, D), d(D, H), d(Rt, W), d(n, q), d(q, ut), d(ut, bt), d(bt, E), d(ut, mt), d(ut, et), d(et, Zt), d(ut, $t), d(q, Xt), d(Xt, Yt), d(Yt, Ht), d(Yt, Gt), d(Xt, At), d(Xt, Nt), d(Nt, Jt), d(Xt, Kt), d(n, Pt), d(Pt, re), d(re, jt), d(jt, ce), d(re, ue), d(re, se), d(se, Pn), d(re, zn), d(Pt, Ce), d(Ce, Ie), d(Ie, dr), d(Ie, ni), d(Ce, ri), d(Ce, wn), d(wn, mr), t[24](n), pr || (ii = [
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
      ], pr = !0);
    },
    p(rt, zt) {
      /*present*/
      rt[8] > 0 ? fe ? fe.p(rt, zt) : (fe = qi(rt), fe.c(), fe.m(n, r)) : fe && (fe.d(1), fe = null), zt[0] & /*linePositions*/
      8 && i !== (i = "M 40 " + (30 + /*linePositions*/
      rt[3].vhigh) + " L 65 " + (30 + /*linePositions*/
      rt[3].vhigh) + " L 65 25 Q 65 15 70 15 L " + ke + " 15") && c(r, "d", i), /*pct*/
      rt[1].high > 0 ? he ? he.p(rt, zt) : (he = Vi(rt), he.c(), he.m(n, o)) : he && (he.d(1), he = null), /*pct*/
      rt[1].targ > 0 ? ge ? ge.p(rt, zt) : (ge = Bi(rt), ge.c(), ge.m(n, a)) : ge && (ge.d(1), ge = null), /*pct*/
      rt[1].low > 0 ? de ? de.p(rt, zt) : (de = Xi(rt), de.c(), de.m(n, l)) : de && (de.d(1), de = null), zt[0] & /*linePositions*/
      8 && u !== (u = "M 40 " + (30 + /*linePositions*/
      rt[3].vlow) + " L 65 " + (30 + /*linePositions*/
      rt[3].vlow) + " L 65 225 Q 65 230 70 230 L " + ke + " 230") && c(l, "d", u), /*barHeights*/
      rt[5].vlow > 0 ? me ? me.p(rt, zt) : (me = Gi(rt), me.c(), me.m(n, h)) : me && (me.d(1), me = null), /*barHeights*/
      rt[5].low > 0 ? pe ? pe.p(rt, zt) : (pe = Oi(rt), pe.c(), pe.m(n, f)) : pe && (pe.d(1), pe = null), /*barHeights*/
      rt[5].targ > 0 ? ye ? ye.p(rt, zt) : (ye = Ki(rt), ye.c(), ye.m(n, g)) : ye && (ye.d(1), ye = null), /*barHeights*/
      rt[5].high > 0 ? we ? we.p(rt, zt) : (we = Zi(rt), we.c(), we.m(n, p)) : we && (we.d(1), we = null), /*barHeights*/
      rt[5].vhigh > 0 ? ve ? ve.p(rt, zt) : (ve = Qi(rt), ve.c(), ve.m(n, w)) : ve && (ve.d(1), ve = null), /*showSeparators*/
      rt[0] ? _e ? _e.p(rt, zt) : (_e = Ji(rt), _e.c(), _e.m(n, y)) : _e && (_e.d(1), _e = null), zt[0] & /*getRangeText*/
      4096 && A !== (A = /*getRangeText*/
      rt[12]("vhigh") + "") && Wt(F, A), zt[0] & /*pct*/
      2 && pt !== (pt = Math.round(
        /*pct*/
        rt[1].vhigh
      ) + "") && Wt(X, pt), zt[0] & /*displayTime, minutes*/
      8704 && Y !== (Y = /*displayTime*/
      rt[13] ? `(${Re(
        /*minutes*/
        rt[9].vhigh
      )})` : `Goal ${/*goalPct*/
      rt[17]("veryHigh")}`) && Wt(P, Y), zt[0] & /*textPositions*/
      1024 && wt !== (wt = "translate(0, " + /*textPositions*/
      (rt[10].vhigh - 40) + ")") && c(y, "transform", wt), zt[0] & /*getRangeText*/
      4096 && ct !== (ct = /*getRangeText*/
      rt[12]("high") + "") && Wt($, ct), zt[0] & /*pct*/
      2 && at !== (at = Math.round(
        /*pct*/
        rt[1].high
      ) + "") && Wt(Z, at), zt[0] & /*displayTime, minutes*/
      8704 && vt !== (vt = /*displayTime*/
      rt[13] ? `(${Re(
        /*minutes*/
        rt[9].high
      )})` : `Goal ${/*goalPct*/
      rt[17]("high")}`) && Wt(Ct, vt), zt[0] & /*textPositions*/
      1024 && St !== (St = "translate(0, " + /*textPositions*/
      (rt[10].high - 40) + ")") && c(Mt, "transform", St), zt[0] & /*getRangeText*/
      4096 && G !== (G = /*getRangeText*/
      rt[12]("targ") + "") && Wt(j, G), zt[0] & /*pct*/
      2 && It !== (It = Math.round(
        /*pct*/
        rt[1].targ
      ) + "") && Wt(ne, It), zt[0] & /*displayTime, minutes*/
      8704 && z !== (z = /*displayTime*/
      rt[13] ? `(${Re(
        /*minutes*/
        rt[9].targ
      )})` : `Goal ${/*goalPct*/
      rt[17]("inRange")}`) && Wt(H, z), zt[0] & /*textPositions*/
      1024 && tt !== (tt = "translate(0, " + /*textPositions*/
      (rt[10].targ - 40) + ")") && c(yt, "transform", tt), zt[0] & /*getRangeText*/
      4096 && Bt !== (Bt = /*getRangeText*/
      rt[12]("low") + "") && Wt(Zt, Bt), zt[0] & /*pct*/
      2 && Ot !== (Ot = Math.round(
        /*pct*/
        rt[1].low
      ) + "") && Wt(Ht, Ot), zt[0] & /*displayTime, minutes*/
      8704 && xt !== (xt = /*displayTime*/
      rt[13] ? `(${Re(
        /*minutes*/
        rt[9].low
      )})` : `Goal ${/*goalPct*/
      rt[17]("low")}`) && Wt(Jt, xt), zt[0] & /*textPositions*/
      1024 && te !== (te = "translate(0, " + /*textPositions*/
      (rt[10].low - 40) + ")") && c(q, "transform", te), zt[0] & /*getRangeText*/
      4096 && Ge !== (Ge = /*getRangeText*/
      rt[12]("vlow") + "") && Wt(Pn, Ge), zt[0] & /*pct*/
      2 && Ve !== (Ve = Math.round(
        /*pct*/
        rt[1].vlow
      ) + "") && Wt(dr, Ve), zt[0] & /*displayTime, minutes*/
      8704 && In !== (In = /*displayTime*/
      rt[13] ? `(${Re(
        /*minutes*/
        rt[9].vlow
      )})` : `Goal ${/*goalPct*/
      rt[17]("veryLow")}`) && Wt(mr, In), zt[0] & /*textPositions*/
      1024 && Wn !== (Wn = "translate(0, " + /*textPositions*/
      (rt[10].vlow - 40) + ")") && c(Pt, "transform", Wn);
    },
    i: ie,
    o: ie,
    d(rt) {
      rt && Lt(e), fe && fe.d(), he && he.d(), ge && ge.d(), de && de.d(), me && me.d(), pe && pe.d(), ye && ye.d(), we && we.d(), ve && ve.d(), _e && _e.d(), t[24](null), pr = !1, Xe(ii);
    }
  };
}
const Ee = 180, no = 240, ke = 340;
function Re(t) {
  const e = Math.floor(t / 60), n = Math.round(t % 60);
  return e === 0 ? `${n}min` : `${e}h${n.toString().padStart(2, "0")}min`;
}
function hh(t, e, n) {
  let r, i, o, a, l, u, s, h;
  const f = cr();
  let g;
  function p(ot, b) {
    try {
      return (getComputedStyle(g).getPropertyValue(ot) || "").trim() || b;
    } catch {
      return b;
    }
  }
  let { data: w } = e, { range: y = null } = e, { preset: m = "general" } = e, { showSeparators: R = !1 } = e, M, L;
  const V = () => /mmol/i.test((w == null ? void 0 : w.units) || "mmol"), A = () => V() ? "mmol" : "mg", F = () => V() ? "mmol/L" : "mg/dL", S = He, B = () => S[m].thresholds[A()];
  let K = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  }, pt = 0, X = 0, k = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  }, x = !1, { showTime: _ = !1 } = e;
  function Y() {
    if (!w) return;
    const ot = new Date(w.t0).getTime();
    n(22, M = Float64Array.from({ length: w.glucose.length }, (b, it) => ot + it * w.stepMs)), n(23, L = Float64Array.from(w.glucose));
  }
  function P() {
    try {
      f("stats", {
        pct: K,
        present: pt,
        expected: X,
        preset: m,
        units: (w == null ? void 0 : w.units) || "mmol/L"
      });
    } catch {
    }
  }
  const Tt = ke + 10;
  function wt(ot) {
    return He[m].percentGoals[ot];
  }
  function Mt(ot) {
    Ue[ot ? "unshift" : "push"](() => {
      g = ot, n(7, g);
    });
  }
  const st = () => n(2, x = !0), Ft = () => n(2, x = !1);
  return t.$$set = (ot) => {
    "data" in ot && n(18, w = ot.data), "range" in ot && n(19, y = ot.range), "preset" in ot && n(20, m = ot.preset), "showSeparators" in ot && n(0, R = ot.showSeparators), "showTime" in ot && n(21, _ = ot.showTime);
  }, t.$$.update = () => {
    if (t.$$.dirty[0] & /*preset, data*/
    1310720 && n(6, r = B()), t.$$.dirty[0] & /*hoverAll, showTime*/
    2097156 && n(13, i = x || _), t.$$.dirty[0] & /*data*/
    262144 && w && Y(), t.$$.dirty[0] & /*data, range, time, values, preset*/
    14417920 && w && y && M && L && m) {
      const { start: ot, end: b } = y, it = Math.max(0, Math.ceil((ot - M[0]) / w.stepMs)), ct = Math.min(L.length - 1, Math.floor((b - M[0]) / w.stepMs));
      if (ct < it)
        n(1, K = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }), n(8, pt = 0), X = 0, n(9, k = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        });
      else {
        const $ = B();
        let Dt = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, gt = 0;
        for (let N = it; N <= ct; N++) {
          const at = L[N];
          Number.isFinite(at) && at >= 0 && (gt++, at < $.veryLow ? Dt.vlow++ : at < $.low ? Dt.low++ : at <= $.high ? Dt.targ++ : at <= $.veryHigh ? Dt.high++ : Dt.vhigh++);
        }
        if (n(8, pt = gt), X = Math.max(1, ct - it + 1), gt === 0)
          n(1, K = {
            vlow: 0,
            low: 0,
            targ: 0,
            high: 0,
            vhigh: 0
          }), n(9, k = {
            vlow: 0,
            low: 0,
            targ: 0,
            high: 0,
            vhigh: 0
          });
        else {
          n(1, K = {
            vlow: Dt.vlow / gt * 100,
            low: Dt.low / gt * 100,
            targ: Dt.targ / gt * 100,
            high: Dt.high / gt * 100,
            vhigh: Dt.vhigh / gt * 100
          });
          const N = 24 * 60;
          n(9, k = {
            vlow: Dt.vlow / gt * N,
            low: Dt.low / gt * N,
            targ: Dt.targ / gt * N,
            high: Dt.high / gt * N,
            vhigh: Dt.vhigh / gt * N
          });
        }
      }
      P();
    }
    t.$$.dirty[0] & /*currentThresholds*/
    64 && n(12, o = (ot) => {
      const b = r;
      return ot === "vhigh" ? `>${b.veryHigh} ${F()}` : ot === "high" ? `${b.high}-${b.veryHigh} ${F()}` : ot === "targ" ? `${b.low}-${b.high} ${F()}` : ot === "low" ? `${b.veryLow}-${b.low} ${F()}` : ot === "vlow" ? `<${b.veryLow} ${F()}` : "";
    }), t.$$.dirty[0] & /*pct*/
    2 && n(5, a = {
      vhigh: K.vhigh / 100 * Ee,
      high: K.high / 100 * Ee,
      targ: K.targ / 100 * Ee,
      low: K.low / 100 * Ee,
      vlow: K.vlow / 100 * Ee
    }), t.$$.dirty[0] & /*barHeights*/
    32 && n(4, l = {
      vlow: Ee - a.vlow,
      low: Ee - a.vlow - a.low,
      targ: Ee - a.vlow - a.low - a.targ,
      high: Ee - a.vlow - a.low - a.targ - a.high,
      vhigh: Ee - a.vlow - a.low - a.targ - a.high - a.vhigh
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
    R,
    K,
    x,
    u,
    l,
    a,
    r,
    g,
    pt,
    k,
    h,
    s,
    o,
    i,
    p,
    V,
    Tt,
    wt,
    w,
    y,
    m,
    _,
    M,
    L,
    Mt,
    st,
    Ft
  ];
}
class gh extends nn {
  constructor(e) {
    super(), en(
      this,
      e,
      hh,
      fh,
      tn,
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
function ro(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  const i = (y) => {
    if (!y) return "general";
    const m = String(y).toLowerCase();
    return m === "tight" || m === "t" ? "tight" : m === "pregnancy" || m === "p" ? "pregnancy" : "general";
  }, o = new Bf({ target: r, props: { data: e, initialRange: n.initialRange ?? null, externalRange: null, preset: i(n.preset), showMonthLabels: n.monthLabels ?? !0, showData: n.dataVisible ?? !0, showCanvas: n.canvasVisible ?? !0, selectionFill: n.selectionFill ?? "transparent", selectionStroke: n.selectionStroke ?? "#111" } }), a = /* @__PURE__ */ new Map();
  let l = n.initialRange ?? null;
  function u(y, m) {
    const R = a.get(y) || [];
    R.push(m), a.set(y, R);
  }
  o.$on("rangechange", (y) => {
    var R;
    const m = y.detail;
    l = { start: m.start, end: m.end }, (R = a.get("rangechange")) == null || R.forEach((M) => M(m));
  }), o.$on("ready", (y) => {
    var R;
    const m = y.detail;
    l = { start: m.start, end: m.end }, (R = a.get("ready")) == null || R.forEach((M) => M(m));
  });
  function s(y, m) {
    if (typeof y == "number" && typeof m == "number") o.$set({ externalRange: { start: y, end: m } });
    else if (y && typeof y.start == "number" && typeof y.end == "number") o.$set({ externalRange: { start: y.start, end: y.end } });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function h() {
    return l;
  }
  function f(y) {
    o.$set({ preset: i(y) });
  }
  function g(y) {
    o.$set({ showData: !!y });
  }
  function p(y) {
    o.$set({ showMonthLabels: !!y });
  }
  function w(y) {
    o.$set({ showCanvas: !!y });
  }
  return { on: u, setRange: s, getRange: h, setPreset: f, setDataVisible: g, setMonthLabels: p, setCanvasVisible: w, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createTirCalendar = ro, window.createCgmTir = ro);
function dh(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  const i = (y) => {
    if (!y) return "general";
    const m = String(y).toLowerCase();
    return m === "tight" || m === "t" ? "tight" : m === "pregnancy" || m === "p" ? "pregnancy" : "general";
  }, o = new Of({ target: r, props: { data: e, initialRange: n.initialRange ?? null, externalRange: null, preset: i(n.preset), showMonthLabels: n.monthLabels ?? !0, showData: n.dataVisible ?? !0, showCanvas: n.canvasVisible ?? !0, selectionFill: n.selectionFill ?? "transparent", selectionStroke: n.selectionStroke ?? "#111" } }), a = /* @__PURE__ */ new Map();
  let l = n.initialRange ?? null;
  function u(y, m) {
    const R = a.get(y) || [];
    R.push(m), a.set(y, R);
  }
  o.$on("rangechange", (y) => {
    var R;
    const m = y.detail;
    l = { start: m.start, end: m.end }, (R = a.get("rangechange")) == null || R.forEach((M) => M(m));
  }), o.$on("ready", (y) => {
    var R;
    const m = y.detail;
    l = { start: m.start, end: m.end }, (R = a.get("ready")) == null || R.forEach((M) => M(m));
  });
  function s(y, m) {
    if (typeof y == "number" && typeof m == "number") o.$set({ externalRange: { start: y, end: m } });
    else if (y && typeof y.start == "number" && typeof y.end == "number") o.$set({ externalRange: { start: y.start, end: y.end } });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function h() {
    return l;
  }
  function f(y) {
    o.$set({ preset: i(y) });
  }
  function g(y) {
    o.$set({ showData: !!y });
  }
  function p(y) {
    o.$set({ showMonthLabels: !!y });
  }
  function w(y) {
    o.$set({ showCanvas: !!y });
  }
  return { on: u, setRange: s, getRange: h, setPreset: f, setDataVisible: g, setMonthLabels: p, setCanvasVisible: w, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createTirCalendarLine = dh);
function mh(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = (g) => {
    if (!g) return "general";
    const p = String(g).toLowerCase();
    return p === "tight" || p === "t" ? "tight" : p === "pregnancy" || p === "p" ? "pregnancy" : "general";
  }, a = new Qf({ target: r, props: { data: e, range: i, preset: o(n.preset) } }), l = /* @__PURE__ */ new Map();
  function u(g, p) {
    if (typeof g == "number" && typeof p == "number") a.$set({ range: { start: g, end: p } });
    else if (g && typeof g.start == "number" && typeof g.end == "number") a.$set({ range: g });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function s(g) {
    a.$set({ data: g });
  }
  function h(g, p) {
    const w = l.get(g) || [];
    w.push(p), l.set(g, w);
  }
  if (a.$on("presetchange", (g) => {
    var w;
    const p = g.detail;
    if (n.onPresetChange) try {
      n.onPresetChange(p.preset);
    } catch {
    }
    (w = l.get("presetchange")) == null || w.forEach((y) => y(p));
  }), n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: g, end: p }) => u({ start: g, end: p })), n.source.on("ready", ({ start: g, end: p }) => u({ start: g, end: p })), typeof n.source.getRange == "function")) {
    const g = n.source.getRange();
    g && typeof g.start == "number" && typeof g.end == "number" && u(g);
  }
  function f(g) {
    a.$set({ preset: o(g) });
  }
  return { on: h, setRange: u, setData: s, setPreset: f, destroy: () => a.$destroy() };
}
typeof window < "u" && (window.createCgmSummary = mh);
function ph(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = (w) => {
    if (!w) return "general";
    const y = String(w).toLowerCase();
    return y === "tight" || y === "t" ? "tight" : y === "pregnancy" || y === "p" ? "pregnancy" : "general";
  }, a = new ih({ target: r, props: { data: e, range: i, preset: o(n.preset) } }), l = /* @__PURE__ */ new Map();
  let u = null;
  function s(w, y) {
    const m = l.get(w) || [];
    m.push(y), l.set(w, m);
  }
  a.$on("stats", (w) => {
    var m;
    const y = w.detail;
    u = y, (m = l.get("stats")) == null || m.forEach((R) => R(y));
  });
  function h(w, y) {
    if (typeof w == "number" && typeof y == "number") a.$set({ range: { start: w, end: y } });
    else if (w && typeof w.start == "number" && typeof w.end == "number") a.$set({ range: w });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function f(w) {
    a.$set({ data: w });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: w, end: y }) => h({ start: w, end: y })), n.source.on("ready", ({ start: w, end: y }) => h({ start: w, end: y })), typeof n.source.getRange == "function")) {
    const w = n.source.getRange();
    w && typeof w.start == "number" && typeof w.end == "number" && h(w);
  }
  function g(w) {
    a.$set({ preset: o(w) });
  }
  function p() {
    return u;
  }
  return { on: s, setRange: h, setData: f, setPreset: g, getStats: p, destroy: () => a.$destroy() };
}
typeof window < "u" && (window.createCgmTir = ph);
function yh(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = (h) => {
    if (!h) return "general";
    const f = String(h).toLowerCase();
    return f === "tight" || f === "t" ? "tight" : f === "pregnancy" || f === "p" ? "pregnancy" : "general";
  }, a = new lh({ target: r, props: { data: e, range: i, preset: o(n.preset) } });
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
typeof window < "u" && (window.createCgmAgp = yh);
function wh(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = (h) => {
    if (!h) return "general";
    const f = String(h).toLowerCase();
    return f === "tight" || f === "t" ? "tight" : f === "pregnancy" || f === "p" ? "pregnancy" : "general";
  }, a = new ch({ target: r, props: { data: e, range: i, preset: o(n.preset) } });
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
typeof window < "u" && (window.createCgmStrips = wh);
function vh(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = (y) => {
    if (!y) return "general";
    const m = String(y).toLowerCase();
    return m === "tight" || m === "t" ? "tight" : m === "pregnancy" || m === "p" ? "pregnancy" : "general";
  }, a = new gh({ target: r, props: { data: e, range: i, preset: o(n.preset), showTime: !1 } }), l = /* @__PURE__ */ new Map();
  let u = null;
  function s(y, m) {
    const R = l.get(y) || [];
    R.push(m), l.set(y, R);
  }
  a.$on("stats", (y) => {
    var R;
    const m = y.detail;
    u = m, (R = l.get("stats")) == null || R.forEach((M) => M(m));
  });
  function h(y, m) {
    if (typeof y == "number" && typeof m == "number") a.$set({ range: { start: y, end: m } });
    else if (y && typeof y.start == "number" && typeof y.end == "number") a.$set({ range: y });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function f(y) {
    a.$set({ data: y });
  }
  function g(y) {
    a.$set({ showTime: !!y });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: y, end: m }) => h({ start: y, end: m })), n.source.on("ready", ({ start: y, end: m }) => h({ start: y, end: m })), typeof n.source.getRange == "function")) {
    const y = n.source.getRange();
    y && typeof y.start == "number" && typeof y.end == "number" && h(y);
  }
  function p(y) {
    a.$set({ preset: o(y) });
  }
  function w() {
    return u;
  }
  return { on: s, setRange: h, setData: f, setPreset: p, setShowTime: g, getStats: w, destroy: () => a.$destroy() };
}
typeof window < "u" && (window.createCgmTirDetailed = vh);
export {
  yh as createCgmAgp,
  wh as createCgmStrips,
  mh as createCgmSummary,
  ph as createCgmTir,
  vh as createCgmTirDetailed,
  ro as createTirCalendar,
  dh as createTirCalendarLine
};

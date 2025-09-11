var qi = Object.defineProperty;
var $i = (t, e, n) => e in t ? qi(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var wn = (t, e, n) => $i(t, typeof e != "symbol" ? e + "" : e, n);
function kt() {
}
function Wr(t) {
  return t();
}
function rr() {
  return /* @__PURE__ */ Object.create(null);
}
function Pe(t) {
  t.forEach(Wr);
}
function qr(t) {
  return typeof t == "function";
}
function He(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function Oi(t) {
  return Object.keys(t).length === 0;
}
function At(t) {
  return t ?? "";
}
function T(t, e) {
  t.appendChild(e);
}
function Ie(t, e, n) {
  t.insertBefore(e, n || null);
}
function me(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function O(t) {
  return document.createElement(t);
}
function $r(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function dt(t) {
  return document.createTextNode(t);
}
function wt() {
  return dt(" ");
}
function Ht(t, e, n, r) {
  return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
}
function W(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function Bi(t) {
  return Array.from(t.childNodes);
}
function It(t, e) {
  e = "" + e, t.data !== e && (t.data = /** @type {string} */
  e);
}
function q(t, e, n, r) {
  n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, "");
}
function Xi(t, e, { bubbles: n = !1, cancelable: r = !1 } = {}) {
  return new CustomEvent(t, { detail: e, bubbles: n, cancelable: r });
}
let Ae;
function De(t) {
  Ae = t;
}
function Or() {
  if (!Ae) throw new Error("Function called outside component initialization");
  return Ae;
}
function ze(t) {
  Or().$$.on_mount.push(t);
}
function Vi() {
  const t = Or();
  return (e, n, { cancelable: r = !1 } = {}) => {
    const i = t.$$.callbacks[e];
    if (i) {
      const o = Xi(
        /** @type {string} */
        e,
        n,
        { cancelable: r }
      );
      return i.slice().forEach((s) => {
        s.call(t, o);
      }), !o.defaultPrevented;
    }
    return !0;
  };
}
const oe = [], le = [];
let se = [];
const ir = [], Gi = /* @__PURE__ */ Promise.resolve();
let An = !1;
function Zi() {
  An || (An = !0, Gi.then(Br));
}
function Fn(t) {
  se.push(t);
}
const vn = /* @__PURE__ */ new Set();
let re = 0;
function Br() {
  if (re !== 0)
    return;
  const t = Ae;
  do {
    try {
      for (; re < oe.length; ) {
        const e = oe[re];
        re++, De(e), Ji(e.$$);
      }
    } catch (e) {
      throw oe.length = 0, re = 0, e;
    }
    for (De(null), oe.length = 0, re = 0; le.length; ) le.pop()();
    for (let e = 0; e < se.length; e += 1) {
      const n = se[e];
      vn.has(n) || (vn.add(n), n());
    }
    se.length = 0;
  } while (oe.length);
  for (; ir.length; )
    ir.pop()();
  An = !1, vn.clear(), De(t);
}
function Ji(t) {
  if (t.fragment !== null) {
    t.update(), Pe(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(Fn);
  }
}
function Qi(t) {
  const e = [], n = [];
  se.forEach((r) => t.indexOf(r) === -1 ? e.push(r) : n.push(r)), n.forEach((r) => r()), se = e;
}
const Ki = /* @__PURE__ */ new Set();
function ji(t, e) {
  t && t.i && (Ki.delete(t), t.i(e));
}
function to(t, e, n) {
  const { fragment: r, after_update: i } = t.$$;
  r && r.m(e, n), Fn(() => {
    const o = t.$$.on_mount.map(Wr).filter(qr);
    t.$$.on_destroy ? t.$$.on_destroy.push(...o) : Pe(o), t.$$.on_mount = [];
  }), i.forEach(Fn);
}
function eo(t, e) {
  const n = t.$$;
  n.fragment !== null && (Qi(n.after_update), Pe(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function no(t, e) {
  t.$$.dirty[0] === -1 && (oe.push(t), Zi(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function We(t, e, n, r, i, o, s = null, u = [-1]) {
  const l = Ae;
  De(t);
  const a = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: o,
    update: kt,
    not_equal: i,
    bound: rr(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (l ? l.$$.context : [])),
    // everything else
    callbacks: rr(),
    dirty: u,
    skip_bound: !1,
    root: e.target || l.$$.root
  };
  s && s(a.root);
  let f = !1;
  if (a.ctx = n ? n(t, e.props || {}, (c, h, ...g) => {
    const w = g.length ? g[0] : h;
    return a.ctx && i(a.ctx[c], a.ctx[c] = w) && (!a.skip_bound && a.bound[c] && a.bound[c](w), f && no(t, c)), h;
  }) : [], a.update(), f = !0, Pe(a.before_update), a.fragment = r ? r(a.ctx) : !1, e.target) {
    if (e.hydrate) {
      const c = Bi(e.target);
      a.fragment && a.fragment.l(c), c.forEach(me);
    } else
      a.fragment && a.fragment.c();
    e.intro && ji(t.$$.fragment), to(t, e.target, e.anchor), Br();
  }
  De(l);
}
class qe {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    wn(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    wn(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    eo(this, 1), this.$destroy = kt;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, n) {
    if (!qr(n))
      return kt;
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
    this.$$set && !Oi(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const ro = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(ro);
function Je(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function io(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Xr(t) {
  let e, n, r;
  t.length !== 2 ? (e = Je, n = (u, l) => Je(t(u), l), r = (u, l) => t(u) - l) : (e = t === Je || t === io ? t : oo, n = t, r = t);
  function i(u, l, a = 0, f = u.length) {
    if (a < f) {
      if (e(l, l) !== 0) return f;
      do {
        const c = a + f >>> 1;
        n(u[c], l) < 0 ? a = c + 1 : f = c;
      } while (a < f);
    }
    return a;
  }
  function o(u, l, a = 0, f = u.length) {
    if (a < f) {
      if (e(l, l) !== 0) return f;
      do {
        const c = a + f >>> 1;
        n(u[c], l) <= 0 ? a = c + 1 : f = c;
      } while (a < f);
    }
    return a;
  }
  function s(u, l, a = 0, f = u.length) {
    const c = i(u, l, a, f - 1);
    return c > a && r(u[c - 1], l) > -r(u[c], l) ? c - 1 : c;
  }
  return { left: i, center: s, right: o };
}
function oo() {
  return 0;
}
function ao(t) {
  return t === null ? NaN : +t;
}
const so = Xr(Je), uo = so.right;
Xr(ao).center;
function lo(t, e) {
  let n = 0, r, i = 0, o = 0;
  for (let s of t)
    s != null && (s = +s) >= s && (r = s - i, i += r / ++n, o += r * (s - i));
  if (n > 1) return o / (n - 1);
}
const co = Math.sqrt(50), fo = Math.sqrt(10), ho = Math.sqrt(2);
function tn(t, e, n) {
  const r = (e - t) / Math.max(0, n), i = Math.floor(Math.log10(r)), o = r / Math.pow(10, i), s = o >= co ? 10 : o >= fo ? 5 : o >= ho ? 2 : 1;
  let u, l, a;
  return i < 0 ? (a = Math.pow(10, -i) / s, u = Math.round(t * a), l = Math.round(e * a), u / a < t && ++u, l / a > e && --l, a = -a) : (a = Math.pow(10, i) * s, u = Math.round(t / a), l = Math.round(e / a), u * a < t && ++u, l * a > e && --l), l < u && 0.5 <= n && n < 2 ? tn(t, e, n * 2) : [u, l, a];
}
function go(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const r = e < t, [i, o, s] = r ? tn(e, t, n) : tn(t, e, n);
  if (!(o >= i)) return [];
  const u = o - i + 1, l = new Array(u);
  if (r)
    if (s < 0) for (let a = 0; a < u; ++a) l[a] = (o - a) / -s;
    else for (let a = 0; a < u; ++a) l[a] = (o - a) * s;
  else if (s < 0) for (let a = 0; a < u; ++a) l[a] = (i + a) / -s;
  else for (let a = 0; a < u; ++a) l[a] = (i + a) * s;
  return l;
}
function Un(t, e, n) {
  return e = +e, t = +t, n = +n, tn(t, e, n)[2];
}
function mo(t, e, n) {
  e = +e, t = +t, n = +n;
  const r = e < t, i = r ? Un(e, t, n) : Un(t, e, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function po(t, e) {
  let n = 0, r = 0;
  for (let i of t)
    i != null && (i = +i) >= i && (++n, r += i);
  if (n) return r / n;
}
function En(t, e, n) {
  t = +t, e = +e, n = (i = arguments.length) < 2 ? (e = t, t = 0, 1) : i < 3 ? 1 : +n;
  for (var r = -1, i = Math.max(0, Math.ceil((e - t) / n)) | 0, o = new Array(i); ++r < i; )
    o[r] = t + r * n;
  return o;
}
function yo(t) {
  return t;
}
var _n = 1, xn = 2, Rn = 3, Me = 4, or = 1e-6;
function wo(t) {
  return "translate(" + t + ",0)";
}
function vo(t) {
  return "translate(0," + t + ")";
}
function _o(t) {
  return (e) => +t(e);
}
function xo(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function bo() {
  return !this.__axis;
}
function Vr(t, e) {
  var n = [], r = null, i = null, o = 6, s = 6, u = 3, l = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, a = t === _n || t === Me ? -1 : 1, f = t === Me || t === xn ? "x" : "y", c = t === _n || t === Rn ? wo : vo;
  function h(g) {
    var w = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), x = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : yo), N = Math.max(o, 0) + u, R = e.range(), H = +R[0] + l, p = +R[R.length - 1] + l, _ = (e.bandwidth ? xo : _o)(e.copy(), l), b = g.selection ? g.selection() : g, C = b.selectAll(".domain").data([null]), E = b.selectAll(".tick").data(w, e).order(), Z = E.exit(), X = E.enter().append("g").attr("class", "tick"), L = E.select("line"), m = E.select("text");
    C = C.merge(C.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), E = E.merge(X), L = L.merge(X.append("line").attr("stroke", "currentColor").attr(f + "2", a * o)), m = m.merge(X.append("text").attr("fill", "currentColor").attr(f, a * N).attr("dy", t === _n ? "0em" : t === Rn ? "0.71em" : "0.32em")), g !== b && (C = C.transition(g), E = E.transition(g), L = L.transition(g), m = m.transition(g), Z = Z.transition(g).attr("opacity", or).attr("transform", function(V) {
      return isFinite(V = _(V)) ? c(V + l) : this.getAttribute("transform");
    }), X.attr("opacity", or).attr("transform", function(V) {
      var A = this.parentNode.__axis;
      return c((A && isFinite(A = A(V)) ? A : _(V)) + l);
    })), Z.remove(), C.attr("d", t === Me || t === xn ? s ? "M" + a * s + "," + H + "H" + l + "V" + p + "H" + a * s : "M" + l + "," + H + "V" + p : s ? "M" + H + "," + a * s + "V" + l + "H" + p + "V" + a * s : "M" + H + "," + l + "H" + p), E.attr("opacity", 1).attr("transform", function(V) {
      return c(_(V) + l);
    }), L.attr(f + "2", a * o), m.attr(f, a * N).text(x), b.filter(bo).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === xn ? "start" : t === Me ? "end" : "middle"), b.each(function() {
      this.__axis = _;
    });
  }
  return h.scale = function(g) {
    return arguments.length ? (e = g, h) : e;
  }, h.ticks = function() {
    return n = Array.from(arguments), h;
  }, h.tickArguments = function(g) {
    return arguments.length ? (n = g == null ? [] : Array.from(g), h) : n.slice();
  }, h.tickValues = function(g) {
    return arguments.length ? (r = g == null ? null : Array.from(g), h) : r && r.slice();
  }, h.tickFormat = function(g) {
    return arguments.length ? (i = g, h) : i;
  }, h.tickSize = function(g) {
    return arguments.length ? (o = s = +g, h) : o;
  }, h.tickSizeInner = function(g) {
    return arguments.length ? (o = +g, h) : o;
  }, h.tickSizeOuter = function(g) {
    return arguments.length ? (s = +g, h) : s;
  }, h.tickPadding = function(g) {
    return arguments.length ? (u = +g, h) : u;
  }, h.offset = function(g) {
    return arguments.length ? (l = +g, h) : l;
  }, h;
}
function Mo(t) {
  return Vr(Rn, t);
}
function To(t) {
  return Vr(Me, t);
}
var ko = { value: () => {
} };
function Gr() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Qe(n);
}
function Qe(t) {
  this._ = t;
}
function Co(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Qe.prototype = Gr.prototype = {
  constructor: Qe,
  on: function(t, e) {
    var n = this._, r = Co(t + "", n), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; ) if ((i = (t = r[o]).type) && (i = Do(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (i = (t = r[o]).type) n[i] = ar(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = ar(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Qe(t);
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
function Do(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function ar(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = ko, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Yn = "http://www.w3.org/1999/xhtml";
const sr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Yn,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function dn(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), sr.hasOwnProperty(e) ? { space: sr[e], local: t } : t;
}
function No(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Yn && e.documentElement.namespaceURI === Yn ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function So(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Zr(t) {
  var e = dn(t);
  return (e.local ? So : No)(e);
}
function Ao() {
}
function Bn(t) {
  return t == null ? Ao : function() {
    return this.querySelector(t);
  };
}
function Fo(t) {
  typeof t != "function" && (t = Bn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, u = r[i] = new Array(s), l, a, f = 0; f < s; ++f)
      (l = o[f]) && (a = t.call(l, l.__data__, f, o)) && ("__data__" in l && (a.__data__ = l.__data__), u[f] = a);
  return new Nt(r, this._parents);
}
function Uo(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Eo() {
  return [];
}
function Jr(t) {
  return t == null ? Eo : function() {
    return this.querySelectorAll(t);
  };
}
function Ro(t) {
  return function() {
    return Uo(t.apply(this, arguments));
  };
}
function Yo(t) {
  typeof t == "function" ? t = Ro(t) : t = Jr(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = e[o], u = s.length, l, a = 0; a < u; ++a)
      (l = s[a]) && (r.push(t.call(l, l.__data__, a, s)), i.push(l));
  return new Nt(r, i);
}
function Qr(t) {
  return function() {
    return this.matches(t);
  };
}
function Kr(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Lo = Array.prototype.find;
function Po(t) {
  return function() {
    return Lo.call(this.children, t);
  };
}
function Ho() {
  return this.firstElementChild;
}
function Io(t) {
  return this.select(t == null ? Ho : Po(typeof t == "function" ? t : Kr(t)));
}
var zo = Array.prototype.filter;
function Wo() {
  return Array.from(this.children);
}
function qo(t) {
  return function() {
    return zo.call(this.children, t);
  };
}
function $o(t) {
  return this.selectAll(t == null ? Wo : qo(typeof t == "function" ? t : Kr(t)));
}
function Oo(t) {
  typeof t != "function" && (t = Qr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, u = r[i] = [], l, a = 0; a < s; ++a)
      (l = o[a]) && t.call(l, l.__data__, a, o) && u.push(l);
  return new Nt(r, this._parents);
}
function jr(t) {
  return new Array(t.length);
}
function Bo() {
  return new Nt(this._enter || this._groups.map(jr), this._parents);
}
function en(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
en.prototype = {
  constructor: en,
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
function Xo(t) {
  return function() {
    return t;
  };
}
function Vo(t, e, n, r, i, o) {
  for (var s = 0, u, l = e.length, a = o.length; s < a; ++s)
    (u = e[s]) ? (u.__data__ = o[s], r[s] = u) : n[s] = new en(t, o[s]);
  for (; s < l; ++s)
    (u = e[s]) && (i[s] = u);
}
function Go(t, e, n, r, i, o, s) {
  var u, l, a = /* @__PURE__ */ new Map(), f = e.length, c = o.length, h = new Array(f), g;
  for (u = 0; u < f; ++u)
    (l = e[u]) && (h[u] = g = s.call(l, l.__data__, u, e) + "", a.has(g) ? i[u] = l : a.set(g, l));
  for (u = 0; u < c; ++u)
    g = s.call(t, o[u], u, o) + "", (l = a.get(g)) ? (r[u] = l, l.__data__ = o[u], a.delete(g)) : n[u] = new en(t, o[u]);
  for (u = 0; u < f; ++u)
    (l = e[u]) && a.get(h[u]) === l && (i[u] = l);
}
function Zo(t) {
  return t.__data__;
}
function Jo(t, e) {
  if (!arguments.length) return Array.from(this, Zo);
  var n = e ? Go : Vo, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Xo(t));
  for (var o = i.length, s = new Array(o), u = new Array(o), l = new Array(o), a = 0; a < o; ++a) {
    var f = r[a], c = i[a], h = c.length, g = Qo(t.call(f, f && f.__data__, a, r)), w = g.length, x = u[a] = new Array(w), N = s[a] = new Array(w), R = l[a] = new Array(h);
    n(f, c, x, N, R, g, e);
    for (var H = 0, p = 0, _, b; H < w; ++H)
      if (_ = x[H]) {
        for (H >= p && (p = H + 1); !(b = N[p]) && ++p < w; ) ;
        _._next = b || null;
      }
  }
  return s = new Nt(s, r), s._enter = u, s._exit = l, s;
}
function Qo(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ko() {
  return new Nt(this._exit || this._groups.map(jr), this._parents);
}
function jo(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function ta(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, s = Math.min(i, o), u = new Array(i), l = 0; l < s; ++l)
    for (var a = n[l], f = r[l], c = a.length, h = u[l] = new Array(c), g, w = 0; w < c; ++w)
      (g = a[w] || f[w]) && (h[w] = g);
  for (; l < i; ++l)
    u[l] = n[l];
  return new Nt(u, this._parents);
}
function ea() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function na(t) {
  t || (t = ra);
  function e(c, h) {
    return c && h ? t(c.__data__, h.__data__) : !c - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var s = n[o], u = s.length, l = i[o] = new Array(u), a, f = 0; f < u; ++f)
      (a = s[f]) && (l[f] = a);
    l.sort(e);
  }
  return new Nt(i, this._parents).order();
}
function ra(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ia() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function oa() {
  return Array.from(this);
}
function aa() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function sa() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function ua() {
  return !this.node();
}
function la(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, s = i.length, u; o < s; ++o)
      (u = i[o]) && t.call(u, u.__data__, o, i);
  return this;
}
function ca(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function fa(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ha(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function ga(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function da(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function ma(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function pa(t, e) {
  var n = dn(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? fa : ca : typeof e == "function" ? n.local ? ma : da : n.local ? ga : ha)(n, e));
}
function ti(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function ya(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function wa(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function va(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function _a(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? ya : typeof e == "function" ? va : wa)(t, e, n ?? "")) : ce(this.node(), t);
}
function ce(t, e) {
  return t.style.getPropertyValue(e) || ti(t).getComputedStyle(t, null).getPropertyValue(e);
}
function xa(t) {
  return function() {
    delete this[t];
  };
}
function ba(t, e) {
  return function() {
    this[t] = e;
  };
}
function Ma(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Ta(t, e) {
  return arguments.length > 1 ? this.each((e == null ? xa : typeof e == "function" ? Ma : ba)(t, e)) : this.node()[t];
}
function ei(t) {
  return t.trim().split(/^|\s+/);
}
function Xn(t) {
  return t.classList || new ni(t);
}
function ni(t) {
  this._node = t, this._names = ei(t.getAttribute("class") || "");
}
ni.prototype = {
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
function ri(t, e) {
  for (var n = Xn(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function ii(t, e) {
  for (var n = Xn(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function ka(t) {
  return function() {
    ri(this, t);
  };
}
function Ca(t) {
  return function() {
    ii(this, t);
  };
}
function Da(t, e) {
  return function() {
    (e.apply(this, arguments) ? ri : ii)(this, t);
  };
}
function Na(t, e) {
  var n = ei(t + "");
  if (arguments.length < 2) {
    for (var r = Xn(this.node()), i = -1, o = n.length; ++i < o; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Da : e ? ka : Ca)(n, e));
}
function Sa() {
  this.textContent = "";
}
function Aa(t) {
  return function() {
    this.textContent = t;
  };
}
function Fa(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Ua(t) {
  return arguments.length ? this.each(t == null ? Sa : (typeof t == "function" ? Fa : Aa)(t)) : this.node().textContent;
}
function Ea() {
  this.innerHTML = "";
}
function Ra(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Ya(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function La(t) {
  return arguments.length ? this.each(t == null ? Ea : (typeof t == "function" ? Ya : Ra)(t)) : this.node().innerHTML;
}
function Pa() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ha() {
  return this.each(Pa);
}
function Ia() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function za() {
  return this.each(Ia);
}
function Wa(t) {
  var e = typeof t == "function" ? t : Zr(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function qa() {
  return null;
}
function $a(t, e) {
  var n = typeof t == "function" ? t : Zr(t), r = e == null ? qa : typeof e == "function" ? e : Bn(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Oa() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Ba() {
  return this.each(Oa);
}
function Xa() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Va() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ga(t) {
  return this.select(t ? Va : Xa);
}
function Za(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Ja(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Qa(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Ka(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function ja(t, e, n) {
  return function() {
    var r = this.__on, i, o = Ja(e);
    if (r) {
      for (var s = 0, u = r.length; s < u; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, n), i = { type: t.type, name: t.name, value: e, listener: o, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function ts(t, e, n) {
  var r = Qa(t + ""), i, o = r.length, s;
  if (arguments.length < 2) {
    var u = this.node().__on;
    if (u) {
      for (var l = 0, a = u.length, f; l < a; ++l)
        for (i = 0, f = u[l]; i < o; ++i)
          if ((s = r[i]).type === f.type && s.name === f.name)
            return f.value;
    }
    return;
  }
  for (u = e ? ja : Ka, i = 0; i < o; ++i) this.each(u(r[i], e, n));
  return this;
}
function oi(t, e, n) {
  var r = ti(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function es(t, e) {
  return function() {
    return oi(this, t, e);
  };
}
function ns(t, e) {
  return function() {
    return oi(this, t, e.apply(this, arguments));
  };
}
function rs(t, e) {
  return this.each((typeof e == "function" ? ns : es)(t, e));
}
function* is() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var ai = [null];
function Nt(t, e) {
  this._groups = t, this._parents = e;
}
function $e() {
  return new Nt([[document.documentElement]], ai);
}
function os() {
  return this;
}
Nt.prototype = $e.prototype = {
  constructor: Nt,
  select: Fo,
  selectAll: Yo,
  selectChild: Io,
  selectChildren: $o,
  filter: Oo,
  data: Jo,
  enter: Bo,
  exit: Ko,
  join: jo,
  merge: ta,
  selection: os,
  order: ea,
  sort: na,
  call: ia,
  nodes: oa,
  node: aa,
  size: sa,
  empty: ua,
  each: la,
  attr: pa,
  style: _a,
  property: Ta,
  classed: Na,
  text: Ua,
  html: La,
  raise: Ha,
  lower: za,
  append: Wa,
  insert: $a,
  remove: Ba,
  clone: Ga,
  datum: Za,
  on: ts,
  dispatch: rs,
  [Symbol.iterator]: is
};
function Xt(t) {
  return typeof t == "string" ? new Nt([[document.querySelector(t)]], [document.documentElement]) : new Nt([[t]], ai);
}
function Vn(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function si(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function Oe() {
}
var Fe = 0.7, nn = 1 / Fe, ue = "\\s*([+-]?\\d+)\\s*", Ue = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", zt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", as = /^#([0-9a-f]{3,8})$/, ss = new RegExp(`^rgb\\(${ue},${ue},${ue}\\)$`), us = new RegExp(`^rgb\\(${zt},${zt},${zt}\\)$`), ls = new RegExp(`^rgba\\(${ue},${ue},${ue},${Ue}\\)$`), cs = new RegExp(`^rgba\\(${zt},${zt},${zt},${Ue}\\)$`), fs = new RegExp(`^hsl\\(${Ue},${zt},${zt}\\)$`), hs = new RegExp(`^hsla\\(${Ue},${zt},${zt},${Ue}\\)$`), ur = {
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
Vn(Oe, Jt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: lr,
  // Deprecated! Use color.formatHex.
  formatHex: lr,
  formatHex8: gs,
  formatHsl: ds,
  formatRgb: cr,
  toString: cr
});
function lr() {
  return this.rgb().formatHex();
}
function gs() {
  return this.rgb().formatHex8();
}
function ds() {
  return ui(this).formatHsl();
}
function cr() {
  return this.rgb().formatRgb();
}
function Jt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = as.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? fr(e) : n === 3 ? new Ct(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Xe(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Xe(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = ss.exec(t)) ? new Ct(e[1], e[2], e[3], 1) : (e = us.exec(t)) ? new Ct(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ls.exec(t)) ? Xe(e[1], e[2], e[3], e[4]) : (e = cs.exec(t)) ? Xe(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = fs.exec(t)) ? dr(e[1], e[2] / 100, e[3] / 100, 1) : (e = hs.exec(t)) ? dr(e[1], e[2] / 100, e[3] / 100, e[4]) : ur.hasOwnProperty(t) ? fr(ur[t]) : t === "transparent" ? new Ct(NaN, NaN, NaN, 0) : null;
}
function fr(t) {
  return new Ct(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Xe(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new Ct(t, e, n, r);
}
function ms(t) {
  return t instanceof Oe || (t = Jt(t)), t ? (t = t.rgb(), new Ct(t.r, t.g, t.b, t.opacity)) : new Ct();
}
function Ln(t, e, n, r) {
  return arguments.length === 1 ? ms(t) : new Ct(t, e, n, r ?? 1);
}
function Ct(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Vn(Ct, Ln, si(Oe, {
  brighter(t) {
    return t = t == null ? nn : Math.pow(nn, t), new Ct(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Fe : Math.pow(Fe, t), new Ct(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ct(Zt(this.r), Zt(this.g), Zt(this.b), rn(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: hr,
  // Deprecated! Use color.formatHex.
  formatHex: hr,
  formatHex8: ps,
  formatRgb: gr,
  toString: gr
}));
function hr() {
  return `#${Gt(this.r)}${Gt(this.g)}${Gt(this.b)}`;
}
function ps() {
  return `#${Gt(this.r)}${Gt(this.g)}${Gt(this.b)}${Gt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function gr() {
  const t = rn(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Zt(this.r)}, ${Zt(this.g)}, ${Zt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function rn(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Zt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Gt(t) {
  return t = Zt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function dr(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new Rt(t, e, n, r);
}
function ui(t) {
  if (t instanceof Rt) return new Rt(t.h, t.s, t.l, t.opacity);
  if (t instanceof Oe || (t = Jt(t)), !t) return new Rt();
  if (t instanceof Rt) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), s = NaN, u = o - i, l = (o + i) / 2;
  return u ? (e === o ? s = (n - r) / u + (n < r) * 6 : n === o ? s = (r - e) / u + 2 : s = (e - n) / u + 4, u /= l < 0.5 ? o + i : 2 - o - i, s *= 60) : u = l > 0 && l < 1 ? 0 : s, new Rt(s, u, l, t.opacity);
}
function ys(t, e, n, r) {
  return arguments.length === 1 ? ui(t) : new Rt(t, e, n, r ?? 1);
}
function Rt(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Vn(Rt, ys, si(Oe, {
  brighter(t) {
    return t = t == null ? nn : Math.pow(nn, t), new Rt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Fe : Math.pow(Fe, t), new Rt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new Ct(
      bn(t >= 240 ? t - 240 : t + 120, i, r),
      bn(t, i, r),
      bn(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new Rt(mr(this.h), Ve(this.s), Ve(this.l), rn(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = rn(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${mr(this.h)}, ${Ve(this.s) * 100}%, ${Ve(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function mr(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Ve(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function bn(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Gn = (t) => () => t;
function ws(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function vs(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function _s(t) {
  return (t = +t) == 1 ? li : function(e, n) {
    return n - e ? vs(e, n, t) : Gn(isNaN(e) ? n : e);
  };
}
function li(t, e) {
  var n = e - t;
  return n ? ws(t, n) : Gn(isNaN(t) ? e : t);
}
const on = function t(e) {
  var n = _s(e);
  function r(i, o) {
    var s = n((i = Ln(i)).r, (o = Ln(o)).r), u = n(i.g, o.g), l = n(i.b, o.b), a = li(i.opacity, o.opacity);
    return function(f) {
      return i.r = s(f), i.g = u(f), i.b = l(f), i.opacity = a(f), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function xs(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(o) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - o) + e[i] * o;
    return r;
  };
}
function bs(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Ms(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), o = new Array(n), s;
  for (s = 0; s < r; ++s) i[s] = Zn(t[s], e[s]);
  for (; s < n; ++s) o[s] = e[s];
  return function(u) {
    for (s = 0; s < r; ++s) o[s] = i[s](u);
    return o;
  };
}
function Ts(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function Et(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function ks(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Zn(t[i], e[i]) : r[i] = e[i];
  return function(o) {
    for (i in n) r[i] = n[i](o);
    return r;
  };
}
var Pn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Mn = new RegExp(Pn.source, "g");
function Cs(t) {
  return function() {
    return t;
  };
}
function Ds(t) {
  return function(e) {
    return t(e) + "";
  };
}
function ci(t, e) {
  var n = Pn.lastIndex = Mn.lastIndex = 0, r, i, o, s = -1, u = [], l = [];
  for (t = t + "", e = e + ""; (r = Pn.exec(t)) && (i = Mn.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), u[s] ? u[s] += o : u[++s] = o), (r = r[0]) === (i = i[0]) ? u[s] ? u[s] += i : u[++s] = i : (u[++s] = null, l.push({ i: s, x: Et(r, i) })), n = Mn.lastIndex;
  return n < e.length && (o = e.slice(n), u[s] ? u[s] += o : u[++s] = o), u.length < 2 ? l[0] ? Ds(l[0].x) : Cs(e) : (e = l.length, function(a) {
    for (var f = 0, c; f < e; ++f) u[(c = l[f]).i] = c.x(a);
    return u.join("");
  });
}
function Zn(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Gn(e) : (n === "number" ? Et : n === "string" ? (r = Jt(e)) ? (e = r, on) : ci : e instanceof Jt ? on : e instanceof Date ? Ts : bs(e) ? xs : Array.isArray(e) ? Ms : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? ks : Et)(t, e);
}
function Ns(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var pr = 180 / Math.PI, Hn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function fi(t, e, n, r, i, o) {
  var s, u, l;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (l = t * n + e * r) && (n -= t * l, r -= e * l), (u = Math.sqrt(n * n + r * r)) && (n /= u, r /= u, l /= u), t * r < e * n && (t = -t, e = -e, l = -l, s = -s), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * pr,
    skewX: Math.atan(l) * pr,
    scaleX: s,
    scaleY: u
  };
}
var Ge;
function Ss(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Hn : fi(e.a, e.b, e.c, e.d, e.e, e.f);
}
function As(t) {
  return t == null || (Ge || (Ge = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ge.setAttribute("transform", t), !(t = Ge.transform.baseVal.consolidate())) ? Hn : (t = t.matrix, fi(t.a, t.b, t.c, t.d, t.e, t.f));
}
function hi(t, e, n, r) {
  function i(a) {
    return a.length ? a.pop() + " " : "";
  }
  function o(a, f, c, h, g, w) {
    if (a !== c || f !== h) {
      var x = g.push("translate(", null, e, null, n);
      w.push({ i: x - 4, x: Et(a, c) }, { i: x - 2, x: Et(f, h) });
    } else (c || h) && g.push("translate(" + c + e + h + n);
  }
  function s(a, f, c, h) {
    a !== f ? (a - f > 180 ? f += 360 : f - a > 180 && (a += 360), h.push({ i: c.push(i(c) + "rotate(", null, r) - 2, x: Et(a, f) })) : f && c.push(i(c) + "rotate(" + f + r);
  }
  function u(a, f, c, h) {
    a !== f ? h.push({ i: c.push(i(c) + "skewX(", null, r) - 2, x: Et(a, f) }) : f && c.push(i(c) + "skewX(" + f + r);
  }
  function l(a, f, c, h, g, w) {
    if (a !== c || f !== h) {
      var x = g.push(i(g) + "scale(", null, ",", null, ")");
      w.push({ i: x - 4, x: Et(a, c) }, { i: x - 2, x: Et(f, h) });
    } else (c !== 1 || h !== 1) && g.push(i(g) + "scale(" + c + "," + h + ")");
  }
  return function(a, f) {
    var c = [], h = [];
    return a = t(a), f = t(f), o(a.translateX, a.translateY, f.translateX, f.translateY, c, h), s(a.rotate, f.rotate, c, h), u(a.skewX, f.skewX, c, h), l(a.scaleX, a.scaleY, f.scaleX, f.scaleY, c, h), a = f = null, function(g) {
      for (var w = -1, x = h.length, N; ++w < x; ) c[(N = h[w]).i] = N.x(g);
      return c.join("");
    };
  };
}
var Fs = hi(Ss, "px, ", "px)", "deg)"), Us = hi(As, ", ", ")", ")"), fe = 0, Te = 0, we = 0, gi = 1e3, an, ke, sn = 0, Qt = 0, mn = 0, Ee = typeof performance == "object" && performance.now ? performance : Date, di = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Jn() {
  return Qt || (di(Es), Qt = Ee.now() + mn);
}
function Es() {
  Qt = 0;
}
function un() {
  this._call = this._time = this._next = null;
}
un.prototype = mi.prototype = {
  constructor: un,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Jn() : +n) + (e == null ? 0 : +e), !this._next && ke !== this && (ke ? ke._next = this : an = this, ke = this), this._call = t, this._time = n, In();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, In());
  }
};
function mi(t, e, n) {
  var r = new un();
  return r.restart(t, e, n), r;
}
function Rs() {
  Jn(), ++fe;
  for (var t = an, e; t; )
    (e = Qt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --fe;
}
function yr() {
  Qt = (sn = Ee.now()) + mn, fe = Te = 0;
  try {
    Rs();
  } finally {
    fe = 0, Ls(), Qt = 0;
  }
}
function Ys() {
  var t = Ee.now(), e = t - sn;
  e > gi && (mn -= e, sn = t);
}
function Ls() {
  for (var t, e = an, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : an = n);
  ke = t, In(r);
}
function In(t) {
  if (!fe) {
    Te && (Te = clearTimeout(Te));
    var e = t - Qt;
    e > 24 ? (t < 1 / 0 && (Te = setTimeout(yr, t - Ee.now() - mn)), we && (we = clearInterval(we))) : (we || (sn = Ee.now(), we = setInterval(Ys, gi)), fe = 1, di(yr));
  }
}
function wr(t, e, n) {
  var r = new un();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Ps = Gr("start", "end", "cancel", "interrupt"), Hs = [], pi = 0, vr = 1, zn = 2, Ke = 3, _r = 4, Wn = 5, je = 6;
function pn(t, e, n, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  Is(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Ps,
    tween: Hs,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: pi
  });
}
function Qn(t, e) {
  var n = Yt(t, e);
  if (n.state > pi) throw new Error("too late; already scheduled");
  return n;
}
function Wt(t, e) {
  var n = Yt(t, e);
  if (n.state > Ke) throw new Error("too late; already running");
  return n;
}
function Yt(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Is(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = mi(o, 0, n.time);
  function o(a) {
    n.state = vr, n.timer.restart(s, n.delay, n.time), n.delay <= a && s(a - n.delay);
  }
  function s(a) {
    var f, c, h, g;
    if (n.state !== vr) return l();
    for (f in r)
      if (g = r[f], g.name === n.name) {
        if (g.state === Ke) return wr(s);
        g.state === _r ? (g.state = je, g.timer.stop(), g.on.call("interrupt", t, t.__data__, g.index, g.group), delete r[f]) : +f < e && (g.state = je, g.timer.stop(), g.on.call("cancel", t, t.__data__, g.index, g.group), delete r[f]);
      }
    if (wr(function() {
      n.state === Ke && (n.state = _r, n.timer.restart(u, n.delay, n.time), u(a));
    }), n.state = zn, n.on.call("start", t, t.__data__, n.index, n.group), n.state === zn) {
      for (n.state = Ke, i = new Array(h = n.tween.length), f = 0, c = -1; f < h; ++f)
        (g = n.tween[f].value.call(t, t.__data__, n.index, n.group)) && (i[++c] = g);
      i.length = c + 1;
    }
  }
  function u(a) {
    for (var f = a < n.duration ? n.ease.call(null, a / n.duration) : (n.timer.restart(l), n.state = Wn, 1), c = -1, h = i.length; ++c < h; )
      i[c].call(t, f);
    n.state === Wn && (n.on.call("end", t, t.__data__, n.index, n.group), l());
  }
  function l() {
    n.state = je, n.timer.stop(), delete r[e];
    for (var a in r) return;
    delete t.__transition;
  }
}
function zs(t, e) {
  var n = t.__transition, r, i, o = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((r = n[s]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > zn && r.state < Wn, r.state = je, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    o && delete t.__transition;
  }
}
function Ws(t) {
  return this.each(function() {
    zs(this, t);
  });
}
function qs(t, e) {
  var n, r;
  return function() {
    var i = Wt(this, t), o = i.tween;
    if (o !== n) {
      r = n = o;
      for (var s = 0, u = r.length; s < u; ++s)
        if (r[s].name === e) {
          r = r.slice(), r.splice(s, 1);
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
    var o = Wt(this, t), s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var u = { name: e, value: n }, l = 0, a = i.length; l < a; ++l)
        if (i[l].name === e) {
          i[l] = u;
          break;
        }
      l === a && i.push(u);
    }
    o.tween = i;
  };
}
function Os(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = Yt(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? qs : $s)(n, t, e));
}
function Kn(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = Wt(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return Yt(i, r).value[e];
  };
}
function yi(t, e) {
  var n;
  return (typeof e == "number" ? Et : e instanceof Jt ? on : (n = Jt(e)) ? (e = n, on) : ci)(t, e);
}
function Bs(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Xs(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Vs(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function Gs(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function Zs(t, e, n) {
  var r, i, o;
  return function() {
    var s, u = n(this), l;
    return u == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), l = u + "", s === l ? null : s === r && l === i ? o : (i = l, o = e(r = s, u)));
  };
}
function Js(t, e, n) {
  var r, i, o;
  return function() {
    var s, u = n(this), l;
    return u == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), l = u + "", s === l ? null : s === r && l === i ? o : (i = l, o = e(r = s, u)));
  };
}
function Qs(t, e) {
  var n = dn(t), r = n === "transform" ? Us : yi;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Js : Zs)(n, r, Kn(this, "attr." + t, e)) : e == null ? (n.local ? Xs : Bs)(n) : (n.local ? Gs : Vs)(n, r, e));
}
function Ks(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function js(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function tu(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && js(t, o)), n;
  }
  return i._value = e, i;
}
function eu(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Ks(t, o)), n;
  }
  return i._value = e, i;
}
function nu(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = dn(t);
  return this.tween(n, (r.local ? tu : eu)(r, e));
}
function ru(t, e) {
  return function() {
    Qn(this, t).delay = +e.apply(this, arguments);
  };
}
function iu(t, e) {
  return e = +e, function() {
    Qn(this, t).delay = e;
  };
}
function ou(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ru : iu)(e, t)) : Yt(this.node(), e).delay;
}
function au(t, e) {
  return function() {
    Wt(this, t).duration = +e.apply(this, arguments);
  };
}
function su(t, e) {
  return e = +e, function() {
    Wt(this, t).duration = e;
  };
}
function uu(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? au : su)(e, t)) : Yt(this.node(), e).duration;
}
function lu(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    Wt(this, t).ease = e;
  };
}
function cu(t) {
  var e = this._id;
  return arguments.length ? this.each(lu(e, t)) : Yt(this.node(), e).ease;
}
function fu(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Wt(this, t).ease = n;
  };
}
function hu(t) {
  if (typeof t != "function") throw new Error();
  return this.each(fu(this._id, t));
}
function gu(t) {
  typeof t != "function" && (t = Qr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, u = r[i] = [], l, a = 0; a < s; ++a)
      (l = o[a]) && t.call(l, l.__data__, a, o) && u.push(l);
  return new Ot(r, this._parents, this._name, this._id);
}
function du(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), s = new Array(r), u = 0; u < o; ++u)
    for (var l = e[u], a = n[u], f = l.length, c = s[u] = new Array(f), h, g = 0; g < f; ++g)
      (h = l[g] || a[g]) && (c[g] = h);
  for (; u < r; ++u)
    s[u] = e[u];
  return new Ot(s, this._parents, this._name, this._id);
}
function mu(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function pu(t, e, n) {
  var r, i, o = mu(e) ? Qn : Wt;
  return function() {
    var s = o(this, t), u = s.on;
    u !== r && (i = (r = u).copy()).on(e, n), s.on = i;
  };
}
function yu(t, e) {
  var n = this._id;
  return arguments.length < 2 ? Yt(this.node(), n).on.on(t) : this.each(pu(n, t, e));
}
function wu(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function vu() {
  return this.on("end.remove", wu(this._id));
}
function _u(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Bn(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var u = r[s], l = u.length, a = o[s] = new Array(l), f, c, h = 0; h < l; ++h)
      (f = u[h]) && (c = t.call(f, f.__data__, h, u)) && ("__data__" in f && (c.__data__ = f.__data__), a[h] = c, pn(a[h], e, n, h, a, Yt(f, n)));
  return new Ot(o, this._parents, e, n);
}
function xu(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Jr(t));
  for (var r = this._groups, i = r.length, o = [], s = [], u = 0; u < i; ++u)
    for (var l = r[u], a = l.length, f, c = 0; c < a; ++c)
      if (f = l[c]) {
        for (var h = t.call(f, f.__data__, c, l), g, w = Yt(f, n), x = 0, N = h.length; x < N; ++x)
          (g = h[x]) && pn(g, e, n, x, h, w);
        o.push(h), s.push(f);
      }
  return new Ot(o, s, e, n);
}
var bu = $e.prototype.constructor;
function Mu() {
  return new bu(this._groups, this._parents);
}
function Tu(t, e) {
  var n, r, i;
  return function() {
    var o = ce(this, t), s = (this.style.removeProperty(t), ce(this, t));
    return o === s ? null : o === n && s === r ? i : i = e(n = o, r = s);
  };
}
function wi(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ku(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = ce(this, t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function Cu(t, e, n) {
  var r, i, o;
  return function() {
    var s = ce(this, t), u = n(this), l = u + "";
    return u == null && (l = u = (this.style.removeProperty(t), ce(this, t))), s === l ? null : s === r && l === i ? o : (i = l, o = e(r = s, u));
  };
}
function Du(t, e) {
  var n, r, i, o = "style." + e, s = "end." + o, u;
  return function() {
    var l = Wt(this, t), a = l.on, f = l.value[o] == null ? u || (u = wi(e)) : void 0;
    (a !== n || i !== f) && (r = (n = a).copy()).on(s, i = f), l.on = r;
  };
}
function Nu(t, e, n) {
  var r = (t += "") == "transform" ? Fs : yi;
  return e == null ? this.styleTween(t, Tu(t, r)).on("end.style." + t, wi(t)) : typeof e == "function" ? this.styleTween(t, Cu(t, r, Kn(this, "style." + t, e))).each(Du(this._id, t)) : this.styleTween(t, ku(t, r, e), n).on("end.style." + t, null);
}
function Su(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Au(t, e, n) {
  var r, i;
  function o() {
    var s = e.apply(this, arguments);
    return s !== i && (r = (i = s) && Su(t, s, n)), r;
  }
  return o._value = e, o;
}
function Fu(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Au(t, e, n ?? ""));
}
function Uu(t) {
  return function() {
    this.textContent = t;
  };
}
function Eu(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Ru(t) {
  return this.tween("text", typeof t == "function" ? Eu(Kn(this, "text", t)) : Uu(t == null ? "" : t + ""));
}
function Yu(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Lu(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Yu(i)), e;
  }
  return r._value = t, r;
}
function Pu(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Lu(t));
}
function Hu() {
  for (var t = this._name, e = this._id, n = vi(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], u = s.length, l, a = 0; a < u; ++a)
      if (l = s[a]) {
        var f = Yt(l, e);
        pn(l, t, n, a, s, {
          time: f.time + f.delay + f.duration,
          delay: 0,
          duration: f.duration,
          ease: f.ease
        });
      }
  return new Ot(r, this._parents, t, n);
}
function Iu() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, s) {
    var u = { value: s }, l = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var a = Wt(this, r), f = a.on;
      f !== t && (e = (t = f).copy(), e._.cancel.push(u), e._.interrupt.push(u), e._.end.push(l)), a.on = e;
    }), i === 0 && o();
  });
}
var zu = 0;
function Ot(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function vi() {
  return ++zu;
}
var $t = $e.prototype;
Ot.prototype = {
  constructor: Ot,
  select: _u,
  selectAll: xu,
  selectChild: $t.selectChild,
  selectChildren: $t.selectChildren,
  filter: gu,
  merge: du,
  selection: Mu,
  transition: Hu,
  call: $t.call,
  nodes: $t.nodes,
  node: $t.node,
  size: $t.size,
  empty: $t.empty,
  each: $t.each,
  on: yu,
  attr: Qs,
  attrTween: nu,
  style: Nu,
  styleTween: Fu,
  text: Ru,
  textTween: Pu,
  remove: vu,
  tween: Os,
  delay: ou,
  duration: uu,
  ease: cu,
  easeVarying: hu,
  end: Iu,
  [Symbol.iterator]: $t[Symbol.iterator]
};
function Wu(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var qu = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Wu
};
function $u(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Ou(t) {
  var e, n;
  t instanceof Ot ? (e = t._id, t = t._name) : (e = vi(), (n = qu).time = Jn(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], u = s.length, l, a = 0; a < u; ++a)
      (l = s[a]) && pn(l, t, e, a, s, n || $u(l, e));
  return new Ot(r, this._parents, t, e);
}
$e.prototype.interrupt = Ws;
$e.prototype.transition = Ou;
const qn = Math.PI, $n = 2 * qn, Vt = 1e-6, Bu = $n - Vt;
function _i(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function Xu(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return _i;
  const n = 10 ** e;
  return function(r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class Vu {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? _i : Xu(e);
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
  bezierCurveTo(e, n, r, i, o, s) {
    this._append`C${+e},${+n},${+r},${+i},${this._x1 = +o},${this._y1 = +s}`;
  }
  arcTo(e, n, r, i, o) {
    if (e = +e, n = +n, r = +r, i = +i, o = +o, o < 0) throw new Error(`negative radius: ${o}`);
    let s = this._x1, u = this._y1, l = r - e, a = i - n, f = s - e, c = u - n, h = f * f + c * c;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (h > Vt) if (!(Math.abs(c * l - a * f) > Vt) || !o)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let g = r - s, w = i - u, x = l * l + a * a, N = g * g + w * w, R = Math.sqrt(x), H = Math.sqrt(h), p = o * Math.tan((qn - Math.acos((x + h - N) / (2 * R * H))) / 2), _ = p / H, b = p / R;
      Math.abs(_ - 1) > Vt && this._append`L${e + _ * f},${n + _ * c}`, this._append`A${o},${o},0,0,${+(c * g > f * w)},${this._x1 = e + b * l},${this._y1 = n + b * a}`;
    }
  }
  arc(e, n, r, i, o, s) {
    if (e = +e, n = +n, r = +r, s = !!s, r < 0) throw new Error(`negative radius: ${r}`);
    let u = r * Math.cos(i), l = r * Math.sin(i), a = e + u, f = n + l, c = 1 ^ s, h = s ? i - o : o - i;
    this._x1 === null ? this._append`M${a},${f}` : (Math.abs(this._x1 - a) > Vt || Math.abs(this._y1 - f) > Vt) && this._append`L${a},${f}`, r && (h < 0 && (h = h % $n + $n), h > Bu ? this._append`A${r},${r},0,1,${c},${e - u},${n - l}A${r},${r},0,1,${c},${this._x1 = a},${this._y1 = f}` : h > Vt && this._append`A${r},${r},0,${+(h >= qn)},${c},${this._x1 = e + r * Math.cos(o)},${this._y1 = n + r * Math.sin(o)}`);
  }
  rect(e, n, r, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function Gu(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function ln(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function he(t) {
  return t = ln(Math.abs(t)), t ? t[1] : NaN;
}
function Zu(t, e) {
  return function(n, r) {
    for (var i = n.length, o = [], s = 0, u = t[0], l = 0; i > 0 && u > 0 && (l + u + 1 > r && (u = Math.max(1, r - l)), o.push(n.substring(i -= u, i + u)), !((l += u + 1) > r)); )
      u = t[s = (s + 1) % t.length];
    return o.reverse().join(e);
  };
}
function Ju(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var Qu = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function cn(t) {
  if (!(e = Qu.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new jn({
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
cn.prototype = jn.prototype;
function jn(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
jn.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Ku(t) {
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
var xi;
function ju(t, e) {
  var n = ln(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1], o = i - (xi = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, s = r.length;
  return o === s ? r : o > s ? r + new Array(o - s + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + ln(t, Math.max(0, e + o - 1))[0];
}
function xr(t, e) {
  var n = ln(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const br = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: Gu,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => xr(t * 100, e),
  r: xr,
  s: ju,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Mr(t) {
  return t;
}
var Tr = Array.prototype.map, kr = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function tl(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Mr : Zu(Tr.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", o = t.numerals === void 0 ? Mr : Ju(Tr.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", u = t.minus === void 0 ? "−" : t.minus + "", l = t.nan === void 0 ? "NaN" : t.nan + "";
  function a(c) {
    c = cn(c);
    var h = c.fill, g = c.align, w = c.sign, x = c.symbol, N = c.zero, R = c.width, H = c.comma, p = c.precision, _ = c.trim, b = c.type;
    b === "n" ? (H = !0, b = "g") : br[b] || (p === void 0 && (p = 12), _ = !0, b = "g"), (N || h === "0" && g === "=") && (N = !0, h = "0", g = "=");
    var C = x === "$" ? n : x === "#" && /[boxX]/.test(b) ? "0" + b.toLowerCase() : "", E = x === "$" ? r : /[%p]/.test(b) ? s : "", Z = br[b], X = /[defgprs%]/.test(b);
    p = p === void 0 ? 6 : /[gprs]/.test(b) ? Math.max(1, Math.min(21, p)) : Math.max(0, Math.min(20, p));
    function L(m) {
      var V = C, A = E, D, G, ot;
      if (b === "c")
        A = Z(m) + A, m = "";
      else {
        m = +m;
        var lt = m < 0 || 1 / m < 0;
        if (m = isNaN(m) ? l : Z(Math.abs(m), p), _ && (m = Ku(m)), lt && +m == 0 && w !== "+" && (lt = !1), V = (lt ? w === "(" ? w : u : w === "-" || w === "(" ? "" : w) + V, A = (b === "s" ? kr[8 + xi / 3] : "") + A + (lt && w === "(" ? ")" : ""), X) {
          for (D = -1, G = m.length; ++D < G; )
            if (ot = m.charCodeAt(D), 48 > ot || ot > 57) {
              A = (ot === 46 ? i + m.slice(D + 1) : m.slice(D)) + A, m = m.slice(0, D);
              break;
            }
        }
      }
      H && !N && (m = e(m, 1 / 0));
      var ct = V.length + m.length + A.length, et = ct < R ? new Array(R - ct + 1).join(h) : "";
      switch (H && N && (m = e(et + m, et.length ? R - A.length : 1 / 0), et = ""), g) {
        case "<":
          m = V + m + A + et;
          break;
        case "=":
          m = V + et + m + A;
          break;
        case "^":
          m = et.slice(0, ct = et.length >> 1) + V + m + A + et.slice(ct);
          break;
        default:
          m = et + V + m + A;
          break;
      }
      return o(m);
    }
    return L.toString = function() {
      return c + "";
    }, L;
  }
  function f(c, h) {
    var g = a((c = cn(c), c.type = "f", c)), w = Math.max(-8, Math.min(8, Math.floor(he(h) / 3))) * 3, x = Math.pow(10, -w), N = kr[8 + w / 3];
    return function(R) {
      return g(x * R) + N;
    };
  }
  return {
    format: a,
    formatPrefix: f
  };
}
var Ze, bi, Mi;
el({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function el(t) {
  return Ze = tl(t), bi = Ze.format, Mi = Ze.formatPrefix, Ze;
}
function nl(t) {
  return Math.max(0, -he(Math.abs(t)));
}
function rl(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(he(e) / 3))) * 3 - he(Math.abs(t)));
}
function il(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, he(e) - he(t)) + 1;
}
function ol(t, e) {
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
function al(t) {
  return function() {
    return t;
  };
}
function sl(t) {
  return +t;
}
var Cr = [0, 1];
function ae(t) {
  return t;
}
function On(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : al(isNaN(e) ? NaN : 0.5);
}
function ul(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function ll(t, e, n) {
  var r = t[0], i = t[1], o = e[0], s = e[1];
  return i < r ? (r = On(i, r), o = n(s, o)) : (r = On(r, i), o = n(o, s)), function(u) {
    return o(r(u));
  };
}
function cl(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), o = new Array(r), s = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < r; )
    i[s] = On(t[s], t[s + 1]), o[s] = n(e[s], e[s + 1]);
  return function(u) {
    var l = uo(t, u, 1, r) - 1;
    return o[l](i[l](u));
  };
}
function fl(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function hl() {
  var t = Cr, e = Cr, n = Zn, r, i, o, s = ae, u, l, a;
  function f() {
    var h = Math.min(t.length, e.length);
    return s !== ae && (s = ul(t[0], t[h - 1])), u = h > 2 ? cl : ll, l = a = null, c;
  }
  function c(h) {
    return h == null || isNaN(h = +h) ? o : (l || (l = u(t.map(r), e, n)))(r(s(h)));
  }
  return c.invert = function(h) {
    return s(i((a || (a = u(e, t.map(r), Et)))(h)));
  }, c.domain = function(h) {
    return arguments.length ? (t = Array.from(h, sl), f()) : t.slice();
  }, c.range = function(h) {
    return arguments.length ? (e = Array.from(h), f()) : e.slice();
  }, c.rangeRound = function(h) {
    return e = Array.from(h), n = Ns, f();
  }, c.clamp = function(h) {
    return arguments.length ? (s = h ? !0 : ae, f()) : s !== ae;
  }, c.interpolate = function(h) {
    return arguments.length ? (n = h, f()) : n;
  }, c.unknown = function(h) {
    return arguments.length ? (o = h, c) : o;
  }, function(h, g) {
    return r = h, i = g, f();
  };
}
function gl() {
  return hl()(ae, ae);
}
function dl(t, e, n, r) {
  var i = mo(t, e, n), o;
  switch (r = cn(r ?? ",f"), r.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(o = rl(i, s)) && (r.precision = o), Mi(r, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(o = il(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = o - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(o = nl(i)) && (r.precision = o - (r.type === "%") * 2);
      break;
    }
  }
  return bi(r);
}
function ml(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return go(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return dl(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, o = r.length - 1, s = r[i], u = r[o], l, a, f = 10;
    for (u < s && (a = s, s = u, u = a, a = i, i = o, o = a); f-- > 0; ) {
      if (a = Un(s, u, n), a === l)
        return r[i] = s, r[o] = u, e(r);
      if (a > 0)
        s = Math.floor(s / a) * a, u = Math.ceil(u / a) * a;
      else if (a < 0)
        s = Math.ceil(s * a) / a, u = Math.floor(u * a) / a;
      else
        break;
      l = a;
    }
    return t;
  }, t;
}
function Re() {
  var t = gl();
  return t.copy = function() {
    return fl(t, Re());
  }, ol.apply(t, arguments), ml(t);
}
const Tn = /* @__PURE__ */ new Date(), kn = /* @__PURE__ */ new Date();
function qt(t, e, n, r) {
  function i(o) {
    return t(o = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+o)), o;
  }
  return i.floor = (o) => (t(o = /* @__PURE__ */ new Date(+o)), o), i.ceil = (o) => (t(o = new Date(o - 1)), e(o, 1), t(o), o), i.round = (o) => {
    const s = i(o), u = i.ceil(o);
    return o - s < u - o ? s : u;
  }, i.offset = (o, s) => (e(o = /* @__PURE__ */ new Date(+o), s == null ? 1 : Math.floor(s)), o), i.range = (o, s, u) => {
    const l = [];
    if (o = i.ceil(o), u = u == null ? 1 : Math.floor(u), !(o < s) || !(u > 0)) return l;
    let a;
    do
      l.push(a = /* @__PURE__ */ new Date(+o)), e(o, u), t(o);
    while (a < o && o < s);
    return l;
  }, i.filter = (o) => qt((s) => {
    if (s >= s) for (; t(s), !o(s); ) s.setTime(s - 1);
  }, (s, u) => {
    if (s >= s)
      if (u < 0) for (; ++u <= 0; )
        for (; e(s, -1), !o(s); )
          ;
      else for (; --u >= 0; )
        for (; e(s, 1), !o(s); )
          ;
  }), n && (i.count = (o, s) => (Tn.setTime(+o), kn.setTime(+s), t(Tn), t(kn), Math.floor(n(Tn, kn))), i.every = (o) => (o = Math.floor(o), !isFinite(o) || !(o > 0) ? null : o > 1 ? i.filter(r ? (s) => r(s) % o === 0 : (s) => i.count(0, s) % o === 0) : i)), i;
}
const pl = 1e3, tr = pl * 60, yl = tr * 60, Ye = yl * 24, Ti = Ye * 7, Le = qt(
  (t) => t.setHours(0, 0, 0, 0),
  (t, e) => t.setDate(t.getDate() + e),
  (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * tr) / Ye,
  (t) => t.getDate() - 1
);
Le.range;
const er = qt((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / Ye, (t) => t.getUTCDate() - 1);
er.range;
const wl = qt((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / Ye, (t) => Math.floor(t / Ye));
wl.range;
function te(t) {
  return qt((e) => {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setDate(e.getDate() + n * 7);
  }, (e, n) => (n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * tr) / Ti);
}
const ki = te(0), fn = te(1), vl = te(2), _l = te(3), ge = te(4), xl = te(5), bl = te(6);
ki.range;
fn.range;
vl.range;
_l.range;
ge.range;
xl.range;
bl.range;
function ee(t) {
  return qt((e) => {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setUTCDate(e.getUTCDate() + n * 7);
  }, (e, n) => (n - e) / Ti);
}
const Ci = ee(0), hn = ee(1), Ml = ee(2), Tl = ee(3), de = ee(4), kl = ee(5), Cl = ee(6);
Ci.range;
hn.range;
Ml.range;
Tl.range;
de.range;
kl.range;
Cl.range;
const Kt = qt((t) => {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, e) => {
  t.setFullYear(t.getFullYear() + e);
}, (t, e) => e.getFullYear() - t.getFullYear(), (t) => t.getFullYear());
Kt.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : qt((e) => {
  e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, n) => {
  e.setFullYear(e.getFullYear() + n * t);
});
Kt.range;
const jt = qt((t) => {
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCFullYear(t.getUTCFullYear() + e);
}, (t, e) => e.getUTCFullYear() - t.getUTCFullYear(), (t) => t.getUTCFullYear());
jt.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : qt((e) => {
  e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, n) => {
  e.setUTCFullYear(e.getUTCFullYear() + n * t);
});
jt.range;
function Cn(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e;
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function Dn(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e;
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function ve(t, e, n) {
  return { y: t, m: e, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function Dl(t) {
  var e = t.dateTime, n = t.date, r = t.time, i = t.periods, o = t.days, s = t.shortDays, u = t.months, l = t.shortMonths, a = _e(i), f = xe(i), c = _e(o), h = xe(o), g = _e(s), w = xe(s), x = _e(u), N = xe(u), R = _e(l), H = xe(l), p = {
    a: lt,
    A: ct,
    b: et,
    B: vt,
    c: null,
    d: Ur,
    e: Ur,
    f: Jl,
    g: ac,
    G: uc,
    H: Vl,
    I: Gl,
    j: Zl,
    L: Di,
    m: Ql,
    M: Kl,
    p: mt,
    q: Tt,
    Q: Yr,
    s: Lr,
    S: jl,
    u: tc,
    U: ec,
    V: nc,
    w: rc,
    W: ic,
    x: null,
    X: null,
    y: oc,
    Y: sc,
    Z: lc,
    "%": Rr
  }, _ = {
    a: ft,
    A: Lt,
    b: Dt,
    B: rt,
    c: null,
    d: Er,
    e: Er,
    f: gc,
    g: Mc,
    G: kc,
    H: cc,
    I: fc,
    j: hc,
    L: Si,
    m: dc,
    M: mc,
    p: _t,
    q: d,
    Q: Yr,
    s: Lr,
    S: pc,
    u: yc,
    U: wc,
    V: vc,
    w: _c,
    W: xc,
    x: null,
    X: null,
    y: bc,
    Y: Tc,
    Z: Cc,
    "%": Rr
  }, b = {
    a: L,
    A: m,
    b: V,
    B: A,
    c: D,
    d: Ar,
    e: Ar,
    f: $l,
    g: Sr,
    G: Nr,
    H: Fr,
    I: Fr,
    j: Il,
    L: ql,
    m: Hl,
    M: zl,
    p: X,
    q: Pl,
    Q: Bl,
    s: Xl,
    S: Wl,
    u: Ul,
    U: El,
    V: Rl,
    w: Fl,
    W: Yl,
    x: G,
    X: ot,
    y: Sr,
    Y: Nr,
    Z: Ll,
    "%": Ol
  };
  p.x = C(n, p), p.X = C(r, p), p.c = C(e, p), _.x = C(n, _), _.X = C(r, _), _.c = C(e, _);
  function C(M, z) {
    return function($) {
      var y = [], K = -1, Y = 0, v = M.length, S, F, U;
      for ($ instanceof Date || ($ = /* @__PURE__ */ new Date(+$)); ++K < v; )
        M.charCodeAt(K) === 37 && (y.push(M.slice(Y, K)), (F = Dr[S = M.charAt(++K)]) != null ? S = M.charAt(++K) : F = S === "e" ? " " : "0", (U = z[S]) && (S = U($, F)), y.push(S), Y = K + 1);
      return y.push(M.slice(Y, K)), y.join("");
    };
  }
  function E(M, z) {
    return function($) {
      var y = ve(1900, void 0, 1), K = Z(y, M, $ += "", 0), Y, v;
      if (K != $.length) return null;
      if ("Q" in y) return new Date(y.Q);
      if ("s" in y) return new Date(y.s * 1e3 + ("L" in y ? y.L : 0));
      if (z && !("Z" in y) && (y.Z = 0), "p" in y && (y.H = y.H % 12 + y.p * 12), y.m === void 0 && (y.m = "q" in y ? y.q : 0), "V" in y) {
        if (y.V < 1 || y.V > 53) return null;
        "w" in y || (y.w = 1), "Z" in y ? (Y = Dn(ve(y.y, 0, 1)), v = Y.getUTCDay(), Y = v > 4 || v === 0 ? hn.ceil(Y) : hn(Y), Y = er.offset(Y, (y.V - 1) * 7), y.y = Y.getUTCFullYear(), y.m = Y.getUTCMonth(), y.d = Y.getUTCDate() + (y.w + 6) % 7) : (Y = Cn(ve(y.y, 0, 1)), v = Y.getDay(), Y = v > 4 || v === 0 ? fn.ceil(Y) : fn(Y), Y = Le.offset(Y, (y.V - 1) * 7), y.y = Y.getFullYear(), y.m = Y.getMonth(), y.d = Y.getDate() + (y.w + 6) % 7);
      } else ("W" in y || "U" in y) && ("w" in y || (y.w = "u" in y ? y.u % 7 : "W" in y ? 1 : 0), v = "Z" in y ? Dn(ve(y.y, 0, 1)).getUTCDay() : Cn(ve(y.y, 0, 1)).getDay(), y.m = 0, y.d = "W" in y ? (y.w + 6) % 7 + y.W * 7 - (v + 5) % 7 : y.w + y.U * 7 - (v + 6) % 7);
      return "Z" in y ? (y.H += y.Z / 100 | 0, y.M += y.Z % 100, Dn(y)) : Cn(y);
    };
  }
  function Z(M, z, $, y) {
    for (var K = 0, Y = z.length, v = $.length, S, F; K < Y; ) {
      if (y >= v) return -1;
      if (S = z.charCodeAt(K++), S === 37) {
        if (S = z.charAt(K++), F = b[S in Dr ? z.charAt(K++) : S], !F || (y = F(M, $, y)) < 0) return -1;
      } else if (S != $.charCodeAt(y++))
        return -1;
    }
    return y;
  }
  function X(M, z, $) {
    var y = a.exec(z.slice($));
    return y ? (M.p = f.get(y[0].toLowerCase()), $ + y[0].length) : -1;
  }
  function L(M, z, $) {
    var y = g.exec(z.slice($));
    return y ? (M.w = w.get(y[0].toLowerCase()), $ + y[0].length) : -1;
  }
  function m(M, z, $) {
    var y = c.exec(z.slice($));
    return y ? (M.w = h.get(y[0].toLowerCase()), $ + y[0].length) : -1;
  }
  function V(M, z, $) {
    var y = R.exec(z.slice($));
    return y ? (M.m = H.get(y[0].toLowerCase()), $ + y[0].length) : -1;
  }
  function A(M, z, $) {
    var y = x.exec(z.slice($));
    return y ? (M.m = N.get(y[0].toLowerCase()), $ + y[0].length) : -1;
  }
  function D(M, z, $) {
    return Z(M, e, z, $);
  }
  function G(M, z, $) {
    return Z(M, n, z, $);
  }
  function ot(M, z, $) {
    return Z(M, r, z, $);
  }
  function lt(M) {
    return s[M.getDay()];
  }
  function ct(M) {
    return o[M.getDay()];
  }
  function et(M) {
    return l[M.getMonth()];
  }
  function vt(M) {
    return u[M.getMonth()];
  }
  function mt(M) {
    return i[+(M.getHours() >= 12)];
  }
  function Tt(M) {
    return 1 + ~~(M.getMonth() / 3);
  }
  function ft(M) {
    return s[M.getUTCDay()];
  }
  function Lt(M) {
    return o[M.getUTCDay()];
  }
  function Dt(M) {
    return l[M.getUTCMonth()];
  }
  function rt(M) {
    return u[M.getUTCMonth()];
  }
  function _t(M) {
    return i[+(M.getUTCHours() >= 12)];
  }
  function d(M) {
    return 1 + ~~(M.getUTCMonth() / 3);
  }
  return {
    format: function(M) {
      var z = C(M += "", p);
      return z.toString = function() {
        return M;
      }, z;
    },
    parse: function(M) {
      var z = E(M += "", !1);
      return z.toString = function() {
        return M;
      }, z;
    },
    utcFormat: function(M) {
      var z = C(M += "", _);
      return z.toString = function() {
        return M;
      }, z;
    },
    utcParse: function(M) {
      var z = E(M += "", !0);
      return z.toString = function() {
        return M;
      }, z;
    }
  };
}
var Dr = { "-": "", _: " ", 0: "0" }, Mt = /^\s*\d+/, Nl = /^%/, Sl = /[\\^$*+?|[\]().{}]/g;
function tt(t, e, n) {
  var r = t < 0 ? "-" : "", i = (r ? -t : t) + "", o = i.length;
  return r + (o < n ? new Array(n - o + 1).join(e) + i : i);
}
function Al(t) {
  return t.replace(Sl, "\\$&");
}
function _e(t) {
  return new RegExp("^(?:" + t.map(Al).join("|") + ")", "i");
}
function xe(t) {
  return new Map(t.map((e, n) => [e.toLowerCase(), n]));
}
function Fl(t, e, n) {
  var r = Mt.exec(e.slice(n, n + 1));
  return r ? (t.w = +r[0], n + r[0].length) : -1;
}
function Ul(t, e, n) {
  var r = Mt.exec(e.slice(n, n + 1));
  return r ? (t.u = +r[0], n + r[0].length) : -1;
}
function El(t, e, n) {
  var r = Mt.exec(e.slice(n, n + 2));
  return r ? (t.U = +r[0], n + r[0].length) : -1;
}
function Rl(t, e, n) {
  var r = Mt.exec(e.slice(n, n + 2));
  return r ? (t.V = +r[0], n + r[0].length) : -1;
}
function Yl(t, e, n) {
  var r = Mt.exec(e.slice(n, n + 2));
  return r ? (t.W = +r[0], n + r[0].length) : -1;
}
function Nr(t, e, n) {
  var r = Mt.exec(e.slice(n, n + 4));
  return r ? (t.y = +r[0], n + r[0].length) : -1;
}
function Sr(t, e, n) {
  var r = Mt.exec(e.slice(n, n + 2));
  return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function Ll(t, e, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
  return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function Pl(t, e, n) {
  var r = Mt.exec(e.slice(n, n + 1));
  return r ? (t.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function Hl(t, e, n) {
  var r = Mt.exec(e.slice(n, n + 2));
  return r ? (t.m = r[0] - 1, n + r[0].length) : -1;
}
function Ar(t, e, n) {
  var r = Mt.exec(e.slice(n, n + 2));
  return r ? (t.d = +r[0], n + r[0].length) : -1;
}
function Il(t, e, n) {
  var r = Mt.exec(e.slice(n, n + 3));
  return r ? (t.m = 0, t.d = +r[0], n + r[0].length) : -1;
}
function Fr(t, e, n) {
  var r = Mt.exec(e.slice(n, n + 2));
  return r ? (t.H = +r[0], n + r[0].length) : -1;
}
function zl(t, e, n) {
  var r = Mt.exec(e.slice(n, n + 2));
  return r ? (t.M = +r[0], n + r[0].length) : -1;
}
function Wl(t, e, n) {
  var r = Mt.exec(e.slice(n, n + 2));
  return r ? (t.S = +r[0], n + r[0].length) : -1;
}
function ql(t, e, n) {
  var r = Mt.exec(e.slice(n, n + 3));
  return r ? (t.L = +r[0], n + r[0].length) : -1;
}
function $l(t, e, n) {
  var r = Mt.exec(e.slice(n, n + 6));
  return r ? (t.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function Ol(t, e, n) {
  var r = Nl.exec(e.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function Bl(t, e, n) {
  var r = Mt.exec(e.slice(n));
  return r ? (t.Q = +r[0], n + r[0].length) : -1;
}
function Xl(t, e, n) {
  var r = Mt.exec(e.slice(n));
  return r ? (t.s = +r[0], n + r[0].length) : -1;
}
function Ur(t, e) {
  return tt(t.getDate(), e, 2);
}
function Vl(t, e) {
  return tt(t.getHours(), e, 2);
}
function Gl(t, e) {
  return tt(t.getHours() % 12 || 12, e, 2);
}
function Zl(t, e) {
  return tt(1 + Le.count(Kt(t), t), e, 3);
}
function Di(t, e) {
  return tt(t.getMilliseconds(), e, 3);
}
function Jl(t, e) {
  return Di(t, e) + "000";
}
function Ql(t, e) {
  return tt(t.getMonth() + 1, e, 2);
}
function Kl(t, e) {
  return tt(t.getMinutes(), e, 2);
}
function jl(t, e) {
  return tt(t.getSeconds(), e, 2);
}
function tc(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function ec(t, e) {
  return tt(ki.count(Kt(t) - 1, t), e, 2);
}
function Ni(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? ge(t) : ge.ceil(t);
}
function nc(t, e) {
  return t = Ni(t), tt(ge.count(Kt(t), t) + (Kt(t).getDay() === 4), e, 2);
}
function rc(t) {
  return t.getDay();
}
function ic(t, e) {
  return tt(fn.count(Kt(t) - 1, t), e, 2);
}
function oc(t, e) {
  return tt(t.getFullYear() % 100, e, 2);
}
function ac(t, e) {
  return t = Ni(t), tt(t.getFullYear() % 100, e, 2);
}
function sc(t, e) {
  return tt(t.getFullYear() % 1e4, e, 4);
}
function uc(t, e) {
  var n = t.getDay();
  return t = n >= 4 || n === 0 ? ge(t) : ge.ceil(t), tt(t.getFullYear() % 1e4, e, 4);
}
function lc(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + tt(e / 60 | 0, "0", 2) + tt(e % 60, "0", 2);
}
function Er(t, e) {
  return tt(t.getUTCDate(), e, 2);
}
function cc(t, e) {
  return tt(t.getUTCHours(), e, 2);
}
function fc(t, e) {
  return tt(t.getUTCHours() % 12 || 12, e, 2);
}
function hc(t, e) {
  return tt(1 + er.count(jt(t), t), e, 3);
}
function Si(t, e) {
  return tt(t.getUTCMilliseconds(), e, 3);
}
function gc(t, e) {
  return Si(t, e) + "000";
}
function dc(t, e) {
  return tt(t.getUTCMonth() + 1, e, 2);
}
function mc(t, e) {
  return tt(t.getUTCMinutes(), e, 2);
}
function pc(t, e) {
  return tt(t.getUTCSeconds(), e, 2);
}
function yc(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function wc(t, e) {
  return tt(Ci.count(jt(t) - 1, t), e, 2);
}
function Ai(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? de(t) : de.ceil(t);
}
function vc(t, e) {
  return t = Ai(t), tt(de.count(jt(t), t) + (jt(t).getUTCDay() === 4), e, 2);
}
function _c(t) {
  return t.getUTCDay();
}
function xc(t, e) {
  return tt(hn.count(jt(t) - 1, t), e, 2);
}
function bc(t, e) {
  return tt(t.getUTCFullYear() % 100, e, 2);
}
function Mc(t, e) {
  return t = Ai(t), tt(t.getUTCFullYear() % 100, e, 2);
}
function Tc(t, e) {
  return tt(t.getUTCFullYear() % 1e4, e, 4);
}
function kc(t, e) {
  var n = t.getUTCDay();
  return t = n >= 4 || n === 0 ? de(t) : de.ceil(t), tt(t.getUTCFullYear() % 1e4, e, 4);
}
function Cc() {
  return "+0000";
}
function Rr() {
  return "%";
}
function Yr(t) {
  return +t;
}
function Lr(t) {
  return Math.floor(+t / 1e3);
}
var ie, Ne, Fi;
Dc({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function Dc(t) {
  return ie = Dl(t), Ne = ie.format, ie.parse, Fi = ie.utcFormat, ie.utcParse, ie;
}
function bt(t) {
  return function() {
    return t;
  };
}
function Ui(t) {
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
  }, () => new Vu(e);
}
function Ei(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ri(t) {
  this._context = t;
}
Ri.prototype = {
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
function Yi(t) {
  return new Ri(t);
}
function Li(t) {
  return t[0];
}
function Pi(t) {
  return t[1];
}
function Se(t, e) {
  var n = bt(!0), r = null, i = Yi, o = null, s = Ui(u);
  t = typeof t == "function" ? t : t === void 0 ? Li : bt(t), e = typeof e == "function" ? e : e === void 0 ? Pi : bt(e);
  function u(l) {
    var a, f = (l = Ei(l)).length, c, h = !1, g;
    for (r == null && (o = i(g = s())), a = 0; a <= f; ++a)
      !(a < f && n(c = l[a], a, l)) === h && ((h = !h) ? o.lineStart() : o.lineEnd()), h && o.point(+t(c, a, l), +e(c, a, l));
    if (g) return o = null, g + "" || null;
  }
  return u.x = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : bt(+l), u) : t;
  }, u.y = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : bt(+l), u) : e;
  }, u.defined = function(l) {
    return arguments.length ? (n = typeof l == "function" ? l : bt(!!l), u) : n;
  }, u.curve = function(l) {
    return arguments.length ? (i = l, r != null && (o = i(r)), u) : i;
  }, u.context = function(l) {
    return arguments.length ? (l == null ? r = o = null : o = i(r = l), u) : r;
  }, u;
}
function Ut(t, e, n) {
  var r = null, i = bt(!0), o = null, s = Yi, u = null, l = Ui(a);
  t = typeof t == "function" ? t : t === void 0 ? Li : bt(+t), e = typeof e == "function" ? e : bt(e === void 0 ? 0 : +e), n = typeof n == "function" ? n : n === void 0 ? Pi : bt(+n);
  function a(c) {
    var h, g, w, x = (c = Ei(c)).length, N, R = !1, H, p = new Array(x), _ = new Array(x);
    for (o == null && (u = s(H = l())), h = 0; h <= x; ++h) {
      if (!(h < x && i(N = c[h], h, c)) === R)
        if (R = !R)
          g = h, u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), w = h - 1; w >= g; --w)
            u.point(p[w], _[w]);
          u.lineEnd(), u.areaEnd();
        }
      R && (p[h] = +t(N, h, c), _[h] = +e(N, h, c), u.point(r ? +r(N, h, c) : p[h], n ? +n(N, h, c) : _[h]));
    }
    if (H) return u = null, H + "" || null;
  }
  function f() {
    return Se().defined(i).curve(s).context(o);
  }
  return a.x = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : bt(+c), r = null, a) : t;
  }, a.x0 = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : bt(+c), a) : t;
  }, a.x1 = function(c) {
    return arguments.length ? (r = c == null ? null : typeof c == "function" ? c : bt(+c), a) : r;
  }, a.y = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : bt(+c), n = null, a) : e;
  }, a.y0 = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : bt(+c), a) : e;
  }, a.y1 = function(c) {
    return arguments.length ? (n = c == null ? null : typeof c == "function" ? c : bt(+c), a) : n;
  }, a.lineX0 = a.lineY0 = function() {
    return f().x(t).y(e);
  }, a.lineY1 = function() {
    return f().x(t).y(n);
  }, a.lineX1 = function() {
    return f().x(r).y(e);
  }, a.defined = function(c) {
    return arguments.length ? (i = typeof c == "function" ? c : bt(!!c), a) : i;
  }, a.curve = function(c) {
    return arguments.length ? (s = c, o != null && (u = s(o)), a) : s;
  }, a.context = function(c) {
    return arguments.length ? (c == null ? o = u = null : u = s(o = c), a) : o;
  }, a;
}
function Pr(t) {
  return t < 0 ? -1 : 1;
}
function Hr(t, e, n) {
  var r = t._x1 - t._x0, i = e - t._x1, o = (t._y1 - t._y0) / (r || i < 0 && -0), s = (n - t._y1) / (i || r < 0 && -0), u = (o * i + s * r) / (r + i);
  return (Pr(o) + Pr(s)) * Math.min(Math.abs(o), Math.abs(s), 0.5 * Math.abs(u)) || 0;
}
function Ir(t, e) {
  var n = t._x1 - t._x0;
  return n ? (3 * (t._y1 - t._y0) / n - e) / 2 : e;
}
function Nn(t, e, n) {
  var r = t._x0, i = t._y0, o = t._x1, s = t._y1, u = (o - r) / 3;
  t._context.bezierCurveTo(r + u, i + u * e, o - u, s - u * n, o, s);
}
function gn(t) {
  this._context = t;
}
gn.prototype = {
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
        Nn(this, this._t0, Ir(this, this._t0));
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
          this._point = 3, Nn(this, Ir(this, n = Hr(this, t, e)), n);
          break;
        default:
          Nn(this, this._t0, n = Hr(this, t, e));
          break;
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = n;
    }
  }
};
Object.create(gn.prototype).point = function(t, e) {
  gn.prototype.point.call(this, e, t);
};
function Sn(t) {
  return new gn(t);
}
function Ce(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
Ce.prototype = {
  constructor: Ce,
  scale: function(t) {
    return t === 1 ? this : new Ce(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Ce(this.k, this.x + this.k * t, this.y + this.k * e);
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
Ce.prototype;
function Nc(t) {
  let e, n, r, i, o, s, u, l, a, f, c, h, g, w, x, N, R, H, p, _, b, C, E, Z, X, L, m, V, A, D, G, ot, lt, ct, et, vt, mt, Tt, ft, Lt, Dt, rt, _t;
  return {
    c() {
      e = O("div"), n = O("div"), r = O("div"), i = dt(
        /*periodLabel*/
        t[3]
      ), o = wt(), s = O("div"), u = O("div"), l = O("button"), l.textContent = "|<", a = wt(), f = O("button"), f.textContent = "<", c = wt(), h = O("button"), h.textContent = ">", g = wt(), w = O("button"), w.textContent = ">|", x = wt(), N = O("div"), R = O("button"), H = dt("1 day"), _ = wt(), b = O("button"), C = dt("3 days"), Z = wt(), X = O("button"), L = dt("7 days"), V = wt(), A = O("button"), D = dt("14 days"), ot = wt(), lt = O("button"), ct = dt("30 days"), vt = wt(), mt = O("button"), Tt = dt("90 days"), Lt = wt(), Dt = O("canvas"), q(r, "text-align", "left"), q(r, "color", "#000"), q(r, "font-size", "12px"), q(r, "font-weight", "600"), q(r, "min-width", "160px"), q(r, "flex", "1 1 auto"), W(l, "class", "navbtn svelte-4spgle"), W(l, "title", "Jump back by current span"), W(f, "class", "navbtn svelte-4spgle"), W(f, "title", "Step back 1 day"), W(h, "class", "navbtn svelte-4spgle"), W(h, "title", "Step forward 1 day"), W(w, "class", "navbtn svelte-4spgle"), W(w, "title", "Jump forward by current span"), q(u, "display", "flex"), q(u, "gap", "8px"), q(u, "align-items", "center"), q(u, "justify-content", "flex-end"), q(u, "flex", "0 0 auto"), W(R, "type", "button"), W(R, "class", p = At(`qbtn ${/*activeSpan*/
      t[2] === 1 ? "active" : ""}`) + " svelte-4spgle"), W(b, "type", "button"), W(b, "class", E = At(`qbtn ${/*activeSpan*/
      t[2] === 3 ? "active" : ""}`) + " svelte-4spgle"), W(X, "type", "button"), W(X, "class", m = At(`qbtn ${/*activeSpan*/
      t[2] === 7 ? "active" : ""}`) + " svelte-4spgle"), W(A, "type", "button"), W(A, "class", G = At(`qbtn ${/*activeSpan*/
      t[2] === 14 ? "active" : ""}`) + " svelte-4spgle"), W(lt, "type", "button"), W(lt, "class", et = At(`qbtn ${/*activeSpan*/
      t[2] === 30 ? "active" : ""}`) + " svelte-4spgle"), W(mt, "type", "button"), W(mt, "class", ft = At(`qbtn ${/*activeSpan*/
      t[2] === 90 ? "active" : ""}`) + " svelte-4spgle"), q(N, "display", "flex"), q(N, "gap", "16px"), q(N, "flex-wrap", "wrap"), q(N, "justify-content", "flex-end"), q(s, "display", "flex"), q(s, "align-items", "center"), q(s, "gap", "20px"), q(s, "justify-content", "flex-end"), q(s, "margin-left", "auto"), W(n, "id", "controlBar"), q(n, "display", "flex"), q(n, "align-items", "center"), q(n, "gap", "12px"), q(n, "flex-wrap", "wrap"), q(n, "margin", "0 0 6px"), q(Dt, "width", "100%"), q(Dt, "display", "block"), q(Dt, "border", "0"), W(e, "class", "cgm-widget"), q(e, "contain", "layout");
    },
    m(d, M) {
      Ie(d, e, M), T(e, n), T(n, r), T(r, i), t[15](r), T(n, o), T(n, s), T(s, u), T(u, l), T(u, a), T(u, f), T(u, c), T(u, h), T(u, g), T(u, w), T(s, x), T(s, N), T(N, R), T(R, H), T(N, _), T(N, b), T(b, C), T(N, Z), T(N, X), T(X, L), T(N, V), T(N, A), T(A, D), T(N, ot), T(N, lt), T(lt, ct), T(N, vt), T(N, mt), T(mt, Tt), T(e, Lt), T(e, Dt), t[26](Dt), rt || (_t = [
        Ht(
          l,
          "click",
          /*click_handler*/
          t[16]
        ),
        Ht(
          f,
          "click",
          /*click_handler_1*/
          t[17]
        ),
        Ht(
          h,
          "click",
          /*click_handler_2*/
          t[18]
        ),
        Ht(
          w,
          "click",
          /*click_handler_3*/
          t[19]
        ),
        Ht(
          R,
          "click",
          /*click_handler_4*/
          t[20]
        ),
        Ht(
          b,
          "click",
          /*click_handler_5*/
          t[21]
        ),
        Ht(
          X,
          "click",
          /*click_handler_6*/
          t[22]
        ),
        Ht(
          A,
          "click",
          /*click_handler_7*/
          t[23]
        ),
        Ht(
          lt,
          "click",
          /*click_handler_8*/
          t[24]
        ),
        Ht(
          mt,
          "click",
          /*click_handler_9*/
          t[25]
        )
      ], rt = !0);
    },
    p(d, M) {
      M[0] & /*periodLabel*/
      8 && It(
        i,
        /*periodLabel*/
        d[3]
      ), M[0] & /*activeSpan*/
      4 && p !== (p = At(`qbtn ${/*activeSpan*/
      d[2] === 1 ? "active" : ""}`) + " svelte-4spgle") && W(R, "class", p), M[0] & /*activeSpan*/
      4 && E !== (E = At(`qbtn ${/*activeSpan*/
      d[2] === 3 ? "active" : ""}`) + " svelte-4spgle") && W(b, "class", E), M[0] & /*activeSpan*/
      4 && m !== (m = At(`qbtn ${/*activeSpan*/
      d[2] === 7 ? "active" : ""}`) + " svelte-4spgle") && W(X, "class", m), M[0] & /*activeSpan*/
      4 && G !== (G = At(`qbtn ${/*activeSpan*/
      d[2] === 14 ? "active" : ""}`) + " svelte-4spgle") && W(A, "class", G), M[0] & /*activeSpan*/
      4 && et !== (et = At(`qbtn ${/*activeSpan*/
      d[2] === 30 ? "active" : ""}`) + " svelte-4spgle") && W(lt, "class", et), M[0] & /*activeSpan*/
      4 && ft !== (ft = At(`qbtn ${/*activeSpan*/
      d[2] === 90 ? "active" : ""}`) + " svelte-4spgle") && W(mt, "class", ft);
    },
    i: kt,
    o: kt,
    d(d) {
      d && me(e), t[15](null), t[26](null), rt = !1, Pe(_t);
    }
  };
}
const Ft = 54;
function Sc(t, e, n) {
  let { data: r } = e, { initialRange: i = null } = e, { externalRange: o = null } = e, { preset: s = "N" } = e, { showMonthLabels: u = !0 } = e;
  const l = Vi();
  let a, f;
  const c = { l: 48, r: 12, t: 8, b: 8 }, h = [1, 3, 7, 14, 30, 90];
  let g, w, x = 24 * 60 * 60 * 1e3;
  const N = () => new Date(r.t0).getTime(), R = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol");
  function H() {
    return R() ? s === "T" ? {
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
  let p = 0, _ = 0, b = 0, C = 0;
  function E(v) {
    let S = h[0], F = 1 / 0;
    for (const U of h) {
      const P = Math.abs(U - v);
      P < F && (F = P, S = U);
    }
    return S;
  }
  function Z() {
    return Math.max(1, Math.floor((C - b) / x) + 1);
  }
  let X = 14;
  const L = (v) => {
    const S = new Date(v);
    return Date.UTC(S.getUTCFullYear(), S.getUTCMonth(), S.getUTCDate());
  };
  let m;
  function V() {
    m = /* @__PURE__ */ new Map();
    for (let v = 0; v < w.length; v++) {
      const S = w[v];
      if (!(Number.isFinite(S) && S >= 0)) continue;
      const F = L(g[v]);
      let U = m.get(F);
      U || (U = { valid: 0, vl: 0, l: 0, t: 0, h: 0, vh: 0 }, m.set(F, U)), U.valid++;
      const P = H();
      S < P.vlow ? U.vl++ : S < P.low ? U.l++ : S <= P.high ? U.t++ : S <= P.vhigh ? U.h++ : U.vh++;
    }
  }
  function A() {
    g = Float64Array.from({ length: r.glucose.length }, (v, S) => N() + S * r.stepMs), n(12, w = Float64Array.from(r.glucose)), p = L(g[0]), _ = L(g[g.length - 1]), n(13, b = (i == null ? void 0 : i.start) ?? p), n(14, C = (i == null ? void 0 : i.end) ?? _), V();
  }
  let D;
  function G() {
    if (!a || !(m != null && m.size)) return;
    const v = Math.max(1, window.devicePixelRatio || 1), S = Math.max(320, a.getBoundingClientRect().width || 900), F = new Date(p).getUTCFullYear(), U = new Date(_).getUTCFullYear(), P = En(F, U + 1), at = u ? 24 : c.b, gt = c.t + P.length * Ft + at;
    n(0, a.style.width = S + "px", a), n(0, a.style.height = gt + "px", a), n(0, a.width = Math.floor(S * v), a), n(0, a.height = Math.floor(gt * v), a), D.setTransform(v, 0, 0, v, 0, 0), D.clearRect(0, 0, S, gt), D.fillStyle = "#fff", D.fillRect(0, 0, S, gt);
    const pt = S - c.l - c.r;
    D.strokeStyle = "#f0f0f0", D.lineWidth = 1, P.forEach((ht, st) => {
      const I = c.t + st * Ft;
      for (let J = 1; J < 12; J++) {
        const B = Date.UTC(ht, J, 1);
        if (B < p || B > _) continue;
        const nt = (Date.UTC(ht + 1, 0, 1) - Date.UTC(ht, 0, 1)) / x, j = c.l + Math.round((B - Date.UTC(ht, 0, 1)) / x * (pt / nt));
        D.beginPath(), D.moveTo(j, I + 6), D.lineTo(j, I + Ft - 6), D.stroke();
      }
    }), P.forEach((ht, st) => {
      const I = c.t + st * Ft;
      D.fillStyle = "#444", D.font = "12px system-ui, sans-serif", D.textAlign = "right", D.textBaseline = "middle", D.fillText(String(ht), c.l - 8, I + Ft / 2);
      const J = Date.UTC(ht, 0, 1), B = Date.UTC(ht + 1, 0, 1) - x, nt = Math.round((Date.UTC(ht + 1, 0, 1) - Date.UTC(ht, 0, 1)) / x), j = (k) => c.l + Math.floor((k - Date.UTC(ht, 0, 1)) / x * (pt / nt)), Q = Ft - 10, ut = I + 5;
      for (let k = Math.max(J, p); k <= Math.min(B, _); k += x) {
        const it = j(k), yt = j(k + x), Bt = Math.max(1, yt - it), xt = m.get(k);
        if (!xt || !xt.valid) {
          D.fillStyle = "#efefef", D.globalAlpha = 1, D.fillRect(it, ut, Bt, Q);
          continue;
        }
        const ne = Math.max(1, Math.round(x / r.stepMs)), pe = {
          vl: xt.vl / xt.valid,
          l: xt.l / xt.valid,
          t: xt.t / xt.valid,
          h: xt.h / xt.valid,
          vh: xt.vh / xt.valid
        };
        let nr = ut + Q;
        const ye = (Ii, zi, Wi) => {
          const yn = Math.round(zi * Q);
          yn <= 0 || (nr -= yn, D.fillStyle = Ii, D.globalAlpha = Wi, D.fillRect(it, nr, Bt, yn));
        }, Be = xt.valid / ne >= 0.5 ? 0.8 : 0.4, Hi = xt.valid / ne >= 0.5 ? 0.9 : 0.6;
        ye("#e57373", pe.vl, Be), ye("#ff9e80", pe.l, Be), ye("#86c89d", pe.t, Hi), ye("#ffcc80", pe.h, Be), ye("#ff8a65", pe.vh, Be), D.globalAlpha = 1;
      }
    });
    const St = Math.max(p, Math.min(_, b)), Pt = Math.max(p, Math.min(_, C));
    if (P.forEach((ht, st) => {
      const I = c.t + st * Ft, J = Date.UTC(ht, 0, 1), B = Date.UTC(ht + 1, 0, 1) - 1, nt = Math.max(J, St), j = Math.min(B, Pt);
      if (nt > j) return;
      const Q = (Date.UTC(ht + 1, 0, 1) - Date.UTC(ht, 0, 1)) / x, ut = (xt) => c.l + Math.floor((xt - Date.UTC(ht, 0, 1)) / x * (pt / Q)), k = ut(nt), it = ut(j + 1), yt = I + 5, Bt = Ft - 10;
      D.save(), D.fillStyle = "rgba(107,127,161,0.28)", D.fillRect(k, yt, Math.max(1, it - k), Bt), D.strokeStyle = "#6b7fa1", D.lineWidth = 1.5, D.beginPath(), D.moveTo(k + 0.5, yt + 0.5), D.lineTo(k + 0.5, yt + Bt - 0.5), D.stroke(), D.beginPath(), D.moveTo(it - 0.5, yt + 0.5), D.lineTo(it - 0.5, yt + Bt - 0.5), D.stroke(), D.restore();
    }), u) {
      const ht = Fi("%b"), st = P[P.length - 1], I = Date.UTC(st, 0, 1), B = (Date.UTC(st + 1, 0, 1) - I) / x, nt = (ut) => c.l + Math.round((ut - I) / x * (pt / B)), Q = c.t + (P.length - 1) * Ft + Ft - 5 + 0.5;
      D.save(), D.strokeStyle = "#bbb", D.lineWidth = 1, D.fillStyle = "#555", D.font = "11px system-ui, sans-serif", D.textAlign = "center", D.textBaseline = "top";
      for (let ut = 0; ut < 12; ut++) {
        const k = Date.UTC(st, ut, 1), it = nt(k);
        D.beginPath(), D.moveTo(it, Q), D.lineTo(it, Q + 4), D.stroke(), D.fillText(ht(new Date(Date.UTC(2e3, ut, 1))), it, Q + 6);
      }
      D.restore();
    }
  }
  function ot(v, S) {
    const F = new Date(v), U = new Date(S), P = Ne("%b %e"), at = Ne("%b %e, %Y"), gt = Ne("%e, %Y"), pt = Date.UTC(F.getUTCFullYear(), F.getUTCMonth(), F.getUTCDate()), St = Date.UTC(U.getUTCFullYear(), U.getUTCMonth(), U.getUTCDate());
    return pt === St ? at(U) : F.getFullYear() === U.getFullYear() ? F.getMonth() === U.getMonth() ? `${P(F)} – ${gt(U)}` : `${P(F)} – ${at(U)}` : `${at(F)} – ${at(U)}`;
  }
  let lt = "";
  function ct() {
    const v = Z();
    n(2, X = E(v));
    const S = Math.max(0, Math.ceil((b - g[0]) / r.stepMs)), F = Math.min(w.length - 1, Math.floor((C - g[0]) / r.stepMs));
    try {
      typeof window < "u" && window.CGM_DEBUG && console.log("[CgmTir] rangechange", {
        startISO: new Date(b).toISOString(),
        endISO: new Date(C).toISOString(),
        days: v,
        startIdx: S,
        endIdx: F
      });
    } catch {
    }
    l("rangechange", {
      start: b,
      end: C,
      days: v,
      startIdx: S,
      endIdx: F
    });
  }
  function et(v) {
    n(14, C = _), n(13, b = Math.max(p, C - v * x + 1)), ct(), G();
  }
  function vt(v) {
    const S = b + v * x, F = C + v * x, U = Math.max(x, F - S);
    n(13, b = Math.max(p, Math.min(_ - U, S))), n(14, C = Math.min(_, b + U)), ct(), G();
  }
  function mt(v) {
    const S = Z() * x * v;
    vt(S / x);
  }
  function Tt() {
    const v = a;
    let S = !1, F = null, U = null, P = 0, at = 0;
    const gt = 6, pt = (st) => {
      const I = new Date(st);
      return Date.UTC(I.getUTCFullYear(), I.getUTCMonth(), I.getUTCDate());
    };
    function St() {
      const st = Math.max(320, v.getBoundingClientRect().width || 900), I = st - c.l - c.r, J = En(new Date(p).getUTCFullYear(), new Date(_).getUTCFullYear() + 1);
      return { cssW: st, plotW: I, years: J };
    }
    function Pt(st, I) {
      const J = (Date.UTC(st + 1, 0, 1) - Date.UTC(st, 0, 1)) / x;
      return (B) => c.l + Math.floor((B - Date.UTC(st, 0, 1)) / x * (I / J));
    }
    function ht(st) {
      const I = v.getBoundingClientRect(), J = st.clientX - I.left, B = st.clientY - I.top, { cssW: nt, years: j } = St(), Q = Math.floor((B - 8) / Ft);
      if (Q < 0 || Q >= j.length) return null;
      const ut = j[Q], k = c.l, it = nt - c.r, yt = Math.max(k, Math.min(it, J)), Bt = (Date.UTC(ut + 1, 0, 1) - Date.UTC(ut, 0, 1)) / x, xt = (yt - k) / (it - k);
      let ne = Date.UTC(ut, 0, 1) + xt * Bt * x;
      return ne = Math.max(p, Math.min(_, ne)), { t: ne, yr: ut, x: yt, rowIdx: Q };
    }
    v.addEventListener("mousedown", (st) => {
      const I = ht(st);
      if (!I) return;
      const { plotW: J } = St(), B = Pt(I.yr, J), nt = B(Math.max(Date.UTC(I.yr, 0, 1), b)), j = B(Math.min(Date.UTC(I.yr + 1, 0, 1) - 1, C)) + 1;
      F = "new", I.x >= nt - gt && I.x <= nt + gt ? F = "resize-l" : I.x >= j - gt && I.x <= j + gt ? F = "resize-r" : I.x > nt && I.x < j && (F = "move"), S = !0, U = I.t, P = b, at = C, document.body.style.userSelect = "none", v.style.cursor = F === "move" ? "grabbing" : F === "new" ? "crosshair" : "col-resize";
    }), window.addEventListener("mousemove", (st) => {
      const I = ht(st);
      if (!I) {
        S || (v.style.cursor = "crosshair");
        return;
      }
      if (!S) {
        const { plotW: nt } = St(), j = Pt(I.yr, nt), Q = j(Math.max(Date.UTC(I.yr, 0, 1), b)), ut = j(Math.min(Date.UTC(I.yr + 1, 0, 1) - 1, C)) + 1;
        I.x >= Q - gt && I.x <= Q + gt || I.x >= ut - gt && I.x <= ut + gt ? v.style.cursor = "col-resize" : I.x > Q && I.x < ut ? v.style.cursor = "grab" : v.style.cursor = "crosshair";
        return;
      }
      const J = I.t, B = x;
      if (F === "new") {
        const nt = pt(Math.min(U, J)), j = pt(Math.max(U, J));
        let Q = Math.max(1, Math.floor((j - nt) / B) + 1);
        const ut = E(Q);
        if (J >= U) {
          let k = nt, it = k + ut * B - 1;
          it > _ && (it = _, k = Math.max(p, it - ut * B + 1)), n(13, b = k), n(14, C = it);
        } else {
          let k = j + B - 1, it = k - ut * B + 1;
          it < p && (it = p, k = Math.min(_, it + ut * B - 1)), n(13, b = it), n(14, C = k);
        }
      } else if (F === "resize-l") {
        const nt = Math.max(1, Math.floor((at - pt(Math.min(J, at - B + 1)) + 1) / B)), j = E(nt);
        let Q = at - j * B + 1;
        Q = Math.max(p, Math.min(Q, at - B + 1)), n(13, b = Q), n(14, C = at);
      } else if (F === "resize-r") {
        const nt = Math.max(1, Math.floor((pt(J) + B - 1 - P + 1) / B)), j = E(nt);
        let Q = P + j * B - 1;
        Q = Math.min(_, Math.max(Q, P + B - 1)), n(13, b = P), n(14, C = Q);
      } else if (F === "move") {
        const nt = Math.round((pt(J) - pt(U)) / B), j = at - P + 1;
        let Q = P + nt * B;
        Q = Math.max(p, Math.min(_ - j + 1, Q)), n(13, b = Q), n(14, C = Q + j - 1);
      }
      ct(), G();
    }), window.addEventListener("mouseup", () => {
      S && (S = !1, F = null, U = null, document.body.style.userSelect = "", v.style.cursor = "crosshair");
    });
  }
  ze(() => {
    D = a.getContext("2d"), A(), G();
    const v = Math.max(0, Math.ceil((b - g[0]) / r.stepMs)), S = Math.min(w.length - 1, Math.floor((C - g[0]) / r.stepMs));
    l("ready", {
      start: b,
      end: C,
      startIdx: v,
      endIdx: S,
      days: Z()
    }), ct(), Tt();
    const F = () => G(), U = (P) => {
      const at = P.target && P.target.tagName ? P.target.tagName.toLowerCase() : "";
      if (!(at === "input" || at === "textarea" || at === "select" || P.defaultPrevented)) {
        if (/^[1-6]$/.test(P.key)) {
          const pt = {
            1: 1,
            2: 3,
            3: 7,
            4: 14,
            5: 30,
            6: 90
          }[P.key];
          et(pt), P.preventDefault();
          return;
        }
        if (P.key === "ArrowLeft" || P.key === "ArrowRight") {
          P.shiftKey ? mt(P.key === "ArrowLeft" ? -1 : 1) : vt(P.key === "ArrowLeft" ? -1 : 1), P.preventDefault();
          return;
        }
      }
    };
    return window.addEventListener("resize", F), window.addEventListener("keydown", U), () => window.removeEventListener("resize", F);
  });
  function ft(v) {
    le[v ? "unshift" : "push"](() => {
      f = v, n(1, f);
    });
  }
  const Lt = () => mt(-1), Dt = () => vt(-1), rt = () => vt(1), _t = () => mt(1), d = () => et(1), M = () => et(3), z = () => et(7), $ = () => et(14), y = () => et(30), K = () => et(90);
  function Y(v) {
    le[v ? "unshift" : "push"](() => {
      a = v, n(0, a);
    });
  }
  return t.$$set = (v) => {
    "data" in v && n(7, r = v.data), "initialRange" in v && n(8, i = v.initialRange), "externalRange" in v && n(9, o = v.externalRange), "preset" in v && n(10, s = v.preset), "showMonthLabels" in v && n(11, u = v.showMonthLabels);
  }, t.$$.update = () => {
    if (t.$$.dirty[0] & /*externalRange, viewStart, viewEnd*/
    25088 && o && typeof o.start == "number" && typeof o.end == "number") {
      const v = o.start, S = o.end;
      (v !== b || S !== C) && (n(13, b = v), n(14, C = S), ct(), G());
    }
    t.$$.dirty[0] & /*viewStart, viewEnd*/
    24576 && n(3, lt = ot(b, C)), t.$$.dirty[0] & /*values, preset*/
    5120 && w && s && (V(), G());
  }, n(2, X = E(Z())), [
    a,
    f,
    X,
    lt,
    et,
    vt,
    mt,
    r,
    i,
    o,
    s,
    u,
    w,
    b,
    C,
    ft,
    Lt,
    Dt,
    rt,
    _t,
    d,
    M,
    z,
    $,
    y,
    K,
    Y
  ];
}
class Ac extends qe {
  constructor(e) {
    super(), We(
      this,
      e,
      Sc,
      Nc,
      He,
      {
        data: 7,
        initialRange: 8,
        externalRange: 9,
        preset: 10,
        showMonthLabels: 11
      },
      null,
      [-1, -1]
    );
  }
}
function Fc(t) {
  let e, n, r, i, o, s, u, l, a, f, c, h, g, w, x, N, R, H, p, _, b, C, E, Z, X, L, m, V, A, D;
  return {
    c() {
      e = O("div"), n = O("div"), r = O("div"), r.innerHTML = "<b>Time Periods</b>", i = O("div"), o = dt(
        /*periodText*/
        t[4]
      ), s = dt(" ("), u = dt(
        /*daysCount*/
        t[5]
      ), l = dt(" days)"), a = wt(), f = O("div"), c = O("div"), h = O("b"), h.textContent = "Average Glucose", g = O("div"), g.textContent = `Goal: ${/*isMmol*/
      t[6]() ? `Target ${/*TH*/
      t[7]().low.toFixed(1)}–${/*TH*/
      t[7]().high.toFixed(1)} mmol/L` : `Target ${Math.round(
        /*TH*/
        t[7]().low
      )}–${Math.round(
        /*TH*/
        t[7]().high
      )} mg/dL`}`, w = O("div"), x = dt(
        /*avgText*/
        t[0]
      ), N = wt(), R = O("div"), H = O("div"), H.innerHTML = '<b>Glucose Management Indicator (GMI)</b><div class="muted svelte-igkjvb">Goal: &lt;7%</div>', p = O("div"), _ = dt(
        /*gmiText*/
        t[1]
      ), b = wt(), C = O("div"), E = O("div"), E.innerHTML = '<b>Glucose Variability (CV)</b><div class="muted svelte-igkjvb">Goal: ≤36%</div>', Z = O("div"), X = dt(
        /*cvText*/
        t[2]
      ), L = wt(), m = O("div"), V = dt("Time CGM Active: "), A = dt(
        /*activeText*/
        t[3]
      ), D = dt("%"), W(n, "class", "metric svelte-igkjvb"), W(g, "class", "muted svelte-igkjvb"), W(f, "class", "metric svelte-igkjvb"), W(R, "class", "metric svelte-igkjvb"), W(C, "class", "metric svelte-igkjvb"), W(m, "class", "muted svelte-igkjvb"), q(m, "font-size", "11px"), q(m, "margin-top", "6px"), W(e, "class", "summary"), q(e, "border", "1px solid #eee"), q(e, "border-radius", "8px"), q(e, "padding", "10px"), q(e, "background", "#fff");
    },
    m(G, ot) {
      Ie(G, e, ot), T(e, n), T(n, r), T(n, i), T(i, o), T(i, s), T(i, u), T(i, l), T(e, a), T(e, f), T(f, c), T(c, h), T(c, g), T(f, w), T(w, x), T(e, N), T(e, R), T(R, H), T(R, p), T(p, _), T(e, b), T(e, C), T(C, E), T(C, Z), T(Z, X), T(e, L), T(e, m), T(m, V), T(m, A), T(m, D);
    },
    p(G, [ot]) {
      ot & /*periodText*/
      16 && It(
        o,
        /*periodText*/
        G[4]
      ), ot & /*daysCount*/
      32 && It(
        u,
        /*daysCount*/
        G[5]
      ), ot & /*avgText*/
      1 && It(
        x,
        /*avgText*/
        G[0]
      ), ot & /*gmiText*/
      2 && It(
        _,
        /*gmiText*/
        G[1]
      ), ot & /*cvText*/
      4 && It(
        X,
        /*cvText*/
        G[2]
      ), ot & /*activeText*/
      8 && It(
        A,
        /*activeText*/
        G[3]
      );
    },
    i: kt,
    o: kt,
    d(G) {
      G && me(e);
    }
  };
}
function Uc(t, e, n) {
  let { data: r } = e, { range: i = null } = e, { preset: o = "N" } = e, s = "—", u = "—", l = "—", a = "—", f = "", c = 0, h, g, w = 24 * 60 * 60 * 1e3;
  const x = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), N = (p) => x() ? p * 18 : p;
  function R() {
    return x() ? o === "T" ? {
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
  function H() {
    if (!r) return;
    const p = new Date(r.t0).getTime();
    n(11, h = Float64Array.from({ length: r.glucose.length }, (_, b) => p + b * r.stepMs)), n(12, g = Float64Array.from(r.glucose));
  }
  return ze(() => {
    H();
  }), t.$$set = (p) => {
    "data" in p && n(8, r = p.data), "range" in p && n(9, i = p.range), "preset" in p && n(10, o = p.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*data*/
    256 && r && H(), t.$$.dirty & /*data, range, time, values*/
    6912 && r && i && h && g) {
      const { start: p, end: _ } = i, b = Math.max(0, Math.ceil((p - h[0]) / r.stepMs)), C = Math.min(g.length - 1, Math.floor((_ - h[0]) / r.stepMs));
      try {
        typeof window < "u" && window.CGM_DEBUG && console.log("[CgmSummary] update", {
          startISO: new Date(p).toISOString(),
          endISO: new Date(_).toISOString(),
          stepMs: r.stepMs,
          i0: b,
          i1: C,
          len: g.length
        });
      } catch {
      }
      if (C < b)
        n(0, s = "—"), n(1, u = "—"), n(2, l = "—"), n(3, a = "—"), n(4, f = ""), n(5, c = 0);
      else {
        const E = [];
        for (let mt = b; mt <= C; mt++) {
          const Tt = g[mt];
          Number.isFinite(Tt) && Tt >= 0 && E.push(Tt);
        }
        const Z = Math.max(1, C - b + 1), L = 100 * E.length / Z;
        n(3, a = `${L.toFixed(1)}%`);
        const m = po(E), V = lo(E) ?? 0, A = Math.sqrt(V), D = Number.isFinite(m) ? 3.31 + 0.02392 * N(m) : NaN, G = Number.isFinite(m) && m !== 0 ? A / m * 100 : NaN;
        n(0, s = Number.isFinite(m) ? x() ? `${m.toFixed(1)} mmol/L` : `${Math.round(m)} mg/dL` : "—"), n(1, u = Number.isFinite(D) ? `${D.toFixed(1)}%` : "—"), n(2, l = Number.isFinite(G) ? `${G.toFixed(1)}%` : "—");
        const ot = Ne("%b %e, %Y"), lt = new Date(p), ct = new Date(_);
        n(4, f = `${ot(lt)} – ${ot(ct)}`);
        const et = Date.UTC(lt.getUTCFullYear(), lt.getUTCMonth(), lt.getUTCDate()), vt = Date.UTC(ct.getUTCFullYear(), ct.getUTCMonth(), ct.getUTCDate());
        n(5, c = Math.max(1, Math.floor((vt - et) / w) + 1));
      }
    }
  }, [
    s,
    u,
    l,
    a,
    f,
    c,
    x,
    R,
    r,
    i,
    o,
    h,
    g
  ];
}
class Ec extends qe {
  constructor(e) {
    super(), We(this, e, Uc, Fc, He, { data: 8, range: 9, preset: 10 });
  }
}
function Rc(t) {
  let e, n, r, i, o, s, u, l, a, f, c, h, g, w, x, N = (
    /*pct*/
    t[0].targ.toFixed(1) + ""
  ), R, H, p, _, b, C, E, Z, X;
  return {
    c() {
      e = O("div"), n = O("div"), r = O("div"), i = wt(), o = O("div"), s = wt(), u = O("div"), l = wt(), a = O("div"), f = wt(), c = O("div"), h = wt(), g = O("div"), w = O("div"), x = O("span"), R = dt(N), H = dt("%"), p = dt(" in range "), _ = O("span"), _.textContent = "· Goal >= 70%", b = wt(), C = O("div"), E = dt(
        /*currentPresetName*/
        t[2]
      ), Z = dt(" Range Used: "), X = dt(
        /*currentRangeText*/
        t[1]
      ), W(r, "class", "seg vlow svelte-mfsfnf"), q(
        r,
        "width",
        /*pct*/
        t[0].vlow + "%"
      ), W(r, "title", "Very low"), W(o, "class", "seg low svelte-mfsfnf"), q(
        o,
        "width",
        /*pct*/
        t[0].low + "%"
      ), W(o, "title", "Low"), W(u, "class", "seg targ svelte-mfsfnf"), q(
        u,
        "width",
        /*pct*/
        t[0].targ + "%"
      ), W(u, "title", "Target"), W(a, "class", "seg high svelte-mfsfnf"), q(
        a,
        "width",
        /*pct*/
        t[0].high + "%"
      ), W(a, "title", "High"), W(c, "class", "seg vhigh svelte-mfsfnf"), q(
        c,
        "width",
        /*pct*/
        t[0].vhigh + "%"
      ), W(c, "title", "Very high"), W(n, "class", "bar svelte-mfsfnf"), W(x, "class", "strong svelte-mfsfnf"), W(_, "class", "muted svelte-mfsfnf"), W(w, "class", "left svelte-mfsfnf"), W(C, "class", "right svelte-mfsfnf"), W(g, "class", "legend svelte-mfsfnf"), W(e, "class", "tirbar svelte-mfsfnf");
    },
    m(L, m) {
      Ie(L, e, m), T(e, n), T(n, r), T(n, i), T(n, o), T(n, s), T(n, u), T(n, l), T(n, a), T(n, f), T(n, c), T(e, h), T(e, g), T(g, w), T(w, x), T(x, R), T(x, H), T(w, p), T(w, _), T(g, b), T(g, C), T(C, E), T(C, Z), T(C, X);
    },
    p(L, [m]) {
      m & /*pct*/
      1 && q(
        r,
        "width",
        /*pct*/
        L[0].vlow + "%"
      ), m & /*pct*/
      1 && q(
        o,
        "width",
        /*pct*/
        L[0].low + "%"
      ), m & /*pct*/
      1 && q(
        u,
        "width",
        /*pct*/
        L[0].targ + "%"
      ), m & /*pct*/
      1 && q(
        a,
        "width",
        /*pct*/
        L[0].high + "%"
      ), m & /*pct*/
      1 && q(
        c,
        "width",
        /*pct*/
        L[0].vhigh + "%"
      ), m & /*pct*/
      1 && N !== (N = /*pct*/
      L[0].targ.toFixed(1) + "") && It(R, N), m & /*currentPresetName*/
      4 && It(
        E,
        /*currentPresetName*/
        L[2]
      ), m & /*currentRangeText*/
      2 && It(
        X,
        /*currentRangeText*/
        L[1]
      );
    },
    i: kt,
    o: kt,
    d(L) {
      L && me(e);
    }
  };
}
function Yc(t, e, n) {
  let r, i, { data: o } = e, { range: s = null } = e, { preset: u = "N" } = e, l, a;
  const f = () => /mmol/i.test((o == null ? void 0 : o.units) || "mmol"), c = () => f() ? u === "T" ? {
    vlow: 3,
    low: 3.9,
    high: 7.8,
    vhigh: 13.9
  } : u === "P" ? {
    vlow: 3,
    low: 3.5,
    high: 7.8,
    vhigh: 13.9
  } : {
    vlow: 3,
    low: 3.9,
    high: 10,
    vhigh: 13.9
  } : u === "T" ? { vlow: 54, low: 70, high: 140, vhigh: 250 } : u === "P" ? { vlow: 54, low: 63, high: 140, vhigh: 250 } : { vlow: 54, low: 70, high: 180, vhigh: 250 };
  let h = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  };
  function g() {
    if (!o) return;
    const w = new Date(o.t0).getTime();
    n(6, l = Float64Array.from({ length: o.glucose.length }, (x, N) => w + N * o.stepMs)), n(7, a = Float64Array.from(o.glucose));
  }
  return ze(() => {
    g();
  }), t.$$set = (w) => {
    "data" in w && n(3, o = w.data), "range" in w && n(4, s = w.range), "preset" in w && n(5, u = w.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*preset*/
    32 && n(2, r = u === "T" ? "Tight" : u === "P" ? "Pregnancy" : "General"), t.$$.dirty & /*data, preset*/
    40 && n(1, i = (() => {
      const w = /mmol/i.test((o == null ? void 0 : o.units) || "mmol");
      let x, N;
      if (w) {
        u === "T" ? (x = 3.9, N = 7.8) : u === "P" ? (x = 3.5, N = 7.8) : (x = 3.9, N = 10);
        const R = (H) => {
          const p = (Math.round(H * 10) / 10).toFixed(1);
          return p.endsWith(".0") ? p.slice(0, -2) : p;
        };
        return `${R(x)}–${R(N)} mmol/L`;
      } else
        return u === "T" ? (x = 70, N = 140) : u === "P" ? (x = 63, N = 140) : (x = 70, N = 180), `${Math.round(x)}–${Math.round(N)} mg/dL`;
    })()), t.$$.dirty & /*data*/
    8 && o && g(), t.$$.dirty & /*data, range, time, values, preset*/
    248 && o && s && l && a && u) {
      const { start: w, end: x } = s, N = Math.max(0, Math.ceil((w - l[0]) / o.stepMs)), R = Math.min(a.length - 1, Math.floor((x - l[0]) / o.stepMs));
      if (R < N)
        n(0, h = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        });
      else {
        const H = c();
        let p = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, _ = 0;
        for (let b = N; b <= R; b++) {
          const C = a[b];
          Number.isFinite(C) && C >= 0 && (_++, C < H.vlow ? p.vlow++ : C < H.low ? p.low++ : C <= H.high ? p.targ++ : C <= H.vhigh ? p.high++ : p.vhigh++);
        }
        _ === 0 ? n(0, h = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }) : n(0, h = {
          vlow: p.vlow / _ * 100,
          low: p.low / _ * 100,
          targ: p.targ / _ * 100,
          high: p.high / _ * 100,
          vhigh: p.vhigh / _ * 100
        });
      }
    }
  }, [h, i, r, o, s, u, l, a];
}
class Lc extends qe {
  constructor(e) {
    super(), We(this, e, Yc, Rc, He, { data: 3, range: 4, preset: 5 });
  }
}
function Pc(t) {
  let e;
  return {
    c() {
      e = $r("svg"), q(e, "width", "100%"), q(e, "height", "260px"), q(e, "display", "block");
    },
    m(n, r) {
      Ie(n, e, r), t[6](e);
    },
    p: kt,
    i: kt,
    o: kt,
    d(n) {
      n && me(e), t[6](null);
    }
  };
}
function be(t, e) {
  if (!t.length) return NaN;
  const n = (t.length - 1) * e, r = Math.floor(n), i = n - r;
  return t[r] + (t[Math.min(t.length - 1, r + 1)] - t[r]) * (i || 0);
}
function Hc(t, e, n) {
  let { data: r } = e, { range: i = null } = e, { preset: o = "N" } = e, s, u = 900, l = 260;
  const a = { l: 50, r: 60, t: 20, b: 26 }, f = 24 * 60 * 60 * 1e3, c = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), h = () => c() ? o === "T" ? {
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
  function x() {
    const p = new Date(r.t0).getTime();
    n(4, g = Float64Array.from({ length: r.glucose.length }, (_, b) => p + b * r.stepMs)), n(5, w = Float64Array.from(r.glucose));
  }
  function N(p, _) {
    const b = Math.max(1, Math.round(f / r.stepMs)), C = Array.from({ length: b }, () => []), E = /* @__PURE__ */ new Set();
    for (let X = p; X <= _; X++) {
      const L = w[X];
      if (!(Number.isFinite(L) && L >= 0)) continue;
      const m = g[X], V = new Date(m), A = new Date(V.getFullYear(), V.getMonth(), V.getDate()).getTime();
      E.add(A);
      let D = Math.round((m - A) / r.stepMs);
      D < 0 ? D = 0 : D >= b && (D = b - 1), C[D].push(L);
    }
    return { series: C.map((X, L) => {
      const m = Float64Array.from(X).sort();
      return {
        t: L,
        p05: be(m, 0.05),
        p25: be(m, 0.25),
        p50: be(m, 0.5),
        p75: be(m, 0.75),
        p95: be(m, 0.95)
      };
    }), samplesPerDay: b };
  }
  function R() {
    if (!s || !r || !i || !g || !w) return;
    const p = s.getBoundingClientRect();
    u = Math.max(360, p.width || 900), l = Math.max(220, p.height || 260);
    const _ = Xt(s);
    _.selectAll("*").remove();
    const b = Math.max(0, Math.ceil((i.start - g[0]) / r.stepMs)), C = Math.min(w.length - 1, Math.floor((i.end - g[0]) / r.stepMs));
    if (C < b) return;
    const { series: E, samplesPerDay: Z } = N(b, C);
    if (!E.flatMap((d) => [d.p05, d.p95]).filter(Number.isFinite).length) {
      _.append("text").attr("x", a.l).attr("y", l / 2).text("Not enough data in selection to compute AGP");
      return;
    }
    const L = Re().domain([0, Z - 1]).range([a.l, u - a.r]), m = h(), V = c() ? 20 : 360, A = Re().domain([m.vlow, V]).range([l - a.b, a.t]), D = Ut().defined((d) => Number.isFinite(d.p05) && Number.isFinite(d.p95) && d.p05 < m.low).x((d) => L(d.t)).y0((d) => A(Math.min(d.p95, m.low))).y1((d) => A(d.p05)), G = Ut().defined((d) => Number.isFinite(d.p05) && Number.isFinite(d.p95) && d.p95 > m.low && d.p05 < m.high).x((d) => L(d.t)).y0((d) => A(Math.min(d.p95, m.high))).y1((d) => A(Math.max(d.p05, m.low))), ot = Ut().defined((d) => Number.isFinite(d.p05) && Number.isFinite(d.p95) && d.p95 > m.high && d.p05 < m.vhigh).x((d) => L(d.t)).y0((d) => A(Math.min(d.p95, m.vhigh))).y1((d) => A(Math.max(d.p05, m.high))), lt = Ut().defined((d) => Number.isFinite(d.p05) && Number.isFinite(d.p95) && d.p95 > m.vhigh && d.p05 < m.vhigh).x((d) => L(d.t)).y0((d) => A(d.p95)).y1((d) => A(m.vhigh)), ct = Ut().defined((d) => Number.isFinite(d.p05) && Number.isFinite(d.p95) && d.p05 > m.vhigh).x((d) => L(d.t)).y0((d) => A(d.p95)).y1((d) => A(d.p05));
    _.append("rect").attr("x", a.l).attr("width", u - a.r - a.l).attr("y", A(m.high)).attr("height", A(m.low) - A(m.high)).attr("fill", "#1a9850").attr("opacity", 0.1), _.append("path").attr("d", D(E)).attr("fill", "#d73027").attr("opacity", 0.18), _.append("path").attr("d", G(E)).attr("fill", "#1a9850").attr("opacity", 0.12), _.append("path").attr("d", ot(E)).attr("fill", "#fdae61").attr("opacity", 0.18), _.append("path").attr("d", lt(E)).attr("fill", "#f46d43").attr("opacity", 0.26), _.append("path").attr("d", ct(E)).attr("fill", "#f46d43").attr("opacity", 0.26);
    const et = Ut().defined((d) => Number.isFinite(d.p25) && Number.isFinite(d.p75) && d.p75 > m.low && d.p25 < m.high).x((d) => L(d.t)).y0((d) => A(Math.min(Math.max(d.p25, m.low), m.high))).y1((d) => A(Math.max(Math.min(d.p75, m.high), m.low))), vt = Ut().defined((d) => Number.isFinite(d.p25) && Number.isFinite(d.p75) && d.p75 > m.high && d.p25 < m.vhigh).x((d) => L(d.t)).y0((d) => A(Math.min(d.p75, m.vhigh))).y1((d) => A(Math.max(d.p25, m.high))), mt = Ut().defined((d) => Number.isFinite(d.p25) && Number.isFinite(d.p75) && d.p75 > m.vhigh && d.p25 < m.vhigh).x((d) => L(d.t)).y0((d) => A(d.p75)).y1((d) => A(m.vhigh)), Tt = Ut().defined((d) => Number.isFinite(d.p25) && Number.isFinite(d.p75) && d.p25 < m.low).x((d) => L(d.t)).y0((d) => A(d.p25)).y1((d) => A(Math.min(d.p75, m.low)));
    _.append("path").attr("d", Tt(E)).attr("fill", "#d73027").attr("opacity", 0.35), _.append("path").attr("d", et(E)).attr("fill", "#1a9850").attr("opacity", 0.25), _.append("path").attr("d", vt(E)).attr("fill", "#fdae61").attr("opacity", 0.35), _.append("path").attr("d", mt(E)).attr("fill", "#f46d43").attr("opacity", 0.45);
    try {
      let $ = function(v, S, F) {
        return v < F && S >= F || v > F && S <= F;
      }, y = function(v, S, F, U, P) {
        return { t: v + (P - S) * (F - v) / (U - S), p50: P };
      };
      const d = (v) => v < m.low ? "#d73027" : v > m.vhigh ? "#f46d43" : v > m.high ? "#fdae61" : "#1a9850", M = Se().x((v) => L(v.t)).y((v) => A(v.p50)), z = (v, S, F, U) => {
        !Number.isFinite(F.p50) || !Number.isFinite(U.p50) || ((!v.length || v[v.length - 1].color !== S) && v.push({ color: S, arr: [F] }), v[v.length - 1].arr.push(U));
      };
      let K = [], Y = null;
      for (let v = 0; v < E.length; v++) {
        const S = E[v];
        if (!Number.isFinite(S.p50)) {
          Y = null;
          continue;
        }
        if (!Y) {
          Y = S;
          continue;
        }
        const F = Y.t, U = Y.p50, P = S.t, at = S.p50;
        let gt = [{ t: F, p50: U }], pt = U, St = F;
        const Pt = [m.low, m.high, m.vhigh];
        (at > U ? Pt : Pt.slice().reverse()).forEach((I) => {
          if ($(pt, at, I)) {
            const J = y(St, pt, P, at, I);
            gt.push(J), pt = J.p50, St = J.t;
          }
        }), gt.push({ t: P, p50: at });
        for (let I = 1; I < gt.length; I++) {
          const J = gt[I - 1], B = gt[I], nt = (J.p50 + B.p50) / 2 + (B.p50 === J.p50 ? B.t > J.t ? 1e-6 : -1e-6 : 0), j = d(nt);
          z(K, j, J, B);
        }
        Y = S;
      }
      K.forEach((v) => {
        v.arr.length >= 2 && _.append("path").attr("d", M(v.arr)).attr("stroke", v.color).attr("fill", "none").attr("stroke-width", 2);
      });
    } catch {
    }
    _.append("line").attr("x1", a.l).attr("x2", u - a.r).attr("y1", A(m.high)).attr("y2", A(m.high)).attr("stroke", "#6ea77b").attr("stroke-width", 1), _.append("line").attr("x1", a.l).attr("x2", u - a.r).attr("y1", A(m.low)).attr("y2", A(m.low)).attr("stroke", "#6ea77b").attr("stroke-width", 1), _.append("line").attr("x1", a.l).attr("x2", u - a.r).attr("y1", A(m.vlow)).attr("y2", A(m.vlow)).attr("stroke", "#cccccc").attr("stroke-width", 1), _.append("line").attr("x1", a.l).attr("x2", u - a.r).attr("y1", A(m.vhigh)).attr("y2", A(m.vhigh)).attr("stroke", "#cccccc").attr("stroke-width", 1);
    const ft = 60 * 60 * 1e3 / r.stepMs, Lt = En(0, 24, 3).map((d) => Math.round(d * ft)), Dt = (d) => d === 0 || d === 24 ? "12am" : d < 12 ? `${d}am` : d === 12 ? "12pm" : `${d - 12}pm`;
    _.append("g").attr("transform", `translate(0,${l - a.b})`).call(Mo(L).tickValues(Lt).tickFormat((d) => Dt(Math.round(d / ft))).tickSizeOuter(0));
    const rt = [h().vlow, h().low, h().high, h().vhigh, c() ? 20 : 360].filter((d) => d >= m.vlow && d <= V), _t = c() ? (d) => Math.round(d * 10) / 10 : (d) => Math.round(d);
    _.append("g").attr("transform", `translate(${a.l},0)`).call(To(A).tickValues(rt).tickFormat(_t)).call((d) => d.select(".domain").remove());
    try {
      const d = ($) => {
        for (let y = E.length - 1; y >= 0; y--) {
          const K = E[y][$];
          if (Number.isFinite(K)) return { t: E[y].t, v: K };
        }
        return null;
      }, z = ($, y) => {
        if (!y) return;
        const K = Math.min(u - a.r - 2, L(y.t) + 41), Y = A(y.v);
        Xt(s).append("text").attr("x", K + 5).attr("y", Y).attr("dy", "0.35em").attr("text-anchor", "start").attr("fill", "#000").attr("font-size", 11).attr("font-weight", $ === 50 ? 700 : 400).text(`${$}%`);
      };
      z(5, d("p05")), z(25, d("p25")), z(50, d("p50")), z(75, d("p75")), z(95, d("p95"));
    } catch {
    }
    try {
      let K = function(Y) {
        const v = A(Y), S = Xt(s).append("text").attr("x", -9999).attr("y", -9999).attr("fill", "#fff").attr("font-size", 11).attr("font-weight", 700).text(y(Y)), F = S.node().getBBox();
        S.remove();
        const U = Math.ceil(F.width), P = a.l - 8 - (U + 6 * 2), at = v - 16 / 2;
        Xt(s).append("rect").attr("x", P).attr("y", at).attr("rx", 5).attr("ry", 5).attr("width", U + 6 * 2).attr("height", 16).attr("fill", $), Xt(s).append("text").attr("x", P + 6).attr("y", v).attr("dy", "0.35em").attr("fill", "#fff").attr("font-size", 11).attr("font-weight", 700).text(y(Y));
      };
      const $ = "#1a9850", y = (Y) => {
        if (c()) {
          const v = (Math.round(Y * 10) / 10).toFixed(1);
          return v.endsWith(".0") ? v.slice(0, -2) : v;
        }
        return Math.round(Y).toString();
      };
      K(m.low), K(m.high);
    } catch {
    }
  }
  ze(() => {
    x(), R(), window.addEventListener("resize", R);
  });
  function H(p) {
    le[p ? "unshift" : "push"](() => {
      s = p, n(0, s);
    });
  }
  return t.$$set = (p) => {
    "data" in p && n(1, r = p.data), "range" in p && n(2, i = p.range), "preset" in p && n(3, o = p.preset);
  }, t.$$.update = () => {
    t.$$.dirty & /*data, range, time, values, preset*/
    62 && r && i && g && w && o && R();
  }, [s, r, i, o, g, w, H];
}
class Ic extends qe {
  constructor(e) {
    super(), We(this, e, Hc, Pc, He, { data: 1, range: 2, preset: 3 });
  }
}
function zc(t) {
  let e;
  return {
    c() {
      e = $r("svg"), q(e, "width", "100%"), q(e, "display", "block");
    },
    m(n, r) {
      Ie(n, e, r), t[4](e);
    },
    p: kt,
    i: kt,
    o: kt,
    d(n) {
      n && me(e), t[4](null);
    }
  };
}
function Wc(t, e, n) {
  let { data: r } = e, { range: i = null } = e, { preset: o = "N" } = e, s;
  const u = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol");
  function l() {
    return u() ? o === "T" ? { vlow: 3, low: 3.9, high: 7.8 } : o === "P" ? { vlow: 3, low: 3.5, high: 7.8 } : { vlow: 3, low: 3.9, high: 10 } : o === "T" ? { vlow: 54, low: 70, high: 140 } : o === "P" ? { vlow: 54, low: 63, high: 140 } : { vlow: 54, low: 70, high: 180 };
  }
  let a, f;
  function c() {
    if (!r) return;
    const w = new Date(r.t0).getTime();
    a = Float64Array.from({ length: r.glucose.length }, (x, N) => w + N * r.stepMs), f = Float64Array.from(r.glucose);
  }
  function h() {
    if (!s || !r || !i || !a || !f) return;
    const w = Xt(s);
    w.selectAll("*").remove();
    const x = s.getBoundingClientRect(), N = Math.max(360, x.width || 1100), R = 7, H = 0, p = { l: 50, r: 20, t: 30, b: 10 }, _ = Math.max(140, Math.floor((N - p.l - p.r - (R - 1) * H) / R)), b = 86, C = 18, E = 24 * 60 * 60 * 1e3, Z = i.start, X = i.end, L = Le.floor(new Date(Z)).getTime(), m = Le.floor(new Date(X)).getTime(), V = new Date(L), A = new Date(m), D = (V.getDay() + 6) % 7, G = 7 - (A.getDay() + 6) % 7 - 1, ot = L - D * E, lt = m + G * E, ct = [];
    for (let rt = ot; rt <= lt; rt += E) ct.push(rt);
    const et = ct.length, vt = Math.ceil(et / R), mt = p.t + vt * b + (vt - 1) * H + p.b;
    s.setAttribute("height", mt);
    const Tt = new Map(ct.map((rt) => [rt, []]));
    for (let rt = 0; rt < f.length; rt++) {
      const _t = f[rt];
      if (!(Number.isFinite(_t) && _t >= 0)) continue;
      const d = a[rt];
      if (d < ot || d > lt + E) continue;
      const M = new Date(d), z = new Date(M.getFullYear(), M.getMonth(), M.getDate()).getTime();
      Tt.has(z) && Tt.get(z).push({ t: d - z, v: _t, a: d });
    }
    const ft = l(), Lt = 60 * 60 * 1e3 / r.stepMs;
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].forEach((rt, _t) => {
      vt > 0 && Xt(s).append("text").attr("x", p.l + _t * (_ + H) + _ / 2).attr("y", 16).attr("text-anchor", "middle").attr("fill", "#555").attr("font-size", 10).text(rt);
    });
    for (let rt = 1; rt <= R - 1; rt++) {
      const _t = p.l + rt * (_ + H);
      for (let d = 0; d < vt; d++) {
        const M = p.t + d * (b + H);
        Xt(s).append("line").attr("x1", _t).attr("x2", _t).attr("y1", M + 4).attr("y2", M + b - 4).attr("stroke", "#e6e6e6").attr("stroke-width", 1);
      }
    }
    ct.forEach((rt, _t) => {
      const d = Math.floor(_t / R), M = _t % R, z = p.l + M * (_ + H), $ = p.t + d * (b + H), y = w.append("g").attr("transform", `translate(${z},${$})`), K = Re().domain([0, 24 * Lt - 1]).range([0, _]), Y = Re().domain(u() ? [0, 20] : [0, 360]).range([b - C, 0]);
      y.append("rect").attr("x", 0).attr("y", Y(ft.high)).attr("width", _).attr("height", Math.max(1, Y(ft.low) - Y(ft.high))).attr("fill", "#efefef"), y.append("line").attr("x1", 0).attr("x2", _).attr("y1", Y(ft.high)).attr("y2", Y(ft.high)).attr("stroke", "#2e7d32").attr("opacity", 0.7), y.append("line").attr("x1", 0).attr("x2", _).attr("y1", Y(ft.low)).attr("y2", Y(ft.low)).attr("stroke", "#2e7d32").attr("opacity", 0.7);
      const v = (Tt.get(rt) || []).slice().sort((k, it) => k.t - it.t), S = 2 * r.stepMs, F = [];
      let U = [];
      for (const k of v) {
        if (!Number.isFinite(k.v)) {
          U.length && (F.push(U), U = []);
          continue;
        }
        U.length && k.t - U[U.length - 1].t > S ? (F.push(U), U = [k]) : U.push(k);
      }
      U.length && F.push(U);
      const P = (k) => k.a >= Z && k.a <= X, at = Ut().defined((k) => Number.isFinite(k.v) && k.v > ft.high && P(k)).x((k) => K(k.t / r.stepMs)).y0((k) => Y(ft.high)).y1((k) => Y(k.v));
      F.forEach((k) => {
        k.length > 1 && y.append("path").attr("d", at(k)).attr("fill", "#fdae61").attr("opacity", 0.35);
      });
      const gt = Ut().defined((k) => Number.isFinite(k.v) && k.v < ft.low && P(k)).x((k) => K(k.t / r.stepMs)).y0((k) => Y(k.v)).y1((k) => Y(ft.low));
      F.forEach((k) => {
        k.length > 1 && y.append("path").attr("d", gt(k)).attr("fill", "#d73027").attr("opacity", 0.25);
      }), Se().x((k) => K(k.t / r.stepMs)).y((k) => Y(k.v)).curve(Sn);
      const pt = (k) => Number.isFinite(k.v) && P(k) && k.v >= ft.low && k.v <= ft.high, St = (k) => Number.isFinite(k.v) && P(k) && k.v < ft.low, Pt = (k) => Number.isFinite(k.v) && P(k) && k.v > ft.high, ht = (k, it) => Se().defined(k).x((yt) => K(yt.t / r.stepMs)).y((yt) => Y(yt.v)).curve(Sn), st = ht(pt), I = ht(St), J = ht(Pt);
      F.forEach((k) => {
        if (k.length > 1) {
          const it = Se().defined((yt) => Number.isFinite(yt.v) && !P(yt)).x((yt) => K(yt.t / r.stepMs)).y((yt) => Y(yt.v)).curve(Sn);
          y.append("path").attr("d", it(k)).attr("stroke", "#c7c7c7").attr("fill", "none").attr("stroke-width", 1.2).attr("opacity", 0.8), y.append("path").attr("d", I(k)).attr("stroke", "#d73027").attr("fill", "none").attr("stroke-width", 1.5), y.append("path").attr("d", J(k)).attr("stroke", "#fdae61").attr("fill", "none").attr("stroke-width", 1.5), y.append("path").attr("d", st(k)).attr("stroke", "#1a9850").attr("fill", "none").attr("stroke-width", 1.5);
        }
      });
      const B = new Date(rt), nt = B.getDate(), ut = nt === 1 ? `1 ${[
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
      ][B.getMonth()]}` : String(nt);
      y.append("text").attr("x", -12).attr("y", -8).attr("fill", "#777").attr("font-size", 10).attr("text-anchor", "start").text(ut), d < vt - 1 && y.append("text").attr("x", _ / 2).attr("y", b - 2).attr("text-anchor", "middle").attr("fill", "#777").attr("font-size", 10).text("12pm");
    });
  }
  ze(() => {
    c(), h(), window.addEventListener("resize", h);
  });
  function g(w) {
    le[w ? "unshift" : "push"](() => {
      s = w, n(0, s);
    });
  }
  return t.$$set = (w) => {
    "data" in w && n(1, r = w.data), "range" in w && n(2, i = w.range), "preset" in w && n(3, o = w.preset);
  }, t.$$.update = () => {
    t.$$.dirty & /*data, range, preset*/
    14 && r && i && o && h();
  }, [s, r, i, o, g];
}
class qc extends qe {
  constructor(e) {
    super(), We(this, e, Wc, zc, He, { data: 1, range: 2, preset: 3 });
  }
}
function zr(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  const i = new Ac({ target: r, props: { data: e, initialRange: n.initialRange ?? null, externalRange: null, preset: n.preset || "N", showMonthLabels: n.monthLabels ?? !0 } }), o = /* @__PURE__ */ new Map();
  let s = n.initialRange ?? null;
  function u(c, h) {
    const g = o.get(c) || [];
    g.push(h), o.set(c, g);
  }
  i.$on("rangechange", (c) => {
    var g;
    const h = c.detail;
    s = { start: h.start, end: h.end }, (g = o.get("rangechange")) == null || g.forEach((w) => w(h));
  }), i.$on("ready", (c) => {
    var g;
    const h = c.detail;
    s = { start: h.start, end: h.end }, (g = o.get("ready")) == null || g.forEach((w) => w(h));
  });
  function l(c, h) {
    if (typeof c == "number" && typeof h == "number")
      i.$set({ externalRange: { start: c, end: h } });
    else if (c && typeof c.start == "number" && typeof c.end == "number")
      i.$set({ externalRange: { start: c.start, end: c.end } });
    else
      throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function a() {
    return s;
  }
  function f(c) {
    i.$set({ preset: c });
  }
  return { on: u, setRange: l, getRange: a, setPreset: f, destroy: () => i.$destroy() };
}
typeof window < "u" && (window.createTirCalendar = zr, window.createCgmTir = zr);
function $c(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = new Ec({ target: r, props: { data: e, range: i, preset: n.preset || "N" } });
  function s(a, f) {
    if (typeof a == "number" && typeof f == "number")
      o.$set({ range: { start: a, end: f } });
    else if (a && typeof a.start == "number" && typeof a.end == "number")
      o.$set({ range: a });
    else
      throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function u(a) {
    o.$set({ data: a });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: a, end: f }) => s({ start: a, end: f })), n.source.on("ready", ({ start: a, end: f }) => s({ start: a, end: f })), typeof n.source.getRange == "function")) {
    const a = n.source.getRange();
    a && typeof a.start == "number" && typeof a.end == "number" && s(a);
  }
  function l(a) {
    o.$set({ preset: a });
  }
  return { setRange: s, setData: u, setPreset: l, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmSummary = $c);
function Oc(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = new Lc({ target: r, props: { data: e, range: i, preset: n.preset || "N" } });
  function s(a, f) {
    if (typeof a == "number" && typeof f == "number") o.$set({ range: { start: a, end: f } });
    else if (a && typeof a.start == "number" && typeof a.end == "number") o.$set({ range: a });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function u(a) {
    o.$set({ data: a });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: a, end: f }) => s({ start: a, end: f })), n.source.on("ready", ({ start: a, end: f }) => s({ start: a, end: f })), typeof n.source.getRange == "function")) {
    const a = n.source.getRange();
    a && typeof a.start == "number" && typeof a.end == "number" && s(a);
  }
  function l(a) {
    o.$set({ preset: a });
  }
  return { setRange: s, setData: u, setPreset: l, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmTirBar = Oc);
function Bc(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = new Ic({ target: r, props: { data: e, range: i, preset: n.preset || "N" } });
  function s(a, f) {
    if (typeof a == "number" && typeof f == "number") o.$set({ range: { start: a, end: f } });
    else if (a && typeof a.start == "number" && typeof a.end == "number") o.$set({ range: a });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function u(a) {
    o.$set({ data: a });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: a, end: f }) => s({ start: a, end: f })), n.source.on("ready", ({ start: a, end: f }) => s({ start: a, end: f })), typeof n.source.getRange == "function")) {
    const a = n.source.getRange();
    a && typeof a.start == "number" && typeof a.end == "number" && s(a);
  }
  function l(a) {
    o.$set({ preset: a });
  }
  return { setRange: s, setData: u, setPreset: l, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmAgp = Bc);
function Xc(t, e, n = {}) {
  const r = document.getElementById(t);
  if (!r) throw new Error(`No element with id "${t}"`);
  let i = n.initialRange || null;
  const o = new qc({ target: r, props: { data: e, range: i, preset: n.preset || "N" } });
  function s(a, f) {
    if (typeof a == "number" && typeof f == "number") o.$set({ range: { start: a, end: f } });
    else if (a && typeof a.start == "number" && typeof a.end == "number") o.$set({ range: a });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function u(a) {
    o.$set({ data: a });
  }
  function l(a) {
    o.$set({ preset: a });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: a, end: f }) => s({ start: a, end: f })), n.source.on("ready", ({ start: a, end: f }) => s({ start: a, end: f })), typeof n.source.getRange == "function")) {
    const a = n.source.getRange();
    a && typeof a.start == "number" && typeof a.end == "number" && s(a);
  }
  return { setRange: s, setData: u, setPreset: l, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createCgmStrips = Xc);
export {
  Bc as createCgmAgp,
  Xc as createCgmStrips,
  $c as createCgmSummary,
  Oc as createCgmTirBar,
  zr as createTirCalendar
};

var wl = Object.defineProperty;
var vl = (t, e, n) => e in t ? wl(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var yi = (t, e, n) => vl(t, typeof e != "symbol" ? e + "" : e, n);
function Nt() {
}
function yo(t) {
  return t();
}
function dr() {
  return /* @__PURE__ */ Object.create(null);
}
function Hn(t) {
  t.forEach(yo);
}
function _o(t) {
  return typeof t == "function";
}
function se(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function pl(t) {
  return Object.keys(t).length === 0;
}
function ce(t) {
  return t ?? "";
}
function h(t, e) {
  t.appendChild(e);
}
function bt(t, e, n) {
  t.insertBefore(e, n || null);
}
function _t(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function Y(t) {
  return document.createElement(t);
}
function X(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function z(t) {
  return document.createTextNode(t);
}
function j() {
  return z(" ");
}
function me() {
  return z("");
}
function Ve(t, e, n, i) {
  return t.addEventListener(e, n, i), () => t.removeEventListener(e, n, i);
}
function f(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function yl(t) {
  return Array.from(t.childNodes);
}
function Ct(t, e) {
  e = "" + e, t.data !== e && (t.data = /** @type {string} */
  e);
}
function G(t, e, n, i) {
  n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, "");
}
function _l(t, e, { bubbles: n = !1, cancelable: i = !1 } = {}) {
  return new CustomEvent(t, { detail: e, bubbles: n, cancelable: i });
}
let En;
function Dn(t) {
  En = t;
}
function bo() {
  if (!En) throw new Error("Function called outside component initialization");
  return En;
}
function Ne(t) {
  bo().$$.on_mount.push(t);
}
function gn() {
  const t = bo();
  return (e, n, { cancelable: i = !1 } = {}) => {
    const o = t.$$.callbacks[e];
    if (o) {
      const r = _l(
        /** @type {string} */
        e,
        n,
        { cancelable: i }
      );
      return o.slice().forEach((s) => {
        s.call(t, r);
      }), !r.defaultPrevented;
    }
    return !0;
  };
}
const nn = [], Ce = [];
let on = [];
const mr = [], bl = /* @__PURE__ */ Promise.resolve();
let Fi = !1;
function xl() {
  Fi || (Fi = !0, bl.then(xo));
}
function Ei(t) {
  on.push(t);
}
const _i = /* @__PURE__ */ new Set();
let tn = 0;
function xo() {
  if (tn !== 0)
    return;
  const t = En;
  do {
    try {
      for (; tn < nn.length; ) {
        const e = nn[tn];
        tn++, Dn(e), Ml(e.$$);
      }
    } catch (e) {
      throw nn.length = 0, tn = 0, e;
    }
    for (Dn(null), nn.length = 0, tn = 0; Ce.length; ) Ce.pop()();
    for (let e = 0; e < on.length; e += 1) {
      const n = on[e];
      _i.has(n) || (_i.add(n), n());
    }
    on.length = 0;
  } while (nn.length);
  for (; mr.length; )
    mr.pop()();
  Fi = !1, _i.clear(), Dn(t);
}
function Ml(t) {
  if (t.fragment !== null) {
    t.update(), Hn(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(Ei);
  }
}
function Tl(t) {
  const e = [], n = [];
  on.forEach((i) => t.indexOf(i) === -1 ? e.push(i) : n.push(i)), n.forEach((i) => i()), on = e;
}
const kl = /* @__PURE__ */ new Set();
function Cl(t, e) {
  t && t.i && (kl.delete(t), t.i(e));
}
function Nl(t, e, n) {
  const { fragment: i, after_update: o } = t.$$;
  i && i.m(e, n), Ei(() => {
    const r = t.$$.on_mount.map(yo).filter(_o);
    t.$$.on_destroy ? t.$$.on_destroy.push(...r) : Hn(r), t.$$.on_mount = [];
  }), o.forEach(Ei);
}
function Al(t, e) {
  const n = t.$$;
  n.fragment !== null && (Tl(n.after_update), Hn(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function Dl(t, e) {
  t.$$.dirty[0] === -1 && (nn.push(t), xl(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function fe(t, e, n, i, o, r, s = null, u = [-1]) {
  const a = En;
  Dn(t);
  const l = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: r,
    update: Nt,
    not_equal: o,
    bound: dr(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (a ? a.$$.context : [])),
    // everything else
    callbacks: dr(),
    dirty: u,
    skip_bound: !1,
    root: e.target || a.$$.root
  };
  s && s(l.root);
  let g = !1;
  if (l.ctx = n ? n(t, e.props || {}, (d, m, ...c) => {
    const v = c.length ? c[0] : m;
    return l.ctx && o(l.ctx[d], l.ctx[d] = v) && (!l.skip_bound && l.bound[d] && l.bound[d](v), g && Dl(t, d)), m;
  }) : [], l.update(), g = !0, Hn(l.before_update), l.fragment = i ? i(l.ctx) : !1, e.target) {
    if (e.hydrate) {
      const d = yl(e.target);
      l.fragment && l.fragment.l(d), d.forEach(_t);
    } else
      l.fragment && l.fragment.c();
    e.intro && Cl(t.$$.fragment), Nl(t, e.target, e.anchor), xo();
  }
  Dn(a);
}
class ue {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    yi(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    yi(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    Al(this, 1), this.$destroy = Nt;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, n) {
    if (!_o(n))
      return Nt;
    const i = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return i.push(n), () => {
      const o = i.indexOf(n);
      o !== -1 && i.splice(o, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(e) {
    this.$$set && !pl(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const Sl = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(Sl);
function Jn(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Fl(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Mo(t) {
  let e, n, i;
  t.length !== 2 ? (e = Jn, n = (u, a) => Jn(t(u), a), i = (u, a) => t(u) - a) : (e = t === Jn || t === Fl ? t : El, n = t, i = t);
  function o(u, a, l = 0, g = u.length) {
    if (l < g) {
      if (e(a, a) !== 0) return g;
      do {
        const d = l + g >>> 1;
        n(u[d], a) < 0 ? l = d + 1 : g = d;
      } while (l < g);
    }
    return l;
  }
  function r(u, a, l = 0, g = u.length) {
    if (l < g) {
      if (e(a, a) !== 0) return g;
      do {
        const d = l + g >>> 1;
        n(u[d], a) <= 0 ? l = d + 1 : g = d;
      } while (l < g);
    }
    return l;
  }
  function s(u, a, l = 0, g = u.length) {
    const d = o(u, a, l, g - 1);
    return d > l && i(u[d - 1], a) > -i(u[d], a) ? d - 1 : d;
  }
  return { left: o, center: s, right: r };
}
function El() {
  return 0;
}
function Rl(t) {
  return t === null ? NaN : +t;
}
const Ll = Mo(Jn), Ul = Ll.right;
Mo(Rl).center;
function Pl(t, e) {
  let n = 0, i, o = 0, r = 0;
  for (let s of t)
    s != null && (s = +s) >= s && (i = s - o, o += i / ++n, r += i * (s - o));
  if (n > 1) return r / (n - 1);
}
const Hl = Math.sqrt(50), zl = Math.sqrt(10), Yl = Math.sqrt(2);
function ti(t, e, n) {
  const i = (e - t) / Math.max(0, n), o = Math.floor(Math.log10(i)), r = i / Math.pow(10, o), s = r >= Hl ? 10 : r >= zl ? 5 : r >= Yl ? 2 : 1;
  let u, a, l;
  return o < 0 ? (l = Math.pow(10, -o) / s, u = Math.round(t * l), a = Math.round(e * l), u / l < t && ++u, a / l > e && --a, l = -l) : (l = Math.pow(10, o) * s, u = Math.round(t / l), a = Math.round(e / l), u * l < t && ++u, a * l > e && --a), a < u && 0.5 <= n && n < 2 ? ti(t, e, n * 2) : [u, a, l];
}
function Il(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const i = e < t, [o, r, s] = i ? ti(e, t, n) : ti(t, e, n);
  if (!(r >= o)) return [];
  const u = r - o + 1, a = new Array(u);
  if (i)
    if (s < 0) for (let l = 0; l < u; ++l) a[l] = (r - l) / -s;
    else for (let l = 0; l < u; ++l) a[l] = (r - l) * s;
  else if (s < 0) for (let l = 0; l < u; ++l) a[l] = (o + l) / -s;
  else for (let l = 0; l < u; ++l) a[l] = (o + l) * s;
  return a;
}
function Ri(t, e, n) {
  return e = +e, t = +t, n = +n, ti(t, e, n)[2];
}
function Vl(t, e, n) {
  e = +e, t = +t, n = +n;
  const i = e < t, o = i ? Ri(e, t, n) : Ri(t, e, n);
  return (i ? -1 : 1) * (o < 0 ? 1 / -o : o);
}
function Wl(t, e) {
  let n = 0, i = 0;
  for (let o of t)
    o != null && (o = +o) >= o && (++n, i += o);
  if (n) return i / n;
}
function Li(t, e, n) {
  t = +t, e = +e, n = (o = arguments.length) < 2 ? (e = t, t = 0, 1) : o < 3 ? 1 : +n;
  for (var i = -1, o = Math.max(0, Math.ceil((e - t) / n)) | 0, r = new Array(o); ++i < o; )
    r[i] = t + i * n;
  return r;
}
function ql(t) {
  return t;
}
var bi = 1, xi = 2, Ui = 3, kn = 4, wr = 1e-6;
function Bl(t) {
  return "translate(" + t + ",0)";
}
function Xl(t) {
  return "translate(0," + t + ")";
}
function Gl(t) {
  return (e) => +t(e);
}
function Zl(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function Ql() {
  return !this.__axis;
}
function To(t, e) {
  var n = [], i = null, o = null, r = 6, s = 6, u = 3, a = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, l = t === bi || t === kn ? -1 : 1, g = t === kn || t === xi ? "x" : "y", d = t === bi || t === Ui ? Bl : Xl;
  function m(c) {
    var v = i ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), w = o ?? (e.tickFormat ? e.tickFormat.apply(e, n) : ql), E = Math.max(r, 0) + u, D = e.range(), M = +D[0] + a, T = +D[D.length - 1] + a, b = (e.bandwidth ? Zl : Gl)(e.copy(), a), L = c.selection ? c.selection() : c, N = L.selectAll(".domain").data([null]), H = L.selectAll(".tick").data(v, e).order(), A = H.exit(), x = H.enter().append("g").attr("class", "tick"), C = H.select("line"), y = H.select("text");
    N = N.merge(N.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), H = H.merge(x), C = C.merge(x.append("line").attr("stroke", "currentColor").attr(g + "2", l * r)), y = y.merge(x.append("text").attr("fill", "currentColor").attr(g, l * E).attr("dy", t === bi ? "0em" : t === Ui ? "0.71em" : "0.32em")), c !== L && (N = N.transition(c), H = H.transition(c), C = C.transition(c), y = y.transition(c), A = A.transition(c).attr("opacity", wr).attr("transform", function(_) {
      return isFinite(_ = b(_)) ? d(_ + a) : this.getAttribute("transform");
    }), x.attr("opacity", wr).attr("transform", function(_) {
      var S = this.parentNode.__axis;
      return d((S && isFinite(S = S(_)) ? S : b(_)) + a);
    })), A.remove(), N.attr("d", t === kn || t === xi ? s ? "M" + l * s + "," + M + "H" + a + "V" + T + "H" + l * s : "M" + a + "," + M + "V" + T : s ? "M" + M + "," + l * s + "V" + a + "H" + T + "V" + l * s : "M" + M + "," + a + "H" + T), H.attr("opacity", 1).attr("transform", function(_) {
      return d(b(_) + a);
    }), C.attr(g + "2", l * r), y.attr(g, l * E).text(w), L.filter(Ql).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === xi ? "start" : t === kn ? "end" : "middle"), L.each(function() {
      this.__axis = b;
    });
  }
  return m.scale = function(c) {
    return arguments.length ? (e = c, m) : e;
  }, m.ticks = function() {
    return n = Array.from(arguments), m;
  }, m.tickArguments = function(c) {
    return arguments.length ? (n = c == null ? [] : Array.from(c), m) : n.slice();
  }, m.tickValues = function(c) {
    return arguments.length ? (i = c == null ? null : Array.from(c), m) : i && i.slice();
  }, m.tickFormat = function(c) {
    return arguments.length ? (o = c, m) : o;
  }, m.tickSize = function(c) {
    return arguments.length ? (r = s = +c, m) : r;
  }, m.tickSizeInner = function(c) {
    return arguments.length ? (r = +c, m) : r;
  }, m.tickSizeOuter = function(c) {
    return arguments.length ? (s = +c, m) : s;
  }, m.tickPadding = function(c) {
    return arguments.length ? (u = +c, m) : u;
  }, m.offset = function(c) {
    return arguments.length ? (a = +c, m) : a;
  }, m;
}
function Ol(t) {
  return To(Ui, t);
}
function Jl(t) {
  return To(kn, t);
}
var Kl = { value: () => {
} };
function ko() {
  for (var t = 0, e = arguments.length, n = {}, i; t < e; ++t) {
    if (!(i = arguments[t] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new Kn(n);
}
function Kn(t) {
  this._ = t;
}
function $l(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var i = "", o = n.indexOf(".");
    if (o >= 0 && (i = n.slice(o + 1), n = n.slice(0, o)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
Kn.prototype = ko.prototype = {
  constructor: Kn,
  on: function(t, e) {
    var n = this._, i = $l(t + "", n), o, r = -1, s = i.length;
    if (arguments.length < 2) {
      for (; ++r < s; ) if ((o = (t = i[r]).type) && (o = jl(n[o], t.name))) return o;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++r < s; )
      if (o = (t = i[r]).type) n[o] = vr(n[o], t.name, e);
      else if (e == null) for (o in n) n[o] = vr(n[o], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Kn(t);
  },
  call: function(t, e) {
    if ((o = arguments.length - 2) > 0) for (var n = new Array(o), i = 0, o, r; i < o; ++i) n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var i = this._[t], o = 0, r = i.length; o < r; ++o) i[o].value.apply(e, n);
  }
};
function jl(t, e) {
  for (var n = 0, i = t.length, o; n < i; ++n)
    if ((o = t[n]).name === e)
      return o.value;
}
function vr(t, e, n) {
  for (var i = 0, o = t.length; i < o; ++i)
    if (t[i].name === e) {
      t[i] = Kl, t = t.slice(0, i).concat(t.slice(i + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Pi = "http://www.w3.org/1999/xhtml";
const pr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Pi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function gi(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), pr.hasOwnProperty(e) ? { space: pr[e], local: t } : t;
}
function ta(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Pi && e.documentElement.namespaceURI === Pi ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function ea(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Co(t) {
  var e = gi(t);
  return (e.local ? ea : ta)(e);
}
function na() {
}
function Gi(t) {
  return t == null ? na : function() {
    return this.querySelector(t);
  };
}
function ia(t) {
  typeof t != "function" && (t = Gi(t));
  for (var e = this._groups, n = e.length, i = new Array(n), o = 0; o < n; ++o)
    for (var r = e[o], s = r.length, u = i[o] = new Array(s), a, l, g = 0; g < s; ++g)
      (a = r[g]) && (l = t.call(a, a.__data__, g, r)) && ("__data__" in a && (l.__data__ = a.__data__), u[g] = l);
  return new ae(i, this._parents);
}
function ra(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function oa() {
  return [];
}
function No(t) {
  return t == null ? oa : function() {
    return this.querySelectorAll(t);
  };
}
function la(t) {
  return function() {
    return ra(t.apply(this, arguments));
  };
}
function aa(t) {
  typeof t == "function" ? t = la(t) : t = No(t);
  for (var e = this._groups, n = e.length, i = [], o = [], r = 0; r < n; ++r)
    for (var s = e[r], u = s.length, a, l = 0; l < u; ++l)
      (a = s[l]) && (i.push(t.call(a, a.__data__, l, s)), o.push(a));
  return new ae(i, o);
}
function Ao(t) {
  return function() {
    return this.matches(t);
  };
}
function Do(t) {
  return function(e) {
    return e.matches(t);
  };
}
var sa = Array.prototype.find;
function fa(t) {
  return function() {
    return sa.call(this.children, t);
  };
}
function ua() {
  return this.firstElementChild;
}
function ha(t) {
  return this.select(t == null ? ua : fa(typeof t == "function" ? t : Do(t)));
}
var ca = Array.prototype.filter;
function ga() {
  return Array.from(this.children);
}
function da(t) {
  return function() {
    return ca.call(this.children, t);
  };
}
function ma(t) {
  return this.selectAll(t == null ? ga : da(typeof t == "function" ? t : Do(t)));
}
function wa(t) {
  typeof t != "function" && (t = Ao(t));
  for (var e = this._groups, n = e.length, i = new Array(n), o = 0; o < n; ++o)
    for (var r = e[o], s = r.length, u = i[o] = [], a, l = 0; l < s; ++l)
      (a = r[l]) && t.call(a, a.__data__, l, r) && u.push(a);
  return new ae(i, this._parents);
}
function So(t) {
  return new Array(t.length);
}
function va() {
  return new ae(this._enter || this._groups.map(So), this._parents);
}
function ei(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
ei.prototype = {
  constructor: ei,
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
function pa(t) {
  return function() {
    return t;
  };
}
function ya(t, e, n, i, o, r) {
  for (var s = 0, u, a = e.length, l = r.length; s < l; ++s)
    (u = e[s]) ? (u.__data__ = r[s], i[s] = u) : n[s] = new ei(t, r[s]);
  for (; s < a; ++s)
    (u = e[s]) && (o[s] = u);
}
function _a(t, e, n, i, o, r, s) {
  var u, a, l = /* @__PURE__ */ new Map(), g = e.length, d = r.length, m = new Array(g), c;
  for (u = 0; u < g; ++u)
    (a = e[u]) && (m[u] = c = s.call(a, a.__data__, u, e) + "", l.has(c) ? o[u] = a : l.set(c, a));
  for (u = 0; u < d; ++u)
    c = s.call(t, r[u], u, r) + "", (a = l.get(c)) ? (i[u] = a, a.__data__ = r[u], l.delete(c)) : n[u] = new ei(t, r[u]);
  for (u = 0; u < g; ++u)
    (a = e[u]) && l.get(m[u]) === a && (o[u] = a);
}
function ba(t) {
  return t.__data__;
}
function xa(t, e) {
  if (!arguments.length) return Array.from(this, ba);
  var n = e ? _a : ya, i = this._parents, o = this._groups;
  typeof t != "function" && (t = pa(t));
  for (var r = o.length, s = new Array(r), u = new Array(r), a = new Array(r), l = 0; l < r; ++l) {
    var g = i[l], d = o[l], m = d.length, c = Ma(t.call(g, g && g.__data__, l, i)), v = c.length, w = u[l] = new Array(v), E = s[l] = new Array(v), D = a[l] = new Array(m);
    n(g, d, w, E, D, c, e);
    for (var M = 0, T = 0, b, L; M < v; ++M)
      if (b = w[M]) {
        for (M >= T && (T = M + 1); !(L = E[T]) && ++T < v; ) ;
        b._next = L || null;
      }
  }
  return s = new ae(s, i), s._enter = u, s._exit = a, s;
}
function Ma(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ta() {
  return new ae(this._exit || this._groups.map(So), this._parents);
}
function ka(t, e, n) {
  var i = this.enter(), o = this, r = this.exit();
  return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), e != null && (o = e(o), o && (o = o.selection())), n == null ? r.remove() : n(r), i && o ? i.merge(o).order() : o;
}
function Ca(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, i = e._groups, o = n.length, r = i.length, s = Math.min(o, r), u = new Array(o), a = 0; a < s; ++a)
    for (var l = n[a], g = i[a], d = l.length, m = u[a] = new Array(d), c, v = 0; v < d; ++v)
      (c = l[v] || g[v]) && (m[v] = c);
  for (; a < o; ++a)
    u[a] = n[a];
  return new ae(u, this._parents);
}
function Na() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], o = i.length - 1, r = i[o], s; --o >= 0; )
      (s = i[o]) && (r && s.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(s, r), r = s);
  return this;
}
function Aa(t) {
  t || (t = Da);
  function e(d, m) {
    return d && m ? t(d.__data__, m.__data__) : !d - !m;
  }
  for (var n = this._groups, i = n.length, o = new Array(i), r = 0; r < i; ++r) {
    for (var s = n[r], u = s.length, a = o[r] = new Array(u), l, g = 0; g < u; ++g)
      (l = s[g]) && (a[g] = l);
    a.sort(e);
  }
  return new ae(o, this._parents).order();
}
function Da(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Sa() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Fa() {
  return Array.from(this);
}
function Ea() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], o = 0, r = i.length; o < r; ++o) {
      var s = i[o];
      if (s) return s;
    }
  return null;
}
function Ra() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function La() {
  return !this.node();
}
function Ua(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var o = e[n], r = 0, s = o.length, u; r < s; ++r)
      (u = o[r]) && t.call(u, u.__data__, r, o);
  return this;
}
function Pa(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ha(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function za(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Ya(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Ia(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Va(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Wa(t, e) {
  var n = gi(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Ha : Pa : typeof e == "function" ? n.local ? Va : Ia : n.local ? Ya : za)(n, e));
}
function Fo(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function qa(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ba(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Xa(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function Ga(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? qa : typeof e == "function" ? Xa : Ba)(t, e, n ?? "")) : an(this.node(), t);
}
function an(t, e) {
  return t.style.getPropertyValue(e) || Fo(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Za(t) {
  return function() {
    delete this[t];
  };
}
function Qa(t, e) {
  return function() {
    this[t] = e;
  };
}
function Oa(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Ja(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Za : typeof e == "function" ? Oa : Qa)(t, e)) : this.node()[t];
}
function Eo(t) {
  return t.trim().split(/^|\s+/);
}
function Zi(t) {
  return t.classList || new Ro(t);
}
function Ro(t) {
  this._node = t, this._names = Eo(t.getAttribute("class") || "");
}
Ro.prototype = {
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
function Lo(t, e) {
  for (var n = Zi(t), i = -1, o = e.length; ++i < o; ) n.add(e[i]);
}
function Uo(t, e) {
  for (var n = Zi(t), i = -1, o = e.length; ++i < o; ) n.remove(e[i]);
}
function Ka(t) {
  return function() {
    Lo(this, t);
  };
}
function $a(t) {
  return function() {
    Uo(this, t);
  };
}
function ja(t, e) {
  return function() {
    (e.apply(this, arguments) ? Lo : Uo)(this, t);
  };
}
function ts(t, e) {
  var n = Eo(t + "");
  if (arguments.length < 2) {
    for (var i = Zi(this.node()), o = -1, r = n.length; ++o < r; ) if (!i.contains(n[o])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? ja : e ? Ka : $a)(n, e));
}
function es() {
  this.textContent = "";
}
function ns(t) {
  return function() {
    this.textContent = t;
  };
}
function is(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function rs(t) {
  return arguments.length ? this.each(t == null ? es : (typeof t == "function" ? is : ns)(t)) : this.node().textContent;
}
function os() {
  this.innerHTML = "";
}
function ls(t) {
  return function() {
    this.innerHTML = t;
  };
}
function as(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function ss(t) {
  return arguments.length ? this.each(t == null ? os : (typeof t == "function" ? as : ls)(t)) : this.node().innerHTML;
}
function fs() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function us() {
  return this.each(fs);
}
function hs() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function cs() {
  return this.each(hs);
}
function gs(t) {
  var e = typeof t == "function" ? t : Co(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function ds() {
  return null;
}
function ms(t, e) {
  var n = typeof t == "function" ? t : Co(t), i = e == null ? ds : typeof e == "function" ? e : Gi(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function ws() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function vs() {
  return this.each(ws);
}
function ps() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function ys() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function _s(t) {
  return this.select(t ? ys : ps);
}
function bs(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function xs(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Ms(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function Ts(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, o = e.length, r; n < o; ++n)
        r = e[n], (!t.type || r.type === t.type) && r.name === t.name ? this.removeEventListener(r.type, r.listener, r.options) : e[++i] = r;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function ks(t, e, n) {
  return function() {
    var i = this.__on, o, r = xs(e);
    if (i) {
      for (var s = 0, u = i.length; s < u; ++s)
        if ((o = i[s]).type === t.type && o.name === t.name) {
          this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = r, o.options = n), o.value = e;
          return;
        }
    }
    this.addEventListener(t.type, r, n), o = { type: t.type, name: t.name, value: e, listener: r, options: n }, i ? i.push(o) : this.__on = [o];
  };
}
function Cs(t, e, n) {
  var i = Ms(t + ""), o, r = i.length, s;
  if (arguments.length < 2) {
    var u = this.node().__on;
    if (u) {
      for (var a = 0, l = u.length, g; a < l; ++a)
        for (o = 0, g = u[a]; o < r; ++o)
          if ((s = i[o]).type === g.type && s.name === g.name)
            return g.value;
    }
    return;
  }
  for (u = e ? ks : Ts, o = 0; o < r; ++o) this.each(u(i[o], e, n));
  return this;
}
function Po(t, e, n) {
  var i = Fo(t), o = i.CustomEvent;
  typeof o == "function" ? o = new o(e, n) : (o = i.document.createEvent("Event"), n ? (o.initEvent(e, n.bubbles, n.cancelable), o.detail = n.detail) : o.initEvent(e, !1, !1)), t.dispatchEvent(o);
}
function Ns(t, e) {
  return function() {
    return Po(this, t, e);
  };
}
function As(t, e) {
  return function() {
    return Po(this, t, e.apply(this, arguments));
  };
}
function Ds(t, e) {
  return this.each((typeof e == "function" ? As : Ns)(t, e));
}
function* Ss() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], o = 0, r = i.length, s; o < r; ++o)
      (s = i[o]) && (yield s);
}
var Ho = [null];
function ae(t, e) {
  this._groups = t, this._parents = e;
}
function zn() {
  return new ae([[document.documentElement]], Ho);
}
function Fs() {
  return this;
}
ae.prototype = zn.prototype = {
  constructor: ae,
  select: ia,
  selectAll: aa,
  selectChild: ha,
  selectChildren: ma,
  filter: wa,
  data: xa,
  enter: va,
  exit: Ta,
  join: ka,
  merge: Ca,
  selection: Fs,
  order: Na,
  sort: Aa,
  call: Sa,
  nodes: Fa,
  node: Ea,
  size: Ra,
  empty: La,
  each: Ua,
  attr: Wa,
  style: Ga,
  property: Ja,
  classed: ts,
  text: rs,
  html: ss,
  raise: us,
  lower: cs,
  append: gs,
  insert: ms,
  remove: vs,
  clone: _s,
  datum: bs,
  on: Cs,
  dispatch: Ds,
  [Symbol.iterator]: Ss
};
function Te(t) {
  return typeof t == "string" ? new ae([[document.querySelector(t)]], [document.documentElement]) : new ae([[t]], Ho);
}
function Qi(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function zo(t, e) {
  var n = Object.create(t.prototype);
  for (var i in e) n[i] = e[i];
  return n;
}
function Yn() {
}
var Rn = 0.7, ni = 1 / Rn, ln = "\\s*([+-]?\\d+)\\s*", Ln = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ke = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Es = /^#([0-9a-f]{3,8})$/, Rs = new RegExp(`^rgb\\(${ln},${ln},${ln}\\)$`), Ls = new RegExp(`^rgb\\(${ke},${ke},${ke}\\)$`), Us = new RegExp(`^rgba\\(${ln},${ln},${ln},${Ln}\\)$`), Ps = new RegExp(`^rgba\\(${ke},${ke},${ke},${Ln}\\)$`), Hs = new RegExp(`^hsl\\(${Ln},${ke},${ke}\\)$`), zs = new RegExp(`^hsla\\(${Ln},${ke},${ke},${Ln}\\)$`), yr = {
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
Qi(Yn, Xe, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: _r,
  // Deprecated! Use color.formatHex.
  formatHex: _r,
  formatHex8: Ys,
  formatHsl: Is,
  formatRgb: br,
  toString: br
});
function _r() {
  return this.rgb().formatHex();
}
function Ys() {
  return this.rgb().formatHex8();
}
function Is() {
  return Yo(this).formatHsl();
}
function br() {
  return this.rgb().formatRgb();
}
function Xe(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Es.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? xr(e) : n === 3 ? new re(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Gn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Gn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Rs.exec(t)) ? new re(e[1], e[2], e[3], 1) : (e = Ls.exec(t)) ? new re(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Us.exec(t)) ? Gn(e[1], e[2], e[3], e[4]) : (e = Ps.exec(t)) ? Gn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Hs.exec(t)) ? kr(e[1], e[2] / 100, e[3] / 100, 1) : (e = zs.exec(t)) ? kr(e[1], e[2] / 100, e[3] / 100, e[4]) : yr.hasOwnProperty(t) ? xr(yr[t]) : t === "transparent" ? new re(NaN, NaN, NaN, 0) : null;
}
function xr(t) {
  return new re(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Gn(t, e, n, i) {
  return i <= 0 && (t = e = n = NaN), new re(t, e, n, i);
}
function Vs(t) {
  return t instanceof Yn || (t = Xe(t)), t ? (t = t.rgb(), new re(t.r, t.g, t.b, t.opacity)) : new re();
}
function Hi(t, e, n, i) {
  return arguments.length === 1 ? Vs(t) : new re(t, e, n, i ?? 1);
}
function re(t, e, n, i) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +i;
}
Qi(re, Hi, zo(Yn, {
  brighter(t) {
    return t = t == null ? ni : Math.pow(ni, t), new re(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Rn : Math.pow(Rn, t), new re(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new re(Be(this.r), Be(this.g), Be(this.b), ii(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Mr,
  // Deprecated! Use color.formatHex.
  formatHex: Mr,
  formatHex8: Ws,
  formatRgb: Tr,
  toString: Tr
}));
function Mr() {
  return `#${qe(this.r)}${qe(this.g)}${qe(this.b)}`;
}
function Ws() {
  return `#${qe(this.r)}${qe(this.g)}${qe(this.b)}${qe((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Tr() {
  const t = ii(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Be(this.r)}, ${Be(this.g)}, ${Be(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function ii(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Be(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function qe(t) {
  return t = Be(t), (t < 16 ? "0" : "") + t.toString(16);
}
function kr(t, e, n, i) {
  return i <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new ye(t, e, n, i);
}
function Yo(t) {
  if (t instanceof ye) return new ye(t.h, t.s, t.l, t.opacity);
  if (t instanceof Yn || (t = Xe(t)), !t) return new ye();
  if (t instanceof ye) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, i = t.b / 255, o = Math.min(e, n, i), r = Math.max(e, n, i), s = NaN, u = r - o, a = (r + o) / 2;
  return u ? (e === r ? s = (n - i) / u + (n < i) * 6 : n === r ? s = (i - e) / u + 2 : s = (e - n) / u + 4, u /= a < 0.5 ? r + o : 2 - r - o, s *= 60) : u = a > 0 && a < 1 ? 0 : s, new ye(s, u, a, t.opacity);
}
function qs(t, e, n, i) {
  return arguments.length === 1 ? Yo(t) : new ye(t, e, n, i ?? 1);
}
function ye(t, e, n, i) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +i;
}
Qi(ye, qs, zo(Yn, {
  brighter(t) {
    return t = t == null ? ni : Math.pow(ni, t), new ye(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Rn : Math.pow(Rn, t), new ye(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * e, o = 2 * n - i;
    return new re(
      Mi(t >= 240 ? t - 240 : t + 120, o, i),
      Mi(t, o, i),
      Mi(t < 120 ? t + 240 : t - 120, o, i),
      this.opacity
    );
  },
  clamp() {
    return new ye(Cr(this.h), Zn(this.s), Zn(this.l), ii(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = ii(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Cr(this.h)}, ${Zn(this.s) * 100}%, ${Zn(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Cr(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Zn(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Mi(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Oi = (t) => () => t;
function Bs(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Xs(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(i) {
    return Math.pow(t + i * e, n);
  };
}
function Gs(t) {
  return (t = +t) == 1 ? Io : function(e, n) {
    return n - e ? Xs(e, n, t) : Oi(isNaN(e) ? n : e);
  };
}
function Io(t, e) {
  var n = e - t;
  return n ? Bs(t, n) : Oi(isNaN(t) ? e : t);
}
const ri = function t(e) {
  var n = Gs(e);
  function i(o, r) {
    var s = n((o = Hi(o)).r, (r = Hi(r)).r), u = n(o.g, r.g), a = n(o.b, r.b), l = Io(o.opacity, r.opacity);
    return function(g) {
      return o.r = s(g), o.g = u(g), o.b = a(g), o.opacity = l(g), o + "";
    };
  }
  return i.gamma = t, i;
}(1);
function Zs(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, i = e.slice(), o;
  return function(r) {
    for (o = 0; o < n; ++o) i[o] = t[o] * (1 - r) + e[o] * r;
    return i;
  };
}
function Qs(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Os(t, e) {
  var n = e ? e.length : 0, i = t ? Math.min(n, t.length) : 0, o = new Array(i), r = new Array(n), s;
  for (s = 0; s < i; ++s) o[s] = Ji(t[s], e[s]);
  for (; s < n; ++s) r[s] = e[s];
  return function(u) {
    for (s = 0; s < i; ++s) r[s] = o[s](u);
    return r;
  };
}
function Js(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(i) {
    return n.setTime(t * (1 - i) + e * i), n;
  };
}
function pe(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Ks(t, e) {
  var n = {}, i = {}, o;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (o in e)
    o in t ? n[o] = Ji(t[o], e[o]) : i[o] = e[o];
  return function(r) {
    for (o in n) i[o] = n[o](r);
    return i;
  };
}
var zi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ti = new RegExp(zi.source, "g");
function $s(t) {
  return function() {
    return t;
  };
}
function js(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Vo(t, e) {
  var n = zi.lastIndex = Ti.lastIndex = 0, i, o, r, s = -1, u = [], a = [];
  for (t = t + "", e = e + ""; (i = zi.exec(t)) && (o = Ti.exec(e)); )
    (r = o.index) > n && (r = e.slice(n, r), u[s] ? u[s] += r : u[++s] = r), (i = i[0]) === (o = o[0]) ? u[s] ? u[s] += o : u[++s] = o : (u[++s] = null, a.push({ i: s, x: pe(i, o) })), n = Ti.lastIndex;
  return n < e.length && (r = e.slice(n), u[s] ? u[s] += r : u[++s] = r), u.length < 2 ? a[0] ? js(a[0].x) : $s(e) : (e = a.length, function(l) {
    for (var g = 0, d; g < e; ++g) u[(d = a[g]).i] = d.x(l);
    return u.join("");
  });
}
function Ji(t, e) {
  var n = typeof e, i;
  return e == null || n === "boolean" ? Oi(e) : (n === "number" ? pe : n === "string" ? (i = Xe(e)) ? (e = i, ri) : Vo : e instanceof Xe ? ri : e instanceof Date ? Js : Qs(e) ? Zs : Array.isArray(e) ? Os : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Ks : pe)(t, e);
}
function tf(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var Nr = 180 / Math.PI, Yi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Wo(t, e, n, i, o, r) {
  var s, u, a;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (a = t * n + e * i) && (n -= t * a, i -= e * a), (u = Math.sqrt(n * n + i * i)) && (n /= u, i /= u, a /= u), t * i < e * n && (t = -t, e = -e, a = -a, s = -s), {
    translateX: o,
    translateY: r,
    rotate: Math.atan2(e, t) * Nr,
    skewX: Math.atan(a) * Nr,
    scaleX: s,
    scaleY: u
  };
}
var Qn;
function ef(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Yi : Wo(e.a, e.b, e.c, e.d, e.e, e.f);
}
function nf(t) {
  return t == null || (Qn || (Qn = document.createElementNS("http://www.w3.org/2000/svg", "g")), Qn.setAttribute("transform", t), !(t = Qn.transform.baseVal.consolidate())) ? Yi : (t = t.matrix, Wo(t.a, t.b, t.c, t.d, t.e, t.f));
}
function qo(t, e, n, i) {
  function o(l) {
    return l.length ? l.pop() + " " : "";
  }
  function r(l, g, d, m, c, v) {
    if (l !== d || g !== m) {
      var w = c.push("translate(", null, e, null, n);
      v.push({ i: w - 4, x: pe(l, d) }, { i: w - 2, x: pe(g, m) });
    } else (d || m) && c.push("translate(" + d + e + m + n);
  }
  function s(l, g, d, m) {
    l !== g ? (l - g > 180 ? g += 360 : g - l > 180 && (l += 360), m.push({ i: d.push(o(d) + "rotate(", null, i) - 2, x: pe(l, g) })) : g && d.push(o(d) + "rotate(" + g + i);
  }
  function u(l, g, d, m) {
    l !== g ? m.push({ i: d.push(o(d) + "skewX(", null, i) - 2, x: pe(l, g) }) : g && d.push(o(d) + "skewX(" + g + i);
  }
  function a(l, g, d, m, c, v) {
    if (l !== d || g !== m) {
      var w = c.push(o(c) + "scale(", null, ",", null, ")");
      v.push({ i: w - 4, x: pe(l, d) }, { i: w - 2, x: pe(g, m) });
    } else (d !== 1 || m !== 1) && c.push(o(c) + "scale(" + d + "," + m + ")");
  }
  return function(l, g) {
    var d = [], m = [];
    return l = t(l), g = t(g), r(l.translateX, l.translateY, g.translateX, g.translateY, d, m), s(l.rotate, g.rotate, d, m), u(l.skewX, g.skewX, d, m), a(l.scaleX, l.scaleY, g.scaleX, g.scaleY, d, m), l = g = null, function(c) {
      for (var v = -1, w = m.length, E; ++v < w; ) d[(E = m[v]).i] = E.x(c);
      return d.join("");
    };
  };
}
var rf = qo(ef, "px, ", "px)", "deg)"), of = qo(nf, ", ", ")", ")"), sn = 0, Cn = 0, wn = 0, Bo = 1e3, oi, Nn, li = 0, Ge = 0, di = 0, Un = typeof performance == "object" && performance.now ? performance : Date, Xo = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Ki() {
  return Ge || (Xo(lf), Ge = Un.now() + di);
}
function lf() {
  Ge = 0;
}
function ai() {
  this._call = this._time = this._next = null;
}
ai.prototype = Go.prototype = {
  constructor: ai,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Ki() : +n) + (e == null ? 0 : +e), !this._next && Nn !== this && (Nn ? Nn._next = this : oi = this, Nn = this), this._call = t, this._time = n, Ii();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ii());
  }
};
function Go(t, e, n) {
  var i = new ai();
  return i.restart(t, e, n), i;
}
function af() {
  Ki(), ++sn;
  for (var t = oi, e; t; )
    (e = Ge - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --sn;
}
function Ar() {
  Ge = (li = Un.now()) + di, sn = Cn = 0;
  try {
    af();
  } finally {
    sn = 0, ff(), Ge = 0;
  }
}
function sf() {
  var t = Un.now(), e = t - li;
  e > Bo && (di -= e, li = t);
}
function ff() {
  for (var t, e = oi, n, i = 1 / 0; e; )
    e._call ? (i > e._time && (i = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : oi = n);
  Nn = t, Ii(i);
}
function Ii(t) {
  if (!sn) {
    Cn && (Cn = clearTimeout(Cn));
    var e = t - Ge;
    e > 24 ? (t < 1 / 0 && (Cn = setTimeout(Ar, t - Un.now() - di)), wn && (wn = clearInterval(wn))) : (wn || (li = Un.now(), wn = setInterval(sf, Bo)), sn = 1, Xo(Ar));
  }
}
function Dr(t, e, n) {
  var i = new ai();
  return e = e == null ? 0 : +e, i.restart((o) => {
    i.stop(), t(o + e);
  }, e, n), i;
}
var uf = ko("start", "end", "cancel", "interrupt"), hf = [], Zo = 0, Sr = 1, Vi = 2, $n = 3, Fr = 4, Wi = 5, jn = 6;
function mi(t, e, n, i, o, r) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  cf(t, n, {
    name: e,
    index: i,
    // For context during callback.
    group: o,
    // For context during callback.
    on: uf,
    tween: hf,
    time: r.time,
    delay: r.delay,
    duration: r.duration,
    ease: r.ease,
    timer: null,
    state: Zo
  });
}
function $i(t, e) {
  var n = _e(t, e);
  if (n.state > Zo) throw new Error("too late; already scheduled");
  return n;
}
function Ae(t, e) {
  var n = _e(t, e);
  if (n.state > $n) throw new Error("too late; already running");
  return n;
}
function _e(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function cf(t, e, n) {
  var i = t.__transition, o;
  i[e] = n, n.timer = Go(r, 0, n.time);
  function r(l) {
    n.state = Sr, n.timer.restart(s, n.delay, n.time), n.delay <= l && s(l - n.delay);
  }
  function s(l) {
    var g, d, m, c;
    if (n.state !== Sr) return a();
    for (g in i)
      if (c = i[g], c.name === n.name) {
        if (c.state === $n) return Dr(s);
        c.state === Fr ? (c.state = jn, c.timer.stop(), c.on.call("interrupt", t, t.__data__, c.index, c.group), delete i[g]) : +g < e && (c.state = jn, c.timer.stop(), c.on.call("cancel", t, t.__data__, c.index, c.group), delete i[g]);
      }
    if (Dr(function() {
      n.state === $n && (n.state = Fr, n.timer.restart(u, n.delay, n.time), u(l));
    }), n.state = Vi, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Vi) {
      for (n.state = $n, o = new Array(m = n.tween.length), g = 0, d = -1; g < m; ++g)
        (c = n.tween[g].value.call(t, t.__data__, n.index, n.group)) && (o[++d] = c);
      o.length = d + 1;
    }
  }
  function u(l) {
    for (var g = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(a), n.state = Wi, 1), d = -1, m = o.length; ++d < m; )
      o[d].call(t, g);
    n.state === Wi && (n.on.call("end", t, t.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = jn, n.timer.stop(), delete i[e];
    for (var l in i) return;
    delete t.__transition;
  }
}
function gf(t, e) {
  var n = t.__transition, i, o, r = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((i = n[s]).name !== e) {
        r = !1;
        continue;
      }
      o = i.state > Vi && i.state < Wi, i.state = jn, i.timer.stop(), i.on.call(o ? "interrupt" : "cancel", t, t.__data__, i.index, i.group), delete n[s];
    }
    r && delete t.__transition;
  }
}
function df(t) {
  return this.each(function() {
    gf(this, t);
  });
}
function mf(t, e) {
  var n, i;
  return function() {
    var o = Ae(this, t), r = o.tween;
    if (r !== n) {
      i = n = r;
      for (var s = 0, u = i.length; s < u; ++s)
        if (i[s].name === e) {
          i = i.slice(), i.splice(s, 1);
          break;
        }
    }
    o.tween = i;
  };
}
function wf(t, e, n) {
  var i, o;
  if (typeof n != "function") throw new Error();
  return function() {
    var r = Ae(this, t), s = r.tween;
    if (s !== i) {
      o = (i = s).slice();
      for (var u = { name: e, value: n }, a = 0, l = o.length; a < l; ++a)
        if (o[a].name === e) {
          o[a] = u;
          break;
        }
      a === l && o.push(u);
    }
    r.tween = o;
  };
}
function vf(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var i = _e(this.node(), n).tween, o = 0, r = i.length, s; o < r; ++o)
      if ((s = i[o]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? mf : wf)(n, t, e));
}
function ji(t, e, n) {
  var i = t._id;
  return t.each(function() {
    var o = Ae(this, i);
    (o.value || (o.value = {}))[e] = n.apply(this, arguments);
  }), function(o) {
    return _e(o, i).value[e];
  };
}
function Qo(t, e) {
  var n;
  return (typeof e == "number" ? pe : e instanceof Xe ? ri : (n = Xe(e)) ? (e = n, ri) : Vo)(t, e);
}
function pf(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function yf(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function _f(t, e, n) {
  var i, o = n + "", r;
  return function() {
    var s = this.getAttribute(t);
    return s === o ? null : s === i ? r : r = e(i = s, n);
  };
}
function bf(t, e, n) {
  var i, o = n + "", r;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === o ? null : s === i ? r : r = e(i = s, n);
  };
}
function xf(t, e, n) {
  var i, o, r;
  return function() {
    var s, u = n(this), a;
    return u == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), a = u + "", s === a ? null : s === i && a === o ? r : (o = a, r = e(i = s, u)));
  };
}
function Mf(t, e, n) {
  var i, o, r;
  return function() {
    var s, u = n(this), a;
    return u == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), a = u + "", s === a ? null : s === i && a === o ? r : (o = a, r = e(i = s, u)));
  };
}
function Tf(t, e) {
  var n = gi(t), i = n === "transform" ? of : Qo;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Mf : xf)(n, i, ji(this, "attr." + t, e)) : e == null ? (n.local ? yf : pf)(n) : (n.local ? bf : _f)(n, i, e));
}
function kf(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Cf(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Nf(t, e) {
  var n, i;
  function o() {
    var r = e.apply(this, arguments);
    return r !== i && (n = (i = r) && Cf(t, r)), n;
  }
  return o._value = e, o;
}
function Af(t, e) {
  var n, i;
  function o() {
    var r = e.apply(this, arguments);
    return r !== i && (n = (i = r) && kf(t, r)), n;
  }
  return o._value = e, o;
}
function Df(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var i = gi(t);
  return this.tween(n, (i.local ? Nf : Af)(i, e));
}
function Sf(t, e) {
  return function() {
    $i(this, t).delay = +e.apply(this, arguments);
  };
}
function Ff(t, e) {
  return e = +e, function() {
    $i(this, t).delay = e;
  };
}
function Ef(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Sf : Ff)(e, t)) : _e(this.node(), e).delay;
}
function Rf(t, e) {
  return function() {
    Ae(this, t).duration = +e.apply(this, arguments);
  };
}
function Lf(t, e) {
  return e = +e, function() {
    Ae(this, t).duration = e;
  };
}
function Uf(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Rf : Lf)(e, t)) : _e(this.node(), e).duration;
}
function Pf(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    Ae(this, t).ease = e;
  };
}
function Hf(t) {
  var e = this._id;
  return arguments.length ? this.each(Pf(e, t)) : _e(this.node(), e).ease;
}
function zf(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Ae(this, t).ease = n;
  };
}
function Yf(t) {
  if (typeof t != "function") throw new Error();
  return this.each(zf(this._id, t));
}
function If(t) {
  typeof t != "function" && (t = Ao(t));
  for (var e = this._groups, n = e.length, i = new Array(n), o = 0; o < n; ++o)
    for (var r = e[o], s = r.length, u = i[o] = [], a, l = 0; l < s; ++l)
      (a = r[l]) && t.call(a, a.__data__, l, r) && u.push(a);
  return new Le(i, this._parents, this._name, this._id);
}
function Vf(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, i = e.length, o = n.length, r = Math.min(i, o), s = new Array(i), u = 0; u < r; ++u)
    for (var a = e[u], l = n[u], g = a.length, d = s[u] = new Array(g), m, c = 0; c < g; ++c)
      (m = a[c] || l[c]) && (d[c] = m);
  for (; u < i; ++u)
    s[u] = e[u];
  return new Le(s, this._parents, this._name, this._id);
}
function Wf(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function qf(t, e, n) {
  var i, o, r = Wf(e) ? $i : Ae;
  return function() {
    var s = r(this, t), u = s.on;
    u !== i && (o = (i = u).copy()).on(e, n), s.on = o;
  };
}
function Bf(t, e) {
  var n = this._id;
  return arguments.length < 2 ? _e(this.node(), n).on.on(t) : this.each(qf(n, t, e));
}
function Xf(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Gf() {
  return this.on("end.remove", Xf(this._id));
}
function Zf(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Gi(t));
  for (var i = this._groups, o = i.length, r = new Array(o), s = 0; s < o; ++s)
    for (var u = i[s], a = u.length, l = r[s] = new Array(a), g, d, m = 0; m < a; ++m)
      (g = u[m]) && (d = t.call(g, g.__data__, m, u)) && ("__data__" in g && (d.__data__ = g.__data__), l[m] = d, mi(l[m], e, n, m, l, _e(g, n)));
  return new Le(r, this._parents, e, n);
}
function Qf(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = No(t));
  for (var i = this._groups, o = i.length, r = [], s = [], u = 0; u < o; ++u)
    for (var a = i[u], l = a.length, g, d = 0; d < l; ++d)
      if (g = a[d]) {
        for (var m = t.call(g, g.__data__, d, a), c, v = _e(g, n), w = 0, E = m.length; w < E; ++w)
          (c = m[w]) && mi(c, e, n, w, m, v);
        r.push(m), s.push(g);
      }
  return new Le(r, s, e, n);
}
var Of = zn.prototype.constructor;
function Jf() {
  return new Of(this._groups, this._parents);
}
function Kf(t, e) {
  var n, i, o;
  return function() {
    var r = an(this, t), s = (this.style.removeProperty(t), an(this, t));
    return r === s ? null : r === n && s === i ? o : o = e(n = r, i = s);
  };
}
function Oo(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function $f(t, e, n) {
  var i, o = n + "", r;
  return function() {
    var s = an(this, t);
    return s === o ? null : s === i ? r : r = e(i = s, n);
  };
}
function jf(t, e, n) {
  var i, o, r;
  return function() {
    var s = an(this, t), u = n(this), a = u + "";
    return u == null && (a = u = (this.style.removeProperty(t), an(this, t))), s === a ? null : s === i && a === o ? r : (o = a, r = e(i = s, u));
  };
}
function tu(t, e) {
  var n, i, o, r = "style." + e, s = "end." + r, u;
  return function() {
    var a = Ae(this, t), l = a.on, g = a.value[r] == null ? u || (u = Oo(e)) : void 0;
    (l !== n || o !== g) && (i = (n = l).copy()).on(s, o = g), a.on = i;
  };
}
function eu(t, e, n) {
  var i = (t += "") == "transform" ? rf : Qo;
  return e == null ? this.styleTween(t, Kf(t, i)).on("end.style." + t, Oo(t)) : typeof e == "function" ? this.styleTween(t, jf(t, i, ji(this, "style." + t, e))).each(tu(this._id, t)) : this.styleTween(t, $f(t, i, e), n).on("end.style." + t, null);
}
function nu(t, e, n) {
  return function(i) {
    this.style.setProperty(t, e.call(this, i), n);
  };
}
function iu(t, e, n) {
  var i, o;
  function r() {
    var s = e.apply(this, arguments);
    return s !== o && (i = (o = s) && nu(t, s, n)), i;
  }
  return r._value = e, r;
}
function ru(t, e, n) {
  var i = "style." + (t += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (e == null) return this.tween(i, null);
  if (typeof e != "function") throw new Error();
  return this.tween(i, iu(t, e, n ?? ""));
}
function ou(t) {
  return function() {
    this.textContent = t;
  };
}
function lu(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function au(t) {
  return this.tween("text", typeof t == "function" ? lu(ji(this, "text", t)) : ou(t == null ? "" : t + ""));
}
function su(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function fu(t) {
  var e, n;
  function i() {
    var o = t.apply(this, arguments);
    return o !== n && (e = (n = o) && su(o)), e;
  }
  return i._value = t, i;
}
function uu(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, fu(t));
}
function hu() {
  for (var t = this._name, e = this._id, n = Jo(), i = this._groups, o = i.length, r = 0; r < o; ++r)
    for (var s = i[r], u = s.length, a, l = 0; l < u; ++l)
      if (a = s[l]) {
        var g = _e(a, e);
        mi(a, t, n, l, s, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new Le(i, this._parents, t, n);
}
function cu() {
  var t, e, n = this, i = n._id, o = n.size();
  return new Promise(function(r, s) {
    var u = { value: s }, a = { value: function() {
      --o === 0 && r();
    } };
    n.each(function() {
      var l = Ae(this, i), g = l.on;
      g !== t && (e = (t = g).copy(), e._.cancel.push(u), e._.interrupt.push(u), e._.end.push(a)), l.on = e;
    }), o === 0 && r();
  });
}
var gu = 0;
function Le(t, e, n, i) {
  this._groups = t, this._parents = e, this._name = n, this._id = i;
}
function Jo() {
  return ++gu;
}
var Re = zn.prototype;
Le.prototype = {
  constructor: Le,
  select: Zf,
  selectAll: Qf,
  selectChild: Re.selectChild,
  selectChildren: Re.selectChildren,
  filter: If,
  merge: Vf,
  selection: Jf,
  transition: hu,
  call: Re.call,
  nodes: Re.nodes,
  node: Re.node,
  size: Re.size,
  empty: Re.empty,
  each: Re.each,
  on: Bf,
  attr: Tf,
  attrTween: Df,
  style: eu,
  styleTween: ru,
  text: au,
  textTween: uu,
  remove: Gf,
  tween: vf,
  delay: Ef,
  duration: Uf,
  ease: Hf,
  easeVarying: Yf,
  end: cu,
  [Symbol.iterator]: Re[Symbol.iterator]
};
function du(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var mu = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: du
};
function wu(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function vu(t) {
  var e, n;
  t instanceof Le ? (e = t._id, t = t._name) : (e = Jo(), (n = mu).time = Ki(), t = t == null ? null : t + "");
  for (var i = this._groups, o = i.length, r = 0; r < o; ++r)
    for (var s = i[r], u = s.length, a, l = 0; l < u; ++l)
      (a = s[l]) && mi(a, t, e, l, s, n || wu(a, e));
  return new Le(i, this._parents, t, e);
}
zn.prototype.interrupt = df;
zn.prototype.transition = vu;
const qi = Math.PI, Bi = 2 * qi, We = 1e-6, pu = Bi - We;
function Ko(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function yu(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return Ko;
  const n = 10 ** e;
  return function(i) {
    this._ += i[0];
    for (let o = 1, r = i.length; o < r; ++o)
      this._ += Math.round(arguments[o] * n) / n + i[o];
  };
}
class _u {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Ko : yu(e);
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
  quadraticCurveTo(e, n, i, o) {
    this._append`Q${+e},${+n},${this._x1 = +i},${this._y1 = +o}`;
  }
  bezierCurveTo(e, n, i, o, r, s) {
    this._append`C${+e},${+n},${+i},${+o},${this._x1 = +r},${this._y1 = +s}`;
  }
  arcTo(e, n, i, o, r) {
    if (e = +e, n = +n, i = +i, o = +o, r = +r, r < 0) throw new Error(`negative radius: ${r}`);
    let s = this._x1, u = this._y1, a = i - e, l = o - n, g = s - e, d = u - n, m = g * g + d * d;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (m > We) if (!(Math.abs(d * a - l * g) > We) || !r)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let c = i - s, v = o - u, w = a * a + l * l, E = c * c + v * v, D = Math.sqrt(w), M = Math.sqrt(m), T = r * Math.tan((qi - Math.acos((w + m - E) / (2 * D * M))) / 2), b = T / M, L = T / D;
      Math.abs(b - 1) > We && this._append`L${e + b * g},${n + b * d}`, this._append`A${r},${r},0,0,${+(d * c > g * v)},${this._x1 = e + L * a},${this._y1 = n + L * l}`;
    }
  }
  arc(e, n, i, o, r, s) {
    if (e = +e, n = +n, i = +i, s = !!s, i < 0) throw new Error(`negative radius: ${i}`);
    let u = i * Math.cos(o), a = i * Math.sin(o), l = e + u, g = n + a, d = 1 ^ s, m = s ? o - r : r - o;
    this._x1 === null ? this._append`M${l},${g}` : (Math.abs(this._x1 - l) > We || Math.abs(this._y1 - g) > We) && this._append`L${l},${g}`, i && (m < 0 && (m = m % Bi + Bi), m > pu ? this._append`A${i},${i},0,1,${d},${e - u},${n - a}A${i},${i},0,1,${d},${this._x1 = l},${this._y1 = g}` : m > We && this._append`A${i},${i},0,${+(m >= qi)},${d},${this._x1 = e + i * Math.cos(r)},${this._y1 = n + i * Math.sin(r)}`);
  }
  rect(e, n, i, o) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${i = +i}v${+o}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}
function bu(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function si(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, i = t.slice(0, n);
  return [
    i.length > 1 ? i[0] + i.slice(2) : i,
    +t.slice(n + 1)
  ];
}
function fn(t) {
  return t = si(Math.abs(t)), t ? t[1] : NaN;
}
function xu(t, e) {
  return function(n, i) {
    for (var o = n.length, r = [], s = 0, u = t[0], a = 0; o > 0 && u > 0 && (a + u + 1 > i && (u = Math.max(1, i - a)), r.push(n.substring(o -= u, o + u)), !((a += u + 1) > i)); )
      u = t[s = (s + 1) % t.length];
    return r.reverse().join(e);
  };
}
function Mu(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var Tu = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function fi(t) {
  if (!(e = Tu.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new tr({
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
fi.prototype = tr.prototype;
function tr(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
tr.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function ku(t) {
  t: for (var e = t.length, n = 1, i = -1, o; n < e; ++n)
    switch (t[n]) {
      case ".":
        i = o = n;
        break;
      case "0":
        i === 0 && (i = n), o = n;
        break;
      default:
        if (!+t[n]) break t;
        i > 0 && (i = 0);
        break;
    }
  return i > 0 ? t.slice(0, i) + t.slice(o + 1) : t;
}
var $o;
function Cu(t, e) {
  var n = si(t, e);
  if (!n) return t + "";
  var i = n[0], o = n[1], r = o - ($o = Math.max(-8, Math.min(8, Math.floor(o / 3))) * 3) + 1, s = i.length;
  return r === s ? i : r > s ? i + new Array(r - s + 1).join("0") : r > 0 ? i.slice(0, r) + "." + i.slice(r) : "0." + new Array(1 - r).join("0") + si(t, Math.max(0, e + r - 1))[0];
}
function Er(t, e) {
  var n = si(t, e);
  if (!n) return t + "";
  var i = n[0], o = n[1];
  return o < 0 ? "0." + new Array(-o).join("0") + i : i.length > o + 1 ? i.slice(0, o + 1) + "." + i.slice(o + 1) : i + new Array(o - i.length + 2).join("0");
}
const Rr = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: bu,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Er(t * 100, e),
  r: Er,
  s: Cu,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Lr(t) {
  return t;
}
var Ur = Array.prototype.map, Pr = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Nu(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Lr : xu(Ur.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", i = t.currency === void 0 ? "" : t.currency[1] + "", o = t.decimal === void 0 ? "." : t.decimal + "", r = t.numerals === void 0 ? Lr : Mu(Ur.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", u = t.minus === void 0 ? "−" : t.minus + "", a = t.nan === void 0 ? "NaN" : t.nan + "";
  function l(d) {
    d = fi(d);
    var m = d.fill, c = d.align, v = d.sign, w = d.symbol, E = d.zero, D = d.width, M = d.comma, T = d.precision, b = d.trim, L = d.type;
    L === "n" ? (M = !0, L = "g") : Rr[L] || (T === void 0 && (T = 12), b = !0, L = "g"), (E || m === "0" && c === "=") && (E = !0, m = "0", c = "=");
    var N = w === "$" ? n : w === "#" && /[boxX]/.test(L) ? "0" + L.toLowerCase() : "", H = w === "$" ? i : /[%p]/.test(L) ? s : "", A = Rr[L], x = /[defgprs%]/.test(L);
    T = T === void 0 ? 6 : /[gprs]/.test(L) ? Math.max(1, Math.min(21, T)) : Math.max(0, Math.min(20, T));
    function C(y) {
      var _ = N, S = H, k, I, R;
      if (L === "c")
        S = A(y) + S, y = "";
      else {
        y = +y;
        var $ = y < 0 || 1 / y < 0;
        if (y = isNaN(y) ? a : A(Math.abs(y), T), b && (y = ku(y)), $ && +y == 0 && v !== "+" && ($ = !1), _ = ($ ? v === "(" ? v : u : v === "-" || v === "(" ? "" : v) + _, S = (L === "s" ? Pr[8 + $o / 3] : "") + S + ($ && v === "(" ? ")" : ""), x) {
          for (k = -1, I = y.length; ++k < I; )
            if (R = y.charCodeAt(k), 48 > R || R > 57) {
              S = (R === 46 ? o + y.slice(k + 1) : y.slice(k)) + S, y = y.slice(0, k);
              break;
            }
        }
      }
      M && !E && (y = e(y, 1 / 0));
      var vt = _.length + y.length + S.length, Z = vt < D ? new Array(D - vt + 1).join(m) : "";
      switch (M && E && (y = e(Z + y, Z.length ? D - S.length : 1 / 0), Z = ""), c) {
        case "<":
          y = _ + y + S + Z;
          break;
        case "=":
          y = _ + Z + y + S;
          break;
        case "^":
          y = Z.slice(0, vt = Z.length >> 1) + _ + y + S + Z.slice(vt);
          break;
        default:
          y = Z + _ + y + S;
          break;
      }
      return r(y);
    }
    return C.toString = function() {
      return d + "";
    }, C;
  }
  function g(d, m) {
    var c = l((d = fi(d), d.type = "f", d)), v = Math.max(-8, Math.min(8, Math.floor(fn(m) / 3))) * 3, w = Math.pow(10, -v), E = Pr[8 + v / 3];
    return function(D) {
      return c(w * D) + E;
    };
  }
  return {
    format: l,
    formatPrefix: g
  };
}
var On, jo, tl;
Au({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function Au(t) {
  return On = Nu(t), jo = On.format, tl = On.formatPrefix, On;
}
function Du(t) {
  return Math.max(0, -fn(Math.abs(t)));
}
function Su(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(fn(e) / 3))) * 3 - fn(Math.abs(t)));
}
function Fu(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, fn(e) - fn(t)) + 1;
}
function Eu(t, e) {
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
function Ru(t) {
  return function() {
    return t;
  };
}
function Lu(t) {
  return +t;
}
var Hr = [0, 1];
function rn(t) {
  return t;
}
function Xi(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : Ru(isNaN(e) ? NaN : 0.5);
}
function Uu(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(i) {
    return Math.max(t, Math.min(e, i));
  };
}
function Pu(t, e, n) {
  var i = t[0], o = t[1], r = e[0], s = e[1];
  return o < i ? (i = Xi(o, i), r = n(s, r)) : (i = Xi(i, o), r = n(r, s)), function(u) {
    return r(i(u));
  };
}
function Hu(t, e, n) {
  var i = Math.min(t.length, e.length) - 1, o = new Array(i), r = new Array(i), s = -1;
  for (t[i] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < i; )
    o[s] = Xi(t[s], t[s + 1]), r[s] = n(e[s], e[s + 1]);
  return function(u) {
    var a = Ul(t, u, 1, i) - 1;
    return r[a](o[a](u));
  };
}
function zu(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function Yu() {
  var t = Hr, e = Hr, n = Ji, i, o, r, s = rn, u, a, l;
  function g() {
    var m = Math.min(t.length, e.length);
    return s !== rn && (s = Uu(t[0], t[m - 1])), u = m > 2 ? Hu : Pu, a = l = null, d;
  }
  function d(m) {
    return m == null || isNaN(m = +m) ? r : (a || (a = u(t.map(i), e, n)))(i(s(m)));
  }
  return d.invert = function(m) {
    return s(o((l || (l = u(e, t.map(i), pe)))(m)));
  }, d.domain = function(m) {
    return arguments.length ? (t = Array.from(m, Lu), g()) : t.slice();
  }, d.range = function(m) {
    return arguments.length ? (e = Array.from(m), g()) : e.slice();
  }, d.rangeRound = function(m) {
    return e = Array.from(m), n = tf, g();
  }, d.clamp = function(m) {
    return arguments.length ? (s = m ? !0 : rn, g()) : s !== rn;
  }, d.interpolate = function(m) {
    return arguments.length ? (n = m, g()) : n;
  }, d.unknown = function(m) {
    return arguments.length ? (r = m, d) : r;
  }, function(m, c) {
    return i = m, o = c, g();
  };
}
function Iu() {
  return Yu()(rn, rn);
}
function Vu(t, e, n, i) {
  var o = Vl(t, e, n), r;
  switch (i = fi(i ?? ",f"), i.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return i.precision == null && !isNaN(r = Su(o, s)) && (i.precision = r), tl(i, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      i.precision == null && !isNaN(r = Fu(o, Math.max(Math.abs(t), Math.abs(e)))) && (i.precision = r - (i.type === "e"));
      break;
    }
    case "f":
    case "%": {
      i.precision == null && !isNaN(r = Du(o)) && (i.precision = r - (i.type === "%") * 2);
      break;
    }
  }
  return jo(i);
}
function Wu(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var i = e();
    return Il(i[0], i[i.length - 1], n ?? 10);
  }, t.tickFormat = function(n, i) {
    var o = e();
    return Vu(o[0], o[o.length - 1], n ?? 10, i);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var i = e(), o = 0, r = i.length - 1, s = i[o], u = i[r], a, l, g = 10;
    for (u < s && (l = s, s = u, u = l, l = o, o = r, r = l); g-- > 0; ) {
      if (l = Ri(s, u, n), l === a)
        return i[o] = s, i[r] = u, e(i);
      if (l > 0)
        s = Math.floor(s / l) * l, u = Math.ceil(u / l) * l;
      else if (l < 0)
        s = Math.ceil(s * l) / l, u = Math.floor(u * l) / l;
      else
        break;
      a = l;
    }
    return t;
  }, t;
}
function un() {
  var t = Iu();
  return t.copy = function() {
    return zu(t, un());
  }, Eu.apply(t, arguments), Wu(t);
}
const ki = /* @__PURE__ */ new Date(), Ci = /* @__PURE__ */ new Date();
function De(t, e, n, i) {
  function o(r) {
    return t(r = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+r)), r;
  }
  return o.floor = (r) => (t(r = /* @__PURE__ */ new Date(+r)), r), o.ceil = (r) => (t(r = new Date(r - 1)), e(r, 1), t(r), r), o.round = (r) => {
    const s = o(r), u = o.ceil(r);
    return r - s < u - r ? s : u;
  }, o.offset = (r, s) => (e(r = /* @__PURE__ */ new Date(+r), s == null ? 1 : Math.floor(s)), r), o.range = (r, s, u) => {
    const a = [];
    if (r = o.ceil(r), u = u == null ? 1 : Math.floor(u), !(r < s) || !(u > 0)) return a;
    let l;
    do
      a.push(l = /* @__PURE__ */ new Date(+r)), e(r, u), t(r);
    while (l < r && r < s);
    return a;
  }, o.filter = (r) => De((s) => {
    if (s >= s) for (; t(s), !r(s); ) s.setTime(s - 1);
  }, (s, u) => {
    if (s >= s)
      if (u < 0) for (; ++u <= 0; )
        for (; e(s, -1), !r(s); )
          ;
      else for (; --u >= 0; )
        for (; e(s, 1), !r(s); )
          ;
  }), n && (o.count = (r, s) => (ki.setTime(+r), Ci.setTime(+s), t(ki), t(Ci), Math.floor(n(ki, Ci))), o.every = (r) => (r = Math.floor(r), !isFinite(r) || !(r > 0) ? null : r > 1 ? o.filter(i ? (s) => i(s) % r === 0 : (s) => o.count(0, s) % r === 0) : o)), o;
}
const qu = 1e3, er = qu * 60, Bu = er * 60, Pn = Bu * 24, el = Pn * 7, ge = De(
  (t) => t.setHours(0, 0, 0, 0),
  (t, e) => t.setDate(t.getDate() + e),
  (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * er) / Pn,
  (t) => t.getDate() - 1
);
ge.range;
const nr = De((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / Pn, (t) => t.getUTCDate() - 1);
nr.range;
const Xu = De((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / Pn, (t) => Math.floor(t / Pn));
Xu.range;
function Oe(t) {
  return De((e) => {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setDate(e.getDate() + n * 7);
  }, (e, n) => (n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * er) / el);
}
const nl = Oe(0), ui = Oe(1), Gu = Oe(2), Zu = Oe(3), hn = Oe(4), Qu = Oe(5), Ou = Oe(6);
nl.range;
ui.range;
Gu.range;
Zu.range;
hn.range;
Qu.range;
Ou.range;
function Je(t) {
  return De((e) => {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setUTCDate(e.getUTCDate() + n * 7);
  }, (e, n) => (n - e) / el);
}
const il = Je(0), hi = Je(1), Ju = Je(2), Ku = Je(3), cn = Je(4), $u = Je(5), ju = Je(6);
il.range;
hi.range;
Ju.range;
Ku.range;
cn.range;
$u.range;
ju.range;
const Ze = De((t) => {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, e) => {
  t.setFullYear(t.getFullYear() + e);
}, (t, e) => e.getFullYear() - t.getFullYear(), (t) => t.getFullYear());
Ze.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : De((e) => {
  e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, n) => {
  e.setFullYear(e.getFullYear() + n * t);
});
Ze.range;
const Qe = De((t) => {
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCFullYear(t.getUTCFullYear() + e);
}, (t, e) => e.getUTCFullYear() - t.getUTCFullYear(), (t) => t.getUTCFullYear());
Qe.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : De((e) => {
  e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, n) => {
  e.setUTCFullYear(e.getUTCFullYear() + n * t);
});
Qe.range;
function Ni(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e;
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function Ai(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e;
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function vn(t, e, n) {
  return { y: t, m: e, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function th(t) {
  var e = t.dateTime, n = t.date, i = t.time, o = t.periods, r = t.days, s = t.shortDays, u = t.months, a = t.shortMonths, l = pn(o), g = yn(o), d = pn(r), m = yn(r), c = pn(s), v = yn(s), w = pn(u), E = yn(u), D = pn(a), M = yn(a), T = {
    a: $,
    A: vt,
    b: Z,
    B: at,
    c: null,
    d: qr,
    e: qr,
    f: Mh,
    g: Rh,
    G: Uh,
    H: _h,
    I: bh,
    j: xh,
    L: rl,
    m: Th,
    M: kh,
    p: et,
    q: ft,
    Q: Gr,
    s: Zr,
    S: Ch,
    u: Nh,
    U: Ah,
    V: Dh,
    w: Sh,
    W: Fh,
    x: null,
    X: null,
    y: Eh,
    Y: Lh,
    Z: Ph,
    "%": Xr
  }, b = {
    a: kt,
    A: V,
    b: q,
    B: tt,
    c: null,
    d: Br,
    e: Br,
    f: Ih,
    g: Jh,
    G: $h,
    H: Hh,
    I: zh,
    j: Yh,
    L: ll,
    m: Vh,
    M: Wh,
    p: Et,
    q: lt,
    Q: Gr,
    s: Zr,
    S: qh,
    u: Bh,
    U: Xh,
    V: Gh,
    w: Zh,
    W: Qh,
    x: null,
    X: null,
    y: Oh,
    Y: Kh,
    Z: jh,
    "%": Xr
  }, L = {
    a: C,
    A: y,
    b: _,
    B: S,
    c: k,
    d: Vr,
    e: Vr,
    f: wh,
    g: Ir,
    G: Yr,
    H: Wr,
    I: Wr,
    j: ch,
    L: mh,
    m: hh,
    M: gh,
    p: x,
    q: uh,
    Q: ph,
    s: yh,
    S: dh,
    u: oh,
    U: lh,
    V: ah,
    w: rh,
    W: sh,
    x: I,
    X: R,
    y: Ir,
    Y: Yr,
    Z: fh,
    "%": vh
  };
  T.x = N(n, T), T.X = N(i, T), T.c = N(e, T), b.x = N(n, b), b.X = N(i, b), b.c = N(e, b);
  function N(p, O) {
    return function(B) {
      var U = [], ot = -1, F = 0, W = p.length, P, Q, J;
      for (B instanceof Date || (B = /* @__PURE__ */ new Date(+B)); ++ot < W; )
        p.charCodeAt(ot) === 37 && (U.push(p.slice(F, ot)), (Q = zr[P = p.charAt(++ot)]) != null ? P = p.charAt(++ot) : Q = P === "e" ? " " : "0", (J = O[P]) && (P = J(B, Q)), U.push(P), F = ot + 1);
      return U.push(p.slice(F, ot)), U.join("");
    };
  }
  function H(p, O) {
    return function(B) {
      var U = vn(1900, void 0, 1), ot = A(U, p, B += "", 0), F, W;
      if (ot != B.length) return null;
      if ("Q" in U) return new Date(U.Q);
      if ("s" in U) return new Date(U.s * 1e3 + ("L" in U ? U.L : 0));
      if (O && !("Z" in U) && (U.Z = 0), "p" in U && (U.H = U.H % 12 + U.p * 12), U.m === void 0 && (U.m = "q" in U ? U.q : 0), "V" in U) {
        if (U.V < 1 || U.V > 53) return null;
        "w" in U || (U.w = 1), "Z" in U ? (F = Ai(vn(U.y, 0, 1)), W = F.getUTCDay(), F = W > 4 || W === 0 ? hi.ceil(F) : hi(F), F = nr.offset(F, (U.V - 1) * 7), U.y = F.getUTCFullYear(), U.m = F.getUTCMonth(), U.d = F.getUTCDate() + (U.w + 6) % 7) : (F = Ni(vn(U.y, 0, 1)), W = F.getDay(), F = W > 4 || W === 0 ? ui.ceil(F) : ui(F), F = ge.offset(F, (U.V - 1) * 7), U.y = F.getFullYear(), U.m = F.getMonth(), U.d = F.getDate() + (U.w + 6) % 7);
      } else ("W" in U || "U" in U) && ("w" in U || (U.w = "u" in U ? U.u % 7 : "W" in U ? 1 : 0), W = "Z" in U ? Ai(vn(U.y, 0, 1)).getUTCDay() : Ni(vn(U.y, 0, 1)).getDay(), U.m = 0, U.d = "W" in U ? (U.w + 6) % 7 + U.W * 7 - (W + 5) % 7 : U.w + U.U * 7 - (W + 6) % 7);
      return "Z" in U ? (U.H += U.Z / 100 | 0, U.M += U.Z % 100, Ai(U)) : Ni(U);
    };
  }
  function A(p, O, B, U) {
    for (var ot = 0, F = O.length, W = B.length, P, Q; ot < F; ) {
      if (U >= W) return -1;
      if (P = O.charCodeAt(ot++), P === 37) {
        if (P = O.charAt(ot++), Q = L[P in zr ? O.charAt(ot++) : P], !Q || (U = Q(p, B, U)) < 0) return -1;
      } else if (P != B.charCodeAt(U++))
        return -1;
    }
    return U;
  }
  function x(p, O, B) {
    var U = l.exec(O.slice(B));
    return U ? (p.p = g.get(U[0].toLowerCase()), B + U[0].length) : -1;
  }
  function C(p, O, B) {
    var U = c.exec(O.slice(B));
    return U ? (p.w = v.get(U[0].toLowerCase()), B + U[0].length) : -1;
  }
  function y(p, O, B) {
    var U = d.exec(O.slice(B));
    return U ? (p.w = m.get(U[0].toLowerCase()), B + U[0].length) : -1;
  }
  function _(p, O, B) {
    var U = D.exec(O.slice(B));
    return U ? (p.m = M.get(U[0].toLowerCase()), B + U[0].length) : -1;
  }
  function S(p, O, B) {
    var U = w.exec(O.slice(B));
    return U ? (p.m = E.get(U[0].toLowerCase()), B + U[0].length) : -1;
  }
  function k(p, O, B) {
    return A(p, e, O, B);
  }
  function I(p, O, B) {
    return A(p, n, O, B);
  }
  function R(p, O, B) {
    return A(p, i, O, B);
  }
  function $(p) {
    return s[p.getDay()];
  }
  function vt(p) {
    return r[p.getDay()];
  }
  function Z(p) {
    return a[p.getMonth()];
  }
  function at(p) {
    return u[p.getMonth()];
  }
  function et(p) {
    return o[+(p.getHours() >= 12)];
  }
  function ft(p) {
    return 1 + ~~(p.getMonth() / 3);
  }
  function kt(p) {
    return s[p.getUTCDay()];
  }
  function V(p) {
    return r[p.getUTCDay()];
  }
  function q(p) {
    return a[p.getUTCMonth()];
  }
  function tt(p) {
    return u[p.getUTCMonth()];
  }
  function Et(p) {
    return o[+(p.getUTCHours() >= 12)];
  }
  function lt(p) {
    return 1 + ~~(p.getUTCMonth() / 3);
  }
  return {
    format: function(p) {
      var O = N(p += "", T);
      return O.toString = function() {
        return p;
      }, O;
    },
    parse: function(p) {
      var O = H(p += "", !1);
      return O.toString = function() {
        return p;
      }, O;
    },
    utcFormat: function(p) {
      var O = N(p += "", b);
      return O.toString = function() {
        return p;
      }, O;
    },
    utcParse: function(p) {
      var O = H(p += "", !0);
      return O.toString = function() {
        return p;
      }, O;
    }
  };
}
var zr = { "-": "", _: " ", 0: "0" }, Wt = /^\s*\d+/, eh = /^%/, nh = /[\\^$*+?|[\]().{}]/g;
function Rt(t, e, n) {
  var i = t < 0 ? "-" : "", o = (i ? -t : t) + "", r = o.length;
  return i + (r < n ? new Array(n - r + 1).join(e) + o : o);
}
function ih(t) {
  return t.replace(nh, "\\$&");
}
function pn(t) {
  return new RegExp("^(?:" + t.map(ih).join("|") + ")", "i");
}
function yn(t) {
  return new Map(t.map((e, n) => [e.toLowerCase(), n]));
}
function rh(t, e, n) {
  var i = Wt.exec(e.slice(n, n + 1));
  return i ? (t.w = +i[0], n + i[0].length) : -1;
}
function oh(t, e, n) {
  var i = Wt.exec(e.slice(n, n + 1));
  return i ? (t.u = +i[0], n + i[0].length) : -1;
}
function lh(t, e, n) {
  var i = Wt.exec(e.slice(n, n + 2));
  return i ? (t.U = +i[0], n + i[0].length) : -1;
}
function ah(t, e, n) {
  var i = Wt.exec(e.slice(n, n + 2));
  return i ? (t.V = +i[0], n + i[0].length) : -1;
}
function sh(t, e, n) {
  var i = Wt.exec(e.slice(n, n + 2));
  return i ? (t.W = +i[0], n + i[0].length) : -1;
}
function Yr(t, e, n) {
  var i = Wt.exec(e.slice(n, n + 4));
  return i ? (t.y = +i[0], n + i[0].length) : -1;
}
function Ir(t, e, n) {
  var i = Wt.exec(e.slice(n, n + 2));
  return i ? (t.y = +i[0] + (+i[0] > 68 ? 1900 : 2e3), n + i[0].length) : -1;
}
function fh(t, e, n) {
  var i = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
  return i ? (t.Z = i[1] ? 0 : -(i[2] + (i[3] || "00")), n + i[0].length) : -1;
}
function uh(t, e, n) {
  var i = Wt.exec(e.slice(n, n + 1));
  return i ? (t.q = i[0] * 3 - 3, n + i[0].length) : -1;
}
function hh(t, e, n) {
  var i = Wt.exec(e.slice(n, n + 2));
  return i ? (t.m = i[0] - 1, n + i[0].length) : -1;
}
function Vr(t, e, n) {
  var i = Wt.exec(e.slice(n, n + 2));
  return i ? (t.d = +i[0], n + i[0].length) : -1;
}
function ch(t, e, n) {
  var i = Wt.exec(e.slice(n, n + 3));
  return i ? (t.m = 0, t.d = +i[0], n + i[0].length) : -1;
}
function Wr(t, e, n) {
  var i = Wt.exec(e.slice(n, n + 2));
  return i ? (t.H = +i[0], n + i[0].length) : -1;
}
function gh(t, e, n) {
  var i = Wt.exec(e.slice(n, n + 2));
  return i ? (t.M = +i[0], n + i[0].length) : -1;
}
function dh(t, e, n) {
  var i = Wt.exec(e.slice(n, n + 2));
  return i ? (t.S = +i[0], n + i[0].length) : -1;
}
function mh(t, e, n) {
  var i = Wt.exec(e.slice(n, n + 3));
  return i ? (t.L = +i[0], n + i[0].length) : -1;
}
function wh(t, e, n) {
  var i = Wt.exec(e.slice(n, n + 6));
  return i ? (t.L = Math.floor(i[0] / 1e3), n + i[0].length) : -1;
}
function vh(t, e, n) {
  var i = eh.exec(e.slice(n, n + 1));
  return i ? n + i[0].length : -1;
}
function ph(t, e, n) {
  var i = Wt.exec(e.slice(n));
  return i ? (t.Q = +i[0], n + i[0].length) : -1;
}
function yh(t, e, n) {
  var i = Wt.exec(e.slice(n));
  return i ? (t.s = +i[0], n + i[0].length) : -1;
}
function qr(t, e) {
  return Rt(t.getDate(), e, 2);
}
function _h(t, e) {
  return Rt(t.getHours(), e, 2);
}
function bh(t, e) {
  return Rt(t.getHours() % 12 || 12, e, 2);
}
function xh(t, e) {
  return Rt(1 + ge.count(Ze(t), t), e, 3);
}
function rl(t, e) {
  return Rt(t.getMilliseconds(), e, 3);
}
function Mh(t, e) {
  return rl(t, e) + "000";
}
function Th(t, e) {
  return Rt(t.getMonth() + 1, e, 2);
}
function kh(t, e) {
  return Rt(t.getMinutes(), e, 2);
}
function Ch(t, e) {
  return Rt(t.getSeconds(), e, 2);
}
function Nh(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function Ah(t, e) {
  return Rt(nl.count(Ze(t) - 1, t), e, 2);
}
function ol(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? hn(t) : hn.ceil(t);
}
function Dh(t, e) {
  return t = ol(t), Rt(hn.count(Ze(t), t) + (Ze(t).getDay() === 4), e, 2);
}
function Sh(t) {
  return t.getDay();
}
function Fh(t, e) {
  return Rt(ui.count(Ze(t) - 1, t), e, 2);
}
function Eh(t, e) {
  return Rt(t.getFullYear() % 100, e, 2);
}
function Rh(t, e) {
  return t = ol(t), Rt(t.getFullYear() % 100, e, 2);
}
function Lh(t, e) {
  return Rt(t.getFullYear() % 1e4, e, 4);
}
function Uh(t, e) {
  var n = t.getDay();
  return t = n >= 4 || n === 0 ? hn(t) : hn.ceil(t), Rt(t.getFullYear() % 1e4, e, 4);
}
function Ph(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + Rt(e / 60 | 0, "0", 2) + Rt(e % 60, "0", 2);
}
function Br(t, e) {
  return Rt(t.getUTCDate(), e, 2);
}
function Hh(t, e) {
  return Rt(t.getUTCHours(), e, 2);
}
function zh(t, e) {
  return Rt(t.getUTCHours() % 12 || 12, e, 2);
}
function Yh(t, e) {
  return Rt(1 + nr.count(Qe(t), t), e, 3);
}
function ll(t, e) {
  return Rt(t.getUTCMilliseconds(), e, 3);
}
function Ih(t, e) {
  return ll(t, e) + "000";
}
function Vh(t, e) {
  return Rt(t.getUTCMonth() + 1, e, 2);
}
function Wh(t, e) {
  return Rt(t.getUTCMinutes(), e, 2);
}
function qh(t, e) {
  return Rt(t.getUTCSeconds(), e, 2);
}
function Bh(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function Xh(t, e) {
  return Rt(il.count(Qe(t) - 1, t), e, 2);
}
function al(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? cn(t) : cn.ceil(t);
}
function Gh(t, e) {
  return t = al(t), Rt(cn.count(Qe(t), t) + (Qe(t).getUTCDay() === 4), e, 2);
}
function Zh(t) {
  return t.getUTCDay();
}
function Qh(t, e) {
  return Rt(hi.count(Qe(t) - 1, t), e, 2);
}
function Oh(t, e) {
  return Rt(t.getUTCFullYear() % 100, e, 2);
}
function Jh(t, e) {
  return t = al(t), Rt(t.getUTCFullYear() % 100, e, 2);
}
function Kh(t, e) {
  return Rt(t.getUTCFullYear() % 1e4, e, 4);
}
function $h(t, e) {
  var n = t.getUTCDay();
  return t = n >= 4 || n === 0 ? cn(t) : cn.ceil(t), Rt(t.getUTCFullYear() % 1e4, e, 4);
}
function jh() {
  return "+0000";
}
function Xr() {
  return "%";
}
function Gr(t) {
  return +t;
}
function Zr(t) {
  return Math.floor(+t / 1e3);
}
var en, Sn, sl;
tc({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function tc(t) {
  return en = th(t), Sn = en.format, en.parse, sl = en.utcFormat, en.utcParse, en;
}
function Vt(t) {
  return function() {
    return t;
  };
}
function fl(t) {
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
  }, () => new _u(e);
}
function ul(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function hl(t) {
  this._context = t;
}
hl.prototype = {
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
function cl(t) {
  return new hl(t);
}
function gl(t) {
  return t[0];
}
function dl(t) {
  return t[1];
}
function Fn(t, e) {
  var n = Vt(!0), i = null, o = cl, r = null, s = fl(u);
  t = typeof t == "function" ? t : t === void 0 ? gl : Vt(t), e = typeof e == "function" ? e : e === void 0 ? dl : Vt(e);
  function u(a) {
    var l, g = (a = ul(a)).length, d, m = !1, c;
    for (i == null && (r = o(c = s())), l = 0; l <= g; ++l)
      !(l < g && n(d = a[l], l, a)) === m && ((m = !m) ? r.lineStart() : r.lineEnd()), m && r.point(+t(d, l, a), +e(d, l, a));
    if (c) return r = null, c + "" || null;
  }
  return u.x = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : Vt(+a), u) : t;
  }, u.y = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Vt(+a), u) : e;
  }, u.defined = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : Vt(!!a), u) : n;
  }, u.curve = function(a) {
    return arguments.length ? (o = a, i != null && (r = o(i)), u) : o;
  }, u.context = function(a) {
    return arguments.length ? (a == null ? i = r = null : r = o(i = a), u) : i;
  }, u;
}
function ve(t, e, n) {
  var i = null, o = Vt(!0), r = null, s = cl, u = null, a = fl(l);
  t = typeof t == "function" ? t : t === void 0 ? gl : Vt(+t), e = typeof e == "function" ? e : Vt(e === void 0 ? 0 : +e), n = typeof n == "function" ? n : n === void 0 ? dl : Vt(+n);
  function l(d) {
    var m, c, v, w = (d = ul(d)).length, E, D = !1, M, T = new Array(w), b = new Array(w);
    for (r == null && (u = s(M = a())), m = 0; m <= w; ++m) {
      if (!(m < w && o(E = d[m], m, d)) === D)
        if (D = !D)
          c = m, u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), v = m - 1; v >= c; --v)
            u.point(T[v], b[v]);
          u.lineEnd(), u.areaEnd();
        }
      D && (T[m] = +t(E, m, d), b[m] = +e(E, m, d), u.point(i ? +i(E, m, d) : T[m], n ? +n(E, m, d) : b[m]));
    }
    if (M) return u = null, M + "" || null;
  }
  function g() {
    return Fn().defined(o).curve(s).context(r);
  }
  return l.x = function(d) {
    return arguments.length ? (t = typeof d == "function" ? d : Vt(+d), i = null, l) : t;
  }, l.x0 = function(d) {
    return arguments.length ? (t = typeof d == "function" ? d : Vt(+d), l) : t;
  }, l.x1 = function(d) {
    return arguments.length ? (i = d == null ? null : typeof d == "function" ? d : Vt(+d), l) : i;
  }, l.y = function(d) {
    return arguments.length ? (e = typeof d == "function" ? d : Vt(+d), n = null, l) : e;
  }, l.y0 = function(d) {
    return arguments.length ? (e = typeof d == "function" ? d : Vt(+d), l) : e;
  }, l.y1 = function(d) {
    return arguments.length ? (n = d == null ? null : typeof d == "function" ? d : Vt(+d), l) : n;
  }, l.lineX0 = l.lineY0 = function() {
    return g().x(t).y(e);
  }, l.lineY1 = function() {
    return g().x(t).y(n);
  }, l.lineX1 = function() {
    return g().x(i).y(e);
  }, l.defined = function(d) {
    return arguments.length ? (o = typeof d == "function" ? d : Vt(!!d), l) : o;
  }, l.curve = function(d) {
    return arguments.length ? (s = d, r != null && (u = s(r)), l) : s;
  }, l.context = function(d) {
    return arguments.length ? (d == null ? r = u = null : u = s(r = d), l) : r;
  }, l;
}
function Qr(t) {
  return t < 0 ? -1 : 1;
}
function Or(t, e, n) {
  var i = t._x1 - t._x0, o = e - t._x1, r = (t._y1 - t._y0) / (i || o < 0 && -0), s = (n - t._y1) / (o || i < 0 && -0), u = (r * o + s * i) / (i + o);
  return (Qr(r) + Qr(s)) * Math.min(Math.abs(r), Math.abs(s), 0.5 * Math.abs(u)) || 0;
}
function Jr(t, e) {
  var n = t._x1 - t._x0;
  return n ? (3 * (t._y1 - t._y0) / n - e) / 2 : e;
}
function Di(t, e, n) {
  var i = t._x0, o = t._y0, r = t._x1, s = t._y1, u = (r - i) / 3;
  t._context.bezierCurveTo(i + u, o + u * e, r - u, s - u * n, r, s);
}
function ci(t) {
  this._context = t;
}
ci.prototype = {
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
        Di(this, this._t0, Jr(this, this._t0));
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
          this._point = 3, Di(this, Jr(this, n = Or(this, t, e)), n);
          break;
        default:
          Di(this, this._t0, n = Or(this, t, e));
          break;
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = n;
    }
  }
};
Object.create(ci.prototype).point = function(t, e) {
  ci.prototype.point.call(this, e, t);
};
function Si(t) {
  return new ci(t);
}
function An(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
An.prototype = {
  constructor: An,
  scale: function(t) {
    return t === 1 ? this : new An(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new An(this.k, this.x + this.k * t, this.y + this.k * e);
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
An.prototype;
function ec(t) {
  let e, n, i, o, r, s, u, a = (
    /*showCanvas*/
    t[0] ? "-" : "="
  ), l, g, d, m, c, v, w, E, D, M, T, b, L, N, H, A, x, C, y, _, S, k, I, R, $, vt, Z, at, et, ft, kt, V;
  return {
    c() {
      e = Y("div"), n = Y("canvas"), o = j(), r = Y("div"), s = Y("div"), u = Y("button"), l = z(a), g = j(), d = Y("div"), m = z(
        /*periodLabel*/
        t[4]
      ), c = j(), v = Y("div"), w = Y("div"), E = Y("button"), D = z("1d"), T = j(), b = Y("button"), L = z("3d"), H = j(), A = Y("button"), x = z("1w"), y = j(), _ = Y("button"), S = z("2w"), I = j(), R = Y("button"), $ = z("1m"), Z = j(), at = Y("button"), et = z("3m"), f(n, "style", i = `width:100%; display:${/*showCanvas*/
      t[0] ? "block" : "none"}; border:0; padding-bottom: 10px;`), f(u, "type", "button"), f(u, "class", "qbtn svelte-1xibldd"), f(u, "title", "Hide/show calendar canvas"), G(s, "display", "flex"), G(s, "gap", "8px"), G(s, "align-items", "center"), G(s, "justify-content", "flex-end"), G(s, "flex", "0 0 auto"), G(d, "text-align", "left"), G(d, "color", "#000"), G(d, "font-size", "12px"), G(d, "font-weight", "600"), G(d, "min-width", "160px"), G(d, "flex", "1 1 auto"), f(E, "type", "button"), f(E, "class", M = ce(`qbtn ${/*activeSpan*/
      t[3] === 1 ? "active" : ""}`) + " svelte-1xibldd"), f(b, "type", "button"), f(b, "class", N = ce(`qbtn ${/*activeSpan*/
      t[3] === 3 ? "active" : ""}`) + " svelte-1xibldd"), f(A, "type", "button"), f(A, "class", C = ce(`qbtn ${/*activeSpan*/
      t[3] === 7 ? "active" : ""}`) + " svelte-1xibldd"), f(_, "type", "button"), f(_, "class", k = ce(`qbtn ${/*activeSpan*/
      t[3] === 14 ? "active" : ""}`) + " svelte-1xibldd"), f(R, "type", "button"), f(R, "class", vt = ce(`qbtn ${/*activeSpan*/
      t[3] === 30 ? "active" : ""}`) + " svelte-1xibldd"), f(at, "type", "button"), f(at, "class", ft = ce(`qbtn ${/*activeSpan*/
      t[3] === 90 ? "active" : ""}`) + " svelte-1xibldd"), G(w, "display", "flex"), G(w, "gap", "16px"), G(w, "flex-wrap", "wrap"), G(w, "justify-content", "flex-end"), G(v, "display", "flex"), G(v, "align-items", "center"), G(v, "gap", "20px"), G(v, "justify-content", "flex-end"), G(v, "margin-left", "auto"), f(r, "id", "controlBar"), G(r, "display", "flex"), G(r, "align-items", "center"), G(r, "gap", "12px"), G(r, "flex-wrap", "wrap"), G(r, "margin", "0 0 6px"), f(e, "class", "cgm-widget"), G(e, "contain", "layout");
    },
    m(q, tt) {
      bt(q, e, tt), h(e, n), t[15](n), h(e, o), h(e, r), h(r, s), h(s, u), h(u, l), h(r, g), h(r, d), h(d, m), t[17](d), h(r, c), h(r, v), h(v, w), h(w, E), h(E, D), h(w, T), h(w, b), h(b, L), h(w, H), h(w, A), h(A, x), h(w, y), h(w, _), h(_, S), h(w, I), h(w, R), h(R, $), h(w, Z), h(w, at), h(at, et), kt || (V = [
        Ve(
          u,
          "click",
          /*click_handler*/
          t[16]
        ),
        Ve(
          E,
          "click",
          /*click_handler_1*/
          t[18]
        ),
        Ve(
          b,
          "click",
          /*click_handler_2*/
          t[19]
        ),
        Ve(
          A,
          "click",
          /*click_handler_3*/
          t[20]
        ),
        Ve(
          _,
          "click",
          /*click_handler_4*/
          t[21]
        ),
        Ve(
          R,
          "click",
          /*click_handler_5*/
          t[22]
        ),
        Ve(
          at,
          "click",
          /*click_handler_6*/
          t[23]
        )
      ], kt = !0);
    },
    p(q, tt) {
      tt[0] & /*showCanvas*/
      1 && i !== (i = `width:100%; display:${/*showCanvas*/
      q[0] ? "block" : "none"}; border:0; padding-bottom: 10px;`) && f(n, "style", i), tt[0] & /*showCanvas*/
      1 && a !== (a = /*showCanvas*/
      q[0] ? "-" : "=") && Ct(l, a), tt[0] & /*periodLabel*/
      16 && Ct(
        m,
        /*periodLabel*/
        q[4]
      ), tt[0] & /*activeSpan*/
      8 && M !== (M = ce(`qbtn ${/*activeSpan*/
      q[3] === 1 ? "active" : ""}`) + " svelte-1xibldd") && f(E, "class", M), tt[0] & /*activeSpan*/
      8 && N !== (N = ce(`qbtn ${/*activeSpan*/
      q[3] === 3 ? "active" : ""}`) + " svelte-1xibldd") && f(b, "class", N), tt[0] & /*activeSpan*/
      8 && C !== (C = ce(`qbtn ${/*activeSpan*/
      q[3] === 7 ? "active" : ""}`) + " svelte-1xibldd") && f(A, "class", C), tt[0] & /*activeSpan*/
      8 && k !== (k = ce(`qbtn ${/*activeSpan*/
      q[3] === 14 ? "active" : ""}`) + " svelte-1xibldd") && f(_, "class", k), tt[0] & /*activeSpan*/
      8 && vt !== (vt = ce(`qbtn ${/*activeSpan*/
      q[3] === 30 ? "active" : ""}`) + " svelte-1xibldd") && f(R, "class", vt), tt[0] & /*activeSpan*/
      8 && ft !== (ft = ce(`qbtn ${/*activeSpan*/
      q[3] === 90 ? "active" : ""}`) + " svelte-1xibldd") && f(at, "class", ft);
    },
    i: Nt,
    o: Nt,
    d(q) {
      q && _t(e), t[15](null), t[17](null), kt = !1, Hn(V);
    }
  };
}
const we = 54;
function nc(t, e, n) {
  let { data: i } = e, { initialRange: o = null } = e, { externalRange: r = null } = e, { preset: s = "N" } = e, { showMonthLabels: u = !0 } = e, { showData: a = !0 } = e, { showCanvas: l = !0 } = e;
  const g = gn();
  let d, m;
  const c = { l: 48, r: 12, t: 8, b: 8 }, v = [1, 3, 7, 14, 30, 90];
  let w, E, D = 24 * 60 * 60 * 1e3;
  const M = () => new Date(i.t0).getTime(), T = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol");
  function b() {
    return T() ? s === "T" ? {
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
  let L = 0, N = 0, H = 0, A = 0;
  function x(F) {
    let W = v[0], P = 1 / 0;
    for (const Q of v) {
      const J = Math.abs(Q - F);
      J < P && (P = J, W = Q);
    }
    return W;
  }
  function C() {
    return Math.max(1, Math.floor((A - H) / D) + 1);
  }
  let y = 14;
  const _ = (F) => {
    const W = new Date(F);
    return Date.UTC(W.getUTCFullYear(), W.getUTCMonth(), W.getUTCDate());
  };
  let S;
  function k() {
    S = /* @__PURE__ */ new Map();
    for (let F = 0; F < E.length; F++) {
      const W = E[F];
      if (!(Number.isFinite(W) && W >= 0)) continue;
      const P = _(w[F]);
      let Q = S.get(P);
      Q || (Q = { valid: 0, vl: 0, l: 0, t: 0, h: 0, vh: 0 }, S.set(P, Q)), Q.valid++;
      const J = b();
      W < J.vlow ? Q.vl++ : W < J.low ? Q.l++ : W <= J.high ? Q.t++ : W <= J.vhigh ? Q.h++ : Q.vh++;
    }
  }
  function I() {
    w = Float64Array.from({ length: i.glucose.length }, (F, W) => M() + W * i.stepMs), n(12, E = Float64Array.from(i.glucose)), L = _(w[0]), N = _(w[w.length - 1]), n(13, H = (o == null ? void 0 : o.start) ?? L), n(14, A = (o == null ? void 0 : o.end) ?? N), k();
  }
  let R;
  function $() {
    if (!d || !(S != null && S.size)) return;
    const F = Math.max(1, window.devicePixelRatio || 1), W = Math.max(320, d.getBoundingClientRect().width || 900), P = new Date(L).getUTCFullYear(), Q = new Date(N).getUTCFullYear(), J = Li(P, Q + 1), pt = u ? 24 : c.b, yt = c.t + J.length * we + pt;
    n(1, d.style.width = W + "px", d), n(1, d.style.height = yt + "px", d), n(1, d.width = Math.floor(W * F), d), n(1, d.height = Math.floor(yt * F), d), R.setTransform(F, 0, 0, F, 0, 0), R.clearRect(0, 0, W, yt), R.fillStyle = "#fff", R.fillRect(0, 0, W, yt);
    const ht = W - c.l - c.r;
    if (R.strokeStyle = "#f0f0f0", R.lineWidth = 1, J.forEach((mt, xt) => {
      const st = c.t + xt * we;
      for (let wt = 1; wt < 12; wt++) {
        const nt = Date.UTC(mt, wt, 1);
        if (nt < L || nt > N) continue;
        const At = (Date.UTC(mt + 1, 0, 1) - Date.UTC(mt, 0, 1)) / D, it = c.l + Math.round((nt - Date.UTC(mt, 0, 1)) / D * (ht / At));
        R.beginPath(), R.moveTo(it, st + 6), R.lineTo(it, st + we - 6), R.stroke();
      }
    }), J.forEach((mt, xt) => {
      const st = c.t + xt * we;
      R.fillStyle = "#444", R.font = "12px system-ui, sans-serif", R.textAlign = "right", R.textBaseline = "middle", R.fillText(String(mt), c.l - 8, st + we / 2);
      const wt = Date.UTC(mt, 0, 1), nt = Date.UTC(mt + 1, 0, 1) - D, At = Math.round((Date.UTC(mt + 1, 0, 1) - Date.UTC(mt, 0, 1)) / D), it = (rt) => c.l + Math.floor((rt - Date.UTC(mt, 0, 1)) / D * (ht / At)), gt = we - 10, ut = st + 5;
      if (!a) {
        R.fillStyle = "#efefef";
        for (let rt = Math.max(wt, L); rt <= Math.min(nt, N); rt += D) {
          const dt = it(rt), Mt = it(rt + D), Ft = Math.max(1, Mt - dt);
          R.fillRect(dt, ut, Ft, gt);
        }
        return;
      }
      for (let rt = Math.max(wt, L); rt <= Math.min(nt, N); rt += D) {
        const dt = it(rt), Mt = it(rt + D), Ft = Math.max(1, Mt - dt), Tt = S.get(rt);
        if (!Tt || !Tt.valid) {
          R.fillStyle = "#efefef", R.globalAlpha = 1, R.fillRect(dt, ut, Ft, gt);
          continue;
        }
        const Ut = Math.max(1, Math.round(D / i.stepMs)), It = {
          vl: Tt.vl / Tt.valid,
          l: Tt.l / Tt.valid,
          t: Tt.t / Tt.valid,
          h: Tt.h / Tt.valid,
          vh: Tt.vh / Tt.valid
        };
        let Pt = ut + gt;
        const K = (oe, Bt, Zt) => {
          const Dt = Math.round(Bt * gt);
          Dt <= 0 || (Pt -= Dt, R.fillStyle = oe, R.globalAlpha = Zt, R.fillRect(dt, Pt, Ft, Dt));
        }, Ht = Tt.valid / Ut >= 0.5 ? 0.8 : 0.4, zt = Tt.valid / Ut >= 0.5 ? 0.9 : 0.6;
        K("#e57373", It.vl, Ht), K("#ff9e80", It.l, Ht), K("#86c89d", It.t, zt), K("#ffcc80", It.h, Ht), K("#ff8a65", It.vh, Ht), R.globalAlpha = 1;
      }
    }), a) {
      const mt = Math.max(L, Math.min(N, H)), xt = Math.max(L, Math.min(N, A));
      J.forEach((st, wt) => {
        const nt = c.t + wt * we, At = Date.UTC(st, 0, 1), it = Date.UTC(st + 1, 0, 1) - 1, gt = Math.max(At, mt), ut = Math.min(it, xt);
        if (gt > ut) return;
        const rt = (Date.UTC(st + 1, 0, 1) - Date.UTC(st, 0, 1)) / D, dt = (It) => c.l + Math.floor((It - Date.UTC(st, 0, 1)) / D * (ht / rt)), Mt = dt(gt), Ft = dt(ut + 1), Tt = nt + 5, Ut = we - 10;
        R.save(), R.fillStyle = "rgba(107,127,161,0.28)", R.fillRect(Mt, Tt, Math.max(1, Ft - Mt), Ut), R.strokeStyle = "#6b7fa1", R.lineWidth = 1.5, R.beginPath(), R.moveTo(Mt + 0.5, Tt + 0.5), R.lineTo(Mt + 0.5, Tt + Ut - 0.5), R.stroke(), R.beginPath(), R.moveTo(Ft - 0.5, Tt + 0.5), R.lineTo(Ft - 0.5, Tt + Ut - 0.5), R.stroke(), R.restore();
      });
    }
    if (u) {
      const mt = sl("%b"), xt = J[J.length - 1], st = Date.UTC(xt, 0, 1), nt = (Date.UTC(xt + 1, 0, 1) - st) / D, At = (ut) => c.l + Math.round((ut - st) / D * (ht / nt)), gt = c.t + (J.length - 1) * we + we - 5 + 0.5;
      R.save(), R.strokeStyle = "#bbb", R.lineWidth = 1, R.fillStyle = "#555", R.font = "11px system-ui, sans-serif", R.textAlign = "center", R.textBaseline = "top";
      for (let ut = 0; ut < 12; ut++) {
        const rt = Date.UTC(xt, ut, 1), dt = At(rt);
        R.beginPath(), R.moveTo(dt, gt), R.lineTo(dt, gt + 4), R.stroke(), R.fillText(mt(new Date(Date.UTC(2e3, ut, 1))), dt, gt + 6);
      }
      R.restore();
    }
  }
  function vt(F, W) {
    const P = new Date(F), Q = new Date(W), J = Sn("%b %e"), pt = Sn("%b %e, %Y"), yt = Sn("%e, %Y"), ht = Date.UTC(P.getUTCFullYear(), P.getUTCMonth(), P.getUTCDate()), mt = Date.UTC(Q.getUTCFullYear(), Q.getUTCMonth(), Q.getUTCDate());
    return ht === mt ? pt(Q) : P.getFullYear() === Q.getFullYear() ? P.getMonth() === Q.getMonth() ? `${J(P)} – ${yt(Q)}` : `${J(P)} – ${pt(Q)}` : `${pt(P)} – ${pt(Q)}`;
  }
  let Z = "";
  function at() {
    const F = C();
    n(3, y = x(F));
    const W = Math.max(0, Math.ceil((H - w[0]) / i.stepMs)), P = Math.min(E.length - 1, Math.floor((A - w[0]) / i.stepMs));
    try {
      typeof window < "u" && window.CGM_DEBUG && console.log("[CgmTir] rangechange", {
        startISO: new Date(H).toISOString(),
        endISO: new Date(A).toISOString(),
        days: F,
        startIdx: W,
        endIdx: P
      });
    } catch {
    }
    g("rangechange", {
      start: H,
      end: A,
      days: F,
      startIdx: W,
      endIdx: P
    });
  }
  function et(F) {
    n(14, A = N), n(13, H = Math.max(L, A - F * D + 1)), at(), $();
  }
  function ft(F) {
    const W = H + F * D, P = A + F * D, Q = Math.max(D, P - W);
    n(13, H = Math.max(L, Math.min(N - Q, W))), n(14, A = Math.min(N, H + Q)), at(), $();
  }
  function kt(F) {
    const W = C() * D * F;
    ft(W / D);
  }
  function V() {
    const F = d;
    let W = !1, P = null, Q = null, J = 0, pt = 0;
    const yt = 6, ht = (wt) => {
      const nt = new Date(wt);
      return Date.UTC(nt.getUTCFullYear(), nt.getUTCMonth(), nt.getUTCDate());
    };
    function mt() {
      const wt = Math.max(320, F.getBoundingClientRect().width || 900), nt = wt - c.l - c.r, At = Li(new Date(L).getUTCFullYear(), new Date(N).getUTCFullYear() + 1);
      return { cssW: wt, plotW: nt, years: At };
    }
    function xt(wt, nt) {
      const At = (Date.UTC(wt + 1, 0, 1) - Date.UTC(wt, 0, 1)) / D;
      return (it) => c.l + Math.floor((it - Date.UTC(wt, 0, 1)) / D * (nt / At));
    }
    function st(wt) {
      const nt = F.getBoundingClientRect(), At = wt.clientX - nt.left, it = wt.clientY - nt.top, { cssW: gt, years: ut } = mt(), rt = Math.floor((it - 8) / we);
      if (rt < 0 || rt >= ut.length) return null;
      const dt = ut[rt], Mt = c.l, Ft = gt - c.r, Tt = Math.max(Mt, Math.min(Ft, At)), Ut = (Date.UTC(dt + 1, 0, 1) - Date.UTC(dt, 0, 1)) / D, It = (Tt - Mt) / (Ft - Mt);
      let Pt = Date.UTC(dt, 0, 1) + It * Ut * D;
      return Pt = Math.max(L, Math.min(N, Pt)), { t: Pt, yr: dt, x: Tt, rowIdx: rt };
    }
    F.addEventListener("mousedown", (wt) => {
      const nt = st(wt);
      if (!nt) return;
      const { plotW: At } = mt(), it = xt(nt.yr, At), gt = it(Math.max(Date.UTC(nt.yr, 0, 1), H)), ut = it(Math.min(Date.UTC(nt.yr + 1, 0, 1) - 1, A)) + 1;
      P = "new", nt.x >= gt - yt && nt.x <= gt + yt ? P = "resize-l" : nt.x >= ut - yt && nt.x <= ut + yt ? P = "resize-r" : nt.x > gt && nt.x < ut && (P = "move"), W = !0, Q = nt.t, J = H, pt = A, document.body.style.userSelect = "none", F.style.cursor = P === "move" ? "grabbing" : P === "new" ? "crosshair" : "col-resize";
    }), window.addEventListener("mousemove", (wt) => {
      const nt = st(wt);
      if (!nt) {
        W || (F.style.cursor = "crosshair");
        return;
      }
      if (!W) {
        const { plotW: gt } = mt(), ut = xt(nt.yr, gt), rt = ut(Math.max(Date.UTC(nt.yr, 0, 1), H)), dt = ut(Math.min(Date.UTC(nt.yr + 1, 0, 1) - 1, A)) + 1;
        nt.x >= rt - yt && nt.x <= rt + yt || nt.x >= dt - yt && nt.x <= dt + yt ? F.style.cursor = "col-resize" : nt.x > rt && nt.x < dt ? F.style.cursor = "grab" : F.style.cursor = "crosshair";
        return;
      }
      const At = nt.t, it = D;
      if (P === "new") {
        const gt = ht(Math.min(Q, At)), ut = ht(Math.max(Q, At));
        let rt = Math.max(1, Math.floor((ut - gt) / it) + 1);
        const dt = x(rt);
        if (At >= Q) {
          let Mt = gt, Ft = Mt + dt * it - 1;
          Ft > N && (Ft = N, Mt = Math.max(L, Ft - dt * it + 1)), n(13, H = Mt), n(14, A = Ft);
        } else {
          let Mt = ut + it - 1, Ft = Mt - dt * it + 1;
          Ft < L && (Ft = L, Mt = Math.min(N, Ft + dt * it - 1)), n(13, H = Ft), n(14, A = Mt);
        }
      } else if (P === "resize-l") {
        const gt = Math.max(1, Math.floor((pt - ht(Math.min(At, pt - it + 1)) + 1) / it)), ut = x(gt);
        let rt = pt - ut * it + 1;
        rt = Math.max(L, Math.min(rt, pt - it + 1)), n(13, H = rt), n(14, A = pt);
      } else if (P === "resize-r") {
        const gt = Math.max(1, Math.floor((ht(At) + it - 1 - J + 1) / it)), ut = x(gt);
        let rt = J + ut * it - 1;
        rt = Math.min(N, Math.max(rt, J + it - 1)), n(13, H = J), n(14, A = rt);
      } else if (P === "move") {
        const gt = Math.round((ht(At) - ht(Q)) / it), ut = pt - J + 1;
        let rt = J + gt * it;
        rt = Math.max(L, Math.min(N - ut + 1, rt)), n(13, H = rt), n(14, A = rt + ut - 1);
      }
      at(), $();
    }), window.addEventListener("mouseup", () => {
      W && (W = !1, P = null, Q = null, document.body.style.userSelect = "", F.style.cursor = "crosshair");
    });
  }
  Ne(() => {
    R = d.getContext("2d"), I(), $();
    const F = Math.max(0, Math.ceil((H - w[0]) / i.stepMs)), W = Math.min(E.length - 1, Math.floor((A - w[0]) / i.stepMs));
    g("ready", {
      start: H,
      end: A,
      startIdx: F,
      endIdx: W,
      days: C()
    }), at(), V();
    const P = () => $(), Q = (J) => {
      const pt = J.target && J.target.tagName ? J.target.tagName.toLowerCase() : "";
      if (!(pt === "input" || pt === "textarea" || pt === "select" || J.defaultPrevented)) {
        if (/^[1-6]$/.test(J.key)) {
          const ht = {
            1: 1,
            2: 3,
            3: 7,
            4: 14,
            5: 30,
            6: 90
          }[J.key];
          et(ht), J.preventDefault();
          return;
        }
        if (J.key === "ArrowLeft" || J.key === "ArrowRight") {
          J.shiftKey ? kt(J.key === "ArrowLeft" ? -1 : 1) : ft(J.key === "ArrowLeft" ? -1 : 1), J.preventDefault();
          return;
        }
      }
    };
    return window.addEventListener("resize", P), window.addEventListener("keydown", Q), () => window.removeEventListener("resize", P);
  });
  function q(F) {
    Ce[F ? "unshift" : "push"](() => {
      d = F, n(1, d);
    });
  }
  const tt = () => {
    n(0, l = !l);
  };
  function Et(F) {
    Ce[F ? "unshift" : "push"](() => {
      m = F, n(2, m);
    });
  }
  const lt = () => et(1), p = () => et(3), O = () => et(7), B = () => et(14), U = () => et(30), ot = () => et(90);
  return t.$$set = (F) => {
    "data" in F && n(6, i = F.data), "initialRange" in F && n(7, o = F.initialRange), "externalRange" in F && n(8, r = F.externalRange), "preset" in F && n(9, s = F.preset), "showMonthLabels" in F && n(10, u = F.showMonthLabels), "showData" in F && n(11, a = F.showData), "showCanvas" in F && n(0, l = F.showCanvas);
  }, t.$$.update = () => {
    if (t.$$.dirty[0] & /*externalRange, viewStart, viewEnd*/
    24832 && r && typeof r.start == "number" && typeof r.end == "number") {
      const F = r.start, W = r.end;
      (F !== H || W !== A) && (n(13, H = F), n(14, A = W), at(), $());
    }
    t.$$.dirty[0] & /*viewStart, viewEnd*/
    24576 && n(4, Z = vt(H, A)), t.$$.dirty[0] & /*values, preset*/
    4608 && E && s && (k(), $());
  }, n(3, y = x(C())), [
    l,
    d,
    m,
    y,
    Z,
    et,
    i,
    o,
    r,
    s,
    u,
    a,
    E,
    H,
    A,
    q,
    tt,
    Et,
    lt,
    p,
    O,
    B,
    U,
    ot
  ];
}
class ic extends ue {
  constructor(e) {
    super(), fe(
      this,
      e,
      nc,
      ec,
      se,
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
function rc(t) {
  let e, n, i, o, r, s, u, a, l, g, d, m, c, v, w, E, D, M, T, b, L, N, H, A, x, C, y, _, S;
  return {
    c() {
      e = Y("div"), n = Y("div"), i = Y("div"), o = Y("b"), o.textContent = "Average Glucose", r = Y("div"), r.textContent = `Goal: ${/*isMmol*/
      t[6]() ? `Target ${/*TH*/
      t[7]().low.toFixed(1)}–${/*TH*/
      t[7]().high.toFixed(1)} mmol/L` : `Target ${Math.round(
        /*TH*/
        t[7]().low
      )}–${Math.round(
        /*TH*/
        t[7]().high
      )} mg/dL`}`, s = Y("div"), u = z(
        /*avgText*/
        t[0]
      ), a = j(), l = Y("div"), g = Y("div"), g.innerHTML = '<b>Glucose Management Indicator (GMI)</b><div class="muted svelte-1bp5ihd" style="font-size:11px;">Goal: &lt;7%</div>', d = Y("div"), m = z(
        /*gmiText*/
        t[1]
      ), c = j(), v = Y("div"), w = Y("div"), w.innerHTML = '<b>Glucose Variability (CV)</b><div class="muted svelte-1bp5ihd" style="font-size:11px;">Goal: ≤36%</div>', E = Y("div"), D = z(
        /*cvText*/
        t[2]
      ), M = j(), T = Y("div"), b = Y("div"), L = Y("b"), L.textContent = "Target Range", N = Y("div"), H = z(
        /*presetLabel*/
        t[4]
      ), A = Y("div"), x = z(
        /*targetRangeText*/
        t[5]
      ), C = j(), y = Y("div"), _ = z("Time CGM Active: "), S = z(
        /*activeText*/
        t[3]
      ), f(r, "class", "muted svelte-1bp5ihd"), G(r, "font-size", "11px"), f(i, "class", "svelte-1bp5ihd"), f(s, "class", "svelte-1bp5ihd"), f(n, "class", "metric svelte-1bp5ihd"), f(g, "class", "svelte-1bp5ihd"), f(d, "class", "svelte-1bp5ihd"), f(l, "class", "metric svelte-1bp5ihd"), f(w, "class", "svelte-1bp5ihd"), f(E, "class", "svelte-1bp5ihd"), f(v, "class", "metric svelte-1bp5ihd"), f(N, "class", "muted svelte-1bp5ihd"), G(N, "font-size", "11px"), f(b, "class", "svelte-1bp5ihd"), G(A, "font-weight", "normal"), f(A, "class", "svelte-1bp5ihd"), f(T, "class", "metric svelte-1bp5ihd"), f(y, "class", "muted svelte-1bp5ihd"), G(y, "font-size", "11px"), G(y, "margin-top", "6px"), G(y, "margin-left", "8px"), f(e, "class", "summary"), G(e, "padding", "0 10px");
    },
    m(k, I) {
      bt(k, e, I), h(e, n), h(n, i), h(i, o), h(i, r), h(n, s), h(s, u), h(e, a), h(e, l), h(l, g), h(l, d), h(d, m), h(e, c), h(e, v), h(v, w), h(v, E), h(E, D), h(e, M), h(e, T), h(T, b), h(b, L), h(b, N), h(N, H), h(T, A), h(A, x), h(e, C), h(e, y), h(y, _), h(y, S);
    },
    p(k, [I]) {
      I & /*avgText*/
      1 && Ct(
        u,
        /*avgText*/
        k[0]
      ), I & /*gmiText*/
      2 && Ct(
        m,
        /*gmiText*/
        k[1]
      ), I & /*cvText*/
      4 && Ct(
        D,
        /*cvText*/
        k[2]
      ), I & /*presetLabel*/
      16 && Ct(
        H,
        /*presetLabel*/
        k[4]
      ), I & /*targetRangeText*/
      32 && Ct(
        x,
        /*targetRangeText*/
        k[5]
      ), I & /*activeText*/
      8 && Ct(
        S,
        /*activeText*/
        k[3]
      );
    },
    i: Nt,
    o: Nt,
    d(k) {
      k && _t(e);
    }
  };
}
function oc(t, e, n) {
  let i, o, { data: r } = e, { range: s = null } = e, { preset: u = "N" } = e, a = "—", l = "—", g = "—", d = "—", m, c;
  const v = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), w = (M) => v() ? M * 18 : M;
  function E() {
    return v() ? u === "T" ? {
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
  }
  function D() {
    if (!r) return;
    const M = new Date(r.t0).getTime();
    n(11, m = Float64Array.from({ length: r.glucose.length }, (T, b) => M + b * r.stepMs)), n(12, c = Float64Array.from(r.glucose));
  }
  return Ne(() => {
    D();
  }), t.$$set = (M) => {
    "data" in M && n(8, r = M.data), "range" in M && n(9, s = M.range), "preset" in M && n(10, u = M.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*preset*/
    1024 && n(4, o = u === "T" ? "Tight" : u === "P" ? "Pregnancy" : "General"), t.$$.dirty & /*data*/
    256 && r && D(), t.$$.dirty & /*data, range, time, values*/
    6912 && r && s && m && c) {
      const { start: M, end: T } = s, b = Math.max(0, Math.ceil((M - m[0]) / r.stepMs)), L = Math.min(c.length - 1, Math.floor((T - m[0]) / r.stepMs));
      try {
        typeof window < "u" && window.CGM_DEBUG && console.log("[CgmSummary] update", {
          startISO: new Date(M).toISOString(),
          endISO: new Date(T).toISOString(),
          stepMs: r.stepMs,
          i0: b,
          i1: L,
          len: c.length
        });
      } catch {
      }
      if (L < b)
        n(0, a = "—"), n(1, l = "—"), n(2, g = "—"), n(3, d = "—");
      else {
        const N = [];
        for (let vt = b; vt <= L; vt++) {
          const Z = c[vt];
          Number.isFinite(Z) && Z >= 0 && N.push(Z);
        }
        const H = Math.max(1, L - b + 1), x = 100 * N.length / H;
        n(3, d = `${x.toFixed(1)}%`);
        const C = Wl(N), y = Pl(N) ?? 0, _ = Math.sqrt(y), S = Number.isFinite(C) ? 3.31 + 0.02392 * w(C) : NaN, k = Number.isFinite(C) && C !== 0 ? _ / C * 100 : NaN;
        n(0, a = Number.isFinite(C) ? v() ? `${C.toFixed(1)} mmol/L` : `${Math.round(C)} mg/dL` : "—"), n(1, l = Number.isFinite(S) ? `${S.toFixed(1)}%` : "—"), n(2, g = Number.isFinite(k) ? `${k.toFixed(1)}%` : "—");
        const I = Sn("%b %e, %Y"), R = new Date(M), $ = new Date(T);
        `${I(R)}${I($)}`, Date.UTC(R.getUTCFullYear(), R.getUTCMonth(), R.getUTCDate()), Date.UTC($.getUTCFullYear(), $.getUTCMonth(), $.getUTCDate());
      }
    }
  }, n(5, i = v() ? `${E().low.toFixed(1)}–${E().high.toFixed(1)} mmol/L` : `${Math.round(E().low)}–${Math.round(E().high)} mg/dL`), [
    a,
    l,
    g,
    d,
    o,
    i,
    v,
    E,
    r,
    s,
    u,
    m,
    c
  ];
}
class lc extends ue {
  constructor(e) {
    super(), fe(this, e, oc, rc, se, { data: 8, range: 9, preset: 10 });
  }
}
function ac(t) {
  let e;
  return {
    c() {
      e = z("General 70–180 mg/dL");
    },
    m(n, i) {
      bt(n, e, i);
    },
    p: Nt,
    d(n) {
      n && _t(e);
    }
  };
}
function sc(t) {
  let e;
  return {
    c() {
      e = z("Pregnancy 63–140 mg/dL");
    },
    m(n, i) {
      bt(n, e, i);
    },
    p: Nt,
    d(n) {
      n && _t(e);
    }
  };
}
function fc(t) {
  let e;
  return {
    c() {
      e = z("Tight 70–140 mg/dL");
    },
    m(n, i) {
      bt(n, e, i);
    },
    p: Nt,
    d(n) {
      n && _t(e);
    }
  };
}
function uc(t) {
  let e;
  function n(r, s) {
    return (
      /*preset*/
      r[1] === "T" ? gc : (
        /*preset*/
        r[1] === "P" ? cc : hc
      )
    );
  }
  let i = n(t), o = i(t);
  return {
    c() {
      o.c(), e = me();
    },
    m(r, s) {
      o.m(r, s), bt(r, e, s);
    },
    p(r, s) {
      i !== (i = n(r)) && (o.d(1), o = i(r), o && (o.c(), o.m(e.parentNode, e)));
    },
    d(r) {
      r && _t(e), o.d(r);
    }
  };
}
function hc(t) {
  let e;
  return {
    c() {
      e = z("General 3.9–10.0 mmol/L");
    },
    m(n, i) {
      bt(n, e, i);
    },
    d(n) {
      n && _t(e);
    }
  };
}
function cc(t) {
  let e;
  return {
    c() {
      e = z("Pregnancy 3.5–7.8 mmol/L");
    },
    m(n, i) {
      bt(n, e, i);
    },
    d(n) {
      n && _t(e);
    }
  };
}
function gc(t) {
  let e;
  return {
    c() {
      e = z("Tight 3.9–7.8 mmol/L");
    },
    m(n, i) {
      bt(n, e, i);
    },
    d(n) {
      n && _t(e);
    }
  };
}
function dc(t) {
  let e, n, i, o, r, s, u, a, l, g, d, m, c, v, w, E = (
    /*pct*/
    t[2].targ.toFixed(1) + ""
  ), D, M, T, b, L, N, H;
  function A(y, _) {
    var S;
    return _ & /*data*/
    1 && (H = null), H == null && (H = !!/mmol/i.test(
      /*data*/
      ((S = y[0]) == null ? void 0 : S.units) || "mmol"
    )), H ? uc : (
      /*preset*/
      y[1] === "T" ? fc : (
        /*preset*/
        y[1] === "P" ? sc : ac
      )
    );
  }
  let x = A(t, -1), C = x(t);
  return {
    c() {
      e = Y("div"), n = Y("div"), i = Y("div"), o = j(), r = Y("div"), s = j(), u = Y("div"), a = j(), l = Y("div"), g = j(), d = Y("div"), m = j(), c = Y("div"), v = Y("div"), w = Y("span"), D = z(E), M = z("%"), T = z(" in range "), b = Y("span"), b.textContent = "· Goal >= 70%", L = j(), N = Y("div"), C.c(), f(i, "class", "seg vlow svelte-536eaw"), G(
        i,
        "width",
        /*pct*/
        t[2].vlow + "%"
      ), f(i, "title", "Very low"), f(r, "class", "seg low svelte-536eaw"), G(
        r,
        "width",
        /*pct*/
        t[2].low + "%"
      ), f(r, "title", "Low"), f(u, "class", "seg targ svelte-536eaw"), G(
        u,
        "width",
        /*pct*/
        t[2].targ + "%"
      ), f(u, "title", "Target"), f(l, "class", "seg high svelte-536eaw"), G(
        l,
        "width",
        /*pct*/
        t[2].high + "%"
      ), f(l, "title", "High"), f(d, "class", "seg vhigh svelte-536eaw"), G(
        d,
        "width",
        /*pct*/
        t[2].vhigh + "%"
      ), f(d, "title", "Very high"), f(n, "class", "bar svelte-536eaw"), f(w, "class", "strong svelte-536eaw"), f(b, "class", "muted svelte-536eaw"), f(v, "class", "left svelte-536eaw"), f(N, "class", "right svelte-536eaw"), f(c, "class", "legend svelte-536eaw"), f(e, "class", "tirbar svelte-536eaw");
    },
    m(y, _) {
      bt(y, e, _), h(e, n), h(n, i), h(n, o), h(n, r), h(n, s), h(n, u), h(n, a), h(n, l), h(n, g), h(n, d), h(e, m), h(e, c), h(c, v), h(v, w), h(w, D), h(w, M), h(v, T), h(v, b), h(c, L), h(c, N), C.m(N, null);
    },
    p(y, [_]) {
      _ & /*pct*/
      4 && G(
        i,
        "width",
        /*pct*/
        y[2].vlow + "%"
      ), _ & /*pct*/
      4 && G(
        r,
        "width",
        /*pct*/
        y[2].low + "%"
      ), _ & /*pct*/
      4 && G(
        u,
        "width",
        /*pct*/
        y[2].targ + "%"
      ), _ & /*pct*/
      4 && G(
        l,
        "width",
        /*pct*/
        y[2].high + "%"
      ), _ & /*pct*/
      4 && G(
        d,
        "width",
        /*pct*/
        y[2].vhigh + "%"
      ), _ & /*pct*/
      4 && E !== (E = /*pct*/
      y[2].targ.toFixed(1) + "") && Ct(D, E), x === (x = A(y, _)) && C ? C.p(y, _) : (C.d(1), C = x(y), C && (C.c(), C.m(N, null)));
    },
    i: Nt,
    o: Nt,
    d(y) {
      y && _t(e), C.d();
    }
  };
}
function mc(t, e, n) {
  let { data: i } = e, { range: o = null } = e, { preset: r = "N" } = e, s, u;
  const a = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol"), l = () => a() ? r === "T" ? {
    vlow: 3,
    low: 3.9,
    high: 7.8,
    vhigh: 13.9
  } : r === "P" ? {
    vlow: 3,
    low: 3.5,
    high: 7.8,
    vhigh: 13.9
  } : {
    vlow: 3,
    low: 3.9,
    high: 10,
    vhigh: 13.9
  } : r === "T" ? { vlow: 54, low: 70, high: 140, vhigh: 250 } : r === "P" ? { vlow: 54, low: 63, high: 140, vhigh: 250 } : { vlow: 54, low: 70, high: 180, vhigh: 250 };
  let g = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  };
  function d() {
    if (!i) return;
    const m = new Date(i.t0).getTime();
    n(4, s = Float64Array.from({ length: i.glucose.length }, (c, v) => m + v * i.stepMs)), n(5, u = Float64Array.from(i.glucose));
  }
  return Ne(() => {
    d();
  }), t.$$set = (m) => {
    "data" in m && n(0, i = m.data), "range" in m && n(3, o = m.range), "preset" in m && n(1, r = m.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*data*/
    1 && i && d(), t.$$.dirty & /*data, range, time, values, preset*/
    59 && i && o && s && u && r) {
      const { start: m, end: c } = o, v = Math.max(0, Math.ceil((m - s[0]) / i.stepMs)), w = Math.min(u.length - 1, Math.floor((c - s[0]) / i.stepMs));
      if (w < v)
        n(2, g = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        });
      else {
        const E = l();
        let D = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, M = 0;
        for (let T = v; T <= w; T++) {
          const b = u[T];
          Number.isFinite(b) && b >= 0 && (M++, b < E.vlow ? D.vlow++ : b < E.low ? D.low++ : b <= E.high ? D.targ++ : b <= E.vhigh ? D.high++ : D.vhigh++);
        }
        M === 0 ? n(2, g = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }) : n(2, g = {
          vlow: D.vlow / M * 100,
          low: D.low / M * 100,
          targ: D.targ / M * 100,
          high: D.high / M * 100,
          vhigh: D.vhigh / M * 100
        });
      }
    }
  }, [i, r, g, o, s, u];
}
class wc extends ue {
  constructor(e) {
    super(), fe(this, e, mc, dc, se, { data: 0, range: 3, preset: 1 });
  }
}
function vc(t) {
  let e;
  return {
    c() {
      e = X("svg"), G(e, "width", "100%"), G(e, "height", "260px"), G(e, "display", "block");
    },
    m(n, i) {
      bt(n, e, i), t[6](e);
    },
    p: Nt,
    i: Nt,
    o: Nt,
    d(n) {
      n && _t(e), t[6](null);
    }
  };
}
function _n(t, e) {
  if (!t.length) return NaN;
  const n = (t.length - 1) * e, i = Math.floor(n), o = n - i;
  return t[i] + (t[Math.min(t.length - 1, i + 1)] - t[i]) * (o || 0);
}
function pc(t, e, n) {
  let { data: i } = e, { range: o = null } = e, { preset: r = "N" } = e, s, u = 900, a = 260;
  const l = { l: 50, r: 60, t: 20, b: 26 }, g = 24 * 60 * 60 * 1e3, d = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol"), m = () => d() ? r === "T" ? {
    vlow: 3,
    low: 3.9,
    high: 7.8,
    vhigh: 13.9
  } : r === "P" ? {
    vlow: 3,
    low: 3.5,
    high: 7.8,
    vhigh: 13.9
  } : {
    vlow: 3,
    low: 3.9,
    high: 10,
    vhigh: 13.9
  } : r === "T" ? { vlow: 54, low: 70, high: 140, vhigh: 250 } : r === "P" ? { vlow: 54, low: 63, high: 140, vhigh: 250 } : { vlow: 54, low: 70, high: 180, vhigh: 250 };
  let c, v;
  function w() {
    const T = new Date(i.t0).getTime();
    n(4, c = Float64Array.from({ length: i.glucose.length }, (b, L) => T + L * i.stepMs)), n(5, v = Float64Array.from(i.glucose));
  }
  function E(T, b) {
    const L = Math.max(1, Math.round(g / i.stepMs)), N = Array.from({ length: L }, () => []), H = /* @__PURE__ */ new Set();
    for (let x = T; x <= b; x++) {
      const C = v[x];
      if (!(Number.isFinite(C) && C >= 0)) continue;
      const y = c[x], _ = new Date(y), S = new Date(_.getFullYear(), _.getMonth(), _.getDate()).getTime();
      H.add(S);
      let k = Math.round((y - S) / i.stepMs);
      k < 0 ? k = 0 : k >= L && (k = L - 1), N[k].push(C);
    }
    return {
      series: N.map((x, C) => {
        const y = Float64Array.from(x).sort();
        return {
          t: C,
          p05: _n(y, 0.05),
          p25: _n(y, 0.25),
          p50: _n(y, 0.5),
          p75: _n(y, 0.75),
          p95: _n(y, 0.95)
        };
      }),
      samplesPerDay: L,
      dayCount: H.size
    };
  }
  function D() {
    if (!s || !i || !o || !c || !v) return;
    const T = s.getBoundingClientRect();
    u = Math.max(360, T.width || 900), a = Math.max(220, T.height || 260);
    const b = Te(s);
    b.selectAll("*").remove();
    const L = Math.max(0, Math.ceil((o.start - c[0]) / i.stepMs)), N = Math.min(v.length - 1, Math.floor((o.end - c[0]) / i.stepMs));
    if (N < L) return;
    const { series: H, samplesPerDay: A, dayCount: x } = E(L, N);
    if (!H.flatMap((p) => [p.p05, p.p95]).filter(Number.isFinite).length) {
      b.append("text").attr("x", l.l).attr("y", a / 2).text("Not enough data in selection to compute AGP");
      return;
    }
    const y = un().domain([0, A - 1]).range([l.l, u - l.r]), _ = m(), S = d() ? 20 : 360, k = un().domain([_.vlow, S]).range([a - l.b, l.t]), I = ve().defined((p) => Number.isFinite(p.p05) && Number.isFinite(p.p95) && p.p05 < _.low).x((p) => y(p.t)).y0((p) => k(Math.min(p.p95, _.low))).y1((p) => k(p.p05)), R = ve().defined((p) => Number.isFinite(p.p05) && Number.isFinite(p.p95) && p.p95 > _.low && p.p05 < _.high).x((p) => y(p.t)).y0((p) => k(Math.min(p.p95, _.high))).y1((p) => k(Math.max(p.p05, _.low))), $ = ve().defined((p) => Number.isFinite(p.p05) && Number.isFinite(p.p95) && p.p95 > _.high && p.p05 < _.vhigh).x((p) => y(p.t)).y0((p) => k(Math.min(p.p95, _.vhigh))).y1((p) => k(Math.max(p.p05, _.high))), vt = ve().defined((p) => Number.isFinite(p.p05) && Number.isFinite(p.p95) && p.p95 > _.vhigh && p.p05 < _.vhigh).x((p) => y(p.t)).y0((p) => k(p.p95)).y1((p) => k(_.vhigh)), Z = ve().defined((p) => Number.isFinite(p.p05) && Number.isFinite(p.p95) && p.p05 > _.vhigh).x((p) => y(p.t)).y0((p) => k(p.p95)).y1((p) => k(p.p05));
    b.append("rect").attr("x", l.l).attr("width", u - l.r - l.l).attr("y", k(_.high)).attr("height", k(_.low) - k(_.high)).attr("fill", "#1a9850").attr("opacity", 0.1), b.append("path").attr("d", I(H)).attr("fill", "#d73027").attr("opacity", 0.18), b.append("path").attr("d", R(H)).attr("fill", "#1a9850").attr("opacity", 0.12), b.append("path").attr("d", $(H)).attr("fill", "#fdae61").attr("opacity", 0.18), b.append("path").attr("d", vt(H)).attr("fill", "#f46d43").attr("opacity", 0.26), b.append("path").attr("d", Z(H)).attr("fill", "#f46d43").attr("opacity", 0.26);
    const at = ve().defined((p) => Number.isFinite(p.p25) && Number.isFinite(p.p75) && p.p75 > _.low && p.p25 < _.high).x((p) => y(p.t)).y0((p) => k(Math.min(Math.max(p.p25, _.low), _.high))).y1((p) => k(Math.max(Math.min(p.p75, _.high), _.low))), et = ve().defined((p) => Number.isFinite(p.p25) && Number.isFinite(p.p75) && p.p75 > _.high && p.p25 < _.vhigh).x((p) => y(p.t)).y0((p) => k(Math.min(p.p75, _.vhigh))).y1((p) => k(Math.max(p.p25, _.high))), ft = ve().defined((p) => Number.isFinite(p.p25) && Number.isFinite(p.p75) && p.p75 > _.vhigh && p.p25 < _.vhigh).x((p) => y(p.t)).y0((p) => k(p.p75)).y1((p) => k(_.vhigh)), kt = ve().defined((p) => Number.isFinite(p.p25) && Number.isFinite(p.p75) && p.p25 < _.low).x((p) => y(p.t)).y0((p) => k(p.p25)).y1((p) => k(Math.min(p.p75, _.low)));
    b.append("path").attr("d", kt(H)).attr("fill", "#d73027").attr("opacity", 0.35), b.append("path").attr("d", at(H)).attr("fill", "#1a9850").attr("opacity", 0.25), b.append("path").attr("d", et(H)).attr("fill", "#fdae61").attr("opacity", 0.35), b.append("path").attr("d", ft(H)).attr("fill", "#f46d43").attr("opacity", 0.45);
    try {
      let U = function(P, Q, J) {
        return P < J && Q >= J || P > J && Q <= J;
      }, ot = function(P, Q, J, pt, yt) {
        return { t: P + (yt - Q) * (J - P) / (pt - Q), p50: yt };
      };
      const p = (P) => P < _.low ? "#d73027" : P > _.vhigh ? "#f46d43" : P > _.high ? "#fdae61" : "#1a9850", O = Fn().x((P) => y(P.t)).y((P) => k(P.p50)), B = (P, Q, J, pt) => {
        !Number.isFinite(J.p50) || !Number.isFinite(pt.p50) || ((!P.length || P[P.length - 1].color !== Q) && P.push({ color: Q, arr: [J] }), P[P.length - 1].arr.push(pt));
      };
      let F = [], W = null;
      for (let P = 0; P < H.length; P++) {
        const Q = H[P];
        if (!Number.isFinite(Q.p50)) {
          W = null;
          continue;
        }
        if (!W) {
          W = Q;
          continue;
        }
        const J = W.t, pt = W.p50, yt = Q.t, ht = Q.p50;
        let mt = [{ t: J, p50: pt }], xt = pt, st = J;
        const wt = [_.low, _.high, _.vhigh];
        (ht > pt ? wt : wt.slice().reverse()).forEach((it) => {
          if (U(xt, ht, it)) {
            const gt = ot(st, xt, yt, ht, it);
            mt.push(gt), xt = gt.p50, st = gt.t;
          }
        }), mt.push({ t: yt, p50: ht });
        for (let it = 1; it < mt.length; it++) {
          const gt = mt[it - 1], ut = mt[it], rt = (gt.p50 + ut.p50) / 2 + (ut.p50 === gt.p50 ? ut.t > gt.t ? 1e-6 : -1e-6 : 0), dt = p(rt);
          B(F, dt, gt, ut);
        }
        W = Q;
      }
      F.forEach((P) => {
        P.arr.length >= 2 && b.append("path").attr("d", O(P.arr)).attr("stroke", P.color).attr("fill", "none").attr("stroke-width", 2);
      });
    } catch {
    }
    b.append("line").attr("x1", l.l).attr("x2", u - l.r).attr("y1", k(_.high)).attr("y2", k(_.high)).attr("stroke", "#6ea77b").attr("stroke-width", 1), b.append("line").attr("x1", l.l).attr("x2", u - l.r).attr("y1", k(_.low)).attr("y2", k(_.low)).attr("stroke", "#6ea77b").attr("stroke-width", 1), b.append("line").attr("x1", l.l).attr("x2", u - l.r).attr("y1", k(_.vlow)).attr("y2", k(_.vlow)).attr("stroke", "#cccccc").attr("stroke-width", 1), b.append("line").attr("x1", l.l).attr("x2", u - l.r).attr("y1", k(_.vhigh)).attr("y2", k(_.vhigh)).attr("stroke", "#cccccc").attr("stroke-width", 1);
    const V = 60 * 60 * 1e3 / i.stepMs, q = Li(0, 24, 3).map((p) => Math.round(p * V)), tt = (p) => p === 0 || p === 24 ? "12am" : p < 12 ? `${p}am` : p === 12 ? "12pm" : `${p - 12}pm`;
    b.append("g").attr("transform", `translate(0,${a - l.b})`).call(Ol(y).tickValues(q).tickFormat((p) => tt(Math.round(p / V))).tickSizeOuter(0));
    const Et = [m().vlow, m().low, m().high, m().vhigh, d() ? 20 : 360].filter((p) => p >= _.vlow && p <= S), lt = d() ? (p) => Math.round(p * 10) / 10 : (p) => Math.round(p);
    b.append("g").attr("transform", `translate(${l.l},0)`).call(Jl(k).tickValues(Et).tickFormat(lt)).call((p) => p.select(".domain").remove());
    try {
      if (x && x > 2) {
        const p = (U) => {
          for (let ot = H.length - 1; ot >= 0; ot--) {
            const F = H[ot][U];
            if (Number.isFinite(F)) return { t: H[ot].t, v: F };
          }
          return null;
        }, B = (U, ot) => {
          if (!ot) return;
          const F = Math.min(u - l.r - 2, y(ot.t) + 41), W = k(ot.v);
          Te(s).append("text").attr("x", F + 5).attr("y", W).attr("dy", "0.35em").attr("text-anchor", "start").attr("fill", "#000").attr("font-size", 11).attr("font-weight", U === 50 ? 700 : 400).text(`${U}%`);
        };
        B(5, p("p05")), B(25, p("p25")), B(50, p("p50")), B(75, p("p75")), B(95, p("p95"));
      }
    } catch {
    }
    try {
      let F = function(W) {
        const P = k(W), Q = Te(s).append("text").attr("x", -9999).attr("y", -9999).attr("fill", "#fff").attr("font-size", 11).attr("font-weight", 700).text(ot(W)), J = Q.node().getBBox();
        Q.remove();
        const pt = Math.ceil(J.width), yt = l.l - 8 - (pt + 6 * 2), ht = P - 16 / 2;
        Te(s).append("rect").attr("x", yt).attr("y", ht).attr("rx", 5).attr("ry", 5).attr("width", pt + 6 * 2).attr("height", 16).attr("fill", U), Te(s).append("text").attr("x", yt + 6).attr("y", P).attr("dy", "0.35em").attr("fill", "#fff").attr("font-size", 11).attr("font-weight", 700).text(ot(W));
      };
      const U = "#1a9850", ot = (W) => {
        if (d()) {
          const P = (Math.round(W * 10) / 10).toFixed(1);
          return P.endsWith(".0") ? P.slice(0, -2) : P;
        }
        return Math.round(W).toString();
      };
      F(_.low), F(_.high);
    } catch {
    }
  }
  Ne(() => {
    w(), D(), window.addEventListener("resize", D);
  });
  function M(T) {
    Ce[T ? "unshift" : "push"](() => {
      s = T, n(0, s);
    });
  }
  return t.$$set = (T) => {
    "data" in T && n(1, i = T.data), "range" in T && n(2, o = T.range), "preset" in T && n(3, r = T.preset);
  }, t.$$.update = () => {
    t.$$.dirty & /*data, range, time, values, preset*/
    62 && i && o && c && v && r && D();
  }, [s, i, o, r, c, v, M];
}
class yc extends ue {
  constructor(e) {
    super(), fe(this, e, pc, vc, se, { data: 1, range: 2, preset: 3 });
  }
}
function _c(t) {
  let e, n, i, o, r, s, u, a, l, g, d, m, c, v, w = be(
    /*pct*/
    t[0].vlow
  ) + "", E, D, M, T, b = be(
    /*pct*/
    t[0].low
  ) + "", L, N, H, A, x, C = be(
    /*pct*/
    t[0].targ
  ) + "", y, _, S, k, I = be(
    /*pct*/
    t[0].high
  ) + "", R, $, vt, Z, at = be(
    /*pct*/
    t[0].vhigh
  ) + "", et, ft, kt, V;
  return {
    c() {
      e = Y("div"), n = Y("div"), i = Y("div"), o = j(), r = Y("div"), s = j(), u = Y("div"), a = j(), l = Y("div"), g = j(), d = Y("div"), m = j(), c = Y("div"), v = Y("div"), E = z(w), D = z(" Very Low"), M = j(), T = Y("div"), L = z(b), N = z(" Low"), H = j(), A = Y("div"), x = Y("span"), y = z(C), _ = z(" In Range"), S = j(), k = Y("div"), R = z(I), $ = z(" High"), vt = j(), Z = Y("div"), et = z(at), ft = z(" Very High"), kt = j(), V = Y("div"), V.textContent = `${/*presetLabel*/
      t[1]()} Range Used: ${/*rangeText*/
      t[2]()}`, f(i, "class", "seg vlow svelte-10886f1"), G(
        i,
        "flex-basis",
        /*pct*/
        t[0].vlow + "%"
      ), f(r, "class", "seg low svelte-10886f1"), G(
        r,
        "flex-basis",
        /*pct*/
        t[0].low + "%"
      ), f(u, "class", "seg targ svelte-10886f1"), G(
        u,
        "flex-basis",
        /*pct*/
        t[0].targ + "%"
      ), f(l, "class", "seg high svelte-10886f1"), G(
        l,
        "flex-basis",
        /*pct*/
        t[0].high + "%"
      ), f(d, "class", "seg vhigh svelte-10886f1"), G(
        d,
        "flex-basis",
        /*pct*/
        t[0].vhigh + "%"
      ), f(n, "class", "stack svelte-10886f1"), f(v, "class", "row small svelte-10886f1"), f(T, "class", "row small svelte-10886f1"), f(x, "class", "strong svelte-10886f1"), f(A, "class", "row big svelte-10886f1"), f(k, "class", "row small svelte-10886f1"), f(Z, "class", "row small svelte-10886f1"), f(V, "class", "note svelte-10886f1"), f(c, "class", "labels svelte-10886f1"), f(e, "class", "tir-card svelte-10886f1");
    },
    m(q, tt) {
      bt(q, e, tt), h(e, n), h(n, i), h(n, o), h(n, r), h(n, s), h(n, u), h(n, a), h(n, l), h(n, g), h(n, d), h(e, m), h(e, c), h(c, v), h(v, E), h(v, D), h(c, M), h(c, T), h(T, L), h(T, N), h(c, H), h(c, A), h(A, x), h(x, y), h(A, _), h(c, S), h(c, k), h(k, R), h(k, $), h(c, vt), h(c, Z), h(Z, et), h(Z, ft), h(c, kt), h(c, V);
    },
    p(q, [tt]) {
      tt & /*pct*/
      1 && G(
        i,
        "flex-basis",
        /*pct*/
        q[0].vlow + "%"
      ), tt & /*pct*/
      1 && G(
        r,
        "flex-basis",
        /*pct*/
        q[0].low + "%"
      ), tt & /*pct*/
      1 && G(
        u,
        "flex-basis",
        /*pct*/
        q[0].targ + "%"
      ), tt & /*pct*/
      1 && G(
        l,
        "flex-basis",
        /*pct*/
        q[0].high + "%"
      ), tt & /*pct*/
      1 && G(
        d,
        "flex-basis",
        /*pct*/
        q[0].vhigh + "%"
      ), tt & /*pct*/
      1 && w !== (w = be(
        /*pct*/
        q[0].vlow
      ) + "") && Ct(E, w), tt & /*pct*/
      1 && b !== (b = be(
        /*pct*/
        q[0].low
      ) + "") && Ct(L, b), tt & /*pct*/
      1 && C !== (C = be(
        /*pct*/
        q[0].targ
      ) + "") && Ct(y, C), tt & /*pct*/
      1 && I !== (I = be(
        /*pct*/
        q[0].high
      ) + "") && Ct(R, I), tt & /*pct*/
      1 && at !== (at = be(
        /*pct*/
        q[0].vhigh
      ) + "") && Ct(et, at);
    },
    i: Nt,
    o: Nt,
    d(q) {
      q && _t(e);
    }
  };
}
function be(t) {
  return !Number.isFinite(t) || t <= 0 ? "0 %" : t < 1 ? "<1 %" : `${Math.round(t)} %`;
}
function bc(t, e, n) {
  const i = gn();
  let { data: o } = e, { range: r = null } = e, { preset: s = "N" } = e, u, a;
  const l = () => /mmol/i.test((o == null ? void 0 : o.units) || "mmol"), g = () => l() ? s === "T" ? {
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
  let d = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  }, m = 0, c = 0;
  function v() {
    if (!o) return;
    const M = new Date(o.t0).getTime();
    n(6, u = Float64Array.from({ length: o.glucose.length }, (T, b) => M + b * o.stepMs)), n(7, a = Float64Array.from(o.glucose));
  }
  function w() {
    try {
      i("stats", {
        pct: d,
        present: m,
        expected: c,
        preset: s,
        units: (o == null ? void 0 : o.units) || "mmol/L"
      });
    } catch {
    }
  }
  function E() {
    return s === "T" ? "Tight" : s === "P" ? "Pregnancy" : "General";
  }
  function D() {
    const M = g();
    if (l()) {
      const T = (b) => {
        const L = (Math.round(b * 10) / 10).toFixed(1);
        return L.endsWith(".0") ? L.slice(0, -2) : L;
      };
      return `${T(M.low)}–${T(M.high)} mmol/L`;
    }
    return `${Math.round(M.low)}–${Math.round(M.high)} mg/dL`;
  }
  return t.$$set = (M) => {
    "data" in M && n(3, o = M.data), "range" in M && n(4, r = M.range), "preset" in M && n(5, s = M.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*data*/
    8 && o && v(), t.$$.dirty & /*data, range, time, values, preset*/
    248 && o && r && u && a && s) {
      const { start: M, end: T } = r, b = Math.max(0, Math.ceil((M - u[0]) / o.stepMs)), L = Math.min(a.length - 1, Math.floor((T - u[0]) / o.stepMs));
      if (L < b)
        n(0, d = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }), m = 0, c = 0;
      else {
        const N = g();
        let H = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, A = 0;
        for (let x = b; x <= L; x++) {
          const C = a[x];
          Number.isFinite(C) && C >= 0 && (A++, C < N.vlow ? H.vlow++ : C < N.low ? H.low++ : C <= N.high ? H.targ++ : C <= N.vhigh ? H.high++ : H.vhigh++);
        }
        m = A, c = Math.max(1, L - b + 1), A === 0 ? n(0, d = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }) : n(0, d = {
          vlow: H.vlow / A * 100,
          low: H.low / A * 100,
          targ: H.targ / A * 100,
          high: H.high / A * 100,
          vhigh: H.vhigh / A * 100
        });
      }
      w();
    }
  }, [d, E, D, o, r, s, u, a];
}
class xc extends ue {
  constructor(e) {
    super(), fe(this, e, bc, _c, se, { data: 3, range: 4, preset: 5 });
  }
}
function Kr(t) {
  let e, n, i, o, r = (
    /*sepShow*/
    t[2].vlowLow && $r(t)
  ), s = (
    /*sepShow*/
    t[2].lowTarg && jr(t)
  ), u = (
    /*sepShow*/
    t[2].targHigh && to(t)
  ), a = (
    /*sepShow*/
    t[2].highVhigh && eo(t)
  );
  return {
    c() {
      e = Y("div"), r && r.c(), n = j(), s && s.c(), i = j(), u && u.c(), o = j(), a && a.c(), f(e, "class", "seps svelte-1d0oop4");
    },
    m(l, g) {
      bt(l, e, g), r && r.m(e, null), h(e, n), s && s.m(e, null), h(e, i), u && u.m(e, null), h(e, o), a && a.m(e, null);
    },
    p(l, g) {
      /*sepShow*/
      l[2].vlowLow ? r ? r.p(l, g) : (r = $r(l), r.c(), r.m(e, n)) : r && (r.d(1), r = null), /*sepShow*/
      l[2].lowTarg ? s ? s.p(l, g) : (s = jr(l), s.c(), s.m(e, i)) : s && (s.d(1), s = null), /*sepShow*/
      l[2].targHigh ? u ? u.p(l, g) : (u = to(l), u.c(), u.m(e, o)) : u && (u.d(1), u = null), /*sepShow*/
      l[2].highVhigh ? a ? a.p(l, g) : (a = eo(l), a.c(), a.m(e, null)) : a && (a.d(1), a = null);
    },
    d(l) {
      l && _t(e), r && r.d(), s && s.d(), u && u.d(), a && a.d();
    }
  };
}
function $r(t) {
  let e;
  return {
    c() {
      e = Y("div"), f(e, "class", "sep svelte-1d0oop4"), G(e, "top", 100 - /*pct*/
      t[1].vlow + "%");
    },
    m(n, i) {
      bt(n, e, i);
    },
    p(n, i) {
      i & /*pct*/
      2 && G(e, "top", 100 - /*pct*/
      n[1].vlow + "%");
    },
    d(n) {
      n && _t(e);
    }
  };
}
function jr(t) {
  let e;
  return {
    c() {
      e = Y("div"), f(e, "class", "sep svelte-1d0oop4"), G(e, "top", 100 - /*pct*/
      (t[1].vlow + /*pct*/
      t[1].low) + "%");
    },
    m(n, i) {
      bt(n, e, i);
    },
    p(n, i) {
      i & /*pct*/
      2 && G(e, "top", 100 - /*pct*/
      (n[1].vlow + /*pct*/
      n[1].low) + "%");
    },
    d(n) {
      n && _t(e);
    }
  };
}
function to(t) {
  let e;
  return {
    c() {
      e = Y("div"), f(e, "class", "sep svelte-1d0oop4"), G(e, "top", 100 - /*pct*/
      (t[1].vlow + /*pct*/
      t[1].low + /*pct*/
      t[1].targ) + "%");
    },
    m(n, i) {
      bt(n, e, i);
    },
    p(n, i) {
      i & /*pct*/
      2 && G(e, "top", 100 - /*pct*/
      (n[1].vlow + /*pct*/
      n[1].low + /*pct*/
      n[1].targ) + "%");
    },
    d(n) {
      n && _t(e);
    }
  };
}
function eo(t) {
  let e;
  return {
    c() {
      e = Y("div"), f(e, "class", "sep svelte-1d0oop4"), G(e, "top", 100 - /*pct*/
      (t[1].vlow + /*pct*/
      t[1].low + /*pct*/
      t[1].targ + /*pct*/
      t[1].high) + "%");
    },
    m(n, i) {
      bt(n, e, i);
    },
    p(n, i) {
      i & /*pct*/
      2 && G(e, "top", 100 - /*pct*/
      (n[1].vlow + /*pct*/
      n[1].low + /*pct*/
      n[1].targ + /*pct*/
      n[1].high) + "%");
    },
    d(n) {
      n && _t(e);
    }
  };
}
function Mc(t) {
  let e, n, i, o, r, s, u, a, l, g, d, m, c, v, w, E, D, M, T, b, L, N, H, A, x, C, y, _, S = (
    /*fmtPct*/
    t[4](
      /*pct*/
      t[1].vhigh
    ) + ""
  ), k, I, R, $, vt, Z = (
    /*fmtPct*/
    t[4](
      /*pct*/
      t[1].high
    ) + ""
  ), at, et, ft, kt, V, q, tt = (
    /*combineTop*/
    t[5]() + ""
  ), Et, lt, p, O, B, U, ot, F, W = (
    /*fmtPct*/
    t[4](
      /*pct*/
      t[1].targ
    ) + ""
  ), P, Q, J, pt, yt, ht, mt, xt, st, wt, nt = (
    /*fmtPct*/
    t[4](
      /*pct*/
      t[1].low
    ) + ""
  ), At, it, gt, ut, rt, dt = (
    /*fmtPct*/
    t[4](
      /*pct*/
      t[1].vlow
    ) + ""
  ), Mt, Ft, Tt, Ut, It, Pt, K = (
    /*combineLow*/
    t[6]() + ""
  ), Ht, zt, oe, Bt, Zt, Dt = (
    /*showSeparators*/
    t[0] && Kr(t)
  );
  return {
    c() {
      e = Y("div"), n = Y("div"), i = Y("div"), o = Y("div"), r = j(), s = Y("div"), u = j(), a = Y("div"), l = j(), g = Y("div"), d = j(), m = Y("div"), c = j(), Dt && Dt.c(), v = j(), w = Y("div"), E = Y("div"), D = Y("span"), D.textContent = `${/*unitValue*/
      t[7](
        /*TH*/
        t[3]().high
      )}`, M = j(), T = Y("div"), b = Y("span"), b.textContent = `${/*unitValue*/
      t[7](
        /*TH*/
        t[3]().vhigh
      )}`, L = j(), N = Y("div"), H = Y("div"), A = Y("div"), A.textContent = "Goal: <5%", x = j(), C = Y("div"), y = Y("div"), y.textContent = "Very High", _ = Y("div"), k = z(S), I = j(), R = Y("div"), $ = Y("div"), $.textContent = "High", vt = Y("div"), at = z(Z), et = j(), ft = Y("div"), kt = Y("div"), V = j(), q = Y("div"), Et = z(tt), lt = z("% "), p = Y("span"), p.textContent = "Goal: <25%", O = j(), B = Y("div"), U = Y("div"), ot = Y("div"), ot.textContent = "Target", F = Y("div"), P = z(W), Q = j(), J = Y("div"), J.textContent = "Goal: ≥70%", pt = j(), yt = Y("div"), yt.textContent = "Each 5% increase is clinically beneficial", ht = j(), mt = Y("div"), xt = Y("div"), st = Y("div"), st.textContent = "Low", wt = Y("div"), At = z(nt), it = j(), gt = Y("div"), ut = Y("div"), ut.textContent = "Very Low", rt = Y("div"), Mt = z(dt), Ft = j(), Tt = Y("div"), Ut = Y("div"), It = j(), Pt = Y("div"), Ht = z(K), zt = z("% "), oe = Y("span"), oe.textContent = "Goal: <4%", Bt = j(), Zt = Y("div"), Zt.textContent = "Each 1% time in range = about 15 minutes", f(o, "class", "seg vhigh svelte-1d0oop4"), G(
        o,
        "flex-basis",
        /*pct*/
        t[1].vhigh + "%"
      ), f(s, "class", "seg high svelte-1d0oop4"), G(
        s,
        "flex-basis",
        /*pct*/
        t[1].high + "%"
      ), f(a, "class", "seg targ svelte-1d0oop4"), G(
        a,
        "flex-basis",
        /*pct*/
        t[1].targ + "%"
      ), f(g, "class", "seg low svelte-1d0oop4"), G(
        g,
        "flex-basis",
        /*pct*/
        t[1].low + "%"
      ), f(m, "class", "seg vlow svelte-1d0oop4"), G(
        m,
        "flex-basis",
        /*pct*/
        t[1].vlow + "%"
      ), f(i, "class", "stack svelte-1d0oop4"), f(D, "class", "svelte-1d0oop4"), f(E, "class", "tick svelte-1d0oop4"), G(E, "top", "18%"), f(b, "class", "svelte-1d0oop4"), f(T, "class", "tick svelte-1d0oop4"), G(T, "top", "6%"), f(w, "class", "ticks svelte-1d0oop4"), f(n, "class", "barcol svelte-1d0oop4"), f(A, "class", "goal svelte-1d0oop4"), f(y, "class", "label svelte-1d0oop4"), f(_, "class", "val svelte-1d0oop4"), f(C, "class", "row svelte-1d0oop4"), f($, "class", "label svelte-1d0oop4"), f(vt, "class", "val svelte-1d0oop4"), f(R, "class", "row svelte-1d0oop4"), f(kt, "class", "brace svelte-1d0oop4"), f(p, "class", "goaltext svelte-1d0oop4"), f(q, "class", "sum svelte-1d0oop4"), f(ft, "class", "bracket svelte-1d0oop4"), f(H, "class", "group top svelte-1d0oop4"), f(ot, "class", "label svelte-1d0oop4"), f(F, "class", "val svelte-1d0oop4"), f(U, "class", "row emph svelte-1d0oop4"), f(J, "class", "goal inline svelte-1d0oop4"), f(yt, "class", "note svelte-1d0oop4"), f(B, "class", "group mid svelte-1d0oop4"), f(st, "class", "label svelte-1d0oop4"), f(wt, "class", "val svelte-1d0oop4"), f(xt, "class", "row svelte-1d0oop4"), f(ut, "class", "label svelte-1d0oop4"), f(rt, "class", "val svelte-1d0oop4"), f(gt, "class", "row svelte-1d0oop4"), f(Ut, "class", "brace svelte-1d0oop4"), f(oe, "class", "goaltext svelte-1d0oop4"), f(Pt, "class", "sum svelte-1d0oop4"), f(Tt, "class", "bracket small svelte-1d0oop4"), f(mt, "class", "group low svelte-1d0oop4"), f(Zt, "class", "foot svelte-1d0oop4"), f(N, "class", "rightcol svelte-1d0oop4"), f(e, "class", "agp-card svelte-1d0oop4");
    },
    m(St, Yt) {
      bt(St, e, Yt), h(e, n), h(n, i), h(i, o), h(i, r), h(i, s), h(i, u), h(i, a), h(i, l), h(i, g), h(i, d), h(i, m), h(i, c), Dt && Dt.m(i, null), h(n, v), h(n, w), h(w, E), h(E, D), h(w, M), h(w, T), h(T, b), h(e, L), h(e, N), h(N, H), h(H, A), h(H, x), h(H, C), h(C, y), h(C, _), h(_, k), h(H, I), h(H, R), h(R, $), h(R, vt), h(vt, at), h(H, et), h(H, ft), h(ft, kt), h(ft, V), h(ft, q), h(q, Et), h(q, lt), h(q, p), h(N, O), h(N, B), h(B, U), h(U, ot), h(U, F), h(F, P), h(B, Q), h(B, J), h(B, pt), h(B, yt), h(N, ht), h(N, mt), h(mt, xt), h(xt, st), h(xt, wt), h(wt, At), h(mt, it), h(mt, gt), h(gt, ut), h(gt, rt), h(rt, Mt), h(mt, Ft), h(mt, Tt), h(Tt, Ut), h(Tt, It), h(Tt, Pt), h(Pt, Ht), h(Pt, zt), h(Pt, oe), h(N, Bt), h(N, Zt);
    },
    p(St, [Yt]) {
      Yt & /*pct*/
      2 && G(
        o,
        "flex-basis",
        /*pct*/
        St[1].vhigh + "%"
      ), Yt & /*pct*/
      2 && G(
        s,
        "flex-basis",
        /*pct*/
        St[1].high + "%"
      ), Yt & /*pct*/
      2 && G(
        a,
        "flex-basis",
        /*pct*/
        St[1].targ + "%"
      ), Yt & /*pct*/
      2 && G(
        g,
        "flex-basis",
        /*pct*/
        St[1].low + "%"
      ), Yt & /*pct*/
      2 && G(
        m,
        "flex-basis",
        /*pct*/
        St[1].vlow + "%"
      ), /*showSeparators*/
      St[0] ? Dt ? Dt.p(St, Yt) : (Dt = Kr(St), Dt.c(), Dt.m(i, null)) : Dt && (Dt.d(1), Dt = null), Yt & /*pct*/
      2 && S !== (S = /*fmtPct*/
      St[4](
        /*pct*/
        St[1].vhigh
      ) + "") && Ct(k, S), Yt & /*pct*/
      2 && Z !== (Z = /*fmtPct*/
      St[4](
        /*pct*/
        St[1].high
      ) + "") && Ct(at, Z), Yt & /*pct*/
      2 && W !== (W = /*fmtPct*/
      St[4](
        /*pct*/
        St[1].targ
      ) + "") && Ct(P, W), Yt & /*pct*/
      2 && nt !== (nt = /*fmtPct*/
      St[4](
        /*pct*/
        St[1].low
      ) + "") && Ct(At, nt), Yt & /*pct*/
      2 && dt !== (dt = /*fmtPct*/
      St[4](
        /*pct*/
        St[1].vlow
      ) + "") && Ct(Mt, dt);
    },
    i: Nt,
    o: Nt,
    d(St) {
      St && _t(e), Dt && Dt.d();
    }
  };
}
const Tc = 260, kc = 3;
function Cc(t, e, n) {
  let i;
  const o = gn();
  let { data: r } = e, { range: s = null } = e, { preset: u = "N" } = e, { showSeparators: a = !1 } = e, l, g;
  const d = () => /mmol/i.test((r == null ? void 0 : r.units) || "mmol"), m = () => d() ? u === "T" ? {
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
  let c = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  }, v = 0;
  function w() {
    if (!r) return;
    const N = new Date(r.t0).getTime();
    n(11, l = Float64Array.from({ length: r.glucose.length }, (H, A) => N + A * r.stepMs)), n(12, g = Float64Array.from(r.glucose));
  }
  function E() {
    try {
      o("stats", {
        pct: c,
        present: v,
        preset: u,
        units: (r == null ? void 0 : r.units) || "mmol/L"
      });
    } catch {
    }
  }
  const D = (N) => `${Math.round(N)}%`, M = () => Math.round(c.high + c.vhigh), T = () => Math.round(c.low + c.vlow), b = (N) => d() ? (Math.round(N * 10) / 10).toString() : Math.round(N).toString(), L = kc / Tc * 100;
  return t.$$set = (N) => {
    "data" in N && n(8, r = N.data), "range" in N && n(9, s = N.range), "preset" in N && n(10, u = N.preset), "showSeparators" in N && n(0, a = N.showSeparators);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*data*/
    256 && r && w(), t.$$.dirty & /*data, range, time, values, preset*/
    7936 && r && s && l && g && u) {
      const { start: N, end: H } = s, A = Math.max(0, Math.ceil((N - l[0]) / r.stepMs)), x = Math.min(g.length - 1, Math.floor((H - l[0]) / r.stepMs));
      if (x < A)
        n(1, c = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }), v = 0;
      else {
        const C = m();
        let y = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, _ = 0;
        for (let S = A; S <= x; S++) {
          const k = g[S];
          Number.isFinite(k) && k >= 0 && (_++, k < C.vlow ? y.vlow++ : k < C.low ? y.low++ : k <= C.high ? y.targ++ : k <= C.vhigh ? y.high++ : y.vhigh++);
        }
        v = _, _ === 0 ? n(1, c = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }) : n(1, c = {
          vlow: y.vlow / _ * 100,
          low: y.low / _ * 100,
          targ: y.targ / _ * 100,
          high: y.high / _ * 100,
          vhigh: y.vhigh / _ * 100
        });
      }
      E();
    }
    t.$$.dirty & /*pct*/
    2 && n(2, i = {
      vlowLow: c.vlow > 0 && c.low > 0 && Math.min(c.vlow, c.low) >= L,
      lowTarg: c.low > 0 && c.targ > 0 && Math.min(c.low, c.targ) >= L,
      targHigh: c.targ > 0 && c.high > 0 && Math.min(c.targ, c.high) >= L,
      highVhigh: c.high > 0 && c.vhigh > 0 && Math.min(c.high, c.vhigh) >= L
    });
  }, [
    a,
    c,
    i,
    m,
    D,
    M,
    T,
    b,
    r,
    s,
    u,
    l,
    g
  ];
}
class Nc extends ue {
  constructor(e) {
    super(), fe(this, e, Cc, Mc, se, {
      data: 8,
      range: 9,
      preset: 10,
      showSeparators: 0
    });
  }
}
function Ac(t) {
  let e;
  return {
    c() {
      e = Y("canvas"), G(e, "width", "100%"), G(e, "height", "auto"), G(e, "display", "block");
    },
    m(n, i) {
      bt(n, e, i), t[6](e);
    },
    p: Nt,
    i: Nt,
    o: Nt,
    d(n) {
      n && _t(e), t[6](null);
    }
  };
}
function bn(t) {
  return `${Math.round(t)}%`;
}
function Dc(t, e, n) {
  const i = gn();
  let { data: o } = e, { range: r = null } = e, { preset: s = "N" } = e, u, a, l, g;
  const d = () => /mmol/i.test((o == null ? void 0 : o.units) || "mmol"), m = () => d() ? s === "T" ? {
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
  } : s === "T" ? { vlow: 54, low: 70, high: 140, vhigh: 250 } : s === "P" ? { vlow: 54, low: 63, high: 140, vhigh: 250 } : { vlow: 54, low: 70, high: 180, vhigh: 250 }, c = {
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
  let w = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  }, E = 0;
  function D() {
    if (!o) return;
    const x = new Date(o.t0).getTime();
    n(4, l = Float64Array.from({ length: o.glucose.length }, (C, y) => x + y * o.stepMs)), n(5, g = Float64Array.from(o.glucose));
  }
  function M() {
    try {
      i("stats", {
        pct: w,
        present: E,
        preset: s,
        units: (o == null ? void 0 : o.units) || "mmol/L"
      });
    } catch {
    }
  }
  function T(x) {
    return d() ? (Math.round(x * 10) / 10).toString() : Math.round(x).toString();
  }
  function b(x, C, y, _, S) {
    a.beginPath(), a.moveTo(x + S, C), a.lineTo(x + y - S, C), a.arcTo(x + y, C, x + y, C + S, S), a.lineTo(x + y, C + _ - S), a.arcTo(x + y, C + _, x + y - S, C + _, S), a.lineTo(x + S, C + _), a.arcTo(x, C + _, x, C + _ - S, S), a.lineTo(x, C + S), a.arcTo(x, C, x + S, C, S);
  }
  function L(x, C, y, _, S) {
    a.beginPath(), a.moveTo(x, y), a.lineTo(C - S, y), a.arcTo(C, y, C, y + S, S), a.lineTo(C, _ - S), a.arcTo(C, _, C - S, _, S), a.lineTo(x, _);
  }
  function N() {
    if (!u) return;
    const x = Math.max(1, window.devicePixelRatio || 1), C = Math.max(600, u.getBoundingClientRect().width || 820), y = 320;
    n(0, u.style.width = C + "px", u), n(0, u.style.height = y + "px", u), n(0, u.width = Math.floor(C * x), u), n(0, u.height = Math.floor(y * x), u), a.setTransform(x, 0, 0, x, 0, 0), a.clearRect(0, 0, C, y), a.fillStyle = "#fff", a.strokeStyle = "#e5e7eb", a.lineWidth = 1, b(8, 8, C - 16, y - 16, 12), a.fill(), a.stroke();
    const _ = 56, S = 70, k = 240, I = 36, R = 72, $ = 72, vt = 80, Z = 8, at = 8;
    let et = I;
    a.strokeStyle = "#d6d9df", a.lineWidth = 1, a.strokeRect(_, I, S, k);
    const ft = (wt, nt) => {
      nt <= 0 || (a.fillStyle = wt, a.fillRect(_, et, S, nt), et += nt);
    };
    ft(c.vhigh, R), ft(c.high, $), ft(c.targ, vt), ft(c.low, Z), ft(c.vlow, at), a.fillStyle = "#4b515a", a.font = `700 ${v.tick}px system-ui`, a.textAlign = "right", a.textBaseline = "middle";
    const kt = I + R, V = I + R + $;
    a.fillText(T(m().vhigh), _ - 10, kt), a.fillText(T(m().high), _ - 10, V), a.textAlign = "left", a.fillText(T(m().vhigh), _ + S + 10, kt), a.fillText(T(m().high), _ + S + 10, V);
    const q = _ + S + 32;
    a.fillStyle = "#8c939e", a.font = `600 ${v.goal}px system-ui`, a.textAlign = "left", a.fillText("Goal: <5%", q, I - 8), a.fillStyle = "#333", a.font = `800 ${v.label}px system-ui`, a.textAlign = "left", a.textBaseline = "alphabetic";
    const tt = I + 16, Et = I + 48;
    a.fillText("Very High", q, tt), a.textAlign = "right", a.fillText(bn(w.vhigh), q + 148, tt), a.textAlign = "left", a.fillText("High", q, Et), a.textAlign = "right", a.fillText(bn(w.high), q + 148, Et);
    const lt = tt - 12, p = Et + 10, O = q + 160, B = O + 240;
    a.strokeStyle = "#b9bfc7", a.lineWidth = 2, L(O, B, lt, p, 14), a.stroke();
    const U = 10, ot = q - 12, F = lt;
    a.beginPath(), a.moveTo(ot + U, F), a.arcTo(ot, F, ot, F + U, U), a.stroke(), a.font = `800 ${v.percentXL}px system-ui`, a.fillStyle = "#333", a.textAlign = "left", a.fillText(`${Math.round(w.vhigh + w.high)}%`, O + 24, (lt + p) / 2 + 10), a.textAlign = "right", a.font = `600 ${v.goal}px system-ui`, a.fillStyle = "#8c939e", a.fillText("Goal: <25%", B - 10, (lt + p) / 2 + 10);
    const W = B, P = I + 118, Q = P + 26, J = Q + 6;
    a.fillStyle = "#333", a.font = `800 ${v.targetLabel}px system-ui`, a.textAlign = "left", a.fillText("Target", q, Q), a.textAlign = "right", a.fillText(bn(w.targ), q + 148, Q), a.fillStyle = "#8c939e", a.font = `600 ${v.goal}px system-ui`, a.textAlign = "left", a.fillText("Goal: ≥70%", W - 84, Q - 2), a.strokeStyle = "#9aa1ab", a.lineWidth = 2, a.beginPath(), a.moveTo(q, J), a.lineTo(W, J), a.stroke(), a.textAlign = "center", a.font = `${v.note}px system-ui`, a.fillText("Each 5% increase is clinically beneficial", (q + W) / 2, J + 16);
    const pt = P + 86, yt = pt + 28;
    a.fillStyle = "#333", a.font = `800 ${v.label}px system-ui`, a.textAlign = "left", a.fillText("Low", q, pt), a.textAlign = "right", a.fillText(bn(w.low), q + 148, pt), a.textAlign = "left", a.fillText("Very Low", q, yt), a.textAlign = "right", a.fillText(bn(w.vlow), q + 148, yt);
    const ht = q - 12, mt = pt + 6, xt = yt + 8, st = W;
    a.strokeStyle = "#b9bfc7", a.lineWidth = 2, a.beginPath(), a.moveTo(ht + 12, mt), a.arcTo(ht, mt, ht, mt + 12, 12), a.lineTo(ht, xt - 12), a.arcTo(ht, xt, ht + 12, xt, 12), a.lineTo(st, xt), a.stroke(), a.textAlign = "left", a.font = `800 ${v.percentL}px system-ui`, a.fillStyle = "#333", a.fillText(`${Math.round(w.low + w.vlow)}%`, ht + 80, xt + 8), a.textAlign = "left", a.font = `600 ${v.goal}px system-ui`, a.fillStyle = "#8c939e", a.fillText("Goal: <4%", ht + 160, xt - 2), a.textAlign = "right", a.fillStyle = "#8c939e", a.font = `${v.note}px system-ui`, a.fillText("Each 1% time in range = about 15 minutes", C - 24, I + k + 28);
  }
  function H() {
    N();
  }
  Ne(() => (a = u.getContext("2d"), N(), window.addEventListener("resize", H), () => window.removeEventListener("resize", H)));
  function A(x) {
    Ce[x ? "unshift" : "push"](() => {
      u = x, n(0, u);
    });
  }
  return t.$$set = (x) => {
    "data" in x && n(1, o = x.data), "range" in x && n(2, r = x.range), "preset" in x && n(3, s = x.preset);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*data*/
    2 && o && D(), t.$$.dirty & /*data, range, time, values, preset*/
    62 && o && r && l && g && s) {
      const { start: x, end: C } = r, y = Math.max(0, Math.ceil((x - l[0]) / o.stepMs)), _ = Math.min(g.length - 1, Math.floor((C - l[0]) / o.stepMs));
      if (_ < y)
        w = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, E = 0;
      else {
        const S = m();
        let k = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, I = 0;
        for (let R = y; R <= _; R++) {
          const $ = g[R];
          Number.isFinite($) && $ >= 0 && (I++, $ < S.vlow ? k.vlow++ : $ < S.low ? k.low++ : $ <= S.high ? k.targ++ : $ <= S.vhigh ? k.high++ : k.vhigh++);
        }
        E = I, I === 0 ? w = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        } : w = {
          vlow: k.vlow / I * 100,
          low: k.low / I * 100,
          targ: k.targ / I * 100,
          high: k.high / I * 100,
          vhigh: k.vhigh / I * 100
        };
      }
      N(), M();
    }
  }, [u, o, r, s, l, g, A];
}
class Sc extends ue {
  constructor(e) {
    super(), fe(this, e, Dc, Ac, se, { data: 1, range: 2, preset: 3 });
  }
}
function Fc(t) {
  let e;
  return {
    c() {
      e = Y("canvas"), G(e, "width", "100%"), G(e, "display", "block");
    },
    m(n, i) {
      bt(n, e, i), t[4](e);
    },
    p: Nt,
    i: Nt,
    o: Nt,
    d(n) {
      n && _t(e), t[4](null);
    }
  };
}
function Ec(t, e, n) {
  const i = gn();
  let { data: o } = e, { range: r = null } = e, { preset: s = "N" } = e, u, a, l, g;
  const d = () => /mmol/i.test((o == null ? void 0 : o.units) || "mmol"), m = () => d() ? s === "T" ? {
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
  } : s === "T" ? { vlow: 54, low: 70, high: 140, vhigh: 250 } : s === "P" ? { vlow: 54, low: 63, high: 140, vhigh: 250 } : { vlow: 54, low: 70, high: 180, vhigh: 250 }, c = {
    vlow: "#8a2f2f",
    low: "#d65b5b",
    targ: "#169b58",
    high: "#f1aa3b",
    vhigh: "#e47c2f"
  };
  function v() {
    const A = new Date(o.t0).getTime();
    l = Float64Array.from({ length: o.glucose.length }, (x, C) => A + C * o.stepMs), g = Float64Array.from(o.glucose);
  }
  let w = { vlow: 0, vhigh: 0 };
  function E() {
    if (!r || !l) return;
    const { start: A, end: x } = r, C = Math.max(0, Math.ceil((A - l[0]) / o.stepMs)), y = Math.min(g.length - 1, Math.floor((x - l[0]) / o.stepMs));
    let _ = { vlow: 0, vhigh: 0 }, S = 0;
    const k = m();
    for (let I = C; I <= y; I++) {
      const R = g[I];
      Number.isFinite(R) && R >= 0 && (S++, R < k.vlow ? _.vlow++ : R > k.vhigh && _.vhigh++);
    }
    S > 0 ? (w.vlow = _.vlow / S * 100, w.vhigh = _.vhigh / S * 100) : (w.vlow = 0, w.vhigh = 0), i("stats", {
      pct: w,
      preset: s,
      units: (o == null ? void 0 : o.units) || "mmol/L"
    });
  }
  const D = { goal: 14, label: 28, tick: 16 };
  function M(A, x, C, y) {
    a.beginPath(), a.moveTo(A + y, x), a.arcTo(A, x, A, x + y, y), a.lineTo(A, x + y), a.lineTo(A + C, x + y), a.stroke();
  }
  function T(A, x, C, y) {
    a.beginPath(), a.moveTo(A + y, x), a.arcTo(A, x, A, x - y, y), a.lineTo(A, x - y), a.lineTo(A + C, x - y), a.stroke();
  }
  function b(A) {
    return d() ? (Math.round(A * 10) / 10).toString() : Math.round(A).toString();
  }
  function L() {
    if (!u) return;
    const A = Math.max(1, window.devicePixelRatio || 1), x = Math.max(480, u.getBoundingClientRect().width || 600), C = 680;
    n(0, u.style.width = x + "px", u), n(0, u.style.height = C + "px", u), n(0, u.width = Math.floor(x * A), u), n(0, u.height = Math.floor(C * A), u), a.setTransform(A, 0, 0, A, 0, 0), a.clearRect(0, 0, x, C), a.fillStyle = "#fff", a.fillRect(0, 0, x, C);
    const y = 80, _ = 90, S = 120, k = 440, I = m(), R = 140, $ = 140, vt = 140, Z = 10, at = 10;
    let et = S;
    a.fillStyle = c.vhigh, a.fillRect(y, et, _, R), et += R, a.fillStyle = "#e9e9e9", a.fillRect(y, et, _, 2), a.fillStyle = c.high, a.fillRect(y, et, _, $), et += $, a.fillStyle = "#e9e9e9", a.fillRect(y, et, _, 2), a.fillStyle = c.targ, a.fillRect(y, et, _, vt), et += vt, a.fillStyle = "rgba(255,255,255,0.35)", a.fillRect(y + 6, et - 6, _ - 12, 2), a.fillStyle = c.low, a.fillRect(y, et, _, Z), et += Z, a.fillStyle = c.vlow, a.fillRect(y, et, _, at), a.fillStyle = "#2f3741", a.font = `700 ${D.tick}px system-ui`, a.textAlign = "right", a.textBaseline = "middle";
    const ft = S + R, kt = S + R + $;
    a.fillText(b(I.vhigh), y - 10, ft), a.fillText(b(I.high), y - 10, kt), a.textAlign = "left", a.fillText(b(I.vhigh), y + _ + 10, ft), a.fillText(b(I.high), y + _ + 10, kt);
    const V = y + _ + 20, q = S - 32;
    a.strokeStyle = "#000", a.lineWidth = 4, M(y - 22, q, 70, 14), a.fillStyle = "#8c939e", a.font = `600 ${D.goal}px system-ui`, a.textAlign = "center", a.fillText("Goal: <5%", V + 120, q - 8), a.fillStyle = "#111", a.font = `800 ${D.label}px system-ui`, a.textAlign = "left", a.fillText("Very High", V, S - 2), a.textAlign = "right", a.fillText(`${Math.round(w.vhigh)}%`, V + 260, S - 2);
    const tt = S + k + 24;
    a.strokeStyle = "#000", a.lineWidth = 4, T(y - 22, tt, 70, 14), a.fillStyle = "#111", a.font = `800 ${D.label}px system-ui`, a.textAlign = "left", a.fillText("Very Low", V, tt + 10), a.textAlign = "right", a.fillText(`${Math.round(w.vlow)}%`, V + 260, tt + 10), a.fillStyle = "#8c939e", a.font = `600 ${D.goal}px system-ui`, a.textAlign = "center", a.fillText("Goal: <1%", V + 120, tt + 46);
  }
  function N() {
    L();
  }
  Ne(() => (a = u.getContext("2d"), L(), window.addEventListener("resize", N), () => window.removeEventListener("resize", N)));
  function H(A) {
    Ce[A ? "unshift" : "push"](() => {
      u = A, n(0, u);
    });
  }
  return t.$$set = (A) => {
    "data" in A && n(1, o = A.data), "range" in A && n(2, r = A.range), "preset" in A && n(3, s = A.preset);
  }, t.$$.update = () => {
    t.$$.dirty & /*data*/
    2 && o && v();
  }, E(), L(), [u, o, r, s, H];
}
class Rc extends ue {
  constructor(e) {
    super(), fe(this, e, Ec, Fc, se, { data: 1, range: 2, preset: 3 });
  }
}
function Lc(t) {
  let e;
  return {
    c() {
      e = X("svg"), G(e, "width", "100%"), G(e, "display", "block");
    },
    m(n, i) {
      bt(n, e, i), t[5](e);
    },
    p: Nt,
    i: Nt,
    o: Nt,
    d(n) {
      n && _t(e), t[5](null);
    }
  };
}
function Uc(t, e, n) {
  let { data: i } = e, { range: o = null } = e, { preset: r = "N" } = e, { colorWholeWeek: s = !1 } = e, u;
  const a = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol");
  function l() {
    return a() ? r === "T" ? { vlow: 3, low: 3.9, high: 7.8 } : r === "P" ? { vlow: 3, low: 3.5, high: 7.8 } : { vlow: 3, low: 3.9, high: 10 } : r === "T" ? { vlow: 54, low: 70, high: 140 } : r === "P" ? { vlow: 54, low: 63, high: 140 } : { vlow: 54, low: 70, high: 180 };
  }
  let g, d;
  function m() {
    if (!i) return;
    const w = new Date(i.t0).getTime();
    g = Float64Array.from({ length: i.glucose.length }, (E, D) => w + D * i.stepMs), d = Float64Array.from(i.glucose);
  }
  function c() {
    if (!u || !i || !o || !g || !d) return;
    const w = Te(u);
    w.selectAll("*").remove();
    const E = u.getBoundingClientRect(), D = Math.max(360, E.width || 1100), M = 7, T = 0, b = { l: 50, r: 20, t: 30, b: 10 }, L = Math.max(140, Math.floor((D - b.l - b.r - (M - 1) * T) / M)), N = 86, H = 18, A = o.start, x = o.end, C = ge.floor(new Date(A)).getTime(), y = ge.floor(new Date(x)).getTime(), _ = new Date(C), S = new Date(y), k = (_.getDay() + 6) % 7, I = 7 - (S.getDay() + 6) % 7 - 1, R = ge.offset(new Date(C), -k).getTime(), $ = ge.offset(new Date(y), I).getTime(), vt = ge.offset(new Date($), 1).getTime(), Z = ge.range(new Date(R), ge.offset(new Date($), 1)).map((lt) => lt.getTime()), at = Z.length, et = Math.ceil(at / M), ft = b.t + et * N + (et - 1) * T + b.b;
    u.setAttribute("height", ft);
    const kt = new Map(Z.map((lt) => [lt, []]));
    for (let lt = 0; lt < d.length; lt++) {
      const p = d[lt];
      if (!(Number.isFinite(p) && p >= 0)) continue;
      const O = g[lt];
      if (O < R || O >= vt) continue;
      const B = ge.floor(new Date(O)).getTime();
      kt.has(B) && kt.get(B).push({ t: O - B, v: p, a: O });
    }
    const V = l(), q = 60 * 60 * 1e3 / i.stepMs;
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].forEach((lt, p) => {
      et > 0 && Te(u).append("text").attr("x", b.l + p * (L + T) + L / 2).attr("y", 16).attr("text-anchor", "middle").attr("fill", "#555").attr("font-size", 10).text(lt);
    });
    for (let lt = 1; lt <= M - 1; lt++) {
      const p = b.l + lt * (L + T);
      for (let O = 0; O < et; O++) {
        const B = b.t + O * (N + T);
        Te(u).append("line").attr("x1", p).attr("x2", p).attr("y1", B + 4).attr("y2", B + N - 4).attr("stroke", "#e6e6e6").attr("stroke-width", 1);
      }
    }
    const Et = ge.floor(/* @__PURE__ */ new Date()).getTime();
    Z.forEach((lt, p) => {
      const O = Math.floor(p / M), B = p % M, U = b.l + B * (L + T), ot = b.t + O * (N + T), F = w.append("g").attr("transform", `translate(${U},${ot})`), W = un().domain([0, 24 * q - 1]).range([0, L]), P = un().domain(a() ? [0, 20] : [0, 360]).range([N - H, 0]), Q = lt > Et;
      Q || (F.append("rect").attr("x", 0).attr("y", P(V.high)).attr("width", L).attr("height", Math.max(1, P(V.low) - P(V.high))).attr("fill", "#efefef"), F.append("line").attr("x1", 0).attr("x2", L).attr("y1", P(V.high)).attr("y2", P(V.high)).attr("stroke", "#2e7d32").attr("opacity", 0.7), F.append("line").attr("x1", 0).attr("x2", L).attr("y1", P(V.low)).attr("y2", P(V.low)).attr("stroke", "#2e7d32").attr("opacity", 0.7));
      const J = (kt.get(lt) || []).slice().sort((K, Ht) => K.t - Ht.t), pt = 2 * i.stepMs, yt = [];
      let ht = [];
      for (const K of J) {
        if (!Number.isFinite(K.v)) {
          ht.length && (yt.push(ht), ht = []);
          continue;
        }
        ht.length && K.t - ht[ht.length - 1].t > pt ? (yt.push(ht), ht = [K]) : ht.push(K);
      }
      ht.length && yt.push(ht);
      const mt = s ? R : A, xt = s ? vt - 1 : x, st = (K) => K.a >= mt && K.a <= xt, wt = ve().defined((K) => Number.isFinite(K.v) && K.v > V.high && st(K)).x((K) => W(K.t / i.stepMs)).y0((K) => P(V.high)).y1((K) => P(K.v));
      Q || yt.forEach((K) => {
        K.length > 1 && F.append("path").attr("d", wt(K)).attr("fill", "#fdae61").attr("opacity", 0.35);
      });
      const nt = ve().defined((K) => Number.isFinite(K.v) && K.v < V.low && st(K)).x((K) => W(K.t / i.stepMs)).y0((K) => P(K.v)).y1((K) => P(V.low));
      Q || yt.forEach((K) => {
        K.length > 1 && F.append("path").attr("d", nt(K)).attr("fill", "#d73027").attr("opacity", 0.25);
      }), Fn().x((K) => W(K.t / i.stepMs)).y((K) => P(K.v)).curve(Si);
      const At = (K) => Number.isFinite(K.v) && st(K) && K.v >= V.low && K.v <= V.high, it = (K) => Number.isFinite(K.v) && st(K) && K.v < V.low, gt = (K) => Number.isFinite(K.v) && st(K) && K.v > V.high, ut = (K, Ht) => Fn().defined(K).x((zt) => W(zt.t / i.stepMs)).y((zt) => P(zt.v)).curve(Si), rt = ut(At), dt = ut(it), Mt = ut(gt);
      Q || yt.forEach((K) => {
        if (K.length > 1) {
          const Ht = Fn().defined((zt) => Number.isFinite(zt.v) && !st(zt)).x((zt) => W(zt.t / i.stepMs)).y((zt) => P(zt.v)).curve(Si);
          F.append("path").attr("d", Ht(K)).attr("stroke", "#c7c7c7").attr("fill", "none").attr("stroke-width", 1.2).attr("opacity", 0.8), F.append("path").attr("d", dt(K)).attr("stroke", "#d73027").attr("fill", "none").attr("stroke-width", 1.5), F.append("path").attr("d", Mt(K)).attr("stroke", "#fdae61").attr("fill", "none").attr("stroke-width", 1.5), F.append("path").attr("d", rt(K)).attr("stroke", "#1a9850").attr("fill", "none").attr("stroke-width", 1.5);
        }
      });
      const Ft = new Date(lt), Tt = Ft.getDate(), Pt = Tt === 1 ? `1 ${[
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
      ][Ft.getMonth()]}` : String(Tt);
      Q || (F.append("text").attr("x", -12).attr("y", -8).attr("fill", "#777").attr("font-size", 10).attr("text-anchor", "start").text(Pt), O < et - 1 && F.append("text").attr("x", L / 2).attr("y", N - 2).attr("text-anchor", "middle").attr("fill", "#777").attr("font-size", 10).text("12pm"));
    });
  }
  Ne(() => {
    m(), c(), window.addEventListener("resize", c);
  });
  function v(w) {
    Ce[w ? "unshift" : "push"](() => {
      u = w, n(0, u);
    });
  }
  return t.$$set = (w) => {
    "data" in w && n(1, i = w.data), "range" in w && n(2, o = w.range), "preset" in w && n(3, r = w.preset), "colorWholeWeek" in w && n(4, s = w.colorWholeWeek);
  }, t.$$.update = () => {
    t.$$.dirty & /*data, range, preset*/
    14 && i && o && r && c();
  }, [u, i, o, r, s, v];
}
class Pc extends ue {
  constructor(e) {
    super(), fe(this, e, Uc, Lc, se, {
      data: 1,
      range: 2,
      preset: 3,
      colorWholeWeek: 4
    });
  }
}
function Hc(t) {
  let e;
  return {
    c() {
      e = Y("div"), G(e, "width", "100%");
    },
    m(n, i) {
      bt(n, e, i), t[4](e);
    },
    p: Nt,
    i: Nt,
    o: Nt,
    d(n) {
      n && _t(e), t[4](null);
    }
  };
}
function zc(t) {
  const e = Math.round(t / 6e4), n = Math.floor(e / 60), i = e % 60;
  return `(${n}h${String(i).padStart(2, "0")}min)`;
}
function Yc(t, e, n) {
  let { data: i } = e, { range: o = null } = e, { preset: r = "N" } = e, s;
  const u = {
    vlow: "#8a2f2f",
    low: "#d65b5b",
    targ: "#169b58",
    high: "#f1aa3b",
    vhigh: "#e47c2f"
  }, a = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol");
  function l() {
    return a() ? r === "T" ? {
      vlow: 3,
      low: 3.9,
      high: 7.8,
      vhigh: 13.9,
      unit: "mmol/L"
    } : r === "P" ? {
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
    } : r === "T" ? {
      vlow: 54,
      low: 70,
      high: 140,
      vhigh: 250,
      unit: "mg/dL"
    } : r === "P" ? {
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
  let g, d;
  const m = () => new Date(i.t0).getTime();
  function c() {
    return !d || !g ? {
      i0: 0,
      i1: d ? d.length - 1 : 0
    } : o ? {
      i0: Math.max(0, Math.ceil((o.start - g[0]) / i.stepMs)),
      i1: Math.min(d.length - 1, Math.floor((o.end - g[0]) / i.stepMs))
    } : { i0: 0, i1: d.length - 1 };
  }
  const v = (M) => (Math.round(M * 10) / 10).toFixed(1).replace(/\.0$/, "");
  function w(M, T) {
    if (a()) {
      const b = (L) => v(L);
      return T === "vhigh" ? `>${b(M.vhigh)} ${M.unit}` : T === "high" ? `${b(M.high + 0.1)}–${b(M.vhigh)} ${M.unit}` : T === "targ" ? `${b(M.low)}–${b(M.high)} ${M.unit}` : T === "low" ? `${b(M.vlow)}–${b(M.low - 0.1)} ${M.unit}` : `<${b(M.vlow)} ${M.unit}`;
    } else {
      const b = (L) => Math.round(L);
      return T === "vhigh" ? `>${b(M.vhigh)} ${M.unit}` : T === "high" ? `${b(M.high + 1)}–${b(M.vhigh)} ${M.unit}` : T === "targ" ? `${b(M.low)}–${b(M.high)} ${M.unit}` : T === "low" ? `${b(M.vlow)}–${b(M.low - 1)} ${M.unit}` : `<${b(M.vlow)} ${M.unit}`;
    }
  }
  function E() {
    if (!s || !d) return;
    const { i0: M, i1: T } = c(), b = l();
    let L = 0, N = {
      vlow: 0,
      low: 0,
      targ: 0,
      high: 0,
      vhigh: 0
    };
    for (let Z = M; Z <= T; Z++) {
      const at = d[Z];
      Number.isFinite(at) && at >= 0 && (L++, at < b.vlow ? N.vlow++ : at < b.low ? N.low++ : at <= b.high ? N.targ++ : at <= b.vhigh ? N.high++ : N.vhigh++);
    }
    const H = (Z) => L ? Math.round(1e3 * N[Z] / L) / 10 : 0, A = (Z) => N[Z] * i.stepMs, x = Math.max(700, s.getBoundingClientRect().width || 700), C = 360, y = { l: 78, r: 50, t: 20 }, _ = Te(s).selectAll("svg").data([0]).join("svg").attr("width", x).attr("height", C);
    _.selectAll("*").remove();
    const S = {
      x: y.l + 20,
      w: 56,
      top: y.t + 18
    }, k = {
      vhigh: 72,
      high: 72,
      targ: 140,
      low: 20,
      vlow: 20
    };
    let I = S.top;
    ["vhigh", "high", "targ", "low", "vlow"].forEach((Z) => {
      _.append("rect").attr("x", S.x).attr("y", I).attr("width", S.w).attr("height", k[Z]).attr("fill", u[Z]), I += k[Z];
    });
    const R = (Z, at) => _.append("text").attr("x", S.x - 10).attr("y", at).attr("text-anchor", "end").attr("dominant-baseline", "middle").attr("font-weight", 700).attr("fill", "#222").text(Z);
    R(
      a() ? v(b.vhigh) : String(Math.round(b.vhigh)),
      S.top + k.vhigh
    ), R(a() ? v(b.high) : String(Math.round(b.high)), S.top + k.vhigh + k.high), R(b.unit, S.top + k.vhigh + k.high + k.targ / 2), R(a() ? v(b.low) : String(Math.round(b.low)), S.top + k.vhigh + k.high + k.targ), R(a() ? v(b.vlow) : String(Math.round(b.vlow)), S.top + k.vhigh + k.high + k.targ + k.low);
    const $ = [
      { k: "vhigh", label: "Very High" },
      { k: "high", label: "High" },
      { k: "targ", label: "Target" },
      { k: "low", label: "Low" },
      { k: "vlow", label: "Very Low" }
    ], vt = (Z) => y.t + 30 + Z * 70;
    $.forEach((Z, at) => {
      const et = vt(at);
      at > 0 && _.append("line").attr("x1", y.l + 110).attr("x2", x - y.r).attr("y1", et - 24).attr("y2", et - 24).attr("stroke", "#e1e4ea"), _.append("text").attr("x", y.l + 120).attr("y", et).attr("font-weight", 800).attr("fill", "#111").text(Z.label), _.append("text").attr("x", y.l + 120 + 90).attr("y", et).attr("fill", "#888").text(w(b, Z.k)), _.append("text").attr("x", x - y.r - 120).attr("y", et).attr("text-anchor", "end").attr("font-weight", 800).attr("fill", "#111").text(`${H(Z.k)}%`), _.append("text").attr("x", x - y.r - 20).attr("y", et).attr("fill", "#888").text(zc(A(Z.k)));
    });
  }
  Ne(() => E());
  function D(M) {
    Ce[M ? "unshift" : "push"](() => {
      s = M, n(0, s);
    });
  }
  return t.$$set = (M) => {
    "data" in M && n(1, i = M.data), "range" in M && n(2, o = M.range), "preset" in M && n(3, r = M.preset);
  }, t.$$.update = () => {
    t.$$.dirty & /*data*/
    2 && i && (g = Float64Array.from({ length: i.glucose.length }, (M, T) => m() + T * i.stepMs), d = Float64Array.from(i.glucose)), t.$$.dirty & /*data, range, preset*/
    14 && i && (o || !0) && r && E();
  }, [s, i, o, r, D];
}
class Ic extends ue {
  constructor(e) {
    super(), fe(this, e, Yc, Hc, se, { data: 1, range: 2, preset: 3 });
  }
}
function Vc(t) {
  let e, n, i, o = (
    /*fmt1*/
    t[3](
      /*TH*/
      t[2]().vlow
    ) + ""
  ), r, s, u = (
    /*fmt1*/
    t[3](
      /*TH*/
      t[2]().low
    ) + ""
  ), a, l, g = (
    /*fmt1*/
    t[3](
      /*TH*/
      t[2]().high
    ) + ""
  ), d, m, c = (
    /*fmt1*/
    t[3](
      /*TH*/
      t[2]().vhigh
    ) + ""
  ), v, w, E = (
    /*TH*/
    t[2]().unit + ""
  ), D, M, T, b, L, N, H, A, x, C, y = (
    /*fmt1*/
    t[3](
      /*TH*/
      t[2]().vhigh
    ) + ""
  ), _, S = (
    /*TH*/
    t[2]().unit + ""
  ), k, I, R = (
    /*stats*/
    t[0].vhigh.pct + ""
  ), $, vt, Z, at = (
    /*stats*/
    t[0].vhigh.dur + ""
  ), et, ft, kt, V, q = (
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
  ), tt, Et, lt = (
    /*stats*/
    t[0].high.pct + ""
  ), p, O, B, U = (
    /*stats*/
    t[0].high.dur + ""
  ), ot, F, W, P, Q = (
    /*fmt1*/
    t[3](
      /*TH*/
      t[2]().low
    ) + ""
  ), J, pt, yt = (
    /*fmt1*/
    t[3](
      /*TH*/
      t[2]().high
    ) + ""
  ), ht, mt = (
    /*TH*/
    t[2]().unit + ""
  ), xt, st, wt = (
    /*stats*/
    t[0].targ.pct + ""
  ), nt, At, it, gt = (
    /*stats*/
    t[0].targ.dur + ""
  ), ut, rt, dt, Mt, Ft = (
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
  ), Tt, Ut, It = (
    /*stats*/
    t[0].low.pct + ""
  ), Pt, K, Ht, zt = (
    /*stats*/
    t[0].low.dur + ""
  ), oe, Bt, Zt, Dt, St, Yt = (
    /*fmt1*/
    t[3](
      /*TH*/
      t[2]().vlow
    ) + ""
  ), dn, In = (
    /*TH*/
    t[2]().unit + ""
  ), Ue, he, Pe = (
    /*stats*/
    t[0].vlow.pct + ""
  ), Ke, le, Xt, Se = (
    /*stats*/
    t[0].vlow.dur + ""
  ), He;
  return {
    c() {
      e = X("svg"), n = X("rect"), i = X("text"), r = z(o), s = X("text"), a = z(u), l = X("text"), d = z(g), m = X("text"), v = z(c), w = X("text"), D = z(E), M = X("rect"), T = X("rect"), b = X("rect"), L = X("rect"), N = X("rect"), H = X("text"), A = z("Very High"), x = X("text"), C = z(">"), _ = z(y), k = z(S), I = X("text"), $ = z(R), vt = z("%"), Z = X("text"), et = z(at), ft = X("text"), kt = z("High"), V = X("text"), tt = z(q), Et = X("text"), p = z(lt), O = z("%"), B = X("text"), ot = z(U), F = X("text"), W = z("Target"), P = X("text"), J = z(Q), pt = z("-"), ht = z(yt), xt = z(mt), st = X("text"), nt = z(wt), At = z("%"), it = X("text"), ut = z(gt), rt = X("text"), dt = z("Low"), Mt = X("text"), Tt = z(Ft), Ut = X("text"), Pt = z(It), K = z("%"), Ht = X("text"), oe = z(zt), Bt = X("text"), Zt = z("Very Low"), Dt = X("text"), St = z("<"), dn = z(Yt), Ue = z(In), he = X("text"), Ke = z(Pe), le = z("%"), Xt = X("text"), He = z(Se), f(n, "x", "15"), f(n, "y", "40"), f(n, "width", "50"), f(n, "height", "210"), f(n, "fill", "white"), f(n, "stroke", "#ccc"), f(n, "stroke-width", "1"), f(i, "x", "10"), f(i, "y", "250"), f(i, "font-size", "10"), f(i, "fill", "#666"), f(i, "text-anchor", "end"), f(s, "x", "10"), f(s, "y", "220"), f(s, "font-size", "10"), f(s, "fill", "#666"), f(s, "text-anchor", "end"), f(l, "x", "10"), f(l, "y", "165"), f(l, "font-size", "10"), f(l, "fill", "#666"), f(l, "text-anchor", "end"), f(m, "x", "10"), f(m, "y", "85"), f(m, "font-size", "10"), f(m, "fill", "#666"), f(m, "text-anchor", "end"), f(w, "x", "8"), f(w, "y", "155"), f(w, "font-size", "10"), f(w, "fill", "#666"), f(w, "text-anchor", "middle"), f(w, "transform", "rotate(-90, 8, 155)"), f(M, "x", "15"), f(M, "y", "40"), f(M, "width", "50"), f(M, "height", "25"), f(M, "fill", "#ff6600"), f(T, "x", "15"), f(T, "y", "65"), f(T, "width", "50"), f(T, "height", "50"), f(T, "fill", "#ff8c00"), f(b, "x", "15"), f(b, "y", "115"), f(b, "width", "50"), f(b, "height", "120"), f(b, "fill", "#2d8f2d"), f(L, "x", "15"), f(L, "y", "235"), f(L, "width", "50"), f(L, "height", "12"), f(L, "fill", "#990000"), f(N, "x", "15"), f(N, "y", "247"), f(N, "width", "50"), f(N, "height", "3"), f(N, "fill", "#cc0000"), f(H, "x", "80"), f(H, "y", "48"), f(H, "font-size", "11"), f(H, "font-weight", "bold"), f(H, "fill", "#333"), f(x, "x", "80"), f(x, "y", "60"), f(x, "font-size", "9"), f(x, "fill", "#666"), f(I, "x", "370"), f(I, "y", "48"), f(I, "font-size", "11"), f(I, "font-weight", "bold"), f(I, "fill", "#333"), f(I, "text-anchor", "end"), f(Z, "x", "370"), f(Z, "y", "60"), f(Z, "font-size", "9"), f(Z, "fill", "#666"), f(Z, "text-anchor", "end"), f(ft, "x", "80"), f(ft, "y", "82"), f(ft, "font-size", "11"), f(ft, "font-weight", "bold"), f(ft, "fill", "#333"), f(V, "x", "80"), f(V, "y", "94"), f(V, "font-size", "9"), f(V, "fill", "#666"), f(Et, "x", "370"), f(Et, "y", "82"), f(Et, "font-size", "11"), f(Et, "font-weight", "bold"), f(Et, "fill", "#333"), f(Et, "text-anchor", "end"), f(B, "x", "370"), f(B, "y", "94"), f(B, "font-size", "9"), f(B, "fill", "#666"), f(B, "text-anchor", "end"), f(F, "x", "80"), f(F, "y", "165"), f(F, "font-size", "11"), f(F, "font-weight", "bold"), f(F, "fill", "#333"), f(P, "x", "80"), f(P, "y", "177"), f(P, "font-size", "9"), f(P, "fill", "#666"), f(st, "x", "370"), f(st, "y", "165"), f(st, "font-size", "11"), f(st, "font-weight", "bold"), f(st, "fill", "#333"), f(st, "text-anchor", "end"), f(it, "x", "370"), f(it, "y", "177"), f(it, "font-size", "9"), f(it, "fill", "#666"), f(it, "text-anchor", "end"), f(rt, "x", "80"), f(rt, "y", "235"), f(rt, "font-size", "11"), f(rt, "font-weight", "bold"), f(rt, "fill", "#333"), f(Mt, "x", "80"), f(Mt, "y", "247"), f(Mt, "font-size", "9"), f(Mt, "fill", "#666"), f(Ut, "x", "370"), f(Ut, "y", "235"), f(Ut, "font-size", "11"), f(Ut, "font-weight", "bold"), f(Ut, "fill", "#333"), f(Ut, "text-anchor", "end"), f(Ht, "x", "370"), f(Ht, "y", "247"), f(Ht, "font-size", "9"), f(Ht, "fill", "#666"), f(Ht, "text-anchor", "end"), f(Bt, "x", "80"), f(Bt, "y", "265"), f(Bt, "font-size", "11"), f(Bt, "font-weight", "bold"), f(Bt, "fill", "#333"), f(Dt, "x", "80"), f(Dt, "y", "277"), f(Dt, "font-size", "9"), f(Dt, "fill", "#666"), f(he, "x", "370"), f(he, "y", "265"), f(he, "font-size", "11"), f(he, "font-weight", "bold"), f(he, "fill", "#333"), f(he, "text-anchor", "end"), f(Xt, "x", "370"), f(Xt, "y", "277"), f(Xt, "font-size", "9"), f(Xt, "fill", "#666"), f(Xt, "text-anchor", "end"), f(e, "width", "400"), f(e, "height", "320"), f(e, "viewBox", "0 0 400 320"), f(e, "xmlns", "http://www.w3.org/2000/svg");
    },
    m(qt, Gt) {
      bt(qt, e, Gt), h(e, n), h(e, i), h(i, r), h(e, s), h(s, a), h(e, l), h(l, d), h(e, m), h(m, v), h(e, w), h(w, D), h(e, M), h(e, T), h(e, b), h(e, L), h(e, N), h(e, H), h(H, A), h(e, x), h(x, C), h(x, _), h(x, k), h(e, I), h(I, $), h(I, vt), h(e, Z), h(Z, et), h(e, ft), h(ft, kt), h(e, V), h(V, tt), h(e, Et), h(Et, p), h(Et, O), h(e, B), h(B, ot), h(e, F), h(F, W), h(e, P), h(P, J), h(P, pt), h(P, ht), h(P, xt), h(e, st), h(st, nt), h(st, At), h(e, it), h(it, ut), h(e, rt), h(rt, dt), h(e, Mt), h(Mt, Tt), h(e, Ut), h(Ut, Pt), h(Ut, K), h(e, Ht), h(Ht, oe), h(e, Bt), h(Bt, Zt), h(e, Dt), h(Dt, St), h(Dt, dn), h(Dt, Ue), h(e, he), h(he, Ke), h(he, le), h(e, Xt), h(Xt, He);
    },
    p(qt, [Gt]) {
      Gt & /*stats*/
      1 && R !== (R = /*stats*/
      qt[0].vhigh.pct + "") && Ct($, R), Gt & /*stats*/
      1 && at !== (at = /*stats*/
      qt[0].vhigh.dur + "") && Ct(et, at), Gt & /*stats*/
      1 && lt !== (lt = /*stats*/
      qt[0].high.pct + "") && Ct(p, lt), Gt & /*stats*/
      1 && U !== (U = /*stats*/
      qt[0].high.dur + "") && Ct(ot, U), Gt & /*stats*/
      1 && wt !== (wt = /*stats*/
      qt[0].targ.pct + "") && Ct(nt, wt), Gt & /*stats*/
      1 && gt !== (gt = /*stats*/
      qt[0].targ.dur + "") && Ct(ut, gt), Gt & /*stats*/
      1 && It !== (It = /*stats*/
      qt[0].low.pct + "") && Ct(Pt, It), Gt & /*stats*/
      1 && zt !== (zt = /*stats*/
      qt[0].low.dur + "") && Ct(oe, zt), Gt & /*stats*/
      1 && Pe !== (Pe = /*stats*/
      qt[0].vlow.pct + "") && Ct(Ke, Pe), Gt & /*stats*/
      1 && Se !== (Se = /*stats*/
      qt[0].vlow.dur + "") && Ct(He, Se);
    },
    i: Nt,
    o: Nt,
    d(qt) {
      qt && _t(e);
    }
  };
}
function xn(t, e) {
  return e ? Math.round(1e3 * t / e) / 10 : 0;
}
function Mn(t) {
  const e = Math.round(t / 6e4), n = Math.floor(e / 60), i = e % 60;
  return `(${n}h${String(i).padStart(2, "0")}min)`;
}
function Wc(t, e, n) {
  let { data: i } = e, { range: o = null } = e, { preset: r = "N" } = e;
  const s = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol");
  function u() {
    return s() ? r === "T" ? {
      vlow: 3,
      low: 3.9,
      high: 7.8,
      vhigh: 13.9,
      unit: "mmol/L"
    } : r === "P" ? {
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
    } : r === "T" ? {
      vlow: 54,
      low: 70,
      high: 140,
      vhigh: 250,
      unit: "mg/dL"
    } : r === "P" ? {
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
  const g = () => new Date(i.t0).getTime();
  function d() {
    if (!l) return { i0: 0, i1: 0 };
    if (!o) return { i0: 0, i1: l.length - 1 };
    const w = Math.max(0, Math.ceil((o.start - a[0]) / i.stepMs)), E = Math.min(l.length - 1, Math.floor((o.end - a[0]) / i.stepMs));
    return { i0: w, i1: E };
  }
  const m = (w) => s() ? (Math.round(w * 10) / 10).toFixed(1).replace(/\.0$/, "") : String(Math.round(w));
  let c = {
    vhigh: { pct: 0, dur: "(0min)" },
    high: { pct: 0, dur: "(0min)" },
    targ: { pct: 0, dur: "(0min)" },
    low: { pct: 0, dur: "(0min)" },
    vlow: { pct: 0, dur: "(0min)" }
  };
  function v() {
    if (!l) return;
    const w = u(), { i0: E, i1: D } = d();
    let M = 0, T = {
      vlow: 0,
      low: 0,
      targ: 0,
      high: 0,
      vhigh: 0
    };
    for (let L = E; L <= D; L++) {
      const N = l[L];
      Number.isFinite(N) && N >= 0 && (M++, N < w.vlow ? T.vlow++ : N < w.low ? T.low++ : N <= w.high ? T.targ++ : N <= w.vhigh ? T.high++ : T.vhigh++);
    }
    const b = i.stepMs;
    n(0, c = {
      vhigh: {
        pct: xn(T.vhigh, M),
        dur: Mn(T.vhigh * b)
      },
      high: {
        pct: xn(T.high, M),
        dur: Mn(T.high * b)
      },
      targ: {
        pct: xn(T.targ, M),
        dur: Mn(T.targ * b)
      },
      low: {
        pct: xn(T.low, M),
        dur: Mn(T.low * b)
      },
      vlow: {
        pct: xn(T.vlow, M),
        dur: Mn(T.vlow * b)
      }
    });
  }
  return Ne(v), t.$$set = (w) => {
    "data" in w && n(4, i = w.data), "range" in w && n(5, o = w.range), "preset" in w && n(6, r = w.preset);
  }, t.$$.update = () => {
    t.$$.dirty & /*data*/
    16 && i && (a = Float64Array.from({ length: i.glucose.length }, (w, E) => g() + E * i.stepMs), l = Float64Array.from(i.glucose)), t.$$.dirty & /*data, range, preset*/
    112 && i && (o || !0) && r && v();
  }, [c, s, u, m, i, o, r];
}
class qc extends ue {
  constructor(e) {
    super(), fe(this, e, Wc, Vc, se, { data: 4, range: 5, preset: 6 });
  }
}
function Bc(t) {
  let e;
  return {
    c() {
      e = Y("div");
    },
    m(n, i) {
      bt(n, e, i), t[4](e);
    },
    p: Nt,
    i: Nt,
    o: Nt,
    d(n) {
      n && _t(e), t[4](null);
    }
  };
}
function Tn(t, e) {
  return e ? Math.round(1e3 * t / e) / 10 : 0;
}
function Xc(t, e, n) {
  let { data: i } = e, { range: o = null } = e, { preset: r = "N" } = e, s;
  const u = () => /mmol/i.test((i == null ? void 0 : i.units) || "mmol");
  function a() {
    return u() ? {
      vlow: 3,
      low: 3.9,
      high: r === "T" || r === "P" ? 7.8 : 10,
      vhigh: 13.9
    } : r === "T" ? { vlow: 54, low: 70, high: 140, vhigh: 250 } : r === "P" ? { vlow: 54, low: 63, high: 140, vhigh: 250 } : { vlow: 54, low: 70, high: 180, vhigh: 250 };
  }
  let l, g;
  const d = () => new Date(i.t0).getTime();
  function m() {
    if (!g || !l) return {
      i0: 0,
      i1: g ? g.length - 1 : 0
    };
    if (!o) return { i0: 0, i1: g.length - 1 };
    const w = Math.max(0, Math.ceil((o.start - l[0]) / i.stepMs)), E = Math.min(g.length - 1, Math.floor((o.end - l[0]) / i.stepMs));
    return { i0: w, i1: E };
  }
  function c() {
    if (!s || !g) return;
    const { i0: w, i1: E } = m(), D = a(), M = u() ? 7.8 : 140;
    let T = 0, b = 0, L = 0, N = 0, H = 0, A = 0;
    for (let V = w; V <= E; V++) {
      const q = g[V];
      Number.isFinite(q) && q >= 0 && (T++, q < D.vlow ? b++ : q < D.low ? L++ : q <= D.high ? N++ : q <= D.vhigh ? H++ : A++, q >= D.low && q <= M);
    }
    const x = [
      {
        name: "Very Low",
        pct: Tn(b, T),
        color: "#e57373",
        goal: "<1%"
      },
      {
        name: "Low",
        pct: Tn(L, T),
        color: "#ff9e80",
        goal: "<4%"
      },
      {
        name: "Target",
        pct: Tn(N, T),
        color: "#86c89d",
        goal: "≥70%"
      },
      {
        name: "High",
        pct: Tn(H, T),
        color: "#ffcc80",
        goal: "<25%"
      },
      {
        name: "Very High",
        pct: Tn(A, T),
        color: "#f46d43",
        goal: "<5%"
      }
    ], C = 300, y = Math.max(320, s.getBoundingClientRect().width || 300), _ = { t: 20, r: 80, b: 30, l: 30 }, S = Te(s).selectAll("svg").data([0]).join("svg").attr("width", y).attr("height", C).style("overflow", "visible");
    S.selectAll("*").remove();
    const k = un().domain([0, 100]).range([C - _.b, _.t]), I = [];
    let R = null, $ = null, vt = 0;
    x.forEach((V) => {
      const q = k(vt), tt = k(vt + V.pct);
      S.append("rect").attr("x", _.l).attr("y", tt).attr("width", 60).attr("height", Math.max(0, q - tt)).attr("fill", V.color), V.name == "High" || V.name == "Low" ? I.push({
        name: V.name,
        text: `${V.name} ${V.pct}%`,
        center: (q + tt) / 2,
        color: V.color
      }) : I.push({
        name: V.name,
        text: `${V.name} ${V.pct}% (goal ${V.goal})`,
        center: (q + tt) / 2,
        color: V.color
      }), V.name === "High" && (R = q), V.name === "Very High" && ($ = q), vt += V.pct;
    }), T === 0 && S.append("rect").attr("x", _.l).attr("y", k(100)).attr("width", 60).attr("height", k(0) - k(100)).attr("fill", "#e6e6e6");
    const Z = 14, at = _.t + 8, et = C - _.b - 8;
    I.sort((V, q) => V.center - q.center);
    for (let V = 0; V < I.length; V++) {
      const q = I[V - 1];
      let tt = Math.max(at, Math.min(et, I[V].center));
      q && tt < q.y + Z && (tt = q.y + Z), I[V].y = tt;
    }
    for (let V = I.length - 2; V >= 0; V--) {
      const q = I[V + 1];
      I[V].y > q.y - Z && (I[V].y = q.y - Z), I[V].y < at && (I[V].y = at);
    }
    I.forEach((V) => {
      S.append("line").attr("x1", _.l + 60).attr("x2", _.l + 66).attr("y1", V.y).attr("y2", V.y).attr("stroke", V.color).attr("opacity", 0.8), S.append("text").attr("x", _.l + 70).attr("y", V.y).attr("dy", "0.35em").attr("fill", "#000").attr("font-size", 11).text(V.text).attr("data-name", V.name);
    });
    try {
      const V = u(), q = D.high, tt = D.vhigh, Et = _.l - 6, lt = (p) => p.attr("text-anchor", "end").attr("font-size", 10).attr("font-weight", 700).attr("fill", "#000");
      R !== null && S.append("text").attr("x", Et).attr("y", R).attr("dy", "0.35em").call(lt).text(q), $ !== null && S.append("text").attr("x", Et).attr("y", $).attr("dy", "0.35em").call(lt).text(tt);
    } catch {
    }
    const ft = "#000", kt = "#000";
    try {
      const V = I.find((lt) => lt.name === "Very High"), q = I.find((lt) => lt.name === "High");
      if (V && q) {
        const lt = (V.y + q.y) / 2, O = `${Math.round((x[3].pct + x[4].pct) * 10) / 10}%  (goal ${x[1].goal})`, B = S.select('text[data-name="Very High"]').node(), U = S.select('text[data-name="High"]').node();
        let ot = _.l + 70;
        try {
          const F = B ? parseFloat(B.getAttribute("x")) + B.getComputedTextLength() : ot, W = U ? parseFloat(U.getAttribute("x")) + U.getComputedTextLength() : ot;
          ot = Math.max(F, W) + 12;
        } catch {
        }
        S.append("line").attr("x1", ot - 6).attr("x2", ot).attr("y1", lt).attr("y2", lt).attr("stroke", ft).attr("opacity", 0.9), S.append("text").attr("x", ot + 4).attr("y", lt).attr("dy", "0.35em").attr("fill", ft).attr("font-size", 11).text(O);
      }
      const tt = I.find((lt) => lt.name === "Very Low"), Et = I.find((lt) => lt.name === "Low");
      if (tt && Et) {
        const lt = (tt.y + Et.y) / 2, O = `${Math.round((x[0].pct + x[1].pct) * 10) / 10}% (goal ${x[3].goal})`;
        let B = _.l + 70;
        try {
          const U = S.select('text[data-name="Low"]').node(), ot = S.select('text[data-name="Very Low"]').node(), F = U ? parseFloat(U.getAttribute("x")) + U.getComputedTextLength() : B, W = ot ? parseFloat(ot.getAttribute("x")) + ot.getComputedTextLength() : B;
          B = Math.max(F, W) + 12;
        } catch {
        }
        S.append("line").attr("x1", B - 6).attr("x2", B).attr("y1", lt).attr("y2", lt).attr("stroke", kt).attr("opacity", 0.9), S.append("text").attr("x", B + 4).attr("y", lt).attr("dy", "0.35em").attr("fill", kt).attr("font-size", 11).text(O);
      }
    } catch {
    }
  }
  Ne(() => {
    c();
  });
  function v(w) {
    Ce[w ? "unshift" : "push"](() => {
      s = w, n(0, s);
    });
  }
  return t.$$set = (w) => {
    "data" in w && n(1, i = w.data), "range" in w && n(2, o = w.range), "preset" in w && n(3, r = w.preset);
  }, t.$$.update = () => {
    t.$$.dirty & /*data*/
    2 && i && (l = Float64Array.from({ length: i.glucose.length }, (w, E) => d() + E * i.stepMs), g = Float64Array.from(i.glucose)), t.$$.dirty & /*data, range, preset*/
    14 && i && (o || !0) && r && c();
  }, [s, i, o, r, v];
}
class Gc extends ue {
  constructor(e) {
    super(), fe(this, e, Xc, Bc, se, { data: 1, range: 2, preset: 3 });
  }
}
function no(t) {
  let e, n = (
    /*isMmol*/
    (t[9]() ? (
      /*TH*/
      t[10]().low.toFixed(1)
    ) : (
      /*TH*/
      t[10]().low
    )) + ""
  ), i, o, r, s = (
    /*isMmol*/
    (t[9]() ? (
      /*TH*/
      t[10]().high.toFixed(1)
    ) : (
      /*TH*/
      t[10]().high
    )) + ""
  ), u, a, l, g = (
    /*isMmol*/
    (t[9]() ? (
      /*TH*/
      t[10]().vhigh.toFixed(1)
    ) : (
      /*TH*/
      t[10]().vhigh
    )) + ""
  ), d, m;
  return {
    c() {
      e = X("text"), i = z(n), r = X("text"), u = z(s), l = X("text"), d = z(g), f(e, "x", "35"), f(e, "y", o = 30 + /*yAxisPositions*/
      t[8].low), f(e, "font-family", "Arial, sans-serif"), f(e, "font-size", "10"), f(e, "fill", "#666"), f(e, "text-anchor", "end"), f(r, "x", "35"), f(r, "y", a = 30 + /*yAxisPositions*/
      t[8].high), f(r, "font-family", "Arial, sans-serif"), f(r, "font-size", "10"), f(r, "fill", "#666"), f(r, "text-anchor", "end"), f(l, "x", "35"), f(l, "y", m = 30 + /*yAxisPositions*/
      t[8].vhigh), f(l, "font-family", "Arial, sans-serif"), f(l, "font-size", "10"), f(l, "fill", "#666"), f(l, "text-anchor", "end");
    },
    m(c, v) {
      bt(c, e, v), h(e, i), bt(c, r, v), h(r, u), bt(c, l, v), h(l, d);
    },
    p(c, v) {
      v & /*yAxisPositions*/
      256 && o !== (o = 30 + /*yAxisPositions*/
      c[8].low) && f(e, "y", o), v & /*yAxisPositions*/
      256 && a !== (a = 30 + /*yAxisPositions*/
      c[8].high) && f(r, "y", a), v & /*yAxisPositions*/
      256 && m !== (m = 30 + /*yAxisPositions*/
      c[8].vhigh) && f(l, "y", m);
    },
    d(c) {
      c && (_t(e), _t(r), _t(l));
    }
  };
}
function io(t) {
  let e, n, i;
  return {
    c() {
      e = X("line"), f(e, "x1", "90"), f(e, "y1", n = 30 + /*linePositions*/
      t[2].high), f(e, "x2", de), f(e, "y2", i = /*textPositions*/
      t[7].high - 40), f(e, "stroke", "#ccc"), f(e, "stroke-width", "1");
    },
    m(o, r) {
      bt(o, e, r);
    },
    p(o, r) {
      r & /*linePositions*/
      4 && n !== (n = 30 + /*linePositions*/
      o[2].high) && f(e, "y1", n), r & /*textPositions*/
      128 && i !== (i = /*textPositions*/
      o[7].high - 40) && f(e, "y2", i);
    },
    d(o) {
      o && _t(e);
    }
  };
}
function ro(t) {
  let e, n, i;
  return {
    c() {
      e = X("line"), f(e, "x1", "90"), f(e, "y1", n = 30 + /*linePositions*/
      t[2].targ), f(e, "x2", de), f(e, "y2", i = /*textPositions*/
      t[7].targ - 40), f(e, "stroke", "#ccc"), f(e, "stroke-width", "1");
    },
    m(o, r) {
      bt(o, e, r);
    },
    p(o, r) {
      r & /*linePositions*/
      4 && n !== (n = 30 + /*linePositions*/
      o[2].targ) && f(e, "y1", n), r & /*textPositions*/
      128 && i !== (i = /*textPositions*/
      o[7].targ - 40) && f(e, "y2", i);
    },
    d(o) {
      o && _t(e);
    }
  };
}
function oo(t) {
  let e, n, i;
  return {
    c() {
      e = X("line"), f(e, "x1", "90"), f(e, "y1", n = 30 + /*linePositions*/
      t[2].low), f(e, "x2", de), f(e, "y2", i = /*textPositions*/
      t[7].low - 40), f(e, "stroke", "#ccc"), f(e, "stroke-width", "1");
    },
    m(o, r) {
      bt(o, e, r);
    },
    p(o, r) {
      r & /*linePositions*/
      4 && n !== (n = 30 + /*linePositions*/
      o[2].low) && f(e, "y1", n), r & /*textPositions*/
      128 && i !== (i = /*textPositions*/
      o[7].low - 40) && f(e, "y2", i);
    },
    d(o) {
      o && _t(e);
    }
  };
}
function lo(t) {
  let e, n, i;
  return {
    c() {
      e = X("rect"), f(e, "x", "40"), f(e, "y", n = 30 + /*barPositions*/
      t[3].vlow), f(e, "width", "50"), f(e, "height", i = /*barHeights*/
      t[4].vlow), f(e, "fill", "#e57373");
    },
    m(o, r) {
      bt(o, e, r);
    },
    p(o, r) {
      r & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      o[3].vlow) && f(e, "y", n), r & /*barHeights*/
      16 && i !== (i = /*barHeights*/
      o[4].vlow) && f(e, "height", i);
    },
    d(o) {
      o && _t(e);
    }
  };
}
function ao(t) {
  let e, n, i;
  return {
    c() {
      e = X("rect"), f(e, "x", "40"), f(e, "y", n = 30 + /*barPositions*/
      t[3].low), f(e, "width", "50"), f(e, "height", i = /*barHeights*/
      t[4].low), f(e, "fill", "#ff9e80");
    },
    m(o, r) {
      bt(o, e, r);
    },
    p(o, r) {
      r & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      o[3].low) && f(e, "y", n), r & /*barHeights*/
      16 && i !== (i = /*barHeights*/
      o[4].low) && f(e, "height", i);
    },
    d(o) {
      o && _t(e);
    }
  };
}
function so(t) {
  let e, n, i;
  return {
    c() {
      e = X("rect"), f(e, "x", "40"), f(e, "y", n = 30 + /*barPositions*/
      t[3].targ), f(e, "width", "50"), f(e, "height", i = /*barHeights*/
      t[4].targ), f(e, "fill", "#86c89d");
    },
    m(o, r) {
      bt(o, e, r);
    },
    p(o, r) {
      r & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      o[3].targ) && f(e, "y", n), r & /*barHeights*/
      16 && i !== (i = /*barHeights*/
      o[4].targ) && f(e, "height", i);
    },
    d(o) {
      o && _t(e);
    }
  };
}
function fo(t) {
  let e, n, i;
  return {
    c() {
      e = X("rect"), f(e, "x", "40"), f(e, "y", n = 30 + /*barPositions*/
      t[3].high), f(e, "width", "50"), f(e, "height", i = /*barHeights*/
      t[4].high), f(e, "fill", "#ffcc80");
    },
    m(o, r) {
      bt(o, e, r);
    },
    p(o, r) {
      r & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      o[3].high) && f(e, "y", n), r & /*barHeights*/
      16 && i !== (i = /*barHeights*/
      o[4].high) && f(e, "height", i);
    },
    d(o) {
      o && _t(e);
    }
  };
}
function uo(t) {
  let e, n, i;
  return {
    c() {
      e = X("rect"), f(e, "x", "40"), f(e, "y", n = 30 + /*barPositions*/
      t[3].vhigh), f(e, "width", "50"), f(e, "height", i = /*barHeights*/
      t[4].vhigh), f(e, "fill", "#ff8a65");
    },
    m(o, r) {
      bt(o, e, r);
    },
    p(o, r) {
      r & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      o[3].vhigh) && f(e, "y", n), r & /*barHeights*/
      16 && i !== (i = /*barHeights*/
      o[4].vhigh) && f(e, "height", i);
    },
    d(o) {
      o && _t(e);
    }
  };
}
function ho(t) {
  let e, n, i, o, r = (
    /*barHeights*/
    t[4].vlow > 2 && /*barHeights*/
    t[4].low > 2 && co(t)
  ), s = (
    /*barHeights*/
    t[4].low > 2 && /*barHeights*/
    t[4].targ > 2 && go(t)
  ), u = (
    /*barHeights*/
    t[4].targ > 2 && /*barHeights*/
    t[4].high > 2 && mo(t)
  ), a = (
    /*barHeights*/
    t[4].high > 2 && /*barHeights*/
    t[4].vhigh > 2 && wo(t)
  );
  return {
    c() {
      r && r.c(), e = me(), s && s.c(), n = me(), u && u.c(), i = me(), a && a.c(), o = me();
    },
    m(l, g) {
      r && r.m(l, g), bt(l, e, g), s && s.m(l, g), bt(l, n, g), u && u.m(l, g), bt(l, i, g), a && a.m(l, g), bt(l, o, g);
    },
    p(l, g) {
      /*barHeights*/
      l[4].vlow > 2 && /*barHeights*/
      l[4].low > 2 ? r ? r.p(l, g) : (r = co(l), r.c(), r.m(e.parentNode, e)) : r && (r.d(1), r = null), /*barHeights*/
      l[4].low > 2 && /*barHeights*/
      l[4].targ > 2 ? s ? s.p(l, g) : (s = go(l), s.c(), s.m(n.parentNode, n)) : s && (s.d(1), s = null), /*barHeights*/
      l[4].targ > 2 && /*barHeights*/
      l[4].high > 2 ? u ? u.p(l, g) : (u = mo(l), u.c(), u.m(i.parentNode, i)) : u && (u.d(1), u = null), /*barHeights*/
      l[4].high > 2 && /*barHeights*/
      l[4].vhigh > 2 ? a ? a.p(l, g) : (a = wo(l), a.c(), a.m(o.parentNode, o)) : a && (a.d(1), a = null);
    },
    d(l) {
      l && (_t(e), _t(n), _t(i), _t(o)), r && r.d(l), s && s.d(l), u && u.d(l), a && a.d(l);
    }
  };
}
function co(t) {
  let e, n, i;
  return {
    c() {
      e = X("line"), f(e, "x1", "40"), f(e, "x2", "90"), f(e, "y1", n = 30 + /*barPositions*/
      t[3].vlow), f(e, "y2", i = 30 + /*barPositions*/
      t[3].vlow), f(e, "stroke", "#fff"), f(e, "stroke-width", "1");
    },
    m(o, r) {
      bt(o, e, r);
    },
    p(o, r) {
      r & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      o[3].vlow) && f(e, "y1", n), r & /*barPositions*/
      8 && i !== (i = 30 + /*barPositions*/
      o[3].vlow) && f(e, "y2", i);
    },
    d(o) {
      o && _t(e);
    }
  };
}
function go(t) {
  let e, n, i;
  return {
    c() {
      e = X("line"), f(e, "x1", "40"), f(e, "x2", "90"), f(e, "y1", n = 30 + /*barPositions*/
      t[3].low), f(e, "y2", i = 30 + /*barPositions*/
      t[3].low), f(e, "stroke", "#fff"), f(e, "stroke-width", "1");
    },
    m(o, r) {
      bt(o, e, r);
    },
    p(o, r) {
      r & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      o[3].low) && f(e, "y1", n), r & /*barPositions*/
      8 && i !== (i = 30 + /*barPositions*/
      o[3].low) && f(e, "y2", i);
    },
    d(o) {
      o && _t(e);
    }
  };
}
function mo(t) {
  let e, n, i;
  return {
    c() {
      e = X("line"), f(e, "x1", "40"), f(e, "x2", "90"), f(e, "y1", n = 30 + /*barPositions*/
      t[3].targ), f(e, "y2", i = 30 + /*barPositions*/
      t[3].targ), f(e, "stroke", "#fff"), f(e, "stroke-width", "1");
    },
    m(o, r) {
      bt(o, e, r);
    },
    p(o, r) {
      r & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      o[3].targ) && f(e, "y1", n), r & /*barPositions*/
      8 && i !== (i = 30 + /*barPositions*/
      o[3].targ) && f(e, "y2", i);
    },
    d(o) {
      o && _t(e);
    }
  };
}
function wo(t) {
  let e, n, i;
  return {
    c() {
      e = X("line"), f(e, "x1", "40"), f(e, "x2", "90"), f(e, "y1", n = 30 + /*barPositions*/
      t[3].high), f(e, "y2", i = 30 + /*barPositions*/
      t[3].high), f(e, "stroke", "#fff"), f(e, "stroke-width", "1");
    },
    m(o, r) {
      bt(o, e, r);
    },
    p(o, r) {
      r & /*barPositions*/
      8 && n !== (n = 30 + /*barPositions*/
      o[3].high) && f(e, "y1", n), r & /*barPositions*/
      8 && i !== (i = 30 + /*barPositions*/
      o[3].high) && f(e, "y2", i);
    },
    d(o) {
      o && _t(e);
    }
  };
}
function Zc(t) {
  let e, n, i, o, r, s, u, a, l, g, d, m, c, v, w, E, D, M, T, b, L = (
    /*getRangeText*/
    t[11]("vhigh") + ""
  ), N, H, A, x, C = Math.round(
    /*pct*/
    t[1].vhigh
  ) + "", y, _, S, k, I, R = Me(
    /*minutes*/
    t[6].vhigh
  ) + "", $, vt, Z, at, et, ft, kt, V, q, tt, Et = (
    /*getRangeText*/
    t[11]("high") + ""
  ), lt, p, O, B, U = Math.round(
    /*pct*/
    t[1].high
  ) + "", ot, F, W, P, Q, J = Me(
    /*minutes*/
    t[6].high
  ) + "", pt, yt, ht, mt, xt, st, wt, nt, At, it, gt = (
    /*getRangeText*/
    t[11]("targ") + ""
  ), ut, rt, dt, Mt, Ft = Math.round(
    /*pct*/
    t[1].targ
  ) + "", Tt, Ut, It, Pt, K, Ht = Me(
    /*minutes*/
    t[6].targ
  ) + "", zt, oe, Bt, Zt, Dt, St, Yt, dn, In, Ue, he = (
    /*getRangeText*/
    t[11]("low") + ""
  ), Pe, Ke, le, Xt, Se = Math.round(
    /*pct*/
    t[1].low
  ) + "", He, qt, Gt, ze, ir, Vn = Me(
    /*minutes*/
    t[6].low
  ) + "", wi, rr, or, Wn, $e, Fe, je, lr, ar, mn, ml = (
    /*getRangeText*/
    t[11]("vlow") + ""
  ), sr, fr, Ee, Ye, qn = Math.round(
    /*pct*/
    t[1].vlow
  ) + "", vi, ur, hr, Ie, cr, Bn = Me(
    /*minutes*/
    t[6].vlow
  ) + "", pi, gr, Xn, Qt = (
    /*present*/
    t[5] > 0 && no(t)
  ), Ot = (
    /*pct*/
    t[1].high > 0 && io(t)
  ), Jt = (
    /*pct*/
    t[1].targ > 0 && ro(t)
  ), Kt = (
    /*pct*/
    t[1].low > 0 && oo(t)
  ), $t = (
    /*barHeights*/
    t[4].vlow > 0 && lo(t)
  ), jt = (
    /*barHeights*/
    t[4].low > 0 && ao(t)
  ), te = (
    /*barHeights*/
    t[4].targ > 0 && so(t)
  ), ee = (
    /*barHeights*/
    t[4].high > 0 && fo(t)
  ), ne = (
    /*barHeights*/
    t[4].vhigh > 0 && uo(t)
  ), ie = (
    /*showSeparators*/
    t[0] && ho(t)
  );
  return {
    c() {
      e = Y("div"), n = X("svg"), Qt && Qt.c(), i = X("path"), Ot && Ot.c(), r = me(), Jt && Jt.c(), s = me(), Kt && Kt.c(), u = X("path"), l = X("rect"), $t && $t.c(), g = me(), jt && jt.c(), d = me(), te && te.c(), m = me(), ee && ee.c(), c = me(), ne && ne.c(), v = me(), ie && ie.c(), w = X("g"), E = X("text"), D = X("tspan"), M = z("Very High"), T = j(), b = X("tspan"), N = z(L), H = j(), A = X("text"), x = X("tspan"), y = z(C), _ = z("%"), S = j(), k = X("tspan"), I = z("("), $ = z(R), vt = z(")"), Z = j(), et = X("g"), ft = X("text"), kt = X("tspan"), V = z("High"), q = j(), tt = X("tspan"), lt = z(Et), p = j(), O = X("text"), B = X("tspan"), ot = z(U), F = z("%"), W = j(), P = X("tspan"), Q = z("("), pt = z(J), yt = z(")"), ht = j(), xt = X("g"), st = X("text"), wt = X("tspan"), nt = z("Target"), At = j(), it = X("tspan"), ut = z(gt), rt = j(), dt = X("text"), Mt = X("tspan"), Tt = z(Ft), Ut = z("%"), It = j(), Pt = X("tspan"), K = z("("), zt = z(Ht), oe = z(")"), Bt = j(), Dt = X("g"), St = X("text"), Yt = X("tspan"), dn = z("Low"), In = j(), Ue = X("tspan"), Pe = z(he), Ke = j(), le = X("text"), Xt = X("tspan"), He = z(Se), qt = z("%"), Gt = j(), ze = X("tspan"), ir = z("("), wi = z(Vn), rr = z(")"), or = j(), $e = X("g"), Fe = X("text"), je = X("tspan"), lr = z("Very Low"), ar = j(), mn = X("tspan"), sr = z(ml), fr = j(), Ee = X("text"), Ye = X("tspan"), vi = z(qn), ur = z("%"), hr = j(), Ie = X("tspan"), cr = z("("), pi = z(Bn), gr = z(")"), f(i, "d", o = "M 40 " + (30 + /*linePositions*/
      t[2].vhigh) + " L 65 " + (30 + /*linePositions*/
      t[2].vhigh) + " L 65 25 Q 65 15 70 15 L " + de + " 15"), f(i, "stroke", "#ccc"), f(i, "stroke-width", "1"), f(i, "fill", "none"), f(u, "d", a = "M 40 " + (30 + /*linePositions*/
      t[2].vlow) + " L 65 " + (30 + /*linePositions*/
      t[2].vlow) + " L 65 225 Q 65 230 70 230 L " + de + " 230"), f(u, "stroke", "#ccc"), f(u, "stroke-width", "1"), f(u, "fill", "none"), f(l, "x", "40"), f(l, "y", "30"), f(l, "width", "50"), f(l, "height", "180"), f(l, "fill", "white"), f(l, "stroke", "#ccc"), f(l, "stroke-width", "1"), f(D, "font-size", "12"), f(D, "font-weight", "bold"), f(D, "fill", "#333"), f(b, "font-size", "10"), f(b, "fill", "#777"), f(E, "x", "103"), f(E, "y", "0"), f(E, "font-family", "Arial, sans-serif"), f(x, "font-size", "12"), f(x, "font-weight", "bold"), f(x, "fill", "#333"), f(k, "font-size", "10"), f(k, "fill", "#777"), f(A, "x", de), f(A, "y", "0"), f(A, "font-family", "Arial, sans-serif"), f(A, "text-anchor", "end"), f(w, "transform", at = "translate(0, " + /*textPositions*/
      (t[7].vhigh - 40) + ")"), f(kt, "font-size", "12"), f(kt, "font-weight", "bold"), f(kt, "fill", "#333"), f(tt, "font-size", "10"), f(tt, "fill", "#777"), f(ft, "x", "103"), f(ft, "y", "0"), f(ft, "font-family", "Arial, sans-serif"), f(B, "font-size", "12"), f(B, "font-weight", "bold"), f(B, "fill", "#333"), f(P, "font-size", "10"), f(P, "fill", "#777"), f(O, "x", de), f(O, "y", "0"), f(O, "font-family", "Arial, sans-serif"), f(O, "text-anchor", "end"), f(et, "transform", mt = "translate(0, " + /*textPositions*/
      (t[7].high - 40) + ")"), f(wt, "font-size", "12"), f(wt, "font-weight", "bold"), f(wt, "fill", "#333"), f(it, "font-size", "10"), f(it, "fill", "#777"), f(st, "x", "103"), f(st, "y", "0"), f(st, "font-family", "Arial, sans-serif"), f(Mt, "font-size", "12"), f(Mt, "font-weight", "bold"), f(Mt, "fill", "#333"), f(Pt, "font-size", "10"), f(Pt, "fill", "#777"), f(dt, "x", de), f(dt, "y", "0"), f(dt, "font-family", "Arial, sans-serif"), f(dt, "text-anchor", "end"), f(xt, "transform", Zt = "translate(0, " + /*textPositions*/
      (t[7].targ - 40) + ")"), f(Yt, "font-size", "12"), f(Yt, "font-weight", "bold"), f(Yt, "fill", "#333"), f(Ue, "font-size", "10"), f(Ue, "fill", "#777"), f(St, "x", "103"), f(St, "y", "0"), f(St, "font-family", "Arial, sans-serif"), f(Xt, "font-size", "12"), f(Xt, "font-weight", "bold"), f(Xt, "fill", "#333"), f(ze, "font-size", "10"), f(ze, "fill", "#777"), f(le, "x", de), f(le, "y", "0"), f(le, "font-family", "Arial, sans-serif"), f(le, "text-anchor", "end"), f(Dt, "transform", Wn = "translate(0, " + /*textPositions*/
      (t[7].low - 40) + ")"), f(je, "font-size", "12"), f(je, "font-weight", "bold"), f(je, "fill", "#333"), f(mn, "font-size", "10"), f(mn, "fill", "#777"), f(Fe, "x", "103"), f(Fe, "y", "0"), f(Fe, "font-family", "Arial, sans-serif"), f(Ye, "font-size", "12"), f(Ye, "font-weight", "bold"), f(Ye, "fill", "#333"), f(Ie, "font-size", "10"), f(Ie, "fill", "#777"), f(Ee, "x", "340"), f(Ee, "y", "0"), f(Ee, "font-family", "Arial, sans-serif"), f(Ee, "text-anchor", "end"), f($e, "transform", Xn = "translate(0, " + /*textPositions*/
      (t[7].vlow - 40) + ")"), f(
        n,
        "width",
        /*svgWidth*/
        t[12]
      ), f(n, "height", vo), f(n, "viewBox", "0 0 " + /*svgWidth*/
      t[12] + " " + vo), f(n, "class", "svelte-1d3n1f2"), f(e, "class", "widget-container svelte-1d3n1f2");
    },
    m(ct, Lt) {
      bt(ct, e, Lt), h(e, n), Qt && Qt.m(n, null), h(n, i), Ot && Ot.m(n, null), h(n, r), Jt && Jt.m(n, null), h(n, s), Kt && Kt.m(n, null), h(n, u), h(n, l), $t && $t.m(n, null), h(n, g), jt && jt.m(n, null), h(n, d), te && te.m(n, null), h(n, m), ee && ee.m(n, null), h(n, c), ne && ne.m(n, null), h(n, v), ie && ie.m(n, null), h(n, w), h(w, E), h(E, D), h(D, M), h(E, T), h(E, b), h(b, N), h(E, H), h(w, A), h(A, x), h(x, y), h(x, _), h(A, S), h(A, k), h(k, I), h(k, $), h(k, vt), h(A, Z), h(n, et), h(et, ft), h(ft, kt), h(kt, V), h(ft, q), h(ft, tt), h(tt, lt), h(ft, p), h(et, O), h(O, B), h(B, ot), h(B, F), h(O, W), h(O, P), h(P, Q), h(P, pt), h(P, yt), h(O, ht), h(n, xt), h(xt, st), h(st, wt), h(wt, nt), h(st, At), h(st, it), h(it, ut), h(st, rt), h(xt, dt), h(dt, Mt), h(Mt, Tt), h(Mt, Ut), h(dt, It), h(dt, Pt), h(Pt, K), h(Pt, zt), h(Pt, oe), h(dt, Bt), h(n, Dt), h(Dt, St), h(St, Yt), h(Yt, dn), h(St, In), h(St, Ue), h(Ue, Pe), h(St, Ke), h(Dt, le), h(le, Xt), h(Xt, He), h(Xt, qt), h(le, Gt), h(le, ze), h(ze, ir), h(ze, wi), h(ze, rr), h(le, or), h(n, $e), h($e, Fe), h(Fe, je), h(je, lr), h(Fe, ar), h(Fe, mn), h(mn, sr), h(Fe, fr), h($e, Ee), h(Ee, Ye), h(Ye, vi), h(Ye, ur), h(Ee, hr), h(Ee, Ie), h(Ie, cr), h(Ie, pi), h(Ie, gr);
    },
    p(ct, [Lt]) {
      /*present*/
      ct[5] > 0 ? Qt ? Qt.p(ct, Lt) : (Qt = no(ct), Qt.c(), Qt.m(n, i)) : Qt && (Qt.d(1), Qt = null), Lt & /*linePositions*/
      4 && o !== (o = "M 40 " + (30 + /*linePositions*/
      ct[2].vhigh) + " L 65 " + (30 + /*linePositions*/
      ct[2].vhigh) + " L 65 25 Q 65 15 70 15 L " + de + " 15") && f(i, "d", o), /*pct*/
      ct[1].high > 0 ? Ot ? Ot.p(ct, Lt) : (Ot = io(ct), Ot.c(), Ot.m(n, r)) : Ot && (Ot.d(1), Ot = null), /*pct*/
      ct[1].targ > 0 ? Jt ? Jt.p(ct, Lt) : (Jt = ro(ct), Jt.c(), Jt.m(n, s)) : Jt && (Jt.d(1), Jt = null), /*pct*/
      ct[1].low > 0 ? Kt ? Kt.p(ct, Lt) : (Kt = oo(ct), Kt.c(), Kt.m(n, u)) : Kt && (Kt.d(1), Kt = null), Lt & /*linePositions*/
      4 && a !== (a = "M 40 " + (30 + /*linePositions*/
      ct[2].vlow) + " L 65 " + (30 + /*linePositions*/
      ct[2].vlow) + " L 65 225 Q 65 230 70 230 L " + de + " 230") && f(u, "d", a), /*barHeights*/
      ct[4].vlow > 0 ? $t ? $t.p(ct, Lt) : ($t = lo(ct), $t.c(), $t.m(n, g)) : $t && ($t.d(1), $t = null), /*barHeights*/
      ct[4].low > 0 ? jt ? jt.p(ct, Lt) : (jt = ao(ct), jt.c(), jt.m(n, d)) : jt && (jt.d(1), jt = null), /*barHeights*/
      ct[4].targ > 0 ? te ? te.p(ct, Lt) : (te = so(ct), te.c(), te.m(n, m)) : te && (te.d(1), te = null), /*barHeights*/
      ct[4].high > 0 ? ee ? ee.p(ct, Lt) : (ee = fo(ct), ee.c(), ee.m(n, c)) : ee && (ee.d(1), ee = null), /*barHeights*/
      ct[4].vhigh > 0 ? ne ? ne.p(ct, Lt) : (ne = uo(ct), ne.c(), ne.m(n, v)) : ne && (ne.d(1), ne = null), /*showSeparators*/
      ct[0] ? ie ? ie.p(ct, Lt) : (ie = ho(ct), ie.c(), ie.m(n, w)) : ie && (ie.d(1), ie = null), Lt & /*pct*/
      2 && C !== (C = Math.round(
        /*pct*/
        ct[1].vhigh
      ) + "") && Ct(y, C), Lt & /*minutes*/
      64 && R !== (R = Me(
        /*minutes*/
        ct[6].vhigh
      ) + "") && Ct($, R), Lt & /*textPositions*/
      128 && at !== (at = "translate(0, " + /*textPositions*/
      (ct[7].vhigh - 40) + ")") && f(w, "transform", at), Lt & /*pct*/
      2 && U !== (U = Math.round(
        /*pct*/
        ct[1].high
      ) + "") && Ct(ot, U), Lt & /*minutes*/
      64 && J !== (J = Me(
        /*minutes*/
        ct[6].high
      ) + "") && Ct(pt, J), Lt & /*textPositions*/
      128 && mt !== (mt = "translate(0, " + /*textPositions*/
      (ct[7].high - 40) + ")") && f(et, "transform", mt), Lt & /*pct*/
      2 && Ft !== (Ft = Math.round(
        /*pct*/
        ct[1].targ
      ) + "") && Ct(Tt, Ft), Lt & /*minutes*/
      64 && Ht !== (Ht = Me(
        /*minutes*/
        ct[6].targ
      ) + "") && Ct(zt, Ht), Lt & /*textPositions*/
      128 && Zt !== (Zt = "translate(0, " + /*textPositions*/
      (ct[7].targ - 40) + ")") && f(xt, "transform", Zt), Lt & /*pct*/
      2 && Se !== (Se = Math.round(
        /*pct*/
        ct[1].low
      ) + "") && Ct(He, Se), Lt & /*minutes*/
      64 && Vn !== (Vn = Me(
        /*minutes*/
        ct[6].low
      ) + "") && Ct(wi, Vn), Lt & /*textPositions*/
      128 && Wn !== (Wn = "translate(0, " + /*textPositions*/
      (ct[7].low - 40) + ")") && f(Dt, "transform", Wn), Lt & /*pct*/
      2 && qn !== (qn = Math.round(
        /*pct*/
        ct[1].vlow
      ) + "") && Ct(vi, qn), Lt & /*minutes*/
      64 && Bn !== (Bn = Me(
        /*minutes*/
        ct[6].vlow
      ) + "") && Ct(pi, Bn), Lt & /*textPositions*/
      128 && Xn !== (Xn = "translate(0, " + /*textPositions*/
      (ct[7].vlow - 40) + ")") && f($e, "transform", Xn);
    },
    i: Nt,
    o: Nt,
    d(ct) {
      ct && _t(e), Qt && Qt.d(), Ot && Ot.d(), Jt && Jt.d(), Kt && Kt.d(), $t && $t.d(), jt && jt.d(), te && te.d(), ee && ee.d(), ne && ne.d(), ie && ie.d();
    }
  };
}
const xe = 180, vo = 240, de = 340;
function Me(t) {
  const e = Math.floor(t / 60), n = Math.round(t % 60);
  return e === 0 ? `${n}min` : `${e}h${n.toString().padStart(2, "0")}min`;
}
function Qc(t, e, n) {
  let i, o, r, s, u;
  const a = gn();
  let { data: l } = e, { range: g = null } = e, { preset: d = "N" } = e, { showSeparators: m = !1 } = e, c, v;
  const w = () => /mmol/i.test((l == null ? void 0 : l.units) || "mmol"), E = () => w() ? d === "T" ? {
    vlow: 3,
    low: 3.9,
    high: 7.8,
    vhigh: 13.9
  } : d === "P" ? {
    vlow: 3,
    low: 3.5,
    high: 7.8,
    vhigh: 13.9
  } : {
    vlow: 3,
    low: 3.9,
    high: 10,
    vhigh: 13.9
  } : d === "T" ? { vlow: 54, low: 70, high: 140, vhigh: 250 } : d === "P" ? { vlow: 54, low: 63, high: 140, vhigh: 250 } : { vlow: 54, low: 70, high: 180, vhigh: 250 };
  let D = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  }, M = 0, T = 0, b = {
    vlow: 0,
    low: 0,
    targ: 0,
    high: 0,
    vhigh: 0
  };
  function L() {
    if (!l) return;
    const x = new Date(l.t0).getTime();
    n(16, c = Float64Array.from({ length: l.glucose.length }, (C, y) => x + y * l.stepMs)), n(17, v = Float64Array.from(l.glucose));
  }
  function N() {
    try {
      a("stats", {
        pct: D,
        present: M,
        expected: T,
        preset: d,
        units: (l == null ? void 0 : l.units) || "mmol/L"
      });
    } catch {
    }
  }
  function H(x) {
    const C = E(), y = w() ? "mmol/L" : "mg/dL";
    return x === "vhigh" ? `>${w() ? C.vhigh.toFixed(1) : Math.round(C.vhigh)} ${y}` : x === "high" ? `${w() ? (C.high + 0.1).toFixed(1) : Math.round(C.high) + 1}-${w() ? C.vhigh.toFixed(1) : Math.round(C.vhigh)} ${y}` : x === "targ" ? `${w() ? C.low.toFixed(1) : Math.round(C.low)}-${w() ? C.high.toFixed(1) : Math.round(C.high)} ${y}` : x === "low" ? `${w() ? C.vlow.toFixed(1) : Math.round(C.vlow)}-${w() ? (C.low - 0.1).toFixed(1) : Math.round(C.low) - 1} ${y}` : x === "vlow" ? `<${w() ? C.vlow.toFixed(1) : Math.round(C.vlow)} ${y}` : "";
  }
  const A = de + 10;
  return t.$$set = (x) => {
    "data" in x && n(13, l = x.data), "range" in x && n(14, g = x.range), "preset" in x && n(15, d = x.preset), "showSeparators" in x && n(0, m = x.showSeparators);
  }, t.$$.update = () => {
    if (t.$$.dirty & /*data*/
    8192 && l && L(), t.$$.dirty & /*data, range, time, values, preset*/
    253952 && l && g && c && v && d) {
      const { start: x, end: C } = g, y = Math.max(0, Math.ceil((x - c[0]) / l.stepMs)), _ = Math.min(v.length - 1, Math.floor((C - c[0]) / l.stepMs));
      if (_ < y)
        n(1, D = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }), n(5, M = 0), T = 0, n(6, b = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        });
      else {
        const S = E();
        let k = {
          vlow: 0,
          low: 0,
          targ: 0,
          high: 0,
          vhigh: 0
        }, I = 0;
        for (let R = y; R <= _; R++) {
          const $ = v[R];
          Number.isFinite($) && $ >= 0 && (I++, $ < S.vlow ? k.vlow++ : $ < S.low ? k.low++ : $ <= S.high ? k.targ++ : $ <= S.vhigh ? k.high++ : k.vhigh++);
        }
        if (n(5, M = I), T = Math.max(1, _ - y + 1), I === 0)
          n(1, D = {
            vlow: 0,
            low: 0,
            targ: 0,
            high: 0,
            vhigh: 0
          }), n(6, b = {
            vlow: 0,
            low: 0,
            targ: 0,
            high: 0,
            vhigh: 0
          });
        else {
          n(1, D = {
            vlow: k.vlow / I * 100,
            low: k.low / I * 100,
            targ: k.targ / I * 100,
            high: k.high / I * 100,
            vhigh: k.vhigh / I * 100
          });
          const R = 24 * 60;
          n(6, b = {
            vlow: k.vlow / I * R,
            low: k.low / I * R,
            targ: k.targ / I * R,
            high: k.high / I * R,
            vhigh: k.vhigh / I * R
          });
        }
      }
      N();
    }
    t.$$.dirty & /*pct*/
    2 && n(4, i = {
      vhigh: D.vhigh / 100 * xe,
      high: D.high / 100 * xe,
      targ: D.targ / 100 * xe,
      low: D.low / 100 * xe,
      vlow: D.vlow / 100 * xe
    }), t.$$.dirty & /*barHeights*/
    16 && n(3, o = {
      vlow: xe - i.vlow,
      low: xe - i.vlow - i.low,
      targ: xe - i.vlow - i.low - i.targ,
      high: xe - i.vlow - i.low - i.targ - i.high,
      vhigh: xe - i.vlow - i.low - i.targ - i.high - i.vhigh
    }), t.$$.dirty & /*barPositions, barHeights*/
    24 && n(2, r = {
      vhigh: o.vhigh + i.vhigh / 2,
      high: o.high + i.high / 2,
      targ: o.targ + i.targ / 2,
      low: o.low + i.low / 2,
      vlow: o.vlow + i.vlow / 2
    }), t.$$.dirty & /*barPositions*/
    8 && n(8, s = {
      low: o.vlow,
      // Boundary between vlow and low sections
      high: o.targ,
      // Boundary between target and high sections
      vhigh: o.high
      // Boundary between high and vhigh sections
    }), t.$$.dirty & /*pct, linePositions*/
    6 && n(7, u = {
      vhigh: 55,
      // Fixed at top
      high: D.high > 0 ? 70 + r.high : 105,
      targ: D.targ > 0 ? 70 + r.targ : 181,
      low: D.low > 0 ? 70 + r.low : 242,
      vlow: 270
      // Fixed at bottom
    });
  }, [
    m,
    D,
    r,
    o,
    i,
    M,
    b,
    u,
    s,
    w,
    E,
    H,
    A,
    l,
    g,
    d,
    c,
    v
  ];
}
class Oc extends ue {
  constructor(e) {
    super(), fe(this, e, Qc, Zc, se, {
      data: 13,
      range: 14,
      preset: 15,
      showSeparators: 0
    });
  }
}
function po(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  const o = new ic({ target: i, props: { data: e, initialRange: n.initialRange ?? null, externalRange: null, preset: n.preset || "N", showMonthLabels: n.monthLabels ?? !0, showData: n.dataVisible ?? !0, showCanvas: n.canvasVisible ?? !0 } }), r = /* @__PURE__ */ new Map();
  let s = n.initialRange ?? null;
  function u(v, w) {
    const E = r.get(v) || [];
    E.push(w), r.set(v, E);
  }
  o.$on("rangechange", (v) => {
    var E;
    const w = v.detail;
    s = { start: w.start, end: w.end }, (E = r.get("rangechange")) == null || E.forEach((D) => D(w));
  }), o.$on("ready", (v) => {
    var E;
    const w = v.detail;
    s = { start: w.start, end: w.end }, (E = r.get("ready")) == null || E.forEach((D) => D(w));
  });
  function a(v, w) {
    if (typeof v == "number" && typeof w == "number")
      o.$set({ externalRange: { start: v, end: w } });
    else if (v && typeof v.start == "number" && typeof v.end == "number")
      o.$set({ externalRange: { start: v.start, end: v.end } });
    else
      throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function l() {
    return s;
  }
  function g(v) {
    o.$set({ preset: v });
  }
  function d(v) {
    o.$set({ showData: !!v });
  }
  function m(v) {
    o.$set({ showMonthLabels: !!v });
  }
  function c(v) {
    o.$set({ showCanvas: !!v });
  }
  return { on: u, setRange: a, getRange: l, setPreset: g, setDataVisible: d, setMonthLabels: m, setCanvasVisible: c, destroy: () => o.$destroy() };
}
typeof window < "u" && (window.createTirCalendar = po, window.createCgmTir = po);
function Jc(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let o = n.initialRange || null;
  const r = new lc({ target: i, props: { data: e, range: o, preset: n.preset || "N" } });
  function s(l, g) {
    if (typeof l == "number" && typeof g == "number")
      r.$set({ range: { start: l, end: g } });
    else if (l && typeof l.start == "number" && typeof l.end == "number")
      r.$set({ range: l });
    else
      throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function u(l) {
    r.$set({ data: l });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: l, end: g }) => s({ start: l, end: g })), n.source.on("ready", ({ start: l, end: g }) => s({ start: l, end: g })), typeof n.source.getRange == "function")) {
    const l = n.source.getRange();
    l && typeof l.start == "number" && typeof l.end == "number" && s(l);
  }
  function a(l) {
    r.$set({ preset: l });
  }
  return { setRange: s, setData: u, setPreset: a, destroy: () => r.$destroy() };
}
typeof window < "u" && (window.createCgmSummary = Jc);
function Kc(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let o = n.initialRange || null;
  const r = new wc({ target: i, props: { data: e, range: o, preset: n.preset || "N" } });
  function s(l, g) {
    if (typeof l == "number" && typeof g == "number") r.$set({ range: { start: l, end: g } });
    else if (l && typeof l.start == "number" && typeof l.end == "number") r.$set({ range: l });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function u(l) {
    r.$set({ data: l });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: l, end: g }) => s({ start: l, end: g })), n.source.on("ready", ({ start: l, end: g }) => s({ start: l, end: g })), typeof n.source.getRange == "function")) {
    const l = n.source.getRange();
    l && typeof l.start == "number" && typeof l.end == "number" && s(l);
  }
  function a(l) {
    r.$set({ preset: l });
  }
  return { setRange: s, setData: u, setPreset: a, destroy: () => r.$destroy() };
}
typeof window < "u" && (window.createCgmTir = Kc);
function $c(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let o = n.initialRange || null;
  const r = new yc({ target: i, props: { data: e, range: o, preset: n.preset || "N" } });
  function s(l, g) {
    if (typeof l == "number" && typeof g == "number") r.$set({ range: { start: l, end: g } });
    else if (l && typeof l.start == "number" && typeof l.end == "number") r.$set({ range: l });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function u(l) {
    r.$set({ data: l });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: l, end: g }) => s({ start: l, end: g })), n.source.on("ready", ({ start: l, end: g }) => s({ start: l, end: g })), typeof n.source.getRange == "function")) {
    const l = n.source.getRange();
    l && typeof l.start == "number" && typeof l.end == "number" && s(l);
  }
  function a(l) {
    r.$set({ preset: l });
  }
  return { setRange: s, setData: u, setPreset: a, destroy: () => r.$destroy() };
}
typeof window < "u" && (window.createCgmAgp = $c);
function jc(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let o = n.initialRange || null;
  const r = new Ic({ target: i, props: { data: e, range: o, preset: n.preset || "N" } });
  function s(l, g) {
    if (typeof l == "number" && typeof g == "number") r.$set({ range: { start: l, end: g } });
    else if (l && typeof l.start == "number" && typeof l.end == "number") r.$set({ range: l });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function u(l) {
    r.$set({ data: l });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: l, end: g }) => s({ start: l, end: g })), n.source.on("ready", ({ start: l, end: g }) => s({ start: l, end: g })), typeof n.source.getRange == "function")) {
    const l = n.source.getRange();
    l && typeof l.start == "number" && typeof l.end == "number" && s(l);
  }
  function a(l) {
    r.$set({ preset: l });
  }
  return { setRange: s, setData: u, setPreset: a, destroy: () => r.$destroy() };
}
typeof window < "u" && (window.createCgmTirModern = jc);
function t0(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let o = n.initialRange || null;
  const r = new qc({ target: i, props: { data: e, range: o, preset: n.preset || "N" } });
  function s(l, g) {
    if (typeof l == "number" && typeof g == "number") r.$set({ range: { start: l, end: g } });
    else if (l && typeof l.start == "number" && typeof l.end == "number") r.$set({ range: l });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function u(l) {
    r.$set({ data: l });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: l, end: g }) => s({ start: l, end: g })), n.source.on("ready", ({ start: l, end: g }) => s({ start: l, end: g })), typeof n.source.getRange == "function")) {
    const l = n.source.getRange();
    l && typeof l.start == "number" && typeof l.end == "number" && s(l);
  }
  function a(l) {
    r.$set({ preset: l });
  }
  return { setRange: s, setData: u, setPreset: a, destroy: () => r.$destroy() };
}
typeof window < "u" && (window.createCgmTirClaude = t0);
function e0(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let o = n.initialRange || null;
  const r = new Gc({ target: i, props: { data: e, range: o, preset: n.preset || "N" } });
  function s(l, g) {
    if (typeof l == "number" && typeof g == "number") r.$set({ range: { start: l, end: g } });
    else if (l && typeof l.start == "number" && typeof l.end == "number") r.$set({ range: l });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function u(l) {
    r.$set({ data: l });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: l, end: g }) => s({ start: l, end: g })), n.source.on("ready", ({ start: l, end: g }) => s({ start: l, end: g })), typeof n.source.getRange == "function")) {
    const l = n.source.getRange();
    l && typeof l.start == "number" && typeof l.end == "number" && s(l);
  }
  function a(l) {
    r.$set({ preset: l });
  }
  return { setRange: s, setData: u, setPreset: a, destroy: () => r.$destroy() };
}
typeof window < "u" && (window.createCgmTirVertical = e0);
function n0(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let o = n.initialRange || null;
  const r = new Pc({ target: i, props: { data: e, range: o, preset: n.preset || "N" } });
  function s(l, g) {
    if (typeof l == "number" && typeof g == "number") r.$set({ range: { start: l, end: g } });
    else if (l && typeof l.start == "number" && typeof l.end == "number") r.$set({ range: l });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function u(l) {
    r.$set({ data: l });
  }
  function a(l) {
    r.$set({ preset: l });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: l, end: g }) => s({ start: l, end: g })), n.source.on("ready", ({ start: l, end: g }) => s({ start: l, end: g })), typeof n.source.getRange == "function")) {
    const l = n.source.getRange();
    l && typeof l.start == "number" && typeof l.end == "number" && s(l);
  }
  return { setRange: s, setData: u, setPreset: a, destroy: () => r.$destroy() };
}
typeof window < "u" && (window.createCgmStrips = n0);
function i0(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let o = n.initialRange || null;
  const r = new xc({ target: i, props: { data: e, range: o, preset: n.preset || "N" } }), s = /* @__PURE__ */ new Map();
  let u = null;
  function a(c, v) {
    const w = s.get(c) || [];
    w.push(v), s.set(c, w);
  }
  r.$on("stats", (c) => {
    var w;
    const v = c.detail;
    u = v, (w = s.get("stats")) == null || w.forEach((E) => E(v));
  });
  function l(c, v) {
    if (typeof c == "number" && typeof v == "number") r.$set({ range: { start: c, end: v } });
    else if (c && typeof c.start == "number" && typeof c.end == "number") r.$set({ range: c });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function g(c) {
    r.$set({ data: c });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: c, end: v }) => l({ start: c, end: v })), n.source.on("ready", ({ start: c, end: v }) => l({ start: c, end: v })), typeof n.source.getRange == "function")) {
    const c = n.source.getRange();
    c && typeof c.start == "number" && typeof c.end == "number" && l(c);
  }
  function d(c) {
    r.$set({ preset: c });
  }
  function m() {
    return u;
  }
  return { on: a, setRange: l, setData: g, setPreset: d, getStats: m, destroy: () => r.$destroy() };
}
typeof window < "u" && (window.createCgmTirCard = i0);
function r0(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let o = n.initialRange || null;
  const r = new Nc({ target: i, props: { data: e, range: o, preset: n.preset || "N" } }), s = /* @__PURE__ */ new Map();
  let u = null;
  function a(c, v) {
    const w = s.get(c) || [];
    w.push(v), s.set(c, w);
  }
  r.$on("stats", (c) => {
    var w;
    const v = c.detail;
    u = v, (w = s.get("stats")) == null || w.forEach((E) => E(v));
  });
  function l(c, v) {
    if (typeof c == "number" && typeof v == "number") r.$set({ range: { start: c, end: v } });
    else if (c && typeof c.start == "number" && typeof c.end == "number") r.$set({ range: c });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function g(c) {
    r.$set({ data: c });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: c, end: v }) => l({ start: c, end: v })), n.source.on("ready", ({ start: c, end: v }) => l({ start: c, end: v })), typeof n.source.getRange == "function")) {
    const c = n.source.getRange();
    c && typeof c.start == "number" && typeof c.end == "number" && l(c);
  }
  function d(c) {
    r.$set({ preset: c });
  }
  function m() {
    return u;
  }
  return { on: a, setRange: l, setData: g, setPreset: d, getStats: m, destroy: () => r.$destroy() };
}
typeof window < "u" && (window.createCgmTirAgpCard = r0);
function o0(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let o = n.initialRange || null;
  const r = new Sc({ target: i, props: { data: e, range: o, preset: n.preset || "N" } }), s = /* @__PURE__ */ new Map();
  let u = null;
  function a(c, v) {
    const w = s.get(c) || [];
    w.push(v), s.set(c, w);
  }
  r.$on("stats", (c) => {
    var w;
    const v = c.detail;
    u = v, (w = s.get("stats")) == null || w.forEach((E) => E(v));
  });
  function l(c, v) {
    if (typeof c == "number" && typeof v == "number") r.$set({ range: { start: c, end: v } });
    else if (c && typeof c.start == "number" && typeof c.end == "number") r.$set({ range: c });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function g(c) {
    r.$set({ data: c });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: c, end: v }) => l({ start: c, end: v })), n.source.on("ready", ({ start: c, end: v }) => l({ start: c, end: v })), typeof n.source.getRange == "function")) {
    const c = n.source.getRange();
    c && typeof c.start == "number" && typeof c.end == "number" && l(c);
  }
  function d(c) {
    r.$set({ preset: c });
  }
  function m() {
    return u;
  }
  return { on: a, setRange: l, setData: g, setPreset: d, getStats: m, destroy: () => r.$destroy() };
}
typeof window < "u" && (window.createCgmTirAgpCardCanvas = o0);
function l0(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let o = n.initialRange || null;
  const r = new Rc({ target: i, props: { data: e, range: o, preset: n.preset || "N" } }), s = /* @__PURE__ */ new Map();
  function u(d, m) {
    const c = s.get(d) || [];
    c.push(m), s.set(d, c);
  }
  r.$on("stats", (d) => {
    var c;
    const m = d.detail;
    (c = s.get("stats")) == null || c.forEach((v) => v(m));
  });
  function a(d, m) {
    if (typeof d == "number" && typeof m == "number") r.$set({ range: { start: d, end: m } });
    else if (d && typeof d.start == "number" && typeof d.end == "number") r.$set({ range: d });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function l(d) {
    r.$set({ data: d });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: d, end: m }) => a({ start: d, end: m })), n.source.on("ready", ({ start: d, end: m }) => a({ start: d, end: m })), typeof n.source.getRange == "function")) {
    const d = n.source.getRange();
    d && typeof d.start == "number" && typeof d.end == "number" && a(d);
  }
  function g(d) {
    r.$set({ preset: d });
  }
  return { on: u, setRange: a, setData: l, setPreset: g, destroy: () => r.$destroy() };
}
typeof window < "u" && (window.createCgmTirEndsCardCanvas = l0);
function a0(t, e, n = {}) {
  const i = document.getElementById(t);
  if (!i) throw new Error(`No element with id "${t}"`);
  let o = n.initialRange || null;
  const r = new Oc({ target: i, props: { data: e, range: o, preset: n.preset || "N" } }), s = /* @__PURE__ */ new Map();
  let u = null;
  function a(c, v) {
    const w = s.get(c) || [];
    w.push(v), s.set(c, w);
  }
  r.$on("stats", (c) => {
    var w;
    const v = c.detail;
    u = v, (w = s.get("stats")) == null || w.forEach((E) => E(v));
  });
  function l(c, v) {
    if (typeof c == "number" && typeof v == "number") r.$set({ range: { start: c, end: v } });
    else if (c && typeof c.start == "number" && typeof c.end == "number") r.$set({ range: c });
    else throw new Error("setRange expects (start:number, end:number) or {start,end}");
  }
  function g(c) {
    r.$set({ data: c });
  }
  if (n.source && typeof n.source.on == "function" && (n.source.on("rangechange", ({ start: c, end: v }) => l({ start: c, end: v })), n.source.on("ready", ({ start: c, end: v }) => l({ start: c, end: v })), typeof n.source.getRange == "function")) {
    const c = n.source.getRange();
    c && typeof c.start == "number" && typeof c.end == "number" && l(c);
  }
  function d(c) {
    r.$set({ preset: c });
  }
  function m() {
    return u;
  }
  return { on: a, setRange: l, setData: g, setPreset: d, getStats: m, destroy: () => r.$destroy() };
}
typeof window < "u" && (window.createCgmTirDetailed = a0);
export {
  $c as createCgmAgp,
  n0 as createCgmStrips,
  Jc as createCgmSummary,
  Kc as createCgmTir,
  r0 as createCgmTirAgpCard,
  o0 as createCgmTirAgpCardCanvas,
  i0 as createCgmTirCard,
  t0 as createCgmTirClaude,
  a0 as createCgmTirDetailed,
  l0 as createCgmTirEndsCardCanvas,
  jc as createCgmTirModern,
  e0 as createCgmTirVertical,
  po as createTirCalendar
};

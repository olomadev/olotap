import { ref as as, defineComponent as kr, provide as gl, markRaw as tf, reactive as ni, h as Cr, render as hc, onMounted as nf, onBeforeUnmount as da, getCurrentInstance as ua, watchEffect as rf, nextTick as fm, unref as Pt, customRef as pm, computed as bo, watch as mc, hasInjectionContext as hm, inject as mm, resolveComponent as k, withDirectives as fa, createBlock as H, openBlock as N, withCtx as E, createVNode as O, createElementBlock as re, Fragment as be, renderList as We, resolveDynamicComponent as ri, mergeProps as ar, createSlots as pa, vShow as ha, createCommentVNode as Fe, renderSlot as ki, normalizeClass as Mn, createTextVNode as rt, toDisplayString as De, normalizeProps as gm, guardReactiveProps as ym, normalizeStyle as En, createElementVNode as dn, withModifiers as bm } from "vue";
function xe(n) {
  this.content = n;
}
xe.prototype = {
  constructor: xe,
  find: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === n) return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(n) {
    var e = this.find(n);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(n, e, t) {
    var r = t && t != n ? this.remove(t) : this, i = r.find(n), o = r.content.slice();
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new xe(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new xe(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new xe([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new xe(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new xe(i);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      n(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(n) {
    return n = xe.from(n), n.size ? new xe(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = xe.from(n), n.size ? new xe(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = xe.from(n);
    for (var t = 0; t < n.content.length; t += 2)
      e = e.remove(n.content[t]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var n = {};
    return this.forEach(function(e, t) {
      n[e] = t;
    }), n;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
xe.from = function(n) {
  if (n instanceof xe) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new xe(e);
};
function of(n, e, t) {
  for (let r = 0; ; r++) {
    if (r == n.childCount || r == e.childCount)
      return n.childCount == e.childCount ? null : t;
    let i = n.child(r), o = e.child(r);
    if (i == o) {
      t += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(o))
      return t;
    if (i.isText && i.text != o.text) {
      for (let s = 0; i.text[s] == o.text[s]; s++)
        t++;
      return t;
    }
    if (i.content.size || o.content.size) {
      let s = of(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function sf(n, e, t, r) {
  for (let i = n.childCount, o = e.childCount; ; ) {
    if (i == 0 || o == 0)
      return i == o ? null : { a: t, b: r };
    let s = n.child(--i), l = e.child(--o), a = s.nodeSize;
    if (s == l) {
      t -= a, r -= a;
      continue;
    }
    if (!s.sameMarkup(l))
      return { a: t, b: r };
    if (s.isText && s.text != l.text) {
      let c = 0, d = Math.min(s.text.length, l.text.length);
      for (; c < d && s.text[s.text.length - c - 1] == l.text[l.text.length - c - 1]; )
        c++, t--, r--;
      return { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let c = sf(s.content, l.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= a, r -= a;
  }
}
class x {
  /**
  @internal
  */
  constructor(e, t) {
    if (this.content = e, this.size = t || 0, t == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, t, r, i = 0, o) {
    for (let s = 0, l = 0; l < t; s++) {
      let a = this.content[s], c = l + a.nodeSize;
      if (c > e && r(a, i + l, o || null, s) !== !1 && a.content.size) {
        let d = l + 1;
        a.nodesBetween(Math.max(0, e - d), Math.min(a.content.size, t - d), r, i + d);
      }
      l = c;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(e, t, r, i) {
    let o = "", s = !0;
    return this.nodesBetween(e, t, (l, a) => {
      let c = l.isText ? l.text.slice(Math.max(e, a) - a, t - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
      l.isBlock && (l.isLeaf && c || l.isTextblock) && r && (s ? s = !1 : o += r), o += c;
    }, 0), o;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let t = this.lastChild, r = e.firstChild, i = this.content.slice(), o = 0;
    for (t.isText && t.sameMarkup(r) && (i[i.length - 1] = t.withText(t.text + r.text), o = 1); o < e.content.length; o++)
      i.push(e.content[o]);
    return new x(i, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, t = this.size) {
    if (e == 0 && t == this.size)
      return this;
    let r = [], i = 0;
    if (t > e)
      for (let o = 0, s = 0; s < t; o++) {
        let l = this.content[o], a = s + l.nodeSize;
        a > e && ((s < e || a > t) && (l.isText ? l = l.cut(Math.max(0, e - s), Math.min(l.text.length, t - s)) : l = l.cut(Math.max(0, e - s - 1), Math.min(l.content.size, t - s - 1))), r.push(l), i += l.nodeSize), s = a;
      }
    return new x(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? x.empty : e == 0 && t == this.content.length ? this : new x(this.content.slice(e, t));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, t) {
    let r = this.content[e];
    if (r == t)
      return this;
    let i = this.content.slice(), o = this.size + t.nodeSize - r.nodeSize;
    return i[e] = t, new x(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new x([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new x(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(e) {
    let t = this.content[e];
    if (!t)
      throw new RangeError("Index " + e + " out of range for " + this);
    return t;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content[e] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    for (let t = 0, r = 0; t < this.content.length; t++) {
      let i = this.content[t];
      e(i, r, t), r += i.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, t = 0) {
    return of(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return sf(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e, t = -1) {
    if (e == 0)
      return Vi(0, e);
    if (e == this.size)
      return Vi(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let r = 0, i = 0; ; r++) {
      let o = this.child(r), s = i + o.nodeSize;
      if (s >= e)
        return s == e || t > 0 ? Vi(r + 1, s) : Vi(r, i);
      i = s;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return x.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new x(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return x.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new x(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return x.empty;
    if (e instanceof x)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new x([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
x.empty = new x([], 0);
const Is = { index: 0, offset: 0 };
function Vi(n, e) {
  return Is.index = n, Is.offset = e, Is;
}
function vo(n, e) {
  if (n === e)
    return !0;
  if (!(n && typeof n == "object") || !(e && typeof e == "object"))
    return !1;
  let t = Array.isArray(n);
  if (Array.isArray(e) != t)
    return !1;
  if (t) {
    if (n.length != e.length)
      return !1;
    for (let r = 0; r < n.length; r++)
      if (!vo(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !vo(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let G = class yl {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.attrs = t;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let t, r = !1;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      if (this.eq(o))
        return e;
      if (this.type.excludes(o.type))
        t || (t = e.slice(0, i));
      else {
        if (o.type.excludes(this.type))
          return e;
        !r && o.type.rank > this.type.rank && (t || (t = e.slice(0, i)), t.push(this), r = !0), t && t.push(o);
      }
    }
    return t || (t = e.slice()), r || t.push(this), t;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && vo(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[t.type];
    if (!r)
      throw new RangeError(`There is no mark type ${t.type} in this schema`);
    let i = r.create(t.attrs);
    return r.checkAttrs(i.attrs), i;
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, t) {
    if (e == t)
      return !0;
    if (e.length != t.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(t[r]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return yl.none;
    if (e instanceof yl)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
G.none = [];
class wo extends Error {
}
class M {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(e, t, r) {
    this.content = e, this.openStart = t, this.openEnd = r;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(e, t) {
    let r = af(this.content, e + this.openStart, t);
    return r && new M(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new M(lf(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return M.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new M(x.fromJSON(e, t.content), r, i);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, t = !0) {
    let r = 0, i = 0;
    for (let o = e.firstChild; o && !o.isLeaf && (t || !o.type.spec.isolating); o = o.firstChild)
      r++;
    for (let o = e.lastChild; o && !o.isLeaf && (t || !o.type.spec.isolating); o = o.lastChild)
      i++;
    return new M(e, r, i);
  }
}
M.empty = new M(x.empty, 0, 0);
function lf(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(lf(o.content, e - i - 1, t - i - 1)));
}
function af(n, e, t, r) {
  let { index: i, offset: o } = n.findIndex(e), s = n.maybeChild(i);
  if (o == e || s.isText)
    return n.cut(0, e).append(t).append(n.cut(e));
  let l = af(s.content, e - o - 1, t);
  return l && n.replaceChild(i, s.copy(l));
}
function vm(n, e, t) {
  if (t.openStart > n.depth)
    throw new wo("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new wo("Inconsistent open depths");
  return cf(n, e, t, 0);
}
function cf(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = cf(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return Nn(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = wm(t, n);
      return Nn(o, uf(n, s, l, e, r));
    }
  else return Nn(o, So(n, e, r));
}
function df(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new wo("Cannot join " + e.type.name + " onto " + n.type.name);
}
function bl(n, e, t) {
  let r = n.node(t);
  return df(r, e.node(t)), r;
}
function On(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function $r(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (On(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    On(i.child(l), r);
  e && e.depth == t && e.textOffset && On(e.nodeBefore, r);
}
function Nn(n, e) {
  return n.type.checkContent(e), n.copy(e);
}
function uf(n, e, t, r, i) {
  let o = n.depth > i && bl(n, e, i + 1), s = r.depth > i && bl(t, r, i + 1), l = [];
  return $r(null, n, i, l), o && s && e.index(i) == t.index(i) ? (df(o, s), On(Nn(o, uf(n, e, t, r, i + 1)), l)) : (o && On(Nn(o, So(n, e, i + 1)), l), $r(e, t, i, l), s && On(Nn(s, So(t, r, i + 1)), l)), $r(r, null, i, l), new x(l);
}
function So(n, e, t) {
  let r = [];
  if ($r(null, n, t, r), n.depth > t) {
    let i = bl(n, e, t + 1);
    On(Nn(i, So(n, e, t + 1)), r);
  }
  return $r(e, null, t, r), new x(r);
}
function wm(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(x.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class ii {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.path = t, this.parentOffset = r, this.depth = t.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(e) {
    return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(e) {
    return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(e) {
    return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let e = this.parent, t = this.index(this.depth);
    if (t == e.childCount)
      return null;
    let r = this.pos - this.path[this.path.length - 1], i = e.child(t);
    return r ? e.child(t).cut(r) : i;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
    return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let r = this.path[t * 3], i = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
    for (let o = 0; o < e; o++)
      i += r.child(o).nodeSize;
    return i;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let e = this.parent, t = this.index();
    if (e.content.size == 0)
      return G.none;
    if (this.textOffset)
      return e.child(t).marks;
    let r = e.maybeChild(t - 1), i = e.maybeChild(t);
    if (!r) {
      let l = r;
      r = i, i = l;
    }
    let o = r.marks;
    for (var s = 0; s < o.length; s++)
      o[s].type.spec.inclusive === !1 && (!i || !o[s].isInSet(i.marks)) && (o = o[s--].removeFromSet(o));
    return o;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross(e) {
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline)
      return null;
    let r = t.marks, i = e.parent.maybeChild(e.index());
    for (var o = 0; o < r.length; o++)
      r[o].type.spec.inclusive === !1 && (!i || !r[o].isInSet(i.marks)) && (r = r[o--].removeFromSet(r));
    return r;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e)
        return t;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(e = this, t) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let r = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); r >= 0; r--)
      if (e.pos <= this.end(r) && (!t || t(this.node(r))))
        return new xo(this, e, r);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 1; t <= this.depth; t++)
      e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError("Position " + t + " out of range");
    let r = [], i = 0, o = t;
    for (let s = e; ; ) {
      let { index: l, offset: a } = s.content.findIndex(o), c = o - a;
      if (r.push(s, l, i + a), !c || (s = s.child(l), s.isText))
        break;
      o = c - 1, i += a + 1;
    }
    return new ii(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = gc.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      gc.set(e, r = new Sm());
    let i = r.elts[r.i] = ii.resolve(e, t);
    return r.i = (r.i + 1) % xm, i;
  }
}
class Sm {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const xm = 12, gc = /* @__PURE__ */ new WeakMap();
class xo {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.depth = r;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const km = /* @__PURE__ */ Object.create(null);
let on = class vl {
  /**
  @internal
  */
  constructor(e, t, r, i = G.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || x.empty;
  }
  /**
  The array of this node's child nodes.
  */
  get children() {
    return this.content.content;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(e) {
    return this.content.child(e);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    this.content.forEach(e);
  }
  /**
  Invoke a callback for all descendant nodes recursively between
  the given two positions that are relative to start of this
  node's content. The callback is invoked with the node, its
  position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(e, t, r, i = 0) {
    this.content.nodesBetween(e, t, r, i, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec^leafText) will be used.
  */
  textBetween(e, t, r, i) {
    return this.content.textBetween(e, t, r, i);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(e) {
    return this == e || this.sameMarkup(e) && this.content.eq(e.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(e, t, r) {
    return this.type == e && vo(this.attrs, t || e.defaultAttrs || km) && G.sameSet(this.marks, r || G.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new vl(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new vl(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, t = this.content.size, r = !1) {
    if (e == t)
      return M.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), c = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new M(c, i.depth - s, o.depth - s);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, t, r) {
    return vm(this.resolve(e), this.resolve(t), r);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: r, offset: i } = t.content.findIndex(e);
      if (t = t.maybeChild(r), !t)
        return null;
      if (i == e || t.isText)
        return t;
      e -= i + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: t, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: r };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: t, offset: r } = this.content.findIndex(e);
    if (r < e)
      return { node: this.content.child(t), index: t, offset: r };
    let i = this.content.child(t - 1);
    return { node: i, index: t - 1, offset: r - i.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return ii.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return ii.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, t, r) {
    let i = !1;
    return t > e && this.nodesBetween(e, t, (o) => (r.isInSet(o.marks) && (i = !0), !i)), i;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), ff(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return t;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, t, r = x.empty, i = 0, o = r.childCount) {
    let s = this.contentMatchAt(e).matchFragment(r, i, o), l = s && s.matchFragment(this.content, t);
    if (!l || !l.validEnd)
      return !1;
    for (let a = i; a < o; a++)
      if (!this.type.allowsMarks(r.child(a).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, t, r, i) {
    if (i && !this.type.allowsMarks(i))
      return !1;
    let o = this.contentMatchAt(e).matchType(r), s = o && o.matchFragment(this.content, t);
    return s ? s.validEnd : !1;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(e) {
    return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise an exception when they do not.
  */
  check() {
    this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
    let e = G.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      r.type.checkAttrs(r.attrs), e = r.addToSet(e);
    }
    if (!G.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((t) => t.type.name)}`);
    this.content.forEach((t) => t.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((t) => t.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Node.fromJSON");
    let r;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = t.marks.map(e.markFromJSON);
    }
    if (t.type == "text") {
      if (typeof t.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(t.text, r);
    }
    let i = x.fromJSON(e, t.content), o = e.nodeType(t.type).create(t.attrs, i, r);
    return o.type.checkAttrs(o.attrs), o;
  }
};
on.prototype.text = void 0;
class ko extends on {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : ff(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new ko(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new ko(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function ff(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
class Pn {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, t) {
    let r = new Cm(e, t);
    if (r.next == null)
      return Pn.empty;
    let i = pf(r);
    r.next && r.err("Unexpected trailing text");
    let o = Dm(Nm(i));
    return _m(o, r), o;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e)
        return this.next[t].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, t = 0, r = e.childCount) {
    let i = this;
    for (let o = t; i && o < r; o++)
      i = i.matchType(e.child(o).type);
    return i;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs()))
        return t;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[t].type == e.next[r].type)
          return !0;
    return !1;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(e, t = !1, r = 0) {
    let i = [this];
    function o(s, l) {
      let a = s.matchFragment(e, r);
      if (a && (!t || a.validEnd))
        return x.from(l.map((c) => c.createAndFill()));
      for (let c = 0; c < s.next.length; c++) {
        let { type: d, next: u } = s.next[c];
        if (!(d.isText || d.hasRequiredAttrs()) && i.indexOf(u) == -1) {
          i.push(u);
          let f = o(u, l.concat(d));
          if (f)
            return f;
        }
      }
      return null;
    }
    return o(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(e) {
    for (let r = 0; r < this.wrapCache.length; r += 2)
      if (this.wrapCache[r] == e)
        return this.wrapCache[r + 1];
    let t = this.computeWrapping(e);
    return this.wrapCache.push(e, t), t;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let t = /* @__PURE__ */ Object.create(null), r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let i = r.shift(), o = i.match;
      if (o.matchType(e)) {
        let s = [];
        for (let l = i; l.type; l = l.via)
          s.push(l.type);
        return s.reverse();
      }
      for (let s = 0; s < o.next.length; s++) {
        let { type: l, next: a } = o.next[s];
        !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in t) && (!i.type || a.validEnd) && (r.push({ match: l.contentMatch, type: l, via: i }), t[l.name] = !0);
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    function t(r) {
      e.push(r);
      for (let i = 0; i < r.next.length; i++)
        e.indexOf(r.next[i].next) == -1 && t(r.next[i].next);
    }
    return t(this), e.map((r, i) => {
      let o = i + (r.validEnd ? "*" : " ") + " ";
      for (let s = 0; s < r.next.length; s++)
        o += (s ? ", " : "") + r.next[s].type.name + "->" + e.indexOf(r.next[s].next);
      return o;
    }).join(`
`);
  }
}
Pn.empty = new Pn(!0);
class Cm {
  constructor(e, t) {
    this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function pf(n) {
  let e = [];
  do
    e.push(Tm(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Tm(n) {
  let e = [];
  do
    e.push(Am(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Am(n) {
  let e = Om(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Mm(n, e);
    else
      break;
  return e;
}
function yc(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Mm(n, e) {
  let t = yc(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = yc(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Em(n, e) {
  let t = n.nodeTypes, r = t[e];
  if (r)
    return [r];
  let i = [];
  for (let o in t) {
    let s = t[o];
    s.isInGroup(e) && i.push(s);
  }
  return i.length == 0 && n.err("No node type or group '" + e + "' found"), i;
}
function Om(n) {
  if (n.eat("(")) {
    let e = pf(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Em(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Nm(n) {
  let e = [[]];
  return i(o(n, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function r(s, l, a) {
    let c = { term: a, to: l };
    return e[s].push(c), c;
  }
  function i(s, l) {
    s.forEach((a) => a.to = l);
  }
  function o(s, l) {
    if (s.type == "choice")
      return s.exprs.reduce((a, c) => a.concat(o(c, l)), []);
    if (s.type == "seq")
      for (let a = 0; ; a++) {
        let c = o(s.exprs[a], l);
        if (a == s.exprs.length - 1)
          return c;
        i(c, l = t());
      }
    else if (s.type == "star") {
      let a = t();
      return r(l, a), i(o(s.expr, a), a), [r(a)];
    } else if (s.type == "plus") {
      let a = t();
      return i(o(s.expr, l), a), i(o(s.expr, a), a), [r(a)];
    } else {
      if (s.type == "opt")
        return [r(l)].concat(o(s.expr, l));
      if (s.type == "range") {
        let a = l;
        for (let c = 0; c < s.min; c++) {
          let d = t();
          i(o(s.expr, a), d), a = d;
        }
        if (s.max == -1)
          i(o(s.expr, a), a);
        else
          for (let c = s.min; c < s.max; c++) {
            let d = t();
            r(a, d), i(o(s.expr, a), d), a = d;
          }
        return [r(a)];
      } else {
        if (s.type == "name")
          return [r(l, void 0, s.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function hf(n, e) {
  return e - n;
}
function bc(n, e) {
  let t = [];
  return r(e), t.sort(hf);
  function r(i) {
    let o = n[i];
    if (o.length == 1 && !o[0].term)
      return r(o[0].to);
    t.push(i);
    for (let s = 0; s < o.length; s++) {
      let { term: l, to: a } = o[s];
      !l && t.indexOf(a) == -1 && r(a);
    }
  }
}
function Dm(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(bc(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let d = 0; d < i.length; d++)
          i[d][0] == l && (c = i[d][1]);
        bc(n, a).forEach((d) => {
          c || i.push([l, c = []]), c.indexOf(d) == -1 && c.push(d);
        });
      });
    });
    let o = e[r.join(",")] = new Pn(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(hf);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function _m(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      s.push(a.name), o && !(a.isText || a.hasRequiredAttrs()) && (o = !1), r.indexOf(c) == -1 && r.push(c);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function mf(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function gf(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r in n) {
    let i = e && e[r];
    if (i === void 0) {
      let o = n[r];
      if (o.hasDefault)
        i = o.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    }
    t[r] = i;
  }
  return t;
}
function yf(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${i}`);
  for (let i in n) {
    let o = n[i];
    o.validate && o.validate(e[i]);
  }
}
function bf(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new Im(n, r, e[r]);
  return t;
}
let vc = class vf {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = bf(e, r.attrs), this.defaultAttrs = mf(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == Pn.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  Return true when this node type is part of the given
  [group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).
  */
  isInGroup(e) {
    return this.groups.indexOf(e) > -1;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let e in this.attrs)
      if (this.attrs[e].isRequired)
        return !0;
    return !1;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : gf(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, t, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new on(this, this.computeAttrs(e), x.from(t), G.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = x.from(t), this.checkContent(t), new on(this, this.computeAttrs(e), t, G.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, t, r) {
    if (e = this.computeAttrs(e), t = x.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(x.empty, !0);
    return o ? new on(this, e, t.append(o), G.setFrom(r)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type.
  */
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd)
      return !1;
    for (let r = 0; r < e.childCount; r++)
      if (!this.allowsMarks(e.child(r).marks))
        return !1;
    return !0;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
  }
  /**
  @internal
  */
  checkAttrs(e) {
    yf(this.attrs, e, "node", this.name);
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(e) {
    if (this.markSet == null)
      return !0;
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let t;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type) ? t && t.push(e[r]) : t || (t = e.slice(0, r));
    return t ? t.length ? t : G.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new vf(o, t, s));
    let i = t.spec.topNode || "doc";
    if (!r[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let o in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
};
function Rm(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class Im {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Rm(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class cs {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = bf(e, i.attrs), this.excluded = null;
    let o = mf(this.attrs);
    this.instance = o ? new G(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new G(this, gf(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new cs(o, i++, t, s)), r;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t].type == this)
        return e[t];
  }
  /**
  @internal
  */
  checkAttrs(e) {
    yf(this.attrs, e, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class wf {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = xe.from(e.nodes), t.marks = xe.from(e.marks || {}), this.nodes = vc.compile(this.spec.nodes, this), this.marks = cs.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = Pn.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? wc(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : wc(this, s.split(" "));
    }
    this.nodeFromJSON = this.nodeFromJSON.bind(this), this.markFromJSON = this.markFromJSON.bind(this), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, t = null, r, i) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof vc) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else throw new RangeError("Invalid node type: " + e);
    return e.createChecked(t, r, i);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, t) {
    let r = this.nodes.text;
    return new ko(r, r.defaultAttrs, e, G.setFrom(t));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, t) {
    return typeof e == "string" && (e = this.marks[e]), e.create(t);
  }
  /**
  Deserialize a node from its JSON representation. This method is
  bound.
  */
  nodeFromJSON(e) {
    return on.fromJSON(this, e);
  }
  /**
  Deserialize a mark from its JSON representation. This method is
  bound.
  */
  markFromJSON(e) {
    return G.fromJSON(this, e);
  }
  /**
  @internal
  */
  nodeType(e) {
    let t = this.nodes[e];
    if (!t)
      throw new RangeError("Unknown node type: " + e);
    return t;
  }
}
function wc(n, e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r], o = n.marks[i], s = o;
    if (o)
      t.push(o);
    else
      for (let l in n.marks) {
        let a = n.marks[l];
        (i == "_" || a.spec.group && a.spec.group.split(" ").indexOf(i) > -1) && t.push(s = a);
      }
    if (!s)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return t;
}
function Pm(n) {
  return n.tag != null;
}
function Lm(n) {
  return n.style != null;
}
class sn {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (Pm(i))
        this.tags.push(i);
      else if (Lm(i)) {
        let o = /[^=]*/.exec(i.style)[0];
        r.indexOf(o) < 0 && r.push(o), this.styles.push(i);
      }
    }), this.normalizeLists = !this.tags.some((i) => {
      if (!/^(ul|ol)\b/.test(i.tag) || !i.node)
        return !1;
      let o = e.nodes[i.node];
      return o.contentMatch.matchType(o);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, t = {}) {
    let r = new xc(this, t, !1);
    return r.addAll(e, G.none, t.from, t.to), r.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, t = {}) {
    let r = new xc(this, t, !0);
    return r.addAll(e, G.none, t.from, t.to), M.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Fm(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
        if (o.getAttrs) {
          let s = o.getAttrs(e);
          if (s === !1)
            continue;
          o.attrs = s || void 0;
        }
        return o;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, t, r, i) {
    for (let o = i ? this.styles.indexOf(i) + 1 : 0; o < this.styles.length; o++) {
      let s = this.styles[o], l = s.style;
      if (!(l.indexOf(e) != 0 || s.context && !r.matchesContext(s.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      l.length > e.length && (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != t))) {
        if (s.getAttrs) {
          let a = s.getAttrs(t);
          if (a === !1)
            continue;
          s.attrs = a || void 0;
        }
        return s;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let t = [];
    function r(i) {
      let o = i.priority == null ? 50 : i.priority, s = 0;
      for (; s < t.length; s++) {
        let l = t[s];
        if ((l.priority == null ? 50 : l.priority) < o)
          break;
      }
      t.splice(s, 0, i);
    }
    for (let i in e.marks) {
      let o = e.marks[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = kc(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = kc(s)), s.node || s.ignore || s.mark || (s.node = i);
      });
    }
    return t;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.ParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new sn(e, sn.schemaRules(e)));
  }
}
const Sf = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, Bm = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, xf = { ol: !0, ul: !0 }, oi = 1, wl = 2, lo = 4;
function Sc(n, e, t) {
  return e != null ? (e ? oi : 0) | (e === "full" ? wl : 0) : n && n.whitespace == "pre" ? oi | wl : t & -5;
}
class $i {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = G.none, this.match = o || (s & lo ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(x.from(e));
      if (t)
        this.match = this.type.contentMatch.matchFragment(t);
      else {
        let r = this.type.contentMatch, i;
        return (i = r.findWrapping(e.type)) ? (this.match = r, i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & oi)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = x.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(x.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Sf.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class xc {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = Sc(null, t.preserveWhitespace, 0) | (r ? lo : 0);
    i ? o = new $i(i.type, i.attrs, G.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new $i(null, null, G.none, !0, null, s) : o = new $i(e.schema.topNodeType, null, G.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e, t) {
    e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
  }
  addTextNode(e, t) {
    let r = e.nodeValue, i = this.top, o = i.options & wl ? "full" : this.localPreserveWS || (i.options & oi) > 0;
    if (o === "full" || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(r)) {
      if (o)
        o !== "full" ? r = r.replace(/\r?\n|\r/g, " ") : r = r.replace(/\r\n?/g, `
`);
      else if (r = r.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(r) && this.open == this.nodes.length - 1) {
        let s = i.content[i.content.length - 1], l = e.previousSibling;
        (!s || l && l.nodeName == "BR" || s.isText && /[ \t\r\n\u000c]$/.test(s.text)) && (r = r.slice(1));
      }
      r && this.insertNode(this.parser.schema.text(r), t), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, t, r) {
    let i = this.localPreserveWS, o = this.top;
    (e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
    let s = e.nodeName.toLowerCase(), l;
    xf.hasOwnProperty(s) && this.parser.normalizeLists && zm(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : Bm.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
      let c, d = this.needsBlock;
      if (Sf.hasOwnProperty(s))
        o.content.length && o.content[0].isInline && this.open && (this.open--, o = this.top), c = !0, o.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        break e;
      }
      let u = a && a.skip ? t : this.readStyles(e, t);
      u && this.addAll(e, u), c && this.sync(o), this.needsBlock = d;
    } else {
      let c = this.readStyles(e, t);
      c && this.addElementByRule(e, a, c, a.consuming === !1 ? l : void 0);
    }
    this.localPreserveWS = i;
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e, t) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), t);
  }
  // Called for ignored nodes
  ignoreFallback(e, t) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), t);
  }
  // Run any style parser associated with the node's styles. Either
  // return an updated array of marks, or null to indicate some of the
  // styles had a rule with `ignore` set.
  readStyles(e, t) {
    let r = e.style;
    if (r && r.length)
      for (let i = 0; i < this.parser.matchedStyles.length; i++) {
        let o = this.parser.matchedStyles[i], s = r.getPropertyValue(o);
        if (s)
          for (let l = void 0; ; ) {
            let a = this.parser.matchStyle(o, s, this, l);
            if (!a)
              break;
            if (a.ignore)
              return null;
            if (a.clearMark ? t = t.filter((c) => !a.clearMark(c)) : t = t.concat(this.parser.schema.marks[a.mark].create(a.attrs)), a.consuming === !1)
              l = a;
            else
              break;
          }
      }
    return t;
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, t, r, i) {
    let o, s;
    if (t.node)
      if (s = this.parser.schema.nodes[t.node], s.isLeaf)
        this.insertNode(s.create(t.attrs), r) || this.leafFallback(e, r);
      else {
        let a = this.enter(s, t.attrs || null, r, t.preserveWhitespace);
        a && (o = !0, r = a);
      }
    else {
      let a = this.parser.schema.marks[t.mark];
      r = r.concat(a.create(t.attrs));
    }
    let l = this.top;
    if (s && s.isLeaf)
      this.findInside(e);
    else if (i)
      this.addElement(e, r, i);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((a) => this.insertNode(a, r));
    else {
      let a = e;
      typeof t.contentElement == "string" ? a = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? a = t.contentElement(e) : t.contentElement && (a = t.contentElement), this.findAround(e, a, !0), this.addAll(a, r), this.findAround(e, a, !1);
    }
    o && this.sync(l) && this.open--;
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, t, r, i) {
    let o = r || 0;
    for (let s = r ? e.childNodes[r] : e.firstChild, l = i == null ? null : e.childNodes[i]; s != l; s = s.nextSibling, ++o)
      this.findAtPoint(e, o), this.addDOM(s, t);
    this.findAtPoint(e, o);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e, t) {
    let r, i;
    for (let o = this.open; o >= 0; o--) {
      let s = this.nodes[o], l = s.findWrapping(e);
      if (l && (!r || r.length > l.length) && (r = l, i = s, !l.length) || s.solid)
        break;
    }
    if (!r)
      return null;
    this.sync(i);
    for (let o = 0; o < r.length; o++)
      t = this.enterInner(r[o], null, t, !1);
    return t;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e, t) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let i = this.textblockFromContext();
      i && (t = this.enterInner(i, null, t));
    }
    let r = this.findPlace(e, t);
    if (r) {
      this.closeExtra();
      let i = this.top;
      i.match && (i.match = i.match.matchType(e.type));
      let o = G.none;
      for (let s of r.concat(e.marks))
        (i.type ? i.type.allowsMarkType(s.type) : Cc(s.type, e.type)) && (o = s.addToSet(o));
      return i.content.push(e.mark(o)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, t, r, i) {
    let o = this.findPlace(e.create(t), r);
    return o && (o = this.enterInner(e, t, r, !0, i)), o;
  }
  // Open a node of the given type
  enterInner(e, t, r, i = !1, o) {
    this.closeExtra();
    let s = this.top;
    s.match = s.match && s.match.matchType(e);
    let l = Sc(e, o, s.options);
    s.options & lo && s.content.length == 0 && (l |= lo);
    let a = G.none;
    return r = r.filter((c) => (s.type ? s.type.allowsMarkType(c.type) : Cc(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new $i(e, t, a, i, null, l)), this.open++, r;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--) {
      if (this.nodes[t] == e)
        return this.open = t, !0;
      this.localPreserveWS && (this.nodes[t].options |= oi);
    }
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let r = this.nodes[t].content;
      for (let i = r.length - 1; i >= 0; i--)
        e += r[i].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == t && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, r) {
    if (e != t && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && t.compareDocumentPosition(this.find[i].node) & (r ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split("/"), r = this.options.context, i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), o = -(r ? r.depth + 1 : 0) + (i ? 0 : 1), s = (l, a) => {
      for (; l >= 0; l--) {
        let c = t[l];
        if (c == "") {
          if (l == t.length - 1 || l == 0)
            continue;
          for (; a >= o; a--)
            if (s(l - 1, a))
              return !0;
          return !1;
        } else {
          let d = a > 0 || a == 0 && i ? this.nodes[a].type : r && a >= o ? r.node(a - o).type : null;
          if (!d || d.name != c && !d.isInGroup(c))
            return !1;
          a--;
        }
      }
      return !0;
    };
    return s(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let r = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let t in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[t];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
}
function zm(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && xf.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Fm(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function kc(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function Cc(n, e) {
  let t = e.schema.nodes;
  for (let r in t) {
    let i = t[r];
    if (!i.allowsMarkType(n))
      continue;
    let o = [], s = (l) => {
      o.push(l);
      for (let a = 0; a < l.edgeCount; a++) {
        let { type: c, next: d } = l.edge(a);
        if (c == e || o.indexOf(d) < 0 && s(d))
          return !0;
      }
    };
    if (s(i.contentMatch))
      return !0;
  }
}
class Wn {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(e, t) {
    this.nodes = e, this.marks = t;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(e, t = {}, r) {
    r || (r = Ps(t).createDocumentFragment());
    let i = r, o = [];
    return e.forEach((s) => {
      if (o.length || s.marks.length) {
        let l = 0, a = 0;
        for (; l < o.length && a < s.marks.length; ) {
          let c = s.marks[a];
          if (!this.marks[c.type.name]) {
            a++;
            continue;
          }
          if (!c.eq(o[l][0]) || c.type.spec.spanning === !1)
            break;
          l++, a++;
        }
        for (; l < o.length; )
          i = o.pop()[1];
        for (; a < s.marks.length; ) {
          let c = s.marks[a++], d = this.serializeMark(c, s.isInline, t);
          d && (o.push([c, i]), i.appendChild(d.dom), i = d.contentDOM || d.dom);
        }
      }
      i.appendChild(this.serializeNodeInner(s, t));
    }), r;
  }
  /**
  @internal
  */
  serializeNodeInner(e, t) {
    let { dom: r, contentDOM: i } = ao(Ps(t), this.nodes[e.type.name](e), null, e.attrs);
    if (i) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, t, i);
    }
    return r;
  }
  /**
  Serialize this node to a DOM node. This can be useful when you
  need to serialize a part of a document, as opposed to the whole
  document. To serialize a whole document, use
  [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
  its [content](https://prosemirror.net/docs/ref/#model.Node.content).
  */
  serializeNode(e, t = {}) {
    let r = this.serializeNodeInner(e, t);
    for (let i = e.marks.length - 1; i >= 0; i--) {
      let o = this.serializeMark(e.marks[i], e.isInline, t);
      o && ((o.contentDOM || o.dom).appendChild(r), r = o.dom);
    }
    return r;
  }
  /**
  @internal
  */
  serializeMark(e, t, r = {}) {
    let i = this.marks[e.type.name];
    return i && ao(Ps(r), i(e, t), null, e.attrs);
  }
  static renderSpec(e, t, r = null, i) {
    return ao(e, t, r, i);
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new Wn(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let t = Tc(e.nodes);
    return t.text || (t.text = (r) => r.text), t;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return Tc(e.marks);
  }
}
function Tc(n) {
  let e = {};
  for (let t in n) {
    let r = n[t].spec.toDOM;
    r && (e[t] = r);
  }
  return e;
}
function Ps(n) {
  return n.document || window.document;
}
const Ac = /* @__PURE__ */ new WeakMap();
function Hm(n) {
  let e = Ac.get(n);
  return e === void 0 && Ac.set(n, e = Vm(n)), e;
}
function Vm(n) {
  let e = null;
  function t(r) {
    if (r && typeof r == "object")
      if (Array.isArray(r))
        if (typeof r[0] == "string")
          e || (e = []), e.push(r);
        else
          for (let i = 0; i < r.length; i++)
            t(r[i]);
      else
        for (let i in r)
          t(r[i]);
  }
  return t(n), e;
}
function ao(n, e, t, r) {
  if (typeof e == "string")
    return { dom: n.createTextNode(e) };
  if (e.nodeType != null)
    return { dom: e };
  if (e.dom && e.dom.nodeType != null)
    return e;
  let i = e[0], o;
  if (typeof i != "string")
    throw new RangeError("Invalid array passed to renderSpec");
  if (r && (o = Hm(r)) && o.indexOf(e) > -1)
    throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
  let s = i.indexOf(" ");
  s > 0 && (t = i.slice(0, s), i = i.slice(s + 1));
  let l, a = t ? n.createElementNS(t, i) : n.createElement(i), c = e[1], d = 1;
  if (c && typeof c == "object" && c.nodeType == null && !Array.isArray(c)) {
    d = 2;
    for (let u in c)
      if (c[u] != null) {
        let f = u.indexOf(" ");
        f > 0 ? a.setAttributeNS(u.slice(0, f), u.slice(f + 1), c[u]) : a.setAttribute(u, c[u]);
      }
  }
  for (let u = d; u < e.length; u++) {
    let f = e[u];
    if (f === 0) {
      if (u < e.length - 1 || u > d)
        throw new RangeError("Content hole must be the only child of its parent node");
      return { dom: a, contentDOM: a };
    } else {
      let { dom: p, contentDOM: h } = ao(n, f, t, r);
      if (a.appendChild(p), h) {
        if (l)
          throw new RangeError("Multiple content holes");
        l = h;
      }
    }
  }
  return { dom: a, contentDOM: l };
}
const kf = 65535, Cf = Math.pow(2, 16);
function $m(n, e) {
  return n + e * Cf;
}
function Mc(n) {
  return n & kf;
}
function jm(n) {
  return (n - (n & kf)) / Cf;
}
const Tf = 1, Af = 2, co = 4, Mf = 8;
class Sl {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.delInfo = t, this.recover = r;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & Mf) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Tf | co)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Af | co)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & co) > 0;
  }
}
class He {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && He.empty)
      return He.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = Mc(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + jm(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0, o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? i : 0);
      if (a > e)
        break;
      let c = this.ranges[l + o], d = this.ranges[l + s], u = a + c;
      if (e <= u) {
        let f = c ? e == a ? -1 : e == u ? 1 : t : t, p = a + i + (f < 0 ? 0 : d);
        if (r)
          return p;
        let h = e == (t < 0 ? a : u) ? null : $m(l / 3, e - a), m = e == a ? Af : e == u ? Tf : co;
        return (t < 0 ? e != a : e != u) && (m |= Mf), new Sl(p, m, h);
      }
      i += d - c;
    }
    return r ? e + i : new Sl(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = Mc(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? r : 0);
      if (a > e)
        break;
      let c = this.ranges[l + o], d = a + c;
      if (e <= d && l == i * 3)
        return !0;
      r += this.ranges[l + s] - c;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let t = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let i = 0, o = 0; i < this.ranges.length; i += 3) {
      let s = this.ranges[i], l = s - (this.inverted ? o : 0), a = s + (this.inverted ? 0 : o), c = this.ranges[i + t], d = this.ranges[i + r];
      e(l, l + c, a, a + d), o += d - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new He(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(e) {
    return e == 0 ? He.empty : new He(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
He.empty = new He([]);
class cr {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e = [], t, r = 0, i = e.length) {
    this.maps = e, this.mirror = t, this.from = r, this.to = i;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(e = 0, t = this.maps.length) {
    return new cr(this.maps, this.mirror, e, t);
  }
  /**
  @internal
  */
  copy() {
    return new cr(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, t) {
    this.to = this.maps.push(e), t != null && this.setMirror(this.maps.length - 1, t);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let t = 0, r = this.maps.length; t < e.maps.length; t++) {
      let i = e.getMirror(t);
      this.appendMap(e.maps[t], i != null && i < t ? r + i : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let t = 0; t < this.mirror.length; t++)
        if (this.mirror[t] == e)
          return this.mirror[t + (t % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, t) {
    this.mirror || (this.mirror = []), this.mirror.push(e, t);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let t = e.maps.length - 1, r = this.maps.length + e.maps.length; t >= 0; t--) {
      let i = e.getMirror(t);
      this.appendMap(e.maps[t].invert(), i != null && i > t ? r - i - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new cr();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, t = 1) {
    if (this.mirror)
      return this._map(e, t, !0);
    for (let r = this.from; r < this.to; r++)
      e = this.maps[r].map(e, t);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0;
    for (let o = this.from; o < this.to; o++) {
      let s = this.maps[o], l = s.mapResult(e, t);
      if (l.recover != null) {
        let a = this.getMirror(o);
        if (a != null && a > o && a < this.to) {
          o = a, e = this.maps[a].recover(l.recover);
          continue;
        }
      }
      i |= l.delInfo, e = l.pos;
    }
    return r ? e : new Sl(e, i, null);
  }
}
const Ls = /* @__PURE__ */ Object.create(null);
class Oe {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return He.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(e) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = Ls[t.stepType];
    if (!r)
      throw new RangeError(`No step type ${t.stepType} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, t) {
    if (e in Ls)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return Ls[e] = t, t.prototype.jsonID = e, t;
  }
}
class pe {
  /**
  @internal
  */
  constructor(e, t) {
    this.doc = e, this.failed = t;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new pe(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new pe(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return pe.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof wo)
        return pe.fail(o.message);
      throw o;
    }
  }
}
function ma(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(ma(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return x.fromArray(r);
}
class tn extends Oe {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new M(ma(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return pe.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new ht(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new tn(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof tn && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new tn(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new tn(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Oe.jsonID("addMark", tn);
class ht extends Oe {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new M(ma(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return pe.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new tn(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new ht(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof ht && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new ht(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new ht(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Oe.jsonID("removeMark", ht);
class nn extends Oe {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return pe.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return pe.fromReplace(e, this.pos, this.pos + 1, new M(x.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new nn(this.pos, t.marks[i]);
        return new nn(this.pos, this.mark);
      }
    }
    return new pr(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new nn(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new nn(t.pos, e.markFromJSON(t.mark));
  }
}
Oe.jsonID("addNodeMark", nn);
class pr extends Oe {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return pe.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return pe.fromReplace(e, this.pos, this.pos + 1, new M(x.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new nn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new pr(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new pr(t.pos, e.markFromJSON(t.mark));
  }
}
Oe.jsonID("removeNodeMark", pr);
class me extends Oe {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, t, r, i = !1) {
    super(), this.from = e, this.to = t, this.slice = r, this.structure = i;
  }
  apply(e) {
    return this.structure && xl(e, this.from, this.to) ? pe.fail("Structure replace would overwrite content") : pe.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new He([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new me(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deletedAcross && r.deletedAcross ? null : new me(t.pos, Math.max(t.pos, r.pos), this.slice);
  }
  merge(e) {
    if (!(e instanceof me) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? M.empty : new M(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new me(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? M.empty : new M(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new me(e.from, this.to, t, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new me(t.from, t.to, M.fromJSON(e, t.slice), !!t.structure);
  }
}
Oe.jsonID("replace", me);
class ge extends Oe {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, t, r, i, o, s, l = !1) {
    super(), this.from = e, this.to = t, this.gapFrom = r, this.gapTo = i, this.slice = o, this.insert = s, this.structure = l;
  }
  apply(e) {
    if (this.structure && (xl(e, this.from, this.gapFrom) || xl(e, this.gapTo, this.to)))
      return pe.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return pe.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? pe.fromReplace(e, this.from, this.to, r) : pe.fail("Content does not fit in gap");
  }
  getMap() {
    return new He([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new ge(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new ge(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new ge(t.from, t.to, t.gapFrom, t.gapTo, M.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
Oe.jsonID("replaceAround", ge);
function xl(n, e, t) {
  let r = n.resolve(e), i = t - e, o = r.depth;
  for (; i > 0 && o > 0 && r.indexAfter(o) == r.node(o).childCount; )
    o--, i--;
  if (i > 0) {
    let s = r.node(o).maybeChild(r.indexAfter(o));
    for (; i > 0; ) {
      if (!s || s.isLeaf)
        return !0;
      s = s.firstChild, i--;
    }
  }
  return !1;
}
function Wm(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (a, c, d) => {
    if (!a.isInline)
      return;
    let u = a.marks;
    if (!r.isInSet(u) && d.type.allowsMarkType(r.type)) {
      let f = Math.max(c, e), p = Math.min(c + a.nodeSize, t), h = r.addToSet(u);
      for (let m = 0; m < u.length; m++)
        u[m].isInSet(h) || (s && s.to == f && s.mark.eq(u[m]) ? s.to = p : i.push(s = new ht(f, p, u[m])));
      l && l.to == f ? l.to = p : o.push(l = new tn(f, p, r));
    }
  }), i.forEach((a) => n.step(a)), o.forEach((a) => n.step(a));
}
function Um(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let a = null;
    if (r instanceof cs) {
      let c = s.marks, d;
      for (; d = r.isInSet(c); )
        (a || (a = [])).push(d), c = d.removeFromSet(c);
    } else r ? r.isInSet(s.marks) && (a = [r]) : a = s.marks;
    if (a && a.length) {
      let c = Math.min(l + s.nodeSize, t);
      for (let d = 0; d < a.length; d++) {
        let u = a[d], f;
        for (let p = 0; p < i.length; p++) {
          let h = i[p];
          h.step == o - 1 && u.eq(i[p].style) && (f = h);
        }
        f ? (f.to = c, f.step = o) : i.push({ style: u, from: Math.max(l, e), to: c, step: o });
      }
    }
  }), i.forEach((s) => n.step(new ht(s.from, s.to, s.style)));
}
function ga(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let a = 0; a < o.childCount; a++) {
    let c = o.child(a), d = l + c.nodeSize, u = r.matchType(c.type);
    if (!u)
      s.push(new me(l, d, M.empty));
    else {
      r = u;
      for (let f = 0; f < c.marks.length; f++)
        t.allowsMarkType(c.marks[f].type) || n.step(new ht(l, d, c.marks[f]));
      if (i && c.isText && t.whitespace != "pre") {
        let f, p = /\r?\n|\r/g, h;
        for (; f = p.exec(c.text); )
          h || (h = new M(x.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), s.push(new me(l + f.index, l + f.index + f[0].length, h));
      }
    }
    l = d;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(x.empty, !0);
    n.replace(l, l, new M(a, 0, 0));
  }
  for (let a = s.length - 1; a >= 0; a--)
    n.step(s[a]);
}
function Km(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Tr(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth; ; --r) {
    let i = n.$from.node(r), o = n.$from.index(r), s = n.$to.indexAfter(r);
    if (r < n.depth && i.canReplace(o, s, t))
      return r;
    if (r == 0 || i.type.spec.isolating || !Km(i, o, s))
      break;
  }
  return null;
}
function qm(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), a = s, c = l, d = x.empty, u = 0;
  for (let h = o, m = !1; h > t; h--)
    m || r.index(h) > 0 ? (m = !0, d = x.from(r.node(h).copy(d)), u++) : a--;
  let f = x.empty, p = 0;
  for (let h = o, m = !1; h > t; h--)
    m || i.after(h + 1) < i.end(h) ? (m = !0, f = x.from(i.node(h).copy(f)), p++) : c++;
  n.step(new ge(a, c, s, l, new M(d.append(f), u, p), d.size - u, !0));
}
function ya(n, e, t = null, r = n) {
  let i = Gm(n, e), o = i && Jm(r, e);
  return o ? i.map(Ec).concat({ type: e, attrs: t }).concat(o.map(Ec)) : null;
}
function Ec(n) {
  return { type: n, attrs: null };
}
function Gm(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function Jm(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let a = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : s;
}
function Ym(n, e, t) {
  let r = x.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = x.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new ge(i, o, i, o, new M(r, 0, 0), t.length, !0));
}
function Xm(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let a = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, a) && Zm(n.doc, n.mapping.slice(o).map(l), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let p = r.whitespace == "pre", h = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        p && !h ? c = !1 : !p && h && (c = !0);
      }
      c === !1 && Of(n, s, l, o), ga(n, n.mapping.slice(o).map(l, 1), r, void 0, c === null);
      let d = n.mapping.slice(o), u = d.map(l, 1), f = d.map(l + s.nodeSize, 1);
      return n.step(new ge(u, f, u + 1, f - 1, new M(x.from(r.create(a, null, s.marks)), 0, 0), 1, !0)), c === !0 && Ef(n, s, l, o), !1;
    }
  });
}
function Ef(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.isText) {
      let s, l = /\r?\n|\r/g;
      for (; s = l.exec(i.text); ) {
        let a = n.mapping.slice(r).map(t + 1 + o + s.index);
        n.replaceWith(a, a + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function Of(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function Zm(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function Qm(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new ge(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new M(x.from(s), 0, 0), 1, !0));
}
function zt(n, e, t = 1, r) {
  let i = n.resolve(e), o = i.depth - t, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, d = t - 2; c > o; c--, d--) {
    let u = i.node(c), f = i.index(c);
    if (u.type.spec.isolating)
      return !1;
    let p = u.content.cutByIndex(f, u.childCount), h = r && r[d + 1];
    h && (p = p.replaceChild(0, h.type.create(h.attrs)));
    let m = r && r[d] || u;
    if (!u.canReplace(f + 1, u.childCount) || !m.type.validContent(p))
      return !1;
  }
  let l = i.indexAfter(o), a = r && r[0];
  return i.node(o).canReplaceWith(l, l, a ? a.type : i.node(o + 1).type);
}
function eg(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = x.empty, s = x.empty;
  for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--, c--) {
    o = x.from(i.node(l).copy(o));
    let d = r && r[c];
    s = x.from(d ? d.type.create(d.attrs, s) : i.node(l).copy(s));
  }
  n.step(new me(e, e, new M(o.append(s), t, t), !0));
}
function fn(n, e) {
  let t = n.resolve(e), r = t.index();
  return Nf(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function tg(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function Nf(n, e) {
  return !!(n && e && !n.isLeaf && tg(n, e));
}
function ds(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && Nf(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function ng(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let d = s.whitespace == "pre", u = !!s.contentMatch.matchType(i);
    d && !u ? r = !1 : !d && u && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let d = n.doc.resolve(e + t);
    Of(n, d.node(), d.before(), l);
  }
  s.inlineContent && ga(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let a = n.mapping.slice(l), c = a.map(e - t);
  if (n.step(new me(c, a.map(e + t, -1), M.empty, !0)), r === !0) {
    let d = n.doc.resolve(c);
    Ef(n, d.node(), d.before(), n.steps.length);
  }
  return n;
}
function rg(n, e, t) {
  let r = n.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), t))
    return e;
  if (r.parentOffset == 0)
    for (let i = r.depth - 1; i >= 0; i--) {
      let o = r.index(i);
      if (r.node(i).canReplaceWith(o, o, t))
        return r.before(i + 1);
      if (o > 0)
        return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let i = r.depth - 1; i >= 0; i--) {
      let o = r.indexAfter(i);
      if (r.node(i).canReplaceWith(o, o, t))
        return r.after(i + 1);
      if (o < r.node(i).childCount)
        return null;
    }
  return null;
}
function Df(n, e, t) {
  let r = n.resolve(e);
  if (!t.content.size)
    return e;
  let i = t.content;
  for (let o = 0; o < t.openStart; o++)
    i = i.firstChild.content;
  for (let o = 1; o <= (t.openStart == 0 && t.size ? 2 : 1); o++)
    for (let s = r.depth; s >= 0; s--) {
      let l = s == r.depth ? 0 : r.pos <= (r.start(s + 1) + r.end(s + 1)) / 2 ? -1 : 1, a = r.index(s) + (l > 0 ? 1 : 0), c = r.node(s), d = !1;
      if (o == 1)
        d = c.canReplace(a, a, i);
      else {
        let u = c.contentMatchAt(a).findWrapping(i.firstChild.type);
        d = u && c.canReplaceWith(a, a, u[0]);
      }
      if (d)
        return l == 0 ? r.pos : l < 0 ? r.before(s + 1) : r.after(s + 1);
    }
  return null;
}
function us(n, e, t = e, r = M.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return _f(i, o, r) ? new me(e, t, r) : new ig(i, o, r).fit();
}
function _f(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class ig {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = x.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = x.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let o = this.placed, s = r.depth, l = i.depth;
    for (; s && l && o.childCount == 1; )
      o = o.firstChild.content, s--, l--;
    let a = new M(o, s, l);
    return e > -1 ? new ge(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new me(r.pos, i.pos, a) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let t = this.unplaced.content, r = 0, i = this.unplaced.openEnd; r < e; r++) {
      let o = t.firstChild;
      if (t.childCount > 1 && (i = 0), o.type.spec.isolating && i <= r) {
        e = r;
        break;
      }
      t = o.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let r = t == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let i, o = null;
        r ? (o = Bs(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], d, u = null;
          if (t == 1 && (s ? c.matchType(s.type) || (u = c.fillBefore(x.from(s), !1)) : o && a.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: u };
          if (t == 2 && s && (d = c.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: d };
          if (o && c.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Bs(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new M(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Bs(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new M(zr(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new M(zr(e, t, 1), t, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: r, inject: i, wrap: o }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (o)
      for (let m = 0; m < o.length; m++)
        this.openFrontierNode(o[m]);
    let s = this.unplaced, l = r ? r.content : s.content, a = s.openStart - e, c = 0, d = [], { match: u, type: f } = this.frontier[t];
    if (i) {
      for (let m = 0; m < i.childCount; m++)
        d.push(i.child(m));
      u = u.matchFragment(i);
    }
    let p = l.size + e - (s.content.size - s.openEnd);
    for (; c < l.childCount; ) {
      let m = l.child(c), g = u.matchType(m.type);
      if (!g)
        break;
      c++, (c > 1 || a == 0 || m.content.size) && (u = g, d.push(Rf(m.mark(f.allowedMarks(m.marks)), c == 1 ? a : 0, c == l.childCount ? p : -1)));
    }
    let h = c == l.childCount;
    h || (p = -1), this.placed = Fr(this.placed, t, x.from(d)), this.frontier[t].match = u, h && p < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, g = l; m < p; m++) {
      let y = g.lastChild;
      this.frontier.push({ type: y.type, match: y.contentMatchAt(y.childCount) }), g = y.content;
    }
    this.unplaced = h ? e == 0 ? M.empty : new M(zr(s.content, e - 1, 1), e - 1, p < 0 ? s.openEnd : e - 1) : new M(zr(s.content, e, c), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !zs(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = zs(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l], d = zs(e, l, c, a, !0);
          if (!d || d.childCount)
            continue e;
        }
        return { depth: t, fit: s, move: o ? e.doc.resolve(e.after(t + 1)) : e };
      }
    }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t)
      return null;
    for (; this.depth > t.depth; )
      this.closeFrontierNode();
    t.fit.childCount && (this.placed = Fr(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = Fr(this.placed, this.depth, x.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(x.empty, !0);
    t.childCount && (this.placed = Fr(this.placed, this.frontier.length, t));
  }
}
function zr(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(zr(n.firstChild.content, e - 1, t)));
}
function Fr(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Fr(n.lastChild.content, e - 1, t)));
}
function Bs(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Rf(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Rf(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(x.empty, !0)))), n.copy(r);
}
function zs(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !og(t, o.content, s) ? l : null;
}
function og(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function sg(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function lg(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (_f(i, o, r))
    return n.step(new me(e, t, r));
  let s = Pf(i, n.doc.resolve(t));
  s[s.length - 1] == 0 && s.pop();
  let l = -(i.depth + 1);
  s.unshift(l);
  for (let f = i.depth, p = i.pos - 1; f > 0; f--, p--) {
    let h = i.node(f).type.spec;
    if (h.defining || h.definingAsContext || h.isolating)
      break;
    s.indexOf(f) > -1 ? l = f : i.before(f) == p && s.splice(1, 0, -f);
  }
  let a = s.indexOf(l), c = [], d = r.openStart;
  for (let f = r.content, p = 0; ; p++) {
    let h = f.firstChild;
    if (c.push(h), p == r.openStart)
      break;
    f = h.content;
  }
  for (let f = d - 1; f >= 0; f--) {
    let p = c[f], h = sg(p.type);
    if (h && !p.sameMarkup(i.node(Math.abs(l) - 1)))
      d = f;
    else if (h || !p.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let p = (f + d + 1) % (r.openStart + 1), h = c[p];
    if (h)
      for (let m = 0; m < s.length; m++) {
        let g = s[(m + a) % s.length], y = !0;
        g < 0 && (y = !1, g = -g);
        let w = i.node(g - 1), A = i.index(g - 1);
        if (w.canReplaceWith(A, A, h.type, h.marks))
          return n.replace(i.before(g), y ? o.after(g) : t, new M(If(r.content, 0, r.openStart, p), p, r.openEnd));
      }
  }
  let u = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > u)); f--) {
    let p = s[f];
    p < 0 || (e = i.before(p), t = o.after(p));
  }
}
function If(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(If(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(x.empty, !0));
  }
  return n;
}
function ag(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = rg(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new M(x.from(r), 0, 0));
}
function cg(n, e, t) {
  let r = n.doc.resolve(e), i = n.doc.resolve(t), o = Pf(r, i);
  for (let s = 0; s < o.length; s++) {
    let l = o[s], a = s == o.length - 1;
    if (a && l == 0 || r.node(l).type.contentMatch.validEnd)
      return n.delete(r.start(l), i.end(l));
    if (l > 0 && (a || r.node(l - 1).canReplace(r.index(l - 1), i.indexAfter(l - 1))))
      return n.delete(r.before(l), i.after(l));
  }
  for (let s = 1; s <= r.depth && s <= i.depth; s++)
    if (e - r.start(s) == r.depth - s && t > r.end(s) && i.end(s) - t != i.depth - s && r.start(s - 1) == i.start(s - 1) && r.node(s - 1).canReplace(r.index(s - 1), i.index(s - 1)))
      return n.delete(r.before(s), t);
  n.delete(e, t);
}
function Pf(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class dr extends Oe {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return pe.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return pe.fromReplace(e, this.pos, this.pos + 1, new M(x.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return He.empty;
  }
  invert(e) {
    return new dr(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new dr(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new dr(t.pos, t.attr, t.value);
  }
}
Oe.jsonID("attr", dr);
class si extends Oe {
  /**
  Construct an attribute step.
  */
  constructor(e, t) {
    super(), this.attr = e, this.value = t;
  }
  apply(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e.attrs)
      t[i] = e.attrs[i];
    t[this.attr] = this.value;
    let r = e.type.create(t, e.content, e.marks);
    return pe.ok(r);
  }
  getMap() {
    return He.empty;
  }
  invert(e) {
    return new si(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new si(t.attr, t.value);
  }
}
Oe.jsonID("docAttr", si);
let hr = class extends Error {
};
hr = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
hr.prototype = Object.create(Error.prototype);
hr.prototype.constructor = hr;
hr.prototype.name = "TransformError";
class ba {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new cr();
  }
  /**
  The starting document.
  */
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  /**
  Apply a new step in this transform, saving the result. Throws an
  error when the step fails.
  */
  step(e) {
    let t = this.maybeStep(e);
    if (t.failed)
      throw new hr(t.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let t = e.apply(this.doc);
    return t.failed || this.addStep(e, t.doc), t;
  }
  /**
  True when the document has been changed (when there are any
  steps).
  */
  get docChanged() {
    return this.steps.length > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, t = e, r = M.empty) {
    let i = us(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new M(x.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, M.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, t) {
    return this.replaceWith(e, e, t);
  }
  /**
  Replace a range of the document with a given slice, using
  `from`, `to`, and the slice's
  [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
  than fixed start and end points. This method may grow the
  replaced area or close open nodes in the slice in order to get a
  fit that is more in line with WYSIWYG expectations, by dropping
  fully covered parent nodes of the replaced region when they are
  marked [non-defining as
  context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
  open parent node from the slice that _is_ marked as [defining
  its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
  
  This is the method, for example, to handle paste. The similar
  [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
  primitive tool which will _not_ move the start and end of its given
  range, and is useful in situations where you need more precise
  control over what happens.
  */
  replaceRange(e, t, r) {
    return lg(this, e, t, r), this;
  }
  /**
  Replace the given range with a node, but use `from` and `to` as
  hints, rather than precise positions. When from and to are the same
  and are at the start or end of a parent node in which the given
  node doesn't fit, this method may _move_ them out towards a parent
  that does allow the given node to be placed. When the given range
  completely covers a parent node, this method may completely replace
  that parent node.
  */
  replaceRangeWith(e, t, r) {
    return ag(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return cg(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return qm(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return ng(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return Ym(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return Xm(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return Qm(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new dr(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new si(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new nn(e, t)), this;
  }
  /**
  Remove a mark (or a mark of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    if (!(t instanceof G)) {
      let r = this.doc.nodeAt(e);
      if (!r)
        throw new RangeError("No node at position " + e);
      if (t = t.isInSet(r.marks), !t)
        return this;
    }
    return this.step(new pr(e, t)), this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split.
  */
  split(e, t = 1, r) {
    return eg(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return Wm(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return Um(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return ga(this, e, t, r), this;
  }
}
const Fs = /* @__PURE__ */ Object.create(null);
class B {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new Lf(e.min(t), e.max(t))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let e = this.ranges;
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(e, t = M.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: a, $to: c } = s[l], d = e.mapping.slice(o);
      e.replaceRange(d.map(a.pos), d.map(c.pos), l ? M.empty : t), l == 0 && Dc(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let r = e.steps.length, i = this.ranges;
    for (let o = 0; o < i.length; o++) {
      let { $from: s, $to: l } = i[o], a = e.mapping.slice(r), c = a.map(s.pos), d = a.map(l.pos);
      o ? e.deleteRange(c, d) : (e.replaceRangeWith(c, d, t), Dc(e, r, t.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, t, r = !1) {
    let i = e.parent.inlineContent ? new L(e) : nr(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? nr(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : nr(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
      if (s)
        return s;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new je(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return nr(e, e, 0, 0, 1) || new je(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return nr(e, e, e.content.size, e.childCount, -1) || new je(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = Fs[t.type];
    if (!r)
      throw new RangeError(`No selection type ${t.type} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, t) {
    if (e in Fs)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return Fs[e] = t, t.prototype.jsonID = e, t;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return L.between(this.$anchor, this.$head).getBookmark();
  }
}
B.prototype.visible = !0;
class Lf {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Oc = !1;
function Nc(n) {
  !Oc && !n.parent.inlineContent && (Oc = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class L extends B {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    Nc(e), Nc(t), super(e, t);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    if (!r.parent.inlineContent)
      return B.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new L(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = M.empty) {
    if (super.replace(e, t), t == M.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof L && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new fs(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new L(e.resolve(t.anchor), e.resolve(t.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, t, r = t) {
    let i = e.resolve(t);
    return new this(i, r == t ? i : e.resolve(r));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, t, r) {
    let i = e.pos - t.pos;
    if ((!r || i) && (r = i >= 0 ? 1 : -1), !t.parent.inlineContent) {
      let o = B.findFrom(t, r, !0) || B.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return B.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (B.findFrom(e, -r, !0) || B.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new L(e, t);
  }
}
B.jsonID("text", L);
class fs {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new fs(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return L.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class P extends B {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let t = e.nodeAfter, r = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, r), this.node = t;
  }
  map(e, t) {
    let { deleted: r, pos: i } = t.mapResult(this.anchor), o = e.resolve(i);
    return r ? B.near(o) : new P(o);
  }
  content() {
    return new M(x.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof P && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new va(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new P(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new P(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
P.prototype.visible = !1;
B.jsonID("node", P);
class va {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new fs(r, r) : new va(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && P.isSelectable(r) ? new P(t) : B.near(t);
  }
}
class je extends B {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = M.empty) {
    if (t == M.empty) {
      e.delete(0, e.doc.content.size);
      let r = B.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, t);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new je(e);
  }
  map(e) {
    return new je(e);
  }
  eq(e) {
    return e instanceof je;
  }
  getBookmark() {
    return dg;
  }
}
B.jsonID("all", je);
const dg = {
  map() {
    return this;
  },
  resolve(n) {
    return new je(n);
  }
};
function nr(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return L.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && P.isSelectable(l))
        return P.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = nr(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function Dc(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof me || i instanceof ge))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, a, c, d) => {
    s == null && (s = d);
  }), n.setSelection(B.near(n.doc.resolve(s), t));
}
const _c = 1, Rc = 2, Ic = 4;
class ug extends ba {
  /**
  @internal
  */
  constructor(e) {
    super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = /* @__PURE__ */ Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
  }
  /**
  The transaction's current selection. This defaults to the editor
  selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
  transaction, but can be overwritten with
  [`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).
  */
  get selection() {
    return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
  }
  /**
  Update the transaction's current selection. Will determine the
  selection that the editor gets when the transaction is applied.
  */
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | _c) & -3, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & _c) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= Rc, this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(e) {
    return G.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
  }
  /**
  Add a mark to the set of stored marks.
  */
  addStoredMark(e) {
    return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Remove a mark or mark type from the set of stored marks.
  */
  removeStoredMark(e) {
    return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Whether the stored marks were explicitly set for this transaction.
  */
  get storedMarksSet() {
    return (this.updated & Rc) > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    super.addStep(e, t), this.updated = this.updated & -3, this.storedMarks = null;
  }
  /**
  Update the timestamp for the transaction.
  */
  setTime(e) {
    return this.time = e, this;
  }
  /**
  Replace the current selection with the given slice.
  */
  replaceSelection(e) {
    return this.selection.replace(this, e), this;
  }
  /**
  Replace the selection with the given node. When `inheritMarks` is
  true and the content is inline, it inherits the marks from the
  place where it is inserted.
  */
  replaceSelectionWith(e, t = !0) {
    let r = this.selection;
    return t && (e = e.mark(this.storedMarks || (r.empty ? r.$from.marks() : r.$from.marksAcross(r.$to) || G.none))), r.replaceWith(this, e), this;
  }
  /**
  Delete the selection.
  */
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  /**
  Replace the given range, or the selection if no range is given,
  with a text node containing the given string.
  */
  insertText(e, t, r) {
    let i = this.doc.type.schema;
    if (t == null)
      return e ? this.replaceSelectionWith(i.text(e), !0) : this.deleteSelection();
    {
      if (r == null && (r = t), r = r ?? t, !e)
        return this.deleteRange(t, r);
      let o = this.storedMarks;
      if (!o) {
        let s = this.doc.resolve(t);
        o = r == t ? s.marks() : s.marksAcross(this.doc.resolve(r));
      }
      return this.replaceRangeWith(t, r, i.text(e, o)), this.selection.empty || this.setSelection(B.near(this.selection.$to)), this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(e, t) {
    return this.meta[typeof e == "string" ? e : e.key] = t, this;
  }
  /**
  Retrieve a metadata property for a given name or plugin.
  */
  getMeta(e) {
    return this.meta[typeof e == "string" ? e : e.key];
  }
  /**
  Returns true if this transaction doesn't contain any metadata,
  and can thus safely be extended.
  */
  get isGeneric() {
    for (let e in this.meta)
      return !1;
    return !0;
  }
  /**
  Indicate that the editor should scroll the selection into view
  when updated to the state produced by this transaction.
  */
  scrollIntoView() {
    return this.updated |= Ic, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & Ic) > 0;
  }
}
function Pc(n, e) {
  return !e || !n ? n : n.bind(e);
}
class Hr {
  constructor(e, t, r) {
    this.name = e, this.init = Pc(t.init, r), this.apply = Pc(t.apply, r);
  }
}
const fg = [
  new Hr("doc", {
    init(n) {
      return n.doc || n.schema.topNodeType.createAndFill();
    },
    apply(n) {
      return n.doc;
    }
  }),
  new Hr("selection", {
    init(n, e) {
      return n.selection || B.atStart(e.doc);
    },
    apply(n) {
      return n.selection;
    }
  }),
  new Hr("storedMarks", {
    init(n) {
      return n.storedMarks || null;
    },
    apply(n, e, t, r) {
      return r.selection.$cursor ? n.storedMarks : null;
    }
  }),
  new Hr("scrollToSelection", {
    init() {
      return 0;
    },
    apply(n, e) {
      return n.scrolledIntoView ? e + 1 : e;
    }
  })
];
class Hs {
  constructor(e, t) {
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = fg.slice(), t && t.forEach((r) => {
      if (this.pluginsByKey[r.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + r.key + ")");
      this.plugins.push(r), this.pluginsByKey[r.key] = r, r.spec.state && this.fields.push(new Hr(r.key, r.spec.state, r));
    });
  }
}
class sr {
  /**
  @internal
  */
  constructor(e) {
    this.config = e;
  }
  /**
  The schema of the state's document.
  */
  get schema() {
    return this.config.schema;
  }
  /**
  The plugins that are active in this state.
  */
  get plugins() {
    return this.config.plugins;
  }
  /**
  Apply the given transaction to produce a new state.
  */
  apply(e) {
    return this.applyTransaction(e).state;
  }
  /**
  @internal
  */
  filterTransaction(e, t = -1) {
    for (let r = 0; r < this.config.plugins.length; r++)
      if (r != t) {
        let i = this.config.plugins[r];
        if (i.spec.filterTransaction && !i.spec.filterTransaction.call(i, e, this))
          return !1;
      }
    return !0;
  }
  /**
  Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
  returns the precise transactions that were applied (which might
  be influenced by the [transaction
  hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
  plugins) along with the new state.
  */
  applyTransaction(e) {
    if (!this.filterTransaction(e))
      return { state: this, transactions: [] };
    let t = [e], r = this.applyInner(e), i = null;
    for (; ; ) {
      let o = !1;
      for (let s = 0; s < this.config.plugins.length; s++) {
        let l = this.config.plugins[s];
        if (l.spec.appendTransaction) {
          let a = i ? i[s].n : 0, c = i ? i[s].state : this, d = a < t.length && l.spec.appendTransaction.call(l, a ? t.slice(a) : t, c, r);
          if (d && r.filterTransaction(d, s)) {
            if (d.setMeta("appendedTransaction", e), !i) {
              i = [];
              for (let u = 0; u < this.config.plugins.length; u++)
                i.push(u < s ? { state: r, n: t.length } : { state: this, n: 0 });
            }
            t.push(d), r = r.applyInner(d), o = !0;
          }
          i && (i[s] = { state: r, n: t.length });
        }
      }
      if (!o)
        return { state: r, transactions: t };
    }
  }
  /**
  @internal
  */
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let t = new sr(this.config), r = this.config.fields;
    for (let i = 0; i < r.length; i++) {
      let o = r[i];
      t[o.name] = o.apply(e, this[o.name], this, t);
    }
    return t;
  }
  /**
  Start a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new ug(this);
  }
  /**
  Create a new state.
  */
  static create(e) {
    let t = new Hs(e.doc ? e.doc.type.schema : e.schema, e.plugins), r = new sr(t);
    for (let i = 0; i < t.fields.length; i++)
      r[t.fields[i].name] = t.fields[i].init(e, r);
    return r;
  }
  /**
  Create a new state based on this one, but with an adjusted set
  of active plugins. State fields that exist in both sets of
  plugins are kept unchanged. Those that no longer exist are
  dropped, and those that are new are initialized using their
  [`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
  configuration object..
  */
  reconfigure(e) {
    let t = new Hs(this.schema, e.plugins), r = t.fields, i = new sr(t);
    for (let o = 0; o < r.length; o++) {
      let s = r[o].name;
      i[s] = this.hasOwnProperty(s) ? this[s] : r[o].init(e, i);
    }
    return i;
  }
  /**
  Serialize this state to JSON. If you want to serialize the state
  of plugins, pass an object mapping property names to use in the
  resulting JSON object to plugin objects. The argument may also be
  a string or number, in which case it is ignored, to support the
  way `JSON.stringify` calls `toString` methods.
  */
  toJSON(e) {
    let t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (t.storedMarks = this.storedMarks.map((r) => r.toJSON())), e && typeof e == "object")
      for (let r in e) {
        if (r == "doc" || r == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let i = e[r], o = i.spec.state;
        o && o.toJSON && (t[r] = o.toJSON.call(i, this[i.key]));
      }
    return t;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(e, t, r) {
    if (!t)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let i = new Hs(e.schema, e.plugins), o = new sr(i);
    return i.fields.forEach((s) => {
      if (s.name == "doc")
        o.doc = on.fromJSON(e.schema, t.doc);
      else if (s.name == "selection")
        o.selection = B.fromJSON(o.doc, t.selection);
      else if (s.name == "storedMarks")
        t.storedMarks && (o.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
      else {
        if (r)
          for (let l in r) {
            let a = r[l], c = a.spec.state;
            if (a.key == s.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(t, l)) {
              o[s.name] = c.fromJSON.call(a, e, t[l], o);
              return;
            }
          }
        o[s.name] = s.init(e, o);
      }
    }), o;
  }
}
function Bf(n, e, t) {
  for (let r in n) {
    let i = n[r];
    i instanceof Function ? i = i.bind(e) : r == "handleDOMEvents" && (i = Bf(i, e, {})), t[r] = i;
  }
  return t;
}
class ne {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && Bf(e.props, this, this.props), this.key = e.key ? e.key.key : zf("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const Vs = /* @__PURE__ */ Object.create(null);
function zf(n) {
  return n in Vs ? n + "$" + ++Vs[n] : (Vs[n] = 0, n + "$");
}
class de {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = zf(e);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const ke = function(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}, li = function(n) {
  let e = n.assignedSlot || n.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let kl = null;
const Rt = function(n, e, t) {
  let r = kl || (kl = document.createRange());
  return r.setEnd(n, t ?? n.nodeValue.length), r.setStart(n, e || 0), r;
}, pg = function() {
  kl = null;
}, Ln = function(n, e, t, r) {
  return t && (Lc(n, e, t, r, -1) || Lc(n, e, t, r, 1));
}, hg = /^(img|br|input|textarea|hr)$/i;
function Lc(n, e, t, r, i) {
  for (; ; ) {
    if (n == t && e == r)
      return !0;
    if (e == (i < 0 ? 0 : Ye(n))) {
      let o = n.parentNode;
      if (!o || o.nodeType != 1 || Ci(n) || hg.test(n.nodeName) || n.contentEditable == "false")
        return !1;
      e = ke(n) + (i < 0 ? 0 : 1), n = o;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[e + (i < 0 ? -1 : 0)], n.contentEditable == "false")
        return !1;
      e = i < 0 ? Ye(n) : 0;
    } else
      return !1;
  }
}
function Ye(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function mg(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e)
      return n;
    if (n.nodeType == 1 && e > 0) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e - 1], e = Ye(n);
    } else if (n.parentNode && !Ci(n))
      e = ke(n), n = n.parentNode;
    else
      return null;
  }
}
function gg(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e < n.nodeValue.length)
      return n;
    if (n.nodeType == 1 && e < n.childNodes.length) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e], e = 0;
    } else if (n.parentNode && !Ci(n))
      e = ke(n) + 1, n = n.parentNode;
    else
      return null;
  }
}
function yg(n, e, t) {
  for (let r = e == 0, i = e == Ye(n); r || i; ) {
    if (n == t)
      return !0;
    let o = ke(n);
    if (n = n.parentNode, !n)
      return !1;
    r = r && o == 0, i = i && o == Ye(n);
  }
}
function Ci(n) {
  let e;
  for (let t = n; t && !(e = t.pmViewDesc); t = t.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == n || e.contentDOM == n);
}
const ps = function(n) {
  return n.focusNode && Ln(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset);
};
function xn(n, e) {
  let t = document.createEvent("Event");
  return t.initEvent("keydown", !0, !0), t.keyCode = n, t.key = t.code = e, t;
}
function bg(n) {
  let e = n.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function vg(n, e, t) {
  if (n.caretPositionFromPoint)
    try {
      let r = n.caretPositionFromPoint(e, t);
      if (r)
        return { node: r.offsetNode, offset: Math.min(Ye(r.offsetNode), r.offset) };
    } catch {
    }
  if (n.caretRangeFromPoint) {
    let r = n.caretRangeFromPoint(e, t);
    if (r)
      return { node: r.startContainer, offset: Math.min(Ye(r.startContainer), r.startOffset) };
  }
}
const gt = typeof navigator < "u" ? navigator : null, Bc = typeof document < "u" ? document : null, pn = gt && gt.userAgent || "", Cl = /Edge\/(\d+)/.exec(pn), Ff = /MSIE \d/.exec(pn), Tl = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(pn), Le = !!(Ff || Tl || Cl), ln = Ff ? document.documentMode : Tl ? +Tl[1] : Cl ? +Cl[1] : 0, it = !Le && /gecko\/(\d+)/i.test(pn);
it && +(/Firefox\/(\d+)/.exec(pn) || [0, 0])[1];
const Al = !Le && /Chrome\/(\d+)/.exec(pn), Me = !!Al, Hf = Al ? +Al[1] : 0, _e = !Le && !!gt && /Apple Computer/.test(gt.vendor), mr = _e && (/Mobile\/\w+/.test(pn) || !!gt && gt.maxTouchPoints > 2), Je = mr || (gt ? /Mac/.test(gt.platform) : !1), wg = gt ? /Win/.test(gt.platform) : !1, Lt = /Android \d/.test(pn), Ti = !!Bc && "webkitFontSmoothing" in Bc.documentElement.style, Sg = Ti ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function xg(n) {
  let e = n.defaultView && n.defaultView.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: n.documentElement.clientWidth,
    top: 0,
    bottom: n.documentElement.clientHeight
  };
}
function Et(n, e) {
  return typeof n == "number" ? n : n[e];
}
function kg(n) {
  let e = n.getBoundingClientRect(), t = e.width / n.offsetWidth || 1, r = e.height / n.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + n.clientWidth * t,
    top: e.top,
    bottom: e.top + n.clientHeight * r
  };
}
function zc(n, e, t) {
  let r = n.someProp("scrollThreshold") || 0, i = n.someProp("scrollMargin") || 5, o = n.dom.ownerDocument;
  for (let s = t || n.dom; s; s = li(s)) {
    if (s.nodeType != 1)
      continue;
    let l = s, a = l == o.body, c = a ? xg(o) : kg(l), d = 0, u = 0;
    if (e.top < c.top + Et(r, "top") ? u = -(c.top - e.top + Et(i, "top")) : e.bottom > c.bottom - Et(r, "bottom") && (u = e.bottom - e.top > c.bottom - c.top ? e.top + Et(i, "top") - c.top : e.bottom - c.bottom + Et(i, "bottom")), e.left < c.left + Et(r, "left") ? d = -(c.left - e.left + Et(i, "left")) : e.right > c.right - Et(r, "right") && (d = e.right - c.right + Et(i, "right")), d || u)
      if (a)
        o.defaultView.scrollBy(d, u);
      else {
        let f = l.scrollLeft, p = l.scrollTop;
        u && (l.scrollTop += u), d && (l.scrollLeft += d);
        let h = l.scrollLeft - f, m = l.scrollTop - p;
        e = { left: e.left - h, top: e.top - m, right: e.right - h, bottom: e.bottom - m };
      }
    if (a || /^(fixed|sticky)$/.test(getComputedStyle(s).position))
      break;
  }
}
function Cg(n) {
  let e = n.dom.getBoundingClientRect(), t = Math.max(0, e.top), r, i;
  for (let o = (e.left + e.right) / 2, s = t + 1; s < Math.min(innerHeight, e.bottom); s += 5) {
    let l = n.root.elementFromPoint(o, s);
    if (!l || l == n.dom || !n.dom.contains(l))
      continue;
    let a = l.getBoundingClientRect();
    if (a.top >= t - 20) {
      r = l, i = a.top;
      break;
    }
  }
  return { refDOM: r, refTop: i, stack: Vf(n.dom) };
}
function Vf(n) {
  let e = [], t = n.ownerDocument;
  for (let r = n; r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), n != t); r = li(r))
    ;
  return e;
}
function Tg({ refDOM: n, refTop: e, stack: t }) {
  let r = n ? n.getBoundingClientRect().top : 0;
  $f(t, r == 0 ? 0 : r - e);
}
function $f(n, e) {
  for (let t = 0; t < n.length; t++) {
    let { dom: r, top: i, left: o } = n[t];
    r.scrollTop != i + e && (r.scrollTop = i + e), r.scrollLeft != o && (r.scrollLeft = o);
  }
}
let Zn = null;
function Ag(n) {
  if (n.setActive)
    return n.setActive();
  if (Zn)
    return n.focus(Zn);
  let e = Vf(n);
  n.focus(Zn == null ? {
    get preventScroll() {
      return Zn = { preventScroll: !0 }, !0;
    }
  } : void 0), Zn || (Zn = !1, $f(e, 0));
}
function jf(n, e) {
  let t, r = 2e8, i, o = 0, s = e.top, l = e.top, a, c;
  for (let d = n.firstChild, u = 0; d; d = d.nextSibling, u++) {
    let f;
    if (d.nodeType == 1)
      f = d.getClientRects();
    else if (d.nodeType == 3)
      f = Rt(d).getClientRects();
    else
      continue;
    for (let p = 0; p < f.length; p++) {
      let h = f[p];
      if (h.top <= s && h.bottom >= l) {
        s = Math.max(h.bottom, s), l = Math.min(h.top, l);
        let m = h.left > e.left ? h.left - e.left : h.right < e.left ? e.left - h.right : 0;
        if (m < r) {
          t = d, r = m, i = m && t.nodeType == 3 ? {
            left: h.right < e.left ? h.right : h.left,
            top: e.top
          } : e, d.nodeType == 1 && m && (o = u + (e.left >= (h.left + h.right) / 2 ? 1 : 0));
          continue;
        }
      } else h.top > e.top && !a && h.left <= e.left && h.right >= e.left && (a = d, c = { left: Math.max(h.left, Math.min(h.right, e.left)), top: h.top });
      !t && (e.left >= h.right && e.top >= h.top || e.left >= h.left && e.top >= h.bottom) && (o = u + 1);
    }
  }
  return !t && a && (t = a, i = c, r = 0), t && t.nodeType == 3 ? Mg(t, i) : !t || r && t.nodeType == 1 ? { node: n, offset: o } : jf(t, i);
}
function Mg(n, e) {
  let t = n.nodeValue.length, r = document.createRange();
  for (let i = 0; i < t; i++) {
    r.setEnd(n, i + 1), r.setStart(n, i);
    let o = qt(r, 1);
    if (o.top != o.bottom && wa(e, o))
      return { node: n, offset: i + (e.left >= (o.left + o.right) / 2 ? 1 : 0) };
  }
  return { node: n, offset: 0 };
}
function wa(n, e) {
  return n.left >= e.left - 1 && n.left <= e.right + 1 && n.top >= e.top - 1 && n.top <= e.bottom + 1;
}
function Eg(n, e) {
  let t = n.parentNode;
  return t && /^li$/i.test(t.nodeName) && e.left < n.getBoundingClientRect().left ? t : n;
}
function Og(n, e, t) {
  let { node: r, offset: i } = jf(e, t), o = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let s = r.getBoundingClientRect();
    o = s.left != s.right && t.left > (s.left + s.right) / 2 ? 1 : -1;
  }
  return n.docView.posFromDOM(r, i, o);
}
function Ng(n, e, t, r) {
  let i = -1;
  for (let o = e, s = !1; o != n.dom; ) {
    let l = n.docView.nearestDesc(o, !0), a;
    if (!l)
      return null;
    if (l.dom.nodeType == 1 && (l.node.isBlock && l.parent || !l.contentDOM) && // Ignore elements with zero-size bounding rectangles
    ((a = l.dom.getBoundingClientRect()).width || a.height) && (l.node.isBlock && l.parent && (!s && a.left > r.left || a.top > r.top ? i = l.posBefore : (!s && a.right < r.left || a.bottom < r.top) && (i = l.posAfter), s = !0), !l.contentDOM && i < 0 && !l.node.isText))
      return (l.node.isBlock ? r.top < (a.top + a.bottom) / 2 : r.left < (a.left + a.right) / 2) ? l.posBefore : l.posAfter;
    o = l.dom.parentNode;
  }
  return i > -1 ? i : n.docView.posFromDOM(e, t, -1);
}
function Wf(n, e, t) {
  let r = n.childNodes.length;
  if (r && t.top < t.bottom)
    for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - t.top) / (t.bottom - t.top)) - 2)), o = i; ; ) {
      let s = n.childNodes[o];
      if (s.nodeType == 1) {
        let l = s.getClientRects();
        for (let a = 0; a < l.length; a++) {
          let c = l[a];
          if (wa(e, c))
            return Wf(s, e, c);
        }
      }
      if ((o = (o + 1) % r) == i)
        break;
    }
  return n;
}
function Dg(n, e) {
  let t = n.dom.ownerDocument, r, i = 0, o = vg(t, e.left, e.top);
  o && ({ node: r, offset: i } = o);
  let s = (n.root.elementFromPoint ? n.root : t).elementFromPoint(e.left, e.top), l;
  if (!s || !n.dom.contains(s.nodeType != 1 ? s.parentNode : s)) {
    let c = n.dom.getBoundingClientRect();
    if (!wa(e, c) || (s = Wf(n.dom, e, c), !s))
      return null;
  }
  if (_e)
    for (let c = s; r && c; c = li(c))
      c.draggable && (r = void 0);
  if (s = Eg(s, e), r) {
    if (it && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
      let d = r.childNodes[i], u;
      d.nodeName == "IMG" && (u = d.getBoundingClientRect()).right <= e.left && u.bottom > e.top && i++;
    }
    let c;
    Ti && i && r.nodeType == 1 && (c = r.childNodes[i - 1]).nodeType == 1 && c.contentEditable == "false" && c.getBoundingClientRect().top >= e.top && i--, r == n.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && e.top > r.lastChild.getBoundingClientRect().bottom ? l = n.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") && (l = Ng(n, r, i, e));
  }
  l == null && (l = Og(n, s, e));
  let a = n.docView.nearestDesc(s, !0);
  return { pos: l, inside: a ? a.posAtStart - a.border : -1 };
}
function Fc(n) {
  return n.top < n.bottom || n.left < n.right;
}
function qt(n, e) {
  let t = n.getClientRects();
  if (t.length) {
    let r = t[e < 0 ? 0 : t.length - 1];
    if (Fc(r))
      return r;
  }
  return Array.prototype.find.call(t, Fc) || n.getBoundingClientRect();
}
const _g = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function Uf(n, e, t) {
  let { node: r, offset: i, atom: o } = n.docView.domFromPos(e, t < 0 ? -1 : 1), s = Ti || it;
  if (r.nodeType == 3)
    if (s && (_g.test(r.nodeValue) || (t < 0 ? !i : i == r.nodeValue.length))) {
      let a = qt(Rt(r, i, i), t);
      if (it && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
        let c = qt(Rt(r, i - 1, i - 1), -1);
        if (c.top == a.top) {
          let d = qt(Rt(r, i, i + 1), -1);
          if (d.top != a.top)
            return Ir(d, d.left < c.left);
        }
      }
      return a;
    } else {
      let a = i, c = i, d = t < 0 ? 1 : -1;
      return t < 0 && !i ? (c++, d = -1) : t >= 0 && i == r.nodeValue.length ? (a--, d = 1) : t < 0 ? a-- : c++, Ir(qt(Rt(r, a, c), d), d < 0);
    }
  if (!n.state.doc.resolve(e - (o || 0)).parent.inlineContent) {
    if (o == null && i && (t < 0 || i == Ye(r))) {
      let a = r.childNodes[i - 1];
      if (a.nodeType == 1)
        return $s(a.getBoundingClientRect(), !1);
    }
    if (o == null && i < Ye(r)) {
      let a = r.childNodes[i];
      if (a.nodeType == 1)
        return $s(a.getBoundingClientRect(), !0);
    }
    return $s(r.getBoundingClientRect(), t >= 0);
  }
  if (o == null && i && (t < 0 || i == Ye(r))) {
    let a = r.childNodes[i - 1], c = a.nodeType == 3 ? Rt(a, Ye(a) - (s ? 0 : 1)) : a.nodeType == 1 && (a.nodeName != "BR" || !a.nextSibling) ? a : null;
    if (c)
      return Ir(qt(c, 1), !1);
  }
  if (o == null && i < Ye(r)) {
    let a = r.childNodes[i];
    for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; )
      a = a.nextSibling;
    let c = a ? a.nodeType == 3 ? Rt(a, 0, s ? 0 : 1) : a.nodeType == 1 ? a : null : null;
    if (c)
      return Ir(qt(c, -1), !0);
  }
  return Ir(qt(r.nodeType == 3 ? Rt(r) : r, -t), t >= 0);
}
function Ir(n, e) {
  if (n.width == 0)
    return n;
  let t = e ? n.left : n.right;
  return { top: n.top, bottom: n.bottom, left: t, right: t };
}
function $s(n, e) {
  if (n.height == 0)
    return n;
  let t = e ? n.top : n.bottom;
  return { top: t, bottom: t, left: n.left, right: n.right };
}
function Kf(n, e, t) {
  let r = n.state, i = n.root.activeElement;
  r != e && n.updateState(e), i != n.dom && n.focus();
  try {
    return t();
  } finally {
    r != e && n.updateState(r), i != n.dom && i && i.focus();
  }
}
function Rg(n, e, t) {
  let r = e.selection, i = t == "up" ? r.$from : r.$to;
  return Kf(n, e, () => {
    let { node: o } = n.docView.domFromPos(i.pos, t == "up" ? -1 : 1);
    for (; ; ) {
      let l = n.docView.nearestDesc(o, !0);
      if (!l)
        break;
      if (l.node.isBlock) {
        o = l.contentDOM || l.dom;
        break;
      }
      o = l.dom.parentNode;
    }
    let s = Uf(n, i.pos, 1);
    for (let l = o.firstChild; l; l = l.nextSibling) {
      let a;
      if (l.nodeType == 1)
        a = l.getClientRects();
      else if (l.nodeType == 3)
        a = Rt(l, 0, l.nodeValue.length).getClientRects();
      else
        continue;
      for (let c = 0; c < a.length; c++) {
        let d = a[c];
        if (d.bottom > d.top + 1 && (t == "up" ? s.top - d.top > (d.bottom - s.top) * 2 : d.bottom - s.bottom > (s.bottom - d.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const Ig = /[\u0590-\u08ac]/;
function Pg(n, e, t) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock)
    return !1;
  let i = r.parentOffset, o = !i, s = i == r.parent.content.size, l = n.domSelection();
  return l ? !Ig.test(r.parent.textContent) || !l.modify ? t == "left" || t == "backward" ? o : s : Kf(n, e, () => {
    let { focusNode: a, focusOffset: c, anchorNode: d, anchorOffset: u } = n.domSelectionRange(), f = l.caretBidiLevel;
    l.modify("move", t, "character");
    let p = r.depth ? n.docView.domAfterPos(r.before()) : n.dom, { focusNode: h, focusOffset: m } = n.domSelectionRange(), g = h && !p.contains(h.nodeType == 1 ? h : h.parentNode) || a == h && c == m;
    try {
      l.collapse(d, u), a && (a != d || c != u) && l.extend && l.extend(a, c);
    } catch {
    }
    return f != null && (l.caretBidiLevel = f), g;
  }) : r.pos == r.start() || r.pos == r.end();
}
let Hc = null, Vc = null, $c = !1;
function Lg(n, e, t) {
  return Hc == e && Vc == t ? $c : (Hc = e, Vc = t, $c = t == "up" || t == "down" ? Rg(n, e, t) : Pg(n, e, t));
}
const Xe = 0, jc = 1, Cn = 2, yt = 3;
class Ai {
  constructor(e, t, r, i) {
    this.parent = e, this.children = t, this.dom = r, this.contentDOM = i, this.dirty = Xe, r.pmViewDesc = this;
  }
  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, t, r) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  // When parsing in-editor content (in domchange.js), we allow
  // descriptions to determine the parse rules that should be used to
  // parse them.
  parseRule() {
    return null;
  }
  // Used by the editor's event handler to ignore events that come
  // from certain descs.
  stopEvent(e) {
    return !1;
  }
  // The size of the content represented by this desc.
  get size() {
    let e = 0;
    for (let t = 0; t < this.children.length; t++)
      e += this.children[t].size;
    return e;
  }
  // For block nodes, this represents the space taken up by their
  // start/end tokens.
  get border() {
    return 0;
  }
  destroy() {
    this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++)
      this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let t = 0, r = this.posAtStart; ; t++) {
      let i = this.children[t];
      if (i == e)
        return r;
      r += i.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, t, r) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (r < 0) {
        let o, s;
        if (e == this.contentDOM)
          o = e.childNodes[t - 1];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          o = e.previousSibling;
        }
        for (; o && !((s = o.pmViewDesc) && s.parent == this); )
          o = o.previousSibling;
        return o ? this.posBeforeChild(s) + s.size : this.posAtStart;
      } else {
        let o, s;
        if (e == this.contentDOM)
          o = e.childNodes[t];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          o = e.nextSibling;
        }
        for (; o && !((s = o.pmViewDesc) && s.parent == this); )
          o = o.nextSibling;
        return o ? this.posBeforeChild(s) : this.posAtEnd;
      }
    let i;
    if (e == this.dom && this.contentDOM)
      i = t > ke(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      i = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (t == 0)
        for (let o = e; ; o = o.parentNode) {
          if (o == this.dom) {
            i = !1;
            break;
          }
          if (o.previousSibling)
            break;
        }
      if (i == null && t == e.childNodes.length)
        for (let o = e; ; o = o.parentNode) {
          if (o == this.dom) {
            i = !0;
            break;
          }
          if (o.nextSibling)
            break;
        }
    }
    return i ?? r > 0 ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, t = !1) {
    for (let r = !0, i = e; i; i = i.parentNode) {
      let o = this.getDesc(i), s;
      if (o && (!t || o.node))
        if (r && (s = o.nodeDOM) && !(s.nodeType == 1 ? s.contains(e.nodeType == 1 ? e : e.parentNode) : s == e))
          r = !1;
        else
          return o;
    }
  }
  getDesc(e) {
    let t = e.pmViewDesc;
    for (let r = t; r; r = r.parent)
      if (r == this)
        return t;
  }
  posFromDOM(e, t, r) {
    for (let i = e; i; i = i.parentNode) {
      let o = this.getDesc(i);
      if (o)
        return o.localPosFromDOM(e, t, r);
    }
    return -1;
  }
  // Find the desc for the node after the given pos, if any. (When a
  // parent node overrode rendering, there might not be one.)
  descAt(e) {
    for (let t = 0, r = 0; t < this.children.length; t++) {
      let i = this.children[t], o = r + i.size;
      if (r == e && o != r) {
        for (; !i.border && i.children.length; )
          for (let s = 0; s < i.children.length; s++) {
            let l = i.children[s];
            if (l.size) {
              i = l;
              break;
            }
          }
        return i;
      }
      if (e < o)
        return i.descAt(e - r - i.border);
      r = o;
    }
  }
  domFromPos(e, t) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0, i = 0;
    for (let o = 0; r < this.children.length; r++) {
      let s = this.children[r], l = o + s.size;
      if (l > e || s instanceof Gf) {
        i = e - o;
        break;
      }
      o = l;
    }
    if (i)
      return this.children[r].domFromPos(i - this.children[r].border, t);
    for (let o; r && !(o = this.children[r - 1]).size && o instanceof qf && o.side >= 0; r--)
      ;
    if (t <= 0) {
      let o, s = !0;
      for (; o = r ? this.children[r - 1] : null, !(!o || o.dom.parentNode == this.contentDOM); r--, s = !1)
        ;
      return o && t && s && !o.border && !o.domAtom ? o.domFromPos(o.size, t) : { node: this.contentDOM, offset: o ? ke(o.dom) + 1 : 0 };
    } else {
      let o, s = !0;
      for (; o = r < this.children.length ? this.children[r] : null, !(!o || o.dom.parentNode == this.contentDOM); r++, s = !1)
        ;
      return o && s && !o.border && !o.domAtom ? o.domFromPos(0, t) : { node: this.contentDOM, offset: o ? ke(o.dom) : this.contentDOM.childNodes.length };
    }
  }
  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(e, t, r = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: t, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let i = -1, o = -1;
    for (let s = r, l = 0; ; l++) {
      let a = this.children[l], c = s + a.size;
      if (i == -1 && e <= c) {
        let d = s + a.border;
        if (e >= d && t <= c - a.border && a.node && a.contentDOM && this.contentDOM.contains(a.contentDOM))
          return a.parseRange(e, t, d);
        e = s;
        for (let u = l; u > 0; u--) {
          let f = this.children[u - 1];
          if (f.size && f.dom.parentNode == this.contentDOM && !f.emptyChildAt(1)) {
            i = ke(f.dom) + 1;
            break;
          }
          e -= f.size;
        }
        i == -1 && (i = 0);
      }
      if (i > -1 && (c > t || l == this.children.length - 1)) {
        t = c;
        for (let d = l + 1; d < this.children.length; d++) {
          let u = this.children[d];
          if (u.size && u.dom.parentNode == this.contentDOM && !u.emptyChildAt(-1)) {
            o = ke(u.dom);
            break;
          }
          t += u.size;
        }
        o == -1 && (o = this.contentDOM.childNodes.length);
        break;
      }
      s = c;
    }
    return { node: this.contentDOM, from: e, to: t, fromOffset: i, toOffset: o };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let t = this.children[e < 0 ? 0 : this.children.length - 1];
    return t.size == 0 || t.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: t, offset: r } = this.domFromPos(e, 0);
    if (t.nodeType != 1 || r == t.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return t.childNodes[r];
  }
  // View descs are responsible for setting any selection that falls
  // entirely inside of them, so that custom implementations can do
  // custom things with the selection. Note that this falls apart when
  // a selection starts in such a node and ends in another, in which
  // case we just use whatever domFromPos produces as a best effort.
  setSelection(e, t, r, i = !1) {
    let o = Math.min(e, t), s = Math.max(e, t);
    for (let p = 0, h = 0; p < this.children.length; p++) {
      let m = this.children[p], g = h + m.size;
      if (o > h && s < g)
        return m.setSelection(e - h - m.border, t - h - m.border, r, i);
      h = g;
    }
    let l = this.domFromPos(e, e ? -1 : 1), a = t == e ? l : this.domFromPos(t, t ? -1 : 1), c = r.root.getSelection(), d = r.domSelectionRange(), u = !1;
    if ((it || _e) && e == t) {
      let { node: p, offset: h } = l;
      if (p.nodeType == 3) {
        if (u = !!(h && p.nodeValue[h - 1] == `
`), u && h == p.nodeValue.length)
          for (let m = p, g; m; m = m.parentNode) {
            if (g = m.nextSibling) {
              g.nodeName == "BR" && (l = a = { node: g.parentNode, offset: ke(g) + 1 });
              break;
            }
            let y = m.pmViewDesc;
            if (y && y.node && y.node.isBlock)
              break;
          }
      } else {
        let m = p.childNodes[h - 1];
        u = m && (m.nodeName == "BR" || m.contentEditable == "false");
      }
    }
    if (it && d.focusNode && d.focusNode != a.node && d.focusNode.nodeType == 1) {
      let p = d.focusNode.childNodes[d.focusOffset];
      p && p.contentEditable == "false" && (i = !0);
    }
    if (!(i || u && _e) && Ln(l.node, l.offset, d.anchorNode, d.anchorOffset) && Ln(a.node, a.offset, d.focusNode, d.focusOffset))
      return;
    let f = !1;
    if ((c.extend || e == t) && !u) {
      c.collapse(l.node, l.offset);
      try {
        e != t && c.extend(a.node, a.offset), f = !0;
      } catch {
      }
    }
    if (!f) {
      if (e > t) {
        let h = l;
        l = a, a = h;
      }
      let p = document.createRange();
      p.setEnd(a.node, a.offset), p.setStart(l.node, l.offset), c.removeAllRanges(), c.addRange(p);
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != "selection";
  }
  get contentLost() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  }
  // Remove a subtree of the element tree that has been touched
  // by a DOM change, so that the next update will redraw it.
  markDirty(e, t) {
    for (let r = 0, i = 0; i < this.children.length; i++) {
      let o = this.children[i], s = r + o.size;
      if (r == s ? e <= s && t >= r : e < s && t > r) {
        let l = r + o.border, a = s - o.border;
        if (e >= l && t <= a) {
          this.dirty = e == r || t == s ? Cn : jc, e == l && t == a && (o.contentLost || o.dom.parentNode != this.contentDOM) ? o.dirty = yt : o.markDirty(e - l, t - l);
          return;
        } else
          o.dirty = o.dom == o.contentDOM && o.dom.parentNode == this.contentDOM && !o.children.length ? Cn : yt;
      }
      r = s;
    }
    this.dirty = Cn;
  }
  markParentsDirty() {
    let e = 1;
    for (let t = this.parent; t; t = t.parent, e++) {
      let r = e == 1 ? Cn : jc;
      t.dirty < r && (t.dirty = r);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
  isText(e) {
    return !1;
  }
}
class qf extends Ai {
  constructor(e, t, r, i) {
    let o, s = t.type.toDOM;
    if (typeof s == "function" && (s = s(r, () => {
      if (!o)
        return i;
      if (o.parent)
        return o.parent.posBeforeChild(o);
    })), !t.type.spec.raw) {
      if (s.nodeType != 1) {
        let l = document.createElement("span");
        l.appendChild(s), s = l;
      }
      s.contentEditable = "false", s.classList.add("ProseMirror-widget");
    }
    super(e, [], s, null), this.widget = t, this.widget = t, o = this;
  }
  matchesWidget(e) {
    return this.dirty == Xe && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let t = this.widget.spec.stopEvent;
    return t ? t(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get side() {
    return this.widget.type.side;
  }
}
class Bg extends Ai {
  constructor(e, t, r, i) {
    super(e, [], t, null), this.textDOM = r, this.text = i;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, t) {
    return e != this.textDOM ? this.posAtStart + (t ? this.size : 0) : this.posAtStart + t;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class Bn extends Ai {
  constructor(e, t, r, i, o) {
    super(e, [], r, i), this.mark = t, this.spec = o;
  }
  static create(e, t, r, i) {
    let o = i.nodeViews[t.type.name], s = o && o(t, i, r);
    return (!s || !s.dom) && (s = Wn.renderSpec(document, t.type.spec.toDOM(t, r), null, t.attrs)), new Bn(e, t, s.dom, s.contentDOM || s.dom, s);
  }
  parseRule() {
    return this.dirty & yt || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != yt && this.mark.eq(e);
  }
  markDirty(e, t) {
    if (super.markDirty(e, t), this.dirty != Xe) {
      let r = this.parent;
      for (; !r.node; )
        r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = Xe;
    }
  }
  slice(e, t, r) {
    let i = Bn.create(this.parent, this.mark, !0, r), o = this.children, s = this.size;
    t < s && (o = El(o, t, s, r)), e > 0 && (o = El(o, 0, e, r));
    for (let l = 0; l < o.length; l++)
      o[l].parent = i;
    return i.children = o, i;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
}
class an extends Ai {
  constructor(e, t, r, i, o, s, l, a, c) {
    super(e, [], o, s), this.node = t, this.outerDeco = r, this.innerDeco = i, this.nodeDOM = l;
  }
  // By default, a node is rendered using the `toDOM` method from the
  // node type spec. But client code can use the `nodeViews` spec to
  // supply a custom node view, which can influence various aspects of
  // the way the node works.
  //
  // (Using subclassing for this was intentionally decided against,
  // since it'd require exposing a whole slew of finicky
  // implementation details to the user code that they probably will
  // never need.)
  static create(e, t, r, i, o, s) {
    let l = o.nodeViews[t.type.name], a, c = l && l(t, o, () => {
      if (!a)
        return s;
      if (a.parent)
        return a.parent.posBeforeChild(a);
    }, r, i), d = c && c.dom, u = c && c.contentDOM;
    if (t.isText) {
      if (!d)
        d = document.createTextNode(t.text);
      else if (d.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else d || ({ dom: d, contentDOM: u } = Wn.renderSpec(document, t.type.spec.toDOM(t), null, t.attrs));
    !u && !t.isText && d.nodeName != "BR" && (d.hasAttribute("contenteditable") || (d.contentEditable = "false"), t.type.spec.draggable && (d.draggable = !0));
    let f = d;
    return d = Xf(d, r, t), c ? a = new zg(e, t, r, i, d, u || null, f, c, o, s + 1) : t.isText ? new hs(e, t, r, i, d, f, o) : new an(e, t, r, i, d, u || null, f, o, s + 1);
  }
  parseRule() {
    if (this.node.type.spec.reparseInView)
      return null;
    let e = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"), !this.contentDOM)
      e.getContent = () => this.node.content;
    else if (!this.contentLost)
      e.contentElement = this.contentDOM;
    else {
      for (let t = this.children.length - 1; t >= 0; t--) {
        let r = this.children[t];
        if (this.dom.contains(r.dom.parentNode)) {
          e.contentElement = r.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => x.empty);
    }
    return e;
  }
  matchesNode(e, t, r) {
    return this.dirty == Xe && e.eq(this.node) && Co(t, this.outerDeco) && r.eq(this.innerDeco);
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  // Syncs `this.children` to match `this.node.content` and the local
  // decorations, possibly introducing nesting for marks. Then, in a
  // separate step, syncs the DOM inside `this.contentDOM` to
  // `this.children`.
  updateChildren(e, t) {
    let r = this.node.inlineContent, i = t, o = e.composing ? this.localCompositionInfo(e, t) : null, s = o && o.pos > -1 ? o : null, l = o && o.pos < 0, a = new Hg(this, s && s.node, e);
    jg(this.node, this.innerDeco, (c, d, u) => {
      c.spec.marks ? a.syncToMarks(c.spec.marks, r, e) : c.type.side >= 0 && !u && a.syncToMarks(d == this.node.childCount ? G.none : this.node.child(d).marks, r, e), a.placeWidget(c, e, i);
    }, (c, d, u, f) => {
      a.syncToMarks(c.marks, r, e);
      let p;
      a.findNodeMatch(c, d, u, f) || l && e.state.selection.from > i && e.state.selection.to < i + c.nodeSize && (p = a.findIndexWithChild(o.node)) > -1 && a.updateNodeAt(c, d, u, p, e) || a.updateNextNode(c, d, u, e, f, i) || a.addNode(c, d, u, e, i), i += c.nodeSize;
    }), a.syncToMarks([], r, e), this.node.isTextblock && a.addTextblockHacks(), a.destroyRest(), (a.changed || this.dirty == Cn) && (s && this.protectLocalComposition(e, s), Jf(this.contentDOM, this.children, e), mr && Wg(this.dom));
  }
  localCompositionInfo(e, t) {
    let { from: r, to: i } = e.state.selection;
    if (!(e.state.selection instanceof L) || r < t || i > t + this.node.content.size)
      return null;
    let o = e.input.compositionNode;
    if (!o || !this.dom.contains(o.parentNode))
      return null;
    if (this.node.inlineContent) {
      let s = o.nodeValue, l = Ug(this.node.content, s, r - t, i - t);
      return l < 0 ? null : { node: o, pos: l, text: s };
    } else
      return { node: o, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: t, pos: r, text: i }) {
    if (this.getDesc(t))
      return;
    let o = t;
    for (; o.parentNode != this.contentDOM; o = o.parentNode) {
      for (; o.previousSibling; )
        o.parentNode.removeChild(o.previousSibling);
      for (; o.nextSibling; )
        o.parentNode.removeChild(o.nextSibling);
      o.pmViewDesc && (o.pmViewDesc = void 0);
    }
    let s = new Bg(this, o, t, i);
    e.input.compositionNodes.push(s), this.children = El(this.children, r, r + i.length, e, s);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, t, r, i) {
    return this.dirty == yt || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, r, i), !0);
  }
  updateInner(e, t, r, i) {
    this.updateOuterDeco(t), this.node = e, this.innerDeco = r, this.contentDOM && this.updateChildren(i, this.posAtStart), this.dirty = Xe;
  }
  updateOuterDeco(e) {
    if (Co(e, this.outerDeco))
      return;
    let t = this.nodeDOM.nodeType != 1, r = this.dom;
    this.dom = Yf(this.dom, this.nodeDOM, Ml(this.outerDeco, this.node, t), Ml(e, this.node, t)), this.dom != r && (r.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
  }
  // Mark this node as being the selected node.
  selectNode() {
    this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.dom.draggable = !0);
  }
  // Remove selected node marking from this node.
  deselectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.dom.removeAttribute("draggable"));
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function Wc(n, e, t, r, i) {
  Xf(r, e, n);
  let o = new an(void 0, n, e, t, r, r, r, i, 0);
  return o.contentDOM && o.updateChildren(i, 0), o;
}
class hs extends an {
  constructor(e, t, r, i, o, s, l) {
    super(e, t, r, i, o, null, s, l, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, t, r, i) {
    return this.dirty == yt || this.dirty != Xe && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != Xe || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, i.trackWrites == this.nodeDOM && (i.trackWrites = null)), this.node = e, this.dirty = Xe, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let t = this.nodeDOM; t; t = t.parentNode)
      if (t == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, t, r) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, r);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, t, r) {
    let i = this.node.cut(e, t), o = document.createTextNode(i.text);
    return new hs(this.parent, i, this.outerDeco, this.innerDeco, o, o, r);
  }
  markDirty(e, t) {
    super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = yt);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class Gf extends Ai {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == Xe && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class zg extends an {
  constructor(e, t, r, i, o, s, l, a, c, d) {
    super(e, t, r, i, o, s, l, c, d), this.spec = a;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, t, r, i) {
    if (this.dirty == yt)
      return !1;
    if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
      let o = this.spec.update(e, t, r);
      return o && this.updateInner(e, t, r, i), o;
    } else return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, r, i);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, t, r, i) {
    this.spec.setSelection ? this.spec.setSelection(e, t, r.root) : super.setSelection(e, t, r, i);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
}
function Jf(n, e, t) {
  let r = n.firstChild, i = !1;
  for (let o = 0; o < e.length; o++) {
    let s = e[o], l = s.dom;
    if (l.parentNode == n) {
      for (; l != r; )
        r = Uc(r), i = !0;
      r = r.nextSibling;
    } else
      i = !0, n.insertBefore(l, r);
    if (s instanceof Bn) {
      let a = r ? r.previousSibling : n.lastChild;
      Jf(s.contentDOM, s.children, t), r = a ? a.nextSibling : n.firstChild;
    }
  }
  for (; r; )
    r = Uc(r), i = !0;
  i && t.trackWrites == n && (t.trackWrites = null);
}
const jr = function(n) {
  n && (this.nodeName = n);
};
jr.prototype = /* @__PURE__ */ Object.create(null);
const Tn = [new jr()];
function Ml(n, e, t) {
  if (n.length == 0)
    return Tn;
  let r = t ? Tn[0] : new jr(), i = [r];
  for (let o = 0; o < n.length; o++) {
    let s = n[o].type.attrs;
    if (s) {
      s.nodeName && i.push(r = new jr(s.nodeName));
      for (let l in s) {
        let a = s[l];
        a != null && (t && i.length == 1 && i.push(r = new jr(e.isInline ? "span" : "div")), l == "class" ? r.class = (r.class ? r.class + " " : "") + a : l == "style" ? r.style = (r.style ? r.style + ";" : "") + a : l != "nodeName" && (r[l] = a));
      }
    }
  }
  return i;
}
function Yf(n, e, t, r) {
  if (t == Tn && r == Tn)
    return e;
  let i = e;
  for (let o = 0; o < r.length; o++) {
    let s = r[o], l = t[o];
    if (o) {
      let a;
      l && l.nodeName == s.nodeName && i != n && (a = i.parentNode) && a.nodeName.toLowerCase() == s.nodeName || (a = document.createElement(s.nodeName), a.pmIsDeco = !0, a.appendChild(i), l = Tn[0]), i = a;
    }
    Fg(i, l || Tn[0], s);
  }
  return i;
}
function Fg(n, e, t) {
  for (let r in e)
    r != "class" && r != "style" && r != "nodeName" && !(r in t) && n.removeAttribute(r);
  for (let r in t)
    r != "class" && r != "style" && r != "nodeName" && t[r] != e[r] && n.setAttribute(r, t[r]);
  if (e.class != t.class) {
    let r = e.class ? e.class.split(" ").filter(Boolean) : [], i = t.class ? t.class.split(" ").filter(Boolean) : [];
    for (let o = 0; o < r.length; o++)
      i.indexOf(r[o]) == -1 && n.classList.remove(r[o]);
    for (let o = 0; o < i.length; o++)
      r.indexOf(i[o]) == -1 && n.classList.add(i[o]);
    n.classList.length == 0 && n.removeAttribute("class");
  }
  if (e.style != t.style) {
    if (e.style) {
      let r = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, i;
      for (; i = r.exec(e.style); )
        n.style.removeProperty(i[1]);
    }
    t.style && (n.style.cssText += t.style);
  }
}
function Xf(n, e, t) {
  return Yf(n, n, Tn, Ml(e, t, n.nodeType != 1));
}
function Co(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].type.eq(e[t].type))
      return !1;
  return !0;
}
function Uc(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class Hg {
  constructor(e, t, r) {
    this.lock = t, this.view = r, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = Vg(e.node.content, e);
  }
  // Destroy and remove the children between the given indices in
  // `this.top`.
  destroyBetween(e, t) {
    if (e != t) {
      for (let r = e; r < t; r++)
        this.top.children[r].destroy();
      this.top.children.splice(e, t - e), this.changed = !0;
    }
  }
  // Destroy all remaining children in `this.top`.
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  // Sync the current stack of mark descs with the given array of
  // marks, reusing existing mark descs when possible.
  syncToMarks(e, t, r) {
    let i = 0, o = this.stack.length >> 1, s = Math.min(o, e.length);
    for (; i < s && (i == o - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1; )
      i++;
    for (; i < o; )
      this.destroyRest(), this.top.dirty = Xe, this.index = this.stack.pop(), this.top = this.stack.pop(), o--;
    for (; o < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let l = -1;
      for (let a = this.index; a < Math.min(this.index + 3, this.top.children.length); a++) {
        let c = this.top.children[a];
        if (c.matchesMark(e[o]) && !this.isLocked(c.dom)) {
          l = a;
          break;
        }
      }
      if (l > -1)
        l > this.index && (this.changed = !0, this.destroyBetween(this.index, l)), this.top = this.top.children[this.index];
      else {
        let a = Bn.create(this.top, e[o], t, r);
        this.top.children.splice(this.index, 0, a), this.top = a, this.changed = !0;
      }
      this.index = 0, o++;
    }
  }
  // Try to find a node desc matching the given data. Skip over it and
  // return true when successful.
  findNodeMatch(e, t, r, i) {
    let o = -1, s;
    if (i >= this.preMatch.index && (s = this.preMatch.matches[i - this.preMatch.index]).parent == this.top && s.matchesNode(e, t, r))
      o = this.top.children.indexOf(s, this.index);
    else
      for (let l = this.index, a = Math.min(this.top.children.length, l + 5); l < a; l++) {
        let c = this.top.children[l];
        if (c.matchesNode(e, t, r) && !this.preMatch.matched.has(c)) {
          o = l;
          break;
        }
      }
    return o < 0 ? !1 : (this.destroyBetween(this.index, o), this.index++, !0);
  }
  updateNodeAt(e, t, r, i, o) {
    let s = this.top.children[i];
    return s.dirty == yt && s.dom == s.contentDOM && (s.dirty = Cn), s.update(e, t, r, o) ? (this.destroyBetween(this.index, i), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let t = e.parentNode;
      if (!t)
        return -1;
      if (t == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let i = this.index; i < this.top.children.length; i++)
            if (this.top.children[i] == r)
              return i;
        }
        return -1;
      }
      e = t;
    }
  }
  // Try to update the next node, if any, to the given data. Checks
  // pre-matches to avoid overwriting nodes that could still be used.
  updateNextNode(e, t, r, i, o, s) {
    for (let l = this.index; l < this.top.children.length; l++) {
      let a = this.top.children[l];
      if (a instanceof an) {
        let c = this.preMatch.matched.get(a);
        if (c != null && c != o)
          return !1;
        let d = a.dom, u, f = this.isLocked(d) && !(e.isText && a.node && a.node.isText && a.nodeDOM.nodeValue == e.text && a.dirty != yt && Co(t, a.outerDeco));
        if (!f && a.update(e, t, r, i))
          return this.destroyBetween(this.index, l), a.dom != d && (this.changed = !0), this.index++, !0;
        if (!f && (u = this.recreateWrapper(a, e, t, r, i, s)))
          return this.destroyBetween(this.index, l), this.top.children[this.index] = u, u.contentDOM && (u.dirty = Cn, u.updateChildren(i, s + 1), u.dirty = Xe), this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  // When a node with content is replaced by a different node with
  // identical content, move over its children.
  recreateWrapper(e, t, r, i, o, s) {
    if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !Co(r, e.outerDeco) || !i.eq(e.innerDeco))
      return null;
    let l = an.create(this.top, t, r, i, o, s);
    if (l.contentDOM) {
      l.children = e.children, e.children = [];
      for (let a of l.children)
        a.parent = l;
    }
    return e.destroy(), l;
  }
  // Insert the node as a newly created node desc.
  addNode(e, t, r, i, o) {
    let s = an.create(this.top, e, t, r, i, o);
    s.contentDOM && s.updateChildren(i, o + 1), this.top.children.splice(this.index++, 0, s), this.changed = !0;
  }
  placeWidget(e, t, r) {
    let i = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (i && i.matchesWidget(e) && (e == i.widget || !i.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let o = new qf(this.top, e, t, r);
      this.top.children.splice(this.index++, 0, o), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], t = this.top;
    for (; e instanceof Bn; )
      t = e, e = t.children[t.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof hs) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((_e || Me) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
  }
  addHackNode(e, t) {
    if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && (r.className = "ProseMirror-separator", r.alt = ""), e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let i = new Gf(this.top, [], r, null);
      t != this.top ? t.children.push(i) : t.children.splice(this.index++, 0, i), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function Vg(n, e) {
  let t = e, r = t.children.length, i = n.childCount, o = /* @__PURE__ */ new Map(), s = [];
  e: for (; i > 0; ) {
    let l;
    for (; ; )
      if (r) {
        let c = t.children[r - 1];
        if (c instanceof Bn)
          t = c, r = c.children.length;
        else {
          l = c, r--;
          break;
        }
      } else {
        if (t == e)
          break e;
        r = t.parent.children.indexOf(t), t = t.parent;
      }
    let a = l.node;
    if (a) {
      if (a != n.child(i - 1))
        break;
      --i, o.set(l, i), s.push(l);
    }
  }
  return { index: i, matched: o, matches: s.reverse() };
}
function $g(n, e) {
  return n.type.side - e.type.side;
}
function jg(n, e, t, r) {
  let i = e.locals(n), o = 0;
  if (i.length == 0) {
    for (let c = 0; c < n.childCount; c++) {
      let d = n.child(c);
      r(d, i, e.forChild(o, d), c), o += d.nodeSize;
    }
    return;
  }
  let s = 0, l = [], a = null;
  for (let c = 0; ; ) {
    let d, u;
    for (; s < i.length && i[s].to == o; ) {
      let g = i[s++];
      g.widget && (d ? (u || (u = [d])).push(g) : d = g);
    }
    if (d)
      if (u) {
        u.sort($g);
        for (let g = 0; g < u.length; g++)
          t(u[g], c, !!a);
      } else
        t(d, c, !!a);
    let f, p;
    if (a)
      p = -1, f = a, a = null;
    else if (c < n.childCount)
      p = c, f = n.child(c++);
    else
      break;
    for (let g = 0; g < l.length; g++)
      l[g].to <= o && l.splice(g--, 1);
    for (; s < i.length && i[s].from <= o && i[s].to > o; )
      l.push(i[s++]);
    let h = o + f.nodeSize;
    if (f.isText) {
      let g = h;
      s < i.length && i[s].from < g && (g = i[s].from);
      for (let y = 0; y < l.length; y++)
        l[y].to < g && (g = l[y].to);
      g < h && (a = f.cut(g - o), f = f.cut(0, g - o), h = g, p = -1);
    } else
      for (; s < i.length && i[s].to < h; )
        s++;
    let m = f.isInline && !f.isLeaf ? l.filter((g) => !g.inline) : l.slice();
    r(f, m, e.forChild(o, f), p), o = h;
  }
}
function Wg(n) {
  if (n.nodeName == "UL" || n.nodeName == "OL") {
    let e = n.style.cssText;
    n.style.cssText = e + "; list-style: square !important", window.getComputedStyle(n).listStyle, n.style.cssText = e;
  }
}
function Ug(n, e, t, r) {
  for (let i = 0, o = 0; i < n.childCount && o <= r; ) {
    let s = n.child(i++), l = o;
    if (o += s.nodeSize, !s.isText)
      continue;
    let a = s.text;
    for (; i < n.childCount; ) {
      let c = n.child(i++);
      if (o += c.nodeSize, !c.isText)
        break;
      a += c.text;
    }
    if (o >= t) {
      if (o >= r && a.slice(r - e.length - l, r - l) == e)
        return r - e.length;
      let c = l < r ? a.lastIndexOf(e, r - l - 1) : -1;
      if (c >= 0 && c + e.length + l >= t)
        return l + c;
      if (t == r && a.length >= r + e.length - l && a.slice(r - l, r - l + e.length) == e)
        return r;
    }
  }
  return -1;
}
function El(n, e, t, r, i) {
  let o = [];
  for (let s = 0, l = 0; s < n.length; s++) {
    let a = n[s], c = l, d = l += a.size;
    c >= t || d <= e ? o.push(a) : (c < e && o.push(a.slice(0, e - c, r)), i && (o.push(i), i = void 0), d > t && o.push(a.slice(t - c, a.size, r)));
  }
  return o;
}
function Sa(n, e = null) {
  let t = n.domSelectionRange(), r = n.state.doc;
  if (!t.focusNode)
    return null;
  let i = n.docView.nearestDesc(t.focusNode), o = i && i.size == 0, s = n.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (s < 0)
    return null;
  let l = r.resolve(s), a, c;
  if (ps(t)) {
    for (a = s; i && !i.node; )
      i = i.parent;
    let u = i.node;
    if (i && u.isAtom && P.isSelectable(u) && i.parent && !(u.isInline && yg(t.focusNode, t.focusOffset, i.dom))) {
      let f = i.posBefore;
      c = new P(s == f ? l : r.resolve(f));
    }
  } else {
    if (t instanceof n.dom.ownerDocument.defaultView.Selection && t.rangeCount > 1) {
      let u = s, f = s;
      for (let p = 0; p < t.rangeCount; p++) {
        let h = t.getRangeAt(p);
        u = Math.min(u, n.docView.posFromDOM(h.startContainer, h.startOffset, 1)), f = Math.max(f, n.docView.posFromDOM(h.endContainer, h.endOffset, -1));
      }
      if (u < 0)
        return null;
      [a, s] = f == n.state.selection.anchor ? [f, u] : [u, f], l = r.resolve(s);
    } else
      a = n.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
    if (a < 0)
      return null;
  }
  let d = r.resolve(a);
  if (!c) {
    let u = e == "pointer" || n.state.selection.head < l.pos && !o ? 1 : -1;
    c = xa(n, d, l, u);
  }
  return c;
}
function Zf(n) {
  return n.editable ? n.hasFocus() : ep(n) && document.activeElement && document.activeElement.contains(n.dom);
}
function Ft(n, e = !1) {
  let t = n.state.selection;
  if (Qf(n, t), !!Zf(n)) {
    if (!e && n.input.mouseDown && n.input.mouseDown.allowDefault && Me) {
      let r = n.domSelectionRange(), i = n.domObserver.currentSelection;
      if (r.anchorNode && i.anchorNode && Ln(r.anchorNode, r.anchorOffset, i.anchorNode, i.anchorOffset)) {
        n.input.mouseDown.delayedSelectionSync = !0, n.domObserver.setCurSelection();
        return;
      }
    }
    if (n.domObserver.disconnectSelection(), n.cursorWrapper)
      qg(n);
    else {
      let { anchor: r, head: i } = t, o, s;
      Kc && !(t instanceof L) && (t.$from.parent.inlineContent || (o = qc(n, t.from)), !t.empty && !t.$from.parent.inlineContent && (s = qc(n, t.to))), n.docView.setSelection(r, i, n, e), Kc && (o && Gc(o), s && Gc(s)), t.visible ? n.dom.classList.remove("ProseMirror-hideselection") : (n.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && Kg(n));
    }
    n.domObserver.setCurSelection(), n.domObserver.connectSelection();
  }
}
const Kc = _e || Me && Hf < 63;
function qc(n, e) {
  let { node: t, offset: r } = n.docView.domFromPos(e, 0), i = r < t.childNodes.length ? t.childNodes[r] : null, o = r ? t.childNodes[r - 1] : null;
  if (_e && i && i.contentEditable == "false")
    return js(i);
  if ((!i || i.contentEditable == "false") && (!o || o.contentEditable == "false")) {
    if (i)
      return js(i);
    if (o)
      return js(o);
  }
}
function js(n) {
  return n.contentEditable = "true", _e && n.draggable && (n.draggable = !1, n.wasDraggable = !0), n;
}
function Gc(n) {
  n.contentEditable = "false", n.wasDraggable && (n.draggable = !0, n.wasDraggable = null);
}
function Kg(n) {
  let e = n.dom.ownerDocument;
  e.removeEventListener("selectionchange", n.input.hideSelectionGuard);
  let t = n.domSelectionRange(), r = t.anchorNode, i = t.anchorOffset;
  e.addEventListener("selectionchange", n.input.hideSelectionGuard = () => {
    (t.anchorNode != r || t.anchorOffset != i) && (e.removeEventListener("selectionchange", n.input.hideSelectionGuard), setTimeout(() => {
      (!Zf(n) || n.state.selection.visible) && n.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function qg(n) {
  let e = n.domSelection(), t = document.createRange();
  if (!e)
    return;
  let r = n.cursorWrapper.dom, i = r.nodeName == "IMG";
  i ? t.setStart(r.parentNode, ke(r) + 1) : t.setStart(r, 0), t.collapse(!0), e.removeAllRanges(), e.addRange(t), !i && !n.state.selection.visible && Le && ln <= 11 && (r.disabled = !0, r.disabled = !1);
}
function Qf(n, e) {
  if (e instanceof P) {
    let t = n.docView.descAt(e.from);
    t != n.lastSelectedViewDesc && (Jc(n), t && t.selectNode(), n.lastSelectedViewDesc = t);
  } else
    Jc(n);
}
function Jc(n) {
  n.lastSelectedViewDesc && (n.lastSelectedViewDesc.parent && n.lastSelectedViewDesc.deselectNode(), n.lastSelectedViewDesc = void 0);
}
function xa(n, e, t, r) {
  return n.someProp("createSelectionBetween", (i) => i(n, e, t)) || L.between(e, t, r);
}
function Yc(n) {
  return n.editable && !n.hasFocus() ? !1 : ep(n);
}
function ep(n) {
  let e = n.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return n.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (n.editable || n.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function Gg(n) {
  let e = n.docView.domFromPos(n.state.selection.anchor, 0), t = n.domSelectionRange();
  return Ln(e.node, e.offset, t.anchorNode, t.anchorOffset);
}
function Ol(n, e) {
  let { $anchor: t, $head: r } = n.selection, i = e > 0 ? t.max(r) : t.min(r), o = i.parent.inlineContent ? i.depth ? n.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
  return o && B.findFrom(o, e);
}
function Gt(n, e) {
  return n.dispatch(n.state.tr.setSelection(e).scrollIntoView()), !0;
}
function Xc(n, e, t) {
  let r = n.state.selection;
  if (r instanceof L)
    if (t.indexOf("s") > -1) {
      let { $head: i } = r, o = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
      if (!o || o.isText || !o.isLeaf)
        return !1;
      let s = n.state.doc.resolve(i.pos + o.nodeSize * (e < 0 ? -1 : 1));
      return Gt(n, new L(r.$anchor, s));
    } else if (r.empty) {
      if (n.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let i = Ol(n.state, e);
        return i && i instanceof P ? Gt(n, i) : !1;
      } else if (!(Je && t.indexOf("m") > -1)) {
        let i = r.$head, o = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter, s;
        if (!o || o.isText)
          return !1;
        let l = e < 0 ? i.pos - o.nodeSize : i.pos;
        return o.isAtom || (s = n.docView.descAt(l)) && !s.contentDOM ? P.isSelectable(o) ? Gt(n, new P(e < 0 ? n.state.doc.resolve(i.pos - o.nodeSize) : i)) : Ti ? Gt(n, new L(n.state.doc.resolve(e < 0 ? l : l + o.nodeSize))) : !1 : !1;
      }
    } else return !1;
  else {
    if (r instanceof P && r.node.isInline)
      return Gt(n, new L(e > 0 ? r.$to : r.$from));
    {
      let i = Ol(n.state, e);
      return i ? Gt(n, i) : !1;
    }
  }
}
function To(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Wr(n, e) {
  let t = n.pmViewDesc;
  return t && t.size == 0 && (e < 0 || n.nextSibling || n.nodeName != "BR");
}
function Qn(n, e) {
  return e < 0 ? Jg(n) : Yg(n);
}
function Jg(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i, o, s = !1;
  for (it && t.nodeType == 1 && r < To(t) && Wr(t.childNodes[r], -1) && (s = !0); ; )
    if (r > 0) {
      if (t.nodeType != 1)
        break;
      {
        let l = t.childNodes[r - 1];
        if (Wr(l, -1))
          i = t, o = --r;
        else if (l.nodeType == 3)
          t = l, r = t.nodeValue.length;
        else
          break;
      }
    } else {
      if (tp(t))
        break;
      {
        let l = t.previousSibling;
        for (; l && Wr(l, -1); )
          i = t.parentNode, o = ke(l), l = l.previousSibling;
        if (l)
          t = l, r = To(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = 0;
        }
      }
    }
  s ? Nl(n, t, r) : i && Nl(n, i, o);
}
function Yg(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i = To(t), o, s;
  for (; ; )
    if (r < i) {
      if (t.nodeType != 1)
        break;
      let l = t.childNodes[r];
      if (Wr(l, 1))
        o = t, s = ++r;
      else
        break;
    } else {
      if (tp(t))
        break;
      {
        let l = t.nextSibling;
        for (; l && Wr(l, 1); )
          o = l.parentNode, s = ke(l) + 1, l = l.nextSibling;
        if (l)
          t = l, r = 0, i = To(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = i = 0;
        }
      }
    }
  o && Nl(n, o, s);
}
function tp(n) {
  let e = n.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function Xg(n, e) {
  for (; n && e == n.childNodes.length && !Ci(n); )
    e = ke(n) + 1, n = n.parentNode;
  for (; n && e < n.childNodes.length; ) {
    let t = n.childNodes[e];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = 0;
  }
}
function Zg(n, e) {
  for (; n && !e && !Ci(n); )
    e = ke(n), n = n.parentNode;
  for (; n && e; ) {
    let t = n.childNodes[e - 1];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = n.childNodes.length;
  }
}
function Nl(n, e, t) {
  if (e.nodeType != 3) {
    let o, s;
    (s = Xg(e, t)) ? (e = s, t = 0) : (o = Zg(e, t)) && (e = o, t = o.nodeValue.length);
  }
  let r = n.domSelection();
  if (!r)
    return;
  if (ps(r)) {
    let o = document.createRange();
    o.setEnd(e, t), o.setStart(e, t), r.removeAllRanges(), r.addRange(o);
  } else r.extend && r.extend(e, t);
  n.domObserver.setCurSelection();
  let { state: i } = n;
  setTimeout(() => {
    n.state == i && Ft(n);
  }, 50);
}
function Zc(n, e) {
  let t = n.state.doc.resolve(e);
  if (!(Me || wg) && t.parent.inlineContent) {
    let i = n.coordsAtPos(e);
    if (e > t.start()) {
      let o = n.coordsAtPos(e - 1), s = (o.top + o.bottom) / 2;
      if (s > i.top && s < i.bottom && Math.abs(o.left - i.left) > 1)
        return o.left < i.left ? "ltr" : "rtl";
    }
    if (e < t.end()) {
      let o = n.coordsAtPos(e + 1), s = (o.top + o.bottom) / 2;
      if (s > i.top && s < i.bottom && Math.abs(o.left - i.left) > 1)
        return o.left > i.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(n.dom).direction == "rtl" ? "rtl" : "ltr";
}
function Qc(n, e, t) {
  let r = n.state.selection;
  if (r instanceof L && !r.empty || t.indexOf("s") > -1 || Je && t.indexOf("m") > -1)
    return !1;
  let { $from: i, $to: o } = r;
  if (!i.parent.inlineContent || n.endOfTextblock(e < 0 ? "up" : "down")) {
    let s = Ol(n.state, e);
    if (s && s instanceof P)
      return Gt(n, s);
  }
  if (!i.parent.inlineContent) {
    let s = e < 0 ? i : o, l = r instanceof je ? B.near(s, e) : B.findFrom(s, e);
    return l ? Gt(n, l) : !1;
  }
  return !1;
}
function ed(n, e) {
  if (!(n.state.selection instanceof L))
    return !0;
  let { $head: t, $anchor: r, empty: i } = n.state.selection;
  if (!t.sameParent(r))
    return !0;
  if (!i)
    return !1;
  if (n.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let o = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
  if (o && !o.isText) {
    let s = n.state.tr;
    return e < 0 ? s.delete(t.pos - o.nodeSize, t.pos) : s.delete(t.pos, t.pos + o.nodeSize), n.dispatch(s), !0;
  }
  return !1;
}
function td(n, e, t) {
  n.domObserver.stop(), e.contentEditable = t, n.domObserver.start();
}
function Qg(n) {
  if (!_e || n.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    td(n, r, "true"), setTimeout(() => td(n, r, "false"), 20);
  }
  return !1;
}
function ey(n) {
  let e = "";
  return n.ctrlKey && (e += "c"), n.metaKey && (e += "m"), n.altKey && (e += "a"), n.shiftKey && (e += "s"), e;
}
function ty(n, e) {
  let t = e.keyCode, r = ey(e);
  if (t == 8 || Je && t == 72 && r == "c")
    return ed(n, -1) || Qn(n, -1);
  if (t == 46 && !e.shiftKey || Je && t == 68 && r == "c")
    return ed(n, 1) || Qn(n, 1);
  if (t == 13 || t == 27)
    return !0;
  if (t == 37 || Je && t == 66 && r == "c") {
    let i = t == 37 ? Zc(n, n.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return Xc(n, i, r) || Qn(n, i);
  } else if (t == 39 || Je && t == 70 && r == "c") {
    let i = t == 39 ? Zc(n, n.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return Xc(n, i, r) || Qn(n, i);
  } else {
    if (t == 38 || Je && t == 80 && r == "c")
      return Qc(n, -1, r) || Qn(n, -1);
    if (t == 40 || Je && t == 78 && r == "c")
      return Qg(n) || Qc(n, 1, r) || Qn(n, 1);
    if (r == (Je ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function ka(n, e) {
  n.someProp("transformCopied", (p) => {
    e = p(e, n);
  });
  let t = [], { content: r, openStart: i, openEnd: o } = e;
  for (; i > 1 && o > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    i--, o--;
    let p = r.firstChild;
    t.push(p.type.name, p.attrs != p.type.defaultAttrs ? p.attrs : null), r = p.content;
  }
  let s = n.someProp("clipboardSerializer") || Wn.fromSchema(n.state.schema), l = lp(), a = l.createElement("div");
  a.appendChild(s.serializeFragment(r, { document: l }));
  let c = a.firstChild, d, u = 0;
  for (; c && c.nodeType == 1 && (d = sp[c.nodeName.toLowerCase()]); ) {
    for (let p = d.length - 1; p >= 0; p--) {
      let h = l.createElement(d[p]);
      for (; a.firstChild; )
        h.appendChild(a.firstChild);
      a.appendChild(h), u++;
    }
    c = a.firstChild;
  }
  c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${i} ${o}${u ? ` -${u}` : ""} ${JSON.stringify(t)}`);
  let f = n.someProp("clipboardTextSerializer", (p) => p(e, n)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: a, text: f, slice: e };
}
function np(n, e, t, r, i) {
  let o = i.parent.type.spec.code, s, l;
  if (!t && !e)
    return null;
  let a = e && (r || o || !t);
  if (a) {
    if (n.someProp("transformPastedText", (f) => {
      e = f(e, o || r, n);
    }), o)
      return e ? new M(x.from(n.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0) : M.empty;
    let u = n.someProp("clipboardTextParser", (f) => f(e, i, r, n));
    if (u)
      l = u;
    else {
      let f = i.marks(), { schema: p } = n.state, h = Wn.fromSchema(p);
      s = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((m) => {
        let g = s.appendChild(document.createElement("p"));
        m && g.appendChild(h.serializeNode(p.text(m, f)));
      });
    }
  } else
    n.someProp("transformPastedHTML", (u) => {
      t = u(t, n);
    }), s = oy(t), Ti && sy(s);
  let c = s && s.querySelector("[data-pm-slice]"), d = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
  if (d && d[3])
    for (let u = +d[3]; u > 0; u--) {
      let f = s.firstChild;
      for (; f && f.nodeType != 1; )
        f = f.nextSibling;
      if (!f)
        break;
      s = f;
    }
  if (l || (l = (n.someProp("clipboardParser") || n.someProp("domParser") || sn.fromSchema(n.state.schema)).parseSlice(s, {
    preserveWhitespace: !!(a || d),
    context: i,
    ruleFromNode(f) {
      return f.nodeName == "BR" && !f.nextSibling && f.parentNode && !ny.test(f.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), d)
    l = ly(nd(l, +d[1], +d[2]), d[4]);
  else if (l = M.maxOpen(ry(l.content, i), !0), l.openStart || l.openEnd) {
    let u = 0, f = 0;
    for (let p = l.content.firstChild; u < l.openStart && !p.type.spec.isolating; u++, p = p.firstChild)
      ;
    for (let p = l.content.lastChild; f < l.openEnd && !p.type.spec.isolating; f++, p = p.lastChild)
      ;
    l = nd(l, u, f);
  }
  return n.someProp("transformPasted", (u) => {
    l = u(l, n);
  }), l;
}
const ny = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function ry(n, e) {
  if (n.childCount < 2)
    return n;
  for (let t = e.depth; t >= 0; t--) {
    let i = e.node(t).contentMatchAt(e.index(t)), o, s = [];
    if (n.forEach((l) => {
      if (!s)
        return;
      let a = i.findWrapping(l.type), c;
      if (!a)
        return s = null;
      if (c = s.length && o.length && ip(a, o, l, s[s.length - 1], 0))
        s[s.length - 1] = c;
      else {
        s.length && (s[s.length - 1] = op(s[s.length - 1], o.length));
        let d = rp(l, a);
        s.push(d), i = i.matchType(d.type), o = a;
      }
    }), s)
      return x.from(s);
  }
  return n;
}
function rp(n, e, t = 0) {
  for (let r = e.length - 1; r >= t; r--)
    n = e[r].create(null, x.from(n));
  return n;
}
function ip(n, e, t, r, i) {
  if (i < n.length && i < e.length && n[i] == e[i]) {
    let o = ip(n, e, t, r.lastChild, i + 1);
    if (o)
      return r.copy(r.content.replaceChild(r.childCount - 1, o));
    if (r.contentMatchAt(r.childCount).matchType(i == n.length - 1 ? t.type : n[i + 1]))
      return r.copy(r.content.append(x.from(rp(t, n, i + 1))));
  }
}
function op(n, e) {
  if (e == 0)
    return n;
  let t = n.content.replaceChild(n.childCount - 1, op(n.lastChild, e - 1)), r = n.contentMatchAt(n.childCount).fillBefore(x.empty, !0);
  return n.copy(t.append(r));
}
function Dl(n, e, t, r, i, o) {
  let s = e < 0 ? n.firstChild : n.lastChild, l = s.content;
  return n.childCount > 1 && (o = 0), i < r - 1 && (l = Dl(l, e, t, r, i + 1, o)), i >= t && (l = e < 0 ? s.contentMatchAt(0).fillBefore(l, o <= i).append(l) : l.append(s.contentMatchAt(s.childCount).fillBefore(x.empty, !0))), n.replaceChild(e < 0 ? 0 : n.childCount - 1, s.copy(l));
}
function nd(n, e, t) {
  return e < n.openStart && (n = new M(Dl(n.content, -1, e, n.openStart, 0, n.openEnd), e, n.openEnd)), t < n.openEnd && (n = new M(Dl(n.content, 1, t, n.openEnd, 0, 0), n.openStart, t)), n;
}
const sp = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
let rd = null;
function lp() {
  return rd || (rd = document.implementation.createHTMLDocument("title"));
}
let Ws = null;
function iy(n) {
  let e = window.trustedTypes;
  return e ? (Ws || (Ws = e.createPolicy("ProseMirrorClipboard", { createHTML: (t) => t })), Ws.createHTML(n)) : n;
}
function oy(n) {
  let e = /^(\s*<meta [^>]*>)*/.exec(n);
  e && (n = n.slice(e[0].length));
  let t = lp().createElement("div"), r = /<([a-z][^>\s]+)/i.exec(n), i;
  if ((i = r && sp[r[1].toLowerCase()]) && (n = i.map((o) => "<" + o + ">").join("") + n + i.map((o) => "</" + o + ">").reverse().join("")), t.innerHTML = iy(n), i)
    for (let o = 0; o < i.length; o++)
      t = t.querySelector(i[o]) || t;
  return t;
}
function sy(n) {
  let e = n.querySelectorAll(Me ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    r.childNodes.length == 1 && r.textContent == " " && r.parentNode && r.parentNode.replaceChild(n.ownerDocument.createTextNode(" "), r);
  }
}
function ly(n, e) {
  if (!n.size)
    return n;
  let t = n.content.firstChild.type.schema, r;
  try {
    r = JSON.parse(e);
  } catch {
    return n;
  }
  let { content: i, openStart: o, openEnd: s } = n;
  for (let l = r.length - 2; l >= 0; l -= 2) {
    let a = t.nodes[r[l]];
    if (!a || a.hasRequiredAttrs())
      break;
    i = x.from(a.create(r[l + 1], i)), o++, s++;
  }
  return new M(i, o, s);
}
const Re = {}, Ie = {}, ay = { touchstart: !0, touchmove: !0 };
class cy {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "" }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastChromeDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function dy(n) {
  for (let e in Re) {
    let t = Re[e];
    n.dom.addEventListener(e, n.input.eventHandlers[e] = (r) => {
      fy(n, r) && !Ca(n, r) && (n.editable || !(r.type in Ie)) && t(n, r);
    }, ay[e] ? { passive: !0 } : void 0);
  }
  _e && n.dom.addEventListener("input", () => null), _l(n);
}
function rn(n, e) {
  n.input.lastSelectionOrigin = e, n.input.lastSelectionTime = Date.now();
}
function uy(n) {
  n.domObserver.stop();
  for (let e in n.input.eventHandlers)
    n.dom.removeEventListener(e, n.input.eventHandlers[e]);
  clearTimeout(n.input.composingTimeout), clearTimeout(n.input.lastIOSEnterFallbackTimeout);
}
function _l(n) {
  n.someProp("handleDOMEvents", (e) => {
    for (let t in e)
      n.input.eventHandlers[t] || n.dom.addEventListener(t, n.input.eventHandlers[t] = (r) => Ca(n, r));
  });
}
function Ca(n, e) {
  return n.someProp("handleDOMEvents", (t) => {
    let r = t[e.type];
    return r ? r(n, e) || e.defaultPrevented : !1;
  });
}
function fy(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target; t != n.dom; t = t.parentNode)
    if (!t || t.nodeType == 11 || t.pmViewDesc && t.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function py(n, e) {
  !Ca(n, e) && Re[e.type] && (n.editable || !(e.type in Ie)) && Re[e.type](n, e);
}
Ie.keydown = (n, e) => {
  let t = e;
  if (n.input.shiftKey = t.keyCode == 16 || t.shiftKey, !cp(n, t) && (n.input.lastKeyCode = t.keyCode, n.input.lastKeyCodeTime = Date.now(), !(Lt && Me && t.keyCode == 13)))
    if (t.keyCode != 229 && n.domObserver.forceFlush(), mr && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
      let r = Date.now();
      n.input.lastIOSEnter = r, n.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        n.input.lastIOSEnter == r && (n.someProp("handleKeyDown", (i) => i(n, xn(13, "Enter"))), n.input.lastIOSEnter = 0);
      }, 200);
    } else n.someProp("handleKeyDown", (r) => r(n, t)) || ty(n, t) ? t.preventDefault() : rn(n, "key");
};
Ie.keyup = (n, e) => {
  e.keyCode == 16 && (n.input.shiftKey = !1);
};
Ie.keypress = (n, e) => {
  let t = e;
  if (cp(n, t) || !t.charCode || t.ctrlKey && !t.altKey || Je && t.metaKey)
    return;
  if (n.someProp("handleKeyPress", (i) => i(n, t))) {
    t.preventDefault();
    return;
  }
  let r = n.state.selection;
  if (!(r instanceof L) || !r.$from.sameParent(r.$to)) {
    let i = String.fromCharCode(t.charCode);
    !/[\r\n]/.test(i) && !n.someProp("handleTextInput", (o) => o(n, r.$from.pos, r.$to.pos, i)) && n.dispatch(n.state.tr.insertText(i).scrollIntoView()), t.preventDefault();
  }
};
function ms(n) {
  return { left: n.clientX, top: n.clientY };
}
function hy(n, e) {
  let t = e.x - n.clientX, r = e.y - n.clientY;
  return t * t + r * r < 100;
}
function Ta(n, e, t, r, i) {
  if (r == -1)
    return !1;
  let o = n.state.doc.resolve(r);
  for (let s = o.depth + 1; s > 0; s--)
    if (n.someProp(e, (l) => s > o.depth ? l(n, t, o.nodeAfter, o.before(s), i, !0) : l(n, t, o.node(s), o.before(s), i, !1)))
      return !0;
  return !1;
}
function ur(n, e, t) {
  if (n.focused || n.focus(), n.state.selection.eq(e))
    return;
  let r = n.state.tr.setSelection(e);
  r.setMeta("pointer", !0), n.dispatch(r);
}
function my(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.doc.resolve(e), r = t.nodeAfter;
  return r && r.isAtom && P.isSelectable(r) ? (ur(n, new P(t)), !0) : !1;
}
function gy(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.selection, r, i;
  t instanceof P && (r = t.node);
  let o = n.state.doc.resolve(e);
  for (let s = o.depth + 1; s > 0; s--) {
    let l = s > o.depth ? o.nodeAfter : o.node(s);
    if (P.isSelectable(l)) {
      r && t.$from.depth > 0 && s >= t.$from.depth && o.before(t.$from.depth + 1) == t.$from.pos ? i = o.before(t.$from.depth) : i = o.before(s);
      break;
    }
  }
  return i != null ? (ur(n, P.create(n.state.doc, i)), !0) : !1;
}
function yy(n, e, t, r, i) {
  return Ta(n, "handleClickOn", e, t, r) || n.someProp("handleClick", (o) => o(n, e, r)) || (i ? gy(n, t) : my(n, t));
}
function by(n, e, t, r) {
  return Ta(n, "handleDoubleClickOn", e, t, r) || n.someProp("handleDoubleClick", (i) => i(n, e, r));
}
function vy(n, e, t, r) {
  return Ta(n, "handleTripleClickOn", e, t, r) || n.someProp("handleTripleClick", (i) => i(n, e, r)) || wy(n, t, r);
}
function wy(n, e, t) {
  if (t.button != 0)
    return !1;
  let r = n.state.doc;
  if (e == -1)
    return r.inlineContent ? (ur(n, L.create(r, 0, r.content.size)), !0) : !1;
  let i = r.resolve(e);
  for (let o = i.depth + 1; o > 0; o--) {
    let s = o > i.depth ? i.nodeAfter : i.node(o), l = i.before(o);
    if (s.inlineContent)
      ur(n, L.create(r, l + 1, l + 1 + s.content.size));
    else if (P.isSelectable(s))
      ur(n, P.create(r, l));
    else
      continue;
    return !0;
  }
}
function Aa(n) {
  return Ao(n);
}
const ap = Je ? "metaKey" : "ctrlKey";
Re.mousedown = (n, e) => {
  let t = e;
  n.input.shiftKey = t.shiftKey;
  let r = Aa(n), i = Date.now(), o = "singleClick";
  i - n.input.lastClick.time < 500 && hy(t, n.input.lastClick) && !t[ap] && (n.input.lastClick.type == "singleClick" ? o = "doubleClick" : n.input.lastClick.type == "doubleClick" && (o = "tripleClick")), n.input.lastClick = { time: i, x: t.clientX, y: t.clientY, type: o };
  let s = n.posAtCoords(ms(t));
  s && (o == "singleClick" ? (n.input.mouseDown && n.input.mouseDown.done(), n.input.mouseDown = new Sy(n, s, t, !!r)) : (o == "doubleClick" ? by : vy)(n, s.pos, s.inside, t) ? t.preventDefault() : rn(n, "pointer"));
};
class Sy {
  constructor(e, t, r, i) {
    this.view = e, this.pos = t, this.event = r, this.flushed = i, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!r[ap], this.allowDefault = r.shiftKey;
    let o, s;
    if (t.inside > -1)
      o = e.state.doc.nodeAt(t.inside), s = t.inside;
    else {
      let d = e.state.doc.resolve(t.pos);
      o = d.parent, s = d.depth ? d.before() : 0;
    }
    const l = i ? null : r.target, a = l ? e.docView.nearestDesc(l, !0) : null;
    this.target = a && a.dom.nodeType == 1 ? a.dom : null;
    let { selection: c } = e.state;
    (r.button == 0 && o.type.spec.draggable && o.type.spec.selectable !== !1 || c instanceof P && c.from <= s && c.to > s) && (this.mightDrag = {
      node: o,
      pos: s,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && it && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), rn(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => Ft(this.view)), this.view.input.mouseDown = null;
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let t = this.pos;
    this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(ms(e))), this.updateAllowDefault(e), this.allowDefault || !t ? rn(this.view, "pointer") : yy(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    _e && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    Me && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (ur(this.view, B.near(this.view.state.doc.resolve(t.pos))), e.preventDefault()) : rn(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), rn(this.view, "pointer"), e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
}
Re.touchstart = (n) => {
  n.input.lastTouch = Date.now(), Aa(n), rn(n, "pointer");
};
Re.touchmove = (n) => {
  n.input.lastTouch = Date.now(), rn(n, "pointer");
};
Re.contextmenu = (n) => Aa(n);
function cp(n, e) {
  return n.composing ? !0 : _e && Math.abs(e.timeStamp - n.input.compositionEndedAt) < 500 ? (n.input.compositionEndedAt = -2e8, !0) : !1;
}
const xy = Lt ? 5e3 : -1;
Ie.compositionstart = Ie.compositionupdate = (n) => {
  if (!n.composing) {
    n.domObserver.flush();
    let { state: e } = n, t = e.selection.$to;
    if (e.selection instanceof L && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1)))
      n.markCursor = n.state.storedMarks || t.marks(), Ao(n, !0), n.markCursor = null;
    else if (Ao(n, !e.selection.empty), it && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
      let r = n.domSelectionRange();
      for (let i = r.focusNode, o = r.focusOffset; i && i.nodeType == 1 && o != 0; ) {
        let s = o < 0 ? i.lastChild : i.childNodes[o - 1];
        if (!s)
          break;
        if (s.nodeType == 3) {
          let l = n.domSelection();
          l && l.collapse(s, s.nodeValue.length);
          break;
        } else
          i = s, o = -1;
      }
    }
    n.input.composing = !0;
  }
  dp(n, xy);
};
Ie.compositionend = (n, e) => {
  n.composing && (n.input.composing = !1, n.input.compositionEndedAt = e.timeStamp, n.input.compositionPendingChanges = n.domObserver.pendingRecords().length ? n.input.compositionID : 0, n.input.compositionNode = null, n.input.compositionPendingChanges && Promise.resolve().then(() => n.domObserver.flush()), n.input.compositionID++, dp(n, 20));
};
function dp(n, e) {
  clearTimeout(n.input.composingTimeout), e > -1 && (n.input.composingTimeout = setTimeout(() => Ao(n), e));
}
function up(n) {
  for (n.composing && (n.input.composing = !1, n.input.compositionEndedAt = Cy()); n.input.compositionNodes.length > 0; )
    n.input.compositionNodes.pop().markParentsDirty();
}
function ky(n) {
  let e = n.domSelectionRange();
  if (!e.focusNode)
    return null;
  let t = mg(e.focusNode, e.focusOffset), r = gg(e.focusNode, e.focusOffset);
  if (t && r && t != r) {
    let i = r.pmViewDesc, o = n.domObserver.lastChangedTextNode;
    if (t == o || r == o)
      return o;
    if (!i || !i.isText(r.nodeValue))
      return r;
    if (n.input.compositionNode == r) {
      let s = t.pmViewDesc;
      if (!(!s || !s.isText(t.nodeValue)))
        return r;
    }
  }
  return t || r;
}
function Cy() {
  let n = document.createEvent("Event");
  return n.initEvent("event", !0, !0), n.timeStamp;
}
function Ao(n, e = !1) {
  if (!(Lt && n.domObserver.flushingSoon >= 0)) {
    if (n.domObserver.forceFlush(), up(n), e || n.docView && n.docView.dirty) {
      let t = Sa(n);
      return t && !t.eq(n.state.selection) ? n.dispatch(n.state.tr.setSelection(t)) : (n.markCursor || e) && !n.state.selection.empty ? n.dispatch(n.state.tr.deleteSelection()) : n.updateState(n.state), !0;
    }
    return !1;
  }
}
function Ty(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.dom.parentNode.appendChild(document.createElement("div"));
  t.appendChild(e), t.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), i = document.createRange();
  i.selectNodeContents(e), n.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
    t.parentNode && t.parentNode.removeChild(t), n.focus();
  }, 50);
}
const ai = Le && ln < 15 || mr && Sg < 604;
Re.copy = Ie.cut = (n, e) => {
  let t = e, r = n.state.selection, i = t.type == "cut";
  if (r.empty)
    return;
  let o = ai ? null : t.clipboardData, s = r.content(), { dom: l, text: a } = ka(n, s);
  o ? (t.preventDefault(), o.clearData(), o.setData("text/html", l.innerHTML), o.setData("text/plain", a)) : Ty(n, l), i && n.dispatch(n.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function Ay(n) {
  return n.openStart == 0 && n.openEnd == 0 && n.content.childCount == 1 ? n.content.firstChild : null;
}
function My(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.input.shiftKey || n.state.selection.$from.parent.type.spec.code, r = n.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
  t || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let i = n.input.shiftKey && n.input.lastKeyCode != 45;
  setTimeout(() => {
    n.focus(), r.parentNode && r.parentNode.removeChild(r), t ? ci(n, r.value, null, i, e) : ci(n, r.textContent, r.innerHTML, i, e);
  }, 50);
}
function ci(n, e, t, r, i) {
  let o = np(n, e, t, r, n.state.selection.$from);
  if (n.someProp("handlePaste", (a) => a(n, i, o || M.empty)))
    return !0;
  if (!o)
    return !1;
  let s = Ay(o), l = s ? n.state.tr.replaceSelectionWith(s, r) : n.state.tr.replaceSelection(o);
  return n.dispatch(l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function fp(n) {
  let e = n.getData("text/plain") || n.getData("Text");
  if (e)
    return e;
  let t = n.getData("text/uri-list");
  return t ? t.replace(/\r?\n/g, " ") : "";
}
Ie.paste = (n, e) => {
  let t = e;
  if (n.composing && !Lt)
    return;
  let r = ai ? null : t.clipboardData, i = n.input.shiftKey && n.input.lastKeyCode != 45;
  r && ci(n, fp(r), r.getData("text/html"), i, t) ? t.preventDefault() : My(n, t);
};
class pp {
  constructor(e, t, r) {
    this.slice = e, this.move = t, this.node = r;
  }
}
const hp = Je ? "altKey" : "ctrlKey";
Re.dragstart = (n, e) => {
  let t = e, r = n.input.mouseDown;
  if (r && r.done(), !t.dataTransfer)
    return;
  let i = n.state.selection, o = i.empty ? null : n.posAtCoords(ms(t)), s;
  if (!(o && o.pos >= i.from && o.pos <= (i instanceof P ? i.to - 1 : i.to))) {
    if (r && r.mightDrag)
      s = P.create(n.state.doc, r.mightDrag.pos);
    else if (t.target && t.target.nodeType == 1) {
      let u = n.docView.nearestDesc(t.target, !0);
      u && u.node.type.spec.draggable && u != n.docView && (s = P.create(n.state.doc, u.posBefore));
    }
  }
  let l = (s || n.state.selection).content(), { dom: a, text: c, slice: d } = ka(n, l);
  (!t.dataTransfer.files.length || !Me || Hf > 120) && t.dataTransfer.clearData(), t.dataTransfer.setData(ai ? "Text" : "text/html", a.innerHTML), t.dataTransfer.effectAllowed = "copyMove", ai || t.dataTransfer.setData("text/plain", c), n.dragging = new pp(d, !t[hp], s);
};
Re.dragend = (n) => {
  let e = n.dragging;
  window.setTimeout(() => {
    n.dragging == e && (n.dragging = null);
  }, 50);
};
Ie.dragover = Ie.dragenter = (n, e) => e.preventDefault();
Ie.drop = (n, e) => {
  let t = e, r = n.dragging;
  if (n.dragging = null, !t.dataTransfer)
    return;
  let i = n.posAtCoords(ms(t));
  if (!i)
    return;
  let o = n.state.doc.resolve(i.pos), s = r && r.slice;
  s ? n.someProp("transformPasted", (h) => {
    s = h(s, n);
  }) : s = np(n, fp(t.dataTransfer), ai ? null : t.dataTransfer.getData("text/html"), !1, o);
  let l = !!(r && !t[hp]);
  if (n.someProp("handleDrop", (h) => h(n, t, s || M.empty, l))) {
    t.preventDefault();
    return;
  }
  if (!s)
    return;
  t.preventDefault();
  let a = s ? Df(n.state.doc, o.pos, s) : o.pos;
  a == null && (a = o.pos);
  let c = n.state.tr;
  if (l) {
    let { node: h } = r;
    h ? h.replace(c) : c.deleteSelection();
  }
  let d = c.mapping.map(a), u = s.openStart == 0 && s.openEnd == 0 && s.content.childCount == 1, f = c.doc;
  if (u ? c.replaceRangeWith(d, d, s.content.firstChild) : c.replaceRange(d, d, s), c.doc.eq(f))
    return;
  let p = c.doc.resolve(d);
  if (u && P.isSelectable(s.content.firstChild) && p.nodeAfter && p.nodeAfter.sameMarkup(s.content.firstChild))
    c.setSelection(new P(p));
  else {
    let h = c.mapping.map(a);
    c.mapping.maps[c.mapping.maps.length - 1].forEach((m, g, y, w) => h = w), c.setSelection(xa(n, p, c.doc.resolve(h)));
  }
  n.focus(), n.dispatch(c.setMeta("uiEvent", "drop"));
};
Re.focus = (n) => {
  n.input.lastFocus = Date.now(), n.focused || (n.domObserver.stop(), n.dom.classList.add("ProseMirror-focused"), n.domObserver.start(), n.focused = !0, setTimeout(() => {
    n.docView && n.hasFocus() && !n.domObserver.currentSelection.eq(n.domSelectionRange()) && Ft(n);
  }, 20));
};
Re.blur = (n, e) => {
  let t = e;
  n.focused && (n.domObserver.stop(), n.dom.classList.remove("ProseMirror-focused"), n.domObserver.start(), t.relatedTarget && n.dom.contains(t.relatedTarget) && n.domObserver.currentSelection.clear(), n.focused = !1);
};
Re.beforeinput = (n, e) => {
  if (Me && Lt && e.inputType == "deleteContentBackward") {
    n.domObserver.flushSoon();
    let { domChangeCount: r } = n.input;
    setTimeout(() => {
      if (n.input.domChangeCount != r || (n.dom.blur(), n.focus(), n.someProp("handleKeyDown", (o) => o(n, xn(8, "Backspace")))))
        return;
      let { $cursor: i } = n.state.selection;
      i && i.pos > 0 && n.dispatch(n.state.tr.delete(i.pos - 1, i.pos).scrollIntoView());
    }, 50);
  }
};
for (let n in Ie)
  Re[n] = Ie[n];
function di(n, e) {
  if (n == e)
    return !0;
  for (let t in n)
    if (n[t] !== e[t])
      return !1;
  for (let t in e)
    if (!(t in n))
      return !1;
  return !0;
}
class Mo {
  constructor(e, t) {
    this.toDOM = e, this.spec = t || Dn, this.side = this.spec.side || 0;
  }
  map(e, t, r, i) {
    let { pos: o, deleted: s } = e.mapResult(t.from + i, this.side < 0 ? -1 : 1);
    return s ? null : new Te(o - r, o - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof Mo && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && di(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class cn {
  constructor(e, t) {
    this.attrs = e, this.spec = t || Dn;
  }
  map(e, t, r, i) {
    let o = e.map(t.from + i, this.spec.inclusiveStart ? -1 : 1) - r, s = e.map(t.to + i, this.spec.inclusiveEnd ? 1 : -1) - r;
    return o >= s ? null : new Te(o, s, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return this == e || e instanceof cn && di(this.attrs, e.attrs) && di(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof cn;
  }
  destroy() {
  }
}
class Ma {
  constructor(e, t) {
    this.attrs = e, this.spec = t || Dn;
  }
  map(e, t, r, i) {
    let o = e.mapResult(t.from + i, 1);
    if (o.deleted)
      return null;
    let s = e.mapResult(t.to + i, -1);
    return s.deleted || s.pos <= o.pos ? null : new Te(o.pos - r, s.pos - r, this);
  }
  valid(e, t) {
    let { index: r, offset: i } = e.content.findIndex(t.from), o;
    return i == t.from && !(o = e.child(r)).isText && i + o.nodeSize == t.to;
  }
  eq(e) {
    return this == e || e instanceof Ma && di(this.attrs, e.attrs) && di(this.spec, e.spec);
  }
  destroy() {
  }
}
class Te {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.from = e, this.to = t, this.type = r;
  }
  /**
  @internal
  */
  copy(e, t) {
    return new Te(e, t, this.type);
  }
  /**
  @internal
  */
  eq(e, t = 0) {
    return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
  }
  /**
  @internal
  */
  map(e, t, r) {
    return this.type.map(e, this, t, r);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, t, r) {
    return new Te(e, e, new Mo(t, r));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, t, r, i) {
    return new Te(e, t, new cn(r, i));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, t, r, i) {
    return new Te(e, t, new Ma(r, i));
  }
  /**
  The spec provided when creating this decoration. Can be useful
  if you've stored extra information in that object.
  */
  get spec() {
    return this.type.spec;
  }
  /**
  @internal
  */
  get inline() {
    return this.type instanceof cn;
  }
  /**
  @internal
  */
  get widget() {
    return this.type instanceof Mo;
  }
}
const rr = [], Dn = {};
class ee {
  /**
  @internal
  */
  constructor(e, t) {
    this.local = e.length ? e : rr, this.children = t.length ? t : rr;
  }
  /**
  Create a set of decorations, using the structure of the given
  document. This will consume (modify) the `decorations` array, so
  you must make a copy if you want need to preserve that.
  */
  static create(e, t) {
    return t.length ? Eo(t, e, 0, Dn) : Ae;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, t, r) {
    let i = [];
    return this.findInner(e ?? 0, t ?? 1e9, i, 0, r), i;
  }
  findInner(e, t, r, i, o) {
    for (let s = 0; s < this.local.length; s++) {
      let l = this.local[s];
      l.from <= t && l.to >= e && (!o || o(l.spec)) && r.push(l.copy(l.from + i, l.to + i));
    }
    for (let s = 0; s < this.children.length; s += 3)
      if (this.children[s] < t && this.children[s + 1] > e) {
        let l = this.children[s] + 1;
        this.children[s + 2].findInner(e - l, t - l, r, i + l, o);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, t, r) {
    return this == Ae || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, r || Dn);
  }
  /**
  @internal
  */
  mapInner(e, t, r, i, o) {
    let s;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l].map(e, r, i);
      a && a.type.valid(t, a) ? (s || (s = [])).push(a) : o.onRemove && o.onRemove(this.local[l].spec);
    }
    return this.children.length ? Ey(this.children, s || [], e, t, r, i, o) : s ? new ee(s.sort(_n), rr) : Ae;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Consumes the `decorations` array. Needs
  access to the current document to create the appropriate tree
  structure.
  */
  add(e, t) {
    return t.length ? this == Ae ? ee.create(e, t) : this.addInner(e, t, 0) : this;
  }
  addInner(e, t, r) {
    let i, o = 0;
    e.forEach((l, a) => {
      let c = a + r, d;
      if (d = gp(t, l, c)) {
        for (i || (i = this.children.slice()); o < i.length && i[o] < a; )
          o += 3;
        i[o] == a ? i[o + 2] = i[o + 2].addInner(l, d, c + 1) : i.splice(o, 0, a, a + l.nodeSize, Eo(d, l, c + 1, Dn)), o += 3;
      }
    });
    let s = mp(o ? yp(t) : t, -r);
    for (let l = 0; l < s.length; l++)
      s[l].type.valid(e, s[l]) || s.splice(l--, 1);
    return new ee(s.length ? this.local.concat(s).sort(_n) : this.local, i || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == Ae ? this : this.removeInner(e, 0);
  }
  removeInner(e, t) {
    let r = this.children, i = this.local;
    for (let o = 0; o < r.length; o += 3) {
      let s, l = r[o] + t, a = r[o + 1] + t;
      for (let d = 0, u; d < e.length; d++)
        (u = e[d]) && u.from > l && u.to < a && (e[d] = null, (s || (s = [])).push(u));
      if (!s)
        continue;
      r == this.children && (r = this.children.slice());
      let c = r[o + 2].removeInner(s, l + 1);
      c != Ae ? r[o + 2] = c : (r.splice(o, 3), o -= 3);
    }
    if (i.length) {
      for (let o = 0, s; o < e.length; o++)
        if (s = e[o])
          for (let l = 0; l < i.length; l++)
            i[l].eq(s, t) && (i == this.local && (i = this.local.slice()), i.splice(l--, 1));
    }
    return r == this.children && i == this.local ? this : i.length || r.length ? new ee(i, r) : Ae;
  }
  forChild(e, t) {
    if (this == Ae)
      return this;
    if (t.isLeaf)
      return ee.empty;
    let r, i;
    for (let l = 0; l < this.children.length; l += 3)
      if (this.children[l] >= e) {
        this.children[l] == e && (r = this.children[l + 2]);
        break;
      }
    let o = e + 1, s = o + t.content.size;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l];
      if (a.from < s && a.to > o && a.type instanceof cn) {
        let c = Math.max(o, a.from) - o, d = Math.min(s, a.to) - o;
        c < d && (i || (i = [])).push(a.copy(c, d));
      }
    }
    if (i) {
      let l = new ee(i.sort(_n), rr);
      return r ? new Zt([l, r]) : l;
    }
    return r || Ae;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof ee) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let t = 0; t < this.local.length; t++)
      if (!this.local[t].eq(e.local[t]))
        return !1;
    for (let t = 0; t < this.children.length; t += 3)
      if (this.children[t] != e.children[t] || this.children[t + 1] != e.children[t + 1] || !this.children[t + 2].eq(e.children[t + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return Ea(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == Ae)
      return rr;
    if (e.inlineContent || !this.local.some(cn.is))
      return this.local;
    let t = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof cn || t.push(this.local[r]);
    return t;
  }
  forEachSet(e) {
    e(this);
  }
}
ee.empty = new ee([], []);
ee.removeOverlap = Ea;
const Ae = ee.empty;
class Zt {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const r = this.members.map((i) => i.map(e, t, Dn));
    return Zt.from(r);
  }
  forChild(e, t) {
    if (t.isLeaf)
      return ee.empty;
    let r = [];
    for (let i = 0; i < this.members.length; i++) {
      let o = this.members[i].forChild(e, t);
      o != Ae && (o instanceof Zt ? r = r.concat(o.members) : r.push(o));
    }
    return Zt.from(r);
  }
  eq(e) {
    if (!(e instanceof Zt) || e.members.length != this.members.length)
      return !1;
    for (let t = 0; t < this.members.length; t++)
      if (!this.members[t].eq(e.members[t]))
        return !1;
    return !0;
  }
  locals(e) {
    let t, r = !0;
    for (let i = 0; i < this.members.length; i++) {
      let o = this.members[i].localsInner(e);
      if (o.length)
        if (!t)
          t = o;
        else {
          r && (t = t.slice(), r = !1);
          for (let s = 0; s < o.length; s++)
            t.push(o[s]);
        }
    }
    return t ? Ea(r ? t : t.sort(_n)) : rr;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return Ae;
      case 1:
        return e[0];
      default:
        return new Zt(e.every((t) => t instanceof ee) ? e : e.reduce((t, r) => t.concat(r instanceof ee ? r : r.members), []));
    }
  }
  forEachSet(e) {
    for (let t = 0; t < this.members.length; t++)
      this.members[t].forEachSet(e);
  }
}
function Ey(n, e, t, r, i, o, s) {
  let l = n.slice();
  for (let c = 0, d = o; c < t.maps.length; c++) {
    let u = 0;
    t.maps[c].forEach((f, p, h, m) => {
      let g = m - h - (p - f);
      for (let y = 0; y < l.length; y += 3) {
        let w = l[y + 1];
        if (w < 0 || f > w + d - u)
          continue;
        let A = l[y] + d - u;
        p >= A ? l[y + 1] = f <= A ? -2 : -1 : f >= d && g && (l[y] += g, l[y + 1] += g);
      }
      u += g;
    }), d = t.maps[c].map(d, -1);
  }
  let a = !1;
  for (let c = 0; c < l.length; c += 3)
    if (l[c + 1] < 0) {
      if (l[c + 1] == -2) {
        a = !0, l[c + 1] = -1;
        continue;
      }
      let d = t.map(n[c] + o), u = d - i;
      if (u < 0 || u >= r.content.size) {
        a = !0;
        continue;
      }
      let f = t.map(n[c + 1] + o, -1), p = f - i, { index: h, offset: m } = r.content.findIndex(u), g = r.maybeChild(h);
      if (g && m == u && m + g.nodeSize == p) {
        let y = l[c + 2].mapInner(t, g, d + 1, n[c] + o + 1, s);
        y != Ae ? (l[c] = u, l[c + 1] = p, l[c + 2] = y) : (l[c + 1] = -2, a = !0);
      } else
        a = !0;
    }
  if (a) {
    let c = Oy(l, n, e, t, i, o, s), d = Eo(c, r, 0, s);
    e = d.local;
    for (let u = 0; u < l.length; u += 3)
      l[u + 1] < 0 && (l.splice(u, 3), u -= 3);
    for (let u = 0, f = 0; u < d.children.length; u += 3) {
      let p = d.children[u];
      for (; f < l.length && l[f] < p; )
        f += 3;
      l.splice(f, 0, d.children[u], d.children[u + 1], d.children[u + 2]);
    }
  }
  return new ee(e.sort(_n), l);
}
function mp(n, e) {
  if (!e || !n.length)
    return n;
  let t = [];
  for (let r = 0; r < n.length; r++) {
    let i = n[r];
    t.push(new Te(i.from + e, i.to + e, i.type));
  }
  return t;
}
function Oy(n, e, t, r, i, o, s) {
  function l(a, c) {
    for (let d = 0; d < a.local.length; d++) {
      let u = a.local[d].map(r, i, c);
      u ? t.push(u) : s.onRemove && s.onRemove(a.local[d].spec);
    }
    for (let d = 0; d < a.children.length; d += 3)
      l(a.children[d + 2], a.children[d] + c + 1);
  }
  for (let a = 0; a < n.length; a += 3)
    n[a + 1] == -1 && l(n[a + 2], e[a] + o + 1);
  return t;
}
function gp(n, e, t) {
  if (e.isLeaf)
    return null;
  let r = t + e.nodeSize, i = null;
  for (let o = 0, s; o < n.length; o++)
    (s = n[o]) && s.from > t && s.to < r && ((i || (i = [])).push(s), n[o] = null);
  return i;
}
function yp(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    n[t] != null && e.push(n[t]);
  return e;
}
function Eo(n, e, t, r) {
  let i = [], o = !1;
  e.forEach((l, a) => {
    let c = gp(n, l, a + t);
    if (c) {
      o = !0;
      let d = Eo(c, l, t + a + 1, r);
      d != Ae && i.push(a, a + l.nodeSize, d);
    }
  });
  let s = mp(o ? yp(n) : n, -t).sort(_n);
  for (let l = 0; l < s.length; l++)
    s[l].type.valid(e, s[l]) || (r.onRemove && r.onRemove(s[l].spec), s.splice(l--, 1));
  return s.length || i.length ? new ee(s, i) : Ae;
}
function _n(n, e) {
  return n.from - e.from || n.to - e.to;
}
function Ea(n) {
  let e = n;
  for (let t = 0; t < e.length - 1; t++) {
    let r = e[t];
    if (r.from != r.to)
      for (let i = t + 1; i < e.length; i++) {
        let o = e[i];
        if (o.from == r.from) {
          o.to != r.to && (e == n && (e = n.slice()), e[i] = o.copy(o.from, r.to), id(e, i + 1, o.copy(r.to, o.to)));
          continue;
        } else {
          o.from < r.to && (e == n && (e = n.slice()), e[t] = r.copy(r.from, o.from), id(e, i, r.copy(o.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function id(n, e, t) {
  for (; e < n.length && _n(t, n[e]) > 0; )
    e++;
  n.splice(e, 0, t);
}
function Us(n) {
  let e = [];
  return n.someProp("decorations", (t) => {
    let r = t(n.state);
    r && r != Ae && e.push(r);
  }), n.cursorWrapper && e.push(ee.create(n.state.doc, [n.cursorWrapper.deco])), Zt.from(e);
}
const Ny = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, Dy = Le && ln <= 11;
class _y {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  set(e) {
    this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
  }
}
class Ry {
  constructor(e, t) {
    this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new _y(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((r) => {
      for (let i = 0; i < r.length; i++)
        this.queue.push(r[i]);
      Le && ln <= 11 && r.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), Dy && (this.onCharData = (r) => {
      this.queue.push({ target: r.target, type: "characterData", oldValue: r.prevValue }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  flushSoon() {
    this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
      this.flushingSoon = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
  }
  start() {
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, Ny)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let t = 0; t < e.length; t++)
          this.queue.push(e[t]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  }
  suppressSelectionUpdates() {
    this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
  }
  onSelectionChange() {
    if (Yc(this.view)) {
      if (this.suppressingSelectionUpdates)
        return Ft(this.view);
      if (Le && ln <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && Ln(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode)
      return !0;
    let t = /* @__PURE__ */ new Set(), r;
    for (let o = e.focusNode; o; o = li(o))
      t.add(o);
    for (let o = e.anchorNode; o; o = li(o))
      if (t.has(o)) {
        r = o;
        break;
      }
    let i = r && this.view.docView.nearestDesc(r);
    if (i && i.ignoreMutation({
      type: "selection",
      target: r.nodeType == 3 ? r.parentNode : r
    }))
      return this.setCurSelection(), !0;
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords())
        this.queue.push(e);
    return this.queue;
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1)
      return;
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let r = e.domSelectionRange(), i = !this.suppressingSelectionUpdates && !this.currentSelection.eq(r) && Yc(e) && !this.ignoreSelectionChange(r), o = -1, s = -1, l = !1, a = [];
    if (e.editable)
      for (let d = 0; d < t.length; d++) {
        let u = this.registerMutation(t[d], a);
        u && (o = o < 0 ? u.from : Math.min(u.from, o), s = s < 0 ? u.to : Math.max(u.to, s), u.typeOver && (l = !0));
      }
    if (it && a.length) {
      let d = a.filter((u) => u.nodeName == "BR");
      if (d.length == 2) {
        let [u, f] = d;
        u.parentNode && u.parentNode.parentNode == f.parentNode ? f.remove() : u.remove();
      } else {
        let { focusNode: u } = this.currentSelection;
        for (let f of d) {
          let p = f.parentNode;
          p && p.nodeName == "LI" && (!u || Ly(e, u) != p) && f.remove();
        }
      }
    }
    let c = null;
    o < 0 && i && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && ps(r) && (c = Sa(e)) && c.eq(B.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, Ft(e), this.currentSelection.set(r)) : (o > -1 || i) && (o > -1 && (e.docView.markDirty(o, s), Iy(e)), this.handleDOMChange(o, s, l, a), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(r) || Ft(e), this.currentSelection.set(r));
  }
  registerMutation(e, t) {
    if (t.indexOf(e.target) > -1)
      return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (r == this.view.docView || e.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
    e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !r || r.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let d = 0; d < e.addedNodes.length; d++) {
        let u = e.addedNodes[d];
        t.push(u), u.nodeType == 3 && (this.lastChangedTextNode = u);
      }
      if (r.contentDOM && r.contentDOM != r.dom && !r.contentDOM.contains(e.target))
        return { from: r.posBefore, to: r.posAfter };
      let i = e.previousSibling, o = e.nextSibling;
      if (Le && ln <= 11 && e.addedNodes.length)
        for (let d = 0; d < e.addedNodes.length; d++) {
          let { previousSibling: u, nextSibling: f } = e.addedNodes[d];
          (!u || Array.prototype.indexOf.call(e.addedNodes, u) < 0) && (i = u), (!f || Array.prototype.indexOf.call(e.addedNodes, f) < 0) && (o = f);
        }
      let s = i && i.parentNode == e.target ? ke(i) + 1 : 0, l = r.localPosFromDOM(e.target, s, -1), a = o && o.parentNode == e.target ? ke(o) : e.target.childNodes.length, c = r.localPosFromDOM(e.target, a, 1);
      return { from: l, to: c };
    } else return e.type == "attributes" ? { from: r.posAtStart - r.border, to: r.posAtEnd + r.border } : (this.lastChangedTextNode = e.target, {
      from: r.posAtStart,
      to: r.posAtEnd,
      // An event was generated for a text change that didn't change
      // any text. Mark the dom change to fall back to assuming the
      // selection was typed over with an identical value if it can't
      // find another change.
      typeOver: e.target.nodeValue == e.oldValue
    });
  }
}
let od = /* @__PURE__ */ new WeakMap(), sd = !1;
function Iy(n) {
  if (!od.has(n) && (od.set(n, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(n.dom).whiteSpace) !== -1)) {
    if (n.requiresGeckoHackNode = it, sd)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), sd = !0;
  }
}
function ld(n, e) {
  let t = e.startContainer, r = e.startOffset, i = e.endContainer, o = e.endOffset, s = n.domAtPos(n.state.selection.anchor);
  return Ln(s.node, s.offset, i, o) && ([t, r, i, o] = [i, o, t, r]), { anchorNode: t, anchorOffset: r, focusNode: i, focusOffset: o };
}
function Py(n, e) {
  if (e.getComposedRanges) {
    let i = e.getComposedRanges(n.root)[0];
    if (i)
      return ld(n, i);
  }
  let t;
  function r(i) {
    i.preventDefault(), i.stopImmediatePropagation(), t = i.getTargetRanges()[0];
  }
  return n.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), n.dom.removeEventListener("beforeinput", r, !0), t ? ld(n, t) : null;
}
function Ly(n, e) {
  for (let t = e.parentNode; t && t != n.dom; t = t.parentNode) {
    let r = n.docView.nearestDesc(t, !0);
    if (r && r.node.isBlock)
      return t;
  }
  return null;
}
function By(n, e, t) {
  let { node: r, fromOffset: i, toOffset: o, from: s, to: l } = n.docView.parseRange(e, t), a = n.domSelectionRange(), c, d = a.anchorNode;
  if (d && n.dom.contains(d.nodeType == 1 ? d : d.parentNode) && (c = [{ node: d, offset: a.anchorOffset }], ps(a) || c.push({ node: a.focusNode, offset: a.focusOffset })), Me && n.input.lastKeyCode === 8)
    for (let g = o; g > i; g--) {
      let y = r.childNodes[g - 1], w = y.pmViewDesc;
      if (y.nodeName == "BR" && !w) {
        o = g;
        break;
      }
      if (!w || w.size)
        break;
    }
  let u = n.state.doc, f = n.someProp("domParser") || sn.fromSchema(n.state.schema), p = u.resolve(s), h = null, m = f.parse(r, {
    topNode: p.parent,
    topMatch: p.parent.contentMatchAt(p.index()),
    topOpen: !0,
    from: i,
    to: o,
    preserveWhitespace: p.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: c,
    ruleFromNode: zy,
    context: p
  });
  if (c && c[0].pos != null) {
    let g = c[0].pos, y = c[1] && c[1].pos;
    y == null && (y = g), h = { anchor: g + s, head: y + s };
  }
  return { doc: m, sel: h, from: s, to: l };
}
function zy(n) {
  let e = n.pmViewDesc;
  if (e)
    return e.parseRule();
  if (n.nodeName == "BR" && n.parentNode) {
    if (_e && /^(ul|ol)$/i.test(n.parentNode.nodeName)) {
      let t = document.createElement("div");
      return t.appendChild(document.createElement("li")), { skip: t };
    } else if (n.parentNode.lastChild == n || _e && /^(tr|table)$/i.test(n.parentNode.nodeName))
      return { ignore: !0 };
  } else if (n.nodeName == "IMG" && n.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const Fy = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function Hy(n, e, t, r, i) {
  let o = n.input.compositionPendingChanges || (n.composing ? n.input.compositionID : 0);
  if (n.input.compositionPendingChanges = 0, e < 0) {
    let R = n.input.lastSelectionTime > Date.now() - 50 ? n.input.lastSelectionOrigin : null, j = Sa(n, R);
    if (j && !n.state.selection.eq(j)) {
      if (Me && Lt && n.input.lastKeyCode === 13 && Date.now() - 100 < n.input.lastKeyCodeTime && n.someProp("handleKeyDown", (K) => K(n, xn(13, "Enter"))))
        return;
      let q = n.state.tr.setSelection(j);
      R == "pointer" ? q.setMeta("pointer", !0) : R == "key" && q.scrollIntoView(), o && q.setMeta("composition", o), n.dispatch(q);
    }
    return;
  }
  let s = n.state.doc.resolve(e), l = s.sharedDepth(t);
  e = s.before(l + 1), t = n.state.doc.resolve(t).after(l + 1);
  let a = n.state.selection, c = By(n, e, t), d = n.state.doc, u = d.slice(c.from, c.to), f, p;
  n.input.lastKeyCode === 8 && Date.now() - 100 < n.input.lastKeyCodeTime ? (f = n.state.selection.to, p = "end") : (f = n.state.selection.from, p = "start"), n.input.lastKeyCode = null;
  let h = jy(u.content, c.doc.content, c.from, f, p);
  if (h && n.input.domChangeCount++, (mr && n.input.lastIOSEnter > Date.now() - 225 || Lt) && i.some((R) => R.nodeType == 1 && !Fy.test(R.nodeName)) && (!h || h.endA >= h.endB) && n.someProp("handleKeyDown", (R) => R(n, xn(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (!h)
    if (r && a instanceof L && !a.empty && a.$head.sameParent(a.$anchor) && !n.composing && !(c.sel && c.sel.anchor != c.sel.head))
      h = { start: a.from, endA: a.to, endB: a.to };
    else {
      if (c.sel) {
        let R = ad(n, n.state.doc, c.sel);
        if (R && !R.eq(n.state.selection)) {
          let j = n.state.tr.setSelection(R);
          o && j.setMeta("composition", o), n.dispatch(j);
        }
      }
      return;
    }
  n.state.selection.from < n.state.selection.to && h.start == h.endB && n.state.selection instanceof L && (h.start > n.state.selection.from && h.start <= n.state.selection.from + 2 && n.state.selection.from >= c.from ? h.start = n.state.selection.from : h.endA < n.state.selection.to && h.endA >= n.state.selection.to - 2 && n.state.selection.to <= c.to && (h.endB += n.state.selection.to - h.endA, h.endA = n.state.selection.to)), Le && ln <= 11 && h.endB == h.start + 1 && h.endA == h.start && h.start > c.from && c.doc.textBetween(h.start - c.from - 1, h.start - c.from + 1) == "  " && (h.start--, h.endA--, h.endB--);
  let m = c.doc.resolveNoCache(h.start - c.from), g = c.doc.resolveNoCache(h.endB - c.from), y = d.resolve(h.start), w = m.sameParent(g) && m.parent.inlineContent && y.end() >= h.endA, A;
  if ((mr && n.input.lastIOSEnter > Date.now() - 225 && (!w || i.some((R) => R.nodeName == "DIV" || R.nodeName == "P")) || !w && m.pos < c.doc.content.size && !m.sameParent(g) && (A = B.findFrom(c.doc.resolve(m.pos + 1), 1, !0)) && A.head == g.pos) && n.someProp("handleKeyDown", (R) => R(n, xn(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (n.state.selection.anchor > h.start && $y(d, h.start, h.endA, m, g) && n.someProp("handleKeyDown", (R) => R(n, xn(8, "Backspace")))) {
    Lt && Me && n.domObserver.suppressSelectionUpdates();
    return;
  }
  Me && h.endB == h.start && (n.input.lastChromeDelete = Date.now()), Lt && !w && m.start() != g.start() && g.parentOffset == 0 && m.depth == g.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == h.endA && (h.endB -= 2, g = c.doc.resolveNoCache(h.endB - c.from), setTimeout(() => {
    n.someProp("handleKeyDown", function(R) {
      return R(n, xn(13, "Enter"));
    });
  }, 20));
  let b = h.start, C = h.endA, v, _, z;
  if (w) {
    if (m.pos == g.pos)
      Le && ln <= 11 && m.parentOffset == 0 && (n.domObserver.suppressSelectionUpdates(), setTimeout(() => Ft(n), 20)), v = n.state.tr.delete(b, C), _ = d.resolve(h.start).marksAcross(d.resolve(h.endA));
    else if (
      // Adding or removing a mark
      h.endA == h.endB && (z = Vy(m.parent.content.cut(m.parentOffset, g.parentOffset), y.parent.content.cut(y.parentOffset, h.endA - y.start())))
    )
      v = n.state.tr, z.type == "add" ? v.addMark(b, C, z.mark) : v.removeMark(b, C, z.mark);
    else if (m.parent.child(m.index()).isText && m.index() == g.index() - (g.textOffset ? 0 : 1)) {
      let R = m.parent.textBetween(m.parentOffset, g.parentOffset);
      if (n.someProp("handleTextInput", (j) => j(n, b, C, R)))
        return;
      v = n.state.tr.insertText(R, b, C);
    }
  }
  if (v || (v = n.state.tr.replace(b, C, c.doc.slice(h.start - c.from, h.endB - c.from))), c.sel) {
    let R = ad(n, v.doc, c.sel);
    R && !(Me && n.composing && R.empty && (h.start != h.endB || n.input.lastChromeDelete < Date.now() - 100) && (R.head == b || R.head == v.mapping.map(C) - 1) || Le && R.empty && R.head == b) && v.setSelection(R);
  }
  _ && v.ensureMarks(_), o && v.setMeta("composition", o), n.dispatch(v.scrollIntoView());
}
function ad(n, e, t) {
  return Math.max(t.anchor, t.head) > e.content.size ? null : xa(n, e.resolve(t.anchor), e.resolve(t.head));
}
function Vy(n, e) {
  let t = n.firstChild.marks, r = e.firstChild.marks, i = t, o = r, s, l, a;
  for (let d = 0; d < r.length; d++)
    i = r[d].removeFromSet(i);
  for (let d = 0; d < t.length; d++)
    o = t[d].removeFromSet(o);
  if (i.length == 1 && o.length == 0)
    l = i[0], s = "add", a = (d) => d.mark(l.addToSet(d.marks));
  else if (i.length == 0 && o.length == 1)
    l = o[0], s = "remove", a = (d) => d.mark(l.removeFromSet(d.marks));
  else
    return null;
  let c = [];
  for (let d = 0; d < e.childCount; d++)
    c.push(a(e.child(d)));
  if (x.from(c).eq(n))
    return { mark: l, type: s };
}
function $y(n, e, t, r, i) {
  if (
    // The content must have shrunk
    t - e <= i.pos - r.pos || // newEnd must point directly at or after the end of the block that newStart points into
    Ks(r, !0, !1) < i.pos
  )
    return !1;
  let o = n.resolve(e);
  if (!r.parent.isTextblock) {
    let l = o.nodeAfter;
    return l != null && t == e + l.nodeSize;
  }
  if (o.parentOffset < o.parent.content.size || !o.parent.isTextblock)
    return !1;
  let s = n.resolve(Ks(o, !0, !0));
  return !s.parent.isTextblock || s.pos > t || Ks(s, !0, !1) < t ? !1 : r.parent.content.cut(r.parentOffset).eq(s.parent.content);
}
function Ks(n, e, t) {
  let r = n.depth, i = e ? n.end() : n.pos;
  for (; r > 0 && (e || n.indexAfter(r) == n.node(r).childCount); )
    r--, i++, e = !1;
  if (t) {
    let o = n.node(r).maybeChild(n.indexAfter(r));
    for (; o && !o.isLeaf; )
      o = o.firstChild, i++;
  }
  return i;
}
function jy(n, e, t, r, i) {
  let o = n.findDiffStart(e, t);
  if (o == null)
    return null;
  let { a: s, b: l } = n.findDiffEnd(e, t + n.size, t + e.size);
  if (i == "end") {
    let a = Math.max(0, o - Math.min(s, l));
    r -= s + a - o;
  }
  if (s < o && n.size < e.size) {
    let a = r <= o && r >= s ? o - r : 0;
    o -= a, o && o < e.size && cd(e.textBetween(o - 1, o + 1)) && (o += a ? 1 : -1), l = o + (l - s), s = o;
  } else if (l < o) {
    let a = r <= o && r >= l ? o - r : 0;
    o -= a, o && o < n.size && cd(n.textBetween(o - 1, o + 1)) && (o += a ? 1 : -1), s = o + (s - l), l = o;
  }
  return { start: o, endA: s, endB: l };
}
function cd(n) {
  if (n.length != 2)
    return !1;
  let e = n.charCodeAt(0), t = n.charCodeAt(1);
  return e >= 56320 && e <= 57343 && t >= 55296 && t <= 56319;
}
class Wy {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, t) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new cy(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(hd), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = fd(this), ud(this), this.nodeViews = pd(this), this.docView = Wc(this.state.doc, dd(this), Us(this), this.dom, this), this.domObserver = new Ry(this, (r, i, o, s) => Hy(this, r, i, o, s)), this.domObserver.start(), dy(this), this.updatePluginViews();
  }
  /**
  Holds `true` when a
  [composition](https://w3c.github.io/uievents/#events-compositionevents)
  is active.
  */
  get composing() {
    return this.input.composing;
  }
  /**
  The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).
  */
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let t in e)
        this._props[t] = e[t];
      this._props.state = this.state;
    }
    return this._props;
  }
  /**
  Update the view's props. Will immediately cause an update to
  the DOM.
  */
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && _l(this);
    let t = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(hd), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
  }
  /**
  Update the view by updating existing props object with the object
  given as argument. Equivalent to `view.update(Object.assign({},
  view.props, props))`.
  */
  setProps(e) {
    let t = {};
    for (let r in this._props)
      t[r] = this._props[r];
    t.state = this.state;
    for (let r in e)
      t[r] = e[r];
    this.update(t);
  }
  /**
  Update the editor's `state` prop, without touching any of the
  other props.
  */
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, t) {
    var r;
    let i = this.state, o = !1, s = !1;
    e.storedMarks && this.composing && (up(this), s = !0), this.state = e;
    let l = i.plugins != e.plugins || this._props.plugins != t.plugins;
    if (l || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
      let p = pd(this);
      Ky(p, this.nodeViews) && (this.nodeViews = p, o = !0);
    }
    (l || t.handleDOMEvents != this._props.handleDOMEvents) && _l(this), this.editable = fd(this), ud(this);
    let a = Us(this), c = dd(this), d = i.plugins != e.plugins && !i.doc.eq(e.doc) ? "reset" : e.scrollToSelection > i.scrollToSelection ? "to selection" : "preserve", u = o || !this.docView.matchesNode(e.doc, c, a);
    (u || !e.selection.eq(i.selection)) && (s = !0);
    let f = d == "preserve" && s && this.dom.style.overflowAnchor == null && Cg(this);
    if (s) {
      this.domObserver.stop();
      let p = u && (Le || Me) && !this.composing && !i.selection.empty && !e.selection.empty && Uy(i.selection, e.selection);
      if (u) {
        let h = Me ? this.trackWrites = this.domSelectionRange().focusNode : null;
        this.composing && (this.input.compositionNode = ky(this)), (o || !this.docView.update(e.doc, c, a, this)) && (this.docView.updateOuterDeco(c), this.docView.destroy(), this.docView = Wc(e.doc, c, a, this.dom, this)), h && !this.trackWrites && (p = !0);
      }
      p || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && Gg(this)) ? Ft(this, p) : (Qf(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(i), !((r = this.dragging) === null || r === void 0) && r.node && !i.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, i), d == "reset" ? this.dom.scrollTop = 0 : d == "to selection" ? this.scrollToSelection() : f && Tg(f);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode))) {
      if (!this.someProp("handleScrollToSelection", (t) => t(this))) if (this.state.selection instanceof P) {
        let t = this.docView.domAfterPos(this.state.selection.from);
        t.nodeType == 1 && zc(this, t.getBoundingClientRect(), e);
      } else
        zc(this, this.coordsAtPos(this.state.selection.head, 1), e);
    }
  }
  destroyPluginViews() {
    let e;
    for (; e = this.pluginViews.pop(); )
      e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let t = 0; t < this.directPlugins.length; t++) {
        let r = this.directPlugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let t = 0; t < this.state.plugins.length; t++) {
        let r = this.state.plugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let t = 0; t < this.pluginViews.length; t++) {
        let r = this.pluginViews[t];
        r.update && r.update(this, e);
      }
  }
  updateDraggedNode(e, t) {
    let r = e.node, i = -1;
    if (this.state.doc.nodeAt(r.from) == r.node)
      i = r.from;
    else {
      let o = r.from + (this.state.doc.content.size - t.doc.content.size);
      (o > 0 && this.state.doc.nodeAt(o)) == r.node && (i = o);
    }
    this.dragging = new pp(e.slice, e.move, i < 0 ? void 0 : P.create(this.state.doc, i));
  }
  someProp(e, t) {
    let r = this._props && this._props[e], i;
    if (r != null && (i = t ? t(r) : r))
      return i;
    for (let s = 0; s < this.directPlugins.length; s++) {
      let l = this.directPlugins[s].props[e];
      if (l != null && (i = t ? t(l) : l))
        return i;
    }
    let o = this.state.plugins;
    if (o)
      for (let s = 0; s < o.length; s++) {
        let l = o[s].props[e];
        if (l != null && (i = t ? t(l) : l))
          return i;
      }
  }
  /**
  Query whether the view has focus.
  */
  hasFocus() {
    if (Le) {
      let e = this.root.activeElement;
      if (e == this.dom)
        return !0;
      if (!e || !this.dom.contains(e))
        return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == "false")
          return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  /**
  Focus the editor.
  */
  focus() {
    this.domObserver.stop(), this.editable && Ag(this.dom), Ft(this), this.domObserver.start();
  }
  /**
  Get the document root in which the editor exists. This will
  usually be the top-level `document`, but might be a [shadow
  DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
  root if the editor is inside one.
  */
  get root() {
    let e = this._root;
    if (e == null) {
      for (let t = this.dom.parentNode; t; t = t.parentNode)
        if (t.nodeType == 9 || t.nodeType == 11 && t.host)
          return t.getSelection || (Object.getPrototypeOf(t).getSelection = () => t.ownerDocument.getSelection()), this._root = t;
    }
    return e || document;
  }
  /**
  When an existing editor view is moved to a new document or
  shadow tree, call this to make it recompute its root.
  */
  updateRoot() {
    this._root = null;
  }
  /**
  Given a pair of viewport coordinates, return the document
  position that corresponds to them. May return null if the given
  coordinates aren't inside of the editor. When an object is
  returned, its `pos` property is the position nearest to the
  coordinates, and its `inside` property holds the position of the
  inner node that the position falls inside of, or -1 if it is at
  the top level, not in any node.
  */
  posAtCoords(e) {
    return Dg(this, e);
  }
  /**
  Returns the viewport rectangle at a given document position.
  `left` and `right` will be the same number, as this returns a
  flat cursor-ish rectangle. If the position is between two things
  that aren't directly adjacent, `side` determines which element
  is used. When < 0, the element before the position is used,
  otherwise the element after.
  */
  coordsAtPos(e, t = 1) {
    return Uf(this, e, t);
  }
  /**
  Find the DOM position that corresponds to the given document
  position. When `side` is negative, find the position as close as
  possible to the content before the position. When positive,
  prefer positions close to the content after the position. When
  zero, prefer as shallow a position as possible.
  
  Note that you should **not** mutate the editor's internal DOM,
  only inspect it (and even that is usually not necessary).
  */
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
  }
  /**
  Find the DOM node that represents the document node after the
  given position. May return `null` when the position doesn't point
  in front of a node or if the node is inside an opaque node view.
  
  This is intended to be able to call things like
  `getBoundingClientRect` on that DOM node. Do **not** mutate the
  editor DOM directly, or add styling this way, since that will be
  immediately overriden by the editor as it redraws the node.
  */
  nodeDOM(e) {
    let t = this.docView.descAt(e);
    return t ? t.nodeDOM : null;
  }
  /**
  Find the document position that corresponds to a given DOM
  position. (Whenever possible, it is preferable to inspect the
  document structure directly, rather than poking around in the
  DOM, but sometimes—for example when interpreting an event
  target—you don't have a choice.)
  
  The `bias` parameter can be used to influence which side of a DOM
  node to use when the position is inside a leaf node.
  */
  posAtDOM(e, t, r = -1) {
    let i = this.docView.posFromDOM(e, t, r);
    if (i == null)
      throw new RangeError("DOM position not inside the editor");
    return i;
  }
  /**
  Find out whether the selection is at the end of a textblock when
  moving in a given direction. When, for example, given `"left"`,
  it will return true if moving left from the current cursor
  position would leave that position's parent textblock. Will apply
  to the view's current state by default, but it is possible to
  pass a different state.
  */
  endOfTextblock(e, t) {
    return Lg(this, t || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, t) {
    return ci(this, "", e, !1, t || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, t) {
    return ci(this, e, null, !0, t || new ClipboardEvent("paste"));
  }
  /**
  Serialize the given slice as it would be if it was copied from
  this editor. Returns a DOM element that contains a
  representation of the slice as its children, a textual
  representation, and the transformed slice (which can be
  different from the given input due to hooks like
  [`transformCopied`](https://prosemirror.net/docs/ref/#view.EditorProps.transformCopied)).
  */
  serializeForClipboard(e) {
    return ka(this, e);
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && (uy(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], Us(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, pg());
  }
  /**
  This is true when the view has been
  [destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
  used anymore).
  */
  get isDestroyed() {
    return this.docView == null;
  }
  /**
  Used for testing.
  */
  dispatchEvent(e) {
    return py(this, e);
  }
  /**
  Dispatch a transaction. Will call
  [`dispatchTransaction`](https://prosemirror.net/docs/ref/#view.DirectEditorProps.dispatchTransaction)
  when given, and otherwise defaults to applying the transaction to
  the current state and calling
  [`updateState`](https://prosemirror.net/docs/ref/#view.EditorView.updateState) with the result.
  This method is bound to the view instance, so that it can be
  easily passed around.
  */
  dispatch(e) {
    let t = this._props.dispatchTransaction;
    t ? t.call(this, e) : this.updateState(this.state.apply(e));
  }
  /**
  @internal
  */
  domSelectionRange() {
    let e = this.domSelection();
    return e ? _e && this.root.nodeType === 11 && bg(this.dom.ownerDocument) == this.dom && Py(this, e) || e : { focusNode: null, focusOffset: 0, anchorNode: null, anchorOffset: 0 };
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
function dd(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(n.editable), n.someProp("attributes", (t) => {
    if (typeof t == "function" && (t = t(n.state)), t)
      for (let r in t)
        r == "class" ? e.class += " " + t[r] : r == "style" ? e.style = (e.style ? e.style + ";" : "") + t[r] : !e[r] && r != "contenteditable" && r != "nodeName" && (e[r] = String(t[r]));
  }), e.translate || (e.translate = "no"), [Te.node(0, n.state.doc.content.size, e)];
}
function ud(n) {
  if (n.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), n.cursorWrapper = { dom: e, deco: Te.widget(n.state.selection.from, e, { raw: !0, marks: n.markCursor }) };
  } else
    n.cursorWrapper = null;
}
function fd(n) {
  return !n.someProp("editable", (e) => e(n.state) === !1);
}
function Uy(n, e) {
  let t = Math.min(n.$anchor.sharedDepth(n.head), e.$anchor.sharedDepth(e.head));
  return n.$anchor.start(t) != e.$anchor.start(t);
}
function pd(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(r) {
    for (let i in r)
      Object.prototype.hasOwnProperty.call(e, i) || (e[i] = r[i]);
  }
  return n.someProp("nodeViews", t), n.someProp("markViews", t), e;
}
function Ky(n, e) {
  let t = 0, r = 0;
  for (let i in n) {
    if (n[i] != e[i])
      return !0;
    t++;
  }
  for (let i in e)
    r++;
  return t != r;
}
function hd(n) {
  if (n.spec.state || n.spec.filterTransaction || n.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var un = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, Oo = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, qy = typeof navigator < "u" && /Mac/.test(navigator.platform), Gy = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var Ce = 0; Ce < 10; Ce++) un[48 + Ce] = un[96 + Ce] = String(Ce);
for (var Ce = 1; Ce <= 24; Ce++) un[Ce + 111] = "F" + Ce;
for (var Ce = 65; Ce <= 90; Ce++)
  un[Ce] = String.fromCharCode(Ce + 32), Oo[Ce] = String.fromCharCode(Ce);
for (var qs in un) Oo.hasOwnProperty(qs) || (Oo[qs] = un[qs]);
function Jy(n) {
  var e = qy && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || Gy && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? Oo : un)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
const Yy = typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : !1;
function Xy(n) {
  let e = n.split(/-(?!$)/), t = e[e.length - 1];
  t == "Space" && (t = " ");
  let r, i, o, s;
  for (let l = 0; l < e.length - 1; l++) {
    let a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      s = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      o = !0;
    else if (/^mod$/i.test(a))
      Yy ? s = !0 : i = !0;
    else
      throw new Error("Unrecognized modifier name: " + a);
  }
  return r && (t = "Alt-" + t), i && (t = "Ctrl-" + t), s && (t = "Meta-" + t), o && (t = "Shift-" + t), t;
}
function Zy(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n)
    e[Xy(t)] = n[t];
  return e;
}
function Gs(n, e, t = !0) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t && e.shiftKey && (n = "Shift-" + n), n;
}
function Qy(n) {
  return new ne({ props: { handleKeyDown: Oa(n) } });
}
function Oa(n) {
  let e = Zy(n);
  return function(t, r) {
    let i = Jy(r), o, s = e[Gs(i, r)];
    if (s && s(t.state, t.dispatch, t))
      return !0;
    if (i.length == 1 && i != " ") {
      if (r.shiftKey) {
        let l = e[Gs(i, r, !1)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
      if ((r.shiftKey || r.altKey || r.metaKey || i.charCodeAt(0) > 127) && (o = un[r.keyCode]) && o != i) {
        let l = e[Gs(o, r)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
    }
    return !1;
  };
}
const gs = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function bp(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const vp = (n, e, t) => {
  let r = bp(n, t);
  if (!r)
    return !1;
  let i = Na(r);
  if (!i) {
    let s = r.blockRange(), l = s && Tr(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (Ep(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (gr(o, "end") || P.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = us(n.doc, r.before(s), r.after(s), M.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = n.tr.step(l);
          a.setSelection(gr(o, "end") ? B.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : P.create(a.doc, i.pos - o.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, eb = (n, e, t) => {
  let r = bp(n, t);
  if (!r)
    return !1;
  let i = Na(r);
  return i ? wp(n, i, e) : !1;
}, tb = (n, e, t) => {
  let r = xp(n, t);
  if (!r)
    return !1;
  let i = Da(r);
  return i ? wp(n, i, e) : !1;
};
function wp(n, e, t) {
  let r = e.nodeBefore, i = r, o = e.pos - 1;
  for (; !i.isTextblock; o--) {
    if (i.type.spec.isolating)
      return !1;
    let d = i.lastChild;
    if (!d)
      return !1;
    i = d;
  }
  let s = e.nodeAfter, l = s, a = e.pos + 1;
  for (; !l.isTextblock; a++) {
    if (l.type.spec.isolating)
      return !1;
    let d = l.firstChild;
    if (!d)
      return !1;
    l = d;
  }
  let c = us(n.doc, o, a, M.empty);
  if (!c || c.from != o || c instanceof me && c.slice.size >= a - o)
    return !1;
  if (t) {
    let d = n.tr.step(c);
    d.setSelection(L.create(d.doc, o)), t(d.scrollIntoView());
  }
  return !0;
}
function gr(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Sp = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = Na(r);
  }
  let s = o && o.nodeBefore;
  return !s || !P.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(P.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function Na(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function xp(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const kp = (n, e, t) => {
  let r = xp(n, t);
  if (!r)
    return !1;
  let i = Da(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (Ep(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (gr(o, "start") || P.isSelectable(o))) {
    let s = us(n.doc, r.before(), r.after(), M.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(gr(o, "start") ? B.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : P.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, Cp = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Da(r);
  }
  let s = o && o.nodeAfter;
  return !s || !P.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(P.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function Da(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      let t = n.node(e);
      if (n.index(e) + 1 < t.childCount)
        return n.doc.resolve(n.after(e + 1));
      if (t.type.spec.isolating)
        break;
    }
  return null;
}
const nb = (n, e) => {
  let t = n.selection, r = t instanceof P, i;
  if (r) {
    if (t.node.isTextblock || !fn(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = ds(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(P.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, rb = (n, e) => {
  let t = n.selection, r;
  if (t instanceof P) {
    if (t.node.isTextblock || !fn(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = ds(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, ib = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && Tr(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, Tp = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function _a(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const ob = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = _a(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, s.createAndFill());
    a.setSelection(B.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, Ap = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof je || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = _a(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(L.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, Mp = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (zt(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Tr(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function sb(n) {
  return (e, t) => {
    let { $from: r, $to: i } = e.selection;
    if (e.selection instanceof P && e.selection.node.isBlock)
      return !r.parentOffset || !zt(e.doc, r.pos) ? !1 : (t && t(e.tr.split(r.pos).scrollIntoView()), !0);
    if (!r.depth)
      return !1;
    let o = [], s, l, a = !1, c = !1;
    for (let p = r.depth; ; p--)
      if (r.node(p).isBlock) {
        a = r.end(p) == r.pos + (r.depth - p), c = r.start(p) == r.pos - (r.depth - p), l = _a(r.node(p - 1).contentMatchAt(r.indexAfter(p - 1))), o.unshift(a && l ? { type: l } : null), s = p;
        break;
      } else {
        if (p == 1)
          return !1;
        o.unshift(null);
      }
    let d = e.tr;
    (e.selection instanceof L || e.selection instanceof je) && d.deleteSelection();
    let u = d.mapping.map(r.pos), f = zt(d.doc, u, o.length, o);
    if (f || (o[0] = l ? { type: l } : null, f = zt(d.doc, u, o.length, o)), d.split(u, o.length, o), !a && c && r.node(s).type != l) {
      let p = d.mapping.map(r.before(s)), h = d.doc.resolve(p);
      l && r.node(s - 1).canReplaceWith(h.index(), h.index() + 1, l) && d.setNodeMarkup(d.mapping.map(r.before(s)), l);
    }
    return t && t(d.scrollIntoView()), !0;
  };
}
const lb = sb(), ab = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(P.create(n.doc, i))), !0);
};
function cb(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || fn(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function Ep(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, a = i.type.spec.isolating || o.type.spec.isolating;
  if (!a && cb(n, e, t))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let p = e.pos + o.nodeSize, h = x.empty;
      for (let y = s.length - 1; y >= 0; y--)
        h = x.from(s[y].create(null, h));
      h = x.from(i.copy(h));
      let m = n.tr.step(new ge(e.pos - 1, p, e.pos, p, new M(h, 1, 0), s.length, !0)), g = m.doc.resolve(p + 2 * s.length);
      g.nodeAfter && g.nodeAfter.type == i.type && fn(m.doc, g.pos) && m.join(g.pos), t(m.scrollIntoView());
    }
    return !0;
  }
  let d = o.type.spec.isolating || r > 0 && a ? null : B.findFrom(e, 1), u = d && d.$from.blockRange(d.$to), f = u && Tr(u);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(u, f).scrollIntoView()), !0;
  if (c && gr(o, "start", !0) && gr(i, "end")) {
    let p = i, h = [];
    for (; h.push(p), !p.isTextblock; )
      p = p.lastChild;
    let m = o, g = 1;
    for (; !m.isTextblock; m = m.firstChild)
      g++;
    if (p.canReplace(p.childCount, p.childCount, m.content)) {
      if (t) {
        let y = x.empty;
        for (let A = h.length - 1; A >= 0; A--)
          y = x.from(h[A].copy(y));
        let w = n.tr.step(new ge(e.pos - h.length, e.pos + o.nodeSize, e.pos + g, e.pos + o.nodeSize - g, new M(y, h.length, 0), 0, !0));
        t(w.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Op(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(L.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const db = Op(-1), ub = Op(1);
function fb(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && ya(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function md(n, e = null) {
  return function(t, r) {
    let i = !1;
    for (let o = 0; o < t.selection.ranges.length && !i; o++) {
      let { $from: { pos: s }, $to: { pos: l } } = t.selection.ranges[o];
      t.doc.nodesBetween(s, l, (a, c) => {
        if (i)
          return !1;
        if (!(!a.isTextblock || a.hasMarkup(n, e)))
          if (a.type == n)
            i = !0;
          else {
            let d = t.doc.resolve(c), u = d.index();
            i = d.parent.canReplaceWith(u, u + 1, n);
          }
      });
    }
    if (!i)
      return !1;
    if (r) {
      let o = t.tr;
      for (let s = 0; s < t.selection.ranges.length; s++) {
        let { $from: { pos: l }, $to: { pos: a } } = t.selection.ranges[s];
        o.setBlockType(l, a, n, e);
      }
      r(o.scrollIntoView());
    }
    return !0;
  };
}
function Ra(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
Ra(gs, vp, Sp);
Ra(gs, kp, Cp);
Ra(Tp, Ap, Mp, lb);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function pb(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return hb(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function hb(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let a = s.resolve(e.start - 2);
    o = new xo(a, a, e.depth), e.endIndex < e.parent.childCount && (e = new xo(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = ya(o, t, r, e);
  return l ? (n && mb(n, e, l, i, t), !0) : !1;
}
function mb(n, e, t, r, i) {
  let o = x.empty;
  for (let d = t.length - 1; d >= 0; d--)
    o = x.from(t[d].type.create(t[d].attrs, o));
  n.step(new ge(e.start - (r ? 2 : 0), e.end, e.start, e.end, new M(o, 0, 0), t.length, !0));
  let s = 0;
  for (let d = 0; d < t.length; d++)
    t[d].type == i && (s = d + 1);
  let l = t.length - s, a = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let d = e.startIndex, u = e.endIndex, f = !0; d < u; d++, f = !1)
    !f && zt(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += c.child(d).nodeSize;
  return n;
}
function gb(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? yb(e, t, n, o) : bb(e, t, o) : !0 : !1;
  };
}
function yb(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new ge(o - 1, s, o, s, new M(x.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new xo(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = Tr(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.mapping.map(o, -1) - 1;
  return fn(i.doc, a) && i.join(a), e(i.scrollIntoView()), !0;
}
function bb(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let p = t.end, h = t.endIndex - 1, m = t.startIndex; h > m; h--)
    p -= i.child(h).nodeSize, r.delete(p - 1, p + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, c = o.node(-1), d = o.index(-1);
  if (!c.canReplace(d + (l ? 0 : 1), d + 1, s.content.append(a ? x.empty : x.from(i))))
    return !1;
  let u = o.pos, f = u + s.nodeSize;
  return r.step(new ge(u - (l ? 1 : 0), f + (a ? 1 : 0), u + 1, f - 1, new M((l ? x.empty : x.from(i.copy(x.empty))).append(a ? x.empty : x.from(i.copy(x.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function vb(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (c) => c.childCount > 0 && c.firstChild.type == n);
    if (!o)
      return !1;
    let s = o.startIndex;
    if (s == 0)
      return !1;
    let l = o.parent, a = l.child(s - 1);
    if (a.type != n)
      return !1;
    if (t) {
      let c = a.lastChild && a.lastChild.type == l.type, d = x.from(c ? n.create() : null), u = new M(x.from(n.create(null, x.from(l.type.create(null, d)))), c ? 3 : 1, 0), f = o.start, p = o.end;
      t(e.tr.step(new ge(f - (c ? 3 : 1), p, f, p, u, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function ys(n) {
  const { state: e, transaction: t } = n;
  let { selection: r } = t, { doc: i } = t, { storedMarks: o } = t;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return o;
    },
    get selection() {
      return r;
    },
    get doc() {
      return i;
    },
    get tr() {
      return r = t.selection, i = t.doc, o = t.storedMarks, t;
    }
  };
}
class bs {
  constructor(e) {
    this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: e, editor: t, state: r } = this, { view: i } = t, { tr: o } = r, s = this.buildProps(o);
    return Object.fromEntries(Object.entries(e).map(([l, a]) => [l, (...d) => {
      const u = a(...d)(s);
      return !o.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(o), u;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(e, t = !0) {
    const { rawCommands: r, editor: i, state: o } = this, { view: s } = i, l = [], a = !!e, c = e || o.tr, d = () => (!a && t && !c.getMeta("preventDispatch") && !this.hasCustomState && s.dispatch(c), l.every((f) => f === !0)), u = {
      ...Object.fromEntries(Object.entries(r).map(([f, p]) => [f, (...m) => {
        const g = this.buildProps(c, t), y = p(...m)(g);
        return l.push(y), u;
      }])),
      run: d
    };
    return u;
  }
  createCan(e) {
    const { rawCommands: t, state: r } = this, i = !1, o = e || r.tr, s = this.buildProps(o, i);
    return {
      ...Object.fromEntries(Object.entries(t).map(([a, c]) => [a, (...d) => c(...d)({ ...s, dispatch: void 0 })])),
      chain: () => this.createChain(o, i)
    };
  }
  buildProps(e, t = !0) {
    const { rawCommands: r, editor: i, state: o } = this, { view: s } = i, l = {
      tr: e,
      editor: i,
      view: s,
      state: ys({
        state: o,
        transaction: e
      }),
      dispatch: t ? () => {
      } : void 0,
      chain: () => this.createChain(e, t),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(r).map(([a, c]) => [a, (...d) => c(...d)(l)]));
      }
    };
    return l;
  }
}
class wb {
  constructor() {
    this.callbacks = {};
  }
  on(e, t) {
    return this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t), this;
  }
  emit(e, ...t) {
    const r = this.callbacks[e];
    return r && r.forEach((i) => i.apply(this, t)), this;
  }
  off(e, t) {
    const r = this.callbacks[e];
    return r && (t ? this.callbacks[e] = r.filter((i) => i !== t) : delete this.callbacks[e]), this;
  }
  once(e, t) {
    const r = (...i) => {
      this.off(e, r), t.apply(this, i);
    };
    return this.on(e, r);
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}
function D(n, e, t) {
  return n.config[e] === void 0 && n.parent ? D(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? D(n.parent, e, t) : null
  }) : n.config[e];
}
function vs(n) {
  const e = n.filter((i) => i.type === "extension"), t = n.filter((i) => i.type === "node"), r = n.filter((i) => i.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: t,
    markExtensions: r
  };
}
function Np(n) {
  const e = [], { nodeExtensions: t, markExtensions: r } = vs(n), i = [...t, ...r], o = {
    default: null,
    rendered: !0,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: !0,
    isRequired: !1
  };
  return n.forEach((s) => {
    const l = {
      name: s.name,
      options: s.options,
      storage: s.storage,
      extensions: i
    }, a = D(s, "addGlobalAttributes", l);
    if (!a)
      return;
    a().forEach((d) => {
      d.types.forEach((u) => {
        Object.entries(d.attributes).forEach(([f, p]) => {
          e.push({
            type: u,
            name: f,
            attribute: {
              ...o,
              ...p
            }
          });
        });
      });
    });
  }), i.forEach((s) => {
    const l = {
      name: s.name,
      options: s.options,
      storage: s.storage
    }, a = D(s, "addAttributes", l);
    if (!a)
      return;
    const c = a();
    Object.entries(c).forEach(([d, u]) => {
      const f = {
        ...o,
        ...u
      };
      typeof (f == null ? void 0 : f.default) == "function" && (f.default = f.default()), f != null && f.isRequired && (f == null ? void 0 : f.default) === void 0 && delete f.default, e.push({
        type: s.name,
        name: d,
        attribute: f
      });
    });
  }), e;
}
function ve(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n])
      throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
function ie(...n) {
  return n.filter((e) => !!e).reduce((e, t) => {
    const r = { ...e };
    return Object.entries(t).forEach(([i, o]) => {
      if (!r[i]) {
        r[i] = o;
        return;
      }
      if (i === "class") {
        const l = o ? String(o).split(" ") : [], a = r[i] ? r[i].split(" ") : [], c = l.filter((d) => !a.includes(d));
        r[i] = [...a, ...c].join(" ");
      } else if (i === "style") {
        const l = o ? o.split(";").map((d) => d.trim()).filter(Boolean) : [], a = r[i] ? r[i].split(";").map((d) => d.trim()).filter(Boolean) : [], c = /* @__PURE__ */ new Map();
        a.forEach((d) => {
          const [u, f] = d.split(":").map((p) => p.trim());
          c.set(u, f);
        }), l.forEach((d) => {
          const [u, f] = d.split(":").map((p) => p.trim());
          c.set(u, f);
        }), r[i] = Array.from(c.entries()).map(([d, u]) => `${d}: ${u}`).join("; ");
      } else
        r[i] = o;
    }), r;
  }, {});
}
function Rl(n, e) {
  return e.filter((t) => t.type === n.type.name).filter((t) => t.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(n.attrs) || {} : {
    [t.name]: n.attrs[t.name]
  }).reduce((t, r) => ie(t, r), {});
}
function Dp(n) {
  return typeof n == "function";
}
function $(n, e = void 0, ...t) {
  return Dp(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Sb(n = {}) {
  return Object.keys(n).length === 0 && n.constructor === Object;
}
function xb(n) {
  return typeof n != "string" ? n : n.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(n) : n === "true" ? !0 : n === "false" ? !1 : n;
}
function gd(n, e) {
  return "style" in n ? n : {
    ...n,
    getAttrs: (t) => {
      const r = n.getAttrs ? n.getAttrs(t) : n.attrs;
      if (r === !1)
        return !1;
      const i = e.reduce((o, s) => {
        const l = s.attribute.parseHTML ? s.attribute.parseHTML(t) : xb(t.getAttribute(s.name));
        return l == null ? o : {
          ...o,
          [s.name]: l
        };
      }, {});
      return { ...r, ...i };
    }
  };
}
function yd(n) {
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(n).filter(([e, t]) => e === "attrs" && Sb(t) ? !1 : t != null)
  );
}
function kb(n, e) {
  var t;
  const r = Np(n), { nodeExtensions: i, markExtensions: o } = vs(n), s = (t = i.find((c) => D(c, "topNode"))) === null || t === void 0 ? void 0 : t.name, l = Object.fromEntries(i.map((c) => {
    const d = r.filter((y) => y.type === c.name), u = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, f = n.reduce((y, w) => {
      const A = D(w, "extendNodeSchema", u);
      return {
        ...y,
        ...A ? A(c) : {}
      };
    }, {}), p = yd({
      ...f,
      content: $(D(c, "content", u)),
      marks: $(D(c, "marks", u)),
      group: $(D(c, "group", u)),
      inline: $(D(c, "inline", u)),
      atom: $(D(c, "atom", u)),
      selectable: $(D(c, "selectable", u)),
      draggable: $(D(c, "draggable", u)),
      code: $(D(c, "code", u)),
      whitespace: $(D(c, "whitespace", u)),
      linebreakReplacement: $(D(c, "linebreakReplacement", u)),
      defining: $(D(c, "defining", u)),
      isolating: $(D(c, "isolating", u)),
      attrs: Object.fromEntries(d.map((y) => {
        var w;
        return [y.name, { default: (w = y == null ? void 0 : y.attribute) === null || w === void 0 ? void 0 : w.default }];
      }))
    }), h = $(D(c, "parseHTML", u));
    h && (p.parseDOM = h.map((y) => gd(y, d)));
    const m = D(c, "renderHTML", u);
    m && (p.toDOM = (y) => m({
      node: y,
      HTMLAttributes: Rl(y, d)
    }));
    const g = D(c, "renderText", u);
    return g && (p.toText = g), [c.name, p];
  })), a = Object.fromEntries(o.map((c) => {
    const d = r.filter((g) => g.type === c.name), u = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, f = n.reduce((g, y) => {
      const w = D(y, "extendMarkSchema", u);
      return {
        ...g,
        ...w ? w(c) : {}
      };
    }, {}), p = yd({
      ...f,
      inclusive: $(D(c, "inclusive", u)),
      excludes: $(D(c, "excludes", u)),
      group: $(D(c, "group", u)),
      spanning: $(D(c, "spanning", u)),
      code: $(D(c, "code", u)),
      attrs: Object.fromEntries(d.map((g) => {
        var y;
        return [g.name, { default: (y = g == null ? void 0 : g.attribute) === null || y === void 0 ? void 0 : y.default }];
      }))
    }), h = $(D(c, "parseHTML", u));
    h && (p.parseDOM = h.map((g) => gd(g, d)));
    const m = D(c, "renderHTML", u);
    return m && (p.toDOM = (g) => m({
      mark: g,
      HTMLAttributes: Rl(g, d)
    })), [c.name, p];
  }));
  return new wf({
    topNode: s,
    nodes: l,
    marks: a
  });
}
function Js(n, e) {
  return e.nodes[n] || e.marks[n] || null;
}
function bd(n, e) {
  return Array.isArray(e) ? e.some((t) => (typeof t == "string" ? t : t.name) === n.name) : e;
}
function Ia(n, e) {
  const t = Wn.fromSchema(e).serializeFragment(n), i = document.implementation.createHTMLDocument().createElement("div");
  return i.appendChild(t), i.innerHTML;
}
const Cb = (n, e = 500) => {
  let t = "";
  const r = n.parentOffset;
  return n.parent.nodesBetween(Math.max(0, r - e), r, (i, o, s, l) => {
    var a, c;
    const d = ((c = (a = i.type.spec).toText) === null || c === void 0 ? void 0 : c.call(a, {
      node: i,
      pos: o,
      parent: s,
      index: l
    })) || i.textContent || "%leaf%";
    t += i.isAtom && !i.isText ? d : d.slice(0, Math.max(0, r - o));
  }), t;
};
function Pa(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
class ws {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const Tb = (n, e) => {
  if (Pa(e))
    return e.exec(n);
  const t = e(n);
  if (!t)
    return null;
  const r = [t.text];
  return r.index = t.index, r.input = n, r.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), r.push(t.replaceWith)), r;
};
function ji(n) {
  var e;
  const { editor: t, from: r, to: i, text: o, rules: s, plugin: l } = n, { view: a } = t;
  if (a.composing)
    return !1;
  const c = a.state.doc.resolve(r);
  if (
    // check for code node
    c.parent.type.spec.code || !((e = c.nodeBefore || c.nodeAfter) === null || e === void 0) && e.marks.find((f) => f.type.spec.code)
  )
    return !1;
  let d = !1;
  const u = Cb(c) + o;
  return s.forEach((f) => {
    if (d)
      return;
    const p = Tb(u, f.find);
    if (!p)
      return;
    const h = a.state.tr, m = ys({
      state: a.state,
      transaction: h
    }), g = {
      from: r - (p[0].length - o.length),
      to: i
    }, { commands: y, chain: w, can: A } = new bs({
      editor: t,
      state: m
    });
    f.handler({
      state: m,
      range: g,
      match: p,
      commands: y,
      chain: w,
      can: A
    }) === null || !h.steps.length || (h.setMeta(l, {
      transform: h,
      from: r,
      to: i,
      text: o
    }), a.dispatch(h), d = !0);
  }), d;
}
function Ab(n) {
  const { editor: e, rules: t } = n, r = new ne({
    state: {
      init() {
        return null;
      },
      apply(i, o, s) {
        const l = i.getMeta(r);
        if (l)
          return l;
        const a = i.getMeta("applyInputRules");
        return !!a && setTimeout(() => {
          let { text: d } = a;
          typeof d == "string" ? d = d : d = Ia(x.from(d), s.schema);
          const { from: u } = a, f = u + d.length;
          ji({
            editor: e,
            from: u,
            to: f,
            text: d,
            rules: t,
            plugin: r
          });
        }), i.selectionSet || i.docChanged ? null : o;
      }
    },
    props: {
      handleTextInput(i, o, s, l) {
        return ji({
          editor: e,
          from: o,
          to: s,
          text: l,
          rules: t,
          plugin: r
        });
      },
      handleDOMEvents: {
        compositionend: (i) => (setTimeout(() => {
          const { $cursor: o } = i.state.selection;
          o && ji({
            editor: e,
            from: o.pos,
            to: o.pos,
            text: "",
            rules: t,
            plugin: r
          });
        }), !1)
      },
      // add support for input rules to trigger on enter
      // this is useful for example for code blocks
      handleKeyDown(i, o) {
        if (o.key !== "Enter")
          return !1;
        const { $cursor: s } = i.state.selection;
        return s ? ji({
          editor: e,
          from: s.pos,
          to: s.pos,
          text: `
`,
          rules: t,
          plugin: r
        }) : !1;
      }
    },
    // @ts-ignore
    isInputRules: !0
  });
  return r;
}
function Mb(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function Wi(n) {
  return Mb(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function Ss(n, e) {
  const t = { ...n };
  return Wi(n) && Wi(e) && Object.keys(e).forEach((r) => {
    Wi(e[r]) && Wi(n[r]) ? t[r] = Ss(n[r], e[r]) : t[r] = e[r];
  }), t;
}
class ot {
  constructor(e = {}) {
    this.type = "mark", this.name = "mark", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = $(D(this, "addOptions", {
      name: this.name
    }))), this.storage = $(D(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new ot(e);
  }
  configure(e = {}) {
    const t = this.extend({
      ...this.config,
      addOptions: () => Ss(this.options, e)
    });
    return t.name = this.name, t.parent = this.parent, t;
  }
  extend(e = {}) {
    const t = new ot(e);
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = $(D(t, "addOptions", {
      name: t.name
    })), t.storage = $(D(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  static handleExit({ editor: e, mark: t }) {
    const { tr: r } = e.state, i = e.state.selection.$from;
    if (i.pos === i.end()) {
      const s = i.marks();
      if (!!!s.find((c) => (c == null ? void 0 : c.type.name) === t.name))
        return !1;
      const a = s.find((c) => (c == null ? void 0 : c.type.name) === t.name);
      return a && r.removeStoredMark(a), r.insertText(" ", i.pos), e.view.dispatch(r), !0;
    }
    return !1;
  }
}
function Eb(n) {
  return typeof n == "number";
}
class Ob {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const Nb = (n, e, t) => {
  if (Pa(e))
    return [...n.matchAll(e)];
  const r = e(n, t);
  return r ? r.map((i) => {
    const o = [i.text];
    return o.index = i.index, o.input = n, o.data = i.data, i.replaceWith && (i.text.includes(i.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), o.push(i.replaceWith)), o;
  }) : [];
};
function Db(n) {
  const { editor: e, state: t, from: r, to: i, rule: o, pasteEvent: s, dropEvent: l } = n, { commands: a, chain: c, can: d } = new bs({
    editor: e,
    state: t
  }), u = [];
  return t.doc.nodesBetween(r, i, (p, h) => {
    if (!p.isTextblock || p.type.spec.code)
      return;
    const m = Math.max(r, h), g = Math.min(i, h + p.content.size), y = p.textBetween(m - h, g - h, void 0, "￼");
    Nb(y, o.find, s).forEach((A) => {
      if (A.index === void 0)
        return;
      const b = m + A.index + 1, C = b + A[0].length, v = {
        from: t.tr.mapping.map(b),
        to: t.tr.mapping.map(C)
      }, _ = o.handler({
        state: t,
        range: v,
        match: A,
        commands: a,
        chain: c,
        can: d,
        pasteEvent: s,
        dropEvent: l
      });
      u.push(_);
    });
  }), u.every((p) => p !== null);
}
let Ui = null;
const _b = (n) => {
  var e;
  const t = new ClipboardEvent("paste", {
    clipboardData: new DataTransfer()
  });
  return (e = t.clipboardData) === null || e === void 0 || e.setData("text/html", n), t;
};
function Rb(n) {
  const { editor: e, rules: t } = n;
  let r = null, i = !1, o = !1, s = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, l;
  try {
    l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
  } catch {
    l = null;
  }
  const a = ({ state: d, from: u, to: f, rule: p, pasteEvt: h }) => {
    const m = d.tr, g = ys({
      state: d,
      transaction: m
    });
    if (!(!Db({
      editor: e,
      state: g,
      from: Math.max(u - 1, 0),
      to: f.b - 1,
      rule: p,
      pasteEvent: h,
      dropEvent: l
    }) || !m.steps.length)) {
      try {
        l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
      } catch {
        l = null;
      }
      return s = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, m;
    }
  };
  return t.map((d) => new ne({
    // we register a global drag handler to track the current drag source element
    view(u) {
      const f = (h) => {
        var m;
        r = !((m = u.dom.parentElement) === null || m === void 0) && m.contains(h.target) ? u.dom.parentElement : null, r && (Ui = e);
      }, p = () => {
        Ui && (Ui = null);
      };
      return window.addEventListener("dragstart", f), window.addEventListener("dragend", p), {
        destroy() {
          window.removeEventListener("dragstart", f), window.removeEventListener("dragend", p);
        }
      };
    },
    props: {
      handleDOMEvents: {
        drop: (u, f) => {
          if (o = r === u.dom.parentElement, l = f, !o) {
            const p = Ui;
            p && setTimeout(() => {
              const h = p.state.selection;
              h && p.commands.deleteRange({ from: h.from, to: h.to });
            }, 10);
          }
          return !1;
        },
        paste: (u, f) => {
          var p;
          const h = (p = f.clipboardData) === null || p === void 0 ? void 0 : p.getData("text/html");
          return s = f, i = !!(h != null && h.includes("data-pm-slice")), !1;
        }
      }
    },
    appendTransaction: (u, f, p) => {
      const h = u[0], m = h.getMeta("uiEvent") === "paste" && !i, g = h.getMeta("uiEvent") === "drop" && !o, y = h.getMeta("applyPasteRules"), w = !!y;
      if (!m && !g && !w)
        return;
      if (w) {
        let { text: C } = y;
        typeof C == "string" ? C = C : C = Ia(x.from(C), p.schema);
        const { from: v } = y, _ = v + C.length, z = _b(C);
        return a({
          rule: d,
          state: p,
          from: v,
          to: { b: _ },
          pasteEvt: z
        });
      }
      const A = f.doc.content.findDiffStart(p.doc.content), b = f.doc.content.findDiffEnd(p.doc.content);
      if (!(!Eb(A) || !b || A === b.b))
        return a({
          rule: d,
          state: p,
          from: A,
          to: b,
          pasteEvt: s
        });
    }
  }));
}
function Ib(n) {
  const e = n.filter((t, r) => n.indexOf(t) !== r);
  return Array.from(new Set(e));
}
class lr {
  constructor(e, t) {
    this.splittableMarks = [], this.editor = t, this.extensions = lr.resolve(e), this.schema = kb(this.extensions, t), this.setupExtensions();
  }
  /**
   * Returns a flattened and sorted extension list while
   * also checking for duplicated extensions and warns the user.
   * @param extensions An array of Tiptap extensions
   * @returns An flattened and sorted array of Tiptap extensions
   */
  static resolve(e) {
    const t = lr.sort(lr.flatten(e)), r = Ib(t.map((i) => i.name));
    return r.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${r.map((i) => `'${i}'`).join(", ")}]. This can lead to issues.`), t;
  }
  /**
   * Create a flattened array of extensions by traversing the `addExtensions` field.
   * @param extensions An array of Tiptap extensions
   * @returns A flattened array of Tiptap extensions
   */
  static flatten(e) {
    return e.map((t) => {
      const r = {
        name: t.name,
        options: t.options,
        storage: t.storage
      }, i = D(t, "addExtensions", r);
      return i ? [t, ...this.flatten(i())] : t;
    }).flat(10);
  }
  /**
   * Sort extensions by priority.
   * @param extensions An array of Tiptap extensions
   * @returns A sorted array of Tiptap extensions by priority
   */
  static sort(e) {
    return e.sort((r, i) => {
      const o = D(r, "priority") || 100, s = D(i, "priority") || 100;
      return o > s ? -1 : o < s ? 1 : 0;
    });
  }
  /**
   * Get all commands from the extensions.
   * @returns An object with all commands where the key is the command name and the value is the command function
   */
  get commands() {
    return this.extensions.reduce((e, t) => {
      const r = {
        name: t.name,
        options: t.options,
        storage: t.storage,
        editor: this.editor,
        type: Js(t.name, this.schema)
      }, i = D(t, "addCommands", r);
      return i ? {
        ...e,
        ...i()
      } : e;
    }, {});
  }
  /**
   * Get all registered Prosemirror plugins from the extensions.
   * @returns An array of Prosemirror plugins
   */
  get plugins() {
    const { editor: e } = this, t = lr.sort([...this.extensions].reverse()), r = [], i = [], o = t.map((s) => {
      const l = {
        name: s.name,
        options: s.options,
        storage: s.storage,
        editor: e,
        type: Js(s.name, this.schema)
      }, a = [], c = D(s, "addKeyboardShortcuts", l);
      let d = {};
      if (s.type === "mark" && D(s, "exitable", l) && (d.ArrowRight = () => ot.handleExit({ editor: e, mark: s })), c) {
        const m = Object.fromEntries(Object.entries(c()).map(([g, y]) => [g, () => y({ editor: e })]));
        d = { ...d, ...m };
      }
      const u = Qy(d);
      a.push(u);
      const f = D(s, "addInputRules", l);
      bd(s, e.options.enableInputRules) && f && r.push(...f());
      const p = D(s, "addPasteRules", l);
      bd(s, e.options.enablePasteRules) && p && i.push(...p());
      const h = D(s, "addProseMirrorPlugins", l);
      if (h) {
        const m = h();
        a.push(...m);
      }
      return a;
    }).flat();
    return [
      Ab({
        editor: e,
        rules: r
      }),
      ...Rb({
        editor: e,
        rules: i
      }),
      ...o
    ];
  }
  /**
   * Get all attributes from the extensions.
   * @returns An array of attributes
   */
  get attributes() {
    return Np(this.extensions);
  }
  /**
   * Get all node views from the extensions.
   * @returns An object with all node views where the key is the node name and the value is the node view function
   */
  get nodeViews() {
    const { editor: e } = this, { nodeExtensions: t } = vs(this.extensions);
    return Object.fromEntries(t.filter((r) => !!D(r, "addNodeView")).map((r) => {
      const i = this.attributes.filter((a) => a.type === r.name), o = {
        name: r.name,
        options: r.options,
        storage: r.storage,
        editor: e,
        type: ve(r.name, this.schema)
      }, s = D(r, "addNodeView", o);
      if (!s)
        return [];
      const l = (a, c, d, u, f) => {
        const p = Rl(a, i);
        return s()({
          // pass-through
          node: a,
          view: c,
          getPos: d,
          decorations: u,
          innerDecorations: f,
          // tiptap-specific
          editor: e,
          extension: r,
          HTMLAttributes: p
        });
      };
      return [r.name, l];
    }));
  }
  /**
   * Go through all extensions, create extension storages & setup marks
   * & bind editor event listener.
   */
  setupExtensions() {
    this.extensions.forEach((e) => {
      var t;
      this.editor.extensionStorage[e.name] = e.storage;
      const r = {
        name: e.name,
        options: e.options,
        storage: e.storage,
        editor: this.editor,
        type: Js(e.name, this.schema)
      };
      e.type === "mark" && (!((t = $(D(e, "keepOnSplit", r))) !== null && t !== void 0) || t) && this.splittableMarks.push(e.name);
      const i = D(e, "onBeforeCreate", r), o = D(e, "onCreate", r), s = D(e, "onUpdate", r), l = D(e, "onSelectionUpdate", r), a = D(e, "onTransaction", r), c = D(e, "onFocus", r), d = D(e, "onBlur", r), u = D(e, "onDestroy", r);
      i && this.editor.on("beforeCreate", i), o && this.editor.on("create", o), s && this.editor.on("update", s), l && this.editor.on("selectionUpdate", l), a && this.editor.on("transaction", a), c && this.editor.on("focus", c), d && this.editor.on("blur", d), u && this.editor.on("destroy", u);
    });
  }
}
class te {
  constructor(e = {}) {
    this.type = "extension", this.name = "extension", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = $(D(this, "addOptions", {
      name: this.name
    }))), this.storage = $(D(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new te(e);
  }
  configure(e = {}) {
    const t = this.extend({
      ...this.config,
      addOptions: () => Ss(this.options, e)
    });
    return t.name = this.name, t.parent = this.parent, t;
  }
  extend(e = {}) {
    const t = new te({ ...this.config, ...e });
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = $(D(t, "addOptions", {
      name: t.name
    })), t.storage = $(D(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
function _p(n, e, t) {
  const { from: r, to: i } = e, { blockSeparator: o = `

`, textSerializers: s = {} } = t || {};
  let l = "";
  return n.nodesBetween(r, i, (a, c, d, u) => {
    var f;
    a.isBlock && c > r && (l += o);
    const p = s == null ? void 0 : s[a.type.name];
    if (p)
      return d && (l += p({
        node: a,
        pos: c,
        parent: d,
        index: u,
        range: e
      })), !1;
    a.isText && (l += (f = a == null ? void 0 : a.text) === null || f === void 0 ? void 0 : f.slice(Math.max(r, c) - c, i - c));
  }), l;
}
function La(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
const Pb = te.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return {
      blockSeparator: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new ne({
        key: new de("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, { ranges: o } = i, s = Math.min(...o.map((d) => d.$from.pos)), l = Math.max(...o.map((d) => d.$to.pos)), a = La(t);
            return _p(r, { from: s, to: l }, {
              ...this.options.blockSeparator !== void 0 ? { blockSeparator: this.options.blockSeparator } : {},
              textSerializers: a
            });
          }
        }
      })
    ];
  }
}), Lb = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  var t;
  n.isDestroyed || (e.dom.blur(), (t = window == null ? void 0 : window.getSelection()) === null || t === void 0 || t.removeAllRanges());
}), !0), Bb = (n = !1) => ({ commands: e }) => e.setContent("", n), zb = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, a) => {
      if (l.type.isText)
        return;
      const { doc: c, mapping: d } = e, u = c.resolve(d.map(a)), f = c.resolve(d.map(a + l.nodeSize)), p = u.blockRange(f);
      if (!p)
        return;
      const h = Tr(p);
      if (l.type.isTextblock) {
        const { defaultType: m } = u.parent.contentMatchAt(u.index());
        e.setNodeMarkup(p.start, m);
      }
      (h || h === 0) && e.lift(p, h);
    });
  }), !0;
}, Fb = (n) => (e) => n(e), Hb = () => ({ state: n, dispatch: e }) => Ap(n, e), Vb = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new L(r.doc.resolve(s - 1))), !0;
}, $b = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, r = t.$anchor.node();
  if (r.content.size > 0)
    return !1;
  const i = n.selection.$anchor;
  for (let o = i.depth; o > 0; o -= 1)
    if (i.node(o).type === r.type) {
      if (e) {
        const l = i.before(o), a = i.after(o);
        n.delete(l, a).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, jb = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = ve(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1)
    if (o.node(s).type === i) {
      if (r) {
        const a = o.before(s), c = o.after(s);
        e.delete(a, c).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, Wb = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, Ub = () => ({ state: n, dispatch: e }) => gs(n, e), Kb = () => ({ commands: n }) => n.keyboardShortcut("Enter"), qb = () => ({ state: n, dispatch: e }) => ob(n, e);
function No(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : Pa(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function Rp(n, e, t = {}) {
  return n.find((r) => r.type === e && No(
    // Only check equality for the attributes that are provided
    Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])),
    t
  ));
}
function vd(n, e, t = {}) {
  return !!Rp(n, e, t);
}
function Ba(n, e, t) {
  var r;
  if (!n || !e)
    return;
  let i = n.parent.childAfter(n.parentOffset);
  if ((!i.node || !i.node.marks.some((d) => d.type === e)) && (i = n.parent.childBefore(n.parentOffset)), !i.node || !i.node.marks.some((d) => d.type === e) || (t = t || ((r = i.node.marks[0]) === null || r === void 0 ? void 0 : r.attrs), !Rp([...i.node.marks], e, t)))
    return;
  let s = i.index, l = n.start() + i.offset, a = s + 1, c = l + i.node.nodeSize;
  for (; s > 0 && vd([...n.parent.child(s - 1).marks], e, t); )
    s -= 1, l -= n.parent.child(s).nodeSize;
  for (; a < n.parent.childCount && vd([...n.parent.child(a).marks], e, t); )
    c += n.parent.child(a).nodeSize, a += 1;
  return {
    from: l,
    to: c
  };
}
function hn(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n])
      throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const Gb = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const o = hn(n, r.schema), { doc: s, selection: l } = t, { $from: a, from: c, to: d } = l;
  if (i) {
    const u = Ba(a, o, e);
    if (u && u.from <= c && u.to >= d) {
      const f = L.create(s, u.from, u.to);
      t.setSelection(f);
    }
  }
  return !0;
}, Jb = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1)
    if (t[r](e))
      return !0;
  return !1;
};
function za(n) {
  return n instanceof L;
}
function Bt(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Ip(n, e = null) {
  if (!e)
    return null;
  const t = B.atStart(n), r = B.atEnd(n);
  if (e === "start" || e === !0)
    return t;
  if (e === "end")
    return r;
  const i = t.from, o = r.to;
  return e === "all" ? L.create(n, Bt(0, i, o), Bt(n.content.size, i, o)) : L.create(n, Bt(e, i, o), Bt(e, i, o));
}
function Pp() {
  return navigator.platform === "Android" || /android/i.test(navigator.userAgent);
}
function xs() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
const Yb = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (xs() || Pp()) && r.dom.focus(), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  if (r.hasFocus() && n === null || n === !1)
    return !0;
  if (o && n === null && !za(t.state.selection))
    return s(), !0;
  const l = Ip(i.doc, n) || t.state.selection, a = t.state.selection.eq(l);
  return o && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, Xb = (n, e) => (t) => n.every((r, i) => e(r, { ...t, index: i })), Zb = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({ from: t.selection.from, to: t.selection.to }, n, e), Lp = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && Lp(r);
  }
  return n;
};
function Ki(n) {
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return Lp(t);
}
function Do(n, e, t) {
  if (n instanceof on || n instanceof x)
    return n;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const r = typeof n == "object" && n !== null, i = typeof n == "string";
  if (r)
    try {
      if (Array.isArray(n) && n.length > 0)
        return x.fromArray(n.map((l) => e.nodeFromJSON(l)));
      const s = e.nodeFromJSON(n);
      return t.errorOnInvalidContent && s.check(), s;
    } catch (o) {
      if (t.errorOnInvalidContent)
        throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Do("", e, t);
    }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const a = new wf({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        // Prosemirror's schemas are executed such that: the last to execute, matches last
        // This means that we can add a catch-all node at the end of the schema to catch any content that we don't know how to handle
        nodes: e.spec.nodes.append({
          __tiptap__private__unknown__catch__all__node: {
            content: "inline*",
            group: "block",
            parseDOM: [
              {
                tag: "*",
                getAttrs: (c) => (s = !0, l = typeof c == "string" ? c : c.outerHTML, null)
              }
            ]
          }
        })
      });
      if (t.slice ? sn.fromSchema(a).parseSlice(Ki(n), t.parseOptions) : sn.fromSchema(a).parse(Ki(n), t.parseOptions), t.errorOnInvalidContent && s)
        throw new Error("[tiptap error]: Invalid HTML content", { cause: new Error(`Invalid element found: ${l}`) });
    }
    const o = sn.fromSchema(e);
    return t.slice ? o.parseSlice(Ki(n), t.parseOptions).content : o.parse(Ki(n), t.parseOptions);
  }
  return Do("", e, t);
}
function Qb(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e)
    return;
  const i = n.steps[r];
  if (!(i instanceof me || i instanceof ge))
    return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, a, c, d) => {
    s === 0 && (s = d);
  }), n.setSelection(B.near(n.doc.resolve(s), t));
}
const e0 = (n) => !("type" in n), t0 = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
  var s;
  if (i) {
    t = {
      parseOptions: o.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    let l;
    try {
      l = Do(e, o.schema, {
        parseOptions: {
          preserveWhitespace: "full",
          ...t.parseOptions
        },
        errorOnInvalidContent: (s = t.errorOnInvalidContent) !== null && s !== void 0 ? s : o.options.enableContentCheck
      });
    } catch (h) {
      return o.emit("contentError", {
        editor: o,
        error: h,
        disableCollaboration: () => {
          o.storage.collaboration && (o.storage.collaboration.isDisabled = !0);
        }
      }), !1;
    }
    let { from: a, to: c } = typeof n == "number" ? { from: n, to: n } : { from: n.from, to: n.to }, d = !0, u = !0;
    if ((e0(l) ? l : [l]).forEach((h) => {
      h.check(), d = d ? h.isText && h.marks.length === 0 : !1, u = u ? h.isBlock : !1;
    }), a === c && u) {
      const { parent: h } = r.doc.resolve(a);
      h.isTextblock && !h.type.spec.code && !h.childCount && (a -= 1, c += 1);
    }
    let p;
    if (d) {
      if (Array.isArray(e))
        p = e.map((h) => h.text || "").join("");
      else if (e instanceof x) {
        let h = "";
        e.forEach((m) => {
          m.text && (h += m.text);
        }), p = h;
      } else typeof e == "object" && e && e.text ? p = e.text : p = e;
      r.insertText(p, a, c);
    } else
      p = l, r.replaceWith(a, c, p);
    t.updateSelection && Qb(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", { from: a, text: p }), t.applyPasteRules && r.setMeta("applyPasteRules", { from: a, text: p });
  }
  return !0;
}, n0 = () => ({ state: n, dispatch: e }) => nb(n, e), r0 = () => ({ state: n, dispatch: e }) => rb(n, e), i0 = () => ({ state: n, dispatch: e }) => vp(n, e), o0 = () => ({ state: n, dispatch: e }) => kp(n, e), s0 = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = ds(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, l0 = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = ds(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, a0 = () => ({ state: n, dispatch: e }) => eb(n, e), c0 = () => ({ state: n, dispatch: e }) => tb(n, e);
function Bp() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function d0(n) {
  const e = n.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
  let r, i, o, s;
  for (let l = 0; l < e.length - 1; l += 1) {
    const a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      s = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      o = !0;
    else if (/^mod$/i.test(a))
      xs() || Bp() ? s = !0 : i = !0;
    else
      throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const u0 = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = d0(n).split(/-(?!$)/), s = o.find((c) => !["Alt", "Ctrl", "Meta", "Shift"].includes(c)), l = new KeyboardEvent("keydown", {
    key: s === "Space" ? " " : s,
    altKey: o.includes("Alt"),
    ctrlKey: o.includes("Ctrl"),
    metaKey: o.includes("Meta"),
    shiftKey: o.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), a = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (c) => c(t, l));
  });
  return a == null || a.steps.forEach((c) => {
    const d = c.map(r.mapping);
    d && i && r.maybeStep(d);
  }), !0;
};
function ui(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? ve(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (u, f) => {
    if (u.isText)
      return;
    const p = Math.max(r, f), h = Math.min(i, f + u.nodeSize);
    l.push({
      node: u,
      from: p,
      to: h
    });
  });
  const a = i - r, c = l.filter((u) => s ? s.name === u.node.type.name : !0).filter((u) => No(u.node.attrs, t, { strict: !1 }));
  return o ? !!c.length : c.reduce((u, f) => u + f.to - f.from, 0) >= a;
}
const f0 = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = ve(n, t.schema);
  return ui(t, i, e) ? ib(t, r) : !1;
}, p0 = () => ({ state: n, dispatch: e }) => Mp(n, e), h0 = (n) => ({ state: e, dispatch: t }) => {
  const r = ve(n, e.schema);
  return gb(r)(e, t);
}, m0 = () => ({ state: n, dispatch: e }) => Tp(n, e);
function ks(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function wd(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const g0 = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = ks(typeof n == "string" ? n : n.name, r.schema);
  return l ? (l === "node" && (o = ve(n, r.schema)), l === "mark" && (s = hn(n, r.schema)), i && t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (c, d) => {
      o && o === c.type && t.setNodeMarkup(d, void 0, wd(c.attrs, e)), s && c.marks.length && c.marks.forEach((u) => {
        s === u.type && t.addMark(d, d + c.nodeSize, s.create(wd(u.attrs, e)));
      });
    });
  }), !0) : !1;
}, y0 = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), b0 = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new je(n.doc);
    n.setSelection(t);
  }
  return !0;
}, v0 = () => ({ state: n, dispatch: e }) => Sp(n, e), w0 = () => ({ state: n, dispatch: e }) => Cp(n, e), S0 = () => ({ state: n, dispatch: e }) => ab(n, e), x0 = () => ({ state: n, dispatch: e }) => ub(n, e), k0 = () => ({ state: n, dispatch: e }) => db(n, e);
function Il(n, e, t = {}, r = {}) {
  return Do(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const C0 = (n, e = !1, t = {}, r = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  var a, c;
  const { doc: d } = o;
  if (t.preserveWhitespace !== "full") {
    const u = Il(n, i.schema, t, {
      errorOnInvalidContent: (a = r.errorOnInvalidContent) !== null && a !== void 0 ? a : i.options.enableContentCheck
    });
    return s && o.replaceWith(0, d.content.size, u).setMeta("preventUpdate", !e), !0;
  }
  return s && o.setMeta("preventUpdate", !e), l.insertContentAt({ from: 0, to: d.content.size }, n, {
    parseOptions: t,
    errorOnInvalidContent: (c = r.errorOnInvalidContent) !== null && c !== void 0 ? c : i.options.enableContentCheck
  });
};
function zp(n, e) {
  const t = hn(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (a) => {
    s.push(...a.marks);
  });
  const l = s.find((a) => a.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function T0(n, e) {
  const t = new ba(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function A0(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
function M0(n, e, t) {
  const r = [];
  return n.nodesBetween(e.from, e.to, (i, o) => {
    t(i) && r.push({
      node: i,
      pos: o
    });
  }), r;
}
function Fp(n, e) {
  for (let t = n.depth; t > 0; t -= 1) {
    const r = n.node(t);
    if (e(r))
      return {
        pos: t > 0 ? n.before(t) : 0,
        start: n.start(t),
        depth: t,
        node: r
      };
  }
}
function Fa(n) {
  return (e) => Fp(e.$from, n);
}
function Hp(n, e) {
  const t = {
    from: 0,
    to: n.content.size
  };
  return _p(n, t, e);
}
function E0(n, e) {
  const t = ve(e, n.schema), { from: r, to: i } = n.selection, o = [];
  n.doc.nodesBetween(r, i, (l) => {
    o.push(l);
  });
  const s = o.reverse().find((l) => l.type.name === t.name);
  return s ? { ...s.attrs } : {};
}
function Vp(n, e) {
  const t = ks(typeof e == "string" ? e : e.name, n.schema);
  return t === "node" ? E0(n, e) : t === "mark" ? zp(n, e) : {};
}
function O0(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function N0(n) {
  const e = O0(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((o, s) => s !== r).some((o) => t.oldRange.from >= o.oldRange.from && t.oldRange.to <= o.oldRange.to && t.newRange.from >= o.newRange.from && t.newRange.to <= o.newRange.to));
}
function D0(n) {
  const { mapping: e, steps: t } = n, r = [];
  return e.maps.forEach((i, o) => {
    const s = [];
    if (i.ranges.length)
      i.forEach((l, a) => {
        s.push({ from: l, to: a });
      });
    else {
      const { from: l, to: a } = t[o];
      if (l === void 0 || a === void 0)
        return;
      s.push({ from: l, to: a });
    }
    s.forEach(({ from: l, to: a }) => {
      const c = e.slice(o).map(l, -1), d = e.slice(o).map(a), u = e.invert().map(c, -1), f = e.invert().map(d);
      r.push({
        oldRange: {
          from: u,
          to: f
        },
        newRange: {
          from: c,
          to: d
        }
      });
    });
  }), N0(r);
}
function Ha(n, e, t) {
  const r = [];
  return n === e ? t.resolve(n).marks().forEach((i) => {
    const o = t.resolve(n), s = Ba(o, i.type);
    s && r.push({
      mark: i,
      ...s
    });
  }) : t.nodesBetween(n, e, (i, o) => {
    !i || (i == null ? void 0 : i.nodeSize) === void 0 || r.push(...i.marks.map((s) => ({
      from: o,
      to: o + i.nodeSize,
      mark: s
    })));
  }), r;
}
function uo(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Pl(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? hn(e, n.schema) : null;
  if (r)
    return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => No(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: f }) => {
    const p = u.pos, h = f.pos;
    n.doc.nodesBetween(p, h, (m, g) => {
      if (!m.isText && !m.marks.length)
        return;
      const y = Math.max(p, g), w = Math.min(h, g + m.nodeSize), A = w - y;
      s += A, l.push(...m.marks.map((b) => ({
        mark: b,
        from: y,
        to: w
      })));
    });
  }), s === 0)
    return !1;
  const a = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => No(u.mark.attrs, t, { strict: !1 })).reduce((u, f) => u + f.to - f.from, 0), c = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, f) => u + f.to - f.from, 0);
  return (a > 0 ? a + c : a) >= s;
}
function _0(n, e, t = {}) {
  if (!e)
    return ui(n, null, t) || Pl(n, null, t);
  const r = ks(e, n.schema);
  return r === "node" ? ui(n, e, t) : r === "mark" ? Pl(n, e, t) : !1;
}
function Sd(n, e) {
  const { nodeExtensions: t } = vs(e), r = t.find((s) => s.name === n);
  if (!r)
    return !1;
  const i = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, o = $(D(r, "group", i));
  return typeof o != "string" ? !1 : o.split(" ").includes("list");
}
function Cs(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
  var r;
  if (t) {
    if (n.type.name === "hardBreak")
      return !0;
    if (n.isText)
      return /^\s*$/m.test((r = n.text) !== null && r !== void 0 ? r : "");
  }
  if (n.isText)
    return !n.text;
  if (n.isAtom || n.isLeaf)
    return !1;
  if (n.content.childCount === 0)
    return !0;
  if (e) {
    let i = !0;
    return n.content.forEach((o) => {
      i !== !1 && (Cs(o, { ignoreWhitespace: t, checkChildren: e }) || (i = !1));
    }), i;
  }
  return !1;
}
function $p(n) {
  return n instanceof P;
}
function jp(n, e, t) {
  const i = n.state.doc.content.size, o = Bt(e, 0, i), s = Bt(t, 0, i), l = n.coordsAtPos(o), a = n.coordsAtPos(s, -1), c = Math.min(l.top, a.top), d = Math.max(l.bottom, a.bottom), u = Math.min(l.left, a.left), f = Math.max(l.right, a.right), p = f - u, h = d - c, y = {
    top: c,
    bottom: d,
    left: u,
    right: f,
    width: p,
    height: h,
    x: u,
    y: c
  };
  return {
    ...y,
    toJSON: () => y
  };
}
function R0(n, e, t) {
  var r;
  const { selection: i } = e;
  let o = null;
  if (za(i) && (o = i.$cursor), o) {
    const l = (r = n.storedMarks) !== null && r !== void 0 ? r : o.marks();
    return !!t.isInSet(l) || !l.some((a) => a.type.excludes(t));
  }
  const { ranges: s } = i;
  return s.some(({ $from: l, $to: a }) => {
    let c = l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(l.pos, a.pos, (d, u, f) => {
      if (c)
        return !1;
      if (d.isInline) {
        const p = !f || f.type.allowsMarkType(t), h = !!t.isInSet(d.marks) || !d.marks.some((m) => m.type.excludes(t));
        c = p && h;
      }
      return !c;
    }), c;
  });
}
const I0 = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, a = hn(n, r.schema);
  if (i)
    if (s) {
      const c = zp(r, a);
      t.addStoredMark(a.create({
        ...c,
        ...e
      }));
    } else
      l.forEach((c) => {
        const d = c.$from.pos, u = c.$to.pos;
        r.doc.nodesBetween(d, u, (f, p) => {
          const h = Math.max(p, d), m = Math.min(p + f.nodeSize, u);
          f.marks.find((y) => y.type === a) ? f.marks.forEach((y) => {
            a === y.type && t.addMark(h, m, a.create({
              ...y.attrs,
              ...e
            }));
          }) : t.addMark(h, m, a.create(e));
        });
      });
  return R0(r, t, a);
}, P0 = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), L0 = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = ve(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => md(o, { ...s, ...e })(t) ? !0 : l.clearNodes()).command(({ state: l }) => md(o, { ...s, ...e })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, B0 = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = Bt(n, 0, r.content.size), o = P.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, z0 = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? { from: n, to: n } : n, s = L.atStart(r).from, l = L.atEnd(r).to, a = Bt(i, s, l), c = Bt(o, s, l), d = L.create(r, a, c);
    e.setSelection(d);
  }
  return !0;
}, F0 = (n) => ({ state: e, dispatch: t }) => {
  const r = ve(n, e.schema);
  return vb(r)(e, t);
};
function xd(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const H0 = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: a } = o, c = i.extensionManager.attributes, d = uo(c, l.node().type.name, l.node().attrs);
  if (o instanceof P && o.node.isBlock)
    return !l.parentOffset || !zt(s, l.pos) ? !1 : (r && (n && xd(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock)
    return !1;
  const u = a.parentOffset === a.parent.content.size, f = l.depth === 0 ? void 0 : A0(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let p = u && f ? [
    {
      type: f,
      attrs: d
    }
  ] : void 0, h = zt(e.doc, e.mapping.map(l.pos), 1, p);
  if (!p && !h && zt(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (h = !0, p = f ? [
    {
      type: f,
      attrs: d
    }
  ] : void 0), r) {
    if (h && (o instanceof L && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, p), f && !u && !l.parentOffset && l.parent.type !== f)) {
      const m = e.mapping.map(l.before()), g = e.doc.resolve(m);
      l.node(-1).canReplaceWith(g.index(), g.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && xd(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return h;
}, V0 = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  var s;
  const l = ve(n, r.schema), { $from: a, $to: c } = r.selection, d = r.selection.node;
  if (d && d.isBlock || a.depth < 2 || !a.sameParent(c))
    return !1;
  const u = a.node(-1);
  if (u.type !== l)
    return !1;
  const f = o.extensionManager.attributes;
  if (a.parent.content.size === 0 && a.node(-1).childCount === a.indexAfter(-1)) {
    if (a.depth === 2 || a.node(-3).type !== l || a.index(-2) !== a.node(-2).childCount - 1)
      return !1;
    if (i) {
      let y = x.empty;
      const w = a.index(-1) ? 1 : a.index(-2) ? 2 : 3;
      for (let z = a.depth - w; z >= a.depth - 3; z -= 1)
        y = x.from(a.node(z).copy(y));
      const A = a.indexAfter(-1) < a.node(-2).childCount ? 1 : a.indexAfter(-2) < a.node(-3).childCount ? 2 : 3, b = {
        ...uo(f, a.node().type.name, a.node().attrs),
        ...e
      }, C = ((s = l.contentMatch.defaultType) === null || s === void 0 ? void 0 : s.createAndFill(b)) || void 0;
      y = y.append(x.from(l.createAndFill(null, C) || void 0));
      const v = a.before(a.depth - (w - 1));
      t.replace(v, a.after(-A), new M(y, 4 - w, 0));
      let _ = -1;
      t.doc.nodesBetween(v, t.doc.content.size, (z, R) => {
        if (_ > -1)
          return !1;
        z.isTextblock && z.content.size === 0 && (_ = R + 1);
      }), _ > -1 && t.setSelection(L.near(t.doc.resolve(_))), t.scrollIntoView();
    }
    return !0;
  }
  const p = c.pos === a.end() ? u.contentMatchAt(0).defaultType : null, h = {
    ...uo(f, u.type.name, u.attrs),
    ...e
  }, m = {
    ...uo(f, a.node().type.name, a.node().attrs),
    ...e
  };
  t.delete(a.pos, c.pos);
  const g = p ? [
    { type: l, attrs: h },
    { type: p, attrs: m }
  ] : [{ type: l, attrs: h }];
  if (!zt(t.doc, a.pos, 2))
    return !1;
  if (i) {
    const { selection: y, storedMarks: w } = r, { splittableMarks: A } = o.extensionManager, b = w || y.$to.parentOffset && y.$from.marks();
    if (t.split(a.pos, 2, g).scrollIntoView(), !b || !i)
      return !0;
    const C = b.filter((v) => A.includes(v.type.name));
    t.ensureMarks(C);
  }
  return !0;
}, Ys = (n, e) => {
  const t = Fa((s) => s.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return t.node.type === (i == null ? void 0 : i.type) && fn(n.doc, t.pos) && n.join(t.pos), !0;
}, Xs = (n, e) => {
  const t = Fa((s) => s.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return t.node.type === (i == null ? void 0 : i.type) && fn(n.doc, r) && n.join(r), !0;
}, $0 = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: a, commands: c, can: d }) => {
  const { extensions: u, splittableMarks: f } = i.extensionManager, p = ve(n, s.schema), h = ve(e, s.schema), { selection: m, storedMarks: g } = s, { $from: y, $to: w } = m, A = y.blockRange(w), b = g || m.$to.parentOffset && m.$from.marks();
  if (!A)
    return !1;
  const C = Fa((v) => Sd(v.type.name, u))(m);
  if (A.depth >= 1 && C && A.depth - C.depth <= 1) {
    if (C.node.type === p)
      return c.liftListItem(h);
    if (Sd(C.node.type.name, u) && p.validContent(C.node.content) && l)
      return a().command(() => (o.setNodeMarkup(C.pos, p), !0)).command(() => Ys(o, p)).command(() => Xs(o, p)).run();
  }
  return !t || !b || !l ? a().command(() => d().wrapInList(p, r) ? !0 : c.clearNodes()).wrapInList(p, r).command(() => Ys(o, p)).command(() => Xs(o, p)).run() : a().command(() => {
    const v = d().wrapInList(p, r), _ = b.filter((z) => f.includes(z.type.name));
    return o.ensureMarks(_), v ? !0 : c.clearNodes();
  }).wrapInList(p, r).command(() => Ys(o, p)).command(() => Xs(o, p)).run();
}, j0 = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = hn(n, r.schema);
  return Pl(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, W0 = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = ve(n, r.schema), s = ve(e, r.schema), l = ui(r, o, t);
  let a;
  return r.selection.$anchor.sameParent(r.selection.$head) && (a = r.selection.$anchor.parent.attrs), l ? i.setNode(s, a) : i.setNode(o, { ...a, ...t });
}, U0 = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = ve(n, t.schema);
  return ui(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, K0 = () => ({ state: n, dispatch: e }) => {
  const t = n.plugins;
  for (let r = 0; r < t.length; r += 1) {
    const i = t[r];
    let o;
    if (i.spec.isInputRules && (o = i.getState(n))) {
      if (e) {
        const s = n.tr, l = o.transform;
        for (let a = l.steps.length - 1; a >= 0; a -= 1)
          s.step(l.steps[a].invert(l.docs[a]));
        if (o.text) {
          const a = s.doc.resolve(o.from).marks();
          s.replaceWith(o.from, o.to, n.schema.text(o.text, a));
        } else
          s.delete(o.from, o.to);
      }
      return !0;
    }
  }
  return !1;
}, q0 = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, { empty: r, ranges: i } = t;
  return r || e && i.forEach((o) => {
    n.removeMark(o.$from.pos, o.$to.pos);
  }), !0;
}, G0 = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  var o;
  const { extendEmptyMarkRange: s = !1 } = e, { selection: l } = t, a = hn(n, r.schema), { $from: c, empty: d, ranges: u } = l;
  if (!i)
    return !0;
  if (d && s) {
    let { from: f, to: p } = l;
    const h = (o = c.marks().find((g) => g.type === a)) === null || o === void 0 ? void 0 : o.attrs, m = Ba(c, a, h);
    m && (f = m.from, p = m.to), t.removeMark(f, p, a);
  } else
    u.forEach((f) => {
      t.removeMark(f.$from.pos, f.$to.pos, a);
    });
  return t.removeStoredMark(a), !0;
}, J0 = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = ks(typeof n == "string" ? n : n.name, r.schema);
  return l ? (l === "node" && (o = ve(n, r.schema)), l === "mark" && (s = hn(n, r.schema)), i && t.selection.ranges.forEach((a) => {
    const c = a.$from.pos, d = a.$to.pos;
    let u, f, p, h;
    t.selection.empty ? r.doc.nodesBetween(c, d, (m, g) => {
      o && o === m.type && (p = Math.max(g, c), h = Math.min(g + m.nodeSize, d), u = g, f = m);
    }) : r.doc.nodesBetween(c, d, (m, g) => {
      g < c && o && o === m.type && (p = Math.max(g, c), h = Math.min(g + m.nodeSize, d), u = g, f = m), g >= c && g <= d && (o && o === m.type && t.setNodeMarkup(g, void 0, {
        ...m.attrs,
        ...e
      }), s && m.marks.length && m.marks.forEach((y) => {
        if (s === y.type) {
          const w = Math.max(g, c), A = Math.min(g + m.nodeSize, d);
          t.addMark(w, A, s.create({
            ...y.attrs,
            ...e
          }));
        }
      }));
    }), f && (u !== void 0 && t.setNodeMarkup(u, void 0, {
      ...f.attrs,
      ...e
    }), s && f.marks.length && f.marks.forEach((m) => {
      s === m.type && t.addMark(p, h, s.create({
        ...m.attrs,
        ...e
      }));
    }));
  }), !0) : !1;
}, Y0 = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = ve(n, t.schema);
  return fb(i, e)(t, r);
}, X0 = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = ve(n, t.schema);
  return pb(i, e)(t, r);
};
var Z0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  blur: Lb,
  clearContent: Bb,
  clearNodes: zb,
  command: Fb,
  createParagraphNear: Hb,
  cut: Vb,
  deleteCurrentNode: $b,
  deleteNode: jb,
  deleteRange: Wb,
  deleteSelection: Ub,
  enter: Kb,
  exitCode: qb,
  extendMarkRange: Gb,
  first: Jb,
  focus: Yb,
  forEach: Xb,
  insertContent: Zb,
  insertContentAt: t0,
  joinBackward: i0,
  joinDown: r0,
  joinForward: o0,
  joinItemBackward: s0,
  joinItemForward: l0,
  joinTextblockBackward: a0,
  joinTextblockForward: c0,
  joinUp: n0,
  keyboardShortcut: u0,
  lift: f0,
  liftEmptyBlock: p0,
  liftListItem: h0,
  newlineInCode: m0,
  resetAttributes: g0,
  scrollIntoView: y0,
  selectAll: b0,
  selectNodeBackward: v0,
  selectNodeForward: w0,
  selectParentNode: S0,
  selectTextblockEnd: x0,
  selectTextblockStart: k0,
  setContent: C0,
  setMark: I0,
  setMeta: P0,
  setNode: L0,
  setNodeSelection: B0,
  setTextSelection: z0,
  sinkListItem: F0,
  splitBlock: H0,
  splitListItem: V0,
  toggleList: $0,
  toggleMark: j0,
  toggleNode: W0,
  toggleWrap: U0,
  undoInputRule: K0,
  unsetAllMarks: q0,
  unsetMark: G0,
  updateAttributes: J0,
  wrapIn: Y0,
  wrapInList: X0
});
const Q0 = te.create({
  name: "commands",
  addCommands() {
    return {
      ...Z0
    };
  }
}), ev = te.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [
      new ne({
        key: new de("tiptapDrop"),
        props: {
          handleDrop: (n, e, t, r) => {
            this.editor.emit("drop", {
              editor: this.editor,
              event: e,
              slice: t,
              moved: r
            });
          }
        }
      })
    ];
  }
}), tv = te.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new ne({
        key: new de("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), nv = te.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [
      new ne({
        key: new de("focusEvents"),
        props: {
          handleDOMEvents: {
            focus: (e, t) => {
              n.isFocused = !0;
              const r = n.state.tr.setMeta("focus", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            },
            blur: (e, t) => {
              n.isFocused = !1;
              const r = n.state.tr.setMeta("blur", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            }
          }
        }
      })
    ];
  }
}), rv = te.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      // maybe convert first text block node to default node
      () => s.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: d, $anchor: u } = a, { pos: f, parent: p } = u, h = u.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : u, m = h.parent.type.spec.isolating, g = u.pos - u.parentOffset, y = m && h.parent.childCount === 1 ? g === u.pos : B.atStart(c).from === f;
        return !d || !p.type.isTextblock || p.textContent.length || !y || y && u.parent.type.name === "paragraph" ? !1 : s.clearNodes();
      }),
      () => s.deleteSelection(),
      () => s.joinBackward(),
      () => s.selectNodeBackward()
    ]), e = () => this.editor.commands.first(({ commands: s }) => [
      () => s.deleteSelection(),
      () => s.deleteCurrentNode(),
      () => s.joinForward(),
      () => s.selectNodeForward()
    ]), r = {
      Enter: () => this.editor.commands.first(({ commands: s }) => [
        () => s.newlineInCode(),
        () => s.createParagraphNear(),
        () => s.liftEmptyBlock(),
        () => s.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: n,
      "Mod-Backspace": n,
      "Shift-Backspace": n,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, i = {
      ...r
    }, o = {
      ...r,
      "Ctrl-h": n,
      "Alt-Backspace": n,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return xs() || Bp() ? o : i;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new ne({
        key: new de("clearDocument"),
        appendTransaction: (n, e, t) => {
          if (n.some((m) => m.getMeta("composition")))
            return;
          const r = n.some((m) => m.docChanged) && !e.doc.eq(t.doc), i = n.some((m) => m.getMeta("preventClearDocument"));
          if (!r || i)
            return;
          const { empty: o, from: s, to: l } = e.selection, a = B.atStart(e.doc).from, c = B.atEnd(e.doc).to;
          if (o || !(s === a && l === c) || !Cs(t.doc))
            return;
          const f = t.tr, p = ys({
            state: t,
            transaction: f
          }), { commands: h } = new bs({
            editor: this.editor,
            state: p
          });
          if (h.clearNodes(), !!f.steps.length)
            return f;
        }
      })
    ];
  }
}), iv = te.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [
      new ne({
        key: new de("tiptapPaste"),
        props: {
          handlePaste: (n, e, t) => {
            this.editor.emit("paste", {
              editor: this.editor,
              event: e,
              slice: t
            });
          }
        }
      })
    ];
  }
}), ov = te.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new ne({
        key: new de("tabindex"),
        props: {
          attributes: () => this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
});
class kn {
  get name() {
    return this.node.type.name;
  }
  constructor(e, t, r = !1, i = null) {
    this.currentNode = null, this.actualDepth = null, this.isBlock = r, this.resolvedPos = e, this.editor = t, this.currentNode = i;
  }
  get node() {
    return this.currentNode || this.resolvedPos.node();
  }
  get element() {
    return this.editor.view.domAtPos(this.pos).node;
  }
  get depth() {
    var e;
    return (e = this.actualDepth) !== null && e !== void 0 ? e : this.resolvedPos.depth;
  }
  get pos() {
    return this.resolvedPos.pos;
  }
  get content() {
    return this.node.content;
  }
  set content(e) {
    let t = this.from, r = this.to;
    if (this.isBlock) {
      if (this.content.size === 0) {
        console.error(`You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
        return;
      }
      t = this.from + 1, r = this.to - 1;
    }
    this.editor.commands.insertContentAt({ from: t, to: r }, e);
  }
  get attributes() {
    return this.node.attrs;
  }
  get textContent() {
    return this.node.textContent;
  }
  get size() {
    return this.node.nodeSize;
  }
  get from() {
    return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth);
  }
  get range() {
    return {
      from: this.from,
      to: this.to
    };
  }
  get to() {
    return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + (this.node.isText ? 0 : 1);
  }
  get parent() {
    if (this.depth === 0)
      return null;
    const e = this.resolvedPos.start(this.resolvedPos.depth - 1), t = this.resolvedPos.doc.resolve(e);
    return new kn(t, this.editor);
  }
  get before() {
    let e = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.from - 3)), new kn(e, this.editor);
  }
  get after() {
    let e = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.to + 3)), new kn(e, this.editor);
  }
  get children() {
    const e = [];
    return this.node.content.forEach((t, r) => {
      const i = t.isBlock && !t.isTextblock, o = t.isAtom && !t.isText, s = this.pos + r + (o ? 0 : 1), l = this.resolvedPos.doc.resolve(s);
      if (!i && l.depth <= this.depth)
        return;
      const a = new kn(l, this.editor, i, i ? t : null);
      i && (a.actualDepth = this.depth + 1), e.push(new kn(l, this.editor, i, i ? t : null));
    }), e;
  }
  get firstChild() {
    return this.children[0] || null;
  }
  get lastChild() {
    const e = this.children;
    return e[e.length - 1] || null;
  }
  closest(e, t = {}) {
    let r = null, i = this.parent;
    for (; i && !r; ) {
      if (i.node.type.name === e)
        if (Object.keys(t).length > 0) {
          const o = i.node.attrs, s = Object.keys(t);
          for (let l = 0; l < s.length; l += 1) {
            const a = s[l];
            if (o[a] !== t[a])
              break;
          }
        } else
          r = i;
      i = i.parent;
    }
    return r;
  }
  querySelector(e, t = {}) {
    return this.querySelectorAll(e, t, !0)[0] || null;
  }
  querySelectorAll(e, t = {}, r = !1) {
    let i = [];
    if (!this.children || this.children.length === 0)
      return i;
    const o = Object.keys(t);
    return this.children.forEach((s) => {
      r && i.length > 0 || (s.node.type.name === e && o.every((a) => t[a] === s.node.attrs[a]) && i.push(s), !(r && i.length > 0) && (i = i.concat(s.querySelectorAll(e, t, r))));
    }), i;
  }
  setAttribute(e) {
    const { tr: t } = this.editor.state;
    t.setNodeMarkup(this.from, void 0, {
      ...this.node.attrs,
      ...e
    }), this.editor.view.dispatch(t);
  }
}
const sv = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 0 !important;
  height: 0 !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}

.tippy-box[data-animation=fade][data-state=hidden] {
  opacity: 0
}`;
function lv(n, e, t) {
  const r = document.querySelector("style[data-tiptap-style]");
  if (r !== null)
    return r;
  const i = document.createElement("style");
  return e && i.setAttribute("nonce", e), i.setAttribute("data-tiptap-style", ""), i.innerHTML = n, document.getElementsByTagName("head")[0].appendChild(i), i;
}
let av = class extends wb {
  constructor(e = {}) {
    super(), this.isFocused = !1, this.isInitialized = !1, this.extensionStorage = {}, this.options = {
      element: document.createElement("div"),
      content: "",
      injectCSS: !0,
      injectNonce: void 0,
      extensions: [],
      autofocus: !1,
      editable: !0,
      editorProps: {},
      parseOptions: {},
      coreExtensionOptions: {},
      enableInputRules: !0,
      enablePasteRules: !0,
      enableCoreExtensions: !0,
      enableContentCheck: !1,
      onBeforeCreate: () => null,
      onCreate: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null,
      onContentError: ({ error: t }) => {
        throw t;
      },
      onPaste: () => null,
      onDrop: () => null
    }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.setOptions(e), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("contentError", this.options.onContentError), this.createView(), this.injectCSS(), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), this.on("drop", ({ event: t, slice: r, moved: i }) => this.options.onDrop(t, r, i)), this.on("paste", ({ event: t, slice: r }) => this.options.onPaste(t, r)), window.setTimeout(() => {
      this.isDestroyed || (this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }), this.isInitialized = !0);
    }, 0);
  }
  /**
   * Returns the editor storage.
   */
  get storage() {
    return this.extensionStorage;
  }
  /**
   * An object of all registered commands.
   */
  get commands() {
    return this.commandManager.commands;
  }
  /**
   * Create a command chain to call multiple commands at once.
   */
  chain() {
    return this.commandManager.chain();
  }
  /**
   * Check if a command or a command chain can be executed. Without executing it.
   */
  can() {
    return this.commandManager.can();
  }
  /**
   * Inject CSS styles.
   */
  injectCSS() {
    this.options.injectCSS && document && (this.css = lv(sv, this.options.injectNonce));
  }
  /**
   * Update editor options.
   *
   * @param options A list of options
   */
  setOptions(e = {}) {
    this.options = {
      ...this.options,
      ...e
    }, !(!this.view || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
  }
  /**
   * Update editable state of the editor.
   */
  setEditable(e, t = !0) {
    this.setOptions({ editable: e }), t && this.emit("update", { editor: this, transaction: this.state.tr });
  }
  /**
   * Returns whether the editor is editable.
   */
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  /**
   * Returns the editor state.
   */
  get state() {
    return this.view.state;
  }
  /**
   * Register a ProseMirror plugin.
   *
   * @param plugin A ProseMirror plugin
   * @param handlePlugins Control how to merge the plugin into the existing plugins.
   * @returns The new editor state
   */
  registerPlugin(e, t) {
    const r = Dp(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e], i = this.state.reconfigure({ plugins: r });
    return this.view.updateState(i), i;
  }
  /**
   * Unregister a ProseMirror plugin.
   *
   * @param nameOrPluginKeyToRemove The plugins name
   * @returns The new editor state or undefined if the editor is destroyed
   */
  unregisterPlugin(e) {
    if (this.isDestroyed)
      return;
    const t = this.state.plugins;
    let r = t;
    if ([].concat(e).forEach((o) => {
      const s = typeof o == "string" ? `${o}$` : o.key;
      r = t.filter((l) => !l.key.startsWith(s));
    }), t.length === r.length)
      return;
    const i = this.state.reconfigure({
      plugins: r
    });
    return this.view.updateState(i), i;
  }
  /**
   * Creates an extension manager.
   */
  createExtensionManager() {
    var e, t;
    const i = [...this.options.enableCoreExtensions ? [
      tv,
      Pb.configure({
        blockSeparator: (t = (e = this.options.coreExtensionOptions) === null || e === void 0 ? void 0 : e.clipboardTextSerializer) === null || t === void 0 ? void 0 : t.blockSeparator
      }),
      Q0,
      nv,
      rv,
      ov,
      ev,
      iv
    ].filter((o) => typeof this.options.enableCoreExtensions == "object" ? this.options.enableCoreExtensions[o.name] !== !1 : !0) : [], ...this.options.extensions].filter((o) => ["extension", "node", "mark"].includes(o == null ? void 0 : o.type));
    this.extensionManager = new lr(i, this);
  }
  /**
   * Creates an command manager.
   */
  createCommandManager() {
    this.commandManager = new bs({
      editor: this
    });
  }
  /**
   * Creates a ProseMirror schema.
   */
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  /**
   * Creates a ProseMirror view.
   */
  createView() {
    var e;
    let t;
    try {
      t = Il(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: this.options.enableContentCheck });
    } catch (s) {
      if (!(s instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(s.message))
        throw s;
      this.emit("contentError", {
        editor: this,
        error: s,
        disableCollaboration: () => {
          this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((l) => l.name !== "collaboration"), this.createExtensionManager();
        }
      }), t = Il(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: !1 });
    }
    const r = Ip(t, this.options.autofocus);
    this.view = new Wy(this.options.element, {
      ...this.options.editorProps,
      attributes: {
        // add `role="textbox"` to the editor element
        role: "textbox",
        ...(e = this.options.editorProps) === null || e === void 0 ? void 0 : e.attributes
      },
      dispatchTransaction: this.dispatchTransaction.bind(this),
      state: sr.create({
        doc: t,
        selection: r || void 0
      })
    });
    const i = this.state.reconfigure({
      plugins: this.extensionManager.plugins
    });
    this.view.updateState(i), this.createNodeViews(), this.prependClass();
    const o = this.view.dom;
    o.editor = this;
  }
  /**
   * Creates all node views.
   */
  createNodeViews() {
    this.view.isDestroyed || this.view.setProps({
      nodeViews: this.extensionManager.nodeViews
    });
  }
  /**
   * Prepend class name to element.
   */
  prependClass() {
    this.view.dom.className = `tiptap ${this.view.dom.className}`;
  }
  captureTransaction(e) {
    this.isCapturingTransaction = !0, e(), this.isCapturingTransaction = !1;
    const t = this.capturedTransaction;
    return this.capturedTransaction = null, t;
  }
  /**
   * The callback over which to send transactions (state updates) produced by the view.
   *
   * @param transaction An editor state transaction
   */
  dispatchTransaction(e) {
    if (this.view.isDestroyed)
      return;
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = e;
        return;
      }
      e.steps.forEach((s) => {
        var l;
        return (l = this.capturedTransaction) === null || l === void 0 ? void 0 : l.step(s);
      });
      return;
    }
    const t = this.state.apply(e), r = !this.state.selection.eq(t.selection);
    this.emit("beforeTransaction", {
      editor: this,
      transaction: e,
      nextState: t
    }), this.view.updateState(t), this.emit("transaction", {
      editor: this,
      transaction: e
    }), r && this.emit("selectionUpdate", {
      editor: this,
      transaction: e
    });
    const i = e.getMeta("focus"), o = e.getMeta("blur");
    i && this.emit("focus", {
      editor: this,
      event: i.event,
      transaction: e
    }), o && this.emit("blur", {
      editor: this,
      event: o.event,
      transaction: e
    }), !(!e.docChanged || e.getMeta("preventUpdate")) && this.emit("update", {
      editor: this,
      transaction: e
    });
  }
  /**
   * Get attributes of the currently selected node or mark.
   */
  getAttributes(e) {
    return Vp(this.state, e);
  }
  isActive(e, t) {
    const r = typeof e == "string" ? e : null, i = typeof e == "string" ? t : e;
    return _0(this.state, r, i);
  }
  /**
   * Get the document as JSON.
   */
  getJSON() {
    return this.state.doc.toJSON();
  }
  /**
   * Get the document as HTML.
   */
  getHTML() {
    return Ia(this.state.doc.content, this.schema);
  }
  /**
   * Get the document as text.
   */
  getText(e) {
    const { blockSeparator: t = `

`, textSerializers: r = {} } = e || {};
    return Hp(this.state.doc, {
      blockSeparator: t,
      textSerializers: {
        ...La(this.schema),
        ...r
      }
    });
  }
  /**
   * Check if there is no content.
   */
  get isEmpty() {
    return Cs(this.state.doc);
  }
  /**
   * Get the number of characters for the current document.
   *
   * @deprecated
   */
  getCharacterCount() {
    return console.warn('[tiptap warn]: "editor.getCharacterCount()" is deprecated. Please use "editor.storage.characterCount.characters()" instead.'), this.state.doc.content.size - 2;
  }
  /**
   * Destroy the editor.
   */
  destroy() {
    if (this.emit("destroy"), this.view) {
      const e = this.view.dom;
      e && e.editor && delete e.editor, this.view.destroy();
    }
    this.removeAllListeners();
  }
  /**
   * Check if the editor is already destroyed.
   */
  get isDestroyed() {
    var e;
    return !(!((e = this.view) === null || e === void 0) && e.docView);
  }
  $node(e, t) {
    var r;
    return ((r = this.$doc) === null || r === void 0 ? void 0 : r.querySelector(e, t)) || null;
  }
  $nodes(e, t) {
    var r;
    return ((r = this.$doc) === null || r === void 0 ? void 0 : r.querySelectorAll(e, t)) || null;
  }
  $pos(e) {
    const t = this.state.doc.resolve(e);
    return new kn(t, this);
  }
  get $doc() {
    return this.$pos(0);
  }
};
function yr(n) {
  return new ws({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = $(n.getAttributes, void 0, r);
      if (i === !1 || i === null)
        return null;
      const { tr: o } = e, s = r[r.length - 1], l = r[0];
      if (s) {
        const a = l.search(/\S/), c = t.from + l.indexOf(s), d = c + s.length;
        if (Ha(t.from, t.to, e.doc).filter((p) => p.mark.type.excluded.find((m) => m === n.type && m !== p.mark.type)).filter((p) => p.to > c).length)
          return null;
        d < t.to && o.delete(d, t.to), c > t.from && o.delete(t.from + a, c);
        const f = t.from + a + s.length;
        o.addMark(t.from + a, f, n.type.create(i || {})), o.removeStoredMark(n.type);
      }
    }
  });
}
function Wp(n) {
  return new ws({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = $(n.getAttributes, void 0, r) || {}, { tr: o } = e, s = t.from;
      let l = t.to;
      const a = n.type.create(i);
      if (r[1]) {
        const c = r[0].lastIndexOf(r[1]);
        let d = s + c;
        d > l ? d = l : l = d + r[1].length;
        const u = r[0][r[0].length - 1];
        o.insertText(u, s + r[0].length - 1), o.replaceWith(d, l, a);
      } else if (r[0]) {
        const c = n.type.isInline ? s : s - 1;
        o.insert(c, n.type.create(i)).delete(o.mapping.map(s), o.mapping.map(l));
      }
      o.scrollIntoView();
    }
  });
}
function Ll(n) {
  return new ws({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = e.doc.resolve(t.from), o = $(n.getAttributes, void 0, r) || {};
      if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), n.type))
        return null;
      e.tr.delete(t.from, t.to).setBlockType(t.from, t.from, n.type, o);
    }
  });
}
function fi(n) {
  return new ws({
    find: n.find,
    handler: ({ state: e, range: t, match: r, chain: i }) => {
      const o = $(n.getAttributes, void 0, r) || {}, s = e.tr.delete(t.from, t.to), a = s.doc.resolve(t.from).blockRange(), c = a && ya(a, n.type, o);
      if (!c)
        return null;
      if (s.wrap(a, c), n.keepMarks && n.editor) {
        const { selection: u, storedMarks: f } = e, { splittableMarks: p } = n.editor.extensionManager, h = f || u.$to.parentOffset && u.$from.marks();
        if (h) {
          const m = h.filter((g) => p.includes(g.type.name));
          s.ensureMarks(m);
        }
      }
      if (n.keepAttributes) {
        const u = n.type.name === "bulletList" || n.type.name === "orderedList" ? "listItem" : "taskList";
        i().updateAttributes(u, o).run();
      }
      const d = s.doc.resolve(t.from - 1).nodeBefore;
      d && d.type === n.type && fn(s.doc, t.from - 1) && (!n.joinPredicate || n.joinPredicate(r, d)) && s.join(t.from - 1);
    }
  });
}
class ue {
  constructor(e = {}) {
    this.type = "node", this.name = "node", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = $(D(this, "addOptions", {
      name: this.name
    }))), this.storage = $(D(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new ue(e);
  }
  configure(e = {}) {
    const t = this.extend({
      ...this.config,
      addOptions: () => Ss(this.options, e)
    });
    return t.name = this.name, t.parent = this.parent, t;
  }
  extend(e = {}) {
    const t = new ue(e);
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = $(D(t, "addOptions", {
      name: t.name
    })), t.storage = $(D(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
class cv {
  constructor(e, t, r) {
    this.isDragging = !1, this.component = e, this.editor = t.editor, this.options = {
      stopEvent: null,
      ignoreMutation: null,
      ...r
    }, this.extension = t.extension, this.node = t.node, this.decorations = t.decorations, this.innerDecorations = t.innerDecorations, this.view = t.view, this.HTMLAttributes = t.HTMLAttributes, this.getPos = t.getPos, this.mount();
  }
  mount() {
  }
  get dom() {
    return this.editor.view.dom;
  }
  get contentDOM() {
    return null;
  }
  onDragStart(e) {
    var t, r, i, o, s, l, a;
    const { view: c } = this.editor, d = e.target, u = d.nodeType === 3 ? (t = d.parentElement) === null || t === void 0 ? void 0 : t.closest("[data-drag-handle]") : d.closest("[data-drag-handle]");
    if (!this.dom || !((r = this.contentDOM) === null || r === void 0) && r.contains(d) || !u)
      return;
    let f = 0, p = 0;
    if (this.dom !== u) {
      const y = this.dom.getBoundingClientRect(), w = u.getBoundingClientRect(), A = (i = e.offsetX) !== null && i !== void 0 ? i : (o = e.nativeEvent) === null || o === void 0 ? void 0 : o.offsetX, b = (s = e.offsetY) !== null && s !== void 0 ? s : (l = e.nativeEvent) === null || l === void 0 ? void 0 : l.offsetY;
      f = w.x - y.x + A, p = w.y - y.y + b;
    }
    (a = e.dataTransfer) === null || a === void 0 || a.setDragImage(this.dom, f, p);
    const h = this.getPos();
    if (typeof h != "number")
      return;
    const m = P.create(c.state.doc, h), g = c.state.tr.setSelection(m);
    c.dispatch(g);
  }
  stopEvent(e) {
    var t;
    if (!this.dom)
      return !1;
    if (typeof this.options.stopEvent == "function")
      return this.options.stopEvent({ event: e });
    const r = e.target;
    if (!(this.dom.contains(r) && !(!((t = this.contentDOM) === null || t === void 0) && t.contains(r))))
      return !1;
    const o = e.type.startsWith("drag"), s = e.type === "drop";
    if ((["INPUT", "BUTTON", "SELECT", "TEXTAREA"].includes(r.tagName) || r.isContentEditable) && !s && !o)
      return !0;
    const { isEditable: a } = this.editor, { isDragging: c } = this, d = !!this.node.type.spec.draggable, u = P.isSelectable(this.node), f = e.type === "copy", p = e.type === "paste", h = e.type === "cut", m = e.type === "mousedown";
    if (!d && u && o && e.target === this.dom && e.preventDefault(), d && o && !c && e.target === this.dom)
      return e.preventDefault(), !1;
    if (d && a && !c && m) {
      const g = r.closest("[data-drag-handle]");
      g && (this.dom === g || this.dom.contains(g)) && (this.isDragging = !0, document.addEventListener("dragend", () => {
        this.isDragging = !1;
      }, { once: !0 }), document.addEventListener("drop", () => {
        this.isDragging = !1;
      }, { once: !0 }), document.addEventListener("mouseup", () => {
        this.isDragging = !1;
      }, { once: !0 }));
    }
    return !(c || s || f || p || h || m && u);
  }
  /**
   * Called when a DOM [mutation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) or a selection change happens within the view.
   * @return `false` if the editor should re-read the selection or re-parse the range around the mutation
   * @return `true` if it can safely be ignored.
   */
  ignoreMutation(e) {
    return !this.dom || !this.contentDOM ? !0 : typeof this.options.ignoreMutation == "function" ? this.options.ignoreMutation({ mutation: e }) : this.node.isLeaf || this.node.isAtom ? !0 : e.type === "selection" || this.dom.contains(e.target) && e.type === "childList" && (xs() || Pp()) && this.editor.isFocused && [
      ...Array.from(e.addedNodes),
      ...Array.from(e.removedNodes)
    ].every((r) => r.isContentEditable) ? !1 : this.contentDOM === e.target && e.type === "attributes" ? !0 : !this.contentDOM.contains(e.target);
  }
  /**
   * Update the attributes of the prosemirror node.
   */
  updateAttributes(e) {
    this.editor.commands.command(({ tr: t }) => {
      const r = this.getPos();
      return typeof r != "number" ? !1 : (t.setNodeMarkup(r, void 0, {
        ...this.node.attrs,
        ...e
      }), !0);
    });
  }
  /**
   * Delete the node.
   */
  deleteNode() {
    const e = this.getPos();
    if (typeof e != "number")
      return;
    const t = e + this.node.nodeSize;
    this.editor.commands.deleteRange({ from: e, to: t });
  }
}
function zn(n) {
  return new Ob({
    find: n.find,
    handler: ({ state: e, range: t, match: r, pasteEvent: i }) => {
      const o = $(n.getAttributes, void 0, r, i);
      if (o === !1 || o === null)
        return null;
      const { tr: s } = e, l = r[r.length - 1], a = r[0];
      let c = t.to;
      if (l) {
        const d = a.search(/\S/), u = t.from + a.indexOf(l), f = u + l.length;
        if (Ha(t.from, t.to, e.doc).filter((h) => h.mark.type.excluded.find((g) => g === n.type && g !== h.mark.type)).filter((h) => h.to > u).length)
          return null;
        f < t.to && s.delete(f, t.to), u > t.from && s.delete(t.from + d, u), c = t.from + d + l.length, s.addMark(t.from + d, c, n.type.create(o || {})), s.removeStoredMark(n.type);
      }
    }
  });
}
var Be = "top", Qe = "bottom", et = "right", ze = "left", Va = "auto", Mi = [Be, Qe, et, ze], br = "start", pi = "end", dv = "clippingParents", Up = "viewport", Pr = "popper", uv = "reference", kd = /* @__PURE__ */ Mi.reduce(function(n, e) {
  return n.concat([e + "-" + br, e + "-" + pi]);
}, []), Kp = /* @__PURE__ */ [].concat(Mi, [Va]).reduce(function(n, e) {
  return n.concat([e, e + "-" + br, e + "-" + pi]);
}, []), fv = "beforeRead", pv = "read", hv = "afterRead", mv = "beforeMain", gv = "main", yv = "afterMain", bv = "beforeWrite", vv = "write", wv = "afterWrite", Sv = [fv, pv, hv, mv, gv, yv, bv, vv, wv];
function bt(n) {
  return n ? (n.nodeName || "").toLowerCase() : null;
}
function Ue(n) {
  if (n == null)
    return window;
  if (n.toString() !== "[object Window]") {
    var e = n.ownerDocument;
    return e && e.defaultView || window;
  }
  return n;
}
function Fn(n) {
  var e = Ue(n).Element;
  return n instanceof e || n instanceof Element;
}
function Ze(n) {
  var e = Ue(n).HTMLElement;
  return n instanceof e || n instanceof HTMLElement;
}
function $a(n) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Ue(n).ShadowRoot;
  return n instanceof e || n instanceof ShadowRoot;
}
function xv(n) {
  var e = n.state;
  Object.keys(e.elements).forEach(function(t) {
    var r = e.styles[t] || {}, i = e.attributes[t] || {}, o = e.elements[t];
    !Ze(o) || !bt(o) || (Object.assign(o.style, r), Object.keys(i).forEach(function(s) {
      var l = i[s];
      l === !1 ? o.removeAttribute(s) : o.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function kv(n) {
  var e = n.state, t = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, t.popper), e.styles = t, e.elements.arrow && Object.assign(e.elements.arrow.style, t.arrow), function() {
    Object.keys(e.elements).forEach(function(r) {
      var i = e.elements[r], o = e.attributes[r] || {}, s = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : t[r]), l = s.reduce(function(a, c) {
        return a[c] = "", a;
      }, {});
      !Ze(i) || !bt(i) || (Object.assign(i.style, l), Object.keys(o).forEach(function(a) {
        i.removeAttribute(a);
      }));
    });
  };
}
const qp = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: xv,
  effect: kv,
  requires: ["computeStyles"]
};
function mt(n) {
  return n.split("-")[0];
}
var Rn = Math.max, _o = Math.min, vr = Math.round;
function Bl() {
  var n = navigator.userAgentData;
  return n != null && n.brands && Array.isArray(n.brands) ? n.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function Gp() {
  return !/^((?!chrome|android).)*safari/i.test(Bl());
}
function wr(n, e, t) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  var r = n.getBoundingClientRect(), i = 1, o = 1;
  e && Ze(n) && (i = n.offsetWidth > 0 && vr(r.width) / n.offsetWidth || 1, o = n.offsetHeight > 0 && vr(r.height) / n.offsetHeight || 1);
  var s = Fn(n) ? Ue(n) : window, l = s.visualViewport, a = !Gp() && t, c = (r.left + (a && l ? l.offsetLeft : 0)) / i, d = (r.top + (a && l ? l.offsetTop : 0)) / o, u = r.width / i, f = r.height / o;
  return {
    width: u,
    height: f,
    top: d,
    right: c + u,
    bottom: d + f,
    left: c,
    x: c,
    y: d
  };
}
function ja(n) {
  var e = wr(n), t = n.offsetWidth, r = n.offsetHeight;
  return Math.abs(e.width - t) <= 1 && (t = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: n.offsetLeft,
    y: n.offsetTop,
    width: t,
    height: r
  };
}
function Jp(n, e) {
  var t = e.getRootNode && e.getRootNode();
  if (n.contains(e))
    return !0;
  if (t && $a(t)) {
    var r = e;
    do {
      if (r && n.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Vt(n) {
  return Ue(n).getComputedStyle(n);
}
function Cv(n) {
  return ["table", "td", "th"].indexOf(bt(n)) >= 0;
}
function mn(n) {
  return ((Fn(n) ? n.ownerDocument : (
    // $FlowFixMe[prop-missing]
    n.document
  )) || window.document).documentElement;
}
function Ts(n) {
  return bt(n) === "html" ? n : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    n.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    n.parentNode || // DOM Element detected
    ($a(n) ? n.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    mn(n)
  );
}
function Cd(n) {
  return !Ze(n) || // https://github.com/popperjs/popper-core/issues/837
  Vt(n).position === "fixed" ? null : n.offsetParent;
}
function Tv(n) {
  var e = /firefox/i.test(Bl()), t = /Trident/i.test(Bl());
  if (t && Ze(n)) {
    var r = Vt(n);
    if (r.position === "fixed")
      return null;
  }
  var i = Ts(n);
  for ($a(i) && (i = i.host); Ze(i) && ["html", "body"].indexOf(bt(i)) < 0; ) {
    var o = Vt(i);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || e && o.willChange === "filter" || e && o.filter && o.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function Ei(n) {
  for (var e = Ue(n), t = Cd(n); t && Cv(t) && Vt(t).position === "static"; )
    t = Cd(t);
  return t && (bt(t) === "html" || bt(t) === "body" && Vt(t).position === "static") ? e : t || Tv(n) || e;
}
function Wa(n) {
  return ["top", "bottom"].indexOf(n) >= 0 ? "x" : "y";
}
function Ur(n, e, t) {
  return Rn(n, _o(e, t));
}
function Av(n, e, t) {
  var r = Ur(n, e, t);
  return r > t ? t : r;
}
function Yp() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Xp(n) {
  return Object.assign({}, Yp(), n);
}
function Zp(n, e) {
  return e.reduce(function(t, r) {
    return t[r] = n, t;
  }, {});
}
var Mv = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, {
    placement: t.placement
  })) : e, Xp(typeof e != "number" ? e : Zp(e, Mi));
};
function Ev(n) {
  var e, t = n.state, r = n.name, i = n.options, o = t.elements.arrow, s = t.modifiersData.popperOffsets, l = mt(t.placement), a = Wa(l), c = [ze, et].indexOf(l) >= 0, d = c ? "height" : "width";
  if (!(!o || !s)) {
    var u = Mv(i.padding, t), f = ja(o), p = a === "y" ? Be : ze, h = a === "y" ? Qe : et, m = t.rects.reference[d] + t.rects.reference[a] - s[a] - t.rects.popper[d], g = s[a] - t.rects.reference[a], y = Ei(o), w = y ? a === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0, A = m / 2 - g / 2, b = u[p], C = w - f[d] - u[h], v = w / 2 - f[d] / 2 + A, _ = Ur(b, v, C), z = a;
    t.modifiersData[r] = (e = {}, e[z] = _, e.centerOffset = _ - v, e);
  }
}
function Ov(n) {
  var e = n.state, t = n.options, r = t.element, i = r === void 0 ? "[data-popper-arrow]" : r;
  i != null && (typeof i == "string" && (i = e.elements.popper.querySelector(i), !i) || Jp(e.elements.popper, i) && (e.elements.arrow = i));
}
const Nv = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Ev,
  effect: Ov,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Sr(n) {
  return n.split("-")[1];
}
var Dv = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function _v(n, e) {
  var t = n.x, r = n.y, i = e.devicePixelRatio || 1;
  return {
    x: vr(t * i) / i || 0,
    y: vr(r * i) / i || 0
  };
}
function Td(n) {
  var e, t = n.popper, r = n.popperRect, i = n.placement, o = n.variation, s = n.offsets, l = n.position, a = n.gpuAcceleration, c = n.adaptive, d = n.roundOffsets, u = n.isFixed, f = s.x, p = f === void 0 ? 0 : f, h = s.y, m = h === void 0 ? 0 : h, g = typeof d == "function" ? d({
    x: p,
    y: m
  }) : {
    x: p,
    y: m
  };
  p = g.x, m = g.y;
  var y = s.hasOwnProperty("x"), w = s.hasOwnProperty("y"), A = ze, b = Be, C = window;
  if (c) {
    var v = Ei(t), _ = "clientHeight", z = "clientWidth";
    if (v === Ue(t) && (v = mn(t), Vt(v).position !== "static" && l === "absolute" && (_ = "scrollHeight", z = "scrollWidth")), v = v, i === Be || (i === ze || i === et) && o === pi) {
      b = Qe;
      var R = u && v === C && C.visualViewport ? C.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        v[_]
      );
      m -= R - r.height, m *= a ? 1 : -1;
    }
    if (i === ze || (i === Be || i === Qe) && o === pi) {
      A = et;
      var j = u && v === C && C.visualViewport ? C.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        v[z]
      );
      p -= j - r.width, p *= a ? 1 : -1;
    }
  }
  var q = Object.assign({
    position: l
  }, c && Dv), K = d === !0 ? _v({
    x: p,
    y: m
  }, Ue(t)) : {
    x: p,
    y: m
  };
  if (p = K.x, m = K.y, a) {
    var Y;
    return Object.assign({}, q, (Y = {}, Y[b] = w ? "0" : "", Y[A] = y ? "0" : "", Y.transform = (C.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + m + "px)" : "translate3d(" + p + "px, " + m + "px, 0)", Y));
  }
  return Object.assign({}, q, (e = {}, e[b] = w ? m + "px" : "", e[A] = y ? p + "px" : "", e.transform = "", e));
}
function Rv(n) {
  var e = n.state, t = n.options, r = t.gpuAcceleration, i = r === void 0 ? !0 : r, o = t.adaptive, s = o === void 0 ? !0 : o, l = t.roundOffsets, a = l === void 0 ? !0 : l, c = {
    placement: mt(e.placement),
    variation: Sr(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: i,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Td(Object.assign({}, c, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: s,
    roundOffsets: a
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Td(Object.assign({}, c, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: a
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const Iv = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Rv,
  data: {}
};
var qi = {
  passive: !0
};
function Pv(n) {
  var e = n.state, t = n.instance, r = n.options, i = r.scroll, o = i === void 0 ? !0 : i, s = r.resize, l = s === void 0 ? !0 : s, a = Ue(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return o && c.forEach(function(d) {
    d.addEventListener("scroll", t.update, qi);
  }), l && a.addEventListener("resize", t.update, qi), function() {
    o && c.forEach(function(d) {
      d.removeEventListener("scroll", t.update, qi);
    }), l && a.removeEventListener("resize", t.update, qi);
  };
}
const Lv = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Pv,
  data: {}
};
var Bv = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function fo(n) {
  return n.replace(/left|right|bottom|top/g, function(e) {
    return Bv[e];
  });
}
var zv = {
  start: "end",
  end: "start"
};
function Ad(n) {
  return n.replace(/start|end/g, function(e) {
    return zv[e];
  });
}
function Ua(n) {
  var e = Ue(n), t = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: t,
    scrollTop: r
  };
}
function Ka(n) {
  return wr(mn(n)).left + Ua(n).scrollLeft;
}
function Fv(n, e) {
  var t = Ue(n), r = mn(n), i = t.visualViewport, o = r.clientWidth, s = r.clientHeight, l = 0, a = 0;
  if (i) {
    o = i.width, s = i.height;
    var c = Gp();
    (c || !c && e === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: o,
    height: s,
    x: l + Ka(n),
    y: a
  };
}
function Hv(n) {
  var e, t = mn(n), r = Ua(n), i = (e = n.ownerDocument) == null ? void 0 : e.body, o = Rn(t.scrollWidth, t.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), s = Rn(t.scrollHeight, t.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), l = -r.scrollLeft + Ka(n), a = -r.scrollTop;
  return Vt(i || t).direction === "rtl" && (l += Rn(t.clientWidth, i ? i.clientWidth : 0) - o), {
    width: o,
    height: s,
    x: l,
    y: a
  };
}
function qa(n) {
  var e = Vt(n), t = e.overflow, r = e.overflowX, i = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + i + r);
}
function Qp(n) {
  return ["html", "body", "#document"].indexOf(bt(n)) >= 0 ? n.ownerDocument.body : Ze(n) && qa(n) ? n : Qp(Ts(n));
}
function Kr(n, e) {
  var t;
  e === void 0 && (e = []);
  var r = Qp(n), i = r === ((t = n.ownerDocument) == null ? void 0 : t.body), o = Ue(r), s = i ? [o].concat(o.visualViewport || [], qa(r) ? r : []) : r, l = e.concat(s);
  return i ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(Kr(Ts(s)))
  );
}
function zl(n) {
  return Object.assign({}, n, {
    left: n.x,
    top: n.y,
    right: n.x + n.width,
    bottom: n.y + n.height
  });
}
function Vv(n, e) {
  var t = wr(n, !1, e === "fixed");
  return t.top = t.top + n.clientTop, t.left = t.left + n.clientLeft, t.bottom = t.top + n.clientHeight, t.right = t.left + n.clientWidth, t.width = n.clientWidth, t.height = n.clientHeight, t.x = t.left, t.y = t.top, t;
}
function Md(n, e, t) {
  return e === Up ? zl(Fv(n, t)) : Fn(e) ? Vv(e, t) : zl(Hv(mn(n)));
}
function $v(n) {
  var e = Kr(Ts(n)), t = ["absolute", "fixed"].indexOf(Vt(n).position) >= 0, r = t && Ze(n) ? Ei(n) : n;
  return Fn(r) ? e.filter(function(i) {
    return Fn(i) && Jp(i, r) && bt(i) !== "body";
  }) : [];
}
function jv(n, e, t, r) {
  var i = e === "clippingParents" ? $v(n) : [].concat(e), o = [].concat(i, [t]), s = o[0], l = o.reduce(function(a, c) {
    var d = Md(n, c, r);
    return a.top = Rn(d.top, a.top), a.right = _o(d.right, a.right), a.bottom = _o(d.bottom, a.bottom), a.left = Rn(d.left, a.left), a;
  }, Md(n, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function eh(n) {
  var e = n.reference, t = n.element, r = n.placement, i = r ? mt(r) : null, o = r ? Sr(r) : null, s = e.x + e.width / 2 - t.width / 2, l = e.y + e.height / 2 - t.height / 2, a;
  switch (i) {
    case Be:
      a = {
        x: s,
        y: e.y - t.height
      };
      break;
    case Qe:
      a = {
        x: s,
        y: e.y + e.height
      };
      break;
    case et:
      a = {
        x: e.x + e.width,
        y: l
      };
      break;
    case ze:
      a = {
        x: e.x - t.width,
        y: l
      };
      break;
    default:
      a = {
        x: e.x,
        y: e.y
      };
  }
  var c = i ? Wa(i) : null;
  if (c != null) {
    var d = c === "y" ? "height" : "width";
    switch (o) {
      case br:
        a[c] = a[c] - (e[d] / 2 - t[d] / 2);
        break;
      case pi:
        a[c] = a[c] + (e[d] / 2 - t[d] / 2);
        break;
    }
  }
  return a;
}
function hi(n, e) {
  e === void 0 && (e = {});
  var t = e, r = t.placement, i = r === void 0 ? n.placement : r, o = t.strategy, s = o === void 0 ? n.strategy : o, l = t.boundary, a = l === void 0 ? dv : l, c = t.rootBoundary, d = c === void 0 ? Up : c, u = t.elementContext, f = u === void 0 ? Pr : u, p = t.altBoundary, h = p === void 0 ? !1 : p, m = t.padding, g = m === void 0 ? 0 : m, y = Xp(typeof g != "number" ? g : Zp(g, Mi)), w = f === Pr ? uv : Pr, A = n.rects.popper, b = n.elements[h ? w : f], C = jv(Fn(b) ? b : b.contextElement || mn(n.elements.popper), a, d, s), v = wr(n.elements.reference), _ = eh({
    reference: v,
    element: A,
    placement: i
  }), z = zl(Object.assign({}, A, _)), R = f === Pr ? z : v, j = {
    top: C.top - R.top + y.top,
    bottom: R.bottom - C.bottom + y.bottom,
    left: C.left - R.left + y.left,
    right: R.right - C.right + y.right
  }, q = n.modifiersData.offset;
  if (f === Pr && q) {
    var K = q[i];
    Object.keys(j).forEach(function(Y) {
      var we = [et, Qe].indexOf(Y) >= 0 ? 1 : -1, he = [Be, Qe].indexOf(Y) >= 0 ? "y" : "x";
      j[Y] += K[he] * we;
    });
  }
  return j;
}
function Wv(n, e) {
  e === void 0 && (e = {});
  var t = e, r = t.placement, i = t.boundary, o = t.rootBoundary, s = t.padding, l = t.flipVariations, a = t.allowedAutoPlacements, c = a === void 0 ? Kp : a, d = Sr(r), u = d ? l ? kd : kd.filter(function(h) {
    return Sr(h) === d;
  }) : Mi, f = u.filter(function(h) {
    return c.indexOf(h) >= 0;
  });
  f.length === 0 && (f = u);
  var p = f.reduce(function(h, m) {
    return h[m] = hi(n, {
      placement: m,
      boundary: i,
      rootBoundary: o,
      padding: s
    })[mt(m)], h;
  }, {});
  return Object.keys(p).sort(function(h, m) {
    return p[h] - p[m];
  });
}
function Uv(n) {
  if (mt(n) === Va)
    return [];
  var e = fo(n);
  return [Ad(n), e, Ad(e)];
}
function Kv(n) {
  var e = n.state, t = n.options, r = n.name;
  if (!e.modifiersData[r]._skip) {
    for (var i = t.mainAxis, o = i === void 0 ? !0 : i, s = t.altAxis, l = s === void 0 ? !0 : s, a = t.fallbackPlacements, c = t.padding, d = t.boundary, u = t.rootBoundary, f = t.altBoundary, p = t.flipVariations, h = p === void 0 ? !0 : p, m = t.allowedAutoPlacements, g = e.options.placement, y = mt(g), w = y === g, A = a || (w || !h ? [fo(g)] : Uv(g)), b = [g].concat(A).reduce(function(Ct, tt) {
      return Ct.concat(mt(tt) === Va ? Wv(e, {
        placement: tt,
        boundary: d,
        rootBoundary: u,
        padding: c,
        flipVariations: h,
        allowedAutoPlacements: m
      }) : tt);
    }, []), C = e.rects.reference, v = e.rects.popper, _ = /* @__PURE__ */ new Map(), z = !0, R = b[0], j = 0; j < b.length; j++) {
      var q = b[j], K = mt(q), Y = Sr(q) === br, we = [Be, Qe].indexOf(K) >= 0, he = we ? "width" : "height", oe = hi(e, {
        placement: q,
        boundary: d,
        rootBoundary: u,
        altBoundary: f,
        padding: c
      }), se = we ? Y ? et : ze : Y ? Qe : Be;
      C[he] > v[he] && (se = fo(se));
      var Se = fo(se), lt = [];
      if (o && lt.push(oe[K] <= 0), l && lt.push(oe[se] <= 0, oe[Se] <= 0), lt.every(function(Ct) {
        return Ct;
      })) {
        R = q, z = !1;
        break;
      }
      _.set(q, lt);
    }
    if (z)
      for (var at = h ? 3 : 1, gn = function(tt) {
        var Tt = b.find(function(qn) {
          var At = _.get(qn);
          if (At)
            return At.slice(0, tt).every(function(Gn) {
              return Gn;
            });
        });
        if (Tt)
          return R = Tt, "break";
      }, ct = at; ct > 0; ct--) {
        var yn = gn(ct);
        if (yn === "break") break;
      }
    e.placement !== R && (e.modifiersData[r]._skip = !0, e.placement = R, e.reset = !0);
  }
}
const qv = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Kv,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Ed(n, e, t) {
  return t === void 0 && (t = {
    x: 0,
    y: 0
  }), {
    top: n.top - e.height - t.y,
    right: n.right - e.width + t.x,
    bottom: n.bottom - e.height + t.y,
    left: n.left - e.width - t.x
  };
}
function Od(n) {
  return [Be, et, Qe, ze].some(function(e) {
    return n[e] >= 0;
  });
}
function Gv(n) {
  var e = n.state, t = n.name, r = e.rects.reference, i = e.rects.popper, o = e.modifiersData.preventOverflow, s = hi(e, {
    elementContext: "reference"
  }), l = hi(e, {
    altBoundary: !0
  }), a = Ed(s, r), c = Ed(l, i, o), d = Od(a), u = Od(c);
  e.modifiersData[t] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: c,
    isReferenceHidden: d,
    hasPopperEscaped: u
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": d,
    "data-popper-escaped": u
  });
}
const Jv = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Gv
};
function Yv(n, e, t) {
  var r = mt(n), i = [ze, Be].indexOf(r) >= 0 ? -1 : 1, o = typeof t == "function" ? t(Object.assign({}, e, {
    placement: n
  })) : t, s = o[0], l = o[1];
  return s = s || 0, l = (l || 0) * i, [ze, et].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function Xv(n) {
  var e = n.state, t = n.options, r = n.name, i = t.offset, o = i === void 0 ? [0, 0] : i, s = Kp.reduce(function(d, u) {
    return d[u] = Yv(u, e.rects, o), d;
  }, {}), l = s[e.placement], a = l.x, c = l.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += a, e.modifiersData.popperOffsets.y += c), e.modifiersData[r] = s;
}
const Zv = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Xv
};
function Qv(n) {
  var e = n.state, t = n.name;
  e.modifiersData[t] = eh({
    reference: e.rects.reference,
    element: e.rects.popper,
    placement: e.placement
  });
}
const e1 = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Qv,
  data: {}
};
function t1(n) {
  return n === "x" ? "y" : "x";
}
function n1(n) {
  var e = n.state, t = n.options, r = n.name, i = t.mainAxis, o = i === void 0 ? !0 : i, s = t.altAxis, l = s === void 0 ? !1 : s, a = t.boundary, c = t.rootBoundary, d = t.altBoundary, u = t.padding, f = t.tether, p = f === void 0 ? !0 : f, h = t.tetherOffset, m = h === void 0 ? 0 : h, g = hi(e, {
    boundary: a,
    rootBoundary: c,
    padding: u,
    altBoundary: d
  }), y = mt(e.placement), w = Sr(e.placement), A = !w, b = Wa(y), C = t1(b), v = e.modifiersData.popperOffsets, _ = e.rects.reference, z = e.rects.popper, R = typeof m == "function" ? m(Object.assign({}, e.rects, {
    placement: e.placement
  })) : m, j = typeof R == "number" ? {
    mainAxis: R,
    altAxis: R
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, R), q = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, K = {
    x: 0,
    y: 0
  };
  if (v) {
    if (o) {
      var Y, we = b === "y" ? Be : ze, he = b === "y" ? Qe : et, oe = b === "y" ? "height" : "width", se = v[b], Se = se + g[we], lt = se - g[he], at = p ? -z[oe] / 2 : 0, gn = w === br ? _[oe] : z[oe], ct = w === br ? -z[oe] : -_[oe], yn = e.elements.arrow, Ct = p && yn ? ja(yn) : {
        width: 0,
        height: 0
      }, tt = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Yp(), Tt = tt[we], qn = tt[he], At = Ur(0, _[oe], Ct[oe]), Gn = A ? _[oe] / 2 - at - At - Tt - j.mainAxis : gn - At - Tt - j.mainAxis, Wt = A ? -_[oe] / 2 + at + At + qn + j.mainAxis : ct + At + qn + j.mainAxis, Jn = e.elements.arrow && Ei(e.elements.arrow), Ni = Jn ? b === "y" ? Jn.clientTop || 0 : Jn.clientLeft || 0 : 0, Or = (Y = q == null ? void 0 : q[b]) != null ? Y : 0, Di = se + Gn - Or - Ni, _i = se + Wt - Or, Nr = Ur(p ? _o(Se, Di) : Se, se, p ? Rn(lt, _i) : lt);
      v[b] = Nr, K[b] = Nr - se;
    }
    if (l) {
      var Dr, Ri = b === "x" ? Be : ze, Ii = b === "x" ? Qe : et, Mt = v[C], Ut = C === "y" ? "height" : "width", _r = Mt + g[Ri], bn = Mt - g[Ii], Rr = [Be, ze].indexOf(y) !== -1, Pi = (Dr = q == null ? void 0 : q[C]) != null ? Dr : 0, Li = Rr ? _r : Mt - _[Ut] - z[Ut] - Pi + j.altAxis, Bi = Rr ? Mt + _[Ut] + z[Ut] - Pi - j.altAxis : bn, zi = p && Rr ? Av(Li, Mt, Bi) : Ur(p ? Li : _r, Mt, p ? Bi : bn);
      v[C] = zi, K[C] = zi - Mt;
    }
    e.modifiersData[r] = K;
  }
}
const r1 = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: n1,
  requiresIfExists: ["offset"]
};
function i1(n) {
  return {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  };
}
function o1(n) {
  return n === Ue(n) || !Ze(n) ? Ua(n) : i1(n);
}
function s1(n) {
  var e = n.getBoundingClientRect(), t = vr(e.width) / n.offsetWidth || 1, r = vr(e.height) / n.offsetHeight || 1;
  return t !== 1 || r !== 1;
}
function l1(n, e, t) {
  t === void 0 && (t = !1);
  var r = Ze(e), i = Ze(e) && s1(e), o = mn(e), s = wr(n, i, t), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (r || !r && !t) && ((bt(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  qa(o)) && (l = o1(e)), Ze(e) ? (a = wr(e, !0), a.x += e.clientLeft, a.y += e.clientTop) : o && (a.x = Ka(o))), {
    x: s.left + l.scrollLeft - a.x,
    y: s.top + l.scrollTop - a.y,
    width: s.width,
    height: s.height
  };
}
function a1(n) {
  var e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set(), r = [];
  n.forEach(function(o) {
    e.set(o.name, o);
  });
  function i(o) {
    t.add(o.name);
    var s = [].concat(o.requires || [], o.requiresIfExists || []);
    s.forEach(function(l) {
      if (!t.has(l)) {
        var a = e.get(l);
        a && i(a);
      }
    }), r.push(o);
  }
  return n.forEach(function(o) {
    t.has(o.name) || i(o);
  }), r;
}
function c1(n) {
  var e = a1(n);
  return Sv.reduce(function(t, r) {
    return t.concat(e.filter(function(i) {
      return i.phase === r;
    }));
  }, []);
}
function d1(n) {
  var e;
  return function() {
    return e || (e = new Promise(function(t) {
      Promise.resolve().then(function() {
        e = void 0, t(n());
      });
    })), e;
  };
}
function u1(n) {
  var e = n.reduce(function(t, r) {
    var i = t[r.name];
    return t[r.name] = i ? Object.assign({}, i, r, {
      options: Object.assign({}, i.options, r.options),
      data: Object.assign({}, i.data, r.data)
    }) : r, t;
  }, {});
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}
var Nd = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Dd() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function f1(n) {
  n === void 0 && (n = {});
  var e = n, t = e.defaultModifiers, r = t === void 0 ? [] : t, i = e.defaultOptions, o = i === void 0 ? Nd : i;
  return function(l, a, c) {
    c === void 0 && (c = o);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Nd, o),
      modifiersData: {},
      elements: {
        reference: l,
        popper: a
      },
      attributes: {},
      styles: {}
    }, u = [], f = !1, p = {
      state: d,
      setOptions: function(y) {
        var w = typeof y == "function" ? y(d.options) : y;
        m(), d.options = Object.assign({}, o, d.options, w), d.scrollParents = {
          reference: Fn(l) ? Kr(l) : l.contextElement ? Kr(l.contextElement) : [],
          popper: Kr(a)
        };
        var A = c1(u1([].concat(r, d.options.modifiers)));
        return d.orderedModifiers = A.filter(function(b) {
          return b.enabled;
        }), h(), p.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var y = d.elements, w = y.reference, A = y.popper;
          if (Dd(w, A)) {
            d.rects = {
              reference: l1(w, Ei(A), d.options.strategy === "fixed"),
              popper: ja(A)
            }, d.reset = !1, d.placement = d.options.placement, d.orderedModifiers.forEach(function(j) {
              return d.modifiersData[j.name] = Object.assign({}, j.data);
            });
            for (var b = 0; b < d.orderedModifiers.length; b++) {
              if (d.reset === !0) {
                d.reset = !1, b = -1;
                continue;
              }
              var C = d.orderedModifiers[b], v = C.fn, _ = C.options, z = _ === void 0 ? {} : _, R = C.name;
              typeof v == "function" && (d = v({
                state: d,
                options: z,
                name: R,
                instance: p
              }) || d);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: d1(function() {
        return new Promise(function(g) {
          p.forceUpdate(), g(d);
        });
      }),
      destroy: function() {
        m(), f = !0;
      }
    };
    if (!Dd(l, a))
      return p;
    p.setOptions(c).then(function(g) {
      !f && c.onFirstUpdate && c.onFirstUpdate(g);
    });
    function h() {
      d.orderedModifiers.forEach(function(g) {
        var y = g.name, w = g.options, A = w === void 0 ? {} : w, b = g.effect;
        if (typeof b == "function") {
          var C = b({
            state: d,
            name: y,
            instance: p,
            options: A
          }), v = function() {
          };
          u.push(C || v);
        }
      });
    }
    function m() {
      u.forEach(function(g) {
        return g();
      }), u = [];
    }
    return p;
  };
}
var p1 = [Lv, e1, Iv, qp, Zv, qv, r1, Nv, Jv], h1 = /* @__PURE__ */ f1({
  defaultModifiers: p1
}), m1 = "tippy-box", th = "tippy-content", g1 = "tippy-backdrop", nh = "tippy-arrow", rh = "tippy-svg-arrow", Sn = {
  passive: !0,
  capture: !0
}, ih = function() {
  return document.body;
};
function y1(n, e) {
  return {}.hasOwnProperty.call(n, e);
}
function Zs(n, e, t) {
  if (Array.isArray(n)) {
    var r = n[e];
    return r ?? (Array.isArray(t) ? t[e] : t);
  }
  return n;
}
function Ga(n, e) {
  var t = {}.toString.call(n);
  return t.indexOf("[object") === 0 && t.indexOf(e + "]") > -1;
}
function oh(n, e) {
  return typeof n == "function" ? n.apply(void 0, e) : n;
}
function _d(n, e) {
  if (e === 0)
    return n;
  var t;
  return function(r) {
    clearTimeout(t), t = setTimeout(function() {
      n(r);
    }, e);
  };
}
function b1(n, e) {
  var t = Object.assign({}, n);
  return e.forEach(function(r) {
    delete t[r];
  }), t;
}
function v1(n) {
  return n.split(/\s+/).filter(Boolean);
}
function ir(n) {
  return [].concat(n);
}
function Rd(n, e) {
  n.indexOf(e) === -1 && n.push(e);
}
function w1(n) {
  return n.filter(function(e, t) {
    return n.indexOf(e) === t;
  });
}
function S1(n) {
  return n.split("-")[0];
}
function Ro(n) {
  return [].slice.call(n);
}
function Id(n) {
  return Object.keys(n).reduce(function(e, t) {
    return n[t] !== void 0 && (e[t] = n[t]), e;
  }, {});
}
function qr() {
  return document.createElement("div");
}
function mi(n) {
  return ["Element", "Fragment"].some(function(e) {
    return Ga(n, e);
  });
}
function x1(n) {
  return Ga(n, "NodeList");
}
function k1(n) {
  return Ga(n, "MouseEvent");
}
function C1(n) {
  return !!(n && n._tippy && n._tippy.reference === n);
}
function T1(n) {
  return mi(n) ? [n] : x1(n) ? Ro(n) : Array.isArray(n) ? n : Ro(document.querySelectorAll(n));
}
function Qs(n, e) {
  n.forEach(function(t) {
    t && (t.style.transitionDuration = e + "ms");
  });
}
function Pd(n, e) {
  n.forEach(function(t) {
    t && t.setAttribute("data-state", e);
  });
}
function A1(n) {
  var e, t = ir(n), r = t[0];
  return r != null && (e = r.ownerDocument) != null && e.body ? r.ownerDocument : document;
}
function M1(n, e) {
  var t = e.clientX, r = e.clientY;
  return n.every(function(i) {
    var o = i.popperRect, s = i.popperState, l = i.props, a = l.interactiveBorder, c = S1(s.placement), d = s.modifiersData.offset;
    if (!d)
      return !0;
    var u = c === "bottom" ? d.top.y : 0, f = c === "top" ? d.bottom.y : 0, p = c === "right" ? d.left.x : 0, h = c === "left" ? d.right.x : 0, m = o.top - r + u > a, g = r - o.bottom - f > a, y = o.left - t + p > a, w = t - o.right - h > a;
    return m || g || y || w;
  });
}
function el(n, e, t) {
  var r = e + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(i) {
    n[r](i, t);
  });
}
function Ld(n, e) {
  for (var t = e; t; ) {
    var r;
    if (n.contains(t))
      return !0;
    t = t.getRootNode == null || (r = t.getRootNode()) == null ? void 0 : r.host;
  }
  return !1;
}
var pt = {
  isTouch: !1
}, Bd = 0;
function E1() {
  pt.isTouch || (pt.isTouch = !0, window.performance && document.addEventListener("mousemove", sh));
}
function sh() {
  var n = performance.now();
  n - Bd < 20 && (pt.isTouch = !1, document.removeEventListener("mousemove", sh)), Bd = n;
}
function O1() {
  var n = document.activeElement;
  if (C1(n)) {
    var e = n._tippy;
    n.blur && !e.state.isVisible && n.blur();
  }
}
function N1() {
  document.addEventListener("touchstart", E1, Sn), window.addEventListener("blur", O1);
}
var D1 = typeof window < "u" && typeof document < "u", _1 = D1 ? (
  // @ts-ignore
  !!window.msCrypto
) : !1;
function er(n) {
  var e = n === "destroy" ? "n already-" : " ";
  return [n + "() was called on a" + e + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ");
}
function zd(n) {
  var e = /[ \t]{2,}/g, t = /^[ \t]*/gm;
  return n.replace(e, " ").replace(t, "").trim();
}
function R1(n) {
  return zd(`
  %ctippy.js

  %c` + zd(n) + `

  %c👷‍ This is a development-only message. It will be removed in production.
  `);
}
function lh(n) {
  return [
    R1(n),
    // title
    "color: #00C584; font-size: 1.3em; font-weight: bold;",
    // message
    "line-height: 1.5",
    // footer
    "color: #a6a095;"
  ];
}
var gi;
process.env.NODE_ENV !== "production" && I1();
function I1() {
  gi = /* @__PURE__ */ new Set();
}
function It(n, e) {
  if (n && !gi.has(e)) {
    var t;
    gi.add(e), (t = console).warn.apply(t, lh(e));
  }
}
function Fl(n, e) {
  if (n && !gi.has(e)) {
    var t;
    gi.add(e), (t = console).error.apply(t, lh(e));
  }
}
function P1(n) {
  var e = !n, t = Object.prototype.toString.call(n) === "[object Object]" && !n.addEventListener;
  Fl(e, ["tippy() was passed", "`" + String(n) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" ")), Fl(t, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "));
}
var ah = {
  animateFill: !1,
  followCursor: !1,
  inlinePositioning: !1,
  sticky: !1
}, L1 = {
  allowHTML: !1,
  animation: "fade",
  arrow: !0,
  content: "",
  inertia: !1,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
}, Ve = Object.assign({
  appendTo: ih,
  aria: {
    content: "auto",
    expanded: "auto"
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: !0,
  ignoreAttributes: !1,
  interactive: !1,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: "",
  offset: [0, 10],
  onAfterUpdate: function() {
  },
  onBeforeUpdate: function() {
  },
  onCreate: function() {
  },
  onDestroy: function() {
  },
  onHidden: function() {
  },
  onHide: function() {
  },
  onMount: function() {
  },
  onShow: function() {
  },
  onShown: function() {
  },
  onTrigger: function() {
  },
  onUntrigger: function() {
  },
  onClickOutside: function() {
  },
  placement: "top",
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: !1,
  touch: !0,
  trigger: "mouseenter focus",
  triggerTarget: null
}, ah, L1), B1 = Object.keys(Ve), z1 = function(e) {
  process.env.NODE_ENV !== "production" && dh(e, []);
  var t = Object.keys(e);
  t.forEach(function(r) {
    Ve[r] = e[r];
  });
};
function ch(n) {
  var e = n.plugins || [], t = e.reduce(function(r, i) {
    var o = i.name, s = i.defaultValue;
    if (o) {
      var l;
      r[o] = n[o] !== void 0 ? n[o] : (l = Ve[o]) != null ? l : s;
    }
    return r;
  }, {});
  return Object.assign({}, n, t);
}
function F1(n, e) {
  var t = e ? Object.keys(ch(Object.assign({}, Ve, {
    plugins: e
  }))) : B1, r = t.reduce(function(i, o) {
    var s = (n.getAttribute("data-tippy-" + o) || "").trim();
    if (!s)
      return i;
    if (o === "content")
      i[o] = s;
    else
      try {
        i[o] = JSON.parse(s);
      } catch {
        i[o] = s;
      }
    return i;
  }, {});
  return r;
}
function Fd(n, e) {
  var t = Object.assign({}, e, {
    content: oh(e.content, [n])
  }, e.ignoreAttributes ? {} : F1(n, e.plugins));
  return t.aria = Object.assign({}, Ve.aria, t.aria), t.aria = {
    expanded: t.aria.expanded === "auto" ? e.interactive : t.aria.expanded,
    content: t.aria.content === "auto" ? e.interactive ? null : "describedby" : t.aria.content
  }, t;
}
function dh(n, e) {
  n === void 0 && (n = {}), e === void 0 && (e = []);
  var t = Object.keys(n);
  t.forEach(function(r) {
    var i = b1(Ve, Object.keys(ah)), o = !y1(i, r);
    o && (o = e.filter(function(s) {
      return s.name === r;
    }).length === 0), It(o, ["`" + r + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", `

`, `All props: https://atomiks.github.io/tippyjs/v6/all-props/
`, "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "));
  });
}
var H1 = function() {
  return "innerHTML";
};
function Hl(n, e) {
  n[H1()] = e;
}
function Hd(n) {
  var e = qr();
  return n === !0 ? e.className = nh : (e.className = rh, mi(n) ? e.appendChild(n) : Hl(e, n)), e;
}
function Vd(n, e) {
  mi(e.content) ? (Hl(n, ""), n.appendChild(e.content)) : typeof e.content != "function" && (e.allowHTML ? Hl(n, e.content) : n.textContent = e.content);
}
function Vl(n) {
  var e = n.firstElementChild, t = Ro(e.children);
  return {
    box: e,
    content: t.find(function(r) {
      return r.classList.contains(th);
    }),
    arrow: t.find(function(r) {
      return r.classList.contains(nh) || r.classList.contains(rh);
    }),
    backdrop: t.find(function(r) {
      return r.classList.contains(g1);
    })
  };
}
function uh(n) {
  var e = qr(), t = qr();
  t.className = m1, t.setAttribute("data-state", "hidden"), t.setAttribute("tabindex", "-1");
  var r = qr();
  r.className = th, r.setAttribute("data-state", "hidden"), Vd(r, n.props), e.appendChild(t), t.appendChild(r), i(n.props, n.props);
  function i(o, s) {
    var l = Vl(e), a = l.box, c = l.content, d = l.arrow;
    s.theme ? a.setAttribute("data-theme", s.theme) : a.removeAttribute("data-theme"), typeof s.animation == "string" ? a.setAttribute("data-animation", s.animation) : a.removeAttribute("data-animation"), s.inertia ? a.setAttribute("data-inertia", "") : a.removeAttribute("data-inertia"), a.style.maxWidth = typeof s.maxWidth == "number" ? s.maxWidth + "px" : s.maxWidth, s.role ? a.setAttribute("role", s.role) : a.removeAttribute("role"), (o.content !== s.content || o.allowHTML !== s.allowHTML) && Vd(c, n.props), s.arrow ? d ? o.arrow !== s.arrow && (a.removeChild(d), a.appendChild(Hd(s.arrow))) : a.appendChild(Hd(s.arrow)) : d && a.removeChild(d);
  }
  return {
    popper: e,
    onUpdate: i
  };
}
uh.$$tippy = !0;
var V1 = 1, Gi = [], tl = [];
function $1(n, e) {
  var t = Fd(n, Object.assign({}, Ve, ch(Id(e)))), r, i, o, s = !1, l = !1, a = !1, c = !1, d, u, f, p = [], h = _d(Di, t.interactiveDebounce), m, g = V1++, y = null, w = w1(t.plugins), A = {
    // Is the instance currently enabled?
    isEnabled: !0,
    // Is the tippy currently showing and not transitioning out?
    isVisible: !1,
    // Has the instance been destroyed?
    isDestroyed: !1,
    // Is the tippy currently mounted to the DOM?
    isMounted: !1,
    // Has the tippy finished transitioning in?
    isShown: !1
  }, b = {
    // properties
    id: g,
    reference: n,
    popper: qr(),
    popperInstance: y,
    props: t,
    state: A,
    plugins: w,
    // methods
    clearDelayTimeouts: Li,
    setProps: Bi,
    setContent: zi,
    show: sm,
    hide: lm,
    hideWithInteractivity: am,
    enable: Rr,
    disable: Pi,
    unmount: cm,
    destroy: dm
  };
  if (!t.render)
    return process.env.NODE_ENV !== "production" && Fl(!0, "render() function has not been supplied."), b;
  var C = t.render(b), v = C.popper, _ = C.onUpdate;
  v.setAttribute("data-tippy-root", ""), v.id = "tippy-" + b.id, b.popper = v, n._tippy = b, v._tippy = b;
  var z = w.map(function(S) {
    return S.fn(b);
  }), R = n.hasAttribute("aria-expanded");
  return Jn(), at(), se(), Se("onCreate", [b]), t.showOnCreate && _r(), v.addEventListener("mouseenter", function() {
    b.props.interactive && b.state.isVisible && b.clearDelayTimeouts();
  }), v.addEventListener("mouseleave", function() {
    b.props.interactive && b.props.trigger.indexOf("mouseenter") >= 0 && we().addEventListener("mousemove", h);
  }), b;
  function j() {
    var S = b.props.touch;
    return Array.isArray(S) ? S : [S, 0];
  }
  function q() {
    return j()[0] === "hold";
  }
  function K() {
    var S;
    return !!((S = b.props.render) != null && S.$$tippy);
  }
  function Y() {
    return m || n;
  }
  function we() {
    var S = Y().parentNode;
    return S ? A1(S) : document;
  }
  function he() {
    return Vl(v);
  }
  function oe(S) {
    return b.state.isMounted && !b.state.isVisible || pt.isTouch || d && d.type === "focus" ? 0 : Zs(b.props.delay, S ? 0 : 1, Ve.delay);
  }
  function se(S) {
    S === void 0 && (S = !1), v.style.pointerEvents = b.props.interactive && !S ? "" : "none", v.style.zIndex = "" + b.props.zIndex;
  }
  function Se(S, I, F) {
    if (F === void 0 && (F = !0), z.forEach(function(W) {
      W[S] && W[S].apply(W, I);
    }), F) {
      var U;
      (U = b.props)[S].apply(U, I);
    }
  }
  function lt() {
    var S = b.props.aria;
    if (S.content) {
      var I = "aria-" + S.content, F = v.id, U = ir(b.props.triggerTarget || n);
      U.forEach(function(W) {
        var Ne = W.getAttribute(I);
        if (b.state.isVisible)
          W.setAttribute(I, Ne ? Ne + " " + F : F);
        else {
          var Ke = Ne && Ne.replace(F, "").trim();
          Ke ? W.setAttribute(I, Ke) : W.removeAttribute(I);
        }
      });
    }
  }
  function at() {
    if (!(R || !b.props.aria.expanded)) {
      var S = ir(b.props.triggerTarget || n);
      S.forEach(function(I) {
        b.props.interactive ? I.setAttribute("aria-expanded", b.state.isVisible && I === Y() ? "true" : "false") : I.removeAttribute("aria-expanded");
      });
    }
  }
  function gn() {
    we().removeEventListener("mousemove", h), Gi = Gi.filter(function(S) {
      return S !== h;
    });
  }
  function ct(S) {
    if (!(pt.isTouch && (a || S.type === "mousedown"))) {
      var I = S.composedPath && S.composedPath()[0] || S.target;
      if (!(b.props.interactive && Ld(v, I))) {
        if (ir(b.props.triggerTarget || n).some(function(F) {
          return Ld(F, I);
        })) {
          if (pt.isTouch || b.state.isVisible && b.props.trigger.indexOf("click") >= 0)
            return;
        } else
          Se("onClickOutside", [b, S]);
        b.props.hideOnClick === !0 && (b.clearDelayTimeouts(), b.hide(), l = !0, setTimeout(function() {
          l = !1;
        }), b.state.isMounted || Tt());
      }
    }
  }
  function yn() {
    a = !0;
  }
  function Ct() {
    a = !1;
  }
  function tt() {
    var S = we();
    S.addEventListener("mousedown", ct, !0), S.addEventListener("touchend", ct, Sn), S.addEventListener("touchstart", Ct, Sn), S.addEventListener("touchmove", yn, Sn);
  }
  function Tt() {
    var S = we();
    S.removeEventListener("mousedown", ct, !0), S.removeEventListener("touchend", ct, Sn), S.removeEventListener("touchstart", Ct, Sn), S.removeEventListener("touchmove", yn, Sn);
  }
  function qn(S, I) {
    Gn(S, function() {
      !b.state.isVisible && v.parentNode && v.parentNode.contains(v) && I();
    });
  }
  function At(S, I) {
    Gn(S, I);
  }
  function Gn(S, I) {
    var F = he().box;
    function U(W) {
      W.target === F && (el(F, "remove", U), I());
    }
    if (S === 0)
      return I();
    el(F, "remove", u), el(F, "add", U), u = U;
  }
  function Wt(S, I, F) {
    F === void 0 && (F = !1);
    var U = ir(b.props.triggerTarget || n);
    U.forEach(function(W) {
      W.addEventListener(S, I, F), p.push({
        node: W,
        eventType: S,
        handler: I,
        options: F
      });
    });
  }
  function Jn() {
    q() && (Wt("touchstart", Or, {
      passive: !0
    }), Wt("touchend", _i, {
      passive: !0
    })), v1(b.props.trigger).forEach(function(S) {
      if (S !== "manual")
        switch (Wt(S, Or), S) {
          case "mouseenter":
            Wt("mouseleave", _i);
            break;
          case "focus":
            Wt(_1 ? "focusout" : "blur", Nr);
            break;
          case "focusin":
            Wt("focusout", Nr);
            break;
        }
    });
  }
  function Ni() {
    p.forEach(function(S) {
      var I = S.node, F = S.eventType, U = S.handler, W = S.options;
      I.removeEventListener(F, U, W);
    }), p = [];
  }
  function Or(S) {
    var I, F = !1;
    if (!(!b.state.isEnabled || Dr(S) || l)) {
      var U = ((I = d) == null ? void 0 : I.type) === "focus";
      d = S, m = S.currentTarget, at(), !b.state.isVisible && k1(S) && Gi.forEach(function(W) {
        return W(S);
      }), S.type === "click" && (b.props.trigger.indexOf("mouseenter") < 0 || s) && b.props.hideOnClick !== !1 && b.state.isVisible ? F = !0 : _r(S), S.type === "click" && (s = !F), F && !U && bn(S);
    }
  }
  function Di(S) {
    var I = S.target, F = Y().contains(I) || v.contains(I);
    if (!(S.type === "mousemove" && F)) {
      var U = Ut().concat(v).map(function(W) {
        var Ne, Ke = W._tippy, Yn = (Ne = Ke.popperInstance) == null ? void 0 : Ne.state;
        return Yn ? {
          popperRect: W.getBoundingClientRect(),
          popperState: Yn,
          props: t
        } : null;
      }).filter(Boolean);
      M1(U, S) && (gn(), bn(S));
    }
  }
  function _i(S) {
    var I = Dr(S) || b.props.trigger.indexOf("click") >= 0 && s;
    if (!I) {
      if (b.props.interactive) {
        b.hideWithInteractivity(S);
        return;
      }
      bn(S);
    }
  }
  function Nr(S) {
    b.props.trigger.indexOf("focusin") < 0 && S.target !== Y() || b.props.interactive && S.relatedTarget && v.contains(S.relatedTarget) || bn(S);
  }
  function Dr(S) {
    return pt.isTouch ? q() !== S.type.indexOf("touch") >= 0 : !1;
  }
  function Ri() {
    Ii();
    var S = b.props, I = S.popperOptions, F = S.placement, U = S.offset, W = S.getReferenceClientRect, Ne = S.moveTransition, Ke = K() ? Vl(v).arrow : null, Yn = W ? {
      getBoundingClientRect: W,
      contextElement: W.contextElement || Y()
    } : n, pc = {
      name: "$$tippy",
      enabled: !0,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function(Fi) {
        var Xn = Fi.state;
        if (K()) {
          var um = he(), Rs = um.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(Hi) {
            Hi === "placement" ? Rs.setAttribute("data-placement", Xn.placement) : Xn.attributes.popper["data-popper-" + Hi] ? Rs.setAttribute("data-" + Hi, "") : Rs.removeAttribute("data-" + Hi);
          }), Xn.attributes.popper = {};
        }
      }
    }, vn = [{
      name: "offset",
      options: {
        offset: U
      }
    }, {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: "flip",
      options: {
        padding: 5
      }
    }, {
      name: "computeStyles",
      options: {
        adaptive: !Ne
      }
    }, pc];
    K() && Ke && vn.push({
      name: "arrow",
      options: {
        element: Ke,
        padding: 3
      }
    }), vn.push.apply(vn, (I == null ? void 0 : I.modifiers) || []), b.popperInstance = h1(Yn, v, Object.assign({}, I, {
      placement: F,
      onFirstUpdate: f,
      modifiers: vn
    }));
  }
  function Ii() {
    b.popperInstance && (b.popperInstance.destroy(), b.popperInstance = null);
  }
  function Mt() {
    var S = b.props.appendTo, I, F = Y();
    b.props.interactive && S === ih || S === "parent" ? I = F.parentNode : I = oh(S, [F]), I.contains(v) || I.appendChild(v), b.state.isMounted = !0, Ri(), process.env.NODE_ENV !== "production" && It(b.props.interactive && S === Ve.appendTo && F.nextElementSibling !== v, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", `

`, "Using a wrapper <div> or <span> tag around the reference element", "solves this by creating a new parentNode context.", `

`, "Specifying `appendTo: document.body` silences this warning, but it", "assumes you are using a focus management solution to handle", "keyboard navigation.", `

`, "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "));
  }
  function Ut() {
    return Ro(v.querySelectorAll("[data-tippy-root]"));
  }
  function _r(S) {
    b.clearDelayTimeouts(), S && Se("onTrigger", [b, S]), tt();
    var I = oe(!0), F = j(), U = F[0], W = F[1];
    pt.isTouch && U === "hold" && W && (I = W), I ? r = setTimeout(function() {
      b.show();
    }, I) : b.show();
  }
  function bn(S) {
    if (b.clearDelayTimeouts(), Se("onUntrigger", [b, S]), !b.state.isVisible) {
      Tt();
      return;
    }
    if (!(b.props.trigger.indexOf("mouseenter") >= 0 && b.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(S.type) >= 0 && s)) {
      var I = oe(!1);
      I ? i = setTimeout(function() {
        b.state.isVisible && b.hide();
      }, I) : o = requestAnimationFrame(function() {
        b.hide();
      });
    }
  }
  function Rr() {
    b.state.isEnabled = !0;
  }
  function Pi() {
    b.hide(), b.state.isEnabled = !1;
  }
  function Li() {
    clearTimeout(r), clearTimeout(i), cancelAnimationFrame(o);
  }
  function Bi(S) {
    if (process.env.NODE_ENV !== "production" && It(b.state.isDestroyed, er("setProps")), !b.state.isDestroyed) {
      Se("onBeforeUpdate", [b, S]), Ni();
      var I = b.props, F = Fd(n, Object.assign({}, I, Id(S), {
        ignoreAttributes: !0
      }));
      b.props = F, Jn(), I.interactiveDebounce !== F.interactiveDebounce && (gn(), h = _d(Di, F.interactiveDebounce)), I.triggerTarget && !F.triggerTarget ? ir(I.triggerTarget).forEach(function(U) {
        U.removeAttribute("aria-expanded");
      }) : F.triggerTarget && n.removeAttribute("aria-expanded"), at(), se(), _ && _(I, F), b.popperInstance && (Ri(), Ut().forEach(function(U) {
        requestAnimationFrame(U._tippy.popperInstance.forceUpdate);
      })), Se("onAfterUpdate", [b, S]);
    }
  }
  function zi(S) {
    b.setProps({
      content: S
    });
  }
  function sm() {
    process.env.NODE_ENV !== "production" && It(b.state.isDestroyed, er("show"));
    var S = b.state.isVisible, I = b.state.isDestroyed, F = !b.state.isEnabled, U = pt.isTouch && !b.props.touch, W = Zs(b.props.duration, 0, Ve.duration);
    if (!(S || I || F || U) && !Y().hasAttribute("disabled") && (Se("onShow", [b], !1), b.props.onShow(b) !== !1)) {
      if (b.state.isVisible = !0, K() && (v.style.visibility = "visible"), se(), tt(), b.state.isMounted || (v.style.transition = "none"), K()) {
        var Ne = he(), Ke = Ne.box, Yn = Ne.content;
        Qs([Ke, Yn], 0);
      }
      f = function() {
        var vn;
        if (!(!b.state.isVisible || c)) {
          if (c = !0, v.offsetHeight, v.style.transition = b.props.moveTransition, K() && b.props.animation) {
            var _s = he(), Fi = _s.box, Xn = _s.content;
            Qs([Fi, Xn], W), Pd([Fi, Xn], "visible");
          }
          lt(), at(), Rd(tl, b), (vn = b.popperInstance) == null || vn.forceUpdate(), Se("onMount", [b]), b.props.animation && K() && At(W, function() {
            b.state.isShown = !0, Se("onShown", [b]);
          });
        }
      }, Mt();
    }
  }
  function lm() {
    process.env.NODE_ENV !== "production" && It(b.state.isDestroyed, er("hide"));
    var S = !b.state.isVisible, I = b.state.isDestroyed, F = !b.state.isEnabled, U = Zs(b.props.duration, 1, Ve.duration);
    if (!(S || I || F) && (Se("onHide", [b], !1), b.props.onHide(b) !== !1)) {
      if (b.state.isVisible = !1, b.state.isShown = !1, c = !1, s = !1, K() && (v.style.visibility = "hidden"), gn(), Tt(), se(!0), K()) {
        var W = he(), Ne = W.box, Ke = W.content;
        b.props.animation && (Qs([Ne, Ke], U), Pd([Ne, Ke], "hidden"));
      }
      lt(), at(), b.props.animation ? K() && qn(U, b.unmount) : b.unmount();
    }
  }
  function am(S) {
    process.env.NODE_ENV !== "production" && It(b.state.isDestroyed, er("hideWithInteractivity")), we().addEventListener("mousemove", h), Rd(Gi, h), h(S);
  }
  function cm() {
    process.env.NODE_ENV !== "production" && It(b.state.isDestroyed, er("unmount")), b.state.isVisible && b.hide(), b.state.isMounted && (Ii(), Ut().forEach(function(S) {
      S._tippy.unmount();
    }), v.parentNode && v.parentNode.removeChild(v), tl = tl.filter(function(S) {
      return S !== b;
    }), b.state.isMounted = !1, Se("onHidden", [b]));
  }
  function dm() {
    process.env.NODE_ENV !== "production" && It(b.state.isDestroyed, er("destroy")), !b.state.isDestroyed && (b.clearDelayTimeouts(), b.unmount(), Ni(), delete n._tippy, b.state.isDestroyed = !0, Se("onDestroy", [b]));
  }
}
function Ar(n, e) {
  e === void 0 && (e = {});
  var t = Ve.plugins.concat(e.plugins || []);
  process.env.NODE_ENV !== "production" && (P1(n), dh(e, t)), N1();
  var r = Object.assign({}, e, {
    plugins: t
  }), i = T1(n);
  if (process.env.NODE_ENV !== "production") {
    var o = mi(r.content), s = i.length > 1;
    It(o && s, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", `

`, "Instead, pass the .innerHTML of the element, or use a function that", "returns a cloned version of the element instead.", `

`, `1) content: element.innerHTML
`, "2) content: () => element.cloneNode(true)"].join(" "));
  }
  var l = i.reduce(function(a, c) {
    var d = c && $1(c, r);
    return d && a.push(d), a;
  }, []);
  return mi(n) ? l[0] : l;
}
Ar.defaultProps = Ve;
Ar.setDefaultProps = z1;
Ar.currentInput = pt;
Object.assign({}, qp, {
  effect: function(e) {
    var t = e.state, r = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow);
  }
});
Ar.setDefaultProps({
  render: uh
});
class j1 {
  constructor({ editor: e, element: t, view: r, tippyOptions: i = {}, updateDelay: o = 250, shouldShow: s }) {
    this.preventHide = !1, this.shouldShow = ({ view: l, state: a, from: c, to: d }) => {
      const { doc: u, selection: f } = a, { empty: p } = f, h = !u.textBetween(c, d).length && za(a.selection), m = this.element.contains(document.activeElement);
      return !(!(l.hasFocus() || m) || p || h || !this.editor.isEditable);
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.dragstartHandler = () => {
      this.hide();
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: l }) => {
      var a;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      l != null && l.relatedTarget && (!((a = this.element.parentNode) === null || a === void 0) && a.contains(l.relatedTarget)) || (l == null ? void 0 : l.relatedTarget) !== this.editor.view.dom && this.hide();
    }, this.tippyBlurHandler = (l) => {
      this.blurHandler({ event: l });
    }, this.handleDebouncedUpdate = (l, a) => {
      const c = !(a != null && a.selection.eq(l.state.selection)), d = !(a != null && a.doc.eq(l.state.doc));
      !c && !d || (this.updateDebounceTimer && clearTimeout(this.updateDebounceTimer), this.updateDebounceTimer = window.setTimeout(() => {
        this.updateHandler(l, c, d, a);
      }, this.updateDelay));
    }, this.updateHandler = (l, a, c, d) => {
      var u, f, p;
      const { state: h, composing: m } = l, { selection: g } = h;
      if (m || !a && !c)
        return;
      this.createTooltip();
      const { ranges: w } = g, A = Math.min(...w.map((v) => v.$from.pos)), b = Math.max(...w.map((v) => v.$to.pos));
      if (!((u = this.shouldShow) === null || u === void 0 ? void 0 : u.call(this, {
        editor: this.editor,
        element: this.element,
        view: l,
        state: h,
        oldState: d,
        from: A,
        to: b
      }))) {
        this.hide();
        return;
      }
      (f = this.tippy) === null || f === void 0 || f.setProps({
        getReferenceClientRect: ((p = this.tippyOptions) === null || p === void 0 ? void 0 : p.getReferenceClientRect) || (() => {
          if ($p(h.selection)) {
            let v = l.nodeDOM(A);
            if (v) {
              const _ = v.dataset.nodeViewWrapper ? v : v.querySelector("[data-node-view-wrapper]");
              if (_ && (v = _.firstChild), v)
                return v.getBoundingClientRect();
            }
          }
          return jp(l, A, b);
        })
      }), this.show();
    }, this.editor = e, this.element = t, this.view = r, this.updateDelay = o, s && (this.shouldShow = s), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.addEventListener("dragstart", this.dragstartHandler), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = i, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: e } = this.editor.options, t = !!e.parentElement;
    this.tippy || !t || (this.tippy = Ar(e, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: !0,
      trigger: "manual",
      placement: "top",
      hideOnClick: "toggle",
      ...this.tippyOptions
    }), this.tippy.popper.firstChild && this.tippy.popper.firstChild.addEventListener("blur", this.tippyBlurHandler));
  }
  update(e, t) {
    const { state: r } = e, i = r.selection.from !== r.selection.to;
    if (this.updateDelay > 0 && i) {
      this.handleDebouncedUpdate(e, t);
      return;
    }
    const o = !(t != null && t.selection.eq(e.state.selection)), s = !(t != null && t.doc.eq(e.state.doc));
    this.updateHandler(e, o, s, t);
  }
  show() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.show();
  }
  hide() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.hide();
  }
  destroy() {
    var e, t;
    !((e = this.tippy) === null || e === void 0) && e.popper.firstChild && this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler), (t = this.tippy) === null || t === void 0 || t.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.removeEventListener("dragstart", this.dragstartHandler), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
  }
}
const fh = (n) => new ne({
  key: typeof n.pluginKey == "string" ? new de(n.pluginKey) : n.pluginKey,
  view: (e) => new j1({ view: e, ...n })
});
te.create({
  name: "bubbleMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "bubbleMenu",
      updateDelay: void 0,
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      fh({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        updateDelay: this.options.updateDelay,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
class W1 {
  getTextContent(e) {
    return Hp(e, { textSerializers: La(this.editor.schema) });
  }
  constructor({ editor: e, element: t, view: r, tippyOptions: i = {}, shouldShow: o }) {
    this.preventHide = !1, this.shouldShow = ({ view: s, state: l }) => {
      const { selection: a } = l, { $anchor: c, empty: d } = a, u = c.depth === 1, f = c.parent.isTextblock && !c.parent.type.spec.code && !c.parent.textContent && c.parent.childCount === 0 && !this.getTextContent(c.parent);
      return !(!s.hasFocus() || !d || !u || !f || !this.editor.isEditable);
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: s }) => {
      var l;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      s != null && s.relatedTarget && (!((l = this.element.parentNode) === null || l === void 0) && l.contains(s.relatedTarget)) || (s == null ? void 0 : s.relatedTarget) !== this.editor.view.dom && this.hide();
    }, this.tippyBlurHandler = (s) => {
      this.blurHandler({ event: s });
    }, this.editor = e, this.element = t, this.view = r, o && (this.shouldShow = o), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = i, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: e } = this.editor.options, t = !!e.parentElement;
    this.tippy || !t || (this.tippy = Ar(e, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: !0,
      trigger: "manual",
      placement: "right",
      hideOnClick: "toggle",
      ...this.tippyOptions
    }), this.tippy.popper.firstChild && this.tippy.popper.firstChild.addEventListener("blur", this.tippyBlurHandler));
  }
  update(e, t) {
    var r, i, o;
    const { state: s } = e, { doc: l, selection: a } = s, { from: c, to: d } = a;
    if (t && t.doc.eq(l) && t.selection.eq(a))
      return;
    if (this.createTooltip(), !((r = this.shouldShow) === null || r === void 0 ? void 0 : r.call(this, {
      editor: this.editor,
      view: e,
      state: s,
      oldState: t
    }))) {
      this.hide();
      return;
    }
    (i = this.tippy) === null || i === void 0 || i.setProps({
      getReferenceClientRect: ((o = this.tippyOptions) === null || o === void 0 ? void 0 : o.getReferenceClientRect) || (() => jp(e, c, d))
    }), this.show();
  }
  show() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.show();
  }
  hide() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.hide();
  }
  destroy() {
    var e, t;
    !((e = this.tippy) === null || e === void 0) && e.popper.firstChild && this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler), (t = this.tippy) === null || t === void 0 || t.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
  }
}
const ph = (n) => new ne({
  key: typeof n.pluginKey == "string" ? new de(n.pluginKey) : n.pluginKey,
  view: (e) => new W1({ view: e, ...n })
});
te.create({
  name: "floatingMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "floatingMenu",
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      ph({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
const U1 = kr({
  name: "BubbleMenu",
  props: {
    pluginKey: {
      type: [String, Object],
      default: "bubbleMenu"
    },
    editor: {
      type: Object,
      required: !0
    },
    updateDelay: {
      type: Number,
      default: void 0
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(n, { slots: e }) {
    const t = as(null);
    return nf(() => {
      const { updateDelay: r, editor: i, pluginKey: o, shouldShow: s, tippyOptions: l } = n;
      i.registerPlugin(fh({
        updateDelay: r,
        editor: i,
        element: t.value,
        pluginKey: o,
        shouldShow: s,
        tippyOptions: l
      }));
    }), da(() => {
      const { pluginKey: r, editor: i } = n;
      i.unregisterPlugin(r);
    }), () => {
      var r;
      return Cr("div", { ref: t }, (r = e.default) === null || r === void 0 ? void 0 : r.call(e));
    };
  }
});
function $d(n) {
  return pm((e, t) => ({
    get() {
      return e(), n;
    },
    set(r) {
      n = r, requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          t();
        });
      });
    }
  }));
}
class K1 extends av {
  constructor(e = {}) {
    return super(e), this.contentComponent = null, this.appContext = null, this.reactiveState = $d(this.view.state), this.reactiveExtensionStorage = $d(this.extensionStorage), this.on("beforeTransaction", ({ nextState: t }) => {
      this.reactiveState.value = t, this.reactiveExtensionStorage.value = this.extensionStorage;
    }), tf(this);
  }
  get state() {
    return this.reactiveState ? this.reactiveState.value : this.view.state;
  }
  get storage() {
    return this.reactiveExtensionStorage ? this.reactiveExtensionStorage.value : super.storage;
  }
  /**
   * Register a ProseMirror plugin.
   */
  registerPlugin(e, t) {
    const r = super.registerPlugin(e, t);
    return this.reactiveState && (this.reactiveState.value = r), r;
  }
  /**
   * Unregister a ProseMirror plugin.
   */
  unregisterPlugin(e) {
    const t = super.unregisterPlugin(e);
    return this.reactiveState && t && (this.reactiveState.value = t), t;
  }
}
const q1 = kr({
  name: "EditorContent",
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  setup(n) {
    const e = as(), t = ua();
    return rf(() => {
      const r = n.editor;
      r && r.options.element && e.value && fm(() => {
        if (!e.value || !r.options.element.firstChild)
          return;
        const i = Pt(e.value);
        e.value.append(...r.options.element.childNodes), r.contentComponent = t.ctx._, t && (r.appContext = {
          ...t.appContext,
          // Vue internally uses prototype chain to forward/shadow injects across the entire component chain
          // so don't use object spread operator or 'Object.assign' and just set `provides` as is on editor's appContext
          // @ts-expect-error forward instance's 'provides' into appContext
          provides: t.provides
        }), r.setOptions({
          element: i
        }), r.createNodeViews();
      });
    }), da(() => {
      const r = n.editor;
      r && (r.contentComponent = null, r.appContext = null);
    }), { rootEl: e };
  },
  render() {
    return Cr("div", {
      ref: (n) => {
        this.rootEl = n;
      }
    });
  }
});
kr({
  name: "FloatingMenu",
  props: {
    pluginKey: {
      // TODO: TypeScript breaks :(
      // type: [String, Object as PropType<Exclude<FloatingMenuPluginProps['pluginKey'], string>>],
      type: null,
      default: "floatingMenu"
    },
    editor: {
      type: Object,
      required: !0
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(n, { slots: e }) {
    const t = as(null);
    return nf(() => {
      const { pluginKey: r, editor: i, tippyOptions: o, shouldShow: s } = n;
      i.registerPlugin(ph({
        pluginKey: r,
        editor: i,
        element: t.value,
        tippyOptions: o,
        shouldShow: s
      }));
    }), da(() => {
      const { pluginKey: r, editor: i } = n;
      i.unregisterPlugin(r);
    }), () => {
      var r;
      return Cr("div", { ref: t }, (r = e.default) === null || r === void 0 ? void 0 : r.call(e));
    };
  }
});
kr({
  name: "NodeViewContent",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  render() {
    return Cr(this.as, {
      style: {
        whiteSpace: "pre-wrap"
      },
      "data-node-view-content": ""
    });
  }
});
const G1 = kr({
  name: "NodeViewWrapper",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  inject: ["onDragStart", "decorationClasses"],
  render() {
    var n, e;
    return Cr(this.as, {
      // @ts-ignore
      class: this.decorationClasses,
      style: {
        whiteSpace: "normal"
      },
      "data-node-view-wrapper": "",
      // @ts-ignore (https://github.com/vuejs/vue-next/issues/3031)
      onDragstart: this.onDragStart
    }, (e = (n = this.$slots).default) === null || e === void 0 ? void 0 : e.call(n));
  }
});
class J1 {
  constructor(e, { props: t = {}, editor: r }) {
    this.editor = r, this.component = tf(e), this.el = document.createElement("div"), this.props = ni(t), this.renderedComponent = this.renderComponent();
  }
  get element() {
    return this.renderedComponent.el;
  }
  get ref() {
    var e, t, r, i;
    return !((t = (e = this.renderedComponent.vNode) === null || e === void 0 ? void 0 : e.component) === null || t === void 0) && t.exposed ? this.renderedComponent.vNode.component.exposed : (i = (r = this.renderedComponent.vNode) === null || r === void 0 ? void 0 : r.component) === null || i === void 0 ? void 0 : i.proxy;
  }
  renderComponent() {
    let e = Cr(this.component, this.props);
    return this.editor.appContext && (e.appContext = this.editor.appContext), typeof document < "u" && this.el && hc(e, this.el), { vNode: e, destroy: () => {
      this.el && hc(null, this.el), this.el = null, e = null;
    }, el: this.el ? this.el.firstElementChild : null };
  }
  updateProps(e = {}) {
    Object.entries(e).forEach(([t, r]) => {
      this.props[t] = r;
    }), this.renderComponent();
  }
  destroy() {
    this.renderedComponent.destroy();
  }
}
const Y1 = {
  editor: {
    type: Object,
    required: !0
  },
  node: {
    type: Object,
    required: !0
  },
  decorations: {
    type: Object,
    required: !0
  },
  selected: {
    type: Boolean,
    required: !0
  },
  extension: {
    type: Object,
    required: !0
  },
  getPos: {
    type: Function,
    required: !0
  },
  updateAttributes: {
    type: Function,
    required: !0
  },
  deleteNode: {
    type: Function,
    required: !0
  },
  view: {
    type: Object,
    required: !0
  },
  innerDecorations: {
    type: Object,
    required: !0
  },
  HTMLAttributes: {
    type: Object,
    required: !0
  }
};
class X1 extends cv {
  mount() {
    const e = {
      editor: this.editor,
      node: this.node,
      decorations: this.decorations,
      innerDecorations: this.innerDecorations,
      view: this.view,
      selected: !1,
      extension: this.extension,
      HTMLAttributes: this.HTMLAttributes,
      getPos: () => this.getPos(),
      updateAttributes: (i = {}) => this.updateAttributes(i),
      deleteNode: () => this.deleteNode()
    }, t = this.onDragStart.bind(this);
    this.decorationClasses = as(this.getDecorationClasses());
    const r = kr({
      extends: { ...this.component },
      props: Object.keys(e),
      template: this.component.template,
      setup: (i) => {
        var o, s;
        return gl("onDragStart", t), gl("decorationClasses", this.decorationClasses), (s = (o = this.component).setup) === null || s === void 0 ? void 0 : s.call(o, i, {
          expose: () => {
          }
        });
      },
      // add support for scoped styles
      // @ts-ignore
      // eslint-disable-next-line
      __scopeId: this.component.__scopeId,
      // add support for CSS Modules
      // @ts-ignore
      // eslint-disable-next-line
      __cssModules: this.component.__cssModules,
      // add support for vue devtools
      // @ts-ignore
      // eslint-disable-next-line
      __name: this.component.__name,
      // @ts-ignore
      // eslint-disable-next-line
      __file: this.component.__file
    });
    this.handleSelectionUpdate = this.handleSelectionUpdate.bind(this), this.editor.on("selectionUpdate", this.handleSelectionUpdate), this.renderer = new J1(r, {
      editor: this.editor,
      props: e
    });
  }
  /**
   * Return the DOM element.
   * This is the element that will be used to display the node view.
   */
  get dom() {
    if (!this.renderer.element || !this.renderer.element.hasAttribute("data-node-view-wrapper"))
      throw Error("Please use the NodeViewWrapper component for your node view.");
    return this.renderer.element;
  }
  /**
   * Return the content DOM element.
   * This is the element that will be used to display the rich-text content of the node.
   */
  get contentDOM() {
    return this.node.isLeaf ? null : this.dom.querySelector("[data-node-view-content]");
  }
  /**
   * On editor selection update, check if the node is selected.
   * If it is, call `selectNode`, otherwise call `deselectNode`.
   */
  handleSelectionUpdate() {
    const { from: e, to: t } = this.editor.state.selection, r = this.getPos();
    if (typeof r == "number")
      if (e <= r && t >= r + this.node.nodeSize) {
        if (this.renderer.props.selected)
          return;
        this.selectNode();
      } else {
        if (!this.renderer.props.selected)
          return;
        this.deselectNode();
      }
  }
  /**
   * On update, update the React component.
   * To prevent unnecessary updates, the `update` option can be used.
   */
  update(e, t, r) {
    const i = (o) => {
      this.decorationClasses.value = this.getDecorationClasses(), this.renderer.updateProps(o);
    };
    if (typeof this.options.update == "function") {
      const o = this.node, s = this.decorations, l = this.innerDecorations;
      return this.node = e, this.decorations = t, this.innerDecorations = r, this.options.update({
        oldNode: o,
        oldDecorations: s,
        newNode: e,
        newDecorations: t,
        oldInnerDecorations: l,
        innerDecorations: r,
        updateProps: () => i({ node: e, decorations: t, innerDecorations: r })
      });
    }
    return e.type !== this.node.type ? !1 : (e === this.node && this.decorations === t && this.innerDecorations === r || (this.node = e, this.decorations = t, this.innerDecorations = r, i({ node: e, decorations: t, innerDecorations: r })), !0);
  }
  /**
   * Select the node.
   * Add the `selected` prop and the `ProseMirror-selectednode` class.
   */
  selectNode() {
    this.renderer.updateProps({
      selected: !0
    }), this.renderer.element && this.renderer.element.classList.add("ProseMirror-selectednode");
  }
  /**
   * Deselect the node.
   * Remove the `selected` prop and the `ProseMirror-selectednode` class.
   */
  deselectNode() {
    this.renderer.updateProps({
      selected: !1
    }), this.renderer.element && this.renderer.element.classList.remove("ProseMirror-selectednode");
  }
  getDecorationClasses() {
    return this.decorations.map((e) => e.type.attrs.class).flat().join(" ");
  }
  destroy() {
    this.renderer.destroy(), this.editor.off("selectionUpdate", this.handleSelectionUpdate);
  }
}
function Z1(n, e) {
  return (t) => {
    if (!t.editor.contentComponent)
      return {};
    const r = typeof n == "function" && "__vccOpts" in n ? n.__vccOpts : n;
    return new X1(r, t, e);
  };
}
const Q1 = ni({
  defaultLang: void 0,
  defaultMarkdownTheme: "github"
});
function Oi() {
  return {
    state: Q1
  };
}
var hh = typeof global == "object" && global && global.Object === Object && global, ew = typeof self == "object" && self && self.Object === Object && self, St = hh || ew || Function("return this")(), vt = St.Symbol, mh = Object.prototype, tw = mh.hasOwnProperty, nw = mh.toString, Lr = vt ? vt.toStringTag : void 0;
function rw(n) {
  var e = tw.call(n, Lr), t = n[Lr];
  try {
    n[Lr] = void 0;
    var r = !0;
  } catch {
  }
  var i = nw.call(n);
  return r && (e ? n[Lr] = t : delete n[Lr]), i;
}
var iw = Object.prototype, ow = iw.toString;
function sw(n) {
  return ow.call(n);
}
var lw = "[object Null]", aw = "[object Undefined]", jd = vt ? vt.toStringTag : void 0;
function Mr(n) {
  return n == null ? n === void 0 ? aw : lw : jd && jd in Object(n) ? rw(n) : sw(n);
}
function Hn(n) {
  return n != null && typeof n == "object";
}
var cw = "[object Symbol]";
function As(n) {
  return typeof n == "symbol" || Hn(n) && Mr(n) == cw;
}
function gh(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length, i = Array(r); ++t < r; )
    i[t] = e(n[t], t, n);
  return i;
}
var wt = Array.isArray, Wd = vt ? vt.prototype : void 0, Ud = Wd ? Wd.toString : void 0;
function yh(n) {
  if (typeof n == "string")
    return n;
  if (wt(n))
    return gh(n, yh) + "";
  if (As(n))
    return Ud ? Ud.call(n) : "";
  var e = n + "";
  return e == "0" && 1 / n == -1 / 0 ? "-0" : e;
}
var dw = /\s/;
function uw(n) {
  for (var e = n.length; e-- && dw.test(n.charAt(e)); )
    ;
  return e;
}
var fw = /^\s+/;
function pw(n) {
  return n && n.slice(0, uw(n) + 1).replace(fw, "");
}
function Vn(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
var Kd = NaN, hw = /^[-+]0x[0-9a-f]+$/i, mw = /^0b[01]+$/i, gw = /^0o[0-7]+$/i, yw = parseInt;
function qd(n) {
  if (typeof n == "number")
    return n;
  if (As(n))
    return Kd;
  if (Vn(n)) {
    var e = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = Vn(e) ? e + "" : e;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = pw(n);
  var t = mw.test(n);
  return t || gw.test(n) ? yw(n.slice(2), t ? 2 : 8) : hw.test(n) ? Kd : +n;
}
function Ja(n) {
  return n;
}
var bw = "[object AsyncFunction]", vw = "[object Function]", ww = "[object GeneratorFunction]", Sw = "[object Proxy]";
function bh(n) {
  if (!Vn(n))
    return !1;
  var e = Mr(n);
  return e == vw || e == ww || e == bw || e == Sw;
}
var nl = St["__core-js_shared__"], Gd = function() {
  var n = /[^.]+$/.exec(nl && nl.keys && nl.keys.IE_PROTO || "");
  return n ? "Symbol(src)_1." + n : "";
}();
function xw(n) {
  return !!Gd && Gd in n;
}
var kw = Function.prototype, Cw = kw.toString;
function Un(n) {
  if (n != null) {
    try {
      return Cw.call(n);
    } catch {
    }
    try {
      return n + "";
    } catch {
    }
  }
  return "";
}
var Tw = /[\\^$.*+?()[\]{}|]/g, Aw = /^\[object .+?Constructor\]$/, Mw = Function.prototype, Ew = Object.prototype, Ow = Mw.toString, Nw = Ew.hasOwnProperty, Dw = RegExp(
  "^" + Ow.call(Nw).replace(Tw, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function _w(n) {
  if (!Vn(n) || xw(n))
    return !1;
  var e = bh(n) ? Dw : Aw;
  return e.test(Un(n));
}
function Rw(n, e) {
  return n == null ? void 0 : n[e];
}
function Kn(n, e) {
  var t = Rw(n, e);
  return _w(t) ? t : void 0;
}
var $l = Kn(St, "WeakMap");
function Iw(n, e, t) {
  switch (t.length) {
    case 0:
      return n.call(e);
    case 1:
      return n.call(e, t[0]);
    case 2:
      return n.call(e, t[0], t[1]);
    case 3:
      return n.call(e, t[0], t[1], t[2]);
  }
  return n.apply(e, t);
}
var Pw = 800, Lw = 16, Bw = Date.now;
function zw(n) {
  var e = 0, t = 0;
  return function() {
    var r = Bw(), i = Lw - (r - t);
    if (t = r, i > 0) {
      if (++e >= Pw)
        return arguments[0];
    } else
      e = 0;
    return n.apply(void 0, arguments);
  };
}
function Fw(n) {
  return function() {
    return n;
  };
}
var Jd = function() {
  try {
    var n = Kn(Object, "defineProperty");
    return n({}, "", {}), n;
  } catch {
  }
}(), Hw = Jd ? function(n, e) {
  return Jd(n, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Fw(e),
    writable: !0
  });
} : Ja, Vw = zw(Hw);
function $w(n, e, t, r) {
  for (var i = n.length, o = t + -1; ++o < i; )
    if (e(n[o], o, n))
      return o;
  return -1;
}
function jw(n) {
  return n !== n;
}
function Ww(n, e, t) {
  for (var r = t - 1, i = n.length; ++r < i; )
    if (n[r] === e)
      return r;
  return -1;
}
function Uw(n, e, t) {
  return e === e ? Ww(n, e, t) : $w(n, jw, t);
}
function Kw(n, e) {
  var t = n == null ? 0 : n.length;
  return !!t && Uw(n, e, 0) > -1;
}
var qw = 9007199254740991, Gw = /^(?:0|[1-9]\d*)$/;
function vh(n, e) {
  var t = typeof n;
  return e = e ?? qw, !!e && (t == "number" || t != "symbol" && Gw.test(n)) && n > -1 && n % 1 == 0 && n < e;
}
function wh(n, e) {
  return n === e || n !== n && e !== e;
}
var Yd = Math.max;
function Jw(n, e, t) {
  return e = Yd(e === void 0 ? n.length - 1 : e, 0), function() {
    for (var r = arguments, i = -1, o = Yd(r.length - e, 0), s = Array(o); ++i < o; )
      s[i] = r[e + i];
    i = -1;
    for (var l = Array(e + 1); ++i < e; )
      l[i] = r[i];
    return l[e] = t(s), Iw(n, this, l);
  };
}
function Yw(n, e) {
  return Vw(Jw(n, e, Ja), n + "");
}
var Xw = 9007199254740991;
function Ya(n) {
  return typeof n == "number" && n > -1 && n % 1 == 0 && n <= Xw;
}
function Sh(n) {
  return n != null && Ya(n.length) && !bh(n);
}
var Zw = Object.prototype;
function Qw(n) {
  var e = n && n.constructor, t = typeof e == "function" && e.prototype || Zw;
  return n === t;
}
function eS(n, e) {
  for (var t = -1, r = Array(n); ++t < n; )
    r[t] = e(t);
  return r;
}
var tS = "[object Arguments]";
function Xd(n) {
  return Hn(n) && Mr(n) == tS;
}
var xh = Object.prototype, nS = xh.hasOwnProperty, rS = xh.propertyIsEnumerable, Xa = Xd(/* @__PURE__ */ function() {
  return arguments;
}()) ? Xd : function(n) {
  return Hn(n) && nS.call(n, "callee") && !rS.call(n, "callee");
};
function iS() {
  return !1;
}
var kh = typeof exports == "object" && exports && !exports.nodeType && exports, Zd = kh && typeof module == "object" && module && !module.nodeType && module, oS = Zd && Zd.exports === kh, Qd = oS ? St.Buffer : void 0, sS = Qd ? Qd.isBuffer : void 0, jl = sS || iS, lS = "[object Arguments]", aS = "[object Array]", cS = "[object Boolean]", dS = "[object Date]", uS = "[object Error]", fS = "[object Function]", pS = "[object Map]", hS = "[object Number]", mS = "[object Object]", gS = "[object RegExp]", yS = "[object Set]", bS = "[object String]", vS = "[object WeakMap]", wS = "[object ArrayBuffer]", SS = "[object DataView]", xS = "[object Float32Array]", kS = "[object Float64Array]", CS = "[object Int8Array]", TS = "[object Int16Array]", AS = "[object Int32Array]", MS = "[object Uint8Array]", ES = "[object Uint8ClampedArray]", OS = "[object Uint16Array]", NS = "[object Uint32Array]", Z = {};
Z[xS] = Z[kS] = Z[CS] = Z[TS] = Z[AS] = Z[MS] = Z[ES] = Z[OS] = Z[NS] = !0;
Z[lS] = Z[aS] = Z[wS] = Z[cS] = Z[SS] = Z[dS] = Z[uS] = Z[fS] = Z[pS] = Z[hS] = Z[mS] = Z[gS] = Z[yS] = Z[bS] = Z[vS] = !1;
function DS(n) {
  return Hn(n) && Ya(n.length) && !!Z[Mr(n)];
}
function Ch(n) {
  return function(e) {
    return n(e);
  };
}
var Th = typeof exports == "object" && exports && !exports.nodeType && exports, Gr = Th && typeof module == "object" && module && !module.nodeType && module, _S = Gr && Gr.exports === Th, rl = _S && hh.process, eu = function() {
  try {
    var n = Gr && Gr.require && Gr.require("util").types;
    return n || rl && rl.binding && rl.binding("util");
  } catch {
  }
}(), tu = eu && eu.isTypedArray, Ah = tu ? Ch(tu) : DS, RS = Object.prototype, IS = RS.hasOwnProperty;
function PS(n, e) {
  var t = wt(n), r = !t && Xa(n), i = !t && !r && jl(n), o = !t && !r && !i && Ah(n), s = t || r || i || o, l = s ? eS(n.length, String) : [], a = l.length;
  for (var c in n)
    IS.call(n, c) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
    vh(c, a))) && l.push(c);
  return l;
}
function LS(n, e) {
  return function(t) {
    return n(e(t));
  };
}
var BS = LS(Object.keys, Object), zS = Object.prototype, FS = zS.hasOwnProperty;
function HS(n) {
  if (!Qw(n))
    return BS(n);
  var e = [];
  for (var t in Object(n))
    FS.call(n, t) && t != "constructor" && e.push(t);
  return e;
}
function Mh(n) {
  return Sh(n) ? PS(n) : HS(n);
}
var VS = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, $S = /^\w*$/;
function Za(n, e) {
  if (wt(n))
    return !1;
  var t = typeof n;
  return t == "number" || t == "symbol" || t == "boolean" || n == null || As(n) ? !0 : $S.test(n) || !VS.test(n) || e != null && n in Object(e);
}
var yi = Kn(Object, "create");
function jS() {
  this.__data__ = yi ? yi(null) : {}, this.size = 0;
}
function WS(n) {
  var e = this.has(n) && delete this.__data__[n];
  return this.size -= e ? 1 : 0, e;
}
var US = "__lodash_hash_undefined__", KS = Object.prototype, qS = KS.hasOwnProperty;
function GS(n) {
  var e = this.__data__;
  if (yi) {
    var t = e[n];
    return t === US ? void 0 : t;
  }
  return qS.call(e, n) ? e[n] : void 0;
}
var JS = Object.prototype, YS = JS.hasOwnProperty;
function XS(n) {
  var e = this.__data__;
  return yi ? e[n] !== void 0 : YS.call(e, n);
}
var ZS = "__lodash_hash_undefined__";
function QS(n, e) {
  var t = this.__data__;
  return this.size += this.has(n) ? 0 : 1, t[n] = yi && e === void 0 ? ZS : e, this;
}
function $n(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
$n.prototype.clear = jS;
$n.prototype.delete = WS;
$n.prototype.get = GS;
$n.prototype.has = XS;
$n.prototype.set = QS;
function ex() {
  this.__data__ = [], this.size = 0;
}
function Ms(n, e) {
  for (var t = n.length; t--; )
    if (wh(n[t][0], e))
      return t;
  return -1;
}
var tx = Array.prototype, nx = tx.splice;
function rx(n) {
  var e = this.__data__, t = Ms(e, n);
  if (t < 0)
    return !1;
  var r = e.length - 1;
  return t == r ? e.pop() : nx.call(e, t, 1), --this.size, !0;
}
function ix(n) {
  var e = this.__data__, t = Ms(e, n);
  return t < 0 ? void 0 : e[t][1];
}
function ox(n) {
  return Ms(this.__data__, n) > -1;
}
function sx(n, e) {
  var t = this.__data__, r = Ms(t, n);
  return r < 0 ? (++this.size, t.push([n, e])) : t[r][1] = e, this;
}
function $t(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
$t.prototype.clear = ex;
$t.prototype.delete = rx;
$t.prototype.get = ix;
$t.prototype.has = ox;
$t.prototype.set = sx;
var bi = Kn(St, "Map");
function lx() {
  this.size = 0, this.__data__ = {
    hash: new $n(),
    map: new (bi || $t)(),
    string: new $n()
  };
}
function ax(n) {
  var e = typeof n;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? n !== "__proto__" : n === null;
}
function Es(n, e) {
  var t = n.__data__;
  return ax(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function cx(n) {
  var e = Es(this, n).delete(n);
  return this.size -= e ? 1 : 0, e;
}
function dx(n) {
  return Es(this, n).get(n);
}
function ux(n) {
  return Es(this, n).has(n);
}
function fx(n, e) {
  var t = Es(this, n), r = t.size;
  return t.set(n, e), this.size += t.size == r ? 0 : 1, this;
}
function jt(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
jt.prototype.clear = lx;
jt.prototype.delete = cx;
jt.prototype.get = dx;
jt.prototype.has = ux;
jt.prototype.set = fx;
var px = "Expected a function";
function Qa(n, e) {
  if (typeof n != "function" || e != null && typeof e != "function")
    throw new TypeError(px);
  var t = function() {
    var r = arguments, i = e ? e.apply(this, r) : r[0], o = t.cache;
    if (o.has(i))
      return o.get(i);
    var s = n.apply(this, r);
    return t.cache = o.set(i, s) || o, s;
  };
  return t.cache = new (Qa.Cache || jt)(), t;
}
Qa.Cache = jt;
var hx = 500;
function mx(n) {
  var e = Qa(n, function(r) {
    return t.size === hx && t.clear(), r;
  }), t = e.cache;
  return e;
}
var gx = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, yx = /\\(\\)?/g, bx = mx(function(n) {
  var e = [];
  return n.charCodeAt(0) === 46 && e.push(""), n.replace(gx, function(t, r, i, o) {
    e.push(i ? o.replace(yx, "$1") : r || t);
  }), e;
});
function vx(n) {
  return n == null ? "" : yh(n);
}
function Eh(n, e) {
  return wt(n) ? n : Za(n, e) ? [n] : bx(vx(n));
}
function Os(n) {
  if (typeof n == "string" || As(n))
    return n;
  var e = n + "";
  return e == "0" && 1 / n == -1 / 0 ? "-0" : e;
}
function Oh(n, e) {
  e = Eh(e, n);
  for (var t = 0, r = e.length; n != null && t < r; )
    n = n[Os(e[t++])];
  return t && t == r ? n : void 0;
}
function wx(n, e, t) {
  var r = n == null ? void 0 : Oh(n, e);
  return r === void 0 ? t : r;
}
function Nh(n, e) {
  for (var t = -1, r = e.length, i = n.length; ++t < r; )
    n[i + t] = e[t];
  return n;
}
var nu = vt ? vt.isConcatSpreadable : void 0;
function Sx(n) {
  return wt(n) || Xa(n) || !!(nu && n && n[nu]);
}
function xx(n, e, t, r, i) {
  var o = -1, s = n.length;
  for (t || (t = Sx), i || (i = []); ++o < s; ) {
    var l = n[o];
    t(l) && Nh(i, l);
  }
  return i;
}
function kx() {
  this.__data__ = new $t(), this.size = 0;
}
function Cx(n) {
  var e = this.__data__, t = e.delete(n);
  return this.size = e.size, t;
}
function Tx(n) {
  return this.__data__.get(n);
}
function Ax(n) {
  return this.__data__.has(n);
}
var Mx = 200;
function Ex(n, e) {
  var t = this.__data__;
  if (t instanceof $t) {
    var r = t.__data__;
    if (!bi || r.length < Mx - 1)
      return r.push([n, e]), this.size = ++t.size, this;
    t = this.__data__ = new jt(r);
  }
  return t.set(n, e), this.size = t.size, this;
}
function Ht(n) {
  var e = this.__data__ = new $t(n);
  this.size = e.size;
}
Ht.prototype.clear = kx;
Ht.prototype.delete = Cx;
Ht.prototype.get = Tx;
Ht.prototype.has = Ax;
Ht.prototype.set = Ex;
function Ox(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length, i = 0, o = []; ++t < r; ) {
    var s = n[t];
    e(s, t, n) && (o[i++] = s);
  }
  return o;
}
function Nx() {
  return [];
}
var Dx = Object.prototype, _x = Dx.propertyIsEnumerable, ru = Object.getOwnPropertySymbols, Rx = ru ? function(n) {
  return n == null ? [] : (n = Object(n), Ox(ru(n), function(e) {
    return _x.call(n, e);
  }));
} : Nx;
function Ix(n, e, t) {
  var r = e(n);
  return wt(n) ? r : Nh(r, t(n));
}
function iu(n) {
  return Ix(n, Mh, Rx);
}
var Wl = Kn(St, "DataView"), Ul = Kn(St, "Promise"), Kl = Kn(St, "Set"), ou = "[object Map]", Px = "[object Object]", su = "[object Promise]", lu = "[object Set]", au = "[object WeakMap]", cu = "[object DataView]", Lx = Un(Wl), Bx = Un(bi), zx = Un(Ul), Fx = Un(Kl), Hx = Un($l), Jt = Mr;
(Wl && Jt(new Wl(new ArrayBuffer(1))) != cu || bi && Jt(new bi()) != ou || Ul && Jt(Ul.resolve()) != su || Kl && Jt(new Kl()) != lu || $l && Jt(new $l()) != au) && (Jt = function(n) {
  var e = Mr(n), t = e == Px ? n.constructor : void 0, r = t ? Un(t) : "";
  if (r)
    switch (r) {
      case Lx:
        return cu;
      case Bx:
        return ou;
      case zx:
        return su;
      case Fx:
        return lu;
      case Hx:
        return au;
    }
  return e;
});
var du = St.Uint8Array, Vx = "__lodash_hash_undefined__";
function $x(n) {
  return this.__data__.set(n, Vx), this;
}
function jx(n) {
  return this.__data__.has(n);
}
function vi(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.__data__ = new jt(); ++e < t; )
    this.add(n[e]);
}
vi.prototype.add = vi.prototype.push = $x;
vi.prototype.has = jx;
function Wx(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r; )
    if (e(n[t], t, n))
      return !0;
  return !1;
}
function Dh(n, e) {
  return n.has(e);
}
var Ux = 1, Kx = 2;
function _h(n, e, t, r, i, o) {
  var s = t & Ux, l = n.length, a = e.length;
  if (l != a && !(s && a > l))
    return !1;
  var c = o.get(n), d = o.get(e);
  if (c && d)
    return c == e && d == n;
  var u = -1, f = !0, p = t & Kx ? new vi() : void 0;
  for (o.set(n, e), o.set(e, n); ++u < l; ) {
    var h = n[u], m = e[u];
    if (r)
      var g = s ? r(m, h, u, e, n, o) : r(h, m, u, n, e, o);
    if (g !== void 0) {
      if (g)
        continue;
      f = !1;
      break;
    }
    if (p) {
      if (!Wx(e, function(y, w) {
        if (!Dh(p, w) && (h === y || i(h, y, t, r, o)))
          return p.push(w);
      })) {
        f = !1;
        break;
      }
    } else if (!(h === m || i(h, m, t, r, o))) {
      f = !1;
      break;
    }
  }
  return o.delete(n), o.delete(e), f;
}
function qx(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r, i) {
    t[++e] = [i, r];
  }), t;
}
function Gx(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r) {
    t[++e] = r;
  }), t;
}
var Jx = 1, Yx = 2, Xx = "[object Boolean]", Zx = "[object Date]", Qx = "[object Error]", ek = "[object Map]", tk = "[object Number]", nk = "[object RegExp]", rk = "[object Set]", ik = "[object String]", ok = "[object Symbol]", sk = "[object ArrayBuffer]", lk = "[object DataView]", uu = vt ? vt.prototype : void 0, il = uu ? uu.valueOf : void 0;
function ak(n, e, t, r, i, o, s) {
  switch (t) {
    case lk:
      if (n.byteLength != e.byteLength || n.byteOffset != e.byteOffset)
        return !1;
      n = n.buffer, e = e.buffer;
    case sk:
      return !(n.byteLength != e.byteLength || !o(new du(n), new du(e)));
    case Xx:
    case Zx:
    case tk:
      return wh(+n, +e);
    case Qx:
      return n.name == e.name && n.message == e.message;
    case nk:
    case ik:
      return n == e + "";
    case ek:
      var l = qx;
    case rk:
      var a = r & Jx;
      if (l || (l = Gx), n.size != e.size && !a)
        return !1;
      var c = s.get(n);
      if (c)
        return c == e;
      r |= Yx, s.set(n, e);
      var d = _h(l(n), l(e), r, i, o, s);
      return s.delete(n), d;
    case ok:
      if (il)
        return il.call(n) == il.call(e);
  }
  return !1;
}
var ck = 1, dk = Object.prototype, uk = dk.hasOwnProperty;
function fk(n, e, t, r, i, o) {
  var s = t & ck, l = iu(n), a = l.length, c = iu(e), d = c.length;
  if (a != d && !s)
    return !1;
  for (var u = a; u--; ) {
    var f = l[u];
    if (!(s ? f in e : uk.call(e, f)))
      return !1;
  }
  var p = o.get(n), h = o.get(e);
  if (p && h)
    return p == e && h == n;
  var m = !0;
  o.set(n, e), o.set(e, n);
  for (var g = s; ++u < a; ) {
    f = l[u];
    var y = n[f], w = e[f];
    if (r)
      var A = s ? r(w, y, f, e, n, o) : r(y, w, f, n, e, o);
    if (!(A === void 0 ? y === w || i(y, w, t, r, o) : A)) {
      m = !1;
      break;
    }
    g || (g = f == "constructor");
  }
  if (m && !g) {
    var b = n.constructor, C = e.constructor;
    b != C && "constructor" in n && "constructor" in e && !(typeof b == "function" && b instanceof b && typeof C == "function" && C instanceof C) && (m = !1);
  }
  return o.delete(n), o.delete(e), m;
}
var pk = 1, fu = "[object Arguments]", pu = "[object Array]", Ji = "[object Object]", hk = Object.prototype, hu = hk.hasOwnProperty;
function mk(n, e, t, r, i, o) {
  var s = wt(n), l = wt(e), a = s ? pu : Jt(n), c = l ? pu : Jt(e);
  a = a == fu ? Ji : a, c = c == fu ? Ji : c;
  var d = a == Ji, u = c == Ji, f = a == c;
  if (f && jl(n)) {
    if (!jl(e))
      return !1;
    s = !0, d = !1;
  }
  if (f && !d)
    return o || (o = new Ht()), s || Ah(n) ? _h(n, e, t, r, i, o) : ak(n, e, a, t, r, i, o);
  if (!(t & pk)) {
    var p = d && hu.call(n, "__wrapped__"), h = u && hu.call(e, "__wrapped__");
    if (p || h) {
      var m = p ? n.value() : n, g = h ? e.value() : e;
      return o || (o = new Ht()), i(m, g, t, r, o);
    }
  }
  return f ? (o || (o = new Ht()), fk(n, e, t, r, i, o)) : !1;
}
function ec(n, e, t, r, i) {
  return n === e ? !0 : n == null || e == null || !Hn(n) && !Hn(e) ? n !== n && e !== e : mk(n, e, t, r, ec, i);
}
var gk = 1, yk = 2;
function bk(n, e, t, r) {
  var i = t.length, o = i;
  if (n == null)
    return !o;
  for (n = Object(n); i--; ) {
    var s = t[i];
    if (s[2] ? s[1] !== n[s[0]] : !(s[0] in n))
      return !1;
  }
  for (; ++i < o; ) {
    s = t[i];
    var l = s[0], a = n[l], c = s[1];
    if (s[2]) {
      if (a === void 0 && !(l in n))
        return !1;
    } else {
      var d = new Ht(), u;
      if (!(u === void 0 ? ec(c, a, gk | yk, r, d) : u))
        return !1;
    }
  }
  return !0;
}
function Rh(n) {
  return n === n && !Vn(n);
}
function vk(n) {
  for (var e = Mh(n), t = e.length; t--; ) {
    var r = e[t], i = n[r];
    e[t] = [r, i, Rh(i)];
  }
  return e;
}
function Ih(n, e) {
  return function(t) {
    return t == null ? !1 : t[n] === e && (e !== void 0 || n in Object(t));
  };
}
function wk(n) {
  var e = vk(n);
  return e.length == 1 && e[0][2] ? Ih(e[0][0], e[0][1]) : function(t) {
    return t === n || bk(t, n, e);
  };
}
function Sk(n, e) {
  return n != null && e in Object(n);
}
function xk(n, e, t) {
  e = Eh(e, n);
  for (var r = -1, i = e.length, o = !1; ++r < i; ) {
    var s = Os(e[r]);
    if (!(o = n != null && t(n, s)))
      break;
    n = n[s];
  }
  return o || ++r != i ? o : (i = n == null ? 0 : n.length, !!i && Ya(i) && vh(s, i) && (wt(n) || Xa(n)));
}
function kk(n, e) {
  return n != null && xk(n, e, Sk);
}
var Ck = 1, Tk = 2;
function Ak(n, e) {
  return Za(n) && Rh(e) ? Ih(Os(n), e) : function(t) {
    var r = wx(t, n);
    return r === void 0 && r === e ? kk(t, n) : ec(e, r, Ck | Tk);
  };
}
function Mk(n) {
  return function(e) {
    return e == null ? void 0 : e[n];
  };
}
function Ek(n) {
  return function(e) {
    return Oh(e, n);
  };
}
function Ok(n) {
  return Za(n) ? Mk(Os(n)) : Ek(n);
}
function Nk(n) {
  return typeof n == "function" ? n : n == null ? Ja : typeof n == "object" ? wt(n) ? Ak(n[0], n[1]) : wk(n) : Ok(n);
}
var ol = function() {
  return St.Date.now();
}, Dk = "Expected a function", _k = Math.max, Rk = Math.min;
function Ik(n, e, t) {
  var r, i, o, s, l, a, c = 0, d = !1, u = !1, f = !0;
  if (typeof n != "function")
    throw new TypeError(Dk);
  e = qd(e) || 0, Vn(t) && (d = !!t.leading, u = "maxWait" in t, o = u ? _k(qd(t.maxWait) || 0, e) : o, f = "trailing" in t ? !!t.trailing : f);
  function p(v) {
    var _ = r, z = i;
    return r = i = void 0, c = v, s = n.apply(z, _), s;
  }
  function h(v) {
    return c = v, l = setTimeout(y, e), d ? p(v) : s;
  }
  function m(v) {
    var _ = v - a, z = v - c, R = e - _;
    return u ? Rk(R, o - z) : R;
  }
  function g(v) {
    var _ = v - a, z = v - c;
    return a === void 0 || _ >= e || _ < 0 || u && z >= o;
  }
  function y() {
    var v = ol();
    if (g(v))
      return w(v);
    l = setTimeout(y, m(v));
  }
  function w(v) {
    return l = void 0, f && r ? p(v) : (r = i = void 0, s);
  }
  function A() {
    l !== void 0 && clearTimeout(l), c = 0, r = a = i = l = void 0;
  }
  function b() {
    return l === void 0 ? s : w(ol());
  }
  function C() {
    var v = ol(), _ = g(v);
    if (r = arguments, i = this, a = v, _) {
      if (l === void 0)
        return h(a);
      if (u)
        return clearTimeout(l), l = setTimeout(y, e), p(a);
    }
    return l === void 0 && (l = setTimeout(y, e)), s;
  }
  return C.cancel = A, C.flush = b, C;
}
function sl(n) {
  return Hn(n) && Sh(n);
}
var Pk = 200;
function Lk(n, e, t, r) {
  var i = -1, o = Kw, s = !0, l = n.length, a = [], c = e.length;
  if (!l)
    return a;
  t && (e = gh(e, Ch(t))), e.length >= Pk && (o = Dh, s = !1, e = new vi(e));
  e:
    for (; ++i < l; ) {
      var d = n[i], u = t == null ? d : t(d);
      if (d = d !== 0 ? d : 0, s && u === u) {
        for (var f = c; f--; )
          if (e[f] === u)
            continue e;
        a.push(d);
      } else o(e, u, r) || a.push(d);
    }
  return a;
}
function Bk(n) {
  var e = n == null ? 0 : n.length;
  return e ? n[e - 1] : void 0;
}
var zk = Yw(function(n, e) {
  var t = Bk(e);
  return sl(t) && (t = void 0), sl(n) ? Lk(n, xx(e, 1, sl), Nk(t)) : [];
}), Fk = "Expected a function";
function ql(n, e, t) {
  var r = !0, i = !0;
  if (typeof n != "function")
    throw new TypeError(Fk);
  return Vn(t) && (r = "leading" in t ? !!t.leading : r, i = "trailing" in t ? !!t.trailing : i), Ik(n, e, {
    leading: r,
    maxWait: e,
    trailing: i
  });
}
const Ph = function(n) {
  var e = new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
  return !!e.test(n);
};
function Hk(n, e, t) {
  return n < e ? e : n > t ? t : n;
}
const Gl = (n) => typeof n == "number", po = (n) => typeof n == "string", mu = (n) => typeof n == "boolean", Vk = (n) => typeof n == "function", Jr = (n, e = "px") => {
  if (!n) return n;
  const t = Gl(n) ? String(n) : n, r = Number.parseFloat(t), i = t.match(/[a-zA-Z%]+$/), o = i ? i[0] : e;
  return Number.isNaN(r) ? n : r + o;
}, $k = /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|samsungbrowser.*mobile|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i, jk = /CrOS/, Wk = /android|ipad|playbook|silk/i;
function Jl(n = {}) {
  let e = n.ua || typeof navigator < "u" && navigator.userAgent;
  return e && typeof e == "object" && e.headers && typeof e.headers["user-agent"] == "string" && (e = e.headers["user-agent"]), typeof e != "string" ? !1 : !!($k.test(e) && !jk.test(e) || n.tablet && Wk.test(e) || n.tablet && n.featureDetect && typeof navigator < "u" && navigator.maxTouchPoints > 1 && e.includes("Macintosh") && e.includes("Safari"));
}
const gu = "Hanken Grotesk", yu = "github", bu = 200, Uk = {
  i18n: void 0,
  DEFAULT_LANG_VALUE: "en",
  EDITOR_UPDATE_THROTTLE_WAIT_TIME: bu,
  EDITOR_UPDATE_WATCH_THROTTLE_WAIT_TIME: bu - 80,
  IMAGE_MIN_SIZE: 20,
  IMAGE_MAX_SIZE: 1e5,
  IMAGE_THROTTLE_WAIT_TIME: 16,
  TABLE_INIT_GRID_SIZE: 6,
  TABLE_MAX_GRID_SIZE: 10,
  TABLE_DEFAULT_SELECTED_GRID_SIZE: 2,
  COLORS_LIST: [
    "",
    // none
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc1a07",
    "#ff9800",
    "#ff5722",
    "#000000",
    "#333333",
    "#666666",
    "#999999",
    "#CCCCCC",
    "#D5D5D4",
    "#E8E8E8",
    "#EEEEEE"
  ],
  DEFAULT_FONT_FAMILY_VALUE: gu,
  DEFAULT_FONT_FAMILY_LIST: [
    { title: "default", value: gu, divider: !0, default: !0 },
    { title: "Arial", value: "Arial" },
    { title: "Arial Black", value: "Arial Black" },
    { title: "Georgia", value: "Georgia" },
    { title: "Impact", value: "Impact" },
    { title: "Helvetica", value: "Helvetica" },
    { title: "Tahoma", value: "Tahoma" },
    { title: "Times New Roman", value: "Times New Roman" },
    { title: "Verdana", value: "Verdana" },
    { title: "Courier New", value: "Courier New", divider: !0 },
    { title: "Monaco", value: "Monaco" },
    { title: "Monospace", value: "monospace" }
  ],
  DEFAULT_MARKDOWN_THEME_VALUE: yu,
  DEFAULT_MARKDOWN_THEME_LIST: [{ title: "default", value: yu, default: !0 }],
  DEFAULT_FONT_SIZE_LIST: [8, 10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72],
  DEFAULT_FONT_SIZE_VALUE: "default",
  IMAGE_SIZE: {
    "size-small": 200,
    "size-medium": 500,
    "size-large": "100%"
  },
  VIDEO_SIZE: {
    "size-small": 480,
    "size-medium": 640,
    "size-large": "100%"
  },
  NODE_TYPE_MENU: {
    image: [
      "float-left",
      "float-none",
      "float-right",
      "divider",
      "image-size-small",
      "image-size-medium",
      "image-size-large",
      "divider",
      "textAlign",
      "divider",
      "image",
      "image-aspect-ratio",
      "remove"
    ],
    text: ["bold", "italic", "underline", "strike", "divider", "color", "highlight", "textAlign", "divider", "link"],
    link: [
      "bold",
      "italic",
      "underline",
      "strike",
      "divider",
      "color",
      "highlight",
      "textAlign",
      "divider",
      "link",
      "unlink",
      "link-open"
    ],
    video: ["video-size-small", "video-size-medium", "video-size-large", "divider", "video", "remove"]
  }
};
let Kk = Uk;
function xt() {
  return Kk;
}
const { DEFAULT_MARKDOWN_THEME_VALUE: vu } = xt();
function qk(n, e) {
  const { state: t } = Oi(), r = bo(() => mu(Pt(n)) ? vu : po(t.defaultMarkdownTheme) && t.defaultMarkdownTheme ? t.defaultMarkdownTheme : vu), i = bo(() => ({
    [`markdown-theme-${Pt(r)}`]: !!po(Pt(r))
  }));
  function o(l) {
    !mu(Pt(n)) && Pt(n) !== l && (e == null || e(l));
  }
  return mc(r, (l) => o(l)), mc(n, (l) => {
    l && po(l) && t.defaultMarkdownTheme !== l && (t.defaultMarkdownTheme = l);
  }), (() => {
    t.defaultMarkdownTheme && o(t.defaultMarkdownTheme);
  })(), {
    markdownThemeStyle: i
  };
}
const fr = /* @__PURE__ */ new WeakMap(), Gk = (...n) => {
  var e;
  const t = n[0], r = (e = ua()) == null ? void 0 : e.proxy;
  if (r == null && !hm())
    throw new Error("injectLocal must be called in setup");
  return r && fr.has(r) && t in fr.get(r) ? fr.get(r)[t] : mm(...n);
}, Jk = (n, e) => {
  var t;
  const r = (t = ua()) == null ? void 0 : t.proxy;
  if (r == null)
    throw new Error("provideLocal must be called in setup");
  fr.has(r) || fr.set(r, /* @__PURE__ */ Object.create(null));
  const i = fr.get(r);
  i[n] = e, gl(n, e);
};
function Yk(n, e) {
  const t = Symbol(n.name || "InjectionState"), r = void 0;
  return [(...s) => {
    const l = n(...s);
    return Jk(t, l), l;
  }, () => Gk(t, r)];
}
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const [Lh, dE] = Yk(() => {
  const { state: n } = Oi(), e = ni({
    defaultLang: DEFAULT_LANG_VALUE,
    defaultMarkdownTheme: DEFAULT_MARKDOWN_THEME_VALUE,
    isFullscreen: !1,
    isImageEvent: !1,
    color: void 0,
    highlight: void 0
  }), t = bo(() => e.isFullscreen), r = bo(() => e.isImageEvent);
  function i() {
    e.isFullscreen = !e.isFullscreen;
  }
  function o() {
    e.isImageEvent = !e.isImageEvent;
  }
  return rf(() => {
    e.defaultLang = n.defaultLang, e.defaultMarkdownTheme = n.defaultMarkdownTheme;
  }), {
    state: e,
    isFullscreen: t,
    isImageEvent: r,
    toggleFullscreen: i,
    toggleImageEvent: o
  };
}), fe = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [r, i] of e)
    t[r] = i;
  return t;
}, { i18n: Xk } = xt(), Zk = {
  props: {
    editor: {
      type: Object,
      required: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  components: {
    BubbleMenu: U1
  },
  data() {
    return {
      tippyOptions: {
        maxWidth: "auto",
        zIndex: 20,
        appendTo: "parent"
      }
    };
  },
  computed: {
    nodeType() {
      var s, l, a;
      const n = this.editor.state.selection, e = this.isLinkSelection(), t = ((s = n.node) == null ? void 0 : s.type.name) === "image", r = ((l = n.node) == null ? void 0 : l.type.name) === "video", i = ((a = n.node) == null ? void 0 : a.type.name) === "table", o = n instanceof L;
      if (e) return "link";
      if (t) return "image";
      if (r) return "video";
      if (o) return "text";
      if (i) return "table";
    },
    nodeMenus() {
      var i;
      const { extensions: n = [] } = this.editor.extensionManager, e = n.find((o) => o.name === "base-kit");
      if (!e) return {};
      const { button: t } = ((i = e.options) == null ? void 0 : i.bubble) ?? {};
      return t ? t({
        editor: this.editor,
        extension: e,
        t: Xk.global.t
      }) : {};
    },
    items() {
      var n;
      return this.nodeType ? ((n = Pt(this.nodeMenus)) == null ? void 0 : n[this.nodeType]) ?? [] : [];
    }
  },
  methods: {
    isLinkSelection() {
      const { schema: n } = this.editor, e = n.marks.link;
      return e ? this.editor.isActive(e.name) : !1;
    }
  }
};
function Qk(n, e, t, r, i, o) {
  const s = k("v-divider"), l = k("v-toolbar"), a = k("v-card-text"), c = k("v-card"), d = k("bubble-menu", !0);
  return fa((N(), H(d, {
    editor: t.editor,
    "tippy-options": i.tippyOptions
  }, {
    default: E(() => [
      O(c, { class: "vuetify-pro-tiptap-editor__menu-bubble" }, {
        default: E(() => [
          O(a, { class: "d-flex pa-0" }, {
            default: E(() => [
              O(l, {
                density: "compact",
                flat: "",
                height: "auto",
                class: "py-1 ps-1"
              }, {
                default: E(() => [
                  (N(!0), re(be, null, We(o.items, (u, f) => {
                    var p;
                    return N(), re(be, { key: f }, [
                      u.type === "divider" ? (N(), H(s, {
                        key: 0,
                        vertical: "",
                        class: "mx-1 me-2"
                      })) : (N(), H(ri(u.component), ar({
                        key: 1,
                        ref_for: !0
                      }, u.componentProps, {
                        editor: t.editor,
                        disabled: t.disabled || ((p = u.componentProps) == null ? void 0 : p.disabled)
                      }), pa({ _: 2 }, [
                        We(u.componentSlots, (h, m, g) => ({
                          name: `${m}`,
                          fn: E((y) => [
                            (N(), H(ri(h), ar({ ref_for: !0 }, y == null ? void 0 : y.props), null, 16))
                          ])
                        }))
                      ]), 1040, ["editor", "disabled"]))
                    ], 64);
                  }), 128))
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["editor", "tippy-options"])), [
    [ha, o.items.length > 0]
  ]);
}
const eC = /* @__PURE__ */ fe(Zk, [["render", Qk]]), tC = {
  props: {
    editor: {
      type: Object,
      required: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  created() {
  },
  computed: {
    items() {
      const e = [...this.editor.extensionManager.extensions].sort((r, i) => {
        const o = r.options.sort ?? -1, s = i.options.sort ?? -1;
        return o - s;
      });
      let t = [];
      for (const r of e) {
        const { button: i, divider: o = !1, spacer: s = !1, t: l = null } = r.options;
        if (!i || !Vk(i)) continue;
        const a = i({
          editor: this.editor,
          extension: r,
          t: l
        });
        if (Array.isArray(a)) {
          const c = a.map((d, u) => ({
            button: d,
            divider: u === a.length - 1 ? o : !1,
            spacer: u === 0 ? s : !1
          }));
          t = [...t, ...c];
          continue;
        }
        t.push({ button: a, divider: o, spacer: s, t: l });
      }
      return t;
    }
  }
};
function nC(n, e, t, r, i, o) {
  const s = k("v-spacer"), l = k("v-divider"), a = k("v-toolbar");
  return N(), H(a, ar(n.$attrs, {
    density: "compact",
    flat: "",
    height: "auto",
    class: "py-1 ps-1"
  }), {
    default: E(() => [
      (N(!0), re(be, null, We(o.items, (c, d) => {
        var u;
        return N(), re(be, { key: d }, [
          c.spacer ? (N(), H(s, { key: 0 })) : Fe("", !0),
          (N(), H(ri(c.button.component), ar({ ref_for: !0 }, c.button.componentProps, {
            editor: t.editor,
            disabled: t.disabled || ((u = c.button.componentProps) == null ? void 0 : u.disabled)
          }), pa({ _: 2 }, [
            We(c.button.componentSlots, (f, p, h) => ({
              name: `${p}`,
              fn: E((m) => [
                (N(), H(ri(f), ar({ ref_for: !0 }, m == null ? void 0 : m.props), null, 16))
              ])
            }))
          ]), 1040, ["editor", "disabled"])),
          c.divider ? (N(), H(l, {
            key: 1,
            vertical: "",
            class: "mx-1 me-2"
          })) : Fe("", !0)
        ], 64);
      }), 128))
    ]),
    _: 1
  }, 16);
}
const rC = /* @__PURE__ */ fe(tC, [["render", nC]]), iC = {
  name: "OlotapEditor",
  components: {
    EditorContent: q1,
    BubbleMenu: eC,
    TipTapToolbar: rC
  },
  props: {
    extensions: {
      type: Array,
      default: () => []
    },
    markdownTheme: {
      type: [String, Boolean],
      default: void 0
    },
    modelValue: {
      type: [String, Object],
      default: ""
    },
    output: {
      type: String,
      default: "html"
    },
    dark: {
      type: Boolean,
      default: void 0
    },
    outlined: {
      type: Boolean,
      default: !0
    },
    flat: {
      type: Boolean,
      default: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    label: {
      type: String,
      default: void 0
    },
    hideToolbar: {
      type: Boolean,
      default: !1
    },
    disableToolbar: {
      type: Boolean,
      default: !1
    },
    hideBubble: {
      type: Boolean,
      default: !1
    },
    removeDefaultWrapper: {
      type: Boolean,
      default: !1
    },
    maxWidth: {
      type: [String, Number],
      default: void 0
    },
    minHeight: {
      type: [String, Number],
      default: void 0
    },
    maxHeight: {
      type: [String, Number],
      default: void 0
    },
    editorClass: {
      type: [String, Array, Object],
      default: void 0
    },
    errorMessages: {
      type: [String, Array],
      default: () => []
    }
  },
  emits: ["enter", "change", "update:modelValue", "update:markdownTheme"],
  setup(n) {
    const { state: e, isFullscreen: t } = Lh();
    return {
      state: e,
      isFullscreen: t,
      isMobileDevice: Jl()
    };
  },
  data() {
    return {
      editor: null,
      updateHandler: null,
      bubbleMenuStyle: null,
      isBubbleMenuVisible: !1,
      markdownThemeStyle: null
    };
  },
  watch: {
    markdownTheme: {
      immediate: !0,
      // it is triggered at first.
      handler(n) {
        this.updateHandler && this.updateHandler(n);
      }
    }
  },
  created() {
    try {
      const { markdownThemeStyle: n, updateHandler: e } = qk(
        () => this.markdownTheme,
        (t) => {
          t !== this.markdownTheme && this.$emit("update:markdownTheme", t);
        }
      );
      this.markdownThemeStyle = n, this.updateHandler = e, this.editor = new K1({
        content: this.modelValue,
        // editorProps: {
        //   handleKeyDown: throttle((view, event) => {
        //     if (event.key === 'Enter' && !event.shiftKey) {
        //       this.$emit('enter');
        //       return true;
        //     }
        //     return false;
        //   }, EDITOR_UPDATE_THROTTLE_WAIT_TIME),
        // },
        onUpdate: ql(({ editor: t }) => {
          const r = this.getOutput(t, this.output);
          this.$emit("update:modelValue", r), this.$emit("change", { editor: t, output: r });
        }, state.constants.EDITOR_UPDATE_THROTTLE_WAIT_TIME),
        extensions: this.sortExtensions(this.state, this.extensions),
        autofocus: !1,
        editable: !this.disabled,
        injectCSS: !0
      });
    } catch (n) {
      console.error("Error while creating the editor:", n);
    }
  },
  computed: {
    contentDynamicClasses() {
      return [
        {
          ...this.markdownThemeStyle
        },
        this.editorClass
      ];
    },
    contentDynamicStyles() {
      const n = Jr(this.maxWidth), e = {
        maxWidth: n,
        width: n ? "100%" : void 0,
        margin: n ? "0 auto" : void 0,
        backgroundColor: "#FFFFFF"
      };
      if (this.isFullscreen) return { height: "100%", overflowY: "auto", ...e };
      const t = Jr(this.minHeight), r = Jr(this.maxHeight);
      return {
        minHeight: t,
        maxHeight: r,
        overflowY: "auto",
        ...e
      };
    }
  },
  methods: {
    clickTableButton(n) {
      n.stopImmediatePropagation(), document.getElementById("table-insert-button").click();
    },
    getOutput(n, e) {
      return this.removeDefaultWrapper ? e === "html" ? n.isEmpty ? "" : n.getHTML() : e === "json" ? n.isEmpty ? {} : n.getJSON() : e === "text" ? n.isEmpty ? "" : n.getText() : "" : e === "html" ? n.getHTML() : e === "json" ? n.getJSON() : e === "text" ? n.getText() : "";
    },
    sortExtensions(n, e) {
      const t = zk(e, n.extensions, "name");
      return [...n.extensions.map((i) => {
        const o = e.find((s) => s.name === i.name);
        return o ? i.configure(o.options) : i;
      }), ...t].map((i, o) => i.configure({ sort: o }));
    }
  }
}, oC = {
  key: 0,
  class: "vuetify-pro-tiptap dense"
};
function sC(n, e, t, r, i, o) {
  const s = k("BubbleMenu"), l = k("v-card-title"), a = k("v-divider"), c = k("TipTapToolbar"), d = k("editor-content"), u = k("v-icon"), f = k("v-card"), p = k("v-input");
  return i.editor ? (N(), re("div", oC, [
    t.hideBubble ? Fe("", !0) : (N(), H(s, {
      key: 0,
      editor: i.editor,
      disabled: t.disableToolbar
    }, null, 8, ["editor", "disabled"])),
    O(p, {
      class: "pt-0",
      "hide-details": "auto",
      "error-messages": t.errorMessages
    }, {
      default: E(() => [
        O(f, ar({
          flat: t.flat,
          outlined: t.outlined,
          color: "grey-lighten-4"
        }, n.$attrs, {
          style: {
            borderColor: n.$attrs["error-messages"] ? "#ff5252" : void 0,
            width: "100%"
          },
          class: ["vuetify-pro-tiptap-editor", { "vuetify-pro-tiptap-editor--fullscreen": r.isFullscreen }]
        }), {
          default: E(() => [
            t.label && !r.isFullscreen ? (N(), re(be, { key: 0 }, [
              O(l, {
                class: Mn(n.bg - n.grey - n.lighten - 3)
              }, {
                default: E(() => [
                  rt(De(t.label), 1)
                ]),
                _: 1
              }, 8, ["class"]),
              O(a)
            ], 64)) : Fe("", !0),
            t.hideToolbar ? Fe("", !0) : (N(), H(c, {
              key: 1,
              class: "vuetify-pro-tiptap-editor__toolbar",
              editor: i.editor,
              disabled: t.disableToolbar
            }, null, 8, ["editor", "disabled"])),
            ki(n.$slots, "editor", gm(ym({ editor: i.editor, props: { class: "vuetify-pro-tiptap-editor__content", "data-testid": "value" } })), () => [
              O(d, {
                class: Mn(["vuetify-pro-tiptap-editor__content", o.contentDynamicClasses]),
                style: En(o.contentDynamicStyles),
                editor: i.editor,
                "data-testid": "value"
              }, null, 8, ["class", "style", "editor"])
            ]),
            r.isMobileDevice ? Fe("", !0) : fa((N(), re("div", {
              key: 2,
              id: "bubble-menu",
              ref: "bubbleMenuRef",
              style: En(i.bubbleMenuStyle)
            }, [
              dn("button", {
                onClick: e[0] || (e[0] = bm((...h) => o.clickTableButton && o.clickTableButton(...h), ["stop", "prevent"]))
              }, [
                O(u, null, {
                  default: E(() => e[1] || (e[1] = [
                    rt("mdi-dots-vertical")
                  ])),
                  _: 1
                })
              ])
            ], 4)), [
              [ha, i.isBubbleMenuVisible]
            ])
          ]),
          _: 3
        }, 16, ["flat", "outlined", "style", "class"])
      ]),
      _: 3
    }, 8, ["error-messages"])
  ])) : Fe("", !0);
}
const uE = /* @__PURE__ */ fe(iC, [["render", sC]]), lC = te.create({
  name: "characterCount",
  addOptions() {
    return {
      limit: null,
      mode: "textSize",
      textCounter: (n) => n.length,
      wordCounter: (n) => n.split(" ").filter((e) => e !== "").length
    };
  },
  addStorage() {
    return {
      characters: () => 0,
      words: () => 0
    };
  },
  onBeforeCreate() {
    this.storage.characters = (n) => {
      const e = (n == null ? void 0 : n.node) || this.editor.state.doc;
      if (((n == null ? void 0 : n.mode) || this.options.mode) === "textSize") {
        const r = e.textBetween(0, e.content.size, void 0, " ");
        return this.options.textCounter(r);
      }
      return e.nodeSize;
    }, this.storage.words = (n) => {
      const e = (n == null ? void 0 : n.node) || this.editor.state.doc, t = e.textBetween(0, e.content.size, " ", " ");
      return this.options.wordCounter(t);
    };
  },
  addProseMirrorPlugins() {
    let n = !1;
    return [
      new ne({
        key: new de("characterCount"),
        appendTransaction: (e, t, r) => {
          if (n)
            return;
          const i = this.options.limit;
          if (i == null || i === 0) {
            n = !0;
            return;
          }
          const o = this.storage.characters({ node: r.doc });
          if (o > i) {
            const s = o - i, l = 0, a = s;
            console.warn(`[CharacterCount] Initial content exceeded limit of ${i} characters. Content was automatically trimmed.`);
            const c = r.tr.deleteRange(l, a);
            return n = !0, c;
          }
          n = !0;
        },
        filterTransaction: (e, t) => {
          const r = this.options.limit;
          if (!e.docChanged || r === 0 || r === null || r === void 0)
            return !0;
          const i = this.storage.characters({ node: t.doc }), o = this.storage.characters({ node: e.doc });
          if (o <= r || i > r && o > r && o <= i)
            return !0;
          if (i > r && o > r && o > i || !e.getMeta("paste"))
            return !1;
          const l = e.selection.$head.pos, a = o - r, c = l - a, d = l;
          return e.deleteRange(c, d), !(this.storage.characters({ node: e.doc }) > r);
        }
      })
    ];
  }
}), aC = ue.create({
  name: "doc",
  topNode: !0,
  content: "block+"
});
function cC(n = {}) {
  return new ne({
    view(e) {
      return new dC(e, n);
    }
  });
}
class dC {
  constructor(e, t) {
    var r;
    this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.width = (r = t.width) !== null && r !== void 0 ? r : 1, this.color = t.color === !1 ? void 0 : t.color || "black", this.class = t.class, this.handlers = ["dragover", "dragend", "drop", "dragleave"].map((i) => {
      let o = (s) => {
        this[i](s);
      };
      return e.dom.addEventListener(i, o), { name: i, handler: o };
    });
  }
  destroy() {
    this.handlers.forEach(({ name: e, handler: t }) => this.editorView.dom.removeEventListener(e, t));
  }
  update(e, t) {
    this.cursorPos != null && t.doc != e.state.doc && (this.cursorPos > e.state.doc.content.size ? this.setCursor(null) : this.updateOverlay());
  }
  setCursor(e) {
    e != this.cursorPos && (this.cursorPos = e, e == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
  }
  updateOverlay() {
    let e = this.editorView.state.doc.resolve(this.cursorPos), t = !e.parent.inlineContent, r;
    if (t) {
      let l = e.nodeBefore, a = e.nodeAfter;
      if (l || a) {
        let c = this.editorView.nodeDOM(this.cursorPos - (l ? l.nodeSize : 0));
        if (c) {
          let d = c.getBoundingClientRect(), u = l ? d.bottom : d.top;
          l && a && (u = (u + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2), r = { left: d.left, right: d.right, top: u - this.width / 2, bottom: u + this.width / 2 };
        }
      }
    }
    if (!r) {
      let l = this.editorView.coordsAtPos(this.cursorPos);
      r = { left: l.left - this.width / 2, right: l.left + this.width / 2, top: l.top, bottom: l.bottom };
    }
    let i = this.editorView.dom.offsetParent;
    this.element || (this.element = i.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;", this.color && (this.element.style.backgroundColor = this.color)), this.element.classList.toggle("prosemirror-dropcursor-block", t), this.element.classList.toggle("prosemirror-dropcursor-inline", !t);
    let o, s;
    if (!i || i == document.body && getComputedStyle(i).position == "static")
      o = -pageXOffset, s = -pageYOffset;
    else {
      let l = i.getBoundingClientRect();
      o = l.left - i.scrollLeft, s = l.top - i.scrollTop;
    }
    this.element.style.left = r.left - o + "px", this.element.style.top = r.top - s + "px", this.element.style.width = r.right - r.left + "px", this.element.style.height = r.bottom - r.top + "px";
  }
  scheduleRemoval(e) {
    clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), e);
  }
  dragover(e) {
    if (!this.editorView.editable)
      return;
    let t = this.editorView.posAtCoords({ left: e.clientX, top: e.clientY }), r = t && t.inside >= 0 && this.editorView.state.doc.nodeAt(t.inside), i = r && r.type.spec.disableDropCursor, o = typeof i == "function" ? i(this.editorView, t, e) : i;
    if (t && !o) {
      let s = t.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice) {
        let l = Df(this.editorView.state.doc, s, this.editorView.dragging.slice);
        l != null && (s = l);
      }
      this.setCursor(s), this.scheduleRemoval(5e3);
    }
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(e) {
    (e.target == this.editorView.dom || !this.editorView.dom.contains(e.relatedTarget)) && this.setCursor(null);
  }
}
const uC = te.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      cC(this.options)
    ];
  }
}), fC = te.create({
  name: "focus",
  addOptions() {
    return {
      className: "has-focus",
      mode: "all"
    };
  },
  addProseMirrorPlugins() {
    return [
      new ne({
        key: new de("focus"),
        props: {
          decorations: ({ doc: n, selection: e }) => {
            const { isEditable: t, isFocused: r } = this.editor, { anchor: i } = e, o = [];
            if (!t || !r)
              return ee.create(n, []);
            let s = 0;
            this.options.mode === "deepest" && n.descendants((a, c) => {
              if (a.isText)
                return;
              if (!(i >= c && i <= c + a.nodeSize - 1))
                return !1;
              s += 1;
            });
            let l = 0;
            return n.descendants((a, c) => {
              if (a.isText || !(i >= c && i <= c + a.nodeSize - 1))
                return !1;
              if (l += 1, this.options.mode === "deepest" && s - l > 0 || this.options.mode === "shallowest" && l > 1)
                return this.options.mode === "deepest";
              o.push(Te.node(c, c + a.nodeSize, {
                class: this.options.className
              }));
            }), ee.create(n, o);
          }
        }
      })
    ];
  }
});
class ae extends B {
  /**
  Create a gap cursor.
  */
  constructor(e) {
    super(e, e);
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    return ae.valid(r) ? new ae(r) : B.near(r);
  }
  content() {
    return M.empty;
  }
  eq(e) {
    return e instanceof ae && e.head == this.head;
  }
  toJSON() {
    return { type: "gapcursor", pos: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    return new ae(e.resolve(t.pos));
  }
  /**
  @internal
  */
  getBookmark() {
    return new tc(this.anchor);
  }
  /**
  @internal
  */
  static valid(e) {
    let t = e.parent;
    if (t.isTextblock || !pC(e) || !hC(e))
      return !1;
    let r = t.type.spec.allowGapCursor;
    if (r != null)
      return r;
    let i = t.contentMatchAt(e.index()).defaultType;
    return i && i.isTextblock;
  }
  /**
  @internal
  */
  static findGapCursorFrom(e, t, r = !1) {
    e: for (; ; ) {
      if (!r && ae.valid(e))
        return e;
      let i = e.pos, o = null;
      for (let s = e.depth; ; s--) {
        let l = e.node(s);
        if (t > 0 ? e.indexAfter(s) < l.childCount : e.index(s) > 0) {
          o = l.child(t > 0 ? e.indexAfter(s) : e.index(s) - 1);
          break;
        } else if (s == 0)
          return null;
        i += t;
        let a = e.doc.resolve(i);
        if (ae.valid(a))
          return a;
      }
      for (; ; ) {
        let s = t > 0 ? o.firstChild : o.lastChild;
        if (!s) {
          if (o.isAtom && !o.isText && !P.isSelectable(o)) {
            e = e.doc.resolve(i + o.nodeSize * t), r = !1;
            continue e;
          }
          break;
        }
        o = s, i += t;
        let l = e.doc.resolve(i);
        if (ae.valid(l))
          return l;
      }
      return null;
    }
  }
}
ae.prototype.visible = !1;
ae.findFrom = ae.findGapCursorFrom;
B.jsonID("gapcursor", ae);
class tc {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new tc(e.map(this.pos));
  }
  resolve(e) {
    let t = e.resolve(this.pos);
    return ae.valid(t) ? new ae(t) : B.near(t);
  }
}
function pC(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.index(e), r = n.node(e);
    if (t == 0) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(t - 1); ; i = i.lastChild) {
      if (i.childCount == 0 && !i.inlineContent || i.isAtom || i.type.spec.isolating)
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function hC(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.indexAfter(e), r = n.node(e);
    if (t == r.childCount) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(t); ; i = i.firstChild) {
      if (i.childCount == 0 && !i.inlineContent || i.isAtom || i.type.spec.isolating)
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function mC() {
  return new ne({
    props: {
      decorations: vC,
      createSelectionBetween(n, e, t) {
        return e.pos == t.pos && ae.valid(t) ? new ae(t) : null;
      },
      handleClick: yC,
      handleKeyDown: gC,
      handleDOMEvents: { beforeinput: bC }
    }
  });
}
const gC = Oa({
  ArrowLeft: Yi("horiz", -1),
  ArrowRight: Yi("horiz", 1),
  ArrowUp: Yi("vert", -1),
  ArrowDown: Yi("vert", 1)
});
function Yi(n, e) {
  const t = n == "vert" ? e > 0 ? "down" : "up" : e > 0 ? "right" : "left";
  return function(r, i, o) {
    let s = r.selection, l = e > 0 ? s.$to : s.$from, a = s.empty;
    if (s instanceof L) {
      if (!o.endOfTextblock(t) || l.depth == 0)
        return !1;
      a = !1, l = r.doc.resolve(e > 0 ? l.after() : l.before());
    }
    let c = ae.findGapCursorFrom(l, e, a);
    return c ? (i && i(r.tr.setSelection(new ae(c))), !0) : !1;
  };
}
function yC(n, e, t) {
  if (!n || !n.editable)
    return !1;
  let r = n.state.doc.resolve(e);
  if (!ae.valid(r))
    return !1;
  let i = n.posAtCoords({ left: t.clientX, top: t.clientY });
  return i && i.inside > -1 && P.isSelectable(n.state.doc.nodeAt(i.inside)) ? !1 : (n.dispatch(n.state.tr.setSelection(new ae(r))), !0);
}
function bC(n, e) {
  if (e.inputType != "insertCompositionText" || !(n.state.selection instanceof ae))
    return !1;
  let { $from: t } = n.state.selection, r = t.parent.contentMatchAt(t.index()).findWrapping(n.state.schema.nodes.text);
  if (!r)
    return !1;
  let i = x.empty;
  for (let s = r.length - 1; s >= 0; s--)
    i = x.from(r[s].createAndFill(null, i));
  let o = n.state.tr.replace(t.pos, t.pos, new M(i, 0, 0));
  return o.setSelection(L.near(o.doc.resolve(t.pos + 1))), n.dispatch(o), !1;
}
function vC(n) {
  if (!(n.selection instanceof ae))
    return null;
  let e = document.createElement("div");
  return e.className = "ProseMirror-gapcursor", ee.create(n.doc, [Te.widget(n.selection.head, e, { key: "gapcursor" })]);
}
const wC = te.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [
      mC()
    ];
  },
  extendNodeSchema(n) {
    var e;
    const t = {
      name: n.name,
      options: n.options,
      storage: n.storage
    };
    return {
      allowGapCursor: (e = $(D(n, "allowGapCursor", t))) !== null && e !== void 0 ? e : null
    };
  }
}), SC = ue.create({
  name: "hardBreak",
  addOptions() {
    return {
      keepMarks: !0,
      HTMLAttributes: {}
    };
  },
  inline: !0,
  group: "inline",
  selectable: !1,
  linebreakReplacement: !0,
  parseHTML() {
    return [
      { tag: "br" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["br", ie(this.options.HTMLAttributes, n)];
  },
  renderText() {
    return `
`;
  },
  addCommands() {
    return {
      setHardBreak: () => ({ commands: n, chain: e, state: t, editor: r }) => n.first([
        () => n.exitCode(),
        () => n.command(() => {
          const { selection: i, storedMarks: o } = t;
          if (i.$from.parent.type.spec.isolating)
            return !1;
          const { keepMarks: s } = this.options, { splittableMarks: l } = r.extensionManager, a = o || i.$to.parentOffset && i.$from.marks();
          return e().insertContent({ type: this.name }).command(({ tr: c, dispatch: d }) => {
            if (d && a && s) {
              const u = a.filter((f) => l.includes(f.type.name));
              c.ensureMarks(u);
            }
            return !0;
          }).run();
        })
      ])
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
}), xC = ue.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["li", ie(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), kC = ue.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      { tag: "p" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["p", ie(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands: n }) => n.setNode(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
}), CC = te.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something …",
      showOnlyWhenEditable: !0,
      showOnlyCurrent: !0,
      includeChildren: !1
    };
  },
  addProseMirrorPlugins() {
    return [
      new ne({
        key: new de("placeholder"),
        props: {
          decorations: ({ doc: n, selection: e }) => {
            const t = this.editor.isEditable || !this.options.showOnlyWhenEditable, { anchor: r } = e, i = [];
            if (!t)
              return null;
            const o = this.editor.isEmpty;
            return n.descendants((s, l) => {
              const a = r >= l && r <= l + s.nodeSize, c = !s.isLeaf && Cs(s);
              if ((a || !this.options.showOnlyCurrent) && c) {
                const d = [this.options.emptyNodeClass];
                o && d.push(this.options.emptyEditorClass);
                const u = Te.node(l, l + s.nodeSize, {
                  class: d.join(" "),
                  "data-placeholder": typeof this.options.placeholder == "function" ? this.options.placeholder({
                    editor: this.editor,
                    node: s,
                    pos: l,
                    hasAnchor: a
                  }) : this.options.placeholder
                });
                i.push(u);
              }
              return this.options.includeChildren;
            }), ee.create(n, i);
          }
        }
      })
    ];
  }
}), TC = ue.create({
  name: "text",
  group: "inline"
}), AC = (n) => {
  if (!n.children.length)
    return;
  const e = n.querySelectorAll("span");
  e && e.forEach((t) => {
    var r, i;
    const o = t.getAttribute("style"), s = (i = (r = t.parentElement) === null || r === void 0 ? void 0 : r.closest("span")) === null || i === void 0 ? void 0 : i.getAttribute("style");
    t.setAttribute("style", `${s};${o}`);
  });
}, MC = ot.create({
  name: "textStyle",
  priority: 101,
  addOptions() {
    return {
      HTMLAttributes: {},
      mergeNestedSpanStyles: !1
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (n) => n.hasAttribute("style") ? (this.options.mergeNestedSpanStyles && AC(n), {}) : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", ie(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ tr: n }) => {
        const { selection: e } = n;
        return n.doc.nodesBetween(e.from, e.to, (t, r) => {
          if (t.isTextblock)
            return !0;
          t.marks.filter((i) => i.type === this.type).some((i) => Object.values(i.attrs).some((o) => !!o)) || n.removeMark(r, r + t.nodeSize, this.type);
        }), !0;
      }
    };
  }
}), EC = {
  props: {
    icon: {
      type: String,
      default: void 0
    },
    tooltip: {
      type: String,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    color: {
      type: String,
      default: void 0
    },
    action: {
      type: Function,
      default: void 0
    },
    isActive: {
      type: Function,
      default: void 0
    }
  }
};
function OC(n, e, t, r, i, o) {
  const s = k("v-icon"), l = k("v-tooltip"), a = k("v-btn");
  return N(), H(a, {
    class: Mn(["rounded me-1 ms-0", {
      "v-btn--active": t.isActive && t.isActive()
    }]),
    density: "comfortable",
    size: "small",
    disabled: t.disabled,
    color: t.color,
    icon: "",
    onClick: t.action
  }, {
    default: E(() => [
      O(s, { icon: t.icon }, null, 8, ["icon"]),
      O(l, {
        eager: !1,
        activator: "parent",
        location: "top",
        text: t.tooltip
      }, null, 8, ["text"]),
      ki(n.$slots, "default")
    ]),
    _: 3
  }, 8, ["disabled", "color", "class", "onClick"]);
}
const J = /* @__PURE__ */ fe(EC, [["render", OC]]), { IMAGE_SIZE: wu, VIDEO_SIZE: Su, i18n: xu } = xt(), NC = (n) => {
  const e = ["float-left", "float-none", "float-right"], t = ["mdi-format-float-left", "mdi-format-float-none", "mdi-format-float-right"], r = ["left", "inline", "right"];
  return e.map((i, o) => ({
    type: i,
    component: J,
    componentProps: {
      tooltip: `editor.image.${i.replace("-", ".")}.tooltip`,
      icon: t[o],
      action: () => n.chain().focus().updateImage({ display: r[o] }).run(),
      isActive: () => n.isActive("image", { display: r[o] })
    }
  }));
}, DC = (n) => {
  const e = ["size-small", "size-medium", "size-large"], t = ["mdi-size-s", "mdi-size-m", "mdi-size-l"];
  return e.map((r, i) => ({
    type: `image-${r}`,
    component: J,
    componentProps: {
      tooltip: `editor.${r.replace("-", ".")}.tooltip`,
      icon: t[i],
      action: () => n.chain().focus().updateImage({ width: wu[r], height: null }).run(),
      isActive: () => n.isActive("image", { width: wu[r] })
    }
  }));
}, _C = (n) => {
  const e = ["size-small", "size-medium", "size-large"], t = ["mdi-size-s", "mdi-size-m", "mdi-size-l"];
  return e.map((r, i) => ({
    type: `video-${r}`,
    component: J,
    componentProps: {
      tooltip: `editor.${r.replace("-", ".")}.tooltip`,
      icon: t[i],
      action: () => n.chain().focus().updateVideo({ width: Su[r] }).run(),
      isActive: () => n.isActive("video", { width: Su[r] })
    }
  }));
}, RC = (n) => [
  ...NC(n),
  ...DC(n),
  ..._C(n),
  {
    type: "image-aspect-ratio",
    component: J,
    componentProps: {
      tooltip: "editor.image.dialog.form.aspectRatio",
      icon: "mdi-aspect-ratio",
      action: () => {
        const e = n.isActive("image", { lockAspectRatio: !0 });
        n.chain().focus().updateImage({
          lockAspectRatio: !e,
          height: e ? void 0 : null
        }).run();
      },
      isActive: () => n.isActive("image", { lockAspectRatio: !0 })
    }
  },
  {
    type: "unlink",
    component: J,
    componentProps: {
      tooltip: "editor.link.unlink.tooltip",
      icon: "mdi-link-variant-off",
      action: () => {
        const { href: e } = n.getAttributes("link");
        n.chain().extendMarkRange("link", { href: e }).unsetLink().focus().run();
      }
    }
  },
  {
    type: "link-open",
    component: J,
    componentProps: {
      tooltip: "editor.link.open",
      icon: "mdi-open-in-new",
      action: () => {
        const { href: e } = n.getAttributes("link");
        po(e) && e && window.open(e, "_blank");
      }
    }
  },
  {
    type: "remove",
    component: J,
    componentProps: {
      tooltip: "editor.remove",
      icon: "mdi-delete",
      action: () => {
        const { state: e, dispatch: t } = n.view;
        gs(e, t);
      }
    }
  }
], IC = (n, e, { editor: t, extension: r }) => {
  const { extensions: i = [] } = t.extensionManager, o = {};
  for (const s of Object.keys(n)) {
    const l = n[s];
    if (!l) continue;
    const a = [];
    for (const u of l) {
      if (u === "divider") {
        const h = a[a.length - 1];
        if ((h == null ? void 0 : h.type) === "divider") continue;
        a.push({
          type: "divider",
          component: void 0,
          componentProps: {}
        });
        continue;
      }
      const f = e.find((h) => h.type === u);
      if (f) {
        a.push({
          ...f,
          componentProps: {
            ...f.componentProps,
            tooltip: f.componentProps.tooltip ? xu.global.t(f.componentProps.tooltip) : void 0
          },
          componentSlots: f.componentSlots
        });
        continue;
      }
      const p = i.find((h) => h.name === u);
      if (p) {
        const { button: h } = p.options, m = h({ editor: t, extension: p, t: xu.global.t });
        a.push({
          type: u,
          component: m.component,
          componentProps: m.componentProps,
          componentSlots: m.componentSlots
        });
        continue;
      }
    }
    const c = a[a.length - 1], d = a[0];
    (c == null ? void 0 : c.type) === "divider" && a.pop(), (d == null ? void 0 : d.type) === "divider" && a.shift(), o[s] = a;
  }
  return o;
}, { NODE_TYPE_MENU: PC } = xt();
te.create({
  name: "base-kit",
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      bubble: {
        list: PC,
        defaultBubbleList: RC,
        button: ({ editor: e, extension: t, t: r }) => {
          var l;
          const { list: i = {}, defaultBubbleList: o } = ((l = t.options) == null ? void 0 : l.bubble) ?? {}, s = (o == null ? void 0 : o(e)) ?? [];
          return IC(i, s, { editor: e, extension: t });
        }
      }
    };
  },
  addExtensions() {
    const n = [];
    return this.options.placeholder !== !1 && n.push(
      CC.configure({
        placeholder: "",
        ...this.options.placeholder
      })
    ), this.options.focus !== !1 && n.push(
      fC.configure({
        className: "focus",
        ...this.options.focus
      })
    ), this.options.document !== !1 && n.push(aC.configure()), this.options.text !== !1 && n.push(TC.configure()), this.options.gapcursor !== !1 && n.push(wC.configure()), this.options.dropcursor !== !1 && n.push(uC.configure(this.options.dropcursor)), this.options.characterCount !== !1 && n.push(lC.configure(this.options.characterCount)), this.options.paragraph !== !1 && n.push(kC.configure(this.options.paragraph)), this.options.hardBreak !== !1 && n.push(SC.configure(this.options.hardBreak)), this.options.listItem !== !1 && n.push(xC.configure(this.options.listItem)), this.options.textStyle !== !1 && n.push(MC.configure(this.options.textStyle)), n;
  }
});
const LC = /^\s*>\s$/, BC = ue.create({
  name: "blockquote",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: !0,
  parseHTML() {
    return [
      { tag: "blockquote" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["blockquote", ie(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands: n }) => n.wrapIn(this.name),
      toggleBlockquote: () => ({ commands: n }) => n.toggleWrap(this.name),
      unsetBlockquote: () => ({ commands: n }) => n.lift(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
    };
  },
  addInputRules() {
    return [
      fi({
        find: LC,
        type: this.type
      })
    ];
  }
});
BC.extend({
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      HTMLAttributes: {
        class: "blockquote"
      },
      button: ({ editor: e, t }) => ({
        component: J,
        componentProps: {
          action: () => e.chain().focus().toggleBlockquote().run(),
          isActive: () => e.isActive("blockquote") || !1,
          disabled: !e.can().toggleBlockquote(),
          icon: "mdi-format-quote-open",
          tooltip: t("editor.blockquote.tooltip")
        }
      })
    };
  }
});
const zC = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, FC = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, HC = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, VC = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, $C = ot.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (n) => n.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight=400",
        clearMark: (n) => n.type.name === this.name
      },
      {
        style: "font-weight",
        getAttrs: (n) => /^(bold(er)?|[5-9]\d{2,})$/.test(n) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["strong", ie(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setBold: () => ({ commands: n }) => n.setMark(this.name),
      toggleBold: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetBold: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      yr({
        find: zC,
        type: this.type
      }),
      yr({
        find: HC,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      zn({
        find: FC,
        type: this.type
      }),
      zn({
        find: VC,
        type: this.type
      })
    ];
  }
});
$C.extend({
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      button: ({ editor: e, t }) => ({
        component: J,
        componentProps: {
          action: () => e.chain().focus().toggleBold().run(),
          isActive: () => e.isActive("bold") || !1,
          disabled: !e.can().toggleBold(),
          icon: "mdi-format-bold",
          tooltip: t("editor.bold.tooltip")
        }
      })
    };
  }
});
const jC = "listItem", ku = "textStyle", Cu = /^\s*([-+*])\s$/, WC = ue.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      { tag: "ul" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["ul", ie(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(jC, this.editor.getAttributes(ku)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    let n = fi({
      find: Cu,
      type: this.type
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = fi({
      find: Cu,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: () => this.editor.getAttributes(ku),
      editor: this.editor
    })), [
      n
    ];
  }
});
WC.extend({
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      button: ({ editor: e, t }) => ({
        component: J,
        componentProps: {
          action: () => e.chain().focus().toggleBulletList().run(),
          isActive: () => e.isActive("bulletList") || !1,
          disabled: !e.can().toggleBulletList(),
          icon: "mdi-format-list-bulleted",
          tooltip: t("editor.bulletlist.tooltip")
        }
      })
    };
  }
});
ue.create({
  name: "clear",
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      button: ({ editor: e, t }) => ({
        component: J,
        componentProps: {
          action: () => e.chain().focus().clearNodes().unsetAllMarks().run(),
          disabled: !e.can().chain().focus().clearNodes().unsetAllMarks().run(),
          icon: "mdi-format-clear",
          tooltip: t("editor.clear.tooltip")
        }
      })
    };
  }
});
const UC = /^```([a-z]+)?[\s\n]$/, KC = /^~~~([a-z]+)?[\s\n]$/, qC = ue.create({
  name: "codeBlock",
  addOptions() {
    return {
      languageClassPrefix: "language-",
      exitOnTripleEnter: !0,
      exitOnArrowDown: !0,
      defaultLanguage: null,
      HTMLAttributes: {}
    };
  },
  content: "text*",
  marks: "",
  group: "block",
  code: !0,
  defining: !0,
  addAttributes() {
    return {
      language: {
        default: this.options.defaultLanguage,
        parseHTML: (n) => {
          var e;
          const { languageClassPrefix: t } = this.options, o = [...((e = n.firstElementChild) === null || e === void 0 ? void 0 : e.classList) || []].filter((s) => s.startsWith(t)).map((s) => s.replace(t, ""))[0];
          return o || null;
        },
        rendered: !1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full"
      }
    ];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [
      "pre",
      ie(this.options.HTMLAttributes, e),
      [
        "code",
        {
          class: n.attrs.language ? this.options.languageClassPrefix + n.attrs.language : null
        },
        0
      ]
    ];
  },
  addCommands() {
    return {
      setCodeBlock: (n) => ({ commands: e }) => e.setNode(this.name, n),
      toggleCodeBlock: (n) => ({ commands: e }) => e.toggleNode(this.name, "paragraph", n)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
      // remove code block when at start of document or code block is empty
      Backspace: () => {
        const { empty: n, $anchor: e } = this.editor.state.selection, t = e.pos === 1;
        return !n || e.parent.type.name !== this.name ? !1 : t || !e.parent.textContent.length ? this.editor.commands.clearNodes() : !1;
      },
      // exit node on triple enter
      Enter: ({ editor: n }) => {
        if (!this.options.exitOnTripleEnter)
          return !1;
        const { state: e } = n, { selection: t } = e, { $from: r, empty: i } = t;
        if (!i || r.parent.type !== this.type)
          return !1;
        const o = r.parentOffset === r.parent.nodeSize - 2, s = r.parent.textContent.endsWith(`

`);
        return !o || !s ? !1 : n.chain().command(({ tr: l }) => (l.delete(r.pos - 2, r.pos), !0)).exitCode().run();
      },
      // exit node on arrow down
      ArrowDown: ({ editor: n }) => {
        if (!this.options.exitOnArrowDown)
          return !1;
        const { state: e } = n, { selection: t, doc: r } = e, { $from: i, empty: o } = t;
        if (!o || i.parent.type !== this.type || !(i.parentOffset === i.parent.nodeSize - 2))
          return !1;
        const l = i.after();
        return l === void 0 ? !1 : r.nodeAt(l) ? n.commands.command(({ tr: c }) => (c.setSelection(B.near(r.resolve(l))), !0)) : n.commands.exitCode();
      }
    };
  },
  addInputRules() {
    return [
      Ll({
        find: UC,
        type: this.type,
        getAttributes: (n) => ({
          language: n[1]
        })
      }),
      Ll({
        find: KC,
        type: this.type,
        getAttributes: (n) => ({
          language: n[1]
        })
      })
    ];
  },
  addProseMirrorPlugins() {
    return [
      // this plugin creates a code block for pasted content from VS Code
      // we can also detect the copied code language
      new ne({
        key: new de("codeBlockVSCodeHandler"),
        props: {
          handlePaste: (n, e) => {
            if (!e.clipboardData || this.editor.isActive(this.type.name))
              return !1;
            const t = e.clipboardData.getData("text/plain"), r = e.clipboardData.getData("vscode-editor-data"), i = r ? JSON.parse(r) : void 0, o = i == null ? void 0 : i.mode;
            if (!t || !o)
              return !1;
            const { tr: s, schema: l } = n.state, a = l.text(t.replace(/\r\n?/g, `
`));
            return s.replaceSelectionWith(this.type.create({ language: o }, a)), s.selection.$from.parent.type !== this.type && s.setSelection(L.near(s.doc.resolve(Math.max(0, s.selection.from - 2)))), s.setMeta("paste", !0), n.dispatch(s), !0;
          }
        }
      })
    ];
  }
});
qC.extend({
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      button: ({ editor: e, t }) => ({
        component: J,
        componentProps: {
          action: () => e.chain().focus().toggleCodeBlock().run(),
          isActive: () => e.isActive("codeBlock") || !1,
          disabled: !e.can().toggleCodeBlock(),
          icon: "mdi-code-braces",
          tooltip: t("editor.codeblock.tooltip")
        }
      })
    };
  }
});
const GC = te.create({
  name: "color",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            parseHTML: (n) => {
              var e;
              return (e = n.style.color) === null || e === void 0 ? void 0 : e.replace(/['"]+/g, "");
            },
            renderHTML: (n) => n.color ? {
              style: `color: ${n.color}`
            } : {}
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setColor: (n) => ({ chain: e }) => e().setMark("textStyle", { color: n }).run(),
      unsetColor: () => ({ chain: n }) => n().setMark("textStyle", { color: null }).removeEmptyTextStyle().run()
    };
  }
}), { state: JC } = Oi(), YC = {
  props: {
    editor: { type: Object, required: !0 },
    modelValue: {
      type: String,
      default: ""
    },
    action: {
      type: String,
      default: ""
    },
    nudgeLeft: {
      type: [String, Number],
      default: 0
    },
    nudgeTop: {
      type: [String, Number],
      default: 0
    },
    more: {
      type: Boolean,
      default: !0
    }
  },
  data() {
    return {
      inputValue: "",
      menu: !1
    };
  },
  watch: {
    menu(n) {
      this.inputValue = this.modelValue;
    }
  },
  methods: {
    setColor(n) {
      this.$emit("update:modelValue", n), this.$emit("change", n), this.inputValue = n, this.menu = !1;
    }
  },
  computed: {
    getColorList() {
      return JC.constants.COLORS_LIST;
    }
  }
};
function XC(n, e, t, r, i, o) {
  const s = k("v-icon"), l = k("v-btn"), a = k("v-text-field"), c = k("v-sheet"), d = k("v-list"), u = k("v-menu");
  return N(), H(u, {
    modelValue: i.menu,
    "onUpdate:modelValue": e[2] || (e[2] = (f) => i.menu = f),
    "nudge-left": t.nudgeLeft || 255,
    "nudge-top": t.nudgeTop || 42,
    "close-on-content-click": !1,
    transition: "scale-transition",
    origin: t.nudgeLeft ? "top left" : "top right",
    activator: "parent"
  }, {
    default: E(() => [
      O(d, null, {
        default: E(() => [
          O(c, {
            class: "d-flex flex-wrap justify-between ma-1",
            fluid: "",
            "max-width": 230
          }, {
            default: E(() => [
              (N(!0), re(be, null, We(o.getColorList, (f) => (N(), re(be, { key: f }, [
                f == "" ? (N(), H(l, {
                  key: 0,
                  flat: "",
                  icon: "",
                  density: "compact",
                  onClick: (p) => o.setColor(f)
                }, {
                  default: E(() => [
                    O(s, {
                      icon: "mdi-circle-off-outline",
                      color: f
                    }, null, 8, ["color"])
                  ]),
                  _: 2
                }, 1032, ["onClick"])) : (N(), H(l, {
                  key: 1,
                  flat: "",
                  icon: "",
                  density: "compact",
                  onClick: (p) => o.setColor(f)
                }, {
                  default: E(() => [
                    O(s, {
                      icon: "mdi-circle",
                      color: f
                    }, null, 8, ["color"])
                  ]),
                  _: 2
                }, 1032, ["onClick"]))
              ], 64))), 128)),
              O(a, {
                modelValue: i.inputValue,
                "onUpdate:modelValue": e[0] || (e[0] = (f) => i.inputValue = f),
                class: "mt-2 mx-1",
                "append-inner-icon": "mdi-check",
                density: "compact",
                label: "HEX",
                variant: "outlined",
                flat: "",
                "hide-details": "",
                "single-line": "",
                clearable: "",
                "onClick:appendInner": e[1] || (e[1] = (f) => o.setColor(i.inputValue))
              }, pa({ _: 2 }, [
                i.inputValue ? {
                  name: "prepend-inner",
                  fn: E(() => [
                    O(s, {
                      class: "opacity-100",
                      icon: "mdi-circle",
                      color: i.inputValue
                    }, null, 8, ["color"])
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["modelValue"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["modelValue", "nudge-left", "nudge-top", "origin"]);
}
const Bh = /* @__PURE__ */ fe(YC, [["render", XC]]), { state: ZC } = Oi(), QC = {
  components: {
    ActionButton: J,
    ColorPicker: Bh
  },
  props: {
    editor: {
      type: Object,
      required: !0
    },
    icon: {
      type: String,
      default: void 0
    },
    tooltip: {
      type: String,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    action: {
      type: Function,
      default: void 0
    },
    isActive: {
      type: Function,
      default: void 0
    }
  },
  data() {
    return {
      state: ZC
    };
  },
  methods: {
    onChange(n) {
      this.action && this.action(n);
    }
  },
  watch: {
    editor: {
      immediate: !0,
      handler() {
        const { color: n } = this.editor.getAttributes("textStyle");
        this.state.color = n;
      }
    }
  }
};
function eT(n, e, t, r, i, o) {
  const s = k("color-picker"), l = k("action-button");
  return N(), H(l, {
    icon: t.icon,
    tooltip: t.tooltip,
    disabled: t.disabled,
    color: i.state.color,
    "is-active": t.isActive
  }, {
    default: E(() => [
      O(s, {
        modelValue: i.state.color,
        "onUpdate:modelValue": e[0] || (e[0] = (a) => i.state.color = a),
        editor: t.editor,
        action: "color",
        activator: "parent",
        "nudge-top": -4,
        "nudge-left": 8,
        onChange: o.onChange
      }, null, 8, ["modelValue", "editor", "onChange"])
    ]),
    _: 1
  }, 8, ["icon", "tooltip", "disabled", "color", "is-active"]);
}
const tT = /* @__PURE__ */ fe(QC, [["render", eT]]);
GC.extend({
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      button: ({ editor: e, t }) => ({
        component: tT,
        componentProps: {
          editor: e,
          action: (r) => {
            typeof r == "string" && e.chain().focus().setColor(r).run();
          },
          isActive: () => {
            const { color: r } = e.getAttributes("textStyle");
            return r && e.isActive({ color: r }) || !1;
          },
          disabled: !e.can().setColor(""),
          icon: "mdi-format-color-text",
          tooltip: t("editor.color.tooltip")
        }
      })
    };
  }
});
const nT = te.create({
  name: "fontFamily",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontFamily: {
            default: null,
            parseHTML: (n) => n.style.fontFamily,
            renderHTML: (n) => n.fontFamily ? {
              style: `font-family: ${n.fontFamily}`
            } : {}
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setFontFamily: (n) => ({ chain: e }) => e().setMark("textStyle", { fontFamily: n }).run(),
      unsetFontFamily: () => ({ chain: n }) => n().setMark("textStyle", { fontFamily: null }).removeEmptyTextStyle().run()
    };
  }
}), rT = {
  components: {
    ActionButton: J
  },
  props: {
    editor: Object,
    disabled: {
      type: Boolean,
      default: !1
    },
    color: String,
    maxHeight: [String, Number],
    icon: String,
    tooltip: {
      type: String,
      default: ""
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      menu: !1
    };
  },
  computed: {
    active() {
      const n = this.items.find((e) => e.isActive());
      return n && !n.default ? {
        ...n,
        icon: n.icon ? n.icon : this.icon
      } : {
        title: this.tooltip,
        selectedFont: n ? n.title : null,
        icon: this.icon,
        isActive: () => !1
      };
    }
  }
};
function iT(n, e, t, r, i, o) {
  const s = k("v-icon"), l = k("v-list-item-title"), a = k("v-list-item"), c = k("v-divider"), d = k("v-list"), u = k("v-menu"), f = k("action-button");
  return N(), H(f, {
    style: { "min-width": "120px" },
    tooltip: o.active.title,
    disabled: t.disabled,
    color: t.color,
    class: "text-none",
    "is-active": o.active.isActive
  }, {
    default: E(() => [
      dn("div", null, De(o.active.title), 1),
      O(u, {
        modelValue: i.menu,
        "onUpdate:modelValue": e[0] || (e[0] = (p) => i.menu = p),
        activator: "parent"
      }, {
        default: E(() => [
          O(d, {
            density: "compact",
            "max-height": t.maxHeight
          }, {
            default: E(() => [
              (N(!0), re(be, null, We(t.items, (p, h) => (N(), re(be, { key: h }, [
                O(a, {
                  active: p.isActive(),
                  disabled: p.disabled,
                  onClick: p.action
                }, {
                  prepend: E(() => [
                    p.icon ? (N(), H(s, {
                      key: 0,
                      icon: p.icon
                    }, null, 8, ["icon"])) : Fe("", !0)
                  ]),
                  default: E(() => [
                    O(l, {
                      style: En(p.style)
                    }, {
                      default: E(() => [
                        rt(De(p.title), 1)
                      ]),
                      _: 2
                    }, 1032, ["style"])
                  ]),
                  _: 2
                }, 1032, ["active", "disabled", "onClick"]),
                p.divider ? (N(), H(c, { key: 0 })) : Fe("", !0)
              ], 64))), 128))
            ]),
            _: 1
          }, 8, ["max-height"])
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  }, 8, ["tooltip", "disabled", "color", "is-active"]);
}
const oT = /* @__PURE__ */ fe(rT, [["render", iT]]), { DEFAULT_FONT_FAMILY_LIST: sT } = xt();
nT.extend({
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      fontFamilies: sT,
      button: ({ editor: e, extension: t, t: r }) => {
        var l;
        const o = (((l = t.options) == null ? void 0 : l.fontFamilies) || []).map((a) => ({
          title: a.title == "editor.fontFamily.fonts.default" ? r(a.title) : r("editor.fontFamily.fonts." + a.title),
          isActive: () => {
            const { fontFamily: c } = e.getAttributes("textStyle");
            return a.value === state.constants.DEFAULT_FONT_FAMILY_VALUE && c === void 0 ? !0 : e.isActive({ fontFamily: a.value }) || !1;
          },
          action: () => {
            if (a.value === state.constants.DEFAULT_FONT_FAMILY_VALUE) {
              e.chain().focus().unsetFontFamily().run();
              return;
            }
            e.chain().focus().setFontFamily(a.value).run();
          },
          disabled: !e.can().setFontFamily(a.value),
          style: { fontFamily: a.value },
          divider: a.divider ?? !1,
          default: a.default ?? !1
        })), s = o.filter((a) => a.disabled).length === o.length;
        return {
          component: oT,
          componentProps: {
            icon: "mdi-format-font",
            tooltip: r("editor.fontFamily.tooltip"),
            disabled: s,
            items: o,
            maxHeight: 280
          }
        };
      }
    };
  }
});
const lT = {
  components: {
    ActionButton: J
  },
  props: {
    editor: Object,
    disabled: {
      type: Boolean,
      default: !1
    },
    color: String,
    maxHeight: [String, Number],
    icon: String,
    tooltip: {
      type: String,
      default: ""
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      menu: !1
    };
  },
  computed: {
    active() {
      const n = this.items.find((e) => e.isActive());
      return n && !n.default ? {
        ...n,
        icon: n.icon ? n.icon : this.icon
      } : {
        title: this.tooltip,
        icon: this.icon,
        isActive: () => !1
      };
    }
  }
};
function aT(n, e, t, r, i, o) {
  const s = k("v-icon"), l = k("v-list-item-title"), a = k("v-list-item"), c = k("v-divider"), d = k("v-list"), u = k("v-menu"), f = k("action-button");
  return N(), H(f, {
    icon: o.active.icon,
    tooltip: o.active.title,
    disabled: t.disabled,
    color: t.color,
    "is-active": o.active.isActive
  }, {
    default: E(() => [
      O(u, {
        modelValue: i.menu,
        "onUpdate:modelValue": e[0] || (e[0] = (p) => i.menu = p),
        activator: "parent"
      }, {
        default: E(() => [
          O(d, {
            density: "compact",
            "max-height": t.maxHeight
          }, {
            default: E(() => [
              (N(!0), re(be, null, We(t.items, (p, h) => (N(), re(be, { key: h }, [
                O(a, {
                  active: p.isActive(),
                  disabled: p.disabled,
                  onClick: p.action
                }, {
                  prepend: E(() => [
                    p.icon ? (N(), H(s, {
                      key: 0,
                      icon: p.icon
                    }, null, 8, ["icon"])) : Fe("", !0)
                  ]),
                  default: E(() => [
                    O(l, {
                      style: En(p.style)
                    }, {
                      default: E(() => [
                        rt(De(p.title), 1)
                      ]),
                      _: 2
                    }, 1032, ["style"])
                  ]),
                  _: 2
                }, 1032, ["active", "disabled", "onClick"]),
                p.divider ? (N(), H(c, { key: 0 })) : Fe("", !0)
              ], 64))), 128))
            ]),
            _: 1
          }, 8, ["max-height"])
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  }, 8, ["icon", "tooltip", "disabled", "color", "is-active"]);
}
const nc = /* @__PURE__ */ fe(lT, [["render", aT]]), { DEFAULT_FONT_SIZE_LIST: cT, DEFAULT_FONT_SIZE_VALUE: tr } = xt();
te.create({
  name: "fontSize",
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      types: ["textStyle"],
      fontSizes: [...cT],
      button: ({ editor: e, extension: t, t: r }) => {
        var l;
        const i = ((l = t.options) == null ? void 0 : l.fontSizes) || [], o = [tr, ...i].map((a) => ({
          title: a === tr ? r("editor.default") : String(a),
          isActive: () => {
            const { fontSize: c } = e.getAttributes("textStyle");
            return a === tr && c === void 0 ? !0 : e.isActive({ fontSize: String(a) }) || !1;
          },
          action: () => {
            if (a === tr) {
              e.chain().focus().unsetFontSize().run();
              return;
            }
            e.chain().focus().setFontSize(String(a)).run();
          },
          disabled: !e.can().setFontSize(String(a)),
          divider: a === tr,
          default: a === tr
        })), s = o.filter((a) => a.disabled).length === o.length;
        return {
          component: nc,
          componentProps: {
            icon: "mdi-format-size",
            tooltip: r("editor.fontSize.tooltip"),
            disabled: s,
            items: o,
            maxHeight: 280
          }
        };
      }
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (n) => n.style.fontSize || "",
            renderHTML: (n) => n.fontSize ? {
              style: `font-size: ${Jr(n.fontSize)}`
            } : {}
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setFontSize: (n) => ({ chain: e }) => e().setMark("textStyle", { fontSize: n }).run(),
      unsetFontSize: () => ({ chain: n }) => n().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run()
    };
  }
});
const dT = ue.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: !0,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: !1
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((n) => ({
      tag: `h${n}`,
      attrs: { level: n }
    }));
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [`h${this.options.levels.includes(n.attrs.level) ? n.attrs.level : this.options.levels[0]}`, ie(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.setNode(this.name, n) : !1,
      toggleHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.toggleNode(this.name, "paragraph", n) : !1
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce((n, e) => ({
      ...n,
      [`Mod-Alt-${e}`]: () => this.editor.commands.toggleHeading({ level: e })
    }), {});
  },
  addInputRules() {
    return this.options.levels.map((n) => Ll({
      find: new RegExp(`^(#{${Math.min(...this.options.levels)},${n}})\\s$`),
      type: this.type,
      getAttributes: {
        level: n
      }
    }));
  }
});
dT.extend({
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      levels: [1, 2, 3, 4, 5, 6],
      button: ({ editor: e, extension: t, t: r }) => {
        var c;
        const { extensions: i = [] } = e.extensionManager ?? [], o = ((c = t.options) == null ? void 0 : c.levels) || [], s = i.find((d) => d.name === "base-kit"), l = o.map((d) => ({
          action: () => {
            e.can().toggleHeading({ level: d }) ? e.chain().focus().toggleHeading({ level: d }).run() : console.warn("Cannot toggle heading at level:", d);
          },
          isActive: () => e.isActive("heading", { level: d }) || !1,
          disabled: !e.can().toggleHeading({ level: d }),
          icon: `mdi-format-header-${d}`,
          title: r(`editor.heading.h${d}.tooltip`)
        }));
        s && s.options.paragraph !== !1 && l.unshift({
          action: () => e.chain().focus().setParagraph().run(),
          isActive: () => !1,
          // editor.isActive('paragraph') || false
          disabled: !e.can().setParagraph(),
          icon: "mdi-format-header-pound",
          title: r("editor.heading.tooltip"),
          divider: !0
        });
        const a = l.filter((d) => d.disabled).length === l.length;
        return {
          component: nc,
          componentProps: {
            icon: "mdi-format-header-pound",
            tooltip: r("editor.heading.tooltip"),
            disabled: a,
            items: l
          }
        };
      }
    };
  }
});
const uT = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))$/, fT = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))/g, pT = ot.create({
  name: "highlight",
  addOptions() {
    return {
      multicolor: !1,
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    return this.options.multicolor ? {
      color: {
        default: null,
        parseHTML: (n) => n.getAttribute("data-color") || n.style.backgroundColor,
        renderHTML: (n) => n.color ? {
          "data-color": n.color,
          style: `background-color: ${n.color}; color: inherit`
        } : {}
      }
    } : {};
  },
  parseHTML() {
    return [
      {
        tag: "mark"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["mark", ie(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setHighlight: (n) => ({ commands: e }) => e.setMark(this.name, n),
      toggleHighlight: (n) => ({ commands: e }) => e.toggleMark(this.name, n),
      unsetHighlight: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-h": () => this.editor.commands.toggleHighlight()
    };
  },
  addInputRules() {
    return [
      yr({
        find: uT,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      zn({
        find: fT,
        type: this.type
      })
    ];
  }
}), hT = {
  components: {
    ActionButton: J,
    ColorPicker: Bh
  },
  props: {
    editor: { type: Object, required: !0 },
    icon: { type: String, default: void 0 },
    tooltip: { type: String, default: void 0 },
    disabled: { type: Boolean, default: !1 },
    action: { type: Function, default: void 0 },
    isActive: { type: Function, default: void 0 }
  },
  data() {
    return {
      state: Oi().state
    };
  },
  methods: {
    onChange(n) {
      this.action && this.action(n);
    }
  },
  watch: {
    editor: {
      handler() {
        const { color: n } = this.editor.getAttributes("highlight");
        this.state.highlight = n;
      },
      deep: !0,
      immediate: !0
    }
  }
};
function mT(n, e, t, r, i, o) {
  const s = k("color-picker"), l = k("action-button");
  return N(), H(l, {
    icon: t.icon,
    tooltip: t.tooltip,
    disabled: t.disabled,
    color: i.state.highlight,
    "is-active": t.isActive
  }, {
    default: E(() => [
      O(s, {
        modelValue: i.state.highlight,
        "onUpdate:modelValue": e[0] || (e[0] = (a) => i.state.highlight = a),
        editor: t.editor,
        action: "highlight",
        activator: "parent",
        "nudge-top": -4,
        "nudge-left": 8,
        onChange: o.onChange
      }, null, 8, ["modelValue", "editor", "onChange"])
    ]),
    _: 1
  }, 8, ["icon", "tooltip", "disabled", "color", "is-active"]);
}
const gT = /* @__PURE__ */ fe(hT, [["render", mT]]);
pT.extend({
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      multicolor: !0,
      button: ({ editor: e, t }) => ({
        component: gT,
        componentProps: {
          editor: e,
          action: (r) => {
            typeof r == "string" ? (e.chain().focus().setHighlight({ color: r }).run(), r == "" && e.chain().focus().unsetHighlight().run()) : e.chain().focus().unsetHighlight().run();
          },
          isActive: () => e.isActive("highlight") || !1,
          disabled: !e.can().setHighlight(),
          icon: "mdi-format-color-highlight",
          tooltip: t("editor.highlight.tooltip")
        }
      })
    };
  }
});
var Io = 200, ye = function() {
};
ye.prototype.append = function(e) {
  return e.length ? (e = ye.from(e), !this.length && e || e.length < Io && this.leafAppend(e) || this.length < Io && e.leafPrepend(this) || this.appendInner(e)) : this;
};
ye.prototype.prepend = function(e) {
  return e.length ? ye.from(e).append(this) : this;
};
ye.prototype.appendInner = function(e) {
  return new yT(this, e);
};
ye.prototype.slice = function(e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? ye.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
};
ye.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
ye.prototype.forEach = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length), t <= r ? this.forEachInner(e, t, r, 0) : this.forEachInvertedInner(e, t, r, 0);
};
ye.prototype.map = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length);
  var i = [];
  return this.forEach(function(o, s) {
    return i.push(e(o, s));
  }, t, r), i;
};
ye.from = function(e) {
  return e instanceof ye ? e : e && e.length ? new zh(e) : ye.empty;
};
var zh = /* @__PURE__ */ function(n) {
  function e(r) {
    n.call(this), this.values = r;
  }
  n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e;
  var t = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return e.prototype.flatten = function() {
    return this.values;
  }, e.prototype.sliceInner = function(i, o) {
    return i == 0 && o == this.length ? this : new e(this.values.slice(i, o));
  }, e.prototype.getInner = function(i) {
    return this.values[i];
  }, e.prototype.forEachInner = function(i, o, s, l) {
    for (var a = o; a < s; a++)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.forEachInvertedInner = function(i, o, s, l) {
    for (var a = o - 1; a >= s; a--)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.leafAppend = function(i) {
    if (this.length + i.length <= Io)
      return new e(this.values.concat(i.flatten()));
  }, e.prototype.leafPrepend = function(i) {
    if (this.length + i.length <= Io)
      return new e(i.flatten().concat(this.values));
  }, t.length.get = function() {
    return this.values.length;
  }, t.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, t), e;
}(ye);
ye.empty = new zh([]);
var yT = /* @__PURE__ */ function(n) {
  function e(t, r) {
    n.call(this), this.left = t, this.right = r, this.length = t.length + r.length, this.depth = Math.max(t.depth, r.depth) + 1;
  }
  return n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, e.prototype.getInner = function(r) {
    return r < this.left.length ? this.left.get(r) : this.right.get(r - this.left.length);
  }, e.prototype.forEachInner = function(r, i, o, s) {
    var l = this.left.length;
    if (i < l && this.left.forEachInner(r, i, Math.min(o, l), s) === !1 || o > l && this.right.forEachInner(r, Math.max(i - l, 0), Math.min(this.length, o) - l, s + l) === !1)
      return !1;
  }, e.prototype.forEachInvertedInner = function(r, i, o, s) {
    var l = this.left.length;
    if (i > l && this.right.forEachInvertedInner(r, i - l, Math.max(o, l) - l, s + l) === !1 || o < l && this.left.forEachInvertedInner(r, Math.min(i, l), o, s) === !1)
      return !1;
  }, e.prototype.sliceInner = function(r, i) {
    if (r == 0 && i == this.length)
      return this;
    var o = this.left.length;
    return i <= o ? this.left.slice(r, i) : r >= o ? this.right.slice(r - o, i - o) : this.left.slice(r, o).append(this.right.slice(0, i - o));
  }, e.prototype.leafAppend = function(r) {
    var i = this.right.leafAppend(r);
    if (i)
      return new e(this.left, i);
  }, e.prototype.leafPrepend = function(r) {
    var i = this.left.leafPrepend(r);
    if (i)
      return new e(i, this.right);
  }, e.prototype.appendInner = function(r) {
    return this.left.depth >= Math.max(this.right.depth, r.depth) + 1 ? new e(this.left, new e(this.right, r)) : new e(this, r);
  }, e;
}(ye);
const bT = 500;
class nt {
  constructor(e, t) {
    this.items = e, this.eventCount = t;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(e, t) {
    if (this.eventCount == 0)
      return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let i, o;
    t && (i = this.remapping(r, this.items.length), o = i.maps.length);
    let s = e.tr, l, a, c = [], d = [];
    return this.items.forEach((u, f) => {
      if (!u.step) {
        i || (i = this.remapping(r, f + 1), o = i.maps.length), o--, d.push(u);
        return;
      }
      if (i) {
        d.push(new dt(u.map));
        let p = u.step.map(i.slice(o)), h;
        p && s.maybeStep(p).doc && (h = s.mapping.maps[s.mapping.maps.length - 1], c.push(new dt(h, void 0, void 0, c.length + d.length))), o--, h && i.appendMap(h, o);
      } else
        s.maybeStep(u.step);
      if (u.selection)
        return l = i ? u.selection.map(i.slice(o)) : u.selection, a = new nt(this.items.slice(0, r).append(d.reverse().concat(c)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: a, transform: s, selection: l };
  }
  // Create a new branch with the given transform added.
  addTransform(e, t, r, i) {
    let o = [], s = this.eventCount, l = this.items, a = !i && l.length ? l.get(l.length - 1) : null;
    for (let d = 0; d < e.steps.length; d++) {
      let u = e.steps[d].invert(e.docs[d]), f = new dt(e.mapping.maps[d], u, t), p;
      (p = a && a.merge(f)) && (f = p, d ? o.pop() : l = l.slice(0, l.length - 1)), o.push(f), t && (s++, t = void 0), i || (a = f);
    }
    let c = s - r.depth;
    return c > wT && (l = vT(l, c), s -= c), new nt(l.append(o), s);
  }
  remapping(e, t) {
    let r = new cr();
    return this.items.forEach((i, o) => {
      let s = i.mirrorOffset != null && o - i.mirrorOffset >= e ? r.maps.length - i.mirrorOffset : void 0;
      r.appendMap(i.map, s);
    }, e, t), r;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new nt(this.items.append(e.map((t) => new dt(t))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(e, t) {
    if (!this.eventCount)
      return this;
    let r = [], i = Math.max(0, this.items.length - t), o = e.mapping, s = e.steps.length, l = this.eventCount;
    this.items.forEach((f) => {
      f.selection && l--;
    }, i);
    let a = t;
    this.items.forEach((f) => {
      let p = o.getMirror(--a);
      if (p == null)
        return;
      s = Math.min(s, p);
      let h = o.maps[p];
      if (f.step) {
        let m = e.steps[p].invert(e.docs[p]), g = f.selection && f.selection.map(o.slice(a + 1, p));
        g && l++, r.push(new dt(h, m, g));
      } else
        r.push(new dt(h));
    }, i);
    let c = [];
    for (let f = t; f < s; f++)
      c.push(new dt(o.maps[f]));
    let d = this.items.slice(0, i).append(c).append(r), u = new nt(d, l);
    return u.emptyItemCount() > bT && (u = u.compress(this.items.length - r.length)), u;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((t) => {
      t.step || e++;
    }), e;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(e = this.items.length) {
    let t = this.remapping(0, e), r = t.maps.length, i = [], o = 0;
    return this.items.forEach((s, l) => {
      if (l >= e)
        i.push(s), s.selection && o++;
      else if (s.step) {
        let a = s.step.map(t.slice(r)), c = a && a.getMap();
        if (r--, c && t.appendMap(c, r), a) {
          let d = s.selection && s.selection.map(t.slice(r));
          d && o++;
          let u = new dt(c.invert(), a, d), f, p = i.length - 1;
          (f = i.length && i[p].merge(u)) ? i[p] = f : i.push(u);
        }
      } else s.map && r--;
    }, this.items.length, 0), new nt(ye.from(i.reverse()), o);
  }
}
nt.empty = new nt(ye.empty, 0);
function vT(n, e) {
  let t;
  return n.forEach((r, i) => {
    if (r.selection && e-- == 0)
      return t = i, !1;
  }), n.slice(t);
}
class dt {
  constructor(e, t, r, i) {
    this.map = e, this.step = t, this.selection = r, this.mirrorOffset = i;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let t = e.step.merge(this.step);
      if (t)
        return new dt(t.getMap().invert(), t, this.selection);
    }
  }
}
class Yt {
  constructor(e, t, r, i, o) {
    this.done = e, this.undone = t, this.prevRanges = r, this.prevTime = i, this.prevComposition = o;
  }
}
const wT = 20;
function ST(n, e, t, r) {
  let i = t.getMeta(In), o;
  if (i)
    return i.historyState;
  t.getMeta(CT) && (n = new Yt(n.done, n.undone, null, 0, -1));
  let s = t.getMeta("appendedTransaction");
  if (t.steps.length == 0)
    return n;
  if (s && s.getMeta(In))
    return s.getMeta(In).redo ? new Yt(n.done.addTransform(t, void 0, r, ho(e)), n.undone, Tu(t.mapping.maps), n.prevTime, n.prevComposition) : new Yt(n.done, n.undone.addTransform(t, void 0, r, ho(e)), null, n.prevTime, n.prevComposition);
  if (t.getMeta("addToHistory") !== !1 && !(s && s.getMeta("addToHistory") === !1)) {
    let l = t.getMeta("composition"), a = n.prevTime == 0 || !s && n.prevComposition != l && (n.prevTime < (t.time || 0) - r.newGroupDelay || !xT(t, n.prevRanges)), c = s ? ll(n.prevRanges, t.mapping) : Tu(t.mapping.maps);
    return new Yt(n.done.addTransform(t, a ? e.selection.getBookmark() : void 0, r, ho(e)), nt.empty, c, t.time, l ?? n.prevComposition);
  } else return (o = t.getMeta("rebased")) ? new Yt(n.done.rebased(t, o), n.undone.rebased(t, o), ll(n.prevRanges, t.mapping), n.prevTime, n.prevComposition) : new Yt(n.done.addMaps(t.mapping.maps), n.undone.addMaps(t.mapping.maps), ll(n.prevRanges, t.mapping), n.prevTime, n.prevComposition);
}
function xT(n, e) {
  if (!e)
    return !1;
  if (!n.docChanged)
    return !0;
  let t = !1;
  return n.mapping.maps[0].forEach((r, i) => {
    for (let o = 0; o < e.length; o += 2)
      r <= e[o + 1] && i >= e[o] && (t = !0);
  }), t;
}
function Tu(n) {
  let e = [];
  for (let t = n.length - 1; t >= 0 && e.length == 0; t--)
    n[t].forEach((r, i, o, s) => e.push(o, s));
  return e;
}
function ll(n, e) {
  if (!n)
    return null;
  let t = [];
  for (let r = 0; r < n.length; r += 2) {
    let i = e.map(n[r], 1), o = e.map(n[r + 1], -1);
    i <= o && t.push(i, o);
  }
  return t;
}
function kT(n, e, t) {
  let r = ho(e), i = In.get(e).spec.config, o = (t ? n.undone : n.done).popEvent(e, r);
  if (!o)
    return null;
  let s = o.selection.resolve(o.transform.doc), l = (t ? n.done : n.undone).addTransform(o.transform, e.selection.getBookmark(), i, r), a = new Yt(t ? l : o.remaining, t ? o.remaining : l, null, 0, -1);
  return o.transform.setSelection(s).setMeta(In, { redo: t, historyState: a });
}
let al = !1, Au = null;
function ho(n) {
  let e = n.plugins;
  if (Au != e) {
    al = !1, Au = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].spec.historyPreserveItems) {
        al = !0;
        break;
      }
  }
  return al;
}
const In = new de("history"), CT = new de("closeHistory");
function TT(n = {}) {
  return n = {
    depth: n.depth || 100,
    newGroupDelay: n.newGroupDelay || 500
  }, new ne({
    key: In,
    state: {
      init() {
        return new Yt(nt.empty, nt.empty, null, 0, -1);
      },
      apply(e, t, r) {
        return ST(t, r, e, n);
      }
    },
    config: n,
    props: {
      handleDOMEvents: {
        beforeinput(e, t) {
          let r = t.inputType, i = r == "historyUndo" ? Hh : r == "historyRedo" ? Vh : null;
          return i ? (t.preventDefault(), i(e.state, e.dispatch)) : !1;
        }
      }
    }
  });
}
function Fh(n, e) {
  return (t, r) => {
    let i = In.getState(t);
    if (!i || (n ? i.undone : i.done).eventCount == 0)
      return !1;
    if (r) {
      let o = kT(i, t, n);
      o && r(e ? o.scrollIntoView() : o);
    }
    return !0;
  };
}
const Hh = Fh(!1, !0), Vh = Fh(!0, !0), AT = te.create({
  name: "history",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: n, dispatch: e }) => Hh(n, e),
      redo: () => ({ state: n, dispatch: e }) => Vh(n, e)
    };
  },
  addProseMirrorPlugins() {
    return [
      TT(this.options)
    ];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-y": () => this.editor.commands.redo(),
      // Russian keyboard layouts
      "Mod-я": () => this.editor.commands.undo(),
      "Shift-Mod-я": () => this.editor.commands.redo()
    };
  }
});
AT.extend({
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      depth: 10,
      button: ({ editor: e, t }) => ["undo", "redo"].map((i) => ({
        component: J,
        componentProps: {
          action: () => {
            i === "undo" && e.chain().focus().undo().run(), i === "redo" && e.chain().focus().redo().run();
          },
          disabled: !e.can()[i](),
          icon: i == "undo" ? "mdi-undo" : "mdi-redo",
          tooltip: i == "undo" ? t("editor.undo.tooltip") : t("editor.redo.tooltip")
        }
      }))
    };
  }
});
const MT = ue.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["hr", ie(this.options.HTMLAttributes, n)];
  },
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain: n, state: e }) => {
        const { selection: t } = e, { $from: r, $to: i } = t, o = n();
        return r.parentOffset === 0 ? o.insertContentAt({
          from: Math.max(r.pos - 1, 0),
          to: i.pos
        }, {
          type: this.name
        }) : $p(t) ? o.insertContentAt(i.pos, {
          type: this.name
        }) : o.insertContent({ type: this.name }), o.command(({ tr: s, dispatch: l }) => {
          var a;
          if (l) {
            const { $to: c } = s.selection, d = c.end();
            if (c.nodeAfter)
              c.nodeAfter.isTextblock ? s.setSelection(L.create(s.doc, c.pos + 1)) : c.nodeAfter.isBlock ? s.setSelection(P.create(s.doc, c.pos)) : s.setSelection(L.create(s.doc, c.pos));
            else {
              const u = (a = c.parent.type.contentMatch.defaultType) === null || a === void 0 ? void 0 : a.create();
              u && (s.insert(d, u), s.setSelection(L.create(s.doc, d + 1)));
            }
            s.scrollIntoView();
          }
          return !0;
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      Wp({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
});
MT.extend({
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      button: ({ editor: e, t }) => ({
        component: J,
        componentProps: {
          action: () => e.chain().focus().setHorizontalRule().run(),
          disabled: !e.can().setHorizontalRule(),
          icon: "mdi-minus",
          tooltip: t("editor.horizontalrule.tooltip")
        }
      })
    };
  }
});
const ET = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/, OT = ue.create({
  name: "image",
  addOptions() {
    return {
      inline: !1,
      allowBase64: !1,
      HTMLAttributes: {}
    };
  },
  inline() {
    return this.options.inline;
  },
  group() {
    return this.options.inline ? "inline" : "block";
  },
  draggable: !0,
  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: this.options.allowBase64 ? "img[src]" : 'img[src]:not([src^="data:"])'
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["img", ie(this.options.HTMLAttributes, n)];
  },
  addCommands() {
    return {
      setImage: (n) => ({ commands: e }) => e.insertContent({
        type: this.name,
        attrs: n
      })
    };
  },
  addInputRules() {
    return [
      Wp({
        find: ET,
        type: this.type,
        getAttributes: (n) => {
          const [, , e, t, r] = n;
          return { src: t, alt: e, title: r };
        }
      })
    ];
  }
}), NT = {
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },
    upload: {
      type: Function,
      default: void 0
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      loading: !1
    };
  },
  computed: {
    form: {
      get() {
        return this.modelValue;
      },
      set(n) {
        this.$emit("update:modelValue", n);
      }
    }
  },
  methods: {
    async onFileSelected(n) {
      var t;
      const e = n instanceof File ? n : n[0];
      if (!e)
        throw new Error("No files to upload");
      try {
        this.loading = !0;
        const r = await ((t = this.upload) == null ? void 0 : t.call(this, e));
        if (!r)
          throw new Error("No link received after upload");
        this.form = {
          ...Pt(this.form),
          src: r
        };
      } catch (r) {
        console.error(`Failed to execute upload file: ${r}`);
      } finally {
        this.loading = !1;
      }
    }
  }
};
function DT(n, e, t, r, i, o) {
  const s = k("v-file-input"), l = k("v-text-field"), a = k("v-checkbox"), c = k("v-form");
  return N(), H(c, { disabled: i.loading }, {
    default: E(() => [
      O(s, {
        density: "compact",
        variant: "outlined",
        modelValue: o.form.file,
        "onUpdate:modelValue": [
          e[0] || (e[0] = (d) => o.form.file = d),
          o.onFileSelected
        ],
        label: n.$t("editor.image.dialog.form.file"),
        accept: "image/*",
        loading: i.loading,
        "prepend-icon": "mdi-file-plus-outline",
        "onClick:clear": e[1] || (e[1] = (d) => o.form.src = void 0)
      }, null, 8, ["modelValue", "label", "loading", "onUpdate:modelValue"]),
      O(l, {
        density: "compact",
        variant: "outlined",
        modelValue: o.form.src,
        "onUpdate:modelValue": e[2] || (e[2] = (d) => o.form.src = d),
        label: n.$t("editor.image.dialog.form.link"),
        disabled: "",
        autofocus: "",
        "prepend-icon": "mdi-link-variant"
      }, null, 8, ["modelValue", "label"]),
      O(l, {
        density: "compact",
        variant: "outlined",
        modelValue: o.form.alt,
        "onUpdate:modelValue": e[3] || (e[3] = (d) => o.form.alt = d),
        label: n.$t("editor.image.dialog.form.alt"),
        "prepend-icon": "mdi-text"
      }, null, 8, ["modelValue", "label"]),
      O(a, {
        density: "compact",
        modelValue: o.form.lockAspectRatio,
        "onUpdate:modelValue": e[4] || (e[4] = (d) => o.form.lockAspectRatio = d),
        label: n.$t("editor.image.dialog.form.aspectRatio")
      }, null, 8, ["modelValue", "label"])
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const Mu = /* @__PURE__ */ fe(NT, [["render", DT]]), _T = {
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  computed: {
    form: {
      get() {
        return this.modelValue;
      },
      set(n) {
        this.$emit("update:modelValue", n);
      }
    }
  }
};
function RT(n, e, t, r, i, o) {
  const s = k("v-text-field"), l = k("v-checkbox"), a = k("v-form");
  return N(), H(a, null, {
    default: E(() => [
      O(s, {
        density: "compact",
        variant: "outlined",
        modelValue: o.form.src,
        "onUpdate:modelValue": e[0] || (e[0] = (c) => o.form.src = c),
        label: n.$t("editor.image.dialog.form.link"),
        autofocus: "",
        "prepend-icon": "mdi-link-variant"
      }, null, 8, ["modelValue", "label"]),
      O(s, {
        density: "compact",
        variant: "outlined",
        modelValue: o.form.alt,
        "onUpdate:modelValue": e[1] || (e[1] = (c) => o.form.alt = c),
        label: n.$t("editor.image.dialog.form.alt"),
        "prepend-icon": "mdi-text"
      }, null, 8, ["modelValue", "label"]),
      O(l, {
        density: "compact",
        variant: "outlined",
        modelValue: o.form.lockAspectRatio,
        "onUpdate:modelValue": e[2] || (e[2] = (c) => o.form.lockAspectRatio = c),
        label: n.$t("editor.image.dialog.form.aspectRatio")
      }, null, 8, ["modelValue", "label"])
    ]),
    _: 1
  });
}
const Eu = /* @__PURE__ */ fe(_T, [["render", RT]]), IT = {
  components: {
    ImageUpload: Mu,
    ImageUrl: Eu
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    upload: {
      type: Function,
      default: void 0
    },
    imageTabs: {
      type: Array,
      default: () => []
    },
    hiddenTabs: {
      type: Array,
      default: () => []
    },
    destroy: {
      type: Function,
      default: void 0
    },
    editor: {
      type: Object,
      required: !0
    }
  },
  setup() {
    const { toggleImageEvent: n } = Lh();
    return {
      toggleImageEvent: n
    };
  },
  data() {
    return {
      dialog: !1,
      tab: !1,
      form: {}
    };
  },
  computed: {
    defaultImageTabs() {
      return [...[
        {
          name: this.$t("editor.image.dialog.tab.url"),
          type: "url",
          component: Eu
        },
        {
          name: this.$t("editor.image.dialog.tab.upload"),
          type: "upload",
          component: Mu
        }
      ].filter((t) => t.type ? !this.hiddenTabs.includes(t.type) : t), ...this.imageTabs];
    },
    disabledApply() {
      const { src: n } = this.form;
      return !(typeof n == "string" && n !== "");
    }
  },
  methods: {
    async apply() {
      const { src: n, lockAspectRatio: e, height: t } = this.form;
      n && (this.editor.chain().focus().setImage({
        ...this.form,
        src: n,
        height: e ? void 0 : t
      }).run(), this.toggleImageEvent(), this.close());
    },
    close() {
      this.dialog = !1, this.form = {}, setTimeout(() => {
        var n;
        return (n = this.destroy) == null ? void 0 : n.call(this);
      }, 300);
    }
  },
  watch: {
    value: {
      immediate: !0,
      deep: !0,
      handler(n) {
        this.form = {
          ...this.form,
          ...n
        };
      }
    }
  }
}, PT = { class: "headline" };
function LT(n, e, t, r, i, o) {
  const s = k("v-spacer"), l = k("v-icon"), a = k("v-btn"), c = k("v-toolbar"), d = k("v-tab"), u = k("v-tabs"), f = k("v-window-item"), p = k("v-window"), h = k("v-card-text"), m = k("v-card-actions"), g = k("v-card"), y = k("v-dialog");
  return N(), H(y, {
    modelValue: i.dialog,
    "onUpdate:modelValue": e[3] || (e[3] = (w) => i.dialog = w),
    "max-width": "400",
    activator: "parent",
    "onClick:outside": o.close
  }, {
    default: E(() => [
      O(g, null, {
        default: E(() => [
          O(c, {
            class: "pl-5 pr-2",
            density: "compact"
          }, {
            default: E(() => [
              dn("span", PT, De(n.$t("editor.image.dialog.title")), 1),
              O(s),
              O(a, {
                class: "mx-0",
                icon: "",
                onClick: o.close
              }, {
                default: E(() => [
                  O(l, { icon: "mdi-close" })
                ]),
                _: 1
              }, 8, ["onClick"])
            ]),
            _: 1
          }),
          O(u, {
            modelValue: i.tab,
            "onUpdate:modelValue": e[0] || (e[0] = (w) => i.tab = w)
          }, {
            default: E(() => [
              (N(!0), re(be, null, We(o.defaultImageTabs, (w, A) => (N(), H(d, {
                key: A,
                value: A
              }, {
                default: E(() => [
                  rt(De(w.name), 1)
                ]),
                _: 2
              }, 1032, ["value"]))), 128))
            ]),
            _: 1
          }, 8, ["modelValue"]),
          O(h, null, {
            default: E(() => [
              O(p, {
                modelValue: i.tab,
                "onUpdate:modelValue": e[2] || (e[2] = (w) => i.tab = w)
              }, {
                default: E(() => [
                  (N(!0), re(be, null, We(o.defaultImageTabs, (w, A) => (N(), H(f, {
                    key: A,
                    value: A
                  }, {
                    default: E(() => [
                      (N(), H(ri(w.component), {
                        class: "pt-5",
                        modelValue: i.form,
                        "onUpdate:modelValue": e[1] || (e[1] = (b) => i.form = b),
                        upload: t.upload
                      }, null, 8, ["modelValue", "upload"]))
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }),
          O(m, null, {
            default: E(() => [
              O(a, {
                disabled: o.disabledApply,
                onClick: o.apply
              }, {
                default: E(() => [
                  rt(De(n.$t("editor.image.dialog.button.apply")), 1)
                ]),
                _: 1
              }, 8, ["disabled", "onClick"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["modelValue", "onClick:outside"]);
}
const BT = /* @__PURE__ */ fe(IT, [["render", LT]]), { IMAGE_MAX_SIZE: Ou, IMAGE_MIN_SIZE: Nu, IMAGE_THROTTLE_WAIT_TIME: Du } = xt(), zT = {
  props: {
    ...Y1,
    selected: {
      type: Boolean,
      required: !0
    }
  },
  components: {
    NodeViewWrapper: G1
  },
  data() {
    return {
      ResizeDirection: {
        TOP_LEFT: "tl",
        TOP_RIGHT: "tr",
        BOTTOM_LEFT: "bl",
        BOTTOM_RIGHT: "br"
      },
      maxSize: {
        width: Ou,
        height: Ou
      },
      originalSize: {
        width: 0,
        height: 0
      },
      resizeDirections: [
        "tl",
        "tr",
        "bl",
        "br"
      ],
      resizing: !1,
      resizerState: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        dir: ""
      }
    };
  },
  computed: {
    imgAttrs() {
      const { src: n, alt: e, width: t, height: r } = this.node.attrs, i = Gl(t) ? `${t}px` : t, o = Gl(r) ? `${r}px` : r;
      return {
        src: n || void 0,
        alt: e || void 0,
        style: {
          width: i || void 0,
          height: o || void 0
        }
      };
    },
    display() {
      return this.node.attrs.display || void 0;
    },
    lockAspectRatio() {
      return this.node.attrs.lockAspectRatio ?? !0;
    },
    imageViewClass() {
      return typeof this.display == "string" ? ["image-view", `image-view--${this.display}`] : ["image-view"];
    },
    imageMaxStyle() {
      const {
        style: { width: n }
      } = this.imgAttrs;
      return { width: n === "100%" ? n : void 0 };
    }
  },
  methods: {
    onImageLoad(n) {
      this.originalSize.width = n.target.width, this.originalSize.height = n.target.height;
    },
    selectImage() {
      const { editor: n, getPos: e } = this;
      n.commands.setNodeSelection(e());
    },
    getMaxSize: ql(function() {
      const { editor: n } = this, { width: e } = getComputedStyle(n.view.dom);
      this.maxSize.width = Number.parseInt(e, 10);
    }, Du),
    onMouseDown(n, e) {
      n.preventDefault(), n.stopPropagation(), this.resizerState.x = n.clientX, this.resizerState.y = n.clientY;
      const t = this.originalSize.width, r = this.originalSize.height, i = t / r;
      let o = Number(this.node.attrs.width), s = Number(this.node.attrs.height);
      const l = this.maxSize.width;
      o && !s ? (o = o > l ? l : o, s = Math.round(o / i)) : s && !o ? (o = Math.round(s * i), o = o > l ? l : o) : !o && !s ? (o = t > l ? l : t, s = Math.round(o / i)) : o = o > l ? l : o, this.resizerState.w = o, this.resizerState.h = s, this.resizerState.dir = e, this.resizing = !0, this.onEvents();
    },
    onMouseMove: ql(function(n) {
      if (n.preventDefault(), n.stopPropagation(), !this.resizing) return;
      const { x: e, y: t, w: r, h: i, dir: o } = this.resizerState, s = (n.clientX - e) * (/l/.test(o) ? -1 : 1), l = (n.clientY - t) * (/t/.test(o) ? -1 : 1), a = Hk(r + s, Nu, this.maxSize.width), c = this.lockAspectRatio ? null : Math.max(i + l, Nu);
      this.updateAttributes({
        width: a,
        height: c
      });
    }, Du),
    onMouseUp(n) {
      n.preventDefault(), n.stopPropagation(), this.resizing && (this.resizing = !1, this.resizerState = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        dir: ""
      }, this.offEvents(), this.selectImage());
    },
    onEvents() {
      document == null || document.addEventListener("mousemove", this.onMouseMove, !0), document == null || document.addEventListener("mouseup", this.onMouseUp, !0);
    },
    offEvents() {
      document == null || document.removeEventListener("mousemove", this.onMouseMove, !0), document == null || document.removeEventListener("mouseup", this.onMouseUp, !0);
    }
  },
  mounted() {
    this.resizeOb = new ResizeObserver(() => this.getMaxSize()), this.resizeOb.observe(this.editor.view.dom);
  },
  beforeDestroy() {
    this.resizeOb.disconnect();
  }
}, FT = ["src", "alt"], HT = {
  key: 0,
  class: "image-resizer"
}, VT = ["onMousedown"];
function $T(n, e, t, r, i, o) {
  const s = k("NodeViewWrapper");
  return N(), H(s, {
    as: "span",
    class: Mn(o.imageViewClass),
    style: En(o.imageMaxStyle)
  }, {
    default: E(() => [
      dn("div", {
        draggable: "true",
        "data-drag-handle": "",
        class: Mn([{
          "image-view__body--focused": t.selected,
          "image-view__body--resizing": i.resizing
        }, "image-view__body"]),
        style: En(o.imageMaxStyle)
      }, [
        dn("img", {
          src: o.imgAttrs.src,
          alt: o.imgAttrs.alt,
          style: En(o.imgAttrs.style),
          class: "image-view__body__image",
          onLoad: e[0] || (e[0] = (...l) => o.onImageLoad && o.onImageLoad(...l)),
          onClick: e[1] || (e[1] = (...l) => o.selectImage && o.selectImage(...l))
        }, null, 44, FT),
        n.editor.view.editable ? fa((N(), re("div", HT, [
          (N(!0), re(be, null, We(i.resizeDirections, (l) => (N(), re("span", {
            key: l,
            class: Mn([`image-resizer__handler--${l}`, "image-resizer__handler"]),
            onMousedown: (a) => o.onMouseDown(a, l)
          }, null, 42, VT))), 128))
        ], 512)), [
          [ha, t.selected || i.resizing]
        ]) : Fe("", !0)
      ], 6)
    ]),
    _: 1
  }, 8, ["class", "style"]);
}
const jT = /* @__PURE__ */ fe(zT, [["render", $T]]), WT = {
  components: {
    ActionButton: J
  },
  props: {
    editor: {
      type: Object,
      required: !0
    },
    upload: {
      type: Function,
      default: void 0
    },
    imageTabs: {
      type: Array,
      default: () => []
    },
    hiddenTabs: {
      type: Array,
      default: () => []
    },
    icon: {
      type: String,
      default: "mdi-image-plus"
    },
    tooltip: {
      type: String,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    color: {
      type: String,
      default: void 0
    },
    action: {
      type: Function,
      default: void 0
    },
    isActive: {
      type: Function,
      default: void 0
    }
  },
  data() {
    return {
      model: {
        src: "",
        alt: "",
        title: "",
        width: "",
        height: "",
        display: "",
        lockAspectRatio: !0
      }
    };
  },
  methods: {
    onAction() {
      var t, r;
      const n = (t = this.editor) == null ? void 0 : t.view.state.selection, e = ((r = n == null ? void 0 : n.node) == null ? void 0 : r.attrs) || {};
      e != null && e.src && (this.model.src = e.src), e != null && e.alt && (this.model.alt = e.alt), e != null && e.title && (this.model.title = e.title), e != null && e.width && (this.model.width = e.width), e != null && e.height && (this.model.height = e.height), e != null && e.display && (this.model.display = e.display), this.model.lockAspectRatio = e.lockAspectRatio ?? !0;
    }
  }
};
function UT(n, e, t, r, i, o) {
  const s = k("action-button");
  return N(), H(s, {
    icon: t.icon,
    tooltip: t.tooltip,
    disabled: t.disabled,
    color: t.color,
    "is-active": t.isActive,
    action: o.onAction
  }, {
    default: E(() => [
      ki(n.$slots, "dialog", {
        props: { editor: t.editor, value: i.model, imageTabs: t.imageTabs, hiddenTabs: t.hiddenTabs, upload: t.upload }
      })
    ]),
    _: 3
  }, 8, ["icon", "tooltip", "disabled", "color", "is-active", "action"]);
}
const KT = /* @__PURE__ */ fe(WT, [["render", UT]]), { IMAGE_SIZE: qT } = xt();
OT.extend({
  addAttributes() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      src: {
        default: null
      },
      alt: {
        default: null
      },
      lockAspectRatio: {
        default: !0
      },
      width: {
        default: this.options.width
      },
      height: {
        default: null
      },
      display: {
        default: this.options.display,
        renderHTML: ({ display: e }) => e ? {
          "data-display": e
        } : {},
        parseHTML: (e) => e.getAttribute("data-display") || "inline"
      }
    };
  },
  addNodeView() {
    return Z1(jT);
  },
  addCommands() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      updateImage: (e) => ({ commands: t }) => t.updateAttributes(this.name, e)
    };
  },
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      upload: void 0,
      width: qT["size-medium"],
      display: "inline",
      imageTabs: [],
      hiddenTabs: [],
      inline: !0,
      dialogComponent: () => BT,
      button: ({ editor: e, extension: t, t: r }) => {
        const { upload: i, imageTabs: o, hiddenTabs: s, dialogComponent: l } = t.options;
        return {
          component: KT,
          componentProps: {
            editor: e,
            upload: i,
            imageTabs: o,
            hiddenTabs: s,
            isActive: () => e.isActive("image") || !1,
            disabled: !e.can().setImage({}),
            icon: "mdi-image-plus",
            tooltip: r("editor.image.tooltip")
          },
          componentSlots: {
            dialog: l()
          }
        };
      }
    };
  }
});
te.create({
  name: "indent",
  addOptions() {
    return {
      divider: !1,
      spacer: !1,
      button: ({ editor: n, t: e }) => {
        const t = ["outdent", "indent"], r = {
          indent: "sinkListItem",
          outdent: "liftListItem"
        };
        return t.map((i) => ({
          component: J,
          componentProps: {
            action: () => {
              i === "indent" && n.chain().focus().sinkListItem("listItem").run(), i === "outdent" && n.chain().focus().liftListItem("listItem").run();
            },
            disabled: !n.can()[r[i]]("listItem"),
            icon: i == "outdent" ? "mdi-format-indent-decrease" : "mdi-format-indent-increase",
            tooltip: e(`editor.${i}.tooltip`)
          }
        }));
      }
    };
  }
});
const GT = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, JT = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, YT = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, XT = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, ZT = ot.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (n) => n.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=normal",
        clearMark: (n) => n.type.name === this.name
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["em", ie(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands: n }) => n.setMark(this.name),
      toggleItalic: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetItalic: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      yr({
        find: GT,
        type: this.type
      }),
      yr({
        find: YT,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      zn({
        find: JT,
        type: this.type
      }),
      zn({
        find: XT,
        type: this.type
      })
    ];
  }
});
ZT.extend({
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      button: ({ editor: e, t }) => ({
        component: J,
        componentProps: {
          action: () => e.chain().focus().toggleItalic().run(),
          isActive: () => e.isActive("italic") || !1,
          disabled: !e.can().toggleItalic(),
          icon: "mdi-format-italic",
          tooltip: t("editor.italic.tooltip")
        }
      })
    };
  }
});
const QT = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2ntley5rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6logistics9properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3ncaster6d0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2psy3ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0america6xi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", eA = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", xr = (n, e) => {
  for (const t in e)
    n[t] = e[t];
  return n;
}, Yl = "numeric", Xl = "ascii", Zl = "alpha", Yr = "asciinumeric", Vr = "alphanumeric", Ql = "domain", $h = "emoji", tA = "scheme", nA = "slashscheme", cl = "whitespace";
function rA(n, e) {
  return n in e || (e[n] = []), e[n];
}
function An(n, e, t) {
  e[Yl] && (e[Yr] = !0, e[Vr] = !0), e[Xl] && (e[Yr] = !0, e[Zl] = !0), e[Yr] && (e[Vr] = !0), e[Zl] && (e[Vr] = !0), e[Vr] && (e[Ql] = !0), e[$h] && (e[Ql] = !0);
  for (const r in e) {
    const i = rA(r, t);
    i.indexOf(n) < 0 && i.push(n);
  }
}
function iA(n, e) {
  const t = {};
  for (const r in e)
    e[r].indexOf(n) >= 0 && (t[r] = !0);
  return t;
}
function Pe(n = null) {
  this.j = {}, this.jr = [], this.jd = null, this.t = n;
}
Pe.groups = {};
Pe.prototype = {
  accepts() {
    return !!this.t;
  },
  /**
   * Follow an existing transition from the given input to the next state.
   * Does not mutate.
   * @param {string} input character or token type to transition on
   * @returns {?State<T>} the next state, if any
   */
  go(n) {
    const e = this, t = e.j[n];
    if (t)
      return t;
    for (let r = 0; r < e.jr.length; r++) {
      const i = e.jr[r][0], o = e.jr[r][1];
      if (o && i.test(n))
        return o;
    }
    return e.jd;
  },
  /**
   * Whether the state has a transition for the given input. Set the second
   * argument to true to only look for an exact match (and not a default or
   * regular-expression-based transition)
   * @param {string} input
   * @param {boolean} exactOnly
   */
  has(n, e = !1) {
    return e ? n in this.j : !!this.go(n);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(n, e, t, r) {
    for (let i = 0; i < n.length; i++)
      this.tt(n[i], e, t, r);
  },
  /**
   * Short for "take regexp transition"; defines a transition for this state
   * when it encounters a token which matches the given regular expression
   * @param {RegExp} regexp Regular expression transition (populate first)
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  tr(n, e, t, r) {
    r = r || Pe.groups;
    let i;
    return e && e.j ? i = e : (i = new Pe(e), t && r && An(e, t, r)), this.jr.push([n, i]), i;
  },
  /**
   * Short for "take transitions", will take as many sequential transitions as
   * the length of the given input and returns the
   * resulting final state.
   * @param {string | string[]} input
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  ts(n, e, t, r) {
    let i = this;
    const o = n.length;
    if (!o)
      return i;
    for (let s = 0; s < o - 1; s++)
      i = i.tt(n[s]);
    return i.tt(n[o - 1], e, t, r);
  },
  /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * Specify a token group flags to define groups that this token belongs to.
   * The token will be added to corresponding entires in the given groups
   * object.
   *
   * @param {string} input character, token type to transition on
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of groups
   * @returns {State<T>} taken after the given input
   */
  tt(n, e, t, r) {
    r = r || Pe.groups;
    const i = this;
    if (e && e.j)
      return i.j[n] = e, e;
    const o = e;
    let s, l = i.go(n);
    if (l ? (s = new Pe(), xr(s.j, l.j), s.jr.push.apply(s.jr, l.jr), s.jd = l.jd, s.t = l.t) : s = new Pe(), o) {
      if (r)
        if (s.t && typeof s.t == "string") {
          const a = xr(iA(s.t, r), t);
          An(o, a, r);
        } else t && An(o, t, r);
      s.t = o;
    }
    return i.j[n] = s, s;
  }
};
const V = (n, e, t, r, i) => n.ta(e, t, r, i), le = (n, e, t, r, i) => n.tr(e, t, r, i), _u = (n, e, t, r, i) => n.ts(e, t, r, i), T = (n, e, t, r, i) => n.tt(e, t, r, i), Dt = "WORD", ea = "UWORD", jh = "ASCIINUMERICAL", Wh = "ALPHANUMERICAL", wi = "LOCALHOST", ta = "TLD", na = "UTLD", mo = "SCHEME", or = "SLASH_SCHEME", rc = "NUM", ra = "WS", ic = "NL", Xr = "OPENBRACE", Zr = "CLOSEBRACE", Po = "OPENBRACKET", Lo = "CLOSEBRACKET", Bo = "OPENPAREN", zo = "CLOSEPAREN", Fo = "OPENANGLEBRACKET", Ho = "CLOSEANGLEBRACKET", Vo = "FULLWIDTHLEFTPAREN", $o = "FULLWIDTHRIGHTPAREN", jo = "LEFTCORNERBRACKET", Wo = "RIGHTCORNERBRACKET", Uo = "LEFTWHITECORNERBRACKET", Ko = "RIGHTWHITECORNERBRACKET", qo = "FULLWIDTHLESSTHAN", Go = "FULLWIDTHGREATERTHAN", Jo = "AMPERSAND", oc = "APOSTROPHE", Yo = "ASTERISK", Xt = "AT", Xo = "BACKSLASH", Zo = "BACKTICK", Qo = "CARET", Qt = "COLON", sc = "COMMA", es = "DOLLAR", ut = "DOT", ts = "EQUALS", lc = "EXCLAMATION", Ge = "HYPHEN", Qr = "PERCENT", ns = "PIPE", rs = "PLUS", is = "POUND", ei = "QUERY", ac = "QUOTE", Uh = "FULLWIDTHMIDDLEDOT", cc = "SEMI", ft = "SLASH", ti = "TILDE", ss = "UNDERSCORE", Kh = "EMOJI", ls = "SYM";
var qh = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  WORD: Dt,
  UWORD: ea,
  ASCIINUMERICAL: jh,
  ALPHANUMERICAL: Wh,
  LOCALHOST: wi,
  TLD: ta,
  UTLD: na,
  SCHEME: mo,
  SLASH_SCHEME: or,
  NUM: rc,
  WS: ra,
  NL: ic,
  OPENBRACE: Xr,
  CLOSEBRACE: Zr,
  OPENBRACKET: Po,
  CLOSEBRACKET: Lo,
  OPENPAREN: Bo,
  CLOSEPAREN: zo,
  OPENANGLEBRACKET: Fo,
  CLOSEANGLEBRACKET: Ho,
  FULLWIDTHLEFTPAREN: Vo,
  FULLWIDTHRIGHTPAREN: $o,
  LEFTCORNERBRACKET: jo,
  RIGHTCORNERBRACKET: Wo,
  LEFTWHITECORNERBRACKET: Uo,
  RIGHTWHITECORNERBRACKET: Ko,
  FULLWIDTHLESSTHAN: qo,
  FULLWIDTHGREATERTHAN: Go,
  AMPERSAND: Jo,
  APOSTROPHE: oc,
  ASTERISK: Yo,
  AT: Xt,
  BACKSLASH: Xo,
  BACKTICK: Zo,
  CARET: Qo,
  COLON: Qt,
  COMMA: sc,
  DOLLAR: es,
  DOT: ut,
  EQUALS: ts,
  EXCLAMATION: lc,
  HYPHEN: Ge,
  PERCENT: Qr,
  PIPE: ns,
  PLUS: rs,
  POUND: is,
  QUERY: ei,
  QUOTE: ac,
  FULLWIDTHMIDDLEDOT: Uh,
  SEMI: cc,
  SLASH: ft,
  TILDE: ti,
  UNDERSCORE: ss,
  EMOJI: Kh,
  SYM: ls
});
const Ot = /[a-z]/, Br = new RegExp("\\p{L}", "u"), dl = new RegExp("\\p{Emoji}", "u"), Nt = /\d/, ul = /\s/, Ru = "\r", fl = `
`, oA = "️", sA = "‍", pl = "￼";
let Xi = null, Zi = null;
function lA(n = []) {
  const e = {};
  Pe.groups = e;
  const t = new Pe();
  Xi == null && (Xi = Iu(QT)), Zi == null && (Zi = Iu(eA)), T(t, "'", oc), T(t, "{", Xr), T(t, "}", Zr), T(t, "[", Po), T(t, "]", Lo), T(t, "(", Bo), T(t, ")", zo), T(t, "<", Fo), T(t, ">", Ho), T(t, "（", Vo), T(t, "）", $o), T(t, "「", jo), T(t, "」", Wo), T(t, "『", Uo), T(t, "』", Ko), T(t, "＜", qo), T(t, "＞", Go), T(t, "&", Jo), T(t, "*", Yo), T(t, "@", Xt), T(t, "`", Zo), T(t, "^", Qo), T(t, ":", Qt), T(t, ",", sc), T(t, "$", es), T(t, ".", ut), T(t, "=", ts), T(t, "!", lc), T(t, "-", Ge), T(t, "%", Qr), T(t, "|", ns), T(t, "+", rs), T(t, "#", is), T(t, "?", ei), T(t, '"', ac), T(t, "/", ft), T(t, ";", cc), T(t, "~", ti), T(t, "_", ss), T(t, "\\", Xo), T(t, "・", Uh);
  const r = le(t, Nt, rc, {
    [Yl]: !0
  });
  le(r, Nt, r);
  const i = le(r, Ot, jh, {
    [Yr]: !0
  }), o = le(r, Br, Wh, {
    [Vr]: !0
  }), s = le(t, Ot, Dt, {
    [Xl]: !0
  });
  le(s, Nt, i), le(s, Ot, s), le(i, Nt, i), le(i, Ot, i);
  const l = le(t, Br, ea, {
    [Zl]: !0
  });
  le(l, Ot), le(l, Nt, o), le(l, Br, l), le(o, Nt, o), le(o, Ot), le(o, Br, o);
  const a = T(t, fl, ic, {
    [cl]: !0
  }), c = T(t, Ru, ra, {
    [cl]: !0
  }), d = le(t, ul, ra, {
    [cl]: !0
  });
  T(t, pl, d), T(c, fl, a), T(c, pl, d), le(c, ul, d), T(d, Ru), T(d, fl), le(d, ul, d), T(d, pl, d);
  const u = le(t, dl, Kh, {
    [$h]: !0
  });
  T(u, "#"), le(u, dl, u), T(u, oA, u);
  const f = T(u, sA);
  T(f, "#"), le(f, dl, u);
  const p = [[Ot, s], [Nt, i]], h = [[Ot, null], [Br, l], [Nt, o]];
  for (let m = 0; m < Xi.length; m++)
    Kt(t, Xi[m], ta, Dt, p);
  for (let m = 0; m < Zi.length; m++)
    Kt(t, Zi[m], na, ea, h);
  An(ta, {
    tld: !0,
    ascii: !0
  }, e), An(na, {
    utld: !0,
    alpha: !0
  }, e), Kt(t, "file", mo, Dt, p), Kt(t, "mailto", mo, Dt, p), Kt(t, "http", or, Dt, p), Kt(t, "https", or, Dt, p), Kt(t, "ftp", or, Dt, p), Kt(t, "ftps", or, Dt, p), An(mo, {
    scheme: !0,
    ascii: !0
  }, e), An(or, {
    slashscheme: !0,
    ascii: !0
  }, e), n = n.sort((m, g) => m[0] > g[0] ? 1 : -1);
  for (let m = 0; m < n.length; m++) {
    const g = n[m][0], w = n[m][1] ? {
      [tA]: !0
    } : {
      [nA]: !0
    };
    g.indexOf("-") >= 0 ? w[Ql] = !0 : Ot.test(g) ? Nt.test(g) ? w[Yr] = !0 : w[Xl] = !0 : w[Yl] = !0, _u(t, g, g, w);
  }
  return _u(t, "localhost", wi, {
    ascii: !0
  }), t.jd = new Pe(ls), {
    start: t,
    tokens: xr({
      groups: e
    }, qh)
  };
}
function Gh(n, e) {
  const t = aA(e.replace(/[A-Z]/g, (l) => l.toLowerCase())), r = t.length, i = [];
  let o = 0, s = 0;
  for (; s < r; ) {
    let l = n, a = null, c = 0, d = null, u = -1, f = -1;
    for (; s < r && (a = l.go(t[s])); )
      l = a, l.accepts() ? (u = 0, f = 0, d = l) : u >= 0 && (u += t[s].length, f++), c += t[s].length, o += t[s].length, s++;
    o -= u, s -= f, c -= u, i.push({
      t: d.t,
      // token type/name
      v: e.slice(o - c, o),
      // string value
      s: o - c,
      // start index
      e: o
      // end index (excluding)
    });
  }
  return i;
}
function aA(n) {
  const e = [], t = n.length;
  let r = 0;
  for (; r < t; ) {
    let i = n.charCodeAt(r), o, s = i < 55296 || i > 56319 || r + 1 === t || (o = n.charCodeAt(r + 1)) < 56320 || o > 57343 ? n[r] : n.slice(r, r + 2);
    e.push(s), r += s.length;
  }
  return e;
}
function Kt(n, e, t, r, i) {
  let o;
  const s = e.length;
  for (let l = 0; l < s - 1; l++) {
    const a = e[l];
    n.j[a] ? o = n.j[a] : (o = new Pe(r), o.jr = i.slice(), n.j[a] = o), n = o;
  }
  return o = new Pe(t), o.jr = i.slice(), n.j[e[s - 1]] = o, o;
}
function Iu(n) {
  const e = [], t = [];
  let r = 0, i = "0123456789";
  for (; r < n.length; ) {
    let o = 0;
    for (; i.indexOf(n[r + o]) >= 0; )
      o++;
    if (o > 0) {
      e.push(t.join(""));
      for (let s = parseInt(n.substring(r, r + o), 10); s > 0; s--)
        t.pop();
      r += o;
    } else
      t.push(n[r]), r++;
  }
  return e;
}
const Si = {
  defaultProtocol: "http",
  events: null,
  format: Pu,
  formatHref: Pu,
  nl2br: !1,
  tagName: "a",
  target: null,
  rel: null,
  validate: !0,
  truncate: 1 / 0,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
function dc(n, e = null) {
  let t = xr({}, Si);
  n && (t = xr(t, n instanceof dc ? n.o : n));
  const r = t.ignoreTags, i = [];
  for (let o = 0; o < r.length; o++)
    i.push(r[o].toUpperCase());
  this.o = t, e && (this.defaultRender = e), this.ignoreTags = i;
}
dc.prototype = {
  o: Si,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(n) {
    return n;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(n) {
    return this.get("validate", n.toString(), n);
  },
  // Private methods
  /**
   * Resolve an option's value based on the value of the option and the given
   * params. If operator and token are specified and the target option is
   * callable, automatically calls the function with the given argument.
   * @template {keyof Opts} K
   * @param {K} key Name of option to use
   * @param {string} [operator] will be passed to the target option if it's a
   * function. If not specified, RAW function value gets returned
   * @param {MultiToken} [token] The token from linkify.tokenize
   * @returns {Opts[K] | any}
   */
  get(n, e, t) {
    const r = e != null;
    let i = this.o[n];
    return i && (typeof i == "object" ? (i = t.t in i ? i[t.t] : Si[n], typeof i == "function" && r && (i = i(e, t))) : typeof i == "function" && r && (i = i(e, t.t, t)), i);
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(n, e, t) {
    let r = this.o[n];
    return typeof r == "function" && e != null && (r = r(e, t.t, t)), r;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(n) {
    const e = n.render(this);
    return (this.get("render", null, n) || this.defaultRender)(e, n.t, n);
  }
};
function Pu(n) {
  return n;
}
function Jh(n, e) {
  this.t = "token", this.v = n, this.tk = e;
}
Jh.prototype = {
  isLink: !1,
  /**
   * Return the string this token represents.
   * @return {string}
   */
  toString() {
    return this.v;
  },
  /**
   * What should the value for this token be in the `href` HTML attribute?
   * Returns the `.toString` value by default.
   * @param {string} [scheme]
   * @return {string}
   */
  toHref(n) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(n) {
    const e = this.toString(), t = n.get("truncate", e, this), r = n.get("format", e, this);
    return t && r.length > t ? r.substring(0, t) + "…" : r;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(n) {
    return n.get("formatHref", this.toHref(n.get("defaultProtocol")), this);
  },
  /**
   * The start index of this token in the original input string
   * @returns {number}
   */
  startIndex() {
    return this.tk[0].s;
  },
  /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  /**
  	Returns an object  of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */
  toObject(n = Si.defaultProtocol) {
    return {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(n) {
    return {
      type: this.t,
      value: this.toFormattedString(n),
      isLink: this.isLink,
      href: this.toFormattedHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(n) {
    return n.get("validate", this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(n) {
    const e = this, t = this.toHref(n.get("defaultProtocol")), r = n.get("formatHref", t, this), i = n.get("tagName", t, e), o = this.toFormattedString(n), s = {}, l = n.get("className", t, e), a = n.get("target", t, e), c = n.get("rel", t, e), d = n.getObj("attributes", t, e), u = n.getObj("events", t, e);
    return s.href = r, l && (s.class = l), a && (s.target = a), c && (s.rel = c), d && xr(s, d), {
      tagName: i,
      attributes: s,
      content: o,
      eventListeners: u
    };
  }
};
function Ns(n, e) {
  class t extends Jh {
    constructor(i, o) {
      super(i, o), this.t = n;
    }
  }
  for (const r in e)
    t.prototype[r] = e[r];
  return t.t = n, t;
}
const Lu = Ns("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), Bu = Ns("text"), cA = Ns("nl"), Qi = Ns("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(n = Si.defaultProtocol) {
    return this.hasProtocol() ? this.v : `${n}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const n = this.tk;
    return n.length >= 2 && n[0].t !== wi && n[1].t === Qt;
  }
}), qe = (n) => new Pe(n);
function dA({
  groups: n
}) {
  const e = n.domain.concat([Jo, Yo, Xt, Xo, Zo, Qo, es, ts, Ge, rc, Qr, ns, rs, is, ft, ls, ti, ss]), t = [Qt, sc, ut, lc, Qr, ei, ac, cc, Fo, Ho, Xr, Zr, Lo, Po, Bo, zo, Vo, $o, jo, Wo, Uo, Ko, qo, Go], r = [Jo, oc, Yo, Xo, Zo, Qo, es, ts, Ge, Xr, Zr, Qr, ns, rs, is, ei, ft, ls, ti, ss], i = qe(), o = T(i, ti);
  V(o, r, o), V(o, n.domain, o);
  const s = qe(), l = qe(), a = qe();
  V(i, n.domain, s), V(i, n.scheme, l), V(i, n.slashscheme, a), V(s, r, o), V(s, n.domain, s);
  const c = T(s, Xt);
  T(o, Xt, c), T(l, Xt, c), T(a, Xt, c);
  const d = T(o, ut);
  V(d, r, o), V(d, n.domain, o);
  const u = qe();
  V(c, n.domain, u), V(u, n.domain, u);
  const f = T(u, ut);
  V(f, n.domain, u);
  const p = qe(Lu);
  V(f, n.tld, p), V(f, n.utld, p), T(c, wi, p);
  const h = T(u, Ge);
  T(h, Ge, h), V(h, n.domain, u), V(p, n.domain, u), T(p, ut, f), T(p, Ge, h);
  const m = T(p, Qt);
  V(m, n.numeric, Lu);
  const g = T(s, Ge), y = T(s, ut);
  T(g, Ge, g), V(g, n.domain, s), V(y, r, o), V(y, n.domain, s);
  const w = qe(Qi);
  V(y, n.tld, w), V(y, n.utld, w), V(w, n.domain, s), V(w, r, o), T(w, ut, y), T(w, Ge, g), T(w, Xt, c);
  const A = T(w, Qt), b = qe(Qi);
  V(A, n.numeric, b);
  const C = qe(Qi), v = qe();
  V(C, e, C), V(C, t, v), V(v, e, C), V(v, t, v), T(w, ft, C), T(b, ft, C);
  const _ = T(l, Qt), z = T(a, Qt), R = T(z, ft), j = T(R, ft);
  V(l, n.domain, s), T(l, ut, y), T(l, Ge, g), V(a, n.domain, s), T(a, ut, y), T(a, Ge, g), V(_, n.domain, C), T(_, ft, C), T(_, ei, C), V(j, n.domain, C), V(j, e, C), T(j, ft, C);
  const q = [
    [Xr, Zr],
    // {}
    [Po, Lo],
    // []
    [Bo, zo],
    // ()
    [Fo, Ho],
    // <>
    [Vo, $o],
    // （）
    [jo, Wo],
    // 「」
    [Uo, Ko],
    // 『』
    [qo, Go]
    // ＜＞
  ];
  for (let K = 0; K < q.length; K++) {
    const [Y, we] = q[K], he = T(C, Y);
    T(v, Y, he), T(he, we, C);
    const oe = qe(Qi);
    V(he, e, oe);
    const se = qe();
    V(he, t), V(oe, e, oe), V(oe, t, se), V(se, e, oe), V(se, t, se), T(oe, we, C), T(se, we, C);
  }
  return T(i, wi, w), T(i, ic, cA), {
    start: i,
    tokens: qh
  };
}
function uA(n, e, t) {
  let r = t.length, i = 0, o = [], s = [];
  for (; i < r; ) {
    let l = n, a = null, c = null, d = 0, u = null, f = -1;
    for (; i < r && !(a = l.go(t[i].t)); )
      s.push(t[i++]);
    for (; i < r && (c = a || l.go(t[i].t)); )
      a = null, l = c, l.accepts() ? (f = 0, u = l) : f >= 0 && f++, i++, d++;
    if (f < 0)
      i -= d, i < r && (s.push(t[i]), i++);
    else {
      s.length > 0 && (o.push(hl(Bu, e, s)), s = []), i -= f, d -= f;
      const p = u.t, h = t.slice(i - d, i);
      o.push(hl(p, e, h));
    }
  }
  return s.length > 0 && o.push(hl(Bu, e, s)), o;
}
function hl(n, e, t) {
  const r = t[0].s, i = t[t.length - 1].e, o = e.slice(r, i);
  return new n(o, t);
}
const fA = typeof console < "u" && console && console.warn || (() => {
}), pA = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", Q = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function hA() {
  return Pe.groups = {}, Q.scanner = null, Q.parser = null, Q.tokenQueue = [], Q.pluginQueue = [], Q.customSchemes = [], Q.initialized = !1, Q;
}
function zu(n, e = !1) {
  if (Q.initialized && fA(`linkifyjs: already initialized - will not register custom scheme "${n}" ${pA}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(n))
    throw new Error(`linkifyjs: incorrect scheme format.
1. Must only contain digits, lowercase ASCII letters or "-"
2. Cannot start or end with "-"
3. "-" cannot repeat`);
  Q.customSchemes.push([n, e]);
}
function mA() {
  Q.scanner = lA(Q.customSchemes);
  for (let n = 0; n < Q.tokenQueue.length; n++)
    Q.tokenQueue[n][1]({
      scanner: Q.scanner
    });
  Q.parser = dA(Q.scanner.tokens);
  for (let n = 0; n < Q.pluginQueue.length; n++)
    Q.pluginQueue[n][1]({
      scanner: Q.scanner,
      parser: Q.parser
    });
  return Q.initialized = !0, Q;
}
function uc(n) {
  return Q.initialized || mA(), uA(Q.parser.start, n, Gh(Q.scanner.start, n));
}
uc.scan = Gh;
function Yh(n, e = null, t = null) {
  if (e && typeof e == "object") {
    if (t)
      throw Error(`linkifyjs: Invalid link type ${e}; must be a string`);
    t = e, e = null;
  }
  const r = new dc(t), i = uc(n), o = [];
  for (let s = 0; s < i.length; s++) {
    const l = i[s];
    l.isLink && (!e || l.t === e) && r.check(l) && o.push(l.toFormattedObject(r));
  }
  return o;
}
function gA(n) {
  return n.length === 1 ? n[0].isLink : n.length === 3 && n[1].isLink ? ["()", "[]"].includes(n[0].value + n[2].value) : !1;
}
function yA(n) {
  return new ne({
    key: new de("autolink"),
    appendTransaction: (e, t, r) => {
      const i = e.some((c) => c.docChanged) && !t.doc.eq(r.doc), o = e.some((c) => c.getMeta("preventAutolink"));
      if (!i || o)
        return;
      const { tr: s } = r, l = T0(t.doc, [...e]);
      if (D0(l).forEach(({ newRange: c }) => {
        const d = M0(r.doc, c, (p) => p.isTextblock);
        let u, f;
        if (d.length > 1 ? (u = d[0], f = r.doc.textBetween(u.pos, u.pos + u.node.nodeSize, void 0, " ")) : d.length && r.doc.textBetween(c.from, c.to, " ", " ").endsWith(" ") && (u = d[0], f = r.doc.textBetween(u.pos, c.to, void 0, " ")), u && f) {
          const p = f.split(" ").filter((y) => y !== "");
          if (p.length <= 0)
            return !1;
          const h = p[p.length - 1], m = u.pos + f.lastIndexOf(h);
          if (!h)
            return !1;
          const g = uc(h).map((y) => y.toObject(n.defaultProtocol));
          if (!gA(g))
            return !1;
          g.filter((y) => y.isLink).map((y) => ({
            ...y,
            from: m + y.start + 1,
            to: m + y.end + 1
          })).filter((y) => r.schema.marks.code ? !r.doc.rangeHasMark(y.from, y.to, r.schema.marks.code) : !0).filter((y) => n.validate(y.value)).filter((y) => n.shouldAutoLink(y.value)).forEach((y) => {
            Ha(y.from, y.to, r.doc).some((w) => w.mark.type === n.type) || s.addMark(y.from, y.to, n.type.create({
              href: y.href
            }));
          });
        }
      }), !!s.steps.length)
        return s;
    }
  });
}
function bA(n) {
  return new ne({
    key: new de("handleClickLink"),
    props: {
      handleClick: (e, t, r) => {
        var i, o;
        if (r.button !== 0 || !e.editable)
          return !1;
        let s = r.target;
        const l = [];
        for (; s.nodeName !== "DIV"; )
          l.push(s), s = s.parentNode;
        if (!l.find((f) => f.nodeName === "A"))
          return !1;
        const a = Vp(e.state, n.type.name), c = r.target, d = (i = c == null ? void 0 : c.href) !== null && i !== void 0 ? i : a.href, u = (o = c == null ? void 0 : c.target) !== null && o !== void 0 ? o : a.target;
        return c && d ? (window.open(d, u), !0) : !1;
      }
    }
  });
}
function vA(n) {
  return new ne({
    key: new de("handlePasteLink"),
    props: {
      handlePaste: (e, t, r) => {
        const { state: i } = e, { selection: o } = i, { empty: s } = o;
        if (s)
          return !1;
        let l = "";
        r.content.forEach((c) => {
          l += c.textContent;
        });
        const a = Yh(l, { defaultProtocol: n.defaultProtocol }).find((c) => c.isLink && c.value === l);
        return !l || !a ? !1 : n.editor.commands.setMark(n.type, {
          href: a.href
        });
      }
    }
  });
}
const wA = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;
function wn(n, e) {
  const t = [
    "http",
    "https",
    "ftp",
    "ftps",
    "mailto",
    "tel",
    "callto",
    "sms",
    "cid",
    "xmpp"
  ];
  return e && e.forEach((r) => {
    const i = typeof r == "string" ? r : r.scheme;
    i && t.push(i);
  }), !n || n.replace(wA, "").match(new RegExp(
    // eslint-disable-next-line no-useless-escape
    `^(?:(?:${t.join("|")}):|[^a-z]|[a-z0-9+.-]+(?:[^a-z+.-:]|$))`,
    "i"
  ));
}
const SA = ot.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: !1,
  exitable: !0,
  onCreate() {
    this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((n) => {
      if (typeof n == "string") {
        zu(n);
        return;
      }
      zu(n.scheme, n.optionalSlashes);
    });
  },
  onDestroy() {
    hA();
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: !0,
      linkOnPaste: !0,
      autolink: !0,
      protocols: [],
      defaultProtocol: "http",
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      isAllowedUri: (n, e) => !!wn(n, e.protocols),
      validate: (n) => !!n,
      shouldAutoLink: (n) => !!n
    };
  },
  addAttributes() {
    return {
      href: {
        default: null,
        parseHTML(n) {
          return n.getAttribute("href");
        }
      },
      target: {
        default: this.options.HTMLAttributes.target
      },
      rel: {
        default: this.options.HTMLAttributes.rel
      },
      class: {
        default: this.options.HTMLAttributes.class
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "a[href]",
        getAttrs: (n) => {
          const e = n.getAttribute("href");
          return !e || !this.options.isAllowedUri(e, {
            defaultValidate: (t) => !!wn(t, this.options.protocols),
            protocols: this.options.protocols,
            defaultProtocol: this.options.defaultProtocol
          }) ? !1 : null;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return this.options.isAllowedUri(n.href, {
      defaultValidate: (e) => !!wn(e, this.options.protocols),
      protocols: this.options.protocols,
      defaultProtocol: this.options.defaultProtocol
    }) ? ["a", ie(this.options.HTMLAttributes, n), 0] : [
      "a",
      ie(this.options.HTMLAttributes, { ...n, href: "" }),
      0
    ];
  },
  addCommands() {
    return {
      setLink: (n) => ({ chain: e }) => {
        const { href: t } = n;
        return this.options.isAllowedUri(t, {
          defaultValidate: (r) => !!wn(r, this.options.protocols),
          protocols: this.options.protocols,
          defaultProtocol: this.options.defaultProtocol
        }) ? e().setMark(this.name, n).setMeta("preventAutolink", !0).run() : !1;
      },
      toggleLink: (n) => ({ chain: e }) => {
        const { href: t } = n;
        return this.options.isAllowedUri(t, {
          defaultValidate: (r) => !!wn(r, this.options.protocols),
          protocols: this.options.protocols,
          defaultProtocol: this.options.defaultProtocol
        }) ? e().toggleMark(this.name, n, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run() : !1;
      },
      unsetLink: () => ({ chain: n }) => n().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
    };
  },
  addPasteRules() {
    return [
      zn({
        find: (n) => {
          const e = [];
          if (n) {
            const { protocols: t, defaultProtocol: r } = this.options, i = Yh(n).filter((o) => o.isLink && this.options.isAllowedUri(o.value, {
              defaultValidate: (s) => !!wn(s, t),
              protocols: t,
              defaultProtocol: r
            }));
            i.length && i.forEach((o) => e.push({
              text: o.value,
              data: {
                href: o.href
              },
              index: o.start
            }));
          }
          return e;
        },
        type: this.type,
        getAttributes: (n) => {
          var e;
          return {
            href: (e = n.data) === null || e === void 0 ? void 0 : e.href
          };
        }
      })
    ];
  },
  addProseMirrorPlugins() {
    const n = [], { protocols: e, defaultProtocol: t } = this.options;
    return this.options.autolink && n.push(yA({
      type: this.type,
      defaultProtocol: this.options.defaultProtocol,
      validate: (r) => this.options.isAllowedUri(r, {
        defaultValidate: (i) => !!wn(i, e),
        protocols: e,
        defaultProtocol: t
      }),
      shouldAutoLink: this.options.shouldAutoLink
    })), this.options.openOnClick === !0 && n.push(bA({
      type: this.type
    })), this.options.linkOnPaste && n.push(vA({
      editor: this.editor,
      defaultProtocol: this.options.defaultProtocol,
      type: this.type
    })), n;
  }
}), xA = {
  props: {
    value: {
      type: String,
      default: void 0
    },
    target: {
      type: String,
      default: "_blank"
    },
    rel: {
      type: String,
      default: void 0
    },
    editor: {
      type: Object,
      required: !0
    },
    destroy: {
      type: Function,
      default: void 0
    }
  },
  data() {
    return {
      attrs: this.generateLinkAttrs(),
      dialog: !1
    };
  },
  computed: {
    isDisabled() {
      const { href: n, target: e, rel: t } = this.attrs;
      return n ? this.value === n && this.target === e && this.rel === t : !0;
    }
  },
  methods: {
    generateLinkAttrs() {
      return {
        href: "",
        target: "_blank",
        rel: ""
      };
    },
    apply() {
      const { href: n, target: e, rel: t } = this.attrs;
      if (!Ph(n)) {
        alert(this.$t("editor.link.dialog.messages.invalidUrl"));
        return;
      }
      n && this.editor.chain().focus().extendMarkRange("link").setLink({ href: n, target: e, rel: t }).run(), this.close();
    },
    close() {
      this.dialog = !1, this.attrs = this.generateLinkAttrs(), setTimeout(() => {
        var n;
        return (n = this.destroy) == null ? void 0 : n.call(this);
      }, 300);
    }
  },
  watch: {
    dialog(n) {
      n && (this.attrs = {
        href: this.value,
        target: this.target,
        rel: this.rel
      });
    }
  }
}, kA = { class: "headline" };
function CA(n, e, t, r, i, o) {
  const s = k("v-spacer"), l = k("v-icon"), a = k("v-btn"), c = k("v-toolbar"), d = k("v-text-field"), u = k("v-checkbox"), f = k("v-card-text"), p = k("v-card-actions"), h = k("v-card"), m = k("v-dialog");
  return N(), H(m, {
    modelValue: i.dialog,
    "onUpdate:modelValue": e[3] || (e[3] = (g) => i.dialog = g),
    "max-width": "400",
    activator: "parent",
    "onClick:outside": o.close
  }, {
    default: E(() => [
      O(h, null, {
        default: E(() => [
          O(c, {
            class: "mb-5 pl-5 pr-2",
            density: "compact"
          }, {
            default: E(() => [
              dn("span", kA, De(n.$t("editor.link.dialog.title")), 1),
              O(s),
              O(a, {
                class: "mx-0",
                icon: "",
                onClick: o.close
              }, {
                default: E(() => [
                  O(l, { icon: "mdi-close" })
                ]),
                _: 1
              }, 8, ["onClick"])
            ]),
            _: 1
          }),
          O(f, null, {
            default: E(() => [
              O(d, {
                density: "compact",
                variant: "outlined",
                modelValue: i.attrs.href,
                "onUpdate:modelValue": e[0] || (e[0] = (g) => i.attrs.href = g),
                label: n.$t("editor.link.dialog.link"),
                autofocus: ""
              }, null, 8, ["modelValue", "label"]),
              O(d, {
                density: "compact",
                variant: "outlined",
                modelValue: i.attrs.rel,
                "onUpdate:modelValue": e[1] || (e[1] = (g) => i.attrs.rel = g),
                label: n.$t("editor.link.dialog.rel"),
                "hide-details": ""
              }, null, 8, ["modelValue", "label"]),
              O(u, {
                class: "mt-2",
                style: { "margin-left": "0", "padding-left": "0" },
                density: "compact",
                variant: "outlined",
                modelValue: i.attrs.target,
                "onUpdate:modelValue": e[2] || (e[2] = (g) => i.attrs.target = g),
                label: n.$t("editor.link.dialog.openInNewTab"),
                "false-value": "_self",
                "true-value": "_blank"
              }, null, 8, ["modelValue", "label"])
            ]),
            _: 1
          }),
          O(p, null, {
            default: E(() => [
              O(a, {
                disabled: o.isDisabled,
                onClick: o.apply
              }, {
                default: E(() => [
                  rt(De(n.$t("editor.link.dialog.button.apply")), 1)
                ]),
                _: 1
              }, 8, ["disabled", "onClick"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["modelValue", "onClick:outside"]);
}
const TA = /* @__PURE__ */ fe(xA, [["render", CA]]), AA = {
  components: {
    ActionButton: J
  },
  props: {
    editor: {
      type: Object,
      required: !0
    },
    icon: {
      type: String,
      default: void 0
    },
    tooltip: {
      type: String,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    color: {
      type: String,
      default: void 0
    },
    action: {
      type: Function,
      default: void 0
    },
    isActive: {
      type: Function,
      default: void 0
    }
  },
  data() {
    return {
      attrs: {
        href: void 0,
        target: void 0,
        rel: void 0
      }
    };
  },
  methods: {
    onAction() {
      const { href: n, target: e, rel: t } = this.editor.getAttributes("link");
      this.attrs = {
        href: n,
        target: e,
        rel: t
      };
    }
  }
};
function MA(n, e, t, r, i, o) {
  const s = k("action-button");
  return N(), H(s, {
    icon: t.icon,
    tooltip: t.tooltip,
    disabled: t.disabled,
    color: t.color,
    "is-active": t.isActive,
    action: o.onAction
  }, {
    default: E(() => [
      ki(n.$slots, "dialog", {
        props: { editor: t.editor, value: i.attrs.href, ...i.attrs }
      })
    ]),
    _: 3
  }, 8, ["icon", "tooltip", "disabled", "color", "is-active", "action"]);
}
const EA = /* @__PURE__ */ fe(AA, [["render", MA]]);
SA.extend({
  // Add options to override default link behavior
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      openOnClick: !1,
      // By default, links won't open on click
      dialogComponent: () => TA,
      // Link dialog component
      button: ({ editor: e, extension: t, t: r }) => {
        const { dialogComponent: i } = t.options;
        return {
          component: EA,
          // Custom action button
          componentProps: {
            isActive: () => e.isActive("link") || !1,
            // Check if the link is active
            disabled: !e.can().setLink({ href: "" }),
            // Disable if the link can't be set
            icon: "mdi-link-variant-plus",
            // Icon for the button
            tooltip: r("editor.link.tooltip")
            // Tooltip text for the button
          },
          componentSlots: {
            dialog: i()
            // Insert the dialog component into the button
          }
        };
      }
    };
  }
});
const OA = "listItem", Fu = "textStyle", Hu = /^(\d+)\.\s$/, NA = ue.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (n) => n.hasAttribute("start") ? parseInt(n.getAttribute("start") || "", 10) : 1
      },
      type: {
        default: void 0,
        parseHTML: (n) => n.getAttribute("type")
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "ol"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    const { start: e, ...t } = n;
    return e === 1 ? ["ol", ie(this.options.HTMLAttributes, t), 0] : ["ol", ie(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(OA, this.editor.getAttributes(Fu)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    let n = fi({
      find: Hu,
      type: this.type,
      getAttributes: (e) => ({ start: +e[1] }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1]
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = fi({
      find: Hu,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: (e) => ({ start: +e[1], ...this.editor.getAttributes(Fu) }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1],
      editor: this.editor
    })), [
      n
    ];
  }
});
NA.extend({
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      button: ({ editor: e, t }) => ({
        component: J,
        componentProps: {
          action: () => e.chain().focus().toggleOrderedList().run(),
          isActive: () => e.isActive("orderedList") || !1,
          disabled: !e.can().toggleOrderedList(),
          icon: "mdi-format-list-numbered",
          tooltip: t("editor.orderedlist.tooltip")
        }
      })
    };
  }
});
const DA = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, _A = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, RA = ot.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (n) => n.includes("line-through") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["s", ie(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setStrike: () => ({ commands: n }) => n.setMark(this.name),
      toggleStrike: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetStrike: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-s": () => this.editor.commands.toggleStrike()
    };
  },
  addInputRules() {
    return [
      yr({
        find: DA,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      zn({
        find: _A,
        type: this.type
      })
    ];
  }
});
RA.extend({
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      button: ({ editor: e, t }) => ({
        component: J,
        componentProps: {
          action: () => e.chain().focus().toggleStrike().run(),
          isActive: () => e.isActive("strike") || !1,
          disabled: !e.can().toggleStrike(),
          icon: "mdi-format-strikethrough",
          tooltip: t("editor.strike.tooltip")
        }
      })
    };
  }
});
var ia, oa;
if (typeof WeakMap < "u") {
  let n = /* @__PURE__ */ new WeakMap();
  ia = (e) => n.get(e), oa = (e, t) => (n.set(e, t), t);
} else {
  const n = [];
  let t = 0;
  ia = (r) => {
    for (let i = 0; i < n.length; i += 2)
      if (n[i] == r) return n[i + 1];
  }, oa = (r, i) => (t == 10 && (t = 0), n[t++] = r, n[t++] = i);
}
var ce = class {
  constructor(n, e, t, r) {
    this.width = n, this.height = e, this.map = t, this.problems = r;
  }
  // Find the dimensions of the cell at the given position.
  findCell(n) {
    for (let e = 0; e < this.map.length; e++) {
      const t = this.map[e];
      if (t != n) continue;
      const r = e % this.width, i = e / this.width | 0;
      let o = r + 1, s = i + 1;
      for (let l = 1; o < this.width && this.map[e + l] == t; l++)
        o++;
      for (let l = 1; s < this.height && this.map[e + this.width * l] == t; l++)
        s++;
      return { left: r, top: i, right: o, bottom: s };
    }
    throw new RangeError(`No cell with offset ${n} found`);
  }
  // Find the left side of the cell at the given position.
  colCount(n) {
    for (let e = 0; e < this.map.length; e++)
      if (this.map[e] == n)
        return e % this.width;
    throw new RangeError(`No cell with offset ${n} found`);
  }
  // Find the next cell in the given direction, starting from the cell
  // at `pos`, if any.
  nextCell(n, e, t) {
    const { left: r, right: i, top: o, bottom: s } = this.findCell(n);
    return e == "horiz" ? (t < 0 ? r == 0 : i == this.width) ? null : this.map[o * this.width + (t < 0 ? r - 1 : i)] : (t < 0 ? o == 0 : s == this.height) ? null : this.map[r + this.width * (t < 0 ? o - 1 : s)];
  }
  // Get the rectangle spanning the two given cells.
  rectBetween(n, e) {
    const {
      left: t,
      right: r,
      top: i,
      bottom: o
    } = this.findCell(n), {
      left: s,
      right: l,
      top: a,
      bottom: c
    } = this.findCell(e);
    return {
      left: Math.min(t, s),
      top: Math.min(i, a),
      right: Math.max(r, l),
      bottom: Math.max(o, c)
    };
  }
  // Return the position of all cells that have the top left corner in
  // the given rectangle.
  cellsInRect(n) {
    const e = [], t = {};
    for (let r = n.top; r < n.bottom; r++)
      for (let i = n.left; i < n.right; i++) {
        const o = r * this.width + i, s = this.map[o];
        t[s] || (t[s] = !0, !(i == n.left && i && this.map[o - 1] == s || r == n.top && r && this.map[o - this.width] == s) && e.push(s));
      }
    return e;
  }
  // Return the position at which the cell at the given row and column
  // starts, or would start, if a cell started there.
  positionAt(n, e, t) {
    for (let r = 0, i = 0; ; r++) {
      const o = i + t.child(r).nodeSize;
      if (r == n) {
        let s = e + n * this.width;
        const l = (n + 1) * this.width;
        for (; s < l && this.map[s] < i; ) s++;
        return s == l ? o - 1 : this.map[s];
      }
      i = o;
    }
  }
  // Find the table map for the given table node.
  static get(n) {
    return ia(n) || oa(n, IA(n));
  }
};
function IA(n) {
  if (n.type.spec.tableRole != "table")
    throw new RangeError("Not a table node: " + n.type.name);
  const e = PA(n), t = n.childCount, r = [];
  let i = 0, o = null;
  const s = [];
  for (let c = 0, d = e * t; c < d; c++) r[c] = 0;
  for (let c = 0, d = 0; c < t; c++) {
    const u = n.child(c);
    d++;
    for (let h = 0; ; h++) {
      for (; i < r.length && r[i] != 0; ) i++;
      if (h == u.childCount) break;
      const m = u.child(h), { colspan: g, rowspan: y, colwidth: w } = m.attrs;
      for (let A = 0; A < y; A++) {
        if (A + c >= t) {
          (o || (o = [])).push({
            type: "overlong_rowspan",
            pos: d,
            n: y - A
          });
          break;
        }
        const b = i + A * e;
        for (let C = 0; C < g; C++) {
          r[b + C] == 0 ? r[b + C] = d : (o || (o = [])).push({
            type: "collision",
            row: c,
            pos: d,
            n: g - C
          });
          const v = w && w[C];
          if (v) {
            const _ = (b + C) % e * 2, z = s[_];
            z == null || z != v && s[_ + 1] == 1 ? (s[_] = v, s[_ + 1] = 1) : z == v && s[_ + 1]++;
          }
        }
      }
      i += g, d += m.nodeSize;
    }
    const f = (c + 1) * e;
    let p = 0;
    for (; i < f; ) r[i++] == 0 && p++;
    p && (o || (o = [])).push({ type: "missing", row: c, n: p }), d++;
  }
  (e === 0 || t === 0) && (o || (o = [])).push({ type: "zero_sized" });
  const l = new ce(e, t, r, o);
  let a = !1;
  for (let c = 0; !a && c < s.length; c += 2)
    s[c] != null && s[c + 1] < t && (a = !0);
  return a && LA(l, s, n), l;
}
function PA(n) {
  let e = -1, t = !1;
  for (let r = 0; r < n.childCount; r++) {
    const i = n.child(r);
    let o = 0;
    if (t)
      for (let s = 0; s < r; s++) {
        const l = n.child(s);
        for (let a = 0; a < l.childCount; a++) {
          const c = l.child(a);
          s + c.attrs.rowspan > r && (o += c.attrs.colspan);
        }
      }
    for (let s = 0; s < i.childCount; s++) {
      const l = i.child(s);
      o += l.attrs.colspan, l.attrs.rowspan > 1 && (t = !0);
    }
    e == -1 ? e = o : e != o && (e = Math.max(e, o));
  }
  return e;
}
function LA(n, e, t) {
  n.problems || (n.problems = []);
  const r = {};
  for (let i = 0; i < n.map.length; i++) {
    const o = n.map[i];
    if (r[o]) continue;
    r[o] = !0;
    const s = t.nodeAt(o);
    if (!s)
      throw new RangeError(`No cell with offset ${o} found`);
    let l = null;
    const a = s.attrs;
    for (let c = 0; c < a.colspan; c++) {
      const d = (i + c) % n.width, u = e[d * 2];
      u != null && (!a.colwidth || a.colwidth[c] != u) && ((l || (l = BA(a)))[c] = u);
    }
    l && n.problems.unshift({
      type: "colwidth mismatch",
      pos: o,
      colwidth: l
    });
  }
}
function BA(n) {
  if (n.colwidth) return n.colwidth.slice();
  const e = [];
  for (let t = 0; t < n.colspan; t++) e.push(0);
  return e;
}
function Ee(n) {
  let e = n.cached.tableNodeTypes;
  if (!e) {
    e = n.cached.tableNodeTypes = {};
    for (const t in n.nodes) {
      const r = n.nodes[t], i = r.spec.tableRole;
      i && (e[i] = r);
    }
  }
  return e;
}
var en = new de("selectingCells");
function Er(n) {
  for (let e = n.depth - 1; e > 0; e--)
    if (n.node(e).type.spec.tableRole == "row")
      return n.node(0).resolve(n.before(e + 1));
  return null;
}
function zA(n) {
  for (let e = n.depth; e > 0; e--) {
    const t = n.node(e).type.spec.tableRole;
    if (t === "cell" || t === "header_cell") return n.node(e);
  }
  return null;
}
function st(n) {
  const e = n.selection.$head;
  for (let t = e.depth; t > 0; t--)
    if (e.node(t).type.spec.tableRole == "row") return !0;
  return !1;
}
function Ds(n) {
  const e = n.selection;
  if ("$anchorCell" in e && e.$anchorCell)
    return e.$anchorCell.pos > e.$headCell.pos ? e.$anchorCell : e.$headCell;
  if ("node" in e && e.node && e.node.type.spec.tableRole == "cell")
    return e.$anchor;
  const t = Er(e.$head) || FA(e.$head);
  if (t)
    return t;
  throw new RangeError(`No cell found around position ${e.head}`);
}
function FA(n) {
  for (let e = n.nodeAfter, t = n.pos; e; e = e.firstChild, t++) {
    const r = e.type.spec.tableRole;
    if (r == "cell" || r == "header_cell") return n.doc.resolve(t);
  }
  for (let e = n.nodeBefore, t = n.pos; e; e = e.lastChild, t--) {
    const r = e.type.spec.tableRole;
    if (r == "cell" || r == "header_cell")
      return n.doc.resolve(t - e.nodeSize);
  }
}
function sa(n) {
  return n.parent.type.spec.tableRole == "row" && !!n.nodeAfter;
}
function HA(n) {
  return n.node(0).resolve(n.pos + n.nodeAfter.nodeSize);
}
function fc(n, e) {
  return n.depth == e.depth && n.pos >= e.start(-1) && n.pos <= e.end(-1);
}
function Xh(n, e, t) {
  const r = n.node(-1), i = ce.get(r), o = n.start(-1), s = i.nextCell(n.pos - o, e, t);
  return s == null ? null : n.node(0).resolve(o + s);
}
function jn(n, e, t = 1) {
  const r = { ...n, colspan: n.colspan - t };
  return r.colwidth && (r.colwidth = r.colwidth.slice(), r.colwidth.splice(e, t), r.colwidth.some((i) => i > 0) || (r.colwidth = null)), r;
}
function Zh(n, e, t = 1) {
  const r = { ...n, colspan: n.colspan + t };
  if (r.colwidth) {
    r.colwidth = r.colwidth.slice();
    for (let i = 0; i < t; i++) r.colwidth.splice(e, 0, 0);
  }
  return r;
}
function VA(n, e, t) {
  const r = Ee(e.type.schema).header_cell;
  for (let i = 0; i < n.height; i++)
    if (e.nodeAt(n.map[t + i * n.width]).type != r)
      return !1;
  return !0;
}
var X = class _t extends B {
  // A table selection is identified by its anchor and head cells. The
  // positions given to this constructor should point _before_ two
  // cells in the same table. They may be the same, to select a single
  // cell.
  constructor(e, t = e) {
    const r = e.node(-1), i = ce.get(r), o = e.start(-1), s = i.rectBetween(
      e.pos - o,
      t.pos - o
    ), l = e.node(0), a = i.cellsInRect(s).filter((d) => d != t.pos - o);
    a.unshift(t.pos - o);
    const c = a.map((d) => {
      const u = r.nodeAt(d);
      if (!u)
        throw RangeError(`No cell with offset ${d} found`);
      const f = o + d + 1;
      return new Lf(
        l.resolve(f),
        l.resolve(f + u.content.size)
      );
    });
    super(c[0].$from, c[0].$to, c), this.$anchorCell = e, this.$headCell = t;
  }
  map(e, t) {
    const r = e.resolve(t.map(this.$anchorCell.pos)), i = e.resolve(t.map(this.$headCell.pos));
    if (sa(r) && sa(i) && fc(r, i)) {
      const o = this.$anchorCell.node(-1) != r.node(-1);
      return o && this.isRowSelection() ? _t.rowSelection(r, i) : o && this.isColSelection() ? _t.colSelection(r, i) : new _t(r, i);
    }
    return L.between(r, i);
  }
  // Returns a rectangular slice of table rows containing the selected
  // cells.
  content() {
    const e = this.$anchorCell.node(-1), t = ce.get(e), r = this.$anchorCell.start(-1), i = t.rectBetween(
      this.$anchorCell.pos - r,
      this.$headCell.pos - r
    ), o = {}, s = [];
    for (let a = i.top; a < i.bottom; a++) {
      const c = [];
      for (let d = a * t.width + i.left, u = i.left; u < i.right; u++, d++) {
        const f = t.map[d];
        if (o[f]) continue;
        o[f] = !0;
        const p = t.findCell(f);
        let h = e.nodeAt(f);
        if (!h)
          throw RangeError(`No cell with offset ${f} found`);
        const m = i.left - p.left, g = p.right - i.right;
        if (m > 0 || g > 0) {
          let y = h.attrs;
          if (m > 0 && (y = jn(y, 0, m)), g > 0 && (y = jn(
            y,
            y.colspan - g,
            g
          )), p.left < i.left) {
            if (h = h.type.createAndFill(y), !h)
              throw RangeError(
                `Could not create cell with attrs ${JSON.stringify(y)}`
              );
          } else
            h = h.type.create(y, h.content);
        }
        if (p.top < i.top || p.bottom > i.bottom) {
          const y = {
            ...h.attrs,
            rowspan: Math.min(p.bottom, i.bottom) - Math.max(p.top, i.top)
          };
          p.top < i.top ? h = h.type.createAndFill(y) : h = h.type.create(y, h.content);
        }
        c.push(h);
      }
      s.push(e.child(a).copy(x.from(c)));
    }
    const l = this.isColSelection() && this.isRowSelection() ? e : s;
    return new M(x.from(l), 1, 1);
  }
  replace(e, t = M.empty) {
    const r = e.steps.length, i = this.ranges;
    for (let s = 0; s < i.length; s++) {
      const { $from: l, $to: a } = i[s], c = e.mapping.slice(r);
      e.replace(
        c.map(l.pos),
        c.map(a.pos),
        s ? M.empty : t
      );
    }
    const o = B.findFrom(
      e.doc.resolve(e.mapping.slice(r).map(this.to)),
      -1
    );
    o && e.setSelection(o);
  }
  replaceWith(e, t) {
    this.replace(e, new M(x.from(t), 0, 0));
  }
  forEachCell(e) {
    const t = this.$anchorCell.node(-1), r = ce.get(t), i = this.$anchorCell.start(-1), o = r.cellsInRect(
      r.rectBetween(
        this.$anchorCell.pos - i,
        this.$headCell.pos - i
      )
    );
    for (let s = 0; s < o.length; s++)
      e(t.nodeAt(o[s]), i + o[s]);
  }
  // True if this selection goes all the way from the top to the
  // bottom of the table.
  isColSelection() {
    const e = this.$anchorCell.index(-1), t = this.$headCell.index(-1);
    if (Math.min(e, t) > 0) return !1;
    const r = e + this.$anchorCell.nodeAfter.attrs.rowspan, i = t + this.$headCell.nodeAfter.attrs.rowspan;
    return Math.max(r, i) == this.$headCell.node(-1).childCount;
  }
  // Returns the smallest column selection that covers the given anchor
  // and head cell.
  static colSelection(e, t = e) {
    const r = e.node(-1), i = ce.get(r), o = e.start(-1), s = i.findCell(e.pos - o), l = i.findCell(t.pos - o), a = e.node(0);
    return s.top <= l.top ? (s.top > 0 && (e = a.resolve(o + i.map[s.left])), l.bottom < i.height && (t = a.resolve(
      o + i.map[i.width * (i.height - 1) + l.right - 1]
    ))) : (l.top > 0 && (t = a.resolve(o + i.map[l.left])), s.bottom < i.height && (e = a.resolve(
      o + i.map[i.width * (i.height - 1) + s.right - 1]
    ))), new _t(e, t);
  }
  // True if this selection goes all the way from the left to the
  // right of the table.
  isRowSelection() {
    const e = this.$anchorCell.node(-1), t = ce.get(e), r = this.$anchorCell.start(-1), i = t.colCount(this.$anchorCell.pos - r), o = t.colCount(this.$headCell.pos - r);
    if (Math.min(i, o) > 0) return !1;
    const s = i + this.$anchorCell.nodeAfter.attrs.colspan, l = o + this.$headCell.nodeAfter.attrs.colspan;
    return Math.max(s, l) == t.width;
  }
  eq(e) {
    return e instanceof _t && e.$anchorCell.pos == this.$anchorCell.pos && e.$headCell.pos == this.$headCell.pos;
  }
  // Returns the smallest row selection that covers the given anchor
  // and head cell.
  static rowSelection(e, t = e) {
    const r = e.node(-1), i = ce.get(r), o = e.start(-1), s = i.findCell(e.pos - o), l = i.findCell(t.pos - o), a = e.node(0);
    return s.left <= l.left ? (s.left > 0 && (e = a.resolve(
      o + i.map[s.top * i.width]
    )), l.right < i.width && (t = a.resolve(
      o + i.map[i.width * (l.top + 1) - 1]
    ))) : (l.left > 0 && (t = a.resolve(o + i.map[l.top * i.width])), s.right < i.width && (e = a.resolve(
      o + i.map[i.width * (s.top + 1) - 1]
    ))), new _t(e, t);
  }
  toJSON() {
    return {
      type: "cell",
      anchor: this.$anchorCell.pos,
      head: this.$headCell.pos
    };
  }
  static fromJSON(e, t) {
    return new _t(e.resolve(t.anchor), e.resolve(t.head));
  }
  static create(e, t, r = t) {
    return new _t(e.resolve(t), e.resolve(r));
  }
  getBookmark() {
    return new $A(this.$anchorCell.pos, this.$headCell.pos);
  }
};
X.prototype.visible = !1;
B.jsonID("cell", X);
var $A = class Qh {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new Qh(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    const t = e.resolve(this.anchor), r = e.resolve(this.head);
    return t.parent.type.spec.tableRole == "row" && r.parent.type.spec.tableRole == "row" && t.index() < t.parent.childCount && r.index() < r.parent.childCount && fc(t, r) ? new X(t, r) : B.near(r, 1);
  }
};
function jA(n) {
  if (!(n.selection instanceof X)) return null;
  const e = [];
  return n.selection.forEachCell((t, r) => {
    e.push(
      Te.node(r, r + t.nodeSize, { class: "selectedCell" })
    );
  }), ee.create(n.doc, e);
}
function WA({ $from: n, $to: e }) {
  if (n.pos == e.pos || n.pos < e.pos - 6) return !1;
  let t = n.pos, r = e.pos, i = n.depth;
  for (; i >= 0 && !(n.after(i + 1) < n.end(i)); i--, t++)
    ;
  for (let o = e.depth; o >= 0 && !(e.before(o + 1) > e.start(o)); o--, r--)
    ;
  return t == r && /row|table/.test(n.node(i).type.spec.tableRole);
}
function UA({ $from: n, $to: e }) {
  let t, r;
  for (let i = n.depth; i > 0; i--) {
    const o = n.node(i);
    if (o.type.spec.tableRole === "cell" || o.type.spec.tableRole === "header_cell") {
      t = o;
      break;
    }
  }
  for (let i = e.depth; i > 0; i--) {
    const o = e.node(i);
    if (o.type.spec.tableRole === "cell" || o.type.spec.tableRole === "header_cell") {
      r = o;
      break;
    }
  }
  return t !== r && e.parentOffset === 0;
}
function KA(n, e, t) {
  const r = (e || n).selection, i = (e || n).doc;
  let o, s;
  if (r instanceof P && (s = r.node.type.spec.tableRole)) {
    if (s == "cell" || s == "header_cell")
      o = X.create(i, r.from);
    else if (s == "row") {
      const l = i.resolve(r.from + 1);
      o = X.rowSelection(l, l);
    } else if (!t) {
      const l = ce.get(r.node), a = r.from + 1, c = a + l.map[l.width * l.height - 1];
      o = X.create(i, a + 1, c);
    }
  } else r instanceof L && WA(r) ? o = L.create(i, r.from) : r instanceof L && UA(r) && (o = L.create(i, r.$from.start(), r.$from.end()));
  return o && (e || (e = n.tr)).setSelection(o), e;
}
var qA = new de("fix-tables");
function em(n, e, t, r) {
  const i = n.childCount, o = e.childCount;
  e: for (let s = 0, l = 0; s < o; s++) {
    const a = e.child(s);
    for (let c = l, d = Math.min(i, s + 3); c < d; c++)
      if (n.child(c) == a) {
        l = c + 1, t += a.nodeSize;
        continue e;
      }
    r(a, t), l < i && n.child(l).sameMarkup(a) ? em(n.child(l), a, t + 1, r) : a.nodesBetween(0, a.content.size, r, t + 1), t += a.nodeSize;
  }
}
function tm(n, e) {
  let t;
  const r = (i, o) => {
    i.type.spec.tableRole == "table" && (t = GA(n, i, o, t));
  };
  return e ? e.doc != n.doc && em(e.doc, n.doc, 0, r) : n.doc.descendants(r), t;
}
function GA(n, e, t, r) {
  const i = ce.get(e);
  if (!i.problems) return r;
  r || (r = n.tr);
  const o = [];
  for (let a = 0; a < i.height; a++) o.push(0);
  for (let a = 0; a < i.problems.length; a++) {
    const c = i.problems[a];
    if (c.type == "collision") {
      const d = e.nodeAt(c.pos);
      if (!d) continue;
      const u = d.attrs;
      for (let f = 0; f < u.rowspan; f++) o[c.row + f] += c.n;
      r.setNodeMarkup(
        r.mapping.map(t + 1 + c.pos),
        null,
        jn(u, u.colspan - c.n, c.n)
      );
    } else if (c.type == "missing")
      o[c.row] += c.n;
    else if (c.type == "overlong_rowspan") {
      const d = e.nodeAt(c.pos);
      if (!d) continue;
      r.setNodeMarkup(r.mapping.map(t + 1 + c.pos), null, {
        ...d.attrs,
        rowspan: d.attrs.rowspan - c.n
      });
    } else if (c.type == "colwidth mismatch") {
      const d = e.nodeAt(c.pos);
      if (!d) continue;
      r.setNodeMarkup(r.mapping.map(t + 1 + c.pos), null, {
        ...d.attrs,
        colwidth: c.colwidth
      });
    } else if (c.type == "zero_sized") {
      const d = r.mapping.map(t);
      r.delete(d, d + e.nodeSize);
    }
  }
  let s, l;
  for (let a = 0; a < o.length; a++)
    o[a] && (s == null && (s = a), l = a);
  for (let a = 0, c = t + 1; a < i.height; a++) {
    const d = e.child(a), u = c + d.nodeSize, f = o[a];
    if (f > 0) {
      let p = "cell";
      d.firstChild && (p = d.firstChild.type.spec.tableRole);
      const h = [];
      for (let g = 0; g < f; g++) {
        const y = Ee(n.schema)[p].createAndFill();
        y && h.push(y);
      }
      const m = (a == 0 || s == a - 1) && l == a ? c + 1 : u - 1;
      r.insert(r.mapping.map(m), h);
    }
    c = u;
  }
  return r.setMeta(qA, { fixTables: !0 });
}
function kt(n) {
  const e = n.selection, t = Ds(n), r = t.node(-1), i = t.start(-1), o = ce.get(r);
  return { ...e instanceof X ? o.rectBetween(
    e.$anchorCell.pos - i,
    e.$headCell.pos - i
  ) : o.findCell(t.pos - i), tableStart: i, map: o, table: r };
}
function nm(n, { map: e, tableStart: t, table: r }, i) {
  let o = i > 0 ? -1 : 0;
  VA(e, r, i + o) && (o = i == 0 || i == e.width ? null : 0);
  for (let s = 0; s < e.height; s++) {
    const l = s * e.width + i;
    if (i > 0 && i < e.width && e.map[l - 1] == e.map[l]) {
      const a = e.map[l], c = r.nodeAt(a);
      n.setNodeMarkup(
        n.mapping.map(t + a),
        null,
        Zh(c.attrs, i - e.colCount(a))
      ), s += c.attrs.rowspan - 1;
    } else {
      const a = o == null ? Ee(r.type.schema).cell : r.nodeAt(e.map[l + o]).type, c = e.positionAt(s, i, r);
      n.insert(n.mapping.map(t + c), a.createAndFill());
    }
  }
  return n;
}
function JA(n, e) {
  if (!st(n)) return !1;
  if (e) {
    const t = kt(n);
    e(nm(n.tr, t, t.left));
  }
  return !0;
}
function YA(n, e) {
  if (!st(n)) return !1;
  if (e) {
    const t = kt(n);
    e(nm(n.tr, t, t.right));
  }
  return !0;
}
function XA(n, { map: e, table: t, tableStart: r }, i) {
  const o = n.mapping.maps.length;
  for (let s = 0; s < e.height; ) {
    const l = s * e.width + i, a = e.map[l], c = t.nodeAt(a), d = c.attrs;
    if (i > 0 && e.map[l - 1] == a || i < e.width - 1 && e.map[l + 1] == a)
      n.setNodeMarkup(
        n.mapping.slice(o).map(r + a),
        null,
        jn(d, i - e.colCount(a))
      );
    else {
      const u = n.mapping.slice(o).map(r + a);
      n.delete(u, u + c.nodeSize);
    }
    s += d.rowspan;
  }
}
function ZA(n, e) {
  if (!st(n)) return !1;
  if (e) {
    const t = kt(n), r = n.tr;
    if (t.left == 0 && t.right == t.map.width) return !1;
    for (let i = t.right - 1; XA(r, t, i), i != t.left; i--) {
      const o = t.tableStart ? r.doc.nodeAt(t.tableStart - 1) : r.doc;
      if (!o)
        throw RangeError("No table found");
      t.table = o, t.map = ce.get(o);
    }
    e(r);
  }
  return !0;
}
function QA(n, e, t) {
  var r;
  const i = Ee(e.type.schema).header_cell;
  for (let o = 0; o < n.width; o++)
    if (((r = e.nodeAt(n.map[o + t * n.width])) == null ? void 0 : r.type) != i)
      return !1;
  return !0;
}
function rm(n, { map: e, tableStart: t, table: r }, i) {
  var o;
  let s = t;
  for (let c = 0; c < i; c++) s += r.child(c).nodeSize;
  const l = [];
  let a = i > 0 ? -1 : 0;
  QA(e, r, i + a) && (a = i == 0 || i == e.height ? null : 0);
  for (let c = 0, d = e.width * i; c < e.width; c++, d++)
    if (i > 0 && i < e.height && e.map[d] == e.map[d - e.width]) {
      const u = e.map[d], f = r.nodeAt(u).attrs;
      n.setNodeMarkup(t + u, null, {
        ...f,
        rowspan: f.rowspan + 1
      }), c += f.colspan - 1;
    } else {
      const u = a == null ? Ee(r.type.schema).cell : (o = r.nodeAt(e.map[d + a * e.width])) == null ? void 0 : o.type, f = u == null ? void 0 : u.createAndFill();
      f && l.push(f);
    }
  return n.insert(s, Ee(r.type.schema).row.create(null, l)), n;
}
function eM(n, e) {
  if (!st(n)) return !1;
  if (e) {
    const t = kt(n);
    e(rm(n.tr, t, t.top));
  }
  return !0;
}
function tM(n, e) {
  if (!st(n)) return !1;
  if (e) {
    const t = kt(n);
    e(rm(n.tr, t, t.bottom));
  }
  return !0;
}
function nM(n, { map: e, table: t, tableStart: r }, i) {
  let o = 0;
  for (let c = 0; c < i; c++) o += t.child(c).nodeSize;
  const s = o + t.child(i).nodeSize, l = n.mapping.maps.length;
  n.delete(o + r, s + r);
  const a = /* @__PURE__ */ new Set();
  for (let c = 0, d = i * e.width; c < e.width; c++, d++) {
    const u = e.map[d];
    if (!a.has(u)) {
      if (a.add(u), i > 0 && u == e.map[d - e.width]) {
        const f = t.nodeAt(u).attrs;
        n.setNodeMarkup(n.mapping.slice(l).map(u + r), null, {
          ...f,
          rowspan: f.rowspan - 1
        }), c += f.colspan - 1;
      } else if (i < e.height && u == e.map[d + e.width]) {
        const f = t.nodeAt(u), p = f.attrs, h = f.type.create(
          { ...p, rowspan: f.attrs.rowspan - 1 },
          f.content
        ), m = e.positionAt(i + 1, c, t);
        n.insert(n.mapping.slice(l).map(r + m), h), c += p.colspan - 1;
      }
    }
  }
}
function rM(n, e) {
  if (!st(n)) return !1;
  if (e) {
    const t = kt(n), r = n.tr;
    if (t.top == 0 && t.bottom == t.map.height) return !1;
    for (let i = t.bottom - 1; nM(r, t, i), i != t.top; i--) {
      const o = t.tableStart ? r.doc.nodeAt(t.tableStart - 1) : r.doc;
      if (!o)
        throw RangeError("No table found");
      t.table = o, t.map = ce.get(t.table);
    }
    e(r);
  }
  return !0;
}
function Vu(n) {
  const e = n.content;
  return e.childCount == 1 && e.child(0).isTextblock && e.child(0).childCount == 0;
}
function iM({ width: n, height: e, map: t }, r) {
  let i = r.top * n + r.left, o = i, s = (r.bottom - 1) * n + r.left, l = i + (r.right - r.left - 1);
  for (let a = r.top; a < r.bottom; a++) {
    if (r.left > 0 && t[o] == t[o - 1] || r.right < n && t[l] == t[l + 1])
      return !0;
    o += n, l += n;
  }
  for (let a = r.left; a < r.right; a++) {
    if (r.top > 0 && t[i] == t[i - n] || r.bottom < e && t[s] == t[s + n])
      return !0;
    i++, s++;
  }
  return !1;
}
function $u(n, e) {
  const t = n.selection;
  if (!(t instanceof X) || t.$anchorCell.pos == t.$headCell.pos)
    return !1;
  const r = kt(n), { map: i } = r;
  if (iM(i, r)) return !1;
  if (e) {
    const o = n.tr, s = {};
    let l = x.empty, a, c;
    for (let d = r.top; d < r.bottom; d++)
      for (let u = r.left; u < r.right; u++) {
        const f = i.map[d * i.width + u], p = r.table.nodeAt(f);
        if (!(s[f] || !p))
          if (s[f] = !0, a == null)
            a = f, c = p;
          else {
            Vu(p) || (l = l.append(p.content));
            const h = o.mapping.map(f + r.tableStart);
            o.delete(h, h + p.nodeSize);
          }
      }
    if (a == null || c == null)
      return !0;
    if (o.setNodeMarkup(a + r.tableStart, null, {
      ...Zh(
        c.attrs,
        c.attrs.colspan,
        r.right - r.left - c.attrs.colspan
      ),
      rowspan: r.bottom - r.top
    }), l.size) {
      const d = a + 1 + c.content.size, u = Vu(c) ? a + 1 : d;
      o.replaceWith(u + r.tableStart, d + r.tableStart, l);
    }
    o.setSelection(
      new X(o.doc.resolve(a + r.tableStart))
    ), e(o);
  }
  return !0;
}
function ju(n, e) {
  const t = Ee(n.schema);
  return oM(({ node: r }) => t[r.type.spec.tableRole])(n, e);
}
function oM(n) {
  return (e, t) => {
    var r;
    const i = e.selection;
    let o, s;
    if (i instanceof X) {
      if (i.$anchorCell.pos != i.$headCell.pos) return !1;
      o = i.$anchorCell.nodeAfter, s = i.$anchorCell.pos;
    } else {
      if (o = zA(i.$from), !o) return !1;
      s = (r = Er(i.$from)) == null ? void 0 : r.pos;
    }
    if (o == null || s == null || o.attrs.colspan == 1 && o.attrs.rowspan == 1)
      return !1;
    if (t) {
      let l = o.attrs;
      const a = [], c = l.colwidth;
      l.rowspan > 1 && (l = { ...l, rowspan: 1 }), l.colspan > 1 && (l = { ...l, colspan: 1 });
      const d = kt(e), u = e.tr;
      for (let p = 0; p < d.right - d.left; p++)
        a.push(
          c ? {
            ...l,
            colwidth: c && c[p] ? [c[p]] : null
          } : l
        );
      let f;
      for (let p = d.top; p < d.bottom; p++) {
        let h = d.map.positionAt(p, d.left, d.table);
        p == d.top && (h += o.nodeSize);
        for (let m = d.left, g = 0; m < d.right; m++, g++)
          m == d.left && p == d.top || u.insert(
            f = u.mapping.map(h + d.tableStart, 1),
            n({ node: o, row: p, col: m }).createAndFill(a[g])
          );
      }
      u.setNodeMarkup(
        s,
        n({ node: o, row: d.top, col: d.left }),
        a[0]
      ), i instanceof X && u.setSelection(
        new X(
          u.doc.resolve(i.$anchorCell.pos),
          f ? u.doc.resolve(f) : void 0
        )
      ), t(u);
    }
    return !0;
  };
}
function sM(n, e) {
  return function(t, r) {
    if (!st(t)) return !1;
    const i = Ds(t);
    if (i.nodeAfter.attrs[n] === e) return !1;
    if (r) {
      const o = t.tr;
      t.selection instanceof X ? t.selection.forEachCell((s, l) => {
        s.attrs[n] !== e && o.setNodeMarkup(l, null, {
          ...s.attrs,
          [n]: e
        });
      }) : o.setNodeMarkup(i.pos, null, {
        ...i.nodeAfter.attrs,
        [n]: e
      }), r(o);
    }
    return !0;
  };
}
function lM(n) {
  return function(e, t) {
    if (!st(e)) return !1;
    if (t) {
      const r = Ee(e.schema), i = kt(e), o = e.tr, s = i.map.cellsInRect(
        n == "column" ? {
          left: i.left,
          top: 0,
          right: i.right,
          bottom: i.map.height
        } : n == "row" ? {
          left: 0,
          top: i.top,
          right: i.map.width,
          bottom: i.bottom
        } : i
      ), l = s.map((a) => i.table.nodeAt(a));
      for (let a = 0; a < s.length; a++)
        l[a].type == r.header_cell && o.setNodeMarkup(
          i.tableStart + s[a],
          r.cell,
          l[a].attrs
        );
      if (o.steps.length == 0)
        for (let a = 0; a < s.length; a++)
          o.setNodeMarkup(
            i.tableStart + s[a],
            r.header_cell,
            l[a].attrs
          );
      t(o);
    }
    return !0;
  };
}
function Wu(n, e, t) {
  const r = e.map.cellsInRect({
    left: 0,
    top: 0,
    right: n == "row" ? e.map.width : 1,
    bottom: n == "column" ? e.map.height : 1
  });
  for (let i = 0; i < r.length; i++) {
    const o = e.table.nodeAt(r[i]);
    if (o && o.type !== t.header_cell)
      return !1;
  }
  return !0;
}
function xi(n, e) {
  return e = e || { useDeprecatedLogic: !1 }, e.useDeprecatedLogic ? lM(n) : function(t, r) {
    if (!st(t)) return !1;
    if (r) {
      const i = Ee(t.schema), o = kt(t), s = t.tr, l = Wu("row", o, i), a = Wu(
        "column",
        o,
        i
      ), d = (n === "column" ? l : n === "row" ? a : !1) ? 1 : 0, u = n == "column" ? {
        left: 0,
        top: d,
        right: 1,
        bottom: o.map.height
      } : n == "row" ? {
        left: d,
        top: 0,
        right: o.map.width,
        bottom: 1
      } : o, f = n == "column" ? a ? i.cell : i.header_cell : n == "row" ? l ? i.cell : i.header_cell : i.cell;
      o.map.cellsInRect(u).forEach((p) => {
        const h = p + o.tableStart, m = s.doc.nodeAt(h);
        m && s.setNodeMarkup(h, f, m.attrs);
      }), r(s);
    }
    return !0;
  };
}
xi("row", {
  useDeprecatedLogic: !0
});
xi("column", {
  useDeprecatedLogic: !0
});
var aM = xi("cell", {
  useDeprecatedLogic: !0
});
function cM(n, e) {
  if (e < 0) {
    const t = n.nodeBefore;
    if (t) return n.pos - t.nodeSize;
    for (let r = n.index(-1) - 1, i = n.before(); r >= 0; r--) {
      const o = n.node(-1).child(r), s = o.lastChild;
      if (s)
        return i - 1 - s.nodeSize;
      i -= o.nodeSize;
    }
  } else {
    if (n.index() < n.parent.childCount - 1)
      return n.pos + n.nodeAfter.nodeSize;
    const t = n.node(-1);
    for (let r = n.indexAfter(-1), i = n.after(); r < t.childCount; r++) {
      const o = t.child(r);
      if (o.childCount) return i + 1;
      i += o.nodeSize;
    }
  }
  return null;
}
function Uu(n) {
  return function(e, t) {
    if (!st(e)) return !1;
    const r = cM(Ds(e), n);
    if (r == null) return !1;
    if (t) {
      const i = e.doc.resolve(r);
      t(
        e.tr.setSelection(L.between(i, HA(i))).scrollIntoView()
      );
    }
    return !0;
  };
}
function dM(n, e) {
  const t = n.selection.$anchor;
  for (let r = t.depth; r > 0; r--)
    if (t.node(r).type.spec.tableRole == "table")
      return e && e(
        n.tr.delete(t.before(r), t.after(r)).scrollIntoView()
      ), !0;
  return !1;
}
function eo(n, e) {
  const t = n.selection;
  if (!(t instanceof X)) return !1;
  if (e) {
    const r = n.tr, i = Ee(n.schema).cell.createAndFill().content;
    t.forEachCell((o, s) => {
      o.content.eq(i) || r.replace(
        r.mapping.map(s + 1),
        r.mapping.map(s + o.nodeSize - 1),
        new M(i, 0, 0)
      );
    }), r.docChanged && e(r);
  }
  return !0;
}
function uM(n) {
  if (!n.size) return null;
  let { content: e, openStart: t, openEnd: r } = n;
  for (; e.childCount == 1 && (t > 0 && r > 0 || e.child(0).type.spec.tableRole == "table"); )
    t--, r--, e = e.child(0).content;
  const i = e.child(0), o = i.type.spec.tableRole, s = i.type.schema, l = [];
  if (o == "row")
    for (let a = 0; a < e.childCount; a++) {
      let c = e.child(a).content;
      const d = a ? 0 : Math.max(0, t - 1), u = a < e.childCount - 1 ? 0 : Math.max(0, r - 1);
      (d || u) && (c = la(
        Ee(s).row,
        new M(c, d, u)
      ).content), l.push(c);
    }
  else if (o == "cell" || o == "header_cell")
    l.push(
      t || r ? la(
        Ee(s).row,
        new M(e, t, r)
      ).content : e
    );
  else
    return null;
  return fM(s, l);
}
function fM(n, e) {
  const t = [];
  for (let i = 0; i < e.length; i++) {
    const o = e[i];
    for (let s = o.childCount - 1; s >= 0; s--) {
      const { rowspan: l, colspan: a } = o.child(s).attrs;
      for (let c = i; c < i + l; c++)
        t[c] = (t[c] || 0) + a;
    }
  }
  let r = 0;
  for (let i = 0; i < t.length; i++) r = Math.max(r, t[i]);
  for (let i = 0; i < t.length; i++)
    if (i >= e.length && e.push(x.empty), t[i] < r) {
      const o = Ee(n).cell.createAndFill(), s = [];
      for (let l = t[i]; l < r; l++)
        s.push(o);
      e[i] = e[i].append(x.from(s));
    }
  return { height: e.length, width: r, rows: e };
}
function la(n, e) {
  const t = n.createAndFill();
  return new ba(t).replace(0, t.content.size, e).doc;
}
function pM({ width: n, height: e, rows: t }, r, i) {
  if (n != r) {
    const o = [], s = [];
    for (let l = 0; l < t.length; l++) {
      const a = t[l], c = [];
      for (let d = o[l] || 0, u = 0; d < r; u++) {
        let f = a.child(u % a.childCount);
        d + f.attrs.colspan > r && (f = f.type.createChecked(
          jn(
            f.attrs,
            f.attrs.colspan,
            d + f.attrs.colspan - r
          ),
          f.content
        )), c.push(f), d += f.attrs.colspan;
        for (let p = 1; p < f.attrs.rowspan; p++)
          o[l + p] = (o[l + p] || 0) + f.attrs.colspan;
      }
      s.push(x.from(c));
    }
    t = s, n = r;
  }
  if (e != i) {
    const o = [];
    for (let s = 0, l = 0; s < i; s++, l++) {
      const a = [], c = t[l % e];
      for (let d = 0; d < c.childCount; d++) {
        let u = c.child(d);
        s + u.attrs.rowspan > i && (u = u.type.create(
          {
            ...u.attrs,
            rowspan: Math.max(1, i - u.attrs.rowspan)
          },
          u.content
        )), a.push(u);
      }
      o.push(x.from(a));
    }
    t = o, e = i;
  }
  return { width: n, height: e, rows: t };
}
function hM(n, e, t, r, i, o, s) {
  const l = n.doc.type.schema, a = Ee(l);
  let c, d;
  if (i > e.width)
    for (let u = 0, f = 0; u < e.height; u++) {
      const p = t.child(u);
      f += p.nodeSize;
      const h = [];
      let m;
      p.lastChild == null || p.lastChild.type == a.cell ? m = c || (c = a.cell.createAndFill()) : m = d || (d = a.header_cell.createAndFill());
      for (let g = e.width; g < i; g++) h.push(m);
      n.insert(n.mapping.slice(s).map(f - 1 + r), h);
    }
  if (o > e.height) {
    const u = [];
    for (let h = 0, m = (e.height - 1) * e.width; h < Math.max(e.width, i); h++) {
      const g = h >= e.width ? !1 : t.nodeAt(e.map[m + h]).type == a.header_cell;
      u.push(
        g ? d || (d = a.header_cell.createAndFill()) : c || (c = a.cell.createAndFill())
      );
    }
    const f = a.row.create(null, x.from(u)), p = [];
    for (let h = e.height; h < o; h++) p.push(f);
    n.insert(n.mapping.slice(s).map(r + t.nodeSize - 2), p);
  }
  return !!(c || d);
}
function Ku(n, e, t, r, i, o, s, l) {
  if (s == 0 || s == e.height) return !1;
  let a = !1;
  for (let c = i; c < o; c++) {
    const d = s * e.width + c, u = e.map[d];
    if (e.map[d - e.width] == u) {
      a = !0;
      const f = t.nodeAt(u), { top: p, left: h } = e.findCell(u);
      n.setNodeMarkup(n.mapping.slice(l).map(u + r), null, {
        ...f.attrs,
        rowspan: s - p
      }), n.insert(
        n.mapping.slice(l).map(e.positionAt(s, h, t)),
        f.type.createAndFill({
          ...f.attrs,
          rowspan: p + f.attrs.rowspan - s
        })
      ), c += f.attrs.colspan - 1;
    }
  }
  return a;
}
function qu(n, e, t, r, i, o, s, l) {
  if (s == 0 || s == e.width) return !1;
  let a = !1;
  for (let c = i; c < o; c++) {
    const d = c * e.width + s, u = e.map[d];
    if (e.map[d - 1] == u) {
      a = !0;
      const f = t.nodeAt(u), p = e.colCount(u), h = n.mapping.slice(l).map(u + r);
      n.setNodeMarkup(
        h,
        null,
        jn(
          f.attrs,
          s - p,
          f.attrs.colspan - (s - p)
        )
      ), n.insert(
        h + f.nodeSize,
        f.type.createAndFill(
          jn(f.attrs, 0, s - p)
        )
      ), c += f.attrs.rowspan - 1;
    }
  }
  return a;
}
function Gu(n, e, t, r, i) {
  let o = t ? n.doc.nodeAt(t - 1) : n.doc;
  if (!o)
    throw new Error("No table found");
  let s = ce.get(o);
  const { top: l, left: a } = r, c = a + i.width, d = l + i.height, u = n.tr;
  let f = 0;
  function p() {
    if (o = t ? u.doc.nodeAt(t - 1) : u.doc, !o)
      throw new Error("No table found");
    s = ce.get(o), f = u.mapping.maps.length;
  }
  hM(u, s, o, t, c, d, f) && p(), Ku(u, s, o, t, a, c, l, f) && p(), Ku(u, s, o, t, a, c, d, f) && p(), qu(u, s, o, t, l, d, a, f) && p(), qu(u, s, o, t, l, d, c, f) && p();
  for (let h = l; h < d; h++) {
    const m = s.positionAt(h, a, o), g = s.positionAt(h, c, o);
    u.replace(
      u.mapping.slice(f).map(m + t),
      u.mapping.slice(f).map(g + t),
      new M(i.rows[h - l], 0, 0)
    );
  }
  p(), u.setSelection(
    new X(
      u.doc.resolve(t + s.positionAt(l, a, o)),
      u.doc.resolve(t + s.positionAt(d - 1, c - 1, o))
    )
  ), e(u);
}
var mM = Oa({
  ArrowLeft: to("horiz", -1),
  ArrowRight: to("horiz", 1),
  ArrowUp: to("vert", -1),
  ArrowDown: to("vert", 1),
  "Shift-ArrowLeft": no("horiz", -1),
  "Shift-ArrowRight": no("horiz", 1),
  "Shift-ArrowUp": no("vert", -1),
  "Shift-ArrowDown": no("vert", 1),
  Backspace: eo,
  "Mod-Backspace": eo,
  Delete: eo,
  "Mod-Delete": eo
});
function go(n, e, t) {
  return t.eq(n.selection) ? !1 : (e && e(n.tr.setSelection(t).scrollIntoView()), !0);
}
function to(n, e) {
  return (t, r, i) => {
    if (!i) return !1;
    const o = t.selection;
    if (o instanceof X)
      return go(
        t,
        r,
        B.near(o.$headCell, e)
      );
    if (n != "horiz" && !o.empty) return !1;
    const s = im(i, n, e);
    if (s == null) return !1;
    if (n == "horiz")
      return go(
        t,
        r,
        B.near(t.doc.resolve(o.head + e), e)
      );
    {
      const l = t.doc.resolve(s), a = Xh(l, n, e);
      let c;
      return a ? c = B.near(a, 1) : e < 0 ? c = B.near(t.doc.resolve(l.before(-1)), -1) : c = B.near(t.doc.resolve(l.after(-1)), 1), go(t, r, c);
    }
  };
}
function no(n, e) {
  return (t, r, i) => {
    if (!i) return !1;
    const o = t.selection;
    let s;
    if (o instanceof X)
      s = o;
    else {
      const a = im(i, n, e);
      if (a == null) return !1;
      s = new X(t.doc.resolve(a));
    }
    const l = Xh(s.$headCell, n, e);
    return l ? go(
      t,
      r,
      new X(s.$anchorCell, l)
    ) : !1;
  };
}
function gM(n, e) {
  const t = n.state.doc, r = Er(t.resolve(e));
  return r ? (n.dispatch(n.state.tr.setSelection(new X(r))), !0) : !1;
}
function yM(n, e, t) {
  if (!st(n.state)) return !1;
  let r = uM(t);
  const i = n.state.selection;
  if (i instanceof X) {
    r || (r = {
      width: 1,
      height: 1,
      rows: [
        x.from(
          la(Ee(n.state.schema).cell, t)
        )
      ]
    });
    const o = i.$anchorCell.node(-1), s = i.$anchorCell.start(-1), l = ce.get(o).rectBetween(
      i.$anchorCell.pos - s,
      i.$headCell.pos - s
    );
    return r = pM(r, l.right - l.left, l.bottom - l.top), Gu(n.state, n.dispatch, s, l, r), !0;
  } else if (r) {
    const o = Ds(n.state), s = o.start(-1);
    return Gu(
      n.state,
      n.dispatch,
      s,
      ce.get(o.node(-1)).findCell(o.pos - s),
      r
    ), !0;
  } else
    return !1;
}
function bM(n, e) {
  var t;
  if (e.ctrlKey || e.metaKey) return;
  const r = Ju(n, e.target);
  let i;
  if (e.shiftKey && n.state.selection instanceof X)
    o(n.state.selection.$anchorCell, e), e.preventDefault();
  else if (e.shiftKey && r && (i = Er(n.state.selection.$anchor)) != null && ((t = ml(n, e)) == null ? void 0 : t.pos) != i.pos)
    o(i, e), e.preventDefault();
  else if (!r)
    return;
  function o(a, c) {
    let d = ml(n, c);
    const u = en.getState(n.state) == null;
    if (!d || !fc(a, d))
      if (u) d = a;
      else return;
    const f = new X(a, d);
    if (u || !n.state.selection.eq(f)) {
      const p = n.state.tr.setSelection(f);
      u && p.setMeta(en, a.pos), n.dispatch(p);
    }
  }
  function s() {
    n.root.removeEventListener("mouseup", s), n.root.removeEventListener("dragstart", s), n.root.removeEventListener("mousemove", l), en.getState(n.state) != null && n.dispatch(n.state.tr.setMeta(en, -1));
  }
  function l(a) {
    const c = a, d = en.getState(n.state);
    let u;
    if (d != null)
      u = n.state.doc.resolve(d);
    else if (Ju(n, c.target) != r && (u = ml(n, e), !u))
      return s();
    u && o(u, c);
  }
  n.root.addEventListener("mouseup", s), n.root.addEventListener("dragstart", s), n.root.addEventListener("mousemove", l);
}
function im(n, e, t) {
  if (!(n.state.selection instanceof L)) return null;
  const { $head: r } = n.state.selection;
  for (let i = r.depth - 1; i >= 0; i--) {
    const o = r.node(i);
    if ((t < 0 ? r.index(i) : r.indexAfter(i)) != (t < 0 ? 0 : o.childCount)) return null;
    if (o.type.spec.tableRole == "cell" || o.type.spec.tableRole == "header_cell") {
      const l = r.before(i), a = e == "vert" ? t > 0 ? "down" : "up" : t > 0 ? "right" : "left";
      return n.endOfTextblock(a) ? l : null;
    }
  }
  return null;
}
function Ju(n, e) {
  for (; e && e != n.dom; e = e.parentNode)
    if (e.nodeName == "TD" || e.nodeName == "TH")
      return e;
  return null;
}
function ml(n, e) {
  const t = n.posAtCoords({
    left: e.clientX,
    top: e.clientY
  });
  return t && t ? Er(n.state.doc.resolve(t.pos)) : null;
}
var vM = class {
  constructor(e, t) {
    this.node = e, this.defaultCellMinWidth = t, this.dom = document.createElement("div"), this.dom.className = "tableWrapper", this.table = this.dom.appendChild(document.createElement("table")), this.table.style.setProperty(
      "--default-cell-min-width",
      `${t}px`
    ), this.colgroup = this.table.appendChild(document.createElement("colgroup")), aa(e, this.colgroup, this.table, t), this.contentDOM = this.table.appendChild(document.createElement("tbody"));
  }
  update(e) {
    return e.type != this.node.type ? !1 : (this.node = e, aa(
      e,
      this.colgroup,
      this.table,
      this.defaultCellMinWidth
    ), !0);
  }
  ignoreMutation(e) {
    return e.type == "attributes" && (e.target == this.table || this.colgroup.contains(e.target));
  }
};
function aa(n, e, t, r, i, o) {
  var s;
  let l = 0, a = !0, c = e.firstChild;
  const d = n.firstChild;
  if (d) {
    for (let u = 0, f = 0; u < d.childCount; u++) {
      const { colspan: p, colwidth: h } = d.child(u).attrs;
      for (let m = 0; m < p; m++, f++) {
        const g = i == f ? o : h && h[m], y = g ? g + "px" : "";
        if (l += g || r, g || (a = !1), c)
          c.style.width != y && (c.style.width = y), c = c.nextSibling;
        else {
          const w = document.createElement("col");
          w.style.width = y, e.appendChild(w);
        }
      }
    }
    for (; c; ) {
      const u = c.nextSibling;
      (s = c.parentNode) == null || s.removeChild(c), c = u;
    }
    a ? (t.style.width = l + "px", t.style.minWidth = "") : (t.style.width = "", t.style.minWidth = l + "px");
  }
}
var $e = new de(
  "tableColumnResizing"
);
function wM({
  handleWidth: n = 5,
  cellMinWidth: e = 25,
  defaultCellMinWidth: t = 100,
  View: r = vM,
  lastColumnResizable: i = !0
} = {}) {
  const o = new ne({
    key: $e,
    state: {
      init(s, l) {
        var a, c;
        const d = (c = (a = o.spec) == null ? void 0 : a.props) == null ? void 0 : c.nodeViews, u = Ee(l.schema).table.name;
        return r && d && (d[u] = (f, p) => new r(f, t, p)), new SM(-1, !1);
      },
      apply(s, l) {
        return l.apply(s);
      }
    },
    props: {
      attributes: (s) => {
        const l = $e.getState(s);
        return l && l.activeHandle > -1 ? { class: "resize-cursor" } : {};
      },
      handleDOMEvents: {
        mousemove: (s, l) => {
          xM(s, l, n, i);
        },
        mouseleave: (s) => {
          kM(s);
        },
        mousedown: (s, l) => {
          CM(s, l, e, t);
        }
      },
      decorations: (s) => {
        const l = $e.getState(s);
        if (l && l.activeHandle > -1)
          return OM(s, l.activeHandle);
      },
      nodeViews: {}
    }
  });
  return o;
}
var SM = class yo {
  constructor(e, t) {
    this.activeHandle = e, this.dragging = t;
  }
  apply(e) {
    const t = this, r = e.getMeta($e);
    if (r && r.setHandle != null)
      return new yo(r.setHandle, !1);
    if (r && r.setDragging !== void 0)
      return new yo(t.activeHandle, r.setDragging);
    if (t.activeHandle > -1 && e.docChanged) {
      let i = e.mapping.map(t.activeHandle, -1);
      return sa(e.doc.resolve(i)) || (i = -1), new yo(i, t.dragging);
    }
    return t;
  }
};
function xM(n, e, t, r) {
  if (!n.editable) return;
  const i = $e.getState(n.state);
  if (i && !i.dragging) {
    const o = AM(e.target);
    let s = -1;
    if (o) {
      const { left: l, right: a } = o.getBoundingClientRect();
      e.clientX - l <= t ? s = Yu(n, e, "left", t) : a - e.clientX <= t && (s = Yu(n, e, "right", t));
    }
    if (s != i.activeHandle) {
      if (!r && s !== -1) {
        const l = n.state.doc.resolve(s), a = l.node(-1), c = ce.get(a), d = l.start(-1);
        if (c.colCount(l.pos - d) + l.nodeAfter.attrs.colspan - 1 == c.width - 1)
          return;
      }
      om(n, s);
    }
  }
}
function kM(n) {
  if (!n.editable) return;
  const e = $e.getState(n.state);
  e && e.activeHandle > -1 && !e.dragging && om(n, -1);
}
function CM(n, e, t, r) {
  var i;
  if (!n.editable) return !1;
  const o = (i = n.dom.ownerDocument.defaultView) != null ? i : window, s = $e.getState(n.state);
  if (!s || s.activeHandle == -1 || s.dragging)
    return !1;
  const l = n.state.doc.nodeAt(s.activeHandle), a = TM(n, s.activeHandle, l.attrs);
  n.dispatch(
    n.state.tr.setMeta($e, {
      setDragging: { startX: e.clientX, startWidth: a }
    })
  );
  function c(u) {
    o.removeEventListener("mouseup", c), o.removeEventListener("mousemove", d);
    const f = $e.getState(n.state);
    f != null && f.dragging && (MM(
      n,
      f.activeHandle,
      Xu(f.dragging, u, t)
    ), n.dispatch(
      n.state.tr.setMeta($e, { setDragging: null })
    ));
  }
  function d(u) {
    if (!u.which) return c(u);
    const f = $e.getState(n.state);
    if (f && f.dragging) {
      const p = Xu(f.dragging, u, t);
      Zu(
        n,
        f.activeHandle,
        p,
        r
      );
    }
  }
  return Zu(
    n,
    s.activeHandle,
    a,
    r
  ), o.addEventListener("mouseup", c), o.addEventListener("mousemove", d), e.preventDefault(), !0;
}
function TM(n, e, { colspan: t, colwidth: r }) {
  const i = r && r[r.length - 1];
  if (i) return i;
  const o = n.domAtPos(e);
  let l = o.node.childNodes[o.offset].offsetWidth, a = t;
  if (r)
    for (let c = 0; c < t; c++)
      r[c] && (l -= r[c], a--);
  return l / a;
}
function AM(n) {
  for (; n && n.nodeName != "TD" && n.nodeName != "TH"; )
    n = n.classList && n.classList.contains("ProseMirror") ? null : n.parentNode;
  return n;
}
function Yu(n, e, t, r) {
  const i = t == "right" ? -r : r, o = n.posAtCoords({
    left: e.clientX + i,
    top: e.clientY
  });
  if (!o) return -1;
  const { pos: s } = o, l = Er(n.state.doc.resolve(s));
  if (!l) return -1;
  if (t == "right") return l.pos;
  const a = ce.get(l.node(-1)), c = l.start(-1), d = a.map.indexOf(l.pos - c);
  return d % a.width == 0 ? -1 : c + a.map[d - 1];
}
function Xu(n, e, t) {
  const r = e.clientX - n.startX;
  return Math.max(t, n.startWidth + r);
}
function om(n, e) {
  n.dispatch(
    n.state.tr.setMeta($e, { setHandle: e })
  );
}
function MM(n, e, t) {
  const r = n.state.doc.resolve(e), i = r.node(-1), o = ce.get(i), s = r.start(-1), l = o.colCount(r.pos - s) + r.nodeAfter.attrs.colspan - 1, a = n.state.tr;
  for (let c = 0; c < o.height; c++) {
    const d = c * o.width + l;
    if (c && o.map[d] == o.map[d - o.width]) continue;
    const u = o.map[d], f = i.nodeAt(u).attrs, p = f.colspan == 1 ? 0 : l - o.colCount(u);
    if (f.colwidth && f.colwidth[p] == t) continue;
    const h = f.colwidth ? f.colwidth.slice() : EM(f.colspan);
    h[p] = t, a.setNodeMarkup(s + u, null, { ...f, colwidth: h });
  }
  a.docChanged && n.dispatch(a);
}
function Zu(n, e, t, r) {
  const i = n.state.doc.resolve(e), o = i.node(-1), s = i.start(-1), l = ce.get(o).colCount(i.pos - s) + i.nodeAfter.attrs.colspan - 1;
  let a = n.domAtPos(i.start(-1)).node;
  for (; a && a.nodeName != "TABLE"; )
    a = a.parentNode;
  a && aa(
    o,
    a.firstChild,
    a,
    r,
    l,
    t
  );
}
function EM(n) {
  return Array(n).fill(0);
}
function OM(n, e) {
  var t;
  const r = [], i = n.doc.resolve(e), o = i.node(-1);
  if (!o)
    return ee.empty;
  const s = ce.get(o), l = i.start(-1), a = s.colCount(i.pos - l) + i.nodeAfter.attrs.colspan - 1;
  for (let c = 0; c < s.height; c++) {
    const d = a + c * s.width;
    if ((a == s.width - 1 || s.map[d] != s.map[d + 1]) && (c == 0 || s.map[d] != s.map[d - s.width])) {
      const u = s.map[d], f = l + u + o.nodeAt(u).nodeSize - 1, p = document.createElement("div");
      p.className = "column-resize-handle", (t = $e.getState(n)) != null && t.dragging && r.push(
        Te.node(
          l + u,
          l + u + o.nodeAt(u).nodeSize,
          {
            class: "column-resize-dragging"
          }
        )
      ), r.push(Te.widget(f, p));
    }
  }
  return ee.create(n.doc, r);
}
function NM({
  allowTableNodeSelection: n = !1
} = {}) {
  return new ne({
    key: en,
    // This piece of state is used to remember when a mouse-drag
    // cell-selection is happening, so that it can continue even as
    // transactions (which might move its anchor cell) come in.
    state: {
      init() {
        return null;
      },
      apply(e, t) {
        const r = e.getMeta(en);
        if (r != null) return r == -1 ? null : r;
        if (t == null || !e.docChanged) return t;
        const { deleted: i, pos: o } = e.mapping.mapResult(t);
        return i ? null : o;
      }
    },
    props: {
      decorations: jA,
      handleDOMEvents: {
        mousedown: bM
      },
      createSelectionBetween(e) {
        return en.getState(e.state) != null ? e.state.selection : null;
      },
      handleTripleClick: gM,
      handleKeyDown: mM,
      handlePaste: yM
    },
    appendTransaction(e, t, r) {
      return KA(
        r,
        tm(r, t),
        n
      );
    }
  });
}
function ca(n, e) {
  return e ? ["width", `${Math.max(e, n)}px`] : ["min-width", `${n}px`];
}
function Qu(n, e, t, r, i, o) {
  var s;
  let l = 0, a = !0, c = e.firstChild;
  const d = n.firstChild;
  if (d !== null)
    for (let u = 0, f = 0; u < d.childCount; u += 1) {
      const { colspan: p, colwidth: h } = d.child(u).attrs;
      for (let m = 0; m < p; m += 1, f += 1) {
        const g = i === f ? o : h && h[m], y = g ? `${g}px` : "";
        if (l += g || r, g || (a = !1), c) {
          if (c.style.width !== y) {
            const [w, A] = ca(r, g);
            c.style.setProperty(w, A);
          }
          c = c.nextSibling;
        } else {
          const w = document.createElement("col"), [A, b] = ca(r, g);
          w.style.setProperty(A, b), e.appendChild(w);
        }
      }
    }
  for (; c; ) {
    const u = c.nextSibling;
    (s = c.parentNode) === null || s === void 0 || s.removeChild(c), c = u;
  }
  a ? (t.style.width = `${l}px`, t.style.minWidth = "") : (t.style.width = "", t.style.minWidth = `${l}px`);
}
class DM {
  constructor(e, t) {
    this.node = e, this.cellMinWidth = t, this.dom = document.createElement("div"), this.dom.className = "tableWrapper", this.table = this.dom.appendChild(document.createElement("table")), this.colgroup = this.table.appendChild(document.createElement("colgroup")), Qu(e, this.colgroup, this.table, t), this.contentDOM = this.table.appendChild(document.createElement("tbody"));
  }
  update(e) {
    return e.type !== this.node.type ? !1 : (this.node = e, Qu(e, this.colgroup, this.table, this.cellMinWidth), !0);
  }
  ignoreMutation(e) {
    return e.type === "attributes" && (e.target === this.table || this.colgroup.contains(e.target));
  }
}
function _M(n, e, t, r) {
  let i = 0, o = !0;
  const s = [], l = n.firstChild;
  if (!l)
    return {};
  for (let u = 0, f = 0; u < l.childCount; u += 1) {
    const { colspan: p, colwidth: h } = l.child(u).attrs;
    for (let m = 0; m < p; m += 1, f += 1) {
      const g = t === f ? r : h && h[m];
      i += g || e, g || (o = !1);
      const [y, w] = ca(e, g);
      s.push([
        "col",
        { style: `${y}: ${w}` }
      ]);
    }
  }
  const a = o ? `${i}px` : "", c = o ? "" : `${i}px`;
  return { colgroup: ["colgroup", {}, ...s], tableWidth: a, tableMinWidth: c };
}
function ef(n, e) {
  return n.createAndFill();
}
function RM(n) {
  if (n.cached.tableNodeTypes)
    return n.cached.tableNodeTypes;
  const e = {};
  return Object.keys(n.nodes).forEach((t) => {
    const r = n.nodes[t];
    r.spec.tableRole && (e[r.spec.tableRole] = r);
  }), n.cached.tableNodeTypes = e, e;
}
function IM(n, e, t, r, i) {
  const o = RM(n), s = [], l = [];
  for (let c = 0; c < t; c += 1) {
    const d = ef(o.cell);
    if (d && l.push(d), r) {
      const u = ef(o.header_cell);
      u && s.push(u);
    }
  }
  const a = [];
  for (let c = 0; c < e; c += 1)
    a.push(o.row.createChecked(null, r && c === 0 ? s : l));
  return o.table.createChecked(null, a);
}
function PM(n) {
  return n instanceof X;
}
const ro = ({ editor: n }) => {
  const { selection: e } = n.state;
  if (!PM(e))
    return !1;
  let t = 0;
  const r = Fp(e.ranges[0].$from, (o) => o.type.name === "table");
  return r == null || r.node.descendants((o) => {
    if (o.type.name === "table")
      return !1;
    ["tableCell", "tableHeader"].includes(o.type.name) && (t += 1);
  }), t === e.ranges.length ? (n.commands.deleteTable(), !0) : !1;
}, LM = ue.create({
  name: "table",
  // @ts-ignore
  addOptions() {
    return {
      HTMLAttributes: {},
      resizable: !1,
      handleWidth: 5,
      cellMinWidth: 25,
      // TODO: fix
      View: DM,
      lastColumnResizable: !0,
      allowTableNodeSelection: !1
    };
  },
  content: "tableRow+",
  tableRole: "table",
  isolating: !0,
  group: "block",
  parseHTML() {
    return [{ tag: "table" }];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    const { colgroup: t, tableWidth: r, tableMinWidth: i } = _M(n, this.options.cellMinWidth);
    return [
      "table",
      ie(this.options.HTMLAttributes, e, {
        style: r ? `width: ${r}` : `min-width: ${i}`
      }),
      t,
      ["tbody", 0]
    ];
  },
  addCommands() {
    return {
      insertTable: ({ rows: n = 3, cols: e = 3, withHeaderRow: t = !0 } = {}) => ({ tr: r, dispatch: i, editor: o }) => {
        const s = IM(o.schema, n, e, t);
        if (i) {
          const l = r.selection.from + 1;
          r.replaceSelectionWith(s).scrollIntoView().setSelection(L.near(r.doc.resolve(l)));
        }
        return !0;
      },
      addColumnBefore: () => ({ state: n, dispatch: e }) => JA(n, e),
      addColumnAfter: () => ({ state: n, dispatch: e }) => YA(n, e),
      deleteColumn: () => ({ state: n, dispatch: e }) => ZA(n, e),
      addRowBefore: () => ({ state: n, dispatch: e }) => eM(n, e),
      addRowAfter: () => ({ state: n, dispatch: e }) => tM(n, e),
      deleteRow: () => ({ state: n, dispatch: e }) => rM(n, e),
      deleteTable: () => ({ state: n, dispatch: e }) => dM(n, e),
      mergeCells: () => ({ state: n, dispatch: e }) => $u(n, e),
      splitCell: () => ({ state: n, dispatch: e }) => ju(n, e),
      toggleHeaderColumn: () => ({ state: n, dispatch: e }) => xi("column")(n, e),
      toggleHeaderRow: () => ({ state: n, dispatch: e }) => xi("row")(n, e),
      toggleHeaderCell: () => ({ state: n, dispatch: e }) => aM(n, e),
      mergeOrSplit: () => ({ state: n, dispatch: e }) => $u(n, e) ? !0 : ju(n, e),
      setCellAttribute: (n, e) => ({ state: t, dispatch: r }) => sM(n, e)(t, r),
      goToNextCell: () => ({ state: n, dispatch: e }) => Uu(1)(n, e),
      goToPreviousCell: () => ({ state: n, dispatch: e }) => Uu(-1)(n, e),
      fixTables: () => ({ state: n, dispatch: e }) => (e && tm(n), !0),
      setCellSelection: (n) => ({ tr: e, dispatch: t }) => {
        if (t) {
          const r = X.create(e.doc, n.anchorCell, n.headCell);
          e.setSelection(r);
        }
        return !0;
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.goToNextCell() ? !0 : this.editor.can().addRowAfter() ? this.editor.chain().addRowAfter().goToNextCell().run() : !1,
      "Shift-Tab": () => this.editor.commands.goToPreviousCell(),
      Backspace: ro,
      "Mod-Backspace": ro,
      Delete: ro,
      "Mod-Delete": ro
    };
  },
  addProseMirrorPlugins() {
    return [
      ...this.options.resizable && this.editor.isEditable ? [
        wM({
          handleWidth: this.options.handleWidth,
          cellMinWidth: this.options.cellMinWidth,
          defaultCellMinWidth: this.options.cellMinWidth,
          View: this.options.View,
          lastColumnResizable: this.options.lastColumnResizable
        })
      ] : [],
      NM({
        allowTableNodeSelection: this.options.allowTableNodeSelection
      })
    ];
  },
  extendNodeSchema(n) {
    const e = {
      name: n.name,
      options: n.options,
      storage: n.storage
    };
    return {
      tableRole: $(D(n, "tableRole", e))
    };
  }
}), BM = ue.create({
  name: "tableCell",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (n) => {
          const e = n.getAttribute("colwidth");
          return e ? e.split(",").map((r) => parseInt(r, 10)) : null;
        }
      }
    };
  },
  tableRole: "cell",
  isolating: !0,
  parseHTML() {
    return [
      { tag: "td" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["td", ie(this.options.HTMLAttributes, n), 0];
  }
}), zM = ue.create({
  name: "tableHeader",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (n) => {
          const e = n.getAttribute("colwidth");
          return e ? e.split(",").map((r) => parseInt(r, 10)) : null;
        }
      }
    };
  },
  tableRole: "header_cell",
  isolating: !0,
  parseHTML() {
    return [
      { tag: "th" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["th", ie(this.options.HTMLAttributes, n), 0];
  }
}), FM = ue.create({
  name: "tableRow",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "(tableCell | tableHeader)*",
  tableRole: "row",
  parseHTML() {
    return [
      { tag: "tr" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["tr", ie(this.options.HTMLAttributes, n), 0];
  }
}), { TABLE_DEFAULT_SELECTED_GRID_SIZE: io, TABLE_INIT_GRID_SIZE: oo, TABLE_MAX_GRID_SIZE: so } = xt(), HM = {
  data() {
    return {
      menu: !1,
      withHeaderRow: !0,
      tableGridSize: ni({
        rows: Jl() ? so : oo,
        cols: Jl() ? so : oo
      }),
      selectedTableGridSize: ni({
        rows: io,
        cols: io
      })
    };
  },
  methods: {
    selectTableGridSize(n, e) {
      n === this.tableGridSize.rows && (this.tableGridSize.rows = Math.min(n + 1, so)), e === this.tableGridSize.cols && (this.tableGridSize.cols = Math.min(e + 1, so)), this.selectedTableGridSize.rows = n, this.selectedTableGridSize.cols = e;
    },
    onMouseDown(n, e) {
      this.$emit("create-table", { rows: n, cols: e, withHeaderRow: Pt(this.withHeaderRow) }), this.resetTableGridSize();
    },
    resetTableGridSize() {
      this.menu = !1, this.withHeaderRow = !0, this.tableGridSize.rows = oo, this.tableGridSize.cols = oo, this.selectedTableGridSize.rows = io, this.selectedTableGridSize.cols = io;
    }
  }
}, VM = ["onMouseover", "onMousedown"];
function $M(n, e, t, r, i, o) {
  const s = k("v-checkbox"), l = k("v-card-text"), a = k("v-card-subtitle"), c = k("v-card"), d = k("v-menu");
  return N(), H(d, {
    modelValue: i.menu,
    "onUpdate:modelValue": e[1] || (e[1] = (u) => i.menu = u),
    location: "end bottom",
    "open-on-click": "",
    "open-on-hover": "",
    "close-on-content-click": !1,
    activator: "parent"
  }, {
    default: E(() => [
      O(c, {
        density: "compact",
        class: "table-grid-size-editor"
      }, {
        default: E(() => [
          O(l, { class: "pa-2 pb-0" }, {
            default: E(() => [
              O(s, {
                modelValue: i.withHeaderRow,
                "onUpdate:modelValue": e[0] || (e[0] = (u) => i.withHeaderRow = u),
                density: "compact",
                "hide-details": "",
                label: n.$t("editor.table.menu.insert_table.with_header_row")
              }, null, 8, ["modelValue", "label"])
            ]),
            _: 1
          }),
          O(l, { class: "d-flex flex-column flex-wrap justify-space-between pa-2" }, {
            default: E(() => [
              (N(!0), re(be, null, We(i.tableGridSize.rows, (u) => (N(), re("div", {
                key: "r" + u,
                class: "d-flex"
              }, [
                (N(!0), re(be, null, We(i.tableGridSize.cols, (f) => (N(), re("div", {
                  style: { cursor: "pointer" },
                  key: "c" + f,
                  class: Mn([{
                    "table-grid-size-editor__cell--selected": f <= i.selectedTableGridSize.cols && u <= i.selectedTableGridSize.rows
                  }, "pa-1"]),
                  onMouseover: (p) => o.selectTableGridSize(u, f),
                  onMousedown: (p) => o.onMouseDown(u, f)
                }, e[2] || (e[2] = [
                  dn("div", { class: "table-grid-size-editor__cell__inner" }, null, -1)
                ]), 42, VM))), 128))
              ]))), 128))
            ]),
            _: 1
          }),
          O(a, { class: "pt-0 pb-2" }, {
            default: E(() => [
              rt(De(i.selectedTableGridSize.rows) + " x " + De(i.selectedTableGridSize.cols), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["modelValue"]);
}
const jM = /* @__PURE__ */ fe(HM, [["render", $M]]), WM = {
  components: {
    CreateTablePopover: jM
  },
  props: {
    editor: Object,
    activator: {
      type: String,
      default: void 0
    }
  },
  data() {
    return {
      menu: !1
    };
  },
  computed: {
    items() {
      const n = !this.editor.isActive("table");
      return [
        { type: "item", key: "insert-table", title: this.$t("editor.table.menu.insert_table.create"), icon: "mdi-table-plus" },
        { type: "divider" },
        { type: "item", key: "add-column-before", title: this.$t("editor.table.menu.add_column_before"), icon: "mdi-table-column-plus-before", disabled: n },
        { type: "item", key: "add-column-after", title: this.$t("editor.table.menu.add_column_after"), icon: "mdi-table-column-plus-after", disabled: n },
        { type: "item", key: "delete-column", title: this.$t("editor.table.menu.delete_column"), icon: "mdi-table-column-remove", disabled: n },
        { type: "divider" },
        { type: "item", key: "add-row-before", title: this.$t("editor.table.menu.add_row_before"), icon: "mdi-table-row-plus-before", disabled: n },
        { type: "item", key: "add-row-after", title: this.$t("editor.table.menu.add_row_after"), icon: "mdi-table-row-plus-after", disabled: n },
        { type: "item", key: "delete-row", title: this.$t("editor.table.menu.delete_row"), icon: "mdi-table-row-remove", disabled: n },
        { type: "divider" },
        { type: "item", key: "merge-or-split-cells", title: this.$t("editor.table.menu.merge_or_split_cells"), icon: "mdi-table-merge-cells", disabled: n },
        { type: "divider" },
        { type: "item", key: "delete-table", title: this.$t("editor.table.menu.delete_table"), icon: "mdi-table-remove", disabled: n }
      ];
    }
  },
  methods: {
    setTable(n, e) {
      var r;
      if (!n) return;
      const t = {
        "insert-table": () => this.editor.chain().focus().insertTable({ ...e }).run(),
        "add-column-before": () => this.editor.chain().focus().addColumnBefore().run(),
        "add-column-after": () => this.editor.chain().focus().addColumnAfter().run(),
        "delete-column": () => this.editor.chain().focus().deleteColumn().run(),
        "add-row-before": () => this.editor.chain().focus().addRowBefore().run(),
        "add-row-after": () => this.editor.chain().focus().addRowAfter().run(),
        "delete-row": () => this.editor.chain().focus().deleteRow().run(),
        "merge-or-split-cells": () => this.editor.chain().focus().mergeOrSplit().run(),
        "delete-table": () => this.editor.chain().focus().deleteTable().run()
      };
      (r = t[n]) == null || r.call(t);
    },
    createTable(n) {
      this.setTable("insert-table", n), this.menu = !1;
    }
  }
};
function UM(n, e, t, r, i, o) {
  const s = k("v-icon"), l = k("v-list-item-title"), a = k("create-table-popover"), c = k("v-list-item"), d = k("v-divider"), u = k("v-list"), f = k("v-menu");
  return N(), H(f, {
    modelValue: i.menu,
    "onUpdate:modelValue": e[0] || (e[0] = (p) => i.menu = p),
    activator: "parent"
  }, {
    default: E(() => [
      O(u, { density: "compact" }, {
        default: E(() => [
          (N(!0), re(be, null, We(o.items, (p, h) => (N(), re(be, null, [
            p.key === "insert-table" ? (N(), H(c, {
              key: h,
              disabled: p.disabled
            }, {
              prepend: E(() => [
                O(s, {
                  icon: p.icon
                }, null, 8, ["icon"])
              ]),
              default: E(() => [
                O(l, null, {
                  default: E(() => [
                    rt(De(p.title), 1)
                  ]),
                  _: 2
                }, 1024),
                p.key === "insert-table" ? (N(), H(a, {
                  key: h,
                  onCreateTable: o.createTable
                }, null, 8, ["onCreateTable"])) : Fe("", !0)
              ]),
              _: 2
            }, 1032, ["disabled"])) : p.type === "item" ? (N(), H(c, {
              key: "item-" + h,
              disabled: p.disabled,
              onClick: (m) => o.setTable(p.key)
            }, {
              prepend: E(() => [
                O(s, {
                  icon: p.icon
                }, null, 8, ["icon"])
              ]),
              default: E(() => [
                O(l, null, {
                  default: E(() => [
                    rt(De(p.title), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1032, ["disabled", "onClick"])) : (N(), H(d, {
              key: "divider-" + h
            }))
          ], 64))), 256))
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["modelValue"]);
}
const KM = /* @__PURE__ */ fe(WM, [["render", UM], ["__scopeId", "data-v-c4a084c9"]]), qM = {
  components: {
    ActionButton: J,
    TableMenu: KM
  },
  props: {
    editor: {
      type: Object,
      required: !0
    },
    icon: {
      type: String,
      default: void 0
    },
    tooltip: {
      type: String,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    color: {
      type: String,
      default: void 0
    },
    action: {
      type: Function,
      default: void 0
    },
    isActive: {
      type: Function,
      default: void 0
    }
  }
};
function GM(n, e, t, r, i, o) {
  const s = k("table-menu"), l = k("action-button");
  return N(), H(l, {
    icon: t.icon,
    tooltip: t.tooltip,
    disabled: t.disabled,
    color: t.color,
    action: t.action,
    "is-active": t.isActive
  }, {
    default: E(() => [
      O(s, {
        editor: t.editor,
        activator: "parent"
      }, null, 8, ["editor"])
    ]),
    _: 1
  }, 8, ["icon", "tooltip", "disabled", "color", "action", "is-active"]);
}
const JM = /* @__PURE__ */ fe(qM, [["render", GM]]);
LM.extend({
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      resizable: !0,
      bubbleMenuPlugin: !0,
      HTMLAttributes: {
        class: "table-wrapper"
      },
      button: ({ editor: e, t }) => ({
        component: JM,
        componentProps: {
          isActive: () => e.isActive("table") || !1,
          disabled: !e.can().insertTable(),
          icon: "mdi-table",
          tooltip: t("editor.table.tooltip"),
          id: "table-insert-button"
        }
      })
    };
  },
  addProseMirrorPlugins() {
    var e;
    const n = ((e = this.parent) == null ? void 0 : e.call(this)) || [];
    return this.options.bubbleMenuPlugin && n.push(
      new ne({
        key: new de("bubbleMenu"),
        props: {
          handleDOMEvents: {
            mousemove: (t, r) => {
              r.target.classList.contains("resize-handle") ? (alert("ok"), document.body.style.cursor = "col-resize") : document.body.style.cursor = "";
            },
            click: (t, r) => {
              const { target: i } = r;
              if (i.tagName !== "TD" && i.tagName !== "TH") return !1;
              const o = document.getElementById("bubble-menu");
              return o ? (o.style.display = "block", setTimeout(() => {
                const s = o.getBoundingClientRect(), l = i.closest("tr").getBoundingClientRect();
                o.style.left = `${l.right + window.scrollX - s.width - 210}px`, o.style.top = `${l.bottom + window.scrollY - 122}px`;
              }, 0), window.selectedEditor = t, !0) : !1;
            }
          }
        }
      })
    ), n;
  },
  addExtensions() {
    return [
      FM.configure(this.options.tableRow),
      zM.configure(this.options.tableHeader),
      BM.configure(this.options.tableCell)
    ];
  }
});
const YM = te.create({
  name: "textAlign",
  addOptions() {
    return {
      types: [],
      alignments: ["left", "center", "right", "justify"],
      defaultAlignment: null
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: this.options.defaultAlignment,
            parseHTML: (n) => {
              const e = n.style.textAlign;
              return this.options.alignments.includes(e) ? e : this.options.defaultAlignment;
            },
            renderHTML: (n) => n.textAlign ? { style: `text-align: ${n.textAlign}` } : {}
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setTextAlign: (n) => ({ commands: e }) => this.options.alignments.includes(n) ? this.options.types.map((t) => e.updateAttributes(t, { textAlign: n })).every((t) => t) : !1,
      unsetTextAlign: () => ({ commands: n }) => this.options.types.map((e) => n.resetAttributes(e, "textAlign")).every((e) => e)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-l": () => this.editor.commands.setTextAlign("left"),
      "Mod-Shift-e": () => this.editor.commands.setTextAlign("center"),
      "Mod-Shift-r": () => this.editor.commands.setTextAlign("right"),
      "Mod-Shift-j": () => this.editor.commands.setTextAlign("justify")
    };
  }
}), XM = ["left", "center", "right", "justify"];
YM.extend({
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      types: ["heading", "paragraph", "image"],
      button: ({ editor: e, extension: t, t: r }) => {
        var l;
        const o = (((l = t.options) == null ? void 0 : l.alignments) || XM).map((a) => ({
          title: r(`editor.textalign.${a}.tooltip`),
          icon: `mdi-format-align-${a}`,
          isActive: () => e.isActive({ textAlign: a }) || !1,
          action: () => e.chain().focus().setTextAlign(a).run(),
          disabled: !1
          // !editor.can().setTextAlign(k)
        })), s = o.every((a) => a.disabled);
        return {
          component: nc,
          componentProps: {
            icon: "mdi-format-align-center",
            tooltip: r("editor.textalign.tooltip"),
            disabled: s,
            items: o
          }
        };
      }
    };
  }
});
const ZM = ot.create({
  name: "underline",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "u"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (n) => n.includes("underline") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["u", ie(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setUnderline: () => ({ commands: n }) => n.setMark(this.name),
      toggleUnderline: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetUnderline: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-u": () => this.editor.commands.toggleUnderline(),
      "Mod-U": () => this.editor.commands.toggleUnderline()
    };
  }
});
ZM.extend({
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      button: ({ editor: e, t }) => ({
        component: J,
        componentProps: {
          action: () => e.chain().focus().toggleUnderline().run(),
          isActive: () => e.isActive("underline") || !1,
          disabled: !e.can().toggleUnderline(),
          icon: "mdi-format-underline",
          tooltip: t("editor.underline.tooltip")
        }
      })
    };
  }
});
const QM = {
  props: {
    value: {
      type: String,
      default: void 0
    },
    editor: {
      type: Object,
      required: !0
    },
    destroy: {
      type: Function,
      default: void 0
    }
  },
  data() {
    return {
      url: "",
      dialog: !1
    };
  },
  computed: {
    isDisabled() {
      return this.value === this.url || !this.url;
    }
  },
  methods: {
    apply() {
      if (this.url) {
        if (!Ph(this.url)) {
          alert(this.$t("editor.link.dialog.messages.invalidUrl"));
          return;
        }
        this.editor.chain().focus().setVideo({ src: this.url }).run();
      }
      this.close();
    },
    close() {
      this.dialog = !1, this.url = "", setTimeout(() => {
        var n;
        return (n = this.destroy) == null ? void 0 : n.call(this);
      }, 300);
    }
  },
  watch: {
    value(n) {
      n && (this.url = n);
    }
  }
}, eE = { class: "headline" };
function tE(n, e, t, r, i, o) {
  const s = k("v-spacer"), l = k("v-icon"), a = k("v-btn"), c = k("v-toolbar"), d = k("v-text-field"), u = k("v-card-text"), f = k("v-card-actions"), p = k("v-card"), h = k("v-dialog");
  return N(), H(h, {
    modelValue: i.dialog,
    "onUpdate:modelValue": e[1] || (e[1] = (m) => i.dialog = m),
    "max-width": "400",
    activator: "parent",
    "onClick:outside": o.close
  }, {
    default: E(() => [
      O(p, null, {
        default: E(() => [
          O(c, {
            class: "mb-5 pl-5 pr-2",
            density: "compact"
          }, {
            default: E(() => [
              dn("span", eE, De(n.$t("editor.video.dialog.title")), 1),
              O(s),
              O(a, {
                class: "mx-0",
                icon: "",
                onClick: o.close
              }, {
                default: E(() => [
                  O(l, { icon: "mdi-close" })
                ]),
                _: 1
              }, 8, ["onClick"])
            ]),
            _: 1
          }),
          O(u, null, {
            default: E(() => [
              O(d, {
                density: "compact",
                variant: "outlined",
                modelValue: i.url,
                "onUpdate:modelValue": e[0] || (e[0] = (m) => i.url = m),
                label: n.$t("editor.video.dialog.link"),
                "hide-details": "",
                autofocus: ""
              }, null, 8, ["modelValue", "label"])
            ]),
            _: 1
          }),
          O(f, null, {
            default: E(() => [
              O(a, {
                disabled: o.isDisabled,
                onClick: o.apply
              }, {
                default: E(() => [
                  rt(De(n.$t("editor.video.dialog.button.apply")), 1)
                ]),
                _: 1
              }, 8, ["disabled", "onClick"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["modelValue", "onClick:outside"]);
}
const nE = /* @__PURE__ */ fe(QM, [["render", tE]]), rE = {
  components: {
    ActionButton: J
  },
  props: {
    editor: {
      type: Object,
      required: !0
    },
    icon: {
      type: String,
      default: void 0
    },
    tooltip: {
      type: String,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    color: {
      type: String,
      default: void 0
    },
    action: {
      type: Function,
      default: void 0
    },
    isActive: {
      type: Function,
      default: void 0
    }
  },
  data() {
    return {
      src: void 0
    };
  },
  methods: {
    onAction() {
      const { src: n } = this.editor.getAttributes("video");
      this.src = n;
    }
  }
};
function iE(n, e, t, r, i, o) {
  const s = k("action-button");
  return N(), H(s, {
    icon: t.icon,
    tooltip: t.tooltip,
    disabled: t.disabled,
    color: t.color,
    "is-active": t.isActive,
    action: o.onAction
  }, {
    default: E(() => [
      ki(n.$slots, "dialog", {
        props: { editor: t.editor, value: i.src }
      })
    ]),
    _: 3
  }, 8, ["icon", "tooltip", "disabled", "color", "is-active", "action"]);
}
const oE = /* @__PURE__ */ fe(rE, [["render", iE]]), { VIDEO_SIZE: sE } = xt();
function lE(n) {
  return n = n.replace("https://youtu.be/", "https://www.youtube.com/watch?v=").replace("watch?v=", "embed/"), n = n.replace("https://vimeo.com/", "https://player.vimeo.com/video/"), /^https?:\/\/www.bilibili.com\/video\/.*/i.test(n) && (n = n.replace(/\?.*$/i, "").replace("https://www.bilibili.com/video/", "https://player.bilibili.com/player.html?bvid=")), n.includes("drive.google.com") && (n = n.replace("/view", "/preview")), n;
}
ue.create({
  name: "video",
  group: "block",
  atom: !0,
  draggable: !0,
  addAttributes() {
    return {
      src: {
        default: null,
        renderHTML: ({ src: n }) => ({
          src: n ? lE(n) : null
        })
      },
      width: {
        default: this.options.width,
        renderHTML: ({ width: n }) => ({
          width: Jr(n)
        })
      },
      frameborder: {
        default: this.options.frameborder ? 1 : 0,
        parseHTML: () => this.options.frameborder ? 1 : 0
      },
      allowfullscreen: {
        default: this.options.allowFullscreen,
        parseHTML: () => this.options.allowFullscreen
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "div[data-video] iframe"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    const { width: e = "100%" } = n ?? {}, t = {
      ...n,
      width: "100%",
      height: "100%"
    }, r = `position: relative;overflow: hidden;display: flex;flex: 1;max-width: ${e};`, i = `flex: 1;padding-bottom: ${9 / 16 * 100}%;`, l = ["div", { style: r }, ["div", { style: i }], ["iframe", t]];
    return ["div", {
      ...this.options.HTMLAttributes,
      "data-video": ""
    }, l];
  },
  addCommands() {
    return {
      setVideo: (n) => ({ commands: e }) => e.insertContent({
        type: this.name,
        attrs: n
      }),
      updateVideo: (n) => ({ commands: e }) => e.updateAttributes(this.name, n)
    };
  },
  addOptions() {
    return {
      divider: !1,
      spacer: !1,
      allowFullscreen: !0,
      frameborder: !1,
      width: sE["size-medium"],
      HTMLAttributes: {
        class: "iframe-wrapper",
        style: "display: flex;justify-content: center;"
      },
      dialogComponent: () => nE,
      button: ({ editor: n, extension: e, t }) => {
        const { dialogComponent: r } = e.options;
        return {
          component: oE,
          componentProps: {
            isActive: () => n.isActive("video") || !1,
            icon: "mdi-video-plus",
            tooltip: t("editor.video.tooltip")
          },
          componentSlots: {
            dialog: r()
          },
          disabled: () => !n.can().setVideo({})
        };
      }
    };
  }
});
const pE = {
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  CodeBlock,
  Color,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Image,
  Indent,
  Italic,
  Link,
  OrderedList,
  Strike,
  Table,
  TextAlign,
  Underline,
  Video
}, hE = {
  install(n, e = {}) {
    setConfig({
      i18n: e.i18n ?? void 0
    }), createContext({
      defaultLang: e.lang ?? "en",
      defaultMarkdownTheme: e.markdownTheme ?? "github"
    });
  }
};
export {
  pE as Extensions,
  uE as OlotapEditor,
  hE as OlotapPlugin
};

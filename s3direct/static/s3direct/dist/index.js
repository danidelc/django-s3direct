! function() {
    function t(t, e, r, n) {
        Object.defineProperty(t, e, {
            get: r,
            set: n,
            enumerable: !0,
            configurable: !0
        })
    }

    function e(t) {
        return t && t.__esModule ? t.default : t
    }
    var r = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {},
        n = {},
        i = {},
        o = r.parcelRequire952e;
    null == o && ((o = function(t) {
        if (t in n) return n[t].exports;
        if (t in i) {
            var e = i[t];
            delete i[t];
            var r = {
                id: t,
                exports: {}
            };
            return n[t] = r, e.call(r.exports, r, r.exports), r.exports
        }
        var o = new Error("Cannot find module '" + t + "'");
        throw o.code = "MODULE_NOT_FOUND", o
    }).register = function(t, e) {
        i[t] = e
    }, r.parcelRequire952e = o), o.register("gvLJ0", (function(t, e) {
        var r = o("2yz1O"),
            n = o("2X4kY"),
            i = o("4Sxqp").Buffer,
            s = [1518500249, 1859775393, -1894007588, -899497514],
            a = new Array(80);

        function u() {
            this.init(), this._w = a, n.call(this, 64, 56)
        }

        function h(t) {
            return t << 30 | t >>> 2
        }

        function p(t, e, r, n) {
            return 0 === t ? e & r | ~e & n : 2 === t ? e & r | e & n | r & n : e ^ r ^ n
        }
        r(u, n), u.prototype.init = function() {
            return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
        }, u.prototype._update = function(t) {
            for (var e, r = this._w, n = 0 | this._a, i = 0 | this._b, o = 0 | this._c, a = 0 | this._d, u = 0 | this._e, f = 0; f < 16; ++f) r[f] = t.readInt32BE(4 * f);
            for (; f < 80; ++f) r[f] = r[f - 3] ^ r[f - 8] ^ r[f - 14] ^ r[f - 16];
            for (var c = 0; c < 80; ++c) {
                var l = ~~(c / 20),
                    d = 0 | ((e = n) << 5 | e >>> 27) + p(l, i, o, a) + u + r[c] + s[l];
                u = a, a = o, o = h(i), i = n, n = d
            }
            this._a = n + this._a | 0, this._b = i + this._b | 0, this._c = o + this._c | 0, this._d = a + this._d | 0, this._e = u + this._e | 0
        }, u.prototype._hash = function() {
            var t = i.allocUnsafe(20);
            return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c, 8), t.writeInt32BE(0 | this._d, 12), t.writeInt32BE(0 | this._e, 16), t
        }, t.exports = u
    })), o.register("2yz1O", (function(t, e) {
        "function" == typeof Object.create ? t.exports = function(t, e) {
            t.super_ = e, t.prototype = Object.create(e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            })
        } : t.exports = function(t, e) {
            t.super_ = e;
            var r = function() {};
            r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
        }
    })), o.register("2X4kY", (function(t, e) {
        var r = o("4Sxqp").Buffer;

        function n(t, e) {
            this._block = r.alloc(t), this._finalSize = e, this._blockSize = t, this._len = 0
        }
        n.prototype.update = function(t, e) {
            "string" == typeof t && (e = e || "utf8", t = r.from(t, e));
            for (var n = this._block, i = this._blockSize, o = t.length, s = this._len, a = 0; a < o;) {
                for (var u = s % i, h = Math.min(o - a, i - u), p = 0; p < h; p++) n[u + p] = t[a + p];
                a += h, (s += h) % i == 0 && this._update(n)
            }
            return this._len += o, this
        }, n.prototype.digest = function(t) {
            var e = this._len % this._blockSize;
            this._block[e] = 128, this._block.fill(0, e + 1), e >= this._finalSize && (this._update(this._block), this._block.fill(0));
            var r = 8 * this._len;
            if (r <= 4294967295) this._block.writeUInt32BE(r, this._blockSize - 4);
            else {
                var n = (4294967295 & r) >>> 0,
                    i = (r - n) / 4294967296;
                this._block.writeUInt32BE(i, this._blockSize - 8), this._block.writeUInt32BE(n, this._blockSize - 4)
            }
            this._update(this._block);
            var o = this._hash();
            return t ? o.toString(t) : o
        }, n.prototype._update = function() {
            throw new Error("_update must be implemented by subclass")
        }, t.exports = n
    })), o.register("4Sxqp", (function(t, e) {
        var r = o("cFM5c"),
            n = r.Buffer;

        function i(t, e) {
            for (var r in t) e[r] = t[r]
        }

        function s(t, e, r) {
            return n(t, e, r)
        }
        n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? t.exports = r : (i(r, t.exports), t.exports.Buffer = s), i(n, s), s.from = function(t, e, r) {
            if ("number" == typeof t) throw new TypeError("Argument must not be a number");
            return n(t, e, r)
        }, s.alloc = function(t, e, r) {
            if ("number" != typeof t) throw new TypeError("Argument must be a number");
            var i = n(t);
            return void 0 !== e ? "string" == typeof r ? i.fill(e, r) : i.fill(e) : i.fill(0), i
        }, s.allocUnsafe = function(t) {
            if ("number" != typeof t) throw new TypeError("Argument must be a number");
            return n(t)
        }, s.allocUnsafeSlow = function(t) {
            if ("number" != typeof t) throw new TypeError("Argument must be a number");
            return r.SlowBuffer(t)
        }
    })), o.register("cFM5c", (function(e, r) {
        var n, i, s, a;
        t(e.exports, "Buffer", (function() {
            return n
        }), (function(t) {
            return n = t
        })), t(e.exports, "SlowBuffer", (function() {
            return i
        }), (function(t) {
            return i = t
        })), t(e.exports, "INSPECT_MAX_BYTES", (function() {
            return s
        }), (function(t) {
            return s = t
        })), t(e.exports, "kMaxLength", (function() {
            return a
        }), (function(t) {
            return a = t
        }));
        var u = o("das8S"),
            h = o("6HbER"),
            p = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
        n = l, i = function(t) {
            +t != t && (t = 0);
            return l.alloc(+t)
        }, s = 50;
        var f = 2147483647;

        function c(t) {
            if (t > f) throw new RangeError('The value "' + t + '" is invalid for option "size"');
            var e = new Uint8Array(t);
            return Object.setPrototypeOf(e, l.prototype), e
        }

        function l(t, e, r) {
            if ("number" == typeof t) {
                if ("string" == typeof e) throw new TypeError('The "string" argument must be of type string. Received type number');
                return g(t)
            }
            return d(t, e, r)
        }

        function d(t, e, r) {
            if ("string" == typeof t) return function(t, e) {
                "string" == typeof e && "" !== e || (e = "utf8");
                if (!l.isEncoding(e)) throw new TypeError("Unknown encoding: " + e);
                var r = 0 | b(t, e),
                    n = c(r),
                    i = n.write(t, e);
                i !== r && (n = n.slice(0, i));
                return n
            }(t, e);
            if (ArrayBuffer.isView(t)) return function(t) {
                if (K(t, Uint8Array)) {
                    var e = new Uint8Array(t);
                    return v(e.buffer, e.byteOffset, e.byteLength)
                }
                return m(t)
            }(t);
            if (null == t) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
            if (K(t, ArrayBuffer) || t && K(t.buffer, ArrayBuffer)) return v(t, e, r);
            if ("undefined" != typeof SharedArrayBuffer && (K(t, SharedArrayBuffer) || t && K(t.buffer, SharedArrayBuffer))) return v(t, e, r);
            if ("number" == typeof t) throw new TypeError('The "value" argument must not be of type number. Received type number');
            var n = t.valueOf && t.valueOf();
            if (null != n && n !== t) return l.from(n, e, r);
            var i = function(t) {
                if (l.isBuffer(t)) {
                    var e = 0 | w(t.length),
                        r = c(e);
                    return 0 === r.length || t.copy(r, 0, 0, e), r
                }
                if (void 0 !== t.length) return "number" != typeof t.length || Y(t.length) ? c(0) : m(t);
                if ("Buffer" === t.type && Array.isArray(t.data)) return m(t.data)
            }(t);
            if (i) return i;
            if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive]) return l.from(t[Symbol.toPrimitive]("string"), e, r);
            throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
        }

        function y(t) {
            if ("number" != typeof t) throw new TypeError('"size" argument must be of type number');
            if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"')
        }

        function g(t) {
            return y(t), c(t < 0 ? 0 : 0 | w(t))
        }

        function m(t) {
            for (var e = t.length < 0 ? 0 : 0 | w(t.length), r = c(e), n = 0; n < e; n += 1) r[n] = 255 & t[n];
            return r
        }

        function v(t, e, r) {
            if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
            if (t.byteLength < e + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
            var n;
            return n = void 0 === e && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, e) : new Uint8Array(t, e, r), Object.setPrototypeOf(n, l.prototype), n
        }

        function w(t) {
            if (t >= f) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + f.toString(16) + " bytes");
            return 0 | t
        }

        function b(t, e) {
            if (l.isBuffer(t)) return t.length;
            if (ArrayBuffer.isView(t) || K(t, ArrayBuffer)) return t.byteLength;
            if ("string" != typeof t) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
            var r = t.length,
                n = arguments.length > 2 && !0 === arguments[2];
            if (!n && 0 === r) return 0;
            for (var i = !1;;) switch (e) {
                case "ascii":
                case "latin1":
                case "binary":
                    return r;
                case "utf8":
                case "utf-8":
                    return N(t).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * r;
                case "hex":
                    return r >>> 1;
                case "base64":
                    return X(t).length;
                default:
                    if (i) return n ? -1 : N(t).length;
                    e = ("" + e).toLowerCase(), i = !0
            }
        }

        function _(t, e, r) {
            var n = !1;
            if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
            if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
            if ((r >>>= 0) <= (e >>>= 0)) return "";
            for (t || (t = "utf8");;) switch (t) {
                case "hex":
                    return M(this, e, r);
                case "utf8":
                case "utf-8":
                    return C(this, e, r);
                case "ascii":
                    return q(this, e, r);
                case "latin1":
                case "binary":
                    return R(this, e, r);
                case "base64":
                    return T(this, e, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return z(this, e, r);
                default:
                    if (n) throw new TypeError("Unknown encoding: " + t);
                    t = (t + "").toLowerCase(), n = !0
            }
        }

        function S(t, e, r) {
            var n = t[e];
            t[e] = t[r], t[r] = n
        }

        function U(t, e, r, n, i) {
            if (0 === t.length) return -1;
            if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), Y(r = +r) && (r = i ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
                if (i) return -1;
                r = t.length - 1
            } else if (r < 0) {
                if (!i) return -1;
                r = 0
            }
            if ("string" == typeof e && (e = l.from(e, n)), l.isBuffer(e)) return 0 === e.length ? -1 : P(t, e, r, n, i);
            if ("number" == typeof e) return e &= 255, "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : P(t, [e], r, n, i);
            throw new TypeError("val must be string, number or Buffer")
        }

        function P(t, e, r, n, i) {
            var o, s = 1,
                a = t.length,
                u = e.length;
            if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                if (t.length < 2 || e.length < 2) return -1;
                s = 2, a /= 2, u /= 2, r /= 2
            }

            function h(t, e) {
                return 1 === s ? t[e] : t.readUInt16BE(e * s)
            }
            if (i) {
                var p = -1;
                for (o = r; o < a; o++)
                    if (h(t, o) === h(e, -1 === p ? 0 : o - p)) {
                        if (-1 === p && (p = o), o - p + 1 === u) return p * s
                    } else -1 !== p && (o -= o - p), p = -1
            } else
                for (r + u > a && (r = a - u), o = r; o >= 0; o--) {
                    for (var f = !0, c = 0; c < u; c++)
                        if (h(t, o + c) !== h(e, c)) {
                            f = !1;
                            break
                        } if (f) return o
                }
            return -1
        }

        function E(t, e, r, n) {
            r = Number(r) || 0;
            var i = t.length - r;
            n ? (n = Number(n)) > i && (n = i) : n = i;
            var o = e.length;
            n > o / 2 && (n = o / 2);
            for (var s = 0; s < n; ++s) {
                var a = parseInt(e.substr(2 * s, 2), 16);
                if (Y(a)) return s;
                t[r + s] = a
            }
            return s
        }

        function A(t, e, r, n) {
            return W(N(e, t.length - r), t, r, n)
        }

        function B(t, e, r, n) {
            return W(function(t) {
                for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
                return e
            }(e), t, r, n)
        }

        function I(t, e, r, n) {
            return W(X(e), t, r, n)
        }

        function x(t, e, r, n) {
            return W(function(t, e) {
                for (var r, n, i, o = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) n = (r = t.charCodeAt(s)) >> 8, i = r % 256, o.push(i), o.push(n);
                return o
            }(e, t.length - r), t, r, n)
        }

        function T(t, e, r) {
            return 0 === e && r === t.length ? u.fromByteArray(t) : u.fromByteArray(t.slice(e, r))
        }

        function C(t, e, r) {
            r = Math.min(t.length, r);
            for (var n = [], i = e; i < r;) {
                var o, s, a, u, h = t[i],
                    p = null,
                    f = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
                if (i + f <= r) switch (f) {
                    case 1:
                        h < 128 && (p = h);
                        break;
                    case 2:
                        128 == (192 & (o = t[i + 1])) && (u = (31 & h) << 6 | 63 & o) > 127 && (p = u);
                        break;
                    case 3:
                        o = t[i + 1], s = t[i + 2], 128 == (192 & o) && 128 == (192 & s) && (u = (15 & h) << 12 | (63 & o) << 6 | 63 & s) > 2047 && (u < 55296 || u > 57343) && (p = u);
                        break;
                    case 4:
                        o = t[i + 1], s = t[i + 2], a = t[i + 3], 128 == (192 & o) && 128 == (192 & s) && 128 == (192 & a) && (u = (15 & h) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & a) > 65535 && u < 1114112 && (p = u)
                }
                null === p ? (p = 65533, f = 1) : p > 65535 && (p -= 65536, n.push(p >>> 10 & 1023 | 55296), p = 56320 | 1023 & p), n.push(p), i += f
            }
            return function(t) {
                var e = t.length;
                if (e <= O) return String.fromCharCode.apply(String, t);
                var r = "",
                    n = 0;
                for (; n < e;) r += String.fromCharCode.apply(String, t.slice(n, n += O));
                return r
            }(n)
        }
        a = f, l.TYPED_ARRAY_SUPPORT = function() {
            try {
                var t = new Uint8Array(1),
                    e = {
                        foo: function() {
                            return 42
                        }
                    };
                return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), 42 === t.foo()
            } catch (t) {
                return !1
            }
        }(), l.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(l.prototype, "parent", {
            enumerable: !0,
            get: function() {
                if (l.isBuffer(this)) return this.buffer
            }
        }), Object.defineProperty(l.prototype, "offset", {
            enumerable: !0,
            get: function() {
                if (l.isBuffer(this)) return this.byteOffset
            }
        }), l.poolSize = 8192, l.from = function(t, e, r) {
            return d(t, e, r)
        }, Object.setPrototypeOf(l.prototype, Uint8Array.prototype), Object.setPrototypeOf(l, Uint8Array), l.alloc = function(t, e, r) {
            return function(t, e, r) {
                return y(t), t <= 0 ? c(t) : void 0 !== e ? "string" == typeof r ? c(t).fill(e, r) : c(t).fill(e) : c(t)
            }(t, e, r)
        }, l.allocUnsafe = function(t) {
            return g(t)
        }, l.allocUnsafeSlow = function(t) {
            return g(t)
        }, l.isBuffer = function(t) {
            return null != t && !0 === t._isBuffer && t !== l.prototype
        }, l.compare = function(t, e) {
            if (K(t, Uint8Array) && (t = l.from(t, t.offset, t.byteLength)), K(e, Uint8Array) && (e = l.from(e, e.offset, e.byteLength)), !l.isBuffer(t) || !l.isBuffer(e)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (t === e) return 0;
            for (var r = t.length, n = e.length, i = 0, o = Math.min(r, n); i < o; ++i)
                if (t[i] !== e[i]) {
                    r = t[i], n = e[i];
                    break
                } return r < n ? -1 : n < r ? 1 : 0
        }, l.isEncoding = function(t) {
            switch (String(t).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1
            }
        }, l.concat = function(t, e) {
            if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length) return l.alloc(0);
            var r;
            if (void 0 === e)
                for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
            var n = l.allocUnsafe(e),
                i = 0;
            for (r = 0; r < t.length; ++r) {
                var o = t[r];
                if (K(o, Uint8Array)) i + o.length > n.length ? l.from(o).copy(n, i) : Uint8Array.prototype.set.call(n, o, i);
                else {
                    if (!l.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
                    o.copy(n, i)
                }
                i += o.length
            }
            return n
        }, l.byteLength = b, l.prototype._isBuffer = !0, l.prototype.swap16 = function() {
            var t = this.length;
            if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var e = 0; e < t; e += 2) S(this, e, e + 1);
            return this
        }, l.prototype.swap32 = function() {
            var t = this.length;
            if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var e = 0; e < t; e += 4) S(this, e, e + 3), S(this, e + 1, e + 2);
            return this
        }, l.prototype.swap64 = function() {
            var t = this.length;
            if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var e = 0; e < t; e += 8) S(this, e, e + 7), S(this, e + 1, e + 6), S(this, e + 2, e + 5), S(this, e + 3, e + 4);
            return this
        }, l.prototype.toString = function() {
            var t = this.length;
            return 0 === t ? "" : 0 === arguments.length ? C(this, 0, t) : _.apply(this, arguments)
        }, l.prototype.toLocaleString = l.prototype.toString, l.prototype.equals = function(t) {
            if (!l.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
            return this === t || 0 === l.compare(this, t)
        }, l.prototype.inspect = function() {
            var t = "",
                e = s;
            return t = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (t += " ... "), "<Buffer " + t + ">"
        }, p && (l.prototype[p] = l.prototype.inspect), l.prototype.compare = function(t, e, r, n, i) {
            if (K(t, Uint8Array) && (t = l.from(t, t.offset, t.byteLength)), !l.isBuffer(t)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
            if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), e < 0 || r > t.length || n < 0 || i > this.length) throw new RangeError("out of range index");
            if (n >= i && e >= r) return 0;
            if (n >= i) return -1;
            if (e >= r) return 1;
            if (this === t) return 0;
            for (var o = (i >>>= 0) - (n >>>= 0), s = (r >>>= 0) - (e >>>= 0), a = Math.min(o, s), u = this.slice(n, i), h = t.slice(e, r), p = 0; p < a; ++p)
                if (u[p] !== h[p]) {
                    o = u[p], s = h[p];
                    break
                } return o < s ? -1 : s < o ? 1 : 0
        }, l.prototype.includes = function(t, e, r) {
            return -1 !== this.indexOf(t, e, r)
        }, l.prototype.indexOf = function(t, e, r) {
            return U(this, t, e, r, !0)
        }, l.prototype.lastIndexOf = function(t, e, r) {
            return U(this, t, e, r, !1)
        }, l.prototype.write = function(t, e, r, n) {
            if (void 0 === e) n = "utf8", r = this.length, e = 0;
            else if (void 0 === r && "string" == typeof e) n = e, r = this.length, e = 0;
            else {
                if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                e >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
            }
            var i = this.length - e;
            if ((void 0 === r || r > i) && (r = i), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            n || (n = "utf8");
            for (var o = !1;;) switch (n) {
                case "hex":
                    return E(this, t, e, r);
                case "utf8":
                case "utf-8":
                    return A(this, t, e, r);
                case "ascii":
                case "latin1":
                case "binary":
                    return B(this, t, e, r);
                case "base64":
                    return I(this, t, e, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return x(this, t, e, r);
                default:
                    if (o) throw new TypeError("Unknown encoding: " + n);
                    n = ("" + n).toLowerCase(), o = !0
            }
        }, l.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        };
        var O = 4096;

        function q(t, e, r) {
            var n = "";
            r = Math.min(t.length, r);
            for (var i = e; i < r; ++i) n += String.fromCharCode(127 & t[i]);
            return n
        }

        function R(t, e, r) {
            var n = "";
            r = Math.min(t.length, r);
            for (var i = e; i < r; ++i) n += String.fromCharCode(t[i]);
            return n
        }

        function M(t, e, r) {
            var n = t.length;
            (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
            for (var i = "", o = e; o < r; ++o) i += V[t[o]];
            return i
        }

        function z(t, e, r) {
            for (var n = t.slice(e, r), i = "", o = 0; o < n.length - 1; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
            return i
        }

        function k(t, e, r) {
            if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
            if (t + e > r) throw new RangeError("Trying to access beyond buffer length")
        }

        function F(t, e, r, n, i, o) {
            if (!l.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
            if (r + n > t.length) throw new RangeError("Index out of range")
        }

        function j(t, e, r, n, i, o) {
            if (r + n > t.length) throw new RangeError("Index out of range");
            if (r < 0) throw new RangeError("Index out of range")
        }

        function L(t, e, r, n, i) {
            return e = +e, r >>>= 0, i || j(t, 0, r, 4), h.write(t, e, r, n, 23, 4), r + 4
        }

        function H(t, e, r, n, i) {
            return e = +e, r >>>= 0, i || j(t, 0, r, 8), h.write(t, e, r, n, 52, 8), r + 8
        }
        l.prototype.slice = function(t, e) {
            var r = this.length;
            (t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t);
            var n = this.subarray(t, e);
            return Object.setPrototypeOf(n, l.prototype), n
        }, l.prototype.readUintLE = l.prototype.readUIntLE = function(t, e, r) {
            t >>>= 0, e >>>= 0, r || k(t, e, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256);) n += this[t + o] * i;
            return n
        }, l.prototype.readUintBE = l.prototype.readUIntBE = function(t, e, r) {
            t >>>= 0, e >>>= 0, r || k(t, e, this.length);
            for (var n = this[t + --e], i = 1; e > 0 && (i *= 256);) n += this[t + --e] * i;
            return n
        }, l.prototype.readUint8 = l.prototype.readUInt8 = function(t, e) {
            return t >>>= 0, e || k(t, 1, this.length), this[t]
        }, l.prototype.readUint16LE = l.prototype.readUInt16LE = function(t, e) {
            return t >>>= 0, e || k(t, 2, this.length), this[t] | this[t + 1] << 8
        }, l.prototype.readUint16BE = l.prototype.readUInt16BE = function(t, e) {
            return t >>>= 0, e || k(t, 2, this.length), this[t] << 8 | this[t + 1]
        }, l.prototype.readUint32LE = l.prototype.readUInt32LE = function(t, e) {
            return t >>>= 0, e || k(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
        }, l.prototype.readUint32BE = l.prototype.readUInt32BE = function(t, e) {
            return t >>>= 0, e || k(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
        }, l.prototype.readIntLE = function(t, e, r) {
            t >>>= 0, e >>>= 0, r || k(t, e, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256);) n += this[t + o] * i;
            return n >= (i *= 128) && (n -= Math.pow(2, 8 * e)), n
        }, l.prototype.readIntBE = function(t, e, r) {
            t >>>= 0, e >>>= 0, r || k(t, e, this.length);
            for (var n = e, i = 1, o = this[t + --n]; n > 0 && (i *= 256);) o += this[t + --n] * i;
            return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o
        }, l.prototype.readInt8 = function(t, e) {
            return t >>>= 0, e || k(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
        }, l.prototype.readInt16LE = function(t, e) {
            t >>>= 0, e || k(t, 2, this.length);
            var r = this[t] | this[t + 1] << 8;
            return 32768 & r ? 4294901760 | r : r
        }, l.prototype.readInt16BE = function(t, e) {
            t >>>= 0, e || k(t, 2, this.length);
            var r = this[t + 1] | this[t] << 8;
            return 32768 & r ? 4294901760 | r : r
        }, l.prototype.readInt32LE = function(t, e) {
            return t >>>= 0, e || k(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
        }, l.prototype.readInt32BE = function(t, e) {
            return t >>>= 0, e || k(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
        }, l.prototype.readFloatLE = function(t, e) {
            return t >>>= 0, e || k(t, 4, this.length), h.read(this, t, !0, 23, 4)
        }, l.prototype.readFloatBE = function(t, e) {
            return t >>>= 0, e || k(t, 4, this.length), h.read(this, t, !1, 23, 4)
        }, l.prototype.readDoubleLE = function(t, e) {
            return t >>>= 0, e || k(t, 8, this.length), h.read(this, t, !0, 52, 8)
        }, l.prototype.readDoubleBE = function(t, e) {
            return t >>>= 0, e || k(t, 8, this.length), h.read(this, t, !1, 52, 8)
        }, l.prototype.writeUintLE = l.prototype.writeUIntLE = function(t, e, r, n) {
            (t = +t, e >>>= 0, r >>>= 0, n) || F(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
            var i = 1,
                o = 0;
            for (this[e] = 255 & t; ++o < r && (i *= 256);) this[e + o] = t / i & 255;
            return e + r
        }, l.prototype.writeUintBE = l.prototype.writeUIntBE = function(t, e, r, n) {
            (t = +t, e >>>= 0, r >>>= 0, n) || F(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
            var i = r - 1,
                o = 1;
            for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);) this[e + i] = t / o & 255;
            return e + r
        }, l.prototype.writeUint8 = l.prototype.writeUInt8 = function(t, e, r) {
            return t = +t, e >>>= 0, r || F(this, t, e, 1, 255, 0), this[e] = 255 & t, e + 1
        }, l.prototype.writeUint16LE = l.prototype.writeUInt16LE = function(t, e, r) {
            return t = +t, e >>>= 0, r || F(this, t, e, 2, 65535, 0), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
        }, l.prototype.writeUint16BE = l.prototype.writeUInt16BE = function(t, e, r) {
            return t = +t, e >>>= 0, r || F(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
        }, l.prototype.writeUint32LE = l.prototype.writeUInt32LE = function(t, e, r) {
            return t = +t, e >>>= 0, r || F(this, t, e, 4, 4294967295, 0), this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t, e + 4
        }, l.prototype.writeUint32BE = l.prototype.writeUInt32BE = function(t, e, r) {
            return t = +t, e >>>= 0, r || F(this, t, e, 4, 4294967295, 0), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
        }, l.prototype.writeIntLE = function(t, e, r, n) {
            if (t = +t, e >>>= 0, !n) {
                var i = Math.pow(2, 8 * r - 1);
                F(this, t, e, r, i - 1, -i)
            }
            var o = 0,
                s = 1,
                a = 0;
            for (this[e] = 255 & t; ++o < r && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + o - 1] && (a = 1), this[e + o] = (t / s >> 0) - a & 255;
            return e + r
        }, l.prototype.writeIntBE = function(t, e, r, n) {
            if (t = +t, e >>>= 0, !n) {
                var i = Math.pow(2, 8 * r - 1);
                F(this, t, e, r, i - 1, -i)
            }
            var o = r - 1,
                s = 1,
                a = 0;
            for (this[e + o] = 255 & t; --o >= 0 && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + o + 1] && (a = 1), this[e + o] = (t / s >> 0) - a & 255;
            return e + r
        }, l.prototype.writeInt8 = function(t, e, r) {
            return t = +t, e >>>= 0, r || F(this, t, e, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
        }, l.prototype.writeInt16LE = function(t, e, r) {
            return t = +t, e >>>= 0, r || F(this, t, e, 2, 32767, -32768), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
        }, l.prototype.writeInt16BE = function(t, e, r) {
            return t = +t, e >>>= 0, r || F(this, t, e, 2, 32767, -32768), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
        }, l.prototype.writeInt32LE = function(t, e, r) {
            return t = +t, e >>>= 0, r || F(this, t, e, 4, 2147483647, -2147483648), this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24, e + 4
        }, l.prototype.writeInt32BE = function(t, e, r) {
            return t = +t, e >>>= 0, r || F(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
        }, l.prototype.writeFloatLE = function(t, e, r) {
            return L(this, t, e, !0, r)
        }, l.prototype.writeFloatBE = function(t, e, r) {
            return L(this, t, e, !1, r)
        }, l.prototype.writeDoubleLE = function(t, e, r) {
            return H(this, t, e, !0, r)
        }, l.prototype.writeDoubleBE = function(t, e, r) {
            return H(this, t, e, !1, r)
        }, l.prototype.copy = function(t, e, r, n) {
            if (!l.isBuffer(t)) throw new TypeError("argument should be a Buffer");
            if (r || (r = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), n > 0 && n < r && (n = r), n === r) return 0;
            if (0 === t.length || 0 === this.length) return 0;
            if (e < 0) throw new RangeError("targetStart out of bounds");
            if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
            if (n < 0) throw new RangeError("sourceEnd out of bounds");
            n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
            var i = n - r;
            return this === t && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(e, r, n) : Uint8Array.prototype.set.call(t, this.subarray(r, n), e), i
        }, l.prototype.fill = function(t, e, r, n) {
            if ("string" == typeof t) {
                if ("string" == typeof e ? (n = e, e = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                if ("string" == typeof n && !l.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                if (1 === t.length) {
                    var i = t.charCodeAt(0);
                    ("utf8" === n && i < 128 || "latin1" === n) && (t = i)
                }
            } else "number" == typeof t ? t &= 255 : "boolean" == typeof t && (t = Number(t));
            if (e < 0 || this.length < e || this.length < r) throw new RangeError("Out of range index");
            if (r <= e) return this;
            var o;
            if (e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0), "number" == typeof t)
                for (o = e; o < r; ++o) this[o] = t;
            else {
                var s = l.isBuffer(t) ? t : l.from(t, n),
                    a = s.length;
                if (0 === a) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                for (o = 0; o < r - e; ++o) this[o + e] = s[o % a]
            }
            return this
        };
        var D = /[^+/0-9A-Za-z-_]/g;

        function N(t, e) {
            var r;
            e = e || 1 / 0;
            for (var n = t.length, i = null, o = [], s = 0; s < n; ++s) {
                if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
                    if (!i) {
                        if (r > 56319) {
                            (e -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        if (s + 1 === n) {
                            (e -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        i = r;
                        continue
                    }
                    if (r < 56320) {
                        (e -= 3) > -1 && o.push(239, 191, 189), i = r;
                        continue
                    }
                    r = 65536 + (i - 55296 << 10 | r - 56320)
                } else i && (e -= 3) > -1 && o.push(239, 191, 189);
                if (i = null, r < 128) {
                    if ((e -= 1) < 0) break;
                    o.push(r)
                } else if (r < 2048) {
                    if ((e -= 2) < 0) break;
                    o.push(r >> 6 | 192, 63 & r | 128)
                } else if (r < 65536) {
                    if ((e -= 3) < 0) break;
                    o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                } else {
                    if (!(r < 1114112)) throw new Error("Invalid code point");
                    if ((e -= 4) < 0) break;
                    o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                }
            }
            return o
        }

        function X(t) {
            return u.toByteArray(function(t) {
                if ((t = (t = t.split("=")[0]).trim().replace(D, "")).length < 2) return "";
                for (; t.length % 4 != 0;) t += "=";
                return t
            }(t))
        }

        function W(t, e, r, n) {
            for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i) e[i + r] = t[i];
            return i
        }

        function K(t, e) {
            return t instanceof e || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === e.name
        }

        function Y(t) {
            return t != t
        }
        var V = function() {
            for (var t = "0123456789abcdef", e = new Array(256), r = 0; r < 16; ++r)
                for (var n = 16 * r, i = 0; i < 16; ++i) e[n + i] = t[r] + t[i];
            return e
        }()
    })), o.register("das8S", (function(e, r) {
        var n, i;
        t(e.exports, "toByteArray", (function() {
            return n
        }), (function(t) {
            return n = t
        })), t(e.exports, "fromByteArray", (function() {
            return i
        }), (function(t) {
            return i = t
        })), n = function(t) {
            var e, r, n = f(t),
                i = n[0],
                o = n[1],
                u = new a(function(t, e, r) {
                    return 3 * (e + r) / 4 - r
                }(0, i, o)),
                h = 0,
                p = o > 0 ? i - 4 : i;
            for (r = 0; r < p; r += 4) e = s[t.charCodeAt(r)] << 18 | s[t.charCodeAt(r + 1)] << 12 | s[t.charCodeAt(r + 2)] << 6 | s[t.charCodeAt(r + 3)], u[h++] = e >> 16 & 255, u[h++] = e >> 8 & 255, u[h++] = 255 & e;
            2 === o && (e = s[t.charCodeAt(r)] << 2 | s[t.charCodeAt(r + 1)] >> 4, u[h++] = 255 & e);
            1 === o && (e = s[t.charCodeAt(r)] << 10 | s[t.charCodeAt(r + 1)] << 4 | s[t.charCodeAt(r + 2)] >> 2, u[h++] = e >> 8 & 255, u[h++] = 255 & e);
            return u
        }, i = function(t) {
            for (var e, r = t.length, n = r % 3, i = [], s = 16383, a = 0, u = r - n; a < u; a += s) i.push(c(t, a, a + s > u ? u : a + s));
            1 === n ? (e = t[r - 1], i.push(o[e >> 2] + o[e << 4 & 63] + "==")) : 2 === n && (e = (t[r - 2] << 8) + t[r - 1], i.push(o[e >> 10] + o[e >> 4 & 63] + o[e << 2 & 63] + "="));
            return i.join("")
        };
        for (var o = [], s = [], a = "undefined" != typeof Uint8Array ? Uint8Array : Array, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", h = 0, p = u.length; h < p; ++h) o[h] = u[h], s[u.charCodeAt(h)] = h;

        function f(t) {
            var e = t.length;
            if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            var r = t.indexOf("=");
            return -1 === r && (r = e), [r, r === e ? 0 : 4 - r % 4]
        }

        function c(t, e, r) {
            for (var n, i, s = [], a = e; a < r; a += 3) n = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (255 & t[a + 2]), s.push(o[(i = n) >> 18 & 63] + o[i >> 12 & 63] + o[i >> 6 & 63] + o[63 & i]);
            return s.join("")
        }
        s["-".charCodeAt(0)] = 62, s["_".charCodeAt(0)] = 63
    })), o.register("6HbER", (function(e, r) {
        var n, i;
        t(e.exports, "read", (function() {
            return n
        }), (function(t) {
            return n = t
        })), t(e.exports, "write", (function() {
            return i
        }), (function(t) {
            return i = t
        })), n = function(t, e, r, n, i) {
            var o, s, a = 8 * i - n - 1,
                u = (1 << a) - 1,
                h = u >> 1,
                p = -7,
                f = r ? i - 1 : 0,
                c = r ? -1 : 1,
                l = t[e + f];
            for (f += c, o = l & (1 << -p) - 1, l >>= -p, p += a; p > 0; o = 256 * o + t[e + f], f += c, p -= 8);
            for (s = o & (1 << -p) - 1, o >>= -p, p += n; p > 0; s = 256 * s + t[e + f], f += c, p -= 8);
            if (0 === o) o = 1 - h;
            else {
                if (o === u) return s ? NaN : 1 / 0 * (l ? -1 : 1);
                s += Math.pow(2, n), o -= h
            }
            return (l ? -1 : 1) * s * Math.pow(2, o - n)
        }, i = function(t, e, r, n, i, o) {
            var s, a, u, h = 8 * o - i - 1,
                p = (1 << h) - 1,
                f = p >> 1,
                c = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                l = n ? 0 : o - 1,
                d = n ? 1 : -1,
                y = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
            for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = p) : (s = Math.floor(Math.log(e) / Math.LN2), e * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (e += s + f >= 1 ? c / u : c * Math.pow(2, 1 - f)) * u >= 2 && (s++, u /= 2), s + f >= p ? (a = 0, s = p) : s + f >= 1 ? (a = (e * u - 1) * Math.pow(2, i), s += f) : (a = e * Math.pow(2, f - 1) * Math.pow(2, i), s = 0)); i >= 8; t[r + l] = 255 & a, l += d, a /= 256, i -= 8);
            for (s = s << i | a, h += i; h > 0; t[r + l] = 255 & s, l += d, s /= 256, h -= 8);
            t[r + l - d] |= 128 * y
        }
    })), o.register("dgph6", (function(t, e) {
        var r = o("2yz1O"),
            n = o("2X4kY"),
            i = o("4Sxqp").Buffer,
            s = [1518500249, 1859775393, -1894007588, -899497514],
            a = new Array(80);

        function u() {
            this.init(), this._w = a, n.call(this, 64, 56)
        }

        function h(t) {
            return t << 5 | t >>> 27
        }

        function p(t) {
            return t << 30 | t >>> 2
        }

        function f(t, e, r, n) {
            return 0 === t ? e & r | ~e & n : 2 === t ? e & r | e & n | r & n : e ^ r ^ n
        }
        r(u, n), u.prototype.init = function() {
            return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
        }, u.prototype._update = function(t) {
            for (var e, r = this._w, n = 0 | this._a, i = 0 | this._b, o = 0 | this._c, a = 0 | this._d, u = 0 | this._e, c = 0; c < 16; ++c) r[c] = t.readInt32BE(4 * c);
            for (; c < 80; ++c) r[c] = (e = r[c - 3] ^ r[c - 8] ^ r[c - 14] ^ r[c - 16]) << 1 | e >>> 31;
            for (var l = 0; l < 80; ++l) {
                var d = ~~(l / 20),
                    y = h(n) + f(d, i, o, a) + u + r[l] + s[d] | 0;
                u = a, a = o, o = p(i), i = n, n = y
            }
            this._a = n + this._a | 0, this._b = i + this._b | 0, this._c = o + this._c | 0, this._d = a + this._d | 0, this._e = u + this._e | 0
        }, u.prototype._hash = function() {
            var t = i.allocUnsafe(20);
            return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c, 8), t.writeInt32BE(0 | this._d, 12), t.writeInt32BE(0 | this._e, 16), t
        }, t.exports = u
    })), o.register("18PiT", (function(t, e) {
        var r = o("2yz1O"),
            n = o("jhpWv"),
            i = o("2X4kY"),
            s = o("4Sxqp").Buffer,
            a = new Array(64);

        function u() {
            this.init(), this._w = a, i.call(this, 64, 56)
        }
        r(u, n), u.prototype.init = function() {
            return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this._e = 4290775857, this._f = 1750603025, this._g = 1694076839, this._h = 3204075428, this
        }, u.prototype._hash = function() {
            var t = s.allocUnsafe(28);
            return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t.writeInt32BE(this._d, 12), t.writeInt32BE(this._e, 16), t.writeInt32BE(this._f, 20), t.writeInt32BE(this._g, 24), t
        }, t.exports = u
    })), o.register("jhpWv", (function(t, e) {
        var r = o("2yz1O"),
            n = o("2X4kY"),
            i = o("4Sxqp").Buffer,
            s = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
            a = new Array(64);

        function u() {
            this.init(), this._w = a, n.call(this, 64, 56)
        }

        function h(t, e, r) {
            return r ^ t & (e ^ r)
        }

        function p(t, e, r) {
            return t & e | r & (t | e)
        }

        function f(t) {
            return (t >>> 2 | t << 30) ^ (t >>> 13 | t << 19) ^ (t >>> 22 | t << 10)
        }

        function c(t) {
            return (t >>> 6 | t << 26) ^ (t >>> 11 | t << 21) ^ (t >>> 25 | t << 7)
        }

        function l(t) {
            return (t >>> 7 | t << 25) ^ (t >>> 18 | t << 14) ^ t >>> 3
        }
        r(u, n), u.prototype.init = function() {
            return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this
        }, u.prototype._update = function(t) {
            for (var e, r = this._w, n = 0 | this._a, i = 0 | this._b, o = 0 | this._c, a = 0 | this._d, u = 0 | this._e, d = 0 | this._f, y = 0 | this._g, g = 0 | this._h, m = 0; m < 16; ++m) r[m] = t.readInt32BE(4 * m);
            for (; m < 64; ++m) r[m] = 0 | (((e = r[m - 2]) >>> 17 | e << 15) ^ (e >>> 19 | e << 13) ^ e >>> 10) + r[m - 7] + l(r[m - 15]) + r[m - 16];
            for (var v = 0; v < 64; ++v) {
                var w = g + c(u) + h(u, d, y) + s[v] + r[v] | 0,
                    b = f(n) + p(n, i, o) | 0;
                g = y, y = d, d = u, u = a + w | 0, a = o, o = i, i = n, n = w + b | 0
            }
            this._a = n + this._a | 0, this._b = i + this._b | 0, this._c = o + this._c | 0, this._d = a + this._d | 0, this._e = u + this._e | 0, this._f = d + this._f | 0, this._g = y + this._g | 0, this._h = g + this._h | 0
        }, u.prototype._hash = function() {
            var t = i.allocUnsafe(32);
            return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t.writeInt32BE(this._d, 12), t.writeInt32BE(this._e, 16), t.writeInt32BE(this._f, 20), t.writeInt32BE(this._g, 24), t.writeInt32BE(this._h, 28), t
        }, t.exports = u
    })), o.register("8o8Fh", (function(t, e) {
        var r = o("2yz1O"),
            n = o("5XiLX"),
            i = o("2X4kY"),
            s = o("4Sxqp").Buffer,
            a = new Array(160);

        function u() {
            this.init(), this._w = a, i.call(this, 128, 112)
        }
        r(u, n), u.prototype.init = function() {
            return this._ah = 3418070365, this._bh = 1654270250, this._ch = 2438529370, this._dh = 355462360, this._eh = 1731405415, this._fh = 2394180231, this._gh = 3675008525, this._hh = 1203062813, this._al = 3238371032, this._bl = 914150663, this._cl = 812702999, this._dl = 4144912697, this._el = 4290775857, this._fl = 1750603025, this._gl = 1694076839, this._hl = 3204075428, this
        }, u.prototype._hash = function() {
            var t = s.allocUnsafe(48);

            function e(e, r, n) {
                t.writeInt32BE(e, n), t.writeInt32BE(r, n + 4)
            }
            return e(this._ah, this._al, 0), e(this._bh, this._bl, 8), e(this._ch, this._cl, 16), e(this._dh, this._dl, 24), e(this._eh, this._el, 32), e(this._fh, this._fl, 40), t
        }, t.exports = u
    })), o.register("5XiLX", (function(t, e) {
        var r = o("2yz1O"),
            n = o("2X4kY"),
            i = o("4Sxqp").Buffer,
            s = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591],
            a = new Array(160);

        function u() {
            this.init(), this._w = a, n.call(this, 128, 112)
        }

        function h(t, e, r) {
            return r ^ t & (e ^ r)
        }

        function p(t, e, r) {
            return t & e | r & (t | e)
        }

        function f(t, e) {
            return (t >>> 28 | e << 4) ^ (e >>> 2 | t << 30) ^ (e >>> 7 | t << 25)
        }

        function c(t, e) {
            return (t >>> 14 | e << 18) ^ (t >>> 18 | e << 14) ^ (e >>> 9 | t << 23)
        }

        function l(t, e) {
            return (t >>> 1 | e << 31) ^ (t >>> 8 | e << 24) ^ t >>> 7
        }

        function d(t, e) {
            return (t >>> 1 | e << 31) ^ (t >>> 8 | e << 24) ^ (t >>> 7 | e << 25)
        }

        function y(t, e) {
            return (t >>> 19 | e << 13) ^ (e >>> 29 | t << 3) ^ t >>> 6
        }

        function g(t, e) {
            return (t >>> 19 | e << 13) ^ (e >>> 29 | t << 3) ^ (t >>> 6 | e << 26)
        }

        function m(t, e) {
            return t >>> 0 < e >>> 0 ? 1 : 0
        }
        r(u, n), u.prototype.init = function() {
            return this._ah = 1779033703, this._bh = 3144134277, this._ch = 1013904242, this._dh = 2773480762, this._eh = 1359893119, this._fh = 2600822924, this._gh = 528734635, this._hh = 1541459225, this._al = 4089235720, this._bl = 2227873595, this._cl = 4271175723, this._dl = 1595750129, this._el = 2917565137, this._fl = 725511199, this._gl = 4215389547, this._hl = 327033209, this
        }, u.prototype._update = function(t) {
            for (var e = this._w, r = 0 | this._ah, n = 0 | this._bh, i = 0 | this._ch, o = 0 | this._dh, a = 0 | this._eh, u = 0 | this._fh, v = 0 | this._gh, w = 0 | this._hh, b = 0 | this._al, _ = 0 | this._bl, S = 0 | this._cl, U = 0 | this._dl, P = 0 | this._el, E = 0 | this._fl, A = 0 | this._gl, B = 0 | this._hl, I = 0; I < 32; I += 2) e[I] = t.readInt32BE(4 * I), e[I + 1] = t.readInt32BE(4 * I + 4);
            for (; I < 160; I += 2) {
                var x = e[I - 30],
                    T = e[I - 30 + 1],
                    C = l(x, T),
                    O = d(T, x),
                    q = y(x = e[I - 4], T = e[I - 4 + 1]),
                    R = g(T, x),
                    M = e[I - 14],
                    z = e[I - 14 + 1],
                    k = e[I - 32],
                    F = e[I - 32 + 1],
                    j = O + z | 0,
                    L = C + M + m(j, O) | 0;
                L = (L = L + q + m(j = j + R | 0, R) | 0) + k + m(j = j + F | 0, F) | 0, e[I] = L, e[I + 1] = j
            }
            for (var H = 0; H < 160; H += 2) {
                L = e[H], j = e[H + 1];
                var D = p(r, n, i),
                    N = p(b, _, S),
                    X = f(r, b),
                    W = f(b, r),
                    K = c(a, P),
                    Y = c(P, a),
                    V = s[H],
                    J = s[H + 1],
                    G = h(a, u, v),
                    $ = h(P, E, A),
                    Z = B + Y | 0,
                    Q = w + K + m(Z, B) | 0;
                Q = (Q = (Q = Q + G + m(Z = Z + $ | 0, $) | 0) + V + m(Z = Z + J | 0, J) | 0) + L + m(Z = Z + j | 0, j) | 0;
                var tt = W + N | 0,
                    et = X + D + m(tt, W) | 0;
                w = v, B = A, v = u, A = E, u = a, E = P, a = o + Q + m(P = U + Z | 0, U) | 0, o = i, U = S, i = n, S = _, n = r, _ = b, r = Q + et + m(b = Z + tt | 0, Z) | 0
            }
            this._al = this._al + b | 0, this._bl = this._bl + _ | 0, this._cl = this._cl + S | 0, this._dl = this._dl + U | 0, this._el = this._el + P | 0, this._fl = this._fl + E | 0, this._gl = this._gl + A | 0, this._hl = this._hl + B | 0, this._ah = this._ah + r + m(this._al, b) | 0, this._bh = this._bh + n + m(this._bl, _) | 0, this._ch = this._ch + i + m(this._cl, S) | 0, this._dh = this._dh + o + m(this._dl, U) | 0, this._eh = this._eh + a + m(this._el, P) | 0, this._fh = this._fh + u + m(this._fl, E) | 0, this._gh = this._gh + v + m(this._gl, A) | 0, this._hh = this._hh + w + m(this._hl, B) | 0
        }, u.prototype._hash = function() {
            var t = i.allocUnsafe(64);

            function e(e, r, n) {
                t.writeInt32BE(e, n), t.writeInt32BE(r, n + 4)
            }
            return e(this._ah, this._al, 0), e(this._bh, this._bl, 8), e(this._ch, this._cl, 16), e(this._dh, this._dl, 24), e(this._eh, this._el, 32), e(this._fh, this._fl, 40), e(this._gh, this._gl, 48), e(this._hh, this._hl, 56), t
        }, t.exports = u
    }));
    var s = {};
    ! function(t, e) {
        var r, n;
        "object" == typeof s ? s = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self, r = t.Cookies, (n = t.Cookies = e()).noConflict = function() {
            return t.Cookies = r, n
        })
    }(s, (function() {
        "use strict";

        function t(t) {
            for (var e = 1; e < arguments.length; e++) {
                var r = arguments[e];
                for (var n in r) t[n] = r[n]
            }
            return t
        }
        var e = function e(r, n) {
            function i(e, i, o) {
                if ("undefined" != typeof document) {
                    "number" == typeof(o = t({}, n, o)).expires && (o.expires = new Date(Date.now() + 864e5 * o.expires)), o.expires && (o.expires = o.expires.toUTCString()), e = encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
                    var s = "";
                    for (var a in o) o[a] && (s += "; " + a, !0 !== o[a] && (s += "=" + o[a].split(";")[0]));
                    return document.cookie = e + "=" + r.write(i, e) + s
                }
            }
            return Object.create({
                set: i,
                get: function(t) {
                    if ("undefined" != typeof document && (!arguments.length || t)) {
                        for (var e = document.cookie ? document.cookie.split("; ") : [], n = {}, i = 0; i < e.length; i++) {
                            var o = e[i].split("="),
                                s = o.slice(1).join("=");
                            try {
                                var a = decodeURIComponent(o[0]);
                                if (n[a] = r.read(s, a), t === a) break
                            } catch (t) {}
                        }
                        return t ? n[t] : n
                    }
                },
                remove: function(e, r) {
                    i(e, "", t({}, r, {
                        expires: -1
                    }))
                },
                withAttributes: function(r) {
                    return e(this.converter, t({}, this.attributes, r))
                },
                withConverter: function(r) {
                    return e(t({}, this.converter, r), this.attributes)
                }
            }, {
                attributes: {
                    value: Object.freeze(n)
                },
                converter: {
                    value: Object.freeze(r)
                }
            })
        }({
            read: function(t) {
                return '"' === t[0] && (t = t.slice(1, -1)), t.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
            },
            write: function(t) {
                return encodeURIComponent(t).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent)
            }
        }, {
            path: "/"
        });
        return e
    }));
    var a, u = a = function(t) {
        t = t.toLowerCase();
        var e = u[t];
        if (!e) throw new Error(t + " is not supported (we accept pull requests)");
        return new e
    };
    u.sha = o("gvLJ0"), u.sha1 = o("dgph6"), u.sha224 = o("18PiT"), u.sha256 = o("jhpWv"), u.sha384 = o("8o8Fh"), u.sha512 = o("5XiLX");
    var h = {};
    ! function() {
        var t, e, r, n = new Date("2060-10-22"),
            i = 2,
            o = 4,
            s = 5,
            a = 10,
            u = 20,
            p = 30,
            f = [o, p],
            c = [0, i, a],
            l = 12e4,
            d = ["maxConcurrentParts", "logging", "cloudfront", "encodeFilename", "computeContentMd5", "allowS3ExistenceOptimization", "onlyRetryForSameFileName", "timeUrl", "cryptoMd5Method", "cryptoHexEncodedHash256", "awsRegion", "awsSignatureVersion", "evaporateChanged"],
            y = {
                33: "%21",
                39: "%27",
                40: "%28",
                41: "%29",
                42: "%2A"
            },
            g = function(n) {
                if (this.config = O({
                        readableStreams: !1,
                        readableStreamPartMethod: null,
                        bucket: null,
                        logging: !0,
                        maxConcurrentParts: 5,
                        partSize: 6291456,
                        retryBackoffPower: 2,
                        maxRetryBackoffSecs: 300,
                        progressIntervalMS: 1e3,
                        cloudfront: !1,
                        s3Acceleration: !1,
                        mockLocalStorage: !1,
                        encodeFilename: !0,
                        computeContentMd5: !1,
                        allowS3ExistenceOptimization: !1,
                        onlyRetryForSameFileName: !1,
                        timeUrl: null,
                        cryptoMd5Method: null,
                        cryptoHexEncodedHash256: null,
                        aws_key: null,
                        awsRegion: "us-east-1",
                        awsSignatureVersion: "4",
                        sendCanonicalRequestToSignerUrl: !1,
                        s3FileCacheHoursAgo: null,
                        signParams: {},
                        signHeaders: {},
                        customAuthMethod: void 0,
                        maxFileSize: null,
                        signResponseHandler: null,
                        xhrWithCredentials: !1,
                        localTimeOffset: void 0,
                        evaporateChanged: function() {},
                        abortCompletionThrottlingMs: 1e3
                    }, n), "undefined" != typeof window && window.console && ((e = window.console).d = e.log, e.w = window.console.warn ? e.warn : e.d, e.e = window.console.error ? e.error : e.d), this._instantiationError = this.validateEvaporateOptions(), "string" != typeof this._instantiationError) {
                    delete this._instantiationError, this.config.logging || (e = {
                        d: function() {},
                        w: function() {},
                        e: function() {}
                    });
                    var i = new Date;
                    if (t = new Date(i.setHours(i.getHours() - (this.config.s3FileCacheHoursAgo || -100))), "number" == typeof n.localTimeOffset) this.localTimeOffset = n.localTimeOffset;
                    else {
                        var o = this;
                        g.getLocalTimeOffset(this.config).then((function(t) {
                            o.localTimeOffset = t
                        }))
                    }
                    this.pendingFiles = {}, this.queuedFiles = [], this.filesInProcess = [], r = new F(this.config.mockLocalStorage)
                } else this.supported = !1
            };

        function m(t, e, r) {
            this.fileTotalBytesUploaded = 0, this.s3Parts = [], this.partsOnS3 = [], this.partsInProcess = [], this.partsToUpload = [], this.numParts = -1, this.con = O({}, e), this.evaporate = r, this.localTimeOffset = r.localTimeOffset, this.deferredCompletion = C(), O(this, t), this.id = decodeURIComponent(this.con.bucket + "/" + this.name), this.signParams = e.signParams
        }

        function v(t, e) {
            this.fileUpload = t, this.con = t.con, this.attempts = 1, this.localTimeOffset = this.fileUpload.localTimeOffset, this.awsDeferred = C(), this.started = C(), this.awsUrl = function(t) {
                var e;
                t.aws_url ? e = [t.aws_url] : (t.s3Acceleration ? (e = ["https://", t.bucket, ".s3-accelerate"], t.cloudfront = !0) : (e = ["https://", t.cloudfront ? t.bucket + "." : "", "s3"], "us-east-1" !== t.awsRegion && e.push("-", t.awsRegion)), e.push(".amazonaws.com"));
                return e.join("")
            }(this.con), this.awsHost = B(this.awsUrl).hostname;
            var r = O({}, e);
            t.contentType && (r.contentType = t.contentType), this.updateRequest(r)
        }

        function w(t, e) {
            v.call(this, t, e)
        }

        function b(t, e, r) {
            r > -1 && (this.maxRetries = r), v.call(this, t, e)
        }

        function _(t, e) {
            var r = {
                method: "POST",
                path: "?uploads",
                step: "initiate",
                x_amz_headers: t.xAmzHeadersAtInitiate,
                not_signed_headers: t.notSignedHeadersAtInitiate,
                response_match: "<UploadId>(.+)</UploadId>"
            };
            w.call(this, t, r), this.awsKey = e
        }

        function S(t) {
            t.info("will attempt to complete upload");
            var e = {
                method: "POST",
                contentType: "application/xml; charset=UTF-8",
                path: "?uploadId=" + t.uploadId,
                x_amz_headers: t.xAmzHeadersCommon || t.xAmzHeadersAtComplete,
                step: "complete"
            };
            w.call(this, t, e)
        }

        function U(t, e) {
            this.awsKey = e, t.info("will attempt to verify existence of the file");
            var r = {
                method: "HEAD",
                path: "",
                x_amz_headers: t.xAmzHeadersCommon,
                success404: !0,
                step: "head_object"
            };
            b.call(this, t, r)
        }

        function P(t) {
            b.call(this, t), this.updateRequest(this.setupRequest(0))
        }

        function E(t, e) {
            this.part = e, this.partNumber = e.partNumber, this.start = (this.partNumber - 1) * t.con.partSize, this.end = Math.min(this.partNumber * t.con.partSize, t.sizeBytes);
            var r = {
                method: "PUT",
                path: "?partNumber=" + this.partNumber + "&uploadId=" + t.uploadId,
                step: "upload #" + this.partNumber,
                x_amz_headers: t.xAmzHeadersCommon || t.xAmzHeadersAtUpload,
                contentSha256: "UNSIGNED-PAYLOAD",
                onProgress: this.onProgress.bind(this)
            };
            v.call(this, t, r)
        }

        function A(t) {
            t.info("will attempt to abort the upload"), t.abortParts();
            var e = {
                method: "DELETE",
                path: "?uploadId=" + t.uploadId,
                x_amz_headers: t.xAmzHeadersCommon,
                success404: !0,
                step: "abort"
            };
            v.call(this, t, e)
        }

        function B(t) {
            var e, r = t || "/";
            try {
                e = new URL(r)
            } catch (t) {
                (e = document.createElement("a")).href = r
            }
            return {
                protocol: e.protocol,
                hostname: e.hostname,
                pathname: e.pathname.replace(/(^\/?)/, "/"),
                port: e.port,
                search: "?" === e.search[0] ? e.search.substr(1) : e.search,
                hash: e.hash,
                host: e.host
            }
        }

        function I(t) {
            return t ? new Date(t).toISOString() : ""
        }

        function x(t) {
            var e = T(t.responseText, "Code"),
                r = T(t.responseText, "Message");
            return e.length ? ["AWS Code: ", e, ", Message:", r].join("") : ""
        }

        function T(t, e) {
            var r = t.match(["<", e, ">(.+)</", e, ">"].join(""));
            return r ? r[1] : ""
        }

        function C() {
            var t, e = {};
            return t = new Promise((function(t, r) {
                e = {
                    resolve: t,
                    reject: r
                }
            })), {
                resolve: e.resolve,
                reject: e.reject,
                promise: t
            }
        }

        function O(t, e, r) {
            function n(t, e) {
                if ("object" == typeof e)
                    for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            }
            return t = t || {}, n(e = e || {}, r = r || {}), n(t, e), t
        }

        function q(e) {
            var i = JSON.parse(r.getItem("awsUploads") || "{}");
            if (e) {
                for (var o in i)
                    if (i.hasOwnProperty(o)) {
                        var s = i[o];
                        new Date(s.completedAt || n) < t && delete i[o]
                    } r.setItem("awsUploads", JSON.stringify(i))
            }
            return i
        }

        function R(t) {
            return [t.file.name, t.file.type, I(t.file.lastModified), t.sizeBytes].join("-")
        }

        function M(t, e) {
            var n = q();
            n[t] = e, r.setItem("awsUploads", JSON.stringify(n))
        }

        function z(t, e) {
            var r = t.indexOf(e);
            if (r > -1) return t.splice(r, 1), !0
        }

        function k(t) {
            for (var e = 0; t >= 1024;) t /= 1024, ++e;
            return [t.toFixed(2).replace(".00", ""), ["B", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"][e]].join(" ")
        }

        function F(t) {
            var e = F.supported();
            this.cacheStore = t ? {} : e ? localStorage : void 0
        }
        g.create = function(t) {
            var e = O({}, t);
            return g.getLocalTimeOffset(e).then((function(t) {
                return e.localTimeOffset = t, new Promise((function(t, r) {
                    var n = new g(e);
                    !0 === n.supported ? t(n) : r(n._instantiationError)
                }))
            }))
        }, g.getLocalTimeOffset = function(t) {
            return new Promise((function(r, n) {
                if ("number" == typeof t.localTimeOffset) return r(t.localTimeOffset);
                if (t.timeUrl) {
                    var i = new XMLHttpRequest;
                    i.open("GET", t.timeUrl + "?requestTime=" + (new Date).getTime()), i.onreadystatechange = function() {
                        if (4 === i.readyState && 200 === i.status) {
                            var t = new Date(Date.parse(i.responseText)) - new Date;
                            e.d("localTimeOffset is", t, "ms"), r(t)
                        }
                    }, i.onerror = function(t) {
                        e.e("xhr error timeUrl", t), n("Fetching offset time failed with status: " + t.status)
                    }, i.send()
                } else r(0)
            }))
        }, g.prototype.config = {}, g.prototype.localTimeOffset = 0, g.prototype.supported = !1, g.prototype._instantiationError = void 0, g.prototype.evaporatingCount = 0, g.prototype.pendingFiles = {}, g.prototype.filesInProcess = [], g.prototype.queuedFiles = [], g.prototype.startNextFile = function(t) {
            if (this.queuedFiles.length && !(this.evaporatingCount >= this.config.maxConcurrentParts)) {
                var r = this.queuedFiles.shift();
                0 === r.status ? (e.d("Starting", decodeURIComponent(r.name), "reason:", t), this.evaporatingCnt(1), r.start()) : (e.d("Requeued", decodeURIComponent(r.name), "status:", r.status, "reason:", t), this.queuedFiles.push(r))
            }
        }, g.prototype.fileCleanup = function(t) {
            z(this.queuedFiles, t), z(this.filesInProcess, t) && this.evaporatingCnt(-1), t.done(), this.consumeRemainingSlots()
        }, g.prototype.queueFile = function(t) {
            this.filesInProcess.push(t), this.queuedFiles.push(t), 1 === this.filesInProcess.length && this.startNextFile("first file")
        }, g.prototype.add = function(t, e) {
            var r, n = this;
            return new Promise((function(i, o) {
                var s, a, u, h = O(e, {});
                if (d.forEach((function(t) {
                        delete h[t]
                    })), r = O(n.config, h), void 0 === t || void 0 === t.file) return o("Missing file");
                if (r.maxFileSize && t.file.size > r.maxFileSize) return o("File size too large. Maximum size allowed is " + r.maxFileSize);
                if (void 0 === t.name) return o("Missing attribute: name");
                r.encodeFilename && (t.name = (s = t.name, a = s.split("/"), u = [], a.forEach((function(t) {
                    for (var e = [], r = encodeURIComponent(t), n = 0; n < r.length; n++) e.push(y[r.charCodeAt(n)] || r.charAt(n));
                    u.push(e.join(""))
                })), u.join("/")));
                var p = new m(O({
                        started: function() {},
                        uploadInitiated: function() {},
                        progress: function() {},
                        complete: function() {},
                        cancelled: function() {},
                        paused: function() {},
                        resumed: function() {},
                        pausing: function() {},
                        nameChanged: function() {},
                        info: function() {},
                        warn: function() {},
                        error: function() {},
                        beforeSigner: void 0,
                        xAmzHeadersAtInitiate: {},
                        notSignedHeadersAtInitiate: {},
                        xAmzHeadersCommon: null,
                        xAmzHeadersAtUpload: {},
                        xAmzHeadersAtComplete: {}
                    }, t, {
                        status: 0,
                        priority: 0,
                        loadedBytes: 0,
                        sizeBytes: t.file.size,
                        eTag: ""
                    }), r, n),
                    f = p.id;
                n.pendingFiles[f] = p, n.queueFile(p), p.deferredCompletion.promise.then((function() {
                    n.fileCleanup(p), i(decodeURIComponent(p.name))
                }), (function(t) {
                    n.fileCleanup(p), o(t)
                }))
            }))
        }, g.prototype.cancel = function(t) {
            return void 0 === t ? this._cancelAll() : this._cancelOne(t)
        }, g.prototype._cancelAll = function() {
            e.d("Canceling all file uploads");
            var t = [];
            for (var r in this.pendingFiles)
                if (this.pendingFiles.hasOwnProperty(r)) {
                    var n = this.pendingFiles[r];
                    c.indexOf(n.status) > -1 && t.push(n.stop())
                } return t.length || t.push(Promise.reject("No files to cancel.")), Promise.all(t)
        }, g.prototype._cancelOne = function(t) {
            var e = [];
            return this.pendingFiles[t] ? e.push(this.pendingFiles[t].stop()) : e.push(Promise.reject("File does not exist")), Promise.all(e)
        }, g.prototype.pause = function(t, e) {
            var r = void 0 !== (e = e || {}).force && e.force;
            return void 0 === t ? this._pauseAll(r) : this._pauseOne(t, r)
        }, g.prototype._pauseAll = function(t) {
            e.d("Pausing all file uploads");
            var r = [];
            for (var n in this.pendingFiles)
                if (this.pendingFiles.hasOwnProperty(n)) {
                    var i = this.pendingFiles[n];
                    c.indexOf(i.status) > -1 && this._pause(i, t, r)
                } return Promise.all(r)
        }, g.prototype._pauseOne = function(t, e) {
            var r = [],
                n = this.pendingFiles[t];
            return void 0 === n ? r.push(Promise.reject("Cannot pause a file that has not been added.")) : n.status === o && r.push(Promise.reject("Cannot pause a file that is already paused.")), r.length || this._pause(n, e, r), Promise.all(r)
        }, g.prototype._pause = function(t, e, r) {
            r.push(t.pause(e)), z(this.filesInProcess, t), z(this.queuedFiles, t)
        }, g.prototype.resume = function(t) {
            return void 0 === t ? this._resumeAll() : this._resumeOne(t)
        }, g.prototype._resumeAll = function() {
            for (var t in e.d("Resuming all file uploads"), this.pendingFiles)
                if (this.pendingFiles.hasOwnProperty(t)) {
                    var r = this.pendingFiles[t];
                    f.indexOf(r.status) > -1 && this.resumeFile(r)
                } return Promise.resolve()
        }, g.prototype._resumeOne = function(t) {
            var e = this.pendingFiles[t],
                r = [];
            return void 0 === e ? r.push(Promise.reject("Cannot pause a file that does not exist.")) : -1 === f.indexOf(e.status) ? r.push(Promise.reject("Cannot resume a file that has not been paused.")) : this.resumeFile(e), Promise.all(r)
        }, g.prototype.resumeFile = function(t) {
            t.resume(), this.queueFile(t)
        }, g.prototype.forceRetry = function() {}, g.prototype.consumeRemainingSlots = function() {
            var t = this.config.maxConcurrentParts - this.evaporatingCount;
            if (t)
                for (var e = 0; e < this.filesInProcess.length; e++) {
                    var r = this.filesInProcess[e].consumeSlots();
                    if (!(r < 0) && !(t -= r)) return
                }
        }, g.prototype.validateEvaporateOptions = function() {
            if (this.supported = !("undefined" == typeof File || "undefined" == typeof Promise), !this.supported) return "Evaporate requires support for File and Promise";
            if (this.config.readableStreams) {
                if ("function" != typeof this.config.readableStreamPartMethod) return "Option readableStreamPartMethod is required when readableStreams is set."
            } else if ("undefined" == typeof Blob || void 0 === (Blob.prototype.webkitSlice || Blob.prototype.mozSlice || Blob.prototype.slice)) return "Evaporate requires support for Blob [webkitSlice || mozSlice || slice]";
            if (!this.config.signerUrl && "function" != typeof this.config.customAuthMethod) return "Option signerUrl is required unless customAuthMethod is present.";
            if (!this.config.bucket) return "The AWS 'bucket' option must be present.";
            if (this.config.computeContentMd5) {
                if (this.supported = void 0 !== FileReader.prototype.readAsArrayBuffer, !this.supported) return "The browser's FileReader object does not support readAsArrayBuffer";
                if ("function" != typeof this.config.cryptoMd5Method) return "Option computeContentMd5 has been set but cryptoMd5Method is not defined.";
                if ("4" === this.config.awsSignatureVersion && "function" != typeof this.config.cryptoHexEncodedHash256) return "Option awsSignatureVersion is 4 but cryptoHexEncodedHash256 is not defined."
            } else if ("4" === this.config.awsSignatureVersion) return "Option awsSignatureVersion is 4 but computeContentMd5 is not enabled.";
            return !0
        }, g.prototype.evaporatingCnt = function(t) {
            this.evaporatingCount = Math.max(0, this.evaporatingCount + t), this.config.evaporateChanged(this, this.evaporatingCount)
        }, m.prototype.con = void 0, m.prototype.evaporate = void 0, m.prototype.localTimeOffset = 0, m.prototype.id = void 0, m.prototype.status = 0, m.prototype.numParts = -1, m.prototype.fileTotalBytesUploaded = 0, m.prototype.partsInProcess = [], m.prototype.partsToUpload = [], m.prototype.s3Parts = [], m.prototype.partsOnS3 = [], m.prototype.deferredCompletion = void 0, m.prototype.abortedByUser = !1, m.prototype.progressInterval = void 0, m.prototype.startTime = void 0, m.prototype.loaded = 0, m.prototype.totalUploaded = 0, m.prototype.updateLoaded = function(t) {
            this.loaded += t, this.fileTotalBytesUploaded += t
        }, m.prototype.progessStats = function() {
            if (0 === this.fileTotalBytesUploaded) return {
                speed: 0,
                readableSpeed: "",
                loaded: 0,
                totalUploaded: 0,
                remainingSize: this.sizeBytes,
                secondsLeft: -1,
                fileSize: this.sizeBytes
            };
            this.totalUploaded += this.loaded;
            var t = (new Date - this.startTime) / 1e3,
                e = this.totalUploaded / t,
                r = this.sizeBytes - this.fileTotalBytesUploaded,
                n = {
                    speed: e,
                    readableSpeed: k(e),
                    loaded: this.loaded,
                    totalUploaded: this.fileTotalBytesUploaded,
                    remainingSize: r,
                    secondsLeft: -1,
                    fileSize: this.sizeBytes
                };
            return e > 0 && (n.secondsLeft = Math.round(r / e)), n
        }, m.prototype.onProgress = function() {
            -1 === [u, o].indexOf(this.status) && (this.progress(this.fileTotalBytesUploaded / this.sizeBytes, this.progessStats()), this.loaded = 0)
        }, m.prototype.startMonitor = function() {
            clearInterval(this.progressInterval), this.startTime = new Date, this.loaded = 0, this.totalUploaded = 0, this.onProgress(), this.progressInterval = setInterval(this.onProgress.bind(this), this.con.progressIntervalMS)
        }, m.prototype.stopMonitor = function() {
            clearInterval(this.progressInterval)
        }, m.prototype.startNextFile = function(t) {
            this.evaporate.startNextFile(t)
        }, m.prototype.evaporatingCnt = function(t) {
            this.evaporate.evaporatingCnt(t)
        }, m.prototype.consumeRemainingSlots = function() {
            this.evaporate.consumeRemainingSlots()
        }, m.prototype.getRemainingSlots = function() {
            var t = this.evaporate.evaporatingCount;
            return !this.partsInProcess.length && t > 0 && (t -= 1), this.con.maxConcurrentParts - t
        }, m.prototype.lastPartSatisfied = Promise.resolve("onStart"), m.prototype.start = function() {
            if (this.status = i, this.startMonitor(), this.started(this.id), this.uploadId) return e.d("resuming FileUpload ", this.id), this.consumeSlots();
            var t = this.name;
            this.getUnfinishedFileUpload();
            var r = this.con.computeContentMd5 && this.con.allowS3ExistenceOptimization && void 0 !== this.firstMd5Digest && void 0 !== this.eTag;
            if (this.uploadId) {
                if (r) return this.reuseS3Object(t).then(this.deferredCompletion.resolve).catch(this.uploadFileFromScratch.bind(this));
                this.resumeInterruptedUpload().then(this._uploadComplete.bind(this)).catch(this.uploadFileFromScratch.bind(this))
            } else this.uploadFileFromScratch("")
        }, m.prototype.uploadFileFromScratch = function(t) {
            if (-1 !== c.indexOf(this.status)) return e.d(t), this.uploadId = void 0, this.uploadFile(this.name).then(this._uploadComplete.bind(this)).catch(this._abortUpload.bind(this))
        }, m.prototype._uploadComplete = function() {
            this.completeUpload().then(this.deferredCompletion.resolve)
        }, m.prototype.stop = function() {
            e.d("stopping FileUpload ", this.id), this.setStatus(s), this.info("Canceling uploads..."), this.abortedByUser = !0;
            var t = this;
            return this.abortUpload().then((function() {
                throw "User aborted the upload"
            })).catch((function(e) {
                t.deferredCompletion.reject(e)
            }))
        }, m.prototype.pause = function(t) {
            e.d("pausing FileUpload, force:", !!t, this.id);
            var r = [];
            return this.info("Pausing uploads..."), this.status = p, t ? this.abortParts(!0) : (r = this.partsInProcess.map((function(t) {
                return this.s3Parts[t].awsRequest.awsDeferred.promise
            }), this), this.pausing()), Promise.all(r).then(function() {
                this.stopMonitor(), this.status = o, this.startNextFile("pause"), this.paused()
            }.bind(this))
        }, m.prototype.resume = function() {
            this.status = 0, this.resumed()
        }, m.prototype.done = function() {
            clearInterval(this.progressInterval), this.startNextFile("file done"), this.partsOnS3 = [], this.s3Parts = []
        }, m.prototype._startCompleteUpload = function(t) {
            return function() {
                (t ? this.completeUpload() : Promise.resolve()).then(this.deferredCompletion.resolve.bind(this))
            }
        }, m.prototype._abortUpload = function() {
            if (!this.abortedByUser) {
                var t = this;
                this.abortUpload().then((function() {
                    t.deferredCompletion.reject("File upload aborted due to a part failing to upload")
                }), this.deferredCompletion.reject.bind(this))
            }
        }, m.prototype.abortParts = function(t) {
            var e = this;
            this.partsInProcess.slice(0).forEach((function(r) {
                var n = e.s3Parts[r];
                n && (n.awsRequest.abort(), t && (n.status = 0), z(e.partsInProcess, n.partNumber), e.partsToUpload.length && e.evaporatingCnt(-1))
            }))
        }, m.prototype.makeParts = function(t) {
            this.numParts = Math.ceil(this.sizeBytes / this.con.partSize) || 1;
            var e = [],
                r = this;

            function n(t) {
                z(r.partsToUpload, t.partNumber), z(r.partsInProcess, t.partNumber), r.partsToUpload.length && r.evaporatingCnt(-1)
            }

            function i(t) {
                return function() {
                    n(t), r.partsToUpload.length && r.consumeRemainingSlots(), r.partsToUpload.length < r.con.maxConcurrentParts && r.startNextFile("part resolve")
                }
            }

            function o(t) {
                return function() {
                    n(t)
                }
            }
            for (var s = t ? 1 : this.numParts, a = 1; a <= s; a++) {
                var u = this.s3Parts[a];
                if (void 0 !== u) {
                    if (3 === u.status) continue
                } else u = this.makePart(a, 0, this.sizeBytes);
                u.awsRequest = new E(this, u), u.awsRequest.awsDeferred.promise.then(i(u), o(u)), this.partsToUpload.push(a), e.push(this.s3Parts[a].awsRequest.awsDeferred.promise)
            }
            return e
        }, m.prototype.makePart = function(t, e, r) {
            var n = {
                status: e,
                loadedBytes: 0,
                loadedBytesPrevious: null,
                isEmpty: 0 === r,
                md5_digest: null,
                partNumber: t
            };
            return this.s3Parts[t] = n, n
        }, m.prototype.setStatus = function(t) {
            this.status = t
        }, m.prototype.createUploadFile = function() {
            this.status !== u && M(R(this), {
                awsKey: this.name,
                bucket: this.con.bucket,
                uploadId: this.uploadId,
                fileSize: this.sizeBytes,
                fileType: this.file.type,
                lastModifiedDate: I(this.file.lastModified),
                partSize: this.con.partSize,
                signParams: this.con.signParams,
                createdAt: (new Date).toISOString()
            })
        }, m.prototype.updateUploadFile = function(t) {
            var e = R(this);
            M(e, O({}, q()[e], t))
        }, m.prototype.completeUploadFile = function(t) {
            var e = q(),
                n = e[R(this)];
            void 0 !== n && (n.completedAt = (new Date).toISOString(), n.eTag = this.eTag, n.firstMd5Digest = this.firstMd5Digest, e[R(this)] = n, r.setItem("awsUploads", JSON.stringify(e))), this.complete(t, this.name, this.progessStats()), this.setStatus(3), this.onProgress()
        }, m.prototype.removeUploadFile = function() {
            void 0 !== this.file && function(t) {
                var e = q();
                delete e[t], r.setItem("awsUploads", JSON.stringify(e))
            }(R(this))
        }, m.prototype.getUnfinishedFileUpload = function() {
            var t = q(!0)[R(this)];
            this.canRetryUpload(t) && (this.uploadId = t.uploadId, this.name = t.awsKey, this.eTag = t.eTag, this.firstMd5Digest = t.firstMd5Digest, this.signParams = t.signParams)
        }, m.prototype.canRetryUpload = function(e) {
            if (void 0 === e) return !1;
            var r = new Date(e.completedAt || n);
            return this.con.partSize === e.partSize && r > t && this.con.bucket === e.bucket && (!this.con.onlyRetryForSameFileName || this.name === e.awsKey)
        }, m.prototype.partSuccess = function(t, r) {
            var n = r.part;
            if (e.d(r.request.step, "ETag:", t), n.isEmpty || '"d41d8cd98f00b204e9800998ecf8427e"' !== t) return n.eTag = t, n.status = 3, this.partsOnS3.push(n), !0;
            n.status = a, r.resetLoadedBytes();
            var i = ["eTag matches MD5 of 0 length blob for part #", r.partNumber, "Retrying part."].join(" ");
            e.w(i), this.warn(i)
        }, m.prototype.listPartsSuccess = function(t, e) {
            this.info("uploadId", this.uploadId, "is not complete. Fetching parts from part marker", t.partNumberMarker), e = e.replace(/(\r\n|\n|\r)/gm, "");
            for (var r = /<Part>(.+?)<\/Part\>/g;;) {
                var n = (r.exec(e) || [])[1];
                if (!n) break;
                var i = parseInt(T(n, "Size"), 10);
                this.fileTotalBytesUploaded += i, this.partsOnS3.push({
                    eTag: T(n, "ETag").replace(/&quot;/g, '"'),
                    partNumber: parseInt(T(n, "PartNumber"), 10),
                    size: i,
                    LastModified: T(n, "LastModified")
                })
            }
            return "true" === T(e, "IsTruncated") ? T(e, "NextPartNumberMarker") : void 0
        }, m.prototype.makePartsfromPartsOnS3 = function() {
            -1 !== c.indexOf(this.status) && (this.nameChanged(this.name), this.partsOnS3.forEach(function(t) {
                var e = this.makePart(t.partNumber, 3, t.size);
                e.eTag = t.eTag, e.loadedBytes = t.size, e.loadedBytesPrevious = t.size, e.finishedUploadingAt = t.LastModified
            }.bind(this)))
        }, m.prototype.completeUpload = function() {
            var t = this;
            return new S(this).send().then((function(e) {
                t.eTag = T(e.responseText, "ETag").replace(/&quot;/g, '"'), t.completeUploadFile(e)
            }))
        }, m.prototype.getCompletedPayload = function() {
            var t = [];
            return t.push("<CompleteMultipartUpload>"), this.s3Parts.forEach((function(e, r) {
                r > 0 && ["<Part><PartNumber>", r, "</PartNumber><ETag>", e.eTag, "</ETag></Part>"].forEach((function(e) {
                    t.push(e)
                }))
            })), t.push("</CompleteMultipartUpload>"), t.join("")
        }, m.prototype.consumeSlots = function() {
            if (0 === this.partsToUpload.length) return -1;
            if (this.partsToUpload.length !== this.partsInProcess.length && this.status === i) {
                var t = Math.min(this.getRemainingSlots(), this.partsToUpload.length);
                if (!t) return -1;
                for (var e = 0, r = 0; r < this.partsToUpload.length; r++) {
                    var n = this.s3Parts[this.partsToUpload[r]];
                    if (n.status !== i && this.canStartPart(n)) {
                        this.partsInProcess.length && this.partsToUpload.length > 1 && this.evaporatingCnt(1), this.partsInProcess.push(n.partNumber);
                        var o = n.awsRequest;
                        if (this.lastPartSatisfied.then(o.delaySend.bind(o)), this.lastPartSatisfied = o.getStartedPromise(), (e += 1) === t) break
                    }
                }
                var s = this.partsToUpload.length === this.partsInProcess.length,
                    a = this.getRemainingSlots();
                return s && a > 0 && this.startNextFile("consume slots"), a
            }
            return 0
        }, m.prototype.canStartPart = function(t) {
            return -1 === this.partsInProcess.indexOf(t.partNumber) && !t.awsRequest.errorExceptionStatus()
        }, m.prototype.uploadFile = function(t) {
            this.removeUploadFile();
            var e = this;
            return new _(e, t).send().then((function() {
                return e.uploadInitiated(e.uploadId), e.partsToUpload = [], e.uploadParts().then((function() {}), (function(t) {
                    throw t
                }))
            }))
        }, m.prototype.uploadParts = function() {
            if (this.loaded = 0, this.totalUploaded = 0, -1 === c.indexOf(this.status)) return Promise.reject("Part uploading stopped because the file was canceled");
            var t = this.makeParts();
            return this.setStatus(i), this.startTime = new Date, this.consumeSlots(), Promise.all(t)
        }, m.prototype.abortUpload = function() {
            return new Promise(function(t, e) {
                void 0 !== this.uploadId ? new A(this).send().then(t, e) : t()
            }.bind(this)).then(function() {
                this.setStatus(u), this.cancelled(), this.removeUploadFile()
            }.bind(this), this.deferredCompletion.reject.bind(this))
        }, m.prototype.resumeInterruptedUpload = function() {
            return new P(this).send().then(this.uploadParts.bind(this))
        }, m.prototype.reuseS3Object = function(t) {
            var r = this;
            this.makeParts(1), this.partsToUpload = [];
            var n = this.s3Parts[1];

            function i(e) {
                throw r.name = t, e
            }
            return n.awsRequest.getPartMd5Digest().then((function() {
                if (r.firstMd5Digest === n.md5_digest) return new U(r, t).send().then((function(t) {
                    e.d("headObject found matching object on S3."), r.completeUploadFile(t), r.nameChanged(r.name)
                })).catch(i);
                i(r.con.allowS3ExistenceOptimization ? "File's first part MD5 digest does not match what was stored." : "allowS3ExistenceOptimization is not enabled.")
            }))
        }, v.prototype.fileUpload = void 0, v.prototype.con = void 0, v.prototype.awsUrl = void 0, v.prototype.awsHost = void 0, v.prototype.authorize = function() {}, v.prototype.localTimeOffset = 0, v.prototype.awsDeferred = void 0, v.prototype.started = void 0, v.prototype.getPath = function() {
            var t = "/" + this.con.bucket + "/" + this.fileUpload.name;
            return (this.con.cloudfront || this.awsUrl.indexOf("cloudfront") > -1) && (t = "/" + this.fileUpload.name), t
        }, v.prototype.updateRequest = function(t) {
            this.request = t;
            var r = function(t, e) {
                var r = t.con;

                function n(t) {
                    this.request = t
                }

                function i(t) {
                    n.call(this, t)
                }

                function o(t) {
                    this._cr = void 0, n.call(this, t)
                }
                return n.prototype.request = {}, n.prototype.error = function() {}, n.prototype.authorizationString = function() {}, n.prototype.stringToSign = function() {}, n.prototype.canonicalRequest = function() {}, n.prototype.setHeaders = function() {}, n.prototype.datetime = function(t) {
                    return new Date((new Date).getTime() + t)
                }, n.prototype.dateString = function(t) {
                    return this.datetime(t).toISOString().slice(0, 19).replace(/-|:/g, "") + "Z"
                }, i.prototype = Object.create(n.prototype), i.prototype.constructor = i, i.prototype.authorizationString = function() {
                    return ["AWS ", r.aws_key, ":", this.request.auth].join("")
                }, i.prototype.stringToSign = function() {
                    var n, i = "",
                        o = [];
                    for (var s in this.request.x_amz_headers) this.request.x_amz_headers.hasOwnProperty(s) && o.push(s);
                    return o.sort(), o.forEach(function(t) {
                        i += t + ":" + this.request.x_amz_headers[t] + "\n"
                    }.bind(this)), n = this.request.method + "\n" + (this.request.md5_digest || "") + "\n" + (this.request.contentType || "") + "\n\n" + i + (r.cloudfront ? "/" + r.bucket : "") + t.getPath() + this.request.path, e.d("V2 stringToSign:", n), n
                }, i.prototype.dateString = function(t) {
                    return this.datetime(t).toUTCString()
                }, i.prototype.getPayload = function() {
                    return Promise.resolve()
                }, o.prototype = Object.create(n.prototype), o.prototype.constructor = o, o.prototype._cr = void 0, o.prototype.payload = null, o.prototype.error = function() {
                    this._cr = void 0
                }, o.prototype.getPayload = function() {
                    return t.getPayload().then(function(t) {
                        this.payload = t
                    }.bind(this))
                }, o.prototype.authorizationString = function() {
                    var t = [],
                        e = this.credentialString(),
                        n = this.canonicalHeaders();
                    return t.push(["AWS4-HMAC-SHA256 Credential=", r.aws_key, "/", e].join("")), t.push("SignedHeaders=" + n.signedHeaders), t.push("Signature=" + this.request.auth), t.join(", ")
                }, o.prototype.stringToSign = function() {
                    var t = [];
                    t.push("AWS4-HMAC-SHA256"), t.push(this.request.dateString), t.push(this.credentialString()), t.push(r.cryptoHexEncodedHash256(this.canonicalRequest()));
                    var n = t.join("\n");
                    return e.d("V4 stringToSign:", n), n
                }, o.prototype.credentialString = function() {
                    var t = [];
                    return t.push(this.request.dateString.slice(0, 8)), t.push(r.awsRegion), t.push("s3"), t.push("aws4_request"), t.join("/")
                }, o.prototype.canonicalQueryString = function() {
                    var e, r, n = t.request.query_string || "",
                        i = B([t.awsUrl, this.request.path, n].join("")).search,
                        o = i.length ? i.split("&") : [],
                        s = [];
                    for (r = 0; r < o.length; r++) e = o[r].split("="), s.push({
                        name: encodeURIComponent(e[0]),
                        value: e.length > 1 ? encodeURIComponent(e[1]) : null
                    });
                    var a = s.sort((function(t, e) {
                            return t.name < e.name ? -1 : t.name > e.name ? 1 : 0
                        })),
                        u = [];
                    for (r = 0; r < a.length; r++) e = a[r].value ? [a[r].name, a[r].value].join("=") : a[r].name + "=", u.push(e);
                    return u.join("&")
                }, o.prototype.getPayloadSha256Content = function() {
                    var t = this.request.contentSha256 || r.cryptoHexEncodedHash256(this.payload || "");
                    return e.d(this.request.step, "getPayloadSha256Content:", t), t
                }, o.prototype.canonicalHeaders = function() {
                    var e, r = [],
                        n = [];

                    function i(t, e) {
                        var i = t.toLowerCase();
                        n.push(i), r[i] = e.replace(/\s+/g, " ")
                    }
                    this.request.md5_digest && i("Content-Md5", this.request.md5_digest), i("Host", t.awsHost), this.request.contentType && i("Content-Type", this.request.contentType || "");
                    var o = this.request.x_amz_headers || {};
                    for (var s in o) o.hasOwnProperty(s) && i(s, o[s]);
                    var a = n.sort((function(t, e) {
                            return t < e ? -1 : t > e ? 1 : 0
                        })),
                        u = [],
                        h = [],
                        p = this.request.not_signed_headers || [],
                        f = [];
                    for (e = 0; e < p.length; e++) h.push(p[e].toLowerCase());
                    for (e = 0; e < a.length; e++) {
                        var c = a[e];
                        u.push([c, r[c]].join(":")), -1 === h.indexOf(c) && f.push(c)
                    }
                    return {
                        canonicalHeaders: u.join("\n"),
                        signedHeaders: f.join(";")
                    }
                }, o.prototype.canonicalRequest = function() {
                    if (void 0 !== this._cr) return this._cr;
                    var r = [];
                    r.push(this.request.method), r.push(B([t.awsUrl, t.getPath(), this.request.path].join("")).pathname), r.push(this.canonicalQueryString() || "");
                    var n = this.canonicalHeaders();
                    return r.push(n.canonicalHeaders + "\n"), r.push(n.signedHeaders), r.push(this.getPayloadSha256Content()), this._cr = r.join("\n"), e.d(this.request.step, "V4 CanonicalRequest:", this._cr), this._cr
                }, o.prototype.setHeaders = function(t) {
                    t.setRequestHeader("x-amz-content-sha256", this.getPayloadSha256Content())
                }, "4" === r.awsSignatureVersion ? o : i
            }(this, e);
            this.signer = new r(t)
        }, v.prototype.success = function() {
            this.awsDeferred.resolve(this.currentXhr)
        }, v.prototype.backOffWait = function() {
            return 1 === this.attempts ? 0 : 1e3 * Math.min(this.con.maxRetryBackoffSecs, Math.pow(this.con.retryBackoffPower, this.attempts - 2))
        }, v.prototype.error = function(t) {
            if (!this.errorExceptionStatus() && (this.signer.error(), e.d(this.request.step, "error:", this.fileUpload.id, t), void 0 === this.errorHandler(t))) {
                this.fileUpload.warn("Error in ", this.request.step, t), this.fileUpload.setStatus(a);
                var r = this,
                    n = this.backOffWait();
                this.attempts += 1, setTimeout((function() {
                    r.errorExceptionStatus() || r.trySend()
                }), n)
            }
        }, v.prototype.errorHandler = function() {}, v.prototype.errorExceptionStatus = function() {
            return !1
        }, v.prototype.getPayload = function() {
            return Promise.resolve(null)
        }, v.prototype.success_status = function(t) {
            return t.status >= 200 && t.status <= 299 || this.request.success404 && 404 === t.status
        }, v.prototype.stringToSign = function() {
            return encodeURIComponent(this.signer.stringToSign())
        }, v.prototype.canonicalRequest = function() {
            return this.signer.canonicalRequest()
        }, v.prototype.signResponse = function(t, e, r) {
            var n = this;
            return new Promise((function(i) {
                if ("function" == typeof n.con.signResponseHandler) return n.con.signResponseHandler(t, e, r).then(i);
                i(t)
            }))
        }, v.prototype.sendRequestToAWS = function() {
            var t = this;
            return new Promise((function(e, r) {
                var n = new XMLHttpRequest;
                t.currentXhr = n;
                var i = [t.awsUrl, t.getPath(), t.request.path].join(""),
                    o = {};
                for (var s in t.request.query_string && (i += t.request.query_string), O(o, t.request.not_signed_headers), O(o, t.request.x_amz_headers), n.onreadystatechange = function() {
                        if (4 === n.readyState)
                            if (t.success_status(n)) t.request.response_match && void 0 === n.response.match(new RegExp(t.request.response_match)) ? r("AWS response does not match set pattern: " + t.request.response_match) : e();
                            else {
                                var i = n.responseText ? x(n) : " ";
                                i += "status:" + n.status, r(i)
                            }
                    }, n.open(t.request.method, i), n.setRequestHeader("Authorization", t.signer.authorizationString()), o) o.hasOwnProperty(s) && n.setRequestHeader(s, o[s]);
                t.signer.setHeaders(n), t.request.contentType && n.setRequestHeader("Content-Type", t.request.contentType), t.request.md5_digest && n.setRequestHeader("Content-MD5", t.request.md5_digest), n.onerror = function(t) {
                    var e = t.responseText ? x(t) : "transport error";
                    r(e)
                }, "function" == typeof t.request.onProgress && (n.upload.onprogress = t.request.onProgress), t.getPayload().then(n.send.bind(n), r), setTimeout((function() {
                    t.started.resolve("request sent " + t.request.step)
                }), 20), t.signer.payload = null, t.payloadPromise = void 0
            }))
        }, v.prototype.authorize = function() {
            return this.request.dateString = this.signer.dateString(this.localTimeOffset), this.request.x_amz_headers = O(this.request.x_amz_headers, {
                "x-amz-date": this.request.dateString
            }), this.signer.getPayload().then(function() {
                return function(t) {
                    var e = t.fileUpload,
                        r = e.con,
                        n = t.request;

                    function i() {
                        this.request = n
                    }

                    function o() {
                        i.call(this)
                    }
                    return i.prototype = Object.create(i.prototype), i.prototype.request = {}, i.makeSignParamsObject = function(t) {
                        var e = {};
                        for (var r in t) t.hasOwnProperty(r) && ("function" == typeof t[r] ? e[r] = t[r]() : e[r] = t[r]);
                        return e
                    }, i.prototype.authorize = function() {
                        return new Promise((function(o, s) {
                            var a = new XMLHttpRequest;
                            t.currentXhr = a;
                            var u = t.stringToSign(),
                                h = [r.signerUrl, "?to_sign=", u, "&datetime=", n.dateString];
                            r.sendCanonicalRequestToSignerUrl && (h.push("&canonical_request="), h.push(encodeURIComponent(t.canonicalRequest()))), h = h.join("");
                            var p = i.makeSignParamsObject(e.signParams);
                            for (var f in p) p.hasOwnProperty(f) && (h += "&" + encodeURIComponent(f) + "=" + encodeURIComponent(p[f]));
                            r.xhrWithCredentials && (a.withCredentials = !0), a.onreadystatechange = function() {
                                if (4 === a.readyState)
                                    if (200 === a.status) t.signResponse(a.response, u, n.dateString).then(o);
                                    else {
                                        if ([401, 403].indexOf(a.status) > -1) {
                                            var r = "status:" + a.status;
                                            return e.deferredCompletion.reject("Permission denied " + r), s(r)
                                        }
                                        s("Signature fetch returned status: " + a.status)
                                    }
                            }, a.onerror = function(t) {
                                s("authorizedSend transport error: " + t.responseText)
                            }, a.open("GET", h);
                            var c = i.makeSignParamsObject(r.signHeaders);
                            for (var l in c) c.hasOwnProperty(l) && a.setRequestHeader(l, c[l]);
                            "function" == typeof e.beforeSigner && e.beforeSigner(a, h), a.send()
                        }))
                    }, o.prototype = Object.create(i.prototype), o.prototype.authorize = function() {
                        return r.customAuthMethod(i.makeSignParamsObject(e.signParams), i.makeSignParamsObject(r.signHeaders), t.stringToSign(), n.dateString, t.canonicalRequest()).catch((function(t) {
                            throw e.deferredCompletion.reject(t), t
                        }))
                    }, "function" == typeof r.customAuthMethod ? new o : new i
                }(this).authorize()
            }.bind(this))
        }, v.prototype.authorizationSuccess = function(t) {
            e.d(this.request.step, "signature:", t), this.request.auth = t
        }, v.prototype.trySend = function() {
            var t = this;
            return this.authorize().then((function(e) {
                t.authorizationSuccess(e), t.fileUpload.status !== u && t.sendRequestToAWS().then(t.success.bind(t), t.error.bind(t))
            }), t.error.bind(t))
        }, v.prototype.send = function() {
            return this.trySend(), this.awsDeferred.promise
        }, w.prototype = Object.create(v.prototype), w.prototype.constructor = w, w.prototype.errorExceptionStatus = function() {
            return [u, s].indexOf(this.fileUpload.status) > -1
        }, b.prototype = Object.create(w.prototype), b.prototype.constructor = b, b.prototype.maxRetries = 1, b.prototype.errorHandler = function(t) {
            if (this.attempts > this.maxRetries) {
                var r = ["MaxRetries exceeded. Will re-upload file id ", this.fileUpload.id, ", ", t].join("");
                return e.w(r), this.awsDeferred.reject(r), !0
            }
        }, b.prototype.rejectedSuccess = function() {
            var t = Array.prototype.slice.call(arguments, 1).join("");
            return this.awsDeferred.reject(t), !1
        }, _.prototype = Object.create(w.prototype), _.prototype.constructor = _, _.prototype.success = function() {
            var t = this.currentXhr.response.match(new RegExp(this.request.response_match));
            this.fileUpload.uploadId = t[1], this.fileUpload.awsKey = this.awsKey, e.d("InitiateMultipartUpload ID is", this.fileUpload.uploadId), this.fileUpload.createUploadFile(), this.awsDeferred.resolve(this.currentXhr)
        }, S.prototype = Object.create(w.prototype), S.prototype.constructor = S, S.prototype.getPayload = function() {
            return Promise.resolve(this.fileUpload.getCompletedPayload())
        }, U.prototype = Object.create(b.prototype), U.prototype.constructor = U, U.prototype.awsKey = void 0, U.prototype.success = function() {
            (this.currentXhr.getResponseHeader("Etag") === this.fileUpload.eTag || this.rejectedSuccess("uploadId ", this.fileUpload.id, " found on S3 but the Etag doesn't match.")) && this.awsDeferred.resolve(this.currentXhr)
        }, P.prototype = Object.create(b.prototype), P.prototype.constructor = P, P.prototype.awsKey = void 0, P.prototype.partNumberMarker = 0, P.prototype.setupRequest = function(t) {
            var r = ["setupRequest() for uploadId:", this.fileUpload.uploadId, "for part marker:", t].join(" ");
            e.d(r), this.fileUpload.info(r), this.awsKey = this.fileUpload.name, this.partNumberMarker = t;
            var n = {
                method: "GET",
                path: ["?uploadId=", this.fileUpload.uploadId].join(""),
                query_string: "&part-number-marker=" + t,
                x_amz_headers: this.fileUpload.xAmzHeadersCommon,
                step: "get upload parts",
                success404: !0
            };
            return this.request = n, n
        }, P.prototype.success = function() {
            if (404 !== this.currentXhr.status) {
                var t = this.fileUpload.listPartsSuccess(this, this.currentXhr.responseText);
                if (t) {
                    var e = this.setupRequest(t);
                    this.updateRequest(e), this.trySend()
                } else this.fileUpload.makePartsfromPartsOnS3(), this.awsDeferred.resolve(this.currentXhr)
            } else this.rejectedSuccess("uploadId ", this.fileUpload.id, " not found on S3.") && this.awsDeferred.resolve(this.currentXhr)
        }, E.prototype = Object.create(v.prototype), E.prototype.constructor = E, E.prototype.part = 1, E.prototype.payloadPromise = void 0, E.prototype.start = 0, E.prototype.end = 0, E.prototype.partNumber = void 0, E.prototype.getPartMd5Digest = function() {
            var t = this,
                r = this.part;
            return new Promise((function(e, n) {
                t.con.computeContentMd5 && !r.md5_digest ? t.getPayload().then((function(r) {
                    var n = t.con.cryptoMd5Method(r);
                    1 === t.partNumber && t.con.computeContentMd5 && void 0 === t.fileUpload.firstMd5Digest && (t.fileUpload.firstMd5Digest = n, t.fileUpload.updateUploadFile({
                        firstMd5Digest: n
                    })), e(n)
                }), n) : e(r.md5_digest)
            })).then((function(r) {
                r && (e.d(t.request.step, "MD5 digest:", r), t.request.md5_digest = r, t.part.md5_digest = r)
            }))
        }, E.prototype.sendRequestToAWS = function() {
            return this.stalledInterval = setInterval(this.stalledPartMonitor(), l), this.stalledPartMonitor(), v.prototype.sendRequestToAWS.call(this)
        }, E.prototype.send = function() {
            if (3 !== this.part.status && -1 === [u, o, s].indexOf(this.fileUpload.status)) {
                e.d("uploadPart #", this.partNumber, 1 === this.attempts ? "submitting" : "retrying"), this.part.status = i, this.attempts += 1, this.part.loadedBytesPrevious = null;
                var t = this;
                return this.getPartMd5Digest().then((function() {
                    e.d("Sending", t.request.step), v.prototype.send.call(t)
                }))
            }
        }, E.prototype.success = function() {
            clearInterval(this.stalledInterval);
            var t = this.currentXhr.getResponseHeader("ETag");
            this.currentXhr = null, this.fileUpload.partSuccess(t, this) && this.awsDeferred.resolve(this.currentXhr)
        }, E.prototype.onProgress = function(t) {
            if (t.loaded > 0) {
                var e = t.loaded - this.part.loadedBytes;
                e && (this.part.loadedBytes = t.loaded, this.fileUpload.updateLoaded(e))
            }
        }, E.prototype.stalledPartMonitor = function() {
            var t = this.part.loadedBytes,
                r = this;
            return function() {
                clearInterval(r.stalledInterval), -1 === [i, a, p, o].indexOf(r.fileUpload.status) && r.part.status !== u && r.part.loadedBytes < this.size && (t === r.part.loadedBytes ? (e.w("Part stalled. Will abort and retry:", r.partNumber, decodeURIComponent(r.fileUpload.name)), r.abort(), r.errorExceptionStatus() || r.delaySend()) : r.stalledInterval = setInterval(r.stalledPartMonitor(), l))
            }
        }, E.prototype.resetLoadedBytes = function() {
            this.fileUpload.updateLoaded(-this.part.loadedBytes), this.part.loadedBytes = 0, this.fileUpload.onProgress()
        }, E.prototype.errorExceptionStatus = function() {
            return [s, u, o, p].indexOf(this.fileUpload.status) > -1
        }, E.prototype.delaySend = function() {
            var t = this.backOffWait();
            this.attempts += 1, setTimeout(this.send.bind(this), t)
        }, E.prototype.errorHandler = function(t) {
            if (clearInterval(this.stalledInterval), t.match(/status:404/)) {
                var r = "404 error on part PUT. The part and the file will abort. " + t;
                return e.w(r), this.fileUpload.error(r), this.part.status = u, this.awsDeferred.reject(r), !0
            }
            return this.resetLoadedBytes(), this.part.status = a, this.errorExceptionStatus() || this.delaySend(), !0
        }, E.prototype.abort = function() {
            this.currentXhr && this.currentXhr.abort(), this.resetLoadedBytes(), this.attempts = 1
        }, E.size = 0, E.prototype.streamToArrayBuffer = function(t) {
            return new Promise(function(e, r) {
                if (!t.readable) return e([]);
                var n = new Uint8Array(Math.min(this.con.partSize, this.end - this.start)),
                    i = 0;

                function o(t) {
                    1 !== t.byteLength && (n.set(t, i), i += t.byteLength)
                }

                function s(t) {
                    t ? r(t) : e(n), u()
                }

                function a() {
                    e(n), u()
                }

                function u() {
                    n = null, t.removeListener("data", o), t.removeListener("end", s), t.removeListener("error", s), t.removeListener("close", a)
                }
                t.on("data", o), t.on("end", s), t.on("error", s), t.on("close", a)
            }.bind(this))
        }, E.prototype.getPayload = function() {
            return void 0 === this.payloadPromise && (this.payloadPromise = this.con.readableStreams ? this.payloadFromStream() : this.payloadFromBlob()), this.payloadPromise
        }, E.prototype.payloadFromStream = function() {
            var t = this.con.readableStreamPartMethod(this.fileUpload.file, this.start, this.end - 1);
            return new Promise(function(e, r) {
                this.streamToArrayBuffer(t).then(function(t) {
                    e(t)
                }.bind(this), r)
            }.bind(this))
        }, E.prototype.payloadFromBlob = function() {
            var t = this.fileUpload.file,
                e = t[t.slice ? "slice" : t.mozSlice ? "mozSlice" : "webkitSlice"](this.start, this.end);
            return this.con.computeContentMd5 ? new Promise((function(t) {
                var r = new FileReader;
                r.onloadend = function() {
                    var e = this.result && void 0 !== this.result.buffer ? new Uint8Array(this.result.buffer) : this.result;
                    t(e)
                }, r.readAsArrayBuffer(e)
            })) : Promise.resolve(e)
        }, E.prototype.stalledInterval = -1, E.prototype.getStartedPromise = function() {
            return this.started.promise
        }, A.prototype = Object.create(v.prototype), A.prototype.constructor = A, A.prototype.maxRetries = 1, A.prototype.success = function() {
            this.fileUpload.setStatus(u), this.awsDeferred.resolve(this.currentXhr)
        }, A.prototype.errorHandler = function(t) {
            if (this.attempts > this.maxRetries) {
                var r = "Error aborting upload, Exceeded retries deleting the file upload: " + t;
                return e.w(r), this.fileUpload.error(r), this.awsDeferred.reject(r), !0
            }
        }, F.prototype.supported = !1, F.prototype.cacheStore = void 0, F.prototype.getItem = function(t) {
            if (this.cacheStore) return this.cacheStore[t]
        }, F.prototype.setItem = function(t, e) {
            this.cacheStore && (this.cacheStore[t] = e)
        }, F.prototype.removeItem = function(t) {
            if (this.cacheStore) return delete this.cacheStore[t]
        }, F.supported = function() {
            var t = !1;
            if ("undefined" == typeof window) return t;
            if (!("localStorage" in window)) return t;
            try {
                var e = "___test";
                localStorage[e] = "OK";
                var r = localStorage[e];
                return delete localStorage[e], "OK" === r
            } catch (e) {
                return t
            }
        }, e = {
            d: function() {},
            w: function() {},
            e: function() {}
        }, h ? h = g : "undefined" != typeof window && (window.Evaporate = g)
    }();
    var p = {};
    ! function(t) {
        if ("object" == typeof p) p = t();
        else if ("function" == typeof define && define.amd) define(t);
        else {
            var e;
            try {
                e = window
            } catch (t) {
                e = self
            }
            e.SparkMD5 = t()
        }
    }((function(t) {
        "use strict";
        var e = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

        function r(t, e) {
            var r = t[0],
                n = t[1],
                i = t[2],
                o = t[3];
            n = ((n += ((i = ((i += ((o = ((o += ((r = ((r += (n & i | ~n & o) + e[0] - 680876936 | 0) << 7 | r >>> 25) + n | 0) & n | ~r & i) + e[1] - 389564586 | 0) << 12 | o >>> 20) + r | 0) & r | ~o & n) + e[2] + 606105819 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & r) + e[3] - 1044525330 | 0) << 22 | n >>> 10) + i | 0, n = ((n += ((i = ((i += ((o = ((o += ((r = ((r += (n & i | ~n & o) + e[4] - 176418897 | 0) << 7 | r >>> 25) + n | 0) & n | ~r & i) + e[5] + 1200080426 | 0) << 12 | o >>> 20) + r | 0) & r | ~o & n) + e[6] - 1473231341 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & r) + e[7] - 45705983 | 0) << 22 | n >>> 10) + i | 0, n = ((n += ((i = ((i += ((o = ((o += ((r = ((r += (n & i | ~n & o) + e[8] + 1770035416 | 0) << 7 | r >>> 25) + n | 0) & n | ~r & i) + e[9] - 1958414417 | 0) << 12 | o >>> 20) + r | 0) & r | ~o & n) + e[10] - 42063 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & r) + e[11] - 1990404162 | 0) << 22 | n >>> 10) + i | 0, n = ((n += ((i = ((i += ((o = ((o += ((r = ((r += (n & i | ~n & o) + e[12] + 1804603682 | 0) << 7 | r >>> 25) + n | 0) & n | ~r & i) + e[13] - 40341101 | 0) << 12 | o >>> 20) + r | 0) & r | ~o & n) + e[14] - 1502002290 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & r) + e[15] + 1236535329 | 0) << 22 | n >>> 10) + i | 0, n = ((n += ((i = ((i += ((o = ((o += ((r = ((r += (n & o | i & ~o) + e[1] - 165796510 | 0) << 5 | r >>> 27) + n | 0) & i | n & ~i) + e[6] - 1069501632 | 0) << 9 | o >>> 23) + r | 0) & n | r & ~n) + e[11] + 643717713 | 0) << 14 | i >>> 18) + o | 0) & r | o & ~r) + e[0] - 373897302 | 0) << 20 | n >>> 12) + i | 0, n = ((n += ((i = ((i += ((o = ((o += ((r = ((r += (n & o | i & ~o) + e[5] - 701558691 | 0) << 5 | r >>> 27) + n | 0) & i | n & ~i) + e[10] + 38016083 | 0) << 9 | o >>> 23) + r | 0) & n | r & ~n) + e[15] - 660478335 | 0) << 14 | i >>> 18) + o | 0) & r | o & ~r) + e[4] - 405537848 | 0) << 20 | n >>> 12) + i | 0, n = ((n += ((i = ((i += ((o = ((o += ((r = ((r += (n & o | i & ~o) + e[9] + 568446438 | 0) << 5 | r >>> 27) + n | 0) & i | n & ~i) + e[14] - 1019803690 | 0) << 9 | o >>> 23) + r | 0) & n | r & ~n) + e[3] - 187363961 | 0) << 14 | i >>> 18) + o | 0) & r | o & ~r) + e[8] + 1163531501 | 0) << 20 | n >>> 12) + i | 0, n = ((n += ((i = ((i += ((o = ((o += ((r = ((r += (n & o | i & ~o) + e[13] - 1444681467 | 0) << 5 | r >>> 27) + n | 0) & i | n & ~i) + e[2] - 51403784 | 0) << 9 | o >>> 23) + r | 0) & n | r & ~n) + e[7] + 1735328473 | 0) << 14 | i >>> 18) + o | 0) & r | o & ~r) + e[12] - 1926607734 | 0) << 20 | n >>> 12) + i | 0, n = ((n += ((i = ((i += ((o = ((o += ((r = ((r += (n ^ i ^ o) + e[5] - 378558 | 0) << 4 | r >>> 28) + n | 0) ^ n ^ i) + e[8] - 2022574463 | 0) << 11 | o >>> 21) + r | 0) ^ r ^ n) + e[11] + 1839030562 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ r) + e[14] - 35309556 | 0) << 23 | n >>> 9) + i | 0, n = ((n += ((i = ((i += ((o = ((o += ((r = ((r += (n ^ i ^ o) + e[1] - 1530992060 | 0) << 4 | r >>> 28) + n | 0) ^ n ^ i) + e[4] + 1272893353 | 0) << 11 | o >>> 21) + r | 0) ^ r ^ n) + e[7] - 155497632 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ r) + e[10] - 1094730640 | 0) << 23 | n >>> 9) + i | 0, n = ((n += ((i = ((i += ((o = ((o += ((r = ((r += (n ^ i ^ o) + e[13] + 681279174 | 0) << 4 | r >>> 28) + n | 0) ^ n ^ i) + e[0] - 358537222 | 0) << 11 | o >>> 21) + r | 0) ^ r ^ n) + e[3] - 722521979 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ r) + e[6] + 76029189 | 0) << 23 | n >>> 9) + i | 0, n = ((n += ((i = ((i += ((o = ((o += ((r = ((r += (n ^ i ^ o) + e[9] - 640364487 | 0) << 4 | r >>> 28) + n | 0) ^ n ^ i) + e[12] - 421815835 | 0) << 11 | o >>> 21) + r | 0) ^ r ^ n) + e[15] + 530742520 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ r) + e[2] - 995338651 | 0) << 23 | n >>> 9) + i | 0, n = ((n += ((o = ((o += (n ^ ((r = ((r += (i ^ (n | ~o)) + e[0] - 198630844 | 0) << 6 | r >>> 26) + n | 0) | ~i)) + e[7] + 1126891415 | 0) << 10 | o >>> 22) + r | 0) ^ ((i = ((i += (r ^ (o | ~n)) + e[14] - 1416354905 | 0) << 15 | i >>> 17) + o | 0) | ~r)) + e[5] - 57434055 | 0) << 21 | n >>> 11) + i | 0, n = ((n += ((o = ((o += (n ^ ((r = ((r += (i ^ (n | ~o)) + e[12] + 1700485571 | 0) << 6 | r >>> 26) + n | 0) | ~i)) + e[3] - 1894986606 | 0) << 10 | o >>> 22) + r | 0) ^ ((i = ((i += (r ^ (o | ~n)) + e[10] - 1051523 | 0) << 15 | i >>> 17) + o | 0) | ~r)) + e[1] - 2054922799 | 0) << 21 | n >>> 11) + i | 0, n = ((n += ((o = ((o += (n ^ ((r = ((r += (i ^ (n | ~o)) + e[8] + 1873313359 | 0) << 6 | r >>> 26) + n | 0) | ~i)) + e[15] - 30611744 | 0) << 10 | o >>> 22) + r | 0) ^ ((i = ((i += (r ^ (o | ~n)) + e[6] - 1560198380 | 0) << 15 | i >>> 17) + o | 0) | ~r)) + e[13] + 1309151649 | 0) << 21 | n >>> 11) + i | 0, n = ((n += ((o = ((o += (n ^ ((r = ((r += (i ^ (n | ~o)) + e[4] - 145523070 | 0) << 6 | r >>> 26) + n | 0) | ~i)) + e[11] - 1120210379 | 0) << 10 | o >>> 22) + r | 0) ^ ((i = ((i += (r ^ (o | ~n)) + e[2] + 718787259 | 0) << 15 | i >>> 17) + o | 0) | ~r)) + e[9] - 343485551 | 0) << 21 | n >>> 11) + i | 0, t[0] = r + t[0] | 0, t[1] = n + t[1] | 0, t[2] = i + t[2] | 0, t[3] = o + t[3] | 0
        }

        function n(t) {
            var e, r = [];
            for (e = 0; e < 64; e += 4) r[e >> 2] = t.charCodeAt(e) + (t.charCodeAt(e + 1) << 8) + (t.charCodeAt(e + 2) << 16) + (t.charCodeAt(e + 3) << 24);
            return r
        }

        function i(t) {
            var e, r = [];
            for (e = 0; e < 64; e += 4) r[e >> 2] = t[e] + (t[e + 1] << 8) + (t[e + 2] << 16) + (t[e + 3] << 24);
            return r
        }

        function o(t) {
            var e, i, o, s, a, u, h = t.length,
                p = [1732584193, -271733879, -1732584194, 271733878];
            for (e = 64; e <= h; e += 64) r(p, n(t.substring(e - 64, e)));
            for (i = (t = t.substring(e - 64)).length, o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], e = 0; e < i; e += 1) o[e >> 2] |= t.charCodeAt(e) << (e % 4 << 3);
            if (o[e >> 2] |= 128 << (e % 4 << 3), e > 55)
                for (r(p, o), e = 0; e < 16; e += 1) o[e] = 0;
            return s = (s = 8 * h).toString(16).match(/(.*?)(.{0,8})$/), a = parseInt(s[2], 16), u = parseInt(s[1], 16) || 0, o[14] = a, o[15] = u, r(p, o), p
        }

        function s(t) {
            var r, n = "";
            for (r = 0; r < 4; r += 1) n += e[t >> 8 * r + 4 & 15] + e[t >> 8 * r & 15];
            return n
        }

        function a(t) {
            var e;
            for (e = 0; e < t.length; e += 1) t[e] = s(t[e]);
            return t.join("")
        }

        function u(t) {
            return /[\u0080-\uFFFF]/.test(t) && (t = unescape(encodeURIComponent(t))), t
        }

        function h(t) {
            var e, r = [],
                n = t.length;
            for (e = 0; e < n - 1; e += 2) r.push(parseInt(t.substr(e, 2), 16));
            return String.fromCharCode.apply(String, r)
        }

        function p() {
            this.reset()
        }
        return "5d41402abc4b2a76b9719d911017c592" !== a(o("hello")) && function(t, e) {
            var r = (65535 & t) + (65535 & e);
            return (t >> 16) + (e >> 16) + (r >> 16) << 16 | 65535 & r
        }, "undefined" == typeof ArrayBuffer || ArrayBuffer.prototype.slice || function() {
            function e(t, e) {
                return (t = 0 | t || 0) < 0 ? Math.max(t + e, 0) : Math.min(t, e)
            }
            ArrayBuffer.prototype.slice = function(r, n) {
                var i, o, s, a, u = this.byteLength,
                    h = e(r, u),
                    p = u;
                return n !== t && (p = e(n, u)), h > p ? new ArrayBuffer(0) : (i = p - h, o = new ArrayBuffer(i), s = new Uint8Array(o), a = new Uint8Array(this, h, i), s.set(a), o)
            }
        }(), p.prototype.append = function(t) {
            return this.appendBinary(u(t)), this
        }, p.prototype.appendBinary = function(t) {
            this._buff += t, this._length += t.length;
            var e, i = this._buff.length;
            for (e = 64; e <= i; e += 64) r(this._hash, n(this._buff.substring(e - 64, e)));
            return this._buff = this._buff.substring(e - 64), this
        }, p.prototype.end = function(t) {
            var e, r, n = this._buff,
                i = n.length,
                o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (e = 0; e < i; e += 1) o[e >> 2] |= n.charCodeAt(e) << (e % 4 << 3);
            return this._finish(o, i), r = a(this._hash), t && (r = h(r)), this.reset(), r
        }, p.prototype.reset = function() {
            return this._buff = "", this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this
        }, p.prototype.getState = function() {
            return {
                buff: this._buff,
                length: this._length,
                hash: this._hash.slice()
            }
        }, p.prototype.setState = function(t) {
            return this._buff = t.buff, this._length = t.length, this._hash = t.hash, this
        }, p.prototype.destroy = function() {
            delete this._hash, delete this._buff, delete this._length
        }, p.prototype._finish = function(t, e) {
            var n, i, o, s = e;
            if (t[s >> 2] |= 128 << (s % 4 << 3), s > 55)
                for (r(this._hash, t), s = 0; s < 16; s += 1) t[s] = 0;
            n = (n = 8 * this._length).toString(16).match(/(.*?)(.{0,8})$/), i = parseInt(n[2], 16), o = parseInt(n[1], 16) || 0, t[14] = i, t[15] = o, r(this._hash, t)
        }, p.hash = function(t, e) {
            return p.hashBinary(u(t), e)
        }, p.hashBinary = function(t, e) {
            var r = a(o(t));
            return e ? h(r) : r
        }, p.ArrayBuffer = function() {
            this.reset()
        }, p.ArrayBuffer.prototype.append = function(t) {
            var e, n, o, s, a, u = (n = this._buff.buffer, o = t, s = !0, (a = new Uint8Array(n.byteLength + o.byteLength)).set(new Uint8Array(n)), a.set(new Uint8Array(o), n.byteLength), s ? a : a.buffer),
                h = u.length;
            for (this._length += t.byteLength, e = 64; e <= h; e += 64) r(this._hash, i(u.subarray(e - 64, e)));
            return this._buff = e - 64 < h ? new Uint8Array(u.buffer.slice(e - 64)) : new Uint8Array(0), this
        }, p.ArrayBuffer.prototype.end = function(t) {
            var e, r, n = this._buff,
                i = n.length,
                o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (e = 0; e < i; e += 1) o[e >> 2] |= n[e] << (e % 4 << 3);
            return this._finish(o, i), r = a(this._hash), t && (r = h(r)), this.reset(), r
        }, p.ArrayBuffer.prototype.reset = function() {
            return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this
        }, p.ArrayBuffer.prototype.getState = function() {
            var t, e = p.prototype.getState.call(this);
            return e.buff = (t = e.buff, String.fromCharCode.apply(null, new Uint8Array(t))), e
        }, p.ArrayBuffer.prototype.setState = function(t) {
            return t.buff = function(t, e) {
                var r, n = t.length,
                    i = new ArrayBuffer(n),
                    o = new Uint8Array(i);
                for (r = 0; r < n; r += 1) o[r] = t.charCodeAt(r);
                return e ? o : i
            }(t.buff, !0), p.prototype.setState.call(this, t)
        }, p.ArrayBuffer.prototype.destroy = p.prototype.destroy, p.ArrayBuffer.prototype._finish = p.prototype._finish, p.ArrayBuffer.hash = function(t, e) {
            var n = a(function(t) {
                var e, n, o, s, a, u, h = t.length,
                    p = [1732584193, -271733879, -1732584194, 271733878];
                for (e = 64; e <= h; e += 64) r(p, i(t.subarray(e - 64, e)));
                for (n = (t = e - 64 < h ? t.subarray(e - 64) : new Uint8Array(0)).length, o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], e = 0; e < n; e += 1) o[e >> 2] |= t[e] << (e % 4 << 3);
                if (o[e >> 2] |= 128 << (e % 4 << 3), e > 55)
                    for (r(p, o), e = 0; e < 16; e += 1) o[e] = 0;
                return s = (s = 8 * h).toString(16).match(/(.*?)(.{0,8})$/), a = parseInt(s[2], 16), u = parseInt(s[1], 16) || 0, o[14] = a, o[15] = u, r(p, o), p
            }(new Uint8Array(t)));
            return e ? h(n) : n
        }, p
    }));
    const f = (t, e, r, n, i, o) => {
            let s = new XMLHttpRequest;
            s.open(t, e, !0), Object.keys(n).forEach((t => {
                s.setRequestHeader(t, n[t])
            })), s.onload = () => {
                o(s.status, s.responseText)
            }, s.onerror = s.onabort = () => {
                y(!1), l(i, "Sorry, failed to upload file.")
            }, s.send(r)
        },
        c = t => {
            let e;
            try {
                e = JSON.parse(t)
            } catch (t) {
                e = null
            }
            return e
        },
        l = (t, e) => {
            t.className = "s3direct form-active", t.querySelector(".file-input").value = "", alert(e)
        };
    let d = 0;
    const y = t => {
            const e = document.querySelector(".submit-row");
            if (!e) return;
            const r = e.querySelectorAll("input[type=submit],button[type=submit]");
            !0 === t ? d++ : d--, [].forEach.call(r, (t => {
                t.disabled = 0 !== d
            }))
        },
        g = (t, e, r, n) => {
            const i = t.querySelector(".file-link"),
                o = t.querySelector(".file-url");
            o.value = e + "/" + r + "/" + n, i.setAttribute("href", o.value), i.innerHTML = (t => decodeURIComponent((t + "").replace(/\+/g, "%20")))(o.value).split("/").pop(), t.className = "s3direct link-active", t.querySelector(".bar").style.width = "0%", y(!1)
        },
        m = t => btoa(e(p).ArrayBuffer.hash(t, !0)),
        v = t => e(a)("sha256").update(t, "utf-8").digest("hex"),
        w = t => {
            const r = t.querySelector(".csrf-cookie-name"),
                n = document.querySelector("input[name=csrfmiddlewaretoken]");
            return n ? n.value : e(s).get(r.value)
        },
        b = (t, e, r) => {
            const n = {};
            return t && (n["x-amz-acl"] = t), r && (n["x-amz-security-token"] = r), e && (n["x-amz-server-side-encryption"] = e), n
        },
        _ = t => {
            const e = {};
            return t && (e["x-amz-security-token"] = t), e
        },
        S = (t, e, r) => (n, i, o, s, a) => new Promise(((n, i) => {
            const a = new FormData,
                u = {
                    "X-CSRFToken": w(t)
                };
            a.append("to_sign", o), a.append("datetime", s), a.append("dest", r), f("POST", e, a, u, t, ((t, e) => {
                const r = c(e);
                if (200 === t) n(r.s3ObjKey);
                else i(r.error)
            }))
        })),
        U = (t, r, n, i, o) => {
            const s = {
                    customAuthMethod: S(t, r, o),
                    aws_key: n.access_key_id,
                    bucket: n.bucket,
                    aws_url: n.endpoint,
                    awsRegion: n.region,
                    computeContentMd5: !0,
                    cryptoMd5Method: m,
                    cryptoHexEncodedHash256: v,
                    partSize: 20971520,
                    logging: !0,
                    allowS3ExistenceOptimization: n.allow_existence_optimization,
                    s3FileCacheHoursAgo: n.allow_existence_optimization ? 12 : 0
                },
                a = {
                    name: n.object_key,//'123.csv',//
                    file: i,
                    contentType: i.type,
                    xAmzHeadersCommon: _(n.session_token),
                    xAmzHeadersAtInitiate: b(n.acl, n.server_side_encryption, n.session_token),
                    progress: (e, r) => {
                        ((t, e) => {
                            t.querySelector(".bar").style.width = Math.round(100 * e) + "%"
                        })(t, e)
                    },
                    warn: (e, r, n) => {
                        n.includes("InvalidAccessKeyId") && l(t, n)
                    }
                },
                u = {};
            n.cache_control && (u["Cache-Control"] = n.cache_control), n.content_disposition && (u["Content-Disposition"] = n.content_disposition), a.notSignedHeadersAtInitiate = u, e(h).create(s).then((e => {
                y(!0), t.className = "s3direct progress-active";
                const r = t.querySelector(".cancel-button"),
                    i = t => {
                        t.preventDefault(), e.cancel(`${n.bucket}/${a.name}`)
                    };
                r.addEventListener("click", i, !1), e.add(a).then((e => {
                    r.removeEventListener("click", i), g(t, n.endpoint, n.bucket, e)
                }), (e => (r.removeEventListener("click", i), l(t, e))))
            }))
        },
        P = t => {
            const e = t.target.parentElement,
                r = e.querySelector(".file-input").files[0],
                n = e.querySelector(".file-dest").value,
                i = e.getAttribute("data-policy-url"),
                o = e.getAttribute("data-signing-url"),
                s = new FormData,
                a = {
                    "X-CSRFToken": w(e)
                };
            s.append("dest", n), s.append("name", r.name), s.append("type", r.type), s.append("size", r.size), f("POST", i, s, a, e, ((t, i) => {
                const s = c(i);
                switch (t) {
                    case 200:
                        U(e, o, s, r, n);
                        break;
                    case 400:
                    case 403:
                    case 500:
                        l(e, s.error);
                        break;
                    default:
                        l(e, "Sorry, could not get upload URL.")
                }
            }))
        },
        E = t => {
            t.preventDefault();
            const e = t.target.parentElement;
            e.querySelector(".file-url").value = "", e.querySelector(".file-input").value = "", e.className = "s3direct form-active"
        },
        A = t => {
            const e = t.querySelector(".file-url"),
                r = t.querySelector(".file-input"),
                n = t.querySelector(".file-remove"),
                i = "" === e.value ? "form" : "link";
            t.className = "s3direct " + i + "-active", n.addEventListener("click", E, !1), r.addEventListener("change", P, !1)
        };
    console.log('mykey', n)
    new MutationObserver((function(t) {
        [].forEach.call(document.querySelectorAll(".s3direct"), A)
    })).observe(document.body, {
        childList: !0,
        subtree: !0
    })
}();

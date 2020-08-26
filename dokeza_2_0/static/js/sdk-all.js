/*
 * Copyright (C) Ascensio System SIA 2012-2020. All rights reserved
 *
 * https://www.onlyoffice.com/
 *
 * Version: 5.6.1 (build:6)
 */

var tb;
function ub(f) {
    var e = 0;
    return function() {
        return e < f.length ? {
            done: !1,
            value: f[e++]
        } : {
            done: !0
        }
    }
}
function vb(f) {
    var e = "undefined" != typeof Symbol && Symbol.iterator && f[Symbol.iterator];
    return e ? e.call(f) : {
        next: ub(f)
    }
}
var id = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this
  , wd = "function" == typeof Object.defineProperties ? Object.defineProperty : function(f, e, Ia) {
    f != Array.prototype && f != Object.prototype && (f[e] = Ia.value)
}
;
function xd(f, e) {
    if (e) {
        var Ia = id;
        f = f.split(".");
        for (var $a = 0; $a < f.length - 1; $a++) {
            var Va = f[$a];
            Va in Ia || (Ia[Va] = {});
            Ia = Ia[Va]
        }
        f = f[f.length - 1];
        $a = Ia[f];
        e = e($a);
        e != $a && null != e && wd(Ia, f, {
            configurable: !0,
            writable: !0,
            value: e
        })
    }
}
xd("Promise", function(f) {
    function e(e) {
        this.XBf = 0;
        this.ueg = void 0;
        this.y9d = [];
        var f = this.H5f();
        try {
            e(f.resolve, f.reject)
        } catch (Sb) {
            f.reject(Sb)
        }
    }
    function Ia() {
        this.Esd = null
    }
    function $a(f) {
        return f instanceof e ? f : new e(function(e) {
            e(f)
        }
        )
    }
    if (f)
        return f;
    Ia.prototype.atg = function(e) {
        if (null == this.Esd) {
            this.Esd = [];
            var f = this;
            this.btg(function() {
                f.b_g()
            })
        }
        this.Esd.push(e)
    }
    ;
    var Va = id.setTimeout;
    Ia.prototype.btg = function(e) {
        Va(e, 0)
    }
    ;
    Ia.prototype.b_g = function() {
        for (; this.Esd && this.Esd.length; ) {
            var e = this.Esd;
            this.Esd = [];
            for (var f = 0; f < e.length; ++f) {
                var Ia = e[f];
                e[f] = null;
                try {
                    Ia()
                } catch (kb) {
                    this.bXg(kb)
                }
            }
        }
        this.Esd = null
    }
    ;
    Ia.prototype.bXg = function(e) {
        this.btg(function() {
            throw e;
        })
    }
    ;
    e.prototype.H5f = function() {
        function e(e) {
            return function(y) {
                Ia || (Ia = !0,
                e.call(f, y))
            }
        }
        var f = this
          , Ia = !1;
        return {
            resolve: e(this.d6g),
            reject: e(this.feg)
        }
    }
    ;
    e.prototype.d6g = function(f) {
        if (f === this)
            this.feg(new TypeError("A Promise cannot resolve to itself"));
        else if (f instanceof e)
            this.S6g(f);
        else {
            a: switch (typeof f) {
            case "object":
                var y = null != f;
                break a;
            case "function":
                y = !0;
                break a;
            default:
                y = !1
            }
            y ? this.c6g(f) : this.Kwg(f)
        }
    }
    ;
    e.prototype.c6g = function(e) {
        var f = void 0;
        try {
            f = e.then
        } catch (Sb) {
            this.feg(Sb);
            return
        }
        "function" == typeof f ? this.T6g(f, e) : this.Kwg(e)
    }
    ;
    e.prototype.feg = function(e) {
        this.$Eg(2, e)
    }
    ;
    e.prototype.Kwg = function(e) {
        this.$Eg(1, e)
    }
    ;
    e.prototype.$Eg = function(e, f) {
        if (0 != this.XBf)
            throw Error("Cannot settle(" + e + ", " + f + "): Promise already settled in state" + this.XBf);
        this.XBf = e;
        this.ueg = f;
        this.c_g()
    }
    ;
    e.prototype.c_g = function() {
        if (null != this.y9d) {
            for (var e = 0; e < this.y9d.length; ++e)
                ib.atg(this.y9d[e]);
            this.y9d = null
        }
    }
    ;
    var ib = new Ia;
    e.prototype.S6g = function(e) {
        var f = this.H5f();
        e.MJf(f.resolve, f.reject)
    }
    ;
    e.prototype.T6g = function(e, f) {
        var y = this.H5f();
        try {
            e.call(f, y.resolve, y.reject)
        } catch (kb) {
            y.reject(kb)
        }
    }
    ;
    e.prototype.then = function(f, Ia) {
        function y(e, f) {
            return "function" == typeof e ? function(f) {
                try {
                    Va(e(f))
                } catch (Pb) {
                    Ta(Pb)
                }
            }
            : f
        }
        var Va, Ta, ib = new e(function(e, f) {
            Va = e;
            Ta = f
        }
        );
        this.MJf(y(f, Va), y(Ia, Ta));
        return ib
    }
    ;
    e.prototype.catch = function(e) {
        return this.then(void 0, e)
    }
    ;
    e.prototype.MJf = function(e, f) {
        function y() {
            switch (Ia.XBf) {
            case 1:
                e(Ia.ueg);
                break;
            case 2:
                f(Ia.ueg);
                break;
            default:
                throw Error("Unexpected state: " + Ia.XBf);
            }
        }
        var Ia = this;
        null == this.y9d ? ib.atg(y) : this.y9d.push(y)
    }
    ;
    e.resolve = $a;
    e.reject = function(f) {
        return new e(function(e, y) {
            y(f)
        }
        )
    }
    ;
    e.race = function(f) {
        return new e(function(e, y) {
            for (var Ia = vb(f), Ta = Ia.next(); !Ta.done; Ta = Ia.next())
                $a(Ta.value).MJf(e, y)
        }
        )
    }
    ;
    e.all = function(f) {
        var y = vb(f)
          , Ia = y.next();
        return Ia.done ? $a([]) : new e(function(e, f) {
            function Ta(f) {
                return function(y) {
                    Xa[f] = y;
                    Va--;
                    0 == Va && e(Xa)
                }
            }
            var Xa = []
              , Va = 0;
            do
                Xa.push(void 0),
                Va++,
                $a(Ia.value).MJf(Ta(Xa.length - 1), f),
                Ia = y.next();
            while (!Ia.done)
        }
        )
    }
    ;
    return e
});
xd("Array.prototype.fill", function(f) {
    return f ? f : function(e, f, $a) {
        var Ia = this.length || 0;
        0 > f && (f = Math.max(0, Ia + f));
        if (null == $a || $a > Ia)
            $a = Ia;
        $a = Number($a);
        0 > $a && ($a = Math.max(0, Ia + $a));
        for (f = Number(f || 0); f < $a; f++)
            this[f] = e;
        return this
    }
});
function yd(f, e, Ia) {
    if (null == f)
        throw new TypeError("The 'this' value for String.prototype." + Ia + " must not be null or undefined");
    if (e instanceof RegExp)
        throw new TypeError("First argument to String.prototype." + Ia + " must not be a regular expression");
    return f + ""
}
xd("String.prototype.repeat", function(f) {
    return f ? f : function(e) {
        var f = yd(this, null, "repeat");
        if (0 > e || 1342177279 < e)
            throw new RangeError("Invalid count value");
        e |= 0;
        for (var $a = ""; e; )
            if (e & 1 && ($a += f),
            e >>>= 1)
                f += f;
        return $a
    }
});
xd("Number.isFinite", function(f) {
    return f ? f : function(e) {
        return "number" !== typeof e ? !1 : !isNaN(e) && Infinity !== e && -Infinity !== e
    }
});
xd("Number.isInteger", function(f) {
    return f ? f : function(e) {
        return Number.isFinite(e) ? e === Math.floor(e) : !1
    }
});
xd("String.prototype.endsWith", function(f) {
    return f ? f : function(e, f) {
        var Ia = yd(this, e, "endsWith");
        e += "";
        void 0 === f && (f = Ia.length);
        f = Math.max(0, Math.min(f | 0, Ia.length));
        for (var Va = e.length; 0 < Va && 0 < f; )
            if (Ia[--f] != e[--Va])
                return !1;
        return 0 >= Va
    }
});
xd("String.prototype.padStart", function(f) {
    return f ? f : function(e, f) {
        var Ia = yd(this, null, "padStart");
        e -= Ia.length;
        f = void 0 !== f ? String(f) : " ";
        return (0 < e && f ? f.repeat(Math.ceil(e / f.length)).substring(0, e) : "") + Ia
    }
});
function me() {
    me = function() {}
    ;
    id.Symbol || (id.Symbol = ne)
}
function oe(f, e) {
    this.MGg = f;
    wd(this, "description", {
        configurable: !0,
        writable: !0,
        value: e
    })
}
oe.prototype.toString = function() {
    return this.MGg
}
;
var ne = function() {
    function f(Ia) {
        if (this instanceof f)
            throw new TypeError("Symbol is not a constructor");
        return new oe("jscomp_symbol_" + (Ia || "") + "_" + e++,Ia)
    }
    var e = 0;
    return f
}();
function Vf() {
    me();
    var f = id.Symbol.iterator;
    f || (f = id.Symbol.iterator = id.Symbol("Symbol.iterator"));
    "function" != typeof Array.prototype[f] && wd(Array.prototype, f, {
        configurable: !0,
        writable: !0,
        value: function() {
            return Yh(ub(this))
        }
    });
    Vf = function() {}
}
function Yh(f) {
    Vf();
    f = {
        next: f
    };
    f[id.Symbol.iterator] = function() {
        return this
    }
    ;
    return f
}
function mm(f, e) {
    Vf();
    f instanceof String && (f += "");
    var Ia = 0
      , $a = {
        next: function() {
            if (Ia < f.length) {
                var Va = Ia++;
                return {
                    value: e(Va, f[Va]),
                    done: !1
                }
            }
            $a.next = function() {
                return {
                    done: !0,
                    value: void 0
                }
            }
            ;
            return $a.next()
        }
    };
    $a[Symbol.iterator] = function() {
        return $a
    }
    ;
    return $a
}
xd("Array.prototype.values", function(f) {
    return f ? f : function() {
        return mm(this, function(e, f) {
            return f
        })
    }
});
xd("Math.sign", function(f) {
    return f ? f : function(e) {
        e = Number(e);
        return 0 === e || isNaN(e) ? e : 0 < e ? 1 : -1
    }
});
xd("Array.prototype.keys", function(f) {
    return f ? f : function() {
        return mm(this, function(e) {
            return e
        })
    }
});
function Jm(f, e) {
    return Object.prototype.hasOwnProperty.call(f, e)
}
xd("WeakMap", function(f) {
    function e(e) {
        this.Ynf = (y += Math.random() + 1).toString();
        if (e) {
            e = vb(e);
            for (var f; !(f = e.next()).done; )
                f = f.value,
                this.set(f[0], f[1])
        }
    }
    function Ia() {}
    function $a(e) {
        Jm(e, ib) || wd(e, ib, {
            value: new Ia
        })
    }
    function Va(e) {
        var f = Object[e];
        f && (Object[e] = function(e) {
            if (e instanceof Ia)
                return e;
            $a(e);
            return f(e)
        }
        )
    }
    if (function() {
        if (!f || !Object.seal)
            return !1;
        try {
            var e = Object.seal({})
              , y = Object.seal({})
              , Ia = new f([[e, 2], [y, 3]]);
            if (2 != Ia.get(e) || 3 != Ia.get(y))
                return !1;
            Ia.delete(e);
            Ia.set(y, 4);
            return !Ia.has(e) && 4 == Ia.get(y)
        } catch (Ta) {
            return !1
        }
    }())
        return f;
    var ib = "$jscomp_hidden_" + Math.random();
    Va("freeze");
    Va("preventExtensions");
    Va("seal");
    var y = 0;
    e.prototype.set = function(e, f) {
        $a(e);
        if (!Jm(e, ib))
            throw Error("WeakMap key fail: " + e);
        e[ib][this.Ynf] = f;
        return this
    }
    ;
    e.prototype.get = function(e) {
        return Jm(e, ib) ? e[ib][this.Ynf] : void 0
    }
    ;
    e.prototype.has = function(e) {
        return Jm(e, ib) && Jm(e[ib], this.Ynf)
    }
    ;
    e.prototype.delete = function(e) {
        return Jm(e, ib) && Jm(e[ib], this.Ynf) ? delete e[ib][this.Ynf] : !1
    }
    ;
    return e
});
xd("Map", function(f) {
    function e() {
        var e = {};
        return e.previous = e.next = e.head = e
    }
    function Ia(e, f) {
        var y = e.iYc;
        return Yh(function() {
            if (y) {
                for (; y.head != e.iYc; )
                    y = y.previous;
                for (; y.next != y.head; )
                    return y = y.next,
                    {
                        done: !1,
                        value: f(y)
                    };
                y = null
            }
            return {
                done: !0,
                value: void 0
            }
        })
    }
    function $a(e, f) {
        var Ia = f && typeof f;
        "object" == Ia || "function" == Ia ? ib.has(f) ? Ia = ib.get(f) : (Ia = "" + ++y,
        ib.set(f, Ia)) : Ia = "p_" + f;
        var Ta = e.aff[Ia];
        if (Ta && Jm(e.aff, Ia))
            for (e = 0; e < Ta.length; e++) {
                var Va = Ta[e];
                if (f !== f && Va.key !== Va.key || f === Va.key)
                    return {
                        id: Ia,
                        list: Ta,
                        index: e,
                        YIb: Va
                    }
            }
        return {
            id: Ia,
            list: Ta,
            index: -1,
            YIb: void 0
        }
    }
    function Va(f) {
        this.aff = {};
        this.iYc = e();
        this.size = 0;
        if (f) {
            f = vb(f);
            for (var y; !(y = f.next()).done; )
                y = y.value,
                this.set(y[0], y[1])
        }
    }
    if (function() {
        if (!f || "function" != typeof f || !f.prototype.entries || "function" != typeof Object.seal)
            return !1;
        try {
            var e = Object.seal({
                x: 4
            })
              , y = new f(vb([[e, "s"]]));
            if ("s" != y.get(e) || 1 != y.size || y.get({
                x: 4
            }) || y.set({
                x: 4
            }, "t") != y || 2 != y.size)
                return !1;
            var Ia = y.entries()
              , Ta = Ia.next();
            if (Ta.done || Ta.value[0] != e || "s" != Ta.value[1])
                return !1;
            Ta = Ia.next();
            return Ta.done || 4 != Ta.value[0].x || "t" != Ta.value[1] || !Ia.next().done ? !1 : !0
        } catch (ob) {
            return !1
        }
    }())
        return f;
    Vf();
    var ib = new WeakMap;
    Va.prototype.set = function(e, f) {
        e = 0 === e ? 0 : e;
        var y = $a(this, e);
        y.list || (y.list = this.aff[y.id] = []);
        y.YIb ? y.YIb.value = f : (y.YIb = {
            next: this.iYc,
            previous: this.iYc.previous,
            head: this.iYc,
            key: e,
            value: f
        },
        y.list.push(y.YIb),
        this.iYc.previous.next = y.YIb,
        this.iYc.previous = y.YIb,
        this.size++);
        return this
    }
    ;
    Va.prototype.delete = function(e) {
        e = $a(this, e);
        return e.YIb && e.list ? (e.list.splice(e.index, 1),
        e.list.length || delete this.aff[e.id],
        e.YIb.previous.next = e.YIb.next,
        e.YIb.next.previous = e.YIb.previous,
        e.YIb.head = null,
        this.size--,
        !0) : !1
    }
    ;
    Va.prototype.clear = function() {
        this.aff = {};
        this.iYc = this.iYc.previous = e();
        this.size = 0
    }
    ;
    Va.prototype.has = function(e) {
        return !!$a(this, e).YIb
    }
    ;
    Va.prototype.get = function(e) {
        return (e = $a(this, e).YIb) && e.value
    }
    ;
    Va.prototype.entries = function() {
        return Ia(this, function(e) {
            return [e.key, e.value]
        })
    }
    ;
    Va.prototype.keys = function() {
        return Ia(this, function(e) {
            return e.key
        })
    }
    ;
    Va.prototype.values = function() {
        return Ia(this, function(e) {
            return e.value
        })
    }
    ;
    Va.prototype.forEach = function(e, f) {
        for (var y = this.entries(), Ta; !(Ta = y.next()).done; )
            Ta = Ta.value,
            e.call(f, Ta[1], Ta[0], this)
    }
    ;
    Va.prototype[Symbol.iterator] = Va.prototype.entries;
    var y = 0;
    return Va
});
function Iv(f, e, Ia) {
    f instanceof String && (f = String(f));
    for (var $a = f.length, Va = 0; Va < $a; Va++) {
        var ib = f[Va];
        if (e.call(Ia, ib, Va, f))
            return {
                Zp: Va,
                iw: ib
            }
    }
    return {
        Zp: -1,
        iw: void 0
    }
}
xd("Array.prototype.find", function(f) {
    return f ? f : function(e, f) {
        return Iv(this, e, f).iw
    }
});
xd("String.prototype.startsWith", function(f) {
    return f ? f : function(e, f) {
        var Ia = yd(this, e, "startsWith");
        e += "";
        var Va = Ia.length
          , ib = e.length;
        f = Math.max(0, Math.min(f | 0, Ia.length));
        for (var y = 0; y < ib && f < Va; )
            if (Ia[f++] != e[y++])
                return !1;
        return y >= ib
    }
});
xd("Object.is", function(f) {
    return f ? f : function(e, f) {
        return e === f ? 0 !== e || 1 / e === 1 / f : e !== e && f !== f
    }
});
xd("Array.prototype.includes", function(f) {
    return f ? f : function(e, f) {
        var Ia = this;
        Ia instanceof String && (Ia = String(Ia));
        var Va = Ia.length;
        f = f || 0;
        for (0 > f && (f = Math.max(f + Va, 0)); f < Va; f++) {
            var ib = Ia[f];
            if (ib === e || Object.is(ib, e))
                return !0
        }
        return !1
    }
});
xd("String.prototype.includes", function(f) {
    return f ? f : function(e, f) {
        return -1 !== yd(this, e, "includes").indexOf(e, f || 0)
    }
});
xd("Math.tanh", function(f) {
    return f ? f : function(e) {
        e = Number(e);
        if (0 === e)
            return e;
        var f = Math.exp(-2 * Math.abs(e));
        f = (1 - f) / (1 + f);
        return 0 > e ? -f : f
    }
});
xd("Math.log1p", function(f) {
    return f ? f : function(e) {
        e = Number(e);
        if (.25 > e && -.25 < e) {
            for (var f = e, $a = 1, Va = e, ib = 0, y = 1; ib != Va; )
                f *= e,
                y *= -1,
                Va = (ib = Va) + y * f / ++$a;
            return Va
        }
        return Math.log(1 + e)
    }
});
xd("Math.expm1", function(f) {
    return f ? f : function(e) {
        e = Number(e);
        if (.25 > e && -.25 < e) {
            for (var f = e, $a = 1, Va = e, ib = 0; ib != Va; )
                f *= e / ++$a,
                Va = (ib = Va) + f;
            return Va
        }
        return Math.exp(e) - 1
    }
});
xd("Math.trunc", function(f) {
    return f ? f : function(e) {
        e = Number(e);
        if (isNaN(e) || Infinity === e || -Infinity === e || 0 === e)
            return e;
        var f = Math.floor(Math.abs(e));
        return 0 > e ? -f : f
    }
});
xd("Math.log10", function(f) {
    return f ? f : function(e) {
        return Math.log(e) / Math.LN10
    }
});
xd("Math.cosh", function(f) {
    if (f)
        return f;
    var e = Math.exp;
    return function(f) {
        f = Number(f);
        return (e(f) + e(-f)) / 2
    }
});
xd("Math.sinh", function(f) {
    if (f)
        return f;
    var e = Math.exp;
    return function(f) {
        f = Number(f);
        return 0 === f ? f : (e(f) - e(-f)) / 2
    }
});
xd("Math.acosh", function(f) {
    return f ? f : function(e) {
        e = Number(e);
        return Math.log(e + Math.sqrt(e * e - 1))
    }
});
xd("Math.atanh", function(f) {
    if (f)
        return f;
    var e = Math.log1p;
    return function(f) {
        f = Number(f);
        return (e(f) - e(-f)) / 2
    }
});
xd("Math.asinh", function(f) {
    return f ? f : function(e) {
        e = Number(e);
        if (0 === e)
            return e;
        var f = Math.log(Math.abs(e) + Math.sqrt(e * e + 1));
        return 0 > e ? -f : f
    }
});
xd("Array.prototype.findIndex", function(f) {
    return f ? f : function(e, f) {
        return Iv(this, e, f).Zp
    }
});

(function(f) {
    var e = {
        userAgent: "",
        aI: !1,
        OFa: !1,
        f2a: !1,
        qob: !1,
        qSa: !1,
        Elb: !1,
        yCd: !1,
        EBa: !1,
        V1b: !1,
        NCd: !1,
        IYc: !1,
        rSa: !1,
        pCd: !1,
        d2a: !1,
        Qx: !1,
        ORc: !1,
        Xm: 1,
        rVd: !1,
        pGb: !1,
        IHc: !1,
        LCd: !1,
        Rud: 70,
        AHc: 13
    };
    e.userAgent = navigator.userAgent.toLowerCase();
    e.aI = -1 < e.userAgent.indexOf("msie") || -1 < e.userAgent.indexOf("trident") || -1 < e.userAgent.indexOf("edge");
    e.BCd = -1 < e.userAgent.indexOf("edge/");
    e.SAg = -1 < e.userAgent.indexOf("msie9") || -1 < e.userAgent.indexOf("msie 9");
    e.RAg = -1 < e.userAgent.indexOf("msie10") || -1 < e.userAgent.indexOf("msie 10");
    e.OFa = -1 < e.userAgent.indexOf("mac");
    e.EBa = !e.aI && -1 < e.userAgent.indexOf("chrome");
    if (e.EBa) {
        var Ia = e.userAgent.match(/chrom(e|ium)\/([0-9]+)\./);
        Ia && Ia[2] && (e.Rud = parseInt(Ia[2], 10))
    }
    e.rSa = !e.aI && !e.EBa && -1 < e.userAgent.indexOf("safari");
    e.f2a = e.rSa && e.OFa;
    e.qob = -1 < e.userAgent.indexOf("ipad") || -1 < e.userAgent.indexOf("iphone") || -1 < e.userAgent.indexOf("ipod");
    if (e.qob) {
        Ia = e.AHc;
        try {
            if (/iP(hone|od|ad)/.test(navigator.platform)) {
                var $a = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                Ia = parseInt($a[1], 10)
            }
        } catch (Va) {}
        e.AHc = Ia
    }
    e.qSa = -1 < e.userAgent.indexOf("android");
    e.Elb = /android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent || navigator.vendor || f.opera);
    e.yCd = -1 < e.userAgent.indexOf("gecko/");
    e.V1b = !!f.opera || -1 < e.userAgent.indexOf("opr/");
    e.NCd = !!f.opera;
    e.IYc = !e.aI && -1 < e.userAgent.indexOf("webkit");
    e.pCd = -1 < e.userAgent.indexOf("arm");
    e.d2a = !e.aI && -1 < e.userAgent.indexOf("firefox");
    e.ORc = -1 < e.userAgent.indexOf(" linux ");
    e.rVd = e.ORc && -1 < e.userAgent.indexOf("vivaldi");
    e.pGb = -1 < e.userAgent.indexOf("sailfish");
    e.IHc = -1 < e.userAgent.indexOf("emulatedevicepixelratio");
    e.LCd = -1 < e.userAgent.indexOf("needemulateupload");
    e.zoom = 1;
    e.Pud = function() {
        if (e.pGb && e.IHc) {
            var Ia = 1;
            540 >= screen.width ? Ia = 1.5 : 540 < screen.width && 768 >= screen.width ? Ia = 2 : 768 < screen.width && (Ia = 3);
            e.Qx = 1.9 <= Ia;
            e.Xm = Ia;
            f.devicePixelRatio = Ia
        } else
            e.qSa ? (e.Qx = 1.9 <= f.devicePixelRatio,
            e.Xm = f.devicePixelRatio) : (e.zoom = 1,
            e.Qx = !1,
            e.Xm = 1,
            e.EBa && !e.NCd && !e.Elb && document && document.firstElementChild && document.body ? (.1 < f.devicePixelRatio && (1.99 > f.devicePixelRatio ? e.zoom = f.devicePixelRatio / 1 : (e.zoom = f.devicePixelRatio / 2,
            e.Qx = !0)),
            Ia = document.firstElementChild.style,
            e.d2a ? .1 < f.devicePixelRatio ? (Ia.transformOrigin = "0 0",
            Ia.transform = "scale(" + 1 / e.zoom + ")",
            Ia.width = 100 * e.zoom + "%",
            Ia.height = 100 * e.zoom + "%") : (Ia.transformOrigin = "0 0",
            Ia.transform = "scale(1)",
            Ia.width = "100%",
            Ia.height = "100%") : Ia.zoom = .1 < f.devicePixelRatio ? 1 / e.zoom : "normal",
            e.Qx && (e.Xm = 2)) : (e.Qx = .01 > Math.abs(2 - f.devicePixelRatio / e.zoom),
            e.Qx && (e.Xm = 2),
            e.Elb && (e.Qx = 1.9 <= f.devicePixelRatio,
            e.Xm = f.devicePixelRatio)))
    }
    ;
    e.Pud();
    e.pu = function(f, Ia) {
        return !0 === Ia ? f * e.Xm + .5 >> 0 : f / e.Xm + .5 >> 0
    }
    ;
    f.AscCommon = f.AscCommon || {};
    f.AscCommon.Se = e
}
)(window);
"use strict";
var Yw = window
  , Zw = String.fromCharCode(5)
  , $w = {
    bld: 0,
    WHb: 513,
    I$b: 2305,
    KOc: 2051,
    VTc: 65,
    J4c: 66,
    zcd: 67,
    med: 68,
    t5a: 69,
    ebd: 71,
    Y5c: 72,
    u6c: 73,
    ibd: 74,
    K4c: 75,
    N4c: 76,
    M4c: 77,
    x6c: 78,
    Gcd: 79,
    L4c: 4097,
    xNd: 8193,
    JSON: 2056,
    OVc: 257,
    znd: 258,
    ycd: 259,
    cVa: 260,
    And: 261,
    Dnd: 262,
    Cnd: 263,
    w6c: 264,
    Fcd: 265,
    Bnd: 4098,
    UUc: 129,
    kdd: 130,
    xcd: 131,
    jdd: 132,
    ldd: 133,
    idd: 134,
    hdd: 135,
    gdd: 136,
    v6c: 137,
    Ecd: 138
}
  , ax = {
    Lk: {
        IU: -1,
        Vo: 0
    },
    pg: {
        kEe: 3,
        whe: 2,
        Yie: 1,
        HZ: 0,
        QN: -1,
        e4c: -2,
        O5c: -4,
        sLe: -5,
        Database: -6,
        Kje: -7,
        C6c: -8,
        uld: -9,
        tld: -10,
        gSb: -11,
        ste: -12,
        cZa: -13,
        mZd: -14,
        zbd: -16,
        ORb: -17,
        gqb: -18,
        Rec: -19,
        ncb: -20,
        Hic: -21,
        Hld: -22,
        Ucc: -23,
        Zic: -24,
        a6c: -25,
        Djd: -30,
        Cjd: -31,
        Ejd: -32,
        cPd: -35,
        XOb: -40,
        D_d: -41,
        iZd: -45,
        BEb: -50,
        TUa: -51,
        Obe: -52,
        dYd: -53,
        HUc: -54,
        A_d: -55,
        aUc: -56,
        xZd: -57,
        O_d: -64,
        ydd: -65,
        RNd: -66,
        i$b: -72,
        q2c: -71,
        mjc: -80,
        p2c: -81,
        PIa: -82,
        $Lb: -83,
        d4c: -84,
        Ild: -100,
        k7b: -101,
        ooc: -102,
        S_d: -110,
        Llc: -120,
        Mlc: -121,
        vhd: -122,
        EZd: -299,
        o7c: -300,
        Cgc: -301,
        GZd: -302,
        FZd: -303,
        eUc: -304,
        q6b: -305,
        mke: -306,
        fOd: -307,
        dUc: -308,
        HZd: -309,
        yOd: -310,
        WOc: -311,
        f7a: -312,
        $Ka: -331,
        aLa: -332,
        M_d: 500,
        V4c: -600,
        Q6a: -450,
        $Oc: -451,
        qse: -452,
        G_d: -601,
        HYd: -700,
        sld: -751,
        qld: -752,
        rld: -753,
        fZd: -800,
        gZd: -801
    }
}
  , KA = {
    NRa: 0,
    lH: 1,
    d7a: 2,
    Uva: 3,
    FH: 4,
    MK: 5,
    Pfc: 6,
    Kab: 7,
    rda: 8,
    ZNc: 9,
    jFb: 11,
    Xad: 12,
    XOb: 13,
    oZd: 14,
    NPd: 15,
    $Ka: 16,
    aLa: 17,
    AHf: 18
}
  , LA = {
    cVa: 0,
    t5a: 1,
    qMb: 2
}
  , MA = {
    kf: 0,
    SUc: 1,
    Qcd: 2,
    Jte: 3,
    Aub: 255
}
  , NA = {
    BEd: 1,
    jzd: 2,
    kYc: 3
}
  , $B = {
    tP: 0,
    Gs: 1
}
  , fC = {
    kf: -1,
    Lmb: 0,
    Number: 1,
    W6b: 2,
    ZGb: 3,
    pkb: 4,
    Date: 5,
    pda: 6,
    fh: 7,
    Aja: 8,
    Text: 9,
    Rsa: 10
}
  , gC = {
    hYd: 0,
    n0d: 1,
    gYd: 2,
    fEe: 3
}
  , lC = {
    Ua: 0,
    Table: 1,
    Image: 2,
    Ik: 3,
    Ri: 4,
    WPd: 5,
    uI: 6,
    Slide: 7,
    Vn: 8,
    Math: 9,
    cjc: 10,
    MUf: 11
}
  , mC = {
    kf: 0,
    Wfc: 1,
    sx: 2
}
  , KC = {
    hs: 0,
    Iz: 1,
    lya: 2
}
  , OC = {
    hs: 0,
    lya: 1
}
  , PC = {
    hs: 0,
    B8a: 1,
    vertical: 2,
    Vxa: 3
}
  , QC = {
    hs: 0,
    left: 1,
    top: 2,
    right: 3,
    bottom: 4,
    k2a: 5,
    z3a: 6,
    af: 7,
    Vjb: 8
}
  , RC = {
    hs: 0,
    Xa: 1,
    h_a: 2,
    WX: 3,
    Xxa: 4,
    GFa: 5,
    ie: 6,
    rya: 7,
    r: 8,
    t: 9
}
  , SC = {
    hs: 0,
    Ohb: 1,
    nJc: 2,
    OIc: 3
}
  , XC = {
    U7: 0,
    Cia: 1,
    Dia: 2,
    eea: 3,
    fea: 4,
    doa: 5,
    V7: 6,
    h8: 7,
    rea: 8,
    uoa: 9,
    $Pa: 10,
    aQa: 11,
    shb: 12,
    g8: 13,
    Daa: 14,
    wea: 15,
    lZ: 16,
    C0: 17,
    c8: 18,
    mZ: 19,
    D0: 20,
    d8: 21,
    Zda: 22,
    $da: 23,
    boa: 24,
    zaa: 25,
    I6: 26,
    H0: 27,
    eDb: 28,
    v4b: 29,
    w4b: 30,
    x4b: 31,
    fDb: 32,
    hjb: 33,
    w5b: 34,
    x5b: 35,
    xVb: 36,
    yVb: 37,
    FMd: 38
}
  , YC = {
    eu: 0,
    fixed: 1
}
  , hD = {
    hs: 0,
    UKb: 1,
    TNb: 2,
    SNb: 3,
    UNb: 4,
    VOb: 5,
    QRb: 6,
    RRb: 7,
    TRb: 8,
    U1c: 9,
    SRb: 10
}
  , mD = {
    q1: 0,
    KDa: 1,
    vs: 2,
    xB: 3
}
  , nD = {
    o1: 0,
    p1: 1,
    Ix: 2,
    wO: 3
}
  , oD = {
    eu: 0,
    maxValue: 1,
    value: 2,
    minValue: 3
}
  , pD = {
    eu: 0,
    PIc: 1
}
  , qD = {
    Dwb: 0,
    gOa: 1
}
  , rD = {
    eu: 0,
    date: 1,
    text: 2,
    Mg: 3,
    val: 4
}
  , sD = {
    sx: 0,
    Qc: 1,
    Text: 2
}
  , tD = {
    Ok: 0,
    mE: 1,
    Ba: 2,
    rD: 3,
    Ra: 4
}
  , uD = {
    Ta: 0,
    Ok: 1,
    Yq: 2,
    mE: 3,
    rD: 4,
    Oa: 5
}
  , vD = {
    sx: 0,
    Qc: 1,
    Text: 2
}
  , wD = {
    bw: 0,
    Sq: 1,
    opa: 2,
    a5: 3,
    sx: 4,
    Hpa: 5,
    Qc: 6,
    i5: 7
}
  , xD = {
    a9a: 0,
    opa: 1,
    qc: 2,
    sx: 3,
    Hpa: 4,
    Qc: 5,
    Ua: 6,
    ecb: 7
}
  , yD = {
    kf: 0,
    su: 1,
    BWa: 2,
    P4a: 3,
    SVa: 4,
    S4a: 5,
    R4a: 6,
    XMa: 7,
    b5a: 8,
    r5a: 9,
    nXa: 10,
    c5a: 11,
    XLa: 12,
    WMa: 13
}
  , zD = {
    Rta: 0,
    f5a: 1
}
  , AD = {
    xna: 0,
    $1b: 1,
    O8d: 2
}
  , BD = {
    D1c: 0,
    v8: 1,
    Hea: 2,
    VQ: 3,
    ava: 4
}
  , CD = {
    XKa: 0,
    hv: 1,
    UC: 2,
    nC: 3,
    JK: 4,
    EJ: 5,
    nia: 6
}
  , ED = {
    lTa: 1,
    XMb: 2
}
  , FD = {
    rQb: 1,
    Mnc: 2
}
  , GD = {
    ulc: 0,
    sQb: 1
}
  , HD = {
    Ta: 0,
    Ok: 1,
    f$a: 2,
    jab: 3,
    Oa: 4
}
  , ID = {
    c3b: 1,
    ci: 3,
    rDf: 4
}
  , KD = {
    hbb: 1,
    Apb: 2,
    bPb: 3
}
  , LD = {
    Sje: 0,
    hbb: 1,
    F0d: 2
}
  , MD = {
    kf: 0,
    u4: 1,
    Hfc: 2,
    Rjc: 3,
    Cnc: 4,
    doc: 5
}
  , ND = {
    DBf: 0,
    CBf: 1,
    BBf: 2,
    Eqf: 3,
    Dqf: 4,
    Cqf: 5,
    gpf: 6,
    fpf: 7,
    epf: 8
}
  , OD = {
    kab: 0,
    UMa: 1,
    X8a: 2
}
  , PD = {
    J6b: 0,
    Thc: 1,
    bkc: 2
}
  , QD = {
    Oab: 1,
    fka: 2,
    gna: 3,
    Sta: 4,
    sed: 5,
    ped: 6,
    ted: 7,
    gkc: 8,
    fkc: 9,
    pve: 10
}
  , RD = {
    Rmb: 1,
    b7a: 2,
    zLa: 3,
    OWa: 4,
    g_d: 5,
    h_d: 6,
    e_d: 7,
    f_d: 8
}
  , SD = {
    Fmb: 1,
    Kqb: 2,
    zRa: 3,
    mCa: 4,
    kZd: 5
}
  , TD = {
    L$b: 210,
    K$b: 297,
    tPd: zD.Rta,
    sPd: 17.8,
    uPd: 17.8,
    vPd: 19.1,
    pPd: 19.1,
    pue: 7.62,
    oue: 7.62,
    XFf: .17,
    YFf: .17,
    ZFf: .17,
    WFf: .17,
    qPd: 0,
    rPd: 0
}
  , XD = {
    UNc: 0,
    g6c: 1,
    Selection: 2
}
  , YD = {
    Zef: 0,
    $ef: 1,
    yff: 2,
    npf: 3,
    opf: 4,
    ppf: 5,
    fLd: 6,
    BCf: 7,
    CCf: 8,
    DCf: 9,
    ECf: 10
}
  , ZD = {
    Ona: 0,
    Aja: 1,
    mwa: 2,
    Nab: 3,
    gsb: 4,
    Naa: 5,
    Function: 6,
    HKb: 7,
    Z8a: 8,
    TF: 9,
    Gpb: 10,
    NOb: 11,
    QNb: 12,
    PU: 13,
    LMb: 14,
    Bue: 15
}
  , $D = {
    Oa: 0,
    Ta: 1
}
  , aE = {
    kf: 0,
    yka: 1,
    Lha: 2,
    BT: 3,
    ckc: 4
}
  , bE = {
    TF: 1,
    nnc: 2,
    Sic: 3,
    Bab: 4
}
  , cE = {
    kf: -1,
    Oa: 0,
    Ta: 1
}
  , dE = {
    Oa: 0,
    Ok: 1,
    Ta: 2
}
  , eE = {
    Ba: 0,
    Ok: 1,
    Ra: 2
}
  , fE = {
    Oa: 0,
    Ok: 1,
    Ta: 2
}
  , gE = {
    Qfa: 0,
    BT: 1
}
  , hE = {
    kf: -1,
    Oa: 0,
    Ta: 1
}
  , iE = {
    TF: 0,
    Ok: 1,
    yg: 2,
    sB: 3,
    Hh: 5,
    Ra: 7,
    Ba: 8
}
  , jE = {
    m$b: 0,
    Lhc: 1,
    B9c: 2,
    Hbd: 3,
    kf: 4,
    foc: 5
}
  , kE = [];
kE[33] = 19;
kE[34] = 1;
kE[35] = 1;
kE[36] = 33;
kE[37] = 19;
kE[38] = 1;
kE[39] = 1;
kE[40] = 37;
kE[41] = 19;
kE[42] = 1;
kE[43] = 1;
kE[44] = 19;
kE[45] = 1;
kE[46] = 19;
kE[47] = 1;
kE[58] = 19;
kE[59] = 19;
kE[60] = 1;
kE[61] = 1;
kE[62] = 17;
kE[63] = 19;
kE[64] = 1;
kE[91] = 37;
kE[92] = 1;
kE[93] = 19;
kE[94] = 1;
kE[95] = 1;
kE[96] = 1;
kE[123] = 37;
kE[124] = 1;
kE[125] = 17;
kE[126] = 1;
kE[161] = 1;
kE[162] = 17;
kE[163] = 33;
kE[164] = 1;
kE[165] = 33;
kE[166] = 1;
kE[167] = 1;
kE[168] = 17;
kE[169] = 1;
kE[170] = 1;
kE[171] = 1;
kE[172] = 1;
kE[173] = 1;
kE[174] = 1;
kE[175] = 1;
kE[176] = 17;
kE[177] = 1;
kE[180] = 1;
kE[182] = 1;
kE[183] = 17;
kE[184] = 1;
kE[186] = 1;
kE[187] = 1;
kE[187] = 1;
kE[191] = 1;
kE[8208] = 1;
kE[8209] = 1;
kE[8210] = 1;
kE[8211] = 1;
kE[8212] = 1;
kE[8213] = 17;
kE[8214] = 17;
kE[8215] = 1;
kE[8216] = 33;
kE[8217] = 17;
kE[8218] = 1;
kE[8219] = 1;
kE[8220] = 33;
kE[8221] = 17;
kE[8222] = 1;
kE[8223] = 1;
kE[8224] = 1;
kE[8225] = 1;
kE[8226] = 1;
kE[8227] = 1;
kE[8228] = 1;
kE[8229] = 1;
kE[8230] = 17;
kE[8231] = 1;
kE[8240] = 17;
kE[8241] = 1;
kE[8242] = 17;
kE[8243] = 17;
kE[8244] = 1;
kE[8245] = 1;
kE[8246] = 1;
kE[8247] = 1;
kE[8248] = 1;
kE[8249] = 1;
kE[8250] = 17;
kE[8251] = 1;
kE[8252] = 1;
kE[8253] = 1;
kE[8254] = 1;
kE[8255] = 1;
kE[8256] = 1;
kE[8257] = 1;
kE[8258] = 1;
kE[8259] = 1;
kE[8260] = 1;
kE[8261] = 1;
kE[8262] = 1;
kE[8263] = 1;
kE[8264] = 1;
kE[8265] = 1;
kE[8266] = 1;
kE[8267] = 1;
kE[8268] = 1;
kE[8269] = 1;
kE[8270] = 1;
kE[8271] = 1;
kE[8272] = 1;
kE[8273] = 1;
kE[8274] = 1;
kE[8275] = 1;
kE[8276] = 1;
kE[8277] = 1;
kE[8278] = 1;
kE[8279] = 1;
kE[8280] = 1;
kE[8281] = 1;
kE[8282] = 1;
kE[8283] = 1;
kE[8284] = 1;
kE[8285] = 1;
kE[8286] = 1;
kE[12289] = 17;
kE[12290] = 17;
kE[12291] = 17;
kE[12292] = 1;
kE[12293] = 1;
kE[12294] = 1;
kE[12295] = 1;
kE[12296] = 33;
kE[12297] = 17;
kE[12298] = 33;
kE[12299] = 17;
kE[12300] = 33;
kE[12301] = 17;
kE[12302] = 33;
kE[12303] = 17;
kE[12304] = 33;
kE[12305] = 17;
kE[12306] = 1;
kE[12307] = 1;
kE[12308] = 33;
kE[12309] = 17;
kE[12310] = 33;
kE[12311] = 17;
kE[12312] = 1;
kE[12313] = 1;
kE[12314] = 1;
kE[12315] = 1;
kE[12316] = 1;
kE[12317] = 33;
kE[12318] = 17;
kE[12319] = 1;
kE[65281] = 275;
kE[65282] = 273;
kE[65283] = 257;
kE[65284] = 289;
kE[65285] = 275;
kE[65286] = 257;
kE[65287] = 273;
kE[65288] = 293;
kE[65289] = 275;
kE[65290] = 257;
kE[65291] = 257;
kE[65292] = 275;
kE[65293] = 257;
kE[65294] = 275;
kE[65295] = 257;
kE[65306] = 275;
kE[65307] = 275;
kE[65308] = 257;
kE[65309] = 257;
kE[65310] = 257;
kE[65311] = 275;
kE[65312] = 257;
kE[65339] = 293;
kE[65340] = 257;
kE[65341] = 275;
kE[65342] = 257;
kE[65343] = 257;
kE[65344] = 273;
kE[65371] = 293;
kE[65372] = 273;
kE[65373] = 275;
kE[65374] = 273;
kE[65375] = 257;
kE[65376] = 257;
kE[65377] = 257;
kE[65378] = 257;
kE[65379] = 257;
kE[65380] = 257;
kE[65381] = 257;
kE[65504] = 273;
kE[65505] = 289;
kE[65506] = 257;
kE[65507] = 257;
kE[65508] = 257;
kE[65509] = 289;
kE[65510] = 257;
kE[65512] = 257;
kE[65513] = 257;
kE[65514] = 257;
kE[65515] = 257;
kE[65516] = 257;
kE[65517] = 257;
kE[65518] = 257;
for (var lE = {
    pZc: 0,
    oWd: 1,
    PSd: 2,
    F3d: 3,
    QSd: 4,
    OSd: 5,
    yqf: 6,
    pWd: 7,
    NXd: 8,
    MXd: 9,
    nWd: 10,
    F6a: 11,
    link: 12,
    e3a: 13,
    wpf: 14,
    aKa: 15,
    W_a: 16,
    gJc: 17,
    aDf: 18,
    wff: 19,
    tHc: 20,
    kGg: 21,
    BAg: 22,
    k4: 23,
    jib: 24,
    JMd: 25
}, mE = {
    kf: 0,
    vf: 4097,
    sB: 8194,
    FS: 8195,
    s0: 8196,
    ES: 8197,
    r0: 8198,
    gTa: 8199,
    Iqb: 8200,
    X0c: 4096,
    wcd: 8192
}, nE = {
    OX: 1,
    ic: 2,
    kf: 3
}, oE = {
    Text: 0,
    Hh: 1
}, pE = {
    DRa: 1,
    DA: 2
}, qE = {
    m0: 0,
    Slide: 1,
    Qc: 2,
    sx: 3
}, rE = {
    X8: 0,
    Qda: 1,
    mfa: 2
}, sE = {
    QN: 0,
    s5: 1,
    o9: 2,
    Jpa: 3,
    dka: 4,
    mb: 5,
    Ib: 6,
    Mf: 7,
    Qpa: 8,
    Rpa: 9,
    kH: 254,
    Bsb: 255
}, tE = {
    oXa: 0,
    rXa: 1,
    cWa: 2,
    O_: 3,
    Sq: 4
}, uE = {
    OIa: 0,
    eJa: 1,
    PAa: 2,
    Qza: 3
}, vE = {
    Ok: 0,
    mE: 1,
    Ba: 2,
    rD: 3,
    Ra: 4
}, zE = {
    Ta: 0,
    Ok: 1,
    mE: 2,
    rD: 3,
    Oa: 4
}, AE = {
    u$b: 0,
    nUc: 1,
    oUc: 2,
    pUc: 3,
    qUc: 4,
    rUc: 5,
    uUc: 6,
    wUc: 7,
    OHb: 8,
    DUc: 9,
    kf: 10,
    kVc: 11,
    HVc: 12,
    IVc: 13
}, BE = {
    kf: 0,
    Pm: 1,
    uN: 2,
    xC: 3,
    ARa: 4,
    aB: 5,
    Xta: 10
}, CE = ["ar", 1, "bg", 2, "ca", 3, "zh-Hans", 4, "cs", 5, "da", 6, "de", 7, "el", 8, "en", 9, "es", 10, "fi", 11, "fr", 12, "he", 13, "hu", 14, "is", 15, "it", 16, "ja", 17, "ko", 18, "nl", 19, "no", 20, "pl", 21, "pt", 22, "rm", 23, "ro", 24, "ru", 25, "hr", 26, "sk", 27, "sq", 28, "sv", 29, "th", 30, "tr", 31, "ur", 32, "id", 33, "uk", 34, "be", 35, "sl", 36, "et", 37, "lv", 38, "lt", 39, "tg", 40, "fa", 41, "vi", 42, "hy", 43, "az", 44, "eu", 45, "hsb", 46, "mk", 47, "tn", 50, "xh", 52, "zu", 53, "af", 54, "ka", 55, "fo", 56, "hi", 57, "mt", 58, "se", 59, "ga", 60, "ms", 62, "kk", 63, "ky", 64, "sw", 65, "tk", 66, "uz", 67, "tt", 68, "bn", 69, "pa", 70, "gu", 71, "or", 72, "ta", 73, "te", 74, "kn", 75, "ml", 76, "as", 77, "mr", 78, "sa", 79, "mn", 80, "bo", 81, "cy", 82, "km", 83, "lo", 84, "gl", 86, "kok", 87, "syr", 90, "si", 91, "iu", 93, "am", 94, "tzm", 95, "ne", 97, "fy", 98, "ps", 99, "fil", 100, "dv", 101, "ha", 104, "yo", 106, "quz", 107, "nso", 108, "ba", 109, "lb", 110, "kl", 111, "ig", 112, "ii", 120, "arn", 122, "moh", 124, "br", 126, "ug", 128, "mi", 129, "oc", 130, "co", 131, "gsw", 132, "sah", 133, "qut", 134, "rw", 135, "wo", 136, "prs", 140, "gd", 145, "ar-SA", 1025, "bg-BG", 1026, "ca-ES", 1027, "zh-TW", 1028, "cs-CZ", 1029, "da-DK", 1030, "de-DE", 1031, "el-GR", 1032, "en-US", 1033, "es-ES_tradnl", 1034, "fi-FI", 1035, "fr-FR", 1036, "he-IL", 1037, "hu-HU", 1038, "is-IS", 1039, "it-IT", 1040, "ja-JP", 1041, "ko-KR", 1042, "nl-NL", 1043, "nb-NO", 1044, "pl-PL", 1045, "pt-BR", 1046, "rm-CH", 1047, "ro-RO", 1048, "ru-RU", 1049, "hr-HR", 1050, "sk-SK", 1051, "sq-AL", 1052, "sv-SE", 1053, "th-TH", 1054, "tr-TR", 1055, "ur-PK", 1056, "id-ID", 1057, "uk-UA", 1058, "be-BY", 1059, "sl-SI", 1060, "et-EE", 1061, "lv-LV", 1062, "lt-LT", 1063, "tg-Cyrl-TJ", 1064, "fa-IR", 1065, "vi-VN", 1066, "hy-AM", 1067, "az-Latn-AZ", 1068, "eu-ES", 1069, "wen-DE", 1070, "mk-MK", 1071, "st-ZA", 1072, "ts-ZA", 1073, "tn-ZA", 1074, "ven-ZA", 1075, "xh-ZA", 1076, "zu-ZA", 1077, "af-ZA", 1078, "ka-GE", 1079, "fo-FO", 1080, "hi-IN", 1081, "mt-MT", 1082, "se-NO", 1083, "ms-MY", 1086, "kk-KZ", 1087, "ky-KG", 1088, "sw-KE", 1089, "tk-TM", 1090, "uz-Latn-UZ", 1091, "tt-RU", 1092, "bn-IN", 1093, "pa-IN", 1094, "gu-IN", 1095, "or-IN", 1096, "ta-IN", 1097, "te-IN", 1098, "kn-IN", 1099, "ml-IN", 1100, "as-IN", 1101, "mr-IN", 1102, "sa-IN", 1103, "mn-MN", 1104, "bo-CN", 1105, "cy-GB", 1106, "km-KH", 1107, "lo-LA", 1108, "my-MM", 1109, "gl-ES", 1110, "kok-IN", 1111, "mni", 1112, "sd-IN", 1113, "syr-SY", 1114, "si-LK", 1115, "chr-US", 1116, "iu-Cans-CA", 1117, "am-ET", 1118, "tmz", 1119, "ne-NP", 1121, "fy-NL", 1122, "ps-AF", 1123, "fil-PH", 1124, "dv-MV", 1125, "bin-NG", 1126, "fuv-NG", 1127, "ha-Latn-NG", 1128, "ibb-NG", 1129, "yo-NG", 1130, "quz-BO", 1131, "nso-ZA", 1132, "ba-RU", 1133, "lb-LU", 1134, "kl-GL", 1135, "ig-NG", 1136, "kr-NG", 1137, "gaz-ET", 1138, "ti-ER", 1139, "gn-PY", 1140, "haw-US", 1141, "so-SO", 1143, "ii-CN", 1144, "pap-AN", 1145, "arn-CL", 1146, "moh-CA", 1148, "br-FR", 1150, "ug-CN", 1152, "mi-NZ", 1153, "oc-FR", 1154, "co-FR", 1155, "gsw-FR", 1156, "sah-RU", 1157, "qut-GT", 1158, "rw-RW", 1159, "wo-SN", 1160, "prs-AF", 1164, "plt-MG", 1165, "gd-GB", 1169, "ar-IQ", 2049, "zh-CN", 2052, "de-CH", 2055, "en-GB", 2057, "es-MX", 2058, "fr-BE", 2060, "it-CH", 2064, "nl-BE", 2067, "nn-NO", 2068, "pt-PT", 2070, "ro-MO", 2072, "ru-MO", 2073, "sr-Latn-CS", 2074, "sv-FI", 2077, "ur-IN", 2080, "az-Cyrl-AZ", 2092, "dsb-DE", 2094, "se-SE", 2107, "ga-IE", 2108, "ms-BN", 2110, "uz-Cyrl-UZ", 2115, "bn-BD", 2117, "pa-PK", 2118, "mn-Mong-CN", 2128, "bo-BT", 2129, "sd-PK", 2137, "iu-Latn-CA", 2141, "tzm-Latn-DZ", 2143, "ne-IN", 2145, "quz-EC", 2155, "ti-ET", 2163, "ar-EG", 3073, "zh-HK", 3076, "de-AT", 3079, "en-AU", 3081, "es-ES", 3082, "fr-CA", 3084, "sr-Cyrl-CS", 3098, "se-FI", 3131, "tmz-MA", 3167, "quz-PE", 3179, "ar-LY", 4097, "zh-SG", 4100, "de-LU", 4103, "en-CA", 4105, "es-GT", 4106, "fr-CH", 4108, "hr-BA", 4122, "smj-NO", 4155, "ar-DZ", 5121, "zh-MO", 5124, "de-LI", 5127, "en-NZ", 5129, "es-CR", 5130, "fr-LU", 5132, "bs-Latn-BA", 5146, "smj-SE", 5179, "ar-MA", 6145, "en-IE", 6153, "es-PA", 6154, "fr-MC", 6156, "sr-Latn-BA", 6170, "sma-NO", 6203, "ar-TN", 7169, "en-ZA", 7177, "es-DO", 7178, "fr-West", 7180, "sr-Cyrl-BA", 7194, "sma-SE", 7227, "ar-OM", 8193, "en-JM", 8201, "es-VE", 8202, "fr-RE", 8204, "bs-Cyrl-BA", 8218, "sms-FI", 8251, "ar-YE", 9217, "en-CB", 9225, "es-CO", 9226, "fr-CG", 9228, "sr-Latn-RS", 9242, "smn-FI", 9275, "ar-SY", 10241, "en-BZ", 10249, "es-PE", 10250, "fr-SN", 10252, "sr-Cyrl-RS", 10266, "ar-JO", 11265, "en-TT", 11273, "es-AR", 11274, "fr-CM", 11276, "sr-Latn-ME", 11290, "ar-LB", 12289, "en-ZW", 12297, "es-EC", 12298, "fr-CI", 12300, "sr-Cyrl-ME", 12314, "ar-KW", 13313, "en-PH", 13321, "es-CL", 13322, "fr-ML", 13324, "ar-AE", 14337, "en-ID", 14345, "es-UY", 14346, "fr-MA", 14348, "ar-BH", 15361, "en-HK", 15369, "es-PY", 15370, "fr-HT", 15372, "ar-QA", 16385, "en-IN", 16393, "es-BO", 16394, "en-MY", 17417, "es-SV", 17418, "en-SG", 18441, "es-HN", 18442, "es-NI", 19466, "es-PR", 20490, "es-US", 21514, "bs-Cyrl", 25626, "bs-Latn", 26650, "sr-Cyrl", 27674, "sr-Latn", 28698, "smn", 28731, "az-Cyrl", 29740, "sms", 29755, "zh", 30724, "nn", 30740, "bs", 30746, "az-Latn", 30764, "sma", 30779, "uz-Cyrl", 30787, "mn-Cyrl", 30800, "iu-Cans", 30813, "zh-Hant", 31748, "nb", 31764, "sr", 31770, "tg-Cyrl", 31784, "dsb", 31790, "smj", 31803, "uz-Latn", 31811, "mn-Mong", 31824, "iu-Latn", 31837, "tzm-Latn", 31839, "ha-Latn", 31848], EE = {}, FE = {}, GE = 0, HE = CE.length; GE + 1 < HE; GE += 2) {
    var IE = CE[GE]
      , JE = CE[GE + 1];
    EE[IE] = JE;
    FE[JE] = IE
}
var KE;
Yw.Asc = Yw.Asc || {};
Yw.Asc.FONT_THUMBNAIL_HEIGHT = 672 / 25.4 >> 0;
Yw.Asc.c_oAscMaxColumnWidth = Yw.Asc.UUb = 255;
Yw.Asc.c_oAscMaxRowHeight = Yw.Asc.otc = 409.5;
Yw.Asc.c_nMaxConversionTime = Yw.Asc.Ctd = 9E5;
Yw.Asc.c_nMaxDownloadTitleLen = Yw.Asc.J$e = 255;
Yw.Asc.c_nVersionNoBase64 = Yw.Asc.NTa = 10;
Yw.Asc.c_dMaxParaRunContentLength = Yw.Asc.n_a = 256;
Yw.Asc.c_rUneditableTypes = Yw.Asc.$$e = /^(?:(pdf|djvu|xps))$/;
Yw.Asc.c_oAscFileType = Yw.Asc.Gnb = $w;
Yw.Asc.QOa = EE;
Yw.Asc.eyb = FE;
KE = $w;
KE.UNKNOWN = KE.bld;
KE.PDF = KE.WHb;
KE.PDFA = KE.I$b;
KE.HTML = KE.KOc;
KE.DOCX = KE.VTc;
KE.DOC = KE.J4c;
KE.ODT = KE.zcd;
KE.RTF = KE.med;
KE.TXT = KE.t5a;
KE.MHT = KE.ebd;
KE.EPUB = KE.Y5c;
KE.FB2 = KE.u6c;
KE.MOBI = KE.ibd;
KE.DOCM = KE.K4c;
KE.DOTX = KE.N4c;
KE.DOTM = KE.M4c;
KE.FODT = KE.x6c;
KE.OTT = KE.Gcd;
KE.DOCY = KE.L4c;
KE.JSON = KE.JSON;
KE.XLSX = KE.OVc;
KE.XLS = KE.znd;
KE.ODS = KE.ycd;
KE.CSV = KE.cVa;
KE.XLSM = KE.And;
KE.XLTX = KE.Dnd;
KE.XLTM = KE.Cnd;
KE.FODS = KE.w6c;
KE.OTS = KE.Fcd;
KE.XLSY = KE.Bnd;
KE.PPTX = KE.UUc;
KE.PPT = KE.kdd;
KE.ODP = KE.xcd;
KE.PPSX = KE.jdd;
KE.PPTM = KE.ldd;
KE.PPSM = KE.idd;
KE.POTX = KE.hdd;
KE.POTM = KE.gdd;
KE.FODP = KE.v6c;
KE.OTP = KE.Ecd;
KE = Yw.Asc.c_oAscError = Yw.Asc.Gk = ax;
KE.Level = KE.Lk;
KE.ID = KE.pg;
KE = ax.Lk;
KE.Critical = KE.IU;
KE.NoCritical = KE.Vo;
KE = ax.pg;
KE.ServerSaveComplete = KE.kEe;
KE.ConvertationProgress = KE.whe;
KE.DownloadProgress = KE.Yie;
KE.No = KE.HZ;
KE.Unknown = KE.QN;
KE.ConvertationTimeout = KE.e4c;
KE.DownloadError = KE.O5c;
KE.UnexpectedGuid = KE.sLe;
KE.Database = KE.Database;
KE.FileRequest = KE.Kje;
KE.FileVKey = KE.C6c;
KE.UplImageSize = KE.uld;
KE.UplImageExt = KE.tld;
KE.UplImageFileCount = KE.gSb;
KE.NoSupportClipdoard = KE.ste;
KE.UplImageUrl = KE.cZa;
KE.DirectUrl = KE.mZd;
KE.MaxDataPointsError = KE.zbd;
KE.StockChartError = KE.ORb;
KE.CoAuthoringDisconnect = KE.gqb;
KE.ConvertationPassword = KE.Rec;
KE.VKeyEncrypt = KE.ncb;
KE.KeyExpire = KE.Hic;
KE.UserCountExceed = KE.Hld;
KE.AccessDeny = KE.Ucc;
KE.LoadingScriptError = KE.Zic;
KE.EditingError = KE.a6c;
KE.SplitCellMaxRows = KE.Djd;
KE.SplitCellMaxCols = KE.Cjd;
KE.SplitCellRowsDivider = KE.Ejd;
KE.MobileUnexpectedCharCount = KE.cPd;
KE.MailMergeLoadFile = KE.XOb;
KE.MailMergeSaveFile = KE.D_d;
KE.DataValidate = KE.iZd;
KE.AutoFilterDataRangeError = KE.BEb;
KE.AutoFilterChangeFormatTableError = KE.TUa;
KE.AutoFilterChangeError = KE.Obe;
KE.AutoFilterMoveToHiddenRangeError = KE.dYd;
KE.LockedAllError = KE.HUc;
KE.LockedWorksheetRename = KE.A_d;
KE.FTChangeTableRangeError = KE.aUc;
KE.FTRangeIncludedOtherTables = KE.xZd;
KE.PasteMaxRangeError = KE.O_d;
KE.PastInMergeAreaError = KE.ydd;
KE.CopyMultiselectAreaError = KE.RNd;
KE.DataRangeError = KE.i$b;
KE.CannotMoveRange = KE.q2c;
KE.MaxDataSeriesError = KE.mjc;
KE.CannotFillRange = KE.p2c;
KE.ConvertationOpenError = KE.PIa;
KE.ConvertationSaveError = KE.$Lb;
KE.ConvertationOpenLimitError = KE.d4c;
KE.UserDrop = KE.Ild;
KE.Warning = KE.k7b;
KE.UpdateVersion = KE.ooc;
KE.PrintMaxPagesCount = KE.S_d;
KE.SessionAbsolute = KE.Llc;
KE.SessionIdle = KE.Mlc;
KE.SessionToken = KE.vhd;
KE.FrmlMaxTextLength = KE.EZd;
KE.FrmlWrongCountParentheses = KE.o7c;
KE.FrmlWrongOperator = KE.Cgc;
KE.FrmlWrongMaxArgument = KE.GZd;
KE.FrmlWrongCountArgument = KE.FZd;
KE.FrmlWrongFunctionName = KE.eUc;
KE.FrmlAnotherParsingError = KE.q6b;
KE.FrmlWrongArgumentRange = KE.mke;
KE.FrmlOperandExpected = KE.fOd;
KE.FrmlParenthesesCorrectCount = KE.dUc;
KE.FrmlWrongReferences = KE.HZd;
KE.InvalidReferenceOrName = KE.yOd;
KE.LockCreateDefName = KE.WOc;
KE.LockedCellPivot = KE.f7a;
KE.ForceSaveButton = KE.$Ka;
KE.ForceSaveTimeout = KE.aLa;
KE.CannotChangeFormulaArray = KE.Q6a;
KE.MultiCellsInTablesFormulaArray = KE.$Oc;
KE.MailToClientMissing = KE.qse;
KE.OpenWarning = KE.M_d;
KE.DataEncrypted = KE.V4c;
KE.NoDataToParse = KE.G_d;
KE.CannotUngroupError = KE.HYd;
KE.UplDocumentSize = KE.sld;
KE.UplDocumentExt = KE.qld;
KE.UplDocumentFileCount = KE.rld;
KE.CustomSortMoreOneSelectedError = KE.fZd;
KE.CustomSortNotOriginalSelectError = KE.gZd;
KE = Yw.Asc.c_oAscAsyncAction = Yw.Asc.OH = KA;
KE.Open = KE.NRa;
KE.Save = KE.lH;
KE.LoadDocumentFonts = KE.d7a;
KE.LoadDocumentImages = KE.Uva;
KE.LoadFont = KE.FH;
KE.LoadImage = KE.MK;
KE.DownloadAs = KE.Pfc;
KE.Print = KE.Kab;
KE.UploadImage = KE.rda;
KE.ApplyChanges = KE.ZNc;
KE.SlowOperation = KE.jFb;
KE.LoadTheme = KE.Xad;
KE.MailMergeLoadFile = KE.XOb;
KE.DownloadMerge = KE.oZd;
KE.SendMailMerge = KE.NPd;
KE.ForceSaveButton = KE.$Ka;
KE.ForceSaveTimeout = KE.aLa;
KE = Yw.Asc.c_oAscAdvancedOptionsID = Yw.Asc.MUb = LA;
KE.CSV = KE.cVa;
KE.TXT = KE.t5a;
KE.DRM = KE.qMb;
KE = Yw.Asc.c_oAscFontRenderingModeType = Yw.Asc.E2d = NA;
KE.noHinting = KE.BEd;
KE.hinting = KE.jzd;
KE.hintingAndSubpixeling = KE.kYc;
KE = Yw.Asc.c_oAscAsyncActionType = Yw.Asc.vE = $B;
KE.Information = KE.tP;
KE.BlockInteraction = KE.Gs;
KE = Yw.Asc.c_oAscNumFormatType = Yw.Asc.$V = fC;
KE.None = KE.kf;
KE.General = KE.Lmb;
KE.Number = KE.Number;
KE.Scientific = KE.W6b;
KE.Accounting = KE.ZGb;
KE.Currency = KE.pkb;
KE.Date = KE.Date;
KE.Time = KE.pda;
KE.Percent = KE.fh;
KE.Fraction = KE.Aja;
KE.Text = KE.Text;
KE.Custom = KE.Rsa;
KE = Yw.Asc.c_oAscDrawingLayerType = gC;
KE.BringToFront = KE.hYd;
KE.SendToBack = KE.n0d;
KE.BringForward = KE.gYd;
KE.SendBackward = KE.fEe;
KE = Yw.Asc.c_oAscTypeSelectElement = Yw.Asc.GFb = lC;
KE.Paragraph = KE.Ua;
KE.Table = KE.Table;
KE.Image = KE.Image;
KE.Header = KE.Ik;
KE.Hyperlink = KE.Ri;
KE.SpellCheck = KE.WPd;
KE.Shape = KE.uI;
KE.Slide = KE.Slide;
KE.Chart = KE.Vn;
KE.Math = KE.Math;
KE.MailMerge = KE.cjc;
Yw.Asc.linerule_AtLeast = Yw.Asc.vH = 0;
Yw.Asc.linerule_Auto = Yw.Asc.rC = 1;
Yw.Asc.linerule_Exact = Yw.Asc.fN = 2;
Yw.Asc.c_oAscShdClear = Yw.Asc.ona = 0;
Yw.Asc.c_oAscShdNil = Yw.Asc.FP = 1;
KE = Yw.Asc.c_oAscDropCap = Yw.Asc.QUb = mC;
KE.None = KE.kf;
KE.Drop = KE.Wfc;
KE.Margin = KE.sx;
KE = Yw.Asc.c_oAscChartTitleShowSettings = Yw.Asc.OUb = KC;
KE.none = KE.hs;
KE.overlay = KE.Iz;
KE.noOverlay = KE.lya;
KE = Yw.Asc.c_oAscChartHorAxisLabelShowSettings = Yw.Asc.Ftd = OC;
KE.none = KE.hs;
KE.noOverlay = KE.lya;
KE = Yw.Asc.c_oAscChartVertAxisLabelShowSettings = Yw.Asc.Gtd = PC;
KE.none = KE.hs;
KE.rotated = KE.B8a;
KE.vertical = KE.vertical;
KE.horizontal = KE.Vxa;
KE = Yw.Asc.c_oAscChartLegendShowSettings = Yw.Asc.F5 = QC;
KE.none = KE.hs;
KE.left = KE.left;
KE.top = KE.top;
KE.right = KE.right;
KE.bottom = KE.bottom;
KE.leftOverlay = KE.k2a;
KE.rightOverlay = KE.z3a;
KE.layout = KE.af;
KE.topRight = KE.Vjb;
KE = Yw.Asc.c_oAscChartDataLabelsPos = Yw.Asc.Gwb = RC;
KE.none = KE.hs;
KE.b = KE.Xa;
KE.bestFit = KE.h_a;
KE.ctr = KE.WX;
KE.inBase = KE.Xxa;
KE.inEnd = KE.GFa;
KE.l = KE.ie;
KE.outEnd = KE.rya;
KE.r = KE.r;
KE.t = KE.t;
KE = Yw.Asc.c_oAscGridLinesSettings = Yw.Asc.RUb = SC;
KE.none = KE.hs;
KE.major = KE.Ohb;
KE.minor = KE.nJc;
KE.majorMinor = KE.OIc;
KE = Yw.Asc.c_oAscChartTypeSettings = Yw.Asc.Mk = XC;
KE.barNormal = KE.U7;
KE.barStacked = KE.Cia;
KE.barStackedPer = KE.Dia;
KE.barNormal3d = KE.eea;
KE.barStacked3d = KE.fea;
KE.barStackedPer3d = KE.doa;
KE.barNormal3dPerspective = KE.V7;
KE.lineNormal = KE.h8;
KE.lineStacked = KE.rea;
KE.lineStackedPer = KE.uoa;
KE.lineNormalMarker = KE.$Pa;
KE.lineStackedMarker = KE.aQa;
KE.lineStackedPerMarker = KE.shb;
KE.line3d = KE.g8;
KE.pie = KE.Daa;
KE.pie3d = KE.wea;
KE.hBarNormal = KE.lZ;
KE.hBarStacked = KE.C0;
KE.hBarStackedPer = KE.c8;
KE.hBarNormal3d = KE.mZ;
KE.hBarStacked3d = KE.D0;
KE.hBarStackedPer3d = KE.d8;
KE.areaNormal = KE.Zda;
KE.areaStacked = KE.$da;
KE.areaStackedPer = KE.boa;
KE.doughnut = KE.zaa;
KE.stock = KE.I6;
KE.scatter = KE.H0;
KE.scatterLine = KE.eDb;
KE.scatterLineMarker = KE.v4b;
KE.scatterMarker = KE.w4b;
KE.scatterNone = KE.x4b;
KE.scatterSmooth = KE.fDb;
KE.scatterSmoothMarker = KE.hjb;
KE.unknown = KE.FMd;
KE = Yw.Asc.c_oAscValAxisRule = Yw.Asc.Kdb = YC;
KE.auto = KE.eu;
KE.fixed = KE.fixed;
KE = Yw.Asc.c_oAscValAxUnits = Yw.Asc.Jwb = hD;
KE.BILLIONS = KE.UKb;
KE.HUNDRED_MILLIONS = KE.TNb;
KE.HUNDREDS = KE.SNb;
KE.HUNDRED_THOUSANDS = KE.UNb;
KE.MILLIONS = KE.VOb;
KE.TEN_MILLIONS = KE.QRb;
KE.TEN_THOUSANDS = KE.RRb;
KE.TRILLIONS = KE.TRb;
KE.CUSTOM = KE.U1c;
KE.THOUSANDS = KE.SRb;
KE = Yw.Asc.c_oAscTickMark = Yw.Asc.Qba = mD;
KE.TICK_MARK_CROSS = KE.q1;
KE.TICK_MARK_IN = KE.KDa;
KE.TICK_MARK_NONE = KE.vs;
KE.TICK_MARK_OUT = KE.xB;
KE = Yw.Asc.c_oAscTickLabelsPos = Yw.Asc.yEa = nD;
KE.TICK_LABEL_POSITION_HIGH = KE.o1;
KE.TICK_LABEL_POSITION_LOW = KE.p1;
KE.TICK_LABEL_POSITION_NEXT_TO = KE.Ix;
KE.TICK_LABEL_POSITION_NONE = KE.wO;
KE = Yw.Asc.c_oAscCrossesRule = Yw.Asc.o_a = oD;
KE.auto = KE.eu;
KE.maxValue = KE.maxValue;
KE.value = KE.value;
KE.minValue = KE.minValue;
KE = Yw.Asc.c_oAscBetweenLabelsRule = Yw.Asc.NUb = pD;
KE.auto = KE.eu;
KE.manual = KE.PIc;
KE = Yw.Asc.c_oAscLabelsPosition = Yw.Asc.kOa = qD;
KE.byDivisions = KE.Dwb;
KE.betweenDivisions = KE.gOa;
KE = Yw.Asc.c_oAscAxisType = Yw.Asc.Etd = rD;
KE.auto = KE.eu;
KE.date = KE.date;
KE.text = KE.text;
KE.cat = KE.Mg;
KE.val = KE.val;
KE = Yw.Asc.c_oAscHAnchor = Yw.Asc.$ta = sD;
KE.Margin = KE.sx;
KE.Page = KE.Qc;
KE.Text = KE.Text;
KE = Yw.Asc.c_oAscXAlign = Yw.Asc.Kwb = tD;
KE.Center = KE.Ok;
KE.Inside = KE.mE;
KE.Left = KE.Ba;
KE.Outside = KE.rD;
KE.Right = KE.Ra;
KE = Yw.Asc.c_oAscYAlign = Yw.Asc.Lwb = uD;
KE.Bottom = KE.Ta;
KE.Center = KE.Ok;
KE.Inline = KE.Yq;
KE.Inside = KE.mE;
KE.Outside = KE.rD;
KE.Top = KE.Oa;
KE = Yw.Asc.c_oAscVAnchor = Yw.Asc.aua = vD;
KE.Margin = KE.sx;
KE.Page = KE.Qc;
KE.Text = KE.Text;
KE = Yw.Asc.c_oAscRelativeFromH = Yw.Asc.eZ = wD;
KE.Character = KE.bw;
KE.Column = KE.Sq;
KE.InsideMargin = KE.opa;
KE.LeftMargin = KE.a5;
KE.Margin = KE.sx;
KE.OutsideMargin = KE.Hpa;
KE.Page = KE.Qc;
KE.RightMargin = KE.i5;
KE = Yw.Asc.c_oAscRelativeFromV = Yw.Asc.u0 = xD;
KE.BottomMargin = KE.a9a;
KE.InsideMargin = KE.opa;
KE.Line = KE.qc;
KE.Margin = KE.sx;
KE.OutsideMargin = KE.Hpa;
KE.Page = KE.Qc;
KE.Paragraph = KE.Ua;
KE.TopMargin = KE.ecb;
KE = Yw.Asc.c_oAscBorderStyles = Yw.AscCommon.Zta = yD;
KE.None = KE.kf;
KE.Double = KE.su;
KE.Hair = KE.BWa;
KE.DashDotDot = KE.P4a;
KE.DashDot = KE.SVa;
KE.Dotted = KE.S4a;
KE.Dashed = KE.R4a;
KE.Thin = KE.XMa;
KE.MediumDashDotDot = KE.b5a;
KE.SlantDashDot = KE.r5a;
KE.MediumDashDot = KE.nXa;
KE.MediumDashed = KE.c5a;
KE.Medium = KE.XLa;
KE.Thick = KE.WMa;
KE = Yw.Asc.c_oAscPageOrientation = Yw.Asc.Qqa = zD;
KE.PagePortrait = KE.Rta;
KE.PageLandscape = KE.f5a;
KE = Yw.Asc.c_oAscColor = Yw.Asc.caa = BD;
KE.COLOR_TYPE_NONE = KE.D1c;
KE.COLOR_TYPE_SRGB = KE.v8;
KE.COLOR_TYPE_PRST = KE.Hea;
KE.COLOR_TYPE_SCHEME = KE.VQ;
KE.COLOR_TYPE_SYS = KE.ava;
KE = Yw.Asc.c_oAscFill = Yw.Asc.Iy = CD;
KE.FILL_TYPE_NONE = KE.XKa;
KE.FILL_TYPE_BLIP = KE.hv;
KE.FILL_TYPE_NOFILL = KE.UC;
KE.FILL_TYPE_SOLID = KE.nC;
KE.FILL_TYPE_GRAD = KE.JK;
KE.FILL_TYPE_PATT = KE.EJ;
KE.FILL_TYPE_GRP = KE.nia;
KE = Yw.Asc.c_oAscFillGradType = Yw.Asc.Hnb = ED;
KE.GRAD_LINEAR = KE.lTa;
KE.GRAD_PATH = KE.XMb;
KE = Yw.Asc.c_oAscFillBlipType = Yw.Asc.Itd = FD;
KE.STRETCH = KE.rQb;
KE.TILE = KE.Mnc;
KE = Yw.Asc.c_oAscStrokeType = Yw.Asc.V$e = GD;
KE.STROKE_NONE = KE.ulc;
KE.STROKE_COLOR = KE.sQb;
KE = Yw.Asc.c_oAscVAlign = Yw.Asc.cM = HD;
KE.Bottom = KE.Ta;
KE.Center = KE.Ok;
KE.Dist = KE.f$a;
KE.Just = KE.jab;
KE.Top = KE.Oa;
KE = Yw.Asc.c_oAscVertDrawingText = ID;
KE.normal = KE.c3b;
KE.vert = KE.ci;
KE.vert270 = KE.rDf;
KE = Yw.Asc.c_oAscLineJoinType = KD;
KE.Round = KE.hbb;
KE.Bevel = KE.Apb;
KE.Miter = KE.bPb;
KE = Yw.Asc.c_oAscLineCapType = LD;
KE.Flat = KE.Sje;
KE.Round = KE.hbb;
KE.Square = KE.F0d;
KE = Yw.Asc.c_oAscLineBeginType = MD;
KE.None = KE.kf;
KE.Arrow = KE.u4;
KE.Diamond = KE.Hfc;
KE.Oval = KE.Rjc;
KE.Stealth = KE.Cnc;
KE.Triangle = KE.doc;
KE = Yw.Asc.c_oAscLineBeginSize = ND;
KE.small_small = KE.DBf;
KE.small_mid = KE.CBf;
KE.small_large = KE.BBf;
KE.mid_small = KE.Eqf;
KE.mid_mid = KE.Dqf;
KE.mid_large = KE.Cqf;
KE.large_small = KE.gpf;
KE.large_mid = KE.fpf;
KE.large_large = KE.epf;
KE = Yw.Asc.c_oAscCellTextDirection = Yw.Asc.Wka = OD;
KE.LRTB = KE.kab;
KE.TBRL = KE.UMa;
KE.BTLR = KE.X8a;
KE = Yw.Asc.c_oAscDocumentUnits = Yw.Asc.EJf = PD;
KE.Millimeter = KE.J6b;
KE.Inch = KE.Thc;
KE.Point = KE.bkc;
Yw.Asc.c_oAscMaxTooltipLength = Yw.Asc.Ntd = 256;
Yw.Asc.c_oAscMaxCellOrCommentLength = Yw.Asc.Mtd = 32767;
Yw.Asc.c_oAscMaxHeaderFooterLength = Yw.Asc.D3f = 255;
Yw.Asc.c_oAscMaxFilterListLength = Yw.Asc.C3f = 1E4;
KE = Yw.Asc.c_oAscSelectionType = Yw.Asc.nna = QD;
KE.RangeCells = KE.Oab;
KE.RangeCol = KE.fka;
KE.RangeRow = KE.gna;
KE.RangeMax = KE.Sta;
KE.RangeImage = KE.sed;
KE.RangeChart = KE.ped;
KE.RangeShape = KE.ted;
KE.RangeShapeText = KE.gkc;
KE.RangeChartText = KE.fkc;
KE.RangeFrozen = KE.pve;
KE = Yw.Asc.c_oAscInsertOptions = Yw.Asc.Gac = RD;
KE.InsertCellsAndShiftRight = KE.Rmb;
KE.InsertCellsAndShiftDown = KE.b7a;
KE.InsertColumns = KE.zLa;
KE.InsertRows = KE.OWa;
KE.InsertTableRowAbove = KE.g_d;
KE.InsertTableRowBelow = KE.h_d;
KE.InsertTableColLeft = KE.e_d;
KE.InsertTableColRight = KE.f_d;
KE = Yw.Asc.c_oAscDeleteOptions = Yw.Asc.Eac = SD;
KE.DeleteCellsAndShiftLeft = KE.Fmb;
KE.DeleteCellsAndShiftTop = KE.Kqb;
KE.DeleteColumns = KE.zRa;
KE.DeleteRows = KE.mCa;
KE.DeleteTable = KE.kZd;
KE = Yw.Asc.c_oAscPrintType = Yw.Asc.EIb = XD;
KE.ActiveSheets = KE.UNc;
KE.EntireWorkbook = KE.g6c;
KE.Selection = KE.Selection;
KE = Yw.Asc.c_oDashType = Yw.Asc.W$e = YD;
KE.dash = KE.Zef;
KE.dashDot = KE.$ef;
KE.dot = KE.yff;
KE.lgDash = KE.npf;
KE.lgDashDot = KE.opf;
KE.lgDashDotDot = KE.ppf;
KE.solid = KE.fLd;
KE.sysDash = KE.BCf;
KE.sysDashDot = KE.CCf;
KE.sysDashDotDot = KE.DCf;
KE.sysDot = KE.ECf;
KE = Yw.Asc.c_oAscMathInterfaceType = Yw.Asc.wE = ZD;
KE.Common = KE.Ona;
KE.Fraction = KE.Aja;
KE.Script = KE.mwa;
KE.Radical = KE.Nab;
KE.LargeOperator = KE.gsb;
KE.Delimiter = KE.Naa;
KE.Function = KE.Function;
KE.Accent = KE.HKb;
KE.BorderBox = KE.Z8a;
KE.Bar = KE.TF;
KE.Box = KE.Gpb;
KE.Limit = KE.NOb;
KE.GroupChar = KE.QNb;
KE.Matrix = KE.PU;
KE.EqArray = KE.LMb;
KE.Phantom = KE.Bue;
KE = Yw.Asc.c_oAscMathInterfaceBarPos = Yw.Asc.ntc = $D;
KE.Top = $D.Oa;
KE.Bottom = $D.Ta;
KE = Yw.Asc.c_oAscMathInterfaceScript = Yw.Asc.xEa = aE;
KE.None = aE.kf;
KE.Sup = aE.yka;
KE.Sub = aE.Lha;
KE.SubSup = aE.BT;
KE.PreSubSup = aE.ckc;
KE = Yw.Asc.c_oAscMathInterfaceFraction = Yw.Asc.wEa = bE;
KE.None = bE.TF;
KE.Skewed = bE.nnc;
KE.Linear = bE.Sic;
KE.NoBar = bE.Bab;
KE = Yw.Asc.c_oAscMathInterfaceLimitPos = Yw.Asc.TUb = cE;
KE.None = cE.kf;
KE.Top = cE.Oa;
KE.Bottom = cE.Ta;
KE = Yw.Asc.c_oAscMathInterfaceMatrixMatrixAlign = Yw.Asc.Hdb = dE;
KE.Top = dE.Oa;
KE.Center = dE.Ok;
KE.Bottom = dE.Ta;
KE = Yw.Asc.c_oAscMathInterfaceMatrixColumnAlign = Yw.Asc.Gdb = eE;
KE.Left = eE.Ba;
KE.Center = eE.Ok;
KE.Right = eE.Ra;
KE = Yw.Asc.c_oAscMathInterfaceEqArrayAlign = Yw.Asc.Fdb = fE;
KE.Top = fE.Oa;
KE.Center = fE.Ok;
KE.Bottom = fE.Ta;
KE = Yw.Asc.c_oAscMathInterfaceNaryLimitLocation = Yw.Asc.Pqa = gE;
KE.UndOvr = gE.Qfa;
KE.SubSup = gE.BT;
KE = Yw.Asc.c_oAscMathInterfaceGroupCharPos = Yw.Asc.SUb = hE;
KE.None = hE.kf;
KE.Top = hE.Oa;
KE.Bottom = hE.Ta;
KE = Yw.Asc.c_oAscTabLeader = Yw.Asc.Eia = jE;
KE.None = jE.kf;
KE.Heavy = jE.Lhc;
KE.Dot = jE.m$b;
KE.Hyphen = jE.B9c;
KE.MiddleDot = jE.Hbd;
KE.Underscore = jE.foc;
KE = Yw.Asc.c_oAscTabType = Yw.Asc.Jdb = iE;
KE.Bar = iE.TF;
KE.Center = iE.Ok;
KE.Clear = iE.yg;
KE.Decimal = iE.sB;
KE.Num = iE.Hh;
KE.Right = iE.Ra;
KE.Left = iE.Ba;
KE = Yw.Asc.c_oAscRestrictionType = Yw.Asc.FIb = MA;
KE.None = MA.kf;
KE.OnlyForms = MA.SUc;
KE.OnlyComments = MA.Qcd;
KE.OnlySignatures = MA.Jte;
KE.View = MA.Aub;
KE = Yw.AscCommon.c_oAscCellAnchorType = Yw.AscCommon.DP = {
    aSa: 0,
    ita: 1,
    fS: 2
};
KE.cellanchorAbsolute = KE.aSa;
KE.cellanchorOneCell = KE.ita;
KE.cellanchorTwoCell = KE.fS;
Yw.AscCommon = Yw.AscCommon || {};
Yw.AscCommon.xvc = Zw;
Yw.AscCommon.wWb = "General";
Yw.AscCommon.Bia = !1;
Yw.AscCommon.Fwb = {
    kf: 0,
    NRa: 1,
    lH: 2
};
Yw.AscCommon.YTc = {
    kf: "",
    nZd: "asc_onDownloadUrl",
    Kab: "asc_onPrintUrl",
    cjc: "asc_onSaveMailMerge"
};
Yw.AscCommon.e0 = {
    Number: 0,
    String: 1,
    jia: 2,
    Error: 3
};
Yw.AscCommon.B2d = {
    JKf: 478,
    IKf: 286
};
Yw.AscCommon.clb = {
    wb: 0,
    Document: 1
};
Yw.AscCommon.mtc = {
    Ba: 0,
    Ok: 1,
    Ra: 2,
    Oa: 0,
    Ta: 2
};
Yw.AscCommon.fR = 0;
Yw.AscCommon.WE = 1;
Yw.AscCommon.IE = 2;
Yw.AscCommon.hGb = 1;
Yw.AscCommon.ubc = 2;
Yw.AscCommon.sHa = .65;
Yw.AscCommon.Q5b = .35;
Yw.AscCommon.pEb = -.141;
Yw.AscCommon.ptc = {
    yMc: 0,
    Y3a: 1,
    xMc: 2,
    zMc: 3,
    ZKd: 4,
    $Kd: 5
};
Yw.AscCommon.qtc = {
    l5b: 0,
    Jjb: 1,
    BMc: 2,
    AMc: 3,
    aLd: 4,
    bLd: 5
};
Yw.AscCommon.rtc = {
    Yq: 0,
    yja: 1
};
Yw.AscCommon.L$e = {
    kf: 0,
    XMa: 1,
    XLa: 2,
    WMa: 3
};
Yw.AscCommon.OTa = {
    w6b: 1,
    j7b: 2,
    r5c: 3
};
Yw.AscCommon.YRa = {
    k6: 1,
    j4: 2,
    qta: 3,
    sVd: 4,
    bpf: 5
};
Yw.AscCommon.EFb = AD;
Yw.AscCommon.WUb = {
    wue: 0,
    vue: 1,
    Oea: 2,
    Lge: 3
};
Yw.AscCommon.N$e = {
    line: "Line",
    Dsd: "Bar",
    Elf: "HBar",
    Yda: "Area",
    Daa: "Pie",
    H0: "Scatter",
    I6: "Stock",
    zaa: "Doughnut"
};
Yw.AscCommon.M$e = {
    c3b: "normal",
    oLd: "stacked",
    pLd: "stackedPer"
};
Yw.AscCommon.p_a = {
    kf: 0,
    OX: 1,
    eEe: 2,
    zge: 3,
    B3c: 4,
    ic: 5
};
Yw.AscCommon.Iwb = {
    g$c: 0,
    ape: 1,
    b6c: 2
};
Yw.AscCommon.kga = {
    Ona: 0,
    Ri: 1,
    Wsa: 2,
    qf: 3
};
Yw.AscCommon.F2d = TD;
Yw.AscCommon.$Ub = {
    c3: 1,
    yHb: 2,
    eZd: 3
};
Yw.AscCommon.PTa = {
    l$b: 0,
    ym: 1,
    Cpa: 2,
    VVa: 3,
    g0d: 4,
    lHb: 5,
    dOc: 6,
    jZd: 7,
    R_d: 8
};
Yw.AscCommon.hea = {
    L4a: 0,
    e6b: 1,
    tZd: 2,
    g8c: 3,
    zUc: 4,
    v0d: 5
};
Yw.AscCommon.Hwb = [[0, 28596, "ISO-8859-6", "Arabic (ISO 8859-6)"], [1, 720, "DOS-720", "Arabic (OEM 720)"], [2, 1256, "windows-1256", "Arabic (Windows)"], [3, 28594, "ISO-8859-4", "Baltic (ISO 8859-4)"], [4, 28603, "ISO-8859-13", "Baltic (ISO 8859-13)"], [5, 775, "IBM775", "Baltic (OEM 775)"], [6, 1257, "windows-1257", "Baltic (Windows)"], [7, 28604, "ISO-8859-14", "Celtic (ISO 8859-14)"], [8, 28595, "ISO-8859-5", "Cyrillic (ISO 8859-5)"], [9, 20866, "KOI8-R", "Cyrillic (KOI8-R)"], [10, 21866, "KOI8-U", "Cyrillic (KOI8-U)"], [11, 10007, "x-mac-cyrillic", "Cyrillic (Mac)"], [12, 855, "IBM855", "Cyrillic (OEM 855)"], [13, 866, "cp866", "Cyrillic (OEM 866)"], [14, 1251, "windows-1251", "Cyrillic (Windows)"], [15, 852, "IBM852", "Central European (OEM 852)"], [16, 1250, "windows-1250", "Central European (Windows)"], [17, 950, "Big5", "Chinese (Big5 Traditional)"], [18, 936, "GB2312", "Central (GB2312 Simplified)"], [19, 28592, "ISO-8859-2", "Eastern European (ISO 8859-2)"], [20, 28597, "ISO-8859-7", "Greek (ISO 8859-7)"], [21, 737, "IBM737", "Greek (OEM 737)"], [22, 869, "IBM869", "Greek (OEM 869)"], [23, 1253, "windows-1253", "Greek (Windows)"], [24, 28598, "ISO-8859-8", "Hebrew (ISO 8859-8)"], [25, 862, "DOS-862", "Hebrew (OEM 862)"], [26, 1255, "windows-1255", "Hebrew (Windows)"], [27, 932, "Shift_JIS", "Japanese (Shift-JIS)"], [52, 950, "EUC-JP", "Japanese (EUC-JP)"], [28, 949, "KS_C_5601-1987", "Korean (Windows)"], [29, 51949, "EUC-KR", "Korean (EUC)"], [30, 861, "IBM861", "North European (Icelandic OEM 861)"], [31, 865, "IBM865", "North European (Nordic OEM 865)"], [32, 874, "windows-874", "Thai (TIS-620)"], [33, 28593, "ISO-8859-3", "Turkish (ISO 8859-3)"], [34, 28599, "ISO-8859-9", "Turkish (ISO 8859-9)"], [35, 857, "IBM857", "Turkish (OEM 857)"], [36, 1254, "windows-1254", "Turkish (Windows)"], [37, 28591, "ISO-8859-1", "Western European (ISO-8859-1)"], [38, 28605, "ISO-8859-15", "Western European (ISO-8859-15)"], [39, 850, "IBM850", "Western European (OEM 850)"], [40, 858, "IBM858", "Western European (OEM 858)"], [41, 860, "IBM860", "Western European (OEM 860 : Portuguese)"], [42, 863, "IBM863", "Western European (OEM 863 : French)"], [43, 437, "IBM437", "Western European (OEM-US)"], [44, 1252, "windows-1252", "Western European (Windows)"], [45, 1258, "windows-1258", "Vietnamese (Windows)"], [46, 65001, "UTF-8", "Unicode (UTF-8)"], [47, 65E3, "UTF-7", "Unicode (UTF-7)"], [48, 1200, "UTF-16LE", "Unicode (UTF-16)"], [49, 1201, "UTF-16BE", "Unicode (UTF-16 Big Endian)"], [50, 12E3, "UTF-32LE", "Unicode (UTF-32)"], [51, 12001, "UTF-32BE", "Unicode (UTF-32 Big Endian)"]];
Yw.AscCommon.A3f = {
    437: 43,
    720: 1,
    737: 21,
    775: 5,
    850: 39,
    852: 15,
    855: 12,
    857: 35,
    858: 40,
    860: 41,
    861: 30,
    862: 25,
    863: 42,
    865: 31,
    866: 13,
    869: 22,
    874: 32,
    932: 27,
    936: 18,
    949: 28,
    950: 17,
    1200: 48,
    1201: 49,
    1250: 16,
    1251: 14,
    1252: 44,
    1253: 23,
    1254: 36,
    1255: 26,
    1256: 2,
    1257: 6,
    1258: 45,
    10007: 11,
    12E3: 50,
    12001: 51,
    20866: 9,
    21866: 10,
    28591: 37,
    28592: 19,
    28593: 33,
    28594: 3,
    28595: 8,
    28596: 0,
    28597: 20,
    28598: 24,
    28599: 34,
    28603: 4,
    28604: 7,
    28605: 38,
    51949: 29,
    65E3: 47,
    65001: 46
};
Yw.AscCommon.C2d = -1;
Yw.AscCommon.PUb = 47;
Yw.AscCommon.CIb = 46;
Yw.AscCommon.O$e = 48;
Yw.AscCommon.P$e = 49;
Yw.AscCommon.Q$e = 50;
Yw.AscCommon.R$e = 51;
Yw.AscCommon.S$e = 8192;
Yw.AscCommon.yna = 1;
Yw.AscCommon.l4 = 2;
Yw.AscCommon.xob = 3;
Yw.AscCommon.rIc = 4;
Yw.AscCommon.sIc = 5;
Yw.AscCommon.rR = 0;
Yw.AscCommon.LG = 1;
Yw.AscCommon.hJ = 2;
Yw.AscCommon.$ka = 3;
Yw.AscCommon.fP = 4;
Yw.AscCommon.yaa = 10;
Yw.AscCommon.H5 = 11;
Yw.AscCommon.oga = 12;
Yw.AscCommon.Jnb = 13;
Yw.AscCommon.iea = 20;
Yw.AscCommon.jVb = 21;
Yw.AscCommon.Xza = 23;
Yw.AscCommon.FQc = 24;
Yw.AscCommon.EQc = 25;
Yw.AscCommon.eBa = 26;
Yw.AscCommon.Pdb = 30;
Yw.AscCommon.l3 = 40;
Yw.AscCommon.Sha = 41;
Yw.AscCommon.Tha = 51;
Yw.AscCommon.XWc = 60;
Yw.AscCommon.t4f = 61;
Yw.AscCommon.YJf = 62;
Yw.AscCommon.qbf = 64;
Yw.AscCommon.aKf = 65;
Yw.AscCommon.ZJf = 66;
Yw.AscCommon.pbf = 67;
Yw.AscCommon.Ftc = 68;
Yw.AscCommon.obf = 70;
Yw.AscCommon.WJf = 71;
Yw.AscCommon.r4f = 72;
Yw.AscCommon.s4f = 73;
Yw.AscCommon.XJf = 74;
Yw.AscCommon.$Jf = 75;
Yw.AscCommon.qud = 76;
Yw.AscCommon.pud = 1;
Yw.AscCommon.K2d = 2;
Yw.AscCommon.oud = 3;
Yw.AscCommon.dBa = 4;
Yw.AscCommon.xaa = 5;
Yw.AscCommon.iVb = 6;
Yw.AscCommon.J2d = 7;
Yw.AscCommon.F9 = 1;
Yw.AscCommon.G9 = 2;
Yw.AscCommon.Hmg = 1;
Yw.AscCommon.lue = 16;
Yw.AscCommon.mue = 32;
Yw.AscCommon.Img = 256;
Yw.AscCommon.kGf = 2;
Yw.AscCommon.lGf = 4;
Yw.AscCommon.X7a = kE;
Yw.AscCommon.urf = "_offline_";
Yw.AscCommon.sbf = "_chart_";
Yw.AscCommon.align_Right = Yw.AscCommon.zF = 0;
Yw.AscCommon.align_Left = Yw.AscCommon.Gr = 1;
Yw.AscCommon.align_Center = Yw.AscCommon.Dy = 2;
Yw.AscCommon.align_Justify = Yw.AscCommon.CP = 3;
Yw.AscCommon.c_oAscFormatPainterState = AD;
AD.kOff = AD.xna;
AD.kOn = AD.$1b;
AD.kMultiple = AD.O8d;
KE = Yw.Asc.c_oSpecialPasteProps = Yw.Asc.JF = lE;
KE.paste = KE.pZc;
KE.pasteOnlyFormula = KE.oWd;
KE.formulaNumberFormat = KE.PSd;
KE.formulaAllFormatting = KE.F3d;
KE.formulaWithoutBorders = KE.QSd;
KE.formulaColumnWidth = KE.OSd;
KE.mergeConditionalFormating = KE.yqf;
KE.pasteOnlyValues = KE.pWd;
KE.valueNumberFormat = KE.NXd;
KE.valueAllFormating = KE.MXd;
KE.pasteOnlyFormating = KE.nWd;
KE.transpose = KE.F6a;
KE.link = KE.link;
KE.picture = KE.e3a;
KE.linkedPicture = KE.wpf;
KE.sourceformatting = KE.aKa;
KE.destinationFormatting = KE.W_a;
KE.mergeFormatting = KE.gJc;
KE.uniteList = KE.aDf;
KE.doNotUniteList = KE.wff;
KE.keepTextOnly = KE.k4;
KE.insertAsNestedTable = KE.tHc;
KE.overwriteCells = KE.jib;
KE.useTextImport = KE.JMd;
KE = Yw.Asc.c_oAscNumberingFormat = Yw.Asc.ag = mE;
KE.None = mE.kf;
KE.Bullet = mE.vf;
KE.Decimal = mE.sB;
KE.LowerRoman = mE.FS;
KE.UpperRoman = mE.s0;
KE.LowerLetter = mE.ES;
KE.UpperLetter = mE.r0;
KE.DecimalZero = mE.gTa;
KE.DecimalEnclosedCircle = mE.Iqb;
KE = Yw.Asc.c_oAscNumberingSuff = Yw.Asc.a_ = nE;
KE.Tab = nE.OX;
KE.Space = nE.ic;
KE.None = nE.kf;
KE = Yw.Asc.c_oAscNumberingLvlTextType = Yw.Asc.K7a = oE;
KE.Text = oE.Text;
KE.Num = oE.Hh;
KE = Yw.Asc.c_oAscSdtAppearance = Yw.Asc.Idb = pE;
KE.Frame = pE.DRa;
KE.Hidden = pE.DA;
KE = Yw.Asc.c_oAscObjectsAlignType = Yw.Asc.lOa = qE;
KE.Selected = qE.m0;
KE.Slide = qE.Slide;
KE.Page = qE.Qc;
KE.Margin = qE.sx;
KE = Yw.Asc.c_oAscItemType = Yw.Asc.EI = {
    wb: 0,
    BTc: 1,
    vl: 2,
    OTc: 3,
    ut: 4,
    ir: 5,
    Ysb: 6,
    s5a: 7,
    FVc: 8,
    QYa: 9,
    i7b: 10,
    NVc: 11,
    ob: 12,
    DCa: 13,
    S6: 14
};
KE.Data = KE.ob;
KE.Default = KE.wb;
KE.Sum = KE.QYa;
KE.CountA = KE.OTc;
KE.Avg = KE.BTc;
KE.Max = KE.ut;
KE.Min = KE.ir;
KE.Product = KE.Ysb;
KE.Count = KE.vl;
KE.StdDev = KE.s5a;
KE.StdDevP = KE.FVc;
KE.Var = KE.i7b;
KE.VarP = KE.NVc;
KE.Grand = KE.DCa;
KE.Blank = KE.S6;
KE = Yw.Asc.c_oAscRevisionsMove = Yw.Asc.EP = rE;
KE.NoMove = rE.X8;
KE.MoveTo = rE.Qda;
KE.MoveFrom = rE.mfa;
KE = Yw.Asc.c_oAscRevisionsChangeType = Yw.Asc.Xka = sE;
KE.Unknown = sE.QN;
KE.TextAdd = sE.s5;
KE.TextRem = sE.o9;
KE.ParaAdd = sE.Jpa;
KE.ParaRem = sE.dka;
KE.TextPr = sE.mb;
KE.ParaPr = sE.Ib;
KE.TablePr = sE.Mf;
KE.RowsAdd = sE.Qpa;
KE.RowsRem = sE.Rpa;
KE.MoveMark = sE.kH;
KE = Yw.Asc.c_oAscSectionBreakType = Yw.Asc.q_a = tE;
KE.NextPage = tE.oXa;
KE.OddPage = tE.rXa;
KE.EvenPage = tE.cWa;
KE.Continuous = tE.O_;
KE.Column = tE.Sq;
KE = Yw.Asc.c_oAscSdtLockType = Yw.Asc.FFb = uE;
KE.ContentLocked = uE.OIa;
KE.SdtContentLocked = uE.eJa;
KE.SdtLocked = uE.PAa;
KE.Unlocked = uE.Qza;
KE = Yw.Asc.c_oAscAlignH = Yw.Asc.yQc = vE;
KE.Center = vE.Ok;
KE.Inside = vE.mE;
KE.Left = vE.Ba;
KE.Outside = vE.rD;
KE.Right = vE.Ra;
KE = Yw.Asc.c_oAscAlignV = Yw.Asc.zQc = zE;
KE.Bottom = zE.Ta;
KE.Center = zE.Ok;
KE.Inside = zE.mE;
KE.Outside = zE.rD;
KE.Top = zE.Oa;
KE = Yw.Asc.c_oAscWatermarkType = Yw.Asc.Yka = {
    kf: 0,
    Text: 1,
    Image: 2
};
KE.None = KE.kf;
KE.Text = KE.Text;
KE.Image = KE.Image;
KE = Yw.Asc.c_oAscCalendarType = Yw.Asc.A2d = AE;
KE.Gregorian = AE.u$b;
KE.GregorianArabic = AE.nUc;
KE.GregorianMeFrench = AE.oUc;
KE.GregorianUs = AE.pUc;
KE.GregorianXlitEnglish = AE.qUc;
KE.GregorianXlitFrench = AE.rUc;
KE.Hebrew = AE.uUc;
KE.Hijri = AE.wUc;
KE.Japan = AE.OHb;
KE.Korea = AE.DUc;
KE.None = AE.kf;
KE.Saka = AE.kVc;
KE.Taiwan = AE.HVc;
KE.Thai = AE.IVc;
KE = Yw.Asc.c_oAscContentControlSpecificType = Yw.Asc.ZV = BE;
KE.None = BE.kf;
KE.CheckBox = BE.Pm;
KE.Picture = BE.uN;
KE.ComboBox = BE.xC;
KE.DropDownList = BE.ARa;
KE.DateTime = BE.aB;
KE.TOC = BE.Xta;
"use strict";
(function(f, e) {
    function Ia(f) {
        this.userName = this.pHc = this.id = null;
        this.state = e;
        this.eof = -1;
        this.color = null;
        this.view = !1;
        this.vYe(f);
        return this
    }
    Ia.prototype.vYe = function(e) {
        e && (this.id = e.id,
        this.pHc = e.idOriginal,
        this.userName = e.username,
        this.eof = e.indexUser,
        this.color = f.AscCommon.fGb(this.pHc, this.userName, !1, !0),
        this.view = e.view)
    }
    ;
    Ia.prototype.sE = function() {
        return this.id
    }
    ;
    Ia.prototype.a2e = function() {
        return this.pHc
    }
    ;
    Ia.prototype.YAa = function() {
        return this.userName
    }
    ;
    Ia.prototype.TTb = function() {
        return this.igf
    }
    ;
    Ia.prototype.WTb = function() {
        return this.URc
    }
    ;
    Ia.prototype.I4e = function() {
        return this.state
    }
    ;
    Ia.prototype.FT = function() {
        return "#" + ("000000" + this.color.toString(16)).substr(-6)
    }
    ;
    Ia.prototype.yrd = function() {
        return this.view
    }
    ;
    Ia.prototype.vw = function(e) {
        this.id = e
    }
    ;
    Ia.prototype.fMc = function(e) {
        this.userName = e
    }
    ;
    Ia.prototype.FAf = function(e) {
        this.igf = e
    }
    ;
    Ia.prototype.VAf = function(e) {
        this.URc = e
    }
    ;
    Ia.prototype.HKd = function(e) {
        this.state = e
    }
    ;
    var $a = {
        sJd: 4001,
        uJd: 4002,
        tJd: 4003,
        ZYe: 4004,
        $of: 4005,
        Zof: 4006,
        Zuc: 4007,
        hDf: 4008
    };
    f.AscCommon = f.AscCommon || {};
    f.AscCommon.QTb = Ia;
    var Va = Ia.prototype;
    Va.asc_getId = Va.sE;
    Va.asc_getIdOriginal = Va.a2e;
    Va.asc_getUserName = Va.YAa;
    Va.asc_getState = Va.I4e;
    Va.asc_getColor = Va.FT;
    Va.asc_getView = Va.yrd;
    f.AscCommon.Nvc = function(e, f) {
        var y = Asc.Gk.pg.gqb;
        $a.sJd === f ? y = Asc.Gk.pg.gqb : $a.uJd === f ? y = Asc.Gk.pg.Mlc : $a.tJd === f ? y = Asc.Gk.pg.Llc : $a.ZYe === f ? y = Asc.Gk.pg.Ucc : $a.$of === f ? y = e ? Asc.Gk.pg.vhd : Asc.Gk.pg.Hic : $a.Zof === f ? y = Asc.Gk.pg.ncb : $a.Zuc === f ? y = Asc.Gk.pg.Ild : $a.hDf === f && (y = Asc.Gk.pg.ooc);
        return y
    }
    ;
    f.AscCommon.Jxd = function(e) {
        return Asc.Gk.pg.ooc === e || Asc.Gk.pg.Mlc === e || Asc.Gk.pg.Llc === e
    }
    ;
    f.AscCommon.ULb = {
        MCe: -1,
        kf: 0,
        gMe: 1,
        SUa: 2,
        g3c: 3,
        f3c: 4,
        uQb: 10,
        odc: 11
    };
    f.AscCommon.bs = {
        Tl: 0,
        NK: 1,
        $y: 2
    };
    f.AscCommon.Otd = $a;
    f.AscCommon.T$e = {
        pXa: 0,
        Akg: 1,
        Qmg: 2,
        xog: 3,
        ute: 4,
        wog: 5,
        boc: 6,
        tog: 7
    };
    f.AscCommon.Ktd = {
        ty: 0,
        UF: 1,
        sog: 2
    }
}
)(window);
"use strict";
(function(f, e) {
    function Ia(e) {
        this.nl = new Va;
        this.cK = !1;
        e && (this.Yra = e.Yra,
        this.DQa = e.DQa,
        this.qGa = e.qGa,
        this.tGa = e.tGa,
        this.zIa = e.zIa,
        this.rGa = e.rGa,
        this.uGa = e.uGa,
        this.mGa = e.mGa,
        this.kma = e.kma,
        this.oGa = e.oGa,
        this.oya = e.oya,
        this.lma = e.lma,
        this.vua = e.vua,
        this.B2 = e.B2,
        this.xGa = e.xGa,
        this.nya = e.nya,
        this.Zra = e.Zra,
        this.vGa = e.vGa,
        this.wGa = e.wGa,
        this.wua = e.wua,
        this.pya = e.pya,
        this.U2a = e.U2a,
        this.$ra = e.$ra,
        this.sGa = e.sGa,
        this.BQa = e.BQa,
        this.nGa = e.nGa,
        this.pGa = e.pGa,
        this.CQa = e.CQa)
    }
    function $a(e, f) {
        this.eUe = e ? e.slice() : null;
        this.rNa = f
    }
    function Va(f) {
        f && (this.Yra = f.Yra,
        this.DQa = f.DQa,
        this.qGa = f.qGa,
        this.tGa = f.tGa,
        this.zIa = f.zIa,
        this.rGa = f.rGa,
        this.uGa = f.uGa,
        this.mGa = f.mGa,
        this.kma = f.kma,
        this.oGa = f.oGa,
        this.oya = f.oya,
        this.lma = f.lma,
        this.vua = f.vua,
        this.B2 = f.B2,
        this.xGa = f.xGa,
        this.vGa = f.vGa,
        this.wGa = f.wGa,
        this.wua = f.wua,
        this.nya = f.nya,
        this.Zra = f.Zra,
        this.$ra = f.$ra,
        this.sGa = f.sGa,
        this.BQa = f.BQa,
        this.nGa = f.nGa,
        this.pGa = f.pGa,
        this.CQa = f.CQa);
        this.BI = Ab.kf;
        this.Qwa = {};
        this.Rcb;
        this.Hcb = 0;
        this.HCd = !1;
        this.AI = {};
        this.tvb = [];
        this.zTb = [];
        this.yNa = {};
        this.Ncb = {};
        this.jEa = [];
        this.vpd = this.xTb = this.eqd = this.npd = this.jEb = this.osa = this.bRa = null;
        this.qvb = -1;
        this.VPa = this.Xgb = !1;
        this.RMd = 1572864;
        this.deleteIndex = this.Evd = this.pxb = 0;
        this.$qc = null;
        this.cDd = this.fIc = -1;
        this.Wwb = 0;
        this.dvc = null;
        this.dVb = this.d_ = !1;
        this.EZa = "";
        this.x3a = null;
        this.ysc = 0;
        this.aEd = 50;
        this.vId = 2E3;
        this.bvc = 1E4;
        this.Pff = 6E4;
        this.Wcb = this.qqd = this.Iod = this.kvb = null;
        this.ENa = "Anonymous";
        this.k3b = [];
        this.Dsa = this.ODb = null;
        this.owd = -1;
        this.wTb = this.BZa = this.xNa = !1;
        this.Jod = 0;
        this.twd = this.dIc = this.Z1b = this.lang = this.permissions = this.mode = e;
        this.eqc = this.upd = !1;
        this.yTb = [];
        this.iTb = [];
        this.jTb = []
    }
    var ib = f.Asc
      , y = f.AscCommon
      , Ab = y.ULb
      , Sb = y.bs
      , kb = y.Otd
      , Ta = y.T$e
      , ob = y.Ktd;
    Ia.prototype.te = function(e, f, y, Ta, Ia, Va, Ma) {
        if (this.nl && this.nl.VHc()) {
            var Xa = this;
            this.nl.Yra = function(e, f) {
                Xa.saf(e, f)
            }
            ;
            this.nl.DQa = function(e) {
                Xa.Jaf(e)
            }
            ;
            this.nl.qGa = function(e, f) {
                Xa.Haf(e, f)
            }
            ;
            this.nl.tGa = function(e) {
                Xa.Maf(e)
            }
            ;
            this.nl.zIa = function(e) {
                Xa.uaf(e)
            }
            ;
            this.nl.rGa = function(e) {
                Xa.Iaf(e)
            }
            ;
            this.nl.uGa = function(e) {
                Xa.Naf(e)
            }
            ;
            this.nl.mGa = function(e) {
                Xa.xaf(e)
            }
            ;
            this.nl.oGa = function(e) {
                Xa.Baf(e)
            }
            ;
            this.nl.kma = function(e) {
                Xa.Aaf(e)
            }
            ;
            this.nl.oya = function(e) {
                Xa.$td(e)
            }
            ;
            this.nl.lma = function(e, f) {
                Xa.Faf(e, f)
            }
            ;
            this.nl.vua = function() {
                Xa.Gaf()
            }
            ;
            this.nl.B2 = function(e, f) {
                Xa.ztc(e, f)
            }
            ;
            this.nl.xGa = function(e) {
                Xa.Qaf(e)
            }
            ;
            this.nl.nya = function() {
                Xa.zaf()
            }
            ;
            this.nl.Zra = function(e) {
                Xa.taf(e)
            }
            ;
            this.nl.vGa = function(e) {
                Xa.aud(e)
            }
            ;
            this.nl.wGa = function(e) {
                Xa.bud(e)
            }
            ;
            this.nl.wua = function(e, f, y) {
                Xa.Laf(e, f, y)
            }
            ;
            this.nl.pya = function(e, f) {
                Xa.Paf(e, f)
            }
            ;
            this.nl.U2a = function(e) {
                Xa.waf(e)
            }
            ;
            this.nl.$ra = function() {
                Xa.cud()
            }
            ;
            this.nl.sGa = function(e) {
                Xa.Kaf(e)
            }
            ;
            this.nl.BQa = function(e) {
                Xa.vaf(e)
            }
            ;
            this.nl.nGa = function() {
                Xa.yaf()
            }
            ;
            this.nl.pGa = function(e) {
                Xa.Daf(e)
            }
            ;
            this.nl.CQa = function(e) {
                Xa.Eaf(e)
            }
            ;
            this.nl.te(e, f, y, Ta, Ia, Va, Ma);
            this.cK = !0
        } else
            this.nGa(),
            this.pGa(null)
    }
    ;
    Ia.prototype.Ovc = function() {
        return this.nl ? this.nl.Ovc() : e
    }
    ;
    Ia.prototype.K4b = function(e) {
        if (this.nl)
            return this.nl.K4b(e)
    }
    ;
    Ia.prototype.jUb = function(e, f, y) {
        this.nl && this.cK ? this.nl.jUb(e, f, y) : (this.bud(""),
        this.aud("123"),
        this.nya())
    }
    ;
    Ia.prototype.Q3a = function(e) {
        this.nl && this.nl.Q3a(e)
    }
    ;
    Ia.prototype.I0a = function() {
        return this.nl ? this.nl.I0a() : 0
    }
    ;
    Ia.prototype.V2a = function(e) {
        this.nl && this.cK && this.nl.V2a(e)
    }
    ;
    Ia.prototype.Vvc = function() {
        this.nl && this.cK && this.nl.Vvc()
    }
    ;
    Ia.prototype.HLc = function(e) {
        this.nl && this.cK && this.nl.HLc(e)
    }
    ;
    Ia.prototype.C9b = function(e) {
        this.nl && this.cK && this.nl.C9b(e)
    }
    ;
    Ia.prototype.$Ga = function(e) {
        this.nl && this.cK && this.nl.$Ga(e)
    }
    ;
    Ia.prototype.iUb = function(e, y) {
        if (this.nl && this.cK)
            this.nl.iUb(e, y);
        else {
            var Xa = this;
            f.setTimeout(function() {
                if (y) {
                    var f = e ? e.length : 0;
                    if (0 < f) {
                        y({
                            lock: e[0]
                        });
                        for (var Ta = 0; Ta < f; ++Ta)
                            Xa.$td({
                                state: 2,
                                block: e[Ta]
                            })
                    }
                }
            }, 1)
        }
    }
    ;
    Ia.prototype.G7a = function(e) {
        this.nl && this.cK ? this.nl.G7a(e) : f.setTimeout(function() {
            e && e({
                saveLock: !1
            })
        }, 100)
    }
    ;
    Ia.prototype.I5b = function() {
        if (this.nl && this.cK)
            this.nl.I5b();
        else {
            var e = this;
            f.setTimeout(function() {
                e.cud()
            }, 100)
        }
    }
    ;
    Ia.prototype.C8a = function(e, f, y, Ta, Ia) {
        this.nl && this.cK && (this.nl.d_ = Ta,
        this.nl.dVb = Ia,
        this.nl.C8a(e, null, f, y))
    }
    ;
    Ia.prototype.Wjb = function(e, f, y, Ta) {
        this.nl && this.cK && (this.nl.d_ = f,
        this.nl.dVb = Ta,
        this.nl.Wjb(e, y))
    }
    ;
    Ia.prototype.lwc = function() {
        this.nl && this.cK && this.nl.lwc()
    }
    ;
    Ia.prototype.mSa = function() {
        return this.nl && this.cK ? this.nl.mSa() : null
    }
    ;
    Ia.prototype.qbc = function() {
        return this.nl && this.cK ? this.nl.qbc() : null
    }
    ;
    Ia.prototype.oXb = function() {
        return this.nl && this.cK ? this.nl.oXb() : null
    }
    ;
    Ia.prototype.tFa = function() {
        return this.nl && this.cK ? this.nl.tFa() : null
    }
    ;
    Ia.prototype.mLc = function(e) {
        this.nl && this.cK && this.nl.mLc(e)
    }
    ;
    Ia.prototype.disconnect = function(e, f) {
        this.nl && this.cK && this.nl.disconnect(e, f)
    }
    ;
    Ia.prototype.fvc = function(e) {
        this.nl && this.cK && this.nl.fvc(e)
    }
    ;
    Ia.prototype.JNc = function(e) {
        this.nl && this.cK && this.nl.JNc(e)
    }
    ;
    Ia.prototype.j0a = function() {
        return this.nl && this.cK ? this.nl.j0a() : !1
    }
    ;
    Ia.prototype.saf = function(e, f) {
        this.Yra && this.Yra(e, f)
    }
    ;
    Ia.prototype.Jaf = function(e) {
        this.DQa && this.DQa(e)
    }
    ;
    Ia.prototype.Haf = function(e, f) {
        this.qGa && this.qGa(e, f)
    }
    ;
    Ia.prototype.Maf = function(e) {
        this.tGa && this.tGa(e)
    }
    ;
    Ia.prototype.uaf = function(e) {
        this.zIa && this.zIa(e)
    }
    ;
    Ia.prototype.Iaf = function(e) {
        this.rGa && this.rGa(e)
    }
    ;
    Ia.prototype.Naf = function(e) {
        this.uGa && this.uGa(e)
    }
    ;
    Ia.prototype.xaf = function(e) {
        this.mGa && this.mGa(e)
    }
    ;
    Ia.prototype.Aaf = function(e) {
        this.kma && this.kma(e)
    }
    ;
    Ia.prototype.Baf = function(e) {
        this.oGa && this.oGa(e)
    }
    ;
    Ia.prototype.$td = function(e) {
        this.oya && this.oya(e)
    }
    ;
    Ia.prototype.Faf = function(e, f) {
        this.lma && this.lma(e, f)
    }
    ;
    Ia.prototype.Gaf = function() {
        this.vua && this.vua()
    }
    ;
    Ia.prototype.ztc = function(e, f) {
        this.B2 && this.B2(e, f)
    }
    ;
    Ia.prototype.Qaf = function(e) {
        this.xGa && this.xGa(e)
    }
    ;
    Ia.prototype.zaf = function() {
        this.nya && this.nya()
    }
    ;
    Ia.prototype.taf = function(e) {
        this.Zra && this.Zra(e)
    }
    ;
    Ia.prototype.aud = function(e) {
        this.vGa && this.vGa(e)
    }
    ;
    Ia.prototype.bud = function(e) {
        this.wGa && this.wGa(e)
    }
    ;
    Ia.prototype.Laf = function(e, f, y) {
        this.wua && this.wua(e, f, y)
    }
    ;
    Ia.prototype.Paf = function(e, f) {
        this.pya && this.pya(e, f)
    }
    ;
    Ia.prototype.waf = function(e) {
        this.U2a && this.U2a(e)
    }
    ;
    Ia.prototype.cud = function() {
        this.$ra && this.$ra()
    }
    ;
    Ia.prototype.Kaf = function(e) {
        this.sGa && this.sGa(e)
    }
    ;
    Ia.prototype.vaf = function(e) {
        this.BQa && this.BQa(e)
    }
    ;
    Ia.prototype.yaf = function() {
        this.nGa && this.nGa()
    }
    ;
    Ia.prototype.Daf = function(e) {
        this.pGa && this.pGa(e)
    }
    ;
    Ia.prototype.Eaf = function(e) {
        this.CQa && this.CQa(e)
    }
    ;
    Va.prototype.VHc = function() {
        return "" != this.EZa
    }
    ;
    Va.prototype.Q3a = function(e) {
        this.EZa = e
    }
    ;
    Va.prototype.I0a = function() {
        return this.BI
    }
    ;
    Va.prototype.A_a = function() {
        return Ab.SUa === this.BI || Ab.uQb === this.BI || Ab.odc === this.BI
    }
    ;
    Va.prototype.qbc = function() {
        return this.qvb
    }
    ;
    Va.prototype.oXb = function() {
        return this.wTb
    }
    ;
    Va.prototype.tFa = function() {
        return this.dIc || this.Z1b
    }
    ;
    Va.prototype.mSa = function() {
        return this.ENa
    }
    ;
    Va.prototype.yqc = function() {
        for (var e, f = 0, y = this.yTb.length; f < y; ++f)
            e = this.yTb[f],
            this.iUb(e.eUe, e.rNa);
        this.yTb = []
    }
    ;
    Va.prototype.iUb = function(e, y) {
        if (Ab.uQb === this.BI || Ab.odc === this.BI)
            this.yTb.push(new $a(e,y));
        else {
            for (var Xa = this, Ta = 0, Ia = e ? e.length : 0, Va = !1, Ma = null; Ta < Ia; ++Ta)
                if (Ma = this.xNa || this.BZa ? e[Ta].guid : e[Ta],
                this.AI[Ma] && 0 !== this.AI[Ma].state) {
                    Va = !0;
                    break
                }
            0 === Ia && (Va = !0);
            Ma = this.xNa || this.BZa ? e[0].guid : e[0];
            Va ? f.setTimeout(function() {
                y && y({
                    error: Ma + "-lock"
                })
            }, 100) : this.Ncb.hasOwnProperty(Ma) || (this.AI[Ma] = {
                state: 1
            },
            y && (this.yNa[Ma] = y,
            this.Ncb[Ma] = f.setTimeout(function() {
                Xa.yNa.hasOwnProperty(Ma) && (Xa.yNa[Ma]({
                    error: "Timed out"
                }),
                delete Xa.yNa[Ma],
                delete Xa.Ncb[Ma])
            }, this.bvc)),
            this.UV({
                type: "getLock",
                block: e
            }))
        }
    }
    ;
    Va.prototype.G7a = function(e) {
        if (!this.jEa[this.jEa.length - 1])
            if (null !== this.bRa && clearTimeout(this.bRa),
            Ab.SUa !== this.BI)
                this.bRa = f.setTimeout(function() {
                    e && e({
                        error: "No connection"
                    })
                }, 100);
            else {
                if (e) {
                    var y = this
                      , Xa = this.jEa.length;
                    this.jEa[Xa] = e;
                    this.bRa = f.setTimeout(function() {
                        y.bRa = null;
                        var e = y.jEa[Xa];
                        e && (y.jEa[Xa] = null,
                        e({
                            error: "Timed out"
                        }),
                        y.BI = Ab.SUa,
                        y.yqc())
                    }, this.bvc)
                }
                this.BI = Ab.odc;
                this.UV({
                    type: "isSaveLock"
                })
            }
    }
    ;
    Va.prototype.I5b = function() {
        var e = this;
        this.jEb = f.setTimeout(function() {
            e.jEb = null;
            e.I5b()
        }, this.bvc);
        this.UV({
            type: "unSaveLock"
        })
    }
    ;
    Va.prototype.mLc = function(e) {
        this.AI[e] && 2 === this.AI[e].state && (this.AI[e] = {
            state: 0
        })
    }
    ;
    Va.prototype.Xpd = function(f) {
        this.C8a(this.$qc, this.pxb, e, e, f)
    }
    ;
    Va.prototype.C8a = function(e, y, Ta, Ia, Va) {
        null === y ? (this.deleteIndex = Ta,
        null != this.deleteIndex && -1 !== this.deleteIndex && (this.deleteIndex += this.Wwb),
        this.pxb = 0,
        this.$qc = e,
        this.dvc = Ia) : this.pxb = y;
        y = Ta = this.pxb;
        for (Ia = 0; Ta < e.length && Ia < this.RMd; ++Ta)
            Ia += e[Ta].length + 9;
        this.Evd = Ta;
        if (Ta === e.length)
            for (var Xa in this.AI)
                this.AI.hasOwnProperty(Xa) && 2 === this.AI[Xa].state && delete this.AI[Xa];
        var Ma = this;
        this.osa = f.setTimeout(function() {
            Ma.osa = null;
            Ma.Xpd(1)
        }, this.Pff);
        this.BI = Ab.uQb;
        this.UV({
            type: "saveChanges",
            changes: JSON.stringify(e.slice(y, Ta)),
            startSaveChanges: 0 === y,
            endSaveChanges: Ta === e.length,
            isCoAuthoring: this.Xgb,
            isExcel: this.xNa,
            deleteIndex: this.deleteIndex,
            excelAdditionalInfo: this.dvc ? JSON.stringify(this.dvc) : null,
            unlock: this.d_,
            releaseLocks: this.dVb,
            reSave: Va
        })
    }
    ;
    Va.prototype.Wjb = function(e, f) {
        this.deleteIndex = f;
        null != this.deleteIndex && -1 !== this.deleteIndex && (this.deleteIndex += this.Wwb);
        this.UV({
            type: "unLockDocument",
            isSave: e,
            unlock: this.d_,
            deleteIndex: this.deleteIndex,
            releaseLocks: this.dVb
        })
    }
    ;
    Va.prototype.lwc = function() {
        this.Yra && this.Yra(this.Qwa, this.ENa)
    }
    ;
    Va.prototype.disconnect = function(e, f) {
        this.VPa = !0;
        e ? this.Dsa.close(e, f) : (this.UV({
            type: "close"
        }),
        this.BI = Ab.g3c)
    }
    ;
    Va.prototype.fvc = function(e) {
        this.UV({
            type: "extendSession",
            idletime: e
        })
    }
    ;
    Va.prototype.JNc = function(e) {
        this.UV({
            type: "versionHistory",
            cmd: e
        })
    }
    ;
    Va.prototype.j0a = function() {
        var e = !1
          , f = Math.max(this.fIc, this.cDd);
        this.xTb < f && (this.xTb = f,
        this.UV({
            type: "forceSaveStart"
        }),
        e = !0);
        return e
    }
    ;
    Va.prototype.V2a = function(e) {
        this.UV({
            type: "openDocument",
            message: e
        })
    }
    ;
    Va.prototype.Vvc = function() {
        this.UV({
            type: "getMessages"
        })
    }
    ;
    Va.prototype.HLc = function(e) {
        "string" === typeof e && this.UV({
            type: "message",
            message: e
        })
    }
    ;
    Va.prototype.C9b = function(e) {
        "string" === typeof e && this.UV({
            type: "cursor",
            cursor: e
        })
    }
    ;
    Va.prototype.$Ga = function(e) {
        "string" === typeof e && this.UV({
            type: "changesError",
            stack: e
        })
    }
    ;
    Va.prototype.cod = function() {
        for (var e = 0; e < this.zTb.length; ++e)
            this.zTb[e]();
        this.zTb = []
    }
    ;
    Va.prototype.qYe = function() {
        for (var e = 0; e < this.tvb.length; e++)
            this.rYe(this.tvb[e]);
        this.tvb = []
    }
    ;
    Va.prototype.UV = function(e, f) {
        !f && e && "saveChanges" == e.type && y.WD && y.WD.e8() ? y.WD.CUa(this, e, y.Yoa.n$a) : null !== e && "object" === typeof e && (0 < this.BI ? this.Dsa.send(JSON.stringify(e)) : this.tvb.push(JSON.stringify(e)))
    }
    ;
    Va.prototype.rYe = function(e) {
        null !== e && "string" === typeof e && (0 < this.BI ? this.Dsa.send(e) : this.tvb.push(e))
    }
    ;
    Va.prototype.iqc = function(e, f) {
        this.A_a() && e.messages && this.qGa && this.qGa(e.messages, f)
    }
    ;
    Va.prototype.sXe = function(e) {
        this.tGa && this.tGa(e.buildVersion, e.buildNumber)
    }
    ;
    Va.prototype.dXe = function(e) {
        this.A_a() && e.messages && this.zIa && this.zIa(e.messages)
    }
    ;
    Va.prototype.lXe = function(e) {
        e.messages && this.rGa && this.rGa(e.messages)
    }
    ;
    Va.prototype.tXe = function(e) {
        this.A_a() && e.messages && this.uGa && this.uGa(e.messages)
    }
    ;
    Va.prototype.fXe = function(e) {
        this.mGa && this.mGa(e)
    }
    ;
    Va.prototype.iXe = function() {
        this.oGa && this.oGa()
    }
    ;
    Va.prototype.Kpd = function(f) {
        this.Z1b = e;
        f && (this.dIc = f)
    }
    ;
    Va.prototype.hXe = function(e) {
        var f = e.code;
        f === Ta.pXa ? (this.xTb = e.time,
        this.kma({
            type: ob.UF,
            start: !0
        })) : f === Ta.ute ? this.kma({
            type: ob.UF,
            gzf: !0
        }) : this.xGa(ib.Gk.pg.QN)
    }
    ;
    Va.prototype.gXe = function(e) {
        var f = e.type;
        ob.UF === f ? this.xTb == e.time && this.kma({
            type: f,
            success: e.success
        }) : e.start ? (this.kma({
            type: f,
            start: !0
        }),
        this.vpd = e.time) : this.vpd == e.time && this.kma({
            type: f,
            success: e.success
        })
    }
    ;
    Va.prototype.hqc = function(e) {
        if (this.A_a() && e.locks)
            for (var f in e.locks)
                if (e.locks.hasOwnProperty(f)) {
                    var y = e.locks[f]
                      , Xa = this.xNa || this.BZa ? y.block.guid : f
                      , Ta = this.xNa || this.BZa ? y.block : f;
                    if (null !== y) {
                        var Ia = !0;
                        this.AI[Xa] && 1 !== this.AI[Xa].state && (Ia = !(this.AI[Xa].state === (y.user === this.ENa ? 2 : 3) && this.AI[Xa].user === y.user && this.AI[Xa].time === y.time && this.AI[Xa].block === Xa));
                        Ia && (this.AI[Xa] = {
                            state: y.user === this.ENa ? 2 : 3,
                            user: y.user,
                            time: y.time,
                            block: Xa,
                            blockValue: Ta
                        });
                        if (this.yNa.hasOwnProperty(Xa)) {
                            if (y.user === this.ENa)
                                this.yNa[Xa]({
                                    lock: this.AI[Xa]
                                });
                            else
                                this.yNa[Xa]({
                                    error: "Already locked by " + y.user
                                });
                            this.Ncb.hasOwnProperty(Xa) && (clearTimeout(this.Ncb[Xa]),
                            delete this.Ncb[Xa]);
                            delete this.yNa[Xa]
                        }
                        this.oya && Ia && this.oya(this.AI[Xa])
                    }
                }
    }
    ;
    Va.prototype.mXe = function(e) {
        if (this.A_a() && e.locks) {
            var f = !1, y;
            for (y in e.locks)
                if (e.locks.hasOwnProperty(y)) {
                    var Xa = e.locks[y]
                      , Ta = this.xNa || this.BZa ? Xa.block.guid : Xa.block;
                    null !== Xa && (this.AI[Ta] = {
                        state: 0,
                        user: Xa.user,
                        time: Xa.time,
                        changes: Xa.changes,
                        block: Xa.block
                    },
                    this.lma && (this.lma(this.AI[Ta], !1),
                    f = !0))
                }
            f && this.vua && this.vua()
        }
    }
    ;
    Va.prototype.BVe = function(e) {
        this.BQa(e)
    }
    ;
    Va.prototype.r7b = function(e, f) {
        if (this.A_a()) {
            if (!f && y.WD && y.WD.e8())
                return y.WD.CUa(this, e, y.Yoa.Jqb);
            if (e.locks) {
                f = !1;
                for (var Xa in e.locks)
                    if (e.locks.hasOwnProperty(Xa)) {
                        var Ta = e.locks[Xa]
                          , Ia = this.xNa || this.BZa ? Ta.block.guid : Ta.block;
                        null !== Ta && (this.AI[Ia] = {
                            state: 0,
                            user: Ta.user,
                            time: Ta.time,
                            changes: Ta.changes,
                            block: Ta.block
                        },
                        this.lma && (this.lma(this.AI[Ia], !0),
                        f = !0))
                    }
                f && this.vua && this.vua()
            }
            this.Hqc(e.changes, e.changesIndex, !1);
            this.sGa && this.sGa(e.excelAdditionalInfo)
        } else
            this.oXb() || this.jTb.push(e)
    }
    ;
    Va.prototype.Npd = function(e, f) {
        f && !1 === this.Xgb && !this.pya && this.$Ga("Error: connection state changed waitAuth;this.onStartCoAuthoring:" + !!this.pya);
        !1 === this.Xgb ? (this.Xgb = !0,
        this.pya && this.pya(e, f)) : f && (this.d_ = !0,
        this.Wjb(!1))
    }
    ;
    Va.prototype.Fpd = function(e) {
        !0 === this.Xgb && (this.Xgb = !1,
        this.U2a && this.U2a(e))
    }
    ;
    Va.prototype.nXe = function(e) {
        if (null != e.saveLock) {
            var f = this.jEa.length - 1
              , y = this.jEa[f];
            y && (null !== this.bRa && (clearTimeout(this.bRa),
            this.bRa = null),
            this.jEa[f] = null,
            y(e))
        }
        if (null == e.saveLock || e.error || e.saveLock)
            this.BI = Ab.SUa,
            this.yqc()
    }
    ;
    Va.prototype.zXe = function(e) {
        null !== this.osa && (clearTimeout(this.osa),
        this.osa = null);
        null !== this.jEb && (clearTimeout(this.jEb),
        this.jEb = null);
        this.BI = Ab.SUa;
        this.yqc();
        -1 !== e.index && (this.Wwb = e.index);
        -1 !== e.time && (this.cDd = e.time);
        this.$ra && this.$ra()
    }
    ;
    Va.prototype.Hqc = function(e, f, y) {
        if (this.wua && (this.Wwb = f,
        e))
            for (f = 0; f < e.length; ++f) {
                var Xa = e[f]
                  , Ta = Xa.change;
                Ta && (Xa.user !== this.ENa && (this.fIc = Xa.time),
                this.wua(JSON.parse(Ta), Xa.useridoriginal, y))
            }
    }
    ;
    Va.prototype.uXe = function(e) {
        this.vGa && this.vGa(e)
    }
    ;
    Va.prototype.xXe = function(e) {
        this.wGa && this.wGa(e)
    }
    ;
    Va.prototype.oXe = function(e) {
        null !== this.osa && (clearTimeout(this.osa),
        this.osa = null);
        -1 !== e.changesIndex && (this.Wwb = e.changesIndex);
        this.C8a(this.$qc, this.Evd)
    }
    ;
    Va.prototype.Jpd = function(e, f) {
        var Xa = {}, Ta = 0, Ia = 0, Va, Ma = [];
        if (e)
            for (Va = 0; Va < e.length; ++Va) {
                var cb = new y.QTb(e[Va]);
                Xa[cb.sE()] = cb;
                cb.yrd() || ++Ta;
                ++Ia
            }
        if (f) {
            for (Va in Xa)
                this.Qwa[Va] || (cb = Xa[Va],
                cb.HKd(!0),
                Ma.push(cb));
            for (Va in this.Qwa)
                Xa[Va] || (cb = this.Qwa[Va],
                cb.HKd(!1),
                Ma.push(cb))
        }
        this.Qwa = Xa;
        this.Hcb = Ta;
        return Ma
    }
    ;
    Va.prototype.Cpd = function(e) {
        this.Qwa = {};
        this.Hcb = 0;
        e && (this.Jpd(e),
        this.Yra && this.Yra(this.Qwa, this.ENa),
        1 < this.Hcb ? this.Npd(!0) : this.Fpd(!0))
    }
    ;
    Va.prototype.Dpd = function(e) {
        var f = this;
        if (this.A_a()) {
            var y = e.waitAuth;
            if (y && (!this.Zra || this.Rcb && !(this.Rcb <= e.participantsTimestamp))) {
                var Xa = "Error: connection state changed waitAuth;onConnectionStateChanged:" + !!this.Zra + ";this._participantsTimestamp:" + this.Rcb + ";data.participantsTimestamp:" + e.participantsTimestamp;
                this.$Ga(Xa)
            }
            if (this.Zra && (!this.Rcb || this.Rcb <= e.participantsTimestamp)) {
                this.Rcb = e.participantsTimestamp;
                var Ta = this.Jpd(e.participants, !0);
                !y || 0 < Ta.length && 1 < this.Hcb || (Xa = "Error: connection state changed waitAuth;usersStateChanged:" + JSON.stringify(Ta) + ";this._countEditUsers:" + this.Hcb,
                this.$Ga(Xa));
                if (0 < Ta.length)
                    for (1 < this.Hcb ? this.Npd(!1, y) : this.Fpd(!1),
                    this.DQa(this.Qwa),
                    y = 0; y < Ta.length; ++y)
                        this.Zra(Ta[y])
            }
        } else
            this.zTb.push(function() {
                f.Dpd(e)
            })
    }
    ;
    Va.prototype.Hpd = function(e) {
        this.CQa(e.licenseType)
    }
    ;
    Va.prototype.Epd = function(e) {
        this.disconnect();
        this.B2(e ? e.description : "", e && e.code || kb.Zuc)
    }
    ;
    Va.prototype.CXe = function() {
        this.xGa(ib.Gk.pg.k7b)
    }
    ;
    Va.prototype.kXe = function(e) {
        this.HCd || (this.HCd = !0,
        this.pGa(e.license))
    }
    ;
    Va.prototype.$We = function(e) {
        var y = this;
        this.Kpd(e.jwt);
        if (!0 === this.wTb) {
            if (this.BI = Ab.SUa,
            !this.VPa && (this.sXe(e),
            this.Hpd(e),
            this.Cpd(e.participants),
            this.iqc(e, !0),
            this.hqc(e),
            this.cod(),
            this.eqc)) {
                this.eqc = !1;
                var Ta = function(e) {
                    !1 === e.saveLock ? y.Xpd(2) : setTimeout(function() {
                        y.G7a(Ta)
                    }, 1E3)
                };
                this.G7a(Ta)
            }
        } else if (1 === e.result) {
            this.wTb = !0;
            this.BI = Ab.SUa;
            this.npd = e.sessionId;
            this.qvb = e.indexUser;
            this.ENa = this.Wcb.sE() + this.qvb;
            this.eqd = e.sessionTimeConnect;
            e.settings && (e.settings.reconnection && (this.aEd = e.settings.reconnection.attempts,
            this.vId = e.settings.reconnection.delay),
            e.settings.websocketMaxPayloadSize && (this.RMd = e.settings.websocketMaxPayloadSize));
            this.Hpd(e);
            this.Cpd(e.participants);
            this.xXe(e.g_cAscSpellCheckUrl);
            this.uXe(this.qvb);
            this.iqc(e, !1);
            this.hqc(e);
            e.hasForgotten && this.iXe();
            if (f.AscApplyChanges && f.AscChanges) {
                e = f.AscChanges;
                for (var Xa, Ia = 0; Ia < e.length; ++Ia) {
                    Xa = e[Ia];
                    for (var Va = 0; Va < Xa.length; ++Va)
                        this.wua(Xa[Va], null, !0)
                }
            }
            this.LYe();
            this.nya && this.nya();
            this.cod();
            this.qYe()
        }
    }
    ;
    Va.prototype.aXe = function(e) {
        this.iTb.push(e.changes)
    }
    ;
    Va.prototype.LYe = function() {
        var e = 0, f;
        for (f = 0; f < this.iTb.length; ++f) {
            var y = this.iTb[f];
            e += y.length;
            this.Hqc(y, e, !0)
        }
        this.iTb = [];
        for (f = 0; f < this.jTb.length; ++f) {
            y = this.jTb[f];
            var Ta = y.changesIndex - e;
            0 < Ta && (y = Ta >= y.changes.length ? y.changes : y.changes.splice(y.changes.length - Ta, Ta),
            e += y.length,
            this.Hqc(y, e, !0))
        }
        this.jTb = []
    }
    ;
    Va.prototype.te = function(e, f, y, Ta, Ia, Va, Ma) {
        this.Wcb = e;
        this.kvb = null;
        this.Iod = y;
        this.qqd = Ta;
        this.k3b = [];
        this.ODb = null;
        this.owd = Ia;
        this.xNa = Sb.NK === Ia;
        this.BZa = Sb.$y === Ia;
        this.wTb = !1;
        this.Jod = Va;
        this.mode = Ma.qkf();
        this.permissions = Ma.tkf();
        this.lang = Ma.efb();
        this.Z1b = Ma.Rkf();
        this.twd = Ma.wwc();
        this.K4b(f);
        this.rpd()
    }
    ;
    Va.prototype.Ovc = function() {
        return this.kvb
    }
    ;
    Va.prototype.K4b = function(e) {
        this.kvb = e;
        this.ODb = y.rxd() + "../../../../doc/" + e + "/c"
    }
    ;
    Va.prototype.jUb = function(e, f, y) {
        this.upd = e;
        if (this.AI) {
            this.k3b = [];
            for (var Ta in this.AI)
                this.AI.hasOwnProperty(Ta) && (e = this.AI[Ta],
                2 === e.state && this.k3b.push(e.blockValue));
            this.AI = {}
        }
        this.UV({
            type: "auth",
            docid: this.kvb,
            documentCallbackUrl: this.Iod,
            token: this.qqd,
            user: {
                id: this.Wcb.sE(),
                username: this.Wcb.YAa(),
                firstname: this.Wcb.TTb(),
                lastname: this.Wcb.WTb(),
                indexUser: this.qvb
            },
            editorType: this.owd,
            lastOtherSaveTime: this.fIc,
            block: this.k3b,
            sessionId: this.npd,
            sessionTimeConnect: this.eqd,
            sessionTimeIdle: 0 <= y ? y : 0,
            documentFormatSave: this.Jod,
            view: this.upd,
            isCloseCoAuthoring: this.VPa,
            openCmd: f,
            lang: this.lang,
            mode: this.mode,
            permissions: this.permissions,
            encrypted: this.twd,
            jwtOpen: this.Z1b,
            jwtSession: this.dIc
        })
    }
    ;
    Va.prototype.rpd = function() {
        var e = this;
        if (f.IS_NATIVE_EDITOR) {
            var Ta = this.Dsa = f.SockJS;
            Ta.open()
        } else
            Ta = this.Dsa = new (y.pyd())(this.ODb,null,{
                transports: ["websocket", "xdr-polling", "xhr-polling", "iframe-xhr-polling", "jsonp-polling"]
            }),
            Ta.onopen = function() {
                e.rXe()
            }
            ,
            Ta.onmessage = function(f) {
                e.qXe(f.data)
            }
            ,
            Ta.onclose = function(f) {
                e.pXe(f)
            }
    }
    ;
    Va.prototype.rXe = function() {
        this.x3a && (clearTimeout(this.x3a),
        this.x3a = null,
        this.ysc = 0);
        this.BI = Ab.gMe;
        this.nGa()
    }
    ;
    Va.prototype.qXe = function(e) {
        e = JSON.parse(e);
        switch (e.type) {
        case "auth":
            this.$We(e);
            break;
        case "message":
            this.iqc(e, !1);
            break;
        case "cursor":
            this.dXe(e);
            break;
        case "meta":
            this.lXe(e);
            break;
        case "getLock":
            this.hqc(e);
            break;
        case "releaseLock":
            this.mXe(e);
            break;
        case "connectState":
            this.Dpd(e);
            break;
        case "saveChanges":
            this.r7b(e);
            break;
        case "authChanges":
            this.aXe(e);
            break;
        case "saveLock":
            this.nXe(e);
            break;
        case "unSaveLock":
            this.zXe(e);
            break;
        case "savePartChanges":
            this.oXe(e);
            break;
        case "drop":
            this.Epd(e);
            break;
        case "error":
            this.Epd(e);
            break;
        case "documentOpen":
            this.BVe(e);
            break;
        case "warning":
            this.CXe();
            break;
        case "license":
            this.kXe(e);
            break;
        case "session":
            this.tXe(e);
            break;
        case "refreshToken":
            this.Kpd(e.messages);
            break;
        case "expiredToken":
            this.fXe(e);
            break;
        case "forceSaveStart":
            this.hXe(e.messages);
            break;
        case "forceSave":
            this.gXe(e.messages)
        }
    }
    ;
    Va.prototype.pXe = function(e) {
        Ab.uQb === this.BI && (this.eqc = !0,
        null !== this.osa && (clearTimeout(this.osa),
        this.osa = null));
        this.BI = Ab.MCe;
        var f = kb.sJd <= e.code && e.code <= kb.Zuc || this.ysc >= this.aEd
          , y = null;
        f && (this.BI = Ab.f3c,
        y = e.code);
        this.B2 && this.B2(e.reason, y);
        f || this.JYe()
    }
    ;
    Va.prototype.fYe = function() {
        delete this.Dsa;
        this.rpd()
    }
    ;
    Va.prototype.JYe = function() {
        var e = this;
        this.x3a && (clearTimeout(this.x3a),
        e.x3a = null);
        ++this.ysc;
        this.x3a = setTimeout(function() {
            e.fYe()
        }, this.vId)
    }
    ;
    f.AscCommon = f.AscCommon || {};
    f.AscCommon.BNd = Ia
}
)(window);
"use strict";
(function(f) {
    function e() {
        this.iib = this.EQa = this.UEd = this.B2 = null;
        this.BI = 0;
        this.e8 = this.VPa = !1;
        this.languages = null;
        this.Lvd = [];
        this.EZa = ""
    }
    function Ia() {
        this.w5 = new e;
        this.cK = !1;
        this.EQa = this.B2 = null
    }
    function $a(e, Ia) {
        function y() {
            Va && clearTimeout(Va);
            ib++;
            Va = setTimeout(function() {
                delete Ia.Dsa;
                Ia.Dsa = $a(e, Ia)
            }, 500 * ib)
        }
        if (!f.IS_NATIVE_EDITOR) {
            var kb = new (AscCommon.pyd())(e,null,{
                transports: ["websocket", "xdr-polling", "xhr-polling", "iframe-xhr-polling", "jsonp-polling"]
            });
            kb.onopen = function() {
                Va && (clearTimeout(Va),
                ib = 0);
                Ia.BI = 1;
                Ia.UEd && Ia.UEd();
                Ia.oYe()
            }
            ;
            kb.onmessage = function(e) {
                e = JSON.parse(e.data);
                switch (e.type) {
                case "spellCheck":
                    Ia.wXe(e);
                    break;
                case "init":
                    Ia.jXe(e)
                }
            }
            ;
            kb.onclose = function(e) {
                Ia.BI = -1;
                var f = 20 <= ib || Ia.VPa;
                f && (Ia.BI = 3);
                Ia.B2 && Ia.B2(e.reason, f, Ia.VPa);
                Ia.VPa || 20 > ib && y()
            }
            ;
            return kb
        }
    }
    Ia.prototype.te = function(e) {
        if (this.w5 && this.w5.VHc()) {
            var f = this;
            this.w5.B2 = function(e, y, Ta) {
                f.ztc(e, y, Ta)
            }
            ;
            this.w5.EQa = function(e) {
                f.Oaf(e)
            }
            ;
            this.w5.iib = function(e) {
                f.Caf(e)
            }
            ;
            this.w5.te(e);
            this.cK = !0
        }
    }
    ;
    Ia.prototype.Q3a = function(e) {
        this.w5 && this.w5.Q3a(e)
    }
    ;
    Ia.prototype.I0a = function() {
        return this.w5 ? this.w5.I0a() : 0
    }
    ;
    Ia.prototype.disconnect = function() {
        this.w5 && this.cK && this.w5.disconnect()
    }
    ;
    Ia.prototype.Kjb = function(e) {
        this.w5 && this.cK && this.w5.Kjb(e)
    }
    ;
    Ia.prototype.oVb = function(e) {
        return this.w5 && this.cK ? this.w5.oVb(e) : !0
    }
    ;
    Ia.prototype.Oaf = function(e) {
        this.EQa && this.EQa(e)
    }
    ;
    Ia.prototype.Caf = function(e) {
        this.iib && this.iib(e)
    }
    ;
    Ia.prototype.ztc = function(e, f, Ia) {
        this.B2 && this.B2(e, f, Ia)
    }
    ;
    e.prototype.VHc = function() {
        return "" !== this.EZa
    }
    ;
    e.prototype.Q3a = function(e) {
        this.EZa = e
    }
    ;
    e.prototype.I0a = function() {
        return this.BI
    }
    ;
    e.prototype.Kjb = function(e) {
        this.UV({
            type: "spellCheck",
            spellCheckData: e
        })
    }
    ;
    e.prototype.oVb = function(e) {
        return !this.e8 || !!this.languages[e]
    }
    ;
    e.prototype.disconnect = function() {
        this.VPa = !0;
        return this.Dsa.close()
    }
    ;
    e.prototype.UV = function(e) {
        null !== e && "object" === typeof e && (0 < this.BI ? this.Dsa.send(JSON.stringify(e)) : this.Lvd.push(e))
    }
    ;
    e.prototype.oYe = function() {
        for (var e; 0 < this.BI && void 0 !== (e = this.Lvd.shift()); )
            this.UV(e)
    }
    ;
    e.prototype.wXe = function(e) {
        e.spellCheckData && this.EQa && this.EQa(e.spellCheckData)
    }
    ;
    e.prototype.jXe = function(e) {
        !this.e8 && e.languages && (this.iib && this.iib(e.languages),
        this.languages = e.languages.reduce(function(e, f) {
            e[f] = 1;
            return e
        }, {}),
        this.e8 = !0)
    }
    ;
    var Va, ib = 0;
    e.prototype.te = function(e) {
        this.kvb = e;
        e = this.EZa + "/doc/" + e + "/c";
        this.ODb = /^https?:\/\//.test(this.EZa) ? e : AscCommon.rxd() + "../../../.." + e;
        this.Dsa = $a(this.ODb, this)
    }
    ;
    f.AscCommon = f.AscCommon || {};
    f.AscCommon.Jee = Ia
}
)(window);
"use strict";
(function(f, e) {
    function Ia(f, w, y, Ma) {
        var Ra = new kc;
        Ra.type = ud.v8;
        Ra.r = f;
        Ra.vb = w;
        Ra.Xa = y;
        Ra.a = 255;
        Ra.lf = e === Ma ? !1 : Ma;
        return Ra
    }
    function $a(e) {
        if (null == e || null == e.color)
            return new kc;
        var f = new kc;
        f.r = e.RGBA.R;
        f.vb = e.RGBA.G;
        f.Xa = e.RGBA.B;
        f.a = e.RGBA.Bf;
        e = e.color;
        switch (e.type) {
        case ud.Hea:
        case ud.VQ:
            f.type = e.type,
            f.value = e.id
        }
        return f
    }
    function Va() {
        return Math.floor(4294967296 * Math.random())
    }
    function ib(e) {
        e &= 2147483647;
        return 2147483647 !== e ? e : e - 1
    }
    function y() {
        this.id = e;
        this.wHc = this.gca = this.Wca = this.k5b = this.Qz = "";
        this.XKd = !1;
        this.valid = 0;
        this.date = this.image = "";
        this.Y1b = this.ZCd = !1
    }
    function Ab() {
        this.kDd = Ci.Error;
        this.jDd = Xc.kf;
        this.ICd = !1;
        this.QId = lg.kf;
        this.Saf = this.Raf = !0;
        this.UQc = this.dud = !1;
        this.sof = !0;
        this.Sbe = 300;
        this.rof = !1;
        this.btd = this.ctd = null;
        return this
    }
    function Sb() {
        this.ol = this.Zba = this.Qma = this.Iq = this.pq = this.KDb = this.units = this.FOa = this.lK = this.xhb = this.Ugb = this.Xla = this.A2a = this.Rra = this.Rhb = null;
        this.rEa = hh.val
    }
    function kb() {
        this.b2b = this.ol = this.Zba = this.Qma = this.Iq = this.pq = this.a2b = this.I1b = this.E1b = this.F1b = this.G1b = null;
        this.rEa = hh.Mg;
        this.FVb = this.GVb = null
    }
    function Ta() {
        this.e8a = this.H6a = this.tIa = this.separator = this.CG = this.AG = this.BG = this.type = this.qEb = this.tAb = this.w1b = this.R5b = this.MVb = this.SA = this.S5b = this.x1b = this.u4b = this.title = this.style = null;
        this.Eba = [];
        this.W3a = this.V3a = this.qq = this.WV = this.FU = null
    }
    function ob(e, f, w, y) {
        this.rIb = e;
        this.mnb = f;
        this.YPc = w;
        this.bac = y
    }
    function Xa(f, w, y, Ma) {
        this.r = e == f ? 0 : f;
        this.vb = e == w ? 0 : w;
        this.Xa = e == y ? 0 : y;
        this.a = e == Ma ? 1 : Ma
    }
    function kc() {
        this.type = ud.v8;
        this.value = null;
        this.Xa = this.vb = this.r = 0;
        this.a = 255;
        this.lf = !1;
        this.ke = [];
        1 === arguments.length ? (this.r = arguments[0].r,
        this.vb = arguments[0].vb,
        this.Xa = arguments[0].Xa) : (3 <= arguments.length && (this.r = arguments[0],
        this.vb = arguments[1],
        this.Xa = arguments[2]),
        4 === arguments.length && (this.a = arguments[3]))
    }
    function Cc(w) {
        w ? (this.va = w.va instanceof kc ? w.va : e != w.va && null != w.va ? Ia(w.va.r, w.va.vb, w.va.Xa) : null,
        this.xb = e != w.xb ? w.xb : null,
        this.pa = e != w.pa ? w.pa : null,
        this.ic = e != w.ic ? w.ic : null) : (this.va = Ia(0, 0, 0),
        this.xb = .5 * f.AscCommonWord.hxd,
        this.pa = f.AscCommonWord.w$e,
        this.ic = 0)
    }
    function Pb(f) {
        f ? (this.Ba = e != f.Ba && null != f.Ba ? new Cc(f.Ba) : null,
        this.Oa = e != f.Oa && null != f.Oa ? new Cc(f.Oa) : null,
        this.Ra = e != f.Ra && null != f.Ra ? new Cc(f.Ra) : null,
        this.Ta = e != f.Ta && null != f.Ta ? new Cc(f.Ta) : null,
        this.Vi = e != f.Vi && null != f.Vi ? new Cc(f.Vi) : null) : this.Vi = this.Ta = this.Ra = this.Oa = this.Ba = null
    }
    function ic(f) {
        f ? (this.ea = e == f.ea ? null : f.ea,
        this.MC = e == f.ea ? null : f.MC) : this.MC = this.ea = null
    }
    function Bb(f) {
        f ? (this.Ja = e != f.Ja ? f.Ja : null,
        this.za = e != f.za ? f.za : null) : (this.Ja = "Times New Roman",
        this.za = -1)
    }
    function Ma(e, f, w) {
        this.Qa = e;
        this.pa = f;
        this.P_ = w
    }
    function cb(f) {
        this.ug = [];
        if (e != f)
            for (var w = f.ug.length, y = 0; y < w; y++)
                this.ug.push(new Ma(f.ug[y].Qa,f.ug[y].pa,f.ug[y].P_))
    }
    function jb(f) {
        f ? (this.pa = e != f.pa ? f.pa : null,
        this.va = f.ab && f.ab.fill && f.ab.fill.type === Pe.nC && f.ab.fill.color ? $a(f.ab.fill.color) : e != f.va && null != f.va ? Ia(f.va.r, f.va.vb, f.va.Xa) : null) : (this.pa = Wc.FP,
        this.va = Ia(255, 255, 255))
    }
    function Pa(f) {
        f ? (this.Dgc = !1,
        this.HC = f.HC,
        this.Jb = f.Jb,
        this.gH = f.gH,
        this.Xn = f.Xn,
        this.xF = f.xF,
        this.Nb = f.Nb,
        this.oH = f.oH,
        this.fJ = f.fJ,
        this.W = f.W,
        this.KG = f.KG,
        this.ka = f.ka,
        this.wD = f.wD,
        this.la = f.la,
        this.rE = f.rE,
        this.nc = e != f.nc && null != f.nc ? new Pb(f.nc) : null,
        this.Pb = e != f.Pb && null != f.Pb ? new jb(f.Pb) : null,
        this.wf = e != f.wf && null != f.wf ? new Bb(f.wf) : null) : (this.Dgc = !1,
        this.rE = this.la = this.wD = this.ka = this.KG = this.W = this.fJ = this.oH = this.Nb = this.xF = this.Xn = this.gH = this.Jb = this.HC = e,
        this.wf = this.nc = this.Pb = null)
    }
    function Ce(f) {
        f ? (this.qc = e != f.qc ? f.qc : null,
        this.jj = e != f.jj ? f.jj : null,
        this.Ji = e != f.Ji ? f.Ji : null,
        this.kg = e != f.kg ? f.kg : null) : this.kg = this.Ji = this.jj = this.qc = e
    }
    function cf(f) {
        f ? (this.Ba = e != f.Ba ? f.Ba : null,
        this.Ra = e != f.Ra ? f.Ra : null,
        this.Ae = e != f.Ae ? f.Ae : null) : this.Ae = this.Ra = this.Ba = e
    }
    function ef(w) {
        if (w) {
            this.Hp = e != w.Hp ? w.Hp : null;
            this.$b = e != w.$b && null != w.$b ? new cf(w.$b) : null;
            this.Kn = e != w.Kn ? w.Kn : null;
            this.Zn = e != w.Zn ? w.Zn : e;
            this.Op = e != w.Op ? w.Op : e;
            this.Lp = e != w.Lp ? w.Lp : null;
            this.dc = e != w.dc && null != w.dc ? new Ce(w.dc) : null;
            this.nc = e != w.nc && null != w.nc ? new Pb(w.nc) : null;
            this.Pb = e != w.Pb && null != w.Pb ? new jb(w.Pb) : null;
            this.ug = e != w.ug ? new cb(w.ug) : e;
            this.uv = null != w.uv ? w.uv : f.AscCommonWord.BS;
            this.eo = e != w.eo && null != w.eo ? w.eo : !1;
            this.Moa = e != w.Moa ? w.Moa : !0;
            this.vi = e != w.vi ? new Pa(w.vi) : e;
            this.F3 = e != w.F3 ? w.F3 : !1;
            this.iVa = e != w.iVa ? w.iVa : !1;
            this.o0 = e != w.o0 ? w.o0 : e;
            this.n1 = e != w.n1 ? w.n1 : e;
            this.gl = e != w.gl ? w.gl : e;
            this.nU = e != w.nU ? w.nU : e;
            this.fj = e != w.fj ? w.fj : e;
            this.Fj = e != w.Fj ? w.Fj : e;
            this.SU = e != w.SU ? w.SU : e;
            this.we = e != w.we ? w.we : e;
            this.Me = e != w.Me ? w.Me : e;
            this.nab = e != w.nab ? w.nab : e;
            this.Ts = e != w.Ts ? w.Ts : e;
            this.Gpa = e != w.Gpa ? w.Gpa : !1;
            this.yHa = this.Hta = this.cJa = this.Gta = this.VSa = e;
            var y = w.vf;
            if (y) {
                var Ra = w.Qje;
                this.VSa = 100;
                if (y.wr)
                    switch (y.wr.type) {
                    case AscFormat.wpb:
                        this.VSa = y.wr.val / 1E3
                    }
                this.Gta = Ia(0, 0, 0);
                if (y.Fn)
                    y.Fn.nH && (this.Gta = $a(y.Fn.nH));
                else if (Ra && Ra.ab)
                    if (Ra.ab.fill instanceof AscFormat.cH && Ra.ab.fill.color)
                        this.Gta = $a(Ra.ab.fill.color);
                    else {
                        var Ma = Ra.ab.Ht();
                        this.Gta = Ia(Ma.R, Ma.G, Ma.B)
                    }
                else
                    this.Gta = Ia(0, 0, 0);
                this.Hta = "";
                y.zo && y.zo.type === AscFormat.Haa && "string" === typeof y.zo.$O && 0 < y.zo.$O.length ? this.Hta = y.zo.$O : Ra && Ra.wf && "string" === typeof Ra.wf.Ja && 0 < Ra.wf.Ja.length && (this.Hta = Ra.wf.Ja);
                y.Li && (0 < y.Li.$K ? this.cJa = AscFormat.hb(y.Li.WI) ? Math.max(1, y.Li.WI) : null : y.Li.type === AscFormat.Tua && (this.yHa = y.Li.yJ))
            }
            this.w9a = e !== w.w9a ? w.w9a : !0;
            this.y9a = e !== w.y9a ? w.y9a : !0;
            this.x9a = e !== w.x9a ? w.x9a : !0;
            this.z9a = e !== w.z9a ? w.z9a : !0
        } else
            this.Hp = e,
            this.$b = new cf,
            this.Lp = this.Op = this.Zn = this.Kn = e,
            this.dc = new Ce,
            this.Pb = this.nc = e,
            this.eo = !1,
            this.Moa = !0,
            this.Ts = this.nab = this.Me = this.we = this.SU = this.Fj = this.fj = this.nU = this.gl = this.n1 = this.o0 = this.ug = e,
            this.Gpa = !1,
            this.yHa = this.Hta = this.cJa = this.Gta = this.VSa = e,
            this.z9a = this.x9a = this.y9a = this.w9a = !0
    }
    function Ke() {
        this.Ia = 0;
        this.Image = ""
    }
    function mg(f, w, y) {
        this.od = e == f ? 0 : f;
        this.Tc = e == w ? 0 : w;
        this.$pe = y
    }
    function Di(f) {
        f ? (this.Ba = e == f.Ba ? null : f.Ba,
        this.Oa = e == f.Oa ? null : f.Oa,
        this.Ta = e == f.Ta ? null : f.Ta,
        this.Ra = e == f.Ra ? null : f.Ra) : this.Ra = this.Ta = this.Oa = this.Ba = null
    }
    function dh() {
        this.Ny = this.stroke = this.fill = this.type = null;
        this.rQ = !0;
        this.eo = this.Qka = this.Jba = this.VM = !1;
        this.XEa = this.WEa = this.Xf = this.Wf = this.nsa = this.Sd = this.mRa = this.OT = this.columnNumber = this.description = this.title = this.Ut = this.vC = this.IK = this.ci = this.zb = this.lb = null;
        this.RD = e;
        this.anchor = null
    }
    function Je(f) {
        f ? (this.ub = f.ub,
        this.qc = f.qc,
        this.cpa = f.cpa,
        this.ef = f.ef) : this.ef = this.cpa = this.qc = this.ub = e
    }
    function Uc(f) {
        f ? (this.He = e === f.He ? e : f.He,
        this.yq = e === f.yq ? e : f.yq,
        this.Ze = e === f.Ze ? e : f.Ze,
        this.pa = e === f.pa ? e : f.pa,
        this.fh = e === f.fh ? e : f.fh) : this.fh = this.pa = this.Ze = this.yq = this.He = e
    }
    function kd(f) {
        f ? (this.He = e === f.He ? e : f.He,
        this.yq = e === f.yq ? e : f.yq,
        this.Ze = e === f.Ze ? e : f.Ze,
        this.pa = e === f.pa ? e : f.pa,
        this.fh = e === f.fh ? e : f.fh) : this.fh = this.pa = this.Ze = this.yq = this.He = e
    }
    function Ud(f) {
        f ? (this.ka = e == f.ka ? null : f.ka,
        this.la = e == f.la ? null : f.la) : this.la = this.ka = null
    }
    function de(f) {
        f ? (this.G3 = e != f.G3 ? f.G3 : !0,
        this.od = e != f.od ? f.od : e,
        this.Tc = e != f.Tc ? f.Tc : e,
        this.uL = e != f.uL ? f.uL : e,
        this.gw = e != f.gw ? new Di(f.gw) : e,
        this.we = e != f.we ? new Ud(f.we) : e,
        this.Bz = e != f.Bz ? f.Bz : e,
        this.Cf = e != f.Cf ? new Uc(f.Cf) : e,
        this.Ef = e != f.Ef ? new kd(f.Ef) : e,
        this.pz = e != f.pz ? new Uc(f.pz) : e,
        this.qz = e != f.qz ? new kd(f.qz) : e,
        this.Mu = e != f.Mu ? f.Mu : null,
        this.Am = e != f.Am ? f.Am : null,
        this.eo = e != f.eo ? f.eo : !1,
        this.Ut = e != f.Ut ? f.Ut : !1,
        this.AS = e != f.AS ? f.AS : null,
        this.dm = e != f.dm ? f.dm : null,
        this.dva = e != f.dva ? f.dva : null,
        this.Mda = f.Mda != e ? f.Mda : null,
        this.lIa = f.lIa != e ? f.lIa : null,
        this.zsa = f.zsa != e ? f.zsa : !1,
        this.iia = f.iia != e ? f.iia : e,
        this.hia = f.hia != e ? f.hia : e,
        this.IK = f.IK != e ? f.IK : e,
        this.ci = f.ci != e ? f.ci : e,
        this.pAa = f.pAa !== e ? f.pAa : e,
        this.oAa = f.oAa !== e ? f.oAa : e,
        this.nAa = f.nAa != e ? f.nAa : e,
        this.mAa = f.mAa != e ? f.mAa : e,
        this.title = f.title != e ? f.title : e,
        this.description = f.description != e ? f.description : e,
        this.columnNumber = f.columnNumber != e ? f.columnNumber : e,
        this.OT = f.OT != e ? f.OT : e,
        this.RD = f.RD != e ? f.RD : e,
        this.Sd = f.Sd != e ? f.Sd : e,
        this.Wf = f.Wf != e ? f.Wf : e,
        this.Xf = f.Xf != e ? f.Xf : e,
        this.Ylb = f.Ylb != e ? f.Ylb : e,
        this.anchor = f.anchor != e ? f.anchor : e) : (this.G3 = !0,
        this.qz = this.pz = this.Ef = this.Cf = this.we = this.gw = this.uL = this.Tc = this.od = e,
        this.Am = this.Mu = null,
        this.eo = !1,
        this.lIa = this.Mda = this.dva = this.dm = this.AS = null,
        this.zsa = !1,
        this.anchor = this.Ylb = this.Xf = this.Wf = this.nsa = this.Sd = this.OT = this.columnNumber = this.description = this.title = this.mAa = this.nAa = this.oAa = this.pAa = this.ci = this.IK = this.hia = this.iia = e)
    }
    function sb(f, w) {
        this.ea = e != f ? f : null;
        this.pa = e != w ? w : null
    }
    function yb() {
        this.Ui = this.fill = this.type = null
    }
    function Xe() {
        this.type = Le.rQb;
        this.url = "";
        this.eNc = null
    }
    function Zh() {
        this.fo = this.Cn = this.oDa = e
    }
    function oh() {
        this.FXa = this.qVa = e;
        this.zWa = 0;
        this.jXa = e;
        this.kXa = !0;
        this.$jc = 0
    }
    function Xg() {
        this.color = new kc
    }
    function ak() {
        this.jL = this.Ric = this.Oic = this.Pic = this.msb = this.XCa = this.FE = this.color = this.width = this.type = null;
        this.VM = !1
    }
    function Yg() {
        this.be = [];
        this.name = "";
        this.scheme = null;
        this.v5b = 0
    }
    function yc(f) {
        if (f)
            switch (this.ea = e != f.ea ? f.ea : Nd.Ona,
            this.wN = e != f.wN ? f.wN : 0,
            this.xN = e != f.xN ? f.xN : 0,
            this.ea) {
            case Nd.Ri:
                this.Ri = e != f.Fe ? f.Fe : 0;
                break;
            case Nd.Wsa:
                this.Yl = e != f.Yl ? f.Yl : "";
                this.npa = e != f.npa ? f.npa : !1;
                this.cDa = e != f.cDa ? f.cDa : Wc.c_oAscMouseMoveLockedObjectType.Ona;
                break;
            case Nd.qf:
                this.Text = "",
                this.Number = 1
            }
        else
            this.ea = Nd.Ona,
            this.xN = this.wN = 0
    }
    function Ic(f) {
        f ? (this.Text = e != f.Text ? f.Text : null,
        this.pa = e != f.pa ? f.pa : "",
        this.uA = e != f.uA ? f.uA : "",
        this.Na = e !== f.Na ? f.Na : null,
        this.gr = e !== f.gr ? f.gr : null,
        this.ana = f.ana ? f.ana : null) : (this.Text = null,
        this.uA = this.pa = "",
        this.ana = this.gr = this.Na = null)
    }
    function Vb() {
        this.wad = this.P6c = this.s7c = this.Ia = null
    }
    function ji() {
        this.Uf = this.Permissions = this.qo = this.Kkd = this.d2c = this.Vcd = this.Ewa = this.boc = this.iSb = this.Ck = this.FW = this.R_ = this.Ia = null;
        this.MRa = !1;
        this.d6c;
        this.e6c
    }
    function Zg() {
        this.ea = Wc.OH.NRa;
        this.m6b = this.yUc = this.mMb = this.e7c = 0
    }
    function qc() {
        this.pa = 0
    }
    function tn() {
        this.la = this.ka = this.Ia = 0
    }
    function Hd() {
        this.Ia = 0;
        this.ob = [];
        this.Jb = this.W = 0
    }
    function If(e, f, w, y) {
        this.name = e;
        this.displayName = null;
        this.type = f;
        this.image = w;
        this.aP = y
    }
    function Sk(e, f, w, y, Ma) {
        this.Tl = e;
        this.$t = f;
        this.Gwa = w;
        this.RW = y;
        this.Element = Ma
    }
    function be() {
        this.Nqa = this.url = this.description = "";
        this.index = 0;
        this.h4 = ["1x", "2x"];
        this.MAb = !1;
        this.$Va = ["word", "cell", "slide"];
        this.EAb = this.HAb = this.JAb = this.jhb = this.HI = !1;
        this.initDataType = xc.hs;
        this.initData = "";
        this.ihb = !1;
        this.buttons = [{
            text: "Ok",
            primary: !0
        }, {
            text: "Cancel",
            primary: !1
        }];
        this.Tgb = this.size = e;
        this.kla = [];
        this.cvc = {}
    }
    function Lf() {
        this.Nqa = this.Qz = this.name = "";
        this.RQ = []
    }
    var Wc = f.Asc
      , Ef = f.AscCommon
      , Nd = Ef.kga
      , ud = Wc.caa
      , Pe = Wc.Iy
      , Le = Wc.Itd
      , gc = Wc.Mk
      , Oh = Wc.Qba
      , hh = Wc.Etd
      , Ci = {
        Error: 1,
        Cje: 2,
        SIe: 3,
        uLe: 4,
        VLb: 5,
        Dje: 6,
        TIe: 7,
        ZLe: 8,
        Nge: 9,
        $Le: 10
    }
      , lg = {
        kf: 0,
        pje: 1,
        yDe: 2,
        Comment: 3,
        Aub: 4
    }
      , Xc = {
        kf: 0,
        mLe: 1,
        Rie: 2
    }
      , xc = {
        hs: "none",
        text: "text",
        vrf: "ole",
        html: "html",
        tff: "desktop"
    };
    y.prototype.sE = function() {
        return this.id
    }
    ;
    y.prototype.P8e = function(e) {
        this.id = e
    }
    ;
    y.prototype.ITa = function() {
        return this.Qz
    }
    ;
    y.prototype.M8e = function(e) {
        this.Qz = e
    }
    ;
    y.prototype.Frc = function() {
        return this.k5b
    }
    ;
    y.prototype.I9e = function(e) {
        this.k5b = e
    }
    ;
    y.prototype.Grc = function() {
        return this.Wca
    }
    ;
    y.prototype.J9e = function(e) {
        this.Wca = e
    }
    ;
    y.prototype.orc = function() {
        return this.gca
    }
    ;
    y.prototype.D8e = function(e) {
        this.gca = e
    }
    ;
    y.prototype.g2e = function() {
        return this.wHc
    }
    ;
    y.prototype.R8e = function(e) {
        this.wHc = e
    }
    ;
    y.prototype.s4e = function() {
        return this.XKd
    }
    ;
    y.prototype.F9e = function(e) {
        this.XKd = e
    }
    ;
    y.prototype.i5e = function() {
        return this.valid
    }
    ;
    y.prototype.N9e = function(e) {
        this.valid = e
    }
    ;
    y.prototype.b1e = function() {
        return this.date
    }
    ;
    y.prototype.s8e = function(e) {
        this.date = e
    }
    ;
    y.prototype.uRd = function() {
        return this.ZCd
    }
    ;
    y.prototype.vWc = function(e) {
        this.ZCd = e
    }
    ;
    y.prototype.d4e = function() {
        return this.Y1b
    }
    ;
    y.prototype.y9e = function(e) {
        this.Y1b = e
    }
    ;
    Ab.prototype.N2e = function() {
        return this.kDd
    }
    ;
    Ab.prototype.h0e = function() {
        return this.Raf
    }
    ;
    Ab.prototype.j0e = function() {
        return this.Saf
    }
    ;
    Ab.prototype.g0e = function() {
        return this.dud
    }
    ;
    Ab.prototype.Y0e = function() {
        return this.UQc
    }
    ;
    Ab.prototype.k2e = function() {
        return this.sof
    }
    ;
    Ab.prototype.O_e = function() {
        return this.Sbe
    }
    ;
    Ab.prototype.h2e = function() {
        return this.rof
    }
    ;
    Ab.prototype.v2e = function() {
        return this.ICd
    }
    ;
    Ab.prototype.M2e = function() {
        return this.jDd
    }
    ;
    Ab.prototype.h4e = function() {
        return this.QId
    }
    ;
    Ab.prototype.V_e = function() {
        return this.ctd
    }
    ;
    Ab.prototype.U_e = function() {
        return this.btd
    }
    ;
    Ab.prototype.cKd = function(e) {
        this.kDd = e
    }
    ;
    Ab.prototype.oAf = function(e) {
        this.dud = e
    }
    ;
    Ab.prototype.tAf = function(e) {
        this.UQc = e
    }
    ;
    Ab.prototype.QAf = function(e) {
        this.ICd = e
    }
    ;
    Ab.prototype.WAf = function(e) {
        this.jDd = e
    }
    ;
    Ab.prototype.jBf = function(e) {
        this.QId = e
    }
    ;
    Ab.prototype.mAf = function(e) {
        this.ctd = e
    }
    ;
    Ab.prototype.lAf = function(e) {
        this.btd = e
    }
    ;
    Sb.prototype = {
        isEqual: function(e) {
            return e && this.Rhb === e.Rhb && this.Rra === e.Rra && this.A2a === e.A2a && this.Xla === e.Xla && this.Ugb === e.Ugb && this.xhb === e.xhb && this.lK === e.lK && this.FOa === e.FOa && this.units === e.units && this.KDb === e.KDb && this.pq === e.pq && this.Iq === e.Iq && this.Qma === e.Qma && this.Zba === e.Zba && this.ol === e.ol && this.rEa === e.rEa ? !0 : !1
        },
        HKc: function(e) {
            this.rEa = e
        },
        jsa: function(e) {
            this.Rhb = e
        },
        RQa: function(e) {
            this.Rra = e
        },
        PGa: function(e) {
            this.A2a = e
        },
        Pib: function(e) {
            this.Xla = e
        },
        JCb: function(e) {
            this.Ugb = e
        },
        IKc: function(e) {
            this.xhb = e
        },
        kHd: function(e) {
            this.lK = e
        },
        lHd: function(e) {
            this.units = e
        },
        KCb: function(e) {
            this.KDb = e
        },
        gha: function(e) {
            this.pq = e
        },
        hha: function(e) {
            this.Iq = e
        },
        iha: function(e) {
            this.Qma = e
        },
        C2: function(e) {
            this.Zba = e
        },
        rma: function(e) {
            this.ol = e
        },
        QQa: function(e) {
            this.FOa = e
        },
        WT: function() {
            return this.rEa
        },
        rhf: function() {
            return this.FOa
        },
        dif: function() {
            return this.Rhb
        },
        cif: function() {
            return this.Rra
        },
        $hf: function() {
            return this.A2a
        },
        Zhf: function() {
            return this.Xla
        },
        Lhf: function() {
            return this.Ugb
        },
        Xhf: function() {
            return this.xhb
        },
        Whf: function() {
            return this.lK
        },
        vyd: function() {
            return this.units
        },
        Eif: function() {
            return this.KDb
        },
        VWb: function() {
            return this.pq
        },
        XWb: function() {
            return this.Iq
        },
        iXb: function() {
            return this.Qma
        },
        OWb: function() {
            return this.Zba
        },
        NWb: function() {
            return this.ol
        },
        QI: function() {
            this.jsa(Wc.Kdb.eu);
            this.PGa(Wc.Kdb.eu);
            this.iha(Wc.yEa.Ix);
            this.JCb(!1);
            this.QQa(Wc.Jwb.hs);
            this.gha(Oh.xB);
            this.hha(Oh.vs);
            this.C2(Wc.o_a.eu)
        }
    };
    kb.prototype = {
        isEqual: function(e) {
            return e && this.G1b === e.G1b && this.F1b === e.F1b && this.E1b === e.E1b && this.I1b === e.I1b && this.a2b === e.a2b && this.pq === e.pq && this.Iq === e.Iq && this.Qma === e.Qma && this.Zba === e.Zba && this.ol === e.ol && this.b2b === e.b2b && this.rEa === e.rEa && this.GVb === e.GVb && this.FVb === e.FVb ? !0 : !1
        },
        Nib: function(e) {
            this.G1b = e
        },
        Mib: function(e) {
            this.F1b = e
        },
        jHd: function(e) {
            this.E1b = e
        },
        X3b: function(e) {
            this.I1b = e
        },
        Oib: function(e) {
            this.a2b = e
        },
        gha: function(e) {
            this.pq = e
        },
        hha: function(e) {
            this.Iq = e
        },
        iha: function(e) {
            this.Qma = e
        },
        C2: function(e) {
            this.Zba = e
        },
        rma: function(e) {
            this.ol = e
        },
        HKc: function(e) {
            this.rEa = e
        },
        isa: function(e) {
            this.b2b = e
        },
        Sxd: function() {
            return this.G1b
        },
        Rxd: function() {
            return this.F1b
        },
        Qxd: function() {
            return this.E1b
        },
        Txd: function() {
            return this.I1b
        },
        Uxd: function() {
            return this.a2b
        },
        VWb: function() {
            return this.pq
        },
        XWb: function() {
            return this.Iq
        },
        iXb: function() {
            return this.Qma
        },
        OWb: function() {
            return this.Zba
        },
        NWb: function() {
            return this.ol
        },
        WT: function() {
            return this.rEa
        },
        Vxd: function() {
            return this.b2b
        },
        khf: function() {
            return this.GVb
        },
        jhf: function() {
            return this.FVb
        },
        iHd: function(e) {
            this.GVb = e
        },
        hHd: function(e) {
            this.FVb = e
        },
        QI: function() {
            this.Mib(Wc.NUb.eu);
            this.isa(Wc.kOa.gOa);
            this.iha(Wc.yEa.Ix);
            this.Oib(100);
            this.gha(Oh.xB);
            this.hha(Oh.vs);
            this.Nib(1);
            this.C2(Wc.o_a.eu)
        }
    };
    Ta.prototype = {
        QEa: function(e, f) {
            return !!e === !!f
        },
        isEqual: function(e) {
            if (!(e && this.style === e.style && this.title === e.title && this.u4b === e.u4b && this.x1b === e.x1b && this.S5b === e.S5b && this.SA === e.SA && this.MVb === e.MVb && this.R5b === e.R5b && this.w1b === e.w1b && this.tAb === e.tAb && this.qEb === e.qEb && this.type === e.type && this.QEa(this.BG, e.BG) && this.QEa(this.AG, e.AG) && this.QEa(this.CG, e.CG) && (this.separator === e.separator || " " === this.separator && null == e.separator || " " === e.separator && null == this.separator)))
                return !1;
            if (!this.tIa) {
                if (e.tIa)
                    return !1
            } else if (!this.tIa.isEqual(e.tIa))
                return !1;
            if (!this.H6a) {
                if (e.H6a)
                    return !1
            } else if (!this.H6a.isEqual(e.H6a))
                return !1;
            if (this.Eba.length !== e.Eba.length)
                return !1;
            for (var f = 0; f < this.Eba.length; ++f)
                if (this.Eba[f] !== e.Eba[f])
                    return !1;
            return this.QEa(this.e8a, e.e8a) && this.QEa(this.FU, e.FU) && this.QEa(this.WV, e.WV) && this.QEa(this.qq, e.qq) && this.QEa(this.V3a, e.V3a) && this.QEa(this.W3a, e.W3a) ? !0 : !1
        },
        Qib: function(e) {
            this.FU = e
        },
        Cif: function() {
            return this.FU
        },
        r3a: function(e) {
            this.WV = e
        },
        Rhf: function() {
            return this.WV
        },
        Ewf: function(e) {
            Array.isArray(e) ? this.Eba = e : this.Eba.length = 0
        },
        Fwf: function(e) {
            this.Eba.length = 0;
            if (Array.isArray(e))
                for (var f = 0; f < e.length; ++f)
                    this.Eba.push(e[f].oC())
        },
        bXb: function() {
            return this.Eba
        },
        Rib: function(e) {
            this.qq = e
        },
        Jif: function() {
            return this.qq
        },
        MKc: function(e) {
            this.style = parseInt(e, 10)
        },
        r3: function() {
            return this.style
        },
        Wlb: function(e) {
            this.Eba.length = 0;
            this.Eba[0] = e
        },
        tx: function() {
            return 0 < this.Eba.length ? this.Eba[0] : null
        },
        Lib: function(e) {
            this.e8a = e
        },
        Zeb: function() {
            return this.e8a
        },
        Sib: function(e) {
            this.title = e
        },
        nra: function() {
            return this.title
        },
        Gwf: function(e) {
            this.u4b = e
        },
        uif: function() {
            return this.u4b
        },
        ICb: function(e) {
            this.x1b = e
        },
        LCb: function(e) {
            this.S5b = e
        },
        Y3b: function(e) {
            this.SA = e
        },
        HCb: function(e) {
            this.MVb = e
        },
        Dwf: function(e) {
            this.R5b = e
        },
        Hwf: function(e) {
            this.w1b = e
        },
        Nxd: function() {
            return this.x1b
        },
        xyd: function() {
            return this.S5b
        },
        Wxd: function() {
            return this.SA
        },
        Yeb: function() {
            return this.MVb
        },
        Vif: function() {
            return this.R5b
        },
        Ehf: function() {
            return this.w1b
        },
        Kib: function(e) {
            this.tAb = e
        },
        Oxd: function() {
            return this.tAb
        },
        Uib: function(e) {
            this.qEb = e
        },
        yyd: function() {
            return this.qEb
        },
        fm: function() {
            return this.type
        },
        Tib: function(e) {
            return this.type = e
        },
        KKc: function(e) {
            return this.BG = e
        },
        JKc: function(e) {
            return this.AG = e
        },
        LKc: function(e) {
            return this.CG = e
        },
        Dif: function() {
            return this.BG
        },
        Bif: function() {
            return this.AG
        },
        Fif: function() {
            return this.CG
        },
        Z3b: function(e) {
            this.separator = e
        },
        xif: function() {
            return this.separator
        },
        D2: function(e) {
            this.tIa = e
        },
        myb: function() {
            return this.tIa
        },
        s$: function(e) {
            this.H6a = e
        },
        Ayb: function() {
            return this.H6a
        },
        Jud: function(e) {
            var f = this.myb()
              , w = this.Ayb();
            e ? (f ? f.WT() !== hh.val && (w && w.WT() === hh.val ? this.D2(w) : (e = new Sb,
            e.QI(),
            this.D2(e))) : (e = new Sb,
            e.QI(),
            this.D2(e)),
            w ? w.WT() !== hh.Mg && (f && f.WT() === hh.Mg ? this.s$(f) : (f = new kb,
            f.QI(),
            this.s$(f))) : (f = new kb,
            f.QI(),
            this.s$(f))) : (f ? f.WT() !== hh.Mg && (w && w.WT() === hh.Mg ? this.D2(w) : (e = new kb,
            e.QI(),
            this.D2(e))) : (e = new kb,
            e.QI(),
            this.D2(e)),
            w ? w.WT() !== hh.val && (f && f.WT() === hh.val ? this.s$(f) : (f = new Sb,
            f.QI(),
            this.s$(f))) : (f = new Sb,
            f.QI(),
            this.s$(f)))
        },
        mud: function(e) {
            if (null === this.type)
                this.Tib(e);
            else if (this.type !== e) {
                var f = (this.type === gc.lZ || this.type === gc.C0 || this.type === gc.c8 || this.type === gc.mZ || this.type === gc.D0 || this.type === gc.d8) !== (e === gc.lZ || e === gc.C0 || e === gc.c8 || this.type === gc.mZ || this.type === gc.D0 || this.type === gc.d8)
                  , w = (e === gc.h8 || e === gc.rea || e === gc.uoa || e === gc.$Pa || e === gc.aQa || e === gc.shb || e === gc.g8) !== (this.type === gc.h8 || this.type === gc.rea || this.type === gc.uoa || this.type === gc.$Pa || this.type === gc.aQa || this.type === gc.shb || this.type === gc.g8)
                  , y = this.type === gc.H0 !== (e === gc.H0)
                  , Ra = this.type;
                this.Tib(e);
                var Ma = this.myb()
                  , Pa = this.Ayb();
                f && (f = Ma,
                Ma = Pa,
                Pa = f,
                this.D2(Ma),
                this.s$(Pa),
                f = this.tAb,
                this.Kib(this.qEb),
                this.Uib(f));
                switch (e) {
                case gc.Daa:
                case gc.wea:
                case gc.zaa:
                    this.D2(null);
                    this.s$(null);
                    this.ICb(null);
                    this.LCb(null);
                    this.sma(null);
                    this.Bya(null);
                    break;
                case gc.U7:
                case gc.Cia:
                case gc.Dia:
                case gc.eea:
                case gc.fea:
                case gc.doa:
                case gc.V7:
                case gc.h8:
                case gc.rea:
                case gc.uoa:
                case gc.$Pa:
                case gc.aQa:
                case gc.shb:
                case gc.g8:
                case gc.Zda:
                case gc.$da:
                case gc.boa:
                case gc.I6:
                case gc.w5b:
                case gc.x5b:
                case gc.xVb:
                case gc.yVb:
                    this.Jud(!1);
                    w && (this.Qib(!1),
                    this.Rib(null),
                    this.r3a(!0));
                    if (Ra === gc.lZ || Ra === gc.C0 || Ra === gc.c8 || Ra === gc.mZ || Ra === gc.D0 || Ra === gc.d8)
                        y = this.V3a,
                        this.sma(this.W3a),
                        this.Bya(y);
                    else if (Ra === gc.Daa || Ra === gc.wea || Ra === gc.zaa)
                        this.sma(!0),
                        this.Bya(!0);
                    (y = this.myb()) && y.WT() === hh.Mg && (e === gc.Zda || e === gc.$da || e === gc.boa || e === gc.I6 || e === gc.w5b || e === gc.x5b || e === gc.xVb || e === gc.yVb ? y.isa(Wc.kOa.Dwb) : y.isa(Wc.kOa.gOa));
                    break;
                case gc.lZ:
                case gc.C0:
                case gc.c8:
                case gc.mZ:
                case gc.D0:
                case gc.d8:
                    this.Jud(!0);
                    if (Ra === gc.Daa || Ra === gc.wea || Ra === gc.zaa)
                        this.sma(!0),
                        this.Bya(!0);
                    else if (Ra !== gc.lZ && Ra !== gc.C0 && Ra !== gc.c8 || Ra !== gc.mZ || Ra !== gc.D0 || Ra !== gc.d8)
                        y = this.V3a,
                        this.sma(this.W3a),
                        this.Bya(y);
                    (e = this.Ayb()) && e.WT() === hh.Mg && e.isa(Wc.kOa.gOa);
                    break;
                case gc.H0:
                case gc.eDb:
                case gc.v4b:
                case gc.w4b:
                case gc.x4b:
                case gc.fDb:
                case gc.hjb:
                    if (Ma && Ma.WT() === hh.val || (e = new Sb,
                    e.QI(),
                    this.D2(e)),
                    Pa && Pa.WT() === hh.val || (e = new Sb,
                    e.QI(),
                    this.s$(e)),
                    y && (this.Qib(!0),
                    this.Rib(null),
                    this.r3a(!1)),
                    Ra === gc.lZ || Ra === gc.C0 || Ra === gc.c8 || Ra === gc.mZ || Ra === gc.D0 || Ra === gc.d8)
                        y = this.V3a,
                        this.sma(this.W3a),
                        this.Bya(y);
                    else if (Ra === gc.Daa || Ra === gc.wea || Ra === gc.zaa)
                        this.sma(!0),
                        this.Bya(!0)
                }
            }
        },
        sma: function(e) {
            this.V3a = e
        },
        ewc: function() {
            return this.V3a
        },
        Bya: function(e) {
            this.W3a = e
        },
        fwc: function() {
            return this.W3a
        }
    };
    ob.prototype = {
        dwb: function() {
            return this.rIb
        },
        ewb: function() {
            return this.mnb
        },
        cea: function() {
            return this.YPc
        },
        aea: function() {
            return this.bac
        }
    };
    Xa.prototype = {
        constructor: Xa,
        dN: function() {
            return this.r
        },
        rlf: function() {
            return this.r
        },
        Eyf: function(f) {
            this.r = f;
            this.Cla = e
        },
        IY: function() {
            return this.vb
        },
        klf: function() {
            return this.vb
        },
        Dyf: function(f) {
            this.vb = f;
            this.Cla = e
        },
        HY: function() {
            return this.Xa
        },
        flf: function() {
            return this.Xa
        },
        Cyf: function(f) {
            this.Xa = f;
            this.Cla = e
        },
        r0a: function() {
            return this.a
        },
        mlf: function() {
            if (!this.Cla) {
                var e = this.r.toString(16)
                  , f = this.vb.toString(16)
                  , w = this.Xa.toString(16);
                this.Cla = (1 == e.length ? "0" + e : e) + (1 == f.length ? "0" + f : f) + (1 == w.length ? "0" + w : w)
            }
            return this.Cla
        },
        ih: function(e) {
            return this.r === e.r && this.vb === e.vb && this.Xa === e.Xa && this.a === e.a
        },
        Sa: function() {
            return new Xa(this.r,this.vb,this.Xa,this.a)
        },
        Tif: function() {
            return (this.r << 16 & 16711680) + (this.vb << 8 & 65280) + this.Xa
        }
    };
    kc.prototype = {
        constructor: kc,
        cwb: function() {
            return this.r
        },
        fUb: function(f) {
            this.r = f;
            this.Cla = e
        },
        Xvb: function() {
            return this.vb
        },
        cUb: function(f) {
            this.vb = f;
            this.Cla = e
        },
        Vvb: function() {
            return this.Xa
        },
        bUb: function(f) {
            this.Xa = f;
            this.Cla = e
        },
        D_e: function() {
            return this.a
        },
        H7b: function(f) {
            this.a = f;
            this.Cla = e
        },
        Mx: function() {
            return this.type
        },
        Pha: function(e) {
            this.type = e
        },
        TNa: function() {
            return this.value
        },
        SZa: function(e) {
            this.value = e
        },
        ord: function() {
            if (!this.Cla) {
                var e = this.a.toString(16)
                  , f = this.r.toString(16)
                  , w = this.vb.toString(16)
                  , y = this.Xa.toString(16);
                this.Cla = (1 == e.length ? "0" + e : e) + (1 == f.length ? "0" + f : f) + (1 == w.length ? "0" + w : w) + (1 == y.length ? "0" + y : y)
            }
            return this.Cla
        },
        FT: function() {
            return new Xa(this.r,this.vb,this.Xa)
        },
        N5e: function(e) {
            this.lf = e
        },
        M_e: function() {
            return this.lf
        }
    };
    Cc.prototype.FT = function() {
        return this.va
    }
    ;
    Cc.prototype.RZa = function(e) {
        this.va = e
    }
    ;
    Cc.prototype.Hrc = function() {
        return this.xb
    }
    ;
    Cc.prototype.m7e = function(e) {
        this.xb = e
    }
    ;
    Cc.prototype.TNa = function() {
        return this.pa
    }
    ;
    Cc.prototype.SZa = function(e) {
        this.pa = e
    }
    ;
    Cc.prototype.F4e = function() {
        return this.ic
    }
    ;
    Cc.prototype.q7e = function(e) {
        this.ic = e
    }
    ;
    Cc.prototype.D1e = function() {
        return this.w$a
    }
    ;
    Cc.prototype.n6e = function(e) {
        this.w$a = e
    }
    ;
    Pb.prototype = {
        x9: function() {
            return this.Ba
        },
        gwb: function(e) {
            this.Ba = e ? new Cc(e) : null
        },
        z9: function() {
            return this.Oa
        },
        lsc: function(e) {
            this.Oa = e ? new Cc(e) : null
        },
        y9: function() {
            return this.Ra
        },
        hwb: function(e) {
            this.Ra = e ? new Cc(e) : null
        },
        cga: function() {
            return this.Ta
        },
        Trc: function(e) {
            this.Ta = e ? new Cc(e) : null
        },
        R_e: function() {
            return this.Vi
        },
        P5e: function(e) {
            this.Vi = e ? new Cc(e) : null
        }
    };
    ic.prototype.Z2e = function() {
        return this.ea
    }
    ;
    ic.prototype.Y2e = function() {
        return this.MC
    }
    ;
    Bb.prototype = {
        oC: function() {
            return this.Ja
        },
        bea: function() {
            return this.za
        },
        T6e: function(e) {
            this.Ja = e
        },
        C6e: function(e) {
            this.za = e
        }
    };
    Ma.prototype.TNa = function() {
        return this.pa
    }
    ;
    Ma.prototype.SZa = function(e) {
        this.pa = e
    }
    ;
    Ma.prototype.S3e = function() {
        return this.Qa
    }
    ;
    Ma.prototype.c7e = function(e) {
        this.Qa = e
    }
    ;
    Ma.prototype.J2e = function() {
        return Wc.Eia.Lhc === this.P_ ? Wc.Eia.foc : this.P_
    }
    ;
    Ma.prototype.M6e = function(e) {
        this.P_ = e
    }
    ;
    cb.prototype = {
        nrc: function() {
            return this.ug.length
        },
        Q4e: function(e) {
            return this.ug[e]
        },
        p_e: function(e) {
            this.ug.push(e)
        },
        v_e: function() {
            this.ug.length = 0
        }
    };
    jb.prototype = {
        TNa: function() {
            return this.pa
        },
        SZa: function(e) {
            this.pa = e
        },
        FT: function() {
            return this.va
        },
        RZa: function(e) {
            this.va = e ? e : null
        }
    };
    Pa.prototype.m1e = function() {
        return this.HC
    }
    ;
    Pa.prototype.h6e = function(e) {
        this.HC = e
    }
    ;
    Pa.prototype.R1e = function() {
        return this.Jb
    }
    ;
    Pa.prototype.w6e = function(e) {
        this.Jb = e
    }
    ;
    Pa.prototype.S1e = function() {
        return this.gH
    }
    ;
    Pa.prototype.x6e = function(e) {
        this.gH = e
    }
    ;
    Pa.prototype.T1e = function() {
        return this.Xn
    }
    ;
    Pa.prototype.y6e = function(e) {
        this.Xn = e
    }
    ;
    Pa.prototype.U1e = function() {
        return this.xF
    }
    ;
    Pa.prototype.z6e = function(e) {
        this.xF = e
    }
    ;
    Pa.prototype.wrc = function() {
        return this.Nb
    }
    ;
    Pa.prototype.Q6e = function(e) {
        this.Nb = e
    }
    ;
    Pa.prototype.e5e = function() {
        return this.oH
    }
    ;
    Pa.prototype.G7e = function(e) {
        this.oH = e
    }
    ;
    Pa.prototype.g5e = function() {
        return this.fJ
    }
    ;
    Pa.prototype.I7e = function(e) {
        this.fJ = e
    }
    ;
    Pa.prototype.n5e = function() {
        return this.W
    }
    ;
    Pa.prototype.K7e = function(e) {
        this.W = e
    }
    ;
    Pa.prototype.q5e = function() {
        return this.KG
    }
    ;
    Pa.prototype.M7e = function(e) {
        this.KG = e
    }
    ;
    Pa.prototype.dwb = function() {
        return this.ka
    }
    ;
    Pa.prototype.N7e = function(e) {
        this.ka = e
    }
    ;
    Pa.prototype.t5e = function() {
        return this.wD
    }
    ;
    Pa.prototype.O7e = function(e) {
        this.wD = e
    }
    ;
    Pa.prototype.ewb = function() {
        return this.la
    }
    ;
    Pa.prototype.P7e = function(e) {
        this.la = e
    }
    ;
    Pa.prototype.u5e = function() {
        return this.rE
    }
    ;
    Pa.prototype.Q7e = function(e) {
        this.rE = e
    }
    ;
    Pa.prototype.Wvb = function() {
        return this.nc
    }
    ;
    Pa.prototype.Src = function(e) {
        this.nc = e
    }
    ;
    Pa.prototype.Drc = function() {
        return this.Pb
    }
    ;
    Pa.prototype.jsc = function(e) {
        this.Pb = e
    }
    ;
    Pa.prototype.x1e = function() {
        return this.wf
    }
    ;
    Pa.prototype.m6e = function(e) {
        this.wf = e
    }
    ;
    Pa.prototype.q6e = function(e) {
        this.Dgc = e
    }
    ;
    Ce.prototype = {
        XTb: function() {
            return this.qc
        },
        O2e: function() {
            return this.jj
        },
        Q_e: function() {
            return this.Ji
        },
        E_e: function() {
            return this.kg
        },
        eUb: function(e) {
            this.qc = e
        },
        N6e: function(e) {
            this.jj = e
        },
        O5e: function(e) {
            this.Ji = e
        },
        K5e: function(e) {
            this.kg = e
        }
    };
    cf.prototype = {
        x9: function() {
            return this.Ba
        },
        gwb: function(e) {
            this.Ba = e
        },
        y9: function() {
            return this.Ra
        },
        hwb: function(e) {
            this.Ra = e
        },
        v1e: function() {
            return this.Ae
        },
        k6e: function(e) {
            this.Ae = e
        }
    };
    ef.prototype = {
        Q0e: function() {
            return this.Hp
        },
        c6e: function(e) {
            this.Hp = e
        },
        e2e: function() {
            return this.$b
        },
        B6e: function(e) {
            this.$b = e
        },
        z2e: function() {
            return this.Me
        },
        D6e: function(e) {
            this.Me = e
        },
        A2e: function() {
            return this.Kn
        },
        E6e: function(e) {
            this.Kn = e
        },
        B2e: function() {
            return this.Zn
        },
        F6e: function(e) {
            this.Zn = e
        },
        H3e: function() {
            return this.Lp
        },
        X6e: function(e) {
            this.Lp = e
        },
        o5e: function() {
            return this.Op
        },
        L7e: function(e) {
            this.Op = e
        },
        G4e: function() {
            return this.dc
        },
        r7e: function(e) {
            this.dc = e
        },
        Wvb: function() {
            return this.nc
        },
        Src: function(e) {
            this.nc = e
        },
        Drc: function() {
            return this.Pb
        },
        jsc: function(e) {
            this.Pb = e
        },
        QZa: function() {
            return this.eo
        },
        e0e: function() {
            return this.Moa
        },
        Irc: function() {
            return this.o0
        },
        w7e: function(e) {
            this.o0 = e
        },
        Jrc: function() {
            return this.n1
        },
        x7e: function(e) {
            this.n1 = e
        },
        C4e: function() {
            return this.gl
        },
        p7e: function(e) {
            this.gl = e
        },
        F_e: function() {
            return this.nU
        },
        L5e: function(e) {
            this.nU = e
        },
        qac: function() {
            return this.fj
        },
        s7e: function(e) {
            this.fj = e
        },
        Z0e: function() {
            return this.Fj
        },
        f6e: function(e) {
            this.Fj = e
        },
        X4e: function() {
            return this.SU
        },
        B7e: function(e) {
            this.SU = e
        },
        bwb: function() {
            return this.we
        },
        gsc: function(e) {
            this.we = e
        },
        S4e: function() {
            return this.ug
        },
        y7e: function(e) {
            this.ug = e
        },
        d1e: function() {
            return this.uv
        },
        g6e: function(e) {
            this.uv = e
        },
        I1e: function() {
            return this.vi
        },
        p6e: function(e) {
            this.vi = e
        },
        c0e: function() {
            return this.F3
        },
        d0e: function() {
            return this.iVa
        },
        F3e: function() {
            return this.Ts
        },
        W6e: function(e) {
            this.Ts = e
        },
        G3e: function() {
            return this.Gpa
        },
        S5e: function(e) {
            this.VSa = e
        },
        Y_e: function() {
            return this.VSa
        },
        Q5e: function(e) {
            this.Gta = e
        },
        W_e: function() {
            return this.Gta
        },
        U6e: function(e) {
            this.cJa = e
        },
        B3e: function() {
            return this.cJa
        },
        X_e: function() {
            return this.Hta
        },
        R5e: function(e) {
            this.Hta = e
        },
        Z_e: function() {
            return this.yHa
        },
        T5e: function(e) {
            this.yHa = e
        },
        q_e: function() {
            return this.w9a
        },
        s_e: function() {
            return this.y9a
        },
        r_e: function() {
            return this.x9a
        },
        t_e: function() {
            return this.z9a
        }
    };
    Ke.prototype = {
        sE: function() {
            return this.Ia
        },
        vrc: function() {
            return this.Image
        }
    };
    mg.prototype = {
        VTb: function() {
            return this.od
        },
        UTb: function() {
            return this.Tc
        },
        l2e: function() {
            return this.$pe
        }
    };
    Di.prototype = {
        x9: function() {
            return this.Ba
        },
        gwb: function(e) {
            this.Ba = e
        },
        z9: function() {
            return this.Oa
        },
        lsc: function(e) {
            this.Oa = e
        },
        cga: function() {
            return this.Ta
        },
        Trc: function(e) {
            this.Ta = e
        },
        y9: function() {
            return this.Ra
        },
        hwb: function(e) {
            this.Ra = e
        }
    };
    dh.prototype = {
        constructor: dh,
        Mx: function() {
            return this.type
        },
        Pha: function(e) {
            this.type = e
        },
        tJa: function() {
            return this.fill
        },
        JTa: function(e) {
            this.fill = e
        },
        K4e: function() {
            return this.stroke
        },
        t7e: function(e) {
            this.stroke = e
        },
        Arc: function() {
            return this.Ny
        },
        fsc: function(e) {
            this.Ny = e
        },
        i0e: function() {
            return this.rQ
        },
        V5e: function(e) {
            this.rQ = e
        },
        krc: function() {
            return this.VM
        },
        b8e: function(e) {
            this.VM = e
        },
        J1e: function() {
            return this.Jba
        },
        K8e: function(e) {
            this.Jba = e
        },
        QZa: function() {
            return this.eo
        },
        c9e: function(e) {
            this.eo = e
        },
        cea: function() {
            return this.lb
        },
        iwb: function(e) {
            this.lb = e
        },
        aea: function() {
            return this.zb
        },
        $rc: function(e) {
            this.zb = e
        },
        Nrc: function() {
            return this.IK
        },
        nsc: function(e) {
            this.IK = e
        },
        Mrc: function() {
            return this.ci
        },
        msc: function(e) {
            this.ci = e
        },
        W4e: function() {
            return this.vC
        },
        A7e: function(e) {
            this.vC = e
        },
        xrc: function() {
            return this.Ut
        },
        dsc: function(e) {
            this.Ut = e
        },
        Oha: function() {
            return this.title
        },
        UNa: function(e) {
            this.title = e
        },
        bIa: function() {
            return this.description
        },
        fwb: function(e) {
            this.description = e
        },
        lrc: function() {
            return this.columnNumber
        },
        Urc: function(e) {
            this.columnNumber = e
        },
        mrc: function() {
            return this.OT
        },
        Vrc: function(e) {
            this.OT = e
        },
        ZTb: function() {
            return this.mRa
        },
        l7e: function(e) {
            this.mRa = e
        },
        K1e: function() {
            return this.Qka
        },
        r6e: function(e) {
            this.Qka = e
        },
        Brc: function() {
            return this.Sd
        },
        hsc: function(e) {
            this.Sd = e
        },
        Crc: function() {
            return this.nsa
        },
        isc: function(e) {
            this.nsa = e
        },
        prc: function() {
            return this.Wf
        },
        Wrc: function(e) {
            this.Wf = e
        },
        rrc: function() {
            return this.Xf
        },
        Yrc: function(e) {
            this.Xf = e
        },
        qrc: function() {
            return this.WEa
        },
        Xrc: function(e) {
            this.WEa = e
        },
        trc: function() {
            return this.XEa
        },
        Zrc: function(e) {
            this.XEa = e
        },
        Erc: function() {
            return this.RD
        },
        ksc: function(e) {
            this.RD = e
        },
        jrc: function() {
            return this.anchor
        },
        Rrc: function(e) {
            this.anchor = e
        }
    };
    Je.prototype.JTa = function(e) {
        this.ub = e
    }
    ;
    Je.prototype.tJa = function() {
        return this.ub
    }
    ;
    Je.prototype.eUb = function(e) {
        this.qc = e
    }
    ;
    Je.prototype.XTb = function() {
        return this.qc
    }
    ;
    Je.prototype.Erd = function(e) {
        this.cpa = e
    }
    ;
    Je.prototype.mac = function() {
        return this.cpa
    }
    ;
    Je.prototype.u7e = function(e) {
        this.ef = e
    }
    ;
    Je.prototype.$Tb = function() {
        return this.ef
    }
    ;
    Uc.prototype.G0a = function() {
        return this.He
    }
    ;
    Uc.prototype.QGa = function(e) {
        this.He = e
    }
    ;
    Uc.prototype.H0a = function() {
        return this.yq
    }
    ;
    Uc.prototype.WJa = function(e) {
        this.yq = e
    }
    ;
    Uc.prototype.Kga = function() {
        return this.Ze
    }
    ;
    Uc.prototype.kaa = function(e) {
        this.Ze = e
    }
    ;
    Uc.prototype.xQ = function() {
        return this.pa
    }
    ;
    Uc.prototype.kP = function(e) {
        this.pa = e
    }
    ;
    Uc.prototype.Nwc = function() {
        return this.fh
    }
    ;
    Uc.prototype.WKc = function(e) {
        this.fh = e
    }
    ;
    kd.prototype.G0a = function() {
        return this.He
    }
    ;
    kd.prototype.QGa = function(e) {
        this.He = e
    }
    ;
    kd.prototype.H0a = function() {
        return this.yq
    }
    ;
    kd.prototype.WJa = function(e) {
        this.yq = e
    }
    ;
    kd.prototype.Kga = function() {
        return this.Ze
    }
    ;
    kd.prototype.kaa = function(e) {
        this.Ze = e
    }
    ;
    kd.prototype.xQ = function() {
        return this.pa
    }
    ;
    kd.prototype.kP = function(e) {
        this.pa = e
    }
    ;
    kd.prototype.Nwc = function() {
        return this.fh
    }
    ;
    kd.prototype.WKc = function(e) {
        this.fh = e
    }
    ;
    Ud.prototype.rBa = function() {
        return this.ka
    }
    ;
    Ud.prototype.zyf = function(e) {
        this.ka = e
    }
    ;
    Ud.prototype.sBa = function() {
        return this.la
    }
    ;
    Ud.prototype.Byf = function(e) {
        this.la = e
    }
    ;
    de.prototype = {
        constructor: de,
        q0e: function() {
            return this.dva
        },
        X5e: function(e) {
            this.dva = e
        },
        f0e: function() {
            return this.G3
        },
        cea: function() {
            return this.od
        },
        iwb: function(e) {
            this.od = e
        },
        aea: function() {
            return this.Tc
        },
        $rc: function(e) {
            this.Tc = e
        },
        s5e: function() {
            return this.uL
        },
        d2d: function(e) {
            this.uL = e
        },
        Arc: function() {
            return this.gw
        },
        fsc: function(e) {
            this.gw = e
        },
        G_e: function() {
            return this.Bz
        },
        M5e: function(e) {
            this.Bz = e
        },
        bwb: function() {
            return this.we
        },
        gsc: function(e) {
            this.we = e
        },
        T3e: function() {
            return this.Cf
        },
        Jrd: function(e) {
            this.Cf = e
        },
        U3e: function() {
            return this.Ef
        },
        Krd: function(e) {
            this.Ef = e
        },
        z4e: function() {
            return this.pz
        },
        n7e: function(e) {
            this.pz = e
        },
        A4e: function() {
            return this.qz
        },
        o7e: function(e) {
            this.qz = e
        },
        j5e: function(e) {
            return null != this.Mu ? this.Mu.ZSa(e) : 0
        },
        k5e: function(e) {
            return null != this.Mu ? this.Mu.$Sa(e) : 0
        },
        c2e: function() {
            return this.Am
        },
        asc: function(e) {
            this.Am = e
        },
        P1e: function() {
            return this.Mda
        },
        v6e: function(e) {
            this.Mda = e
        },
        rRd: function() {
            return this.lIa
        },
        wRd: function(e) {
            this.lIa = e
        },
        v5e: function() {
            return this.aVd
        },
        R7e: function(e) {
            this.aVd = e
        },
        p4e: function() {
            return this.zsa
        },
        j7e: function(e) {
            this.zsa = e
        },
        o4e: function() {
            return this.iia
        },
        i7e: function(e) {
            this.iia = e
        },
        n4e: function() {
            return this.hia
        },
        h7e: function(e) {
            this.hia = e
        },
        Nrc: function() {
            return this.IK
        },
        nsc: function(e) {
            this.IK = e
        },
        Mrc: function() {
            return this.ci
        },
        msc: function(e) {
            this.ci = e
        },
        QZa: function() {
            return this.eo
        },
        xrc: function() {
            return this.Ut
        },
        dsc: function(e) {
            this.Ut = e
        },
        v0e: function() {
            return this.AS
        },
        Y5e: function(e) {
            this.AS = e
        },
        q4e: function() {
            return this.dm
        },
        k7e: function(e) {
            this.dm = e
        },
        SNa: function(w) {
            if (f.AscFormat.hb(this.nAa) && f.AscFormat.hb(this.mAa))
                return new mg(this.nAa,this.mAa,!0);
            if (null === this.Am)
                return new mg(50,50,!1);
            var y = 0
              , Ra = 0;
            w = w.tt.Y_[Ef.iW(this.Am)];
            w != e && null != w.Image && w.sz == f.AscFonts.IAa.Oea ? (y = w.Image.width,
            Ra = w.Image.height) : f.AscDesktopEditor && f.AscDesktopEditor.GetImageOriginalSize && (w = f.AscDesktopEditor.GetImageOriginalSize(this.Am),
            0 != w.W && 0 != w.Jb && (y = w.W,
            Ra = w.Jb));
            return 0 != y && 0 != Ra ? new mg(Math.max(y * Ef.PD, 1),Math.max(Ra * Ef.PD, 1),!0) : new mg(50,50,!1)
        },
        R3e: function() {
            return this.pAa
        },
        b7e: function(e) {
            this.pAa = e
        },
        Q3e: function() {
            return this.oAa
        },
        a7e: function(e) {
            this.oAa = e
        },
        Oha: function() {
            return this.title
        },
        UNa: function(e) {
            this.title = e
        },
        bIa: function() {
            return this.description
        },
        fwb: function(e) {
            this.description = e
        },
        lrc: function() {
            return this.columnNumber
        },
        Urc: function(e) {
            this.columnNumber = e
        },
        mrc: function() {
            return this.OT
        },
        Vrc: function(e) {
            this.OT = e
        },
        ZTb: function() {
            return this.dm ? this.dm.ZTb() : e
        },
        Brc: function() {
            return this.Sd
        },
        hsc: function(e) {
            this.Sd = e
        },
        Crc: function() {
            return this.nsa
        },
        isc: function(e) {
            this.nsa = e
        },
        prc: function() {
            return this.Wf
        },
        Wrc: function(e) {
            this.Wf = e
        },
        qrc: function() {
            return this.WEa
        },
        Xrc: function(e) {
            this.WEa = e
        },
        rrc: function() {
            return this.Xf
        },
        Yrc: function(e) {
            this.Xf = e
        },
        trc: function() {
            return this.XEa
        },
        Zrc: function(e) {
            this.XEa = e
        },
        f7e: function(e) {
            this.Ylb = e
        },
        Erc: function() {
            return this.RD
        },
        ksc: function(e) {
            this.RD = e
        },
        jrc: function() {
            return this.anchor
        },
        Rrc: function(e) {
            this.anchor = e
        }
    };
    sb.prototype = {
        C3e: function() {
            return this.ea
        },
        D3e: function() {
            return this.pa
        }
    };
    yb.prototype = {
        Mx: function() {
            return this.type
        },
        Pha: function(e) {
            this.type = e
        },
        tJa: function() {
            return this.fill
        },
        JTa: function(e) {
            this.fill = e
        },
        c5e: function() {
            return this.Ui
        },
        E7e: function(e) {
            this.Ui = e
        },
        erc: function() {
            return null != this.Ui || null != this.fill && null != this.fill.FXa ? !0 : !1
        }
    };
    Xe.prototype = {
        Mx: function() {
            return this.type
        },
        Pha: function(e) {
            this.type = e
        },
        aUb: function() {
            return this.url
        },
        WRa: function(e) {
            this.url = e
        },
        xrd: function() {
            return this.eNc
        },
        C7e: function(e) {
            this.eNc = e
        }
    };
    Zh.prototype = {
        M3e: function() {
            return this.oDa
        },
        Z6e: function(e) {
            this.oDa = e
        },
        B0e: function() {
            return this.Cn
        },
        $5e: function(e) {
            this.Cn = e
        },
        A0e: function() {
            return this.fo
        },
        Z5e: function(e) {
            this.fo = e
        }
    };
    oh.prototype = {
        K0e: function() {
            return this.qVa
        },
        a6e: function(e) {
            this.qVa = e
        },
        V3e: function() {
            return this.FXa
        },
        d7e: function(e) {
            this.FXa = e
        },
        M1e: function() {
            return this.zWa
        },
        t6e: function(e) {
            this.zWa = e
        },
        P2e: function() {
            return this.jXa
        },
        O6e: function(e) {
            this.jXa = e
        },
        Q2e: function() {
            return this.kXa
        },
        P6e: function(e) {
            this.kXa = e
        },
        K3e: function() {
            return this.$jc
        },
        Y6e: function(e) {
            this.$jc = e
        }
    };
    Xg.prototype = {
        FT: function() {
            return this.color
        },
        RZa: function(e) {
            this.color = e
        }
    };
    ak.prototype = {
        Mx: function() {
            return this.type
        },
        Pha: function(e) {
            this.type = e
        },
        cea: function() {
            return this.width
        },
        iwb: function(e) {
            this.width = e
        },
        FT: function() {
            return this.color
        },
        RZa: function(e) {
            this.color = e
        },
        W2e: function() {
            return this.XCa
        },
        Ird: function(e) {
            this.XCa = e
        },
        T2e: function() {
            return this.msb
        },
        Grd: function(e) {
            this.msb = e
        },
        S2e: function() {
            return this.Pic
        },
        bsc: function(e) {
            this.Pic = e
        },
        R2e: function() {
            return this.Oic
        },
        Frd: function(e) {
            this.Oic = e
        },
        V2e: function() {
            return this.Ric
        },
        csc: function(e) {
            this.Ric = e
        },
        U2e: function() {
            return this.jL
        },
        Hrd: function(e) {
            this.jL = e
        },
        krc: function() {
            return this.VM
        },
        e7e: function(e) {
            this.FE = e
        },
        Z3e: function() {
            return this.FE
        }
    };
    Yg.prototype.glf = function() {
        return this.be
    }
    ;
    Yg.prototype.dYc = function() {
        return this.name
    }
    ;
    Yg.prototype.hlf = function() {
        return this.be[0]
    }
    ;
    Yg.prototype.olf = function() {
        return this.be[1]
    }
    ;
    Yg.prototype.ilf = function() {
        return this.be[2]
    }
    ;
    Yg.prototype.plf = function() {
        return this.be[3]
    }
    ;
    Yg.prototype.$kf = function() {
        return this.be[4]
    }
    ;
    Yg.prototype.alf = function() {
        return this.be[5]
    }
    ;
    Yg.prototype.blf = function() {
        return this.be[6]
    }
    ;
    Yg.prototype.clf = function() {
        return this.be[7]
    }
    ;
    Yg.prototype.dlf = function() {
        return this.be[8]
    }
    ;
    Yg.prototype.elf = function() {
        return this.be[9]
    }
    ;
    Yg.prototype.nlf = function() {
        return this.be[10]
    }
    ;
    Yg.prototype.jlf = function() {
        return this.be[11]
    }
    ;
    Yg.prototype.Ad = function(e) {
        this.be.push(e);
        this.v5b += e.Tif()
    }
    ;
    Yg.prototype.isEqual = function(e) {
        if (this.v5b === e.v5b) {
            for (var f = 0; f < this.be.length; ++f) {
                var w = this.be[f]
                  , y = e.be[f];
                if (!(!w && !y || y && y && w.ih(y)))
                    return !1
            }
            return this.name === e.name
        }
        return !1
    }
    ;
    yc.prototype.AN = function() {
        return this.ea
    }
    ;
    yc.prototype.rBa = function() {
        return this.wN
    }
    ;
    yc.prototype.sBa = function() {
        return this.xN
    }
    ;
    yc.prototype.nXb = function() {
        return this.Ri
    }
    ;
    yc.prototype.xla = function() {
        return this.Yl
    }
    ;
    yc.prototype.Gjf = function() {
        return this.npa
    }
    ;
    yc.prototype.lkf = function() {
        return this.cDa
    }
    ;
    yc.prototype.Cjf = function() {
        return this.Text
    }
    ;
    yc.prototype.Bjf = function() {
        return this.Number
    }
    ;
    Ic.prototype.xQ = function() {
        return this.pa
    }
    ;
    Ic.prototype.kP = function(e) {
        this.pa = e
    }
    ;
    Ic.prototype.Syd = function() {
        return this.uA
    }
    ;
    Ic.prototype.wHd = function(e) {
        this.uA = e ? e.slice(0, Wc.Ntd) : e
    }
    ;
    Ic.prototype.KJa = function() {
        return this.Text
    }
    ;
    Ic.prototype.qAa = function(e) {
        this.Text = e
    }
    ;
    Ic.prototype.OKc = function(e) {
        this.Na = e
    }
    ;
    Ic.prototype.z8b = function() {
        return this.Na
    }
    ;
    Ic.prototype.Yof = function() {
        return "_top" === this.gr
    }
    ;
    Ic.prototype.tyf = function() {
        this.gr = "_top"
    }
    ;
    Ic.prototype.uwc = function() {
        return this.gr
    }
    ;
    Ic.prototype.CSc = function(e) {
        this.gr = e
    }
    ;
    Ic.prototype.Xof = function() {
        return this.ana instanceof AscCommonWord.Ua ? !0 : !1
    }
    ;
    Ic.prototype.vZc = function(e) {
        this.ana = e
    }
    ;
    Ic.prototype.nbc = function() {
        return this.ana
    }
    ;
    f.Asc.CHyperlinkProperty = f.Asc.ikb = Ic;
    Ic.prototype.get_Value = Ic.prototype.xQ;
    Ic.prototype.put_Value = Ic.prototype.kP;
    Ic.prototype.get_ToolTip = Ic.prototype.Syd;
    Ic.prototype.put_ToolTip = Ic.prototype.wHd;
    Ic.prototype.get_Text = Ic.prototype.KJa;
    Ic.prototype.put_Text = Ic.prototype.qAa;
    Ic.prototype.get_InternalHyperlink = Ic.prototype.z8b;
    Ic.prototype.put_InternalHyperlink = Ic.prototype.OKc;
    Ic.prototype.is_TopOfDocument = Ic.prototype.Yof;
    Ic.prototype.put_TopOfDocument = Ic.prototype.tyf;
    Ic.prototype.get_Bookmark = Ic.prototype.uwc;
    Ic.prototype.put_Bookmark = Ic.prototype.CSc;
    Ic.prototype.is_Heading = Ic.prototype.Xof;
    Ic.prototype.put_Heading = Ic.prototype.vZc;
    Ic.prototype.get_Heading = Ic.prototype.nbc;
    Vb.prototype.I7b = Vb.prototype.oHd = function(e) {
        this.Ia = e
    }
    ;
    Vb.prototype.sE = Vb.prototype.F0a = function() {
        return this.Ia
    }
    ;
    Vb.prototype.s6e = function(e) {
        this.s7c = e
    }
    ;
    Vb.prototype.L1e = Vb.prototype.w4d = function() {
        return this.s7c
    }
    ;
    Vb.prototype.l6e = function(e) {
        this.P6c = e
    }
    ;
    Vb.prototype.TTb = Vb.prototype.ywc = function() {
        return this.P6c
    }
    ;
    Vb.prototype.K6e = function(e) {
        this.wad = e
    }
    ;
    Vb.prototype.WTb = Vb.prototype.Gwc = function() {
        return this.wad
    }
    ;
    var w = ji.prototype;
    w.F0a = w.sE = function() {
        return this.Ia
    }
    ;
    w.oHd = w.I7b = function(e) {
        this.Ia = e
    }
    ;
    w.vRc = w.aUb = function() {
        return this.R_
    }
    ;
    w.vyf = w.WRa = function(e) {
        this.R_ = e
    }
    ;
    w.aYc = w.Oha = function() {
        return this.FW
    }
    ;
    w.TDg = w.UNa = function(e) {
        this.FW = e
    }
    ;
    w.E0a = w.E1e = function() {
        return this.Ck
    }
    ;
    w.b4b = w.o6e = function(e) {
        this.Ck = e
    }
    ;
    w.cyg = w.f5e = function() {
        return this.iSb
    }
    ;
    w.WDg = w.H7e = function(e) {
        this.iSb = e
    }
    ;
    w.Rkf = w.$4e = function() {
        return this.boc
    }
    ;
    w.UDg = w.D7e = function(e) {
        this.boc = e
    }
    ;
    w.Uxg = function() {
        return this.MRa
    }
    ;
    w.qHd = function(e) {
        this.MRa = e
    }
    ;
    w.xla = w.vJa = function() {
        return this.Ewa ? this.Ewa.F0a() : null
    }
    ;
    w.pJb = w.YAa = function() {
        return this.Ewa ? this.Ewa.w4d() : null
    }
    ;
    w.ywc = w.TTb = function() {
        return this.Ewa ? this.Ewa.ywc() : null
    }
    ;
    w.Gwc = w.WTb = function() {
        return this.Ewa ? this.Ewa.Gwc() : null
    }
    ;
    w.Vxg = w.uJa = function() {
        return this.Vcd
    }
    ;
    w.KDg = w.V6e = function(e) {
        this.Vcd = e
    }
    ;
    w.ejf = w.b0e = function() {
        return this.d2c
    }
    ;
    w.ADg = w.U5e = function(e) {
        this.d2c = e
    }
    ;
    w.Qkf = w.U4e = function() {
        return this.Kkd
    }
    ;
    w.SDg = w.z7e = function(e) {
        this.Kkd = e
    }
    ;
    w.j9f = w.d5e = function() {
        return this.Ewa
    }
    ;
    w.VDg = w.F7e = function(e) {
        this.Ewa = e
    }
    ;
    w.qkf = w.u3e = function() {
        return this.qo
    }
    ;
    w.JDg = w.R6e = function(e) {
        this.qo = e
    }
    ;
    w.tkf = w.O3e = function() {
        return this.Permissions
    }
    ;
    w.LDg = w.$6e = function(e) {
        this.Permissions = e
    }
    ;
    w.efb = w.D2e = function() {
        return this.Uf
    }
    ;
    w.DSc = w.H6e = function(e) {
        this.Uf = e
    }
    ;
    w.wwc = w.p1e = function() {
        return this.d6c
    }
    ;
    w.axf = w.i6e = function(e) {
        this.d6c = e
    }
    ;
    w.Gyd = w.q1e = function() {
        return this.e6c
    }
    ;
    w.BDg = w.j6e = function(e) {
        this.e6c = e
    }
    ;
    Zg.prototype.Mx = function() {
        return this.ea
    }
    ;
    Zg.prototype.C1e = function() {
        return this.e7c
    }
    ;
    Zg.prototype.V0e = function() {
        return this.mMb
    }
    ;
    Zg.prototype.d2e = function() {
        return this.yUc
    }
    ;
    Zg.prototype.W0e = function() {
        return this.m6b
    }
    ;
    qc.prototype.kP = function(e) {
        this.pa = e
    }
    ;
    qc.prototype.xQ = function() {
        return this.pa
    }
    ;
    tn.prototype.F0a = function() {
        return this.Ia
    }
    ;
    tn.prototype.rBa = function() {
        return this.ka
    }
    ;
    tn.prototype.sBa = function() {
        return this.la
    }
    ;
    Hd.prototype.F0a = function() {
        return this.Ia
    }
    ;
    Hd.prototype.ujf = function() {
        return this.ob
    }
    ;
    Hd.prototype.qBa = function() {
        return this.W
    }
    ;
    Hd.prototype.b8a = function() {
        return this.Jb
    }
    ;
    If.prototype.sE = If.prototype.oC = If.prototype.pBa = function() {
        return this.name
    }
    ;
    If.prototype.pRd = function() {
        return this.displayName
    }
    ;
    If.prototype.Mx = If.prototype.AN = function() {
        return this.type
    }
    ;
    If.prototype.vrc = function() {
        return this.image
    }
    ;
    Sk.prototype.Xkf = function() {
        return this.Tl
    }
    ;
    Sk.prototype.ojf = function() {
        return this.$t
    }
    ;
    Sk.prototype.Wkf = function() {
        return this.Gwa
    }
    ;
    be.prototype.get_Description = function() {
        return this.description
    }
    ;
    be.prototype.set_Description = function(e) {
        this.description = e
    }
    ;
    be.prototype.get_Url = function() {
        return this.url
    }
    ;
    be.prototype.set_Url = function(e) {
        this.url = e
    }
    ;
    be.prototype.get_Icons = function() {
        return this.h4
    }
    ;
    be.prototype.set_Icons = function(e) {
        this.h4 = e
    }
    ;
    be.prototype.get_System = function() {
        return this.HI
    }
    ;
    be.prototype.set_System = function(e) {
        this.HI = e
    }
    ;
    be.prototype.get_Viewer = function() {
        return this.MAb
    }
    ;
    be.prototype.set_Viewer = function(e) {
        this.MAb = e
    }
    ;
    be.prototype.get_EditorsSupport = function() {
        return this.$Va
    }
    ;
    be.prototype.set_EditorsSupport = function(e) {
        this.$Va = e
    }
    ;
    be.prototype.get_Visual = function() {
        return this.jhb
    }
    ;
    be.prototype.set_Visual = function(e) {
        this.jhb = e
    }
    ;
    be.prototype.get_Modal = function() {
        return this.JAb
    }
    ;
    be.prototype.set_Modal = function(e) {
        this.JAb = e
    }
    ;
    be.prototype.get_InsideMode = function() {
        return this.HAb
    }
    ;
    be.prototype.set_InsideMode = function(e) {
        this.HAb = e
    }
    ;
    be.prototype.get_CustomWindow = function() {
        return this.EAb
    }
    ;
    be.prototype.set_CustomWindow = function(e) {
        this.EAb = e
    }
    ;
    be.prototype.get_InitDataType = function() {
        return this.initDataType
    }
    ;
    be.prototype.set_InitDataType = function(e) {
        this.initDataType = e
    }
    ;
    be.prototype.get_InitData = function() {
        return this.initData
    }
    ;
    be.prototype.set_InitData = function(e) {
        this.initData = e
    }
    ;
    be.prototype.get_UpdateOleOnResize = function() {
        return this.ihb
    }
    ;
    be.prototype.set_UpdateOleOnResize = function(e) {
        this.ihb = e
    }
    ;
    be.prototype.get_Buttons = function() {
        return this.buttons
    }
    ;
    be.prototype.set_Buttons = function(e) {
        this.buttons = e
    }
    ;
    be.prototype.get_Size = function() {
        return this.size
    }
    ;
    be.prototype.set_Size = function(e) {
        this.size = e
    }
    ;
    be.prototype.get_InitOnSelectionChanged = function() {
        return this.Tgb
    }
    ;
    be.prototype.set_InitOnSelectionChanged = function(e) {
        this.Tgb = e
    }
    ;
    be.prototype.get_Events = function() {
        return this.kla
    }
    ;
    be.prototype.set_Events = function(e) {
        if (e)
            for (this.kla = e.slice(0, e.length),
            this.cvc = {},
            e = 0; e < this.kla.length; e++)
                this.cvc[this.kla[e]] = !0
    }
    ;
    be.prototype.serialize = function() {
        var e = {};
        e.description = this.description;
        e.url = this.url;
        e.index = this.index;
        e.icons = this.h4;
        e.isViewer = this.MAb;
        e.EditorsSupport = this.$Va;
        e.isSystem = this.HI;
        e.isVisual = this.jhb;
        e.isModal = this.JAb;
        e.isInsideMode = this.HAb;
        e.isCustomWindow = this.EAb;
        e.initDataType = this.initDataType;
        e.initData = this.initData;
        e.isUpdateOleOnResize = this.ihb;
        e.buttons = this.buttons;
        e.size = this.size;
        e.initOnSelectionChanged = this.Tgb;
        return e
    }
    ;
    be.prototype.deserialize = function(e) {
        this.description = null != e.description ? e.description : this.description;
        this.url = null != e.url ? e.url : this.url;
        this.index = null != e.index ? e.index : this.index;
        this.h4 = null != e.icons ? e.icons : this.h4;
        this.MAb = null != e.isViewer ? e.isViewer : this.MAb;
        this.$Va = null != e.EditorsSupport ? e.EditorsSupport : this.$Va;
        this.jhb = null != e.isVisual ? e.isVisual : this.jhb;
        this.JAb = null != e.isModal ? e.isModal : this.JAb;
        this.HAb = null != e.isInsideMode ? e.isInsideMode : this.HAb;
        this.EAb = null != e.isCustomWindow ? e.isCustomWindow : this.EAb;
        this.initDataType = null != e.initDataType ? e.initDataType : this.initDataType;
        this.initData = null != e.initData ? e.initData : this.initData;
        this.ihb = null != e.isUpdateOleOnResize ? e.isUpdateOleOnResize : this.ihb;
        this.buttons = null != e.buttons ? e.buttons : this.buttons;
        this.size = null != e.size ? e.size : this.size;
        this.Tgb = null != e.initOnSelectionChanged ? e.initOnSelectionChanged : this.Tgb
    }
    ;
    Lf.prototype.get_Name = function() {
        return this.name
    }
    ;
    Lf.prototype.set_Name = function(e) {
        this.name = e
    }
    ;
    Lf.prototype.get_Guid = function() {
        return this.Qz
    }
    ;
    Lf.prototype.set_Guid = function(e) {
        this.Qz = e
    }
    ;
    Lf.prototype.get_BaseUrl = function() {
        return this.Nqa
    }
    ;
    Lf.prototype.set_BaseUrl = function(e) {
        this.Nqa = e
    }
    ;
    Lf.prototype.get_Variations = function() {
        return this.RQ
    }
    ;
    Lf.prototype.set_Variations = function(e) {
        this.RQ = e
    }
    ;
    Lf.prototype.serialize = function() {
        var e = {};
        e.name = this.name;
        e.guid = this.Qz;
        e.baseUrl = this.Nqa;
        e.variations = [];
        for (var f = 0; f < this.RQ.length; f++)
            e.variations.push(this.RQ[f].serialize());
        return e
    }
    ;
    Lf.prototype.deserialize = function(e) {
        this.name = null != e.name ? e.name : this.name;
        this.Qz = null != e.guid ? e.guid : this.Qz;
        this.Nqa = null != e.baseUrl ? e.baseUrl : this.Nqa;
        this.RQ = [];
        for (var f = 0; f < e.variations.length; f++) {
            var w = new be;
            w.deserialize(e.variations[f]);
            this.RQ.push(w)
        }
    }
    ;
    f.AscCommon = f.AscCommon || {};
    f.Asc = f.Asc || {};
    f.Asc.c_oAscArrUserColors = f.Asc.Dtd = [16757719, 7929702, 56805, 10081791, 12884479, 16751001, 6748927, 16762931, 6865407, 15650047, 16737894, 3407768, 16759142, 10852863, 6750176, 16774656, 13926655, 13815039, 3397375, 11927347, 16752947, 9404671, 4980531, 16744678, 3407830, 15919360, 16731553, 52479, 13330175, 16743219, 3386367, 14221056, 16737966, 1896960, 65484, 10970879, 16759296, 16711680, 13496832, 62072, 49906, 16734720, 10682112, 7890687, 16731610, 65406, 38655, 16747008, 59890, 12733951, 15859712, 47077, 15050496, 15224319, 10154496, 58807, 16724950, 1759488, 9981439, 15064320, 15893248, 16724883, 58737, 15007744, 36594, 12772608, 12137471, 6442495, 15039488, 16718470, 14274816, 53721, 16718545, 1625088, 15881472, 13419776, 32985, 16711800, 1490688, 16711884, 8991743, 13407488, 41932, 7978752, 15028480, 52387, 15007927, 12114176, 1421824, 55726, 13041893, 10665728, 30924, 49049, 14241024, 36530, 11709440, 13397504, 45710, 34214];
    f.AscCommon.QIa = Ia;
    f.AscCommon.tqb = $a;
    f.AscCommon.RIa = function() {
        function e() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        }
        var f = "{" + e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e() + "}";
        return f = f.toUpperCase()
    }
    ;
    f.AscCommon.ekg = Va;
    f.AscCommon.d$b = function() {
        return ib(Va())
    }
    ;
    f.AscCommon.Rje = ib;
    w = f.Asc.c_oLicenseResult = f.Asc.Wtg = Ci;
    w.Error = w.Error;
    w.Expired = w.Cje;
    w.Success = w.SIe;
    w.UnknownUser = w.uLe;
    w.Connections = w.VLb;
    w.ExpiredTrial = w.Dje;
    w.SuccessLimit = w.TIe;
    w.UsersCount = w.ZLe;
    w.ConnectionsOS = w.Nge;
    w.UsersCountOS = w.$Le;
    w = f.Asc.c_oRights = f.Asc.Xtg = lg;
    w.None = w.kf;
    w.Edit = w.pje;
    w.Review = w.yDe;
    w.Comment = w.Comment;
    w.View = w.Aub;
    w = f.Asc.c_oLicenseMode = f.Asc.Vtg = Xc;
    w.None = w.kf;
    w.Trial = w.mLe;
    w.Developer = w.Rie;
    w = f.Asc.EPluginDataType = f.Asc.n$b = xc;
    w.none = w.hs;
    w.text = w.text;
    w.ole = w.vrf;
    w.html = w.html;
    f.AscCommon.asc_CSignatureLine = f.AscCommon.Xqd = y;
    w = y.prototype;
    w.asc_getId = w.sE;
    w.asc_setId = w.P8e;
    w.asc_getGuid = w.ITa;
    w.asc_setGuid = w.M8e;
    w.asc_getSigner1 = w.Frc;
    w.asc_setSigner1 = w.I9e;
    w.asc_getSigner2 = w.Grc;
    w.asc_setSigner2 = w.J9e;
    w.asc_getEmail = w.orc;
    w.asc_setEmail = w.D8e;
    w.asc_getInstructions = w.g2e;
    w.asc_setInstructions = w.R8e;
    w.asc_getShowDate = w.s4e;
    w.asc_setShowDate = w.F9e;
    w.asc_getValid = w.i5e;
    w.asc_setValid = w.N9e;
    w.asc_getDate = w.b1e;
    w.asc_setDate = w.s8e;
    w.asc_getVisible = w.uRd;
    w.asc_setVisible = w.vWc;
    w.asc_getRequested = w.d4e;
    w.asc_setRequested = w.y9e;
    f.AscCommon.Sqd = Ab;
    w = Ab.prototype;
    w.asc_getLicenseType = w.N2e;
    w.asc_getCanCoAuthoring = w.h0e;
    w.asc_getCanReaderMode = w.j0e;
    w.asc_getCanBranding = w.g0e;
    w.asc_getCustomization = w.Y0e;
    w.asc_getIsAutosaveEnable = w.k2e;
    w.asc_getAutosaveMinInterval = w.O_e;
    w.asc_getIsAnalyticsEnable = w.h2e;
    w.asc_getIsLight = w.v2e;
    w.asc_getLicenseMode = w.M2e;
    w.asc_getRights = w.h4e;
    w.asc_getBuildVersion = w.V_e;
    w.asc_getBuildNumber = w.U_e;
    f.AscCommon.PZa = Sb;
    w = Sb.prototype;
    w.putMinValRule = w.jsa;
    w.putMinVal = w.RQa;
    w.putMaxValRule = w.PGa;
    w.putMaxVal = w.Pib;
    w.putInvertValOrder = w.JCb;
    w.putLogScale = w.IKc;
    w.putLogBase = w.kHd;
    w.putUnits = w.lHd;
    w.putShowUnitsOnChart = w.KCb;
    w.putMajorTickMark = w.gha;
    w.putMinorTickMark = w.hha;
    w.putTickLabelsPos = w.iha;
    w.putCrossesRule = w.C2;
    w.putCrosses = w.rma;
    w.putDispUnitsRule = w.QQa;
    w.getDispUnitsRule = w.rhf;
    w.putAxisType = w.HKc;
    w.getAxisType = w.WT;
    w.getMinValRule = w.dif;
    w.getMinVal = w.cif;
    w.getMaxValRule = w.$hf;
    w.getMaxVal = w.Zhf;
    w.getInvertValOrder = w.Lhf;
    w.getLogScale = w.Xhf;
    w.getLogBase = w.Whf;
    w.getUnits = w.vyd;
    w.getShowUnitsOnChart = w.Eif;
    w.getMajorTickMark = w.VWb;
    w.getMinorTickMark = w.XWb;
    w.getTickLabelsPos = w.iXb;
    w.getCrossesRule = w.OWb;
    w.getCrosses = w.NWb;
    w.setDefault = w.QI;
    f.AscCommon.Svb = kb;
    w = kb.prototype;
    w.putIntervalBetweenTick = w.Nib;
    w.putIntervalBetweenLabelsRule = w.Mib;
    w.putIntervalBetweenLabels = w.jHd;
    w.putInvertCatOrder = w.X3b;
    w.putLabelsAxisDistance = w.Oib;
    w.putMajorTickMark = w.gha;
    w.putMinorTickMark = w.hha;
    w.putTickLabelsPos = w.iha;
    w.putCrossesRule = w.C2;
    w.putCrosses = w.rma;
    w.putAxisType = w.HKc;
    w.putLabelsPosition = w.isa;
    w.putCrossMaxVal = w.hHd;
    w.putCrossMinVal = w.iHd;
    w.getIntervalBetweenTick = w.Sxd;
    w.getIntervalBetweenLabelsRule = w.Rxd;
    w.getIntervalBetweenLabels = w.Qxd;
    w.getInvertCatOrder = w.Txd;
    w.getLabelsAxisDistance = w.Uxd;
    w.getMajorTickMark = w.VWb;
    w.getMinorTickMark = w.XWb;
    w.getTickLabelsPos = w.iXb;
    w.getCrossesRule = w.OWb;
    w.getCrosses = w.NWb;
    w.getAxisType = w.WT;
    w.getLabelsPosition = w.Vxd;
    w.getCrossMaxVal = w.jhf;
    w.getCrossMinVal = w.khf;
    w.setDefault = w.QI;
    f.Asc.asc_ChartSettings = f.Asc.jna = Ta;
    w = Ta.prototype;
    w.putStyle = w.MKc;
    w.putTitle = w.Sib;
    w.putRowCols = w.Gwf;
    w.putHorAxisLabel = w.ICb;
    w.putVertAxisLabel = w.LCb;
    w.putLegendPos = w.Y3b;
    w.putDataLabelsPos = w.HCb;
    w.putCatAx = w.Dwf;
    w.putValAx = w.Hwf;
    w.getStyle = w.r3;
    w.getTitle = w.nra;
    w.getRowCols = w.uif;
    w.getHorAxisLabel = w.Nxd;
    w.getVertAxisLabel = w.xyd;
    w.getLegendPos = w.Wxd;
    w.getDataLabelsPos = w.Yeb;
    w.getHorAx = w.Ehf;
    w.getVertAx = w.Vif;
    w.getHorGridLines = w.Oxd;
    w.putHorGridLines = w.Kib;
    w.getVertGridLines = w.yyd;
    w.putVertGridLines = w.Uib;
    w.getType = w.fm;
    w.putType = w.Tib;
    w.putShowSerName = w.KKc;
    w.getShowSerName = w.Dif;
    w.putShowCatName = w.JKc;
    w.getShowCatName = w.Bif;
    w.putShowVal = w.LKc;
    w.getShowVal = w.Fif;
    w.putSeparator = w.Z3b;
    w.getSeparator = w.xif;
    w.putHorAxisProps = w.D2;
    w.getHorAxisProps = w.myb;
    w.putVertAxisProps = w.s$;
    w.getVertAxisProps = w.Ayb;
    w.putRange = w.Wlb;
    w.getRange = w.tx;
    w.putRanges = w.Ewf;
    w.getRanges = w.bXb;
    w.putInColumns = w.Lib;
    w.getInColumns = w.Zeb;
    w.putShowMarker = w.Qib;
    w.getShowMarker = w.Cif;
    w.putLine = w.r3a;
    w.getLine = w.Rhf;
    w.putSmooth = w.Rib;
    w.getSmooth = w.Jif;
    w.changeType = w.mud;
    w.putShowHorAxis = w.sma;
    w.getShowHorAxis = w.ewc;
    w.putShowVerAxis = w.Bya;
    w.getShowVerAxis = w.fwc;
    f.AscCommon.rJa = ob;
    w = ob.prototype;
    w.asc_getX = w.dwb;
    w.asc_getY = w.ewb;
    w.asc_getWidth = w.cea;
    w.asc_getHeight = w.aea;
    f.AscCommon.BM = Xa;
    w = Xa.prototype;
    w.getR = w.dN;
    w.get_r = w.rlf;
    w.put_r = w.Eyf;
    w.getG = w.IY;
    w.get_g = w.klf;
    w.put_g = w.Dyf;
    w.getB = w.HY;
    w.get_b = w.flf;
    w.put_b = w.Cyf;
    w.getA = w.r0a;
    w.get_hex = w.mlf;
    f.Asc.asc_CColor = f.Asc.fta = kc;
    w = kc.prototype;
    w.get_r = w.asc_getR = w.cwb;
    w.put_r = w.asc_putR = w.fUb;
    w.get_g = w.asc_getG = w.Xvb;
    w.put_g = w.asc_putG = w.cUb;
    w.get_b = w.asc_getB = w.Vvb;
    w.put_b = w.asc_putB = w.bUb;
    w.get_a = w.asc_getA = w.D_e;
    w.put_a = w.asc_putA = w.H7b;
    w.get_auto = w.asc_getAuto = w.M_e;
    w.put_auto = w.asc_putAuto = w.N5e;
    w.get_type = w.asc_getType = w.Mx;
    w.put_type = w.asc_putType = w.Pha;
    w.get_value = w.asc_getValue = w.TNa;
    w.put_value = w.asc_putValue = w.SZa;
    w.get_hex = w.asc_getHex = w.ord;
    w.get_color = w.asc_getColor = w.FT;
    w.get_hex = w.asc_getHex = w.ord;
    f.Asc.asc_CTextBorder = f.Asc.Nka = Cc;
    w = Cc.prototype;
    w.get_Color = w.asc_getColor = w.FT;
    w.put_Color = w.asc_putColor = w.RZa;
    w.get_Size = w.asc_getSize = w.Hrc;
    w.put_Size = w.asc_putSize = w.m7e;
    w.get_Value = w.asc_getValue = w.TNa;
    w.put_Value = w.asc_putValue = w.SZa;
    w.get_Space = w.asc_getSpace = w.F4e;
    w.put_Space = w.asc_putSpace = w.q7e;
    w.get_ForSelectedCells = w.asc_getForSelectedCells = w.D1e;
    w.put_ForSelectedCells = w.asc_putForSelectedCells = w.n6e;
    f.Asc.asc_CParagraphBorders = f.Asc.$rg = Pb;
    w = Pb.prototype;
    w.get_Left = w.asc_getLeft = w.x9;
    w.put_Left = w.asc_putLeft = w.gwb;
    w.get_Top = w.asc_getTop = w.z9;
    w.put_Top = w.asc_putTop = w.lsc;
    w.get_Right = w.asc_getRight = w.y9;
    w.put_Right = w.asc_putRight = w.hwb;
    w.get_Bottom = w.asc_getBottom = w.cga;
    w.put_Bottom = w.asc_putBottom = w.Trc;
    w.get_Between = w.asc_getBetween = w.R_e;
    w.put_Between = w.asc_putBetween = w.P5e;
    f.AscCommon.MZe = ic;
    w = ic.prototype;
    w.get_ListType = w.asc_getListType = w.Z2e;
    w.get_ListSubType = w.asc_getListSubType = w.Y2e;
    f.AscCommon.wFb = Bb;
    f.AscCommon.asc_CTextFontFamily = Bb;
    w = Bb.prototype;
    w.get_Name = w.asc_getName = w.pBa = w.oC;
    w.get_Index = w.asc_getIndex = w.GMf = w.bea;
    w.put_Name = w.asc_putName = w.w8a = w.T6e;
    w.put_Index = w.asc_putIndex = w.GDg = w.C6e;
    f.Asc.asc_CParagraphTab = f.Asc.bsg = Ma;
    w = Ma.prototype;
    w.get_Value = w.asc_getValue = w.TNa;
    w.put_Value = w.asc_putValue = w.SZa;
    w.get_Pos = w.asc_getPos = w.S3e;
    w.put_Pos = w.asc_putPos = w.c7e;
    w.get_Leader = w.asc_getLeader = w.J2e;
    w.put_Leader = w.asc_putLeader = w.M6e;
    f.Asc.asc_CParagraphTabs = f.Asc.csg = cb;
    w = cb.prototype;
    w.get_Count = w.asc_getCount = w.nrc;
    w.get_Tab = w.asc_getTab = w.Q4e;
    w.add_Tab = w.asc_addTab = w.p_e;
    w.clear = w.clear = w.asc_clear = w.v_e;
    f.Asc.asc_CParagraphShd = f.Asc.pWc = jb;
    w = jb.prototype;
    w.get_Value = w.asc_getValue = w.TNa;
    w.put_Value = w.asc_putValue = w.SZa;
    w.get_Color = w.asc_getColor = w.FT;
    w.put_Color = w.asc_putColor = w.RZa;
    f.Asc.asc_CParagraphFrame = f.Asc.asg = Pa;
    w = Pa.prototype;
    w.asc_getDropCap = w.get_DropCap = w.m1e;
    w.asc_putDropCap = w.put_DropCap = w.h6e;
    w.asc_getH = w.get_H = w.R1e;
    w.asc_putH = w.put_H = w.w6e;
    w.asc_getHAnchor = w.get_HAnchor = w.S1e;
    w.asc_putHAnchor = w.put_HAnchor = w.x6e;
    w.asc_getHRule = w.get_HRule = w.T1e;
    w.asc_putHRule = w.put_HRule = w.y6e;
    w.asc_getHSpace = w.get_HSpace = w.U1e;
    w.asc_putHSpace = w.put_HSpace = w.z6e;
    w.asc_getLines = w.get_Lines = w.wrc;
    w.asc_putLines = w.put_Lines = w.Q6e;
    w.asc_getVAnchor = w.get_VAnchor = w.e5e;
    w.asc_putVAnchor = w.put_VAnchor = w.G7e;
    w.asc_getVSpace = w.get_VSpace = w.g5e;
    w.asc_putVSpace = w.put_VSpace = w.I7e;
    w.asc_getW = w.get_W = w.n5e;
    w.asc_putW = w.put_W = w.K7e;
    w.asc_getWrap = w.get_Wrap = w.q5e;
    w.asc_putWrap = w.put_Wrap = w.M7e;
    w.asc_getX = w.get_X = w.dwb;
    w.asc_putX = w.put_X = w.N7e;
    w.asc_getXAlign = w.get_XAlign = w.t5e;
    w.asc_putXAlign = w.put_XAlign = w.O7e;
    w.asc_getY = w.get_Y = w.ewb;
    w.asc_putY = w.put_Y = w.P7e;
    w.asc_getYAlign = w.get_YAlign = w.u5e;
    w.asc_putYAlign = w.put_YAlign = w.Q7e;
    w.asc_getBorders = w.get_Borders = w.Wvb;
    w.asc_putBorders = w.put_Borders = w.Src;
    w.asc_getShade = w.get_Shade = w.Drc;
    w.asc_putShade = w.put_Shade = w.jsc;
    w.asc_getFontFamily = w.get_FontFamily = w.x1e;
    w.asc_putFontFamily = w.put_FontFamily = w.m6e;
    w.asc_putFromDropCapMenu = w.put_FromDropCapMenu = w.q6e;
    f.AscCommon.PTb = Ce;
    w = Ce.prototype;
    w.get_Line = w.asc_getLine = w.XTb;
    w.put_Line = w.asc_putLine = w.eUb;
    w.get_LineRule = w.asc_getLineRule = w.O2e;
    w.put_LineRule = w.asc_putLineRule = w.N6e;
    w.get_Before = w.asc_getBefore = w.Q_e;
    w.put_Before = w.asc_putBefore = w.O5e;
    w.get_After = w.asc_getAfter = w.E_e;
    w.put_After = w.asc_putAfter = w.K5e;
    f.Asc.asc_CParagraphInd = f.Asc.oWc = cf;
    w = cf.prototype;
    w.get_Left = w.asc_getLeft = w.x9;
    w.put_Left = w.asc_putLeft = w.gwb;
    w.get_Right = w.asc_getRight = w.y9;
    w.put_Right = w.asc_putRight = w.hwb;
    w.get_FirstLine = w.asc_getFirstLine = w.v1e;
    w.put_FirstLine = w.asc_putFirstLine = w.k6e;
    f.Asc.asc_CParagraphProperty = f.Asc.mdb = ef;
    w = ef.prototype;
    w.get_ContextualSpacing = w.asc_getContextualSpacing = w.Q0e;
    w.put_ContextualSpacing = w.asc_putContextualSpacing = w.c6e;
    w.get_Ind = w.asc_getInd = w.e2e;
    w.put_Ind = w.asc_putInd = w.B6e;
    w.get_Jc = w.asc_getJc = w.z2e;
    w.put_Jc = w.asc_putJc = w.D6e;
    w.get_KeepLines = w.asc_getKeepLines = w.A2e;
    w.put_KeepLines = w.asc_putKeepLines = w.E6e;
    w.get_KeepNext = w.asc_getKeepNext = w.B2e;
    w.put_KeepNext = w.asc_putKeepNext = w.F6e;
    w.get_PageBreakBefore = w.asc_getPageBreakBefore = w.H3e;
    w.put_PageBreakBefore = w.asc_putPageBreakBefore = w.X6e;
    w.get_WidowControl = w.asc_getWidowControl = w.o5e;
    w.put_WidowControl = w.asc_putWidowControl = w.L7e;
    w.get_Spacing = w.asc_getSpacing = w.G4e;
    w.put_Spacing = w.asc_putSpacing = w.r7e;
    w.get_Borders = w.asc_getBorders = w.Wvb;
    w.put_Borders = w.asc_putBorders = w.Src;
    w.get_Shade = w.asc_getShade = w.Drc;
    w.put_Shade = w.asc_putShade = w.jsc;
    w.get_Locked = w.asc_getLocked = w.QZa;
    w.get_CanAddTable = w.asc_getCanAddTable = w.e0e;
    w.get_Subscript = w.asc_getSubscript = w.Irc;
    w.put_Subscript = w.asc_putSubscript = w.w7e;
    w.get_Superscript = w.asc_getSuperscript = w.Jrc;
    w.put_Superscript = w.asc_putSuperscript = w.x7e;
    w.get_SmallCaps = w.asc_getSmallCaps = w.C4e;
    w.put_SmallCaps = w.asc_putSmallCaps = w.p7e;
    w.get_AllCaps = w.asc_getAllCaps = w.F_e;
    w.put_AllCaps = w.asc_putAllCaps = w.L5e;
    w.get_Strikeout = w.asc_getStrikeout = w.qac;
    w.put_Strikeout = w.asc_putStrikeout = w.s7e;
    w.get_DStrikeout = w.asc_getDStrikeout = w.Z0e;
    w.put_DStrikeout = w.asc_putDStrikeout = w.f6e;
    w.get_TextSpacing = w.asc_getTextSpacing = w.X4e;
    w.put_TextSpacing = w.asc_putTextSpacing = w.B7e;
    w.get_Position = w.asc_getPosition = w.bwb;
    w.put_Position = w.asc_putPosition = w.gsc;
    w.get_Tabs = w.asc_getTabs = w.S4e;
    w.put_Tabs = w.asc_putTabs = w.y7e;
    w.get_DefaultTab = w.asc_getDefaultTab = w.d1e;
    w.put_DefaultTab = w.asc_putDefaultTab = w.g6e;
    w.get_FramePr = w.asc_getFramePr = w.I1e;
    w.put_FramePr = w.asc_putFramePr = w.p6e;
    w.get_CanAddDropCap = w.asc_getCanAddDropCap = w.c0e;
    w.get_CanAddImage = w.asc_getCanAddImage = w.d0e;
    w.get_OutlineLvl = w.asc_getOutlineLvl = w.F3e;
    w.put_OutlineLvl = w.asc_putOutLineLvl = w.W6e;
    w.get_OutlineLvlStyle = w.asc_getOutlineLvlStyle = w.G3e;
    w.put_BulletSize = w.asc_putBulletSize = w.S5e;
    w.get_BulletSize = w.asc_getBulletSize = w.Y_e;
    w.put_BulletColor = w.asc_putBulletColor = w.Q5e;
    w.get_BulletColor = w.asc_getBulletColor = w.W_e;
    w.put_NumStartAt = w.asc_putNumStartAt = w.U6e;
    w.get_NumStartAt = w.asc_getNumStartAt = w.B3e;
    w.get_BulletFont = w.asc_getBulletFont = w.X_e;
    w.put_BulletFont = w.asc_putBulletFont = w.R5e;
    w.get_BulletSymbol = w.asc_getBulletSymbol = w.Z_e;
    w.put_BulletSymbol = w.asc_putBulletSymbol = w.T5e;
    w.can_DeleteBlockContentControl = w.asc_canDeleteBlockContentControl = w.q_e;
    w.can_EditBlockContentControl = w.asc_canEditBlockContentControl = w.s_e;
    w.can_DeleteInlineContentControl = w.asc_canDeleteInlineContentControl = w.r_e;
    w.can_EditInlineContentControl = w.asc_canEditInlineContentControl = w.t_e;
    f.AscCommon.OZe = Ke;
    w = Ke.prototype;
    w.get_id = w.asc_getId = w.sE;
    w.get_image = w.asc_getImage = w.vrc;
    f.AscCommon.Vqd = mg;
    w = mg.prototype;
    w.get_ImageWidth = w.asc_getImageWidth = w.VTb;
    w.get_ImageHeight = w.asc_getImageHeight = w.UTb;
    w.get_IsCorrect = w.asc_getIsCorrect = w.l2e;
    f.Asc.asc_CPaddings = f.Asc.ldb = Di;
    w = Di.prototype;
    w.get_Left = w.asc_getLeft = w.x9;
    w.put_Left = w.asc_putLeft = w.gwb;
    w.get_Top = w.asc_getTop = w.z9;
    w.put_Top = w.asc_putTop = w.lsc;
    w.get_Bottom = w.asc_getBottom = w.cga;
    w.put_Bottom = w.asc_putBottom = w.Trc;
    w.get_Right = w.asc_getRight = w.y9;
    w.put_Right = w.asc_putRight = w.hwb;
    f.Asc.asc_CShapeProperty = f.Asc.F7a = dh;
    w = dh.prototype;
    w.get_type = w.asc_getType = w.Mx;
    w.put_type = w.asc_putType = w.Pha;
    w.get_fill = w.asc_getFill = w.tJa;
    w.put_fill = w.asc_putFill = w.JTa;
    w.get_stroke = w.asc_getStroke = w.K4e;
    w.put_stroke = w.asc_putStroke = w.t7e;
    w.get_paddings = w.asc_getPaddings = w.Arc;
    w.put_paddings = w.asc_putPaddings = w.fsc;
    w.get_CanFill = w.asc_getCanFill = w.i0e;
    w.put_CanFill = w.asc_putCanFill = w.V5e;
    w.get_CanChangeArrows = w.asc_getCanChangeArrows = w.krc;
    w.set_CanChangeArrows = w.asc_setCanChangeArrows = w.b8e;
    w.get_FromChart = w.asc_getFromChart = w.J1e;
    w.set_FromChart = w.asc_setFromChart = w.K8e;
    w.get_Locked = w.asc_getLocked = w.QZa;
    w.set_Locked = w.asc_setLocked = w.c9e;
    w.get_Width = w.asc_getWidth = w.cea;
    w.put_Width = w.asc_putWidth = w.iwb;
    w.get_Height = w.asc_getHeight = w.aea;
    w.put_Height = w.asc_putHeight = w.$rc;
    w.get_VerticalTextAlign = w.asc_getVerticalTextAlign = w.Nrc;
    w.put_VerticalTextAlign = w.asc_putVerticalTextAlign = w.nsc;
    w.get_Vert = w.asc_getVert = w.Mrc;
    w.put_Vert = w.asc_putVert = w.msc;
    w.get_TextArtProperties = w.asc_getTextArtProperties = w.W4e;
    w.put_TextArtProperties = w.asc_putTextArtProperties = w.A7e;
    w.get_LockAspect = w.asc_getLockAspect = w.xrc;
    w.put_LockAspect = w.asc_putLockAspect = w.dsc;
    w.get_Title = w.asc_getTitle = w.Oha;
    w.put_Title = w.asc_putTitle = w.UNa;
    w.get_Description = w.asc_getDescription = w.bIa;
    w.put_Description = w.asc_putDescription = w.fwb;
    w.get_ColumnNumber = w.asc_getColumnNumber = w.lrc;
    w.put_ColumnNumber = w.asc_putColumnNumber = w.Urc;
    w.get_ColumnSpace = w.asc_getColumnSpace = w.mrc;
    w.put_ColumnSpace = w.asc_putColumnSpace = w.Vrc;
    w.get_SignatureId = w.asc_getSignatureId = w.ZTb;
    w.put_SignatureId = w.asc_putSignatureId = w.l7e;
    w.get_FromImage = w.asc_getFromImage = w.K1e;
    w.put_FromImage = w.asc_putFromImage = w.r6e;
    w.get_Rot = w.asc_getRot = w.Brc;
    w.put_Rot = w.asc_putRot = w.hsc;
    w.get_RotAdd = w.asc_getRotAdd = w.Crc;
    w.put_RotAdd = w.asc_putRotAdd = w.isc;
    w.get_FlipH = w.asc_getFlipH = w.prc;
    w.put_FlipH = w.asc_putFlipH = w.Wrc;
    w.get_FlipV = w.asc_getFlipV = w.rrc;
    w.put_FlipV = w.asc_putFlipV = w.Yrc;
    w.get_FlipHInvert = w.asc_getFlipHInvert = w.qrc;
    w.put_FlipHInvert = w.asc_putFlipHInvert = w.Xrc;
    w.get_FlipVInvert = w.asc_getFlipVInvert = w.trc;
    w.put_FlipVInvert = w.asc_putFlipVInvert = w.Zrc;
    w.put_Shadow = w.byf = w.put_shadow = w.Fyf = w.asc_putShadow = w.ksc;
    w.get_Shadow = w.Bkf = w.get_shadow = w.slf = w.asc_getShadow = w.Erc;
    w.put_Anchor = w.Iwf = w.asc_putAnchor = w.Rrc;
    w.get_Anchor = w.ajf = w.asc_getAnchor = w.jrc;
    f.Asc.asc_TextArtProperties = f.Asc.qWc = Je;
    w = Je.prototype;
    w.asc_putFill = w.JTa;
    w.asc_getFill = w.tJa;
    w.asc_putLine = w.eUb;
    w.asc_getLine = w.XTb;
    w.asc_putForm = w.Erd;
    w.asc_getForm = w.mac;
    w.asc_putStyle = w.u7e;
    w.asc_getStyle = w.$Tb;
    f.Asc.CImagePositionH = f.Asc.dee = Uc;
    w = Uc.prototype;
    w.get_RelativeFrom = w.G0a;
    w.put_RelativeFrom = w.QGa;
    w.get_UseAlign = w.H0a;
    w.put_UseAlign = w.WJa;
    w.get_Align = w.Kga;
    w.put_Align = w.kaa;
    w.get_Value = w.xQ;
    w.put_Value = w.kP;
    w.get_Percent = w.Nwc;
    w.put_Percent = w.WKc;
    f.Asc.CImagePositionV = f.Asc.eee = kd;
    w = kd.prototype;
    w.get_RelativeFrom = w.G0a;
    w.put_RelativeFrom = w.QGa;
    w.get_UseAlign = w.H0a;
    w.put_UseAlign = w.WJa;
    w.get_Align = w.Kga;
    w.put_Align = w.kaa;
    w.get_Value = w.xQ;
    w.put_Value = w.kP;
    w.get_Percent = w.Nwc;
    w.put_Percent = w.WKc;
    f.Asc.CPosition = f.Asc.zYd = Ud;
    w = Ud.prototype;
    w.get_X = w.rBa;
    w.put_X = w.zyf;
    w.get_Y = w.sBa;
    w.put_Y = w.Byf;
    f.Asc.asc_CImgProperty = f.Asc.j3 = de;
    w = de.prototype;
    w.get_ChangeLevel = w.asc_getChangeLevel = w.q0e;
    w.put_ChangeLevel = w.asc_putChangeLevel = w.X5e;
    w.get_CanBeFlow = w.asc_getCanBeFlow = w.f0e;
    w.get_Width = w.asc_getWidth = w.cea;
    w.put_Width = w.asc_putWidth = w.iwb;
    w.get_Height = w.asc_getHeight = w.aea;
    w.put_Height = w.asc_putHeight = w.$rc;
    w.get_WrappingStyle = w.asc_getWrappingStyle = w.s5e;
    w.put_WrappingStyle = w.asc_putWrappingStyle = w.d2d;
    w.get_Paddings = w.asc_getPaddings = w.Arc;
    w.put_Paddings = w.asc_putPaddings = w.fsc;
    w.get_AllowOverlap = w.asc_getAllowOverlap = w.G_e;
    w.put_AllowOverlap = w.asc_putAllowOverlap = w.M5e;
    w.get_Position = w.asc_getPosition = w.bwb;
    w.put_Position = w.asc_putPosition = w.gsc;
    w.get_PositionH = w.asc_getPositionH = w.T3e;
    w.put_PositionH = w.asc_putPositionH = w.Jrd;
    w.get_PositionV = w.asc_getPositionV = w.U3e;
    w.put_PositionV = w.asc_putPositionV = w.Krd;
    w.get_SizeRelH = w.asc_getSizeRelH = w.z4e;
    w.put_SizeRelH = w.asc_putSizeRelH = w.n7e;
    w.get_SizeRelV = w.asc_getSizeRelV = w.A4e;
    w.put_SizeRelV = w.asc_putSizeRelV = w.o7e;
    w.get_Value_X = w.asc_getValue_X = w.j5e;
    w.get_Value_Y = w.asc_getValue_Y = w.k5e;
    w.get_ImageUrl = w.asc_getImageUrl = w.c2e;
    w.put_ImageUrl = w.asc_putImageUrl = w.asc;
    w.get_Group = w.asc_getGroup = w.P1e;
    w.put_Group = w.asc_putGroup = w.v6e;
    w.get_FromGroup = w.asc_getFromGroup = w.rRd;
    w.put_FromGroup = w.asc_putFromGroup = w.wRd;
    w.get_isChartProps = w.asc_getisChartProps = w.v5e;
    w.put_isChartPross = w.asc_putisChartPross = w.R7e;
    w.get_SeveralCharts = w.asc_getSeveralCharts = w.p4e;
    w.put_SeveralCharts = w.asc_putSeveralCharts = w.j7e;
    w.get_SeveralChartTypes = w.asc_getSeveralChartTypes = w.o4e;
    w.put_SeveralChartTypes = w.asc_putSeveralChartTypes = w.i7e;
    w.get_SeveralChartStyles = w.asc_getSeveralChartStyles = w.n4e;
    w.put_SeveralChartStyles = w.asc_putSeveralChartStyles = w.h7e;
    w.get_VerticalTextAlign = w.asc_getVerticalTextAlign = w.Nrc;
    w.put_VerticalTextAlign = w.asc_putVerticalTextAlign = w.nsc;
    w.get_Vert = w.asc_getVert = w.Mrc;
    w.put_Vert = w.asc_putVert = w.msc;
    w.get_Locked = w.asc_getLocked = w.QZa;
    w.getLockAspect = w.asc_getLockAspect = w.xrc;
    w.putLockAspect = w.asc_putLockAspect = w.dsc;
    w.get_ChartProperties = w.asc_getChartProperties = w.v0e;
    w.put_ChartProperties = w.asc_putChartProperties = w.Y5e;
    w.get_ShapeProperties = w.asc_getShapeProperties = w.q4e;
    w.put_ShapeProperties = w.asc_putShapeProperties = w.k7e;
    w.get_OriginSize = w.asc_getOriginSize = w.SNa;
    w.get_PluginGuid = w.asc_getPluginGuid = w.R3e;
    w.put_PluginGuid = w.asc_putPluginGuid = w.b7e;
    w.get_PluginData = w.asc_getPluginData = w.Q3e;
    w.put_PluginData = w.asc_putPluginData = w.a7e;
    w.get_Rot = w.asc_getRot = w.Brc;
    w.put_Rot = w.asc_putRot = w.hsc;
    w.get_RotAdd = w.asc_getRotAdd = w.Crc;
    w.put_RotAdd = w.asc_putRotAdd = w.isc;
    w.get_FlipH = w.asc_getFlipH = w.prc;
    w.put_FlipH = w.asc_putFlipH = w.Wrc;
    w.get_FlipV = w.asc_getFlipV = w.rrc;
    w.put_FlipV = w.asc_putFlipV = w.Yrc;
    w.get_FlipHInvert = w.asc_getFlipHInvert = w.qrc;
    w.put_FlipHInvert = w.asc_putFlipHInvert = w.Xrc;
    w.get_FlipVInvert = w.asc_getFlipVInvert = w.trc;
    w.put_FlipVInvert = w.asc_putFlipVInvert = w.Zrc;
    w.put_ResetCrop = w.asc_putResetCrop = w.f7e;
    w.get_Title = w.asc_getTitle = w.Oha;
    w.put_Title = w.asc_putTitle = w.UNa;
    w.get_Description = w.asc_getDescription = w.bIa;
    w.put_Description = w.asc_putDescription = w.fwb;
    w.get_ColumnNumber = w.asc_getColumnNumber = w.lrc;
    w.put_ColumnNumber = w.asc_putColumnNumber = w.Urc;
    w.get_ColumnSpace = w.asc_getColumnSpace = w.mrc;
    w.put_ColumnSpace = w.asc_putColumnSpace = w.Vrc;
    w.asc_getSignatureId = w.asc_getSignatureId = w.ZTb;
    w.put_Shadow = w.byf = w.put_shadow = w.Fyf = w.asc_putShadow = w.ksc;
    w.get_Shadow = w.Bkf = w.get_shadow = w.slf = w.asc_getShadow = w.Erc;
    w.put_Anchor = w.Iwf = w.asc_putAnchor = w.Rrc;
    w.get_Anchor = w.ajf = w.asc_getAnchor = w.jrc;
    f.AscCommon.vFb = sb;
    w = sb.prototype;
    w.get_ObjectType = w.asc_getObjectType = w.C3e;
    w.get_ObjectValue = w.asc_getObjectValue = w.D3e;
    f.Asc.asc_CShapeFill = f.Asc.E5a = yb;
    w = yb.prototype;
    w.get_type = w.asc_getType = w.Mx;
    w.put_type = w.asc_putType = w.Pha;
    w.get_fill = w.asc_getFill = w.tJa;
    w.put_fill = w.asc_putFill = w.JTa;
    w.get_transparent = w.asc_getTransparent = w.c5e;
    w.put_transparent = w.asc_putTransparent = w.E7e;
    w.asc_CheckForseSet = w.asc_CheckForseSet = w.erc;
    f.Asc.asc_CFillBlip = f.Asc.E7b = Xe;
    w = Xe.prototype;
    w.get_type = w.asc_getType = w.Mx;
    w.put_type = w.asc_putType = w.Pha;
    w.get_url = w.asc_getUrl = w.aUb;
    w.put_url = w.asc_putUrl = w.WRa;
    w.get_texture_id = w.asc_getTextureId = w.xrd;
    w.put_texture_id = w.asc_putTextureId = w.C7e;
    f.Asc.asc_CFillHatch = f.Asc.LZe = Zh;
    w = Zh.prototype;
    w.get_pattern_type = w.asc_getPatternType = w.M3e;
    w.put_pattern_type = w.asc_putPatternType = w.Z6e;
    w.get_color_fg = w.asc_getColorFg = w.B0e;
    w.put_color_fg = w.asc_putColorFg = w.$5e;
    w.get_color_bg = w.asc_getColorBg = w.A0e;
    w.put_color_bg = w.asc_putColorBg = w.Z5e;
    f.Asc.asc_CFillGrad = f.Asc.Uqd = oh;
    w = oh.prototype;
    w.get_colors = w.asc_getColors = w.K0e;
    w.put_colors = w.asc_putColors = w.a6e;
    w.get_positions = w.asc_getPositions = w.V3e;
    w.put_positions = w.asc_putPositions = w.d7e;
    w.get_grad_type = w.asc_getGradType = w.M1e;
    w.put_grad_type = w.asc_putGradType = w.t6e;
    w.get_linear_angle = w.asc_getLinearAngle = w.P2e;
    w.put_linear_angle = w.asc_putLinearAngle = w.O6e;
    w.get_linear_scale = w.asc_getLinearScale = w.Q2e;
    w.put_linear_scale = w.asc_putLinearScale = w.P6e;
    w.get_path_type = w.asc_getPathType = w.K3e;
    w.put_path_type = w.asc_putPathType = w.Y6e;
    f.Asc.asc_CFillSolid = f.Asc.drc = Xg;
    w = Xg.prototype;
    w.get_color = w.asc_getColor = w.FT;
    w.put_color = w.asc_putColor = w.RZa;
    f.Asc.asc_CStroke = f.Asc.Yqd = ak;
    w = ak.prototype;
    w.get_type = w.asc_getType = w.Mx;
    w.put_type = w.asc_putType = w.Pha;
    w.get_width = w.asc_getWidth = w.cea;
    w.put_width = w.asc_putWidth = w.iwb;
    w.get_color = w.asc_getColor = w.FT;
    w.put_color = w.asc_putColor = w.RZa;
    w.get_linejoin = w.asc_getLinejoin = w.W2e;
    w.put_linejoin = w.asc_putLinejoin = w.Ird;
    w.get_linecap = w.asc_getLinecap = w.T2e;
    w.put_linecap = w.asc_putLinecap = w.Grd;
    w.get_linebeginstyle = w.asc_getLinebeginstyle = w.S2e;
    w.put_linebeginstyle = w.asc_putLinebeginstyle = w.bsc;
    w.get_linebeginsize = w.asc_getLinebeginsize = w.R2e;
    w.put_linebeginsize = w.asc_putLinebeginsize = w.Frd;
    w.get_lineendstyle = w.asc_getLineendstyle = w.V2e;
    w.put_lineendstyle = w.asc_putLineendstyle = w.csc;
    w.get_lineendsize = w.asc_getLineendsize = w.U2e;
    w.put_lineendsize = w.asc_putLineendsize = w.Hrd;
    w.get_canChangeArrows = w.asc_getCanChangeArrows = w.krc;
    w.put_prstDash = w.asc_putPrstDash = w.e7e;
    w.get_prstDash = w.asc_getPrstDash = w.Z3e;
    f.AscCommon.b1c = Yg;
    w = Yg.prototype;
    w.get_colors = w.glf;
    w.get_name = w.dYc;
    f.AscCommon.u8 = yc;
    w = yc.prototype;
    w.get_Type = w.AN;
    w.get_X = w.rBa;
    w.get_Y = w.sBa;
    w.get_Hyperlink = w.nXb;
    w.get_UserId = w.xla;
    w.get_HaveChanges = w.Gjf;
    w.get_LockedObjectType = w.lkf;
    w.get_FootnoteText = w.Cjf;
    w.get_FootnoteNumber = w.Bjf;
    f.Asc.asc_CUserInfo = f.Asc.fsg = Vb;
    w = Vb.prototype;
    w.asc_putId = w.put_Id = w.I7b;
    w.asc_getId = w.get_Id = w.sE;
    w.asc_putFullName = w.put_FullName = w.s6e;
    w.asc_getFullName = w.get_FullName = w.L1e;
    w.asc_putFirstName = w.put_FirstName = w.l6e;
    w.asc_getFirstName = w.get_FirstName = w.TTb;
    w.asc_putLastName = w.put_LastName = w.K6e;
    w.asc_getLastName = w.get_LastName = w.WTb;
    f.Asc.asc_CDocInfo = f.Asc.KZe = ji;
    w = ji.prototype;
    w.get_Id = w.asc_getId = w.sE;
    w.put_Id = w.asc_putId = w.I7b;
    w.get_Url = w.asc_getUrl = w.aUb;
    w.put_Url = w.asc_putUrl = w.WRa;
    w.get_Title = w.asc_getTitle = w.Oha;
    w.put_Title = w.asc_putTitle = w.UNa;
    w.get_Format = w.asc_getFormat = w.E1e;
    w.put_Format = w.asc_putFormat = w.o6e;
    w.get_VKey = w.asc_getVKey = w.f5e;
    w.put_VKey = w.asc_putVKey = w.H7e;
    w.get_UserId = w.asc_getUserId = w.vJa;
    w.get_UserName = w.asc_getUserName = w.YAa;
    w.get_Options = w.asc_getOptions = w.uJa;
    w.put_Options = w.asc_putOptions = w.V6e;
    w.get_CallbackUrl = w.asc_getCallbackUrl = w.b0e;
    w.put_CallbackUrl = w.asc_putCallbackUrl = w.U5e;
    w.get_TemplateReplacement = w.asc_getTemplateReplacement = w.U4e;
    w.put_TemplateReplacement = w.asc_putTemplateReplacement = w.z7e;
    w.get_UserInfo = w.asc_getUserInfo = w.d5e;
    w.put_UserInfo = w.asc_putUserInfo = w.F7e;
    w.get_Token = w.asc_getToken = w.$4e;
    w.put_Token = w.asc_putToken = w.D7e;
    w.get_Mode = w.asc_getMode = w.u3e;
    w.put_Mode = w.asc_putMode = w.R6e;
    w.get_Permissions = w.asc_getPermissions = w.O3e;
    w.put_Permissions = w.asc_putPermissions = w.$6e;
    w.get_Lang = w.asc_getLang = w.D2e;
    w.put_Lang = w.asc_putLang = w.H6e;
    w.get_Encrypted = w.asc_getEncrypted = w.p1e;
    w.put_Encrypted = w.asc_putEncrypted = w.i6e;
    w.get_EncryptedInfo = w.asc_getEncryptedInfo = w.q1e;
    w.put_EncryptedInfo = w.asc_putEncryptedInfo = w.j6e;
    f.AscCommon.ree = Zg;
    w = Zg.prototype;
    w.asc_getType = w.Mx;
    w.asc_getFontsCount = w.C1e;
    w.asc_getCurrentFont = w.V0e;
    w.asc_getImagesCount = w.d2e;
    w.asc_getCurrentImage = w.W0e;
    f.AscCommon.Idc = qc;
    w = qc.prototype;
    w.put_Value = w.kP;
    w.get_Value = w.xQ;
    f.AscCommon.c1c = tn;
    w = tn.prototype;
    w.get_Id = w.F0a;
    w.get_X = w.rBa;
    w.get_Y = w.sBa;
    f.AscCommon.d9a = Hd;
    w = Hd.prototype;
    w.get_Id = w.F0a;
    w.get_Data = w.ujf;
    w.get_W = w.qBa;
    w.get_H = w.b8a;
    f.AscCommon.nLb = If;
    w = If.prototype;
    w.asc_getId = w.asc_getName = w.get_Name = w.oC;
    w.asc_getDisplayName = w.pRd;
    w.asc_getType = w.get_Type = w.Mx;
    w.asc_getImage = w.vrc;
    f.AscCommon.gRd = Sk;
    w = Sk.prototype;
    w.get_Word = w.Xkf;
    w.get_Checked = w.ojf;
    w.get_Variants = w.Wkf;
    f.AscCommon.W1c = function(w, y) {
        this.xg = y;
        this.LHc = !1;
        this.B1b = w;
        "object" === typeof this.B1b && (this.B1b = JSON.stringify(this.B1b));
        this.q4b = {};
        this.image = null;
        this.y1b = e;
        this.height = this.width = 0;
        this.Ui = .3;
        this.zoom = 1;
        this.Ytd = -1;
        this.beb = null;
        this.K2c = function() {
            this.q4b["%user_name%"] = this.xg.YW.userName;
            var f = this.B1b, w;
            for (w in this.q4b)
                this.q4b.hasOwnProperty(w) && (f = f.replace(new RegExp(w,"g"), this.q4b[w]));
            this.beb = {};
            try {
                this.beb = JSON.parse(f)
            } catch (wt) {}
            this.Ui = e == this.beb.transparent ? .3 : this.beb.transparent
        }
        ;
        this.wkb = function() {
            this.LHc && this.zoom != this.Ytd && (this.Ytd = this.zoom,
            this.ytf(this.beb))
        }
        ;
        this.Qh = function(f, w, y, Ma, Ra) {
            this.image && this.LHc && (e == Ma ? (w = w - this.width >> 1,
            y = y - this.height >> 1) : (w = w + (Ma - this.width) / 2 >> 0,
            y = y + (Ra - this.height) / 2 >> 0),
            Ra = f.globalAlpha,
            f.globalAlpha = this.Ui,
            f.drawImage(this.image, w, y),
            f.globalAlpha = Ra)
        }
        ;
        this.H0d = function() {
            var e = document.createElement("canvas");
            e.width = this.image.width;
            e.height = this.image.height;
            var f = e.getContext("2d");
            f.globalAlpha = this.Ui;
            f.drawImage(this.image, 0, 0);
            this.y1b = e.toDataURL("image/png")
        }
        ;
        this.uZd = function() {
            delete this.y1b;
            this.y1b = e
        }
        ;
        this.rZd = function(e, f, w) {
            var y = this.width * Ef.PD / this.zoom
              , Ma = this.height * Ef.PD / this.zoom;
            e.soc = !0;
            e.drawImage(this.y1b, (f - y) / 2, (w - Ma) / 2, y, Ma);
            e.soc = !1
        }
        ;
        this.ytf = function(w) {
            AscFormat.ej(function(w) {
                var y = new AscFormat.fv
                  , Ma = !1
                  , Ra = Wc.editor || editor;
                if (!Ra)
                    return null;
                switch (Ra.Wy) {
                case Ef.bs.Tl:
                    y.Eaa(!0);
                    Ma = !0;
                    break;
                case Ef.bs.$y:
                    y.Eaa(!1);
                    y.Cc(Ra.Fa.Wa.qe[Ra.Fa.Wa.gc]);
                    break;
                case Ef.bs.NK:
                    y.Eaa(!1),
                    y.tC(Ra.td.Yf().mc)
                }
                var Pa = !1;
                Ra.Wy == Ef.bs.Tl && Ra.Fa && Ra.Fa.Wa && (Pa = Ra.Fa.Wa.sL);
                Pa && (Ra.Fa.Wa.sL = !1);
                var Ta = !1;
                Ra.Fa && !Ra.Fa.Wa && (Ta = !0,
                Ra.Fa.Wa = new AscCommonWord.ymb,
                Ra.Fa.xd.Wa = Ra.Fa.Wa);
                y.Hn(!1);
                y.fa = new AscFormat.Dg;
                y.fa.Cc(y);
                y.fa.lC(new AscFormat.oA);
                y.fa.nb.Cc(y.fa);
                y.fa.nb.Aj(0);
                y.fa.nb.Bj(0);
                y.fa.nb.ap(w.width);
                y.fa.nb.lp(w.height);
                y.fa.nb.MG(AscFormat.Rz(w.rotate ? w.rotate * Math.PI / 180 : 0));
                y.fa.YK(AscFormat.qV(w.type));
                w.fill && 3 === w.fill.length && y.fa.xf(AscFormat.WF(w.fill[0], w.fill[1], w.fill[2]));
                if (AscFormat.hb(w["stroke-width"]) || Array.isArray(w.stroke) && 3 === w.stroke.length) {
                    var Xa = Array.isArray(w.stroke) && 3 === w.stroke.length ? AscFormat.WF(w.stroke[0], w.stroke[1], w.stroke[2]) : AscFormat.WF(0, 0, 0);
                    y.fa.vn(AscFormat.rV(Xa, e, e, e, e, AscFormat.hb(w["stroke-width"]) ? w["stroke-width"] : 12700 / 36E3))
                }
                Ma ? y.jta() : y.Yba();
                Xa = w.align;
                e != Xa && y.c0(Xa);
                Array.isArray(w.margins) && 4 === w.margins.length && y.J3a({
                    Ba: w.margins[0],
                    Oa: w.margins[1],
                    Ra: w.margins[2],
                    Ta: w.margins[3]
                });
                Xa = y.Sg();
                w = w.paragraphs;
                0 < w.length && (Xa.aa.length = 0);
                for (var Ia = 0; Ia < w.length; ++Ia) {
                    var qc = w[Ia]
                      , jb = new AscCommonWord.Ua(Xa.sb,Xa,!Ma);
                    AscFormat.hb(qc.align) && jb.UW(qc.align);
                    if (Array.isArray(qc.fill) && 3 === qc.fill.length) {
                        var cb = new AscCommonWord.Gde;
                        cb.pa = Wc.ona;
                        cb.va.r = qc.fill[0];
                        cb.va.vb = qc.fill[1];
                        cb.va.Xa = qc.fill[2];
                        jb.vO(cb, !0)
                    }
                    AscFormat.hb(qc.linespacing) && jb.mM({
                        qc: qc.linespacing,
                        Ji: 0,
                        kg: 0,
                        jj: Wc.rC
                    }, !0);
                    qc = qc.runs;
                    for (cb = 0; cb < qc.length; ++cb) {
                        var Va = qc[cb]
                          , sb = new AscCommonWord.dwa(jb,!1);
                        Array.isArray(Va.fill) && 3 === Va.fill.length && sb.hQ(AscFormat.WF(Va.fill[0], Va.fill[1], Va.fill[2]));
                        var ib = Va["font-family"] ? Va["font-family"] : "Arial"
                          , ob = null != Va["font-size"] ? Va["font-size"] : 50;
                        sb.h9({
                            Ja: ib,
                            za: -1
                        });
                        sb.i9({
                            Ja: ib,
                            za: -1
                        });
                        sb.j9({
                            Ja: ib,
                            za: -1
                        });
                        sb.k9({
                            Ja: ib,
                            za: -1
                        });
                        sb.JV(ob);
                        sb.rwa(!0 === Va.bold);
                        sb.HMa(!0 === Va.italic);
                        sb.GDa(!0 === Va.strikeout);
                        sb.mba(!0 === Va.underline);
                        Va = Va.text;
                        "<%br%>" === Va ? sb.vh(0, new AscCommonWord.wPd(AscCommonWord.atd), !1) : sb.mp(Va);
                        jb.pf(cb, sb, !1)
                    }
                    Xa.pf(Xa.aa.length, jb)
                }
                Ma = Ef.eg.hq;
                Ef.eg.DDa(!1);
                y.Jh();
                y.Lo && y.Fna();
                Ef.eg.DDa(Ma);
                if (f.editor) {
                    var $a = Ra.jr;
                    Ra.jr = !1
                }
                Ef.Nda = !0;
                Ma = new AscFormat.EH;
                Xa = Ef.Se.pu(210 * Ef.NA * this.zoom, !0);
                w = Ef.Se.pu(297 * Ef.NA * this.zoom, !0);
                Ma.te(Xa, w, 210, 297);
                Ma.transform(1, 0, 0, 1, 0, 0);
                Ma.W9b = !0;
                Ma.I2c(y);
                y.Md(Ma, 0);
                Ma.Wec();
                Ia = Ma.Db.tj - Ma.Db.Lh + 1;
                jb = Ma.Db.Cj - Ma.Db.Mh + 1;
                0 >= Ia || 0 >= jb || (this.image || (this.image = document.createElement("canvas")),
                this.image.width = Ia,
                this.image.height = jb,
                this.width = Ia,
                this.height = jb,
                Ia = this.image.getContext("2d"),
                jb = new Ef.GN,
                jb.te(Ia, Xa, w, 210, 297),
                jb.Sv = Ef.gP,
                jb.Gn.Gb = -Ma.Db.Lh,
                jb.Gn.Ff = -Ma.Db.Mh,
                jb.transform(1, 0, 0, 1, 0, 0),
                y.Md(jb, 0),
                Ef.Nda = !1,
                Ta && (Ra.Fa.Wa = null,
                Ra.Fa.xd.Wa = null),
                f.editor && (Ra.jr = $a),
                Pa && (Ra.Fa.Wa.sL = !0))
            }, this, [w])
        }
        ;
        this.XEd = function() {
            this.LHc = !0;
            var e = this.xg;
            switch (e.Wy) {
            case Ef.bs.Tl:
                e.Fa && (e.LP && (e.LP.zoom = e.Fa.io / 100,
                e.LP.wkb()),
                e.Fa.cFb());
                break;
            case Ef.bs.$y:
                e.Fa && (e.LP && (e.LP.zoom = e.Fa.io / 100,
                e.LP.wkb()),
                e.Fa.cFb());
                break;
            case Ef.bs.NK:
                (e = e.td && e.td.Yf()) && e.Hg && e.Hg && e.Hg.Er()
            }
        }
        ;
        this.Hbf = function() {
            this.K2c();
            var f = [], w = this.beb.paragraphs, y, Ma;
            for (y = 0; y < w.length; y++) {
                var Ra = w[y].runs;
                for (Ma = 0; Ma < Ra.length; Ma++)
                    e === Ra[Ma]["font-family"] && (Ra[Ma]["font-family"] = "Arial"),
                    f.push(Ra[Ma]["font-family"])
            }
            for (y = 0; y < f.length; y++)
                f[y] = new AscFonts.dja(AscFonts.Q5.t6b(f[y]),0,"",0,null);
            !1 === Ef.TK.$pb(f) ? this.XEd() : (this.xg.Aia = function() {
                (Wc.editor || editor).LP.XEd()
            }
            ,
            Ef.TK.JRa(f))
        }
    }
    ;
    f.Asc.CPluginVariation = f.Asc.xee = be;
    f.Asc.CPlugin = f.Asc.Qdc = Lf
}
)(window);
"use strict";
(function(f) {
    function e(e) {
        function f() {}
        f.prototype = e;
        return new f
    }
    function Ia(e) {
        this.memory = e
    }
    function $a(e) {
        this.stream = e
    }
    function Va(e, f) {
        this.Ew = null;
        this.data = e;
        this.size = f;
        this.yb = this.ua = 0;
        this.Osc = !1
    }
    function ib(e, f) {
        this.Yb = e;
        this.wc = f
    }
    function y() {
        var e = arguments.length;
        this.Iqc = !0;
        this.rvb = this.svb = !1;
        this.wc = this.Yb = this.id = null;
        this.Nsc = this.Jsc = this.zac = this.Aac = !1;
        this.GEa = null;
        1 == e ? (this.id = arguments[0].toUpperCase(),
        this.rvb = !0,
        this.yod()) : 2 == e ? (this.Yb = arguments[0],
        this.wc = arguments[1],
        this.Apc(),
        this.svb = !0) : 3 == e && (this.Yb = arguments[0] + 1,
        this.wc = arguments[1] + 1,
        this.Apc(),
        this.svb = !0)
    }
    function Ab(e) {
        if (65536 > e)
            return String.fromCharCode(e);
        e -= 65536;
        return String.fromCharCode(55296 | e >> 10 & 1023) + String.fromCharCode(56320 | e & 1023)
    }
    Object.create && Object.create || (Object.create = Object.create = e);
    var Sb = {
        Zkg: -2,
        m6c: -1,
        Eb: 0,
        Fb: 1,
        Zqb: 85
    }
      , kb = {
        VS: 0,
        cf: 1,
        Tid: 2,
        $nc: 3,
        Tg: 4,
        su: 5,
        gk: 6,
        M5c: 7,
        mmg: 8
    }
      , Ta = {
        lf: 0
    }
      , ob = {
        va: 0,
        ic: 1,
        xb: 2,
        pa: 3,
        iva: 4,
        qjd: 5,
        bjd: 6
    }
      , Xa = {
        left: 0,
        top: 1,
        right: 2,
        bottom: 3,
        nCd: 4,
        lCd: 5,
        start: 6,
        end: 7,
        PFg: 8,
        YFg: 9,
        Dsd: 10,
        Gsd: 11
    }
      , kc = {
        left: 0,
        top: 1,
        right: 2,
        bottom: 3,
        gDd: 4,
        uMd: 5,
        PId: 6,
        $sd: 7
    };
    Ia.prototype.qa = function(e, f) {
        this.memory.ra(e);
        this.Ek(f)
    }
    ;
    Ia.prototype.Ek = function(e) {
        var f = this.Qmd();
        e();
        this.Pmd(f)
    }
    ;
    Ia.prototype.Qmd = function() {
        var e = this.memory.ua;
        this.memory.Wm(4);
        return e
    }
    ;
    Ia.prototype.Pmd = function(e) {
        var f = this.memory.ua;
        this.memory.kk(e);
        this.memory.cb(f - e - 4);
        this.memory.kk(f)
    }
    ;
    Ia.prototype.Hwa = function(e) {
        var y = this;
        if (null != e.pa) {
            var Ma = null;
            null != e.va ? Ma = e.va : null != e.ab && (Ma = f.editor.Fa.Wa,
            e.ab.check(Ma.ri(), Ma.kl()),
            Ma = e.ab.Ht(),
            Ma = new f.AscCommonWord.DAa(Ma.R,Ma.G,Ma.B));
            null == Ma || Ma.lf || this.vcb(ob.va, Ma);
            null != e.ic && (this.memory.ra(ob.qjd),
            this.memory.ra(kb.Tg),
            this.vEb(e.ic));
            null != e.xb && (this.memory.ra(ob.bjd),
            this.memory.ra(kb.Tg),
            this.vEb(8 * e.xb));
            if (null != e.ab || null != e.va && e.va.lf)
                this.memory.ra(ob.iva),
                this.memory.ra(kb.gk),
                this.Ek(function() {
                    y.Mub(e.ab, e.va)
                });
            this.memory.ra(ob.pa);
            this.memory.ra(kb.cf);
            this.memory.ra(e.pa)
        }
    }
    ;
    Ia.prototype.Eub = function(e) {
        var f = this;
        null != e.Ba && this.qa(Xa.left, function() {
            f.Hwa(e.Ba)
        });
        null != e.Oa && this.qa(Xa.top, function() {
            f.Hwa(e.Oa)
        });
        null != e.Ra && this.qa(Xa.right, function() {
            f.Hwa(e.Ra)
        });
        null != e.Ta && this.qa(Xa.bottom, function() {
            f.Hwa(e.Ta)
        });
        null != e.sk && this.qa(Xa.nCd, function() {
            f.Hwa(e.sk)
        });
        null != e.fk && this.qa(Xa.lCd, function() {
            f.Hwa(e.fk)
        });
        null != e.Vi && this.qa(Xa.Gsd, function() {
            f.Hwa(e.Vi)
        })
    }
    ;
    Ia.prototype.vcb = function(e, f) {
        this.memory.ra(e);
        this.memory.ra(kb.$nc);
        this.memory.ra(f.r);
        this.memory.ra(f.vb);
        this.memory.ra(f.Xa)
    }
    ;
    Ia.prototype.VSb = function(e) {
        var f = this;
        null != e.pa && (this.memory.ra(0),
        this.memory.ra(kb.cf),
        this.memory.ra(e.pa));
        var y = null;
        null != e.va ? y = e.va : null != e.ab && (y = editor.Fa.Wa,
        e.ab.check(y.ri(), y.kl()),
        y = e.ab.Ht(),
        y = new AscCommonWord.DAa(y.R,y.G,y.B));
        null == y || y.lf || this.vcb(1, y);
        if (null != e.ab || null != e.va && e.va.lf)
            this.memory.ra(2),
            this.memory.ra(kb.gk),
            this.Ek(function() {
                f.Mub(e.ab, e.va)
            })
    }
    ;
    Ia.prototype.nRe = function(e) {
        null != e.nf && (this.memory.ra(kc.gDd),
        this.memory.ra(kb.Tg),
        this.qx(e.nf));
        null != e.wg && (this.memory.ra(kc.uMd),
        this.memory.ra(kb.Tg),
        this.qx(e.wg));
        null != e.R && (this.memory.ra(kc.PId),
        this.memory.ra(kb.Tg),
        this.qx(e.R));
        null != e.B && (this.memory.ra(kc.$sd),
        this.memory.ra(kb.Tg),
        this.qx(e.B))
    }
    ;
    Ia.prototype.PV = function(e) {
        e instanceof AscCommonExcel.u5a ? (null != e.Dd && (this.memory.ra(2),
        this.memory.ra(kb.cf),
        this.memory.ra(e.Dd)),
        null != e.UL && (this.memory.ra(3),
        this.memory.ra(kb.su),
        this.memory.Yr(e.UL))) : (this.memory.ra(0),
        this.memory.ra(kb.Tg),
        this.memory.cb(e.Fu))
    }
    ;
    Ia.prototype.Mub = function(e, f) {
        null != f && f.lf && (this.memory.ra(0),
        this.memory.ra(kb.VS));
        if (null != e && null != e.fill && null != e.fill.color && e.fill.color.color instanceof AscFormat.H$) {
            e = e.fill.color;
            if (null != e.color) {
                f = AscCommonWord.oje;
                var y = f.ZO;
                switch (e.color.id) {
                case 0:
                    y = f.sv;
                    break;
                case 1:
                    y = f.Yv;
                    break;
                case 2:
                    y = f.Zv;
                    break;
                case 3:
                    y = f.$v;
                    break;
                case 4:
                    y = f.tv;
                    break;
                case 5:
                    y = f.Jw;
                    break;
                case 6:
                    y = f.nMd;
                    break;
                case 7:
                    y = f.oMd;
                    break;
                case 8:
                    y = f.pMd;
                    break;
                case 9:
                    y = f.qMd;
                    break;
                case 10:
                    y = f.rMd;
                    break;
                case 11:
                    y = f.fNc;
                    break;
                case 12:
                    y = f.DG;
                    break;
                case 13:
                    y = f.sMd;
                    break;
                case 14:
                    y = f.ZO;
                    break;
                case 15:
                    y = f.Fs;
                    break;
                case 16:
                    y = f.tMd
                }
                this.memory.ra(1);
                this.memory.ra(kb.cf);
                this.memory.ra(y)
            }
            if (null != e.ke)
                for (f = 0,
                y = e.ke.ke.length; f < y; ++f) {
                    var Ma = e.ke.ke[f];
                    "wordTint" == Ma.name ? (this.memory.ra(2),
                    this.memory.ra(kb.cf),
                    this.memory.ra(Math.round(Ma.val))) : "wordShade" == Ma.name && (this.memory.ra(3),
                    this.memory.ra(kb.cf),
                    this.memory.ra(Math.round(Ma.val)))
                }
        }
    }
    ;
    Ia.prototype.DMe = function(e) {
        var f = this;
        null !== e.G$ && this.qa(0, function() {
            f.memory.cb(e.G$)
        });
        e.Mb && null !== e.iR && (this.memory.ra(1),
        this.memory.Rb(e.iR))
    }
    ;
    Ia.prototype.RBb = function(e) {
        return Math.round(AscCommonWord.zgf * e)
    }
    ;
    Ia.prototype.qx = function(e) {
        this.memory.cb(this.RBb(e))
    }
    ;
    Ia.prototype.vEb = function(e) {
        this.memory.cb(Math.round(AscCommonWord.ygf * e))
    }
    ;
    Ia.prototype.uHa = function(e) {
        this.memory.cb(Math.round(AscCommonWord.gxd * e))
    }
    ;
    Ia.prototype.ckb = function(e) {
        this.memory.Nn(Math.round(AscCommonWord.gxd * e))
    }
    ;
    $a.prototype.YY = function(e) {
        var f = this.stream.OG(4);
        if (Sb.Eb != f)
            return f;
        var y = this.stream.Xd();
        f = this.stream.OG(y);
        return Sb.Eb != f ? f : this.$a(y, e)
    }
    ;
    $a.prototype.$a = function(e, f) {
        for (var y = Sb.Eb, Ma = 0; Ma < e; ) {
            this.stream.Osc = !1;
            y = this.stream.qb();
            var Ta = this.stream.Xd();
            Ma + Ta + 5 >= e && (this.stream.Osc = !0);
            y = f(y, Ta);
            if (y === Sb.Fb) {
                if (y = this.stream.Ld(Ta),
                Sb.Eb != y)
                    break
            } else if (y !== Sb.Eb)
                break;
            Ma += Ta + 5
        }
        return y
    }
    ;
    $a.prototype.Of = function(e, f) {
        for (var y = Sb.Eb, Ma = 0; Ma < e; ) {
            y = this.stream.qb();
            var Ta = 2;
            switch (this.stream.qb()) {
            case kb.VS:
                var Xa = 0;
                break;
            case kb.cf:
                Xa = 1;
                break;
            case kb.Tid:
                Xa = 2;
                break;
            case kb.$nc:
                Xa = 3;
                break;
            case kb.Tg:
            case kb.su:
                Xa = 4;
                break;
            case kb.M5c:
                Xa = 8;
                break;
            case kb.Tg:
                Xa = 8;
                break;
            case kb.gk:
                Xa = this.stream.Xd();
                Ta += 4;
                break;
            default:
                return Sb.m6c
            }
            y = f(y, Xa);
            if (y === Sb.Fb) {
                if (y = this.stream.Ld(Xa),
                Sb.Eb != y)
                    break
            } else if (y !== Sb.Eb)
                break;
            Ma += Xa + Ta
        }
        return y
    }
    ;
    $a.prototype.jv = function(e, f) {
        for (var y = Sb.Eb, Ma = 0; Ma < e; ) {
            y = this.stream.qb();
            var Ta = 2;
            switch (this.stream.qb()) {
            case kb.VS:
                var Xa = 0;
                break;
            case kb.cf:
                Xa = 1;
                break;
            case kb.Tid:
                Xa = 2;
                break;
            case kb.$nc:
                Xa = 3;
                break;
            case kb.Tg:
                Xa = 4;
                break;
            case kb.su:
                Xa = 8;
                break;
            case kb.M5c:
                Xa = 8;
                break;
            case kb.Tg:
                Xa = 8;
                break;
            case kb.gk:
                Xa = this.stream.Xd();
                Ta += 4;
                break;
            default:
                return Sb.m6c
            }
            y = f(y, Xa);
            if (y === Sb.Fb) {
                if (y = this.stream.Ld(Xa),
                Sb.Eb != y)
                    break
            } else if (y !== Sb.Eb)
                break;
            Ma += Xa + Ta
        }
        return y
    }
    ;
    $a.prototype.jn = function() {
        var e = 0 | this.stream.qb();
        e |= this.stream.qb() << 8;
        e |= this.stream.qb() << 16;
        e |= this.stream.qb() << 24;
        return e / 1E5
    }
    ;
    $a.prototype.htb = function() {
        var e = this.stream.qb()
          , f = this.stream.qb()
          , y = this.stream.qb();
        return new AscCommonWord.DAa(e,f,y)
    }
    ;
    $a.prototype.VPb = function(e, f, y, Pa) {
        var Ma = Sb.Eb
          , Ta = this;
        switch (e) {
        case 0:
            y.pa = this.stream.qb();
            break;
        case 1:
            y.va = this.htb();
            break;
        case 2:
            Ma = this.Of(f, function(e) {
                return Ta.MPb(e, Pa)
            });
            break;
        default:
            Ma = Sb.Fb
        }
        return Ma
    }
    ;
    $a.prototype.vxe = function(e, f) {
        var y = Sb.Eb;
        1 == e ? f.eu = Ta.lf == this.stream.qb() : 0 == e ? f.Fu = 16777215 & this.stream.Xd() : 2 == e ? f.Dd = this.stream.qb() : 3 == e ? f.UL = this.stream.kr() : y = Sb.Fb;
        return y
    }
    ;
    $a.prototype.MPb = function(e, f) {
        var y = Sb.Eb;
        0 == e ? f.lf = !0 : 1 == e ? f.va = this.stream.mD() : 2 == e ? f.qba = this.stream.mD() : 3 == e ? f.nba = this.stream.mD() : y = Sb.Fb;
        return y
    }
    ;
    $a.prototype.yed = function(e, f, y) {
        var Ma = Sb.Eb;
        0 === e ? y.G$ = this.stream.Xd() : 1 === e ? y.iR = this.stream.Ve(f) : Ma = Sb.Fb;
        return Ma
    }
    ;
    Va.prototype.kk = function(e) {
        if (e > this.size)
            return Sb.Zqb;
        this.ua = e;
        return Sb.Eb
    }
    ;
    Va.prototype.Td = function(e) {
        if (e > this.size)
            return Sb.Zqb;
        this.yb = e;
        return Sb.Eb
    }
    ;
    Va.prototype.Wm = function(e) {
        return 0 > e ? Sb.Zqb : this.kk(this.ua + e)
    }
    ;
    Va.prototype.Ld = function(e) {
        return 0 > e ? Sb.Zqb : this.Td(this.yb + e)
    }
    ;
    Va.prototype.qb = function() {
        return this.yb >= this.size ? 0 : this.data[this.yb++]
    }
    ;
    Va.prototype.Z0 = function() {
        if (this.yb >= this.size)
            return 0;
        var e = this.data[this.yb++];
        127 < e && (e -= 256);
        return e
    }
    ;
    Va.prototype.mD = function() {
        return this.qb()
    }
    ;
    Va.prototype.pb = function() {
        return 0 == this.qb() ? !1 : !0
    }
    ;
    Va.prototype.GRa = function() {
        return this.yb + 1 >= this.size ? 0 : this.data[this.yb++] | this.data[this.yb++] << 8
    }
    ;
    Va.prototype.UZd = function() {
        return AscFonts.AX.V$(this.GRa())
    }
    ;
    Va.prototype.Xd = function() {
        return this.yb + 3 >= this.size ? 0 : this.data[this.yb++] | this.data[this.yb++] << 8 | this.data[this.yb++] << 16 | this.data[this.yb++] << 24
    }
    ;
    Va.prototype.vW = function() {
        return AscFonts.AX.dta(this.Xd())
    }
    ;
    Va.prototype.jb = function() {
        return this.Xd()
    }
    ;
    Va.prototype.Hd = function() {
        return this.Xd()
    }
    ;
    var Cc = new ArrayBuffer(8)
      , Pb = new Uint8Array(Cc)
      , ic = new Float64Array(Cc);
    Va.prototype.kr = function() {
        if (this.yb + 7 >= this.size)
            return 0;
        Pb[0] = this.qb();
        Pb[1] = this.qb();
        Pb[2] = this.qb();
        Pb[3] = this.qb();
        Pb[4] = this.qb();
        Pb[5] = this.qb();
        Pb[6] = this.qb();
        Pb[7] = this.qb();
        return ic[0]
    }
    ;
    Va.prototype.cc = function() {
        var e = this.jb();
        return this.Ve(e)
    }
    ;
    Va.prototype.Ve = function(e) {
        if (this.yb + e > this.size)
            return "";
        for (var f = [], y = 0; y + 1 < e; y += 2)
            f.push(String.fromCharCode(this.data[this.yb + y] | this.data[this.yb + y + 1] << 8));
        this.yb += e;
        return f.join("")
    }
    ;
    Va.prototype.ida = function() {
        var e = this.jb();
        if (this.yb + 2 * e > this.size)
            return "";
        for (var f = "", y = 0; y + 1 < 2 * e; y += 2) {
            var Pa = this.data[this.yb + y];
            Pa |= this.data[this.yb + y + 1] << 8;
            f += String.fromCharCode(Pa)
        }
        this.yb += 2 * e;
        return f
    }
    ;
    Va.prototype.s$b = function() {
        return this.size
    }
    ;
    Va.prototype.OG = function(e) {
        if (this.size - this.ua < e)
            return Sb.Zqb;
        this.yb = this.ua;
        this.ua += e;
        return Sb.Eb
    }
    ;
    Va.prototype.mg = function() {
        var e = 0 | this.qb();
        e |= this.qb() << 8;
        e |= this.qb() << 16;
        e |= this.qb() << 24;
        return e / 1E5
    }
    ;
    Va.prototype.fNb = function(e) {
        for (var f = Array(e), y = 0; y < e; ++y)
            f[y] = this.data[this.yb++];
        return f
    }
    ;
    Va.prototype.aSb = function() {
        var e = new AscCommon.D7;
        e.Ew = this.Ew;
        e.data = this.data;
        e.size = this.size;
        e.ua = this.ua;
        e.yb = this.yb;
        return e
    }
    ;
    Va.prototype.WMb = function(e) {
        this.ua = e.ua;
        this.yb = e.yb
    }
    ;
    Va.prototype.Hnd = function() {
        var e = this.qb();
        if (0 != (e & 128)) {
            var f = this.qb();
            e = e & 127 | (f & 127) << 7
        }
        return e
    }
    ;
    Va.prototype.bpc = function() {
        this.Ld(this.apc())
    }
    ;
    Va.prototype.apc = function() {
        for (var e = 0, f = 0; 4 > f; ++f) {
            var y = this.qb();
            e |= (y & 127) << 7 * f;
            if (0 == (y & 128))
                break
        }
        return e
    }
    ;
    var Bb = new function() {
        this.ZWe = 65;
        this.gTb = [];
        this.NEd = {};
        this.Y7b = function(e) {
            var f = this.gTb[e];
            if (null != f)
                return f;
            if (0 == e)
                return "";
            f = e - 1;
            var y = String.fromCharCode(65 + f % 26);
            return this.gTb[e] = 26 > f ? y : this.Y7b(Math.floor(f / 26)) + y
        }
        ;
        this.fBa = function(e) {
            var f = this.gTb[e];
            if (!f) {
                f = "";
                if (0 < e)
                    for (var y = e, Ma; 0 < y; )
                        Ma = (y - 1) % 26,
                        f = String.fromCharCode(Ma + 65) + f,
                        y = (y - (Ma + 1)) / 26;
                this.gTb[e] = f
            }
            return f
        }
        ;
        this.uVb = function(e) {
            for (var f = 0, y = 0; y < e.length; ++y)
                f = 26 * f + (e.charCodeAt(y) - this.ZWe + 1);
            return f
        }
        ;
        this.Vgf = function(e, f) {
            return Bb.fBa(f + 1) + (e + 1)
        }
        ;
        this.S9 = function(e) {
            var f = this.NEd[e];
            null == f && (f = new y(e),
            this.NEd[e] = f);
            return f
        }
    }
    ;
    ib.prototype.cE = function() {
        this.wc = this.Yb = 0
    }
    ;
    ib.prototype.clone = function() {
        return new ib(this.Yb,this.wc)
    }
    ;
    ib.prototype.isEqual = function(e) {
        return this.Yb === e.Yb && this.wc === e.wc
    }
    ;
    ib.prototype.oS = function() {
        return 0 === this.Yb && 0 === this.wc
    }
    ;
    ib.prototype.getName = function() {
        return Bb.fBa(this.wc + 1) + (this.Yb + 1)
    }
    ;
    y.prototype = Object.create(ib.prototype);
    y.prototype.constructor = y;
    y.prototype.JWe = function(e) {
        return "A" <= e && "Z" >= e
    }
    ;
    y.prototype.yod = function() {
        this.rvb = !0;
        this.Y$(!0, !1);
        this.Apc()
    }
    ;
    y.prototype.Apc = function() {
        this.Iqc = 1 <= this.Yb && 1048576 >= this.Yb ? 1 <= this.wc && 16384 >= this.wc ? !0 : !1 : !1
    }
    ;
    y.prototype.Y$ = function(e, f) {
        if (e && this.rvb) {
            this.rvb = !1;
            e = this.id;
            this.Yb = this.wc = 0;
            f = {};
            for (var y = -1, Ma = 0; -1 != (y = e.indexOf("$", y + 1)); )
                f[y - Ma++] = 1;
            if (2 >= Ma && (0 < Ma && (e = e.replace(/\$/g, "")),
            y = e.length,
            0 < y)) {
                for (var Ta = 0; this.JWe(e.charAt(Ta)) && Ta < y; )
                    Ta++;
                0 == Ta ? (this.Nsc = !0,
                this.wc = 1,
                this.GEa = Bb.fBa(this.wc),
                this.Yb = e.substring(Ta) - 0,
                null != f[0] && (this.Aac = !0,
                Ma--)) : Ta == y ? (this.Jsc = !0,
                this.GEa = e,
                this.wc = Bb.uVb(this.GEa),
                this.Yb = 1,
                null != f[0] && (this.zac = !0,
                Ma--)) : (this.GEa = e.substring(0, Ta),
                this.wc = Bb.uVb(this.GEa),
                this.Yb = e.substring(Ta) - 0,
                null != f[0] && (this.zac = !0,
                Ma--),
                null != f[Ta] && (this.Aac = !0,
                Ma--));
                0 < Ma && (this.Yb = this.wc = 0)
            }
        } else
            f && this.svb && (this.svb = !1,
            this.GEa = Bb.fBa(this.wc),
            this.id = this.Jsc ? this.GEa : this.Nsc ? this.Yb : this.GEa + this.Yb)
    }
    ;
    y.prototype.hC = function() {
        return this.Iqc
    }
    ;
    y.prototype.$3d = function() {
        this.Y$(!1, !0);
        return this.id
    }
    ;
    y.prototype.AE = function() {
        this.Y$(!0, !1);
        return "$" + this.dhf() + "$" + this.oTd()
    }
    ;
    y.prototype.oTd = function() {
        this.Y$(!0, !1);
        return this.Yb
    }
    ;
    y.prototype.kW = function() {
        this.Y$(!0, !1);
        return this.Yb - 1
    }
    ;
    y.prototype.iyd = function() {
        this.Y$(!0, !1);
        return this.Aac
    }
    ;
    y.prototype.Uvc = function() {
        this.Y$(!0, !1);
        return this.Nsc
    }
    ;
    y.prototype.TLf = function() {
        this.Y$(!0, !1);
        return this.wc
    }
    ;
    y.prototype.XT = function() {
        this.Y$(!0, !1);
        return this.wc - 1
    }
    ;
    y.prototype.zxd = function() {
        this.Y$(!0, !1);
        return this.zac
    }
    ;
    y.prototype.Tvc = function() {
        this.Y$(!0, !1);
        return this.Jsc
    }
    ;
    y.prototype.dhf = function() {
        this.Y$(!1, !0);
        return this.GEa
    }
    ;
    y.prototype.NZc = function(e) {
        0 <= this.Yb && 1048576 >= this.Yb || (this.Iqc = !1);
        this.svb = !0;
        this.Yb = e
    }
    ;
    y.prototype.vw = function(e) {
        this.rvb = !0;
        this.id = e;
        this.yod()
    }
    ;
    f.AscCommon = f.AscCommon || {};
    f.AscCommon.Iac = Sb;
    f.AscCommon.YUb = kb;
    f.AscCommon.Qtd = Ta;
    f.AscCommon.X$e = ob;
    f.AscCommon.Y$e = Xa;
    f.AscCommon.Z$e = kc;
    f.AscCommon.Cpb = Ia;
    f.AscCommon.aLb = $a;
    f.AscCommon.Paa = Va;
    f.AscCommon.Y7a = 1048576;
    f.AscCommon.fua = 16384;
    f.AscCommon.hSa = 1048575;
    f.AscCommon.gFa = 16383;
    f.AscCommon.byb = Bb;
    f.AscCommon.yl = ib;
    f.AscCommon.K4a = y;
    f.AscCommon.jf = function(e) {
        return null !== e && "object" === typeof e
    }
    ;
    f.AscCommon.D7 = function(e, f) {
        this.Ew = null;
        this.data = e;
        this.size = f;
        this.yb = this.ua = 0;
        this.kk = function(e) {
            if (e > this.size)
                return 1;
            this.ua = e;
            return 0
        }
        ;
        this.Td = function(e) {
            if (e > this.size)
                return 1;
            this.yb = e;
            return 0
        }
        ;
        this.Wm = function(e) {
            return 0 > e ? 1 : this.kk(this.ua + e)
        }
        ;
        this.Ld = function(e) {
            return 0 > e ? 1 : this.Td(this.yb + e)
        }
        ;
        this.qb = function() {
            return this.yb >= this.size ? 0 : this.data[this.yb++]
        }
        ;
        this.pb = function() {
            return this.yb >= this.size ? 0 : 1 == this.data[this.yb++] ? !0 : !1
        }
        ;
        this.nu = function() {
            return this.yb + 1 >= this.size ? 0 : this.data[this.yb++] | this.data[this.yb++] << 8
        }
        ;
        this.Hd = function() {
            if (this.yb + 3 >= this.size)
                return 0;
            var e = this.data[this.yb++] | this.data[this.yb++] << 8 | this.data[this.yb++] << 16 | this.data[this.yb++] << 24;
            0 > e && (e += 4294967296);
            return e
        }
        ;
        this.jb = function() {
            return this.yb + 3 >= this.size ? 0 : this.data[this.yb++] | this.data[this.yb++] << 8 | this.data[this.yb++] << 16 | this.data[this.yb++] << 24
        }
        ;
        this.ida = function(e) {
            e *= 2;
            if (this.yb + e > this.size)
                return "";
            for (var f = "", y = 0; y < e; y += 2) {
                var Ma = this.data[this.yb + y + 1] << 8 | this.data[this.yb + y];
                if (0 == Ma)
                    break;
                f += String.fromCharCode(Ma)
            }
            this.yb += e;
            return f
        }
        ;
        this.Omb = function(e) {
            if (this.yb + e > this.size)
                return "";
            for (var f = "", y = 0; y < e; y++) {
                var Ma = this.data[this.yb + y];
                if (0 == Ma)
                    break;
                f += String.fromCharCode(Ma)
            }
            this.yb += e;
            return f
        }
        ;
        this.cc = function() {
            var e = this.Hd();
            return this.ida(e)
        }
        ;
        this.o8c = function() {
            var e = this.Hd();
            this.Omb(e)
        }
        ;
        this.OG = function(e) {
            if (this.ua >= this.size || this.size - this.ua < e)
                return 1;
            this.yb = this.ua;
            this.ua += e;
            return 0
        }
        ;
        this.Fh = function() {
            var e = this.Hd();
            this.Ld(e)
        }
        ;
        this.xNb = function() {
            var e = this.cc()
              , f = e.length;
            if (0 == f)
                return null;
            f - 1 == e.indexOf("%") ? (e = parseFloat(e),
            isNaN(e) && (e = null)) : (e = parseFloat(e),
            e = isNaN(e) ? null : e / 1E3);
            return e
        }
    }
    ;
    f.AscCommon.khc = function(e, f) {
        if (e.yb + f > e.size)
            return "";
        var y = "";
        f = e.yb + f;
        for (var Ma; e.yb < f; )
            Ma = e.data[e.yb],
            0 == (Ma & 128) ? (y += Ab(Ma),
            ++e.yb) : 0 == (Ma & 32) ? (Ma = (Ma & 31) << 6 | e.data[e.yb + 1] & 63,
            y += Ab(Ma),
            e.yb += 2) : 0 == (Ma & 16) ? (Ma = (Ma & 15) << 12 | (e.data[e.yb + 1] & 63) << 6 | e.data[e.yb + 2] & 63,
            y += Ab(Ma),
            e.yb += 3) : 0 == (Ma & 8) ? (Ma = (Ma & 7) << 18 | (e.data[e.yb + 1] & 63) << 12 | (e.data[e.yb + 2] & 63) << 6 | e.data[e.yb + 3] & 63,
            y += Ab(Ma),
            e.yb += 4) : 0 == (Ma & 4) ? (Ma = (Ma & 3) << 24 | (e.data[e.yb + 1] & 63) << 18 | (e.data[e.yb + 2] & 63) << 12 | (e.data[e.yb + 3] & 63) << 6 | e.data[e.yb + 4] & 63,
            y += Ab(Ma),
            e.yb += 5) : (Ma = (Ma & 1) << 30 | (e.data[e.yb + 1] & 63) << 24 | (e.data[e.yb + 2] & 63) << 18 | (e.data[e.yb + 3] & 63) << 12 | (e.data[e.yb + 4] & 63) << 6 | e.data[e.yb + 5] & 63,
            y += Ab(Ma),
            e.yb += 6);
        return y
    }
    ;
    f.AscCommon.p0a = 250;
    f.AscCommon.Keb = 251
}
)(window);
"use strict";
(function(f, e) {
    function Ia() {
        return f.JSZipUtils || require("jsziputils")
    }
    function $a() {
        return f.JSZip || require("jszip")
    }
    function Va() {
        this.files = {}
    }
    function ib(e) {
        this.data = e
    }
    function y() {
        this.urls = {};
        this.ENc = {};
        this.klb = "";
        this.QPa = 0
    }
    function Ab() {
        this.znb = !1;
        this.fIa = this.url = this.data = null
    }
    function Sb(e, f, w, y, Ra) {
        var Ma = Ra.index;
        null == Ra.n3b && (!Ra.data || 5242880 >= Ra.data.length) ? y.savetype = AscCommon.WUb.Lge : (0 == Ma ? (y.savetype = AscCommon.WUb.wue,
        Ra.count = Math.ceil(Ra.data.length / 5242880)) : y.savetype = Ma != Ra.count - 1 ? AscCommon.WUb.vue : AscCommon.WUb.Oea,
        Ra.n3b = "string" === typeof Ra.data ? Ra.data.substring(5242880 * Ma, 5242880 * (Ma + 1)) : Ra.data.subarray(5242880 * Ma, 5242880 * (Ma + 1)));
        Ra.index++;
        y.saveindex = Ra.index;
        e(function(Ma, db, Pa) {
            null != Ma && "ok" == Ma.status ? Ra.index < Ra.count ? (y.savekey = Ma.data,
            Sb(e, f, w, y, Ra)) : w && w(Ma, Pa) : w ? w(Ma, Pa) : f(Ma, Pa)
        }, y, Ra)
    }
    function kb(e, f, w) {
        Ud({
            url: e,
            dataType: "text",
            responseType: w,
            success: f,
            error: function() {
                f(null)
            }
        })
    }
    function Ta(e) {
        if ("undefined" !== typeof ArrayBuffer)
            var f = new Uint8Array(e.response);
        else if (AscCommon.Se.aI) {
            e = (new VBArray(e.responseBody)).toArray();
            var w = e.length;
            f = g_memory.oP(w);
            var y = new AscCommon.Paa(f.data,w);
            y.Ew = f.Ew;
            f = y.data;
            for (y = 0; y < w; )
                f[y] = e[y],
                y++
        }
        return f
    }
    function ob(e, f) {
        if (e.length > f.length) {
            for (var w = 0; w < f.length; ++w)
                if (e[w] !== f.charCodeAt(w))
                    return !1;
            return !0
        }
        return !1
    }
    function Xa(e, f) {
        var w = Asc.Gk.pg.QN;
        switch (e) {
        case Xc.pXa:
            w = Asc.Gk.pg.HZ;
            break;
        case Xc.dLe:
        case Xc.eLe:
            w = Asc.Gk.pg.Database;
            break;
        case Xc.ehe:
            w = Asc.Gk.pg.O5c;
            break;
        case Xc.the:
        case Xc.dhe:
            w = Asc.Gk.pg.e4c;
            break;
        case Xc.che:
        case Xc.mhe:
            w = Asc.Gk.pg.Rec;
            break;
        case Xc.ihe:
            w = Asc.Gk.pg.d4c;
            break;
        case Xc.bhe:
        case Xc.hhe:
        case Xc.lhe:
        case Xc.jhe:
        case Xc.vhe:
        case Xc.ohe:
        case Xc.$ge:
            w = AscCommon.Fwb.lH === f ? Asc.Gk.pg.$Lb : Asc.Gk.pg.PIa;
            break;
        case Xc.vld:
            w = Asc.Gk.pg.uld;
            break;
        case Xc.zld:
            w = Asc.Gk.pg.tld;
            break;
        case Xc.roc:
            w = Asc.Gk.pg.gSb;
            break;
        case Xc.WLe:
            w = Asc.Gk.pg.cZa;
            break;
        case Xc.wld:
            w = Asc.Gk.pg.sld;
            break;
        case Xc.yld:
            w = Asc.Gk.pg.qld;
            break;
        case Xc.xld:
            w = Asc.Gk.pg.rld;
            break;
        case Xc.iSb:
            w = Asc.Gk.pg.C6c;
            break;
        case Xc.ncb:
            w = Asc.Gk.pg.ncb;
            break;
        case Xc.aMe:
            w = Asc.Gk.pg.Hic;
            break;
        case Xc.bMe:
            w = Asc.Gk.pg.Hld;
            break;
        case Xc.Storage:
        case Xc.MIe:
        case Xc.OIe:
        case Xc.QIe:
        case Xc.PIe:
        case Xc.LIe:
        case Xc.NIe:
        case Xc.ULe:
        case Xc.kBe:
        case Xc.QN:
            w = Asc.Gk.pg.QN
        }
        return w
    }
    function kc(e) {
        return 55296 <= e && 57343 >= e
    }
    function Cc(e, f) {
        return 56320 > e && 56320 <= f && 57343 >= f ? 65536 + ((e & 1023) << 10) | f & 1023 : null
    }
    function Pb(e) {
        if (65536 > e)
            return String.fromCharCode(e);
        e -= 65536;
        return String.fromCharCode(55296 | e >> 10) + String.fromCharCode(56320 | e & 1023)
    }
    function ic(e) {
        this.OZa = e;
        this.oi = this.OZa.length;
        this.ua = 0
    }
    function Bb(e) {
        this.xu = this.lnb = 0;
        this.BNa = e
    }
    function Ma(e) {
        Oh = e ? e : {
            h: "Headers",
            d: "Data",
            a: "All",
            tr: "This Row",
            t: "Totals"
        };
        return cb()
    }
    function cb() {
        var e = Oh.a
          , f = Oh.h
          , w = Oh.d
          , y = Oh.t
          , Ma = Oh.tr
          , Pa = new XRegExp("(?:\\[\\#" + f + "\\]\\" + Ra.GJa + "\\[\\#" + w + "\\])")
          , Ta = new XRegExp("(?:\\[\\#" + w + "\\]\\" + Ra.GJa + "\\[\\#" + y + "\\])")
          , Xa = new XRegExp("(?:'\\[|'\\]|[^[\\]])+");
        e = new XRegExp("\\#(?:" + e + "|" + f + "|" + y + "|" + w + "|" + Ma + ")|@");
        return XRegExp.build("^(?<tableName>{{tableName}})\\[(?<columnName>{{columnName}})?\\]", {
            tableName: new XRegExp("^(:?[" + ih + "][" + ih + "\\d.]*)"),
            columnName: XRegExp.build("(?<reservedColumn>{{reservedColumn}})|(?<oneColumn>{{userColumn}})|(?<columnRange>{{userColumnRange}})|(?<hdtcc>{{hdtcc}})", {
                userColumn: Xa,
                reservedColumn: e,
                userColumnRange: XRegExp.build("\\[(?<colStart>{{uc}})\\]\\:\\[(?<colEnd>{{uc}})\\]", {
                    uc: Xa
                }),
                hdtcc: XRegExp.build("(?<hdt>\\[{{rc}}\\]|{{hd}}|{{dt}})(?:\\" + Ra.GJa + "(?:\\[(?<hdtcstart>{{uc}})\\])(?:\\:(?:\\[(?<hdtcend>{{uc}})\\]))?)?", {
                    rc: e,
                    hd: Pa,
                    dt: Ta,
                    uc: Xa
                })
            })
        }, "i")
    }
    function jb(e) {
        var f = Ci.t = e.t.toUpperCase();
        e = Ci.f = e.f.toUpperCase();
        return new RegExp("^(" + f + "|" + e + ")([-+*\\/^&%<=>: ;),}]|$)","i")
    }
    function Pa(e) {
        e = e ? e : {
            nil: "#NULL!",
            div: "#DIV/0!",
            value: "#VALUE!",
            ref: "#REF!",
            name: "#NAME\\?",
            num: "#NUM!",
            na: "#N/A",
            getdata: "#GETTING_DATA",
            uf: "#UNSUPPORTED_FUNCTION!"
        };
        lg.nil = e.nil;
        lg.div = e.div;
        lg.value = e.value;
        lg.ref = e.ref;
        lg.name = e.name;
        lg.num = e.num;
        lg.na = e.na;
        lg.getdata = e.getdata;
        lg.uf = e.uf;
        return new RegExp("^(" + lg.nil + "|" + lg.div + "|" + lg.value + "|" + lg.ref + "|" + lg.name + "|" + lg.num + "|" + lg.na + "|" + lg.getdata + "|" + lg.uf + ")","i")
    }
    function Ce(e) {
        var f = e ? e.lastIndexOf(".") : -1;
        return -1 != f ? e.substring(f + 1).toLowerCase() : null
    }
    function cf(e) {
        var f = e ? e.lastIndexOf(".") : -1;
        return -1 != f ? e.substring(0, f) : null
    }
    function ef(e, w, y, Ra) {
        if (AscCommon.Se.LCd && f.emulateUpload)
            f.emulateUpload(function(e, f) {
                "" === f ? Ra(Asc.Gk.pg.QN) : (f = AscFonts.w4c(f),
                f = new Blob([f.data.slice(0, f.size)]),
                f.name = e,
                f.fileName = e,
                e = y([f]),
                Ra(Xa(e), [f]))
            }, ":<iframe><image>");
        else if (w && AscCommon.WD && AscCommon.WD.L1b())
            AscCommon.WD.bZe(Ra);
        else if ("undefined" != typeof FileReader)
            Uc(e, function(e) {
                if (e && e.target && e.target.files) {
                    var f = y(e.target.files);
                    Ra(Xa(f), e.target.files)
                } else
                    Ra(Asc.Gk.pg.QN)
            }).click();
        else
            return !1
    }
    function Ke(e, f, w, y, Ra) {
        var Ma = Xc.pXa;
        if (0 < e.length) {
            y = 0;
            for (var db = e.length; y < db; y++) {
                var Pa = e[y]
                  , Ta = Pa.name;
                if (Ta) {
                    var Xa = !1;
                    Ta = Ce(Ta);
                    if (null !== Ta)
                        for (var Ia = 0, qc = Ra.Xbb.length; Ia < qc; Ia++)
                            if (Ra.Xbb[Ia] == Ta) {
                                Xa = !0;
                                break
                            }
                    0 == Xa && (Ma = f)
                }
                Asc.Gk.pg.HZ == Ma && (Pa = Pa.size) && Ra.Bbd < Pa && (Ma = w);
                if (Xc.pXa != Ma)
                    break
            }
        } else
            Ma = y;
        return Ma
    }
    function mg(e) {
        return Ke(e, Xc.zld, Xc.vld, Xc.roc, xc)
    }
    function Di(e) {
        return Ke(e, Xc.yld, Xc.wld, Xc.xld, w)
    }
    function dh(e) {
        if (!(f.Asc.editor ? f.Asc.editor : f.editor).y8d())
            return !1;
        var w = !1;
        if (e.dataTransfer.types)
            for (var y = 0, Ra = e.dataTransfer.types.length; y < Ra; ++y) {
                var Ma = e.dataTransfer.types[y].toLowerCase();
                if ("files" == Ma) {
                    if (e.dataTransfer.items)
                        for (y = 0,
                        Ra = e.dataTransfer.items.length; y < Ra; y++) {
                            if (Ma = e.dataTransfer.items[y],
                            Ma.type && Ma.kind && "file" == Ma.kind.toLowerCase()) {
                                w = !1;
                                for (var db = 0, Pa = xc.Xbb.length; db < Pa; db++)
                                    if (-1 != Ma.type.indexOf(xc.Xbb[db])) {
                                        w = !0;
                                        break
                                    }
                                if (0 == w)
                                    break
                            }
                        }
                    else
                        w = !0;
                    break
                } else if ("text" == Ma || "text/plain" == Ma || "text/html" == Ma) {
                    w = !0;
                    break
                }
            }
        return w
    }
    function Je() {
        if (!document.getElementById("apiImageUpload")) {
            var e = document.createElement("iframe");
            e.name = "apiImageUpload";
            e.id = "apiImageUpload";
            e.setAttribute("style", "position:absolute;left:-2px;top:-2px;width:1px;height:1px;z-index:-1000;");
            document.body.appendChild(e)
        }
        return f.frames.apiImageUpload
    }
    function Uc(e, f) {
        var w = document.getElementById("apiiuFile");
        w && document.body.removeChild(w);
        w = document.createElement("input");
        w.setAttribute("id", "apiiuFile");
        w.setAttribute("name", "apiiuFile");
        w.setAttribute("type", "file");
        w.setAttribute("accept", e);
        w.setAttribute("style", "position:absolute;left:-2px;top:-2px;width:1px;height:1px;z-index:-1000;cursor:pointer;");
        w.onchange = f;
        document.body.appendChild(w);
        return w
    }
    function kd() {
        this.Mo = this.ku = null
    }
    function Ud(e) {
        var w = "", y = "GET", Ra = !0, Ma = null, db, Pa = null, Ta = null, Xa = null, Ia = "application/x-www-form-urlencoded", qc = "";
        (function(e) {
            "undefined" !== typeof e.url && (w = e.url);
            "undefined" !== typeof e.type && (y = e.type);
            "undefined" !== typeof e.async && (Ra = e.async);
            "undefined" !== typeof e.data && (Ma = e.data);
            "undefined" !== typeof e.dataType && (db = e.dataType);
            "undefined" !== typeof e.error && (Pa = e.error);
            "undefined" !== typeof e.success && (Ta = e.success);
            "undefined" !== typeof e.contentType && (Ia = e.contentType);
            "undefined" !== typeof e.responseType && (qc = e.responseType);
            if (f.XMLHttpRequest)
                Xa = new XMLHttpRequest,
                Xa.overrideMimeType && db && Xa.overrideMimeType(db);
            else if (f.ActiveXObject)
                try {
                    Xa = new ActiveXObject("Msxml2.XMLHTTP")
                } catch (Oe) {
                    try {
                        Xa = new ActiveXObject("Microsoft.XMLHTTP")
                    } catch (Nn) {}
                }
            Xa.onreadystatechange = function() {
                switch (this.readyState) {
                case 4:
                    200 === this.status || 1223 === this.status ? "function" === typeof Ta && Ta(this) : "function" === typeof Pa && Pa(this, this.statusText, this.status)
                }
            }
            ;
            Xa.open(y, w, Ra);
            "POST" === y && Xa.setRequestHeader("Content-Type", Ia);
            qc && (Xa.responseType = qc);
            Xa.send(Ma)
        }
        )(e)
    }
    function de() {
        this.BN = null;
        this.hq = !0;
        this.yU = !1;
        this.EIc = this.FIc = 0
    }
    function sb() {
        this.ea = Hd;
        this.Yl = null
    }
    function yb() {
        this.xU = []
    }
    function Xe(e, f, w, y) {
        this.FQ = e;
        this.MDd = w;
        this.VK = y;
        this.zna = this.sse(e, f, w)
    }
    function Zh(e) {
        return e ? e - 0 : null
    }
    function oh(e) {
        this.R4c = this.Jad = null;
        this.te(e)
    }
    function Xg(w, y, Ra) {
        if (!0 === f.NATIVE_EDITOR_ENJINE || f.Native !== e)
            y();
        else {
            if (f.AscDesktopEditor && f.local_load_add) {
                f.local_load_add({
                    completeLoad: function() {
                        return y()
                    }
                }, "sdk-all-from-min", w);
                var Ma = f.AscDesktopEditor.LoadJS(w);
                2 != Ma && f.local_load_remove(w);
                if (1 == Ma) {
                    setTimeout(y, 1);
                    return
                }
                if (2 == Ma)
                    return
            }
            Ma = new AscCommon.Vbe(AscCommon.Jgf);
            ak(Ma, w, y, Ra)
        }
    }
    function ak(e, f, w, y) {
        var Ra = document.createElement("script");
        Ra.type = "text/javascript";
        Ra.src = f;
        Ra.onload = w;
        Ra.onerror = function() {
            e.W9e(y, function() {
                ak(e, f, w, y)
            })
        }
        ;
        document.head.appendChild(Ra)
    }
    function Yg(e) {
        if (e = AscCommon.dob[e]) {
            var f = new AscFormat.oHb;
            f.name = e.name;
            var w = e.hlf();
            f.be[8] = AscFormat.xX(w.r, w.vb, w.Xa);
            w = e.olf();
            f.be[12] = AscFormat.xX(w.r, w.vb, w.Xa);
            w = e.ilf();
            f.be[9] = AscFormat.xX(w.r, w.vb, w.Xa);
            w = e.plf();
            f.be[13] = AscFormat.xX(w.r, w.vb, w.Xa);
            w = e.$kf();
            f.be[0] = AscFormat.xX(w.r, w.vb, w.Xa);
            w = e.alf();
            f.be[1] = AscFormat.xX(w.r, w.vb, w.Xa);
            w = e.blf();
            f.be[2] = AscFormat.xX(w.r, w.vb, w.Xa);
            w = e.clf();
            f.be[3] = AscFormat.xX(w.r, w.vb, w.Xa);
            w = e.dlf();
            f.be[4] = AscFormat.xX(w.r, w.vb, w.Xa);
            w = e.elf();
            f.be[5] = AscFormat.xX(w.r, w.vb, w.Xa);
            w = e.nlf();
            f.be[11] = AscFormat.xX(w.r, w.vb, w.Xa);
            w = e.jlf();
            f.be[10] = AscFormat.xX(w.r, w.vb, w.Xa);
            return f
        }
        return null
    }
    function yc(e, f) {
        for (var w = 0; w < e.length; ++w)
            if (e[w].isEqual(f))
                return w;
        return -1
    }
    function Ic(e, w, y, Ra) {
        f.Asc.q0a = this;
        this.Uc = w;
        this.xLb = document.getElementById(e);
        this.Dz = document.createElement("canvas");
        this.Dz.style.position = "absolute";
        this.Dz.style.left = "0px";
        this.Dz.style.top = "0px";
        e = parseInt(this.xLb.offsetWidth);
        w = parseInt(this.xLb.offsetHeight);
        0 == e && (e = 300);
        0 == w && (w = 80);
        this.Dz.width = e;
        this.Dz.height = w;
        this.xLb.appendChild(this.Dz);
        this.Image = "";
        this.NWa = null;
        this.Text = "";
        this.lo = "Arial";
        this.xb = 10;
        this.bf = !0;
        this.ud = !1;
        this.od = y;
        this.Tc = Ra;
        this.Kea = null;
        this.fic = !1
    }
    function Vb() {
        this.Nbc = {}
    }
    function ji(e) {
        var f = parseFloat(e);
        return isNaN(f) ? null : (-1 !== e.indexOf("%") ? (e = "%",
        f /= 100) : -1 !== e.indexOf("px") ? (e = "px",
        f *= AscCommon.PD) : -1 !== e.indexOf("in") ? (e = "in",
        f *= AscCommonWord.xgf) : -1 !== e.indexOf("cm") ? (e = "cm",
        f *= 10) : -1 !== e.indexOf("mm") ? e = "mm" : -1 !== e.indexOf("pt") ? (e = "pt",
        f *= AscCommonWord.hxd) : -1 !== e.indexOf("pc") ? (e = "pc",
        f *= AscCommonWord.Agf) : e = "none",
        {
            val: f,
            type: e
        })
    }
    function Zg(e) {
        this.zsc = 0;
        this.cFd = e
    }
    function qc(e, f, w) {
        if (!w)
            return f;
        var y = new Zg(Qi);
        return function() {
            var Ra = y.AEd();
            0 < Ra ? setTimeout(function() {
                w.call(e, e)
            }, Ra) : f && f.apply(e, arguments)
        }
    }
    var tn = AscCommon.Se
      , Hd = AscCommon.yna
      , If = AscCommon.l4
      , Sk = AscCommon.xob
      , be = AscCommon.rIc
      , Lf = AscCommon.sIc
      , Wc = AscCommon.F9
      , Ef = AscCommon.BM
      , Nd = AscCommon.byb
      , ud = Asc.Gnb;
    "function" !== typeof String.prototype.startsWith && (String.prototype.startsWith = function(e) {
        return 0 === this.indexOf(e)
    }
    ,
    String.prototype.startsWith = String.prototype.startsWith);
    "function" !== typeof String.prototype.endsWith && (String.prototype.endsWith = function(e) {
        return -1 !== this.indexOf(e, this.length - e.length)
    }
    ,
    String.prototype.endsWith = String.prototype.endsWith);
    "function" !== typeof String.prototype.repeat && (String.prototype.repeat = function(e) {
        if (null == this)
            throw new TypeError("can't convert " + this + " to object");
        var f = "" + this;
        e = +e;
        e != e && (e = 0);
        if (0 > e)
            throw new RangeError("repeat count must be non-negative");
        if (Infinity == e)
            throw new RangeError("repeat count must be less than infinity");
        e = Math.floor(e);
        if (0 == f.length || 0 == e)
            return "";
        if (268435456 <= f.length * e)
            throw new RangeError("repeat count must not overflow maximum string size");
        for (var w = ""; ; ) {
            1 == (e & 1) && (w += f);
            e >>>= 1;
            if (0 == e)
                break;
            f += f
        }
        return w
    }
    ,
    String.prototype.repeat = String.prototype.repeat);
    "function" !== typeof String.prototype.padStart && (String.prototype.padStart = function(e, f) {
        e >>= 0;
        f = String(f || " ");
        if (this.length > e)
            return String(this);
        e -= this.length;
        e > f.length && (f += f.repeat(e / f.length));
        return f.slice(0, e) + String(this)
    }
    ,
    String.prototype.padStart = String.prototype.padStart);
    Number.isInteger = Number.isInteger || function(e) {
        return "number" === typeof e && Number.isFinite(e) && !(e % 1)
    }
    ;
    Number.isFinite = Number.isFinite || function(e) {
        return "number" === typeof e && isFinite(e)
    }
    ;
    String.prototype.u5b = function(e) {
        return e && e instanceof RegExp ? (e = this.toString().match(e),
        !!(e && 0 < e.length && e[0].length == this.length)) : !1
    }
    ;
    "function" !== typeof require || f.XRegExp || (f.XRegExp = require("xregexp"));
    var Pe = null;
    Va.prototype.loadAsync = function(e, w) {
        var y = this;
        return f["native"] ? new Promise(function(Ra, Ma) {
            var db = w && !0 === w.base64 ? f["native"].ZipOpenBase64(e) : f["native"].ZipOpen(e);
            if (null != db) {
                for (var Pa in db)
                    y.files[Pa] = new ib(db[Pa]);
                Ra(y)
            } else
                Ma(Error("Failed archive"))
        }
        ) : AscCommon.Mhf().loadAsync(e, w).then(function(e) {
            for (var f in e.files)
                y.files[f] = new ib(e.files[f]);
            return y
        })
    }
    ;
    Va.prototype.close = function() {
        f["native"] && f["native"].ZipClose()
    }
    ;
    ib.prototype.async = function(e) {
        if (f["native"]) {
            var w = this;
            return new Promise(function(e, y) {
                var Ra = f["native"].ZipFileAsString(w.data);
                null != Ra ? e(Ra) : y(Error("Failed file in archive"))
            }
            )
        }
        return this.data.async(e)
    }
    ;
    y.prototype = {
        Yla: "media/",
        te: function(e) {
            this.Wwa(e)
        },
        Wwa: function(e) {
            for (var w in e) {
                var y = e[w];
                this.urls[w] = y;
                this.ENc[y] = w;
                this.QPa++
            }
            f.IS_NATIVE_EDITOR && f["native"].setUrlsCount(this.QPa)
        },
        XQd: function(e, f) {
            var w = {};
            w[this.Yla + e] = f;
            this.Wwa(w)
        },
        T9: function(e) {
            return this.kbc(this.Yla + e)
        },
        mca: function(e) {
            if (e && 0 === e.indexOf("data:image"))
                return null;
            (e = this.$eb(e)) && this.Yla == e.substring(0, this.Yla.length) && (e = e.substring(this.Yla.length));
            return e
        },
        d8a: function(e) {
            e && this.Yla == e.substring(0, this.Yla.length) && (e = e.substring(this.Yla.length));
            return e
        },
        kbc: function(e) {
            return this.urls ? this.urls[e] : null
        },
        $eb: function(e) {
            if (this.ENc) {
                var f = this.ENc[e];
                !f && "undefined" !== typeof editor && editor.JH && 0 == e.indexOf(editor.JH.Pkb) && (f = e.substring(editor.JH.Pkb.length));
                return f
            }
            return null
        },
        Ihf: function(e) {
            var f = [], w = cf(e), y;
            for (y in this.urls)
                0 == y.indexOf(this.Yla + w + ".") && this.Yla + e !== y && f.push(this.urls[y]);
            return f
        }
    };
    var Le = new y;
    ic.prototype = {
        aR: function() {
            return this
        },
        GAb: function() {
            return this.ua < this.oi
        },
        value: function() {
            return this.ua >= this.oi ? 0 : this.OZa[this.ua]
        },
        next: function() {
            this.ua++
        },
        position: function() {
            return this.ua
        }
    };
    ic.prototype.check = ic.prototype.GAb;
    Bb.prototype = {
        GAb: function() {
            return this.xu < this.BNa.length
        },
        value: function() {
            if (this.xu >= this.BNa.length)
                return 0;
            var e = this.BNa.charCodeAt(this.xu);
            return AscCommon.DJb(e) && this.BNa.length - 1 != this.xu ? AscCommon.Pac(e, this.BNa.charCodeAt(this.xu + 1)) : e
        },
        next: function() {
            this.xu >= this.BNa.length || (this.lnb++,
            AscCommon.DJb(this.BNa.charCodeAt(this.xu)) ? this.xu == this.BNa.length - 1 ? ++this.xu : this.xu += 2 : ++this.xu)
        },
        position: function() {
            return this.lnb
        }
    };
    Bb.prototype.check = Bb.prototype.GAb;
    String.prototype.aR = function() {
        return new Bb(this)
    }
    ;
    var gc = {
        all: 1,
        data: 2,
        headers: 3,
        S9b: 4,
        fpb: 5,
        $za: 6
    }
      , Oh = null
      , hh = {
        t: "TRUE",
        f: "FALSE"
    }
      , Ci = {}
      , lg = {}
      , Xc = {
        pXa: 0,
        QN: -1,
        kBe: -3,
        dLe: -20,
        eLe: -40,
        Storage: -60,
        MIe: -61,
        OIe: -62,
        QIe: -63,
        PIe: -64,
        LIe: -65,
        NIe: -66,
        $ge: -80,
        ehe: -81,
        vhe: -82,
        the: -83,
        ohe: -84,
        bhe: -86,
        hhe: -87,
        lhe: -88,
        jhe: -89,
        che: -90,
        mhe: -91,
        Zjg: -92,
        ihe: -93,
        dhe: -99,
        ULe: -100,
        vld: -101,
        zld: -102,
        roc: -103,
        WLe: -104,
        wld: -105,
        yld: -106,
        xld: -107,
        iSb: -120,
        ncb: -121,
        aMe: -122,
        bMe: -123
    }
      , xc = {
        Bbd: 25E6,
        Xbb: "jpg jpeg jpe png gif bmp".split(" ")
    }
      , w = {
        Bbd: 104857600,
        Xbb: "docx doc docm dot dotm dotx epub fodt odt ott rtf".split(" ")
    }
      , Ra = {
        D7b: ";",
        iac: ",",
        PFb: ".",
        exd: ",",
        NTb: ";",
        C7b: ",",
        eSa: ".",
        GJa: ","
    }
      , un = [37, 38, 42, 43, 45, 47, 58, 94]
      , ih = "A-Za-z_\u0080-\u0081\u0083\u0085-\u0087\u0089-\u008a\u008c-\u0091\u0093-\u0094\u0096-\u0097\u0099-\u009a\u009c-\u009f\u00a1-\u00a5\u00a7-\u00a8\u00aa\u00ad\u00af-\u00ba\u00bc-\u02b8\u02bb-\u02c1\u02c7\u02c9-\u02cb\u02cd\u02d0-\u02d1\u02d8-\u02db\u02dd\u02e0-\u02e4\u02ee\u0370-\u0373\u0376-\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0523\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0621-\u064a\u066e-\u066f\u0671-\u06d3\u06d5\u06e5-\u06e6\u06ee-\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4-\u07f5\u07fa\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0972\u097b-\u097f\u0985-\u098c\u098f-\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc-\u09dd\u09df-\u09e1\u09f0-\u09f1\u0a05-\u0a0a\u0a0f-\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32-\u0a33\u0a35-\u0a36\u0a38-\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2-\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0-\u0ae1\u0b05-\u0b0c\u0b0f-\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32-\u0b33\u0b35-\u0b39\u0b3d\u0b5c-\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99-\u0b9a\u0b9c\u0b9e-\u0b9f\u0ba3-\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58-\u0c59\u0c60-\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0-\u0ce1\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d28\u0d2a-\u0d39\u0d3d\u0d60-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e3a\u0e40-\u0e4e\u0e81-\u0e82\u0e84\u0e87-\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa-\u0eab\u0ead-\u0eb0\u0eb2-\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edd\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8b\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065-\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10d0-\u10fa\u10fc\u1100-\u1159\u115f-\u11a2\u11a8-\u11f9\u1200-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u1676\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19a9\u19c1-\u19c7\u1a00-\u1a16\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae-\u1baf\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200e\u2010\u2013-\u2016\u2018\u201c-\u201d\u2020-\u2021\u2025-\u2027\u2030\u2032-\u2033\u2035\u203b\u2071\u2074\u207f\u2081-\u2084\u2090-\u2094\u2102-\u2103\u2105\u2107\u2109-\u2113\u2115-\u2116\u2119-\u211d\u2121-\u2122\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2153-\u2154\u215b-\u215e\u2160-\u2188\u2190-\u2199\u21d2\u21d4\u2200\u2202-\u2203\u2207-\u2208\u220b\u220f\u2211\u2215\u221a\u221d-\u2220\u2223\u2225\u2227-\u222c\u222e\u2234-\u2237\u223c-\u223d\u2248\u224c\u2252\u2260-\u2261\u2264-\u2267\u226a-\u226b\u226e-\u226f\u2282-\u2283\u2286-\u2287\u2295\u2299\u22a5\u22bf\u2312\u2460-\u24b5\u24d0-\u24e9\u2500-\u254b\u2550-\u2574\u2581-\u258f\u2592-\u2595\u25a0-\u25a1\u25a3-\u25a9\u25b2-\u25b3\u25b6-\u25b7\u25bc-\u25bd\u25c0-\u25c1\u25c6-\u25c8\u25cb\u25ce-\u25d1\u25e2-\u25e5\u25ef\u2605-\u2606\u2609\u260e-\u260f\u261c\u261e\u2640\u2642\u2660-\u2661\u2663-\u2665\u2667-\u266a\u266c-\u266d\u266f\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2c6f\u2c71-\u2c7d\u2c80-\u2ce4\u2d00-\u2d25\u2d30-\u2d65\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3000-\u3003\u3005-\u3017\u301d-\u301f\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31b7\u31f0-\u321c\u3220-\u3229\u3231-\u3232\u3239\u3260-\u327b\u327f\u32a3-\u32a8\u3303\u330d\u3314\u3318\u3322-\u3323\u3326-\u3327\u332b\u3336\u333b\u3349-\u334a\u334d\u3351\u3357\u337b-\u337e\u3380-\u3384\u3388-\u33ca\u33cd-\u33d3\u33d5-\u33d6\u33d8\u33db-\u33dd\u3400-\u4db5\u4e00-\u9fc3\ua000-\ua48c\ua500-\ua60c\ua610-\ua61f\ua62a-\ua62b\ua640-\ua65f\ua662-\ua66e\ua680-\ua697\ua722-\ua787\ua78b-\ua78c\ua7fb-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua90a-\ua925\ua930-\ua946\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uac00-\ud7a3\ue000-\uf848\uf900-\ufa2d\ufa30-\ufa6a\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe30-\ufe31\ufe33-\ufe44\ufe49-\ufe52\ufe54-\ufe57\ufe59-\ufe66\ufe68-\ufe6b\ufe70-\ufe74\ufe76-\ufefc\uff01-\uff5e\uff61-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc\uffe0-\uffe6"
      , Km = /^ *[-+*\/^&%<=>:] */
      , wt = new XRegExp("^((?:_xlfn.)?[\\p{L}\\d.]+ *)[-+*/^&%<=>:;\\(\\)]")
      , ae = /^(\$?[A-Za-z]+\$?\d+:\$?[A-Za-z]+\$?\d+)(?:[-+*\/^&%<=>: ;),]|$)/
      , ok = /^(([Rr]{1}(\[)?(-?\d*)(\])?)([Cc]{1}(\[)?(-?\d*)(\])?):([Rr]{1}(\[)?(-?\d*)(\])?)([Cc]{1}(\[)?(-?\d*)(\])?))([-+*\/^&%<=>: ;),]|$)/
      , lw = /^(\$?[A-Za-z]+:\$?[A-Za-z]+)(?:[-+*\/^&%<=>: ;),]|$)/
      , ex = /^(([Cc]{1}(\[)?(-?\d*)(\])?(:)?)([Cc]?(\[)?(-?\d*)(\])?))([-+*\/^&%<=>: ;),]|$)/
      , fk = /^(\$?\d+:\$?\d+)(?:[-+*\/^&%<=>: ;),]|$)/
      , il = /^(([Rr]{1}(\[)?(-?\d*)(\])?(:)?)([Rr]?(\[)?(-?\d*)(\])?))([-+*\/^&%<=>: ;),]|$)/
      , en = /^ *(\$?[A-Za-z]{1,3}\$?(\d{1,7}))([-+*\/^&%<=>: ;),]|$)/
      , bv = /^(\$?[A-Za-z]+\$?(\d+))([-+*\/^&%<=>: ;),]|$)/
      , Mm = /^(([Rr]{1}(\[)?(-?\d*)(\])?)([Cc]{1}(\[)?(-?\d*)(\])?))([-+*\/^&%<=>: ;),]|$)/
      , Up = new XRegExp("^(?<name_from>[" + ih + "][" + ih + "\\d.]*)(:(?<name_to>[" + ih + "][" + ih + "\\d.]*))?!","i")
      , yj = new XRegExp("^'(?<name_from>(?:''|[^\\[\\]'\\/*?:])*)(?::(?<name_to>(?:''|[^\\[\\]'\\/*?:])*))?'!")
      , Wm = new XRegExp("^(?<name_from>[" + ih + "\\d][" + ih + "\\d.]*)(:(?<name_to>[" + ih + "\\d][" + ih + "\\d.]*))?!","i");
    new XRegExp("^(?<name_from>[^:]+)(:(?<name_to>[^:]+))?!");
    var Lm = /^ *[+-]?\d*(\d|\.)\d*([eE][+-]?\d+)?/
      , Bu = /^ *\)/
      , zj = /^ *[,;] */
      , Yt = Pa(null)
      , gr = Pa(null)
      , Zt = jb(hh)
      , xs = Zt
      , Mn = /^"((""|[^"])*)"/
      , hr = new function() {
        this.yId = /[A-Z_\u0080-\u0081\u0083\u0085-\u0087\u0089-\u008a\u008c-\u0091\u0093-\u0094\u0096-\u0097\u0099-\u009a\u009c-\u009f\u00a1-\u00a5\u00a7-\u00a8\u00aa\u00ad\u00af-\u00ba\u00bc-\u02b8\u02bb-\u02c1\u02c7\u02c9-\u02cb\u02cd\u02d0-\u02d1\u02d8-\u02db\u02dd\u02e0-\u02e4\u02ee\u0370-\u0373\u0376-\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0523\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0621-\u064a\u066e-\u066f\u0671-\u06d3\u06d5\u06e5-\u06e6\u06ee-\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4-\u07f5\u07fa\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0972\u097b-\u097f\u0985-\u098c\u098f-\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc-\u09dd\u09df-\u09e1\u09f0-\u09f1\u0a05-\u0a0a\u0a0f-\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32-\u0a33\u0a35-\u0a36\u0a38-\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2-\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0-\u0ae1\u0b05-\u0b0c\u0b0f-\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32-\u0b33\u0b35-\u0b39\u0b3d\u0b5c-\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99-\u0b9a\u0b9c\u0b9e-\u0b9f\u0ba3-\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58-\u0c59\u0c60-\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0-\u0ce1\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d28\u0d2a-\u0d39\u0d3d\u0d60-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e3a\u0e40-\u0e4e\u0e81-\u0e82\u0e84\u0e87-\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa-\u0eab\u0ead-\u0eb0\u0eb2-\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edd\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8b\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065-\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10d0-\u10fa\u10fc\u1100-\u1159\u115f-\u11a2\u11a8-\u11f9\u1200-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u1676\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19a9\u19c1-\u19c7\u1a00-\u1a16\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae-\u1baf\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2010\u2013-\u2016\u2018\u201c-\u201d\u2020-\u2021\u2025-\u2027\u2030\u2032-\u2033\u2035\u203b\u2071\u2074\u207f\u2081-\u2084\u2090-\u2094\u2102-\u2103\u2105\u2107\u2109-\u2113\u2115-\u2116\u2119-\u211d\u2121-\u2122\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2153-\u2154\u215b-\u215e\u2160-\u2188\u2190-\u2199\u21d2\u21d4\u2200\u2202-\u2203\u2207-\u2208\u220b\u220f\u2211\u2215\u221a\u221d-\u2220\u2223\u2225\u2227-\u222c\u222e\u2234-\u2237\u223c-\u223d\u2248\u224c\u2252\u2260-\u2261\u2264-\u2267\u226a-\u226b\u226e-\u226f\u2282-\u2283\u2286-\u2287\u2295\u2299\u22a5\u22bf\u2312\u2460-\u24b5\u24d0-\u24e9\u2500-\u254b\u2550-\u2574\u2581-\u258f\u2592-\u2595\u25a0-\u25a1\u25a3-\u25a9\u25b2-\u25b3\u25b6-\u25b7\u25bc-\u25bd\u25c0-\u25c1\u25c6-\u25c8\u25cb\u25ce-\u25d1\u25e2-\u25e5\u25ef\u2605-\u2606\u2609\u260e-\u260f\u261c\u261e\u2640\u2642\u2660-\u2661\u2663-\u2665\u2667-\u266a\u266c-\u266d\u266f\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2c6f\u2c71-\u2c7d\u2c80-\u2ce4\u2d00-\u2d25\u2d30-\u2d65\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3000-\u3003\u3005-\u3017\u301d-\u301f\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31b7\u31f0-\u321c\u3220-\u3229\u3231-\u3232\u3239\u3260-\u327b\u327f\u32a3-\u32a8\u3303\u330d\u3314\u3318\u3322-\u3323\u3326-\u3327\u332b\u3336\u333b\u3349-\u334a\u334d\u3351\u3357\u337b-\u337e\u3380-\u3384\u3388-\u33ca\u33cd-\u33d3\u33d5-\u33d6\u33d8\u33db-\u33dd\u3400-\u4db5\u4e00-\u9fc3\ua000-\ua48c\ua500-\ua60c\ua610-\ua61f\ua62a-\ua62b\ua640-\ua65f\ua662-\ua66e\ua680-\ua697\ua722-\ua787\ua78b-\ua78c\ua7fb-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua90a-\ua925\ua930-\ua946\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uac00-\ud7a3\ue000-\uf848\uf900-\ufa2d\ufa30-\ufa6a\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe30-\ufe31\ufe33-\ufe44\ufe49-\ufe52\ufe54-\ufe57\ufe59-\ufe66\ufe68-\ufe6b\ufe70-\ufe74\ufe76-\ufefc\uff01-\uff5e\uff61-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc\uffe0-\uffe6]/i;
        this.zId = /[\u0001-&(-)+--;->@^`{-\u007f\u0082\u0084\u008b\u0092\u0095\u0098\u009b\u00a0\u00a6\u00a9\u00ab-\u00ac\u00ae\u00bb\u0378-\u0379\u037e-\u0383\u0387\u038b\u038d\u03a2\u0524-\u0530\u0557-\u0558\u055a-\u0560\u0588-\u0590\u05be\u05c0\u05c3\u05c6\u05c8-\u05cf\u05eb-\u05ef\u05f3-\u05ff\u0604-\u0605\u0609-\u060a\u060c-\u060d\u061b-\u061e\u0620\u065f\u066a-\u066d\u06d4\u0700-\u070e\u074b-\u074c\u07b2-\u07bf\u07f7-\u07f9\u07fb-\u0900\u093a-\u093b\u094e-\u094f\u0955-\u0957\u0964-\u0965\u0970\u0973-\u097a\u0980\u0984\u098d-\u098e\u0991-\u0992\u09a9\u09b1\u09b3-\u09b5\u09ba-\u09bb\u09c5-\u09c6\u09c9-\u09ca\u09cf-\u09d6\u09d8-\u09db\u09de\u09e4-\u09e5\u09fb-\u0a00\u0a04\u0a0b-\u0a0e\u0a11-\u0a12\u0a29\u0a31\u0a34\u0a37\u0a3a-\u0a3b\u0a3d\u0a43-\u0a46\u0a49-\u0a4a\u0a4e-\u0a50\u0a52-\u0a58\u0a5d\u0a5f-\u0a65\u0a76-\u0a80\u0a84\u0a8e\u0a92\u0aa9\u0ab1\u0ab4\u0aba-\u0abb\u0ac6\u0aca\u0ace-\u0acf\u0ad1-\u0adf\u0ae4-\u0ae5\u0af0\u0af2-\u0b00\u0b04\u0b0d-\u0b0e\u0b11-\u0b12\u0b29\u0b31\u0b34\u0b3a-\u0b3b\u0b45-\u0b46\u0b49-\u0b4a\u0b4e-\u0b55\u0b58-\u0b5b\u0b5e\u0b64-\u0b65\u0b72-\u0b81\u0b84\u0b8b-\u0b8d\u0b91\u0b96-\u0b98\u0b9b\u0b9d\u0ba0-\u0ba2\u0ba5-\u0ba7\u0bab-\u0bad\u0bba-\u0bbd\u0bc3-\u0bc5\u0bc9\u0bce-\u0bcf\u0bd1-\u0bd6\u0bd8-\u0be5\u0bfb-\u0c00\u0c04\u0c0d\u0c11\u0c29\u0c34\u0c3a-\u0c3c\u0c45\u0c49\u0c4e-\u0c54\u0c57\u0c5a-\u0c5f\u0c64-\u0c65\u0c70-\u0c77\u0c80-\u0c81\u0c84\u0c8d\u0c91\u0ca9\u0cb4\u0cba-\u0cbb\u0cc5\u0cc9\u0cce-\u0cd4\u0cd7-\u0cdd\u0cdf\u0ce4-\u0ce5\u0cf0\u0cf3-\u0d01\u0d04\u0d0d\u0d11\u0d29\u0d3a-\u0d3c\u0d45\u0d49\u0d4e-\u0d56\u0d58-\u0d5f\u0d64-\u0d65\u0d76-\u0d78\u0d80-\u0d81\u0d84\u0d97-\u0d99\u0db2\u0dbc\u0dbe-\u0dbf\u0dc7-\u0dc9\u0dcb-\u0dce\u0dd5\u0dd7\u0de0-\u0df1\u0df4-\u0e00\u0e3b-\u0e3e\u0e4f\u0e5a-\u0e80\u0e83\u0e85-\u0e86\u0e89\u0e8b-\u0e8c\u0e8e-\u0e93\u0e98\u0ea0\u0ea4\u0ea6\u0ea8-\u0ea9\u0eac\u0eba\u0ebe-\u0ebf\u0ec5\u0ec7\u0ece-\u0ecf\u0eda-\u0edb\u0ede-\u0eff\u0f04-\u0f12\u0f3a-\u0f3d\u0f48\u0f6d-\u0f70\u0f85\u0f8c-\u0f8f\u0f98\u0fbd\u0fcd\u0fd0-\u0fff\u104a-\u104f\u109a-\u109d\u10c6-\u10cf\u10fb\u10fd-\u10ff\u115a-\u115e\u11a3-\u11a7\u11fa-\u11ff\u1249\u124e-\u124f\u1257\u1259\u125e-\u125f\u1289\u128e-\u128f\u12b1\u12b6-\u12b7\u12bf\u12c1\u12c6-\u12c7\u12d7\u1311\u1316-\u1317\u135b-\u135e\u1361-\u1368\u137d-\u137f\u139a-\u139f\u13f5-\u1400\u166d-\u166e\u1677-\u167f\u169b-\u169f\u16eb-\u16ed\u16f1-\u16ff\u170d\u1715-\u171f\u1735-\u173f\u1754-\u175f\u176d\u1771\u1774-\u177f\u17d4-\u17d6\u17d8-\u17da\u17de-\u17df\u17ea-\u17ef\u17fa-\u180a\u180f\u181a-\u181f\u1878-\u187f\u18ab-\u18ff\u191d-\u191f\u192c-\u192f\u193c-\u193f\u1941-\u1945\u196e-\u196f\u1975-\u197f\u19aa-\u19af\u19ca-\u19cf\u19da-\u19df\u1a1c-\u1aff\u1b4c-\u1b4f\u1b5a-\u1b60\u1b7d-\u1b7f\u1bab-\u1bad\u1bba-\u1bff\u1c38-\u1c3f\u1c4a-\u1c4c\u1c7e-\u1cff\u1de7-\u1dfd\u1f16-\u1f17\u1f1e-\u1f1f\u1f46-\u1f47\u1f4e-\u1f4f\u1f58\u1f5a\u1f5c\u1f5e\u1f7e-\u1f7f\u1fb5\u1fc5\u1fd4-\u1fd5\u1fdc\u1ff0-\u1ff1\u1ff5\u1fff\u2011-\u2012\u2017\u2019-\u201b\u201e-\u201f\u2022-\u2024\u2031\u2034\u2036-\u203a\u203c-\u2043\u2045-\u2051\u2053-\u205e\u2065-\u2069\u2072-\u2073\u207d-\u207e\u208d-\u208f\u2095-\u209f\u20b6-\u20cf\u20f1-\u20ff\u2150-\u2152\u2189-\u218f\u2329-\u232a\u23e8-\u23ff\u2427-\u243f\u244b-\u245f\u269e-\u269f\u26bd-\u26bf\u26c4-\u2700\u2705\u270a-\u270b\u2728\u274c\u274e\u2753-\u2755\u2757\u275f-\u2760\u2768-\u2775\u2795-\u2797\u27b0\u27bf\u27c5-\u27c6\u27cb\u27cd-\u27cf\u27e6-\u27ef\u2983-\u2998\u29d8-\u29db\u29fc-\u29fd\u2b4d-\u2b4f\u2b55-\u2bff\u2c2f\u2c5f\u2c70\u2c7e-\u2c7f\u2ceb-\u2cfc\u2cfe-\u2cff\u2d26-\u2d2f\u2d66-\u2d6e\u2d70-\u2d7f\u2d97-\u2d9f\u2da7\u2daf\u2db7\u2dbf\u2dc7\u2dcf\u2dd7\u2ddf\u2e00-\u2e2e\u2e30-\u2e7f\u2e9a\u2ef4-\u2eff\u2fd6-\u2fef\u2ffc-\u2fff\u3018-\u301c\u3030\u303d\u3040\u3097-\u3098\u30a0\u3100-\u3104\u312e-\u3130\u318f\u31b8-\u31bf\u31e4-\u31ef\u321f\u3244-\u324f\u32ff\u4db6-\u4dbf\u9fc4-\u9fff\ua48d-\ua48f\ua4c7-\ua4ff\ua60d-\ua60f\ua62c-\ua63f\ua660-\ua661\ua673-\ua67b\ua67e\ua698-\ua6ff\ua78d-\ua7fa\ua82c-\ua83f\ua874-\ua87f\ua8c5-\ua8cf\ua8da-\ua8ff\ua92f\ua954-\ua9ff\uaa37-\uaa3f\uaa4e-\uaa4f\uaa5a-\uabff\ud7a4-\ud7ff\ufa2e-\ufa2f\ufa6b-\ufa6f\ufada-\ufaff\ufb07-\ufb12\ufb18-\ufb1c\ufb37\ufb3d\ufb3f\ufb42\ufb45\ufbb2-\ufbd2\ufd3e-\ufd4f\ufd90-\ufd91\ufdc8-\ufdef\ufdfe-\ufdff\ufe10-\ufe1f\ufe27-\ufe2f\ufe32\ufe45-\ufe48\ufe53\ufe58\ufe67\ufe6c-\ufe6f\ufe75\ufefd-\ufefe\uff00\uff5f-\uff60\uffbf-\uffc1\uffc8-\uffc9\uffd0-\uffd1\uffd8-\uffd9\uffdd-\uffdf\uffe7\uffef-\ufff8\ufffe-\uffff]/ig;
        this.BId = /[,\s-+/^&%<=>]/ig;
        this.AId = /['*\[\]\:/?]/ig;
        this.test = function(f) {
            var w = f.substr(0, 1);
            this.AId.lastIndex = 0;
            this.yId.lastIndex = 0;
            this.zId.lastIndex = 0;
            this.BId.lastIndex = 0;
            if (this.AId.test(f))
                return e;
            if (this.yId.test(w)) {
                if (this.zId.test(f) || this.BId.test(f))
                    return !1;
                f = f.match(en);
                if (null != f) {
                    w = f[1];
                    var y = f[2];
                    if (3 <= f.length && Nd.uVb(w.substr(0, w.length - y.length)) <= AscCommon.fua && parseInt(y) <= AscCommon.Y7a)
                        return !1
                }
                return !0
            }
            return !1
        }
        ;
        return this
    }
      , Kz = /^ +/
      , Rx = new XRegExp("^(?<name>[" + ih + "][" + ih + "\\d.]*)([-+*\\/^&%<=>: ;/\n/),]|$)")
      , Lq = new function() {
        var e = new RegExp("(^([" + ih + "_])([" + ih + "_0-9]*)$)","i");
        this.test = function(f) {
            if (!e.test(f) && "_xlnm.print_area" !== f)
                return !1;
            f = f.match(en);
            if (null != f) {
                var w = f[1];
                var y = f[2];
                if (3 <= f.length && Nd.uVb(w.substr(0, w.length - y.length)) <= AscCommon.fua && parseInt(y) <= AscCommon.Y7a)
                    return !1
            }
            return !0
        }
        ;
        return this
    }
      , dz = /^ *[,;] */
      , mw = /^ *[+-]?\d*(\d|\.)\d*([eE][+-]?\d+)?/
      , $t = /^ *[,;] */
      , Od = /^(mailto:)?([a-z0-9'\._-]+@[a-z0-9\.-]+\.[a-z0-9]{2,4})([a-\u044f\u04510-9\._%+-=\? :&]*)/i
      , uc = /^(((https?)|(ftps?)):\/\/)?([\-\w\u0430-\u044f\u0451]*:?[\-\w\u0430-\u044f\u0451]*@)?(((1[0-9]{2}|2[0-4][0-9]|25[0-5]|[1-9][0-9]|[0-9])\.){3}(1[0-9]{2}|2[0-4][0-9]|25[0-5]|[1-9][0-9]|[0-9]))(:\d+)?(\/[%\-\w\u0430-\u044f\u0451]*(\.[\w\u0430-\u044f\u0451]{2,})?(([\w\u0430-\u044f\u0451\-\.\?\\\/+@&#;:`~=%!,\(\)]*)(\.[\w\u0430-\u044f\u0451]{2,})?)*)*\/?/i
      , xt = /^(((https?)|(ftps?)):\/\/)?([\-\w\u0430-\u044f\u0451]*:?[\-\w\u0430-\u044f\u0451]*@)?(([\-\w\u0430-\u044f\u0451]+\.)+[\w\u0430-\u044f\u0451\-]{2,}(:\d+)?(\/[%\-\w\u0430-\u044f\u0451]*(\.[\w\u0430-\u044f\u0451]{2,})?(([\w\u0430-\u044f\u0451\-\.\?\\\/+@&#;:`'~=%!,\(\)]*)(\.[\w\u0430-\u044f\u0451]{2,})?)*)*\/?)/i
      , Gy = /^(((https?)|(ftps?)):\/\/)([\-\w\u0430-\u044f\u0451]*:?[\-\w\u0430-\u044f\u0451]*@)?(([\-\w\u0430-\u044f\u0451]+)(:\d+)?(\/[%\-\w\u0430-\u044f\u0451]*(\.[\w\u0430-\u044f\u0451]{2,})?(([\w\u0430-\u044f\u0451\-\.\?\\\/+@&#;:`'~=%!,\(\)]*)(\.[\w\u0430-\u044f\u0451]{2,})?)*)*\/?)/i
      , Ir = Ma(null)
      , vn = Ma(null);
    kd.prototype.TV = function() {
        this.Mo = this.ku = null
    }
    ;
    kd.prototype.OCd = function(e, f) {
        this instanceof kd && this.TV();
        for (var w, y = !1, Ra = e.length; f !== Ra; )
            if (w = e.charCodeAt(f),
            -1 !== un.indexOf(w)) {
                this.ku = e[f];
                ++f;
                y = !0;
                break
            } else if (60 <= w && 62 >= w) {
                this.ku = e[f];
                for (++f; f !== Ra; ) {
                    w = e.charCodeAt(f);
                    if (60 > w || 62 < w)
                        break;
                    this.ku += e[f];
                    ++f
                }
                y = !0;
                break
            } else if (32 === w || 10 === w)
                ++f;
            else
                break;
        if (y) {
            for (; f !== Ra; ) {
                w = e.charCodeAt(f);
                if (32 !== w && 10 !== w)
                    break;
                ++f
            }
            this.Mo = f;
            return !0
        }
        return !1
    }
    ;
    kd.prototype.W$f = function(e, f) {
        this instanceof kd && this.TV();
        e = e.substring(f).match(wt);
        return null != e && 2 == e.length ? (this.Mo += e[1].length,
        this.ku = e[1],
        !0) : !1
    }
    ;
    kd.prototype.F_a = function(e, f, w, y) {
        function Ra() {
            if (0 > e) {
                var f = !w && Pa ? Pa.xa + 1 + e : e;
                0 >= f && (f = AscCommon.Y7a + f);
                f += ""
            } else
                f = !w && Pa ? Pa.xa + 1 + e + "" : e + "";
            return f
        }
        function Ma() {
            if (0 > f) {
                var e = !y && Pa ? Pa.ya + 1 + f : f;
                0 >= e && (e = AscCommon.fua + e);
                e = Nd.Y7b(e)
            } else
                e = Nd.Y7b(!y && Pa ? Pa.ya + 1 + f : f);
            return e
        }
        var Pa = AscCommonExcel.cJb;
        var db = "";
        if (null !== e && null !== f) {
            isNaN(e) && (e = 0,
            w = !1);
            isNaN(f) && (f = 0,
            y = !1);
            db = Ma();
            var Ta = Ra();
            y && (db = "$" + db);
            w && (Ta = "$" + Ta);
            db += Ta
        } else
            null !== f ? (isNaN(f) && (f = 0,
            y = !1),
            db = Ma(),
            y && (db = "$" + db)) : null !== e && (isNaN(e) && (e = 0,
            w = !1),
            Ta = Ra(),
            w && (Ta = "$" + Ta),
            db = Ta);
        return db
    }
    ;
    kd.prototype.Abc = function(f, w) {
        function y(f) {
            var w = !0;
            "" === f[9] || f[9] === e || ":" === f[6] && "" !== f[7] && f[7] !== e ? "" !== f[7] && f[7] !== e && ":" !== f[6] ? w = !1 : "" !== f[7] && f[7] !== e || ":" !== f[6] || (w = !1) : w = !1;
            return w
        }
        function Ra(f, w) {
            var y = null;
            f === w && f === e ? y = !0 : "[" === f && "]" === w && (y = !1);
            return y
        }
        this instanceof kd && this.TV();
        w = f.substring(w);
        if (AscCommonExcel.TT)
            if (null !== (f = w.match(ok))) {
                var Ma = Ra(f[3], f[5]);
                w = Ra(f[7], f[9]);
                var Pa = Ra(f[11], f[13]);
                var db = Ra(f[15], f[17]);
                if (null !== Ma && null !== w && null !== Pa && null !== db && (Ma = AscCommon.aV.F_a(parseInt(f[4]), parseInt(f[8]), Ma, w),
                w = AscCommon.aV.F_a(parseInt(f[12]), parseInt(f[16]), Pa, db),
                Nd.S9(Ma).hC() && Nd.S9(w).hC()))
                    return this.Mo += f[1].length,
                    this.ku = f[1],
                    this.jha = Ma + ":" + w,
                    !0
            } else if (null != (f = w.match(ex))) {
                if (y(f) && (Ma = Ra(f[3], f[5]),
                w = Ra(f[8], f[10]),
                null !== Ma && null !== w && (Ma = AscCommon.aV.F_a(null, parseInt(f[4]), null, Ma),
                w = "" !== f[7] ? AscCommon.aV.F_a(null, parseInt(f[9]), null, w) : Ma,
                Nd.S9(Ma).hC() && Nd.S9(w).hC())))
                    return this.Mo += f[1].length,
                    this.ku = f[1],
                    this.jha = Ma + ":" + w,
                    !0
            } else {
                if (null != (f = w.match(il)) && y(f) && (Ma = Ra(f[3], f[5]),
                w = Ra(f[8], f[10]),
                null !== Ma && null !== w && (Ma = AscCommon.aV.F_a(parseInt(f[4]), null, Ma),
                w = "" !== f[7] ? AscCommon.aV.F_a(parseInt(f[9]), null, w) : Ma,
                Nd.S9(Ma).hC() && Nd.S9(w).hC())))
                    return this.Mo += f[1].length,
                    this.ku = f[1],
                    this.jha = Ma + ":" + w,
                    !0
            }
        else if (f = w.match(ae) || w.match(lw) || w.match(fk),
        null != f && (w = f[1].split(":"),
        Nd.S9(w[0]).hC() && Nd.S9(w[1]).hC()))
            return this.Mo += f[1].length,
            this.ku = f[1],
            !0;
        return !1
    }
    ;
    kd.prototype.Hbc = function(f, w, y) {
        this instanceof kd && this.TV();
        var Ra = f.substring(w);
        if (AscCommonExcel.TT) {
            var Ma = Ra.match(Mm);
            if (null != Ma && (Ma[3] === Ma[5] || "[" === Ma[3] && "]" === Ma[5]) && (Ma[7] === Ma[9] || "[" === Ma[7] && "]" === Ma[9]) && (f = Ma[0],
            w = Ma[1],
            y = AscCommon.aV.F_a(parseInt(Ma[4]), parseInt(Ma[8]), !Ma[3], !Ma[7]),
            Nd.S9(y).hC()))
                return this.Mo += -1 < f.indexOf(" ") ? f.length - 1 : w.length,
                this.ku = w,
                this.jha = y,
                !0
        } else if (Ma = Ra.match(en),
        null != Ma) {
            f = Ma[0];
            w = Ma[1];
            if (Nd.S9(w).hC())
                return this.Mo += -1 < f.indexOf(" ") ? f.length - 1 : w.length,
                this.ku = w,
                !0;
            if (y && (Ma = Ra.match(bv),
            (null != Ma || Ma != e) && 3 <= Ma.length))
                return w = Ma[1],
                this.Mo += w.length,
                this.ku = w,
                !0
        }
        return !1
    }
    ;
    kd.prototype.BHc = function(e, f, w) {
        this instanceof kd && this.TV();
        e = e.substring(f);
        f = XRegExp.exec(e, yj) || XRegExp.exec(e, Up);
        !f && w && (f = XRegExp.exec(e, Wm));
        return null != f ? (this.Mo += f[0].length,
        this.ku = f[1],
        [!0, f.name_from ? f.name_from.replace(/''/g, "'") : null, f.name_to ? f.name_to.replace(/''/g, "'") : null]) : [!1, null, null]
    }
    ;
    kd.prototype.gag = function(e, f) {
        this instanceof kd && this.TV();
        e = e.substring(f);
        var w;
        return null == e.match(Bu) && null == e.match($t) && null == e.match(Km) && null != (w = e.match(Kz)) ? (this.Mo += w[0].length,
        this.ku = w[0][0],
        !0) : !1
    }
    ;
    kd.prototype.sob = function(e, f, w) {
        this instanceof kd && this.TV();
        e = e.substring(f).match(w ? Lm : mw);
        return null != e ? (this.ku = e[0].replace(Ra.eSa, Ra.PFb),
        this.Mo += e[0].length,
        !0) : !1
    }
    ;
    kd.prototype.$$f = function(e, f) {
        this instanceof kd && this.TV();
        for (var w, y = !1, Ra = e.length; f !== Ra; )
            if (w = e.charCodeAt(f),
            40 === w) {
                this.ku = e[f];
                ++f;
                y = !0;
                break
            } else if (32 === w)
                ++f;
            else
                break;
        if (y) {
            for (; f !== Ra; ) {
                w = e.charCodeAt(f);
                if (32 !== w)
                    break;
                ++f
            }
            this.Mo = f;
            return !0
        }
        return !1
    }
    ;
    kd.prototype.mag = function(e, f) {
        this instanceof kd && this.TV();
        for (var w, y = !1, Ra = e.length; f !== Ra; )
            if (w = e.charCodeAt(f),
            41 === w) {
                this.ku = e[f];
                ++f;
                y = !0;
                break
            } else if (32 === w)
                ++f;
            else
                break;
        if (y) {
            for (; f !== Ra; ) {
                w = e.charCodeAt(f);
                if (32 !== w)
                    break;
                ++f
            }
            this.Mo = f;
            return !0
        }
    }
    ;
    kd.prototype.N$f = function(e, f) {
        this instanceof kd && this.TV();
        e = e.substring(f).match($t);
        return null != e ? (this.ku = e[0],
        this.Mo += e[0].length,
        !0) : !1
    }
    ;
    kd.prototype.J$f = function(e, f, w) {
        this instanceof kd && this.TV();
        e = e.substring(f).match(w ? zj : dz);
        return null != e ? (this.ku = e[0],
        this.Mo += e[0].length,
        !0) : !1
    }
    ;
    kd.prototype.SOf = function(e, f, w) {
        this instanceof kd && this.TV();
        e = e.substring(f).match(w ? gr : Yt);
        return null != e ? (this.ku = e[0],
        this.Mo += e[0].length,
        !0) : !1
    }
    ;
    kd.prototype.tof = function(e, f, w) {
        this instanceof kd && this.TV();
        e = e.substring(f).match(w ? xs : Zt);
        return null != e ? (this.ku = e[1],
        this.Mo += e[1].length,
        !0) : !1
    }
    ;
    kd.prototype.cPf = function(e, f) {
        this instanceof kd && this.TV();
        e = e.substring(f).match(Mn);
        return null != e ? (this.ku = e[1].replace('""', '"'),
        this.Mo += e[0].length,
        !0) : !1
    }
    ;
    kd.prototype.lUa = function(e, f) {
        this instanceof kd && this.TV();
        e = XRegExp.exec(e.substring(f), Rx);
        if (null != e) {
            if ((e = e.name) && 0 !== e.length && e.toUpperCase() !== Ci.t && e.toUpperCase() !== Ci.f)
                return this.Mo += e.length,
                this.ku = e,
                !0;
            this.ku = e
        }
        return !1
    }
    ;
    kd.prototype.Hof = function(e, f) {
        this instanceof kd && this.TV();
        return (f = this.BHc(e, f)) && f[0] && f[1] && f[1].length ? this.lUa(e, this.Mo) : !1
    }
    ;
    kd.prototype.Z$f = function(e, f) {
        this instanceof kd && this.TV();
        for (var w, y = !1, Ra = e.length; f !== Ra; )
            if (w = e.charCodeAt(f),
            123 === w) {
                this.ku = e[f];
                ++f;
                y = !0;
                break
            } else if (32 === w)
                ++f;
            else
                break;
        if (y) {
            for (; f !== Ra; ) {
                w = e.charCodeAt(f);
                if (32 !== w)
                    break;
                ++f
            }
            this.Mo = f;
            return !0
        }
    }
    ;
    kd.prototype.lag = function(e, f) {
        this instanceof kd && this.TV();
        for (var w, y = !1, Ra = e.length; f !== Ra; )
            if (w = e.charCodeAt(f),
            125 === w) {
                this.ku = e[f];
                ++f;
                y = !0;
                break
            } else if (32 === w)
                ++f;
            else
                break;
        if (y) {
            for (; f !== Ra; ) {
                w = e.charCodeAt(f);
                if (32 !== w)
                    break;
                ++f
            }
            this.Mo = f;
            return !0
        }
    }
    ;
    kd.prototype.$T = function(e, f, w) {
        this instanceof kd && this.TV();
        e = XRegExp.exec(e.substring(f), w ? vn : Ir);
        return null != e && e.tableName ? (this.ku = e[0],
        this.Mo += e[0].length,
        e) : !1
    }
    ;
    kd.prototype.Ena = function(e) {
        var f = this.BHc(e, 0);
        if (f && !0 === f[0]) {
            var w = f[1]
              , y = null !== this.Mo ? this.Mo : e.indexOf("!") + 1;
            if ((this.Abc(e, y) || this.Hbc(e, y)) && this.ku.length == e.substring(y).length)
                return {
                    sheet: w,
                    S3a: f[2],
                    Zg: this.ku
                }
        }
        return null
    }
    ;
    kd.prototype.zE = function(f, w) {
        f = f.split(":");
        var y = f[0];
        f = f[1] === e ? y : f[1];
        if (hr.test(y) && hr.test(f))
            return (y !== f ? y + ":" + f : y) + "!" + w;
        y = y.replace(/'/g, "''");
        f = f.replace(/'/g, "''");
        return "'" + (y !== f ? y + ":" + f : y) + "'!" + w
    }
    ;
    kd.prototype.fob = function(e) {
        return hr.test(e) ? e : "'" + e.replace(/'/g, "''") + "'"
    }
    ;
    kd.prototype.N2d = function(e, f, w, y, Ra, Ma, Pa) {
        var db, Ta, Xa;
        Asc.I5a.Vn === w ? (y && (db = ys.Ena(y)),
        db && (Xa = e.mta(db.sheet)) && (Ta = AscCommonExcel.QH.HO(db.Zg))) : Ta = AscCommonExcel.QH.HO(y);
        if (!Ta)
            return Asc.Gk.pg.i$b;
        if (Ra)
            if (Asc.I5a.Vn === w)
                if (Ma ? (e = Ta.Ya - Ta.xa + 1,
                Ta = Ta.Za - Ta.ya + 1) : (e = Ta.Za - Ta.ya + 1,
                Ta = Ta.Ya - Ta.xa + 1),
                Asc.Mk.I6 === Pa) {
                    if (Pa = new Asc.jna,
                    Pa.Tib(Asc.Mk.I6),
                    Pa.Wlb(y),
                    Pa.Lib(!Ma),
                    y = AscFormat.JWb(Xa, Pa).ib,
                    4 !== y.length || !y[0].Jc || !y[0].Jc.mk || 4 > y[0].Jc.mk.length)
                        return Asc.Gk.pg.ORb
                } else {
                    if (255 < e)
                        return Asc.Gk.pg.mjc;
                    if (4096 < Ta)
                        return Asc.Gk.pg.zbd
                }
            else if (Asc.I5a.bke === w) {
                if (!0 === f.Yf().mc.ao.kag(Ta))
                    return Asc.Gk.pg.BEb;
                if (f.Yf().zbc(Ta, !0, !0))
                    return Asc.Gk.pg.$Oc
            } else if (Asc.I5a.bFf === w) {
                if (y = f.Yf().I1f(Ta),
                null !== y)
                    return y
            } else if (Asc.I5a.Eie === w && (y = f.Yf().D4f(Ta, Ma),
            null !== y))
                return y;
        return Asc.Gk.pg.HZ
    }
    ;
    kd.prototype.BRf = function(e) {
        e != Ra.PFb ? (Ra.eSa = e,
        Ra.NTb = ";",
        Ra.C7b = "\\",
        Ra.GJa = ";",
        Lm = new RegExp("^ *[+-]?\\d*(\\d|\\" + Ra.eSa + ")\\d*([eE][+-]?\\d+)?"),
        zj = new RegExp("^ *[" + Ra.NTb + "\\" + Ra.C7b + "] *")) : (Ra.NTb = Ra.D7b,
        Ra.C7b = Ra.iac,
        Ra.eSa = Ra.PFb,
        Ra.GJa = Ra.exd,
        Lm = new RegExp("^ *[+-]?\\d*(\\d|\\" + Ra.PFb + ")\\d*([eE][+-]?\\d+)?"),
        zj = new RegExp("^ *[" + Ra.D7b + "\\" + Ra.iac + "] *"));
        vn = cb()
    }
    ;
    kd.prototype.VLf = function(e) {
        switch (e.toLowerCase()) {
        case "#" + Oh.a.toLocaleLowerCase():
        case "#All".toLocaleLowerCase():
            e = gc.all;
            break;
        case "#" + Oh.d.toLocaleLowerCase():
        case "#Data".toLocaleLowerCase():
            e = gc.data;
            break;
        case "#" + Oh.h.toLocaleLowerCase():
        case "#Headers".toLocaleLowerCase():
            e = gc.headers;
            break;
        case "#" + Oh.t.toLocaleLowerCase():
        case "#Totals".toLocaleLowerCase():
            e = gc.S9b;
            break;
        case "#" + Oh.tr.toLocaleLowerCase():
        case "@".toLocaleLowerCase():
        case "#This Row".toLocaleLowerCase():
            e = gc.fpb;
            break;
        default:
            e = gc.data
        }
        return e
    }
    ;
    kd.prototype.T7f = function(e, f) {
        switch (e) {
        case gc.all:
            return f ? "#" + Oh.a : "#All";
        case gc.data:
            return f ? "#" + Oh.d : "#Data";
        case gc.headers:
            return f ? "#" + Oh.h : "#Headers";
        case gc.S9b:
            return f ? "#" + Oh.t : "#Totals";
        case gc.fpb:
            return f ? "#" + Oh.tr : "#This Row"
        }
        return null
    }
    ;
    var ys = new kd
      , Gf = new function() {
        this.map = {};
        this.QIc = {};
        this.value = function(e) {
            var f = this.map[e];
            AscCommon.Se.Qx && this.QIc[e] && (f = this.QIc[e]);
            return f ? f : e
        }
        ;
        this.register = function(e, w, y, Ra) {
            tn.aI || tn.BCd ? (this.map[e] = "url(../../../../sdkjs/common/Images/cursors/" + w + ".cur), " + Ra,
            this.QIc[e] = "url(../../../../sdkjs/common/Images/cursors/" + w + "_2x.cur), " + Ra) : this.map[e] = f.opera ? Ra : AscCommon.Se.EBa || AscCommon.Se.rSa ? "-webkit-image-set(url(../../../../sdkjs/common/Images/cursors/" + w + ".png) 1x, url(../../../../sdkjs/common/Images/cursors/" + w + "_2x.png) 2x) " + y + ", " + Ra : "url('../../../../sdkjs/common/Images/cursors/" + w + ".svg') " + y + ", url('../../../../sdkjs/common/Images/cursors/" + w + ".png') " + y + ", " + Ra
        }
    }
    ;
    Gf.register("de-formatpainter", "text_copy", "2 11", "pointer");
    de.prototype.zg = function() {
        if (!0 === this.hq || null === this.BN)
            return this.FIc++,
            "" + this.FIc;
        this.EIc++;
        return "" + this.BN + "_" + this.EIc
    }
    ;
    de.prototype.Z6b = function(e) {
        this.BN = e
    }
    ;
    de.prototype.DDa = function(e) {
        this.hq = e
    }
    ;
    de.prototype.yg = function() {
        this.BN = null;
        this.hq = !0;
        this.EIc = this.FIc = 0
    }
    ;
    sb.prototype.Hi = function() {
        return this.ea
    }
    ;
    sb.prototype.mH = function(e, f) {
        e === Hd && (this.Yl = null);
        this.ea = e;
        var w = editor;
        e = w.Fa.Wa;
        if (0 != f && e) {
            f = e.sb;
            f.TD();
            f.QG();
            if (w.Wy === AscCommon.bs.$y) {
                var y = e.qe[e.gc];
                y && y.eT && y.eT.Jf === this && f.aFb(e.gc, y.Ekb, y.ryb())
            }
            var Ra = w.VZe();
            w = [];
            f = 0;
            for (y = Ra.length; f < y; ++f)
                w.push(Ra[f].Element);
            Ra = !1;
            f = 0;
            for (y = w.length; f < y; ++f)
                if (w[f].HHa() === this) {
                    Ra = !0;
                    break
                }
            Ra && (e.xq.tge(),
            e.Ie(!1))
        }
    }
    ;
    sb.prototype.En = function(e) {
        this.ea === If ? AscCommon.Kd.NW(!1) : this.ea === Sk || this.ea === be || this.ea === Lf ? AscCommon.Kd.NW(!0) : AscCommon.Kd.NW(e)
    }
    ;
    sb.prototype.Jf = function(e) {
        Hd === this.ea && (!0 === e ? this.ea = If : (!0).ea = Sk)
    }
    ;
    sb.prototype.O8 = function() {
        return Hd != this.ea && If != this.ea ? !0 : !1
    }
    ;
    sb.prototype.Z6b = function(e) {
        this.Yl = e
    }
    ;
    sb.prototype.AZ = function() {
        return be === this.ea || Lf === this.ea ? !0 : !1
    }
    ;
    yb.prototype.ia = function(e) {
        this.xU.push(e)
    }
    ;
    yb.prototype.qGf = function(e) {
        for (var f = 0, w = this.xU.length; f < w; ++f)
            if (this.xU[f].VK === e) {
                this.xU.splice(f, 1);
                break
            }
    }
    ;
    yb.prototype.yg = function() {
        this.xU.length = 0
    }
    ;
    yb.prototype.En = function(e, f) {
        var w = f;
        f = this.xU.length;
        for (var y = 0; y < f; y++)
            if (w = this.xU[y].$fe(e, w),
            !1 === w)
                return !1;
        return w
    }
    ;
    yb.prototype.jka = function() {
        for (var e = this.xU.length, f = 0; f < e; f++)
            this.xU[f].HPd()
    }
    ;
    Xe.prototype.HPd = function() {
        var e = AscCommon.History.eda
          , f = e.ua;
        this.VK.ob.jA = !0;
        this.VK.ob.Vm = this.zna;
        e.Rb(this.VK.Na.rb());
        e.cb(this.VK.ob.ea);
        this.VK.ob.se(e);
        e = e.ua - f;
        this.VK.WUa.Qa = f;
        this.VK.WUa.c7a = e
    }
    ;
    Xe.prototype.$fe = function(e, f) {
        if (Wc === e)
            for (e = 0; e < this.MDd; e++)
                !1 !== this.zna[e] && (f <= this.zna[e] ? this.zna[e]++ : Wc === this.FQ ? f++ : f--);
        else
            for (e = 0; e < this.MDd; e++)
                if (!1 !== this.zna[e])
                    if (f < this.zna[e])
                        this.zna[e]--;
                    else if (f > this.zna[e])
                        Wc === this.FQ ? f++ : f--;
                    else {
                        if (AscCommon.G9 === this.FQ)
                            return this.zna[e] = !1;
                        f++
                    }
        return f
    }
    ;
    Xe.prototype.sse = function(e, f, w) {
        var y = [];
        if (Wc === e)
            for (e = 0; e < w; e++)
                y[e] = f + e;
        else
            for (e = 0; e < w; e++)
                y[e] = f;
        return y
    }
    ;
    var eo = {}
      , Xs = 0;
    oh.prototype.te = function(e) {
        var f = e >> 16 & 255
          , w = e >> 8 & 255;
        e &= 255;
        var y = Math.max(0, Math.min(255, .299 * f + .587 * w + .114 * e))
          , Ra = Math.max(0, Math.min(255, 128 - .168736 * f - .331264 * w + .5 * e))
          , Ma = Math.max(0, Math.min(255, 128 + .5 * f - .418688 * w - .081312 * e));
        63 < y && (y = 63);
        var Pa = Math.max(0, Math.min(255, y + 1.402 * (Ma - 128))) | 0;
        Ma = Math.max(0, Math.min(255, y - .34414 * (Ra - 128) - .71414 * (Ma - 128))) | 0;
        y = Math.max(0, Math.min(255, y + 1.772 * (Ra - 128))) | 0;
        this.Jad = new Ef(f,w,e,255);
        this.R4c = new Ef(Pa,Ma,y,255)
    }
    ;
    var Aj = new de;
    f.Asc.q0a = null;
    Ic.prototype.Teb = function() {
        return null == this.Kea ? this.Dz : this.Kea
    }
    ;
    Ic.prototype.Jhf = function() {
        if (!this.hC())
            return ["", ""];
        this.Kea = document.createElement("canvas");
        this.Kea.width = this.od * AscCommon.NA;
        this.Kea.height = this.Tc * AscCommon.NA;
        "" != this.Text ? this.CJa() : this.drawImage();
        var e = [];
        e.push(this.Kea.toDataURL("image/png"));
        var f = this.Kea.getContext("2d");
        f.strokeStyle = "#FF0000";
        f.lineWidth = 2;
        f.moveTo(0, 0);
        f.lineTo(this.Kea.width, this.Kea.height);
        f.moveTo(0, this.Kea.height);
        f.lineTo(this.Kea.width, 0);
        f.stroke();
        e.push(this.Kea.toDataURL("image/png"));
        this.Kea = null;
        return e
    }
    ;
    Ic.prototype.pBf = function(e, w, y, Ra, Ma) {
        this.fic ? this.Text = e : (this.Image = "",
        this.NWa = null,
        this.Text = e,
        this.lo = w,
        this.xb = y,
        this.bf = Ra,
        this.ud = Ma,
        this.fic = !0,
        AscFonts.tp.UTa(this.Text, this, function() {
            this.fic = !1;
            var e = AscCommon.TK
              , y = AscFonts.Q5.Zma(w);
            !1 === e.FH(y, function() {
                f.Asc.q0a.Uc.$x(Asc.vE.tP, Asc.OH.FH);
                f.Asc.q0a.CJa()
            }) && this.CJa()
        }))
    }
    ;
    Ic.prototype.CJa = function() {
        var e = this.Uc.Ex
          , f = this.Uc.jr;
        this.Uc.Ex = !0;
        this.Uc.jr = !1;
        AscFormat.ej(AscCommon.eje, this, []);
        this.Uc.Ex = e;
        this.Uc.jr = f
    }
    ;
    Ic.prototype.drawImage = function() {
        var e = this.Teb()
          , f = e.width
          , w = e.height;
        e = e.getContext("2d");
        e.clearRect(0, 0, f, w);
        var y = this.NWa.width / this.NWa.height;
        if (f / w > y) {
            var Ra = w;
            var Ma = y * Ra >> 0;
            w = 0;
            f = f - Ma >> 1
        } else
            Ma = f,
            Ra = Ma / y >> 0,
            f = 0,
            w = w - Ra >> 1;
        e.drawImage(this.NWa, f, w, Ma, Ra)
    }
    ;
    Ic.prototype.$zf = Ic.prototype.selectImage = function() {
        this.Text = "";
        f.AscDesktopEditor.OpenFilenameDialog("images", !1, function(e) {
            Array.isArray(e) && (e = e[0]);
            if ("" != e) {
                var w = f.Asc.q0a;
                w.Image = f.AscDesktopEditor.GetImageBase64(e);
                w.NWa = new Image;
                w.NWa.onload = function() {
                    f.Asc.q0a.drawImage()
                }
                ;
                w.NWa.src = w.Image;
                w = null
            }
        })
    }
    ;
    Ic.prototype.hC = function() {
        return "" != this.Image || "" != this.Text
    }
    ;
    Ic.prototype.dSa = function() {
        f.Asc.q0a.xLb.removeChild(this.Dz);
        delete f.Asc.q0a
    }
    ;
    AscCommon.Yoa = {
        n$a: 0,
        Jqb: 1
    };
    AscCommon.WD = new function() {
        this.T_ = !1;
        this.v9 = [];
        this.VRa = [];
        this.Jxa = null;
        this.J1b = !1;
        this.vvd = 0;
        this.KHc = this.h6 = !1;
        this.heb = f.AscDesktopEditor && f.AscDesktopEditor.GetEncryptedHeader ? f.AscDesktopEditor.GetEncryptedHeader() : "ENCRYPTED;";
        this.yuc = this.heb.length;
        this.Wy = null;
        this.YBb = -1;
        this.Fbc = !1;
        this.te = function() {
            this.T_ = !0
        }
        ;
        this.e8 = function() {
            return this.T_
        }
        ;
        this.e2a = function() {
            return f.gj && !f.gj.Qof() || !f.AscDesktopEditor || this.h6 ? !1 : 2 == this.vvd ? !0 : 0 === f.AscDesktopEditor.CryptoMode ? !1 : !0
        }
        ;
        this.L1b = function() {
            return this.e2a() && this.Fbc
        }
        ;
        this.bZe = function(e) {
            var w = this;
            f.AscDesktopEditor.OpenFilenameDialog("images", !0, function(y) {
                Array.isArray(y) || (y = [y]);
                if (0 != y.length) {
                    for (var Ra = [], Ma = {
                        PHc: !0,
                        D9: e,
                        ext: []
                    }, Pa = 0; Pa < y.length; Pa++)
                        Ra.push(f.AscDesktopEditor.GetImageBase64(y[Pa], !0)),
                        Ma.ext.push(AscCommon.Ugc(y[Pa]));
                    w.CUa(this, Ra, AscCommon.Yoa.n$a, Ma)
                }
            })
        }
        ;
        this.cZe = function(e, w) {
            var y = f.Asc.editor ? f.Asc.editor : f.editor;
            y.$G(Asc.vE.Gs, Asc.OH.MK);
            var Ra = this;
            f.AscDesktopEditor.DownloadFiles(e, [], function(e) {
                y.$x(Asc.vE.Gs, Asc.OH.MK);
                y.$G(Asc.vE.Gs, Asc.OH.rda);
                var Ma = [], Pa = {
                    PHc: !0,
                    Uof: !0,
                    D9: w,
                    ext: [],
                    xg: y
                }, db;
                for (db in e)
                    Ma.push(f.AscDesktopEditor.GetImageBase64(e[db], !0)),
                    Pa.ext.push(f.AscDesktopEditor.GetImageFormat(e[db])),
                    f.AscDesktopEditor.RemoveFile(e[db]);
                Ra.CUa(this, Ma, AscCommon.Yoa.n$a, Pa)
            })
        }
        ;
        this.QJc = function() {
            (f.Asc.editor ? f.Asc.editor : f.editor).Oe("asc_onError", Asc.Gk.pg.V4c, Asc.Gk.Lk.IU)
        }
        ;
        this.Ktc = function() {
            null == this.Wy && (this.Wy = (f.Asc.editor ? f.Asc.editor : f.editor).Wy)
        }
        ;
        this.hff = function(e, f, w) {
            this.CUa(this, [w], AscCommon.Yoa.Jqb, {
                CCd: !0,
                src: e,
                fE: f
            })
        }
        ;
        this.Xqf = function() {
            this.YBb = setTimeout(function() {
                AscCommon.WD.CUa(e, e);
                this.YBb = -1
            }, 10)
        }
        ;
        this.CUa = function(w, y, Ra, Ma) {
            this.e2a() ? (e !== Ra && this.v9.push({
                sender: w,
                type: Ra,
                data: y,
                options: Ma
            }),
            0 != this.v9.length && (e === Ra || 1 == this.v9.length && this.J1b) && (e !== Ra && -1 != this.YBb && (clearTimeout(this.YBb),
            this.YBb = -1),
            AscCommon.Yoa.n$a == this.v9[0].type ? this.v9[0].options && this.v9[0].options.PHc ? f.gj.Lya({
                type: "encryptData",
                data: this.v9[0].data
            }) : f.gj.Lya({
                type: "encryptData",
                data: JSON.parse(this.v9[0].data.changes)
            }) : AscCommon.Yoa.Jqb == this.v9[0].type && (this.v9[0].options && this.v9[0].options.CCd ? f.gj.Lya({
                type: "decryptData",
                data: this.v9[0].data
            }) : f.gj.Lya({
                type: "decryptData",
                data: this.v9[0].data.changes
            })))) : AscCommon.Yoa.n$a == Ra ? w.UV(y, !0) : AscCommon.Yoa.Jqb == Ra && (this.xCd(y.changes) ? this.QJc() : w.r7b(y, !0))
        }
        ;
        this.azf = function(e) {
            var w = e.data;
            if (e.check) {
                if (this.Jxa) {
                    this.KHc = !0;
                    this.Ktc();
                    if (this.Wy == AscCommon.bs.NK)
                        for (var y = w.length - 1; 0 <= y; y--)
                            this.Jxa.nud[y] = w[y];
                    else
                        for (y = w.length - 1; 0 <= y; y--)
                            this.Jxa.nud[y].VK = w[y];
                    this.J1b = !0;
                    this.Jxa.D9.call(this.Jxa.sender);
                    this.Jxa = null
                } else if (e = this.v9[0],
                this.v9.splice(0, 1),
                AscCommon.Yoa.n$a == e.type)
                    if (e.options && e.options.PHc) {
                        for (y = 0; y < w.length; y++)
                            this.heb == w[y].substr(0, this.yuc) && (w[y] = this.heb + e.options.ext[y] + ";" + w[y].substr(this.yuc));
                        e.options.Uof ? AscCommon.VLe(w, e.options.xg.e_, e.options.xg.yga, e.options.xg.ll.tFa(), function(f) {
                            e.options.xg.$x(Asc.vE.Gs, Asc.OH.rda);
                            e.options.D9(f)
                        }) : e.options.D9(Asc.Gk.pg.HZ, w)
                    } else
                        e.data.changes = JSON.stringify(w),
                        e.sender.UV(e.data, !0);
                else
                    AscCommon.Yoa.Jqb == e.type && (e.options && e.options.CCd ? (f.AscDesktopEditor.ResaveFile(e.options.src, w[0]),
                    e.options.fE.onload_crypto(e.options.src)) : (this.KHc = !0,
                    e.data.changes = w,
                    e.sender.r7b(e.data, !0)));
                this.Xqf()
            } else
                this.QJc()
        }
        ;
        this.xCd = function(e) {
            if (0 == e.length)
                return !1;
            this.Ktc();
            var f = this.yuc + 1;
            if (e[0].change) {
                for (var w = e.length - 1; 0 <= w; w--)
                    if (e[w].change.length > f) {
                        var y = e[w].change.substr(0, f);
                        if (-1 != y.indexOf(this.heb)) {
                            Ra = !0;
                            break
                        }
                    }
                return Ra
            }
            var Ra = !1;
            if (this.Wy == AscCommon.bs.NK)
                for (w = e.length - 1; 0 <= w; w--) {
                    if (e[w].length > f && (y = e[w].substr(0, f),
                    -1 != y.indexOf(this.heb))) {
                        Ra = !0;
                        break
                    }
                }
            else
                for (w = e.length - 1; 0 <= w; w--)
                    if (e[w].VK.length > f && (y = e[w].VK.substr(0, f),
                    -1 != y.indexOf(this.heb))) {
                        Ra = !0;
                        break
                    }
            return Ra
        }
        ;
        this.xlf = function(e, w, y) {
            if (0 != e.length && this.e2a()) {
                this.Jxa = {
                    nud: e,
                    fIa: [],
                    sender: w,
                    D9: y
                };
                this.Ktc();
                if (this.Wy == AscCommon.bs.NK)
                    for (w = e.length - 1; 0 <= w; w--)
                        this.Jxa.fIa[w] = e[w];
                else
                    for (w = e.length - 1; 0 <= w; w--)
                        this.Jxa.fIa[w] = e[w].VK;
                f.gj.Lya({
                    type: "decryptData",
                    data: this.Jxa.fIa
                })
            } else
                this.xCd(e) ? this.QJc() : (this.J1b = !0,
                y.call(w))
        }
        ;
        this.UZa = function(e, w, y) {
            if (f.S1b)
                f.AscDesktopEditor.NativeViewerOpen(y.awb());
            else {
                if (f.FHc || !this.e2a())
                    return !1;
                f.Sdb = !0;
                if (f.Asc.MUb.t5a === w)
                    w = "<m_nCsvTxtEncoding>" + y.HTa() + "</m_nCsvTxtEncoding>",
                    f.AscDesktopEditor.SetAdvancedOptions(w);
                else if (f.Asc.MUb.cVa === w) {
                    e = y.G7b();
                    var Ra = y.xFb();
                    w = "<m_nCsvTxtEncoding>" + y.HTa() + "</m_nCsvTxtEncoding>";
                    null != e && (w += "<m_nCsvDelimiter>" + e + "</m_nCsvDelimiter>");
                    null != Ra && (w += "<m_nCsvDelimiterChar>" + Ra + "</m_nCsvDelimiterChar>");
                    f.AscDesktopEditor.SetAdvancedOptions(w)
                } else
                    f.Asc.MUb.qMb === w && (w = "<m_sPassword>" + AscCommon.k4c(y.awb()) + "</m_sPassword>",
                    e.cSa = y.awb(),
                    f.AscDesktopEditor.SetAdvancedOptions(w));
                return !0
            }
        }
    }
    ;
    AscCommon.HTf = function(e, f) {
        this.tNa = this.sNa = 0;
        this.C7a = this.B7a = !1;
        this.Avb = -1;
        this.cUe = e;
        this.dqd = f;
        this.CZa = 120;
        this.dqc = !1;
        this.afg = function(e) {
            this.dqc = !0;
            this.CZa = e
        }
        ;
        this.V8f = function(e) {
            this.B7a = !1;
            if (!AscCommon.Se.OFa)
                return e;
            this.sNa += e;
            if (Math.abs(this.sNa) >= this.CZa)
                return this.dqc ? 0 < this.sNa ? this.CZa : -this.CZa : this.sNa;
            this.B7a = !0;
            return 0
        }
        ;
        this.W8f = function(e) {
            this.C7a = !1;
            if (!AscCommon.Se.OFa)
                return e;
            this.tNa += e;
            if (Math.abs(this.tNa) >= this.CZa)
                return this.dqc ? 0 < this.tNa ? this.CZa : -this.CZa : this.tNa;
            this.C7a = !0;
            return 0
        }
        ;
        this.z4f = function() {
            -1 != this.Avb && (clearTimeout(this.Avb),
            this.Avb = -1);
            if ((this.B7a || this.C7a) && this.dqd) {
                var e = this
                  , f = this.B7a ? this.sNa : 0
                  , w = this.C7a ? this.tNa : 0;
                this.Avb = setTimeout(function() {
                    e.dqd.call(e.cUe, f, w);
                    e.Avb = -1;
                    e.sNa = 0;
                    e.tNa = 0
                }, 100)
            }
            this.B7a || (this.sNa = 0);
            this.C7a || (this.tNa = 0);
            this.C7a = this.B7a = !1
        }
    }
    ;
    Vb.prototype.te = function(e) {
        this.Nbc = e || {}
    }
    ;
    Vb.prototype.Ab = function(e) {
        return this.Nbc.hasOwnProperty(e) ? this.Nbc[e] : e
    }
    ;
    Array.prototype.fill || Object.defineProperty(Array.prototype, "fill", {
        value: function(f, w, y) {
            if (null == this)
                throw new TypeError("this is null or not defined");
            var Ra = Object(this)
              , Ma = Ra.length >>> 0;
            w >>= 0;
            w = 0 > w ? Math.max(Ma + w, 0) : Math.min(w, Ma);
            y = y === e ? Ma : y >> 0;
            for (Ma = 0 > y ? Math.max(Ma + y, 0) : Math.min(y, Ma); w < Ma; )
                Ra[w] = f,
                w++;
            return Ra
        }
    });
    "undefined" === typeof Int8Array || Int8Array.prototype.fill || (Int8Array.prototype.fill = Array.prototype.fill);
    "undefined" === typeof Uint8Array || Uint8Array.prototype.fill || (Uint8Array.prototype.fill = Array.prototype.fill);
    "undefined" === typeof Uint8ClampedArray || Uint8ClampedArray.prototype.fill || (Uint8ClampedArray.prototype.fill = Array.prototype.fill);
    "undefined" === typeof Int16Array || Int16Array.prototype.fill || (Int16Array.prototype.fill = Array.prototype.fill);
    "undefined" === typeof Uint16Array || Uint16Array.prototype.fill || (Uint16Array.prototype.fill = Array.prototype.fill);
    "undefined" === typeof Int32Array || Int32Array.prototype.fill || (Int32Array.prototype.fill = Array.prototype.fill);
    "undefined" === typeof Uint32Array || Uint32Array.prototype.fill || (Uint32Array.prototype.fill = Array.prototype.fill);
    "undefined" === typeof Float32Array || Float32Array.prototype.fill || (Float32Array.prototype.fill = Array.prototype.fill);
    "undefined" === typeof Float64Array || Float64Array.prototype.fill || (Float64Array.prototype.fill = Array.prototype.fill);
    "undefined" === typeof Uint8Array || Uint8Array.prototype.slice || (Uint8Array.prototype.slice = Array.prototype.slice);
    var Qi = {
        yzf: 2,
        y3d: 2,
        Hqf: 100,
        oqf: 2E3,
        Iyf: !0
    };
    Zg.prototype.W9e = function(e, f) {
        var w = this.AEd();
        0 < w ? setTimeout(function() {
            f()
        }, w) : e()
    }
    ;
    Zg.prototype.AEd = function() {
        var e = -1;
        this.zsc < this.cFd.yzf && (e = this.sef(this.zsc, this.cFd),
        this.zsc++);
        return e
    }
    ;
    Zg.prototype.sef = function(e, f) {
        e = Math.round((f.Iyf ? Math.random() + 1 : 1) * f.Hqf * Math.pow(f.y3d, e));
        return e = Math.min(e, f.oqf)
    }
    ;
    f.AscCommon = f.AscCommon || {};
    f.AscCommon.pyd = function() {
        return f.SockJS || require("sockjs")
    }
    ;
    f.AscCommon.Nhf = Ia;
    f.AscCommon.Mhf = $a;
    f.AscCommon.rxd = function() {
        var e = f.location.href
          , w = e.indexOf("?");
        0 < w && (e = e.substring(0, w));
        return e.substring(0, e.lastIndexOf("/") + 1)
    }
    ;
    f.AscCommon.cTd = function() {
        for (var e = [], f = 0; f < AscCommon.Hwb.length; ++f) {
            var w = AscCommon.Hwb[f];
            e.push({
                codepage: w[0],
                lcid: w[1],
                name: w[3]
            })
        }
        return e
    }
    ;
    f.AscCommon.$7f = function(e) {
        var f = {
            encoding: AscCommon.C2d,
            size: 0
        };
        2 <= e.length && (f.size = 2,
        255 == e[0] && 254 == e[1] ? f.encoding = AscCommon.O$e : 254 == e[0] && 255 == e[1] ? f.encoding = AscCommon.P$e : 3 <= e.length && (f.size = 3,
        239 == e[0] && 187 == e[1] && 191 == e[2] ? f.encoding = AscCommon.CIb : 4 <= e.length && (f.size = 4,
        255 == e[0] && 254 == e[1] && 0 == e[2] && 0 == e[3] ? f.encoding = AscCommon.Q$e : 0 == e[0] && 0 == e[1] && 254 == e[2] && 255 == e[3] ? f.encoding = AscCommon.R$e : 43 == e[0] && 47 == e[1] && 118 == e[2] && 56 == e[3] ? f.encoding = AscCommon.PUb : 43 == e[0] && 47 == e[1] && 118 == e[2] && 57 == e[3] ? f.encoding = AscCommon.PUb : 43 == e[0] && 47 == e[1] && 118 == e[2] && 43 == e[3] ? f.encoding = AscCommon.PUb : 43 == e[0] && 47 == e[1] && 118 == e[2] && 47 == e[3] && (f.encoding = AscCommon.PUb))));
        return f
    }
    ;
    f.AscCommon.i$d = Sb;
    f.AscCommon.oPf = kb;
    f.AscCommon.Hhf = function(e) {
        var f, w = Ce(e);
        "svg" === w && (w += "+xml");
        return null !== w && Pe && (f = Pe[e]) ? "data:image/" + w + ";base64," + AscCommon.XKb(f, f.length, 0) : null
    }
    ;
    f.AscCommon.Erf = function(e, w, y, Ra) {
        function Ma() {
            Xa && qc && Ra && Ra(Pa, db)
        }
        var Pa = !1
          , db = new Ab
          , Xa = !1
          , qc = !1
          , jb = e;
        jb = jb.replace(/\\/g, "/");
        f.IS_NATIVE_EDITOR || kb(jb, function(e) {
            jb.lastIndexOf("/");
            e ? (e = Ta(e)) ? (db.znb = ob(e, y),
            db.data = e) : Pa = !0 : Pa = !0;
            Xa = !0;
            Ma()
        }, "arraybuffer");
        w ? (Pe = {},
        Ia().getBinaryContent(w, function(e, f) {
            e ? (Pa = qc = !0,
            Ma()) : (db.fIa = [],
            $a().loadAsync(f).then(function(e) {
                var f = []
                  , w = [];
                e.forEach(function(e, y) {
                    f.push(e);
                    w.push(y.async(e.endsWith(".json") ? "string" : "uint8array"))
                });
                Promise.all(w).then(function(e) {
                    for (var w, y = 0; y < e.length; ++y)
                        (w = f[y]).endsWith(".json") ? db.fIa[parseInt(w.slice(7))] = JSON.parse(e[y]) : Pe[w] = e[y];
                    qc = !0;
                    Ma()
                })
            }))
        })) : (Pe = null,
        qc = !0);
        f.IS_NATIVE_EDITOR && (e = f["native"].openFileCommand(jb, w, y),
        jb.lastIndexOf("/"),
        e ? (db.znb = ob(e, y),
        db.data = e) : Pa = !0,
        Xa = !0,
        Ma())
    }
    ;
    f.AscCommon.B4b = function(e, f, w, y) {
        var Ra = e.ll.Ovc();
        Ra && Ra !== w.id && (w.docconnectionid = Ra);
        null == w.savetype ? e.ll.V2a(w) : (w.userconnectionid = e.ll.mSa(),
        Ud({
            type: "POST",
            url: "../../../../downloadas/" + w.id + "?cmd=" + encodeURIComponent(JSON.stringify(w)),
            data: y.n3b || y.data,
            contentType: "application/octet-stream",
            error: function(e, w, y) {
                f && f(null, !0, y)
            },
            success: function(e) {
                f && f(JSON.parse(e.responseText), !0)
            }
        }))
    }
    ;
    f.AscCommon.eAf = function(e, f, w, y, Ra, Ma, Pa) {
        Ud({
            type: "POST",
            url: "../../../../savefile/" + e + "?cmd=" + encodeURIComponent(JSON.stringify({
                id: e,
                userid: f,
                tokenSession: y,
                outputpath: w
            })),
            data: Ra,
            contentType: "application/octet-stream",
            error: Ma,
            success: Pa
        })
    }
    ;
    f.AscCommon.wGb = Xa;
    f.AscCommon.Cag = function(e, f) {
        e = e.split("/");
        f = f.split("/");
        e.pop();
        for (var w = 0; w < f.length; w++)
            "." != f[w] && (".." == f[w] ? e.pop() : e.push(f[w]));
        return e.join("/")
    }
    ;
    f.AscCommon.iW = function(e) {
        if (f.NATIVE_EDITOR_ENJINE)
            return e;
        var w = e.slice(0, 6);
        return 0 === w.indexOf("theme") && editor.JH ? editor.JH.Pkb + e : 0 !== w.indexOf("http:") && 0 !== w.indexOf("data:") && 0 !== w.indexOf("https:") && 0 !== w.indexOf("file:") && 0 !== w.indexOf("ftp:") && (w = Le.T9(e)) ? w : e
    }
    ;
    f.AscCommon.mla = function(e, f) {
        return e - f
    }
    ;
    f.AscCommon.e7f = function(e, f) {
        return f - e
    }
    ;
    f.AscCommon.DJb = kc;
    f.AscCommon.Pac = Cc;
    f.AscCommon.XTa = Pb;
    f.AscCommon.quc = function(e) {
        for (var f = "", w = e.length, y = 0; y < w; y++)
            f += Pb(e[y]);
        return f
    }
    ;
    f.AscCommon.nvd = function(e) {
        for (var f = [], w = e.length, y = 0; y < w; y++) {
            var Ra = null
              , Ma = e.charCodeAt(y);
            kc(Ma) ? y + 1 < w && (y++,
            Ra = Cc(Ma, e.charCodeAt(y))) : Ra = Ma;
            null !== Ra && f.push(Ra)
        }
        return f
    }
    ;
    f.AscCommon.n3f = function(e) {
        vn = Ma(e ? e.StructureTables : null);
        xs = jb(e && e.CONST_TRUE_FALSE || hh);
        gr = Pa(e ? e.CONST_ERROR : null)
    }
    ;
    f.AscCommon.Vle = cf;
    f.AscCommon.Ugc = Ce;
    f.AscCommon.ibf = function(e, f, w) {
        var y = Ce(e);
        y = y ? e.length - y.length - 1 : e.length;
        w && y + f.length + 1 > w && (y = w - f.length - 1);
        return y < e.length ? e.substring(0, y) + "." + f : e + "." + f
    }
    ;
    f.AscCommon.uhf = function(e) {
        switch (e) {
        case ud.WHb:
        case ud.I$b:
            return "pdf";
        case ud.KOc:
            return "html";
        case ud.VTc:
            return "docx";
        case ud.J4c:
            return "doc";
        case ud.zcd:
            return "odt";
        case ud.med:
            return "rtf";
        case ud.t5a:
            return "txt";
        case ud.ebd:
            return "mht";
        case ud.Y5c:
            return "epub";
        case ud.u6c:
            return "fb2";
        case ud.ibd:
            return "mobi";
        case ud.K4c:
            return "docm";
        case ud.N4c:
            return "dotx";
        case ud.M4c:
            return "dotm";
        case ud.x6c:
            return "fodt";
        case ud.Gcd:
            return "ott";
        case ud.L4c:
            return "doct";
        case ud.xNd:
            return "bin";
        case ud.JSON:
            return "json";
        case ud.OVc:
            return "xlsx";
        case ud.znd:
            return "xls";
        case ud.ycd:
            return "ods";
        case ud.cVa:
            return "csv";
        case ud.And:
            return "xlsm";
        case ud.Dnd:
            return "xltx";
        case ud.Cnd:
            return "xltm";
        case ud.w6c:
            return "fods";
        case ud.Fcd:
            return "ots";
        case ud.Bnd:
            return "xlst";
        case ud.UUc:
            return "pptx";
        case ud.kdd:
            return "ppt";
        case ud.xcd:
            return "odp";
        case ud.jdd:
            return "ppsx";
        case ud.ldd:
            return "pptm";
        case ud.idd:
            return "ppsm";
        case ud.hdd:
            return "potx";
        case ud.gdd:
            return "potm";
        case ud.v6c:
            return "fodp";
        case ud.Ecd:
            return "otp"
        }
        return ""
    }
    ;
    f.AscCommon.mpe = function(w) {
        f.addEventListener && f.addEventListener("message", function(y) {
            if (null != y && null != y.data)
                try {
                    var Ra = JSON.parse(y.data);
                    if (null != Ra && null != Ra.type && 0 == Ra.type)
                        if (Xc.pXa == Ra.error) {
                            var Ma = Ra.urls;
                            if (Ma) {
                                Le.Wwa(Ma);
                                var Pa;
                                for (Pa in Ma)
                                    if (Ma.hasOwnProperty(Pa)) {
                                        var db = Ma[Pa];
                                        break
                                    }
                                w(Asc.Gk.pg.HZ, db)
                            }
                        } else
                            w(Xa(Ra.error));
                    else if ("onExternalPluginMessage" === Ra.type) {
                        if (f.gj) {
                            if ("internalCommand" == Ra.subType)
                                switch (Ra.data.type) {
                                case "onbeforedrop":
                                case "ondrop":
                                    f.gj.xg.xtf(Ra.data);
                                    return
                                }
                            f.gj.gAf(y.data)
                        }
                    } else
                        "emulateUploadInFrame" === Ra.type && f._private_emulate_upload && (f._private_emulate_upload(Ra.name, Ra.content),
                        f._private_emulate_upload = e)
                } catch (nw) {}
        }, !1)
    }
    ;
    f.AscCommon.Xid = function(e, f, w, y, Ra) {
        if (!1 === ef("image/*", !0, mg, y)) {
            y = Je();
            e = "../../../../uploadold/" + e + "/" + f + "/" + Le.QPa;
            w && (e += "?token=" + encodeURIComponent(w));
            w = '<html><head></head><body><form action="' + e + '" method="POST" enctype="multipart/form-data"><input id="apiiuFile" name="apiiuFile" type="file" accept="image/*" size="1"><input id="apiiuSubmit" name="apiiuSubmit" type="submit" style="display:none;"></form></body></html>';
            y.document.open();
            y.document.write(w);
            y.document.close();
            w = y.document.getElementById("apiiuFile");
            var Ma = y.document.getElementById("apiiuSubmit");
            w.onchange = function(e) {
                if (e && e.target && e.target.files && (e = mg(e.target.files),
                Xc.pXa != e)) {
                    Ra(Xa(e));
                    return
                }
                Ra(Asc.Gk.pg.HZ);
                Ma.click()
            }
            ;
            w.click()
        }
    }
    ;
    f.AscCommon.Kng = function(e) {
        for (var f = w.Xbb, y = "." + f[0], Ra = 1; Ra < f.length; ++Ra)
            y += ",." + f[Ra];
        !1 === ef(y, !1, Di, e) && e(Asc.Gk.pg.QN)
    }
    ;
    f.AscCommon.lpe = function(e, w) {
        "undefined" != typeof FileReader && null != e && (e.ondragover = function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = dh(e) ? "copy" : "none";
            "copy" == e.dataTransfer.dropEffect && (f.Asc.editor ? f.Asc.editor : f.editor).xQc(e);
            return !1
        }
        ,
        e.ondrop = function(e) {
            e.preventDefault();
            var y = e.dataTransfer.files
              , Ra = mg(y)
              , Ma = f.Asc.editor ? f.Asc.editor : f.editor;
            Ma.aRc();
            if (Ra == Xc.roc) {
                try {
                    var Pa = e.dataTransfer.getData("text/html");
                    if (Pa && !AscCommon.Se.aI) {
                        var db = Pa.indexOf("StartHTML")
                          , Ta = Pa.indexOf("<html");
                        -1 == Ta && (Ta = Pa.indexOf("<HTML"));
                        0 < db && 0 < Ta && db < Ta && (Pa = Pa.substr(Ta));
                        Ma.pluginMethod_PasteHtml(Pa);
                        return
                    }
                } catch (go) {}
                try {
                    var Ia = e.dataTransfer.getData("text/plain");
                    if (Ia) {
                        Ma.pluginMethod_PasteText(Ia);
                        return
                    }
                } catch (go) {}
                try {
                    if (Ia = e.dataTransfer.getData("Text")) {
                        Ma.pluginMethod_PasteText(Ia);
                        return
                    }
                } catch (go) {}
            }
            w(Xa(Ra), y)
        }
        )
    }
    ;
    f.AscCommon.Ald = function(e, f, w, y, Ra) {
        if (0 < e.length) {
            for (var Ma = "../../../../upload/" + f + "/" + w + "/" + Le.QPa, Pa = [], db = e.length - 1; -1 < db; --db)
                Pa.push(e[db]);
            var Ta = Pa.pop()
              , Xa = []
              , Ia = function() {
                if (4 == this.readyState)
                    if (200 == this.status || 1223 == this.status) {
                        var e = JSON.parse(this.responseText);
                        Le.Wwa(e);
                        for (var db in e)
                            if (e.hasOwnProperty(db)) {
                                Xa.push(e[db]);
                                break
                            }
                        0 === Pa.length ? Ra(Asc.Gk.pg.HZ, Xa) : (Ta = Pa.pop(),
                        e = new XMLHttpRequest,
                        Ma = "../../../../upload/" + f + "/" + w + "/" + Le.QPa,
                        e.open("POST", Ma, !0),
                        e.setRequestHeader("Content-Type", Ta.type || "application/octet-stream"),
                        e.setRequestHeader("Authorization", "Bearer " + y),
                        e.onreadystatechange = Ia,
                        e.send(Ta))
                    } else
                        403 === this.status ? Ra(Asc.Gk.pg.ncb) : Ra(Asc.Gk.pg.cZa)
            };
            e = new XMLHttpRequest;
            e.open("POST", Ma, !0);
            e.setRequestHeader("Content-Type", Ta.type || "application/octet-stream");
            e.setRequestHeader("Authorization", "Bearer " + y);
            e.onreadystatechange = Ia;
            e.send(Ta)
        } else
            Ra(Asc.Gk.pg.gSb)
    }
    ;
    f.AscCommon.VLe = function(e, f, w, y, Ra) {
        if (0 < e.length) {
            for (var Ma = "../../../../upload/" + f + "/" + w + "/" + Le.QPa, Pa = [], db = e.length - 1; -1 < db; --db)
                Pa.push(e[db]);
            var Ta = Pa.pop()
              , Xa = []
              , Ia = function() {
                if (4 == this.readyState)
                    if (200 == this.status || 1223 == this.status) {
                        var e = JSON.parse(this.responseText);
                        Le.Wwa(e);
                        for (var db in e)
                            if (e.hasOwnProperty(db)) {
                                Xa.push({
                                    path: db,
                                    url: e[db]
                                });
                                break
                            }
                        0 === Pa.length ? Ra(Xa) : (Ta = Pa.pop(),
                        e = new XMLHttpRequest,
                        Ma = "../../../../upload/" + f + "/" + w + "/" + Le.QPa,
                        e.open("POST", Ma, !0),
                        e.setRequestHeader("Content-Type", Ta.type || "application/octet-stream"),
                        e.setRequestHeader("Authorization", "Bearer " + y),
                        e.onreadystatechange = Ia,
                        e.send(Ta))
                    } else
                        Ra([])
            };
            e = new XMLHttpRequest;
            e.open("POST", Ma, !0);
            e.setRequestHeader("Content-Type", Ta.type || "application/octet-stream");
            e.setRequestHeader("Authorization", "Bearer " + y);
            e.onreadystatechange = Ia;
            e.send(Ta)
        } else
            Ra(Asc.Gk.pg.gSb)
    }
    ;
    f.AscCommon.wjg = dh;
    f.AscCommon.wyd = function(e) {
        var f = e.replace(/ /g, "%20");
        e = f.u5b(xt);
        !e && (e = f.u5b(uc));
        !e && (e = f.u5b(Gy));
        f = f.u5b(Od);
        !e && (e = f);
        return e ? f ? AscCommon.Iwb.b6c : AscCommon.Iwb.ape : AscCommon.Iwb.g$c
    }
    ;
    f.AscCommon.ttf = function(e, f) {
        /(((^https?)|(^ftp)):\/\/)|(^mailto:)/i.test(e) || (e = (AscCommon.Iwb.b6c == f ? "mailto:" : "http://") + e);
        return e.replace(/%20/g, " ")
    }
    ;
    f.AscCommon.fGb = function(e, f, w, y) {
        if (!(e && "" !== e || f && "" !== f))
            return new Ef(0,0,0,255);
        if (eo.hasOwnProperty(e))
            e = eo[e];
        else if (eo.hasOwnProperty(f))
            e = eo[f];
        else {
            var Ra = Asc.Dtd[Xs % Asc.Dtd.length];
            ++Xs;
            e = eo[e || f] = new oh(Ra)
        }
        if (!e)
            return new Ef(0,0,0,255);
        w = !0 === w ? e.R4c : e.Jad;
        return !0 === y ? w.r << 16 & 16711680 | w.vb << 8 & 65280 | w.Xa & 255 : w
    }
    ;
    f.AscCommon.chb = function(f) {
        return f == e || null == f || "" == f
    }
    ;
    f.AscCommon.Xw = function(e) {
        return (" " + e).substr(1)
    }
    ;
    f.AscCommon.SQa = function(e) {
        return e() ? (e = e().val) ? e : null : null
    }
    ;
    f.AscCommon.hif = Zh;
    f.AscCommon.jyb = function(e) {
        if (e()) {
            e = e();
            if (null != e.theme)
                return AscCommonExcel.Q9.s3(Zh(e.theme), Zh(e.tint));
            if (null != e.rgb)
                return new AscCommonExcel.O7(16777215 & Zh(e.rgb))
        }
        return null
    }
    ;
    f.AscCommon.Pl = function(e) {
        return "0" !== e && "false" !== e && "off" !== e
    }
    ;
    f.AscCommon.C$f = Ta;
    f.AscCommon.Iud = ob;
    f.AscCommon.Bkg = y;
    f.AscCommon.Scd = Ab;
    f.AscCommon.z7 = sb;
    f.AscCommon.lu = yb;
    f.AscCommon.ETc = Xe;
    f.AscCommon.nva = function(e) {
        return 25.4 * (1440 * e / 25.4 + .5 | 0) / 20 / 72
    }
    ;
    f.AscCommon.hcb = function(f) {
        return 25.4 * (null !== f && e !== f ? f : 1) / 20 / 72
    }
    ;
    f.AscCommon.GZ = function(e) {
        return 1440 * e / 25.4 + .5 | 0
    }
    ;
    f.AscCommon.Mgd = function(e) {
        e = e.toUpperCase();
        if (1 > e)
            return 0;
        if (!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/i.test(e))
            return NaN;
        var f = {
            M: 1E3,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1
        }
          , w = 0;
        e.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function(e) {
            w += f[e]
        });
        return w
    }
    ;
    f.AscCommon.Aad = function(e) {
        e = e.toUpperCase();
        if (0 >= e.length)
            return NaN;
        var f = e.length
          , w = e.charCodeAt(0);
        if (65 > w || 90 < w)
            return NaN;
        for (var y = 1; y < f; ++y)
            if (e.charCodeAt(y) !== w)
                return NaN;
        return w - 64 + 26 * (f - 1)
    }
    ;
    f.AscCommon.B6b = function(e, f) {
        var w = "";
        switch (f) {
        case Asc.ag.sB:
            w = "" + e;
            break;
        case Asc.ag.gTa:
            w = "" + e;
            1 === w.length && (w = "0" + w);
            break;
        case Asc.ag.Iqb:
            w = 20 >= e ? String.fromCharCode(9312 + e - 1) : "" + e;
            break;
        case Asc.ag.ES:
        case Asc.ag.r0:
            --e;
            var y = (e - e % 26) / 26;
            e %= 26;
            e = Asc.ag.ES === f ? String.fromCharCode(e + 97) : String.fromCharCode(e + 65);
            for (f = 0; f < y + 1; ++f)
                w += e;
            break;
        case Asc.ag.FS:
        case Asc.ag.s0:
            y = Asc.ag.FS === f ? "m;cm;d;cd;c;xc;l;xl;x;ix;v;iv;i; ".split(";") : "M;CM;D;CD;C;XC;L;XL;X;IX;V;IV;I; ".split(";");
            var Ra = [1E3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1, 0];
            for (f = 0; 0 < e; ) {
                for (; Ra[f] <= e; )
                    w += y[f],
                    e -= Ra[f];
                f++;
                if (f >= y.length)
                    break
            }
        }
        return w
    }
    ;
    f.AscCommon.ypf = function(e, w, y) {
        f.AscNotLoadAllScript ? w() : Xg("./../../../../sdkjs/" + e + "/sdk-all.js", w, y)
    }
    ;
    f.AscCommon.EJb = Xg;
    f.AscCommon.iyb = function(e) {
        var f = e.metaKey || e.ctrlKey;
        return e.altKey && (tn.OFa ? !f : f)
    }
    ;
    f.AscCommon.bTd = function(e) {
        for (var f = 0; f < AscCommon.dob.length; ++f) {
            var w = AscCommon.dob[f];
            if (w && w.name === e)
                return Yg(f)
        }
        return null
    }
    ;
    f.AscCommon.p8b = Yg;
    f.AscCommon.GWb = function(e, f) {
        var w = {
            R: 0,
            G: 0,
            B: 0,
            Bf: 255
        };
        var y = new AscCommon.b1c;
        y.scheme = e;
        y.name = e.name;
        e.be[8].$e(f, null, null, null, w);
        var Ra = e.be[8].RGBA;
        y.Ad(new AscCommon.BM(Ra.R,Ra.G,Ra.B));
        e.be[12].$e(f, null, null, null, w);
        Ra = e.be[12].RGBA;
        y.Ad(new AscCommon.BM(Ra.R,Ra.G,Ra.B));
        e.be[9].$e(f, null, null, null, w);
        Ra = e.be[9].RGBA;
        y.Ad(new AscCommon.BM(Ra.R,Ra.G,Ra.B));
        e.be[13].$e(f, null, null, null, w);
        Ra = e.be[13].RGBA;
        y.Ad(new AscCommon.BM(Ra.R,Ra.G,Ra.B));
        e.be[0].$e(f, null, null, null, w);
        Ra = e.be[0].RGBA;
        y.Ad(new AscCommon.BM(Ra.R,Ra.G,Ra.B));
        e.be[1].$e(f, null, null, null, w);
        Ra = e.be[1].RGBA;
        y.Ad(new AscCommon.BM(Ra.R,Ra.G,Ra.B));
        e.be[2].$e(f, null, null, null, w);
        Ra = e.be[2].RGBA;
        y.Ad(new AscCommon.BM(Ra.R,Ra.G,Ra.B));
        e.be[3].$e(f, null, null, null, w);
        Ra = e.be[3].RGBA;
        y.Ad(new AscCommon.BM(Ra.R,Ra.G,Ra.B));
        e.be[4].$e(f, null, null, null, w);
        Ra = e.be[4].RGBA;
        y.Ad(new AscCommon.BM(Ra.R,Ra.G,Ra.B));
        e.be[5].$e(f, null, null, null, w);
        Ra = e.be[5].RGBA;
        y.Ad(new AscCommon.BM(Ra.R,Ra.G,Ra.B));
        e.be[11].$e(f, null, null, null, w);
        Ra = e.be[11].RGBA;
        y.Ad(new AscCommon.BM(Ra.R,Ra.G,Ra.B));
        e.be[10].$e(f, null, null, null, w);
        Ra = e.be[10].RGBA;
        y.Ad(new AscCommon.BM(Ra.R,Ra.G,Ra.B));
        return y
    }
    ;
    f.AscCommon.xug = function(e, f, w) {
        var y = yc(e, f);
        if (-1 < y)
            return y;
        y = w;
        null === w && (y = e.length);
        e.splice(y, 0, f);
        return y
    }
    ;
    f.AscCommon.TWb = yc;
    f.AscCommon.x8d = function(e) {
        return 12544 <= e && 12591 >= e || 12704 <= e && 12735 >= e || 19968 <= e && 40938 >= e || 13312 <= e && 19893 >= e || 131072 <= e && 173782 >= e || 173824 <= e && 177972 >= e || 177984 <= e && 178205 >= e || 178208 <= e && 183969 >= e || 183984 <= e && 191456 >= e || 63744 <= e && 64255 >= e || 194560 <= e && 195103 >= e || 12032 <= e && 12255 >= e || 11904 <= e && 12031 >= e || 12736 <= e && 12783 >= e || 12272 <= e && 12287 >= e || 4352 <= e && 4607 >= e || 43360 <= e && 43391 >= e || 55216 <= e && 55295 >= e || 12592 <= e && 12687 >= e || 65280 <= e && 65519 >= e || 44032 <= e && 55215 >= e || 12352 <= e && 12447 >= e || 110848 <= e && 110895 >= e || 110592 <= e && 110847 >= e || 12688 <= e && 12703 >= e || 12448 <= e && 12543 >= e || 12784 <= e && 12799 >= e || 42192 <= e && 42239 >= e || 93952 <= e && 94111 >= e || 110960 <= e && 111359 >= e || 94208 <= e && 100332 >= e || 100352 <= e && 101119 >= e || 40960 <= e && 42127 >= e || 42128 <= e && 42191 >= e
    }
    ;
    f.AscCommon.v_d = Va;
    f.AscCommon.tH = Le;
    f.AscCommon.Jmb = gc;
    f.AscCommon.QRd = Ci;
    f.AscCommon.JWc = {
        nil: "#NULL!",
        div: "#DIV/0!",
        value: "#VALUE!",
        ref: "#REF!",
        name: "#NAME?",
        num: "#NUM!",
        na: "#N/A",
        getdata: "#GETTING_DATA",
        uf: "#UNSUPPORTED_FUNCTION!"
    };
    f.AscCommon.y2d = lg;
    f.AscCommon.Bgc = Ra;
    f.AscCommon.rRf = /\s/g;
    f.AscCommon.AEg = /\s/;
    f.AscCommon.$Id = Lq;
    f.AscCommon.apf = "de-formatpainter";
    f.AscCommon.aV = ys;
    f.AscCommon.eg = Aj;
    f.AscCommon.eFa = Gf;
    f.AscCommon.Jgf = Qi;
    f.AscCommon.Vbe = Zg;
    f.AscCommon.exa = function(e, f) {
        f || (f = function(e) {
            e.setAttribute("src", e.getAttribute("src"))
        }
        );
        e.onerror = qc(e, e.onerror, f)
    }
    ;
    f.AscCommon.njg = f.AscCommon.CSignatureDrawer = Ic;
    var Th = Ic.prototype;
    Th.getImages = Th.Jhf;
    Th.setText = Th.pBf;
    Th.selectImage = Th.$zf;
    Th.isValid = Th.hC;
    Th.destroy = Th.dSa;
    f.AscCommon.Ws = new Vb;
    f.AscCommon.sSc = function(f, w, y) {
        if (w.xFb())
            var Ra = w.xFb();
        else
            switch (w.G7b()) {
            case AscCommon.p_a.kf:
                Ra = e;
                break;
            case AscCommon.p_a.OX:
                Ra = "\t";
                break;
            case AscCommon.p_a.eEe:
                Ra = ";";
                break;
            case AscCommon.p_a.zge:
                Ra = ":";
                break;
            case AscCommon.p_a.B3c:
                Ra = ",";
                break;
            case AscCommon.p_a.ic:
                Ra = " "
            }
        w = [];
        f = f.split(/\r?\n/);
        for (var Ma = 0; Ma < f.length; ++Ma) {
            var Pa = f[Ma];
            if (" " === Ra && y) {
                var db = !1;
                Pa[0] === Ra && (db = !0);
                Pa = db ? Ra + Pa.trim() : Pa.trim()
            }
            w.push(Pa.split(Ra))
        }
        return w
    }
    ;
    f.AscCommon.lSa = function(e) {
        return e ? e.endsWith("Z") ? Date.parse(e) : Date.parse(e + "Z") : NaN
    }
    ;
    f.AscCommon.Yx = function(e) {
        return (e = ji(e)) && "%" !== e.type && "none" !== e.type ? e.val : null
    }
    ;
    f.AscCommon.w4a = ji;
    f.AscCommon.EYd = ic
}
)(window);
window.asc_initAdvancedOptions = function(f, e, Ia) {
    if (window.S1b)
        return window.NativeFileOpen_error(window.S1b, e, Ia);
    var $a = window.Asc.editor ? window.Asc.editor : window.editor;
    if (90 == f || 91 == f) {
        if (window.AscDesktopEditor && 0 !== window.AscDesktopEditor.CryptoMode && !$a.i6) {
            $a.Zwa = [];
            $a.Zwa.push(f);
            $a.Zwa.push(e);
            $a.Zwa.push(Ia);
            return
        }
        if (AscCommon.WD.e2a() && !window.Sdb) {
            window.Sdb = !0;
            window.gj.Lya({
                type: "getPasswordByFile",
                hash: e,
                docinfo: Ia
            });
            return
        }
    }
    window.Sdb = !1;
    $a.Ocb(void 0, 90 == f || 91 == f ? !0 : void 0)
}
;
window.asc_IsNeedBuildCryptedFile = function() {
    if (!window.AscDesktopEditor || !window.AscDesktopEditor.CryptoMode)
        return !1;
    var f = window.Asc.editor ? window.Asc.editor : window.editor
      , e = !1
      , Ia = null;
    f.ll && f.ll.nl && f.ll.nl.Qwa && (Ia = f.ll.nl.Qwa);
    var $a = 0, Va;
    for (Va in Ia)
        $a++;
    1 >= $a ? null != AscCommon.History.kM && -1 != AscCommon.History.kM ? e = !0 : f.Wy == AscCommon.bs.NK ? AscCommon.WD.KHc && (e = !0) : 0 != AscCommon.Kd.Fra.length && (e = !0) : e = !1;
    window.AscDesktopEditor.execCommand("encrypt:isneedbuild", "" + e);
    return e
}
;
window.UpdateSystemPlugins = function() {
    var f = JSON.parse(window.AscDesktopEditor.GetInstallPlugins());
    f[0].url = f[0].url.replace(" ", "%20");
    f[1].url = f[1].url.replace(" ", "%20");
    for (var e = 0; 2 > e; e++)
        for (var Ia = f[e], $a = Ia.pluginsData.length, Va = 0; Va < $a; Va++)
            Ia.pluginsData[Va].baseUrl = Ia.url + Ia.pluginsData[Va].guid.substring(4) + "/",
            window.AscDesktopEditor.IsLocalFile() || (Ia.pluginsData[Va].baseUrl = "ascdesktop://plugin_content/" + Ia.pluginsData[Va].baseUrl);
    var ib = [];
    for (e = 0; 2 > e; e++)
        for (Ia = f[e],
        $a = Ia.pluginsData.length,
        Va = 0; Va < $a; Va++)
            for (var y = Ia.pluginsData[Va], Ab = 0; Ab < y.variations.length; Ab++) {
                var Sb = y.variations[Ab];
                if ("desktop" == Sb.initDataType) {
                    if ("encryption" == Sb.initData) {
                        (Ab = Sb.cryptoMode) || (Ab = "1");
                        AscCommon.WD.vvd = parseInt(Ab);
                        ib.push(y);
                        break
                    }
                    ib.push(y);
                    break
                }
            }
    f = [];
    for (Va = 0; Va < ib.length; Va++)
        e = new Asc.Qdc,
        e.deserialize(ib[Va]),
        f.push(e);
    window.gj.hzf("", f);
    window.gj.Kzf()
}
;
window.buildCryptoFile_Start = function() {
    (window.Asc.editor ? window.Asc.editor : window.editor).$G(Asc.vE.Gs, Asc.OH.lH);
    window.gj.Lya({
        type: "generatePassword"
    })
}
;
window.buildCryptoFile_End = function(f, e, Ia, $a) {
    var Va = window.Asc.editor ? window.Asc.editor : window.editor;
    Va.$x(Asc.vE.Gs, Asc.OH.lH);
    0 != e ? Va.Oe("asc_onError", Asc.Gk.pg.$Lb, Asc.Gk.Lk.Vo) : (Va.zpc = function() {
        this.zpc = null;
        Va.$G(Asc.vE.Gs, Asc.OH.lH);
        var e = new XMLHttpRequest;
        e.open("GET", "ascdesktop://fonts/" + f, !0);
        e.responseType = "arraybuffer";
        e.overrideMimeType ? e.overrideMimeType("text/plain; charset=x-user-defined") : e.setRequestHeader("Accept-Charset", "x-user-defined");
        e.onload = function() {
            if (200 == this.status) {
                var e = new Uint8Array(this.response)
                  , f = ".docx";
                switch (Va.Wy) {
                case AscCommon.bs.$y:
                    f = ".pptx";
                    break;
                case AscCommon.bs.NK:
                    f = ".xlsx"
                }
                AscCommon.eAf(Va.e_, Va.yga, "output" + f, Va.wrd(), e, function() {
                    Va.$x(Asc.vE.Gs, Asc.OH.lH);
                    Va.Oe("asc_onError", Asc.Gk.pg.$Lb, Asc.Gk.Lk.IU);
                    window.AscDesktopEditor.buildCryptedEnd(!1)
                }, function(e) {
                    try {
                        var f = {
                            accounts: e.responseText ? JSON.parse(e.responseText) : void 0,
                            hash: Ia,
                            password: $a,
                            type: "share",
                            docinfo: Va.Dvd
                        };
                        Va.Dvd = void 0;
                        window.AscDesktopEditor.sendSystemMessage(f);
                        window.AscDesktopEditor.CallInAllWindows("function(){ if (window.DesktopUpdateFile) { window.DesktopUpdateFile(undefined); } }");
                        Va.$x(Asc.vE.Gs, Asc.OH.lH);
                        setTimeout(function() {
                            window.AscDesktopEditor.buildCryptedEnd(!0)
                        }, 1E3)
                    } catch (Ta) {}
                })
            }
        }
        ;
        e.send(null)
    }
    ,
    window.gj.Lya({
        type: "setPasswordByFile",
        hash: Ia,
        password: $a
    }))
}
;
window.NativeFileOpen_error = function(f, e, Ia) {
    var $a = window.Asc.editor ? window.Asc.editor : window.editor;
    "password" == f ? (window.S1b = f,
    window.AscDesktopEditor && 0 !== window.AscDesktopEditor.CryptoMode && !$a.i6 ? ($a.Zwa = [],
    $a.Zwa.push(90),
    $a.Zwa.push(e),
    $a.Zwa.push(Ia)) : AscCommon.WD.e2a() && !window.Sdb ? (window.Sdb = !0,
    window.gj.Lya({
        type: "getPasswordByFile",
        hash: e,
        docinfo: Ia
    })) : (window.Sdb = !1,
    $a.Ocb(void 0, !0))) : "error" == f && $a.Oe("asc_onError", c_oAscError.pg.PIa, c_oAscError.Lk.IU)
}
;
window.CryptoDownloadAsEnd = function() {
    (window.Asc.editor ? window.Asc.editor : window.editor).$x(Asc.vE.Gs, Asc.OH.Pfc);
    window.FHc = void 0
}
;
window.AscDesktopEditor_Save = function() {
    (window.Asc.editor ? window.Asc.editor : window.editor).tda(!1) || window.AscDesktopEditor.OnSave()
}
;
"use strict";
(function(f, e) {
    function Ia(e) {
        this.Na = e;
        this.olc = !1
    }
    function $a(e, f, y, Ta) {
        Ia.call(this, e);
        this.Qa = f;
        this.wd = y;
        this.jA = !1;
        this.Vm = [];
        this.ia = Ta;
        this.olc = !1
    }
    function Va(e, f, y, Ta) {
        Ia.call(this, e);
        this.va = !0 === Ta ? !0 : !1;
        this.tb = f;
        this.Ha = y
    }
    function ib(e, f, y, Ta) {
        Va.call(this, e, f, y, Ta)
    }
    function y(e, f, y, Ta) {
        Va.call(this, e, f, y, Ta)
    }
    function Ab(e, f, y, Ta) {
        Va.call(this, e, f, y, Ta)
    }
    function Sb(e, f, y, Ta) {
        Va.call(this, e, f, y, Ta)
    }
    function kb(e, f, y, Ta) {
        Va.call(this, e, f, y, Ta)
    }
    function Ta(e, f, y, Ta) {
        Va.call(this, e, f, y, Ta)
    }
    function ob(e, f, y, Ta) {
        Va.call(this, e, f, y, Ta)
    }
    function Xa(e, f, y, Ta) {
        Va.call(this, e, f, y, Ta)
    }
    function kc(e, f, y, Ta) {
        Va.call(this, e, f, y, Ta)
    }
    function Cc(e, f, y, Ta) {
        Va.call(this, e, f, y, Ta)
    }
    function Pb(e, f, y, Ta) {
        Va.call(this, e, f, y, Ta)
    }
    function ic(e, f, y, Ta) {
        Va.call(this, e, f, y, Ta)
    }
    f.AscDFH = f.AscDFH || {};
    f.AscDFH.Elg = function(e) {
        var f = "Unknown";
        switch (e) {
        case AscDFH.P4d:
            f = "Cut";
            break;
        case AscDFH.kmf:
            f = "PasteButtonIE";
            break;
        case AscDFH.lmf:
            f = "PasteButtonNotIE";
            break;
        case AscDFH.Ywc:
            f = "ChartDrawingObjects";
            break;
        case AscDFH.kzd:
            f = "CommonControllerCheckChartText";
            break;
        case AscDFH.lzd:
            f = "CommonControllerUnGroup";
            break;
        case AscDFH.wRc:
            f = "CommonControllerCheckSelected";
            break;
        case AscDFH.Hlf:
            f = "CommonControllerSetGraphicObject";
            break;
        case AscDFH.OTd:
            f = "CommonStatesAddNewShape";
            break;
        case AscDFH.Ilf:
            f = "CommonStatesRotate";
            break;
        case AscDFH.mmf:
            f = "PasteNative";
            break;
        case AscDFH.u5d:
            f = "Document_GroupUnGroup";
            break;
        case AscDFH.aUd:
            f = "Document_SetDefaultLanguage";
            break;
        case AscDFH.UTd:
            f = "Document_ChangeColorScheme";
            break;
        case AscDFH.Q4d:
            f = "Document_AddChart";
            break;
        case AscDFH.l5d:
            f = "Document_EditChart";
            break;
        case AscDFH.pYc:
            f = "Document_DragText";
            break;
        case AscDFH.Pzd:
            f = "Document_DocumentContentExtendToPos";
            break;
        case AscDFH.vzd:
            f = "Document_AddHeader";
            break;
        case AscDFH.tzd:
            f = "Document_AddFooter";
            break;
        case AscDFH.bAd:
            f = "Document_ParagraphExtendToPos";
            break;
        case AscDFH.aAd:
            f = "Document_ParagraphChangeFrame";
            break;
        case AscDFH.iAd:
            f = "Document_ReplaceAll";
            break;
        case AscDFH.jAd:
            f = "Document_ReplaceSingle";
            break;
        case AscDFH.CAd:
            f = "Document_TableAddNewRowByTab";
            break;
        case AscDFH.X4d:
            f = "Document_AddNewShape";
            break;
        case AscDFH.m5d:
            f = "Document_EditWrapPolygon";
            break;
        case AscDFH.y5d:
            f = "Document_MoveInlineObject";
            break;
        case AscDFH.i5d:
            f = "Document_CopyAndMoveInlineObject";
            break;
        case AscDFH.J5d:
            f = "Document_RotateInlineDrawing";
            break;
        case AscDFH.H5d:
            f = "Document_RotateFlowDrawingCtrl";
            break;
        case AscDFH.I5d:
            f = "Document_RotateFlowDrawingNoCtrl";
            break;
        case AscDFH.x5d:
            f = "Document_MoveInGroup";
            break;
        case AscDFH.f5d:
            f = "Document_ChangeWrapContour";
            break;
        case AscDFH.g5d:
            f = "Document_ChangeWrapContourAddPoint";
            break;
        case AscDFH.q5d:
            f = "Document_GrObjectsBringToFront";
            break;
        case AscDFH.p5d:
            f = "Document_GrObjectsBringForwardGroup";
            break;
        case AscDFH.o5d:
            f = "Document_GrObjectsBringForward";
            break;
        case AscDFH.t5d:
            f = "Document_GrObjectsSendToBackGroup";
            break;
        case AscDFH.s5d:
            f = "Document_GrObjectsSendToBack";
            break;
        case AscDFH.n5d:
            f = "Document_GrObjectsBringBackwardGroup";
            break;
        case AscDFH.XTd:
            f = "Document_GrObjectsBringBackward";
            break;
        case AscDFH.r5d:
            f = "Document_GrObjectsChangeWrapPolygon";
            break;
        case AscDFH.cxc:
            f = "Document_MathAutoCorrect";
            break;
        case AscDFH.O5d:
            f = "Document_SetFramePrWithFontFamily";
            break;
        case AscDFH.N5d:
            f = "Document_SetFramePr";
            break;
        case AscDFH.P5d:
            f = "Document_SetFramePrWithFontFamilyLong";
            break;
        case AscDFH.s6d:
            f = "Document_SetTextFontName";
            break;
        case AscDFH.u6d:
            f = "Document_SetTextFontSize";
            break;
        case AscDFH.o6d:
            f = "Document_SetTextBold";
            break;
        case AscDFH.x6d:
            f = "Document_SetTextItalic";
            break;
        case AscDFH.C6d:
            f = "Document_SetTextUnderline";
            break;
        case AscDFH.B6d:
            f = "Document_SetTextStrikeout";
            break;
        case AscDFH.r6d:
            f = "Document_SetTextDStrikeout";
            break;
        case AscDFH.A6d:
            f = "Document_SetTextSpacing";
            break;
        case AscDFH.p6d:
            f = "Document_SetTextCaps";
            break;
        case AscDFH.z6d:
            f = "Document_SetTextSmallCaps";
            break;
        case AscDFH.y6d:
            f = "Document_SetTextPosition";
            break;
        case AscDFH.hUd:
            f = "Document_SetTextLang";
            break;
        case AscDFH.f6d:
            f = "Document_SetParagraphLineSpacing";
            break;
        case AscDFH.g6d:
            f = "Document_SetParagraphLineSpacingBeforeAfter";
            break;
        case AscDFH.v5d:
            f = "Document_IncFontSize";
            break;
        case AscDFH.k5d:
            f = "Document_DecFontSize";
            break;
        case AscDFH.Z5d:
            f = "Document_SetParagraphBorders";
            break;
        case AscDFH.k6d:
            f = "Document_SetParagraphPr";
            break;
        case AscDFH.Y5d:
            f = "Document_SetParagraphAlign";
            break;
        case AscDFH.D6d:
            f = "Document_SetTextVertAlign";
            break;
        case AscDFH.h6d:
            f = "Document_SetParagraphNumbering";
            break;
        case AscDFH.m6d:
            f = "Document_SetParagraphStyle";
            break;
        case AscDFH.j6d:
            f = "Document_SetParagraphPageBreakBefore";
            break;
        case AscDFH.n6d:
            f = "Document_SetParagraphWidowControl";
            break;
        case AscDFH.d6d:
            f = "Document_SetParagraphKeepLines";
            break;
        case AscDFH.e6d:
            f = "Document_SetParagraphKeepNext";
            break;
        case AscDFH.$5d:
            f = "Document_SetParagraphContextualSpacing";
            break;
        case AscDFH.w6d:
            f = "Document_SetTextHighlightNone";
            break;
        case AscDFH.v6d:
            f = "Document_SetTextHighlightColor";
            break;
        case AscDFH.q6d:
            f = "Document_SetTextColor";
            break;
        case AscDFH.l6d:
            f = "Document_SetParagraphShd";
            break;
        case AscDFH.a6d:
            f = "Document_SetParagraphIndent";
            break;
        case AscDFH.Vzd:
            f = "Document_IncParagraphIndent";
            break;
        case AscDFH.Nzd:
            f = "Document_DecParagraphIndent";
            break;
        case AscDFH.c6d:
            f = "Document_SetParagraphIndentRight";
            break;
        case AscDFH.b6d:
            f = "Document_SetParagraphIndentFirstLine";
            break;
        case AscDFH.W5d:
            f = "Document_SetPageOrientation";
            break;
        case AscDFH.X5d:
            f = "Document_SetPageSize";
            break;
        case AscDFH.QTd:
            f = "Document_AddPageBreak";
            break;
        case AscDFH.Z4d:
            f = "Document_AddPageNumToHdrFtr";
            break;
        case AscDFH.Y4d:
            f = "Document_AddPageNumToCurrentPos";
            break;
        case AscDFH.S5d:
            f = "Document_SetHdrFtrDistance";
            break;
        case AscDFH.U5d:
            f = "Document_SetHdrFtrFirstPage";
            break;
        case AscDFH.T5d:
            f = "Document_SetHdrFtrEvenAndOdd";
            break;
        case AscDFH.V5d:
            f = "Document_SetHdrFtrLink";
            break;
        case AscDFH.$4d:
            f = "Document_AddTable";
            break;
        case AscDFH.H6d:
            f = "Document_TableAddRowAbove";
            break;
        case AscDFH.I6d:
            f = "Document_TableAddRowBelow";
            break;
        case AscDFH.F6d:
            f = "Document_TableAddColumnLeft";
            break;
        case AscDFH.G6d:
            f = "Document_TableAddColumnRight";
            break;
        case AscDFH.K6d:
            f = "Document_TableRemoveRow";
            break;
        case AscDFH.J6d:
            f = "Document_TableRemoveColumn";
            break;
        case AscDFH.F5d:
            f = "Document_RemoveTable";
            break;
        case AscDFH.w5d:
            f = "Document_MergeTableCells";
            break;
        case AscDFH.E6d:
            f = "Document_SplitTableCells";
            break;
        case AscDFH.b5d:
            f = "Document_ApplyTablePr";
            break;
        case AscDFH.V4d:
            f = "Document_AddImageUrl";
            break;
        case AscDFH.W4d:
            f = "Document_AddImageUrlLong";
            break;
        case AscDFH.U4d:
            f = "Document_AddImageToPage";
            break;
        case AscDFH.TTd:
            f = "Document_ApplyImagePrWithUrl";
            break;
        case AscDFH.a5d:
            f = "Document_ApplyImagePrWithUrlLong";
            break;
        case AscDFH.Tlf:
            f = "Document_ApplyImagePrWithFillUrl";
            break;
        case AscDFH.Ulf:
            f = "Document_ApplyImagePrWithFillUrlLong";
            break;
        case AscDFH.Gzd:
            f = "Document_ApplyImagePr";
            break;
        case AscDFH.S4d:
            f = "Document_AddHyperlink";
            break;
        case AscDFH.d5d:
            f = "Document_ChangeHyperlink";
            break;
        case AscDFH.E5d:
            f = "Document_RemoveHyperlink";
            break;
        case AscDFH.ZTd:
            f = "Document_ReplaceMisspelledWord";
            break;
        case AscDFH.R4d:
            f = "Document_AddComment";
            break;
        case AscDFH.A5d:
            f = "Document_RemoveComment";
            break;
        case AscDFH.c5d:
            f = "Document_ChangeComment";
            break;
        case AscDFH.t6d:
            f = "Document_SetTextFontNameLong";
            break;
        case AscDFH.T4d:
            f = "Document_AddImage";
            break;
        case AscDFH.h5d:
            f = "Document_ClearFormatting";
            break;
        case AscDFH.RTd:
            f = "Document_AddSectionBreak";
            break;
        case AscDFH.PTd:
            f = "Document_AddMath";
            break;
        case AscDFH.fUd:
            f = "Document_SetParagraphTabs";
            break;
        case AscDFH.eUd:
            f = "Document_SetParagraphIndentFromRulers";
            break;
        case AscDFH.bUd:
            f = "Document_SetDocumentMargin_Hor";
            break;
        case AscDFH.fxc:
            f = "Document_SetTableMarkup_Hor";
            break;
        case AscDFH.cUd:
            f = "Document_SetDocumentMargin_Ver";
            break;
        case AscDFH.dUd:
            f = "Document_SetHdrFtrBounds";
            break;
        case AscDFH.gUd:
            f = "Document_SetTableMarkup_Ver";
            break;
        case AscDFH.Qzd:
            f = "Document_DocumentExtendToPos";
            break;
        case AscDFH.rzd:
            f = "Document_AddDropCap";
            break;
        case AscDFH.GXb:
            f = "Document_RemoveDropCap";
            break;
        case AscDFH.vAd:
            f = "Document_SetTextHighlight";
            break;
        case AscDFH.oYc:
            f = "Document_BackSpaceButton";
            break;
        case AscDFH.Zzd:
            f = "Document_MoveParagraphByTab";
            break;
        case AscDFH.Bzd:
            f = "Document_AddTab";
            break;
        case AscDFH.qYc:
            f = "Document_EnterButton";
            break;
        case AscDFH.HXb:
            f = "Document_SpaceButton";
            break;
        case AscDFH.imf:
            f = "Document_ShiftInsert";
            break;
        case AscDFH.jmf:
            f = "Document_ShiftInsertSafari";
            break;
        case AscDFH.Ozd:
            f = "Document_DeleteButton";
            break;
        case AscDFH.hmf:
            f = "Document_ShiftDeleteButton";
            break;
        case AscDFH.rAd:
            f = "Document_SetStyleHeading1";
            break;
        case AscDFH.sAd:
            f = "Document_SetStyleHeading2";
            break;
        case AscDFH.tAd:
            f = "Document_SetStyleHeading3";
            break;
        case AscDFH.yAd:
            f = "Document_SetTextStrikeoutHotKey";
            break;
        case AscDFH.uAd:
            f = "Document_SetTextBoldHotKey";
            break;
        case AscDFH.E8b:
            f = "Document_SetParagraphAlignHotKey";
            break;
        case AscDFH.szd:
            f = "Document_AddEuroLetter";
            break;
        case AscDFH.xAd:
            f = "Document_SetTextItalicHotKey";
            break;
        case AscDFH.dmf:
            f = "Document_SetParagraphAlignHotKey2";
            break;
        case AscDFH.pAd:
            f = "Document_SetParagraphNumberingHotKey";
            break;
        case AscDFH.emf:
            f = "Document_SetParagraphAlignHotKey3";
            break;
        case AscDFH.Azd:
            f = "Document_AddPageNumHotKey";
            break;
        case AscDFH.fmf:
            f = "Document_SetParagraphAlignHotKey4";
            break;
        case AscDFH.zAd:
            f = "Document_SetTextUnderlineHotKey";
            break;
        case AscDFH.Tzd:
            f = "Document_FormatPasteHotKey";
            break;
        case AscDFH.FXb:
            f = "Document_PasteHotKey";
            break;
        case AscDFH.$lf:
            f = "Document_PasteSafariHotKey";
            break;
        case AscDFH.Ylf:
            f = "Document_CutHotKey";
            break;
        case AscDFH.gmf:
            f = "Document_SetTextVertAlignHotKey";
            break;
        case AscDFH.Qlf:
            f = "Document_AddMathHotKey";
            break;
        case AscDFH.AAd:
            f = "Document_SetTextVertAlignHotKey2";
            break;
        case AscDFH.Wzd:
            f = "Document_MinusButton";
            break;
        case AscDFH.BAd:
            f = "Document_SetTextVertAlignHotKey3";
            break;
        case AscDFH.wzd:
            f = "Document_AddLetter";
            break;
        case AscDFH.$zd:
            f = "Document_MoveTableBorder";
            break;
        case AscDFH.Uzd:
            f = "Document_FormatPasteHotKey2";
            break;
        case AscDFH.wAd:
            f = "Document_SetTextHighlight2";
            break;
        case AscDFH.Fzd:
            f = "Document_AddTextFromTextBox";
            break;
        case AscDFH.xzd:
            f = "Document_AddMailMergeField";
            break;
        case AscDFH.Yzd:
            f = "Document_MoveInlineTable";
            break;
        case AscDFH.Xzd:
            f = "Document_MoveFlowTable";
            break;
        case AscDFH.lAd:
            f = "Document_RestoreFieldTemplateText";
            break;
        case AscDFH.lxc:
            f = "Spreadsheet_SetCellFontName";
            break;
        case AscDFH.MAd:
            f = "Spreadsheet_SetCellFontSize";
            break;
        case AscDFH.KAd:
            f = "Spreadsheet_SetCellBold";
            break;
        case AscDFH.RAd:
            f = "Spreadsheet_SetCellItalic";
            break;
        case AscDFH.WAd:
            f = "Spreadsheet_SetCellUnderline";
            break;
        case AscDFH.SAd:
            f = "Spreadsheet_SetCellStrikeout";
            break;
        case AscDFH.TAd:
            f = "Spreadsheet_SetCellSubscript";
            break;
        case AscDFH.UAd:
            f = "Spreadsheet_SetCellSuperscript";
            break;
        case AscDFH.IAd:
            f = "Spreadsheet_SetCellAlign";
            break;
        case AscDFH.Nyb:
            f = "Spreadsheet_SetCellVertAlign";
            break;
        case AscDFH.VAd:
            f = "Spreadsheet_SetCellTextColor";
            break;
        case AscDFH.JAd:
            f = "Spreadsheet_SetCellBackgroundColor";
            break;
        case AscDFH.QAd:
            f = "Spreadsheet_SetCellIncreaseFontSize";
            break;
        case AscDFH.LAd:
            f = "Spreadsheet_SetCellDecreaseFontSize";
            break;
        case AscDFH.NAd:
            f = "Spreadsheet_SetCellHyperlinkAdd";
            break;
        case AscDFH.OAd:
            f = "Spreadsheet_SetCellHyperlinkModify";
            break;
        case AscDFH.PAd:
            f = "Spreadsheet_SetCellHyperlinkRemove";
            break;
        case AscDFH.FAd:
            f = "Spreadsheet_EditChart";
            break;
        case AscDFH.kxc:
            f = "Spreadsheet_Remove";
            break;
        case AscDFH.EAd:
            f = "Spreadsheet_AddTab";
            break;
        case AscDFH.ixc:
            f = "Spreadsheet_AddNewParagraph";
            break;
        case AscDFH.kUd:
            f = "Spreadsheet_AddSpace";
            break;
        case AscDFH.hxc:
            f = "Spreadsheet_AddItem";
            break;
        case AscDFH.HAd:
            f = "Spreadsheet_PutPrLineSpacing";
            break;
        case AscDFH.YAd:
            f = "Spreadsheet_SetParagraphSpacing";
            break;
        case AscDFH.XAd:
            f = "Spreadsheet_SetGraphicObjectsProps";
            break;
        case AscDFH.GAd:
            f = "Spreadsheet_ParaApply";
            break;
        case AscDFH.Myb:
            f = "Spreadsheet_GraphicObjectLayer";
            break;
        case AscDFH.lUd:
            f = "Spreadsheet_ParagraphAdd";
            break;
        case AscDFH.jxc:
            f = "Spreadsheet_CreateGroup";
            break;
        case AscDFH.MTd:
            f = "CommonDrawings_ChangeAdj";
            break;
        case AscDFH.mYc:
            f = "CommonDrawings_EndTrack";
            break;
        case AscDFH.NTd:
            f = "CommonDrawings_CopyCtrl";
            break;
        case AscDFH.DAd:
            f = "Presentation_ParaApply";
            break;
        case AscDFH.t7d:
            f = "Presentation_ParaFormatPaste";
            break;
        case AscDFH.Q6d:
            f = "Presentation_AddNewParagraph";
            break;
        case AscDFH.f7d:
            f = "Presentation_CreateGroup";
            break;
        case AscDFH.P7d:
            f = "Presentation_UnGroup";
            break;
        case AscDFH.L6d:
            f = "Presentation_AddChart";
            break;
        case AscDFH.j7d:
            f = "Presentation_EditChart";
            break;
        case AscDFH.lua:
            f = "Presentation_ParagraphAdd";
            break;
        case AscDFH.u7d:
            f = "Presentation_ParagraphClearFormatting";
            break;
        case AscDFH.G7d:
            f = "Presentation_SetParagraphAlign";
            break;
        case AscDFH.I7d:
            f = "Presentation_SetParagraphSpacing";
            break;
        case AscDFH.J7d:
            f = "Presentation_SetParagraphTabs";
            break;
        case AscDFH.H7d:
            f = "Presentation_SetParagraphIndent";
            break;
        case AscDFH.sYc:
            f = "Presentation_SetParagraphNumbering";
            break;
        case AscDFH.v7d:
            f = "Presentation_ParagraphIncDecFontSize";
            break;
        case AscDFH.w7d:
            f = "Presentation_ParagraphIncDecIndent";
            break;
        case AscDFH.F7d:
            f = "Presentation_SetImageProps";
            break;
        case AscDFH.K7d:
            f = "Presentation_SetShapeProps";
            break;
        case AscDFH.e7d:
            f = "Presentation_ChartApply";
            break;
        case AscDFH.b7d:
            f = "Presentation_ChangeShapeType";
            break;
        case AscDFH.L7d:
            f = "Presentation_SetVerticalAlign";
            break;
        case AscDFH.k7d:
            f = "Presentation_HyperlinkAdd";
            break;
        case AscDFH.l7d:
            f = "Presentation_HyperlinkModify";
            break;
        case AscDFH.m7d:
            f = "Presentation_HyperlinkRemove";
            break;
        case AscDFH.h7d:
            f = "Presentation_DistHor";
            break;
        case AscDFH.i7d:
            f = "Presentation_DistVer";
            break;
        case AscDFH.X6d:
            f = "Presentation_BringToFront";
            break;
        case AscDFH.W6d:
            f = "Presentation_BringForward";
            break;
        case AscDFH.E7d:
            f = "Presentation_SendToBack";
            break;
        case AscDFH.V6d:
            f = "Presentation_BringBackward";
            break;
        case AscDFH.U6d:
            f = "Presentation_ApplyTiming";
            break;
        case AscDFH.r7d:
            f = "Presentation_MoveSlidesToEnd";
            break;
        case AscDFH.p7d:
            f = "Presentation_MoveSlidesNextPos";
            break;
        case AscDFH.q7d:
            f = "Presentation_MoveSlidesPrevPos";
            break;
        case AscDFH.s7d:
            f = "Presentation_MoveSlidesToStart";
            break;
        case AscDFH.o7d:
            f = "Presentation_MoveComments";
            break;
        case AscDFH.Fmf:
            f = "Presentation_TableBorder";
            break;
        case AscDFH.jUd:
            f = "Presentation_AddFlowImage";
            break;
        case AscDFH.P6d:
            f = "Presentation_AddFlowTable";
            break;
        case AscDFH.Y6d:
            f = "Presentation_ChangeBackground";
            break;
        case AscDFH.R6d:
            f = "Presentation_AddNextSlide";
            break;
        case AscDFH.M7d:
            f = "Presentation_ShiftSlides";
            break;
        case AscDFH.g7d:
            f = "Presentation_DeleteSlides";
            break;
        case AscDFH.a7d:
            f = "Presentation_ChangeLayout";
            break;
        case AscDFH.c7d:
            f = "Presentation_ChangeSlideSize";
            break;
        case AscDFH.Z6d:
            f = "Presentation_ChangeColorScheme";
            break;
        case AscDFH.O6d:
            f = "Presentation_AddComment";
            break;
        case AscDFH.$6d:
            f = "Presentation_ChangeComment";
            break;
        case AscDFH.wmf:
            f = "Presentation_PutTextPrFontName";
            break;
        case AscDFH.xmf:
            f = "Presentation_PutTextPrFontSize";
            break;
        case AscDFH.umf:
            f = "Presentation_PutTextPrBold";
            break;
        case AscDFH.zmf:
            f = "Presentation_PutTextPrItalic";
            break;
        case AscDFH.Emf:
            f = "Presentation_PutTextPrUnderline";
            break;
        case AscDFH.Dmf:
            f = "Presentation_PutTextPrStrikeout";
            break;
        case AscDFH.Amf:
            f = "Presentation_PutTextPrLineSpacing";
            break;
        case AscDFH.Cmf:
            f = "Presentation_PutTextPrSpacingBeforeAfter";
            break;
        case AscDFH.ymf:
            f = "Presentation_PutTextPrIncreaseFontSize";
            break;
        case AscDFH.vmf:
            f = "Presentation_PutTextPrDecreaseFontSize";
            break;
        case AscDFH.A7d:
            f = "Presentation_PutTextPrAlign";
            break;
        case AscDFH.tmf:
            f = "Presentation_PutTextPrBaseline";
            break;
        case AscDFH.Bmf:
            f = "Presentation_PutTextPrListType";
            break;
        case AscDFH.rmf:
            f = "Presentation_PutTextColor";
            break;
        case AscDFH.smf:
            f = "Presentation_PutTextColor2";
            break;
        case AscDFH.y7d:
            f = "Presentation_PutPrIndent";
            break;
        case AscDFH.z7d:
            f = "Presentation_PutPrIndentRight";
            break;
        case AscDFH.x7d:
            f = "Presentation_PutPrFirstLineIndent";
            break;
        case AscDFH.nmf:
            f = "Presentation_AddPageBreak";
            break;
        case AscDFH.S6d:
            f = "Presentation_AddRowAbove";
            break;
        case AscDFH.T6d:
            f = "Presentation_AddRowBelow";
            break;
        case AscDFH.M6d:
            f = "Presentation_AddColLeft";
            break;
        case AscDFH.N6d:
            f = "Presentation_AddColRight";
            break;
        case AscDFH.C7d:
            f = "Presentation_RemoveRow";
            break;
        case AscDFH.B7d:
            f = "Presentation_RemoveCol";
            break;
        case AscDFH.D7d:
            f = "Presentation_RemoveTable";
            break;
        case AscDFH.n7d:
            f = "Presentation_MergeCells";
            break;
        case AscDFH.N7d:
            f = "Presentation_SplitCells";
            break;
        case AscDFH.O7d:
            f = "Presentation_TblApply";
            break;
        case AscDFH.rYc:
            f = "Presentation_RemoveComment";
            break;
        case AscDFH.omf:
            f = "Presentation_EndFontLoad";
            break;
        case AscDFH.d7d:
            f = "Presentation_ChangeTheme";
            break;
        case AscDFH.Gmf:
            f = "Presentation_TableMoveFromRulers";
            break;
        case AscDFH.Hmf:
            f = "Presentation_TableMoveFromRulersInline";
            break;
        case AscDFH.pmf:
            f = "Presentation_PasteOnThumbnails";
            break;
        case AscDFH.qmf:
            f = "Presentation_PasteOnThumbnailsSafari";
            break;
        case AscDFH.Mzd:
            f = "Document_ConvertOldEquation";
            break;
        case AscDFH.yzd:
            f = "Document_AddNewStyle";
            break;
        case AscDFH.hAd:
            f = "Document_RemoveStyle";
            break;
        case AscDFH.STd:
            f = "Document_AddTextArt";
            break;
        case AscDFH.eAd:
            f = "Document_RemoveAllCustomStyles";
            break;
        case AscDFH.mzd:
            f = "Document_AcceptAllRevisionChanges";
            break;
        case AscDFH.cAd:
            f = "Document_RejectAllRevisionChanges";
            break;
        case AscDFH.nzd:
            f = "Document_AcceptRevisionChange";
            break;
        case AscDFH.dAd:
            f = "Document_RejectRevisionChange";
            break;
        case AscDFH.$wc:
            f = "Document_AcceptRevisionChangesBySelection";
            break;
        case AscDFH.amf:
            f = "Document_RejectRevisionChangesBySelection";
            break;
        case AscDFH.nYc:
            f = "Document_AddLetterUnion";
            break;
        case AscDFH.mAd:
            f = "Document_SetColumnsFromRuler";
            break;
        case AscDFH.exc:
            f = "Document_SetColumnsProps";
            break;
        case AscDFH.Klf:
            f = "Document_AddColumnBreak";
            break;
        case AscDFH.Czd:
            f = "Document_AddTabToMath";
            break;
        case AscDFH.Vlf:
            f = "Document_ApplyPrToMath";
            break;
        case AscDFH.oAd:
            f = "Document_SetMathProps";
            break;
        case AscDFH.qAd:
            f = "Document_SetColumnsProps";
            break;
        case AscDFH.xRc:
            f = "Document_ApiBuilder";
            break;
        case AscDFH.Rlf:
            f = "Document_AddOleObject";
            break;
        case AscDFH.Zlf:
            f = "Document_EditOleObject";
            break;
        case AscDFH.jGb:
            f = "Document_CompositeInput";
            break;
        case AscDFH.lfb:
            f = "Document_CompositeInputReplace";
            break;
        case AscDFH.zzd:
            f = "Document_AddPageCount";
            break;
        case AscDFH.uzd:
            f = "Document_AddFootnote";
            break;
        case AscDFH.nAd:
            f = "Document_SetFootnotePr";
            break;
        case AscDFH.fAd:
            f = "Document_RemoveAllFootnotes";
            break;
        case AscDFH.YTd:
            f = "Document_InsertDocumentsByUrls";
            break;
        case AscDFH.Jlf:
            f = "Document_AddBlockLevelContentControl";
            break;
        case AscDFH.Plf:
            f = "Document_AddInlineLevelContentControl";
            break;
        case AscDFH.C5d:
            f = "Document_RemoveContentControl";
            break;
        case AscDFH.D5d:
            f = "Document_RemoveContentControlWrapper";
            break;
        case AscDFH.VTd:
            f = "Document_ChangeContentControlProperties";
            break;
        case AscDFH.Zwc:
            f = "DocumentMacros_Data";
            break;
        case AscDFH.pzd:
            f = "Document_AddBookmark";
            break;
        case AscDFH.Ezd:
            f = "Document_AddTableOfContents";
            break;
        case AscDFH.Jzd:
            f = "Document_ChangeOutlineLevel";
            break;
        case AscDFH.axc:
            f = "Document_AddElementToOutline";
            break;
        case AscDFH.kAd:
            f = "Document_ResizeTable";
            break;
        case AscDFH.B5d:
            f = "Document_RemoveComplexField";
            break;
        case AscDFH.yRc:
            f = "Document_SetComplexFieldPr";
            break;
        case AscDFH.iUd:
            f = "Document_UpdateTableOfContents";
            break;
        case AscDFH.K5d:
            f = "Document_SectionStartPage";
            break;
        case AscDFH.WTd:
            f = "Document_DistributeTableCells";
            break;
        case AscDFH.gAd:
            f = "Document_RemoveBookmark";
            break;
        case AscDFH.Lzd:
            f = "Document_ContinueNumbering";
            break;
        case AscDFH.dxc:
            f = "Document_RestartNumbering";
            break;
        case AscDFH.Izd:
            f = "Document_AutomaticListAsType";
            break;
        case AscDFH.j5d:
            f = "Document_CreateNum";
            break;
        case AscDFH.e5d:
            f = "Document_ChangeNumLvl";
            break;
        case AscDFH.Hzd:
            f = "Document_AutoCorrectSmartQuotes";
            break;
        case AscDFH.Wlf:
            f = "Document_AutoCorrectHyphensWithDash";
            break;
        case AscDFH.Q5d:
            f = "Document_SetGlobalSdtHighlightColor";
            break;
        case AscDFH.R5d:
            f = "Document_SetGlobalSdtShowHighlight";
            break;
        case AscDFH.gxc:
            f = "Document_UpdateFields";
            break;
        case AscDFH.ozd:
            f = "Document_AddBlankPage";
            break;
        case AscDFH.Dzd:
            f = "Document_AddTableFormula";
            break;
        case AscDFH.Kzd:
            f = "Document_ChangeTableFormula";
            break;
        case AscDFH.i6d:
            f = "Document_SetParagraphOutlineLvl";
            break;
        case AscDFH.G5d:
            f = "Document_RemoveTableCells";
            break;
        case AscDFH.Llf:
            f = "Document_AddContentControlCheckBox";
            break;
        case AscDFH.M5d:
            f = "Document_SetContentControlCheckBoxPr";
            break;
        case AscDFH.Olf:
            f = "Document_AddContentControlPicture";
            break;
        case AscDFH.cmf:
            f = "Document_SetContentControlPictureUrl";
            break;
        case AscDFH.z5d:
            f = "Document_RemoveAllComments";
            break;
        case AscDFH.Nlf:
            f = "Document_AddContentControlList";
            break;
        case AscDFH.$Td:
            f = "Document_SetContentControlListPr";
            break;
        case AscDFH.L5d:
            f = "Document_SelectContentControlListItem";
            break;
        case AscDFH.Mlf:
            f = "Document_AddContentControlDatePicker";
            break;
        case AscDFH.bmf:
            f = "Document_SetContentControlDatePickerPr";
            break;
        case AscDFH.bxc:
            f = "Document_AddTextWithProperties";
            break;
        case AscDFH.qzd:
            f = "Document_AddCaption";
            break;
        case AscDFH.Xlf:
            f = "Document_CompareDocuments";
            break;
        case AscDFH.Rzd:
            f = "Document_DrawNewTable";
            break;
        case AscDFH.Szd:
            f = "Document_DrawTable"
        }
        return f
    }
    ;
    f.AscDFH.Dlg = function(e) {
        return e >> 16 & 65535
    }
    ;
    f.AscDFH.GRc = 0;
    f.AscDFH.OUd = 1;
    f.AscDFH.PUd = 2;
    f.AscDFH.Y0b = 3;
    f.AscDFH.QUd = 4;
    f.AscDFH.kHc = 0;
    f.AscDFH.MBd = 65536;
    f.AscDFH.DFa = 131072;
    f.AscDFH.Jy = 196608;
    f.AscDFH.tF = 262144;
    f.AscDFH.lS = 327680;
    f.AscDFH.gAg = 393216;
    f.AscDFH.iAg = 458752;
    f.AscDFH.hAg = 524288;
    f.AscDFH.sF = 589824;
    f.AscDFH.Hla = 655360;
    f.AscDFH.n2 = 720896;
    f.AscDFH.c1b = 786432;
    f.AscDFH.jAg = 851968;
    f.AscDFH.lAg = 917504;
    f.AscDFH.DBd = 983040;
    f.AscDFH.K1a = 1048576;
    f.AscDFH.nob = 1114112;
    f.AscDFH.zBd = 1179648;
    f.AscDFH.Qnf = 1245184;
    f.AscDFH.kAg = 1310720;
    f.AscDFH.N1a = 1376256;
    f.AscDFH.rF = 1507328;
    f.AscDFH.CQ = 1572864;
    f.AscDFH.fAg = 1638400;
    f.AscDFH.Hq = 1703936;
    f.AscDFH.RUd = 1769472;
    f.AscDFH.pv = 1835008;
    f.AscDFH.FBd = 1900544;
    f.AscDFH.gC = 1966080;
    f.AscDFH.NBd = 2031616;
    f.AscDFH.OBd = 2097152;
    f.AscDFH.PBd = 2162688;
    f.AscDFH.QBd = 2228224;
    f.AscDFH.TBd = 2293760;
    f.AscDFH.UBd = 2359296;
    f.AscDFH.VBd = 2424832;
    f.AscDFH.YBd = 2490368;
    f.AscDFH.WBd = 2555904;
    f.AscDFH.XBd = 2621440;
    f.AscDFH.ZBd = 2686976;
    f.AscDFH.$Bd = 2752512;
    f.AscDFH.oAg = 2818048;
    f.AscDFH.nAg = 2883584;
    f.AscDFH.rAg = 2949120;
    f.AscDFH.mAg = 3014656;
    f.AscDFH.qAg = 3080192;
    f.AscDFH.sAg = 3145728;
    f.AscDFH.aCd = 3211264;
    f.AscDFH.bCd = 3276800;
    f.AscDFH.SBd = 3342336;
    f.AscDFH.pAg = 3407872;
    f.AscDFH.RBd = 3473408;
    f.AscDFH.Snf = 3538944;
    f.AscDFH.Ggb = 3604480;
    f.AscDFH.JPa = 3670016;
    f.AscDFH.CBd = 3735552;
    f.AscDFH.Gla = 3801088;
    f.AscDFH.yBd = 3866624;
    f.AscDFH.a$ = 3932160;
    f.AscDFH.EBd = 3997696;
    f.AscDFH.SUd = 4063232;
    f.AscDFH.j1b = 4128768;
    f.AscDFH.pAb = 4194304;
    f.AscDFH.GBd = 4259840;
    f.AscDFH.Tnf = 4325376;
    f.AscDFH.d6 = 65536E3;
    f.AscDFH.aHc = 65601536;
    f.AscDFH.bHc = 65667072;
    f.AscDFH.rAb = 65732608;
    f.AscDFH.HBd = 65798144;
    f.AscDFH.IBd = 65863680;
    f.AscDFH.JBd = 65929216;
    f.AscDFH.iHc = 65994752;
    f.AscDFH.LBd = 66060288;
    f.AscDFH.L1a = 66125824;
    f.AscDFH.KBd = 66191360;
    f.AscDFH.gHc = 66256896;
    f.AscDFH.eHc = 66322432;
    f.AscDFH.fHc = 66387968;
    f.AscDFH.Jgb = 66453504;
    f.AscDFH.m1b = 66519040;
    f.AscDFH.Rnf = 66584576;
    f.AscDFH.jHc = 66650112;
    f.AscDFH.d1b = 66715648;
    f.AscDFH.hHc = 66781184;
    f.AscDFH.Rxa = 66846720;
    f.AscDFH.Egb = 66912256;
    f.AscDFH.BFa = 66977792;
    f.AscDFH.Mgb = 67043328;
    f.AscDFH.O1a = 67108864;
    f.AscDFH.Ogb = 67174400;
    f.AscDFH.s1b = 67239936;
    f.AscDFH.dHc = 67305472;
    f.AscDFH.p_ = 67371008;
    f.AscDFH.Js = 67436544;
    f.AscDFH.Qxa = 67502080;
    f.AscDFH.ura = 67567616;
    f.AscDFH.lAb = 67633152;
    f.AscDFH.Q1a = 67698688;
    f.AscDFH.aY = 67764224;
    f.AscDFH.mAb = 67829760;
    f.AscDFH.Pga = 67895296;
    f.AscDFH.eAg = 67960832;
    f.AscDFH.k1b = 68026368;
    f.AscDFH.S1a = 68091904;
    f.AscDFH.IPa = 68157440;
    f.AscDFH.GI = 68222976;
    f.AscDFH.j2 = 68288512;
    f.AscDFH.sAb = 68354048;
    f.AscDFH.Qv = 68419584;
    f.AscDFH.rra = 68485120;
    f.AscDFH.RA = 68550656;
    f.AscDFH.Fla = 68616192;
    f.AscDFH.Bu = 68681728;
    f.AscDFH.vra = 68747264;
    f.AscDFH.EE = 68812800;
    f.AscDFH.k2 = 68878336;
    f.AscDFH.l2 = 68943872;
    f.AscDFH.Z0b = 69009408;
    f.AscDFH.kS = 69074944;
    f.AscDFH.AQ = 69140480;
    f.AscDFH.CFa = 69206016;
    f.AscDFH.Pxa = 69271552;
    f.AscDFH.g1b = 69337088;
    f.AscDFH.nAb = 69402624;
    f.AscDFH.oAb = 69468160;
    f.AscDFH.l1b = 69533696;
    f.AscDFH.Rga = 69599232;
    f.AscDFH.u1b = 69664768;
    f.AscDFH.q1b = 69730304;
    f.AscDFH.o1b = 69795840;
    f.AscDFH.p1b = 69861376;
    f.AscDFH.T1a = 69926912;
    f.AscDFH.i1b = 69992448;
    f.AscDFH.h1b = 70057984;
    f.AscDFH.r1b = 70123520;
    f.AscDFH.v1b = 70189056;
    f.AscDFH.$X = 70254592;
    f.AscDFH.M1a = 70320128;
    f.AscDFH.P1a = 70385664;
    f.AscDFH.wra = 70451200;
    f.AscDFH.b6 = 70516736;
    f.AscDFH.zQ = 70582272;
    f.AscDFH.e6 = 70647808;
    f.AscDFH.FFa = 70713344;
    f.AscDFH.c6 = 70778880;
    f.AscDFH.e1b = 70844416;
    f.AscDFH.n1b = 70909952;
    f.AscDFH.R1a = 70975488;
    f.AscDFH.jAb = 71041024;
    f.AscDFH.MPa = 71106560;
    f.AscDFH.b1b = 71172096;
    f.AscDFH.Ngb = 71237632;
    f.AscDFH.oca = 71303168;
    f.AscDFH.EFa = 71368704;
    f.AscDFH.$Gc = 71434240;
    f.AscDFH.ZGc = 71499776;
    f.AscDFH.f1b = 71565312;
    f.AscDFH.Hgb = 71630848;
    f.AscDFH.kAb = 71696384;
    f.AscDFH.Igb = 71761920;
    f.AscDFH.t1b = 71827456;
    f.AscDFH.Kgb = 71892992;
    f.AscDFH.a1b = 71958528;
    f.AscDFH.$0b = 72024064;
    f.AscDFH.qAb = 72089600;
    f.AscDFH.tra = 72155136;
    f.AscDFH.KPa = 72220672;
    f.AscDFH.Oga = 72286208;
    f.AscDFH.ns = 72351744;
    f.AscDFH.Fgb = 72417280;
    f.AscDFH.tw = 72482816;
    f.AscDFH.vx = 72548352;
    f.AscDFH.sra = 72613888;
    f.AscDFH.LPa = 72679424;
    f.AscDFH.kUa = 72744960;
    f.AscDFH.fC = 72810496;
    f.AscDFH.Rv = 72876032;
    f.AscDFH.oob = 72941568;
    f.AscDFH.QA = 73007104;
    f.AscDFH.BQ = 73072640;
    f.AscDFH.roa = 73138176;
    f.AscDFH.mS = 73203712;
    f.AscDFH.nca = 73269248;
    f.AscDFH.xra = 73334784;
    f.AscDFH.H8b = 73400320;
    f.AscDFH.HRc = 73465856;
    f.AscDFH.Qga = 73531392;
    f.AscDFH.dz = 73596928;
    f.AscDFH.Pnf = 73662464;
    f.AscDFH.MO = 73728E3;
    f.AscDFH.BBd = 73793536;
    f.AscDFH.qF = 73859072;
    f.AscDFH.BBa = 73924608;
    f.AscDFH.wda = 73990144;
    f.AscDFH.jX = 74055680;
    f.AscDFH.yJb = 74121216;
    f.AscDFH.uYc = 74186752;
    f.AscDFH.Lgb = 74252288;
    f.AscDFH.NJa = 74317824;
    f.AscDFH.ABa = 74383360;
    f.AscDFH.ABd = 74448896;
    f.AscDFH.cHc = 131072E3;
    f.AscDFH.tBd = f.AscDFH.kHc | 0;
    f.AscDFH.M0b = f.AscDFH.MBd | 1;
    f.AscDFH.dgb = f.AscDFH.MBd | 65535;
    f.AscDFH.vBa = f.AscDFH.DFa | 1;
    f.AscDFH.wBa = f.AscDFH.DFa | 2;
    f.AscDFH.Pyb = f.AscDFH.DFa | 3;
    f.AscDFH.Qyb = f.AscDFH.DFa | 4;
    f.AscDFH.lYb = f.AscDFH.DFa | 5;
    f.AscDFH.Ryb = f.AscDFH.DFa | 6;
    f.AscDFH.mYb = f.AscDFH.DFa | 7;
    f.AscDFH.Syb = f.AscDFH.DFa | 8;
    f.AscDFH.Tyb = f.AscDFH.DFa | 9;
    f.AscDFH.xBa = f.AscDFH.Jy | 1;
    f.AscDFH.qIa = f.AscDFH.Jy | 2;
    f.AscDFH.wPa = f.AscDFH.Jy | 3;
    f.AscDFH.Z0a = f.AscDFH.Jy | 4;
    f.AscDFH.c1a = f.AscDFH.Jy | 5;
    f.AscDFH.e1a = f.AscDFH.Jy | 6;
    f.AscDFH.d1a = f.AscDFH.Jy | 7;
    f.AscDFH.$0a = f.AscDFH.Jy | 8;
    f.AscDFH.f1a = f.AscDFH.Jy | 9;
    f.AscDFH.g1a = f.AscDFH.Jy | 10;
    f.AscDFH.h1a = f.AscDFH.Jy | 11;
    f.AscDFH.o1a = f.AscDFH.Jy | 12;
    f.AscDFH.p1a = f.AscDFH.Jy | 13;
    f.AscDFH.m1a = f.AscDFH.Jy | 14;
    f.AscDFH.k1a = f.AscDFH.Jy | 15;
    f.AscDFH.l1a = f.AscDFH.Jy | 16;
    f.AscDFH.n1a = f.AscDFH.Jy | 17;
    f.AscDFH.zFa = f.AscDFH.Jy | 18;
    f.AscDFH.xFa = f.AscDFH.Jy | 19;
    f.AscDFH.yFa = f.AscDFH.Jy | 20;
    f.AscDFH.pra = f.AscDFH.Jy | 21;
    f.AscDFH.r1a = f.AscDFH.Jy | 22;
    f.AscDFH.q1a = f.AscDFH.Jy | 23;
    f.AscDFH.vFa = f.AscDFH.Jy | 24;
    f.AscDFH.Oxa = f.AscDFH.Jy | 25;
    f.AscDFH.mua = f.AscDFH.Jy | 26;
    f.AscDFH.nua = f.AscDFH.Jy | 27;
    f.AscDFH.oua = f.AscDFH.Jy | 28;
    f.AscDFH.pua = f.AscDFH.Jy | 29;
    f.AscDFH.Pv = f.AscDFH.Jy | 30;
    f.AscDFH.i1a = f.AscDFH.Jy | 31;
    f.AscDFH.j1a = f.AscDFH.Jy | 32;
    f.AscDFH.b1a = f.AscDFH.Jy | 33;
    f.AscDFH.ezb = f.AscDFH.Jy | 34;
    f.AscDFH.wFa = f.AscDFH.Jy | 35;
    f.AscDFH.xPa = f.AscDFH.Jy | 36;
    f.AscDFH.dzb = f.AscDFH.Jy | 37;
    f.AscDFH.a1a = f.AscDFH.Jy | 38;
    f.AscDFH.hgb = f.AscDFH.tF | 1;
    f.AscDFH.pgb = f.AscDFH.tF | 2;
    f.AscDFH.wgb = f.AscDFH.tF | 3;
    f.AscDFH.xgb = f.AscDFH.tF | 4;
    f.AscDFH.mgb = f.AscDFH.tF | 5;
    f.AscDFH.jgb = f.AscDFH.tF | 6;
    f.AscDFH.zgb = f.AscDFH.tF | 7;
    f.AscDFH.ogb = f.AscDFH.tF | 8;
    f.AscDFH.tgb = f.AscDFH.tF | 9;
    f.AscDFH.vgb = f.AscDFH.tF | 10;
    f.AscDFH.kgb = f.AscDFH.tF | 11;
    f.AscDFH.igb = f.AscDFH.tF | 12;
    f.AscDFH.ugb = f.AscDFH.tF | 13;
    f.AscDFH.sgb = f.AscDFH.tF | 14;
    f.AscDFH.PA = f.AscDFH.tF | 15;
    f.AscDFH.Ela = f.AscDFH.tF | 16;
    f.AscDFH.DPa = f.AscDFH.tF | 17;
    f.AscDFH.GPa = f.AscDFH.tF | 18;
    f.AscDFH.EPa = f.AscDFH.tF | 19;
    f.AscDFH.FPa = f.AscDFH.tF | 20;
    f.AscDFH.HPa = f.AscDFH.tF | 21;
    f.AscDFH.qra = f.AscDFH.tF | 22;
    f.AscDFH.APa = f.AscDFH.tF | 23;
    f.AscDFH.BPa = f.AscDFH.tF | 24;
    f.AscDFH.CPa = f.AscDFH.tF | 25;
    f.AscDFH.ygb = f.AscDFH.tF | 26;
    f.AscDFH.ngb = f.AscDFH.tF | 27;
    f.AscDFH.qgb = f.AscDFH.tF | 28;
    f.AscDFH.lgb = f.AscDFH.tF | 29;
    f.AscDFH.qYb = f.AscDFH.lS | 1;
    f.AscDFH.Zyb = f.AscDFH.lS | 2;
    f.AscDFH.Vyb = f.AscDFH.lS | 3;
    f.AscDFH.oYb = f.AscDFH.lS | 4;
    f.AscDFH.sYb = f.AscDFH.lS | 5;
    f.AscDFH.tYb = f.AscDFH.lS | 6;
    f.AscDFH.pYb = f.AscDFH.lS | 7;
    f.AscDFH.Wyb = f.AscDFH.lS | 8;
    f.AscDFH.zYb = f.AscDFH.lS | 9;
    f.AscDFH.oSa = f.AscDFH.lS | 10;
    f.AscDFH.AYb = f.AscDFH.lS | 11;
    f.AscDFH.vYb = f.AscDFH.lS | 12;
    f.AscDFH.yYb = f.AscDFH.lS | 13;
    f.AscDFH.uYb = f.AscDFH.lS | 14;
    f.AscDFH.xYb = f.AscDFH.lS | 15;
    f.AscDFH.wYb = f.AscDFH.lS | 16;
    f.AscDFH.rYb = f.AscDFH.lS | 17;
    f.AscDFH.Xyb = f.AscDFH.lS | 18;
    f.AscDFH.Yyb = f.AscDFH.lS | 19;
    f.AscDFH.J1a = f.AscDFH.sF | 1;
    f.AscDFH.E1a = f.AscDFH.sF | 2;
    f.AscDFH.x1a = f.AscDFH.sF | 3;
    f.AscDFH.F1a = f.AscDFH.sF | 4;
    f.AscDFH.B1a = f.AscDFH.sF | 5;
    f.AscDFH.D1a = f.AscDFH.sF | 6;
    f.AscDFH.C1a = f.AscDFH.sF | 7;
    f.AscDFH.y1a = f.AscDFH.sF | 8;
    f.AscDFH.z1a = f.AscDFH.sF | 9;
    f.AscDFH.A1a = f.AscDFH.sF | 10;
    f.AscDFH.ggb = f.AscDFH.sF | 11;
    f.AscDFH.Xzb = f.AscDFH.sF | 12;
    f.AscDFH.zBa = f.AscDFH.sF | 13;
    f.AscDFH.sIa = f.AscDFH.sF | 14;
    f.AscDFH.aAb = f.AscDFH.sF | 15;
    f.AscDFH.bAb = f.AscDFH.sF | 16;
    f.AscDFH.I1a = f.AscDFH.sF | 17;
    f.AscDFH.H1a = f.AscDFH.sF | 18;
    f.AscDFH.cAb = f.AscDFH.sF | 19;
    f.AscDFH.Vzb = f.AscDFH.sF | 20;
    f.AscDFH.Yzb = f.AscDFH.sF | 21;
    f.AscDFH.Zzb = f.AscDFH.sF | 22;
    f.AscDFH.Wzb = f.AscDFH.sF | 23;
    f.AscDFH.LO = f.AscDFH.sF | 24;
    f.AscDFH.G1a = f.AscDFH.sF | 25;
    f.AscDFH.fgb = f.AscDFH.sF | 26;
    f.AscDFH.egb = f.AscDFH.sF | 27;
    f.AscDFH.O0b = f.AscDFH.sF | 28;
    f.AscDFH.$zb = f.AscDFH.sF | 29;
    f.AscDFH.t1a = f.AscDFH.Hla | 1;
    f.AscDFH.s1a = f.AscDFH.Hla | 2;
    f.AscDFH.u1a = f.AscDFH.Hla | 3;
    f.AscDFH.v1a = f.AscDFH.Hla | 4;
    f.AscDFH.yBa = f.AscDFH.Hla | 5;
    f.AscDFH.rIa = f.AscDFH.Hla | 6;
    f.AscDFH.w1a = f.AscDFH.Hla | 7;
    f.AscDFH.Nga = f.AscDFH.Hla | 8;
    f.AscDFH.Uzb = f.AscDFH.Hla | 9;
    f.AscDFH.N0b = f.AscDFH.Hla | 10;
    f.AscDFH.Vfb = f.AscDFH.n2 | 1;
    f.AscDFH.Xfb = f.AscDFH.n2 | 2;
    f.AscDFH.Zfb = f.AscDFH.n2 | 3;
    f.AscDFH.bgb = f.AscDFH.n2 | 4;
    f.AscDFH.Sfb = f.AscDFH.n2 | 5;
    f.AscDFH.Tfb = f.AscDFH.n2 | 6;
    f.AscDFH.Ufb = f.AscDFH.n2 | 7;
    f.AscDFH.Rfb = f.AscDFH.n2 | 8;
    f.AscDFH.agb = f.AscDFH.n2 | 9;
    f.AscDFH.cgb = f.AscDFH.n2 | 10;
    f.AscDFH.lW = f.AscDFH.n2 | 11;
    f.AscDFH.$fb = f.AscDFH.n2 | 12;
    f.AscDFH.Yfb = f.AscDFH.n2 | 13;
    f.AscDFH.Wfb = f.AscDFH.n2 | 14;
    f.AscDFH.Tzb = f.AscDFH.n2 | 15;
    f.AscDFH.tBa = f.AscDFH.c1b | 1;
    f.AscDFH.uBa = f.AscDFH.c1b | 2;
    f.AscDFH.jPa = f.AscDFH.K1a | 1;
    f.AscDFH.nfb = f.AscDFH.K1a | 2;
    f.AscDFH.mfb = f.AscDFH.K1a | 3;
    f.AscDFH.JXb = f.AscDFH.K1a | 4;
    f.AscDFH.IXb = f.AscDFH.K1a | 5;
    f.AscDFH.WZb = f.AscDFH.j1b | 1;
    f.AscDFH.VZb = f.AscDFH.j1b | 2;
    f.AscDFH.PDc = f.AscDFH.pAb | 1;
    f.AscDFH.ODc = f.AscDFH.pAb | 2;
    f.AscDFH.QDc = f.AscDFH.pAb | 3;
    f.AscDFH.mob = f.AscDFH.nob | 1;
    f.AscDFH.F8b = f.AscDFH.nob | 2;
    f.AscDFH.R7d = f.AscDFH.nob | 3;
    f.AscDFH.kGb = f.AscDFH.zBd | 1;
    f.AscDFH.lGb = f.AscDFH.zBd | 2;
    f.AscDFH.QYb = f.AscDFH.N1a | 1;
    f.AscDFH.PYb = f.AscDFH.N1a | 2;
    f.AscDFH.MJa = f.AscDFH.N1a | 3;
    f.AscDFH.pSa = f.AscDFH.N1a | 4;
    f.AscDFH.OYb = f.AscDFH.N1a | 5;
    f.AscDFH.Ozb = f.AscDFH.rF | 1;
    f.AscDFH.vzb = f.AscDFH.rF | 2;
    f.AscDFH.Jzb = f.AscDFH.rF | 3;
    f.AscDFH.Kzb = f.AscDFH.rF | 4;
    f.AscDFH.Ezb = f.AscDFH.rF | 5;
    f.AscDFH.Azb = f.AscDFH.rF | 6;
    f.AscDFH.Bzb = f.AscDFH.rF | 7;
    f.AscDFH.Czb = f.AscDFH.rF | 8;
    f.AscDFH.Dzb = f.AscDFH.rF | 9;
    f.AscDFH.Fzb = f.AscDFH.rF | 10;
    f.AscDFH.Gzb = f.AscDFH.rF | 11;
    f.AscDFH.Hzb = f.AscDFH.rF | 12;
    f.AscDFH.Izb = f.AscDFH.rF | 13;
    f.AscDFH.Lzb = f.AscDFH.rF | 14;
    f.AscDFH.Mzb = f.AscDFH.rF | 15;
    f.AscDFH.yzb = f.AscDFH.rF | 16;
    f.AscDFH.zzb = f.AscDFH.rF | 17;
    f.AscDFH.Nzb = f.AscDFH.rF | 18;
    f.AscDFH.tzb = f.AscDFH.rF | 101;
    f.AscDFH.qzb = f.AscDFH.rF | 102;
    f.AscDFH.uzb = f.AscDFH.rF | 103;
    f.AscDFH.Pzb = f.AscDFH.rF | 104;
    f.AscDFH.wzb = f.AscDFH.rF | 105;
    f.AscDFH.Qzb = f.AscDFH.rF | 106;
    f.AscDFH.rzb = f.AscDFH.rF | 107;
    f.AscDFH.xzb = f.AscDFH.rF | 108;
    f.AscDFH.Rzb = f.AscDFH.rF | 109;
    f.AscDFH.szb = f.AscDFH.rF | 110;
    f.AscDFH.rBd = f.AscDFH.rF | 111;
    f.AscDFH.yPa = f.AscDFH.CQ | 1;
    f.AscDFH.zPa = f.AscDFH.CQ | 2;
    f.AscDFH.I0b = f.AscDFH.CQ | 3;
    f.AscDFH.C0b = f.AscDFH.CQ | 4;
    f.AscDFH.D0b = f.AscDFH.CQ | 5;
    f.AscDFH.q0b = f.AscDFH.CQ | 6;
    f.AscDFH.A0b = f.AscDFH.CQ | 7;
    f.AscDFH.H0b = f.AscDFH.CQ | 8;
    f.AscDFH.G0b = f.AscDFH.CQ | 9;
    f.AscDFH.w0b = f.AscDFH.CQ | 10;
    f.AscDFH.B0b = f.AscDFH.CQ | 11;
    f.AscDFH.v0b = f.AscDFH.CQ | 12;
    f.AscDFH.r0b = f.AscDFH.CQ | 13;
    f.AscDFH.x0b = f.AscDFH.CQ | 14;
    f.AscDFH.u0b = f.AscDFH.CQ | 15;
    f.AscDFH.t0b = f.AscDFH.CQ | 16;
    f.AscDFH.s0b = f.AscDFH.CQ | 17;
    f.AscDFH.z0b = f.AscDFH.CQ | 18;
    f.AscDFH.J0b = f.AscDFH.CQ | 19;
    f.AscDFH.F0b = f.AscDFH.CQ | 20;
    f.AscDFH.E0b = f.AscDFH.CQ | 21;
    f.AscDFH.y0b = f.AscDFH.CQ | 22;
    f.AscDFH.p0b = f.AscDFH.CQ | 23;
    f.AscDFH.S0a = f.AscDFH.Hq | 101;
    f.AscDFH.T0a = f.AscDFH.Hq | 102;
    f.AscDFH.zZb = f.AscDFH.Hq | 103;
    f.AscDFH.QZb = f.AscDFH.Hq | 201;
    f.AscDFH.Q0a = f.AscDFH.Hq | 301;
    f.AscDFH.R0a = f.AscDFH.Hq | 302;
    f.AscDFH.cZb = f.AscDFH.Hq | 303;
    f.AscDFH.lZb = f.AscDFH.Hq | 304;
    f.AscDFH.aZb = f.AscDFH.Hq | 305;
    f.AscDFH.qZb = f.AscDFH.Hq | 306;
    f.AscDFH.pZb = f.AscDFH.Hq | 307;
    f.AscDFH.mZb = f.AscDFH.Hq | 308;
    f.AscDFH.bZb = f.AscDFH.Hq | 309;
    f.AscDFH.eZb = f.AscDFH.Hq | 310;
    f.AscDFH.$Yb = f.AscDFH.Hq | 311;
    f.AscDFH.fZb = f.AscDFH.Hq | 312;
    f.AscDFH.iZb = f.AscDFH.Hq | 313;
    f.AscDFH.gZb = f.AscDFH.Hq | 314;
    f.AscDFH.hZb = f.AscDFH.Hq | 315;
    f.AscDFH.jZb = f.AscDFH.Hq | 316;
    f.AscDFH.dZb = f.AscDFH.Hq | 317;
    f.AscDFH.kZb = f.AscDFH.Hq | 318;
    f.AscDFH.nZb = f.AscDFH.Hq | 319;
    f.AscDFH.oZb = f.AscDFH.Hq | 320;
    f.AscDFH.czb = f.AscDFH.Hq | 401;
    f.AscDFH.rfb = f.AscDFH.Hq | 402;
    f.AscDFH.GZb = f.AscDFH.Hq | 501;
    f.AscDFH.RZb = f.AscDFH.Hq | 601;
    f.AscDFH.NZb = f.AscDFH.Hq | 701;
    f.AscDFH.PZb = f.AscDFH.Hq | 702;
    f.AscDFH.OZb = f.AscDFH.Hq | 703;
    f.AscDFH.BZb = f.AscDFH.Hq | 801;
    f.AscDFH.CZb = f.AscDFH.Hq | 802;
    f.AscDFH.DZb = f.AscDFH.Hq | 803;
    f.AscDFH.FZb = f.AscDFH.Hq | 804;
    f.AscDFH.EZb = f.AscDFH.Hq | 805;
    f.AscDFH.HZb = f.AscDFH.Hq | 901;
    f.AscDFH.IZb = f.AscDFH.Hq | 1001;
    f.AscDFH.vZb = f.AscDFH.Hq | 1101;
    f.AscDFH.rZb = f.AscDFH.Hq | 1102;
    f.AscDFH.tZb = f.AscDFH.Hq | 1103;
    f.AscDFH.uZb = f.AscDFH.Hq | 1104;
    f.AscDFH.sZb = f.AscDFH.Hq | 1105;
    f.AscDFH.yZb = f.AscDFH.Hq | 1106;
    f.AscDFH.wZb = f.AscDFH.Hq | 1107;
    f.AscDFH.xZb = f.AscDFH.Hq | 1108;
    f.AscDFH.ZYb = f.AscDFH.Hq | 1201;
    f.AscDFH.V0a = f.AscDFH.Hq | 1301;
    f.AscDFH.X0a = f.AscDFH.Hq | 1302;
    f.AscDFH.U0a = f.AscDFH.Hq | 1303;
    f.AscDFH.W0a = f.AscDFH.Hq | 1304;
    f.AscDFH.JZb = f.AscDFH.Hq | 1305;
    f.AscDFH.KZb = f.AscDFH.Hq | 1306;
    f.AscDFH.LZb = f.AscDFH.Hq | 1307;
    f.AscDFH.MZb = f.AscDFH.Hq | 1308;
    f.AscDFH.AZb = f.AscDFH.Hq | 1401;
    f.AscDFH.nea = f.AscDFH.pv | 1;
    f.AscDFH.wna = f.AscDFH.pv | 2;
    f.AscDFH.sfb = f.AscDFH.pv | 3;
    f.AscDFH.zfb = f.AscDFH.pv | 4;
    f.AscDFH.Gfb = f.AscDFH.pv | 5;
    f.AscDFH.Jfb = f.AscDFH.pv | 6;
    f.AscDFH.$mf = f.AscDFH.pv | 7;
    f.AscDFH.xfb = f.AscDFH.pv | 8;
    f.AscDFH.ufb = f.AscDFH.pv | 9;
    f.AscDFH.Lfb = f.AscDFH.pv | 10;
    f.AscDFH.yfb = f.AscDFH.pv | 11;
    f.AscDFH.Cfb = f.AscDFH.pv | 12;
    f.AscDFH.Ffb = f.AscDFH.pv | 13;
    f.AscDFH.wfb = f.AscDFH.pv | 14;
    f.AscDFH.tfb = f.AscDFH.pv | 15;
    f.AscDFH.Efb = f.AscDFH.pv | 16;
    f.AscDFH.Bfb = f.AscDFH.pv | 17;
    f.AscDFH.anf = f.AscDFH.pv | 18;
    f.AscDFH.Dla = f.AscDFH.pv | 19;
    f.AscDFH.Mxa = f.AscDFH.pv | 20;
    f.AscDFH.rPa = f.AscDFH.pv | 21;
    f.AscDFH.uPa = f.AscDFH.pv | 22;
    f.AscDFH.sPa = f.AscDFH.pv | 23;
    f.AscDFH.tPa = f.AscDFH.pv | 24;
    f.AscDFH.vPa = f.AscDFH.pv | 25;
    f.AscDFH.kPa = f.AscDFH.pv | 26;
    f.AscDFH.lPa = f.AscDFH.pv | 27;
    f.AscDFH.mPa = f.AscDFH.pv | 28;
    f.AscDFH.Ox = f.AscDFH.pv | 29;
    f.AscDFH.Kfb = f.AscDFH.pv | 30;
    f.AscDFH.Dfb = f.AscDFH.pv | 31;
    f.AscDFH.Afb = f.AscDFH.pv | 32;
    f.AscDFH.Nxa = f.AscDFH.pv | 33;
    f.AscDFH.Y0a = f.AscDFH.pv | 34;
    f.AscDFH.pPa = f.AscDFH.pv | 35;
    f.AscDFH.Hfb = f.AscDFH.pv | 36;
    f.AscDFH.Ifb = f.AscDFH.pv | 37;
    f.AscDFH.qPa = f.AscDFH.pv | 38;
    f.AscDFH.vfb = f.AscDFH.pv | 39;
    f.AscDFH.dDc = f.AscDFH.pv | 40;
    f.AscDFH.cDc = f.AscDFH.pv | 41;
    f.AscDFH.nPa = f.AscDFH.pv | 42;
    f.AscDFH.oPa = f.AscDFH.pv | 43;
    f.AscDFH.V_b = f.AscDFH.gC | 1;
    f.AscDFH.W_b = f.AscDFH.gC | 2;
    f.AscDFH.Q_b = f.AscDFH.gC | 3;
    f.AscDFH.Y_b = f.AscDFH.gC | 4;
    f.AscDFH.y_b = f.AscDFH.gC | 5;
    f.AscDFH.B_b = f.AscDFH.gC | 6;
    f.AscDFH.A_b = f.AscDFH.gC | 7;
    f.AscDFH.w_b = f.AscDFH.gC | 8;
    f.AscDFH.x_b = f.AscDFH.gC | 9;
    f.AscDFH.z_b = f.AscDFH.gC | 10;
    f.AscDFH.C_b = f.AscDFH.gC | 11;
    f.AscDFH.Qfb = f.AscDFH.gC | 12;
    f.AscDFH.P_b = f.AscDFH.gC | 13;
    f.AscDFH.O_b = f.AscDFH.gC | 14;
    f.AscDFH.lzb = f.AscDFH.gC | 15;
    f.AscDFH.I_b = f.AscDFH.gC | 16;
    f.AscDFH.H_b = f.AscDFH.gC | 17;
    f.AscDFH.X_b = f.AscDFH.gC | 18;
    f.AscDFH.T_b = f.AscDFH.gC | 19;
    f.AscDFH.R_b = f.AscDFH.gC | 20;
    f.AscDFH.U_b = f.AscDFH.gC | 21;
    f.AscDFH.D_b = f.AscDFH.gC | 22;
    f.AscDFH.G_b = f.AscDFH.gC | 23;
    f.AscDFH.E_b = f.AscDFH.gC | 24;
    f.AscDFH.F_b = f.AscDFH.gC | 25;
    f.AscDFH.Ofb = f.AscDFH.gC | 26;
    f.AscDFH.Pfb = f.AscDFH.gC | 27;
    f.AscDFH.M_b = f.AscDFH.gC | 28;
    f.AscDFH.L_b = f.AscDFH.gC | 29;
    f.AscDFH.K_b = f.AscDFH.gC | 30;
    f.AscDFH.J_b = f.AscDFH.gC | 31;
    f.AscDFH.S_b = f.AscDFH.gC | 32;
    f.AscDFH.N_b = f.AscDFH.gC | 33;
    f.AscDFH.zRc = f.AscDFH.Snf | 1;
    f.AscDFH.O0a = f.AscDFH.Ggb | 1;
    f.AscDFH.P0a = f.AscDFH.Ggb | 2;
    f.AscDFH.DYb = f.AscDFH.Ggb | 3;
    f.AscDFH.CYb = f.AscDFH.Ggb | 4;
    f.AscDFH.EYb = f.AscDFH.JPa | 1;
    f.AscDFH.LYb = f.AscDFH.JPa | 2;
    f.AscDFH.GYb = f.AscDFH.JPa | 3;
    f.AscDFH.FYb = f.AscDFH.JPa | 4;
    f.AscDFH.KYb = f.AscDFH.JPa | 5;
    f.AscDFH.JYb = f.AscDFH.JPa | 6;
    f.AscDFH.IYb = f.AscDFH.JPa | 7;
    f.AscDFH.HYb = f.AscDFH.JPa | 8;
    f.AscDFH.j_b = f.AscDFH.a$ | 1;
    f.AscDFH.q_b = f.AscDFH.a$ | 2;
    f.AscDFH.u_b = f.AscDFH.a$ | 3;
    f.AscDFH.r_b = f.AscDFH.a$ | 4;
    f.AscDFH.s_b = f.AscDFH.a$ | 5;
    f.AscDFH.o_b = f.AscDFH.a$ | 6;
    f.AscDFH.k_b = f.AscDFH.a$ | 7;
    f.AscDFH.l_b = f.AscDFH.a$ | 8;
    f.AscDFH.Mfb = f.AscDFH.a$ | 9;
    f.AscDFH.Nfb = f.AscDFH.a$ | 10;
    f.AscDFH.t_b = f.AscDFH.a$ | 11;
    f.AscDFH.m_b = f.AscDFH.a$ | 12;
    f.AscDFH.p_b = f.AscDFH.a$ | 13;
    f.AscDFH.n_b = f.AscDFH.a$ | 14;
    f.AscDFH.v_b = f.AscDFH.a$ | 15;
    f.AscDFH.pfb = f.AscDFH.d6 | 101;
    f.AscDFH.PXb = f.AscDFH.d6 | 102;
    f.AscDFH.nUd = f.AscDFH.d6 | 103;
    f.AscDFH.oUd = f.AscDFH.d6 | 104;
    f.AscDFH.ZAd = f.AscDFH.d6 | 105;
    f.AscDFH.Hxc = f.AscDFH.d6 | 106;
    f.AscDFH.Gxc = f.AscDFH.d6 | 107;
    f.AscDFH.OXb = f.AscDFH.d6 | 108;
    f.AscDFH.Fxc = f.AscDFH.d6 | 109;
    f.AscDFH.Exc = f.AscDFH.d6 | 110;
    f.AscDFH.$Ad = f.AscDFH.d6 | 201;
    f.AscDFH.KO = f.AscDFH.d6 | 301;
    f.AscDFH.Z9 = f.AscDFH.d6 | 302;
    f.AscDFH.N0a = f.AscDFH.d6 | 303;
    f.AscDFH.OC = f.AscDFH.d6 | 304;
    f.AscDFH.gYb = f.AscDFH.d6 | 401;
    f.AscDFH.d_b = f.AscDFH.Gla | 1;
    f.AscDFH.xbc = f.AscDFH.Gla | 2;
    f.AscDFH.ARc = f.AscDFH.Gla | 3;
    f.AscDFH.enf = f.AscDFH.Gla | 4;
    f.AscDFH.W7d = f.AscDFH.Gla | 5;
    f.AscDFH.V7d = f.AscDFH.Gla | 6;
    f.AscDFH.X7d = f.AscDFH.Gla | 7;
    f.AscDFH.lBd = f.AscDFH.Gla | 8;
    f.AscDFH.Jzg = f.AscDFH.Gla | 9;
    f.AscDFH.Kzg = f.AscDFH.Gla | 10;
    f.AscDFH.fnf = f.AscDFH.Gla | 11;
    f.AscDFH.gnf = f.AscDFH.Gla | 12;
    f.AscDFH.Kyg = f.AscDFH.aHc | 1;
    f.AscDFH.Lyg = f.AscDFH.aHc | 2;
    f.AscDFH.Myg = f.AscDFH.bHc | 1;
    f.AscDFH.Nyg = f.AscDFH.bHc | 2;
    f.AscDFH.Wzg = f.AscDFH.rAb | 1;
    f.AscDFH.Xzg = f.AscDFH.rAb | 2;
    f.AscDFH.Vzg = f.AscDFH.rAb | 3;
    f.AscDFH.Uzg = f.AscDFH.rAb | 4;
    f.AscDFH.Lzg = f.AscDFH.HBd | 1;
    f.AscDFH.Mzg = f.AscDFH.IBd | 1;
    f.AscDFH.Nzg = f.AscDFH.JBd | 1;
    f.AscDFH.aAg = f.AscDFH.iHc | 1;
    f.AscDFH.bAg = f.AscDFH.iHc | 2;
    f.AscDFH.Rzg = f.AscDFH.LBd | 1;
    f.AscDFH.Ayg = f.AscDFH.L1a | 1;
    f.AscDFH.Fyg = f.AscDFH.L1a | 2;
    f.AscDFH.Cyg = f.AscDFH.L1a | 3;
    f.AscDFH.Dyg = f.AscDFH.L1a | 4;
    f.AscDFH.Eyg = f.AscDFH.L1a | 5;
    f.AscDFH.Byg = f.AscDFH.L1a | 6;
    f.AscDFH.Qzg = f.AscDFH.KBd | 1;
    f.AscDFH.mzg = f.AscDFH.gHc | 1;
    f.AscDFH.nzg = f.AscDFH.gHc | 2;
    f.AscDFH.izg = f.AscDFH.eHc | 1;
    f.AscDFH.jzg = f.AscDFH.eHc | 2;
    f.AscDFH.kzg = f.AscDFH.fHc | 1;
    f.AscDFH.lzg = f.AscDFH.fHc | 2;
    f.AscDFH.fzg = f.AscDFH.Jgb | 1;
    f.AscDFH.gzg = f.AscDFH.Jgb | 2;
    f.AscDFH.hzg = f.AscDFH.Jgb | 3;
    f.AscDFH.Azg = f.AscDFH.m1b | 1;
    f.AscDFH.Bzg = f.AscDFH.m1b | 2;
    f.AscDFH.zzg = f.AscDFH.m1b | 3;
    f.AscDFH.cAg = f.AscDFH.jHc | 1;
    f.AscDFH.dAg = f.AscDFH.jHc | 2;
    f.AscDFH.Qyg = f.AscDFH.d1b | 1;
    f.AscDFH.Pyg = f.AscDFH.d1b | 2;
    f.AscDFH.Ryg = f.AscDFH.d1b | 3;
    f.AscDFH.pzg = f.AscDFH.hHc | 1;
    f.AscDFH.ozg = f.AscDFH.hHc | 2;
    f.AscDFH.tzg = f.AscDFH.Rxa | 1;
    f.AscDFH.wzg = f.AscDFH.Rxa | 2;
    f.AscDFH.vzg = f.AscDFH.Rxa | 3;
    f.AscDFH.uzg = f.AscDFH.Rxa | 4;
    f.AscDFH.xzg = f.AscDFH.Rxa | 5;
    f.AscDFH.qzg = f.AscDFH.Rxa | 6;
    f.AscDFH.rzg = f.AscDFH.Rxa | 7;
    f.AscDFH.szg = f.AscDFH.Rxa | 8;
    f.AscDFH.yzg = f.AscDFH.Rxa | 9;
    f.AscDFH.KAc = f.AscDFH.Egb | 1;
    f.AscDFH.iYb = f.AscDFH.Egb | 2;
    f.AscDFH.jYb = f.AscDFH.Egb | 3;
    f.AscDFH.LAc = f.AscDFH.Egb | 4;
    f.AscDFH.tyc = f.AscDFH.BFa | 1;
    f.AscDFH.vyc = f.AscDFH.BFa | 2;
    f.AscDFH.uyc = f.AscDFH.BFa | 3;
    f.AscDFH.syc = f.AscDFH.BFa | 4;
    f.AscDFH.wyc = f.AscDFH.BFa | 5;
    f.AscDFH.$Xb = f.AscDFH.BFa | 6;
    f.AscDFH.aYb = f.AscDFH.BFa | 7;
    f.AscDFH.BCc = f.AscDFH.Mgb | 1;
    f.AscDFH.DCc = f.AscDFH.Mgb | 2;
    f.AscDFH.CCc = f.AscDFH.Mgb | 3;
    f.AscDFH.XZb = f.AscDFH.Mgb | 4;
    f.AscDFH.jDc = f.AscDFH.O1a | 1;
    f.AscDFH.kDc = f.AscDFH.O1a | 2;
    f.AscDFH.lDc = f.AscDFH.O1a | 3;
    f.AscDFH.mDc = f.AscDFH.O1a | 4;
    f.AscDFH.nDc = f.AscDFH.O1a | 5;
    f.AscDFH.lGc = f.AscDFH.Ogb | 1;
    f.AscDFH.sBd = f.AscDFH.Ogb | 2;
    f.AscDFH.mGc = f.AscDFH.Ogb | 3;
    f.AscDFH.T0b = f.AscDFH.Ogb | 4;
    f.AscDFH.Tzg = f.AscDFH.s1b | 1;
    f.AscDFH.Szg = f.AscDFH.s1b | 2;
    f.AscDFH.Xyg = f.AscDFH.dHc | 1;
    f.AscDFH.Wyg = f.AscDFH.dHc | 2;
    f.AscDFH.pzc = f.AscDFH.p_ | 1;
    f.AscDFH.qzc = f.AscDFH.p_ | 2;
    f.AscDFH.rzc = f.AscDFH.p_ | 3;
    f.AscDFH.szc = f.AscDFH.p_ | 4;
    f.AscDFH.tzc = f.AscDFH.p_ | 5;
    f.AscDFH.eYb = f.AscDFH.p_ | 6;
    f.AscDFH.uzc = f.AscDFH.p_ | 7;
    f.AscDFH.vzc = f.AscDFH.p_ | 8;
    f.AscDFH.wzc = f.AscDFH.p_ | 9;
    f.AscDFH.xzc = f.AscDFH.p_ | 10;
    f.AscDFH.yzc = f.AscDFH.p_ | 11;
    f.AscDFH.zzc = f.AscDFH.p_ | 12;
    f.AscDFH.bYb = f.AscDFH.Js | 1;
    f.AscDFH.Yyc = f.AscDFH.Js | 2;
    f.AscDFH.Zyc = f.AscDFH.Js | 3;
    f.AscDFH.$yc = f.AscDFH.Js | 4;
    f.AscDFH.bzc = f.AscDFH.Js | 5;
    f.AscDFH.ezc = f.AscDFH.Js | 6;
    f.AscDFH.fzc = f.AscDFH.Js | 7;
    f.AscDFH.gzc = f.AscDFH.Js | 8;
    f.AscDFH.hzc = f.AscDFH.Js | 9;
    f.AscDFH.izc = f.AscDFH.Js | 10;
    f.AscDFH.cYb = f.AscDFH.Js | 11;
    f.AscDFH.dYb = f.AscDFH.Js | 12;
    f.AscDFH.Hyg = f.AscDFH.Js | 13;
    f.AscDFH.jzc = f.AscDFH.Js | 14;
    f.AscDFH.azc = f.AscDFH.Js | 15;
    f.AscDFH.dzc = f.AscDFH.Js | 16;
    f.AscDFH.czc = f.AscDFH.Js | 17;
    f.AscDFH.Mmf = f.AscDFH.Js | 18;
    f.AscDFH.Gyg = f.AscDFH.Js | 19;
    f.AscDFH.TBc = f.AscDFH.Qxa | 1;
    f.AscDFH.TYb = f.AscDFH.Qxa | 2;
    f.AscDFH.UBc = f.AscDFH.Qxa | 3;
    f.AscDFH.VBc = f.AscDFH.Qxa | 4;
    f.AscDFH.WBc = f.AscDFH.Qxa | 5;
    f.AscDFH.XBc = f.AscDFH.Qxa | 6;
    f.AscDFH.HBc = f.AscDFH.ura | 1;
    f.AscDFH.IBc = f.AscDFH.ura | 2;
    f.AscDFH.JBc = f.AscDFH.ura | 3;
    f.AscDFH.KBc = f.AscDFH.ura | 4;
    f.AscDFH.LBc = f.AscDFH.ura | 5;
    f.AscDFH.MBc = f.AscDFH.ura | 6;
    f.AscDFH.NBc = f.AscDFH.ura | 7;
    f.AscDFH.OBc = f.AscDFH.ura | 8;
    f.AscDFH.PBc = f.AscDFH.ura | 9;
    f.AscDFH.QBc = f.AscDFH.lAb | 1;
    f.AscDFH.RBc = f.AscDFH.lAb | 2;
    f.AscDFH.SBc = f.AscDFH.lAb | 3;
    f.AscDFH.EDc = f.AscDFH.Q1a | 1;
    f.AscDFH.FDc = f.AscDFH.Q1a | 2;
    f.AscDFH.GDc = f.AscDFH.Q1a | 3;
    f.AscDFH.HDc = f.AscDFH.Q1a | 4;
    f.AscDFH.IDc = f.AscDFH.Q1a | 5;
    f.AscDFH.Bzc = f.AscDFH.aY | 1;
    f.AscDFH.Azc = f.AscDFH.aY | 2;
    f.AscDFH.Czc = f.AscDFH.aY | 3;
    f.AscDFH.Dzc = f.AscDFH.aY | 4;
    f.AscDFH.Ezc = f.AscDFH.aY | 5;
    f.AscDFH.Fzc = f.AscDFH.aY | 6;
    f.AscDFH.Gzc = f.AscDFH.aY | 7;
    f.AscDFH.Hzc = f.AscDFH.aY | 8;
    f.AscDFH.Izc = f.AscDFH.aY | 9;
    f.AscDFH.Jzc = f.AscDFH.aY | 10;
    f.AscDFH.Kzc = f.AscDFH.aY | 11;
    f.AscDFH.Lzc = f.AscDFH.aY | 12;
    f.AscDFH.Mzc = f.AscDFH.aY | 13;
    f.AscDFH.Nzc = f.AscDFH.aY | 14;
    f.AscDFH.Ozc = f.AscDFH.aY | 15;
    f.AscDFH.mCc = f.AscDFH.mAb | 1;
    f.AscDFH.nCc = f.AscDFH.mAb | 2;
    f.AscDFH.oCc = f.AscDFH.mAb | 3;
    f.AscDFH.hzb = f.AscDFH.Pga | 1;
    f.AscDFH.bnf = f.AscDFH.Pga | 2;
    f.AscDFH.cnf = f.AscDFH.Pga | 3;
    f.AscDFH.LDc = f.AscDFH.Pga | 4;
    f.AscDFH.MDc = f.AscDFH.Pga | 5;
    f.AscDFH.Hzg = f.AscDFH.Pga | 6;
    f.AscDFH.NDc = f.AscDFH.Pga | 7;
    f.AscDFH.Izg = f.AscDFH.Pga | 8;
    f.AscDFH.a_b = f.AscDFH.Pga | 9;
    f.AscDFH.c_b = f.AscDFH.Pga | 10;
    f.AscDFH.b_b = f.AscDFH.Pga | 11;
    f.AscDFH.tCc = f.AscDFH.k1b | 1;
    f.AscDFH.uCc = f.AscDFH.k1b | 2;
    f.AscDFH.iEc = f.AscDFH.S1a | 1;
    f.AscDFH.jEc = f.AscDFH.S1a | 2;
    f.AscDFH.kEc = f.AscDFH.S1a | 3;
    f.AscDFH.lEc = f.AscDFH.S1a | 4;
    f.AscDFH.mEc = f.AscDFH.S1a | 5;
    f.AscDFH.jAc = f.AscDFH.IPa | 1;
    f.AscDFH.kAc = f.AscDFH.IPa | 2;
    f.AscDFH.lAc = f.AscDFH.IPa | 3;
    f.AscDFH.mAc = f.AscDFH.IPa | 4;
    f.AscDFH.nAc = f.AscDFH.IPa | 5;
    f.AscDFH.oAc = f.AscDFH.IPa | 6;
    f.AscDFH.UYb = f.AscDFH.GI | 1;
    f.AscDFH.VYb = f.AscDFH.GI | 2;
    f.AscDFH.YBc = f.AscDFH.GI | 3;
    f.AscDFH.WYb = f.AscDFH.GI | 4;
    f.AscDFH.ZBc = f.AscDFH.GI | 5;
    f.AscDFH.XYb = f.AscDFH.GI | 6;
    f.AscDFH.azb = f.AscDFH.GI | 7;
    f.AscDFH.YYb = f.AscDFH.GI | 8;
    f.AscDFH.$Bc = f.AscDFH.GI | 9;
    f.AscDFH.aCc = f.AscDFH.GI | 10;
    f.AscDFH.Qzc = f.AscDFH.j2 | 1;
    f.AscDFH.hYb = f.AscDFH.j2 | 2;
    f.AscDFH.Pzc = f.AscDFH.j2 | 3;
    f.AscDFH.Rzc = f.AscDFH.j2 | 4;
    f.AscDFH.Szc = f.AscDFH.j2 | 5;
    f.AscDFH.Tzc = f.AscDFH.j2 | 6;
    f.AscDFH.Uzc = f.AscDFH.j2 | 7;
    f.AscDFH.Vzc = f.AscDFH.j2 | 8;
    f.AscDFH.Wzc = f.AscDFH.j2 | 9;
    f.AscDFH.Xzc = f.AscDFH.j2 | 10;
    f.AscDFH.Yzc = f.AscDFH.j2 | 11;
    f.AscDFH.Zzc = f.AscDFH.j2 | 12;
    f.AscDFH.$zc = f.AscDFH.j2 | 13;
    f.AscDFH.aAc = f.AscDFH.j2 | 14;
    f.AscDFH.bAc = f.AscDFH.j2 | 15;
    f.AscDFH.nGc = f.AscDFH.sAb | 1;
    f.AscDFH.oGc = f.AscDFH.sAb | 2;
    f.AscDFH.pGc = f.AscDFH.sAb | 3;
    f.AscDFH.QXb = f.AscDFH.Qv | 1;
    f.AscDFH.SXb = f.AscDFH.Qv | 2;
    f.AscDFH.TXb = f.AscDFH.Qv | 3;
    f.AscDFH.Kxc = f.AscDFH.Qv | 4;
    f.AscDFH.VXb = f.AscDFH.Qv | 5;
    f.AscDFH.Lxc = f.AscDFH.Qv | 6;
    f.AscDFH.Oyb = f.AscDFH.Qv | 7;
    f.AscDFH.Mxc = f.AscDFH.Qv | 8;
    f.AscDFH.Nxc = f.AscDFH.Qv | 9;
    f.AscDFH.RXb = f.AscDFH.Qv | 10;
    f.AscDFH.UXb = f.AscDFH.Qv | 11;
    f.AscDFH.WXb = f.AscDFH.Qv | 12;
    f.AscDFH.YXb = f.AscDFH.rra | 1;
    f.AscDFH.$xc = f.AscDFH.rra | 2;
    f.AscDFH.ayc = f.AscDFH.rra | 3;
    f.AscDFH.byc = f.AscDFH.rra | 4;
    f.AscDFH.ZXb = f.AscDFH.rra | 5;
    f.AscDFH.cyc = f.AscDFH.rra | 6;
    f.AscDFH.dyc = f.AscDFH.rra | 7;
    f.AscDFH.eyc = f.AscDFH.rra | 8;
    f.AscDFH.nYb = f.AscDFH.RA | 1;
    f.AscDFH.QAc = f.AscDFH.RA | 2;
    f.AscDFH.RAc = f.AscDFH.RA | 3;
    f.AscDFH.Uyb = f.AscDFH.RA | 4;
    f.AscDFH.SAc = f.AscDFH.RA | 5;
    f.AscDFH.YZb = f.AscDFH.Fla | 1;
    f.AscDFH.ECc = f.AscDFH.Fla | 2;
    f.AscDFH.FCc = f.AscDFH.Fla | 3;
    f.AscDFH.GCc = f.AscDFH.Fla | 4;
    f.AscDFH.HCc = f.AscDFH.Fla | 5;
    f.AscDFH.ZZb = f.AscDFH.Fla | 6;
    f.AscDFH.ICc = f.AscDFH.Fla | 7;
    f.AscDFH.JCc = f.AscDFH.Fla | 8;
    f.AscDFH.KCc = f.AscDFH.Fla | 9;
    f.AscDFH.LCc = f.AscDFH.Fla | 10;
    f.AscDFH.$Zb = f.AscDFH.Bu | 1;
    f.AscDFH.uDc = f.AscDFH.Bu | 2;
    f.AscDFH.fzb = f.AscDFH.Bu | 3;
    f.AscDFH.vDc = f.AscDFH.Bu | 4;
    f.AscDFH.tDc = f.AscDFH.Bu | 5;
    f.AscDFH.e_b = f.AscDFH.vra | 1;
    f.AscDFH.f_b = f.AscDFH.vra | 2;
    f.AscDFH.ZDc = f.AscDFH.vra | 3;
    f.AscDFH.izb = f.AscDFH.vra | 4;
    f.AscDFH.$Dc = f.AscDFH.vra | 5;
    f.AscDFH.g_b = f.AscDFH.EE | 1;
    f.AscDFH.h_b = f.AscDFH.EE | 2;
    f.AscDFH.i_b = f.AscDFH.EE | 3;
    f.AscDFH.kzb = f.AscDFH.EE | 4;
    f.AscDFH.nEc = f.AscDFH.EE | 5;
    f.AscDFH.l0b = f.AscDFH.k2 | 1;
    f.AscDFH.vFc = f.AscDFH.k2 | 2;
    f.AscDFH.wFc = f.AscDFH.k2 | 3;
    f.AscDFH.xFc = f.AscDFH.k2 | 4;
    f.AscDFH.m0b = f.AscDFH.k2 | 5;
    f.AscDFH.yFc = f.AscDFH.k2 | 6;
    f.AscDFH.K0b = f.AscDFH.l2 | 1;
    f.AscDFH.L0b = f.AscDFH.l2 | 2;
    f.AscDFH.Szb = f.AscDFH.l2 | 3;
    f.AscDFH.EFc = f.AscDFH.l2 | 4;
    f.AscDFH.Ixc = f.AscDFH.Z0b | 1;
    f.AscDFH.Jxc = f.AscDFH.Z0b | 2;
    f.AscDFH.KXb = f.AscDFH.kS | 1;
    f.AscDFH.LXb = f.AscDFH.kS | 2;
    f.AscDFH.sxc = f.AscDFH.kS | 3;
    f.AscDFH.MXb = f.AscDFH.kS | 4;
    f.AscDFH.ofb = f.AscDFH.kS | 5;
    f.AscDFH.txc = f.AscDFH.kS | 6;
    f.AscDFH.oEc = f.AscDFH.AQ | 1;
    f.AscDFH.pEc = f.AscDFH.AQ | 2;
    f.AscDFH.qEc = f.AscDFH.AQ | 3;
    f.AscDFH.rEc = f.AscDFH.AQ | 4;
    f.AscDFH.sEc = f.AscDFH.AQ | 5;
    f.AscDFH.tEc = f.AscDFH.AQ | 6;
    f.AscDFH.uEc = f.AscDFH.AQ | 7;
    f.AscDFH.vEc = f.AscDFH.AQ | 8;
    f.AscDFH.wEc = f.AscDFH.AQ | 9;
    f.AscDFH.xEc = f.AscDFH.AQ | 10;
    f.AscDFH.yEc = f.AscDFH.AQ | 11;
    f.AscDFH.zEc = f.AscDFH.AQ | 12;
    f.AscDFH.cAc = f.AscDFH.CFa | 1;
    f.AscDFH.dAc = f.AscDFH.CFa | 2;
    f.AscDFH.eAc = f.AscDFH.CFa | 3;
    f.AscDFH.fAc = f.AscDFH.CFa | 4;
    f.AscDFH.gAc = f.AscDFH.CFa | 5;
    f.AscDFH.hAc = f.AscDFH.CFa | 6;
    f.AscDFH.iAc = f.AscDFH.CFa | 7;
    f.AscDFH.TAc = f.AscDFH.Pxa | 1;
    f.AscDFH.UAc = f.AscDFH.Pxa | 2;
    f.AscDFH.VAc = f.AscDFH.Pxa | 3;
    f.AscDFH.WAc = f.AscDFH.Pxa | 4;
    f.AscDFH.XAc = f.AscDFH.Pxa | 5;
    f.AscDFH.YAc = f.AscDFH.Pxa | 6;
    f.AscDFH.ZAc = f.AscDFH.Pxa | 7;
    f.AscDFH.$Ac = f.AscDFH.Pxa | 8;
    f.AscDFH.pCc = f.AscDFH.g1b | 1;
    f.AscDFH.qCc = f.AscDFH.g1b | 2;
    f.AscDFH.vCc = f.AscDFH.nAb | 1;
    f.AscDFH.TZb = f.AscDFH.nAb | 2;
    f.AscDFH.wCc = f.AscDFH.nAb | 3;
    f.AscDFH.yCc = f.AscDFH.oAb | 1;
    f.AscDFH.zCc = f.AscDFH.oAb | 2;
    f.AscDFH.ACc = f.AscDFH.oAb | 3;
    f.AscDFH.UZb = f.AscDFH.l1b | 1;
    f.AscDFH.xCc = f.AscDFH.l1b | 2;
    f.AscDFH.ZFc = f.AscDFH.Rga | 1;
    f.AscDFH.$Fc = f.AscDFH.Rga | 2;
    f.AscDFH.aGc = f.AscDFH.Rga | 3;
    f.AscDFH.bGc = f.AscDFH.Rga | 4;
    f.AscDFH.cGc = f.AscDFH.Rga | 5;
    f.AscDFH.dGc = f.AscDFH.Rga | 6;
    f.AscDFH.eGc = f.AscDFH.Rga | 7;
    f.AscDFH.fGc = f.AscDFH.Rga | 8;
    f.AscDFH.gGc = f.AscDFH.Rga | 9;
    f.AscDFH.hGc = f.AscDFH.Rga | 10;
    f.AscDFH.iGc = f.AscDFH.Rga | 11;
    f.AscDFH.jGc = f.AscDFH.u1b | 1;
    f.AscDFH.kGc = f.AscDFH.u1b | 2;
    f.AscDFH.CFc = f.AscDFH.q1b | 1;
    f.AscDFH.DFc = f.AscDFH.q1b | 2;
    f.AscDFH.n0b = f.AscDFH.o1b | 1;
    f.AscDFH.zFc = f.AscDFH.o1b | 2;
    f.AscDFH.AFc = f.AscDFH.p1b | 1;
    f.AscDFH.BFc = f.AscDFH.p1b | 2;
    f.AscDFH.RGc = f.AscDFH.T1a | 1;
    f.AscDFH.SGc = f.AscDFH.T1a | 2;
    f.AscDFH.TGc = f.AscDFH.T1a | 3;
    f.AscDFH.UGc = f.AscDFH.T1a | 4;
    f.AscDFH.VGc = f.AscDFH.T1a | 5;
    f.AscDFH.rCc = f.AscDFH.i1b | 1;
    f.AscDFH.sCc = f.AscDFH.i1b | 2;
    f.AscDFH.SZb = f.AscDFH.h1b | 1;
    f.AscDFH.jBd = f.AscDFH.h1b | 2;
    f.AscDFH.o0b = f.AscDFH.r1b | 1;
    f.AscDFH.qBd = f.AscDFH.r1b | 2;
    f.AscDFH.XGc = f.AscDFH.v1b | 1;
    f.AscDFH.YGc = f.AscDFH.v1b | 2;
    f.AscDFH.uxc = f.AscDFH.$X | 1;
    f.AscDFH.vxc = f.AscDFH.$X | 2;
    f.AscDFH.NXb = f.AscDFH.$X | 3;
    f.AscDFH.wxc = f.AscDFH.$X | 4;
    f.AscDFH.xxc = f.AscDFH.$X | 5;
    f.AscDFH.yxc = f.AscDFH.$X | 6;
    f.AscDFH.zxc = f.AscDFH.$X | 7;
    f.AscDFH.Axc = f.AscDFH.$X | 8;
    f.AscDFH.Bxc = f.AscDFH.$X | 9;
    f.AscDFH.Cxc = f.AscDFH.$X | 10;
    f.AscDFH.Dxc = f.AscDFH.$X | 11;
    f.AscDFH.Tyc = f.AscDFH.M1a | 1;
    f.AscDFH.Uyc = f.AscDFH.M1a | 2;
    f.AscDFH.Vyc = f.AscDFH.M1a | 3;
    f.AscDFH.Wyc = f.AscDFH.M1a | 4;
    f.AscDFH.Xyc = f.AscDFH.M1a | 5;
    f.AscDFH.oDc = f.AscDFH.P1a | 1;
    f.AscDFH.pDc = f.AscDFH.P1a | 2;
    f.AscDFH.qDc = f.AscDFH.P1a | 3;
    f.AscDFH.rDc = f.AscDFH.P1a | 4;
    f.AscDFH.sDc = f.AscDFH.P1a | 5;
    f.AscDFH.Mga = f.AscDFH.wra | 1;
    f.AscDFH.aEc = f.AscDFH.wra | 2;
    f.AscDFH.jzb = f.AscDFH.wra | 3;
    f.AscDFH.bEc = f.AscDFH.wra | 4;
    f.AscDFH.inf = f.AscDFH.wra | 5;
    f.AscDFH.jnf = f.AscDFH.wra | 6;
    f.AscDFH.knf = f.AscDFH.wra | 7;
    f.AscDFH.lnf = f.AscDFH.wra | 8;
    f.AscDFH.mnf = f.AscDFH.wra | 9;
    f.AscDFH.Oxc = f.AscDFH.b6 | 1;
    f.AscDFH.Pxc = f.AscDFH.b6 | 2;
    f.AscDFH.XXb = f.AscDFH.b6 | 3;
    f.AscDFH.Qxc = f.AscDFH.b6 | 4;
    f.AscDFH.Rxc = f.AscDFH.b6 | 5;
    f.AscDFH.Sxc = f.AscDFH.b6 | 6;
    f.AscDFH.Txc = f.AscDFH.b6 | 7;
    f.AscDFH.Uxc = f.AscDFH.b6 | 8;
    f.AscDFH.Vxc = f.AscDFH.b6 | 9;
    f.AscDFH.Wxc = f.AscDFH.b6 | 10;
    f.AscDFH.Xxc = f.AscDFH.b6 | 11;
    f.AscDFH.Yxc = f.AscDFH.b6 | 12;
    f.AscDFH.Zxc = f.AscDFH.b6 | 13;
    f.AscDFH.bCc = f.AscDFH.zQ | 1;
    f.AscDFH.cCc = f.AscDFH.zQ | 2;
    f.AscDFH.bzb = f.AscDFH.zQ | 3;
    f.AscDFH.dCc = f.AscDFH.zQ | 4;
    f.AscDFH.eCc = f.AscDFH.zQ | 5;
    f.AscDFH.fCc = f.AscDFH.zQ | 6;
    f.AscDFH.gCc = f.AscDFH.zQ | 7;
    f.AscDFH.hCc = f.AscDFH.zQ | 8;
    f.AscDFH.iCc = f.AscDFH.zQ | 9;
    f.AscDFH.jCc = f.AscDFH.zQ | 10;
    f.AscDFH.kCc = f.AscDFH.zQ | 11;
    f.AscDFH.lCc = f.AscDFH.zQ | 12;
    f.AscDFH.wDc = f.AscDFH.e6 | 1;
    f.AscDFH.xDc = f.AscDFH.e6 | 2;
    f.AscDFH.gzb = f.AscDFH.e6 | 3;
    f.AscDFH.yDc = f.AscDFH.e6 | 4;
    f.AscDFH.zDc = f.AscDFH.e6 | 5;
    f.AscDFH.ADc = f.AscDFH.e6 | 6;
    f.AscDFH.BDc = f.AscDFH.e6 | 7;
    f.AscDFH.CDc = f.AscDFH.e6 | 8;
    f.AscDFH.DDc = f.AscDFH.e6 | 9;
    f.AscDFH.FFc = f.AscDFH.FFa | 1;
    f.AscDFH.GFc = f.AscDFH.FFa | 2;
    f.AscDFH.HFc = f.AscDFH.FFa | 3;
    f.AscDFH.IFc = f.AscDFH.FFa | 4;
    f.AscDFH.JFc = f.AscDFH.FFa | 5;
    f.AscDFH.KFc = f.AscDFH.FFa | 6;
    f.AscDFH.fyc = f.AscDFH.c6 | 1;
    f.AscDFH.gyc = f.AscDFH.c6 | 2;
    f.AscDFH.hyc = f.AscDFH.c6 | 3;
    f.AscDFH.iyc = f.AscDFH.c6 | 4;
    f.AscDFH.jyc = f.AscDFH.c6 | 5;
    f.AscDFH.kyc = f.AscDFH.c6 | 6;
    f.AscDFH.lyc = f.AscDFH.c6 | 7;
    f.AscDFH.myc = f.AscDFH.c6 | 8;
    f.AscDFH.nyc = f.AscDFH.c6 | 9;
    f.AscDFH.oyc = f.AscDFH.c6 | 10;
    f.AscDFH.pyc = f.AscDFH.c6 | 11;
    f.AscDFH.qyc = f.AscDFH.c6 | 12;
    f.AscDFH.ryc = f.AscDFH.c6 | 13;
    f.AscDFH.bBd = f.AscDFH.e1b | 1;
    f.AscDFH.aBc = f.AscDFH.e1b | 2;
    f.AscDFH.JDc = f.AscDFH.n1b | 1;
    f.AscDFH.KDc = f.AscDFH.n1b | 2;
    f.AscDFH.UDc = f.AscDFH.R1a | 1;
    f.AscDFH.VDc = f.AscDFH.R1a | 2;
    f.AscDFH.WDc = f.AscDFH.R1a | 3;
    f.AscDFH.XDc = f.AscDFH.R1a | 4;
    f.AscDFH.YDc = f.AscDFH.R1a | 5;
    f.AscDFH.mzc = f.AscDFH.jAb | 1;
    f.AscDFH.nzc = f.AscDFH.jAb | 2;
    f.AscDFH.ozc = f.AscDFH.jAb | 3;
    f.AscDFH.KGc = f.AscDFH.MPa | 1;
    f.AscDFH.LGc = f.AscDFH.MPa | 2;
    f.AscDFH.MGc = f.AscDFH.MPa | 3;
    f.AscDFH.NGc = f.AscDFH.MPa | 4;
    f.AscDFH.OGc = f.AscDFH.MPa | 5;
    f.AscDFH.PGc = f.AscDFH.MPa | 6;
    f.AscDFH.kzc = f.AscDFH.b1b | 1;
    f.AscDFH.lzc = f.AscDFH.b1b | 2;
    f.AscDFH.j0b = f.AscDFH.Ngb | 1;
    f.AscDFH.h0b = f.AscDFH.Ngb | 2;
    f.AscDFH.i0b = f.AscDFH.Ngb | 3;
    f.AscDFH.g0b = f.AscDFH.Ngb | 4;
    f.AscDFH.Dgb = f.AscDFH.oca | 1;
    f.AscDFH.iAb = f.AscDFH.oca | 2;
    f.AscDFH.Cgb = f.AscDFH.oca | 3;
    f.AscDFH.hAb = f.AscDFH.oca | 4;
    f.AscDFH.Bgb = f.AscDFH.oca | 5;
    f.AscDFH.gAb = f.AscDFH.oca | 6;
    f.AscDFH.Agb = f.AscDFH.oca | 7;
    f.AscDFH.fAb = f.AscDFH.oca | 8;
    f.AscDFH.V0b = f.AscDFH.oca | 9;
    f.AscDFH.W0b = f.AscDFH.oca | 10;
    f.AscDFH.X0b = f.AscDFH.oca | 11;
    f.AscDFH.WGc = f.AscDFH.oca | 12;
    f.AscDFH.TEc = f.AscDFH.EFa | 1;
    f.AscDFH.VEc = f.AscDFH.EFa | 2;
    f.AscDFH.k0b = f.AscDFH.EFa | 3;
    f.AscDFH.ozb = f.AscDFH.EFa | 4;
    f.AscDFH.pzb = f.AscDFH.EFa | 5;
    f.AscDFH.UEc = f.AscDFH.EFa | 6;
    f.AscDFH.nzb = f.AscDFH.EFa | 7;
    f.AscDFH.Iyg = f.AscDFH.$Gc | 1;
    f.AscDFH.Jyg = f.AscDFH.$Gc | 2;
    f.AscDFH.fYb = f.AscDFH.ZGc | 1;
    f.AscDFH.BYb = f.AscDFH.f1b | 1;
    f.AscDFH.bBc = f.AscDFH.f1b | 2;
    f.AscDFH.Uyg = f.AscDFH.Hgb | 1;
    f.AscDFH.Vyg = f.AscDFH.Hgb | 2;
    f.AscDFH.Tyg = f.AscDFH.Hgb | 3;
    f.AscDFH.Syg = f.AscDFH.Hgb | 4;
    f.AscDFH.$yg = f.AscDFH.kAb | 1;
    f.AscDFH.Yyg = f.AscDFH.kAb | 2;
    f.AscDFH.Zyg = f.AscDFH.kAb | 3;
    f.AscDFH.ezg = f.AscDFH.Igb | 1;
    f.AscDFH.czg = f.AscDFH.Igb | 2;
    f.AscDFH.dzg = f.AscDFH.Igb | 3;
    f.AscDFH.bzg = f.AscDFH.Igb | 4;
    f.AscDFH.azg = f.AscDFH.Igb | 5;
    f.AscDFH.Yzg = f.AscDFH.t1b | 1;
    f.AscDFH.$zg = f.AscDFH.t1b | 2;
    f.AscDFH.Zzg = f.AscDFH.t1b | 3;
    f.AscDFH.mBc = f.AscDFH.Kgb | 1;
    f.AscDFH.nBc = f.AscDFH.Kgb | 2;
    f.AscDFH.oBc = f.AscDFH.Kgb | 3;
    f.AscDFH.pBc = f.AscDFH.Kgb | 4;
    f.AscDFH.vyg = f.AscDFH.a1b | 1;
    f.AscDFH.wyg = f.AscDFH.a1b | 2;
    f.AscDFH.zyg = f.AscDFH.$0b | 1;
    f.AscDFH.xyg = f.AscDFH.$0b | 2;
    f.AscDFH.yyg = f.AscDFH.$0b | 3;
    f.AscDFH.RDc = f.AscDFH.qAb | 1;
    f.AscDFH.SDc = f.AscDFH.qAb | 2;
    f.AscDFH.TDc = f.AscDFH.qAb | 3;
    f.AscDFH.qBc = f.AscDFH.tra | 1;
    f.AscDFH.rBc = f.AscDFH.tra | 2;
    f.AscDFH.sBc = f.AscDFH.tra | 3;
    f.AscDFH.tBc = f.AscDFH.tra | 4;
    f.AscDFH.uBc = f.AscDFH.tra | 5;
    f.AscDFH.vBc = f.AscDFH.tra | 6;
    f.AscDFH.wBc = f.AscDFH.tra | 7;
    f.AscDFH.xBc = f.AscDFH.tra | 8;
    f.AscDFH.yBc = f.AscDFH.tra | 9;
    f.AscDFH.MCc = f.AscDFH.KPa | 1;
    f.AscDFH.NCc = f.AscDFH.KPa | 2;
    f.AscDFH.OCc = f.AscDFH.KPa | 3;
    f.AscDFH.PCc = f.AscDFH.KPa | 4;
    f.AscDFH.QCc = f.AscDFH.KPa | 5;
    f.AscDFH.RCc = f.AscDFH.KPa | 6;
    f.AscDFH.SCc = f.AscDFH.Oga | 1;
    f.AscDFH.TCc = f.AscDFH.Oga | 2;
    f.AscDFH.UCc = f.AscDFH.Oga | 3;
    f.AscDFH.VCc = f.AscDFH.Oga | 4;
    f.AscDFH.WCc = f.AscDFH.Oga | 5;
    f.AscDFH.XCc = f.AscDFH.Oga | 6;
    f.AscDFH.YCc = f.AscDFH.Oga | 7;
    f.AscDFH.ZCc = f.AscDFH.Oga | 8;
    f.AscDFH.$Cc = f.AscDFH.Oga | 9;
    f.AscDFH.aDc = f.AscDFH.Oga | 10;
    f.AscDFH.bDc = f.AscDFH.Oga | 11;
    f.AscDFH.AFa = f.AscDFH.ns | 1;
    f.AscDFH.$_b = f.AscDFH.ns | 2;
    f.AscDFH.c0b = f.AscDFH.ns | 3;
    f.AscDFH.xJb = f.AscDFH.ns | 4;
    f.AscDFH.e0b = f.AscDFH.ns | 5;
    f.AscDFH.d0b = f.AscDFH.ns | 6;
    f.AscDFH.a0b = f.AscDFH.ns | 7;
    f.AscDFH.Z_b = f.AscDFH.ns | 8;
    f.AscDFH.mzb = f.AscDFH.ns | 9;
    f.AscDFH.f0b = f.AscDFH.ns | 10;
    f.AscDFH.b0b = f.AscDFH.ns | 11;
    f.AscDFH.MAc = f.AscDFH.Fgb | 1;
    f.AscDFH.NAc = f.AscDFH.Fgb | 2;
    f.AscDFH.OAc = f.AscDFH.Fgb | 3;
    f.AscDFH.PAc = f.AscDFH.Fgb | 4;
    f.AscDFH.NYb = f.AscDFH.tw | 1;
    f.AscDFH.lBc = f.AscDFH.tw | 2;
    f.AscDFH.vJb = f.AscDFH.tw | 3;
    f.AscDFH.kBc = f.AscDFH.tw | 4;
    f.AscDFH.jBc = f.AscDFH.tw | 5;
    f.AscDFH.wJb = f.AscDFH.tw | 6;
    f.AscDFH.RYb = f.AscDFH.vx | 1;
    f.AscDFH.FBc = f.AscDFH.vx | 2;
    f.AscDFH.$yb = f.AscDFH.vx | 3;
    f.AscDFH.EBc = f.AscDFH.vx | 4;
    f.AscDFH.BBc = f.AscDFH.vx | 5;
    f.AscDFH.GBc = f.AscDFH.vx | 6;
    f.AscDFH.ABc = f.AscDFH.vx | 7;
    f.AscDFH.zBc = f.AscDFH.vx | 8;
    f.AscDFH.SYb = f.AscDFH.vx | 9;
    f.AscDFH.CBc = f.AscDFH.vx | 10;
    f.AscDFH.DBc = f.AscDFH.vx | 11;
    f.AscDFH.iBd = f.AscDFH.vx | 12;
    f.AscDFH.dBc = f.AscDFH.sra | 1;
    f.AscDFH.cBd = f.AscDFH.sra | 2;
    f.AscDFH.eBd = f.AscDFH.sra | 3;
    f.AscDFH.dBd = f.AscDFH.sra | 4;
    f.AscDFH.gBd = f.AscDFH.sra | 5;
    f.AscDFH.fBd = f.AscDFH.sra | 6;
    f.AscDFH.cBc = f.AscDFH.sra | 7;
    f.AscDFH.hBd = f.AscDFH.sra | 8;
    f.AscDFH.eBc = f.AscDFH.sra | 9;
    f.AscDFH.iDc = f.AscDFH.LPa | 1;
    f.AscDFH.eDc = f.AscDFH.LPa | 2;
    f.AscDFH.fDc = f.AscDFH.LPa | 3;
    f.AscDFH.gDc = f.AscDFH.LPa | 4;
    f.AscDFH.hDc = f.AscDFH.LPa | 5;
    f.AscDFH.kBd = f.AscDFH.LPa | 6;
    f.AscDFH.P0b = f.AscDFH.kUa | 1;
    f.AscDFH.Q0b = f.AscDFH.kUa | 2;
    f.AscDFH.LFc = f.AscDFH.kUa | 3;
    f.AscDFH.MFc = f.AscDFH.kUa | 4;
    f.AscDFH.xyc = f.AscDFH.fC | 1;
    f.AscDFH.yyc = f.AscDFH.fC | 2;
    f.AscDFH.zyc = f.AscDFH.fC | 3;
    f.AscDFH.Ayc = f.AscDFH.fC | 4;
    f.AscDFH.Byc = f.AscDFH.fC | 5;
    f.AscDFH.Cyc = f.AscDFH.fC | 6;
    f.AscDFH.Dyc = f.AscDFH.fC | 7;
    f.AscDFH.Eyc = f.AscDFH.fC | 8;
    f.AscDFH.Fyc = f.AscDFH.fC | 9;
    f.AscDFH.Gyc = f.AscDFH.fC | 10;
    f.AscDFH.Hyc = f.AscDFH.fC | 11;
    f.AscDFH.Iyc = f.AscDFH.fC | 12;
    f.AscDFH.Jyc = f.AscDFH.fC | 13;
    f.AscDFH.Kyc = f.AscDFH.fC | 14;
    f.AscDFH.Lyc = f.AscDFH.fC | 15;
    f.AscDFH.Myc = f.AscDFH.fC | 16;
    f.AscDFH.Nyc = f.AscDFH.fC | 17;
    f.AscDFH.Oyc = f.AscDFH.fC | 18;
    f.AscDFH.Pyc = f.AscDFH.fC | 19;
    f.AscDFH.Qyc = f.AscDFH.fC | 20;
    f.AscDFH.Ryc = f.AscDFH.fC | 21;
    f.AscDFH.Syc = f.AscDFH.fC | 22;
    f.AscDFH.qGc = f.AscDFH.Rv | 1;
    f.AscDFH.rGc = f.AscDFH.Rv | 2;
    f.AscDFH.sGc = f.AscDFH.Rv | 3;
    f.AscDFH.tGc = f.AscDFH.Rv | 4;
    f.AscDFH.uGc = f.AscDFH.Rv | 5;
    f.AscDFH.vGc = f.AscDFH.Rv | 6;
    f.AscDFH.wGc = f.AscDFH.Rv | 7;
    f.AscDFH.xGc = f.AscDFH.Rv | 8;
    f.AscDFH.yGc = f.AscDFH.Rv | 9;
    f.AscDFH.zGc = f.AscDFH.Rv | 10;
    f.AscDFH.AGc = f.AscDFH.Rv | 11;
    f.AscDFH.BGc = f.AscDFH.Rv | 12;
    f.AscDFH.CGc = f.AscDFH.Rv | 13;
    f.AscDFH.DGc = f.AscDFH.Rv | 14;
    f.AscDFH.EGc = f.AscDFH.Rv | 15;
    f.AscDFH.FGc = f.AscDFH.Rv | 16;
    f.AscDFH.GGc = f.AscDFH.Rv | 17;
    f.AscDFH.HGc = f.AscDFH.Rv | 18;
    f.AscDFH.IGc = f.AscDFH.Rv | 19;
    f.AscDFH.JGc = f.AscDFH.Rv | 20;
    f.AscDFH.k8d = f.AscDFH.oob | 1;
    f.AscDFH.l8d = f.AscDFH.oob | 2;
    f.AscDFH.m8d = f.AscDFH.oob | 3;
    f.AscDFH.pAc = f.AscDFH.QA | 1;
    f.AscDFH.qAc = f.AscDFH.QA | 2;
    f.AscDFH.rAc = f.AscDFH.QA | 3;
    f.AscDFH.sAc = f.AscDFH.QA | 4;
    f.AscDFH.tAc = f.AscDFH.QA | 5;
    f.AscDFH.uAc = f.AscDFH.QA | 6;
    f.AscDFH.vAc = f.AscDFH.QA | 7;
    f.AscDFH.wAc = f.AscDFH.QA | 8;
    f.AscDFH.xAc = f.AscDFH.QA | 9;
    f.AscDFH.qfb = f.AscDFH.QA | 10;
    f.AscDFH.yAc = f.AscDFH.QA | 11;
    f.AscDFH.zAc = f.AscDFH.QA | 12;
    f.AscDFH.AAc = f.AscDFH.QA | 13;
    f.AscDFH.Oyg = f.AscDFH.QA | 14;
    f.AscDFH.BAc = f.AscDFH.QA | 15;
    f.AscDFH.CAc = f.AscDFH.QA | 16;
    f.AscDFH.DAc = f.AscDFH.QA | 17;
    f.AscDFH.EAc = f.AscDFH.QA | 18;
    f.AscDFH.FAc = f.AscDFH.QA | 19;
    f.AscDFH.GAc = f.AscDFH.QA | 20;
    f.AscDFH.HAc = f.AscDFH.QA | 21;
    f.AscDFH.IAc = f.AscDFH.QA | 22;
    f.AscDFH.JAc = f.AscDFH.QA | 23;
    f.AscDFH.AEc = f.AscDFH.BQ | 1;
    f.AscDFH.BEc = f.AscDFH.BQ | 2;
    f.AscDFH.CEc = f.AscDFH.BQ | 3;
    f.AscDFH.DEc = f.AscDFH.BQ | 4;
    f.AscDFH.EEc = f.AscDFH.BQ | 5;
    f.AscDFH.FEc = f.AscDFH.BQ | 6;
    f.AscDFH.GEc = f.AscDFH.BQ | 7;
    f.AscDFH.HEc = f.AscDFH.BQ | 8;
    f.AscDFH.IEc = f.AscDFH.BQ | 9;
    f.AscDFH.JEc = f.AscDFH.BQ | 10;
    f.AscDFH.KEc = f.AscDFH.BQ | 11;
    f.AscDFH.LEc = f.AscDFH.BQ | 12;
    f.AscDFH.MEc = f.AscDFH.BQ | 13;
    f.AscDFH.NEc = f.AscDFH.BQ | 14;
    f.AscDFH.OEc = f.AscDFH.BQ | 15;
    f.AscDFH.PEc = f.AscDFH.BQ | 16;
    f.AscDFH.QEc = f.AscDFH.BQ | 17;
    f.AscDFH.REc = f.AscDFH.BQ | 18;
    f.AscDFH.UFc = f.AscDFH.roa | 1;
    f.AscDFH.VFc = f.AscDFH.roa | 2;
    f.AscDFH.WFc = f.AscDFH.roa | 3;
    f.AscDFH.XFc = f.AscDFH.roa | 4;
    f.AscDFH.YFc = f.AscDFH.roa | 5;
    f.AscDFH.Fnf = f.AscDFH.mS | 1;
    f.AscDFH.Inf = f.AscDFH.mS | 2;
    f.AscDFH.Knf = f.AscDFH.mS | 3;
    f.AscDFH.Jnf = f.AscDFH.mS | 4;
    f.AscDFH.d8d = f.AscDFH.mS | 5;
    f.AscDFH.Hnf = f.AscDFH.mS | 6;
    f.AscDFH.g8d = f.AscDFH.mS | 7;
    f.AscDFH.f8d = f.AscDFH.mS | 8;
    f.AscDFH.IUd = f.AscDFH.mS | 9;
    f.AscDFH.e8d = f.AscDFH.mS | 10;
    f.AscDFH.mBd = f.AscDFH.mS | 11;
    f.AscDFH.tYc = f.AscDFH.mS | 12;
    f.AscDFH.Dnf = f.AscDFH.mS | 13;
    f.AscDFH.Enf = f.AscDFH.mS | 14;
    f.AscDFH.Gnf = f.AscDFH.mS | 15;
    f.AscDFH.rnf = f.AscDFH.nca | 1;
    f.AscDFH.snf = f.AscDFH.nca | 2;
    f.AscDFH.wnf = f.AscDFH.nca | 3;
    f.AscDFH.Z7d = f.AscDFH.nca | 4;
    f.AscDFH.onf = f.AscDFH.nca | 5;
    f.AscDFH.tnf = f.AscDFH.nca | 6;
    f.AscDFH.vnf = f.AscDFH.nca | 7;
    f.AscDFH.unf = f.AscDFH.nca | 8;
    f.AscDFH.pnf = f.AscDFH.nca | 9;
    f.AscDFH.Y7d = f.AscDFH.nca | 10;
    f.AscDFH.$7d = f.AscDFH.nca | 11;
    f.AscDFH.qnf = f.AscDFH.nca | 12;
    f.AscDFH.ynf = f.AscDFH.xra | 1;
    f.AscDFH.Bnf = f.AscDFH.xra | 2;
    f.AscDFH.a8d = f.AscDFH.xra | 3;
    f.AscDFH.c8d = f.AscDFH.xra | 4;
    f.AscDFH.znf = f.AscDFH.xra | 5;
    f.AscDFH.Anf = f.AscDFH.xra | 6;
    f.AscDFH.xnf = f.AscDFH.xra | 7;
    f.AscDFH.Cnf = f.AscDFH.xra | 8;
    f.AscDFH.b8d = f.AscDFH.xra | 9;
    f.AscDFH.nnf = f.AscDFH.H8b | 1;
    f.AscDFH.HUd = f.AscDFH.H8b | 2;
    f.AscDFH.hnf = f.AscDFH.HRc | 1;
    f.AscDFH.dAb = f.AscDFH.Qga | 1;
    f.AscDFH.S0b = f.AscDFH.Qga | 2;
    f.AscDFH.R0b = f.AscDFH.Qga | 3;
    f.AscDFH.RFc = f.AscDFH.Qga | 4;
    f.AscDFH.PFc = f.AscDFH.Qga | 5;
    f.AscDFH.SFc = f.AscDFH.Qga | 6;
    f.AscDFH.QFc = f.AscDFH.Qga | 7;
    f.AscDFH.TFc = f.AscDFH.Qga | 8;
    f.AscDFH.NFc = f.AscDFH.Qga | 9;
    f.AscDFH.OFc = f.AscDFH.Qga | 10;
    f.AscDFH.iBc = f.AscDFH.dz | 1;
    f.AscDFH.fBc = f.AscDFH.dz | 2;
    f.AscDFH.hBc = f.AscDFH.dz | 3;
    f.AscDFH.MYb = f.AscDFH.dz | 4;
    f.AscDFH.gBc = f.AscDFH.dz | 5;
    f.AscDFH.tFc = f.AscDFH.qF | 1;
    f.AscDFH.kFc = f.AscDFH.qF | 2;
    f.AscDFH.dFc = f.AscDFH.qF | 3;
    f.AscDFH.oFc = f.AscDFH.qF | 4;
    f.AscDFH.iFc = f.AscDFH.qF | 5;
    f.AscDFH.lFc = f.AscDFH.qF | 6;
    f.AscDFH.hFc = f.AscDFH.qF | 7;
    f.AscDFH.jFc = f.AscDFH.qF | 8;
    f.AscDFH.rFc = f.AscDFH.qF | 9;
    f.AscDFH.fFc = f.AscDFH.qF | 10;
    f.AscDFH.eFc = f.AscDFH.qF | 11;
    f.AscDFH.qFc = f.AscDFH.qF | 12;
    f.AscDFH.pFc = f.AscDFH.qF | 13;
    f.AscDFH.sFc = f.AscDFH.qF | 14;
    f.AscDFH.mFc = f.AscDFH.qF | 15;
    f.AscDFH.nFc = f.AscDFH.qF | 16;
    f.AscDFH.cFc = f.AscDFH.qF | 17;
    f.AscDFH.bFc = f.AscDFH.qF | 18;
    f.AscDFH.aFc = f.AscDFH.qF | 19;
    f.AscDFH.WEc = f.AscDFH.qF | 20;
    f.AscDFH.$Ec = f.AscDFH.qF | 21;
    f.AscDFH.XEc = f.AscDFH.qF | 22;
    f.AscDFH.uFc = f.AscDFH.qF | 23;
    f.AscDFH.YEc = f.AscDFH.qF | 24;
    f.AscDFH.ZEc = f.AscDFH.qF | 25;
    f.AscDFH.gFc = f.AscDFH.qF | 26;
    f.AscDFH.nBd = f.AscDFH.qF | 27;
    f.AscDFH.oBd = f.AscDFH.qF | 28;
    f.AscDFH.pBd = f.AscDFH.qF | 29;
    f.AscDFH.$Nf = f.AscDFH.uYc | 1;
    f.AscDFH.Qmf = f.AscDFH.BBa | 1;
    f.AscDFH.T7d = f.AscDFH.BBa | 2;
    f.AscDFH.Smf = f.AscDFH.BBa | 3;
    f.AscDFH.Omf = f.AscDFH.BBa | 4;
    f.AscDFH.Pmf = f.AscDFH.BBa | 5;
    f.AscDFH.S7d = f.AscDFH.BBa | 6;
    f.AscDFH.ZNf = f.AscDFH.BBa | 7;
    f.AscDFH.Rmf = f.AscDFH.BBa | 8;
    f.AscDFH.Umf = f.AscDFH.wda | 1;
    f.AscDFH.Xmf = f.AscDFH.wda | 2;
    f.AscDFH.Ymf = f.AscDFH.wda | 3;
    f.AscDFH.Nmf = f.AscDFH.wda | 4;
    f.AscDFH.Tmf = f.AscDFH.wda | 5;
    f.AscDFH.U7d = f.AscDFH.wda | 6;
    f.AscDFH.Vmf = f.AscDFH.wda | 7;
    f.AscDFH.Zmf = f.AscDFH.wda | 8;
    f.AscDFH.Wmf = f.AscDFH.wda | 9;
    f.AscDFH.dnf = f.AscDFH.yJb | 1;
    f.AscDFH.aOf = f.AscDFH.yJb | 2;
    f.AscDFH.bOf = f.AscDFH.yJb | 3;
    f.AscDFH.cEc = f.AscDFH.NJa | 1;
    f.AscDFH.dEc = f.AscDFH.NJa | 2;
    f.AscDFH.gEc = f.AscDFH.NJa | 3;
    f.AscDFH.hEc = f.AscDFH.NJa | 4;
    f.AscDFH.eEc = f.AscDFH.NJa | 5;
    f.AscDFH.fEc = f.AscDFH.NJa | 6;
    f.AscDFH.oxc = f.AscDFH.ABa | 1;
    f.AscDFH.pxc = f.AscDFH.ABa | 2;
    f.AscDFH.mxc = f.AscDFH.ABa | 3;
    f.AscDFH.nxc = f.AscDFH.ABa | 4;
    f.AscDFH.qxc = f.AscDFH.ABa | 5;
    f.AscDFH.rxc = f.AscDFH.ABa | 6;
    f.AscDFH.kYb = f.Asc.cHc | 1;
    f.AscDFH.aBd = f.AscDFH.ABd | 1;
    f.AscDFH.P4d = 1;
    f.AscDFH.kmf = 2;
    f.AscDFH.lmf = 3;
    f.AscDFH.Ywc = 4;
    f.AscDFH.kzd = 5;
    f.AscDFH.lzd = 6;
    f.AscDFH.wRc = 7;
    f.AscDFH.Hlf = 8;
    f.AscDFH.OTd = 9;
    f.AscDFH.Ilf = 10;
    f.AscDFH.mmf = 11;
    f.AscDFH.u5d = 12;
    f.AscDFH.aUd = 13;
    f.AscDFH.UTd = 14;
    f.AscDFH.Q4d = 15;
    f.AscDFH.l5d = 16;
    f.AscDFH.pYc = 17;
    f.AscDFH.Pzd = 18;
    f.AscDFH.vzd = 19;
    f.AscDFH.tzd = 20;
    f.AscDFH.bAd = 21;
    f.AscDFH.aAd = 22;
    f.AscDFH.iAd = 23;
    f.AscDFH.jAd = 24;
    f.AscDFH.CAd = 25;
    f.AscDFH.X4d = 26;
    f.AscDFH.m5d = 27;
    f.AscDFH.y5d = 28;
    f.AscDFH.i5d = 29;
    f.AscDFH.J5d = 30;
    f.AscDFH.H5d = 31;
    f.AscDFH.I5d = 32;
    f.AscDFH.x5d = 33;
    f.AscDFH.f5d = 34;
    f.AscDFH.g5d = 35;
    f.AscDFH.q5d = 36;
    f.AscDFH.p5d = 37;
    f.AscDFH.o5d = 38;
    f.AscDFH.t5d = 39;
    f.AscDFH.s5d = 40;
    f.AscDFH.n5d = 41;
    f.AscDFH.XTd = 42;
    f.AscDFH.r5d = 43;
    f.AscDFH.cxc = 44;
    f.AscDFH.O5d = 45;
    f.AscDFH.N5d = 46;
    f.AscDFH.P5d = 47;
    f.AscDFH.s6d = 48;
    f.AscDFH.u6d = 49;
    f.AscDFH.o6d = 50;
    f.AscDFH.x6d = 51;
    f.AscDFH.C6d = 52;
    f.AscDFH.B6d = 53;
    f.AscDFH.r6d = 54;
    f.AscDFH.A6d = 55;
    f.AscDFH.p6d = 56;
    f.AscDFH.z6d = 57;
    f.AscDFH.y6d = 58;
    f.AscDFH.hUd = 59;
    f.AscDFH.f6d = 60;
    f.AscDFH.g6d = 61;
    f.AscDFH.v5d = 62;
    f.AscDFH.k5d = 63;
    f.AscDFH.Z5d = 64;
    f.AscDFH.k6d = 65;
    f.AscDFH.Y5d = 66;
    f.AscDFH.D6d = 67;
    f.AscDFH.h6d = 68;
    f.AscDFH.m6d = 69;
    f.AscDFH.j6d = 70;
    f.AscDFH.n6d = 71;
    f.AscDFH.d6d = 72;
    f.AscDFH.e6d = 73;
    f.AscDFH.$5d = 74;
    f.AscDFH.w6d = 75;
    f.AscDFH.v6d = 76;
    f.AscDFH.q6d = 77;
    f.AscDFH.l6d = 78;
    f.AscDFH.a6d = 79;
    f.AscDFH.Vzd = 80;
    f.AscDFH.Nzd = 81;
    f.AscDFH.c6d = 82;
    f.AscDFH.b6d = 83;
    f.AscDFH.W5d = 84;
    f.AscDFH.X5d = 85;
    f.AscDFH.QTd = 86;
    f.AscDFH.Z4d = 87;
    f.AscDFH.Y4d = 88;
    f.AscDFH.S5d = 89;
    f.AscDFH.U5d = 90;
    f.AscDFH.T5d = 91;
    f.AscDFH.V5d = 92;
    f.AscDFH.$4d = 93;
    f.AscDFH.H6d = 94;
    f.AscDFH.I6d = 95;
    f.AscDFH.F6d = 96;
    f.AscDFH.G6d = 97;
    f.AscDFH.K6d = 98;
    f.AscDFH.J6d = 99;
    f.AscDFH.F5d = 100;
    f.AscDFH.w5d = 101;
    f.AscDFH.E6d = 102;
    f.AscDFH.b5d = 103;
    f.AscDFH.V4d = 104;
    f.AscDFH.W4d = 105;
    f.AscDFH.U4d = 106;
    f.AscDFH.TTd = 107;
    f.AscDFH.a5d = 108;
    f.AscDFH.Tlf = 109;
    f.AscDFH.Ulf = 110;
    f.AscDFH.Gzd = 111;
    f.AscDFH.S4d = 112;
    f.AscDFH.d5d = 113;
    f.AscDFH.E5d = 114;
    f.AscDFH.ZTd = 115;
    f.AscDFH.R4d = 116;
    f.AscDFH.A5d = 117;
    f.AscDFH.c5d = 118;
    f.AscDFH.t6d = 119;
    f.AscDFH.T4d = 120;
    f.AscDFH.h5d = 121;
    f.AscDFH.RTd = 122;
    f.AscDFH.PTd = 123;
    f.AscDFH.fUd = 124;
    f.AscDFH.eUd = 125;
    f.AscDFH.bUd = 126;
    f.AscDFH.fxc = 127;
    f.AscDFH.cUd = 128;
    f.AscDFH.dUd = 129;
    f.AscDFH.gUd = 130;
    f.AscDFH.Qzd = 131;
    f.AscDFH.rzd = 132;
    f.AscDFH.GXb = 133;
    f.AscDFH.vAd = 134;
    f.AscDFH.oYc = 135;
    f.AscDFH.Zzd = 136;
    f.AscDFH.Bzd = 137;
    f.AscDFH.qYc = 138;
    f.AscDFH.HXb = 139;
    f.AscDFH.imf = 140;
    f.AscDFH.jmf = 141;
    f.AscDFH.Ozd = 142;
    f.AscDFH.hmf = 143;
    f.AscDFH.rAd = 144;
    f.AscDFH.sAd = 145;
    f.AscDFH.tAd = 146;
    f.AscDFH.yAd = 147;
    f.AscDFH.uAd = 148;
    f.AscDFH.E8b = 149;
    f.AscDFH.szd = 150;
    f.AscDFH.xAd = 151;
    f.AscDFH.dmf = 152;
    f.AscDFH.pAd = 153;
    f.AscDFH.emf = 154;
    f.AscDFH.Azd = 155;
    f.AscDFH.fmf = 156;
    f.AscDFH.zAd = 157;
    f.AscDFH.Tzd = 158;
    f.AscDFH.FXb = 159;
    f.AscDFH.$lf = 160;
    f.AscDFH.Ylf = 161;
    f.AscDFH.gmf = 162;
    f.AscDFH.Qlf = 163;
    f.AscDFH.AAd = 164;
    f.AscDFH.Wzd = 165;
    f.AscDFH.BAd = 166;
    f.AscDFH.wzd = 167;
    f.AscDFH.$zd = 168;
    f.AscDFH.Uzd = 169;
    f.AscDFH.wAd = 170;
    f.AscDFH.Fzd = 171;
    f.AscDFH.xzd = 172;
    f.AscDFH.Yzd = 173;
    f.AscDFH.Xzd = 174;
    f.AscDFH.lAd = 175;
    f.AscDFH.lxc = 176;
    f.AscDFH.MAd = 177;
    f.AscDFH.KAd = 178;
    f.AscDFH.RAd = 179;
    f.AscDFH.WAd = 180;
    f.AscDFH.SAd = 181;
    f.AscDFH.TAd = 182;
    f.AscDFH.UAd = 183;
    f.AscDFH.IAd = 184;
    f.AscDFH.Nyb = 185;
    f.AscDFH.VAd = 186;
    f.AscDFH.JAd = 187;
    f.AscDFH.QAd = 188;
    f.AscDFH.LAd = 189;
    f.AscDFH.NAd = 190;
    f.AscDFH.OAd = 191;
    f.AscDFH.PAd = 192;
    f.AscDFH.FAd = 193;
    f.AscDFH.kxc = 194;
    f.AscDFH.EAd = 195;
    f.AscDFH.ixc = 196;
    f.AscDFH.kUd = 197;
    f.AscDFH.hxc = 198;
    f.AscDFH.HAd = 199;
    f.AscDFH.YAd = 200;
    f.AscDFH.XAd = 201;
    f.AscDFH.GAd = 202;
    f.AscDFH.Myb = 203;
    f.AscDFH.lUd = 204;
    f.AscDFH.jxc = 205;
    f.AscDFH.MTd = 206;
    f.AscDFH.mYc = 207;
    f.AscDFH.NTd = 208;
    f.AscDFH.DAd = 209;
    f.AscDFH.t7d = 210;
    f.AscDFH.Q6d = 211;
    f.AscDFH.f7d = 212;
    f.AscDFH.P7d = 213;
    f.AscDFH.L6d = 214;
    f.AscDFH.j7d = 215;
    f.AscDFH.lua = 216;
    f.AscDFH.u7d = 217;
    f.AscDFH.G7d = 218;
    f.AscDFH.I7d = 219;
    f.AscDFH.J7d = 220;
    f.AscDFH.H7d = 221;
    f.AscDFH.sYc = 222;
    f.AscDFH.v7d = 223;
    f.AscDFH.w7d = 224;
    f.AscDFH.F7d = 225;
    f.AscDFH.K7d = 226;
    f.AscDFH.e7d = 227;
    f.AscDFH.b7d = 228;
    f.AscDFH.L7d = 229;
    f.AscDFH.k7d = 230;
    f.AscDFH.l7d = 231;
    f.AscDFH.m7d = 232;
    f.AscDFH.h7d = 233;
    f.AscDFH.i7d = 234;
    f.AscDFH.X6d = 235;
    f.AscDFH.W6d = 236;
    f.AscDFH.E7d = 237;
    f.AscDFH.V6d = 239;
    f.AscDFH.U6d = 240;
    f.AscDFH.r7d = 241;
    f.AscDFH.p7d = 242;
    f.AscDFH.q7d = 243;
    f.AscDFH.s7d = 244;
    f.AscDFH.o7d = 245;
    f.AscDFH.Fmf = 246;
    f.AscDFH.jUd = 247;
    f.AscDFH.P6d = 248;
    f.AscDFH.Y6d = 249;
    f.AscDFH.R6d = 250;
    f.AscDFH.M7d = 251;
    f.AscDFH.g7d = 252;
    f.AscDFH.a7d = 253;
    f.AscDFH.c7d = 254;
    f.AscDFH.Z6d = 255;
    f.AscDFH.O6d = 256;
    f.AscDFH.$6d = 257;
    f.AscDFH.wmf = 258;
    f.AscDFH.xmf = 259;
    f.AscDFH.umf = 260;
    f.AscDFH.zmf = 261;
    f.AscDFH.Emf = 262;
    f.AscDFH.Dmf = 263;
    f.AscDFH.Amf = 264;
    f.AscDFH.Cmf = 265;
    f.AscDFH.ymf = 266;
    f.AscDFH.vmf = 267;
    f.AscDFH.A7d = 268;
    f.AscDFH.tmf = 269;
    f.AscDFH.Bmf = 270;
    f.AscDFH.rmf = 271;
    f.AscDFH.smf = 271;
    f.AscDFH.y7d = 271;
    f.AscDFH.z7d = 271;
    f.AscDFH.x7d = 271;
    f.AscDFH.nmf = 271;
    f.AscDFH.S6d = 272;
    f.AscDFH.T6d = 273;
    f.AscDFH.M6d = 274;
    f.AscDFH.N6d = 275;
    f.AscDFH.C7d = 276;
    f.AscDFH.B7d = 277;
    f.AscDFH.D7d = 278;
    f.AscDFH.n7d = 279;
    f.AscDFH.N7d = 280;
    f.AscDFH.O7d = 281;
    f.AscDFH.rYc = 282;
    f.AscDFH.omf = 283;
    f.AscDFH.d7d = 284;
    f.AscDFH.Gmf = 285;
    f.AscDFH.Hmf = 286;
    f.AscDFH.pmf = 287;
    f.AscDFH.qmf = 288;
    f.AscDFH.Mzd = 289;
    f.AscDFH.c$f = 290;
    f.AscDFH.yzd = 291;
    f.AscDFH.hAd = 292;
    f.AscDFH.STd = 293;
    f.AscDFH.eAd = 294;
    f.AscDFH.mzd = 295;
    f.AscDFH.cAd = 296;
    f.AscDFH.nzd = 297;
    f.AscDFH.dAd = 298;
    f.AscDFH.$wc = 299;
    f.AscDFH.amf = 300;
    f.AscDFH.nYc = 301;
    f.AscDFH.Z9f = 302;
    f.AscDFH.mAd = 303;
    f.AscDFH.exc = 304;
    f.AscDFH.Klf = 305;
    f.AscDFH.qAd = 306;
    f.AscDFH.Czd = 307;
    f.AscDFH.oAd = 308;
    f.AscDFH.Vlf = 309;
    f.AscDFH.xRc = 310;
    f.AscDFH.Rlf = 311;
    f.AscDFH.Zlf = 312;
    f.AscDFH.jGb = 313;
    f.AscDFH.lfb = 314;
    f.AscDFH.zzd = 315;
    f.AscDFH.uzd = 316;
    f.AscDFH.nAd = 317;
    f.AscDFH.fAd = 318;
    f.AscDFH.YTd = 319;
    f.AscDFH.YMf = 320;
    f.AscDFH.Jlf = 321;
    f.AscDFH.Plf = 322;
    f.AscDFH.C5d = 323;
    f.AscDFH.D5d = 324;
    f.AscDFH.VTd = 325;
    f.AscDFH.a$f = 326;
    f.AscDFH.Zwc = 327;
    f.AscDFH.pzd = 328;
    f.AscDFH.Ezd = 329;
    f.AscDFH.Jzd = 330;
    f.AscDFH.axc = 331;
    f.AscDFH.kAd = 332;
    f.AscDFH.B5d = 333;
    f.AscDFH.yRc = 334;
    f.AscDFH.iUd = 335;
    f.AscDFH.K5d = 336;
    f.AscDFH.WTd = 337;
    f.AscDFH.gAd = 338;
    f.AscDFH.Lzd = 339;
    f.AscDFH.dxc = 340;
    f.AscDFH.Izd = 341;
    f.AscDFH.j5d = 342;
    f.AscDFH.e5d = 343;
    f.AscDFH.Hzd = 344;
    f.AscDFH.Wlf = 345;
    f.AscDFH.Q5d = 346;
    f.AscDFH.R5d = 347;
    f.AscDFH.gxc = 348;
    f.AscDFH.ozd = 349;
    f.AscDFH.Dzd = 350;
    f.AscDFH.Kzd = 350;
    f.AscDFH.ZMf = 351;
    f.AscDFH.Slf = 352;
    f.AscDFH.b$f = 353;
    f.AscDFH.X9f = 354;
    f.AscDFH.i6d = 355;
    f.AscDFH.G5d = 356;
    f.AscDFH.Llf = 357;
    f.AscDFH.M5d = 358;
    f.AscDFH.Olf = 359;
    f.AscDFH.cmf = 360;
    f.AscDFH.z5d = 361;
    f.AscDFH.Nlf = 362;
    f.AscDFH.$Td = 363;
    f.AscDFH.L5d = 364;
    f.AscDFH.Mlf = 365;
    f.AscDFH.bmf = 366;
    f.AscDFH.Y9f = 367;
    f.AscDFH.$9f = 368;
    f.AscDFH.bxc = 369;
    f.AscDFH.qzd = 370;
    f.AscDFH.Xlf = 371;
    f.AscDFH.Rzd = 372;
    f.AscDFH.Szd = 373;
    f.AscDFH.Ca = {};
    f.AscDFH.Ca[f.AscDFH.tBd] = Ia;
    f.AscDFH.Ac = {};
    Ia.prototype.ea = f.AscDFH.tBd;
    Ia.prototype.Ul = function() {
        this.Na && this.Na.Ul && this.Na.Ul(this)
    }
    ;
    Ia.prototype.oh = function() {
        this.Na && this.Na.oh && this.Na.oh(this)
    }
    ;
    Ia.prototype.se = function() {}
    ;
    Ia.prototype.ge = function() {}
    ;
    Ia.prototype.nh = function() {
        this.oh()
    }
    ;
    Ia.prototype.wT = function() {
        this.Na && this.Na.hf && this.Na.hf(this)
    }
    ;
    Ia.prototype.WWa = function() {
        return !1
    }
    ;
    Ia.prototype.rn = function() {
        return null
    }
    ;
    Ia.prototype.Dc = function() {
        return !0
    }
    ;
    Ia.prototype.ROc = function() {
        return !1
    }
    ;
    Ia.prototype.Xhd = function(e) {
        this.olc = e
    }
    ;
    Ia.prototype.OCa = function() {
        return !1
    }
    ;
    Ia.prototype.qaa = function() {
        return !0
    }
    ;
    f.AscDFH.Km = Ia;
    $a.prototype = Object.create(Ia.prototype);
    $a.prototype.constructor = $a;
    $a.prototype.WWa = function() {
        return !0
    }
    ;
    $a.prototype.JHa = function() {
        return this.ia
    }
    ;
    $a.prototype.Sa = function() {
        var e = new this.constructor(this.Na,this.Qa,this.wd,this.ia);
        e.jA = this.jA;
        for (var f = 0, y = this.Vm.length; f < y; ++f)
            e.Vm[f] = this.Vm[f];
        return e
    }
    ;
    $a.prototype.u6b = function() {
        return this.wd.length
    }
    ;
    $a.prototype.se = function(f) {
        var y = this.jA
          , Ta = this.wd.length
          , Xa = f.ua;
        f.Wm(4);
        for (var Pa = Ta, Ia = 0; Ia < Ta; ++Ia)
            !0 === y ? !1 === this.Vm[Ia] ? Pa-- : (f.cb(this.Vm[Ia]),
            this.yM(f, this.wd[Ia])) : (f.cb(this.Qa),
            this.yM(f, this.wd[Ia]));
        y = f.ua;
        f.kk(Xa);
        f.cb(Pa);
        f.kk(y);
        Xa = 0;
        e !== this.va && (Xa |= 1,
        !0 === this.va && (Xa |= 2));
        f.cb(Xa)
    }
    ;
    $a.prototype.ge = function(e) {
        this.jA = !0;
        this.wd = [];
        this.Vm = [];
        for (var f = e.jb(), y = 0; y < f; ++y)
            this.Vm[y] = e.jb(),
            this.wd[y] = this.XN(e);
        e = e.jb();
        e & 1 && (this.va = e & 2 ? !0 : !1)
    }
    ;
    $a.prototype.yM = function() {}
    ;
    $a.prototype.XN = function() {
        return null
    }
    ;
    $a.prototype.mOc = function() {
        var e = [];
        if (this.jA)
            for (var f = 0, y = this.wd.length; f < y; ++f)
                e.push({
                    bba: this.wd[f],
                    Qa: this.Vm[f],
                    ia: this.ia
                });
        else {
            var Ta = this.Qa;
            f = 0;
            for (y = this.wd.length; f < y; ++f)
                e.push({
                    bba: this.wd[f],
                    Qa: Ta + f,
                    ia: this.ia
                })
        }
        return e
    }
    ;
    $a.prototype.kOc = function(e) {
        this.jA = !0;
        this.Qa = 0;
        this.wd = [];
        this.Vm = [];
        for (var f = 0, y = e.length; f < y; ++f)
            this.Vm[f] = e[f].Qa,
            this.wd[f] = e[f].bba
    }
    ;
    $a.prototype.CS = function(e) {
        return this.Na !== e.Na || this.ea !== e.ea ? !1 : !0
    }
    ;
    $a.prototype.MS = function(e) {
        e = new e;
        e.Na = this.Na;
        e.Qa = this.Qa;
        e.wd = this.wd;
        e.ia = !this.ia;
        e.jA = this.jA;
        e.Vm = [];
        for (var f = 0, y = this.Vm.length; f < y; ++f)
            e.Vm[f] = this.Vm[f];
        return e
    }
    ;
    $a.prototype.Dc = function() {
        return !0
    }
    ;
    $a.prototype.oOd = function() {
        var e = null;
        if (this.jA) {
            for (var f = 0, y = this.Vm.length; f < y; ++f)
                if (null === e || e > this.Vm[f])
                    e = this.Vm[f];
            null === e && (e = 0)
        } else
            e = this.Qa;
        return e
    }
    ;
    f.AscDFH.Fv = $a;
    Va.prototype = Object.create(Ia.prototype);
    Va.prototype.constructor = Va;
    Va.prototype.Ul = function() {
        this.Oc(this.tb)
    }
    ;
    Va.prototype.oh = function() {
        this.Oc(this.Ha)
    }
    ;
    Va.prototype.Oc = function() {}
    ;
    Va.prototype.rn = function() {
        return new this.constructor(this.Na,this.Ha,this.tb,this.va)
    }
    ;
    Va.prototype.Dc = function(e) {
        return e.Na === this.Na && e.ea === this.ea ? (this.Ha = e.Ha,
        !1) : !0
    }
    ;
    f.AscDFH.Pg = Va;
    ib.prototype = Object.create(Va.prototype);
    ib.prototype.constructor = ib;
    ib.prototype.se = function(f) {
        var y = 0;
        !1 !== this.va && (y |= 1);
        e === this.Ha ? y |= 2 : !0 === this.Ha && (y |= 4);
        e === this.tb ? y |= 8 : !0 === this.tb && (y |= 16);
        f.cb(y)
    }
    ;
    ib.prototype.ge = function(f) {
        f = f.jb();
        this.va = f & 1 ? !0 : !1;
        this.Ha = f & 2 ? e : f & 4 ? !0 : !1;
        this.tb = f & 8 ? e : f & 16 ? !0 : !1
    }
    ;
    f.AscDFH.uk = ib;
    y.prototype = Object.create(Va.prototype);
    y.prototype.constructor = y;
    y.prototype.se = function(f) {
        var y = 0;
        !1 !== this.va && (y |= 1);
        e === this.Ha && (y |= 2);
        e === this.tb && (y |= 4);
        f.cb(y);
        e !== this.Ha && f.Ue(this.Ha);
        e !== this.tb && f.Ue(this.tb)
    }
    ;
    y.prototype.ge = function(f) {
        var y = f.jb();
        this.va = y & 1 ? !0 : !1;
        this.Ha = y & 2 ? e : f.mg();
        this.tb = y & 4 ? e : f.mg()
    }
    ;
    f.AscDFH.VB = y;
    Ab.prototype = Object.create(Va.prototype);
    Ab.prototype.constructor = Ab;
    Ab.prototype.se = function(f) {
        var y = 0;
        !1 !== this.va && (y |= 1);
        e === this.Ha && (y |= 2);
        e === this.tb && (y |= 4);
        f.cb(y);
        e !== this.Ha && this.Ha.Bc && this.Ha.Bc(f);
        e !== this.tb && this.tb.Bc && this.tb.Bc(f)
    }
    ;
    Ab.prototype.ge = function(f) {
        var y = f.jb();
        this.va = y & 1 ? !0 : !1;
        y & 2 ? this.Ha = !0 === this.Ada() ? this.el() : e : (this.Ha = this.el()) && this.Ha.zc && this.Ha.zc(f);
        y & 4 ? this.tb = !0 === this.Ada() ? this.el() : e : (this.tb = this.el()) && this.tb.zc && this.tb.zc(f)
    }
    ;
    Ab.prototype.el = function() {
        return null
    }
    ;
    Ab.prototype.Ada = function() {
        return !1
    }
    ;
    f.AscDFH.Si = Ab;
    Sb.prototype = Object.create(Va.prototype);
    Sb.prototype.constructor = Sb;
    Sb.prototype.se = function(f) {
        var y = 0;
        !1 !== this.va && (y |= 1);
        e === this.Ha && (y |= 2);
        e === this.tb && (y |= 4);
        f.cb(y);
        e !== this.Ha && f.cb(this.Ha);
        e !== this.tb && f.cb(this.tb)
    }
    ;
    Sb.prototype.ge = function(f) {
        var y = f.jb();
        this.va = y & 1 ? !0 : !1;
        this.Ha = y & 2 ? e : f.jb();
        this.tb = y & 4 ? e : f.jb()
    }
    ;
    f.AscDFH.xj = Sb;
    kb.prototype = Object.create(Va.prototype);
    kb.prototype.constructor = kb;
    kb.prototype.se = function(f) {
        var y = 0;
        !1 !== this.va && (y |= 1);
        e === this.Ha && (y |= 2);
        e === this.tb && (y |= 4);
        f.cb(y);
        e !== this.Ha && f.Rb(this.Ha);
        e !== this.tb && f.Rb(this.tb)
    }
    ;
    kb.prototype.ge = function(f) {
        var y = f.jb();
        this.va = y & 1 ? !0 : !1;
        this.Ha = y & 2 ? e : f.cc();
        this.tb = y & 4 ? e : f.cc()
    }
    ;
    f.AscDFH.hE = kb;
    Ta.prototype = Object.create(Va.prototype);
    Ta.prototype.constructor = Ta;
    Ta.prototype.se = function(f) {
        var y = 0;
        !1 !== this.va && (y |= 1);
        e === this.Ha && (y |= 2);
        e === this.tb && (y |= 4);
        f.cb(y);
        e !== this.Ha && f.ra(this.Ha);
        e !== this.tb && f.ra(this.tb)
    }
    ;
    Ta.prototype.ge = function(f) {
        var y = f.jb();
        this.va = y & 1 ? !0 : !1;
        this.Ha = y & 2 ? e : f.mD();
        this.tb = y & 4 ? e : f.mD()
    }
    ;
    f.AscDFH.j1c = Ta;
    ob.prototype = Object.create(Va.prototype);
    ob.prototype.constructor = ob;
    ob.prototype.se = function(e) {
        e.cb(this.Ha);
        e.cb(this.tb)
    }
    ;
    ob.prototype.ge = function(e) {
        this.Ha = e.jb();
        this.tb = e.jb()
    }
    ;
    f.AscDFH.cja = ob;
    Xa.prototype = Object.create(Va.prototype);
    Xa.prototype.constructor = Xa;
    Xa.prototype.se = function(e) {
        e.Bb(this.Ha);
        e.Bb(this.tb)
    }
    ;
    Xa.prototype.ge = function(e) {
        this.Ha = e.pb();
        this.tb = e.pb()
    }
    ;
    f.AscDFH.mV = Xa;
    kc.prototype = Object.create(Ab.prototype);
    kc.prototype.constructor = kc;
    kc.prototype.Ada = function() {
        return !0
    }
    ;
    f.AscDFH.ax = kc;
    Cc.prototype = Object.create(Va.prototype);
    Cc.prototype.constructor = Cc;
    Cc.prototype.se = function(e) {
        e.Rb(this.Ha);
        e.Rb(this.tb)
    }
    ;
    Cc.prototype.ge = function(e) {
        this.Ha = e.cc();
        this.tb = e.cc()
    }
    ;
    f.AscDFH.e9a = Cc;
    Pb.prototype = Object.create(Va.prototype);
    Pb.prototype.constructor = Pb;
    Pb.prototype.se = function(e) {
        e.ra(this.Ha);
        e.ra(this.tb)
    }
    ;
    Pb.prototype.ge = function(e) {
        this.Ha = e.mD();
        this.tb = e.mD()
    }
    ;
    f.AscDFH.Wua = Pb;
    ic.prototype = Object.create(Va.prototype);
    ic.prototype.constructor = ic;
    ic.prototype.se = function(e) {
        e.Ue(this.Ha);
        e.Ue(this.tb)
    }
    ;
    ic.prototype.ge = function(e) {
        this.Ha = e.mg();
        this.tb = e.mg()
    }
    ;
    f.AscDFH.oKa = ic
}
)(window);
"use strict";
(function(f) {
    function e() {
        this.n2a = null;
        this.wG = !1;
        this.Vf = {};
        this.Ia = null;
        this.e8 = !1
    }
    e.prototype.te = function() {
        this.n2a = {};
        this.wG = !1;
        this.Vf = {};
        this.Ia = AscCommon.eg.zg();
        this.ia(this, this.Ia);
        this.Cuf();
        this.e8 = !0
    }
    ;
    e.prototype.ia = function(e, f) {
        !1 === this.wG && (e.Ia = f,
        this.n2a[f] = e,
        AscCommon.History.ia(new AscCommon.m1c(this,f,e)))
    }
    ;
    e.prototype.Kv = function() {
        this.wG = !0
    }
    ;
    e.prototype.St = function() {
        this.wG = !1
    }
    ;
    e.prototype.cg = function(e) {
        return "" === e ? null : this.n2a[e] ? this.n2a[e] : null
    }
    ;
    e.prototype.rb = function() {
        return this.Ia
    }
    ;
    e.prototype.yg = function() {
        this.n2a = {};
        this.wG = !1;
        this.Ia = AscCommon.eg.zg();
        this.ia(this, this.Ia)
    }
    ;
    e.prototype.Cuf = function() {
        this.Vf[AscDFH.Jy] = AscCommonWord.Ua;
        this.Vf[AscDFH.tF] = AscCommonWord.tN;
        this.Vf[AscDFH.N1a] = AscCommonWord.sue;
        this.Vf[AscDFH.lS] = AscCommonWord.V3;
        this.Vf[AscDFH.sF] = AscCommonWord.Z9b;
        this.Vf[AscDFH.Hla] = AscCommonWord.Qee;
        this.Vf[AscDFH.n2] = AscCommonWord.Nee;
        this.Vf[AscDFH.c1b] = AscCommonWord.Hdc;
        this.Vf[AscDFH.DBd] = AscCommonWord.Kdc;
        this.Vf[AscDFH.K1a] = AscCommonWord.dde;
        this.Vf[AscDFH.nob] = AscCommon.Psa;
        this.Vf[AscDFH.rF] = AscCommonWord.Lee;
        this.Vf[AscDFH.RUd] = AscCommon.L7;
        this.Vf[AscDFH.pv] = AscCommonWord.dwa;
        this.Vf[AscDFH.gC] = AscCommonWord.Eee;
        this.Vf[AscDFH.Ggb] = AscCommonWord.BXa;
        this.Vf[AscDFH.CBd] = AscCommonWord.Qde;
        this.Vf[AscDFH.Egb] = AscFormat.f5c;
        this.Vf[AscDFH.BFa] = AscFormat.C1c;
        this.Vf[AscDFH.Mgb] = AscFormat.wte;
        this.Vf[AscDFH.O1a] = AscFormat.Tsb;
        this.Vf[AscDFH.Ogb] = AscFormat.p9;
        this.Vf[AscDFH.s1b] = AscFormat.hIb;
        this.Vf[AscDFH.dHc] = AscFormat.jp;
        this.Vf[AscDFH.p_] = AscFormat.Xua;
        this.Vf[AscDFH.Js] = AscFormat.O0;
        this.Vf[AscDFH.Qxa] = AscFormat.Gea;
        this.Vf[AscDFH.ura] = AscFormat.nV;
        this.Vf[AscDFH.lAb] = AscFormat.lLb;
        this.Vf[AscDFH.Q1a] = AscFormat.F1c;
        this.Vf[AscDFH.aY] = AscFormat.pP;
        this.Vf[AscDFH.mAb] = AscFormat.uX;
        this.Vf[AscDFH.Pga] = AscFormat.bva;
        this.Vf[AscDFH.k1b] = AscFormat.DM;
        this.Vf[AscDFH.S1a] = AscFormat.eI;
        this.Vf[AscDFH.IPa] = AscFormat.o1c;
        this.Vf[AscDFH.GI] = AscFormat.Zua;
        this.Vf[AscDFH.j2] = AscFormat.iE;
        this.Vf[AscDFH.sAb] = AscFormat.r9a;
        this.Vf[AscDFH.Qv] = AscFormat.XUa;
        this.Vf[AscDFH.rra] = AscFormat.Adc;
        this.Vf[AscDFH.RA] = AscFormat.Lpb;
        this.Vf[AscDFH.Fla] = AscFormat.Ndc;
        this.Vf[AscDFH.Bu] = AscFormat.$Ua;
        this.Vf[AscDFH.vra] = AscFormat.Sdc;
        this.Vf[AscDFH.EE] = AscFormat.l9a;
        this.Vf[AscDFH.k2] = AscFormat.n9a;
        this.Vf[AscDFH.l2] = AscFormat.Qpb;
        this.Vf[AscDFH.Z0b] = AscFormat.iLb;
        this.Vf[AscDFH.kS] = AscFormat.c9a;
        this.Vf[AscDFH.AQ] = AscFormat.dVa;
        this.Vf[AscDFH.CFa] = AscFormat.P0;
        this.Vf[AscDFH.Pxa] = AscFormat.g9a;
        this.Vf[AscDFH.g1b] = AscFormat.Mdc;
        this.Vf[AscDFH.nAb] = AscFormat.ZUa;
        this.Vf[AscDFH.oAb] = AscFormat.$ua;
        this.Vf[AscDFH.l1b] = AscFormat.WBa;
        this.Vf[AscDFH.Rga] = AscFormat.q9a;
        this.Vf[AscDFH.u1b] = AscFormat.eja;
        this.Vf[AscDFH.q1b] = AscFormat.cva;
        this.Vf[AscDFH.o1b] = AscFormat.o9a;
        this.Vf[AscDFH.p1b] = AscFormat.sKa;
        this.Vf[AscDFH.T1a] = AscFormat.fVa;
        this.Vf[AscDFH.i1b] = AscFormat.B1c;
        this.Vf[AscDFH.h1b] = AscFormat.A1c;
        this.Vf[AscDFH.r1b] = AscFormat.Kee;
        this.Vf[AscDFH.v1b] = AscFormat.gO;
        this.Vf[AscDFH.$X] = AscFormat.hLb;
        this.Vf[AscDFH.M1a] = AscFormat.lV;
        this.Vf[AscDFH.P1a] = AscFormat.Opb;
        this.Vf[AscDFH.wra] = AscFormat.J1c;
        this.Vf[AscDFH.b6] = AscFormat.Ipb;
        this.Vf[AscDFH.zQ] = AscFormat.VBa;
        this.Vf[AscDFH.e6] = AscFormat.aVa;
        this.Vf[AscDFH.FFa] = AscFormat.oLb;
        this.Vf[AscDFH.c6] = AscFormat.f1c;
        this.Vf[AscDFH.e1b] = AscFormat.Lde;
        this.Vf[AscDFH.n1b] = AscFormat.G1c;
        this.Vf[AscDFH.R1a] = AscFormat.H1c;
        this.Vf[AscDFH.jAb] = AscFormat.Yua;
        this.Vf[AscDFH.MPa] = AscFormat.tKa;
        this.Vf[AscDFH.b1b] = AscFormat.r8;
        this.Vf[AscDFH.Ngb] = AscFormat.L1c;
        this.Vf[AscDFH.oca] = AscFormat.oA;
        this.Vf[AscDFH.EFa] = AscFormat.Dg;
        this.Vf[AscDFH.$Gc] = AscFormat.oHb;
        this.Vf[AscDFH.ZGc] = AscFormat.N4a;
        this.Vf[AscDFH.f1b] = AscFormat.t6c;
        this.Vf[AscDFH.Hgb] = AscFormat.Wje;
        this.Vf[AscDFH.kAb] = AscFormat.Xje;
        this.Vf[AscDFH.Igb] = AscFormat.Tje;
        this.Vf[AscDFH.t1b] = AscFormat.Nkd;
        this.Vf[AscDFH.Kgb] = AscFormat.tUc;
        this.Vf[AscDFH.a1b] = AscFormat.X9b;
        this.Vf[AscDFH.$0b] = AscFormat.vmb;
        this.Vf[AscDFH.qAb] = AscFormat.Rdc;
        this.Vf[AscDFH.tra] = AscFormat.Ldc;
        this.Vf[AscDFH.KPa] = AscFormat.Odc;
        this.Vf[AscDFH.Oga] = AscFormat.Pdc;
        this.Vf[AscDFH.ns] = AscFormat.fv;
        this.Vf[AscDFH.Fgb] = AscFormat.q1c;
        this.Vf[AscDFH.tw] = AscFormat.s8;
        this.Vf[AscDFH.vx] = AscFormat.t8;
        this.Vf[AscDFH.sra] = AscFormat.cLa;
        this.Vf[AscDFH.LPa] = AscFormat.h5a;
        this.Vf[AscDFH.kUa] = AscFormat.Z2;
        this.Vf[AscDFH.fC] = AscFormat.v4;
        this.Vf[AscDFH.Rv] = AscFormat.lT;
        this.Vf[AscDFH.oob] = AscCommonWord.aEf;
        this.Vf[AscDFH.QA] = AscFormat.qKa;
        this.Vf[AscDFH.BQ] = AscFormat.Ppb;
        this.Vf[AscDFH.roa] = AscFormat.I$;
        this.Vf[AscDFH.MO] = AscFormat.mLb;
        this.Vf[AscDFH.jX] = AscFormat.jLb;
        this.Vf[AscDFH.BBd] = AscFormat.T6;
        this.Vf[AscDFH.Hq] = AscCommonWord.Ng;
        this.Vf[AscDFH.FBd] = AscCommonWord.jee;
        this.Vf[AscDFH.NBd] = AscCommonWord.ede;
        this.Vf[AscDFH.OBd] = AscCommonWord.pde;
        this.Vf[AscDFH.QBd] = AscCommonWord.ude;
        this.Vf[AscDFH.PBd] = AscCommonWord.tde;
        this.Vf[AscDFH.TBd] = AscCommonWord.Ede;
        this.Vf[AscDFH.UBd] = AscCommonWord.Kde;
        this.Vf[AscDFH.VBd] = AscCommonWord.Rde;
        this.Vf[AscDFH.YBd] = AscCommonWord.kee;
        this.Vf[AscDFH.WBd] = AscCommonWord.Wde;
        this.Vf[AscDFH.XBd] = AscCommonWord.gee;
        this.Vf[AscDFH.ZBd] = AscCommonWord.lee;
        this.Vf[AscDFH.$Bd] = AscCommonWord.oee;
        this.Vf[AscDFH.aCd] = AscCommonWord.wee;
        this.Vf[AscDFH.bCd] = AscCommonWord.zee;
        this.Vf[AscDFH.SBd] = AscCommonWord.Dde;
        this.Vf[AscDFH.RBd] = AscCommonWord.Cde;
        this.Vf[AscDFH.yBd] = AscCommonWord.Jpb;
        this.Vf[AscDFH.EBd] = AscCommonWord.hHb;
        this.Vf[AscDFH.SUd] = AscCommonWord.CParagraphBookmark;
        this.Vf[AscDFH.j1b] = AscCommonWord.pee;
        this.Vf[AscDFH.pAb] = AscCommonWord.O6a;
        this.Vf[AscDFH.NJa] = AscFormat.k9a;
        this.Vf[AscDFH.ABa] = AscFormat.vdc;
        this.Vf[AscDFH.GBd] = AscCommon.vee;
        this.Vf[AscDFH.Tnf] = AscCommon.Cee;
        f.AscCommonSlide && (this.Vf[AscDFH.mS] = AscCommonSlide.Slide,
        this.Vf[AscDFH.nca] = AscCommonSlide.SlideLayout,
        this.Vf[AscDFH.xra] = AscCommonSlide.MasterSlide,
        this.Vf[AscDFH.H8b] = AscCommonSlide.CZf,
        this.Vf[AscDFH.HRc] = AscCommonSlide.jed,
        this.Vf[AscDFH.BBa] = AscCommonSlide.xYd,
        this.Vf[AscDFH.wda] = AscCommonSlide.CEb,
        this.Vf[AscDFH.yJb] = AscCommonSlide.JTf);
        this.Vf[AscDFH.Qga] = AscFormat.T1c;
        this.Vf[AscDFH.dz] = AscFormat.E3;
        f.AscCommonExcel && (this.Vf[AscDFH.qF] = AscCommonExcel.lLd,
        this.Vf[AscDFH.uYc] = Asc.$Df);
        this.Vf[AscDFH.cHc] = AscCommon.r1c
    }
    ;
    e.prototype.xle = function(e) {
        return this.Vf[e] ? new this.Vf[e] : null
    }
    ;
    e.prototype.hf = function() {}
    ;
    f.AscCommon.Fg = new e;
    f.AscCommon.AYd = e
}
)(window);
"use strict";
(function(f) {
    function e(e, f, y) {
        AscDFH.Km.call(this, e);
        this.Ia = f;
        this.Fjc = y
    }
    function Ia(e, f, y, Ia, $a, kb, Ta, ob, Xa, kc) {
        AscDFH.Km.call(this, e);
        this.OMb = f;
        this.PMb = y;
        this.iTa = Ia;
        this.fad = $a;
        this.Mdd = kb;
        this.Kjd = Ta;
        this.yad = ob;
        this.qkd = Xa;
        this.Gfc = kc;
        this.Jld = "5.6.1.6.@@Rev"
    }
    function $a(e, f) {
        AscDFH.Km.call(this, e);
        this.R_ = f ? f : ""
    }
    e.prototype = Object.create(AscDFH.Km.prototype);
    e.prototype.constructor = e;
    e.prototype.ea = AscDFH.M0b;
    e.prototype.Ul = function() {}
    ;
    e.prototype.oh = function() {}
    ;
    e.prototype.se = function(e) {
        e.Rb(this.Ia);
        this.Fjc.Vg(e)
    }
    ;
    e.prototype.ge = function(e) {
        this.Ia = e.cc();
        this.Fjc = this.ivf(e)
    }
    ;
    e.prototype.nh = function() {
        this.Na.n2a[this.Ia] = this.Fjc
    }
    ;
    e.prototype.wT = function() {}
    ;
    e.prototype.ivf = function(e) {
        var f = this.Na
          , y = e.jb();
        f.Kv();
        y = f.xle(y);
        null !== y && y.eh(e);
        f.St();
        return y
    }
    ;
    e.prototype.rn = function() {
        return null
    }
    ;
    f.AscCommon.m1c = e;
    Ia.prototype = Object.create(AscDFH.Km.prototype);
    Ia.prototype.constructor = Ia;
    Ia.prototype.ea = AscDFH.dgb;
    Ia.prototype.Ul = function() {}
    ;
    Ia.prototype.oh = function() {}
    ;
    Ia.prototype.se = function(e) {
        e.cb(this.OMb);
        e.cb(this.PMb);
        e.cb(this.iTa);
        e.cb(this.fad);
        e.cb(this.Mdd);
        e.cb(this.Kjd);
        e.cb(this.yad);
        e.cb(this.qkd);
        e.cb(null === this.Gfc ? -10 : this.Gfc);
        e.Rb(this.Jld)
    }
    ;
    Ia.prototype.ge = function(e) {
        this.OMb = e.jb();
        this.PMb = e.jb();
        this.iTa = e.jb();
        this.fad = e.jb();
        this.Mdd = e.jb();
        this.Kjd = e.jb();
        this.yad = e.jb();
        this.qkd = e.jb();
        this.Gfc = e.jb();
        this.Jld = e.cc()
    }
    ;
    Ia.prototype.nh = function() {}
    ;
    Ia.prototype.wT = function() {}
    ;
    Ia.prototype.rn = function() {
        return null
    }
    ;
    f.AscCommon.zNd = Ia;
    $a.prototype = Object.create(AscDFH.Km.prototype);
    $a.prototype.constructor = $a;
    $a.prototype.ea = AscDFH.gYb;
    $a.prototype.Ul = function() {}
    ;
    $a.prototype.oh = function() {}
    ;
    $a.prototype.se = function(e) {
        e.Rb(this.R_)
    }
    ;
    $a.prototype.ge = function(e) {
        this.R_ = e.cc()
    }
    ;
    $a.prototype.nh = function() {
        var e = this.R_;
        if (editor && editor.Fa && editor.Fa.Wa) {
            var Ia = editor.Fa.Wa;
            if (Ia instanceof AscCommonWord.ymb) {
                var y = Ia.ec.P8f(e)
                  , $a = Ia.$0();
                AscFormat.ej(function() {
                    var e = new AscCommonWord.dwa;
                    e.aa.splice(0, 0, y);
                    $a.aa.splice(0, 0, e);
                    Ia.ec.sIb(y)
                }, this, [])
            } else if (Ia instanceof AscCommonSlide.CPresentation && Ia.qe[0]) {
                var Sb = Ia.qe[0].um.xuc(e);
                Sb.fa.nb.Wj = (Ia.od - Sb.fa.nb.eb) / 2;
                Sb.fa.nb.ik = (Ia.Tc - Sb.fa.nb.fb) / 2;
                Sb.parent = Ia.qe[0];
                Ia.qe[0].Rf.Rc.push(Sb)
            }
        } else if (Sb = f.Asc.editor.Yn.Tm[0]) {
            var kb = (new AscFormat.ec).G_a(AscCommon.DP.aSa);
            e = AscFormat.TH.prototype.xuc(e);
            kb.ext.cn = e.fa.nb.eb;
            kb.ext.dn = e.fa.nb.fb;
            kb.Lc = e;
            Sb.Qg.push(kb)
        }
    }
    ;
    $a.prototype.wT = function() {}
    ;
    $a.prototype.rn = function() {
        return null
    }
    ;
    f.AscCommon.wde = $a
}
)(window);
AscDFH.Ca[AscDFH.M0b] = AscCommon.m1c;
AscDFH.Ca[AscDFH.dgb] = AscCommon.zNd;
AscDFH.Ca[AscDFH.gYb] = AscCommon.wde;
AscDFH.Ac[AscDFH.M0b] = [AscDFH.M0b];
AscDFH.Ac[AscDFH.Lnf] = [AscDFH.Lnf];
AscDFH.Ac[AscDFH.dgb] = [AscDFH.dgb];
AscDFH.Ac[AscDFH.gYb] = [AscDFH.gYb];
"use strict";
(function(f) {
    function e(e, f) {
        this.mlb = e;
        this.AYc = !!f;
        this.pEa = null;
        this.ZOf = this.iSd = !1;
        this.D9 = this.mSc = this.lSc = this.u3d = null
    }
    function Ia(e) {
        for (var f = [], y, Ta = e.encodings, Ia = 0; Ia < Ta.length; Ia++)
            y = new ib,
            y.te(Ta[Ia]),
            f.push(y);
        this.dcf = f;
        this.bzf = new $a(e.codepage,e.delimiter);
        this.data = e.data
    }
    function $a(e, f, y) {
        this.Wdb = e;
        this.V_a = f;
        this.Vvd = y
    }
    function Va(e) {
        this.password = e
    }
    function ib() {
        this.jIc = this.text = this.Wdb = this.Ztc = null
    }
    function y(e) {
        this.Wvd = e
    }
    function Ab(e) {
        this.wlf = e;
        this.Xwd = []
    }
    function Sb(e) {
        this.name = e.name
    }
    e.prototype.F8e = function(e) {
        this.mlb = e
    }
    ;
    e.prototype.T8e = function(e) {
        this.AYc = e
    }
    ;
    e.prototype.UZa = function(e) {
        this.pEa = e
    }
    ;
    e.prototype.p8e = function(e) {
        this.iSd = e
    }
    ;
    Ia.prototype.x0e = function() {
        return this.dcf
    }
    ;
    Ia.prototype.b4e = function() {
        return this.bzf
    }
    ;
    Ia.prototype.oRd = function() {
        return this.data
    }
    ;
    $a.prototype.G7b = function() {
        return this.V_a
    }
    ;
    $a.prototype.v8e = function(e) {
        this.V_a = e
    }
    ;
    $a.prototype.xFb = function() {
        return this.Vvd
    }
    ;
    $a.prototype.w8e = function(e) {
        this.Vvd = e
    }
    ;
    $a.prototype.HTa = function() {
        return this.Wdb
    }
    ;
    $a.prototype.psc = function(e) {
        this.Wdb = e
    }
    ;
    Va.prototype.awb = function() {
        return this.password
    }
    ;
    Va.prototype.t9e = function(e) {
        this.password = e
    }
    ;
    ib.prototype.te = function(e) {
        this.Ztc = e.name;
        this.Wdb = e.codepage;
        this.text = e.text;
        this.jIc = e.lcid
    }
    ;
    ib.prototype.w0e = function() {
        return this.Ztc
    }
    ;
    ib.prototype.f8e = function(e) {
        this.Ztc = e
    }
    ;
    ib.prototype.HTa = function() {
        return this.Wdb
    }
    ;
    ib.prototype.psc = function(e) {
        this.Wdb = e
    }
    ;
    ib.prototype.Oka = function() {
        return this.text
    }
    ;
    ib.prototype.vnb = function(e) {
        this.text = e
    }
    ;
    ib.prototype.I2e = function() {
        return this.jIc
    }
    ;
    ib.prototype.Z8e = function(e) {
        this.jIc = e
    }
    ;
    y.prototype.f1e = function() {
        return this.Wvd
    }
    ;
    y.prototype.x8e = function(e) {
        this.Wvd = e
    }
    ;
    Ab.prototype.Q1e = function() {
        return this.wlf
    }
    ;
    Ab.prototype.H1e = function() {
        return this.Xwd
    }
    ;
    Ab.prototype.I1d = function(e) {
        return this.Xwd.push(e)
    }
    ;
    Sb.prototype.oC = function() {
        return this.name
    }
    ;
    Sb.prototype.$2e = function() {
        return AscCommonExcel.Ewb ? AscCommonExcel.Ewb[this.name] : this.name
    }
    ;
    f.Asc = f.Asc || {};
    f.AscCommon = f.AscCommon || {};
    f.Asc.eQc = f.Asc.asc_CDownloadOptions = e;
    var kb = e.prototype;
    kb.asc_setFileType = kb.F8e;
    kb.asc_setIsDownloadEvent = kb.T8e;
    kb.asc_setAdvancedOptions = kb.UZa;
    kb.asc_setCompatible = kb.p8e;
    f.AscCommon.mWc = Ia;
    kb = Ia.prototype;
    kb.asc_getCodePages = kb.x0e;
    kb.asc_getRecommendedSettings = kb.b4e;
    kb.asc_getData = kb.oRd;
    f.Asc.gQc = f.Asc.asc_CTextOptions = $a;
    kb = $a.prototype;
    kb.asc_getDelimiter = kb.G7b;
    kb.asc_setDelimiter = kb.v8e;
    kb.asc_getDelimiterChar = kb.xFb;
    kb.asc_setDelimiterChar = kb.w8e;
    kb.asc_getCodePage = kb.HTa;
    kb.asc_setCodePage = kb.psc;
    f.Asc.Yrg = f.Asc.asc_CDRMAdvancedOptions = Va;
    kb = Va.prototype;
    kb.asc_getPassword = kb.awb;
    kb.asc_setPassword = kb.t9e;
    kb = ib.prototype;
    kb.asc_getCodePageName = kb.w0e;
    kb.asc_setCodePageName = kb.f8e;
    kb.asc_getCodePage = kb.HTa;
    kb.asc_setCodePage = kb.psc;
    kb.asc_getText = kb.Oka;
    kb.asc_setText = kb.vnb;
    kb.asc_getLcid = kb.I2e;
    kb.asc_setLcid = kb.Z8e;
    kb = y.prototype;
    kb.asc_getDelimiterName = kb.f1e;
    kb.asc_setDelimiterName = kb.x8e;
    f.AscCommon.h2f = Ab;
    kb = Ab.prototype;
    kb.asc_getGroupName = kb.Q1e;
    kb.asc_getFormulasArray = kb.H1e;
    kb.asc_addFormulaElement = kb.I1d;
    f.AscCommon.g2f = Sb;
    kb = Sb.prototype;
    kb.asc_getName = kb.oC;
    kb.asc_getLocaleName = kb.$2e
}
)(window);
"use strict";
(function(f, e) {
    function Ia() {
        this.data = this.Ew = null;
        this.ua = 0
    }
    function $a() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 1;
        this.canvas.height = 1;
        this.dv = this.canvas.getContext("2d");
        this.oP = function(e) {
            var f = new Ia;
            f.Ew = this.dv.createImageData(1, parseInt((e + 3) / 4));
            f.data = f.Ew.data;
            f.ua = 0;
            return f
        }
    }
    f.AscFonts = f.AscFonts || {};
    f.AscFonts.JHc = !1;
    f.AscFonts.xg = null;
    f.AscFonts.cCb = null;
    f.AscFonts.BGb = null;
    f.AscFonts.$Ic = 5;
    f.AscFonts.IVb = 0;
    f.AscFonts.edb = function(e) {
        if ("undefined" != typeof Uint8Array && !f.opera)
            return new Uint8Array(e);
        for (var Ia = Array(e), y = 0; y < e; y++)
            Ia[y] = 0;
        return Ia
    }
    ;
    f.AscFonts.Hrg = function(e) {
        return {
            data: f.AscFonts.edb(e)
        }
    }
    ;
    f.AscFonts.YJb = function() {
        f.AscFonts.JHc || (++f.AscFonts.IVb,
        f.AscFonts.IVb == f.AscFonts.$Ic && (f.AscFonts.xg && (f.AscFonts.JHc = !0,
        f.AscFonts.cCb.call(f.AscFonts.xg)),
        delete f.AscFonts.IVb,
        delete f.AscFonts.$Ic,
        delete f.AscFonts.xg,
        delete f.AscFonts.cCb,
        delete f.AscFonts.BGb))
    }
    ;
    f.AscFonts.load = function(Ia, ib, y) {
        f.AscFonts.xg = Ia;
        f.AscFonts.cCb = ib;
        f.AscFonts.BGb = y;
        !0 === f.NATIVE_EDITOR_ENJINE || !0 === f.IS_NATIVE_EDITOR || f.Native !== e ? (f.AscFonts.JHc = !0,
        f.AscFonts.cCb.call(f.AscFonts.xg),
        delete f.AscFonts.IVb,
        delete f.AscFonts.$Ic,
        delete f.AscFonts.xg,
        delete f.AscFonts.cCb,
        delete f.AscFonts.BGb) : (Ia = "../../../../sdkjs/common/libfont",
        ib = !1,
        y = f.WebAssembly,
        "object" !== typeof y || "function" !== typeof y.Memory || "function" !== typeof y.instantiateStreaming && "function" !== typeof y.instantiate || (ib = !0),
        ib ? Ia += "/wasm" : Ia += "/js",
        ib || f.AscFonts.YJb(),
        ib = function() {}
        ,
        y = function() {
            f.AscFonts.BGb()
        }
        ,
        f.AscNotLoadAllScript ? (AscCommon.EJb(Ia + "/engine.js", ib, y),
        AscCommon.EJb(Ia + "/file.js", ib, y),
        AscCommon.EJb(Ia + "/manager.js", ib, y)) : AscCommon.EJb(Ia + "/fonts.js", ib, y))
    }
    ;
    f.AscFonts.u$a = function(e, f) {
        this.data = e;
        this.size = f
    }
    ;
    f.AscFonts.AX = {
        dta: function(e) {
            return 2147483647 < e ? e - 4294967296 : e
        },
        V$: function(e) {
            return 32767 < e ? e - 65536 : e
        },
        TS: function(e) {
            return 0 > e ? e + 4294967296 : e
        },
        XGf: function(e) {
            return 0 > e ? e + 65536 : e
        },
        zbg: function(e, f, y) {
            for (var Ia = 0; Ia < y; Ia++)
                e[Ia] = f
        }
    };
    f.AscFonts.XVf = $a;
    f.AscFonts.gSa = new $a;
    f.AscFonts.f4b = new function() {
        this.pitch = this.height = this.width = 0;
        this.p2a = null;
        this.YI = function(e, Ia) {
            if (this.width < e + 1 || this.height < Ia + 1)
                this.width = Math.max(this.width, e + 1),
                this.pitch = 4 * this.width,
                this.height = Math.max(this.height, Ia + 1),
                this.p2a = null,
                this.p2a = f.AscFonts.gSa.dv.createImageData(this.width, this.height)
        }
    }
    ;
    f.AscFonts.CId = [];
    f.AscFonts.Exd = function() {
        return AscCommon.Se.aI && !AscCommon.Se.pCd ? !0 : !1
    }
    ;
    f.AscFonts.uAf = function(e) {
        var Ia = f.AscFonts.Exd();
        e = e ? Ia : !Ia;
        if (f.AscFonts.INc !== e) {
            f.AscFonts.INc = e;
            e = f.AscFonts.CId;
            Ia = 0;
            for (var y = e.length; Ia < y; Ia++)
                e[Ia].nHb(),
                e[Ia].K9c()
        }
    }
    ;
    f.AscFonts.INc = f.AscFonts.Exd()
}
)(window, void 0);
"use strict";
var c_oAscWrapStyle2 = {
    Yq: 0,
    F0d: 1,
    s$g: 2,
    r$g: 3,
    t$g: 4,
    N8g: 5,
    R9g: 6
}
  , c_oAscTableSelectionType = {
    Hb: 0,
    Aa: 1,
    Sq: 2,
    Table: 3
}
  , LE = {
    Ona: 0,
    w2c: 1
}
  , c_oAscCollaborativeMarksShowType = {
    kf: -1,
    $l: 0,
    vad: 1
}
  , c_oAscVertAlignJc = {
    Oa: 0,
    Ok: 1,
    Ta: 2
}
  , c_oAscTableLayout = {
    ATc: 0,
    S6c: 1
}
  , ME = {
    Scc: 0,
    Tcc: 1,
    sTc: 2,
    qTc: 3,
    Rcc: 4,
    rTc: 5
}
  , TABLE_STYLE_WIDTH_PIX = 70
  , TABLE_STYLE_HEIGHT_PIX = 50
  , NE = {
    XHa: 5,
    QRa: "DOCY"
}
  , OE = {
    YGg: 0,
    mIg: 1,
    rKg: 2,
    XKg: 3
}
  , QE = {
    O_: 0,
    AIg: 1,
    zIg: 2
}
  , c_oAscSdtLevelType = {
    fda: 1,
    Yq: 2,
    Aa: 3,
    Hb: 4
}
  , RE = {
    hM: 0,
    zPc: 1,
    BPc: 2,
    ZOc: 3,
    iOc: 4,
    IPc: 5
}
  , UE = {
    Ua: 1,
    Ye: 2,
    Table: 3,
    bw: 4
}
  , c_oAscHyperlinkAnchor = {
    ana: 1,
    ekb: 2
};
window.flat_desine = !1;
var VE;
window.Asc = window.Asc || {};
window.AscCommonWord = window.AscCommonWord || {};
VE = window.Asc.c_oAscWrapStyle2 = c_oAscWrapStyle2;
VE.Inline = 0;
VE.Square = 1;
VE.Tight = 2;
VE.Through = 3;
VE.TopAndBottom = 4;
VE.Behind = 5;
VE.InFront = 6;
VE = window.Asc.c_oAscContextMenuTypes = window.Asc.jOa = LE;
VE.Common = LE.Ona;
VE.ChangeHdrFtr = LE.w2c;
VE = window.Asc.c_oAscCollaborativeMarksShowType = c_oAscCollaborativeMarksShowType;
VE.None = c_oAscCollaborativeMarksShowType.kf;
VE.All = c_oAscCollaborativeMarksShowType.$l;
VE.LastChanges = c_oAscCollaborativeMarksShowType.vad;
VE = window.Asc.c_oAscChangeLevel = {
    hYd: 0,
    gYd: 1,
    n0d: 2,
    O8g: 3
};
VE.BringToFront = 0;
VE.BringForward = 1;
VE.SendToBack = 2;
VE.BringBackward = 3;
VE = window.Asc.c_oAscVertAlignJc = c_oAscVertAlignJc;
VE.Top = c_oAscVertAlignJc.Oa;
VE.Center = c_oAscVertAlignJc.Ok;
VE.Bottom = c_oAscVertAlignJc.Ta;
VE = window.Asc.c_oAscTableLayout = c_oAscTableLayout;
VE.AutoFit = c_oAscTableLayout.ATc;
VE.Fixed = c_oAscTableLayout.S6c;
VE = window.Asc.c_oAscAlignShapeType = ME;
VE.ALIGN_LEFT = ME.Scc;
VE.ALIGN_RIGHT = ME.Tcc;
VE.ALIGN_TOP = ME.sTc;
VE.ALIGN_BOTTOM = ME.qTc;
VE.ALIGN_CENTER = ME.Rcc;
VE.ALIGN_MIDDLE = ME.rTc;
VE = window.Asc.c_oAscFootnotePos = OE;
VE.BeneathText = OE.YGg;
VE.DocEnd = OE.mIg;
VE.PageBottom = OE.rKg;
VE.SectEnd = OE.XKg;
VE = window.Asc.c_oAscFootnoteRestart = QE;
VE.Continuous = QE.O_;
VE.EachSect = QE.AIg;
VE.EachPage = QE.zIg;
VE = window.Asc.c_oAscSdtLevelType = window.Asc.c_oAscSdtLevelType = c_oAscSdtLevelType;
VE.Block = c_oAscSdtLevelType.fda;
VE.Inline = c_oAscSdtLevelType.Yq;
VE.Row = c_oAscSdtLevelType.Aa;
VE.Cell = c_oAscSdtLevelType.Hb;
VE = window.Asc.c_oAscTOCStylesType = window.Asc.UU = RE;
VE.Current = RE.hM;
VE.Simple = RE.zPc;
VE.Standard = RE.BPc;
VE.Modern = RE.ZOc;
VE.Classic = RE.iOc;
VE.Web = RE.IPc;
VE = window.Asc.c_oAscStyleType = window.Asc.F3f = UE;
VE.Paragraph = UE.Ua;
VE.Numbering = UE.Ye;
VE.Table = UE.Table;
VE.Character = UE.bw;
VE = window.Asc.c_oAscHyperlinkAnchor = window.Asc.c_oAscHyperlinkAnchor = c_oAscHyperlinkAnchor;
VE.Heading = c_oAscHyperlinkAnchor.ana;
VE.Bookmark = c_oAscHyperlinkAnchor.ekb;
window.AscCommon = window.AscCommon || {};
window.AscCommon.hta = NE;
window.AscCommon.BHa = NE.XHa;
VE = window.Asc.c_oAscSdtCheckBoxDefaults = window.Asc.Hac = {
    f0: 9746,
    q0: 9744,
    qP: "MS Gothic",
    BP: "MS Gothic"
};
VE.CheckedSymbol = VE.f0;
VE.UncheckedSymbol = VE.q0;
VE.CheckedFont = VE.qP;
VE.UncheckedFont = VE.BP;
"use strict";
(function(f, e) {
    function Ia() {
        this.lX = this.VK = null
    }
    function $a() {
        this.haa = 1;
        this.xU = [];
        this.gAa = [];
        this.eBb = [];
        this.Bhb = [];
        this.j8a = [];
        this.dBb = [];
        this.n2b = this.o6 = 0;
        this.fAa = [];
        this.gQa = [];
        this.fBb = [];
        this.TFa = [];
        this.zhb = {};
        this.bBb = {};
        this.uIa = {};
        this.S8b = {};
        this.gB = !1;
        this.Wa = null;
        this.EQ = new Va;
        this.rta = new Va;
        this.zob = {};
        this.h2b = {};
        this.LDd = 0;
        this.Fra = [];
        this.m2a = [];
        this.w2b = []
    }
    function Va() {
        this.EQ = [];
        this.Ahb = [];
        this.cBb = []
    }
    Ia.prototype.$Hb = function(e) {
        this.VK = e
    }
    ;
    Ia.prototype.xT = function(e) {
        this.lX = e
    }
    ;
    Ia.prototype.wPc = function(e, f) {
        e.rb && (this.VK = this.bwf(f))
    }
    ;
    Ia.prototype.Gbe = function() {
        var e = AscCommon.Kd
          , f = this.Luf(this.VK)
          , Ia = f.cc();
        if (Ia = AscCommon.Fg.cg(Ia)) {
            var Va = f.yb
              , $a = f.jb();
            ($a = AscDFH.Ca[$a]) ? (Ia = new $a(Ia),
            Ia.ge(f),
            !0 === e.aKb(Ia) && Ia.nh(this.lX)) : (e.aKb(this.VK),
            f.Td(Va))
        }
    }
    ;
    Ia.prototype.Luf = function(e) {
        return this.jUc(e, 0, e.length)
    }
    ;
    Ia.prototype.jUc = function(Ia, y, Va) {
        var ib = 0;
        y = -1 + y;
        for (var $a = ""; ; ) {
            y++;
            var Ta = Ia.charCodeAt(y);
            if (59 == Ta) {
                y++;
                break
            }
            $a += String.fromCharCode(Ta)
        }
        $a = parseInt($a);
        Ta = AscFonts.gSa.oP($a);
        $a = new AscCommon.Paa(Ta.data,$a);
        $a.Ew = Ta.Ew;
        Ta = $a.data;
        if (f.yJa)
            for (; y < Va; ) {
                var ob = 0, Xa, kc = 0;
                for (Xa = 0; 4 > Xa && !(y >= Va); Xa++) {
                    var Ab = AscFonts.W6a(Ia.charCodeAt(y++));
                    -1 == Ab ? Xa-- : (ob <<= 6,
                    ob |= Ab,
                    kc += 6)
                }
                ob <<= 24 - kc;
                for (Xa = 0; Xa < kc / 8; Xa++)
                    Ta[ib++] = (ob & 16711680) >>> 16,
                    ob <<= 8
            }
        else
            for (var Pb = AscFonts.I7a; y < Va; ) {
                for (Xa = kc = ob = 0; 4 > Xa && !(y >= Va); Xa++)
                    Ab = Pb[Ia.charCodeAt(y++)],
                    Ab == e ? Xa-- : (ob <<= 6,
                    ob |= Ab,
                    kc += 6);
                ob <<= 24 - kc;
                for (Xa = 0; Xa < kc / 8; Xa++)
                    Ta[ib++] = (ob & 16711680) >>> 16,
                    ob <<= 8
            }
        return $a
    }
    ;
    Ia.prototype.bwf = function(e) {
        var f = e.c7a;
        return f + ";" + AscCommon.History.eda.dNb(e.Qa, f)
    }
    ;
    $a.prototype.yg = function() {
        this.haa = 1;
        this.xU = [];
        this.gAa = [];
        this.eBb = [];
        this.Bhb = [];
        this.j8a = [];
        this.dBb = [];
        this.fAa = [];
        this.gQa = [];
        this.fBb = [];
        this.TFa = []
    }
    ;
    $a.prototype.aIb = function(e) {
        this.gB = e;
        !1 === e && (this.JPd(),
        this.d0d())
    }
    ;
    $a.prototype.N$ = function() {
        return 1 === this.haa
    }
    ;
    $a.prototype.zxa = function() {
        return !this.N$()
    }
    ;
    $a.prototype.a7b = function() {
        this.haa = -1
    }
    ;
    $a.prototype.Bje = function() {
        0 >= this.haa && (this.haa = 0)
    }
    ;
    $a.prototype.rNd = function(e) {
        this.xU.push(e)
    }
    ;
    $a.prototype.xbe = function(e) {
        this.gAa.push(e)
    }
    ;
    $a.prototype.F4a = function(e) {
        this.eBb.push(e);
        editor.D7a()
    }
    ;
    $a.prototype.HHb = function() {
        return 0 < this.xU.length
    }
    ;
    $a.prototype.dHb = function() {
        if (!0 === 0 < this.xU.length) {
            AscFonts.WL = !0;
            editor.Fa.Wa.$Pd();
            editor.Fa.Wa.wOc();
            editor.$G(Asc.vE.Gs, Asc.OH.ZNc);
            var e = this.QGd();
            this.qge();
            this.k0c();
            this.z_d();
            this.PGd(e);
            this.K_d();
            AscFonts.WL = !1
        }
    }
    ;
    $a.prototype.k0c = function() {
        AscCommon.eg.DDa(!0);
        0 < this.xU.length && this.XFd();
        for (var e = this.xU.length, y = 0; y < e && (!0 !== f.NATIVE_EDITOR_ENJINE || !f["native"].CheckNextChange || f["native"].CheckNextChange()); y++)
            this.xU[y].Gbe();
        this.WFd();
        this.$Nc();
        this.cqb();
        this.bPc();
        AscCommon.eg.DDa(!1)
    }
    ;
    $a.prototype.Xvc = function() {
        return this.eBb.length
    }
    ;
    $a.prototype.Klc = function() {}
    ;
    $a.prototype.gPc = function() {}
    ;
    $a.prototype.OYd = function() {}
    ;
    $a.prototype.m0d = function(e) {
        var f = {}, Ia = editor || Asc.editor, Va;
        if (Ia) {
            f.c = "pathurls";
            f.data = [];
            for (Va = 0; Va < e.length; ++Va)
                f.data.push(e[Va]);
            var ib = [].concat(AscCommon.Kd.TFa);
            this.OYd(ib);
            AscCommon.Kd.TFa.length = 0;
            !1 === Ia.sSa && (Ia.sSa = !0);
            Ia.qna = function(f) {
                var y;
                if ("ok" === f.status) {
                    f = f.data;
                    var Ta = {};
                    for (y = 0; y < f.length; ++y)
                        Ta[e[y]] = f[y];
                    AscCommon.tH.Wwa(Ta)
                }
                AscCommon.Kd.nPc(ib)
            }
            ;
            AscCommon.B4b(Ia, null, f)
        }
    }
    ;
    $a.prototype.nPc = function(e) {
        (editor || Asc.editor).I9d(e)
    }
    ;
    $a.prototype.TYd = function() {
        var e = editor || Asc.editor, f = [], Ia, Va = {}, $a = this.TFa, Ta = {};
        for (Ia = 0; Ia < $a.length; ++Ia) {
            var ob = $a[Ia];
            Ta[ob] || (Ta[ob] = 1,
            0 === ob.indexOf("theme") && e.JH ? Va[ob] = e.JH.Pkb + ob : 0 !== ob.indexOf("http:") && 0 !== ob.indexOf("data:") && 0 !== ob.indexOf("https:") && 0 !== ob.indexOf("file:") && 0 !== ob.indexOf("ftp:") && (ob = AscCommon.tH.Yla + ob,
            AscCommon.tH.kbc(ob) || f.push(ob)))
        }
        AscCommon.tH.Wwa(Va);
        return f
    }
    ;
    $a.prototype.K_d = function() {
        this.$sa(!0);
        this.oid(!0);
        var e = this.TYd();
        0 < e.length ? this.m0d(e) : (this.nPc([].concat(this.TFa)),
        this.TFa.length = 0)
    }
    ;
    $a.prototype.iPd = function() {}
    ;
    $a.prototype.NNd = function() {
        this.j8a.length = 0
    }
    ;
    $a.prototype.Fta = function(e, f) {
        this.j8a.push({
            Na: e,
            POd: f
        })
    }
    ;
    $a.prototype.$Nc = function() {
        for (var e = this.j8a.length, f = 0; f < e; f++) {
            var Ia = this.j8a[f];
            Ia.Na.zpa(Ia.POd)
        }
        this.NNd()
    }
    ;
    $a.prototype.cqb = function() {}
    ;
    $a.prototype.Tna = function() {
        return 0 === this.o6 ? !1 : !0
    }
    ;
    $a.prototype.$sa = function(e) {
        e ? this.o6++ : this.o6 = Math.max(0, this.o6 - 1)
    }
    ;
    $a.prototype.oid = function(e) {
        e ? this.n2b++ : this.n2b = Math.max(0, this.n2b - 1)
    }
    ;
    $a.prototype.Usa = function() {
        return 0 === this.n2b ? !1 : !0
    }
    ;
    $a.prototype.P6b = function() {
        this.fAa.length = 0;
        this.gQa.length = 0
    }
    ;
    $a.prototype.NW = function(e) {
        this.fAa.push(e);
        this.gQa.push(e)
    }
    ;
    $a.prototype.VHb = function() {}
    ;
    $a.prototype.RUc = function() {}
    ;
    $a.prototype.Hte = function() {
        this.gQa.length = 0
    }
    ;
    $a.prototype.Dte = function() {
        for (var e = !1, f = 0, Ia = this.gQa.length; f < Ia; ++f)
            if (!0 === this.gQa[f]) {
                e = !0;
                break
            }
        e && (Ia = this.gQa.length,
        this.fAa.splice(this.fAa.length - Ia, Ia));
        this.gQa.length = 0;
        return e
    }
    ;
    $a.prototype.h0d = function() {
        this.Bhb = {}
    }
    ;
    $a.prototype.$Xd = function(e, f) {
        this.Bhb[e] = f
    }
    ;
    $a.prototype.aDe = function(e) {
        delete this.Bhb[e]
    }
    ;
    $a.prototype.z_d = function() {
        for (var e in this.Bhb) {
            var f = AscCommon.Fg.cg(e);
            if (null != f) {
                var Ia = f.Jf;
                Ia.mH(AscCommon.xob, !1);
                f.Cb && f.Cb() === AscDFH.mS && editor.Fa.Wa.sb.h7b && editor.Fa.Wa.sb.h7b(f.tk);
                Ia.Z6b(this.Bhb[e])
            }
        }
        this.h0d()
    }
    ;
    $a.prototype.SYd = function() {
        this.fBb.length = 0
    }
    ;
    $a.prototype.aHb = function(e) {
        this.fBb.push(e);
        e.nke = !0
    }
    ;
    $a.prototype.pge = function() {
        this.dBb.length = 0
    }
    ;
    $a.prototype.LKb = function(e, f) {
        this.dBb.push({
            Na: e,
            ob: f
        })
    }
    ;
    $a.prototype.bPc = function() {
        for (var e = this.fBb.length, f = 0; f < e; f++)
            this.fBb[f].nke = !1;
        e = this.dBb.length;
        for (f = 0; f < e; f++) {
            var Ia = this.dBb[f];
            Ia.Na.ged(Ia.ob)
        }
        this.pge();
        this.SYd()
    }
    ;
    $a.prototype.qge = function() {
        this.TFa.length = 0
    }
    ;
    $a.prototype.vRa = function(e) {
        this.TFa.push(e)
    }
    ;
    $a.prototype.YNc = function(e) {
        var f = e.rb();
        this.zhb[f] = e
    }
    ;
    $a.prototype.d3c = function() {
        for (var e in this.zhb)
            this.zhb[e].Laa();
        this.zhb = {}
    }
    ;
    $a.prototype.IPd = function() {
        for (var e in this.zhb)
            this.zhb[e].jba();
        this.d3c()
    }
    ;
    $a.prototype.obe = function() {}
    ;
    $a.prototype.GPd = function() {}
    ;
    $a.prototype.zDe = function() {}
    ;
    $a.prototype.GPd = function() {}
    ;
    $a.prototype.bdc = function(e) {
        var f = e.rb();
        this.bBb[f] = e
    }
    ;
    $a.prototype.AHa = function(e) {
        for (var f in this.bBb)
            this.bBb[f].AHa();
        this.bBb = {};
        !0 === e && (editor.Fa.Wa.sb.TD(),
        editor.Fa.Wa.sb.QG())
    }
    ;
    $a.prototype.LDf = function(e, f, Ia) {
        this.uIa[e] = f;
        this.S8b[e] = Ia
    }
    ;
    $a.prototype.b0d = function() {
        if (this.Wa) {
            for (var e in this.uIa)
                this.Wa.MVc(this.uIa[e], e, !1, this.S8b[e]),
                this.wTc && this.wTc(e);
            this.uIa = {};
            this.S8b = {}
        }
    }
    ;
    $a.prototype.lkb = function() {
        this.EQ.lkb()
    }
    ;
    $a.prototype.M0 = function(e) {
        this.EQ.M0(e)
    }
    ;
    $a.prototype.tNd = function(e, f, Ia) {
        this.rta.iPc(this.uIa[e]);
        this.zob[e] = f;
        this.rta.M0(f);
        this.h2b[e] = Ia
    }
    ;
    $a.prototype.l5a = function(e) {
        this.rta.iPc(this.uIa[e]);
        delete this.zob[e]
    }
    ;
    $a.prototype.JPd = function() {}
    ;
    $a.prototype.d0d = function() {}
    ;
    $a.prototype.X$ = function(e, f) {
        this.EQ.X$(e, f);
        this.rta.X$(e, f)
    }
    ;
    $a.prototype.b7 = function(e, f, Ia) {
        this.EQ.b7(e, f, Ia);
        this.rta.b7(e, f, Ia)
    }
    ;
    $a.prototype.tXa = function(e, f) {
        this.EQ.tXa(e, f);
        this.rta.tXa(e, f)
    }
    ;
    $a.prototype.sXa = function(e) {
        this.EQ.sXa(e);
        this.rta.sXa(e)
    }
    ;
    $a.prototype.c4 = function(e) {
        this.EQ.c4(e)
    }
    ;
    $a.prototype.vub = function() {}
    ;
    $a.prototype.QGd = function() {
        var e = editor.Fa.Wa;
        !0 !== this.gB ? (e = e.$ea(),
        this.uIa = {}) : e = e.LHa();
        return e
    }
    ;
    $a.prototype.PGd = function(e) {
        var f = editor.Fa.Wa;
        !0 !== this.gB ? f.Jfa(e) : (f.oab(e),
        this.b0d())
    }
    ;
    $a.prototype.V0d = function(e) {
        this.lkb();
        e.Qa && this.M0(e.Qa);
        e.ta && this.M0(e.ta);
        e.sa && this.M0(e.sa);
        e.jO && e.jO.Qa && this.M0(e.jO.Qa);
        e.jO && e.jO.ta && this.M0(e.jO.ta);
        e.jO && e.jO.sa && this.M0(e.jO.sa);
        e.iO && e.iO.Qa && this.M0(e.iO.Qa);
        e.iO && e.iO.ta && this.M0(e.iO.ta);
        e.iO && e.iO.sa && this.M0(e.iO.sa)
    }
    ;
    $a.prototype.S0d = function(e) {
        e.Qa && this.c4(e.Qa);
        e.ta && this.c4(e.ta);
        e.sa && this.c4(e.sa);
        e.jO && e.jO.Qa && this.c4(e.jO.Qa);
        e.jO && e.jO.ta && this.c4(e.jO.ta);
        e.jO && e.jO.sa && this.c4(e.jO.sa);
        e.iO && e.iO.Qa && this.c4(e.iO.Qa);
        e.iO && e.iO.ta && this.c4(e.iO.ta);
        e.iO && e.iO.sa && this.c4(e.iO.sa)
    }
    ;
    $a.prototype.WFd = function() {
        this.xU = []
    }
    ;
    $a.prototype.XFd = function() {}
    ;
    $a.prototype.aKb = function() {
        return !0
    }
    ;
    $a.prototype.WFd = function() {
        this.xU = [];
        this.w2b = []
    }
    ;
    $a.prototype.XFd = function() {
        var e = null === AscCommon.History.kM ? 0 : AscCommon.History.kM + 1, f;
        for (f = 0 >= this.haa ? AscCommon.History.nm.length - 1 : AscCommon.History.za; e <= f; e++)
            for (var Ia = AscCommon.History.nm[e], Va = 0; Va < Ia.wd.length; Va++)
                this.w2b.push(Ia.wd[Va].ob)
    }
    ;
    $a.prototype.aKb = function(e, f) {
        for (var y = 0, Ia = this.w2b.length; y < Ia; ++y)
            if (e && e.Dc && !1 === e.Dc(this.w2b[y]))
                return !1;
        !1 !== f && this.Fra.push(e);
        return !0
    }
    ;
    $a.prototype.GQf = function(e, f) {
        null !== f ? this.Fra.length = this.LDd + f : this.LDd = this.Fra.length;
        0 < e.length && (this.m2a.push({
            we: this.Fra.length,
            vl: e.length
        }),
        this.Fra = this.Fra.concat(e))
    }
    ;
    $a.prototype.Ul = function() {
        if (!0 !== this.Tna()) {
            if (0 >= this.m2a.length)
                return !1;
            for (var e = [], f = this.m2a[this.m2a.length - 1], Ia = f.we, Va = f.vl, $a = Va - 1; 0 <= $a; --$a) {
                var Ta = this.Fra[Ia + $a];
                if (Ta) {
                    var ob;
                    Ta.WWa() ? (f = Ta.Sa(),
                    this.Ptf(f, Ia + Va) && e.push(f),
                    Ta.Xhd(!0)) : (f = Ta,
                    this.Qtf(f) && e.push(f))
                }
            }
            --this.m2a.length;
            Ia = [];
            $a = 0;
            for (Va = e.length; $a < Va; ++$a) {
                var Xa = e[$a].rn();
                Xa && (Ia.push(Xa),
                Xa.Xhd(!0))
            }
            e = this.Wa;
            e.sb.o$a(null, !0);
            e.mFb();
            f = this.QGd();
            var kc = {};
            $a = 0;
            for (Va = Ia.length; $a < Va; ++$a)
                (ob = Ia[$a].Na) && ob.parent && ob.parent instanceof AscCommonWord.V3 && (kc[ob.parent.rb()] = ob.parent),
                Ia[$a].nh(),
                this.Fra.push(Ia[$a]);
            var Cc = {};
            Xa = {};
            var Pb = {}
              , ic = {}
              , Bb = {}
              , Ma = {}
              , cb = {}
              , jb = !1
              , Pa = !1
              , Ce = {};
            $a = 0;
            for (Va = Ia.length; $a < Va; ++$a)
                if (Ta = Ia[$a],
                ob = Ta.Na,
                ob instanceof AscCommonWord.ymb || ob instanceof AscCommonWord.Hdc)
                    Cc[ob.rb()] = ob;
                else if (ob instanceof AscCommonWord.Ua)
                    Xa[ob.rb()] = ob;
                else if (ob.uqe && !0 === Ta.WWa() && ob.bl())
                    Xa[ob.bl().rb()] = ob.bl(),
                    ob instanceof AscCommonWord.dwa && (Pb[ob.rb()] = ob);
                else if (ob instanceof AscCommonWord.V3)
                    kc[ob.rb()] = ob;
                else if (ob instanceof AscCommonWord.dwa)
                    Pb[ob.rb()] = ob;
                else if (ob instanceof AscCommonWord.Z9b)
                    ic[ob.rb()] = ob;
                else if (ob instanceof AscFormat.fv || ob instanceof AscFormat.t8 || ob instanceof AscFormat.O0 || ob instanceof AscFormat.s8 || ob instanceof AscFormat.E3)
                    Bb[ob.rb()] = ob;
                else if ("undefined" !== typeof AscCommonSlide)
                    if (AscCommonSlide.Slide && ob instanceof AscCommonSlide.Slide)
                        Ma[ob.rb()] = ob;
                    else if (AscCommonSlide.SlideLayout && ob instanceof AscCommonSlide.SlideLayout)
                        cb[ob.rb()] = ob,
                        jb = !0;
                    else if (AscCommonSlide.CPresentation && ob instanceof AscCommonSlide.CPresentation && (Ta.ea === AscDFH.xbc || Ta.ea === AscDFH.d_b)) {
                        Pa = !0;
                        for (var cf = 0; cf < Ta.wd.length; ++cf)
                            Ce[Ta.wd[cf].rb()] = Ta.wd[cf]
                    }
            ob = AscCommon.History;
            ob.HEf();
            if (Pa)
                for (cf = e.qe.length - 1; -1 < cf; --cf)
                    Ce[e.qe[cf].rb()] && !e.qe[cf].Hr && e.zZc(cf);
            for (var ef in Ma)
                Ma.hasOwnProperty(ef) && Ma[ef].D5f();
            if (jb)
                for (cf = e.qe.length - 1; -1 < cf; --cf)
                    if ($a = e.qe[cf].Hr,
                    !$a || cb[$a.rb()])
                        e.qe[cf].uUf() || e.zZc(cf);
            for (ef in Bb)
                $a = Bb[ef],
                $a.nVb() ? $a.s4b && $a.s4b() : ($a.Hn(!0),
                $a.group ? $a.group.Sob($a.rb()) : AscFormat.Slide && $a.parent instanceof AscFormat.Slide ? $a.parent.AUa($a.rb()) : AscCommonWord.V3 && $a.parent instanceof AscCommonWord.V3 && (kc[$a.parent.rb()] = $a.parent));
            for (ef in kc)
                kc.hasOwnProperty(ef) && ($a = kc[ef],
                $a.oaa() || (Va = $a.zK(),
                $a.Hx(),
                $a.YHb(!1),
                Va && (Xa[Va.rb()] = Va)));
            for (ef in Pb)
                if (Pb.hasOwnProperty(ef))
                    for (Va = Pb[ef],
                    $a = Va.aa.length - 1; -1 < $a; --$a)
                        Va.aa[$a]instanceof AscCommonWord.V3 && !Va.aa[$a].oaa() && (Va.Cl($a, 1, !1),
                        Va.Ua && (Xa[Va.Ua.rb()] = Va.Ua));
            for (ef in ic) {
                $a = ic[ef];
                for (Va = $a.aa.length - 1; 0 <= Va; --Va)
                    0 >= $a.nLa(Va).aa.length && $a.dha(Va);
                if ($a.Ea instanceof AscCommonWord.ymb || $a.Ea instanceof AscCommonWord.Hdc)
                    Cc[$a.Ea.rb()] = $a.Ea
            }
            for (ef in Cc) {
                Va = Cc[ef];
                $a = Va.aa.length;
                for (--$a; 0 <= $a; --$a)
                    Ta = Va.aa[$a],
                    (AscCommonWord.iEb === Ta.Mc() || AscCommonWord.XCf === Ta.Mc()) && 0 >= Ta.aa.length && Va.Cl($a, 1);
                $a = Va.aa.length;
                if (0 >= $a || AscCommonWord.iEb !== Va.aa[$a - 1].Mc())
                    Ta = new AscCommonWord.Ua(e.sb,Va,0,0,0,0,0,!1),
                    Va.mf($a, Ta)
            }
            for (ef in Xa)
                $a = Xa[ef],
                $a.Qfe(),
                $a.xp(null, null, !0);
            ic = AscCommon.History.eda;
            ef = [];
            $a = 0;
            for (Va = Ia.length; $a < Va; ++$a)
                Xa = Ia[$a],
                Cc = Xa.Na,
                Pb = ic.ua,
                ic.Rb(Cc.rb()),
                ic.cb(Xa.ea),
                Xa.se(ic),
                Xa = ic.ua - Pb,
                Ta = new AscCommon.xmb,
                Ta.wPc(Cc, {
                    Qa: Pb,
                    c7a: Xa
                }),
                ef.push(Ta.VK);
            ic = ob.nm[ob.nm.length - 1];
            $a = 0;
            for (Va = ic.wd.length; $a < Va; ++$a)
                Xa = ic.wd[$a].ob,
                Cc = Xa.Na,
                Ta = new AscCommon.xmb,
                Ta.wPc(Cc, {
                    Qa: ic.wd[$a].WUa.Qa,
                    c7a: ic.wd[$a].WUa.c7a
                }),
                ef.push(Ta.VK),
                Ia.push(ic.wd[$a].ob);
            ob.NAa();
            this.d3c();
            editor.ll.C8a(ef, null, null, !1, this.zxa());
            this.PGd(f);
            e.nFb();
            this.wWd(AscCommon.History.Qmb(null, Ia));
            e.$i();
            e.Ie();
            e.An()
        }
    }
    ;
    $a.prototype.jkb = function() {
        return 0 >= this.m2a.length ? !1 : !0
    }
    ;
    $a.prototype.Ptf = function(e, f) {
        for (var y = e.mOc(), Ia = [], Va = y.length - 1; 0 <= Va; --Va) {
            for (var Ta = y[Va], ob = Ta, Xa = f, $a = this.Fra.length; Xa < $a; ++Xa) {
                var ib = this.Fra[Xa];
                if (ib) {
                    if (e.CS(ib) && !0 !== ib.olc) {
                        for (var Pb = ib.mOc(), ic = 0, Bb = Pb.length; ic < Bb; ++ic)
                            if (!1 === this.Otf(Ta, Pb[ic])) {
                                Pb.splice(ic, 1);
                                ob = null;
                                break
                            }
                        ib.kOc(Pb)
                    }
                    if (!ob)
                        break
                }
            }
            null !== ob && Ia.push(ob)
        }
        if (0 < Ia.length)
            e.kOc(Ia);
        else
            return !1;
        return !0
    }
    ;
    $a.prototype.Otf = function(e, f) {
        if (e.ia)
            if (f.ia)
                e.Qa >= f.Qa ? e.Qa++ : f.Qa--;
            else if (e.Qa > f.Qa)
                e.Qa--;
            else {
                if (e.Qa === f.Qa)
                    return !1;
                f.Qa--
            }
        else
            f.ia ? e.Qa >= f.Qa ? e.Qa++ : f.Qa++ : e.Qa > f.Qa ? e.Qa-- : f.Qa++;
        return !0
    }
    ;
    $a.prototype.Qtf = function(e) {
        return e.oaa && !e.oaa() ? !1 : !0
    }
    ;
    $a.prototype.wWd = function() {}
    ;
    Va.prototype.lkb = function() {
        this.EQ = [];
        this.Ahb = [];
        this.cBb = []
    }
    ;
    Va.prototype.M0 = function(e) {
        this.EQ.push(e)
    }
    ;
    Va.prototype.X$ = function(f, y) {
        for (var Ia = 0, Va = this.EQ.length; Ia < Va; ++Ia)
            for (var $a = this.EQ[Ia], Ta = 0, ob = $a.length; Ta < ob; ++Ta) {
                var Xa = $a[Ta];
                if (f === Xa.Na && e !== Xa.we && (Xa.we > y || Xa.we === y && !(f instanceof AscCommonWord.dwa))) {
                    Xa.we++;
                    break
                }
            }
    }
    ;
    Va.prototype.b7 = function(f, y, Ia) {
        for (var Va = 0, $a = this.EQ.length; Va < $a; ++Va)
            for (var Ta = this.EQ[Va], ob = 0, Xa = Ta.length; ob < Xa; ++ob) {
                var ib = Ta[ob];
                if (f === ib.Na && e !== ib.we) {
                    ib.we > y + Ia ? ib.we -= Ia : ib.we >= y && (ib.we = y,
                    ib.wZ = !0);
                    break
                }
            }
    }
    ;
    Va.prototype.tXa = function(e, f) {
        this.Ahb = [];
        for (var y = 0, Ia = this.EQ.length; y < Ia; ++y)
            for (var Va = this.EQ[y], Ta = 0, ob = Va.length; Ta < ob; ++Ta) {
                var Xa = Va[Ta];
                e === Xa.Na && Xa.we && Xa.we >= f && this.Ahb.push({
                    Vie: Va,
                    ote: Xa.we - f
                })
            }
    }
    ;
    Va.prototype.sXa = function(e) {
        if (e)
            for (var f = 0, Ia = this.Ahb.length; f < Ia; ++f) {
                var Va = [];
                Va.push({
                    Na: e,
                    we: this.Ahb[f].ote
                });
                this.EQ.push(Va);
                this.cBb.push({
                    ta: this.Ahb[f].Vie,
                    sa: Va
                })
            }
    }
    ;
    Va.prototype.c4 = function(e) {
        for (var f = e, Ia = 0, Va = this.cBb.length; Ia < Va; ++Ia)
            this.cBb[Ia].ta === f && (f = this.cBb[Ia].sa);
        f !== e && 1 === f.length && f[0].Na instanceof AscCommonWord.dwa ? (Ia = f[0].Na,
        Va = Ia.bl(),
        AscCommonWord.l2c(Va, Ia) && (e.length = 0,
        Ia.yC(e),
        e.push({
            Na: Ia,
            we: f[0].we
        }))) : 0 < e.length && e[e.length - 1].Na instanceof AscCommonWord.dwa && (Ia = e[e.length - 1].Na,
        f = e[e.length - 1].we,
        Va = Ia.bl(),
        AscCommonWord.l2c(Va, Ia) && (e.length = 0,
        Ia.yC(e),
        e.push({
            Na: Ia,
            we: f
        })))
    }
    ;
    Va.prototype.iPc = function(e) {
        for (var f = 0, Ia = this.EQ.length; f < Ia; ++f)
            if (this.EQ[f] === e) {
                this.EQ.splice(f, 1);
                break
            }
    }
    ;
    f.AscCommon = f.AscCommon || {};
    f.AscCommon.YEf = 1500;
    f.AscCommon.xmb = Ia;
    f.AscCommon.Edc = $a;
    f.AscCommon.rYd = Va
}
)(window);
"use strict";
function WE() {
    AscCommon.Edc.call(this);
    this.Wa = null;
    this.EQ = new AscCommon.rYd;
    this.rta = new AscCommon.rYd;
    this.zob = {};
    this.wSa = {};
    this.zVd = {};
    this.abg = {}
}
WE.prototype = Object.create(AscCommon.Edc.prototype);
tb = WE.prototype;
tb.constructor = WE;
tb.yg = function() {
    AscCommon.Edc.prototype.yg.apply(this, arguments);
    this.JPd()
}
;
tb.Klc = function(f, e, Ia, $a) {
    this.IPd();
    var Va = null === AscCommon.History.kM ? 0 : AscCommon.History.kM + 1;
    if (0 >= this.haa) {
        AscCommon.History.eqb();
        var ib = AscCommon.History.nm.length - 1
    } else
        ib = AscCommon.History.za;
    for (var y = 0, Ab = Math.min(Va, ib + 1), Sb = 0; Sb < Ab; Sb++) {
        var kb = AscCommon.History.nm[Sb];
        y += kb.wd.length
    }
    var Ta = null === AscCommon.History.kM ? null : y;
    Ab = [];
    var ob = [];
    for (Sb = Va; Sb <= ib; Sb++) {
        kb = AscCommon.History.nm[Sb];
        AscCommon.History.t_f(Sb, Va, ib, y, Ta);
        for (var Xa = 0; Xa < kb.wd.length; Xa++) {
            var kc = kb.wd[Xa]
              , Cc = new AscCommon.xmb;
            Cc.wPc(kc.Na, kc.WUa);
            ob.push(kc.ob);
            Ab.push(Cc.VK)
        }
    }
    Va = 0;
    if (ib = this.zxa()) {
        Va = this.gAa.length;
        this.gPc();
        Ta = this.eBb.length;
        for (Xa = 0; Xa < Ta; Xa++)
            Sb = this.eBb[Xa],
            Sb.Jf.mH(AscCommon.yna, !1),
            editor.ll.mLc(Sb.rb());
        this.gAa.length = 0;
        this.eBb.length = 0
    }
    Ta = null === AscCommon.History.kM ? null : y;
    0 < Ab.length || null !== Ta ? (this.GQf(ob, Ta),
    editor.ll.C8a(Ab, Ta, e, editor.eVb, ib),
    AscCommon.History.A9a = !0) : editor.ll.Wjb(!!$a, editor.eVb, null, ib);
    editor.eVb = !1;
    -1 === this.haa ? (AscCommon.History.yg(),
    AscCommon.History.kM = null) : 0 === this.haa ? (AscCommon.History.yg(),
    AscCommon.History.kM = null,
    this.haa = 1) : AscCommon.History.rDe(f);
    !1 !== Ia && editor.Fa.Wa.Ie();
    editor.Fa.Wa.sva();
    if (0 !== Va || 1 !== this.haa)
        editor.Fa.Wa.sb.TD(),
        editor.Fa.Wa.sb.QG();
    editor.Fa.Wa.EUf()
}
;
tb.gPc = function() {
    for (var f = this.gAa.length, e = 0; e < f; e++) {
        var Ia = this.gAa[e].Jf.Hi();
        AscCommon.sIc != Ia && AscCommon.xob != Ia ? (this.gAa[e].Jf.mH(AscCommon.yna, !1),
        this.gAa[e]instanceof AscCommonWord.$de ? editor.jhg() : this.gAa[e]instanceof AscCommonWord.ymb ? editor.hhg() : this.gAa[e]instanceof AscCommon.Psa ? editor.W$d(this.gAa[e].rb()) : this.gAa[e]instanceof AscCommonWord.ETf ? editor.ihg() : this.gAa[e]instanceof AscCommon.hkb && editor.Oe("asc_onLockCore", !1)) : AscCommon.sIc === Ia && this.gAa[e].Jf.mH(AscCommon.xob, !1)
    }
}
;
tb.iPd = function() {
    AscCommon.Kd.$sa(!1);
    AscCommon.Kd.oid(!1);
    editor.Fa.Wa.mtb(!0);
    editor.$x(Asc.vE.Gs, Asc.OH.ZNc)
}
;
tb.cqb = function() {
    editor.Fa.Wa.Vj.cqb()
}
;
tb.VHb = function(f) {
    for (var e = [], Ia = this.fAa.length, $a = 0; $a < Ia; $a++) {
        var Va = this.fAa[$a];
        if (!0 === Va)
            return !0;
        !1 !== Va && e.push(Va)
    }
    if (!0 === f && !0 === this.gB)
        return !1;
    if (0 < e.length)
        if (editor.ll.iUb(e, this.RUc),
        -1 === this.haa)
            this.$sa(!0);
        else {
            Ia = this.fAa.length;
            for ($a = 0; $a < Ia; $a++)
                Va = this.fAa[$a],
                !0 !== Va && !1 !== Va && (f = AscCommon.Fg.cg(Va),
                null != f && (f.Jf.mH(AscCommon.l4, !1),
                this.F4a(f)));
            this.fAa.length = 0
        }
    return !1
}
;
tb.RUc = function(f) {
    var e = AscCommon.Kd
      , Ia = editor;
    if (!0 === e.Tna() && 0 != Ia.bSd(e.RUc, f)) {
        e.$sa(!1);
        if (f.lock) {
            f = e.fAa.length;
            for (var $a = 0; $a < f; $a++) {
                var Va = e.fAa[$a];
                !0 !== Va && !1 !== Va && (Va = AscCommon.Fg.cg(Va),
                null != Va && (Va.Jf.mH(AscCommon.l4),
                e.F4a(Va)))
            }
        } else
            f.error && (!0 === Ia.h6 && Ia.ACf(),
            Ia.Fa.Wa.Jza(),
            AscCommon.History.eqb());
        Ia.h6 = !1
    }
}
;
tb.JSf = function(f) {
    this.abg[f.Wi()] = f
}
;
tb.CYf = function(f) {
    delete this.abg[f.Wi()]
}
;
tb.wXf = function(f) {
    return this.abg[f.Wi()] === f ? !0 : !1
}
;
tb.a7b = function() {
    this.haa = -1
}
;
tb.Bje = function() {
    0 >= this.haa && (!this.Wa || this.Wa.History.AZ() || this.HHb() ? this.haa = 0 : this.haa = 1)
}
;
tb.lkb = function() {
    this.EQ.lkb()
}
;
tb.M0 = function(f) {
    this.EQ.M0(f)
}
;
tb.tNd = function(f, e, Ia) {
    this.rta.iPc(this.uIa[f]);
    this.zob[f] = e;
    this.rta.M0(e);
    this.h2b[f] = Ia
}
;
tb.l5a = function(f) {
    this.rta.iPc(this.uIa[f]);
    delete this.zob[f];
    this.Wa.sb.NLb(f);
    this.tGf(f);
    this.e0d(f)
}
;
tb.JPd = function() {
    for (var f in this.zob)
        this.l5a(f)
}
;
tb.d0d = function() {
    this.Wa.Uc.ll.C9b("")
}
;
tb.X$ = function(f, e) {
    this.EQ.X$(f, e);
    this.rta.X$(f, e)
}
;
tb.b7 = function(f, e, Ia) {
    this.EQ.b7(f, e, Ia);
    this.rta.b7(f, e, Ia)
}
;
tb.tXa = function(f, e) {
    this.EQ.tXa(f, e);
    this.rta.tXa(f, e)
}
;
tb.sXa = function(f) {
    this.EQ.sXa(f);
    this.rta.sXa(f)
}
;
tb.c4 = function(f) {
    this.EQ.c4(f)
}
;
tb.vub = function() {
    for (var f in this.zob) {
        var e = this.zob[f];
        !e || 0 >= e.length || (this.rta.c4(e),
        this.qQd(f, e[e.length - 1].Na, e[e.length - 1].we, !1))
    }
}
;
tb.qQd = function(f, e, Ia, $a) {
    var Va = this.Wa.sb;
    if (e instanceof AscCommonWord.dwa) {
        var ib = e.bl();
        ib ? (e = ib.oD(e)) ? (e.Ge(Ia, e.wW() + 1),
        (Ia = ib.rFf(e)) && .001 < Ia.Tc ? (Va.xge(f, this.h2b[f] ? this.h2b[f] : f, Ia.ka, Ia.la, Ia.Tc, Ia.Fe, ib.nr()),
        this.VSf(f, Ia.ka, Ia.la, Ia.Fe, Ia.Tc, ib, $a),
        !0 === this.zVd[f] && (this.eIe(f),
        this.e0d(f))) : (Va.NLb(f),
        this.tGf(f),
        this.e0d(f))) : Va.NLb(f) : Va.NLb(f)
    }
}
;
tb.cge = function(f, e, Ia) {
    if (this.Wa) {
        var $a = this.Wa.sb
          , Va = $a.Sna(7);
        $a = $a.Sna(3);
        for (var ib in this.wSa) {
            var y = this.wSa[ib];
            (!0 === y.Is && y.Ij === Ia && y.Oj - $a < f && f < y.Ag + $a && y.hp - $a < e && e < y.kh + $a || Math.abs(f - y.ka) < Va && y.la - $a < e && e < y.la + y.Jb + $a && y.Ij === Ia) && this.eIe(ib)
        }
    }
}
;
tb.eIe = function(f) {
    if (this.Wa) {
        var e = this.Wa.Uc
          , Ia = this.Wa.sb;
        if (this.wSa[f]) {
            var $a = this.wSa[f];
            $a.BYa && clearTimeout($a.BYa);
            $a.BYa = setTimeout(function() {
                $a.BYa = null;
                e.nXd(f)
            }, AscCommon.YEf);
            var Va = AscCommon.fGb(this.h2b[f] ? this.h2b[f] : f, null, !0);
            Ia = Ia.IUf(f);
            Va && Ia && this.KLe(f, Ia.ka, Ia.la, Va)
        }
    }
}
;
tb.wTc = function(f) {
    this.zVd[f] = !0
}
;
tb.e0d = function(f) {
    delete this.zVd[f]
}
;
tb.VSf = function(f, e, Ia, $a, Va, ib, y) {
    if (this.wSa[f]) {
        var Ab = this.wSa[f];
        Ab.BYa ? !0 === y && (y = this.Wa.Uc,
        clearTimeout(Ab.BYa),
        Ab.BYa = null,
        y.nXd(f)) : Ab.BYa = null;
        Ab.ka = e;
        Ab.la = Ia;
        Ab.Ij = $a;
        Ab.Jb = Va
    } else
        Ab = {
            ka: e,
            la: Ia,
            Jb: Va,
            Ij: $a,
            Is: !1,
            BYa: null
        },
        this.wSa[f] = Ab;
    ($a = ib.nr()) ? (Ab.Is = !0,
    f = $a.Tb(Ab.ka, Ab.la),
    e = $a.Sb(Ab.ka, Ab.la),
    Ia = $a.Tb(Ab.ka, Ab.la + Ab.Jb),
    $a = $a.Sb(Ab.ka, Ab.la + Ab.Jb),
    Ab.Oj = Math.min(f, Ia),
    Ab.hp = Math.min(e, $a),
    Ab.Ag = Math.max(f, Ia),
    Ab.kh = Math.max(e, $a)) : Ab.Is = !1
}
;
tb.tGf = function(f) {
    this.wSa[f] && (this.wSa[f].BYa && (this.Wa.Uc.nXd(f),
    clearTimeout(this.wSa[f].BYa)),
    delete this.wSa[f])
}
;
tb.KLe = function(f, e, Ia, $a) {
    if (this.Wa) {
        var Va = this.wSa[f];
        Va && Va.BYa && this.Wa.Uc.ahg(f, e, Ia, $a)
    }
}
;
tb.bPc = function() {
    AscCommon.Edc.prototype.bPc.apply(this, arguments);
    if (this.Wa && this.Wa.Uc) {
        var f = this.Wa.Uc;
        this.Wa.mC.UHb && f.ksg()
    }
}
;
tb.wWd = function(f) {
    this.Wa.N$b(f)
}
;
window.AscCommon = window.AscCommon || {};
window.AscCommon.FYd = WE;
window.AscCommon.Kd = new WE;
"use strict";
(function(f) {
    function e() {
        this.Ia = "_macrosGlobalId";
        this.Jf = new AscCommon.z7;
        this.ob = "";
        AscCommon.Fg.ia(this, this.Ia)
    }
    function Ia(e, f, Ia) {
        AscDFH.hE.call(this, e, f, Ia)
    }
    e.prototype.ztb = function(e) {
        AscCommon.History.ia(new Ia(this,this.ob,e));
        this.ob = e
    }
    ;
    e.prototype.fpa = function() {
        return this.ob
    }
    ;
    e.prototype.rb = function() {
        return this.Ia
    }
    ;
    e.prototype.Kfe = function() {
        this.Jf.En(this.Ia)
    }
    ;
    e.prototype.Vg = function(e) {
        e.cb(AscDFH.cHc);
        e.Rb("" + this.Ia);
        e.Rb(this.ob)
    }
    ;
    e.prototype.eh = function(e) {
        this.Ia = e.cc();
        this.ob = e.cc()
    }
    ;
    e.prototype.hf = function() {}
    ;
    e.prototype.Lzf = function() {
        try {
            var e = JSON.parse(this.ob);
            if (e.macrosArray)
                for (var f = 0; f < e.macrosArray.length; f++)
                    !0 === e.macrosArray[f].autostart && eval("(function(){ var Api = window.g_asc_plugins.api;\n" + e.macrosArray[f].value + "\n})();")
        } catch (ib) {}
    }
    ;
    AscDFH.Ca[AscDFH.kYb] = Ia;
    AscDFH.Ac[AscDFH.kYb] = [AscDFH.kYb];
    Ia.prototype = Object.create(AscDFH.hE.prototype);
    Ia.prototype.constructor = Ia;
    Ia.prototype.ea = AscDFH.kYb;
    Ia.prototype.Oc = function(e) {
        this.Na.ob = e
    }
    ;
    f.AscCommon = f.AscCommon || {};
    f.AscCommon.r1c = e
}
)(window);
"use strict";
(function(f, e) {
    function Ia(y, Ia) {
        this.Wy = Ia;
        this.KCd = this.i6 = !1;
        this.j3b = null;
        this.z9c = y["id-view"] || "";
        this.Xe = null;
        this.IP = !0 === y.mobile;
        this.K8b = !0 === y.embedded;
        this.Ex = !1;
        this.fKb = Asc.FIb.kf;
        this.QOb = this.tt = this.J4 = null;
        this.DocumentType = 0;
        this.To = null;
        this.yga = this.e_ = e;
        this.klb = "null";
        this.bwd = null;
        this.Zvd = e;
        this.Yqa = this.VIb = "null";
        this.$vd = Asc.Gnb.bld;
        this.xXc = e;
        this.u7b = AscCommon.Fwb.kf;
        this.ORa = new AscCommon.ree;
        Ia = f.location.protocol;
        this.SKf = (Ia && "" !== Ia ? Ia + "//" : "") + f.location.host;
        this.x6f = f.location.pathname;
        this.oVc = !1;
        this.Ckb = 0;
        this.qsb = [];
        this.SOb = [];
        this.ksd = 0;
        this.mhb = null;
        this.X9e = 2E3;
        this.Y9e = 6E5;
        this.LOf = 1E3;
        this.c2a = this.Swb = this.eVb = this.d_ = !1;
        this.Ws = AscCommon.Ws.te(y.translate);
        this.KSa = this.OBa = this.Lnb = null;
        this.LUc = this.P8b = this.h6 = !1;
        this.YW = e;
        this.ll = new AscCommon.BNd;
        this.GHc = !0;
        this.MTb = [];
        this.KRb = "";
        this.Bra = null;
        this.sca = this.U1b = !1;
        this.I1 = this.yYc = this.RCd = !0;
        this.MHc = this.MLa = !1;
        this.k0a = null;
        this.ZEa = !1;
        this.vxb = this.OOa = null;
        this.Zxb = !1;
        this.Sfa = null;
        this.SCd = this.jcc = this.L5a = this.pna = this.yIa = !1;
        this.q7 = this.qna = this.iNc = null;
        this.bag = !1;
        this.hIc = 0;
        this.nRa = [];
        this.cSa = "";
        this.Xvd = !1;
        this.i3b = this.f$ = null;
        this.pvd = !1 !== y.copyoutenabled;
        this.LP = y.watermark_on_draw ? new AscCommon.W1c(y.watermark_on_draw,this) : null;
        this.kbb = !1;
        this.q5 = new AscCommon.Jee;
        this.GYc = !0;
        this.RPa = {};
        return this
    }
    var $a = AscCommon.bs
      , Va = AscCommon.Otd
      , ib = AscCommon.YTc
      , y = Asc.Gk
      , Ab = Asc.OH
      , Sb = Asc.vE;
    Ia.prototype.T_ = function() {
        f.AscDesktopEditor && f.AscDesktopEditor.CreateEditorApi(this);
        var e = this;
        this.Xe = document.getElementById(this.z9c);
        AscCommon.mpe(function(f, Ta) {
            y.pg.HZ !== f ? e.Oe("asc_onError", f, y.Lk.Vo) : e.npc([Ta]);
            e.$x(Sb.Gs, Ab.rda)
        });
        AscCommon.ypf(this.Mod(), function() {
            e.i6 = !0;
            e.gqc();
            e.VEd()
        }, function() {
            e.Oe("asc_onError", Asc.Gk.pg.Zic, y.Lk.IU)
        });
        AscFonts.load(e, function() {
            e.KCd = !0;
            e.g3b(null)
        }, function() {
            e.Oe("asc_onError", Asc.Gk.pg.Zic, y.Lk.IU)
        });
        var Ia = f.onerror;
        f.onerror = function(Ta, Va, ob, $a, ib) {
            f.onerror = Ia;
            e.ll.$Ga("Error: " + Ta + " Script: " + Va + " Line: " + ob + ":" + $a + " userAgent: " + (navigator.userAgent || navigator.vendor || f.opera) + " platform: " + navigator.platform + " isLoadFullApi: " + e.i6 + " isDocumentLoadComplete: " + e.sca + " StackTrace: " + (ib ? ib.stack : ""));
            e.i6 && (e.sca ? (e.Oe("asc_onError", Asc.Gk.pg.a6c, y.Lk.Vo),
            e.VZa(!0)) : e.Oe("asc_onError", Asc.Gk.pg.PIa, y.Lk.IU));
            return Ia ? Ia.apply(this, arguments) : !1
        }
        ;
        AscCommon.Se.OFa && (document.body.onmousewheel = function(e) {
            e.stopPropagation && e.stopPropagation();
            return e.returnValue = !1
        }
        )
    }
    ;
    Ia.prototype.Mod = function() {
        var e = "";
        switch (this.Wy) {
        case $a.Tl:
            e = "word";
            break;
        case $a.NK:
            e = "cell";
            break;
        case $a.$y:
            e = "slide"
        }
        return e
    }
    ;
    Ia.prototype.E5e = function(e) {
        e || (e = ["Arial", "Symbol", "Wingdings", "Courier New", "Times New Roman"]);
        this.J4.Vic(e)
    }
    ;
    Ia.prototype.UZe = function() {
        return "../Common/Images/"
    }
    ;
    Ia.prototype.l1e = function() {
        return this.Yqa
    }
    ;
    Ia.prototype.krd = function() {
        return null
    }
    ;
    Ia.prototype.R0e = function() {
        var e = this.Svc();
        return e ? e.Io() : null
    }
    ;
    Ia.prototype.Svc = function() {
        return null
    }
    ;
    Ia.prototype.Prd = function() {}
    ;
    Ia.prototype.ssc = function(y) {
        var Ta = this.To;
        y && (this.To = y);
        this.To && (this.e_ = this.To.F0a(),
        this.yga = this.To.xla(),
        this.klb = this.To.vRc(),
        this.Yqa = this.To.aYc(),
        this.VIb = this.To.E0a(),
        this.Zvd = this.To.ejf(),
        this.xXc = this.To.uJa(),
        this.YW = new AscCommon.QTb,
        this.YW.vw(this.To.xla()),
        this.YW.fMc(this.To.pJb()),
        this.YW.FAf(this.To.ywc()),
        this.YW.VAf(this.To.Gwc()),
        this.ll.K4b(this.e_),
        this.LP && this.LP.K2c());
        AscCommon.sbf === this.klb ? (this.h6 = !0,
        AscCommon.WD.h6 = !0,
        this.To.qHd(!0)) : AscCommon.urf === this.klb && this.To.qHd(!0);
        this.To.Gyd() && e !== f.AscDesktopEditor && (y = this.To.Gyd(),
        y.userId = this.yga,
        f.AscDesktopEditor.execCommand("portal:cryptoinfo", JSON.stringify(y)));
        e === f.AscDesktopEditor || this.To && this.To.MRa || f.AscDesktopEditor.SetDocumentName(this.Yqa);
        this.h6 || e === f.AscDesktopEditor || e === f.AscDesktopEditor.CryptoMode || this.To.axf(0 < f.AscDesktopEditor.CryptoMode);
        Ta || this.VEd()
    }
    ;
    Ia.prototype.z5e = function() {
        return this.To && !0 === this.To.wwc() ? !0 : !1
    }
    ;
    Ia.prototype.w9 = function() {}
    ;
    Ia.prototype.Uza = function(e) {
        var f = !1;
        this.Fa.Pva && (f = !0);
        f && e && this.Fa.mHf && (f = !1);
        return f
    }
    ;
    Ia.prototype.Ygb = function() {
        return this.pvd
    }
    ;
    Ia.prototype.J8d = function() {
        return !1
    }
    ;
    Ia.prototype.Oe = function() {}
    ;
    Ia.prototype.zQb = function() {
        this.Oe("asc_onOpenDocumentProgress", this.ORa)
    }
    ;
    Ia.prototype.hCf = function(e) {
        this.Ex || this.Oe("asc_onInitEditorFonts", e)
    }
    ;
    Ia.prototype.$G = function(e, f) {
        this.Oe("asc_onStartAction", e, f);
        Sb.Gs === e && this.Blb()
    }
    ;
    Ia.prototype.$x = function(e, f) {
        this.Oe("asc_onEndAction", e, f);
        Sb.Gs === e && this.ilb()
    }
    ;
    Ia.prototype.ghg = function() {
        this.Oe("asc_OnTryUndoInFastCollaborative")
    }
    ;
    Ia.prototype.VZa = function() {}
    ;
    Ia.prototype.z9e = function(e) {
        this.fKb = e
    }
    ;
    Ia.prototype.Byb = function() {
        return this.Ex
    }
    ;
    Ia.prototype.eK = function() {
        return !this.Ex && this.fKb === Asc.FIb.kf
    }
    ;
    Ia.prototype.nVd = function() {
        return this.fKb === Asc.FIb.SUc
    }
    ;
    Ia.prototype.PRc = function() {
        return this.fKb === Asc.FIb.Qcd
    }
    ;
    Ia.prototype.q2 = function() {
        return 0 !== this.Ckb
    }
    ;
    Ia.prototype.Blb = function() {
        ++this.Ckb
    }
    ;
    Ia.prototype.ilb = function() {
        this.Ckb--;
        0 > this.Ckb && (this.Ckb = 0);
        if (!this.q2()) {
            for (var e = this.qsb.length, f = 0; f < e; f++)
                this.qsb[f](this.SOb[f]);
            this.qsb.splice(0, e);
            this.SOb.splice(0, e)
        }
    }
    ;
    Ia.prototype.bSd = function(e, f) {
        return this.q2() ? (this.qsb[this.qsb.length] = e,
        this.SOb[this.SOb.length] = f,
        !1) : !0
    }
    ;
    Ia.prototype.sqe = function() {
        var e = !1;
        switch (this.Wy) {
        case $a.Tl:
            e = !this.J8d();
            break;
        case $a.$y:
            e = !0
        }
        return e
    }
    ;
    Ia.prototype.jZc = function() {
        this.Oe("asc_onPrint")
    }
    ;
    Ia.prototype.frc = function(y, Ia) {
        this.u7b = AscCommon.Fwb.NRa;
        var Ta = null;
        this.To && this.To.MRa || (Ta = !f.NATIVE_EDITOR_ENJINE && this.lQc() || e,
        "string" === typeof Ta && (Ta = Asc.QOa ? Asc.QOa[Ta] : e),
        Ta = {
            c: "open",
            id: this.e_,
            userid: this.yga,
            format: this.VIb,
            url: this.klb,
            title: this.Yqa,
            lcid: Ta,
            nobase64: !0
        },
        y && (Ta.serverVersion = y.q$d,
        Ta.closeonerror = y.DYc,
        Ta.tokenHistory = y.g_c,
        Ta.userconnectionid = this.ll.mSa()));
        y ? this.ll.JNc(Ta) : this.ll.jUb(this.Byb(), Ta);
        Ia || this.$G(Sb.Gs, Ab.NRa);
        if (this.To.wwc() && f.AscDesktopEditor && !f.AscDesktopEditor.IsLocalFile(!0)) {
            var Va = this;
            f.AscDesktopEditor.OpenFileCrypt(this.To.aYc(), this.To.vRc(), function() {
                Va.$Ed.apply(Va, arguments)
            })
        }
    }
    ;
    Ia.prototype.FXe = function() {
        this.GXe()
    }
    ;
    Ia.prototype.GXe = function() {
        var e = new AscCommon.Scd;
        e.data = "XLSY;v2;5958;BAKAAgAAA7kDAAAEzAMAAABaBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADUBAAAAHgAAAAEZAAAAAAAAAAABAAAAAAIAAAAABAAAAAAFAAAAAAQKAAAABQAAAAAFAAAAAAYvAAAAByoAAAABBgMAAAACAQEEBg4AAABDAGEAbABpAGIAcgBpAAkBAQYFAAAAAAAAJkAOHQAAAAMYAAAABgQAAAAABwQAAAAACAQAAAAACQQAAAAAAiMAAAADHgAAAAYEAAAAAAcEAAAAAAgEAAAAAAkEAAAAAAwEAAAAAA8oAAAAECMAAAAABAAAAAAAAAAEDAAAAE4AbwByAG0AYQBsAAUEAAAAAAAAAAoAAAAADE4AAAAAIgAAAFQAYQBiAGwAZQBTAHQAeQBsAGUATQBlAGQAaQB1AG0AMgABIgAAAFAAaQB2AG8AdABTAHQAeQBsAGUATABpAGcAaAB0ADEANgAPAAAAAAAAAAABBQAAAAIAAAAAigAAAACFAAAAARgAAAAABgwAAABTAGgAZQBlAHQAMQABBAEAAAAEBAAAAEEAMQAWBQAAABcAAAAACwoAAAABBQAAAAAAAC5ADjwAAAAABUfhehSuxzFAAQXMzMzMzAwzQAIFR+F6FK7HMUADBczMzMzMDDNABAV7FK5H4XoeQAUFexSuR+F6HkAJAAAAAOgSAAAF4xIAABTeEgAA+gAMAAAATwBmAGYAaQBjAGUAIABUAGgAZQBtAGUA+wCxEgAAABUBAAD6AAYAAABPAGYAZgBpAGMAZQD7DB4AAAAEGQAAAPoABgAAAHcAaQBuAGQAbwB3AAH/Av8D//sNDQAAAAEIAAAA+gDuAewC4fsIJgAAAAQhAAAA+gAKAAAAdwBpAG4AZABvAHcAVABlAHgAdAABAAIAAwD7Cg0AAAABCAAAAPoAgAEAAoD7AA0AAAABCAAAAPoATwGBAr37CQ0AAAABCAAAAPoAHwFJAn37AQ0AAAABCAAAAPoAwAFQAk37Ag0AAAABCAAAAPoAmwG7Aln7Aw0AAAABCAAAAPoAgAFkAqL7Cw0AAAABCAAAAPoAAAEAAv/7BA0AAAABCAAAAPoASwGsAsb7BQ0AAAABCAAAAPoA9wGWAkb7AakKAAD6AAkAAABDAG8AbQBwAG8AcwBpAHQAZQD7AEMFAAAAFQAAAPoDBwAAAEMAYQBsAGkAYgByAGkA+wERAAAA+gMFAAAAQQByAGkAYQBsAPsCEQAAAPoDBQAAAEEAcgBpAGEAbAD7A/gEAAAeAAAAACQAAAD6AAQAAABKAHAAYQBuAAEIAAAALf8z/yAAMP+0MLcwwzCvMPsAHgAAAPoABAAAAEgAYQBuAGcAAQUAAADRuUDHIADgrBW1+wAYAAAA+gAEAAAASABhAG4AcwABAgAAAItbU0/7AB4AAAD6AAQAAABIAGEAbgB0AAEFAAAArl/fjmNr0Z7UmvsAHgAAAPoABAAAAEEAcgBhAGIAAQUAAABBAHIAaQBhAGwA+wAeAAAA+gAEAAAASABlAGIAcgABBQAAAEEAcgBpAGEAbAD7ACgAAAD6AAQAAABUAGgAYQBpAAEKAAAAQwBvAHIAZABpAGEAIABOAGUAdwD7AB4AAAD6AAQAAABFAHQAaABpAAEFAAAATgB5AGEAbABhAPsAIAAAAPoABAAAAEIAZQBuAGcAAQYAAABWAHIAaQBuAGQAYQD7ACAAAAD6AAQAAABHAHUAagByAAEGAAAAUwBoAHIAdQB0AGkA+wAkAAAA+gAEAAAASwBoAG0AcgABCAAAAEQAYQB1AG4AUABlAG4AaAD7AB4AAAD6AAQAAABLAG4AZABhAAEFAAAAVAB1AG4AZwBhAPsAHgAAAPoABAAAAEcAdQByAHUAAQUAAABSAGEAYQB2AGkA+wAkAAAA+gAEAAAAQwBhAG4AcwABCAAAAEUAdQBwAGgAZQBtAGkAYQD7ADwAAAD6AAQAAABDAGgAZQByAAEUAAAAUABsAGEAbgB0AGEAZwBlAG4AZQB0ACAAQwBoAGUAcgBvAGsAZQBlAPsAOAAAAPoABAAAAFkAaQBpAGkAARIAAABNAGkAYwByAG8AcwBvAGYAdAAgAFkAaQAgAEIAYQBpAHQAaQD7ADgAAAD6AAQAAABUAGkAYgB0AAESAAAATQBpAGMAcgBvAHMAbwBmAHQAIABIAGkAbQBhAGwAYQB5AGEA+wAiAAAA+gAEAAAAVABoAGEAYQABBwAAAE0AVgAgAEIAbwBsAGkA+wAgAAAA+gAEAAAARABlAHYAYQABBgAAAE0AYQBuAGcAYQBsAPsAIgAAAPoABAAAAFQAZQBsAHUAAQcAAABHAGEAdQB0AGEAbQBpAPsAHgAAAPoABAAAAFQAYQBtAGwAAQUAAABMAGEAdABoAGEA+wA2AAAA+gAEAAAAUwB5AHIAYwABEQAAAEUAcwB0AHIAYQBuAGcAZQBsAG8AIABFAGQAZQBzAHMAYQD7ACIAAAD6AAQAAABPAHIAeQBhAAEHAAAASwBhAGwAaQBuAGcAYQD7ACIAAAD6AAQAAABNAGwAeQBtAAEHAAAASwBhAHIAdABpAGsAYQD7ACYAAAD6AAQAAABMAGEAbwBvAAEJAAAARABvAGsAQwBoAGEAbQBwAGEA+wAsAAAA+gAEAAAAUwBpAG4AaAABDAAAAEkAcwBrAG8AbwBsAGEAIABQAG8AdABhAPsAMgAAAPoABAAAAE0AbwBuAGcAAQ8AAABNAG8AbgBnAG8AbABpAGEAbgAgAEIAYQBpAHQAaQD7AB4AAAD6AAQAAABWAGkAZQB0AAEFAAAAQQByAGkAYQBsAPsANAAAAPoABAAAAFUAaQBnAGgAARAAAABNAGkAYwByAG8AcwBvAGYAdAAgAFUAaQBnAGgAdQByAPsAIgAAAPoABAAAAEcAZQBvAHIAAQcAAABTAHkAbABmAGEAZQBuAPsBQwUAAAAVAAAA+gMHAAAAQwBhAGwAaQBiAHIAaQD7AREAAAD6AwUAAABBAHIAaQBhAGwA+wIRAAAA+gMFAAAAQQByAGkAYQBsAPsD+AQAAB4AAAAAJAAAAPoABAAAAEoAcABhAG4AAQgAAAAt/zP/IAAw/7QwtzDDMK8w+wAeAAAA+gAEAAAASABhAG4AZwABBQAAANG5QMcgAOCsFbX7ABgAAAD6AAQAAABIAGEAbgBzAAECAAAAi1tTT/sAHgAAAPoABAAAAEgAYQBuAHQAAQUAAACuX9+OY2vRntSa+wAeAAAA+gAEAAAAQQByAGEAYgABBQAAAEEAcgBpAGEAbAD7AB4AAAD6AAQAAABIAGUAYgByAAEFAAAAQQByAGkAYQBsAPsAKAAAAPoABAAAAFQAaABhAGkAAQoAAABDAG8AcgBkAGkAYQAgAE4AZQB3APsAHgAAAPoABAAAAEUAdABoAGkAAQUAAABOAHkAYQBsAGEA+wAgAAAA+gAEAAAAQgBlAG4AZwABBgAAAFYAcgBpAG4AZABhAPsAIAAAAPoABAAAAEcAdQBqAHIAAQYAAABTAGgAcgB1AHQAaQD7ACQAAAD6AAQAAABLAGgAbQByAAEIAAAARABhAHUAbgBQAGUAbgBoAPsAHgAAAPoABAAAAEsAbgBkAGEAAQUAAABUAHUAbgBnAGEA+wAeAAAA+gAEAAAARwB1AHIAdQABBQAAAFIAYQBhAHYAaQD7ACQAAAD6AAQAAABDAGEAbgBzAAEIAAAARQB1AHAAaABlAG0AaQBhAPsAPAAAAPoABAAAAEMAaABlAHIAARQAAABQAGwAYQBuAHQAYQBnAGUAbgBlAHQAIABDAGgAZQByAG8AawBlAGUA+wA4AAAA+gAEAAAAWQBpAGkAaQABEgAAAE0AaQBjAHIAbwBzAG8AZgB0ACAAWQBpACAAQgBhAGkAdABpAPsAOAAAAPoABAAAAFQAaQBiAHQAARIAAABNAGkAYwByAG8AcwBvAGYAdAAgAEgAaQBtAGEAbABhAHkAYQD7ACIAAAD6AAQAAABUAGgAYQBhAAEHAAAATQBWACAAQgBvAGwAaQD7ACAAAAD6AAQAAABEAGUAdgBhAAEGAAAATQBhAG4AZwBhAGwA+wAiAAAA+gAEAAAAVABlAGwAdQABBwAAAEcAYQB1AHQAYQBtAGkA+wAeAAAA+gAEAAAAVABhAG0AbAABBQAAAEwAYQB0AGgAYQD7ADYAAAD6AAQAAABTAHkAcgBjAAERAAAARQBzAHQAcgBhAG4AZwBlAGwAbwAgAEUAZABlAHMAcwBhAPsAIgAAAPoABAAAAE8AcgB5AGEAAQcAAABLAGEAbABpAG4AZwBhAPsAIgAAAPoABAAAAE0AbAB5AG0AAQcAAABLAGEAcgB0AGkAawBhAPsAJgAAAPoABAAAAEwAYQBvAG8AAQkAAABEAG8AawBDAGgAYQBtAHAAYQD7ACwAAAD6AAQAAABTAGkAbgBoAAEMAAAASQBzAGsAbwBvAGwAYQAgAFAAbwB0AGEA+wAyAAAA+gAEAAAATQBvAG4AZwABDwAAAE0AbwBuAGcAbwBsAGkAYQBuACAAQgBhAGkAdABpAPsAHgAAAPoABAAAAFYAaQBlAHQAAQUAAABBAHIAaQBhAGwA+wA0AAAA+gAEAAAAVQBpAGcAaAABEAAAAE0AaQBjAHIAbwBzAG8AZgB0ACAAVQBpAGcAaAB1AHIA+wAiAAAA+gAEAAAARwBlAG8AcgABBwAAAFMAeQBsAGYAYQBlAG4A+wLkBgAA+gAGAAAATwBmAGYAaQBjAGUA+wCyAgAAAwAAAAATAAAAAw4AAAAACQAAAAMEAAAA+gAO+wBDAQAABD4BAAD6AQH7ACcBAAADAAAAAFwAAAD6AAAAAAD7AFAAAAADSwAAAPoADvsAQgAAAAIAAAABGAAAAPoABgAAAGEAOgB0AGkAbgB0AAFQwwAA+wEcAAAA+gAIAAAAYQA6AHMAYQB0AE0AbwBkAAHgkwQA+wBcAAAA+gC4iAAA+wBQAAAAA0sAAAD6AA77AEIAAAACAAAAARgAAAD6AAYAAABhADoAdABpAG4AdAABiJAAAPsBHAAAAPoACAAAAGEAOgBzAGEAdABNAG8AZAAB4JMEAPsAXAAAAPoAoIYBAPsAUAAAAANLAAAA+gAO+wBCAAAAAgAAAAEYAAAA+gAGAAAAYQA6AHQAaQBuAHQAAZg6AAD7ARwAAAD6AAgAAABhADoAcwBhAHQATQBvAGQAATBXBQD7AQkAAAD6AEAx9wABAfsASQEAAAREAQAA+gEB+wAtAQAAAwAAAABeAAAA+gAAAAAA+wBSAAAAA00AAAD6AA77AEQAAAACAAAAARoAAAD6AAcAAABhADoAcwBoAGEAZABlAAE4xwAA+wEcAAAA+gAIAAAAYQA6AHMAYQB0AE0AbwBkAAHQ+wEA+wBeAAAA+gCAOAEA+wBSAAAAA00AAAD6AA77AEQAAAACAAAAARoAAAD6AAcAAABhADoAcwBoAGEAZABlAAFIawEA+wEcAAAA+gAIAAAAYQA6AHMAYQB0AE0AbwBkAAHQ+wEA+wBeAAAA+gCghgEA+wBSAAAAA00AAAD6AA77AEQAAAACAAAAARoAAAD6AAcAAABhADoAcwBoAGEAZABlAAEwbwEA+wEcAAAA+gAIAAAAYQA6AHMAYQB0AE0AbwBkAAFYDwIA+wEJAAAA+gBAMfcAAQD7AQoBAAADAAAAAIMAAAD6AAABAAIBAzUlAAD7AFwAAAADVwAAAABSAAAAA00AAAD6AA77AEQAAAACAAAAARoAAAD6AAcAAABhADoAcwBoAGEAZABlAAEYcwEA+wEcAAAA+gAIAAAAYQA6AHMAYQB0AE0AbwBkAAEomgEA+wEEAAAA+gAG+wIHAAAA+gAAAAAA+wA6AAAA+gAAAQACAQM4YwAA+wATAAAAAw4AAAAACQAAAAMEAAAA+gAO+wEEAAAA+gAG+wIHAAAA+gAAAAAA+wA6AAAA+gAAAQACAQPUlAAA+wATAAAAAw4AAAAACQAAAAMEAAAA+gAO+wEEAAAA+gAG+wIHAAAA+gAAAAAA+wITAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAPuAgAAAwAAAAATAAAAAw4AAAAACQAAAAMEAAAA+gAO+wCmAQAABKEBAAD6AQH7AEgBAAADAAAAAFwAAAD6AAAAAAD7AFAAAAADSwAAAPoADvsAQgAAAAIAAAABGAAAAPoABgAAAGEAOgB0AGkAbgB0AAFAnAAA+wEcAAAA+gAIAAAAYQA6AHMAYQB0AE0AbwBkAAEwVwUA+wB7AAAA+gBAnAAA+wBvAAAAA2oAAAD6AA77AGEAAAADAAAAARgAAAD6AAYAAABhADoAdABpAG4AdAAByK8AAPsBGgAAAPoABwAAAGEAOgBzAGgAYQBkAGUAAbiCAQD7ARwAAAD6AAgAAABhADoAcwBhAHQATQBvAGQAATBXBQD7AF4AAAD6AKCGAQD7AFIAAAADTQAAAPoADvsARAAAAAIAAAABGgAAAPoABwAAAGEAOgBzAGgAYQBkAGUAASBOAAD7ARwAAAD6AAgAAABhADoAcwBhAHQATQBvAGQAARjkAwD7AksAAAD6AAD7AEIAAAD6AAUAAAA1ADAAMAAwADAAAQYAAAAtADgAMAAwADAAMAACBQAAADUAMAAwADAAMAADBgAAADEAOAAwADAAMAAwAPsAIgEAAAQdAQAA+gEB+wDIAAAAAgAAAABcAAAA+gAAAAAA+wBQAAAAA0sAAAD6AA77AEIAAAACAAAAARgAAAD6AAYAAABhADoAdABpAG4AdAABgDgBAPsBHAAAAPoACAAAAGEAOgBzAGEAdABNAG8AZAAB4JMEAPsAXgAAAPoAoIYBAPsAUgAAAANNAAAA+gAO+wBEAAAAAgAAAAEaAAAA+gAHAAAAYQA6AHMAaABhAGQAZQABMHUAAPsBHAAAAPoACAAAAGEAOgBzAGEAdABNAG8AZAABQA0DAPsCRwAAAPoAAPsAPgAAAPoABQAAADUAMAAwADAAMAABBQAAADUAMAAwADAAMAACBQAAADUAMAAwADAAMAADBQAAADUAMAAwADAAMAD7BAQAAAAAAAAA";
        e.znb = AscCommon.Iud(e.data, AscCommon.hta.QRa);
        this.g3b(e)
    }
    ;
    Ia.prototype.sFb = function() {}
    ;
    Ia.prototype.RQd = function() {}
    ;
    Ia.prototype.Ipd = function(e) {
        var f = this;
        AscCommon.Erf(e, this.bwd, AscCommon.hta.QRa, function(e, Ta) {
            e || !Ta.znb && !Asc.$$e.test(f.To && f.To.E0a()) ? f.Oe("asc_onError", e ? y.pg.QN : y.pg.PIa, y.Lk.IU) : f.g3b(Ta)
        });
        this.RQd()
    }
    ;
    Ia.prototype.$Ed = function(e) {
        if (this.i6)
            if (this.i3b = null,
            null == e)
                this.Oe("asc_onError", y.pg.PIa, y.Lk.IU);
            else {
                var f = new AscCommon.Scd;
                f.znb = AscCommon.Iud(e, AscCommon.hta.QRa);
                f.data = e;
                this.V2a(f);
                this.Oe("asc_onDocumentPassword", "" !== this.cSa)
            }
        else
            this.i3b = e
    }
    ;
    Ia.prototype.Ocb = function() {}
    ;
    Ia.prototype.$rd = function() {
        this.oVc = !0;
        this.sFb()
    }
    ;
    Ia.prototype.V9e = function() {
        this.$G(Sb.tP, Ab.FH)
    }
    ;
    Ia.prototype.iZc = function() {
        var e = this;
        this.sca = !0;
        f.IS_NATIVE_EDITOR || setInterval(function() {
            e.hUe()
        }, 40);
        this.$x(Sb.Gs, Ab.NRa);
        this.Oe("asc_onDocumentContentReady");
        f.gj && f.gj.zUa("onDocumentContentReady");
        $a.NK === this.Wy && this.YEd(this.jJf());
        this.To && this.pluginMethod_SetProperties(this.To.uJa());
        this.f$ && !this.Xvd && this.f$.Lzf();
        if (f.AscDesktopEditor && f.AscDesktopEditor.onDocumentContentReady)
            f.AscDesktopEditor.onDocumentContentReady()
    }
    ;
    Ia.prototype.dHd = function(e, f) {
        AscCommon.YTc.kf !== f ? this.Oe(f, e, function() {}) : AscCommon.getFile(e)
    }
    ;
    Ia.prototype.j0a = function() {
        return this.ll.j0a()
    }
    ;
    Ia.prototype.U8e = function(e) {
        this.MHc = e
    }
    ;
    Ia.prototype.D7a = function() {}
    ;
    Ia.prototype.Ppd = function() {}
    ;
    Ia.prototype.pqc = function() {
        return !1
    }
    ;
    Ia.prototype.mpd = function() {
        return !1
    }
    ;
    Ia.prototype.Lpd = function(e) {
        var f = this;
        0 == e.saveLock ? this.q2() ? (this.ll.$ra = function() {
            f.I1 = !0;
            f.MLa = !1;
            f.mhb = null;
            f.d_ && f.ETb()
        }
        ,
        this.ll.I5b()) : (this.$G(Sb.tP, Ab.lH),
        (this.eVb = this.d_) && this.Swb && this.ll.pya(!0),
        this.d_ = this.Swb = !1,
        this.Mpd()) : (e = this.ll.I0a(),
        AscCommon.ULb.g3c === e || AscCommon.ULb.f3c === e ? (this.MLa = !1,
        this.I1 = !0) : this.MLa ? setTimeout(function() {
            f.ll.G7a(function(e) {
                f.Lpd(e)
            })
        }, 1E3) : (this.I1 = !0,
        this.d_ && this.ETb()))
    }
    ;
    Ia.prototype.Mpd = function() {}
    ;
    Ia.prototype.hUe = function() {
        !this.I1 || this.Ex || !this.d_ && 0 === this.ksd || (this.d_ ? (this.mhb = new Date,
        this.tda(!0, !0)) : this.dod())
    }
    ;
    Ia.prototype.dod = function() {}
    ;
    Ia.prototype.r1d = function() {
        return !0
    }
    ;
    Ia.prototype.ETb = function(e) {
        e && this.sca && !this.I1 && this.ll.$Ga("Error: connection state changed waitAuth;this.canSave:" + this.I1);
        this.sca ? (this.Swb = this.d_ = !0,
        this.I1 && (this.ll.Wjb(!1, !0, AscCommon.History.H7c()),
        this.SGb(),
        AscCommon.History.WCe(),
        this.D7a(),
        this.Ppd(),
        this.d_ = this.Swb = !1)) : (this.SGb(),
        this.ll.Wjb(!1, !0))
    }
    ;
    Ia.prototype.Z7e = function(e) {
        "number" === typeof e && (this.ksd = 1E3 * e)
    }
    ;
    Ia.prototype.x_e = function(e) {
        this.ll.HLc(e)
    }
    ;
    Ia.prototype.w_e = function() {
        this.ll.Vvc()
    }
    ;
    Ia.prototype.y_e = function() {
        this.ll.lwc()
    }
    ;
    Ia.prototype.o1e = function() {
        this.b1d()
    }
    ;
    Ia.prototype.Gpd = function() {
        if (this.U1b) {
            var e = new AscCommon.Sqd;
            null !== this.Bra && (e.cKd(this.Bra.type),
            e.oAf(this.Bra.branding),
            e.tAf(this.Bra.customization),
            e.QAf(this.Bra.light),
            e.WAf(this.Bra.mode),
            e.jBf(this.Bra.rights),
            e.mAf(this.Bra.buildVersion),
            e.lAf(this.Bra.buildNumber));
            this.Oe("asc_onGetEditorPermissions", e)
        }
    }
    ;
    Ia.prototype.Xyd = function() {}
    ;
    Ia.prototype.b1d = function() {
        var Ia = this;
        if (null == this.YW || null == this.YW.sE())
            this.YW = new AscCommon.QTb,
            this.YW.vw("Unknown"),
            this.YW.fMc("Unknown");
        (f.NATIVE_EDITOR_ENJINE || this.To && this.To.MRa) && !f.IS_NATIVE_EDITOR || this.ll.Q3a(null);
        this.ll.qGa = function(e, f) {
            Ia.Oe("asc_onCoAuthoringChatReceiveMessage", e, f)
        }
        ;
        this.ll.tGa = function(e, f) {
            Ia.Oe("asc_onServerVersion", e, f)
        }
        ;
        this.ll.Yra = function(e, f) {
            Ia.Oe("asc_onAuthParticipantsChanged", e, f)
        }
        ;
        this.ll.DQa = function(e) {
            Ia.Oe("asc_onParticipantsChanged", e)
        }
        ;
        this.ll.wGa = function(e) {
            Ia.KRb = e;
            Ia.qVe()
        }
        ;
        this.ll.vGa = function(e) {
            AscCommon.eg.Z6b("" + e)
        }
        ;
        this.ll.nya = function() {
            Ia.$rd()
        }
        ;
        this.ll.nGa = function() {
            Ia.U1b ? Ia.ll.oXb() ? Ia.ll.jUb(Ia.Byb(), e, Ia.ACd()) : Ia.frc(e, !0) : Ia.Gpd()
        }
        ;
        this.ll.pGa = function(e) {
            Ia.Bra = e;
            Ia.U1b = !0;
            Ia.Gpd()
        }
        ;
        this.ll.CQa = function(e) {
            Ia.Bra = e;
            Ia.U1b = !0;
            var f = new AscCommon.Sqd;
            f.cKd(e);
            Ia.Oe("asc_onLicenseChanged", f)
        }
        ;
        this.ll.xGa = function(e) {
            Ia.Oe("asc_onError", e || y.pg.k7b, y.Lk.Vo)
        }
        ;
        this.ll.rGa = function(e) {
            var f = e.title;
            f && (Ia.Yqa = f,
            Ia.To && Ia.To.UNa(f));
            Ia.Oe("asc_onMeta", e)
        }
        ;
        this.ll.uGa = function(e) {
            var f = e.code
              , y = e.reason;
            e = e.interval;
            var Ta = !0;
            if (Va.uJd == f) {
                var $a = Ia.ACd();
                $a > e ? Ta = !1 : Ia.ll.fvc($a)
            } else
                Va.tJd == f && (Ta = !1);
            Ta || (Ia.tda(!1, !0) ? (Ia.QKd(AscCommon.Jxd(AscCommon.Nvc(Ia.sca, f))),
            Ia.vxb = {
                code: f,
                reason: y
            }) : Ia.ll.disconnect(f, y))
        }
        ;
        this.ll.kma = function(e) {
            if (AscCommon.Ktd.UF === e.type)
                e.start ? (null !== Ia.k0a || Ia.ZEa ? clearInterval(Ia.k0a) : Ia.$G(Sb.tP, Ab.$Ka),
                Ia.k0a = setTimeout(function() {
                    Ia.k0a = null;
                    Ia.ZEa ? Ia.$x(Sb.tP, Ab.lH) : Ia.$x(Sb.tP, Ab.$Ka);
                    Ia.ZEa = !1;
                    Ia.Oe("asc_onError", Asc.Gk.pg.$Ka, y.Lk.Vo)
                }, Asc.Ctd)) : e.gzf ? (Ia.ZEa && Ia.$x(Sb.tP, Ab.lH),
                Ia.ZEa = !1) : null !== Ia.k0a && (clearInterval(Ia.k0a),
                Ia.k0a = null,
                Ia.ZEa ? Ia.$x(Sb.tP, Ab.lH) : Ia.$x(Sb.tP, Ab.$Ka),
                Ia.ZEa = !1,
                e.success || Ia.Oe("asc_onError", Asc.Gk.pg.$Ka, y.Lk.Vo));
            else if (AscCommon.Kd.gB || null !== Ia.OOa)
                e.start ? (null === Ia.OOa ? Ia.$G(Sb.tP, Ab.aLa) : clearInterval(Ia.OOa),
                Ia.OOa = setTimeout(function() {
                    Ia.OOa = null;
                    Ia.$x(Sb.tP, Ab.aLa);
                    Ia.Oe("asc_onError", Asc.Gk.pg.aLa, y.Lk.Vo)
                }, Asc.Ctd)) : null !== Ia.OOa && (clearInterval(Ia.OOa),
                Ia.OOa = null,
                Ia.$x(Sb.tP, Ab.aLa),
                e.success || Ia.Oe("asc_onError", Asc.Gk.pg.aLa, y.Lk.Vo))
        }
        ;
        this.ll.mGa = function(e) {
            Ia.$x(Sb.Gs, Ab.NRa);
            Ia.Sfa && Ia.Sfa.DYc ? Ia.Oe("asc_onError", AscCommon.Nvc(Ia.sca, e.code), Ia.sca ? Asc.Gk.Lk.Vo : Asc.Gk.Lk.IU) : (Ia.Sfa = null,
            Ia.Oe("asc_onExpiredToken"))
        }
        ;
        this.ll.oGa = function() {
            var e = Ia.c2a
              , f = Ia.I1;
            Ia.c2a = !0;
            Ia.I1 = !1;
            Ia.Oe("asc_onDocumentModifiedChanged");
            Ia.c2a = e;
            Ia.I1 = f;
            Ia.Oe("asc_onDocumentModifiedChanged")
        }
        ;
        this.ll.B2 = function(e, f) {
            AscCommon.ULb.kf === Ia.ll.I0a() && Ia.$rd();
            null != f && (e = AscCommon.Nvc(Ia.sca, f),
            f = Ia.sca ? Asc.Gk.Lk.Vo : Asc.Gk.Lk.IU,
            Ia.QKd(AscCommon.Jxd(e)),
            Ia.Oe("asc_onError", e, f))
        }
        ;
        this.ll.BQa = function(f) {
            if (AscCommon.WD.e2a())
                Ia.qna && (Ia.qna(f ? f.data : e),
                Ia.qna = null);
            else if (f.data)
                switch (f = f.data,
                f.type) {
                case "reopen":
                case "open":
                    switch (f.status) {
                    case "updateversion":
                    case "ok":
                        var Xa = f.data;
                        AscCommon.tH.te(Xa);
                        null != Xa["Editor.bin"] ? "ok" === f.status || Ia.Byb() ? Ia.Ipd(Xa["Editor.bin"]) : Ia.Oe("asc_onDocumentUpdateVersion", function() {
                            Ia.GHc && Ia.irc();
                            Ia.Ipd(Xa["Editor.bin"])
                        }) : Ia.Oe("asc_onError", y.pg.PIa, y.Lk.IU);
                        break;
                    case "needparams":
                        Ia.Ocb(f.data);
                        break;
                    case "needpassword":
                        Ia.Ocb(null, !0);
                        break;
                    case "err":
                        Ia.Oe("asc_onError", AscCommon.wGb(parseInt(f.data), Asc.Gk.pg.PIa), y.Lk.IU)
                    }
                    break;
                default:
                    Ia.qna ? (Ia.qna(f),
                    Ia.qna = null) : Ia.Oe("asc_onError", y.pg.QN, y.Lk.Vo)
                }
        }
        ;
        this.ll.pya = function(e, f) {
            Ia.Ex || (e ? Ia.SGb() : Ia.ETb(f))
        }
        ;
        this.ll.U2a = function() {
            Ia.d_ ? Ia.Swb = !1 : Ia.$Qc()
        }
        ;
        this.Dod();
        this.ll.te(this.YW, this.e_, this.Zvd, "fghhfgsjdgfjs", this.Wy, this.$vd, this.To)
    }
    ;
    Ia.prototype.Dod = function() {}
    ;
    Ia.prototype.SGb = function() {}
    ;
    Ia.prototype.$Qc = function() {}
    ;
    Ia.prototype.Cod = function(e) {
        if (this.RCd) {
            var f = this.ll
              , y = Array.prototype.slice.call(arguments, 1);
            this.MTb.push(function() {
                e.apply(f, y)
            });
            return !0
        }
        return !1
    }
    ;
    Ia.prototype.dUe = function() {
        this.RCd = !1;
        for (var e = 0; e < this.MTb.length; ++e)
            this.MTb[e]();
        this.MTb = []
    }
    ;
    Ia.prototype.irc = function() {
        this.ll.disconnect();
        this.GHc = !1;
        this.VZa(!0)
    }
    ;
    Ia.prototype.k2d = function() {
        this.Blb()
    }
    ;
    Ia.prototype.K1d = function() {
        this.ilb()
    }
    ;
    Ia.prototype.cJf = function() {
        this.q5 && (this.q5.disconnect(),
        this.GYc = !1,
        this.pqd())
    }
    ;
    Ia.prototype.aWc = function() {}
    ;
    Ia.prototype.pqd = function() {}
    ;
    Ia.prototype.qVe = function() {
        if (this.q5) {
            var e = this;
            f.AscDesktopEditor ? (f.asc_nativeOnSpellCheck = function(e) {
                var y = f.Asc.editor ? f.Asc.editor : f.editor;
                y.q5 && y.q5.EQa(e)
            }
            ,
            this.q5.Kjb = function(e) {
                f.AscDesktopEditor.SpellCheck(JSON.stringify(e))
            }
            ,
            this.q5.disconnect = function() {}
            ,
            f.AscDesktopEditor.IsLocalFile && !f.AscDesktopEditor.IsLocalFile() && this.Oe("asc_onSpellCheckInit", "1026 1027 1029 1030 1031 1032 1033 1036 1038 1040 1042 1043 1044 1045 1046 1048 1049 1050 1051 1053 1055 1057 1058 1060 1062 1063 1066 1068 1069 1087 1104 1110 1134 2051 2055 2057 2068 2070 3079 3081 3082 4105 7177 9242 10266".split(" "))) : this.KRb && this.GYc && this.q5.Q3a(this.KRb);
            this.q5.iib = function(f) {
                e.Oe("asc_onSpellCheckInit", f)
            }
            ;
            this.q5.EQa = function(f) {
                e.D0d(f)
            }
            ;
            this.q5.te(this.e_)
        }
    }
    ;
    Ia.prototype.S9e = function(e) {
        e = "string" === typeof e ? e : e.Tl;
        f.AscDesktopEditor && (f.AscDesktopEditor.SpellCheck('{"type":"add","usrWords":["' + e + '"]}'),
        this.aWc(e))
    }
    ;
    Ia.prototype.zRd = function() {}
    ;
    Ia.prototype.w1d = function() {
        return !1
    }
    ;
    Ia.prototype.Spd = function() {}
    ;
    Ia.prototype.uwd = function() {}
    ;
    Ia.prototype.Kod = function() {}
    ;
    Ia.prototype.Xuc = function(e, Ia) {
        var Xa = !!(f.AscDesktopEditor && 0 < f.AscDesktopEditor.CryptoMode);
        Xa && (f.FHc = !0);
        if (!this.w1d(e, Ia)) {
            e && this.$G(Sb.Gs, e);
            var Ta = Ia.AYc ? Ia.lSc ? ib.cjc : e === Ab.Kab ? ib.Kab : ib.nZd : ib.kf;
            Xa = "undefined" !== typeof ArrayBuffer && !Xa;
            var Va = {
                data: null,
                n3b: null,
                index: 0,
                count: 0
            }
              , $a = {
                c: "save"
            };
            $a.id = this.e_;
            $a.userid = this.yga;
            $a.tokenSession = this.ll.tFa();
            $a.outputformat = Ia.mlb;
            $a.title = AscCommon.ibf(this.Yqa, AscCommon.uhf(Ia.mlb), Asc.J$e);
            $a.nobase64 = Xa;
            ib.Kab === Ta && ($a.inline = 1);
            if (!this.Kod(e, Ia, $a, Va)) {
                var ob = this;
                this.qna = null;
                Ia.D9 || (this.qna = function(f, Ma) {
                    Ma = 403 === Ma ? y.pg.Ucc : y.pg.QN;
                    if (null != f && $a.c === f.type)
                        if ("ok" === f.status) {
                            if (f = f.data)
                                Ma = y.pg.HZ,
                                ob.dHd(f, Ta)
                        } else
                            Ma = AscCommon.wGb(parseInt(f.data), AscCommon.Fwb.lH);
                    y.pg.HZ !== Ma && (ob.uwd(),
                    ob.Oe("asc_onError", Ia.u3d || Ma, y.Lk.Vo));
                    e && ob.$x(Sb.Gs, e)
                }
                );
                AscCommon.i$d(function(e, f, y) {
                    AscCommon.B4b(ob, e, f, y)
                }, this.qna, Ia.D9, $a, Va)
            }
        }
    }
    ;
    Ia.prototype.u0e = function(e) {
        return this.Lnb.bhf(e)
    }
    ;
    Ia.prototype.V4e = function() {
        return this.OBa.Xif()
    }
    ;
    Ia.prototype.vRd = function() {
        this.IP || (this.P8b = !0)
    }
    ;
    Ia.prototype.Orc = function() {
        this.P8b = !1
    }
    ;
    Ia.prototype.S8e = function(e) {
        this.KSa = e
    }
    ;
    Ia.prototype.X3e = function() {
        return [AscCommon.Hgf, AscCommon.Igf]
    }
    ;
    Ia.prototype.Y3e = function() {
        return [AscCommon.Kgf, AscCommon.wgf]
    }
    ;
    Ia.prototype.npc = function() {}
    ;
    Ia.prototype.Tvb = function(e) {
        var f = this;
        this.Fa && (this.Fa.Aob = !1);
        AscCommon.Xid(this.e_, this.yga, this.ll.tFa(), function(y, Ia) {
            f.tqd(y, Ia, e)
        }, function(e) {
            y.pg.HZ !== e && f.Oe("asc_onError", e, y.Lk.Vo);
            f.$G(Sb.Gs, Ab.rda)
        })
    }
    ;
    Ia.prototype.tqd = function(e, f, Ia) {
        var Xa = this;
        y.pg.HZ !== e ? this.Oe("asc_onError", e, y.Lk.Vo) : (this.$G(Sb.Gs, Ab.rda),
        AscCommon.Ald(f, this.e_, this.yga, this.ll.tFa(), function(e, f) {
            y.pg.HZ !== e ? Xa.Oe("asc_onError", e, y.Lk.Vo) : Xa.npc(f, Ia);
            Xa.$x(Sb.Gs, Ab.rda)
        }))
    }
    ;
    Ia.prototype.Mrd = function() {}
    ;
    Ia.prototype.Brd = function(e, f) {
        e = this.tt.MK(AscCommon.iW(e), 1);
        null != e ? f(e) : this.Mrd(f)
    }
    ;
    Ia.prototype.frd = function(e, f) {
        function y() {
            Ia.$x(Sb.Gs, Ab.rda);
            f.apply(Ia, arguments)
        }
        var Ia = this;
        this.$G(Sb.Gs, Ab.rda);
        var Ta = AscCommon.tH.mca(e);
        Ta ? this.Brd(Ta, y) : AscCommon.u$(Ia, [e], function(e) {
            e[0] && null != e[0].path && "error" !== e[0].url && Ia.Brd(AscCommon.tH.d8a(e[0].path), y)
        }, this.Wy === $a.NK)
    }
    ;
    Ia.prototype.o_e = function(e) {
        if (!this.Ex) {
            var f = this
              , y = e.imgSrc
              , Ia = e.widthPix
              , Ta = e.heightPix
              , Va = e.width
              , $a = e.height
              , ib = e.data
              , Ma = e.guid;
            "string" === typeof y && 0 < y.length && "string" === typeof ib && "string" === typeof Ma && 0 < Ma.length && AscFormat.hb(Ia) && AscFormat.hb(Ta) && AscFormat.hb(Va) && AscFormat.hb($a) && this.frd(y, function(e) {
                f.drd(AscCommon.tH.mca(e.src), ib, Ma, Va, $a, Ia, Ta)
            })
        }
    }
    ;
    Ia.prototype.A_e = function(e) {
        if (!this.Ex) {
            var f = this
              , y = e.imgSrc
              , Ia = AscCommon.Fg.cg(e.objectId)
              , Ta = e.widthPix
              , Va = e.heightPix
              , $a = e.data;
            "string" === typeof y && 0 < y.length && "string" === typeof $a && Ia && AscFormat.hb(Ta) && AscFormat.hb(Va) && this.frd(y, function(e) {
                f.ird(Ia, AscCommon.tH.mca(e.src), $a, Ta, Va)
            })
        }
    }
    ;
    Ia.prototype.drd = function() {}
    ;
    Ia.prototype.ird = function() {}
    ;
    Ia.prototype.X7e = function(e) {
        this.jcc !== e && (this.jcc = e,
        this.yIf(e))
    }
    ;
    Ia.prototype.Xrd = function() {}
    ;
    Ia.prototype.erd = function() {}
    ;
    Ia.prototype.Wrd = function() {}
    ;
    Ia.prototype.jrd = function() {}
    ;
    Ia.prototype.hrd = function() {}
    ;
    Ia.prototype.grd = function() {}
    ;
    Ia.prototype.brd = function() {}
    ;
    Ia.prototype.R9e = function(e) {
        if (e.Uuc) {
            this.GHc && this.irc();
            var y = !0;
            null === this.Sfa ? this.Sfa = new f.Asc.l2f(e) : y = this.Sfa.update(e);
            y ? (this.QZe(),
            this.To.oHd(this.Sfa.Uuc),
            this.To.vyf(this.Sfa.url),
            this.bwd = this.Sfa.IMd,
            this.ssc(this.To),
            this.frc(this.Sfa)) : this.Sfa.e8b < e.e8b && (AscCommon.Kd.AHa(),
            editor.Sfa.jWc(editor),
            AscCommon.Kd.dHb())
        }
    }
    ;
    Ia.prototype.l2d = function() {}
    ;
    Ia.prototype.kRd = function() {
        var e = {
            codepage: AscCommon.CIb,
            encodings: AscCommon.cTd()
        };
        return new AscCommon.mWc(e)
    }
    ;
    Ia.prototype.YZe = function(e) {
        f.AscDesktopEditor && this.Spd(e) || (e || (e = new Asc.eQc),
        e.mlb = Asc.Gnb.WHb,
        this.Xuc(Ab.Kab, e))
    }
    ;
    Ia.prototype.tda = function(e, f) {
        var y = this
          , Ia = !1;
        this.I1 && this.pqc() && (this.MLa = !e,
        this.Ard() || AscCommon.History.AZ() || this.mpd() || this.d_ || this.Zxb ? this.r1d(f) && (this.I1 = !1,
        this.ll.G7a(function(e) {
            y.Lpd(e)
        }),
        Ia = !0) : this.MHc && this.MLa && this.j0a());
        return Ia
    }
    ;
    Ia.prototype.Ard = function() {
        return this.c2a
    }
    ;
    Ia.prototype.l0e = function() {
        return AscCommon.History.C9a()
    }
    ;
    Ia.prototype.k0e = function() {
        return AscCommon.History.DEb()
    }
    ;
    Ia.prototype.B5e = function() {
        return 0 == f.location.protocol.indexOf("file") ? !0 : !1
    }
    ;
    Ia.prototype.b2d = function(e) {
        return AscCommon.wyd(e)
    }
    ;
    Ia.prototype.V2a = function() {}
    ;
    Ia.prototype.Drf = function() {}
    ;
    Ia.prototype.VEd = function() {
        this.i6 && this.To && (this.To.MRa && this.FXe(),
        this.g3b(null))
    }
    ;
    Ia.prototype.g3b = function(e) {
        e && (this.j3b = e);
        this.i6 && this.To && this.j3b && this.KCd && (this.V2a(this.j3b),
        this.j3b = null)
    }
    ;
    Ia.prototype.gqc = function() {
        AscCommon.Fg.te();
        var e = this;
        AscCommon.lpe(this.Xe, function(f, y) {
            e.tqd(f, y)
        });
        AscFonts.Q5.Gu();
        this.J4 = AscCommon.TK;
        this.tt = AscCommon.Dgf;
        this.J4.BSa(this);
        this.tt.BSa(this);
        this.J4.rGe();
        this.Lnb = new AscCommon.Bfe;
        this.OBa = new AscCommon.fLe;
        AscFormat.iof();
        null !== this.iNc && this.w9(this.iNc);
        this.q7 = Asc.qef(this);
        this.f$ = new AscCommon.r1c;
        this.m1d();
        AscFonts.tp && this.Yqa && AscFonts.tp.jJ(this.Yqa)
    }
    ;
    Ia.prototype.m1d = function() {}
    ;
    Ia.prototype.fAf = function() {
        if (!this.SCd) {
            this.SCd = !0;
            for (var e = AscCommon.mIa.length, f = Array(e), y = [], Ia = 0; Ia < e; ++Ia)
                f[Ia] = new AscCommon.OZe,
                f[Ia].Ia = Ia,
                f[Ia].Image = AscCommon.mIa[Ia],
                y.push(AscCommon.mIa[Ia]);
            this.Wy === $a.Tl && y.push(AscCommon.Lgf);
            this.tt.a5a(y, function() {}, 0);
            this.Oe("asc_onInitStandartTextures", f)
        }
    }
    ;
    Ia.prototype.dAf = function() {
        this.LUc || ((new AscFormat.mee(this)).wkb(),
        this.LUc = !0)
    }
    ;
    Ia.prototype.HZc = function(e) {
        this.Oe("asc_onMathTypes", e)
    }
    ;
    Ia.prototype.L2f = function(e) {
        this.$x(Sb.tP, Ab.FH);
        e.Wke()
    }
    ;
    Ia.prototype.lhf = function() {
        var e = this.jJb();
        return e && e.Tf && e.Tf.RB
    }
    ;
    Ia.prototype.SZe = function() {
        var e = this.lhf();
        return e && "string" === typeof e.name ? e.name : ""
    }
    ;
    Ia.prototype.RZe = function() {
        var e = this.jJb();
        return e ? this.Gvc(e).index : -1
    }
    ;
    Ia.prototype.jJb = function() {
        return null
    }
    ;
    Ia.prototype.Gvc = function(e) {
        var f = AscCommon.dob.slice();
        var y = e.Pvc();
        var Ia = e.Tf && e.Tf.RB;
        var Ta = -1;
        if (Ia && (e = AscCommon.GWb(Ia, e),
        Ta = AscCommon.TWb(f, e),
        -1 === Ta && y.push(e),
        y.sort(function(e, f) {
            return "" === e.name || null === e.name ? -1 : "" === f.name || null === f.name || e.name > f.name ? 1 : e.name < f.name ? -1 : 0
        }),
        f = f.concat(y),
        -1 === Ta))
            for (y = 0; y < f.length; ++y)
                if (f[y] === e) {
                    Ta = y;
                    break
                }
        return {
            dJd: f,
            index: Ta
        }
    }
    ;
    Ia.prototype.p8b = function(e) {
        var f = AscCommon.p8b(e);
        f || (f = (e = this.Gvc(this.jJb()).dJd[e]) && e.scheme);
        return f
    }
    ;
    Ia.prototype.bAf = function(e) {
        this.Oe("asc_onSendThemeColorSchemes", this.Gvc(e).dJd)
    }
    ;
    Ia.prototype.i5b = function(e, y, Ia, Va) {
        if (f.AscDesktopEditor && f.AscDesktopEditor.MediaStart)
            switch (this.Wy) {
            case $a.$y:
                var Xa = this.Fa.sN;
                if (Xa.qo) {
                    var Ta = this.Fa.sN.qda;
                    if (0 <= Xa.vI && Xa.vI < Xa.WG && (!Ta || !Ta.IsPlaying())) {
                        var ib = Ta.Rect.lb
                          , ob = Xa.di.Wa.od;
                        Xa = Ta.Rect.x;
                        this.yda && (Xa += this.Fa.iaa.Xq.nf * AscCommon.NA >> 0);
                        ib /= ob * AscCommon.NA;
                        Va ? f.AscDesktopEditor.MediaStart(e, Xa, Ta.Rect.y, y, Ia, ib, Va.Nf, Va.Nj, Va.Kj, Va.jg, Va.Gb, Va.Ff) : f.AscDesktopEditor.MediaStart(e, Xa, Ta.Rect.y, y, Ia, ib)
                    }
                } else
                    Ta = this.Fa.xd.vy(0, 0, this.Fa.Wa.gc, null, !0),
                    Ta.ka += this.Fa.ka,
                    Ta.la += this.Fa.la,
                    Va ? f.AscDesktopEditor.MediaStart(e, Ta.ka, Ta.la, y, Ia, this.Fa.io / 100, Va.Nf, Va.Nj, Va.Kj, Va.jg, Va.Gb, Va.Ff) : f.AscDesktopEditor.MediaStart(e, Ta.ka, Ta.la, y, Ia, this.Fa.io / 100)
            }
    }
    ;
    Ia.prototype.uJb = function() {
        f.AscDesktopEditor && f.AscDesktopEditor.MediaEnd && f.AscDesktopEditor.MediaEnd()
    }
    ;
    Ia.prototype.Crd = function(e, f) {
        null != this.q7 && this.q7.register(e, f)
    }
    ;
    Ia.prototype.zFb = function(e, f, y) {
        null != this.q7 && this.q7.QF(e, f, y)
    }
    ;
    Ia.prototype.J5e = function(e) {
        null != this.q7 && this.q7.close(e)
    }
    ;
    Ia.prototype.Qrc = function(e) {
        null != this.q7 && this.q7.Mzf(e)
    }
    ;
    Ia.prototype.Prc = function(e) {
        null != this.q7 && this.q7.xtd(e)
    }
    ;
    Ia.prototype.I5e = function(e) {
        this.q7 && this.q7.Arf(e)
    }
    ;
    Ia.prototype.y8d = function() {
        return !0
    }
    ;
    Ia.prototype.xQc = function() {}
    ;
    Ia.prototype.aRc = function() {}
    ;
    Ia.prototype.asc_insertSymbol = function(f, y) {
        var Ia = [y];
        AscFonts.tp.elb(Ia, !0);
        y = [new AscFonts.dja(AscFonts.Q5.t6b(f),0,"",0,null)];
        AscFonts.tp.iIa(y);
        this.Aia = function() {
            switch (this.Wy) {
            case $a.Tl:
            case $a.$y:
                var e = new AscCommonWord.YSa;
                e.FQb(f);
                this.Fa.Wa.WNc(new AscCommon.EYd(Ia), e, !0);
                break;
            case $a.NK:
                this.WNc(f, Ia)
            }
        }
        ;
        !1 === AscCommon.TK.$pb(y) ? (this.Aia(),
        this.Aia = e) : AscCommon.TK.JRa(y)
    }
    ;
    Ia.prototype.asc_registerPlaceholderCallback = function(e, f) {
        this.Fa && this.Fa.xd && this.Fa.xd.VJa && this.Fa.xd.VJa.cRf(e, f)
    }
    ;
    Ia.prototype.asc_uncheckPlaceholders = function() {
        this.Fa && this.Fa.xd && this.Fa.xd.VJa && this.Fa.xd.VJa.qKf()
    }
    ;
    Ia.prototype.G5e = function() {
        this.ssc(new Asc.KZe)
    }
    ;
    Ia.prototype.hQc = function() {}
    ;
    Ia.prototype.jQc = function() {
        return !1
    }
    ;
    Ia.prototype.RTb = function() {}
    ;
    Ia.prototype.asc_nativeCheckPdfRenderer = function(e, f) {
        e.Sa = e.Copy;
        e.Qsa = e.ClearNoAttack;
        e.ra = e.WriteByte;
        e.Bb = e.WriteBool;
        e.cb = e.WriteLong;
        e.Ue = e.WriteDouble;
        e.aEa = e.WriteString;
        e.Rb = e.WriteString2;
        f.Sa = e.Copy;
        f.Qsa = e.ClearNoAttack;
        f.ra = e.WriteByte;
        f.Bb = e.WriteBool;
        f.cb = e.WriteLong;
        f.Ue = e.WriteDouble;
        f.aEa = e.WriteString;
        f.Rb = e.WriteString2;
        var y = new AscCommon.kLb;
        y.Memory = e;
        y.Uy = f;
        return y
    }
    ;
    Ia.prototype.J6a = function() {}
    ;
    Ia.prototype.XNc = function() {}
    ;
    Ia.prototype.hPc = function() {}
    ;
    Ia.prototype.gbb = function() {}
    ;
    Ia.prototype.Ntb = function() {}
    ;
    Ia.prototype.Pmb = function() {}
    ;
    Ia.prototype.p$a = function() {}
    ;
    Ia.prototype.SEb = function() {}
    ;
    Ia.prototype.xOd = function() {}
    ;
    Ia.prototype.setInputParams = function(e) {
        f.AscInputMethod = f.AscInputMethod || {};
        for (var y in e)
            f.AscInputMethod[y] = e[y]
    }
    ;
    Ia.prototype.grc = function() {}
    ;
    Ia.prototype.lac = function() {
        return []
    }
    ;
    Ia.prototype.Zqd = function() {}
    ;
    Ia.prototype.IZe = function(e) {
        var f = 50 * AscCommon.NA >> 0
          , y = 50 * AscCommon.NA >> 0
          , Ia = document.createElement("canvas");
        Ia.width = f;
        Ia.height = y;
        var Ta = Ia.getContext("2d");
        Ta.fillStyle = "#000000";
        Ta.strokeStyle = "#000000";
        Ta.font = "10pt 'Courier New'";
        Ta.lineWidth = 3;
        Ta.beginPath();
        y = (y >> 1) + .5;
        Ta.moveTo(0, y);
        Ta.lineTo(f, y);
        Ta.stroke();
        Ta.beginPath();
        Ta.lineWidth = 2;
        y -= 10;
        Ta.moveTo(10, y);
        Ta.lineTo(25, y - 10);
        Ta.lineTo(10, y - 20);
        Ta.stroke();
        Ta.beginPath();
        Ta.fillText(e.Frc(), 10, y + 25);
        Ta.fillText(e.Grc(), 10, y + 40);
        Ta.fillText(e.orc(), 10, y + 55);
        f = Ia.toDataURL("image/png");
        Ia = null;
        e = [AscCommon.RIa(), e.Frc(), e.Grc(), e.orc(), 50, 50, f];
        this.tt.a5a([f], function(e) {
            this.grc(e[0], e[1], e[2], e[3], e[4], e[5], e[6])
        }, e)
    }
    ;
    Ia.prototype.c4e = function() {
        for (var e = this.lac(), f = [], y, Ia = e.length - 1; 0 <= Ia; Ia--) {
            var Va = e[Ia];
            y = !1;
            for (var $a = this.nRa.length - 1; 0 <= $a; $a--)
                if (this.nRa[$a].Qz == Va.id) {
                    y = !0;
                    break
                }
            y || (y = new AscCommon.Xqd,
            y.Qz = Va.id,
            y.k5b = Va.lHa,
            y.Wca = Va.Wca,
            y.gca = Va.gca,
            f.push(y))
        }
        return f
    }
    ;
    Ia.prototype.i_e = function(e, y, Ia, Va) {
        f.AscDesktopEditor && f.AscDesktopEditor.Sign(e, y, Ia, Va)
    }
    ;
    Ia.prototype.b_e = function(e) {
        e = "unvisibleAdd" == e ? AscCommon.RIa() : e;
        f.asc_LocalRequestSign && f.asc_LocalRequestSign(e)
    }
    ;
    Ia.prototype.l_e = function(e) {
        f.AscDesktopEditor && f.AscDesktopEditor.ViewCertificate(parseInt("" + e))
    }
    ;
    Ia.prototype.c_e = function() {
        f.AscDesktopEditor && f.AscDesktopEditor.SelectCertificate()
    }
    ;
    Ia.prototype.TZe = function() {
        f.AscDesktopEditor && f.AscDesktopEditor.GetDefaultCertificate()
    }
    ;
    Ia.prototype.w4e = function() {
        return this.nRa
    }
    ;
    Ia.prototype.a_e = function(e) {
        f.AscDesktopEditor && f.AscDesktopEditor.RemoveSignature(e)
    }
    ;
    Ia.prototype.$Ze = function() {
        f.AscDesktopEditor && f.AscDesktopEditor.RemoveAllSignatures()
    }
    ;
    Ia.prototype.D5e = function() {
        return f.AscDesktopEditor && f.AscDesktopEditor.IsSignaturesSupport ? f.AscDesktopEditor.IsSignaturesSupport() : !1
    }
    ;
    Ia.prototype.C5e = function() {
        return f.AscDesktopEditor && f.AscDesktopEditor.IsProtectionSupport ? f.AscDesktopEditor.IsProtectionSupport() : !1
    }
    ;
    Ia.prototype.x5e = function(e) {
        f.AscDesktopEditor && f.asc_IsVisibleSign && f.asc_IsVisibleSign(e) && this.hRd && this.hRd(e)
    }
    ;
    Ia.prototype.v4e = function(e) {
        for (var f = this.lac(), y = f.length - 1; 0 <= y; y--) {
            var Ia = f[y];
            if (Ia.id == e) {
                e = new AscCommon.Xqd;
                e.Qz = Ia.id;
                e.k5b = Ia.lHa;
                e.Wca = Ia.Wca;
                e.gca = Ia.gca;
                e.Y1b = !0;
                for (Ia = 0; Ia < this.nRa.length; Ia++)
                    if (f = this.nRa[Ia],
                    f.Qz == e.Qz) {
                        e.valid = f.valid;
                        e.Y1b = !1;
                        break
                    }
                return e
            }
        }
        return null
    }
    ;
    Ia.prototype.u4e = function(e) {
        for (var f = this.nRa.length, y = 0; y < f; y++)
            if (this.nRa[y].Qz == e)
                return this.nRa[y].image;
        return ""
    }
    ;
    Ia.prototype.wrd = function() {
        return this.ll.tFa()
    }
    ;
    Ia.prototype.XZe = function() {
        AscCommon.Rn && (AscCommon.Rn.RO = null)
    }
    ;
    Ia.prototype.xtf = function(e) {
        if (e && e.type) {
            var f = {
                pageX: e.x,
                pageY: e.y
            };
            switch (e.type) {
            case "onbeforedrop":
                this.xQc(f);
                break;
            case "ondrop":
                this.aRc(),
                e.html ? this.pluginMethod_PasteHtml(e.html) : e.text && this.pluginMethod_PasteText(e.text)
            }
        }
    }
    ;
    Ia.prototype.Nif = function() {
        var e = {
            ka: 0,
            la: 0,
            W: 0,
            Jb: 0,
            RDa: 0
        };
        e.W = Math.max(document.documentElement.clientWidth, f.innerWidth || 0);
        e.Jb = Math.max(document.documentElement.clientHeight, f.innerHeight || 0);
        switch (this.Wy) {
        case $a.Tl:
            e.ka += this.Fa.ka;
            e.la += this.Fa.la;
            e.ka += this.Fa.dT.Xq.nf * AscCommon.NA;
            e.la += this.Fa.dT.Xq.wg * AscCommon.NA;
            e.ka += this.Fa.xd.RRa;
            e.la += this.Fa.xd.SRa;
            e.ka >>= 0;
            e.la >>= 0;
            e.RDa = this.Fa.xd.PJa * this.Fa.io * AscCommon.NA / 100 >> 0;
            break;
        case $a.$y:
            e.ka += this.Fa.ka;
            e.la += this.Fa.la;
            e.ka += this.Fa.iaa.Xq.nf * AscCommon.NA;
            e.la = this.Fa.Wa.kR ? e.la + this.Fa.Lra.Xq.wg * AscCommon.NA : e.la + this.Fa.dT.Xq.wg * AscCommon.NA;
            e.ka += this.Fa.xd.RRa;
            e.la += this.Fa.xd.SRa;
            e.ka >>= 0;
            e.la >>= 0;
            e.RDa = this.Fa.xd.PJa * this.Fa.io * AscCommon.NA / 100 >> 0;
            break;
        case $a.NK:
            var y = this.kQc().nrd().vrd();
            if (this.lRd()) {
                var Ia = this.td.Mz;
                e.ka = Ia.L5f;
                e.la = Ia.M5f;
                e.RDa = Ia.K5f;
                Ia = Ia.cursor
            } else if (Asc.nna.gkc === y || Asc.nna.fkc === y)
                Ia = this.td.Yf().Hg.controller.Zq,
                e.ka = Ia.RRa,
                e.la = Ia.SRa,
                e.RDa = Ia.PJa * this.tWc() * AscCommon.NA,
                Ia = this.Xe;
            Ia && (Ia = jQuery(Ia).offset()) && (e.ka += Ia.left,
            e.la += Ia.top);
            e.ka >>= 0;
            e.la >>= 0;
            e.RDa >>= 0
        }
        return e
    }
    ;
    Ia.prototype.Pia = function() {}
    ;
    Ia.prototype.AIa = function() {}
    ;
    Ia.prototype.m6a = function() {}
    ;
    Ia.prototype.YSd = function() {
        return []
    }
    ;
    Ia.prototype.DN = function() {}
    ;
    Ia.prototype.ZZe = function() {
        AscCommon.Rn && AscCommon.Rn.qwd(46)
    }
    ;
    Ia.prototype.RGe = function(e) {
        AscCommon.Wnc = e;
        AscCommon.Rn && AscCommon.Rn.ELd(AscCommon.Wnc)
    }
    ;
    Ia.prototype.Dne = function() {
        return AscCommon.Wnc
    }
    ;
    Ia.prototype.iRd = function() {}
    ;
    Ia.prototype.ard = function() {}
    ;
    Ia.prototype.ACd = function() {
        return 0 == this.hIc || this.q7 && this.q7.Wof() || this.K8b || !this.I1 || !this.pqc() ? 0 : (new Date).getTime() - this.hIc
    }
    ;
    Ia.prototype.gIa = function() {
        this.hIc = (new Date).getTime()
    }
    ;
    Ia.prototype.QKd = function(e) {
        this.Oe("asc_onCoAuthoringDisconnect", e);
        this.VZa(!0)
    }
    ;
    Ia.prototype.q8e = function(f) {
        this.cSa = f;
        this.tda(!1, e, !0)
    }
    ;
    Ia.prototype.V7e = function() {
        this.cSa = "";
        this.tda(!1, e, !0)
    }
    ;
    Ia.prototype.f9e = function(e) {
        if (!this.f$ || !0 === AscCommon.Kd.Tna())
            return !0;
        AscCommon.Kd.P6b();
        this.f$.Kfe();
        if (this.Wy == AscCommon.bs.NK) {
            var f = Asc.editor.td.Yf().Hg.xv;
            f.c7(this.f$.rb());
            var y = this;
            f.daa(function(f) {
                f && (AscCommon.History.uh(AscDFH.Zwc),
                y.f$.ztb(e))
            })
        } else
            !1 === AscCommon.Kd.VHb(!1) && (AscCommon.History.uh(AscDFH.Zwc),
            this.f$.ztb(e))
    }
    ;
    Ia.prototype.k3e = function() {
        return this.f$.fpa()
    }
    ;
    Ia.prototype.urd = function() {
        return 0
    }
    ;
    Ia.prototype.dJf = function(e, f, y) {
        var Ia = new FileReader;
        Ia.onload = Ia.onerror = function(e) {
            e = e.target.result ? e.target.result : "";
            f instanceof Asc.gQc ? y(AscCommon.sSc(e, f)) : y(e.match(/[^\r\n]+/g))
        }
        ;
        for (var Xa = "UTF-8", Ta = f.HTa(), Va = AscCommon.Hwb.length, $a = 0; $a < Va; ++$a)
            if (AscCommon.Hwb[$a][0] == Ta) {
                Xa = AscCommon.Hwb[$a][2];
                break
            }
        Ia.readAsText(new Blob([e]), Xa)
    }
    ;
    Ia.prototype.vhf = function() {
        var e = null
          , f = null;
        if (this.Wy === AscCommon.bs.Tl && this.Fa && this.Fa.Wa && this.Fa.Wa.HRa()) {
            var y = 1 === this.Fa.Wa.kJa.mode ? !0 : !1;
            e = function(e) {
                e.Fa.Wa.v7a();
                e.ZIf()
            }
            ;
            f = function(e) {
                e.RIf(y);
                e.Fa.Wa.q$a(!1)
            }
        }
        e && e(this);
        e = this.F5e();
        f && f(this);
        return e
    }
    ;
    Ia.prototype.asc_isSupportFeature = function(e) {
        return f.Asc && f.Asc.Addons && !0 === f.Asc.Addons[e] ? !0 : !1
    }
    ;
    Ia.prototype.asc_setDefaultBlitMode = function(e) {
        AscFonts.uAf(e)
    }
    ;
    Ia.prototype.attachEvent = function(f, y, Ia) {
        this.RPa.hasOwnProperty(f) || (this.RPa[f] = {});
        this.RPa[f]["" + (e === Ia ? 0 : Ia)] = y
    }
    ;
    Ia.prototype.detachEvent = function(f, y) {
        if (this.RPa.hasOwnProperty(f)) {
            var Ia = this.RPa[f];
            y = "" + (e === y ? 0 : y);
            Ia[y] && delete Ia[y];
            0 === Object.getOwnPropertyNames(Ia).length && delete this.RPa[f]
        }
    }
    ;
    Ia.prototype.cAf = function() {
        var e = arguments[0];
        if (this.RPa.hasOwnProperty(e)) {
            e = this.RPa[e];
            for (var y in e)
                e[y].apply(this || f, Array.prototype.slice.call(arguments, 1))
        }
        return !1
    }
    ;
    Ia.prototype.asc_onShowPopupWindow = function() {
        this.uJb()
    }
    ;
    f.AscCommon = f.AscCommon || {};
    f.AscCommon.Cnb = Ia;
    var kb = Ia.prototype;
    kb.asc_loadFontsFromServer = kb.E5e;
    kb.asc_selectSearchingResults = kb.X7e;
    kb.asc_showRevision = kb.R9e;
    kb.asc_getAdvancedOptions = kb.kRd;
    kb.asc_Print = kb.YZe;
    kb.asc_GetCurrentColorSchemeName = kb.SZe;
    kb.asc_GetCurrentColorSchemeIndex = kb.RZe;
    kb.asc_isCrypto = kb.z5e
}
)(window);
"use strict";
(function(f, e) {
    var Ia = f.AscCommon.Cnb;
    Ia.prototype.pluginMethod_AddOleObject = function(e) {
        return this.o_e(e)
    }
    ;
    Ia.prototype.pluginMethod_EditOleObject = function(e) {
        return this.A_e(e)
    }
    ;
    Ia.prototype.pluginMethod_GetFontList = function() {
        return AscFonts.Q5.dJb.iEe()
    }
    ;
    Ia.prototype.pluginMethod_InputText = function(e, f) {
        if (!this.Ex && AscCommon.Rn) {
            var Ia = [];
            for (e = e.aR(); e.check(); e.next())
                Ia.push(e.value());
            if (f)
                for (e = 0; e < f.length; e++)
                    AscCommon.Rn.qwd(8);
            AscCommon.Rn.Uqc(Ia);
            AscCommon.Rn.cya = ""
        }
    }
    ;
    Ia.prototype.pluginMethod_PasteHtml = function(f) {
        if (!AscCommon.p3)
            return null;
        var Ia = document.getElementById("pmpastehtml");
        if (!Ia) {
            Ia = document.createElement("div");
            Ia.id = "pmpastehtml";
            if (this.Wy == AscCommon.bs.Tl || this.Wy == AscCommon.bs.$y) {
                var $a = this.E4d();
                $a && (e !== $a.mb.Vb && (Ia.style.fontSize = $a.mb.Vb + "pt"),
                Ia.style.fontWeight = !0 === $a.mb.ud ? "bold" : "normal",
                Ia.style.fontStyle = !0 === $a.mb.bf ? "italic" : "normal",
                $a = $a.mb.va,
                Ia.style.color = $a ? "rgb(" + $a.r + "," + $a.vb + "," + $a.Xa + ")" : "rgb(0,0,0)")
            } else
                this.Wy == AscCommon.bs.NK && ($a = this.kQc()) && $a.font && (e != $a.font.size && (Ia.style.fontSize = $a.font.size + "pt"),
                Ia.style.fontWeight = !0 === $a.font.bold ? "bold" : "normal",
                Ia.style.fontStyle = !0 === $a.font.$Hc ? "italic" : "normal");
            Ia.innerHTML = f;
            document.body.appendChild(Ia);
            this.Blb();
            var y = AscCommon.p3.ynb;
            AscCommon.p3.ynb = !0;
            this.sJa(AscCommon.wt.Xe, Ia);
            this.ilb();
            f = function() {
                document.body.removeChild(Ia);
                Ia = null;
                AscCommon.p3.ynb = y
            }
            ;
            this.bSd(f, null) && f()
        }
    }
    ;
    Ia.prototype.pluginMethod_PasteText = function(e) {
        if (!AscCommon.p3)
            return null;
        this.sJa(AscCommon.wt.Text, e)
    }
    ;
    Ia.prototype.pluginMethod_GetMacros = function() {
        return this.k3e()
    }
    ;
    Ia.prototype.pluginMethod_SetMacros = function(e) {
        return this.f9e(e)
    }
    ;
    Ia.prototype.pluginMethod_StartAction = function(e, f) {
        this.$G("Block" == e ? Asc.vE.Gs : Asc.vE.tP, f)
    }
    ;
    Ia.prototype.pluginMethod_EndAction = function(Ia, Va, ib) {
        this.$x("Block" == Ia ? Asc.vE.Gs : Asc.vE.tP, Va);
        f.AscDesktopEditor && null != ib && "" != ib ? (f.AscDesktopEditor.IsLocalFile() ? (this.Oe("asc_onError", "Encryption error: " + ib + ". End-to-end encryption mode is disabled.", c_oAscError.Lk.Vo),
        f.AscDesktopEditor.CryptoMode = 0,
        e !== f.Nic && (AscCommon.History.Tza = f.Nic,
        this.Wy == AscCommon.bs.NK ? this.YEd(AscCommon.History.AZ()) : this.WHa())) : (this.Oe("asc_onError", "Encryption error: " + ib + ". The file was not compiled.", c_oAscError.Lk.IU),
        f.AscDesktopEditor.CryptoMode = 0),
        f.Nic = e,
        setTimeout(function() {
            f.AscDesktopEditor.buildCryptedEnd(!1)
        }, 500)) : (f.Nic = e,
        this.zpc && this.zpc.call(this))
    }
    ;
    Ia.prototype.pluginMethod_OnEncryption = function(Ia) {
        var Va = f.Asc.editor ? f.Asc.editor : f.editor;
        switch (Ia.type) {
        case "generatePassword":
            if ("" == Ia.password) {
                Va.Oe("asc_onError", "There is no connection with the blockchain", c_oAscError.Lk.IU);
                break
            }
            if ("no_build" === Ia.error) {
                f.AscDesktopEditor.buildCryptedEnd(!0);
                break
            }
            var $a = Va.vhf();
            AscCommon.WD.Fbc = !0;
            Va.Dvd = Ia.docinfo;
            f.AscDesktopEditor.buildCryptedStart($a.data, $a.header, Ia.password, Ia.docinfo ? Ia.docinfo : "");
            break;
        case "getPasswordByFile":
            "" != Ia.password ? ($a = "<m_sPassword>" + AscCommon.k4c(Ia.password) + "</m_sPassword>",
            Va.cSa = Ia.password,
            Va.RQc = Ia.hash,
            Va.SQc = Ia.docinfo,
            AscCommon.WD.Fbc = !0,
            f.S1b ? f.AscDesktopEditor.NativeViewerOpen(Ia.password) : f.AscDesktopEditor.SetAdvancedOptions($a)) : this.Ocb(e, !0);
            break;
        case "encryptData":
        case "decryptData":
            AscCommon.WD.azf(Ia)
        }
    }
    ;
    Ia.prototype.pluginMethod_SetProperties = function(e) {
        if (e)
            for (var f in e)
                switch (f) {
                case "copyoutenabled":
                    this.pvd = e[f];
                    break;
                case "watermark_on_draw":
                    this.LP = e[f] ? new AscCommon.W1c(e[f],this) : null;
                    this.LP.Hbf();
                    break;
                case "hideContentControlTrack":
                    this.Wy === AscCommon.bs.Tl && this.Fa && this.Fa.Wa && this.Fa.Wa.oFe(e[f]);
                    break;
                case "disableAutostartMacros":
                    this.Xvd = !0
                }
    }
    ;
    Ia.prototype.pluginMethod_ShowInputHelper = function(e, f, Ia, y) {
        var Va = document.getElementById("iframe_" + e);
        if (Va) {
            var $a = this.Nif();
            f > $a.W && (f = $a.W);
            Ia > $a.Jb && (Ia = $a.Jb);
            var ib = $a.ka + 10 + f
              , Ta = $a.la - 10 - Ia
              , ob = $a.la + $a.RDa + 10 + Ia
              , Xa = $a.ka + 10;
            ib > $a.W && (Xa += $a.W - ib);
            ob < $a.Jb ? ib = $a.la + $a.RDa + 10 : 0 < Ta ? ib = Ta : (ib = $a.la + $a.RDa + 10,
            Ia += $a.Jb - ob);
            Va.style.left = Xa + "px";
            Va.style.top = ib + "px";
            Va.style.width = f + "px";
            Va.style.height = Ia + "px";
            Va.style.zIndex = this.IP ? 5001 : 1E3;
            Va.style.boxShadow || (Va.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.175)",
            Va.style.webkitBoxShadow = "0 6px 12px rgba(0, 0, 0, 0.175)");
            y ? (Va.setAttribute("oo_editor_input", "true"),
            Va.focus()) : (Va.removeAttribute("oo_editor_input"),
            AscCommon.Rn && (AscCommon.Rn.SHc = !0,
            AscCommon.Rn.Uo.focus()));
            AscCommon.Rn && (AscCommon.Rn.QHc = !0,
            AscCommon.Rn.bhb[e] = !0)
        }
    }
    ;
    Ia.prototype.pluginMethod_UnShowInputHelper = function(e, f) {
        var Ia = document.getElementById("iframe_" + e);
        if (Ia) {
            Ia.style.width = "10px";
            Ia.style.height = "10px";
            Ia.removeAttribute("oo_editor_input");
            Ia.style.zIndex = -1E3;
            if (AscCommon.Rn && AscCommon.Rn.Uo) {
                AscCommon.Rn.Uo.focus();
                AscCommon.Rn.bhb[e] && delete AscCommon.Rn.bhb[e];
                e = 0;
                for (var y in AscCommon.Rn.bhb)
                    AscCommon.Rn.bhb[y] && e++;
                AscCommon.Rn.QHc = 0 != e
            }
            AscCommon.Rn && f && (AscCommon.Rn.cya = "")
        }
    }
}
)(window);
"use strict";
(function(f, e) {
    function Ia(y) {
        y ? (this.va = y.ab && y.ab.fill && y.ab.fill.type === f.Asc.Iy.nC && y.ab.fill.color ? AscCommon.tqb(y.ab.fill.color) : e != y.va && null != y.va ? AscCommon.QIa(y.va.r, y.va.vb, y.va.Xa) : null,
        this.pa = e != y.pa ? y.pa : null) : (this.va = AscCommon.QIa(0, 0, 0),
        this.pa = 1)
    }
    function $a(f) {
        f ? (this.He = e === f.He ? Asc.$ta.sx : f.He,
        this.yq = e === f.yq ? !1 : f.yq,
        this.Ze = e === f.Ze ? e : f.Ze,
        this.pa = e === f.pa ? 0 : f.pa) : (this.He = Asc.$ta.Sq,
        this.yq = !1,
        this.Ze = e,
        this.pa = 0)
    }
    function Va(f) {
        f ? (this.He = e === f.He ? Asc.aua.Text : f.He,
        this.yq = e === f.yq ? !1 : f.yq,
        this.Ze = e === f.Ze ? e : f.Ze,
        this.pa = e === f.pa ? 0 : f.pa) : (this.He = Asc.aua.Text,
        this.yq = !1,
        this.Ze = e,
        this.pa = 0)
    }
    function ib(f) {
        this.kKa = this.NIa = this.Su = this.OLa = this.dw = this.TIa = !1;
        f && (this.TIa = e === f.vca ? !1 : f.vca,
        this.dw = e === f.n6 ? !1 : f.n6,
        this.OLa = e === f.Xga ? !1 : f.Xga,
        this.Su = e === f.wca ? !1 : f.wca,
        this.NIa = e === f.Sla ? !1 : f.Sla,
        this.kKa = e === f.Gra ? !1 : f.Gra)
    }
    function y(f) {
        f ? (this.G3 = e != f.G3 ? f.G3 : !1,
        this.lia = e != f.lia ? f.lia : !1,
        this.lia = e != f.lia ? f.lia : !1,
        this.Bwa = e != f.Bwa ? f.Bwa : null,
        this.Nfa = e != f.Nfa ? f.Nfa : null,
        this.THa = e != f.THa && null != f.THa ? new Asc.ldb(f.THa) : null,
        this.jo = e != f.jo && null != f.jo ? new Sb(f.jo) : null,
        this.MDa = e != f.MDa ? f.MDa : null,
        this.ODa = e != f.ODa ? f.ODa : null,
        this.QDa = e != f.QDa ? f.QDa : null,
        this.Awa = e != f.Awa && null != f.Awa ? new Asc.ldb(f.Awa) : null,
        this.$c = e != f.$c && null != f.$c ? new Ab(f.$c) : null,
        this.sq = e != f.sq && null != f.sq ? new Ab(f.sq) : null,
        this.PX = e != f.PX && null != f.PX ? new Ia(f.PX) : null,
        this.Vt = e != f.Vt && null != f.Vt ? new Ia(f.Vt) : null,
        this.we = e != f.we && null != f.we ? new Asc.zYd(f.we) : null,
        this.Cf = e != f.Cf && null != f.Cf ? new $a(f.Cf) : e,
        this.Ef = e != f.Ef && null != f.Ef ? new Va(f.Ef) : e,
        this.Mu = e != f.Mu ? f.Mu : e,
        this.w$a = e != f.w$a ? f.w$a : !0,
        this.Sw = e != f.Sw ? f.Sw : null,
        this.oJ = e != f.oJ ? new ib(f.oJ) : null,
        this.uMa = e !== f.uMa ? f.uMa : !1,
        this.U6 = e != f.U6 ? f.U6 : c_oAscVertAlignJc.Oa,
        this.Bz = e != f.Bz ? f.Bz : e,
        this.Ay = f.Ay,
        this.Lea = f.Lea,
        this.$Ba = f.$Ba,
        this.wKa = f.wKa,
        this.Tpb = f.Tpb,
        this.eo = e != f.eo ? f.eo : !1,
        this.akc = f.akc,
        this.aG = f.aG,
        this.$F = f.$F,
        this.Q9a = f.Q9a,
        this.Z6 = f.Z6) : this.eo = this.lia = !1
    }
    function Ab(f) {
        f && (this.Ba = e != f.Ba && null != f.Ba ? new Asc.Nka(f.Ba) : null,
        this.Oa = e != f.Oa && null != f.Oa ? new Asc.Nka(f.Oa) : null,
        this.Ra = e != f.Ra && null != f.Ra ? new Asc.Nka(f.Ra) : null,
        this.Ta = e != f.Ta && null != f.Ta ? new Asc.Nka(f.Ta) : null,
        this.fk = e != f.fk && null != f.fk ? new Asc.Nka(f.fk) : null,
        this.sk = e != f.sk && null != f.sk ? new Asc.Nka(f.sk) : null)
    }
    function Sb(f) {
        f ? (this.Ba = e != f.Ba ? f.Ba : null,
        this.Ra = e != f.Ra ? f.Ra : null,
        this.Oa = e != f.Oa ? f.Oa : null,
        this.Ta = e != f.Ta ? f.Ta : null,
        this.If = e != f.If ? f.If : null) : this.If = this.Ta = this.Oa = this.Ra = this.Ba = null
    }
    function kb(f) {
        f ? (this.Hp = e != f.Hp ? f.Hp : null,
        this.$b = e != f.$b && null != f.$b ? new Asc.oWc(f.$b) : null,
        this.Me = e != f.Me ? f.Me : null,
        this.Kn = e != f.Kn ? f.Kn : null,
        this.Zn = e != f.Zn ? f.Zn : null,
        this.Lp = e != f.Lp ? f.Lp : null,
        this.dc = e != f.dc && null != f.dc ? new AscCommon.PTb(f.dc) : null,
        this.Pb = e != f.Pb && null != f.Pb ? new Asc.pWc(f.Pb) : null,
        this.Op = e != f.Op ? f.Op : null,
        this.ug = f.ug,
        this.Ts = e !== f.Ts ? f.Ts : 0) : (this.Hp = !1,
        this.$b = new Asc.oWc,
        this.Me = AscCommon.Gr,
        this.Lp = this.Zn = this.Kn = !1,
        this.dc = new AscCommon.PTb,
        this.Pb = new Asc.pWc,
        this.Op = !0,
        this.ug = null,
        this.Ts = 0)
    }
    function Ta(f) {
        f ? (this.ud = e != f.ud ? f.ud : null,
        this.bf = e != f.bf ? f.bf : null,
        this.lj = e != f.lj ? f.lj : null,
        this.fj = e != f.fj ? f.fj : null,
        this.wf = e != f.wf && null != f.wf ? new AscCommon.wFb(f.wf) : new AscCommon.wFb({
            Ja: "",
            za: -1
        }),
        this.Vb = e != f.Vb ? f.Vb : null,
        this.va = e != f.va && null != f.va ? AscCommon.QIa(f.va.r, f.va.vb, f.va.Xa) : null,
        this.zj = e != f.zj ? f.zj : null,
        this.xh = e != f.xh ? f.xh == AscCommonWord.vbc ? f.xh : new AscCommon.BM(f.xh.r,f.xh.vb,f.xh.Xa) : null,
        this.Fj = e != f.Fj ? f.Fj : null,
        this.dc = e != f.dc ? f.dc : null,
        this.hn = e != f.hn ? f.hn : null,
        this.gl = e != f.gl ? f.gl : null,
        this.Uf = e != f.Uf ? f.Uf.Jc : null) : (this.fj = this.lj = this.bf = this.ud = !1,
        this.wf = new AscCommon.wFb,
        this.Vb = 12,
        this.va = AscCommon.QIa(0, 0, 0),
        this.zj = AscCommon.fR,
        this.xh = AscCommonWord.vbc,
        this.Fj = !1,
        this.dc = 0,
        this.gl = this.hn = !1,
        this.Uf = null)
    }
    function ob(f, y) {
        this.Ib = e != f && null != f ? new kb(f) : null;
        this.mb = e != y && null != y ? new Ta(y) : null
    }
    function Xa(f) {
        f ? (this.zXb = e != f.zXb ? f.zXb : null,
        this.n6a = e != f.n6a ? f.n6a : null,
        this.ka = e != f.ka ? f.ka : null,
        this.la = e != f.la ? f.la : null,
        this.level = e != f.level ? f.level : null) : this.level = this.la = this.ka = this.n6a = this.zXb = null
    }
    function kc() {
        this.Ri = !0;
        this.vXa = this.wXa = -1;
        this.Ug = [];
        this.mQb = this.sPb = !0;
        this.$bb = e;
        this.Fnc = Asc.UU.hM;
        this.jw = null
    }
    function Cc() {
        this.Ja = "";
        this.ea = Asc.F3f.Ua;
        this.aP = this.LI = e;
        this.Dnc = ""
    }
    function Pb() {
        this.ae = "";
        this.tc = Array(9);
        for (var e = 0; 9 > e; ++e)
            this.tc[e] = new Bb(e)
    }
    function ic(f, y) {
        this.ea = e !== f ? f : Asc.K7a.Text;
        this.pa = e !== y ? y : ""
    }
    function Bb(e) {
        this.pse = e;
        this.Ck = Asc.ag.vf;
        this.Text = [];
        this.mb = new AscCommonWord.YSa;
        this.Ib = new AscCommonWord.uee;
        this.Mb = 1;
        this.pI = -1;
        this.VJ = Asc.a_.OX;
        this.Ze = AscCommon.Gr
    }
    function Ma() {
        this.ea = Asc.Yka.kf;
        this.Uc = this.BMb = this.mbb = this.Am = this.o$c = this.Opacity = this.mb = this.Text = null
    }
    function cb() {
        this.IC = this.Zw = this.Ja = null;
        this.ggc = this.Ji = !1;
        this.Ck = Asc.ag.sB;
        this.Uhc = !1;
        this.YNb = null;
        this.Upa = ":";
        this.Document = null
    }
    Ia.prototype.oJb = function() {
        return this.va
    }
    ;
    Ia.prototype.Vib = function(e) {
        this.va = e ? e : null
    }
    ;
    Ia.prototype.xQ = function() {
        return this.pa
    }
    ;
    Ia.prototype.kP = function(e) {
        this.pa = e
    }
    ;
    f.Asc.CBackground = f.Asc.Xig = Ia;
    Ia.prototype.get_Color = Ia.prototype.oJb;
    Ia.prototype.put_Color = Ia.prototype.Vib;
    Ia.prototype.get_Value = Ia.prototype.xQ;
    Ia.prototype.put_Value = Ia.prototype.kP;
    $a.prototype.G0a = function() {
        return this.He
    }
    ;
    $a.prototype.QGa = function(e) {
        this.He = e
    }
    ;
    $a.prototype.H0a = function() {
        return this.yq
    }
    ;
    $a.prototype.WJa = function(e) {
        this.yq = e
    }
    ;
    $a.prototype.Kga = function() {
        return this.Ze
    }
    ;
    $a.prototype.kaa = function(e) {
        this.Ze = e
    }
    ;
    $a.prototype.xQ = function() {
        return this.pa
    }
    ;
    $a.prototype.kP = function(e) {
        this.pa = e
    }
    ;
    Va.prototype.G0a = function() {
        return this.He
    }
    ;
    Va.prototype.QGa = function(e) {
        this.He = e
    }
    ;
    Va.prototype.H0a = function() {
        return this.yq
    }
    ;
    Va.prototype.WJa = function(e) {
        this.yq = e
    }
    ;
    Va.prototype.Kga = function() {
        return this.Ze
    }
    ;
    Va.prototype.kaa = function(e) {
        this.Ze = e
    }
    ;
    Va.prototype.xQ = function() {
        return this.pa
    }
    ;
    Va.prototype.kP = function(e) {
        this.pa = e
    }
    ;
    f.Asc.CTablePositionH = $a;
    $a.prototype.get_RelativeFrom = $a.prototype.G0a;
    $a.prototype.put_RelativeFrom = $a.prototype.QGa;
    $a.prototype.get_UseAlign = $a.prototype.H0a;
    $a.prototype.put_UseAlign = $a.prototype.WJa;
    $a.prototype.get_Align = $a.prototype.Kga;
    $a.prototype.put_Align = $a.prototype.kaa;
    $a.prototype.get_Value = $a.prototype.xQ;
    $a.prototype.put_Value = $a.prototype.kP;
    f.Asc.CTablePositionV = Va;
    Va.prototype.get_RelativeFrom = Va.prototype.G0a;
    Va.prototype.put_RelativeFrom = Va.prototype.QGa;
    Va.prototype.get_UseAlign = Va.prototype.H0a;
    Va.prototype.put_UseAlign = Va.prototype.WJa;
    Va.prototype.get_Align = Va.prototype.Kga;
    Va.prototype.put_Align = Va.prototype.kaa;
    Va.prototype.get_Value = Va.prototype.xQ;
    Va.prototype.put_Value = Va.prototype.kP;
    ib.prototype.yjf = function() {
        return this.TIa
    }
    ;
    ib.prototype.cxf = function(e) {
        this.TIa = e
    }
    ;
    ib.prototype.zjf = function() {
        return this.dw
    }
    ;
    ib.prototype.dxf = function(e) {
        this.dw = e
    }
    ;
    ib.prototype.ekf = function() {
        return this.OLa
    }
    ;
    ib.prototype.Hxf = function(e) {
        this.OLa = e
    }
    ;
    ib.prototype.fkf = function() {
        return this.Su
    }
    ;
    ib.prototype.Ixf = function(e) {
        this.Su = e
    }
    ;
    ib.prototype.bjf = function() {
        return this.NIa
    }
    ;
    ib.prototype.Jwf = function(e) {
        this.NIa = e
    }
    ;
    ib.prototype.cjf = function() {
        return this.kKa
    }
    ;
    ib.prototype.Kwf = function(e) {
        this.kKa = e
    }
    ;
    f.Asc.CTablePropLook = f.Asc.Q1c = ib;
    ib.prototype.get_FirstCol = ib.prototype.yjf;
    ib.prototype.put_FirstCol = ib.prototype.cxf;
    ib.prototype.get_FirstRow = ib.prototype.zjf;
    ib.prototype.put_FirstRow = ib.prototype.dxf;
    ib.prototype.get_LastCol = ib.prototype.ekf;
    ib.prototype.put_LastCol = ib.prototype.Hxf;
    ib.prototype.get_LastRow = ib.prototype.fkf;
    ib.prototype.put_LastRow = ib.prototype.Ixf;
    ib.prototype.get_BandHor = ib.prototype.bjf;
    ib.prototype.put_BandHor = ib.prototype.Jwf;
    ib.prototype.get_BandVer = ib.prototype.cjf;
    ib.prototype.put_BandVer = ib.prototype.Kwf;
    y.prototype.cYc = function() {
        return this.Bwa
    }
    ;
    y.prototype.CWd = function(e) {
        this.Bwa = e
    }
    ;
    y.prototype.ffb = function() {
        return this.Nfa
    }
    ;
    y.prototype.c4b = function(e) {
        this.Nfa = e
    }
    ;
    y.prototype.wjf = function() {
        return this.THa
    }
    ;
    y.prototype.$wf = function(e) {
        this.THa = e
    }
    ;
    y.prototype.gjf = function() {
        return this.jo
    }
    ;
    y.prototype.Owf = function(e) {
        this.jo = e
    }
    ;
    y.prototype.Fkf = function() {
        return this.MDa
    }
    ;
    y.prototype.hyf = function(e) {
        this.MDa = e
    }
    ;
    y.prototype.Kkf = function() {
        return this.ODa
    }
    ;
    y.prototype.myf = function(e) {
        this.ODa = e
    }
    ;
    y.prototype.Pkf = function() {
        return this.QDa
    }
    ;
    y.prototype.ryf = function(e) {
        this.QDa = e
    }
    ;
    y.prototype.Nkf = function() {
        return this.Awa
    }
    ;
    y.prototype.pyf = function(e) {
        this.Awa = e
    }
    ;
    y.prototype.Hkf = function() {
        return this.$c
    }
    ;
    y.prototype.jyf = function(e) {
        this.$c = e
    }
    ;
    y.prototype.fjf = function() {
        return this.sq
    }
    ;
    y.prototype.Nwf = function(e) {
        this.sq = e
    }
    ;
    y.prototype.Gkf = function() {
        return this.PX
    }
    ;
    y.prototype.iyf = function(e) {
        this.PX = e
    }
    ;
    y.prototype.ijf = function() {
        return this.Vt
    }
    ;
    y.prototype.Qwf = function(e) {
        this.Vt = e
    }
    ;
    y.prototype.obc = function() {
        return this.we
    }
    ;
    y.prototype.dcc = function(e) {
        this.we = e
    }
    ;
    y.prototype.wTd = function() {
        return this.Cf
    }
    ;
    y.prototype.AWd = function(e) {
        this.Cf = e
    }
    ;
    y.prototype.xTd = function() {
        return this.Ef
    }
    ;
    y.prototype.BWd = function(e) {
        this.Ef = e
    }
    ;
    y.prototype.yTd = function(f) {
        return e != this.Mu ? this.Mu.ZSa(f) : 0
    }
    ;
    y.prototype.zTd = function(f) {
        return e != this.Mu ? this.Mu.$Sa(f) : 0
    }
    ;
    y.prototype.Djf = function() {
        return this.w$a
    }
    ;
    y.prototype.gxf = function(e) {
        this.w$a = e
    }
    ;
    y.prototype.Pwf = function(e) {
        this.lia = e
    }
    ;
    y.prototype.hjf = function() {
        return this.lia
    }
    ;
    y.prototype.uTd = function() {
        return this.G3
    }
    ;
    y.prototype.ykf = function() {
        return this.uMa
    }
    ;
    y.prototype.Zxf = function(e) {
        this.uMa = e
    }
    ;
    y.prototype.XXc = function() {
        return this.eo
    }
    ;
    y.prototype.ljf = function() {
        return this.U6
    }
    ;
    y.prototype.a4b = function(e) {
        this.U6 = e
    }
    ;
    y.prototype.Mkf = function() {
        return this.oJ
    }
    ;
    y.prototype.oyf = function(e) {
        this.oJ = e
    }
    ;
    y.prototype.Okf = function() {
        return this.Sw
    }
    ;
    y.prototype.qyf = function(e) {
        this.Sw = e
    }
    ;
    y.prototype.tTd = function() {
        return this.Bz
    }
    ;
    y.prototype.zWd = function(e) {
        this.Bz = e
    }
    ;
    y.prototype.Lkf = function() {
        return this.Ay
    }
    ;
    y.prototype.nyf = function(e) {
        this.Ay = e
    }
    ;
    y.prototype.kjf = function() {
        return this.Lea
    }
    ;
    y.prototype.Swf = function(e) {
        this.Lea = e
    }
    ;
    y.prototype.jjf = function() {
        return this.$Ba
    }
    ;
    y.prototype.Rwf = function(e) {
        this.$Ba = e
    }
    ;
    y.prototype.mjf = function() {
        return this.wKa
    }
    ;
    y.prototype.Twf = function(e) {
        this.wKa = e
    }
    ;
    y.prototype.skf = function() {
        return this.akc
    }
    ;
    y.prototype.njf = function() {
        return this.Tpb
    }
    ;
    y.prototype.Jkf = function() {
        return this.aG
    }
    ;
    y.prototype.lyf = function(e) {
        this.aG = e
    }
    ;
    y.prototype.Ikf = function() {
        return this.$F
    }
    ;
    y.prototype.kyf = function(e) {
        this.$F = e
    }
    ;
    y.prototype.sjf = function() {
        return this.Q9a
    }
    ;
    y.prototype.Zwf = function(e) {
        this.Q9a = e
    }
    ;
    y.prototype.wkf = function() {
        return this.Z6
    }
    ;
    y.prototype.Xxf = function(e) {
        this.Z6 = e
    }
    ;
    f.Asc.CTableProp = f.Asc.FTc = y;
    y.prototype.get_Width = y.prototype.cYc;
    y.prototype.put_Width = y.prototype.CWd;
    y.prototype.get_Spacing = y.prototype.ffb;
    y.prototype.put_Spacing = y.prototype.c4b;
    y.prototype.get_DefaultMargins = y.prototype.wjf;
    y.prototype.put_DefaultMargins = y.prototype.$wf;
    y.prototype.get_CellMargins = y.prototype.gjf;
    y.prototype.put_CellMargins = y.prototype.Owf;
    y.prototype.get_TableAlignment = y.prototype.Fkf;
    y.prototype.put_TableAlignment = y.prototype.hyf;
    y.prototype.get_TableIndent = y.prototype.Kkf;
    y.prototype.put_TableIndent = y.prototype.myf;
    y.prototype.get_TableWrap = y.prototype.Pkf;
    y.prototype.put_TableWrap = y.prototype.ryf;
    y.prototype.get_TablePaddings = y.prototype.Nkf;
    y.prototype.put_TablePaddings = y.prototype.pyf;
    y.prototype.get_TableBorders = y.prototype.Hkf;
    y.prototype.put_TableBorders = y.prototype.jyf;
    y.prototype.get_CellBorders = y.prototype.fjf;
    y.prototype.put_CellBorders = y.prototype.Nwf;
    y.prototype.get_TableBackground = y.prototype.Gkf;
    y.prototype.put_TableBackground = y.prototype.iyf;
    y.prototype.get_CellsBackground = y.prototype.ijf;
    y.prototype.put_CellsBackground = y.prototype.Qwf;
    y.prototype.get_Position = y.prototype.obc;
    y.prototype.put_Position = y.prototype.dcc;
    y.prototype.get_PositionH = y.prototype.wTd;
    y.prototype.put_PositionH = y.prototype.AWd;
    y.prototype.get_PositionV = y.prototype.xTd;
    y.prototype.put_PositionV = y.prototype.BWd;
    y.prototype.get_Value_X = y.prototype.yTd;
    y.prototype.get_Value_Y = y.prototype.zTd;
    y.prototype.get_ForSelectedCells = y.prototype.Djf;
    y.prototype.put_ForSelectedCells = y.prototype.gxf;
    y.prototype.put_CellSelect = y.prototype.Pwf;
    y.prototype.get_CellSelect = y.prototype.hjf;
    y.prototype.get_CanBeFlow = y.prototype.uTd;
    y.prototype.get_RowsInHeader = y.prototype.ykf;
    y.prototype.put_RowsInHeader = y.prototype.Zxf;
    y.prototype.get_Locked = y.prototype.XXc;
    y.prototype.get_CellsVAlign = y.prototype.ljf;
    y.prototype.put_CellsVAlign = y.prototype.a4b;
    y.prototype.get_TableLook = y.prototype.Mkf;
    y.prototype.put_TableLook = y.prototype.oyf;
    y.prototype.get_TableStyle = y.prototype.Okf;
    y.prototype.put_TableStyle = y.prototype.qyf;
    y.prototype.get_AllowOverlap = y.prototype.tTd;
    y.prototype.put_AllowOverlap = y.prototype.zWd;
    y.prototype.get_TableLayout = y.prototype.Lkf;
    y.prototype.put_TableLayout = y.prototype.nyf;
    y.prototype.get_CellsTextDirection = y.prototype.kjf;
    y.prototype.put_CellsTextDirection = y.prototype.Swf;
    y.prototype.get_CellsNoWrap = y.prototype.jjf;
    y.prototype.put_CellsNoWrap = y.prototype.Rwf;
    y.prototype.get_CellsWidth = y.prototype.mjf;
    y.prototype.put_CellsWidth = y.prototype.Twf;
    y.prototype.get_PercentFullWidth = y.prototype.skf;
    y.prototype.get_CellsWidthNotEqual = y.prototype.njf;
    y.prototype.get_TableDescription = y.prototype.Jkf;
    y.prototype.put_TableDescription = y.prototype.lyf;
    y.prototype.get_TableCaption = y.prototype.Ikf;
    y.prototype.put_TableCaption = y.prototype.kyf;
    y.prototype.get_ColumnWidth = y.prototype.sjf;
    y.prototype.put_ColumnWidth = y.prototype.Zwf;
    y.prototype.get_RowHeight = y.prototype.wkf;
    y.prototype.put_RowHeight = y.prototype.Xxf;
    Ab.prototype.Hwc = function() {
        return this.Ba
    }
    ;
    Ab.prototype.QKc = function(e) {
        this.Ba = e ? new Asc.Nka(e) : null
    }
    ;
    Ab.prototype.Swc = function() {
        return this.Oa
    }
    ;
    Ab.prototype.$Kc = function(e) {
        this.Oa = e ? new Asc.Nka(e) : null
    }
    ;
    Ab.prototype.Pwc = function() {
        return this.Ra
    }
    ;
    Ab.prototype.XKc = function(e) {
        this.Ra = e ? new Asc.Nka(e) : null
    }
    ;
    Ab.prototype.vwc = function() {
        return this.Ta
    }
    ;
    Ab.prototype.NKc = function(e) {
        this.Ta = e ? new Asc.Nka(e) : null
    }
    ;
    Ab.prototype.Zjf = function() {
        return this.fk
    }
    ;
    Ab.prototype.Dxf = function(e) {
        this.fk = e ? new Asc.Nka(e) : null
    }
    ;
    Ab.prototype.$jf = function() {
        return this.sk
    }
    ;
    Ab.prototype.Exf = function(e) {
        this.sk = e ? new Asc.Nka(e) : null
    }
    ;
    Sb.prototype.Hwc = function() {
        return this.Ba
    }
    ;
    Sb.prototype.QKc = function(e) {
        this.Ba = e
    }
    ;
    Sb.prototype.Pwc = function() {
        return this.Ra
    }
    ;
    Sb.prototype.XKc = function(e) {
        this.Ra = e
    }
    ;
    Sb.prototype.Swc = function() {
        return this.Oa
    }
    ;
    Sb.prototype.$Kc = function(e) {
        this.Oa = e
    }
    ;
    Sb.prototype.vwc = function() {
        return this.Ta
    }
    ;
    Sb.prototype.NKc = function(e) {
        this.Ta = e
    }
    ;
    Sb.prototype.Ajf = function() {
        return this.If
    }
    ;
    Sb.prototype.exf = function(e) {
        this.If = e
    }
    ;
    f.Asc.CBorders = f.Asc.Yig = Ab;
    Ab.prototype.get_Left = Ab.prototype.Hwc;
    Ab.prototype.put_Left = Ab.prototype.QKc;
    Ab.prototype.get_Top = Ab.prototype.Swc;
    Ab.prototype.put_Top = Ab.prototype.$Kc;
    Ab.prototype.get_Right = Ab.prototype.Pwc;
    Ab.prototype.put_Right = Ab.prototype.XKc;
    Ab.prototype.get_Bottom = Ab.prototype.vwc;
    Ab.prototype.put_Bottom = Ab.prototype.NKc;
    Ab.prototype.get_InsideH = Ab.prototype.Zjf;
    Ab.prototype.put_InsideH = Ab.prototype.Dxf;
    Ab.prototype.get_InsideV = Ab.prototype.$jf;
    Ab.prototype.put_InsideV = Ab.prototype.Exf;
    f.Asc.CMargins = f.Asc.fjg = Sb;
    Sb.prototype.get_Left = Sb.prototype.Hwc;
    Sb.prototype.put_Left = Sb.prototype.QKc;
    Sb.prototype.get_Right = Sb.prototype.Pwc;
    Sb.prototype.put_Right = Sb.prototype.XKc;
    Sb.prototype.get_Top = Sb.prototype.Swc;
    Sb.prototype.put_Top = Sb.prototype.$Kc;
    Sb.prototype.get_Bottom = Sb.prototype.vwc;
    Sb.prototype.put_Bottom = Sb.prototype.NKc;
    Sb.prototype.get_Flag = Sb.prototype.Ajf;
    Sb.prototype.put_Flag = Sb.prototype.exf;
    kb.prototype.Eyd = function() {
        return this.Hp
    }
    ;
    kb.prototype.Yjf = function() {
        return this.$b
    }
    ;
    kb.prototype.Hyd = function() {
        return this.Me
    }
    ;
    kb.prototype.Iyd = function() {
        return this.Kn
    }
    ;
    kb.prototype.Jyd = function() {
        return this.Zn
    }
    ;
    kb.prototype.Myd = function() {
        return this.Lp
    }
    ;
    kb.prototype.ffb = function() {
        return this.dc
    }
    ;
    kb.prototype.Oyd = function() {
        return this.Pb
    }
    ;
    kb.prototype.Uyd = function() {
        return this.Op
    }
    ;
    kb.prototype.Ryd = function() {
        return this.ug
    }
    ;
    kb.prototype.Lyd = function() {
        return this.Ts
    }
    ;
    Ta.prototype.VXc = function() {
        return this.ud
    }
    ;
    Ta.prototype.WXc = function() {
        return this.bf
    }
    ;
    Ta.prototype.bYc = function() {
        return this.lj
    }
    ;
    Ta.prototype.$Xc = function() {
        return this.fj
    }
    ;
    Ta.prototype.tRc = function() {
        return this.wf
    }
    ;
    Ta.prototype.zwc = function() {
        return this.Vb
    }
    ;
    Ta.prototype.oJb = function() {
        return this.va
    }
    ;
    Ta.prototype.Tyd = function() {
        return this.zj
    }
    ;
    Ta.prototype.Wjf = function() {
        return this.xh
    }
    ;
    Ta.prototype.ffb = function() {
        return this.dc
    }
    ;
    Ta.prototype.Fyd = function() {
        return this.Fj
    }
    ;
    Ta.prototype.Byd = function() {
        return this.hn
    }
    ;
    Ta.prototype.Qyd = function() {
        return this.gl
    }
    ;
    Ta.prototype.efb = function() {
        return this.Uf
    }
    ;
    kb.prototype.get_ContextualSpacing = kb.prototype.Eyd;
    kb.prototype.get_Ind = kb.prototype.Yjf;
    kb.prototype.get_Jc = kb.prototype.Hyd;
    kb.prototype.get_KeepLines = kb.prototype.Iyd;
    kb.prototype.get_KeepNext = kb.prototype.Jyd;
    kb.prototype.get_PageBreakBefore = kb.prototype.Myd;
    kb.prototype.get_Spacing = kb.prototype.ffb;
    kb.prototype.get_Shd = kb.prototype.Oyd;
    kb.prototype.get_WidowControl = kb.prototype.Uyd;
    kb.prototype.get_Tabs = kb.prototype.Ryd;
    kb.prototype.get_OutlineLvl = kb.prototype.Lyd;
    Ta.prototype.get_Bold = Ta.prototype.VXc;
    Ta.prototype.get_Italic = Ta.prototype.WXc;
    Ta.prototype.get_Underline = Ta.prototype.bYc;
    Ta.prototype.get_Strikeout = Ta.prototype.$Xc;
    Ta.prototype.get_FontFamily = Ta.prototype.tRc;
    Ta.prototype.get_FontSize = Ta.prototype.zwc;
    Ta.prototype.get_Color = Ta.prototype.oJb;
    Ta.prototype.get_VertAlign = Ta.prototype.Tyd;
    Ta.prototype.get_HighLight = Ta.prototype.Wjf;
    Ta.prototype.get_Spacing = Ta.prototype.ffb;
    Ta.prototype.get_DStrikeout = Ta.prototype.Fyd;
    Ta.prototype.get_Caps = Ta.prototype.Byd;
    Ta.prototype.get_SmallCaps = Ta.prototype.Qyd;
    Ta.prototype.get_Lang = Ta.prototype.efb;
    Ta.prototype.put_Bold = function(e) {
        this.ud = e
    }
    ;
    Ta.prototype.put_Italic = function(e) {
        this.bf = e
    }
    ;
    Ta.prototype.put_Underline = function(e) {
        this.lj = e
    }
    ;
    Ta.prototype.put_Strikeout = function(e) {
        this.fj = e
    }
    ;
    Ta.prototype.put_FontFamily = Ta.prototype.mHd = function(e) {
        this.wf = e
    }
    ;
    Ta.prototype.put_FontSize = Ta.prototype.nHd = function(e) {
        this.Vb = e
    }
    ;
    Ta.prototype.put_Color = Ta.prototype.Vib = function(e) {
        this.va = e
    }
    ;
    Ta.prototype.put_VertAlign = function(e) {
        this.zj = e
    }
    ;
    Ta.prototype.put_HighLight = function(e) {
        this.xh = e
    }
    ;
    Ta.prototype.put_Spacing = Ta.prototype.c4b = function(e) {
        this.dc = e
    }
    ;
    Ta.prototype.put_DStrikeout = function(e) {
        this.Fj = e
    }
    ;
    Ta.prototype.put_Caps = function(e) {
        this.hn = e
    }
    ;
    Ta.prototype.put_SmallCaps = function(e) {
        this.gl = e
    }
    ;
    Ta.prototype.put_Lang = Ta.prototype.DSc = function(e) {
        this.Uf = e
    }
    ;
    f.Asc.CTextProp = f.Asc.S1c = Ta;
    ob.prototype.cPa = function() {
        return this.Ib
    }
    ;
    ob.prototype.bAa = function() {
        return this.mb
    }
    ;
    f.Asc.CParagraphAndTextProp = f.Asc.XDf = ob;
    ob.prototype.get_ParaPr = ob.prototype.cPa;
    ob.prototype.get_TextPr = ob.prototype.bAa;
    Xa.prototype.llf = function() {
        return this.zXb
    }
    ;
    Xa.prototype.qlf = function() {
        return this.n6a
    }
    ;
    Xa.prototype.rBa = function() {
        return this.ka
    }
    ;
    Xa.prototype.sBa = function() {
        return this.la
    }
    ;
    Xa.prototype.gkf = function() {
        return this.level
    }
    ;
    f.Asc.CHeader = f.Asc.uYd = Xa;
    Xa.prototype.get_headerText = Xa.prototype.llf;
    Xa.prototype.get_pageNumber = Xa.prototype.qlf;
    Xa.prototype.get_X = Xa.prototype.rBa;
    Xa.prototype.get_Y = Xa.prototype.sBa;
    Xa.prototype.get_Level = Xa.prototype.gkf;
    kc.prototype.mXf = function(e) {
        if (e) {
            var f = e.SY();
            f && (this.Ri = f.vLa,
            this.wXa = f.FWa,
            this.vXa = f.R$a,
            this.Ug = f.Ug,
            this.sPb = !f.P$c(),
            this.mQb = "" === f.Upa,
            (f = e.lD) && f.VC() && f.VC().bl() && (f = f.VC().bl().d8c(),
            0 < f.ug.length && (this.$bb = f.ug[f.ug.length - 1].P_)),
            this.jw = e)
        }
    }
    ;
    kc.prototype.lXf = function(e) {
        this.jw = e
    }
    ;
    kc.prototype.AUf = function(e) {
        e && (this.Fnc = e.kUc())
    }
    ;
    kc.prototype.nXb = function() {
        return this.Ri
    }
    ;
    kc.prototype.Bxf = function(e) {
        this.Ri = e
    }
    ;
    kc.prototype.ZXc = function() {
        return this.wXa
    }
    ;
    kc.prototype.YXc = function() {
        return this.vXa
    }
    ;
    kc.prototype.Txf = function(e, f) {
        this.wXa = e;
        this.vXa = f
    }
    ;
    kc.prototype.C4d = function() {
        return this.Ug.length
    }
    ;
    kc.prototype.B4d = function(e) {
        return 0 > e || e >= this.Ug.length ? "" : this.Ug[e].Ja
    }
    ;
    kc.prototype.A4d = function(e) {
        return 0 > e || e >= this.Ug.length ? -1 : this.Ug[e].tc
    }
    ;
    kc.prototype.ccf = function() {
        this.Ug = []
    }
    ;
    kc.prototype.oZe = function(e, f) {
        this.Ug.push({
            Ja: e,
            tc: f
        })
    }
    ;
    kc.prototype.cyf = function(e) {
        this.sPb = e
    }
    ;
    kc.prototype.z4d = function() {
        return this.sPb
    }
    ;
    kc.prototype.Vxf = function(e) {
        this.mQb = e
    }
    ;
    kc.prototype.y4d = function() {
        return this.mQb
    }
    ;
    kc.prototype.gyf = function(e) {
        this.$bb = e
    }
    ;
    kc.prototype.D4d = function() {
        return this.$bb
    }
    ;
    kc.prototype.uRc = function() {
        return this.Fnc
    }
    ;
    kc.prototype.fyf = function(e) {
        this.Fnc = e
    }
    ;
    kc.prototype.bkf = function() {
        return this.jw
    }
    ;
    f.Asc.CTableOfContentsPr = f.Asc.P1c = kc;
    kc.prototype.get_Hyperlink = kc.prototype.nXb;
    kc.prototype.put_Hyperlink = kc.prototype.Bxf;
    kc.prototype.get_OutlineStart = kc.prototype.ZXc;
    kc.prototype.get_OutlineEnd = kc.prototype.YXc;
    kc.prototype.put_OutlineRange = kc.prototype.Txf;
    kc.prototype.get_StylesCount = kc.prototype.C4d;
    kc.prototype.get_StyleName = kc.prototype.B4d;
    kc.prototype.get_StyleLevel = kc.prototype.A4d;
    kc.prototype.clear_Styles = kc.prototype.ccf;
    kc.prototype.add_Style = kc.prototype.oZe;
    kc.prototype.put_ShowPageNumbers = kc.prototype.cyf;
    kc.prototype.get_ShowPageNumbers = kc.prototype.z4d;
    kc.prototype.put_RightAlignTab = kc.prototype.Vxf;
    kc.prototype.get_RightAlignTab = kc.prototype.y4d;
    kc.prototype.get_TabLeader = kc.prototype.D4d;
    kc.prototype.put_TabLeader = kc.prototype.gyf;
    kc.prototype.get_StylesType = kc.prototype.uRc;
    kc.prototype.put_StylesType = kc.prototype.fyf;
    kc.prototype.get_InternalClass = kc.prototype.bkf;
    Cc.prototype.pBa = function() {
        return this.Ja
    }
    ;
    Cc.prototype.w8a = function(e) {
        this.Ja = e
    }
    ;
    Cc.prototype.AN = function() {
        return this.ea
    }
    ;
    Cc.prototype.hU = function(e) {
        this.ea = e
    }
    ;
    Cc.prototype.ukf = function() {
        return this.LI
    }
    ;
    Cc.prototype.Uxf = function(e) {
        this.LI = e
    }
    ;
    Cc.prototype.Tkf = function() {
        return this.aP
    }
    ;
    Cc.prototype.uyf = function(e) {
        this.aP = e
    }
    ;
    Cc.prototype.Ekf = function() {
        return this.Dnc
    }
    ;
    f.Asc.CAscStyle = f.Asc.nde = Cc;
    Cc.prototype.get_Name = Cc.prototype.pBa;
    Cc.prototype.put_Name = Cc.prototype.w8a;
    Cc.prototype.get_Type = Cc.prototype.AN;
    Cc.prototype.put_Type = Cc.prototype.hU;
    Cc.prototype.get_QFormat = Cc.prototype.ukf;
    Cc.prototype.put_QFormat = Cc.prototype.Uxf;
    Cc.prototype.get_UIPriority = Cc.prototype.Tkf;
    Cc.prototype.put_UIPriority = Cc.prototype.uyf;
    Cc.prototype.get_StyleId = Cc.prototype.Ekf;
    Pb.prototype.ckf = function() {
        return this.ae
    }
    ;
    Pb.prototype.Jwc = function(e) {
        return 0 > e ? this.tc[0] : 8 < e ? this.tc[8] : this.tc[e] ? this.tc[e] : this.tc[0]
    }
    ;
    f.Asc.CAscNumbering = f.Asc.uTf = Pb;
    Pb.prototype.get_InternalId = Pb.prototype.ckf;
    Pb.prototype.get_Lvl = Pb.prototype.Jwc;
    ic.prototype.AN = function() {
        return this.ea
    }
    ;
    ic.prototype.hU = function(e) {
        this.ea = e
    }
    ;
    ic.prototype.xQ = function() {
        return this.pa
    }
    ;
    ic.prototype.kP = function(e) {
        this.pa = e
    }
    ;
    f.Asc.CAscNumberingLvlText = f.Asc.mde = ic;
    ic.prototype.get_Type = ic.prototype.AN;
    ic.prototype.put_Type = ic.prototype.hU;
    ic.prototype.get_Value = ic.prototype.xQ;
    ic.prototype.put_Value = ic.prototype.kP;
    Bb.prototype.mkf = function() {
        return this.pse
    }
    ;
    Bb.prototype.E0a = function() {
        return this.Ck
    }
    ;
    Bb.prototype.b4b = function(e) {
        this.Ck = e
    }
    ;
    Bb.prototype.KJa = function() {
        return this.Text
    }
    ;
    Bb.prototype.qAa = function(e) {
        this.Text = e
    }
    ;
    Bb.prototype.bAa = function() {
        return this.mb
    }
    ;
    Bb.prototype.cPa = function() {
        return this.Ib
    }
    ;
    Bb.prototype.Qwc = function() {
        return this.Mb
    }
    ;
    Bb.prototype.tHd = function(e) {
        this.Mb = e
    }
    ;
    Bb.prototype.Owc = function() {
        return this.pI
    }
    ;
    Bb.prototype.rHd = function(e) {
        this.pI = e
    }
    ;
    Bb.prototype.Rwc = function() {
        return this.VJ
    }
    ;
    Bb.prototype.uHd = function(e) {
        this.VJ = e
    }
    ;
    Bb.prototype.Kga = function() {
        return this.Ze
    }
    ;
    Bb.prototype.kaa = function(e) {
        this.Ze = e
    }
    ;
    f.Asc.CAscNumberingLvl = f.Asc.vTf = Bb;
    Bb.prototype.get_LvlNum = Bb.prototype.mkf;
    Bb.prototype.get_Format = Bb.prototype.E0a;
    Bb.prototype.put_Format = Bb.prototype.b4b;
    Bb.prototype.get_Text = Bb.prototype.KJa;
    Bb.prototype.put_Text = Bb.prototype.qAa;
    Bb.prototype.get_TextPr = Bb.prototype.bAa;
    Bb.prototype.get_ParaPr = Bb.prototype.cPa;
    Bb.prototype.get_Start = Bb.prototype.Qwc;
    Bb.prototype.put_Start = Bb.prototype.tHd;
    Bb.prototype.get_Restart = Bb.prototype.Owc;
    Bb.prototype.put_Restart = Bb.prototype.rHd;
    Bb.prototype.get_Suff = Bb.prototype.Rwc;
    Bb.prototype.put_Suff = Bb.prototype.uHd;
    Bb.prototype.get_Align = Bb.prototype.Kga;
    Bb.prototype.put_Align = Bb.prototype.kaa;
    f.Asc.CAscWatermarkProperties = f.Asc.L6a = Ma;
    Ma.prototype.put_Api = Ma.prototype.BSa = function(e) {
        this.Uc = e
    }
    ;
    Ma.prototype.put_Type = Ma.prototype.hU = function(e) {
        this.ea = e
    }
    ;
    Ma.prototype.get_Type = Ma.prototype.AN = function() {
        return this.ea
    }
    ;
    Ma.prototype.put_Text = Ma.prototype.qAa = function(e) {
        this.Text = e
    }
    ;
    Ma.prototype.get_Text = Ma.prototype.KJa = function() {
        return this.Text
    }
    ;
    Ma.prototype.put_TextPr = Ma.prototype.vHd = function(e) {
        this.mb = e
    }
    ;
    Ma.prototype.get_TextPr = Ma.prototype.bAa = function() {
        return this.mb
    }
    ;
    Ma.prototype.put_Opacity = Ma.prototype.UKc = function(e) {
        this.Opacity = e
    }
    ;
    Ma.prototype.get_Opacity = Ma.prototype.a9f = function() {
        return this.Opacity
    }
    ;
    Ma.prototype.put_IsDiagonal = Ma.prototype.pHd = function(e) {
        this.o$c = e
    }
    ;
    Ma.prototype.get_IsDiagonal = Ma.prototype.HMf = function() {
        return this.o$c
    }
    ;
    Ma.prototype.put_ImageUrl = Ma.prototype.KQf = function(f, y) {
        var Ma = this;
        Ma.Uc && AscCommon.u$(Ma.Uc, [f], function(e) {
            if (e && e[0] && "error" !== e[0].url) {
                var f = AscCommon.tH.d8a(e[0].path);
                Ma.Uc.tt.a5a([AscCommon.iW(f)], function() {
                    Ma.Am = f;
                    Ma.ea = Asc.Yka.Image;
                    Ma.Cxb();
                    Ma.Uc.Oe("asc_onWatermarkImageLoaded")
                })
            }
        }, !1, e, y)
    }
    ;
    Ma.prototype.put_ImageUrl2 = Ma.prototype.Cxf = function(e) {
        this.Am = e
    }
    ;
    Ma.prototype.get_ImageUrl = Ma.prototype.x4d = function() {
        return this.Am
    }
    ;
    Ma.prototype.put_Scale = Ma.prototype.ZKc = function(e) {
        this.mbb = e
    }
    ;
    Ma.prototype.get_Scale = Ma.prototype.e9f = function() {
        return this.mbb
    }
    ;
    Ma.prototype.put_DivId = function(e) {
        this.BMb = e;
        this.Cxb()
    }
    ;
    Ma.prototype.updateView = function() {
        this.Cxb()
    }
    ;
    Ma.prototype.showFileDialog = function() {
        if (this.Uc && this.BMb) {
            var e = this.Uc
              , f = this;
            AscCommon.Xid(e.e_, e.yga, e.ll.tFa(), function(y, Ma) {
                Asc.Gk.pg.HZ !== y ? e.Oe("asc_onError", y, Asc.Gk.Lk.Vo) : (e.$G(Asc.vE.Gs, Asc.OH.rda),
                AscCommon.Ald(Ma, e.e_, e.yga, e.ll.tFa(), function(y, Ma) {
                    Asc.Gk.pg.HZ !== y ? (e.Oe("asc_onError", y, Asc.Gk.Lk.Vo),
                    e.$x(Asc.vE.Gs, Asc.OH.rda)) : e.tt.a5a(Ma, function() {
                        0 < Ma.length && (f.Am = Ma[0],
                        f.ea = Asc.Yka.Image,
                        f.Cxb(),
                        e.Oe("asc_onWatermarkImageLoaded"));
                        e.$x(Asc.vE.Gs, Asc.OH.rda)
                    })
                }))
            }, function(f) {
                Asc.Gk.pg.HZ !== f && e.Oe("asc_onError", f, Asc.Gk.Lk.Vo);
                e.$G(Asc.vE.Gs, Asc.OH.rda)
            })
        }
    }
    ;
    Ma.prototype.loadImageUrl = function(f, y) {
        var Ma = this;
        Ma.Uc && AscCommon.u$(Ma.Uc, [f], function(e) {
            e && e[0] && "error" !== e[0].url && Ma.tt.a5a([e[0].url], function() {
                Ma.Am = e[0].url;
                Ma.ea = Asc.Yka.Image;
                Ma.Cxb();
                Ma.Oe("asc_onWatermarkImageLoaded")
            })
        }, !1, e, y)
    }
    ;
    Ma.prototype.drawTexture = Ma.prototype.Cxb = function() {
        if (this.Am && this.Uc) {
            var f = document.getElementById(this.BMb);
            if (f) {
                for (var y = f.children, Ma = null, Ia = 0; Ia < y.length; ++Ia)
                    if (y[Ia].nodeName && "CANVAS" === y[Ia].nodeName.toUpperCase()) {
                        Ma = y[Ia];
                        break
                    }
                y = f.clientWidth;
                Ia = f.clientHeight;
                null === Ma && (Ma = document.createElement("canvas"),
                Ma.width = parseInt(y),
                Ma.height = parseInt(Ia),
                f.appendChild(Ma));
                f = Ma.getContext("2d");
                f.clearRect(0, 0, Ma.width, Ma.height);
                Ma = this.Uc.tt.Y_[AscCommon.iW(this.Am)];
                if (Ma != e && null != Ma.Image && Ma.sz != AscFonts.IAa.Apa) {
                    var Xa = 0
                      , Ta = 0
                      , jb = Math.max(Ma.Image.width, 1)
                      , Va = Math.max(Ma.Image.height, 1)
                      , cb = jb / Va;
                    jb = y;
                    Va = Ia;
                    y / Ia >= cb ? (jb = cb * Ia,
                    Xa = (y - jb) / 2) : (Va = jb / cb,
                    Ta = (Ia - Va) / 2);
                    f.drawImage(Ma.Image, Xa, Ta, jb, Va)
                } else
                    Ma && Ma.Image || (f.lineWidth = 1,
                    f.beginPath(),
                    f.moveTo(0, 0),
                    f.lineTo(y, Ia),
                    f.moveTo(y, 0),
                    f.lineTo(0, Ia),
                    f.strokeStyle = "#FF0000",
                    f.stroke(),
                    f.beginPath(),
                    f.moveTo(0, 0),
                    f.lineTo(y, 0),
                    f.lineTo(y, Ia),
                    f.lineTo(0, Ia),
                    f.closePath(),
                    f.strokeStyle = "#000000",
                    f.stroke(),
                    f.beginPath())
            }
        }
    }
    ;
    f.Asc.CAscCaptionProperties = f.Asc.Wig = cb;
    var jb = cb.prototype;
    jb.pBa = jb.get_Name = function() {
        return this.Ja
    }
    ;
    jb.Fwc = jb.get_Label = function() {
        return this.IC
    }
    ;
    jb.mXb = jb.get_Before = function() {
        return this.Ji
    }
    ;
    jb.xjf = jb.get_ExcludeLabel = function() {
        return this.ggc
    }
    ;
    jb.E0a = jb.get_Format = function() {
        return this.Ck
    }
    ;
    jb.Ejf = jb.get_FormatGeneral = function() {
        switch (this.Ck) {
        case Asc.ag.r0:
            return "ALPHABETIC";
        case Asc.ag.ES:
            return "alphabetic";
        case Asc.ag.s0:
            return "Roman";
        case Asc.ag.FS:
            return "roman";
        default:
            return "Arabic"
        }
    }
    ;
    jb.Xjf = jb.get_IncludeChapterNumber = function() {
        return this.Uhc
    }
    ;
    jb.Hjf = jb.get_HeadingLvl = function() {
        return this.YNb
    }
    ;
    jb.Akf = jb.get_Separator = function() {
        return this.Upa
    }
    ;
    jb.$if = jb.get_Additional = function() {
        return this.Zw
    }
    ;
    jb.w8a = jb.put_Name = function(e) {
        this.Ja = e
    }
    ;
    jb.IDg = jb.put_Label = function(e) {
        this.IC = e
    }
    ;
    jb.zDg = jb.put_Before = function(e) {
        this.Ji = e
    }
    ;
    jb.CDg = jb.put_ExcludeLabel = function(e) {
        this.ggc = e
    }
    ;
    jb.b4b = jb.put_Format = function(e) {
        this.Ck = e
    }
    ;
    jb.FDg = jb.put_IncludeChapterNumber = function(e) {
        this.Uhc = e
    }
    ;
    jb.EDg = jb.put_HeadingLvl = function(e) {
        this.YNb = e
    }
    ;
    jb.NDg = jb.put_Separator = function(e) {
        this.Upa = e
    }
    ;
    jb.yDg = jb.put_Additional = function(e) {
        this.Zw = e
    }
    ;
    jb.yif = function() {
        var e = new CFieldInstructionSEQ;
        this.Ck && e.MQb([this.Ck]);
        this.IC && e.QQb(this.IC);
        AscFormat.hb(this.YNb) && e.WQb(this.YNb);
        return e
    }
    ;
    jb.Kxg = function() {
        return this.yif().mqa()
    }
    ;
    jb.nGg = jb.updateName = function() {
        this.Ja = "";
        !this.ggc && "string" === typeof this.IC && 0 < this.IC.length && (this.Ja += this.IC + " ");
        this.Uhc && (this.Ja += "1",
        this.Ja = "string" === typeof this.Upa && 0 < this.Upa.length ? this.Ja + this.Upa : this.Ja + " ");
        this.Ja += AscCommon.B6b(1, this.Ck)
    }
}
)(window, void 0);
"use strict";
(function(f, e) {
    function Ia() {
        this.pbd = this.qbd = this.YOc = this.XOc = this.K$b = this.L$b = 0
    }
    function $a(e) {
        e ? (this.ea = void 0 != e.ea ? e.ea : null,
        this.we = void 0 != e.we ? e.we : null,
        this.Nqb = void 0 != e.Nqb ? e.Nqb : null,
        this.w5c = void 0 != e.w5c ? e.w5c : null,
        this.VOc = void 0 != e.VOc ? e.VOc : null,
        this.eo = void 0 != e.eo ? e.eo : !1,
        this.Jjd = void 0 != e.Jjd ? e.Jjd : -1) : (this.ea = AscCommon.ubc,
        this.we = 12.5,
        this.w5c = this.Nqb = !1,
        this.VOc = null,
        this.eo = !1,
        this.Jjd = -1)
    }
    function Va(e) {
        e ? ("undefined" != typeof e.from && (this.from = e.from),
        "undefined" != typeof e.to && (this.to = e.to),
        "undefined" != typeof e.maa && (this.subject = e.maa),
        "undefined" != typeof e.U2g && (this.mailFormat = e.U2g),
        "undefined" != typeof e.fileName && (this.fileName = e.fileName),
        "undefined" != typeof e.message && (this.message = e.message),
        "undefined" != typeof e.P5g && (this.recordFrom = e.P5g),
        "undefined" != typeof e.Q5g && (this.recordTo = e.Q5g),
        "undefined" != typeof e.j2g && (this.isJson = e.j2g)) : this.isJson = this.userId = this.recordCount = this.recordTo = this.recordFrom = this.message = this.fileName = this.mailFormat = this.subject = this.to = this.from = null
    }
    function ib(e) {
        this.Qa = this.BY = this.pA = this.zW = void 0;
        e && (this.zW = e.zW,
        this.pA = e.pA,
        this.BY = e.BY,
        this.Qa = e.Qa)
    }
    function y(e) {
        AscCommon.Cnb.call(this, e, AscCommon.bs.Tl);
        this.Fa = null;
        this.$vd = sb.VTc;
        this.Ylg = null;
        this.jr = !1;
        this.DVc = !0;
        this.Z5a = kc.xna;
        this.rob = this.ahb = this.E0 = this.oGb = !1;
        this.YQd = "";
        this.QRc = !0;
        this.R$c = this.xYc = this.Sof = !1;
        this.JFa = this.ZDd = null;
        this.QFg = this.MRc = !1;
        this.e_c = this.jNc = this.AXd = null;
        this.xof = this.QK = this.mVd = !1;
        this.zXd = null;
        this.gWf = 0;
        this.fWf = null;
        this.tob = !1;
        this.XJc = this.nma = null;
        this.tkb = 0;
        this.sSa = !1;
        this.DZc = null;
        this.VOf = !1;
        this.T8d = null;
        this.rOc = this.jEe = !1;
        this.lM = [];
        this.fGa = -1;
        this.rca = !0;
        this.VNd = null;
        this.ITc = c_oAscCollaborativeMarksShowType.$l;
        this.sOc = this.i1d = null;
        void 0 == f.editor && (f.editor = this,
        f.editor = f.editor,
        f.NATIVE_EDITOR_ENJINE && (editor = f.editor));
        this.zGf = [];
        this.T_()
    }
    function Ab(e) {
        e ? (this.O$ = e.O$,
        this.l7b = e.l7b,
        this.Q6b = e.Q6b,
        this.d7b = e.d7b,
        this.e7b = e.e7b) : this.e7b = this.d7b = this.Q6b = this.l7b = this.O$ = -1
    }
    function Sb(e) {
        if (e)
            switch (this.ea = void 0 != e.ea ? e.ea : Asc.jOa.Ona,
            this.wN = void 0 != e.wN ? e.wN : 0,
            this.xN = void 0 != e.xN ? e.xN : 0,
            this.ea) {
            case Asc.jOa.w2c:
                this.Fe = void 0 != e.Fe ? e.Fe : 0,
                this.Ik = void 0 != e.Ik ? e.Ik : !0
            }
        else
            this.ea = Asc.jOa.Ona,
            this.xN = this.wN = 0
    }
    function kb(e) {
        if (e) {
            if (this.Lpf = void 0 != e.Lpf ? e.Lpf : !1,
            this.cY = void 0 != e.cY ? e.cY : "",
            this.JY = void 0 != e.JY ? e.JY : "",
            this.jaa = void 0 != e.jaa ? e.jaa : "",
            this.BN = void 0 != e.BN ? e.BN : "",
            this.uua = void 0 != e.uua ? e.uua : "",
            this.LS = void 0 != e.LS ? e.LS : null,
            this.i8 = void 0 != e.i8 ? e.i8 : !1,
            this.WN = void 0 != e.WN ? e.WN : "",
            this.tua = void 0 != e.tua ? e.tua : this.Fsg(this.WN),
            this.m4 = void 0 != e.m4 ? e.m4 : AscCommon.d$b(),
            this.GK = [],
            void 0 != e.GK)
                for (var f = e.GK.length, y = 0; y < f; y++) {
                    var Ma = new kb(e.GK[y]);
                    this.GK.push(Ma)
                }
        } else
            this.Lpf = !1,
            this.uua = this.BN = this.jaa = this.JY = this.cY = "",
            this.LS = null,
            this.i8 = !1,
            this.tua = this.WN = "",
            this.m4 = AscCommon.d$b(),
            this.GK = []
    }
    var Ta = null
      , ob = AscCommon.Fwb
      , Xa = AscCommon.YTc
      , kc = AscCommon.EFb
      , Cc = AscCommon.yna
      , Pb = AscCommon.l4
      , ic = AscCommon.xob
      , Bb = AscCommon.rIc
      , Ma = AscCommon.sIc
      , cb = AscCommon.rR
      , jb = AscCommon.LG
      , Pa = AscCommon.hJ
      , Ce = AscCommon.iea
      , cf = AscCommon.Pdb
      , ef = AscCommon.wFb
      , Ke = AscCommon.vFb
      , mg = AscCommon.tH
      , Di = AscCommon.B4b
      , dh = AscCommon.eg
      , Je = AscCommon.Fg
      , Uc = null
      , kd = null
      , Ud = null
      , de = Asc.Gk
      , sb = Asc.Gnb
      , yb = Asc.OH
      , Xe = Asc.MUb
      , Zh = Asc.E2d
      , oh = Asc.vE
      , Xg = Asc.GFb
      , ak = Asc.Iy
      , Yg = Asc.j3
      , yc = Asc.E5a
      , Ic = Asc.E7b
      , Vb = Asc.FFb;
    Ia.prototype.l1g = function() {
        return this.L$b
    }
    ;
    Ia.prototype.j1g = function() {
        return this.K$b
    }
    ;
    Ia.prototype.c1g = function() {
        return this.XOc
    }
    ;
    Ia.prototype.d1g = function() {
        return this.YOc
    }
    ;
    Ia.prototype.e1g = function() {
        return this.qbd
    }
    ;
    Ia.prototype.b1g = function() {
        return this.pbd
    }
    ;
    $a.prototype.AN = function() {
        return this.ea
    }
    ;
    $a.prototype.hU = function(e) {
        this.ea = e
    }
    ;
    $a.prototype.obc = function() {
        return this.we
    }
    ;
    $a.prototype.dcc = function(e) {
        this.we = e
    }
    ;
    $a.prototype.J0g = function() {
        return this.Nqb
    }
    ;
    $a.prototype.q4g = function(e) {
        this.Nqb = e
    }
    ;
    $a.prototype.I0g = function() {
        return this.w5c
    }
    ;
    $a.prototype.p4g = function(e) {
        this.w5c = e
    }
    ;
    $a.prototype.V0g = function() {
        return this.VOc
    }
    ;
    $a.prototype.XXc = function() {
        return this.eo
    }
    ;
    $a.prototype.z1g = function() {
        return this.Jjd
    }
    ;
    $a.prototype.g5g = function(e) {
        this.Jjd = e
    }
    ;
    var ji = new function() {
        this.T2a = [{
            name: "US Letter",
            Mm: 215.9,
            Lm: 279.4,
            Pcc: 12240,
            sbc: 15840
        }, {
            name: "US Legal",
            Mm: 215.9,
            Lm: 355.6,
            Pcc: 12240,
            sbc: 20160
        }, {
            name: "A4",
            Mm: 210,
            Lm: 297,
            Pcc: 11907,
            sbc: 16839
        }, {
            name: "A5",
            Mm: 148.1,
            Lm: 209.9,
            Pcc: 8391,
            sbc: 11907
        }, {
            name: "B5",
            Mm: 176,
            Lm: 250.1,
            Pcc: 9979,
            sbc: 14175
        }, {
            name: "Envelope #10",
            Mm: 104.8,
            Lm: 241.3,
            Pcc: 5940,
            sbc: 13680
        }, {
            name: "Envelope DL",
            Mm: 110.1,
            Lm: 220.1,
            Pcc: 6237,
            sbc: 12474
        }, {
            name: "Tabloid",
            Mm: 279.4,
            Lm: 431.7,
            Pcc: 15842,
            sbc: 24477
        }, {
            name: "A3",
            Mm: 297,
            Lm: 420.1,
            Pcc: 16840,
            sbc: 23820
        }, {
            name: "Tabloid Oversize",
            Mm: 304.8,
            Lm: 457.1,
            Pcc: 17282,
            sbc: 25918
        }, {
            name: "ROC 16K",
            Mm: 196.8,
            Lm: 273,
            Pcc: 11164,
            sbc: 15485
        }, {
            name: "Envelope Coukei 3",
            Mm: 119.9,
            Lm: 234.9,
            Pcc: 6798,
            sbc: 13319
        }, {
            name: "Super B/A3",
            Mm: 330.2,
            Lm: 482.5,
            Pcc: 18722,
            sbc: 27358
        }];
        this.nFg = .5;
        this.FD = function(e, f) {
            for (var y in this.T2a) {
                var Ma = this.T2a[y];
                if (Math.abs(e - Ma.Mm) < this.nFg && Math.abs(f - Ma.Lm) < this.nFg)
                    return Ma
            }
            return {
                Mm: e,
                Lm: f
            }
        }
    }
    ;
    Va.prototype.P0g = function() {
        return this.from
    }
    ;
    Va.prototype.t4g = function(e) {
        this.from = e
    }
    ;
    Va.prototype.B1g = function() {
        return this.to
    }
    ;
    Va.prototype.p5g = function(e) {
        this.to = e
    }
    ;
    Va.prototype.A1g = function() {
        return this.subject
    }
    ;
    Va.prototype.i5g = function(e) {
        this.subject = e
    }
    ;
    Va.prototype.Txg = function() {
        return this.mailFormat
    }
    ;
    Va.prototype.L4g = function(e) {
        this.mailFormat = e
    }
    ;
    Va.prototype.O0g = function() {
        return this.fileName
    }
    ;
    Va.prototype.r4g = function(e) {
        this.fileName = e
    }
    ;
    Va.prototype.g1g = function() {
        return this.message
    }
    ;
    Va.prototype.N4g = function(e) {
        this.message = e
    }
    ;
    Va.prototype.Wxg = function() {
        return this.recordFrom
    }
    ;
    Va.prototype.V4g = function(e) {
        this.recordFrom = e
    }
    ;
    Va.prototype.Xxg = function() {
        return this.recordTo
    }
    ;
    Va.prototype.W4g = function(e) {
        this.recordTo = e
    }
    ;
    Va.prototype.q1g = function() {
        return this.recordCount
    }
    ;
    Va.prototype.MDg = function(e) {
        this.recordCount = e
    }
    ;
    Va.prototype.xla = function() {
        return this.userId
    }
    ;
    Va.prototype.d4b = function(e) {
        this.userId = e
    }
    ;
    Va.prototype.HDg = function(e) {
        this.isJson = e
    }
    ;
    ib.prototype.U5a = function() {
        return this.Qa
    }
    ;
    ib.prototype.q6a = function(e) {
        this.Qa = e
    }
    ;
    ib.prototype.KMf = function() {
        return this.BY
    }
    ;
    ib.prototype.PQf = function(e) {
        this.BY = e
    }
    ;
    ib.prototype.IMf = function() {
        return this.pA
    }
    ;
    ib.prototype.NQf = function(e) {
        this.pA = e
    }
    ;
    ib.prototype.JMf = function() {
        return this.zW
    }
    ;
    ib.prototype.OQf = function(e) {
        this.zW = e
    }
    ;
    AscCommon.ajg = function(e, y) {
        this.xg = e;
        this.wxb = y;
        this.mRf = [];
        this.current = -1;
        this.Qz = "";
        this.start = function() {
            this.xg.X0d = this;
            this.xg.Blb();
            f.gj && (this.Qz = f.gj.dfg());
            this.QF()
        }
        ;
        this.end = function() {
            f.gj && f.gj.lcg(this.Qz, this.mRf);
            delete this.xg.X0d;
            this.xg.ilb();
            this.xg.Fa.Wa.Sf()
        }
        ;
        this.QF = function() {
            ++this.current;
            var y = this.xg.Fa.Wa;
            0 == this.current && y.gg(AscDFH.YTd);
            if (this.current >= this.wxb.length)
                this.end();
            else {
                for (var Ma = null; this.current < this.wxb.length; ) {
                    var Pa = this.wxb[this.current];
                    void 0 === Pa.Props && (Pa.Props = {});
                    var Ia = !1;
                    Ia = void 0 === Pa.Url && void 0 === Pa.Script || void 0 === Pa.Props.InternalId ? y.Ke(AscCommon.H5) : y.Ke(AscCommon.rR, {
                        ea: AscCommon.xaa,
                        Xb: [Je.cg(Pa.Props.InternalId)],
                        Lu: AscCommon.H5
                    });
                    if (!1 === Ia) {
                        Ia = !1;
                        if (void 0 !== Pa.Url || void 0 !== Pa.Script) {
                            var Xa = null;
                            void 0 !== Pa.Props.InternalId && (Xa = y.mHb(Pa.Props.InternalId),
                            Ia = !0);
                            Ma = new AscCommon.nYd;
                            Ma.Ia = Pa.Props.Id;
                            Ma.ey = Pa.Props.Tag;
                            Ma.Jf = Vb.Qza;
                            Ma.ALa = Pa.Props.InternalId;
                            Ma.OB = Pa.Props.Alias;
                            void 0 !== Pa.Props.Appearance && (Ma.JB = Pa.Props.Appearance);
                            void 0 !== Pa.Props.Color && (Ma.va = new Asc.fta(Pa.Props.Color.R,Pa.Props.Color.G,Pa.Props.Color.B));
                            if (null === Xa) {
                                var Ta = y.kp();
                                Ta && !Ta.BK() && y.ay(!1, !0);
                                Xa = y.uJ(c_oAscSdtLevelType.fda)
                            }
                            Xa.Q$b(Ma);
                            Ma = Xa.F$a();
                            this.mRf.push({
                                Tag: Ma.ey,
                                Id: Ma.Ia,
                                Lock: Ma.Jf,
                                InternalId: Ma.ALa,
                                Alias: Ma.OB,
                                Appearance: Ma.JB
                            })
                        }
                        if (void 0 !== Pa.Url) {
                            this.xg.JFa = {
                                UUd: null,
                                wxb: [{
                                    url: Pa.Url,
                                    format: Pa.Format,
                                    g_c: Pa.Token
                                }],
                                dvg: function(e, f) {
                                    e.JFa.UUd = f;
                                    AscCommon.oPf(f["output.bin"], function(f) {
                                        var y;
                                        null !== f && (y = AscCommon.C$f(f)) ? e.sJa(AscCommon.wt.Ll, y, void 0, void 0, !0, function() {
                                            e.Fa.Wa.zt(!1, !1, !0);
                                            e.Fa.Wa.Bd();
                                            if (0 < e.JFa.wxb.length) {
                                                var f = new Asc.eQc(Asc.Gnb.xNd);
                                                f.ZOf = !0;
                                                e.$qd(f)
                                            } else
                                                e.uwd()
                                        }) : (e.uwd(),
                                        e.Oe("asc_onError", de.pg.mZd, de.Lk.Vo))
                                    }, "arraybuffer")
                                },
                                XZg: function(e) {
                                    Xa.aa.Cl(Xa.aa.cs() - 1, 1);
                                    Xa.Uh(!1, !1);
                                    e = e.X0d;
                                    e.wxb[e.current].Props && Xa.Q$b({
                                        Jf: e.wxb[e.current].Props.Lock
                                    });
                                    Xa = e = null;
                                    f.gj.xg.RTb(!0);
                                    setTimeout(function() {
                                        f.gj.xg.X0d.QF()
                                    }, 1)
                                }
                            };
                            y = new Asc.eQc(Asc.Gnb.xNd);
                            y.ZOf = !0;
                            this.xg.$qd(y);
                            return
                        }
                        if (void 0 !== Pa.Script) {
                            eval("(function(){ var Api = window.g_asc_plugins.api;\n" + Pa.Script + "\n})();");
                            c_oAscSdtLevelType.fda === Xa.uV() ? Ia ? (1 < Xa.aa.cs() && Xa.aa.Cl(Xa.aa.cs() - 1, 1),
                            Xa.ee(!1)) : (1 < Xa.aa.cs() && (Xa.aa.Cl(Xa.aa.cs() - 1, 1),
                            Xa.Uh(!1, !1)),
                            y.zt(!1, !1, !0)) : Ia ? (1 < Xa.cs() && Xa.Cl(Xa.cs() - 1, 1),
                            Xa.ee(),
                            Xa.BW()) : (1 < Xa.aa.cs() && (Xa.Cl(Xa.cs() - 1, 1),
                            Xa.Uh(),
                            Xa.BW()),
                            y.zt(!1, !1, !0));
                            Pa = e.X0d;
                            Pa.wxb[Pa.current].Props && Xa.Q$b({
                                Jf: Pa.wxb[Pa.current].Props.Lock
                            });
                            Pa = null;
                            Pa = y.cr();
                            y = y.y8c();
                            Ia = {};
                            for (Ma = 0; Ma < y.length; Ma++)
                                Ia[y[Ma]] = y[Ma];
                            f.gj.Alb = Ia;
                            AscCommon.hOc(f.gj.xg, Pa, Ia, function() {
                                var e = f.gj.xg;
                                delete f.gj.Alb;
                                e.RTb(!0);
                                e.Fa.Wa.R0d(!0);
                                setTimeout(function() {
                                    f.gj.xg.X0d.QF()
                                }, 1)
                            });
                            return
                        }
                        Pa.Props && (Xa = y.zHb(Pa.Props.InternalId)) && (Ma = new AscCommon.nYd,
                        Ma.Ia = Pa.Props.Id,
                        Ma.ey = Pa.Props.Tag,
                        Ma.Jf = Pa.Props.Lock,
                        Ma.ALa = Pa.Props.InternalId,
                        Ma.OB = Pa.Props.Alias,
                        void 0 !== Pa.Props.Appearance && (Ma.JB = Pa.Props.Appearance),
                        void 0 !== Pa.Props.Color && (Ma.va = new Asc.fta(Pa.Props.Color.R,Pa.Props.Color.G,Pa.Props.Color.B)),
                        Xa.Q$b(Ma),
                        Ma = Xa.F$a(),
                        this.mRf.push({
                            Tag: Ma.ey,
                            Id: Ma.Ia,
                            Lock: Ma.Jf,
                            InternalId: Ma.ALa,
                            Alias: Ma.OB,
                            Appearance: Ma.JB
                        }))
                    } else
                        !1 === y.Ke(AscCommon.EQc) && (Pa = this.wxb[this.current],
                        Pa.Props && void 0 === Pa.Url && void 0 === Pa.Script && (Xa = y.zHb(Pa.Props.InternalId))) && (Ma = new AscCommon.nYd,
                        Ma.Ia = Pa.Props.Id,
                        Ma.ey = Pa.Props.Tag,
                        Ma.Jf = Pa.Props.Lock,
                        Ma.ALa = Pa.Props.InternalId,
                        Ma.OB = Pa.Props.Alias,
                        void 0 !== Pa.Props.Appearance && (Ma.JB = Pa.Props.Appearance),
                        void 0 !== Pa.Props.Color && (Ma.va = new Asc.fta(Pa.Props.Color.R,Pa.Props.Color.G,Pa.Props.Color.B)),
                        Xa.Q$b(Ma),
                        Ma = Xa.F$a(),
                        this.mRf.push({
                            Tag: Ma.ey,
                            Id: Ma.Ia,
                            Lock: Ma.Jf,
                            InternalId: Ma.ALa,
                            Alias: Ma.OB,
                            Appearance: Ma.JB
                        }));
                    ++this.current
                }
                this.current >= this.wxb.length && this.end()
            }
        }
        ;
        this.delete = function() {
            for (var e = this.xg.Fa.Wa, f = [], y = 0; y < this.wxb.length; y++) {
                var Ma = Je.cg(this.wxb[y].InternalId);
                Ma && (Ma instanceof AscCommonWord.Jpb || Ma instanceof AscCommonWord.hHb) && f.push(Je.cg(this.wxb[y].InternalId))
            }
            e.fFb(!1);
            if (!1 === e.Ke(AscCommon.rR, {
                ea: AscCommon.xaa,
                Xb: f,
                Lu: AscCommon.l3
            })) {
                e.gg(AscDFH.YTd);
                for (y = 0; y < this.wxb.length; y++)
                    e.rGf(this.wxb[y].InternalId);
                e.Sf()
            }
            e.fFb(!0);
            this.xg.RTb(!0);
            delete this.xg.X0d
        }
    }
    ;
    y.prototype = Object.create(AscCommon.Cnb.prototype);
    y.prototype.constructor = y;
    y.prototype.Oe = function() {
        this.cAf.apply(this, arguments);
        var e = arguments[0];
        if (Zg.hasOwnProperty(e)) {
            for (var y = 0; y < Zg[e].length; ++y)
                Zg[e][y].apply(this || f, Array.prototype.slice.call(arguments, 1));
            return !0
        }
        return !1
    }
    ;
    y.prototype.J8d = function() {
        return null === this.Fa.Wa
    }
    ;
    y.prototype.o0d = function(e) {
        c_oAscCollaborativeMarksShowType.kf !== this.ITc && c_oAscCollaborativeMarksShowType.kf === e && this.Fa && this.Fa.Wa ? (this.ITc = e,
        AscCommon.Kd.AHa(!0)) : this.ITc = e
    }
    ;
    y.prototype.JZd = function() {
        return this.ITc
    }
    ;
    y.prototype.Mca = function() {
        return this.Fa && this.Fa.Wa ? this.Fa.Wa : null
    }
    ;
    y.prototype.q2 = function() {
        return this.Fa.Wa ? 0 !== this.Ckb || this.Fa.Wa.EFf() : 0 !== this.Ckb
    }
    ;
    y.prototype.AHa = function() {
        AscCommon.Kd.AHa(!0)
    }
    ;
    y.prototype.OPd = function(e) {
        e = e.toLowerCase();
        void 0 !== AscCommonWord.Bhg[e] && (this.VNd = AscCommonWord.Bhg[e])
    }
    ;
    y.prototype.ILg = function(e) {
        var f = this.VNd.W0[e];
        return void 0 !== f ? f : e
    }
    ;
    y.prototype.A2c = function() {
        !0 === Ud.AZ() ? this.qPc(!0) : this.qPc(!1);
        this.D7a()
    }
    ;
    y.prototype.pZf = function() {
        this.qPc(!1);
        this.D7a()
    }
    ;
    y.prototype.qPc = function(e) {
        this.xof = e;
        this.Oe("asc_onDocumentModifiedChanged");
        if (void 0 !== f.AscDesktopEditor)
            f.AscDesktopEditor.onDocumentModifiedChanged(e)
    }
    ;
    y.prototype.wof = function() {
        return this.I1 ? this.xof : !0
    }
    ;
    y.prototype.jXd = function() {
        0 != this.lM.length && this.lM.splice(0, this.lM.length);
        this.Fa && this.Fa.xd && this.Fa.xd.Wng()
    }
    ;
    y.prototype.DLd = function() {
        this.Fa && this.Fa.xd && this.Fa.xd.Vkg();
        this.Oe("asc_onFocusObject", this.lM)
    }
    ;
    y.prototype.F8f = function(e) {
        !0 === e && this.Fa.Wa.Ie();
        return this.lM
    }
    ;
    y.prototype.Kgg = function(e, f) {
        var y = null;
        switch (e) {
        case Xg.Ua:
            y = new Asc.mdb(f);
            break;
        case Xg.Image:
            y = new Yg(f);
            break;
        case Xg.Table:
            y = new Asc.FTc(f);
            break;
        case Xg.Ik:
            y = new $a(f)
        }
        f = this.lM.length - 1;
        for (var Ma = !1; 0 <= f; ) {
            if (this.lM[f].ea == e) {
                this.lM[f].pa = y;
                Ma = !0;
                break
            }
            f--
        }
        Ma || (this.lM[this.lM.length] = new Ke(e,y))
    }
    ;
    y.prototype.Gu = function() {
        this.Fa.Gu()
    }
    ;
    y.prototype.yRd = function(e) {
        this.Ylg = e
    }
    ;
    y.prototype.lQc = function() {
        return this.Ylg
    }
    ;
    y.prototype.dEf = function() {
        return this.Fa.dEf()
    }
    ;
    y.prototype.mLg = function() {
        this.mVd = !0;
        this.tt && (this.tt.lna = !1)
    }
    ;
    y.prototype.jXf = function() {
        return this.Fa.jXf()
    }
    ;
    y.prototype.mVf = function() {
        return this.Fa.mVf()
    }
    ;
    y.prototype.DEf = function() {
        !0 === f.flat_desine && AscCommonWord.Shg(AscCommonWord.$Wf);
        var y = e.getElementsByTagName("head")[0]
          , Ma = e.createElement("style");
        Ma.type = "text/css";
        Ma.innerHTML = ".block_elem { position:absolute;padding:0;margin:0; }";
        y.appendChild(Ma);
        Ma = e.createElement("style");
        Ma.type = "text/css";
        Ma.innerHTML = ".buttonRuler {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAwCAYAAAAYX/pXAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAABhElEQVRIS62Uwa6CMBBF/VQNQcOCBS5caOICApEt3+Wv+AcmfQ7pbdreqY+CJifTdjpng727aZrMFmbB+/3erYEE+/3egMPhMPP57QR/EJCgKAoTs1hQlqURjsdjAESyPp1O7pwEVVWZ1+s1VyB7DemRoK5rN+CvNaRPgqZpgqHz+UwSnEklweVyCQbivX8mlQTX65UGfG63m+vLXRLc7/ekQHoAexK0bWs0uq5TKwli8Afq+94Mw+CQPe78K5D6eDzMOI4GVcCdr4IlOMEWfiP4fJpVkEDLA38ghgR+DgB/ICYQ5OYBCez7d1mAvQZ6gcBmAK010A8ENg8c9u2rZ6iBwL51R7z3z1ADgc2DJDYPZnA3ENi3rhLlgauBAO8/JpUHJEih5QF6iwRaHqC3SPANJ9jCbwTP53MVJNDywB+IIYGfA8AfiAkEqTyQDEAO+HlAgtw8IEFuHpAgNw9IkJsHJMjNAxLk5gEJ8P5jUnlAghRaHqC3SKDlAXqLBN9wgvVM5g/dFuEU6U2wnAAAAABJRU5ErkJggg==);background-position: 0px 0px;background-repeat: no-repeat;}";
        y.appendChild(Ma);
        Ma = e.createElement("style");
        Ma.type = "text/css";
        Ma.innerHTML = ".buttonPrevPage {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAABgBAMAAADm/++TAAAABGdBTUEAALGPC/xhBQAAABJQTFRFAAAA////UVNVu77Cenp62Nrc3x8hMQAAAAF0Uk5TAEDm2GYAAABySURBVCjPY2AgETDBGEoKUAElJcJSxANjKGAwDQWDYAKMIBhDSRXCCFJSIixF0GS4M+AMExcwcCbAcIQxBEUgDEdBQcJSBE2GO4PU6IJHASxS4NGER4p28YWIAlikwKMJjxTt4gsRBbBIgUcTHini4wsAwMmIvYZODL0AAAAASUVORK5CYII=);background-position: 0px 0px;background-repeat: no-repeat;}";
        y.appendChild(Ma);
        Ma = e.createElement("style");
        Ma.type = "text/css";
        Ma.innerHTML = ".buttonNextPage {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAABgBAMAAADm/++TAAAABGdBTUEAALGPC/xhBQAAABJQTFRFAAAA////UVNVu77Cenp62Nrc3x8hMQAAAAF0Uk5TAEDm2GYAAABySURBVCjPY2AgETDBGEoKUAElJcJSxANjKGAwDQWDYAKMIBhDSRXCCFJSIixF0GS4M+AMExcwcCbAcIQxBEUgDEdBQcJSBE2GO4PU6IJHASxS4NGER4p28YWIAlikwKMJjxTt4gsRBbBIgUcTHini4wsAwMmIvYZODL0AAAAASUVORK5CYII=);background-position: 0px -48px;background-repeat: no-repeat;}";
        y.appendChild(Ma)
    }
    ;
    y.prototype.VUf = function() {
        this.DEf();
        null != this.Xe && (this.Xe.innerHTML = '<div id="id_main" class="block_elem" style="touch-action:none;-ms-touch-action: none;-moz-user-select:none;-khtml-user-select:none;user-select:none;background-color:' + AscCommonWord.YP.Osa + ';overflow:hidden;" UNSELECTABLE="on">\t\t\t\t\t\t\t\t<div id="id_panel_left" class="block_elem">\t\t\t\t\t\t\t\t\t<canvas id="id_buttonTabs" class="block_elem"></canvas>\t\t\t\t\t\t\t\t\t<canvas id="id_vert_ruler" class="block_elem"></canvas>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div id="id_panel_top" class="block_elem">\t\t\t\t\t\t\t\t\t<canvas id="id_hor_ruler" class="block_elem"></canvas>\t\t\t\t\t\t\t\t\t</div>                                    <div id="id_main_view" class="block_elem" style="touch-action:none;overflow:hidden">                                        <canvas id="id_viewer" class="block_elem" style="touch-action:none;-ms-touch-action: none;-webkit-user-select: none; background-color:' + AscCommonWord.YP.Osa + ';z-index:1"></canvas>\t\t\t\t\t\t\t\t\t    <canvas id="id_viewer_overlay" class="block_elem" style="touch-action:none;-ms-touch-action: none;-webkit-user-select: none; z-index:2"></canvas>\t\t\t\t\t\t\t\t\t    <canvas id="id_target_cursor" class="block_elem" width="1" height="1" style="touch-action:none;-ms-touch-action: none;-webkit-user-select: none;width:2px;height:13px;z-index:4;"></canvas>                                    </div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div id="id_panel_right" class="block_elem" style="touch-action:none;margin-right:1px;background-color:' + AscCommonWord.YP.tmb + ';">\t\t\t\t\t\t\t\t\t<div id="id_buttonRulers" class="block_elem buttonRuler"></div>\t\t\t\t\t\t\t\t\t<div id="id_vertical_scroll" style="left:0;top:0px;width:14px;overflow:hidden;position:absolute;">\t\t\t\t\t\t\t\t\t<div id="panel_right_scroll" class="block_elem" style="left:0;top:0;width:1px;height:6000px;"></div>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div id="id_buttonPrevPage" class="block_elem buttonPrevPage"></div>\t\t\t\t\t\t\t\t\t<div id="id_buttonNextPage" class="block_elem buttonNextPage"></div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div id="id_horscrollpanel" class="block_elem" style="touch-action:none;margin-bottom:1px;background-color:' + AscCommonWord.YP.tmb + ';">\t\t\t\t\t\t\t\t\t<div id="id_horizontal_scroll" style="left:0px;top:0;height:14px;overflow:hidden;position:absolute;width:100%;">\t\t\t\t\t\t\t\t\t\t<div id="panel_hor_scroll" class="block_elem" style="left:0;top:0;width:6000px;height:1px;"></div>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t</div>' + this.Xe.innerHTML)
    }
    ;
    y.prototype.oJg = function() {
        return this.IP ? this.Fa.Ja : ""
    }
    ;
    y.prototype.wEf = function() {
        this.sOc = new AscCommon.ATf;
        this.Fa.Wa.Jg();
        var e = {
            data: "",
            Bua: function(e, f) {
                this.data = f
            }
        };
        this.F7b(e, 2);
        this.Fa.Wa.Yc();
        return e.data
    }
    ;
    y.prototype.vOd = function() {
        this.Fa.Wa = new AscCommonWord.ymb(this.Fa.xd);
        this.Fa.xd.Wa = this.Fa.Wa;
        this.GYc || this.Fa.Wa.M0d();
        this.Fa.Zs && (this.Fa.Zs.delegate.Ga = this.Fa.Wa);
        if (this.nVd() || this.PRc())
            this.jr = !1,
            this.Fa.b_d()
    }
    ;
    y.prototype.AFf = function() {
        this.Fa.xd.t_ = new AscCommonWord.dHg;
        this.Fa.xd.t_.Gu();
        this.Fa.xd.zBf(!1);
        this.Fa.b_d()
    }
    ;
    y.prototype.Kte = function(e, f) {
        this.mVd = !1;
        this.AFf();
        this.QOb = null;
        this.DocumentType = 1;
        this.oVc = !0;
        this.Fa.xd.t_.nh(e, f);
        this.J4.d7a(this.Fa.xd.t_.SP, !0)
    }
    ;
    y.prototype.L_d = function(e, f) {
        this.vOd();
        this.DocumentType = 2;
        this.GXf = this.Fa.Wa.nOc();
        dh.DDa(!0);
        AscFonts.WL = !0;
        e = new AscCommonWord.Y8a(this.Fa.Wa,{
            Ltc: !1,
            bua: 0,
            m3b: 0
        });
        e.lq(f) ? (Ud && Ud.JLe && Ud.JLe(e.stream),
        dh.DDa(!1),
        this.QOb = 1,
        (new AscCommonWord.pjg).JHg(this, this.GXf),
        this.Fa.xd.JYd(),
        AscCommon.xta.tUf(this.Fa.Wa),
        this.J4.d7a(this.Fa.Wa.SP, !1)) : editor.Oe("asc_onError", de.pg.cPd, de.Lk.IU);
        AscFonts.WL = !1;
        editor.rOc = null == editor.Fa.Wa ? !0 : !editor.Fa.Wa.Qta;
        f = editor.rOc ? ji.FD(AscCommon.dFb, AscCommon.g5a) : ji.FD(AscCommon.g5a, AscCommon.dFb);
        editor.a_c(f.Mm, f.Lm);
        editor.gTc(editor.vTd());
        this.IP && (AscCommon.Se.f2a = !1,
        Uc.Gmg = "wrd_pastebin",
        Uc.Kkg = "none")
    }
    ;
    var Zg = {};
    y.prototype.TZa = function(e, f) {
        Zg.hasOwnProperty(e) || (Zg[e] = []);
        Zg[e].push(f)
    }
    ;
    y.prototype.T9e = function(e, f) {
        if (Zg.hasOwnProperty(e))
            for (var y = Zg[e].length - 1; 0 <= y; --y)
                Zg[e][y] == f && Zg[e].splice(y, 1)
    }
    ;
    y.prototype.hrc = function(e) {
        return Zg.hasOwnProperty(e)
    }
    ;
    y.prototype.p1g = function() {
        return [this.i1d.qVa, this.i1d.Sng]
    }
    ;
    y.prototype.Xyd = function(e) {
        if (this.Fa && this.Fa.Wa && e)
            switch (e.type) {
            case "bookmark":
                this.Fa.Wa.mpa(e.data, !0);
                break;
            case "comment":
                if (e = this.Fa.Wa.Vj.gFf(e.data))
                    this.Nrd(e),
                    this.Vrd(e)
            }
    }
    ;
    y.prototype.pVe = function(e, f) {
        var y = new AscCommon.xmb;
        y.$Hb(e);
        y.xT(f);
        AscCommon.Kd.rNd(y)
    }
    ;
    y.prototype.QHf = function(e, f) {
        for (var y = e.length, Ma = 0; Ma < y; ++Ma)
            this.pVe(e[Ma], f)
    }
    ;
    y.prototype.Dod = function() {
        var e = this;
        this.ll.zIa = function(f) {
            !0 === AscCommon.Kd.gB && e.Fa.Wa.MVc(f[f.length - 1].cursor, f[f.length - 1].user, !0, f[f.length - 1].useridoriginal)
        }
        ;
        this.ll.Zra = function(f) {
            !0 === AscCommon.Kd.gB && !1 === f.state && e.Fa.Wa.l5a(f.id);
            e.Oe("asc_onConnectionStateChanged", f)
        }
        ;
        this.ll.oya = function(f) {
            if (!e.Cod(e.ll.oya, f) && 2 != f.state) {
                var y = f.block
                  , Pa = Je.cg(y);
                if (null != Pa) {
                    y = Pa.Jf;
                    y.Z6b(f.user);
                    var Ia = Pa.Jf.Hi();
                    Bb === Ia || Ma === Ia ? y.mH(Ma, !0) : y.mH(ic, !0);
                    Pa instanceof AscCommonWord.$de ? e.Tgg() : Pa instanceof AscCommonWord.ymb ? e.Rgg() : Pa instanceof AscCommon.Psa ? e.R$d(Pa.rb(), f.user) : Pa instanceof AscCommonWord.ETf ? e.Sgg() : Pa instanceof AscCommon.hkb && editor.Oe("asc_onLockCore", !0);
                    e.Fa.Wa.Ie()
                } else
                    AscCommon.Kd.$Xd(y, f.user)
            }
        }
        ;
        this.ll.lma = function(f, y) {
            if (!e.Cod(e.ll.lma, f, y)) {
                var Pa = f.block
                  , Ia = Je.cg(Pa);
                if (null != Ia) {
                    if (Pa = Ia.Jf,
                    "undefined" != typeof Pa) {
                        var Xa = Pa.Hi()
                          , Ta = Cc;
                        if (Xa === ic)
                            1 != y ? Ta = Cc : (Ta = Bb,
                            AscCommon.Kd.xbe(Ia));
                        else if (Xa === Pb)
                            Ta = Pb;
                        else if (Xa === Bb || Xa === Ma)
                            Ta = Bb;
                        Pa.mH(Ta, !0);
                        e.Fa.Wa.Ie();
                        Ia instanceof AscCommonWord.$de ? Ta !== Pb && Ta !== Cc ? e.Tgg() : e.jhg() : Ia instanceof AscCommonWord.ymb ? Ta !== Pb && Ta !== Cc ? e.Rgg() : e.hhg() : Ia instanceof AscCommon.Psa ? Ta !== Pb && Ta !== Cc ? e.R$d(Ia.rb(), f.user) : e.W$d(Ia.rb()) : Ia instanceof AscCommonWord.ETf ? Ta !== Pb && Ta !== Cc ? e.Sgg() : e.ihg() : Ia instanceof AscCommon.hkb && (Ta !== Pb && Ta !== Cc ? editor.Oe("asc_onLockCore", !0) : editor.Oe("asc_onLockCore", !1))
                    }
                } else
                    AscCommon.Kd.aDe(Pa)
            }
        }
        ;
        this.ll.wua = function(f, y, Ma) {
            var Pa;
            Ma && (Pa = -1 === AscCommon.Kd.haa);
            e.ITc === c_oAscCollaborativeMarksShowType.kf && (Pa = !1);
            y = AscCommon.fGb(y, null, !1, !1);
            e.pVe(f, !1 === Pa ? null : y);
            !Ma && e.QK && e.eCf()
        }
        ;
        this.ll.sGa = function(e) {
            e && !0 === AscCommon.Kd.gB && (e = JSON.parse(e),
            AscCommon.Kd.LDf(e.Yl, e.bVf, e.v_f))
        }
    }
    ;
    y.prototype.SGb = function() {
        AscCommon.Kd.a7b();
        this.Fa && this.Fa.Wa && this.Fa.Wa.G0d();
        this.e2d(!0);
        f.AscCommon.Gh && AscCommon.Kd.gB && f.AscCommon.Gh.Yna()
    }
    ;
    y.prototype.$Qc = function() {
        AscCommon.Kd.Bje();
        this.e2d(!1)
    }
    ;
    y.prototype.D0d = function(e) {
        if (void 0 != e && void 0 != e.ParagraphId) {
            var f = Je.cg(e.ParagraphId)
              , y = e.type;
            null != f && ("spell" === y ? (f.bz.mEf(e.RecalcId, e.usrCorrect),
            f.vTa()) : "suggest" === y && (f.bz.nEf(e.RecalcId, e.ElementId, e.usrSuggest),
            this.nCf()))
        }
    }
    ;
    y.prototype.pqd = function() {
        this.Fa.Wa && this.Fa.Wa.M0d()
    }
    ;
    y.prototype.D7a = function() {
        var e = AscCommon.Kd
          , f = this.wof() || !0 !== e.N$() && 0 !== e.Xvc();
        !0 === e.gB && !0 !== e.N$() && (f = !1);
        f !== this.c2a && (this.c2a = f,
        this.Oe("asc_onDocumentCanSaveChanged", this.c2a))
    }
    ;
    y.prototype.Ppd = function() {
        this.Fa && this.Fa.Wa && this.Fa.Wa.sva()
    }
    ;
    y.prototype.s4g = function(e) {
        if (void 0 != e.wf) {
            var f = AscCommon.TK
              , y = Ta.Zma(e.wf);
            f = f.FH(y, editor.ctg, e);
            e.wf = new ef({
                Ja: y.Ja,
                za: -1
            });
            !1 === f && !1 === this.Fa.Wa.Ke(Pa) && (this.Fa.Wa.gg(AscDFH.O5d),
            this.Fa.Wa.HV(e),
            this.Fa.Wa.Sf())
        } else
            !1 === this.Fa.Wa.Ke(Pa) && (this.Fa.Wa.gg(AscDFH.N5d),
            this.Fa.Wa.HV(e),
            this.Fa.Wa.Sf())
    }
    ;
    y.prototype.ctg = function(e) {
        this.$x(oh.tP, yb.FH);
        !1 === this.Fa.Wa.Ke(Pa) && (this.Fa.Wa.gg(AscDFH.P5d),
        this.Fa.Wa.HV(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.KSg = function(e) {
        this.Fa.Wa.LSf(e)
    }
    ;
    y.prototype.U5g = function(e) {
        this.Fa.Wa.DYf(e)
    }
    ;
    y.prototype.E4d = function() {
        var e = this.Fa.Wa
          , f = e.mu();
        e = e.Wp();
        return new Asc.XDf(f,e)
    }
    ;
    y.prototype.uJg = function() {
        return JSON.stringify(this.Fa.Wa)
    }
    ;
    y.prototype.Sxg = function() {
        return this.Fa.Wa.aa.length
    }
    ;
    y.prototype.r6g = function(e) {
        var f = this.Fa.Wa;
        !0 === f.Selection.Ka && f.Yc();
        f.sb.JD(!0);
        f.sb.pM();
        f.Selection.Ka = !0;
        f.Selection.Mb = !1;
        f.Selection.If = AscCommon.Leg;
        f.Selection.ta = e;
        f.Selection.sa = e;
        f.aa[e].Selection.Ka = !0;
        f.aa[e].Selection.ta = f.aa[e].JHb();
        f.aa[e].Selection.sa = f.aa[e].aa.length - 1;
        f.h$g()
    }
    ;
    y.prototype.$Ya = function(e) {
        "undefined" != typeof e && (this.dCf(e.ud),
        this.iCf(e.bf),
        this.xCf(e.lj),
        this.oCf(e.fj),
        this.uCf(e.Vb),
        this.tCf(e.wf),
        this.yCf(e.zj),
        this.lSf(e.xh),
        this.wCf(e.dc),
        this.qCf(e.Fj),
        this.pCf(e.hn),
        this.vCf(e.gl),
        this.sCf(e.we),
        this.rCf(e.Uf),
        this.kSf(e),
        this.IP && this.Oe("asc_onTextShd", new Asc.pWc(e.Pb)))
    }
    ;
    y.prototype.z7a = function(e) {
        var f = editor.Fa.Wa.Wp();
        e.o0 = f.zj === AscCommon.IE;
        e.n1 = f.zj === AscCommon.WE;
        e.fj = f.fj;
        e.Fj = f.Fj;
        e.nU = f.hn;
        e.gl = f.gl;
        e.SU = f.dc;
        e.we = f.we;
        !0 === e.dc.Ks ? e.dc.kg = AscCommonWord.kLd : void 0 === e.dc.Ks && (e.dc.kg = AscCommonWord.Q0d);
        !0 === e.dc.Us ? e.dc.Ji = AscCommonWord.kLd : void 0 === e.dc.Us && (e.dc.Ji = AscCommonWord.Q0d);
        e.RHa = -1 === e.cm ? "" : void 0 === e.cm || void 0 === this.Fa.Wa.Ug.ef[e.cm] ? this.Fa.Wa.Ug.ef[this.Fa.Wa.Ug.wb.Ua].Ja : this.Fa.Wa.Ug.ef[e.cm].Ja;
        var y = f = -1;
        if (null != e.Kf && 0 !== e.Kf.ae && "0" !== e.Kf.ae) {
            var Ma = this.Fa.Wa.us().jm(e.Kf.ae);
            Ma && Ma.$k(e.Kf.tc) && (y = Ma.$k(e.Kf.tc).lFf(),
            f = y.ea,
            y = y.MC)
        }
        e.nab = {
            ea: f,
            MC: y
        };
        void 0 !== e.vi && void 0 !== e.vi.KG && (e.vi.KG = AscCommonWord.uig === e.vi.KG ? !1 : AscCommonWord.tig === e.vi.KG ? !0 : void 0);
        this.rXd(e.dc);
        this.rQd(e.$b);
        this.tXd(e.Me);
        this.sXd(e.RHa);
        this.pXd(e.nab);
        this.kCf(e)
    }
    ;
    y.prototype.Spd = function(e) {
        if (null != this.Fa.xd.t_)
            !0 === f.AscDesktopEditor.IsSupportNativePrint(this.KEf) && f.AscDesktopEditor.Print();
        else {
            var y = {};
            e && e.pEa && e.pEa && Asc.EIb.Selection === e.pEa.nac() && (y.printOptions = {
                selection: 1
            });
            f.AscDesktopEditor.Print(JSON.stringify(y))
        }
        return !0
    }
    ;
    y.prototype.Ul = function() {
        this.Fa.Wa.Jza()
    }
    ;
    y.prototype.oh = function() {
        this.Fa.Wa.XTc()
    }
    ;
    y.prototype.Sa = function() {
        return f.AscDesktopEditor ? (f.asc_desktop_copypaste(this, "Copy"),
        !0) : AscCommon.p3.Z0c()
    }
    ;
    y.prototype.w5a = function(e, f) {
        this.Fa.xd.w5a(e, f)
    }
    ;
    y.prototype.cVf = function() {
        return f.AscDesktopEditor ? (f.asc_desktop_copypaste(this, "Cut"),
        !0) : AscCommon.p3.ade()
    }
    ;
    y.prototype.dYf = function() {
        return f.AscDesktopEditor ? (f.asc_desktop_copypaste(this, "Paste"),
        !0) : !this.Fa.Wa || AscCommon.p3.s_d() ? !1 : AscCommon.p3.bde()
    }
    ;
    y.prototype.wZf = function() {}
    ;
    y.prototype.F7b = function(e, y) {
        if (this.Fa.Wa) {
            var Ma = null;
            if (AscCommon.wt.Text & y) {
                var Pa = this.Fa.Wa.Jq(!1, {
                    aPc: !0
                });
                e.Bua(AscCommon.wt.Text, "" === Pa ? null : Pa)
            }
            AscCommon.wt.qia & y && (Pa = new AscCommon.NTc(this),
            Ma = Pa.Mb(),
            Pa = Pa.lJb(),
            e.Bua(AscCommon.wt.qia, "" === Pa ? null : Pa));
            AscCommon.wt.Ll & y && (null === Ma && (f.NATIVE_EDITOR_ENJINE ? (Pa = new AscCommon.NTc(this,!0),
            Ma = Pa.E8f()) : (Pa = new AscCommon.NTc(this),
            Ma = Pa.Mb())),
            e.Bua(AscCommon.wt.Ll, "" === Ma ? null : Ma))
        } else
            Ma = AscCommon.wt.Text & y ? {
                Text: ""
            } : null,
            Pa = this.Fa.xd.t_.Sa(Ma),
            AscCommon.wt.Text & y && e.Bua(AscCommon.wt.Text, Ma.Text),
            AscCommon.wt.qia & y && e.Bua(AscCommon.wt.qia, Pa)
    }
    ;
    y.prototype.crd = function() {
        if (!AscCommon.Kd.Tna()) {
            var e = this.Fa.Wa;
            e && !e.hm(!0) && !1 === e.Ke(AscCommon.l3) && (e.gg(AscDFH.P4d),
            e.ng(-1, !0, !0),
            e.sr(),
            e.Sf())
        }
    }
    ;
    y.prototype.sJa = function(e, y, Ma, Pa, Ia, Xa) {
        if (!AscCommon.Kd.Tna()) {
            var Ta = this.Fa.Wa;
            Ta && !1 === Ta.Ke(jb, null, !0, !1) && (f.AscCommon.Gh.zdd(Xa),
            Ia || Ta.gg(AscDFH.FXb),
            AscCommon.$Nd(this, e, y, Ma, Pa, void 0, Xa))
        }
    }
    ;
    y.prototype.d1d = function() {
        var e = this.Fa.Wa;
        e && e.Sf()
    }
    ;
    y.prototype.j_e = function(e) {
        return AscCommon.Gh.nIe(e)
    }
    ;
    y.prototype.k_e = function(e) {
        if (!AscCommon.Kd.Tna()) {
            var y = this.Fa.Wa;
            y && !1 === y.Ke(jb, null, !0, !1) && (f.AscCommon.Gh.zdd(),
            f.AscCommon.Gh.qIe(),
            this.Fa.Wa.Jza(),
            y.gg(AscDFH.FXb),
            AscCommon.$Nd(this, null, null, null, null, e),
            y.Sf())
        }
    }
    ;
    y.prototype.j2d = function() {
        var e = f.AscCommon.Gh;
        if (e && !e.IYd()) {
            var y = e.KT ? e.KT : null;
            if (y && null !== e.T2) {
                var Ma = y.cBa
                  , Pa = Je.cg(e.T2)
                  , Ia = Pa.ka
                  , Xa = Pa.la
                  , Ta = Pa.yWf()
                  , jb = Pa.bv(!0);
                jb && jb.le && (Ia = jb.le.ka + jb.le.W,
                Xa = jb.le.la + jb.le.Jb,
                Ta = jb.le.Qc);
                if (Pa = Pa.nr())
                    jb = Pa.Sb(Ia, Xa),
                    Ia = Pa.Tb(Ia, Xa),
                    Xa = jb;
                e.KT.Znb = {
                    x: Ia,
                    y: Xa,
                    sya: Ta
                };
                Ia = this.Fa.Wa.sb.vy(Ia, Xa, Ta);
                Ia = new AscCommon.rJa(Ia.ka,Ia.la,0,0);
                y.tnb(Ia);
                Ma ? (y.options = [],
                this.G1d(y)) : this.iQc(y)
            }
            e.T2 = null;
            return !0
        }
    }
    ;
    y.prototype.iQc = function(e) {
        this.Oe("asc_onShowSpecialPasteOptions", e)
    }
    ;
    y.prototype.WZe = function() {
        this.Oe("asc_onHideSpecialPasteOptions")
    }
    ;
    y.prototype.G1d = function() {
        var e = AscCommon.Gh;
        if (e) {
            if (e.KT && e.KT.Znb) {
                var f = e.KT;
                e = this.Fa.Wa.sb.vy(f.Znb.x, f.Znb.y, f.Znb.sya);
                e = new AscCommon.rJa(e.ka,e.la,0,0);
                f.tnb(e)
            }
            f && this.Oe("asc_onShowSpecialPasteOptions", f)
        }
    }
    ;
    y.prototype.xQc = function(e) {
        this.Fa.Wa && this.Fa.xd && (this.Fa.xd.YPd(),
        this.Fa.SAa(),
        this.Fa.Tr(e),
        this.Fa.fL())
    }
    ;
    y.prototype.aRc = function() {
        this.Fa.Wa && this.Fa.xd && this.Fa.xd.UEf(!0)
    }
    ;
    y.prototype.Mpd = function() {
        var e = this;
        Ud.gOc();
        c_oAscCollaborativeMarksShowType.vad === this.ITc && AscCommon.Kd.AHa();
        var y = AscCommon.Kd.HHb();
        AscCommon.Kd.dHb();
        this.ll.$ra = function() {
            e.ll.$ra = null;
            e.MHc && e.MLa && (e.ZEa = e.j0a());
            e.A2c();
            e.I1 = !0;
            e.MLa = !1;
            e.ZEa || e.$x(oh.tP, yb.lH);
            e.D7a();
            void 0 !== f.AscDesktopEditor && f.AscDesktopEditor.OnSave();
            e.vxb && (e.ll.disconnect(e.vxb.code, e.vxb.reason),
            e.vxb = null);
            AscCommon.Gh && !AscCommon.Kd.N$() && AscCommon.Gh.Yna();
            e.d_ && e.ETb()
        }
        ;
        var Ma = null;
        !0 === AscCommon.Kd.gB && (Ma = Ud.sOd());
        this.Zxb ? (AscCommon.Kd.$sa(!1),
        AscCommon.Kd.Ul(),
        this.Zxb = !1) : AscCommon.Kd.Klc(this.MLa, {
            Yl: this.ll.mSa(),
            v_f: this.To.xla(),
            bVf: Ma
        }, y, !0)
    }
    ;
    y.prototype.dod = function() {
        var e = new Date;
        null === this.mhb && (this.mhb = e);
        if (AscCommon.Kd.gB && !AscCommon.Kd.N$())
            this.Fa.Wa.Zge();
        else {
            var f = !1;
            Ud.nm && 0 <= Ud.za && Ud.za < Ud.nm.length && e - Ud.nm[Ud.za].pda < this.LOf && (f = !0);
            !f && e - this.mhb > (0 >= AscCommon.Kd.haa ? this.Y9e : this.X9e) && (1 == Ud.AZ(!0) && this.tda(!0),
            this.mhb = e)
        }
    }
    ;
    y.prototype.pqc = function() {
        return !this.q2() && !(this.Fa.Wa && this.Fa.Wa.HRa())
    }
    ;
    y.prototype.mpd = function() {
        return AscCommon.Kd.HHb()
    }
    ;
    y.prototype.eRg = function(e) {
        var f = e ? Xa.nZd : Xa.kf;
        e = {
            c: "pathurl",
            title: this.Yqa,
            data: "origin." + this.VIb
        };
        var y = this;
        y.qna = function(e) {
            null != e && "pathurl" == e.type ? "ok" == e.status ? (e = e.data) ? y.dHd(e, f) : y.Yd.trigger("asc_onError", de.pg.QN, de.Lk.Vo) : y.Yd.trigger("asc_onError", AscCommon.wGb(parseInt(e.data)), de.Lk.Vo) : y.Yd.trigger("asc_onError", de.pg.QN, de.Lk.Vo)
        }
        ;
        Di(this, null, e)
    }
    ;
    y.prototype.$qd = function(e) {
        this.Xuc(this.ZDd ? yb.XOb : yb.Pfc, e)
    }
    ;
    y.prototype.dRg = function(e, f, y, Ma) {
        f = this.Fa.Wa.YWf(f, y);
        null != f && (y = null,
        e = new Asc.eQc(e,!0),
        e.lSc = f,
        e.u3d = de.pg.D_d,
        Ma && (y = Asc.OH.oZd,
        e.AYc = !1),
        this.Xuc(y, e));
        return null != f
    }
    ;
    y.prototype.jB = function() {
        !1 !== this.QK && this.Fa.m7a(!1)
    }
    ;
    y.prototype.USf = function() {}
    ;
    y.prototype.fXf = function() {}
    ;
    y.prototype.UZa = function(e, f) {
        if (this.u7b === ob.NRa && !AscCommon.WD.UZa(this, e, f))
            switch (e) {
            case Xe.t5a:
                Di(this, null, {
                    id: this.e_,
                    userid: this.yga,
                    format: this.VIb,
                    c: "reopen",
                    title: this.Yqa,
                    codepage: f.HTa(),
                    nobase64: !0
                });
                break;
            case Xe.qMb:
                Di(this, null, {
                    id: this.e_,
                    userid: this.yga,
                    format: this.VIb,
                    c: "reopen",
                    title: this.Yqa,
                    password: f.awb(),
                    nobase64: !0
                })
            }
    }
    ;
    y.prototype.iFe = function(e) {
        this.i6 ? (Zh.BEd === e ? AscCommon.gP.PQb(!1, !1) : Zh.jzd === e ? AscCommon.gP.PQb(!0, !1) : Zh.kYc === e && AscCommon.gP.PQb(!0, !0),
        this.Fa.xd.TD(),
        void 0 !== AscCommon.dUa && null !== AscCommon.dUa && AscCommon.dUa.nHb(),
        this.QK && this.Fa.AW()) : this.zXd = e
    }
    ;
    y.prototype.dHd = function(e, f) {
        var y = this;
        this.ZDd ? (this.ZDd = null,
        AscCommon.oPf(e, function(e) {
            if (null === e)
                y.Oe("asc_onError", de.pg.XOb, de.Lk.Vo);
            else
                try {
                    y.r2f(JSON.parse(e.responseText))
                } catch (Sk) {
                    y.Oe("asc_onError", de.pg.XOb, de.Lk.Vo)
                }
        })) : this.JFa && this.JFa.dvg ? this.JFa.dvg(this, e) : AscCommon.Cnb.prototype.dHd.call(this, e, f)
    }
    ;
    y.prototype.uwd = function() {
        this.JFa && (this.JFa.XZg(this),
        this.JFa = null)
    }
    ;
    y.prototype.pgg = function() {
        this.fCf();
        if (null != this.Fa.xd.t_) {
            var e = this.Fa.xd.t_;
            this.Oe("asc_onDocInfo", new Ab({
                O$: e.DF,
                l7b: e.BEf,
                Q6b: e.zEf,
                d7b: e.Nhe,
                e7b: e.Nhe + e.AEf
            }));
            this.mXd()
        } else
            this.Fa.Wa.ZGf()
    }
    ;
    y.prototype.sgg = function() {
        this.gCf();
        null != this.Fa.Wa && this.Fa.Wa.$Gf()
    }
    ;
    y.prototype.P$d = function(e) {
        this.Oe("asc_onDocInfo", new Ab(e))
    }
    ;
    y.prototype.fCf = function() {
        this.Oe("asc_onGetDocInfoStart")
    }
    ;
    y.prototype.gCf = function() {
        this.Oe("asc_onGetDocInfoStop")
    }
    ;
    y.prototype.mXd = function() {
        this.Oe("asc_onGetDocInfoEnd")
    }
    ;
    y.prototype.eTc = function(e) {
        this.Oe("asc_onCanUndo", e)
    }
    ;
    y.prototype.dTc = function(e) {
        !0 === AscCommon.Kd.gB && !0 !== AscCommon.Kd.N$() && (e = !1);
        this.Oe("asc_onCanRedo", e)
    }
    ;
    y.prototype.c4f = function() {
        return this.Fa.Wa.Nna()
    }
    ;
    y.prototype.aSf = function(e) {
        this.Oe("asc_onCanCopyCut", e)
    }
    ;
    y.prototype.nBf = function() {
        this.pna = this.yIa = !0;
        this.Blb();
        this.Fa.Wa.UDa()
    }
    ;
    y.prototype.BAf = function() {
        this.yIa = !1;
        this.L5a = !0;
        this.ilb();
        this.Fa.Wa.VDa()
    }
    ;
    Ab.prototype.c9f = function() {
        return this.O$
    }
    ;
    Ab.prototype.qdg = function(e) {
        this.O$ = e
    }
    ;
    Ab.prototype.k9f = function() {
        return this.l7b
    }
    ;
    Ab.prototype.Mdg = function(e) {
        this.l7b = e
    }
    ;
    Ab.prototype.d9f = function() {
        return this.Q6b
    }
    ;
    Ab.prototype.rdg = function(e) {
        this.Q6b = e
    }
    ;
    Ab.prototype.h9f = function() {
        return this.d7b
    }
    ;
    Ab.prototype.Adg = function(e) {
        this.d7b = e
    }
    ;
    Ab.prototype.i9f = function() {
        return this.e7b
    }
    ;
    Ab.prototype.Bdg = function(e) {
        this.e7b = e
    }
    ;
    y.prototype.khg = function() {
        this.Oe("asc_onUndo")
    }
    ;
    y.prototype.Xgg = function() {
        this.Oe("asc_onRedo")
    }
    ;
    y.prototype.Mgg = function() {
        this.Oe("asc_onCopy")
    }
    ;
    y.prototype.Ngg = function() {
        this.Oe("asc_onCut")
    }
    ;
    y.prototype.Wgg = function() {
        this.Oe("asc_onPaste")
    }
    ;
    y.prototype.$gg = function() {
        this.Oe("asc_onShare")
    }
    ;
    y.prototype.Ygg = function() {
        this.Oe("asc_onSave")
    }
    ;
    y.prototype.Ogg = function() {
        this.Oe("asc_onDownload")
    }
    ;
    y.prototype.Hgg = function() {
        this.Oe("asc_onAddURL")
    }
    ;
    y.prototype.Pgg = function(e, f) {
        this.Oe("asc_onError", e, f)
    }
    ;
    y.prototype.Qgg = function(e) {
        this.Oe("asc_onHelp", e)
    }
    ;
    y.prototype.lhg = function(e) {
        this.Oe("asc_onZoom", e)
    }
    ;
    y.prototype.MNd = function(e) {
        this.Oe("asc_onClearPropObj", e)
    }
    ;
    y.prototype.n2f = function() {
        this.Fa.Wa && (this.Fa.xd.Wng(),
        this.Fa.xd.Fkd = new Asc.Q1c,
        this.Fa.xd.Fkd.TIa = !0,
        this.Fa.xd.Fkd.dw = !0,
        this.Fa.xd.Fkd.NIa = !0,
        this.Fa.xd.Vkg())
    }
    ;
    y.prototype.JUf = function() {
        this.mCf([])
    }
    ;
    y.prototype.rWf = function() {}
    ;
    y.prototype.u9f = function(e) {
        this.ePa(e)
    }
    ;
    y.prototype.Jgg = function(e, f) {
        this.Oe("asc_onChangeActiveHeader", e, new Asc.uYd(f))
    }
    ;
    y.prototype.mCf = function(e) {
        for (var f = [], y = 0; y < e.length; y++)
            f[y] = new Asc.uYd(e[y]);
        this.Oe("asc_onReturnHeaders", f)
    }
    ;
    y.prototype.W7e = function() {
        null != this.Fa.xd.t_ && (this.Fa.xd.t_.sA.zXf = !1,
        this.Fa.Er())
    }
    ;
    y.prototype.C_e = function(e, f, y) {
        if (null != this.Fa.xd.t_)
            return this.Fa.xd.t_.findText(e, y, f),
            this.Fa.xd.t_.sA.vl;
        e = editor.Fa.Wa.az(e, {
            ULa: y
        });
        f = this.Fa.Wa.uq(f);
        null != f && this.Fa.Wa.mPc(f);
        return e.vl
    }
    ;
    y.prototype.U7e = function(e, f, y, Ma) {
        if (null != this.Fa.Wa)
            if (this.Fa.Wa.az(e, {
                ULa: Ma
            }),
            !0 === y)
                this.Fa.Wa.lPc(f, !0, -1);
            else
                return e = this.Fa.Wa.rA.TTc,
                y = this.Fa.Wa.rA.Ci,
                -1 != e && this.Fa.Wa.lPc(f, !1, e),
                f = this.Fa.Wa.uq(y),
                null != f ? (this.Fa.Wa.mPc(f),
                !0) : !1
    }
    ;
    y.prototype.yIf = function(e) {
        null != this.Fa.xd.t_ ? (this.Fa.xd.t_.sA.Kfa = e,
        this.Fa.Er()) : this.Fa.Wa.nng(e)
    }
    ;
    y.prototype.cVg = function() {
        return null != this.Fa.xd.t_ ? this.Fa.xd.t_.sA.Kfa : this.Fa.Wa.rA.Selection
    }
    ;
    y.prototype.lCf = function(e, f) {
        this.Oe("asc_onReplaceAll", f, e)
    }
    ;
    y.prototype.hTc = function() {
        this.Oe("asc_onSearchEnd")
    }
    ;
    y.prototype.Gdg = function(e) {
        var f = AscCommon.TK
          , y = Ta.Zma(e);
        !1 === f.FH(y) && !1 === this.Fa.Wa.Ke(AscCommon.fP) && (this.Fa.Wa.gg(AscDFH.s6d),
        this.Fa.Wa.$g(new AscCommonWord.tN({
            wf: {
                Ja: e,
                za: -1
            }
        })),
        this.Fa.Wa.Bd(),
        this.Fa.Wa.Kl(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.Hdg = function(e) {
        !1 === this.Fa.Wa.Ke(AscCommon.fP) && (this.Fa.Wa.gg(AscDFH.u6d),
        this.Fa.Wa.$g(new AscCommonWord.tN({
            Vb: Math.min(e, 100)
        })),
        this.Fa.Wa.Bd(),
        this.Fa.Wa.Kl(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.Fdg = function(e) {
        !1 === this.Fa.Wa.Ke(AscCommon.fP) && (this.Fa.Wa.gg(AscDFH.o6d),
        this.Fa.Wa.$g(new AscCommonWord.tN({
            ud: e
        })),
        this.Fa.Wa.Bd(),
        this.Fa.Wa.Kl(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.Idg = function(e) {
        !1 === this.Fa.Wa.Ke(AscCommon.fP) && (this.Fa.Wa.gg(AscDFH.x6d),
        this.Fa.Wa.$g(new AscCommonWord.tN({
            bf: e
        })),
        this.Fa.Wa.Bd(),
        this.Fa.Wa.Kl(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.Ldg = function(e) {
        !1 === this.Fa.Wa.Ke(AscCommon.fP) && (this.Fa.Wa.gg(AscDFH.C6d),
        this.Fa.Wa.$g(new AscCommonWord.tN({
            lj: e
        })),
        this.Fa.Wa.Bd(),
        this.Fa.Wa.Kl(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.Kdg = function(e) {
        !1 === this.Fa.Wa.Ke(AscCommon.fP) && (this.Fa.Wa.gg(AscDFH.B6d),
        this.Fa.Wa.$g(new AscCommonWord.tN({
            fj: e,
            Fj: !1
        })),
        this.Fa.Wa.Bd(),
        this.Fa.Wa.Kl(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.l5g = function(e) {
        !1 === this.Fa.Wa.Ke(AscCommon.fP) && (this.Fa.Wa.gg(AscDFH.r6d),
        this.Fa.Wa.$g(new AscCommonWord.tN({
            Fj: e,
            fj: !1
        })),
        this.Fa.Wa.Bd(),
        this.Fa.Wa.Kl(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.o5g = function(e) {
        !1 === this.Fa.Wa.Ke(AscCommon.fP) && (this.Fa.Wa.gg(AscDFH.A6d),
        this.Fa.Wa.$g(new AscCommonWord.tN({
            dc: e
        })),
        this.Fa.Wa.Bd(),
        this.Fa.Wa.Kl(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.k5g = function(e) {
        !1 === this.Fa.Wa.Ke(AscCommon.fP) && (this.Fa.Wa.gg(AscDFH.p6d),
        this.Fa.Wa.$g(new AscCommonWord.tN({
            hn: e,
            gl: !1
        })),
        this.Fa.Wa.Bd(),
        this.Fa.Wa.Kl(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.n5g = function(e) {
        !1 === this.Fa.Wa.Ke(AscCommon.fP) && (this.Fa.Wa.gg(AscDFH.z6d),
        this.Fa.Wa.$g(new AscCommonWord.tN({
            gl: e,
            hn: !1
        })),
        this.Fa.Wa.Bd(),
        this.Fa.Wa.Kl(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.m5g = function(e) {
        !1 === this.Fa.Wa.Ke(AscCommon.fP) && (this.Fa.Wa.gg(AscDFH.y6d),
        this.Fa.Wa.$g(new AscCommonWord.tN({
            we: e
        })),
        this.Fa.Wa.Bd(),
        this.Fa.Wa.Kl(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.Jdg = function(e) {
        !1 === this.Fa.Wa.Ke(AscCommon.fP) && (this.Fa.Wa.gg(AscDFH.hUd),
        this.Fa.Wa.$g(new AscCommonWord.tN({
            Uf: {
                Jc: e
            }
        })),
        this.Fa.Wa.cP.pEf(),
        this.Fa.Wa.Bd(),
        this.Fa.Wa.Kl(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.wdg = function(e, f) {
        !1 === this.Fa.Wa.Ke(Pa) && (this.Fa.Wa.gg(AscDFH.f6d),
        this.Fa.Wa.KD({
            jj: e,
            qc: f
        }),
        this.Fa.Wa.Bd(),
        this.Fa.Wa.Kl(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.odg = function(e, f) {
        if (!1 === this.Fa.Wa.Ke(Pa)) {
            this.Fa.Wa.gg(AscDFH.g6d);
            switch (e) {
            case 0:
                AscCommonWord.kLd === f ? this.Fa.Wa.KD({
                    Us: !0
                }) : this.Fa.Wa.KD({
                    Ji: f,
                    Us: !1
                });
                break;
            case 1:
                AscCommonWord.kLd === f ? this.Fa.Wa.KD({
                    Ks: !0
                }) : this.Fa.Wa.KD({
                    kg: f,
                    Ks: !1
                })
            }
            this.Fa.Wa.Sf()
        }
    }
    ;
    y.prototype.dOd = function() {
        !1 === this.Fa.Wa.Ke(AscCommon.fP) && (this.Fa.Wa.gg(AscDFH.v5d),
        this.Fa.Wa.WC(!0),
        this.Fa.Wa.Bd(),
        this.Fa.Wa.Kl(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.eOd = function() {
        !1 === this.Fa.Wa.Ke(AscCommon.fP) && (this.Fa.Wa.gg(AscDFH.k5d),
        this.Fa.Wa.WC(!1),
        this.Fa.Wa.Bd(),
        this.Fa.Wa.Kl(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.l4g = function(e) {
        !1 === this.Fa.Wa.Ke(Pa) && (this.Fa.Wa.gg(AscDFH.Z5d),
        this.Fa.Wa.GG(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.dCf = function(e) {
        this.Oe("asc_onBold", e)
    }
    ;
    y.prototype.iCf = function(e) {
        this.Oe("asc_onItalic", e)
    }
    ;
    y.prototype.xCf = function(e) {
        this.Oe("asc_onUnderline", e)
    }
    ;
    y.prototype.oCf = function(e) {
        this.Oe("asc_onStrikeout", e)
    }
    ;
    y.prototype.tCf = function(e) {
        void 0 != e ? this.Oe("asc_onFontFamily", new ef(e)) : this.Oe("asc_onFontFamily", new ef({
            Ja: "",
            za: -1
        }))
    }
    ;
    y.prototype.uCf = function(e) {
        this.Oe("asc_onFontSize", e)
    }
    ;
    y.prototype.gSf = function(e) {
        this.Oe("asc_onLineSpacing", new Asc.oWc(e))
    }
    ;
    y.prototype.y7g = function(e) {
        this.Ex || this.Oe("asc_onInitEditorStyles", e)
    }
    ;
    y.prototype.cSf = function(e, f) {
        this.Ex || this.Oe("asc_onInitTableTemplates", e, f)
    }
    ;
    y.prototype.Dcg = function(e) {
        var f = this.Mca();
        if (f) {
            var y = [];
            void 0 != e.uv && y.push({
                ea: AscCommon.dBa,
                Element: f,
                Lu: AscCommon.oga
            });
            void 0 === e.o0 && void 0 === e.fj && void 0 === e.Fj && void 0 === e.gl && void 0 === e.nU && void 0 === e.SU && void 0 === e.we || y.push({
                ea: AscCommon.iVb,
                $Ma: [AscCommon.fP]
            });
            if (!f.YL(Pa, y)) {
                f.gg(AscDFH.k6d);
                "undefined" != typeof e.Hp && null != e.Hp && this.Fa.Wa.aJ(e.Hp);
                "undefined" != typeof e.$b && null != e.$b && this.Fa.Wa.$B(e.$b);
                "undefined" != typeof e.Me && null != e.Me && this.Fa.Wa.vu(e.Me);
                "undefined" != typeof e.Kn && null != e.Kn && this.Fa.Wa.bJ(e.Kn);
                void 0 != e.Zn && null != e.Zn && this.Fa.Wa.cJ(e.Zn);
                void 0 != e.Op && null != e.Op && this.Fa.Wa.dJ(e.Op);
                "undefined" != typeof e.Lp && null != e.Lp && this.Fa.Wa.DK(e.Lp);
                "undefined" != typeof e.dc && null != e.dc && this.Fa.Wa.KD(e.dc);
                void 0 !== e.Ts && this.Fa.Wa.NGf(e.Ts);
                "undefined" != typeof e.Pb && null != e.Pb && (y = new AscFormat.Mj,
                y.fill = new AscFormat.cH,
                y.fill.color = AscFormat.rHb(e.Pb.va, y.fill.color, 1),
                this.Fa.Wa.qI({
                    pa: e.Pb.pa,
                    va: {
                        r: e.Pb.va.cwb(),
                        vb: e.Pb.va.Xvb(),
                        Xa: e.Pb.va.Vvb()
                    },
                    ab: y
                }));
                "undefined" != typeof e.nc && null != e.nc && (e.nc.Ba && e.nc.Ba.va && (e.nc.Ba.ab = AscFormat.Rea(e.nc.Ba.va, 1)),
                e.nc.Oa && e.nc.Oa.va && (e.nc.Oa.ab = AscFormat.Rea(e.nc.Oa.va, 1)),
                e.nc.Ra && e.nc.Ra.va && (e.nc.Ra.ab = AscFormat.Rea(e.nc.Ra.va, 1)),
                e.nc.Ta && e.nc.Ta.va && (e.nc.Ta.ab = AscFormat.Rea(e.nc.Ta.va, 1)),
                e.nc.fk && e.nc.fk.va && (e.nc.fk.ab = AscFormat.Rea(e.nc.fk.va, 1)),
                e.nc.sk && e.nc.sk.va && (e.nc.sk.ab = AscFormat.Rea(e.nc.sk.va, 1)),
                this.Fa.Wa.GG(e.nc));
                void 0 != e.ug && (y = new AscCommonWord.WDf,
                y.tf(e.ug.ug),
                this.Fa.Wa.GH(y));
                void 0 != e.uv && this.Fa.Wa.SGf(e.uv);
                y = new AscCommonWord.YSa;
                if (!0 === e.o0)
                    y.zj = AscCommon.IE;
                else if (!0 === e.n1)
                    y.zj = AscCommon.WE;
                else if (!1 === e.n1 || !1 === e.o0)
                    y.zj = AscCommon.fR;
                void 0 != e.fj && (y.fj = e.fj,
                y.Fj = !1);
                void 0 != e.Fj && (y.Fj = e.Fj,
                !0 === y.Fj && (y.fj = !1));
                void 0 != e.gl && (y.gl = e.gl,
                y.nU = !1);
                void 0 != e.nU && (y.hn = e.nU,
                !0 === y.nU && (y.gl = !1));
                void 0 != e.SU && (y.dc = e.SU);
                void 0 != e.we && (y.we = e.we);
                f.$g(new AscCommonWord.tN(y));
                f.Bd();
                f.Kl();
                f.Sf()
            }
        }
    }
    ;
    y.prototype.sdg = function(e) {
        !1 === this.Fa.Wa.Ke(Pa) && (this.Fa.Wa.gg(AscDFH.Y5d),
        this.Fa.Wa.vu(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.Edg = function(e) {
        !1 === this.Fa.Wa.Ke(AscCommon.fP) && (this.Fa.Wa.gg(AscDFH.D6d),
        this.Fa.Wa.$g(new AscCommonWord.tN({
            zj: e
        })),
        this.WHa(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.pdg = function(e, f) {
        function y() {
            if (!1 === Ma.Ke(Pa)) {
                var y = {
                    ea: 0,
                    MC: -1
                };
                y.ea = e;
                y.MC = f;
                Ma.gg(AscDFH.h6d);
                Ma.Zmb(y);
                Ma.Sf()
            }
        }
        var Ma = this.Fa.Wa
          , Ia = "";
        if (0 === e)
            switch (f) {
            case 1:
                Ia = String.fromCharCode(183);
                break;
            case 2:
                Ia = "o";
                break;
            case 3:
                Ia = String.fromCharCode(167);
                break;
            case 4:
                Ia = String.fromCharCode(118);
                break;
            case 5:
                Ia = String.fromCharCode(216);
                break;
            case 6:
                Ia = String.fromCharCode(252);
                break;
            case 7:
                Ia = String.fromCharCode(168);
                break;
            case 8:
                Ia = String.fromCharCode(8211)
            }
        0 < Ia.length ? AscFonts.tp.UTa(Ia, this, y) : y()
    }
    ;
    y.prototype.XQg = function() {
        var e = this.Fa.Wa;
        e && e.OUf()
    }
    ;
    y.prototype.eSg = function(e) {
        var f = this.Fa.Wa;
        f && f.NYf(e)
    }
    ;
    y.prototype.oRg = function() {
        var e = this.Fa.Wa;
        if (!e)
            return null;
        var f = e.FOc(!0);
        return f && e.us().jm(f.ae) ? f.ae : null
    }
    ;
    y.prototype.pRg = function() {
        var e = this.Fa.Wa;
        return e ? (e = e.FOc(!0)) && void 0 !== e.tc && null !== e.tc ? e.tc : -1 : -1
    }
    ;
    y.prototype.kRg = function() {
        var e = this.Mca();
        return e ? (e = e.kp(!0)) ? e.Ye.Ll.bUc : -1 : -1
    }
    ;
    y.prototype.yRg = function(e) {
        var f = this.Fa.Wa;
        if (!f)
            return null;
        e = f.us().jm(e);
        if (!e)
            return null;
        f = new Asc.uTf;
        e.aWf(f);
        return f
    }
    ;
    y.prototype.LQg = function(e, f) {
        var y = this.Fa.Wa;
        if (!y)
            return null;
        if (f) {
            var Ma = y.Nmb();
            if (y.Ke(AscCommon.rR, {
                ea: AscCommon.xaa,
                Xb: Ma,
                Lu: AscCommon.hJ
            }))
                return null
        }
        y.gg(AscDFH.j5d);
        f = y.us().A7();
        f.$Vf(e);
        e = f.Wi();
        if (Ma) {
            f = 0;
            for (var Pa = Ma.length; f < Pa; ++f) {
                var Ia = Ma[f]
                  , Xa = Ia.bk();
                Xa ? Ia.F$(e, Xa.tc) : Ia.F$(e, 0)
            }
            y.Bd();
            y.Kl();
            y.sr()
        }
        y.Sf()
    }
    ;
    y.prototype.VQg = function(e, f, y) {
        var Ma = this.Fa.Wa;
        if (Ma && (e = Ma.us().jm(e)) && !Ma.Ke(AscCommon.rR, {
            ea: AscCommon.xaa,
            Xb: [e],
            Lu: AscCommon.hJ
        })) {
            Ma.gg(AscDFH.e5d);
            if (f instanceof Asc.vTf)
                e.GGf(f, y);
            else if (void 0 !== f.length && f.length === y.length)
                for (var Pa = 0, Ia = f.length; Pa < Ia; ++Pa)
                    e.GGf(f[Pa], y[Pa]);
            Ma.Bd();
            Ma.Kl();
            Ma.sr();
            Ma.Sf()
        }
    }
    ;
    y.prototype.h5g = function(e) {
        !1 === this.Fa.Wa.Ke(Pa) && (this.Fa.Wa.gg(AscDFH.m6d),
        this.Fa.Wa.tA(e, !0),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.dZf = function(y) {
        void 0 === f.LOc && null != this.Fa.dT && (f.LOc = e.getElementById(y),
        f.LOc.onkeypress = function(e) {
            if (!1 === editor.Fa.Pva)
                return editor.Fa.Pva = !0,
                e = editor.Fa.AIa(e),
                editor.Fa.Pva = !1,
                e
        }
        ,
        f.LOc.onkeydown = function(e) {
            if (!1 === editor.Fa.Pva)
                return editor.Fa.Pva = !0,
                e = editor.Fa.Pia(e),
                editor.Fa.Pva = !1,
                e
        }
        )
    }
    ;
    y.prototype.ydg = function(e) {
        this.DVc = e
    }
    ;
    y.prototype.f9f = function() {
        return this.DVc
    }
    ;
    y.prototype.sHd = function(e) {
        if (this.nVd() || this.PRc())
            e = !1;
        this.jr = e;
        this.Fa.cFb();
        !0 === this.oGb && this.Bcc(!1);
        return this.jr
    }
    ;
    y.prototype.Pyd = function() {
        return this.jr
    }
    ;
    y.prototype.bhg = function() {
        this.Oe("asc_onShowParaMarks", this.Pyd())
    }
    ;
    y.prototype.zdg = function(e) {
        this.QRc = e;
        this.Fa.cFb();
        !0 === this.oGb && this.Bcc(!1);
        return this.QRc
    }
    ;
    y.prototype.g9f = function() {
        return this.QRc
    }
    ;
    y.prototype.R4g = function(e) {
        !1 === this.Fa.Wa.Ke(Pa) && (this.Fa.Wa.gg(AscDFH.j6d),
        this.Fa.Wa.DK(e),
        this.fSf(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.QQf = function(e) {
        !1 === this.Fa.Wa.Ke(Pa) && (this.Fa.Wa.gg(AscDFH.n6d),
        this.Fa.Wa.dJ(e),
        this.GFg(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.LQf = function(e) {
        !1 === this.Fa.Wa.Ke(Pa) && (this.Fa.Wa.gg(AscDFH.d6d),
        this.Fa.Wa.bJ(e),
        this.dSf(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.MQf = function(e) {
        !1 === this.Fa.Wa.Ke(Pa) && (this.Fa.Wa.gg(AscDFH.e6d),
        this.Fa.Wa.cJ(e),
        this.BFg(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.k4g = function(e) {
        !1 === this.Fa.Wa.Ke(Pa) && (this.Fa.Wa.gg(AscDFH.$5d),
        this.Fa.Wa.aJ(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.D4g = function(e, f, y, Ma) {
        !1 === this.Fa.Wa.Ke(AscCommon.fP) && (!1 === e ? (this.Fa.Wa.gg(AscDFH.w6d),
        this.Fa.Wa.$g(new AscCommonWord.tN({
            xh: AscCommonWord.vbc
        }))) : (this.Fa.Wa.gg(AscDFH.v6d),
        this.Fa.Wa.$g(new AscCommonWord.tN({
            xh: {
                r: f,
                vb: y,
                Xa: Ma
            }
        }))),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.Ddg = function(e) {
        if (!1 === this.Fa.Wa.Ke(AscCommon.fP)) {
            this.Fa.Wa.gg(AscDFH.q6d);
            if (!0 === e.lf)
                this.Fa.Wa.$g(new AscCommonWord.tN({
                    va: {
                        lf: !0,
                        r: 0,
                        vb: 0,
                        Xa: 0
                    },
                    ab: void 0
                }));
            else {
                var f = new AscFormat.Mj;
                f.fill = new AscFormat.cH;
                f.fill.color = AscFormat.rHb(e, f.fill.color, 1);
                this.Fa.Wa.$g(new AscCommonWord.tN({
                    ab: f
                }))
            }
            this.Fa.Wa.Bd();
            this.Fa.Wa.Kl();
            this.Fa.Wa.Sf()
        }
    }
    ;
    y.prototype.U4g = function(e, f, y) {
        this.Fa.Wa.YL(AscCommon.hJ, {
            ea: AscCommon.iVb,
            $Ma: [AscCommon.fP]
        }) || (this.Fa.Wa.gg(AscDFH.l6d),
        !0 === y && this.Fa.Wa.PGf(!1),
        !1 === e ? this.Fa.Wa.qI({
            pa: Asc.FP
        }) : (e = new AscFormat.Mj,
        e.fill = new AscFormat.cH,
        e.fill.color = AscFormat.rHb(f, e.fill.color, 1),
        this.Fa.Wa.qI({
            pa: Asc.ona,
            va: {
                r: f.cwb(),
                vb: f.Xvb(),
                Xa: f.Vvb()
            },
            ab: e
        })),
        this.Fa.Wa.PGf(!0),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.udg = function(e, f) {
        !1 === this.Fa.Wa.Ke(Pa) && (this.Fa.Wa.gg(AscDFH.a6d),
        this.Fa.Wa.$B({
            Ba: e,
            dva: f
        }),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.T4g = function(e) {
        var f = this.Mca();
        f && !1 === f.Ke(Pa) && (f.gg(AscDFH.i6d),
        f.NGf(e),
        f.Sf(),
        f.KVc())
    }
    ;
    y.prototype.grc = function(e, f, y, Ma, Pa, Ia, Xa) {
        !1 === this.Fa.Wa.Ke(AscCommon.H5) && (this.Fa.Wa.gg(AscDFH.YMf),
        f = AscFormat.HSd(e, f, y, Ma, !0, null, Pa, Ia, Xa),
        y = new AscCommonWord.V3(f.fa.nb.eb,f.fa.nb.fb,null,this.Fa.xd,null,null),
        f.Cc(y),
        y.RJ(f),
        this.Fa.Wa.hR(y),
        this.Oe("asc_onAddSignature", e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.lac = function() {
        return this.Fa.Wa ? this.Fa.Wa.dle() : []
    }
    ;
    y.prototype.Zqd = function(e) {
        return this.Fa.Wa.dfe(e)
    }
    ;
    y.prototype.hRd = function(e) {
        return this.Fa.Wa.UXf(e)
    }
    ;
    y.prototype.eOb = function() {
        this.Fa.Wa.eOb()
    }
    ;
    y.prototype.yMb = function() {
        this.Fa.Wa.yMb()
    }
    ;
    y.prototype.vdg = function(e) {
        !1 === this.Fa.Wa.Ke(Pa) && (this.Fa.Wa.gg(AscDFH.c6d),
        this.Fa.Wa.$B({
            Ra: e
        }),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.tdg = function(e) {
        !1 === this.Fa.Wa.Ke(Pa) && (this.Fa.Wa.gg(AscDFH.b6d),
        this.Fa.Wa.$B({
            Ae: e
        }),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.M4g = function(e, f, y, Ma) {
        this.Fa.Wa.Hhd({
            Ba: e,
            Oa: f,
            Ra: y,
            Ta: Ma
        })
    }
    ;
    y.prototype.c8f = function() {}
    ;
    y.prototype.yCf = function(e) {
        this.Oe("asc_onVerticalAlign", e)
    }
    ;
    y.prototype.tXd = function(e) {
        this.Oe("asc_onPrAlign", e)
    }
    ;
    y.prototype.pXd = function(e) {
        this.Oe("asc_onListType", new AscCommon.MZe(e))
    }
    ;
    y.prototype.kSf = function(e) {
        e.ab && e.ab.fill && e.ab.fill.type === ak.nC && e.ab.fill.color ? this.Oe("asc_onTextColor", AscCommon.tqb(e.ab.fill.color)) : void 0 != e.va && this.Oe("asc_onTextColor", AscCommon.QIa(e.va.r, e.va.vb, e.va.Xa, e.va.lf))
    }
    ;
    y.prototype.lSf = function(e) {
        void 0 != e && this.Oe("asc_onTextHighLight", new AscCommon.BM(e.r,e.vb,e.Xa))
    }
    ;
    y.prototype.wCf = function(e) {
        this.Oe("asc_onTextSpacing", e)
    }
    ;
    y.prototype.qCf = function(e) {
        this.Oe("asc_onTextDStrikeout", e)
    }
    ;
    y.prototype.pCf = function(e) {
        this.Oe("asc_onTextCaps", e)
    }
    ;
    y.prototype.vCf = function(e) {
        this.Oe("asc_onTextSmallCaps", e)
    }
    ;
    y.prototype.sCf = function(e) {
        this.Oe("asc_onTextPosition", e)
    }
    ;
    y.prototype.rCf = function(e) {
        this.Oe("asc_onTextLanguage", e.Jc)
    }
    ;
    y.prototype.sXd = function(e) {
        this.Oe("asc_onParaStyleName", e)
    }
    ;
    y.prototype.rXd = function(e) {
        !0 === e.Ks ? e.kg = AscCommonWord.kLd : void 0 === e.Ks && (e.kg = AscCommonWord.Q0d);
        !0 === e.Us ? e.Ji = AscCommonWord.kLd : void 0 === e.Us && (e.Ji = AscCommonWord.Q0d);
        this.Oe("asc_onParaSpacingLine", new AscCommon.PTb(e))
    }
    ;
    y.prototype.fSf = function(e) {
        this.Oe("asc_onPageBreak", e)
    }
    ;
    y.prototype.GFg = function(e) {
        this.Oe("asc_onWidowControl", e)
    }
    ;
    y.prototype.BFg = function(e) {
        this.Oe("asc_onKeepNext", e)
    }
    ;
    y.prototype.dSf = function(e) {
        this.Oe("asc_onKeepLines", e)
    }
    ;
    y.prototype.chg = function() {
        this.Oe("asc_onShowParaMarks")
    }
    ;
    y.prototype.dhg = function() {
        this.Oe("asc_onSpaceBetweenPrg")
    }
    ;
    y.prototype.kCf = function(e) {
        var f = this.lM.length;
        0 < f && this.lM[f - 1].ea == Xg.Ua ? this.lM[f - 1].pa = new Asc.mdb(e) : this.lM[this.lM.length] = new Ke(Xg.Ua,new Asc.mdb(e))
    }
    ;
    y.prototype.jCf = function(e) {
        this.lM[this.lM.length] = new Ke(Xg.Math,e)
    }
    ;
    y.prototype.Ina = function() {
        editor.Oe("asc_onEndAddShape");
        "crosshair" == this.Fa.xd.sUa && this.Fa.xd.y7a()
    }
    ;
    y.prototype.JGf = function(f) {
        if (this.Fa) {
            this.Fa.REf = f;
            var y = e.getElementById("id_main");
            if (y) {
                var Ma = e.getElementById("id_horscrollpanel")
                  , Pa = e.getElementById("id_panel_right");
                f ? (y.style.display = "none",
                Ma.style.display = "none",
                Pa.style.display = "none") : (y.style.display = "block",
                Ma.style.display = "block",
                Pa.style.display = "block")
            }
            f || this.Fa.AW()
        }
    }
    ;
    y.prototype.g_e = function(e) {
        this.Fa.Wa.EHe(e)
    }
    ;
    y.prototype.asc_SetMathProps = y.prototype.g_e;
    y.prototype.tYg = function(e) {
        !1 === this.Fa.Wa.Ke(AscCommon.oga) && (this.Fa.Wa.gg(AscDFH.W5d),
        e ? this.Fa.Wa.TGf(Asc.Qqa.Rta) : this.Fa.Wa.TGf(Asc.Qqa.f5a),
        this.rOc = e,
        this.gTc(editor.vTd()),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.vTd = function() {
        return this.rOc
    }
    ;
    y.prototype.sYg = function(e, f) {
        !1 === this.Fa.Wa.Ke(AscCommon.oga) && (this.IP && this.Fa.Zs && this.Fa.Zs.PDf(),
        this.Fa.Wa.gg(AscDFH.X5d),
        this.rOc ? this.Fa.Wa.UGf(e, f) : this.Fa.Wa.UGf(f, e),
        this.Fa.Wa.Sf(),
        this.IP && this.Fa.Zs && this.Fa.Zs.VEf())
    }
    ;
    y.prototype.M0g = function() {
        return AscCommon.dFb
    }
    ;
    y.prototype.K0g = function() {
        return AscCommon.g5a
    }
    ;
    y.prototype.ySg = function(e) {
        this.Fa.Wa.vZf(e)
    }
    ;
    y.prototype.BRg = function() {
        return this.Fa.Wa.qFf()
    }
    ;
    y.prototype.mRg = function() {
        var e = this.Fa.Wa;
        return e ? e.xWf() : 0
    }
    ;
    y.prototype.Zgg = function(e) {
        this.Oe("asc_onSectionProps", e)
    }
    ;
    y.prototype.asc_SetSectionProps = y.prototype.ySg;
    y.prototype.asc_GetSectionProps = y.prototype.BRg;
    y.prototype.asc_GetCurrentColumnWidth = y.prototype.mRg;
    y.prototype.nSg = function(e) {
        this.Fa.Wa.rZf(e)
    }
    ;
    y.prototype.lRg = function() {
        return this.Fa.Wa.TWf()
    }
    ;
    y.prototype.asc_SetColumnsProps = y.prototype.nSg;
    y.prototype.asc_GetColumnsProps = y.prototype.lRg;
    y.prototype.JRg = function() {
        return this.Fa.Wa.mUc()
    }
    ;
    y.prototype.ssg = function(e) {
        var f = e.bAa()
          , y = this;
        if (f && (f = f.tRc()) && "string" === typeof f.pBa()) {
            if (!Ta)
                return;
            var Ma = AscCommon.TK
              , Pa = Ta.Zma(f.pBa());
            f.w8a(Pa.Ja);
            if (Ma.FH(Pa, function() {
                this.$x(oh.tP, yb.FH);
                y.ssg(e)
            }, null))
                return
        }
        f = e.KJa();
        "string" !== typeof f && (f = "");
        AscFonts.tp.UTa(f, this, function() {
            return y.Fa.Wa.QGf(e)
        })
    }
    ;
    y.prototype.HSg = function(e) {
        e = new Asc.L6a;
        e.hU(Asc.Yka.kf);
        return this.Fa.Wa.QGf(e)
    }
    ;
    y.prototype.Lgg = function(e) {
        this.Oe("asc_onColumnsProps", e)
    }
    ;
    y.prototype.tSg = function(e, f) {
        this.Fa.Wa.iZf(e, f)
    }
    ;
    y.prototype.qRg = function() {
        return this.Fa.Wa.PZd()
    }
    ;
    y.prototype.JQg = function(e) {
        return this.Fa.Wa.pmb(e)
    }
    ;
    y.prototype.$Rg = function() {
        this.Fa.Wa.AYf()
    }
    ;
    y.prototype.LRg = function(e) {
        this.Fa.Wa.bXf(e)
    }
    ;
    y.prototype.QRg = function() {
        var e = this.Fa.Wa;
        return e && !0 === e.rXf() ? !0 : !1
    }
    ;
    y.prototype.asc_AddFootnote = y.prototype.JQg;
    y.prototype.asc_RemoveAllFootnotes = y.prototype.$Rg;
    y.prototype.asc_GetFootnoteProps = y.prototype.qRg;
    y.prototype.asc_SetFootnoteProps = y.prototype.tSg;
    y.prototype.asc_GotoFootnote = y.prototype.LRg;
    y.prototype.asc_IsCursorInFootnote = y.prototype.QRg;
    y.prototype.xDg = function() {
        !1 === this.Fa.Wa.Ke(jb) && null === this.Fa.Wa.VH(!1) && (this.Fa.Wa.gg(AscDFH.QTd),
        this.Fa.Wa.$g(new AscCommonWord.wPd(AscCommonWord.m3f)),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.j4g = function() {
        var e = this.Fa.Wa;
        !1 === e.Ke(jb) && null === e.VH(!1) && (this.Fa.Wa.gg(AscDFH.QTd),
        this.Fa.Wa.$g(new AscCommonWord.wPd(AscCommonWord.l3f)),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.rQd = function(e) {
        var f = 0
          , y = 0
          , Ma = 0;
        "undefined" != typeof e && ("undefined" != typeof e.Ae && (f = e.Ae),
        "undefined" != typeof e.Ba && (y = e.Ba),
        "undefined" != typeof e.Ra && (Ma = e.Ra));
        e = !1;
        var Pa = this.Fa.ML;
        Pa.fM != y && (Pa.fM = y,
        e = !0);
        Pa != f + y && (Pa.zU = f + y,
        e = !0);
        Pa.YU != Ma && (Pa.YU = Ma,
        e = !0);
        e && this.Fa.W$()
    }
    ;
    y.prototype.BFf = function(e, f) {
        this.Fa.ML.zU != e + f && (this.Fa.ML.zU = e + f,
        this.Fa.W$())
    }
    ;
    y.prototype.CFf = function(e) {
        this.Fa.ML.fM != e && (this.Fa.ML.fM = e,
        this.Fa.W$())
    }
    ;
    y.prototype.DFf = function(e) {
        this.Fa.ML.YU != e && (this.Fa.ML.YU = e,
        this.Fa.W$())
    }
    ;
    y.prototype.S4g = function(e, f) {
        0 <= e ? !1 === this.Fa.Wa.Ke(cb, {
            ea: AscCommon.K2d
        }) && (this.Fa.Wa.gg(AscDFH.Z4d),
        this.Fa.Wa.LEf(e, f),
        this.Fa.Wa.Sf()) : !1 === this.Fa.Wa.Ke(jb) && (this.Fa.Wa.gg(AscDFH.Y4d),
        this.Fa.Wa.LEf(e, f),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.v4g = function(e) {
        !1 === this.Fa.Wa.Ke(cf) && (this.Fa.Wa.gg(AscDFH.S5d),
        this.Fa.Wa.GVf(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.JJg = function(e) {
        !1 === this.Fa.Wa.Ke(cf) && (this.Fa.Wa.gg(AscDFH.U5d),
        this.Fa.Wa.IVf(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.KJg = function(e) {
        !1 === this.Fa.Wa.Ke(cf) && (this.Fa.Wa.gg(AscDFH.T5d),
        this.Fa.Wa.HVf(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.LJg = function(e) {
        !1 === this.Fa.Wa.Ke(cf) && (this.Fa.Wa.gg(AscDFH.V5d),
        this.Fa.Wa.JVf(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.zSg = function(e) {
        if (!isNaN(e)) {
            var f = this.Fa.Wa;
            f && !1 === f.Ke() && (f.gg(AscDFH.K5d),
            f.mZf(e),
            f.Sf())
        }
    }
    ;
    y.prototype.a_c = function(e, f) {
        this.Oe("asc_onDocSize", e, f)
    }
    ;
    y.prototype.gTc = function(e) {
        this.Oe("asc_onPageOrient", e)
    }
    ;
    y.prototype.Q$d = function(e) {
        !0 === e && (e.eo = !0);
        this.lM[this.lM.length] = new Ke(Xg.Ik,new $a(e))
    }
    ;
    y.prototype.Cdg = function(e, f) {
        !1 === this.Fa.Wa.Ke(AscCommon.H5) && (this.Fa.Wa.gg(AscDFH.$4d),
        this.Fa.Wa.UQ(e, f),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.x1f = function(e) {
        !1 === this.Fa.Wa.Ke(Ce) && (this.Fa.Wa.gg(AscDFH.H6d),
        this.Fa.Wa.ZK(!0, e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.y1f = function(e) {
        !1 === this.Fa.Wa.Ke(Ce) && (this.Fa.Wa.gg(AscDFH.I6d),
        this.Fa.Wa.ZK(!1, e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.s1f = function(e) {
        !1 === this.Fa.Wa.Ke(Ce) && (this.Fa.Wa.gg(AscDFH.F6d),
        this.Fa.Wa.aO(!0, e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.t1f = function(e) {
        !1 === this.Fa.Wa.Ke(Ce) && (this.Fa.Wa.gg(AscDFH.G6d),
        this.Fa.Wa.aO(!1, e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.ieg = function() {
        var e = this.Mca();
        if (!e)
            return !1;
        e.CK(c_oAscTableSelectionType.Aa);
        if (e.Ke(AscCommon.l3))
            return !1;
        e.gg(AscDFH.K6d);
        e.ow();
        e.Sf();
        return !0
    }
    ;
    y.prototype.heg = function() {
        var e = this.Mca();
        if (!e)
            return !1;
        e.CK(c_oAscTableSelectionType.Sq);
        if (e.Ke(AscCommon.l3))
            return !1;
        e.gg(AscDFH.J6d);
        e.nJ();
        e.Sf();
        return !0
    }
    ;
    y.prototype.jeg = function() {
        var e = this.Mca();
        if (!e)
            return !1;
        e.CK(c_oAscTableSelectionType.Table);
        if (e.Ke(AscCommon.l3))
            return !1;
        e.gg(AscDFH.F5d);
        e.tO();
        e.Sf();
        return !0
    }
    ;
    y.prototype.Jeg = function() {
        this.Fa.Wa.CK(c_oAscTableSelectionType.Aa)
    }
    ;
    y.prototype.Ieg = function() {
        this.Fa.Wa.CK(c_oAscTableSelectionType.Sq)
    }
    ;
    y.prototype.GIa = function() {
        this.Fa.Wa.CK(c_oAscTableSelectionType.Hb)
    }
    ;
    y.prototype.Keg = function() {
        this.Fa.Wa.CK(c_oAscTableSelectionType.Table)
    }
    ;
    y.prototype.Reg = function() {}
    ;
    y.prototype.occ = function() {}
    ;
    y.prototype.zfg = function() {}
    ;
    y.prototype.pUf = function() {
        return this.Fa.Wa.yS()
    }
    ;
    y.prototype.qUf = function() {
        return this.Fa.Wa.zS()
    }
    ;
    y.prototype.d5a = function() {
        !1 === this.Fa.Wa.Ke(Ce) && (this.Fa.Wa.gg(AscDFH.w5d),
        this.Fa.Wa.vP(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.DZf = function(e, f) {
        !1 === this.Fa.Wa.Ke(Ce) && (this.Fa.Wa.gg(AscDFH.E6d),
        this.Fa.Wa.HS(e, f),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.m2f = function(e) {
        var f = this.Fa.Wa;
        if (f) {
            var y = !1;
            !1 === f.Ke(Ce) && (f.gg(AscDFH.WTd),
            y = f.zX(e),
            f.Sf());
            return y
        }
    }
    ;
    y.prototype.bSg = function() {
        var e = this.Mca();
        if (!e || e.Ke(AscCommon.l3))
            return !1;
        e.gg(AscDFH.G5d);
        e.$I();
        e.Sf();
        return !0
    }
    ;
    y.prototype.oig = function() {}
    ;
    y.prototype.ndg = function() {}
    ;
    y.prototype.Bfg = function() {}
    ;
    y.prototype.Afg = function() {}
    ;
    y.prototype.rfg = function() {}
    ;
    y.prototype.xfg = function() {}
    ;
    y.prototype.qfg = function() {}
    ;
    y.prototype.yfg = function() {}
    ;
    y.prototype.wfg = function() {}
    ;
    y.prototype.qhg = function(e) {
        !1 === this.Fa.Wa.Ke(Ce) && (e.sq && (e.sq.Ba && e.sq.Ba.va && (e.sq.Ba.ab = AscFormat.Rea(e.sq.Ba.va, 1)),
        e.sq.Oa && e.sq.Oa.va && (e.sq.Oa.ab = AscFormat.Rea(e.sq.Oa.va, 1)),
        e.sq.Ra && e.sq.Ra.va && (e.sq.Ra.ab = AscFormat.Rea(e.sq.Ra.va, 1)),
        e.sq.Ta && e.sq.Ta.va && (e.sq.Ta.ab = AscFormat.Rea(e.sq.Ta.va, 1)),
        e.sq.fk && e.sq.fk.va && (e.sq.fk.ab = AscFormat.Rea(e.sq.fk.va, 1)),
        e.sq.sk && e.sq.sk.va && (e.sq.sk.ab = AscFormat.Rea(e.sq.sk.va, 1))),
        e.Vt && e.Vt.va && (e.Vt.ab = AscFormat.Rea(e.Vt.va, 1)),
        this.Fa.Wa.gg(AscDFH.b5d),
        this.Fa.Wa.WS(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.Ggg = function() {
        this.Oe("asc_onAddTable")
    }
    ;
    y.prototype.Igg = function(e) {
        this.Oe("asc_onAlignCell", e)
    }
    ;
    y.prototype.jTc = function(e) {
        if (e.Vt && e.Vt.ab) {
            var f = this.Fa.Wa;
            e.Vt.ab.check(f.ri(), f.kl());
            f = e.Vt.ab.Ht();
            e.Vt.va = new AscCommonWord.DAa(f.R,f.G,f.B,!1)
        }
        this.lM[this.lM.length] = new Ke(Xg.Table,new Asc.FTc(e))
    }
    ;
    y.prototype.fhg = function(e) {
        this.Oe("asc_onTblWrapStyleChanged", e)
    }
    ;
    y.prototype.ehg = function(e) {
        this.Oe("asc_onTblAlignChanged", e)
    }
    ;
    y.prototype.jUf = function() {
        this.Tvb({
            OHc: !0
        })
    }
    ;
    y.prototype.lUf = function(e) {
        this.Tvb({
            WHc: !0,
            Pma: e
        })
    }
    ;
    y.prototype.gbe = function() {
        this.Tvb()
    }
    ;
    y.prototype.SGg = function(e) {
        this.WXd(AscCommon.iW(e))
    }
    ;
    y.prototype.npc = function(e, f) {
        if (f && (f.OHc || f.WHc || f.obj))
            this.WXd(e[0], void 0, void 0, f);
        else if (this.tt) {
            var y = this;
            this.tt.a5a(e, function() {
                if (!1 === this.Fa.Wa.Ke(jb)) {
                    for (var f = [], Ma = 0; Ma < e.length; ++Ma) {
                        var Pa = y.tt.MK(e[Ma], 1);
                        Pa && f.push(Pa)
                    }
                    f.length && (y.Fa.Wa.gg(),
                    y.Fa.Wa.UDa(),
                    y.Fa.Wa.iT(f),
                    y.Fa.Wa.VDa(!0),
                    y.Fa.Wa.Sf())
                }
            }, [])
        }
    }
    ;
    y.prototype.WXd = function(e, f, y, Ma) {
        if (mg.$eb(e))
            this.qNd(e, f, Ma);
        else {
            var Pa = this;
            AscCommon.u$(this, [e], function(e) {
                e && e[0] && "error" !== e[0].url && Pa.qNd(e[0].url, f, Ma)
            }, !1, void 0, y)
        }
    }
    ;
    y.prototype.qNd = function(e, f, y) {
        var Ma = this.tt.MK(e, 1);
        if (null != Ma) {
            var Pa = this.Fa.Wa.Tsa();
            e = Math.max(1, Pa.W);
            Pa = Math.max(1, Pa.Jb);
            if (null != Ma.Image) {
                Pa = Math.max(Ma.Image.width * AscCommon.PD, 1);
                var Ia = Math.max(Ma.Image.height * AscCommon.PD, 1);
                e = Math.max(5, Math.min(e, Pa));
                Pa = Math.max(5, Math.min(e * Ia / Pa))
            }
            Ma = Ma.src;
            y && y.WHc ? (e = new Asc.F7a,
            e.fill = new yc,
            e.fill.type = ak.hv,
            e.fill.fill = new Ic,
            e.fill.fill.WRa(Ma),
            null !== y.Pma && void 0 !== y.Pma && e.fill.fill.Pha(y.Pma),
            this.MOc(new Yg({
                dm: e
            }))) : y && y.OHc ? (e = new Yg,
            e.Am = Ma,
            this.MOc(e)) : y && y.obj && y.obj.rb ? this.p2f(Ma, y.obj.rb()) : !1 === this.Fa.Wa.Ke(jb) && ((Ia = mg.mca(Ma)) && (Ma = Ia),
            this.Fa.Wa.gg(AscDFH.V4d),
            void 0 === f || void 0 === f.uL || 0 == f.uL ? this.Fa.Wa.nP(e, Pa, Ma) : this.Fa.Wa.nP(e, Pa, Ma, null, !0),
            this.Fa.Wa.Sf())
        } else
            this.$G(oh.Gs, yb.MK),
            this.WZa = function(e) {
                var Ma = this.Fa.Wa.Tsa()
                  , Pa = Math.max(1, Ma.W);
                Ma = Math.max(1, Ma.Jb);
                if (null != e.Image) {
                    Ma = Math.max(e.Image.width * AscCommon.PD, 1);
                    var Ia = Math.max(e.Image.height * AscCommon.PD, 1);
                    Pa = Math.max(5, Math.min(Pa, Ma));
                    Ma = Math.max(5, Math.min(Pa * Ia / Ma))
                }
                e = e.src;
                y && y.WHc ? (Pa = new Asc.F7a,
                Pa.fill = new yc,
                Pa.fill.type = ak.hv,
                Pa.fill.fill = new Ic,
                Pa.fill.fill.WRa(e),
                null !== y.Pma && void 0 !== y.Pma && Pa.fill.fill.Pha(y.Pma),
                this.MOc(new Yg({
                    dm: Pa
                }))) : y && y.OHc ? (Pa = new Yg,
                Pa.Am = e,
                this.MOc(Pa)) : y && y.obj && y.obj.rb ? this.p2f(e, y.obj.rb()) : !1 === this.Fa.Wa.Ke(jb) && ((Ia = mg.mca(e)) && (e = Ia),
                this.Fa.Wa.gg(AscDFH.W4d),
                void 0 === f || void 0 === f.uL || 0 == f.uL ? this.Fa.Wa.nP(Pa, Ma, e) : this.Fa.Wa.nP(Pa, Ma, e, null, !0),
                this.Fa.Wa.Sf());
                this.$x(oh.Gs, yb.MK);
                this.WZa = null
            }
    }
    ;
    y.prototype.RGg = function(e, f, y, Ma, Pa, Ia) {
        var Xa = this.Fa.Wa
          , Ta = kd.Dk;
        kd.UF = 0;
        kd.Dk = 1;
        Xa.XQ(kd, y, Ma, f);
        Xa.IZ(kd, y, Ma, f);
        Xa.QU(kd, y, Ma, f);
        kd.Dk = Ta;
        !1 === Xa.Ke(jb) && (f = new Asc.dee,
        f.QGa(Asc.eZ.Qc),
        f.kaa(!1),
        f.kP(y),
        y = new Asc.eee,
        y.QGa(Asc.u0.Qc),
        y.kaa(!1),
        y.kP(Ma),
        Ma = new Yg,
        Ma.d2d(1),
        Ma.Jrd(f),
        Ma.Krd(y),
        Xa.gg(AscDFH.U4d),
        Xa.v7a(),
        Xa.nP(Pa, Ia, e),
        Xa.nL(Ma),
        Xa.q$a(!0),
        Xa.Sf())
    }
    ;
    y.prototype.urd = function() {
        return this.Fa && this.Fa.Wa ? this.Fa.Wa.PWf() : 0
    }
    ;
    y.prototype.xdg = function(e, f) {
        this.Fa && this.Fa.Wa && (AscFormat.hb(f) || (f = Asc.lOa.Slide),
        this.Fa.Wa.pYf(e, f))
    }
    ;
    y.prototype.AVf = function(e) {
        AscFormat.hb(e) || (e = Asc.lOa.sx);
        this.Fa.Wa.yVf(e)
    }
    ;
    y.prototype.BVf = function(e) {
        AscFormat.hb(e) || (e = Asc.lOa.sx);
        this.Fa.Wa.zVf(e)
    }
    ;
    y.prototype.MOc = function(e) {
        if (AscCommon.jf(e) && (!e.AS || e.AS.type !== Asc.Mk.I6 || AscFormat.iEf(this.Fa.Wa.ec, this)))
            if (AscFormat.hb(e.dva))
                switch (e.dva) {
                case 0:
                    this.Fa.Wa.ec.Ddb();
                    break;
                case 1:
                    this.Fa.Wa.ec.Cdb();
                    break;
                case 2:
                    this.Fa.Wa.ec.ljb();
                    break;
                case 3:
                    this.Fa.Wa.ec.Bdb()
                }
            else {
                var y = [];
                var Ma = this.Fa.Wa.ec.ad, Pa;
                for (Pa = 0; Pa < Ma.length; ++Pa) {
                    var Ia = Ma[Pa].parent.zK();
                    AscFormat.IQc(y, Ia)
                }
                y = {
                    ea: AscCommon.xaa,
                    Xb: y,
                    Lu: jb
                };
                if (1 === e.Mda || -1 === e.Mda)
                    0 == this.Fa.Wa.Ke(AscCommon.Tha, y) && (this.Fa.Wa.gg(AscDFH.u5d),
                    1 === e.Mda ? this.Fa.Wa.ec.S1g() : this.Fa.Wa.ec.Q7g(),
                    this.Fa.Wa.Sf());
                else if (!1 === this.Fa.Wa.Ke(AscCommon.Tha)) {
                    e.dm && (e.Am = "");
                    var Xa = y = null
                      , Ta = "";
                    AscCommon.chb(e.Am) ? e.dm && e.dm.fill && e.dm.fill.fill && !AscCommon.chb(e.dm.fill.fill.url) && (mg.mca(e.dm.fill.fill.url) || (y = e.dm.fill.fill.url,
                    Xa = function(f) {
                        Ta = e.dm.fill.fill.url = f
                    }
                    ),
                    Ta = e.dm.fill.fill.url) : (mg.mca(e.Am) || (y = e.Am,
                    Xa = function(f) {
                        Ta = e.Am = f
                    }
                    ),
                    Ta = e.Am);
                    var Va = this;
                    if (AscCommon.chb(Ta)) {
                        e.Am = null;
                        if (!this.yIa || this.pna) {
                            if (this.yIa || this.pna || !this.L5a ? (this.Fa.Wa.gg(AscDFH.Gzd),
                            this.Fa.Wa.nL(e),
                            this.Fa.Wa.Kl(),
                            this.Fa.Wa.sr(),
                            this.Fa.Wa.Sf()) : (-1 !== this.fGa ? Ud.pLe() : this.Fa.Wa.gda(AscDFH.Gzd),
                            this.Fa.Wa.nL(e),
                            this.L5a = !1,
                            this.fGa = -1),
                            this.pna && (this.pna = !1,
                            y = Ud.nm[Ud.za]))
                                this.fGa = y.wd.length
                        } else if (y = !1,
                        -1 !== this.fGa ? Ud.pLe() : (y = !0,
                        this.Fa.Wa.gda(AscDFH.Gzd)),
                        this.Fa.Wa.nL(e),
                        y && (y = Ud.nm[Ud.za]))
                            this.fGa = y.wd.length;
                        this.L5a = !1
                    } else {
                        var cb = function() {
                            null != Va.tt.MK(Ta, 1) ? (Va.Fa.Wa.gg(AscDFH.TTd),
                            Va.Fa.Wa.nL(e),
                            Va.Fa.Wa.Kl(),
                            Va.Fa.Wa.sr(),
                            Va.Fa.Wa.Sf()) : Va.WZa = function() {
                                Va.Fa.Wa.gg(AscDFH.a5d);
                                Va.Fa.Wa.nL(e);
                                Va.Fa.Wa.Kl();
                                Va.Fa.Wa.sr();
                                Va.Fa.Wa.Sf()
                            }
                        };
                        y ? f.AscDesktopEditor ? (y = f.AscDesktopEditor.LocalFileGetImageUrl(Ta),
                        y = mg.T9(y),
                        Xa(y),
                        cb()) : AscCommon.u$(this, [Ta], function(e) {
                            e && e[0] && "error" !== e[0].url && (Xa(e[0].url),
                            cb())
                        }, !1) : cb()
                    }
                }
            }
    }
    ;
    y.prototype.vfg = function() {}
    ;
    y.prototype.sfg = function() {}
    ;
    y.prototype.Cfg = function() {}
    ;
    y.prototype.k6f = function() {}
    ;
    y.prototype.tfg = function() {}
    ;
    y.prototype.ufg = function() {}
    ;
    y.prototype.b9f = function() {
        for (var e = 0; e < this.lM.length; ++e)
            if (this.lM[e].ea == Xg.Image && this.lM[e].pa && this.lM[e].pa.Am)
                return this.lM[e].pa.SNa(this);
        return null
    }
    ;
    y.prototype.Stb = function(e) {
        var f = "";
        if (null != e.fill && null != e.fill.fill && e.fill.type == ak.hv) {
            f = e.fill.fill.aUb();
            var y = e.fill.fill.xrd();
            null != y && 0 <= y && y < AscCommon.mIa.length && (f = AscCommon.mIa[y])
        }
        if ("" != f) {
            y = this.tt.MK(f, 1);
            var Ma = mg.mca(f);
            Ma && e.fill.fill.WRa(Ma);
            null != y ? (this.Fa.Wa.Stb(e),
            this.Fa.xd.XVa(f)) : (this.$G(oh.Gs, yb.MK),
            this.WZa = function() {
                this.Fa.Wa.Stb(e);
                this.Fa.xd.XVa(f);
                this.$x(oh.Gs, yb.MK);
                this.WZa = null
            }
            )
        } else
            this.Fa.Wa.Stb(e)
    }
    ;
    y.prototype.Fgg = function() {
        this.Oe("asc_onAddImage")
    }
    ;
    y.prototype.PMc = function(e) {
        this.lM[this.lM.length] = new Ke(Xg.Image,new Yg(e))
    }
    ;
    y.prototype.x7g = function(e) {
        this.Oe("asc_onImgWrapStyleChanged", e)
    }
    ;
    y.prototype.drd = function(e, f, y, Ma, Pa, Ia, Xa) {
        null != this.tt.MK(AscCommon.iW(e), 1) && (this.Fa.Wa.gg(AscDFH.FXb),
        this.Fa.Wa.gR(Ma, Pa, Ia, Xa, e, f, y),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.ird = function(e, f, y, Ma, Pa) {
        e && (this.Fa.Wa.gg(AscDFH.FXb),
        this.Fa.Wa.rje(e, y, f, Ma, Pa),
        this.Fa.Wa.Bd(),
        this.Fa.Wa.Ie(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.Xrd = function() {
        this.Fa.Wa.ec.zcc()
    }
    ;
    Sb.prototype.AN = function() {
        return this.ea
    }
    ;
    Sb.prototype.rBa = function() {
        return this.wN
    }
    ;
    Sb.prototype.sBa = function() {
        return this.xN
    }
    ;
    Sb.prototype.k1g = function() {
        return this.Fe
    }
    ;
    Sb.prototype.A2g = function() {
        return this.Ik
    }
    ;
    y.prototype.qRa = function(e) {
        this.Oe("asc_onContextMenu", new Sb(e))
    }
    ;
    y.prototype.jmb = function() {
        this.Oe("asc_onMouseMoveStart")
    }
    ;
    y.prototype.imb = function() {
        this.Oe("asc_onMouseMoveEnd")
    }
    ;
    y.prototype.Coa = function(e) {
        this.Oe("asc_onMouseMove", e)
    }
    ;
    y.prototype.ahg = function(e, f, y, Ma) {
        this.Oe("asc_onShowForeignCursorLabel", e, f, y, new AscCommon.BM(Ma.r,Ma.vb,Ma.Xa,255))
    }
    ;
    y.prototype.nXd = function(e) {
        this.Oe("asc_onHideForeignCursorLabel", e)
    }
    ;
    y.prototype.b4f = function() {
        return !0 === this.Fa.Wa.EG(!0) ? this.Fa.Wa.Jq(!0) : !1
    }
    ;
    y.prototype.G1f = function(e) {
        var f = this.tDg(e);
        null !== e.Text && void 0 !== e.Text ? AscFonts.tp.UTa(e.Text, this, function() {
            this.qDg(e, f)
        }) : this.qDg(e, f)
    }
    ;
    y.prototype.tDg = function(e) {
        var f = e.nbc()
          , y = null;
        if (f) {
            var Ma = this.Fa.Wa.mC;
            y = Ma.Mme(f);
            var Pa = Ma.K$(y);
            if (Pa && Pa[0].bl() === f)
                e.vZc(null),
                e.CSc(y),
                y = null;
            else {
                if (Pa) {
                    for (f = 1; Ma.K$(y + "_" + f); )
                        f++;
                    y += "_" + f
                }
                e.CSc(y)
            }
        }
        return y
    }
    ;
    y.prototype.qDg = function(e, f) {
        (f ? this.Fa.Wa.Ke(jb, {
            ea: AscCommon.dBa,
            Element: e.nbc(),
            Lu: jb
        }) : this.Fa.Wa.Ke(jb)) || (this.Fa.Wa.gg(AscDFH.S4d),
        f && e.nbc() && e.nbc().GDf(f),
        this.Fa.Wa.FN(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.q4f = function(e) {
        if (e && e.z8b()) {
            var f = this.tDg(e);
            null !== e.Text && void 0 !== e.Text ? AscFonts.tp.UTa(e.Text, this, function() {
                this.sDg(e, f)
            }) : this.sDg(e, f)
        }
    }
    ;
    y.prototype.sDg = function(e, f) {
        (f ? this.Fa.Wa.Ke(jb, {
            ea: AscCommon.dBa,
            Element: e.nbc(),
            Lu: jb
        }) : this.Fa.Wa.Ke(jb)) || (this.Fa.Wa.gg(AscDFH.d5d),
        f && e.nbc() && e.nbc().GDf(f),
        this.Fa.Wa.QR(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.oeg = function(e) {
        e && e.z8b() && !1 === this.Fa.Wa.Ke(jb) && (this.Fa.Wa.gg(AscDFH.E5d),
        this.Fa.Wa.SR(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.uRg = function() {
        return this.Fa && this.Fa.Wa ? this.Fa.Wa.HWf() : []
    }
    ;
    y.prototype.b_c = function(e) {
        this.lM[this.lM.length] = new Ke(Xg.Ri,new Asc.ikb(e))
    }
    ;
    y.prototype.K8a = function(e) {
        this.Oe("asc_onHyperlinkClick", e)
    }
    ;
    y.prototype.kXd = function(e) {
        this.Oe("asc_onCanAddHyperlink", e)
    }
    ;
    y.prototype.$Zc = function() {
        this.Oe("asc_onDialogAddHyperlink")
    }
    ;
    y.prototype.$Zc = function() {
        this.Oe("asc_onDialogAddHyperlink")
    }
    ;
    y.prototype.T$d = function(e, f, y, Ma, Pa) {
        this.lM[this.lM.length] = new Ke(Xg.WPd,new AscCommon.gRd(e,f,y,Ma,Pa))
    }
    ;
    y.prototype.nCf = function() {
        this.Oe("asc_onSpellCheckVariantsFound")
    }
    ;
    y.prototype.T7e = function(e, f) {
        var y = Je.cg(f.RW);
        null != y && !1 === this.Fa.Wa.Ke(cb, {
            ea: AscCommon.dBa,
            Element: y,
            Lu: jb
        }) && (this.Fa.Wa.gg(AscDFH.ZTd),
        y.vGf(e, f.Element),
        y.av(!0),
        this.Fa.Wa.Bd(),
        this.Fa.Wa.sr(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.y5e = function(e, f) {
        !1 === f ? (f = Je.cg(e.RW),
        null != f && f.xFf(e.Element)) : (f = editor.Fa.Wa,
        f.cP.bHb(e.Tl),
        f.sb.TD(),
        f.sb.QG())
    }
    ;
    y.prototype.aWc = function(e) {
        var f = this.Fa.Wa;
        f && !0 !== f.cP.LNd(e) && (f.cP.bHb(e),
        f.sb.TD(),
        f.sb.QG(),
        delete f.cP.vt[e])
    }
    ;
    y.prototype.zRd = function() {
        f.AscDesktopEditor && f.AscDesktopEditor.SpellCheck('{"type":"clear"}')
    }
    ;
    y.prototype.t8e = function(e) {
        !1 === this.Fa.Wa.Ke(AscCommon.oga) && (this.Fa.Wa.gg(AscDFH.aUd),
        this.Fa.Wa.mHe(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.x2f = function() {
        return editor.Fa.Wa.rOd()
    }
    ;
    y.prototype.sRd = function() {
        return void 0 !== f.asc_current_keyboard_layout ? f.asc_current_keyboard_layout : -1
    }
    ;
    y.prototype.I2f = function(e) {
        editor.Fa.Wa && (editor.Fa.Wa.cP.Ka = e,
        editor.Fa.xd.TD(),
        editor.Fa.xd.QG())
    }
    ;
    kb.prototype.Oka = function() {
        return this.cY
    }
    ;
    kb.prototype.J7b = function(e) {
        this.cY = e ? e.slice(0, Asc.Mtd) : e
    }
    ;
    kb.prototype.rac = function() {
        return this.JY
    }
    ;
    kb.prototype.uac = function(e) {
        this.JY = e
    }
    ;
    kb.prototype.YTb = function() {
        return this.jaa
    }
    ;
    kb.prototype.esc = function(e) {
        this.jaa = e
    }
    ;
    kb.prototype.vJa = function() {
        return this.BN
    }
    ;
    kb.prototype.vac = function(e) {
        this.BN = e;
        this.uua = "Teamlab"
    }
    ;
    kb.prototype.srd = function() {
        return this.uua
    }
    ;
    kb.prototype.c2d = function(e) {
        this.uua = e
    }
    ;
    kb.prototype.YAa = function() {
        return this.WN
    }
    ;
    kb.prototype.K7b = function(e) {
        this.WN = e;
        this.tua = this.Fsg(this.WN)
    }
    ;
    kb.prototype.z2f = function() {
        return this.tua
    }
    ;
    kb.prototype.sVg = function(e) {
        this.tua = e
    }
    ;
    kb.prototype.oac = function() {
        return this.LS
    }
    ;
    kb.prototype.qQc = function(e) {
        this.LS = e
    }
    ;
    kb.prototype.yFb = function() {
        return this.i8
    }
    ;
    kb.prototype.tac = function(e) {
        this.i8 = e
    }
    ;
    kb.prototype.ITa = function() {
        return this.m4.toString(16).padStart(8, "0")
    }
    ;
    kb.prototype.dUb = function(e) {
        this.m4 = parseInt(e, 16)
    }
    ;
    kb.prototype.sWc = function(e) {
        return this.GK[e]
    }
    ;
    kb.prototype.kac = function(e) {
        this.GK.push(e)
    }
    ;
    kb.prototype.rWc = function() {
        return this.GK.length
    }
    ;
    kb.prototype.sac = function(e) {
        this.Lpf = e
    }
    ;
    kb.prototype.rnb = function() {
        return this.Lpf
    }
    ;
    kb.prototype.Fsg = function(e) {
        var f = "";
        e && e.split(" ").forEach(function(e) {
            0 < e.length && (f += e[0])
        });
        return f
    }
    ;
    y.prototype.Q9e = function(e) {
        null != this.Fa.Wa && this.Fa.Wa.$He(e)
    }
    ;
    y.prototype.zrd = function() {
        null != this.Fa.Wa && (this.Fa.Wa.Woe(),
        editor.JUa())
    }
    ;
    y.prototype.H1d = function(e) {
        if (!0 !== AscCommon.Kd.Tna()) {
            var f = this.Fa.Wa;
            if (f && (!0 !== this.PJf() || !1 === f.Ke(AscCommon.LG, null, !0, f.FLa())))
                return f = new AscCommon.WSa,
                f.dVc(e),
                this.Fa.Wa.gg(AscDFH.R4d),
                e = this.Fa.Wa.Pw(f, e.rnb()),
                null != e && this.IIa(e.rb(), f),
                this.Fa.Wa.Sf(),
                e.rb()
        }
    }
    ;
    y.prototype.S7e = function(e) {
        var f = this.Fa.Wa;
        f && !1 === f.Ke(cb, {
            ea: AscCommon.oud,
            Ia: e
        }, !1, f.FLa()) && (f.gg(AscDFH.A5d),
        f.wfa(e, !0, !0),
        f.Sf())
    }
    ;
    y.prototype.u_e = function(e, f) {
        var y = this.Fa.Wa;
        if (y && !1 === y.Ke(cb, {
            ea: AscCommon.oud,
            Ia: e
        }, !1, y.FLa())) {
            var Ma = new AscCommon.WSa;
            Ma.dVc(f);
            y.gg(AscDFH.c5d);
            y.qje(e, Ma);
            y.Sf();
            this.fTc(e, Ma)
        }
    }
    ;
    y.prototype.Nrd = function(e) {
        null != this.Fa.Wa && this.Fa.Wa.xQb(e, !0)
    }
    ;
    y.prototype.Vrd = function(e) {
        e instanceof Array ? this.Fa.Wa.x0d(e) : this.Fa.Wa.x0d([e])
    }
    ;
    y.prototype.$If = function() {
        function e(y, Ma) {
            var Pa = Ma.ipa()
              , Ia = Ma.F7();
            f[Pa] || (f[Pa] = []);
            Pa = f[Pa];
            for (var Xa = 0, Ta = Pa.length; Xa < Ta && !(Ia < Pa[Xa].ob.F7()); )
                Xa++;
            Pa.splice(Xa, 0, {
                Oa: y,
                ob: Ma
            });
            y = 0;
            for (Ia = Ma.GK.length; y < Ia; ++y)
                e(!1, Ma.Ilg(y))
        }
        var f = {}
          , y = this.Fa.Wa;
        if (!y)
            return f;
        y = y.Vj.Vea();
        for (var Ma in y)
            e(!0, y[Ma].fpa());
        return f
    }
    ;
    y.prototype.PJf = function() {
        return this.Fa.Wa.PB()
    }
    ;
    y.prototype.y5b = function(e) {
        this.Oe("asc_onRemoveComment", e)
    }
    ;
    y.prototype.IIa = function(e, f) {
        f = new kb(f);
        this.Oe("asc_onAddComment", e, f)
    }
    ;
    y.prototype.Dcc = function(e, f, y) {
        this.Oe("asc_onShowComment", e, f, y)
    }
    ;
    y.prototype.JUa = function() {
        this.Oe("asc_onHideComment")
    }
    ;
    y.prototype.uXd = function(e, f, y) {
        this.Oe("asc_onUpdateCommentPosition", [e], f, y)
    }
    ;
    y.prototype.fTc = function(e, f) {
        f = new kb(f);
        this.Oe("asc_onChangeCommentData", e, f)
    }
    ;
    y.prototype.R$d = function(e, f) {
        this.Oe("asc_onLockComment", e, f)
    }
    ;
    y.prototype.W$d = function(e) {
        this.Oe("asc_onUnLockComment", e)
    }
    ;
    y.prototype.brd = function(e, f) {
        var y = this.Mca();
        if (y && (e = y.Vea(e, f),
        !y.YL(cb, {
            ea: AscCommon.oud,
            Ia: e
        }, !1, y.FLa()))) {
            y.gg(AscDFH.z5d);
            f = 0;
            for (var Ma = e.length; f < Ma; ++f)
                y.wfa(e[f], !0, !1);
            y.Bd();
            y.Kl();
            y.Sf()
        }
    }
    ;
    y.prototype.Tgg = function() {
        this.Oe("asc_onLockHeaderFooters")
    }
    ;
    y.prototype.Rgg = function() {
        this.Oe("asc_onLockDocumentProps")
    }
    ;
    y.prototype.jhg = function() {
        this.Oe("asc_onUnLockHeaderFooters")
    }
    ;
    y.prototype.hhg = function() {
        this.Oe("asc_onUnLockDocumentProps")
    }
    ;
    y.prototype.eCf = function() {
        !0 === AscCommon.Kd.gB || !0 === this.Fa.Wa.HRa() && !0 === this.Fa.Wa.kJa.BYc || this.Oe("asc_onCollaborativeChanges")
    }
    ;
    y.prototype.Sgg = function() {
        this.Oe("asc_onLockDocumentSchema")
    }
    ;
    y.prototype.ihg = function() {
        this.Oe("asc_onUnLockDocumentSchema")
    }
    ;
    y.prototype.xig = function() {
        this.Fa.zig()
    }
    ;
    y.prototype.yig = function() {
        this.Fa.Aig()
    }
    ;
    y.prototype.DDf = function() {
        this.i6 ? this.Fa.nNd() : this.jNc = AscCommon.$Ub.c3
    }
    ;
    y.prototype.EDf = function() {
        this.i6 ? this.Fa.t_c() : this.jNc = AscCommon.$Ub.yHb
    }
    ;
    y.prototype.CDf = function() {
        this.i6 ? (this.Fa.p8a = 0,
        this.Fa.X5b(0, this.Fa.io)) : this.jNc = AscCommon.$Ub.eZd
    }
    ;
    y.prototype.wig = function() {
        this.zoom(100)
    }
    ;
    y.prototype.zoom = function(e) {
        var f = this.Fa.io;
        this.Fa.io = e;
        this.Fa.p8a = 0;
        this.Fa.X5b(0, f)
    }
    ;
    y.prototype.ePa = function(e) {
        this.Fa.CX(e)
    }
    ;
    y.prototype.ihf = function() {
        return this.Fa.xd.Ah
    }
    ;
    y.prototype.mhf = function() {
        return this.Fa.xd.yz
    }
    ;
    y.prototype.wXd = function(e, f) {
        this.Oe("asc_onZoomChange", e, f)
    }
    ;
    y.prototype.vXd = function(e) {
        this.Oe("asc_onCountPages", e)
    }
    ;
    y.prototype.Ecc = function(e) {
        this.Oe("asc_onCurrentPage", e)
    }
    ;
    y.prototype.w9 = function(e, f) {
        this.i6 ? (this.Fa && this.Fa.Pva != e && (this.Fa.Pva = e,
        this.Fa.Pva && null != this.Fa.GLg && this.Fa.GLg.focus(),
        this.Oe("asc_onEnableKeyEventsChanged", e)),
        !0 !== f && AscCommon.Rn && AscCommon.Rn.PAf(e)) : this.iNc = e
    }
    ;
    y.prototype.Uza = function(e) {
        var f = !1;
        this.Fa.Pva && (f = !0);
        f && e && this.Fa.mHf && (f = !1);
        return f
    }
    ;
    y.prototype.Yrd = function() {
        if (this.tob)
            this.$G(oh.Gs, yb.FH);
        else if (this.sSa)
            this.$G(oh.tP, yb.FH);
        else if (this.$G(oh.Gs, yb.d7a),
        void 0 === this.Aia) {
            var e = this.ORa;
            e.ea = yb.d7a;
            e.e7c = this.J4.h_.length;
            e.mMb = 0;
            var f = this.Fa.Wa
              , y = 0;
            if (void 0 !== f && null != f)
                for (var Ma in f.VY) {
                    if (this.To.MRa) {
                        var Pa = f.VY[Ma];
                        mg.XQd(Pa, this.klb + "media/" + Pa)
                    }
                    ++y
                }
            e.yUc = y;
            e.m6b = 0
        }
    }
    ;
    y.prototype.B$a = function() {
        if (!0 !== f.NATIVE_EDITOR_ENJINE || this.hrc("asc_onInitEditorStyles")) {
            var e = new AscCommonWord.pjg
              , y = this.Fa.Wa;
            if (y) {
                var Ma = y.Do()
                  , Pa = y.Uc.jr;
                !0 === Ma && y.HG(!1);
                !0 === Pa && y.VGf(!1, !1);
                e.B$a(this, null == this.QOb ? this.Fa.Wa.Om().ef : this.GXf);
                !0 === Ma && y.HG(!0);
                !0 === Pa && y.VGf(!0, !1)
            }
        }
    }
    ;
    y.prototype.BRd = function() {
        this.tob ? this.$x(oh.Gs, yb.FH) : this.sSa ? this.$x(oh.tP, yb.FH) : this.$x(oh.Gs, yb.d7a);
        if (void 0 !== this.Aia)
            this.Aia(),
            this.Aia = void 0;
        else if (this.tkb = 0,
        this.tob) {
            var e = 0, f;
            for (f in this.XJc)
                ++e;
            0 < e && (this.tkb = 2,
            this.$G(oh.Gs, yb.MK));
            this.tt.lna = !1;
            this.tt.Uva(this.XJc);
            this.tt.lna = !0
        } else if (this.sSa) {
            e = 0;
            for (f in this.DZc)
                ++e;
            0 < e && (this.tkb = 2,
            this.$G(oh.tP, yb.MK));
            this.tt.Uva(this.DZc)
        } else {
            this.B$a();
            null != this.Fa.Wa && (this.Fa.xd.DLb(),
            this.bAf(this.Fa.Wa.Dd),
            this.Oe("asc_onUpdateChartStyles"));
            var y = this.Fa.Wa;
            null == y && (y = this.Fa.xd.t_);
            e = 0;
            for (f in y.VY)
                ++e;
            if (!this.mVd) {
                var Ma = AscCommon.mIa.length;
                for (f = 0; f < Ma; f++)
                    y.VY[e + f] = AscCommon.mIa[f];
                this.ORa && !this.tt.lna && (this.ORa.yUc += Ma)
            }
            0 < e && (this.tkb = 1,
            this.$G(oh.Gs, yb.Uva));
            this.tt.ZAa = !0;
            this.tt.Uva(y.VY)
        }
    }
    ;
    y.prototype.YHg = function() {
        var e = new CFontsCharMap;
        e.p$g();
        this.Fa.Wa.uW(e);
        return e.f9g()
    }
    ;
    y.prototype.S$d = function(e, f) {
        this.i1d = {
            qVa: e,
            Sng: f
        };
        this.Oe("asc_onSendThemeColors", e, f)
    }
    ;
    y.prototype.jJb = function() {
        return null == this.Fa.Wa ? null : this.Fa.Wa.Dd
    }
    ;
    y.prototype.iUf = function(e) {
        if (null != this.Fa.Wa && null != this.Fa.Wa.ec) {
            var f = this.Fa.Wa.Dd
              , y = AscCommon.bTd(e);
            y || (y = f.dTd(e));
            y && !1 === this.Fa.Wa.Ke(AscCommon.XWc) && (this.Fa.Wa.gg(AscDFH.UTd),
            f.dlb(y),
            this.Fa.xd.DLb(),
            this.Lnb.Nac(),
            this.OBa.clear(),
            this.Oe("asc_onUpdateChartStyles"),
            this.Fa.Wa.Bd(),
            this.Fa.Wa.Sf(),
            this.Fa.xd.TD(),
            this.Fa.AW(),
            this.Fa.xd.DLb(),
            this.Fa.Wa.Ie())
        }
    }
    ;
    y.prototype.PZe = function(e) {
        if (null != this.Fa.Wa && null != this.Fa.Wa.ec) {
            var f = this.jJb();
            f && (e = this.p8b(e)) && !1 === this.Fa.Wa.Ke(AscCommon.XWc) && (this.Fa.Wa.gg(AscDFH.UTd),
            f.dlb(e),
            this.Fa.xd.DLb(),
            this.Lnb.Nac(),
            this.OBa.clear(),
            this.Oe("asc_onUpdateChartStyles"),
            this.Fa.Wa.Bd(),
            this.Fa.Wa.Sf(),
            this.Fa.xd.TD(),
            this.Fa.AW(),
            this.Fa.xd.DLb(),
            this.Fa.Wa.Ie())
        }
    }
    ;
    y.prototype.Zrd = function() {
        this.tt.ZAa = !1;
        var e = this.tob;
        null != this.Fa.xd.t_ ? (1 == this.tkb ? this.$x(oh.Gs, yb.Uva) : 2 == this.tkb && (this.tob ? this.$x(oh.Gs, yb.MK) : this.$x(oh.tP, yb.MK)),
        this.tkb = 0,
        this.Fa.xd.Kte(),
        this.QOb = null,
        this.QK = !0,
        !1 === this.tob && this.iZc(),
        this.Fa.yFf(),
        this.Ex && this.VZa(!0)) : (1 == this.tkb ? this.$x(oh.Gs, yb.Uva) : 2 == this.tkb && (e ? this.$x(oh.Gs, yb.MK) : this.$x(oh.tP, yb.MK)),
        this.tkb = 0,
        !1 === this.tob && !1 === this.sSa && !1 === this.VOf ? (this.jEe = !0,
        this.sFb()) : this.tob ? (this.tob = !1,
        this.XJc = null,
        this.nma(),
        this.nma = null,
        this.ilb()) : this.sSa ? (this.sSa = !1,
        this.DZc = null,
        this.Tcg(),
        !1 === this.QK && (this.QK = !0,
        this.iZc())) : this.VOf && (this.VOf = !1,
        this.T8d = null,
        this.tt.lna || this.fog()))
    }
    ;
    y.prototype.sFb = function() {
        if (!this.sca && this.jEe && this.oVc && this.Fa && this.Fa.Wa) {
            var e = !1;
            if (0 == this.DocumentType)
                this.Fa.Wa.ese();
            else if (1 == this.DocumentType)
                this.Fa.Wa.kmg();
            else if (this.QOb) {
                var f = this.Fa.Wa;
                if (this.yYc) {
                    if (AscCommon.WD && (AscCommon.WD.te(),
                    !AscCommon.WD.J1b))
                        return AscCommon.WD.xlf(AscCommon.Kd.xU, this, this.sFb);
                    !1 !== this.sSa || e || (this.QK = e = !0,
                    f.v7a());
                    this.yYc = !1;
                    this.dUe();
                    AscCommon.Kd.dHb();
                    AscCommon.Kd.gPc();
                    this.xYc = !0
                }
                !1 !== this.sSa || e || (this.QK = e = !0,
                f.v7a());
                f.ee(!1);
                e && (this.iZc(),
                f.q$a(!1));
                if (this.mVd) {
                    f.o7a();
                    var y = {
                        $l: !0
                    };
                    f.ec.aRf(y);
                    f.ec.$Qf(y);
                    this.Fa.OJg() ? this.Fa.ZLg() : this.dEf()
                } else
                    !1 === this.sSa && f.mtb(),
                    this.Fa.xd.aK()
            }
            !1 !== this.sSa || e || (this.QK = !0,
            this.iZc());
            this.Fa.Wa.Ie();
            this.Fa.Wa.$i();
            this.QOb = null;
            this.Fa.yFf();
            this.Ex || (this.fAf(),
            this.dAf(),
            this.KSa && this.Fa.xd.X4a(this.KSa));
            this.Ex && this.VZa(!0);
            this.u7b = ob.kf
        }
    }
    ;
    y.prototype.WHa = function() {
        null != this.Fa.Wa && this.Fa.Wa.Kl()
    }
    ;
    y.prototype.ARd = function(e) {
        this.$x(oh.tP, yb.FH);
        if (void 0 !== this.Aia)
            this.Aia(),
            this.Aia = void 0;
        else {
            var f = Ta.dJb;
            null != f.dZd ? (e = f.H8f(f.dZd),
            this.Fa.Wa.gLe(f.dZd.text, e),
            this.Fa.d$g(),
            f.dZd = null,
            this.$x(oh.Gs, yb.FH)) : 1 == this.gWf ? (this.gWf = 0,
            this.Rqd(this.fWf),
            this.fWf = null) : !1 === this.Fa.Wa.Ke(AscCommon.fP) && (this.Fa.Wa.gg(AscDFH.t6d),
            this.Fa.Wa.$g(new AscCommonWord.tN({
                wf: {
                    Ja: e.Ja,
                    za: -1
                }
            })),
            this.Fa.Wa.Kl(),
            this.Fa.Wa.Sf())
        }
    }
    ;
    y.prototype.Mrd = function(e) {
        this.WZa = e
    }
    ;
    y.prototype.Z$ = function(e) {
        this.WZa ? this.WZa(e) : !1 === this.Fa.Wa.Ke(jb) && (this.Fa.Wa.gg(AscDFH.T4d),
        this.Fa.Wa.nP(50, 50, e.src),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.V2a = function(e) {
        e.fIa && this.Sfa && (this.Sfa.fIa = e.fIa,
        this.Sfa.jWc(this));
        e.znb ? this.L_d(e.url, e.data) : this.Kte(e.url, e.data)
    }
    ;
    y.prototype.xsc = function(e) {
        this.Fa.xd.Ijg(e.src);
        this.Fa.xd.IRa == e.src && (this.Fa.xd.IRa = "",
        this.WHa())
    }
    ;
    y.prototype.zOd = function() {
        return !0
    }
    ;
    y.prototype.DN = function(e, y, Ma) {
        if (void 0 !== f.Native && void 0 !== f.Native.GetImageUrl)
            Ma();
        else if (f.IS_NATIVE_EDITOR)
            Ma();
        else {
            this.nma = Ma;
            this.XJc = y;
            y = 0;
            for (var Pa in this.XJc)
                ++y;
            AscFonts.tp.iIa(e);
            0 == y && !1 === this.J4.$pb(e) ? (this.nma(),
            this.nma = null) : (this.Blb(),
            this.tob = !0,
            this.J4.JRa(e))
        }
    }
    ;
    y.prototype.I9d = function(e) {
        this.sSa = !0;
        this.DZc = e;
        this.Fa.xd.JYd();
        this.J4.JRa(this.Fa.Wa.SP)
    }
    ;
    y.prototype.zLg = function(e) {
        this.VOf = !0;
        this.T8d = e;
        e = 0;
        for (var f = this.tt.Y_, y = this.T8d.length, Ma = 0; Ma < y; Ma++)
            void 0 !== f[this.T8d[Ma]] ? (this.T8d.splice(Ma, 1),
            Ma--,
            y--) : ++e;
        0 < e && (this.tkb = 2,
        this.$G(oh.tP, yb.MK));
        this.tt.Uva(this.T8d)
    }
    ;
    y.prototype.fog = function() {
        this.Fa.cFb()
    }
    ;
    y.prototype.Tcg = function() {
        AscCommon.Kd.iPd();
        this.xYc && (this.xYc = !1,
        this.sFb())
    }
    ;
    y.prototype.JRc = function() {}
    ;
    y.prototype.J_f = function(e) {
        this.Fa.Nra.EIa(e)
    }
    ;
    y.prototype.K_f = function(e) {
        this.Fa.Bca.vma(e)
    }
    ;
    y.prototype.CWf = function() {
        return this.Fa.gya
    }
    ;
    y.prototype.BWf = function() {
        return this.Fa.rua
    }
    ;
    y.prototype.HUf = function() {
        return this.Fa.xd.yje(!0)
    }
    ;
    y.prototype.jOd = function() {
        var e = this.Fa.xd.qS
          , f = e + 1;
        if (f > this.Fa.xd.cT)
            return e;
        var y = this.Fa.xd.ql;
        return y[e].zq.bottom > this.Fa.qu.Xe.height - y[f].zq.top ? e : f
    }
    ;
    y.prototype.d_e = function(e) {
        this.Fa && (this.Fa.Jpf = e)
    }
    ;
    y.prototype.h_e = function(e) {
        this.i6 ? this.Fa.k7 != e && (this.Fa.k7 = e,
        this.Fa.V7b(),
        this.Fa.m7a(!0)) : this.AXd = e
    }
    ;
    y.prototype.q2f = function() {
        this.Fa.k7 = !this.Fa.k7;
        this.Fa.V7b();
        this.Fa.m7a(!0);
        return this.Fa.k7
    }
    ;
    y.prototype.o2f = function() {
        return this.Fa.k7
    }
    ;
    y.prototype.e_e = function(e) {
        this.Fa && this.Fa.ML && this.Fa.y3 ? (this.Fa.ML.ZYa = e,
        this.Fa.y3.ZYa = e,
        this.Fa.VHa(!0),
        this.Fa.hnb(!0)) : this.e_c = e
    }
    ;
    y.prototype.aXf = function(e) {
        if (!this.Fa.xd.$rb(e)) {
            var f = !1
              , y = this.Fa.Wa;
            AscCommonWord.m3d !== y.oa.ea && (y.Dm(AscCommonWord.m3d),
            f = !0);
            var Ma = kd.Dk;
            kd.UF = 0;
            kd.Dk = 1;
            y.XQ(kd, 0, 0, e);
            y.IZ(kd, 0, 0, e);
            y.QU(kd, 0, 0, e);
            y.vv();
            y.Kl();
            y.sr();
            kd.Dk = Ma;
            !0 === f && (this.Fa.xd.TD(),
            this.Fa.xd.QG())
        }
    }
    ;
    y.prototype.IJg = function(e) {
        if (!this.Fa.xd.$rb(e)) {
            var f = !1
              , y = this.Fa.Wa;
            AscCommonWord.m3d !== y.oa.ea && (y.Dm(AscCommonWord.m3d),
            f = !0);
            var Ma = kd.Dk;
            kd.UF = 0;
            kd.Dk = 1;
            y.XQ(kd, 0, AscCommon.g5a, e);
            y.IZ(kd, 0, AscCommon.g5a, e);
            y.QU(kd, 0, 0, e);
            y.vv();
            y.Kl();
            y.sr();
            kd.Dk = Ma;
            !0 === f && (this.Fa.xd.TD(),
            this.Fa.xd.QG())
        }
    }
    ;
    y.prototype.TVf = function(e) {
        if (!this.Fa.xd.$rb(e)) {
            var f = kd.Dk;
            kd.Dk = 2;
            this.Fa.Wa.XQ(kd, 0, AscCommon.g5a / 2, e);
            this.Fa.Wa.IZ(kd, 0, AscCommon.g5a / 2, e);
            this.Fa.Wa.Ie();
            kd.Dk = f
        }
    }
    ;
    y.prototype.zWf = function() {
        return this.Fa.xoa
    }
    ;
    y.prototype.lZf = function(e) {
        this.Z5a = e = !0 === e ? kc.$1b : !1 === e ? kc.xna : e;
        kc.xna !== e && this.Fa.Wa.tOc()
    }
    ;
    y.prototype.mUf = function(e) {
        this.MOc(new Yg({
            dm: {
                type: e
            }
        }))
    }
    ;
    y.prototype.Ccc = function(e) {
        this.Z5a = e = !0 === e ? kc.$1b : !1 === e ? kc.xna : e;
        return this.Oe("asc_onPaintFormatChanged", e)
    }
    ;
    y.prototype.kLg = function(e, f, y, Ma, Pa) {
        if (this.oGb = e)
            this.Fa.Wa.bYf(f, y, Ma, Pa),
            this.Fa.Wa.tOc()
    }
    ;
    y.prototype.Bcc = function(e) {
        this.oGb = e;
        return this.Oe("asc_onMarkerFormatChanged", e)
    }
    ;
    y.prototype.aid = function(e) {
        this.Fa && this.Fa.Wa && (this.ahb = e,
        this.Fa.Wa.Wn.Qh = e,
        this.ahb && this.rob && this.LGe(!1),
        this.Fa.xd.y7a(),
        this.ahb && this.Fa.xd.bDa("de-tablepen"))
    }
    ;
    y.prototype.U$d = function() {
        this.ahb = !1;
        this.Fa.Wa.Wn.Qh = !1;
        this.ahb || (this.Fa.Wa.Wn.Mb = !1,
        this.Fa.xd.y7a());
        this.Oe("asc_onTableDrawModeChanged", !1)
    }
    ;
    y.prototype.LGe = function(e) {
        this.Fa && this.Fa.Wa && (this.rob = e,
        this.Fa.Wa.Wn.BRa = e,
        this.rob && this.ahb && this.aid(!1),
        this.Fa.xd.y7a(),
        this.rob && this.Fa.xd.bDa("de-tableeraser"))
    }
    ;
    y.prototype.V$d = function() {
        this.rob = !1;
        this.Fa.Wa.Wn.BRa = !1;
        this.rob || (this.Fa.Wa.Wn.Mb = !1,
        this.Fa.xd.y7a());
        this.Oe("asc_onTableEraseModeChanged", !1)
    }
    ;
    y.prototype.xIe = function(e, f) {
        this.ahb && this.U$d();
        this.rob && this.V$d();
        this.E0 = !0;
        this.YQd = e;
        f ? this.Fa.xd.bDa("crosshair") : (editor.Ina(),
        editor.iTc(!1))
    }
    ;
    y.prototype.qbe = function(e) {
        if (this.Fa.Wa) {
            var f = this.jOd()
              , y = this.Fa.Wa.KE(f)
              , Ma = Math.min(y.Gd / 2, y.rf / 2);
            this.Fa.Wa.ec.ZPg(e, f, y.ka + y.Gd / 4, y.la + y.rf / 4, Ma, Ma)
        }
    }
    ;
    y.prototype.erd = function() {
        return this.Fa.Wa.ec.RWc()
    }
    ;
    y.prototype.Wrd = function() {
        return this.Fa.Wa.ec.UZc()
    }
    ;
    y.prototype.jrd = function() {
        return this.Fa.Wa.ec.XIb()
    }
    ;
    y.prototype.hrd = function() {
        return this.Fa.Wa.ec.jXc()
    }
    ;
    y.prototype.grd = function() {
        return this.Fa.Wa.ec.iXc()
    }
    ;
    y.prototype.RS = function(e) {
        !1 === this.Fa.Wa.Ke(jb) && (this.Fa.Wa.gg(AscDFH.STd),
        this.Fa.Wa.RS(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.iTc = function(e) {
        this.E0 = e;
        return this.Oe("asc_onStartAddShapeChanged", e)
    }
    ;
    y.prototype.jfe = function() {
        return this.Fa.Wa.jfe()
    }
    ;
    y.prototype.lfe = function() {
        return this.Fa.Wa.lfe()
    }
    ;
    y.prototype.hfe = function() {
        return this.Fa.Wa.hfe()
    }
    ;
    y.prototype.AIe = function() {
        return this.Fa.Wa.AIe()
    }
    ;
    y.prototype.GUf = function() {
        !1 === this.Fa.Wa.Ke(AscCommon.fP) && (this.Fa.Wa.gg(AscDFH.h5d),
        this.Fa.Wa.BA(),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.yJg = function() {
        var e = new Ia;
        e.L$b = 297;
        e.K$b = 210;
        e.XOc = 30;
        e.YOc = 15;
        e.qbd = 20;
        e.pbd = 20;
        return e
    }
    ;
    y.prototype.cQg = function(e) {
        !1 === this.Fa.Wa.Ke(jb) && (this.Fa.Wa.gg(AscDFH.RTd),
        this.Fa.Wa.YSf(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.VZa = function(e) {
        this.Ex = !!e;
        this.i6 && (e ? (this.cJf(),
        this.jr = !1,
        AscCommon.Kd.$sa(!0),
        null == this.Fa.xd.t_ ? (this.Fa.xd.TD(),
        this.Fa.b_d()) : (this.Fa.b_d(),
        this.Fa.AW())) : (this.Fa.V7b(),
        this.Fa.xd.TD(),
        this.Fa.m7a(!0)))
    }
    ;
    y.prototype.IZ = function(e, f) {
        this.Fa.jcg(e, f)
    }
    ;
    y.prototype.WZa = null;
    y.prototype.gZf = function(e, f) {
        this.Fa.xd.wOd(e);
        this.Fa.xd.XNd(f)
    }
    ;
    y.prototype.p3e = function() {
        return -1
    }
    ;
    y.prototype.H_e = function() {
        var e = this.Fa.Wa.LR();
        return new AscCommon.rJa(e.Oj,e.la,e.Ag - e.Oj,0)
    }
    ;
    y.prototype.Ocb = function(e, f) {
        var y = this;
        if (f)
            this.hrc("asc_onAdvancedOptions") ? y.Oe("asc_onAdvancedOptions", Xe.qMb) : y.Oe("asc_onError", de.pg.Rec, de.Lk.IU);
        else if (this.hrc("asc_onAdvancedOptions")) {
            var Ma = {
                codepage: AscCommon.CIb,
                encodings: AscCommon.cTd()
            };
            e && "undefined" !== typeof Blob && "undefined" !== typeof FileReader ? AscCommon.Nhf().getBinaryContent(e, function(e, f) {
                e ? y.Oe("asc_onError", de.pg.QN, de.Lk.IU) : (Ma.data = f,
                y.Oe("asc_onAdvancedOptions", Xe.t5a, new AscCommon.mWc(Ma)))
            }) : y.Oe("asc_onAdvancedOptions", Xe.t5a, new AscCommon.mWc(Ma))
        } else
            this.UZa(Xe.t5a, new Asc.gQc(AscCommon.CIb))
    }
    ;
    y.prototype.w1d = function(e, f) {
        return this.Fa && this.Fa.xd && (sb.WHb === f.mlb || sb.I$b === f.mlb) ? this.Fa.xd.EHg([e, f]) : !1
    }
    ;
    y.prototype.Kod = function(e, y, Ma, Pa) {
        var Ia = this
          , Xa = y.mlb;
        yb.NPd === e ? (Ma.c = "sendmm",
        Ma.userindex = this.ll.qbc()) : this.Fa.Wa || (Ma.c = "savefromorigin");
        if ("savefromorigin" === Ma.c)
            Ma.format = this.VIb;
        else if (null != y.lSc || sb.WHb !== Xa && sb.I$b !== Xa)
            sb.JSON === Xa ? (Ma.url = this.ZDd.url,
            Ma.format = this.ZDd.fileType,
            this.ZDd.token && (Ma.tokenDownload = this.ZDd.token,
            Ma.tokenSession = void 0),
            Ma.codepage = AscCommon.CIb,
            Ma.delimiter = AscCommon.p_a.B3c) : this.JFa ? (e = this.JFa.wxb.shift(),
            Ma.url = e.url,
            Ma.format = e.format,
            e.g_c && (Ma.tokenDownload = e.g_c,
            Ma.tokenSession = void 0),
            Ma.outputurls = !0,
            Ma.codepage = AscCommon.CIb,
            Pa.data = e.data) : sb.KOc === Xa && null == y.lSc && null == y.mSc ? (e = new AscCommon.GTf,
            e.og = !1,
            e.im = 27,
            this.Fa.Wa.Ocd(e),
            Pa.data = "\ufeff" + f.asc_docs_api.prototype.asc_nativeGetHtml.call(this)) : (y.pEa instanceof Asc.gQc && (Ma.codepage = y.pEa.HTa()),
            e = null != y.lSc ? y.lSc : this.Fa.Wa,
            e = null != y.mSc && sb.KOc === y.mSc.Txg() ? new AscCommonWord.Xg(e,!1,!0,y.iSd) : new AscCommonWord.Xg(e,void 0,void 0,y.iSd),
            Pa.data = e.KH(Ma.nobase64));
        else {
            e = !1;
            y.pEa && y.pEa && Asc.EIb.Selection === y.pEa.nac() && (e = !0);
            var Ta = this.Fa.xd;
            e && Ta.vlg();
            Pa.data = Ta.oHf(Ma.nobase64, e)
        }
        if (null != y.mSc) {
            Ma.mailmergesend = y.mSc;
            e = this.Fa.Wa.WY;
            Ta = [];
            if (e) {
                if (0 < e.length) {
                    var jb = e[0], Va = [], cb;
                    for (cb in jb)
                        Va.push(cb);
                    Ta.push(Va)
                }
                for (cb = 0; cb < e.length; ++cb) {
                    jb = e[cb];
                    Va = [];
                    for (var $a in jb)
                        Va.push(jb[$a]);
                    Ta.push(Va)
                }
            }
            var ib = Pa.data;
            Pa.data = JSON.stringify(Ta);
            y.mSc.HDg(!0);
            var ob = y.D9;
            y.D9 = function(e) {
                Ma.savekey = e.data;
                e = {
                    data: ib,
                    n3b: null,
                    index: 0,
                    count: 0
                };
                y.mSc.HDg(!1);
                AscCommon.i$d(function(e, f, y) {
                    Di(Ia, e, f, y)
                }, Ia.qna, ob, Ma, e)
            }
        }
        if (f.FHc)
            return f.AscDesktopEditor.CryptoDownloadAs(Pa.data, Xa, "<m_nCsvTxtEncoding>" + Ma.codepage + "</m_nCsvTxtEncoding>"),
            !0
    }
    ;
    y.prototype.t0e = function(e) {
        this.h6 = !0;
        AscFormat.hb(e) || (this.vRd(),
        this.Fa.Wa.Ke(AscCommon.Tha));
        return this.Fa.Wa.ule(e)
    }
    ;
    y.prototype.n_e = function(e) {
        if (!1 === this.Fa.Wa.Ke(jb)) {
            this.Fa.Wa.gg(AscDFH.Q4d);
            AscFonts.WL = !0;
            this.hQc(!0);
            this.Fa.Wa.nP(null, null, null, e);
            AscFonts.WL = !1;
            var f = this;
            AscFonts.tp.UTa("", this, function() {
                this.hQc(!1, !0);
                f.Fa.Wa.Sf()
            }, !1, !1, !1)
        }
    }
    ;
    y.prototype.t2f = function(e) {
        this.h6 = !0;
        this.vRd();
        f.IS_NATIVE_EDITOR || this.Fa.kcg();
        this.Oe("asc_doubleClickOnChart", e)
    }
    ;
    y.prototype.Orc = function() {
        AscCommon.Cnb.prototype.Orc.call(this);
        this.Fa.Aob = !1
    }
    ;
    y.prototype.z_e = function(e) {
        AscFormat.$Of(e) && !1 === this.Fa.Wa.Ke(jb) && (this.Fa.Wa.gg(AscDFH.l5d),
        this.Fa.Wa.Oaa(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.ACf = function() {
        this.Oe("asc_onCloseChartEditor")
    }
    ;
    y.prototype.e2d = function(e) {
        this.QFg = e;
        this.i6 && e !== this.MRc && (this.MRc = e,
        this.Fa.xd.TD(),
        this.Fa.xd.QG())
    }
    ;
    y.prototype.Qqd = function(e) {
        var f = AscCommon.TK
          , y = Ta.Zma("Cambria Math");
        if (!1 === f.FH(y))
            return this.Rqd(e);
        this.gWf = 1;
        this.fWf = e
    }
    ;
    y.prototype.Rqd = function(e) {
        !1 === this.Fa.Wa.Ke(jb) && (this.Fa.Wa.gg(AscDFH.PTd),
        e = new AscCommonWord.WEb(e),
        this.Fa.Wa.$g(e),
        this.Fa.Wa.Sf())
    }
    ;
    y.prototype.OQg = function() {
        this.Fa.Wa.OSf()
    }
    ;
    y.prototype.BSg = function(e) {
        this.ZDd = e;
        this.$qd(new Asc.eQc(Asc.Gnb.JSON))
    }
    ;
    y.prototype.r2f = function(e) {
        if (!e || !e.length || 0 >= e.length)
            e = [[]];
        var f = e[0];
        if (!f || !f.length || 0 >= f.length)
            f = [];
        for (var y = {}, Ma = 0, Pa = f.length; Ma < Pa; Ma++) {
            "" === f[Ma] && (f[Ma] = "F" + (Ma + 1));
            if (void 0 !== y[f[Ma]]) {
                for (var Ia = 1, Xa = f[Ma] + Ia; void 0 !== y[Xa]; )
                    Ia++,
                    Xa = f[Ma] + Ia;
                f[Ma] = Xa
            }
            y[f[Ma]] = 1
        }
        y = [];
        Ma = f.length;
        Ia = 1;
        for (Pa = e.length; Ia < Pa; Ia++) {
            Xa = e[Ia];
            for (var Ta = {}, jb = 0; jb < Ma; jb++)
                Ta[f[jb]] = Xa[jb];
            y.push(Ta)
        }
        this.Fa.Wa.JZf(y, f)
    }
    ;
    y.prototype.ARg = function() {
        return this.Fa.Wa.YZd()
    }
    ;
    y.prototype.vRg = function() {
        return this.Fa.Wa.WWf()
    }
    ;
    y.prototype.KQg = function(e) {
        this.Fa.Wa.WSf(e)
    }
    ;
    y.prototype.wSg = function(e) {
        this.Fa.Wa.sZf(e)
    }
    ;
    y.prototype.WRg = function(e) {
        this.Fa.Wa.mYf(e)
    }
    ;
    y.prototype.fRg = function() {
        this.Fa.Wa.wOc()
    }
    ;
    y.prototype.jSf = function() {
        this.Oe("asc_onStartMailMerge")
    }
    ;
    y.prototype.hSf = function(e) {
        this.Oe("asc_onPreviewMailMergeResult", e)
    }
    ;
    y.prototype.bSf = function() {
        this.Oe("asc_onEndPreviewMailMergeResult")
    }
    ;
    y.prototype.oXd = function(e) {
        this.Oe("asc_onHighlightMailMergeFields", e)
    }
    ;
    y.prototype.kUg = function() {
        return this.Fa.Wa.XWf()
    }
    ;
    y.prototype.tWg = function(e) {
        this.r2f(e)
    }
    ;
    y.prototype.DVg = function(e) {
        var f = this
          , y = Asc.OH.NPd;
        e.d4b(this.yga);
        e.MDg(e.Xxg() - e.Wxg() + 1);
        var Ma = new Asc.eQc(Asc.Gnb.t5a);
        Ma.mSc = e;
        Ma.D9 = function(e) {
            null != e && "sendmm" === e.type ? "ok" != e.status && f.Oe("asc_onError", AscCommon.wGb(parseInt(e.data)), de.Lk.Vo) : f.Oe("asc_onError", de.pg.QN, de.Lk.Vo);
            f.$x(Asc.vE.Gs, y)
        }
        ;
        this.Xuc(y, Ma)
    }
    ;
    y.prototype.wRg = function(e, f) {
        return this.Fa.Wa.VWf(e, f)
    }
    ;
    y.prototype.DRg = function() {
        return this.Fa.Wa.gL()
    }
    ;
    y.prototype.MQg = function(e) {
        this.Fa.Wa.XSf(e)
    }
    ;
    y.prototype.aSg = function(e) {
        this.Fa.Wa.f0d(e)
    }
    ;
    y.prototype.ZRg = function() {
        this.Fa.Wa.GYf()
    }
    ;
    y.prototype.SRg = function(e) {
        return this.Fa.Wa.I6b(e)
    }
    ;
    y.prototype.RRg = function(e) {
        return this.Fa.Wa.BUc(e)
    }
    ;
    y.prototype.ERg = function(e) {
        return this.Fa.Wa.ZWf(e)
    }
    ;
    y.prototype.bJf = function(e) {
        var f = this.Fa.Wa;
        if (f)
            return f.HG(e)
    }
    ;
    y.prototype.TRg = function() {
        var e = this.Fa.Wa;
        return e ? e.Do() : !1
    }
    ;
    y.prototype.iXd = function() {
        this.zGf = []
    }
    ;
    y.prototype.lXd = function() {
        this.Oe("asc_onShowRevisionsChange", this.zGf)
    }
    ;
    y.prototype.VZe = function() {
        return this.zGf
    }
    ;
    y.prototype.$Rf = function(e) {
        this.zGf.push(e)
    }
    ;
    y.prototype.HQg = function(e) {
        e ? this.Fa.Wa.tTc(e) : this.Fa.Wa.GSf()
    }
    ;
    y.prototype.YRg = function(e) {
        e ? this.Fa.Wa.eVc(e) : this.Fa.Wa.zYf()
    }
    ;
    y.prototype.jsg = function(e) {
        return this.Fa.Wa ? this.Fa.Wa.eXf(e) : !1
    }
    ;
    y.prototype.MRg = function() {
        return this.jsg()
    }
    ;
    y.prototype.xRg = function() {
        return this.Fa.Wa.hUc()
    }
    ;
    y.prototype.zRg = function() {
        return this.Fa.Wa.KWf()
    }
    ;
    y.prototype.mSf = function(e, f) {
        this.Oe("asc_onUpdateRevisionsChangesPosition", e, f)
    }
    ;
    y.prototype.GQg = function() {
        this.Fa.Wa.TXd()
    }
    ;
    y.prototype.XRg = function() {
        this.Fa.Wa.c0d()
    }
    ;
    y.prototype.aJf = function() {
        var e = {}, f = this.Fa.Wa.xq.SWf(), y;
        for (y in f)
            for (var Ma = f[y], Pa = 0, Ia = Ma.length; Pa < Ia; ++Pa) {
                var Xa = Ma[Pa]
                  , Ta = Xa.pJb()
                  , jb = Xa.Cyb();
                e[Ta] || (e[Ta] = []);
                Ta = e[Ta];
                for (var Va = 0, cb = Ta.length; Va < cb && !(jb < Ta[Va].Cyb()); )
                    Va++;
                Ta.splice(Va, 0, Xa)
            }
        return e
    }
    ;
    y.prototype.hRg = function(e) {
        var f = this.Mca();
        f && f.Ymb(e.K7, e.US === Asc.EP.Qda, !0, !0)
    }
    ;
    y.prototype.l2d = function() {
        this.Fa.Wa.Jza({
            $l: !0
        })
    }
    ;
    y.prototype.QZe = function() {
        Ud.yg();
        dh.yg();
        Je.yg();
        AscCommon.Kd.yg();
        this.yYc = !0;
        this.sca = !1;
        var e = this.Fa.Wa;
        e.$Pd();
        e.aHf();
        AscCommon.xta.LK = {};
        this.Fa.xd.MHg()
    }
    ;
    y.prototype.f_e = function(e) {
        this.Fa && this.Fa.Wa && AscCommon.Kd && (AscCommon.Kd.aIb(e),
        f.AscCommon.Gh && e && !AscCommon.Kd.N$() && f.AscCommon.Gh.Yna())
    }
    ;
    y.prototype.gqc = function() {
        AscCommon.Cnb.prototype.gqc.call(this);
        Ud = AscCommon.History;
        Ta = AscFonts.Q5;
        Uc = AscCommon.N_d;
        kd = AscCommon.aT;
        this.Fa = new AscCommonWord.BTf(this);
        this.Fa.Ja = this.z9c;
        this.VNd = AscCommonWord.Bhg.en;
        Uc.lA = !0;
        this.VUf();
        this.Fa.Gu();
        this.zXd && this.iFe(this.zXd);
        null !== this.AXd && this.h_e(this.AXd);
        if (null !== this.jNc)
            switch (this.jNc) {
            case AscCommon.$Ub.c3:
                this.DDf();
                break;
            case AscCommon.$Ub.yHb:
                this.EDf();
                break;
            case AscCommon.$Ub.eZd:
                this.CDf()
            }
        null != this.e_c && (this.e_e(this.e_c),
        this.e_c = null);
        this.VZa(this.Ex);
        this.e2d(this.QFg);
        this.mVd && (this.tt.lna = !1);
        this.i3b && this.$Ed(this.i3b)
    }
    ;
    y.prototype.RTb = function(e) {
        this.Fa.Wa && this.Fa.Wa.mtb(e)
    }
    ;
    y.prototype.jQc = function() {
        if (!this.Fa || !this.Fa.Wa || this.Fa.Wa.Ke(jb))
            return !1;
        this.Fa.Wa.gg(AscDFH.FXb);
        return !0
    }
    ;
    y.prototype.iRg = function() {
        var e = this.Fa.Wa;
        if (!e)
            return [];
        e = e.dFf();
        for (var f = [], y = 0, Ma = e.length; y < Ma; ++y)
            f.push(e[y].Wt());
        return f
    }
    ;
    y.prototype.mSg = function(e) {
        var f = this.Fa.Wa;
        if (f) {
            for (var y = f.dFf(), Ma = 0, Pa = y.length; Ma < Pa; ++Ma)
                y[Ma].gD(e[Ma] ? e[Ma] : "");
            this.q2() || f.mtb()
        }
    }
    ;
    y.prototype.osg = function(e) {
        var f = this.Fa.Wa;
        if (f) {
            var y = !0
              , Ma = null;
            if (void 0 === e) {
                var Pa = f.rl({
                    z0d: !0
                })
                  , Ia = Pa.n4;
                Pa = Pa.sua;
                Ia ? Ma = Ia : Pa && (Ma = Pa)
            } else
                Ma = AscCommon.Fg.cg(e);
            Ma && Ma.uV && (c_oAscSdtLevelType.fda === Ma.uV() ? y = f.Ke(AscCommon.rR, {
                ea: AscCommon.xaa,
                Xb: [Ma],
                Lu: AscCommon.FQc
            }) : c_oAscSdtLevelType.Yq === Ma.uV() && (e = Ma.bl()) && (y = f.Ke(AscCommon.rR, {
                ea: AscCommon.xaa,
                Xb: [e],
                Lu: AscCommon.LG
            })),
            e = Ma.Wi());
            !1 === y && (f.gg(AscDFH.C5d),
            f.rGf(e),
            f.Bd(),
            f.Kl(),
            f.sr(),
            f.Sf())
        }
    }
    ;
    y.prototype.psg = function(e) {
        var f = this.Fa.Wa;
        if (f) {
            var y = !0
              , Ma = f.zHb(e);
            if (Ma && Ma.uV) {
                if (c_oAscSdtLevelType.fda === Ma.uV())
                    y = f.Ke(AscCommon.rR, {
                        ea: AscCommon.xaa,
                        Xb: [Ma],
                        Lu: AscCommon.FQc
                    });
                else if (c_oAscSdtLevelType.Yq === Ma.uV() && (e = Ma.bl())) {
                    var Pa = f.lbb();
                    Ma.Spa();
                    y = f.Ke(AscCommon.rR, {
                        ea: AscCommon.xaa,
                        Xb: [e],
                        Lu: AscCommon.l3
                    });
                    f.e7a(Pa)
                }
                e = Ma.Wi()
            }
            return !1 === y ? (f.gg(AscDFH.D5d),
            f.O$b(e),
            f.Bd(),
            f.Kl(),
            f.sr(),
            f.Sf(),
            !0) : !1
        }
    }
    ;
    y.prototype.sSg = function(e, f, y) {
        function Ma() {
            AscFonts.WL = !1;
            AscFonts.tp.UTa("", Pa, function() {
                this.Bd();
                this.Kl();
                this.sr();
                this.Sf()
            }, !1, !1, !1)
        }
        var Pa = this.Mca();
        if (Pa)
            if (!0 === y) {
                for (var Ia = Pa.ew(), Xa = [], Ta = [], jb = 0, Va = Ia.length; jb < Va; ++jb)
                    (f = Ia[jb],
                    c_oAscSdtLevelType.fda === f.uV()) ? (Xa.push(f),
                    Ta.push(AscCommon.EQc)) : c_oAscSdtLevelType.Yq === f.uV() && (y = f.bl()) && (Xa.push(y),
                    Ta.push(AscCommon.hJ));
                if (!1 === Pa.Ke(AscCommon.rR, {
                    ea: AscCommon.J2d,
                    Xb: Xa,
                    NYd: Ta
                })) {
                    Pa.gg(AscDFH.VTd);
                    AscFonts.WL = !0;
                    jb = 0;
                    for (Va = Ia.length; jb < Va; ++jb)
                        Ia[jb].Q$b(e);
                    Ma()
                }
            } else
                Ia = !0,
                (f = Pa.zHb(f)) && f.uV && (Asc.FFb.OIa !== f.ERa() && Asc.FFb.eJa !== f.ERa() || !e || Asc.FFb.Qza === e.HHa() || Asc.FFb.PAa === e.HHa() || !f.Qja() || f.ja.Date.NN(e.qkb) || (e.qkb = f.ja.Date.Sa()),
                c_oAscSdtLevelType.fda === f.uV() ? Ia = Pa.Ke(AscCommon.rR, {
                    ea: AscCommon.xaa,
                    Xb: [f],
                    Lu: AscCommon.EQc
                }) : c_oAscSdtLevelType.Yq === f.uV() && (y = f.bl()) && (Ia = Pa.Ke(AscCommon.rR, {
                    ea: AscCommon.xaa,
                    Xb: [y],
                    Lu: AscCommon.hJ
                }))),
                !1 === Ia && (Pa.gg(AscDFH.VTd),
                AscFonts.WL = !0,
                f.Q$b(e),
                Ma())
    }
    ;
    y.prototype.PRg = function() {
        var e = this.Fa.Wa;
        return e ? !!e.zHb() : !1
    }
    ;
    y.prototype.hsg = function() {
        var e = this.Fa.Wa;
        return e ? (e = e.zHb()) ? e.F$a() : null : null
    }
    ;
    y.prototype.isg = function() {
        var e = this.Fa.Wa;
        return e ? (e = e.zHb()) ? e.Wi() : null : null
    }
    ;
    y.prototype.O$d = function(e) {
        this.lM[this.lM.length] = new Ke(Xg.MUf,e)
    }
    ;
    y.prototype.uSg = function(e, f, y) {
        var Ma = this.Mca();
        if (Ma) {
            if (void 0 === e || null == e)
                y = f = e = 220;
            Ma.gg(AscDFH.Q5d);
            Ma.QPd(e, f, y);
            Ma.sb.TD();
            Ma.sb.QG();
            Ma.Sf()
        }
    }
    ;
    y.prototype.Ugg = function() {
        this.Oe("asc_onChangeSdtGlobalSettings")
    }
    ;
    y.prototype.rRg = function(e) {
        if (!0 === e)
            return new Asc.fta(220,220,220);
        e = this.Mca();
        if (!e)
            return new Asc.fta(0,0,0);
        e = e.$m.Q_.va;
        return new Asc.fta(e.r,e.vb,e.Xa)
    }
    ;
    y.prototype.vSg = function(e, f, y, Ma) {
        var Pa = this.Mca();
        Pa && (Pa.gg(AscDFH.R5d),
        Pa.q0d(e),
        void 0 !== f && void 0 !== y && void 0 !== Ma && Pa.QPd(f, y, Ma),
        Pa.ZY(),
        Pa.Sf())
    }
    ;
    y.prototype.sRg = function() {
        var e = this.Mca();
        return e ? e.$m.Q_.Xna : !1
    }
    ;
    y.prototype.pSg = function(e) {
        var f = this.Mca();
        if (f && e) {
            var y = f.zHb();
            if (y && y.QW()) {
                e.f0 && AscFonts.tp.kBa(e.f0);
                e.q0 && AscFonts.tp.kBa(e.q0);
                var Ma = {};
                e.qP && (Ma[e.qP] = !0);
                e.BP && (Ma[e.BP] = !0);
                AscCommon.hOc(this, Ma, {}, function() {
                    var Ma = y.bl();
                    Ma && !f.YL(AscCommon.rR, {
                        ea: AscCommon.xaa,
                        Xb: [Ma],
                        Lu: AscCommon.hJ
                    }) && (f.gg(AscDFH.M5d),
                    y.aYd(e),
                    f.Bd(),
                    f.Uda(),
                    f.Sf())
                })
            }
        }
    }
    ;
    y.prototype.p2f = function(e, y) {
        var Ma = this.Mca();
        if (Ma && !AscCommon.chb(e))
            if (y = Ma.zHb(y),
            y.n0(!0),
            y && y.raa() && y.l0d() && y.Q0())
                if (Ma.YL(AscCommon.Xza, void 0, !1, Ma.LCa()))
                    y.n0(!1);
                else {
                    y.n0(!1);
                    var Pa = {
                        Am: e
                    }
                      , Ia = Ma = null
                      , Xa = "";
                    mg.mca(e) || (Ma = e,
                    Ia = function(e) {
                        Xa = Pa.Am = e
                    }
                    );
                    Xa = e;
                    var Ta = this
                      , jb = function() {
                        function e(e) {
                            if (e && e.Image && Pa) {
                                var f = Ta.Fa.Wa.ec;
                                if (f && f.ad[0]) {
                                    var y = Math.max(e.Image.width * AscCommon.PD, 1);
                                    e = Math.max(e.Image.height * AscCommon.PD, 1);
                                    f = 1 / Math.max(y / f.ad[0].eb, e / f.ad[0].fb);
                                    e = Math.max(5, e * f);
                                    Pa.od = Math.max(5, y * f);
                                    Pa.Tc = e
                                }
                            }
                            Ta.Fa.Wa.gg(AscDFH.TTd);
                            Ta.Fa.Wa.nL(Pa);
                            Ta.Fa.Wa.Uda();
                            Ta.Fa.Wa.Sf()
                        }
                        var f = Ta.tt.MK(Xa, 1);
                        null != f ? e(f) : Ta.WZa = function(f) {
                            e(f)
                        }
                    };
                    Ma ? f.AscDesktopEditor ? (e = f.AscDesktopEditor.LocalFileGetImageUrl(Xa),
                    e = mg.T9(e),
                    Ia(e),
                    jb()) : AscCommon.u$(this, [Xa], function(e) {
                        e && e[0] && "error" !== e[0].url && (Ia(e[0].url),
                        jb())
                    }, !1) : jb()
                }
            else
                y.n0(!1)
    }
    ;
    y.prototype.rSg = function(e, f) {
        var y = this.Mca();
        if (y) {
            var Ma = !0;
            if ((f = y.zHb(f)) && (f.Zaa() || f.ARa())) {
                if (c_oAscSdtLevelType.fda === f.uV())
                    Ma = y.Ke(AscCommon.rR, {
                        ea: AscCommon.xaa,
                        Xb: [f],
                        Lu: AscCommon.EQc
                    });
                else if (c_oAscSdtLevelType.Yq === f.uV()) {
                    var Pa = f.bl();
                    Pa && (Ma = y.Ke(AscCommon.rR, {
                        ea: AscCommon.xaa,
                        Xb: [Pa],
                        Lu: AscCommon.hJ
                    }))
                }
                !1 === Ma && (y.gg(AscDFH.$Td),
                f.Zaa() ? f.BTa(e) : f.CTa(e),
                y.Kl(),
                y.Sf())
            }
        }
    }
    ;
    y.prototype.fSg = function(e, f) {
        var y = this.Mca();
        if (y && (f = y.zHb(f)) && (f.Zaa() || f.J7()))
            if (f.n0(!0),
            f.Q0()) {
                var Ma = !1;
                if (c_oAscSdtLevelType.fda === f.uV())
                    Ma = y.Ke(AscCommon.rR, {
                        ea: AscCommon.xaa,
                        Xb: [f],
                        Lu: AscCommon.$ka
                    }, !1, y.LCa());
                else if (c_oAscSdtLevelType.Yq === f.uV()) {
                    var Pa = f.bl();
                    if (Pa) {
                        var Ia = y.lbb();
                        f.Spa();
                        Ma = y.Ke(AscCommon.rR, {
                            ea: AscCommon.xaa,
                            Xb: [Pa],
                            Lu: AscCommon.$ka
                        }, !1, y.LCa());
                        y.e7a(Ia)
                    }
                }
                f.n0(!1);
                Ma || (y.gg(AscDFH.L5d),
                f.k0d(e),
                y.Yc(),
                f.K6b(!0),
                y.Bd(),
                y.Kl(),
                y.Uda(),
                y.Sf())
            } else
                f.n0(!1)
    }
    ;
    y.prototype.qsg = function(e, f) {
        var y = this.Mca();
        if (y) {
            var Ma = !0;
            if ((f = y.zHb(f)) && f.Qja()) {
                if (c_oAscSdtLevelType.fda === f.uV())
                    Ma = y.Ke(AscCommon.rR, {
                        ea: AscCommon.xaa,
                        Xb: [f],
                        Lu: AscCommon.EQc
                    }, !1, y.LCa());
                else if (c_oAscSdtLevelType.Yq === f.uV()) {
                    var Pa = f.bl();
                    Pa && (Ma = y.Ke(AscCommon.rR, {
                        ea: AscCommon.xaa,
                        Xb: [Pa],
                        Lu: AscCommon.hJ
                    }, !1, y.LCa()))
                }
                !1 === Ma && (y.gg(AscDFH.$Td),
                f.xTc(e),
                y.Bd(),
                y.Kl(),
                y.Uda(),
                y.Sf())
            }
        }
    }
    ;
    y.prototype.qSg = function(e, f) {
        var y = this.Mca();
        y && (y = y.zHb(f)) && y.Qja() && y.Q0() && this.qsg(e, f)
    }
    ;
    y.prototype.ESg = function() {
        for (var e = this.Fa && this.Fa.xd && this.Fa.xd.Oac ? this.Fa.xd.Oac.B4 : [], f = 0; f < e.length; f++)
            e[f].y7 = -2;
        this.Fa.oba();
        this.Fa.SAa();
        this.Fa.Er();
        this.Fa.fL()
    }
    ;
    y.prototype.RIf = function(e) {
        this.Fa.Wa.nTf(e)
    }
    ;
    y.prototype.ZIf = function() {
        this.Fa.Wa.$Tc()
    }
    ;
    y.prototype.ASg = function() {
        var e = this.Fa.Wa;
        if (e)
            return e.oCa.R$(!0),
            e.oCa
    }
    ;
    y.prototype.NRg = function() {
        var e = this.Fa.Wa;
        e && e.oCa.R$(!1)
    }
    ;
    y.prototype.eSf = function() {
        this.Oe("asc_onDocumentOutlineUpdate")
    }
    ;
    y.prototype.qXd = function(e) {
        this.Oe("asc_onDocumentOutlineCurrentPosition", e)
    }
    ;
    y.prototype.c_c = function(e) {
        this.Oe("asc_onDocumentOutlineUpdateAdd", e)
    }
    ;
    y.prototype.Vgg = function(e) {
        this.Oe("asc_onDocumentOutlineUpdateChange", e)
    }
    ;
    y.prototype.d_c = function(e) {
        this.Oe("asc_onDocumentOutlineUpdateRemove", e)
    }
    ;
    y.prototype.QQg = function(e, f) {
        var y = AscCommon.Ws.Ab("No table of contents entries found.");
        AscFonts.tp.UTa(e + y, this, function() {
            var y = this.Fa.Wa;
            y && (y = y.M$(),
            y instanceof AscCommonWord.Jpb && y.i_d() ? f && this.rsg(f) : this.Fa.Wa.KDf(e, f))
        })
    }
    ;
    y.prototype.cSg = function(e) {
        var f = this.Fa.Wa;
        if (f) {
            if (!e && (e = f.M$(),
            !e))
                return;
            e instanceof AscCommonWord.Jpb ? this.osg(e.Wi()) : e instanceof AscCommonWord.ANd && this.nsg(e)
        }
    }
    ;
    y.prototype.IRg = function(e) {
        var f = this.Fa.Wa;
        if (f && (e = f.M$(e))) {
            if (e instanceof AscCommonWord.Jpb) {
                var y = e.U7c();
                if (!(y instanceof AscCommonWord.ANd))
                    return y = new Asc.P1c,
                    y.lXf(e),
                    y;
                e = y
            }
            return e instanceof AscCommonWord.ANd ? (y = new Asc.P1c,
            y.mXf(e),
            y.AUf(f.Ug),
            y) : null
        }
    }
    ;
    y.prototype.rsg = function(e) {
        if (e instanceof Asc.P1c) {
            var f = this.Fa.Wa;
            if (f) {
                var y = e.jw;
                if (!y && (y = f.M$(),
                !y))
                    return;
                if (y instanceof AscCommonWord.Jpb) {
                    var Ma = y.U7c();
                    if (!Ma) {
                        f.KDf(null, e, y);
                        return
                    }
                    y = Ma
                }
                if (y) {
                    Ma = f.Ug;
                    var Pa = e.uRc()
                      , Ia = Asc.UU.hM !== Pa && Pa !== Ma.kUc();
                    y.n5a();
                    (Ia ? f.Ke(AscCommon.LG, {
                        ea: AscCommon.iVb,
                        $Ma: [AscCommon.Jnb]
                    }) : f.Ke(AscCommon.LG)) || (f.gg(AscDFH.yRc),
                    Ia && Ma.s0d(Pa),
                    y.LD(e),
                    y.Ge(),
                    f.Bd(),
                    f.Kl(),
                    f.sr(),
                    f.Sf())
                }
            }
        }
    }
    ;
    y.prototype.GSg = function(e, f) {
        var y = this.Fa.Wa;
        if (y) {
            if (!f && (f = y.M$(),
            !f))
                return;
            f instanceof AscCommonWord.Jpb && (f = f.U7c());
            if (f) {
                var Ma = y.lbb();
                f.n5a();
                if (e) {
                    if (!1 === y.Ke(AscCommon.LG)) {
                        y.gg(AscDFH.iUd);
                        e = y.kp(!1, !0);
                        f = 0;
                        for (var Pa = e.length; f < Pa; ++f)
                            for (var Ia = e[f].wWf(AscCommonWord.m7f), Xa = 0, Ta = Ia.length; Xa < Ta; ++Xa)
                                Ia[Xa].Ge();
                        y.e7a(Ma);
                        y.Bd();
                        y.Kl();
                        y.sr();
                        y.Sf()
                    }
                } else
                    !1 === y.Ke(AscCommon.yaa) && (y.gg(AscDFH.iUd),
                    f.Ge(),
                    y.e7a(Ma),
                    y.Bd(),
                    y.Kl(),
                    y.sr(),
                    y.Sf())
            }
        }
    }
    ;
    y.prototype.nRg = function() {
        var e = this.Fa.Wa;
        if (e)
            return e.MZd()
    }
    ;
    y.prototype.FSg = function(e) {
        var f = this.Fa.Wa;
        if (f && (e instanceof AscCommonWord.ANd || e instanceof AscCommonWord.WUc || e instanceof AscCommonWord.vdd))
            if (e instanceof AscCommonWord.WUc || e instanceof AscCommonWord.vdd) {
                var y = e.Xr();
                if (y) {
                    var Ma = y.pU(e);
                    if (-1 !== Ma) {
                        var Pa = y.bl();
                        Pa && !1 === f.Ke(AscCommon.rR, {
                            ea: AscCommon.xaa,
                            Xb: [Pa],
                            Lu: AscCommon.LG
                        }) && (f.gg(AscDFH.yRc),
                        y.Xp(Ma, 1),
                        y.vh(Ma, e instanceof AscCommonWord.WUc ? new AscCommonWord.WUc : new AscCommonWord.vdd(f.VP())),
                        f.Bd(),
                        f.Kl(),
                        f.sr(),
                        f.Sf())
                    }
                }
            } else
                e.n5a(),
                !1 === f.Ke(AscCommon.LG) && (f.gg(AscDFH.yRc),
                e.Ge(),
                f.Bd(),
                f.Kl(),
                f.sr(),
                f.Sf())
    }
    ;
    y.prototype.nsg = function(e) {
        var f = this.Fa.Wa;
        if (e && f)
            if (e instanceof AscCommonWord.WUc || e instanceof AscCommonWord.vdd) {
                var y = e.Xr();
                if (y && (e = y.pU(e),
                -1 !== e)) {
                    var Ma = y.bl();
                    Ma && !1 === f.Ke({
                        ea: AscCommon.xaa,
                        Xb: [Ma],
                        Lu: AscCommon.LG
                    }) && (f.gg(AscDFH.yRc),
                    y.Xp(e, 1),
                    f.Bd(),
                    f.Kl(),
                    f.sr(),
                    f.Sf())
                }
            } else
                e.n5a(),
                !1 === f.Ke(AscCommon.l3) && (f.gg(AscDFH.B5d),
                e.EYf(),
                f.Bd(),
                f.Kl(),
                f.sr(),
                f.Sf())
    }
    ;
    y.prototype.oSg = function(e, f, y) {
        var Ma = this.Fa.Wa;
        Ma && f && (e instanceof AscCommonWord.ANd || e instanceof AscCommonWord.WUc || e instanceof AscCommonWord.vdd) && !(e instanceof AscCommonWord.WUc || e instanceof AscCommonWord.vdd) && (e.n5a(),
        !1 === Ma.Ke(AscCommon.LG) && (Ma.gg(AscDFH.yRc),
        e.LD(f),
        y && e.Ge(),
        Ma.Bd(),
        Ma.Kl(),
        Ma.sr(),
        Ma.Sf()))
    }
    ;
    y.prototype.PQg = function(e) {
        var f = this.Mca();
        f && f.TSf(e)
    }
    ;
    y.prototype.GRg = function() {
        var e = this.Mca();
        return e ? e.VZd() : "="
    }
    ;
    y.prototype.HRg = function() {
        return "#,##0 #,##0.00 $#,##0.00;($#,##0.00) 0 0% 0.00 0.00%".split(" ")
    }
    ;
    y.prototype.URg = function(e) {
        return this.Fa.Wa.cYf(e)
    }
    ;
    y.prototype.ZQg = function(e, f) {
        "string" === typeof f && 0 < f.length && (e += ' \\# "' + f + '"');
        return e
    }
    ;
    y.prototype.NQg = function(e) {
        var f = this.Mca();
        f && f.ISf(e)
    }
    ;
    y.prototype.jRg = function() {
        var e = this.Fa.Wa;
        if (!e)
            return null;
        e = e.mC;
        e.Ge();
        return e
    }
    ;
    y.prototype.ksg = function() {
        this.Oe("asc_onBookmarksUpdate")
    }
    ;
    y.prototype.tRg = function(e) {
        var f = this.Fa.Wa;
        return f && e ? f.Ug.GWf(e) : -1
    }
    ;
    y.prototype.FRg = function() {
        var e = this.Fa.Wa;
        return e ? e.Ug.sWf() : []
    }
    ;
    y.prototype.kSg = function(e) {
        var f = this.Fa.Wa;
        if (f)
            return f.YYf(e)
    }
    ;
    y.prototype.lSg = function(e) {
        var f = this.Fa.Wa;
        if (f)
            return f.ZYf(e)
    }
    ;
    y.prototype.jSg = function(e) {
        var f = this.Fa.Wa;
        if (f)
            return f.XYf(e)
    }
    ;
    y.prototype.iSg = function(e) {
        var f = this.Fa.Wa;
        if (f)
            return f.WYf(e)
    }
    ;
    y.prototype.CRg = function() {
        var e = this.Mca();
        return e ? e.Jq(!1) : null
    }
    ;
    y.prototype.IQg = function() {
        var e = this.Mca();
        if (!e)
            return null;
        e.HSf()
    }
    ;
    y.prototype.J6a = function() {
        return this.Fa.Wa ? this.Fa.Wa.J6a() : null
    }
    ;
    y.prototype.XNc = function(e) {
        return this.Fa.Wa ? this.Fa.Wa.XNc(e) : null
    }
    ;
    y.prototype.hPc = function(e) {
        return this.Fa.Wa ? this.Fa.Wa.hPc(e) : null
    }
    ;
    y.prototype.gbb = function(e) {
        return this.Fa.Wa ? this.Fa.Wa.gbb(e) : null
    }
    ;
    y.prototype.Ntb = function(e) {
        return this.Fa.Wa ? this.Fa.Wa.Ntb(e) : null
    }
    ;
    y.prototype.Pmb = function() {
        return this.Fa.Wa ? this.Fa.Wa.Pmb() : 0
    }
    ;
    y.prototype.p$a = function() {
        return this.Fa.Wa ? this.Fa.Wa.p$a() : null
    }
    ;
    y.prototype.SEb = function() {
        return this.Fa.Wa ? this.Fa.Wa.SEb() : 0
    }
    ;
    y.prototype.xOd = function() {
        this.Fa.Wa && this.Fa.xd.gte()
    }
    ;
    y.prototype.Pia = function(e) {
        return this.Fa.Pia(e)
    }
    ;
    y.prototype.AIa = function(e) {
        return this.Fa.AIa(e)
    }
    ;
    y.prototype.m6a = function(e) {
        return this.Fa.m6a(e)
    }
    ;
    y.prototype.YSd = function(e) {
        var f = this.Fa.Wa;
        return f ? f.ale(e) : []
    }
    ;
    f.asc_docs_api = y;
    f.asc_docs_api.prototype.asc_nativeOpenFile = function(e, y) {
        this.KRb = "";
        this.YW = new AscCommon.QTb;
        this.YW.vw("TM");
        this.YW.fMc("native");
        this.Fa.k7 = !1;
        this.Fa.Gu();
        this.vOd();
        this.DocumentType = 2;
        this.GXf = this.Fa.Wa.nOc();
        dh.DDa(!0);
        var Ma = new AscCommonWord.Y8a(this.Fa.Wa,{
            Ltc: !1,
            bua: 0,
            m3b: 0
        });
        void 0 !== y && (AscCommon.BHa = y);
        Ma.lq(e) ? (dh.DDa(!1),
        this.QOb = 1) : this.Oe("asc_onError", de.pg.cPd, de.Lk.IU);
        !0 === f.NATIVE_EDITOR_ENJINE && void 0 != f["native"] && (AscCommon.BNd.prototype.G7a = function(e) {
            e({
                saveLock: !1
            })
        }
        ,
        AscCommon.BNd.prototype.C8a = function(e, y) {
            f["native"].SaveChanges && f["native"].SaveChanges(e.join('","'), y, e.length)
        }
        );
        void 0 == f.Native && (e = (this.rOc = null == editor.Fa.Wa ? !0 : !editor.Fa.Wa.Qta) ? ji.FD(AscCommon.dFb, AscCommon.g5a) : ji.FD(AscCommon.g5a, AscCommon.dFb),
        this.a_c(e.Mm, e.Lm),
        this.gTc(editor.vTd()),
        void 0 !== this.jJg && (this.jJg(),
        void 0 !== this.Fa.xd.LHg && this.Fa.xd.LHg()))
    }
    ;
    f.asc_docs_api.prototype.asc_nativeCalculateFile = function() {
        if (null != this.Fa.Wa) {
            var e = this.Fa.Wa;
            if (void 0 === f.NATIVE_EDITOR_ENJINE && this.yYc && (this.yYc = !1,
            1 === AscCommon.Kd.haa)) {
                this.xYc = !0;
                AscCommon.Kd.dHb();
                AscCommon.Kd.gPc();
                return
            }
            e.ee();
            e.mtb();
            e.Ie();
            e.$i();
            this.jr = !1
        }
    }
    ;
    f.asc_docs_api.prototype.asc_nativeApplyChanges = function(e) {
        this.QHf(e, new AscCommonWord.DAa(191,255,199));
        AscCommon.Kd.k0c()
    }
    ;
    f.asc_docs_api.prototype.hQc = function(e, f) {
        this.Fa.Wa && (e ? this.Fa.Wa.v7a() : this.Fa.Wa.q$a(f))
    }
    ;
    f.asc_docs_api.prototype.asc_nativeApplyChanges2 = function(e, y) {
        dh.DDa(!0);
        var Ma = new AscCommon.Paa(e,e.length);
        Ma.Ew = null;
        for (var Pa = new AscCommonWord.DAa(191,255,199), Ia = Ma.jb(), Xa = 4, Ta = 0; Ta < Ia && (!0 !== f.NATIVE_EDITOR_ENJINE || !f["native"].CheckNextChange || f["native"].CheckNextChange()); Ta++) {
            var jb = Ma.jb();
            Xa += 4;
            Ma.size = Xa + jb;
            var Va = Ma.cc();
            Va = AscCommon.Fg.cg(Va);
            var cb = Ma.yb
              , sb = Ma.jb();
            Va && ((sb = AscDFH.Ca[sb]) ? (Va = new sb(Va),
            Va.ge(Ma),
            !0 === AscCommon.Kd.aKb(Va, !1) && Va.nh(Pa)) : (AscCommon.Kd.aKb(e, !1),
            Ma.kk(cb),
            Ma.Td(cb)));
            Xa += jb;
            Ma.Td(Xa);
            Ma.size = e.length
        }
        if (y && (AscCommon.Kd.xU = [],
        AscCommon.Kd.$Nc(),
        AscCommon.Kd.cqb(),
        AscCommon.Kd.bPc(),
        !0 === f.NATIVE_EDITOR_ENJINE && f["native"].AddImageInChanges))
            for (e = AscCommon.Kd.TFa,
            y = e.length,
            Ma = 0; Ma < y; Ma++)
                f["native"].AddImageInChanges(e[Ma]);
        dh.DDa(!1)
    }
    ;
    f.asc_docs_api.prototype.asc_nativeGetFile = function() {
        return (new AscCommonWord.Xg(this.Fa.Wa)).KH()
    }
    ;
    f.asc_docs_api.prototype.asc_nativeGetFile2 = function() {
        return (new AscCommonWord.Xg(this.Fa.Wa)).KH(!0, !0)
    }
    ;
    f.asc_docs_api.prototype.F5e = function() {
        var e = new AscCommonWord.Xg(this.Fa.Wa);
        return {
            data: e.KH(!0, !0),
            header: AscCommon.hta.QRa + ";v" + Asc.NTa + ";" + e.memory.ua + ";"
        }
    }
    ;
    f.asc_docs_api.prototype.asc_nativeGetFileData = function() {
        var e = new AscCommonWord.Xg(this.Fa.Wa)
          , y = e.memory;
        e.KH(!0);
        f["native"].Save_End(AscCommon.hta.QRa + ";v" + Asc.NTa + ";" + y.ua + ";", y.ua);
        return y.pp.data
    }
    ;
    f.asc_docs_api.prototype.asc_nativeGetHtml = function() {
        var e = Uc.ruc;
        Uc.ruc = !1;
        this.Fa.Wa.Jg();
        var f = new AscCommon.NTc(this);
        f.Mb();
        f = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body>' + f.lJb() + "</body></html>";
        this.Fa.Wa.Yc();
        Uc.ruc = e;
        return f
    }
    ;
    f.asc_docs_api.prototype.asc_AddHtml = function(y) {
        var Ma = e.getElementById(y);
        (y = f.frames[y]) && null != y.document && null != y.document.body && (Ma.style.display = "block",
        this.Fa.Wa.gg(),
        this.hQc(!0),
        AscCommon.$Nd(this, AscCommon.wt.Xe, y.document.body, Ma),
        this.Fa.Wa.Sf(),
        this.hQc(!1));
        Ma && e.body.removeChild(Ma)
    }
    ;
    f.asc_docs_api.prototype.asc_nativeCalculate = function() {}
    ;
    f.asc_docs_api.prototype.asc_nativePrint = function(e, y, Ma) {
        if (void 0 === e && void 0 === y) {
            if (void 0 !== f.AscDesktopEditor) {
                e = this.Fa.xd;
                Ma && Ma.printOptions && Ma.printOptions.selection && e.vlg();
                y = e.qZc ? e.qZc.sb : e;
                var Pa = Math.min(y.Ah, y.j8);
                f.AscDesktopEditor.Print_Start(this.KEf, Pa, "", e.qZc ? 0 : this.mhf());
                var Ia = new AscCommon.kLb;
                Ia.OOc(AscCommon.$Q.mJ);
                Ia.Uy = new AscCommon.sZ;
                var Xa = this.jr;
                this.jr = !1;
                for (var Ta = 0; Ta < Pa; Ta++)
                    Ia.Memory.kk(0),
                    Ia.Uy.Qsa(),
                    Ma = y.ql[Ta],
                    Ia.dkb(Ma.Fx, Ma.OA),
                    y.Wa.tja(Ta, Ia),
                    Ia.Imb(),
                    f.AscDesktopEditor.Print_Page(Ia.Memory.Saa(), Ma.Fx, Ma.OA);
                this.jr = Xa;
                e.qZc = null;
                f.AscDesktopEditor.Print_End()
            }
        } else
            Ma = this.Fa.xd.ql[y],
            e.dkb(Ma.Fx, Ma.OA),
            this.Fa.Wa.tja(y, e),
            e.Imb()
    }
    ;
    f.asc_docs_api.prototype.asc_nativePrintPagesCount = function() {
        return this.Fa.xd.Ah
    }
    ;
    f.asc_docs_api.prototype.asc_nativeGetPDF = function(e) {
        var y = this.asc_nativePrintPagesCount();
        e && e.printOptions && e.printOptions.onlyFirstPage && (y = 1);
        var Ma = new AscCommon.kLb;
        Ma.OOc(AscCommon.$Q.mJ);
        Ma.Uy = new AscCommon.sZ;
        var Pa = this.jr;
        this.jr = !1;
        for (var Ia = 0; Ia < y; Ia++)
            this.asc_nativePrint(Ma, Ia, e);
        this.jr = Pa;
        f["native"].Save_End("", Ma.Memory.ua);
        return Ma.Memory.data
    }
    ;
    f.asc_docs_api.prototype.Add_Text = function(e) {
        this.Fa.Wa.gLe(e)
    }
    ;
    f.asc_docs_api.prototype.Add_NewParagraph = function() {
        var e = this.Fa.Wa;
        !1 === e.Ke(AscCommon.H5) && (e.gg(AscDFH.qYc),
        e.ay(!0),
        e.Sf())
    }
    ;
    f.asc_docs_api.prototype.Cursor_MoveLeft = function() {
        this.Fa.Wa.vv()
    }
    ;
    f.asc_docs_api.prototype.Cursor_MoveRight = function() {
        this.Fa.Wa.zt()
    }
    ;
    f.asc_docs_api.prototype.Cursor_MoveUp = function() {
        this.Fa.Wa.jH()
    }
    ;
    f.asc_docs_api.prototype.Cursor_MoveDown = function() {
        this.Fa.Wa.iH()
    }
    ;
    f.asc_docs_api.prototype.Get_DocumentRecalcId = function() {
        return this.Fa.Wa.KX
    }
    ;
    f.asc_docs_api.prototype.asc_IsSpellCheckCurrentWord = function() {
        return this.R$c
    }
    ;
    f.asc_docs_api.prototype.asc_putSpellCheckCurrentWord = function(e) {
        this.R$c = e
    }
    ;
    f.asc_docs_api.prototype.asc_setParagraphStylesSizes = function(e, y) {
        f.AscCommonWord && f.AscCommonWord.YP ? (AscCommonWord.YP.dYa = e,
        AscCommonWord.YP.ATa = y) : (AscCommon.hog = e,
        AscCommon.gog = y)
    }
    ;
    y.prototype.fZf = function(e, f) {
        this.Fa.xd && this.Fa.xd.fZf(e, f)
    }
    ;
    y.prototype.hZf = function(e, f) {
        this.Fa.xd && this.Fa.xd.hZf(e, f)
    }
    ;
    y.prototype.dFe = function(e, f, y, Ma) {
        this.Fa.xd && this.Fa.xd.dFe(e, f, y, Ma)
    }
    ;
    y.prototype.iRd = function() {
        this.Fa.Zs && (this.Fa.$Rd(),
        this.Fa.Zs.ORf())
    }
    ;
    y.prototype.ard = function() {
        this.Fa.Zs && this.Fa.$Rd()
    }
    ;
    y.prototype.Fxd = function() {
        return "Arial"
    }
    ;
    y.prototype.Jvc = function() {
        return 11
    }
    ;
    y.prototype.krd = function() {
        return this.Fa && this.Fa.Wa && this.Fa.Wa.HU || null
    }
    ;
    y.prototype.Svc = function() {
        return this.Fa && this.Fa.Wa && this.Fa.Wa.$E
    }
    ;
    y.prototype.Prd = function(e) {
        var f = this.Svc();
        if (f) {
            var y = this.Fa.Wa;
            !1 === y.Ke(AscCommon.qud, null) && (y.gg(AscDFH.ZMf),
            f.G9b(e),
            this.WHa(),
            y.Sf(!0))
        }
    }
    ;
    y.prototype.aVg = function() {
        return null !== this.Fa.Wa ? AscCommon.y6f !== this.Fa.Wa.$m.A4 : !1
    }
    ;
    f.Asc = f.Asc || {};
    Ia.prototype.get_PageWidth = Ia.prototype.l1g;
    Ia.prototype.get_PageHeight = Ia.prototype.j1g;
    Ia.prototype.get_MarginLeft = Ia.prototype.c1g;
    Ia.prototype.get_MarginRight = Ia.prototype.d1g;
    Ia.prototype.get_MarginTop = Ia.prototype.e1g;
    Ia.prototype.get_MarginBottom = Ia.prototype.b1g;
    $a.prototype.get_Type = $a.prototype.AN;
    $a.prototype.put_Type = $a.prototype.hU;
    $a.prototype.get_Position = $a.prototype.obc;
    $a.prototype.put_Position = $a.prototype.dcc;
    $a.prototype.get_DifferentFirst = $a.prototype.J0g;
    $a.prototype.put_DifferentFirst = $a.prototype.q4g;
    $a.prototype.get_DifferentEvenOdd = $a.prototype.I0g;
    $a.prototype.put_DifferentEvenOdd = $a.prototype.p4g;
    $a.prototype.get_LinkToPrevious = $a.prototype.V0g;
    $a.prototype.get_Locked = $a.prototype.XXc;
    $a.prototype.get_StartPageNumber = $a.prototype.z1g;
    $a.prototype.put_StartPageNumber = $a.prototype.g5g;
    f.Asc.CMailMergeSendData = f.Asc.S8g = Va;
    Va.prototype.get_From = Va.prototype.P0g;
    Va.prototype.put_From = Va.prototype.t4g;
    Va.prototype.get_To = Va.prototype.B1g;
    Va.prototype.put_To = Va.prototype.p5g;
    Va.prototype.get_Subject = Va.prototype.A1g;
    Va.prototype.put_Subject = Va.prototype.i5g;
    Va.prototype.get_MailFormat = Va.prototype.Txg;
    Va.prototype.put_MailFormat = Va.prototype.L4g;
    Va.prototype.get_FileName = Va.prototype.O0g;
    Va.prototype.put_FileName = Va.prototype.r4g;
    Va.prototype.get_Message = Va.prototype.g1g;
    Va.prototype.put_Message = Va.prototype.N4g;
    Va.prototype.get_RecordFrom = Va.prototype.Wxg;
    Va.prototype.put_RecordFrom = Va.prototype.V4g;
    Va.prototype.get_RecordTo = Va.prototype.Xxg;
    Va.prototype.put_RecordTo = Va.prototype.W4g;
    Va.prototype.get_RecordCount = Va.prototype.q1g;
    Va.prototype.put_RecordCount = Va.prototype.MDg;
    Va.prototype.get_UserId = Va.prototype.xla;
    Va.prototype.put_UserId = Va.prototype.d4b;
    f.Asc.CAscFootnotePr = f.Asc.tTf = ib;
    ib.prototype.get_Pos = ib.prototype.U5a;
    ib.prototype.put_Pos = ib.prototype.q6a;
    ib.prototype.get_NumStart = ib.prototype.KMf;
    ib.prototype.put_NumStart = ib.prototype.PQf;
    ib.prototype.get_NumFormat = ib.prototype.IMf;
    ib.prototype.put_NumFormat = ib.prototype.NQf;
    ib.prototype.get_NumRestart = ib.prototype.JMf;
    ib.prototype.put_NumRestart = ib.prototype.OQf;
    f.Asc.asc_docs_api = y;
    y.prototype.SetCollaborativeMarksShowType = y.prototype.o0d;
    y.prototype.GetCollaborativeMarksShowType = y.prototype.JZd;
    y.prototype.Clear_CollaborativeMarks = y.prototype.AHa;
    y.prototype.SetLanguage = y.prototype.OPd;
    y.prototype.asc_GetFontThumbnailsPath = y.prototype.UZe;
    y.prototype.TranslateStyleName = y.prototype.ILg;
    y.prototype.CheckChangedDocument = y.prototype.A2c;
    y.prototype.SetUnchangedDocument = y.prototype.pZf;
    y.prototype.SetDocumentModified = y.prototype.qPc;
    y.prototype.isDocumentModified = y.prototype.wof;
    y.prototype.asc_isDocumentCanSave = y.prototype.Ard;
    y.prototype.asc_getCanUndo = y.prototype.l0e;
    y.prototype.asc_getCanRedo = y.prototype.k0e;
    y.prototype.sync_BeginCatchSelectedElements = y.prototype.jXd;
    y.prototype.sync_EndCatchSelectedElements = y.prototype.DLd;
    y.prototype.getSelectedElements = y.prototype.F8f;
    y.prototype.sync_ChangeLastSelectedElement = y.prototype.Kgg;
    y.prototype.asc_getEditorPermissions = y.prototype.o1e;
    y.prototype.asc_setDocInfo = y.prototype.ssc;
    y.prototype.asc_setLocale = y.prototype.yRd;
    y.prototype.asc_getLocale = y.prototype.lQc;
    y.prototype.asc_LoadDocument = y.prototype.frc;
    y.prototype.SetTextBoxInputMode = y.prototype.RGe;
    y.prototype.GetTextBoxInputMode = y.prototype.Dne;
    y.prototype.ChangeReaderMode = y.prototype.dEf;
    y.prototype.SetReaderModeOnly = y.prototype.mLg;
    y.prototype.IncreaseReaderFontSize = y.prototype.jXf;
    y.prototype.DecreaseReaderFontSize = y.prototype.mVf;
    y.prototype.CreateCSS = y.prototype.DEf;
    y.prototype.GetCopyPasteDivId = y.prototype.oJg;
    y.prototype.ContentToHTML = y.prototype.wEf;
    y.prototype.InitEditor = y.prototype.vOd;
    y.prototype.InitViewer = y.prototype.AFf;
    y.prototype.OpenDocument = y.prototype.Kte;
    y.prototype.OpenDocument2 = y.prototype.L_d;
    y.prototype.asc_getDocumentName = y.prototype.l1e;
    y.prototype.asc_getAppProps = y.prototype.krd;
    y.prototype.asc_getCoreProps = y.prototype.R0e;
    y.prototype.asc_setCoreProps = y.prototype.Prd;
    y.prototype.asc_isCompatibilityMode = y.prototype.aVg;
    y.prototype.asc_registerCallback = y.prototype.TZa;
    y.prototype.asc_unregisterCallback = y.prototype.T9e;
    y.prototype.asc_checkNeedCallback = y.prototype.hrc;
    y.prototype.asc_getPropertyEditorShapes = y.prototype.X3e;
    y.prototype.asc_getPropertyEditorTextArts = y.prototype.Y3e;
    y.prototype.get_PropertyThemeColors = y.prototype.p1g;
    y.prototype._coAuthoringSetChange = y.prototype.pVe;
    y.prototype._coAuthoringSetChanges = y.prototype.QHf;
    y.prototype.asc_coAuthoringChatSendMessage = y.prototype.x_e;
    y.prototype.asc_coAuthoringChatGetMessages = y.prototype.w_e;
    y.prototype.asc_coAuthoringGetUsers = y.prototype.y_e;
    y.prototype.asc_coAuthoringDisconnect = y.prototype.irc;
    y.prototype.asc_SpellCheckDisconnect = y.prototype.cJf;
    y.prototype._onUpdateDocumentCanSave = y.prototype.D7a;
    y.prototype.put_FramePr = y.prototype.s4g;
    y.prototype.asyncFontEndLoaded_MathDraw = y.prototype.L2f;
    y.prototype.sendMathTypesToMenu = y.prototype.HZc;
    y.prototype.asyncFontEndLoaded_DropCap = y.prototype.ctg;
    y.prototype.asc_addDropCap = y.prototype.KSg;
    y.prototype.removeDropcap = y.prototype.U5g;
    y.prototype.get_TextProps = y.prototype.E4d;
    y.prototype.GetJSONLogicDocument = y.prototype.uJg;
    y.prototype.get_ContentCount = y.prototype.Sxg;
    y.prototype.select_Element = y.prototype.r6g;
    y.prototype.UpdateTextPr = y.prototype.$Ya;
    y.prototype.UpdateParagraphProp = y.prototype.z7a;
    y.prototype.Undo = y.prototype.Ul;
    y.prototype.Redo = y.prototype.oh;
    y.prototype.Copy = y.prototype.Sa;
    y.prototype.Update_ParaTab = y.prototype.w5a;
    y.prototype.Cut = y.prototype.cVf;
    y.prototype.Paste = y.prototype.dYf;
    y.prototype.Share = y.prototype.wZf;
    y.prototype.asc_Save = y.prototype.tda;
    y.prototype.forceSave = y.prototype.j0a;
    y.prototype.asc_setIsForceSaveOnUserSave = y.prototype.U8e;
    y.prototype.asc_DownloadAs = y.prototype.$qd;
    y.prototype.asc_DownloadAsMailMerge = y.prototype.dRg;
    y.prototype.asc_DownloadOrigin = y.prototype.eRg;
    y.prototype.Resize = y.prototype.jB;
    y.prototype.AddURL = y.prototype.USf;
    y.prototype.Help = y.prototype.fXf;
    y.prototype.asc_setAdvancedOptions = y.prototype.UZa;
    y.prototype.asc_decodeBuffer = y.prototype.dJf;
    y.prototype.SetFontRenderingMode = y.prototype.iFe;
    y.prototype.startGetDocInfo = y.prototype.pgg;
    y.prototype.stopGetDocInfo = y.prototype.sgg;
    y.prototype.sync_DocInfoCallback = y.prototype.P$d;
    y.prototype.sync_GetDocInfoStartCallback = y.prototype.fCf;
    y.prototype.sync_GetDocInfoStopCallback = y.prototype.gCf;
    y.prototype.sync_GetDocInfoEndCallback = y.prototype.mXd;
    y.prototype.sync_CanUndoCallback = y.prototype.eTc;
    y.prototype.sync_CanRedoCallback = y.prototype.dTc;
    y.prototype.can_CopyCut = y.prototype.c4f;
    y.prototype.sync_CanCopyCutCallback = y.prototype.aSf;
    y.prototype.setStartPointHistory = y.prototype.nBf;
    y.prototype.setEndPointHistory = y.prototype.BAf;
    y.prototype.sync_CursorLockCallBack = y.prototype.w7g;
    y.prototype.sync_UndoCallBack = y.prototype.khg;
    y.prototype.sync_RedoCallBack = y.prototype.Xgg;
    y.prototype.sync_CopyCallBack = y.prototype.Mgg;
    y.prototype.sync_CutCallBack = y.prototype.Ngg;
    y.prototype.sync_PasteCallBack = y.prototype.Wgg;
    y.prototype.sync_ShareCallBack = y.prototype.$gg;
    y.prototype.sync_SaveCallBack = y.prototype.Ygg;
    y.prototype.sync_DownloadAsCallBack = y.prototype.Ogg;
    y.prototype.sync_StartAction = y.prototype.$G;
    y.prototype.sync_EndAction = y.prototype.$x;
    y.prototype.sync_AddURLCallback = y.prototype.Hgg;
    y.prototype.sync_ErrorCallback = y.prototype.Pgg;
    y.prototype.sync_HelpCallback = y.prototype.Qgg;
    y.prototype.sync_UpdateZoom = y.prototype.lhg;
    y.prototype.ClearPropObjCallback = y.prototype.MNd;
    y.prototype.CollectHeaders = y.prototype.JUf;
    y.prototype.GetActiveHeader = y.prototype.rWf;
    y.prototype.gotoHeader = y.prototype.u9f;
    y.prototype.sync_ChangeActiveHeaderCallback = y.prototype.Jgg;
    y.prototype.sync_ReturnHeadersCallback = y.prototype.mCf;
    y.prototype.asc_searchEnabled = y.prototype.W7e;
    y.prototype.asc_findText = y.prototype.C_e;
    y.prototype.asc_replaceText = y.prototype.U7e;
    y.prototype.asc_isSelectSearchingResults = y.prototype.cVg;
    y.prototype.sync_ReplaceAllCallback = y.prototype.lCf;
    y.prototype.sync_SearchEndCallback = y.prototype.hTc;
    y.prototype.put_TextPrFontName = y.prototype.Gdg;
    y.prototype.put_TextPrFontSize = y.prototype.Hdg;
    y.prototype.put_TextPrBold = y.prototype.Fdg;
    y.prototype.put_TextPrItalic = y.prototype.Idg;
    y.prototype.put_TextPrUnderline = y.prototype.Ldg;
    y.prototype.put_TextPrStrikeout = y.prototype.Kdg;
    y.prototype.put_TextPrDStrikeout = y.prototype.l5g;
    y.prototype.put_TextPrSpacing = y.prototype.o5g;
    y.prototype.put_TextPrCaps = y.prototype.k5g;
    y.prototype.put_TextPrSmallCaps = y.prototype.n5g;
    y.prototype.put_TextPrPosition = y.prototype.m5g;
    y.prototype.put_TextPrLang = y.prototype.Jdg;
    y.prototype.put_PrLineSpacing = y.prototype.wdg;
    y.prototype.put_LineSpacingBeforeAfter = y.prototype.odg;
    y.prototype.FontSizeIn = y.prototype.dOd;
    y.prototype.FontSizeOut = y.prototype.eOd;
    y.prototype.put_Borders = y.prototype.l4g;
    y.prototype.sync_BoldCallBack = y.prototype.dCf;
    y.prototype.sync_ItalicCallBack = y.prototype.iCf;
    y.prototype.sync_UnderlineCallBack = y.prototype.xCf;
    y.prototype.sync_StrikeoutCallBack = y.prototype.oCf;
    y.prototype.sync_TextPrFontFamilyCallBack = y.prototype.tCf;
    y.prototype.sync_TextPrFontSizeCallBack = y.prototype.uCf;
    y.prototype.sync_PrLineSpacingCallBack = y.prototype.gSf;
    y.prototype.paraApply = y.prototype.Dcg;
    y.prototype.put_PrAlign = y.prototype.sdg;
    y.prototype.put_TextPrBaseline = y.prototype.Edg;
    y.prototype.put_ListType = y.prototype.pdg;
    y.prototype.asc_ContinueNumbering = y.prototype.XQg;
    y.prototype.asc_RestartNumbering = y.prototype.eSg;
    y.prototype.asc_GetCurrentNumberingId = y.prototype.oRg;
    y.prototype.asc_GetCurrentNumberingLvl = y.prototype.pRg;
    y.prototype.asc_GetCalculatedNumberingValue = y.prototype.kRg;
    y.prototype.asc_GetNumberingPr = y.prototype.yRg;
    y.prototype.asc_AddNewNumbering = y.prototype.LQg;
    y.prototype.asc_ChangeNumberingLvl = y.prototype.VQg;
    y.prototype.put_Style = y.prototype.h5g;
    y.prototype.SetDeviceInputHelperId = y.prototype.dZf;
    y.prototype.put_ShowSnapLines = y.prototype.ydg;
    y.prototype.get_ShowSnapLines = y.prototype.f9f;
    y.prototype.put_ShowParaMarks = y.prototype.sHd;
    y.prototype.get_ShowParaMarks = y.prototype.Pyd;
    y.prototype.put_ShowTableEmptyLine = y.prototype.zdg;
    y.prototype.get_ShowTableEmptyLine = y.prototype.g9f;
    y.prototype.put_PageBreak = y.prototype.R4g;
    y.prototype.put_WidowControl = y.prototype.QQf;
    y.prototype.put_KeepLines = y.prototype.LQf;
    y.prototype.put_KeepNext = y.prototype.MQf;
    y.prototype.put_AddSpaceBetweenPrg = y.prototype.k4g;
    y.prototype.put_LineHighLight = y.prototype.D4g;
    y.prototype.put_TextColor = y.prototype.Ddg;
    y.prototype.put_ParagraphShade = y.prototype.U4g;
    y.prototype.put_PrIndent = y.prototype.udg;
    y.prototype.put_ParagraphOutlineLvl = y.prototype.T4g;
    y.prototype.IncreaseIndent = y.prototype.eOb;
    y.prototype.DecreaseIndent = y.prototype.yMb;
    y.prototype.put_PrIndentRight = y.prototype.vdg;
    y.prototype.put_PrFirstLineIndent = y.prototype.tdg;
    y.prototype.put_Margins = y.prototype.M4g;
    y.prototype.getFocusObject = y.prototype.c8f;
    y.prototype.sync_VerticalAlign = y.prototype.yCf;
    y.prototype.sync_PrAlignCallBack = y.prototype.tXd;
    y.prototype.sync_ListType = y.prototype.pXd;
    y.prototype.sync_TextColor = y.prototype.kSf;
    y.prototype.sync_TextHighLight = y.prototype.lSf;
    y.prototype.sync_TextSpacing = y.prototype.wCf;
    y.prototype.sync_TextDStrikeout = y.prototype.qCf;
    y.prototype.sync_TextCaps = y.prototype.pCf;
    y.prototype.sync_TextSmallCaps = y.prototype.vCf;
    y.prototype.sync_TextPosition = y.prototype.sCf;
    y.prototype.sync_TextLangCallBack = y.prototype.rCf;
    y.prototype.sync_ParaStyleName = y.prototype.sXd;
    y.prototype.sync_ParaSpacingLine = y.prototype.rXd;
    y.prototype.sync_PageBreakCallback = y.prototype.fSf;
    y.prototype.sync_WidowControlCallback = y.prototype.GFg;
    y.prototype.sync_KeepNextCallback = y.prototype.BFg;
    y.prototype.sync_KeepLinesCallback = y.prototype.dSf;
    y.prototype.sync_ShowParaMarksCallback = y.prototype.chg;
    y.prototype.sync_SpaceBetweenPrgCallback = y.prototype.dhg;
    y.prototype.sync_PrPropCallback = y.prototype.kCf;
    y.prototype.sync_MathPropCallback = y.prototype.jCf;
    y.prototype.sync_EndAddShape = y.prototype.Ina;
    y.prototype.SetDrawingFreeze = y.prototype.JGf;
    y.prototype.change_PageOrient = y.prototype.tYg;
    y.prototype.get_DocumentOrientation = y.prototype.vTd;
    y.prototype.change_DocSize = y.prototype.sYg;
    y.prototype.get_DocumentWidth = y.prototype.M0g;
    y.prototype.get_DocumentHeight = y.prototype.K0g;
    y.prototype.put_AddPageBreak = y.prototype.xDg;
    y.prototype.put_AddColumnBreak = y.prototype.j4g;
    y.prototype.Update_ParaInd = y.prototype.rQd;
    y.prototype.Internal_Update_Ind_FirstLine = y.prototype.BFf;
    y.prototype.Internal_Update_Ind_Left = y.prototype.CFf;
    y.prototype.Internal_Update_Ind_Right = y.prototype.DFf;
    y.prototype.put_PageNum = y.prototype.S4g;
    y.prototype.put_HeadersAndFootersDistance = y.prototype.v4g;
    y.prototype.HeadersAndFooters_DifferentFirstPage = y.prototype.JJg;
    y.prototype.HeadersAndFooters_DifferentOddandEvenPage = y.prototype.KJg;
    y.prototype.HeadersAndFooters_LinkToPrevious = y.prototype.LJg;
    y.prototype.asc_SetSectionStartPage = y.prototype.zSg;
    y.prototype.sync_DocSizeCallback = y.prototype.a_c;
    y.prototype.sync_PageOrientCallback = y.prototype.gTc;
    y.prototype.sync_HeadersAndFootersPropCallback = y.prototype.Q$d;
    y.prototype.put_Table = y.prototype.Cdg;
    y.prototype.addRowAbove = y.prototype.x1f;
    y.prototype.addRowBelow = y.prototype.y1f;
    y.prototype.addColumnLeft = y.prototype.s1f;
    y.prototype.addColumnRight = y.prototype.t1f;
    y.prototype.remRow = y.prototype.ieg;
    y.prototype.remColumn = y.prototype.heg;
    y.prototype.remTable = y.prototype.jeg;
    y.prototype.selectRow = y.prototype.Jeg;
    y.prototype.selectColumn = y.prototype.Ieg;
    y.prototype.selectCell = y.prototype.GIa;
    y.prototype.selectTable = y.prototype.Keg;
    y.prototype.setColumnWidth = y.prototype.Reg;
    y.prototype.setRowHeight = y.prototype.occ;
    y.prototype.set_TblDistanceFromText = y.prototype.zfg;
    y.prototype.CheckBeforeMergeCells = y.prototype.pUf;
    y.prototype.CheckBeforeSplitCells = y.prototype.qUf;
    y.prototype.MergeCells = y.prototype.d5a;
    y.prototype.SplitCell = y.prototype.DZf;
    y.prototype.asc_DistributeTableCells = y.prototype.m2f;
    y.prototype.asc_RemoveTableCells = y.prototype.bSg;
    y.prototype.widthTable = y.prototype.oig;
    y.prototype.put_CellsMargin = y.prototype.ndg;
    y.prototype.set_TblWrap = y.prototype.Bfg;
    y.prototype.set_TblIndentLeft = y.prototype.Afg;
    y.prototype.set_Borders = y.prototype.rfg;
    y.prototype.set_TableBackground = y.prototype.xfg;
    y.prototype.set_AlignCell = y.prototype.qfg;
    y.prototype.set_TblAlign = y.prototype.yfg;
    y.prototype.set_SpacingBetweenCells = y.prototype.wfg;
    y.prototype.tblApply = y.prototype.qhg;
    y.prototype.sync_AddTableCallback = y.prototype.Ggg;
    y.prototype.sync_AlignCellCallback = y.prototype.Igg;
    y.prototype.sync_TblPropCallback = y.prototype.jTc;
    y.prototype.sync_TblWrapStyleChangedCallback = y.prototype.fhg;
    y.prototype.sync_TblAlignChangedCallback = y.prototype.ehg;
    y.prototype.ChangeImageFromFile = y.prototype.jUf;
    y.prototype.ChangeShapeImageFromFile = y.prototype.lUf;
    y.prototype.AddImage = y.prototype.gbe;
    y.prototype.asc_addImage = y.prototype.Tvb;
    y.prototype.AddImageUrl2 = y.prototype.SGg;
    y.prototype.AddImageUrl = y.prototype.WXd;
    y.prototype.AddImageUrlAction = y.prototype.qNd;
    y.prototype.AddImageToPage = y.prototype.RGg;
    y.prototype.asc_getSelectedDrawingObjectsCount = y.prototype.urd;
    y.prototype.put_ShapesAlign = y.prototype.xdg;
    y.prototype.DistributeHorizontally = y.prototype.AVf;
    y.prototype.DistributeVertically = y.prototype.BVf;
    y.prototype.ImgApply = y.prototype.MOc;
    y.prototype.set_Size = y.prototype.vfg;
    y.prototype.set_ConstProportions = y.prototype.sfg;
    y.prototype.set_WrapStyle = y.prototype.Cfg;
    y.prototype.deleteImage = y.prototype.k6f;
    y.prototype.set_ImgDistanceFromText = y.prototype.tfg;
    y.prototype.set_PositionOnPage = y.prototype.ufg;
    y.prototype.get_OriginalSizeImage = y.prototype.b9f;
    y.prototype.ShapeApply = y.prototype.Stb;
    y.prototype.sync_AddImageCallback = y.prototype.Fgg;
    y.prototype.sync_ImgPropCallback = y.prototype.PMc;
    y.prototype.sync_ImgWrapStyleChangedCallback = y.prototype.x7g;
    y.prototype.sync_ContextMenuCallback = y.prototype.qRa;
    y.prototype.sync_MouseMoveStartCallback = y.prototype.jmb;
    y.prototype.sync_MouseMoveEndCallback = y.prototype.imb;
    y.prototype.sync_MouseMoveCallback = y.prototype.Coa;
    y.prototype.can_AddHyperlink = y.prototype.b4f;
    y.prototype.add_Hyperlink = y.prototype.G1f;
    y.prototype.change_Hyperlink = y.prototype.q4f;
    y.prototype.remove_Hyperlink = y.prototype.oeg;
    y.prototype.asc_GetHyperlinkAnchors = y.prototype.uRg;
    y.prototype.sync_HyperlinkPropCallback = y.prototype.b_c;
    y.prototype.sync_HyperlinkClickCallback = y.prototype.K8a;
    y.prototype.sync_CanAddHyperlinkCallback = y.prototype.kXd;
    y.prototype.sync_DialogAddHyperlink = y.prototype.$Zc;
    y.prototype.sync_DialogAddHyperlink = y.prototype.$Zc;
    y.prototype.sync_SpellCheckCallback = y.prototype.T$d;
    y.prototype.sync_SpellCheckVariantsFound = y.prototype.nCf;
    y.prototype.asc_replaceMisspelledWord = y.prototype.T7e;
    y.prototype.asc_ignoreMisspelledWord = y.prototype.y5e;
    y.prototype.asc_spellCheckAddToDictionary = y.prototype.S9e;
    y.prototype.asc_spellCheckClearDictionary = y.prototype.zRd;
    y.prototype.asc_setDefaultLanguage = y.prototype.t8e;
    y.prototype.asc_getDefaultLanguage = y.prototype.x2f;
    y.prototype.asc_getKeyboardLanguage = y.prototype.sRd;
    y.prototype.asc_setSpellCheck = y.prototype.I2f;
    y.prototype.asc_showComments = y.prototype.Q9e;
    y.prototype.asc_hideComments = y.prototype.zrd;
    y.prototype.asc_addComment = y.prototype.H1d;
    y.prototype.asc_removeComment = y.prototype.S7e;
    y.prototype.asc_changeComment = y.prototype.u_e;
    y.prototype.asc_selectComment = y.prototype.Nrd;
    y.prototype.asc_showComment = y.prototype.Vrd;
    y.prototype.asc_GetCommentsReportByAuthors = y.prototype.$If;
    y.prototype.can_AddQuotedComment = y.prototype.PJf;
    y.prototype.sync_RemoveComment = y.prototype.y5b;
    y.prototype.sync_AddComment = y.prototype.IIa;
    y.prototype.sync_ShowComment = y.prototype.Dcc;
    y.prototype.sync_HideComment = y.prototype.JUa;
    y.prototype.sync_UpdateCommentPosition = y.prototype.uXd;
    y.prototype.sync_ChangeCommentData = y.prototype.fTc;
    y.prototype.sync_LockComment = y.prototype.R$d;
    y.prototype.sync_UnLockComment = y.prototype.W$d;
    y.prototype.asc_RemoveAllComments = y.prototype.brd;
    y.prototype.sync_LockHeaderFooters = y.prototype.Tgg;
    y.prototype.sync_LockDocumentProps = y.prototype.Rgg;
    y.prototype.sync_UnLockHeaderFooters = y.prototype.jhg;
    y.prototype.sync_UnLockDocumentProps = y.prototype.hhg;
    y.prototype.sync_CollaborativeChanges = y.prototype.eCf;
    y.prototype.sync_LockDocumentSchema = y.prototype.Sgg;
    y.prototype.sync_UnLockDocumentSchema = y.prototype.ihg;
    y.prototype.zoomIn = y.prototype.xig;
    y.prototype.zoomOut = y.prototype.yig;
    y.prototype.zoomFitToPage = y.prototype.DDf;
    y.prototype.zoomFitToWidth = y.prototype.EDf;
    y.prototype.zoomCustomMode = y.prototype.CDf;
    y.prototype.zoom100 = y.prototype.wig;
    y.prototype.zoom = y.prototype.zoom;
    y.prototype.goToPage = y.prototype.ePa;
    y.prototype.getCountPages = y.prototype.ihf;
    y.prototype.getCurrentPage = y.prototype.mhf;
    y.prototype.sync_countPagesCallback = y.prototype.vXd;
    y.prototype.sync_currentPageCallback = y.prototype.Ecc;
    y.prototype.asc_enableKeyEvents = y.prototype.w9;
    y.prototype.GenerateStyles = y.prototype.B$a;
    y.prototype.asyncFontsDocumentEndLoaded = y.prototype.BRd;
    y.prototype.CreateFontsCharMap = y.prototype.YHg;
    y.prototype.sync_SendThemeColors = y.prototype.S$d;
    y.prototype.ChangeColorScheme = y.prototype.iUf;
    y.prototype.asc_ChangeColorSchemeByIdx = y.prototype.PZe;
    y.prototype.UpdateInterfaceState = y.prototype.WHa;
    y.prototype.asyncFontEndLoaded = y.prototype.ARd;
    y.prototype.asyncImageEndLoaded = y.prototype.Z$;
    y.prototype.asyncImageEndLoadedBackground = y.prototype.xsc;
    y.prototype.IsAsyncOpenDocumentImages = y.prototype.zOd;
    y.prototype.pre_Paste = y.prototype.DN;
    y.prototype.pre_Save = y.prototype.I9d;
    y.prototype.SyncLoadImages = y.prototype.zLg;
    y.prototype.SyncLoadImages_callback = y.prototype.fog;
    y.prototype.initEvents2MobileAdvances = y.prototype.JRc;
    y.prototype.ViewScrollToX = y.prototype.J_f;
    y.prototype.ViewScrollToY = y.prototype.K_f;
    y.prototype.GetDocWidthPx = y.prototype.CWf;
    y.prototype.GetDocHeightPx = y.prototype.BWf;
    y.prototype.ClearSearch = y.prototype.HUf;
    y.prototype.GetCurrentVisiblePage = y.prototype.jOd;
    y.prototype.asc_setAutoSaveGap = y.prototype.Z7e;
    y.prototype.asc_SetDocumentPlaceChangedEnabled = y.prototype.d_e;
    y.prototype.asc_SetViewRulers = y.prototype.h_e;
    y.prototype.asc_SetViewRulersChange = y.prototype.q2f;
    y.prototype.asc_GetViewRulers = y.prototype.o2f;
    y.prototype.asc_SetDocumentUnits = y.prototype.e_e;
    y.prototype.GoToHeader = y.prototype.aXf;
    y.prototype.GoToFooter = y.prototype.IJg;
    y.prototype.ExitHeader_Footer = y.prototype.TVf;
    y.prototype.GetCurrentPixOffsetY = y.prototype.zWf;
    y.prototype.SetPaintFormat = y.prototype.lZf;
    y.prototype.ChangeShapeType = y.prototype.mUf;
    y.prototype.sync_PaintFormatCallback = y.prototype.Ccc;
    y.prototype.SetMarkerFormat = y.prototype.kLg;
    y.prototype.sync_MarkerFormatCallback = y.prototype.Bcc;
    y.prototype.StartAddShape = y.prototype.xIe;
    y.prototype.AddShapeOnCurrentPage = y.prototype.qbe;
    y.prototype.AddTextArt = y.prototype.RS;
    y.prototype.asc_canEditCrop = y.prototype.erd;
    y.prototype.asc_startEditCrop = y.prototype.Wrd;
    y.prototype.asc_endEditCrop = y.prototype.jrd;
    y.prototype.asc_cropFit = y.prototype.hrd;
    y.prototype.asc_cropFill = y.prototype.grd;
    y.prototype.asc_GetWatermarkProps = y.prototype.JRg;
    y.prototype.asc_SetWatermarkProps = y.prototype.ssg;
    y.prototype.asc_WatermarkRemove = y.prototype.HSg;
    y.prototype.sync_StartAddShapeCallback = y.prototype.iTc;
    y.prototype.CanGroup = y.prototype.jfe;
    y.prototype.CanUnGroup = y.prototype.lfe;
    y.prototype.CanChangeWrapPolygon = y.prototype.hfe;
    y.prototype.StartChangeWrapPolygon = y.prototype.AIe;
    y.prototype.ClearFormating = y.prototype.GUf;
    y.prototype.GetSectionInfo = y.prototype.yJg;
    y.prototype.add_SectionBreak = y.prototype.cQg;
    y.prototype.asc_setViewMode = y.prototype.VZa;
    y.prototype.asc_setRestriction = y.prototype.z9e;
    y.prototype.OnMouseUp = y.prototype.IZ;
    y.prototype.asyncImageEndLoaded2 = y.prototype.WZa;
    y.prototype.SetDrawImagePlaceParagraph = y.prototype.gZf;
    y.prototype.asc_getMasterCommentId = y.prototype.p3e;
    y.prototype.asc_getAnchorPosition = y.prototype.H_e;
    y.prototype.asc_getChartObject = y.prototype.t0e;
    y.prototype.asc_addChartDrawingObject = y.prototype.n_e;
    y.prototype.asc_doubleClickOnChart = y.prototype.t2f;
    y.prototype.asc_onCloseChartFrame = y.prototype.Orc;
    y.prototype.asc_editChartDrawingObject = y.prototype.z_e;
    y.prototype.asc_getChartPreviews = y.prototype.u0e;
    y.prototype.asc_getTextArtPreviews = y.prototype.V4e;
    y.prototype.sync_closeChartEditor = y.prototype.ACf;
    y.prototype.asc_setDrawCollaborationMarks = y.prototype.e2d;
    y.prototype.asc_AddMath = y.prototype.Qqd;
    y.prototype.asc_AddMath2 = y.prototype.Rqd;
    y.prototype.asc_AddPageCount = y.prototype.OQg;
    y.prototype.asc_StartMailMerge = y.prototype.BSg;
    y.prototype.asc_StartMailMergeByList = y.prototype.r2f;
    y.prototype.asc_GetReceptionsCount = y.prototype.ARg;
    y.prototype.asc_GetMailMergeFieldsNameList = y.prototype.vRg;
    y.prototype.asc_AddMailMergeField = y.prototype.KQg;
    y.prototype.asc_SetHighlightMailMergeFields = y.prototype.wSg;
    y.prototype.asc_PreviewMailMergeResult = y.prototype.WRg;
    y.prototype.asc_EndPreviewMailMergeResult = y.prototype.fRg;
    y.prototype.sync_StartMailMerge = y.prototype.jSf;
    y.prototype.sync_PreviewMailMergeResult = y.prototype.hSf;
    y.prototype.sync_EndPreviewMailMergeResult = y.prototype.bSf;
    y.prototype.sync_HighlightMailMergeFields = y.prototype.oXd;
    y.prototype.asc_getMailMergeData = y.prototype.kUg;
    y.prototype.asc_setMailMergeData = y.prototype.tWg;
    y.prototype.asc_sendMailMergeData = y.prototype.DVg;
    y.prototype.asc_GetMailMergeFiledValue = y.prototype.wRg;
    y.prototype.asc_GetStyleFromFormatting = y.prototype.DRg;
    y.prototype.asc_AddNewStyle = y.prototype.MQg;
    y.prototype.asc_RemoveStyle = y.prototype.aSg;
    y.prototype.asc_RemoveAllCustomStyles = y.prototype.ZRg;
    y.prototype.asc_IsStyleDefault = y.prototype.SRg;
    y.prototype.asc_IsDefaultStyleChanged = y.prototype.RRg;
    y.prototype.asc_GetStyleNameById = y.prototype.ERg;
    y.prototype.asc_SetTrackRevisions = y.prototype.bJf;
    y.prototype.asc_IsTrackRevisions = y.prototype.TRg;
    y.prototype.sync_BeginCatchRevisionsChanges = y.prototype.iXd;
    y.prototype.sync_EndCatchRevisionsChanges = y.prototype.lXd;
    y.prototype.asc_GetRevisionsChangesStack = y.prototype.VZe;
    y.prototype.sync_AddRevisionsChange = y.prototype.$Rf;
    y.prototype.asc_AcceptChanges = y.prototype.HQg;
    y.prototype.asc_RejectChanges = y.prototype.YRg;
    y.prototype.asc_HaveRevisionsChanges = y.prototype.jsg;
    y.prototype.asc_HaveNewRevisionsChanges = y.prototype.MRg;
    y.prototype.asc_GetNextRevisionsChange = y.prototype.xRg;
    y.prototype.asc_GetPrevRevisionsChange = y.prototype.zRg;
    y.prototype.sync_UpdateRevisionsChangesPosition = y.prototype.mSf;
    y.prototype.asc_AcceptAllChanges = y.prototype.GQg;
    y.prototype.asc_RejectAllChanges = y.prototype.XRg;
    y.prototype.asc_GetTrackRevisionsReportByAuthors = y.prototype.aJf;
    y.prototype.asc_FollowRevisionMove = y.prototype.hRg;
    y.prototype.asc_stopSaving = y.prototype.k2d;
    y.prototype.asc_continueSaving = y.prototype.K1d;
    y.prototype.asc_undoAllChanges = y.prototype.l2d;
    y.prototype.asc_CloseFile = y.prototype.QZe;
    y.prototype.asc_SetFastCollaborative = y.prototype.f_e;
    y.prototype.asc_isOffline = y.prototype.B5e;
    y.prototype.asc_getUrlType = y.prototype.b2d;
    y.prototype.asc_getSessionToken = y.prototype.wrd;
    y.prototype.asc_setInterfaceDrawImagePlaceShape = y.prototype.S8e;
    y.prototype.asc_pluginsRegister = y.prototype.Crd;
    y.prototype.asc_pluginRun = y.prototype.zFb;
    y.prototype.asc_pluginStop = y.prototype.J5e;
    y.prototype.asc_pluginResize = y.prototype.Qrc;
    y.prototype.asc_pluginButtonClick = y.prototype.Prc;
    y.prototype.asc_pluginEnableMouseEvents = y.prototype.I5e;
    y.prototype.asc_nativeInitBuilder = y.prototype.G5e;
    y.prototype.asc_SetSilentMode = y.prototype.hQc;
    y.prototype.asc_startEditCurrentOleObject = y.prototype.Xrd;
    y.prototype.asc_InputClearKeyboardElement = y.prototype.XZe;
    y.prototype.asc_SpecialPaste = y.prototype.j_e;
    y.prototype.SetDrawImagePlaceContents = y.prototype.fZf;
    y.prototype.SetDrawImagePreviewMargins = y.prototype.hZf;
    y.prototype.SetDrawImagePreviewBullet = y.prototype.dFe;
    y.prototype.asc_RemoveContentControl = y.prototype.osg;
    y.prototype.asc_RemoveContentControlWrapper = y.prototype.psg;
    y.prototype.asc_SetContentControlProperties = y.prototype.sSg;
    y.prototype.asc_IsContentControl = y.prototype.PRg;
    y.prototype.asc_GetContentControlProperties = y.prototype.hsg;
    y.prototype.asc_GetCurrentContentControl = y.prototype.isg;
    y.prototype.asc_UncheckContentControlButtons = y.prototype.ESg;
    y.prototype.asc_SetGlobalContentControlHighlightColor = y.prototype.uSg;
    y.prototype.asc_GetGlobalContentControlHighlightColor = y.prototype.rRg;
    y.prototype.asc_SetGlobalContentControlShowHighlight = y.prototype.vSg;
    y.prototype.asc_GetGlobalContentControlShowHighlight = y.prototype.sRg;
    y.prototype.asc_SetContentControlCheckBoxPr = y.prototype.pSg;
    y.prototype.asc_SetContentControlPictureUrl = y.prototype.p2f;
    y.prototype.asc_SetContentControlListPr = y.prototype.rSg;
    y.prototype.asc_SelectContentControlListItem = y.prototype.fSg;
    y.prototype.asc_SetContentControlDatePickerPr = y.prototype.qsg;
    y.prototype.asc_SetContentControlDatePickerDate = y.prototype.qSg;
    y.prototype.asc_BeginViewModeInReview = y.prototype.RIf;
    y.prototype.asc_EndViewModeInReview = y.prototype.ZIf;
    y.prototype.asc_ShowDocumentOutline = y.prototype.ASg;
    y.prototype.asc_HideDocumentOutline = y.prototype.NRg;
    y.prototype.sync_OnDocumentOutlineUpdate = y.prototype.eSf;
    y.prototype.sync_OnDocumentOutlineCurrentPosition = y.prototype.qXd;
    y.prototype.asc_AddTableOfContents = y.prototype.QQg;
    y.prototype.asc_RemoveTableOfContents = y.prototype.cSg;
    y.prototype.asc_GetTableOfContentsPr = y.prototype.IRg;
    y.prototype.asc_SetTableOfContentsPr = y.prototype.rsg;
    y.prototype.asc_UpdateTableOfContents = y.prototype.GSg;
    y.prototype.asc_GetCurrentComplexField = y.prototype.nRg;
    y.prototype.asc_UpdateComplexField = y.prototype.FSg;
    y.prototype.asc_RemoveComplexField = y.prototype.nsg;
    y.prototype.asc_SetComplexFieldPr = y.prototype.oSg;
    y.prototype.asc_AddTableFormula = y.prototype.PQg;
    y.prototype.asc_GetTableFormula = y.prototype.GRg;
    y.prototype.asc_GetTableFormulaFormats = y.prototype.HRg;
    y.prototype.asc_ParseTableFormulaInstrLine = y.prototype.URg;
    y.prototype.asc_CreateInstructionLine = y.prototype.ZQg;
    y.prototype.asc_AddObjectCaption = y.prototype.NQg;
    y.prototype.asc_GetBookmarksManager = y.prototype.jRg;
    y.prototype.asc_OnBookmarksUpdate = y.prototype.ksg;
    y.prototype.asc_GetHeadingLevel = y.prototype.tRg;
    y.prototype.asc_GetStylesArray = y.prototype.FRg;
    y.prototype.asc_SetAutomaticBulletedLists = y.prototype.kSg;
    y.prototype.asc_SetAutomaticNumberedLists = y.prototype.lSg;
    y.prototype.asc_SetAutoCorrectSmartQuotes = y.prototype.jSg;
    y.prototype.asc_SetAutoCorrectHyphensWithDash = y.prototype.iSg;
    y.prototype.asc_GetSelectedText = y.prototype.CRg;
    y.prototype.asc_AddBlankPage = y.prototype.IQg;
    y.prototype.sendEvent = y.prototype.Oe;
    y.prototype.SetTableDrawMode = y.prototype.aid;
    y.prototype.SetTableEraseMode = y.prototype.LGe;
    y.prototype.asc_GetDefaultTableStyles = y.prototype.n2f;
    y.prototype.asc_Remove = y.prototype.ZZe;
    y.prototype.asc_OnHideContextMenu = y.prototype.iRd;
    y.prototype.asc_OnShowContextMenu = y.prototype.ard;
    y.prototype.asc_addSignatureLine = y.prototype.grc;
    y.prototype.asc_CallSignatureDblClickEvent = y.prototype.Zqd;
    y.prototype.asc_getRequestSignatures = y.prototype.c4e;
    y.prototype.asc_AddSignatureLine2 = y.prototype.IZe;
    y.prototype.asc_MoveCursorToSignature = y.prototype.hRd;
    y.prototype.asc_Sign = y.prototype.i_e;
    y.prototype.asc_RequestSign = y.prototype.b_e;
    y.prototype.asc_ViewCertificate = y.prototype.l_e;
    y.prototype.asc_SelectCertificate = y.prototype.c_e;
    y.prototype.asc_GetDefaultCertificate = y.prototype.TZe;
    y.prototype.asc_getSignatures = y.prototype.w4e;
    y.prototype.asc_isSignaturesSupport = y.prototype.D5e;
    y.prototype.asc_isProtectionSupport = y.prototype.C5e;
    y.prototype.asc_RemoveSignature = y.prototype.a_e;
    y.prototype.asc_RemoveAllSignatures = y.prototype.$Ze;
    y.prototype.asc_gotoSignature = y.prototype.x5e;
    y.prototype.asc_getSignatureSetup = y.prototype.v4e;
    y.prototype.asc_setCurrentPassword = y.prototype.q8e;
    y.prototype.asc_resetPassword = y.prototype.V7e;
    Ab.prototype.get_PageCount = Ab.prototype.c9f;
    Ab.prototype.put_PageCount = Ab.prototype.qdg;
    Ab.prototype.get_WordsCount = Ab.prototype.k9f;
    Ab.prototype.put_WordsCount = Ab.prototype.Mdg;
    Ab.prototype.get_ParagraphCount = Ab.prototype.d9f;
    Ab.prototype.put_ParagraphCount = Ab.prototype.rdg;
    Ab.prototype.get_SymbolsCount = Ab.prototype.h9f;
    Ab.prototype.put_SymbolsCount = Ab.prototype.Adg;
    Ab.prototype.get_SymbolsWSCount = Ab.prototype.i9f;
    Ab.prototype.put_SymbolsWSCount = Ab.prototype.Bdg;
    Sb.prototype.get_Type = Sb.prototype.AN;
    Sb.prototype.get_X = Sb.prototype.rBa;
    Sb.prototype.get_Y = Sb.prototype.sBa;
    Sb.prototype.get_PageNum = Sb.prototype.k1g;
    Sb.prototype.is_Header = Sb.prototype.A2g;
    f.Asc.asc_CCommentDataWord = kb;
    kb.prototype.asc_getText = kb.prototype.Oka;
    kb.prototype.asc_putText = kb.prototype.J7b;
    kb.prototype.asc_getTime = kb.prototype.rac;
    kb.prototype.asc_putTime = kb.prototype.uac;
    kb.prototype.asc_getOnlyOfficeTime = kb.prototype.YTb;
    kb.prototype.asc_putOnlyOfficeTime = kb.prototype.esc;
    kb.prototype.asc_getUserId = kb.prototype.vJa;
    kb.prototype.asc_putUserId = kb.prototype.vac;
    kb.prototype.asc_getProviderId = kb.prototype.srd;
    kb.prototype.asc_putProviderId = kb.prototype.c2d;
    kb.prototype.asc_getUserName = kb.prototype.YAa;
    kb.prototype.asc_putUserName = kb.prototype.K7b;
    kb.prototype.asc_getInitials = kb.prototype.z2f;
    kb.prototype.asc_putInitials = kb.prototype.sVg;
    kb.prototype.asc_getQuoteText = kb.prototype.oac;
    kb.prototype.asc_putQuoteText = kb.prototype.qQc;
    kb.prototype.asc_getSolved = kb.prototype.yFb;
    kb.prototype.asc_putSolved = kb.prototype.tac;
    kb.prototype.asc_getGuid = kb.prototype.ITa;
    kb.prototype.asc_putGuid = kb.prototype.dUb;
    kb.prototype.asc_getReply = kb.prototype.sWc;
    kb.prototype.asc_addReply = kb.prototype.kac;
    kb.prototype.asc_getRepliesCount = kb.prototype.rWc;
    kb.prototype.asc_getDocumentFlag = kb.prototype.rnb;
    kb.prototype.asc_putDocumentFlag = kb.prototype.sac;
    AscCommon.Ebh = function() {
        function e(e) {
            e = e.m7;
            if (e.DU && 65535 != e.DU.version) {
                var f = 0 != (e.DU.RSd & 128);
                f && e.height != e.DU.gcc - e.DU.BLc + e.DU.Nzf && (console.log("[" + e.g7 + "] typo"),
                console.log(e.T7 + ", " + e.W_ + ", " + e.height),
                console.log(e.DU.gcc + ", " + e.DU.BLc + ", " + (e.DU.gcc - e.DU.BLc + e.DU.Nzf)));
                f || e.height == e.DU.IXd + e.DU.JXd || (console.log("[" + e.g7 + "] win"),
                console.log(e.T7 + ", " + e.W_ + ", " + e.height),
                console.log(e.DU.IXd + ", " + e.DU.JXd + ", " + (e.DU.IXd + e.DU.JXd)))
            }
        }
        for (var f = 0, y = 0, Ma = [], Pa = 0; Pa < AscFonts.o0a.length; Pa++)
            Ma.push(new AscFonts.dja(AscFonts.o0a[Pa].Ja,0,"",0,null));
        console.log("start...");
        editor.Aia = function() {
            y = setInterval(function() {
                if (f >= AscFonts.o0a.length)
                    clearInterval(y),
                    console.log("end");
                else {
                    var Ma = AscFonts.o0a[f++];
                    if (-1 != Ma.NB) {
                        var Pa = AscCommon.TK.bUa[Ma.NB];
                        Pa = AscCommon.gP.FH(Pa, Ma.Jia, 12, !1, !1, !1, !1, !0);
                        e(Pa, "regular")
                    }
                    -1 != Ma.KB && (Pa = AscCommon.TK.bUa[Ma.KB],
                    Pa = AscCommon.gP.FH(Pa, Ma.Gia, 12, !0, !1, !1, !1, !0),
                    e(Pa, "bold"));
                    -1 != Ma.MB && (Pa = AscCommon.TK.bUa[Ma.MB],
                    Pa = AscCommon.gP.FH(Pa, Ma.Iia, 12, !1, !0, !1, !1, !0),
                    e(Pa, "italic"));
                    -1 != Ma.LB && (Pa = AscCommon.TK.bUa[Ma.LB],
                    Pa = AscCommon.gP.FH(Pa, Ma.Hia, 12, !0, !0, !1, !1, !0),
                    e(Pa, "bold italic"))
                }
            }, 10)
        }
        ;
        AscCommon.TK.JRa(Ma)
    }
}
)(window, window.document);
"use strict";
(function(f, e) {
    f.asc_docs_api.prototype.pluginMethod_OpenFile = function(e, f) {
        this.QZe();
        this.J4.p_d = !0;
        this.L_d(this.KEf, e);
        f && this.mSg(f);
        this.fKb = Asc.FIb.SUc
    }
    ;
    f.asc_docs_api.prototype.pluginMethod_GetFields = function() {
        return this.iRg()
    }
    ;
    f.asc_docs_api.prototype.pluginMethod_InsertAndReplaceContentControls = function(e) {
        return (new AscCommon.ajg(this,e)).start()
    }
    ;
    f.asc_docs_api.prototype.pluginMethod_RemoveContentControls = function(e) {
        return (new AscCommon.ajg(this,e)).delete()
    }
    ;
    f.asc_docs_api.prototype.pluginMethod_GetAllContentControls = function() {
        for (var e = this.Fa.Wa.ew(), f = [], Va, ib = 0; ib < e.length; ib++)
            Va = e[ib].F$a(),
            f.push({
                Tag: Va.ey,
                Id: Va.Ia,
                Lock: Va.Jf,
                InternalId: Va.ALa
            });
        return f
    }
    ;
    f.asc_docs_api.prototype.pluginMethod_AddContentControl = function(f, $a) {
        if ($a) {
            var Ia = new AscCommon.nYd;
            Ia.Ia = $a.Id;
            Ia.ey = $a.Tag;
            Ia.Jf = $a.Lock;
            Ia.OB = $a.Alias;
            e !== $a.Appearance && (Ia.JB = $a.Appearance);
            e !== $a.Color && (Ia.va = new Asc.fta($a.Color.R,$a.Color.G,$a.Color.B))
        }
        return (f = this.I$g(f, Ia)) ? {
            Tag: f.ey,
            Id: f.Ia,
            Lock: f.Jf,
            InternalId: f.ALa
        } : e
    }
    ;
    f.asc_docs_api.prototype.pluginMethod_RemoveContentControl = function(e) {
        return this.psg(e)
    }
    ;
    f.asc_docs_api.prototype.pluginMethod_GetCurrentContentControl = function() {
        return this.isg()
    }
    ;
    f.asc_docs_api.prototype.pluginMethod_GetCurrentContentControlPr = function(e) {
        var f = this.Mca()
          , Ia = this.hsg();
        if (!Ia)
            return null;
        if (f && Ia.kia) {
            var ib = f.lbb();
            Ia.kia.Spa()
        }
        Ia && Ia.kia && delete Ia.kia;
        Ia.Tag = Ia.ey;
        Ia.Id = Ia.Ia;
        Ia.Lock = Ia.Jf;
        Ia.InternalId = Ia.ALa;
        Ia.Appearance = Ia.JB;
        if (e) {
            var y = {
                data: "",
                Bua: function(e, f) {
                    this.data = f
                }
            }
              , Ab = 1;
            e == Asc.n$b.html && (Ab = 2);
            this.F7b(y, Ab);
            Ia.content = y.data
        }
        ib && (f.e7a(ib),
        f.sr());
        return Ia
    }
    ;
    f.asc_docs_api.prototype.pluginMethod_SelectContentControl = function(e) {
        var f = this.Mca();
        f && f.Spa(e)
    }
    ;
    f.asc_docs_api.prototype.pluginMethod_MoveCursorToContentControl = function(e, f) {
        var Ia = this.Mca();
        Ia && Ia.K6b(e, f)
    }
    ;
    f.asc_docs_api.prototype.pluginMethod_GetSelectedText = function() {
        var e = this.Mca();
        if (e)
            return e.Jq(!1, {
                Pta: !0,
                aPc: !0
            })
    }
    ;
    f.asc_docs_api.prototype.pluginMethod_RemoveSelectedContent = function() {
        var e = this.Mca();
        e && e.lg() && !1 === e.Ke(AscCommon.l3, null, !0, e.LCa()) && (e.gg(AscDFH.oYc),
        e.ng(-1, !0),
        e.Sf())
    }
    ;
    f.asc_docs_api.prototype.pluginMethod_AddComment = function(e, f) {
        var Ia = new asc_CCommentDataWord;
        e && Ia.J7b(e);
        f && Ia.K7b(f);
        this.H1d(Ia)
    }
    ;
    f.asc_docs_api.prototype.pluginMethod_MoveCursorToStart = function(e) {
        var f = this.Mca();
        f && (e ? f.XEb() : f.ee(!1))
    }
    ;
    f.asc_docs_api.prototype.pluginMethod_MoveCursorToEnd = function(e) {
        var f = this.Mca();
        f && (e && f.XEb(),
        f.Uh(!1))
    }
    ;
    f.asc_docs_api.prototype.pluginMethod_SearchAndReplace = function(f) {
        var Ia = f.replaceString;
        this.Fa.Wa.az(f.searchString, {
            ULa: e !== f.matchCase ? f.jbg : !0
        }) && this.Fa.Wa.lPc(Ia, !0, null, !1)
    }
    ;
    f.asc_docs_api.prototype.pluginMethod_GetFileHTML = function() {
        return this.wEf(!0)
    }
}
)(window);

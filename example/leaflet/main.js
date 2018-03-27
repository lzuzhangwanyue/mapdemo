/*
 Bootstrap v3.3.5 (http://getbootstrap.com)
 Copyright 2011-2015 Twitter, Inc.
 Licensed under the MIT license
*/
var $jscomp = {
    scope: {}
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty: function(d, h, l) {
    if (l.get || l.set) throw new TypeError("ES3 does not support getters and setters.");
    d != Array.prototype && d != Object.prototype && (d[h] = l.value)
};
$jscomp.getGlobal = function(d) {
    return "undefined" != typeof window && window === d ? d: "undefined" != typeof global && null != global ? global: d
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function(d) {
    return $jscomp.SYMBOL_PREFIX + (d || "") + $jscomp.symbolCounter_++
};
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var d = $jscomp.global.Symbol.iterator;
    d || (d = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[d] && $jscomp.defineProperty(Array.prototype, d, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function() {}
};
$jscomp.arrayIterator = function(d) {
    var h = 0;
    return $jscomp.iteratorPrototype(function() {
        return h < d.length ? {
            done: !1,
            value: d[h++]
        }: {
            done: !0
        }
    })
};
$jscomp.iteratorPrototype = function(d) {
    $jscomp.initSymbolIterator();
    d = {
        next: d
    };
    d[$jscomp.global.Symbol.iterator] = function() {
        return this
    };
    return d
};
$jscomp.array = $jscomp.array || {};
$jscomp.iteratorFromArray = function(d, h) {
    $jscomp.initSymbolIterator();
    d instanceof String && (d += "");
    var l = 0,
    g = {
        next: function() {
            if (l < d.length) {
                var b = l++;
                return {
                    value: h(b, d[b]),
                    done: !1
                }
            }
            g.next = function() {
                return {
                    done: !0,
                    value: void 0
                }
            };
            return g.next()
        }
    };
    g[Symbol.iterator] = function() {
        return g
    };
    return g
};
$jscomp.polyfill = function(d, h, l, g) {
    if (h) {
        l = $jscomp.global;
        d = d.split(".");
        for (g = 0; g < d.length - 1; g++) {
            var b = d[g];
            b in l || (l[b] = {});
            l = l[b]
        }
        d = d[d.length - 1];
        g = l[d];
        h = h(g);
        h != g && null != h && $jscomp.defineProperty(l, d, {
            configurable: !0,
            writable: !0,
            value: h
        })
    }
};
$jscomp.polyfill("Array.prototype.keys",
function(d) {
    return d ? d: function() {
        return $jscomp.iteratorFromArray(this,
        function(d) {
            return d
        })
    }
},
"es6-impl", "es3");
$jscomp.polyfill("Math.imul",
function(d) {
    return d ? d: function(d, l) {
        d = Number(d);
        l = Number(l);
        var g = d & 65535,
        b = l & 65535;
        return g * b + ((d >>> 16 & 65535) * b + g * (l >>> 16 & 65535) << 16 >>> 0) | 0
    }
},
"es6-impl", "es3");
$jscomp.checkStringArgs = function(d, h, l) {
    if (null == d) throw new TypeError("The 'this' value for String.prototype." + l + " must not be null or undefined");
    if (h instanceof RegExp) throw new TypeError("First argument to String.prototype." + l + " must not be a regular expression");
    return d + ""
};
$jscomp.polyfill("String.prototype.includes",
function(d) {
    return d ? d: function(d, l) {
        return - 1 !== $jscomp.checkStringArgs(this, d, "includes").indexOf(d, l || 0)
    }
},
"es6-impl", "es3");
$jscomp.polyfill("Array.prototype.fill",
function(d) {
    return d ? d: function(d, l, g) {
        var b = this.length || 0;
        0 > l && (l = Math.max(0, b + l));
        if (null == g || g > b) g = b;
        g = Number(g);
        0 > g && (g = Math.max(0, b + g));
        for (l = Number(l || 0); l < g; l++) this[l] = d;
        return this
    }
},
"es6-impl", "es3");
$jscomp.findInternal = function(d, h, l) {
    d instanceof String && (d = String(d));
    for (var g = d.length,
    b = 0; b < g; b++) {
        var m = d[b];
        if (h.call(l, m, b, d)) return {
            i: b,
            v: m
        }
    }
    return {
        i: -1,
        v: void 0
    }
};
$jscomp.polyfill("Array.prototype.find",
function(d) {
    return d ? d: function(d, l) {
        return $jscomp.findInternal(this, d, l).v
    }
},
"es6-impl", "es3");
Enumerable = function() {
    var d = function(a) {
        this.GetEnumerator = a
    };
    d.Choice = function() {
        var a = arguments[0] instanceof Array ? arguments[0] : arguments;
        return new d(function() {
            return new b(h.Blank,
            function() {
                return this.Yield(a[Math.floor(Math.random() * a.length)])
            },
            h.Blank)
        })
    };
    d.Cycle = function() {
        var a = arguments[0] instanceof Array ? arguments[0] : arguments;
        return new d(function() {
            var c = 0;
            return new b(h.Blank,
            function() {
                c >= a.length && (c = 0);
                return this.Yield(a[c++])
            },
            h.Blank)
        })
    };
    d.Empty = function() {
        return new d(function() {
            return new b(h.Blank,
            function() {
                return ! 1
            },
            h.Blank)
        })
    };
    d.From = function(a) {
        if (null == a) return d.Empty();
        if (a instanceof d) return a;
        if (typeof a == l.Number || typeof a == l.Boolean) return d.Repeat(a, 1);
        if (typeof a == l.String) return new d(function() {
            var c = 0;
            return new b(h.Blank,
            function() {
                return c < a.length ? this.Yield(a.charAt(c++)) : !1
            },
            h.Blank)
        });
        if (typeof a != l.Function) {
            if (typeof a.length == l.Number) return new e(a);
            if (! (a instanceof Object) && g.IsIEnumerable(a)) return new d(function() {
                var c = !0,
                e;
                return new b(function() {
                    e = new Enumerator(a)
                },
                function() {
                    c ? c = !1 : e.moveNext();
                    return e.atEnd() ? !1 : this.Yield(e.item())
                },
                h.Blank)
            })
        }
        return new d(function() {
            var c = [],
            e = 0;
            return new b(function() {
                for (var b in a) a[b] instanceof Function || c.push({
                    Key: b,
                    Value: a[b]
                })
            },
            function() {
                return e < c.length ? this.Yield(c[e++]) : !1
            },
            h.Blank)
        })
    };
    d.Return = function(a) {
        return d.Repeat(a, 1)
    };
    d.Matches = function(a, c, e) {
        null == e && (e = "");
        c instanceof RegExp && (e += c.ignoreCase ? "i": "", e += c.multiline ? "m": "", c = c.source); - 1 === e.indexOf("g") && (e += "g");
        return new d(function() {
            var f;
            return new b(function() {
                f = new RegExp(c, e)
            },
            function() {
                var c = f.exec(a);
                return c ? this.Yield(c) : !1
            },
            h.Blank)
        })
    };
    d.Range = function(a, c, b) {
        null == b && (b = 1);
        return d.ToInfinity(a, b).Take(c)
    };
    d.RangeDown = function(a, c, b) {
        null == b && (b = 1);
        return d.ToNegativeInfinity(a, b).Take(c)
    };
    d.RangeTo = function(a, c, b) {
        null == b && (b = 1);
        return a < c ? d.ToInfinity(a, b).TakeWhile(function(a) {
            return a <= c
        }) : d.ToNegativeInfinity(a, b).TakeWhile(function(a) {
            return a >= c
        })
    };
    d.Repeat = function(a, c) {
        return null != c ? d.Repeat(a).Take(c) : new d(function() {
            return new b(h.Blank,
            function() {
                return this.Yield(a)
            },
            h.Blank)
        })
    };
    d.RepeatWithFinalize = function(a, c) {
        a = g.CreateLambda(a);
        c = g.CreateLambda(c);
        return new d(function() {
            var e;
            return new b(function() {
                e = a()
            },
            function() {
                return this.Yield(e)
            },
            function() {
                null != e && (c(e), e = null)
            })
        })
    };
    d.Generate = function(a, c) {
        if (null != c) return d.Generate(a).Take(c);
        a = g.CreateLambda(a);
        return new d(function() {
            return new b(h.Blank,
            function() {
                return this.Yield(a())
            },
            h.Blank)
        })
    };
    d.ToInfinity = function(a, c) {
        null == a && (a = 0);
        null == c && (c = 1);
        return new d(function() {
            var e;
            return new b(function() {
                e = a - c
            },
            function() {
                return this.Yield(e += c)
            },
            h.Blank)
        })
    };
    d.ToNegativeInfinity = function(a, c) {
        null == a && (a = 0);
        null == c && (c = 1);
        return new d(function() {
            var e;
            return new b(function() {
                e = a + c
            },
            function() {
                return this.Yield(e -= c)
            },
            h.Blank)
        })
    };
    d.Unfold = function(a, c) {
        c = g.CreateLambda(c);
        return new d(function() {
            var e = !0,
            f;
            return new b(h.Blank,
            function() {
                if (e) return e = !1,
                f = a,
                this.Yield(f);
                f = c(f);
                return this.Yield(f)
            },
            h.Blank)
        })
    };
    d.prototype = {
        CascadeBreadthFirst: function(a, c) {
            var e = this;
            a = g.CreateLambda(a);
            c = g.CreateLambda(c);
            return new d(function() {
                var f, k = 0,
                n = [];
                return new b(function() {
                    f = e.GetEnumerator()
                },
                function() {
                    for (;;) {
                        if (f.MoveNext()) return n.push(f.Current()),
                        this.Yield(c(f.Current(), k));
                        var b = d.From(n).SelectMany(function(c) {
                            return a(c)
                        });
                        if (b.Any()) k++,
                        n = [],
                        g.Dispose(f),
                        f = b.GetEnumerator();
                        else return ! 1
                    }
                },
                function() {
                    g.Dispose(f)
                })
            })
        },
        CascadeDepthFirst: function(a, c) {
            var e = this;
            a = g.CreateLambda(a);
            c = g.CreateLambda(c);
            return new d(function() {
                var f = [],
                k;
                return new b(function() {
                    k = e.GetEnumerator()
                },
                function() {
                    for (;;) {
                        if (k.MoveNext()) {
                            var b = c(k.Current(), f.length);
                            f.push(k);
                            k = d.From(a(k.Current())).GetEnumerator();
                            return this.Yield(b)
                        }
                        if (0 >= f.length) return ! 1;
                        g.Dispose(k);
                        k = f.pop()
                    }
                },
                function() {
                    try {
                        g.Dispose(k)
                    } finally {
                        d.From(f).ForEach(function(a) {
                            a.Dispose()
                        })
                    }
                })
            })
        },
        Flatten: function() {
            var a = this;
            return new d(function() {
                var c, e = null;
                return new b(function() {
                    c = a.GetEnumerator()
                },
                function() {
                    for (;;) {
                        if (null != e) {
                            if (e.MoveNext()) return this.Yield(e.Current());
                            e = null
                        }
                        if (c.MoveNext()) if (c.Current() instanceof Array) {
                            g.Dispose(e);
                            e = d.From(c.Current()).SelectMany(h.Identity).Flatten().GetEnumerator();
                            continue
                        } else return this.Yield(c.Current());
                        return ! 1
                    }
                },
                function() {
                    try {
                        g.Dispose(c)
                    } finally {
                        g.Dispose(e)
                    }
                })
            })
        },
        Pairwise: function(a) {
            var c = this;
            a = g.CreateLambda(a);
            return new d(function() {
                var e;
                return new b(function() {
                    e = c.GetEnumerator();
                    e.MoveNext()
                },
                function() {
                    var c = e.Current();
                    return e.MoveNext() ? this.Yield(a(c, e.Current())) : !1
                },
                function() {
                    g.Dispose(e)
                })
            })
        },
        Scan: function(a, c, e) {
            if (null != e) return this.Scan(a, c).Select(e);
            var f;
            null == c ? (c = g.CreateLambda(a), f = !1) : (c = g.CreateLambda(c), f = !0);
            var k = this;
            return new d(function() {
                var e, n, u = !0;
                return new b(function() {
                    e = k.GetEnumerator()
                },
                function() {
                    if (u) {
                        u = !1;
                        if (f) return this.Yield(n = a);
                        if (e.MoveNext()) return this.Yield(n = e.Current())
                    }
                    return e.MoveNext() ? this.Yield(n = c(n, e.Current())) : !1
                },
                function() {
                    g.Dispose(e)
                })
            })
        },
        Select: function(a) {
            var c = this;
            a = g.CreateLambda(a);
            return new d(function() {
                var e, f = 0;
                return new b(function() {
                    e = c.GetEnumerator()
                },
                function() {
                    return e.MoveNext() ? this.Yield(a(e.Current(), f++)) : !1
                },
                function() {
                    g.Dispose(e)
                })
            })
        },
        SelectMany: function(a, c) {
            var e = this;
            a = g.CreateLambda(a);
            null == c && (c = function(a, c) {
                return c
            });
            c = g.CreateLambda(c);
            return new d(function() {
                var f, k = void 0,
                n = 0;
                return new b(function() {
                    f = e.GetEnumerator()
                },
                function() {
                    if (void 0 === k && !f.MoveNext()) return ! 1;
                    do {
                        if (null == k) {
                            var b = a(f.Current(), n++);
                            k = d.From(b).GetEnumerator()
                        }
                        if (k.MoveNext()) return this.Yield(c(f.Current(), k.Current()));
                        g.Dispose(k);
                        k = null
                    } while ( f . MoveNext ());
                    return ! 1
                },
                function() {
                    try {
                        g.Dispose(f)
                    } finally {
                        g.Dispose(k)
                    }
                })
            })
        },
        Where: function(a) {
            a = g.CreateLambda(a);
            var c = this;
            return new d(function() {
                var e, f = 0;
                return new b(function() {
                    e = c.GetEnumerator()
                },
                function() {
                    for (; e.MoveNext();) if (a(e.Current(), f++)) return this.Yield(e.Current());
                    return ! 1
                },
                function() {
                    g.Dispose(e)
                })
            })
        },
        OfType: function(a) {
            var c;
            switch (a) {
            case Number:
                c = l.Number;
                break;
            case String:
                c = l.String;
                break;
            case Boolean:
                c = l.Boolean;
                break;
            case Function:
                c = l.Function;
                break;
            default:
                c = null
            }
            return null === c ? this.Where(function(c) {
                return c instanceof a
            }) : this.Where(function(a) {
                return typeof a === c
            })
        },
        Zip: function(a, c) {
            c = g.CreateLambda(c);
            var e = this;
            return new d(function() {
                var f, k, n = 0;
                return new b(function() {
                    f = e.GetEnumerator();
                    k = d.From(a).GetEnumerator()
                },
                function() {
                    return f.MoveNext() && k.MoveNext() ? this.Yield(c(f.Current(), k.Current(), n++)) : !1
                },
                function() {
                    try {
                        g.Dispose(f)
                    } finally {
                        g.Dispose(k)
                    }
                })
            })
        },
        Join: function(a, c, e, f, k) {
            c = g.CreateLambda(c);
            e = g.CreateLambda(e);
            f = g.CreateLambda(f);
            k = g.CreateLambda(k);
            var n = this;
            return new d(function() {
                var u, v, m = null,
                x = 0;
                return new b(function() {
                    u = n.GetEnumerator();
                    v = d.From(a).ToLookup(e, h.Identity, k)
                },
                function() {
                    for (;;) {
                        if (null != m) {
                            var a = m[x++];
                            if (void 0 !== a) return this.Yield(f(u.Current(), a));
                            x = 0
                        }
                        if (u.MoveNext()) a = c(u.Current()),
                        m = v.Get(a).ToArray();
                        else return ! 1
                    }
                },
                function() {
                    g.Dispose(u)
                })
            })
        },
        GroupJoin: function(a, c, e, f, k) {
            c = g.CreateLambda(c);
            e = g.CreateLambda(e);
            f = g.CreateLambda(f);
            k = g.CreateLambda(k);
            var n = this;
            return new d(function() {
                var u = n.GetEnumerator(),
                v = null;
                return new b(function() {
                    u = n.GetEnumerator();
                    v = d.From(a).ToLookup(e, h.Identity, k)
                },
                function() {
                    if (u.MoveNext()) {
                        var a = v.Get(c(u.Current()));
                        return this.Yield(f(u.Current(), a))
                    }
                    return ! 1
                },
                function() {
                    g.Dispose(u)
                })
            })
        },
        All: function(a) {
            a = g.CreateLambda(a);
            var c = !0;
            this.ForEach(function(b) {
                if (!a(b)) return c = !1
            });
            return c
        },
        Any: function(a) {
            a = g.CreateLambda(a);
            var c = this.GetEnumerator();
            try {
                if (0 == arguments.length) return c.MoveNext();
                for (; c.MoveNext();) if (a(c.Current())) return ! 0;
                return ! 1
            } finally {
                g.Dispose(c)
            }
        },
        Concat: function(a) {
            var c = this;
            return new d(function() {
                var e, f;
                return new b(function() {
                    e = c.GetEnumerator()
                },
                function() {
                    if (null == f) {
                        if (e.MoveNext()) return this.Yield(e.Current());
                        f = d.From(a).GetEnumerator()
                    }
                    return f.MoveNext() ? this.Yield(f.Current()) : !1
                },
                function() {
                    try {
                        g.Dispose(e)
                    } finally {
                        g.Dispose(f)
                    }
                })
            })
        },
        Insert: function(a, c) {
            var e = this;
            return new d(function() {
                var f, k, n = 0,
                u = !1;
                return new b(function() {
                    f = e.GetEnumerator();
                    k = d.From(c).GetEnumerator()
                },
                function() {
                    return n == a && k.MoveNext() ? (u = !0, this.Yield(k.Current())) : f.MoveNext() ? (n++, this.Yield(f.Current())) : !u && k.MoveNext() ? this.Yield(k.Current()) : !1
                },
                function() {
                    try {
                        g.Dispose(f)
                    } finally {
                        g.Dispose(k)
                    }
                })
            })
        },
        Alternate: function(a) {
            a = d.Return(a);
            return this.SelectMany(function(c) {
                return d.Return(c).Concat(a)
            }).TakeExceptLast()
        },
        Contains: function(a, c) {
            c = g.CreateLambda(c);
            var b = this.GetEnumerator();
            try {
                for (; b.MoveNext();) if (c(b.Current()) === a) return ! 0;
                return ! 1
            } finally {
                g.Dispose(b)
            }
        },
        DefaultIfEmpty: function(a) {
            var c = this;
            return new d(function() {
                var e, f = !0;
                return new b(function() {
                    e = c.GetEnumerator()
                },
                function() {
                    return e.MoveNext() ? (f = !1, this.Yield(e.Current())) : f ? (f = !1, this.Yield(a)) : !1
                },
                function() {
                    g.Dispose(e)
                })
            })
        },
        Distinct: function(a) {
            return this.Except(d.Empty(), a)
        },
        Except: function(a, c) {
            c = g.CreateLambda(c);
            var e = this;
            return new d(function() {
                var k, n;
                return new b(function() {
                    k = e.GetEnumerator();
                    n = new f(c);
                    d.From(a).ForEach(function(a) {
                        n.Add(a)
                    })
                },
                function() {
                    for (; k.MoveNext();) {
                        var a = k.Current();
                        if (!n.Contains(a)) return n.Add(a),
                        this.Yield(a)
                    }
                    return ! 1
                },
                function() {
                    g.Dispose(k)
                })
            })
        },
        Intersect: function(a, c) {
            c = g.CreateLambda(c);
            var e = this;
            return new d(function() {
                var k, n, u;
                return new b(function() {
                    k = e.GetEnumerator();
                    n = new f(c);
                    d.From(a).ForEach(function(a) {
                        n.Add(a)
                    });
                    u = new f(c)
                },
                function() {
                    for (; k.MoveNext();) {
                        var a = k.Current();
                        if (!u.Contains(a) && n.Contains(a)) return u.Add(a),
                        this.Yield(a)
                    }
                    return ! 1
                },
                function() {
                    g.Dispose(k)
                })
            })
        },
        SequenceEqual: function(a, c) {
            c = g.CreateLambda(c);
            var b = this.GetEnumerator();
            try {
                var e = d.From(a).GetEnumerator();
                try {
                    for (; b.MoveNext();) if (!e.MoveNext() || c(b.Current()) !== c(e.Current())) return ! 1;
                    return e.MoveNext() ? !1 : !0
                } finally {
                    g.Dispose(e)
                }
            } finally {
                g.Dispose(b)
            }
        },
        Union: function(a, c) {
            c = g.CreateLambda(c);
            var e = this;
            return new d(function() {
                var k, n, u;
                return new b(function() {
                    k = e.GetEnumerator();
                    u = new f(c)
                },
                function() {
                    var c;
                    if (void 0 === n) {
                        for (; k.MoveNext();) if (c = k.Current(), !u.Contains(c)) return u.Add(c),
                        this.Yield(c);
                        n = d.From(a).GetEnumerator()
                    }
                    for (; n.MoveNext();) if (c = n.Current(), !u.Contains(c)) return u.Add(c),
                    this.Yield(c);
                    return ! 1
                },
                function() {
                    try {
                        g.Dispose(k)
                    } finally {
                        g.Dispose(n)
                    }
                })
            })
        },
        OrderBy: function(c) {
            return new a(this, c, !1)
        },
        OrderByDescending: function(c) {
            return new a(this, c, !0)
        },
        Reverse: function() {
            var a = this;
            return new d(function() {
                var c, e;
                return new b(function() {
                    c = a.ToArray();
                    e = c.length
                },
                function() {
                    return 0 < e ? this.Yield(c[--e]) : !1
                },
                h.Blank)
            })
        },
        Shuffle: function() {
            var a = this;
            return new d(function() {
                var c;
                return new b(function() {
                    c = a.ToArray()
                },
                function() {
                    return 0 < c.length ? this.Yield(c.splice(Math.floor(Math.random() * c.length), 1)[0]) : !1
                },
                h.Blank)
            })
        },
        GroupBy: function(a, c, e, f) {
            var k = this;
            a = g.CreateLambda(a);
            c = g.CreateLambda(c);
            null != e && (e = g.CreateLambda(e));
            f = g.CreateLambda(f);
            return new d(function() {
                var n;
                return new b(function() {
                    n = k.ToLookup(a, c, f).ToEnumerable().GetEnumerator()
                },
                function() {
                    for (; n.MoveNext();) return null == e ? this.Yield(n.Current()) : this.Yield(e(n.Current().Key(), n.Current()));
                    return ! 1
                },
                function() {
                    g.Dispose(n)
                })
            })
        },
        PartitionBy: function(a, c, e, f) {
            var k = this;
            a = g.CreateLambda(a);
            c = g.CreateLambda(c);
            f = g.CreateLambda(f);
            var n;
            null == e ? (n = !1, e = function(a, c) {
                return new v(a, c)
            }) : (n = !0, e = g.CreateLambda(e));
            return new d(function() {
                var u, v, m, x = [];
                return new b(function() {
                    u = k.GetEnumerator();
                    u.MoveNext() && (v = a(u.Current()), m = f(v), x.push(c(u.Current())))
                },
                function() {
                    for (var b; 1 == (b = u.MoveNext());) if (m === f(a(u.Current()))) x.push(c(u.Current()));
                    else break;
                    if (0 < x.length) {
                        var k = n ? e(v, d.From(x)) : e(v, x);
                        b ? (v = a(u.Current()), m = f(v), x = [c(u.Current())]) : x = [];
                        return this.Yield(k)
                    }
                    return ! 1
                },
                function() {
                    g.Dispose(u)
                })
            })
        },
        BufferWithCount: function(a) {
            var c = this;
            return new d(function() {
                var e;
                return new b(function() {
                    e = c.GetEnumerator()
                },
                function() {
                    for (var c = [], b = 0; e.MoveNext();) if (c.push(e.Current()), ++b >= a) return this.Yield(c);
                    return 0 < c.length ? this.Yield(c) : !1
                },
                function() {
                    g.Dispose(e)
                })
            })
        },
        Aggregate: function(a, c, b) {
            return this.Scan(a, c, b).Last()
        },
        Average: function(a) {
            a = g.CreateLambda(a);
            var c = 0,
            b = 0;
            this.ForEach(function(e) {
                c += a(e); ++b
            });
            return c / b
        },
        Count: function(a) {
            a = null == a ? h.True: g.CreateLambda(a);
            var c = 0;
            this.ForEach(function(b, e) {
                a(b, e) && ++c
            });
            return c
        },
        Max: function(a) {
            null == a && (a = h.Identity);
            return this.Select(a).Aggregate(function(a, c) {
                return a > c ? a: c
            })
        },
        Min: function(a) {
            null == a && (a = h.Identity);
            return this.Select(a).Aggregate(function(a, c) {
                return a < c ? a: c
            })
        },
        MaxBy: function(a) {
            a = g.CreateLambda(a);
            return this.Aggregate(function(c, b) {
                return a(c) > a(b) ? c: b
            })
        },
        MinBy: function(a) {
            a = g.CreateLambda(a);
            return this.Aggregate(function(c, b) {
                return a(c) < a(b) ? c: b
            })
        },
        Sum: function(a) {
            null == a && (a = h.Identity);
            return this.Select(a).Aggregate(0,
            function(a, c) {
                return a + c
            })
        },
        ElementAt: function(a) {
            var c, b = !1;
            this.ForEach(function(e, f) {
                if (f == a) return c = e,
                b = !0,
                !1
            });
            if (!b) throw Error("index is less than 0 or greater than or equal to the number of elements in source.");
            return c
        },
        ElementAtOrDefault: function(a, c) {
            var b, e = !1;
            this.ForEach(function(c, f) {
                if (f == a) return b = c,
                e = !0,
                !1
            });
            return e ? b: c
        },
        First: function(a) {
            if (null != a) return this.Where(a).First();
            var c, b = !1;
            this.ForEach(function(a) {
                c = a;
                b = !0;
                return ! 1
            });
            if (!b) throw Error("First:No element satisfies the condition.");
            return c
        },
        FirstOrDefault: function(a, c) {
            if (null != c) return this.Where(c).FirstOrDefault(a);
            var b, e = !1;
            this.ForEach(function(a) {
                b = a;
                e = !0;
                return ! 1
            });
            return e ? b: a
        },
        Last: function(a) {
            if (null != a) return this.Where(a).Last();
            var c, b = !1;
            this.ForEach(function(a) {
                b = !0;
                c = a
            });
            if (!b) throw Error("Last:No element satisfies the condition.");
            return c
        },
        LastOrDefault: function(a, c) {
            if (null != c) return this.Where(c).LastOrDefault(a);
            var b, e = !1;
            this.ForEach(function(a) {
                e = !0;
                b = a
            });
            return e ? b: a
        },
        Single: function(a) {
            if (null != a) return this.Where(a).Single();
            var c, b = !1;
            this.ForEach(function(a) {
                if (b) throw Error("Single:sequence contains more than one element.");
                b = !0;
                c = a
            });
            if (!b) throw Error("Single:No element satisfies the condition.");
            return c
        },
        SingleOrDefault: function(a, c) {
            if (null != c) return this.Where(c).SingleOrDefault(a);
            var b, e = !1;
            this.ForEach(function(a) {
                if (e) throw Error("Single:sequence contains more than one element.");
                e = !0;
                b = a
            });
            return e ? b: a
        },
        Skip: function(a) {
            var c = this;
            return new d(function() {
                var e, f = 0;
                return new b(function() {
                    for (e = c.GetEnumerator(); f++<a && e.MoveNext(););
                },
                function() {
                    return e.MoveNext() ? this.Yield(e.Current()) : !1
                },
                function() {
                    g.Dispose(e)
                })
            })
        },
        SkipWhile: function(a) {
            a = g.CreateLambda(a);
            var c = this;
            return new d(function() {
                var e, f = 0,
                k = !1;
                return new b(function() {
                    e = c.GetEnumerator()
                },
                function() {
                    for (; ! k;) if (e.MoveNext()) {
                        if (!a(e.Current(), f++)) return k = !0,
                        this.Yield(e.Current())
                    } else return ! 1;
                    return e.MoveNext() ? this.Yield(e.Current()) : !1
                },
                function() {
                    g.Dispose(e)
                })
            })
        },
        Take: function(a) {
            var c = this;
            return new d(function() {
                var e, f = 0;
                return new b(function() {
                    e = c.GetEnumerator()
                },
                function() {
                    return f++<a && e.MoveNext() ? this.Yield(e.Current()) : !1
                },
                function() {
                    g.Dispose(e)
                })
            })
        },
        TakeWhile: function(a) {
            a = g.CreateLambda(a);
            var c = this;
            return new d(function() {
                var e, f = 0;
                return new b(function() {
                    e = c.GetEnumerator()
                },
                function() {
                    return e.MoveNext() && a(e.Current(), f++) ? this.Yield(e.Current()) : !1
                },
                function() {
                    g.Dispose(e)
                })
            })
        },
        TakeExceptLast: function(a) {
            null == a && (a = 1);
            var c = this;
            return new d(function() {
                if (0 >= a) return c.GetEnumerator();
                var e, f = [];
                return new b(function() {
                    e = c.GetEnumerator()
                },
                function() {
                    for (; e.MoveNext();) {
                        if (f.length == a) return f.push(e.Current()),
                        this.Yield(f.shift());
                        f.push(e.Current())
                    }
                    return ! 1
                },
                function() {
                    g.Dispose(e)
                })
            })
        },
        TakeFromLast: function(a) {
            if (0 >= a || null == a) return d.Empty();
            var c = this;
            return new d(function() {
                var e, f, k = [];
                return new b(function() {
                    e = c.GetEnumerator()
                },
                function() {
                    for (; e.MoveNext();) k.length == a && k.shift(),
                    k.push(e.Current());
                    null == f && (f = d.From(k).GetEnumerator());
                    return f.MoveNext() ? this.Yield(f.Current()) : !1
                },
                function() {
                    g.Dispose(f)
                })
            })
        },
        IndexOf: function(a) {
            var c = null;
            this.ForEach(function(b, e) {
                if (b === a) return c = e,
                !0
            });
            return null !== c ? c: -1
        },
        LastIndexOf: function(a) {
            var c = -1;
            this.ForEach(function(b, e) {
                b === a && (c = e)
            });
            return c
        },
        ToArray: function() {
            var a = [];
            this.ForEach(function(c) {
                a.push(c)
            });
            return a
        },
        ToLookup: function(a, c, b) {
            a = g.CreateLambda(a);
            c = g.CreateLambda(c);
            b = g.CreateLambda(b);
            var e = new f(b);
            this.ForEach(function(b) {
                var f = a(b);
                b = c(b);
                var k = e.Get(f);
                void 0 !== k ? k.push(b) : e.Add(f, [b])
            });
            return new k(e)
        },
        ToObject: function(a, c) {
            a = g.CreateLambda(a);
            c = g.CreateLambda(c);
            var b = {};
            this.ForEach(function(e) {
                b[a(e)] = c(e)
            });
            return b
        },
        ToDictionary: function(a, c, b) {
            a = g.CreateLambda(a);
            c = g.CreateLambda(c);
            b = g.CreateLambda(b);
            var e = new f(b);
            this.ForEach(function(b) {
                e.Add(a(b), c(b))
            });
            return e
        },
        ToJSON: function(a, c) {
            return JSON.stringify(this.ToArray(), a, c)
        },
        ToString: function(a, c) {
            null == a && (a = "");
            null == c && (c = h.Identity);
            return this.Select(c).ToArray().join(a)
        },
        Do: function(a) {
            var c = this;
            a = g.CreateLambda(a);
            return new d(function() {
                var e, f = 0;
                return new b(function() {
                    e = c.GetEnumerator()
                },
                function() {
                    return e.MoveNext() ? (a(e.Current(), f++), this.Yield(e.Current())) : !1
                },
                function() {
                    g.Dispose(e)
                })
            })
        },
        ForEach: function(a) {
            a = g.CreateLambda(a);
            var c = 0,
            b = this.GetEnumerator();
            try {
                for (; b.MoveNext() && !1 !== a(b.Current(), c++););
            } finally {
                g.Dispose(b)
            }
        },
        Write: function(a, c) {
            null == a && (a = "");
            c = g.CreateLambda(c);
            var b = !0;
            this.ForEach(function(e) {
                b ? b = !1 : document.write(a);
                document.write(c(e))
            })
        },
        WriteLine: function(a) {
            a = g.CreateLambda(a);
            this.ForEach(function(c) {
                document.write(a(c));
                document.write("<br />")
            })
        },
        Force: function() {
            var a = this.GetEnumerator();
            try {
                for (; a.MoveNext(););
            } finally {
                g.Dispose(a)
            }
        },
        Let: function(a) {
            a = g.CreateLambda(a);
            var c = this;
            return new d(function() {
                var e;
                return new b(function() {
                    e = d.From(a(c)).GetEnumerator()
                },
                function() {
                    return e.MoveNext() ? this.Yield(e.Current()) : !1
                },
                function() {
                    g.Dispose(e)
                })
            })
        },
        Share: function() {
            var a = this,
            c;
            return new d(function() {
                return new b(function() {
                    null == c && (c = a.GetEnumerator())
                },
                function() {
                    return c.MoveNext() ? this.Yield(c.Current()) : !1
                },
                h.Blank)
            })
        },
        MemoizeAll: function() {
            var a = this,
            c, e;
            return new d(function() {
                var f = -1;
                return new b(function() {
                    null == e && (e = a.GetEnumerator(), c = [])
                },
                function() {
                    f++;
                    return c.length <= f ? e.MoveNext() ? this.Yield(c[f] = e.Current()) : !1 : this.Yield(c[f])
                },
                h.Blank)
            })
        },
        Catch: function(a) {
            a = g.CreateLambda(a);
            var c = this;
            return new d(function() {
                var e;
                return new b(function() {
                    e = c.GetEnumerator()
                },
                function() {
                    try {
                        return e.MoveNext() ? this.Yield(e.Current()) : !1
                    } catch(r) {
                        return a(r),
                        !1
                    }
                },
                function() {
                    g.Dispose(e)
                })
            })
        },
        Finally: function(a) {
            a = g.CreateLambda(a);
            var c = this;
            return new d(function() {
                var e;
                return new b(function() {
                    e = c.GetEnumerator()
                },
                function() {
                    return e.MoveNext() ? this.Yield(e.Current()) : !1
                },
                function() {
                    try {
                        g.Dispose(e)
                    } finally {
                        a()
                    }
                })
            })
        },
        Trace: function(a, c) {
            null == a && (a = "Trace");
            c = g.CreateLambda(c);
            return this.Do(function(b) {
                console.log(a, ":", c(b))
            })
        }
    };
    var h = {
        Identity: function(a) {
            return a
        },
        True: function() {
            return ! 0
        },
        Blank: function() {}
    },
    l = {
        Boolean: "boolean",
        Number: "number",
        String: "string",
        Object: "object",
        Undefined: "undefined",
        Function: "function"
    },
    g = {
        CreateLambda: function(a) {
            if (null == a) return h.Identity;
            if (typeof a == l.String) {
                if ("" == a) return h.Identity;
                if ( - 1 == a.indexOf("=>")) return new Function("$,$$,$$$,$$$$", "return " + a);
                a = a.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/);
                return new Function(a[1], "return " + a[2])
            }
            return a
        },
        IsIEnumerable: function(a) {
            if (typeof Enumerator != l.Undefined) try {
                return new Enumerator(a),
                !0
            } catch(n) {}
            return ! 1
        },
        Compare: function(a, c) {
            return a === c ? 0 : a > c ? 1 : -1
        },
        Dispose: function(a) {
            null != a && a.Dispose()
        }
    },
    b = function(a, c, b) {
        var e = new m,
        f = 0;
        this.Current = e.Current;
        this.MoveNext = function() {
            try {
                switch (f) {
                case 0:
                    f = 1,
                    a();
                case 1:
                    if (c.apply(e)) return ! 0;
                    this.Dispose();
                    return ! 1;
                case 2:
                    return ! 1
                }
            } catch(q) {
                throw this.Dispose(),
                q;
            }
        };
        this.Dispose = function() {
            if (1 == f) try {
                b()
            } finally {
                f = 2
            }
        }
    },
    m = function() {
        var a = null;
        this.Current = function() {
            return a
        };
        this.Yield = function(c) {
            a = c;
            return ! 0
        }
    },
    a = function(a, c, b, e) {
        this.source = a;
        this.keySelector = g.CreateLambda(c);
        this.descending = b;
        this.parent = e
    };
    a.prototype = new d;
    a.prototype.CreateOrderedEnumerable = function(c, b) {
        return new a(this.source, c, b, this)
    };
    a.prototype.ThenBy = function(a) {
        return this.CreateOrderedEnumerable(a, !1)
    };
    a.prototype.ThenByDescending = function(a) {
        return this.CreateOrderedEnumerable(a, !0)
    };
    a.prototype.GetEnumerator = function() {
        var a = this,
        e, f, k = 0;
        return new b(function() {
            e = [];
            f = [];
            a.source.ForEach(function(a, c) {
                e.push(a);
                f.push(c)
            });
            var b = c.Create(a, null);
            b.GenerateKeys(e);
            f.sort(function(a, c) {
                return b.Compare(a, c)
            })
        },
        function() {
            return k < f.length ? this.Yield(e[f[k++]]) : !1
        },
        h.Blank)
    };
    var c = function(a, c, b) {
        this.keySelector = a;
        this.descending = c;
        this.child = b;
        this.keys = null
    };
    c.Create = function(a, b) {
        var e = new c(a.keySelector, a.descending, b);
        return null != a.parent ? c.Create(a.parent, e) : e
    };
    c.prototype.GenerateKeys = function(a) {
        for (var c = a.length,
        b = this.keySelector,
        e = Array(c), f = 0; f < c; f++) e[f] = b(a[f]);
        this.keys = e;
        null != this.child && this.child.GenerateKeys(a)
    };
    c.prototype.Compare = function(a, c) {
        var b = g.Compare(this.keys[a], this.keys[c]);
        if (0 == b) {
            if (null != this.child) return this.child.Compare(a, c);
            b = g.Compare(a, c)
        }
        return this.descending ? -b: b
    };
    var e = function(a) {
        this.source = a
    };
    e.prototype = new d;
    e.prototype.Any = function(a) {
        return null == a ? 0 < this.source.length: d.prototype.Any.apply(this, arguments)
    };
    e.prototype.Count = function(a) {
        return null == a ? this.source.length: d.prototype.Count.apply(this, arguments)
    };
    e.prototype.ElementAt = function(a) {
        return 0 <= a && a < this.source.length ? this.source[a] : d.prototype.ElementAt.apply(this, arguments)
    };
    e.prototype.ElementAtOrDefault = function(a, c) {
        return 0 <= a && a < this.source.length ? this.source[a] : c
    };
    e.prototype.First = function(a) {
        return null == a && 0 < this.source.length ? this.source[0] : d.prototype.First.apply(this, arguments)
    };
    e.prototype.FirstOrDefault = function(a, c) {
        return null != c ? d.prototype.FirstOrDefault.apply(this, arguments) : 0 < this.source.length ? this.source[0] : a
    };
    e.prototype.Last = function(a) {
        return null == a && 0 < this.source.length ? this.source[this.source.length - 1] : d.prototype.Last.apply(this, arguments)
    };
    e.prototype.LastOrDefault = function(a, c) {
        return null != c ? d.prototype.LastOrDefault.apply(this, arguments) : 0 < this.source.length ? this.source[this.source.length - 1] : a
    };
    e.prototype.Skip = function(a) {
        var c = this.source;
        return new d(function() {
            var e;
            return new b(function() {
                e = 0 > a ? 0 : a
            },
            function() {
                return e < c.length ? this.Yield(c[e++]) : !1
            },
            h.Blank)
        })
    };
    e.prototype.TakeExceptLast = function(a) {
        null == a && (a = 1);
        return this.Take(this.source.length - a)
    };
    e.prototype.TakeFromLast = function(a) {
        return this.Skip(this.source.length - a)
    };
    e.prototype.Reverse = function() {
        var a = this.source;
        return new d(function() {
            var c;
            return new b(function() {
                c = a.length
            },
            function() {
                return 0 < c ? this.Yield(a[--c]) : !1
            },
            h.Blank)
        })
    };
    e.prototype.SequenceEqual = function(a, c) {
        return (a instanceof e || a instanceof Array) && null == c && d.From(a).Count() != this.Count() ? !1 : d.prototype.SequenceEqual.apply(this, arguments)
    };
    e.prototype.ToString = function(a, c) {
        if (null != c || !(this.source instanceof Array)) return d.prototype.ToString.apply(this, arguments);
        null == a && (a = "");
        return this.source.join(a)
    };
    e.prototype.GetEnumerator = function() {
        var a = this.source,
        c = 0;
        return new b(h.Blank,
        function() {
            return c < a.length ? this.Yield(a[c++]) : !1
        },
        h.Blank)
    };
    var f = function() {
        var a = function(a) {
            return null === a ? "null": void 0 === a ? "undefined": typeof a.toString === l.Function ? a.toString() : Object.prototype.toString.call(a)
        },
        c = function(a, c) {
            this.Key = a;
            this.Value = c;
            this.Next = this.Prev = null
        },
        e = function() {
            this.Last = this.First = null
        };
        e.prototype = {
            AddLast: function(a) {
                null != this.Last ? (this.Last.Next = a, a.Prev = this.Last, this.Last = a) : this.First = this.Last = a
            },
            Replace: function(a, c) {
                null != a.Prev ? (a.Prev.Next = c, c.Prev = a.Prev) : this.First = c;
                null != a.Next ? (a.Next.Prev = c, c.Next = a.Next) : this.Last = c
            },
            Remove: function(a) {
                null != a.Prev ? a.Prev.Next = a.Next: this.First = a.Next;
                null != a.Next ? a.Next.Prev = a.Prev: this.Last = a.Prev
            }
        };
        var f = function(a) {
            this.count = 0;
            this.entryList = new e;
            this.buckets = {};
            this.compareSelector = null == a ? h.Identity: a
        };
        f.prototype = {
            Add: function(b, e) {
                var f = this.compareSelector(b),
                k = a(f),
                d = new c(b, e);
                if (Object.prototype.hasOwnProperty.call(this.buckets, k)) {
                    for (var k = this.buckets[k], v = 0; v < k.length; v++) if (this.compareSelector(k[v].Key) === f) {
                        this.entryList.Replace(k[v], d);
                        k[v] = d;
                        return
                    }
                    k.push(d)
                } else this.buckets[k] = [d];
                this.count++;
                this.entryList.AddLast(d)
            },
            Get: function(c) {
                c = this.compareSelector(c);
                var b = a(c);
                if (Object.prototype.hasOwnProperty.call(this.buckets, b)) for (var b = this.buckets[b], e = 0; e < b.length; e++) {
                    var f = b[e];
                    if (this.compareSelector(f.Key) === c) return f.Value
                }
            },
            Set: function(b, e) {
                var f = this.compareSelector(b),
                k = a(f);
                if (Object.prototype.hasOwnProperty.call(this.buckets, k)) for (var k = this.buckets[k], d = 0; d < k.length; d++) if (this.compareSelector(k[d].Key) === f) return f = new c(b, e),
                this.entryList.Replace(k[d], f),
                k[d] = f,
                !0;
                return ! 1
            },
            Contains: function(c) {
                c = this.compareSelector(c);
                var b = a(c);
                if (!Object.prototype.hasOwnProperty.call(this.buckets, b)) return ! 1;
                for (var b = this.buckets[b], e = 0; e < b.length; e++) if (this.compareSelector(b[e].Key) === c) return ! 0;
                return ! 1
            },
            Clear: function() {
                this.count = 0;
                this.buckets = {};
                this.entryList = new e
            },
            Remove: function(c) {
                c = this.compareSelector(c);
                var b = a(c);
                if (Object.prototype.hasOwnProperty.call(this.buckets, b)) for (var e = this.buckets[b], f = 0; f < e.length; f++) if (this.compareSelector(e[f].Key) === c) {
                    this.entryList.Remove(e[f]);
                    e.splice(f, 1);
                    0 == e.length && delete this.buckets[b];
                    this.count--;
                    break
                }
            },
            Count: function() {
                return this.count
            },
            ToEnumerable: function() {
                var a = this;
                return new d(function() {
                    var c;
                    return new b(function() {
                        c = a.entryList.First
                    },
                    function() {
                        if (null != c) {
                            var a = {
                                Key: c.Key,
                                Value: c.Value
                            };
                            c = c.Next;
                            return this.Yield(a)
                        }
                        return ! 1
                    },
                    h.Blank)
                })
            }
        };
        return f
    } (),
    k = function(a) {
        this.Count = function() {
            return a.Count()
        };
        this.Get = function(c) {
            return d.From(a.Get(c))
        };
        this.Contains = function(c) {
            return a.Contains(c)
        };
        this.ToEnumerable = function() {
            return a.ToEnumerable().Select(function(a) {
                return new v(a.Key, a.Value)
            })
        }
    },
    v = function(a, c) {
        this.Key = function() {
            return a
        };
        this.source = c
    };
    v.prototype = new e;
    return d
} ();
define("library/linq.js/linq",
function() {});
define("util/mathGeo", [],
function() {
    function d() {
        this.i0 = 0;
        this.d = [this]
    }
    function h(a, b, f, k, d, g, n, m, l) {
        a = [ - 0, -0, -0, -0, -0, -0, -0, -0];
        a[7] = k;
        var c = +Math.max(b, a[7]);
        a[6] = m;
        var e = +Math.min(g, a[6]);
        if (c < e) return 0;
        c = f;
        e = d;
        a[5] = e;
        f = +Math.max(c, a[5]);
        a[4] = l;
        d = +Math.min(n, a[4]);
        if (f < d) return 0;
        a[3] = m;
        f = +Math.max(g, a[3]);
        a[2] = k;
        d = +Math.min(b, a[2]);
        if (f < d) return 0;
        a[1] = l;
        f = +Math.max(n, a[1]);
        a[0] = e;
        d = +Math.min(c, a[0]);
        if (f < d) return 0;
        f = e - c;
        d = k - b;
        if (0 > (f * (g - b) - d * (n - c)) * (d * (l - c) - f * (m - b))) return 0;
        f = l - n;
        m -= g;
        return (0 <= ((b - g) * f - (c - n) * m) * ((e - n) * m - (k - g) * f) ? 1 : 0) >> 0 >> 0
    }
    function l(a, b, f, k, d, g) {
        a = +Math.PI;
        d = a * d / 180;
        k = +(k >> 0);
        var c = +Math.sin(d);
        d = +Math.cos(d);
        var e = f * a / 180;
        f = 21412 * (90 - f) / 90 + 6356725;
        c = 180 * (b * a / 180 + k * c / ( + Math.cos(e) * f)) / a;
        a = 180 * (e + k * d / f) / a;
        return g ? [a, c] : [c, a]
    }
    function g(a, b, f, k, d) {
        a = +Math.PI;
        var c = +b[(f >> 0) + 1 >> 0],
        e = a * c / 180,
        v = +k[(d >> 0) + 1 >> 0],
        g = 21412 * (90 - c) / 90 + 6356725,
        c = +k[d >> 0 >> 0],
        m = +b[f >> 0 >> 0],
        e = +Math.abs(a * (c - m) / 180 * g * +Math.cos(e) / ((a * v / 180 - e) * g)),
        e = +Math.atan(e);
        a = 180 * e / a;
        c = +k[d >> 0 >> 0];
        v = +b[f >> 0 >> 0];
        c -= v;
        v = +k[(d >> 0) + 1 >> 0];
        m = +b[(f >> 0) + 1 >> 0];
        v -= m;
        return 0 >= c || 0 < v ? 0 >= c && 0 > v ? a + 180 : 0 <= c || 0 > v ? a: 360 - a: 180 - a
    }
    function b(a, b, f, k, d, g) {
        a = +Math.PI;
        var c = +b[(f >> 0) + 1 >> 0];
        b = +b[f >> 0 >> 0];
        g ? (g = +k[(d >> 0) + 1 >> 0], d = +k[d >> 0 >> 0]) : (g = +k[d >> 0 >> 0], d = +k[(d >> 0) + 1 >> 0], k = c, c = b, b = k);
        k = a * b / 180;
        d = a * d / 180;
        c = +Math.abs(g - c);
        a = +Math.cos(a * c / 180);
        c = +Math.cos(k);
        g = +Math.cos(d);
        k = +Math.sin(k);
        d = +Math.sin(d);
        a = +Math.acos(a * c * g + k * d);
        a = +Math.round(6378137 * a);
        return a >> 0 >> 0
    }
    function m(c, b, f, k, d) {
        var e = [],
        v = +Math.PI,
        m = a(c, k, 0, d, 0),
        h = a(c, k, 0, b, 0),
        p = a(c, d, 0, b, 0),
        q = f;
        if (h < q && p < q) return null;
        if (h === q && p === q) return e.push(k[0]),
        e.push(d[0]),
        e;
        k = g(c, b, 0, k, 0);
        q = g(c, b, 0, d, 0);
        k < q || 0 < q && 90 > q && k > q + 180 ? (h = +(h >> 0 >> 0), k = +(k >> 0 >> 0)) : (d = p, p = q, q = k, k = p, p = h, h = d);
        d = m * m;
        var t = p * p,
        y = h * h,
        z = 2 * m,
        w = +Math.acos((d + t - y) / (z * p)),
        w = +Math.cos(w),
        A = -2 * p * w,
        B = f * f,
        C = A * A - 4 * (t - B);
        0 < C ? (w = +Math.sqrt(C), w = .5 * ( - 0 - A - w), 0 > w && (w = +Math.sqrt(C), w = .5 * (w - A)), 0 < w && w < m && (p = +Math.acos((B + t - w * w) / (2 * f * p)), A = +b[0], C = +b[1], q = l(c, A, C, f >> 0 >> 0, q - 180 * p / v, 0), e.push(q))) : w = void 0;
        p = +Math.acos((d + y - t) / (z * h));
        p = +Math.cos(p);
        q = -2 * h * p;
        d = q * q - 4 * (y - B);
        if (! (0 < d)) return e;
        p = +Math.sqrt(d);
        p = .5 * ( - 0 - q - p);
        0 > p && (p = +Math.sqrt(d), p = .5 * (p - q));
        if (! (0 < p && p < m)) return e;
        q = +Math.abs(m - w - p);
        if (! (.001 < q)) return e;
        p = +Math.acos((B + y - p * p) / (2 * f * h));
        A = +b[0];
        C = +b[1];
        q = l(c, A, C, f >> 0 >> 0, k + 180 * p / v, 0);
        e.push(q);
        return e
    }
    function a(a, b, f, k, d) {
        a = +b[f >> 0 >> 0];
        var c = +k[d >> 0 >> 0],
        e = +Math.pow(a - c, 2);
        a = +b[(f >> 0) + 1 >> 0];
        c = +k[(d >> 0) + 1 >> 0];
        return + Math.sqrt(e + +Math.pow(a - c, 2))
    }
    d.prototype.intersect = function(a, b, f, k) {
        return h(this, +a[0], +a[1], +b[0], +b[1], +f[0], +f[1], +k[0], +k[1]) >> 0
    };
    d.prototype.intersectPoint = function(a, b, f, k) {
        var c = +a[0],
        e = +a[1],
        d = +b[0],
        g = +b[1];
        b = +f[0];
        f = +f[1];
        a = +k[0];
        k = +k[1];
        if (h(this, c, e, d, g, b, f, a, k) >> 0) {
            var d = d - c,
            g = g - e,
            m = +Math.abs(d * (f - e) - g * (b - c)),
            c = +Math.abs(d * (k - e) - g * (a - c)),
            c = m / c,
            e = c + 1;
            b = [(b + a * c) / e, (f + k * c) / e]
        } else b = null;
        return b
    };
    d.prototype.getPoint = function(a, b, f) {
        var c = +Math.PI,
        c = c / 180 * f;
        f = +a[0];
        var e = +Math.cos(c);
        a = +a[1];
        c = +Math.sin(c);
        return [f + e * b, a + c * b]
    };
    d.prototype.getAngleP3 = function(a, b, f, k) {
        a: {
            var c = +a[0],
            e = +b[0],
            d = c - e,
            c = +a[1];
            b = +b[1];
            a = c - b;
            c = +f[0];
            e = c - e;
            c = +f[1];
            f = c - b;
            c = +Math.sqrt(d * d + a * a);
            b = +Math.sqrt(e * e + f * f);
            c *= b;
            do
            if (0 === c) c = -180;
            else if (c = +Math.acos((d * e + a * f) / c), isNaN(c) >> 0) {
                k = c = 0;
                break a
            } else c *= 180;
            while (0);
            b = +Math.PI;
            c /= b;
            d = d * f - a * e;
            do {
                if (k) {
                    if (! (0 < d)) break
                } else if (0 < d) break;
                k = c;
                break a
            } while ( 0 );
            k = 360 - c
        }
        return k
    };
    d.prototype.getFlatDist = function(a, b) {
        var c = +a[0],
        e = +b[0],
        d = +Math.pow(c - e, 2),
        c = +a[1],
        e = +b[1];
        return + Math.sqrt(d + +Math.pow(c - e, 2))
    };
    d.prototype.getCoordinate = function(a, b, f, k) {
        var c = +a[0];
        a = +a[1];
        return l(this, k ? a: c, k ? c: a, b >> 0, f, k >> 0)
    };
    d.prototype.polygonContains = function(a, b, f) {
        var c = 0,
        e = b.length;
        do
        if (0 < e >> 0) {
            var d = 0,
            g = 0;
            a: for (;;) {
                for (;;) {
                    var m = b[0 + (g >> 0) >> 0],
                    l = m,
                    g = (g >> 0) + 1 >> 0,
                    m = g >> 0 === e >> 0 ? b[0] : b[0 + (g >> 0) >> 0];
                    if (f) var h = +a[0],
                    q = +a[1],
                    t = +l[0],
                    l = +l[1],
                    y = +m[0],
                    m = +m[1];
                    else h = +a[1],
                    q = +a[0],
                    t = +l[1],
                    l = +l[0],
                    y = +m[1],
                    m = +m[0];
                    t >= h || y < h ? y >= h || t < h || (c = 11) : c = 11;
                    if (11 === c && (c = 0, l + (h - t) / (y - t) * (m - l) < q)) break;
                    if (! (g >> 0 < e >> 0)) {
                        c = 14;
                        break a
                    }
                }
                d = d & 1 ^ 1;
                if (! (g >> 0 < e >> 0)) {
                    c = 15;
                    break
                }
            }
        } else d = 0;
        while (0);
        return (0 !== (d & 1) ? 1 : 0) >> 0
    };
    d.prototype.rayCasting = function(a, b) {
        var c;
        a: {
            c = 0;
            var e = +a[0],
            d = +a[1],
            g = b.length;
            do
            if (0 < g >> 0) {
                var m = (g >> 0) + -1 >> 0,
                l = 0,
                h = 0;
                b: for (;;) {
                    var p = b[0 + (h >> 0) >> 0],
                    q = b[0 + (m >> 0) >> 0],
                    t = p[0],
                    y = +t.valueOf(),
                    m = y,
                    t = p[1],
                    t = y = +t.valueOf(),
                    p = q[0],
                    z = y = +p.valueOf(),
                    p = q[1],
                    p = y = +p.valueOf();
                    if (m === e && t === d) break;
                    if (z === e && p === d) break;
                    t >= d || p < d ? t >= d && p < d && (c = 6) : c = 6;
                    do
                    if (6 === c) {
                        c = 0;
                        m += (d - t) * (z - m) / (p - t);
                        if (m === e) break b;
                        m > e && (l = l & 1 ^ 1)
                    }
                    while (0);
                    m = (h >> 0) + 1 >> 0;
                    if (m >> 0 < g >> 0) p = m,
                    m = h,
                    h = p;
                    else {
                        c = 10;
                        break
                    }
                }
                if (10 !== c) {
                    m = 0;
                    c = m >> 0;
                    break a
                }
            } else l = 0;
            while (0);
            c = ((l & 1) << 1 >> 0) + -1 >> 0 >> 0
        }
        return c
    };
    d.prototype.getAnglePoint = function(a, b, f, k) {
        var c = +Math.PI;
        f = f / 180 * c;
        var e = +a[0],
        d = e / 180 * c,
        e = +a[1];
        a = e / 180 * c;
        k || (e = a, a = d, d = e);
        b /= 6378137;
        var e = +Math.sin(d),
        g = +Math.cos(b),
        m = +Math.cos(d),
        l = +Math.sin(b),
        e = +Math.asin(e * g + m * l * +Math.cos(f));
        f = +Math.sin(f);
        g = +Math.sin(b);
        m = +Math.cos(d);
        b = +Math.cos(b);
        d = +Math.sin(d);
        l = +Math.sin(e);
        d = +Math.atan2(f * g * m, b - d * l);
        a = (a + d) / c * 180;
        d = e / c * 180;
        if (0 > a) for (; a += 360, 0 > a;);
        if ( - 90 > d) for (; d += 180, -90 > d;);
        if (90 < d) for (; d += -180, 90 < d;);
        k = k ? [d, a] : [a, d];
        return k
    };
    d.prototype.getAngle = function(a, b) {
        return g(this, a, 0, b, 0)
    };
    d.prototype.getDistance = function(a, e, f) {
        return b(this, a, 0, e, 0, f >> 0) >> 0
    };
    d.prototype.getPathAngle = function(a, b, f, k) {
        b = k - b;
        k = +Math.abs(b);
        a = f - a;
        f = +Math.abs(a);
        k = +Math.atan(k / f);
        f = +Math.PI;
        k *= 180 / f;
        return 0 < b ? 0 < a ? k: 180 - k: 0 < a ? 360 - k: k + 180
    };
    d.prototype.pointToLine = function(a, e, f, k) {
        var c;
        var d = b(this, e, 0, f, 0, k >> 0);
        c = +(d >> 0);
        var g = b(this, e, 0, a, 0, k >> 0);
        e = +(g >> 0);
        g = b(this, f, 0, a, 0, k >> 0);
        a = +(g >> 0);
        e + a === c ? c = 0 : 1 > d >> 0 ? c = e: (d = a * a, f = c * c, k = e * e, d < f + k ? k < f + d ? (d = .5 * (c + e + a), e = +Math.sqrt((d - a) * (d - e) * d * (d - c)), c = 2 * e / c) : c = a: c = e);
        return c
    };
    d.prototype.circleCommonTangent = function(a, e, f, k) {
        a: {
            var c = g(this, a, 0, f, 0),
            d = c + -180,
            c = k - e;
            do
            if (0 === c) var d = d + -90,
            m = +a[0],
            h = +a[1],
            r = e >> 0,
            c = d,
            p = l(this, m, h, r >> 0, c, 0),
            m = +a[0],
            h = +a[1],
            q = d + 180,
            h = l(this, m, h, r >> 0, q, 0),
            d = +f[0],
            m = +f[1],
            r = k >> 0,
            t = l(this, d, m, r >> 0, c, 0),
            d = +f[0],
            m = +f[1],
            m = l(this, d, m, r >> 0, q, 0);
            else {
                r = b(this, a, 0, f, 0, 0);
                if (0 === r >> 0) {
                    a = p = null;
                    break a
                }
                c = m = k / (c / +(r >> 0));
                r = isNaN(c);
                if (r >> 0 || c < k) {
                    a = p = null;
                    break a
                } else m = q = +Math.sqrt(m * m - k * k),
                c = +Math.asin(k / c),
                q = +Math.PI,
                h = 180 * c / q,
                c = +Math.cos(h),
                t = c = +Math.abs(m * c),
                +Math.sqrt(m * m - t * t),
                m = 90 - h,
                h = +a[0],
                t = +a[1],
                r = e >> 0,
                c = d - m,
                p = l(this, h, t, r >> 0, c, 0),
                h = +a[0],
                t = +a[1],
                q = d + m,
                h = l(this, h, t, r >> 0, q, 0),
                d = +f[0],
                m = +f[1],
                r = k >> 0,
                t = l(this, d, m, r >> 0, c, 0),
                d = +f[0],
                m = +f[1],
                m = l(this, d, m, r >> 0, q, 0)
            }
            while (0);
            a = p = [p, h, t, m]
        }
        return a
    };
    d.prototype.tileToLnglat = function(a, b, f) {
        b = +Math.pow(2, +(b >> 0));
        var c = b >> 0;
        b = +Math.PI;
        var e = +a[0];
        if (f) {
            f = +a[1];
            var d = +Math.tan(b * f / 180);
            f = +a[1];
            d = +Math.log(d + 1 / +Math.cos(b * f / 180));
            a = [(e + 180) / 360 * +(c >> 0) >> 0 >> 0, .5 * +(c >> 0) * (1 - d / b) >> 0 >> 0]
        } else f = +(c >> 0),
        d = ak(b * (1 - 2 * +a[1] / f)),
        d = +Math.atan(d),
        a = [e / f * 360 + -180, 180 * d / b];
        return a
    };
    d.prototype.getDegree = function(a, b, f, k) {
        var c = +k.valueOf(),
        e = +b.valueOf(),
        c = +Math.abs(c - e),
        e = +f.valueOf(),
        d = +a.valueOf(),
        e = +Math.abs(e - d),
        c = +Math.atan(c / e),
        e = +Math.PI,
        m = 180 / e * c,
        c = +k.valueOf(),
        e = +b.valueOf(),
        d = +f.valueOf();
        a = +a.valueOf();
        return 0 < c - e ? 0 < d - a ? m: 180 - m: 0 < d - a ? 360 - m: m + 180
    };
    d.prototype.lineInterCircle = function(a, b, f, k) {
        return m(this, a, b, f, k)
    };
    d.prototype.get_rEquator = function() {
        return 6378137
    };
    d.prototype.get_rPole = function() {
        return 6356725
    };
    d.prototype._multiply = function(a, b, f, k, d, m) {
        return (a - d) * (k - m) - (f - d) * (b - m)
    };
    d.prototype._testArea = function(a, b, f, k, d, m) {
        return + Math.abs((f - a) * (m - b) - (k - b) * (d - a))
    };
    d.prototype.intersect = function(a, b, f, k, d, m, g, l) {
        return h(this, a, b, f, k, d, m, g, l)
    };
    d.prototype._getDistance = function(a, e, f) {
        return b(this, a, e, f)
    };
    d.prototype._getCoordinate = function(a, b, f, k, d) {
        return l(this, a, b, f, k, d)
    };
    d.prototype._getAngle = function(a, b) {
        return g(this, a, b)
    };
    d.prototype._getFlatDist = function(c, b) {
        return a(this, c, b)
    }; (function() {
        Math.imul || (Math.imul = function(a, b) {
            return a * b
        });
        return 0
    })();
    return window.mathGeo = d
});
define("data/typhoon", ["require", "exports", "library/linq.js/linq", "util/mathGeo"],
function(d, h) {
    h.__esModule = !0;
    var l = function() {
        function b() {
            this.tfszmb = "//tf.szmb.gov.cn/";
            this.getTyphoonEffectDist = function(b, a, c, e) {
                a = e - 10 * a;
                c[1] > b[1] && (a -= 50);
                c[0] < b[0] && (a -= 50);
                return a
            }
        }
        b.newTyphoon = function(d, a, c, e, f) {
            var k = b.allTyphoon[d + a];
            k || (k = new g);
            k.TCIDX = d;
            a && (k.TCNO = a);
            c && (k.CNAME = c);
            e && (k.ENAME = e);
            f && (k.routes = f);
            if (k.routes) {
                c = 0;
                for (e = k.routes; c < e.length; c++) f = e[c],
                f.TCLEVEL = b.level.getCode(f.WIND).code,
                f.ISSUEDATE = f.ISSUEDATE.toString().toDate();
                k.TCLEVEL = b.level.getCode(k.routes[k.routes.length - 1].WIND).name
            }
            b.allTyphoon[d + a] = k;
            a || "TD" != k.TCLEVEL || (k.CNAME = "\u70ed\u5e26\u4f4e\u538b", k.ENAME = "TD");
            return k
        };
        b.form = function(d, a) {
            a.TCIDX = d.TCIDX;
            a.TCNO = d.TCNO;
            a.CNAME = d.CNAME;
            a.ENAME = d.ENAME;
            a.LONGITUDE = Math.roundec(a.LONGITUDE, 5);
            a.LATITUDE = Math.roundec(a.LATITUDE, 5);
            "string" == typeof a.ISSUEDATE && (a.ISSUEDATE = a.ISSUEDATE.toDate());
            a.WIND = Math.roundec(a.WIND, 2);
            a.WINDCLASS = b.level.getNumber(a.WIND);
            return a
        };
        b.formatDataList = function(d, a) {
            for (var c = 0,
            e; c < a.length; c++) e = b.form(d, a[c]),
            e.FORECASTDATE = e.FORECASTDATE.toString().toDate(),
            e.ISSUERNAME = b.issuer[e.ISSUETYPE].name;
            return a
        };
        b.getTyphoonOne = function(d, a, c, e, f) {
            var k = b.allTyphoon[d + a];
            k ? f(k) : app.webService("GetTyphoonRoute", {
                tcidx: d,
                tcno: a
            },
            function(k) {
                k = b.newTyphoon(d, a, c, e, k);
                f(k)
            })
        };
        b.prototype.getCurrentTyphoon = function(d, a) {
            var c = this;
            app.webService("CheckCurrentTyphoon", {
                hours: d
            },
            function(e) {
                var f = 0,
                k, d = [],
                g;
                for (g in e.typhoons) {
                    var m = e.typhoons[g],
                    m = m[m.length - 1],
                    h = [m.LATITUDE, m.LONGITUDE];
                    m.TOSHENZHEN = window.mathGeo.prototype.getDistance(h, app.center.latlng, !0) / 1E3;
                    h = c.getTyphoonEffectDist(app.center.latlng, m.WIND, h, m.TOSHENZHEN);
                    if (0 == f || h < f) f = h,
                    k = m
                }
                Enumerable.From(e.typhoons).OrderBy(function(a) {
                    return a.Value[a.Value.length - 1].TOSHENZHEN
                }).ForEach(function(a) {
                    var c = a.Value[a.Value.length - 1];
                    a = b.newTyphoon(c.TCIDX, c.TCNO, c.CNAME, c.ENAME, a.Value);
                    "\u70ed\u5e26\u98ce\u66b4" == a.TCLEVEL && "\u70ed\u5e26\u4f4e\u538b" == a.CNAME && (a.CNAME = "\u70ed\u5e26\u98ce\u66b4", a.ENAME = "TS");
                    d.push(a)
                });
                a(e.dateTime.toDate(), d, k, e.lastTyNode)
            })
        };
        b.prototype.getTyphoonByYear = function(b, a) {
            app.webService("GetTyphoonByYear", {
                year: b
            },
            function(c) {
                a(c)
            })
        };
        b.prototype.getLastOneYearTyphoonList = function(b) {
            var a = (new Date).getFullYear();
            $.ajax({
                url: "//tf.szmb.gov.cn/weather/typhoonWeb/GetTyphoonByYear_" + a + ".txt?" + (new Date).getTime(),
                dataType: "json",
                success: function(c) {
                    4 > c.length ? $.getJSON("//tf.szmb.gov.cn/weather/typhoonWeb/GetTyphoonByYear_" + (a - 1) + ".txt?" + (new Date).getTime(),
                    function(a) {
                        b(c.concat(a))
                    }) : b(c)
                },
                error: function() {
                    $.getJSON("//tf.szmb.gov.cn/weather/typhoonWeb/GetTyphoonByYear_" + (a - 1) + ".txt?" + (new Date).getTime(), b)
                }
            })
        };
        b.getTyphoonForecast = function(b, a, c, e) {
            a.ISSUEDATE.format("yyyyMMddHHmm");
            app.webService("GetTyphoonForecast", {
                tcidx: b.TCIDX,
                tcno: b.TCNO,
                dt: a.ISSUEDATE,
                issuer: c
            },
            function(c) {
                var f = function() {
                    var e = c.data[m];
                    if (0 == e[0].INTERVALTIME) {
                        if (e[0].ISSUEDATE = e[0].ISSUEDATE.toDate(), e[0].LONGITUDE != a.LONGITUDE || e[0].LATITUDE != a.LATITUDE) d = Enumerable.From(b.routes).FirstOrDefault(null,
                        function(a) {
                            return 1E3 > Math.abs(a.ISSUEDATE.getTime() - e[0].ISSUEDATE.getTime())
                        }),
                        null != d && (e[0].LONGITUDE = d.LONGITUDE, e[0].LATITUDE = d.LATITUDE)
                    } else g = Enumerable.From(b.routes).FirstOrDefault(null,
                    function(a) {
                        return 1E3 > Math.abs(a.ISSUEDATE.getTime() - e[0].ISSUEDATE.getTime())
                    }),
                    null != g && (g = app.common.clone(g), g.ISSUETYPE = m, g.INTERVALTIME = 0, g.FORECASTDATE = g.ISSUEDATE, e.splice(0, 0, g))
                },
                d,
                g,
                m;
                for (m in c.data) f();
                e(c.data)
            })
        };
        return b
    } ();
    l.issuer = {
        BABJ: {
            name: "\u4e2d\u592e\u53f0",
            color: "#ff0000"
        },
        BCGZ: {
            name: "\u5e7f\u5dde\u53f0",
            color: "#ffa040"
        },
        RJTD: {
            name: "\u65e5\u672c",
            color: "#43ff4b"
        },
        PGTW: {
            name: "\u7f8e\u56fd",
            color: "#40ddff"
        },
        VHHH: {
            name: "\u4e2d\u56fd\u9999\u6e2f",
            color: "#ff40f5"
        },
        ECMWF: {
            name: "\u6b27\u6d32\u4e2d\u5fc3",
            color: "#585858"
        },
        SZQX: {
            name: "\u6df1\u5733\u53f0",
            color: "#1d2089"
        }
    };
    l.level = {
        TD: {
            color: [0, 255, 3, 1],
            name: "\u70ed\u5e26\u4f4e\u538b",
            code: "TD"
        },
        TS: {
            color: [0, 98, 254, 1],
            name: "\u70ed\u5e26\u98ce\u66b4",
            code: "TS"
        },
        STS: {
            color: [253, 250, 0, 1],
            name: "\u5f3a\u70ed\u5e26\u98ce\u66b4",
            code: "STS"
        },
        TY: {
            color: [253, 172, 3, 1],
            name: "\u53f0\u98ce",
            code: "TY"
        },
        STY: {
            color: [240, 114, 246, 1],
            name: "\u5f3a\u53f0\u98ce",
            code: "STY"
        },
        SuperTY: {
            color: [253, 0, 2, 1],
            name: "\u8d85\u5f3a\u53f0\u98ce",
            code: "SuperTY"
        },
        scale: [0, .3, 1.6, 3.4, 5.5, 8, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7, 37, 41.5, 46.2, 51, 56.1, 61.2],
        color: [[255, 255, 255], [0, 230, 204], [0, 204, 126], [0, 179, 0], [126, 204, 0], [204, 230, 0], [255, 255, 0], [255, 204, 0], [255, 153, 0], [255, 102, 0], [255, 0, 0], [204, 0, 0], [153, 0, 0]],
        getNumber: function(b) {
            for (var d = 0; d < this.scale.length; d++) if (! (b >= this.scale[d])) return d - 1;
            return 18
        },
        getColor: function(b) {
            if ("number" == typeof b) return 6 <= b && 7 >= b ? "#00ff03": 9 >= b ? "#0062fe": 11 >= b ? "#fdfa00": 13 >= b ? "#fdac03": 15 >= b ? "#f072f6": "#fd0002";
            if ("TD" == b) return "#00ff03";
            if ("TS" == b) return "#0062fe";
            if ("STS" == b) return "#fdfa00";
            if ("TY" == b) return "#fdac03";
            if ("STY" == b) return "#f072f6";
            if ("SuperTY" == b) return "#fd0002"
        },
        getCode: function(b) {
            b = this.getNumber(b);
            return 6 <= b && 7 >= b ? {
                name: "\u70ed\u5e26\u4f4e\u538b",
                code: "TD"
            }: 9 >= b ? {
                name: "\u70ed\u5e26\u98ce\u66b4",
                code: "TS"
            }: 11 >= b ? {
                name: "\u5f3a\u70ed\u5e26\u98ce\u66b4",
                code: "STS"
            }: 13 >= b ? {
                name: "\u53f0\u98ce",
                code: "TY"
            }: 15 >= b ? {
                name: "\u5f3a\u53f0\u98ce",
                code: "STY"
            }: {
                name: "\u8d85\u5f3a\u53f0\u98ce",
                code: "SuperTY"
            }
        }
    };
    l.allTyphoon = {};
    h["default"] = l;
    var g = function() {
        return function() {}
    } ()
}); !
function(d, h, l) {
    function g() {
        var a = d.L;
        b.noConflict = function() {
            return d.L = a,
            this
        };
        d.L = b
    }
    var b = {
        version: "1.0.3+ed36a04"
    };
    "object" == typeof module && "object" == typeof module.exports ? module.exports = b: "function" == typeof define && define.amd && define("leaflet", b);
    "undefined" != typeof d && g();
    b.Util = {
        extend: function(a) {
            var c, b, f, k;
            b = 1;
            for (f = arguments.length; b < f; b++) for (c in k = arguments[b], k) a[c] = k[c];
            return a
        },
        create: Object.create ||
        function() {
            function a() {}
            return function(c) {
                return a.prototype = c,
                new a
            }
        } (),
        bind: function(a, c) {
            var b = Array.prototype.slice;
            if (a.bind) return a.bind.apply(a, b.call(arguments, 1));
            var f = b.call(arguments, 2);
            return function() {
                return a.apply(c, f.length ? f.concat(b.call(arguments)) : arguments)
            }
        },
        stamp: function(a) {
            return a._leaflet_id = a._leaflet_id || ++b.Util.lastId,
            a._leaflet_id
        },
        lastId: 0,
        throttle: function(a, c, b) {
            var e, k, d, g;
            return g = function() {
                e = !1;
                k && (d.apply(b, k), k = !1)
            },
            d = function() {
                e ? k = arguments: (a.apply(b, arguments), setTimeout(g, c), e = !0)
            }
        },
        wrapNum: function(a, c, b) {
            var e = c[1];
            c = c[0];
            var k = e - c;
            return a === e && b ? a: ((a - c) % k + k) % k + c
        },
        falseFn: function() {
            return ! 1
        },
        formatNum: function(a, c) {
            var b = Math.pow(10, c || 5);
            return Math.round(a * b) / b
        },
        trim: function(a) {
            return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "")
        },
        splitWords: function(a) {
            return b.Util.trim(a).split(/\s+/)
        },
        setOptions: function(a, c) {
            a.hasOwnProperty("options") || (a.options = a.options ? b.Util.create(a.options) : {});
            for (var e in c) a.options[e] = c[e];
            return a.options
        },
        getParamString: function(a, c, b) {
            var e = [],
            k;
            for (k in a) e.push(encodeURIComponent(b ? k.toUpperCase() : k) + "=" + encodeURIComponent(a[k]));
            return (c && -1 !== c.indexOf("?") ? "&": "?") + e.join("&")
        },
        template: function(a, c) {
            return a.replace(b.Util.templateRe,
            function(a, b) {
                var e = c[b];
                if (e === l) throw Error("No value provided for variable " + a);
                return "function" == typeof e && (e = e(c)),
                e
            })
        },
        templateRe: /\{ *([\w_\-]+) *\}/g,
        isArray: Array.isArray ||
        function(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        },
        indexOf: function(a, c) {
            for (var b = 0; b < a.length; b++) if (a[b] === c) return b;
            return - 1
        },
        emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    }; (function() {
        function a(a) {
            return d["webkit" + a] || d["moz" + a] || d["ms" + a]
        }
        function c(a) {
            var c = +new Date,
            b = Math.max(0, 16 - (c - e));
            return e = c + b,
            d.setTimeout(a, b)
        }
        var e = 0,
        f = d.requestAnimationFrame || a("RequestAnimationFrame") || c,
        k = d.cancelAnimationFrame || a("CancelAnimationFrame") || a("CancelRequestAnimationFrame") ||
        function(a) {
            d.clearTimeout(a)
        };
        b.Util.requestAnimFrame = function(a, e, k) {
            return k && f === c ? void a.call(e) : f.call(d, b.bind(a, e))
        };
        b.Util.cancelAnimFrame = function(a) {
            a && k.call(d, a)
        }
    })();
    b.extend = b.Util.extend;
    b.bind = b.Util.bind;
    b.stamp = b.Util.stamp;
    b.setOptions = b.Util.setOptions;
    b.Class = function() {};
    b.Class.extend = function(a) {
        var c = function() {
            this.initialize && this.initialize.apply(this, arguments);
            this.callInitHooks()
        },
        e = c.__super__ = this.prototype,
        f = b.Util.create(e);
        f.constructor = c;
        c.prototype = f;
        for (var k in this) this.hasOwnProperty(k) && "prototype" !== k && (c[k] = this[k]);
        return a.statics && (b.extend(c, a.statics), delete a.statics),
        a.includes && (b.Util.extend.apply(null, [f].concat(a.includes)), delete a.includes),
        f.options && (a.options = b.Util.extend(b.Util.create(f.options), a.options)),
        b.extend(f, a),
        f._initHooks = [],
        f.callInitHooks = function() {
            if (!this._initHooksCalled) {
                e.callInitHooks && e.callInitHooks.call(this);
                this._initHooksCalled = !0;
                for (var a = 0,
                c = f._initHooks.length; a < c; a++) f._initHooks[a].call(this)
            }
        },
        c
    };
    b.Class.include = function(a) {
        return b.extend(this.prototype, a),
        this
    };
    b.Class.mergeOptions = function(a) {
        return b.extend(this.prototype.options, a),
        this
    };
    b.Class.addInitHook = function(a) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.prototype._initHooks = this.prototype._initHooks || [],
        this.prototype._initHooks.push("function" == typeof a ? a: function() {
            this[a].apply(this, c)
        }),
        this
    };
    b.Evented = b.Class.extend({
        on: function(a, c, e) {
            if ("object" == typeof a) for (var f in a) this._on(f, a[f], c);
            else {
                a = b.Util.splitWords(a);
                f = 0;
                for (var k = a.length; f < k; f++) this._on(a[f], c, e)
            }
            return this
        },
        off: function(a, c, e) {
            if (a) if ("object" == typeof a) for (var f in a) this._off(f, a[f], c);
            else {
                a = b.Util.splitWords(a);
                f = 0;
                for (var k = a.length; f < k; f++) this._off(a[f], c, e)
            } else delete this._events;
            return this
        },
        _on: function(a, c, b) {
            this._events = this._events || {};
            var e = this._events[a];
            e || (e = [], this._events[a] = e);
            b === this && (b = l);
            a = {
                fn: c,
                ctx: b
            };
            for (var k = 0,
            d = e.length; k < d; k++) if (e[k].fn === c && e[k].ctx === b) return;
            e.push(a)
        },
        _off: function(a, c, e) {
            var f, k, d;
            if (this._events && (f = this._events[a])) {
                if (!c) {
                    k = 0;
                    for (d = f.length; k < d; k++) f[k].fn = b.Util.falseFn;
                    return void delete this._events[a]
                }
                if (e === this && (e = l), f) for (k = 0, d = f.length; k < d; k++) {
                    var g = f[k];
                    if (g.ctx === e && g.fn === c) return g.fn = b.Util.falseFn,
                    this._firingCount && (this._events[a] = f = f.slice()),
                    void f.splice(k, 1)
                }
            }
        },
        fire: function(a, c, e) {
            if (!this.listens(a, e)) return this;
            c = b.Util.extend({},
            c, {
                type: a,
                target: this
            });
            if (this._events && (a = this._events[a])) {
                this._firingCount = this._firingCount + 1 || 1;
                for (var f = 0,
                k = a.length; f < k; f++) {
                    var d = a[f];
                    d.fn.call(d.ctx || this, c)
                }
                this._firingCount--
            }
            return e && this._propagateEvent(c),
            this
        },
        listens: function(a, c) {
            var b = this._events && this._events[a];
            if (b && b.length) return ! 0;
            if (c) for (var f in this._eventParents) if (this._eventParents[f].listens(a, c)) return ! 0;
            return ! 1
        },
        once: function(a, c, e) {
            if ("object" == typeof a) {
                for (var f in a) this.once(f, a[f], c);
                return this
            }
            var k = b.bind(function() {
                this.off(a, c, e).off(a, k, e)
            },
            this);
            return this.on(a, c, e).on(a, k, e)
        },
        addEventParent: function(a) {
            return this._eventParents = this._eventParents || {},
            this._eventParents[b.stamp(a)] = a,
            this
        },
        removeEventParent: function(a) {
            return this._eventParents && delete this._eventParents[b.stamp(a)],
            this
        },
        _propagateEvent: function(a) {
            for (var c in this._eventParents) this._eventParents[c].fire(a.type, b.extend({
                layer: a.target
            },
            a), !0)
        }
    });
    var m = b.Evented.prototype;
    m.addEventListener = m.on;
    m.removeEventListener = m.clearAllEventListeners = m.off;
    m.addOneTimeEventListener = m.once;
    m.fireEvent = m.fire;
    m.hasEventListeners = m.listens;
    b.Mixin = {
        Events: m
    }; (function() {
        var a = navigator.userAgent.toLowerCase(),
        c = h.documentElement,
        e = "ActiveXObject" in d,
        f = -1 !== a.indexOf("webkit"),
        k = -1 !== a.indexOf("phantom"),
        g = -1 !== a.search("android [23]"),
        m = -1 !== a.indexOf("chrome"),
        l = -1 !== a.indexOf("gecko") && !f && !d.opera && !e,
        x = 0 === navigator.platform.indexOf("Win"),
        r = "undefined" != typeof orientation || -1 !== a.indexOf("mobile"),
        p = !d.PointerEvent && d.MSPointerEvent,
        q = d.PointerEvent || p,
        t = e && "transition" in c.style,
        y = "WebKitCSSMatrix" in d && "m11" in new d.WebKitCSSMatrix && !g,
        z = "MozPerspective" in c.style,
        c = "OTransition" in c.style,
        w = !d.L_NO_TOUCH && (q || "ontouchstart" in d || d.DocumentTouch && h instanceof d.DocumentTouch);
        b.Browser = {
            ie: e,
            ielt9: e && !h.addEventListener,
            edge: "msLaunchUri" in navigator && !("documentMode" in h),
            webkit: f,
            gecko: l,
            android: -1 !== a.indexOf("android"),
            android23: g,
            chrome: m,
            safari: !m && -1 !== a.indexOf("safari"),
            win: x,
            ie3d: t,
            webkit3d: y,
            gecko3d: z,
            opera12: c,
            any3d: !d.L_DISABLE_3D && (t || y || z) && !c && !k,
            mobile: r,
            mobileWebkit: r && f,
            mobileWebkit3d: r && y,
            mobileOpera: r && d.opera,
            mobileGecko: r && l,
            touch: !!w,
            msPointer: !!p,
            pointer: !!q,
            retina: 1 < (d.devicePixelRatio || d.screen.deviceXDPI / d.screen.logicalXDPI)
        }
    })();
    b.Point = function(a, c, b) {
        this.x = b ? Math.round(a) : a;
        this.y = b ? Math.round(c) : c
    };
    b.Point.prototype = {
        clone: function() {
            return new b.Point(this.x, this.y)
        },
        add: function(a) {
            return this.clone()._add(b.point(a))
        },
        _add: function(a) {
            return this.x += a.x,
            this.y += a.y,
            this
        },
        subtract: function(a) {
            return this.clone()._subtract(b.point(a))
        },
        _subtract: function(a) {
            return this.x -= a.x,
            this.y -= a.y,
            this
        },
        divideBy: function(a) {
            return this.clone()._divideBy(a)
        },
        _divideBy: function(a) {
            return this.x /= a,
            this.y /= a,
            this
        },
        multiplyBy: function(a) {
            return this.clone()._multiplyBy(a)
        },
        _multiplyBy: function(a) {
            return this.x *= a,
            this.y *= a,
            this
        },
        scaleBy: function(a) {
            return new b.Point(this.x * a.x, this.y * a.y)
        },
        unscaleBy: function(a) {
            return new b.Point(this.x / a.x, this.y / a.y)
        },
        round: function() {
            return this.clone()._round()
        },
        _round: function() {
            return this.x = Math.round(this.x),
            this.y = Math.round(this.y),
            this
        },
        floor: function() {
            return this.clone()._floor()
        },
        _floor: function() {
            return this.x = Math.floor(this.x),
            this.y = Math.floor(this.y),
            this
        },
        ceil: function() {
            return this.clone()._ceil()
        },
        _ceil: function() {
            return this.x = Math.ceil(this.x),
            this.y = Math.ceil(this.y),
            this
        },
        distanceTo: function(a) {
            a = b.point(a);
            var c = a.x - this.x;
            a = a.y - this.y;
            return Math.sqrt(c * c + a * a)
        },
        equals: function(a) {
            return a = b.point(a),
            a.x === this.x && a.y === this.y
        },
        contains: function(a) {
            return a = b.point(a),
            Math.abs(a.x) <= Math.abs(this.x) && Math.abs(a.y) <= Math.abs(this.y)
        },
        toString: function() {
            return "Point(" + b.Util.formatNum(this.x) + ", " + b.Util.formatNum(this.y) + ")"
        }
    };
    b.point = function(a, c, e) {
        return a instanceof b.Point ? a: b.Util.isArray(a) ? new b.Point(a[0], a[1]) : a === l || null === a ? a: "object" == typeof a && "x" in a && "y" in a ? new b.Point(a.x, a.y) : new b.Point(a, c, e)
    };
    b.Bounds = function(a, c) {
        if (a) for (var b = c ? [a, c] : a, f = 0, k = b.length; f < k; f++) this.extend(b[f])
    };
    b.Bounds.prototype = {
        extend: function(a) {
            return a = b.point(a),
            this.min || this.max ? (this.min.x = Math.min(a.x, this.min.x), this.max.x = Math.max(a.x, this.max.x), this.min.y = Math.min(a.y, this.min.y), this.max.y = Math.max(a.y, this.max.y)) : (this.min = a.clone(), this.max = a.clone()),
            this
        },
        getCenter: function(a) {
            return new b.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, a)
        },
        getBottomLeft: function() {
            return new b.Point(this.min.x, this.max.y)
        },
        getTopRight: function() {
            return new b.Point(this.max.x, this.min.y)
        },
        getSize: function() {
            return this.max.subtract(this.min)
        },
        contains: function(a) {
            var c, e;
            return a = "number" == typeof a[0] || a instanceof b.Point ? b.point(a) : b.bounds(a),
            a instanceof b.Bounds ? (c = a.min, e = a.max) : c = e = a,
            c.x >= this.min.x && e.x <= this.max.x && c.y >= this.min.y && e.y <= this.max.y
        },
        intersects: function(a) {
            a = b.bounds(a);
            var c = this.min,
            e = this.max,
            f = a.min;
            a = a.max;
            var k = a.y >= c.y && f.y <= e.y;
            return a.x >= c.x && f.x <= e.x && k
        },
        overlaps: function(a) {
            a = b.bounds(a);
            var c = this.min,
            e = this.max,
            f = a.min;
            a = a.max;
            var k = a.y > c.y && f.y < e.y;
            return a.x > c.x && f.x < e.x && k
        },
        isValid: function() {
            return ! (!this.min || !this.max)
        }
    };
    b.bounds = function(a, c) {
        return ! a || a instanceof b.Bounds ? a: new b.Bounds(a, c)
    };
    b.Transformation = function(a, c, b, f) {
        this._a = a;
        this._b = c;
        this._c = b;
        this._d = f
    };
    b.Transformation.prototype = {
        transform: function(a, c) {
            return this._transform(a.clone(), c)
        },
        _transform: function(a, c) {
            return c = c || 1,
            a.x = c * (this._a * a.x + this._b),
            a.y = c * (this._c * a.y + this._d),
            a
        },
        untransform: function(a, c) {
            return c = c || 1,
            new b.Point((a.x / c - this._b) / this._a, (a.y / c - this._d) / this._c)
        }
    };
    b.DomUtil = {
        get: function(a) {
            return "string" == typeof a ? h.getElementById(a) : a
        },
        getStyle: function(a, c) {
            var b = a.style[c] || a.currentStyle && a.currentStyle[c];
            b && "auto" !== b || !h.defaultView || (b = (b = h.defaultView.getComputedStyle(a, null)) ? b[c] : null);
            return "auto" === b ? null: b
        },
        create: function(a, c, b) {
            a = h.createElement(a);
            return a.className = c || "",
            b && b.appendChild(a),
            a
        },
        remove: function(a) {
            var c = a.parentNode;
            c && c.removeChild(a)
        },
        empty: function(a) {
            for (; a.firstChild;) a.removeChild(a.firstChild)
        },
        toFront: function(a) {
            a.parentNode.appendChild(a)
        },
        toBack: function(a) {
            var c = a.parentNode;
            c.insertBefore(a, c.firstChild)
        },
        hasClass: function(a, c) {
            if (a.classList !== l) return a.classList.contains(c);
            var e = b.DomUtil.getClass(a);
            return 0 < e.length && (new RegExp("(^|\\s)" + c + "(\\s|$)")).test(e)
        },
        addClass: function(a, c) {
            if (a.classList !== l) for (var e = b.Util.splitWords(c), f = 0, k = e.length; f < k; f++) a.classList.add(e[f]);
            else b.DomUtil.hasClass(a, c) || (e = b.DomUtil.getClass(a), b.DomUtil.setClass(a, (e ? e + " ": "") + c))
        },
        removeClass: function(a, c) {
            a.classList !== l ? a.classList.remove(c) : b.DomUtil.setClass(a, b.Util.trim((" " + b.DomUtil.getClass(a) + " ").replace(" " + c + " ", " ")))
        },
        setClass: function(a, c) {
            a.className.baseVal === l ? a.className = c: a.className.baseVal = c
        },
        getClass: function(a) {
            return a.className.baseVal === l ? a.className: a.className.baseVal
        },
        setOpacity: function(a, c) {
            "opacity" in a.style ? a.style.opacity = c: "filter" in a.style && b.DomUtil._setOpacityIE(a, c)
        },
        _setOpacityIE: function(a, c) {
            var b = !1;
            try {
                b = a.filters.item("DXImageTransform.Microsoft.Alpha")
            } catch(f) {
                if (1 === c) return
            }
            c = Math.round(100 * c);
            b ? (b.Enabled = 100 !== c, b.Opacity = c) : a.style.filter += " progid:DXImageTransform.Microsoft.Alpha(opacity=" + c + ")"
        },
        testProp: function(a) {
            for (var c = h.documentElement.style,
            b = 0; b < a.length; b++) if (a[b] in c) return a[b];
            return ! 1
        },
        setTransform: function(a, c, e) {
            c = c || new b.Point(0, 0);
            a.style[b.DomUtil.TRANSFORM] = (b.Browser.ie3d ? "translate(" + c.x + "px," + c.y + "px)": "translate3d(" + c.x + "px," + c.y + "px,0)") + (e ? " scale(" + e + ")": "")
        },
        setPosition: function(a, c) {
            a._leaflet_pos = c;
            b.Browser.any3d ? b.DomUtil.setTransform(a, c) : (a.style.left = c.x + "px", a.style.top = c.y + "px")
        },
        getPosition: function(a) {
            return a._leaflet_pos || new b.Point(0, 0)
        }
    }; (function() {
        b.DomUtil.TRANSFORM = b.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]);
        var a = b.DomUtil.TRANSITION = b.DomUtil.testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
        if (b.DomUtil.TRANSITION_END = "webkitTransition" === a || "OTransition" === a ? a + "End": "transitionend", "onselectstart" in h) b.DomUtil.disableTextSelection = function() {
            b.DomEvent.on(d, "selectstart", b.DomEvent.preventDefault)
        },
        b.DomUtil.enableTextSelection = function() {
            b.DomEvent.off(d, "selectstart", b.DomEvent.preventDefault)
        };
        else {
            var c = b.DomUtil.testProp(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
            b.DomUtil.disableTextSelection = function() {
                if (c) {
                    var a = h.documentElement.style;
                    this._userSelect = a[c];
                    a[c] = "none"
                }
            };
            b.DomUtil.enableTextSelection = function() {
                c && (h.documentElement.style[c] = this._userSelect, delete this._userSelect)
            }
        }
        b.DomUtil.disableImageDrag = function() {
            b.DomEvent.on(d, "dragstart", b.DomEvent.preventDefault)
        };
        b.DomUtil.enableImageDrag = function() {
            b.DomEvent.off(d, "dragstart", b.DomEvent.preventDefault)
        };
        b.DomUtil.preventOutline = function(a) {
            for (; - 1 === a.tabIndex;) a = a.parentNode;
            a && a.style && (b.DomUtil.restoreOutline(), this._outlineElement = a, this._outlineStyle = a.style.outline, a.style.outline = "none", b.DomEvent.on(d, "keydown", b.DomUtil.restoreOutline, this))
        };
        b.DomUtil.restoreOutline = function() {
            this._outlineElement && (this._outlineElement.style.outline = this._outlineStyle, delete this._outlineElement, delete this._outlineStyle, b.DomEvent.off(d, "keydown", b.DomUtil.restoreOutline, this))
        }
    })();
    b.LatLng = function(a, c, b) {
        if (isNaN(a) || isNaN(c)) throw Error("Invalid LatLng object: (" + a + ", " + c + ")");
        this.lat = +a;
        this.lng = +c;
        b !== l && (this.alt = +b)
    };
    b.LatLng.prototype = {
        equals: function(a, c) {
            if (!a) return ! 1;
            a = b.latLng(a);
            return Math.max(Math.abs(this.lat - a.lat), Math.abs(this.lng - a.lng)) <= (c === l ? 1E-9: c)
        },
        toString: function(a) {
            return "LatLng(" + b.Util.formatNum(this.lat, a) + ", " + b.Util.formatNum(this.lng, a) + ")"
        },
        distanceTo: function(a) {
            return b.CRS.Earth.distance(this, b.latLng(a))
        },
        wrap: function() {
            return b.CRS.Earth.wrapLatLng(this)
        },
        toBounds: function(a) {
            a = 180 * a / 40075017;
            var c = a / Math.cos(Math.PI / 180 * this.lat);
            return b.latLngBounds([this.lat - a, this.lng - c], [this.lat + a, this.lng + c])
        },
        clone: function() {
            return new b.LatLng(this.lat, this.lng, this.alt)
        }
    };
    b.latLng = function(a, c, e) {
        return a instanceof b.LatLng ? a: b.Util.isArray(a) && "object" != typeof a[0] ? 3 === a.length ? new b.LatLng(a[0], a[1], a[2]) : 2 === a.length ? new b.LatLng(a[0], a[1]) : null: a === l || null === a ? a: "object" == typeof a && "lat" in a ? new b.LatLng(a.lat, "lng" in a ? a.lng: a.lon, a.alt) : c === l ? null: new b.LatLng(a, c, e)
    };
    b.LatLngBounds = function(a, c) {
        if (a) for (var b = c ? [a, c] : a, f = 0, k = b.length; f < k; f++) this.extend(b[f])
    };
    b.LatLngBounds.prototype = {
        extend: function(a) {
            var c, e, f = this._southWest,
            k = this._northEast;
            if (a instanceof b.LatLng) e = c = a;
            else {
                if (! (a instanceof b.LatLngBounds)) return a ? this.extend(b.latLng(a) || b.latLngBounds(a)) : this;
                if (c = a._southWest, e = a._northEast, !c || !e) return this
            }
            return f || k ? (f.lat = Math.min(c.lat, f.lat), f.lng = Math.min(c.lng, f.lng), k.lat = Math.max(e.lat, k.lat), k.lng = Math.max(e.lng, k.lng)) : (this._southWest = new b.LatLng(c.lat, c.lng), this._northEast = new b.LatLng(e.lat, e.lng)),
            this
        },
        pad: function(a) {
            var c = this._southWest,
            e = this._northEast,
            f = Math.abs(c.lat - e.lat) * a;
            a *= Math.abs(c.lng - e.lng);
            return new b.LatLngBounds(new b.LatLng(c.lat - f, c.lng - a), new b.LatLng(e.lat + f, e.lng + a))
        },
        getCenter: function() {
            return new b.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
        },
        getSouthWest: function() {
            return this._southWest
        },
        getNorthEast: function() {
            return this._northEast
        },
        getNorthWest: function() {
            return new b.LatLng(this.getNorth(), this.getWest())
        },
        getSouthEast: function() {
            return new b.LatLng(this.getSouth(), this.getEast())
        },
        getWest: function() {
            return this._southWest.lng
        },
        getSouth: function() {
            return this._southWest.lat
        },
        getEast: function() {
            return this._northEast.lng
        },
        getNorth: function() {
            return this._northEast.lat
        },
        contains: function(a) {
            a = "number" == typeof a[0] || a instanceof b.LatLng || "lat" in a ? b.latLng(a) : b.latLngBounds(a);
            var c, e, f = this._southWest,
            k = this._northEast;
            return a instanceof b.LatLngBounds ? (c = a.getSouthWest(), e = a.getNorthEast()) : c = e = a,
            c.lat >= f.lat && e.lat <= k.lat && c.lng >= f.lng && e.lng <= k.lng
        },
        intersects: function(a) {
            a = b.latLngBounds(a);
            var c = this._southWest,
            e = this._northEast,
            f = a.getSouthWest();
            a = a.getNorthEast();
            var k = a.lng >= c.lng && f.lng <= e.lng;
            return a.lat >= c.lat && f.lat <= e.lat && k
        },
        overlaps: function(a) {
            a = b.latLngBounds(a);
            var c = this._southWest,
            e = this._northEast,
            f = a.getSouthWest();
            a = a.getNorthEast();
            var k = a.lng > c.lng && f.lng < e.lng;
            return a.lat > c.lat && f.lat < e.lat && k
        },
        toBBoxString: function() {
            return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join()
        },
        equals: function(a) {
            return !! a && (a = b.latLngBounds(a), this._southWest.equals(a.getSouthWest()) && this._northEast.equals(a.getNorthEast()))
        },
        isValid: function() {
            return ! (!this._southWest || !this._northEast)
        }
    };
    b.latLngBounds = function(a, c) {
        return a instanceof b.LatLngBounds ? a: new b.LatLngBounds(a, c)
    };
    b.Projection = {};
    b.Projection.LonLat = {
        project: function(a) {
            return new b.Point(a.lng, a.lat)
        },
        unproject: function(a) {
            return new b.LatLng(a.y, a.x)
        },
        bounds: b.bounds([ - 180, -90], [180, 90])
    };
    b.Projection.SphericalMercator = {
        R: 6378137,
        MAX_LATITUDE: 85.0511287798,
        project: function(a) {
            var c = Math.PI / 180,
            e = this.MAX_LATITUDE,
            e = Math.sin(Math.max(Math.min(e, a.lat), -e) * c);
            return new b.Point(this.R * a.lng * c, this.R * Math.log((1 + e) / (1 - e)) / 2)
        },
        unproject: function(a) {
            var c = 180 / Math.PI;
            return new b.LatLng((2 * Math.atan(Math.exp(a.y / this.R)) - Math.PI / 2) * c, a.x * c / this.R)
        },
        bounds: function() {
            var a = 6378137 * Math.PI;
            return b.bounds([ - a, -a], [a, a])
        } ()
    };
    b.CRS = {
        latLngToPoint: function(a, c) {
            var b = this.projection.project(a),
            f = this.scale(c);
            return this.transformation._transform(b, f)
        },
        pointToLatLng: function(a, c) {
            var b = this.scale(c),
            b = this.transformation.untransform(a, b);
            return this.projection.unproject(b)
        },
        project: function(a) {
            return this.projection.project(a)
        },
        unproject: function(a) {
            return this.projection.unproject(a)
        },
        scale: function(a) {
            return 256 * Math.pow(2, a)
        },
        zoom: function(a) {
            return Math.log(a / 256) / Math.LN2
        },
        getProjectedBounds: function(a) {
            if (this.infinite) return null;
            var c = this.projection.bounds,
            e = this.scale(a);
            a = this.transformation.transform(c.min, e);
            c = this.transformation.transform(c.max, e);
            return b.bounds(a, c)
        },
        infinite: !1,
        wrapLatLng: function(a) {
            var c = this.wrapLng ? b.Util.wrapNum(a.lng, this.wrapLng, !0) : a.lng,
            e = this.wrapLat ? b.Util.wrapNum(a.lat, this.wrapLat, !0) : a.lat;
            return b.latLng(e, c, a.alt)
        },
        wrapLatLngBounds: function(a) {
            var c = a.getCenter(),
            e = this.wrapLatLng(c),
            f = c.lat - e.lat,
            c = c.lng - e.lng;
            if (0 === f && 0 === c) return a;
            e = a.getSouthWest();
            a = a.getNorthEast();
            e = b.latLng({
                lat: e.lat - f,
                lng: e.lng - c
            });
            f = b.latLng({
                lat: a.lat - f,
                lng: a.lng - c
            });
            return new b.LatLngBounds(e, f)
        }
    };
    b.CRS.Simple = b.extend({},
    b.CRS, {
        projection: b.Projection.LonLat,
        transformation: new b.Transformation(1, 0, -1, 0),
        scale: function(a) {
            return Math.pow(2, a)
        },
        zoom: function(a) {
            return Math.log(a) / Math.LN2
        },
        distance: function(a, c) {
            var b = c.lng - a.lng,
            f = c.lat - a.lat;
            return Math.sqrt(b * b + f * f)
        },
        infinite: !0
    });
    b.CRS.Earth = b.extend({},
    b.CRS, {
        wrapLng: [ - 180, 180],
        R: 6371E3,
        distance: function(a, c) {
            var b = Math.PI / 180,
            f = a.lat * b,
            k = c.lat * b;
            return this.R * Math.acos(Math.min(Math.sin(f) * Math.sin(k) + Math.cos(f) * Math.cos(k) * Math.cos((c.lng - a.lng) * b), 1))
        }
    });
    b.CRS.EPSG3857 = b.extend({},
    b.CRS.Earth, {
        code: "EPSG:3857",
        projection: b.Projection.SphericalMercator,
        transformation: function() {
            var a = .5 / (Math.PI * b.Projection.SphericalMercator.R);
            return new b.Transformation(a, .5, -a, .5)
        } ()
    });
    b.CRS.EPSG900913 = b.extend({},
    b.CRS.EPSG3857, {
        code: "EPSG:900913"
    });
    b.CRS.EPSG4326 = b.extend({},
    b.CRS.Earth, {
        code: "EPSG:4326",
        projection: b.Projection.LonLat,
        transformation: new b.Transformation(1 / 180, 1, -1 / 180, .5)
    });
    b.Map = b.Evented.extend({
        options: {
            crs: b.CRS.EPSG3857,
            center: l,
            zoom: l,
            minZoom: l,
            maxZoom: l,
            layers: [],
            maxBounds: l,
            renderer: l,
            zoomAnimation: !0,
            zoomAnimationThreshold: 4,
            fadeAnimation: !0,
            markerZoomAnimation: !0,
            transform3DLimit: 8388608,
            zoomSnap: 1,
            zoomDelta: 1,
            trackResize: !0
        },
        initialize: function(a, c) {
            c = b.setOptions(this, c);
            this._initContainer(a);
            this._initLayout();
            this._onResize = b.bind(this._onResize, this);
            this._initEvents();
            c.maxBounds && this.setMaxBounds(c.maxBounds);
            c.zoom !== l && (this._zoom = this._limitZoom(c.zoom));
            c.center && c.zoom !== l && this.setView(b.latLng(c.center), c.zoom, {
                reset: !0
            });
            this._handlers = [];
            this._layers = {};
            this._zoomBoundLayers = {};
            this._sizeChanged = !0;
            this.callInitHooks(); (this._zoomAnimated = b.DomUtil.TRANSITION && b.Browser.any3d && !b.Browser.mobileOpera && this.options.zoomAnimation) && (this._createAnimProxy(), b.DomEvent.on(this._proxy, b.DomUtil.TRANSITION_END, this._catchTransitionEnd, this));
            this._addLayers(this.options.layers)
        },
        setView: function(a, c, e) {
            if (c = c === l ? this._zoom: this._limitZoom(c), a = this._limitCenter(b.latLng(a), c, this.options.maxBounds), e = e || {},
            this._stop(), this._loaded && !e.reset && !0 !== e) if (e.animate !== l && (e.zoom = b.extend({
                animate: e.animate
            },
            e.zoom), e.pan = b.extend({
                animate: e.animate,
                duration: e.duration
            },
            e.pan)), this._zoom !== c ? this._tryAnimatedZoom && this._tryAnimatedZoom(a, c, e.zoom) : this._tryAnimatedPan(a, e.pan)) return clearTimeout(this._sizeTimer),
            this;
            return this._resetView(a, c),
            this
        },
        setZoom: function(a, c) {
            return this._loaded ? this.setView(this.getCenter(), a, {
                zoom: c
            }) : (this._zoom = a, this)
        },
        zoomIn: function(a, c) {
            return a = a || (b.Browser.any3d ? this.options.zoomDelta: 1),
            this.setZoom(this._zoom + a, c)
        },
        zoomOut: function(a, c) {
            return a = a || (b.Browser.any3d ? this.options.zoomDelta: 1),
            this.setZoom(this._zoom - a, c)
        },
        setZoomAround: function(a, c, e) {
            var f = this.getZoomScale(c),
            k = this.getSize().divideBy(2);
            a = (a instanceof b.Point ? a: this.latLngToContainerPoint(a)).subtract(k).multiplyBy(1 - 1 / f);
            k = this.containerPointToLatLng(k.add(a));
            return this.setView(k, c, {
                zoom: e
            })
        },
        _getBoundsCenterZoom: function(a, c) {
            c = c || {};
            a = a.getBounds ? a.getBounds() : b.latLngBounds(a);
            var e = b.point(c.paddingTopLeft || c.padding || [0, 0]),
            f = b.point(c.paddingBottomRight || c.padding || [0, 0]),
            k = this.getBoundsZoom(a, !1, e.add(f)),
            k = "number" == typeof c.maxZoom ? Math.min(c.maxZoom, k) : k,
            e = f.subtract(e).divideBy(2),
            f = this.project(a.getSouthWest(), k),
            d = this.project(a.getNorthEast(), k);
            return {
                center: this.unproject(f.add(d).divideBy(2).add(e), k),
                zoom: k
            }
        },
        fitBounds: function(a, c) {
            if (a = b.latLngBounds(a), !a.isValid()) throw Error("Bounds are not valid.");
            var e = this._getBoundsCenterZoom(a, c);
            return this.setView(e.center, e.zoom, c)
        },
        fitWorld: function(a) {
            return this.fitBounds([[ - 90, -180], [90, 180]], a)
        },
        panTo: function(a, c) {
            return this.setView(a, this._zoom, {
                pan: c
            })
        },
        panBy: function(a, c) {
            if (a = b.point(a).round(), c = c || {},
            !a.x && !a.y) return this.fire("moveend");
            if (!0 !== c.animate && !this.getSize().contains(a)) return this._resetView(this.unproject(this.project(this.getCenter()).add(a)), this.getZoom()),
            this;
            if (this._panAnim || (this._panAnim = new b.PosAnimation, this._panAnim.on({
                step: this._onPanTransitionStep,
                end: this._onPanTransitionEnd
            },
            this)), c.noMoveStart || this.fire("movestart"), !1 !== c.animate) {
                b.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
                var e = this._getMapPanePos().subtract(a).round();
                this._panAnim.run(this._mapPane, e, c.duration || .25, c.easeLinearity)
            } else this._rawPanBy(a),
            this.fire("move").fire("moveend");
            return this
        },
        flyTo: function(a, c, e) {
            function f(a) {
                a = (y * y - t * t + (a ? -1 : 1) * A * A * z * z) / (2 * (a ? y: t) * A * z);
                a = Math.sqrt(a * a + 1) - a;
                return 1E-9 > a ? -18 : Math.log(a)
            }
            function k(a) {
                return (Math.exp(a) + Math.exp( - a)) / 2
            }
            function d(a) {
                return t * (k(B) / k(B + w * a))
            }
            function g(a) {
                var c = t,
                b = k(B);
                a = B + w * a;
                a = (Math.exp(a) - Math.exp( - a)) / 2 / k(a);
                return c * (b * a - (Math.exp(B) - Math.exp( - B)) / 2) / A
            }
            function m() {
                var e = (Date.now() - C) / E,
                f = (1 - Math.pow(1 - e, 1.5)) * D;
                1 >= e ? (this._flyToFrame = b.Util.requestAnimFrame(m, this), this._move(this.unproject(h.add(r.subtract(h).multiplyBy(g(f) / z)), q), this.getScaleZoom(t / d(f), q), {
                    flyTo: !0
                })) : this._move(a, c)._moveEnd(!0)
            }
            if (e = e || {},
            !1 === e.animate || !b.Browser.any3d) return this.setView(a, c, e);
            this._stop();
            var h = this.project(this.getCenter()),
            r = this.project(a),
            p = this.getSize(),
            q = this._zoom;
            a = b.latLng(a);
            c = c === l ? q: c;
            var t = Math.max(p.x, p.y),
            y = t * this.getZoomScale(q, c),
            z = r.distanceTo(h) || 1,
            w = 1.42,
            A = w * w,
            B = f(0),
            C = Date.now(),
            D = (f(1) - B) / w,
            E = e.duration ? 1E3 * e.duration: 800 * D;
            return this._moveStart(!0),
            m.call(this),
            this
        },
        flyToBounds: function(a, c) {
            var b = this._getBoundsCenterZoom(a, c);
            return this.flyTo(b.center, b.zoom, c)
        },
        setMaxBounds: function(a) {
            return a = b.latLngBounds(a),
            a.isValid() ? (this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this.options.maxBounds = a, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this.off("moveend", this._panInsideMaxBounds))
        },
        setMinZoom: function(a) {
            return this.options.minZoom = a,
            this._loaded && this.getZoom() < this.options.minZoom ? this.setZoom(a) : this
        },
        setMaxZoom: function(a) {
            return this.options.maxZoom = a,
            this._loaded && this.getZoom() > this.options.maxZoom ? this.setZoom(a) : this
        },
        panInsideBounds: function(a, c) {
            this._enforcingBounds = !0;
            var e = this.getCenter(),
            f = this._limitCenter(e, this._zoom, b.latLngBounds(a));
            return e.equals(f) || this.panTo(f, c),
            this._enforcingBounds = !1,
            this
        },
        invalidateSize: function(a) {
            if (!this._loaded) return this;
            a = b.extend({
                animate: !1,
                pan: !0
            },
            !0 === a ? {
                animate: !0
            }: a);
            var c = this.getSize();
            this._sizeChanged = !0;
            this._lastCenter = null;
            var e = this.getSize(),
            f = c.divideBy(2).round(),
            k = e.divideBy(2).round(),
            f = f.subtract(k);
            return f.x || f.y ? (a.animate && a.pan ? this.panBy(f) : (a.pan && this._rawPanBy(f), this.fire("move"), a.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(b.bind(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
                oldSize: c,
                newSize: e
            })) : this
        },
        stop: function() {
            return this.setZoom(this._limitZoom(this._zoom)),
            this.options.zoomSnap || this.fire("viewreset"),
            this._stop()
        },
        locate: function(a) {
            if (a = this._locateOptions = b.extend({
                timeout: 1E4,
                watch: !1
            },
            a), !("geolocation" in navigator)) return this._handleGeolocationError({
                code: 0,
                message: "Geolocation not supported."
            }),
            this;
            var c = b.bind(this._handleGeolocationResponse, this),
            e = b.bind(this._handleGeolocationError, this);
            return a.watch ? this._locationWatchId = navigator.geolocation.watchPosition(c, e, a) : navigator.geolocation.getCurrentPosition(c, e, a),
            this
        },
        stopLocate: function() {
            return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId),
            this._locateOptions && (this._locateOptions.setView = !1),
            this
        },
        _handleGeolocationError: function(a) {
            var c = a.code;
            a = a.message || (1 === c ? "permission denied": 2 === c ? "position unavailable": "timeout");
            this._locateOptions.setView && !this._loaded && this.fitWorld();
            this.fire("locationerror", {
                code: c,
                message: "Geolocation error: " + a + "."
            })
        },
        _handleGeolocationResponse: function(a) {
            var c = new b.LatLng(a.coords.latitude, a.coords.longitude),
            e = c.toBounds(a.coords.accuracy),
            f = this._locateOptions;
            if (f.setView) {
                var k = this.getBoundsZoom(e);
                this.setView(c, f.maxZoom ? Math.min(k, f.maxZoom) : k)
            }
            var c = {
                latlng: c,
                bounds: e,
                timestamp: a.timestamp
            },
            d;
            for (d in a.coords)"number" == typeof a.coords[d] && (c[d] = a.coords[d]);
            this.fire("locationfound", c)
        },
        addHandler: function(a, c) {
            if (!c) return this;
            var b = this[a] = new c(this);
            return this._handlers.push(b),
            this.options[a] && b.enable(),
            this
        },
        remove: function() {
            if (this._initEvents(!0), this._containerId !== this._container._leaflet_id) throw Error("Map container is being reused by another instance");
            try {
                delete this._container._leaflet_id,
                delete this._containerId
            } catch(c) {
                this._containerId = this._container._leaflet_id = l
            }
            b.DomUtil.remove(this._mapPane);
            this._clearControlPos && this._clearControlPos();
            this._clearHandlers();
            this._loaded && this.fire("unload");
            for (var a in this._layers) this._layers[a].remove();
            return this
        },
        createPane: function(a, c) {
            var e = "leaflet-pane" + (a ? " leaflet-" + a.replace("Pane", "") + "-pane": ""),
            e = b.DomUtil.create("div", e, c || this._mapPane);
            return a && (this._panes[a] = e),
            e
        },
        getCenter: function() {
            return this._checkIfLoaded(),
            this._lastCenter && !this._moved() ? this._lastCenter: this.layerPointToLatLng(this._getCenterLayerPoint())
        },
        getZoom: function() {
            return this._zoom
        },
        getBounds: function() {
            var a = this.getPixelBounds(),
            c = this.unproject(a.getBottomLeft()),
            a = this.unproject(a.getTopRight());
            return new b.LatLngBounds(c, a)
        },
        getMinZoom: function() {
            return this.options.minZoom === l ? this._layersMinZoom || 0 : this.options.minZoom
        },
        getMaxZoom: function() {
            return this.options.maxZoom === l ? this._layersMaxZoom === l ? 1 / 0 : this._layersMaxZoom: this.options.maxZoom
        },
        getBoundsZoom: function(a, c, e) {
            a = b.latLngBounds(a);
            e = b.point(e || [0, 0]);
            var f = this.getZoom() || 0,
            k = this.getMinZoom(),
            d = this.getMaxZoom(),
            g = a.getNorthWest();
            a = a.getSouthEast();
            e = this.getSize().subtract(e);
            g = b.bounds(this.project(a, f), this.project(g, f)).getSize();
            a = b.Browser.any3d ? this.options.zoomSnap: 1;
            return f = this.getScaleZoom(Math.min(e.x / g.x, e.y / g.y), f),
            a && (f = a / 100 * Math.round(f / (a / 100)), f = c ? Math.ceil(f / a) * a: Math.floor(f / a) * a),
            Math.max(k, Math.min(d, f))
        },
        getSize: function() {
            return this._size && !this._sizeChanged || (this._size = new b.Point(this._container.clientWidth || 0, this._container.clientHeight || 0), this._sizeChanged = !1),
            this._size.clone()
        },
        getPixelBounds: function(a, c) {
            var e = this._getTopLeftPoint(a, c);
            return new b.Bounds(e, e.add(this.getSize()))
        },
        getPixelOrigin: function() {
            return this._checkIfLoaded(),
            this._pixelOrigin
        },
        getPixelWorldBounds: function(a) {
            return this.options.crs.getProjectedBounds(a === l ? this.getZoom() : a)
        },
        getPane: function(a) {
            return "string" == typeof a ? this._panes[a] : a
        },
        getPanes: function() {
            return this._panes
        },
        getContainer: function() {
            return this._container
        },
        getZoomScale: function(a, c) {
            var b = this.options.crs;
            return c = c === l ? this._zoom: c,
            b.scale(a) / b.scale(c)
        },
        getScaleZoom: function(a, c) {
            var b = this.options.crs;
            c = c === l ? this._zoom: c;
            b = b.zoom(a * b.scale(c));
            return isNaN(b) ? 1 / 0 : b
        },
        project: function(a, c) {
            return c = c === l ? this._zoom: c,
            this.options.crs.latLngToPoint(b.latLng(a), c)
        },
        unproject: function(a, c) {
            return c = c === l ? this._zoom: c,
            this.options.crs.pointToLatLng(b.point(a), c)
        },
        layerPointToLatLng: function(a) {
            a = b.point(a).add(this.getPixelOrigin());
            return this.unproject(a)
        },
        latLngToLayerPoint: function(a) {
            return this.project(b.latLng(a))._round()._subtract(this.getPixelOrigin())
        },
        wrapLatLng: function(a) {
            return this.options.crs.wrapLatLng(b.latLng(a))
        },
        wrapLatLngBounds: function(a) {
            return this.options.crs.wrapLatLngBounds(b.latLngBounds(a))
        },
        distance: function(a, c) {
            return this.options.crs.distance(b.latLng(a), b.latLng(c))
        },
        containerPointToLayerPoint: function(a) {
            return b.point(a).subtract(this._getMapPanePos())
        },
        layerPointToContainerPoint: function(a) {
            return b.point(a).add(this._getMapPanePos())
        },
        containerPointToLatLng: function(a) {
            a = this.containerPointToLayerPoint(b.point(a));
            return this.layerPointToLatLng(a)
        },
        latLngToContainerPoint: function(a) {
            return this.layerPointToContainerPoint(this.latLngToLayerPoint(b.latLng(a)))
        },
        mouseEventToContainerPoint: function(a) {
            return b.DomEvent.getMousePosition(a, this._container)
        },
        mouseEventToLayerPoint: function(a) {
            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(a))
        },
        mouseEventToLatLng: function(a) {
            return this.layerPointToLatLng(this.mouseEventToLayerPoint(a))
        },
        _initContainer: function(a) {
            a = this._container = b.DomUtil.get(a);
            if (!a) throw Error("Map container not found.");
            if (a._leaflet_id) throw Error("Map container is already initialized.");
            b.DomEvent.addListener(a, "scroll", this._onScroll, this);
            this._containerId = b.Util.stamp(a)
        },
        _initLayout: function() {
            var a = this._container;
            this._fadeAnimated = this.options.fadeAnimation && b.Browser.any3d;
            b.DomUtil.addClass(a, "leaflet-container" + (b.Browser.touch ? " leaflet-touch": "") + (b.Browser.retina ? " leaflet-retina": "") + (b.Browser.ielt9 ? " leaflet-oldie": "") + (b.Browser.safari ? " leaflet-safari": "") + (this._fadeAnimated ? " leaflet-fade-anim": ""));
            var c = b.DomUtil.getStyle(a, "position");
            "absolute" !== c && "relative" !== c && "fixed" !== c && (a.style.position = "relative");
            this._initPanes();
            this._initControlPos && this._initControlPos()
        },
        _initPanes: function() {
            var a = this._panes = {};
            this._paneRenderers = {};
            this._mapPane = this.createPane("mapPane", this._container);
            b.DomUtil.setPosition(this._mapPane, new b.Point(0, 0));
            this.createPane("tilePane");
            this.createPane("shadowPane");
            this.createPane("overlayPane");
            this.createPane("markerPane");
            this.createPane("tooltipPane");
            this.createPane("popupPane");
            this.options.markerZoomAnimation || (b.DomUtil.addClass(a.markerPane, "leaflet-zoom-hide"), b.DomUtil.addClass(a.shadowPane, "leaflet-zoom-hide"))
        },
        _resetView: function(a, c) {
            b.DomUtil.setPosition(this._mapPane, new b.Point(0, 0));
            var e = !this._loaded;
            this._loaded = !0;
            c = this._limitZoom(c);
            this.fire("viewprereset");
            var f = this._zoom !== c;
            this._moveStart(f)._move(a, c)._moveEnd(f);
            this.fire("viewreset");
            e && this.fire("load")
        },
        _moveStart: function(a) {
            return a && this.fire("zoomstart"),
            this.fire("movestart")
        },
        _move: function(a, c, b) {
            c === l && (c = this._zoom);
            var e = this._zoom !== c;
            return this._zoom = c,
            this._lastCenter = a,
            this._pixelOrigin = this._getNewPixelOrigin(a),
            (e || b && b.pinch) && this.fire("zoom", b),
            this.fire("move", b)
        },
        _moveEnd: function(a) {
            return a && this.fire("zoomend"),
            this.fire("moveend")
        },
        _stop: function() {
            return b.Util.cancelAnimFrame(this._flyToFrame),
            this._panAnim && this._panAnim.stop(),
            this
        },
        _rawPanBy: function(a) {
            b.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(a))
        },
        _getZoomSpan: function() {
            return this.getMaxZoom() - this.getMinZoom()
        },
        _panInsideMaxBounds: function() {
            this._enforcingBounds || this.panInsideBounds(this.options.maxBounds)
        },
        _checkIfLoaded: function() {
            if (!this._loaded) throw Error("Set map center and zoom first.");
        },
        _initEvents: function(a) {
            b.DomEvent && (this._targets = {},
            this._targets[b.stamp(this._container)] = this, a = a ? "off": "on", b.DomEvent[a](this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress", this._handleDOMEvent, this), this.options.trackResize && b.DomEvent[a](d, "resize", this._onResize, this), b.Browser.any3d && this.options.transform3DLimit && this[a]("moveend", this._onMoveEnd))
        },
        _onResize: function() {
            b.Util.cancelAnimFrame(this._resizeRequest);
            this._resizeRequest = b.Util.requestAnimFrame(function() {
                this.invalidateSize({
                    debounceMoveend: !0
                })
            },
            this)
        },
        _onScroll: function() {
            this._container.scrollTop = 0;
            this._container.scrollLeft = 0
        },
        _onMoveEnd: function() {
            var a = this._getMapPanePos();
            Math.max(Math.abs(a.x), Math.abs(a.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom())
        },
        _findEventTargets: function(a, c) {
            for (var e, f = [], k = "mouseout" === c || "mouseover" === c, d = a.target || a.srcElement, g = !1; d;) {
                if (e = this._targets[b.stamp(d)], e && ("click" === c || "preclick" === c) && !a._simulated && this._draggableMoved(e)) {
                    g = !0;
                    break
                }
                if (e && e.listens(c, !0)) {
                    if (k && !b.DomEvent._isExternalTarget(d, a)) break;
                    if (f.push(e), k) break
                }
                if (d === this._container) break;
                d = d.parentNode
            }
            return f.length || g || k || !b.DomEvent._isExternalTarget(d, a) || (f = [this]),
            f
        },
        _handleDOMEvent: function(a) {
            if (this._loaded && !b.DomEvent._skipped(a)) {
                var c = "keypress" === a.type && 13 === a.keyCode ? "click": a.type;
                "mousedown" === c && b.DomUtil.preventOutline(a.target || a.srcElement);
                this._fireDOMEvent(a, c)
            }
        },
        _fireDOMEvent: function(a, c, e) {
            if ("click" === a.type) {
                var f = b.Util.extend({},
                a);
                f.type = "preclick";
                this._fireDOMEvent(f, f.type, e)
            }
            if (!a._stopped && (e = (e || []).concat(this._findEventTargets(a, c)), e.length)) {
                var k = e[0];
                "contextmenu" === c && k.listens(c, !0) && b.DomEvent.preventDefault(a);
                f = {
                    originalEvent: a
                };
                if ("keypress" !== a.type) {
                    var d = k instanceof b.Marker;
                    f.containerPoint = d ? this.latLngToContainerPoint(k.getLatLng()) : this.mouseEventToContainerPoint(a);
                    f.layerPoint = this.containerPointToLayerPoint(f.containerPoint);
                    f.latlng = d ? k.getLatLng() : this.layerPointToLatLng(f.layerPoint)
                }
                for (a = 0; a < e.length && !(e[a].fire(c, f, !0), f.originalEvent._stopped || e[a].options.nonBubblingEvents && -1 !== b.Util.indexOf(e[a].options.nonBubblingEvents, c)); a++);
            }
        },
        _draggableMoved: function(a) {
            return a = a.dragging && a.dragging.enabled() ? a: this,
            a.dragging && a.dragging.moved() || this.boxZoom && this.boxZoom.moved()
        },
        _clearHandlers: function() {
            for (var a = 0,
            c = this._handlers.length; a < c; a++) this._handlers[a].disable()
        },
        whenReady: function(a, c) {
            return this._loaded ? a.call(c || this, {
                target: this
            }) : this.on("load", a, c),
            this
        },
        _getMapPanePos: function() {
            return b.DomUtil.getPosition(this._mapPane) || new b.Point(0, 0)
        },
        _moved: function() {
            var a = this._getMapPanePos();
            return a && !a.equals([0, 0])
        },
        _getTopLeftPoint: function(a, c) {
            return (a && c !== l ? this._getNewPixelOrigin(a, c) : this.getPixelOrigin()).subtract(this._getMapPanePos())
        },
        _getNewPixelOrigin: function(a, c) {
            var b = this.getSize()._divideBy(2);
            return this.project(a, c)._subtract(b)._add(this._getMapPanePos())._round()
        },
        _latLngToNewLayerPoint: function(a, c, b) {
            b = this._getNewPixelOrigin(b, c);
            return this.project(a, c)._subtract(b)
        },
        _latLngBoundsToNewLayerBounds: function(a, c, e) {
            e = this._getNewPixelOrigin(e, c);
            return b.bounds([this.project(a.getSouthWest(), c)._subtract(e), this.project(a.getNorthWest(), c)._subtract(e), this.project(a.getSouthEast(), c)._subtract(e), this.project(a.getNorthEast(), c)._subtract(e)])
        },
        _getCenterLayerPoint: function() {
            return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
        },
        _getCenterOffset: function(a) {
            return this.latLngToLayerPoint(a).subtract(this._getCenterLayerPoint())
        },
        _limitCenter: function(a, c, e) {
            if (!e) return a;
            var f = this.project(a, c),
            k = this.getSize().divideBy(2),
            k = new b.Bounds(f.subtract(k), f.add(k));
            e = this._getBoundsOffset(k, e, c);
            return e.round().equals([0, 0]) ? a: this.unproject(f.add(e), c)
        },
        _limitOffset: function(a, c) {
            if (!c) return a;
            var e = this.getPixelBounds(),
            e = new b.Bounds(e.min.add(a), e.max.add(a));
            return a.add(this._getBoundsOffset(e, c))
        },
        _getBoundsOffset: function(a, c, e) {
            e = b.bounds(this.project(c.getNorthEast(), e), this.project(c.getSouthWest(), e));
            c = e.min.subtract(a.min);
            e = e.max.subtract(a.max);
            a = this._rebound(c.x, -e.x);
            c = this._rebound(c.y, -e.y);
            return new b.Point(a, c)
        },
        _rebound: function(a, c) {
            return 0 < a + c ? Math.round(a - c) / 2 : Math.max(0, Math.ceil(a)) - Math.max(0, Math.floor(c))
        },
        _limitZoom: function(a) {
            var c = this.getMinZoom(),
            e = this.getMaxZoom(),
            f = b.Browser.any3d ? this.options.zoomSnap: 1;
            return f && (a = Math.round(a / f) * f),
            Math.max(c, Math.min(e, a))
        },
        _onPanTransitionStep: function() {
            this.fire("move")
        },
        _onPanTransitionEnd: function() {
            b.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim");
            this.fire("moveend")
        },
        _tryAnimatedPan: function(a, c) {
            var b = this._getCenterOffset(a)._floor();
            return ! (!0 !== (c && c.animate) && !this.getSize().contains(b)) && (this.panBy(b, c), !0)
        },
        _createAnimProxy: function() {
            var a = this._proxy = b.DomUtil.create("div", "leaflet-proxy leaflet-zoom-animated");
            this._panes.mapPane.appendChild(a);
            this.on("zoomanim",
            function(c) {
                var e = b.DomUtil.TRANSFORM,
                f = a.style[e];
                b.DomUtil.setTransform(a, this.project(c.center, c.zoom), this.getZoomScale(c.zoom, 1));
                f === a.style[e] && this._animatingZoom && this._onZoomTransitionEnd()
            },
            this);
            this.on("load moveend",
            function() {
                var c = this.getCenter(),
                e = this.getZoom();
                b.DomUtil.setTransform(a, this.project(c, e), this.getZoomScale(e, 1))
            },
            this)
        },
        _catchTransitionEnd: function(a) {
            this._animatingZoom && 0 <= a.propertyName.indexOf("transform") && this._onZoomTransitionEnd()
        },
        _nothingToAnimate: function() {
            return ! this._container.getElementsByClassName("leaflet-zoom-animated").length
        },
        _tryAnimatedZoom: function(a, c, e) {
            if (this._animatingZoom) return ! 0;
            if (e = e || {},
            !this._zoomAnimated || !1 === e.animate || this._nothingToAnimate() || Math.abs(c - this._zoom) > this.options.zoomAnimationThreshold) return ! 1;
            var f = this.getZoomScale(c),
            f = this._getCenterOffset(a)._divideBy(1 - 1 / f);
            return ! (!0 !== e.animate && !this.getSize().contains(f)) && (b.Util.requestAnimFrame(function() {
                this._moveStart(!0)._animateZoom(a, c, !0)
            },
            this), !0)
        },
        _animateZoom: function(a, c, e, f) {
            e && (this._animatingZoom = !0, this._animateToCenter = a, this._animateToZoom = c, b.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim"));
            this.fire("zoomanim", {
                center: a,
                zoom: c,
                noUpdate: f
            });
            setTimeout(b.bind(this._onZoomTransitionEnd, this), 250)
        },
        _onZoomTransitionEnd: function() {
            this._animatingZoom && (b.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom), b.Util.requestAnimFrame(function() {
                this._moveEnd(!0)
            },
            this))
        }
    });
    b.map = function(a, c) {
        return new b.Map(a, c)
    };
    b.Layer = b.Evented.extend({
        options: {
            pane: "overlayPane",
            nonBubblingEvents: [],
            attribution: null
        },
        addTo: function(a) {
            return a.addLayer(this),
            this
        },
        remove: function() {
            return this.removeFrom(this._map || this._mapToAdd)
        },
        removeFrom: function(a) {
            return a && a.removeLayer(this),
            this
        },
        getPane: function(a) {
            return this._map.getPane(a ? this.options[a] || a: this.options.pane)
        },
        addInteractiveTarget: function(a) {
            return this._map._targets[b.stamp(a)] = this,
            this
        },
        removeInteractiveTarget: function(a) {
            return delete this._map._targets[b.stamp(a)],
            this
        },
        getAttribution: function() {
            return this.options.attribution
        },
        _layerAdd: function(a) {
            var c = a.target;
            if (c.hasLayer(this)) {
                if (this._map = c, this._zoomAnimated = c._zoomAnimated, this.getEvents) {
                    var b = this.getEvents();
                    c.on(b, this);
                    this.once("remove",
                    function() {
                        c.off(b, this)
                    },
                    this)
                }
                this.onAdd(c);
                this.getAttribution && c.attributionControl && c.attributionControl.addAttribution(this.getAttribution());
                this.fire("add");
                c.fire("layeradd", {
                    layer: this
                })
            }
        }
    });
    b.Map.include({
        addLayer: function(a) {
            var c = b.stamp(a);
            return this._layers[c] ? this: (this._layers[c] = a, a._mapToAdd = this, a.beforeAdd && a.beforeAdd(this), this.whenReady(a._layerAdd, a), this)
        },
        removeLayer: function(a) {
            var c = b.stamp(a);
            return this._layers[c] ? (this._loaded && a.onRemove(this), a.getAttribution && this.attributionControl && this.attributionControl.removeAttribution(a.getAttribution()), delete this._layers[c], this._loaded && (this.fire("layerremove", {
                layer: a
            }), a.fire("remove")), a._map = a._mapToAdd = null, this) : this
        },
        hasLayer: function(a) {
            return !! a && b.stamp(a) in this._layers
        },
        eachLayer: function(a, c) {
            for (var b in this._layers) a.call(c, this._layers[b]);
            return this
        },
        _addLayers: function(a) {
            a = a ? b.Util.isArray(a) ? a: [a] : [];
            for (var c = 0,
            e = a.length; c < e; c++) this.addLayer(a[c])
        },
        _addZoomLimit: function(a) { ! isNaN(a.options.maxZoom) && isNaN(a.options.minZoom) || (this._zoomBoundLayers[b.stamp(a)] = a, this._updateZoomLevels())
        },
        _removeZoomLimit: function(a) {
            a = b.stamp(a);
            this._zoomBoundLayers[a] && (delete this._zoomBoundLayers[a], this._updateZoomLevels())
        },
        _updateZoomLevels: function() {
            var a = 1 / 0,
            c = -(1 / 0),
            b = this._getZoomSpan(),
            f;
            for (f in this._zoomBoundLayers) var k = this._zoomBoundLayers[f].options,
            a = k.minZoom === l ? a: Math.min(a, k.minZoom),
            c = k.maxZoom === l ? c: Math.max(c, k.maxZoom);
            this._layersMaxZoom = c === -(1 / 0) ? l: c;
            this._layersMinZoom = a === 1 / 0 ? l: a;
            b !== this._getZoomSpan() && this.fire("zoomlevelschange");
            this.options.maxZoom === l && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom);
            this.options.minZoom === l && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom)
        }
    });
    b.DomEvent = {
        on: function(a, c, e, f) {
            if ("object" == typeof c) for (var k in c) this._on(a, k, c[k], e);
            else {
                c = b.Util.splitWords(c);
                k = 0;
                for (var d = c.length; k < d; k++) this._on(a, c[k], e, f)
            }
            return this
        },
        off: function(a, c, e, f) {
            if ("object" == typeof c) for (var k in c) this._off(a, k, c[k], e);
            else {
                c = b.Util.splitWords(c);
                k = 0;
                for (var d = c.length; k < d; k++) this._off(a, c[k], e, f)
            }
            return this
        },
        _on: function(a, c, e, f) {
            var k = c + b.stamp(e) + (f ? "_" + b.stamp(f) : "");
            if (a._leaflet_events && a._leaflet_events[k]) return this;
            var g = function(c) {
                return e.call(f || a, c || d.event)
            },
            m = g;
            return b.Browser.pointer && 0 === c.indexOf("touch") ? this.addPointerListener(a, c, g, k) : !b.Browser.touch || "dblclick" !== c || !this.addDoubleTapListener || b.Browser.pointer && b.Browser.chrome ? "addEventListener" in a ? "mousewheel" === c ? a.addEventListener("onwheel" in a ? "wheel": "mousewheel", g, !1) : "mouseenter" === c || "mouseleave" === c ? (g = function(c) {
                c = c || d.event;
                b.DomEvent._isExternalTarget(a, c) && m(c)
            },
            a.addEventListener("mouseenter" === c ? "mouseover": "mouseout", g, !1)) : ("click" === c && b.Browser.android && (g = function(a) {
                return b.DomEvent._filterClick(a, m)
            }), a.addEventListener(c, g, !1)) : "attachEvent" in a && a.attachEvent("on" + c, g) : this.addDoubleTapListener(a, g, k),
            a._leaflet_events = a._leaflet_events || {},
            a._leaflet_events[k] = g,
            this
        },
        _off: function(a, c, e, f) {
            e = c + b.stamp(e) + (f ? "_" + b.stamp(f) : "");
            return (f = a._leaflet_events && a._leaflet_events[e]) ? (b.Browser.pointer && 0 === c.indexOf("touch") ? this.removePointerListener(a, c, e) : b.Browser.touch && "dblclick" === c && this.removeDoubleTapListener ? this.removeDoubleTapListener(a, e) : "removeEventListener" in a ? "mousewheel" === c ? a.removeEventListener("onwheel" in a ? "wheel": "mousewheel", f, !1) : a.removeEventListener("mouseenter" === c ? "mouseover": "mouseleave" === c ? "mouseout": c, f, !1) : "detachEvent" in a && a.detachEvent("on" + c, f), a._leaflet_events[e] = null, this) : this
        },
        stopPropagation: function(a) {
            return a.stopPropagation ? a.stopPropagation() : a.originalEvent ? a.originalEvent._stopped = !0 : a.cancelBubble = !0,
            b.DomEvent._skipped(a),
            this
        },
        disableScrollPropagation: function(a) {
            return b.DomEvent.on(a, "mousewheel", b.DomEvent.stopPropagation)
        },
        disableClickPropagation: function(a) {
            var c = b.DomEvent.stopPropagation;
            return b.DomEvent.on(a, b.Draggable.START.join(" "), c),
            b.DomEvent.on(a, {
                click: b.DomEvent._fakeStop,
                dblclick: c
            })
        },
        preventDefault: function(a) {
            return a.preventDefault ? a.preventDefault() : a.returnValue = !1,
            this
        },
        stop: function(a) {
            return b.DomEvent.preventDefault(a).stopPropagation(a)
        },
        getMousePosition: function(a, c) {
            if (!c) return new b.Point(a.clientX, a.clientY);
            var e = c.getBoundingClientRect();
            return new b.Point(a.clientX - e.left - c.clientLeft, a.clientY - e.top - c.clientTop)
        },
        _wheelPxFactor: b.Browser.win && b.Browser.chrome ? 2 : b.Browser.gecko ? d.devicePixelRatio: 1,
        getWheelDelta: function(a) {
            return b.Browser.edge ? a.wheelDeltaY / 2 : a.deltaY && 0 === a.deltaMode ? -a.deltaY / b.DomEvent._wheelPxFactor: a.deltaY && 1 === a.deltaMode ? 20 * -a.deltaY: a.deltaY && 2 === a.deltaMode ? 60 * -a.deltaY: a.deltaX || a.deltaZ ? 0 : a.wheelDelta ? (a.wheelDeltaY || a.wheelDelta) / 2 : a.detail && 32765 > Math.abs(a.detail) ? 20 * -a.detail: a.detail ? a.detail / -32765 * 60 : 0
        },
        _skipEvents: {},
        _fakeStop: function(a) {
            b.DomEvent._skipEvents[a.type] = !0
        },
        _skipped: function(a) {
            var c = this._skipEvents[a.type];
            return this._skipEvents[a.type] = !1,
            c
        },
        _isExternalTarget: function(a, c) {
            var b = c.relatedTarget;
            if (!b) return ! 0;
            try {
                for (; b && b !== a;) b = b.parentNode
            } catch(f) {
                return ! 1
            }
            return b !== a
        },
        _filterClick: function(a, c) {
            var e = a.timeStamp || a.originalEvent && a.originalEvent.timeStamp,
            f = b.DomEvent._lastClick && e - b.DomEvent._lastClick;
            return f && 100 < f && 500 > f || a.target._simulatedClick && !a._simulated ? void b.DomEvent.stop(a) : (b.DomEvent._lastClick = e, void c(a))
        }
    };
    b.DomEvent.addListener = b.DomEvent.on;
    b.DomEvent.removeListener = b.DomEvent.off;
    b.PosAnimation = b.Evented.extend({
        run: function(a, c, e, f) {
            this.stop();
            this._el = a;
            this._inProgress = !0;
            this._duration = e || .25;
            this._easeOutPower = 1 / Math.max(f || .5, .2);
            this._startPos = b.DomUtil.getPosition(a);
            this._offset = c.subtract(this._startPos);
            this._startTime = +new Date;
            this.fire("start");
            this._animate()
        },
        stop: function() {
            this._inProgress && (this._step(!0), this._complete())
        },
        _animate: function() {
            this._animId = b.Util.requestAnimFrame(this._animate, this);
            this._step()
        },
        _step: function(a) {
            var c = +new Date - this._startTime,
            b = 1E3 * this._duration;
            c < b ? this._runFrame(this._easeOut(c / b), a) : (this._runFrame(1), this._complete())
        },
        _runFrame: function(a, c) {
            var e = this._startPos.add(this._offset.multiplyBy(a));
            c && e._round();
            b.DomUtil.setPosition(this._el, e);
            this.fire("step")
        },
        _complete: function() {
            b.Util.cancelAnimFrame(this._animId);
            this._inProgress = !1;
            this.fire("end")
        },
        _easeOut: function(a) {
            return 1 - Math.pow(1 - a, this._easeOutPower)
        }
    });
    b.Projection.Mercator = {
        R: 6378137,
        R_MINOR: 6356752.314245179,
        bounds: b.bounds([ - 2.003750834279E7, -1.549657073972E7], [2.003750834279E7, 1.876465623138E7]),
        project: function(a) {
            var c = Math.PI / 180,
            e = this.R,
            f = a.lat * c,
            k = this.R_MINOR / e,
            k = Math.sqrt(1 - k * k),
            d = k * Math.sin(f);
            return f = -e * Math.log(Math.max(Math.tan(Math.PI / 4 - f / 2) / Math.pow((1 - d) / (1 + d), k / 2), 1E-10)),
            new b.Point(a.lng * c * e, f)
        },
        unproject: function(a) {
            var c, e = 180 / Math.PI,
            f = this.R,
            k = this.R_MINOR / f,
            k = Math.sqrt(1 - k * k),
            d = Math.exp( - a.y / f),
            g = Math.PI / 2 - 2 * Math.atan(d),
            m = 0;
            for (c = .1; 15 > m && 1E-7 < Math.abs(c); m++) c = k * Math.sin(g),
            c = Math.pow((1 - c) / (1 + c), k / 2),
            c = Math.PI / 2 - 2 * Math.atan(d * c) - g,
            g += c;
            return new b.LatLng(g * e, a.x * e / f)
        }
    };
    b.CRS.EPSG3395 = b.extend({},
    b.CRS.Earth, {
        code: "EPSG:3395",
        projection: b.Projection.Mercator,
        transformation: function() {
            var a = .5 / (Math.PI * b.Projection.Mercator.R);
            return new b.Transformation(a, .5, -a, .5)
        } ()
    });
    b.GridLayer = b.Layer.extend({
        options: {
            tileSize: 256,
            opacity: 1,
            updateWhenIdle: b.Browser.mobile,
            updateWhenZooming: !0,
            updateInterval: 200,
            zIndex: 1,
            bounds: null,
            minZoom: 0,
            maxZoom: l,
            noWrap: !1,
            pane: "tilePane",
            className: "",
            keepBuffer: 2
        },
        initialize: function(a) {
            b.setOptions(this, a)
        },
        onAdd: function() {
            this._initContainer();
            this._levels = {};
            this._tiles = {};
            this._resetView();
            this._update()
        },
        beforeAdd: function(a) {
            a._addZoomLimit(this)
        },
        onRemove: function(a) {
            this._removeAllTiles();
            b.DomUtil.remove(this._container);
            a._removeZoomLimit(this);
            this._tileZoom = this._container = null
        },
        bringToFront: function() {
            return this._map && (b.DomUtil.toFront(this._container), this._setAutoZIndex(Math.max)),
            this
        },
        bringToBack: function() {
            return this._map && (b.DomUtil.toBack(this._container), this._setAutoZIndex(Math.min)),
            this
        },
        getContainer: function() {
            return this._container
        },
        setOpacity: function(a) {
            return this.options.opacity = a,
            this._updateOpacity(),
            this
        },
        setZIndex: function(a) {
            return this.options.zIndex = a,
            this._updateZIndex(),
            this
        },
        isLoading: function() {
            return this._loading
        },
        redraw: function() {
            return this._map && (this._removeAllTiles(), this._update()),
            this
        },
        getEvents: function() {
            var a = {
                viewprereset: this._invalidateAll,
                viewreset: this._resetView,
                zoom: this._resetView,
                moveend: this._onMoveEnd
            };
            return this.options.updateWhenIdle || (this._onMove || (this._onMove = b.Util.throttle(this._onMoveEnd, this.options.updateInterval, this)), a.move = this._onMove),
            this._zoomAnimated && (a.zoomanim = this._animateZoom),
            a
        },
        createTile: function() {
            return h.createElement("div")
        },
        getTileSize: function() {
            var a = this.options.tileSize;
            return a instanceof b.Point ? a: new b.Point(a, a)
        },
        _updateZIndex: function() {
            this._container && this.options.zIndex !== l && null !== this.options.zIndex && (this._container.style.zIndex = this.options.zIndex)
        },
        _setAutoZIndex: function(a) {
            for (var c, b = this.getPane().children, f = -a( - (1 / 0), 1 / 0), k = 0, d = b.length; k < d; k++) c = b[k].style.zIndex,
            b[k] !== this._container && c && (f = a(f, +c));
            isFinite(f) && (this.options.zIndex = f + a( - 1, 1), this._updateZIndex())
        },
        _updateOpacity: function() {
            if (this._map && !b.Browser.ielt9) {
                b.DomUtil.setOpacity(this._container, this.options.opacity);
                var a = +new Date,
                c = !1,
                e = !1,
                f;
                for (f in this._tiles) {
                    var k = this._tiles[f];
                    if (k.current && k.loaded) {
                        var d = Math.min(1, (a - k.loaded) / 200);
                        b.DomUtil.setOpacity(k.el, d);
                        1 > d ? c = !0 : (k.active && (e = !0), k.active = !0)
                    }
                }
                e && !this._noPrune && this._pruneTiles();
                c && (b.Util.cancelAnimFrame(this._fadeFrame), this._fadeFrame = b.Util.requestAnimFrame(this._updateOpacity, this))
            }
        },
        _initContainer: function() {
            this._container || (this._container = b.DomUtil.create("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), 1 > this.options.opacity && this._updateOpacity(), this.getPane().appendChild(this._container))
        },
        _updateLevels: function() {
            var a = this._tileZoom,
            c = this.options.maxZoom;
            if (a === l) return l;
            for (var e in this._levels) this._levels[e].el.children.length || e === a ? this._levels[e].el.style.zIndex = c - Math.abs(a - e) : (b.DomUtil.remove(this._levels[e].el), this._removeTilesAtZoom(e), delete this._levels[e]);
            e = this._levels[a];
            var f = this._map;
            return e || (e = this._levels[a] = {},
            e.el = b.DomUtil.create("div", "leaflet-tile-container leaflet-zoom-animated", this._container), e.el.style.zIndex = c, e.origin = f.project(f.unproject(f.getPixelOrigin()), a).round(), e.zoom = a, this._setZoomTransform(e, f.getCenter(), f.getZoom()), b.Util.falseFn(e.el.offsetWidth)),
            this._level = e,
            e
        },
        _pruneTiles: function() {
            if (this._map) {
                var a, c, b = this._map.getZoom();
                if (b > this.options.maxZoom || b < this.options.minZoom) return void this._removeAllTiles();
                for (a in this._tiles) c = this._tiles[a],
                c.retain = c.current;
                for (a in this._tiles) if (c = this._tiles[a], c.current && !c.active) b = c.coords,
                this._retainParent(b.x, b.y, b.z, b.z - 5) || this._retainChildren(b.x, b.y, b.z, b.z + 2);
                for (a in this._tiles) this._tiles[a].retain || this._removeTile(a)
            }
        },
        _removeTilesAtZoom: function(a) {
            for (var c in this._tiles) this._tiles[c].coords.z === a && this._removeTile(c)
        },
        _removeAllTiles: function() {
            for (var a in this._tiles) this._removeTile(a)
        },
        _invalidateAll: function() {
            for (var a in this._levels) b.DomUtil.remove(this._levels[a].el),
            delete this._levels[a];
            this._removeAllTiles();
            this._tileZoom = null
        },
        _retainParent: function(a, c, e, f) {
            a = Math.floor(a / 2);
            c = Math.floor(c / 2); --e;
            var k = new b.Point( + a, +c);
            k.z = +e;
            k = this._tileCoordsToKey(k);
            return (k = this._tiles[k]) && k.active ? (k.retain = !0, !0) : (k && k.loaded && (k.retain = !0), e > f && this._retainParent(a, c, e, f))
        },
        _retainChildren: function(a, c, e, f) {
            for (var k = 2 * a; k < 2 * a + 2; k++) for (var d = 2 * c; d < 2 * c + 2; d++) {
                var g = new b.Point(k, d);
                g.z = e + 1;
                g = this._tileCoordsToKey(g); (g = this._tiles[g]) && g.active ? g.retain = !0 : (g && g.loaded && (g.retain = !0), e + 1 < f && this._retainChildren(k, d, e + 1, f))
            }
        },
        _resetView: function(a) {
            a = a && (a.pinch || a.flyTo);
            this._setView(this._map.getCenter(), this._map.getZoom(), a, a)
        },
        _animateZoom: function(a) {
            this._setView(a.center, a.zoom, !0, a.noUpdate)
        },
        _setView: function(a, c, b, f) {
            var e = Math.round(c); (this.options.maxZoom !== l && e > this.options.maxZoom || this.options.minZoom !== l && e < this.options.minZoom) && (e = l);
            var d = this.options.updateWhenZooming && e !== this._tileZoom;
            f && !d || (this._tileZoom = e, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), e !== l && this._update(a), b || this._pruneTiles(), this._noPrune = !!b);
            this._setZoomTransforms(a, c)
        },
        _setZoomTransforms: function(a, c) {
            for (var b in this._levels) this._setZoomTransform(this._levels[b], a, c)
        },
        _setZoomTransform: function(a, c, e) {
            var f = this._map.getZoomScale(e, a.zoom);
            c = a.origin.multiplyBy(f).subtract(this._map._getNewPixelOrigin(c, e)).round();
            b.Browser.any3d ? b.DomUtil.setTransform(a.el, c, f) : b.DomUtil.setPosition(a.el, c)
        },
        _resetGrid: function() {
            var a = this._map,
            c = a.options.crs,
            b = this._tileSize = this.getTileSize(),
            f = this._tileZoom,
            k = this._map.getPixelWorldBounds(this._tileZoom);
            k && (this._globalTileRange = this._pxBoundsToTileRange(k));
            this._wrapX = c.wrapLng && !this.options.noWrap && [Math.floor(a.project([0, c.wrapLng[0]], f).x / b.x), Math.ceil(a.project([0, c.wrapLng[1]], f).x / b.y)];
            this._wrapY = c.wrapLat && !this.options.noWrap && [Math.floor(a.project([c.wrapLat[0], 0], f).y / b.x), Math.ceil(a.project([c.wrapLat[1], 0], f).y / b.y)]
        },
        _onMoveEnd: function() {
            this._map && !this._map._animatingZoom && this._update()
        },
        _getTiledPixelBounds: function(a) {
            var c = this._map,
            e = c._animatingZoom ? Math.max(c._animateToZoom, c.getZoom()) : c.getZoom(),
            e = c.getZoomScale(e, this._tileZoom);
            a = c.project(a, this._tileZoom).floor();
            c = c.getSize().divideBy(2 * e);
            return new b.Bounds(a.subtract(c), a.add(c))
        },
        _update: function(a) {
            var c = this._map;
            if (c) {
                var e = c.getZoom();
                if (a === l && (a = c.getCenter()), this._tileZoom !== l) {
                    var c = this._getTiledPixelBounds(a),
                    f = this._pxBoundsToTileRange(c),
                    k = f.getCenter(),
                    c = [],
                    d = this.options.keepBuffer,
                    d = new b.Bounds(f.getBottomLeft().subtract([d, -d]), f.getTopRight().add([d, -d])),
                    g;
                    for (g in this._tiles) {
                        var m = this._tiles[g].coords;
                        m.z === this._tileZoom && d.contains(b.point(m.x, m.y)) || (this._tiles[g].current = !1)
                    }
                    if (1 < Math.abs(e - this._tileZoom)) return void this._setView(a, e);
                    for (e = f.min.y; e <= f.max.y; e++) for (a = f.min.x; a <= f.max.x; a++) if (g = new b.Point(a, e), g.z = this._tileZoom, this._isValidTile(g))(d = this._tiles[this._tileCoordsToKey(g)]) ? d.current = !0 : c.push(g);
                    if (c.sort(function(a, c) {
                        return a.distanceTo(k) - c.distanceTo(k)
                    }), 0 !== c.length) {
                        this._loading || (this._loading = !0, this.fire("loading"));
                        f = h.createDocumentFragment();
                        for (a = 0; a < c.length; a++) this._addTile(c[a], f);
                        this._level.el.appendChild(f)
                    }
                }
            }
        },
        _isValidTile: function(a) {
            var c = this._map.options.crs;
            if (!c.infinite) {
                var e = this._globalTileRange;
                if (!c.wrapLng && (a.x < e.min.x || a.x > e.max.x) || !c.wrapLat && (a.y < e.min.y || a.y > e.max.y)) return ! 1
            }
            if (!this.options.bounds) return ! 0;
            a = this._tileCoordsToBounds(a);
            return b.latLngBounds(this.options.bounds).overlaps(a)
        },
        _keyToBounds: function(a) {
            return this._tileCoordsToBounds(this._keyToTileCoords(a))
        },
        _tileCoordsToBounds: function(a) {
            var c = this._map,
            e = this.getTileSize(),
            f = a.scaleBy(e),
            e = f.add(e),
            f = c.unproject(f, a.z);
            a = c.unproject(e, a.z);
            a = new b.LatLngBounds(f, a);
            return this.options.noWrap || c.wrapLatLngBounds(a),
            a
        },
        _tileCoordsToKey: function(a) {
            return a.x + ":" + a.y + ":" + a.z
        },
        _keyToTileCoords: function(a) {
            a = a.split(":");
            var c = new b.Point( + a[0], +a[1]);
            return c.z = +a[2],
            c
        },
        _removeTile: function(a) {
            var c = this._tiles[a];
            c && (b.DomUtil.remove(c.el), delete this._tiles[a], this.fire("tileunload", {
                tile: c.el,
                coords: this._keyToTileCoords(a)
            }))
        },
        _initTile: function(a) {
            b.DomUtil.addClass(a, "leaflet-tile");
            var c = this.getTileSize();
            a.style.width = c.x + "px";
            a.style.height = c.y + "px";
            a.onselectstart = b.Util.falseFn;
            a.onmousemove = b.Util.falseFn;
            b.Browser.ielt9 && 1 > this.options.opacity && b.DomUtil.setOpacity(a, this.options.opacity);
            b.Browser.android && !b.Browser.android23 && (a.style.WebkitBackfaceVisibility = "hidden")
        },
        _addTile: function(a, c) {
            var e = this._getTilePos(a),
            f = this._tileCoordsToKey(a),
            k = this.createTile(this._wrapCoords(a), b.bind(this._tileReady, this, a));
            this._initTile(k);
            2 > this.createTile.length && b.Util.requestAnimFrame(b.bind(this._tileReady, this, a, null, k));
            b.DomUtil.setPosition(k, e);
            this._tiles[f] = {
                el: k,
                coords: a,
                current: !0
            };
            c.appendChild(k);
            this.fire("tileloadstart", {
                tile: k,
                coords: a
            })
        },
        _tileReady: function(a, c, e) {
            this._map && (c && this.fire("tileerror", {
                error: c,
                tile: e,
                coords: a
            }), e = this._tileCoordsToKey(a), (e = this._tiles[e]) && (e.loaded = +new Date, this._map._fadeAnimated ? (b.DomUtil.setOpacity(e.el, 0), b.Util.cancelAnimFrame(this._fadeFrame), this._fadeFrame = b.Util.requestAnimFrame(this._updateOpacity, this)) : (e.active = !0, this._pruneTiles()), c || (b.DomUtil.addClass(e.el, "leaflet-tile-loaded"), this.fire("tileload", {
                tile: e.el,
                coords: a
            })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), b.Browser.ielt9 || !this._map._fadeAnimated ? b.Util.requestAnimFrame(this._pruneTiles, this) : setTimeout(b.bind(this._pruneTiles, this), 250))))
        },
        _getTilePos: function(a) {
            return a.scaleBy(this.getTileSize()).subtract(this._level.origin)
        },
        _wrapCoords: function(a) {
            var c = new b.Point(this._wrapX ? b.Util.wrapNum(a.x, this._wrapX) : a.x, this._wrapY ? b.Util.wrapNum(a.y, this._wrapY) : a.y);
            return c.z = a.z,
            c
        },
        _pxBoundsToTileRange: function(a) {
            var c = this.getTileSize();
            return new b.Bounds(a.min.unscaleBy(c).floor(), a.max.unscaleBy(c).ceil().subtract([1, 1]))
        },
        _noTilesToLoad: function() {
            for (var a in this._tiles) if (!this._tiles[a].loaded) return ! 1;
            return ! 0
        }
    });
    b.gridLayer = function(a) {
        return new b.GridLayer(a)
    };
    b.TileLayer = b.GridLayer.extend({
        options: {
            minZoom: 0,
            maxZoom: 18,
            maxNativeZoom: null,
            minNativeZoom: null,
            subdomains: "abc",
            errorTileUrl: "",
            zoomOffset: 0,
            tms: !1,
            zoomReverse: !1,
            detectRetina: !1,
            crossOrigin: !1
        },
        initialize: function(a, c) {
            this._url = a;
            c = b.setOptions(this, c);
            c.detectRetina && b.Browser.retina && 0 < c.maxZoom && (c.tileSize = Math.floor(c.tileSize / 2), c.zoomReverse ? (c.zoomOffset--, c.minZoom++) : (c.zoomOffset++, c.maxZoom--), c.minZoom = Math.max(0, c.minZoom));
            "string" == typeof c.subdomains && (c.subdomains = c.subdomains.split(""));
            b.Browser.android || this.on("tileunload", this._onTileRemove)
        },
        setUrl: function(a, c) {
            return this._url = a,
            c || this.redraw(),
            this
        },
        createTile: function(a, c) {
            var e = h.createElement("img");
            return b.DomEvent.on(e, "load", b.bind(this._tileOnLoad, this, c, e)),
            b.DomEvent.on(e, "error", b.bind(this._tileOnError, this, c, e)),
            this.options.crossOrigin && (e.crossOrigin = ""),
            e.alt = "",
            e.setAttribute("role", "presentation"),
            e.src = this.getTileUrl(a),
            e
        },
        getTileUrl: function(a) {
            var c = {
                r: b.Browser.retina ? "@2x": "",
                s: this._getSubdomain(a),
                x: a.x,
                y: a.y,
                z: this._getZoomForUrl()
            };
            this._map && !this._map.options.crs.infinite && (a = this._globalTileRange.max.y - a.y, this.options.tms && (c.y = a), c["-y"] = a);
            return b.Util.template(this._url, b.extend(c, this.options))
        },
        _tileOnLoad: function(a, c) {
            b.Browser.ielt9 ? setTimeout(b.bind(a, this, null, c), 0) : a(null, c)
        },
        _tileOnError: function(a, c, b) {
            var e = this.options.errorTileUrl;
            e && c.src !== e && (c.src = e);
            a(b, c)
        },
        getTileSize: function() {
            var a = this._map,
            c = b.GridLayer.prototype.getTileSize.call(this),
            e = this._tileZoom + this.options.zoomOffset,
            f = this.options.minNativeZoom,
            k = this.options.maxNativeZoom;
            return null !== f && e < f ? c.divideBy(a.getZoomScale(f, e)).round() : null !== k && e > k ? c.divideBy(a.getZoomScale(k, e)).round() : c
        },
        _onTileRemove: function(a) {
            a.tile.onload = null
        },
        _getZoomForUrl: function() {
            var a = this._tileZoom,
            c = this.options.maxZoom,
            b = this.options.zoomOffset,
            f = this.options.minNativeZoom,
            k = this.options.maxNativeZoom;
            return this.options.zoomReverse && (a = c - a),
            a += b,
            null !== f && a < f ? f: null !== k && a > k ? k: a
        },
        _getSubdomain: function(a) {
            return this.options.subdomains[Math.abs(a.x + a.y) % this.options.subdomains.length]
        },
        _abortLoading: function() {
            var a, c;
            for (a in this._tiles) this._tiles[a].coords.z !== this._tileZoom && (c = this._tiles[a].el, c.onload = b.Util.falseFn, c.onerror = b.Util.falseFn, c.complete || (c.src = b.Util.emptyImageUrl, b.DomUtil.remove(c)))
        }
    });
    b.tileLayer = function(a, c) {
        return new b.TileLayer(a, c)
    };
    b.TileLayer.WMS = b.TileLayer.extend({
        defaultWmsParams: {
            service: "WMS",
            request: "GetMap",
            layers: "",
            styles: "",
            format: "image/jpeg",
            transparent: !1,
            version: "1.1.1"
        },
        options: {
            crs: null,
            uppercase: !1
        },
        initialize: function(a, c) {
            this._url = a;
            var e = b.extend({},
            this.defaultWmsParams),
            f;
            for (f in c) f in this.options || (e[f] = c[f]);
            c = b.setOptions(this, c);
            e.width = e.height = c.tileSize * (c.detectRetina && b.Browser.retina ? 2 : 1);
            this.wmsParams = e
        },
        onAdd: function(a) {
            this._crs = this.options.crs || a.options.crs;
            this._wmsVersion = parseFloat(this.wmsParams.version);
            this.wmsParams[1.3 <= this._wmsVersion ? "crs": "srs"] = this._crs.code;
            b.TileLayer.prototype.onAdd.call(this, a)
        },
        getTileUrl: function(a) {
            var c = this._tileCoordsToBounds(a),
            e = this._crs.project(c.getNorthWest()),
            c = this._crs.project(c.getSouthEast()),
            e = (1.3 <= this._wmsVersion && this._crs === b.CRS.EPSG4326 ? [c.y, e.x, e.y, c.x] : [e.x, c.y, c.x, e.y]).join(",");
            a = b.TileLayer.prototype.getTileUrl.call(this, a);
            return a + b.Util.getParamString(this.wmsParams, a, this.options.uppercase) + (this.options.uppercase ? "&BBOX=": "&bbox=") + e
        },
        setParams: function(a, c) {
            return b.extend(this.wmsParams, a),
            c || this.redraw(),
            this
        }
    });
    b.tileLayer.wms = function(a, c) {
        return new b.TileLayer.WMS(a, c)
    };
    b.ImageOverlay = b.Layer.extend({
        options: {
            opacity: 1,
            alt: "",
            interactive: !1,
            crossOrigin: !1
        },
        initialize: function(a, c, e) {
            this._url = a;
            this._bounds = b.latLngBounds(c);
            b.setOptions(this, e)
        },
        onAdd: function() {
            this._image || (this._initImage(), 1 > this.options.opacity && this._updateOpacity());
            this.options.interactive && (b.DomUtil.addClass(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image));
            this.getPane().appendChild(this._image);
            this._reset()
        },
        onRemove: function() {
            b.DomUtil.remove(this._image);
            this.options.interactive && this.removeInteractiveTarget(this._image)
        },
        setOpacity: function(a) {
            return this.options.opacity = a,
            this._image && this._updateOpacity(),
            this
        },
        setStyle: function(a) {
            return a.opacity && this.setOpacity(a.opacity),
            this
        },
        bringToFront: function() {
            return this._map && b.DomUtil.toFront(this._image),
            this
        },
        bringToBack: function() {
            return this._map && b.DomUtil.toBack(this._image),
            this
        },
        setUrl: function(a) {
            return this._url = a,
            this._image && (this._image.src = a),
            this
        },
        setBounds: function(a) {
            return this._bounds = a,
            this._map && this._reset(),
            this
        },
        getEvents: function() {
            var a = {
                zoom: this._reset,
                viewreset: this._reset
            };
            return this._zoomAnimated && (a.zoomanim = this._animateZoom),
            a
        },
        getBounds: function() {
            return this._bounds
        },
        getElement: function() {
            return this._image
        },
        _initImage: function() {
            var a = this._image = b.DomUtil.create("img", "leaflet-image-layer " + (this._zoomAnimated ? "leaflet-zoom-animated": ""));
            a.onselectstart = b.Util.falseFn;
            a.onmousemove = b.Util.falseFn;
            a.onload = b.bind(this.fire, this, "load");
            this.options.crossOrigin && (a.crossOrigin = "");
            a.src = this._url;
            a.alt = this.options.alt
        },
        _animateZoom: function(a) {
            var c = this._map.getZoomScale(a.zoom);
            a = this._map._latLngBoundsToNewLayerBounds(this._bounds, a.zoom, a.center).min;
            b.DomUtil.setTransform(this._image, a, c)
        },
        _reset: function() {
            var a = this._image,
            c = new b.Bounds(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
            e = c.getSize();
            b.DomUtil.setPosition(a, c.min);
            a.style.width = e.x + "px";
            a.style.height = e.y + "px"
        },
        _updateOpacity: function() {
            b.DomUtil.setOpacity(this._image, this.options.opacity)
        }
    });
    b.imageOverlay = function(a, c, e) {
        return new b.ImageOverlay(a, c, e)
    };
    b.Icon = b.Class.extend({
        initialize: function(a) {
            b.setOptions(this, a)
        },
        createIcon: function(a) {
            return this._createIcon("icon", a)
        },
        createShadow: function(a) {
            return this._createIcon("shadow", a)
        },
        _createIcon: function(a, c) {
            var b = this._getIconUrl(a);
            if (!b) {
                if ("icon" === a) throw Error("iconUrl not set in Icon options (see the docs).");
                return null
            }
            b = this._createImg(b, c && "IMG" === c.tagName ? c: null);
            return this._setIconStyles(b, a),
            b
        },
        _setIconStyles: function(a, c) {
            var e = this.options,
            f = e[c + "Size"];
            "number" == typeof f && (f = [f, f]);
            var f = b.point(f),
            k = b.point("shadow" === c && e.shadowAnchor || e.iconAnchor || f && f.divideBy(2, !0));
            a.className = "leaflet-marker-" + c + " " + (e.className || "");
            k && (a.style.marginLeft = -k.x + "px", a.style.marginTop = -k.y + "px");
            f && (a.style.width = f.x + "px", a.style.height = f.y + "px")
        },
        _createImg: function(a, c) {
            return c = c || h.createElement("img"),
            c.src = a,
            c
        },
        _getIconUrl: function(a) {
            return b.Browser.retina && this.options[a + "RetinaUrl"] || this.options[a + "Url"]
        }
    });
    b.icon = function(a) {
        return new b.Icon(a)
    };
    b.Icon.Default = b.Icon.extend({
        options: {
            iconUrl: "marker-icon.png",
            iconRetinaUrl: "marker-icon-2x.png",
            shadowUrl: "marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        },
        _getIconUrl: function(a) {
            return b.Icon.Default.imagePath || (b.Icon.Default.imagePath = this._detectIconPath()),
            (this.options.imagePath || b.Icon.Default.imagePath) + b.Icon.prototype._getIconUrl.call(this, a)
        },
        _detectIconPath: function() {
            var a = b.DomUtil.create("div", "leaflet-default-icon-path", h.body),
            c = b.DomUtil.getStyle(a, "background-image") || b.DomUtil.getStyle(a, "backgroundImage");
            return h.body.removeChild(a),
            0 === c.indexOf("url") ? c.replace(/^url\([\"\']?/, "").replace(/marker-icon\.png[\"\']?\)$/, "") : ""
        }
    });
    b.Marker = b.Layer.extend({
        options: {
            icon: new b.Icon.Default,
            interactive: !0,
            draggable: !1,
            keyboard: !0,
            title: "",
            alt: "",
            zIndexOffset: 0,
            opacity: 1,
            riseOnHover: !1,
            riseOffset: 250,
            pane: "markerPane",
            nonBubblingEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"]
        },
        initialize: function(a, c) {
            b.setOptions(this, c);
            this._latlng = b.latLng(a)
        },
        onAdd: function(a) { (this._zoomAnimated = this._zoomAnimated && a.options.markerZoomAnimation) && a.on("zoomanim", this._animateZoom, this);
            this._initIcon();
            this.update()
        },
        onRemove: function(a) {
            this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks());
            this._zoomAnimated && a.off("zoomanim", this._animateZoom, this);
            this._removeIcon();
            this._removeShadow()
        },
        getEvents: function() {
            return {
                zoom: this.update,
                viewreset: this.update
            }
        },
        getLatLng: function() {
            return this._latlng
        },
        setLatLng: function(a) {
            var c = this._latlng;
            return this._latlng = b.latLng(a),
            this.update(),
            this.fire("move", {
                oldLatLng: c,
                latlng: this._latlng
            })
        },
        setZIndexOffset: function(a) {
            return this.options.zIndexOffset = a,
            this.update()
        },
        setIcon: function(a) {
            return this.options.icon = a,
            this._map && (this._initIcon(), this.update()),
            this._popup && this.bindPopup(this._popup, this._popup.options),
            this
        },
        getElement: function() {
            return this._icon
        },
        update: function() {
            if (this._icon) {
                var a = this._map.latLngToLayerPoint(this._latlng).round();
                this._setPos(a)
            }
            return this
        },
        _initIcon: function() {
            var a = this.options,
            c = "leaflet-zoom-" + (this._zoomAnimated ? "animated": "hide"),
            e = a.icon.createIcon(this._icon),
            f = !1;
            e !== this._icon && (this._icon && this._removeIcon(), f = !0, a.title && (e.title = a.title), a.alt && (e.alt = a.alt));
            b.DomUtil.addClass(e, c);
            a.keyboard && (e.tabIndex = "0");
            this._icon = e;
            a.riseOnHover && this.on({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
            });
            var e = a.icon.createShadow(this._shadow),
            k = !1;
            e !== this._shadow && (this._removeShadow(), k = !0);
            e && (b.DomUtil.addClass(e, c), e.alt = "");
            this._shadow = e;
            1 > a.opacity && this._updateOpacity();
            f && this.getPane().appendChild(this._icon);
            this._initInteraction();
            e && k && this.getPane("shadowPane").appendChild(this._shadow)
        },
        _removeIcon: function() {
            this.options.riseOnHover && this.off({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
            });
            b.DomUtil.remove(this._icon);
            this.removeInteractiveTarget(this._icon);
            this._icon = null
        },
        _removeShadow: function() {
            this._shadow && b.DomUtil.remove(this._shadow);
            this._shadow = null
        },
        _setPos: function(a) {
            b.DomUtil.setPosition(this._icon, a);
            this._shadow && b.DomUtil.setPosition(this._shadow, a);
            this._zIndex = a.y + this.options.zIndexOffset;
            this._resetZIndex()
        },
        _updateZIndex: function(a) {
            this._icon.style.zIndex = this._zIndex + a
        },
        _animateZoom: function(a) {
            a = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center).round();
            this._setPos(a)
        },
        _initInteraction: function() {
            if (this.options.interactive && (b.DomUtil.addClass(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), b.Handler.MarkerDrag)) {
                var a = this.options.draggable;
                this.dragging && (a = this.dragging.enabled(), this.dragging.disable());
                this.dragging = new b.Handler.MarkerDrag(this);
                a && this.dragging.enable()
            }
        },
        setOpacity: function(a) {
            return this.options.opacity = a,
            this._map && this._updateOpacity(),
            this
        },
        _updateOpacity: function() {
            var a = this.options.opacity;
            b.DomUtil.setOpacity(this._icon, a);
            this._shadow && b.DomUtil.setOpacity(this._shadow, a)
        },
        _bringToFront: function() {
            this._updateZIndex(this.options.riseOffset)
        },
        _resetZIndex: function() {
            this._updateZIndex(0)
        },
        _getPopupAnchor: function() {
            return this.options.icon.options.popupAnchor || [0, 0]
        },
        _getTooltipAnchor: function() {
            return this.options.icon.options.tooltipAnchor || [0, 0]
        }
    });
    b.marker = function(a, c) {
        return new b.Marker(a, c)
    };
    b.DivIcon = b.Icon.extend({
        options: {
            iconSize: [12, 12],
            html: !1,
            bgPos: null,
            className: "leaflet-div-icon"
        },
        createIcon: function(a) {
            a = a && "DIV" === a.tagName ? a: h.createElement("div");
            var c = this.options;
            if (a.innerHTML = !1 !== c.html ? c.html: "", c.bgPos) c = b.point(c.bgPos),
            a.style.backgroundPosition = -c.x + "px " + -c.y + "px";
            return this._setIconStyles(a, "icon"),
            a
        },
        createShadow: function() {
            return null
        }
    });
    b.divIcon = function(a) {
        return new b.DivIcon(a)
    };
    b.DivOverlay = b.Layer.extend({
        options: {
            offset: [0, 7],
            className: "",
            pane: "popupPane"
        },
        initialize: function(a, c) {
            b.setOptions(this, a);
            this._source = c
        },
        onAdd: function(a) {
            this._zoomAnimated = a._zoomAnimated;
            this._container || this._initLayout();
            a._fadeAnimated && b.DomUtil.setOpacity(this._container, 0);
            clearTimeout(this._removeTimeout);
            this.getPane().appendChild(this._container);
            this.update();
            a._fadeAnimated && b.DomUtil.setOpacity(this._container, 1);
            this.bringToFront()
        },
        onRemove: function(a) {
            a._fadeAnimated ? (b.DomUtil.setOpacity(this._container, 0), this._removeTimeout = setTimeout(b.bind(b.DomUtil.remove, b.DomUtil, this._container), 200)) : b.DomUtil.remove(this._container)
        },
        getLatLng: function() {
            return this._latlng
        },
        setLatLng: function(a) {
            return this._latlng = b.latLng(a),
            this._map && (this._updatePosition(), this._adjustPan()),
            this
        },
        getContent: function() {
            return this._content
        },
        setContent: function(a) {
            return this._content = a,
            this.update(),
            this
        },
        getElement: function() {
            return this._container
        },
        update: function() {
            this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan())
        },
        getEvents: function() {
            var a = {
                zoom: this._updatePosition,
                viewreset: this._updatePosition
            };
            return this._zoomAnimated && (a.zoomanim = this._animateZoom),
            a
        },
        isOpen: function() {
            return !! this._map && this._map.hasLayer(this)
        },
        bringToFront: function() {
            return this._map && b.DomUtil.toFront(this._container),
            this
        },
        bringToBack: function() {
            return this._map && b.DomUtil.toBack(this._container),
            this
        },
        _updateContent: function() {
            if (this._content) {
                var a = this._contentNode,
                c = "function" == typeof this._content ? this._content(this._source || this) : this._content;
                if ("string" == typeof c) a.innerHTML = c;
                else {
                    for (; a.hasChildNodes();) a.removeChild(a.firstChild);
                    a.appendChild(c)
                }
                this.fire("contentupdate")
            }
        },
        _updatePosition: function() {
            if (this._map) {
                var a = this._map.latLngToLayerPoint(this._latlng),
                c = b.point(this.options.offset),
                e = this._getAnchor();
                this._zoomAnimated ? b.DomUtil.setPosition(this._container, a.add(e)) : c = c.add(a).add(e);
                a = this._containerBottom = -c.y;
                c = this._containerLeft = -Math.round(this._containerWidth / 2) + c.x;
                this._container.style.bottom = a + "px";
                this._container.style.left = c + "px"
            }
        },
        _getAnchor: function() {
            return [0, 0]
        }
    });
    b.Popup = b.DivOverlay.extend({
        options: {
            maxWidth: 300,
            minWidth: 50,
            maxHeight: null,
            autoPan: !0,
            autoPanPaddingTopLeft: null,
            autoPanPaddingBottomRight: null,
            autoPanPadding: [5, 5],
            keepInView: !1,
            closeButton: !0,
            autoClose: !0,
            className: ""
        },
        openOn: function(a) {
            return a.openPopup(this),
            this
        },
        onAdd: function(a) {
            b.DivOverlay.prototype.onAdd.call(this, a);
            a.fire("popupopen", {
                popup: this
            });
            this._source && (this._source.fire("popupopen", {
                popup: this
            },
            !0), this._source instanceof b.Path || this._source.on("preclick", b.DomEvent.stopPropagation))
        },
        onRemove: function(a) {
            b.DivOverlay.prototype.onRemove.call(this, a);
            a.fire("popupclose", {
                popup: this
            });
            this._source && (this._source.fire("popupclose", {
                popup: this
            },
            !0), this._source instanceof b.Path || this._source.off("preclick", b.DomEvent.stopPropagation))
        },
        getEvents: function() {
            var a = b.DivOverlay.prototype.getEvents.call(this);
            return ("closeOnClick" in this.options ? this.options.closeOnClick: this._map.options.closePopupOnClick) && (a.preclick = this._close),
            this.options.keepInView && (a.moveend = this._adjustPan),
            a
        },
        _close: function() {
            this._map && this._map.closePopup(this)
        },
        _initLayout: function() {
            var a = this._container = b.DomUtil.create("div", "leaflet-popup " + (this.options.className || "") + " leaflet-zoom-animated");
            if (this.options.closeButton) {
                var c = this._closeButton = b.DomUtil.create("a", "leaflet-popup-close-button", a);
                c.href = "#close";
                c.innerHTML = "&#215;";
                b.DomEvent.on(c, "click", this._onCloseButtonClick, this)
            }
            c = this._wrapper = b.DomUtil.create("div", "leaflet-popup-content-wrapper", a);
            this._contentNode = b.DomUtil.create("div", "leaflet-popup-content", c);
            b.DomEvent.disableClickPropagation(c).disableScrollPropagation(this._contentNode).on(c, "contextmenu", b.DomEvent.stopPropagation);
            this._tipContainer = b.DomUtil.create("div", "leaflet-popup-tip-container", a);
            this._tip = b.DomUtil.create("div", "leaflet-popup-tip", this._tipContainer)
        },
        _updateLayout: function() {
            var a = this._contentNode,
            c = a.style;
            c.width = "";
            c.whiteSpace = "nowrap";
            var e = a.offsetWidth,
            e = Math.min(e, this.options.maxWidth),
            e = Math.max(e, this.options.minWidth);
            c.width = e + 1 + "px";
            c.whiteSpace = "";
            c.height = "";
            var e = a.offsetHeight,
            f = this.options.maxHeight;
            f && e > f ? (c.height = f + "px", b.DomUtil.addClass(a, "leaflet-popup-scrolled")) : b.DomUtil.removeClass(a, "leaflet-popup-scrolled");
            this._containerWidth = this._container.offsetWidth
        },
        _animateZoom: function(a) {
            a = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center);
            var c = this._getAnchor();
            b.DomUtil.setPosition(this._container, a.add(c))
        },
        _adjustPan: function() {
            if (! (!this.options.autoPan || this._map._panAnim && this._map._panAnim._inProgress)) {
                var a = this._map,
                c = parseInt(b.DomUtil.getStyle(this._container, "marginBottom"), 10) || 0,
                c = this._container.offsetHeight + c,
                e = this._containerWidth,
                f = new b.Point(this._containerLeft, -c - this._containerBottom);
                f._add(b.DomUtil.getPosition(this._container));
                var f = a.layerPointToContainerPoint(f),
                k = b.point(this.options.autoPanPadding),
                d = b.point(this.options.autoPanPaddingTopLeft || k),
                k = b.point(this.options.autoPanPaddingBottomRight || k),
                g = a.getSize(),
                m = 0,
                h = 0;
                f.x + e + k.x > g.x && (m = f.x + e - g.x + k.x);
                0 > f.x - m - d.x && (m = f.x - d.x);
                f.y + c + k.y > g.y && (h = f.y + c - g.y + k.y);
                0 > f.y - h - d.y && (h = f.y - d.y); (m || h) && a.fire("autopanstart").panBy([m, h])
            }
        },
        _onCloseButtonClick: function(a) {
            this._close();
            b.DomEvent.stop(a)
        },
        _getAnchor: function() {
            return b.point(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0])
        }
    });
    b.popup = function(a, c) {
        return new b.Popup(a, c)
    };
    b.Map.mergeOptions({
        closePopupOnClick: !0
    });
    b.Map.include({
        openPopup: function(a, c, e) {
            return a instanceof b.Popup || (a = (new b.Popup(e)).setContent(a)),
            c && a.setLatLng(c),
            this.hasLayer(a) ? this: (this._popup && this._popup.options.autoClose && this.closePopup(), this._popup = a, this.addLayer(a))
        },
        closePopup: function(a) {
            return a && a !== this._popup || (a = this._popup, this._popup = null),
            a && this.removeLayer(a),
            this
        }
    });
    b.Layer.include({
        bindPopup: function(a, c) {
            return a instanceof b.Popup ? (b.setOptions(a, c), this._popup = a, a._source = this) : (this._popup && !c || (this._popup = new b.Popup(c, this)), this._popup.setContent(a)),
            this._popupHandlersAdded || (this.on({
                click: this._openPopup,
                remove: this.closePopup,
                move: this._movePopup
            }), this._popupHandlersAdded = !0),
            this
        },
        unbindPopup: function() {
            return this._popup && (this.off({
                click: this._openPopup,
                remove: this.closePopup,
                move: this._movePopup
            }), this._popupHandlersAdded = !1, this._popup = null),
            this
        },
        openPopup: function(a, c) {
            if (a instanceof b.Layer || (c = a, a = this), a instanceof b.FeatureGroup) for (var e in this._layers) {
                a = this._layers[e];
                break
            }
            return c || (c = a.getCenter ? a.getCenter() : a.getLatLng()),
            this._popup && this._map && (this._popup._source = a, this._popup.update(), this._map.openPopup(this._popup, c)),
            this
        },
        closePopup: function() {
            return this._popup && this._popup._close(),
            this
        },
        togglePopup: function(a) {
            return this._popup && (this._popup._map ? this.closePopup() : this.openPopup(a)),
            this
        },
        isPopupOpen: function() {
            return !! this._popup && this._popup.isOpen()
        },
        setPopupContent: function(a) {
            return this._popup && this._popup.setContent(a),
            this
        },
        getPopup: function() {
            return this._popup
        },
        _openPopup: function(a) {
            var c = a.layer || a.target;
            if (this._popup && this._map) return b.DomEvent.stop(a),
            c instanceof b.Path ? void this.openPopup(a.layer || a.target, a.latlng) : void(this._map.hasLayer(this._popup) && this._popup._source === c ? this.closePopup() : this.openPopup(c, a.latlng))
        },
        _movePopup: function(a) {
            this._popup.setLatLng(a.latlng)
        }
    });
    b.Tooltip = b.DivOverlay.extend({
        options: {
            pane: "tooltipPane",
            offset: [0, 0],
            direction: "auto",
            permanent: !1,
            sticky: !1,
            interactive: !1,
            opacity: .9
        },
        onAdd: function(a) {
            b.DivOverlay.prototype.onAdd.call(this, a);
            this.setOpacity(this.options.opacity);
            a.fire("tooltipopen", {
                tooltip: this
            });
            this._source && this._source.fire("tooltipopen", {
                tooltip: this
            },
            !0)
        },
        onRemove: function(a) {
            b.DivOverlay.prototype.onRemove.call(this, a);
            a.fire("tooltipclose", {
                tooltip: this
            });
            this._source && this._source.fire("tooltipclose", {
                tooltip: this
            },
            !0)
        },
        getEvents: function() {
            var a = b.DivOverlay.prototype.getEvents.call(this);
            return b.Browser.touch && !this.options.permanent && (a.preclick = this._close),
            a
        },
        _close: function() {
            this._map && this._map.closeTooltip(this)
        },
        _initLayout: function() {
            this._contentNode = this._container = b.DomUtil.create("div", "leaflet-tooltip " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated": "hide"))
        },
        _updateLayout: function() {},
        _adjustPan: function() {},
        _setPosition: function(a) {
            var c = this._map,
            e = this._container,
            f = c.latLngToContainerPoint(c.getCenter()),
            c = c.layerPointToContainerPoint(a),
            k = this.options.direction,
            d = e.offsetWidth,
            g = e.offsetHeight,
            m = b.point(this.options.offset),
            h = this._getAnchor();
            "top" === k ? a = a.add(b.point( - d / 2 + m.x, -g + m.y + h.y, !0)) : "bottom" === k ? a = a.subtract(b.point(d / 2 - m.x, -m.y, !0)) : "center" === k ? a = a.subtract(b.point(d / 2 + m.x, g / 2 - h.y + m.y, !0)) : "right" === k || "auto" === k && c.x < f.x ? (k = "right", a = a.add(b.point(m.x + h.x, h.y - g / 2 + m.y, !0))) : (k = "left", a = a.subtract(b.point(d + h.x - m.x, g / 2 - h.y - m.y, !0)));
            b.DomUtil.removeClass(e, "leaflet-tooltip-right");
            b.DomUtil.removeClass(e, "leaflet-tooltip-left");
            b.DomUtil.removeClass(e, "leaflet-tooltip-top");
            b.DomUtil.removeClass(e, "leaflet-tooltip-bottom");
            b.DomUtil.addClass(e, "leaflet-tooltip-" + k);
            b.DomUtil.setPosition(e, a)
        },
        _updatePosition: function() {
            var a = this._map.latLngToLayerPoint(this._latlng);
            this._setPosition(a)
        },
        setOpacity: function(a) {
            this.options.opacity = a;
            this._container && b.DomUtil.setOpacity(this._container, a)
        },
        _animateZoom: function(a) {
            a = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center);
            this._setPosition(a)
        },
        _getAnchor: function() {
            return b.point(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0])
        }
    });
    b.tooltip = function(a, c) {
        return new b.Tooltip(a, c)
    };
    b.Map.include({
        openTooltip: function(a, c, e) {
            return a instanceof b.Tooltip || (a = (new b.Tooltip(e)).setContent(a)),
            c && a.setLatLng(c),
            this.hasLayer(a) ? this: this.addLayer(a)
        },
        closeTooltip: function(a) {
            return a && this.removeLayer(a),
            this
        }
    });
    b.Layer.include({
        bindTooltip: function(a, c) {
            return a instanceof b.Tooltip ? (b.setOptions(a, c), this._tooltip = a, a._source = this) : (this._tooltip && !c || (this._tooltip = b.tooltip(c, this)), this._tooltip.setContent(a)),
            this._initTooltipInteractions(),
            this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(),
            this
        },
        unbindTooltip: function() {
            return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null),
            this
        },
        _initTooltipInteractions: function(a) {
            if (a || !this._tooltipHandlersAdded) {
                var c = {
                    remove: this.closeTooltip,
                    move: this._moveTooltip
                };
                this._tooltip.options.permanent ? c.add = this._openTooltip: (c.mouseover = this._openTooltip, c.mouseout = this.closeTooltip, this._tooltip.options.sticky && (c.mousemove = this._moveTooltip), b.Browser.touch && (c.click = this._openTooltip));
                this[a ? "off": "on"](c);
                this._tooltipHandlersAdded = !a
            }
        },
        openTooltip: function(a, c) {
            if (a instanceof b.Layer || (c = a, a = this), a instanceof b.FeatureGroup) for (var e in this._layers) {
                a = this._layers[e];
                break
            }
            return c || (c = a.getCenter ? a.getCenter() : a.getLatLng()),
            this._tooltip && this._map && (this._tooltip._source = a, this._tooltip.update(), this._map.openTooltip(this._tooltip, c), this._tooltip.options.interactive && this._tooltip._container && (b.DomUtil.addClass(this._tooltip._container, "leaflet-clickable"), this.addInteractiveTarget(this._tooltip._container))),
            this
        },
        closeTooltip: function() {
            return this._tooltip && (this._tooltip._close(), this._tooltip.options.interactive && this._tooltip._container && (b.DomUtil.removeClass(this._tooltip._container, "leaflet-clickable"), this.removeInteractiveTarget(this._tooltip._container))),
            this
        },
        toggleTooltip: function(a) {
            return this._tooltip && (this._tooltip._map ? this.closeTooltip() : this.openTooltip(a)),
            this
        },
        isTooltipOpen: function() {
            return this._tooltip.isOpen()
        },
        setTooltipContent: function(a) {
            return this._tooltip && this._tooltip.setContent(a),
            this
        },
        getTooltip: function() {
            return this._tooltip
        },
        _openTooltip: function(a) {
            var c = a.layer || a.target;
            this._tooltip && this._map && this.openTooltip(c, this._tooltip.options.sticky ? a.latlng: l)
        },
        _moveTooltip: function(a) {
            var c, b, f = a.latlng;
            this._tooltip.options.sticky && a.originalEvent && (c = this._map.mouseEventToContainerPoint(a.originalEvent), b = this._map.containerPointToLayerPoint(c), f = this._map.layerPointToLatLng(b));
            this._tooltip.setLatLng(f)
        }
    });
    b.LayerGroup = b.Layer.extend({
        initialize: function(a) {
            this._layers = {};
            var c, b;
            if (a) for (c = 0, b = a.length; c < b; c++) this.addLayer(a[c])
        },
        addLayer: function(a) {
            var c = this.getLayerId(a);
            return this._layers[c] = a,
            this._map && this._map.addLayer(a),
            this
        },
        removeLayer: function(a) {
            a = a in this._layers ? a: this.getLayerId(a);
            return this._map && this._layers[a] && this._map.removeLayer(this._layers[a]),
            delete this._layers[a],
            this
        },
        hasLayer: function(a) {
            return !! a && (a in this._layers || this.getLayerId(a) in this._layers)
        },
        clearLayers: function() {
            for (var a in this._layers) this.removeLayer(this._layers[a]);
            return this
        },
        invoke: function(a) {
            var c, b, f = Array.prototype.slice.call(arguments, 1);
            for (c in this._layers) b = this._layers[c],
            b[a] && b[a].apply(b, f);
            return this
        },
        onAdd: function(a) {
            for (var c in this._layers) a.addLayer(this._layers[c])
        },
        onRemove: function(a) {
            for (var c in this._layers) a.removeLayer(this._layers[c])
        },
        eachLayer: function(a, c) {
            for (var b in this._layers) a.call(c, this._layers[b]);
            return this
        },
        getLayer: function(a) {
            return this._layers[a]
        },
        getLayers: function() {
            var a = [],
            c;
            for (c in this._layers) a.push(this._layers[c]);
            return a
        },
        setZIndex: function(a) {
            return this.invoke("setZIndex", a)
        },
        getLayerId: function(a) {
            return b.stamp(a)
        }
    });
    b.layerGroup = function(a) {
        return new b.LayerGroup(a)
    };
    b.FeatureGroup = b.LayerGroup.extend({
        addLayer: function(a) {
            return this.hasLayer(a) ? this: (a.addEventParent(this), b.LayerGroup.prototype.addLayer.call(this, a), this.fire("layeradd", {
                layer: a
            }))
        },
        removeLayer: function(a) {
            return this.hasLayer(a) ? (a in this._layers && (a = this._layers[a]), a.removeEventParent(this), b.LayerGroup.prototype.removeLayer.call(this, a), this.fire("layerremove", {
                layer: a
            })) : this
        },
        setStyle: function(a) {
            return this.invoke("setStyle", a)
        },
        bringToFront: function() {
            return this.invoke("bringToFront")
        },
        bringToBack: function() {
            return this.invoke("bringToBack")
        },
        getBounds: function() {
            var a = new b.LatLngBounds,
            c;
            for (c in this._layers) {
                var e = this._layers[c];
                a.extend(e.getBounds ? e.getBounds() : e.getLatLng())
            }
            return a
        }
    });
    b.featureGroup = function(a) {
        return new b.FeatureGroup(a)
    };
    b.Renderer = b.Layer.extend({
        options: {
            padding: .1
        },
        initialize: function(a) {
            b.setOptions(this, a);
            b.stamp(this);
            this._layers = this._layers || {}
        },
        onAdd: function() {
            this._container || (this._initContainer(), this._zoomAnimated && b.DomUtil.addClass(this._container, "leaflet-zoom-animated"));
            this.getPane().appendChild(this._container);
            this._update();
            this.on("update", this._updatePaths, this)
        },
        onRemove: function() {
            b.DomUtil.remove(this._container);
            this.off("update", this._updatePaths, this)
        },
        getEvents: function() {
            var a = {
                viewreset: this._reset,
                zoom: this._onZoom,
                moveend: this._update,
                zoomend: this._onZoomEnd
            };
            return this._zoomAnimated && (a.zoomanim = this._onAnimZoom),
            a
        },
        _onAnimZoom: function(a) {
            this._updateTransform(a.center, a.zoom)
        },
        _onZoom: function() {
            this._updateTransform(this._map.getCenter(), this._map.getZoom())
        },
        _updateTransform: function(a, c) {
            var e = this._map.getZoomScale(c, this._zoom),
            f = b.DomUtil.getPosition(this._container),
            d = this._map.getSize().multiplyBy(.5 + this.options.padding),
            g = this._map.project(this._center, c),
            g = this._map.project(a, c).subtract(g),
            f = d.multiplyBy( - e).add(f).add(d).subtract(g);
            b.Browser.any3d ? b.DomUtil.setTransform(this._container, f, e) : b.DomUtil.setPosition(this._container, f)
        },
        _reset: function() {
            this._update();
            this._updateTransform(this._center, this._zoom);
            for (var a in this._layers) this._layers[a]._reset()
        },
        _onZoomEnd: function() {
            for (var a in this._layers) this._layers[a]._project()
        },
        _updatePaths: function() {
            for (var a in this._layers) this._layers[a]._update()
        },
        _update: function() {
            var a = this.options.padding,
            c = this._map.getSize(),
            e = this._map.containerPointToLayerPoint(c.multiplyBy( - a)).round();
            this._bounds = new b.Bounds(e, e.add(c.multiplyBy(1 + 2 * a)).round());
            this._center = this._map.getCenter();
            this._zoom = this._map.getZoom()
        }
    });
    b.Map.include({
        getRenderer: function(a) {
            a = a.options.renderer || this._getPaneRenderer(a.options.pane) || this.options.renderer || this._renderer;
            return a || (a = this._renderer = this.options.preferCanvas && b.canvas() || b.svg()),
            this.hasLayer(a) || this.addLayer(a),
            a
        },
        _getPaneRenderer: function(a) {
            if ("overlayPane" === a || a === l) return ! 1;
            var c = this._paneRenderers[a];
            return c === l && (c = b.SVG && b.svg({
                pane: a
            }) || b.Canvas && b.canvas({
                pane: a
            }), this._paneRenderers[a] = c),
            c
        }
    });
    b.Path = b.Layer.extend({
        options: {
            stroke: !0,
            color: "#3388ff",
            weight: 3,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
            dashArray: null,
            dashOffset: null,
            fill: !1,
            fillColor: null,
            fillOpacity: .2,
            fillRule: "evenodd",
            interactive: !0
        },
        beforeAdd: function(a) {
            this._renderer = a.getRenderer(this)
        },
        onAdd: function() {
            this._renderer._initPath(this);
            this._reset();
            this._renderer._addPath(this)
        },
        onRemove: function() {
            this._renderer._removePath(this)
        },
        redraw: function() {
            return this._map && this._renderer._updatePath(this),
            this
        },
        setStyle: function(a) {
            return b.setOptions(this, a),
            this._renderer && this._renderer._updateStyle(this),
            this
        },
        bringToFront: function() {
            return this._renderer && this._renderer._bringToFront(this),
            this
        },
        bringToBack: function() {
            return this._renderer && this._renderer._bringToBack(this),
            this
        },
        getElement: function() {
            return this._path
        },
        _reset: function() {
            this._project();
            this._update()
        },
        _clickTolerance: function() {
            return (this.options.stroke ? this.options.weight / 2 : 0) + (b.Browser.touch ? 10 : 0)
        }
    });
    b.LineUtil = {
        simplify: function(a, c) {
            if (!c || !a.length) return a.slice();
            var b = c * c;
            return a = this._reducePoints(a, b),
            this._simplifyDP(a, b)
        },
        pointToSegmentDistance: function(a, c, b) {
            return Math.sqrt(this._sqClosestPointOnSegment(a, c, b, !0))
        },
        closestPointOnSegment: function(a, c, b) {
            return this._sqClosestPointOnSegment(a, c, b)
        },
        _simplifyDP: function(a, c) {
            var b = a.length,
            f = new(typeof Uint8Array != l + "" ? Uint8Array: Array)(b);
            f[0] = f[b - 1] = 1;
            this._simplifyDPStep(a, f, c, 0, b - 1);
            var d, g = [];
            for (d = 0; d < b; d++) f[d] && g.push(a[d]);
            return g
        },
        _simplifyDPStep: function(a, c, b, f, d) {
            var e, k, g, m = 0;
            for (k = f + 1; k <= d - 1; k++) g = this._sqClosestPointOnSegment(a[k], a[f], a[d], !0),
            g > m && (e = k, m = g);
            m > b && (c[e] = 1, this._simplifyDPStep(a, c, b, f, e), this._simplifyDPStep(a, c, b, e, d))
        },
        _reducePoints: function(a, c) {
            for (var b = [a[0]], f = 1, d = 0, g = a.length; f < g; f++) this._sqDist(a[f], a[d]) > c && (b.push(a[f]), d = f);
            return d < g - 1 && b.push(a[g - 1]),
            b
        },
        clipSegment: function(a, c, b, f, d) {
            var e, k, g = f ? this._lastCode: this._getBitCode(a, b),
            m = this._getBitCode(c, b);
            for (this._lastCode = m;;) {
                if (! (g | m)) return [a, c];
                if (g & m) return ! 1;
                f = g || m;
                e = this._getEdgeIntersection(a, c, f, b, d);
                k = this._getBitCode(e, b);
                f === g ? (a = e, g = k) : (c = e, m = k)
            }
        },
        _getEdgeIntersection: function(a, c, e, f, d) {
            var k, g, m = c.x - a.x;
            c = c.y - a.y;
            var h = f.min;
            f = f.max;
            return 8 & e ? (k = a.x + m * (f.y - a.y) / c, g = f.y) : 4 & e ? (k = a.x + m * (h.y - a.y) / c, g = h.y) : 2 & e ? (k = f.x, g = a.y + c * (f.x - a.x) / m) : 1 & e && (k = h.x, g = a.y + c * (h.x - a.x) / m),
            new b.Point(k, g, d)
        },
        _getBitCode: function(a, c) {
            var b = 0;
            return a.x < c.min.x ? b |= 1 : a.x > c.max.x && (b |= 2),
            a.y < c.min.y ? b |= 4 : a.y > c.max.y && (b |= 8),
            b
        },
        _sqDist: function(a, c) {
            var b = c.x - a.x,
            f = c.y - a.y;
            return b * b + f * f
        },
        _sqClosestPointOnSegment: function(a, c, e, f) {
            var d, g = c.x;
            c = c.y;
            var m = e.x - g,
            h = e.y - c,
            l = m * m + h * h;
            return 0 < l && (d = ((a.x - g) * m + (a.y - c) * h) / l, 1 < d ? (g = e.x, c = e.y) : 0 < d && (g += m * d, c += h * d)),
            m = a.x - g,
            h = a.y - c,
            f ? m * m + h * h: new b.Point(g, c)
        }
    };
    b.Polyline = b.Path.extend({
        options: {
            smoothFactor: 1,
            noClip: !1
        },
        initialize: function(a, c) {
            b.setOptions(this, c);
            this._setLatLngs(a)
        },
        getLatLngs: function() {
            return this._latlngs
        },
        setLatLngs: function(a) {
            return this._setLatLngs(a),
            this.redraw()
        },
        isEmpty: function() {
            return ! this._latlngs.length
        },
        closestLayerPoint: function(a) {
            for (var c, e, f = 1 / 0,
            d = null,
            g = b.LineUtil._sqClosestPointOnSegment,
            m = 0,
            h = this._parts.length; m < h; m++) for (var l = this._parts[m], r = 1, p = l.length; r < p; r++) {
                c = l[r - 1];
                e = l[r];
                var q = g(a, c, e, !0);
                q < f && (f = q, d = g(a, c, e))
            }
            return d && (d.distance = Math.sqrt(f)),
            d
        },
        getCenter: function() {
            if (!this._map) throw Error("Must add layer to map before using getCenter()");
            var a, c, b, f, d, g, m, h = this._rings[0],
            l = h.length;
            if (!l) return null;
            for (c = a = 0; a < l - 1; a++) c += h[a].distanceTo(h[a + 1]) / 2;
            if (0 === c) return this._map.layerPointToLatLng(h[0]);
            for (f = a = 0; a < l - 1; a++) if (d = h[a], g = h[a + 1], b = d.distanceTo(g), f += b, f > c) return m = (f - c) / b,
            this._map.layerPointToLatLng([g.x - m * (g.x - d.x), g.y - m * (g.y - d.y)])
        },
        getBounds: function() {
            return this._bounds
        },
        addLatLng: function(a, c) {
            return c = c || this._defaultShape(),
            a = b.latLng(a),
            c.push(a),
            this._bounds.extend(a),
            this.redraw()
        },
        _setLatLngs: function(a) {
            this._bounds = new b.LatLngBounds;
            this._latlngs = this._convertLatLngs(a)
        },
        _defaultShape: function() {
            return b.Polyline._flat(this._latlngs) ? this._latlngs: this._latlngs[0]
        },
        _convertLatLngs: function(a) {
            for (var c = [], e = b.Polyline._flat(a), f = 0, d = a.length; f < d; f++) e ? (c[f] = b.latLng(a[f]), this._bounds.extend(c[f])) : c[f] = this._convertLatLngs(a[f]);
            return c
        },
        _project: function() {
            var a = new b.Bounds;
            this._rings = [];
            this._projectLatlngs(this._latlngs, this._rings, a);
            var c = this._clickTolerance(),
            c = new b.Point(c, c);
            this._bounds.isValid() && a.isValid() && (a.min._subtract(c), a.max._add(c), this._pxBounds = a)
        },
        _projectLatlngs: function(a, c, e) {
            var f, d, g = a.length;
            if (a[0] instanceof b.LatLng) {
                d = [];
                for (f = 0; f < g; f++) d[f] = this._map.latLngToLayerPoint(a[f]),
                e.extend(d[f]);
                c.push(d)
            } else for (f = 0; f < g; f++) this._projectLatlngs(a[f], c, e)
        },
        _clipPoints: function() {
            var a = this._renderer._bounds;
            if (this._parts = [], this._pxBounds && this._pxBounds.intersects(a)) {
                if (this.options.noClip) return void(this._parts = this._rings);
                var c, e, f, d, g, m, h, l = this._parts;
                f = c = 0;
                for (d = this._rings.length; c < d; c++) for (h = this._rings[c], e = 0, g = h.length; e < g - 1; e++)(m = b.LineUtil.clipSegment(h[e], h[e + 1], a, e, !0)) && (l[f] = l[f] || [], l[f].push(m[0]), m[1] === h[e + 1] && e !== g - 2 || (l[f].push(m[1]), f++))
            }
        },
        _simplifyPoints: function() {
            for (var a = this._parts,
            c = this.options.smoothFactor,
            e = 0,
            f = a.length; e < f; e++) a[e] = b.LineUtil.simplify(a[e], c)
        },
        _update: function() {
            this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath())
        },
        _updatePath: function() {
            this._renderer._updatePoly(this)
        }
    });
    b.polyline = function(a, c) {
        return new b.Polyline(a, c)
    };
    b.Polyline._flat = function(a) {
        return ! b.Util.isArray(a[0]) || "object" != typeof a[0][0] && "undefined" != typeof a[0][0]
    };
    b.PolyUtil = {};
    b.PolyUtil.clipPolygon = function(a, c, e) {
        var f, d, g, m, h, l, r, p, q = [1, 4, 2, 8],
        t = b.LineUtil;
        d = 0;
        for (l = a.length; d < l; d++) a[d]._code = t._getBitCode(a[d], c);
        for (m = 0; 4 > m; m++) {
            r = q[m];
            f = [];
            d = 0;
            l = a.length;
            for (g = l - 1; d < l; g = d++) h = a[d],
            g = a[g],
            h._code & r ? g._code & r || (p = t._getEdgeIntersection(g, h, r, c, e), p._code = t._getBitCode(p, c), f.push(p)) : (g._code & r && (p = t._getEdgeIntersection(g, h, r, c, e), p._code = t._getBitCode(p, c), f.push(p)), f.push(h));
            a = f
        }
        return a
    };
    b.Polygon = b.Polyline.extend({
        options: {
            fill: !0
        },
        isEmpty: function() {
            return ! this._latlngs.length || !this._latlngs[0].length
        },
        getCenter: function() {
            if (!this._map) throw Error("Must add layer to map before using getCenter()");
            var a, c, b, f, d, g, m, h, l = this._rings[0],
            r = l.length;
            if (!r) return null;
            a = d = g = m = 0;
            for (c = r - 1; a < r; c = a++) b = l[a],
            c = l[c],
            f = b.y * c.x - c.y * b.x,
            g += (b.x + c.x) * f,
            m += (b.y + c.y) * f,
            d += 3 * f;
            return h = 0 === d ? l[0] : [g / d, m / d],
            this._map.layerPointToLatLng(h)
        },
        _convertLatLngs: function(a) {
            a = b.Polyline.prototype._convertLatLngs.call(this, a);
            var c = a.length;
            return 2 <= c && a[0] instanceof b.LatLng && a[0].equals(a[c - 1]) && a.pop(),
            a
        },
        _setLatLngs: function(a) {
            b.Polyline.prototype._setLatLngs.call(this, a);
            b.Polyline._flat(this._latlngs) && (this._latlngs = [this._latlngs])
        },
        _defaultShape: function() {
            return b.Polyline._flat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0]
        },
        _clipPoints: function() {
            var a = this._renderer._bounds,
            c = this.options.weight,
            c = new b.Point(c, c);
            if (a = new b.Bounds(a.min.subtract(c), a.max.add(c)), this._parts = [], this._pxBounds && this._pxBounds.intersects(a)) {
                if (this.options.noClip) return void(this._parts = this._rings);
                for (var e = 0,
                f = this._rings.length; e < f; e++) c = b.PolyUtil.clipPolygon(this._rings[e], a, !0),
                c.length && this._parts.push(c)
            }
        },
        _updatePath: function() {
            this._renderer._updatePoly(this, !0)
        }
    });
    b.polygon = function(a, c) {
        return new b.Polygon(a, c)
    };
    b.Rectangle = b.Polygon.extend({
        initialize: function(a, c) {
            b.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(a), c)
        },
        setBounds: function(a) {
            return this.setLatLngs(this._boundsToLatLngs(a))
        },
        _boundsToLatLngs: function(a) {
            return a = b.latLngBounds(a),
            [a.getSouthWest(), a.getNorthWest(), a.getNorthEast(), a.getSouthEast()]
        }
    });
    b.rectangle = function(a, c) {
        return new b.Rectangle(a, c)
    };
    b.CircleMarker = b.Path.extend({
        options: {
            fill: !0,
            radius: 10
        },
        initialize: function(a, c) {
            b.setOptions(this, c);
            this._latlng = b.latLng(a);
            this._radius = this.options.radius
        },
        setLatLng: function(a) {
            return this._latlng = b.latLng(a),
            this.redraw(),
            this.fire("move", {
                latlng: this._latlng
            })
        },
        getLatLng: function() {
            return this._latlng
        },
        setRadius: function(a) {
            return this.options.radius = this._radius = a,
            this.redraw()
        },
        getRadius: function() {
            return this._radius
        },
        setStyle: function(a) {
            var c = a && a.radius || this._radius;
            return b.Path.prototype.setStyle.call(this, a),
            this.setRadius(c),
            this
        },
        _project: function() {
            this._point = this._map.latLngToLayerPoint(this._latlng);
            this._updateBounds()
        },
        _updateBounds: function() {
            var a = this._radius,
            c = this._radiusY || a,
            e = this._clickTolerance(),
            a = [a + e, c + e];
            this._pxBounds = new b.Bounds(this._point.subtract(a), this._point.add(a))
        },
        _update: function() {
            this._map && this._updatePath()
        },
        _updatePath: function() {
            this._renderer._updateCircle(this)
        },
        _empty: function() {
            return this._radius && !this._renderer._bounds.intersects(this._pxBounds)
        }
    });
    b.circleMarker = function(a, c) {
        return new b.CircleMarker(a, c)
    };
    b.Circle = b.CircleMarker.extend({
        initialize: function(a, c, e) {
            if ("number" == typeof c && (c = b.extend({},
            e, {
                radius: c
            })), b.setOptions(this, c), this._latlng = b.latLng(a), isNaN(this.options.radius)) throw Error("Circle radius cannot be NaN");
            this._mRadius = this.options.radius
        },
        setRadius: function(a) {
            return this._mRadius = a,
            this.redraw()
        },
        getRadius: function() {
            return this._mRadius
        },
        getBounds: function() {
            var a = [this._radius, this._radiusY || this._radius];
            return new b.LatLngBounds(this._map.layerPointToLatLng(this._point.subtract(a)), this._map.layerPointToLatLng(this._point.add(a)))
        },
        setStyle: b.Path.prototype.setStyle,
        _project: function() {
            var a = this._latlng.lng,
            c = this._latlng.lat,
            e = this._map,
            f = e.options.crs;
            if (f.distance === b.CRS.Earth.distance) {
                var d = Math.PI / 180,
                f = this._mRadius / b.CRS.Earth.R / d,
                g = e.project([c + f, a]),
                m = e.project([c - f, a]),
                m = g.add(m).divideBy(2),
                h = e.unproject(m).lat,
                d = Math.acos((Math.cos(f * d) - Math.sin(c * d) * Math.sin(h * d)) / (Math.cos(c * d) * Math.cos(h * d))) / d; (isNaN(d) || 0 === d) && (d = f / Math.cos(Math.PI / 180 * c));
                this._point = m.subtract(e.getPixelOrigin());
                this._radius = isNaN(d) ? 0 : Math.max(Math.round(m.x - e.project([h, a - d]).x), 1);
                this._radiusY = Math.max(Math.round(m.y - g.y), 1)
            } else a = f.unproject(f.project(this._latlng).subtract([this._mRadius, 0])),
            this._point = e.latLngToLayerPoint(this._latlng),
            this._radius = this._point.x - e.latLngToLayerPoint(a).x;
            this._updateBounds()
        }
    });
    b.circle = function(a, c, e) {
        return new b.Circle(a, c, e)
    };
    b.SVG = b.Renderer.extend({
        getEvents: function() {
            var a = b.Renderer.prototype.getEvents.call(this);
            return a.zoomstart = this._onZoomStart,
            a
        },
        _initContainer: function() {
            this._container = b.SVG.create("svg");
            this._container.setAttribute("pointer-events", "none");
            this._rootGroup = b.SVG.create("g");
            this._container.appendChild(this._rootGroup)
        },
        _onZoomStart: function() {
            this._update()
        },
        _update: function() {
            if (!this._map._animatingZoom || !this._bounds) {
                b.Renderer.prototype._update.call(this);
                var a = this._bounds,
                c = a.getSize(),
                e = this._container;
                this._svgSize && this._svgSize.equals(c) || (this._svgSize = c, e.setAttribute("width", c.x), e.setAttribute("height", c.y));
                b.DomUtil.setPosition(e, a.min);
                e.setAttribute("viewBox", [a.min.x, a.min.y, c.x, c.y].join(" "));
                this.fire("update")
            }
        },
        _initPath: function(a) {
            var c = a._path = b.SVG.create("path");
            a.options.className && b.DomUtil.addClass(c, a.options.className);
            a.options.interactive && b.DomUtil.addClass(c, "leaflet-interactive");
            this._updateStyle(a);
            this._layers[b.stamp(a)] = a
        },
        _addPath: function(a) {
            this._rootGroup.appendChild(a._path);
            a.addInteractiveTarget(a._path)
        },
        _removePath: function(a) {
            b.DomUtil.remove(a._path);
            a.removeInteractiveTarget(a._path);
            delete this._layers[b.stamp(a)]
        },
        _updatePath: function(a) {
            a._project();
            a._update()
        },
        _updateStyle: function(a) {
            var c = a._path;
            a = a.options;
            c && (a.stroke ? (c.setAttribute("stroke", a.color), c.setAttribute("stroke-opacity", a.opacity), c.setAttribute("stroke-width", a.weight), c.setAttribute("stroke-linecap", a.lineCap), c.setAttribute("stroke-linejoin", a.lineJoin), a.dashArray ? c.setAttribute("stroke-dasharray", a.dashArray) : c.removeAttribute("stroke-dasharray"), a.dashOffset ? c.setAttribute("stroke-dashoffset", a.dashOffset) : c.removeAttribute("stroke-dashoffset")) : c.setAttribute("stroke", "none"), a.fill ? (c.setAttribute("fill", a.fillColor || a.color), c.setAttribute("fill-opacity", a.fillOpacity), c.setAttribute("fill-rule", a.fillRule || "evenodd")) : c.setAttribute("fill", "none"))
        },
        _updatePoly: function(a, c) {
            this._setPath(a, b.SVG.pointsToPath(a._parts, c))
        },
        _updateCircle: function(a) {
            var c = a._point,
            b = a._radius,
            f = "a" + b + "," + (a._radiusY || b) + " 0 1,0 ",
            c = a._empty() ? "M0 0": "M" + (c.x - b) + "," + c.y + f + 2 * b + ",0 " + f + 2 * -b + ",0 ";
            this._setPath(a, c)
        },
        _setPath: function(a, c) {
            a._path.setAttribute("d", c)
        },
        _bringToFront: function(a) {
            b.DomUtil.toFront(a._path)
        },
        _bringToBack: function(a) {
            b.DomUtil.toBack(a._path)
        }
    });
    b.extend(b.SVG, {
        create: function(a) {
            return h.createElementNS("http://www.w3.org/2000/svg", a)
        },
        pointsToPath: function(a, c) {
            var e, f, d, g, m, h, l = "";
            e = 0;
            for (d = a.length; e < d; e++) {
                m = a[e];
                f = 0;
                for (g = m.length; f < g; f++) h = m[f],
                l += (f ? "L": "M") + h.x + " " + h.y;
                l += c ? b.Browser.svg ? "z": "x": ""
            }
            return l || "M0 0"
        }
    });
    b.Browser.svg = !(!h.createElementNS || !b.SVG.create("svg").createSVGRect);
    b.svg = function(a) {
        return b.Browser.svg || b.Browser.vml ? new b.SVG(a) : null
    };
    b.Browser.vml = !b.Browser.svg &&
    function() {
        try {
            var a = h.createElement("div");
            a.innerHTML = '<v:shape adj="1"/>';
            var c = a.firstChild;
            return c.style.behavior = "url(#default#VML)",
            c && "object" == typeof c.adj
        } catch(e) {
            return ! 1
        }
    } ();
    b.SVG.include(b.Browser.vml ? {
        _initContainer: function() {
            this._container = b.DomUtil.create("div", "leaflet-vml-container")
        },
        _update: function() {
            this._map._animatingZoom || (b.Renderer.prototype._update.call(this), this.fire("update"))
        },
        _initPath: function(a) {
            var c = a._container = b.SVG.create("shape");
            b.DomUtil.addClass(c, "leaflet-vml-shape " + (this.options.className || ""));
            c.coordsize = "1 1";
            a._path = b.SVG.create("path");
            c.appendChild(a._path);
            this._updateStyle(a);
            this._layers[b.stamp(a)] = a
        },
        _addPath: function(a) {
            var c = a._container;
            this._container.appendChild(c);
            a.options.interactive && a.addInteractiveTarget(c)
        },
        _removePath: function(a) {
            var c = a._container;
            b.DomUtil.remove(c);
            a.removeInteractiveTarget(c);
            delete this._layers[b.stamp(a)]
        },
        _updateStyle: function(a) {
            var c = a._stroke,
            e = a._fill,
            f = a.options,
            d = a._container;
            d.stroked = !!f.stroke;
            d.filled = !!f.fill;
            f.stroke ? (c || (c = a._stroke = b.SVG.create("stroke")), d.appendChild(c), c.weight = f.weight + "px", c.color = f.color, c.opacity = f.opacity, f.dashArray ? c.dashStyle = b.Util.isArray(f.dashArray) ? f.dashArray.join(" ") : f.dashArray.replace(/( *, *)/g, " ") : c.dashStyle = "", c.endcap = f.lineCap.replace("butt", "flat"), c.joinstyle = f.lineJoin) : c && (d.removeChild(c), a._stroke = null);
            f.fill ? (e || (e = a._fill = b.SVG.create("fill")), d.appendChild(e), e.color = f.fillColor || f.color, e.opacity = f.fillOpacity) : e && (d.removeChild(e), a._fill = null)
        },
        _updateCircle: function(a) {
            var c = a._point.round(),
            b = Math.round(a._radius),
            f = Math.round(a._radiusY || b);
            this._setPath(a, a._empty() ? "M0 0": "AL " + c.x + "," + c.y + " " + b + "," + f + " 0,23592600")
        },
        _setPath: function(a, c) {
            a._path.v = c
        },
        _bringToFront: function(a) {
            b.DomUtil.toFront(a._container)
        },
        _bringToBack: function(a) {
            b.DomUtil.toBack(a._container)
        }
    }: {});
    b.Browser.vml && (b.SVG.create = function() {
        try {
            return h.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
            function(a) {
                return h.createElement("<lvml:" + a + ' class="lvml">')
            }
        } catch(a) {
            return function(a) {
                return h.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
            }
        }
    } ());
    b.Canvas = b.Renderer.extend({
        getEvents: function() {
            var a = b.Renderer.prototype.getEvents.call(this);
            return a.viewprereset = this._onViewPreReset,
            a
        },
        _onViewPreReset: function() {
            this._postponeUpdatePaths = !0
        },
        onAdd: function() {
            b.Renderer.prototype.onAdd.call(this);
            this._draw()
        },
        _initContainer: function() {
            var a = this._container = h.createElement("canvas");
            b.DomEvent.on(a, "mousemove", b.Util.throttle(this._onMouseMove, 32, this), this).on(a, "click dblclick mousedown mouseup contextmenu", this._onClick, this).on(a, "mouseout", this._handleMouseOut, this);
            this._ctx = a.getContext("2d")
        },
        _updatePaths: function() {
            if (!this._postponeUpdatePaths) {
                var a;
                this._redrawBounds = null;
                for (var c in this._layers) a = this._layers[c],
                a._update();
                this._redraw()
            }
        },
        _update: function() {
            if (!this._map._animatingZoom || !this._bounds) {
                this._drawnLayers = {};
                b.Renderer.prototype._update.call(this);
                var a = this._bounds,
                c = this._container,
                e = a.getSize(),
                f = b.Browser.retina ? 2 : 1;
                b.DomUtil.setPosition(c, a.min);
                c.width = f * e.x;
                c.height = f * e.y;
                c.style.width = e.x + "px";
                c.style.height = e.y + "px";
                b.Browser.retina && this._ctx.scale(2, 2);
                this._ctx.translate( - a.min.x, -a.min.y);
                this.fire("update")
            }
        },
        _reset: function() {
            b.Renderer.prototype._reset.call(this);
            this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths())
        },
        _initPath: function(a) {
            this._updateDashArray(a);
            this._layers[b.stamp(a)] = a;
            a = a._order = {
                layer: a,
                prev: this._drawLast,
                next: null
            };
            this._drawLast && (this._drawLast.next = a);
            this._drawLast = a;
            this._drawFirst = this._drawFirst || this._drawLast
        },
        _addPath: function(a) {
            this._requestRedraw(a)
        },
        _removePath: function(a) {
            var c = a._order,
            e = c.next,
            c = c.prev;
            e ? e.prev = c: this._drawLast = c;
            c ? c.next = e: this._drawFirst = e;
            delete a._order;
            delete this._layers[b.stamp(a)];
            this._requestRedraw(a)
        },
        _updatePath: function(a) {
            this._extendRedrawBounds(a);
            a._project();
            a._update();
            this._requestRedraw(a)
        },
        _updateStyle: function(a) {
            this._updateDashArray(a);
            this._requestRedraw(a)
        },
        _updateDashArray: function(a) {
            if (a.options.dashArray) {
                var c, b = a.options.dashArray.split(","),
                f = [];
                for (c = 0; c < b.length; c++) f.push(Number(b[c]));
                a.options._dashArray = f
            }
        },
        _requestRedraw: function(a) {
            this._map && (this._extendRedrawBounds(a), this._redrawRequest = this._redrawRequest || b.Util.requestAnimFrame(this._redraw, this))
        },
        _extendRedrawBounds: function(a) {
            var c = (a.options.weight || 0) + 1;
            this._redrawBounds = this._redrawBounds || new b.Bounds;
            this._redrawBounds.extend(a._pxBounds.min.subtract([c, c]));
            this._redrawBounds.extend(a._pxBounds.max.add([c, c]))
        },
        _redraw: function() {
            this._redrawRequest = null;
            this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil());
            this._clear();
            this._draw();
            this._redrawBounds = null
        },
        _clear: function() {
            var a = this._redrawBounds;
            if (a) {
                var c = a.getSize();
                this._ctx.clearRect(a.min.x, a.min.y, c.x, c.y)
            } else this._ctx.clearRect(0, 0, this._container.width, this._container.height)
        },
        _draw: function() {
            var a, c = this._redrawBounds;
            if (this._ctx.save(), c) a = c.getSize(),
            this._ctx.beginPath(),
            this._ctx.rect(c.min.x, c.min.y, a.x, a.y),
            this._ctx.clip();
            this._drawing = !0;
            for (var b = this._drawFirst; b; b = b.next) a = b.layer,
            (!c || a._pxBounds && a._pxBounds.intersects(c)) && a._updatePath();
            this._drawing = !1;
            this._ctx.restore()
        },
        _updatePoly: function(a, c) {
            if (this._drawing) {
                var b, f, d, g, m = a._parts,
                h = m.length,
                l = this._ctx;
                if (h) {
                    this._drawnLayers[a._leaflet_id] = a;
                    l.beginPath();
                    l.setLineDash && l.setLineDash(a.options && a.options._dashArray || []);
                    for (b = 0; b < h; b++) {
                        f = 0;
                        for (d = m[b].length; f < d; f++) g = m[b][f],
                        l[f ? "lineTo": "moveTo"](g.x, g.y);
                        c && l.closePath()
                    }
                    this._fillStroke(l, a)
                }
            }
        },
        _updateCircle: function(a) {
            if (this._drawing && !a._empty()) {
                var c = a._point,
                b = this._ctx,
                f = a._radius,
                d = (a._radiusY || f) / f;
                this._drawnLayers[a._leaflet_id] = a;
                1 !== d && (b.save(), b.scale(1, d));
                b.beginPath();
                b.arc(c.x, c.y / d, f, 0, 2 * Math.PI, !1);
                1 !== d && b.restore();
                this._fillStroke(b, a)
            }
        },
        _fillStroke: function(a, c) {
            var b = c.options;
            b.fill && (a.globalAlpha = b.fillOpacity, a.fillStyle = b.fillColor || b.color, a.fill(b.fillRule || "evenodd"));
            b.stroke && 0 !== b.weight && (a.globalAlpha = b.opacity, a.lineWidth = b.weight, a.strokeStyle = b.color, a.lineCap = b.lineCap, a.lineJoin = b.lineJoin, a.stroke())
        },
        _onClick: function(a) {
            for (var c, e, f = this._map.mouseEventToLayerPoint(a), d = this._drawFirst; d; d = d.next) c = d.layer,
            c.options.interactive && c._containsPoint(f) && !this._map._draggableMoved(c) && (e = c);
            e && (b.DomEvent._fakeStop(a), this._fireEvent([e], a))
        },
        _onMouseMove: function(a) {
            if (this._map && !this._map.dragging.moving() && !this._map._animatingZoom) {
                var c = this._map.mouseEventToLayerPoint(a);
                this._handleMouseHover(a, c)
            }
        },
        _handleMouseOut: function(a) {
            var c = this._hoveredLayer;
            c && (b.DomUtil.removeClass(this._container, "leaflet-interactive"), this._fireEvent([c], a, "mouseout"), this._hoveredLayer = null)
        },
        _handleMouseHover: function(a, c) {
            for (var e, f, d = this._drawFirst; d; d = d.next) e = d.layer,
            e.options.interactive && e._containsPoint(c) && (f = e);
            f !== this._hoveredLayer && (this._handleMouseOut(a), f && (b.DomUtil.addClass(this._container, "leaflet-interactive"), this._fireEvent([f], a, "mouseover"), this._hoveredLayer = f));
            this._hoveredLayer && this._fireEvent([this._hoveredLayer], a)
        },
        _fireEvent: function(a, c, b) {
            this._map._fireDOMEvent(c, b || c.type, a)
        },
        _bringToFront: function(a) {
            var c = a._order,
            b = c.next,
            f = c.prev;
            b && (b.prev = f, f ? f.next = b: b && (this._drawFirst = b), c.prev = this._drawLast, this._drawLast.next = c, c.next = null, this._drawLast = c, this._requestRedraw(a))
        },
        _bringToBack: function(a) {
            var c = a._order,
            b = c.next,
            f = c.prev;
            f && (f.next = b, b ? b.prev = f: f && (this._drawLast = f), c.prev = null, c.next = this._drawFirst, this._drawFirst.prev = c, this._drawFirst = c, this._requestRedraw(a))
        }
    });
    b.Browser.canvas = !!h.createElement("canvas").getContext;
    b.canvas = function(a) {
        return b.Browser.canvas ? new b.Canvas(a) : null
    };
    b.Polyline.prototype._containsPoint = function(a, c) {
        var e, f, d, g, m, h, l = this._clickTolerance();
        if (!this._pxBounds.contains(a)) return ! 1;
        e = 0;
        for (g = this._parts.length; e < g; e++) for (h = this._parts[e], f = 0, m = h.length, d = m - 1; f < m; d = f++) if ((c || 0 !== f) && b.LineUtil.pointToSegmentDistance(a, h[d], h[f]) <= l) return ! 0;
        return ! 1
    };
    b.Polygon.prototype._containsPoint = function(a) {
        var c, e, f, d, g, m, h, l = !1;
        if (!this._pxBounds.contains(a)) return ! 1;
        d = 0;
        for (m = this._parts.length; d < m; d++) for (c = this._parts[d], g = 0, h = c.length, f = h - 1; g < h; f = g++) e = c[g],
        f = c[f],
        e.y > a.y != f.y > a.y && a.x < (f.x - e.x) * (a.y - e.y) / (f.y - e.y) + e.x && (l = !l);
        return l || b.Polyline.prototype._containsPoint.call(this, a, !0)
    };
    b.CircleMarker.prototype._containsPoint = function(a) {
        return a.distanceTo(this._point) <= this._radius + this._clickTolerance()
    };
    b.GeoJSON = b.FeatureGroup.extend({
        initialize: function(a, c) {
            b.setOptions(this, c);
            this._layers = {};
            a && this.addData(a)
        },
        addData: function(a) {
            var c, e, f = b.Util.isArray(a) ? a: a.features;
            if (f) {
                a = 0;
                for (c = f.length; a < c; a++) e = f[a],
                (e.geometries || e.geometry || e.features || e.coordinates) && this.addData(e);
                return this
            }
            f = this.options;
            return f.filter && !f.filter(a) ? this: (c = b.GeoJSON.geometryToLayer(a, f)) ? (c.feature = b.GeoJSON.asFeature(a), c.defaultOptions = c.options, this.resetStyle(c), f.onEachFeature && f.onEachFeature(a, c), this.addLayer(c)) : this
        },
        resetStyle: function(a) {
            return a.options = b.Util.extend({},
            a.defaultOptions),
            this._setLayerStyle(a, this.options.style),
            this
        },
        setStyle: function(a) {
            return this.eachLayer(function(c) {
                this._setLayerStyle(c, a)
            },
            this)
        },
        _setLayerStyle: function(a, c) {
            "function" == typeof c && (c = c(a.feature));
            a.setStyle && a.setStyle(c)
        }
    });
    b.extend(b.GeoJSON, {
        geometryToLayer: function(a, c) {
            var e, f, d, g = "Feature" === a.type ? a.geometry: a,
            m = g ? g.coordinates: null,
            h = [],
            l = c && c.pointToLayer,
            r = c && c.coordsToLatLng || this.coordsToLatLng;
            if (!m && !g) return null;
            switch (g.type) {
            case "Point":
                return e = r(m),
                l ? l(a, e) : new b.Marker(e);
            case "MultiPoint":
                f = 0;
                for (d = m.length; f < d; f++) e = r(m[f]),
                h.push(l ? l(a, e) : new b.Marker(e));
                return new b.FeatureGroup(h);
            case "LineString":
            case "MultiLineString":
                return f = this.coordsToLatLngs(m, "LineString" === g.type ? 0 : 1, r),
                new b.Polyline(f, c);
            case "Polygon":
            case "MultiPolygon":
                return f = this.coordsToLatLngs(m, "Polygon" === g.type ? 1 : 2, r),
                new b.Polygon(f, c);
            case "GeometryCollection":
                f = 0;
                for (d = g.geometries.length; f < d; f++)(e = this.geometryToLayer({
                    geometry: g.geometries[f],
                    type: "Feature",
                    properties: a.properties
                },
                c)) && h.push(e);
                return new b.FeatureGroup(h);
            default:
                throw Error("Invalid GeoJSON object.");
            }
        },
        coordsToLatLng: function(a) {
            return new b.LatLng(a[1], a[0], a[2])
        },
        coordsToLatLngs: function(a, c, b) {
            for (var e, d = [], g = 0, m = a.length; g < m; g++) e = c ? this.coordsToLatLngs(a[g], c - 1, b) : (b || this.coordsToLatLng)(a[g]),
            d.push(e);
            return d
        },
        latLngToCoords: function(a) {
            return a.alt !== l ? [a.lng, a.lat, a.alt] : [a.lng, a.lat]
        },
        latLngsToCoords: function(a, c, e) {
            for (var f = [], d = 0, g = a.length; d < g; d++) f.push(c ? b.GeoJSON.latLngsToCoords(a[d], c - 1, e) : b.GeoJSON.latLngToCoords(a[d]));
            return ! c && e && f.push(f[0]),
            f
        },
        getFeature: function(a, c) {
            return a.feature ? b.extend({},
            a.feature, {
                geometry: c
            }) : b.GeoJSON.asFeature(c)
        },
        asFeature: function(a) {
            return "Feature" === a.type || "FeatureCollection" === a.type ? a: {
                type: "Feature",
                properties: {},
                geometry: a
            }
        }
    });
    m = {
        toGeoJSON: function() {
            return b.GeoJSON.getFeature(this, {
                type: "Point",
                coordinates: b.GeoJSON.latLngToCoords(this.getLatLng())
            })
        }
    };
    b.Marker.include(m);
    b.Circle.include(m);
    b.CircleMarker.include(m);
    b.Polyline.prototype.toGeoJSON = function() {
        var a = !b.Polyline._flat(this._latlngs),
        c = b.GeoJSON.latLngsToCoords(this._latlngs, a ? 1 : 0);
        return b.GeoJSON.getFeature(this, {
            type: (a ? "Multi": "") + "LineString",
            coordinates: c
        })
    };
    b.Polygon.prototype.toGeoJSON = function() {
        var a = !b.Polyline._flat(this._latlngs),
        c = a && !b.Polyline._flat(this._latlngs[0]),
        e = b.GeoJSON.latLngsToCoords(this._latlngs, c ? 2 : a ? 1 : 0, !0);
        return a || (e = [e]),
        b.GeoJSON.getFeature(this, {
            type: (c ? "Multi": "") + "Polygon",
            coordinates: e
        })
    };
    b.LayerGroup.include({
        toMultiPoint: function() {
            var a = [];
            return this.eachLayer(function(c) {
                a.push(c.toGeoJSON().geometry.coordinates)
            }),
            b.GeoJSON.getFeature(this, {
                type: "MultiPoint",
                coordinates: a
            })
        },
        toGeoJSON: function() {
            var a = this.feature && this.feature.geometry && this.feature.geometry.type;
            if ("MultiPoint" === a) return this.toMultiPoint();
            var c = "GeometryCollection" === a,
            e = [];
            return this.eachLayer(function(a) {
                a.toGeoJSON && (a = a.toGeoJSON(), e.push(c ? a.geometry: b.GeoJSON.asFeature(a)))
            }),
            c ? b.GeoJSON.getFeature(this, {
                geometries: e,
                type: "GeometryCollection"
            }) : {
                type: "FeatureCollection",
                features: e
            }
        }
    });
    b.geoJSON = function(a, c) {
        return new b.GeoJSON(a, c)
    };
    b.geoJson = b.geoJSON;
    b.Draggable = b.Evented.extend({
        options: {
            clickTolerance: 3
        },
        statics: {
            START: b.Browser.touch ? ["touchstart", "mousedown"] : ["mousedown"],
            END: {
                mousedown: "mouseup",
                touchstart: "touchend",
                pointerdown: "touchend",
                MSPointerDown: "touchend"
            },
            MOVE: {
                mousedown: "mousemove",
                touchstart: "touchmove",
                pointerdown: "touchmove",
                MSPointerDown: "touchmove"
            }
        },
        initialize: function(a, c, b) {
            this._element = a;
            this._dragStartTarget = c || a;
            this._preventOutline = b
        },
        enable: function() {
            this._enabled || (b.DomEvent.on(this._dragStartTarget, b.Draggable.START.join(" "), this._onDown, this), this._enabled = !0)
        },
        disable: function() {
            this._enabled && (b.Draggable._dragging === this && this.finishDrag(), b.DomEvent.off(this._dragStartTarget, b.Draggable.START.join(" "), this._onDown, this), this._enabled = !1, this._moved = !1)
        },
        _onDown: function(a) {
            if (!a._simulated && this._enabled && (this._moved = !1, !(b.DomUtil.hasClass(this._element, "leaflet-zoom-anim") || b.Draggable._dragging || a.shiftKey || 1 !== a.which && 1 !== a.button && !a.touches || (b.Draggable._dragging = this, this._preventOutline && b.DomUtil.preventOutline(this._element), b.DomUtil.disableImageDrag(), b.DomUtil.disableTextSelection(), this._moving)))) {
                this.fire("down");
                var c = a.touches ? a.touches[0] : a;
                this._startPoint = new b.Point(c.clientX, c.clientY);
                b.DomEvent.on(h, b.Draggable.MOVE[a.type], this._onMove, this).on(h, b.Draggable.END[a.type], this._onUp, this)
            }
        },
        _onMove: function(a) {
            if (!a._simulated && this._enabled) {
                if (a.touches && 1 < a.touches.length) return void(this._moved = !0);
                var c = a.touches && 1 === a.touches.length ? a.touches[0] : a,
                c = (new b.Point(c.clientX, c.clientY)).subtract(this._startPoint); (c.x || c.y) && (Math.abs(c.x) + Math.abs(c.y) < this.options.clickTolerance || (b.DomEvent.preventDefault(a), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = b.DomUtil.getPosition(this._element).subtract(c), b.DomUtil.addClass(h.body, "leaflet-dragging"), this._lastTarget = a.target || a.srcElement, d.SVGElementInstance && this._lastTarget instanceof SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), b.DomUtil.addClass(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(c), this._moving = !0, b.Util.cancelAnimFrame(this._animRequest), this._lastEvent = a, this._animRequest = b.Util.requestAnimFrame(this._updatePosition, this, !0)))
            }
        },
        _updatePosition: function() {
            var a = {
                originalEvent: this._lastEvent
            };
            this.fire("predrag", a);
            b.DomUtil.setPosition(this._element, this._newPos);
            this.fire("drag", a)
        },
        _onUp: function(a) { ! a._simulated && this._enabled && this.finishDrag()
        },
        finishDrag: function() {
            b.DomUtil.removeClass(h.body, "leaflet-dragging");
            this._lastTarget && (b.DomUtil.removeClass(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null);
            for (var a in b.Draggable.MOVE) b.DomEvent.off(h, b.Draggable.MOVE[a], this._onMove, this).off(h, b.Draggable.END[a], this._onUp, this);
            b.DomUtil.enableImageDrag();
            b.DomUtil.enableTextSelection();
            this._moved && this._moving && (b.Util.cancelAnimFrame(this._animRequest), this.fire("dragend", {
                distance: this._newPos.distanceTo(this._startPos)
            }));
            this._moving = !1;
            b.Draggable._dragging = !1
        }
    });
    b.Handler = b.Class.extend({
        initialize: function(a) {
            this._map = a
        },
        enable: function() {
            return this._enabled ? this: (this._enabled = !0, this.addHooks(), this)
        },
        disable: function() {
            return this._enabled ? (this._enabled = !1, this.removeHooks(), this) : this
        },
        enabled: function() {
            return !! this._enabled
        }
    });
    b.Map.mergeOptions({
        dragging: !0,
        inertia: !b.Browser.android23,
        inertiaDeceleration: 3400,
        inertiaMaxSpeed: 1 / 0,
        easeLinearity: .2,
        worldCopyJump: !1,
        maxBoundsViscosity: 0
    });
    b.Map.Drag = b.Handler.extend({
        addHooks: function() {
            if (!this._draggable) {
                var a = this._map;
                this._draggable = new b.Draggable(a._mapPane, a._container);
                this._draggable.on({
                    down: this._onDown,
                    dragstart: this._onDragStart,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                },
                this);
                this._draggable.on("predrag", this._onPreDragLimit, this);
                a.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), a.on("zoomend", this._onZoomEnd, this), a.whenReady(this._onZoomEnd, this))
            }
            b.DomUtil.addClass(this._map._container, "leaflet-grab leaflet-touch-drag");
            this._draggable.enable();
            this._positions = [];
            this._times = []
        },
        removeHooks: function() {
            b.DomUtil.removeClass(this._map._container, "leaflet-grab");
            b.DomUtil.removeClass(this._map._container, "leaflet-touch-drag");
            this._draggable.disable()
        },
        moved: function() {
            return this._draggable && this._draggable._moved
        },
        moving: function() {
            return this._draggable && this._draggable._moving
        },
        _onDown: function() {
            this._map._stop()
        },
        _onDragStart: function() {
            var a = this._map;
            if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
                var c = b.latLngBounds(this._map.options.maxBounds);
                this._offsetLimit = b.bounds(this._map.latLngToContainerPoint(c.getNorthWest()).multiplyBy( - 1), this._map.latLngToContainerPoint(c.getSouthEast()).multiplyBy( - 1).add(this._map.getSize()));
                this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity))
            } else this._offsetLimit = null;
            a.fire("movestart").fire("dragstart");
            a.options.inertia && (this._positions = [], this._times = [])
        },
        _onDrag: function(a) {
            if (this._map.options.inertia) {
                var c = this._lastTime = +new Date,
                b = this._lastPos = this._draggable._absPos || this._draggable._newPos;
                this._positions.push(b);
                this._times.push(c);
                50 < c - this._times[0] && (this._positions.shift(), this._times.shift())
            }
            this._map.fire("move", a).fire("drag", a)
        },
        _onZoomEnd: function() {
            var a = this._map.getSize().divideBy(2);
            this._initialWorldOffset = this._map.latLngToLayerPoint([0, 0]).subtract(a).x;
            this._worldWidth = this._map.getPixelWorldBounds().getSize().x
        },
        _viscousLimit: function(a, c) {
            return a - (a - c) * this._viscosity
        },
        _onPreDragLimit: function() {
            if (this._viscosity && this._offsetLimit) {
                var a = this._draggable._newPos.subtract(this._draggable._startPos),
                c = this._offsetLimit;
                a.x < c.min.x && (a.x = this._viscousLimit(a.x, c.min.x));
                a.y < c.min.y && (a.y = this._viscousLimit(a.y, c.min.y));
                a.x > c.max.x && (a.x = this._viscousLimit(a.x, c.max.x));
                a.y > c.max.y && (a.y = this._viscousLimit(a.y, c.max.y));
                this._draggable._newPos = this._draggable._startPos.add(a)
            }
        },
        _onPreDragWrap: function() {
            var a = this._worldWidth,
            c = Math.round(a / 2),
            b = this._initialWorldOffset,
            f = this._draggable._newPos.x,
            d = (f - c + b) % a + c - b,
            a = (f + c + b) % a - c - b,
            b = Math.abs(d + b) < Math.abs(a + b) ? d: a;
            this._draggable._absPos = this._draggable._newPos.clone();
            this._draggable._newPos.x = b
        },
        _onDragEnd: function(a) {
            var c = this._map,
            e = c.options,
            f = !e.inertia || 2 > this._times.length;
            if (c.fire("dragend", a), f) c.fire("moveend");
            else {
                a = this._lastPos.subtract(this._positions[0]);
                var d = e.easeLinearity,
                f = a.multiplyBy(d / ((this._lastTime - this._times[0]) / 1E3)),
                g = f.distanceTo([0, 0]);
                a = Math.min(e.inertiaMaxSpeed, g);
                var f = f.multiplyBy(a / g),
                m = a / (e.inertiaDeceleration * d),
                h = f.multiplyBy( - m / 2).round();
                h.x || h.y ? (h = c._limitOffset(h, c.options.maxBounds), b.Util.requestAnimFrame(function() {
                    c.panBy(h, {
                        duration: m,
                        easeLinearity: d,
                        noMoveStart: !0,
                        animate: !0
                    })
                })) : c.fire("moveend")
            }
        }
    });
    b.Map.addInitHook("addHandler", "dragging", b.Map.Drag);
    b.Map.mergeOptions({
        doubleClickZoom: !0
    });
    b.Map.DoubleClickZoom = b.Handler.extend({
        addHooks: function() {
            this._map.on("dblclick", this._onDoubleClick, this)
        },
        removeHooks: function() {
            this._map.off("dblclick", this._onDoubleClick, this)
        },
        _onDoubleClick: function(a) {
            var c = this._map,
            b = c.getZoom(),
            f = c.options.zoomDelta,
            b = a.originalEvent.shiftKey ? b - f: b + f;
            "center" === c.options.doubleClickZoom ? c.setZoom(b) : c.setZoomAround(a.containerPoint, b)
        }
    });
    b.Map.addInitHook("addHandler", "doubleClickZoom", b.Map.DoubleClickZoom);
    b.Map.mergeOptions({
        scrollWheelZoom: !0,
        wheelDebounceTime: 40,
        wheelPxPerZoomLevel: 60
    });
    b.Map.ScrollWheelZoom = b.Handler.extend({
        addHooks: function() {
            b.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this);
            this._delta = 0
        },
        removeHooks: function() {
            b.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll, this)
        },
        _onWheelScroll: function(a) {
            var c = b.DomEvent.getWheelDelta(a),
            e = this._map.options.wheelDebounceTime;
            this._delta += c;
            this._lastMousePos = this._map.mouseEventToContainerPoint(a);
            this._startTime || (this._startTime = +new Date);
            c = Math.max(e - ( + new Date - this._startTime), 0);
            clearTimeout(this._timer);
            this._timer = setTimeout(b.bind(this._performZoom, this), c);
            b.DomEvent.stop(a)
        },
        _performZoom: function() {
            var a = this._map,
            c = a.getZoom(),
            b = this._map.options.zoomSnap || 0;
            a._stop();
            var f = 4 * Math.log(2 / (1 + Math.exp( - Math.abs(this._delta / (4 * this._map.options.wheelPxPerZoomLevel))))) / Math.LN2,
            b = b ? Math.ceil(f / b) * b: f,
            b = a._limitZoom(c + (0 < this._delta ? b: -b)) - c;
            this._delta = 0;
            this._startTime = null;
            b && ("center" === a.options.scrollWheelZoom ? a.setZoom(c + b) : a.setZoomAround(this._lastMousePos, c + b))
        }
    });
    b.Map.addInitHook("addHandler", "scrollWheelZoom", b.Map.ScrollWheelZoom);
    b.extend(b.DomEvent, {
        _touchstart: b.Browser.msPointer ? "MSPointerDown": b.Browser.pointer ? "pointerdown": "touchstart",
        _touchend: b.Browser.msPointer ? "MSPointerUp": b.Browser.pointer ? "pointerup": "touchend",
        addDoubleTapListener: function(a, c, e) {
            function f(a) {
                var c;
                if (b.Browser.pointer) {
                    if (!b.Browser.edge || "mouse" === a.pointerType) return;
                    c = b.DomEvent._pointersCount
                } else c = a.touches.length;
                if (! (1 < c)) {
                    c = Date.now();
                    var e = c - (g || c);
                    m = a.touches ? a.touches[0] : a;
                    h = 0 < e && e <= l;
                    g = c
                }
            }
            function d(a) {
                if (h && !m.cancelBubble) {
                    if (b.Browser.pointer) {
                        if (!b.Browser.edge || "mouse" === a.pointerType) return;
                        var e, f = {};
                        for (e in m) a = m[e],
                        f[e] = a && a.bind ? a.bind(m) : a;
                        m = f
                    }
                    m.type = "dblclick";
                    c(m);
                    g = null
                }
            }
            var g, m, h = !1,
            l = 250,
            r = this._touchstart,
            p = this._touchend;
            return a["_leaflet_" + r + e] = f,
            a["_leaflet_" + p + e] = d,
            a["_leaflet_dblclick" + e] = c,
            a.addEventListener(r, f, !1),
            a.addEventListener(p, d, !1),
            a.addEventListener("dblclick", c, !1),
            this
        },
        removeDoubleTapListener: function(a, c) {
            var e = a["_leaflet_" + this._touchend + c],
            f = a["_leaflet_dblclick" + c];
            return a.removeEventListener(this._touchstart, a["_leaflet_" + this._touchstart + c], !1),
            a.removeEventListener(this._touchend, e, !1),
            b.Browser.edge || a.removeEventListener("dblclick", f, !1),
            this
        }
    });
    b.extend(b.DomEvent, {
        POINTER_DOWN: b.Browser.msPointer ? "MSPointerDown": "pointerdown",
        POINTER_MOVE: b.Browser.msPointer ? "MSPointerMove": "pointermove",
        POINTER_UP: b.Browser.msPointer ? "MSPointerUp": "pointerup",
        POINTER_CANCEL: b.Browser.msPointer ? "MSPointerCancel": "pointercancel",
        TAG_WHITE_LIST: ["INPUT", "SELECT", "OPTION"],
        _pointers: {},
        _pointersCount: 0,
        addPointerListener: function(a, c, b, f) {
            return "touchstart" === c ? this._addPointerStart(a, b, f) : "touchmove" === c ? this._addPointerMove(a, b, f) : "touchend" === c && this._addPointerEnd(a, b, f),
            this
        },
        removePointerListener: function(a, c, b) {
            b = a["_leaflet_" + c + b];
            return "touchstart" === c ? a.removeEventListener(this.POINTER_DOWN, b, !1) : "touchmove" === c ? a.removeEventListener(this.POINTER_MOVE, b, !1) : "touchend" === c && (a.removeEventListener(this.POINTER_UP, b, !1), a.removeEventListener(this.POINTER_CANCEL, b, !1)),
            this
        },
        _addPointerStart: function(a, c, e) {
            var f = b.bind(function(a) {
                if ("mouse" !== a.pointerType && a.MSPOINTER_TYPE_MOUSE && a.pointerType !== a.MSPOINTER_TYPE_MOUSE) {
                    if (! (0 > this.TAG_WHITE_LIST.indexOf(a.target.tagName))) return;
                    b.DomEvent.preventDefault(a)
                }
                this._handlePointer(a, c)
            },
            this); (a["_leaflet_touchstart" + e] = f, a.addEventListener(this.POINTER_DOWN, f, !1), this._pointerDocListener) || (a = b.bind(this._globalPointerUp, this), h.documentElement.addEventListener(this.POINTER_DOWN, b.bind(this._globalPointerDown, this), !0), h.documentElement.addEventListener(this.POINTER_MOVE, b.bind(this._globalPointerMove, this), !0), h.documentElement.addEventListener(this.POINTER_UP, a, !0), h.documentElement.addEventListener(this.POINTER_CANCEL, a, !0), this._pointerDocListener = !0)
        },
        _globalPointerDown: function(a) {
            this._pointers[a.pointerId] = a;
            this._pointersCount++
        },
        _globalPointerMove: function(a) {
            this._pointers[a.pointerId] && (this._pointers[a.pointerId] = a)
        },
        _globalPointerUp: function(a) {
            delete this._pointers[a.pointerId];
            this._pointersCount--
        },
        _handlePointer: function(a, c) {
            a.touches = [];
            for (var b in this._pointers) a.touches.push(this._pointers[b]);
            a.changedTouches = [a];
            c(a)
        },
        _addPointerMove: function(a, c, e) {
            var f = b.bind(function(a) { (a.pointerType !== a.MSPOINTER_TYPE_MOUSE && "mouse" !== a.pointerType || 0 !== a.buttons) && this._handlePointer(a, c)
            },
            this);
            a["_leaflet_touchmove" + e] = f;
            a.addEventListener(this.POINTER_MOVE, f, !1)
        },
        _addPointerEnd: function(a, c, e) {
            var f = b.bind(function(a) {
                this._handlePointer(a, c)
            },
            this);
            a["_leaflet_touchend" + e] = f;
            a.addEventListener(this.POINTER_UP, f, !1);
            a.addEventListener(this.POINTER_CANCEL, f, !1)
        }
    });
    b.Map.mergeOptions({
        touchZoom: b.Browser.touch && !b.Browser.android23,
        bounceAtZoomLimits: !0
    });
    b.Map.TouchZoom = b.Handler.extend({
        addHooks: function() {
            b.DomUtil.addClass(this._map._container, "leaflet-touch-zoom");
            b.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
        },
        removeHooks: function() {
            b.DomUtil.removeClass(this._map._container, "leaflet-touch-zoom");
            b.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this)
        },
        _onTouchStart: function(a) {
            var c = this._map;
            if (a.touches && 2 === a.touches.length && !c._animatingZoom && !this._zooming) {
                var e = c.mouseEventToContainerPoint(a.touches[0]),
                f = c.mouseEventToContainerPoint(a.touches[1]);
                this._centerPoint = c.getSize()._divideBy(2);
                this._startLatLng = c.containerPointToLatLng(this._centerPoint);
                "center" !== c.options.touchZoom && (this._pinchStartLatLng = c.containerPointToLatLng(e.add(f)._divideBy(2)));
                this._startDist = e.distanceTo(f);
                this._startZoom = c.getZoom();
                this._moved = !1;
                this._zooming = !0;
                c._stop();
                b.DomEvent.on(h, "touchmove", this._onTouchMove, this).on(h, "touchend", this._onTouchEnd, this);
                b.DomEvent.preventDefault(a)
            }
        },
        _onTouchMove: function(a) {
            if (a.touches && 2 === a.touches.length && this._zooming) {
                var c = this._map,
                e = c.mouseEventToContainerPoint(a.touches[0]),
                f = c.mouseEventToContainerPoint(a.touches[1]),
                d = e.distanceTo(f) / this._startDist;
                if (this._zoom = c.getScaleZoom(d, this._startZoom), !c.options.bounceAtZoomLimits && (this._zoom < c.getMinZoom() && 1 > d || this._zoom > c.getMaxZoom() && 1 < d) && (this._zoom = c._limitZoom(this._zoom)), "center" === c.options.touchZoom) {
                    if (this._center = this._startLatLng, 1 === d) return
                } else {
                    e = e._add(f)._divideBy(2)._subtract(this._centerPoint);
                    if (1 === d && 0 === e.x && 0 === e.y) return;
                    this._center = c.unproject(c.project(this._pinchStartLatLng, this._zoom).subtract(e), this._zoom)
                }
                this._moved || (c._moveStart(!0), this._moved = !0);
                b.Util.cancelAnimFrame(this._animRequest);
                c = b.bind(c._move, c, this._center, this._zoom, {
                    pinch: !0,
                    round: !1
                });
                this._animRequest = b.Util.requestAnimFrame(c, this, !0);
                b.DomEvent.preventDefault(a)
            }
        },
        _onTouchEnd: function() {
            return this._moved && this._zooming ? (this._zooming = !1, b.Util.cancelAnimFrame(this._animRequest), b.DomEvent.off(h, "touchmove", this._onTouchMove).off(h, "touchend", this._onTouchEnd), void(this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom)))) : void(this._zooming = !1)
        }
    });
    b.Map.addInitHook("addHandler", "touchZoom", b.Map.TouchZoom);
    b.Map.mergeOptions({
        tap: !0,
        tapTolerance: 15
    });
    b.Map.Tap = b.Handler.extend({
        addHooks: function() {
            b.DomEvent.on(this._map._container, "touchstart", this._onDown, this)
        },
        removeHooks: function() {
            b.DomEvent.off(this._map._container, "touchstart", this._onDown, this)
        },
        _onDown: function(a) {
            if (a.touches) {
                if (b.DomEvent.preventDefault(a), this._fireClick = !0, 1 < a.touches.length) return this._fireClick = !1,
                void clearTimeout(this._holdTimeout);
                var c = a.touches[0];
                a = c.target;
                this._startPos = this._newPos = new b.Point(c.clientX, c.clientY);
                a.tagName && "a" === a.tagName.toLowerCase() && b.DomUtil.addClass(a, "leaflet-active");
                this._holdTimeout = setTimeout(b.bind(function() {
                    this._isTapValid() && (this._fireClick = !1, this._onUp(), this._simulateEvent("contextmenu", c))
                },
                this), 1E3);
                this._simulateEvent("mousedown", c);
                b.DomEvent.on(h, {
                    touchmove: this._onMove,
                    touchend: this._onUp
                },
                this)
            }
        },
        _onUp: function(a) {
            if (clearTimeout(this._holdTimeout), b.DomEvent.off(h, {
                touchmove: this._onMove,
                touchend: this._onUp
            },
            this), this._fireClick && a && a.changedTouches) {
                a = a.changedTouches[0];
                var c = a.target;
                c && c.tagName && "a" === c.tagName.toLowerCase() && b.DomUtil.removeClass(c, "leaflet-active");
                this._simulateEvent("mouseup", a);
                this._isTapValid() && this._simulateEvent("click", a)
            }
        },
        _isTapValid: function() {
            return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
        },
        _onMove: function(a) {
            a = a.touches[0];
            this._newPos = new b.Point(a.clientX, a.clientY);
            this._simulateEvent("mousemove", a)
        },
        _simulateEvent: function(a, c) {
            var b = h.createEvent("MouseEvents");
            b._simulated = !0;
            c.target._simulatedClick = !0;
            b.initMouseEvent(a, !0, !0, d, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null);
            c.target.dispatchEvent(b)
        }
    });
    b.Browser.touch && !b.Browser.pointer && b.Map.addInitHook("addHandler", "tap", b.Map.Tap);
    b.Map.mergeOptions({
        boxZoom: !0
    });
    b.Map.BoxZoom = b.Handler.extend({
        initialize: function(a) {
            this._map = a;
            this._container = a._container;
            this._pane = a._panes.overlayPane
        },
        addHooks: function() {
            b.DomEvent.on(this._container, "mousedown", this._onMouseDown, this)
        },
        removeHooks: function() {
            b.DomEvent.off(this._container, "mousedown", this._onMouseDown, this)
        },
        moved: function() {
            return this._moved
        },
        _resetState: function() {
            this._moved = !1
        },
        _onMouseDown: function(a) {
            return ! (!a.shiftKey || 1 !== a.which && 1 !== a.button) && (this._resetState(), b.DomUtil.disableTextSelection(), b.DomUtil.disableImageDrag(), this._startPoint = this._map.mouseEventToContainerPoint(a), void b.DomEvent.on(h, {
                contextmenu: b.DomEvent.stop,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown
            },
            this))
        },
        _onMouseMove: function(a) {
            this._moved || (this._moved = !0, this._box = b.DomUtil.create("div", "leaflet-zoom-box", this._container), b.DomUtil.addClass(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart"));
            this._point = this._map.mouseEventToContainerPoint(a);
            a = new b.Bounds(this._point, this._startPoint);
            var c = a.getSize();
            b.DomUtil.setPosition(this._box, a.min);
            this._box.style.width = c.x + "px";
            this._box.style.height = c.y + "px"
        },
        _finish: function() {
            this._moved && (b.DomUtil.remove(this._box), b.DomUtil.removeClass(this._container, "leaflet-crosshair"));
            b.DomUtil.enableTextSelection();
            b.DomUtil.enableImageDrag();
            b.DomEvent.off(h, {
                contextmenu: b.DomEvent.stop,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown
            },
            this)
        },
        _onMouseUp: function(a) {
            1 !== a.which && 1 !== a.button || (this._finish(), !this._moved) || (setTimeout(b.bind(this._resetState, this), 0), a = new b.LatLngBounds(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point)), this._map.fitBounds(a).fire("boxzoomend", {
                boxZoomBounds: a
            }))
        },
        _onKeyDown: function(a) {
            27 === a.keyCode && this._finish()
        }
    });
    b.Map.addInitHook("addHandler", "boxZoom", b.Map.BoxZoom);
    b.Map.mergeOptions({
        keyboard: !0,
        keyboardPanDelta: 80
    });
    b.Map.Keyboard = b.Handler.extend({
        keyCodes: {
            left: [37],
            right: [39],
            down: [40],
            up: [38],
            zoomIn: [187, 107, 61, 171],
            zoomOut: [189, 109, 54, 173]
        },
        initialize: function(a) {
            this._map = a;
            this._setPanDelta(a.options.keyboardPanDelta);
            this._setZoomDelta(a.options.zoomDelta)
        },
        addHooks: function() {
            var a = this._map._container;
            0 >= a.tabIndex && (a.tabIndex = "0");
            b.DomEvent.on(a, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            },
            this);
            this._map.on({
                focus: this._addHooks,
                blur: this._removeHooks
            },
            this)
        },
        removeHooks: function() {
            this._removeHooks();
            b.DomEvent.off(this._map._container, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            },
            this);
            this._map.off({
                focus: this._addHooks,
                blur: this._removeHooks
            },
            this)
        },
        _onMouseDown: function() {
            if (!this._focused) {
                var a = h.body,
                c = h.documentElement,
                b = a.scrollTop || c.scrollTop,
                a = a.scrollLeft || c.scrollLeft;
                this._map._container.focus();
                d.scrollTo(a, b)
            }
        },
        _onFocus: function() {
            this._focused = !0;
            this._map.fire("focus")
        },
        _onBlur: function() {
            this._focused = !1;
            this._map.fire("blur")
        },
        _setPanDelta: function(a) {
            var c, b, f = this._panKeys = {},
            d = this.keyCodes;
            c = 0;
            for (b = d.left.length; c < b; c++) f[d.left[c]] = [ - 1 * a, 0];
            c = 0;
            for (b = d.right.length; c < b; c++) f[d.right[c]] = [a, 0];
            c = 0;
            for (b = d.down.length; c < b; c++) f[d.down[c]] = [0, a];
            c = 0;
            for (b = d.up.length; c < b; c++) f[d.up[c]] = [0, -1 * a]
        },
        _setZoomDelta: function(a) {
            var c, b, f = this._zoomKeys = {},
            d = this.keyCodes;
            c = 0;
            for (b = d.zoomIn.length; c < b; c++) f[d.zoomIn[c]] = a;
            c = 0;
            for (b = d.zoomOut.length; c < b; c++) f[d.zoomOut[c]] = -a
        },
        _addHooks: function() {
            b.DomEvent.on(h, "keydown", this._onKeyDown, this)
        },
        _removeHooks: function() {
            b.DomEvent.off(h, "keydown", this._onKeyDown, this)
        },
        _onKeyDown: function(a) {
            if (! (a.altKey || a.ctrlKey || a.metaKey)) {
                var c;
                c = a.keyCode;
                var e = this._map;
                if (c in this._panKeys) {
                    if (e._panAnim && e._panAnim._inProgress) return;
                    c = this._panKeys[c];
                    a.shiftKey && (c = b.point(c).multiplyBy(3));
                    e.panBy(c);
                    e.options.maxBounds && e.panInsideBounds(e.options.maxBounds)
                } else if (c in this._zoomKeys) e.setZoom(e.getZoom() + (a.shiftKey ? 3 : 1) * this._zoomKeys[c]);
                else {
                    if (27 !== c) return;
                    e.closePopup()
                }
                b.DomEvent.stop(a)
            }
        }
    });
    b.Map.addInitHook("addHandler", "keyboard", b.Map.Keyboard);
    b.Handler.MarkerDrag = b.Handler.extend({
        initialize: function(a) {
            this._marker = a
        },
        addHooks: function() {
            var a = this._marker._icon;
            this._draggable || (this._draggable = new b.Draggable(a, a, !0));
            this._draggable.on({
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd
            },
            this).enable();
            b.DomUtil.addClass(a, "leaflet-marker-draggable")
        },
        removeHooks: function() {
            this._draggable.off({
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd
            },
            this).disable();
            this._marker._icon && b.DomUtil.removeClass(this._marker._icon, "leaflet-marker-draggable")
        },
        moved: function() {
            return this._draggable && this._draggable._moved
        },
        _onDragStart: function() {
            this._oldLatLng = this._marker.getLatLng();
            this._marker.closePopup().fire("movestart").fire("dragstart")
        },
        _onDrag: function(a) {
            var c = this._marker,
            e = c._shadow,
            f = b.DomUtil.getPosition(c._icon),
            d = c._map.layerPointToLatLng(f);
            e && b.DomUtil.setPosition(e, f);
            c._latlng = d;
            a.latlng = d;
            a.oldLatLng = this._oldLatLng;
            c.fire("move", a).fire("drag", a)
        },
        _onDragEnd: function(a) {
            delete this._oldLatLng;
            this._marker.fire("moveend").fire("dragend", a)
        }
    });
    b.Control = b.Class.extend({
        options: {
            position: "topright"
        },
        initialize: function(a) {
            b.setOptions(this, a)
        },
        getPosition: function() {
            return this.options.position
        },
        setPosition: function(a) {
            var c = this._map;
            return c && c.removeControl(this),
            this.options.position = a,
            c && c.addControl(this),
            this
        },
        getContainer: function() {
            return this._container
        },
        addTo: function(a) {
            this.remove();
            this._map = a;
            var c = this._container = this.onAdd(a),
            e = this.getPosition();
            a = a._controlCorners[e];
            return b.DomUtil.addClass(c, "leaflet-control"),
            -1 !== e.indexOf("bottom") ? a.insertBefore(c, a.firstChild) : a.appendChild(c),
            this
        },
        remove: function() {
            return this._map ? (b.DomUtil.remove(this._container), this.onRemove && this.onRemove(this._map), this._map = null, this) : this
        },
        _refocusOnMap: function(a) {
            this._map && a && 0 < a.screenX && 0 < a.screenY && this._map.getContainer().focus()
        }
    });
    b.control = function(a) {
        return new b.Control(a)
    };
    b.Map.include({
        addControl: function(a) {
            return a.addTo(this),
            this
        },
        removeControl: function(a) {
            return a.remove(),
            this
        },
        _initControlPos: function() {
            function a(a, d) {
                c[a + d] = b.DomUtil.create("div", e + a + " " + e + d, f)
            }
            var c = this._controlCorners = {},
            e = "leaflet-",
            f = this._controlContainer = b.DomUtil.create("div", e + "control-container", this._container);
            a("top", "left");
            a("top", "right");
            a("bottom", "left");
            a("bottom", "right")
        },
        _clearControlPos: function() {
            b.DomUtil.remove(this._controlContainer)
        }
    });
    b.Control.Zoom = b.Control.extend({
        options: {
            position: "topleft",
            zoomInText: "+",
            zoomInTitle: "Zoom in",
            zoomOutText: "-",
            zoomOutTitle: "Zoom out"
        },
        onAdd: function(a) {
            var c = b.DomUtil.create("div", "leaflet-control-zoom leaflet-bar"),
            e = this.options;
            return this._zoomInButton = this._createButton(e.zoomInText, e.zoomInTitle, "leaflet-control-zoom-in", c, this._zoomIn),
            this._zoomOutButton = this._createButton(e.zoomOutText, e.zoomOutTitle, "leaflet-control-zoom-out", c, this._zoomOut),
            this._updateDisabled(),
            a.on("zoomend zoomlevelschange", this._updateDisabled, this),
            c
        },
        onRemove: function(a) {
            a.off("zoomend zoomlevelschange", this._updateDisabled, this)
        },
        disable: function() {
            return this._disabled = !0,
            this._updateDisabled(),
            this
        },
        enable: function() {
            return this._disabled = !1,
            this._updateDisabled(),
            this
        },
        _zoomIn: function(a) { ! this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (a.shiftKey ? 3 : 1))
        },
        _zoomOut: function(a) { ! this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (a.shiftKey ? 3 : 1))
        },
        _createButton: function(a, c, e, f, d) {
            e = b.DomUtil.create("a", e, f);
            return e.innerHTML = a,
            e.href = "#",
            e.title = c,
            e.setAttribute("role", "button"),
            e.setAttribute("aria-label", c),
            b.DomEvent.on(e, "mousedown dblclick", b.DomEvent.stopPropagation).on(e, "click", b.DomEvent.stop).on(e, "click", d, this).on(e, "click", this._refocusOnMap, this),
            e
        },
        _updateDisabled: function() {
            var a = this._map;
            b.DomUtil.removeClass(this._zoomInButton, "leaflet-disabled");
            b.DomUtil.removeClass(this._zoomOutButton, "leaflet-disabled"); (this._disabled || a._zoom === a.getMinZoom()) && b.DomUtil.addClass(this._zoomOutButton, "leaflet-disabled"); (this._disabled || a._zoom === a.getMaxZoom()) && b.DomUtil.addClass(this._zoomInButton, "leaflet-disabled")
        }
    });
    b.Map.mergeOptions({
        zoomControl: !0
    });
    b.Map.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new b.Control.Zoom, this.addControl(this.zoomControl))
    });
    b.control.zoom = function(a) {
        return new b.Control.Zoom(a)
    };
    b.Control.Attribution = b.Control.extend({
        options: {
            position: "bottomright",
            prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
        },
        initialize: function(a) {
            b.setOptions(this, a);
            this._attributions = {}
        },
        onAdd: function(a) {
            a.attributionControl = this;
            this._container = b.DomUtil.create("div", "leaflet-control-attribution");
            b.DomEvent && b.DomEvent.disableClickPropagation(this._container);
            for (var c in a._layers) a._layers[c].getAttribution && this.addAttribution(a._layers[c].getAttribution());
            return this._update(),
            this._container
        },
        setPrefix: function(a) {
            return this.options.prefix = a,
            this._update(),
            this
        },
        addAttribution: function(a) {
            return a ? (this._attributions[a] || (this._attributions[a] = 0), this._attributions[a]++, this._update(), this) : this
        },
        removeAttribution: function(a) {
            return a ? (this._attributions[a] && (this._attributions[a]--, this._update()), this) : this
        },
        _update: function() {
            if (this._map) {
                var a = [],
                c;
                for (c in this._attributions) this._attributions[c] && a.push(c);
                c = [];
                this.options.prefix && c.push(this.options.prefix);
                a.length && c.push(a.join(", "));
                this._container.innerHTML = c.join(" | ")
            }
        }
    });
    b.Map.mergeOptions({
        attributionControl: !0
    });
    b.Map.addInitHook(function() {
        this.options.attributionControl && (new b.Control.Attribution).addTo(this)
    });
    b.control.attribution = function(a) {
        return new b.Control.Attribution(a)
    };
    b.Control.Scale = b.Control.extend({
        options: {
            position: "bottomleft",
            maxWidth: 100,
            metric: !0,
            imperial: !0
        },
        onAdd: function(a) {
            var c = b.DomUtil.create("div", "leaflet-control-scale"),
            e = this.options;
            return this._addScales(e, "leaflet-control-scale-line", c),
            a.on(e.updateWhenIdle ? "moveend": "move", this._update, this),
            a.whenReady(this._update, this),
            c
        },
        onRemove: function(a) {
            a.off(this.options.updateWhenIdle ? "moveend": "move", this._update, this)
        },
        _addScales: function(a, c, e) {
            a.metric && (this._mScale = b.DomUtil.create("div", c, e));
            a.imperial && (this._iScale = b.DomUtil.create("div", c, e))
        },
        _update: function() {
            var a = this._map,
            c = a.getSize().y / 2,
            a = a.distance(a.containerPointToLatLng([0, c]), a.containerPointToLatLng([this.options.maxWidth, c]));
            this._updateScales(a)
        },
        _updateScales: function(a) {
            this.options.metric && a && this._updateMetric(a);
            this.options.imperial && a && this._updateImperial(a)
        },
        _updateMetric: function(a) {
            var c = this._getRoundNum(a);
            this._updateScale(this._mScale, 1E3 > c ? c + " m": c / 1E3 + " km", c / a)
        },
        _updateImperial: function(a) {
            var c, b, f;
            a *= 3.2808399;
            5280 < a ? (c = a / 5280, b = this._getRoundNum(c), this._updateScale(this._iScale, b + " mi", b / c)) : (f = this._getRoundNum(a), this._updateScale(this._iScale, f + " ft", f / a))
        },
        _updateScale: function(a, c, b) {
            a.style.width = Math.round(this.options.maxWidth * b) + "px";
            a.innerHTML = c
        },
        _getRoundNum: function(a) {
            var c = Math.pow(10, (Math.floor(a) + "").length - 1);
            a /= c;
            return a = 10 <= a ? 10 : 5 <= a ? 5 : 3 <= a ? 3 : 2 <= a ? 2 : 1,
            c * a
        }
    });
    b.control.scale = function(a) {
        return new b.Control.Scale(a)
    };
    b.Control.Layers = b.Control.extend({
        options: {
            collapsed: !0,
            position: "topright",
            autoZIndex: !0,
            hideSingleBase: !1,
            sortLayers: !1,
            sortFunction: function(a, c, b, f) {
                return b < f ? -1 : f < b ? 1 : 0
            }
        },
        initialize: function(a, c, e) {
            b.setOptions(this, e);
            this._layers = [];
            this._lastZIndex = 0;
            this._handlingClick = !1;
            for (var f in a) this._addLayer(a[f], f);
            for (f in c) this._addLayer(c[f], f, !0)
        },
        onAdd: function(a) {
            return this._initLayout(),
            this._update(),
            this._map = a,
            a.on("zoomend", this._checkDisabledLayers, this),
            this._container
        },
        onRemove: function() {
            this._map.off("zoomend", this._checkDisabledLayers, this);
            for (var a = 0; a < this._layers.length; a++) this._layers[a].layer.off("add remove", this._onLayerChange, this)
        },
        addBaseLayer: function(a, c) {
            return this._addLayer(a, c),
            this._map ? this._update() : this
        },
        addOverlay: function(a, c) {
            return this._addLayer(a, c, !0),
            this._map ? this._update() : this
        },
        removeLayer: function(a) {
            a.off("add remove", this._onLayerChange, this);
            a = this._getLayer(b.stamp(a));
            return a && this._layers.splice(this._layers.indexOf(a), 1),
            this._map ? this._update() : this
        },
        expand: function() {
            b.DomUtil.addClass(this._container, "leaflet-control-layers-expanded");
            this._form.style.height = null;
            var a = this._map.getSize().y - (this._container.offsetTop + 50);
            return a < this._form.clientHeight ? (b.DomUtil.addClass(this._form, "leaflet-control-layers-scrollbar"), this._form.style.height = a + "px") : b.DomUtil.removeClass(this._form, "leaflet-control-layers-scrollbar"),
            this._checkDisabledLayers(),
            this
        },
        collapse: function() {
            return b.DomUtil.removeClass(this._container, "leaflet-control-layers-expanded"),
            this
        },
        _initLayout: function() {
            var a = this._container = b.DomUtil.create("div", "leaflet-control-layers"),
            c = this.options.collapsed;
            a.setAttribute("aria-haspopup", !0);
            b.DomEvent.disableClickPropagation(a);
            b.Browser.touch || b.DomEvent.disableScrollPropagation(a);
            var e = this._form = b.DomUtil.create("form", "leaflet-control-layers-list");
            c && (this._map.on("click", this.collapse, this), b.Browser.android || b.DomEvent.on(a, {
                mouseenter: this.expand,
                mouseleave: this.collapse
            },
            this));
            var f = this._layersLink = b.DomUtil.create("a", "leaflet-control-layers-toggle", a);
            f.href = "#";
            f.title = "Layers";
            b.Browser.touch ? b.DomEvent.on(f, "click", b.DomEvent.stop).on(f, "click", this.expand, this) : b.DomEvent.on(f, "focus", this.expand, this);
            b.DomEvent.on(e, "click",
            function() {
                setTimeout(b.bind(this._onInputClick, this), 0)
            },
            this);
            c || this.expand();
            this._baseLayersList = b.DomUtil.create("div", "leaflet-control-layers-base", e);
            this._separator = b.DomUtil.create("div", "leaflet-control-layers-separator", e);
            this._overlaysList = b.DomUtil.create("div", "leaflet-control-layers-overlays", e);
            a.appendChild(e)
        },
        _getLayer: function(a) {
            for (var c = 0; c < this._layers.length; c++) if (this._layers[c] && b.stamp(this._layers[c].layer) === a) return this._layers[c]
        },
        _addLayer: function(a, c, e) {
            a.on("add remove", this._onLayerChange, this);
            this._layers.push({
                layer: a,
                name: c,
                overlay: e
            });
            this.options.sortLayers && this._layers.sort(b.bind(function(a, c) {
                return this.options.sortFunction(a.layer, c.layer, a.name, c.name)
            },
            this));
            this.options.autoZIndex && a.setZIndex && (this._lastZIndex++, a.setZIndex(this._lastZIndex))
        },
        _update: function() {
            if (!this._container) return this;
            b.DomUtil.empty(this._baseLayersList);
            b.DomUtil.empty(this._overlaysList);
            var a, c, e, f, d = 0;
            for (e = 0; e < this._layers.length; e++) f = this._layers[e],
            this._addItem(f),
            c = c || f.overlay,
            a = a || !f.overlay,
            d += f.overlay ? 0 : 1;
            return this.options.hideSingleBase && (a = a && 1 < d, this._baseLayersList.style.display = a ? "": "none"),
            this._separator.style.display = c && a ? "": "none",
            this
        },
        _onLayerChange: function(a) {
            this._handlingClick || this._update();
            var c = this._getLayer(b.stamp(a.target)); (a = c.overlay ? "add" === a.type ? "overlayadd": "overlayremove": "add" === a.type ? "baselayerchange": null) && this._map.fire(a, c)
        },
        _createRadioElement: function(a, c) {
            var b = '<input type="radio" class="leaflet-control-layers-selector" name="' + a + '"' + (c ? ' checked="checked"': "") + "/>",
            f = h.createElement("div");
            return f.innerHTML = b,
            f.firstChild
        },
        _addItem: function(a) {
            var c, e = h.createElement("label"),
            f = this._map.hasLayer(a.layer);
            a.overlay ? (c = h.createElement("input"), c.type = "checkbox", c.className = "leaflet-control-layers-selector", c.defaultChecked = f) : c = this._createRadioElement("leaflet-base-layers", f);
            c.layerId = b.stamp(a.layer);
            b.DomEvent.on(c, "click", this._onInputClick, this);
            f = h.createElement("span");
            f.innerHTML = " " + a.name;
            var d = h.createElement("div");
            e.appendChild(d);
            d.appendChild(c);
            d.appendChild(f);
            return (a.overlay ? this._overlaysList: this._baseLayersList).appendChild(e),
            this._checkDisabledLayers(),
            e
        },
        _onInputClick: function() {
            var a, c, b, f = this._form.getElementsByTagName("input"),
            d = [],
            g = [];
            this._handlingClick = !0;
            for (var m = f.length - 1; 0 <= m; m--) a = f[m],
            c = this._getLayer(a.layerId).layer,
            b = this._map.hasLayer(c),
            a.checked && !b ? d.push(c) : !a.checked && b && g.push(c);
            for (m = 0; m < g.length; m++) this._map.removeLayer(g[m]);
            for (m = 0; m < d.length; m++) this._map.addLayer(d[m]);
            this._handlingClick = !1;
            this._refocusOnMap()
        },
        _checkDisabledLayers: function() {
            for (var a, c, b = this._form.getElementsByTagName("input"), f = this._map.getZoom(), d = b.length - 1; 0 <= d; d--) a = b[d],
            c = this._getLayer(a.layerId).layer,
            a.disabled = c.options.minZoom !== l && f < c.options.minZoom || c.options.maxZoom !== l && f > c.options.maxZoom
        },
        _expand: function() {
            return this.expand()
        },
        _collapse: function() {
            return this.collapse()
        }
    });
    b.control.layers = function(a, c, e) {
        return new b.Control.Layers(a, c, e)
    }
} (window, document);
define("view/leafletMap", ["require", "exports", "leaflet"],
function(d, h) {
    h.__esModule = !0;
    L.Icon.Default.imagePath = (window.requirePath ? window.requirePath: ".") + "/js/library/leaflet-1.0.3/images/";
    L.MyFeatureGroup = L.FeatureGroup.extend({
        reomveByFilter: function(d) {
            var b, g, a; (g = "string" == typeof d) || (a = d instanceof Function);
            for (var c = this.getLayers(), e = c.length - 1, f; 0 <= e; e--) if (f = c[e], !(f instanceof Function)) if (a) 1 == d(f) && this.removeLayer(f);
            else if (g) null != f.options[d] && this.removeLayer(f);
            else {
                b = !0;
                for (var k in d) if (f.options[k] != d[k] && (b = null != f.options.attributes ? f.options.attributes[k] == d[k] : !1, !b)) break;
                b && this.removeLayer(f)
            }
        },
        graphicSelect: function(d, b) {
            var g, a;
            b || (g = []);
            for (var c = "string" == typeof d,
            e = this.getLayers(), f = 0, k; f < e.length; f++) {
                k = e[f];
                if (null != k.options.attributes) {
                    if (c && null != k.options.attributes[d]) {
                        if (b) return k;
                        g.push(k);
                        continue
                    }
                    a = !0;
                    for (var h in d) if (k.options.attributes[h] != d[h]) {
                        a = !1;
                        break
                    }
                } else {
                    if (c && null != k.options[d]) {
                        if (b) return k;
                        g.push(k);
                        continue
                    }
                    a = !0;
                    for (h in d) if (k.options[h] != d[h]) {
                        a = !1;
                        break
                    }
                }
                if (a) {
                    if (b) return k;
                    g.push(k)
                }
            }
            return g
        },
        graphicVisable: function(d, b) {
            for (var g = this.graphicSelect(d), a = 0; a < g.length; a++) b ? g[a].show() : g[a].hide()
        }
    });
    var l = function() {
        function g(b, d, a) {
            void 0 === a && (a = {
                id: 0,
                style: 0
            });
            this.mapId = b;
            this.mapOption = d;
            var c = {
                visiable: !0,
                hide: function() {
                    if (0 != this.visiable) {
                        var a = this.getElement();
                        a && (a.style.display = "none", this.visiable = !1)
                    }
                },
                show: function() {
                    if (1 != this.visiable) {
                        var a = this.getElement();
                        a && (a.style.display = "", this.visiable = !0)
                    }
                }
            };
            L.MyMarker = L.Marker.extend(c);
            b = function(a) {
                a.visiable = !0;
                a.hide = c.hide;
                a.show = c.show
            };
            b(L.Circle.prototype);
            b(L.CircleMarker.prototype);
            b(L.Polyline.prototype);
            b(L.Polygon.prototype);
            this.setMapTile(a)
        }
        g.prototype.setMapTile = function(b) {
            var g = this;
            this.map && (this.map.remove(), this.tileMap.destroy());
            var a = "view/tile/tileGoogle";
            1 === b.id ? a = "view/tile/tileAutonavi": 2 === b.id ? a = "view/tile/tileBaidu": 3 === b.id && (a = "view/tile/tileBing");
            d([a],
            function(a) {
                g.buildMap(a["default"].getInstance(b.style))
            })
        };
        g.prototype.buildMap = function(b) {
            this.tileMap = b;
            this.mapOption.attributionControl = !1;
            void 0 == this.mapOption.minZoom && (this.mapOption.minZoom = 3);
            this.mapOption.maxZoom = 18;
            if (b = this.tileMap.CRS()) this.mapOption.crs = b;
            this.map = L.map(this.mapId, this.mapOption);
            this.tileMap.addToMap(this.map);
            this.map.on("popupclose",
            function(a) {
                app.data.infoWindowHolder = !1;
                if (a.popup.onclose instanceof Function) a.popup.onclose()
            });
            var d = [],
            a = [],
            c = [],
            e;
            e = this.mapOption.zoom;
            this.map.on("layeradd",
            function(b) {
                e < b.layer.options.minZoom ? (b.layer.hide(), d.push(b.layer)) : 0 < b.layer.options.maxZoom && e > b.layer.options.maxZoom ? (b.layer.hide(), a.push(b.layer)) : (0 < b.layer.options.minZoom || 0 < b.layer.options.maxZoom) && c.push(b.layer)
            });
            this.map.on("zoomend",
            function(b) {
                b = this.getZoom();
                if (b < e) {
                    for (var f = 0,
                    g; f < c.length; f++) g = c[f],
                    g.options.minZoom > b && (g.hide(), c.splice(f--, 1), d.push(g));
                    for (f = 0; f < a.length; f++) g = a[f],
                    g.options.maxZoom >= b && (g.show(), a.splice(f--, 1), c.push(g))
                } else if (b > e) {
                    for (f = 0; f < c.length; f++) g = c[f],
                    g.options.maxZoom < b && (g.hide(), c.splice(f--, 1), a.push(g));
                    for (f = 0; f < d.length; f++) g = d[f],
                    g.options.minZoom <= b && (g.show(), d.splice(f--, 1), c.push(g))
                }
                e = b
            });
            this.onReady()
        };
        return g
    } ();
    h["default"] = l
});
define("view/typhoonRoute", ["data/typhoon"],
function(d) {
    typhoonData = d["default"];
    return function(d, l, g, b, m) {
        this.Visible = !1;
        this.TCIDX = d;
        this.TCNO = l;
        this.CNAME = g;
        this.ENAME = b;
        this.ForeRouteLine = {};
        this.ForeRouteGraphic = {};
        this.FocusPoint = null;
        this.onSelectPoint = function() {};
        this.setLiveRoute = function(a) {
            for (var c = a.length - 1; 1 < c; c--) a[c - 1].ISSUEDATE == a[c].ISSUEDATE && a.splice(c---1, 1);
            this.LiveRoute = a;
            if ("\u70ed\u5e26\u4f4e\u538b" == this.CNAME || "TD" == this.ENAME) a = typhoonData.level.getCode(this.LiveRoute[this.LiveRoute.length - 1].WIND),
            this.CNAME = a.name,
            "TD" == this.ENAME && (this.ENAME = a.code);
            for (c = 0; c < this.LiveRoute.length; c++) typhoonData.form(this, this.LiveRoute[c])
        };
        null != m && 0 == m[0].FORECASTDATE instanceof Date && this.setLiveRoute(m);
        this.removeForecast = function() {
            Typhoon.forecastLineLayer.reomveByFilter({
                TCIDX: this.TCIDX
            });
            Typhoon.forecastPointLayer.reomveByFilter({
                TCIDX: this.TCIDX
            });
            Typhoon.typhoonFuncLayer.reomveByFilter({
                TCIDX: this.TCIDX
            });
            this.ForeRouteLine = {};
            this.ForeRouteGraphic = {}
        };
        this.SelectPoint = function(a, c, b) {
            this.removeForecast();
            this.FocusPoint = a;
            var e;
            this.LiveRoute[0].ISSUEDATE == a.ISSUEDATE && (e = [ - 8, -5]);
            Typhoon.typhoonFuncLayer.addDateMarker(a.ISSUEDATE, [a.LATITUDE, a.LONGITUDE], {
                TCIDX: a.TCIDX
            },
            e);
            Typhoon.typhoonFuncLayer.drawWindRadii(a.TCNO, a.TCIDX, a.ISSUEDATE, c);
            var d = {
                tcidx: a.TCIDX || 0,
                tcno: a.TCNO,
                dt: a.ISSUEDATE,
                issueType: "BABJ BCGZ RJTD PGTW VHHH SZQX".split(" ")
            };
            app.webService("GetTyphoonForecast", d, {
                context: this,
                success: function(c) {
                    if (d.dt == this.FocusPoint.ISSUEDATE) {
                        this.ForeRouteGraphic = {};
                        for (var e in c) {
                            var f = typhoonData.formatDataList(this, c[e]);
                            if (0 == f[0].INTERVALTIME) {
                                if (f[0].LONGITUDE != a.LONGITUDE || f[0].LATITUDE != a.LATITUDE) {
                                    var g = Enumerable.From(this.LiveRoute).FirstOrDefault(null,
                                    function(a) {
                                        return 1E3 > Math.abs(a.ISSUEDATE - f[0].ISSUEDATE)
                                    });
                                    null != g && (f[0].LONGITUDE = g.LONGITUDE, f[0].LATITUDE = g.LATITUDE)
                                }
                            } else g = Enumerable.From(this.LiveRouteGraphic).FirstOrDefault(null,
                            function(a) {
                                return 1E3 > Math.abs(a.options.attributes.ISSUEDATE - f[0].ISSUEDATE)
                            }),
                            null != g && (g = $.extend(!0, {},
                            g.options.attributes), g.ISSUETYPE = e, g.INTERVALTIME = 0, g.FORECASTDATE = g.ISSUEDATE, f.splice(0, 0, g));
                            this.ForeRouteGraphic[e] = this.DrawForecastRoute(f, !1, "SZQX" == e ? 3 : 2)
                        }
                        this.onSelectPoint(a, b)
                    }
                }
            })
        };
        this.DrawForecastRoute = function(a, c, b) {
            var e = a[a.length - 1].ISSUETYPE;
            a = Enumerable.From(a).OrderBy(function(a) {
                return a.INTERVALTIME
            }).ToArray();
            var d = typhoonData.issuer[e];
            if (void 0 != d) {
                null != this.ForeRouteGraphic[d.code] && (delete this.ForeRouteGraphic[d.code], Typhoon.forecastLineLayer.ReomveByFilter({
                    TCIDX: this.TCIDX,
                    ISSUETYPE: d.code
                }), Typhoon.forecastPointLayer.ReomveByFilter({
                    TCIDX: this.TCIDX,
                    ISSUETYPE: d.code
                }));
                c = 1 == c || -1 < Typhoon.issuerList.indexOf(e);
                if (0 < a[0].INTERVALTIME) {
                    var g = $.extend(!0, {},
                    this.FocusPoint);
                    g.INTERVALTIME = 0;
                    a.splice(0, 0, g)
                }
                this.ForeRouteLine[e] = Typhoon.forecastLineLayer.drawLine(a, {
                    width: b || 2,
                    color: d.color
                },
                c);
                this.ForeRouteGraphic[e] = Typhoon.forecastPointLayer.drawPoint(a, {
                    width: d.width || 7,
                    visible: c
                });
                c && -1 < !Typhoon.issuerList.indexOf(e) && Typhoon.issuerList.push(e);
                return this.ForeRouteGraphic[e]
            }
        };
        this.hide = function() {
            Typhoon.typhoonLineLayer && (Typhoon.typhoonLineLayer.reomveByFilter({
                TCIDX: this.TCIDX,
                TCNO: this.TCNO
            }), Typhoon.typhoonPointLayer.reomveByFilter({
                TCIDX: this.TCIDX
            }), Typhoon.typhoonFuncLayer.reomveByFilter({
                TCIDX: this.TCIDX
            }), Typhoon.forecastLineLayer.reomveByFilter({
                TCIDX: this.TCIDX
            }), Typhoon.forecastPointLayer.reomveByFilter({
                TCIDX: this.TCIDX
            }));
            this.Visible = !1;
            this.onVisible && this.onVisible.call(this, !1)
        };
        this.show = function(a) {
            this.Visible || this.GetTyphoonRoute(function(c) {
                var b = c[c.length - 1];
                0 === b.WIND && 1 < c.length && (b = [c.length - 2]);
                this.TCLEVEL = b.TCLEVEL || typhoonData.level.getCode(b.WIND).code;
                null == this.StartTime && (this.StartTime = c[0].ISSUEDATE);
                null == this.EndTime && (this.EndTime = c[c.length - 1].ISSUEDATE);
                this.Visible = !0;
                Typhoon.typhoonLineLayer.drawLine(c, {
                    width: 3
                },
                {
                    TCIDX: this.TCIDX,
                    TCNO: this.TCNO
                });
                this.LiveRouteGraphic = Typhoon.typhoonPointLayer.drawPoint(c, {
                    isLoose: !0,
                    onLine: this.onLine
                });
                Typhoon.typhoonLineLayer.startMarker([c[0].LATITUDE, c[0].LONGITUDE], this.TCIDX, this.TCNO, ("TD" == this.TCNO ? "": this.TCNO) + (this.CNAME || this.ENAME));
                this.onVisible && this.onVisible.call(this, !0);
                a instanceof Function && a.call(this, this)
            })
        };
        this.getLastMoveSpeed = function() {
            var a = 0;
            if (this.LiveRoute) {
                var c = this.LiveRoute[this.LiveRoute.length - 1],
                a = c.MOVESPEED || 0;
                if ((0 === a || null == a) && 1 < this.LiveRoute.length) var a = this.LiveRoute[this.LiveRoute.length - 2],
                b = mathGeo.prototype.getDistance([c.LONGITUDE, c.LATITUDE], [a.LONGITUDE, a.LATITUDE]),
                a = Math.floor(b / 1E3 / ((c.ISSUEDATE - a.ISSUEDATE) / 36E5))
            }
            return a
        };
        this.GetTyphoonRoute = function(a) {
            null != this.LiveRoute ? a.call(this, this.LiveRoute) : app.webService("GetTyphoonRoute", {
                tcidx: this.TCIDX,
                tcno: this.TCNO
            },
            {
                context: this,
                success: function(c) {
                    this.setLiveRoute(c);
                    a.call(this, this.LiveRoute)
                },
                error: function(a) {
                    console.log("GetTyphoonRoute error")
                }
            })
        };
        this.on = function(a, c, b) {
            var e = "on" + a[0].toUpperCase() + a.slice(1, a.length);
            this.events || (this.events = {});
            var d = this.events;
            d[a] || (d[a] = []);
            this[e] && 0 == d[a].length && d[a].push({
                fuc: this[e]
            });
            c = {
                fuc: c,
                context: b,
                remove: function() {
                    for (var c = 0; c < d[a].length; c++) d[a][c] == this && d[a].splice(c, 1)
                }
            };
            d[a].push(c);
            this[e] = function(c) {
                for (var b = 0,
                e; b < d[a].length; b++) e = d[a][b],
                e.fuc.call(e.context || window, c)
            };
            return c
        };
        this.off = function(a) {
            this.events[a] && (this.events[a].length = 0, delete this.events[a])
        }
    }
});
define("view/typhoonRunning", ["view/leafletMap"],
function(d) {
    return function() {
        this.on = function(d, l, g, b) {
            this.iconLayer = L.marker(l, {
                icon: L.divIcon({
                    iconSize: [35, 35],
                    className: ""
                }),
                attributes: b
            }).addTo(d);
            var m = this.iconLayer.getElement(),
            a = 0;
            m.style.width = "35px";
            m.style.height = "35px";
            m.style.backgroundImage = "url(" + window.requirePath + "/images/typhoon.png)";
            m.style.transformOrigin = "center";
            "TD" == g ? g = 0 : "TS" == g ? g = 1 : "STS" == g ? g = 2 : "TY" == g ? g = 3 : "STY" == g ? g = 4 : "SuperTY" == g && (g = 5);
            m.style.backgroundPositionX = -35 * g + "px";
            0 == 10 > app.common.checkIE() && (this.interval = window.setInterval(function() {
                a -= 20;
                0 > a && (a = 360);
                var c = m.style.transform.indexOf("rotate");
                m.style.transform = 0 < c ? m.style.transform.substr(0, c) + "rotate(" + a + "deg)": m.style.transform + "rotate(" + a + "deg)"
            },
            100));
            var c = this;
            d.on("layerremove",
            function(a) {
                a.layer == c.iconLayer && window.clearInterval(c.interval)
            });
            return this
        };
        this.off = function() {
            this.iconLayer && (this.iconLayer._map.removeLayer(this.iconLayer), this.iconLayer = null, window.clearInterval(this.interval))
        }
    }
});
define("util/bezier", [],
function() {
    function d() {
        this.i0 = 0;
        this.d = [this]
    }
    function h(d, g, b, m) {
        if (1 > g >> 0) d = 1;
        else for (var a = d = 1;;) if (d *= +(a >> 0), a >> 0 < g >> 0) a = (a >> 0) + 1 >> 0;
        else break;
        if (1 > b >> 0) var c = 1;
        else for (a = c = 1;;) if (c *= +(a >> 0), a >> 0 < b >> 0) a = (a >> 0) + 1 >> 0;
        else break;
        var e = g - b >> 0;
        if (g >> 0 > b >> 0) for (a = g = 1;;) if (g *= +(a >> 0), a >> 0 < e >> 0) a = (a >> 0) + 1 >> 0;
        else break;
        else g = 1;
        return d / (c * g) * Math.pow(m, +(b >> 0)) * Math.pow(1 - m, +(e >> 0))
    }
    d.prototype.pointAtTime = function(d, g) {
        var b = d.length;
        if (0 < b >> 0) for (var m = (b >> 0) + -1 >> 0, a = 0, c = 0, e = 0;;) {
            var f = h(this, m >> 0, e >> 0, g),
            k = d[0 + (e >> 0) >> 0],
            l = k[0],
            u = +l.valueOf(),
            l = k[1],
            c = c + f * +l.valueOf(),
            a = a + f * u,
            e = (e >> 0) + 1 >> 0;
            if (! (e >> 0 < b >> 0)) break
        } else c = a = 0;
        return [a, c]
    };
    d.prototype.curves = function(d, g) {
        for (var b = [], m = d.length, a = 0 < m >> 0 ? 1 : 0, c = (m >> 0) + -1 >> 0, e = 0;;) {
            if (a >> 0) for (var f = 0,
            k = 0,
            l = 0;;) {
                var u = h(this, c >> 0, l >> 0, e),
                n = d[0 + (l >> 0) >> 0],
                x = n[0],
                r = +x.valueOf(),
                x = n[1],
                k = k + u * +x.valueOf(),
                f = f + u * r,
                l = (l >> 0) + 1 >> 0;
                if (! (l >> 0 < m >> 0)) break
            } else k = f = 0;
            n = [f, k];
            b.push(n);
            e += g;
            if (1 < e) break
        }
        return b
    };
    d.prototype._jiecheng = function(d) {
        if (1 > d >> 0) {
            var g;
            d = 1
        } else {
            for (var b = g = 1;;) if (g *= +(b >> 0), b >> 0 < d >> 0) b = (b >> 0) + 1 >> 0;
            else break;
            d = g
        }
        return d
    };
    d.prototype._bez = function(d, g, b) {
        return h(this, d, g, b)
    }; (function() {
        Math.imul || (Math.imul = function(d, g) {
            return d * g
        });
        return 0
    })();
    return window.bezier = d
});
define("view/circlePath", ["util/bezier"],
function(d) {
    return {
        _lastCutpointMaxLength: -1,
        _checkInnertPoint: function(d, l, g) {
            if (1 < d.length) {
                var b = d[d.length - 1];
                if (mathGeo.prototype.getDistance(b, l.center) < l.radius) return b = mathGeo.prototype.getAngle(l.center, b),
                l = mathGeo.prototype.getAnglePoint(l.center, l.radius, g ? b - 45 : b + 45),
                d.push(l),
                !0
            }
            return ! 1
        },
        _addPoint: function(d, l) {
            if (!isNaN(l[0])) if (1 < d.length) {
                var g = mathGeo.prototype.getAngleP3(d[d.length - 2], d[d.length - 1], l);
                90 < g && 270 > g && d.push(l)
            } else d.push(l)
        },
        _endDistance: 0,
        _addNextCircle: function(d, l, g, b) {
            var m = mathGeo.prototype.circleCommonTangent(g.center, g.radius, b.center, b.radius);
            if (m) this._checkInnertPoint(d, b, !1) || (this._addPoint(d, m[1]), this._addPoint(d, m[3])),
            this._checkInnertPoint(l, b, !0) || (this._addPoint(l, m[0]), this._addPoint(l, m[2]));
            else return 0 == l.length && 0 === g.radius ? (l.push(g.center), !0) : !1;
            0 < d.length && 0 < l.length && (g = mathGeo.prototype.getFlatDist(d[d.length - 1], l[l.length - 1]), g < this._endDistance && (d.splice(d.length - 1, 1), l.splice(l.length - 1, 1)), this._endDistance = g);
            return ! 0
        },
        _getCircleSection: function(d, l, g, b) {
            for (var m = [], a; g < b; g += 15) a = mathGeo.prototype.getAnglePoint(d, l, g),
            m.push(a);
            return m
        },
        getPath: function(d) {
            for (var h = [], g = [], b = 0; b < d.length - 1; b++) this._addNextCircle(h, g, d[b], d[b + 1]) || d.splice(b--, 1);
            b = d[d.length - 1];
            d = mathGeo.prototype.getAngle(b.center, h[h.length - 1]);
            var m = mathGeo.prototype.getAngle(b.center, g[g.length - 1]);
            m < d && (m += 360);
            d = this._getCircleSection(b.center, b.radius, d, m);
            for (b = 0; b < d.length; b++) h.push(d[b]);
            for (b = g.length - 1; 0 <= b; b--) h.push(g[b]);
            return h
        },
        smoothPath: function(h) {
            if (8 == app.common.checkIE()) return h;
            for (var l = [], g = [], b = 0, m; b < h.length; b++) {
                m = h.slice(b, b + 2);
                m = d.prototype.curves(m, .5);
                for (var a = 0; a < m.length; a++) l.push(m[a])
            }
            for (b = 0; b < l.length; b += 55) for (m = l.slice(b, b + 55), m = d.prototype.curves(m, .01), a = 0; a < m.length; a++) g.push(m[a]);
            return g
        }
    }
});
define("view/typhoonLayer", ["data/typhoon", "view/typhoonRunning", "view/circlePath"],
function(d, h, l) {
    typhoonData = d["default"];
    d = L.MyFeatureGroup.extend({
        drawLine: function(a, b, f) {
            for (var c = [], e, d = 0, g, m = a.length; d < m; d++) {
                g = a[d];
                var h = typhoonData.level.getColor(g.WINDCLASS);
                g = [g.LATITUDE, g.LONGITUDE];
                0 == d ? (e = h, c = [g]) : (c.push(g), h != e && (this.addLayer(L.polyline(c, {
                    weight: b.width,
                    opacity: 1,
                    attributes: f,
                    clickable: !1,
                    color: e
                })), c = [g], e = h))
            }
            1 < c.length && this.addLayer(L.polyline(c, {
                weight: b.width,
                opacity: 1,
                attributes: f,
                clickable: !1,
                color: e
            }))
        },
        startMarker: function(a, b, f, d) {
            this.addLayer(new L.MyMarker(a, {
                clickable: !1,
                attributes: {
                    TCIDX: b,
                    TCNO: f
                },
                icon: L.divIcon({
                    html: "<span style='white-space:nowrap; '>" + d + "</span>",
                    className: "coastalCity",
                    iconAnchor: [ - 10, 10]
                })
            }))
        }
    });
    var g = L.MyFeatureGroup.extend({
        pointRadius: 4,
        strokeWeight: 12,
        initialize: function(a) {
            this._layers = {};
            if (a) for (var c = 0,
            b = a.length; c < b; c++) this.addLayer(a[c]);
            this.on("mouseover",
            function(a) {
                a.layer.options.attributes.FORECASTDATE ? this._popMessage(a.layer.options.attributes, a.latlng, 1) : this._popMessage(a.layer.options.attributes, a.latlng, 0)
            });
            this.on("mouseout",
            function(a) {
                1 != app.data.infoWindowHolder && null != this.popupLayer && app.data.map.removeLayer(this.popupLayer)
            });
            this.on("click",
            function(a) {
                window.Freeze || (a.originalEvent.cancelBubble = !0, app.isMobile ? (this._popMessage(a.layer.options.attributes, a.latlng), app.data.infoWindowHolder = !0) : null == a.layer.options.attributes.FORECASTDATE && Typhoon.index[a.layer.options.attributes.TCIDX + a.layer.options.attributes.TCNO].SelectPoint(a.layer.options.attributes, null, !1))
            });
            return this
        },
        _popMessage: function(a, b, d) {
            if (1 != app.data.infoWindowHolder && a) {
                a = this.getHeader(a) + this.getContent(a);
                var c = 200,
                e = 86;
                app.isMobile && (c = 0, e = -5);
                this.popupLayer = L.popup({
                    className: "leafletPopupContent",
                    closeButton: !0,
                    autoPan: !1,
                    offset: L.point(c, e)
                }).setLatLng(b).setContent(a).openOn(app.data.map);
                app.isMobile || (b = "131px", 0 == d && (b = "101px"), $(this.popupLayer._tipContainer).css({
                    position: "absolute",
                    width: "0px",
                    height: "0px",
                    "border-top": "5px solid transparent",
                    "border-right": "102px solid #fff",
                    "border-bottom": "5px solid transparent",
                    top: b,
                    left: "-80px"
                }))
            }
        },
        _closePopMessage: function() {
            this.popupLayer && app.data.map.removeLayer(this.popupLayer)
        },
        getHeader: function(a) {
            var c = Typhoon.index[a.TCIDX + a.TCNO];
            return "<div style='padding:8px 8px'><div style='font-weight:bolder;font-family:\u5fae\u8f6f\u96c5\u9ed1;line-height:20px;'>" + (0 === a.TCNO.indexOf("TD") ? "TD": a.TCNO) + " " + c.CNAME + " " + c.ENAME + "</div><div style='line-height:20px;'>" + a.ISSUEDATE.format("yyyy-MM-dd HH:mm") + "</div></div>"
        },
        _getContent: function(a) {
            if (null == a.TOCENTER) {
                var c = mathGeo.prototype.getDistance(app.center.latlng, [a.LATITUDE, a.LONGITUDE], !0) / 1E3;
                a.CENTER = app.center.name;
                a.TOCENTER = Math.roundec(c, 0);
                a.TOCENTERNM = Math.roundec(c / 1.852, 0)
            }
            c = typhoonData.level.getNumber(a.WIND);
            18 == c && (c = "\u5927\u4e8e17");
            return "<div style='color:#000;background:#fff;padding:8px'><div style='line-height:20px;'>\u7ecf \u5ea6:&nbsp;&nbsp;" + a.LONGITUDE + "\u00b0E&nbsp;&nbsp;&nbsp;&nbsp;\u7eac \u5ea6:&nbsp;&nbsp;" + a.LATITUDE + "\u00b0N</div><div style='line-height:20px;'>\u98ce&nbsp;\u529b:&nbsp;&nbsp;" + c + "\u7ea7&nbsp;&nbsp;<b>" + typhoonData.level.getCode(a.WIND).name + "</b></div><div style='line-height:20px;'>\u6700\u5927\u98ce\u901f:&nbsp;&nbsp;" + a.WIND + "\u7c73/\u79d2</div><div style='line-height:20px;'>\u4e2d\u5fc3\u6c14\u538b:&nbsp;&nbsp;" + a.AIRPRESSURE + "\u767e\u5e15</div><div style='line-height:20px;'>\u8ddd\u79bb" + a.CENTER + ":&nbsp;&nbsp;" + a.TOCENTER + "\u516c\u91cc " + a.TOCENTERNM + "\u6d77\u91cc</div></div>"
        },
        getContent: function(a) {
            return this._getContent(a)
        },
        drawPoint: function(a, b) {
            for (var c = [], e = null, d = 0, g, m = a.length; d < m; d++) if (g = a[d], 0 !== g.INTERVALTIME) {
                var l = typhoonData.level.getCode(g.WIND),
                r = typhoonData.level.getColor(l.code);
                null == g.FORECASTDATE && d == m - 1 && b.onLine ? g = (new h).on(this, [g.LATITUDE, g.LONGITUDE], l.code, g).iconLayer: (g = L.circleMarker([g.LATITUDE, g.LONGITUDE], {
                    radius: this.pointRadius,
                    color: r,
                    weight: this.strokeWeight,
                    opacity: .4,
                    fillColor: r,
                    fillOpacity: 1,
                    attributes: g
                }), b.isLoose && (l = g, r = [l.options.attributes.LONGITUDE, l.options.attributes.LATITUDE], null == e || 0 == d || d == m - 1 ? e = r: 7E4 < mathGeo.prototype.getDistance(e, r) ? e = r: l.options.minZoom = 7), this.addLayer(g));
                0 == b.visible && g.hide();
                c.push(g)
            }
            return c
        }
    }),
    b = L.MyFeatureGroup.extend({
        drawLine: function(a, b, d) {
            for (var c = [], e = 0; e < a.length; e++) 0 > a[e].LONGITUDE && (a[e].LONGITUDE = 360 + a[e].LONGITUDE),
            c.push([a[e].LATITUDE, a[e].LONGITUDE]);
            a = L.polyline(c, {
                ISSUETYPE: a[0].ISSUETYPE,
                TCIDX: a[0].TCIDX,
                dashArray: "6,6",
                clickable: !1,
                weight: b.width || 1.6,
                opacity: 1,
                color: b.color
            });
            this.addLayer(a);
            0 == d && a.hide();
            return a
        }
    }),
    m = g.extend({
        pointRadius: 3,
        strokeWeight: 1,
        getHeader: function(a) {
            var c = Typhoon.index[a.TCIDX + a.TCNO];
            return "<div style='font-weight:bolder;padding-left:8px;padding-top:8px;'>" + a.TCNO + " " + c.CNAME + " " + c.ENAME + " " + typhoonData.issuer[a.ISSUETYPE].name + "</div><div style='padding:2px 8px'>\u53d1\u5e03\u65f6\u95f4:" + a.ISSUEDATE.format("yyyy-MM-dd HH:mm") + "</div><div style='padding:2px 8px'>\u672a\u6765\u65f6\u95f4:" + a.FORECASTDATE.format("yyyy-MM-dd HH:mm") + "</div><hr style='margin:3px;'/>"
        },
        getContent: function(a) {
            var c = this._getContent(a);
            return "<div style='padding:2px 8px'>\u9884\u62a5\u65f6\u957f\uff1a" + a.INTERVALTIME + "\u5c0f\u65f6</div>" + c
        },
        drawIssuerMarker: function(a, b) {
            for (var c = 1,
            e = a.length,
            d, g; c < e; c++) if (d = a[c].options.attributes, null == g && 24 <= d.INTERVALTIME || g && 864E5 <= d.FORECASTDATE - g) g = new L.MyMarker([d.LATITUDE, d.LONGITUDE], {
                minZoom: 6,
                clickable: !1,
                attributes: d,
                icon: L.divIcon({
                    html: d.FORECASTDATE.format("d\u65e5HH\u65f6"),
                    className: "coastalCity",
                    iconAnchor: [ - 5, 10]
                })
            }),
            this.addLayer(g),
            g = g.getElement(),
            g.style.paddingLeft = "5px",
            g.style.zIndex = 470,
            g.style.background = "#fff",
            g.style.width = "60px",
            g.style.height = "17px",
            g = d.FORECASTDATE
        }
    }),
    a = L.MyFeatureGroup.extend({
        addDateMarker: function(a, b, d, g) {
            a = new L.MyMarker(b, {
                minZoom: 4,
                clickable: !1,
                attributes: d,
                icon: L.divIcon({
                    html: a.format("d\u65e5HH\u65f6"),
                    className: "coastalCity",
                    iconAnchor: g || [ - 15, 10]
                })
            });
            this.addLayer(a);
            a = a.getElement();
            a.style.paddingLeft = "5px";
            a.style.zIndex = 470;
            a.style.background = "#fff";
            a.style.width = "60px";
            a.style.height = "17px"
        },
        setWindRadiusMarker: function(a, b) {
            for (var c = this.graphicSelect({
                TCIDX: b,
                WINDRADIUSTXT: !0
            }), e = 0; e < c.length; e++) a ? c[e].show() : c[e].hide()
        },
        drawWindRadii: function(a, b, d, g) {
            app.webService("GetWindRadii", {
                tcno: a,
                tcidx: b,
                issuedate: d
            },
            {
                context: this,
                success: function(a) {
                    if (a) {
                        this.reomveByFilter({
                            TCIDX: b,
                            WINDRADIUS: !0
                        });
                        var c = [a.LONGITUDE, a.LATITUDE];
                        0 < a.SEVENRADII_NE && this._drawWindCircle(b, c, [a.SEVENRADII_NE, a.SEVENRADII_SE, a.SEVENRADII_SW, a.SEVENRADII_NW], "rgba(127, 127, 255,1)", 7, g);
                        0 < a.TENRADII_NE && this._drawWindCircle(b, c, [a.TENRADII_NE, a.TENRADII_SE, a.TENRADII_SW, a.TENRADII_NW], "rgba(255, 127, 127,1)", 10, g);
                        0 < a.TWELVERADII_NE && this._drawWindCircle(b, c, [a.TWELVERADII_NE, a.TWELVERADII_SE, a.TWELVERADII_SW, a.TWELVERADII_NW], "rgba(255, 0, 0,1)", 12, g)
                    }
                }
            })
        },
        _drawWindCircle: function(a, b, d, g, m, h) {
            var c = this;
            require(["view/typhoonCircle"],
            function(e) {
                var f = new e([b[1], b[0]], [1E3 * d[0], 1E3 * d[1], 1E3 * d[2], 1E3 * d[3]], {
                    TCIDX: a,
                    weight: .5,
                    color: g,
                    fillColor: g,
                    attributes: {
                        WINDRADIUS: !0
                    }
                });
                c.addLayer(f);
                f.bringToBack();
                e = m + "\u7ea7";
                1 != h && (f.addEventListener("mouseover",
                function() {
                    c.setWindRadiusMarker(!0, a)
                },
                c), f.addEventListener("mouseout",
                function() {
                    c.setWindRadiusMarker(!1, a)
                },
                c));
                f = function(b, e, d, f) {
                    b = mathGeo.prototype.getCoordinate(b, 1E3 * e, d);
                    e = {
                        attributes: {
                            TCIDX: a,
                            WINDRADIUSTXT: !0
                        },
                        clickable: !1,
                        icon: L.divIcon({
                            html: "<span style='background:#E0EDFF'>" + (f || "") + e + "</span>",
                            className: "noborderIcon",
                            iconAnchor: [10, 10]
                        })
                    };
                    e.minZoom = 10 <= m ? 7 : 6;
                    e = new L.MyMarker(b.reverse(), e);
                    c.addLayer(e);
                    1 != h && e.hide()
                };
                if (d[0] == d[1]) d[2] == d[3] ? d[1] == d[2] ? f.call(c, b, d[0], 0, e) : (f.call(c, b, d[0], 90, e), f.call(c, b, d[2], 270)) : (f.call(c, b, d[0], 90, e), f.call(c, b, d[2], 225), f.call(c, b, d[3], 315));
                else if (d[3] == d[0]) f.call(c, b, d[0], 0, e),
                d[1] == d[2] ? f.call(c, b, d[1], 180) : (f.call(c, b, d[1], 135), f.call(c, b, d[2], 225));
                else if (d[2] == d[3]) f.call(c, b, d[0], 45, e),
                d[1] == d[2] ? f.call(c, b, d[2], 225) : (f.call(c, b, d[2], 270), f.call(c, b, d[1], 135));
                else if (d[1] == d[2]) f.call(c, b, d[3], 315),
                d[0] == d[1] ? f.call(c, b, d[1], 135) : (f.call(c, b, d[0], 45, e), f.call(c, b, d[1], 180));
                else for (var k = 0; 4 > k; k++) f.call(c, b, d[k], 45 + 90 * k, 0 == k ? e: "")
            })
        },
        drawForecastOffset: function(a, b, d, g) {
            $.ajax({
                url: window.requirePath + "/data/GetLastYearTYSCORESTAT.txt",
                dataType: "JSON",
                context: this,
                success: function(c) {
                    c = c.d;
                    var e = Typhoon.index[b.toString() + a],
                    f = e.ForeRouteGraphic[d],
                    m = [{
                        center: [e.FocusPoint.LONGITUDE, e.FocusPoint.LATITUDE],
                        radius: 0
                    }];
                    if (f) for (var k = 0,
                    h; k < f.length; k++) if (h = f[k].options.attributes, !(0 === h.INTERVALTIME || 0 >= h.FORECASTDATE - e.FocusPoint.ISSUEDATE)) for (var q = 0; q < c.length; q++) if (c[q].INTERVALTIME >= h.INTERVALTIME) {
                        var v = c[q].OFFSET;
                        c[q].INTERVALTIME > h.INTERVALTIME && (v = v * h.INTERVALTIME / c[q].INTERVALTIME);
                        m.push({
                            center: [h.LONGITUDE, h.LATITUDE],
                            radius: 1E3 * v
                        });
                        break
                    }
                    if (1 < m.length) {
                        c = l.getPath(m);
                        for (k = 0; k < c.length; k++) c[k].reverse();
                        c = l.smoothPath(c);
                        k = L.polygon(c, {
                            attributes: {
                                TCIDX: b,
                                TCNO: a,
                                ISSUETYPE: d
                            },
                            fillRule: "nonzero",
                            weight: 1,
                            opacity: .2,
                            fillOpacity: .1,
                            color: typhoonData.issuer[d].color
                        });
                        this.addLayer(k).bringToBack();
                        g instanceof Function && g(graphic)
                    }
                }
            })
        }
    });
    return {
        typhoonLineLayer: d,
        typhoonPointLayer: g,
        forecastLineLayer: b,
        forecastPointLayer: m,
        typhoonFuncLayer: a
    }
});
define("view/tyHelper", ["require", "exports", "view/typhoonRoute", "view/typhoonLayer"],
function(d, h, l, g) {
    h.__esModule = !0;
    d = function() {
        function b() {
            this.issuerList = "BABJ SZQX BCGZ RJTD PGTW VHHH".split(" ");
            this.index = {};
            this.forecastLineLayer = (new g.forecastLineLayer).addTo(app.data.map);
            this.forecastPointLayer = (new g.forecastPointLayer).addTo(app.data.map);
            this.typhoonLineLayer = (new g.typhoonLineLayer).addTo(app.data.map);
            this.typhoonPointLayer = (new g.typhoonPointLayer).addTo(app.data.map);
            this.typhoonFuncLayer = (new g.typhoonFuncLayer).addTo(app.data.map)
        }
        b.prototype.newRoute = function(b, a, c, e, d) {
            for (var f in this.index) if ( + f == b) return this.index[f + a];
            c = new l(b, a, c, e, d);
            return this.index[b.toString() + a] = c
        };
        b.prototype.Clear = function() {
            this.typhoonPointLayer.clearLayers();
            this.typhoonLineLayer.clearLayers();
            this.typhoonFuncLayer.clearLayers();
            this.forecastLineLayer.clearLayers();
            this.forecastPointLayer.clearLayers();
            Enumerable.From(this.index).ForEach(function(b) {
                b.Value.Visible = !1
            });
            this.index = {}
        };
        b.prototype.getTyphoonEffectDist = function(b, a, c) {
            a = window.mathGeo.prototype.getDistance(c, b, !0) / 1E3 - 10 * a;
            c[1] > b[1] && (a -= 50);
            c[0] < b[0] && (a -= 50);
            return a
        };
        b.prototype.SetIssuerVisible = function(b, a) {
            for (var c in this.index) if (1 == this.index[c].Visible) {
                var e = {
                    TCIDX: this.index[c].TCIDX,
                    ISSUETYPE: b
                };
                this.forecastLineLayer.graphicVisable(e, a);
                this.forecastPointLayer.graphicVisable(e, a);
                this.typhoonFuncLayer.graphicVisable(e, a)
            }
            c = this.issuerList.indexOf(b);
            1 == a ? -1 == c && this.issuerList.push(b) : 0 <= c && this.issuerList.splice(c, 1)
        };
        return b
    } ();
    h["default"] = d
});
define("app/default/helper", ["require", "exports", "util/mathGeo"],
function(d, h) {
    h.__esModule = !0;
    var l = function() {
        function d() {}
        d.prototype.fillMapHeight = function() {
            $("#map_div").css("height", $(window).height() - 66 - 62);
            return "map_div"
        };
        d.prototype.typoonOffline = function(b) {
            $("#currentTyphoon").show().html("<div style='text-align:center;'><b>\u897f\u592a\u5e73\u6d0b\u65e0\u53f0\u98ce</b><br/><span style='font-size:small;'>" + b.format("yyyy-MM-dd HH:mm") + "</span></div>");
            $("#routeListContainer").show().html("\u8bf7\u5148\u9009\u62e9\u53f0\u98ce");
            $("#routeListContainer").css({
                "text-align": "center",
                "font-size": "10px",
                color: "gray",
                "padding-top": "40px"
            });
            $("#currentTyphoon").css({
                left: window.innerWidth / 2 + "px"
            })
        };
        d.prototype.typhoonOnline = function(b, d) {
            var a, c;
            c = "TD" == d.TCLEVEL ? "\u70ed\u5e26\u4f4e\u538b": "TS" == d.TCLEVEL ? "\u70ed\u5e26\u98ce\u66b4": "STS" == d.TCLEVEL ? "\u5f3a\u70ed\u5e26\u98ce\u66b4": "TY" == d.TCLEVEL ? "\u53f0\u98ce": "STY" == d.TCLEVEL ? "\u5f3a\u53f0\u98ce": "SuperTY" == d.TCLEVEL ? "\u8d85\u5f3a\u53f0\u98ce": "";
            c = "" + (( - 1 == d.TCNO.indexOf("TD") ? d.TCNO: "") + " <b style='color:tomato;text-shadow:0px 0px 5px #888888'>" + d.ENAME + " " + d.CNAME + "</b><span style='font-size:16px;float:right;margin-left:10px'>\u5f3a\u5ea6:" + c + "</span>");
            for (var e = 0,
            f; e < b.length; e++) if (f = b[e], this.setTyphoonChecked(f.TCIDX, f.TCNO, f.CNAME, f.ENAME), d.TCIDX == f.TCIDX) a = f;
            else {
                var g = f.routes[f.routes.length - 1];
                c += "<br/>" + f.TCNO + " <b style='color:tomato;text-shadow:0px 0px 5px #888888''>" + f.ENAME + " " + f.CNAME + "</b><span style='font-size:16px;float:right;margin-left:10px'>\u5f3a\u5ea6:" + ("TD" == g.TCLEVEL ? "\u70ed\u5e26\u4f4e\u538b": "TS" == g.TCLEVEL ? "\u70ed\u5e26\u98ce\u66b4": "STS" == g.TCLEVEL ? "\u5f3a\u70ed\u5e26\u98ce\u66b4": "TY" == g.TCLEVEL ? "\u53f0\u98ce": "STY" == g.TCLEVEL ? "\u5f3a\u53f0\u98ce": "SuperTY" == g.TCLEVEL ? "\u8d85\u5f3a\u53f0\u98ce": "") + "</span>"
            }
            e = document.getElementById("currentTyphoon");
            $(e).html(c).show().css("left", document.body.offsetWidth / 2 - e.offsetWidth / 2);
            this.lastPointMessage(d, a)
        };
        d.prototype.setTyphoonChecked = function(b, d, a, c) {
            b = $(":checkbox[value='" + b + d + "']");
            d = "true" != b.attr("_checked");
            b.prop("checked", d).attr("_checked", d.toString())
        };
        d.prototype.lastPointMessage = function(b, d) {
            0 == b.MOVESPEED && this.checkMoveSpeed(b, d);
            var a = Math.ceil(window.mathGeo.prototype.getDistance([b.LATITUDE, b.LONGITUDE], app.center.latlng, !0) / 1E3),
            c = "TD" == b.TCLEVEL ? "\u70ed\u5e26\u4f4e\u538b": "TS" == b.TCLEVEL ? "\u70ed\u5e26\u98ce\u66b4": "STS" == b.TCLEVEL ? "\u5f3a\u70ed\u5e26\u98ce\u66b4": "TY" == b.TCLEVEL ? "\u53f0\u98ce": "STY" == b.TCLEVEL ? "\u5f3a\u53f0\u98ce": "SuperTY" == b.TCLEVEL ? "\u8d85\u5f3a\u53f0\u98ce": "",
            a = "<div style='font-size:small;padding-bottom:3px;'>" + b.TCNO + "-" + b.CNAME + "</div><div style='font-size:small'>" + b.ISSUEDATE.format("yyyy-MM-dd HH:mm:ss") + "</div><div>\u8ddd" + app.center.name + a + "km</div><div>\u6700\u5927\u98ce\u529b\uff1a" + b.WIND + "m/s</div><div>\u65f6\u901f\uff1a" + b.MOVESPEED + "km/h</div><div>\u4e2d\u5fc3\u6c14\u538b\uff1a" + b.AIRPRESSURE + "hPa<div><div>\u5f3a\u5ea6\uff1a" + c + "</div>";
            $("#lastTyphoonDetail").show().html(a)
        };
        d.prototype.checkMoveSpeed = function(b, d) {
            if (0 == b.MOVESPEED) {
                for (var a = void 0,
                c = d.routes.length - 1; 0 <= c && !(a = d.routes[c], a.ISSUEDATE < b.ISSUEDATE); c--);
                a && (c = window.mathGeo.prototype.getDistance([b.LATITUDE, b.LONGITUDE], [a.LATITUDE, a.LONGITUDE], !0), a = 1 * (b.ISSUEDATE.getTime() - a.ISSUEDATE.getTime()) / 36E5, b.MOVESPEED = Math.ceil(c / 1E3 / a))
            }
        };
        return d
    } ();
    h.defaultRuner = l
}); (function() {
    Array.prototype.indexOf = function(d) {
        for (var h = 0; h < this.length; h++) if (this[h] == d) return h;
        return - 1
    };
    String.prototype.toDate = function() {
        if (this.lastIndexOf("Z") == this.length - 1) return new Date(this);
        var d = /-{0,1}\d+/.exec(this);
        if (d) return new Date(parseFloat(d[0]))
    };
    Date.prototype.format = function(d) {
        var h = {
            M: this.getMonth() + 1,
            d: this.getDate(),
            H: this.getHours(),
            m: this.getMinutes(),
            s: this.getSeconds(),
            q: Math.floor((this.getMonth() + 3) / 3),
            S: this.getMilliseconds()
        };
        /(y+)/.test(d) && (d = d.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var l in h)(new RegExp("(" + l + "+)")).test(d) && (d = d.replace(RegExp.$1, 1 == RegExp.$1.length ? h[l] : ("00" + h[l]).substr(("" + h[l]).length)));
        return d
    };
    Element.prototype.appendText = function(d) {
        d = document.createTextNode(d);
        this.appendChild(d);
        return d
    };
    Element.prototype.appendElement = function(d, h) {
        var l = document.createElement(d),
        g;
        for (g in h) l.style.setProperty(g, h[g]);
        this.appendChild(l);
        return l
    };
    Math.roundec = function(d, h) {
        if (0 == d) return 0;
        for (var l = 1; 0 < h; l *= 10, h--);
        return Math.round(d * l) / l
    }
})();
var common = function() {
    function d() {}
    d.prototype.getQueryString = function(d) {
        return (d = (new RegExp("(^|)" + d + "=([^&]*)(&|$)", "gi")).exec(window.document.location.href)) && 1 < d.length ? d[2] : null
    };
    d.prototype.checkMobile = function() {
        return null != navigator.userAgent.match(/iPad/i) ? !1 : null != navigator.userAgent.match(/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i) ? !0 : !1
    };
    d.prototype.checkIE = function() {
        if ("Microsoft Internet Explorer" == navigator.appName) {
            var d = navigator.appVersion.split(";")[1].replace(/[ ]/g, "");
            if ("MSIE10.0" == d) return 10;
            if ("MSIE9.0" == d) return 9;
            if ("MSIE8.0" == d) return 8;
            if ("MSIE7.0" == d) return 7;
            if ("MSIE6.0" == d) return 6
        }
    };
    d.prototype.clone = function(d) {
        if (d.constructor == Array) {
            for (var h = [], g = 0; g < d.length; g++)"object" == typeof d[g] ? h.push(this.clone(d[g])) : h.push(d[g]);
            return h
        }
        if (d.constructor == Object || 0 == d.constructor instanceof Function) {
            h = {};
            for (g in d) h[g] != d[g] && (h[g] = "object" == typeof d[g] ? this.clone(d[g]) : d[g]);
            h.toString = d.toString;
            h.valueOf = d.valueOf;
            return h
        }
        if (d.constructor instanceof Function) return new d.constructor(d.valueOf())
    };
    d.prototype.webService = function(d, l, g) {
        var b = (window.requirePath ? window.requirePath: ".") + "/backService/service.asmx",
        m = function(a) {
            var c = "";
            if ("undefined" != typeof a.responseJSON) c = a.responseJSON.Message;
            else {
                var b = /\<title\>(.*)\<\/title\>/.exec(a.responseText);
                null != b && (c = b[1])
            }
            "" == c && a.responseText && (c = a.responseText.replace(/^\s+/g, ""));
            "" != c && alert(c)
        },
        a = function(a, c, d) {
            "undefined" == typeof JSON && $.ajax({
                url: "js/json2.js",
                dataType: "script",
                async: !1
            }); - 1 == a.indexOf(".aspx") && -1 == a.indexOf(".asmx") && (a = 0 == a.indexOf("./") ? document.location + "/" + a: b + "/" + a);
            c = c || {};
            d.dataType && "jsonp" == d.dataType.toLowerCase() ? (d.type = "get", d.data = c) : "get" != d.type && "GET" != d.type && (d.dataType = "json", d.type = "post", d.data = JSON.stringify(c), d.contentType = "application/json; charset=utf-8");
            d.url = a
        },
        c;
        g instanceof Function ? (c = {},
        a(d, l, c), c.success = function(a) {
            g("undefined" == typeof a.d ? a: a.d)
        }) : (c = g, a(d, l, c), c.success && (c.success = function(a) {
            return function(b) {
                a.call(c.context, "undefined" == typeof b.d ? b: b.d)
            }
        } (c.success)), c.async = 0 != c.async, c.error = c.error || m);
        $.ajax(c)
    };
    d.prototype.myCookie = function(d, l, g) {
        if ("undefined" != typeof l) {
            g = g || {};
            null === l && (l = "", g.expires = -1);
            var b = "",
            m;
            g.expires && ("number" == typeof g.expires ? (m = new Date, m.setTime(m.getTime() + 6E4 * g.expires)) : g.expires.toUTCString && (m = g.expires), b = "; expires=" + m.toUTCString());
            m = g.path ? "; path=" + g.path: "";
            var a = g.domain ? "; domain=" + g.domain: "";
            g = g.secure ? "; secure": "";
            document.cookie = [d, "=", encodeURIComponent(l), b, m, a, g].join("")
        } else {
            l = null;
            if (document.cookie && "" != document.cookie) for (b = document.cookie.split(";"), g = 0; g < b.length; g++) if (m = jQuery.trim(b[g]), m.substring(0, d.length + 1) == d + "=") {
                l = decodeURIComponent(m.substring(d.length + 1));
                break
            }
            return l
        }
    };
    return d
} ();
"undefined" != typeof define && define.amd ? define("util/common", [],
function() {
    return new common
}) : app.common = new common;
var globalData = {
    map: null
},
Common;
window.requirePath = window.requirePath ? window.requirePath: ".";
var _app = {
    isMobile: !1,
    center: {
        name: "\u6df1\u5733",
        latlng: [22.53994, 114.05961]
    },
    common: Common,
    webService: function(d, h, l) {
        var g;
        switch (d) {
        case "GetLastWarning":
        case "GetWelfaReport":
        case "GetLastTyphoonMessage":
            g = d;
            break;
        case "CheckCurrentTyphoon":
            12 >= h.hours && (g = d);
            break;
        case "GetTyphoonByYear":
            h.year >= (new Date).getFullYear() - 1 && (g = d + "_" + h.year);
            break;
        case "GetTyphoonWarning":
            1728E5 > (new Date).getTime() - h.dtime && (g = d + "_" + h.tcidx);
            break;
        case "GetTyphoonForecast":
            1728E5 > (new Date).getTime() - h.dt && (g = d + "_" + h.tcidx + "_" + h.dt.format("yyyyMMddHHmm"));
            break;
        case "GetWindRadii":
            1728E5 > (new Date).getTime() - h.issuedate && (g = d + "_" + h.tcidx + "_" + h.issuedate.format("yyyyMMddHHmm"))
        }
        g ? (jQuery.support.cors = !0, $.getJSON("//tf.szmb.gov.cn/weather/typhoonWeb/" + g + ".txt?" + (new Date).getTime(),
        function(b) {
            l instanceof Function ? l(b ? b.d || b: null) : l.success.call(l.context, b ? b.d || b: null)
        })) : app.common.webService(d, h, l)
    },
    data: globalData,
    visitorAnalisys: function() {
        var d = document.createElement("script");
        d.src = "//hm.baidu.com/hm.js?25813ebf84b2d048f1a5b956a4254ffd";
        var h = document.getElementsByTagName("script")[0];
        h.parentNode.insertBefore(d, h)
    },
    showError: function(d) {
        var h = "";
        if ("undefined" != typeof d.responseJSON) h = d.responseJSON.Message;
        else {
            var l = /\<title\>(.*)\<\/title\>/.exec(d.responseText);
            null != l && (h = l[1])
        }
        "" == h && d.responseText && (h = d.responseText.replace(/^\s+/g, ""));
        "" != h && alert(h)
    }
};
define("app/app", ["util/common"],
function(d) {
    _app.common = d;
    window.app = _app;
    "undefined" != typeof siteConfig && (siteConfig.center && (_app.center = siteConfig.center), siteConfig.visitorAnalisys && (_app.visitorAnalisys = siteConfig.visitorAnalisys));
    return _app
});
define("view/bottomLayer", ["view/leafletMap"],
function() {
    window.bottomLayer = L.MyFeatureGroup.extend({
        setCenterCity: function(d, h) {
            this.clearLayers();
            null == this.kmCircleGroup && (this.kmCircleGroup = L.featureGroup().addTo(app.data.map));
            this.kmCircleGroup.clearLayers();
            if (0 != d) {
                this.addLayer(L.marker(d.latlng, {
                    clickable: !1
                }));
                this.addLayer(new L.MyMarker(d.latlng, {
                    maxZoom: 7,
                    clickable: !1,
                    icon: L.divIcon({
                        html: d.name,
                        iconAnchor: [15, 3],
                        className: "shenzhen"
                    })
                }));
                for (var l = ["rgba(214,162,179,1)", "rgb(243,157,0)", "rgb(241,230,0)", "rgba(108,165,232,1)"], g = 0, b = h || [100, 300, 500, 800]; g < b.length; g++) {
                    var m = L.circle(d.latlng, 1E3 * b[g], {
                        fill: !1,
                        color: l[g],
                        weight: .8,
                        dashArray: "5, 5"
                    });
                    this.kmCircleGroup.addLayer(m);
                    m = mathGeo.prototype.getCoordinate(d.latlng, 1E3 * b[g], 180, !0);
                    this.addLayer(new L.MyMarker(m, {
                        minZoom: 5,
                        clickable: !1,
                        icon: L.divIcon({
                            html: b[g] + "Km",
                            iconAnchor: [20, -5],
                            className: "coastalCity"
                        })
                    }))
                }
                var a = this,
                l = function(c) {
                    7 < c.target.getZoom() ? a.kmCircleGroup.setStyle({
                        dashArray: null
                    }) : a.kmCircleGroup.setStyle({
                        dashArray: "5,5"
                    })
                };
                app.data.map.off("zoomend", l);
                app.data.map.on("zoomend", l)
            }
        },
        setCoastalCity: function() {
            for (var d = [["\u4e0a\u6d77\u5e02", [31.22, 121.47]], ["\u676d\u5dde\u5e02", [30.243, 120.167]], ["\u6e29\u5dde\u5e02", [27.96, 120.72]], ["\u798f\u5dde\u5e02", [26.07, 119.29]], ["\u53a6\u95e8\u5e02", [24.446, 118.075]], ["\u6c55\u5934\u5e02", [23.36, 116.683]], ["\u6c55\u5c3e\u5e02", [22.78251, 115.37655]], ["\u6d77\u53e3\u5e02", [20.04414, 110.20252]], ["\u6e5b\u6c5f\u5e02", [21.27256, 110.35633], 6], ["\u8302\u540d\u5e02", [21.65597, 110.93311], 6], ["\u9633\u6c5f\u5e02", [21.85495, 111.98231]]], h = 0, l; h < d.length; h++) l = d[h],
            this.addLayer(L.circleMarker(l[1], {
                minZoom: l[2] || 5,
                maxZoom: 7,
                fillColor: "blue",
                fillOpacity: 1
            }).setRadius(2)),
            l = new L.MyMarker(l[1], {
                minZoom: l[2] || 5,
                maxZoom: 7,
                clickable: !1,
                icon: L.divIcon({
                    html: "<span style='color:#00f'>" + l[0] + "</span>",
                    iconAnchor: [20, 20],
                    className: "coastalCity"
                })
            }),
            this.addLayer(l),
            l.getElement().style.zIndex = 10
        },
        warningLine: function(d) {
            this.reomveByFilter("warningling");
            0 != d && (this.addLayer(L.polyline([[34, 127], [22, 127], [18, 119], [11, 119], [4.5, 113], [0, 105], [0, 120], [15, 132], [34, 132]], {
                weight: .5,
                color: "rgb(0, 0, 255)",
                warningling: !0
            })), this.addLayer(new L.MyMarker([32, 127.2], {
                minZoom: 5,
                clickable: !1,
                icon: L.divIcon({
                    html: "24<br/>\u5c0f<br/>\u65f6<br/>\u8b66<br/>\u6212<br/>\u7ebf",
                    iconAnchor: [3, 0],
                    className: "coastalCity"
                }),
                warningling: !0
            })), this.addLayer(new L.MyMarker([32, 132.1], {
                minZoom: 5,
                clickable: !1,
                icon: L.divIcon({
                    html: "48<br/>\u5c0f<br/>\u65f6<br/>\u8b66<br/>\u6212<br/>\u7ebf",
                    iconAnchor: [0, 0],
                    className: "coastalCity"
                }),
                warningling: !0
            })))
        }
    })
});
define("app/default/control", "require exports data/typhoon view/leafletMap view/tyHelper app/default/helper app/app util/mathGeo view/bottomLayer".split(" "),
function(d, h, l, g, b, m) {
    h.__esModule = !0;
    var a = function() {
        function a() {
            var a = this,
            c = new m.defaultRuner,
            d = c.fillMapHeight();
            this.leafletUtil = new g["default"](d, {
                center: [22, 123],
                zoom: 5,
                zoomControl: !1
            },
            {
                id: 1,
                style: 0
            });
            this.leafletUtil.onReady = function() {
                app.data.map = a.leafletUtil.map;
                window.onresize = function() {
                    c.fillMapHeight()
                };
                a.tyManager = new b["default"];
                window.Typhoon = a.tyManager;
                a.bottomlayers = (new bottomLayer).addTo(app.data.map);
                a.bottomlayers.setCenterCity(app.center);
                a.bottomlayers.warningLine(); (new l["default"]).getCurrentTyphoon(12,
                function(b, e, d, f) {
                    0 < e.length ? (app.data.map.once("moveend",
                    function() {
                        for (var b = 0; b < e.length; b++) e[b].onLine = !0,
                        a.onTyphoon(e[b]);
                        c.typhoonOnline(e, d);
                        a._onCurrentTyphoon(e, d)
                    }), app.data.map.setView([d.LATITUDE, d.LONGITUDE])) : c.typoonOffline(b);
                    a._onload && a._onload();
                    app.visitorAnalisys()
                })
            }
        }
        a.prototype.onload = function(a) {
            this._onload = a
        };
        a.prototype._onCurrentTyphoon = function(a, c) {};
        a.prototype.onCurrentTyphoon = function(a) {
            this._onCurrentTyphoon = a
        };
        a.prototype.onTyphoon = function(c, b) {
            var e = this,
            d = this.tyManager.newRoute(c.TCIDX, c.TCNO, c.CNAME, c.ENAME, c.routes); (function(c) {
                d.onLine = c.onLine;
                d.show(function() {
                    d.onSelectPoint = function(c, b) {
                        var f = d.ForeRouteGraphic.BABJ;
                        f && (e.tyManager.forecastPointLayer.drawIssuerMarker(f, "BABJ"), e.tyManager.typhoonFuncLayer.drawForecastOffset(d.TCNO, d.TCIDX, "BABJ"));
                        a.prototype.getCityDistance([c.LATITUDE, c.LONGITUDE]);
                        b || (e.selectPointByHand = c, e.onTyphoonPointChange(c))
                    };
                    var f = c.routes[c.routes.length - 1];
                    c.onLine && d.SelectPoint(f, null, !0);
                    b && b()
                })
            })(c)
        };
        a.prototype.offTyphoon = function(a, c) {
            this.selectPointByHand = null;
            var b = this.tyManager.index[a + c];
            b && b.hide()
        };
        a.prototype.onTyphoonPointChange = function(a) {};
        a.prototype.onSatellite = function(a, c, b) {
            if (this.satelliteImgLayer) this.satelliteImgLayer.setUrl(c);
            else {
                var e = L.latLngBounds([[ - 10.787277369124666, 62.8820698883665], [56.38584531412721, 161.69675114151386]]);
                this.satelliteImgLayer = L.imageOverlay(c, e, {
                    opacity: .9
                }).addTo(window.app.data.map)
            }
            this.leafletUtil.tileMap.setStyle(1);
            b && (this.satelliteImgLayer._image.onload = this.satelliteImgLayer._image.onerror = function(a) {
                return function() {
                    b(a)
                }
            } (a))
        };
        a.prototype.offSatellite = function() {
            this.satelliteImgLayer && (window.app.data.map.removeLayer(this.satelliteImgLayer), this.satelliteImgLayer = null)
        };
        a.prototype.onRadar = function(a, c, b) {
            if (this.radarImgLayer) this.radarImgLayer.setUrl(c);
            else {
                var e = L.latLngBounds([[19.0419, 108.505], [26.0419, 117.505]]);
                this.radarImgLayer = L.imageOverlay(c, e, {
                    opacity: .8
                }).addTo(app.data.map)
            }
            b && (this.radarImgLayer._image.onload = this.radarImgLayer._image.onerror = function() {
                b(a)
            })
        };
        a.prototype.offRadar = function() {
            this.radarImgLayer && (app.data.map.removeLayer(this.radarImgLayer), this.radarImgLayer = null)
        };
        a.prototype.onRain = function(a, c, b) {
            if (this.rainImgLayer) this.rainImgLayer.setUrl(c);
            else {
                var e = L.latLngBounds([[17.79, 72.76], [53.81, 135.64]]);
                this.rainImgLayer = L.imageOverlay(c, e, {
                    opacity: .5
                }).addTo(app.data.map)
            }
            b && (this.rainImgLayer._image.onload = this.rainImgLayer._image.onerror = function() {
                b(a)
            })
        };
        a.prototype.offRain = function() {
            this.rainImgLayer && (app.data.map.removeLayer(this.rainImgLayer), this.rainImgLayer = null)
        };
        a.prototype.onObt = function(a) {
            d(["view/windLayer"],
            function(c) {
                windBar.show(a);
                0 < navigator.userAgent.indexOf("MSIE") && (0 < navigator.userAgent.indexOf("MSIE 6.0") || 0 < navigator.userAgent.indexOf("MSIE 7.0") || 0 < navigator.userAgent.indexOf("MSIE 8.0")) && alert("\u6b64\u529f\u80fd\u5728ie8\u53caie8\u4ee5\u4e0b\u663e\u793a\u53d7\u9650\uff0c\u8bf7\u5347\u7ea7\u60a8\u7684\u6d4f\u89c8\u5668\u81f3ie8\u4ee5\u4e0a\u3002")
            })
        };
        a.prototype.offObt = function() {
            windBar.clear()
        };
        a.prototype.onWind = function(a, c) {
            d(["module/gfs/main"],
            function(b) {
                null == a.windImgLayer && (a.windImgLayer = new b.main(app.data.map));
                a.windImgLayer.onShow(function(a, b) {
                    c(b)
                })
            })
        };
        a.prototype.offWind = function() {
            this.windImgLayer.destroy();
            this.windImgLayer = null
        };
        a.prototype.getTyphoonList = function(a, c) { (new l["default"]).getTyphoonByYear(a, c)
        };
        a.prototype.getTyphoonOne = function(a, c, b, d, g) {
            l["default"].getTyphoonOne(a, c, b, d, g)
        };
        a.prototype.getCityDistance = function(a) {
            for (var c = [{
                "\u6df1\u5733\u5e02": [22.53994, 114.05961]
            },
            {
                "\u5e7f\u5dde\u5e02": [23.217, 113.483]
            },
            {
                "\u73e0\u6d77\u5e02": [22.283, 113.567]
            },
            {
                "\u4e2d\u5c71\u5e02": [22.5, 113.4]
            },
            {
                "\u4f5b\u5c71\u5e02": [23.15, 113.017]
            },
            {
                "\u6c5f\u95e8\u5e02": [22.533, 113.033]
            },
            {
                "\u9633\u6c5f\u5e02": [21.833, 111.967]
            },
            {
                "\u8302\u540d\u5e02": [21.75, 110.917]
            },
            {
                "\u6e5b\u6c5f\u5e02": [21.15, 110.3]
            },
            {
                "\u5317\u6d77\u5e02": [21.45, 109.133]
            },
            {
                "\u6d77\u53e3\u5e02": [20, 110.25]
            },
            {
                "\u4e1c\u839e\u5e02": [22.967, 113.733]
            },
            {
                "\u60e0\u5dde\u5e02": [23.067, 114.367]
            },
            {
                "\u6c55\u5c3e\u5e02": [22.8, 115.367]
            },
            {
                "\u6c55\u5934\u5e02": [23.4, 116.683]
            },
            {
                "\u53a6\u95e8\u5e02": [24.446, 118.068]
            },
            {
                "\u798f\u5dde\u5e02": [26.083, 119.283]
            },
            {
                "\u6e29\u5dde\u5e02": [28.033, 120.65]
            },
            {
                "\u5b81\u6ce2\u5e02": [30.517, 120.65]
            },
            {
                "\u676d\u5dde\u5e02": [30.233, 120.167]
            },
            {
                "\u4e0a\u6d77\u5e02": [31.4, 121.45]
            }], b = [], e = 0; e < c.length; e++) {
                var d = c[e],
                g;
                for (g in d) b.push({
                    city: g,
                    distance: Math.ceil(window.mathGeo.prototype.getDistance(a, d[g], !0) / 1E3)
                })
            }
            return b
        };
        a.prototype.showCityDistance = function(a) {
            var c = $("#cityList");
            c.html();
            for (var b = "",
            e = 0; e < a.length; e++) b += "<div style='cursor:pointer' onclick='defaultPage.cityPosition(this)'>" + a[e].city + "</div><div>" + a[e].distance + "km</div>";
            c.html(b)
        };
        a.prototype.getAvailableWarning = function(a) {
            app.webService("GetLastWarning", {},
            function(c) {
                a(c)
            })
        };
        return a
    } ();
    h.DefaultApp = a
});
if ("undefined" == typeof jQuery) throw Error("Bootstrap's JavaScript requires jQuery"); +
function(d) {
    d = d.fn.jquery.split(" ")[0].split(".");
    if (2 > d[0] && 9 > d[1] || 1 == d[0] && 9 == d[1] && 1 > d[2]) throw Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");
} (jQuery); +
function(d) {
    function h() {
        var d = document.createElement("bootstrap"),
        g = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        },
        b;
        for (b in g) if (void 0 !== d.style[b]) return {
            end: g[b]
        };
        return ! 1
    }
    d.fn.emulateTransitionEnd = function(h) {
        var g = !1,
        b = this;
        d(this).one("bsTransitionEnd",
        function() {
            g = !0
        });
        return setTimeout(function() {
            g || d(b).trigger(d.support.transition.end)
        },
        h),
        this
    };
    d(function() {
        d.support.transition = h();
        d.support.transition && (d.event.special.bsTransitionEnd = {
            bindType: d.support.transition.end,
            delegateType: d.support.transition.end,
            handle: function(h) {
                return d(h.target).is(this) ? h.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
} (jQuery); +
function(d) {
    var h = function(g) {
        d(g).on("click", '[data-dismiss="alert"]', this.close)
    };
    h.VERSION = "3.3.5";
    h.TRANSITION_DURATION = 150;
    h.prototype.close = function(g) {
        function b() {
            c.detach().trigger("closed.bs.alert").remove()
        }
        var m = d(this),
        a = m.attr("data-target");
        a || (a = m.attr("href"), a = a && a.replace(/.*(?=#[^\s]*$)/, ""));
        var c = d(a);
        g && g.preventDefault();
        c.length || (c = m.closest(".alert"));
        c.trigger(g = d.Event("close.bs.alert"));
        g.isDefaultPrevented() || (c.removeClass("in"), d.support.transition && c.hasClass("fade") ? c.one("bsTransitionEnd", b).emulateTransitionEnd(h.TRANSITION_DURATION) : b())
    };
    var l = d.fn.alert;
    d.fn.alert = function(g) {
        return this.each(function() {
            var b = d(this),
            m = b.data("bs.alert");
            m || b.data("bs.alert", m = new h(this));
            "string" == typeof g && m[g].call(b)
        })
    };
    d.fn.alert.Constructor = h;
    d.fn.alert.noConflict = function() {
        return d.fn.alert = l,
        this
    };
    d(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', h.prototype.close)
} (jQuery); +
function(d) {
    function h(b) {
        return this.each(function() {
            var g = d(this),
            a = g.data("bs.button"),
            c = "object" == typeof b && b;
            a || g.data("bs.button", a = new l(this, c));
            "toggle" == b ? a.toggle() : b && a.setState(b)
        })
    }
    var l = function(b, g) {
        this.$element = d(b);
        this.options = d.extend({},
        l.DEFAULTS, g);
        this.isLoading = !1
    };
    l.VERSION = "3.3.5";
    l.DEFAULTS = {
        loadingText: "loading..."
    };
    l.prototype.setState = function(b) {
        var g = this.$element,
        a = g.is("input") ? "val": "html",
        c = g.data();
        b += "Text";
        null == c.resetText && g.data("resetText", g[a]());
        setTimeout(d.proxy(function() {
            g[a](null == c[b] ? this.options[b] : c[b]);
            "loadingText" == b ? (this.isLoading = !0, g.addClass("disabled").attr("disabled", "disabled")) : this.isLoading && (this.isLoading = !1, g.removeClass("disabled").removeAttr("disabled"))
        },
        this), 0)
    };
    l.prototype.toggle = function() {
        var b = !0,
        d = this.$element.closest('[data-toggle="buttons"]');
        if (d.length) {
            var a = this.$element.find("input");
            "radio" == a.prop("type") ? (a.prop("checked") && (b = !1), d.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == a.prop("type") && (a.prop("checked") !== this.$element.hasClass("active") && (b = !1), this.$element.toggleClass("active"));
            a.prop("checked", this.$element.hasClass("active"));
            b && a.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")),
        this.$element.toggleClass("active")
    };
    var g = d.fn.button;
    d.fn.button = h;
    d.fn.button.Constructor = l;
    d.fn.button.noConflict = function() {
        return d.fn.button = g,
        this
    };
    d(document).on("click.bs.button.data-api", '[data-toggle^="button"]',
    function(b) {
        var g = d(b.target);
        g.hasClass("btn") || (g = g.closest(".btn"));
        h.call(g, "toggle");
        d(b.target).is('input[type="radio"]') || d(b.target).is('input[type="checkbox"]') || b.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]',
    function(b) {
        d(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
} (jQuery); +
function(d) {
    function h(b) {
        return this.each(function() {
            var a = d(this),
            c = a.data("bs.carousel"),
            e = d.extend({},
            l.DEFAULTS, a.data(), "object" == typeof b && b),
            f = "string" == typeof b ? b: e.slide;
            c || a.data("bs.carousel", c = new l(this, e));
            "number" == typeof b ? c.to(b) : f ? c[f]() : e.interval && c.pause().cycle()
        })
    }
    var l = function(b, a) {
        this.$element = d(b);
        this.$indicators = this.$element.find(".carousel-indicators");
        this.options = a;
        this.$items = this.$active = this.interval = this.sliding = this.paused = null;
        this.options.keyboard && this.$element.on("keydown.bs.carousel", d.proxy(this.keydown, this));
        "hover" != this.options.pause || "ontouchstart" in document.documentElement || this.$element.on("mouseenter.bs.carousel", d.proxy(this.pause, this)).on("mouseleave.bs.carousel", d.proxy(this.cycle, this))
    };
    l.VERSION = "3.3.5";
    l.TRANSITION_DURATION = 600;
    l.DEFAULTS = {
        interval: 5E3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    };
    l.prototype.keydown = function(b) {
        if (!/input|textarea/i.test(b.target.tagName)) {
            switch (b.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
            }
            b.preventDefault()
        }
    };
    l.prototype.cycle = function(b) {
        return b || (this.paused = !1),
        this.interval && clearInterval(this.interval),
        this.options.interval && !this.paused && (this.interval = setInterval(d.proxy(this.next, this), this.options.interval)),
        this
    };
    l.prototype.getItemIndex = function(b) {
        return this.$items = b.parent().children(".item"),
        this.$items.index(b || this.$active)
    };
    l.prototype.getItemForDirection = function(b, a) {
        var c = this.getItemIndex(a);
        return ("prev" == b && 0 === c || "next" == b && c == this.$items.length - 1) && !this.options.wrap ? a: this.$items.eq((c + ("prev" == b ? -1 : 1)) % this.$items.length)
    };
    l.prototype.to = function(b) {
        var a = this,
        c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel",
        function() {
            a.to(b)
        }) : c == b ? this.pause().cycle() : this.slide(b > c ? "next": "prev", this.$items.eq(b))
    };
    l.prototype.pause = function(b) {
        return b || (this.paused = !0),
        this.$element.find(".next, .prev").length && d.support.transition && (this.$element.trigger(d.support.transition.end), this.cycle(!0)),
        this.interval = clearInterval(this.interval),
        this
    };
    l.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    };
    l.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    };
    l.prototype.slide = function(b, a) {
        var c = this.$element.find(".item.active"),
        e = a || this.getItemForDirection(b, c),
        f = this.interval,
        g = "next" == b ? "left": "right",
        m = this;
        if (e.hasClass("active")) return this.sliding = !1;
        var h = e[0],
        n = d.Event("slide.bs.carousel", {
            relatedTarget: h,
            direction: g
        });
        if (this.$element.trigger(n), !n.isDefaultPrevented()) {
            if (this.sliding = !0, f && this.pause(), this.$indicators.length) this.$indicators.find(".active").removeClass("active"),
            (n = d(this.$indicators.children()[this.getItemIndex(e)])) && n.addClass("active");
            var x = d.Event("slid.bs.carousel", {
                relatedTarget: h,
                direction: g
            });
            return d.support.transition && this.$element.hasClass("slide") ? (e.addClass(b), e[0].offsetWidth, c.addClass(g), e.addClass(g), c.one("bsTransitionEnd",
            function() {
                e.removeClass([b, g].join(" ")).addClass("active");
                c.removeClass(["active", g].join(" "));
                m.sliding = !1;
                setTimeout(function() {
                    m.$element.trigger(x)
                },
                0)
            }).emulateTransitionEnd(l.TRANSITION_DURATION)) : (c.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger(x)),
            f && this.cycle(),
            this
        }
    };
    var g = d.fn.carousel;
    d.fn.carousel = h;
    d.fn.carousel.Constructor = l;
    d.fn.carousel.noConflict = function() {
        return d.fn.carousel = g,
        this
    };
    var b = function(b) {
        var a, c = d(this),
        e = d(c.attr("data-target") || (a = c.attr("href")) && a.replace(/.*(?=#[^\s]+$)/, ""));
        e.hasClass("carousel") && (a = d.extend({},
        e.data(), c.data()), (c = c.attr("data-slide-to")) && (a.interval = !1), h.call(e, a), c && e.data("bs.carousel").to(c), b.preventDefault())
    };
    d(document).on("click.bs.carousel.data-api", "[data-slide]", b).on("click.bs.carousel.data-api", "[data-slide-to]", b);
    d(window).on("load",
    function() {
        d('[data-ride="carousel"]').each(function() {
            var b = d(this);
            h.call(b, b.data())
        })
    })
} (jQuery); +
function(d) {
    function h(b) {
        var a;
        b = b.attr("data-target") || (a = b.attr("href")) && a.replace(/.*(?=#[^\s]+$)/, "");
        return d(b)
    }
    function l(b) {
        return this.each(function() {
            var a = d(this),
            c = a.data("bs.collapse"),
            e = d.extend({},
            g.DEFAULTS, a.data(), "object" == typeof b && b); ! c && e.toggle && /show|hide/.test(b) && (e.toggle = !1);
            c || a.data("bs.collapse", c = new g(this, e));
            "string" == typeof b && c[b]()
        })
    }
    var g = function(b, a) {
        this.$element = d(b);
        this.options = d.extend({},
        g.DEFAULTS, a);
        this.$trigger = d('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]');
        this.transitioning = null;
        this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger);
        this.options.toggle && this.toggle()
    };
    g.VERSION = "3.3.5";
    g.TRANSITION_DURATION = 350;
    g.DEFAULTS = {
        toggle: !0
    };
    g.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width": "height"
    };
    g.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, a = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (! (a && a.length && (b = a.data("bs.collapse"), b && b.transitioning))) {
                var c = d.Event("show.bs.collapse");
                if (this.$element.trigger(c), !c.isDefaultPrevented()) {
                    a && a.length && (l.call(a, "hide"), b || a.data("bs.collapse", null));
                    var e = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[e](0).attr("aria-expanded", !0);
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0);
                    this.transitioning = 1;
                    b = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[e]("");
                        this.transitioning = 0;
                        this.$element.trigger("shown.bs.collapse")
                    };
                    if (!d.support.transition) return b.call(this);
                    a = d.camelCase(["scroll", e].join("-"));
                    this.$element.one("bsTransitionEnd", d.proxy(b, this)).emulateTransitionEnd(g.TRANSITION_DURATION)[e](this.$element[0][a])
                }
            }
        }
    };
    g.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = d.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                b = this.dimension();
                this.$element[b](this.$element[b]())[0].offsetHeight;
                this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1);
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1);
                this.transitioning = 1;
                var a = function() {
                    this.transitioning = 0;
                    this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return d.support.transition ? void this.$element[b](0).one("bsTransitionEnd", d.proxy(a, this)).emulateTransitionEnd(g.TRANSITION_DURATION) : a.call(this)
            }
        }
    };
    g.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide": "show"]()
    };
    g.prototype.getParent = function() {
        return d(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(d.proxy(function(b, a) {
            var c = d(a);
            this.addAriaAndCollapsedClass(h(c), c)
        },
        this)).end()
    };
    g.prototype.addAriaAndCollapsedClass = function(b, a) {
        var c = b.hasClass("in");
        b.attr("aria-expanded", c);
        a.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var b = d.fn.collapse;
    d.fn.collapse = l;
    d.fn.collapse.Constructor = g;
    d.fn.collapse.noConflict = function() {
        return d.fn.collapse = b,
        this
    };
    d(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]',
    function(b) {
        var a = d(this);
        a.attr("data-target") || b.preventDefault();
        b = h(a);
        a = b.data("bs.collapse") ? "toggle": a.data();
        l.call(b, a)
    })
} (jQuery); +
function(d) {
    function h(a) {
        var c = a.attr("data-target");
        c || (c = a.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        return (c = c && d(c)) && c.length ? c: a.parent()
    }
    function l(a) {
        a && 3 === a.which || (d(g).remove(), d(b).each(function() {
            var c = d(this),
            b = h(c),
            g = {
                relatedTarget: this
            };
            b.hasClass("open") && (a && "click" == a.type && /input|textarea/i.test(a.target.tagName) && d.contains(b[0], a.target) || (b.trigger(a = d.Event("hide.bs.dropdown", g)), a.isDefaultPrevented() || (c.attr("aria-expanded", "false"), b.removeClass("open").trigger("hidden.bs.dropdown", g))))
        }))
    }
    var g = ".dropdown-backdrop",
    b = '[data-toggle="dropdown"]',
    m = function(a) {
        d(a).on("click.bs.dropdown", this.toggle)
    };
    m.VERSION = "3.3.5";
    m.prototype.toggle = function(a) {
        var b = d(this);
        if (!b.is(".disabled, :disabled")) {
            var c = h(b),
            g = c.hasClass("open");
            if (l(), !g) {
                "ontouchstart" in document.documentElement && !c.closest(".navbar-nav").length && d(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(d(this)).on("click", l);
                g = {
                    relatedTarget: this
                };
                if (c.trigger(a = d.Event("show.bs.dropdown", g)), a.isDefaultPrevented()) return;
                b.trigger("focus").attr("aria-expanded", "true");
                c.toggleClass("open").trigger("shown.bs.dropdown", g)
            }
            return ! 1
        }
    };
    m.prototype.keydown = function(a) {
        if (/(38|40|27|32)/.test(a.which) && !/input|textarea/i.test(a.target.tagName)) {
            var c = d(this);
            if (a.preventDefault(), a.stopPropagation(), !c.is(".disabled, :disabled")) {
                var f = h(c),
                g = f.hasClass("open");
                if (!g && 27 != a.which || g && 27 == a.which) return 27 == a.which && f.find(b).trigger("focus"),
                c.trigger("click");
                c = f.find(".dropdown-menu li:not(.disabled):visible a");
                c.length && (f = c.index(a.target), 38 == a.which && 0 < f && f--, 40 == a.which && f < c.length - 1 && f++, ~f || (f = 0), c.eq(f).trigger("focus"))
            }
        }
    };
    var a = d.fn.dropdown;
    d.fn.dropdown = function(a) {
        return this.each(function() {
            var b = d(this),
            c = b.data("bs.dropdown");
            c || b.data("bs.dropdown", c = new m(this));
            "string" == typeof a && c[a].call(b)
        })
    };
    d.fn.dropdown.Constructor = m;
    d.fn.dropdown.noConflict = function() {
        return d.fn.dropdown = a,
        this
    };
    d(document).on("click.bs.dropdown.data-api", l).on("click.bs.dropdown.data-api", ".dropdown form",
    function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", b, m.prototype.toggle).on("keydown.bs.dropdown.data-api", b, m.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", m.prototype.keydown)
} (jQuery); +
function(d) {
    function h(b, g) {
        return this.each(function() {
            var a = d(this),
            c = a.data("bs.modal"),
            e = d.extend({},
            l.DEFAULTS, a.data(), "object" == typeof b && b);
            c || a.data("bs.modal", c = new l(this, e));
            "string" == typeof b ? c[b](g) : e.show && c.show(g)
        })
    }
    var l = function(b, g) {
        this.options = g;
        this.$body = d(document.body);
        this.$element = d(b);
        this.$dialog = this.$element.find(".modal-dialog");
        this.originalBodyPad = this.isShown = this.$backdrop = null;
        this.scrollbarWidth = 0;
        this.ignoreBackdropClick = !1;
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, d.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        },
        this))
    };
    l.VERSION = "3.3.5";
    l.TRANSITION_DURATION = 300;
    l.BACKDROP_TRANSITION_DURATION = 150;
    l.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    };
    l.prototype.toggle = function(b) {
        return this.isShown ? this.hide() : this.show(b)
    };
    l.prototype.show = function(b) {
        var g = this,
        a = d.Event("show.bs.modal", {
            relatedTarget: b
        });
        this.$element.trigger(a);
        this.isShown || a.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', d.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal",
        function() {
            g.$element.one("mouseup.dismiss.bs.modal",
            function(a) {
                d(a.target).is(g.$element) && (g.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var a = d.support.transition && g.$element.hasClass("fade");
            g.$element.parent().length || g.$element.appendTo(g.$body);
            g.$element.show().scrollTop(0);
            g.adjustDialog();
            a && g.$element[0].offsetWidth;
            g.$element.addClass("in");
            g.enforceFocus();
            var e = d.Event("shown.bs.modal", {
                relatedTarget: b
            });
            a ? g.$dialog.one("bsTransitionEnd",
            function() {
                g.$element.trigger("focus").trigger(e)
            }).emulateTransitionEnd(l.TRANSITION_DURATION) : g.$element.trigger("focus").trigger(e)
        }))
    };
    l.prototype.hide = function(b) {
        b && b.preventDefault();
        b = d.Event("hide.bs.modal");
        this.$element.trigger(b);
        this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), d(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), d.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", d.proxy(this.hideModal, this)).emulateTransitionEnd(l.TRANSITION_DURATION) : this.hideModal())
    };
    l.prototype.enforceFocus = function() {
        d(document).off("focusin.bs.modal").on("focusin.bs.modal", d.proxy(function(b) {
            this.$element[0] === b.target || this.$element.has(b.target).length || this.$element.trigger("focus")
        },
        this))
    };
    l.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", d.proxy(function(b) {
            27 == b.which && this.hide()
        },
        this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    };
    l.prototype.resize = function() {
        this.isShown ? d(window).on("resize.bs.modal", d.proxy(this.handleUpdate, this)) : d(window).off("resize.bs.modal")
    };
    l.prototype.hideModal = function() {
        var b = this;
        this.$element.hide();
        this.backdrop(function() {
            b.$body.removeClass("modal-open");
            b.resetAdjustments();
            b.resetScrollbar();
            b.$element.trigger("hidden.bs.modal")
        })
    };
    l.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null
    };
    l.prototype.backdrop = function(b) {
        var g = this,
        a = this.$element.hasClass("fade") ? "fade": "";
        if (this.isShown && this.options.backdrop) {
            var c = d.support.transition && a;
            if (this.$backdrop = d(document.createElement("div")).addClass("modal-backdrop " + a).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", d.proxy(function(a) {
                return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
            },
            this)), c && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), b) c ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(l.BACKDROP_TRANSITION_DURATION) : b()
        } else ! this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a = function() {
            g.removeBackdrop();
            b && b()
        },
        d.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(l.BACKDROP_TRANSITION_DURATION) : a()) : b && b()
    };
    l.prototype.handleUpdate = function() {
        this.adjustDialog()
    };
    l.prototype.adjustDialog = function() {
        var b = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && b ? this.scrollbarWidth: "",
            paddingRight: this.bodyIsOverflowing && !b ? this.scrollbarWidth: ""
        })
    };
    l.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    };
    l.prototype.checkScrollbar = function() {
        var b = window.innerWidth;
        b || (b = document.documentElement.getBoundingClientRect(), b = b.right - Math.abs(b.left));
        this.bodyIsOverflowing = document.body.clientWidth < b;
        this.scrollbarWidth = this.measureScrollbar()
    };
    l.prototype.setScrollbar = function() {
        var b = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "";
        this.bodyIsOverflowing && this.$body.css("padding-right", b + this.scrollbarWidth)
    };
    l.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    };
    l.prototype.measureScrollbar = function() {
        var b = document.createElement("div");
        b.className = "modal-scrollbar-measure";
        this.$body.append(b);
        var d = b.offsetWidth - b.clientWidth;
        return this.$body[0].removeChild(b),
        d
    };
    var g = d.fn.modal;
    d.fn.modal = h;
    d.fn.modal.Constructor = l;
    d.fn.modal.noConflict = function() {
        return d.fn.modal = g,
        this
    };
    d(document).on("click.bs.modal.data-api", '[data-toggle="modal"]',
    function(b) {
        var g = d(this),
        a = g.attr("href"),
        c = d(g.attr("data-target") || a && a.replace(/.*(?=#[^\s]+$)/, "")),
        a = c.data("bs.modal") ? "toggle": d.extend({
            remote: !/#/.test(a) && a
        },
        c.data(), g.data());
        g.is("a") && b.preventDefault();
        c.one("show.bs.modal",
        function(a) {
            a.isDefaultPrevented() || c.one("hidden.bs.modal",
            function() {
                g.is(":visible") && g.trigger("focus")
            })
        });
        h.call(c, a, this)
    })
} (jQuery); +
function(d) {
    var h = function(d, b) {
        this.inState = this.$element = this.hoverState = this.timeout = this.enabled = this.options = this.type = null;
        this.init("tooltip", d, b)
    };
    h.VERSION = "3.3.5";
    h.TRANSITION_DURATION = 150;
    h.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    };
    h.prototype.init = function(g, b, m) {
        if (this.enabled = !0, this.type = g, this.$element = d(b), this.options = this.getOptions(m), this.$viewport = this.options.viewport && d(d.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        },
        this.$element[0] instanceof document.constructor && !this.options.selector) throw Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        g = this.options.trigger.split(" ");
        for (b = g.length; b--;) if (m = g[b], "click" == m) this.$element.on("click." + this.type, this.options.selector, d.proxy(this.toggle, this));
        else if ("manual" != m) {
            var a = "hover" == m ? "mouseleave": "focusout";
            this.$element.on(("hover" == m ? "mouseenter": "focusin") + "." + this.type, this.options.selector, d.proxy(this.enter, this));
            this.$element.on(a + "." + this.type, this.options.selector, d.proxy(this.leave, this))
        }
        this.options.selector ? this._options = d.extend({},
        this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    };
    h.prototype.getDefaults = function() {
        return h.DEFAULTS
    };
    h.prototype.getOptions = function(g) {
        return g = d.extend({},
        this.getDefaults(), this.$element.data(), g),
        g.delay && "number" == typeof g.delay && (g.delay = {
            show: g.delay,
            hide: g.delay
        }),
        g
    };
    h.prototype.getDelegateOptions = function() {
        var g = {},
        b = this.getDefaults();
        return this._options && d.each(this._options,
        function(d, a) {
            b[d] != a && (g[d] = a)
        }),
        g
    };
    h.prototype.enter = function(g) {
        var b = g instanceof this.constructor ? g: d(g.currentTarget).data("bs." + this.type);
        return b || (b = new this.constructor(g.currentTarget, this.getDelegateOptions()), d(g.currentTarget).data("bs." + this.type, b)),
        g instanceof d.Event && (b.inState["focusin" == g.type ? "focus": "hover"] = !0),
        b.tip().hasClass("in") || "in" == b.hoverState ? void(b.hoverState = "in") : (clearTimeout(b.timeout), b.hoverState = "in", b.options.delay && b.options.delay.show ? void(b.timeout = setTimeout(function() {
            "in" == b.hoverState && b.show()
        },
        b.options.delay.show)) : b.show())
    };
    h.prototype.isInStateTrue = function() {
        for (var d in this.inState) if (this.inState[d]) return ! 0;
        return ! 1
    };
    h.prototype.leave = function(g) {
        var b = g instanceof this.constructor ? g: d(g.currentTarget).data("bs." + this.type);
        return b || (b = new this.constructor(g.currentTarget, this.getDelegateOptions()), d(g.currentTarget).data("bs." + this.type, b)),
        g instanceof d.Event && (b.inState["focusout" == g.type ? "focus": "hover"] = !1),
        b.isInStateTrue() ? void 0 : (clearTimeout(b.timeout), b.hoverState = "out", b.options.delay && b.options.delay.hide ? void(b.timeout = setTimeout(function() {
            "out" == b.hoverState && b.hide()
        },
        b.options.delay.hide)) : b.hide())
    };
    h.prototype.show = function() {
        var g = d.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(g);
            var b = d.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (!g.isDefaultPrevented() && b) {
                var m = this,
                g = this.tip(),
                b = this.getUID(this.type);
                this.setContent();
                g.attr("id", b);
                this.$element.attr("aria-describedby", b);
                this.options.animation && g.addClass("fade");
                var b = "function" == typeof this.options.placement ? this.options.placement.call(this, g[0], this.$element[0]) : this.options.placement,
                a = /\s?auto?\s?/i,
                c = a.test(b);
                c && (b = b.replace(a, "") || "top");
                g.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(b).data("bs." + this.type, this);
                this.options.container ? g.appendTo(this.options.container) : g.insertAfter(this.$element);
                this.$element.trigger("inserted.bs." + this.type);
                var a = this.getPosition(),
                e = g[0].offsetWidth,
                f = g[0].offsetHeight;
                if (c) {
                    var c = b,
                    k = this.getPosition(this.$viewport),
                    b = "bottom" == b && a.bottom + f > k.bottom ? "top": "top" == b && a.top - f < k.top ? "bottom": "right" == b && a.right + e > k.width ? "left": "left" == b && a.left - e < k.left ? "right": b;
                    g.removeClass(c).addClass(b)
                }
                a = this.getCalculatedOffset(b, a, e, f);
                this.applyPlacement(a, b);
                b = function() {
                    var a = m.hoverState;
                    m.$element.trigger("shown.bs." + m.type);
                    m.hoverState = null;
                    "out" == a && m.leave(m)
                };
                d.support.transition && this.$tip.hasClass("fade") ? g.one("bsTransitionEnd", b).emulateTransitionEnd(h.TRANSITION_DURATION) : b()
            }
        }
    };
    h.prototype.applyPlacement = function(g, b) {
        var m = this.tip(),
        a = m[0].offsetWidth,
        c = m[0].offsetHeight,
        e = parseInt(m.css("margin-top"), 10),
        f = parseInt(m.css("margin-left"), 10);
        isNaN(e) && (e = 0);
        isNaN(f) && (f = 0);
        g.top += e;
        g.left += f;
        d.offset.setOffset(m[0], d.extend({
            using: function(a) {
                m.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        },
        g), 0);
        m.addClass("in");
        var f = m[0].offsetWidth,
        k = m[0].offsetHeight;
        "top" == b && k != c && (g.top = g.top + c - k);
        var h = this.getViewportAdjustedDelta(b, g, f, k);
        h.left ? g.left += h.left: g.top += h.top;
        a = (e = /top|bottom/.test(b)) ? 2 * h.left - a + f: 2 * h.top - c + k;
        c = e ? "offsetWidth": "offsetHeight";
        m.offset(g);
        this.replaceArrow(a, m[0][c], e)
    };
    h.prototype.replaceArrow = function(d, b, m) {
        this.arrow().css(m ? "left": "top", 50 * (1 - d / b) + "%").css(m ? "top": "left", "")
    };
    h.prototype.setContent = function() {
        var d = this.tip(),
        b = this.getTitle();
        d.find(".tooltip-inner")[this.options.html ? "html": "text"](b);
        d.removeClass("fade in top bottom left right")
    };
    h.prototype.hide = function(g) {
        function b() {
            "in" != m.hoverState && a.detach();
            m.$element.removeAttr("aria-describedby").trigger("hidden.bs." + m.type);
            g && g()
        }
        var m = this,
        a = d(this.$tip),
        c = d.Event("hide.bs." + this.type);
        return this.$element.trigger(c),
        c.isDefaultPrevented() ? void 0 : (a.removeClass("in"), d.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", b).emulateTransitionEnd(h.TRANSITION_DURATION) : b(), this.hoverState = null, this)
    };
    h.prototype.fixTitle = function() {
        var d = this.$element; (d.attr("title") || "string" != typeof d.attr("data-original-title")) && d.attr("data-original-title", d.attr("title") || "").attr("title", "")
    };
    h.prototype.hasContent = function() {
        return this.getTitle()
    };
    h.prototype.getPosition = function(g) {
        g = g || this.$element;
        var b = g[0],
        m = "BODY" == b.tagName,
        b = b.getBoundingClientRect();
        null == b.width && (b = d.extend({},
        b, {
            width: b.right - b.left,
            height: b.bottom - b.top
        }));
        var a = m ? {
            top: 0,
            left: 0
        }: g.offset();
        g = {
            scroll: m ? document.documentElement.scrollTop || document.body.scrollTop: g.scrollTop()
        };
        m = m ? {
            width: d(window).width(),
            height: d(window).height()
        }: null;
        return d.extend({},
        b, g, m, a)
    };
    h.prototype.getCalculatedOffset = function(d, b, m, a) {
        return "bottom" == d ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - m / 2
        }: "top" == d ? {
            top: b.top - a,
            left: b.left + b.width / 2 - m / 2
        }: "left" == d ? {
            top: b.top + b.height / 2 - a / 2,
            left: b.left - m
        }: {
            top: b.top + b.height / 2 - a / 2,
            left: b.left + b.width
        }
    };
    h.prototype.getViewportAdjustedDelta = function(d, b, m, a) {
        var c = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return c;
        var e = this.options.viewport && this.options.viewport.padding || 0,
        f = this.getPosition(this.$viewport);
        /right|left/.test(d) ? (m = b.top - e - f.scroll, b = b.top + e - f.scroll + a, m < f.top ? c.top = f.top - m: b > f.top + f.height && (c.top = f.top + f.height - b)) : (a = b.left - e, b = b.left + e + m, a < f.left ? c.left = f.left - a: b > f.right && (c.left = f.left + f.width - b));
        return c
    };
    h.prototype.getTitle = function() {
        var d = this.$element,
        b = this.options;
        return d.attr("data-original-title") || ("function" == typeof b.title ? b.title.call(d[0]) : b.title)
    };
    h.prototype.getUID = function(d) {
        do d += ~~ (1E6 * Math.random());
        while (document.getElementById(d));
        return d
    };
    h.prototype.tip = function() {
        if (!this.$tip && (this.$tip = d(this.options.template), 1 != this.$tip.length)) throw Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    };
    h.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    };
    h.prototype.enable = function() {
        this.enabled = !0
    };
    h.prototype.disable = function() {
        this.enabled = !1
    };
    h.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    };
    h.prototype.toggle = function(g) {
        var b = this;
        g && (b = d(g.currentTarget).data("bs." + this.type), b || (b = new this.constructor(g.currentTarget, this.getDelegateOptions()), d(g.currentTarget).data("bs." + this.type, b)));
        g ? (b.inState.click = !b.inState.click, b.isInStateTrue() ? b.enter(b) : b.leave(b)) : b.tip().hasClass("in") ? b.leave(b) : b.enter(b)
    };
    h.prototype.destroy = function() {
        var d = this;
        clearTimeout(this.timeout);
        this.hide(function() {
            d.$element.off("." + d.type).removeData("bs." + d.type);
            d.$tip && d.$tip.detach();
            d.$tip = null;
            d.$arrow = null;
            d.$viewport = null
        })
    };
    var l = d.fn.tooltip;
    d.fn.tooltip = function(g) {
        return this.each(function() {
            var b = d(this),
            m = b.data("bs.tooltip"),
            a = "object" == typeof g && g; ! m && /destroy|hide/.test(g) || (m || b.data("bs.tooltip", m = new h(this, a)), "string" != typeof g || m[g]())
        })
    };
    d.fn.tooltip.Constructor = h;
    d.fn.tooltip.noConflict = function() {
        return d.fn.tooltip = l,
        this
    }
} (jQuery); +
function(d) {
    var h = function(d, b) {
        this.init("popover", d, b)
    };
    if (!d.fn.tooltip) throw Error("Popover requires tooltip.js");
    h.VERSION = "3.3.5";
    h.DEFAULTS = d.extend({},
    d.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    h.prototype = d.extend({},
    d.fn.tooltip.Constructor.prototype);
    h.prototype.constructor = h;
    h.prototype.getDefaults = function() {
        return h.DEFAULTS
    };
    h.prototype.setContent = function() {
        var d = this.tip(),
        b = this.getTitle(),
        m = this.getContent();
        d.find(".popover-title")[this.options.html ? "html": "text"](b);
        d.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof m ? "html": "append": "text"](m);
        d.removeClass("fade top bottom left right in");
        d.find(".popover-title").html() || d.find(".popover-title").hide()
    };
    h.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    };
    h.prototype.getContent = function() {
        var d = this.$element,
        b = this.options;
        return d.attr("data-content") || ("function" == typeof b.content ? b.content.call(d[0]) : b.content)
    };
    h.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var l = d.fn.popover;
    d.fn.popover = function(g) {
        return this.each(function() {
            var b = d(this),
            m = b.data("bs.popover"),
            a = "object" == typeof g && g; ! m && /destroy|hide/.test(g) || (m || b.data("bs.popover", m = new h(this, a)), "string" != typeof g || m[g]())
        })
    };
    d.fn.popover.Constructor = h;
    d.fn.popover.noConflict = function() {
        return d.fn.popover = l,
        this
    }
} (jQuery); +
function(d) {
    function h(b, g) {
        this.$body = d(document.body);
        this.$scrollElement = d(d(b).is(document.body) ? window: b);
        this.options = d.extend({},
        h.DEFAULTS, g);
        this.selector = (this.options.target || "") + " .nav li > a";
        this.offsets = [];
        this.targets = [];
        this.activeTarget = null;
        this.scrollHeight = 0;
        this.$scrollElement.on("scroll.bs.scrollspy", d.proxy(this.process, this));
        this.refresh();
        this.process()
    }
    function l(b) {
        return this.each(function() {
            var g = d(this),
            a = g.data("bs.scrollspy"),
            c = "object" == typeof b && b;
            a || g.data("bs.scrollspy", a = new h(this, c));
            "string" == typeof b && a[b]()
        })
    }
    h.VERSION = "3.3.5";
    h.DEFAULTS = {
        offset: 10
    };
    h.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    };
    h.prototype.refresh = function() {
        var b = this,
        g = "offset",
        a = 0;
        this.offsets = [];
        this.targets = [];
        this.scrollHeight = this.getScrollHeight();
        d.isWindow(this.$scrollElement[0]) || (g = "position", a = this.$scrollElement.scrollTop());
        this.$body.find(this.selector).map(function() {
            var b = d(this),
            b = b.data("target") || b.attr("href"),
            e = /^#./.test(b) && d(b);
            return e && e.length && e.is(":visible") && [[e[g]().top + a, b]] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            b.offsets.push(this[0]);
            b.targets.push(this[1])
        })
    };
    h.prototype.process = function() {
        var b, d = this.$scrollElement.scrollTop() + this.options.offset,
        a = this.getScrollHeight(),
        c = this.options.offset + a - this.$scrollElement.height(),
        e = this.offsets,
        f = this.targets,
        g = this.activeTarget;
        if (this.scrollHeight != a && this.refresh(), d >= c) return g != (b = f[f.length - 1]) && this.activate(b);
        if (g && d < e[0]) return this.activeTarget = null,
        this.clear();
        for (b = e.length; b--;) g != f[b] && d >= e[b] && (void 0 === e[b + 1] || d < e[b + 1]) && this.activate(f[b])
    };
    h.prototype.activate = function(b) {
        this.activeTarget = b;
        this.clear();
        b = d(this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]').parents("li").addClass("active");
        b.parent(".dropdown-menu").length && (b = b.closest("li.dropdown").addClass("active"));
        b.trigger("activate.bs.scrollspy")
    };
    h.prototype.clear = function() {
        d(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var g = d.fn.scrollspy;
    d.fn.scrollspy = l;
    d.fn.scrollspy.Constructor = h;
    d.fn.scrollspy.noConflict = function() {
        return d.fn.scrollspy = g,
        this
    };
    d(window).on("load.bs.scrollspy.data-api",
    function() {
        d('[data-spy="scroll"]').each(function() {
            var b = d(this);
            l.call(b, b.data())
        })
    })
} (jQuery); +
function(d) {
    function h(b) {
        return this.each(function() {
            var a = d(this),
            c = a.data("bs.tab");
            c || a.data("bs.tab", c = new l(this));
            "string" == typeof b && c[b]()
        })
    }
    var l = function(b) {
        this.element = d(b)
    };
    l.VERSION = "3.3.5";
    l.TRANSITION_DURATION = 150;
    l.prototype.show = function() {
        var b = this.element,
        a = b.closest("ul:not(.dropdown-menu)"),
        c = b.data("target");
        if (c || (c = b.attr("href"), c = c && c.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = a.find(".active:last a"),
            f = d.Event("hide.bs.tab", {
                relatedTarget: b[0]
            }),
            g = d.Event("show.bs.tab", {
                relatedTarget: e[0]
            }); (e.trigger(f), b.trigger(g), g.isDefaultPrevented() || f.isDefaultPrevented()) || (c = d(c), this.activate(b.closest("li"), a), this.activate(c, c.parent(),
            function() {
                e.trigger({
                    type: "hidden.bs.tab",
                    relatedTarget: b[0]
                });
                b.trigger({
                    type: "shown.bs.tab",
                    relatedTarget: e[0]
                })
            }))
        }
    };
    l.prototype.activate = function(b, a, c) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1);
            b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0);
            g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade");
            b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0);
            c && c()
        }
        var f = a.find("> .active"),
        g = c && d.support.transition && (f.length && f.hasClass("fade") || !!a.find("> .fade").length);
        f.length && g ? f.one("bsTransitionEnd", e).emulateTransitionEnd(l.TRANSITION_DURATION) : e();
        f.removeClass("in")
    };
    var g = d.fn.tab;
    d.fn.tab = h;
    d.fn.tab.Constructor = l;
    d.fn.tab.noConflict = function() {
        return d.fn.tab = g,
        this
    };
    var b = function(b) {
        b.preventDefault();
        h.call(d(this), "show")
    };
    d(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', b).on("click.bs.tab.data-api", '[data-toggle="pill"]', b)
} (jQuery); +
function(d) {
    function h(b) {
        return this.each(function() {
            var g = d(this),
            a = g.data("bs.affix"),
            c = "object" == typeof b && b;
            a || g.data("bs.affix", a = new l(this, c));
            "string" == typeof b && a[b]()
        })
    }
    var l = function(b, g) {
        this.options = d.extend({},
        l.DEFAULTS, g);
        this.$target = d(this.options.target).on("scroll.bs.affix.data-api", d.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", d.proxy(this.checkPositionWithEventLoop, this));
        this.$element = d(b);
        this.pinnedOffset = this.unpin = this.affixed = null;
        this.checkPosition()
    };
    l.VERSION = "3.3.5";
    l.RESET = "affix affix-top affix-bottom";
    l.DEFAULTS = {
        offset: 0,
        target: window
    };
    l.prototype.getState = function(b, d, a, c) {
        var e = this.$target.scrollTop(),
        f = this.$element.offset(),
        g = this.$target.height();
        if (null != a && "top" == this.affixed) return a > e ? "top": !1;
        if ("bottom" == this.affixed) return null != a ? e + this.unpin <= f.top ? !1 : "bottom": b - c >= e + g ? !1 : "bottom";
        var m = null == this.affixed,
        f = m ? e: f.top;
        return null != a && a >= e ? "top": null != c && f + (m ? g: d) >= b - c ? "bottom": !1
    };
    l.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(l.RESET).addClass("affix");
        var b = this.$target.scrollTop();
        return this.pinnedOffset = this.$element.offset().top - b
    };
    l.prototype.checkPositionWithEventLoop = function() {
        setTimeout(d.proxy(this.checkPosition, this), 1)
    };
    l.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
            g = this.options.offset,
            a = g.top,
            c = g.bottom,
            e = Math.max(d(document).height(), d(document.body).height());
            "object" != typeof g && (c = a = g);
            "function" == typeof a && (a = g.top(this.$element));
            "function" == typeof c && (c = g.bottom(this.$element));
            g = this.getState(e, b, a, c);
            if (this.affixed != g) {
                null != this.unpin && this.$element.css("top", "");
                var a = "affix" + (g ? "-" + g: ""),
                f = d.Event(a + ".bs.affix");
                if (this.$element.trigger(f), f.isDefaultPrevented()) return;
                this.affixed = g;
                this.unpin = "bottom" == g ? this.getPinnedOffset() : null;
                this.$element.removeClass(l.RESET).addClass(a).trigger(a.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == g && this.$element.offset({
                top: e - b - c
            })
        }
    };
    var g = d.fn.affix;
    d.fn.affix = h;
    d.fn.affix.Constructor = l;
    d.fn.affix.noConflict = function() {
        return d.fn.affix = g,
        this
    };
    d(window).on("load",
    function() {
        d('[data-spy="affix"]').each(function() {
            var b = d(this),
            g = b.data();
            g.offset = g.offset || {};
            null != g.offsetBottom && (g.offset.bottom = g.offsetBottom);
            null != g.offsetTop && (g.offset.top = g.offsetTop);
            h.call(b, g)
        })
    })
} (jQuery);
define("bootstrap",
function() {});
define("app/default/main", ["require", "exports", "app/default/control", "bootstrap"],
function(d, h, l) {
    h.__esModule = !0; (function(g) {
        function b(a) {
            var b = "";
            if (0 < a.length) {
                for (var c = 0; c < a.length; c++) {
                    var d = a[c],
                    e = d.StartTime.toDate();
                    d.EndTime.toDate();
                    d.TCNO = 0 === d.TCNO.indexOf("TD") ? "TD": d.TCNO;
                    b += '<tr class="typhoonYearList" onclick="defaultPage.typhoonListClick(' + d.TCIDX + ",'" + d.TCNO + "','" + d.CName + "','" + d.EName + '\')"><td style="width:10%;"><input value="' + d.TCIDX + "_" + d.TCNO + '" type="checkbox" onchange="return false;"></td><td style="width:15%;">' + (0 === d.TCNO.indexOf("TD") ? "TD": d.TCNO) + '</td><td style="width:30%;">' + d.CName + '</td><td style="width:30%;">' + d.EName + '</td><td style="width:15%;">' + e.format("MM") + "</td></tr>"
                }
                $("#listBody").html(b)
            } else $("#listBody").html("<tr><td style='font-size:18px;vertical-align:central;text-align:center;color:gray'>\u6240\u9009\u5e74\u4efd\u65e0\u53f0\u98ce</td></tr>")
        }
        function h() {
            var b = $("#routeListContainer"),
            d = $("#routePressureContainer"),
            f = $("#routeWindSpeedContainer"),
            g = $("#routeMoveSpeedContainer"),
            k = $("#loadingContainer"),
            h;
            $("#routeList div").each(function(a, c) {
                c.style.border = "1px solid #6CA5E8";
                c.style.color = "#6CA5E8";
                b.hide();
                d.hide();
                f.hide();
                g.hide()
            }); - 1 != B.indexOf("routeList") ? (k.hide(), b.show(), h = document.getElementById("routeListButton")) : -1 != B.indexOf("routePressure") ? (e(), k.hide(), d.show(), h = document.getElementById("routePressureButton")) : -1 != B.indexOf("routeWindSpeed") && (c(), k.hide(), f.show(), h = document.getElementById("routeWindSpeedButton")); - 1 != B.indexOf("routeMoveSpeed") && (a(), k.hide(), g.show(), h = document.getElementById("routeMoveSpeedButton"));
            h.style.border = "1px solid #F6A623";
            h.style.color = "#F6A623"
        }
        function a() {
            d(["library/Highcharts-4.2.5/js/highcharts"],
            function() {
                $("#routeMoveSpeedContainer").show().highcharts({
                    chart: {
                        type: "line"
                    },
                    title: {
                        text: null
                    },
                    credits: {
                        enabled: !1
                    },
                    tooltip: {
                        valueSuffix: "km/h"
                    },
                    legend: {
                        enabled: !1
                    },
                    xAxis: {
                        categories: t,
                        labels: {
                            formatter: function() {
                                return Highcharts.dateFormat("%d.%H", (new Date(this.value)).getTime() + 288E5)
                            }
                        },
                        tickInterval: 150 < t.length ? 30 : 100 < t.length ? 25 : 50 < t.length ? 20 : 40 < p.length ? 10 : 30 < p.length ? 8 : 20 < p.length ? 5 : 10 < p.length ? 4 : 6 < p.length ? 2 : 1,
                        tickmarkPlacement: "on"
                    },
                    plotOptions: {
                        series: {
                            color: "#6CA5E8"
                        }
                    },
                    yAxis: {
                        title: {
                            text: ""
                        },
                        labels: {
                            enabled: !0
                        }
                    },
                    series: [{
                        name: "\u79fb\u901f",
                        data: q
                    }]
                })
            })
        }
        function c() {
            d(["library/Highcharts-4.2.5/js/highcharts"],
            function() {
                $("#routeWindSpeedContainer").show().highcharts({
                    chart: {
                        type: "line"
                    },
                    title: {
                        text: null
                    },
                    credits: {
                        enabled: !1
                    },
                    tooltip: {
                        valueSuffix: "\u7c73/\u79d2"
                    },
                    legend: {
                        enabled: !1
                    },
                    xAxis: {
                        categories: p,
                        labels: {
                            formatter: function() {
                                return Highcharts.dateFormat("%d.%H", (new Date(this.value)).getTime() + 288E5)
                            }
                        },
                        tickInterval: 150 < p.length ? 30 : 100 < p.length ? 25 : 50 < p.length ? 20 : 40 < p.length ? 10 : 30 < p.length ? 8 : 20 < p.length ? 5 : 10 < p.length ? 4 : 6 < p.length ? 2 : 1,
                        tickmarkPlacement: "on"
                    },
                    plotOptions: {
                        series: {
                            color: "#6CA5E8"
                        }
                    },
                    yAxis: {
                        title: {
                            text: ""
                        },
                        labels: {
                            enabled: !0
                        },
                        max: null,
                        min: null
                    },
                    series: [{
                        name: "\u98ce\u901f",
                        data: r
                    }]
                })
            })
        }
        function e() {
            d(["library/Highcharts-4.2.5/js/highcharts"],
            function() {
                $("#routePressureContainer").show().highcharts({
                    chart: {
                        type: "line"
                    },
                    title: {
                        text: null
                    },
                    credits: {
                        enabled: !1
                    },
                    tooltip: {
                        valueSuffix: "hpa"
                    },
                    legend: {
                        enabled: !1
                    },
                    xAxis: {
                        categories: p,
                        labels: {
                            formatter: function() {
                                return Highcharts.dateFormat("%d.%H", (new Date(this.value)).getTime() + 288E5)
                            }
                        },
                        tickInterval: 150 < p.length ? 30 : 100 < p.length ? 25 : 50 < p.length ? 20 : 40 < p.length ? 10 : 30 < p.length ? 8 : 20 < p.length ? 5 : 10 < p.length ? 4 : 6 < p.length ? 2 : 1,
                        tickmarkPlacement: "on"
                    },
                    plotOptions: {
                        series: {
                            color: "#6CA5E8"
                        }
                    },
                    yAxis: {
                        labels: {
                            enabled: !0
                        },
                        title: {
                            text: ""
                        },
                        max: null,
                        min: null
                    },
                    series: [{
                        name: "\u4e2d\u5fc3\u6c14\u538b",
                        data: x
                    }]
                })
            })
        }
        function f(a, b) {
            if (3 != a && 4 != a) d(["view/playerUI"],
            function(c) {
                if (b) {
                    A++;
                    var d = n.selectPointByHand ? n.selectPointByHand.ISSUEDATE: null;
                    0 === a ? (y = new c["default"](0, d, n.onSatellite, n.offSatellite, n), $("#playerContainer").show().append(y.htmlContainer), u(1)) : 1 === a ? (z = new c["default"](1, d, n.onRadar, n.offRadar, n), $("#playerContainer").show().append(z.htmlContainer)) : 2 === a && (w = new c["default"](2, d, n.onRain, n.offRain, n), $("#playerContainer").show().append(w.htmlContainer));
                    n.onTyphoonPointChange = function(a) {
                        y && y.setLastTime(a.ISSUEDATE);
                        z && z.setLastTime(a.ISSUEDATE);
                        w && w.setLastTime(a.ISSUEDATE)
                    }
                } else 0 === a && (n.offSatellite(), y.destroy(), y = null, null == n.satelliteImgLayer && null == n.windImgLayer && u(0)),
                1 === a && (n.offRadar(), z.destroy(), z = null),
                2 === a && (n.offRain(), w.destroy(), w = null),
                A--,
                0 === A && $("#playerContainer").hide()
            });
            else if (3 == a) if (b) {
                var c = new Date;
                c.setMinutes(c.getMinutes() - 20 - c.getMinutes() % 6);
                n.onObt(c)
            } else n.offObt();
            else if (4 == a) if (b) {
                u(1);
                A++;
                c = document.createElement("div");
                c.id = "windForeTime";
                var e = document.createElement("span");
                c.appendChild(e);
                $("#playerContainer").append(c);
                n.onWind(n,
                function(a) {
                    e.innerHTML = "\u98ce\u573a" + a.format("yyyy-MM-dd HH:mm");
                    $("#playerContainer").show()
                })
            } else A--,
            c = document.getElementById("windForeTime"),
            document.getElementById("playerContainer").removeChild(c),
            n.offWind(),
            null == n.satelliteImgLayer && null == n.windImgLayer && u(0),
            0 === A && $("#playerContainer").hide()
        }
        function k(a, b, c, d, e, f) {
            e ? ($("#routeListContainer").hide(), $("#routePressureContainer").hide(), $("#routeWindSpeedContainer").hide(), $("#routeMoveSpeedContainer").hide(), $("#loadingContainer").show(), n.getTyphoonOne(a, b, c, d,
            function(a) {
                var e = -1 == b.indexOf("TD") ? b + " " + c + " " + d: c + " " + d;
                $("#currentTyphoonTCNO").html(e);
                $("#checkTyphoonTCNO").html(e);
                v(a.routes);
                h();
                f || (n.onTyphoon(a), a = a.routes[a.routes.length - 1], app.data.map.setView([a.LATITUDE, a.LONGITUDE], 6))
            }), $("#typhoonRangeclose").hide(), $("#typhoonRangeopen").show(), $("#forecastUnitclose").hide(), $("#forecastUnitopen").show()) : n.offTyphoon(a, b)
        }
        function v(a) {
            for (var b = [], c = [], d = 0; d < a.length; d++) {
                var e = a[d],
                f = e.ISSUEDATE.format("yyyyMMddHH"); - 1 == $.inArray(f, c) && (b.push(e), c.push(f))
            }
            d = n.getCityDistance([a[a.length - 1].LATITUDE, a[a.length - 1].LONGITUDE]);
            a = $("#cityList");
            a.html();
            c = "";
            for (e = 0; e < d.length; e++) c += "<div style='cursor:pointer' onclick='defaultPage.cityPosition(this)'>" + d[e].city + "</div><div>" + d[e].distance + "km</div>";
            a.html(c);
            $("#routeListContainer").css({
                "padding-top": "0px"
            });
            a = "<table class='routeListTable'><tr><td>\u65f6\u95f4</td><td>\u7ecf\u5ea6</td><td>\u7eac\u5ea6</td><td>\u98ce\u901f</td><td>\u6c14\u538b</td></tr>";
            p = [];
            t = [];
            x = [];
            r = [];
            q = [];
            for (d = b.length - 1; 0 < d; d--) c = b[d],
            p.push(c.ISSUEDATE.format("yyyy/MM/dd HH:mm")),
            x.push(c.AIRPRESSURE),
            r.push(c.WIND),
            0 != c.MOVESPEED && (q.push(c.MOVESPEED), t.push(c.ISSUEDATE.format("yyyy/MM/dd HH:mm"))),
            e = "",
            1 == d % 2 && (e = "background:#F1F3F5"),
            a += "<tr style='" + e + "' onclick='' onmouseover='' onmouseout=''><td>" + c.ISSUEDATE.format("MMdd HHh") + "</td><td>" + c.LONGITUDE + "</td><td>" + c.LATITUDE + "</td><td>" + c.WIND + "</td><td>" + (100 > Math.abs(1E3 - c.AIRPRESSURE) ? c.AIRPRESSURE: "-") + "</td></tr>";
            a += "</table>";
            $("#routeListContainer").html(a);
            p.reverse();
            t.reverse();
            x.reverse();
            r.reverse();
            q.reverse()
        }
        function u(a) {
            $("#mapTypeContainer div").each(function(a, b) {
                b.style.color = "#000";
                b.style.background = "#fff"
            });
            var b = document.getElementById("mapTypeContainer");
            if (0 == a) n.leafletUtil.tileMap.setStyle(2),
            a = b.children[0];
            else {
                if (1 == n.leafletUtil.tileMap.mapStyle) return;
                n.leafletUtil.tileMap.setStyle(1);
                a = b.children[1]
            }
            a.style.color = "#fff";
            a.style.background = "#3C9AEF"
        }
        var n, x = [],
        r = [],
        p = [],
        q = [],
        t = [],
        y,
        z,
        w,
        A = 0,
        B = "routeListContainer";
        $(document).ready(function() {
            n = new l.DefaultApp;
            for (var a = document.getElementById("cboxyear"), c = (new Date).getFullYear(); 1949 <= c; c--) a.options.add(new Option(c + "\u5e74", c.toString()));
            a.selectedIndex = 1;
            n.getTyphoonList((new Date).getFullYear(),
            function(c) {
                0 == c.length ? (c = (new Date).getFullYear() - 1, n.getTyphoonList(c,
                function(a) {
                    b(a)
                }), a.value = c.toString()) : (b(c), a.value = (new Date).getFullYear().toString());
                n.onCurrentTyphoon(function(a, b) {
                    for (var c = [], d = 0; d < a.length; d++) {
                        var e = a[d];
                        g.typhoonListClick(e.TCIDX, e.TCNO, e.CNAME, e.ENAME, !0);
                        c.push(e.routes[e.routes.length - 1].TOSHENZHEN)
                    }
                    for (var d = c[0], e = c.length, f = 1; f < e; f++) c[f] < d && (d = c[f]);
                    c = $.inArray(d, c);
                    d = a[c].TCNO;
                    d = -1 == d.indexOf("TD") ? d + " " + a[c].CNAME + " " + a[c].ENAME: a[c].CNAME + " " + a[c].ENAME;
                    $("#currentTyphoonTCNO").html(d);
                    $("#checkTyphoonTCNO").html(d);
                    v(a[c].routes)
                })
            });
            $("#cboxyear").on("change",
            function() {
                n.getTyphoonList($("#cboxyear").val(),
                function(a) {
                    b(a)
                })
            });
            n.getAvailableWarning(function(a) {
                if (a && 0 < a.length) for (var b = 0; b < a.length; b++) {
                    var c = a[b],
                    d = "\u9ec4\u8272" == c.SIGNALLEVEL ? "_yellow": "\u7ea2\u8272" == c.SIGNALLEVEL ? "_red": "\u84dd\u8272" == c.SIGNALLEVEL ? "_blue": "\u6a59\u8272" == c.SIGNALLEVEL ? "_orange": "\u767d\u8272" == c.SIGNALLEVEL ? "_white": "",
                    e = "\u66b4\u96e8" == c.SIGNALTYPE ? "rain": "\u53f0\u98ce" == c.SIGNALTYPE ? "typhoon": "\u5927\u98ce" == c.SIGNALTYPE ? "wind": "\u7070\u973e" == c.SIGNALTYPE ? "haze": "\u96f7\u7535" == c.SIGNALTYPE ? "light": "\u9ad8\u6e29" == c.SIGNALTYPE ? "temp": "",
                    f = document.createElement("img");
                    f.style.margin = "5px";
                    f.src = "images/warning/" + e + d + ".png";
                    f.setAttribute("data-toggle", "tooltip");
                    f.setAttribute("data-placement", "top");
                    f.title = c.ISSUECONTENT;
                    2 > b ? document.getElementById("firstDiv").appendChild(f) : 4 > b ? document.getElementById("sencondDiv").appendChild(f) : document.getElementById("thirdDiv").appendChild(f);
                    $(f).tooltip({
                        template: '<div class="tooltip" style="width:200px;" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
                    })
                }
            })
        });
        g.typhoonRouteListChange = function(a) {
            B = a.id;
            h()
        };
        g.GetChangeimaeAndValue = function(a, b) {
            window.Typhoon.SetIssuerVisible(a, b)
        };
        g.cityPosition = function(a) {
            var b = {
                "\u6df1\u5733\u5e02": [22.53994, 114.05961],
                "\u5e7f\u5dde\u5e02": [23.217, 113.483],
                "\u73e0\u6d77\u5e02": [22.283, 113.567],
                "\u4e2d\u5c71\u5e02": [22.5, 113.4],
                "\u4f5b\u5c71\u5e02": [23.15, 113.017],
                "\u6c5f\u95e8\u5e02": [22.533, 113.033],
                "\u9633\u6c5f\u5e02": [21.833, 111.967],
                "\u8302\u540d\u5e02": [21.75, 110.917],
                "\u6e5b\u6c5f\u5e02": [21.15, 110.3],
                "\u5317\u6d77\u5e02": [21.45, 109.133],
                "\u6d77\u53e3\u5e02": [20, 110.25],
                "\u4e1c\u839e\u5e02": [22.967, 113.733],
                "\u60e0\u5dde\u5e02": [23.067, 114.367],
                "\u6c55\u5c3e\u5e02": [22.8, 115.367],
                "\u6c55\u5934\u5e02": [23.4, 116.683],
                "\u53a6\u95e8\u5e02": [24.446, 118.068],
                "\u798f\u5dde\u5e02": [26.083, 119.283],
                "\u6e29\u5dde\u5e02": [28.033, 120.65],
                "\u5b81\u6ce2\u5e02": [30.517, 120.65],
                "\u676d\u5dde\u5e02": [30.233, 120.167],
                "\u4e0a\u6d77\u5e02": [31.4, 121.45]
            };
            a = a.innerHTML;
            app.data.map.setView(b[a]);
            n.bottomlayers.setCenterCity({
                name: a,
                latlng: b[a]
            })
        };
        g.chkProductImage = function(a, b) {
            a.checked ? (a.checked = !1, a.style.backgroundColor = "#6CA5E8", f(b, a.checked), $("#lengend" + b).hide()) : (a.checked = !0, a.style.backgroundColor = "#F6A623", f(b, a.checked), $("#lengend" + b).show())
        };
        g.typhoonListClick = function(a, b, c, d, e) {
            var f = $(":checkbox[value='" + a + "_" + b + "']"),
            g = "true" != f.attr("_checked");
            f.prop("checked", g).attr("_checked", g.toString());
            k(a, b, c, d, g, e)
        };
        g.typhoonRangeSwitch = function(a) {
            1 === a ? ($("#typhoonRangeclose").hide(), $("#typhoonRangeopen").show()) : 0 === a && ($("#typhoonRangeopen").hide(), $("#typhoonRangeclose").show())
        };
        g.forecastUnitSwitch = function(a) {
            1 === a ? ($("#forecastUnitclose").hide(), $("#forecastUnitopen").show()) : 0 === a && ($("#forecastUnitopen").hide(), $("#forecastUnitclose").show())
        };
        g.typhoonSynalChecked = function(a, b) {
            d(["view/typhoonSynal"],
            function(c) {
                1 == a.chked ? (a.chked = !1, a.style.backgroundColor = "#fff", a.style.color = "#000", c.off(b)) : (a.chked = !0, a.style.backgroundColor = "#F6A623", a.style.color = "#fff", c.on(b))
            })
        };
        g.tileMapChange = u
    })(h.defaultPage || (h.defaultPage = {}))
});
define("view/tile/tileAutonavi", ["require", "exports"],
function(d, h) {
    h.__esModule = !0;
    var l = function() {
        function d(b, d) {
            void 0 === b && (b = 0);
            this.mapStyle = b;
            var a = this.getUrl(d);
            this.layer = L.tileLayer(a, {
                subdomains: ["webrd01", "webrd02", "webrd03", "webrd04"],
                minZoom: 0,
                maxZoom: 20,
                continuousWorld: !0
            })
        }
        d.getInstance = function(b, g) {
            void 0 === b && (b = 0);
            null == d.instance && (d.instance = new d(b, g));
            return d.instance
        };
        d.prototype.getUrl = function(b) {
            var d;
            0 == this.mapStyle ? d = "http://{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&x={x}&y={y}&z={z}&style=8": 1 == this.mapStyle ? (this.layer.options.subdomains = ["mt0", "mt1", "mt2", "mt3"], d = "http://{s}.google.cn/vt/hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&lyrs=y&apistyle=s.t:3|p.v:off") : 2 == this.mapStyle ? d = "http://{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&x={x}&y={y}&z={z}&style=8": 3 == this.mapStyle && (d = "http://{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&x={x}&y={y}&z={z}&style=8");
            return d
        };
        d.prototype.setStyle = function(b, d) {
            if (this.mapStyle != b) {
                this.mapStyle = b;
                this.layer.options.subdomains = ["webrd01", "webrd02", "webrd03", "webrd04"];
                var a = this.getUrl(d);
                this.layer.setUrl(a);
                this.layer.redraw()
            }
        };
        d.prototype.addToMap = function(b) {
            this.layer.addTo(b);
            return this
        };
        d.prototype.destroy = function() {
            this.layer._map && this.layer._map.removeLayer(this.layer);
            this.layer = null
        };
        d.prototype.CRS = function() {
            return null
        };
        return d
    } ();
    h["default"] = l
});
define("module/gfs/math", ["require", "exports"],
function(d, h) {
    h.__esModule = !0; (function(d) {
        d.bilinearInterpolateVector = function(d, b, h, a, c, e) {
            var f = 1 - d,
            g = 1 - b,
            m = f * g,
            g = d * g,
            f = f * b;
            b *= d;
            d = h[0] * m + a[0] * g + c[0] * f + e[0] * b;
            h = h[1] * m + a[1] * g + c[1] * f + e[1] * b;
            return [d, h, Math.sqrt(d * d + h * h)]
        };
        d.floorMod = function(d, b) {
            return d - b * Math.floor(d / b)
        };
        d.clamp = function(d, b) {
            return Math.max(b[0], Math.min(d, b[1]))
        };
        d.deg2rad = function(d) {
            return d / 180 * Math.PI
        };
        d.rad2deg = function(d) {
            return d / (Math.PI / 180)
        };
        d.mercY = function(d) {
            return Math.log(Math.tan(d / 2 + Math.PI / 4))
        };
        d.project = function(g, b, h) {
            var a = d.mercY(h.south),
            c = d.mercY(h.north),
            e = h.width / (h.east - h.west),
            a = h.height / (c - a);
            g = d.mercY(d.deg2rad(g));
            return [(d.deg2rad(b) - h.west) * e, (c - g) * a]
        };
        d.pointToLnglat = function(g, b, h) {
            var a = h.east - h.west,
            c = h.width / d.rad2deg(a) * 360 / (2 * Math.PI);
            b = 180 / Math.PI * (2 * Math.atan(Math.exp((h.height + c / 2 * Math.log((1 + Math.sin(h.south)) / (1 - Math.sin(h.south))) - b) / c)) - Math.PI / 2);
            return [d.rad2deg(h.west) + g / h.width * d.rad2deg(a), b]
        }
    })(h.math || (h.math = {}))
});
define("module/gfs/view", ["require", "exports"],
function(d, h) {
    h.__esModule = !0;
    var l, g, b = function() {
        function b(a, b) {
            this.canvasLayer = a;
            this.GFSGrid = b;
            this.TRANSPARENT_BLACK = [255, 0, 0, 0];
            this.colorArray = "#929191 #ADFF2E #ADFF2E #00CD00 #FFFF00 #FFA500 #FF6246 #FF0000".split(" ");
            window.requestAnimationFrame = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
                function(a) {
                    return window.setTimeout(a, 50)
                }
            } ();
            window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout
        }
        b.prototype.animate = function(a, b, d, f) {
            var c = this,
            e = this.colorArray.map(function() {
                return []
            }),
            h = function() {
                e.forEach(function(a) {
                    a.length = 0
                });
                var f;
                d.forEach(function(d) {
                    d.age > c.GFSGrid.MAX_PARTICLE_AGE ? (d.canvasX = Math.round(Math.floor(Math.random() * a)), d.canvasY = Math.round(Math.floor(Math.random() * b)), d.gfsVector = c.GFSGrid.canvasVectorGrid.getVectorByPoint(d.canvasX, d.canvasY), d.age = 0, f = d.gfsVector) : f = c.GFSGrid.canvasVectorGrid.getVectorByPoint(d.canvasX, d.canvasY);
                    var g = f[2];
                    g ? (d.canvasXt = d.canvasX + f[0], d.canvasYt = d.canvasY + f[1], g -= 5, 0 > g && (g = 0), e[g].push(d)) : d.age = c.GFSGrid.MAX_PARTICLE_AGE;
                    d.age += 1
                })
            },
            m = this.canvasLayer.getCanvasRenderingContext2D(),
            x = -1 !== window.navigator.userAgent.indexOf("Chrome");
            m.lineWidth = x ? .4 : 1;
            m.globalAlpha = .96;
            var r = function() {
                m.globalCompositeOperation = "destination-in";
                m.fillRect(0, 0, a, b);
                m.globalCompositeOperation = "lighter";
                e.forEach(function(a, b) {
                    0 < a.length && (m.beginPath(), m.strokeStyle = c.colorArray[b], a.forEach(function(a) {
                        m.moveTo(a.canvasX, a.canvasY);
                        m.lineTo(a.canvasXt, a.canvasYt);
                        a.canvasX = a.canvasXt;
                        a.canvasY = a.canvasYt
                    }), m.stroke())
                })
            };
            l = requestAnimationFrame(function q() {
                h();
                r();
                x ? g = window.setTimeout(function() {
                    l = requestAnimationFrame(q)
                },
                40) : l = requestAnimationFrame(q)
            })
        };
        b.prototype.start = function(a, b, d, f) {
            this.clear();
            this.canvasLayer.setPosition();
            this.animate(a, b, d, f)
        };
        b.prototype.stop = function() {
            window.clearTimeout(g);
            window.cancelAnimationFrame(l)
        };
        b.prototype.clear = function() {
            this.stop();
            var a = this.canvasLayer.getCanvasRenderingContext2D(),
            b = this.canvasLayer.getSize();
            a.clearRect(0, 0, b.x, b.y)
        };
        return b
    } ();
    h.view = b
});
define("module/gfs/data", ["require", "exports"],
function(d, h) {
    h.__esModule = !0;
    var l = function() {
        function d() {
            this.NULL_WIND_VECTOR = [NaN, NaN, null];
            this.MAX_PARTICLE_AGE = 100;
            this.Horv = Math.pow(10, -5.2);
            this.particles = []
        }
        d.prototype.updateBounds = function(b, d, a, c, e) {
            var f = this;
            this.mapExtent = a;
            this.canvasVectorGrid && (this.canvasVectorGrid.data.length = 0);
            var g = .011;
            3 < c && (g /= 1.2 * (c - 3));
            $.getJSON("http://112.93.116.204/utility/gfsDataEnd.ashx?width=" + b + "&height=" + d + "&scale=" + g + "&east=" + a.east + "&west=" + a.west + "&south=" + a.south + "&north=" + a.north,
            function(a) {
                var c = Math.round(b / 4),
                g = a.refTime.toDate();
                g.setHours(g.getHours() + 8);
                f.canvasVectorGrid = {
                    refTime: g,
                    forecastHours: +a.forecastTime,
                    width: b,
                    height: d,
                    data: a.data,
                    getVectorByPoint: function(a, b) {
                        var d = Math.round(b / 4) * c,
                        d = d + Math.round(a / 4),
                        d = 3 * d;
                        return [f.canvasVectorGrid.data[d++] / 10, f.canvasVectorGrid.data[d++] / 10, f.canvasVectorGrid.data[d]]
                    }
                };
                e()
            })
        };
        d.prototype.getParticles = function(b, d, a) {
            for (var c = this.particles.length = 0; c < a; c++) {
                var e = Math.round(Math.floor(Math.random() * b)),
                f = Math.round(Math.floor(Math.random() * d)),
                g = this.canvasVectorGrid.getVectorByPoint(e, f);
                this.particles.push({
                    canvasX: e,
                    canvasY: f,
                    gfsVector: g,
                    orginX: e,
                    orginY: f,
                    orginSpot: g,
                    age: Math.random() * this.MAX_PARTICLE_AGE
                })
            }
            return this.particles
        };
        d.prototype.destroy = function() {
            this.canvasVectorGrid.data.length = 0;
            this.canvasVectorGrid = null
        };
        return d
    } ();
    h.data = l
});
define("util/canvasOverlay", ["require", "exports"],
function(d, h) {
    function l() {
        this.a7 = this.a6 = this.a5 = this.a4 = this.a3 = this.a2 = this.a1 = this.a0 = null;
        this.i8 = 0;
        this.a12 = this.a11 = this.a10 = this.a9 = null;
        this.d = [this];
        Object(this)
    }
    function g(b, d) {
        var g, h, l, n;
        b.a5 = d;
        g = b.a1;
        g = g.create("canvas", "leaflet-layer");
        b.a4 = g;
        g = b.a5;
        g = g.getSize();
        b.a7 = g;
        g = b.a4;
        l = b.a7;
        l = l.x;
        h = +l.valueOf();
        l = String(h | 0);
        g.setAttribute("width", l);
        g = b.a4;
        l = b.a7;
        l = l.y;
        h = +l.valueOf();
        l = String(h | 0);
        g.setAttribute("height", l);
        g = b.a0;
        g = g.Browser;
        h = +g.valueOf();
        b.i8 = (0 !== h ? 1 : 0) & 255;
        g = d.options;
        h = +g.valueOf();
        0 !== h ? (n = b.i8 & 255, n = 0 !== (n & 1) ? 1 : 0) : n = 0;
        g = b.a1;
        h = b.a4;
        l = "leaflet-zoom-";
        var x = n | 0 ? e: f,
        z,
        w,
        A;
        z = String();
        w = x[0] & 255;
        if (0 !== (w & 255)) for (A = 0; w = String.fromCharCode(w << 24 >> 24 | 0), z = z.concat(w), A = A + 1 | 0, w = x[0 + A | 0] & 255, 0 !== (w & 255););
        l = l.concat(String(z));
        g.addClass(h, l);
        g = d.getPane("overlayPane");
        h = b.a4;
        g.appendChild(h);
        g = [{
            a0: null
        }];
        g[0].a0 = null;
        h = {
            a0: null,
            a1: {
                a0: null
            }
        };
        h.a0 = k;
        h.a1.a0 = b;
        g[0].a0 = h;
        g = c(a, g[0]);
        b.a10 = g;
        g = [{
            a0: null
        }];
        g[0].a0 = null;
        h = {
            a0: null,
            a1: {
                a0: null
            }
        };
        h.a0 = v;
        h.a1.a0 = b;
        g[0].a0 = h;
        g = c(m, g[0]);
        b.a11 = g;
        h = b.a10;
        d.addEventListener("moveend", h, null);
        h = b.a11;
        d.addEventListener("resize", h, null);
        n | 0 && (g = [{
            a0: null
        }], g[0].a0 = null, h = {
            a0: null,
            a1: {
                a0: null
            }
        },
        h.a0 = u, h.a1.a0 = b, g[0].a0 = h, g = c(m, g[0]), b.a12 = g, h = b.a12, d.addEventListener("zoomanim", h, null))
    }
    function b(a, b) {
        var c, d;
        c = b.getPane("overlayPane");
        d = a.a4;
        c.removeChild(d);
        d = a.a10;
        b.removeEventListener("moveend", d, null);
        d = a.a11;
        b.removeEventListener("resize", d, null);
        c = a.a12;
        null !== c && (d = a.a12, b.removeEventListener("zoomanim", d, null))
    }
    function m(a, b) {
        var c, d, e;
        c = a.a0;
        d = [null];
        d[0] = b;
        e = c.a0;
        e = e.a6;
        e(c, d, 0);
        null !== a && (c = a.a0, null !== c && (d = c.a0, d = d.a5, d(c)))
    }
    function a(a) {
        var b, c;
        b = a.a0;
        c = b.a0;
        c = c.a6;
        c(b);
        null !== a && (b = a.a0, null !== b && (c = b.a0, c = c.a5, c(b)))
    }
    function c(a, b) {
        return function(c) {
            a(b, c)
        }
    }
    "undefined" == typeof Uint8Array && (Uint8Array = Array);
    "use strict";
    l.prototype.initialize = function(a, b) {
        this.a0 = b;
        this.a1 = b.DomUtil;
        null !== a && (this.a6 = a, b.setOptions(this, a))
    };
    l.prototype.params = function(a) {
        this.a0.setOptions(this, a);
        return this
    };
    l.prototype.onUpdate = function(a) {
        this.a9 = a
    };
    l.prototype.onAdd = function(a) {
        return g(this, a)
    };
    l.prototype.onRemove = function(a) {
        return b(this, a)
    };
    l.prototype.addTo = function(a) {
        g(this, a);
        return this
    };
    l.prototype.getWebGLRenderingContext = function() {
        var a;
        a = this.a2;
        null === a && (a = this.a4, this.a2 = a = a.getContext("webgl"), null === a && (a = this.a4, this.a2 = a = a.getContext("experimental-webgl")));
        return a
    };
    l.prototype.getCanvasRenderingContext2D = function() {
        var a;
        a = this.a3;
        null === a && (a = this.a4, this.a3 = a = a.getContext("2d"));
        return a
    };
    l.prototype.destroy = function() {
        b(this, this.a5)
    };
    l.prototype.getSize = function() {
        return this.a7
    };
    l.prototype.setPosition = function() {
        var a, b;
        a = this.a5;
        b = [0, 0];
        a = a.containerPointToLayerPoint(b);
        b = this.a1;
        b.setPosition(this.a4, a)
    };
    new Uint8Array([50, 100, 0]);
    new Uint8Array([119, 101, 98, 103, 108, 0]);
    new Uint8Array([101, 120, 112, 101, 114, 105, 109, 101, 110, 116, 97, 108, 45, 119, 101, 98, 103, 108, 0]);
    new Uint8Array([111, 118, 101, 114, 108, 97, 121, 80, 97, 110, 101, 0]);
    new Uint8Array([109, 111, 118, 101, 101, 110, 100, 0]);
    new Uint8Array([114, 101, 115, 105, 122, 101, 0]);
    new Uint8Array([122, 111, 111, 109, 97, 110, 105, 109, 0]);
    new Uint8Array([99, 97, 110, 118, 97, 115, 0]);
    new Uint8Array([108, 101, 97, 102, 108, 101, 116, 45, 108, 97, 121, 101, 114, 0]);
    new Uint8Array([119, 105, 100, 116, 104, 0]);
    new Uint8Array([120, 0]);
    new Uint8Array([104, 101, 105, 103, 104, 116, 0]);
    new Uint8Array([121, 0]);
    new Uint8Array([97, 110, 121, 51, 100, 0]);
    new Uint8Array([66, 114, 111, 119, 115, 101, 114, 0]);
    new Uint8Array([122, 111, 111, 109, 65, 110, 105, 109, 97, 116, 105, 111, 110, 0]);
    new Uint8Array([111, 112, 116, 105, 111, 110, 115, 0]);
    new Uint8Array([108, 101, 97, 102, 108, 101, 116, 45, 122, 111, 111, 109, 45, 0]);
    var e = new Uint8Array([97, 110, 105, 109, 97, 116, 101, 100, 0]),
    f = new Uint8Array([104, 105, 100, 101, 0]),
    k = {
        a0: null,
        a1: function(a) {},
        a2: function(a) {},
        a3: function(a) {
            var b;
            b = {
                a0: null,
                a1: {
                    a0: null
                }
            };
            b.a0 = k;
            b.a1.a0 = a.a1.a0;
            return b
        },
        a4: function(a) {},
        a5: function(a) {},
        a6: function(a) {
            a = a.a1.a0;
            a = a.a9;
            null !== a && a()
        }
    },
    v = {
        a0: null,
        a1: function(a) {},
        a2: function(a) {},
        a3: function(a) {
            var b;
            b = {
                a0: null,
                a1: {
                    a0: null
                }
            };
            b.a0 = v;
            b.a1.a0 = a.a1.a0;
            return b
        },
        a4: function(a) {},
        a5: function(a) {},
        a6: function(a, b, c) {
            a = a.a1.a0;
            var d;
            b = b[c | 0].newSize;
            c = b.x;
            d = +c.valueOf();
            c = a.a4;
            c.setAttribute("width", String(d | 0));
            b = b.y;
            d = +b.valueOf();
            b = a.a4;
            b.setAttribute("height", String(d | 0));
            b = a.a9;
            null !== b && b()
        }
    },
    u = {
        a0: null,
        a1: function(a) {},
        a2: function(a) {},
        a3: function(a) {
            var b;
            b = {
                a0: null,
                a1: {
                    a0: null
                }
            };
            b.a0 = u;
            b.a1.a0 = a.a1.a0;
            return b
        },
        a4: function(a) {},
        a5: function(a) {},
        a6: function(a, b, c) {
            var d, e, f;
            a = a.a1.a0;
            b = b[c | 0];
            c = b.zoom;
            d = +c.valueOf();
            c = a.a5;
            e = +c.getZoomScale(d);
            b = b.center;
            c = a.a5;
            f = c.getBounds();
            b = c._latLngBoundsToNewLayerBounds(f, d | 0, null === b ? null: b);
            b = b.min;
            c = a.a1;
            a = a.a4;
            c.setTransform(a, b, e)
        }
    };
    new Uint8Array([122, 111, 111, 109, 0]);
    new Uint8Array([99, 101, 110, 116, 101, 114, 0]);
    new Uint8Array([109, 105, 110, 0]);
    new Uint8Array([110, 101, 119, 83, 105, 122, 101, 0]);
    new Uint8Array([68, 111, 109, 85, 116, 105, 108, 0]); (function() {
        var a = L.Class.extend(new l);
        L.canvasOverlay = function(b) {
            return new a(b, L)
        };
        return 0
    })()
});
define("module/gfs/main", "require exports module/gfs/math module/gfs/view module/gfs/data util/canvasOverlay".split(" "),
function(d, h, l, g, b) {
    h.__esModule = !0;
    d = function() {
        function d(a) {
            var c = this;
            this.map = a;
            9 > app.common.checkIE() ? alert("\u6d4f\u89c8\u5668\u7248\u672c\u4e0d\u652f\u6301\u8be5\u529f\u80fd") : (this.canvarRender = L.canvasOverlay().addTo(a), this.canvarRender.onUpdate(function() {
                c.redraw()
            }), this.gfsData = new b.data, this.windyView = new g.view(this.canvarRender, this.gfsData), this.redraw())
        }
        d.prototype.redraw = function() {
            var a = this,
            b = this.map.getBounds(),
            d = this.map.getSize(),
            b = {
                south: l.math.deg2rad(b.getSouth()),
                north: l.math.deg2rad(b.getNorth()),
                east: l.math.deg2rad(b.getEast()),
                west: l.math.deg2rad(b.getWest()),
                width: d.x,
                height: d.y
            },
            f = this.map.getZoom(),
            g = Math.round(1 / 30 * d.y * d.x);
            3 < f && (g /= .9 * Math.min(Math.pow(2, f - 3), 7));
            15E3 < g && (g = 15E3);
            this.windyView.stop();
            this.gfsData.updateBounds(d.x, d.y, b, f,
            function() {
                var b = a.gfsData.getParticles(d.x, d.y, g | 0);
                a.windyView.start(d.x, d.y, b, f);
                a.onShowCallback && (b = new Date(a.gfsData.canvasVectorGrid.refTime.getTime() + 36E5 * a.gfsData.canvasVectorGrid.forecastHours), a.onShowCallback(a.gfsData.canvasVectorGrid.refTime, b))
            })
        };
        d.prototype.onShow = function(a) {
            this.onShowCallback = a
        };
        d.prototype.destroy = function() {
            this.gfsData.destroy();
            this.gfsData = null;
            this.windyView.clear();
            this.windyView = null;
            this.canvarRender.destroy();
            this.map.removeLayer(this.canvarRender)
        };
        return d
    } ();
    h.main = d
});
define("view/typhoonCircle", [],
function() {
    L.typhoonCircle = L.Circle.extend({
        initialize: function(d, h, l) {
            this.radius = h;
            h[0] == h[1] && h[1] == h[2] && h[2] == h[3] ? (L.Circle.prototype.initialize.call(this, d, h[0], l), this.isPerfectCircle = !0) : L.Circle.prototype.initialize.call(this, d, 0, l)
        },
        onAdd: function(d) {
            L.Circle.prototype.onAdd.call(this, d);
            1 != this.isPerfectCircle && (this.setPathString(d), d.addEventListener("moveend", this.setPathString, this))
        },
        onRemove: function(d) {
            1 != this.isPerfectCircle && d.removeEventListener("moveend", this.setPathString, this);
            L.Circle.prototype.onRemove.call(this, d)
        },
        setPathString: function(d) {
            d = this.getPathString(d.target || d);
            this.getElement().setAttribute("d", d)
        },
        getPathString: function(d) {
            var h = [this._latlng.lat, this._latlng.lng],
            l = d.latLngToLayerPoint(mathGeo.prototype.getCoordinate(h, this.radius[0], 0, !0)),
            g = d.latLngToLayerPoint(mathGeo.prototype.getCoordinate(h, this.radius[0], 90, !0)),
            b = g.x - this._point.x,
            m = d.latLngToLayerPoint(mathGeo.prototype.getCoordinate(h, this.radius[1], 90, !0)),
            a = d.latLngToLayerPoint(mathGeo.prototype.getCoordinate(h, this.radius[1], 180, !0)),
            c = m.x - this._point.x,
            e = d.latLngToLayerPoint(mathGeo.prototype.getCoordinate(h, this.radius[2], 180, !0)),
            f = d.latLngToLayerPoint(mathGeo.prototype.getCoordinate(h, this.radius[2], 270, !0)),
            k = this._point.x - f.x,
            v = d.latLngToLayerPoint(mathGeo.prototype.getCoordinate(h, this.radius[3], 270, !0));
            d = d.latLngToLayerPoint(mathGeo.prototype.getCoordinate(h, this.radius[3], 0, !0));
            h = this._point.x - v.x;
            return "M" + l.x + "," + l.y + "A" + b + "," + b + ",0,0,1," + g.x + "," + g.y + "L" + m.x + "," + m.y + "A" + c + "," + c + ",0,0,1," + a.x + "," + a.y + "L" + e.x + "," + e.y + "A" + k + "," + k + ",0,0,1," + f.x + "," + f.y + "L" + v.x + "," + v.y + "A" + h + "," + h + ",0,0,1," + d.x + "," + d.y + "z"
        }
    });
    return L.typhoonCircle
});
/*!
 * parallax.js v1.5.0 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */
!(function (t, i, e, s) {
  function o(i, e) {
    var h = this;
    "object" == typeof e &&
      (delete e.refresh, delete e.render, t.extend(this, e)),
      (this.$element = t(i)),
      !this.imageSrc &&
      this.$element.is("img") &&
      (this.imageSrc = this.$element.attr("src"));
    var r = (this.position + "").toLowerCase().match(/\S+/g) || [];
    if (
      (r.length < 1 && r.push("center"),
        1 == r.length && r.push(r[0]),
        ("top" != r[0] &&
          "bottom" != r[0] &&
          "left" != r[1] &&
          "right" != r[1]) ||
        (r = [r[1], r[0]]),
        this.positionX !== s && (r[0] = this.positionX.toLowerCase()),
        this.positionY !== s && (r[1] = this.positionY.toLowerCase()),
        (h.positionX = r[0]),
        (h.positionY = r[1]),
        "left" != this.positionX &&
        "right" != this.positionX &&
        (isNaN(parseInt(this.positionX)) ?
          (this.positionX = "center") :
          (this.positionX = parseInt(this.positionX))),
        "top" != this.positionY &&
        "bottom" != this.positionY &&
        (isNaN(parseInt(this.positionY)) ?
          (this.positionY = "center") :
          (this.positionY = parseInt(this.positionY))),
        (this.position =
          this.positionX +
          (isNaN(this.positionX) ? "" : "px") +
          " " +
          this.positionY +
          (isNaN(this.positionY) ? "" : "px")),
        navigator.userAgent.match(/(iPod|iPhone|iPad)/))
    )
      return (
        this.imageSrc &&
        this.iosFix &&
        !this.$element.is("img") &&
        this.$element.css({
          backgroundImage: 'url("' + this.imageSrc + '")',
          backgroundSize: "cover",
          backgroundPosition: this.position,
        }),
        this
      );
    if (navigator.userAgent.match(/(Android)/))
      return (
        this.imageSrc &&
        this.androidFix &&
        !this.$element.is("img") &&
        this.$element.css({
          backgroundImage: 'url("' + this.imageSrc + '")',
          backgroundSize: "cover",
          backgroundPosition: this.position,
        }),
        this
      );
    this.$mirror = t("<div />").prependTo(this.mirrorContainer);
    var a = this.$element.find(">.parallax-slider"),
      n = !1;
    0 == a.length ?
      (this.$slider = t("<img />").prependTo(this.$mirror)) :
      ((this.$slider = a.prependTo(this.$mirror)), (n = !0)),
      this.$mirror.addClass("parallax-mirror").css({
        visibility: "hidden",
        zIndex: this.zIndex,
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
      }),
      this.$slider.addClass("parallax-slider").one("load", function () {
        (h.naturalHeight && h.naturalWidth) ||
        ((h.naturalHeight = this.naturalHeight || this.height || 1),
          (h.naturalWidth = this.naturalWidth || this.width || 1)),
        (h.aspectRatio = h.naturalWidth / h.naturalHeight),
        o.isSetup || o.setup(),
          o.sliders.push(h),
          (o.isFresh = !1),
          o.requestRender();
      }),
      n || (this.$slider[0].src = this.imageSrc),
      ((this.naturalHeight && this.naturalWidth) ||
        this.$slider[0].complete ||
        a.length > 0) &&
      this.$slider.trigger("load");
  }!(function () {
    for (
      var t = 0, e = ["ms", "moz", "webkit", "o"], s = 0; s < e.length && !i.requestAnimationFrame;
      ++s
    )
      (i.requestAnimationFrame = i[e[s] + "RequestAnimationFrame"]),
      (i.cancelAnimationFrame =
        i[e[s] + "CancelAnimationFrame"] ||
        i[e[s] + "CancelRequestAnimationFrame"]);
    i.requestAnimationFrame ||
      (i.requestAnimationFrame = function (e) {
        var s = new Date().getTime(),
          o = Math.max(0, 16 - (s - t)),
          h = i.setTimeout(function () {
            e(s + o);
          }, o);
        return (t = s + o), h;
      }),
      i.cancelAnimationFrame ||
      (i.cancelAnimationFrame = function (t) {
        clearTimeout(t);
      });
  })(),
  t.extend(o.prototype, {
      speed: 0.2,
      bleed: 0,
      zIndex: -100,
      iosFix: !0,
      androidFix: !0,
      position: "center",
      overScrollFix: !1,
      mirrorContainer: "body",
      refresh: function () {
        (this.boxWidth = this.$element.outerWidth()),
        (this.boxHeight = this.$element.outerHeight() + 2 * this.bleed),
        (this.boxOffsetTop = this.$element.offset().top - this.bleed),
        (this.boxOffsetLeft = this.$element.offset().left),
        (this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight);
        var t,
          i = o.winHeight,
          e = o.docHeight,
          s = Math.min(this.boxOffsetTop, e - i),
          h = Math.max(this.boxOffsetTop + this.boxHeight - i, 0),
          r = (this.boxHeight + (s - h) * (1 - this.speed)) | 0,
          a = ((this.boxOffsetTop - s) * (1 - this.speed)) | 0;
        r * this.aspectRatio >= this.boxWidth ?
          ((this.imageWidth = (r * this.aspectRatio) | 0),
            (this.imageHeight = r),
            (this.offsetBaseTop = a),
            (t = this.imageWidth - this.boxWidth),
            "left" == this.positionX ?
            (this.offsetLeft = 0) :
            "right" == this.positionX ?
            (this.offsetLeft = -t) :
            isNaN(this.positionX) ?
            (this.offsetLeft = (-t / 2) | 0) :
            (this.offsetLeft = Math.max(this.positionX, -t))) :
          ((this.imageWidth = this.boxWidth),
            (this.imageHeight = (this.boxWidth / this.aspectRatio) | 0),
            (this.offsetLeft = 0),
            (t = this.imageHeight - r),
            "top" == this.positionY ?
            (this.offsetBaseTop = a) :
            "bottom" == this.positionY ?
            (this.offsetBaseTop = a - t) :
            isNaN(this.positionY) ?
            (this.offsetBaseTop = (a - t / 2) | 0) :
            (this.offsetBaseTop = a + Math.max(this.positionY, -t)));
      },
      render: function () {
        var t = o.scrollTop,
          i = o.scrollLeft,
          e = this.overScrollFix ? o.overScroll : 0,
          s = t + o.winHeight;
        this.boxOffsetBottom > t && this.boxOffsetTop <= s ?
          ((this.visibility = "visible"),
            (this.mirrorTop = this.boxOffsetTop - t),
            (this.mirrorLeft = this.boxOffsetLeft - i),
            (this.offsetTop =
              this.offsetBaseTop - this.mirrorTop * (1 - this.speed))) :
          (this.visibility = "hidden"),
          this.$mirror.css({
            transform: "translate3d(" +
              this.mirrorLeft +
              "px, " +
              (this.mirrorTop - e) +
              "px, 0px)",
            visibility: this.visibility,
            height: this.boxHeight,
            width: this.boxWidth,
          }),
          this.$slider.css({
            transform: "translate3d(" +
              this.offsetLeft +
              "px, " +
              this.offsetTop +
              "px, 0px)",
            position: "absolute",
            height: this.imageHeight,
            width: this.imageWidth,
            maxWidth: "none",
          });
      },
    }),
    t.extend(o, {
      scrollTop: 0,
      scrollLeft: 0,
      winHeight: 0,
      winWidth: 0,
      docHeight: 1 << 30,
      docWidth: 1 << 30,
      sliders: [],
      isReady: !1,
      isFresh: !1,
      isBusy: !1,
      setup: function () {
        function s() {
          if (p == i.pageYOffset) return i.requestAnimationFrame(s), !1;
          (p = i.pageYOffset), h.render(), i.requestAnimationFrame(s);
        }
        if (!this.isReady) {
          var h = this,
            r = t(e),
            a = t(i),
            n = function () {
              (o.winHeight = a.height()),
              (o.winWidth = a.width()),
              (o.docHeight = r.height()),
              (o.docWidth = r.width());
            },
            l = function () {
              var t = a.scrollTop(),
                i = o.docHeight - o.winHeight,
                e = o.docWidth - o.winWidth;
              (o.scrollTop = Math.max(0, Math.min(i, t))),
              (o.scrollLeft = Math.max(0, Math.min(e, a.scrollLeft()))),
              (o.overScroll = Math.max(t - i, Math.min(t, 0)));
            };
          a
            .on("resize.px.parallax load.px.parallax", function () {
              n(), h.refresh(), (o.isFresh = !1), o.requestRender();
            })
            .on("scroll.px.parallax load.px.parallax", function () {
              l(), o.requestRender();
            }),
            n(),
            l(),
            (this.isReady = !0);
          var p = -1;
          s();
        }
      },
      configure: function (i) {
        "object" == typeof i &&
          (delete i.refresh, delete i.render, t.extend(this.prototype, i));
      },
      refresh: function () {
        t.each(this.sliders, function () {
            this.refresh();
          }),
          (this.isFresh = !0);
      },
      render: function () {
        this.isFresh || this.refresh(),
          t.each(this.sliders, function () {
            this.render();
          });
      },
      requestRender: function () {
        var t = this;
        t.render(), (t.isBusy = !1);
      },
      destroy: function (e) {
        var s,
          h = t(e).data("px.parallax");
        for (h.$mirror.remove(), s = 0; s < this.sliders.length; s += 1)
          this.sliders[s] == h && this.sliders.splice(s, 1);
        t(e).data("px.parallax", !1),
          0 === this.sliders.length &&
          (t(i).off("scroll.px.parallax resize.px.parallax load.px.parallax"),
            (this.isReady = !1),
            (o.isSetup = !1));
      },
    });
  var h = t.fn.parallax;
  (t.fn.parallax = function (s) {
    return this.each(function () {
      var h = t(this),
        r = "object" == typeof s && s;
      this == i || this == e || h.is("body") ?
        o.configure(r) :
        h.data("px.parallax") ?
        "object" == typeof s && t.extend(h.data("px.parallax"), r) :
        ((r = t.extend({}, h.data(), r)),
          h.data("px.parallax", new o(this, r))),
        "string" == typeof s && ("destroy" == s ? o.destroy(this) : o[s]());
    });
  }),
  (t.fn.parallax.Constructor = o),
  (t.fn.parallax.noConflict = function () {
    return (t.fn.parallax = h), this;
  }),
  t(function () {
    t('[data-parallax="scroll"]').parallax();
  });
})(jQuery, window, document);

/* End Parallax plugin */

/* Data AOS plugin */

!(function (e, t) {
  "object" == typeof exports && "object" == typeof module ?
    (module.exports = t()) :
    "function" == typeof define && define.amd ?
    define([], t) :
    "object" == typeof exports ?
    (exports.AOS = t()) :
    (e.AOS = t());
})(this, function () {
  return (function (e) {
    function t(o) {
      if (n[o]) return n[o].exports;
      var i = (n[o] = {
        exports: {},
        id: o,
        loaded: !1
      });
      return e[o].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports;
    }
    var n = {};
    return (t.m = e), (t.c = n), (t.p = "dist/"), t(0);
  })([
    function (e, t, n) {
      "use strict";

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        };
      }
      var i =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        },
        r = n(1),
        a = (o(r), n(6)),
        u = o(a),
        c = n(7),
        f = o(c),
        s = n(8),
        d = o(s),
        l = n(9),
        p = o(l),
        m = n(10),
        b = o(m),
        v = n(11),
        y = o(v),
        g = n(14),
        h = o(g),
        w = [],
        k = !1,
        x = document.all && !window.atob,
        j = {
          offset: 120,
          delay: 0,
          easing: "ease",
          duration: 400,
          disable: !1,
          once: !1,
          startEvent: "DOMContentLoaded",
          throttleDelay: 99,
          debounceDelay: 50,
          disableMutationObserver: !1,
        },
        O = function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          if ((e && (k = !0), k))
            return (w = (0, y.default)(w, j)), (0, b.default)(w, j.once), w;
        },
        _ = function () {
          (w = (0, h.default)()), O();
        },
        S = function () {
          w.forEach(function (e, t) {
            e.node.removeAttribute("data-aos"),
              e.node.removeAttribute("data-aos-easing"),
              e.node.removeAttribute("data-aos-duration"),
              e.node.removeAttribute("data-aos-delay");
          });
        },
        z = function (e) {
          return (
            e === !0 ||
            ("mobile" === e && p.default.mobile()) ||
            ("phone" === e && p.default.phone()) ||
            ("tablet" === e && p.default.tablet()) ||
            ("function" == typeof e && e() === !0)
          );
        },
        A = function (e) {
          return (
            (j = i(j, e)),
            (w = (0, h.default)()),
            z(j.disable) || x ?
            S() :
            (document
              .querySelector("body")
              .setAttribute("data-aos-easing", j.easing),
              document
              .querySelector("body")
              .setAttribute("data-aos-duration", j.duration),
              document
              .querySelector("body")
              .setAttribute("data-aos-delay", j.delay),
              "DOMContentLoaded" === j.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 ?
              O(!0) :
              "load" === j.startEvent ?
              window.addEventListener(j.startEvent, function () {
                O(!0);
              }) :
              document.addEventListener(j.startEvent, function () {
                O(!0);
              }),
              window.addEventListener(
                "resize",
                (0, f.default)(O, j.debounceDelay, !0)
              ),
              window.addEventListener(
                "orientationchange",
                (0, f.default)(O, j.debounceDelay, !0)
              ),
              window.addEventListener(
                "scroll",
                (0, u.default)(function () {
                  (0, b.default)(w, j.once);
                }, j.throttleDelay)
              ),
              j.disableMutationObserver || (0, d.default)("[data-aos]", _),
              w)
          );
        };
      e.exports = {
        init: A,
        refresh: O,
        refreshHard: _
      };
    },
    function (e, t) {}, , , , ,
    function (e, t) {
      (function (t) {
        "use strict";

        function n(e, t, n) {
          function o(t) {
            var n = b,
              o = v;
            return (b = v = void 0), (k = t), (g = e.apply(o, n));
          }

          function r(e) {
            return (k = e), (h = setTimeout(s, t)), _ ? o(e) : g;
          }

          function a(e) {
            var n = e - w,
              o = e - k,
              i = t - n;
            return S ? j(i, y - o) : i;
          }

          function c(e) {
            var n = e - w,
              o = e - k;
            return void 0 === w || n >= t || n < 0 || (S && o >= y);
          }

          function s() {
            var e = O();
            return c(e) ? d(e) : void(h = setTimeout(s, a(e)));
          }

          function d(e) {
            return (h = void 0), z && b ? o(e) : ((b = v = void 0), g);
          }

          function l() {
            void 0 !== h && clearTimeout(h), (k = 0), (b = w = v = h = void 0);
          }

          function p() {
            return void 0 === h ? g : d(O());
          }

          function m() {
            var e = O(),
              n = c(e);
            if (((b = arguments), (v = this), (w = e), n)) {
              if (void 0 === h) return r(w);
              if (S) return (h = setTimeout(s, t)), o(w);
            }
            return void 0 === h && (h = setTimeout(s, t)), g;
          }
          var b,
            v,
            y,
            g,
            h,
            w,
            k = 0,
            _ = !1,
            S = !1,
            z = !0;
          if ("function" != typeof e) throw new TypeError(f);
          return (
            (t = u(t) || 0),
            i(n) &&
            ((_ = !!n.leading),
              (S = "maxWait" in n),
              (y = S ? x(u(n.maxWait) || 0, t) : y),
              (z = "trailing" in n ? !!n.trailing : z)),
            (m.cancel = l),
            (m.flush = p),
            m
          );
        }

        function o(e, t, o) {
          var r = !0,
            a = !0;
          if ("function" != typeof e) throw new TypeError(f);
          return (
            i(o) &&
            ((r = "leading" in o ? !!o.leading : r),
              (a = "trailing" in o ? !!o.trailing : a)),
            n(e, t, {
              leading: r,
              maxWait: t,
              trailing: a
            })
          );
        }

        function i(e) {
          var t = "undefined" == typeof e ? "undefined" : c(e);
          return !!e && ("object" == t || "function" == t);
        }

        function r(e) {
          return (
            !!e && "object" == ("undefined" == typeof e ? "undefined" : c(e))
          );
        }

        function a(e) {
          return (
            "symbol" == ("undefined" == typeof e ? "undefined" : c(e)) ||
            (r(e) && k.call(e) == d)
          );
        }

        function u(e) {
          if ("number" == typeof e) return e;
          if (a(e)) return s;
          if (i(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = i(t) ? t + "" : t;
          }
          if ("string" != typeof e) return 0 === e ? e : +e;
          e = e.replace(l, "");
          var n = m.test(e);
          return n || b.test(e) ? v(e.slice(2), n ? 2 : 8) : p.test(e) ? s : +e;
        }
        var c =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
          function (e) {
            return typeof e;
          } :
          function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype ?
              "symbol" :
              typeof e;
          },
          f = "Expected a function",
          s = NaN,
          d = "[object Symbol]",
          l = /^\s+|\s+$/g,
          p = /^[-+]0x[0-9a-f]+$/i,
          m = /^0b[01]+$/i,
          b = /^0o[0-7]+$/i,
          v = parseInt,
          y =
          "object" == ("undefined" == typeof t ? "undefined" : c(t)) &&
          t &&
          t.Object === Object &&
          t,
          g =
          "object" == ("undefined" == typeof self ? "undefined" : c(self)) &&
          self &&
          self.Object === Object &&
          self,
          h = y || g || Function("return this")(),
          w = Object.prototype,
          k = w.toString,
          x = Math.max,
          j = Math.min,
          O = function () {
            return h.Date.now();
          };
        e.exports = o;
      }.call(
        t,
        (function () {
          return this;
        })()
      ));
    },
    function (e, t) {
      (function (t) {
        "use strict";

        function n(e, t, n) {
          function i(t) {
            var n = b,
              o = v;
            return (b = v = void 0), (O = t), (g = e.apply(o, n));
          }

          function r(e) {
            return (O = e), (h = setTimeout(s, t)), _ ? i(e) : g;
          }

          function u(e) {
            var n = e - w,
              o = e - O,
              i = t - n;
            return S ? x(i, y - o) : i;
          }

          function f(e) {
            var n = e - w,
              o = e - O;
            return void 0 === w || n >= t || n < 0 || (S && o >= y);
          }

          function s() {
            var e = j();
            return f(e) ? d(e) : void(h = setTimeout(s, u(e)));
          }

          function d(e) {
            return (h = void 0), z && b ? i(e) : ((b = v = void 0), g);
          }

          function l() {
            void 0 !== h && clearTimeout(h), (O = 0), (b = w = v = h = void 0);
          }

          function p() {
            return void 0 === h ? g : d(j());
          }

          function m() {
            var e = j(),
              n = f(e);
            if (((b = arguments), (v = this), (w = e), n)) {
              if (void 0 === h) return r(w);
              if (S) return (h = setTimeout(s, t)), i(w);
            }
            return void 0 === h && (h = setTimeout(s, t)), g;
          }
          var b,
            v,
            y,
            g,
            h,
            w,
            O = 0,
            _ = !1,
            S = !1,
            z = !0;
          if ("function" != typeof e) throw new TypeError(c);
          return (
            (t = a(t) || 0),
            o(n) &&
            ((_ = !!n.leading),
              (S = "maxWait" in n),
              (y = S ? k(a(n.maxWait) || 0, t) : y),
              (z = "trailing" in n ? !!n.trailing : z)),
            (m.cancel = l),
            (m.flush = p),
            m
          );
        }

        function o(e) {
          var t = "undefined" == typeof e ? "undefined" : u(e);
          return !!e && ("object" == t || "function" == t);
        }

        function i(e) {
          return (
            !!e && "object" == ("undefined" == typeof e ? "undefined" : u(e))
          );
        }

        function r(e) {
          return (
            "symbol" == ("undefined" == typeof e ? "undefined" : u(e)) ||
            (i(e) && w.call(e) == s)
          );
        }

        function a(e) {
          if ("number" == typeof e) return e;
          if (r(e)) return f;
          if (o(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = o(t) ? t + "" : t;
          }
          if ("string" != typeof e) return 0 === e ? e : +e;
          e = e.replace(d, "");
          var n = p.test(e);
          return n || m.test(e) ? b(e.slice(2), n ? 2 : 8) : l.test(e) ? f : +e;
        }
        var u =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
          function (e) {
            return typeof e;
          } :
          function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype ?
              "symbol" :
              typeof e;
          },
          c = "Expected a function",
          f = NaN,
          s = "[object Symbol]",
          d = /^\s+|\s+$/g,
          l = /^[-+]0x[0-9a-f]+$/i,
          p = /^0b[01]+$/i,
          m = /^0o[0-7]+$/i,
          b = parseInt,
          v =
          "object" == ("undefined" == typeof t ? "undefined" : u(t)) &&
          t &&
          t.Object === Object &&
          t,
          y =
          "object" == ("undefined" == typeof self ? "undefined" : u(self)) &&
          self &&
          self.Object === Object &&
          self,
          g = v || y || Function("return this")(),
          h = Object.prototype,
          w = h.toString,
          k = Math.max,
          x = Math.min,
          j = function () {
            return g.Date.now();
          };
        e.exports = n;
      }.call(
        t,
        (function () {
          return this;
        })()
      ));
    },
    function (e, t) {
      "use strict";

      function n(e, t) {
        var n = new r(o);
        (a = t),
        n.observe(i.documentElement, {
          childList: !0,
          subtree: !0,
          removedNodes: !0,
        });
      }

      function o(e) {
        e &&
          e.forEach(function (e) {
            var t = Array.prototype.slice.call(e.addedNodes),
              n = Array.prototype.slice.call(e.removedNodes),
              o = t.concat(n).filter(function (e) {
                return e.hasAttribute && e.hasAttribute("data-aos");
              }).length;
            o && a();
          });
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = window.document,
        r =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver,
        a = function () {};
      t.default = n;
    },
    function (e, t) {
      "use strict";

      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }

      function o() {
        return navigator.userAgent || navigator.vendor || window.opera || "";
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
          }
          return function (t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t;
          };
        })(),
        r =
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
        a =
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        u =
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
        c =
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        f = (function () {
          function e() {
            n(this, e);
          }
          return (
            i(e, [{
                key: "phone",
                value: function () {
                  var e = o();
                  return !(!r.test(e) && !a.test(e.substr(0, 4)));
                },
              },
              {
                key: "mobile",
                value: function () {
                  var e = o();
                  return !(!u.test(e) && !c.test(e.substr(0, 4)));
                },
              },
              {
                key: "tablet",
                value: function () {
                  return this.mobile() && !this.phone();
                },
              },
            ]),
            e
          );
        })();
      t.default = new f();
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var n = function (e, t, n) {
          var o = e.node.getAttribute("data-aos-once");
          t > e.position ?
            e.node.classList.add("aos-animate") :
            "undefined" != typeof o &&
            ("false" === o || (!n && "true" !== o)) &&
            e.node.classList.remove("aos-animate");
        },
        o = function (e, t) {
          var o = window.pageYOffset,
            i = window.innerHeight;
          e.forEach(function (e, r) {
            n(e, i + o, t);
          });
        };
      t.default = o;
    },
    function (e, t, n) {
      "use strict";

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        };
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = n(12),
        r = o(i),
        a = function (e, t) {
          return (
            e.forEach(function (e, n) {
              e.node.classList.add("aos-init"),
                (e.position = (0, r.default)(e.node, t.offset));
            }),
            e
          );
        };
      t.default = a;
    },
    function (e, t, n) {
      "use strict";

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        };
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = n(13),
        r = o(i),
        a = function (e, t) {
          var n = 0,
            o = 0,
            i = window.innerHeight,
            a = {
              offset: e.getAttribute("data-aos-offset"),
              anchor: e.getAttribute("data-aos-anchor"),
              anchorPlacement: e.getAttribute("data-aos-anchor-placement"),
            };
          switch (
            (a.offset && !isNaN(a.offset) && (o = parseInt(a.offset)),
              a.anchor &&
              document.querySelectorAll(a.anchor) &&
              (e = document.querySelectorAll(a.anchor)[0]),
              (n = (0, r.default)(e).top),
              a.anchorPlacement)
          ) {
            case "top-bottom":
              break;
            case "center-bottom":
              n += e.offsetHeight / 2;
              break;
            case "bottom-bottom":
              n += e.offsetHeight;
              break;
            case "top-center":
              n += i / 2;
              break;
            case "bottom-center":
              n += i / 2 + e.offsetHeight;
              break;
            case "center-center":
              n += i / 2 + e.offsetHeight / 2;
              break;
            case "top-top":
              n += i;
              break;
            case "bottom-top":
              n += e.offsetHeight + i;
              break;
            case "center-top":
              n += e.offsetHeight / 2 + i;
          }
          return a.anchorPlacement || a.offset || isNaN(t) || (o = t), n + o;
        };
      t.default = a;
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var n = function (e) {
        for (
          var t = 0, n = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);

        )
          (t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0)),
          (n += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0)),
          (e = e.offsetParent);
        return {
          top: n,
          left: t
        };
      };
      t.default = n;
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var n = function (e) {
        return (
          (e = e || document.querySelectorAll("[data-aos]")),
          Array.prototype.map.call(e, function (e) {
            return {
              node: e
            };
          })
        );
      };
      t.default = n;
    },
  ]);
});

/* End Data AOS plugin */

/* In View plugin */

!(function (a) {
  "function" == typeof define && define.amd ?
    define(["jquery"], a) :
    "object" == typeof exports ?
    (module.exports = a(require("jquery"))) :
    a(jQuery);
})(function (a) {
  function i() {
    var b,
      c,
      d = {
        height: f.innerHeight,
        width: f.innerWidth
      };
    return (
      d.height ||
      ((b = e.compatMode),
        (b || !a.support.boxModel) &&
        ((c = "CSS1Compat" === b ? g : e.body),
          (d = {
            height: c.clientHeight,
            width: c.clientWidth
          }))),
      d
    );
  }

  function j() {
    return {
      top: f.pageYOffset || g.scrollTop || e.body.scrollTop,
      left: f.pageXOffset || g.scrollLeft || e.body.scrollLeft,
    };
  }

  function k() {
    if (b.length) {
      var e = 0,
        f = a.map(b, function (a) {
          var b = a.data.selector,
            c = a.$element;
          return b ? c.find(b) : c;
        });
      for (c = c || i(), d = d || j(); e < b.length; e++)
        if (a.contains(g, f[e][0])) {
          var h = a(f[e]),
            k = {
              height: h[0].offsetHeight,
              width: h[0].offsetWidth
            },
            l = h.offset(),
            m = h.data("inview");
          if (!d || !c) return;
          l.top + k.height > d.top &&
            l.top < d.top + c.height &&
            l.left + k.width > d.left &&
            l.left < d.left + c.width ?
            m || h.data("inview", !0).trigger("inview", [!0]) :
            m && h.data("inview", !1).trigger("inview", [!1]);
        }
    }
  }
  var c,
    d,
    h,
    b = [],
    e = document,
    f = window,
    g = e.documentElement;
  (a.event.special.inview = {
    add: function (c) {
      b.push({
          data: c,
          $element: a(this),
          element: this
        }),
        !h && b.length && (h = setInterval(k, 250));
    },
    remove: function (a) {
      for (var c = 0; c < b.length; c++) {
        var d = b[c];
        if (d.element === this && d.data.guid === a.guid) {
          b.splice(c, 1);
          break;
        }
      }
      b.length || (clearInterval(h), (h = null));
    },
  }),
  a(f).on("scroll resize scrollstop", function () {
      c = d = null;
    }),
    !g.addEventListener &&
    g.attachEvent &&
    g.attachEvent("onfocusin", function () {
      d = null;
    });
});

/* End in view plugin */

/* International phone number dropdown plugin */
/*
 * International Telephone Input v17.0.0
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */

// wrap in UMD
(function (factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else window.intlTelInput = factory();
})(function (undefined) {
  "use strict";
  return (function () {
    // Array of country objects for the flag dropdown.
    // Here is the criteria for the plugin to support a given country/territory
    // - It has an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
    // - It has it's own country calling code (it is not a sub-region of another country): https://en.wikipedia.org/wiki/List_of_country_calling_codes
    // - It has a flag in the region-flags project: https://github.com/behdad/region-flags/tree/gh-pages/png
    // - It is supported by libphonenumber (it must be listed on this page): https://github.com/googlei18n/libphonenumber/blob/master/resources/ShortNumberMetadata.xml
    // Each country array has the following information:
    // [
    //    Country name,
    //    iso2 code,
    //    International dial code,
    //    Order (if >1 country with same dial code),
    //    Area codes
    // ]
    var allCountries = [
      ["Afghanistan (‫افغانستان‬‎)", "af", "93"],
      ["Albania (Shqipëri)", "al", "355"],
      ["Algeria (‫الجزائر‬‎)", "dz", "213"],
      ["American Samoa", "as", "1", 5, ["684"]],
      ["Andorra", "ad", "376"],
      ["Angola", "ao", "244"],
      ["Anguilla", "ai", "1", 6, ["264"]],
      ["Antigua and Barbuda", "ag", "1", 7, ["268"]],
      ["Argentina", "ar", "54"],
      ["Armenia (Հայաստան)", "am", "374"],
      ["Aruba", "aw", "297"],
      ["Australia", "au", "61", 0],
      ["Austria (Österreich)", "at", "43"],
      ["Azerbaijan (Azərbaycan)", "az", "994"],
      ["Bahamas", "bs", "1", 8, ["242"]],
      ["Bahrain (‫البحرين‬‎)", "bh", "973"],
      ["Bangladesh (বাংলাদেশ)", "bd", "880"],
      ["Barbados", "bb", "1", 9, ["246"]],
      ["Belarus (Беларусь)", "by", "375"],
      ["Belgium (België)", "be", "32"],
      ["Belize", "bz", "501"],
      ["Benin (Bénin)", "bj", "229"],
      ["Bermuda", "bm", "1", 10, ["441"]],
      ["Bhutan (འབྲུག)", "bt", "975"],
      ["Bolivia", "bo", "591"],
      ["Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387"],
      ["Botswana", "bw", "267"],
      ["Brazil (Brasil)", "br", "55"],
      ["British Indian Ocean Territory", "io", "246"],
      ["British Virgin Islands", "vg", "1", 11, ["284"]],
      ["Brunei", "bn", "673"],
      ["Bulgaria (България)", "bg", "359"],
      ["Burkina Faso", "bf", "226"],
      ["Burundi (Uburundi)", "bi", "257"],
      ["Cambodia (កម្ពុជា)", "kh", "855"],
      ["Cameroon (Cameroun)", "cm", "237"],
      [
        "Canada",
        "ca",
        "1",
        1,
        [
          "204",
          "226",
          "236",
          "249",
          "250",
          "289",
          "306",
          "343",
          "365",
          "387",
          "403",
          "416",
          "418",
          "431",
          "437",
          "438",
          "450",
          "506",
          "514",
          "519",
          "548",
          "579",
          "581",
          "587",
          "604",
          "613",
          "639",
          "647",
          "672",
          "705",
          "709",
          "742",
          "778",
          "780",
          "782",
          "807",
          "819",
          "825",
          "867",
          "873",
          "902",
          "905",
        ],
      ],
      ["Cape Verde (Kabu Verdi)", "cv", "238"],
      ["Caribbean Netherlands", "bq", "599", 1, ["3", "4", "7"]],
      ["Cayman Islands", "ky", "1", 12, ["345"]],
      ["Central African Republic (République centrafricaine)", "cf", "236"],
      ["Chad (Tchad)", "td", "235"],
      ["Chile", "cl", "56"],
      ["China (中国)", "cn", "86"],
      ["Christmas Island", "cx", "61", 2],
      ["Cocos (Keeling) Islands", "cc", "61", 1],
      ["Colombia", "co", "57"],
      ["Comoros (‫جزر القمر‬‎)", "km", "269"],
      ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243"],
      ["Congo (Republic) (Congo-Brazzaville)", "cg", "242"],
      ["Cook Islands", "ck", "682"],
      ["Costa Rica", "cr", "506"],
      ["Côte d’Ivoire", "ci", "225"],
      ["Croatia (Hrvatska)", "hr", "385"],
      ["Cuba", "cu", "53"],
      ["Curaçao", "cw", "599", 0],
      ["Cyprus (Κύπρος)", "cy", "357"],
      ["Czech Republic (Česká republika)", "cz", "420"],
      ["Denmark (Danmark)", "dk", "45"],
      ["Djibouti", "dj", "253"],
      ["Dominica", "dm", "1", 13, ["767"]],
      [
        "Dominican Republic (República Dominicana)",
        "do",
        "1",
        2,
        ["809", "829", "849"],
      ],
      ["Ecuador", "ec", "593"],
      ["Egypt (‫مصر‬‎)", "eg", "20"],
      ["El Salvador", "sv", "503"],
      ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240"],
      ["Eritrea", "er", "291"],
      ["Estonia (Eesti)", "ee", "372"],
      ["Ethiopia", "et", "251"],
      ["Falkland Islands (Islas Malvinas)", "fk", "500"],
      ["Faroe Islands (Føroyar)", "fo", "298"],
      ["Fiji", "fj", "679"],
      ["Finland (Suomi)", "fi", "358", 0],
      ["France", "fr", "33"],
      ["French Guiana (Guyane française)", "gf", "594"],
      ["French Polynesia (Polynésie française)", "pf", "689"],
      ["Gabon", "ga", "241"],
      ["Gambia", "gm", "220"],
      ["Georgia (საქართველო)", "ge", "995"],
      ["Germany (Deutschland)", "de", "49"],
      ["Ghana (Gaana)", "gh", "233"],
      ["Gibraltar", "gi", "350"],
      ["Greece (Ελλάδα)", "gr", "30"],
      ["Greenland (Kalaallit Nunaat)", "gl", "299"],
      ["Grenada", "gd", "1", 14, ["473"]],
      ["Guadeloupe", "gp", "590", 0],
      ["Guam", "gu", "1", 15, ["671"]],
      ["Guatemala", "gt", "502"],
      ["Guernsey", "gg", "44", 1, ["1481", "7781", "7839", "7911"]],
      ["Guinea (Guinée)", "gn", "224"],
      ["Guinea-Bissau (Guiné Bissau)", "gw", "245"],
      ["Guyana", "gy", "592"],
      ["Haiti", "ht", "509"],
      ["Honduras", "hn", "504"],
      ["Hong Kong (香港)", "hk", "852"],
      ["Hungary (Magyarország)", "hu", "36"],
      ["Iceland (Ísland)", "is", "354"],
      ["India (भारत)", "in", "91"],
      ["Indonesia", "id", "62"],
      ["Iran (‫ایران‬‎)", "ir", "98"],
      ["Iraq (‫العراق‬‎)", "iq", "964"],
      ["Ireland", "ie", "353"],
      ["Isle of Man", "im", "44", 2, ["1624", "74576", "7524", "7924", "7624"]],
      ["Israel (‫ישראל‬‎)", "il", "972"],
      ["Italy (Italia)", "it", "39", 0],
      ["Jamaica", "jm", "1", 4, ["876", "658"]],
      ["Japan (日本)", "jp", "81"],
      [
        "Jersey",
        "je",
        "44",
        3,
        ["1534", "7509", "7700", "7797", "7829", "7937"],
      ],
      ["Jordan (‫الأردن‬‎)", "jo", "962"],
      ["Kazakhstan (Казахстан)", "kz", "7", 1, ["33", "7"]],
      ["Kenya", "ke", "254"],
      ["Kiribati", "ki", "686"],
      ["Kosovo", "xk", "383"],
      ["Kuwait (‫الكويت‬‎)", "kw", "965"],
      ["Kyrgyzstan (Кыргызстан)", "kg", "996"],
      ["Laos (ລາວ)", "la", "856"],
      ["Latvia (Latvija)", "lv", "371"],
      ["Lebanon (‫لبنان‬‎)", "lb", "961"],
      ["Lesotho", "ls", "266"],
      ["Liberia", "lr", "231"],
      ["Libya (‫ليبيا‬‎)", "ly", "218"],
      ["Liechtenstein", "li", "423"],
      ["Lithuania (Lietuva)", "lt", "370"],
      ["Luxembourg", "lu", "352"],
      ["Macau (澳門)", "mo", "853"],
      ["Macedonia (FYROM) (Македонија)", "mk", "389"],
      ["Madagascar (Madagasikara)", "mg", "261"],
      ["Malawi", "mw", "265"],
      ["Malaysia", "my", "60"],
      ["Maldives", "mv", "960"],
      ["Mali", "ml", "223"],
      ["Malta", "mt", "356"],
      ["Marshall Islands", "mh", "692"],
      ["Martinique", "mq", "596"],
      ["Mauritania (‫موريتانيا‬‎)", "mr", "222"],
      ["Mauritius (Moris)", "mu", "230"],
      ["Mayotte", "yt", "262", 1, ["269", "639"]],
      ["Mexico (México)", "mx", "52"],
      ["Micronesia", "fm", "691"],
      ["Moldova (Republica Moldova)", "md", "373"],
      ["Monaco", "mc", "377"],
      ["Mongolia (Монгол)", "mn", "976"],
      ["Montenegro (Crna Gora)", "me", "382"],
      ["Montserrat", "ms", "1", 16, ["664"]],
      ["Morocco (‫المغرب‬‎)", "ma", "212", 0],
      ["Mozambique (Moçambique)", "mz", "258"],
      ["Myanmar (Burma) (မြန်မာ)", "mm", "95"],
      ["Namibia (Namibië)", "na", "264"],
      ["Nauru", "nr", "674"],
      ["Nepal (नेपाल)", "np", "977"],
      ["Netherlands (Nederland)", "nl", "31"],
      ["New Caledonia (Nouvelle-Calédonie)", "nc", "687"],
      ["New Zealand", "nz", "64"],
      ["Nicaragua", "ni", "505"],
      ["Niger (Nijar)", "ne", "227"],
      ["Nigeria", "ng", "234"],
      ["Niue", "nu", "683"],
      ["Norfolk Island", "nf", "672"],
      ["North Korea (조선 민주주의 인민 공화국)", "kp", "850"],
      ["Northern Mariana Islands", "mp", "1", 17, ["670"]],
      ["Norway (Norge)", "no", "47", 0],
      ["Oman (‫عُمان‬‎)", "om", "968"],
      ["Pakistan (‫پاکستان‬‎)", "pk", "92"],
      ["Palau", "pw", "680"],
      ["Palestine (‫فلسطين‬‎)", "ps", "970"],
      ["Panama (Panamá)", "pa", "507"],
      ["Papua New Guinea", "pg", "675"],
      ["Paraguay", "py", "595"],
      ["Peru (Perú)", "pe", "51"],
      ["Philippines", "ph", "63"],
      ["Poland (Polska)", "pl", "48"],
      ["Portugal", "pt", "351"],
      ["Puerto Rico", "pr", "1", 3, ["787", "939"]],
      ["Qatar (‫قطر‬‎)", "qa", "974"],
      ["Réunion (La Réunion)", "re", "262", 0],
      ["Romania (România)", "ro", "40"],
      ["Russia (Россия)", "ru", "7", 0],
      ["Rwanda", "rw", "250"],
      ["Saint Barthélemy", "bl", "590", 1],
      ["Saint Helena", "sh", "290"],
      ["Saint Kitts and Nevis", "kn", "1", 18, ["869"]],
      ["Saint Lucia", "lc", "1", 19, ["758"]],
      ["Saint Martin (Saint-Martin (partie française))", "mf", "590", 2],
      ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508"],
      ["Saint Vincent and the Grenadines", "vc", "1", 20, ["784"]],
      ["Samoa", "ws", "685"],
      ["San Marino", "sm", "378"],
      ["São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239"],
      ["Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966"],
      ["Senegal (Sénégal)", "sn", "221"],
      ["Serbia (Србија)", "rs", "381"],
      ["Seychelles", "sc", "248"],
      ["Sierra Leone", "sl", "232"],
      ["Singapore", "sg", "65"],
      ["Sint Maarten", "sx", "1", 21, ["721"]],
      ["Slovakia (Slovensko)", "sk", "421"],
      ["Slovenia (Slovenija)", "si", "386"],
      ["Solomon Islands", "sb", "677"],
      ["Somalia (Soomaaliya)", "so", "252"],
      ["South Africa", "za", "27"],
      ["South Korea (대한민국)", "kr", "82"],
      ["South Sudan (‫جنوب السودان‬‎)", "ss", "211"],
      ["Spain (España)", "es", "34"],
      ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94"],
      ["Sudan (‫السودان‬‎)", "sd", "249"],
      ["Suriname", "sr", "597"],
      ["Svalbard and Jan Mayen", "sj", "47", 1, ["79"]],
      ["Swaziland", "sz", "268"],
      ["Sweden (Sverige)", "se", "46"],
      ["Switzerland (Schweiz)", "ch", "41"],
      ["Syria (‫سوريا‬‎)", "sy", "963"],
      ["Taiwan (台灣)", "tw", "886"],
      ["Tajikistan", "tj", "992"],
      ["Tanzania", "tz", "255"],
      ["Thailand (ไทย)", "th", "66"],
      ["Timor-Leste", "tl", "670"],
      ["Togo", "tg", "228"],
      ["Tokelau", "tk", "690"],
      ["Tonga", "to", "676"],
      ["Trinidad and Tobago", "tt", "1", 22, ["868"]],
      ["Tunisia (‫تونس‬‎)", "tn", "216"],
      ["Turkey (Türkiye)", "tr", "90"],
      ["Turkmenistan", "tm", "993"],
      ["Turks and Caicos Islands", "tc", "1", 23, ["649"]],
      ["Tuvalu", "tv", "688"],
      ["U.S. Virgin Islands", "vi", "1", 24, ["340"]],
      ["Uganda", "ug", "256"],
      ["Ukraine (Україна)", "ua", "380"],
      ["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971"],
      ["United Kingdom", "gb", "44", 0],
      ["United States", "us", "1", 0],
      ["Uruguay", "uy", "598"],
      ["Uzbekistan (Oʻzbekiston)", "uz", "998"],
      ["Vanuatu", "vu", "678"],
      ["Vatican City (Città del Vaticano)", "va", "39", 1, ["06698"]],
      ["Venezuela", "ve", "58"],
      ["Vietnam (Việt Nam)", "vn", "84"],
      ["Wallis and Futuna (Wallis-et-Futuna)", "wf", "681"],
      ["Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1, ["5288", "5289"]],
      ["Yemen (‫اليمن‬‎)", "ye", "967"],
      ["Zambia", "zm", "260"],
      ["Zimbabwe", "zw", "263"],
      ["Åland Islands", "ax", "358", 1, ["18"]],
    ];
    // loop over all of the countries above, restructuring the data to be objects with named keys
    for (var i = 0; i < allCountries.length; i++) {
      var c = allCountries[i];
      allCountries[i] = {
        name: c[0],
        iso2: c[1],
        dialCode: c[2],
        priority: c[3] || 0,
        areaCodes: c[4] || null,
      };
    }
    ("use strict");

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var intlTelInputGlobals = {
      getInstance: function getInstance(input) {
        var id = input.getAttribute("data-intl-tel-input-id");
        return window.intlTelInputGlobals.instances[id];
      },
      instances: {},
    };
    if (typeof window === "object")
      window.intlTelInputGlobals = intlTelInputGlobals;
    // these vars persist through all instances of the plugin
    var id = 0;
    var defaults = {
      // whether or not to allow the dropdown
      allowDropdown: true,
      // if there is just a dial code in the input: remove it on blur
      autoHideDialCode: true,
      // add a placeholder in the input with an example number for the selected country
      autoPlaceholder: "polite",
      // modify the parentClass
      customContainer: "",
      // modify the auto placeholder
      customPlaceholder: null,
      // append menu to specified element
      dropdownContainer: null,
      // don't display these countries
      excludeCountries: [],
      // format the input value during initialisation and on setNumber
      formatOnDisplay: true,
      // geoIp lookup function
      geoIpLookup: null,
      // inject a hidden input with this name, and on submit, populate it with the result of getNumber
      hiddenInput: "",
      // initial country
      initialCountry: "",
      // localized country names e.g. { 'de': 'Deutschland' }
      localizedCountries: null,
      // don't insert international dial codes
      nationalMode: true,
      // display only these countries
      onlyCountries: [],
      // number type to use for placeholders
      placeholderNumberType: "MOBILE",
      // the countries at the top of the list. defaults to united states and united kingdom
      preferredCountries: ["us", "gb"],
      // display the country dial code next to the selected flag so it's not part of the typed number
      separateDialCode: false,
      // specify the path to the libphonenumber script to enable validation/formatting
      utilsScript: "",
    };
    // https://en.wikipedia.org/wiki/List_of_North_American_Numbering_Plan_area_codes#Non-geographic_area_codes
    var regionlessNanpNumbers = [
      "800",
      "822",
      "833",
      "844",
      "855",
      "866",
      "877",
      "880",
      "881",
      "882",
      "883",
      "884",
      "885",
      "886",
      "887",
      "888",
      "889",
    ];
    if (typeof window === "object") {
      // keep track of if the window.load event has fired as impossible to check after the fact
      window.addEventListener("load", function () {
        // UPDATE: use a public static field so we can fudge it in the tests
        window.intlTelInputGlobals.windowLoaded = true;
      });
    }
    // utility function to iterate over an object. can't use Object.entries or native forEach because
    // of IE11
    var forEachProp = function forEachProp(obj, callback) {
      var keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
        callback(keys[i], obj[keys[i]]);
      }
    };
    // run a method on each instance of the plugin
    var forEachInstance = function forEachInstance(method) {
      forEachProp(window.intlTelInputGlobals.instances, function (key) {
        window.intlTelInputGlobals.instances[key][method]();
      });
    };
    // this is our plugin class that we will create an instance of
    // eslint-disable-next-line no-unused-vars
    var Iti =
      /*#__PURE__*/
      (function () {
        function Iti(input, options) {
          var _this = this;
          _classCallCheck(this, Iti);
          this.id = id++;
          this.telInput = input;
          this.activeItem = null;
          this.highlightedItem = null;
          // process specified options / defaults
          // alternative to Object.assign, which isn't supported by IE11
          var customOptions = options || {};
          this.options = {};
          forEachProp(defaults, function (key, value) {
            _this.options[key] = customOptions.hasOwnProperty(key) ?
              customOptions[key] :
              value;
          });
          this.hadInitialPlaceholder = Boolean(
            input.getAttribute("placeholder")
          );
        }
        _createClass(Iti, [{
            key: "_init",
            value: function _init() {
              var _this2 = this;
              // if in nationalMode, disable options relating to dial codes
              if (this.options.nationalMode)
                this.options.autoHideDialCode = false;
              // if separateDialCode then doesn't make sense to A) insert dial code into input
              // (autoHideDialCode), and B) display national numbers (because we're displaying the country
              // dial code next to them)
              if (this.options.separateDialCode) {
                this.options.autoHideDialCode =
                  this.options.nationalMode = false;
              }
              // we cannot just test screen size as some smartphones/website meta tags will report desktop
              // resolutions
              // Note: for some reason jasmine breaks if you put this in the main Plugin function with the
              // rest of these declarations
              // Note: to target Android Mobiles (and not Tablets), we must find 'Android' and 'Mobile'
              this.isMobile =
                /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                  navigator.userAgent
                );
              if (this.isMobile) {
                // trigger the mobile dropdown css
                document.body.classList.add("iti-mobile");
                // on mobile, we want a full screen dropdown, so we must append it to the body
                if (!this.options.dropdownContainer)
                  this.options.dropdownContainer = document.body;
              }
              // these promises get resolved when their individual requests complete
              // this way the dev can do something like iti.promise.then(...) to know when all requests are
              // complete
              if (typeof Promise !== "undefined") {
                var autoCountryPromise = new Promise(function (
                  resolve,
                  reject
                ) {
                  _this2.resolveAutoCountryPromise = resolve;
                  _this2.rejectAutoCountryPromise = reject;
                });
                var utilsScriptPromise = new Promise(function (
                  resolve,
                  reject
                ) {
                  _this2.resolveUtilsScriptPromise = resolve;
                  _this2.rejectUtilsScriptPromise = reject;
                });
                this.promise = Promise.all([
                  autoCountryPromise,
                  utilsScriptPromise,
                ]);
              } else {
                // prevent errors when Promise doesn't exist
                this.resolveAutoCountryPromise = this.rejectAutoCountryPromise =
                  function () {};
                this.resolveUtilsScriptPromise = this.rejectUtilsScriptPromise =
                  function () {};
              }
              // in various situations there could be no country selected initially, but we need to be able
              // to assume this variable exists
              this.selectedCountryData = {};
              // process all the data: onlyCountries, excludeCountries, preferredCountries etc
              this._processCountryData();
              // generate the markup
              this._generateMarkup();
              // set the initial state of the input value and the selected flag
              this._setInitialState();
              // start all of the event listeners: autoHideDialCode, input keydown, selectedFlag click
              this._initListeners();
              // utils script, and auto country
              this._initRequests();
            },
          },
          {
            key: "_processCountryData",
            value: function _processCountryData() {
              // process onlyCountries or excludeCountries array if present
              this._processAllCountries();
              // process the countryCodes map
              this._processCountryCodes();
              // process the preferredCountries
              this._processPreferredCountries();
              // translate countries according to localizedCountries option
              if (this.options.localizedCountries)
                this._translateCountriesByLocale();
              // sort countries by name
              if (
                this.options.onlyCountries.length ||
                this.options.localizedCountries
              ) {
                this.countries.sort(this._countryNameSort);
              }
            },
          },
          {
            key: "_addCountryCode",
            value: function _addCountryCode(iso2, dialCode, priority) {
              if (dialCode.length > this.dialCodeMaxLen) {
                this.dialCodeMaxLen = dialCode.length;
              }
              if (!this.countryCodes.hasOwnProperty(dialCode)) {
                this.countryCodes[dialCode] = [];
              }
              // bail if we already have this country for this dialCode
              for (var i = 0; i < this.countryCodes[dialCode].length; i++) {
                if (this.countryCodes[dialCode][i] === iso2) return;
              }
              // check for undefined as 0 is falsy
              var index =
                priority !== undefined ?
                priority :
                this.countryCodes[dialCode].length;
              this.countryCodes[dialCode][index] = iso2;
            },
          },
          {
            key: "_processAllCountries",
            value: function _processAllCountries() {
              if (this.options.onlyCountries.length) {
                var lowerCaseOnlyCountries = this.options.onlyCountries.map(
                  function (country) {
                    return country.toLowerCase();
                  }
                );
                this.countries = allCountries.filter(function (country) {
                  return lowerCaseOnlyCountries.indexOf(country.iso2) > -1;
                });
              } else if (this.options.excludeCountries.length) {
                var lowerCaseExcludeCountries =
                  this.options.excludeCountries.map(function (country) {
                    return country.toLowerCase();
                  });
                this.countries = allCountries.filter(function (country) {
                  return lowerCaseExcludeCountries.indexOf(country.iso2) === -1;
                });
              } else {
                this.countries = allCountries;
              }
            },
          },
          {
            key: "_translateCountriesByLocale",
            value: function _translateCountriesByLocale() {
              for (var i = 0; i < this.countries.length; i++) {
                var iso = this.countries[i].iso2.toLowerCase();
                if (this.options.localizedCountries.hasOwnProperty(iso)) {
                  this.countries[i].name = this.options.localizedCountries[iso];
                }
              }
            },
          },
          {
            key: "_countryNameSort",
            value: function _countryNameSort(a, b) {
              return a.name.localeCompare(b.name);
            },
          },
          {
            key: "_processCountryCodes",
            value: function _processCountryCodes() {
              this.dialCodeMaxLen = 0;
              this.countryCodes = {};
              // first: add dial codes
              for (var i = 0; i < this.countries.length; i++) {
                var c = this.countries[i];
                this._addCountryCode(c.iso2, c.dialCode, c.priority);
              }
              // next: add area codes
              // this is a second loop over countries, to make sure we have all of the "root" countries
              // already in the map, so that we can access them, as each time we add an area code substring
              // to the map, we also need to include the "root" country's code, as that also matches
              for (var _i = 0; _i < this.countries.length; _i++) {
                var _c = this.countries[_i];
                // area codes
                if (_c.areaCodes) {
                  var rootCountryCode = this.countryCodes[_c.dialCode][0];
                  // for each area code
                  for (var j = 0; j < _c.areaCodes.length; j++) {
                    var areaCode = _c.areaCodes[j];
                    // for each digit in the area code to add all partial matches as well
                    for (var k = 1; k < areaCode.length; k++) {
                      var partialDialCode = _c.dialCode + areaCode.substr(0, k);
                      // start with the root country, as that also matches this dial code
                      this._addCountryCode(rootCountryCode, partialDialCode);
                      this._addCountryCode(_c.iso2, partialDialCode);
                    }
                    // add the full area code
                    this._addCountryCode(_c.iso2, _c.dialCode + areaCode);
                  }
                }
              }
            },
          },
          {
            key: "_processPreferredCountries",
            value: function _processPreferredCountries() {
              this.preferredCountries = [];
              for (var i = 0; i < this.options.preferredCountries.length; i++) {
                var countryCode =
                  this.options.preferredCountries[i].toLowerCase();
                var countryData = this._getCountryData(
                  countryCode,
                  false,
                  true
                );
                if (countryData) this.preferredCountries.push(countryData);
              }
            },
          },
          {
            key: "_createEl",
            value: function _createEl(name, attrs, container) {
              var el = document.createElement(name);
              if (attrs)
                forEachProp(attrs, function (key, value) {
                  return el.setAttribute(key, value);
                });
              if (container) container.appendChild(el);
              return el;
            },
          },
          {
            key: "_generateMarkup",
            value: function _generateMarkup() {
              // if autocomplete does not exist on the element and its form, then
              // prevent autocomplete as there's no safe, cross-browser event we can react to, so it can
              // easily put the plugin in an inconsistent state e.g. the wrong flag selected for the
              // autocompleted number, which on submit could mean wrong number is saved (esp in nationalMode)
              if (
                !this.telInput.hasAttribute("autocomplete") &&
                !(
                  this.telInput.form &&
                  this.telInput.form.hasAttribute("autocomplete")
                )
              ) {
                this.telInput.setAttribute("autocomplete", "off");
              }
              // containers (mostly for positioning)
              var parentClass = "iti";
              if (this.options.allowDropdown)
                parentClass += " iti--allow-dropdown";
              if (this.options.separateDialCode)
                parentClass += " iti--separate-dial-code";
              if (this.options.customContainer) {
                parentClass += " ";
                parentClass += this.options.customContainer;
              }
              var wrapper = this._createEl("div", {
                class: parentClass,
              });
              this.telInput.parentNode.insertBefore(wrapper, this.telInput);
              this.flagsContainer = this._createEl(
                "div", {
                  class: "iti__flag-container",
                },
                wrapper
              );
              wrapper.appendChild(this.telInput);
              // selected flag (displayed to left of input)
              this.selectedFlag = this._createEl(
                "div", {
                  class: "iti__selected-flag",
                  role: "combobox",
                  "aria-owns": "iti-".concat(this.id, "__country-listbox"),
                  "aria-expanded": "false",
                },
                this.flagsContainer
              );
              this.selectedFlagInner = this._createEl(
                "div", {
                  class: "iti__flag",
                },
                this.selectedFlag
              );
              if (this.options.separateDialCode) {
                this.selectedDialCode = this._createEl(
                  "div", {
                    class: "iti__selected-dial-code",
                  },
                  this.selectedFlag
                );
              }
              if (this.options.allowDropdown) {
                // make element focusable and tab navigable
                this.selectedFlag.setAttribute("tabindex", "0");
                this.dropdownArrow = this._createEl(
                  "div", {
                    class: "iti__arrow",
                  },
                  this.selectedFlag
                );
                // country dropdown: preferred countries, then divider, then all countries
                this.countryList = this._createEl("ul", {
                  class: "iti__country-list iti__hide",
                  id: "iti-".concat(this.id, "__country-listbox"),
                  role: "listbox",
                });
                if (this.preferredCountries.length) {
                  this._appendListItems(
                    this.preferredCountries,
                    "iti__preferred",
                    true
                  );
                  this._createEl(
                    "li", {
                      class: "iti__divider",
                      role: "separator",
                      "aria-disabled": "true",
                    },
                    this.countryList
                  );
                }
                this._appendListItems(this.countries, "iti__standard");
                // create dropdownContainer markup
                if (this.options.dropdownContainer) {
                  this.dropdown = this._createEl("div", {
                    class: "iti iti--container",
                  });
                  this.dropdown.appendChild(this.countryList);
                } else {
                  this.flagsContainer.appendChild(this.countryList);
                }
              }
              if (this.options.hiddenInput) {
                var hiddenInputName = this.options.hiddenInput;
                var name = this.telInput.getAttribute("name");
                if (name) {
                  var i = name.lastIndexOf("[");
                  // if input name contains square brackets, then give the hidden input the same name,
                  // replacing the contents of the last set of brackets with the given hiddenInput name
                  if (i !== -1)
                    hiddenInputName = ""
                    .concat(name.substr(0, i), "[")
                    .concat(hiddenInputName, "]");
                }
                this.hiddenInput = this._createEl("input", {
                  type: "hidden",
                  name: hiddenInputName,
                });
                wrapper.appendChild(this.hiddenInput);
              }
            },
          },
          {
            key: "_appendListItems",
            value: function _appendListItems(countries, className, preferred) {
              // we create so many DOM elements, it is faster to build a temp string
              // and then add everything to the DOM in one go at the end
              var tmp = "";
              // for each country
              for (var i = 0; i < countries.length; i++) {
                var c = countries[i];
                var idSuffix = preferred ? "-preferred" : "";
                // open the list item
                tmp += "<li class='iti__country "
                  .concat(className, "' tabIndex='-1' id='iti-")
                  .concat(this.id, "__item-")
                  .concat(c.iso2)
                  .concat(idSuffix, "' role='option' data-dial-code='")
                  .concat(c.dialCode, "' data-country-code='")
                  .concat(c.iso2, "'>");
                // add the flag
                tmp +=
                  "<div class='iti__flag-box'><div class='iti__flag iti__".concat(
                    c.iso2,
                    "'></div></div>"
                  );
                // and the country name and dial code
                tmp += "<span class='iti__country-name'>".concat(
                  c.name,
                  "</span>"
                );
                tmp += "<span class='iti__dial-code'>+".concat(
                  c.dialCode,
                  "</span>"
                );
                // close the list item
                tmp += "</li>";
              }
              this.countryList.insertAdjacentHTML("beforeend", tmp);
            },
          },
          {
            key: "_setInitialState",
            value: function _setInitialState() {
              var val = this.telInput.value;
              var dialCode = this._getDialCode(val);
              var isRegionlessNanp = this._isRegionlessNanp(val);
              var _this$options = this.options,
                initialCountry = _this$options.initialCountry,
                nationalMode = _this$options.nationalMode,
                autoHideDialCode = _this$options.autoHideDialCode,
                separateDialCode = _this$options.separateDialCode;
              // if we already have a dial code, and it's not a regionlessNanp, we can go ahead and set the
              // flag, else fall back to the default country
              if (dialCode && !isRegionlessNanp) {
                this._updateFlagFromNumber(val);
              } else if (initialCountry !== "auto") {
                // see if we should select a flag
                if (initialCountry) {
                  this._setFlag(initialCountry.toLowerCase());
                } else {
                  if (dialCode && isRegionlessNanp) {
                    // has intl dial code, is regionless nanp, and no initialCountry, so default to US
                    this._setFlag("us");
                  } else {
                    // no dial code and no initialCountry, so default to first in list
                    this.defaultCountry = this.preferredCountries.length ?
                      this.preferredCountries[0].iso2 :
                      this.countries[0].iso2;
                    if (!val) {
                      this._setFlag(this.defaultCountry);
                    }
                  }
                }
                // if empty and no nationalMode and no autoHideDialCode then insert the default dial code
                if (
                  !val &&
                  !nationalMode &&
                  !autoHideDialCode &&
                  !separateDialCode
                ) {
                  this.telInput.value = "+".concat(
                    this.selectedCountryData.dialCode
                  );
                }
              }
              // NOTE: if initialCountry is set to auto, that will be handled separately
              // format - note this wont be run after _updateDialCode as that's only called if no val
              if (val) this._updateValFromNumber(val);
            },
          },
          {
            key: "_initListeners",
            value: function _initListeners() {
              this._initKeyListeners();
              if (this.options.autoHideDialCode) this._initBlurListeners();
              if (this.options.allowDropdown) this._initDropdownListeners();
              if (this.hiddenInput) this._initHiddenInputListener();
            },
          },
          {
            key: "_initHiddenInputListener",
            value: function _initHiddenInputListener() {
              var _this3 = this;
              this._handleHiddenInputSubmit = function () {
                _this3.hiddenInput.value = _this3.getNumber();
              };
              if (this.telInput.form)
                this.telInput.form.addEventListener(
                  "submit",
                  this._handleHiddenInputSubmit
                );
            },
          },
          {
            key: "_getClosestLabel",
            value: function _getClosestLabel() {
              var el = this.telInput;
              while (el && el.tagName !== "LABEL") {
                el = el.parentNode;
              }
              return el;
            },
          },
          {
            key: "_initDropdownListeners",
            value: function _initDropdownListeners() {
              var _this4 = this;
              // hack for input nested inside label (which is valid markup): clicking the selected-flag to
              // open the dropdown would then automatically trigger a 2nd click on the input which would
              // close it again
              this._handleLabelClick = function (e) {
                // if the dropdown is closed, then focus the input, else ignore the click
                if (_this4.countryList.classList.contains("iti__hide"))
                  _this4.telInput.focus();
                else e.preventDefault();
              };
              var label = this._getClosestLabel();
              if (label)
                label.addEventListener("click", this._handleLabelClick);
              // toggle country dropdown on click
              this._handleClickSelectedFlag = function () {
                // only intercept this event if we're opening the dropdown
                // else let it bubble up to the top ("click-off-to-close" listener)
                // we cannot just stopPropagation as it may be needed to close another instance
                if (
                  _this4.countryList.classList.contains("iti__hide") &&
                  !_this4.telInput.disabled &&
                  !_this4.telInput.readOnly
                ) {
                  _this4._showDropdown();
                }
              };
              this.selectedFlag.addEventListener(
                "click",
                this._handleClickSelectedFlag
              );
              // open dropdown list if currently focused
              this._handleFlagsContainerKeydown = function (e) {
                var isDropdownHidden =
                  _this4.countryList.classList.contains("iti__hide");
                if (
                  isDropdownHidden && ["ArrowUp", "Up", "ArrowDown", "Down", " ", "Enter"].indexOf(
                    e.key
                  ) !== -1
                ) {
                  // prevent form from being submitted if "ENTER" was pressed
                  e.preventDefault();
                  // prevent event from being handled again by document
                  e.stopPropagation();
                  _this4._showDropdown();
                }
                // allow navigation from dropdown to input on TAB
                if (e.key === "Tab") _this4._closeDropdown();
              };
              this.flagsContainer.addEventListener(
                "keydown",
                this._handleFlagsContainerKeydown
              );
            },
          },
          {
            key: "_initRequests",
            value: function _initRequests() {
              var _this5 = this;
              // if the user has specified the path to the utils script, fetch it on window.load, else resolve
              if (this.options.utilsScript && !window.intlTelInputUtils) {
                // if the plugin is being initialised after the window.load event has already been fired
                if (window.intlTelInputGlobals.windowLoaded) {
                  window.intlTelInputGlobals.loadUtils(
                    this.options.utilsScript
                  );
                } else {
                  // wait until the load event so we don't block any other requests e.g. the flags image
                  window.addEventListener("load", function () {
                    window.intlTelInputGlobals.loadUtils(
                      _this5.options.utilsScript
                    );
                  });
                }
              } else this.resolveUtilsScriptPromise();
              if (this.options.initialCountry === "auto")
                this._loadAutoCountry();
              else this.resolveAutoCountryPromise();
            },
          },
          {
            key: "_loadAutoCountry",
            value: function _loadAutoCountry() {
              // 3 options:
              // 1) already loaded (we're done)
              // 2) not already started loading (start)
              // 3) already started loading (do nothing - just wait for loading callback to fire)
              if (window.intlTelInputGlobals.autoCountry) {
                this.handleAutoCountry();
              } else if (
                !window.intlTelInputGlobals.startedLoadingAutoCountry
              ) {
                // don't do this twice!
                window.intlTelInputGlobals.startedLoadingAutoCountry = true;
                if (typeof this.options.geoIpLookup === "function") {
                  this.options.geoIpLookup(
                    function (countryCode) {
                      window.intlTelInputGlobals.autoCountry =
                        countryCode.toLowerCase();
                      // tell all instances the auto country is ready
                      // TODO: this should just be the current instances
                      // UPDATE: use setTimeout in case their geoIpLookup function calls this callback straight
                      // away (e.g. if they have already done the geo ip lookup somewhere else). Using
                      // setTimeout means that the current thread of execution will finish before executing
                      // this, which allows the plugin to finish initialising.
                      setTimeout(function () {
                        return forEachInstance("handleAutoCountry");
                      });
                    },
                    function () {
                      return forEachInstance("rejectAutoCountryPromise");
                    }
                  );
                }
              }
            },
          },
          {
            key: "_initKeyListeners",
            value: function _initKeyListeners() {
              var _this6 = this;
              // update flag on keyup
              this._handleKeyupEvent = function () {
                if (_this6._updateFlagFromNumber(_this6.telInput.value)) {
                  _this6._triggerCountryChange();
                }
              };
              this.telInput.addEventListener("keyup", this._handleKeyupEvent);
              // update flag on cut/paste events (now supported in all major browsers)
              this._handleClipboardEvent = function () {
                // hack because "paste" event is fired before input is updated
                setTimeout(_this6._handleKeyupEvent);
              };
              this.telInput.addEventListener("cut", this._handleClipboardEvent);
              this.telInput.addEventListener(
                "paste",
                this._handleClipboardEvent
              );
            },
          },
          {
            key: "_cap",
            value: function _cap(number) {
              var max = this.telInput.getAttribute("maxlength");
              return max && number.length > max ?
                number.substr(0, max) :
                number;
            },
          },
          {
            key: "_initBlurListeners",
            value: function _initBlurListeners() {
              var _this7 = this;
              // on blur or form submit: if just a dial code then remove it
              this._handleSubmitOrBlurEvent = function () {
                _this7._removeEmptyDialCode();
              };
              if (this.telInput.form)
                this.telInput.form.addEventListener(
                  "submit",
                  this._handleSubmitOrBlurEvent
                );
              this.telInput.addEventListener(
                "blur",
                this._handleSubmitOrBlurEvent
              );
            },
          },
          {
            key: "_removeEmptyDialCode",
            value: function _removeEmptyDialCode() {
              if (this.telInput.value.charAt(0) === "+") {
                var numeric = this._getNumeric(this.telInput.value);
                // if just a plus, or if just a dial code
                if (!numeric || this.selectedCountryData.dialCode === numeric) {
                  this.telInput.value = "";
                }
              }
            },
          },
          {
            key: "_getNumeric",
            value: function _getNumeric(s) {
              return s.replace(/\D/g, "");
            },
          },
          {
            key: "_trigger",
            value: function _trigger(name) {
              // have to use old school document.createEvent as IE11 doesn't support `new Event()` syntax
              var e = document.createEvent("Event");
              e.initEvent(name, true, true);
              // can bubble, and is cancellable
              this.telInput.dispatchEvent(e);
            },
          },
          {
            key: "_showDropdown",
            value: function _showDropdown() {
              this.countryList.classList.remove("iti__hide");
              this.selectedFlag.setAttribute("aria-expanded", "true");
              this._setDropdownPosition();
              // update highlighting and scroll to active list item
              if (this.activeItem) {
                this._highlightListItem(this.activeItem, false);
                this._scrollTo(this.activeItem, true);
              }
              // bind all the dropdown-related listeners: mouseover, click, click-off, keydown
              this._bindDropdownListeners();
              // update the arrow
              this.dropdownArrow.classList.add("iti__arrow--up");
              this._trigger("open:countrydropdown");
            },
          },
          {
            key: "_toggleClass",
            value: function _toggleClass(el, className, shouldHaveClass) {
              if (shouldHaveClass && !el.classList.contains(className))
                el.classList.add(className);
              else if (!shouldHaveClass && el.classList.contains(className))
                el.classList.remove(className);
            },
          },
          {
            key: "_setDropdownPosition",
            value: function _setDropdownPosition() {
              var _this8 = this;
              if (this.options.dropdownContainer) {
                this.options.dropdownContainer.appendChild(this.dropdown);
              }
              if (!this.isMobile) {
                var pos = this.telInput.getBoundingClientRect();
                // windowTop from https://stackoverflow.com/a/14384091/217866
                var windowTop =
                  window.pageYOffset || document.documentElement.scrollTop;
                var inputTop = pos.top + windowTop;
                var dropdownHeight = this.countryList.offsetHeight;
                // dropdownFitsBelow = (dropdownBottom < windowBottom)
                var dropdownFitsBelow =
                  inputTop + this.telInput.offsetHeight + dropdownHeight <
                  windowTop + window.innerHeight;
                var dropdownFitsAbove = inputTop - dropdownHeight > windowTop;
                // by default, the dropdown will be below the input. If we want to position it above the
                // input, we add the dropup class.
                this._toggleClass(
                  this.countryList,
                  "iti__country-list--dropup",
                  !dropdownFitsBelow && dropdownFitsAbove
                );
                // if dropdownContainer is enabled, calculate postion
                if (this.options.dropdownContainer) {
                  // by default the dropdown will be directly over the input because it's not in the flow.
                  // If we want to position it below, we need to add some extra top value.
                  var extraTop = !dropdownFitsBelow && dropdownFitsAbove ?
                    0 :
                    this.telInput.offsetHeight;
                  // calculate placement
                  this.dropdown.style.top = "".concat(
                    inputTop + extraTop,
                    "px"
                  );
                  this.dropdown.style.left = "".concat(
                    pos.left + document.body.scrollLeft,
                    "px"
                  );
                  // close menu on window scroll
                  this._handleWindowScroll = function () {
                    return _this8._closeDropdown();
                  };
                  window.addEventListener("scroll", this._handleWindowScroll);
                }
              }
            },
          },
          {
            key: "_getClosestListItem",
            value: function _getClosestListItem(target) {
              var el = target;
              while (
                el &&
                el !== this.countryList &&
                !el.classList.contains("iti__country")
              ) {
                el = el.parentNode;
              }
              // if we reached the countryList element, then return null
              return el === this.countryList ? null : el;
            },
          },
          {
            key: "_bindDropdownListeners",
            value: function _bindDropdownListeners() {
              var _this9 = this;
              // when mouse over a list item, just highlight that one
              // we add the class "highlight", so if they hit "enter" we know which one to select
              this._handleMouseoverCountryList = function (e) {
                // handle event delegation, as we're listening for this event on the countryList
                var listItem = _this9._getClosestListItem(e.target);
                if (listItem) _this9._highlightListItem(listItem, false);
              };
              this.countryList.addEventListener(
                "mouseover",
                this._handleMouseoverCountryList
              );
              // listen for country selection
              this._handleClickCountryList = function (e) {
                var listItem = _this9._getClosestListItem(e.target);
                if (listItem) _this9._selectListItem(listItem);
              };
              this.countryList.addEventListener(
                "click",
                this._handleClickCountryList
              );
              // click off to close
              // (except when this initial opening click is bubbling up)
              // we cannot just stopPropagation as it may be needed to close another instance
              var isOpening = true;
              this._handleClickOffToClose = function () {
                if (!isOpening) _this9._closeDropdown();
                isOpening = false;
              };
              document.documentElement.addEventListener(
                "click",
                this._handleClickOffToClose
              );
              // listen for up/down scrolling, enter to select, or letters to jump to country name.
              // use keydown as keypress doesn't fire for non-char keys and we want to catch if they
              // just hit down and hold it to scroll down (no keyup event).
              // listen on the document because that's where key events are triggered if no input has focus
              var query = "";
              var queryTimer = null;
              this._handleKeydownOnDropdown = function (e) {
                // prevent down key from scrolling the whole page,
                // and enter key from submitting a form etc
                e.preventDefault();
                // up and down to navigate
                if (
                  e.key === "ArrowUp" ||
                  e.key === "Up" ||
                  e.key === "ArrowDown" ||
                  e.key === "Down"
                )
                  _this9._handleUpDownKey(e.key);
                else if (e.key === "Enter") _this9._handleEnterKey();
                else if (e.key === "Escape") _this9._closeDropdown();
                else if (/^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(e.key)) {
                  // jump to countries that start with the query string
                  if (queryTimer) clearTimeout(queryTimer);
                  query += e.key.toLowerCase();
                  _this9._searchForCountry(query);
                  // if the timer hits 1 second, reset the query
                  queryTimer = setTimeout(function () {
                    query = "";
                  }, 1e3);
                }
              };
              document.addEventListener(
                "keydown",
                this._handleKeydownOnDropdown
              );
            },
          },
          {
            key: "_handleUpDownKey",
            value: function _handleUpDownKey(key) {
              var next =
                key === "ArrowUp" || key === "Up" ?
                this.highlightedItem.previousElementSibling :
                this.highlightedItem.nextElementSibling;
              if (next) {
                // skip the divider
                if (next.classList.contains("iti__divider")) {
                  next =
                    key === "ArrowUp" || key === "Up" ?
                    next.previousElementSibling :
                    next.nextElementSibling;
                }
                this._highlightListItem(next, true);
              }
            },
          },
          {
            key: "_handleEnterKey",
            value: function _handleEnterKey() {
              if (this.highlightedItem)
                this._selectListItem(this.highlightedItem);
            },
          },
          {
            key: "_searchForCountry",
            value: function _searchForCountry(query) {
              for (var i = 0; i < this.countries.length; i++) {
                if (this._startsWith(this.countries[i].name, query)) {
                  var listItem = this.countryList.querySelector(
                    "#iti-"
                    .concat(this.id, "__item-")
                    .concat(this.countries[i].iso2)
                  );
                  // update highlighting and scroll
                  this._highlightListItem(listItem, false);
                  this._scrollTo(listItem, true);
                  break;
                }
              }
            },
          },
          {
            key: "_startsWith",
            value: function _startsWith(a, b) {
              return a.substr(0, b.length).toLowerCase() === b;
            },
          },
          {
            key: "_updateValFromNumber",
            value: function _updateValFromNumber(originalNumber) {
              var number = originalNumber;
              if (
                this.options.formatOnDisplay &&
                window.intlTelInputUtils &&
                this.selectedCountryData
              ) {
                var useNational = !this.options.separateDialCode &&
                  (this.options.nationalMode || number.charAt(0) !== "+");
                var _intlTelInputUtils$nu = intlTelInputUtils.numberFormat,
                  NATIONAL = _intlTelInputUtils$nu.NATIONAL,
                  INTERNATIONAL = _intlTelInputUtils$nu.INTERNATIONAL;
                var format = useNational ? NATIONAL : INTERNATIONAL;
                number = intlTelInputUtils.formatNumber(
                  number,
                  this.selectedCountryData.iso2,
                  format
                );
              }
              number = this._beforeSetNumber(number);
              this.telInput.value = number;
            },
          },
          {
            key: "_updateFlagFromNumber",
            value: function _updateFlagFromNumber(originalNumber) {
              // if we're in nationalMode and we already have US/Canada selected, make sure the number starts
              // with a +1 so _getDialCode will be able to extract the area code
              // update: if we dont yet have selectedCountryData, but we're here (trying to update the flag
              // from the number), that means we're initialising the plugin with a number that already has a
              // dial code, so fine to ignore this bit
              var number = originalNumber;
              var selectedDialCode = this.selectedCountryData.dialCode;
              var isNanp = selectedDialCode === "1";
              if (
                number &&
                this.options.nationalMode &&
                isNanp &&
                number.charAt(0) !== "+"
              ) {
                if (number.charAt(0) !== "1") number = "1".concat(number);
                number = "+".concat(number);
              }
              // update flag if user types area code for another country
              if (
                this.options.separateDialCode &&
                selectedDialCode &&
                number.charAt(0) !== "+"
              ) {
                number = "+".concat(selectedDialCode).concat(number);
              }
              // try and extract valid dial code from input
              var dialCode = this._getDialCode(number);
              var numeric = this._getNumeric(number);
              var countryCode = null;
              if (dialCode) {
                var countryCodes =
                  this.countryCodes[this._getNumeric(dialCode)];
                // check if the right country is already selected. this should be false if the number is
                // longer than the matched dial code because in this case we need to make sure that if
                // there are multiple country matches, that the first one is selected (note: we could
                // just check that here, but it requires the same loop that we already have later)
                var alreadySelected =
                  countryCodes.indexOf(this.selectedCountryData.iso2) !== -1 &&
                  numeric.length <= dialCode.length - 1;
                var isRegionlessNanpNumber =
                  selectedDialCode === "1" && this._isRegionlessNanp(numeric);
                // only update the flag if:
                // A) NOT (we currently have a NANP flag selected, and the number is a regionlessNanp)
                // AND
                // B) the right country is not already selected
                if (!isRegionlessNanpNumber && !alreadySelected) {
                  // if using onlyCountries option, countryCodes[0] may be empty, so we must find the first
                  // non-empty index
                  for (var j = 0; j < countryCodes.length; j++) {
                    if (countryCodes[j]) {
                      countryCode = countryCodes[j];
                      break;
                    }
                  }
                }
              } else if (number.charAt(0) === "+" && numeric.length) {
                // invalid dial code, so empty
                // Note: use getNumeric here because the number has not been formatted yet, so could contain
                // bad chars
                countryCode = "";
              } else if (!number || number === "+") {
                // empty, or just a plus, so default
                countryCode = this.defaultCountry;
              }
              if (countryCode !== null) {
                return this._setFlag(countryCode);
              }
              return false;
            },
          },
          {
            key: "_isRegionlessNanp",
            value: function _isRegionlessNanp(number) {
              var numeric = this._getNumeric(number);
              if (numeric.charAt(0) === "1") {
                var areaCode = numeric.substr(1, 3);
                return regionlessNanpNumbers.indexOf(areaCode) !== -1;
              }
              return false;
            },
          },
          {
            key: "_highlightListItem",
            value: function _highlightListItem(listItem, shouldFocus) {
              var prevItem = this.highlightedItem;
              if (prevItem) prevItem.classList.remove("iti__highlight");
              this.highlightedItem = listItem;
              this.highlightedItem.classList.add("iti__highlight");
              if (shouldFocus) this.highlightedItem.focus();
            },
          },
          {
            key: "_getCountryData",
            value: function _getCountryData(
              countryCode,
              ignoreOnlyCountriesOption,
              allowFail
            ) {
              var countryList = ignoreOnlyCountriesOption ?
                allCountries :
                this.countries;
              for (var i = 0; i < countryList.length; i++) {
                if (countryList[i].iso2 === countryCode) {
                  return countryList[i];
                }
              }
              if (allowFail) {
                return null;
              }
              throw new Error("No country data for '".concat(countryCode, "'"));
            },
          },
          {
            key: "_setFlag",
            value: function _setFlag(countryCode) {
              var prevCountry = this.selectedCountryData.iso2 ?
                this.selectedCountryData : {};
              // do this first as it will throw an error and stop if countryCode is invalid
              this.selectedCountryData = countryCode ?
                this._getCountryData(countryCode, false, false) : {};
              // update the defaultCountry - we only need the iso2 from now on, so just store that
              if (this.selectedCountryData.iso2) {
                this.defaultCountry = this.selectedCountryData.iso2;
              }
              this.selectedFlagInner.setAttribute(
                "class",
                "iti__flag iti__".concat(countryCode)
              );
              // update the selected country's title attribute
              var title = countryCode ?
                ""
                .concat(this.selectedCountryData.name, ": +")
                .concat(this.selectedCountryData.dialCode) :
                "Unknown";
              this.selectedFlag.setAttribute("title", title);
              if (this.options.separateDialCode) {
                var dialCode = this.selectedCountryData.dialCode ?
                  "+".concat(this.selectedCountryData.dialCode) :
                  "";
                this.selectedDialCode.innerHTML = dialCode;
                // offsetWidth is zero if input is in a hidden container during initialisation
                var selectedFlagWidth =
                  this.selectedFlag.offsetWidth ||
                  this._getHiddenSelectedFlagWidth();
                // add 6px of padding after the grey selected-dial-code box, as this is what we use in the css
                this.telInput.style.paddingLeft = "".concat(
                  selectedFlagWidth + 6,
                  "px"
                );
              }
              // and the input's placeholder
              this._updatePlaceholder();
              // update the active list item
              if (this.options.allowDropdown) {
                var prevItem = this.activeItem;
                if (prevItem) {
                  prevItem.classList.remove("iti__active");
                  prevItem.setAttribute("aria-selected", "false");
                }
                if (countryCode) {
                  // check if there is a preferred item first, else fall back to standard
                  var nextItem =
                    this.countryList.querySelector(
                      "#iti-"
                      .concat(this.id, "__item-")
                      .concat(countryCode, "-preferred")
                    ) ||
                    this.countryList.querySelector(
                      "#iti-".concat(this.id, "__item-").concat(countryCode)
                    );
                  nextItem.setAttribute("aria-selected", "true");
                  nextItem.classList.add("iti__active");
                  this.activeItem = nextItem;
                  this.selectedFlag.setAttribute(
                    "aria-activedescendant",
                    nextItem.getAttribute("id")
                  );
                }
              }
              // return if the flag has changed or not
              return prevCountry.iso2 !== countryCode;
            },
          },
          {
            key: "_getHiddenSelectedFlagWidth",
            value: function _getHiddenSelectedFlagWidth() {
              // to get the right styling to apply, all we need is a shallow clone of the container,
              // and then to inject a deep clone of the selectedFlag element
              var containerClone = this.telInput.parentNode.cloneNode();
              containerClone.style.visibility = "hidden";
              document.body.appendChild(containerClone);
              var selectedFlagClone = this.selectedFlag.cloneNode(true);
              containerClone.appendChild(selectedFlagClone);
              var width = selectedFlagClone.offsetWidth;
              containerClone.parentNode.removeChild(containerClone);
              return width;
            },
          },
          {
            key: "_updatePlaceholder",
            value: function _updatePlaceholder() {
              var shouldSetPlaceholder =
                this.options.autoPlaceholder === "aggressive" ||
                (!this.hadInitialPlaceholder &&
                  this.options.autoPlaceholder === "polite");
              if (window.intlTelInputUtils && shouldSetPlaceholder) {
                var numberType =
                  intlTelInputUtils.numberType[
                    this.options.placeholderNumberType
                  ];
                var placeholder = this.selectedCountryData.iso2 ?
                  intlTelInputUtils.getExampleNumber(
                    this.selectedCountryData.iso2,
                    this.options.nationalMode,
                    numberType
                  ) :
                  "";
                placeholder = this._beforeSetNumber(placeholder);
                if (typeof this.options.customPlaceholder === "function") {
                  placeholder = this.options.customPlaceholder(
                    placeholder,
                    this.selectedCountryData
                  );
                }
                this.telInput.setAttribute("placeholder", placeholder);
              }
            },
          },
          {
            key: "_selectListItem",
            value: function _selectListItem(listItem) {
              // update selected flag and active list item
              var flagChanged = this._setFlag(
                listItem.getAttribute("data-country-code")
              );
              this._closeDropdown();
              this._updateDialCode(
                listItem.getAttribute("data-dial-code"),
                true
              );
              // focus the input
              this.telInput.focus();
              // put cursor at end - this fix is required for FF and IE11 (with nationalMode=false i.e. auto
              // inserting dial code), who try to put the cursor at the beginning the first time
              var len = this.telInput.value.length;
              this.telInput.setSelectionRange(len, len);
              if (flagChanged) {
                this._triggerCountryChange();
              }
            },
          },
          {
            key: "_closeDropdown",
            value: function _closeDropdown() {
              this.countryList.classList.add("iti__hide");
              this.selectedFlag.setAttribute("aria-expanded", "false");
              // update the arrow
              this.dropdownArrow.classList.remove("iti__arrow--up");
              // unbind key events
              document.removeEventListener(
                "keydown",
                this._handleKeydownOnDropdown
              );
              document.documentElement.removeEventListener(
                "click",
                this._handleClickOffToClose
              );
              this.countryList.removeEventListener(
                "mouseover",
                this._handleMouseoverCountryList
              );
              this.countryList.removeEventListener(
                "click",
                this._handleClickCountryList
              );
              // remove menu from container
              if (this.options.dropdownContainer) {
                if (!this.isMobile)
                  window.removeEventListener(
                    "scroll",
                    this._handleWindowScroll
                  );
                if (this.dropdown.parentNode)
                  this.dropdown.parentNode.removeChild(this.dropdown);
              }
              this._trigger("close:countrydropdown");
            },
          },
          {
            key: "_scrollTo",
            value: function _scrollTo(element, middle) {
              var container = this.countryList;
              // windowTop from https://stackoverflow.com/a/14384091/217866
              var windowTop =
                window.pageYOffset || document.documentElement.scrollTop;
              var containerHeight = container.offsetHeight;
              var containerTop =
                container.getBoundingClientRect().top + windowTop;
              var containerBottom = containerTop + containerHeight;
              var elementHeight = element.offsetHeight;
              var elementTop = element.getBoundingClientRect().top + windowTop;
              var elementBottom = elementTop + elementHeight;
              var newScrollTop =
                elementTop - containerTop + container.scrollTop;
              var middleOffset = containerHeight / 2 - elementHeight / 2;
              if (elementTop < containerTop) {
                // scroll up
                if (middle) newScrollTop -= middleOffset;
                container.scrollTop = newScrollTop;
              } else if (elementBottom > containerBottom) {
                // scroll down
                if (middle) newScrollTop += middleOffset;
                var heightDifference = containerHeight - elementHeight;
                container.scrollTop = newScrollTop - heightDifference;
              }
            },
          },
          {
            key: "_updateDialCode",
            value: function _updateDialCode(
              newDialCodeBare,
              hasSelectedListItem
            ) {
              var inputVal = this.telInput.value;
              // save having to pass this every time
              var newDialCode = "+".concat(newDialCodeBare);
              var newNumber;
              if (inputVal.charAt(0) === "+") {
                // there's a plus so we're dealing with a replacement (doesn't matter if nationalMode or not)
                var prevDialCode = this._getDialCode(inputVal);
                if (prevDialCode) {
                  // current number contains a valid dial code, so replace it
                  newNumber = inputVal.replace(prevDialCode, newDialCode);
                } else {
                  // current number contains an invalid dial code, so ditch it
                  // (no way to determine where the invalid dial code ends and the rest of the number begins)
                  newNumber = newDialCode;
                }
              } else if (
                this.options.nationalMode ||
                this.options.separateDialCode
              ) {
                // don't do anything
                return;
              } else {
                // nationalMode is disabled
                if (inputVal) {
                  // there is an existing value with no dial code: prefix the new dial code
                  newNumber = newDialCode + inputVal;
                } else if (
                  hasSelectedListItem ||
                  !this.options.autoHideDialCode
                ) {
                  // no existing value and either they've just selected a list item, or autoHideDialCode is
                  // disabled: insert new dial code
                  newNumber = newDialCode;
                } else {
                  return;
                }
              }
              this.telInput.value = newNumber;
            },
          },
          {
            key: "_getDialCode",
            value: function _getDialCode(number) {
              var dialCode = "";
              // only interested in international numbers (starting with a plus)
              if (number.charAt(0) === "+") {
                var numericChars = "";
                // iterate over chars
                for (var i = 0; i < number.length; i++) {
                  var c = number.charAt(i);
                  // if char is number (https://stackoverflow.com/a/8935649/217866)
                  if (!isNaN(parseInt(c, 10))) {
                    numericChars += c;
                    // if current numericChars make a valid dial code
                    if (this.countryCodes[numericChars]) {
                      // store the actual raw string (useful for matching later)
                      dialCode = number.substr(0, i + 1);
                    }
                    if (numericChars.length === this.dialCodeMaxLen) {
                      break;
                    }
                  }
                }
              }
              return dialCode;
            },
          },
          {
            key: "_getFullNumber",
            value: function _getFullNumber() {
              var val = this.telInput.value.trim();
              var dialCode = this.selectedCountryData.dialCode;
              var prefix;
              var numericVal = this._getNumeric(val);
              if (
                this.options.separateDialCode &&
                val.charAt(0) !== "+" &&
                dialCode &&
                numericVal
              ) {
                // when using separateDialCode, it is visible so is effectively part of the typed number
                prefix = "+".concat(dialCode);
              } else {
                prefix = "";
              }
              return prefix + val;
            },
          },
          {
            key: "_beforeSetNumber",
            value: function _beforeSetNumber(originalNumber) {
              var number = originalNumber;
              if (this.options.separateDialCode) {
                var dialCode = this._getDialCode(number);
                // if there is a valid dial code
                if (dialCode) {
                  // in case _getDialCode returned an area code as well
                  dialCode = "+".concat(this.selectedCountryData.dialCode);
                  // a lot of numbers will have a space separating the dial code and the main number, and
                  // some NANP numbers will have a hyphen e.g. +1 684-733-1234 - in both cases we want to get
                  // rid of it
                  // NOTE: don't just trim all non-numerics as may want to preserve an open parenthesis etc
                  var start =
                    number[dialCode.length] === " " ||
                    number[dialCode.length] === "-" ?
                    dialCode.length + 1 :
                    dialCode.length;
                  number = number.substr(start);
                }
              }
              return this._cap(number);
            },
          },
          {
            key: "_triggerCountryChange",
            value: function _triggerCountryChange() {
              this._trigger("countrychange");
            },
          },
          {
            key: "handleAutoCountry",
            value: function handleAutoCountry() {
              if (this.options.initialCountry === "auto") {
                // we must set this even if there is an initial val in the input: in case the initial val is
                // invalid and they delete it - they should see their auto country
                this.defaultCountry = window.intlTelInputGlobals.autoCountry;
                // if there's no initial value in the input, then update the flag
                if (!this.telInput.value) {
                  this.setCountry(this.defaultCountry);
                }
                this.resolveAutoCountryPromise();
              }
            },
          },
          {
            key: "handleUtils",
            value: function handleUtils() {
              // if the request was successful
              if (window.intlTelInputUtils) {
                // if there's an initial value in the input, then format it
                if (this.telInput.value) {
                  this._updateValFromNumber(this.telInput.value);
                }
                this._updatePlaceholder();
              }
              this.resolveUtilsScriptPromise();
            },
          },
          {
            key: "destroy",
            value: function destroy() {
              var form = this.telInput.form;
              if (this.options.allowDropdown) {
                // make sure the dropdown is closed (and unbind listeners)
                this._closeDropdown();
                this.selectedFlag.removeEventListener(
                  "click",
                  this._handleClickSelectedFlag
                );
                this.flagsContainer.removeEventListener(
                  "keydown",
                  this._handleFlagsContainerKeydown
                );
                // label click hack
                var label = this._getClosestLabel();
                if (label)
                  label.removeEventListener("click", this._handleLabelClick);
              }
              // unbind hiddenInput listeners
              if (this.hiddenInput && form)
                form.removeEventListener(
                  "submit",
                  this._handleHiddenInputSubmit
                );
              // unbind autoHideDialCode listeners
              if (this.options.autoHideDialCode) {
                if (form)
                  form.removeEventListener(
                    "submit",
                    this._handleSubmitOrBlurEvent
                  );
                this.telInput.removeEventListener(
                  "blur",
                  this._handleSubmitOrBlurEvent
                );
              }
              // unbind key events, and cut/paste events
              this.telInput.removeEventListener(
                "keyup",
                this._handleKeyupEvent
              );
              this.telInput.removeEventListener(
                "cut",
                this._handleClipboardEvent
              );
              this.telInput.removeEventListener(
                "paste",
                this._handleClipboardEvent
              );
              // remove attribute of id instance: data-intl-tel-input-id
              this.telInput.removeAttribute("data-intl-tel-input-id");
              // remove markup (but leave the original input)
              var wrapper = this.telInput.parentNode;
              wrapper.parentNode.insertBefore(this.telInput, wrapper);
              wrapper.parentNode.removeChild(wrapper);
              delete window.intlTelInputGlobals.instances[this.id];
            },
          },
          {
            key: "getExtension",
            value: function getExtension() {
              if (window.intlTelInputUtils) {
                return intlTelInputUtils.getExtension(
                  this._getFullNumber(),
                  this.selectedCountryData.iso2
                );
              }
              return "";
            },
          },
          {
            key: "getNumber",
            value: function getNumber(format) {
              if (window.intlTelInputUtils) {
                var iso2 = this.selectedCountryData.iso2;
                return intlTelInputUtils.formatNumber(
                  this._getFullNumber(),
                  iso2,
                  format
                );
              }
              return "";
            },
          },
          {
            key: "getNumberType",
            value: function getNumberType() {
              if (window.intlTelInputUtils) {
                return intlTelInputUtils.getNumberType(
                  this._getFullNumber(),
                  this.selectedCountryData.iso2
                );
              }
              return -99;
            },
          },
          {
            key: "getSelectedCountryData",
            value: function getSelectedCountryData() {
              return this.selectedCountryData;
            },
          },
          {
            key: "getValidationError",
            value: function getValidationError() {
              if (window.intlTelInputUtils) {
                var iso2 = this.selectedCountryData.iso2;
                return intlTelInputUtils.getValidationError(
                  this._getFullNumber(),
                  iso2
                );
              }
              return -99;
            },
          },
          {
            key: "isValidNumber",
            value: function isValidNumber() {
              var val = this._getFullNumber().trim();
              var countryCode = this.options.nationalMode ?
                this.selectedCountryData.iso2 :
                "";
              return window.intlTelInputUtils ?
                intlTelInputUtils.isValidNumber(val, countryCode) :
                null;
            },
          },
          {
            key: "setCountry",
            value: function setCountry(originalCountryCode) {
              var countryCode = originalCountryCode.toLowerCase();
              // check if already selected
              if (
                !this.selectedFlagInner.classList.contains(
                  "iti__".concat(countryCode)
                )
              ) {
                this._setFlag(countryCode);
                this._updateDialCode(this.selectedCountryData.dialCode, false);
                this._triggerCountryChange();
              }
            },
          },
          {
            key: "setNumber",
            value: function setNumber(number) {
              // we must update the flag first, which updates this.selectedCountryData, which is used for
              // formatting the number before displaying it
              var flagChanged = this._updateFlagFromNumber(number);
              this._updateValFromNumber(number);
              if (flagChanged) {
                this._triggerCountryChange();
              }
            },
          },
          {
            key: "setPlaceholderNumberType",
            value: function setPlaceholderNumberType(type) {
              this.options.placeholderNumberType = type;
              this._updatePlaceholder();
            },
          },
        ]);
        return Iti;
      })();
    /********************
     *  STATIC METHODS
     ********************/
    // get the country data object
    intlTelInputGlobals.getCountryData = function () {
      return allCountries;
    };
    // inject a <script> element to load utils.js
    var injectScript = function injectScript(
      path,
      handleSuccess,
      handleFailure
    ) {
      // inject a new script element into the page
      var script = document.createElement("script");
      script.onload = function () {
        forEachInstance("handleUtils");
        if (handleSuccess) handleSuccess();
      };
      script.onerror = function () {
        forEachInstance("rejectUtilsScriptPromise");
        if (handleFailure) handleFailure();
      };
      script.className = "iti-load-utils";
      script.async = true;
      script.src = path;
      document.body.appendChild(script);
    };
    // load the utils script
    intlTelInputGlobals.loadUtils = function (path) {
      // 2 options:
      // 1) not already started loading (start)
      // 2) already started loading (do nothing - just wait for the onload callback to fire, which will
      // trigger handleUtils on all instances, invoking their resolveUtilsScriptPromise functions)
      if (
        !window.intlTelInputUtils &&
        !window.intlTelInputGlobals.startedLoadingUtilsScript
      ) {
        // only do this once
        window.intlTelInputGlobals.startedLoadingUtilsScript = true;
        // if we have promises, then return a promise
        if (typeof Promise !== "undefined") {
          return new Promise(function (resolve, reject) {
            return injectScript(path, resolve, reject);
          });
        }
        injectScript(path);
      }
      return null;
    };
    // default options
    intlTelInputGlobals.defaults = defaults;
    // version
    intlTelInputGlobals.version = "17.0.0";
    // convenience wrapper
    return function (input, options) {
      var iti = new Iti(input, options);
      iti._init();
      input.setAttribute("data-intl-tel-input-id", iti.id);
      window.intlTelInputGlobals.instances[iti.id] = iti;
      return iti;
    };
  })();
});
/* End International phone number dropdown plugin */
/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
! function (a, b, c, d) {
  function e(b, c) {
    this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
      time: null,
      target: null,
      pointer: null,
      stage: {
        start: null,
        current: null
      },
      direction: null
    }, this._states = {
      current: {},
      tags: {
        initializing: ["busy"],
        animating: ["busy"],
        dragging: ["interacting"]
      }
    }, a.each(["onResize", "onThrottledResize"], a.proxy(function (b, c) {
      this._handlers[c] = a.proxy(this[c], this)
    }, this)), a.each(e.Plugins, a.proxy(function (a, b) {
      this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
    }, this)), a.each(e.Workers, a.proxy(function (b, c) {
      this._pipe.push({
        filter: c.filter,
        run: a.proxy(c.run, this)
      })
    }, this)), this.setup(), this.initialize()
  }
  e.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    checkVisibility: !0,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: b,
    fallbackEasing: "swing",
    slideTransition: "",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab"
  }, e.Width = {
    Default: "default",
    Inner: "inner",
    Outer: "outer"
  }, e.Type = {
    Event: "event",
    State: "state"
  }, e.Plugins = {}, e.Workers = [{
    filter: ["width", "settings"],
    run: function () {
      this._width = this.$element.width()
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function (a) {
      a.current = this._items && this._items[this.relative(this._current)]
    }
  }, {
    filter: ["items", "settings"],
    run: function () {
      this.$stage.children(".cloned").remove()
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function (a) {
      var b = this.settings.margin || "",
        c = !this.settings.autoWidth,
        d = this.settings.rtl,
        e = {
          width: "auto",
          "margin-left": d ? b : "",
          "margin-right": d ? "" : b
        };
      !c && this.$stage.children().css(e), a.css = e
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function (a) {
      var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
        c = null,
        d = this._items.length,
        e = !this.settings.autoWidth,
        f = [];
      for (a.items = {
          merge: !1,
          width: b
        }; d--;) c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
      this._widths = f
    }
  }, {
    filter: ["items", "settings"],
    run: function () {
      var b = [],
        c = this._items,
        d = this.settings,
        e = Math.max(2 * d.items, 4),
        f = 2 * Math.ceil(c.length / 2),
        g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
        h = "",
        i = "";
      for (g /= 2; g > 0;) b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i, g -= 1;
      this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage)
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function () {
      for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
      this._coordinates = f
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function () {
      var a = this.settings.stagePadding,
        b = this._coordinates,
        c = {
          width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
          "padding-left": a || "",
          "padding-right": a || ""
        };
      this.$stage.css(c)
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function (a) {
      var b = this._coordinates.length,
        c = !this.settings.autoWidth,
        d = this.$stage.children();
      if (c && a.items.merge)
        for (; b--;) a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css);
      else c && (a.css.width = a.items.width, d.css(a.css))
    }
  }, {
    filter: ["items"],
    run: function () {
      this._coordinates.length < 1 && this.$stage.removeAttr("style")
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function (a) {
      a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current)
    }
  }, {
    filter: ["position"],
    run: function () {
      this.animate(this.coordinates(this._current))
    }
  }, {
    filter: ["width", "position", "items", "settings"],
    run: function () {
      var a, b, c, d, e = this.settings.rtl ? 1 : -1,
        f = 2 * this.settings.stagePadding,
        g = this.coordinates(this.current()) + f,
        h = g + this.width() * e,
        i = [];
      for (c = 0, d = this._coordinates.length; c < d; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
      this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.$stage.children(".center").removeClass("center"), this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
    }
  }], e.prototype.initializeStage = function () {
    this.$stage = this.$element.find("." + this.settings.stageClass), this.$stage.length || (this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ">", {
      class: this.settings.stageClass
    }).wrap(a("<div/>", {
      class: this.settings.stageOuterClass
    })), this.$element.append(this.$stage.parent()))
  }, e.prototype.initializeItems = function () {
    var b = this.$element.find(".owl-item");
    if (b.length) return this._items = b.get().map(function (b) {
      return a(b)
    }), this._mergers = this._items.map(function () {
      return 1
    }), void this.refresh();
    this.replace(this.$element.children().not(this.$stage.parent())), this.isVisible() ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
  }, e.prototype.initialize = function () {
    if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
      var a, b, c;
      a = this.$element.find("img"), b = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, c = this.$element.children(b).width(), a.length && c <= 0 && this.preloadAutoWidthImages(a)
    }
    this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
  }, e.prototype.isVisible = function () {
    return !this.settings.checkVisibility || this.$element.is(":visible")
  }, e.prototype.setup = function () {
    var b = this.viewport(),
      c = this.options.responsive,
      d = -1,
      e = null;
    c ? (a.each(c, function (a) {
      a <= b && a > d && (d = Number(a))
    }), e = a.extend({}, this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), this.trigger("change", {
      property: {
        name: "settings",
        value: e
      }
    }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
      property: {
        name: "settings",
        value: this.settings
      }
    })
  }, e.prototype.optionsLogic = function () {
    this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
  }, e.prototype.prepare = function (b) {
    var c = this.trigger("prepare", {
      content: b
    });
    return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {
      content: c.data
    }), c.data
  }, e.prototype.update = function () {
    for (var b = 0, c = this._pipe.length, d = a.proxy(function (a) {
        return this[a]
      }, this._invalidated), e = {}; b < c;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
    this._invalidated = {}, !this.is("valid") && this.enter("valid")
  }, e.prototype.width = function (a) {
    switch (a = a || e.Width.Default) {
      case e.Width.Inner:
      case e.Width.Outer:
        return this._width;
      default:
        return this._width - 2 * this.settings.stagePadding + this.settings.margin
    }
  }, e.prototype.refresh = function () {
    this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
  }, e.prototype.onThrottledResize = function () {
    b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
  }, e.prototype.onResize = function () {
    return !!this._items.length && (this._width !== this.$element.width() && (!!this.isVisible() && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
  }, e.prototype.registerEventHandlers = function () {
    a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
      return !1
    })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
  }, e.prototype.onDragStart = function (b) {
    var d = null;
    3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
      x: d[16 === d.length ? 12 : 4],
      y: d[16 === d.length ? 13 : 5]
    }) : (d = this.$stage.position(), d = {
      x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
      y: d.top
    }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function (b) {
      var d = this.difference(this._drag.pointer, this.pointer(b));
      a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"))
    }, this)))
  }, e.prototype.onDragMove = function (a) {
    var b = null,
      c = null,
      d = null,
      e = this.difference(this._drag.pointer, this.pointer(a)),
      f = this.difference(this._drag.stage.start, e);
    this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x))
  }, e.prototype.onDragEnd = function (b) {
    var d = this.difference(this._drag.pointer, this.pointer(b)),
      e = this._drag.stage.current,
      f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
    a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function () {
      return !1
    })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
  }, e.prototype.closest = function (b, c) {
    var e = -1,
      f = 30,
      g = this.width(),
      h = this.coordinates();
    return this.settings.freeDrag || a.each(h, a.proxy(function (a, i) {
      return "left" === c && b > i - f && b < i + f ? e = a : "right" === c && b > i - g - f && b < i - g + f ? e = a + 1 : this.op(b, "<", i) && this.op(b, ">", h[a + 1] !== d ? h[a + 1] : i - g) && (e = "left" === c ? a + 1 : a), -1 === e
    }, this)), this.settings.loop || (this.op(b, ">", h[this.minimum()]) ? e = b = this.minimum() : this.op(b, "<", h[this.maximum()]) && (e = b = this.maximum())), e
  }, e.prototype.animate = function (b) {
    var c = this.speed() > 0;
    this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
      transform: "translate3d(" + b + "px,0px,0px)",
      transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
    }) : c ? this.$stage.animate({
      left: b + "px"
    }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
      left: b + "px"
    })
  }, e.prototype.is = function (a) {
    return this._states.current[a] && this._states.current[a] > 0
  }, e.prototype.current = function (a) {
    if (a === d) return this._current;
    if (0 === this._items.length) return d;
    if (a = this.normalize(a), this._current !== a) {
      var b = this.trigger("change", {
        property: {
          name: "position",
          value: a
        }
      });
      b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
        property: {
          name: "position",
          value: this._current
        }
      })
    }
    return this._current
  }, e.prototype.invalidate = function (b) {
    return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function (a, b) {
      return b
    })
  }, e.prototype.reset = function (a) {
    (a = this.normalize(a)) !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
  }, e.prototype.normalize = function (a, b) {
    var c = this._items.length,
      e = b ? 0 : this._clones.length;
    return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2), a
  }, e.prototype.relative = function (a) {
    return a -= this._clones.length / 2, this.normalize(a, !0)
  }, e.prototype.maximum = function (a) {
    var b, c, d, e = this.settings,
      f = this._coordinates.length;
    if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
    else if (e.autoWidth || e.merge) {
      if (b = this._items.length)
        for (c = this._items[--b].width(), d = this.$element.width(); b-- && !((c += this._items[b].width() + this.settings.margin) > d););
      f = b + 1
    } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
    return a && (f -= this._clones.length / 2), Math.max(f, 0)
  }, e.prototype.minimum = function (a) {
    return a ? 0 : this._clones.length / 2
  }, e.prototype.items = function (a) {
    return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
  }, e.prototype.mergers = function (a) {
    return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
  }, e.prototype.clones = function (b) {
    var c = this._clones.length / 2,
      e = c + this._items.length,
      f = function (a) {
        return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2
      };
    return b === d ? a.map(this._clones, function (a, b) {
      return f(b)
    }) : a.map(this._clones, function (a, c) {
      return a === b ? f(c) : null
    })
  }, e.prototype.speed = function (a) {
    return a !== d && (this._speed = a), this._speed
  }, e.prototype.coordinates = function (b) {
    var c, e = 1,
      f = b - 1;
    return b === d ? a.map(this._coordinates, a.proxy(function (a, b) {
      return this.coordinates(b)
    }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0, c = Math.ceil(c))
  }, e.prototype.duration = function (a, b, c) {
    return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
  }, e.prototype.to = function (a, b) {
    var c = this.current(),
      d = null,
      e = a - this.relative(c),
      f = (e > 0) - (e < 0),
      g = this._items.length,
      h = this.minimum(),
      i = this.maximum();
    this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g), a = c + e, (d = ((a - h) % g + g) % g + h) !== a && d - e <= i && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.isVisible() && this.update()
  }, e.prototype.next = function (a) {
    a = a || !1, this.to(this.relative(this.current()) + 1, a)
  }, e.prototype.prev = function (a) {
    a = a || !1, this.to(this.relative(this.current()) - 1, a)
  }, e.prototype.onTransitionEnd = function (a) {
    if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) return !1;
    this.leave("animating"), this.trigger("translated")
  }, e.prototype.viewport = function () {
    var d;
    return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."), d
  }, e.prototype.replace = function (b) {
    this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function () {
      return 1 === this.nodeType
    }).each(a.proxy(function (a, b) {
      b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
    }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
  }, e.prototype.add = function (b, c) {
    var e = this.relative(this._current);
    c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
      content: b,
      position: c
    }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
      content: b,
      position: c
    })
  }, e.prototype.remove = function (a) {
    (a = this.normalize(a, !0)) !== d && (this.trigger("remove", {
      content: this._items[a],
      position: a
    }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
      content: null,
      position: a
    }))
  }, e.prototype.preloadAutoWidthImages = function (b) {
    b.each(a.proxy(function (b, c) {
      this.enter("pre-loading"), c = a(c), a(new Image).one("load", a.proxy(function (a) {
        c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
      }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
    }, this))
  }, e.prototype.destroy = function () {
    this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), !1 !== this.settings.responsive && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));
    for (var d in this._plugins) this._plugins[d].destroy();
    this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.remove(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
  }, e.prototype.op = function (a, b, c) {
    var d = this.settings.rtl;
    switch (b) {
      case "<":
        return d ? a > c : a < c;
      case ">":
        return d ? a < c : a > c;
      case ">=":
        return d ? a <= c : a >= c;
      case "<=":
        return d ? a >= c : a <= c
    }
  }, e.prototype.on = function (a, b, c, d) {
    a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
  }, e.prototype.off = function (a, b, c, d) {
    a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
  }, e.prototype.trigger = function (b, c, d, f, g) {
    var h = {
        item: {
          count: this._items.length,
          index: this.current()
        }
      },
      i = a.camelCase(a.grep(["on", b, d], function (a) {
        return a
      }).join("-").toLowerCase()),
      j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
        relatedTarget: this
      }, h, c));
    return this._supress[b] || (a.each(this._plugins, function (a, b) {
      b.onTrigger && b.onTrigger(j)
    }), this.register({
      type: e.Type.Event,
      name: b
    }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j
  }, e.prototype.enter = function (b) {
    a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
      this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++
    }, this))
  }, e.prototype.leave = function (b) {
    a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
      this._states.current[b]--
    }, this))
  }, e.prototype.register = function (b) {
    if (b.type === e.Type.Event) {
      if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
        var c = a.event.special[b.name]._default;
        a.event.special[b.name]._default = function (a) {
          return !c || !c.apply || a.namespace && -1 !== a.namespace.indexOf("owl") ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
        }, a.event.special[b.name].owl = !0
      }
    } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function (c, d) {
      return a.inArray(c, this._states.tags[b.name]) === d
    }, this)))
  }, e.prototype.suppress = function (b) {
    a.each(b, a.proxy(function (a, b) {
      this._supress[b] = !0
    }, this))
  }, e.prototype.release = function (b) {
    a.each(b, a.proxy(function (a, b) {
      delete this._supress[b]
    }, this))
  }, e.prototype.pointer = function (a) {
    var c = {
      x: null,
      y: null
    };
    return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c
  }, e.prototype.isNumeric = function (a) {
    return !isNaN(parseFloat(a))
  }, e.prototype.difference = function (a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y
    }
  }, a.fn.owlCarousel = function (b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return this.each(function () {
      var d = a(this),
        f = d.data("owl.carousel");
      f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (b, c) {
        f.register({
          type: e.Type.Event,
          name: c
        }), f.$element.on(c + ".owl.carousel.core", a.proxy(function (a) {
          a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]))
        }, f))
      })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
    })
  }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
  var e = function (b) {
    this._core = b, this._interval = null, this._visible = null, this._handlers = {
      "initialized.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.autoRefresh && this.watch()
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
  };
  e.Defaults = {
    autoRefresh: !0,
    autoRefreshInterval: 500
  }, e.prototype.watch = function () {
    this._interval || (this._visible = this._core.isVisible(), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
  }, e.prototype.refresh = function () {
    this._core.isVisible() !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
  }, e.prototype.destroy = function () {
    var a, c;
    b.clearInterval(this._interval);
    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
    for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
  var e = function (b) {
    this._core = b, this._loaded = [], this._handlers = {
      "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function (b) {
        if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) {
          var c = this._core.settings,
            e = c.center && Math.ceil(c.items / 2) || c.items,
            f = c.center && -1 * e || 0,
            g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f,
            h = this._core.clones().length,
            i = a.proxy(function (a, b) {
              this.load(b)
            }, this);
          for (c.lazyLoadEager > 0 && (e += c.lazyLoadEager, c.loop && (g -= c.lazyLoadEager, e++)); f++ < e;) this.load(h / 2 + this._core.relative(g)), h && a.each(this._core.clones(this._core.relative(g)), i), g++
        }
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
  };
  e.Defaults = {
    lazyLoad: !1,
    lazyLoadEager: 0
  }, e.prototype.load = function (c) {
    var d = this._core.$stage.children().eq(c),
      e = d && d.find(".owl-lazy");
    !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function (c, d) {
      var e, f = a(d),
        g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src") || f.attr("data-srcset");
      this._core.trigger("load", {
        element: f,
        url: g
      }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function () {
        f.css("opacity", 1), this._core.trigger("loaded", {
          element: f,
          url: g
        }, "lazy")
      }, this)).attr("src", g) : f.is("source") ? f.one("load.owl.lazy", a.proxy(function () {
        this._core.trigger("loaded", {
          element: f,
          url: g
        }, "lazy")
      }, this)).attr("srcset", g) : (e = new Image, e.onload = a.proxy(function () {
        f.css({
          "background-image": 'url("' + g + '")',
          opacity: "1"
        }), this._core.trigger("loaded", {
          element: f,
          url: g
        }, "lazy")
      }, this), e.src = g)
    }, this)), this._loaded.push(d.get(0)))
  }, e.prototype.destroy = function () {
    var a, b;
    for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
  var e = function (c) {
    this._core = c, this._previousHeight = null, this._handlers = {
      "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.autoHeight && this.update()
      }, this),
      "changed.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.autoHeight && "position" === a.property.name && this.update()
      }, this),
      "loaded.owl.lazy": a.proxy(function (a) {
        a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._intervalId = null;
    var d = this;
    a(b).on("load", function () {
      d._core.settings.autoHeight && d.update()
    }), a(b).resize(function () {
      d._core.settings.autoHeight && (null != d._intervalId && clearTimeout(d._intervalId), d._intervalId = setTimeout(function () {
        d.update()
      }, 250))
    })
  };
  e.Defaults = {
    autoHeight: !1,
    autoHeightClass: "owl-height"
  }, e.prototype.update = function () {
    var b = this._core._current,
      c = b + this._core.settings.items,
      d = this._core.settings.lazyLoad,
      e = this._core.$stage.children().toArray().slice(b, c),
      f = [],
      g = 0;
    a.each(e, function (b, c) {
      f.push(a(c).height())
    }), g = Math.max.apply(null, f), g <= 1 && d && this._previousHeight && (g = this._previousHeight), this._previousHeight = g, this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)
  }, e.prototype.destroy = function () {
    var a, b;
    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
  var e = function (b) {
    this._core = b, this._videos = {}, this._playing = null, this._handlers = {
      "initialized.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.register({
          type: "state",
          name: "playing",
          tags: ["interacting"]
        })
      }, this),
      "resize.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
      }, this),
      "refreshed.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
      }, this),
      "changed.owl.carousel": a.proxy(function (a) {
        a.namespace && "position" === a.property.name && this._playing && this.stop()
      }, this),
      "prepared.owl.carousel": a.proxy(function (b) {
        if (b.namespace) {
          var c = a(b.content).find(".owl-video");
          c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
        }
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a) {
      this.play(a)
    }, this))
  };
  e.Defaults = {
    video: !1,
    videoHeight: !1,
    videoWidth: !1
  }, e.prototype.fetch = function (a, b) {
    var c = function () {
        return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube"
      }(),
      d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
      e = a.attr("data-width") || this._core.settings.videoWidth,
      f = a.attr("data-height") || this._core.settings.videoHeight,
      g = a.attr("href");
    if (!g) throw new Error("Missing video URL.");
    if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
    else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
    else {
      if (!(d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
      c = "vzaar"
    }
    d = d[6], this._videos[g] = {
      type: c,
      id: d,
      width: e,
      height: f
    }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
  }, e.prototype.thumbnail = function (b, c) {
    var d, e, f, g = c.width && c.height ? "width:" + c.width + "px;height:" + c.height + "px;" : "",
      h = b.find("img"),
      i = "src",
      j = "",
      k = this._core.settings,
      l = function (c) {
        e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? a("<div/>", {
          class: "owl-video-tn " + j,
          srcType: c
        }) : a("<div/>", {
          class: "owl-video-tn",
          style: "opacity:1;background-image:url(" + c + ")"
        }), b.after(d), b.after(e)
      };
    if (b.wrap(a("<div/>", {
        class: "owl-video-wrapper",
        style: g
      })), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length) return l(h.attr(i)), h.remove(), !1;
    "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type ? a.ajax({
      type: "GET",
      url: "//vimeo.com/api/v2/video/" + c.id + ".json",
      jsonp: "callback",
      dataType: "jsonp",
      success: function (a) {
        f = a[0].thumbnail_large, l(f)
      }
    }) : "vzaar" === c.type && a.ajax({
      type: "GET",
      url: "//vzaar.com/api/videos/" + c.id + ".json",
      jsonp: "callback",
      dataType: "jsonp",
      success: function (a) {
        f = a.framegrab_url, l(f)
      }
    })
  }, e.prototype.stop = function () {
    this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
  }, e.prototype.play = function (b) {
    var c, d = a(b.target),
      e = d.closest("." + this._core.settings.itemClass),
      f = this._videos[e.attr("data-video")],
      g = f.width || "100%",
      h = f.height || this._core.$stage.height();
    this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), c = a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'), c.attr("height", h), c.attr("width", g), "youtube" === f.type ? c.attr("src", "//www.youtube.com/embed/" + f.id + "?autoplay=1&rel=0&v=" + f.id) : "vimeo" === f.type ? c.attr("src", "//player.vimeo.com/video/" + f.id + "?autoplay=1") : "vzaar" === f.type && c.attr("src", "//view.vzaar.com/" + f.id + "/player?autoplay=true"), a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"))
  }, e.prototype.isInFullScreen = function () {
    var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
    return b && a(b).parent().hasClass("owl-video-frame")
  }, e.prototype.destroy = function () {
    var a, b;
    this._core.$element.off("click.owl.video");
    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.Video = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
  var e = function (b) {
    this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
      "change.owl.carousel": a.proxy(function (a) {
        a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
      }, this),
      "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) {
        a.namespace && (this.swapping = "translated" == a.type)
      }, this),
      "translate.owl.carousel": a.proxy(function (a) {
        a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
      }, this)
    }, this.core.$element.on(this.handlers)
  };
  e.Defaults = {
    animateOut: !1,
    animateIn: !1
  }, e.prototype.swap = function () {
    if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
      this.core.speed(0);
      var b, c = a.proxy(this.clear, this),
        d = this.core.$stage.children().eq(this.previous),
        e = this.core.$stage.children().eq(this.next),
        f = this.core.settings.animateIn,
        g = this.core.settings.animateOut;
      this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({
        left: b + "px"
      }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
    }
  }, e.prototype.clear = function (b) {
    a(b.target).css({
      left: ""
    }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
  }, e.prototype.destroy = function () {
    var a, b;
    for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
  var e = function (b) {
    this._core = b, this._call = null, this._time = 0, this._timeout = 0, this._paused = !0, this._handlers = {
      "changed.owl.carousel": a.proxy(function (a) {
        a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._paused && (this._time = 0)
      }, this),
      "initialized.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.autoplay && this.play()
      }, this),
      "play.owl.autoplay": a.proxy(function (a, b, c) {
        a.namespace && this.play(b, c)
      }, this),
      "stop.owl.autoplay": a.proxy(function (a) {
        a.namespace && this.stop()
      }, this),
      "mouseover.owl.autoplay": a.proxy(function () {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
      }, this),
      "mouseleave.owl.autoplay": a.proxy(function () {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
      }, this),
      "touchstart.owl.core": a.proxy(function () {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
      }, this),
      "touchend.owl.core": a.proxy(function () {
        this._core.settings.autoplayHoverPause && this.play()
      }, this)
    }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options)
  };
  e.Defaults = {
    autoplay: !1,
    autoplayTimeout: 5e3,
    autoplayHoverPause: !1,
    autoplaySpeed: !1
  }, e.prototype._next = function (d) {
    this._call = b.setTimeout(a.proxy(this._next, this, d), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()), this._core.is("interacting") || c.hidden || this._core.next(d || this._core.settings.autoplaySpeed)
  }, e.prototype.read = function () {
    return (new Date).getTime() - this._time
  }, e.prototype.play = function (c, d) {
    var e;
    this._core.is("rotating") || this._core.enter("rotating"), c = c || this._core.settings.autoplayTimeout, e = Math.min(this._time % (this._timeout || c), c), this._paused ? (this._time = this.read(), this._paused = !1) : b.clearTimeout(this._call), this._time += this.read() % c - e, this._timeout = c, this._call = b.setTimeout(a.proxy(this._next, this, d), c - e)
  }, e.prototype.stop = function () {
    this._core.is("rotating") && (this._time = 0, this._paused = !0, b.clearTimeout(this._call), this._core.leave("rotating"))
  }, e.prototype.pause = function () {
    this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused = !0, b.clearTimeout(this._call))
  }, e.prototype.destroy = function () {
    var a, b;
    this.stop();
    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
  "use strict";
  var e = function (b) {
    this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
      next: this._core.next,
      prev: this._core.prev,
      to: this._core.to
    }, this._handlers = {
      "prepared.owl.carousel": a.proxy(function (b) {
        b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
      }, this),
      "added.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
      }, this),
      "remove.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
      }, this),
      "changed.owl.carousel": a.proxy(function (a) {
        a.namespace && "position" == a.property.name && this.draw()
      }, this),
      "initialized.owl.carousel": a.proxy(function (a) {
        a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
      }, this),
      "refreshed.owl.carousel": a.proxy(function (a) {
        a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
  };
  e.Defaults = {
    nav: !1,
    navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
    navSpeed: !1,
    navElement: 'button type="button" role="presentation"',
    navContainer: !1,
    navContainerClass: "owl-nav",
    navClass: ["owl-prev", "owl-next"],
    slideBy: 1,
    dotClass: "owl-dot",
    dotsClass: "owl-dots",
    dots: !0,
    dotsEach: !1,
    dotsData: !1,
    dotsSpeed: !1,
    dotsContainer: !1
  }, e.prototype.initialize = function () {
    var b, c = this._core.settings;
    this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function (a) {
      this.prev(c.navSpeed)
    }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function (a) {
      this.next(c.navSpeed)
    }, this)), c.dotsData || (this._templates = [a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "button", a.proxy(function (b) {
      var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
      b.preventDefault(), this.to(d, c.dotsSpeed)
    }, this));
    for (b in this._overrides) this._core[b] = a.proxy(this[b], this)
  }, e.prototype.destroy = function () {
    var a, b, c, d, e;
    e = this._core.settings;
    for (a in this._handlers) this.$element.off(a, this._handlers[a]);
    for (b in this._controls) "$relative" === b && e.navContainer ? this._controls[b].html("") : this._controls[b].remove();
    for (d in this.overides) this._core[d] = this._overrides[d];
    for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
  }, e.prototype.update = function () {
    var a, b, c, d = this._core.clones().length / 2,
      e = d + this._core.items().length,
      f = this._core.maximum(!0),
      g = this._core.settings,
      h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
    if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy)
      for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
        if (b >= h || 0 === b) {
          if (this._pages.push({
              start: Math.min(f, a - d),
              end: a - d + h - 1
            }), Math.min(f, a - d) === f) break;
          b = 0, ++c
        }
        b += this._core.mergers(this._core.relative(a))
      }
  }, e.prototype.draw = function () {
    var b, c = this._core.settings,
      d = this._core.items().length <= c.items,
      e = this._core.relative(this._core.current()),
      f = c.loop || c.rewind;
    this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
  }, e.prototype.onTrigger = function (b) {
    var c = this._core.settings;
    b.page = {
      index: a.inArray(this.current(), this._pages),
      count: this._pages.length,
      size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
    }
  }, e.prototype.current = function () {
    var b = this._core.relative(this._core.current());
    return a.grep(this._pages, a.proxy(function (a, c) {
      return a.start <= b && a.end >= b
    }, this)).pop()
  }, e.prototype.getPosition = function (b) {
    var c, d, e = this._core.settings;
    return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
  }, e.prototype.next = function (b) {
    a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
  }, e.prototype.prev = function (b) {
    a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
  }, e.prototype.to = function (b, c, d) {
    var e;
    !d && this._pages.length ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c)
  }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
  "use strict";
  var e = function (c) {
    this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
      "initialized.owl.carousel": a.proxy(function (c) {
        c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
      }, this),
      "prepared.owl.carousel": a.proxy(function (b) {
        if (b.namespace) {
          var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
          if (!c) return;
          this._hashes[c] = b.content
        }
      }, this),
      "changed.owl.carousel": a.proxy(function (c) {
        if (c.namespace && "position" === c.property.name) {
          var d = this._core.items(this._core.relative(this._core.current())),
            e = a.map(this._hashes, function (a, b) {
              return a === d ? b : null
            }).join();
          if (!e || b.location.hash.slice(1) === e) return;
          b.location.hash = e
        }
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function (a) {
      var c = b.location.hash.substring(1),
        e = this._core.$stage.children(),
        f = this._hashes[c] && e.index(this._hashes[c]);
      f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
    }, this))
  };
  e.Defaults = {
    URLhashListener: !1
  }, e.prototype.destroy = function () {
    var c, d;
    a(b).off("hashchange.owl.navigation");
    for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
    for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
  function e(b, c) {
    var e = !1,
      f = b.charAt(0).toUpperCase() + b.slice(1);
    return a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
      if (g[b] !== d) return e = !c || b, !1
    }), e
  }

  function f(a) {
    return e(a, !0)
  }
  var g = a("<support>").get(0).style,
    h = "Webkit Moz O ms".split(" "),
    i = {
      transition: {
        end: {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd",
          transition: "transitionend"
        }
      },
      animation: {
        end: {
          WebkitAnimation: "webkitAnimationEnd",
          MozAnimation: "animationend",
          OAnimation: "oAnimationEnd",
          animation: "animationend"
        }
      }
    },
    j = {
      csstransforms: function () {
        return !!e("transform")
      },
      csstransforms3d: function () {
        return !!e("perspective")
      },
      csstransitions: function () {
        return !!e("transition")
      },
      cssanimations: function () {
        return !!e("animation")
      }
    };
  j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d())
}(window.Zepto || window.jQuery, window, document);


/*
 * jquery-match-height 0.7.2 by @liabru
 * http://brm.io/jquery-match-height/
 * License MIT
 */
! function (t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t) {
  var e = -1,
    o = -1,
    n = function (t) {
      return parseFloat(t) || 0
    },
    a = function (e) {
      var o = 1,
        a = t(e),
        i = null,
        r = [];
      return a.each(function () {
        var e = t(this),
          a = e.offset().top - n(e.css("margin-top")),
          s = r.length > 0 ? r[r.length - 1] : null;
        null === s ? r.push(e) : Math.floor(Math.abs(i - a)) <= o ? r[r.length - 1] = s.add(e) : r.push(e), i = a
      }), r
    },
    i = function (e) {
      var o = {
        byRow: !0,
        property: "height",
        target: null,
        remove: !1
      };
      return "object" == typeof e ? t.extend(o, e) : ("boolean" == typeof e ? o.byRow = e : "remove" === e && (o.remove = !0), o)
    },
    r = t.fn.matchHeight = function (e) {
      var o = i(e);
      if (o.remove) {
        var n = this;
        return this.css(o.property, ""), t.each(r._groups, function (t, e) {
          e.elements = e.elements.not(n)
        }), this
      }
      return this.length <= 1 && !o.target ? this : (r._groups.push({
        elements: this,
        options: o
      }), r._apply(this, o), this)
    };
  r.version = "0.7.2", r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null,
    r._afterUpdate = null, r._rows = a, r._parse = n, r._parseOptions = i, r._apply = function (e, o) {
      var s = i(o),
        h = t(e),
        l = [h],
        c = t(window).scrollTop(),
        p = t("html").outerHeight(!0),
        u = h.parents().filter(":hidden");
      return u.each(function () {
          var e = t(this);
          e.data("style-cache", e.attr("style"))
        }), u.css("display", "block"), s.byRow && !s.target && (h.each(function () {
          var e = t(this),
            o = e.css("display");
          "inline-block" !== o && "flex" !== o && "inline-flex" !== o && (o = "block"), e.data("style-cache", e.attr("style")), e.css({
            display: o,
            "padding-top": "0",
            "padding-bottom": "0",
            "margin-top": "0",
            "margin-bottom": "0",
            "border-top-width": "0",
            "border-bottom-width": "0",
            height: "100px",
            overflow: "hidden"
          })
        }), l = a(h), h.each(function () {
          var e = t(this);
          e.attr("style", e.data("style-cache") || "")
        })), t.each(l, function (e, o) {
          var a = t(o),
            i = 0;
          if (s.target) i = s.target.outerHeight(!1);
          else {
            if (s.byRow && a.length <= 1) return void a.css(s.property, "");
            a.each(function () {
              var e = t(this),
                o = e.attr("style"),
                n = e.css("display");
              "inline-block" !== n && "flex" !== n && "inline-flex" !== n && (n = "block");
              var a = {
                display: n
              };
              a[s.property] = "", e.css(a), e.outerHeight(!1) > i && (i = e.outerHeight(!1)), o ? e.attr("style", o) : e.css("display", "")
            })
          }
          a.each(function () {
            var e = t(this),
              o = 0;
            s.target && e.is(s.target) || ("border-box" !== e.css("box-sizing") && (o += n(e.css("border-top-width")) + n(e.css("border-bottom-width")), o += n(e.css("padding-top")) + n(e.css("padding-bottom"))), e.css(s.property, i - o + "px"))
          })
        }), u.each(function () {
          var e = t(this);
          e.attr("style", e.data("style-cache") || null)
        }), r._maintainScroll && t(window).scrollTop(c / p * t("html").outerHeight(!0)),
        this
    }, r._applyDataApi = function () {
      var e = {};
      t("[data-match-height], [data-mh]").each(function () {
        var o = t(this),
          n = o.attr("data-mh") || o.attr("data-match-height");
        n in e ? e[n] = e[n].add(o) : e[n] = o
      }), t.each(e, function () {
        this.matchHeight(!0)
      })
    };
  var s = function (e) {
    r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function () {
      r._apply(this.elements, this.options)
    }), r._afterUpdate && r._afterUpdate(e, r._groups)
  };
  r._update = function (n, a) {
    if (a && "resize" === a.type) {
      var i = t(window).width();
      if (i === e) return;
      e = i;
    }
    n ? o === -1 && (o = setTimeout(function () {
      s(a), o = -1
    }, r._throttle)) : s(a)
  }, t(r._applyDataApi);
  var h = t.fn.on ? "on" : "bind";
  t(window)[h]("load", function (t) {
    r._update(!1, t)
  }), t(window)[h]("resize orientationchange", function (t) {
    r._update(!0, t)
  })
});
//
//Dropkick
//
! function () {
  if (!window.CustomEvent && document.createEventObject) return void(window.CustomEvent = function (e, t) {
    if (!arguments.length) throw new Error("Not enough arguments");
    var s = {
        type: e,
        bubbles: !1,
        cancelable: !1,
        detail: null
      },
      i = document.createEventObject();
    for (var n in s) i[n] = s[n];
    for (var n in t) i[n] = t[n];
    return i
  });
  try {
    new CustomEvent("test")
  } catch (e) {
    var t = function (e, t) {
      if (!arguments.length) throw new Error("Not enough arguments");
      var s = {
        bubbles: !1,
        cancelable: !1,
        detail: null
      };
      for (var i in t) s[i] = t[i];
      var n = document.createEvent("CustomEvent");
      return n.initCustomEvent(e, s.bubbles, s.cancelable, s.detail), n
    };
    t.prototype = (window.CustomEvent || window.Event).prototype, window.CustomEvent = t
  }
}(),
function () {
  if (!document.addEventListener && window.Element && window.Event) {
    var e = "__events",
      t = "__immediateStopped";
    Event.prototype.NONE = Event.NONE = 0, Event.prototype.CAPTURING_PHASE = Event.CAPTURING_PHASE = 1, Event.prototype.AT_TARGET = Event.AT_TARGET = 2, Event.prototype.BUBBLING_PHASE = Event.BUBBLING_PHASE = 3, Event.prototype.preventDefault = function () {
      this.cancelable !== !1 && (this.returnValue = !1)
    }, Event.prototype.stopPropagation = function () {
      this.cancelBubble = !0
    }, Event.prototype.stopImmediatePropagation = function () {
      this[t] = this.cancelBubble = !0
    };
    for (var s = function (e, t) {
        return e.timeStamp = +new Date, e.target || (e.target = e.srcElement || t), e.pageX = e.clientX + document.documentElement.scrollLeft, e.pageY = e.clientY + document.documentElement.scrollTop, e.relatedTarget = "mouseover" == e.type ? e.fromElement : "mouseout" == e.type ? e.toElement : null, e
      }, i = function (e, t, s) {
        for (var i = 0; i < e.length; i++) {
          var n = e[i];
          if (n.useCapture == s && n.listener == t) return i
        }
        return -1
      }, n = function (e, t, s) {
        e.currentTarget = s, "function" == typeof t ? t.call(s, e) : t.handleEvent(e)
      }, a = function (e) {
        for (var t = []; e.parentNode;) t.unshift(e.parentNode), e = e.parentNode;
        return t
      }, o = function (s, i, a) {
        s.eventPhase = a;
        for (var o = 0; o < i.length; o++) {
          for (var r = i[o], l = [], d = (r[e] || {})[s.type] || [], h = 0; h < d.length; h++) {
            var c = d[h];
            c.useCapture && a == Event.BUBBLING_PHASE || (c.useCapture || a != Event.CAPTURING_PHASE) && l.push(c.listener)
          }
          for (h = 0; h < l.length;) try {
            for (; h < l.length;) {
              var u = l[h++];
              if (n(s, u, r), s[t]) return !0
            }
          } catch (p) {
            setTimeout(function () {
              throw p
            }, 0)
          }
          if (s.cancelBubble) return !0
        }
        return !1
      }, r = function (e) {
        s(e, this);
        var t = a(e.target);
        return t.length && o(e, t, Event.CAPTURING_PHASE) ? e.returnValue : o(e, [e.target], Event.AT_TARGET) ? e.returnValue : t.length && e.bubbles !== !1 && (t.reverse(), o(e, t, Event.BUBBLING_PHASE)) ? e.returnValue : (e.stopPropagation(), e.returnValue)
      }, l = ({
        addEventListener: function (t, s, n) {
          var a = this,
            o = (this[e] || {})[t] || [],
            l = o.length;
          if (!(i(o, s, n) > -1)) {
            if (e in this) var d = this[e];
            else {
              var d = {
                _handler: function () {
                  r.apply(a, arguments)
                }
              };
              this[e] = d
            }
            t in d || (d[t] = []), d[t].push({
              listener: s,
              useCapture: n
            }), l || this.attachEvent("on" + t, d._handler)
          }
        },
        removeEventListener: function (t, s, n) {
          var a = (this[e] || {})[t] || [],
            o = i(a, s, n); - 1 != o && (a.splice(o, 1), a.length || this.detachEvent("on" + t, this[e]._handler))
        },
        dispatchEvent: function (e) {
          return e.returnValue = !0, r.call(this, e)
        }
      }), d = [Element, window.constructor, document.constructor]; d.length;) {
      var h = d.pop();
      for (var c in l) h.prototype[c] = l[c]
    }
  }
}(), Array.prototype.forEach || (Array.prototype.forEach = function (e, t) {
    var s, i;
    if (null == this) throw new TypeError(" this is null or not defined");
    var n = Object(this),
      a = n.length >>> 0;
    if ("function" != typeof e) throw new TypeError(e + " is not a function");
    for (arguments.length > 1 && (s = t), i = 0; a > i;) {
      var o;
      i in n && (o = n[i], e.call(s, o, i, n)), i++
    }
  }), Array.prototype.indexOf || (Array.prototype.indexOf = function (e, t) {
    var s;
    if (null == this) throw new TypeError('"this" is null or not defined');
    var i = Object(this),
      n = i.length >>> 0;
    if (0 === n) return -1;
    var a = +t || 0;
    if (Math.abs(a) === 1 / 0 && (a = 0), a >= n) return -1;
    for (s = Math.max(a >= 0 ? a : n - Math.abs(a), 0); n > s;) {
      if (s in i && i[s] === e) return s;
      s++
    }
    return -1
  }),
  function (e, t, s) {
    var i, n = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      a = e.parent !== e.self && location.host === parent.location.host,
      o = -1 !== navigator.appVersion.indexOf("MSIE"),
      r = function (s, i) {
        var n, a;
        if (this === e) return new r(s, i);
        for ("string" == typeof s && "#" === s[0] && (s = t.getElementById(s.substr(1))), n = 0; n < r.uid; n++)
          if (a = r.cache[n], a instanceof r && a.data.select === s) return h.extend(a.data.settings, i), a;
        return s ? "SELECT" === s.nodeName ? this.init(s, i) : void 0 : (console.error("You must pass a select to DropKick"), !1)
      },
      l = function () {},
      d = {
        initialize: l,
        change: l,
        open: l,
        close: l,
        search: "strict"
      },
      h = {
        hasClass: function (e, t) {
          var s = new RegExp("(^|\\s+)" + t + "(\\s+|$)");
          return e && s.test(e.className)
        },
        addClass: function (e, t) {
          e && !h.hasClass(e, t) && (e.className += " " + t)
        },
        removeClass: function (e, t) {
          var s = new RegExp("(^|\\s+)" + t + "(\\s+|$)");
          e && (e.className = e.className.replace(s, " "))
        },
        toggleClass: function (e, t) {
          var s = h.hasClass(e, t) ? "remove" : "add";
          h[s + "Class"](e, t)
        },
        extend: function (e) {
          return Array.prototype.slice.call(arguments, 1).forEach(function (t) {
            if (t)
              for (var s in t) e[s] = t[s]
          }), e
        },
        offset: function (s) {
          var i = s.getBoundingClientRect() || {
              top: 0,
              left: 0
            },
            n = t.documentElement,
            a = o ? n.scrollTop : e.pageYOffset,
            r = o ? n.scrollLeft : e.pageXOffset;
          return {
            top: i.top + a - n.clientTop,
            left: i.left + r - n.clientLeft
          }
        },
        position: function (e, t) {
          for (var s = {
              top: 0,
              left: 0
            }; e && e !== t;) s.top += e.offsetTop, s.left += e.offsetLeft, e = e.parentNode;
          return s
        },
        closest: function (e, t) {
          for (; e;) {
            if (e === t) return e;
            e = e.parentNode
          }
          return !1
        },
        create: function (e, s) {
          var i, n = t.createElement(e);
          s || (s = {});
          for (i in s) s.hasOwnProperty(i) && ("innerHTML" === i ? n.innerHTML = s[i] : n.setAttribute(i, s[i]));
          return n
        },
        deferred: function (t) {
          return function () {
            var s = arguments,
              i = this;
            e.setTimeout(function () {
              t.apply(i, s)
            }, 1)
          }
        }
      };
    r.cache = {}, r.uid = 0, r.prototype = {
      add: function (e, s) {
        var i, n, a;
        "string" == typeof e && (i = e, e = t.createElement("option"), e.text = i), "OPTION" === e.nodeName && (n = h.create("li", {
          "class": "dk-option",
          "data-value": e.value,
          innerHTML: e.text,
          role: "option",
          "aria-selected": "false",
          id: "dk" + this.data.cacheID + "-" + (e.id || e.value.replace(" ", "-"))
        }), h.addClass(n, e.className), this.length += 1, e.disabled && (h.addClass(n, "dk-option-disabled"), n.setAttribute("aria-disabled", "true")), this.data.select.add(e, s), "number" == typeof s && (s = this.item(s)), this.options.indexOf(s) > -1 ? s.parentNode.insertBefore(n, s) : this.data.elem.lastChild.appendChild(n), n.addEventListener("mouseover", this), a = this.options.indexOf(s), this.options.splice(a, 0, n), e.selected && this.select(a))
      },
      item: function (e) {
        return e = 0 > e ? this.options.length + e : e, this.options[e] || null
      },
      remove: function (e) {
        var t = this.item(e);
        t.parentNode.removeChild(t), this.options.splice(e, 1), this.data.select.remove(e), this.select(this.data.select.selectedIndex), this.length -= 1
      },
      init: function (e, s) {
        var o, l = r.build(e, "dk" + r.uid);
        if (this.data = {}, this.data.select = e, this.data.elem = l.elem, this.data.settings = h.extend({}, d, s), this.disabled = e.disabled, this.form = e.form, this.length = e.length, this.multiple = e.multiple, this.options = l.options.slice(0), this.selectedIndex = e.selectedIndex, this.selectedOptions = l.selected.slice(0), this.value = e.value, this.data.cacheID = r.uid, r.cache[this.data.cacheID] = this, this.data.settings.initialize.call(this), r.uid += 1, this._changeListener || (e.addEventListener("change", this), this._changeListener = !0), !n || this.data.settings.mobile) {
          if (e.parentNode.insertBefore(this.data.elem, e), e.setAttribute("data-dkCacheId", this.data.cacheID), this.data.elem.addEventListener("click", this), this.data.elem.addEventListener("keydown", this), this.data.elem.addEventListener("keypress", this), this.form && this.form.addEventListener("reset", this), !this.multiple)
            for (o = 0; o < this.options.length; o++) this.options[o].addEventListener("mouseover", this);
          i || (t.addEventListener("click", r.onDocClick), a && parent.document.addEventListener("click", r.onDocClick), i = !0)
        }
        return this
      },
      close: function () {
        var e, t = this.data.elem;
        if (!this.isOpen || this.multiple) return !1;
        for (e = 0; e < this.options.length; e++) h.removeClass(this.options[e], "dk-option-highlight");
        t.lastChild.setAttribute("aria-expanded", "false"), h.removeClass(t.lastChild, "dk-select-options-highlight"), h.removeClass(t, "dk-select-open-(up|down)"), this.isOpen = !1, this.data.settings.close.call(this)
      },
      open: h.deferred(function () {
        var s, i, n, a, r, l, d = this.data.elem,
          c = d.lastChild;
        return r = o ? h.offset(d).top - t.documentElement.scrollTop : h.offset(d).top - e.scrollY, l = e.innerHeight - (r + d.offsetHeight), this.isOpen || this.multiple ? !1 : (c.style.display = "block", s = c.offsetHeight, c.style.display = "", i = r > s, n = l > s, a = i && !n ? "-up" : "-down", this.isOpen = !0, h.addClass(d, "dk-select-open" + a), c.setAttribute("aria-expanded", "true"), this._scrollTo(this.options.length - 1), this._scrollTo(this.selectedIndex), void this.data.settings.open.call(this))
      }),
      disable: function (e, t) {
        var i = "dk-option-disabled";
        (0 === arguments.length || "boolean" == typeof e) && (t = e === s ? !0 : !1, e = this.data.elem, i = "dk-select-disabled", this.disabled = t), t === s && (t = !0), "number" == typeof e && (e = this.item(e)), h[t ? "addClass" : "removeClass"](e, i)
      },
      select: function (e, t) {
        var s, i, n, a, o = this.data.select;
        if ("number" == typeof e && (e = this.item(e)), "string" == typeof e)
          for (s = 0; s < this.length; s++) this.options[s].getAttribute("data-value") === e && (e = this.options[s]);
        return !e || "string" == typeof e || !t && h.hasClass(e, "dk-option-disabled") ? !1 : h.hasClass(e, "dk-option") ? (i = this.options.indexOf(e), n = o.options[i], this.multiple ? (h.toggleClass(e, "dk-option-selected"), n.selected = !n.selected, h.hasClass(e, "dk-option-selected") ? (e.setAttribute("aria-selected", "true"), this.selectedOptions.push(e)) : (e.setAttribute("aria-selected", "false"), i = this.selectedOptions.indexOf(e), this.selectedOptions.splice(i, 1))) : (a = this.data.elem.firstChild, this.selectedOptions.length && (h.removeClass(this.selectedOptions[0], "dk-option-selected"), this.selectedOptions[0].setAttribute("aria-selected", "false")), h.addClass(e, "dk-option-selected"), e.setAttribute("aria-selected", "true"), a.setAttribute("aria-activedescendant", e.id), a.className = "dk-selected " + n.className, a.innerHTML = n.text, this.selectedOptions[0] = e, n.selected = !0), this.selectedIndex = o.selectedIndex, this.value = o.value, t || this.data.select.dispatchEvent(new CustomEvent("change")), e) : void 0
      },
      selectOne: function (e, t) {
        return this.reset(!0), this._scrollTo(e), this.select(e, t)
      },
      search: function (e, t) {
        var s, i, n, a, o, r, l, d, h = this.data.select.options,
          c = [];
        if (!e) return this.options;
        for (t = t ? t.toLowerCase() : "strict", t = "fuzzy" === t ? 2 : "partial" === t ? 1 : 0, d = new RegExp((t ? "" : "^") + e, "i"), s = 0; s < h.length; s++)
          if (n = h[s].text.toLowerCase(), 2 == t) {
            for (i = e.toLowerCase().split(""), a = o = r = l = 0; o < n.length;) n[o] === i[a] ? (r += 1 + r, a++) : r = 0, l += r, o++;
            a === i.length && c.push({
              e: this.options[s],
              s: l,
              i: s
            })
          } else d.test(n) && c.push(this.options[s]);
        return 2 === t && (c = c.sort(function (e, t) {
          return t.s - e.s || e.i - t.i
        }).reduce(function (e, t) {
          return e[e.length] = t.e, e
        }, [])), c
      },
      focus: function () {
        this.disabled || (this.multiple ? this.data.elem : this.data.elem.children[0]).focus()
      },
      reset: function (e) {
        var t, s = this.data.select;
        for (this.selectedOptions.length = 0, t = 0; t < s.options.length; t++) s.options[t].selected = !1, h.removeClass(this.options[t], "dk-option-selected"), this.options[t].setAttribute("aria-selected", "false"), !e && s.options[t].defaultSelected && this.select(t, !0);
        this.selectedOptions.length || this.multiple || this.select(0, !0)
      },
      refresh: function () {
        this.dispose().init(this.data.select, this.data.settings)
      },
      dispose: function () {
        return delete r.cache[this.data.cacheID], this.data.elem.parentNode.removeChild(this.data.elem), this.data.select.removeAttribute("data-dkCacheId"), this
      },
      handleEvent: function (e) {
        if (!this.disabled) switch (e.type) {
          case "click":
            this._delegate(e);
            break;
          case "keydown":
            this._keyHandler(e);
            break;
          case "keypress":
            this._searchOptions(e);
            break;
          case "mouseover":
            this._highlight(e);
            break;
          case "reset":
            this.reset();
            break;
          case "change":
            this.data.settings.change.call(this)
        }
      },
      _delegate: function (t) {
        var s, i, n, a, o = t.target;
        if (h.hasClass(o, "dk-option-disabled")) return !1;
        if (this.multiple) {
          if (h.hasClass(o, "dk-option"))
            if (s = e.getSelection(), "Range" === s.type && s.collapseToStart(), t.shiftKey)
              if (n = this.options.indexOf(this.selectedOptions[0]), a = this.options.indexOf(this.selectedOptions[this.selectedOptions.length - 1]), i = this.options.indexOf(o), i > n && a > i && (i = n), i > a && a > n && (a = n), this.reset(!0), a > i)
                for (; a + 1 > i;) this.select(i++);
              else
                for (; i > a - 1;) this.select(i--);
          else t.ctrlKey || t.metaKey ? this.select(o) : (this.reset(!0), this.select(o))
        } else this[this.isOpen ? "close" : "open"](), h.hasClass(o, "dk-option") && this.select(o)
      },
      _highlight: function (e) {
        var t, s = e.target;
        if (!this.multiple) {
          for (t = 0; t < this.options.length; t++) h.removeClass(this.options[t], "dk-option-highlight");
          h.addClass(this.data.elem.lastChild, "dk-select-options-highlight"), h.addClass(s, "dk-option-highlight")
        }
      },
      _keyHandler: function (e) {
        var t, s, i = this.selectedOptions,
          n = this.options,
          a = 1,
          o = {
            tab: 9,
            enter: 13,
            esc: 27,
            space: 32,
            up: 38,
            down: 40
          };
        switch (e.keyCode) {
          case o.up:
            a = -1;
          case o.down:
            if (e.preventDefault(), t = i[i.length - 1], h.hasClass(this.data.elem.lastChild, "dk-select-options-highlight"))
              for (h.removeClass(this.data.elem.lastChild, "dk-select-options-highlight"), s = 0; s < n.length; s++) h.hasClass(n[s], "dk-option-highlight") && (h.removeClass(n[s], "dk-option-highlight"), t = n[s]);
            a = n.indexOf(t) + a, a > n.length - 1 ? a = n.length - 1 : 0 > a && (a = 0), this.data.select.options[a].disabled || (this.reset(!0), this.select(a), this._scrollTo(a));
            break;
          case o.space:
            if (!this.isOpen) {
              e.preventDefault(), this.open();
              break
            }
            case o.tab:
            case o.enter:
              for (a = 0; a < n.length; a++) h.hasClass(n[a], "dk-option-highlight") && this.select(a);
            case o.esc:
              this.isOpen && (e.preventDefault(), this.close())
        }
      },
      _searchOptions: function (e) {
        var t, i = this,
          n = String.fromCharCode(e.keyCode || e.which),
          a = function () {
            i.data.searchTimeout && clearTimeout(i.data.searchTimeout), i.data.searchTimeout = setTimeout(function () {
              i.data.searchString = ""
            }, 1e3)
          };
        this.data.searchString === s && (this.data.searchString = ""), a(), this.data.searchString += n, t = this.search(this.data.searchString, this.data.settings.search), t.length && (h.hasClass(t[0], "dk-option-disabled") || this.selectOne(t[0]))
      },
      _scrollTo: function (e) {
        var t, s, i, n = this.data.elem.lastChild;
        return -1 === e || "number" != typeof e && !e || !this.isOpen && !this.multiple ? !1 : ("number" == typeof e && (e = this.item(e)), t = h.position(e, n).top, s = t - n.scrollTop, i = s + e.offsetHeight, void(i > n.offsetHeight ? (t += e.offsetHeight, n.scrollTop = t - n.offsetHeight) : 0 > s && (n.scrollTop = t)))
      }
    }, r.build = function (e, t) {
      var s, i, n, a = [],
        o = {
          elem: null,
          options: [],
          selected: []
        },
        r = function (e) {
          var s, i, n, a, l = [];
          switch (e.nodeName) {
            case "OPTION":
              s = h.create("li", {
                "class": "dk-option ",
                "data-value": e.value,
                innerHTML: e.text,
                role: "option",
                "aria-selected": "false",
                id: t + "-" + (e.id || e.value.replace(" ", "-"))
              }), h.addClass(s, e.className), e.disabled && (h.addClass(s, "dk-option-disabled"), s.setAttribute("aria-disabled", "true")), e.selected && (h.addClass(s, "dk-option-selected"), s.setAttribute("aria-selected", "true"), o.selected.push(s)), o.options.push(this.appendChild(s));
              break;
            case "OPTGROUP":
              for (i = h.create("li", {
                  "class": "dk-optgroup"
                }), e.label && i.appendChild(h.create("div", {
                  "class": "dk-optgroup-label",
                  innerHTML: e.label
                })), n = h.create("ul", {
                  "class": "dk-optgroup-options"
                }), a = e.children.length; a--; l.unshift(e.children[a]));
              l.forEach(r, n), this.appendChild(i).appendChild(n)
          }
        };
      for (o.elem = h.create("div", {
          "class": "dk-select" + (e.multiple ? "-multi" : "")
        }), i = h.create("ul", {
          "class": "dk-select-options",
          id: t + "-listbox",
          role: "listbox"
        }), e.disabled && h.addClass(o.elem, "dk-select-disabled"), o.elem.id = t + (e.id ? "-" + e.id : ""), h.addClass(o.elem, e.className), e.multiple ? (o.elem.setAttribute("tabindex", e.getAttribute("tabindex") || "0"), i.setAttribute("aria-multiselectable", "true")) : (s = e.options[e.selectedIndex], o.elem.appendChild(h.create("div", {
          "class": "dk-selected " + s.className,
          tabindex: e.tabindex || 0,
          innerHTML: s ? s.text : "&nbsp;",
          id: t + "-combobox",
          "aria-live": "assertive",
          "aria-owns": i.id,
          role: "combobox"
        })), i.setAttribute("aria-expanded", "false")), n = e.children.length; n--; a.unshift(e.children[n]));
      return a.forEach(r, o.elem.appendChild(i)), o
    }, r.onDocClick = function (e) {
      var t, s;
      if (1 !== e.target.nodeType) return !1;
      null !== (t = e.target.getAttribute("data-dkcacheid")) && r.cache[t].focus();
      for (s in r.cache) h.closest(e.target, r.cache[s].data.elem) || s === t || r.cache[s].disabled || r.cache[s].close()
    }, e.Dropkick = r, e.jQuery !== s && (e.jQuery.fn.dropkick = function () {
      var t = Array.prototype.slice.call(arguments);
      return e.jQuery(this).each(function () {
        t[0] && "object" != typeof t[0] ? "string" == typeof t[0] && r.prototype[t[0]].apply(new r(this), t.slice(1)) : new r(this, t[0] || {})
      })
    })
  }(window, document);
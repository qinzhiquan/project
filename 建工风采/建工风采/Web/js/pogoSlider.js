// 大图轮播

! function (a, b, c, d) {
  function e(a, b, c) {
    "*" === b.charAt(0) ? a[b.substring(1)] = c : (a["-ms-" + b] = c, a["-webkit-" + b] = c, a[b] = c)
  }
  a.fn.precss = function (a) {
    var b = {};
    if (1 === arguments.length)
      for (style in a) a.hasOwnProperty(style) && e(b, style, a[style]);
    else e(b, arguments[0], arguments[1]);
    return this.css(b), this
  }
}(jQuery, window, document),
function (a, b, c, d) {
  "use strict";

  function e(b, c) {
    this.element = b, this.$element = a(b), this.settings = a.extend({}, i, c), this.currentSlideIndex = 0, this.prevSlideIndex =
      0, this.slideTimeoutId = 0, this.slides = [], this.calls = [], this.paused = !1, this.navigating = !1, this.slideStartTime =
      null, this.slideTimeRemaining = 0, this._init()
  }
  var f = function (a) {
      var b = !1,
        e = "Webkit Moz ms O".split(" "),
        f = c.createElement("div"),
        g = null;
      if (a = a.toLowerCase(), f.style[a] && (b = !0), b === !1) {
        g = a.charAt(0).toUpperCase() + a.substr(1);
        for (var h = 0; h < e.length; h++)
          if (f.style[e[h] + g] !== d) {
            b = !0;
            break
          }
      }
      return b
    },
    g = {};
  g.animation = f("animation"), g.transition = f("transition"), g.transform = f("transform");
  var h = "pogoSlider",
    i = {
      autoplayTimeout: 4e3,
      autoplay: !0,
      baseZindex: 1,
      displayProgess: !0,
      onSlideStart: null,
      onSlideEnd: null,
      onSliderPause: null,
      onSliderResume: null,
      slideTransition: "slide",
      slideTransitionDuration: 1e3,
      elementTransitionStart: 500,
      elementTransitionDuration: 1e3,
      elementTransitionIn: "slideUp",
      elementTransitionOut: "slideDown",
      generateButtons: !0,
      buttonPosition: "CenterHorizontal",
      generateNav: !0,
      navPosition: "Bottom",
      preserveTargetSize: !1,
      targetWidth: 1e3,
      targetHeight: 400,
      responsive: !1,
      pauseOnHover: !0
    };
  e.prototype = {
    _init: function () {
      var b = this;
      b.$element.find(".pogoSlider-slide").each(function () {
          var c = [],
            e = 0;
          a(this).data("original-styles", a(this).attr("style")), a(this).find(".pogoSlider-slide-element").each(function () {
            var f = parseInt(a(this).data("start")) !== d ? a(this).data("start") : b.settings.elementTransitionStart,
              g = parseInt(a(this).data("duration")) || b.settings.elementTransitionDuration;
            f + g > e && (e = f + g), c.push({
              $element: a(this),
              element: this,
              startTime: f,
              duration: g,
              transitionIn: a(this).data("in") || b.settings.elementTransitionIn,
              transitionOut: a(this).data("out") || b.settings.elementTransitionOut
            }), a(this).css("opacity", 0)
          });
          var f = {
            $element: a(this),
            element: this,
            transition: a(this).data("transition") || b.settings.slideTransition,
            duration: parseInt(a(this).data("duration")) || b.settings.slideTransitionDuration,
            elementTransitionDuration: e,
            totalSlideDuration: b.settings.autoplayTimeout + e,
            children: c
          };
          b.slides.push(f)
        }), b.numSlides = b.slides.length, b.slides[0].$element.css("opacity", 1), b.settings.autoplay && b.settings.displayProgess &&
        b._createProgessBar();
      var c = b.$element.find("img").length;
      if (c > 0) {
        var e = 0;
        b.$element.prepend('<div class="pogoSlider-loading"><div class="pogoSlider-loading-icon"></div></div>'), b.$element
          .find("img").one("load", function () {
            ++e === c && (a(".pogoSlider-loading").remove(), b._onSliderReady())
          }).each(function () {
            this.complete && a(this).trigger("load")
          })
      } else b._onSliderReady()
    },
    _onSliderReady: function () {
      var c = this;
      c.settings.autoplay && (c.slideStartTime = new Date, c.slideTimeRemaining = c.slides[0].totalSlideDuration, c._slideTimeout(
          c.slideTimeRemaining)), c.settings.generateButtons && c.slides.length > 1 && c._createDirButtons(), c.settings.generateNav &&
        c.slides.length > 1 && c._createNavigation(), c.settings.preserveTargetSize && (c._preserveTargetSize(), c.settings
          .responsive && a(b).on("resize", function () {
            c._preserveTargetSize()
          })), c.settings.pauseOnHover && (c.$element.on("mouseenter", function () {
          c.pause()
        }), c.$element.on("mouseleave", function () {
          c.resume()
        })), c._onSlideStart(0)
    },
    _createDirButtons: function () {
      var b = this;
      b.$element.addClass("pogoSlider--dir" + b.settings.buttonPosition), a(
        '<div class="btnBox1"><</div>').appendTo(b.$element).on("click",
        function () {
          b.prevSlide()
        }), a('<div class="btnBox2">></div>').appendTo(b.$element).on("click",
        function () {
          b.nextSlide()
        })
    },
    _createNavigation: function () {
      var b = this;
      b.$element.addClass("pogoSlider--nav" + b.settings.navPosition);
      for (var c = a('<ul class="pogoSlider-nav"></ul>').appendTo(b.$element), d = 0; d < b.slides.length; d++) a(
        '<li data-num="' + d + '"><button class="pogoSlider-nav-btn"></button></li>').appendTo(c).on("click", function () {
        b.toSlide(a(this).data("num"))
      })
    },
    getAppliedProps: function (a) {
      var b = c.styleSheets,
        d = new RegExp("{(.+)}");
      a.matches = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector;
      for (var e = a.getAttribute("style").replace(/ /g, "").split(";"), f = [], g = 0; g < e.length; g++) {
        var h = e[g].split(":")[0];
        h && -1 === f.indexOf(h) && f.push(h)
      }
      for (var i in b)
        if (b.hasOwnProperty(i)) {
          var j = b[i].rules || b[i].cssRules;
          for (var k in j)
            if (a.matches(j[k].selectorText)) {
              var l = d.exec(j[k].cssText.replace(/ /g, ""));
              if (l)
                for (var m = l[1].split(";"), n = 0; n < m.length; n++) {
                  var o = m[n].split(":")[0];
                  o && -1 === f.indexOf(o) && f.push(o)
                }
            }
        }
      return f
    },
    _preserveTargetSize: function () {
      var c = this,
        d = new RegExp("px|%|em", "i"),
        e = new RegExp("[0-9]*.?[0-9]+"),
        f = new RegExp("px", "i"),
        g = 1;
      g = this.scaledBy ? this.$element.width() / this.settings.targetWidth / this.scaledBy : this.$element.width() /
        this.settings.targetWidth, this.scaledBy = this.$element.width() / this.settings.targetWidth, this.$element.find(
          ".pogoSlider-slide-element").each(function () {
          var h = b.getComputedStyle(this),
            i = c.getAppliedProps(this),
            j = {};
          a.data(c, "originalStyles") || a.data(c, "originalStyles", a(this).attr("style"));
          for (var k = 0; k < i.length; k++) {
            var l = h.getPropertyValue(i[k]);
            if (d.test(l) && e.test(l)) {
              var m = e.exec(l),
                n = d.exec(l);
              f.test(n[0]) ? j[i[k]] = Math.ceil(m[0] * g) + n[0] : j[i[k]] = m[0] * g + n[0]
            }
          }
          a(this).css(j)
        })
    },
    _createProgessBar: function () {
      var a = "";
      a += '<div class="pogoSlider-progressBar">', a += '<div class="pogoSlider-progressBar-duration"></div>', a +=
        "</div>";
      for (var b = 0; b < this.slides.length; b++) this.slides[b].$element.prepend(a)
    },
    _slideTimeout: function (a) {
      var b, c = this;
      b = c.slideTimeoutId = setTimeout(function () {
        c.paused || b !== c.slideTimeoutId || c._changeToNext()
      }, a)
    },
    pause: function () {
      if (this.settings.autoplay) {
        this.paused = !0, clearTimeout(this.slideTimeoutId), this.settings.displayProgess && this.$element.find(
            ".pogoSlider-progressBar-duration").stop(!0), this.slidePauseTime = new Date, this.slideTimeRemaining = this.slideTimeRemaining -
          (new Date - this.slideStartTime);
        for (var a = 0; a < this.slides[this.currentSlideIndex].children.length; a++) this.slides[this.currentSlideIndex]
          .children[a].$element.precss("animation-play-state", "paused");
        this.settings.onSliderPause && this.settings.onSliderPause.apply(this)
      }
    },
    resume: function () {
      if (this.settings.autoplay) {
        this.paused = !1, this.slideStartTime = new Date;
        for (var a = 0; a < this.slides[this.currentSlideIndex].children.length; a++) this.slides[this.currentSlideIndex]
          .children[a].$element.precss("animation-play-state", "");
        this.slideTimeRemaining > 0 && !this.navigating && (this.settings.displayProgess && this.$element.find(
            ".pogoSlider-progressBar-duration").animate({
            width: "100%"
          }, this.slideTimeRemaining, "linear"), this._slideTimeout(this.slideTimeRemaining)), this.settings.onSliderResume &&
          this.settings.onSliderResume.apply(this)
      }
    },
    nextSlide: function () {
      this.navigating || (clearTimeout(this.slideTimeoutId), this.prevSlideIndex = this.currentSlideIndex, ++this.currentSlideIndex >
        this.numSlides - 1 && (this.currentSlideIndex = 0), this._changeSlide(this.prevSlideIndex, this.currentSlideIndex)
      )
    },
    prevSlide: function () {
      this.navigating || (clearTimeout(this.slideTimeoutId), this.prevSlideIndex = this.currentSlideIndex, --this.currentSlideIndex <
        0 && (this.currentSlideIndex = this.numSlides - 1), this._changeSlide(this.prevSlideIndex, this.currentSlideIndex)
      )
    },
    toSlide: function (a) {
      if (!this.navigating) {
        if (clearTimeout(this.slideTimeoutId), a === this.currentSlideIndex || a > this.slides.length - 1) return;
        this.prevSlideIndex = this.currentSlideIndex, this.currentSlideIndex = a, this._changeSlide(this.prevSlideIndex,
          this.currentSlideIndex)
      }
    },
    destroy: function () {
      this.paused = !0, clearTimeout(this.slideTimeoutId), a.removeData(this.element, "plugin_" + h)
    },
    _changeToNext: function () {
      this.prevSlideIndex = this.currentSlideIndex, ++this.currentSlideIndex > this.numSlides - 1 && (this.currentSlideIndex =
        0), this._changeSlide(this.prevSlideIndex, this.currentSlideIndex)
    },
    _changeSlide: function (a, b) {
      var c, d = this;
      d._onSlideEnd(a), d.navigating = !0, c = g.animation && g.transition && g.transform ? d.slideTransitions : d.compatSlideTransitions;
      var e = c[d.slides[b].transition] ? d.slides[b].transition : "slide",
        f = c[e].apply(d, [a, b]);
      setTimeout(function () {
        f && f(), d.navigating = !1, d._slideCleanup(a, !1), d._slideElementCleanup(a), d.settings.autoplay && d._slideTimeout(
          d.slides[b].totalSlideDuration), d._onSlideStart(b)
      }, d.slides[b].duration)
    },
    _onSlideStart: function (a) {
      if (this.slides[a].$element.css("z-index", 1), this.settings.autoplay && (this.slideStartTime = new Date, this.slideTimeRemaining =
          this.slides[a].totalSlideDuration, this.settings.displayProgess && !this.paused && this.slides[a].$element.find(
            ".pogoSlider-progressBar-duration").css("width", "0").animate({
            width: "100%"
          }, this.slideTimeRemaining, "linear")), this.slides[a].children.length > 0 && this._slideElementsTransitionIn(a),
        this.paused)
        for (var b = 0; b < this.slides[a].children.length; b++) this.slides[a].children[b].$element.precss(
          "animation-play-state", "paused");
      this.settings.generateNav && (this.$element.find(".pogoSlider-nav-btn").removeClass("pogoSlider-nav-btn--selected"),
          this.$element.find(".pogoSlider-nav-btn").eq(a).addClass("pogoSlider-nav-btn--selected")), this.settings.onSlideStart &&
        this.settings.onSlideStart.apply(this)
    },
    _onSlideEnd: function (a) {
      var b;
      if (this.settings.autoplay && this.settings.displayProgess && this.slides[a].$element.find(
          ".pogoSlider-progressBar-duration").stop(!0).css("width", "0"), this.paused) {
        b = this.slides[a].totalSlideDuration - this.slideTimeRemaining;
        for (var c = 0; c < this.slides[a].children.length; c++) this.slides[a].children[c].$element.precss(
          "animation-play-state", "")
      } else b = this.slides[a].totalSlideDuration - (this.slideTimeRemaining - (new Date - this.slideStartTime));
      this.slides[a].children.length > 0 && b > this.slides[a].elementTransitionDuration && this._slideElementsTransitionOut(
        a), this.settings.onSlideEnd && this.settings.onSlideEnd.apply(this)
    },
    _slideElementsTransitionIn: function (a) {
      for (var b = 0; b < this.slides[a].children.length; b++) {
        var c = this.slides[a].children[b];
        c.$element.precss({
          "*opacity": 1,
          "animation-duration": c.duration + "ms",
          "animation-delay": c.startTime + "ms"
        }).addClass("pogoSlider-animation-" + c.transitionIn + "In")
      }
    },
    _slideElementsTransitionOut: function (a) {
      for (var b = 0; b < this.slides[a].children.length; b++) {
        var c = this.slides[a].children[b];
        c.$element.precss("animation-delay", "").removeClass("pogoSlider-animation-" + c.transitionIn + "In").addClass(
          "pogoSlider-animation-" + c.transitionOut + "Out")
      }
    },
    _slideCleanup: function (a, b) {
      this.slides[a].$element.find(".pogoSlider-slide-slice").length > 0 && this._removeSlideSlices(a), this.slides[a].$element
        .attr("style", this.slides[a].$element.data("original-styles")).css("opacity", b ? "1" : "0")
    },
    _slideElementCleanup: function (a) {
      var b = function (a, b) {
          return (b.match(/pogoSlider-(?:(?:transition)|(?:animation))(?:-[a-zA-Z0-9]+)?(?:--[a-z]+)?/gi) || []).join(" ")
        },
        c = function (a, b) {
          return b.replace(/(?:-webkit-)?(?:-ms-)?((?:transition)|(?:animation))[^;]+;/g, "")
        };
      this.slides[a].$element.find(".pogoSlider-progressBar-duration").css("width", "0");
      for (var d = 0; d < this.slides[a].children.length; d++) this.slides[a].children[d].$element.removeClass(b).attr(
        "style", c).css("opacity", 0)
    },
    _createSlideSlices: function (a, b, c) {
      var d, e = c * b,
        f = 100 / c,
        g = 100 / b,
        h = 100 * c,
        i = 100 * b,
        j = this.slides[a].$element,
        k = j.attr("style");
      if (d = this.paused ? this.slides[a].totalSlideDuration - this.slideTimeRemaining : this.slides[a].totalSlideDuration -
        (this.slideTimeRemaining - (new Date - this.slideStartTime)), a === this.prevSlideIndex && this.slides[a].children
        .length > 0 && d < this.slides[a].elementTransitionDuration)
        for (var l = 0; l < this.slides[a].children.length; l++) {
          var m = this.slides[a].children[l].startTime - d + "ms";
          this.slides[a].children[l].$element.precss("animation-delay", m)
        }
      j.children().wrapAll('<div class="pogoSlider-slide-slice" style="width:' + f + "%;height:" + g +
        '%;top:0%;left:0%;"/>').wrapAll('<div class="pogoSlider-slide-slice-inner" style="' + k + "width:" + h +
        "%;height:" + i + '%;top:0%;left:0%;"/>'), j.attr("style", function (a, b) {
        return b.replace(/(?:background)[^;]+;/g, "")
      });
      for (var n = 1; e > n; n++) {
        var o = n % b,
          p = Math.floor(n / b),
          q = "width:" + f + "%;height:" + g + "%;top:" + g * o + "%;left:" + f * p + "%;",
          r = "width:" + h + "%;height:" + i + "%;top:-" + 100 * o + "%;left:-" + 100 * p + "%;";
        j.find(".pogoSlider-slide-slice").last().clone(!0, !0).appendTo(this.slides[a].element).attr("style", q).find(
          ".pogoSlider-slide-slice-inner").attr("style", k + r)
      }
    },
    _removeSlideSlices: function (a) {
      var b = this,
        c = b.slides[a].$element;
      c.attr("style", c.data("original-styles")), c.find(".pogoSlider-slide-slice").not(":first").remove(), c.find(
        ".pogoSlider-slide-slice-inner").children().unwrap(), c.find(".pogoSlider-slide-slice").children().unwrap()
    },
    _generateARandomArray: function (a) {
      for (var b = [], c = 0; a > c; c++) b.push(c);
      for (var d = b.length - 1; d > 0; d--) {
        var e = Math.floor(Math.random() * (d + 1)),
          f = b[d];
        b[d] = b[e], b[e] = f
      }
      return b
    },
    slideTransitions: {
      fade: function (a, b) {
        var c = this.slides[b];
        this.slides[a].$element.precss({
          "*opacity": "0",
          "transition-duration": c.duration + "ms"
        }), c.$element.precss({
          "*opacity": "1",
          "transition-duration": c.duration + "ms"
        })
      },
      slide: function (a, b) {
        var c;
        return c = 0 === b && a === this.slides.length - 1 ? "slideLeft" : 0 === a && b === this.slides.length - 1 ?
          "slideRight" : b > a ? "slideLeft" : "slideRight", this.slideTransitions[c].apply(this, [a, b])
      },
      verticalSlide: function (a, b) {
        var c;
        return c = 0 === b && a === this.slides.length - 1 ? "slideUp" : 0 === a && b === this.slides.length - 1 ?
          "slideDown" : b > a ? "slideUp" : "slideDown", this.slideTransitions[c].apply(this, [a, b])
      },
      slideLeft: function (a, b) {
        var c = this,
          d = c.slides[b];
        return c.slides[a].$element.precss("animation-duration", d.duration + "ms").addClass(
            "pogoSlider-animation-leftOut"), d.$element.precss({
            "*opacity": "1",
            "animation-duration": d.duration + "ms"
          }).addClass("pogoSlider-animation-leftIn"),
          function () {
            c.slides[a].$element.removeClass("pogoSlider-animation-leftOut"), d.$element.attr("style", d.$element.data(
              "original-styles")).css("opacity", "1").removeClass("pogoSlider-animation-leftIn")
          }
      },
      slideRight: function (a, b) {
        var c = this,
          d = c.slides[b];
        return c.slides[a].$element.precss("animation-duration", d.duration + "ms").addClass(
            "pogoSlider-animation-rightOut"), d.$element.precss({
            "*opacity": "1",
            "animation-duration": d.duration + "ms"
          }).addClass("pogoSlider-animation-rightIn"),
          function () {
            c.slides[a].$element.removeClass("pogoSlider-animation-rightOut"), d.$element.attr("style", d.$element.data(
              "original-styles")).css("opacity", "1").removeClass("pogoSlider-animation-rightIn")
          }
      },
      slideUp: function (a, b) {
        var c = this,
          d = c.slides[b];
        return c.slides[a].$element.precss("animation-duration", d.duration + "ms").addClass("pogoSlider-animation-upOut"),
          d.$element.precss({
            "*opacity": "1",
            "animation-duration": d.duration + "ms"
          }).addClass("pogoSlider-animation-upIn"),
          function () {
            c.slides[a].$element.removeClass("pogoSlider-animation-upOut"), d.$element.attr("style", d.$element.data(
              "original-styles")).css("opacity", "1").removeClass("pogoSlider-animation-upIn")
          }
      },
      slideDown: function (a, b) {
        var c = this,
          d = c.slides[b];
        return c.slides[a].$element.precss("animation-duration", d.duration + "ms").addClass(
            "pogoSlider-animation-downOut"), d.$element.precss({
            "*opacity": "1",
            "animation-duration": d.duration + "ms"
          }).addClass("pogoSlider-animation-downIn"),
          function () {
            c.slides[a].$element.removeClass("pogoSlider-animation-downOut"), d.$element.attr("style", d.$element.data(
              "original-styles")).css("opacity", "1").removeClass("pogoSlider-animation-downIn")
          }
      },
      slideRevealLeft: function (a, b) {
        var c = this,
          d = c.slides[b];
        return c.slides[a].$element.precss({
            "*z-index": c.settings.baseZindex + 1,
            "animation-duration": d.duration + "ms"
          }).addClass("pogoSlider-animation-leftOut"), d.$element.css({
            opacity: 1,
            "z-index": c.settings.baseZindex
          }),
          function () {
            c.slides[a].$element.removeClass("pogoSlider-animation-leftOut")
          }
      },
      slideRevealRight: function (a, b) {
        var c = this,
          d = c.slides[b];
        return c.slides[a].$element.precss({
            "*z-index": c.settings.baseZindex + 1,
            "animation-duration": d.duration + "ms"
          }).addClass("pogoSlider-animation-rightOut"), d.$element.css({
            opacity: 1,
            "z-index": c.settings.baseZindex
          }),
          function () {
            c.slides[a].$element.removeClass("pogoSlider-animation-rightOut")
          }
      },
      slideOverLeft: function (a, b) {
        var c = this.slides[b];
        return c.$element.precss({
            "*opacity": "1",
            "*z-index": this.settings.baseZindex + 1,
            "animation-duration": c.duration + "ms"
          }).addClass("pogoSlider-animation-leftIn"),
          function () {
            c.$element.attr("style", c.$element.data("original-styles")).css("opacity", "1").removeClass(
              "pogoSlider-animation-leftIn")
          }
      },
      slideOverRight: function (a, b) {
        var c = this.slides[b];
        return c.$element.precss({
            "*opacity": "1",
            "*z-index": this.settings.baseZindex + 1,
            "animation-duration": c.duration + "ms"
          }).addClass("pogoSlider-animation-rightIn"),
          function () {
            c.$element.attr("style", c.$element.data("original-styles")).css("opacity", "1").removeClass(
              "pogoSlider-animation-rightIn")
          }
      },
      expandReveal: function (a, b) {
        var c = this,
          d = c.slides[b];
        return c.$element.css("overflow", "visible"), c.slides[a].$element.precss({
            "*z-index": c.settings.baseZindex + 1,
            "animation-duration": d.duration + "ms"
          }).addClass("pogoSlider-animation-expandReveal"), d.$element.css({
            opacity: 1,
            "z-index": c.settings.baseZindex
          }),
          function () {
            c.$element.css("overflow", ""), c.slides[a].$element.removeClass("pogoSlider-animation-expandReveal")
          }
      },
      shrinkReveal: function (a, b) {
        var c = this,
          d = c.slides[b];
        return c.slides[a].$element.precss({
            "*z-index": c.settings.baseZindex + 1,
            "animation-duration": d.duration + "ms"
          }).addClass("pogoSlider-animation-shrinkReveal"), d.$element.css({
            opacity: 1,
            "z-index": c.settings.baseZindex
          }),
          function () {
            c.slides[a].$element.removeClass("pogoSlider-animation-shrinkReveal")
          }
      },
      verticalSplitReveal: function (a, b) {
        var c = this,
          d = c.slides[b];
        c.slides[a].$element.css("z-index", c.settings.baseZindex + 1), d.$element.css({
          opacity: 1,
          "z-index": c.settings.baseZindex
        }), c._createSlideSlices(a, 1, 2);
        var e = c.slides[a].$element.find(".pogoSlider-slide-slice");
        e.precss("animation-duration", d.duration + "ms"), e.eq(0).addClass("pogoSlider-animation-leftOut"), e.eq(1).addClass(
          "pogoSlider-animation-rightOut")
      },
      horizontalSplitReveal: function (a, b) {
        var c = this,
          d = c.slides[b];
        c.slides[a].$element.css("z-index", c.settings.baseZindex + 1), d.$element.css({
          opacity: 1,
          "z-index": c.settings.baseZindex
        }), c._createSlideSlices(a, 2, 1);
        var e = c.slides[a].$element.find(".pogoSlider-slide-slice");
        e.precss("animation-duration", d.duration + "ms"), e.eq(0).addClass("pogoSlider-animation-upOut"), e.eq(1).addClass(
          "pogoSlider-animation-downOut")
      },
      zipReveal: function (b, c) {
        var d = this,
          e = d.slides[c];
        d.slides[b].$element.css("z-index", d.settings.baseZindex + 1), e.$element.css({
          opacity: 1,
          "z-index": d.settings.baseZindex
        }), d._createSlideSlices(b, 1, Math.round(d.$element.width() / 100));
        var f = d.slides[b].$element.find(".pogoSlider-slide-slice");
        f.precss("animation-duration", e.duration + "ms"), f.each(function (b) {
          a(this).addClass(b % 2 === 0 ? "pogoSlider-animation-upOut" : "pogoSlider-animation-downOut")
        })
      },
      barRevealDown: function (a, b) {
        return this.slideTransitions.barReveal.apply(this, [a, b, "down"])
      },
      barRevealUp: function (a, b) {
        return this.slideTransitions.barReveal.apply(this, [a, b, "up"])
      },
      barReveal: function (b, c, d) {
        var e = this,
          f = e.slides[c];
        e.slides[b].$element.css("z-index", e.settings.baseZindex + 1), f.$element.css({
          opacity: 1,
          "z-index": e.settings.baseZindex
        }), e._createSlideSlices(b, 1, Math.round(e.$element.width() / 100));
        var g = e.slides[b].$element.find(".pogoSlider-slide-slice"),
          h = f.duration / (g.length + 1),
          i = 2 * h;
        g.precss("animation-duration", i + "ms"), g.each(function (b) {
          "down" === d ? a(this).addClass("pogoSlider-animation-downOut").precss("animation-delay", h * b + "ms") : a(
            this).addClass("pogoSlider-animation-upOut").precss("animation-delay", h * b + "ms")
        })
      },
      blocksReveal: function (a, b) {
        var c = this,
          d = c.slides[b],
          e = Math.round(c.$element.height() / 100),
          f = Math.round(c.$element.width() / 100);
        c.slides[a].$element.css("z-index", c.settings.baseZindex + 1), d.$element.css({
          opacity: 1,
          "z-index": c.settings.baseZindex
        });
        var g = c._generateARandomArray(e * f);
        c._createSlideSlices(a, e, f);
        var h = c.slides[a].$element.find(".pogoSlider-slide-slice"),
          i = d.duration / (h.length + 1),
          j = 2 * i;
        h.precss("animation-duration", j + "ms");
        for (var k = 0; k < h.length; k++) h.eq(g.pop()).precss("animation-delay", i * k + "ms").addClass(
          "pogoSlider-animation-blocksReveal")
      },
      fold: function (a, b) {
        var c;
        return c = 0 === b && a === this.slides.length - 1 ? "foldLeft" : 0 === a && b === this.slides.length - 1 ?
          "foldRight" : b > a ? "foldLeft" : "foldRight", this.slideTransitions[c].apply(this, [a, b])
      },
      foldRight: function (a, b) {
        var c = this,
          d = c.slides[b],
          e = c.slides[a];
        c.$element.css("overflow", "visible"), e.$element.css({
          overflow: "visible",
          "z-index": c.settings.baseZindex
        }), d.$element.css({
          opacity: 1,
          overflow: "visible",
          "z-index": c.settings.baseZindex + 1
        }), c._createSlideSlices(a, 1, 2);
        var f = e.$element.find(".pogoSlider-slide-slice");
        c._createSlideSlices(b, 1, 2);
        var g = c.slides[b].$element.find(".pogoSlider-slide-slice"),
          h = f.eq(0),
          i = g.eq(0),
          j = g.eq(1);
        return d.$element.prepend(h.detach()), e.$element.prepend(i.detach()), h.addClass(
            "pogoSlider-animation-foldInRight").precss("animation-duration", d.duration + "ms"), j.addClass(
            "pogoSlider-animation-foldOutRight").precss("animation-duration", d.duration + "ms"),
          function () {
            c.$element.css("overflow", ""), d.$element.prepend(i.detach()), e.$element.prepend(h.detach()), c._slideCleanup(
              b, !0)
          }
      },
      foldLeft: function (a, b) {
        var c = this,
          d = c.slides[b],
          e = c.slides[a];
        c.$element.css("overflow", "visible"), e.$element.css({
          overflow: "visible",
          "z-index": c.settings.baseZindex
        }), d.$element.css({
          opacity: 1,
          overflow: "visible",
          "z-index": c.settings.baseZindex + 1
        }), c._createSlideSlices(a, 1, 2);
        var f = e.$element.find(".pogoSlider-slide-slice");
        c._createSlideSlices(b, 1, 2);
        var g = c.slides[b].$element.find(".pogoSlider-slide-slice"),
          h = f.eq(1),
          i = g.eq(0),
          j = g.eq(1);
        return d.$element.append(h.detach()), e.$element.append(j.detach()), h.addClass("pogoSlider-animation-foldInLeft")
          .precss("animation-duration", d.duration + "ms"), i.addClass("pogoSlider-animation-foldOutLeft").precss(
            "animation-duration", d.duration + "ms"),
          function () {
            c.$element.css("overflow", ""), c._slideCleanup(b, !0)
          }
      }
    },
    compatSlideTransitions: {
      fade: function (a, b) {
        var c = this.slides[b];
        this.slides[a].$element.animate({
          opacity: 0
        }, c.duration), c.$element.animate({
          opacity: 1
        }, c.duration)
      },
      slide: function (a, b) {
        var c;
        return c = a > b && a === this.slides.length - 1 && 0 === b ? "slideLeft" : b > a && 0 === a && b === this.slides
          .length - 1 ? "slideRight" : b > a ? "slideLeft" : "slideRight", this.slideTransitions[c].apply(this, [a, b])
      },
      verticalSlide: function (a, b) {
        var c;
        return c = a > b && a === this.slides.length - 1 && 0 === b ? "slideUp" : b > a && 0 === a && b === this.slides.length -
          1 ? "slideDown" : b > a ? "slideUp" : "slideDown", this.slideTransitions[c].apply(this, [a, b])
      },
      slideLeft: function (a, b) {
        var c = this.slides[b];
        this.slides[a].$element.animate({
          left: "-100%"
        }, c.duration), c.$element.css({
          left: "100%",
          opacity: 1
        }).animate({
          left: 0
        }, c.duration)
      },
      slideRight: function (a, b) {
        var c = this.slides[b];
        this.slides[a].$element.animate({
          left: "100%"
        }, c.duration), c.$element.css({
          left: "-100%",
          opacity: 1
        }).animate({
          left: 0
        }, c.duration)
      },
      slideUp: function (a, b) {
        var c = this.slides[b];
        this.slides[a].$element.animate({
          top: "-100%"
        }, c.duration), c.$element.css({
          top: "100%",
          opacity: 1
        }).animate({
          top: "0"
        }, c.duration)
      },
      slideDown: function (a, b) {
        var c = this.slides[b];
        this.slides[a].$element.animate({
          top: "100%"
        }, c.duration), c.$element.css({
          top: "-100%",
          opacity: 1
        }).animate({
          top: "0"
        }, c.duration)
      },
      slideRevealLeft: function (a, b) {
        var c = this.slides[b];
        this.slides[a].$element.css("z-index", this.settings.baseZindex + 1).animate({
          left: "-100%"
        }, c.duration), c.$element.css({
          opacity: 1,
          "z-index": this.settings.baseZindex
        })
      },
      slideRevealRight: function (a, b) {
        var c = this.slides[b];
        this.slides[a].$element.css("z-index", this.settings.baseZindex + 1).animate({
          left: "100%"
        }, c.duration), c.$element.css({
          opacity: 1,
          "z-index": this.settings.baseZindex
        })
      },
      slideOverLeft: function (a, b) {
        var c = this.slides[b];
        c.$element.css({
          opacity: 1,
          "z-index": this.settings.baseZindex,
          left: "100%"
        }).animate({
          left: 0
        }, c.duration)
      },
      slideOverRight: function (a, b) {
        var c = this.slides[b];
        c.$element.css({
          opacity: 1,
          "z-index": this.settings.baseZindex,
          right: "100%"
        }).animate({
          right: 0
        }, c.duration)
      },
      expandReveal: function (a, b) {
        var c = this.slides[b];
        this.slides[a].$element.css("z-index", this.settings.baseZindex + 1).animate({
          width: "120%",
          height: "120%",
          left: "-10%",
          top: "-10%",
          opacity: 0
        }, c.duration), c.$element.css({
          opacity: 1,
          "z-index": this.settings.baseZindex
        })
      },
      shrinkReveal: function (a, b) {
        var c = this.slides[b];
        this.slides[a].$element.css("z-index", this.settings.baseZindex + 1).animate({
          width: "50%",
          height: "50%",
          left: "25%",
          top: "25%",
          opacity: 0
        }, c.duration), c.$element.css({
          opacity: 1,
          "z-index": this.settings.baseZindex
        })
      },
      verticalSplitReveal: function (a, b) {
        var c = this,
          d = c.slides[b];
        c.slides[a].$element.css("z-index", c.settings.baseZindex + 1), d.$element.css({
          opacity: 1,
          "z-index": c.settings.baseZindex
        }), c._createSlideSlices(a, 1, 2);
        var e = c.slides[a].$element.find(".pogoSlider-slide-slice");
        e.eq(0).animate({
          left: "-50%"
        }, d.duration), e.eq(1).animate({
          left: "100%"
        }, d.duration)
      },
      horizontalSplitReveal: function (a, b) {
        var c = this,
          d = c.slides[b];
        c.slides[a].$element.css("z-index", c.settings.baseZindex + 1), d.$element.css({
          opacity: 1,
          "z-index": c.settings.baseZindex
        }), c._createSlideSlices(a, 2, 1);
        var e = c.slides[a].$element.find(".pogoSlider-slide-slice");
        e.eq(0).animate({
          top: "-50%"
        }, d.duration), e.eq(1).animate({
          top: "100%"
        }, d.duration)
      },
      zipReveal: function (b, c) {
        var d = this,
          e = d.slides[c];
        d.slides[b].$element.css("z-index", d.settings.baseZindex + 1), e.$element.css({
          opacity: 1,
          "z-index": d.settings.baseZindex
        }), d._createSlideSlices(b, 1, Math.round(d.$element.width() / 100));
        var f = d.slides[b].$element.find(".pogoSlider-slide-slice"),
          g = e.duration / (f.length + 1),
          h = 2 * g;
        f.each(function (b) {
          b % 2 === 0 ? a(this).delay(g * b).animate({
            top: "100%"
          }, h) : a(this).delay(g * b).animate({
            top: "-100%"
          }, h)
        })
      },
      barRevealDown: function (a, b) {
        return this.slideTransitions.barReveal.apply(this, [a, b, "down"])
      },
      barRevealUp: function (a, b) {
        return this.slideTransitions.barReveal.apply(this, [a, b, "up"])
      },
      barReveal: function (b, c, d) {
        var e = this,
          f = e.slides[c];
        e.slides[b].$element.css("z-index", e.settings.baseZindex + 1), f.$element.css({
          opacity: 1,
          "z-index": e.settings.baseZindex
        }), e._createSlideSlices(b, 1, Math.round(e.$element.width() / 100));
        var g = e.slides[b].$element.find(".pogoSlider-slide-slice"),
          h = f.duration / (g.length + 1),
          i = 2 * h;
        g.each(function (b) {
          "down" === d ? a(this).delay(h * b).animate({
            top: "100%"
          }, i) : a(this).delay(h * b).animate({
            top: "-100%"
          }, i)
        })
      }
    }
  }, a.fn[h] = function (b) {
    return this.each(function () {
      a.data(this, "plugin_" + h) || a.data(this, "plugin_" + h, new e(this, b))
    }), this
  }
}(jQuery, window, document);

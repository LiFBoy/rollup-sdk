!(function(e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], t)
    : t(((e = e || self).jssdk = {}));
})(this, function(e) {
  'use strict';
  var t = window.navigator.userAgent.toLowerCase();
  (e.isAndroid = function() {
    return /android/i.test(t);
  }),
    (e.isIOS = function() {
      return /(ipad|iphone|ipod)/i.test(t);
    }),
    (e.ua = t),
    Object.defineProperty(e, '__esModule', { value: !0 });
});

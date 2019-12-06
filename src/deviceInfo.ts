const ua = window.navigator.userAgent.toLowerCase();

function isIOS() {
  return /(ipad|iphone|ipod)/i.test(ua);
}

function isAndroid() {
  return /android/i.test(ua);
}

export { ua, isIOS, isAndroid };

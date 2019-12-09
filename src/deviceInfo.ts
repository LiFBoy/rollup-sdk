const ua = window.navigator.userAgent.toLowerCase();

const isIos = /(iphone|ipad|ipod)/i.test(ua);

const isAndroid = /android/i.test(ua);

const inWeixin = /MicroMessenger/i.test(ua);

export default { ua, isIos, isAndroid, inWeixin };

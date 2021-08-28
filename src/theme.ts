/* eslint-disable indent */
import axios from 'axios';
// const {version, name} = require('../package.json');
import { version, name } from '../package.json';
const ENUM_THEME = {
  0: '中国红',
  1: '日落黄',
  2: '天空蓝',
  3: '森林绿',
};

let THEME: number = 0;

function request(url: string, options = {}) {
  return new Promise((resolve, reject) => {
    return axios({
      url,
      withCredentials: true,
      ...options,
    })
      .then((response) => {
        const { data } = response;
        if (Number(data.code) === 200 || data.code === 0) {
          resolve(data.data);
        } else {
          reject(response);
        }
      })
      .catch((response) => {
        reject(response);
      });
  });
}

function GetQueryString(name: string) {
  const regArr = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(regArr);
  if (r !== null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}
const env: string = (
  document.querySelector('meta[name="x-server-env"]') || { content: 'test' }
).content;

const origin =
  env === 'production'
    ? 'https://rbac.api.xiaoyuanhao.com'
    : 'http://aly-test.api.xiaoyuanhao.com/rbac-test';

const getPublishPath = (env: string) => {
  switch (env) {
    case 'production':
      return `//s.xiaoyuanhao.com/${name}/${version}/`;
    default:
      return `//cdn.xiaoyuanhao.com/test/${name}/${version}/`;
  }
};

const getAppColor = (): Promise<any> => {
  const params = {
    corpid: GetQueryString('corpid'),
    appId: GetQueryString('appId'),
  };
  return request(
    `${origin}/mobile/workbench/base/home/info?corpid=${params.corpid}&appId=${params.appId}`
  );
};

const run = function () {
  getAppColor().then((data: any) => {
    const res = data.colorType;
    console.log(res, 'theme222');
    (window as any).jssdk.theme.THEME = res;
    const linkTag = document.createElement('link');
    linkTag.setAttribute('rel', 'stylesheet');
    linkTag.setAttribute('type', 'text/css');
    if (typeof res === 'number') {
      linkTag.href = `${getPublishPath(env)}theme${res}.css`;
    } else {
      linkTag.href = `${getPublishPath(env)}theme2.css`;
    }
    document.head.appendChild(linkTag);
  });
};

export default { ENUM_THEME, THEME, run };

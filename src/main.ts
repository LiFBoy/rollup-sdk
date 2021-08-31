/* eslint-disable indent */
import axios from 'axios';
import qs from 'qs';

const ENUM_THEME = {
  0: '中国红',
  1: '日落黄',
  2: '天空蓝',
  3: '森林绿',
};
const THEME: number = 0;

let readyFunc: () => void = function () {};

function request(url: string, options?: any) {
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

// function GetQueryString(name: string) {
//   const regArr = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
//   const r = location.search.substr(1).match(regArr);
//   if (r !== null) {
//     return decodeURIComponent(r[2]);
//   }
//   return null;
// }
// let env: any;
// if (typeof window !== 'undefined') {
//   env = document.querySelector('meta[name="x-server-env"]') || {
//     content: 'test',
//   };
// }

// const origin =
//   env?.content === 'production'
//     ? 'https://rbac.api.xiaoyuanhao.com'
//     : 'http://aly-test.api.xiaoyuanhao.com/rbac-test';

// const getPublishPath = (env: string) => {
//   switch (env) {
//     case 'production':
//       return `//s.xiaoyuanhao.com/${name}/${version}/`;
//     default:
//       return `//cdn.xiaoyuanhao.com/test/${name}/${version}/`;
//   }
// };

const baseUrl = 'https://community-dev.easyj.top/auth/';
const sign = (initUrl: string, token: string): Promise<any> => {
  return request(initUrl, {
    headers: {
      Authorization: token,
    },
  });
};

const getAppColor = (): Promise<any> => {
  const username = '13050516111';
  const password = '123456';
  const client_secret = 'dev';
  const client_id = 'dev';
  const from = 'normal';
  const params = {
    username,
    password,
    client_secret,
    client_id,
    from,
  };

  const initUrl = `${baseUrl}oauth/token?${qs.stringify(params)}`;

  return request(initUrl, {
    method: 'post',
  });
};

const initWxConfig = function (token: any) {
  const debug = 0;
  const corpId = 'wwe06b846b01427b48';
  const suiteCode = 'app-test';
  const params = {
    corpId,
    suiteCode,
    debug,
  };
  const initUrl = `${baseUrl}oauth/wxSignature?${qs.stringify(params)}`;
  console.log('进来了');
  sign(initUrl, token).then((result: any) => {
    console.log(result, 'result');
    (window as any).wx.config(result);
    (window as any).wx.ready(() => {
      console.log('wx.ready!');
    });
    readyFunc();
  });

  (window as any).wx.error((res: any) => {
    console.log(res, 'xxxxxx', (window as any).wx);
  });
};

const ready = function (rfunc: () => void) {
  readyFunc = rfunc;
  getAppColor().then((data: any) => {
    console.log(data, 'data', (window as any).wx);
    try {
      if ((window as any).wx) {
        const token = `Bearer ${data?.accessToken}`;
        (window as any).token = token;
        initWxConfig(token);
      } else {
        readyFunc();
      }
    } catch (exp) {
      readyFunc();
    }
  });
};

// const funUnusuallySave = function (params, postion) {
//   if (typeof window.ThrowError === 'function') {
//     window.ThrowError(params, {
//       params_project: 'web-mobile-auth-center-v0.0.2',
//       params_page_postion: postion || null,
//     });
//   }
// };

// const ready = function (rfunc) {
//   if (rfunc) {
//     this.readyFunc = rfunc;
//     this.initXmlHttp();
//     this.init();
//   }
// };

export default { ready };

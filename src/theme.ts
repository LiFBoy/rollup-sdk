/* eslint-disable indent */
import axios from 'axios';

let old: boolean = false;

function request(url: string, options = {}) {
  return new Promise<any>((resolve, reject) => {
    return axios({
      url,
      headers: {
        Authorization:
          (window as any).token ||
          'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2luZm8iOiIlN0IlMjJhdmF0YXIlMjIlM0ElMjJodHRwJTNBJTJGJTJGd2V3b3JrLnFwaWMuY24lMkZiaXptYWlsJTJGSFFLYU83WGVOd0F4R3czb3ZTNTU2Z2Z6d1J6WTlUTzdyUHNSd1N1aE9pYUVyNHhLUUdWaERXUSUyRjAlMjIlMkMlMjJpbmR1c3RyeVR5cGUlMjIlM0ElMjJjb21tdW5pdHklMjIlMkMlMjJsb2dpblR5cGUlMjIlM0ElMjJub3JtYWwlMjIlMkMlMjJtb2JpbGUlMjIlM0ElMjIxMzY1NzA4NjQ1MSUyMiUyQyUyMm9yZ0lkJTIyJTNBMzAwMTAwMTAwMTAwMDAwNiUyQyUyMm9yZ05hbWUlMjIlM0ElMjIlRTYlOUQlQUQlRTUlQjclOUUlRTYlQUQlQTMlRTUlOUQlOUIlRTclQTclOTElRTYlOEElODAlRTYlOUMlODklRTklOTklOTAlRTUlODUlQUMlRTUlOEYlQjglMjIlMkMlMjJvcmdUeXBlJTIyJTNBJTIyZ2VuZXJhbCUyMiUyQyUyMnJlZ2lvbkNvZGUlMjIlM0ElMjIzMzAxMDIwMDAwMDAwMDAwMDAlMjIlMkMlMjJ1c2VySWQlMjIlM0ExNDM3MjUzNDUxOTQwMjk0ODEyJTJDJTIydXNlck5hbWUlMjIlM0ElMjIlRTYlOUQlOEUlRTUlQkIlQkElRTUlQkQlQUMlMjIlMkMlMjJ1c2VyVHlwZSUyMiUzQSUyMmVtcGxveWVlJTIyJTdEIiwidXNlcl9uYW1lIjoiMzAwMTAwMTAwMTAwMDAwNkAxNDM3MjUzNDUxOTQwMjk0ODEyQGVtcGxveWVlQG5vcm1hbCIsIm9yZ19pZCI6MzAwMTAwMTAwMTAwMDAwNiwic2NvcGUiOlsid3JpdGUiXSwiZXhwIjoxNjM4MDQ3MzU2LCJqdGkiOiI4NDg0OWUzYS01YWI4LTQ5NmItYjIwOC0yODkxYjc4ODU2ZGEiLCJjbGllbnRfaWQiOiJzaXQifQ.QL3xJk4sDSIQS4KiibL0m74zbMd--HG18hkqmrokcioOHTVEzfQEeYJ87tNRcSKtYflxZWxA7ntexOLH3u_ZXijoUeT7OcrywjRhS6f6snAlvbSt74e_mMznE6J8Fuvtco85ASuSvW4Xht_v83jOGmN1B_l_BtSgLt3xaF3w_vk',
      },
      // withCredentials: true,
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

let env = (document as any).querySelector('meta[name=x-server-env]')?.content || 'sit';

const urlCollect: any = {
  // 开发环境
  dev: {
    usercenter: '//gateway.community-dev.easyj.top/user-center',
    auth: '//gateway.community-dev.easyj.top/auth/',
  },
  // 测试环境
  sit: {
    usercenter: '//gateway.community-sit.easyj.top/user-center',
    auth: '//gateway.community-sit.easyj.top/auth/',
  },
  // 生产环境
  production: {
    usercenter: '//gateway.suosihulian.com/user-center',
    auth: '//gateway.suosihulian.com/auth',
  },
};

const usercenter = urlCollect[env].usercenter;

// const getPublishPath = (env: string) => {
//   switch (env) {
//     case 'production':
//       return `//s.xiaoyuanhao.com/${name}/${version}/`;
//     default:
//       return `//cdn.xiaoyuanhao.com/test/${name}/${version}/`;
//   }
// };

const getVisual = (): Promise<any> => {
  return request(`${usercenter}/switch/visual/get`);
};
const setVisual = (checked: boolean, cb: () => void): Promise<any> => {
  return request(`${usercenter}/switch/visual/set`, {
    method: 'post',
    data: {
      model: checked ? 1 : 0,
    },
  }).then(() => {
    cb();
  });
};

const run = function () {
  getVisual().then((data: any) => {
    const res = data.old;
    console.log(res, 'res');
    (window as any).jssdk.switchvisual.old = res;
    let dom: any = document.getElementById('switchvisual');
    if (dom) {
      if (typeof res === 'boolean') {
        dom.href = `https://oss.suosi.atuniversity.cn/switchvisual/${res}.css`;
      } else {
        dom.href = 'https://oss.suosi.atuniversity.cn/switchvisual/false.css';
      }
    } else {
      const linkTag = document.createElement('link');
      linkTag.setAttribute('rel', 'stylesheet');
      linkTag.setAttribute('type', 'text/css');
      linkTag.setAttribute('id', 'switchvisual');
      if (typeof res === 'boolean') {
        linkTag.href = `https://oss.suosi.atuniversity.cn/switchvisual/${res}.css`;
      } else {
        linkTag.href = 'https://oss.suosi.atuniversity.cn/switchvisual/false.css';
      }
      document.head.appendChild(linkTag);
    }
  });
};

export default { old, run, setVisual };

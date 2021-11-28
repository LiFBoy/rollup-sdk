/* eslint-disable indent */
import axios from 'axios';

let appCodeList: Array<any> = [];

function request(url: string, options = {}) {
  // return new Promise<any>((resolve, reject) => {
  return axios({
    url,
    // withCredentials: true,
    ...options,
  });
}

let env = (document as any).querySelector('meta[name=x-server-env]')?.content || 'sit';

function fetchEntry() {
  return request(`https://oss.suosi.atuniversity.cn/switchvisual/${env}-appCode.json`, {
    method: 'GET',
  });
}

const getMeAppCode = async function () {
  let res = await fetchEntry();
  console.log(res.data);
  (window as any).jssdk.activity.appCodeList = res.data;
};
// getMeAppCode();
export default { appCodeList, getMeAppCode };

import fetch from '@alipay/bigfish/sdk/fetch';
import { notification } from '@alipay/bigfish/antd';
import { getToken } from '@alipay/bigfish/ctoken';

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

// function checkResult(response) {
//   if (response.)
// }

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }

  // make sure SOFA response with UTF8: https://lark.alipay.com/zhizheng.ck/me_and_world/rfaldm
  const realURL = `${url}${url.indexOf('?') > -1 ? '&' : '?'}_output_charset=utf-8`;

  return fetch(realURL, newOptions)
    .then(checkStatus)
    .then(response => {
      // 打印所有的response
      console.log('response', realURL, newOptions, response);
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }

      return response.json();
    });
}

export function uploadFunc({ action, data, file, filename, onError, onSuccess, headers }) {
  const formData = new FormData();
  if (data) {
    Object.keys(data).map(key => {
      formData.append(key, data[key]);
    });
  }
  formData.append(filename, file);
  if (action.indexOf('?') === -1) {
    action = action + '?';
  }
  const actionWithCtoken = `${action}&ctoken=${getToken()}`;
  fetch(actionWithCtoken, {
    method: 'POST',
    body: formData,
    headers,
    credentials: 'include',
  })
    .then(checkStatus)
    .then(response => {
      return response.json();
    })
    .then(resData => {
      onSuccess(resData, file);
    })
    .catch(onError);
}
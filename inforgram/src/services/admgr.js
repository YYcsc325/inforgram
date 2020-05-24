import request from '../utils/request';

let localHost = 'http://localhost:3000'
// get请求的时候把参数铺平 
function dealGetData(params = {}){
  let str = '';
  for(let key in params){
    str += `${key}=${params[key]}&`
  }
  return str;
}

export async function queryList({ key, entity, mapData = d => d, callback, ...params }) {
  return request(`${localHost}/${entity}/${key}?${dealGetData(params)}`, {
    method: 'GET',
    callback,
  });
}
export async function postListData({ entity, callback, action, ...params }){
  return request(`${localHost}/${entity}/${action}`, {
    method: 'POST',
    callback,
    body: {
      ...params,
    },
  });
}
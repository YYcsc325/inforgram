import request from '../utils/request';
import { objToQs } from '../utils/utils';

let localHost = 'http://localhost:3000';


export async function queryList({ key, entity, mapData = d => d, callback, ...params }) {
  return request(`${localHost}/${entity}/${key}?${objToQs(params)}`, {
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
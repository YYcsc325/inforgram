import { stringify } from 'qs';
// import request from "~/util/request";
import adRequest from '~/util/adrequest';
import uploadRequest from '~/util/uploadrequest';

const PERFIX = '/ad/portal';

export async function queryAdAdminAdcreativeSearch(params) {
  return adRequest(`/ad/admin/adcreative/search?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function queryGlobalConfig() {
  return adRequest('/ad/global/config.json', {
    method: 'GET',
  });
}

export async function queryUserDetail() {
  return adRequest('/ad/user/detail.json', {
    method: 'GET',
  });
}

export async function queryList({ key, entity, mapData = d => d, callback, ...params }) {
  const entityUri = entity ? '/' + entity : '';
  // console.log(`/ad${entityUri}/${key}.json?${stringify(params)}`);
  return adRequest(`${PERFIX}${entityUri}/${key}.json?${stringify(params)}`, {
    method: 'GET',
    callback,
  });
}

export async function queryStateRecord({ type, callback, ...params }) {
  return adRequest(`${PERFIX}/finance/${type}.json?${stringify(params)}`, {
    method: 'GET',
    callback,
  });
}

export async function recordAction({ entity, action, callback, ...params }) {
  return adRequest(`${PERFIX}/${entity}/${action}.json`, {
    method: 'POST',
    postType: 'form',
    callback,
    body: {
      ...params,
    },
  });
}

export async function submitForm({ entity, callback, action, ...params }) {
  return adRequest(`${PERFIX}/${entity}/${action}.json`, {
    method: 'POST',
    callback,
    body: {
      ...params,
    },
  });
}

export async function deleteObject({ callback, ...params }) {
  return adRequest(`${PERFIX}/obj/delete.json?${stringify(params)}`, {
    method: 'GET',
    callback,
  });
}

export async function uploadFileRequest({ file, name }) {
  return uploadRequest(`${PERFIX}/file/upload.json`, { file, name });
}

export async function fetchPlanSelectdata({}) {
  return adRequest(`${PERFIX}/plan/basic/list.json`, {
    method: 'GET',
  });
}

export async function fetchUnitSelectdata({ callback, ...params }) {
  return adRequest(`${PERFIX}/group/basic/list.json?${stringify(params)}`, {
    method: 'GET',
    callback,
  });
}

export async function submitCreativeForm({ callback, ...params }) {
  return adRequest(`${PERFIX}/creative/add.json`, {
    method: 'POST',
    body: params,
    callback,
  });
}
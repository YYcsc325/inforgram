import {
    queryList,
    queryConfig,
    recordAction,
    submitForm,
    queryUserDetail,
    deleteObject,
    fetchPlanSelectdata,
    fetchUnitSelectdata,
  } from '~/service/admgr';
  import { setIn, getIn } from '~/util/manipulate';
  import { message } from '@alipay/bigfish/antd';
  
  export const defaultDataModel = {
    list: [],
    pagination: {},
  };
  
  let lastPathName = '';
  
  export default {
    state: {},
    effects: {
      *fetchUserDetail({ payload }, { call, put }) {
        const response = yield call(queryUserDetail, { ...payload });
        yield put({
          type: 'saveUserDetail',
          payload: response,
        });
        return response;
      },
      *fetchList({ payload, key, entity, mapData, customkey }, { call, put }) {
        const response = yield call(queryList, { ...payload, key, entity });
        yield put({
          type: 'save',
          payload: response,
          key,
          entity,
          mapData,
          customkey,
        });
        return response;
      },
      *deleteObject({ payload }, { call, put }) {
        const response = yield call(deleteObject, { type: payload.entity, id: payload.id });
        if (response) {
          message.success('删除成功');
        }
        return response;
      },
      *recordAction({ payload, entity, action, hasMessage = true }, { call, put }) {
        // console.log("payload", payload);
        // console.log("entity", entity);
        // console.log("action", action);
        const response = yield call(recordAction, { ...payload, entity, action });
        if (response && hasMessage) {
          message.success('操作成功');
        }
        return response;
      },
      *recordConfirm({ payload, entity, action }, { call, put }) {
        // console.log("payload", payload);
        // console.log("entity", entity);
        // console.log("action", action);
        const response = yield call(recordAction, { ...payload, entity, action });
        yield put({
          type: 'save',
          payload: response,
          key: action,
          entity,
        });
        return response;
      },
      *submitForm({ payload, entity, action, needSave = false }, { call, put }) {
        const { needCustomMsg = false, msg = '提交成功', callback, ...restProps } = payload;
        const response = yield call(submitForm, { ...restProps, entity, action, callback });
        if (response && !response.hasFieldErrors) {
          !needCustomMsg && message.success(msg);
        }
        if (needSave) {
          yield put({
            type: 'save',
            payload: response,
            key: action,
            entity,
          });
        }
        return response;
      },
      *fetchPlanSelectdata({ payload, key, entity, mapData }, { call, put }) {
        const response = yield call(fetchPlanSelectdata, { ...payload });
        console.log('fetchPlanSelectdata', response);
        yield put({
          type: 'save',
          payload: response.data,
          key,
          entity,
          mapData,
        });
        // message.success('提交成功');
        return response;
      },
      *fetchUnitSelectdata({ payload, key, entity, mapData }, { call, put }) {
        const response = yield call(fetchUnitSelectdata, { ...payload });
        yield put({
          type: 'save',
          payload: response.data,
          key,
          entity,
          mapData,
        });
        // message.success('提交成功');
        return response;
      },
      *fetchCreativeList({ key, entity, mapData }, { call, put, select }) {
        const params = yield select(state => state.adEntities.creativeParams);
        const response = yield call(queryList, { ...params, key: 'pageList', entity: 'creative' });
        yield put({
          type: 'updateIn',
          payload: {
            value: response,
            path: ['creative', 'pageList'],
          },
        });
        return response;
      },
      *fetchGroupList({ key, entity, mapData }, { call, put, select }) {
        const params = yield select(state => state.adEntities.groupParams);
        const response = yield call(queryList, { ...params, key: 'list', entity: 'group' });
        yield put({
          type: 'updateIn',
          payload: {
            value: response,
            path: ['group', 'list'],
          },
        });
        return response;
      },
    },
    reducers: {
      updateIn(state, action) {
        return setIn(state, action.payload.path, action.payload.value);
      },
      saveUserDetail(state, action) {
        return {
          ...state,
          userdetail: action.payload,
        };
      },
      save(state, action) {
        return {
          ...state,
          [action.entity]: {
            ...state[action.entity],
            [action.key]: action.customkey
              ? {
                  ...getIn(state, [action.entity, action.key], {}),
                  [action.customkey]: action.payload,
                }
              : action.payload,
          },
        };
      },
      saveConfig(state, action) {
        return {
          ...state,
          adconfig: {
            ...state['adconfig'],
            [action.configtype]: action.payload[action.configtype],
          },
          // ["adconfig"]: {
          //   ...state["adconfig"],
          //   [action.configtype]: action.payload
          // }
        };
      },
      /**
       * 保存创意请求参数
       * @param {*} state
       * @param {*} action
       */
      saveCreativeParams(state, action) {
        return {
          ...state,
          creativeParams: action.payload,
        };
      },
      /**
       * 保存创意请求参数
       * @param {*} state
       * @param {*} action
       */
      saveGroupParams(state, action) {
        return {
          ...state,
          groupParams: action.payload,
        };
      },
      clearState(state, action) {
        return {};
      },
    },
    subscriptions: {
      setup({ dispatch, history }) {
        return history.listen(({ pathname }) => {
          if (lastPathName === pathname) return;
          lastPathName = pathname;
          dispatch({ type: 'clearState' });
        });
      },
    },
  };
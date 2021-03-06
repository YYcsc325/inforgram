import { queryList } from '../services/admgr';
import { getIn } from '../utils/utils'

export default {
  namespace: 'admintes',
  state: {},
  effects: {
    *fetchList({ payload, key, entity, mapData, customkey }, { call, put }) {
      const response = yield call(queryList, { ...payload, key, entity });
      yield put({
        type: 'save',
        payload: response.result,
        key,
        entity,
      });
      return response;
    },
    *submitForm({ payload, entity, action, needSave = false }, { call, put }) {
    },
  },
  reducers: {
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
    clearState(state, action) {
      return {};
    },
  },
  // 监听页面上相应的事件，或者其它变化

  subscriptions: {
    setup({ dispatch, history }) {
      // 这里是监听路由变化

      history.listen((location) => {
        console.log(location, 'location')
      })
    },
  },
};
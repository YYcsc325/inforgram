import { queryList } from '../services/admgr';
import { getIn } from '../utils/utils'

export default {
  namespace: 'user',
  state: {},
  effects: {
    *fetchUserList({ payload, key, entity, mapData, customkey }, { call, put }) {
      const response = yield call(queryList, { ...payload, key, entity });
      yield put({
        type: 'save',
        payload: response.result,
        key,
        entity,
      });
      return response;
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
  subscriptions: {
    setup({ dispatch, history }) {
      
    },
  },
};
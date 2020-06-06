import { setIn } from '../utils/utils';

export default {
  // `namespace` will be set as file name by default
  // namespace: 'user',
  namespace: 'adloading',
  state: {},

  effects: {},

  reducers: {
    SHOW(state, Action) {
      const { payload } = Action;
      const { namespace, action, entity, key } = payload;
      return setIn(state, [namespace, entity, action || key], true);
    },
    HIDE(state, Action) {
      const { payload } = Action;
      const { namespace, action, entity, key } = payload;
      return setIn(state, [namespace, entity, action || key], false);
    },
  },
};
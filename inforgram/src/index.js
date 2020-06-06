import dva from 'dva';
import createLoading from 'dva-loading';
import RouterConfig from "./router"
import { createBrowserHistory as createHistory } from "history";
import './index.css';

const SHOW = 'adloading/SHOW';
const HIDE = 'adloading/HIDE';

const app = dva({ 
  history: createHistory(),
  // 每次异步请求都会触发这个钩子 - （对每个异步请求做loading处理）

  onEffect: function onEffect(effect, { put }, model, actionType ) {
    const { namespace } = model
    return function*(...args) {
      const [{ key, entity, action }] = args;
      yield put({ type: SHOW, payload: { namespace, actionType, action, entity, key } });
      yield effect(...args);
      yield put({ type: HIDE, payload: { namespace, actionType, action, entity, key } });
    }
  }
});

// 2. Plugins
// app.use({});
app.use(createLoading())
// 3. Model
app.model(require('./models/admintes').default);
app.model(require('./models/user').default);
app.model(require('./models/adloading').default)
// 4. Router
app.router(RouterConfig);

// 5. Start
app.start('#root');

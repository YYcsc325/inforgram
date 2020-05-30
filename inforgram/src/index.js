import dva from 'dva';
import RouterConfig from "./router"
import { createBrowserHistory as createHistory } from "history"
import './index.css';

const app = dva({ 
  history: createHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/admintes').default);
app.model(require('./models/user').default);
// 4. Router
app.router(RouterConfig);

// 5. Start
app.start('#root');

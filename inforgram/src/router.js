import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Introduce from './pages/Introduce/index';
import Home from './pages/Home/index';
import Login from './pages/Login/index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Introduce} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

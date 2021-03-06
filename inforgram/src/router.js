import React from 'react';
import { Router, Route, Switch, Link, Redirect } from 'dva/router';
import ProvideRoute, { routes } from './routeConfig'
import Login from './pages/Login/index';
import Introduce from './pages/Introduce/index'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/introduce' exact component={Introduce}/>
        <Route path='/login' exact component={Login}/>
        {routes.map((route, i) => (
          <ProvideRoute key={i} {...route} />
        ))}
      </Switch>
    </Router>
  );
}

export default RouterConfig;

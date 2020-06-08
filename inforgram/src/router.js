import React from 'react';
import { Router, Route, Switch, Link, Redirect } from 'dva/router';
import Introduce from './pages/Introduce/index';
import BasicLayOut from './pages/LayOut/BasicLayOut.js';
import Login from './pages/Login/index';
import Cookies from 'js-cookie'

function jsonParse(strObj){
  try{
      return JSON.parse(strObj);
  }catch(e){
     console.log(e);
     return {}
  }
}
// 相当于withRouter的用法
const ProvideRoute = ({component: Component, ...rest}) => {
  const { login } = jsonParse(Cookies.get('userLogin')) || {};
  return <Route
          {...rest}
          render = {props => {
              return login ? <Component {...props}/> : <Redirect to={{pathname: '/login'}}/>          
          }}
      />
}
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/login' exact component={Login}/>
        <Route path='/introduce' exact component={Introduce}/>
        <ProvideRoute path='/' component={BasicLayOut}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;

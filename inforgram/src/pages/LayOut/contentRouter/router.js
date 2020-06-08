import React, { Fragment } from 'react';
import { Router, Route, Switch, Link, Redirect } from 'dva/router';
import Cookies from 'js-cookie'
import Home from '../../Home/index'
function NoMatch(){
    return <div>对不起页面没找到!</div>
}
function List(){
    return <div>list页面</div>
}
// switch向下匹配，匹配到了便不会继续匹配，Redirect全部匹配不到跳转到指定页面，
// 最后一行route是所有匹配不到，就给出匹配不到的页面提示

const ContentRouter = () => {
  return (
    <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/home' exact component={Home}/>
        <Route path='/list' exact component={List}/>
        {/* <Redirect to={{pathname: '/login'}}/>     */}
        <Route path="*" component={NoMatch}/>
    </Switch>
  );
}

export default ContentRouter;

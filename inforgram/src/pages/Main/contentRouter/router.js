import React from 'react';
import { Router, Route, Switch, Link, Redirect } from 'dva/router';
import Cookies from 'js-cookie'

function Home(){
    return <div>这是home页面</div>
}
function NoMatch(){
    return <div>对不起页面没找到</div>
}
const ContentRouter = () => {
  return (
    <Switch>
      <Route path='/home' component={Home}/>
      <Route component={NoMatch}/>
    </Switch>
  );
}

export default ContentRouter;

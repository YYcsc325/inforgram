import React from 'react';
import { Router, Route, Switch, Link, Redirect } from 'dva/router';
import ProvideRoute from '../../routeConfig'
import './home.less';

const Home = (props) => {
    const { routes } = props;
    return (
        <div className='home'>
            这是home界面
            <Switch>
                {routes.map((route, i) => (
                <ProvideRoute key={i} {...route} />
                ))}
            </Switch>
        </div>
    )
}
export default Home
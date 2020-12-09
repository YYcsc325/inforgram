import React, { Component } from 'react';
import Silder from './silder/index.js';
import Header from './header/index.js';
import { Router, Route, Switch, Link, Redirect } from 'dva/router';
import { connect } from 'dva';
import { Layout, Breadcrumb } from 'antd';
import ProvideRoute from '../../routeConfig'
import './layout.less';

@connect(
  state => {
      return {
      }
  },
  // dispatch => {
  //   return {}
  // }
)

class BasicLayOut extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  componentDidMount(){
    
  }
  render(){
    const { location, routes } = this.props;
    return (
      <div className="layOut" /*key={location.key}*/ >
        <Layout style={{height:"100vh"}}>
            <Header/>
            <Layout>
              <Silder 
                 location={location}
              />
            <Switch>
              {routes.map((route, i) => (
                <ProvideRoute key={i} {...route} />
              ))}
            </Switch>
            </Layout>
        </Layout>
      </div>
    )
  }
}

export default BasicLayOut;

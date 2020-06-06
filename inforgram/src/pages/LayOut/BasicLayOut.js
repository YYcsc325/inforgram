import React, { Component } from 'react';
import Silder from '../Main/silder/index';
import Header from '../Main/header/index';
import Content from '../Main/content/index'
import { Layout } from 'antd';
import './layOut.less';

class BasicLayOut extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render(){
    return (
      <div className="layOut">
        <Layout style={{height:"100vh"}}>
            <Header />
            <Layout>
              <Silder />
              <Content />
            </Layout>
        </Layout>
    </div>
    )
  }
}
export default BasicLayOut;

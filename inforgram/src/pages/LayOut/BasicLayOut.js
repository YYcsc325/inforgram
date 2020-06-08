import React, { Component } from 'react';
import Silder from './silder/index.js';
import Header from './header/index.js';
import Content from './content/index.js';
import { connect } from 'dva';
import { Layout } from 'antd';
import './layOut.less';

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
    const { location } = this.props;
    return (
      <div className="layOut" key={location.key} >
        <Layout style={{height:"100vh"}}>
            <Header 
               
            />
            <Layout>
              <Silder 
                 
              />
              <Content 

              />
            </Layout>
        </Layout>
      </div>
    )
  }
}

export default BasicLayOut;

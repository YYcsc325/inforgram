import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout } from 'antd';
import './index.less';

const { Header } = Layout;

// 不设置dispatch 会自动在this.props中注入dispatch
@connect(
  state => {
    return {
      data: '23'
    }
  },
  // dispatch => {
  //   return {}
  // }
)

class GlobalHeader extends Component {
    constructor(props) {
        super(props);
        this.state={
            
        }
    }

    render() {
        return (
          <Header className="header">
              <div className="logo">
                <Link to={'/introduce'}>跳转介绍页</Link>
              </div>
              <span className='tab'>个人中心管理系统</span>
          </Header>
        )
    }
}

GlobalHeader.propTypes = {

}
export default GlobalHeader;
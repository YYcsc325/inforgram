import React, { Component } from 'react'
import { Spin } from 'antd';
import className from 'classnames'
import './index.less';

class Spins extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        const { spinning = false } = this.props;
        return (
            <div className={className('spinWarp', {
                ['hasSpins']: spinning
            })}>
              <Spin tip={'Loading...'} spinning={spinning} />
            </div>
        )
    }
}

export default Spins;
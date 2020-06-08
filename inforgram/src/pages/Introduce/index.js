/**
 * @name 介绍页面
 * @Auth CENSHICHAO
 */
import React, { Component } from 'react';
import { connect } from 'dva';


@connect(
    state => {
        return {
        }
    },
    // dispatch => {
    //   return {}
    // }
)

class Introduce extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render(){
        return (
            <div>
                <div>我是介绍页面</div>
            </div>
        )
    }
}

export default Introduce
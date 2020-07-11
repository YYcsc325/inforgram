/**
 * @name 介绍页面
 * @Auth CENSHICHAO
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import Container from './dragTarget/Container';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import Preview from '../../components/Preview/index'

@connect(
  state => {
    return {}
  },
  // dispatch => {
  //   return {}
  // }
)

class Introduce extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div className="App">
        <DndProvider backend={HTML5Backend}>
          <Container />
        </DndProvider>
        <Preview 
           customMask={(<img src={'http://img2.imgtn.bdimg.com/it/u=3313838802,2768404782&fm=26&gp=0.jpg'}/>)}
        />
      </div>
    )
  }
}

export default Introduce
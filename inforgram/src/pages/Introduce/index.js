/**
 * @name 介绍页面
 * @Auth CENSHICHAO
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import Container from './dragTarget/Container';
import CustomMove from './dragMove/Example'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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
                {/* <DndProvider backend={HTML5Backend}>
				  <CustomMove />
				</DndProvider> */}
			</div>
        )
    }
}

export default Introduce
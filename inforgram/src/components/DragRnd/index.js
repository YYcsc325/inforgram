/**
 * @name  DragRnd
 * @auth  CENSHICHAO
 * @param { props , id必须 }
 * @description 渲染单个元素 
 */

import React, { Component } from 'react';
import ImgBox from '../ImgBox/index';
import LineChart from '../Chart/LineChart/view';
import { spanRender } from './position';
import className from 'classnames';
import { Rnd } from "react-rnd";
import './index.less'

// 渲染单个元素
const renderItem = (item) => {
    const { customType } = item;
    switch (customType) {
        case 'img':
            return <ImgBox {...item} />
        case 'lineChart':
            return <LineChart {...item} />
        default:
            return null
    }
}

class DragRnd extends Component {
    constructor(props) {
        super(props);
        const { width, height, left, top } = props;
        this.state = {
            width: width || 550,
            height: height || 400,
            x: left - (width || 225 ),
            y: top - (height || 200)
        }
    }
    render() {
        const { width, height, x, y } = this.state;
        const { id, onHandleClick = () => {}, clickId = '' } = this.props;
        
        return (
            <Rnd
                key={id}
                size={{ width: width, height: height }}
                position={{ x: x, y: y }}
                className={className('dragWarpClass', {
                    'isActive': clickId === id
                })}
                onClick={() => {
                    onHandleClick(id)
                }}
                onMouseDown={(e) => {
                    e.preventDefault();
                }}
                onDragStop={(e, d) => {
                    this.setState({ x: d.x, y: d.y })
                }}
                onResize={(e, direction, ref, delta, position) => {
                    this.setState({
                        width: ref.offsetWidth,
                        height: ref.offsetHeight,
                        ...position,
                    });
                }}
            >
                {
                    clickId === id && <div>
                        {
                            spanRender.map(item => <span className={className('defaultSpan', item.position)} key={item.position}></span>)
                        }
                    </div>
                }
                <div style={{ width: '100%', height: '100%' }}>
                    {renderItem({ ...this.props, width, height })}
                </div>
            </Rnd>
        )
    }
}
export default DragRnd
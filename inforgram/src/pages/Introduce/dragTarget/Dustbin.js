import React, { useState, forwardRef, useCallback, useEffect } from 'react';
import { Rnd } from "react-rnd";
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import update from 'immutability-helper';
import ImgBox from '../../../components/ImgBox/index';
import LineChart from '../../../components/Chart/LineChart/view';
import className from 'classnames';
import './index.less'

const style = {
    height: '500px',
    width: '1000px',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
    border: '1px solid #aaa',
    position: 'relative',
}

const spanRender = [
    {
        position: 'leftTop'
    },{
        position: 'centerTop'
    },{
        position: 'rightTop'
    },{
        position: 'leftCenter'
    },{
        position: 'rightCenter'
    },{
        position: 'leftBottom'
    },{
        position: 'centerBottom'
    },{
        position: 'rightBottom'
    }
]

/**
 * @name 渲染容器组件
 * @param {*} props 
 * @param {*} returnRef 
 */
const Dustbin = (props = {}, returnRef) => {

    let { list, setList } = props;
    const [id, setId] = useState(null);
    // useCallback返回一个新的函数
    const moveBox = useCallback(
        (id, left, top) => {
            let targetIndex = list.findIndex(item => item.id === id);

            // updates返回计算过之后的boxes的值, 对应的left，top
            setList(
                update(list, {
                    [targetIndex]: {
                        $merge: { left, top },
                    },
                }),
            )
        },
        [list],
    );

    // 空点击的时候去除选择元素的边框 
    useEffect(() => {
         document.onclick = function (e){ 
             if(e.target.nodeName === 'DIV'){
                setId(null)
             }
         }
    });

    // 放下拖拽元素的触发的事件 
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.BOX,
        drop: (item, monitor) => {
            
            const { url, id, customType } = item;
            let isFind = list.find(keys => keys.id === id);
            if (isFind) {
                // 计算拖动元素的x,y偏移量    getClientOffset函数返回指针最后记录的偏移量
                const delta = monitor.getDifferenceFromInitialOffset();
                let left = Math.round(item.left + delta.x)
                let top = Math.round(item.top + delta.y)
                moveBox(item.id, left, top)
                return undefined
            } else {
                let { x, y } = monitor.getClientOffset();
                setList([...list, { ...item, left: x, top: y }])
                return ({ name: 'Dustbin', url })
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

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
    
    return (
        <div ref={returnRef} className={'dragDustbin'}>
            <div ref={drop} style={{ ...style }}>
                {
                    list.map(item => {
                        return <Rnd
                            key={item.id}
                            default={{
                                x: item.left,
                                y: item.top,
                            }}
                            className={className('dragWarpClass', {
                                'isActive': item.id === id
                            })}
                            onClick={() => {
                                setId(item.id)
                            }}
                            onMouseDown={(e) => {
                                e.preventDefault();
                            }}
                        >
                            {
                                item.id === id && <div>
                                    {
                                        spanRender.map(item => <span className={className('defaultSpan', item.position, {
                                            
                                        })}></span>)
                                    }
                                </div>
                            }
                            {renderItem(item)}
                        </Rnd>
                    })
                }
            </div>
        </div>

    )
}
export default forwardRef(Dustbin)
import React, { useState, forwardRef, useCallback, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import update from 'immutability-helper';
import DragRnd from '../../../components/DragRnd/index'
import './index.less'

const style = {
    height: '800px',
    width: '100%',
    color: 'white',
    fontSize: '1rem',
    lineHeight: 'normal',
    border: '1px solid #aaa',
    position: 'relative',
}

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
            
            const { id } = item;
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
                return ({ name: 'Dustbin' })
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }) 
    const handleClick = (id) => {
        setId(id)
    }
    return (
        <div ref={returnRef} className={'dragDustbin'}>
            <div ref={drop} style={{ ...style }}>
                {
                    list.map(item => {
                        return <DragRnd {...item} onHandleClick={handleClick} clickId={id}/>
                    })
                }
            </div>
        </div>

    )
}
export default forwardRef(Dustbin)
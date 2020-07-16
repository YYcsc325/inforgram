import React, { useState, forwardRef, useCallback, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import update from 'immutability-helper';
import DragRnd from '../../../components/DragRnd/index';
import DragCanvas from './DragCanvas'
import './index.less'

const style = {
    height: '600px',
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
    const [allPosition, setAllPosition] = useState({});
    // 空点击的时候去除选择元素的边框 
    useEffect(() => {
        document.onclick = function (e) {
            if (e.target.nodeName === 'DIV' || e.target.nodeName === 'CANVAS') {
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

            // 如果没找到就是添加一个新元素
            if (!isFind) {
                let { x, y } = monitor.getClientOffset();
                setList([...list, { ...item, left: x, top: y }])
            }
            return ({ ...item })
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
            <div ref={drop} style={{ ...style }} className={'content'}>
                <DragCanvas allPosition={allPosition}/>
                {
                    list.map(item => {
                        return <DragRnd {...item} onHandleClick={handleClick} clickId={id} setAllPosition={setAllPosition} allPosition={allPosition} />
                    })
                }
            </div>
        </div>

    )
}
export default forwardRef(Dustbin)
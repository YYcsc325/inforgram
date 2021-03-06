import React, { useState, forwardRef, useCallback, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import DragRnd from '../../../components/DragRnd/index';
import DragCanvas from './DragCanvas'
import './index.less'

/**
 * @name 渲染容器组件
 * @param {*} props 
 * @param {*} returnRef 
 */
const Dustbin = (props = {}, returnRef) => {

    const [ clickId, setClickId ] = useState(null);
    const [ list, setList ] = useState([])
    const [ allPosition, setAllPosition ] = useState({});

    // 空点击的时候去除选择元素的边框 
    useEffect(() => {
        document.onclick = function (e) {
            if (e.target.nodeName === 'DIV') {
                setClickId(null)
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
                let { x, y } = monitor.getClientOffset();     // 获取位置有点问题
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
        setClickId(id)
    }

    return (
        <div ref={returnRef} className={'dragDustbin'} >
            <DragCanvas allPosition={allPosition} clickId={clickId} />
            <div ref={drop} className={'content'}>
                {
                    list.map(item => {
                        const { id } = item;
                        return (
                            <DragRnd
                                {...item}
                                isActive={clickId === id}
                                allPosition={allPosition}
                                onHandleClick={handleClick}
                                setAllPosition={setAllPosition}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
export default forwardRef(Dustbin)
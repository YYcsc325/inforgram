import React, { useState, forwardRef, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes';
import update from 'immutability-helper';
import { DraggableBox } from './DraggableBox'

const style = {
    height: '500px',
    width: '1000px',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
    border: '1px solid #aaa',
    // display: 'flex',
    // justifyContent: 'space-around',
    // flexWrap: 'wrap',
    position: 'relative'
}

const Dustbin = (props = {}, returnRef) => {

    let { list, setList } = props;

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

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.BOX,
        drop: (item, monitor) => {

            const { url, id } = item;
            let isFind = list.find(keys => keys.id === id);
            
            if(isFind){

              // 计算拖动元素的x,y偏移量    getClientOffset函数返回指针最后记录的偏移量
              const delta = monitor.getDifferenceFromInitialOffset();
              let left = Math.round(item.left + delta.x)
              let top = Math.round(item.top + delta.y)
              moveBox(item.id, left, top)
              return undefined

            }else{

              setList([...list, { ...item, top: 0, left: 0}])
              return ({ name: 'Dustbin', url })

            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const isActive = canDrop && isOver;

      let borderColor = '#aaa';
      let backgroundColor = '#ddd';
      if (isActive) {
        borderColor = 'darkgreen';
        backgroundColor = '#eee'
      } else if (canDrop) {
        borderColor = 'darkkhaki';
        backgroundColor = '#eee'
      }

    return (
        <div ref={returnRef}>
            <div ref={drop} style={{ ...style, borderColor, backgroundColor }}>
                {
                    list.map(item => {
                        return <DraggableBox key={item.id} id={item.id} {...item}/>
                    })
                }
            </div>
        </div>

    )
}
export default forwardRef(Dustbin)
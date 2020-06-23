/**
 * @name 处理渲染数据的偏移量x,y坐标的
 */
import React, { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { DraggableBox } from './DraggableBox'
import { snapToGrid as doSnapToGrid } from './snapToGrid'
import update from 'immutability-helper';

const styles = {
  width: 1000,
  height: 500,
  border: '1px solid black',
  position: 'relative',
}

let dragList = [
  {
    top: 0, left: 0, title: '请拖我', id: '1'
  },
  {
    top: 0, left: 0, title: '也请拖我' , id: '2'
  }
]

export const Container = ({ snapToGrid }) => {

  const [boxes, setBoxes] = useState(dragList)

  // useCallback返回一个新的函数
  const moveBox = useCallback(
    (id, left, top) => {
      let targetIndex = boxes.findIndex(item => item.id === id);

      // updates返回计算过之后的boxes的值, 对应的left，top
      setBoxes(
        update(boxes, {
          [targetIndex]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [boxes],
  );
  
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {

      // 计算拖动元素的x,y偏移量    getClientOffset函数返回指针最后记录的偏移量
      const delta = monitor.getDifferenceFromInitialOffset();
      
      let left = Math.round(item.left + delta.x)
      let top = Math.round(item.top + delta.y)
      // if (snapToGrid) {
      //   [left, top] = doSnapToGrid(left, top)
      // }
      moveBox(item.id, left, top)
      return undefined
    },
  })
  
  return (
    <div ref={drop} style={styles}>
      {boxes.map(item => <DraggableBox key={item.id} id={item.id} {...item}/>)}
    </div>
  )
}
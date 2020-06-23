import React, { useState, useCallback } from 'react'
import { Container } from './Container'
import { CustomDragLayer } from './CustomDragLayer';

// 不拖动的时候展示Container这个组件, 拖动的时候展示CustomDragLayer这个组件，因为是根据translate去计算的，不是实时计算元素offset的值。


const Example = () => {
  const [snapToGridAfterDrop, setSnapToGridAfterDrop] = useState(false)
  const [snapToGridWhileDragging, setSnapToGridWhileDragging] = useState(false)
  // const handleSnapToGridAfterDropChange = useCallback(() => {
  //   setSnapToGridAfterDrop(!snapToGridAfterDrop)
  // }, [snapToGridAfterDrop])
  // const handleSnapToGridWhileDraggingChange = useCallback(() => {
  //   setSnapToGridWhileDragging(!snapToGridWhileDragging)
  // }, [snapToGridWhileDragging])
  return (
    <div>
      <Container snapToGrid={snapToGridAfterDrop} />
      <CustomDragLayer snapToGrid={snapToGridWhileDragging} />
      {/* <p>
        <label htmlFor="snapToGridWhileDragging">
          <input
            id="snapToGridWhileDragging"
            type="checkbox"
            checked={snapToGridWhileDragging}
            onChange={handleSnapToGridWhileDraggingChange}
          />
          <small>Snap to grid while dragging</small>
        </label>
        <br />
        <label htmlFor="snapToGridAfterDrop">
          <input
            id="snapToGridAfterDrop"
            type="checkbox"
            checked={snapToGridAfterDrop}
            onChange={handleSnapToGridAfterDropChange}
          />
          <small>Snap to grid after drop</small>
        </label>
      </p> */}
    </div>
  )
}

export default Example;
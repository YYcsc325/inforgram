/**
 * @name drag的时候持续进行
 * @desc 一直计算translate的值
 */

import React from 'react'
import { useDragLayer } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { ImgBox } from './ImgBox'
import LineChart from '../../../components/Chart/LineChart/view';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

function getItemStyles(initialOffset, currentOffset, isSnapToGrid) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    }
  }
  let { x, y } = currentOffset
  // if (isSnapToGrid) {
  //   x -= initialOffset.x
  //   y -= initialOffset.y
  //   ;[x, y] = snapToGrid(x, y)
  //   x += initialOffset.x
  //   y += initialOffset.y
  // }
  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}

export const CustomDragLayer = (props) => {
  
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))
  
  function renderItem(customType) {
    switch (customType) {
      case 'img':
        return <ImgBox {...item} />
      case 'lineChart':
        return <LineChart {...item}/>
      default:
        return null
    }
  }

  if (!isDragging) {
    return null
  }

  return (  
    <div style={layerStyles}>
      <div
        style={getItemStyles(initialOffset, currentOffset, props.snapToGrid)}
      >
        {renderItem(item.customType)}
      </div>
    </div>
  )
}
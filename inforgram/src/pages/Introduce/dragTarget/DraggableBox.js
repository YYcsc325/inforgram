import React, { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { ImgBox } from './ImgBox';
import LineChart from '../../../components/Chart/LineChart/view'

function getStyles(left, top, isDragging) {
  const transform = `translate3d(${left}px, ${top}px, 0)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  }
}

export const DraggableBox = (props) => {

  const { id, left, top, url, customType } = props
  
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.BOX, id, customType, left, top, url, isShow: true},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  useEffect(() => {

    // 消除拖动时的多层级阴影
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  const renderItem = (customType) => {
    switch (customType) {
      case 'img':
        return <ImgBox {...props} />
      case 'lineChart':
        return <LineChart {...props}/>
      default:
        return null
    }
  }

  return (
    <div ref={drag} style={getStyles(left, top, isDragging)}>
      {
        renderItem(customType)
      }
    </div>
  )
}
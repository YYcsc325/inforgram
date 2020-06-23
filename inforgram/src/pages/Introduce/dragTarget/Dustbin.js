import React, { useState, forwardRef } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes';

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
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
}

const Dustbin = (props = {}, returnRef) => {

    let { list, setList } = props;

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.BOX,
        drop: (item, current) => {
            const { url } = item;
            setList([...list, { ...item }])
            return ({ name: 'Dustbin', url })
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
                        const { url } = item;
                        return <img src={url} style={{ width: '200px', height: '100px'}} key={url} />
                    })
                }
            </div>
        </div>

    )
}
export default forwardRef(Dustbin)
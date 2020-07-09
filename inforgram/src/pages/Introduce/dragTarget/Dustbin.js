import React, { useState, forwardRef, useCallback } from 'react';
import { Rnd } from "react-rnd";
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import update from 'immutability-helper';
import ImgBox from '../../../components/ImgBox/index';
import LineChart from '../../../components/Chart/LineChart/view';
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
                        let styles = {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }
                        if (item.id === id) {
                            styles.border = '1px dashed #aaa';
                        } else {
                            styles.border = '1px solid #ddd'
                        }
                        return <Rnd
                            style={{ ...styles }}
                            key={item.id}
                            default={{
                                x: item.left,
                                y: item.top,
                            }}
                            // maxWidth={'800px'}
                            onClick={() => {
                                setId(item.id)
                            }}
                        >
                            {renderItem(item)}
                        </Rnd>
                    })
                }
            </div>
        </div>

    )
}
export default forwardRef(Dustbin)
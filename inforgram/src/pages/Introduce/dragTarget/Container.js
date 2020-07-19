import React, { memo, useState } from 'react';
import DragCanvas from './DragCanvas'
import Dustbin from './Dustbin'
import { Box } from './Box'
import './index.less'

 const Container = memo(function Container() {

  let imgList = [
      {
          url: 'https://graphics.jifo.co/base/images/work.jpg',
          name: '第一张图',
          customType: 'img'
      },
      {
          url: 'https://graphics.jifo.co/base/images/barista.jpg',
          name: '第二章图',
          customType: 'lineChart'
      },
      {
          url: 'https://graphics.jifo.co/base/images/meeting.jpg',
          name: '第三章图',
          customType: 'img'
      }
  ];

  return (
    <div className={'dragMain'}>
      <div>
        <Dustbin/> 
      </div>
      <div>
          {
              imgList.map(item => <Box {...item} />)
          }
      </div>
    </div>
  )
})
export default Container
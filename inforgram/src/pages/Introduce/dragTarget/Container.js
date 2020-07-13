import React, { memo, useState } from 'react';
import './index.less'
import Dustbin from './Dustbin'
import { Box } from './Box'

 const Container = memo(function Container() {

  let [list, setList] = useState([]);

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
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Dustbin list={list} setList={setList}/> 
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
          {
              imgList.map(item => <Box {...item} />)
          }
      </div>
      <a onClick={() => {
          setList([])
      }}>点击清空图片</a>
    </div>
  )
})
export default Container
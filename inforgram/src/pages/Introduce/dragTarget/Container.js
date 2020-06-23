import React, { memo, useState } from 'react'
import Dustbin from './Dustbin'
import { Box } from './Box'

 const Container = memo(function Container() {

  let [list, setList] = useState([]);

  let imgList = [
      {
          url: 'http://img1.imgtn.bdimg.com/it/u=3483415840,2446087639&fm=26&gp=0.jpg',
          name: '第一张图'
      },
      {
          url: 'http://img5.imgtn.bdimg.com/it/u=2729906829,3399182358&fm=26&gp=0.jpg',
          name: '第二章图'
      },
      {
          url: 'http://img2.imgtn.bdimg.com/it/u=3313838802,2768404782&fm=26&gp=0.jpg',
          name: '第三章图'
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
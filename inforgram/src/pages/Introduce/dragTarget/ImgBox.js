import React from 'react'

export const ImgBox = (props) => {
  const { url, isShow } = props;
  return isShow && <img src={url} style={{width: '200px', height: '100px', cursor: 'move'}}/>
}
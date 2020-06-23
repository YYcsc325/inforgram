import React from 'react'

export const ImgBox = (props) => {
  const { url } = props;
  return <img src={url} style={{width: '200px', height: '100px'}}/>
}
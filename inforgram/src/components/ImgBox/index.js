import React from 'react'

const ImgBox = (props) => {
  const { url } = props;
  return <img src={url} style={{ display: 'block', width: '100%', height: '100%' }} />
}

export default ImgBox;
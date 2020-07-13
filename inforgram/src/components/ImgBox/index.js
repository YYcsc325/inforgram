import React from 'react'

const ImgBox = (props) => {
  const { url, width, height } = props;
  const styles = {
    display: 'inline-block',
    width: `${width - 2}px`,
    height: `${height - 2}px`
  }
  return <img src={url} style={{ ...styles }} />
}

export default ImgBox;
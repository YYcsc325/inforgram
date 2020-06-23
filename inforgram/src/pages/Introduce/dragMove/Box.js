import React from 'react'
const styles = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move',
  width: '150px'
}
export const Box = ({ title }) => {
  return <div style={{ ...styles }}>{title}</div>
}
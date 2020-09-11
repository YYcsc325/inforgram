import { Input } from 'antd';
import React, { forwardRef } from 'react';

const FormInput = (props = {}, ref) => {
  return (
    <Input
      {...props}
      ref={ref}
    />
  )
}
export default forwardRef(FormInput);

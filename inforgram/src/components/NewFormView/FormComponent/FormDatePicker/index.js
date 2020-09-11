import { DatePicker } from 'antd';
import React, { forwardRef } from 'react';

const mapUi = {
  datePicker: DatePicker,
  weekPicker: DatePicker.WeekPicker,
  rangePicker: DatePicker.RangePicker,
  monthPicker: DatePicker.MonthPicker,
}

const FormDatePicker = (props = {}, ref) => {
  const { type, ...reset } = props;
  const Element = mapUi[type];
  if(!Element) console.warn(`type: ${ type }传入有误 -- 参考文档https://yuque.antfin.com/pbu5vq/dv6i3b/sioied#3snN3`)
  return (
    Element && <Element {...reset}/>
  )
}
export default forwardRef(FormDatePicker);

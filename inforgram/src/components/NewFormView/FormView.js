import { Form } from 'antd';
import React, { useCallback } from 'react';

import mapUi from './FormComponent/index';
import { processingObj } from './utils';

const FormView = ({
  form,
  formProps = {},
  componentAssignmentProps = {},
  config = [],
  onChange = () => {},
} = {}) => {
  return (
    <Form {...formProps}>
      {config
        .map(({ type, isShow, formItemProps = {}, itemProps = {}, connect, component } = {}) => {

          let Element = component || mapUi[type];
          if(typeof isShow === 'function'){
            isShow = isShow({form, ...componentAssignmentProps});
          }
          if (!Element || !isShow) return;
          
          let RenderElement = Element;
          let FormItem = function ({ children, formItemProp, componentAssignmentProps, ...connectProps }) {
            return <Form.Item {...processingObj(formItemProp, 'calling', {...componentAssignmentProps, ...connectProps})}>{children}</Form.Item>;
          };

          const ItemCom = (props) => {
            const handleChange = useCallback(
              (...args) => {
                const args1 = args.concat([{ ...componentAssignmentProps}, {...props }]);
                if (props.onChange) props.onChange(...args1); // 配置层组件的onChange
                if (onChange) onChange(form.getFieldsValue()); // 最外层组件的onChange
              },
              [props],
            );
            return <Element {...props} onChange={handleChange}/>;
          };

          if (connect && RenderElement) {
            FormItem = connect(FormItem);
            RenderElement = connect(ItemCom);
          }else {
            RenderElement = ItemCom;
          }

          return ( 
            <FormItem formItemProp={formItemProps} componentAssignmentProps={componentAssignmentProps}>
              <RenderElement form={form} {...{...componentAssignmentProps, ...formItemProps, ...itemProps}}/>
            </FormItem>
          );
        })
        .filter(Boolean)}
    </Form>
  );
};

export default FormView;
import { Form } from 'antd';
import React, { useCallback } from 'react';

import mapUi from './FormComponent/index';
import { processingObj } from './utils';

const FormView = ({
  form,
  config = [],
  formProps = {},
  stateProps = {},
  onChange = () => {},
} = {}) => {
  console.log(config, 'config');
  return (
    <Form {...formProps}>
      {config
        .map(({ type, isShow, formItemProps = {}, itemProps = {}, connect, component } = {}) => {

          let Element = component || mapUi[type];
          if(typeof isShow === 'function'){
            isShow = isShow({form, ...stateProps});
          }
          if (!Element || !isShow) return;
          
          let RenderElement = Element;
          let FormItem = function ({ children, formItemProp, stateProps, ...connectProps }) {
            return <Form.Item {...processingObj(formItemProp, 'calling', {...stateProps, ...connectProps})}>{children}</Form.Item>;
          };

          const ItemCom = (props) => {
            const handleChange = useCallback(
              (...args) => {
                const args1 = args.concat([{ ...stateProps}, {...props }]);
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
            <FormItem formItemProp={formItemProps} stateProps={stateProps}>
              <RenderElement form={form} {...{...stateProps, ...formItemProps, ...itemProps}}/>
            </FormItem>
          );
        })
        .filter(Boolean)}
    </Form>
  );
};

export default FormView;
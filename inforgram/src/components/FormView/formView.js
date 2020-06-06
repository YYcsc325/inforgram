/**
 * @name FormView 
 * @auth censhichao
 * @desc 渲染form的数据
 */
import React, { Component, Fragment } from 'react';
import { Select, Form, Input } from 'antd'; 
 const Option = Select.Option;

 const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
 };
 class FormView extends Component {
     constructor(props){
         super(props)
         this.state = {

         }
     }
     render(){
         const { config, className, form } = this.props;
        //  const newLayOut = formLayOut[layOut] || 'horizontal';
        //  const FormInitialValue = filterInitValue(config);
         const mapTypeToUI = {
             // 自定义渲染
             custom: (item, newFormItemLayout) => {
                 const { render:_render, style, className, label, key } = item;
                 
                 return (
                    <Form.Item
                      style={style}
                      className={className}
                      name={key}
                      label={
                        label && <span>{label}</span>
                      }
                      {...newFormItemLayout}
                    >
                        {
                            _render ? _render(item) : null
                        }
                    </Form.Item>
                 )
             },
             input: (item, newFormItemLayout) => {
                 const { onChange, style = {}, placeholder, disabled, rules = [], initialValue, key, label, customRender } = item;
                 const { width, ...reset } = style;
                 return (
                   <div>
                    {customRender && customRender()}
                    <Form.Item
                      label={label}
                      name={key}  
                      rules={rules}
                      initialValue={initialValue}
                      {...newFormItemLayout}
                    >
                      {
                        item.needHide ? 
                        <Input.Password 
                          placeholder={placeholder}
                        /> : 
                        <Input
                          onChange={onChange}
                          style={{ width: width || '100%', ...reset }}
                          placeholder={placeholder}
                          disabled={disabled}
                        />
                      }
                    </Form.Item>
                   </div>
                 )
             },
             select: (item, newFormItemLayout) => {
                 const { options = [], onchange, key, rules = [], label, initialValue, placeholder, disabled } = item;
                 return (
                    <Form.Item
                      label={label}
                      {...newFormItemLayout}
                      name={key}  
                      rules={rules}
                      initialValue={initialValue}
                    >
                      <Select
                          onchange={onchange}
                          placeholder={placeholder}
                          disabled={disabled}
                      >
                          {
                            options.map(items => (<Option key={items.key}>{items.value}</Option>))
                          }
                      </Select>
                    </Form.Item> 
                 )
             },
         }
         const FormItems = config.map((item, index) => {
           const newFormItemLayout = { ...formItemLayout, ...(item.formItemLayout || {}) };
           item.rules = item.rules || [
              {
                required: false,
              },
           ];
           if (item.required) {
              item.rules = item.rules.concat({
                required: true,
                message: '不得为空',
              });
           }
           const content = (mapTypeToUI[item.type] && mapTypeToUI[item.type](item, index, newFormItemLayout)) || null;
           let resNode = content;
           return <Fragment key={index}>{resNode}</Fragment>;
         });
         return (
          <div className={className}>
            <Form
              form={form}
            >
              {FormItems}
            </Form>
          </div>
         )
     }
 }
 export default FormView;
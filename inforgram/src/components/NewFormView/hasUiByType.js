import { Form } from 'antd';

import { isFunc } from './utils';

import mapUi from './FormComponent/index';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

/**
 * @name 渲染被formItem包裹组件
 * @param {*} item
 */
// function RenderElement(props = {}) {
//   const { mapElement, connect, itemProps } = props;
//   let ReturnElement;
//   if (connect && isFunc(connect)) {  // formItem，connect，组件注入。
//     ReturnElement = connect(mapElement);
//   } else {
//     ReturnElement = mapElement;
//   }
  
//   // 需要透传的属性
//   const transparentProps = {
//     ...itemProps,
//   }
//   return <ReturnElement { ...transparentProps } />;
// }

/**
 * @name  遍历对象对function函数进行执行或者绑定操作
 * @param { item, TODO }
 */
function processingObj(item = {}, todo){
  const newItem = {...item};
  for( const key in item ){
    if(isFunc(item[key]) && Object.prototype.hasOwnProperty.call(item, key)){
      if(todo === 'implement'){
        newItem[key] = item[key].call(null, item)
      }else if(todo === 'bindding'){
        newItem[key] = item[key].bind(null, item)
      }else{
        newItem[key] = item[key];
      }
    }
  }
  return newItem;
}

/**
 * @name        包裹formItem
 * @param       { item }
 * @return      FormItemComponent
 * @description 返回被formItem包裹之后的组件   -   (关联connect外部传入props属性这里在bind透穿一下)
 */
function formItemWarp(item = {}, Element ) {
  const returnValue = processingObj(item, 'implement');
  const { itemProps } = returnValue;

  // itemProps内配置的函数一律绑定form -> processingObj函数处理
  let newItemProps = {...itemProps};
  for( const key in itemProps){
    if(isFunc(itemProps[key])){
      newItemProps[key] = itemProps[key].bind(null, item);
    }
  }

  return (
    <FormItem {...{ ...formItemLayout, ...returnValue }} key={returnValue.name}>
      <Element { ...newItemProps } />
    </FormItem>
  );
}

// 根据type是否匹配到UI
function hasUiByType(props = {}) {
  const { type, node } = props;
  // 找到对应渲染的组件
  if (isFunc(node)) return formItemWarp(props, node);        // 第一级如果自定义渲染组件
  if (mapUi[type]) return formItemWarp(props, mapUi[type]);  // 第二季如果有映射UI
  return null;
}

export default hasUiByType;
/**
 * @name 配置层
 */
export default function ({ setChangeKeys }) {
    return [
      {
        type: 'Input',
        name: 'input',
        label: '测试input框',
        rules: [{ required: true, message: '请输入' }],
        itemProps: {
          onChange: (data, val) => {},
          placeholder: '请输入',
          style: {
            width: 500,
          },
        },
        suffix: (data) => {
          return <span style={{marginLeft: '10px', cursor: 'pointer'}} onClick={() => {
            console.log(data, 'data');
          }}>后缀</span>
        },
        initialValue: '123',
      },
      {
        type: 'Select',
        name: 'select',
        label: '测试select框',
        initialValue: ({ itemProps: { options = [] }}) => {
          return options[1].value
        },
        rules: [{ required: true, message: '请选择' }],
        itemProps: {
          onChange: (data, val) => {},
          onSelect: (data, val) => {},
          placeholder: '请选择',
          style: {
            width: 500,
          },
          options: [
            {
              text: '测试数据1',
              value: 'text1',
            },
            {
              text: '测试数据2',
              value: 'text2',
            },
          ],
        },
      },
      {
        type: 'Switch',
        name: 'switch',
        label: '测试Switch',
        itemProps: {
          onChange: (data, val) => {}
        },
      },
      {
        type: 'Checkbox',
        name: 'Checkbox',
        label: '测试Checkbox',
        itemProps: {
          options: [{ label: 'check1', value: '1' },{ label: 'check2', value: '2' }],
          onChange: (data, val) => {}
        }
      },
      {
        type: 'DatePicker',
        name: 'datePicker',
        label: '测试datePicker',
        itemProps: {
          type: 'datePicker'
        },
      },
      {
        type: 'DatePicker',
        name: 'rangePicker',
        label: '测试rangePicker',
        itemProps: {
          type: 'rangePicker',
          onChange: (data, val) => {}
        },
      },
      {
        type: 'DatePicker',
        name: 'weekPicker',
        label: '测试weekPicker',
        itemProps: {
          type: 'weekPicker'
        },
      },
      {
        type: 'InputNumber',
        name: 'inputNumber',
        rules: [{required: true, message: '必填'}],
        label: '测试InputNumber',
        itemProps: {
          onChange: (data, val) => {
            console.log(data, val, 'val')
          },
        },
        initialValue: 123,
      },
      {
        type: 'Radio',
        name: 'radioSingle',
        label: '测试radio',
        itemProps: {
          type: 'radio',
          onChange: (data, val) => {},
          options: [
            {
              label: 'radio1',
              value: 'radio1'
            },{
              label: 'radio2',
              value: 'radio2',
              // disabled: true,
            }
          ]
        }
      },
      {
        type: 'Tree',
        name: 'Tree',
        label: '测试Tree',
        itemProps: {
          onChange: (data, val, info) => {
            console.log(data, val, info);
          }
        }
      },
      {
        type: 'Radio',
        name: 'radioButton',
        label: '测试radioButton',
        itemProps: {
          type: 'radioButton',
          onChange: (data, val) => {},
          options: [
            {
              label: 'radio1',
              value: 'radio1'
            },{
              label: 'radio2',
              value: 'radio2',
              disabled: true,
            }
          ]
        }
      },
      {
        type: 'HideMore',
        name: 'hideMore',
        label: '测试hideMore展开关闭组件',
        itemProps: {
          changeKeys: ['custom', 'radioButton', 'select'],
          changeHide: (data, hideKeys = []) => {
            setChangeKeys(hideKeys)
          },
          text: '更多组件'
        }
      },
      {
        type: 'Input',
        name: 'custom',
        label: '自定义渲染',
        rules: [{ required: true, message: '必填' }],
        itemProps: {
          options: [{ text: '自定义测试数据1', value: 'text1' }],
          age: 123,
        },
        node: (data) => {
          return (
            <div>
              自定义渲染
            </div>
          )
        }
      }
    ];
  }
  
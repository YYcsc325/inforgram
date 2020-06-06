import React from 'react';
import { Checkbox } from 'antd'; 
import Cookies from 'js-cookie'
import './index.less';

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
}
function jsonParse(strObj){
    try{
        return JSON.parse(strObj);
    }catch(e){
       console.log(e);
       return {}
    }
}
export function listConfig(props){
    const { handleSubmit, form, setIsChecked } = props;
    const { email, password } = jsonParse(Cookies.get('userLogin')) || {};
    return [
        {
            key: 'email',
            type: 'input',
            rules: [
                {
                    required: true,
                    message: 'pleace input email'
                }
            ],
            style: {
                height: '40px'
            },
            formItemLayout: formItemLayout,
            customRender: () => {
                return <div style={{textAlign: 'left', color: '#434343', fontSize: '11px', fontWeight: 500, lineHeight: '13px', marginBottom: '8px'}}>Email:</div>
            },
            placeholder: 'pleace input username',
            initialValue: email
        },{
            key: 'passWord',
            type: 'input',
            style: {
                height: '40px'
            },
            formItemLayout: formItemLayout,
            rules: [
                {
                    required: true,
                    message: 'pleace input passWord'
                }
            ],
            customRender: () => {
                return <div style={{textAlign: 'left', color: '#434343', fontSize: '11px', fontWeight: 500, lineHeight: '13px', marginBottom: '8px'}}>Password:</div>
            },
            needHide: true,
            initialValue: password,
            placeholder: 'pleace input password'
        },{
            type:'custom',
            key: 'customCheckBox',
            formItemLayout: formItemLayout,
            render: () => {
                return <div className='selectCheckBox'>
                    <span style={{float: 'left'}}><Checkbox onChange={(e) => {
                        const { checked } = e.target;
                        setIsChecked(checked)
                    }}>Remember me</Checkbox></span>
                    <a>Forgot password?</a>
                </div>
            }
        },{
            type:'custom',
            key: 'customSubmit',
            formItemLayout: formItemLayout,
            render: () => {
                return <div className='loginStyle' onClick={()=>{handleSubmit(form)}}>Log in</div> 
            }
        },{
            type:'custom',
            key: 'customSubmitText',
            formItemLayout: formItemLayout,
            render: () => {
                return <div className='loginTextStyle'>
                    <div className='loginTextStyle_header'>Don't have an account? Register here.</div>
                    <div className='loginLanguage'>
                        <a>English</a>
                        <a>Deutsch</a>
                        <a>Português</a>
                        <a>Español</a>
                        <a>Français</a>
                    </div>
                </div> 
            }
        }
    ]
}

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import RedicretComponent from './redicret';
import { Form, Input } from 'antd';
import FormView from '../../../components/FormView/FormView';
import { listConfig } from '../listConfig';
import { mockData } from '../mockData';
import { openNotification } from '../../../components/Notification/index';
import Cookies from 'js-cookie'
import '../index.less';

const RightComponent = (props) => {
    const { login } = props;
    const [form] = Form.useForm();
    const [ isChecked, setIsChecked ] = useState(false)
    const handleSubmit = (form) => {
        form.validateFields().then(async values => {
            if(login){
                let res = await login(values);
                if(res.code === 200){
                    const { email, password, login } = res.result || {};
                    Cookies.set('userLogin', {
                        email,
                        password,
                        login
                    },{ expires: 1 })
                    props.history.replace('/home')
                }else{
                    openNotification({
                        type: 'warning',
                        message: 'email or password error',
                        description: '邮箱或者密码输入错误，请从新确认!'
                    })
                }
            }
        })
    }
    const config = listConfig({
        handleSubmit,
        setIsChecked,
        form
    });
    return (
        <div className='form_wrapper'>
            <div className='form_container'>
                <h1>Log in</h1>
                <div className='soc_connect'>
                    {
                        (mockData || []).map(item => <RedicretComponent {...item} key={item.rel}/>)
                    }
                </div>
                <div className='ls_or'>
                    <div className='ls_line'></div>
                    <div className='ls_text'>or use your email:</div>
                </div>
                <div>
                  <FormView 
                    config={config}
                    className={'formViewStyle'}
                    form={form}
                  />
                </div>
            </div>
        </div>
    )
}
export default RightComponent
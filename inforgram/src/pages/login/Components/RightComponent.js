import React from 'react';
import RedicretComponent from './redicret';
import { mockData } from '../mockData';
import { Form } from 'antd';
import FormView from '../../../components/FormView/formView';
import listConfig from '../listConfig';
import '../index.less';

const RightComponent = (props) => {
    const { login } = props;
    const [form] = Form.useForm();
    const handleSubmit = (form) => {
        form.validateFields().then(values => {
            if(login){
                login(values);
            }
        })
    }
    const config = listConfig({
        handleSubmit,
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
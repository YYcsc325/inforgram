import React, { useState } from 'react'
import { Form, Button } from 'antd';
import StaticModal from '../../components/StaticModal/view';
import NewFormView from '../../components/NewFormView/FormView';
import { defaultConfig } from './defaultConfig';

const Index = (props = {}) => {

    const [form] = Form.useForm();
    const [initialValueInput] = useState('1234')

    const getName = (target) => {
        let text = /^[1-9]\d*$/;
        if (!target || !text.test(target)) {
            console.log('输入有误')
        }
        if (text.test(target)) {
            console.log(target, 'target')
            console.log('输入成功')
        }
    }

    const handleSubmit = () => {
        console.log(form, 'form')
        form.validateFields().then(values => {
            console.log(values, 'values')
        }).catch(err => {
            console.log(err, 'err')
        })
    }

    const openModal = () => {
        const modal = StaticModal.showModal({
            destroy: () => {
                modal.destroy();
            }
        });
    }
    
    return (
        <div>
            <NewFormView 
               form={form}
               formProps={{
                 layout: 'horizontal',
               }}
               stateProps={{
                   onChangeState: () => {},
                   initialValueInput
               }}
               config={defaultConfig}
            />
            <Button onClick={() => { handleSubmit() }}>点击提交</Button>
            <Button onClick={() => { openModal() }}>点击打开模态框</Button>
        </div>
    )
}

export default Index

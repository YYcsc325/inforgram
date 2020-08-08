import React, { useState } from 'react'
import { Form, Button } from 'antd';
import FormView from '../FormView/formView'
import { getConfig } from './config.js';
import { debounce } from '../../utils/utils'
import StaticModal from '../StaticModal/view';


const getshow = StaticModal.getshow;


const Index = (props = {}) => {

    const [visible, setVisable] = useState(false);
    const [form] = Form.useForm();

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

    const onChange = (e) => {
        let target = e.target.value;
        getName(target);
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
        getshow();
        setVisable(true)
    }
    const checkModal = () => {
        setVisable(false)
    }

    const config = getConfig(props, onChange);

    return (
        <div>
            <FormView
                config={config}
                className={'csc'}
                form={form}
            />
            <Button onClick={() => { handleSubmit() }}>点击提交</Button>
            <StaticModal
                visible={visible}
                onCancel={checkModal}
                onOk={checkModal}
            />
            <Button onClick={() => { openModal() }}>点击打开模态框</Button>
        </div>
    )
}

export default Index
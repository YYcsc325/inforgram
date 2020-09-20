import React, { useState } from 'react'
import { Form, Button } from 'antd';
import FormView from '../../../components/FormView/formView'
import { getConfig } from './config.js';
import { debounce } from '../../../utils/utils'
import StaticModal from '../../../components/StaticModal/view';
import NewFormView from '../../../components/NewFormView/FormView';
import newFormConfig from './newFormConfig';

const getshow = StaticModal.getshow;

const Index = (props = {}) => {

    const [form] = Form.useForm();
    const [changeKeys, setChangeKeys] = useState([])

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
        const modal = StaticModal.showModal({
            destroy: () => {
                modal.destroy();
            }
        });
    }

    const config = getConfig(props, onChange);
    const newConfig = newFormConfig({ setChangeKeys }).filter(item => !changeKeys.includes(item.name));
    
    return (
        <div>
            {/* <FormView
                config={config}
                className={'csc'}
                form={form}
            /> */}
            <NewFormView 
               form={form}
               formProps={{
                 layout: 'horizontal',
               }}
               config={newConfig}
            />
            <Button onClick={() => { handleSubmit() }}>点击提交</Button>
            <Button onClick={() => { openModal() }}>点击打开模态框</Button>
        </div>
    )
}

export default Index
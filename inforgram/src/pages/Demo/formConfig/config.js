/**
 * @name 配置文件
 */
import React from 'react';

import { getBaseConfig } from './baseConfig.js';
import HooksComponent from '../Component/HooksComponent';


export function getConfig(props, onChange) {
    const baseConfig = getBaseConfig(props);
    return [
        {
            type: 'select',
            label: '选择框',
            key: 'select11',
            options: [{ key: '123', value: '123' }],
            rules: [
                {
                    required: true,
                    message: '必填'
                }
            ],
            initialValue: '123',
            placeholder: '请选择'
        }
    ]
        .concat(
            [
                {
                    ...baseConfig.input,
                    disabled: false,
                    onChange: (e) => {
                        onChange(e)
                    }
                }
            ]
        ).concat(
            [
                {
                    ...baseConfig.custom
                }
            ]
        ).concat(
            [
                {
                    ...baseConfig.double,
                    options: [
                        {
                            key: '111',
                            value: '111'
                        },
                        {
                            key: '222',
                            value: '222'
                        }
                    ],
                    valueDateOne: '111',
                    valueDataTwo: '111'
                }
            ]
        ).concat(
            [
                {
                    type: 'custom',
                    label: 'hooks的用例',
                    key: 'useCallback',
                    render: () => {
                        return (
                            <HooksComponent />
                        )
                    }
                }
            ]
        )
}
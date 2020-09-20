import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const TextInput = (props) => {

    const [ displayFlag, setDisplayFlag ] = useState(false);

    return (
        <>
        {
            displayFlag ? <Input { ...props } onBlur={() => setDisplayFlag(!displayFlag)}/> : props.value || '(空)' 
        }
        <EditOutlined onClick={() => setDisplayFlag(!displayFlag)}/>
        </>
    )
}
export default TextInput;
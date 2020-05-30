/**
 * @name  消息提示框
 * @Auth  CSC
 * @param { type: { success, info, warning, error } }
 */
import { notification } from 'antd';
export  function openNotification(props) {
    const { type, message, description } = props;
    notification[type]({
        message,
        description
    });
}

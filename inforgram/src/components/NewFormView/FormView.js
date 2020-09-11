import { Form } from 'antd';
import React from 'react';

import hasUiByType from './hasUiByType';
import styles from './FormView.less';

class FormView extends React.Component {
  render() {
    const { form, formProps = {}, formClassName, config = [] } = this.props;
    return (
      <Form { ...{ ...formProps, form }}>
        <div className={styles[formClassName] || styles.container}>
          {config.map(item => hasUiByType({ form, ...item })).filter(item => !!item)}
        </div>
      </Form>
    )
  }
}

export default FormView;

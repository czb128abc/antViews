import React, { PureComponent } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export default class FormItemTextArea extends PureComponent {
  render() {
    const { value, onChange, ...other } = this.props;
    return (
      <TextArea
        {...other}
        value={value}
        onChange={onChange}
        autoSize={{ minRows: 2, maxRows: 6 }}
      />
    );
  }
}

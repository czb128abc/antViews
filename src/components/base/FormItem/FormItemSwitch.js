import React, { PureComponent } from 'react';
import { Switch } from 'antd';

export default class FormItemSwitch extends PureComponent {
  handleChange = checked => {
    const { onChange } = this.props;
    onChange(checked);
  };

  render() {
    const { value, ...other } = this.props;
    return <Switch {...other} checked={value} onChange={this.handleChange} />;
  }
}

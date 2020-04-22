import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

export default class FormItemDatePicker extends PureComponent {
  handleChange = (date, dateString) => {
    const { onChange } = this.props;
    onChange(dateString);
  };

  render() {
    const { value, ...other } = this.props;
    const dateValue = value ? moment(value, dateFormat) : null;
    return (
      <DatePicker {...other} format={dateFormat} value={dateValue} onChange={this.handleChange} />
    );
  }
}

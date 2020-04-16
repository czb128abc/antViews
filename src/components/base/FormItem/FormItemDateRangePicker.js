import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

export default class FormItemDateRangePicker extends PureComponent {
  handleChange = (date, dateString) => {
    const { onChange } = this.props;
    onChange(dateString);
  };

  render() {
    const { value, ...other } = this.props;
    let dateValue = [];
    if (value) {
      const valueArray = value;
      if (valueArray.length === 2 && valueArray.every(dateStr => !!dateStr)) {
        const start = moment(valueArray[0], dateFormat);
        const end = moment(valueArray[1], dateFormat);
        dateValue = [start, end];
      }
    }
    return (
      <RangePicker {...other} format={dateFormat} value={dateValue} onChange={this.handleChange} />
    );
  }
}

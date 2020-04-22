/* eslint-disable no-plusplus */
/* eslint-disable no-useless-escape */
import React, { PureComponent } from 'react';
import { Select } from 'antd';

function numberFormat(numberStr, fmt) {
  const fmtSplit = fmt.split('.');
  let isNegative = false;
  let number = Number(numberStr);

  let numberString = '';

  let min;

  let max;
  // eslint-disable-next-line
  if (isNaN(number)) return number;
  // 判断负数
  if (number < 0) {
    isNegative = true;
  }
  // 如果有%号，做百分比转换
  if (/\%/.test(fmt)) {
    number *= 100;
  }
  // 小数部分
  if (fmtSplit.length > 1) {
    min = /0+/.exec(fmtSplit[1]);
    max = /#+/.exec(fmtSplit[1]);
    min = min == null ? 0 : min[0].length;
    max = max == null ? 0 : max[0].length;

    number = number.toFixed(max + min);
    for (let i = 0; i < max; i++) {
      if (number.slice(-1) !== '0') break;
      number = number.slice(0, -1);
    }
  } else {
    number = number.toFixed(0);
  }
  // 整数部分
  const numberSplit = number.replace('-', '').split('.');
  min = /[0]+/.exec(fmtSplit[0].replace(',', ''));
  min = min == null ? 0 : min[0].length;
  while (numberSplit[0].length < min) {
    numberSplit[0] = `0${numberSplit[0]}`;
  }
  // 加千分位
  if (fmtSplit[0].lastIndexOf(',') !== -1) {
    let groupby = fmtSplit[0].slice(fmtSplit[0].lastIndexOf(','));
    groupby = /[0#]+/.exec(groupby);
    if (groupby != null) {
      const reg = new RegExp(`(-?[0-9]+)([0-9]{${groupby[0].length}})`);
      while (reg.test(numberSplit[0])) {
        numberSplit[0] = numberSplit[0].replace(reg, '$1,$2');
      }
    }
  }
  numberString =
    (isNegative ? '-' : '') + (numberSplit.length > 1 ? numberSplit.join('.') : numberSplit[0]);
  return fmt.replace(/[0#\-\,\.]+/, numberString);
}

export function formatThousandBit(n) {
  // 特殊处理  'No Permission'
  if (n === 'No Permission') {
    return 'No Permission';
  }
  if (`${n}` === '' || typeof n === 'undefined') {
    return '';
  }
  if (`${n}`.includes('.')) {
    const numSet = `${n}`.split('.');
    return `${numberFormat(numSet[0], '#,##0')}.${numSet[1].substring(0, 2)}`;
  }
  return numberFormat(n, '#,##0');
}

export default class FormItemTextSelect extends PureComponent {
  handleSearch = value => {
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { children, value, onChange, field, ...other } = this.props;
    return (
      <Select
        value={value}
        onChange={onChange}
        onSearch={this.handleSearch}
        allowClear
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        {...other}
      >
        {children || []}
      </Select>
    );
  }
}

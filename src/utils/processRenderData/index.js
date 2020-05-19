/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Select } from 'antd';
import Ellipsis from '@/components/Ellipsis';

export { default as statusIconView } from './StatusIconView';
export { default as ListItemActions } from './ListItemActions';
export { default as TwoColumnsGridLayout } from './GridLayout/TwoColumnsGridLayout';
export * from './IconBtn';

export const strListToOptions = (list) =>
  list.map((item, index) => (
    <Select.Option title={item} key={`${index}_${item}`} value={`${item}`}>
      {item}
    </Select.Option>
  ));

export const objectListToOptions = (list, itemKey = { text: 'title', value: 'value' }) =>
  list.map((item, index) => (
    <Select.Option
      title={item[itemKey.text]}
      key={`${index}_${itemKey.value}`}
      value={`${item[itemKey.value]}`}
    >
      {item[itemKey.text]}
    </Select.Option>
  ));

/**
 *
 *针对类型为枚举 {text:value}
enum optionEmumRoleReAuthorize {
  向下授权 = '1',
  不向下授权 = '2',
}
//用法
enumToOptions(optionEmumRoleReAuthorize)
 */
export const enumToOptions = (optionEmum) => {
  const list = Object.keys(optionEmum).map((key) => ({ title: key, value: optionEmum[key] }));
  return objectListToOptions(list);
};

/**
 *
 *针对类型为枚举 {text:value}
enum optionEmumRoleReAuthorize {
  向下授权 = '1',
  不向下授权 = '2',
}
//用法
getTextFromEnum('1', optionEmumRoleReAuthorize) => '向下授权'
 */
export const getTextFromEnum = (value, optionEmum) => {
  let text = '未知类型';
  // eslint-disable-next-line no-restricted-syntax
  for (const item in optionEmum) {
    if (`${optionEmum[item]}` === `${value}`) {
      text = item;
      break;
    }
  }
  return text;
};

export function enumToLabelValue(enumObj, isReverseLabelValue = false) {
  const list = [];
  // eslint-disable-next-line
  for (const item in enumObj) {
    const obj = {};
    if (!isReverseLabelValue) {
      obj.label = item;
      obj.value = enumObj[item];
    } else {
      obj.value = item;
      obj.label = enumObj[item];
    }
    list.push(obj);
  }
  return list;
}

export const LineEllipsis = ({ tooltip = true, lines = 1, children }) => (
  <Ellipsis tooltip={tooltip} lines={lines}>
    {children}
  </Ellipsis>
);

export function selectFilterOption(inputValue, option) {
  return option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
}

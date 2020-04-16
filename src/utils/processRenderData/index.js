/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Select } from 'antd';
import Ellipsis from '@/components/Ellipsis';

export { default as statusIconView } from './StatusIconView';
export { default as ListItemActions } from './ListItemActions';
export * from './IconBtn';

export const strListToOptions = list =>
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

export const enumToOptions = optionEmum => {
  console.log(optionEmum);
  const list = Object.keys(optionEmum).map(key => ({ title: key, value: optionEmum[key] }));
  return objectListToOptions(list);
};

export const LineEllipsis = ({ tooltip = true, lines = 1, children }) => (
  <Ellipsis tooltip={tooltip} lines={lines}>
    {children}
  </Ellipsis>
);

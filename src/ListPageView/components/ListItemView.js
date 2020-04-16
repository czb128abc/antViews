import React from 'react';
import { List } from 'antd';

const ListItem = ({ item, actions = [] }) => (
  <List.Item actions={actions}>
    <div>{item && JSON.stringify(item)}</div>
  </List.Item>
);
export default ListItem;

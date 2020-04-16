import React from 'react';
import { Dropdown, Menu } from 'antd';
import { notEmptyArray } from '../processData';

const ListItemActions = (list = [], showNum = 2) => {
  if (!notEmptyArray(list)) {
    return [];
  }
  if (list.length <= showNum) {
    return list;
  }
  const menu = (
    <Menu>
      {list
        .filter((item, index) => index >= showNum - 1)
        .map((item, index) => (
          <Menu.Item key={index.toString()}>
            <span>{item}</span>
          </Menu.Item>
        ))}
    </Menu>
  );
  const nodes = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < showNum - 1; i++) {
    nodes.push(list[i]);
  }

  nodes.push(
    <span className="mock-link" key="more">
      <Dropdown overlay={menu} trigger={['click']}>
        <span>更多</span>
      </Dropdown>
    </span>
  );
  return nodes;
};

export default ListItemActions;

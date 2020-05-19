import React from 'react';
import { Tree } from 'antd';

export default class TreeFormItem extends React.PureComponent {
  render() {
    const { onChange, value = [], dataSource } = this.props;
    return (
      <Tree
        defaultExpandAll
        checkedKeys={value}
        onCheck={onChange}
        treeData={dataSource}
        checkable
      />
    );
  }
}

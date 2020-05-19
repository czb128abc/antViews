import React from 'react';
import { Tree, Icon } from 'antd';

const { TreeNode } = Tree;

const PersonalizedTree = ({ isDirectoryTree = false, children, ...treeProps }) => {
  if (!isDirectoryTree) {
    return <Tree {...treeProps}>{children}</Tree>;
  }
  return <Tree.DirectoryTree {...treeProps}>{children}</Tree.DirectoryTree>;
};

export function rendTreeNodes(data = [], treeNodeTitleRender) {
  return data.map((item) => {
    const { title } = item;
    const commonProps = {
      title: typeof treeNodeTitleRender === 'function' ? treeNodeTitleRender(item) : title,
      key: item.key,
    };
    if (item.icon) {
      commonProps.icon = item.icon;
      if (typeof item.icon === 'string') {
        commonProps.icon = <Icon type={item.icon} />;
      }
    }
    if (item.children) {
      return (
        <TreeNode {...commonProps} dataRef={item}>
          {rendTreeNodes(item.children, treeNodeTitleRender)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} {...commonProps} isLeaf />;
  });
}

export default PersonalizedTree;

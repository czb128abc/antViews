import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';
import * as dvaUtils from '@/dva';

const { TreeNode } = TreeSelect;

export default class OrgTreeSelect extends Component {
  state = {
    dataSource: [],
  };

  componentDidMount() {
    this.loadDataSource();
  }

  getValueFromPops() {
    const { getValueFromPopsBefore, value } = this.props;
    return getValueFromPopsBefore(value);
  }

  handleChange = value => {
    const { onChangeBefore, onChange } = this.props;
    onChange(onChangeBefore(value));
  };

  async loadDataSource() {
    const result = await dvaUtils.getDispatch()({
      type: 'backstageMgtOrganization/lazyLoadTreeList',
    });
    const dataSource = result.treeList;
    this.setState({ dataSource });
  }

  renderTreeNodes = data =>
    data.map(item => {
      const commonProps = {
        key: item.key,
        title: item.title,
        value: item.key,
      };
      if (item.children) {
        return (
          <TreeNode {...commonProps} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...commonProps} />;
    });

  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <TreeSelect
          dropdownStyle={{ maxHeight: 300, width: 400, overflow: 'auto' }}
          dropdownMatchSelectWidth={false}
          treeDefaultExpandAll
          onChange={this.handleChange}
          value={this.getValueFromPops()}
        >
          {this.renderTreeNodes(dataSource)}
        </TreeSelect>
      </div>
    );
  }
}

const defaultConfig = {
  getValueFromPopsBefore(value) {
    return value;
  },
  onChangeBefore(value) {
    return value;
  },
};

OrgTreeSelect.propTypes = {
  getValueFromPopsBefore: PropTypes.func,
  onChangeBefore: PropTypes.func,
};

OrgTreeSelect.defaultProps = {
  ...defaultConfig,
};

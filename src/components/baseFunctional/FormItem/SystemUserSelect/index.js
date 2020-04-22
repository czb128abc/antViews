import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import * as dvaUtils from '@/dva';
import { notEmptyArray } from '@/utils/processData';

function filterOption(inputValue, option) {
  return option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
}

export default class SystemUserSelect extends Component {
  dataSourceMap = {};

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
    const { dataSourceMap } = this;
    onChange(onChangeBefore(value, dataSourceMap));
  };

  async loadDataSource() {
    const result = await dvaUtils.getDispatch()({
      type: 'backstageMgtUser/lazyLoadRootOrgUserList',
    });
    const dataSource = result.rootOrgUserList;
    dataSource.forEach(item => {
      this.dataSourceMap[item.id] = item;
    });
    this.setState({ dataSource });
  }

  renderSelectNodes() {
    const { dataSource = [] } = this.state;
    return dataSource.map(item => {
      return <Select.Option key={item.id}>{`${item.realName} ${item.phoneNumber}`}</Select.Option>;
    });
  }

  render() {
    return (
      <div>
        <Select
          dropdownStyle={{ maxHeight: 300, width: 400, overflow: 'auto' }}
          dropdownMatchSelectWidth
          onChange={this.handleChange}
          value={this.getValueFromPops()}
          mode="tags"
          showArrow
          showSearch
          filterOption={filterOption}
        >
          {this.renderSelectNodes()}
        </Select>
      </div>
    );
  }
}

const defaultConfig = {
  getValueFromPopsBefore(value) {
    if (!notEmptyArray(value)) {
      return [];
    }
    return value.map(item => item.userId).filter(item => !!item);
  },
  onChangeBefore(value = [], dataSourceMap) {
    return value
      .map((item, index) => {
        const obj = dataSourceMap[item];
        if (!obj) {
          return false;
        }
        return {
          name: obj.realName,
          telNumber: obj.phoneNumber,
          sort: index,
          userId: obj.id,
        };
      })
      .filter(item => !!item);
  },
};

SystemUserSelect.propTypes = {
  getValueFromPopsBefore: PropTypes.func,
  onChangeBefore: PropTypes.func,
};

SystemUserSelect.defaultProps = {
  ...defaultConfig,
};

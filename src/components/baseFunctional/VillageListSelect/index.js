import React, { Component } from 'react';
import { connect } from 'umi';
import { Select } from 'antd';
import { objectListToOptions } from '@/utils/processRenderData';
import { notEmptyArray } from '@/utils/processData';

const namespace = 'common';

@connect(({ common: root }) => ({
  commonVillageList: root.commonVillageList,
  selectedVillageId: root.selectedVillageId,
}))
class VillageListSelect extends Component {
  componentDidMount() {
    this.loadData();
  }

  handleChange = (value) => {
    const { dispatch, onChange } = this.props;
    dispatch({
      type: `${namespace}/setSelectedVillageId`,
      payload: value,
    });
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  loadData = async () => {
    const { dispatch } = this.props;
    const result = await dispatch({
      type: `${namespace}/queryOrgTreeData`,
      payload: {},
    });
    if (!result.selectedVillageId && notEmptyArray(result.commonVillageList)) {
      this.handleChange(result.commonVillageList[0].id);
    }
  };

  render() {
    const { commonVillageList, selectedVillageId } = this.props;
    return (
      <div style={{ display: 'inline-block', marginRight: 100, background: '#FFF' }}>
        <span>当前站点：</span>
        <Select
          showSearch
          style={{ width: 200, display: 'inline-block' }}
          onChange={this.handleChange}
          value={selectedVillageId}
          dropdownMatchSelectWidth={false}
          dropdownStyle={{ width: 300 }}
        >
          {objectListToOptions(commonVillageList, {
            text: 'name',
            value: 'id',
          })}
        </Select>
      </div>
    );
  }
}

export default VillageListSelect;

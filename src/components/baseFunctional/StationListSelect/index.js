import React, { Component } from 'react';
import { connect } from 'umi';
import { Select, Affix } from 'antd';
import { objectListToOptions } from '@/utils/processRenderData';

const namespace = 'monitoringPlatformCommon';

@connect(({ monitoringPlatformCommon: root }) => ({
  commonStationList: root.commonStationList,
  selectedStationId: root.selectedStationId,
}))
class StationListSelect extends Component {
  handleChange = value => {
    const { dispatch, onChange } = this.props;
    dispatch({
      type: `${namespace}/saveReducer`,
      payload: {
        selectedStationId: value,
      },
    });
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  render() {
    const { commonStationList, selectedStationId } = this.props;
    return (
      <Affix offsetTop={68}>
        <div style={{ display: 'inline-block', marginRight: 100, background: '#FFF' }}>
          <span>当前站点：</span>
          <Select
            showSearch
            style={{ width: 200, display: 'inline-block' }}
            onChange={this.handleChange}
            value={selectedStationId}
            dropdownMatchSelectWidth={false}
            dropdownStyle={{ width: 300 }}
          >
            {objectListToOptions(commonStationList, {
              text: 'name',
              value: 'id',
            })}
          </Select>
        </div>
      </Affix>
    );
  }
}

export default StationListSelect;

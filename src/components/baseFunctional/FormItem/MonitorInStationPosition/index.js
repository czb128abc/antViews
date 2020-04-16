/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Select, Button } from 'antd';
import * as dvaUtils from '@/dva';
import { notEmptyArray } from '@/utils/processData';
import { objectListToOptions } from '@/utils/processRenderData';
import { enumWarnRulesUnit } from '@/enum/monitoringPlatform';
import styles from './styles.less';

const NormalValue = ({ update, index, value }) => (
  <div className={styles.NormalValueContainer}>
    <Input
      onChange={e => update(index, 'normalValueFrom', e.target.value)}
      value={value.normalValueFrom || ''}
    />
    <span style={{ textAlign: 'center', width: '8%' }}>-</span>
    <Input
      onChange={e => update(index, 'normalValueTo', e.target.value)}
      value={value.normalValueTo || ''}
    />
    <span style={{ marginLeft: 5 }}>
      <Select
        placeholder="单位"
        onChange={val => update(index, 'unit', val)}
        value={value.unit || ''}
      >
        {objectListToOptions(Object.values(enumWarnRulesUnit))}
      </Select>
    </span>
  </div>
);

export default class MonitorInStationPosition extends Component {
  state = {
    dataSource: [],
    gateWayList: [],
  };

  listMapObj = {};

  componentDidMount() {
    this.loadDataSource();
  }

  getValueFromPops() {
    const { getValueFromPopsBefore, value } = this.props;
    return getValueFromPopsBefore(value);
  }

  add = () => {
    const rows = this.getValueFromPops();
    rows.push({});
    this.handleChange(rows);
  };

  remove = cIndex => {
    const rows = this.getValueFromPops();
    this.handleChange(rows.filter((_, index) => cIndex !== index));
  };

  update = (index, fieldKey, fieldValue) => {
    const rows = this.getValueFromPops();
    if (rows.length === 0) {
      rows.push({});
    }
    rows[index][fieldKey] = fieldValue;
    if (fieldKey === 'monitorId') {
      rows[index].monitorName = this.listMapObj[fieldValue].name;
      rows[index].normalValueFrom = this.listMapObj[fieldValue].data.normalValueFrom;
      rows[index].normalValueTo = this.listMapObj[fieldValue].data.normalValueTo;
      rows[index].unit = this.listMapObj[fieldValue].data.unit;
      rows[index].level = this.listMapObj[fieldValue].data.level;
    }
    this.handleChange(rows);
  };

  async loadDataSource() {
    // eslint-disable-next-line no-underscore-dangle
    const result = await dvaUtils.getDispatch()({
      type: 'monitoringPlatformCommon/queryMonitorList',
    });
    const gateWayResult = await dvaUtils.getDispatch()({
      type: 'monitoringPlatformCommon/queryGateWayList',
    });
    if (result.success) {
      this.setState({ dataSource: result.data });
      result.data.forEach(item => {
        this.listMapObj[item.id] = item;
      });
    }
    if (gateWayResult.success) {
      const gateWayList = gateWayResult.data.map(item => ({
        name: `${item.gateway}`,
        id: `${item.gateway}`,
      }));
      this.setState({ gateWayList });
    }
  }

  handleChange(value) {
    const { onChangeBefore, onChange } = this.props;
    onChange(onChangeBefore(value));
  }

  rendContent() {
    const { dataSource, gateWayList } = this.state;
    const rows = this.getValueFromPops();
    const labelSpan = 3;
    const formItemSpan = 4;
    const commonOptionList = dataSource.filter(
      item => !rows.find(tempRow => tempRow.monitorId === item.id),
    );
    return (
      <div>
        {rows.map((row, index) => {
          const selectOption = this.listMapObj[row.monitorId];
          const optionList = commonOptionList.concat(selectOption ? [selectOption] : []);
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Row
              gutter={16}
              key={`${index}_${row.monitorId}`}
              className={styles.monitorItemContainer}
            >
              <Col span={24}>
                <Col span={labelSpan} className="text-right">
                  ({`${index + 1}`})监控项:
                </Col>
                <Col span={formItemSpan}>
                  <Select
                    placeholder="请选择监控项"
                    value={row.monitorId || ''}
                    onChange={value => {
                      this.update(index, 'monitorId', value);
                    }}
                  >
                    {objectListToOptions(optionList, { text: 'name', value: 'id' })}
                  </Select>
                </Col>
                <Col span={labelSpan} className="text-right">
                  正常阈值:
                </Col>
                <Col span={13}>
                  <NormalValue update={this.update} index={index} value={row} />
                </Col>
              </Col>
              <Col span={24}>
                <Col span={labelSpan} className="text-right">
                  设备ID:
                </Col>
                <Col span={formItemSpan}>
                  <Input
                    placeholder="请输入设备ID"
                    value={row.equipmentId || ''}
                    onChange={e => {
                      const { value } = e.target;
                      this.update(index, 'equipmentId', value);
                    }}
                  />
                </Col>
                <Col span={labelSpan} className="text-right">
                  网关:
                </Col>
                <Col span={formItemSpan}>
                  <Select
                    placeholder="请选择网关"
                    value={row.gateway || ''}
                    onChange={value => {
                      this.update(index, 'gateway', value);
                    }}
                  >
                    {objectListToOptions(gateWayList, { text: 'name', value: 'id' })}
                  </Select>
                </Col>
                <Col span={2}>
                  <Button size="small" type="danger" onClick={() => this.remove(index)}>
                    移除该监控项
                  </Button>
                </Col>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }

  render() {
    const { dataSource } = this.state;
    const rows = this.getValueFromPops();
    const disabled = dataSource.length === rows.length;
    return (
      <div className={styles.MonitorInStationPositionContainer}>
        <Row type="flex" align="bottom">
          <Col span={24}>{this.rendContent()}</Col>
          <Col offset={21} span={2}>
            <Button
              disabled={disabled}
              size="small"
              onClick={() => this.add()}
              className={styles.addBtn}
            >
              添加监控项
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const defaultConfig = {
  getValueFromPopsBefore(value) {
    if (!notEmptyArray(value)) {
      return [];
    }
    return value;
  },
  onChangeBefore(value) {
    return value;
  },
};

MonitorInStationPosition.propTypes = {
  getValueFromPopsBefore: PropTypes.func,
  onChangeBefore: PropTypes.func,
};

MonitorInStationPosition.defaultProps = {
  ...defaultConfig,
};

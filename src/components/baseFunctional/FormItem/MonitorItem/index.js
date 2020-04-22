/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Select, Input, Row, Col, Button } from 'antd';
import * as dvaUtils from '@/dva';
import { notEmptyArray } from '@/utils/processData';
import { objectListToOptions } from '@/utils/processRenderData';
import styles from './index.less';

const { Option } = Select;

const operationList = [
  { value: '>', title: '>' },
  { value: '<', title: '<' },
  { value: '=', title: '=' },
];

const expressionList = [{ value: '或', title: '或' }, { value: '且', title: '且' }];

export default class MonitorItem extends React.PureComponent {
  state = {
    list: [],
  };

  listMapObj = {};

  componentDidMount() {
    this.loadData();
  }

  getValue() {
    const { getValueFromPops, value } = this.props;
    return getValueFromPops(value);
  }

  add = () => {
    const { converToValue, onChange } = this.props;
    const rows = this.getValue();
    rows.push({});
    onChange(converToValue(rows));
  };

  remove = index => {
    const { converToValue, onChange } = this.props;
    const rows = this.getValue();
    onChange(converToValue(rows.filter((_, i) => i !== index)));
  };

  update = (index, fieldKey, fieldValue) => {
    const { converToValue, onChange } = this.props;
    const rows = this.getValue();
    rows[index][fieldKey] = fieldValue;
    onChange(converToValue(rows));
  };

  async loadData() {
    const result = await dvaUtils.getDispatch()({
      type: 'monitoringPlatformCommon/queryMonitorList',
    });
    if (result.success) {
      this.setState({ list: result.data });
      result.data.forEach(item => {
        this.listMapObj[item.id] = item;
      });
    }
  }

  render() {
    const { list } = this.state;
    const rows = this.getValue();
    const span = 8;
    /** *
     *  {
      "monitorId":"1",//监控项ID
      "monitorName":"电压监控",//监控项名称
      "operation":"1",//匹配式
      "normalValue":"100",//阙值
      "expression":"2",//表达式
      "unit":"1"//单位
     },
     */
    const commonOptionList = list.filter(
      item => !rows.find(tempRow => tempRow.monitorId === item.id),
    );
    return (
      <div className={styles.monitorItem}>
        <div className="monitor-list">
          {rows.map((row, index) => {
            const selectOption = this.listMapObj[row.monitorId];
            const optionList = commonOptionList.concat(selectOption ? [selectOption] : []);
            return (
              <div key={index}>
                <Row type="flex" gutter={24} align="middle">
                  <Col span={span}>
                    <Select
                      value={row.monitorId || ''}
                      onChange={value => {
                        this.update(index, 'monitorId', value);
                        this.update(index, 'monitorName', value);
                      }}
                    >
                      {optionList.map(m => (
                        <Option key={m.id} value={m.id}>
                          {m.name}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={span}>
                    <Select
                      value={row.operation || ''}
                      onChange={value => {
                        this.update(index, 'operation', value);
                      }}
                    >
                      {objectListToOptions(operationList)}
                    </Select>
                  </Col>
                  <Col span={span}>
                    <Input
                      style={{ width: '60%', marginRight: 24 }}
                      value={row.normalValue || ''}
                      onChange={e => {
                        const { value } = e.target;
                        this.update(index, 'normalValue', value);
                      }}
                    />

                    <Button size="small" type="danger" onClick={() => this.remove(index)}>
                      移除
                    </Button>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
        <div className="add-container">
          <Row gutter={32} type="flex" justify="end" align="middle">
            <Col span={12}>
              <Select>{objectListToOptions(expressionList)}</Select>
            </Col>
            <Col span={12}>
              <Button size="small" onClick={this.add}>
                添加
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const defaultConfig = {
  getValueFromPops(value) {
    if (!notEmptyArray(value)) {
      return [];
    }
    return value;
  },
  converToValue(value) {
    return value;
  },
};

MonitorItem.propTypes = {
  getValueFromPops: PropTypes.func,
  converToValue: PropTypes.func,
};

MonitorItem.defaultProps = {
  ...defaultConfig,
};

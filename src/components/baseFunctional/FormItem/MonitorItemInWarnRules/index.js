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
  { value: '1', title: '>' },
  { value: '2', title: '<' },
  { value: '3', title: '=' },
];

const expressionList = [
  { value: '1', title: '或' },
  { value: '2', title: '且' },
];

export default class MonitorItemInWarnRules extends React.PureComponent {
  state = {
    list: [],
  };

  listMapObj = {};

  componentDidMount() {
    this.loadData();
  }

  getValue() {
    const { getValueFromPopsBefore, value } = this.props;
    return getValueFromPopsBefore(value);
  }

  add = () => {
    const rows = this.getValue();
    rows.push({});
    this.handleChange(rows);
  };

  remove = (index) => {
    const rows = this.getValue();
    this.handleChange(rows.filter((_, i) => i !== index));
  };

  update = (index, fieldKey, fieldValue) => {
    const rows = this.getValue();
    if (rows.length === 0) {
      rows.push({});
    }
    rows[index][fieldKey] = fieldValue;
    if (fieldKey === 'monitorId') {
      rows[index].monitorName = this.listMapObj[fieldValue].name;
    }
    this.handleChange(rows);
  };

  updateExpression = (value) => {
    const rows = this.getValue();
    if (rows.length === 0) {
      return;
    }
    rows.forEach((_, index) => {
      rows[index].expression = value;
    });
    this.handleChange(rows);
  };

  async loadData() {
    const result = await dvaUtils.getDispatch()({
      type: 'monitoringPlatformCommon/queryMonitorList',
    });
    if (result.success) {
      this.setState({ list: result.data });
      result.data.forEach((item) => {
        this.listMapObj[item.id] = item;
      });
    }
  }

  handleChange(value) {
    const { onChangeBefore, onChange } = this.props;
    onChange(onChangeBefore(value));
  }

  rendAdd() {
    const { list } = this.state;
    const rows = this.getValue();
    return (
      <div className="add-container">
        <Row gutter={32} type="flex" justify="end" align="middle">
          <Col span={24}>
            {list.length > rows.length && (
              <Button size="small" onClick={this.add} icon="plus">
                继续编写判定式
              </Button>
            )}
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { list } = this.state;
    const rows = this.getValue();
    if (rows.length === 0) {
      rows.push({});
    }
    const span = 6;
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
      (item) => !rows.find((tempRow) => tempRow.monitorId === item.id),
    );
    const defaultExpression = rows.length > 0 ? rows[0].expression : '';
    return (
      <div className={styles.monitorItem}>
        <div className="monitor-list">
          {rows.map((row, index) => {
            const selectOption = this.listMapObj[row.monitorId];
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const optionList = commonOptionList.concat(selectOption ? [selectOption] : []);
            return (
              <div key={index}>
                <Row type="flex" gutter={24} align="middle">
                  <Col span={span}>
                    <Select
                      placeholder="请选择监控项"
                      value={row.monitorId || ''}
                      onChange={(value) => {
                        this.update(index, 'monitorId', value);
                      }}
                    >
                      {list.map((m) => (
                        <Option key={m.id} value={m.id}>
                          {m.name}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={span}>
                    <Select
                      placeholder="请选择匹配式"
                      value={row.operation || ''}
                      onChange={(value) => {
                        this.update(index, 'operation', value);
                      }}
                    >
                      {objectListToOptions(operationList)}
                    </Select>
                  </Col>
                  <Col span={span}>
                    <Input
                      placeholder="判定值"
                      value={row.normalValue || ''}
                      onChange={(e) => {
                        const { value } = e.target;
                        this.update(index, 'normalValue', value);
                      }}
                    />
                  </Col>
                  <Col span={span}>
                    <Select
                      style={{ width: '40%', marginRight: 8, display: 'inline-block' }}
                      placeholder="请选择表达式"
                      onChange={(value) => this.updateExpression(value)}
                      value={defaultExpression}
                    >
                      {objectListToOptions(expressionList)}
                    </Select>
                    <Button size="small" type="danger" onClick={() => this.remove(index)}>
                      移除
                    </Button>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
        {this.rendAdd()}
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

MonitorItemInWarnRules.propTypes = {
  getValueFromPopsBefore: PropTypes.func,
  onChangeBefore: PropTypes.func,
};

MonitorItemInWarnRules.defaultProps = {
  ...defaultConfig,
};

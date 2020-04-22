import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tree, Popover } from 'antd';
import * as dvaUtils from '@/dva';
import { notEmptyArray } from '@/utils/processData';

const { TreeNode, DirectoryTree } = Tree;

export default class StationPositionTreeSelect extends Component {
  state = {
    dataSource: [],
  };

  stationIdMap = {};

  stationPositionMap = {};

  commonStationMap = {};

  componentDidMount() {
    this.loadDataSource();
  }

  getValueFromPops() {
    const { getValueFromPopsBefore, value } = this.props;
    return getValueFromPopsBefore(value);
  }

  getCheckedKeys() {
    const keys = [];
    this.getValueFromPops().forEach(item => {
      keys.push(item.stationPositionId);
    });
    return keys;
  }

  handleCheck = checkedKeys => {
    const { stationIdMap } = this;
    const checkedObjList = [];
    checkedKeys.forEach(key => {
      // 为叶子节点
      if (!stationIdMap[key]) {
        checkedObjList.push(this.stationPositionMap[key]);
      }
    });
    this.handleChange(checkedObjList);
  };

  handleChange(value) {
    const { onChangeBefore, onChange } = this.props;
    onChange(onChangeBefore(value));
  }

  async loadDataSource() {
    // eslint-disable-next-line no-underscore-dangle
    const { commonStationList } = await dvaUtils.getDispatch()({
      type: 'monitoringPlatformCommon/loadCommonData',
    });
    const commonStationMap = {};
    commonStationList.forEach(item => {
      commonStationMap[item.id] = item.name;
    });
    // eslint-disable-next-line no-underscore-dangle
    const result = await dvaUtils.getDispatch()({
      type: 'monitoringPlatformCommon/queryStationPositionList',
    });
    if (result.success) {
      const treeMap = {};
      const stationIdMap = {};
      const stationPositionMap = {};
      result.data.forEach(item => {
        const { stationId } = item.data;
        treeMap[item.data.stationId] = {
          title: commonStationMap[stationId] || '未知节点',
          key: stationId,
          children: [],
        };
        stationIdMap[stationId] = stationId;
      });
      result.data.forEach(item => {
        /**
         * {

            "stationId":"2",//站点ID
            "stationName":"世纪城站点",//站点名称
            "stationPositionId":"037806fbb2644e62b9547de519da84bc",//点位ID
            "stationPositionName":"世纪城站点点位1",//点位名称
            "warnsRulesId":"1"//预警规则ID,
            "warnsRulesName":"电压谐波预警"//预警规则名称
          }
         */
        const node = {
          stationId: item.data.stationId,
          stationName: commonStationMap[item.data.stationId] || '未知节点',
          stationPositionId: item.data.id,
          stationPositionName: item.data.stationPositionName,
        };
        stationPositionMap[node.stationPositionId] = node;
        treeMap[item.data.stationId].children.push({
          title: item.data.stationPositionName,
          key: item.data.id,
          data: item.data,
          isLeaf: true,
        });
      });
      this.stationIdMap = stationIdMap;
      this.commonStationMap = commonStationMap;
      this.stationPositionMap = stationPositionMap;
      this.setState({ dataSource: Object.values(treeMap) });
    }
  }

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      const title = (
        <Popover
          content={
            <div>
              <div>点位名称: {item.data.stationPositionName}</div>
              <div>点位地址: {item.data.address}</div>
            </div>
          }
          title="详情"
        >
          {item.title}
        </Popover>
      );
      return <TreeNode {...item} title={title} />;
    });

  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <DirectoryTree checkable checkedKeys={this.getCheckedKeys()} onCheck={this.handleCheck}>
          {this.renderTreeNodes(dataSource)}
        </DirectoryTree>
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

StationPositionTreeSelect.propTypes = {
  getValueFromPopsBefore: PropTypes.func,
  onChangeBefore: PropTypes.func,
};

StationPositionTreeSelect.defaultProps = {
  ...defaultConfig,
};

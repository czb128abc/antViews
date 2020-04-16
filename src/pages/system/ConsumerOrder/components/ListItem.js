import React from 'react';
import { List, Row, Col } from 'antd';
import { statusIconView, LineEllipsis } from '@/utils/processRenderData';
import { getEnumTitle, enumStationStatus } from '@/enum/monitoringPlatform';
import { keyMap } from '../consts';

const ListItem = ({ item, actions = [] }) => (
  <List.Item actions={actions}>
    <div style={{ flex: 1 }}>
      <Row type="flex" justify="center">
        <Col span={6}>
          <LineEllipsis>
            <div>{item[keyMap.get('站点名称')]}</div>
            <div>{item[keyMap.get('详细地址')]}</div>
          </LineEllipsis>
        </Col>
        <Col span={6}>
          <LineEllipsis>{item[keyMap.get('描述')]}</LineEllipsis>
        </Col>
        <Col span={6}>
          <div>创建时间</div>
          <div>{item[keyMap.get('创建时间')]}</div>
        </Col>
        <Col span={6}>
          {statusIconView('stationPosition', item[keyMap.get('状态')])}
          {getEnumTitle(item[keyMap.get('状态')], enumStationStatus)}
        </Col>
      </Row>
    </div>
  </List.Item>
);
export default ListItem;

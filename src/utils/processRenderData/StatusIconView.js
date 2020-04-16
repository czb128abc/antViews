import React from 'react';

import { Icon } from 'antd';

const statusIconView = (type, status) => {
  const stationPosition = {
    1: (
      <span>
        <Icon theme="filled" type="info-circle" style={{ color: '#ccc' }} />{' '}
      </span>
    ),
    2: (
      <span>
        <Icon theme="filled" type="check-circle" style={{ color: '#52c41a' }} />
      </span>
    ),
    3: (
      <span>
        <Icon theme="filled" type="close-circle" style={{ color: '#f5222d' }} />
      </span>
    ),
    4: (
      <span>
        <Icon theme="filled" type="clock-circle" style={{ color: '#ccc' }} />{' '}
      </span>
    ),
    5: (
      <span>
        <Icon theme="filled" type="info-circle" style={{ color: '#ffe58f' }} />{' '}
      </span>
    ),
  };
  const monitor = {
    1: (
      <span>
        <Icon theme="filled" type="check-circle" style={{ color: '#52c41a' }} />
      </span>
    ),
    2: (
      <span>
        <Icon theme="filled" type="clock-circle" style={{ color: '#ccc' }} />{' '}
      </span>
    ),
  };
  const warnRules = {
    1: (
      <span>
        <Icon theme="filled" type="check-circle" style={{ color: '#52c41a' }} />
      </span>
    ),
    2: (
      <span>
        <Icon theme="filled" type="clock-circle" style={{ color: '#ccc' }} />{' '}
      </span>
    ),
  };
  const baseDataStatus = {
    1: (
      <span>
        <Icon theme="filled" type="check-circle" style={{ color: '#52c41a' }} />
      </span>
    ),
    2: (
      <span>
        <Icon theme="filled" type="close-circle" style={{ color: '#f5222d' }} />
      </span>
    ),
    3: (
      <span>
        <Icon theme="filled" type="info-circle" style={{ color: '#f5222d' }} />
      </span>
    ),
  };
  const iconMap = {
    stationPosition,
    monitor,
    warnRules,
    baseDataStatus,
  };
  return iconMap[type][status];
};

export default statusIconView;

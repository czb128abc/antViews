import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Alert } from 'antd';

export default () => (
  <PageHeaderWrapper>
    <Card style={{ minHeight: 600 }}>
      <Alert
        message="功能完善中,敬请期待!"
        type="info"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
    </Card>
  </PageHeaderWrapper>
);

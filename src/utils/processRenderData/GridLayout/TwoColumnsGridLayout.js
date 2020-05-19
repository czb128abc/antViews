import React from 'react';
import { Col, Row, Affix, Icon, Tooltip } from 'antd';
import { useBoolean } from '@umijs/hooks';

const GridLayout = ({
  gutter = 24,
  span = 8,
  minSpan = 2,
  leftContent,
  rightContent,
  reverseOrder = false,
}) => {
  const { state, toggle } = useBoolean(true);
  const isMiniView = !state;
  const spanNum = !isMiniView ? span : minSpan;

  const triggerView = (
    <div style={{ position: 'relative' }}>
      <Affix style={{ position: 'absolute', zIndex: 1, top: 0, right: 4 }}>
        <Tooltip
          trigger="hover"
          style={{ display: 'inline-block' }}
          title={isMiniView ? '点击展开' : '点击折叠'}
        >
          <Icon onClick={() => toggle(!state)} type={state ? 'menu-unfold' : 'menu-fold'} />
        </Tooltip>
      </Affix>
    </div>
  );
  const rightStyle = {};
  if (reverseOrder) {
    rightStyle.paddingLeft = 0;
  } else {
    rightStyle.paddingRight = 0;
  }

  return (
    <Row
      type="flex"
      justify="space-between"
      align="bottom"
      gutter={[gutter, 0]}
      style={{ alignItems: 'stretch' }}
    >
      <Col
        span={spanNum}
        order={reverseOrder ? 2 : 1}
        style={{ background: '#ffff', overflow: 'auto', padding: 0 }}
      >
        {triggerView}
        {leftContent}
      </Col>
      <Col span={24 - spanNum} order={!reverseOrder ? 2 : 1} style={rightStyle}>
        {rightContent}
      </Col>
    </Row>
  );
};

export default GridLayout;

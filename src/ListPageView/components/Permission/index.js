import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'umi';
import { Icon, Row, Col, Tooltip } from 'antd';

export const PermissionContext = createContext();

export const NoPermissionView = ({ noPermissionType = 'none', noPermissionText = '暂无权限' }) => {
  if (noPermissionType === 'none') {
    return null;
  }
  if (noPermissionType === 'inline') {
    return (
      <span>
        <Icon type="lock" />
        <span>{noPermissionText}</span>
      </span>
    );
  }
  if (noPermissionType === 'tooltip') {
    return (
      <Tooltip title={noPermissionText}>
        <Icon type="lock" />
      </Tooltip>
    );
  }
  return (
    <div style={{ padding: '5em' }}>
      <Row type="flex" align="middle" justify="center">
        <Col span={4} style={{ textAlign: 'center', fontSize: '16px' }}>
          <Icon type="lock" theme="twoTone" style={{ fontSize: '4em' }} />
          <div style={{ padding: '20px' }}>{noPermissionText}</div>
        </Col>
      </Row>
    </div>
  );
};

class Permission extends React.Component {
  static propTypes = {
    permissionKey: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    noPermissionType: PropTypes.oneOf(['none', 'inline', 'block', 'tooltip']),
    noPermissionText: PropTypes.string,
  };

  static defaultProps = {
    noPermissionType: 'none',
    noPermissionText: '暂无权限',
  };

  checkPermission({ menuMap = {} }) {
    const { match, permissionKey } = this.props;
    const pageMenu = menuMap[match.url];
    if (!pageMenu) {
      return true;
    }
    const { permissionKeys = [] } = pageMenu;
    return permissionKeys.includes(permissionKey);
  }

  render() {
    const { children, noPermissionType, noPermissionText } = this.props;
    return (
      <PermissionContext.Consumer>
        {(value) => {
          if (!this.checkPermission(value)) {
            return (
              <NoPermissionView
                noPermissionType={noPermissionType}
                noPermissionText={noPermissionText}
              />
            );
          }
          return children;
        }}
      </PermissionContext.Consumer>
    );
  }
}

export default withRouter(Permission);

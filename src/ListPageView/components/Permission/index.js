import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'umi';
import { Icon, Row, Col } from 'antd';

export const PermissionContext = createContext();

export const NoPermissionView = ({ noPermissionType = 'none' }) => {
  if (noPermissionType === 'none') {
    return null;
  }
  if (noPermissionType === 'inline') {
    return (
      <span>
        <Icon type="lock" />
        <span>暂无权限</span>
      </span>
    );
  }
  return (
    <div style={{ padding: '5em' }}>
      <Row type="flex" align="middle" justify="center">
        <Col span={4} style={{ textAlign: 'center', fontSize: '16px' }}>
          <Icon type="lock" theme="twoTone" style={{ fontSize: '4em' }} />
          <div style={{ padding: '20px' }}>暂无权限</div>
        </Col>
      </Row>
    </div>
  );
};

class Permission extends React.Component {
  static propTypes = {
    permissionKey: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    noPermissionType: PropTypes.oneOf(['none', 'inline', 'block']),
  };

  static defaultProps = {
    noPermissionType: 'none',
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
    const { children, noPermissionType } = this.props;
    return (
      <PermissionContext.Consumer>
        {(value) => {
          if (!this.checkPermission(value)) {
            return <NoPermissionView noPermissionType={noPermissionType} />;
          }
          return children;
        }}
      </PermissionContext.Consumer>
    );
  }
}

export default withRouter(Permission);

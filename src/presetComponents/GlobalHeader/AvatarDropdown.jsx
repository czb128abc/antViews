import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Spin, message } from 'antd';
import React from 'react';
import { connect } from 'umi';
import PopupDetail from '@/ListPageView/components/PopupDetail';
import { createRules } from '@/utils/validate';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 20,
  },
};

const formFieldsMap = {
  phoneNumber: {
    label: '手机号码',
    fieldKey: 'phoneNumber',
    fieldType: 'text',
    fieldAttr: {
      formItemLayout,
      fieldDecoratorConfig: {
        initialValue: '',
        rules: createRules(),
      },
    },
    otherConfig: {},
  },
  userPassword: {
    label: '密码',
    fieldKey: 'userPassword',
    fieldType: 'textPassword',
    fieldAttr: {
      formItemLayout,
      fieldDecoratorConfig: {
        initialValue: '',
        rules: createRules(),
      },
    },
    otherConfig: {},
  },
  userPassword2: {
    label: '确认密码',
    fieldKey: 'userPassword2',
    fieldType: 'textPassword',
    fieldAttr: {
      formItemLayout,
      fieldDecoratorConfig: {
        initialValue: '',
        rules: createRules(),
      },
    },
    otherConfig: {},
  },
};
class AvatarDropdown extends React.Component {
  updatePassword = async (values, { type, hide, resetFields }) => {
    const { dispatch } = this.props;
    const isEdit = type === 'edit';
    const params = values;
    const result = await dispatch({
      type: `systemLogin/updatePassword`,
      payload: params,
    });
    if (result.success) {
      const msg = isEdit ? '修改成功' : '新增成功';
      message.success(msg);
      resetFields();
      hide();
    }
  };

  onMenuClick = (event) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
    }
  };

  render() {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
      // menu,
    } = this.props;
    const phoneNumber = '';
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="updatePassword">
          <PopupDetail
            type="edit"
            formFieldsMap={formFieldsMap}
            displayType="displayTypeModal"
            topTitle="修改密码"
            record={{
              phoneNumber,
            }}
            width={600}
            onSubmit={this.updatePassword}
          >
            <SettingOutlined />
            修改密码
          </PopupDetail>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <span className={styles.name}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);

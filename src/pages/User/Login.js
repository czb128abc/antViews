import React, { Component } from 'react';
import { connect } from 'umi';
import { Alert } from 'antd';
import Login from '@/presetComponents/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Submit } = Login;

@connect(({ systemLogin, loading }) => ({
  login: systemLogin,
  submitting: !!loading.effects['systemLogin/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
  };

  onTabChange = (type) => {
    this.setState({
      type,
    });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;

    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'systemLogin/login',
        payload: { ...values, type },
      });
    }
  };

  renderMessage = (content) => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={(form) => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="账户密码登录">
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage('账户或密码错误')}
            <UserName
              name="userName"
              placeholder={`${'用户名'}`}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${'密码'}`}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;

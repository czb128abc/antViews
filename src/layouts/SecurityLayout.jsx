import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
  }

  async loadData() {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    await dispatch({
      type: 'systemLogin/queryUserInfo',
    }).then((data) => {
      console.log('SecurityLayout -> loadData -> data', data);
      if (!data) {
        dispatch({ type: 'systemLogin/logout' });
      } else {
        console.info('获取登录账号信息', data);
      }
    });
    await dispatch({
      type: 'setting/getSetting',
    });
    await dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, userInfo } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）

    const isLogin = userInfo && userInfo.id;
    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }

    return children;
  }
}

export default connect(({ systemLogin, loading }) => ({
  userInfo: systemLogin.userInfo,
  loading: loading.models.systemLogin,
}))(SecurityLayout);

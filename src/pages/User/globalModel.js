import { stringify } from 'querystring';
import { history } from 'umi';
import { login, logout, queryUserInfo, updatePassword } from '@/services/login';
import { getPageQuery } from '@/utils/utils';
import { getItem, setItem } from '@/utils/storage';

const SYSTEM_LOGIN_KEY = 'authority';

const initState = {
  status: false,
  userInfo: undefined,
};
function getInitState() {
  return getItem(SYSTEM_LOGIN_KEY) || { ...initState };
}

const Model = {
  namespace: 'systemLogin',
  state: getInitState(),
  effects: {
    *login({ payload }, { call, put, take, select }) {
      const response = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.success) {
        yield put({
          type: 'queryUserInfo',
          payload: {},
        });
        yield take('queryUserInfo/@@end');
        const selectResut = yield select((s) => s.systemLogin);
        console.log('*login -> selectResut', selectResut);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    *queryUserInfo(_, { call, put, select }) {
      const { userInfo } = yield select((s) => s.systemLogin);
      if (!userInfo) {
        try {
          const result = yield call(queryUserInfo);
          if (result.success) {
            yield put({
              type: 'setUserInfo',
              payload: {
                userInfo: result.data,
                status: true,
              },
            });
            return result.data;
          }
          return undefined;
        } catch (error) {
          return undefined;
        }
      }
      return userInfo;
    },

    *isLogin(_, { select }) {
      const isLogin = yield select((s) => s.systemLogin.status);
      return isLogin;
    },

    *logout(_, { put, call }) {
      yield put({
        type: 'setUserInfo',
        payload: initState,
      });
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
      yield call(logout);
    },

    *updatePassword({ payload }, { call }) {
      const result = yield call(updatePassword, payload);
      return result;
    },
  },
  reducers: {
    setUserInfo(state, { payload }) {
      const newState = {
        ...state,
        ...payload,
      };
      setItem(SYSTEM_LOGIN_KEY, newState);
      return newState;
    },
  },
};
export default Model;

/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
import { message } from 'antd';
import { getDvaApp } from 'umi';
// export const getDispatch = () => window.g_app._store.dispatch;
export const getDispatch = () => getDvaApp()._store.dispatch;

// eslint-disable-next-line import/prefer-default-export
export function config() {
  return {
    onError(err) {
      err.preventDefault();
      message.error(err.message);
      // eslint-disable-next-line
      console.error(err.message);
    },
  };
}

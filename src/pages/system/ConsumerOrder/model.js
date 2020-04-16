import createCrudModel, { calcPageInfo } from '@/utils/modelUtil';
import { notEmptyArray, removeEmptyFields } from '@/utils/processData';
import * as services from './services';
import { namespace } from './consts';

const effects = {
  *queryListPage({ payload }, { call, put }) {
    const { date, ...other } = payload;
    const param = {
      ...removeEmptyFields(other),
    };
    if (notEmptyArray(date) && !!date[0]) {
      // eslint-disable-next-line prefer-destructuring
      param.fromDate = `${date[0]}`;
      // eslint-disable-next-line prefer-destructuring
      param.toDate = `${date[1]}`;
    }
    const result = yield call(services.queryListPage, param);
    if (result.success) {
      const pageInfo = calcPageInfo(result.pageInfo);
      const list = result.data;
      yield put({
        type: 'saveReducer',
        payload: {
          list,
          pageInfo,
        },
      });
    }
    return result;
  },
};
export default createCrudModel({ namespace, effects }, services);

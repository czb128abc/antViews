export function calcPageInfo(result = {}) {
  const { pageSize = 50, current = 1, total = 0, totalPageSize = 0 } = result;
  return {
    pageSize,
    current,
    total,
    totalPageSize,
  };
}

export default function createCrudModel(config = {}, services) {
  const { namespace, initState = {}, effects = {}, reducers = {}, ...other } = config;
  const baseModel = {
    ...other,
    namespace,
    state: {
      pageInfo: calcPageInfo(),
      list: [],
      ...initState,
    },
    effects: {
      *queryListPage({ payload }, { call, put }) {
        const result = yield call(services.queryListPage, payload);
        if (result.success) {
          const pageInfo = calcPageInfo(result.data);
          const list = result.data.data;
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

      *queryDetail({ payload }, { call }) {
        const result = yield call(services.queryDetail, payload);
        return result;
      },

      *del({ payload }, { call }) {
        const result = yield call(services.del, payload);
        return result;
      },

      *save({ payload }, { call }) {
        const result = yield call(services.save, payload);
        return result;
      },

      *update({ payload }, { call }) {
        const result = yield call(services.update, payload);
        return result;
      },
      ...effects,
    },
    reducers: {
      saveReducer(state, { payload }) {
        return {
          ...state,
          ...payload,
        };
      },
      ...reducers,
    },
  };

  return baseModel;
}

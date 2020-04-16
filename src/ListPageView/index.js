import { Form } from 'antd';
import { connect } from 'umi';
import ListPageView from './ListPageView';
import { baseListPageViewConfig } from './consts';

function defaultMapStateToProps(namespace, state) {
  const { loading, ...root } = state;
  return {
    list: root[namespace].list,
    pageInfo: root[namespace].pageInfo,
    loading: !!loading.models[namespace],
  };
}

export function addReduxAntFormProps(Page, pageConfig = {}, connectCallback = () => ({})) {
  const { namespace } = pageConfig;
  const mapStateToProps = (state) => {
    const defaultReduxMapProps = defaultMapStateToProps(namespace, state);
    const connectCallbackValue = connectCallback(state);
    const result = {
      ...defaultReduxMapProps,
      ...connectCallbackValue,
    };
    return result;
  };

  return connect(mapStateToProps)(Form.create()(Page));
}

export const bindReduxAntFormProps = (pageConfig = {}, connectCallback = () => ({})) => (Page) => {
  const { namespace } = pageConfig;
  const mapStateToProps = (state) => {
    const defaultReduxMapProps = defaultMapStateToProps(namespace, state);
    const connectCallbackValue = connectCallback(state);
    const result = {
      ...defaultReduxMapProps,
      ...connectCallbackValue,
    };
    return result;
  };
  return connect(mapStateToProps)(Form.create()(Page));
};

export function calcListPageViewConfig(formFields, listPageViewConfig = {}) {
  const { listTableViewProps, btnDisplay, ...others } = baseListPageViewConfig;
  const {
    listTableViewPropsConfig = {},
    btnDisplayConfig = {},
    ...othersConfig
  } = listPageViewConfig;

  const config = {
    ...others,
    formFields,
    listTableViewProps: {
      ...listTableViewProps,
      ...listTableViewPropsConfig,
    },
    btnDisplay: {
      ...btnDisplay,
      ...btnDisplayConfig,
    },
    ...othersConfig,
  };

  const formFieldsMap = {};
  const tableColumnsMap = {};
  const searchFilterFieldsMap = {};
  config.formFields.forEach((item) => {
    formFieldsMap[item.fieldKey] = item;
  });
  config.tableColumnsKeys.forEach((item) => {
    if (formFieldsMap[item]) {
      tableColumnsMap[item] = formFieldsMap[item];
    } else {
      tableColumnsMap[item] = {
        label: item,
        fieldKey: item,
        fieldType: 'text',
        otherConfig: {},
      };
    }
  });
  config.searchFilterFieldsKeys.forEach((item) => {
    if (formFieldsMap[item]) {
      searchFilterFieldsMap[item] = formFieldsMap[item];
    } else {
      searchFilterFieldsMap[item] = {
        label: item,
        fieldKey: item,
        fieldType: 'text',
        otherConfig: {},
      };
    }
  });
  config.formFieldsMap = formFieldsMap;
  config.searchFilterFieldsMap = searchFilterFieldsMap;
  config.tableColumnsMap = tableColumnsMap;
  return config;
}

export default ListPageView;

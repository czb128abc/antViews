/* eslint-disable react/react-in-jsx-scope */
import { Component } from 'react';
import { Alert, message } from 'antd';
import { getFormValue } from '@/utils/processData';
import ListView from './components/ListView';
import SearchFilterView from './components/SearchFilterView';
import ListTableView from './components/ListTableView';
import ListItemView from './components/ListItemView';
import PopupDetail from './components/PopupDetail';
import RouteDetail from './components/RouteDetail';
import PageHeaderWrapper from './components/PageHeaderWrapper';

const baseConfig = {
  namespace: 'systemMgtStationPosition',
  functionName: 'XXX',
  formFieldsMap: {},
  // 配置
  displayEditType: 'router', // 新建页面 方式 [router, popup]
  displayListType: 'list', // 新建页面 方式 [list, table]
  displayToAddPosition: 'alignWithTitleFalse', //
  searchKeywordsFieldKey: 'name',
  hasShowSearchFilter: false,
  // 组件
  PageHeaderWrapper,
  PopupDetail,
  RouteDetail,
  SearchFilterView,
  ListItemView,
  ListView,
  ListTableView,
  // 组件props
  listTableViewProps: {},
};

class AbstractListPageView extends Component {
  constructor(props) {
    super(props);
    const config = {};
    this.setConfig(config);
  }

  setConfig(config) {
    const distConfig = {
      ...baseConfig,
      ...config,
    };
    // 期望的keys
    const expectantConfigKeys = [
      'namespace',
      'formFieldsMap',
      'PageHeaderWrapper',
      'ListItemView',
      'ListView',
      'ListTableView',
    ];
    const notConfigKeys = [];
    const configKeys = Object.keys(distConfig);
    configKeys.forEach(key => {
      this[key] = distConfig[key];
    });
    expectantConfigKeys.forEach(key => {
      if (!configKeys.includes(key)) {
        notConfigKeys.push(key);
      }
    });
    if (notConfigKeys.length > 0) {
      this.render = () => (
        <div style={{ margin: 'auto' }}>
          <Alert
            message="配置项错误"
            description={`extends ListPageView 请检查 ${notConfigKeys.join(', ')}`}
            type="error"
          />
        </div>
      );
    }

    this.namespace = distConfig.namespace;
    this.formFieldsMap = distConfig.formFieldsMap;
    this.displayEditType = distConfig.displayEditType;
    this.displayToAddPosition = distConfig.displayToAddPosition;
    // Component
    this.PageHeaderWrapper = distConfig.PageHeaderWrapper;
    this.PopupDetail = distConfig.PopupDetail;
    this.RouteDetail = distConfig.RouteDetail;
    this.ListItemView = distConfig.ListItemView;
    this.ListView = distConfig.ListView;
    this.ListTableView = distConfig.ListTableView;
    this.functionName = distConfig.functionName;
    this.searchFieldKey = distConfig.searchFieldKey;
    if (typeof this.afterSetConfig === 'function') {
      this.afterSetConfig();
    }
  }

  getDetailDefaultProps() {
    const { functionName, formFieldsMap, specificFieldTypeMapping = {}, EditForm } = this;
    const { loading } = this.props;
    return {
      title: `${functionName || ''}`.replace('管理', ''),
      formFieldsMap,
      specificFieldTypeMapping,
      loading,
      EditForm,
      isLoadDetail: true,
    };
  }

  getDetailCommonProps() {
    return this.getDetailDefaultProps();
  }

  saveOrUpdate = async (values, { type, record, hide, continueWithSave, resetFields }) => {
    const { dispatch } = this.props;
    const isEdit = type === 'edit';
    const { recordPrimaryKey } = this;
    const params = await this.calcSaveOrUpdateParams(values, {
      type,
      record,
      hide,
      continueWithSave,
      resetFields,
    });
    let saveOrUpdateType = 'save';
    if (type === 'edit') {
      saveOrUpdateType = 'update';
      params[recordPrimaryKey] = record[recordPrimaryKey];
    }
    const result = await dispatch({
      type: `${this.namespace}/${saveOrUpdateType}`,
      payload: params,
    });
    if (result.success) {
      const msg = isEdit ? '修改成功' : '新增成功';
      message.success(msg);
      // 加入继续保存逻辑
      if (!isEdit && continueWithSave) {
        resetFields();
      } else {
        hide();
      }

      const condition = isEdit ? {} : { current: 1 };
      this.search(condition);
    }
  };

  del = async item => {
    const { dispatch } = this.props;
    const result = await dispatch({
      type: `${this.namespace}/del`,
      payload: item,
    });
    if (result.success) {
      const msg = '删除成功';
      message.success(msg);
      this.search({ current: 1 });
    }
  };

  baseSearch = async (condition = {}, dispatchType) => {
    const { dispatch, pageInfo } = this.props;
    const { searchKeywords, ...values } = await getFormValue(this.props);
    const serachCondition = {};
    if (searchKeywords) {
      serachCondition[this.searchKeywordsFieldKey] = searchKeywords;
    }
    const params = {
      ...pageInfo,
      ...values,
      ...serachCondition,
      ...condition,
    };
    const payload = this.calcSearchParams(params);

    return dispatch({
      type: `${this.namespace}/${dispatchType}`,
      payload,
    });
  };

  search = (condition = {}) => {
    const result = this.baseSearch(condition, 'queryListPage');
    return result;
  };

  queryDetail = async (record, callback) => {
    const { dispatch } = this.props;
    const result = await dispatch({
      type: `${this.namespace}/queryDetail`,
      payload: this.calcQueryDetailParams(record),
    });
    if (result.success) {
      const { id: theId, ...values } = result.data;
      this.queryDetailData = result.data;
      callback(values);
    }
  };

  calcSaveOrUpdateParams(values) {
    const commonData =
      typeof this.getCommonDataForSaveOrUpdate === 'function'
        ? this.getCommonDataForSaveOrUpdate(values)
        : {};
    const data = {
      ...values,
      ...commonData,
    };
    return Promise.resolve(data);
  }

  calcSearchParams(values) {
    const commonData =
      typeof this.getCommonDataForSearch === 'function' ? this.getCommonDataForSearch() : {};
    return {
      ...values,
      ...commonData,
    };
  }

  calcQueryDetailParams(record) {
    return record[this.recordPrimaryKey];
  }

  isPopupDisplayEditType() {
    return this.displayEditType === 'popup';
  }

  toAddIsAlignWithTitle() {
    return this.displayToAddPosition === 'alignWithTitle';
  }

  render() {
    return (
      <div>
        <div>ss</div>
        ss
      </div>
    );
  }
}

export default AbstractListPageView;

/* eslint-disable class-methods-use-this */
import React, { PureComponent } from 'react';
import { Form, Card, Input, Button, message, Alert, Popconfirm } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getFormValue } from '@/utils/processData';
import { ListItemActions } from '@/utils/processRenderData';
import BasePopupDetail from '@/components/base/BaseCrudPage/BasePopupDetail';

class CrudPageWithPopupDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.refPopupDetail = React.createRef();
    this.queryDetailData = {};
    this.state = {
      selectRecord: {},
    };
  }

  componentDidMount() {
    this.search();
  }

  setConfig(config) {
    const {
      namespace,
      formFieldsMap,
      ListItem,
      BaseListView,
      PopupDetail,
      functionName = 'XXX',
      searchFieldKey = 'stationName',
    } = config;
    // 期望的keys
    const expectantConfigKeys = ['namespace', 'formFieldsMap', 'ListItem', 'BaseListView'];
    const notConfigKeys = [];
    const configKeys = Object.keys(config);
    expectantConfigKeys.forEach((key) => {
      if (!configKeys.includes(key)) {
        notConfigKeys.push(key);
      }
    });
    if (notConfigKeys.length > 0) {
      message.error(`配置项错误!请检查 ${notConfigKeys.join(', ')}`);
      this.render = () => (
        <div style={{ margin: 'auto' }}>
          <Alert
            message="配置项错误"
            description={`extends CrudPageWithPopupDetail 请检查 ${notConfigKeys.join(', ')}`}
            type="error"
          />
        </div>
      );
    }

    this.namespace = namespace;
    this.formFieldsMap = formFieldsMap;
    // Component
    this.ListItem = ListItem;
    this.BaseListView = BaseListView;
    this.PopupDetail = PopupDetail;
    this.functionName = functionName;
    this.searchFieldKey = searchFieldKey;
  }

  setSelectRecord(selectRecord, callback) {
    this.setState({ selectRecord }, () => {
      if (typeof callback === 'function') {
        callback();
      }
    });
  }

  getListItemExtraActionList() {
    return [];
  }

  getListItemActionList(item) {
    const actionList = [
      <span
        className="mock-link"
        onClick={() => {
          this.showEditView(item);
        }}
      >
        编辑
      </span>,
      <Popconfirm
        title="确认删除?"
        onConfirm={() => this.del(item)}
        okText="删除"
        cancelText="取消"
      >
        <span className="mock-link">删除</span>
      </Popconfirm>,
    ];
    const extraList = this.getListItemExtraActionList(item);
    return [...actionList, ...extraList];
  }

  baseSearch = async (condition = {}, dispatchType) => {
    const { dispatch, pageInfo } = this.props;
    const values = await getFormValue(this.props);
    const serachCondition = {};
    if (values.searchKeywords) {
      serachCondition[this.searchFieldKey] = values.searchKeywords;
    }
    const params = {
      ...pageInfo,
      ...serachCondition,
      ...condition,
    };
    return dispatch({
      type: `${this.namespace}/${dispatchType}`,
      payload: params,
    });
  };

  search = (condition = {}) => {
    const result = this.baseSearch(condition, 'queryListPage');
    return result;
  };

  queryDetail = async ({ id }, callback) => {
    const { dispatch } = this.props;
    const result = await dispatch({
      type: `${this.namespace}/queryDetail`,
      payload: id,
    });
    if (result.success) {
      const { id: theId, ...values } = result.data;
      this.queryDetailData = result.data;
      callback(values);
    }
  };

  saveOrUpdate = async (values, { type, record, hide, continueWithSave, resetFields }) => {
    const { dispatch } = this.props;
    const isEdit = type === 'edit';
    const params = {
      ...values,
    };
    let saveOrUpdateType = 'save';
    if (type === 'edit') {
      saveOrUpdateType = 'update';
      params.id = record.id;
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

  del = async (item) => {
    const { dispatch } = this.props;
    const result = await dispatch({
      type: `${this.namespace}/del`,
      payload: item,
    });
    if (result.success) {
      const msg = '删除成功';
      message.success(msg);
      this.search({});
    }
  };

  rendListItem = (item) => {
    const { ListItem } = this;
    const actionList = this.getListItemActionList(item);
    const listItemConfig = {
      actions: ListItemActions(actionList),
    };
    return <ListItem item={item} {...listItemConfig} />;
  };

  showEditView(item) {
    this.setSelectRecord(item, () => {
      this.refPopupDetail.current.show();
    });
  }

  rendPopupDetail() {
    const { loading } = this.props;
    const { selectRecord } = this.state;
    const { formFieldsMap, functionName } = this;
    const PopupDetail = this.PopupDetail || BasePopupDetail;
    return (
      <div>
        <PopupDetail
          type="add"
          loading={loading}
          topTitle={functionName}
          formFieldsMap={formFieldsMap}
          onSubmit={this.saveOrUpdate}
        >
          <Button type="dashed" icon="plus" block>
            添加{functionName}
          </Button>
        </PopupDetail>
        <span>
          <PopupDetail
            wrappedComponentRef={this.refPopupDetail}
            record={selectRecord}
            type="edit"
            topTitle={functionName}
            loading={loading}
            isLoadDetail
            onLoadDetail={this.queryDetail}
            formFieldsMap={formFieldsMap}
            onSubmit={this.saveOrUpdate}
          />
        </span>
      </div>
    );
  }

  rendContent() {
    const { loading, list, pageInfo } = this.props;
    const { BaseListView } = this;
    const listViewProps = {
      loading,
      list,
      pageInfo,
      onPageChange: (current, pageSize) => {
        this.search({ current, pageSize });
      },
      listItemRender: this.rendListItem,
    };
    return (
      <div>
        {this.rendPopupDetail()}
        <BaseListView {...listViewProps} />
      </div>
    );
  }

  rendCardExtra() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form layout="inline">
          {getFieldDecorator('searchKeywords')(
            <Input.Search
              placeholder="请输入关键字"
              onSearch={() => {
                this.search();
              }}
            />,
          )}
        </Form>
      </div>
    );
  }

  render() {
    const { functionName } = this;
    return (
      <PageHeaderWrapper title={false}>
        <Card title={`${functionName}列表`} extra={this.rendCardExtra()} bordered={false}>
          {this.rendContent()}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export const CrudPageForm = Form;

export default CrudPageWithPopupDetail;

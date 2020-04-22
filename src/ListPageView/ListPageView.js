import React from 'react';
import { Route, Switch, history } from 'umi';
// import { history } from 'umi';
import { Card, Button, Popconfirm } from 'antd';
import { ListItemActions } from '@/utils/processRenderData';
import AbstractListPageView from './AbstractListPageView';

export default class ListPageView extends AbstractListPageView {
  constructor(props) {
    super(props);
    this.refPopupEditPage = React.createRef();
    this.refPopupAddPage = React.createRef();
    this.queryDetailData = {};
    this.state = {
      selectRecord: {},
    };
  }

  componentDidMount() {
    this.search();
  }

  setSelectRecord(selectRecord, callback) {
    this.setState({ selectRecord }, () => {
      if (typeof callback === 'function') {
        callback();
      }
    });
  }

  showAddView() {
    this.setSelectRecord({}, () => {
      if (this.isPopupDisplayEditType()) {
        this.refPopupAddPage.current.show();
      } else {
        const { match } = this.props;
        history.push({
          pathname: `${match.path.replace('/:listPage', '')}/add`,
          // query: { editViewType: 'add' },
        });
      }
    });
  }

  showEditView(item) {
    this.setSelectRecord(item, () => {
      if (this.isPopupDisplayEditType()) {
        this.refPopupEditPage.current.show();
      } else {
        const { match } = this.props;
        history.push({
          pathname: `${match.path.replace('/:listPage', '')}/edit`,
          // query: { editViewType: 'edit' },
        });
      }
    });
  }

  rendContent() {
    return this.rendListOrTableView();
  }

  rendPopupDetail() {
    const { selectRecord } = this.state;
    const { functionName } = this;
    const { PopupDetail } = this;
    const toAddIsAlignWithTitle = this.toAddIsAlignWithTitle();
    return (
      <div style={{ display: toAddIsAlignWithTitle ? 'none' : 'block', marginBottom: 8 }}>
        <Button
          type="dashed"
          icon="plus"
          block
          onClick={() => {
            this.showAddView();
          }}
        >
          添加{functionName}
        </Button>
        <PopupDetail
          wrappedComponentRef={this.refPopupAddPage}
          record={selectRecord}
          type="add"
          {...this.getDetailCommonProps()}
          onSubmit={this.saveOrUpdate}
        />
        <span>
          <PopupDetail
            wrappedComponentRef={this.refPopupEditPage}
            record={selectRecord}
            type="edit"
            {...this.getDetailCommonProps()}
            isLoadDetail
            onLoadDetail={this.queryDetail}
            onSubmit={this.saveOrUpdate}
          />
        </span>
      </div>
    );
  }

  getListItemActionList(item) {
    const { getListItemExtraActionList } = this;
    const actionList = [
      <Popconfirm
        title="确认删除?"
        onConfirm={() => this.del(item)}
        okText="删除"
        cancelText="取消"
      >
        <span className="mock-link">删除</span>
      </Popconfirm>,
      <span
        className="mock-link"
        onClick={() => {
          this.showEditView(item);
        }}
      >
        编辑
      </span>,
    ];
    const extraList =
      typeof getListItemExtraActionList === 'function' ? this.getListItemExtraActionList(item) : [];
    return [...actionList, ...extraList].map((action, index) => ({ ...action, key: `${index}` }));
  }

  calcListTableColumns(tableColumnsMap = this.tableColumnsMap) {
    // const { tableColumnsMap = {} } = this;
    const pageInstance = this;
    const fields = Object.values(tableColumnsMap);
    if (fields.length === 0) {
      const columns = [
        {
          title: 'Name',
          dataIndex: 'id',
          render: (text, record) => (
            <div style={{ width: 500 }}>
              未配置tableColumnRender
              {JSON.stringify(record)}
            </div>
          ),
          width: '80%',
        },
      ];
      return columns;
    }
    return fields.map((item) => {
      const { otherConfig = {} } = item;
      const { tableColumnTitle = '' } = otherConfig;
      const column = {
        title: tableColumnTitle || item.label,
        dataIndex: item.fieldKey,
        key: item.fieldKey,
      };
      if (typeof item.otherConfig.tableColumnRender === 'function') {
        // 这里执行的是一个 高阶函数
        column.render = item.otherConfig.tableColumnRender(pageInstance);
      }
      return column;
    });
  }

  getListTableColumns() {
    const columns = this.calcListTableColumns();
    columns.push({
      title: '操作',
      key: 'op',
      render: (text, record) => (
        <span className="btn-group">{ListItemActions(this.getListItemActionList(record))}</span>
      ),
    });
    return columns;
  }

  rendListItemView = (item) => {
    const { ListItemView } = this;
    const actionList = this.getListItemActionList(item);
    const listItemConfig = {
      actions: ListItemActions(actionList),
    };
    return <ListItemView item={item} {...listItemConfig} />;
  };

  rendListOrTableView() {
    const { loading, list, pageInfo } = this.props;
    const {
      ListView,
      displayListType,
      ListTableView,
      listTableViewProps,
      hasShowPagination = true,
    } = this;
    const viewProps = {
      showPagination: hasShowPagination,
      loading,
      list,
      pageInfo,
      onPageChange: (current, pageSize) => {
        this.search({ current, pageSize });
      },
    };
    if (displayListType === 'list') {
      viewProps.listItemRender = this.rendListItemView;
    } else {
      const columns = this.getListTableColumns();
      viewProps.columns = columns;
      viewProps.otherTableProps = listTableViewProps;
    }
    const TheView = displayListType === 'list' ? ListView : ListTableView;
    return (
      <div>
        <TheView {...viewProps} />
      </div>
    );
  }

  rendTitleCardExtra() {
    if (this.toAddIsAlignWithTitle()) {
      return (
        <div>
          <Button onClick={() => this.showAddView()} icon="plus">
            添加
          </Button>
        </div>
      );
    }
    return null;
  }

  rendSearchFilter() {
    const { form, loading } = this.props;
    const {
      hasShowSearchFilter,
      hasShowSearchFilterRest = true,
      SearchFilterView,
      searchFilterViewDisplayType,
      searchFilterFieldsMap,
    } = this;
    if (!hasShowSearchFilter) {
      return '';
    }
    return (
      <div>
        <SearchFilterView
          searchFilterFieldsMap={searchFilterFieldsMap}
          searchFilterViewDisplayType={searchFilterViewDisplayType}
          hasShowSearchFilterRest={hasShowSearchFilterRest}
          loading={loading}
          form={form}
          onSearch={this.search}
        />
      </div>
    );
  }

  render() {
    const { PageHeaderWrapper, functionName, RouteDetail, listPageTitle = '' } = this;
    const { selectRecord } = this.state;
    const { match } = this.props;
    return (
      <PageHeaderWrapper title={false}>
        <Switch>
          <Route
            path={`${match.path.replace('/:listPage', '')}/add`}
            render={(routeProps) => (
              <RouteDetail
                {...routeProps}
                {...this.getDetailCommonProps()}
                record={{}}
                type="add"
                onSubmit={this.saveOrUpdate}
              />
            )}
          />
          <Route
            path={`${match.path.replace('/:listPage', '')}/edit`}
            render={(routeProps) => (
              <RouteDetail
                {...routeProps}
                {...this.getDetailCommonProps()}
                record={selectRecord}
                type="edit"
                onLoadDetail={this.queryDetail}
                onSubmit={this.saveOrUpdate}
              />
            )}
          />
          <Route
            render={() => (
              <>
                {typeof this.rendPageTop === 'function' && this.rendPageTop()}
                <Card
                  title={listPageTitle || `${functionName}列表`}
                  extra={this.rendTitleCardExtra()}
                  bordered={false}
                >
                  {this.rendSearchFilter()}
                  {this.rendPopupDetail()}
                  {this.rendContent()}
                </Card>
                {typeof this.rendPageBottom === 'function' && this.rendPageBottom()}
              </>
            )}
          />
        </Switch>
      </PageHeaderWrapper>
    );
  }
}

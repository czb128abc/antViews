import React from 'react';
import { message } from 'antd';
import { LineEllipsis } from '@/utils/processRenderData';
import ListPageView, {
  bindReduxAntFormProps,
  calcListPageViewConfig,
} from 'ant-views/es/ListPageView';
import ListItem from './components/ListItem';
import { namespace, formFieldsMap, consumerTypeEnumMap } from './consts';
import ChargeTypeConsumerOrderDetailModal from './components/ChargeTypeConsumerOrderDetailModal';

const functionName = '历史消费订单';

const config = {
  namespace,
  functionName,
  ListItemView: ListItem,
  formFieldsMap,
  displayListType: 'table',
  hasShowSearchFilter: true,
  searchFilterViewDisplayType: 'configuration-search',
  searchKeywordsFieldKey: 'stationName',
  displayToAddPosition: 'alignWithTitle', //
  tableColumnsKeys: [
    'phoneNumber',
    'wechatName',
    'consumerType',
    'money',
    'createTime',
    'stationName',
    'id',
  ],
  searchFilterFieldsKeys: ['date', 'consumerType'],
  listTableViewProps: {
    bordered: false,
  },
};

const pageConfig = calcListPageViewConfig(Object.values(formFieldsMap), config);
pageConfig.tableColumnsMap.stationName.otherConfig.tableColumnRender = () => (text, item) => (
  <div style={{ width: 100 }}>
    <LineEllipsis>
      <div>{item.stationName}</div>
    </LineEllipsis>
  </div>
);
pageConfig.tableColumnsMap.consumerType.otherConfig.tableColumnRender = () => (text, item) => (
  <LineEllipsis>
    <div>{`${consumerTypeEnumMap[item.consumerType]}`}</div>
  </LineEllipsis>
);
pageConfig.tableColumnsMap.money.otherConfig.tableColumnRender = () => (text, item) => (
  <LineEllipsis>
    <div>
      {item.money}
      {`${item.moneyType}` === '1' ? '人民币' : '能量币'}
    </div>
  </LineEllipsis>
);

pageConfig.tableColumnsMap.id.otherConfig.tableColumnRender = (pageInstance) => (text, record) => (
  <div className="text-center">
    {record.consumerType === '2' && !!record.orderId ? (
      <ChargeTypeConsumerOrderDetailModal
        dispatch={pageInstance.props.dispatch}
        orderId={record.orderId}
      />
    ) : (
      '无'
    )}
  </div>
);

export const tableColumnsMapForConsumerOrder = pageConfig.tableColumnsMap;

class PageView extends ListPageView {
  afterSetConfig() {
    Object.keys(pageConfig).forEach((key) => {
      this[key] = pageConfig[key];
    });
  }

  componentDidMount() {
    this.queryStatusCount();
    this.search();
  }

  queryStatusCount() {
    const { dispatch } = this.props;
    return dispatch({
      type: `${this.namespace}/queryStatusCount`,
    });
  }

  async updateStationStatus(id, status) {
    const { dispatch } = this.props;
    const payload = {
      status,
      id,
    };
    const result = await dispatch({
      type: `${this.namespace}/updateStationStatus`,
      payload,
    });
    if (result.success) {
      message.success('操作成功');
      this.search();
    }
    return result;
  }

  getListTableColumns() {
    const columns = this.calcListTableColumns();
    return columns;
  }

  rendTitleCardExtra() {
    return <div className="text-right" />;
  }
}

const connectCallback = (root) => ({
  stationStatusCountObj: root[namespace].stationStatusCountObj,
});
const thePage = bindReduxAntFormProps(pageConfig, connectCallback)(PageView);
export default thePage;
// export default Page;

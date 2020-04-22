import EditForm from '@/components/base/BaseEditForm/EditForm';

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 20,
  },
};

const formFields = [
  {
    label: '站点名称',
    fieldKey: 'stationName',
    fieldType: 'text',
    fieldAttr: {
      formItemLayout,
      fieldDecoratorConfig: {
        initialValue: '',
        rules: [],
      },
    },
    otherConfig: {
      addonAfter: '',
      addonBefore: '',
      display: {
        add: true,
        edit: true,
        detail: true,
      },
      disable: {
        add: false,
        edit: false,
        detail: false,
      },
      tableColumnRender: false,
      tableColumnTitle: false,
    },
  },
];
const formFieldsMap = {};
formFields.forEach(field => {
  formFieldsMap[field.fieldKey] = field;
});
// eslint-disable-next-line import/prefer-default-export
export const baseListPageViewConfig = {
  EditForm,
  displayEditType: 'router', // 新建页面 方式 [router, popup]
  displayListType: 'list', // 新建页面 方式 [list, table]
  displayToAddPosition: 'alignWithTitleFalse', //
  searchKeywordsFieldKey: 'name',
  recordPrimaryKey: 'id', // 实体对象主键 例如 id
  hasShowSearchFilter: false, // 是否有搜索
  hasShowPagination: true, // 是否显示 分页
  searchFilterViewDisplayType: 'configuration-search',
  formFields,
  searchFilterFieldsKeys: [],
  tableColumnsKeys: [],
  listPageTitle: '',
  /**
   * 参考 antd table
   *  columns 除外
   */
  listTableViewProps: {
    bordered: false,
    size: 'default',
    showHeader: false,
  },
  // TODO
  // 按钮显隐
  btnDisplay: {
    viewBtn: true,
    editBtn: true,
    addBtn: true,
  },
  titleText: {
    editTitle: '编 辑',
    addTitle: '新 增',
    viewTitle: '查 看',
    menuTitle: '操 作',
  },
};

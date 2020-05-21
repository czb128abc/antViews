import * as React from 'react';

declare class AbstractListPageView extends React.Component {
  setConfig(config: any);

  getDetailDefaultProps(): object;

  getDetailCommonProps(): object;

  saveOrUpdate(): Promise<void>;

  /**
   *
   * @param item
   */
  del(item: any): Promise<void>;

  /**
   *
   * @param condition
   * @param dispatchType
   */
  baseSearch(condition: any, dispatchType: any): Promise<object>;

  /**
   *
   * @param condition
   */
  search(condition: any): Promise<object>;

  /**
   *
   * @param record
   * @param callback
   */
  queryDetail(record: any, callback: any): Promise<void>;

  calcSaveOrUpdateParams(values): Promise<object>;

  calcSearchParams(values): object;

  calcQueryDetailParams(values): object;

  isPopupDisplayEditType(): boolean;

  toAddIsAlignWithTitle(): boolean;
}

declare class ListPageView extends AbstractListPageView {
  setSelectRecord(selectRecord, callback: void): void;

  showAddView(): void;

  showEditView(item): void;

  rendContent(): React.ReactNode;

  rendPopupDetail(): React.ReactNode;

  getListItemActionList(item): any;

  calcListTableColumns(tableColumnsMap): any;

  getListTableColumns(): any;

  rendListItemView(item): React.ReactNode;

  rendListOrTableView(): React.ReactNode;

  rendTitleCardExtra(): React.ReactNode;

  rendSearchFilter(): React.ReactNode;

  rendMain(): React.ReactNode;
}

export function bindReduxAntFormProps(pageConfig: object, connectCallback: Function): any;

export function calcListPageViewConfig(formFields: object, listPageViewConfig: object): object;

export default ListPageView;

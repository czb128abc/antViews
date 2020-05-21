import * as React from 'react';

declare class AbstractListPageView extends React.Component {
  setConfig(config: any);

  getDetailDefaultProps(): object;

  getDetailCommonProps(): object;

  saveOrUpdate(): void;

  /**
   *
   * @param item
   */
  del(item: any): void;

  /**
   *
   * @param condition
   * @param dispatchType
   */
  baseSearch(condition: any, dispatchType: any): void;

  /**
   *
   * @param condition
   */
  search(condition: any): void;

  /**
   *
   * @param record
   * @param callback
   */
  queryDetail(record: any, callback: any): void;

  calcSaveOrUpdateParams(values): object;

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

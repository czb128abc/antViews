import * as React from 'react';

export default class AbstractListPageView extends React.Component {
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

import * as React from 'react';

declare class AbstractListPageView extends React.Component {
  setConfig(config: any);
}

declare class ListPageView extends AbstractListPageView {
  setSelectRecord(selectRecord, callback: void): void;
  rendMain();
}

export function bindReduxAntFormProps(pageConfig: object, connectCallback: Function): any;

export function calcListPageViewConfig(formFields: object, listPageViewConfig: object): object;

export default ListPageView;

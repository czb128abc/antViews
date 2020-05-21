import AbstractListPageView from './AbstractListPageView';

export default class ListPageView extends AbstractListPageView {
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

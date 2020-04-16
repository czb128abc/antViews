import React, { PureComponent, Fragment } from 'react';
import { List, Pagination } from 'antd';

export default class BaseListView extends PureComponent {
  render() {
    const {
      list,
      loading,
      pageInfo,
      onPageChange,
      listItemRender,
      otherListProps = {},
    } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      onShowSizeChange: onPageChange,
      onChange: onPageChange,
      total: pageInfo.total,
      pageSize: pageInfo.pageSize,
      current: pageInfo.current,
    };
    return (
      <Fragment>
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={item => listItemRender(item)}
          {...otherListProps}
        />
        <Pagination
          style={{ textAlign: 'right' }}
          showTotal={total => `总共 ${total} 条`}
          {...paginationProps}
        />
      </Fragment>
    );
  }
}

import React, { PureComponent, Fragment } from 'react';
import { List, Pagination } from 'antd';

const pageSizeOptions = ['10', '50', '100', '200'];
export default class ListView extends PureComponent {
  render() {
    const {
      list,
      loading,
      pageInfo,
      onPageChange,
      listItemRender,
      showPagination = true,
      otherListProps = {},
      otherPaginationProps = {},
    } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      onShowSizeChange: onPageChange,
      onChange: onPageChange,
      total: pageInfo.total,
      pageSize: pageInfo.pageSize,
      current: pageInfo.current,
      hideOnSinglePage: true,
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
        {showPagination && (
          <Pagination
            style={{ textAlign: 'right' }}
            showTotal={total => `总共 ${total} 条`}
            pageSizeOptions={pageSizeOptions}
            {...paginationProps}
            {...otherPaginationProps}
          />
        )}
      </Fragment>
    );
  }
}

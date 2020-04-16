import React, { PureComponent, Fragment } from 'react';
import { Table, Pagination, Descriptions, Divider } from 'antd';
import ListView from './ListView';

const pageSizeOptions = ['10', '50', '100', '200'];

export default class ListTableView extends PureComponent {
  render() {
    const {
      list,
      loading,
      pageInfo,
      onPageChange,
      columns,
      showPagination = true,
      otherTableProps = {},
      displayType = 'table', // list
      otherPaginationProps = {},
    } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      onShowSizeChange: onPageChange,
      onChange: onPageChange,
      total: pageInfo.total,
      pageSize: pageInfo.pageSize,
      current: pageInfo.current,
    };
    if (displayType === 'list') {
      const listItemRender = item => (
        <div>
          <Descriptions>
            {columns.map(column => (
              <Descriptions.Item key={column.dataIndex} label={column.title}>
                {typeof column.render === 'function'
                  ? column.render(item[column.dataIndex], item)
                  : item[column.dataIndex]}
              </Descriptions.Item>
            ))}
          </Descriptions>
          <Divider />
        </div>
      );
      return (
        <ListView
          otherListProps={{ split: true }}
          listItemRender={listItemRender}
          otherPaginationProps={{ ...otherPaginationProps, simple: true }}
          {...this.props}
        />
      );
    }
    return (
      <Fragment>
        <Table
          rowKey={row => row.id}
          loading={loading}
          dataSource={list}
          columns={columns}
          {...otherTableProps}
          pagination={false}
        />
        {showPagination && (
          <Pagination
            className="mt_16"
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

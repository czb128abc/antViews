import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import EditForm from '@/components/base/BaseEditForm/EditForm';

export default class SearchFilterView extends PureComponent {
  handleInputSearch = () => {
    const { onSearch } = this.props;
    onSearch({ current: 1 });
  };

  rendBtnView() {
    const { onSearch, form, hasShowSearchFilterRest, loading } = this.props;
    return (
      <Form.Item style={{ marginRight: 0 }}>
        <div className="btn-group">
          <Button loading={loading} type="primary" onClick={() => onSearch({ current: 1 })}>
            搜索
          </Button>
          {hasShowSearchFilterRest && (
            <Button
              loading={loading}
              onClick={() => {
                form.resetFields();
                onSearch({ current: 1 });
              }}
            >
              重置
            </Button>
          )}
        </div>
      </Form.Item>
    );
  }

  rendConfigurationSearch() {
    const { form, specificFieldTypeMapping, searchFilterFieldsMap } = this.props;
    return (
      <div className="mb_8" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form layout="inline">
          <EditForm
            formFieldsMap={searchFilterFieldsMap}
            form={form}
            type="edit"
            needToValidate={false}
            formLayoutInline
            specificFieldTypeMapping={specificFieldTypeMapping}
          />
          {this.rendBtnView()}
        </Form>
      </div>
    );
  }

  rendConciseSearch() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="mb_8" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form layout="inline">
          <Form.Item>
            {getFieldDecorator('searchKeywords')(
              <Input.Search placeholder="关键字" onSearch={this.handleInputSearch} />,
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }

  rendNormalSearch() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="mb_8" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form layout="inline">
          <Form.Item label="关键字">{getFieldDecorator('searchKeywords')(<Input />)}</Form.Item>
          {this.rendBtnView()}
        </Form>
      </div>
    );
  }

  render() {
    const { searchFilterViewDisplayType } = this.props;
    if (searchFilterViewDisplayType === 'concise-search') {
      return this.rendConciseSearch();
    }
    if (searchFilterViewDisplayType === 'normal-search') {
      return this.rendConciseSearch();
    }
    return this.rendConfigurationSearch();
  }
}

SearchFilterView.propTypes = {
  // 简洁搜索 | 带搜索按钮的正常搜索 | 根据form配置
  searchFilterViewDisplayType: PropTypes.oneOf([
    'concise-search',
    'normal-search',
    'configuration-search',
  ]),
  searchFilterFieldsMap: PropTypes.object,
  specificFieldTypeMapping: PropTypes.object,
  onSearch: PropTypes.func.isRequired,
};
SearchFilterView.defaultProps = {
  searchFilterViewDisplayType: 'concise-search', //
  specificFieldTypeMapping: {},
  searchFilterFieldsMap: {},
};

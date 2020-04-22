import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Spin, Button } from 'antd';
import { getModalFormTypeTitle } from '@/utils/processData';
import BaseDrawer from '@/components/base/BaseDrawer';
import BaseModal from '@/components/base/BaseModal';
import EditForm from './EditForm';

export default function createBaseEditForm(
  displayType = 'displayTypeDrawer',
  baseEditFormWrapperConfig = {}
) {
  const displayTypeMap = {
    displayTypeDrawer: BaseDrawer,
    displayTypeModal: BaseModal,
  };
  const ExtendBase = displayTypeMap[displayType];
  const { commonProps = {}, methodMix = {}, width } = baseEditFormWrapperConfig;
  const { continueWithSave = true } = commonProps;

  class BaseEditFormWrapper extends ExtendBase {
    static displayName = displayType;

    getConfig() {
      const { type, topTitle } = this.props;
      const title = `${getModalFormTypeTitle(type)}${topTitle}`;
      const theConfig = { title };
      if (width) {
        theConfig.width = width;
      }
      return this.getDefaultConfig(theConfig);
    }

    afterShow() {
      const { onLoadDetail, record, isLoadDetail, form } = this.props;
      const callback = data => {
        form.setFieldsValue(data);
      };
      if (isLoadDetail && typeof onLoadDetail === 'function') {
        onLoadDetail(record, callback);
      }
    }

    getFormValue() {
      const {
        form: { validateFields },
      } = this.props;
      return new Promise((resolve, reject) => {
        validateFields((errors, values) => {
          if (errors) {
            reject(errors);
          }
          resolve(values);
        });
      });
    }

    handleOk = () => {
      const { onSubmit, record, type, form } = this.props;
      this.getFormValue()
        .then(values => {
          const otherProps = {
            record,
            type,
            hide: () => {
              this.hide();
            },
            continueWithSave,
            resetFields: form.resetFields,
          };
          onSubmit(values, otherProps);
        })
        .catch(err => console.error('rejected', err));
    };

    rendContent() {
      const { visible } = this.state;
      const { loading, form, formFieldsMap, type } = this.props;
      return (
        <Fragment>
          <Spin spinning={loading || !visible}>
            <EditForm formFieldsMap={formFieldsMap} form={form} type={type} />
            <div style={{ height: '108px' }} />
          </Spin>
          <div
            className="btn-group"
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
              zIndex: 10,
            }}
          >
            <Button onClick={() => this.hide()}>取消</Button>
            {type === 'add' && continueWithSave && (
              <Button
                loading={loading}
                onClick={() => this.handleOk(continueWithSave)}
                type="primary"
              >
                保存并继续添加
              </Button>
            )}
            <Button loading={loading} onClick={() => this.handleOk()} type="primary">
              确定
            </Button>
          </div>
        </Fragment>
      );
    }
  }

  BaseEditFormWrapper.propTypes = {
    type: PropTypes.oneOf(['add', 'edit', 'detail']).isRequired,
    onSubmit: PropTypes.func,
    onLoadDetail: PropTypes.func,
    loading: PropTypes.bool,
    isLoadDetail: PropTypes.bool,
    record: PropTypes.object,
    formFieldsMap: PropTypes.object,
    topTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    continueWithSave: PropTypes.bool,
  };

  BaseEditFormWrapper.defaultProps = {
    onSubmit: () => {},
    onLoadDetail: () => {},
    isLoadDetail: false,
    loading: false,
    record: {},
    formFieldsMap: {},
    topTitle: 'xx',
    continueWithSave,
  };
  Object.keys(methodMix).forEach(method => {
    BaseEditFormWrapper.prototype[method] = methodMix[method];
  });

  return Form.create()(BaseEditFormWrapper);
}

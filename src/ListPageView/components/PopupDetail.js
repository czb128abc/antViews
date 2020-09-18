/* eslint-disable class-methods-use-this */
/* eslint-disable react/sort-comp */
import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Spin, Button } from 'antd';
import { getModalFormTypeTitle, getDrawerConfig, getModalConfig } from '@/utils/processData';
import BaseDrawer from '@/components/base/BaseDrawer';
import BaseModal from '@/components/base/BaseModal';
import EditForm from '@/components/base/BaseEditForm/EditForm';
import Permission from './Permission';

export class BasePopupDetail extends PureComponent {
  // static displayName = 'BasePopupDetail';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  getDefaultConfig(option = {}) {
    const { visible } = this.state;
    const { displayType } = this.props;
    if (displayType !== 'displayTypeDrawer') {
      const modalConfig = {
        visible,
        onOk: () => this.handleOk(),
        onCancel: () => this.hide(),
        ...option,
      };
      return getModalConfig(modalConfig);
    }

    const drawerConfig = {
      visible,
      // onOk: () => this.handleOk(),
      onClose: () => this.hide(),
      ...option,
    };
    return getDrawerConfig(drawerConfig);
  }

  handleOk() {}

  beforeShow() {}

  afterHide() {
    const { form } = this.props;
    form.resetFields();
  }

  show(callback) {
    this.beforeShow();
    this.setState(
      {
        visible: true,
      },
      () => {
        if (callback) {
          callback();
        } else {
          this.afterShow();
        }
      },
    );
  }

  hide() {
    this.setState({
      visible: false,
    });
    this.afterHide();
  }

  rendChildrenView() {
    const { children } = this.props;
    return children;
  }

  getConfig() {
    const { type, topTitle, width } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    const title = topTitle || `${this.props.title} ${getModalFormTypeTitle(type)}`;
    const theConfig = { title };
    if (width) {
      theConfig.width = width;
    }
    return this.getDefaultConfig(theConfig);
  }

  afterShow(props = this.props) {
    const { onLoadDetail, record, isLoadDetail, form, type } = props;
    const callback = (data) => {
      const values = form.getFieldsValue();
      Object.keys(values).forEach((key) => {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(key)) {
          values[key] = data[key];
        }
      });
      console.log('afterShow callback', values, data);
      form.resetFields();
      form.setFieldsValue(values);
    };
    if (type === 'edit' && isLoadDetail && typeof onLoadDetail === 'function') {
      onLoadDetail(record, callback);
    } else {
      setTimeout(() => {
        callback(record);
      }, 100);
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

  getFormFieldsMap() {
    const { formFieldsMap } = this.props;
    return this.formFieldsMap || formFieldsMap;
  }

  handleOk = (continueWithSave) => {
    const { onSubmit, record, type, form } = this.props;
    this.getFormValue()
      .then((values) => {
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
      .catch((err) => console.error('rejected', err));
  };

  rendContent() {
    const { visible } = this.state;
    const { loading, form, type } = this.props;
    const {
      record,
      continueWithSave,
      specificFieldTypeMapping,
      EditForm: DefaultEditForm,
    } = this.props;
    const formFieldsMap = this.getFormFieldsMap();
    return (
      <Fragment>
        <Spin spinning={loading || !visible}>
          <Form>
            <DefaultEditForm
              formFieldsMap={formFieldsMap}
              form={form}
              type={type}
              specificFieldTypeMapping={specificFieldTypeMapping}
              record={record}
            />
          </Form>
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
            <Permission permissionKey="btn_save">
              <Button
                loading={loading}
                onClick={() => this.handleOk(continueWithSave)}
                type="primary"
              >
                保存并继续添加
              </Button>
            </Permission>
          )}
          <Permission permissionKey={type === 'add' ? 'btn_save' : 'btn_edit'}>
            <Button loading={loading} onClick={() => this.handleOk()} type="primary">
              确定
            </Button>
          </Permission>
        </div>
      </Fragment>
    );
  }

  render() {
    const modalConfig = this.getConfig();
    const { displayType, wrapperChildrenStyle } = this.props;
    const { visible } = this.state;
    let BasePop = BaseDrawer;
    if (displayType !== 'displayTypeDrawer') {
      BasePop = BaseModal;
    }
    return (
      <span
        style={wrapperChildrenStyle}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <span onClick={() => this.show()}>{this.rendChildrenView()}</span>
        <BasePop visible={visible} {...modalConfig} content={this.rendContent()} />
      </span>
    );
  }
}

BasePopupDetail.propTypes = {
  type: PropTypes.oneOf(['add', 'edit', 'detail']).isRequired,
  wrapperChildrenStyle: PropTypes.object,
  onSubmit: PropTypes.func,
  onLoadDetail: PropTypes.func,
  loading: PropTypes.bool,
  isLoadDetail: PropTypes.bool,
  record: PropTypes.object,
  formFieldsMap: PropTypes.object,
  topTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  continueWithSave: PropTypes.bool,
  specificFieldTypeMapping: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number]),
  displayType: PropTypes.oneOf(['displayTypeDrawer', 'displayTypeModal']),
  EditForm: PropTypes.func,
};

BasePopupDetail.defaultProps = {
  wrapperChildrenStyle: {},
  onSubmit: () => {},
  onLoadDetail: () => {},
  isLoadDetail: false,
  loading: false,
  record: {},
  formFieldsMap: {},
  topTitle: '',
  continueWithSave: true,
  specificFieldTypeMapping: {},
  width: 800,
  displayType: 'displayTypeDrawer',
  EditForm,
};
export function formCreate(config = {}) {
  return Form.create(config);
}

export default Form.create()(BasePopupDetail);

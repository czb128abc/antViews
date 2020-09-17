/* eslint-disable class-methods-use-this */
/* eslint-disable react/sort-comp */
import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Spin } from 'antd';
import { getModalFormTypeTitle, getDrawerConfig, getModalConfig } from '@/utils/processData';
import BaseDrawer from '@/components/base/BaseDrawer';
import BaseModal from '@/components/base/BaseModal';
import EditForm from '@/components/base/BaseEditForm/EditFormily';

export class PopupDetailWithFormily extends PureComponent {
  // static displayName = 'BasePopupDetail';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.refFormily = React.createRef();
  }

  getDefaultConfig(option = {}) {
    const { visible } = this.state;
    const { displayType } = this.props;
    if (displayType !== 'displayTypeDrawer') {
      const modalConfig = {
        visible,
        onOk: () => this.handleOk(),
        onCancel: () => this.hide(),
        footer: null,
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
    const formily = this.refFormily.current;
    formily.getAction().reset();
    formily.getAction().clearErrors();
    console.log('afterShow -> formily', formily);
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
    const { onLoadDetail, record, isLoadDetail, type } = props;

    const callback = (data) => {
      const formily = this.refFormily.current;
      console.log('afterShow -> formily', formily);
      if (!formily) {
        return;
      }
      const values = formily.getInitialValues();
      const newObj = {};
      Object.keys(values).forEach((key) => {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(key)) {
          newObj[key] = data[key];
        }
      });
      console.log('afterShow callback', newObj, data);

      formily.getAction().setFormState((state) => {
        // eslint-disable-next-line no-param-reassign
        state.values = newObj;
        // eslint-disable-next-line no-param-reassign
        state.initialValues = values;
        // eslint-disable-next-line no-param-reassign
        state.errors = [];
        // eslint-disable-next-line no-param-reassign
        state.valid = true;
      });
      setTimeout(() => {
        formily.getAction().clearErrors();
      }, 100);
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

  handleOk = (values, resetFields) => {
    const { onSubmit, record, type, continueWithSave } = this.props;
    const otherProps = {
      record,
      type,
      hide: () => {
        this.hide();
      },
      continueWithSave,
      resetFields,
    };
    onSubmit(values, otherProps);
  };

  rendContent() {
    const { visible } = this.state;
    const { loading, form, type, formilyEffects } = this.props;
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
          <Form />
          <DefaultEditForm
            formFieldsMap={formFieldsMap}
            form={form}
            type={type}
            onSubmit={this.handleOk}
            onCancle={() => this.hide()}
            specificFieldTypeMapping={specificFieldTypeMapping}
            record={record}
            continueWithSave={continueWithSave}
            loading={loading}
            ref={this.refFormily}
            formilyEffects={formilyEffects}
          />
        </Spin>
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

PopupDetailWithFormily.propTypes = {
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

PopupDetailWithFormily.defaultProps = {
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

export default Form.create()(PopupDetailWithFormily);

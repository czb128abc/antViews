/* eslint-disable class-methods-use-this */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { getModalConfig } from '@/utils/processData';

export default class BaseModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  getDefaultConfig(option = {}) {
    const { visible } = this.state;
    const config = {
      visible,
      onOk: () => this.handleOk(),
      onCancel: () => this.hide(),
      ...option,
    };
    return getModalConfig(config);
  }

  getConfig() {
    return this.getDefaultConfig();
  }

  handleOk() {}

  afterShow() {}

  beforeShow() {}

  afterHide() {}

  show() {
    this.beforeShow();
    this.setState(
      {
        visible: true,
      },
      () => {
        this.afterShow();
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

  /**
   * TODO for 继承后重写该方法
   */
  rendContent() {
    const { visible } = this.state;
    const { content } = this.props;
    if (!visible) {
      return null;
    }
    return content;
  }

  render() {
    const modalConfig = this.getConfig();
    const { children, content, ...otherProps } = this.props;
    return (
      <span
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span onClick={() => this.show()}>{this.rendChildrenView()}</span>
        <Modal {...modalConfig} {...otherProps}>
          {content || this.rendContent()}
        </Modal>
      </span>
    );
  }
}

BaseModal.propTypes = {
  content: PropTypes.any,
};

BaseModal.defaultProps = {
  content: null,
};

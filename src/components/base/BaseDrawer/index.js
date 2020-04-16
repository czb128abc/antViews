/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import { getDrawerConfig } from '@/utils/processData';

export default class BaseDrawer extends React.PureComponent {
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
      onClose: () => this.hide(),
      ...option,
    };
    return getDrawerConfig(config);
  }

  getConfig() {
    return this.getDefaultConfig();
  }

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
    const DrawerConfig = this.getConfig();
    const { children, content, ...otherProps } = this.props;
    return (
      <span
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <span
          onClick={() => {
            this.show();
          }}
        >
          {this.rendChildrenView()}
        </span>
        <Drawer {...DrawerConfig} {...otherProps}>
          {content}
          {this.rendContent()}
        </Drawer>
      </span>
    );
  }
}

BaseDrawer.propTypes = {
  content: PropTypes.any,
};

BaseDrawer.defaultProps = {
  content: <span />,
};

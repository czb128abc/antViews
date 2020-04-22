/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Layout, Spin, Icon } from 'antd';
import classNames from 'classnames';
import './index.less';

const { Content, Sider } = Layout;

export default class LeftRightLayout extends PureComponent {
  state = {
    collapsed: false,
  };

  getCollapsedConfig() {
    const hasKeyCollapsedInProps = this.hasKeyCollapsedInProps();
    if (hasKeyCollapsedInProps) {
      return {
        collapsed: this.props.collapsed,
        trigger: null,
      };
    }
    return {
      collapsed: this.state.collapsed,
      trigger: null,
      onCollapse: this.handleCollapse,
    };
  }

  handleCollapse = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  };

  hasKeyCollapsedInProps() {
    const { ownCollapsed = true } = this.props;
    const hasKeyCollapsedInProps = !ownCollapsed;
    return hasKeyCollapsedInProps;
  }

  rendTrigger(isLeft) {
    return (
      <div className={`${isLeft ? 'left' : 'right'}-trigger-container trigger-container`}>
        <Icon
          onClick={this.handleCollapse}
          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
        />
      </div>
    );
  }

  renderLeftView() {
    const { leftContentLoading: spinning, leftContent } = this.props;
    return (
      <div className="content-container">
        <Spin spinning={spinning}>{leftContent}</Spin>
      </div>
    );
  }

  renderRightView() {
    const { rightContentLoading: spinning, rightContent } = this.props;
    return (
      <div className="content-container">
        <Spin spinning={spinning}>{rightContent}</Spin>
      </div>
    );
  }

  renderLeftContent() {
    const { leftFixed, fixedMinWidth, fixedMaxWidth } = this.props;
    if (leftFixed) {
      return (
        <Sider
          collapsible
          {...this.getCollapsedConfig()}
          theme="light"
          collapsedWidth={fixedMinWidth}
          width={fixedMaxWidth}
        >
          <div>
            {!this.hasKeyCollapsedInProps() && this.rendTrigger(true)}
            {this.renderLeftView()}
          </div>
        </Sider>
      );
    }
    return (
      <Content>
        <div>{this.renderLeftView()}</div>
      </Content>
    );
  }

  renderRightContent() {
    const { leftFixed, fixedMinWidth, fixedMaxWidth } = this.props;
    if (!leftFixed) {
      return (
        <Sider
          collapsible
          reverseArrow
          {...this.getCollapsedConfig()}
          theme="light"
          collapsedWidth={fixedMinWidth}
          width={fixedMaxWidth}
        >
          <div>
            {!this.hasKeyCollapsedInProps() && this.rendTrigger(false)}
            {this.renderRightView()}
          </div>
        </Sider>
      );
    }
    return (
      <Content>
        <div>{this.renderRightView()}</div>
      </Content>
    );
  }

  render() {
    const {
      hasDivider,
      hasTopBorder,
      leftHasWhiteBackground,
      rightHasWhiteBackground,
      leftFixed,
    } = this.props;
    const containerClass = classNames({
      'left-right-layout-container': true,
      'left-divider': hasDivider,
      'right-divider': hasDivider,
      'top-border': hasTopBorder,
      'left-white-background': leftHasWhiteBackground,
      'right-white-background': rightHasWhiteBackground,
      'left-fixed': leftFixed,
      'right-fixed': !leftFixed,
    });
    return (
      <Layout className={containerClass}>
        {this.renderLeftContent()}
        {this.renderRightContent()}
      </Layout>
    );
  }
}

LeftRightLayout.propTypes = {
  fixedMinWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fixedMaxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  collapsed: PropTypes.bool,
  leftFixed: PropTypes.bool,
  leftContentLoading: PropTypes.bool,
  rightContentLoading: PropTypes.bool,
  hasDivider: PropTypes.bool,
  hasTopBorder: PropTypes.bool,
  leftHasWhiteBackground: PropTypes.bool,
  rightHasWhiteBackground: PropTypes.bool,
  leftContent: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.string])
    .isRequired,
  rightContent: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.string])
    .isRequired,
};

LeftRightLayout.defaultProps = {
  fixedMinWidth: 150,
  fixedMaxWidth: 480,
  leftFixed: true,
  leftContentLoading: false,
  rightContentLoading: false,
  collapsed: false,
  hasDivider: true,
  hasTopBorder: false,
  leftHasWhiteBackground: true,
  rightHasWhiteBackground: true,
};

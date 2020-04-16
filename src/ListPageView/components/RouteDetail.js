import React from 'react';
import { Card, Modal } from 'antd';
import { history } from 'umi';
import { formCreate, BasePopupDetail } from './PopupDetail';

/**
 * 路由方式展示的 编辑详情
 */
class RouteDetail extends BasePopupDetail {
  componentDidMount() {
    const { type, record, match } = this.props;

    if (type === 'edit' && Object.keys(record).length === 0) {
      const path = match.url.replace('/edit', '/:listPage');
      Modal.destroyAll();
      Modal.warn({
        content: '获取编辑数据错误',
        okText: '返回列表页面',
        onOk: () => history.push(path),
      });

      return;
    }
    this.show();
  }

  componentWillReceiveProps(nextProps) {
    const { record, form } = this.props;
    if (record !== nextProps.record) {
      form.resetFields();
      this.afterShow(nextProps);
    }
  }

  getReturnPath() {
    const { type, match } = this.props;
    if (type === 'edit') {
      const path = match.path.replace('/edit__:id', '/:listPage');
      return path;
    }
    const path = match.path.replace('/add__:id', '/:listPage');
    return path;
  }

  // eslint-disable-next-line class-methods-use-this
  afterHide() {
    history.goBack();
    history.push(this.getReturnPath());
  }

  render() {
    const { title } = this.getConfig();
    const { style = {} } = this.props;
    return (
      <Card title={`${title}`} style={style} bordered={false}>
        {this.rendContent()}
        <div className="holder-spacing" />
        <div className="holder-spacing" />
        <div className="holder-spacing" />
      </Card>
    );
  }
}
export default formCreate()(RouteDetail);

import React from 'react';
// import PropTypes from 'prop-types';
import { Avatar, Upload, Button, Modal, Tooltip, message } from 'antd';

const centerStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center' };

const sizeMap = {
  base: 64,
  sl: 32,
  lg: 128,
  xl: 256,
};

export default class HeadPicFormItem extends React.Component {
  state = {
    loading: false,
    previewVisible: false,
  };

  handleChange = (info) => {
    const { onChange } = this.props;
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        loading: false,
      });
      if (info.file.response.success) {
        const url = info.file.response.data;
        onChange(url);
      } else {
        message.error(`上传错误:${info.file.response.message}`);
      }
    }
  };

  renderAvatarView() {
    const { previewVisible } = this.state;
    const { value = '', size = 'xl' } = this.props;
    const headPic = value;
    return (
      <div style={centerStyle}>
        {!headPic && <Avatar shape="square" size={sizeMap[size]} icon="user" src={headPic} />}
        {!!headPic && (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => this.setState({ previewVisible: true })}
          >
            <Tooltip title="点击查看">
              <Avatar shape="square" size={sizeMap[size]} icon="user" src={headPic} />
            </Tooltip>
          </div>
        )}
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={() => this.setState({ previewVisible: false })}
        >
          <img alt=" 头像" style={{ width: '100%' }} src={value} />
        </Modal>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    const { value = '', display = false } = this.props;
    const headPic = value;
    if (display) {
      return this.renderAvatarView();
    }
    return (
      <div>
        {this.renderAvatarView()}
        <div className="text-center">
          <div>
            <Upload
              onChange={this.handleChange}
              action="/api-comm/file/uploadHeadImg"
              showUploadList={false}
            >
              <Button loading={loading} icon="upload" type="dashed" size="small">
                {headPic ? '重新上传' : '上传'}
              </Button>
            </Upload>
          </div>
        </div>
      </div>
    );
  }
}

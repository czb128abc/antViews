import * as React from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Input, Icon, Tooltip, List, Popover, Modal, message } from 'antd';
import { IconBtn, IconBtnGroup } from '@/utils/processRenderData';
import { notEmptyArray, strFormat } from '@/utils/processData';
import { isMatchCardIdLen, isLetterOrNumber } from './const';

const defaultConfig = {
  getValueFromPropsBefore(value, fieldKey) {
    const defaultList = [];
    if (notEmptyArray(value)) {
      return value.map(item => {
        return {
          [`${fieldKey}`]: item,
        };
      });
    }
    return defaultList;
  },
  onChangeBefore(value, fieldKey) {
    const defaultList = [];
    if (notEmptyArray(value)) {
      return value.map(item => item[fieldKey]);
    }
    return defaultList;
  },
  fieldKey: 'text',
  title: 'ic卡',
  cardIdLength: 10,
  limitNumber: 50,
};

class BatchEquipmentEntryList extends React.PureComponent {
  static propTypes = {
    getValueFromPropsBefore: PropTypes.func,
    onChangeBefore: PropTypes.func,
    fieldKey: PropTypes.string,
    cardIdLength: PropTypes.number,
    limitNumber: PropTypes.number,
  };

  static defaultProps = {
    ...defaultConfig,
  };

  state = {
    inputValue: '',
    visibleForModal: false,
    valueForModal: '',
    selectIndex: -1,
  };

  getValueFromPops() {
    const { getValueFromPropsBefore, value, fieldKey } = this.props;
    return getValueFromPropsBefore(value, fieldKey);
  }

  handleChange = value => {
    const { onChangeBefore, onChange, fieldKey } = this.props;
    onChange(onChangeBefore(value, fieldKey));
  };

  add = (value = '') => {
    if (this.checkErrorByInputValue(value, true, true, -1)) {
      return false;
    }
    const rows = this.getValueFromPops();
    const { fieldKey } = this.props;
    const obj = {
      [fieldKey]: value,
    };
    rows.push(obj);
    this.handleChange(rows);
    return true;
  };

  remove = index => {
    const rows = this.getValueFromPops();
    this.handleChange(rows.filter((_, i) => i !== index));
  };

  update = (index, value) => {
    if (this.checkErrorByInputValue(value, true, true, index)) {
      return false;
    }
    const { fieldKey } = this.props;
    const rows = this.getValueFromPops();
    rows[index] = {
      [`${fieldKey}`]: value,
    };
    this.handleChange(rows);
    return true;
  };

  handleChangeInModal = e => {
    this.setState({ valueForModal: e.target.value });
  };

  handleInputValueChange = e => {
    const inputValue = `${e.target.value}`.trim();
    const isError = this.checkErrorByInputValue(inputValue);
    this.setState({ inputValue }, () => {
      if (!isError) {
        this.handleInputValuePressEnter();
      }
    });
  };

  handleInputValuePressEnter = () => {
    const { inputValue } = this.state;
    const result = this.add(inputValue);
    if (result) {
      this.setState({ inputValue: '' });
    }
  };

  handleModalOk = () => {
    const { selectIndex, valueForModal } = this.state;
    const result = this.update(selectIndex, valueForModal);
    if (result) {
      this.setState({ visibleForModal: false });
    }
  };

  handleModalCancel = () => {
    this.setState({ visibleForModal: false, valueForModal: '', selectIndex: -1 });
  };

  checkErrorByInputValue(value, isShowError = false, isCheckDuplicate = false, updateIndex = -1) {
    let isError = false;
    let content = '';
    const { cardIdLength } = this.props;
    if (!isMatchCardIdLen(value, cardIdLength)) {
      content = `格式错误: 卡位数应为:${cardIdLength}`;
      isError = true;
    }

    if (!isLetterOrNumber.pattern.test(value)) {
      content = isLetterOrNumber.message;
      isError = true;
    }

    if (isShowError) {
      if (isError) {
        message.error({ content });
      } else if (isCheckDuplicate) {
        const list = this.getValueFromPops();
        const { fieldKey } = this.props;
        const findIndex = list.findIndex((item, index) => {
          const str = item[fieldKey];
          if (updateIndex > -1) {
            if (updateIndex !== index && value === str) {
              return true;
            }
          } else if (value === str) {
            return true;
          }
          return false;
        });
        if (findIndex > -1) {
          const item = list[findIndex];
          content = `存在重复项    ${item[fieldKey]}   ,于第${findIndex + 1}条`;
          message.destroy();
          message.error({ content, duration: 5 });
          isError = true;
        }
      }
    }

    return isError;
  }

  showModal(valueForModal = '', selectIndex) {
    this.setState({ visibleForModal: true, valueForModal, selectIndex });
  }

  rendFooter() {
    const { inputValue, visibleForModal, valueForModal, selectIndex } = this.state;
    const { cardIdLength } = this.props;
    return (
      <div className="mt_16">
        <Input
          size="large"
          prefix={<Icon type="credit-card" />}
          value={inputValue}
          onChange={this.handleInputValueChange}
          allowClear
          onPressEnter={this.handleInputValuePressEnter}
          maxLength={cardIdLength}
          suffix={
            <Tooltip title={`按下回车键可添加到列表 (字段长度: ${cardIdLength})`}>
              <Icon type="enter" />
            </Tooltip>
          }
        />
        <Modal
          title={`正在编辑第${selectIndex + 1}项`}
          visible={visibleForModal}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
          maskClosable={false}
        >
          <Input
            value={valueForModal}
            maxLength={cardIdLength}
            onChange={this.handleChangeInModal}
            allowClear
          />
        </Modal>
      </div>
    );
  }

  render() {
    const list = this.getValueFromPops();
    const len = list.length;
    const { fieldKey, title, cardIdLength, limitNumber } = this.props;
    return (
      <div>
        <List
          header={<span>{`已添加 ${len} 张${title}`}</span>}
          bordered
          locale={{ emptyText: `暂无数据,请录入${title}, 长度为${cardIdLength}` }}
          dataSource={list.map((item, index) => ({ ...item, index }))}
          renderItem={item => (
            <List.Item
              extra={
                <div>
                  <CopyToClipboard
                    text={`${item[fieldKey]}`}
                    onCopy={() => message.success('复制成功')}
                  >
                    <IconBtn iconType="copy" text="复制" />
                  </CopyToClipboard>

                  <span className="mr_16" />
                  <IconBtnGroup>
                    <IconBtn
                      iconType="delete"
                      text="移除该项"
                      onClick={() => this.remove(item.index)}
                    />
                  </IconBtnGroup>
                  <span className="mr_16" />
                  <IconBtnGroup>
                    <IconBtn
                      iconType="form"
                      text="编辑"
                      onClick={() => this.showModal(item[fieldKey], item.index)}
                    />
                  </IconBtnGroup>
                </div>
              }
            >
              <span>{`${item.index + 1}`.padStart(2, '0')}</span>
              <Popover
                placement="left"
                content={
                  <span style={{ fontSize: '2em' }}>{strFormat(item[fieldKey], 4, ' ')}</span>
                }
              >
                <span>{strFormat(item[fieldKey], 4, ' ')}</span>
              </Popover>
            </List.Item>
          )}
        />

        {len < limitNumber ? (
          this.rendFooter()
        ) : (
          <div className="mt_16 text-center">
            最多批量录入{limitNumber}张{title}
          </div>
        )}
      </div>
    );
  }
}

export default BatchEquipmentEntryList;

/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button } from 'antd';
import { notEmptyArray } from '@/utils/processData';
// import debounce from 'lodash/throttle';

class InputList extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.handleChange = debounce(this.handleChange, 5000);
  // }

  getValueFromPops() {
    const { getValueFromPropsBefore, value, fieldKey } = this.props;
    return getValueFromPropsBefore(value, fieldKey);
  }

  handleChange = value => {
    const { onChangeBefore, onChange, fieldKey } = this.props;
    onChange(onChangeBefore(value, fieldKey));
  };

  add = () => {
    const rows = this.getValueFromPops();
    const { fieldKey } = this.props;
    const obj = {
      [fieldKey]: '',
    };
    rows.push(obj);
    this.handleChange(rows);
  };

  remove = index => {
    const rows = this.getValueFromPops();
    this.handleChange(rows.filter((_, i) => i !== index));
  };

  update = (index, value) => {
    const { fieldKey } = this.props;
    const rows = this.getValueFromPops();
    rows[index] = {
      [`${fieldKey}`]: value,
    };
    this.handleChange(rows);
  };

  render() {
    const list = this.getValueFromPops();
    const len = list.length;
    const { fieldKey, textAddBtn } = this.props;

    return (
      <div>
        {list.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === len - 1;
          const value = (item && item[fieldKey]) || '';
          return (
            <div style={{ display: 'inline-block', margin: '0 8px' }} key={`${fieldKey}_${index}`}>
              <Input
                key={`${index}__${item}`}
                value={value}
                onChange={e => this.update(index, e.target.value, e)}
                style={{ width: '150px' }}
              />
              {!isFirst && (
                <Icon
                  type="minus-circle"
                  title="移除"
                  style={{ padding: '0 8px 0 4px' }}
                  onClick={() => this.remove(index)}
                />
              )}
              {(len === 0 || isLast) && (
                <Button
                  type="dashed"
                  style={{ marginLeft: 8 }}
                  onClick={() => this.add()}
                  icon="plus"
                >
                  {textAddBtn}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

const defaultConfig = {
  getValueFromPropsBefore(value, fieldKey) {
    const defaultList = [[{ [`${fieldKey}`]: '' }]];
    if (notEmptyArray(value)) {
      return value;
    }
    return defaultList;
  },
  onChangeBefore(value, fieldKey) {
    const defaultList = [[{ [`${fieldKey}`]: '' }]];
    if (notEmptyArray(value)) {
      return value;
    }
    return defaultList;
  },
  fieldKey: 'text',
  textAddBtn: '添加',
};

InputList.propTypes = {
  getValueFromPropsBefore: PropTypes.func,
  onChangeBefore: PropTypes.func,
  fieldKey: PropTypes.string,
};

InputList.defaultProps = {
  ...defaultConfig,
};

export default InputList;

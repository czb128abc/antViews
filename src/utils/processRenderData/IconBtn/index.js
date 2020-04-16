import React from 'react';
import { Icon, Popconfirm, Tooltip } from 'antd';
import styles from './index.less';

export const IconBtn = ({
  iconType = 'close',
  text = '关闭',
  onClick = () => {},
  hasConfirm = false,
  // textInLine = false,
  popconfirmProps = {},
  iconStyle = {},
  style = {},
  // textStyle = {},
}) => {
  if (hasConfirm) {
    return (
      <span className={styles.IconBtn} style={style}>
        <Popconfirm
          okText="是"
          cancelText="否"
          placement="bottomRight"
          title={`确定 ${text} ? `}
          {...popconfirmProps}
          onConfirm={e => onClick(e)}
        >
          <Tooltip title={text}>
            <Icon type={iconType} style={iconStyle} className={styles.iconStyle} />
          </Tooltip>
        </Popconfirm>
      </span>
    );
  }
  return (
    <span
      className={styles.IconBtn}
      onClick={e => {
        onClick(e);
      }}
      style={style}
    >
      <Tooltip title={text}>
        <Icon type={iconType} style={iconStyle} className={styles.iconStyle} />
      </Tooltip>
    </span>
  );
};

export const IconBtnGroup = ({ children, className = 'text-only-hover__child' }) => (
  <span className={`${styles.IconBtnGroup} ${className}`}>{children}</span>
);

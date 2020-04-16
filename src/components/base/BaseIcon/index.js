import React from 'react';
import { Icon } from 'antd';

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1019463_ob1zwcuv8i.js', // 在 iconfont.cn 上生成
});

/*
https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.db775f1f3&manage_type=myprojects
const typeList = [];
document.querySelectorAll('.icon-code-show',$0).forEach(item=>typeList.push(item.textContent))
JSON.stringify(typeList);

 */
const typeList = [
  'icon-Select',
  'icon-textarea',
  'icon-group',
  'icon-radio',
  'icon-checkboxactive',
  'icon-daterange',
  'icon-date',
  'icon-input',
];
const BaseIcon = ({ type, ...other }) => {
  if (typeList.includes(type)) {
    return <MyIcon type={type} {...other} />;
  }
  return <Icon type={type} {...other} />;
};

export default BaseIcon;

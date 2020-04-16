/* eslint-disable import/prefer-default-export */
import { randomNum, newArray, newMoment, momentFormat, randomItem } from '../../util';
import {keyMapWarnRules, enumWarnRulesStatus, enumWarnRulesLevel } from '../../enum/monitoringPlatform'

export const keyMap = keyMapWarnRules;

const statusList = Object.keys(enumWarnRulesStatus);
const levelList = Object.keys(enumWarnRulesLevel);

const num = randomNum(100, 200);
export const list = newArray(num).map(i => {
  const obj = {};
  obj[`${keyMap.get('编号')}`] = `${i}`;
  obj[`${keyMap.get('规则名称')}`] = `规则名称${i}`;
  obj[`${keyMap.get('紧急级别')}`] = randomItem(levelList);
  obj[`${keyMap.get('预警状态')}`] = randomItem(statusList);
  obj[`${keyMap.get('创建时间')}`] = newMoment().format(momentFormat.dateTimeFormat);
  return obj;
});

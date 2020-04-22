/* eslint-disable import/prefer-default-export */
import { randomNum, newArray, newMoment, momentFormat, randomItem } from '../../util';
import {
  enumWarnRulesLevel,
  enumWarnRulesStatus,
  enumWarnRulesUnit,
} from '../../enum/monitoringPlatform';

export const keyMap = new Map([
  ['编号', 'id'],
  ['规则名称', 'monitorName'],
  ['正常阙值to', 'normalValueFrom'],
  ['正常阙值from', 'normalValueTo'],
  ['单位', 'unit'],
  ['预警状态', 'status'],
  ['紧急级别', 'level'],
  ['备注', 'remark'],
  ['创建时间', 'createDate'],
]);

const unitList = Object.keys(enumWarnRulesUnit);
const statusList = Object.keys(enumWarnRulesStatus);
const levelList = Object.keys(enumWarnRulesLevel);

const num = randomNum(3, 8);
export const list = newArray(num).map(i => {
  const obj = {};
  obj[`${keyMap.get('编号')}`] = `${i}`;
  obj[`${keyMap.get('规则名称')}`] = `监控名称${i}`;
  obj[`${keyMap.get('正常阙值to')}`] = `正常阙值to${i}`;
  obj[`${keyMap.get('正常阙值from')}`] = `正常阙值from${i}`;
  obj[`${keyMap.get('单位')}`] = randomItem(unitList);
  obj[`${keyMap.get('预警状态')}`] = randomItem(statusList);
  obj[`${keyMap.get('紧急级别')}`] = randomItem(levelList);
  obj[`${keyMap.get('备注')}`] = `备注${i}`;
  obj[`${keyMap.get('创建时间')}`] = newMoment().format(momentFormat.dateTimeFormat);
  return obj;
});

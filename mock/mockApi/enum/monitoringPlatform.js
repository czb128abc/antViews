/* eslint-disable import/no-unresolved */
// export {
//   keyMapDept,
//   keyMapRole,
//   keyMapUser,
//   keyMapUserGroup,
//   keyMapUserRoleLink,
//   keyMapUserUserGroupLink,
// } from './backstageMgt';

export * from './backstageMgt';
export * from './modelEmum';
export * from './optionEmum';
/**
 * keyMap 部分
 */

export const keyMapStation = new Map([
  ['编号', 'id'],
  ['站点名称', 'stationName'],
  ['地址', 'address'],
  ['详细地址', 'addressDetail'],
  ['描述', 'remark'],
  ['状态', 'status'],
  ['异常状态', 'abnormalType'],
  ['创建时间', 'createDate'],
]);

export const keyMapStationPosition = new Map([
  ['编号', 'id'],
  ['站点编号', 'stationId'],
  ['点位名称', 'stationPositionName'],
  ['点位地址', 'address'],
  ['监控项名', 'monitorName'],
  ['设备编号', 'equipmentId'],
  ['状态', 'status'],
  ['异常状态', 'abnormalType'],
  ['创建时间', 'createDate'],
]);

/*
{
  "stationId": "2",//站点ID
  "stationPositionName": "世纪城站点点位1",//点位名称
  "status": "1",//状态
  "address": "世纪城站点点位1世纪城站点点位1",//地址
  "positionMonitor": [
      {
          "stationId": "2",//站点ID
          "stationName": "世纪城站点",//站点名称
          "stationPositionName": "世纪城站点点位1",//点位名称
          "equipmentId": "A0001",//设备编号
          "monitorId": "1",//监控项ID
          "monitorName": "电压监控",//监控项名称
          "normalValueFrom": "10",//阙值from
          "normalValueTo": "15",//阙值to
          "unit": "2",//单位
          "level": "1"//故障级别
      },
      {
          "stationId": "2",
          "stationName": "世纪城站点",
          "stationPositionName": "世纪城站点点位1",
          "equipmentId": "A0001",
          "monitorId": "2",
          "monitorName": "温度监控",
          "normalValueFrom": "15",
          "normalValueTo": "20",
          "unit": "4",
          "level": "1"
      }
  ]
}
*/
export const keyMapMonitor = new Map([
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

/**
 * "warnRuleName": "电压谐波预警",//预警规则名称
    "level": "1", //预警规则等级
    "status": "1",//预警规则状态
    "warnRulesMonitorList":[//预警规则监控项
 */
export const keyMapWarnRules = new Map([
  ['编号', 'id'],
  ['规则名称', 'warnRuleName'],
  ['预警状态', 'status'],
  ['紧急级别', 'level'],
  ['创建时间', 'createDate'],
]);

/**
 * 枚举
 */
export const enumStationStatus = {
  1: { value: '1', title: '待上线' },
  2: { value: '2', title: '正常' },
  3: { value: '3', title: '故障' },
  4: { value: '4', title: '离线' },
  5: { value: '5', title: '预警' },
};
// 站点类型
export const enumStationType = {
  1: { value: '1', title: '停车站点' },
  2: { value: '2', title: '充电站点' },
};

export const enumStationPositionStatus = {
  1: { value: '1', title: '待上线' },
  2: { value: '2', title: '正常' },
  3: { value: '3', title: '故障' },
  4: { value: '4', title: '离线' },
  5: { value: '5', title: '预警' },
};

export const enumWarnRulesStatus = {
  1: { value: '1', title: '正常' },
  2: { value: '2', title: '停用' },
};

export const enumWarnRulesLevel = {
  1: { value: '1', title: '初级' },
  2: { value: '2', title: '中级' },
  3: { value: '3', title: '高级' },
};

export const enumWarnRulesUnit = {
  1: { value: '1', title: 'va' },
  2: { value: '2', title: 'vb' },
  3: { value: '3', title: 'vc' },
  4: { value: '4', title: 'v' },
  5: { value: '5', title: 'ia' },
  6: { value: '6', title: 'ib' },
  7: { value: '7', title: 'ic' },
  8: { value: '8', title: 'i' },
  9: { value: '9', title: 'pa' },
  10: { value: '10', title: 'pb' },
  11: { value: '11', title: 'pc' },
  12: { value: '12', title: 'pt' },
  14: { value: '14', title: 'ept' },
  15: { value: '15', title: 'temperature' },
};

export const enumMonitorLevel = {
  1: { value: '1', title: '初级' },
  2: { value: '2', title: '中级' },
  3: { value: '3', title: '高级' },
};

export const enumMonitorUnit = enumWarnRulesUnit;

export const enumAbnormalType = {
  1: { value: '1', title: 'va异常' },
  2: { value: '2', title: 'vb异常' },
  3: { value: '3', title: 'vc异常' },
  4: { value: '4', title: 'v异常' },
  5: { value: '5', title: 'ia异常' },
  6: { value: '6', title: 'ib异常' },
  7: { value: '7', title: 'ic异常' },
  8: { value: '8', title: 'i异常' },
  9: { value: '9', title: 'pa异常' },
  10: { value: '10', title: 'pb异常' },
  11: { value: '11', title: 'pc异常' },
  12: { value: '12', title: 'pt异常' },
  13: { value: '13', title: '离线' },
};

export const enumBaseDataStatus = {
  1: { value: '1', title: '正常' },
  2: { value: '2', title: '异常' },
  3: { value: '3', title: '故障' },
};

export function getEnumTitle(value, enumObj) {
  if (!value) {
    return '';
  }
  // eslint-disable-next-line no-prototype-builtins
  if (!enumObj.hasOwnProperty(value)) {
    console.log(enumObj, `enumObj: has no prop ${value}`);
    return `${value}`;
  }
  return enumObj[value].title;
}

import { randomNum, newArray, newMoment, momentFormat, randomItem } from '../../util';
import { enumStationPositionStatus, keyMapStationPosition } from '../../enum/monitoringPlatform';

export const keyMap = keyMapStationPosition;

const monitorNameList = ['电压监控1', '电压监控2', '电压监控3'];

/**
 * {
  "id": "1",
  "stationPositionName": "世纪城站点点位1",
  "status": "待上线",
  "createDate": "2019-01-12 08:08",
  "address": "世纪城站点点位1世纪城站点点位1",
  "monitorName": "电压监控",
  "equipmentId": "A0001"
}
 */
const statusList = Object.keys(enumStationPositionStatus);

const num = randomNum(100, 200);
export const list = newArray(num).map(i => {
  const obj = {};
  obj[`${keyMap.get('编号')}`] = `stationPosition_${i}`;
  obj[`${keyMap.get('站点编号')}`] = `station_${randomNum(5, 10)}`;
  obj[`${keyMap.get('点位名称')}`] = `点位名称${i}`;
  obj[`${keyMap.get('点位地址')}`] = `世纪城站点点位1世纪城站点点位1${i}`;
  obj[`${keyMap.get('监控项名')}`] = randomItem(monitorNameList);
  obj[`${keyMap.get('设备编号')}`] = `A0001_${i}`;
  obj[`${keyMap.get('状态')}`] = randomItem(statusList);
  obj[`${keyMap.get('创建时间')}`] = newMoment().format(momentFormat.dateTimeFormat);
  obj[`${keyMap.get('异常状态')}`] = obj[`${keyMap.get('状态')}`];
  return obj;
});

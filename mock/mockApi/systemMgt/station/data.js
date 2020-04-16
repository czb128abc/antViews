import { newArray, newMoment, momentFormat, randomItem } from '../../util';
import { keyMapStation, enumStationStatus } from '../../enum/monitoringPlatform';

export const keyMap = keyMapStation;
const statusList = [...Object.keys(enumStationStatus)];

const num = 19;
export const list = newArray(num).map(i => {
  const obj = {
    location: '104.009693,30.650262',
  };
  obj[`${keyMap.get('编号')}`] = `station_${i}`;
  obj[`${keyMap.get('站点名称')}`] = `银泰城站点${i}`;
  obj[`${keyMap.get('地址')}`] = `银泰城站点地址${i}`;
  obj[`${keyMap.get('详细地址')}`] = `银泰城站点详细地址天府四街XX号${i}`;
  obj[`${keyMap.get('描述')}`] = `描述${i}`;
  obj[`${keyMap.get('状态')}`] = randomItem(statusList);
  obj[`${keyMap.get('创建时间')}`] = newMoment().format(momentFormat.dateTimeFormat);
  obj[`${keyMap.get('异常状态')}`] = obj[`${keyMap.get('状态')}`];
  return obj;
});

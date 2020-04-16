import { newArray, newMoment, momentFormat } from '../../../util';
import { keyMapStationPosition } from '../../../enum/monitoringPlatform';

export const keyMap = keyMapStationPosition;

const num = 19;
export const list = newArray(num).map(i => {
  const obj = {
    id: '9b410351930d4a1e8659509bb7ac32fb',
    stationPositionId: '平台用户组2',
    stationPositionName: '2',
    address: '2019-06-01 21:30:35',
    queryDate: '2019-07-16',
    power: '220', // 功率
    powerTime: '4', // 节能时间（小时）
    wkh: '10', // 当日节省（kw/h）
  };
  obj.queryDate = newMoment()
    .subtract(i + 1, 'days')
    .format(momentFormat.dateFormat);
  // obj[`${keyMap.get('编号')}`] = `station_${i}`;
  // obj[`${keyMap.get('站点名称')}`] = `银泰城站点${i}`;
  // obj[`${keyMap.get('地址')}`] = `银泰城站点地址${i}`;
  // obj[`${keyMap.get('详细地址')}`] = `银泰城站点详细地址天府四街XX号${i}`;
  // obj[`${keyMap.get('描述')}`] = `描述${i}`;
  // obj[`${keyMap.get('状态')}`] = randomItem(statusList);
  // obj[`${keyMap.get('创建时间')}`] = newMoment().format(momentFormat.dateTimeFormat);
  // obj[`${keyMap.get('异常状态')}`] = obj[`${keyMap.get('状态')}`];
  return obj;
});

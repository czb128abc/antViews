import { keyMapOrganization } from '../../../enum/monitoringPlatform';
import { newArray } from '../../../util';

export const keyMap = keyMapOrganization;

export const list = newArray(20).map(index => ({
  id: `1${index}`,
  stationId: '123',
  stationName: 'zhandai',
  cardReaderId: `123123${index}`, // 读卡器ID
  bindingTime: '2019-10-10 12:00:00', // 绑定时间
  crateTime: '2019-10-10 12:00:00', // 创建时间
}));

export const cardReaderEquipmentList = newArray(10).map(index => ({
  id: `${index}`,
  cardReaderId: '123123', // 读卡器ID
  equipmentId: `000212${index}`, // 充电设备ID
  leftNo: 1, // 左侧编号
  rightNo: 2, // 右侧编号
  bindingTime: '2019-10-10 12:00:00', // 绑定时间
  crateTime: '2019-10-10 12:00:00', // 创建时间
}));

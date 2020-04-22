import { keyMapOrganization } from '../../../enum/monitoringPlatform';
import { newArray, randomItem } from '../../../util';

export const keyMap = keyMapOrganization;

export const icList = newArray(10).map(index => ({
  id: `1_${index}`,
  stationId: '123',
  stationName: 'zhandai',
  icCardNo: `123123${index}`,
  userId: 'aerwerwer',
  phoneNumber: '15928603739',
  wechatName: '欧阳辉辉',
  bindingTime: '2019-10-10 12:00:00',
  endingTime: '2019-10-10',
  vehicleTypeId: '1111',
  vehicleTypeName: '电瓶车',
  bindingStationNum: randomItem([10, 8, 3, 2]),
}));

export const doorList = newArray(10).map(index => ({
  id: `${index}`,
  stationId: '123',
  stationName: '123',
  macId: `253155592${index}`,
  createTime: '2019-10-10 12:00:00',
}));

export const rfidList = newArray(20).map(index => ({
  id: `${index}`,
  stationId: '123',
  stationName: 'zhandai',
  icCardNo: '123123',
  rfidKey: '123456',
  userId: 'aerwerwer',
  phoneNumber: '15928603739',
  wechatName: '欧阳辉辉',
  vehicleTypeId: '1111',
  vehicleTypeName: '电瓶车',
  bindingTime: '2019-10-10 12:00:00',
  endingTime: '2019-10-10',
}));

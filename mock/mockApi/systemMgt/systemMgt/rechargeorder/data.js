import { keyMapOrganization } from '../../../enum/monitoringPlatform';
import { newArray, newMoment, randomItem, momentFormat } from '../../../util';

export const keyMap = keyMapOrganization;
const num = 19;

export const list = newArray(num).map(i => {
  const obj = {
    id: i,
    userId: '123',
    wechatName: '321',
    phoneNumber: '123432',
    rechargeType: '1',
    money: randomItem([12, 11, 10, 1]),
    moneyType: '1',
    createDate: newMoment().format(momentFormat.dateTimeFormat),
    createTime: newMoment().format(momentFormat.dateTimeFormat),
    stationId: `station_${i}`,
    stationName:
      '银泰城宿舍1号楼银泰城宿舍1号楼银泰城宿舍1号楼银泰城宿舍1号楼银泰城宿舍1号楼银泰城宿舍1号楼银泰城宿舍1号楼',
  };
  return obj;
});

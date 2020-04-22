import { keyMapOrganization } from '../../../enum/monitoringPlatform';
import { newArray, newMoment, newMomentList, randomItem, momentFormat } from '../../../util';
import { list as orderRechargeListOld } from '../../systemMgt/rechargeorder/data';
import { list as orderConsumerListOld } from '../../systemMgt/consumerorder/data';

export const keyMap = keyMapOrganization;
const num = 19;

export const list = newArray(num).map(i => {
  const obj = {
    id: `${i}_id`, // 用户id
    phoneNumber: `1860286412${randomItem([1, 2, 3, 4])}`, // 手机号码
    wechatName: 'ewew', // 微信昵称
    money: 112.44, // 现金余额
    powerMoney: 1500, // 能量币余额
    powerEndDate: '2019-12-31', // 能量币到期时间
    createDate: newMoment().format(momentFormat.dateTimeFormat),
    createTime: newMoment().format(momentFormat.dateTimeFormat),
    stationId: `station_${i}`,
    stationName:
      '银泰城宿舍1号楼银泰城宿舍1号楼银泰城宿舍1号楼银泰城宿舍1号楼银泰城宿舍1号楼银泰城宿舍1号楼银泰城宿舍1号楼',
  };
  return obj;
});

export const orderConsumerList = orderConsumerListOld;
export const orderRechargeList = orderRechargeListOld;

const dateParams = {
  isSubtract: true,
  keyShorthand: 'm',
  isFormatValue: true,
  format: momentFormat.dateTimeFormat,
};
export const chargeDataList = newMomentList(48, dateParams)
  .sort()
  .map(i => ({
    power: randomItem(['10', '12', '13']),
    time: i,
  }));

/* eslint-disable no-unused-vars */
import { newArray, newMoment, momentFormat, randomItem } from '../../../util';
// eslint-disable-next-line import/named
import { modelEmumUser } from '../../../enum/monitoringPlatform';

import { list as organizationList } from '../../backstageMgt/organization/data';

const nodeList = organizationList.filter((_, index) => index <= 5);
export const keyMap = modelEmumUser;

const num = 500;
// const groupNames = newArray(num).map(i=> )
export const list = newArray(num).map(i => {
  const obj = {
    id: `xxxx${i}`, // id
    userId: `xxxxx${i}`, // 用户id
    stationId: 'xxxxx', // 站点id
    stationName: '站点名称站点名称站点名称站点名称站点名称站点名称站点名称xxxxx', // 站点名称
    createDate: '2019-10-13', // 创建日期
    createTime: '2019-10-13 11:35:11', // 创建时间
    freeTimes: 2, // 剩余免费次数
    money: 12.0, // 订单金额
    payFlg: '0', // 支付状态,0-未支付,1-已支付
    inTime: '2019-10-13 11:36:23', // 第一次进门时间
    outTime: '2019-10-13 20:44:21', // 最后一次出门时间
  };
  return obj;
});

export const inoutLogList = newArray(num).map(i => {
  const obj = {
    id: `xxxx${i}`, // id
    userId: `xxxxx${i}`, // 用户id
    stationId: 'xxxxx', // 站点id
    stationName: '站点名称站点名称站点名称站点名称站点名称站点名称站点名称xxxxx', // 站点名称
    inOutType: randomItem(['1', '2']), // 进出类型,1-进，2-出
    openType: randomItem(['1', '2']), // 开门类型，1-刷卡，2-远程
    recordTime: '2019-10-13 11:35:11', // 创建时间
  };
  return obj;
});

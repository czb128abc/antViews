import { keyMapOrganization } from '../../../enum/monitoringPlatform';
import { newArray, randomItem } from '../../../util';

export const keyMap = keyMapOrganization;

export const list = newArray(10).map(index => ({
  id: `${index}`,
  stationId: '123',
  stationName: 'zhandai',
  chargeKey: `123123${index}`, // 电卡卡号
  userId: `aerwerwer${index}`,
  phoneNumber: `1592860373${index}`,
  wechatName: `欧阳辉辉${index}`,
  nickName: randomItem(['妻子的卡', '老爸的卡']),
  bindingTime: '2019-10-10 12:00:00', // 绑定时间
  createTime: '2019-10-10 12:00:00', // 创建时间
}));

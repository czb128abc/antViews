import { newArray, randomItem } from '../../../util';

// 设备逻辑状态，OPENING-开启中，OPEN-开启，CLOSING-关闭中，CLOSE-关闭，USING-使用中
export const statusList = ['OPENING', 'OPEN', 'CLOSING', 'CLOSE'];

const useTimeSegments = [
  // 使用时段
  {
    id: 'xxx',
    startTime: '11:00:00', // 开始时间
    endTime: '12:10:00', // 结束时间
  },
  {
    id: 'xxx2',
    startTime: '16:44:00', // 开始时间
    endTime: '21:00:00', // 结束时间
  },
];

const num = 30;
// const groupNames = newArray(num).map(i=> )
export const list = newArray(num).map(i => {
  const obj = {
    id: `xxxx${i}`,
    equipmentId: `2211${i}`,
    remark: `remark${i}`,
    stationId: 'xxx', // 站点id
    stationName: 'xxxx', // 站点名称
    stationPositionId: 'xxx', // 点位id
    stationPositionName: 'xxx', // 点位名称
    isOpen: randomItem([true, false]), // 是否开启
    isBoxOpen: randomItem([true, false]), // 盒子是否打开
    isError: randomItem([true, false, false, false]), // 是否故障
    status: randomItem(statusList), //
    category: randomItem(['COMMON', 'OTHER']),
    va: 220, // 电压
    a: 1.5, // 电流
    pa: 330.0, // 功率
    energy: 1.2, // 用的量
    lastRefreshTime: '2020-02-05 15:00:00',
    createTime: '2020-02-05 11:00:00',
    useTimeSegments,
    continuePower: '1', // 续电时间，单位：小时
    remidTime: '5', // 提醒时间,单位：分钟
  };
  return obj;
});

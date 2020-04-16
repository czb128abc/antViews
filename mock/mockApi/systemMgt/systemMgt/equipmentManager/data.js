import { keyMapOrganization } from '../../../enum/monitoringPlatform';
import { newArray, randomItem } from '../../../util';

export const keyMap = keyMapOrganization;

const status = ['IDLE', 'OPENED', 'CHARGING', 'OPENING', 'CLOSING'];
const equipmentStatus = ['ONLINE', 'OFFLINE'];
export const list = newArray(5).map(index => ({
  id: `equipmentId_${index + 1}`,
  equipmentId: `11111_${index}_0`, // 设备编号
  leftNo: 101, // 左侧编号
  leftStatus: randomItem(status), // 左侧插口状态：IDLE-空闲，OPENED-已开启，CHARGING-充电中，OPENING-开启中，CLOSING-关闭中
  leftEnergy: '235.78', // 最近功率
  rightNo: 102, // 右侧编号
  rightStatus: randomItem(status),
  rightEnergy: '235.78', // 最近功率
  isGateway: true, // 是否是网关，true-是，false-否
  status: randomItem(equipmentStatus), // 设备状态，ONLINE-在线，OFFLINE-离线
  isError: true, // 是否异常，true-是，false-否
  lastRefreshTime: '2020-01-08 14:42:11', // 最近状态刷新时间
  lastEnergy: '235.78', // 最近功率
  equipments: newArray(19).map(subItem => ({
    id: `xxxxxxx${subItem}_${subItem}`, // id
    equipmentId: `21212_${index}_${subItem}`, // 设备编号
    leftNo: 101, // 左侧编号
    leftStatus: randomItem(status), // 左侧插口状态：IDLE-空闲，OPENED-已开启，CHARGING-充电中，OPENING-开启中，CLOSING-关闭中
    leftEnergy: '235.78', // 最近功率

    rightNo: 102, // 右侧编号
    rightStatus: randomItem(status),
    rightEnergy: '235.78', // 最近功率

    isGateway: false, // 是否是网关，true-是，false-否
    status: randomItem(equipmentStatus), // 设备状态，ONLINE-在线，OFFLINE-离线
    isError: true, // 是否异常，true-是，false-否
    lastRefreshTime: '2020-01-08 14:42:11', // 最近状态刷新时间
    lastEnergy: '235.78', // 最近功率
  })),
}));

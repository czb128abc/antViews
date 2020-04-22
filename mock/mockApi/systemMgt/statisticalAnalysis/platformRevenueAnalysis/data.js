import { keyMapOrganization } from '../../../enum/monitoringPlatform';
import { newArray } from '../../../util';

export const keyMap = keyMapOrganization;

const types = ['自行车', '电瓶车', '三轮车', '老年车'];

export const list = newArray(2).map(index => ({
  id: `vehicleTypeId_${index + 1}`,
  name: types[index],
  createTime: '2019-10-10 12:00:00',
  createUserId: '1221',
}));

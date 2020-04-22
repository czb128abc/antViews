import { keyMapOrganization } from '../../../enum/monitoringPlatform';
import { newArray, randomItem } from '../../../util';

export const keyMap = keyMapOrganization;

const types = [5, 10, 20, 50, 100];

export const list = newArray(5).map(index => ({
  id: `money_${index + 1}`,
  money: types[index],
  isAction: randomItem([true, false]),
  createTime: '2019-10-10 12:00:00',
  donate: types[index] / 10,
}));

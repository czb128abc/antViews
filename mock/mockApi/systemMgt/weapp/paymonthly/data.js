import { newArray, newMoment, momentFormat, randomItem } from '../../../util';
// eslint-disable-next-line import/named
import { modelEmumUser } from '../../../enum/monitoringPlatform';

import { list as organizationList } from '../../backstageMgt/organization/data';

const nodeList = organizationList.filter((_, index) => index <= 5);
export const keyMap = modelEmumUser;

const num = 500;
// const groupNames = newArray(num).map(i=> )
export const list = newArray(num).map(i => {
  const obj = {};
  obj[`${keyMap.编号}`] = `keyMapUser_${i}`;
  obj[`${keyMap.名称}`] = randomItem(['张三', '李四', '王五']) + i;
  obj[`${keyMap.组织机构编号}`] = randomItem([1, 1]);
  obj[`${keyMap.组织机构名称}`] = randomItem(nodeList).orgName;
  obj[`${keyMap.电话号码}`] = randomItem(['18602864121', '18602864122', '18602864123']);
  obj[`${keyMap.状态}`] = randomItem([`1`, `1`]);
  obj[`${keyMap.创建时间}`] = newMoment().format(momentFormat.dateTimeFormat);
  return obj;
});

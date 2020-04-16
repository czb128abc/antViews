import { newArray, newMoment, momentFormat, randomItem } from '../../../util';
// eslint-disable-next-line import/named
import { modelEmumUserGroup } from '../../../enum/monitoringPlatform';
import { list as menuList } from '../menu/data';

export const modelEmum = modelEmumUserGroup;

const num = 10;
// const groupNames = newArray(num).map(i=> )
export const list = newArray(num).map(i => {
  const obj = {};
  obj[`${modelEmum.编号}`] = `keyMapUserGroup_${i}`;
  obj[`${modelEmum.用户组名}`] = randomItem(['平台管理组', '代理组', '公司组']) + i;
  obj[`${modelEmum.状态}`] = '1';
  obj[`${modelEmum.菜单权限映射}`] = menuList
    .map(item => ({
      id: `${item.id}_link`,
      groupId: obj[`${modelEmum.编号}`],
      menuId: item.id,
      menuName: item.menuName,
      reAuthorize: '2',
    }))
    .filter(item => !item.menuId.includes('/monitoringPlatform/backstageMgt'));
  obj[`${modelEmum.创建时间}`] = newMoment().format(momentFormat.dateTimeFormat);
  return obj;
});

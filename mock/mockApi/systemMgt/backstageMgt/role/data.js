/* eslint-disable import/named */
import { newArray, newMoment, momentFormat, randomItem } from '../../../util';
import { keyMapRole, modelEmumRole } from '../../../enum/monitoringPlatform';
import { list as menuList } from '../menu/data';

export const keyMap = keyMapRole;
export const modelEmum = modelEmumRole;

const num = 20;
const roleNameMap = {
  keyRole_1: '北京代理角色',
  keyRole_2: '河北代理角色',
  keyRole_3: '山东代理角色',
  keyRole_4: '广东代理角色',
  keyRole_5: '四川代理角色',
};
// const groupNames = newArray(num).map(i=> )
export const list = newArray(num).map(i => {
  const id = randomItem([1, 2, 3, 4]);
  const obj = {};
  obj[`${modelEmum.编号}`] = `keyRole_${i}`;
  obj[`${modelEmum.名称}`] = randomItem(['角色']) + i;
  obj[`${modelEmum.上级角色编号}`] = `keyRole_${id}`;
  obj[`${modelEmum.上级角色名称}`] = roleNameMap[`keyRole_${id}`];
  obj[`${modelEmum.状态}`] = '1';
  obj[`${modelEmum.创建时间}`] = newMoment().format(momentFormat.dateTimeFormat);

  if (i === 0) {
    obj[`${modelEmum.名称}`] = '平台角色';
    obj[`${modelEmum.上级角色编号}`] = '';
    obj[`${modelEmum.上级角色名称}`] = '';
  } else if (i < 5) {
    obj[`${modelEmum.名称}`] = roleNameMap[obj[`${modelEmum.编号}`]];
    obj[`${modelEmum.上级角色编号}`] = `keyRole_${0}`;
    obj[`${modelEmum.上级角色名称}`] = '平台角色';
  }
  obj[`${modelEmum.菜单权限映射}`] = menuList
    .map(item => ({
      id: `${item.id}_link`,
      groupId: obj[`${modelEmum.编号}`],
      menuId: item.id,
      menuName: item.menuName,
      reAuthorize: '2',
    }))
    .filter(item => !item.menuId.includes('/monitoringPlatform/backstageMgt'));

  return obj;
});

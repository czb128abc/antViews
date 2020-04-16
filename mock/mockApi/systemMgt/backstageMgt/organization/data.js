import { newArray, newMoment, momentFormat, randomItem } from '../../../util';
// eslint-disable-next-line import/named
import { keyMapOrganization, modelEmumOrganization } from '../../../enum/monitoringPlatform';

export const keyMap = keyMapOrganization;
export const modelEmum = modelEmumOrganization;

const num = 20;

const orgMap = {
  keyMapDept_1: '北京代理',
  keyMapDept_2: '河北代理',
  keyMapDept_3: '山东代理',
  keyMapDept_4: '广东代理',
  keyMapDept_5: '四川代理',
};
// const groupNames = newArray(num).map(i=> )
export const list = newArray(num).map(i => {
  const obj = {};
  obj[`${modelEmum.部门编号}`] = `keyMapDept_${i}`;
  obj[`${modelEmum.部门名称}`] = randomItem(['公司组']) + i;
  obj[`${modelEmum.上级部门编号}`] = `keyMapDept_${randomItem([1, 2, 3, 4, 5])}`;
  obj[`${modelEmum.上级部门名称}`] = `${orgMap[obj[`${modelEmum.上级部门编号}`]]}`;
  obj[`${modelEmum.描述}`] = `remark_${i}`;
  obj[`${modelEmum.删除标识}`] = `0`;
  obj[`${modelEmum.节点类型}`] = `3`;
  obj[`${modelEmum.创建时间}`] = newMoment().format(momentFormat.dateTimeFormat);

  if (i === 0) {
    obj[`${modelEmum.部门名称}`] = '平台';
    obj[`${modelEmum.上级部门编号}`] = '';
    obj[`${modelEmum.上级部门名称}`] = '';
    obj[`${modelEmum.节点类型}`] = `1`;
    obj[`${modelEmum.部门编号}`] = `1`;
  } else if (i < 6) {
    obj[`${modelEmum.部门名称}`] = orgMap[obj[`${modelEmum.部门编号}`]];
    obj[`${modelEmum.上级部门编号}`] = `1`;
    obj[`${modelEmum.上级部门名称}`] = `平台`;
    obj[`${modelEmum.节点类型}`] = `2`;
  }
  return obj;
});

import { keyMapOrganization } from '../../../enum/monitoringPlatform';
import { newArray, newMoment, randomItem, momentFormat, randomTitle } from '../../../util';

export const keyMap = keyMapOrganization;
const num = 19;

export const list = newArray(num).map(i => {
  const obj = {
    id: i,
    userName: '张三',
    phoneNumber: '123432',
    operateContent: randomTitle(10, 30),
    operatorName: randomItem(['张三1', '张三2']),
    operateRemark: `备注${randomTitle(10, 30)}`,
    operateTime: newMoment().format(momentFormat.dateTimeFormat),
  };
  return obj;
});

import { randomNum, newArray, newMomentList, randomItem } from '../../util';
import { keyMapStation } from '../../enum/monitoringPlatform';

export const keyMap = keyMapStation;

const num = randomNum(500, 501);
const dateList = newMomentList(num,{keyShorthand: 'HH'})
export const list = newArray(num).map(i => {
  const obj =  {
      "id": `stationPosition_${i}`,
      "stationId": "2",
      "stationName": "世纪城站点",
      "stationPositionId": "4",
      "stationPositionName": "世纪城站点点位1",
      "errorId": `errorId_${i}`,
      "errorMessage": "电流超过阙值20%",
      "createDate": "2019-01-18 10:43:54",
      "kfName": randomItem('张三,李四,王五'.split(',')), // 客服名字
      "kfDate": dateList[i], // "2018-01-01 08:08:00",// 客服处理时间
      "kfRemark": "客服已联系电工XXXXX",// 客服备注
      "dgName": null,
      "dgDate": null,
      "dgRemark": null,
      "xcName": null,
      "xcDate": null,
      "xcRemark": null,
      "errorLevel": randomItem("中级,高级,低级".split(','))// 紧急程度
  }
  return obj;
});

/* eslint-disable no-plusplus */
import { getOperateData, sendListPage, getRequestParams, randomItem } from '../../../util';

import { list } from './data';
import { list as stationPositionList } from '../../stationPosition/data';

const stationPositionListMap = {};
stationPositionList.forEach(item => {
  stationPositionListMap[item.id] = item;
});

export default {
  'GET /api/powerconservation/findByPage.bak': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'GET /api/powerconservation/findByPage': (req, res) => {
    const param = getRequestParams(req);
    let newList = list;
    if (param.stationPositionIds) {
      newList = [];
      param.stationPositionIds.forEach(stationPositionId => {
        const stationPosition = stationPositionListMap[stationPositionId];
        list.forEach(item => {
          const obj = {
            ...item,
            id: item.id + stationPosition.id,
            stationPositionId: stationPosition.id,
            stationPositionName: stationPosition.stationPositionName,
            wkh: randomItem(['10', '20', '50', '100', '111']),
          };
          newList.push(obj);
        });
      });
    }
    const data = sendListPage(req, res, newList, 'data', () => true);
    return data;
  },
};

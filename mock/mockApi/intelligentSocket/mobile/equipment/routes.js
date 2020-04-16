/* eslint-disable no-plusplus */
import { getOperateData, getRequestParams, newMoment } from '../../../util';
import { list } from './data';

export default {
  'POST /api/mobile/user/equipment/add': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'DELETE /api/mobile/user/equipment/remove': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'PUT /api/mobile/user/equipment/save': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'PUT /api/mobile/equipment/open': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'PUT /api/mobile/equipment/close': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'GET /api/mobile/user/equipment/list': (req, res) => {
    const { category = 'COMMON' } = getRequestParams(req);
    const tempList = list
      .filter(item => item.category === category)
      .filter((_, index) => index < 2)
      .map(item => {
        const obj = {
          ...item,
        };
        obj.useTimeSegments[1].startTime = newMoment()
          .add(60, 'second')
          .format('HH:mm:ss');
        console.log(obj.useTimeSegments[1]);
        return obj;
      });
    const data = getOperateData(true);
    data.data = tempList;
    res.send(data);
  },
};

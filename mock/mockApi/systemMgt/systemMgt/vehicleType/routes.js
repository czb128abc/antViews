import { getOperateData } from '../../../util';

import { list } from './data';

export default {
  'GET /api/vehicleType/list': (req, res) => {
    const data = getOperateData(true);
    data.data = list;
    res.send(data);
  },
  'POST /api/vehicleType/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'GET /api/vehicleType/update': (req, res) => {
    const data = getOperateData(true);
    data.data = '';
    res.send(data);
  },
  'GET /api/vehicleType/delete': (req, res) => {
    const data = getOperateData(true);
    data.data = '';
    res.send(data);
  },
};

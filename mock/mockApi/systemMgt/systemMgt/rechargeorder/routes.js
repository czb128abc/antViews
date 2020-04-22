/* eslint-disable no-plusplus */
import { getOperateData, sendListPage } from '../../../util';

import { list } from './data';

export default {
  'GET /api/rechargeorder/findByPage': (req, res) => {
    sendListPage(req, res, list, 'data', () => true);
  },

  'GET /api/rechargeorder/queryByStationId': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'GET /api/rechargeorder/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'GET /api/rechargeorder/insertOrupdate': (req, res) => {
    const data = getOperateData(true);
    data.data = list;
    res.send(data);
  },
  'POST /api/rechargeorder/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/rechargeorder/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
};

/* eslint-disable no-plusplus */
import { getOperateData, sendListPage } from '../../../util';

import { list } from './data';

export default {
  'GET /api/consumerorder/findByPage': (req, res) => {
    sendListPage(req, res, list, 'data', () => true);
  },

  'GET /api/consumerorder/queryByStationId': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'GET /api/consumerorder/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'GET /api/consumerorder/insertOrupdate': (req, res) => {
    const data = getOperateData(true);
    data.data = list;
    res.send(data);
  },
  'POST /api/consumerorder/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/consumerorder/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
};

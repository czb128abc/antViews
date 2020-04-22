import { sendListPage, getOperateData, findInList } from '../../util';

import { list } from './data';

export default {
  'GET /api/monitor/findByPage': (req, res) => {
    const data = sendListPage(req, res, list, 'data', () => true);
    return data;
  },
  'GET /api/monitor/queryById': (req, res) => {
    const data = getOperateData(true);
    data.data = findInList(req, list, ['id']);
    res.send(data);
  },
  'POST /api/monitor/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/monitor/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/monitor/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/monitor/updatemonitorStatus': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
};

import { getOperateData, sendListPage } from '../../../util';

import { list } from './data';

export default {
  'GET /api/chargebinding/findByPage': (req, res) => {
    sendListPage(req, res, list, 'data', () => true);
  },
  'POST /api/chargebinding/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/chargebinding/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
};

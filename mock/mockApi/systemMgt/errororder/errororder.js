
/* eslint-disable no-plusplus */
import { sendListPage, getOperateData, findInList } from '../../util';

import { list } from './data';

export default {
  'GET /api/errororder/findByPage': (req, res) => {
    const data = sendListPage(req, res, list, 'data', () => true);
    return data;
  },
  'GET /api/errororder/findByErrorId': (req, res) => {
    const data = getOperateData(true);
    data.data = findInList(req, list, ['errorId']);
    res.send(data);
  },

  'POST /api/errororder/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
};

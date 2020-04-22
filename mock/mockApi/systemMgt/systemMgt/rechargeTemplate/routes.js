import { getOperateData } from '../../../util';

import { list } from './data';

export default {
  'GET /api/rechargeTemplate/list': (req, res) => {
    const data = getOperateData(true);
    data.data = list;
    res.send(data);
  },
  'POST /api/rechargeTemplate/save': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'DELETE /api/rechargeTemplate/delete': (req, res) => {
    const data = getOperateData(true);
    data.data = '';
    res.send(data);
  },
};

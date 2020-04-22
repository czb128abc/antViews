import { sendListPage, getOperateData, findInList } from '../../util';

import { list } from './data';

export default {
  'GET /api/warnrules/findByPage': (req, res) => {
    const data = sendListPage(req, res, list, 'data', () => true);
    return data;
  },
  'GET /api/warnrules/queryById': (req, res) => {
    const data = getOperateData(true);
    data.data = findInList(req, list, ['id']);
    res.send(data);
  },
  'POST /api/warnrules/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/warnrules/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/warnrules/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/warnrules/updatewarnrulesStatus': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },

  'POST /api/rulespositionlink/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/rulespositionlink/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/rulespositionlink/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
};

/* eslint-disable no-plusplus */
import { sendListPage, getOperateData, findInList } from '../../../util';

import { list } from './data';

export default {
  'GET /api/group/findByPage': (req, res) => {
    const data = sendListPage(req, res, list, 'data', () => true);
    return data;
  },
  'GET /api/group/queryById': (req, res) => {
    const data = getOperateData(true);
    data.data = findInList(req, list, ['id']);
    res.send(data);
  },
  'GET /api/group/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/group/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/group/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/group/updateGroupStatus': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/systemgroupmenulink/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/systemgroupmenulink/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
};

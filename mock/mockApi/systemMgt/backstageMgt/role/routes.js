/* eslint-disable no-plusplus */
import { sendListPage, getOperateData, findInList } from '../../../util';

import { list } from './data';

export default {
  'GET /api/role/findByPage': (req, res) => {
    const data = sendListPage(req, res, list, 'data', () => true);
    return data;
  },
  'GET /api/role/findRoleListByRoleId': (req, res) => {
    const data = sendListPage(req, res, list, 'data', () => true);
    return data;
  },
  'GET /api/role/findRoleListByUser': (req, res) => {
    const data = sendListPage(req, res, list, 'data', () => true);
    return data;
  },
  'GET /api/role/queryById': (req, res) => {
    const data = getOperateData(true);
    data.data = findInList(req, list, ['id']);
    res.send(data);
  },
  'GET /api/role/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/role/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/role/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },

  'POST /api/systemrolemenulink/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/systemrolemenulink/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
};

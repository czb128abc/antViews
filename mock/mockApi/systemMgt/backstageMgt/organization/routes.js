/* eslint-disable no-plusplus */
import { sendListPage, getOperateData, findInList } from '../../../util';

import { list } from './data';

export default {
  'GET /api/organization/findByPage': (req, res) => {
    const data = sendListPage(req, res, list, 'data', () => true);
    return data;
  },
  'GET /api/organization/findOrgList': (req, res) => {
    const data = sendListPage(req, res, list, 'data', () => true);
    return data;
  },
  'GET /api/organization/queryById': (req, res) => {
    const data = getOperateData(true);
    data.data = findInList(req, list, ['id']);
    res.send(data);
  },
  'GET /api/organization/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/organization/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/organization/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
};

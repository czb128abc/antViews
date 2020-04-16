/* eslint-disable no-plusplus */
import { sendListPage, getOperateData, findInList } from '../../../util';

import { list } from './data';

export default {
  'GET /api/menu/findByPage': (req, res) => {
    const data = sendListPage(req, res, list, 'data', () => true);
    return data;
  },
  'GET /api/menu/findMenuList': (req, res) => {
    const data = sendListPage(req, res, list, 'data', () => true);
    return data;
  },
  'GET /api/menu/findMenuListByGroupUser': (req, res) => {
    const data = getOperateData(true);
    data.data = list;
    res.send(data);
  },
  'GET /api/menu/findMenuListByRoleUser': (req, res) => {
    const data = getOperateData(true);
    data.data = list;
    res.send(data);
  },
  'GET /api/menu/findMenuListByLoginUser': (req, res) => {
    const data = getOperateData(true);
    data.data = list;
    res.send(data);
  },
  'GET /api/menu/queryById': (req, res) => {
    const data = getOperateData(true);
    data.data = findInList(req, list, ['id']);
    res.send(data);
  },
  'GET /api/menu/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/menu/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/menu/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
};

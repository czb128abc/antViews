/* eslint-disable no-plusplus */
import { sendListPage, getOperateData, findInList, randomItem } from '../../util';

import { list } from './data';

export default {
  'GET /api/station/findByPage': (req, res) => {
    const data = sendListPage(req, res, list, 'data', () => true);
    return data;
  },
  'GET /api/station/queryById': (req, res) => {
    const data = getOperateData(true);
    data.data = findInList(req, list, ['id']);
    res.send(data);
  },
  'GET /api/station/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/station/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/station/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/station/updateStationStatus': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'GET /api/station/queryStatusCount': (req, res) => {
    const data = getOperateData(true);
    const allCnt = list.length;
    let prepareCnt = 0;
    let warnCnt = 0;
    list.forEach(item => {
      if (item.status === '1') {
        prepareCnt++;
      }
      if (['3', '4'].includes(item.status)) {
        warnCnt++;
      }
    });
    data.data = {
      allCnt,
      prepareCnt,
      warnCnt,
    };
    res.send(data);
  },
  // 查询异常站点清单
  'GET /api/station/findAbList': (req, res) => {
    const data = getOperateData(true);
    data.data = list.filter(item => ['4', '5', '3'].includes(item.status));

    data.data = data.data.map(item => ({
      ...item,
      message: randomItem(['电流超过阙值20%', '电流超过阙值30%', '电流超过阙值50%']),
    }));
    res.send(data);
  },
  // 分页查询正常站点
  'GET /api/station/findNormalPage': (req, res) => {
    const thelist = list.map(item => ({
      ...item,
      normalDays: randomItem([20, 50, 80]),
    }));
    sendListPage(req, res, thelist, 'data', item => item.status === '2');
  },
};

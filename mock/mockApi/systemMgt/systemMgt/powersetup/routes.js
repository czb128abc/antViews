/* eslint-disable no-plusplus */
import { getOperateData } from '../../../util';

import { listMap, powersetupItem } from './data';

export default {
  'GET /api/organization/findStationPositionByOrgId': (req, res) => {
    const data = getOperateData(true);
    data.data = listMap;
    res.send(data);
  },

  'GET /api/powersetup/queryByPostitionId': (req, res) => {
    const data = getOperateData(true);
    data.data = powersetupItem;
    res.send(data);
  },
  'GET /api/powersetup/deleteallset': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/powersetup/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/powersetup/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/stationposition/batchpoweron': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/stationposition/batchpowerdown': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/stationposition/updatemessageflg': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
};

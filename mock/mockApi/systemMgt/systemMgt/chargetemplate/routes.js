/* eslint-disable no-plusplus */
import { getOperateData } from '../../../util';

import { list } from './data';

export default {
  'GET /api/chargetemplate/findStationPositionByOrgId': (req, res) => {
    const data = getOperateData(true);
    data.data = list;
    res.send(data);
  },
  /**
   * 接口即将废弃
   */
  'GET /api/chargetemplate/queryByStationId': (req, res) => {
    const data = getOperateData(true);
    data.data = [
      {
        id: 'da5d25142bb04b8483afa70104b1ab9d',
        fromPower: '1',
        toPower: '10',
        money: 1,
        powerMoney: 2,
        stationId: 'f61675e2efaf4fa18a49acc939e6274c',
        stationName: '德刚',
      },
      {
        id: '13f9c7e7f95b47bdbadf068c09b65434',
        fromPower: '10',
        toPower: '1234',
        money: 10,
        powerMoney: 10,
        stationId: 'f61675e2efaf4fa18a49acc939e6274c',
        stationName: 'string',
      },
    ];
    res.send(data);
  },
  'GET /api/chargetemplate/queryTemplateByStationId': (req, res) => {
    const data = getOperateData(true);
    const chargeFeeTempleList = [
      {
        id: 'da5d25142bb04b8483afa70104b1ab9d',
        fromPower: '1',
        toPower: '10',
        money: 1,
        powerMoney: 2,
        stationId: 'f61675e2efaf4fa18a49acc939e6274c',
        stationName: 'stationName 德刚',
      },
      {
        id: '13f9c7e7f95b47bdbadf068c09b65434',
        fromPower: '10',
        toPower: '1234',
        money: 10,
        powerMoney: 10,
        stationId: 'f61675e2efaf4fa18a49acc939e6274c',
        stationName: 'xxxstationName',
      },
    ];
    data.data = {
      chargeFeeTempleList,
      serviceFee: {
        stationId: '212',
        isServiceFee: true,
        money: 0.3,
        powerMoney: 50,
      },
      isUnMonthlyChargeable: true,
    };
    res.send(data);
  },
  'GET /api/chargetemplate/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/chargetemplate/insertOrupdate': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/chargetemplate/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/chargetemplate/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
};

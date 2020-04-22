import { newArray, sendListPage, findInList, getOperateData, randomItem } from '../../util';

import { list } from './data';

export default {
  'GET /api/stationposition/findByPage': (req, res) => {
    const data = sendListPage(req, res, list, 'data', () => true);
    return data;
  },
  'GET /api/stationposition/queryById': (req, res) => {
    const data = getOperateData(true);
    data.data = findInList(req, list, ['id']);
    res.send(data);
  },
  'POST /api/stationposition/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/stationposition/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/stationposition/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },

  'POST /api/positionmonitor/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/positionmonitor/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/positionmonitor/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'GET /api/positionmonitor/queryGateWayByStationId': (req, res) => {
    const data = getOperateData(true);
    data.data = [
      {
        id: '195b002d767b416a99af73102022d75a',
        stationId: '13a44fc054554aa2acf2daecac1e8c1a',
        stationName: '928测试站点',
        gateway: '100009999',
        frequency: 4,
      },
      {
        id: '39c04ba343c84bdd82bd068c0889e664',
        stationId: '13a44fc054554aa2acf2daecac1e8c1a',
        stationName: '928测试站点',
        gateway: '100008999',
        frequency: 5,
      },
      {
        id: 'cf9f4c48614e4abcad7b7b18af503319',
        stationId: '13a44fc054554aa2acf2daecac1e8c1a',
        stationName: '928测试站点',
        gateway: '100000520',
        frequency: 3,
      },
    ];
    res.send(data);
  },

  'POST /api/positionmonitor/saveEquipmentNo': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'GET /api/positionmonitor/queryEquipmentByStationId': (req, res) => {
    const data = getOperateData(true);
    data.data = newArray(10).map((item, index) => {
      const obj = {
        id: '111', // id
        stationId: '222', // 站点id
        stationName: '站点1', // 站点名称
        stationPositionId: '111', //
        stationPositionName: 'd', //
        equipmentId: `1111_${index}`, // 设备编号
        monitorId: '22',
        monitorName: '22',
        normalValueFrom: '111',
        normalValueTo: '22',
        unit: '',
        level: '',
        gateway: '',
        leftNo: '', // 左插孔编号
        rightNo: '', // 右插孔编号
      };
      if (index < 10) {
        const num = (index + 1) * 2;
        obj.leftNo = `${num}`;
        obj.rightNo = `${num + 1}`;
      }
      return obj;
    });
    console.log('TCL: data', data);

    res.send(data);
  },

  // 查询异常清单清单
  'GET /api/stationposition/findAbList': (req, res) => {
    const data = getOperateData(true);
    data.data = list.filter(item => ['4', '3', '5'].includes(item.status));
    data.data = data.data
      .map(item => ({
        ...item,
        message: randomItem(['电流超过阙值20%', '电流超过阙值30%', '电流超过阙值50%']),
      }))
      .filter((_, index) => index < 6);
    res.send(data);
  },
  // 查询历史数据
  /**
   *  {
            "stationPositionName": "世纪城站点点位1",
            "address": "世纪城站点点位1世纪城站点点位1",
            "monitorName": "电压监控",
            "dataValue": "50A",
            "acceptData": "2019-01-16 11:10",
            "dataStatus": "正常"
        },
   */
  'POST /api/stationposition/findBaseDataPage': (req, res) => {
    const thelist = list.map(item => ({
      ...item,
      monitorName: '电压监控',
      dataValue: `${randomItem(['220', '220', '170', '120', '210'])}`,
      acceptData: '2019-01-16 11:10',
      dataStatus: '2',
      normalDays: randomItem([20, 50, 80, 120, 150, 180]),
    }));
    sendListPage(req, res, thelist, 'data', () => true);
  },
};

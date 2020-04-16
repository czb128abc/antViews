import { getOperateData, sendListPage, getRequestParams } from '../../../util';

import { icList, doorList, rfidList } from './data';

/**
 * 变更
 *    /api/accesscontrolbinding -> /api/doorManager
 */

export default {
  /**
   *
   * 站点道闸绑定
   */

  'GET /api/doorManager/findDoorByPage': (req, res) => {
    sendListPage(req, res, doorList, 'data', () => true);
  },
  'POST /api/doorManager/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/doorManager/deleteDoor': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'GET /api/doorManager/openDoor': (req, res) => {
    const data = getOperateData(true);
    data.data = '开门成功';
    res.send(data);
  },
  // rfid
  'GET /api/rfidCardManager/findByPage': (req, res) => {
    sendListPage(req, res, rfidList, 'data', () => true);
  },
  'POST /api/rfidCardManager/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/rfidCardManager/batchInsert': (req, res) => {
    const { rfidCardNos } = getRequestParams(req);
    const errorNum = 2;
    const errorCards = rfidCardNos
      .filter((_, index) => index < errorNum)
      .map(item => ({ cardNo: item, msg: '卡号重复添加' }));
    const data = getOperateData(true);
    data.data = {
      successNum: '3',
      errorNum,
      errorCards,
    };
    res.send(data);
  },
  'POST /api/door/writeAuthorityAgain': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  // ic
  'GET /api/icCardManager/findByPage': (req, res) => {
    sendListPage(req, res, icList, 'data', () => true);
  },
  'GET /api/icCardManager/getStationsByIcCardNo': (req, res) => {
    const data = getOperateData(true);
    data.data = [
      {
        stationId: '1231',
        stationName: '银泰城宿舍',
        endDate: '2019-12-22',
        bindingTime: '2019-12-01 08:30:05',
        isExtend: 'false', // 是否扩展站点
      },
      {
        stationId: '1232',
        stationName: '银泰城宿舍',
        endDate: '2019-12-22',
        bindingTime: '2019-12-01 08:30:05',
        isExtend: 'true', // 是否扩展站点
      },
      {
        stationId: '1233',
        stationName: '银泰城宿舍',
        endDate: '2019-12-22',
        bindingTime: '2019-12-01 08:30:05',
        isExtend: 'true', // 是否扩展站点
      },
    ];
    res.send(data);
  },
  'POST /api/icCardManager/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/icCardManager/batchInsert': (req, res) => {
    const { icCards } = getRequestParams(req);
    const errorNum = 2;
    const errorCards = icCards
      .filter((_, index) => index < errorNum)
      .map(item => ({ cardNo: item, msg: '卡号重复添加' }));
    const data = getOperateData(true);
    data.data = {
      successNum: '3',
      errorNum,
      errorCards,
    };
    res.send(data);
  },
};

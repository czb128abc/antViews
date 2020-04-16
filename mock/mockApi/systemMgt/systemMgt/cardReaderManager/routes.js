import { getOperateData, sendListPage } from '../../../util';

import { list, cardReaderEquipmentList } from './data';

export default {
  'GET /api/cardReaderManager/findByPage': (req, res) => {
    sendListPage(req, res, list, 'data', () => true);
  },
  'POST /api/cardReaderManager/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/cardReaderManager/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },

  /**
   *
   * 站点读卡器-设备关系管理
   */

  'GET /api/cardReaderEquipmentManager/findByCardReaderId': (req, res) => {
    sendListPage(
      req,
      res,
      cardReaderEquipmentList.filter((_, index) => index < 4),
      'data',
      () => true,
    );
  },
  'POST /api/cardReaderEquipmentManager/save': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/cardReaderEquipmentManager/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'GET /api/cardReaderEquipmentManager/findNoBindingEquipment': (req, res) => {
    const data = getOperateData(true);
    data.data = cardReaderEquipmentList
      .filter((_, index) => index > 4)
      .map(item => item.equipmentId);
    res.send(data);
  },
};

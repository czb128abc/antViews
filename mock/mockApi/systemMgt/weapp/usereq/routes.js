import { getOperateData } from '../../../util';
import { list } from './data';

export default {
  'GET /api/stationposition/powerlist': (req, res) => {
    const data = getOperateData(true);
    data.data = list;
    res.send(data);
  },
  'POST /api/usereq/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'GET /api/stationposition/deleteuserpower': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/stationposition/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'GET /api/stationposition/poweron': (req, res) => {
    const data = getOperateData(true);
    data.message = '该插座由管理员配置，将在2019-08-03 10:00:00断电，请注意用电使用。';
    res.send(data);
  },
  'GET /api/stationposition/powerdown': (req, res) => {
    const data = getOperateData(false);
    data.code = '401';
    res.send(data);
  },
};

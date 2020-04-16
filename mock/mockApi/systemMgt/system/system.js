import { getOperateData } from '../../util';

import { list as monitorList } from '../monitor/data';
import { list as warnRulesList } from '../warnRules/data';
import { list as stationList } from '../station/data';
import { list as stationPositionList } from '../stationPosition/data';

export default {
  'GET /api/selectlist/monitor': (req, res) => {
    const data = getOperateData(true);
    data.data = monitorList
      .filter(item => item.status === '1' || true)
      .map(item => {
        const { id } = item;
        const name = item.monitorName;
        return {
          id,
          name,
          data: item,
        };
      });
    res.send(data);
  },

  'GET /api/selectlist/station': (req, res) => {
    const data = getOperateData(true);
    data.data = stationList
      .filter(item => item.status === '1' || true)
      .map(item => {
        const { id } = item;
        const name = item.stationName;
        return {
          id,
          name,
          data: item,
        };
      });
    res.send(data);
  },

  'GET /api/selectlist/warnrules': (req, res) => {
    const data = getOperateData(true);
    data.data = warnRulesList
      .filter(item => item.status === '1' || true)
      .map(item => {
        const { id } = item;
        const name = item.warnRuleName;
        return {
          id,
          name,
          data: item,
        };
      });
    res.send(data);
  },

  'GET /api/selectlist/stationposition': (req, res) => {
    const data = getOperateData(true);
    data.data = stationPositionList
      .filter(item => item.status === '1')
      .map(item => {
        const { id } = item;
        const name = item.stationPositionName;
        return {
          id,
          name,
          data: item,
        };
      });
    res.send(data);
  },

  'GET /api/systemuser/logout': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },

  'POST /api/systemuser/login': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST/api/systemuser/updatepassword': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
};

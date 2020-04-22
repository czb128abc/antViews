import { getOperateData } from '../../../util';

import { list } from './data';

export default {
  'GET /api/equipmentManager/queryByStationId': (req, res) => {
    const data = getOperateData(true);
    data.data = list;
    res.send(data);
  },
  'POST /api/equipmentManager/operate': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
};

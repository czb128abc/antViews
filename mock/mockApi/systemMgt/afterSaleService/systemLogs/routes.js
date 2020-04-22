/* eslint-disable no-plusplus */
import { sendListPage } from '../../../util';

import { list } from './data';

export default {
  'GET /api/systemLogs/queryPage': (req, res) => {
    sendListPage(req, res, list, 'data', () => true);
  },
};

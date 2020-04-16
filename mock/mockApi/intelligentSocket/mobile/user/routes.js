import { getOperateData } from '../../../util';

export default {
  'PUT /api/mobile/user/register': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/mobile/user/org/apply': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/mobile/sso/login': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      id: '1111',
      realName: 'xxxx',
      phoneNumber: '136xxxx',
      amount: 12.0, // 账户余额
      orgId: 'xxxx',
      orgName: 'xxxx',
      userType: 'USER', // 用户类型，USER-普通用户，ADMIN-管理员
    };
    res.send(data);
  },
};

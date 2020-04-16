/* eslint-disable no-plusplus */
import { getOperateData, getRequestParams } from '../../../util';

import { list as roleList } from '../../backstageMgt/role/data';
import { list as menuList } from '../../backstageMgt/menu/data';
import { list as userGroupList } from '../../backstageMgt/userGroup/data';

export default {
  'GET /api/sms/sendSms': (req, res) => {
    const data = getOperateData(true);
    data.data = '0123';
    res.send(data);
  },

  'POST /api/systemuser/userInfo.bak': (req, res) => {
    const data = getOperateData(true);
    const userId = '4f5d512c5e2644aaab99be5c9fcebfdf';
    const systemUserGroupLinkList = userGroupList.map(item => ({
      userId,
      id: item.id,
      groupId: item.id,
      groupName: item.groupName,
    }));
    const systemUserRoleLinkList = roleList
      .map(item => ({
        userId,
        id: item.id,
        roleId: item.id,
        roleName: item.roleName,
      }))
      .filter((_, index) => index < 6);
    const systemMenuList = menuList.map(item => ({
      userId,
      id: item.id,
      menuName: item.menuName,
      url: item.url,
    }));
    data.data = {
      id: userId,
      phoneNumber: '15928603739',
      userPassword: '123456',
      realName: '欧阳枫',
      orgId: 'keyMapDept_0',
      orgName: '平台',
      statues: '1',
      createDate: '2019-06-03 19:41:03',
      systemUserGroupLinkList,
      systemUserRoleLinkList,
      systemMenuList,
    };
    res.send(data);
  },
  'POST /api/systemuser/registration': (req, res) => {
    const param = getRequestParams(req);
    console.log('param', param);
    const data = getOperateData(param.phoneNumber === '11');
    res.send(data);
  },
  'POST /api/systemuser/wechatlogin': (req, res) => {
    const param = getRequestParams(req);
    console.log('param', param);
    const data = getOperateData(!param.mock);
    res.send(data);
  },
};

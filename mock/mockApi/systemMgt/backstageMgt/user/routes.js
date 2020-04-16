/* eslint-disable no-plusplus */
import { sendListPage, getOperateData, findInList } from '../../../util';

import { list as roleList } from '../role/data';
import { list as menuList } from '../menu/data';
import { list as userGroupList } from '../userGroup/data';
import { list } from './data';

export default {
  'GET /api/systemuser/findByPage': (req, res) => {
    const data = sendListPage(req, res, list, 'data', () => true);
    return data;
  },
  // 通过orgId 查询以其根节点为准的人员清单
  'GET /api/systemuser/queryByOrgId': (req, res) => {
    const data = sendListPage(req, res, list, 'data', () => true);
    return data;
  },
  'GET /api/systemuser/queryById': (req, res) => {
    const data = getOperateData(true);
    data.data = findInList(req, list, ['id']);
    const systemUserRoleLinkList = [];
    const systemUserGroupLinkList = [];
    data.data.systemUserGroupLinkList = systemUserGroupLinkList;
    data.data.systemUserRoleLinkList = systemUserRoleLinkList;
    res.send(data);
  },

  'GET /api/systemuser/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/systemuser/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/systemuser/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/systemuser/userInfo': (req, res) => {
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
      orgId: '1',
      orgName: '平台',
      statues: '1',
      createDate: '2019-06-03 19:41:03',
      systemUserGroupLinkList,
      systemUserRoleLinkList,
      systemMenuList,
    };
    res.send(data);
  },
  'GET /api/systemuser/userInfoByUserId': (req, res) => {
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
      orgId: '1',
      orgName: '平台',
      statues: '1',
      createDate: '2019-06-03 19:41:03',
      systemUserGroupLinkList,
      systemUserRoleLinkList,
      systemMenuList,
    };
    res.send(data);
  },
  'POST /api/systemusergrouplink/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/systemusergrouplink/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/systemuserrolelink/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/systemuserrolelink/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
};

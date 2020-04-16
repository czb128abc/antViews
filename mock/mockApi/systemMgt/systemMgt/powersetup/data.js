import { keyMapOrganization } from '../../../enum/monitoringPlatform';

export const keyMap = keyMapOrganization;

export const powersetupItem = {
  id: '7b7e57a33d3c4dbc86489cbaac60437c',
  stationPositionId: '53feeb33c2954729a2cbcf13a41cfcdb',
  stationPositionName: '天府广场第一个点位111',
  remidTime: '15',
  continuePower: '1',
  list: [
    {
      id: '63253f0d319b4d0c94f2ae754e8b0809',
      stationPositionId: '53feeb33c2954729a2cbcf13a41cfcdb',
      stationPositionName: '天府广场第一个点位111',
      startTime: '00:00:00',
      endTime: '23:59:59',
    },
  ],
};

export const listMap = {
  stationPosition: [
    {
      id: '53feeb33c2954729a2cbcf13a41cfcdb',
      stationId: 'f359c719af4a4512a3050747e56ad366',
      stationPositionName: '天府广场第一个点位111',
      status: '2',
      createDate: '2019-07-09 13:47',
      address: '世纪城站点点位1世纪城站点点位1111',
      powerFlg: '1',
      remark: null,
      messageFlg: '1',
    },
    {
      id: '76b850b5985a4ed78d6c9bac371db163',
      stationId: 'f359c719af4a4512a3050747e56ad366',
      stationPositionName: '1号点位',
      status: '4',
      createDate: '2019-05-15 22:43',
      address: '1楼监控中心配电箱',
      powerFlg: '1',
      remark: null,
      messageFlg: '1',
    },
    {
      id: 'd81b3c7fdee84f2a9be103c9ac3cbeb5',
      stationId: 'f359c719af4a4512a3050747e56ad366',
      stationPositionName: '2号点位',
      status: '4',
      createDate: '2019-05-15 22:45',
      powerFlg: '2',
      address: '负一楼配电箱',
      remark: null,
      messageFlg: '1',
    },
  ],
  org: [
    {
      id: '1',
      parentId: '',
      parentName: null,
      orgName: '平台',
      orgType: '1',
      remark: null,
      delFlg: '0',
      createDate: '2019-06-01 08:09:00',
    },
    {
      id: '2',
      parentId: '1',
      parentName: '平台',
      orgName: '代理1',
      orgType: '2',
      remark: null,
      delFlg: '0',
      createDate: '2019-06-01 08:09:00',
    },
    {
      id: '3',
      parentId: '1',
      parentName: '平台1',
      orgName: '代理2',
      orgType: '2',
      remark: null,
      delFlg: '0',
      createDate: '2019-06-01 08:09:00',
    },
    {
      id: 'dfb07e2b51784a5ea41c6d08378115b5',
      parentId: '1',
      parentName: '平台',
      orgName: '四川代理',
      orgType: '2',
      remark: '四川代理',
      delFlg: '0',
      createDate: '2019-06-30 14:45:18',
    },
    {
      id: 'e3ffe08c575a4d31abde66c9c15f344e',
      parentId: '1',
      parentName: '平台',
      orgName: '代理3',
      orgType: '2',
      remark: '3',
      delFlg: '0',
      createDate: '2019-06-29 08:40:30',
    },
    {
      id: '7776406f504e4ddf8cab4f8514ff50c2',
      parentId: '3',
      parentName: '代理21',
      orgName: '点位333',
      orgType: '3',
      remark: '6666666',
      delFlg: '0',
      createDate: '2019-06-01 16:44:46',
    },
    {
      id: '21950d7ed3b144f3984c1034ec64659c',
      parentId: 'dfb07e2b51784a5ea41c6d08378115b5',
      parentName: '四川代理',
      orgName: '成都代理',
      orgType: '2',
      remark: '成都代理',
      delFlg: '0',
      createDate: '2019-06-30 14:45:40',
    },
    {
      id: '760bb06814e24f05b94101c7b71bcb6f',
      parentId: '21950d7ed3b144f3984c1034ec64659c',
      parentName: '成都代理',
      orgName: '银泰集团',
      orgType: '3',
      remark: '成都代理',
      delFlg: '0',
      createDate: '2019-06-30 14:45:55',
    },
    {
      id: '348feb80e5e3415986028f0c3609e3bb',
      parentId: '760bb06814e24f05b94101c7b71bcb6f',
      parentName: '银泰集团',
      orgName: '银泰城',
      orgType: '3',
      remark: '银泰城',
      delFlg: '0',
      createDate: '2019-06-30 14:46:12',
    },
    {
      id: '13e1d7566ae34d79b4fea571e97965c4',
      parentId: '348feb80e5e3415986028f0c3609e3bb',
      parentName: '银泰城',
      orgName: '银泰城员工宿舍',
      orgType: '3',
      remark: '银泰城员工宿舍',
      delFlg: '0',
      createDate: '2019-06-30 14:46:42',
    },
    {
      id: 'd6b162a1ecfb43c592ad8989705c951b',
      parentId: '13e1d7566ae34d79b4fea571e97965c4',
      parentName: '银泰城员工宿舍',
      orgName: '银泰城员工宿舍1号楼',
      orgType: '3',
      remark: '银泰城员工宿舍',
      delFlg: '0',
      createDate: '2019-06-30 22:08:50',
    },
  ],
  station: [
    {
      id: '477fca8d731946b3ab754f7d094a1665',
      stationName: '0000',
      address: '0000',
      addressDetail: '0000',
      remark: '0000',
      status: '1',
      createDate: '2019-07-16 09:57',
      contacts: null,
      orgId: '2',
    },
    {
      id: 'f359c719af4a4512a3050747e56ad366',
      stationName: '监控中心',
      address: '天府大道',
      addressDetail: '成都市高新区天府大道',
      remark: '测试站点',
      status: '4',
      createDate: '2019-05-15 22:42',
      contacts: null,
      orgId: '2',
    },
  ],
};
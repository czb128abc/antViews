import React from 'react';
import moment from 'moment';
import { Modal, Icon } from 'antd';
import routers from '../../config/router.config';

export function getDrawerConfig(props = {}) {
  const config = {
    closable: true,
    title: 'Drawer',
    width: 700,
    ...props,
  };
  return config;
}

export function getModalConfig(props = {}) {
  const config = {
    maskClosable: false,
    title: 'BaseModal',
    width: 700,
    ...props,
  };
  return config;
}

export function getModalFormTypeTitle(type) {
  const keyObj = {
    add: '新增',
    edit: '编辑',
    detail: '详情',
  };
  return keyObj[type] || '';
}

export const beginTimeStr = '00:00:00';
export const endTimeStr = '23:59:59';

export const momentFormat = {
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
  dateFormat: 'YYYY-MM-DD',
  dateFormatNoCenterline: 'YYYYMMDD',
  monthFormatNoCenterline: 'YYYYMM',
};

export function createMoment(dateStr, format) {
  return moment(dateStr, format);
}

/**
 *
 * @param {*} obj 获取对象类型
 * return "string" | "array" | "object" | "set" | "map" | "function" | "number"
 */
export function getType(obj) {
  const type = Object.prototype.toString
    .call(obj)
    .match(/^\[object (.*)\]$/)[1]
    .toLowerCase();
  if (type === 'string' && typeof obj === 'object') return 'object'; // Let "new String('')" return 'object'
  if (obj === null) return 'null'; // PhantomJS has type "DOMWindow" for null
  if (obj === undefined) return 'undefined'; // PhantomJS has type "DOMWindow" for undefined
  return type;
}

/**
 * 解析json字符串,期望返回 Object || Array
 * @param {String} str
 * @param {boolean} isArray
 */
export function parseJSON(str, isArray = true) {
  try {
    const result = JSON.parse(str);
    if (isArray && !Array.isArray(result)) {
      throw new Error('not array');
    }
    return result;
  } catch (e) {
    return isArray ? [] : {};
  }
}
/**
 * 判断为非空数组
 * @param {*} list
 */
export function notEmptyArray(list) {
  return Array.isArray(list) && list.length > 0;
}

export function isEmptyArray(list) {
  return Array.isArray(list) && list.length === 0;
}

let confirmModal = null;

export function showConfirmModal() {
  if (!confirmModal) {
    confirmModal = Modal.confirm({
      onOk: () => {
        confirmModal = null;
      },
      onCancel: () => {
        confirmModal = null;
      },
      title: '登陆已超时，请重新登陆!',
    });
  }
}

export function getFormValue(props) {
  const {
    form: { validateFields },
  } = props;
  return new Promise((resolve, reject) => {
    validateFields((errors, values) => {
      if (errors) {
        reject(errors);
      }
      resolve(values);
    });
  });
}

export function resetFields(props) {
  const {
    form: { resetFields: rest },
  } = props;
  rest();
}

/**
 * 计算两个list的 集合 交叉(add, noChange, remove) list项为 Object
 * @param {Array} leftList
 * @param {Array} rightList
 * @param {Object} param2
 */
export function calcObjectListCrossUnion(leftList, rightList, primaryKey = '') {
  const addList = [];
  const noChangeList = [];
  const removeList = [];

  // 临界值 判断
  if (leftList.length === 0) {
    return {
      addList: [...rightList],
      noChangeList,
      removeList,
    };
  }
  if (rightList.length === 0) {
    return {
      addList,
      noChangeList,
      removeList: [...leftList],
    };
  }

  const rightPrimaryKeySet = new Set();
  rightList.forEach((item) => {
    rightPrimaryKeySet.add(item[primaryKey]);
  });
  leftList.forEach((item) => {
    if (rightPrimaryKeySet.has(item[primaryKey])) {
      noChangeList.push(item);
      // 删除后, 剩下的就是 adds
      rightPrimaryKeySet.delete(item[primaryKey]);
    } else {
      removeList.push(item);
    }
  });

  rightList.forEach((item) => {
    if (rightPrimaryKeySet.has(item[primaryKey])) {
      addList.push(item);
    }
  });
  const result = {
    addList,
    removeList,
    noChangeList,
  };
  console.log('calcObjectListCrossUnion result', result);
  return result;
}

export function getConfigMenus(temList = JSON.parse(JSON.stringify(routers)), parent = {}) {
  const menus = [];
  temList.forEach((item) => {
    if (!item.redirect) {
      const { path, name, icon = '' } = item;
      menus.push({
        parentKey: parent.path || '',
        parentPath: parent.path || '',
        parentTitle: parent.name || '',
        path,
        title: name,
        icon,
        key: path,
      });
    }
    if (Array.isArray(item.routes)) {
      menus.push(...getConfigMenus(item.routes, item));
    }
  });
  return menus;
}

export function arrayToTree(list, parent = { id: 0 }, childAttr = 'id', parentAttr = 'parentId') {
  const treeNodes = [];
  const otherList = [];
  list.forEach((item) => {
    if (item[parentAttr] === parent[childAttr]) {
      treeNodes.push(item);
    } else {
      otherList.push(item);
    }
  });

  if (!isEmptyArray(treeNodes)) {
    treeNodes.forEach((child, index) => {
      // 递归算出 sub children
      const subList = arrayToTree(otherList, child, childAttr, parentAttr);
      if (!isEmptyArray(subList)) {
        treeNodes[index].children = subList;
      }
    });
  }
  return treeNodes;
}

export function arrayToTreeIncludeSelf(
  list,
  parent = { id: 0 },
  childAttr = 'id',
  parentAttr = 'parentId',
) {
  const subTreeData = arrayToTree(list, parent, childAttr, parentAttr);
  const treeList = [];
  list.forEach((item) => {
    if (parent[childAttr] === item[childAttr]) {
      treeList.push({
        ...item,
        children: subTreeData,
      });
    }
  });
  console.log('TCL: treeList', treeList);
  return treeList;
}

export function getConfigMenuTrees() {
  const menus = getConfigMenus();
  return arrayToTree(menus, { key: '' }, 'key', 'parentKey');
}

export function listToObjectMap(list = [], fieldKey = 'id') {
  const objMap = {};
  list.forEach((item) => {
    const key = item[fieldKey];
    objMap[key] = item;
  });
  return objMap;
}

export function removeEmptyFields(obj) {
  const keys = Object.keys(obj);
  const newObj = {};
  keys.forEach((key) => {
    const value = obj[key];
    let isRemove = false;
    if (value === null) {
      isRemove = true;
    } else if (typeof value === 'string' && value === '') {
      isRemove = true;
    } else if (Array.isArray(value) && !notEmptyArray(value)) {
      isRemove = true;
    }
    if (!isRemove) {
      newObj[key] = value;
    }
  });
  return newObj;
}

const iconMap = {
  stationPosition: <Icon type="environment" />,
  station: <Icon type="gold" />,
  org: <Icon type="team" />,
};

export function calcOrgAndStationPositionTreeList(data, orgId) {
  const { org = [], station = [], stationPosition = [] } = data;
  const treeSources = [];
  // the org
  org.forEach((item) => {
    const type = 'org';
    const node = {
      data: item,
      id: `${type}_${item.id}`,
      key: `${type}_${item.id}`,
      value: `${type}_${item.id}`,
      icon: iconMap[type],
      isLeaf: false,
      type,
      title: item.orgName,
      parentId: `org_${item.parentId}`,
    };
    treeSources.push(node);
  });

  // the station
  station.forEach((item) => {
    const type = 'station';
    const node = {
      data: item,
      id: `${type}_${item.id}`,
      key: `${type}_${item.id}`,
      value: `${type}_${item.id}`,
      icon: iconMap[type],
      type,
      title: item.stationName,
      parentId: `org_${item.orgId}`,
    };
    treeSources.push(node);
  });

  // the stationPosition
  stationPosition.forEach((item) => {
    const type = 'stationPosition';
    const node = {
      data: item,
      id: `${type}_${item.id}`,
      key: `${type}_${item.id}`,
      value: `${type}_${item.id}`,
      icon: iconMap[type],
      type,
      title: item.stationPositionName,
      parentId: `station_${item.stationId}`,
    };
    treeSources.push(node);
  });

  const treeList = arrayToTreeIncludeSelf(treeSources, { id: `org_${orgId}` }, 'id', 'parentId');
  return treeList;
}

export function strFormat(str = '', partitionLength = 4, partitionStr = ',') {
  const ruleObj = {
    3: /\B(?=(\d{3})+(?!\d))/g,
    4: /\B(?=(\d{4})+(?!\d))/g,
    2: /\B(?=(\d{2})+(?!\d))/g,
  };
  return `${str}`.replace(ruleObj[partitionLength], partitionStr);
}

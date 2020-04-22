/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-else-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import moment from 'moment';

// 获取随机整数
export function randomNum(start, end) {
  return Math.round(Math.random() * (end - start)) + start;
}

// 从数组中随机去一个元素
export function randomItem(list, itemNum = 1) {
  if (itemNum > 1) {
    const newList = new Set();
    while (newList.size < itemNum) {
      newList.add(list[randomNum(0, list.length - 1)]);
    }
    return Array.from(newList);
  } else {
    return list[randomNum(0, list.length - 1)];
  }
}

export function randomTitle(start, end = start) {
  const length = randomNum(start, end);
  let title = '';
  for (let i = 0; i < length; i++) {
    title += String.fromCharCode(randomNum(19968, 19968 + 500));
  }
  return title;
}

export function randomDate(start = 0, end = Date.now()) {
  return randomNum(start, end);
}

export function randomLetter(start, end = start) {
  const length = randomNum(start, end);
  let title = '';
  for (let i = 0; i < length; i++) {
    title += String.fromCharCode(randomNum(65, 65 + 52));
  }
  return title;
}

export function randomLowerLetter(start, end = start) {
  const length = randomNum(start, end);
  let title = '';
  for (let i = 0; i < length; i++) {
    title += String.fromCharCode(randomNum(97, 122));
  }
  return title;
}

export function randomUpperLetter(start, end = start) {
  const length = randomNum(start, end);
  let title = '';
  for (let i = 0; i < length; i++) {
    title += String.fromCharCode(randomNum(65, 96));
  }
  return title;
}

// 根据条件过滤数据
export function filter(list, query) {
  let data = list;
  for (const [k] of Object.entries(query)) {
    if (!data.length) return data;
    data = data.filter(v => {
      if (typeof query[k] === 'string') {
        return !query[k] || `${v[k]}`.includes(query[k]);
      } else {
        return true;
      }
    });
  }
  return data;
}

export function getOperateData(success) {
  if (success) {
    return {
      code: 200,
      message: 'SUCCESS',
      data: {},
    };
  }
  return {
    code: 500,
    message: 'mock fail',
    data: {},
  };
}

export function getRequestParams(req) {
  const { body = {}, query = {} } = req;
  const param = {
    ...query,
    ...body,
  };
  return param;
}

export function sendListPage(req, res, dataList, field, filterCallBack) {
  const { body = {}, query = {} } = req;
  const param = {
    ...query,
    ...body,
  };
  console.log('param', param);
  const { pageNum = 1, current, pageSize = 1000, ...otherParam } = param;
  let list = filter(dataList, otherParam);
  if (typeof filterCallBack === 'function') {
    list = dataList.filter(filterCallBack);
  }
  const reslist = list.slice(
    pageSize * ((current || pageNum) - 1),
    pageSize * (current || pageNum),
  );
  const result = getOperateData(true);
  result[field] = reslist;
  result.pageInfo = {
    current: Number(current || pageNum),
    pageSize: Number(pageSize),
    total: list.length,
    totalPageSize: Math.ceil(list.length / pageSize),
  };
  res.send(result);
}

export function newArray(len) {
  const list = [];
  for (let i = 0; i < len; i++) {
    list.push(i);
  }
  return list;
}

export const momentFormat = {
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
  dateFormat: 'YYYY-MM-DD',
  dateFormatWithOutHorizontal: 'YYYYMMDD',
};

export function newMoment(dateStr, format) {
  return moment(dateStr, format);
}
export function newMomentList(
  itemNum,
  {
    isSubtract = true,
    keyShorthand = 'M',
    isFormatValue = true,
    format = momentFormat.dateTimeFormat,
  },
) {
  const list = newArray(itemNum);
  return list.map(i => {
    const mDate = moment();
    let newDate = mDate.subtract(keyShorthand, i);
    if (!isSubtract) {
      newDate = mDate.add(keyShorthand, i);
    }
    if (isFormatValue) {
      return newDate.format(format);
    }
    return newDate;
  });
}

export function findInList(req, list, keys) {
  const { body = {}, query = {} } = req;
  const param = {
    ...query,
    ...body,
  };
  const findObj = list.find(item => {
    let isFind = false;
    keys.forEach(k => {
      if (`${param[k]}` === `${item[k]}`) {
        isFind = true;
      }
    });
    return isFind;
  });
  if (findObj) {
    return findObj;
  }
  return list[0];
}

import moment from 'moment';

export const beginTimeStr = '00:00:00';
export const endTimeStr = '23:59:59';

export const format = {
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  time: 'HH:mm:ss',
  date: 'YYYY-MM-DD',
  dateNoCenterline: 'YYYYMMDD',
  monthNoCenterline: 'YYYYMM',
};

export function newMoment(...args) {
  return moment(...args);
}

// 不可选择的日期
export function disableMonthInPicker(currentDate) {
  // 本月最后一天
  const mLastDayOfTheMonth = moment()
    .month(moment().month())
    .endOf('month');
  if (currentDate.isAfter(mLastDayOfTheMonth)) {
    return true;
  }
  if (currentDate.isBefore('2019-11-01')) {
    return true;
  }
  return false;
}

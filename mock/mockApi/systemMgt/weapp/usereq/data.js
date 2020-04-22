import { newArray, randomItem } from '../../../util';
// eslint-disable-next-line import/named

export const keyMap = {};

const num = 20;
// const groupNames = newArray(num).map(i=> )
export const list = newArray(num).map(i => {
  const obj = {
    stationPositionId: `23f59af17af1408abb1f70eb22af2846_${i}`,
    stationPositionName: `天府广场第一个点位111_${i} `,
    powerFlg: randomItem(['1', '2']),
    powerDown: randomItem(['10', '20', '50']),
    remark: 'remark123',
  };
  return obj;
});

import { getOperateData, randomItem, newArray } from '../../../util';

import { list } from './data';

console.log('TCL: list', list);

export default {
  'POST /api/statistical/budget': (req, res) => {
    const data = getOperateData(true);
    const dateList = newArray(29).map(item => `2019-11-${`${item + 1}`.padStart(2, '0')}`);
    const arryFunc = index => {
      return dateList.map(item => {
        const mapObj = {
          0: randomItem([2, 5, 6, 3, 9]),
          1: randomItem([100, 5, 6, 30, 80]),
          2: randomItem([20, 50, 60, 30, 90]),
          3: randomItem([24, 54, 64, 34, 9]),
          4: randomItem([28, 58, 68, 38, 89]),
        };
        return {
          date: item,
          value: mapObj[index] + 0.88,
        };
      });
    };
    data.data = {
      rechargeAmount: [
        // 充值金额
        ...arryFunc(0),
      ],
      parkIncome: [
        // 停车收入
        ...arryFunc(1),
      ],
      chargeCost: [
        // 充电成本
        ...arryFunc(2),
      ],
      chargeProfit: [
        // 充电利润
        ...arryFunc(3),
      ],
      chargeIncome: [
        // 充电收入
        ...arryFunc(4),
      ],
    };
    res.send(data);
  },
  'GET  /api/statistical/summary': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      rechargeAmount: {
        // 总充值额
        summaryAmount: 21265.0,
        averageAmount: 5000.33,
      },
      consumeAmount: {
        // 总消费金额
        summaryAmount: 21265.0,
        averageAmount: 5000.33,
      },
      userCount: {
        // 用户总数
        summaryAmount: 5000,
        averageAmount: 20,
      },
      consumeCount: {
        // 总消费笔数
        summaryAmount: 21265.0,
        averageAmount: 5000.33,
      },
    };
    res.send(data);
  },
};

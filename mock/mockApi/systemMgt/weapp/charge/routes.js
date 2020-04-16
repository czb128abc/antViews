/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import {
  getOperateData,
  getRequestParams,
  randomItem,
  newMoment,
  momentFormat,
  newArray,
} from '../../../util';

import { chargeDataDetailList } from './data';

export default {
  // 查询用户充电完成但未支付的订单（用户每次充电前调用，判断上次订单是否完成）
  'GET /sitemonitor-charge/api/sitemonitor/charge/queryUnpaidOrder': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      id: '71df7bd37bfd40d4a4f1acca4c5a6348',
      userId: 'e83910f7ce9049dfb995b29b2d921510',
      stationId: '81330006f6514e6fae2e70f6a246170e',
      stationName: '银泰城宿舍1号楼',
      positionId: 'cd48d4d436484232a8f71a5f10c6069a',
      positionName: '1-1-101',
      macNo: '81',
      soltNum: '1',
      chargeType: '4',
      startDate: 1568783574000,
      estimatedEndDate: 1568812374000,
      endDate: 1568812374000,
      money: 5,
      powerMoney: 100,
      payFlg: '0',
    };
    res.send(data);
  },
  'GET /sitemonitor-charge/api/sitemonitor/charge/queryChargeOrderDetail': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      id: '71df7bd37bfd40d4a4f1acca4c5a6348',
      userId: 'e83910f7ce9049dfb995b29b2d921510',
      stationId: '81330006f6514e6fae2e70f6a246170e',
      stationName: '银泰城宿舍1号楼',
      positionId: 'cd48d4d436484232a8f71a5f10c6069a',
      positionName: '1-1-101',
      macNo: '81',
      soltNum: '1',
      chargeType: '4',
      startDate: 1568783574000,
      estimatedEndDate: 1568812374000,
      endDate: 1568812374000,
      money: 5,
      powerMoney: 6666,
      payFlg: '0',
    };
    res.send(data);
  },

  // 查询用户当前正进行中的充电订单（充电页面显示给用户查看，需前台计算）
  'GET /sitemonitor-charge/api/sitemonitor/charge/queryNowOrder': (req, res) => {
    const data = getOperateData(true);
    const now = newMoment();
    const startDate = newMoment()
      .subtract(1, 'm')
      .clone();
    const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
    const estimatedEndDate = newMoment()
      .add(1, 'm')
      .clone();
    console.log('------------------->');
    console.log('TCL: now', now.format(dateTimeFormat));
    console.log('TCL: startDate', startDate.format(dateTimeFormat));
    console.log('TCL: estimatedEndDate', estimatedEndDate.format(dateTimeFormat));

    data.data = {
      chargeOrder: {
        id: '71df7bd37bfd40d4a4f1acca4c5a6348',
        userId: 'e83910f7ce9049dfb995b29b2d921510',
        stationId: '81330006f6514e6fae2e70f6a246170e',
        stationName: '银泰城宿舍1号楼',
        positionId: 'cd48d4d436484232a8f71a5f10c6069a',
        positionName: '1-1-101',
        macNo: '81',
        soltNum: '1',
        chargeType: '4',
        startDate: startDate.toDate().getTime(), // 开始时间
        estimatedEndDate: estimatedEndDate.toDate().getTime(), // 预计结束时间
        endDate: null,
        money: null,
        powerMoney: null,
        payFlg: '0',
      },
      nowPower: '2.45', // 当前功率（kw/h）
      nowMoneyPrice: '1.0', // 人民币单价（元/分钟）
      nowPowerMoneyPrice: '2.0', // 能量豆单价（个/分钟）
    };
    res.send(data);
  },

  // 查询用户当前可以购买的能量包
  'GET /sitemonitor-charge/api/sitemonitor/charge/queryPowerMoneyTemplate': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      id: '1',
      powerType: randomItem(['1', '2']), // 1.基础包  2.扩展包
      money: 30, // 金额
      powerMoney: 4500, // 能量豆
      dyas: 30, // 有效期
    };
    res.send(data);
  },
  // 扫码查询插座信息
  'GET /sitemonitor-charge/api/sitemonitor/charge/querySlotDetails': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      stationId: '81330006f6514e6fae2e70f6a246170e',
      stationName: '银泰城宿舍1号楼',
      positionId: 'cd48d4d436484232a8f71a5f10c6069a',
      positionName: '1-1-101',
      slotNum: '4',
      nowPower: 250, // 当前功率
      moneyUnitPrice: 0.5, // 预计消耗金额（人民币   元/分钟）
      powerMoneyUnitPrice: 0.4, // //预计消耗金额（能量豆   能量豆/分钟）
    };
    res.send(data);
  },

  'POST /sitemonitor-charge/api/sitemonitor/charge/doCharge': (req, res) => {
    const data = getOperateData(true);
    data.data = '充电开始！';
    res.send(data);
  },

  'GET /sitemonitor-charge/api/sitemonitor/charge/closeCharge': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      payFlg: '1', // 支付状态，1-已支付，0-未支付
    };
    res.send(data);
  },
  'GET /sitemonitor-charge/api/sitemonitor/charge/queryChargeDataDetail': (req, res) => {
    const data = getOperateData(true);
    data.data = chargeDataDetailList;
    res.send(data);
  },

  // //////
  'GET /sitemonitor-charge/api/sitemonitor/charge/powerMoneyPayChargeOrder': (req, res) => {
    const data = getOperateData(true);
    data.message = '支付为 0 元';
    data.data = null;
    res.send(data);
  },
  'GET /sitemonitor-charge/api/sitemonitor/charge/moneyPayChargeOrder': (req, res) => {
    const data = getOperateData(false);
    data.message = '支付为 0 元';

    data.data = {
      appId: 'wxXXXXXXXXX', // 小程序id
      timestamp: '120934555', // 时间戳
      nonceStr: 'XXXXXXXXXXXX', // 随机字符串
      package: 'prepay_id= wx.....', // 包含预支付单id，固定格式
      signType: 'MD5', // 固定值
      paySign: '', // 签名
      businessId: '123456', // 业务ID
      orderNumber: '354666537334', // 微信支付订单ID
    };
    res.send(data);
  },
  'GET /sitemonitor-charge/api/sitemonitor/charge/updateOrderDone': (req, res) => {
    const data = getOperateData(true);
    data.data = null;
    res.send(data);
  },
  'GET /sitemonitor-charge/api/sitemonitor/charge/updateOrderCancel': (req, res) => {
    const data = getOperateData(true);
    data.data = null;
    res.send(data);
  },
  'GET /sitemonitor-charge/api/sitemonitor/charge/queryEquipmentState': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      id: 'xxxxxxx', // id
      equipmentId: '21212', // 设备编号
      leftNo: 101, // 左侧编号
      leftStatus: 'IDLE', // 左侧插口状态：IDLE-空闲，OPENED-已开启，CHARGING-充电中，OPENING-开启中，CLOSING-关闭中
      leftEnergy: '235.78', // 最近功率
      rightNo: 102, // 右侧编号
      rightStatus: 'IDLE',
      rightEnergy: '235.78', // 最近功率
      isGateway: false, // 是否是网关，true-是，false-否
      status: 'ONLINE', // 设备状态，ONLINE-在线，OFFLINE-离线
      isError: true, // 是否异常，true-是，false-否
      lastRefreshTime: '2020-01-08 14:42:11', // 最近状态刷新时间
      lastEnergy: '235.78', // 最近功率
    };
    res.send(data);
  },
  'POST /sitemonitor-charge/api/sitemonitor/charge/retry': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      id: 'xxxxxxx', // id
      equipmentId: '21212', // 设备编号
      leftNo: 101, // 左侧编号
      leftStatus: 'IDLE', // 左侧插口状态：IDLE-空闲，OPENED-已开启，CHARGING-充电中，OPENING-开启中，CLOSING-关闭中
      leftEnergy: '235.78', // 最近功率
      rightNo: 102, // 右侧编号
      rightStatus: 'CHARGING',
      rightEnergy: '235.78', // 最近功率
      isGateway: false, // 是否是网关，true-是，false-否
      status: 'ONLINE', // 设备状态，ONLINE-在线，OFFLINE-离线
      isError: true, // 是否异常，true-是，false-否
      lastRefreshTime: '2020-01-08 14:42:11', // 最近状态刷新时间
      lastEnergy: '235.78', // 最近功率
    };
    res.send(data);
  },

  'GET /sitemonitor-order/api/sitemonitor/order/consumerorder/findByUserId': (req, res) => {
    const data = getOperateData(true);
    const list = '1111111111111'.split('').map((_, index) => ({
      id: `5c11117467f24cdc94bc6834debc8b0f${index}`,
      userId: '2',
      wechatName: '2',
      phoneNumber: randomItem(['1', '2']),
      consumerType: index,
      money: randomItem(['11', '21']),
      createDate: newMoment().format(momentFormat.dateTimeFormat),
      createTime: newMoment().format(momentFormat.dateTimeFormat),
      stationId: '2',
      stationName: '2',
      orderId: `5c11117467f24cdc94bc6834debc8b0f${index}`,
    }));
    data.data = list;
    res.send(data);
  },
  'GET /sitemonitor-order/api/sitemonitor/order/rechargeorder/findByUserId': (req, res) => {
    const data = getOperateData(true);
    const list = '1111111111111'.split('').map((_, index) => ({
      id: `5c11117467f24cdc94bc6834debc8b0f${index}`,
      userId: '2',
      wechatName: '2',
      phoneNumber: randomItem(['1', '2']),
      rechargeType: index,
      money: randomItem(['11', '21']),
      createDate: newMoment().format(momentFormat.dateTimeFormat),
      createTime: newMoment().format(momentFormat.dateTimeFormat),
      stationId: '2',
      stationName: '2',
    }));
    data.data = list;
    res.send(data);
  },
};

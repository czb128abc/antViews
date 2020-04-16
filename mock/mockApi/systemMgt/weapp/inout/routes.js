/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import {
  getOperateData,
  getRequestParams,
  randomItem,
  newMoment,
  momentFormat,
  sendListPage,
} from '../../../util';
import { list, inoutLogList } from './data';

export default {
  // 查询用户当前存在的未支付订单
  'GET /sitemonitor-inout/api/sitemonitor/inout/queryUnpaidParkOrder': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      id: 'xxxx', // id
      userId: 'xxxxx', // 用户id
      stationId: 'xxxxx', // 站点id
      stationName: 'xxxxx', // 站点名称
      createDate: '2019-10-13', // 创建日期
      createTime: '2019-10-13 11:35:11', // 创建时间
      freeTimes: 2, // 剩余免费次数
      money: 12.0, // 订单金额
      payFlg: '0', // 支付状态,0-未支付,1-已支付
    };
    res.send(data);
  },
  // 分页查询用户订单
  'GET /sitemonitor-inout/api/sitemonitor/inout/findParkOrderByPage': (req, res) => {
    sendListPage(req, res, list, 'data', () => true);
  },
  'GET /sitemonitor-inout/api/sitemonitor/inout/findInoutLogByPage': (req, res) => {
    sendListPage(req, res, inoutLogList, 'data', () => true);
  },

  // 通过订单id查询订单详细
  'GET /sitemonitor-inout/api/sitemonitor/inout/queryByParkOrderId': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      id: 'xxxx', // id
      userId: 'xxxxx', // 用户id
      stationId: 'xxxxx', // 站点id
      stationName: 'xxxxx', // 站点名称
      createDate: '2019-10-13', // 创建日期
      createTime: '2019-10-13 11:35:11', // 创建时间
      freeTimes: 2, // 剩余免费次数
      money: 12.0, // 订单金额
      payFlg: '0', // 支付状态,0-未支付,1-已支付
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
  'GET /sitemonitor-charge/api/sitemonitor/charge/queryTemplateByStationId': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      serviceFee: {
        stationId: '212',
        isServiceFee: true,
        money: 0.3,
        powerMoney: 50,
      },
      chargeFeeTempleList: [
        {
          id: '13f9c7e7f95b47bdbadf068c09b65434',
          formPower: '12',
          toPower: '1234',
          money: 0,
          powerMoney: 10,
          stationId: 'f61675e2efaf4fa18a49acc939e6274c',
          stationName: 'stationNamexx',
        },
        {
          id: 'da5d25142bb04b8483afa70104b1ab9d',
          formPower: '1',
          toPower: '10',
          money: 1,
          powerMoney: 2,
          stationId: 'f61675e2efaf4fa18a49acc939e6274c',
          stationName: 'stationName德刚',
        },
      ],
    };
    res.send(data);
  },
  // 临时停车-进门
  'POST /sitemonitor-inout/api/sitemonitor/inout/inTempPark': (req, res) => {
    const { forceOpen } = getRequestParams(req);
    console.log('TCL: forceOpen', forceOpen);
    const data = getOperateData(true);
    data.data = { isShowConfirm: false, message: '进门成功' };
    if (!forceOpen) {
      data.data = {
        isShowConfirm: true,
        message: '临停开门：X元/天。\n \n 付费后当天可进出3次，超时或超过次数将重新付费。',
      };
    }
    res.send(data);
  },
  //
  'POST /sitemonitor-inout/api/sitemonitor/inout/outTempPark': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      appId: 'wxXXXXXXXXX', // 小程序id
      timestamp: '120934555', // 时间戳
      nonceStr: 'XXXXXXXXXXXX', // 随机字符串
      package: 'prepay_id= wx.....', // 包含预支付单id，固定格式
      signType: 'MD5', // 固定值
      paySign: '', // 签名
      businessId: '123456', // 业务ID
      orderNumber: '354666537334', // 微信支付订单ID
      extParam: {
        overDays: 1, // 超期天数,更新订单时需要回传
        overMoney: 12.0, // 超期金额,更新订单时需要回传
        macSn: '253155592', // macSn,更新订单时需要回传
        openType: 'in', // 开门类型，in-进门，out-出门
      },
    };
    res.send(data);
  },

  // 更新订单已支付接口
  'GET /sitemonitor-inout/api/sitemonitor/inout/updateParkOrderDone': (req, res) => {
    const data = getOperateData(true);
    data.data = '更新订单为已支付成功';
    res.send(data);
  },
  // 查询用户充电订单详情
  'GET /sitemonitor-charge/api/sitemonitor/charge/queryByChargeOrderId': (req, res) => {
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
      powerMoney: 6,
      payFlg: '0',
    };
    res.send(data);
  },
};

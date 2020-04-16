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
  /**
   * 用户电卡绑定
   */
  // 查询当前用户绑定电卡情况
  'GET /sitemonitor-user/api/sitemonitor/chargebinding/findByUserId': (req, res) => {
    const data = getOperateData(true);
    data.data = [
      {
        id: '1',
        chargeKey: '123123', // 电卡卡号
        userId: 'aerwerwer',
        phoneNumber: '15928603739',
        wechatName: '欧阳辉辉',
        nickName: '妻子的卡',
        bindingTime: '2019-10-10 12:00:00', // 绑定时间
        crateTime: '2019-10-10 12:00:00', // 创建时间
      },
      {
        id: '2',
        chargeKey: '1231232', // 电卡卡号
        userId: 'aerwerwer',
        phoneNumber: '15928603739',
        wechatName: '欧阳辉辉',
        nickName: '妻子的卡',
        bindingTime: '2019-10-10 12:00:00', // 绑定时间
        crateTime: '2019-10-10 12:00:00', // 创建时间
      },
      {
        id: '1',
        chargeKey: '1231233', // 电卡卡号
        userId: 'aerwerwer',
        phoneNumber: '15928603739',
        wechatName: '欧阳辉辉',
        nickName: '妻子的卡',
        bindingTime: '2019-10-10 12:00:00', // 绑定时间
        crateTime: '2019-10-10 12:00:00', // 创建时间
      },
    ];
    res.send(data);
  },
  // 保存当前用户电卡绑定
  'POST /sitemonitor-user/api/sitemonitor/chargebinding/save': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /sitemonitor-user/api/sitemonitor/chargebinding/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  /**
   * 用户替人缴费
   */
  'GET /sitemonitor-user/api/sitemonitor/agentrecharge/findByBind': (req, res) => {
    const data = getOperateData(true);
    const { chargeKey } = getRequestParams(req);
    data.data = {
      // 返回类型，1-正常情况，手机号卡号能对上，正常充值
      //        2-用户存在，卡号未被绑定，可以绑定卡号
      //        3-用户不存在，卡号未被绑定，创建用户绑定卡号
      type: chargeKey === '11' ? 1 : 2,
      result: {
        chargeKey: '123123', // 电卡卡号
        phoneNumber: '15928603739',
        userName: '欧阳辉辉',
      },
    };
    res.send(data);
  },
  'POST /sitemonitor-user/api/sitemonitor/agentrecharge/binding': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'GET /sitemonitor-user/api/sitemonitor/agentrecharge/creatOrder': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      appId: 'wxXXXXXXXXX', // 小程序id
      timestamp: '120934555', // 时间戳
      nonceStr: 'XXXXXXXXXXXX', // 随机字符串
      package: 'prepay_id= wx.....', // 包含预支付单id，固定格式
      signType: 'MD5', // 固定值
      paySign: '', // 签名
      businessId: '11111', // 业务订单id
      orderNumber: '201909210154618', // 订单号
    };
    res.send(data);
  },
  'POST /sitemonitor-user/api/sitemonitor/agentrecharge/updateOrderDone': (req, res) => {
    const data = getOperateData(true);
    data.data = '更新订单为已支付成功';
    res.send(data);
  },
};

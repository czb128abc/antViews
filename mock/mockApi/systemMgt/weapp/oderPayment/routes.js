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

export default {
  'GET /sitemonitor-user/api/sitemonitor/order/creatOrder': (req, res) => {
    const data = getOperateData(true);
    const queryParams = getRequestParams(req);
    const wpData = {
      appId: 'wxXXXXXXXXX', // 小程序id
      timestamp: '120934555', // 时间戳
      nonceStr: 'XXXXXXXXXXXX', // 随机字符串
      package: 'prepay_id= wx.....', // 包含预支付单id，固定格式
      signType: 'MD5', // 固定值
      paySign: '', // 签名
      businessId: '11111', // 业务订单id
      orderNumber: '201909210154618', // 订单号
      extParam1: '现金充值：20.00', // 备注 替人缴费现金充值：20.00
    };
    data.data = '支付成功';
    if (queryParams.payType === 'wp') {
      data.data = wpData;
    }

    res.send(data);
  },
  'GET /sitemonitor-user/api/sitemonitor/order/updateOrderDone': (req, res) => {
    const data = getOperateData(true);
    data.data = '更新订单支付状态为已支付成功';
    res.send(data);
  },
  'GET /sitemonitor-user/api/sitemonitor/order/deleteOrder': (req, res) => {
    const data = getOperateData(true);
    data.data = '删除成功';
    res.send(data);
  },
  'GET /sitemonitor-charge/api/sitemonitor/charge/moneyPayChargeOrder': (req, res) => {
    const data = getOperateData(true);
    const queryParams = getRequestParams(req);
    const wpData = {
      appId: 'wxXXXXXXXXX', // 小程序id
      timestamp: '120934555', // 时间戳
      nonceStr: 'XXXXXXXXXXXX', // 随机字符串
      package: 'prepay_id= wx.....', // 包含预支付单id，固定格式
      signType: 'MD5', // 固定值
      paySign: '', // 签名
      businessId: '11111', // 业务订单id
      orderNumber: '201909210154618', // 订单号
      extParam1: '现金充值：20.00', // 备注 替人缴费现金充值：20.00
    };
    data.data = '支付成功';
    if (queryParams.payType === 'wp') {
      data.data = wpData;
    }

    res.send(data);
  },
};

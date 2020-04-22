/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import { getOperateData, getRequestParams, randomItem } from '../../../util';

export default {
  // 查询账户余额
  'GET /sitemonitor-user/api/sitemonitor/user/balance': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      endDate: '2019-10-10', // 过期时间
      powerMoney: '6000.00', // 能量豆
      money: '100',
    };
    res.send(data);
  },
  // 查询指定ID余额订单数据
  'GET /sitemonitor-user/api/sitemonitor/powermoney/queryBalanceOrderById': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      id: '7ad0fd9ee1c54953a78a24a174b97667',
      userId: 'e83910f7ce9049dfb995b29b2d921510',
      wechatName: '刘德刚',
      powerMoney: 4500,
      powerType: '1',
      createDate: 1568207538000,
      endDate: '2019-09-09',
      payFlg: '1',
    };
    res.send(data);
  },
  // 查询用户当前可以购买的能量包
  'GET /sitemonitor-user/api/sitemonitor/powermoney/queryPowerMoneyTemplate': (req, res) => {
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
  // 更新订单支付状态为已支付
  'GET /sitemonitor-user/api/sitemonitor/powermoney/updateOrderDone': (req, res) => {
    const data = getOperateData(true);
    data.data = '更新订单支付状态为已支付成功';
    res.send(data);
  },

  // 更新订单支付状态删除充值订单（用户取消充值或充值失败调用）为已支付
  'GET /sitemonitor-user/api/sitemonitor/powermoney/deleteOrder': (req, res) => {
    const data = getOperateData(true);
    data.data = '删除成功';
    res.send(data);
  },

  // 下单生成预付款订单
  'GET /sitemonitor-user/api/sitemonitor/powermoney/creatOrder': (req, res) => {
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
      extParam1: '现金充值：20.00', // 备注 替人缴费现金充值：20.00
    };

    res.send(data);
  },
  // 下单生成现金预付款订单(五期新增）
  'GET /sitemonitor-user/api/sitemonitor/money/creatOrder': (req, res) => {
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
      extParam1: '现金充值：20.00', // 备注 替人缴费现金充值：20.00
    };

    res.send(data);
  },
  // 更新订单支付状态为已支付
  'GET /sitemonitor-user/api/sitemonitor/money/updateOrderDone': (req, res) => {
    const data = getOperateData(true);
    data.data = '更新订单支付状态为已支付成功';
    res.send(data);
  },

  // 更新订单支付状态删除充值订单（用户取消充值或充值失败调用）为已支付
  'GET /sitemonitor-user/api/sitemonitor/money/deleteOrder': (req, res) => {
    const data = getOperateData(true);
    data.data = '删除成功';
    res.send(data);
  },
  'GET /sitemonitor-user/api/sitemonitor/money/findRechargeTemplate': (req, res) => {
    const data = getOperateData(true);
    data.data = [100, 50, 30, 20, 10, 5].map(item => ({
      id: `templateId_${item}`,
      money: item, // 金额
      isAction: item === 100, // 是否活动 false：否,true:是；
      donate: item / 10, // 赠送金额
    }));
    res.send(data);
  },
};

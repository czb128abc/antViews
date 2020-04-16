/* eslint-disable no-plusplus */
import { getOperateData, sendListPage, getRequestParams } from '../../../util';

import { list, orderConsumerList, orderRechargeList, chargeDataList } from './data';

export default {
  'GET /api/userService/queryUserByPage': (req, res) => {
    sendListPage(req, res, list, 'data', () => true);
  },
  'GET /api/userService/queryUser': (req, res) => {
    const condition = getRequestParams(req);
    const data = getOperateData(true);
    const user = list.find(item => item.id === condition.userId);
    if (user) {
      data.data = user;
    }
    res.send(data);
  },
  'GET /api/userService/queryOrderConsumerByPage': (req, res) => {
    sendListPage(req, res, orderConsumerList, 'data', () => true);
  },
  'GET /api/userService/queryOrderRechargeByPage': (req, res) => {
    sendListPage(req, res, orderRechargeList, 'data', () => true);
  },

  'GET /api/userService/queryUnPayChargeOrders': (req, res) => {
    const data = getOperateData(true);
    data.data = [
      {
        id: 'id', //
        userId: 'xx', // 用户id
        wechatName: 'ddd', // 用户昵称
        phoneNumber: '13333333', // 用户手机号
        stationId: 'xxx', // 站点id
        stationName: 'xxx', // 站点名称
        positionId: 'xx', // 点位ID
        positionName: 'xxx', // 点位名称
        macNo: '22222', // 设备编号
        soltNum: '1', // 插座号
        chargeType: '1', // 充电类型（1、一小时 2、3小时 3、6小时 4、 充满为止）
        startDate: '2109-11-23 05:36:11', // 充电开始时间
        estimatedEndDate: '2109-11-23 06:36:11', // 预计充电结束时间
        endDate: '2109-11-23 05:36:11', // 实际结束时间
        chargeMinutes: 60, // 充电时长（分钟）
        money: '111.2', // 应付金额（人民币）
        powerMoney: '1150', // 应付金额（能量豆）
        realMoney: '1.2', // 实际支付金额（人民币）
        realPowerMoney: '0', // 实际支付金额（能量豆）
        payFlg: '1', // 支付标识（0.未支付 1.已支付）
        payType: '1', // 消费货币,1-人民币，2-能量豆
        startType: '1', // 开始类型，1-扫码，2-刷卡
        energyPower: '150', // 实际计算功率
        feeTempleId: 'xxx', // 收费模板id
        feeTempleMoney: '0.008', // 收费现金每分钟单价
        feeTemplePowerMoney: '1.2', // 收费能量豆每分钟单价
      },
    ];
    res.send(data);
  },
  'GET /api/userService/queryChargeOrder': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      id: 'id', //
      userId: 'xx', // 用户id
      wechatName: 'ddd', // 用户昵称
      phoneNumber: '13333333', // 用户手机号
      stationId: 'xxx', // 站点id
      stationName: 'xxx', // 站点名称
      positionId: 'xx', // 点位ID
      positionName: 'xxx', // 点位名称
      macNo: '22222', // 设备编号
      soltNum: '1', // 插座号
      chargeType: '1', // 充电类型（1、一小时 2、3小时 3、6小时 4、 充满为止）
      startDate: '2109-11-23 05:36:11', // 充电开始时间
      estimatedEndDate: '2109-11-23 06:36:11', // 预计充电结束时间
      endDate: '2109-11-23 05:36:11', // 实际结束时间
      chargeMinutes: 60, // 充电时长（分钟）
      money: '1.2', // 应付金额（人民币）
      powerMoney: '50', // 应付金额（能量豆）
      realMoney: '1.2', // 实际支付金额（人民币）
      realPowerMoney: '0', // 实际支付金额（能量豆）
      payFlg: '1', // 支付标识（0.未支付 1.已支付）
      payType: '1', // 消费货币,1-人民币，2-能量豆
      startType: '1', // 开始类型，1-扫码，2-刷卡
      energyPower: '150', // 实际计算功率
      feeTempleId: 'xxx', // 收费模板id
      feeTempleMoney: '0.008', // 收费现金每分钟单价
      feeTemplePowerMoney: '1.2', // 收费能量豆每分钟单价
      closeType: 'MOBILE', // 订单关闭类型，参考枚举值
    };
    res.send(data);
  },
  'GET /api/userService/queryUserCarInfo': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      id: '1111111111111111', // 主键id
      stationId: '', // 站点id
      stationName: '', // 站点名称
      icCardNo: 'icCardNo', // id卡号
      rfidCardNo: 'rfidCardNo', // rfid卡号
      userId: '', // 用户id
      vehicleTypeId: '', // 车辆类型
      vehicleTypeName: '', // 车辆名称
      phoneNumber: 'phoneNumber', // 电话号码
      wechatName: '', // 微信名称
      bindingTime: '', // 绑定时间
      endingTime: 'endingTime', // 过期时间
      stationNum: '2', // 绑定站点数
    };
    res.send(data);
  },
  'POST /api/userService/updatePowerMoneyEndTime': (req, res) => {
    const data = getOperateData(true);
    data.data = '转换成功';
    res.send(data);
  },
  'POST /api/userService/updateUserVehiclerType': (req, res) => {
    const data = getOperateData(true);
    data.data = '转换成功';
    res.send(data);
  },
  'POST /api/userService/updateUserBindingEndingTime': (req, res) => {
    const data = getOperateData(true);
    data.data = '转换成功';
    res.send(data);
  },
  'POST /api/userService/repower': (req, res) => {
    const data = getOperateData(true);
    data.data = '转换成功';
    res.send(data);
  },
  'GET /api/userService/queryChargeDataDetail': (req, res) => {
    const data = getOperateData(true);
    data.data = chargeDataList;
    res.send(data);
  },
  'POST /api/userService/moneyTransformPower': (req, res) => {
    const data = getOperateData(true);
    data.data = '转换成功';
    res.send(data);
  },
  'POST /api/userService/compensate': (req, res) => {
    const data = getOperateData(true);
    data.data = '补偿成功';
    res.send(data);
  },
};

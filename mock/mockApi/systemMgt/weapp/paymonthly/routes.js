/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import { getOperateData, getRequestParams, randomLetter } from '../../../util';

const prefix = '/sitemonitor-user/api/sitemonitor/paymonthly';
const prefix2 = '/sitemonitor-user/api/sitemonitor';

const getObj = days => ({
  id: randomLetter(1, 20),
  days,
  isAction: true,
  donate: days / 10,
  price: days / 2,
  stationId: '123', // 站点id
  stationName: 'zhandai', // 站点名称
});
export default {
  // 查询用户的停车收费模板
  [`GET ${prefix}/queryParkFeeTemple`]: (req, res) => {
    const data = getOperateData(true);
    data.data = [30, 60, 90, 360].map((days, index) => ({
      ...getObj(days),
      parkType: `${index + 1}`,
      isAction: days === 360,
    }));
    // data.data = [
    //   {
    //     id: '1', // 收费模板id
    //     stationId: '123', // 站点id
    //     stationName: 'zhandai', // 站点名称
    //     parkType: '2', // 30天
    //     price: '12', // 收费金额
    //   },
    //   {
    //     id: '2', // 收费模板id
    //     stationId: '123', // 站点id
    //     stationName: 'zhandai', // 站点名称
    //     parkType: '3', // 60天
    //     price: '12', // 收费金额
    //   },
    //   {
    //     id: '3', // 收费模板id
    //     stationId: '123', // 站点id
    //     stationName: 'zhandai', // 站点名称
    //     parkType: '4', // 90天
    //     price: '12', // 收费金额
    //   },
    // ];
    res.send(data);
  },
  // 查询当前用户包月到期时间和电子钥匙ID
  [`GET ${prefix}/expire`]: (req, res) => {
    const data = getOperateData(true);
    data.data = {
      icCardNo: '11323', // 用户绑定的电子钥匙ID
      endDate: '2019-09-19', // 包月到期时间
      vehicleTypeId: 'b82bd363584543f1900c091f31dca7e5',
      vehicleTypeName: '电瓶车',
      rfid: 'rfidxxx',
      stations: [
        {
          stationId: '123', // 站点id
          stationName: 'zhandai', // 站点名称
          endDate: '2019-09-19', // 包月到期时间
          stationAddr: '成都市天府5街益州大酒店1', // 站点地址
        },
        {
          stationId: '234', // 站点id
          stationName: 'tiandi', // 站点名称
          endDate: '2020-05-20', // 包月到期时间
          stationAddr: '成都市天府5街益州大酒店2', // 站点地址
        },
      ],
    };
    res.send(data);
  },

  [`POST ${prefix}/addStationsByDoorMac`]: (req, res) => {
    const data = getOperateData(true);
    data.data = '添加站点成功';
    res.send(data);
  },
  [`POST ${prefix}/removeStations`]: (req, res) => {
    const data = getOperateData(true);
    data.data = '移除站点成功';
    res.send(data);
  },
  // 用户绑定电子钥匙
  [`POST ${prefix}/binding`]: (req, res) => {
    const data = getOperateData(true);
    data.data = '绑定电子钥匙成功';
    res.send(data);
  },

  // 停车包月充值
  // 下单生成预付款订单
  [`GET ${prefix}/creatOrder`]: (req, res) => {
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
  // 查询指定ID包月充值订单数据
  [`GET ${prefix}/queryPayMonthlyOrderById`]: (req, res) => {
    const data = getOperateData(true);
    data.data = {
      id: '7ad0fd9ee1c54953a78a24a174b97667',
      userId: 'e83910f7ce9049dfb995b29b2d921510',
      createDate: 1568207538000,
      endDate: '2019-09-09',
      payMoney: '30',
      payFlg: '1',
    };
    res.send(data);
  },
  // 删除充值订单
  [`GET ${prefix}/deleteOrder`]: (req, res) => {
    const data = getOperateData(true);
    data.data = '删除成功';
    res.send(data);
  },
  // 更新订单支付状态为已支付
  [`GET ${prefix}/updateOrderDone`]: (req, res) => {
    const data = getOperateData(true);
    data.data = '更新订单支付状态为已支付成功';
    res.send(data);
  },

  [`POST ${prefix}/unbinding`]: (req, res) => {
    const data = getOperateData(true);
    const { icCardNo } = getRequestParams(req);
    data.data = '解绑电子钥匙成功!';
    res.send(data);
  },

  [`POST ${prefix}/unbindingRfid`]: (req, res) => {
    const data = getOperateData(true);
    const { icCardNo } = getRequestParams(req);
    data.data = '操作成功!';
    res.send(data);
  },
  [`POST ${prefix}/bindingRfid`]: (req, res) => {
    const data = getOperateData(true);
    const { icCardNo } = getRequestParams(req);
    data.data = '操作成功!';
    res.send(data);
  },

  /**
   * 替人缴纳停车费 部分
   */

  [`GET ${prefix2}/doorAgentRecharge/findByBind`]: (req, res) => {
    const data = getOperateData(true);
    const { icCardNo } = getRequestParams(req);
    console.log('TCL: icCardNo', icCardNo);
    data.data = {
      // 返回类型，1-正常情况，手机号卡号能对上，正常充值
      //        2-用户存在，卡号未被绑定，可以绑定卡号
      //        3-用户不存在，卡号未被绑定，创建用户绑定卡号
      type: icCardNo === '11' ? 1 : 2,
      result: {
        icCardNo, // 电卡卡号
        phoneNumber: '15928603739',
        userName: '欧阳辉辉',
        vehicleTypeId: '2222',
        vehicleTypeName: '电瓶车',
      },
    };
    res.send(data);
  },
  [`POST ${prefix2}/doorAgentRecharge/binding`]: (req, res) => {
    const data = getOperateData(true);
    const { icCardNo } = getRequestParams(req);
    data.data = '绑定成功!';
    res.send(data);
  },
};

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider } from 'antd';
import BaseModal from '@/components/base/BaseModal';
import DescriptionList from '@/components/DescriptionList';
import { newMoment } from '@/utils/processMomentData';

const { Description } = DescriptionList;

const startTypeMap = {
  1: '扫码',
  2: '刷卡',
};
const closeTypeMap = {
  MOBILE: '手机关闭',
  DEVICE_DO: '设备主动自停',
  DEVICE_DONE: '设备被动自停',
  OVER_TIME: '超时',
  OVER_ACCOUNT: '超额',
  CONTINUE_LOWER: '连续低功率关闭',
};

export default class ChargeTypeConsumerOrderDetailModal extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    orderId: PropTypes.string.isRequired,
  };

  state = {
    // 订单详情
    orderDetail: {},
    isLoadedData: false,
    // 充电功率图表数据
    chargeDataDetailList: [],
  };

  loadData = async () => {
    const { dispatch, orderId } = this.props;
    const orderResult = await dispatch({
      type: 'afterSaleServiceUserService/queryChargeOrderDetail',
      payload: {
        orderId,
      },
    });
    const listResult = await dispatch({
      type: 'afterSaleServiceUserService/queryChargeDataDetail',
      payload: {
        orderId,
      },
    });
    if (orderResult.success) {
      this.setState({ orderDetail: orderResult.data });
    }
    if (listResult.success) {
      const chargeDataDetailList = listResult.data.map((item) => ({
        power: Number(`${item.power}`),
        timeStr: item.time,
        time: newMoment(item.time).toDate().getTime(),
      }));
      this.setState({ chargeDataDetailList });
    }
  };

  handleClick = () => {
    const { isLoadedData } = this.state;
    if (!isLoadedData) {
      this.loadData();
    }
  };

  rendContent() {
    const { orderDetail, chargeDataDetailList } = this.state;

    return (
      <div style={{ maxHeight: 400, overflow: 'auto' }}>
        <DescriptionList col={2} size="small">
          <Description term="手机号">{orderDetail.phoneNumber || ''}</Description>
          <Description term="用户昵称">{orderDetail.wechatName || ''}</Description>
          <Description term="充电站点">{orderDetail.stationName || ''}</Description>
          <Description term="充电点位">{orderDetail.positionName || ''}</Description>
          <Description term="开始充电时间">{orderDetail.startDate || ''}</Description>
          <Description term="结束充电时间">{orderDetail.endDate || '正在充电中'}</Description>
          <Description term="充电时长">{orderDetail.chargeMinutes || ''}</Description>
          <Description term="平均充电功率">{orderDetail.energyPower}w</Description>
          <div className="holder-spacing" />
          <Divider />

          <Description term="打开方式">{startTypeMap[orderDetail.startType]}</Description>
          <Description term="关闭方式">{closeTypeMap[orderDetail.closeType]}</Description>
          <Description term="收费档位">
            {orderDetail.feeTempleMoney}元/分钟 或 {orderDetail.feeTemplePowerMoney}能量币/分钟
          </Description>
          <Description term="支付状态">
            {`${orderDetail.payFlg}` === '1' ? '已支付' : '未支付'}
          </Description>
          {!!orderDetail.endDate && (
            <Fragment>
              {
                // 支付标识（0.未支付 1.已支付）
                `${orderDetail.payFlg}` === '1' && (
                  <Fragment>
                    {`${orderDetail.payType}`.includes('1') && (
                      <Description term="实际支付金额">{orderDetail.realMoney}元</Description>
                    )}

                    {`${orderDetail.payType}`.includes('2') && (
                      <Description term="实际支付(能量币)">
                        {orderDetail.realPowerMoney} 个
                      </Description>
                    )}
                  </Fragment>
                )
              }
              {
                // 支付标识（0.未支付 1.已支付）
                `${orderDetail.payFlg}` === '0' && (
                  <Fragment>
                    <Description term="应付">
                      {orderDetail.money}元 或 {orderDetail.powerMoney}能量币
                    </Description>
                  </Fragment>
                )
              }
            </Fragment>
          )}
        </DescriptionList>
        <div className="holder-spacing" />
        <div>
          {chargeDataDetailList.length === 0 && <div className="text-center">暂无充电功率数据</div>}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <BaseModal title="订单详情" footer={null} content={this.rendContent()}>
          <Button onClick={this.handleClick} type="link">
            详情
          </Button>
        </BaseModal>
      </div>
    );
  }
}

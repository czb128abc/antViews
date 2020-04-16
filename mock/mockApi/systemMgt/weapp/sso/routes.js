/* eslint-disable no-plusplus */
import { getOperateData, getRequestParams } from '../../../util';

export default {
  'GET /sitemonitor-user/api/sitemonitor/user/sendSms': (req, res) => {
    const data = getOperateData(true);
    data.data = '0123';
    res.send(data);
  },

  'GET /sitemonitor-sso/api/sitemonitor/sso/loginUser': (req, res) => {
    const data = getOperateData(true);
    data.data = {
      id: '1',
      phoneNumber: '15928603739',
      wechatName: '欧阳辉辉',
      userType: 1,
      openId: 'adasad',
      unionId: 'unionId_XXX',
    };
    res.send(data);
  },
  'POST /sitemonitor-user/api/sitemonitor/user/register': (req, res) => {
    const param = getRequestParams(req);
    console.log('param', param);
    const data = getOperateData(param.phoneNumber === '11');
    res.send(data);
  },
  'POST /sitemonitor-sso/api/sitemonitor/sso/login': (req, res) => {
    const param = getRequestParams(req);
    console.log('param', param);
    const data = getOperateData(true);
    res.send(data);
  },
  'GET /sitemonitor-user/api/sitemonitor/stationLocation/getLocations': (req, res) => {
    const param = getRequestParams(req);
    console.log('param', param);

    const listData = [
      // '104.076116,30.511208',
      '104.075164,30.512225',
      '104.071301,30.510783',
      '104.076127,30.511254',
      '104.02272516085297,30.6420639624365',
    ];
    const data = getOperateData(true);
    data.data = listData.map((item, index) => ({
      location: item,
      stationId: `${index}_stationId`,
      stationAddr: `四川省凉山彝族自治州西昌市河东街与熊家碾路交叉口东北100米 ${index + 1}号`,
      stationName: `园中园西苑${index + 1}`,
    }));
    res.send(data);
  },
};

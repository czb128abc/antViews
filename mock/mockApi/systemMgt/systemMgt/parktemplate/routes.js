/* eslint-disable no-plusplus */
import { getOperateData, randomLetter } from '../../../util';

import { list } from './data';

const getObj = days => ({
  id: randomLetter(1, 20),
  days,
  isAction: true,
  donate: days / 10,
  price: days / 2,
});

export default {
  'GET /api/parktemplate/findStationPositionByOrgId': (req, res) => {
    const data = getOperateData(true);
    data.data = list;
    res.send(data);
  },

  'GET /api/parktemplate/queryByStationId': (req, res) => {
    const data = getOperateData(true);

    data.data = [
      {
        id: 'TEMP_PARK', // 临停类型id固定为TEMP_PARK
        name: '临停',
        createTime: '2019-10-10 12:00:00',
        createUserId: '12211',
        parkTemples: [
          {
            id: '0d1d5b766d1f4da7a194aab2bbc9a6a7',
            parkType: '1',
            price: 10,
            stationId: 'f61675e2efaf4fa18a49acc939e6274c',
            stationName: '德刚',
            ...getObj(30),
          },
        ],
      },
      {
        id: 'vehicleTypeId_1',
        name: '自行车',
        createTime: '2019-10-10 12:00:00',
        createUserId: '12211',
        parkTemples: [
          {
            id: '0d1d5b766d1f4da7a194aab2bbc9a6a7',
            parkType: '3',
            price: 0,
            stationId: 'f61675e2efaf4fa18a49acc939e6274c',
            stationName: '德刚',
            ...getObj(30),
          },
          {
            id: '583091183a3142e683cafcc3c5179b9c',
            parkType: '1',
            price: 0,
            stationId: 'f61675e2efaf4fa18a49acc939e6274c',
            stationName: '德刚',
            ...getObj(60),
          },
          {
            id: '5d6cd5dd0d444968aace1a1744ea6240',
            parkType: '4',
            price: 0,
            stationId: 'f61675e2efaf4fa18a49acc939e6274c',
            stationName: '德刚',
            ...getObj(90),
          },
          {
            id: 'a0c63ca00e944fe0af24ee44e556eea1',
            parkType: '2',
            price: 0,
            stationId: 'f61675e2efaf4fa18a49acc939e6274c',
            stationName: '德刚',
            ...getObj(180),
          },
        ],
      },
      {
        id: 'vehicleTypeId_2',
        name: '电瓶车',
        createTime: '2019-10-10 12:00:00',
        createUserId: '12211',
        parkTemples: [
          {
            id: '0d1d5b766d1f4da7a194aab2bbc9a6a7',
            parkType: '3',
            price: 0,
            stationId: 'f61675e2efaf4fa18a49acc939e6274c',
            stationName: '德刚',
            ...getObj(30),
          },
          {
            id: '583091183a3142e683cafcc3c5179b9c',
            parkType: '1',
            price: 0,
            stationId: 'f61675e2efaf4fa18a49acc939e6274c',
            stationName: '德刚',
            ...getObj(60),
          },
          {
            id: '5d6cd5dd0d444968aace1a1744ea6240',
            parkType: '4',
            price: 0,
            stationId: 'f61675e2efaf4fa18a49acc939e6274c',
            stationName: '德刚',
            ...getObj(90),
          },
          {
            id: 'a0c63ca00e944fe0af24ee44e556eea1',
            parkType: '2',
            price: 0,
            stationId: 'f61675e2efaf4fa18a49acc939e6274c',
            stationName: '德刚',
            ...getObj(180),
          },
        ],
      },
    ];
    res.send(data);
  },
  'GET /api/parktemplate/delete': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/parktemplate/insert': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
  'POST /api/parktemplate/update': (req, res) => {
    const data = getOperateData(true);
    res.send(data);
  },
};

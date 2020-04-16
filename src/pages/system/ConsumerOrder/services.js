import { post, get } from '@/utils/request';

export function queryListPage(params) {
  return get('/api/consumerorder/findByPage', params);
}

export function queryDetail(id) {
  return get('/api/station/queryById', { id });
}

export function del({ id }) {
  return get('/api/station/delete', { id });
}

export function save(params) {
  const status = '1';
  return post('/api/station/insert', { ...params, status });
}

export function update(params) {
  return post('/api/station/update', params);
}

export function updateStationStatus(params) {
  return post('/api/station/updateStationStatus', params);
}

export function queryStatusCount() {
  return get('/api/station/queryStatusCount', {});
}

// 查询异常站点清单
export function queryAbList() {
  return get('/api/station/findAbList');
}

// 分页查询正常站点
export function queryNormalListPage(params) {
  return get('/api/station/findNormalPage', params);
}

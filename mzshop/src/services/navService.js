import {fetchPost} from "../utils/http";

export function queryGoodsListByCatid(param) {
  var carId;
  if (param.catId == '') {
    carId = '135';//初始化ID
  }
  else {
    carId = param.catId;
  }
  let data = {
    service: 'queryTBKCoupons',
    catId: carId,
    pageNo: 1,
    pageSize: '10',
  }
  return fetchPost('/api/gateWay', data);
}

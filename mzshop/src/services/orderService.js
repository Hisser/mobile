import {fetchPost} from "../utils/http";
//查询订单记录
export function queryOrderList(para) {
  let data={
    service:'queryTradeList',
    pageNo: para.pageNo,
    state: para.state,
  }
  return fetchPost('/api/gateWay', data);
}

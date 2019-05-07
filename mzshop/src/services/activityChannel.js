import {fetchPost} from "../utils/http";
//查询订单记录
export function activityChannel(para) {
  let data = {
    service: 'activityChannel',
    code : para.code,
    mobile : para.mobile,
    channelName : para.channelName,
    startNum : para.startNum,
    endNum : para.endNum
  };

  return fetchPost('/api/gateWay', data);
}


export function queryActivityChannelByUser(){
  let data ={
    service:'queryActivityChannel',
  };
  return fetchPost('/api/gateWay', data);
}

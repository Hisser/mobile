import {fetchPost} from "../utils/http";

export function queryAlipayGroup(para) {
  let data = {
    service: 'queryAlipayGroupLink',
    channelId:para.channelId,
  };
  return fetchPost('/api/gateWay', data)
}
//检查渠道是否绑定用户
export  function check(promoId,state) {
  let data ={
    service:'checkBindingChannelUser',
    promoId:promoId,
    state: state
  }
  return fetchPost('/api/gateWay', data)
}
//新版进去发奖励
export function queryAlipayGroupNew(para) {
  let data = {
    service: 'groupInviteReward',
    promoId:para.channelId,
  };
  return fetchPost('/api/gateWay', data)
}

export function downloadAlipayCode(para) {
  let data = {
    service: 'downloadAlipayCode',
    channelId:para.channelId,
    num:para.num,
  };
  return fetchPost('/api/gateWay', data)
}

export function queryChannelInfo(para) {
  let data = {
    service: 'queryChannelInfo',
    channelId:para.channelId,
  };

  console.log(para);
  return fetchPost('/api/gateWay', data)
}



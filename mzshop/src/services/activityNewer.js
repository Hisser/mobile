import {fetchPost} from "../utils/http";
//查询订单记录
export function updateUser(para) {
  console.log(para,'----');
  let submitData = {};
  let userInfo = {
    mobile: ''
  };
  userInfo.mobile = para.mobile;
  userInfo.userId = para.userId;
  submitData.info = JSON.stringify(userInfo);
  submitData.code = para.code;


  let from = window.localStorage.getItem('from');//来源是好友，微信群，朋友圈
  window.localStorage.removeItem('from');
  console.log('from',from);
  let data = {
    // service: 'updateUserInfo',
    service: 'activityNewer',
    channelId:para.channelId,
    from:from,
  };
  if(para.userId !== null) { //二维码不需要
    Object.assign(data, submitData);
  }
  return fetchPost('/api/gateWay', data);
}

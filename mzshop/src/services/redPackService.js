import {fetchPost} from "../utils/http";
import {Toast} from 'antd-mobile';
//查询红包
export function queryRedPack(para) {

  let data={
    service:'queryUserCouponInfo',
    // pageNo: para.pageNo,
    state: para.state,

  }
  if(para.userSecKey && para.accessToken){
      data={
        service:'queryUserCouponInfo',
        // pageNo: para.pageNo,
        state: para.state,
        userSecKey:para.userSecKey,
        accessToken:para.accessToken
      }
  }

  return fetchPost('/api/gateWay', data);
}

//查询粉丝
export function queryMyFans(para) {
  let data={
    pageNo: para.pageNo,
    requestLevel: "levelOne",
    service: 'queryFans'
  }
  return fetchPost('/api/gateWay', data);
}


//查询账户信息
export function queryAccountInfo() {
  let data={
    service: 'accountInfo'
  }
  return fetchPost('/api/gateWay', data);
}

export function updateUserInfo(para) {

  let mobile = para.mobile;
  let code = para.code;
  let submitData = {};
  let userInfo = {
    mobile: ''
  };
  userInfo.mobile = mobile;
  submitData.info = JSON.stringify(userInfo);
  submitData.code = code;

  let data = {
    service: 'updateUserInfo',
  };

  Object.assign(data, submitData);
  return fetchPost('/api/gateWay', data);
}

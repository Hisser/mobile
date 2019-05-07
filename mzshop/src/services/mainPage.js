

//查询导航栏分类
import {fetchPost} from "../utils/http";

export function queryNav() {
    let  data={
      //service:'queryHomeCategory'
      service:'queryCatByChannel',
      channel:'top',

    };
  return fetchPost('/api/gateWay', data)
}

export function queryAdList() {
  let data={
    service:'getAdList',
    catId:'0'
  }
  return fetchPost('/api/gateWay',data)

}
//查询banner广告
export function queryBannerAd() {
  let data={
    service:'getAdList',
    catId:'2'
  }
  return fetchPost('/api/gateWay',data)

}
//查询弹屏广告
export function queryFlyAd() {
  let data={
    service:'getAdList',
    catId:'3'
  }
  return fetchPost('/api/gateWay',data)

}
//关闭弹屏广告
export function closeFlyAd() {
  let data={
    service:'closeFlyAd',
    catId:'3'
  }
  return fetchPost('/api/gateWay',data)

}

//用户头像
export function queryUserInfo() {
  let data={
    service:'userInfo'
  }
  return fetchPost('/api/gateWay',data)
}

//转换到拼多多商城
export function genPddCmsPromUrl() {
  let data={
    service:'genPddCmsPromUrl',
    channel:'pdd',
  }
  return fetchPost('/api/gateWay',data)
}

export function queryCouponAccount(){
  let data ={
    service:'queryCouponAccount',
  }
  return fetchPost('/api/gateWay',data)
}





/***登录***/
export function login(para) {
  let data = {
    service: 'doLogin',
    code: para.code,
    mobile: para.mobile
  }
  return fetchPost('/api/gateWay', data)
}

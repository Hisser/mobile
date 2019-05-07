import request from '../utils/request'
import {fetchPost} from "../utils/http";

/*活动报名*/
export function create({tel}) {
  let data = {
    service: 'subEnrollInfo',
    tel: tel.tel,
    name: tel.name
  };
  return fetchPost('/api/gateWay', data)
}

/*查询参加记录*/
export function query() {
  let service = 'querySubEnrollInfoLog';
  return request(`/api/gateWay?service=${service}`, {
    method: 'post'
  });

}

export function getinfo() {
  let service = 'queryActivityInfo';
  return request(`/api/gateWay?service=${service}`, {
    method: 'post'
  });
}

//查询活动记录
export function queryActivityRecordDetail(para) {
  let data = {
    pageNo: para.pageNo,
    type: para.type,
    service: 'cutDownOrFreeRecord',
  }
  return fetchPost('/api/gateWay', data)
}


//参加淘礼金活动
export function joinTaoCashActivity(para) {
  let data = {
    goodsId: para.goodsId,
    plat: para.plat,
    service: 'joinTaoCashActivity',
  }
  return fetchPost('/api/gateWay', data)
}


//助力淘礼金活动
export function taoCashAssist(para) {
  let data = {
    activityDetailId: para.activityDetailId,
    service: 'taoCashAssist',
  }
  return fetchPost('/api/gateWay', data)
}

//查询活动详情
export function queryActivityDetail(para) {
  let data = {
    detailId: para.detailId,
    service: 'cutPriceGoodsDetail',
  }

  return fetchPost('/api/gateWay', data)
}



//查询淘礼金URL
export function queryTaoCashUrl(para) {
  let data = {
    detailId: para.detailId,
    service: 'getTaoCashUrl',
  }

  return fetchPost('/api/gateWay', data)
}



//查询用户是否参与某商品的淘礼金活动
export function queryUserTaoCashByGoods(para) {
  let data = {
    goodsId: para.goodsId,
    from:para.from,
    service: 'queryUserTaoCashByGoods',
  }

  return fetchPost('/api/gateWay', data)
}

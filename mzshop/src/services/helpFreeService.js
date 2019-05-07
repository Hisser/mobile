import {fetchPost} from "../utils/http";
/**砍价service**/


/*查询助力的商品列表*/
export function queryGoodList(para) {
  let data={
    pageNo:para.pageNo,
    type:para.type,
    service:'queryCutPriceGoodsList',
  }
  return fetchPost('/api/gateWay', data)
}

/*****查询我的助力列表*****/
export function queryMyFreeList(para) {
  let data={
    pageNo:para.pageNo,
    service:'cutDownOrFreeRecord',
    type:para.type,
  }
  return fetchPost('/api/gateWay',data)
}


/*******参加助力活动*******/
export  function joinFreeActivity(para){
  let data={
    goodsId:para.goodsId,
	  plat:para.plat,
    service:'joinFreeActivity',
  }
  return fetchPost('/api/gateWay',data)
}

/********好友助力*************/
export function helpFree(para) {
  let data={
    activityDetailId:para.detailId,
    service:'freeAssist',
  }
  return fetchPost('/api/gateWay',data)
}


/***********记录****************/
export  function cutPriceGoodsDetail(para) {
  let  data={
    detailId:para.groupId,
    service:'cutPriceGoodsDetail',
  }
  return fetchPost('/api/gateWay',data)
}

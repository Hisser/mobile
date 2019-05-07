import {fetchPost} from "../utils/http";
/**砍价service**/


/*查询砍价的商品列表*/
export function queryGoodList(para) {
  let data={
    pageNo:para.pageNo,
    type: para.type,
    service:'queryCutPriceGoodsList',
  }
  return fetchPost('/api/gateWay', data)
}

/**参加砍价活动*/
export function queryMyCutGoodList(para){
  let data={
    goodsId:para.goodsId,
    plat:para.plat,
    service:'joinCutPriceActivity',
  }
  return fetchPost('/api/gateWay',data)
}
/*我的砍价列表**/
export  function myCutList(para) {
  let data={
    pageNo:para.pageNo,
    type:para.type,
    service:'cutDownOrFreeRecord',
  }
  return fetchPost('/api/gateWay',data)
}

//好友帮忙砍价
export function cutPrice(para) {
  let data={
    activityDetailId:para.detailId,
    service:'cutDownAssist',
  }
  return fetchPost('/api/gateWay',data)
}
//分享出去查询
export  function cutPriceGoodsDetail(para) {
  let  data={
    detailId:para.groupId,
    service:'cutPriceGoodsDetail',
  }
  return fetchPost('/api/gateWay',data)
}

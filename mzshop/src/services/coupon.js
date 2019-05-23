import {fetchPost, fetchGet} from "../utils/http";
import axios from 'axios';
import $ from 'jquery';

/*获取淘宝商品图文详情*/
export function queryGoodsDetails(para) {
  let data = {
    service: 'getTBGoodsInfo',
    numIid: para.idNum,
  };
  return fetchPost('/api/gateWay', data);
}

/*获取淘宝天猫、京东、拼多多商品图文详情*/
export function getGoodsDetails(para) {
  let data = {
    service: 'queryGoodsDetail',
    goodsId: para.goodsId,
    plat: para.plat,
  };
  return fetchPost('/api/gateWay', data);
}

/*获取淘宝口令*/
export function createGoodsTBKey(para) {
  let data = {
    service: 'creatTBKPwd',
    url: para.url,
    logo: para.logo,
    text: para.text,
  };
  return fetchPost('/api/gateWay', data);
}

export function getMoGujieGid(){
  let data = {
    service:'getMgjChannelId'
  };
  return fetchPost('/api/gateWay', data);
}

/*...参加砍价..*/
export function joinCutPrice(para) {
  let data = {
    plat: para.from,
    goodsId: para.goodsId,
    service: 'joinCutPriceActivity',
  };
  return fetchPost('/api/gateWay', data);
}

/*查询商品优惠信息*/
export function queryGoodsCouponInfo(para) {
  let data = {
    service: 'queryTBKCoupons',
    pageSize: para.paraPageSize,
    pageNo: para.idNo,
    catId: para.catID,
    q: para.paraQ,
  };
  return fetchPost('/api/gateWay', data);
}


/*商品搜索*/
export function searchGoods(para) {
  let data = {
    service: 'searchMaterialOpt',
    pageNo: para.pageNo,
    q: para.q,
    sort: para.sort,
    hasCoupon: para.hasCoupon,
    plat: para.plat,
  };
  return fetchPost('/api/gateWay', data);
}

/***保存搜索历史**/
export function dealSearchRecords(para) {
  let data = {
    service: 'dealSearchRecords',
    type: 'goods',
    searchText: para.q,
  };
  return fetchPost('/api/gateWay', data);
}


/*查询频道优惠券*/
export function queryTBKChannelCoupons(para) {
  let data = {
    service: 'queryTBKChannelCoupons',
    pageNo: para.pageNo,
    pageSize: para.pageSize,
    channel: para.channel,
    catId: para.catId,
  };
  return fetchPost('/api/gateWay', data);
}
//查询homelist
export function queryHomeList() {
  let data ={
    service:'homeList',
    version:'new_version'
  }
  return fetchPost('/api/gateWay',data);
}



/*查询实时疯狂榜*/
export function  queryHotList(para) {
  console.log('000',para);
  let data ={
    service:'queryHDKGoodsList',
    type:para.type,
    cid:para.cid,
    pageNo:para.pageNo,
    pageSize:para.pageSize,
  }
  return fetchPost('/api/gateWay', data);
}


/*查询选择的商品*/
export function querySelectedChannelGoods() {
  let data = {
    service: 'queryChannelGoods',
  };
  return fetchPost('/api/gateWay', data);
}


/*按模块产生分类*/
export function queryCatByChannel(para) {
  let data = {
    service: 'queryCatByChannel',
    channel: para.channel,
  };
  return fetchPost('/api/gateWay', data);
}


//主页查询最先面的精选商品
export function queryGoodsListByCatid(param) {
  let data = {
    //service: 'queryTBKCoupons',
    catId: param.catId,
    pageNo: param.pageNo,
    pageSize: param.pageSize,
    service: 'queryTBKChannelCoupons',
    channel: 'top'
  };
  return fetchPost('/api/gateWay', data);
}

//查询专辑商品列表
export function queryAlbum(param) {
  let data ={
    service:'queryGroupDetail',
    pageNo: param.pageNo,
    pageSize: param.pageSize,
    groupId:param.groupId
  };
  return fetchPost('/api/gateWay',data);
}





/***登录***/
export function login() {
  let data = {
    service: 'doLogin',
    code: '321852',
    mobile: '18888888888'
  };
  return fetchPost('/api/gateWay', data);
}


//查询店铺信息
export function queryShopInfo(para) {
  return new Promise((resolve, reject) => {
    let goodsId = para.goodsId;
    let urlPara = `{"itemNumId":"${goodsId}"}`;
    let url = `https://acs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?data=${encodeURIComponent(urlPara)}&qq-pf-to=to=pcqq.group&callback=onBack`;
    try {
      window.onBack = (res) => {
        resolve(res.data)
      };
      let script = window.document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      document.head.appendChild(script);
    } catch (e) {
      reject(e)
    }
  });
}

//查询淘宝商品图文详情
export function querygoodsImgList(para) {
  return new Promise((resolve, reject) => {
    let goodsId = para.goodsId;
    let url = 'http://h5api.m.taobao.com/h5/mtop.taobao.detail.getdesc/6.0/?data=%20{%22id%22:%22' + goodsId + '%22}';
  let arrayImg = new Array();
  $.ajax({
    type: "POST",
    url: url,
    async:false,    //是否异步
    dataType:"jsonp",
    success: function(response) {
      let data = response.data.pcDescContent;

      let regImg = new RegExp("<(img|IMG)(.*?)(>|></img>|/>)","g");
      let regSrc = new RegExp("(src|SRC)=(\"|\')(.*?)(\"|\')");

      while (regImg.exec(data)!==null){
        let group = RegExp.lastMatch;
        if (group!==null && regSrc.test(group)){
          let imgSrc = RegExp.lastMatch;
          if(imgSrc!==null && imgSrc.length>5){
            imgSrc = imgSrc.substring(5, imgSrc.length - 1);
            let img = imgSrc.startsWith("http") ? imgSrc : "http:" + imgSrc;
            if (!img.endsWith('.gif')){
              // img +='_400x400q100.jpg'
              arrayImg.push(img);  //把获取到的图片地址添加到列表中
            }
          }
        }
      }
      resolve(arrayImg)
    },
  })
  });
}

//检查优惠券的领取额度
export function checkCopuponAccount(para) {
  let data = {
    service: 'checkCouponAccount',
  };

  return fetchPost('/api/gateWay', data);
}



//京东转链
export function genJdGoodsPromUrl(para) {
  let data = {
    service: 'genJdGoodsPromUrl',
    goodsId: para.goodsId,
    url: para.url,
  };

  return fetchPost('/api/gateWay', data);
}

//创建分享海报
export  function createCouponPoster(para) {
  let data={
    service:'createCouponPoster',
    from : para.from,
    goodsId: para.goodsId
  }
  return fetchPost('/api/gateWay', data);
}




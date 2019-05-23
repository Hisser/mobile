import * as navService from "../services/navService";
import * as goodsService from "../services/coupon";
import * as mainService from "../services/mainPage";
import * as couponServices from "../services/coupon";
import {Modal, Toast} from "antd-mobile/lib/index";
import axios from 'axios';
import $ from 'jquery';
export default {
  namespace: "nav",
  state: {
    goodsList: [],
    params: {
      pageNo: 0,
      pageSize: 20,
      hasMore: false,
      channel: null,
      catId: 0,
    },
    Flag:0,//默认是精选
    isShow:true,
    showActivity:true,
    adList: [],//广告
    bannerAd:{},//banner广告
    flyAd:[],//弹屏广告
    channels:[],//频道
    grids:[],//导航
    showAlert:false
  },


  reducers: {
    saveGoodsList(state,{payload}){
      return {
        ...state,
        goodsList:[...payload.goodsList],
      }
    },
    savePara(state, {payload}){
      return {
        ...state,
        params: payload.para,
      }
    },
    saveFlag(state, {payload}){
      return {
        ...state,
        Flag: payload.Flag,
      }
    },
    closed(state, {payload}){
      return {
        ...state,
        isShow: payload.isShow,
      }
    },
    closecoupon(state,{payload}){
      return  {
        ...state,
        showActivity:payload.showActivity,
      }
    },
    showAlert(state,{payload}){
      return {
        ...state,
        showAlert:payload.showAlert
      }
    },
    saveHomeList(state,{payload}){
      return {
        ...state,
        adList: [...payload.adlist],
        bannerAd: payload.bannerlist,
        flyAd: [...payload.flylist],
        channels:[...payload.channels],
        grids:[...payload.grids],
      }
    },
    changeNo (state,{payload}){
      return {
        ...state,
        params:payload.params
      }
    }

  },
  effects: {

    //主页查询精选商品
    *queryGoodsListFromTopChannel({payload: para}, {call, put}) {
      let channel = 'top';
      let catId = para.catId;
      let pageNo = para.pageNo;
      let pageSize = para.pageSize;

      let goodsInfo = yield call(goodsService.queryTBKChannelCoupons, {pageNo, pageSize, channel, catId});
      if (goodsInfo.code == 1) {
        let paras = {
          channel: channel,
          catId: catId,
          pageNo: pageNo,
          pageSize: pageSize,
          hasMore: goodsInfo.totalPage>pageNo,
        }
        yield put({type: 'savePara', payload: {para: paras}});
        yield put({type: 'saveGoodsList', payload: {goodsList: goodsInfo.data}});
      } else {
        yield put({type: 'saveGoodsList', payload: {goodsList: []}});
      }

    },

    *queryHomeList({payload},{call,put}){
      //整个homelist
      const homeList = yield call(goodsService.queryHomeList);
      if(homeList.code==1){
        yield put({type: 'saveHomeList',payload:{
            adlist: homeList.data.mainAds!=null ? homeList.data.mainAds :[],
            bannerlist: homeList.data.bannerAds!=null ? homeList.data.bannerAds :{},
            flylist: homeList.data.popAds!=null ? homeList.data.popAds :[],
            channels:homeList.data.channels,
            grids:homeList.data.grids,
          }})
      }
    },

    *clearGoodsList({payload}, {call, put}) {
      yield put({type: 'saveGoodsList', payload: {goodsList: []}});
    },

    *saveFlag({payload}, {call, put}){
        var catId=payload.falg;
      //保存点击时的id,用于点击详情页返回
      yield put({type: 'saveFlag', payload: {Flag: catId}});
    },


    *turnToPddMall({payload}, {call, put}){
      let pddUrl = yield call(mainService.genPddCmsPromUrl);
      console.log(pddUrl.data);
      if (pddUrl.code == 1 && pddUrl.data!== null) {
        let pddMallUrl = pddUrl.data.url;
        window.location.href = pddMallUrl;
      }
    },

    *close({payload}, {call, put}){
      yield put({type: 'closed', payload: {isShow: false}});
    },

    *changeJDUrl({payload},{call,put}){
      var goodsId='';
        var  url=payload.link;
      const Url=yield call(couponServices.genJdGoodsPromUrl,{goodsId,url});
      if(Url.code==1){
        window.location.href=Url.data.actUrl;
      }else{
        Toast.info('链接不存在！');
      }

    },
    *closeCoupon({payload},{call,put}){
       localStorage.setItem("coupon",false);
       yield  put({type:'closecoupon',payload :{showActivity:false}})
    },

    *showAlert({payload},{call,put}){
      yield  put({type:'showAlert',payload :{showAlert:true}})
    },

    *getMgjChannelId({payload},{call,put}){
      const mogujie =yield call (couponServices.getMoGujieGid);
      console.log('mogujiedata',mogujie);
      if(mogujie.code==1){
        let newLink = payload.link.replace('gid=0','gid='+mogujie.channelId);
        console.log('mogujie',newLink);
        window.location.href=newLink;
      }else{
        console.log('蘑菇街获取渠道id失败');
      }
    },
    *doLogin({payload},{call,put}){
        var mobile=payload.mobile;
        var code =payload.code;
        const login = yield  call(mainService.login,{mobile,code});
        if(login.code ===1){
          Toast.info('登陆成功!')
          window.location.reload(true);//刷新页面
        }else{
          Toast.info('验证码错误！')
        }
    },
    *changePageNo({payload},{call,put}){
      let params={
          pageNo: 0,
          pageSize: 20,
          hasMore: false,
          channel: null,
          catId: 0,
      }
      yield  put({type:'changeNo',payload :{params:params}})
    }

  },

}

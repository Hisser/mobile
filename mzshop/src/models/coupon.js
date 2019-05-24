/**
 * Created by Administrator on 2018/7/26 0026.
 */
import {routerRedux} from 'dva/router';
import {Modal,Toast} from "antd-mobile/lib/index";
import  * as couponServices from '../services/coupon'
import  * as activityService from '../services/activity'
import pathToRegexp from 'path-to-regexp';

const alert = Modal.alert;

export default {
  namespace: "coupon",
  state: {
    goodsInfo: [],
    details: null,
    tbPwd: null,
    modelVisible: false,
    modelVisible1: false,
    modelVisible2: false,
    modelVisible3: false,
    modelVisible4: false,
    plat: '1',                  //1-淘宝天猫；2-京东；3-拼多多
    Flag: null,   //清缓存
    shopInfo:null,
    channelInfo:null
  },

  reducers: {
    saveInfo(state, {payload}) {
      return {
        ...state,
        goodsInfo: payload.goodsInfo,
        details: payload.details,
      };
    },

    saveDetail(state, {payload}) {
      return {
        ...state,
        details: payload.details,
      };
    },
    saveMode(state, {payload}){
      return {
        ...state,
        modelVisible: payload.modeHide,
      }
    },

    saveMode1(state, {payload}){
      return {
        ...state,
        modelVisible1: payload.modeHide,
      }
    },

    saveMode2(state, {payload}){
      return {
        ...state,
        modelVisible2: payload.modeHide,
      }
    },

    saveMode3(state, {payload}){
      return {
        ...state,
        modelVisible3: payload.modeHide,
      }
    },

    saveMode4(state, {payload}){
      return {
        ...state,
        modelVisible4: payload.modeHide,
      }
    },

    savePwd(state, {payload}){
      return {
        ...state,
        tbPwd: payload.pwd,
      }
    },

    savePlat(state, {payload}){
      return {
        ...state,
        plat: payload.plat,
      }
    },

    saveFlag(state, {payload}){
      return {
        ...state,
        Flag: payload.flag,
      }
    },

    saveShopInfo(state, {payload}){
      return {
        ...state,
        shopInfo: payload.shopInfo,
      }
    },

  },

  effects: {

    /*进入页面加载*/
    *fetch({payload: goodsId, flag}, {call, put}) {
      //清除缓存
      yield put({type: 'saveInfo', payload: {goodsInfo: [], details: []}});
      yield put({type: 'savePwd', payload: {pwd: null}});
      //区别于h5与app
      yield put({type: 'saveFlag', payload: {flag: flag}});

      let plat = goodsId.substring(0, 1);
      goodsId = goodsId.substring(2);
      yield put({type: 'savePlat', payload: {plat: plat}});
      let  goodsDetails=null;
      try {
          goodsDetails= yield call(couponServices.getGoodsDetails, {goodsId, plat});//查询淘宝图文详情
      }catch(e) {
        console.log(JSON.stringify(e));
      }
      console.log('goodsDetails',goodsDetails);
      if (goodsDetails.code == 1) {
        yield put({
          type: 'saveInfo',
          payload: {goodsInfo: goodsDetails.data.info, details: goodsDetails.data.details}
        });

        if (plat == '1') {
          var url = goodsDetails.data.info.hasCoupon && goodsDetails.data.info.couponUrl != null ? goodsDetails.data.info.couponUrl : goodsDetails.data.info.clickUrl;
          var logo = goodsDetails.data.info.picUrl;
          var text = goodsDetails.data.info.title;

          const goodsTbPwd = yield call(couponServices.createGoodsTBKey, {url, logo, text});
          if (goodsTbPwd.code == 1) {
            yield put({type: 'savePwd', payload: {pwd: goodsTbPwd.data}});
          } else {
            yield put({type: 'savePwd', payload: {pwd: null}});
          }


          const shopInfo = yield call(couponServices.queryShopInfo, {goodsId});
          if (shopInfo!=null && shopInfo.seller!=null){
            yield put({type: 'saveShopInfo', payload: {shopInfo: shopInfo.seller}});
          }

          const goodsImgList =yield  call(couponServices.querygoodsImgList, {goodsId});
          if(goodsImgList!=null){
            yield put({
              type: 'saveDetail',
              payload: { details: goodsImgList}
            });
          }
        }
      }else{

        yield put({type: 'saveInfo', payload: {goodsInfo: [], details: null}});
      }


    },

    *reload(action, {put}) {
      yield put({type: 'fetch'});
    },

    *showModel({payload: hideValue}, {call, put}) {
      yield put({type: 'saveMode', payload: {modeHide: hideValue}});
    },

    *showModel1({payload: hideValue}, {call, put}) {
      yield put({type: 'saveMode1', payload: {modeHide: hideValue}});
    },

    *showModel2({payload: hideValue}, {call, put}) {
      yield put({type: 'saveMode2', payload: {modeHide: hideValue}});
    },

    *showModel3({payload: hideValue}, {call, put}) {
      yield put({type: 'saveMode3', payload: {modeHide: hideValue}});
    },

    *showModel4({payload: hideValue}, {call, put}) {
      yield put({type: 'saveMode4', payload: {modeHide: hideValue}});
    },

    *save({payload: flag}, {call, put}){
      yield put({type: 'saveflag', payload: {flag: flag}});
    },
    *cutPrice({payload:from,goodsId},{call,put}) {
      const cutPrice = yield call(couponServices.joinCutPrice, {from, goodsId});
    },

    *clearGoodsInfo({payload}, {take,call, put}){
      yield put({type: 'saveInfo', payload: {goodsInfo: [], details: []}});
      yield put({type: 'savePwd', payload: {pwd: null}});
      yield put({type: 'nav/changePageNo',payload:payload});
      yield put(routerRedux.goBack());
    },


    *queryUserTaoCashByGoods({payload: para}, {call, put}){
      let goodsId = para.goodsIds;
      let from = 'goods';
      const res = yield call(activityService.queryUserTaoCashByGoods, {goodsId,from});
      if (res.code === 1){
          let url = res.data.sendUrl;
          let logo = para.pic;
          let text = para.title;

          //获取淘宝口令
        const goodsTbPwd = yield call(couponServices.createGoodsTBKey, {url, logo, text});
        if (goodsTbPwd.code == 1) {
          yield put({type: 'savePwd', payload: {pwd: goodsTbPwd.data}});
          // console.log('goodsTbPwd.data--',goodsTbPwd.data);
        } else {
          // console.log('goodsTbPwd.data--2',goodsTbPwd.data);
          yield put({type: 'savePwd', payload: {pwd: null}});
        }

        // yield put({type: 'saveMode', payload: {modeHide: true}});


      }else{
        // yield put(routerRedux.push(`/myTaoCash/${goodsId}`));
      }
    },

    *checkCopuponAccount({payload: para}, {call, put}) {
      let hascoupon = para.hasCoupon;
      let couponUrl = para.couponUrl;
      let plat = para.plat;
      let res = {code: 1};
     /* if (hascoupon) {
        res = yield call(couponServices.checkCopuponAccount);
      }

      if (res.code === 1) {*/
        if (plat === '1') {
          let ua = navigator.userAgent.toLowerCase();
          let match = ua.match(/MicroMessenger/i);
          if (match !== null && Array.isArray(match) && match.length > 0) {
            match = match[0];
          }
          if (match === "micromessenger") {
            yield put({type: 'saveMode', payload: {modeHide: true}});
          } else {
            window.location.href = couponUrl;
          }
        } else {
          window.location.href = couponUrl;
        }
      // } else if (res.code == 3) {
      //   alert("优惠券额度不足，请先充值！");
      // }

    },


    *createCouponPoster({payload: para},{call,put}){
      const res = yield call(couponServices.createCouponPoster,para);
      if(res.code==1){
        let url = res.data.split("/")[4].split("?")[0];
        yield put(routerRedux.push(`/share/${url}`));
      }

    }
  },


  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/detail/:id/:flag?').exec(location.pathname);
        if (match) {
          var goodsId = match[1];
          var flag = null;
          if (match[2]) {
            flag = match[2];
          }
          dispatch({type: 'fetch', payload: goodsId, flag});
        }
      });
    },
  },

}


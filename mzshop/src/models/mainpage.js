import  * as mainPageService from '../services/mainPage'
import * as couponServices from "../services/coupon";
import * as cutPriceService from "../services/cutPriceService";
import {fetchPost} from "../utils/http";
import * as wechatApi from "../wechatApi";
import CommonUtil from "../utils/CommonUtil";
import pathToRegexp from "path-to-regexp/index";
import {Toast} from 'antd-mobile';
import {routerRedux} from "dva/router";

export default {
  namespace: 'mainpage',

  state: {
  NavList: [],                  //导航栏分类
    goodsSelected: {           //选择的频道商品
      nine: {picUrl: ''},
      brand: {picUrl: ''},
      nineReco: [{picUrl:''},{picUrl:''}],
      brandReco: [{picUrl:''},{picUrl:''}],
      motherReco: [{picUrl:''},{picUrl:''}],
      jhsPin: {picUrl: ''},
      jdPin: {picUrl: ''},
      top: [],

    },
    userIco:'',
    showActivity: false,//初始加载是否显示账户信息
    Token:'',
    show:true,
    show1:false,
    message:'',
    message1:'',
    message2:'',
    message3:''

  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        NavList: [...payload.list],
      };
    },
    saveChannelGoods(state, {payload}){
      return {
        ...state,
        goodsSelected: payload.goodsChannel,
      }
    },
    changeFlag(state, {payload}){
      return {
        ...state,
        flag: payload.flag,
      }
    },
    saveCouponAccount(state, {payload}){
      return {
        ...state,
        showActivity: payload.showActivity,
      }
    },
    saveToken(state,{payload}){
      return {
        ...state,
        Token:payload.Token,
        show:payload.show,
        sceneId:payload.sceneId
      }
    },
    close(state,{payload}){
      return {
        ...state,
        show : payload.show
      }
    },
    close(state,{payload}){
      return {
        ...state,
        show1 : payload.show1
      }
    },
    show(state,{payload}){
      return {
        ...state,
        show1 : payload.show1,
        message: payload.message,
        show : payload.show
      }
    },
    show2(state,{payload}){
      return {
        ...state,
        show1 : payload.show1,
        message1: payload.message1,
        message2: payload.message2,
        message3: payload.message3,
        show : payload.show
      }
    },


  },

  effects: {
    * fetch({payload}, {call, put}){
        //  浏览器自动登录测试账号
        //  const login = yield  call(mainPageService.login);

      /*if(!CommonUtil.isWeiXin()){//非微信环境
        let times =window.localStorage.getItem('cleartimes');
        if(times == null){
            window.localStorage.clear();
            window.localStorage.setItem('cleartimes', 1);
            window.location.href = window._global.url.share_sign_url;
        }
      }*/

      yield put ({type:'saveToken',payload:{show:payload.show}});


      const response = yield call(mainPageService.queryNav);
      if (response.code == 1) {
        yield put({type: 'save', payload: {list: response.data}});
      }else{
        console.log(response)
      }

      //获取选择的频道商品
      var channelGoods = yield call(couponServices.querySelectedChannelGoods);
      if (channelGoods.code == 1) {
        yield put({type: 'saveChannelGoods', payload: {goodsChannel: channelGoods.data}});
      }

/*
      var homelist = yield call(couponServices.queryHomeList);
      if(homelist.code ==1){
        console.log('homelist');
      }
*/


    },
    *close({payload}, {call, put}) {
      yield put({ type:'saveCouponAccount',payload:{showActivity:false}})
    },
    *closeCoupon({payload}, {call, put}){
      yield put({ type:'close',payload:{show:false}})

    },
    *closeCouponed({payload}, {call, put}){
      yield put({ type:'close2',payload:{show1:false}})

    },
    *getCoupon({payload},{call,put}){
      const res = yield call(mainPageService.getCoupon,{});
      console.log(res);
      if(res.code==1){
         yield put({ type:'show2',payload:{show1:true , show:false,message1:'恭喜您获得',message2:'1元',message3:'请打开微信钱包明细查看'}});
        window.localStorage.setItem('sceneId', null);
        window.localStorage.setItem('hbToken', null);

      }else if(res.code==3){//已领取过
        yield put({ type:'show',payload:{show1:true , show:false,message:res.message}});
        window.localStorage.setItem('sceneId', null);
        window.localStorage.setItem('hbToken', null);
      }else{
        yield put({ type:'show',payload:{show1:true , show:false,message:res.message}});
      }


    }
  },

  subscriptions: {
  /*  setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        console.log(pathname)
        if (pathname === '/:Token?') {
          console.log('222',query);
          dispatch({type: 'fetch', payload: query});
        }
      });
    },*/
    setup({dispatch, history}) {
      return history.listen((location) => {

        const match = pathToRegexp('/').exec(location.pathname);

        if (match) {
          let hbToken =  window.localStorage.getItem('hbToken');
          let sceneId = window.localStorage.getItem('sceneId');
          let show = true;
          if(hbToken == null||hbToken =='null'){
             show =false;
          }else{

          }
          dispatch({type: 'fetch', payload: {show:show}});
        }
      })
      },
  },

}

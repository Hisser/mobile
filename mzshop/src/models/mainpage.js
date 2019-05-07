import  * as mainPageService from '../services/mainPage'
import * as couponServices from "../services/coupon";
import * as cutPriceService from "../services/cutPriceService";
import {fetchPost} from "../utils/http";
import * as wechatApi from "../wechatApi";
import CommonUtil from "../utils/CommonUtil";

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


  },

  effects: {
    * fetch({payload}, {call, put}){
        //  浏览器自动登录测试账号
        //  const login = yield  call(mainPageService.login);

      if(!CommonUtil.isWeiXin()){//非微信环境
        let times =window.localStorage.getItem('cleartimes');
        if(times == null){
            window.localStorage.clear();
            window.localStorage.setItem('cleartimes', 1);
            window.location.href = window._global.url.share_sign_url;
        }
      }


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

    },
    *close({payload}, {call, put}) {
      yield put({ type:'saveCouponAccount',payload:{showActivity:false}})
    }
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/') {
          dispatch({type: 'fetch', payload: query});
        }
      });
    },
  },

}

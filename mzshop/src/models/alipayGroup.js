import * as alipayService from '../services/alipayGroup'
import {Modal} from "antd-mobile/lib/index";
import pathToRegexp from "path-to-regexp/index";
import {Toast} from 'antd-mobile';
import * as goodsService from "../services/coupon";
import CommonUtil from "../utils/CommonUtil";
import zipImg from './../utils/zipImg';


const alert = Modal.alert;


export default {
  namespace: "alipayGroup",
  state: {
    channelLink: '',
    channelId: '',
    flag: '',
    hasMore: true,
    goodsList: [],
    channel: 'hot',
    promoId: 0,
    channelInfo:null,
    codeUrl:'',
  },

  reducers: {
    saveLink(state, {payload}) {
      return {
        ...state,
        channelLink: payload.channelLink
      };
    },

    save(state, {payload}){
      return {
        ...state,
        channelId: payload.channelId
      }
    },

    saveFlag(state, {payload}){
      console.log(payload.flag)
      return {
        ...state,
        flag: payload.flag
      }
    },

    saveHasMore(state, {payload}){
      return {
        ...state,
        hasMore: payload.hasMore
      }
    },

    saveGoodsList(state, {payload}) {
      return {
        ...state,
        goodsList: [...payload.goodsList],
      };
    },

    savePromoId(state, {payload}){
      return {
        ...state,
        promoId: payload.promoId,
        codeUrl: payload.codeUrl
      };
    },

    saveChannelInfo(state, {payload}){
      return {
        ...state,
        channelInfo: payload.channelInfo,
      };
    }

  },

  effects: {
    * fetch({payload: para}, {call, put}) {
      yield put({type: 'save', payload: {channelId: para.channelId, userId: para.userId}})
      const res = yield call(alipayService.check, para.channelId, 'check');
      console.log('res', res);
      if (res.code == 1) {
        yield put({type: 'saveFlag', payload: {flag: !res.flag}})
      }
    },

    * onPress({payload: para}, {call, put}){
      const res = yield call(alipayService.check, para.channelId, 'binding');
      console.log(res);
      if (res.code == 1) {
        yield put ({type:'saveFlag',payload:{flag:''}})
        Toast.info('绑定成功')
      } else {
        Toast.info('绑定失败')
      }
    },

    * create({payload: para}, {call, put}){
      const res = yield call(alipayService.check, para.channelId, 'create');
      if (res.code == 1) {
        yield put ({type:'savePromoId',payload:{promoId:res.promoId,codeUrl:res.codeUrl}})
      }
    },

    * query({payload: para}, {call, put}) {
      const res = yield call(alipayService.queryAlipayGroup, para);
      if (res.code === 1) {
        console.log('channelLink', res.data.channelLink);
        window.location.href = res.data.channelLink;
      } else {
        Toast.info('没有查询到渠道')
      }
    },

    //新版
    * queryNew({payload: para}, {call, put}) {
      if(CommonUtil.isAlipay()){//支付宝环境
        const res = yield call( alipayService.queryAlipayGroupNew,para);
        if(res.code==1){
          console.log('=',res.data.groupUrl);
          window.location.href= res.data.groupUrl;
        }else{
          Toast.info(res);
        }
      }else{
        Toast.info('请使用支付宝扫码打开!');
      }
    },

    *queryHotList({payload: para}, {call, put}) {
      console.log(para)
      try {
        let goodsInfo = yield call(goodsService.queryHotList, para);
        if (goodsInfo.code == 1) {
          let hasMore = goodsInfo.totalPage > para.pageNo;
          yield put({type: 'saveHasMore', payload: {hasMore: false}});
          yield put({type: 'saveGoodsList', payload: {goodsList: goodsInfo.data}});
        } else {

          yield put({type: 'saveGoodsList', payload: {goodsList: []}});
          yield put({type: 'saveHasMore', payload: {hasMore: false}});
        }
      } catch (e) {
        console.log(e)
      }
    },

    * queryChannelInfo({payload: para}, {call, put}) {
      yield put({type: 'save', payload: {channelId: para.channelId, userId: para.userId}});

      const res = yield call(alipayService.queryChannelInfo, para);
      if (res.code == 1) {
        yield put({type: 'saveChannelInfo', payload: {channelInfo: res.data}})
      }
    },

    *downloadCodeImg({payload: para}, {call, put}) {
      try {
        let res = yield call(alipayService.downloadAlipayCode, para);

        if (res.code == 1) {
          let url = res.data;

          let a = document.createElement("a"), //创建a标签
            e = document.createEvent("MouseEvents"); //创建鼠标事件对象
          e.initEvent("click", false, false); //初始化事件对象
          a.href = url; //设置下载地址
          a.download = "code.png"; //设置下载文件名
          a.dispatchEvent(e); //给指定的元素，执行事件click事件
        }else{
          Toast.info(res.message);
        }
      } catch (e) {
        console.log(e)
      }
    },

  },

  subscriptions: {
    setup1({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/alipayGroup/:channel?').exec(location.pathname);
        if (match) {
          var channelId = match[1];
          dispatch({type: 'query', payload: {channelId}});
        }
      });
    },

    setup2({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/alipayGroupNew/:channel?').exec(location.pathname);
        if (match) {
          var channelId = match[1];
          dispatch({type: 'fetch', payload: {channelId}});
        }
      });
    },

    setup3({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/alipayCode/:channel?').exec(location.pathname);
        if (match) {
          var channelId = match[1];
          dispatch({type: 'queryChannelInfo', payload: {channelId}});
        }
      });
    },
  },


};

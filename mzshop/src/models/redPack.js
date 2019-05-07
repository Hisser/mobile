import pathToRegexp from 'path-to-regexp';
import  * as redPackService from '../services/redPackService'
import {Toast} from "antd-mobile/lib/index";
import * as CommonUtil from "../utils/CommonUtil";

export  default {

  namespace: 'redPack',

  state:{
    fontcolor1:'#ff6529',
    fontcolor2:'#717171',
    fontcolor3:'#717171',

    couponList:[]
  },

  reducers: {
    saveChannelId(state, {payload}) {
      return {
        ...state,
        channelId: payload.channelId,
      };
    },
    saveModel(state, {payload}) {
      return {
        ...state,
        Model: payload.Model,
      };
    },
    changeColor(state,{payload}){
      return {
        ...state,
        fontcolor1:payload.fontcolor1,
        fontcolor2:payload.fontcolor2,
        fontcolor3:payload.fontcolor3,
        accessToken:payload.accessToken,
        userSecKey:payload.userSecKey
      };
    },
    saveData(state,{payload}){
      return {
        ...state,
        couponList:payload.couponList,
      }
    }
  },

  effects: {

    * fetch({payload: para}, {call, put}) {
      if(para.state =="SENDED"){
        var  fontColor1='#ff6529';
        var  fontColor2='#717171';
        var  fontColor3='#717171';
      }
      if(para.state =="USED"){
        var  fontColor1='#717171';
        var  fontColor2='#ff6529';
        var  fontColor3='#717171';
      }
      if(para.state =="EXPIRED"){
        var  fontColor1='#717171';
        var  fontColor2='#717171';
        var  fontColor3='#ff6529';
      }

      yield put({type:'changeColor',payload:{
        fontcolor1:fontColor1,
          fontcolor2:fontColor2,
          fontcolor3:fontColor3,
          accessToken:para.accessToken,
          userSecKey:para.userSecKey}});

      const res =yield call(redPackService.queryRedPack,para);

      if(res.code ===1){
        yield put({type:'saveData',payload:{couponList:res.data}});
      }



    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/myRedPack').exec(location.pathname);
        //app使用
        let accessToken = CommonUtil.getQueryString("accessToken");
        let userSecKey = CommonUtil.getQueryString("userSecKey");
        if (match) {
          dispatch({type: 'fetch', payload: {state: 'SENDED',accessToken:accessToken,userSecKey:userSecKey}});
        }
      });
    },
  }
}

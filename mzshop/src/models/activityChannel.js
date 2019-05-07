import pathToRegexp from 'path-to-regexp';
import {routerRedux} from "dva/router";
import  * as activityChannelService from '../services/activityChannel'
import {Toast} from "antd-mobile/lib/index";

export  default {

  namespace: 'activityChannel',

  state:{
    channelList:[],
  },

  reducers: {

    saveChannelList(state, {payload}){
      return {
        ...state,
        channelList: payload.list,
      }
    },

    },


  effects: {
    * fetch({payload}, {call, put}){
        const request =yield call(activityChannelService.queryActivityChannelByUser);
        if(request.code==1){
          yield put({type: 'saveChannelList', payload: {list: request.data}});
        }else{
          Toast.info(request.message);
        }
    },

    * activity({payload: para}, {call, put}) {
      const request = yield call(activityChannelService.activityChannel,para);
      if(request.code ==1 ){
        Toast.info(request.message);
        window.location.href=window._global.url.host +"/api/redirect?redirectUrl=" +  '/activityChannel'
      }else if(request.code ==2 ){
        Toast.info("未登录,请先登录");
      }else if(request.code == 3){
        Toast.info(request.message);
      }else if(request.code == 4){
        Toast.info(request.message);

      }
    },


  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/activityChannel') {
          dispatch({type: 'fetch', payload: query});
        }
      });
    },
  }
}

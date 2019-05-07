import pathToRegexp from 'path-to-regexp';
import  * as activityNewerService from '../services/activityNewer'
import {Toast} from "antd-mobile/lib/index";
import  * as CommonUtil from '../utils/CommonUtil';

export  default {

  namespace: 'rebateNewer',

  state:{
    channelId:'',
    parentId:'',
    Model: false,
  },

  reducers: {
    saveChannelId(state, {payload}) {
      return {
        ...state,
        channelId: payload.channelId,
        parentId: payload.parentId
      };
    },
    saveModel(state, {payload}) {
      return {
        ...state,
        Model: payload.Model,
      };
    }
  },

  effects: {

    * fetch({payload: para}, {call, put}) {
      yield put({type:'saveChannelId',payload:{channelId:para.channelId,parentId:para.parentId }});

    },
    * updateUser({payload :para},{call,put}){

      const request = yield call(activityNewerService.updateUser,para);
     if(request.flag==false){
        Toast.info('验证码错误！');
     }else if(request.code == 0){
       if(CommonUtil.isAlipay()){
         Toast.info('领取成功！');
         if(CommonUtil.isAndroidOrIOS() =='ios'){
           setTimeout(function () {
             window.location.href="https://android.myapp.com/myapp/detail.htm?apkName=com.qianshou.zshop&ADTAG=mobile";
           },500);
         }else{
           yield put({type:'saveModel',payload:{Model:true}});
         }
       }else {
         Toast.info('没有查询到新人红包批次');
       }
      }else if(request.code == 1){
        Toast.info('领取成功！');
       if(CommonUtil.isAndroidOrIOS() =='ios'){
         setTimeout(function () {
           window.location.href="https://android.myapp.com/myapp/detail.htm?apkName=com.qianshou.zshop&ADTAG=mobile";
         },500);
       }else{
         yield put({type:'saveModel',payload:{Model:true}});
       }
     }else if(request.code == 2){
        Toast.info('对不起,该红包只限新人领取！');
       if(CommonUtil.isAndroidOrIOS() =='ios'){
         setTimeout(function () {
           window.location.href="https://android.myapp.com/myapp/detail.htm?apkName=com.qianshou.zshop&ADTAG=mobile";
         },500);
       }else{
         yield put({type:'saveModel',payload:{Model:true}});
       }
     }else if(request.code == 4){
       Toast.info('对不起,您已经领取过新人红包了!');
       if(CommonUtil.isAndroidOrIOS() =='ios'){
         setTimeout(function () {
           window.location.href="https://android.myapp.com/myapp/detail.htm?apkName=com.qianshou.zshop&ADTAG=mobile";
         },500);
       }else{
         yield put({type:'saveModel',payload:{Model:true}});
       }
      }else{
        alert("出错啦！错误信息["+request.code+request.message+"]");
     }

    },
    * close({payload},{call,put}){
      yield put({type:'saveModel',payload:{Model:false}});
    }

  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {

        const match = pathToRegexp('/rebateNewer/:channelId?/:parentId?').exec(location.pathname);

        if (match) {
          var channelId = match[1];
          if(channelId == undefined){
            channelId = null;
          }
          var parentId = match[2];
          if(parentId == undefined){
            parentId = null;
          }
          dispatch({type: 'fetch', payload: {channelId,parentId}});
        }
      });
    },
  }
}

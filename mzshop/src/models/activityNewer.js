import pathToRegexp from 'path-to-regexp';
import  * as activityNewerService from '../services/activityNewer'
import {Toast} from "antd-mobile/lib/index";

export  default {

  namespace: 'activityNewer',

  state:{
    channelId:'',
    userId:'',
    Model: false,
  },

  reducers: {
    saveChannelId(state, {payload}) {
      return {
        ...state,
        channelId: payload.channelId,
        userId: payload.userId,
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
      yield put({type:'saveChannelId',payload:{channelId:para.channelId,userId:para.userId}});
    },
    * updateUser({payload :para},{call,put}){
      const request = yield call(activityNewerService.updateUser,para);
     if(request.flag==false){
        Toast.info('验证码错误！');
     }else if(request.code == 0){//已绑定手机号
       yield put({type:'saveModel',payload:{Model:true}});
      }else if(request.code == 1){
        Toast.info('绑定手机号成功！');
        yield put({type:'saveModel',payload:{Model:true}});
     }else if(request.code == 5){//code=5
       yield put({type:'saveModel',payload:{Model:true}});
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
        const match = pathToRegexp('/activityNewer/:channelId/:userId?').exec(location.pathname);

        if (match) {
          var channelId = match[1];
          var userId =match[2];
          if(userId == undefined){
            userId = null;
          }
          if(channelId == undefined){
            channelId = null;
          }
          console.log(userId);
          dispatch({type: 'fetch', payload: {channelId,userId}});
        }
      });
    },
  }
}

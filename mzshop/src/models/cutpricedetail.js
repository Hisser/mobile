import {routerRedux} from 'dva/router';
import {Model,Toast} from 'antd-mobile';
import * as activityService from '../services/activity'
import {Modal} from "antd-mobile/lib/index";
import pathToRegexp from "path-to-regexp/index";
import * as cutPriceService from "../services/cutPriceService";
import * as helpFreeService from "../services/helpFreeService";
import {cutPrice} from "../services/cutPriceService";

const alert = Modal.alert;
export default {
  namespace: "cutPriceDetail",
  state: {
    list:[],
    cutList:[],
    groupDetailVO:'',
    code:'',
    isSubMP: true,//关注公众号
    maskVisible:false,
  },

  reducers: {
    saveCutRecord(state, {payload}) {
      return {
        ...state,
        list: payload.list,
        cutList: payload.cutList,
        groupDetailVO:payload.groupDetail
      }
    },

    saveCode(state,{payload}){
      return{
        ...state,
        code:payload.codes,
        isSubMP:payload.isSubMP,
      }
    },
    saveMaskVisible(state,{payload}){
      return{
        ...state,
        isSubMP:payload.maskVisible,
      }
    },
  },


  effects: {
    /*进入页面加载*/


    * fetch({payload: groupId}, {call, put}) {
      // const res= yield call(cutPriceService.queryMyCutGoodList,{groupId})
      // if(res.code==1){
      //   yield put({type: 'saveCutRecord', payload: {list:res.data,cutList:res.data.assistantList,groupDetail:res.data.groupDetailVO}})
      // }
      const res = yield call(cutPriceService.cutPriceGoodsDetail, {groupId});
      if (res.code == 1) {
        yield put({
          type: 'saveCutRecord',
          payload: {list: res.data, cutList: res.data.assistantList, groupDetail: res.data.groupDetailVO}
        })
      }
    },
    * closeMask({payload}, {call, put}) {
      yield put({type: 'saveMaskVisible', payload: {maskVisible: true}})
    },

    * cutPrice({payload: detailId}, {call, put}){
      if (detailId != null) {
        const res = yield call(cutPriceService.cutPrice, {detailId});
        console.log('resdata-------------------', res);

        if (res.code == 1) {
          //将code存起来  用于改变按钮
          if(res.isSubMP){
            Toast.info('砍价成功！');

          }else{
            Toast.info('砍价成功，关注公众号获取更多优惠！');

          }

          yield put({type: 'saveCode', payload: {codes: 1,isSubMP:res.isSubMP}});


          var groupId = detailId;
          const res1 = yield call(cutPriceService.cutPriceGoodsDetail, {groupId});
          if (res1.code == 1) {
            yield put({
              type: 'saveCutRecord',
              payload: {list: res1.data, cutList: res1.data.assistantList, groupDetail: res1.data.groupDetailVO}
            })
          }
        } else if(res.code== 0){//已助力
          //将code存起来  用于改变按钮
          yield put({type: 'saveCode', payload: {codes: 1}});
          alert(res.message);
        }else if(res.code == 3){//未下载APP
          yield put({type: 'saveCode', payload: {codes: 3}});
          alert('提示', '你还没有安装App,不能助力,是否立即下载App帮助好友助力?', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
              text: '确定',
              onPress: () =>
              {
                window.location.href = "http://suo.im/4RxWxb";
              }
            },
          ])
        }
      }
    },

  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/cutpricedetail/:groupId').exec(location.pathname);
        if (match) {
          var groupId = match[1];
          dispatch({type: 'fetch', payload: groupId});
        }
      });
    },
  },

};

import {routerRedux} from 'dva/router';
import {Model} from 'antd-mobile';
import {Modal, Toast} from "antd-mobile/lib/index";
import pathToRegexp from "path-to-regexp/index";
import * as helpFreeService from "../services/helpFreeService";

 const alert = Modal.alert;
export default {
  namespace: "helpFreeDetail",
  state: {
    list:[],
    freeList:[],
    groupDetailVO:'',
    code:100,
    isSubMP: true,
    message:'',
    maskVisible:true,
    modelVisible:false,
  },

  reducers: {
    saveCutRecord(state, {payload}) {
      return {
        ...state,
        list:payload.list,
        freeList: payload.cutList,
        groupDetailVO:payload.groupDetail
      }
    },
    saveCode(state,{payload}){
      return{
        ...state,
        code:payload.codes,
        message:payload.message,
        isSubMP:payload.isSubMP,
      }
    },

    saveMaskVisible(state,{payload}){
      return{
        ...state,
        isSubMP:payload.maskVisible,
      }
    },

    saveModelVisible(state,{payload}){
      return{
        ...state,
        modelVisible:payload.modelVisible,
      }
    },

  },

  effects: {

    //查询助力活动
    * fetch({payload: groupId}, {call, put}) {
      const res = yield call(helpFreeService.cutPriceGoodsDetail, {groupId});
      if (res.code == 1) {
        yield put({
          type: 'saveCutRecord',
          payload: {list: res.data, cutList: res.data.assistantList, groupDetail: res.data.groupDetailVO}
        })
      }
    },

    * closeMask({payload: groupId}, {call, put}) {
        yield put({type: 'saveMaskVisible', payload: {maskVisible: true}})
    },


    * helpFree({payload: detailId}, {call, put}){
      if (detailId != null) {
        const res = yield  call(helpFreeService.helpFree, {detailId});
        if (res.code == 1) {


            //将code存起来  用于改变按钮
            console.log('res.isSubMP------',res);
            if(res.isSubMP){
              Toast.info('助力成功！');

            }else{
              Toast.info('助力成功，关注公众号获取更多优惠！');

            }

            yield put({type: 'saveCode', payload: {codes: 1,isSubMP:res.isSubMP}});


            //将code存起来  用于改变按钮
          const res = yield call(helpFreeService.cutPriceGoodsDetail, {detailId});
          if (res.code == 1) {
            yield put({
              type: 'saveCutRecord',
              payload: {list: res.data, cutList: res.data.assistantList, groupDetail: res.data.groupDetailVO}
            })
          }
        }else if(res.code== 0){//老用户不能助力
          //将code存起来  用于改变按钮
          yield put({type: 'saveCode', payload: {codes: 0}});
          alert(res.message);
        }
        else if(res.code == 3){//未下载APP
          yield put({type: 'saveCode', payload: {codes: 3,message:res.message}});
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



        // else if(res.code===3) {
        //
        //   yield put({type: 'saveCode', payload: {codes: res.code,message:res.message}});
        //   // if (res.code == 4){
        //   //   yield put({type: 'saveMaskVisible', payload: {maskVisible: true}});
        //   // }else{
        //   //   yield put({type: 'saveModelVisible', payload: {modelVisible: true}});
        //   // }
        // }
      }
    },

  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/helpfreedetail/:groupId').exec(location.pathname);
        if (match) {
          var groupId = match[1];
          dispatch({type: 'fetch', payload: groupId});
        }

      });
    },
  },

};

import {routerRedux} from 'dva/router';
import {Model} from 'antd-mobile';
import * as helpFreeService from '../services/helpFreeService'
import {Modal} from "antd-mobile/lib/index";
import * as wechatApi from "../wechatApi";

const alert = Modal.alert;
export default {
  namespace: "helpFree",
  state: {
    goodsList: [],
    flag: 0,
    myFreeList: [],
    hasMore1: false,//全部列表
    hasMore2: false,//我的列表
    borderBottom1: '0.05rem solid #108EE9',
    borderBottom2: '0.05rem solid #FFF',
    fontcolor1: '#108EE9',
    fontcolor2: '',
    modelVisible:false,
  },

  reducers: {
    saveGoodsList(state, {payload}){
      return {
        ...state,
        goodsList: [...payload.list],
        hasMore1: payload.hasMore,
      }
    },

    saveMyFreeList(state, {payload}){
      return {
        ...state,
        myFreeList: [...payload.myFreeList],
        hasMore2: payload.hasMore,
      }
    },

    saveMode(state, {payload}){
      return {
        ...state,
        modelVisible: payload.modelVisible,
      }
    },

    changeflag(state, {payload}){
      return {
        ...state,
        flag: payload.flag,
        borderBottom1: payload.borderBottom1,
        fontcolor1: payload.fontcolor1,
        borderBottom2: payload.borderBottom2,
        fontcolor2: payload.fontcolor2,
      }
    }

  },
  effects: {
    * queryGoodsList({payload: para}, {call, put}) {
      // wechatApi.init();
      /*查询砍价商品列表**/
      let pageNo = para.pageNo;
      let type = para.type;
      const res = yield call(helpFreeService.queryGoodList, {pageNo, type});

      if (res != null) {
        if (res.code === 1) {
          yield put({type: 'saveGoodsList', payload: {list: res.data, hasMore: res.hasMore}});
        } else if (res.code == 2) {
          yield put({type: 'saveGoodsList', payload: {list: [], hasMore: false}});
          alert('未登录', '点击首页右上角头像进行登录', [
            { text: '取消', onPress: () => {window.history.back();} },
            { text: '确定', onPress: () => {window.location.href=window._global.share_sign_url; }},
          ])
        } else {
          yield put({type: 'saveGoodsList', payload: {list: [], hasMore: false}});
        }
      }
    },

    * queryMyFreeList({payload: para}, {call, put}) {
        let pageNo = para.pageNo;
        let type = para.type;

        const res1 = yield call(helpFreeService.queryMyFreeList, {pageNo, type});
        if (res1 != null && res1.code === 1) {
          yield put({type: 'saveMyFreeList', payload: {myFreeList: res1.data, hasMore: res1.hasMore}});
        } else {
          yield put({type: 'saveMyFreeList', payload: {myFreeList: [], hasMore: false}});
        }
    },

    /**切换tab***/
    * changeFlag({payload: para}, {call, put}){
      if (para.flag == 1) {
        var borderBottom1 = '0.05rem solid #108EE9';
        var fontcolor1 = '#108EE9';
        var borderBottom2 = '0.05rem solid #FFF';
        var fontcolor2 = '';
      } else {
        var borderBottom2 = '0.05rem solid #108EE9';
        var fontcolor2 = '#108EE9';
        var borderBottom1 = '0.05rem solid #FFF';
        var fontcolor1 = '';
      }

      yield put({type: 'changeflag',
        payload: {
          flag: para.flag,
          borderBottom1: borderBottom1,
          fontcolor1: fontcolor1,
          borderBottom2: borderBottom2,
          fontcolor2: fontcolor2
        }
      });
    },

    *showModel({payload: hideValue}, {call, put}) {
      yield put({type: 'saveMode', payload: {modelVisible: hideValue}});
    },

    *clearMyFreeList({payload}, {call, put}) {
      yield put({type: 'saveMyFreeList', payload: {myCutList: [], hasMore: false}});
    },

    *clearGoodsList({payload}, {call, put}) {
      yield put({type: 'saveGoodsList', payload: {list: [], hasMore: false}});
    },

  },
  // subscriptions: {
  //   setup({dispatch, history}) {
  //     return history.listen(({pathname, query}) => {
  //       if (pathname === '/helpfree') {
  //         dispatch({type: 'fetch', payload: query});
  //       }
  //     });
  //   },
  // },


};

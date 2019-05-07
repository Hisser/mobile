import pathToRegexp from 'path-to-regexp';
import  * as redPackService from '../services/redPackService'
import {Toast} from "antd-mobile/lib/index";
import * as CommonUtil from "../utils/CommonUtil";

export  default {

  namespace: 'myFans',

  state:{
    fansList:[],
    hasMore:false,
    count:0
  },

  reducers: {
    saveData(state,{payload}){
      return {
        ...state,
        fansList:[...payload.fansList],
        hasMore:payload.hasMore,
        count:payload.count
      }
    }
  },

  effects: {

    * fetch({payload: para}, {call, put}) {
      const userList =  yield call(redPackService.queryMyFans,{pageNo:para.pageNo});
      console.log(userList);
      if(userList.code ==1) {
        yield put({type: 'saveData', payload: {fansList: userList.data , hasMore :userList.hasMore,count:userList.count}});
      }
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/myFans').exec(location.pathname);
        if (match) {
          dispatch({type: 'fetch', payload: {pageNo:1}});
        }
      });
    },
  }
}

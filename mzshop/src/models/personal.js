import pathToRegexp from 'path-to-regexp';
import  * as redPackService from '../services/redPackService'
import {Toast} from "antd-mobile/lib/index";
import * as CommonUtil from "../utils/CommonUtil";

export  default {

  namespace: 'personal',

  state:{
    accountTotal:null,
  },

  reducers: {
    saveAccountInfo(state, {payload}) {
      return {
        ...state,
        accountTotal: payload.accountTotal,
      };
    },
  },

  effects: {

    * fetch({payload: para}, {call, put}) {
    },


    * queryAccountInfo({payload: para}, {call, put}) {
      const res = yield call(redPackService.queryAccountInfo);

      if (res.code == 1) {
        let total = res.hbAvailableBalance;
        yield put({type: 'saveAccountInfo', payload: {accountTotal: total}});
      } else if (res.code == 2) {
        Toast.info("未登录,请先登录");
      }
    },


    * updateUserInfo({payload: para}, {call, put}) {

      const res = yield call(redPackService.updateUserInfo,para);

      if (res.code == 1) {
        Toast.info('绑定手机号码成功！');
        window.localStorage.setItem('mobile',para.mobile);
      } else if (res.code == 2) {
        Toast.info(res.message);
      }
    },

  },

  subscriptions: {

    setup({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/personal').exec(location.pathname);
        if (match) {
          dispatch({type: 'queryAccountInfo', payload: {}});
        }
      });
    },
    setup1({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/wallet').exec(location.pathname);
        if (match) {
          dispatch({type: 'queryAccountInfo', payload: {}});
        }
      });
    },
  }
}

import pathToRegexp from 'path-to-regexp';
import  * as redPackService from '../services/redPackService'
import {Toast} from "antd-mobile/lib/index";
import * as CommonUtil from "../utils/CommonUtil";

export  default {

  namespace: 'play',

  state:{
    plat:'',
  },

  reducers: {
    savePlat(state, {payload}) {
      return {
        ...state,
        plat: payload.plat,
      };
    },
  },

  effects: {

    * fetch({payload: para}, {call, put}) {
      yield  put({type:'savePlat',payload:{plat:para.plat}})
    },


  },

  subscriptions: {

    setup({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/playIntd/:plat?').exec(location.pathname);
        if (match) {
          var plat = match[1];
          if(plat ==undefined){
            plat = '';
          }
          console.log('plat',plat);
          dispatch({type: 'fetch', payload: {plat}});
        }
      });
    },

  }
}

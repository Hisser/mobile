import {routerRedux} from 'dva/router';
import {Model} from 'antd-mobile';
import * as cutPriceService from '../services/cutPriceService'
import {Modal} from "antd-mobile/lib/index";
import pathToRegexp from "path-to-regexp/index";
import * as wechatApi from "../wechatApi";

const alert = Modal.alert;
export default {
  namespace: "myCut",
  state: {
      cutList:[],
      groupDetailVO:'',
      list:[],
      modelVisible:false,
      Time:'',
  },

  reducers: {
    saveCutRecord(state, {payload}) {
      return {
        ...state,
        cutList: payload.cutList,
        groupDetailVO:payload.groupDetail,
        list: payload.list,
        Time: payload.time,
      }
    },
    saveMode(state, {payload}){
      return {
        ...state,
        modelVisible: payload.modeHide,
      }
    },

  },
  effects: {
    /*进入页面加载*/
    * fetch({payload: para}, {call, put, select}) {
      let plat = para.plat;
      let goodsId = para.goodsId;
      const res = yield call(cutPriceService.queryMyCutGoodList, {plat,goodsId})
      if (res.code == 1) {
        yield put({
          type: 'saveCutRecord',
          payload: {cutList: res.data.assistantList, groupDetail: res.data.groupDetailVO, list: res.data}
        });
        var param = {
          title: '三缺一，就差你了，你点多少我就能得多少！',
          link: window._global.url.host +'/#/cutpricedetail/' + res.data.detailId,
          imgUrl: res.data.picUrl,
          desc: res.data.title,
          success: function () {
            alert('分享成功');
          }
        };
        wechatApi.share(param);
      }
    },

    *showModel({payload: hideValue}, {call, put}) {
      yield put({type: 'saveMode', payload: {modeHide: hideValue}});
    },



  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/mycut/:plat/:groupId').exec(location.pathname);
        if (match) {
          let plat = match[1];
          let goodsId = match[2];
          dispatch({type: 'fetch', payload: {plat,goodsId}});
        }

      });
    },
  },


};

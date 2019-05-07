import {routerRedux} from 'dva/router';
import {Model} from 'antd-mobile';
import * as helpFreeService from '../services/helpFreeService'
import {Modal} from "antd-mobile/lib/index";
import pathToRegexp from "path-to-regexp/index";
import * as wechatApi from "../wechatApi";

const alert = Modal.alert;
export default {
  namespace: "myHelpFree",
  state: {
      cutList:[],
      groupDetailVO:'',
      list:{receiveNum:0},
      modelVisible:false,
  },

  reducers: {
    saveFreeRecord(state, {payload}) {
      return {
        ...state,
        cutList: payload.cutList,
        groupDetailVO:payload.groupDetail,
        list: payload.list,
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
    * fetch({payload: para}, {call, put}) {
      let goodsId = para.goodsId
      let plat = para.plat;
      const res = yield call(helpFreeService.joinFreeActivity, {goodsId,plat});

      if (res.code == 1) {
        yield put({
          type: 'saveFreeRecord',
          payload: {cutList: res.data.assistantList, groupDetail: res.data.groupDetailVO, list: res.data}
        });

        let url =  window._global.url.host + '/#/helpfreedetail/' + res.data.detailId;
        let param = {
          title: '三缺一，就差你了，帮我免费拿这个宝贝！',
          link: url,
          imgUrl: res.data.picUrl,
          desc: res.data.title,
          success: function () {
            alert('分享成功');
          },
        };
        wechatApi.share(param);
       // yield put({type: 'saveMode', payload: {modeHide: false}});
      }
    },

    *showModel({payload: hideValue}, {call, put}) {
      yield put({type: 'saveMode', payload: {modeHide: hideValue}});
    },

  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/myhelpfree/:plat/:groupId').exec(location.pathname);
        if (match) {
          let plat = match[1];
          let goodsId = match[2];
          dispatch({type: 'fetch', payload: {plat,goodsId}});
        }
      });
    },
  },


};

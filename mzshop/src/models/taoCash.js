import * as activityService from "../services/activity";
import  * as couponServices from '../services/coupon'
import * as wechatApi from "../wechatApi";
import {Modal, Toast} from "antd-mobile/lib/index";
const alert = Modal.alert;

export default {
  namespace: 'taoCash',

  state: {
    hasMore: true,
    activityRecord: [],
    taoCashDetail: {
      title: null,
      picUrl: null,
      itemPrice: null,
      itemPlat: null,
      commission: null,
      status: null,
      detailId: null,
      assistantList: [],
      userImg: null,
      nickName: null,
      receiveNum: null,
      assistNeed: null,
      assistCount: null,
      createTime: null,
    },
    assitStatus: 100,
    tbPwd: null,
    taoCashUrl:null,
    bigCoupon:[],//大额券
  },

  reducers: {

    saveActivityRecord(state, {payload}) {
      return {
        ...state,
        hasMore: payload.hasMore,
        activityRecord: [...payload.activityRecord],
      };
    },

    saveTaoCashDetail(state, {payload}) {
      return {
        ...state,
        taoCashDetail: payload.taoCashDetail
      };
    },

    saveAssitStatus(state, {payload}) {
      return {
        ...state,
        assitStatus: payload.assitStatus
      };
    },

    savePwd(state, {payload}){
      return {
        ...state,
        tbPwd: payload.pwd,
        taoCashUrl:  payload.url,
      }
    },


    saveBigCoupon(state, {payload}) {
      return {
        ...state,
        hasMore: payload.hasMore,
        bigCoupon: [...payload.bigCoupon],
      };
    },


  },

  effects: {

    *fetch({payload: para}, {call, put}) {
    },


    //查询参与的淘礼金活动记录
    // *queryActivityRecord({payload: para}, {call, put}) {
    //   let pageNo = para.pageNo;
    //   let type = para.type;
    //
    //   let activityRecord = yield call(activityService.queryActivityRecordDetail, {pageNo, type});
    //
    //   if (activityRecord.code === 1) {
    //     yield put({
    //       type: 'saveActivityRecord',
    //       payload: {activityRecord: activityRecord.data, hasMore: activityRecord.hasMore}
    //     });
    //   } else if(activityRecord.code === 2) {
    //     yield put({type: 'saveActivityRecord', payload: {activityRecord: [], hasMore: false}});
    //     alert('未登录！')
    //   }else{
    //     yield put({type: 'saveActivityRecord', payload: {activityRecord: [], hasMore: false}});
    //   }
    // },
    //
    // *clearActivityRecord({payload}, {call, put}) {
    //   yield put({type: 'saveActivityRecord', payload: {activityRecord: [], hasMore: false}});
    // },
    //
    // *joinTaoCashActivity({payload: para}, {call, put}){
    //   let goodsId = para.goodsId;
    //   let plat = 'taobao';
    //   const res = yield call(activityService.joinTaoCashActivity, {goodsId, plat});
    //
    //   console.log(res);
    //   if (res.code === 1) {
    //     yield put({type: 'saveTaoCashDetail', payload: {taoCashDetail: res.data}});
    //
    //     let url = window._global.url.host + '/#/shareTaoCash/' + res.data.detailId;
    //     let param = {
    //       title: '三缺一，就差你了，你点一下我就能拿到淘礼金！',
    //       link: url,
    //       imgUrl: res.data.picUrl,
    //       desc: res.data.title,
    //       success: function () {
    //         alert('分享成功');
    //       },
    //     };
    //     wechatApi.share(param);
    //   } else if (res.code === 2) {
    //     alert('未登录！')
    //   }
    //
    // },
    //
    // * queryTaoCashDetail({payload: para}, {call, put}) {
    //   let detailId = para.detailId;
    //   const res = yield call(activityService.queryActivityDetail, {detailId});
    //   if (res.code === 1) {
    //     yield put({type: 'saveTaoCashDetail', payload: {taoCashDetail: res.data}});
    //   }else if(res.code === 2){
    //     alert('未登录！')
    //   }
    // },
    //
    // * helpTaoCash({payload: activityDetailId}, {call, put}){
    //   if (activityDetailId != null) {
    //     const res = yield  call(activityService.taoCashAssist, {activityDetailId});
    //
    //     if (res.code == 1) {
    //       Toast.info('助力成功！');
    //       yield put({type: 'saveAssitStatus', payload: {assitStatus: 1}});
    //
    //       let detailId = activityDetailId;
    //       const resDetail = yield call(activityService.queryActivityDetail, {detailId});
    //
    //       if (resDetail.code == 1) {
    //         yield put({type: 'saveTaoCashDetail', payload: {taoCashDetail: resDetail.data}});
    //       }
    //     } else {
    //       let msg = res.message;
    //       Toast.info(msg);
    //       yield put({type: 'saveAssitStatus', payload: {assitStatus: res.code}});
    //     }
    //   }
    // },

    // * queryTaoCashUrl({payload: para}, {call, put}){
    //   if (para != null) {
    //     let detailId = para.detailId;
    //     const res = yield  call(activityService.queryTaoCashUrl, {detailId});
    //
    //     if (res.code == 1) {
    //       yield put({type: 'saveAssitStatus', payload: {assitStatus: 1}});
    //       let sendUrl = res.data.sendUrl;
    //       // window.location.href = sendUrl;
    //
    //       let url = sendUrl;
    //       let logo = para.picUrl;
    //       let text = para.title
    //       const goodsTbPwd = yield call(couponServices.createGoodsTBKey, {url, logo, text});
    //
    //       if (goodsTbPwd.code == 1) {
    //         yield put({type: 'savePwd', payload: {pwd: goodsTbPwd.data, clickUrl:url}});
    //       } else {
    //         yield put({type: 'savePwd', payload: {pwd: null, clickUrl:url}});
    //       }
    //
    //     } else {
    //       yield put({type: 'saveAssitStatus', payload: {assitStatus: res.code}});
    //     }
    //   }
    // },

    *queryBigCoupon({payload: para}, {call, put}){
      let groupId='3';
      let pageNo = para.pageNo;
      let pageSize =10;

      let total=pageNo*10;
      const bigCoupon =yield call(couponServices.queryAlbum,{groupId,pageNo,pageSize});

      if (bigCoupon.code === 1) {
        if(bigCoupon.totalCount>total){
          yield put({type:'saveBigCoupon',payload:{bigCoupon:bigCoupon.data,hasMore:true}})
        }else{
          yield put({type:'saveBigCoupon',payload:{bigCoupon:bigCoupon.data,hasMore:false}})
        }

      }else if(bigCoupon.code === 2){
        alert('未登录！')
      }
    }

  },


  subscriptions: {
    // setup({dispatch, history}) {
    //   return history.listen((location) => {
    //     const match = pathToRegexp('/myTaoCash/:detailId').exec(location.pathname);
    //     if (match) {
    //       var plat = match[1];
    //       var searchWord = match[2];
    //       dispatch({type: 'fetch', payload: {plat,searchWord}});
    //     }
    //   });
    // },
  }


};

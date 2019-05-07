import * as goodsService from "../services/coupon";
import * as CommonUtil from "../utils/CommonUtil";

export default {
  namespace: 'onePointBuy',

  state: {
    goodsList: [],
    hasMore: true,
    couponUrl: '',
  },

  reducers: {

    saveGoodsList(state, {payload}) {
      return {
        ...state,
        hasMore: payload.hasMore,
        goodsList: [...payload.goodsList],
      };
    },

    saveCouponUrl(state, {payload}){
      return {
        ...state,
        couponUrl: payload.couponUrl
      }
    },

  },

  effects: {

    *queryGoodsList({payload: para}, {call, put}) {
      let pageNo = para.pageNo;
      let pageSize = 20;
      let channel = 'jdPinNine';

      let goodsInfo = yield call(goodsService.queryTBKChannelCoupons, {pageNo, pageSize, channel});
      if (goodsInfo.code === 1) {
        let hasMore = goodsInfo.totalPage > pageNo;
        yield put({type: 'saveGoodsList', payload: {goodsList: goodsInfo.data,hasMore: hasMore}});
      } else {
        yield put({type: 'saveGoodsList', payload: {goodsList: [],hasMore: false}});
      }
    },


    *clearGoodsList({payload}, {call, put}) {
      yield put({type: 'saveGoodsList', payload: {goodsList: [],hasMore: false}});
    },

    *genJdGoodsPromUrl({payload}, {call, put}){
      let goodsId = payload.goodsId;
      let couponUrl = payload.couponUrl;
      const res = yield call(goodsService.genJdGoodsPromUrl, {goodsId, couponUrl});
      console.log(res);
      if (res.code === 1) {
        if (res.data.couponUrl) {
          if (res.data.couponUrl.length > 0) {
            couponUrl = res.data.couponUrl;
          }
        }else if (res.data.clickUrl) {
            couponUrl = res.data.clickUrl;
        }
      } else if (res.code === 2) {
        let serverUrl = window._global.url.host;
        let href = window.location.href;
        let url = href.substring(href.indexOf('/#/') + 2);
        window.location.href = serverUrl + "/weChat/redirect?requestUrl=" + url;
      }
      yield put({type: 'saveCouponUrl', payload: {couponUrl: couponUrl}});
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        if (location.pathname === '/onepointbuy') {
          let para = {pageNo: 1};
          dispatch({type: 'queryGoodsList', payload: para});
        }
      });
    },
  }
};

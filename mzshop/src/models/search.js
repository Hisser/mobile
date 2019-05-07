/**
 * Created by Administrator on 2018/8/1 0001.
 */
import pathToRegexp from 'path-to-regexp';
import * as searchService from "../services/searchService";
import * as goodsService from "../services/coupon";

export default {
  namespace: 'search',

  state: {
    searchKey: '',
    hasMore: true,
    goodsList: [],
    userQueryList: [],
  },

  reducers: {
    savePlat(state, {payload}) {
      return {
        ...state,
        plat: payload.plat,
      };
    },

    saveKeyWord(state, {payload}) {
      return {
        ...state,
        searchKey: payload.keyWord,
      };
    },


    saveHasMore(state, {payload}){
      return {
        ...state,
        hasMore: payload.hasMore,
      }
    },


    saveGoodsList(state, {payload}) {
      return {
        ...state,
        goodsList: [...payload.goodsList],
      };
    },

    saveUserQueryList(state, {payload}){
      return {
        ...state,
        userQueryList: [...payload.userQueryLists],
      };
    },
  },

  effects: {

    *fetch({payload: para}, {call, put}) {
      yield put({type: 'savePlat', payload: {plat: para.plat}});
      yield put({type: 'saveKeyWord', payload: {keyWord: para.searchWord}});
    },

    *userSearchList({payload}, {call, put}){
      //查询搜索结果
      const res = yield call(searchService.querySearchRecord);
      if (res.code === 1) {
        yield put({type: 'saveUserQueryList', payload: {userQueryLists: res.data}});
      }
    },

    //搜索页查询商品
    *searchGoodsList({payload: para}, {call, put}) {
      let q = para.searchWord;
      let pageNo = para.pageNo;
      let sortNum = para.sort;
      let hasCoupon = para.hasCoupon;
      let plat = para.plat;

      let sort = null;
      if (sortNum === 1) {
        sort = 'price_asc';
      } else if (sortNum === 2) {
        sort = 'total_sales_des';
      }

      let goodsInfo = yield call(goodsService.searchGoods, {pageNo, q, sort, hasCoupon, plat});

      if (goodsInfo.code === 1) {
        yield put({type: 'saveHasMore', payload: {hasMore: goodsInfo.hasMore}});
        yield put({type: 'saveGoodsList', payload: {goodsList: goodsInfo.data}});

        //保存搜索记录
        yield call(goodsService.dealSearchRecords, {q});
      } else {
        yield put({type: 'saveGoodsList', payload: {goodsList: []}});
      }
    },

    *clearGoodsList({payload}, {call, put}) {
      yield put({type: 'saveGoodsList', payload: {goodsList: []}});
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/searchResult/:plat/:searchWord').exec(location.pathname);
        if (match) {
          var plat = match[1];
          var searchWord = match[2];
          dispatch({type: 'fetch', payload: {plat,searchWord}});
        }
      });
    },
    setup1({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/search').exec(location.pathname);

        if (match) {
          dispatch({type: 'userSearchList'});
        }
      });
    },
  }
};

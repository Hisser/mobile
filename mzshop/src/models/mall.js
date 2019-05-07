import pathToRegexp from 'path-to-regexp';
import * as goodsService from "../services/coupon";

export default {
  namespace: 'mall',

  state: {
    plat: '',
    goodsList: [],

    titleList: [],
    catId: 0,
    channel:null,
    title: '',
    pageNo: 1,
    pageSize: 20,

    hasMore:true,
  },

  reducers: {
    savePlat(state, {payload}) {
      return {
        ...state,
        plat: payload.plat,
      };
    },

    saveCatId(state, {payload}){
      return {
        ...state,
        catId: payload.catId
      }
    },

    saveHasMore(state, {payload}){
      return {
        ...state,
        hasMore: payload.hasMore
      }
    },

    saveType(state, {payload}){
      return {
        ...state,
        channel: payload.channel,
        title: payload.title,
      }
    },

    saveTitleList(state, {payload}) {
      return {
        ...state,
        titleList: [...payload.titles],
      };
    },

    saveGoodsList(state, {payload}) {
      return {
        ...state,
        goodsList: [...payload.goodsList],
      };
    },

  },

  effects: {

    *fetch({payload: plat}, {call, put}) {

      var channel = plat;
      var title='';
      var defaults ='';

      if(plat ==='taobao'){
        yield put({type: 'saveCatId', payload: {catId: 135}});
        title='淘宝';
      }else if(plat ==='tmall'){
        title='天猫';
      }else if(plat ==='jd'){
        title='京东';
      }else if(plat ==='pdd'){
        title='拼多多';
      }

      yield put({type: 'saveType', payload: {title:title,channel:channel}})
      yield put({type: 'savePlat', payload: {plat: plat}});

      if(plat==='jd' || plat==='taobao' ) {
        const titles = yield call(goodsService.queryCatByChannel, {channel});

        if (titles.code == 1) {
          yield put({type: 'saveTitleList', payload: {titles: titles.data}});
          if (titles.data.length > 0) {
            var catId = titles.data[0].catId;
            yield put({type: 'saveCatId', payload: {catId: catId}});
          }
        }else{
          yield put({type: 'saveTitleList', payload: {titles: []}});
          yield put({type: 'saveCatId', payload: {catId: 0}});
        }
      }
    },


    *queryGoodsList({payload: para}, {call, put}) {
      let channel = para.channel;
      let catId = para.catId;
      let pageNo = para.pageNo;
      let pageSize = para.pageSize;

      let goodsInfo = yield call(goodsService.queryTBKChannelCoupons, {pageNo, pageSize, channel, catId});

      if (goodsInfo.code == 1) {
        let hasMore = goodsInfo.totalPage>pageNo;
        yield put({type: 'saveHasMore', payload: {hasMore: hasMore}});
        yield put({type: 'saveGoodsList', payload: {goodsList: goodsInfo.data}});
      } else {
        yield put({type: 'saveGoodsList', payload: {goodsList: []}});
        yield put({type: 'saveHasMore', payload: {hasMore: false}});
      }
    },


    *clearGoodsList({payload}, {call, put}) {
      yield put({type: 'saveGoodsList', payload: {goodsList: []}});
    },

    *clearAllData({payload}, {call, put}) {
      yield put({type: 'saveGoodsList', payload: {goodsList: []}});
      yield put({type: 'saveType', payload: {title:'',channel:''}})
      yield put({type: 'savePlat', payload: {plat: null}});
      yield put({type: 'saveTitleList', payload: {titles: []}});
      yield put({type: 'saveCatId', payload: {catId: 0}});
    },


    *turnToJdAdPage({payload}, {call, put}) {
      let url = 'https://h5.m.jd.com/babelDiy/Zeus/2CXzsrrEnh3d3zYsG6oPoddB9X9g/index.html';
      let res = yield call(goodsService.genJdGoodsPromUrl, {url});
      if (res.code === 1 && res.data!==null) {
        window.location.href = res.data.actUrl;
      }
    },

  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/mall/:plat').exec(location.pathname);
        if (match) {
          var plat = match[1];
          dispatch({type: 'fetch', payload: plat});
        }
      });
    },
  }
};

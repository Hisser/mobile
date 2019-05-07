/**
 * Created by Administrator on 2018/9/22 0022.
 */

import  * as goodsService from '../services/coupon'
import pathToRegexp from 'path-to-regexp';


export default {
  namespace: 'channel',

  state: {
    goodsList: [],

    titleList: [],
    catId: 0,
    channel:null,
    title: '',
    pageNo: 1,
    pageSize: 20,
    defaults: '',
    hasMore:true,
    groupId:'',
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
        defaults: payload.defaults,
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

    saveGroupId(state,{payload}){
      return{
        ...state,
        groupId:payload.groupId,
      }
    }

  },

  effects: {

    *fetch({payload: channel,groupId}, {call, put}) {
      let title='';
      let defaults ='';
      if (channel == '9k9') {
        yield put({type: 'saveCatId', payload: {catId: 135}});
        title = '9块9专区';
        defaults = '精选';
      } else if (channel == 'brand') {
        title = '品牌特卖';
        defaults = '综合';
      }else if(channel =='mother'){
        title='妈咪宝贝';
      }else if(channel =='jdPin'){
        title='京东拼团';
      }else if(channel =='jhsPin'){
        title='聚划算拼团';
      }else if(channel =='album'){
        title='专辑活动';
      }else if(channel =='hot'){
        title='实时疯狂榜';
      }

      if(groupId!=null){
        yield put({type: 'saveGroupId', payload: {groupId: groupId}});
      }


      //存储标题分类等
      yield put({type: 'saveType', payload: {title: title, channel: channel, defaults: defaults}})
      //查询存储分类菜单
      if (channel === '9k9' || channel === 'brand' || channel === 'hot') {
        const titles = yield call(goodsService.queryCatByChannel, {channel});
        if (titles.code == 1) {
          yield put({type: 'saveTitleList', payload: {titles: titles.data}});
          if (titles.data.length > 0) {
            var catId = titles.data[0].catId;
            yield put({type: 'saveCatId', payload: {catId: catId}});
          }
        } else {
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


    *queryHotList({payload: para}, {call, put}) {
      console.log(para)
      try{
        let goodsInfo = yield call(goodsService.queryHotList, para);
        console.log(goodsInfo)
        if (goodsInfo.code == 1) {
          let hasMore = goodsInfo.totalPage>para.pageNo;
          yield put({type: 'saveHasMore', payload: {hasMore: hasMore}});
          yield put({type: 'saveGoodsList', payload: {goodsList: goodsInfo.data}});
        } else {
          yield put({type: 'saveGoodsList', payload: {goodsList: []}});
          yield put({type: 'saveHasMore', payload: {hasMore: false}});
        }
      }catch (e) {
        console.log(e)
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
    *queryAlbum({payload:para},{call,put}){
      let pageNo = para.pageNo;
      let pageSize = para.pageSize;
      let groupId =para.groupId;
      const Album = yield call(goodsService.queryAlbum, {pageNo, pageSize, groupId});
      if(Album.code==1) {
        let hasMore = Album.totalCount>pageNo;
        yield put({type: 'saveHasMore', payload: {hasMore: hasMore}});
        yield put({type: 'saveGoodsList', payload: {goodsList: Album.data}});


      }
    }
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/goodslist/:type/:groupId?').exec(location.pathname);
        if (match) {
          var type = match[1];
          var groupId = null;
          if (match[2]) {
            groupId = match[2];
          }
          dispatch({type: 'fetch', payload: type,groupId});
        }
      });
    },
  },
};


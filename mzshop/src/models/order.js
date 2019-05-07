import * as orderService from '../services/orderService';

export default {

  namespace: 'order',

  state: {
    orderList: [],
    hasMore: false,
    flag: 0,
    borderBottom1: '0.05rem solid #108EE9',
    fontColor1: '#108EE9',
    fontWeight1: '600',
    borderBottom2: '0.05rem solid #FFF',
    fontColor2: '#1d1d1d',
    fontWeight2: '500',
    borderBottom3: '0.05rem solid #FFF',
    fontColor3: '#1d1d1d',
    fontWeight3: '500',
    borderBottom4: '0.05rem solid #FFF',
    fontColor4: '#1d1d1d',
    fontWeight4: '500',
  },

  reducers: {
    saveOrderList(state, {payload}) {
      return {
        ...state,
        orderList: [...payload.orderList],
        hasMore: payload.hasMore,
      }
    },
    saveFlag(state, {payload}) {
      return {
        ...state,
        flag: payload.flag,
      }
    },
    saveFlag2(state, {payload}) {
      return {
        ...state,
        borderBottom1: payload.borderBottom1,
        fontColor1: payload.fontColor1,
        fontWeight1: payload.fontWeight1,
        borderBottom2: payload.borderBottom2,
        fontColor2: payload.fontColor2,
        fontWeight2: payload.fontWeight2,
        borderBottom3: payload.borderBottom3,
        fontColor3: payload.fontColor3,
        fontWeight3: payload.fontWeight3,
        borderBottom4: payload.borderBottom4,
        fontColor4: payload.fontColor4,
        fontWeight4: payload.fontWeight4,
      }
    },
  },
  effects: {
    * queryOrderList({payload: para}, {call, put}) {
      let pageNo = para.pageNo;
      let state = para.state;
      const request = yield call(orderService.queryOrderList, {pageNo, state});
      if (request.code == '1') {

        yield put({
          type: 'saveOrderList',
          payload: {orderList: request.data, hasMore: request.hasNextPage}
        });
      }
    },
    * changeFlag({payload: para}, {call, put}) {
      var borderBottom1 = '';
      var fontColor1 = '';
      var fontWeight1 = '';
      var borderBottom2 = '';
      var fontColor2 = '';
      var fontWeight2 = '';
      var borderBottom3 = '';
      var fontColor3 = '';
      var fontWeight3 = '';
      var borderBottom4 = '';
      var fontColor4 = '';
      var fontWeight4 = '';

      if (para.Flag == '0') {
        borderBottom1 = '0.05rem solid #108EE9';
        fontColor1 = '#108EE9';
        fontWeight1 = '500';
        borderBottom2 = '0.05rem solid #FFF';
        fontColor2 = '#1d1d1d';
        fontWeight2 = '500';
        borderBottom3 = '0.05rem solid #FFF';
        fontColor3 = '#1d1d1d';
        fontWeight3 = '500';
        borderBottom4 = '0.05rem solid #FFF';
        fontColor4 = '#1d1d1d';
        fontWeight4 = '500';
      } else if (para.Flag == '1') {
        borderBottom1 = '0.05rem solid #FFF';
        fontColor1 = '#1d1d1d';
        fontWeight1 = '500';
        borderBottom2 = '0.05rem solid #108EE9';
        fontColor2 = '#108EE9';
        fontWeight2 = '600';
        borderBottom3 = '0.05rem solid #FFF';
        fontColor3 = '#1d1d1d';
        fontWeight3 = '500';
        borderBottom4 = '0.05rem solid #FFF';
        fontColor4 = '#1d1d1d';
        fontWeight4 = '500';
      } else if (para.Flag == '2') {
        borderBottom1 = '0.05rem solid #FFF';
        fontColor1 = '#1d1d1d';
        fontWeight1 = '500';
        borderBottom2 = '0.05rem solid #FFF';
        fontColor2 = '#1d1d1d';
        fontWeight2 = '500';
        borderBottom3 = '0.05rem solid #108EE9';
        fontColor3 = '#108EE9';
        fontWeight3 = '600';
        borderBottom4 = '0.05rem solid #FFF';
        fontColor4 = '#1d1d1d';
        fontWeight4 = '500';
      } else if (para.Flag == '3') {
        borderBottom1 = '0.05rem solid #FFF';
        fontColor1 = '#1d1d1d';
        fontWeight1 = '500';
        borderBottom2 = '0.05rem solid #FFF';
        fontColor2 = '#1d1d1d';
        fontWeight2 = '500';
        borderBottom3 = '0.05rem solid #FFF';
        fontColor3 = '#1d1d1d';
        fontWeight3 = '500';
        borderBottom4 = '0.05rem solid #108EE9';
        fontColor4 = '#108EE9';
        fontWeight4 = '600';
      }
      yield put({
        type: 'saveFlag2',
        payload: {
          borderBottom1: borderBottom1,
          borderBottom2: borderBottom2,
          borderBottom3: borderBottom3,
          borderBottom4: borderBottom4,
          fontColor1: fontColor1,
          fontColor2: fontColor2,
          fontColor3: fontColor3,
          fontColor4: fontColor4,
          fontWeight1: fontWeight1,
          fontWeight2: fontWeight2,
          fontWeight3: fontWeight3,
          fontWeight4: fontWeight4,
        }
      });
      yield put({
        type: 'saveFlag',
        payload: {flag: para.Flag}
      });
    },

    * clearGoodsList({payload: para}, {call, put}) {
      yield put({
        type: 'saveOrderList',
        payload: {orderList: []}
      });
    }
  },

}

import * as orderService from '../services/orderService';
import pathToRegexp from "path-to-regexp/index";

export default {

  namespace: 'shareAli',

  state: {
    url: ''
  },

  reducers: {
    saveUrl(state, {payload}) {
      return {
        ...state,
        url: payload.url,
      }
    },
  },

  effects: {
    * query({payload: para}, {call, put}) {
      yield put({type: 'saveUrl', payload: {url: para.url}});

    }
  },

  subscriptions: {
    setup1({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/share/:url').exec(location.pathname);
        if (match) {
          var url = match[1];
          dispatch({type: 'query', payload: {url}});
        }
      });
    }
  }
}

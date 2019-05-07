import pathToRegexp from "path-to-regexp/index";
import  * as adServices from '../services/adDetail'

export default {

  namespace: 'addetail',

  state: {
    detail:[],
    flag:''
  },


  effects: {
    *fetch({ payload:id,flag}, { call, put }) {  // eslint-disable-line
      yield put({type:'saveFlag',payload:{flag:flag}})
      const request=yield call(adServices.queryADDetails,{id});
      yield put({ type: 'save',payload: {detail:[]}});
      if(request.code==1){
         yield put({ type: 'save',payload: {detail:request.data}});
      }

    },
  },

  reducers: {
    save(state, {payload}) {
      return { ...state,
        detail: payload.detail
      };
    },
    saveFlag(state,{payload}){
      return {
        ...state,
        flag : payload.flag
      };
    }
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {

        const match = pathToRegexp('/ad/adDetail/:id/:flag?').exec(location.pathname);
        if (match) {
          var id = match[1];
          var flag = null;
          if (match[2]) {
            flag = match[2];
          }
          dispatch({type: 'fetch', payload: id,flag});

        }
      });
    },

  },


};

import * as activityService from '../services/activity'
import {Modal} from "antd-mobile/lib/index";

const alert = Modal.alert;

export default {
  namespace: "activity",
  state: {
    list: [],
    acInfo: [],
    status: 0, //活动状态  1 ：未开始 2：已开始 3：已结束
    code: null
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        list: [...payload.list]
      };
    },

    saveAcInfo(state, {payload}) {
      return {
        ...state,
        acInfo: payload.acInfo,
        status: payload.acInfo.status
      };
    },

  },

  effects: {
    /*进入页面加载*/
    * fetch({payload: tel, name}, {call, put}) {
      const querylist = yield call(activityService.query);//查询参加人数
      yield put({type: 'save', payload: {list: querylist.data.list}});
      if (querylist.data.code == 1) {
        const acinfo = yield call(activityService.getinfo);//查询活动info
        yield put({type: 'saveAcInfo', payload: {acInfo: acinfo.data.list}});
      }
    },

    //新增
    * create({payload: tel, name}, {call, put}) {
      const response = yield call(activityService.create, {tel});
      if (response.data.code === 1) {
        const querylist = yield call(activityService.query);//查询参加人数
        yield put({type: 'save', payload: {list: querylist.data.list}});
      }
      if (response.data.code === 2) {
        alert("该手机号码已注册过")
      }
    },

    * reload(action, {put}) {
      yield put({type: 'fetch'});
    },

  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/activity') {
          dispatch({type: 'fetch', payload: query});
        }
      });
    },
  },


};

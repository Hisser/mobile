/**
 * Created by Administrator on 2018/3/15 0015.
 */
import axios from 'axios';
import qs from 'qs';
import '../global';
import {Toast} from "antd-mobile/lib/index";


axios.defaults.timeout = 5000;
axios.defaults.baseURL = window._global.url.host;

// http request 拦截器
axios.interceptors.request.use(

  config => {
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求';
          break;
        case 401:
          error.message = '未授权，请重新登录';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = '请求错误,未找到该资源';
          break;
        case 405:
          error.message = '请求方法未允许';
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器端出错';
          break;
        case 501:
          error.message = '网络未实现';
          break;
        case 502:
          error.message = '网络错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网络超时';
          break;
        case 505:
          error.message = 'http版本不支持该请求';
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      error.message = '连接到服务器失败';
    }
    return Promise.reject(error);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response && response.data.code === 1) {
      let token = JSON.parse(window.localStorage.getItem('token'));
      if (!token) {
        token = {
          accessToken: null,
          userSecKey: null
        };
      }

        let accessToken = response.data.accessToken;
        let userSecKey = response.data.userSecKey;
        if (accessToken !== undefined && accessToken !== null) {
          token.accessToken = accessToken;
          if (userSecKey !== undefined && userSecKey !== null) {
            token.userSecKey = userSecKey;
          }
          localStorage.setItem('token', JSON.stringify(token))
        }
      }

    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetchGet(url, params = {}) {
  return new Promise((resolve, reject) => {

    let token = JSON.parse(window.localStorage.getItem('token'));
    if (token && params) {
      params.accessToken = token.accessToken;
      params.userSecKey = token.userSecKey;
    }
    axios.get(url, params).then(response => {
      resolve(response.data);
    }, err => {
      reject(err);
      console.log(err);
    });
  });
}

/**
 * 封装post请求
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetchPost(url, params = {}) {
  return new Promise((resolve, reject) => {

    //APP调用打开广告不带token
    let token = window?JSON.parse(window.localStorage.getItem('token')):null;
    if (token && params) {
      if (token.accessToken!==null && token.userSecKey !== null ){
        params.accessToken = token.accessToken;
        params.userSecKey = token.userSecKey;
      }
    }

    axios.post(url, params).then(response => {
      resolve(response.data);
    }, err => {
      reject(err);
    });
  });
}


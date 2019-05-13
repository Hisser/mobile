import dva from 'dva';
import './index.css';
import activity from "./models/activity";
import coupon from "./models/coupon";
import nav from "./models/nav";
import search from "./models/search";
import 'antd-mobile/dist/antd-mobile.css';
import createLoading from 'dva-loading';
import mainpage from "./models/mainpage";
import addetail from "./models/addetail";
import helpFree from "./models/helpFree";
import myHelpFree from "./models/myHelpFree";
import cutPrice from "./models/cutprice";
import myCut from "./models/myCut";
import cutPriceDetail from "./models/cutpricedetail";
import helpFreeDetail from "./models/helpfreedetail";
import mall from "./models/mall";
import channel from "./models/channel";
import taoCash from "./models/taoCash";
import onePointBuy from "./models/onePointBuy";
import order from "./models/order";
import activityNewer from "./models/activityNewer";
import activityChannel from "./models/activityChannel";
import rebateNewer from "./models/rebateNewer";
import redPack from "./models/redPack";
import alipayGroup from "./models/alipayGroup";
import myFans from "./models/myFans";
import personal from "./models/personal";
import  './global.js';
import * as CommonUtil from "./utils/CommonUtil";
import * as wechatApi from "./wechatApi";
import {fetchPost} from "./utils/http";
import shareAli from "./models/shareAli";


// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});
app.use(createLoading());
// 3. Model
app.model(activity);
app.model(coupon);
app.model(nav);
app.model(search);
app.model(mainpage);
app.model(addetail);
app.model(helpFree);
app.model(cutPrice);
app.model(myCut);
app.model(cutPriceDetail);
app.model(myHelpFree);
app.model(helpFreeDetail);
app.model(mall);
app.model(channel);
app.model(taoCash);
app.model(onePointBuy);
app.model(order);
app.model(activityNewer);
app.model(activityChannel);
app.model(rebateNewer);
app.model(redPack);
app.model(alipayGroup);
app.model(myFans);
app.model(personal);
app.model(shareAli);



  let token = null;
  let accessToken = CommonUtil.getQueryString("accessToken");
  if (accessToken) {
    let userSecKey = CommonUtil.getQueryString("userSecKey");

    token = {
      accessToken: accessToken,
      userSecKey: userSecKey
    };
    window.localStorage.setItem('token', JSON.stringify(token));
  }

  if (token === null) {
    token = JSON.parse(window.localStorage.getItem('token'));
  }

  if (token === null || (token !== null && (token.userSecKey === null || token.userSecKey === undefined))) { //没有就授权登录
    console.log("授权登录");
    let serverUrl = window._global.url.host;
    let href = window.location.href;
    let url = href.substring(href.indexOf('#/') + 1);

    //此段代码是防止新用户授权之后没有?from=groupmessage&isappinstalled=0这个标志 故授权之前存入本地
    var param = window.location.search.split("?")[1];
    let from = "";
    if (param) {
      from = param.split("=")[1];
      var reg = RegExp(/&isappinstalled/);
      if (reg.exec(from)) {
        from = param.split("&isappinstalled")[0];
        from = from.split("=")[1];
      }
    }
    if (CommonUtil.isWeiXin()) {//微信
      window.localStorage.setItem('from', from);
      window.location.href = serverUrl + "/weChat/redirect?requestUrl=" + url;
    }else if (CommonUtil.isAlipay()) {//支付宝
      // window.location.href = serverUrl + "/alipay/redirect?requestUrl=" + url;
    }else{
      console.log('浏览器环境')
    }
  }else{//token存在
    //登录查询用户信息
    let data={
      service:'userInfo'
    }
    fetchPost('/api/gateWay',data).then(res=>{
      if(res.code ==1){
        window.localStorage.setItem('userId', res.user.userId);
        window.localStorage.setItem('userName',res.user.nickName);
        window.localStorage.setItem('userIco',res.user.userIco);
        window.localStorage.setItem('mobile',res.user.mobile);
        console.log('用户信息查询成功');
      }else{
        console.log('用户信息查询失败');
      }
    });

    if (CommonUtil.isWeiXin()) {
      wechatApi.init();//微信分享初始化
    }else if (CommonUtil.isAlipay()) {
      window.location.href = window.location.href.replace('?#','#');
    }else{
      console.log('浏览器环境');
    }
  }




// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

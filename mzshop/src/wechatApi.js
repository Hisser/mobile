var wechatApi = {}
var appId, signUrl, jsapiTicket, ready, baseUrl;
var mediaTimer;
var operateType = "play";
var wx = require('weixin-js-sdk');
var $ = require('jquery');


export function init() {
if(window.location.href.indexOf('?#')>0){
  window.location.href = window.location.href.replace('?#','#');
}
  baseUrl = window._global.url.host;
  appId = window._global.appId;
  signUrl = '';
  jsapiTicket = "";
  ready = false;

  sign(window._global.share_sign_url);
}

/**
 *  调用微信分享接口
 */
export function share(param) {
  wx.onMenuShareTimeline(param);//分享到朋友圈 即将废弃   1.4不能用 现在是1.3版本
  wx.onMenuShareAppMessage(param);//分享给朋友 即将废弃   1.4不能用
  wx.onMenuShareQQ(param);//分享到QQ朋友  即将废弃   1.4不能用


 /* wx.ready(function() {
    wx.updateAppMessageShareData(param);//“分享给朋友”及“分享到QQ”
    wx.updateTimelineShareData(param);//分享到朋友圈或者空间
  });
    wx.error(function (res) {
      alert('分享失败');
    });
*/
};


export function sign(url) {
  var data = {
    appid: appId,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url,
  };
  $.ajax({
    method: "POST",
    url: baseUrl + "/weChat/getJsapiTicketSign",
    data: data,
    cache: false,
    dataType: "json"
  }).done(function (res) {
    if (res.code == 1) {
      data.signature = res.signature;
      delete data.url;
    }
    config(data);
  }).fail(function (res) {
    console.log("sign wrong", res);
  });
};


function config(datas) {
  var config = {
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appId, // 必填，公众号的唯一标识
    timestamp: datas.timestamp, // 必填，生成签名的时间戳
    nonceStr: datas.nonceStr, // 必填，生成签名的随机串
    signature: datas.signature,// 必填，签名，见附录1
    jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage','updateAppMessageShareData','updateTimelineShareData','onMenuShareQQ']
  };
  wx.config(config);
}


wechatApi.createTimestamp = function () {
  return createTimestamp();
};

function createNonceStr() {
  return Math.random().toString(36).substr(2, 15);
}

function createTimestamp() {
  return parseInt(new Date().getTime() / 1000) + '';
}

wechatApi.hideOptionMenu = function () {
  wx.hideOptionMenu();
}

wechatApi.showOptionMenu = function () {
  wx.showOptionMenu();
}


if (typeof module != 'undefined' && module.exports) module.exports = wechatApi; // CommonJs export

   export const prefix = process.env.NODE_ENV === 'production' ? 'https://www.yuezijie.cn' : 'http://192.168.9.109:8080';
 // export const prefix = process.env.NODE_ENV === 'production' ? 'https://yfb.yuezijie.cn' : 'http://192.168.9.109:8080';
// export const prefix = 'https://yfb.yuezijie.cn';

  window._global = {
  env: process.env.NODE_ENV,
  url: {
    host: prefix,
    www: 'https://www.yuezijie.cn',
    imgcdn: 'https://oss.yuezijie.cn',
  },
     appId : 'wxb089255bb53e1dc0',               //正式
     share_sign_url : 'http://o.yuezijie.cn/',   //正式
   // appId: 'wx871b1a2640914c9f',                      //预发布
   // share_sign_url : 'http://uat.yuezijie.cn/',       //预发布
    // share_sign_url : 'http://localhost:8000/',
  appStore_url: 'https://itunes.apple.com/cn/app/id1386122411',//苹果应用商店下载地址
  yyb_url: 'https://android.myapp.com/myapp/detail.htm?apkName=com.qianshou.zshop&ADTAG=mobile',//应用宝下载地址
  server_url: 'https://www.yuezijie.cn/resources/app/花得值.apk',//服务器下载地址
  kdt_id: 1,
  run_mode: 'online',
  debug: false,
  online_debug: false,
  js: {
    js_compress: true,
    css_compress: true,
    use_js_cdn: true,
    use_css_cdn: true,
    message_report: true,
    checkbrowser: true,
    hide_wx_nav: true,
    qn_public: 'kdt_img',
    qn_private: 'kdt-private'
  },
  isNewUI: true,
  isSuperStore: false,
  sourceType: 0,
  isWishOpen: 1,
  lock_create_showcase: false,
  paidcontent_auth: true,
};

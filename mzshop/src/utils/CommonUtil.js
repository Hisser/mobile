
var CommonUtil = {}
CommonUtil.getQueryString = function (name) {
    var urlHost = window.location.hash;
    if (urlHost.indexOf("?") != -1) {
        var param = urlHost.split("?")[1];
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = param.match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
    }
    return null;
}

CommonUtil.getQueryString1 = function (name) {
  var urlHost = window.location.hash;
  console.log(name)
    var reg = new RegExp( name + "=([^&]*)", "i");
    var r = urlHost.match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }

  return null;
}

//判断微信环境
CommonUtil.isWeiXin = function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
      return false;
    }
}
//判断支付宝浏览器
CommonUtil.isAlipay = function () {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/Alipay/i) == "alipay") {
    return true;
  } else {
    return false;
  }
}

//判断ios或者安卓
CommonUtil.isAndroidOrIOS = function () {
  // var agent = window.navigator.userAgent.toLowerCase();
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS     //alert(navigator.userAgent);
    return 'ios';
  } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
    return 'Android';
  }
}

//根据图片大小(banner默认750*180)计算高度
CommonUtil.heightAdapt =function(w){
  return w * 180 / 750
}
//根据图片的尺寸百分比计算高度
CommonUtil.heightAdapt2 = function(w,picWidth,picHeight){
  return (w * document.body.clientWidth) * picHeight /picWidth
}

//判断是否是手机号
CommonUtil.isPhone = function(phoneNumber){
  return (/^1[13579]\d{9}$/.test(phoneNumber))
}


CommonUtil.getParamsObj = function (search) {
    var params = search.split("&");
    var paramsObjStr = '{'
    for (var i = 0; i < params.length; i++) {
        var key = params[i].split("=")[0];
        var value = params[i].split("=")[1];
        if (i == 0) {
            paramsObjStr += '"' + key + '":"' + value + '"';
        } else {
            paramsObjStr += ',"' + key + '":"' + value + '"';
        }
    }
    paramsObjStr += '}';
    return eval('(' + paramsObjStr + ')')
}

CommonUtil.Audio2dataURL = function (file) {
    var reader = new FileReader();
    reader.onloadend = function (e) {
        console.log(e.target.result);
    };
    reader.readAsDataURL(file);
}

CommonUtil.addDate = function (date, days) {
    var newDate = new Date(date);
    var longtime = newDate.valueOf()
    longtime = longtime + days * 24 * 60 * 60 * 1000
    newDate = new Date(longtime)
    return newDate;
}

CommonUtil.subDate = function (date, days) {
    var newDate = new Date(date);
    var longtime = newDate.valueOf()
    longtime = longtime - days * 24 * 60 * 60 * 1000
    newDate = new Date(longtime)
    return newDate;
}

CommonUtil.pagedList = function (pager, pageNo) {
    if (pager.totalPageCount >= pageNo) {
        var fromIndex = (pageNo - 1) * pager.pageSize;
        if (fromIndex >= pager.data.length) {
            return "";
        }
        var toIndex = pageNo * pager.pageSize;
        if (toIndex >= pager.data.length) {
            toIndex = pager.data.length;
        }
        return pager.data.slice(fromIndex, toIndex);
    }
}
/*根据不同格式化日期*/
CommonUtil.formatDate = function (date, fmt) { //author: meizz
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

// CommonUtil.loading = function (discription) {
//     if (!discription) {
//         discription = "数据加载中...";
//     }
//     $('#main_view').loading({
//         loadingWidth: 120,
//         title: '',
//         name: 'loading',
//         discription: discription,
//         direction: 'column',
//         type: 'origin',
//         originDivWidth: 40,
//         originDivHeight: 40,
//         originWidth: 6,
//         originHeight: 6,
//         smallLoading: false,
//         loadingMaskBg: 'rgba(0,0,0,0.2)'
//     });
// }

// CommonUtil.removeLoading = function () {
//     removeLoading('loading');
// }

if (typeof module != 'undefined' && module.exports) module.exports = CommonUtil; // CommonJs export
// if (typeof define == 'function' && define.amd) define([], function () {
//     return CommonUtil;
// }); // AMD

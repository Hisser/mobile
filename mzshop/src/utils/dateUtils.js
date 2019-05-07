export const DateUtils = {
    /**
     * 时间戳转YYYY-MM-DD hh:mm:ss
     * @param param
     * @returns {string}
     */
    parseYMDHms: (param) => {
        let date = new Date(param);
        let Y = date.getFullYear();
        let M = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return `${Y}-${M}-${D} ${h}:${m}:${s}`
    },

    /**
     * 时间戳转YYYY-MM-DD
     * @param param
     * @returns {string}
     */
    parseYMD: (param) => {
        let date = new Date(param);
        let Y = date.getFullYear();
        let M = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return `${Y}-${M}-${D}`
    },

    /**
     * 时间戳转几天前
     * @param param
     * @returns {string}
     */
    timeAgo: (param) => {
        let timeStamp = param;//待转换的时间戳
        let nowStamp = (new Date()).getTime();
        let _time = nowStamp - timeStamp;
        //60000ms = 1min
        if (_time < 60000) {
            //1分钟内
            return '1分钟内'
        } else if (_time < (60000 * 60)) {
            //几分钟前
            // console.warn(parseInt(_time / 60000).toString() + '分钟前');
            return parseInt(_time / 60000).toString() + '分钟前'
        } else if (_time < (60000 * 60 * 24)) {
            //几小时前
            // console.warn(parseInt(_time / (60000 * 60)).toString() + '小时前');
            return parseInt(_time / (60000 * 60)).toString() + '小时前'
        } else if (_time < (60000 * 60 * 24 * 30)) {
            //几天前
            // console.warn(parseInt(_time / (60000 * 60 * 24)).toString() + '几天前');
            return parseInt(_time / (60000 * 60 * 24)).toString() + '天前'
        } else if (_time < (60000 * 60 * 24 * 30 * 12)) {
            //几个月前
            // console.warn(parseInt(_time / (60000 * 60 * 24 * 30)).toString() + '几个月前');
            return parseInt(_time / (60000 * 60 * 24 * 30)).toString() + '个月前'
        } else if (_time > (60000 * 60 * 24 * 30 * 12)) {
            //几年前
            // console.warn(parseInt(_time / (60000 * 60 * 24 * 30 * 12)).toString() + '几年前');
            return parseInt(_time / (60000 * 60 * 24 * 30 * 12)).toString() + '年前'
        } else {
            return DateUtils.parseYMD(param)
        }
    }
};
var nowDate = new Date();
var cloneNowDate = new Date();

var fullYear = nowDate.getFullYear();
var month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
var date = nowDate.getDate();

var endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天

// 格式化日期 (2016-02-14)
function getFullDate(targetDate) {
    var D, y, m, d;
    if (targetDate) {
        D = new Date(targetDate);
        y = D.getFullYear();
        m = D.getMonth() + 1;
        d = D.getDate();
    } else {
        y = fullYear;
        m = month;
        d = date;
    }
    m = m > 9 ? m : '0' + m;
    d = d > 9 ? d : '0' + d;

    return y + '-' + m + '-' + d;
}

// 一天的时间戳(毫秒为单位)
var timestampOfDay = 1000*60*60*24;

// 今天，昨天
var _fullToday = getFullDate();
var _fullYesterday = getFullDate(nowDate - timestampOfDay);

var nowDay = nowDate.getDay(); // getDay 方法返回0 表示星期天
nowDay = nowDay === 0 ? 7 : nowDay;

// 本周一，本周末(星期天)
// 注：在safari下（nowDate +- 0）不会转换为时间戳，这里在nowDate前加上运算符+，手动转换时间戳运算
var _fullMonday = getFullDate( +nowDate - (nowDay-1)*timestampOfDay );
var _fullSunday = getFullDate( +nowDate + (7-nowDay)*timestampOfDay );

// 月初，月末
var _fullStartOfMonth = getFullDate( cloneNowDate.setDate(1) );
var _fullEndOfMonth = getFullDate( cloneNowDate.setDate(endOfMonth) );

export const fullToday = _fullToday;
export const fullYesterday = _fullYesterday;
export const fullMonday = _fullMonday;
export const fullSunday = _fullSunday;
export const fullStartOfMonth = _fullStartOfMonth;
export const fullEndOfMonth = _fullEndOfMonth;

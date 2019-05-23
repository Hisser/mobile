import {fetchPost,Post} from "../utils/http";
import $ from 'jquery';
/******查询搜索************/
export function querySearchRecord() {
  let  data={
    service :'querySearchRecords',
  };
  return fetchPost('/api/gateWay', data)
}

/**********推荐热搜***********/
export  function queryHotSearch(){
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: window._global.tj_url,
      async: false,    //是否异步
      dataType: "jsonp",
      success: function (response) {
        resolve(response.querys);
      }
    });
  })
}

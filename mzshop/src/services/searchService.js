import {fetchPost} from "../utils/http";

/******查询搜索************/
export function querySearchRecord() {
  let  data={
    service :'querySearchRecords',
  };
  return fetchPost('/api/gateWay', data)
}

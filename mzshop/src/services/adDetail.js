import {fetchPost} from "../utils/http";

export function queryADDetails(id) {
  let data = {
    service: 'adDetailService',
    adId: id.id,
  };
  return fetchPost('/api/gateWay', data)
}

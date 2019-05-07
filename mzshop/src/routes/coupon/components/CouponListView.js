/**
 * Created by Administrator on 2018/7/24 0024.
 */

import React from 'react';
import {ListView} from 'antd-mobile';
import * as wechatApi from "../../../wechatApi";
import {Toast,Modal} from "antd-mobile/lib/index";
const alert = Modal.alert
function genData(length = 3) {
  const dataBlob = {};
  var pIndex = 0;
  for (let i = 0; i < length; i++) {
    const ii = (pIndex * length) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

class CouponListView extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,
    };
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.goodsDetailInfos !== this.props.goodsDetailInfos && this.props.goodsDetailInfos.title == undefined){

      setTimeout(function () {
        let plat = '';
        if (nextProps.goodsDetailInfos.from === 'taobao' || nextProps.goodsDetailInfos.from == 'tmall') {
          plat = '1_';
        } else if (nextProps.goodsDetailInfos.from === 'jd') {
          plat = '2_';
        } else if (nextProps.goodsDetailInfos.from === 'pdd') {
          plat = '3_';
        }
        nextProps.goodsDetailInfos.goodsId = plat + nextProps.goodsDetailInfos.goodsId;
        var param = {
          title: '我发现了一个好货,只需要￥' + nextProps.goodsDetailInfos.price + '，点开带走它吧！',
          link: window._global.url.host + "/api/redirect?redirectUrl=" + '/detail/' + nextProps.goodsDetailInfos.goodsId,
          imgUrl: nextProps.goodsDetailInfos.picUrl,
          desc: nextProps.goodsDetailInfos.title,
          success: function () {
            // dispatch({type: 'coupon/showModel1', payload: false});
            alert('分享成功');
          },
        };
        wechatApi.share(param);
      },3000);//1、2秒不行

    };


  }


  render() {
    var rData = genData(this.props.imgList.length);

    let index = -1;
    const row = (rowID) => {
      index++;
      if (index >= this.props.imgList.length) {
        index = 0;
      }
      const obj = this.props.imgList[index];
      return (
        <div key={rowID}>
          <div style={{display: 'flex'}}>
            <img style={{width: '100%', height: '100%',}} src={obj} alt="图像加载失败"/>
          </div>
        </div>
      );
    };

    return (
      <ListView
        // ref={el => this.lv = el}
        // dataSource={this.state.dataSource}
        dataSource={this.state.dataSource.cloneWithRows(rData)}
        renderRow={row}
        pageSize={3}
        useBodyScroll
        scrollRenderAheadDistance={500}
        // onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}

export default CouponListView;


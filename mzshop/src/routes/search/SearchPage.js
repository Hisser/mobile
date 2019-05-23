/**
 * Created by Administrator on 2018/7/31 0031.
 */

import React from 'react';
import {connect} from 'dva';
import {Flex, WhiteSpace, Button, SearchBar, Modal} from 'antd-mobile';
import styles from './SearchPage.css';
import {routerRedux} from "dva/router";
import CommonUtil from "../../utils/CommonUtil";
const alert = Modal.alert;
var wx = require('weixin-js-sdk');


const GoodsCategory = [
  {title: '女装'},
  {title: '男装'},
  {title: '美妆护肤'},
  {title: '配饰'},
  {title: '母婴用品'},
  {title: '男鞋'},
  {title: '女鞋'},
  {title: '零食'},
  {title: '箱包'},
  {title: '个人洗护'},
  {title: '手机周边'},
  {title: '数码家电'},


  {title: '内衣袜子'},
  {title: '成人用品'},
  {title: '日用家居'},
  {title: '文体娱乐'},
];


function SearchPage({dispatch, search}) {

  //返回上一页
  function BackPrevious() {
    document.referrer === '' ? dispatch(routerRedux.push("/")) : dispatch(routerRedux.goBack())
  }

  function SearchGoods(searchWord, sort) {
    if (searchWord == null || searchWord == '') {
      alert("搜索内容不能为空！")
      return;
    } else {
      let plat = 'taobao';
      dispatch(routerRedux.push(`/searchResult/${plat}/${searchWord}`));
    }
  }


  function clear() {
    window.localStorage.clear();
    if(CommonUtil.isWeiXin()) {
      wx.closeWindow();
    }else{
      dispatch(routerRedux.push("/"));
    }
  }

  //花得值APP在应用宝的下载地址
  function OpenImmediate() {
      // window.location.href = "http://suo.im/4RxWxb";
      window.location.href="https://android.myapp.com/myapp/detail.htm?apkName=com.qianshou.zshop&ADTAG=mobile";
  }

  return (
    <div className={styles.div}>
      <div className={styles.search_div}>
        <div className={styles.search_close} onClick={BackPrevious}>返回</div>
        <SearchBar
          placeholder="搜索商品，发现更多优选"
          onSubmit={value => SearchGoods(value, 0)}
          onCancel={value => SearchGoods(value, 0)}
          cancelText="搜索"
          maxLength={200}
          showCancelButton
          className={styles.search_bar} />
      </div>

      <div className={styles.flex_container}>
        <div className={styles.sub_title}>历史搜索</div>
        <Flex wrap="wrap">
          {search.userQueryList.map((item, idx) => (
            <Button inline key={idx} className={styles.btn_hot_search}
                    onClick={() => SearchGoods(item.keyword, 0)}> {item.keyword}</Button>))}
        </Flex>

        <div className={styles.sub_title}>推荐搜索</div>
        <Flex wrap="wrap">
          {
            search.hotSearchList.length>0 ?
            search.hotSearchList.map((item, idx) => (
              <Button inline key={idx} className={styles.btn_hot_search}
                      onClick={() => SearchGoods(item, 0)}> {item}</Button>))
              :null
          }

        </Flex>

        <WhiteSpace size="lg"/>
        <div className={styles.sub_title}>商品分类</div>
        <Flex wrap="wrap">
          {GoodsCategory.map((item, idx) => (
            <Button key={idx}  className={styles.btn_goods_search}
                    onClick={() => SearchGoods(item.title, 0)}> {item.title}</Button>))}
        </Flex>

        <WhiteSpace size="lg"/>
        <WhiteSpace size="lg"/>
        <Flex>
          <Button inline className={styles.btn_app_download} onClick={OpenImmediate}>去花得值APP，找更多优惠</Button>
        </Flex>
        <div style={{marginTop:'30rem',textAlign:'center'}}>

          <button className={styles.button1} onClick={clear }>清除缓存</button>

        </div>
      </div>
    </div>
  );
}

export default connect(({search}) => {
  search
  return {search}
})(SearchPage);

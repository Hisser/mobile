/**
 * Created by Administrator on 2018/8/1 0001.
 */

import React from 'react';
import imgNo1 from '../../../assets/No1.png'
import imgNo2 from '../../../assets/No2.png'
import imgNo3 from '../../../assets/No3.png'
import styles from './XScrollCom.css';
import {WhiteSpace} from 'antd-mobile';
import {routerRedux} from "dva/router";
import {connect} from 'dva';


class XScrollCom extends React.Component {
  constructor(props) {
    super(props);
  }

  turn = () => {
    var type = 'top';
    this.props.dispatch(routerRedux.push(`/goodslist/${type}`));
  }

  render() {
    let data = [];
    if (this.props.topList != null && this.props.topList != undefined && this.props.topList.length > 0) {
      data = this.props.topList;
    }
    return (
      <div className={styles.container}>
        <div className={styles.container_x}>
          {data.map((dataItem, idx) => (
            <div className={styles.item_div} key={idx} onClick={() => this.turn()}>
              {idx < 3 ? <img className={styles.no_img} src={idx == 0 ? imgNo1 : idx == 1 ? imgNo2 : imgNo3}/> : null}
              <img className={styles.item_img} src={dataItem.picUrl} alt="图像加载失败"/>
              <div className={styles.commodity_info }>
                <div className={styles.commodity_title }>
                  {dataItem.title}
                </div>
                <div className={styles.commodity_price}>
                    <span className={styles.price }>
                      <i className={styles.price_symbol}>¥</i>
                      {dataItem.price}
                    </span>
                  <p className={styles.sales_num }> {dataItem.salesNum}人已买</p>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.commodity_info_more } onClick={() => this.turn()}>
            <WhiteSpace size="xl"/>
            <span className={styles.top_list_see_more_text}>更多商品</span>
            <br/>
            <span className={styles.top_list_see_more_sub_text}>see-more</span>
          </div>
          <div className={styles.commodity_info_more_space}></div>
        </div>
      </div>
    );
  }
}

export default connect(({postageNine}) => {
  postageNine
  return {postageNine}
})(XScrollCom);

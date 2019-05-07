import {connect} from "dva/index";
import React from "react";
import AdDetailComponent from "./components/adDetailComponent";
import BackToTop from "../coupon/components/BackToTop";
import styles from './adDetail.css';
import {Icon, NavBar} from "antd-mobile";
import {routerRedux} from "dva/router";


function AdDetail({dispatch,addetail}) {

  function BackPrevious() {
    dispatch(routerRedux.push("/"));
  }


  return(
    <div>

      {
        addetail.flag == 'app' ||addetail.flag=='' ? null :

          <div className={styles.fixedTop}>
            <NavBar leftContent={<span className={styles.back}>返回</span>}
                    icon={<Icon type="left" className={styles.back_icon}/>}
                    className={styles.navbar}
                    onLeftClick={BackPrevious}
            ><span className={styles.navTitle}>详情</span>
            </NavBar>

          </div>
      }
      {addetail.detail.adCode?(
        <AdDetailComponent adCode={addetail.detail.adCode} adContent={addetail.detail.adContent} flag={addetail.flag}/>
      ):null}
      <BackToTop/>
    </div>
  );

}

export default connect(({addetail}) => {
  addetail
  return {addetail}
})(AdDetail);

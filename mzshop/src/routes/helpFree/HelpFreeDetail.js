import {connect} from "dva/index";
import {routerRedux} from "dva/router";
import styles from './helpfreedetail.css';
import {Button, Icon, NavBar, WhiteSpace} from "antd-mobile";
import pic from '../../assets/picFashion.jpg';
import {CountTime} from "./component/CountTime";
import HelpFreeDetailComponent from "./HelpFreeDetailComponent";

function HelpFreeDetail({dispatch, helpFreeDetail}) {

  window.scrollTo(0,0);

  //返回上一页
  function BackPrevious() {
    document.referrer === '' ? dispatch(routerRedux.push("/")) : dispatch(routerRedux.goBack())
  }

  function HelpFree() {
    var detailId=helpFreeDetail.list.detailId;
    var groupDetailId=helpFreeDetail.groupDetailVO.groupDetailId;
    dispatch({
      type: 'helpFreeDetail/helpFree',
      payload: detailId,groupDetailId,
    });
  }
  return(
    <div style={{backgroundColor:'#ff6060',height:'100%'}}>
      <div className={styles.fixedTop}>
        <NavBar leftContent={<span className={styles.back}>返回</span>}
                icon={<Icon type="left" className={styles.back_icon}/>}
                className={styles.navbar}
                onLeftClick={BackPrevious}>
          <span className={styles.navTitle}>助力详情</span> </NavBar>
      </div>

    <HelpFreeDetailComponent/>
    </div>
  )

}

export default connect(({helpFreeDetail}) => {
  helpFreeDetail
  return {helpFreeDetail}
})(HelpFreeDetail);

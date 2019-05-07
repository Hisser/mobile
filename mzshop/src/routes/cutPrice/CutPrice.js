import {connect} from "dva/index";
import styles from './cutprice.css';
import styles1 from './mycut.css';
import {Card, Carousel, Icon, NavBar, WhiteSpace, Button, List, Tabs,Flex} from "antd-mobile";
import {routerRedux} from "dva/router";
import share from '../../assets/share.png';
import Rule from "./component/Rule";
import {CountTime} from "./component/CountTime";
//import {GoodsListView} from "./component/GoodsListView";
 import GoodsListView from "./component/GoodsListView";
import GoodsListView2 from "./component/GoodsListView2";
import CutPriceComponent from "./CutPriceComponent";





const tabs2 = [
  {title: '砍价商品'},
  {title: '我的砍价'},
];


function CutPrice({dispatch, cutPrice}) {


  //返回上一页
  function BackPrevious() {
    changeFlag('1');
    document.referrer === '' ? dispatch(routerRedux.push("/")) : dispatch(routerRedux.goBack())
  }
  function changeFlag(index) {
    dispatch({
      type: 'cutPrice/changeFlag',
      payload: {
        flag: index,
      }
    })

  }

  function hideModel() {
    dispatch({type: 'cutPrice/showModel', payload: false});
  }


  return (
    <div>
      <div className={styles.fixedTop}>
        <NavBar leftContent={<span className={styles.back}>返回</span>}
                rightContent={<Rule/>}
                icon={<Icon type="left" className={styles.back_icon}/>}
                className={styles.navbar}
                onLeftClick={BackPrevious}>
          <span className={styles.navTitle}>砍价免费拿</span> </NavBar>
      </div>

      <CutPriceComponent/>

      {
        cutPrice.modelVisible===true?
          <div onClick={hideModel}>
            <div id={'zezao'} style={{ backgroundColor: '#2a2b2c',zIndex: '991',position: 'fixed',opacity:'0.6',top:'0',height: '100%',width: '100%'}}>
              <div style={{width: '30%', display: 'inline-block', float: 'right'}}>
                <img src={share} style={{width: '100%', marginTop: '0rem'}}/>
              </div>
            </div>
            <div id={'zezao'} style={{position: 'fixed', zIndex: '995', top: '2.4rem', left: '2.5rem'}}>
              <span style={{fontSize: '0.5rem', fontFamily: 'Microsoft YaHei', color: 'white'}}>
               点击右上角进行分享
              </span>
            </div>
          </div> : null
      }


    </div>
  )

}

export default connect(({cutPrice}) => {
  cutPrice
  return {cutPrice}
})(CutPrice);

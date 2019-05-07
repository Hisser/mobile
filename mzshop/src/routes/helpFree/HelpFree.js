import {connect} from "dva/index";
import styles from './helpfree.css';
import {Card, Carousel, Icon, NavBar, WhiteSpace, Button, List, Tabs} from "antd-mobile";
import {routerRedux} from "dva/router";
import Rule from "./component/Rule";
import HelpFreeComponent from "./HelpFreeComponent";
import share from '../../assets/share.png';

const goodsList=[{
  name:'袁志豪',
  goods:'苹果X'
},{
  name:'小明',
  goods:'ipone4'
},{
  name:'小东',
  goods:'苹果6'
},{
  name:'小北',
  goods:'三星S8'
},{
  name:'小村',
  goods:'蓝莓'
}]



const tabs2 = [
  { title: '助力商品', sub: '1' },
  { title: '我的助力', sub: '2' },
];


function HelpFree({dispatch, helpFree}) {
  // window.scrollTo(0,0);
  //返回上一页
  function BackPrevious() {

    changeFlag('1');

    document.referrer === '' ? dispatch(routerRedux.push("/")) : dispatch(routerRedux.goBack())
  }

  function changeFlag(index) {
    dispatch({
      type: 'helpFree/changeFlag',
      payload: {
        flag: index,
      }
    })
  }

  function hideModel() {
    dispatch({type: 'helpFree/showModel', payload: false});
  }

  return (
    <div>
      <div className={styles.fixedTop}>
        <NavBar leftContent={<span className={styles.back}>返回</span>}
                rightContent={ <Rule/>}
                icon={<Icon type="left" className={styles.back_icon}/>}
                className={styles.navbar}
                onLeftClick={BackPrevious}>
          <span className={styles.navTitle}>助力享免单</span> </NavBar>
      </div>
      {
        helpFree.modelVisible?
          <div onClick={hideModel}>
            <div id={'zezao'} style={{ backgroundColor: '#2a2b2c',zIndex: '991',position: 'fixed',opacity:'0.6',top:'0',height: '100%',width: '100%'}}>
              <div style={{width: '30%', display: 'inline-block', float: 'right'}}>
                <img src={share} style={{width: '100%', marginTop: '0rem'}}/>
              </div>
            </div>
            <div id={'zezao'} style={{position: 'fixed', zIndex: '995', top: '3.8rem', left: '2.5rem'}}>
              <span style={{fontSize: '0.5rem', fontFamily: 'Microsoft YaHei', color: 'white'}}>
               点击右上角进行分享
              </span>
            </div>
          </div> : null
      }

      <HelpFreeComponent/>
    </div>
  )

}

export default connect(({helpFree}) => {
  helpFree
  return {helpFree}
})(HelpFree);

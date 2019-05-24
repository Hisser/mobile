import React from 'react';
import {connect} from 'dva';
import {routerRedux} from "dva/router";
import {Button, Flex, Modal, Carousel,WhiteSpace} from 'antd-mobile';
import {Toast} from "antd-mobile/lib/index";
import styles from './CouponPage.css';
import CouponListView from '../coupon/components/CouponListView.js'
import BackToTop from '../coupon/components/BackToTop.js'
import ImgBaoyou from '../../assets/baoyou.png'
import ImgOpenTaobao from '../../assets/openTaobao.png'
import ImgClose from '../../assets/close.png'
import ImgCouponAfter from '../../assets/daoshou.png'
import copy from 'copy-to-clipboard';
import Imgback from '../../assets/backPrevious2.png'
import imgTaobao from '../../assets/taobaologo.png'
import imgTmall from '../../assets/tmalllogo.png'
import imgJD from "../../assets/jd_rectangle.png";
import imgPdd from "../../assets/pdd_square.png";
import sharePic from '../../assets/share.png';
import redpac from '../../assets/redpac.png';
import quota_state from '../../assets/quota_state.png';
import couponQuan from '../../assets/couponQuan.png';
import isvip from '../../assets/isvip.png';
import novip from '../../assets/novip.png';
import redPack from '../../assets/redPack.png';
import couponFan from '../../assets/fan.png';
import * as wechatApi from "../../wechatApi";
import CommonUtil from "../../utils/CommonUtil";
import {fetchPost} from "../../utils/http";
import $ from "jquery";

const alert = Modal.alert;
//花得值APP在应用宝的下载地址
function OpenImmediate() {
  window.location.href = "https://android.myapp.com/myapp/detail.htm?apkName=com.qianshou.zshop&ADTAG=mobile";
}

function CouponPage({dispatch, coupon}) {
  //默认回滚到最上面
  window.scrollTo(0, 0);








  function BackPrevious() {
    dispatch({type: 'coupon/clearGoodsInfo'});
    /*if (coupon.Flag != null) {
      dispatch(routerRedux.goBack());
    } else {
      dispatch(routerRedux.push("/"));
    }*/

    // dispatch(routerRedux.push("/"))
    //document.referrer === '' ? dispatch(routerRedux.push("/")) : dispatch(routerRedux.goBack());
  }

  //分享好友
  function showShareActionSheets(from, goodsId, title, pic, price) {

    if(CommonUtil.isWeiXin()) {
      dispatch({type: 'coupon/showModel1', payload: true});
      var param = {
        title: '我发现了一个好货,只需要￥' + price + '，点开带走它吧！',
        link: window._global.url.host + "/api/redirect?redirectUrl=" + '/detail/' + goodsId,
        imgUrl: pic,
        desc: title,
        success: function () {
          dispatch({type: 'coupon/showModel1', payload: false});
          alert('分享成功');
        },
      };
      wechatApi.share(param);
    }else if(CommonUtil.isAlipay()){//支付宝环境创建海报
      console.log(from,goodsId)
      dispatch({
        type:'coupon/createCouponPoster',
        payload:{
          from: from ,
          goodsId:goodsId
        }
      })

    }else{
      let userId =  window.localStorage.getItem('userId');
      if(userId ==null ||userId==''){
        alert('提示', '请返回支付宝或者微信进行分享', [
          { text: '取消', onPress: () => {console.log('取消分享')} },
          { text: '确定', onPress: () => {console.log('取消分享')}},
        ])
      }else{
        dispatch({
          type:'coupon/createCouponPoster',
          payload:{
            from: from ,
            goodsId:goodsId
          }
        })
      }
    }

  }

  function cutPrice(from, goodsId ,clickUrl) {
    if (from == 'taobao' || from == 'tmall') {
      // dispatch({type: 'coupon/queryUserTaoCashByGoods', payload: {goodsId}});
      // if(price < 1){
      //   Toast.info('只有价格大于1元的商品才能领取该红包！')
      // }else {
      //   dispatch({type: 'coupon/showModel4', payload: true});
      //
      // }

      let ua = navigator.userAgent.toLowerCase();
      let match = ua.match(/MicroMessenger/i);
      if (match !== null && Array.isArray(match) && match.length > 0) {
        match = match[0];
      }
      if (match === "micromessenger") {
        if (coupon.tbPwd !== null && coupon.tbPwd !== '') {
          copy(coupon.tbPwd);   //复制淘口令
          dispatch({type: 'coupon/showModel', payload: true});
        }
      }else{
        window.location.href = clickUrl;
      }



    } else if (from == 'jd') {
      dispatch(routerRedux.push(`/mycut/${from}/${goodsId}`));
    }

  }


  function hideMode() {
    dispatch({type: 'coupon/showModel', payload: false});
  }
  //分享model
  function hideMode1() {
    dispatch({type: 'coupon/showModel1', payload: false});
  }

  function hideMode2() {
    dispatch({type: 'coupon/showModel2', payload: false});
  }


  function hideMode4() {
    dispatch({type: 'coupon/showModel4', payload: false});
  }



  function openUrl(hasCoupon, plat, couponAccount, couponUrl) {
    // dispatch({type: 'coupon/showModel2', payload: false})
    dispatch({type: 'coupon/checkCopuponAccount', payload: {plat, hasCoupon, couponUrl}});

    let ua = navigator.userAgent.toLowerCase();
    let match = ua.match(/MicroMessenger/i);
    if (match !== null && Array.isArray(match) && match.length > 0) {
      match = match[0];
    }
    if (plat === '1') {
      if (match === "micromessenger") {
        if (coupon.tbPwd !== null && coupon.tbPwd !== '') {
          copy(coupon.tbPwd);   //复制淘口令
        }
      }
    }
  }

  function downApp() {
    if (CommonUtil.isAlipay()) {
      if(CommonUtil.isAndroidOrIOS() =='ios') {
        window.location.href = window._global.appStore_url;
      }else {
        dispatch({type: 'coupon/showModel1', payload: true});
      }
    }else if(CommonUtil.isWeiXin()){
      window.location.href = window._global.yyb_url;
    }else {
      if(CommonUtil.isAndroidOrIOS() =='ios') {
        window.location.href = window._global.appStore_url;
      }else {
        window.location.href = window._global.server_url;
      }
    }
  }


  function getCoupon(hasCoupon, plat, couponUrl) {
    if (plat === '1') {
      openUrl(goodsDetailInfo.hasCoupon, coupon.plat, goodsDetailInfo.couponPrice, goodsDetailInfo.couponUrl)
      // if(goodsDetailInfo.hasCoupon){
      //   dispatch({type: 'coupon/showModel2', payload: true});
      // }else{

      // }
    }else{
       window.location.href = couponUrl;
    }



}

let goodsDetailInfo = {
  title: '***.****.******.**.**.******',
  hasCoupon: false,
  price: 0,
  salesNum: 0,
  orgPrice: 0,
  couponPrice: 0,
  clickUrl: '',
  couponUrl: '',
  goodsGallery: [],
}
let priced = '';
//品牌特卖的商品没有最上面的图片，用主图代替
if (coupon.goodsInfo != null) {
  goodsDetailInfo = coupon.goodsInfo;
  // priced=parseInt(goodsDetailInfo.price) * 0.3.toFixed(1);
  priced = Math.round(parseInt(goodsDetailInfo.price) * 0.33 * 100) / 100;
  if (goodsDetailInfo.goodsGallery == null || goodsDetailInfo.goodsGallery.length == 0) {
    goodsDetailInfo.goodsGallery = [coupon.goodsInfo.picUrl];
  }
}

let plat = '去淘宝买';
let imgDetails = [];
if (coupon.details !== null && coupon.details instanceof Array) {
  imgDetails = coupon.details;
}

  if (coupon.plat === '1') {
    goodsDetailInfo.couponUrl = goodsDetailInfo.couponUrl === null ? goodsDetailInfo.clickUrl : goodsDetailInfo.couponUrl;

  } else if (coupon.plat === '2') {
    plat = '去京东买';

    if (coupon.details !== null) {
      goodsDetailInfo.clickUrl = coupon.details.clickUrl;
      goodsDetailInfo.couponUrl = coupon.details.couponUrl === ''|| coupon.details.couponUrl === null ? coupon.details.clickUrl : coupon.details.couponUrl;
    }
  } else if (coupon.plat === '3') {
    plat = '去拼多多买';
    console.log('coupon.details',coupon.details);
    if (coupon.details != null) {
      goodsDetailInfo.clickUrl = coupon.details.url;
      goodsDetailInfo.couponUrl = coupon.details.url;
    }
}

let platLogo = null;
let btnName = null;
if (coupon.goodsInfo !== null) {
  switch (coupon.goodsInfo.from) {
    case 'taobao':
      platLogo = imgTaobao;
      btnName = '查看详情';
      break;
    case 'tmall':
      platLogo = imgTmall;
      btnName = '查看详情';
      break;
    case 'jd':
      platLogo = imgJD;
      btnName = '任性砍';
      break;
    case 'pdd':
      platLogo = imgPdd;
      break;
  }
}

let seller = coupon.shopInfo;
let dsPrice = 0;
let commission = (parseFloat(goodsDetailInfo.commission) * 0.33).toFixed(2);
if(!goodsDetailInfo.hasCoupon){
  goodsDetailInfo.couponPrice = 0;
}
  dsPrice = (goodsDetailInfo.price -commission).toFixed(2);
return (
  <div>
    <div>
      <Carousel autoplay={true} infinite={true}>
        {goodsDetailInfo.goodsGallery.map((item, idx) => (
          <img src={item} key={idx} style={{width: '100%', height: 'auto'}}
               onLoad={() => {
                 window.dispatchEvent(new Event('resize'));
               }}
          />
        ))}
      </Carousel>
    </div>

    <div className={styles.back_previous} onClick={BackPrevious}>
      <img className={styles.back_previous_img} src={Imgback} alt="返回"/>
    </div>

    <div className={styles.cmd_info_price_div}>
      <div className={styles.commodityCardMsg}>
        <div className={styles.commodityCardTitleTmall}>
          <img className={styles.commodityCardTitleFreePostage}
               src={platLogo}/>
          <img className={styles.commodityCardTitleFreePostage} src={ImgBaoyou}/>
          <span style={{lineHeight: '0.45rem',fontSize: '0.4rem',fontFamily:'Microsoft YaHei',color:'#737373'}}>{goodsDetailInfo.title}</span>
        </div>
      </div>

      <div>
        <div className={styles.cmd_info_price_row}>
          <div style={{display: 'inline-block'}}>
            {/*{goodsDetailInfo.hasCoupon ?*/}
              <img className={styles.cmd_info_price_row_quan} src={ImgCouponAfter}/>
            {/*: null }*/}
            <span className={styles.cmd_info_price_row_price}>

            <i className={styles.element_style}>￥</i>
              {dsPrice}
            </span>&nbsp;&nbsp;

            {/*{goodsDetailInfo.hasCoupon ? null :*/}
              {/*<span className={styles.cmd_info_sale_num1}>月销量：{goodsDetailInfo.salesNum}</span>*/}
            {/*}*/}
            </div>
          <div style={{display: 'inline-block', float: 'right'}}>

            <button className={styles.share_button}
                    onClick={() => showShareActionSheets(goodsDetailInfo.from, goodsDetailInfo.goodsId, goodsDetailInfo.title, goodsDetailInfo.picUrl, goodsDetailInfo.price)}>
              分享好友
            </button>

          </div>
        </div>

        {/*{goodsDetailInfo.hasCoupon ?*/}
          <div className={styles.cmd_info_price_info}>
            <span className={styles.cmd_info_price_old}>
              原价{
              goodsDetailInfo.orgPrice ? <i className={styles.cmd_info_price_old_i}>￥{goodsDetailInfo.orgPrice}</i>
              :
              <i className={styles.cmd_info_price_old_i}>￥{goodsDetailInfo.origPrice}</i>
            }

            </span>
            <span className={styles.cmd_info_sale_num}>月销量：{goodsDetailInfo.salesNum}</span>
          </div>
        {/*: null}*/}

        {goodsDetailInfo.hasCoupon ?
          <div>
            <div className={styles.middle_quan}
                 onClick={() => getCoupon(goodsDetailInfo.hasCoupon, coupon.plat, goodsDetailInfo.couponUrl)}>
              <div className={styles.middle_quan_left}>

                {(goodsDetailInfo.startTime != null || goodsDetailInfo.endTime != null) ?
                  <div>
                    <p className={styles.middle_quan_money}>{goodsDetailInfo.couponPrice}元优惠券,APP下单返{commission}元</p>
                    <p className={styles.middle_quan_usetime}>
                      使用期限：{goodsDetailInfo.startTime == null ? '截止到：' : goodsDetailInfo.startTime.substring(0, 10) + '-'}{goodsDetailInfo.endTime.substring(0, 10)}</p>
                  </div>
                  : <p className={styles.middle_quan_money_only}>{goodsDetailInfo.couponPrice}元优惠券,APP下单返{commission}元</p>
                }
              </div>
              <div className={styles.middle_quan_right}>
                <div className={styles.middle_quan_get}>立即领取</div>
              </div>
              <div className={styles.middle_quan_clear}></div>
            </div>
          </div> :

          <div>
            <div className={styles.middle_quan}
                 onClick={() => getCoupon(goodsDetailInfo.hasCoupon, coupon.plat, goodsDetailInfo.couponUrl)}>
              <div className={styles.middle_quan_left}>
                  <p className={styles.middle_quan_money}>下单返{commission}元</p>
                <p className={styles.middle_quan_usetime}>超值好货，买就返现</p>
              </div>
              <div className={styles.middle_quan_right}>
                <div className={styles.middle_quan_get}>立即领取</div>
              </div>
              <div className={styles.middle_quan_clear}></div>
            </div>
          </div>
        }

      </div>

      {
        window.localStorage.getItem('channelInfo')!='null' ?

      <div style={{
        backgroundImage: "url('"+isvip+"')",
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        width:'100%',
        height:'1.5rem',
      }} onClick={()=>downApp()}>
        <div style={{paddingLeft:'28%'}}>
          <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.4rem',color:'#79412d',lineHeight:'1.5rem'}}>你已是超级VIP,下单返</span>
          <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.4rem',color:'#fe0e0e',lineHeight:'1.5rem'}}>{commission * 2}元</span>
        </div>

      </div>
          :
          <div style={{
            backgroundImage: "url('"+novip+"')",
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            width:'100%',
            height:'1.5rem',
          }} onClick={()=>downApp()}>
            <div style={{paddingLeft:'28%'}}>
              <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.4rem',color:'#79412d',lineHeight:'1.5rem'}}>升级为超级VIP,下单返</span>
              <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.4rem',color:'#fe0e0e',lineHeight:'1.5rem'}}>{commission * 2}元</span>
            </div>

          </div>
      }
      <WhiteSpace/>
    </div>

    {seller == null ? null :
      <div className={styles.shop_info}>
        <div className={styles.shop_info_div}>
          <div className={styles.shop_info_left}>
            <img src={seller.shopIcon} className={styles.shop_icon}/>
          </div>
          <div className={styles.shop_info_right}>
            <div>
              <p>{seller.sellerNick}</p>
            </div>

            <div className={styles.shop_level_div}>
              <img style={{height: '0.45rem'}} src={seller.creditLevelIcon}/>
            </div>
          </div>
        </div>

        <hr style={{backgroundColor: '#aaaaaa', opacity: '0.2', clear: 'both'}}/>
        <div style={{paddingBottom: '0.3rem'}}>
          <div className={styles.shop_level_left}>
            <span>{seller.evaluates[0].title}:</span>
            <span style={{color: seller.evaluates[0].levelTextColor}}>{seller.evaluates[0].score}</span>
            <div className={styles.shop_level}
                 style={{
                   color: seller.evaluates[0].levelTextColor,
                   backgroundColor: seller.evaluates[0].levelBackgroundColor
                 }}>{seller.evaluates[0].levelText}</div>
          </div>
          <div className={styles.shop_level_middle}>
            <span>{seller.evaluates[1].title}:</span>
            <span style={{color: seller.evaluates[1].levelTextColor}}>{seller.evaluates[1].score}</span>
            <div className={styles.shop_level}
                 style={{
                   color: seller.evaluates[1].levelTextColor,
                   backgroundColor: seller.evaluates[1].levelBackgroundColor
                 }}>{seller.evaluates[1].levelText}</div>
          </div>
          <div className={styles.shop_level_right}>
            <span>{seller.evaluates[2].title}:</span>
            <span style={{color: seller.evaluates[2].levelTextColor}}>{seller.evaluates[2].score}</span>
            <div className={styles.shop_level}
                 style={{
                   color: seller.evaluates[2].levelTextColor,
                   backgroundColor: seller.evaluates[2].levelBackgroundColor
                 }}>{seller.evaluates[2].levelText}</div>
          </div>
        </div>
      </div>
    }

    <div>
      <p className={styles.titleCenter}>---------宝贝详情---------</p>
      <CouponListView imgList={imgDetails}   goodsDetailInfos={goodsDetailInfo} />
    </div>

    <div className={styles.download_div}>
      <Flex>
        <Button inline className={styles.btn_app_download} onClick={()=>downApp()}>去花得值APP，找更多优惠</Button>
      </Flex>
    </div>

    <footer className={styles.footer}>
      <Flex>
        <Flex.Item>
          <div style={{height: '1.2rem', textAlign: 'center'}} onClick={()=>downApp()}>
            <span className={styles.footer_app_info}>APP购买拿返现</span>
          </div>
        </Flex.Item>
{/*        {
          (btnName !== null) ?
            <Flex.Item style={{backgroundColor: '#F7913B', margin: '0'}}>
              <div style={{margin: 0, textAlign: 'center', height: '1.3rem', verticalAlign: 'middle'}}
                   onClick={() => cutPrice(goodsDetailInfo.from, goodsDetailInfo.goodsId,goodsDetailInfo.clickUrl )}>
                {btnName === '查看详情' ?
                  <div>
                    <div className={styles.footer_button_height_all}>{btnName}</div>
                  </div> : <div className={styles.footer_button_height_all}>{btnName}</div>}
              </div>
            </Flex.Item>
            : null
        }*/}

        <Flex.Item style={{margin: '0'}}>
          <div style={{backgroundColor: '#F73525', height: '1.3rem', textAlign: 'center',}}
               onClick={() => getCoupon(goodsDetailInfo.hasCoupon, coupon.plat, goodsDetailInfo.couponUrl)}>
            {/*<span className={styles.footer_price_button}>￥{goodsDetailInfo.price}</span>*/}
            <div className={styles.footer_button}>{goodsDetailInfo.hasCoupon ? '领券购买' : plat}</div>
          </div>
        </Flex.Item>
      </Flex>
    </footer>

    <BackToTop/>

    {/*淘宝弹框*/}
    <div>
      <Modal visible={coupon.modelVisible} transparent maskClosable={false}>
        <div className={styles.showTaokey}>
          <div className={styles.showTaokey_taokey}>
            <div>
              <img className={styles.showTaokey_taokey_img} src={ImgOpenTaobao} alt="打开淘宝"/>
              <div className={styles.showTaokey_tip}>
                <span>没有【手机淘宝】APP</span>
                <br/>
                <a className={styles.showTaokey_a}
                   href={goodsDetailInfo.hasCoupon && goodsDetailInfo.couponUrl != null ? goodsDetailInfo.couponUrl : goodsDetailInfo.clickUrl}>
                  点这里也能买&gt;
                </a>
              </div>
            </div>
            <div onClick={() => hideMode()} className={styles.showTaokey_a_close}>
              <img className={styles.showTaokey_a_close_img} src={ImgClose} alt=''/>
            </div>
          </div>
        </div>
      </Modal>
    </div>

    {/*红包弹出*/}
    <div>
      <Modal visible={coupon.modelVisible4} transparent maskClosable={false}>
        <div className={styles.showTaokey}>
          <div className={styles.showTaokey_taokey1}>
            <div>
              <img className={styles.showTaokey_taokey_img} src={couponQuan} alt="优惠券"/>

            </div>
            <div className={styles.showTaokey_span3}>
              <button className={styles.button} onClick={() => openUrl(goodsDetailInfo.hasCoupon, coupon.plat, goodsDetailInfo.couponPrice, goodsDetailInfo.couponUrl)}>立即使用</button>
            </div>
            <div onClick={() => hideMode4()} className={styles.showTaokey_a_close1}>
              <img className={styles.showTaokey_a_close_img} src={ImgClose} alt=''/>
            </div>
          </div>
        </div>
      </Modal>
    </div>





    {
      coupon.modelVisible1 ?
        <div onClick={() => hideMode1()}>
          <div id={'zezao'} style={{
            backgroundColor: '#2a2b2c',
            zIndex: '991',
            position: 'fixed',
            opacity: '0.6',
            top: '0',
            height: '100%',
            width: '100%'
          }}>
            <div style={{width: '30%', display: 'inline-block', float: 'right'}}>
              <img src={sharePic} style={{width: '100%', marginTop: '0rem'}}/>
            </div>
          </div>
          {
            CommonUtil.isAlipay() ?
          <div id={'zezao'} style={{position: 'fixed', zIndex: '995', top: '2.4rem', left: '1rem'}}>
             <span style={{fontSize: '0.5rem', fontFamily: 'Microsoft YaHei', color: 'white'}}>
               点击右上角使用浏览器打开</span>
          </div>:
              <div id={'zezao'} style={{position: 'fixed', zIndex: '995', top: '2.4rem', left: '2.5rem'}}>
                <span style={{fontSize: '0.5rem', fontFamily: 'Microsoft YaHei', color: 'white'}}>
               点击右上角进行分享
              </span>
              </div>
          }
        </div> : null
    }
  </div>
);
}


export default connect(({coupon}) => {
  coupon
  return {coupon}
})(CouponPage);

const style = {
  input:{
    // boxSizingizing: 'border-box',
    textalign:'center',
    fontsize:'0.4rem',
    height:'1rem',
    width :'5.5rem',
    borderRadius:'4px',
    border:'1px solid #c8cccf',
    color:'#6a6f77',
    // webkitappearance:'none',
    mozappearance: 'none',
    display:'block',
    outline:'0',
    padding:'0 0.2rem',
    textdecoration:'none',
    // width:'100%',

  },
}

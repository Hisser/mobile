/**
 * Created by Administrator on 2018/8/1 0001.
 */

import React from 'react';
import styles from './TodayRecommend.css';
import {routerRedux} from "dva/router";
import {connect} from "dva/index";
import {Carousel, Flex, Modal} from 'antd-mobile';
import copy from 'copy-to-clipboard';
import close from '../../../assets/close.png';
import CommonUtil from '../../../utils/CommonUtil';

const alert = Modal.alert;


class TodayRecommend extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    flyId: 0,
    showAlert: false
  }

  static defaultProps = {
    goodsSelected: {
      nineReco: [{picUrl: ''}, {picUrl: ''}],
      brandReco: [{picUrl: ''}, {picUrl: ''}],
      best: {picUrl: '',},
      fashion: {picUrl: '',},
      goodsListTop: [],
      motherReco: [{picUrl: ''}, {picUrl: ''}],
      jhsPin: {picUrl: ''},
      jdPin: {picUrl: ''},
    },
  };

  turn = (type) => {
    this.props.dispatch(routerRedux.push(`/goodslist/${type}`));
  }

  turnToMall = (plat) => {
    this.props.dispatch(routerRedux.push(`/mall/${plat}`));
  }


  turnToPddMall = (plat) => {
    this.props.turnToPddMall();
  }

  closes = (item,flyId) => {
    var curTime = new Date().getTime() + 86400000;//设置广告有效时间24小时
    window.localStorage.setItem(item.adId, JSON.stringify({show: false, id: item.adId, time: curTime}));
    if (this.props.nav.flyAd[flyId + 1]) {
      this.setState({
        flyId: flyId + 1,
      })
    }
    else {
      this.props.dispatch({
        type: 'nav/close',
        payload: {},
      })

    }
  }

  changePage = (id) => {
    if (id == '1') {
      this.props.dispatch(routerRedux.push(`/helpfree`));
    }
    else if (id == '2') {
      this.props.dispatch(routerRedux.push(`/cutprice`));//砍价
    }
    else {
      this.props.dispatch(routerRedux.push(`/taoCash`));//淘礼金
    }
  }

  closeCoupon = () => {
    window.location.href = "http://suo.im/4RxWxb";
    this.props.dispatch({
      type: 'nav/closeCoupon',
      payload: {},
    })

  }


  turnToGrid = (url,idx) => {
    console.log(url,idx);
    if(idx=='1'||idx =='7'||idx =='9'||idx =='11'||idx =='14'||idx =='20'){//淘宝相关的
      copy(url);
      window.location.href = url;
    }else {
      let userId =window.localStorage.getItem('userId');
      if(userId == null){
        alert('未登录', '点击右上角头像进行登录', [
          { text: '取消', onPress: () => {console.log('取消登录')} },
          { text: '确定', onPress: () => {console.log('确认登录')}},
        ])
      }else {
        if (idx == '13') {//蘑菇街
          this.props.dispatch({
            type: 'nav/getMgjChannelId',
            payload: {
              link: url
            }
          });
        } else if (idx == '5') {//唯品会

          let Link = url + '&chan=' + userId;
          console.log('vip链接',Link);
          window.location.href = Link;
        }else if(idx == '19'){
          if (CommonUtil.isAlipay()) {
            if (CommonUtil.isAndroidOrIOS() == 'Android') {
              window.location.href = window._global.server_url;
            } else {
              window.location.href = window._global.appStore_url;
            }
          }else if(CommonUtil.isWeiXin()){
            window.location.href = window._global.yyb_url;
          }else {
            window.location.href = window._global.yyb_url;
          }
        } else {//其他电商
          window.location.href = url;
        }
      }
    }
  }

  adDetail = (item) => {
    if (item.type == 'INNER') {
      this.props.dispatch(routerRedux.push(`/ad/adDetail/${item.adId}`));
    } else if (item.type == 'OUTER') {
        if (item.plat == 'jd') {
          var link = item.adLink;
          this.props.dispatch({
            type: 'nav/changeJDUrl',
            payload: {link},
          })
      } else {
        window.location.href = item.adLink;
      }

    } else {//native
      if(item.adLink == 'JDActivityPage'){
        this.props.dispatch(routerRedux.push(`/onepointbuy`));
      }else {
        window.location.href = item.adLink;
      }
    }

  }


  flyAd =(item) =>{
    if (item.type == 'INNER') {
      this.props.dispatch(routerRedux.push(`/ad/adDetail/${item.adId}`));
    } else if (item.type == 'OUTER') {
      if (item.plat == 'jd') {
        var link = item.adLink;
        this.props.dispatch({
          type: 'nav/changeJDUrl',
          payload: {link},
        })
      } else {
        window.location.href = item.adLink;
      }

    } else {//native
      window.location.href = item.adLink;
    }
    var curTime = new Date().getTime() + 86400000;//设置广告有效时间24小时
    window.localStorage.setItem(item.adId, JSON.stringify({show: false, id: item.adId, time: curTime}));
  }

  componentDidMount(){
    this.props.dispatch({
      type: 'nav/queryHomeList',
      payload: {},
    })
  }



  render() {


    var singleShow = true;
    var items = '';
    if (this.props.nav.flyAd != null && this.props.nav.flyAd.length > 0) {

  for (let i = 0; i < this.props.nav.flyAd.length; i++) {
    let item = window.localStorage.getItem(this.props.nav.flyAd[i].adId);
    if (item === null) {
      singleShow = true;
      items = this.props.nav.flyAd[i];
      break;
    } else {
      var adObj = JSON.parse(item);
      if ((new Date().getTime() - adObj.time > 0)) {
        // console.log('过期');
        // items = this.props.flyAd[this.state.flyId];//过期了可以展示true
        singleShow = true;
        items = this.props.nav.flyAd[i];
        break;
      } else {
        singleShow = false;
      }
    }
  }
    }

    var showActivity=false;
    // if(!window.localStorage.getItem('coupon')){
    //   showActivity=true;
    // }



/*
    let flyAd = this.props.flyAd[0];
    let picNine1 = '';
    let picNine2 = '';
    let picBrand1 = '';
    let picBrand2 = '';
    let picMother1 = '';
    let picMother2 = '';
    let picJhs = '';
    let picJd = '';
    let priceNine = '';
    let titleNine = '';

    if (this.props.goodsSelected != null) {
      if (this.props.goodsSelected.jhsPin != undefined && this.props.goodsSelected.jhsPin != null) {
        picJhs = this.props.goodsSelected.jhsPin.picUrl;
      }
      if (this.props.goodsSelected.jdPin != undefined && this.props.goodsSelected.jdPin != null) {
        picJd = this.props.goodsSelected.jdPin.picUrl;
      }
    }

    let goodsSelected = this.props.goodsSelected;
    if (goodsSelected != null) {
      if (goodsSelected.nineReco != null && Array.isArray(goodsSelected.nineReco)) {
        if (goodsSelected.nineReco.length > 0) {
          picNine1 = this.props.goodsSelected.nineReco[0].picUrl;
          let priceTemp = this.props.goodsSelected.nineReco[1].price;
          if (priceTemp !== undefined && priceTemp != null) {
            priceNine = '¥' + priceTemp;
          }
        }
        if (goodsSelected.nineReco.length > 1) {
          picNine2 = this.props.goodsSelected.nineReco[1].picUrl;
          let titleTemp = this.props.goodsSelected.nineReco[1].title;
          if (titleTemp !== undefined && titleTemp != null && titleTemp.length > 0) {
            titleNine = titleTemp.substring(0, 6);
          }
        }
      }

      if (goodsSelected.brandReco != null && Array.isArray(goodsSelected.brandReco)) {
        if (goodsSelected.brandReco.length > 0) {
          picBrand1 = this.props.goodsSelected.brandReco[0].picUrl;
        }
        if (goodsSelected.brandReco.length > 1) {
          picBrand2 = this.props.goodsSelected.brandReco[1].picUrl;
        }
      }

      if (goodsSelected.motherReco != null && Array.isArray(goodsSelected.motherReco)) {
        if (goodsSelected.motherReco.length > 0) {
          picMother1 = this.props.goodsSelected.motherReco[0].picUrl;
        }
        if (goodsSelected.motherReco.length > 1) {
          picMother2 = this.props.goodsSelected.motherReco[1].picUrl;
        }
      }
    }*/

    let swiperAd = [];
    this.props.nav.adList.map((item, idx) => (
      item.catId == '0' ? swiperAd.push(item) : null

    ))

    let bannerAd = [];
    this.props.nav.bannerAd.map((item, idx) => (
      item.plat == 'jd' ? bannerAd.push(item) : null
    ))
    let channlesItem =[];
    if(this.props.nav.channels.length>0){
      channlesItem =  this.props.nav.channels;
    }


    return (
      <div>
        {this.props.state1 == 0 || this.props.state1 == null ?
          <div>
            <div className={styles.home_grids_v}>
              {
                swiperAd.length>0 ?
                  <div>
                    <Carousel autoplay={true} infinite={true}>
                      {swiperAd.map((item, idx) => (
                        <img key={idx} src={`${item.adCode}?x-oss-process=style/w750`} alt='图片加载失败'
                             onClick={() => this.adDetail(item)}
                             style={{width: '100%', height: '3.5rem'}}/>
                      ))}
                    </Carousel>
                  </div>
                  :null
              }


              {/* 淘宝京东天猫以及活动导航  */}
              <div style={{marginTop: '0.3rem', backgroundColor: 'white',width:'100%'}}>
                {/*<div style={{width: '100%', height: '0.2rem'}}>
                </div>

                <div style={{width: '16.6%', display: 'inline-block', position: 'relative'}}>
                  <div onClick={() => this.turnToMall('taobao')}>
                    <div style={{height: '1rem', width: '1rem', margin: '0 auto'}}>
                      <img src={taobao} style={{height: '1rem', width: '100%'}}/>
                    </div>
                    <p style={{textAlign: 'center', lineHeight: '0.2rem',fontFamily:'Microsoft YaHei', fontSize: '0.3rem', color: '#5a5a5a'}}>淘宝</p>
                  </div>
                </div>

                <div style={{width: '16.6%', display: 'inline-block', position: 'relative'}}>
                  <div onClick={() => this.turnToMall('jd')}>
                    <div style={{height: '1rem', width: '1rem', margin: '0 auto'}}>
                      <img src={jd_circle} style={{height: '1rem', width: '100%'}}/>
                    </div>
                    <p style={{textAlign: 'center', lineHeight: '0.2rem',fontFamily:'Microsoft YaHei', fontSize: '0.3rem', color: '#5a5a5a'}}>京东</p>
                  </div>
                </div>
                <div style={{width: '16.6%', display: 'inline-block', position: 'relative'}}>
                  <div onClick={() => this.turnToPddMall()}>
                    <div style={{height: '1rem', width: '1rem', margin: '0 auto'}}>
                      <img src={pingduoduo} style={{height: '1rem', width: '100%'}}/>
                    </div>
                    <p style={{textAlign: 'center', lineHeight: '0.2rem',fontFamily:'Microsoft YaHei', fontSize: '0.3rem', color: '#5a5a5a'}}>拼多多</p>
                  </div>
                </div>
                <div style={{width: '16.6%', display: 'inline-block', position: 'relative'}}>

                  <div style={{height: '1rem', width: '1rem', margin: '0 auto'}} onClick={() => this.changePage('1')}>
                    <img src={helpfree} style={{height: '1rem', width: '100%'}}/>
                  </div>
                  <p style={{textAlign: 'center', lineHeight: '0.2rem',fontFamily:'Microsoft YaHei', fontSize: '0.3rem', color: '#5a5a5a'}}>京免单</p>

                </div>
                <div style={{width: '16.6%', display: 'inline-block', position: 'relative'}}>

                  <div style={{height: '1rem', width: '1rem', margin: '0 auto'}} onClick={() => this.changePage('2')}>
                    <img src={cutprice} style={{height: '1rem', width: '100%'}}/>
                  </div>
                  <p style={{textAlign: 'center', lineHeight: '0.2rem',fontFamily:'Microsoft YaHei', fontSize: '0.3rem', color: '#5a5a5a'}}>任性砍</p>

                </div>
                <div style={{width: '16.6%', display: 'inline-block', position: 'relative'}}>

                  <div style={{height: '1rem', width: '1rem', margin: '0 auto'}} onClick={() => this.changePage('3')}>
                    <img src={bigCoupon} style={{height: '1rem', width: '100%'}}/>
                  </div>
                  <p style={{textAlign: 'center', lineHeight: '0.2rem',fontFamily:'Microsoft YaHei', fontSize: '0.3rem', color: '#5a5a5a'}}>超级省</p>

                </div>*/}

                <div className={styles.grids}>
                  <div style={{display:'Flex',flexDirection:'row',flexWrap:'nowrap',width:'200%'}}>
                { this.props.nav.grids.length>0 ?
                  this.props.nav.grids .map((item, idx) => (
                    idx<10 ?
                      <div key={idx} style={{width: '20%', display: 'inline-block', position: 'relative'}}>
                        <div style={{height: '1rem', width: '1rem', margin: '0 auto'}} onClick={() => this.turnToGrid(item.url,idx+1)}>
                          <img src={item.icon} style={{height: '1rem', width: '100%'}}/>
                        </div>
                        <p style={{textAlign: 'center', lineHeight: '0.2rem',fontFamily:'Microsoft YaHei', fontSize: '0.3rem', color: '#5a5a5a'}}>{item.label}</p>

                      </div>
                      :null

                  )) :null
                }
                </div>
                  <div style={{display:'Flex',flexDirection:'row',flexWrap:'nowrap',width:'180%'}}>
                    { this.props.nav.grids.length>0 ?
                      this.props.nav.grids .map((item, idx) => (
                        idx>9 && idx!= 17?
                          <div key={idx} style={{width: '20%', display: 'inline-block', position: 'relative'}}>
                            <div style={{height: '1rem', width: '1rem', margin: '0 auto'}} onClick={() => this.turnToGrid(item.url,idx+1)}>
                              <img src={item.icon} style={{height: '1rem', width: '100%'}}/>
                            </div>
                            <p style={{textAlign: 'center', lineHeight: '0.2rem',fontFamily:'Microsoft YaHei', fontSize: '0.3rem', color: '#5a5a5a'}}>{item.label}</p>

                          </div>
                          :null

                      )) :null
                    }
                  </div>
                </div>


              </div>
              <div style={{width: '100%', height: '0.2rem'}}>
              </div>


              <div style={{width: '100%', textAlign: 'center'}}>
                {bannerAd.map((item, idx) => (
                  <img key={idx} src={`${item.adCode}?x-oss-process=style/w750`} alt='图片加载失败'
                       style={{width: '96%', height: '2.5rem', borderRadius: '0.5rem'}}
                       onClick={() => this.adDetail(item)}
                  />
                ))}

              </div>
              <div style={{width: '100%', height: '0.2rem'}}>
              </div>

              {
                this.props.nav.isShow  && singleShow && showActivity == false && this.props.nav.flyAd.length != 0 ?
                  <div>
                    <div id="zezao" className={styles.zezao}>
                    </div>
                    <div style={{
                      width: '7rem',
                      height: '7rem',
                      position: 'fixed',
                      zIndex: '996',
                      left: '50%',
                      marginTop: '-5rem',
                      marginLeft: '-3.5rem',
                      display: 'inline-block'
                    }}>
                      <div onClick={() => this.closes(items,this.state.flyId)}>
                        <img src={close}
                             style={{position: 'relative', width: '0.8rem', height: '0.8rem', marginLeft: '6.5rem'}}/>
                      </div>
                      <div onClick={() => this.flyAd(items)}>

                        <img key={this.state.flyId} src={`${items.adCode}?x-oss-process=style/w450`} alt='图片加载失败'
                             style={{width: '100%', height: '100%', marginTop: '-0.5rem', borderRadius: '0.5rem'}}/>

                      </div>

                    </div>
                  </div>
                  : null

              }

              {
                this.props.nav.channels.length != 0 ?

                  <div style={{backgroundColor: '#eeeeee'}}>

                    <Flex style={{margin: '1px 0 0', verticalAlign: 'text-bottom'}}>
                      <Flex.Item style={{margin: 0}} onClick={() => this.turn(channlesItem[0].channel)}>
                        <div className={styles.channel_img_item}>
                          <div style={{height: '0.1rem'}}/>
                          <div style={{}}>
                          <div className={styles.channel_title_mother_big}>{channlesItem[0].title}</div>
                          <div className={styles.channel_title_mother_small}>{channlesItem[0].subTitle}</div>
                          <div className={styles.channel_title_mother_img}><img src={channlesItem[0].pic0} className={styles.channel_img_small_9k9_left}/></div>
                          </div>
                        </div>
                      </Flex.Item>

                      <Flex.Item style={{margin: 0, marginRight: '1px'}} onClick={() => this.turn(channlesItem[0].channel)}>
                        <div className={styles.channel_img_item}>
                          <div style={{height: '0.1rem'}}/>
                          <img src={channlesItem[0].pic1} className={styles.channel_img_big}/>
                        </div>
                      </Flex.Item>

                      <Flex.Item style={{margin: 0}} onClick={() => this.turnToMall(channlesItem[1].channel)}>
                        <div className={styles.channel_img_item}>
                          <div style={{height: '0.1rem'}}/>
                          <div className={styles.channel_title_mother_big}>{channlesItem[1].title}</div>
                          <div className={styles.channel_title_mother_small}>{channlesItem[1].subTitle}</div>
                          <div className={styles.channel_title_mother_img}><img src={channlesItem[1].pic0} className={styles.channel_img_small_9k9_left}/></div>
                        </div>
                      </Flex.Item>

                      <Flex.Item style={{margin: 0, marginRight: '1px'}} onClick={() => this.turnToMall(channlesItem[1].channel)}>
                        <div className={styles.channel_img_item}>
                          <div style={{height: '0.1rem'}}/>
                          <img src={channlesItem[1].pic1} className={styles.channel_img_big}/>
                        </div>
                      </Flex.Item>
                    </Flex>

                    <Flex style={{margin: '1px 0 0', verticalAlign: 'text-bottom'}}>
                      <Flex.Item style={{margin: 0}} onClick={() => this.turn(channlesItem[2].channel)}>
                        <div className={styles.channel_img_item}>
                          <div style={{height: '0.1rem'}}/>
                          <div className={styles.channel_title_mother_big}>{channlesItem[2].title}</div>
                          <div className={styles.channel_title_mother_small}>{channlesItem[2].subTitle}</div>
                          <div className={styles.channel_title_mother_img}><img src={channlesItem[2].pic0} className={styles.channel_img_small_9k9_left}/></div>
                        </div>
                      </Flex.Item>

                      <Flex.Item style={{margin: 0, marginRight: '1px'}} onClick={() => this.turn(channlesItem[2].channel)}>
                        <div className={styles.channel_img_item}>
                          <div style={{height: '0.1rem'}}/>
                          <img src={channlesItem[2].pic1} className={styles.channel_img_big}/>
                        </div>
                      </Flex.Item>
                      <Flex.Item style={{margin: 0}} onClick={() => this.turn(channlesItem[3].channel)}>
                        <div className={styles.channel_img_item}>
                          <div style={{height: '0.1rem'}}/>
                          <div className={styles.channel_title_mother_big}>{channlesItem[3].title}</div>
                          <div className={styles.channel_title_mother_small}>{channlesItem[3].subTitle}</div>
                          <div className={styles.channel_title_mother_img}><img src={channlesItem[3].pic0} className={styles.channel_img_small_9k9_left}/></div>
                        </div>
                      </Flex.Item>

                      <Flex.Item style={{margin: 0, marginRight: '1px'}} onClick={() => this.turn(channlesItem[3].channel)}>
                        <div className={styles.channel_img_item}>
                          <div style={{height: '0.1rem'}}/>
                          <img src={channlesItem[3].pic1} className={styles.channel_img_big}/>
                        </div>
                      </Flex.Item>
                    </Flex>

                  </div> :null

              }
            </div>

          </div>
          : null}


        {/*{*/}
          {/*this.state.showAlert ?*/}
            {/*<div>*/}
              {/*<div id={'zezao'} className={styles.zezao}>*/}
              {/*</div>*/}
              {/*<div id={'zezao'} style={{position: 'fixed', zIndex: '996', top: '0rem',}}>*/}
                {/*<img className={styles.showTaokey_taokey_img} src={showAlert} alt="打开淘宝提示"*/}
                     {/*onClick={this.openUrl }*/}
                {/*/>*/}
              {/*</div>*/}
            {/*</div>*/}
            {/*:null*/}
        {/*}*/}
      </div>
    );
  }
}

export default connect(({nav}) => {
  nav
  return {nav}
})(TodayRecommend);

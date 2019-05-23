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
import * as CommonUtil from '../../../utils/CommonUtil';


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


  turnToGrid = (url,plat) => {
    console.log(url,plat);
    if(plat=='taobao'||plat =='tmallGlobal'||plat =='jhs'||plat =='tmallMarket'||plat =='flyPig'||plat =='gift'){//淘宝相关的
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
        if(plat =='pdd'){//拼多多转链
          this.props.turnToPddMall();
        }else if(plat =='suning'){//苏宁
          let link = url+"&sub_user="+userId;
          window.location.href = link;
        }else if (plat == 'mogu') {//蘑菇街
          this.props.dispatch({
            type: 'nav/getMgjChannelId',
            payload: {
              link: url
            }
          });
        } else if (plat == 'vip') {//唯品会
          let Link = url + '&chan=' + userId;
          window.location.href = Link;
        }else if(plat == 'invite'){
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
    let userId =window.localStorage.getItem('userId');
    if(userId == null){
      alert('未登录', '点击右上角头像进行登录', [
        { text: '取消', onPress: () => {console.log('取消登录')} },
        { text: '确定', onPress: () => {console.log('确认登录')}},
      ])
    }else {
      if (item.type == 'INNER') {
        this.props.dispatch(routerRedux.push(`/ad/adDetail/${item.adId}`));
      } else if (item.type == 'OUTER') {

        if (item.plat == 'jd') {
          var link = item.adLink;
          this.props.dispatch({
            type: 'nav/changeJDUrl',
            payload: {link},
          })
        } else if (item.plat == 'suning') {
          let link = item.adLink + "&sub_user=" + userId;
          window.location.href = link;
        } else if(item.plat == 'vipshop'){
          let Link = item.adLink + '&chan=' + userId;
          console.log(Link);
           window.location.href = Link;
        } else if(item.plat=='guomei'){
          let Link = item.adLink + '&feedback=' + userId;
           window.location.href = Link;
        }else {
          console.log('2221',item.type);
           window.location.href = item.adLink;
        }

      } else {//native
        if (item.adLink == 'JDActivityPage') {
          this.props.dispatch(routerRedux.push(`/onepointbuy`));
        } else {
          console.log('111');
          window.location.href = item.adLink;
        }
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

  componentWillMount(){
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

    let swiperAd = [];
    this.props.nav.adList.map((item, idx) => (
      item.catId == '0' ? swiperAd.push(item) : null

    ))

    let bannerAd = [];
   if(this.props.nav.bannerAd !=null){
     this.props.nav.bannerAd.plat == 'jd' ? bannerAd.push(this.props.nav.bannerAd) : null
    }
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
                        <img key={idx} src={`${item.adCode}?x-oss-process=style/w_new`} alt='图片加载失败'
                             onClick={() => this.adDetail(item)}
                             style={{width: '100%', height: '3.5rem'}}/>
                      ))}
                    </Carousel>
                  </div>
                  :null
              }


              {/* 淘宝京东天猫以及活动导航  */}
              <div style={{marginTop: '0.3rem', backgroundColor: 'white',width:'100%'}}>
                <div className={styles.grids}>
                  <div style={{display:'Flex',flexDirection:'row',flexWrap:'nowrap',width:'200%'}}>
                { this.props.nav.grids.length>0 ?
                  this.props.nav.grids .map((item, idx) => (
                    idx<10 ?
                      <div key={idx} style={{width: '20%', display: 'inline-block', position: 'relative'}}>
                        <div style={{height: '1rem', width: '1rem', margin: '0 auto'}} onClick={() => this.turnToGrid(item.url,item.plat)}>
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
                            <div style={{height: '1rem', width: '1rem', margin: '0 auto'}} onClick={() => this.turnToGrid(item.url,item.plat)}>
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
                          <div className={styles.channel_title_mother_img}>
                            {
                              channlesItem[0].pic0.indexOf('img.alicdn.com') != -1 && CommonUtil.isAndroidOrIOS() =='Android' ?
                                <img src={channlesItem[0].pic0 +"_.webp"} className={styles.channel_img_small_9k9_left}/> :
                                <img src={channlesItem[0].pic0} className={styles.channel_img_small_9k9_left}/>
                            }

                          </div>
                          </div>
                        </div>
                      </Flex.Item>

                      <Flex.Item style={{margin: 0, marginRight: '1px'}} onClick={() => this.turn(channlesItem[0].channel)}>
                        <div className={styles.channel_img_item}>
                          <div style={{height: '0.1rem'}}/>
                          {
                            channlesItem[0].pic1.indexOf('img.alicdn.com') != -1 && CommonUtil.isAndroidOrIOS() =='Android' ?
                              <img src={channlesItem[0].pic1 +"_.webp"} className={styles.channel_img_big}/> :
                              <img src={channlesItem[0].pic1} className={styles.channel_img_big}/>
                          }
                          {/*<img src={channlesItem[0].pic1.indexOf('img.alicdn.com') != -1 ? channlesItem[0].pic1+'_300x300q85s150.jpg':channlesItem[0].pic1} className={styles.channel_img_big}/>*/}
                        </div>
                      </Flex.Item>

                      <Flex.Item style={{margin: 0}} onClick={() => this.turnToMall(channlesItem[1].channel)}>
                        <div className={styles.channel_img_item}>
                          <div style={{height: '0.1rem'}}/>
                          <div className={styles.channel_title_mother_big}>{channlesItem[1].title}</div>
                          <div className={styles.channel_title_mother_small}>{channlesItem[1].subTitle}</div>
                          <div className={styles.channel_title_mother_img}>
                            {
                              channlesItem[1].pic0.indexOf('img.alicdn.com') != -1 && CommonUtil.isAndroidOrIOS() =='Android' ?
                                <img src={channlesItem[1].pic0 +"_.webp"} className={styles.channel_img_small_9k9_left}/> :
                                <img src={channlesItem[1].pic0} className={styles.channel_img_small_9k9_left}/>
                            }
                            {/*<img src={channlesItem[1].pic0.indexOf('img.alicdn.com') != -1 ? channlesItem[1].pic0+'_300x300q85s150.jpg':channlesItem[1].pic0} className={styles.channel_img_small_9k9_left}/>*/}
                          </div>
                        </div>
                      </Flex.Item>

                      <Flex.Item style={{margin: 0, marginRight: '1px'}} onClick={() => this.turnToMall(channlesItem[1].channel)}>
                        <div className={styles.channel_img_item}>
                          <div style={{height: '0.1rem'}}/>
                          {
                            channlesItem[1].pic1.indexOf('img.alicdn.com') != -1 && CommonUtil.isAndroidOrIOS() =='Android' ?
                              <img src={channlesItem[1].pic1 +"_.webp"} className={styles.channel_img_big}/> :
                              <img src={channlesItem[1].pic1} className={styles.channel_img_big}/>
                          }
                          {/*<img src={channlesItem[1].pic1.indexOf('img.alicdn.com') != -1 ? channlesItem[1].pic1+'_300x300q85s150.jpg':channlesItem[1].pic1} className={styles.channel_img_big}/>*/}
                        </div>
                      </Flex.Item>
                    </Flex>

                    <Flex style={{margin: '1px 0 0', verticalAlign: 'text-bottom'}}>
                      <Flex.Item style={{margin: 0}} onClick={() => this.turn(channlesItem[2].channel)}>
                        <div className={styles.channel_img_item}>
                          <div style={{height: '0.1rem'}}/>
                          <div className={styles.channel_title_mother_big}>{channlesItem[2].title}</div>
                          <div className={styles.channel_title_mother_small}>{channlesItem[2].subTitle}</div>
                          <div className={styles.channel_title_mother_img}>
                            {
                              channlesItem[2].pic0.indexOf('img.alicdn.com') != -1 && CommonUtil.isAndroidOrIOS() =='Android' ?
                                <img src={channlesItem[2].pic0 +"_.webp"} className={styles.channel_img_small_9k9_left}/> :
                                <img src={channlesItem[2].pic0} className={styles.channel_img_small_9k9_left}/>
                            }
                            {/*<img src={channlesItem[2].pic0.indexOf('img.alicdn.com') != -1 ? channlesItem[2].pic0+'_300x300q85s150.jpg':channlesItem[2].pic0} className={styles.channel_img_small_9k9_left}/>*/}
                          </div>
                        </div>
                      </Flex.Item>

                      <Flex.Item style={{margin: 0, marginRight: '1px'}} onClick={() => this.turn(channlesItem[2].channel)}>
                        <div className={styles.channel_img_item}>
                          <div style={{height: '0.1rem'}}/>
                          {
                            channlesItem[2].pic1.indexOf('img.alicdn.com') != -1 && CommonUtil.isAndroidOrIOS() =='Android' ?
                              <img src={channlesItem[2].pic1 +"_.webp"} className={styles.channel_img_big}/> :
                              <img src={channlesItem[2].pic1} className={styles.channel_img_big}/>
                          }
                          {/*<img src={channlesItem[2].pic1.indexOf('img.alicdn.com') != -1 ? channlesItem[2].pic1+'_300x300q85s150.jpg':channlesItem[2].pic1} className={styles.channel_img_big}/>*/}
                        </div>
                      </Flex.Item>
                      <Flex.Item style={{margin: 0}} onClick={() => this.turn(channlesItem[3].channel)}>
                        <div className={styles.channel_img_item}>
                          <div style={{height: '0.1rem'}}/>
                          <div className={styles.channel_title_mother_big}>{channlesItem[3].title}</div>
                          <div className={styles.channel_title_mother_small}>{channlesItem[3].subTitle}</div>
                          <div className={styles.channel_title_mother_img}>
                            {
                              channlesItem[3].pic0.indexOf('img.alicdn.com') != -1 && CommonUtil.isAndroidOrIOS() =='Android' ?
                                <img src={channlesItem[3].pic0 +"_.webp"} className={styles.channel_img_small_9k9_left}/> :
                                <img src={channlesItem[3].pic0} className={styles.channel_img_small_9k9_left}/>
                            }
                            {/*<img src={channlesItem[3].pic0.indexOf('img.alicdn.com') != -1 ? channlesItem[3].pic0+'_300x300q85s150.jpg':channlesItem[3].pic0} className={styles.channel_img_small_9k9_left}/>*/}
                          </div>
                        </div>
                      </Flex.Item>

                      <Flex.Item style={{margin: 0, marginRight: '1px'}} onClick={() => this.turn(channlesItem[3].channel)}>
                        <div className={styles.channel_img_item}>
                          <div style={{height: '0.1rem'}}/>
                          {
                            channlesItem[3].pic1.indexOf('img.alicdn.com') != -1 && CommonUtil.isAndroidOrIOS() =='Android' ?
                              <img src={channlesItem[3].pic1 +"_.webp"} className={styles.channel_img_big}/> :
                              <img src={channlesItem[3].pic1} className={styles.channel_img_big}/>
                          }
                          {/*<img src={channlesItem[3].pic1.indexOf('img.alicdn.com') != -1 ? channlesItem[3].pic1+'_300x300q85s150.jpg':channlesItem[3].pic1} className={styles.channel_img_big}/>*/}
                        </div>
                      </Flex.Item>
                    </Flex>

                  </div> :null

              }
            </div>

          </div>
          : null}


      </div>
    );
  }
}

export default connect(({nav}) => {
  nav
  return {nav}
})(TodayRecommend);

import React from "react";
import img from '../../../assets/menu.png'
import {Grid, NavBar,Toast,Flex,Button,Modal,InputItem,List} from 'antd-mobile';
import styles from './../mainPage.css';
import styles1 from './XScrollTitle.css';
import styles3 from './../../coupon/components/CouponGrid.css';
import {routerRedux} from "dva/router";
import TodayRecommend from "./TodayRecommend";
import {connect} from "dva";
import GoodsListView from "../../../components/goodsListView/GoodsListView";
import imgClose from '../../../assets/close1.png';
import {fetchPost} from "../../../utils/http";
import * as CommonUtil from "../../../utils/CommonUtil";
import $ from "jquery";

const alert = Modal.alert;
let data = []

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      style1: {display: "block"},
      style2: {display: "none"},
      catId: 0,         //catId为0表示第一个 推荐  往右一次增加
      state3: 0,          //用于显示隐藏二级导航  0显示 1隐藏
      idx: 0,           //一级菜单下标  默认135
      codeText:'验证码',
      show:false
    };
  }

  commonData = {
    mobile: '',
    code: ''
  };

  componentDidMount() {
    // this.queryGoodsListFromTopChannel(1);
  }

  turnTo = () => {
    this.props.a();
  }

  showOrHidden = () => {
    if (this.state.style1.display === "block") {
      this.setState({
        style1: {display: "none",},
        style2: {display: "block",},
        state3: 1
      })
    } else {
      this.setState({
        style1: {display: "block",},
        style2: {display: "none",},
        state3: 0
      })
    }
  }

  turn = (catId, index) => {
    if (catId !== this.state.catId) {
      this.setState({
        catId: catId,
        idx: index
      }, () => {
       // data = this.props.Nav[index].secCats;
       //  this.props.dispatch({
       //    type: 'nav/saveFlag',
       //    payload:{
       //      flag:index,
       //    }
       //  });

        this.clearGoodsList();
        window.scrollTo(0, 0);
        this.queryGoodsListFromTopChannel(1);
      });
    }
  }

  turnSecord = (catId) => {
    if (catId != null) {
      this.setState({
        catId: catId,
      })
    }
  }

  queryGoodsListFromTopChannel=(pageNo)=>{
    let pageSize=20;
    let catId =  this.state.catId;
    // let catId=this.props.nav.Flag;
    this.props.dispatch({
      type: 'nav/queryGoodsListFromTopChannel',
      payload: {
        catId: catId,
        pageNo: pageNo,
        pageSize: 20,
      },
    });
  }

  clearGoodsList=()=>{
    this.props.dispatch({
      type: 'nav/clearGoodsList',
    });
  }


  turnToGoodsDetail = (goodsId) => {
    this.props.dispatch(routerRedux.push({pathname: `/detail/${goodsId}/1`}));
  }


  turnToPddMall=()=>{
    this.props.dispatch({
      type: 'nav/turnToPddMall',
    });
  }

  login =() =>{
    let token = JSON.parse(window.localStorage.getItem('token'));
    if (token.accessToken !== null && token.userSecKey !== null) {
      // Toast.info('你已登录无需重复登录!');
      this.props.dispatch(routerRedux.push({pathname: '/personal'}));
    } else {
      this.setState({
          show: true,
        }
      )
      let serverUrl = window._global.url.host;
      let href = window.location.href;
      let url = href.substring(href.indexOf('#/') + 1);

      if(CommonUtil.isAlipay()){
        window.location.href = serverUrl + "/alipay/redirect?requestUrl=" + url;
      }else if(CommonUtil.isWeiXin()){
        window.location.href = serverUrl + "/weChat/redirect?requestUrl=" + url;
      }else {
        this.alert();
      }
    }
  }

  doLogin =(tel,code) =>{
    this.props.dispatch({
      type: 'nav/doLogin',
      payload:{
        mobile:tel,
        code:code
      }
    });
  }

  alert = ()=>alert('登录', (
    <div>
      <List>
        <InputItem id="tel" type="phone" >手机号</InputItem>
        <InputItem id="code" editable={true}  maxLength={6}>验证码</InputItem>
      </List>
      <div style={{position:'absolute',zIndex:991,top:98,height:'1.2rem',lineHeight:'1.2rem',right:16}}
           onClick={this.clickSendCode}>
        丨&nbsp;&nbsp;{this.state.codeText}
      </div>
    </div>
  ), [
    {text: '取消', onPress: () => {
      this.setState({
          show: false,
        }
      )}},
    {
      text: '登录', onPress: () => {
        var tel = (document.getElementById("tel").value).replace(/\s/g, "");
        var code = document.getElementById("code").value;
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(tel) || tel == ''||code=='') {
          Toast.info("电话号码或者验证码错误！");
          return;
        }
        this.setState({
            show: false,
          }
        )
        this.doLogin(tel,code);
      }
    },
  ])



  clickSendCode = () => {

    this.commonData.mobile = $("#tel").val().replace(/\s*/g,"");
    console.log($("#tel").val().replace(/\s*/g,""));
    this.sendCode();
  }
  //sendCode发送验证码
  sendCode =() => {
    console.log(this.commonData.mobile);
    if (this.commonData.mobile !== '' && /^1\d{10}$/.test(this.commonData.mobile)) {
      fetchPost('/anon/sendSmsCode', {'mobile': this.commonData.mobile}).then(res => {
        if (res.code === 1) {
          Toast.show('发送成功');
          this.setState({
            codeText: 60
          }, () => {
            let interval = setInterval(() => {
              if (this.state.codeText <= 0) {
                this.setState({
                  codeText: '验证码'
                });
                clearInterval(interval);
              } else {
                this.setState(prev => ({
                  codeText: prev.codeText - 1
                }))
              }
            }, 1000);
          })
        }
      }, err => {
        console.warn(err)
      });
    } else {
      Toast.show('请输入正确的手机号');
    }
  }


  render() {
    const {
      idx: _idx
    } = this.state;

    let userIco = window.localStorage.getItem('userIco');
    return (

      <div>
        <div id="nav" className={styles.nav} >
          <div className={styles.search}>
            <div className={styles.search_form}>
              <div className={styles.input_form} onClick={this.turnTo}>
                <div className={styles.search_input}><p className={styles.p}>搜索商品，发现更多优选</p></div>
              </div>

            </div>
            <div style={{display:'inline-block',width:'15%',height:'1rem',marginTop:'0.25rem',position:'absolute'}}
                 onClick={this.login}
            >
              <img src={userIco} style={{width:'1.2rem',height:'1.2rem',borderRadius:'0.6rem'}}/>
            </div>

          </div>
        </div>

        <div style={this.state.style1}>
          <NavBar leftContent={<div
            className={`${_idx === 0 ? styles1.title_left_select : styles1.title_left}`}
            onClick={() => this.turn(0, 0)}>精选</div>}
                  rightContent={<img className={styles1.title_right_img} src={img} onClick={this.showOrHidden}/>}
                  style={{backgroundColor: '#fdde4a'}}>
            <div className={styles1.title_div_1}>
              <div className={styles1.title_div_2}>
                <div className={styles1.title_div_3}>
                  {(this.props.Nav && this.props.Nav.length > 0) ?
                    this.props.Nav.map((item, idx) => (
                      idx > 0 ? (
                        <label id={idx} key={idx}
                               className={`${styles1.title_label} ${_idx === idx ? styles1.title_label_selected : null}`}
                               onClick={() => this.turn(item.catId, idx)}>{item.catName}</label>
                      ) : null
                    ))
                    : null}
                </div>
              </div>
            </div>
          </NavBar>
        </div>

        <div style={this.state.style2}>
          <div style={{
            width: '100%',
            backgroundColor: '#fdde4a',
            height: 'auto',
            lineHeight: '1rem',
            textAlign: 'center',
            marginTop: '-0.1rem',
          }}>
            全部分类
            <img src={imgClose} className={styles.img2} onClick={this.showOrHidden}/>
          </div>

          <div >
            <Grid data={this.props.Nav}
                  hasLine={false}
                  itemStyle={{height: '2.5rem', width: '2.0rem'}}
                  renderItem={(dataItem, i) => (
                    <div>
                      <div style={{width: '25%', height: '100%'}} onClick={() => this.turn(dataItem.catId, i)}>
                        <img style={{
                          height: '1.3rem',
                          width: '1.5rem',
                          marginLeft: '0.5rem',
                          float: 'left',
                          marginTop: ''
                        }} src={dataItem.categoryImg}/>
                        <p style={{
                          height: '0.5rem',
                          width: '1.5rem',
                           marginLeft: '0.5rem',
                          textAlign:'center',
                          color: '#717171',
                          fontSize: '0.36rem',
                          float:'left'
                        }}>{dataItem.catName}</p>
                      </div>
                    </div>
                  )}/>
          </div>

        </div>

        {this.state.state3 == 1 ? null :
          <TodayRecommend state1={this.state.catId}
                          goodsSelected={this.props.goodsSelected }  showActivitys={this.props.showActivity}
                          turnToPddMall = {this.turnToPddMall}/>}


        <div>
          {
            this.state.catId===0?<div className={styles3.split_line}>
              <span className={styles3.split_line_line}></span>
              <span className={styles3.split_line_text}>&nbsp;&nbsp;大家都在逛&nbsp;&nbsp;</span>
              <span className={styles3.split_line_line}></span>
            </div>:null
          }


          <div>
            <GoodsListView pageSize={this.props.nav.params.pageSize}
                           pageNo={this.props.nav.params.pageNo}
                           // hasMore={this.props.nav.params.hasMore}
                           pageNo={this.props.nav.params.pageNo}
                           hasMore={true}
                           goodsList={this.props.nav.goodsList}
                           changePageNo={this.queryGoodsListFromTopChannel}
                           turnToGoodsDetail={this.turnToGoodsDetail}/>
          </div>

        </div>
      </div>
    )
  }
}

Nav.propTypes = {};
export default connect(({nav}) => ({nav}))(Nav)

import React from "react";
import * as CommonUtil from "../../utils/CommonUtil";
import Nav from "./components/Nav";
import {connect} from "dva/index";
import {routerRedux} from "dva/router";
import userIco from '../../assets/user.png';
import close from '../../assets/close.png';
import oneCoupon from '../../assets/oneCoupon.png';
import oneCouponed from '../../assets/oneCoupon2.png';
import {Flex, WhiteSpace, NavBar, Button, Icon,Toast,Modal} from 'antd-mobile';
import $ from "jquery";
import {fetchPost} from "../../utils/http";


class MainPages extends React.Component {

  constructor(props) {
    super(props);
  }
  state={
    codeText:'验证码'
  }

  commonData = {
    mobile: '',
    code: ''
  };

  clickSendCode = () => {

    this.commonData.mobile = $("#tel").val();
    console.log($("#tel").val());
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



  componentWillMount(){
    let  token = JSON.parse(window.localStorage.getItem('token'));
    if (token === null || (token !== null && (token.userSecKey === null || token.userSecKey === undefined))) { //没有就授权登录
      console.log("授权登录");
      let serverUrl = window._global.url.host;
      let href = window.location.href;
      let url = href.substring(href.indexOf('#/') + 1);
     if (CommonUtil.isAlipay()) {//支付宝
         window.location.href = serverUrl + "/alipay/redirect?requestUrl=" + url;
      }
    }
  }


  //跳转到搜索页面
turnToSearch=()=> {
    this.props.dispatch(routerRedux.push('/search'));
  };

  close =()=>{
    this.props.dispatch({
      type: 'mainpage/closeCoupon',
      payload: {},
    })
  }
  //领取新人红包
  get = () =>{
    this.props.dispatch({
      type: 'mainpage/getCoupon',
      payload: {

      },
    })
  }

  render() {
    let userImg = userIco;
    if (this.props.mainpage.userIco) {
      userImg = this.props.mainpage.userIco;
    }
    return (

      <div>
      <Nav a={ this.turnToSearch } Nav={ this.props.mainpage.NavList}
           goodsSelected={this.props.mainpage.goodsSelected}
           showActivity={this.props.mainpage.showActivity}
      />
        {
          this.props.mainpage.show  ?
            <div>
            <div id={'zezao'} style={{
              backgroundColor: '#2a2b2c',
              zIndex: '991',
              position: 'fixed',
              opacity: '0.6',
              top: '0',
              height: '100%',
              width: '100%',
              textAlign:'center'
            }}>
            </div>
            <div id={'zezao'} style={{position: 'fixed', zIndex: '995', top: '30%', left: '1rem'}}>
             <img src={oneCoupon} onClick={this.get} style={{width: '100%', marginTop: '0rem' }}/>
              {/*<img src={close} onClick={this.close}
                   style={{position: 'relative', width: '0.8rem', height: '0.8rem',top: '1.5rem',marginLeft: '3.6rem'}}/>*/}
            </div>

            </div>
            : null
        }

        {
          this.props.mainpage.show1  ?
            <div onClick={this.close}>
              <div id={'zezao'} style={{
                backgroundColor: '#2a2b2c',
                zIndex: '991',
                position: 'fixed',
                opacity: '0.6',
                top: '0',
                height: '100%',
                width: '100%',
                textAlign:'center'
              }} >
              </div>
              <div id={'zezao'} style={{position: 'fixed', zIndex: '995', top: '0.1rem', left: '1rem'}}>
                <img src={oneCouponed}  style={{width: '100%', marginTop: '0rem' }}/>
              </div>
              {
                this.props.mainpage.message !='' ?
                  <div id={'zezao'} style={{position: 'fixed', zIndex: '996', top: '65%',textAlign:'center',height:'2rem',width:'100%'}}>
                  <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.5rem',color:'#fed269'}}> {this.props.mainpage.message}</span>
                </div> :
                  <div id={'zezao'} style={{position: 'fixed', zIndex: '996', top: '55%',textAlign:'center',height:'2rem',width:'100%'}}>
                    <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.5rem',color:'#fed269'}}> {this.props.mainpage.message1}</span><br/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <span style={{fontFamily:'Microsoft YaHei',fontSize:'2rem',color:'#fed269'}}> {this.props.mainpage.message2}</span><br/>
                    <WhiteSpace/>
                    <WhiteSpace/><WhiteSpace/>
                    <WhiteSpace/>

                    <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.35rem',color:'#fed269'}}> {this.props.mainpage.message3}</span>
                  </div>
              }


            </div>
            : null
        }

      </div>

    )

  }

}
export default connect(({mainpage}) => {
  mainpage
  return {mainpage};
})
(MainPages);


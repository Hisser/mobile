import React from 'react';
import {connect} from "dva";
import {fetchPost} from "../../../utils/http";
import {Flex, WhiteSpace, NavBar, Button, Icon,Toast} from 'antd-mobile';
import {routerRedux} from "dva/router";
import posterimg from "../../../assets/posterImg/poster.png";
import redPackimg from "../../../assets/posterImg/redPack.png";
import rebateImg from "../../../assets/posterImg/rebateNewer.png";
import rebateImg2 from "../../../assets/posterImg/rebateNewer2.png";
import five from "../../../assets/edu.png";
import code from "../../../assets/posterImg/code.png";
import ImgClose from '../../../assets/close.png';
import activityTop from '../../../assets/activityTop.png';
import shareAlert from '../../../assets/shareAlert.png';
import style from './RebateNewer.css';
import $ from 'jquery';
import * as wechatApi from "../../../wechatApi";
import * as CommonUtil from "../../../utils/CommonUtil";

class RebateNewer  extends React.Component{

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

  componentDidMount(){
    window.scrollTo(0,0);
    var channelId=this.props.rebateNewer.channelId;


    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      console.log("微信环境");
    }else{
      if(CommonUtil.isAlipay()){
        console.log('支付宝浏览器')
      }else{
        if(CommonUtil.isAndroidOrIOS() =='Android'){
          console.log('Android 浏览器环境');
          window.location.href= window._global.server_url;
        }else{
          console.log('ios 浏览器');
          window.location.href = window._global.yyb_url;
        }
      }
    }
  }

    backPrevious = () => {
    document.referrer === '' ? this.props.dispatch(routerRedux.push("/")) : this.props.dispatch(routerRedux.goBack())
  }

    openUrl = () => {

      this.props.dispatch({
        type: 'rebateNewer/close',
        payload: '',
      });

      // window.location.href="https://android.myapp.com/myapp/detail.htm?apkName=com.qianshou.zshop&ADTAG=mobile";


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


    //立即领取
    get=()=>{
     // var mobile= $("#tel").val();
     // var code =$("#code").val();
     // console.log(mobile,code,this.props.rebateNewer.channelId);
     //  if(mobile ==""||code==""){
     //    Toast.info("验证码或者手机号不能为空");
     //  }else {
        this.props.dispatch({
          type: 'rebateNewer/updateUser',
          payload: {
            // mobile: mobile,
            // code: code,
            channelId: this.props.rebateNewer.channelId,
            userId:this.props.rebateNewer.parentId,
          },
        });
      // }


    }

  render(){
    return (
      <div>
        <div style={{backgroundColor:'#FFEBCF',height:document.documentElement.clientHeight,width:'100%'}}>
          <div style={{
            // backgroundImage: "url('"+posterimg+"')",
            backgroundImage:"url(https://yuezijie.oss-cn-beijing.aliyuncs.com/image/rebateNewer1.png?x-oss-process=style/w750)",
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            width: document.documentElement.clientWidth,
            height:document.documentElement.clientWidth*1.6,
          }}>
          {/*<div>*/}
          <div style={{height:document.documentElement.clientWidth/2,width:'100%'}}>
          </div>
            <div >
              <Flex style={{width:'6rem',margin:'0 auto'}}>
                {/*<Flex.Item >
                  <input style={styles.input} id="tel" name="tel"   placeholder="请输入电话号码"/>
                </Flex.Item>*/}
                <Flex.Item>
                  <img src={rebateImg2} style={{width:'100%'}}/>
                </Flex.Item>
              </Flex>
            </div>
            <div style={{paddingTop:'0.4rem'}}>
              <Flex style={{width:'7rem',margin:'0 auto'}}>
                <img src={five} style={{width:'100%'}}/>
              </Flex>
            </div>
            <div  style={{paddingTop:'1rem'}}>
            <Flex style={{width:'7rem',margin:'0 auto'}}>
               <Flex.Item >
                 <button className={style.button2}
                         onClick={this.get}>
                   立即领取</button>

               </Flex.Item>
            </Flex>
            </div>
            <WhiteSpace />
            <WhiteSpace />
          </div>
          {
            this.props.rebateNewer.Model ?
              <div>
                <div id={'zezao'} className={style.zezao}>
                </div>
                <div id={'zezao'} style={{position: 'fixed', zIndex: '996', top: '0rem',}}>
                  <img className={style.showTaokey_taokey_img} src={shareAlert} alt="红包福利"
                       onClick={this.openUrl }
                  />
                </div>
              </div>
              :null
          }


        </div>
      </div>
    );
  };
}
export default connect(({rebateNewer}) => {
  rebateNewer
  return {rebateNewer}
})(RebateNewer);


const styles = {

  fixedTop: {
    zIndex: 900,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#fdde4a',
  },
  back: {
    color: '#333',
    fontSize: '0.36rem',
  },

  back_icon: {
    color: '#333',
  },

  navTitle: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: '0.45rem',
  },

  navbar: {
    backgroundColor: '#fdde4a',
    marginop: '0.3rem',
    marginBottom: '-0.2rem',
  },
  input:{
    // boxSizingizing: 'border-box',
    textalign:'center',
    fontsize:'0.4rem',
    height:'1rem',
    width :'6.5rem',
    borderRadius:'0.3rem',
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

  showTaokey: {
    position: 'fixed',
    left: '0',
    right: '0',
    bottom: '0',
    top: '0',
    textAlign: 'center',
    backgroundColor: '#000000',
    opacity:'0.35',
    zIndex: '999',
  },
  showTaokey_taokey1:{
    position: 'relative',
    textAlign: 'left',
    width: '5rem',
    height:'5rem',
    backgroundColor:'#000000',
    opacity:'0',
/*background-color: mediumvioletred;*/
    borderRadius: '0.2rem',
  },

  showTaokey_taokey_img:{
    width: '100%',
    height:'100%'
  },
}


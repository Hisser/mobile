import React from 'react';
import {connect} from "dva";
import {fetchPost} from "../../../utils/http";
import {Flex, WhiteSpace, NavBar, Button, Icon,Toast,Modal} from 'antd-mobile';
import {routerRedux} from "dva/router";
import posterimg from "../../../assets/posterImg/poster.png";
import redPackimg from "../../../assets/posterImg/redPack.png";
import code from "../../../assets/posterImg/code.png";
import ImgClose from '../../../assets/close.png';
import activityTop from '../../../assets/activityTop.png';
import style from './ActivityNewer.css';
import $ from 'jquery';
import * as wechatApi from "../../../wechatApi";

class ActivityNewer  extends React.Component{

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
    console.log('---',this.props.activityNewer.channelId);
    var channelId=this.props.activityNewer.channelId;
    setTimeout(function () {
      let param = {
        title: '居家网购,就要花得值！',
        link: window._global.url.host + "/api/redirect?redirectUrl="+ '/activityNewer/'+channelId,
        imgUrl: "https://yuezijie.oss-cn-beijing.aliyuncs.com/image/1545270420175.png?x-oss-process=style/w750",
        desc: '淘宝京东拼多多优惠金限时免费领，很多时候有额外优惠。自己领了朋友领，有好事就要分享！',
        success: function () {
          Toast.info('分享成功')
        }
      };
      wechatApi.share(param);
    },3000);

  }

    backPrevious = () => {
    document.referrer === '' ? this.props.dispatch(routerRedux.push("/")) : this.props.dispatch(routerRedux.goBack())
  }
  openUrl2 =()=>{
    window.location.href="https://android.myapp.com/myapp/detail.htm?apkName=com.qianshou.zshop&ADTAG=mobile";
  }

    openUrl = () => {

      this.props.dispatch({
        type: 'activityNewer/close',
        payload: '',
      });

      window.location.href="https://android.myapp.com/myapp/detail.htm?apkName=com.qianshou.zshop&ADTAG=mobile";


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
     var mobile= $("#tel").val();
     var code =$("#code").val();
     console.log(mobile,code,this.props.activityNewer.channelId);
      if(mobile ==""||code==""){
        Toast.info("验证码或者手机号不能为空");
      }else {
        this.props.dispatch({
          type: 'activityNewer/updateUser',
          payload: {
            mobile: mobile,
            code: code,
            channelId: this.props.activityNewer.channelId,
            userId:this.props.activityNewer.userId,
          },
        });
      }


    }

  render(){
    return (
      <div>
         <div style={{width:'100%',height:'1.7rem', zIndex: 900, position: 'fixed', top: 0,}}>
           <img src={activityTop} alt="红包福利" style={{width:'100%',height:'1.7rem'}} onClick={this.openUrl2 }/>
         </div>
        <div>
          <div style={{
            backgroundImage: "url('"+posterimg+"')",
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            marginTop:'1.7rem',
            width: document.body.clientWidth,
            height:document.body.clientWidth*2.17,
          }}>
          {/*<div>*/}
          <div style={{height:document.documentElement.clientWidth+10,width:'100%'}}>
          </div>
            <div >
              <Flex style={{width:'6rem',margin:'0 auto'}}>
                <Flex.Item >
                  <input style={styles.input} id="tel" name="tel"   placeholder="请输入电话号码"/>
                </Flex.Item>
              </Flex>
            </div>
            <div style={{paddingTop:'0.4rem'}}>
              <Flex style={{width:'6rem',margin:'0 auto'}}>
                <Flex.Item >
                  <div style={{position:'relative',height:'1.2rem'}}>
                  <input style={styles.input}  id="code" name="code" placeholder="请输入验证码" />
                    <div style={{position:'absolute',zIndex:991,top:0,height:'1.2rem',lineHeight:'1.2rem',right:10}}
                         onClick={this.clickSendCode}>
                      丨&nbsp;&nbsp;{this.state.codeText}
                    </div>
                  </div>

                </Flex.Item>
              </Flex>
            </div>
            <div  style={{paddingTop:'0.3rem'}}>
            <Flex style={{width:'6rem',margin:'0 auto'}}>
               <Flex.Item >
                 <Button type="warning" style={{backgroundColor:'#CA2B30',color:'white',borderRadius:'0.3rem',  fontFamily:'Microsoft YaHei',}}
                 onClick={this.get}
                 >
                   领取并下载</Button>

               </Flex.Item>
            </Flex>
            </div>
            <WhiteSpace />
            <WhiteSpace />
            <div style={{}}>
              <Flex style={{width:'8.5rem',margin:'0 auto'}}>
                <Flex.Item >
                  {/*<img src={code} style={{width:'100%',height:'100%'}}/>*/}
                  <WhiteSpace />
                  <WhiteSpace />
                  <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.4rem',color:'white'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;优惠金是电商给的，不要白不要。百货商场总是一边维持所谓正常价，一边悄悄放出内部价，淘宝京东等电商也不例外。</span><br/>
                  <WhiteSpace />
                  <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.4rem',color:'white'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;服装、食品、用具、洗护品、小家电、玩具、饰品、配件......等等生活日常商品的折扣较多，进入APP后您可以输入商品名称搜索，在淘宝、天猫、京东、拼多多之间快速比较。大牌高端商品立减优惠金较少，但京东自营却多少都有返点优惠。</span><br/>

                </Flex.Item>

              </Flex>
              <Flex style={{width:'8.5rem',margin:'0 auto'}}>
                <WhiteSpace />
              <Flex.Item style={{textAlign:'center'}}>
                <WhiteSpace />
                <WhiteSpace />
                <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.45rem',color:'white'}}>发现好东西 就要与大家分享！</span>
              </Flex.Item>
              </Flex>
            </div>
          </div>

        </div>

        <div>
        {/*  <Modal visible={this.props.activityNewer.Model} transparent maskClosable={false}>

            <div className={style.showTaokey}>
              <div className={style.showTaokey_taokey1}>
                <div>
                  <img className={style.showTaokey_taokey_img} src={redPackimg} alt="红包福利"
                    onClick={this.openUrl }
                  />
                </div>
              </div>
            </div>
          </Modal>*/}
          {
            this.props.activityNewer.Model ?
              <div>
                <div id={'zezao'} className={style.zezao}>
                </div>
                <div id={'zezao'} style={{position: 'fixed', zIndex: '996', top: '1rem',}}>
                  <img className={style.showTaokey_taokey_img} src={redPackimg} alt="红包福利"
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
export default connect(({activityNewer}) => {
  activityNewer
  return {activityNewer}
})(ActivityNewer);


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


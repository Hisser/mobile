import React from 'react';
import {connect} from "dva";
import {fetchPost} from "../../../utils/http";
import {Flex, WhiteSpace, NavBar, Button, Icon,Toast,Modal} from 'antd-mobile';
import {routerRedux} from "dva/router";
import posterimg from "../../../assets/posterImg/back.png";
import redPackimg from "../../../assets/posterImg/redPack.png";
import code from "../../../assets/posterImg/code.png";
import ImgClose from '../../../assets/close.png';
import style from './ActivityChannel.css';
import $ from 'jquery';
import * as wechatApi from "../../../wechatApi";

class ActivityChannel  extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    window.scrollTo(0,0);
    setTimeout(function () {
      let param = {
        title: '渠道开通页面',
        link: window._global.url.host + "/api/redirect?redirectUrl="+ '/activityChannel',
        imgUrl: "https://yuezijie.oss-cn-beijing.aliyuncs.com/image/1545270420175.png?x-oss-process=style/w750",
        desc: '此页面是专门为微信端开通渠道页面',
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

    //立即激活
    get=()=>{
     var mobile= $("#tel").val();
     var startNum =$("#startNum").val();
     var endNum = $("#endNum").val();
     var channelName = $("#channelName").val();
      if(mobile ==""||startNum==""||endNum==""||channelName==""){
        Toast.info("请正确输入各项信息");
      }else {
        if(/^\d{8}$/.test(startNum)&&/^\d{8}$/.test(endNum)){
          if (/^1\d{10}$/.test(mobile)) {
            this.props.dispatch({
              type: 'activityChannel/activity',
              payload: {
                mobile: mobile,
                startNum: startNum,
                endNum: endNum,
                channelName: channelName
              },
            });
          }else{
            Toast.info("手机号码不合法");
          }
        }else{
          Toast.info("渠道段号不合法");
        }
      }
    }

  render(){
    return (
      <div>
          <div style={styles.fixedTop}>
            <NavBar leftContent={<span style={styles.back}> </span>}
                    icon={<Icon type="left" style={styles.back_icon}/>}
                    style={styles.navbar}
                    onLeftClick={this.backPrevious}>
              <span style={styles.navTitle}>渠道开通</span> </NavBar>
          </div>
        <div>
          <div style={{
            backgroundImage: "url('"+posterimg+"')",
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            // marginTop:'1rem',
            width: document.body.clientWidth,
            height:document.body.clientHeight+100,
          }}>
          {/*<div>*/}
          <div style={{height:'2rem',width:'100%'}}>
          </div>

            <div >
              <Flex style={{width:'7rem',margin:'0 auto'}}>
                <Flex.Item >
                  <input style={styles.input} id="channelName" name="channelName"   placeholder="请输入渠道名称"/>
                </Flex.Item>
              </Flex>
            </div>
            <div style={{paddingTop:'0.4rem'}}>
              <Flex style={{width:'7rem',margin:'0 auto'}}>
                <Flex.Item >
                  <input style={styles.input} id="tel" name="tel" type="text"  maxLength={11}  placeholder="请输入电话号码"/>
                </Flex.Item>
              </Flex>
            </div>

            <div  style={{paddingTop:'0.4rem'}}>
              <Flex style={{width:'7rem',margin:'0 auto'}}>
                <Flex.Item >
                  <input style={styles.input} id="startNum" name="startNum" type="text"  maxLength={8} placeholder="起始号段"/>
                </Flex.Item>
              </Flex>
            </div>
            <div  style={{paddingTop:'0.4rem'}}>
              <Flex style={{width:'7rem',margin:'0 auto'}}>
                <Flex.Item >
                  <input style={styles.input} id="endNum" name="endNum" type="text"  maxLength={8} placeholder="终止号段"/>
                </Flex.Item>
              </Flex>
            </div>




            <div  style={{paddingTop:'1rem'}}>
            <Flex style={{width:'6rem',margin:'0 auto'}}>
               <Flex.Item >
                 <button type="warning" className={style.button2}
                 onClick={this.get}
                 >
                   确认开通</button>

               </Flex.Item>
            </Flex>
            </div>
            <WhiteSpace />
            <WhiteSpace />

            <div style={{textAlign:'center',width:'100%',marginTop:'0.5rem',height:'auto'}}>
              <div className={style.div3}>
                <div style={{width:'100%'}}>
                  <div style={{width:'30%',display:'inline-block'}}>
                    <hr style={{backgroundColor:'black'}}/>
                  </div>
                  <div style={{width:'30%',display:'inline-block',marginTop:'0.3rem'}}>
                    <span style={{fontSize:'0.42rem',fontFamily:'Microsoft YaHei',marginTop:'0.1rem',color:'white'}}>我的激活榜</span>
                  </div>
                  <div style={{width:'30%',display:'inline-block'}}>
                    <hr style={{backgroundColor:'black'}}/>
                  </div>
                </div>
                {/*<span style={{fontSize:'0.5rem',fontFamily:'Microsoft YaHei',marginTop:'0.1rem'}}>我的助力帮</span>*/}

                <div className={style.div2}>
                  <div style={{textAlign:'center',height:'0.5rem',width:'1rem',marginLeft:'0.35rem',fontFamily:'Microsoft YaHei',color:'white',paddingTop:'0.2rem'}}>
                    经理
                  </div>
                  <div style={{textAlign:'center',height:'0.5rem',width:'3rem',fontFamily:'Microsoft YaHei',color:'white',margin:'0 auto',paddingTop:'0.2rem'}}>
                    渠道名
                  </div>
                  <div style={{textAlign:'center',height:'0.5rem',width:'5rem',color: 'white',fontFamily:'Microsoft YaHei',paddingTop:'0.2rem'}}>
                    渠道段号
                  </div>
                  <div style={{textAlign:'center',height:'0.5rem',width:'1.5rem',marginLeft:'0.1rem',fontFamily:'Microsoft YaHei',color:'white',paddingTop:'0.2rem'}}>
                    激活数
                  </div>
                </div>


                {this.props.activityChannel.channelList!=null&&
                this.props.activityChannel.channelList.length!=0
                  ?
                  this.props.activityChannel.channelList.map((item, idx) => (
                    <div key={idx} className={style.div2}>
                      <img src={item.picUrl} className={style.pic1}/>
                      <div style={{textAlign:'center',height:'1rem',width:'3rem',color:'white',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                        <span style={{margin:'0 auto', lineHeight:'1rem',fontFamily:'Microsoft YaHei',color:'white',fontSize:'0.35rem'}}>{item.channelName}</span>
                      </div>
                      <div style={{textAlign:'center',height:'1rem',width:'5rem'}}>
                        <span style={{margin:'0 auto', lineHeight:'1rem', color: 'white',fontFamily:'Microsoft YaHei',overflow:'hidden',fontSize:'0.35rem'}}>{item.couponNum}</span>
                      </div>
                      <div style={{textAlign:'center',height:'1rem',width:'1.5rem'}}>
                        <span style={{margin:'0 auto', lineHeight:'1rem', color: 'white',fontFamily:'Microsoft YaHei',overflow:'hidden',fontSize:'0.35rem'}}>{item.couponUsedNum}</span>
                      </div>

                    </div>))
                  :
                  <div className={styles.div2}>
                    {/*<img src={user} className={styles.pic1}/>*/}
                    <div style={{textAlign:'center',height:'1rem',width:'100%'}}>
                      <span style={{margin:'0 auto', lineHeight:'1rem', color: 'red',fontFamily:'Microsoft YaHei',fontSize:'0.35rem'}}>还没有激活任何渠道哦</span>
                    </div>
                  </div>
                }
                <div style={{height:'0.5rem',  width:'100%'}}>

                </div>
              </div>
              <div style={{height:'0.3rem',  width:'100%'}}>

              </div>
            </div>

          </div>

        </div>



      </div>
    );
  };
}
export default connect(({activityChannel}) => {
  activityChannel
  return {activityChannel}
})(ActivityChannel);


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


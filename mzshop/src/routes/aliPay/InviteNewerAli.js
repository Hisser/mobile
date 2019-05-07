import React from 'react';
import {connect} from "dva";
import style from './Alipay.css'
import { List, TextareaItem,Flex ,WhiteSpace} from 'antd-mobile';
import {Modal,Toast} from "antd-mobile/lib/index";
import invite from "../../assets/invite_user_bac.png"
import copy from 'copy-to-clipboard';
import CommonUtil from "../../utils/CommonUtil";
import $ from 'jquery';
// import {fetchPost} from "../../../utils/http";
const alert = Modal.alert;

class InviteNewerAli  extends React.Component{

  constructor(props) {
    super(props);
  }
  state = {
      userName:'小花',
      link:window._global.share_sign_url+'#/alipayGroupNew/',
  }

  copy=() =>{
    const info= '【'+this.state.userName+'】邀请你领取支付宝福利红包,淘宝全场通用,金额随机,先到先得!快来抢!\n'
       + '【点击领取】\n'+this.state.link +this.props.alipayGroup.promoId+'\n'
    copy(info);
    Toast.info('复制成功,赶快去分享给好友吧')
  }

  componentWillMount(){
    if(CommonUtil.isAlipay()) {
      this.props.dispatch({
        type: 'alipayGroup/create',
        payload: {}
      })
    }else{

    }
  }
  componentDidMount(){
    //
    // this.setState({
    //   userName : window.localStorage.getItem('userName') ? window.localStorage.getItem('userName'):'小花'
    // })
    if(!CommonUtil.isAlipay()){
        Toast.info('请在支付宝中扫码打开！！')
    }
  }

  down =(src) =>{

      var a = document.createElement("a"), //创建a标签
        e = document.createEvent("MouseEvents"); //创建鼠标事件对象
      e.initEvent("click", false, false); //初始化事件对象
      a.href = src; //设置下载地址
      // a.href = 'https://yfb.yuezijie.cn/fs/alipay_106.png'
      a.download = '支付宝推广二维码'; //设置下载文件名
      a.target = "_blank"
      a.dispatchEvent(e); //给指定的元素，执行事件click事件

  }

  render(){
    console.log(this.props.alipayGroup.promoId);
    return (
      <div style={{
        backgroundImage: "url('"+invite+"')",
        // backgroundImage:"url(https://yuezijie.oss-cn-beijing.aliyuncs.com/image/rebateNewer1.png?x-oss-process=style/w750)",
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height:document.body.clientHeight,
      }}>
        <div style={{
          overflowY:'scroll',
          height:'100%'}}>

          <div style={{ width:'80%',height:'1rem',margin:'0 auto',}}>
          </div>
          {
            this.props.alipayGroup.codeUrl !='' ?
              <div>
              <div style={{ width:'80%',height:'auto',margin:'0 auto'}}>
              <img src={this.props.alipayGroup.codeUrl} style={{width:'100%'}}/>
              </div>
                <div style={{textAlign:'center',marginTop:'1rem'}}>
                  {/*<button className={style.button2}>*/}
                  <span style={{fontSize:'0.45rem',fontFamily:'Microsoft YaHei',color:'#fdfeff'}}> 长按上方图片保存发送给好友</span>
                {/*</button>*/}
                </div>
              </div>
              :
              <div style={{ width:'80%',height:'auto',margin:'0 auto',textAlign:'center',paddingTop:'30%'}}>
                <span style={{fontSize:'0.5rem',fontFamily:'Microsoft YaHei',color:'#fe0e0e'}}>图片加载中....</span>
              </div>
          }



      {/*    <div style={{ width:'80%',height:'3rem',margin:'0 auto',}}>
          </div>*/}
      {/*    {   this.props.alipayGroup.promoId!=0 ?
          <div style={{marginTop:'20%',width:'80%',height:'6rem',margin:'0 auto',backgroundColor:'#f8f8f8',borderRadius:'0.3rem',marginLeft:'10%'}}>
          <div style={{padding:'0.5rem'}}>
            <span style={{fontSize:'0.4rem',fontFamily:'Microsoft YaHei',color:'#3b3b3b'}}>【{this.state.userName}】邀请你领取支付宝福利红包,淘宝全场通用,金额随机,先到先得!快来抢!</span><br/>
            <WhiteSpace/>
            <WhiteSpace/>
            <span style={{fontSize:'0.4rem',fontFamily:'Microsoft YaHei',color:'#3b3b3b',wordBreak:'break-word'}}>【点击领取】<br/>&nbsp;
              {this.state.link + this.props.alipayGroup.promoId}</span>
            <br/>
            <WhiteSpace/>
            <WhiteSpace/>
            <hr/>
            <WhiteSpace/>
            <WhiteSpace/>
            <div style={{textAlign:'center'}}>
              <span style={{fontSize:'0.4rem',fontFamily:'Microsoft YaHei',color:'#3b3b3b'}}>复制这条消息,发送给支付宝好友</span>
            </div>
            <div style={{textAlign:'center',marginTop:'2rem'}}>
              <button className={style.button2}
                      onClick={this.copy}>
                点击复制文案</button>
            </div>

          </div>
        </div>
           :null}*/}
         {/* <div style={{ width:'80%',height:'3rem',margin:'0 auto',}}>
          </div>
          <div style={{ width:'80%',height:'1rem',margin:'0 auto',textAlign:'center'}}>
            <span style={{fontSize:'0.4rem',fontFamily:'Microsoft YaHei',color:'#3b3b3b'}}>长按以下图片保存到本地</span>
          </div>
          <div style={{ width:'80%',height:'auto',margin:'0 auto'}}>
            <img src={demo} style={{width:'100%'}}/>
          </div>
*/}
        </div>
      </div>
    );
  };
}
export default connect(({alipayGroup}) => {
  alipayGroup
  return {alipayGroup}
})(InviteNewerAli);



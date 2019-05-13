import React from 'react';
import {connect} from "dva";
import style from './Alipay.css'
import { List, TextareaItem,Flex ,WhiteSpace} from 'antd-mobile';
import {Modal,Toast} from "antd-mobile/lib/index";
import invite from "../../assets/invite_user_bac.png";
import alipy_invite_introduce from "../../assets/alipy_invite_introduce.png";
import introduce from "../../assets/introduce.png";
import copy from 'copy-to-clipboard';
import CommonUtil from "../../utils/CommonUtil";
import $ from 'jquery';
// import {fetchPost} from "../../../utils/http";
const alert = Modal.alert;

class InviteNewerAli  extends React.Component{

  constructor(props) {
    super(props);
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
    if(!CommonUtil.isAlipay()){
        Toast.info('请在支付宝中扫码打开！！')
    }
  }

  render(){
    console.log(this.props.alipayGroup.codeUrl);
    return (

      <div>

          {
            this.props.alipayGroup.codeUrl !='' ?
              <div style={{textAlign:'center',backgroundColor:'#B71C2A',width:document.body.clientWidth,height:document.body.clientHeight}}>
                <img src={this.props.alipayGroup.codeUrl}  style={{width:'82%',height:'82%'}}/>
                <img src={introduce} className={style.img} style={{width:'100%',marginTop:'-0.2rem'}}/>
              </div>
              :
              <div style={{textAlign:'center',backgroundColor:'#B71C2A',width:document.body.clientWidth,height:document.body.clientHeight}}>
              </div>
          }





      </div>

    );
  };
}
export default connect(({alipayGroup}) => {
  alipayGroup
  return {alipayGroup}
})(InviteNewerAli);



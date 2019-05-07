import React from 'react';
import {connect} from "dva";
import {routerRedux} from "dva/router";
import {Modal} from "antd-mobile/lib/index";
import styles from './AlipayCode.css';
import ImgAlipayCode from '../../assets/alipay/alipay_code.png';
import Imgback from '../../assets/backPrevious2.png';
import {Toast,WhiteSpace} from 'antd-mobile';
import CommonUtil from "../../utils/CommonUtil";
import invite from "../../assets/invite_user_bac.png"

const alert = Modal.alert;

class AliPayCode  extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      loadingInfo: '',
      isLoading: false,
    };
  }

  downloadCodeImg = () => {
    // if (CommonUtil.isAlipay() || CommonUtil.isWeiXin()) {
    //   Toast.info("请用浏览器打开进行下载！");
    // }else{
    //   this.props.dispatch({
    //     type: 'alipayGroup/downloadCodeImg',
    //     payload: {
    //       channelId:this.props.alipayGroup.channelId,
    //       num:10,
    //     },
    //   });
    // }

    this.props.dispatch({
      type: 'alipayGroup/downloadCodeImg',
      payload: {
        channelId:this.props.alipayGroup.channelId,
        num:10,
      },
    });

  }


  backPrevious = () => {
    this.props.dispatch(routerRedux.goBack());
  }


  componentDidMount(){

  }


  render(){
    let channelName = this.props.alipayGroup.channelInfo? this.props.alipayGroup.channelInfo.channelName:"";

    return (
    <div style={{
      backgroundImage: "url('"+invite+"')",
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height:'100%',
    }}>
      <div>
        <img src={ImgAlipayCode} style={{width: '95%', height: 'auto', margin: '0.2rem'}}/>
      </div>

      <WhiteSpace/>

      <div style={{
        width: '80%',
        height: 'auto',
        margin: '0 auto',
        backgroundColor: '#f8f8f8',
        borderRadius: '0.3rem',
        marginLeft: '10%'
      }}>

        <div style={{padding: '0.5rem'}}>
          <WhiteSpace/>
          <div className={styles.code_name}>
            支付宝渠道推广二维码
          </div>
          <WhiteSpace/>
          <div style={{textAlign: 'center'}}>
            <span style={{fontSize: '0.6rem', fontFamily: 'Microsoft YaHei', color: '#3b3b3b'}}>
              渠道名称：{channelName}</span>
          </div>

          <div style={{textAlign: 'center', marginTop: '1rem', marginBottom: '0.6rem'}}>
            <button className={styles.button2} onClick={this.downloadCodeImg}>
              下载1个推广码
            </button>
          </div>
        </div>
      </div>
    </div>

    );
  };

}

export default connect(({alipayGroup}) => {
  alipayGroup
  return {alipayGroup}
})(AliPayCode);


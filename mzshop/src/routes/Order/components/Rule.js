import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import React from "react";
import styles from './rule.css';
import {connect} from "dva/index";
import {fullStartOfMonth, fullEndOfMonth} from '../../../utils/dateUtils';
function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
class Rule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      modal2: false,
    };
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <WingBlank>
        <div className={styles.div}>
          <span onClick={this.showModal('modal1')} className={styles.Botton}>规则</span>
        </div>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="订单规则"
          footer={[{
            text: '关闭', onPress: () => {

              this.onClose('modal1')();
            }
          }]}
          wrapProps={{onTouchStart: this.onWrapTouchStart}}
        >
          <div style={{height: 270, overflow: 'scroll',textAlign:'left'}}>
            1，请及时查看订单状态，下单后后台标识红色警示的订单请及时退款重新正常购买，以免造成不必要的损失。包括：1.未支付成功或超过24小时付款；2.京东帮帮主订单；3.账号异常;4.校园订单；5.企业订单；6.团购订单；7.开增值税专用发票订单；8.乡村推广员下单；9.违规订单；<br/>
            2，关于订单不同步：活动期间新增加用户量大，订单量激增，数据同步会比较慢。如遇到订单不显示，请严格按照玩法规则，勿擅自操作退货，耐心等待同步，24小时候后如还未在订单内查看到订单请及时京东退款。最高延迟一般1小时内。<br/>
            3，订单收货之后我们会对订单进行审核，为了避免维权导致的订单退款，我们将在审核确认后的次月发放补贴（例如2月下单，3月完成的订单，会在4月30号前到账）；<br/>
            4，补贴发放后，请下载APP-打开“我的钱包”提现，提现成功将自动转入你的微信钱包；<br/>
            5，若发现存在刷单、虚假用户等违规行为，平台有权利判定补贴失效，并封禁相关账户；<br/>
            6，花得值有权对以上条款修改，如有任何疑问请联系客服023-81373071<br/>
          </div>
        </Modal>
      </WingBlank>)


  }
}
export default Rule;

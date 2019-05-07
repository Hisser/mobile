import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import React from "react";
import styles from './rule.css';
import {connect} from "dva/index";
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
          title="砍价规则"
          footer={[{
            text: '关闭', onPress: () => {

              this.onClose('modal1')();
            }
          }]}
          wrapProps={{onTouchStart: this.onWrapTouchStart}}
        >
          <div style={{height: 270, overflow: 'scroll',textAlign:'left'}}>
            1.邀请好友帮你砍价，24小时内砍多少，就能得多少，砍到0，即可享受免单权利，已砍价金额必须大于1元;<br/>

            2.若发现用户存在刷单、虚假用户助力等违规行为，平台有权利判定砍价失败;<br/>

            3.砍价成功之后，请挑选商品下单，下单之后请前往我的订单津贴查看订单进度;<br/>

            4.对物流、商品有疑问或者需要修改收货地址可前往淘宝、天猫、京东查看物流详情;<br/>

            5.花得值可在法律法规允许范围内对本次活动规则解释并做适当修改;<br/>
          </div>
        </Modal>
      </WingBlank>)


  }
}
export default Rule;

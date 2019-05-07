import {Modal, WingBlank} from 'antd-mobile';
import React from "react";
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
    e.preventDefault();   //修复 Android 上点击穿透
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
        <div>
          <span onClick={this.showModal('modal1')} style={{width: '2rem', margin: '0 auto', color: 'black'}}>规则</span>
        </div>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="淘礼金规则"
          footer={[{
            text: '关闭', onPress: () => {
              this.onClose('modal1')();
            }
          }]}
          wrapProps={{onTouchStart: this.onWrapTouchStart}}
        >
          <div style={{height: 270, overflow: 'scroll'}}>
            1.邀请好友帮你抢淘礼金，24小时内凑满2人，即可享受1元淘礼金;<br/>

            2.每个新用户仅可助力一次，同一设备、微信号、qq号视为同一用户;<br/>

            3.若发现用户存在刷单、虚假用户助力等违规行为，平台有权利判定助力失败;<br/>

            4.抢淘礼金成功之后，请在24小时内挑选商品下单，下单之后请前往我的订单津贴查看订单进度;<br/>

            5.对物流、商品有疑问或者需要修改收货地址可前往淘宝、天猫、京东查看物流详情;<br/>

            6.活动补贴只能在花得值APP里面领取;<br/>

            7.花得值可在法律法规允许范围内对本次活动规则解释并做适当修改;<br/>
          </div>
        </Modal>
      </WingBlank>)
  }
}
export default Rule;

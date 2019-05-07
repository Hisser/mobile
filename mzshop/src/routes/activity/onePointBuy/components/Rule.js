import {Modal, WingBlank} from 'antd-mobile';
import React from "react";
import styles from "./Rule.css";


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
          <button onClick={this.showModal('modal1')} className={styles.button}>规则</button>
        </div>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="规则"
          footer={[{
            text: '关闭', onPress: () => {
              this.onClose('modal1')();
            }
          }]}
          wrapProps={{onTouchStart: this.onWrapTouchStart}}
        >
          <div style={{height: 270, overflow: 'scroll',textAlign:'left',fontSize:'0.45rem'}}>
            1.活动时间:2018年12月10日00:00:00~12月31日23:59:59;
            <br/>
            2.活动期间，通过本活动页成功购买页面展示规格的京东拼购商品，不能更换其他规格商品；
            <br/>
            3.仅限活动页面商品享受"每单返5元"返利优惠，非活动页商品不参与该活动；
            <br/>
            4.京东plus用户在符合京东商城其他返利规则的前提下，可享受本次活动返利；
            <br/>
            5.拼购"全场返5元"，必须先领券再下单，并且通过拼团形式下单；活动期间，同一微信账户、同一京东账户、同一设备活动期每天最多5单；
            <br/>
            6.用户下单完成30分钟后，关注微信公众号"花得值"，点击菜单栏“京东拼购进入订单查询页面，进行订单查询；
            <br/>
            7."全场返5元"商品奖预计会在您订单完成后的1个月25天左右发放(预计最晚到账时间2019年2月25日左右)；
            <br/>
            8.同一个京东账号切勿同时参与除本平台之外其他平台的类似活动；
            <br/>
            9.实付金额：即订单总金额扣除优惠、礼卡、商城积分、商城账户余额等抵扣部分，缺货商品金额，以及运费金额)，使用京豆，优惠券(包括但不限于：满减券运费券等等)，礼品卡，白条优惠券，商城账户余额的订单；
            <br/>
            10.刷单、批发、用于再度销售或者商业用途的订单等作弊订单，均无返利，一经发现以上行为，花得值将有权扣除对应奖励；
            <br/>
            11.被京东判定为无效的订单不予奖励；
            <br/>
            12.无效订单包括但不限于以下几种：取消或未成功交易的订单;京东帮帮主订单;账号异常、违规订单;校园、企业、团购订单;开增值税专用发票订单;乡村推广员下单、自己推广自己下单来源与备案网址不符。
          </div>
        </Modal>
      </WingBlank>)
  }
}
export default Rule;

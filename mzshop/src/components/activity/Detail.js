import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import React from "react";
import styles from './Detail.css';
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
class Detail extends React.Component {
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
        <Button onClick={this.showModal('modal1')} className={styles.Botton}>活动规则</Button>
        </div>
        <WhiteSpace/>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="活动规则"
          footer={[{
            text: '关闭', onPress: () => {

              this.onClose('modal1')();
            }
          }]}
          wrapProps={{onTouchStart: this.onWrapTouchStart}}
        >
          <div style={{height: 270, overflow: 'scroll'}}>

            活动时间：<br/>{this.props.acInfo!=null?this.props.acInfo.startTimeString:null}--{this.props.acInfo!=null?this.props.acInfo.endTimeString:null}<br/>
            {this.props.acInfo.introduction}
            </div>
        </Modal>
      </WingBlank>)


  }
}
export default Detail;

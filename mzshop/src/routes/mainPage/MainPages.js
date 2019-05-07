import React from "react";
import * as CommonUtil from "../../utils/CommonUtil";
import Nav from "./components/Nav";
import {connect} from "dva/index";
import {routerRedux} from "dva/router";
import userIco from '../../assets/user.png';
import {Flex, WhiteSpace, NavBar, Button, Icon,Toast,Modal} from 'antd-mobile';
import $ from "jquery";
import {fetchPost} from "../../utils/http";


class MainPages extends React.Component {

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


  //跳转到搜索页面
turnToSearch=()=> {
    this.props.dispatch(routerRedux.push('/search'));
  };


  render() {
    let userImg = userIco;
    if (this.props.mainpage.userIco) {
      userImg = this.props.mainpage.userIco;
    }

    return (
      <div>
      <Nav a={ this.turnToSearch } Nav={ this.props.mainpage.NavList}
           goodsSelected={this.props.mainpage.goodsSelected}
           showActivity={this.props.mainpage.showActivity}
      />

      </div>
    )

  }

}
export default connect(({mainpage}) => {
  mainpage
  return {mainpage};
})
(MainPages);


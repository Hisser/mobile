import React from 'react';
import {connect} from "dva";
import {Flex, WhiteSpace, NavBar, Button, Icon,Toast} from 'antd-mobile';
import {routerRedux} from "dva/router";

import {fetchPost} from "../../../utils/http";
import $ from 'jquery';

import imgBack from '../../../assets/back.png';
import imgUser from '../../../assets/user.png';
import imgHome from '../../../assets/home.png';
import invite from "../../../assets/personal/mobile_bac.png"



class Mobile  extends React.Component {

  commonData = {
    mobile: '',
    code: ''
  };

  componentDidMount(){
    window.scrollTo(0,0);
  }


  toBack=()=>{
    this.props.dispatch(routerRedux.goBack());
  };


  toHome=()=>{
    this.props.dispatch(routerRedux.push({pathname: '/'}));
  };


  clickSendCode = () => {
    this.commonData.mobile = $("#tel").val();
    console.log($("#tel").val());
    this.sendCode();
  }

  sendCode =() => {
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


  get=()=>{
    var mobile= $("#tel").val();
    var code =$("#code").val();

    if(mobile ==""||code==""){
      Toast.info("验证码或者手机号不能为空");
    }else {
      this.props.dispatch({
        type: 'personal/updateUserInfo',
        payload: {
          mobile: mobile,
          code: code,
        },
      });
    }
  }


  render() {

    let userIco = window.localStorage.getItem('userIco');
    userIco = userIco ? userIco : imgUser;
    let userName = window.localStorage.getItem('userName');
    userName = userName ? userName : '昵称';
    let mobile = window.localStorage.getItem('mobile');

    return (
      <div style={{backgroundImage: "url('"+invite+"')", backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', width: '100%', height:document.body.clientHeight,}}>

        <Flex  style={{width:'100%'}} >
          <Flex.Item style={{textAlign:'left',margin:'0.3rem',height:'1rem'}}
                     onClick={()=>this.toBack()} >
            <img src={imgBack} style={{width:'0.6rem',height:'0.6rem',borderRadius:'0.6rem'}}/>
          </Flex.Item>
          <Flex.Item style={{textAlign:'left',margin:'0.3rem',height:'1rem'}}
                     onClick={()=>this.toBack()} >
            <span style={{lineHeight:'0.5rem',fontSize:'0.4rem',color:'#000'}}>用户信息</span>
          </Flex.Item>
          <Flex.Item style={{textAlign:'right',margin:'0.3rem',height:'1rem'}}
                     onClick={()=>this.toHome()}>
            <img src={imgHome} style={{width:'0.6rem',height:'0.6rem',borderRadius:'0.6rem'}}/>
          </Flex.Item>
        </Flex>

        <Flex  style={{width:'100%'}} >
        <div style={{width:'100%',padding:'0.5rem'}} >
        <div style={{backgroundColor:'rgb(249,147,116)',paddingTop:'0.5rem',paddingBottom:'0.5rem',borderRadius:'0.5rem'}} >
            <Flex style={{width:'80%',margin:'0 auto',paddingTop:'0.3rem'}}>
              <Flex.Item >
                <input style={{textAlign:'left',
                  fontSize:'0.4rem',
                  height:'1rem',
                  width :'100%',
                  borderRadius:'4px',
                  border:'1px solid #c8cccf',
                  color:'#6a6f77',
                  mozAppearance: 'none',
                  display:'block',
                  outline:'0',
                  padding:'0 0.2rem',
                  textDecoration:'none',}} id="tel" name="tel"   placeholder="请输入电话号码"/>
              </Flex.Item>
            </Flex>
            <Flex style={{width:'80%',margin:'0 auto',paddingTop:'0.3rem'}}>
              <Flex.Item >
                <div style={{position:'relative',height:'1.2rem'}}>
                  <input style={{
                    textAlign:'left',
                    fontSize:'0.4rem',
                    height:'1rem',
                    width :'100%',
                    borderRadius:'4px',
                    border:'1px solid #c8cccf',
                    color:'#6a6f77',
                    mozAppearance: 'none',
                    display:'block',
                    outline:'0',
                    padding:'0 0.2rem',
                    textDecoration:'none',
                  }}  id="code" name="code" placeholder="请输入验证码" />
                  <div style={{position:'absolute',zIndex:991,top:0,height:'1.2rem',lineHeight:'1.2rem',right:10}}
                       onClick={this.clickSendCode}>丨&nbsp;&nbsp;验证码 </div>
                </div>
              </Flex.Item>
            </Flex>
            <Flex style={{width:'80%',margin:'0 auto',paddingTop:'0.3rem'}}>
              <Flex.Item >
                <Button type="warning" style={{backgroundColor:'#CA2B30',color:'white',borderRadius:'0.3rem',}}
                        onClick={this.get}>
                  绑定手机号码</Button>
              </Flex.Item>
            </Flex>
        </div>
        </div>
        </Flex>

      </div>
    )
  }
}

export default connect(({personal}) => {
  personal
  return {personal}
})(Mobile);

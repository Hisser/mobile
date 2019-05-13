import React from 'react';
import {connect} from "dva";
import {Flex, WhiteSpace, List, InputItem , Button, Modal,Toast} from 'antd-mobile';
import {routerRedux} from "dva/router";
import imgBack from '../../../assets/back-icon.android.png';
import imgUser from '../../../assets/user.png';


class Wallet  extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      accountValue: '',
    };
  }


  componentDidMount(){
    window.scrollTo(0,0);
  }

  allExtracts=()=>{
    let value =  this.props.personal.accountTotal?  this.props.personal.accountTotal : '';
    this.setState({accountValue: value});
  };

  toWallet=()=>{
    //如果没有绑定手机号，请绑定手机号，如果已经绑定了，请APP手机号码登录
    let mobile = window.localStorage.getItem('mobile');

    if(!mobile){
      Modal.alert('提示', <div>在提现前，请先绑定手机号码</div>, [
        { text: '去绑定手机号码', onPress: () => this.props.dispatch(routerRedux.push({pathname: '/mobile'}))},
      ])

    }else{
      Toast.info("请用手机号登录花得值APP后，在APP里面进行提现！")
    }
  };

  toBack=()=>{
    this.props.dispatch(routerRedux.goBack());
  };


  render() {

    let userIco = window.localStorage.getItem('userIco');
    userIco = userIco ? userIco : imgUser;
    let userName = window.localStorage.getItem('userName');
    userName = userName ? userName : '昵称';
    let mobile = window.localStorage.getItem('mobile');
    if (mobile!=null && mobile.startsWith("1") && mobile.length == 11){
      mobile = mobile;
    }else{
      mobile = null;
    }
    let amount = this.props.personal.accountTotal?  this.props.personal.accountTotal : 0;
    let accountValue = this.state.accountValue;


    return (
      <div  style={{backgroundColor:'#ffffff',height:'100%'}} >

        <Flex  style={{width:'100%'}} >
          <Flex.Item style={{textAlign:'left',margin:'0.3rem'}}   onClick={()=>this.toBack()} >
            <img src={imgBack} style={{width:'0.6rem',height:'0.6rem',borderRadius:'0.6rem'}}/>
          </Flex.Item>

          <Flex.Item style={{textAlign:'right',margin:'0.3rem'}}>
            <span style={{lineHeight:'0.5rem',fontSize:'0.4rem',color:'#000'}}>提现到微信</span>
          </Flex.Item>

          <Flex.Item style={{textAlign:'right',margin:'0.3rem'}}>
          </Flex.Item>

        </Flex>

        <hr style={{width:'100%',height:'1px',backgroundColor:'#eeeeee'}}  />

        <List>
          <InputItem
            type='money'
            defaultValue={amount}
            clear
            moneyKeyboardAlign="right"
            extra="元"
            editable = {false}
          >总金额</InputItem>
          <InputItem
            type='money'
            placeholder="请输入提现金额"
            value={accountValue}
            extra="元"
            onChange={(v) => { console.log('onChange', v); }}
          >提取金额
          </InputItem>

        </List>

        <Flex direction = 'column' >
          <Flex  style={{width:'100%'}} >
            <Flex.Item style={{textAlign:'right',marginRight:'0.3rem',height:'1rem'}}   onClick={()=>this.allExtracts()}>
              <span style={{lineHeight:'0.5rem',fontFamily:'Microsoft YaHei',fontSize:'0.36rem',color:'#0000cc'}}>全部提现</span>
            </Flex.Item>
          </Flex>

          <Button style={{width:'90%',height:'1.2rem',fontSize:'0.4rem',color:'#fff',backgroundColor:'#ff3333'}}
                  onClick={()=>this.toWallet()} >转出到微信红包</Button>

        </Flex>

      </div>
    )
  }
}

export default connect(({personal}) => {
  personal
  return {personal}
})(Wallet);

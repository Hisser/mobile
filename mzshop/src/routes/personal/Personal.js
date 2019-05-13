import React from 'react';
import {connect} from "dva";
import {Flex, WhiteSpace, NavBar, Button, Icon,Toast} from 'antd-mobile';
import {routerRedux} from "dva/router";
import imgBack from '../../assets/back.png';
import imgRightBack from '../../assets/right_black.png';
import imgUser from '../../assets/user.png';
import imgHome from '../../assets/home.png';
import imgWallet from '../../assets/personal/wallet.png';
import imgRebate from '../../assets/personal/rebate.png';
import imgRedPacket from '../../assets/personal/redPacket.png';



class Personal  extends React.Component {

  componentDidMount(){
    window.scrollTo(0,0);
  }

  toRebate=()=>{
    this.props.dispatch(routerRedux.push({pathname: '/order'}));
  };

  toRedPacket=()=>{
    this.props.dispatch(routerRedux.push({pathname: '/myRedPack'}));
  };

  toWallet=()=>{
    this.props.dispatch(routerRedux.push({pathname: '/wallet'}));
  };



  toBack=()=>{
    this.props.dispatch(routerRedux.goBack());
  };


  toHome=()=>{
    this.props.dispatch(routerRedux.push({pathname: '/'}));
  };


  toAlipayFans=()=>{
    this.props.dispatch(routerRedux.push({pathname: '/myFans'}));
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


    return (
      <div  style={{backgroundColor:'#ffffff',height:'100%'}} >
        <Flex direction = 'column' style={{background:'linear-gradient(to bottom, rgb(253,221,75) , rgb(255,255,255))'}} >
          <Flex  style={{width:'100%'}} >
            <Flex.Item style={{textAlign:'left',margin:'0.3rem',height:'1rem'}}
                       onClick={()=>this.toBack()} >
              <img src={imgBack} style={{width:'0.6rem',height:'0.6rem',borderRadius:'0.6rem'}}/>
            </Flex.Item>
            <Flex.Item style={{textAlign:'right',margin:'0.3rem',height:'1rem'}}
                       onClick={()=>this.toHome()}>
              <img src={imgHome} style={{width:'0.6rem',height:'0.6rem',borderRadius:'0.6rem'}}/>
            </Flex.Item>
          </Flex>

          <WhiteSpace />

          <Flex.Item style={{textAlign:'center',margin:'auto 0',height:'2.5rem'}}>
            <img src={userIco} style={{width:'2.5rem',height:'2.5rem',borderRadius:'1.25rem'}}/>
          </Flex.Item>

          <Flex.Item style={{textAlign:'center',margin:'auto 0',height:'1rem'}}>
            <span style={{lineHeight:'1rem',fontFamily:'Microsoft YaHei',fontSize:'0.5rem',color:'rgb(177,148,101)'}}>{userName}</span>
          </Flex.Item>
          {
            mobile ?
              <Flex.Item style={{textAlign:'center',margin:'0'}}>
                <span style={{lineHeight:'0.5rem',fontFamily:'Microsoft YaHei',fontSize:'0.36rem',color:'rgb(177,148,101)'}}>{mobile}</span>
              </Flex.Item>
              : null
          }

          <WhiteSpace />
          <WhiteSpace />

          <Flex  style={{width:'90%',borderRadius:'0.5rem 0.5rem 0 0',marginTop:'0.5rem'}} >
            <Flex.Item style={{textAlign:'center',margin:'auto 0',backgroundColor:'#fff',paddingTop:'0.5rem'}}
                       onClick={()=>this.toRebate()} >
              <img src={imgRebate} style={{width:'1rem',height:'1rem',marginTop:'0.2rem'}}/>
              <div style={{fontFamily:'Microsoft YaHei'}}>返利</div>
            </Flex.Item>
            <Flex.Item style={{textAlign:'center',margin:'auto 0',backgroundColor:'#fff',paddingTop:'0.5rem'}}
                       onClick={()=>this.toRedPacket()}>
              <img src={imgRedPacket} style={{width:'1rem',height:'1rem',marginTop:'0.2rem'}}/>
              <div style={{fontFamily:'Microsoft YaHei'}}>红包</div>
            </Flex.Item>
            <Flex.Item style={{textAlign:'center',margin:'auto 0',backgroundColor:'#fff',paddingTop:'0.5rem'}}
                       onClick={()=>this.toWallet()}>
              <img src={imgWallet} style={{width:'1rem',height:'1rem',marginTop:'0.2rem'}}/>
              <div style={{fontFamily:'Microsoft YaHei'}}>钱包</div>
            </Flex.Item>
          </Flex>
        </Flex>

        <WhiteSpace />

        <hr style={{height:'1px',border:'none',backgroundColor:'#bbbbbb'}}  />

        <WhiteSpace />

        <hr style={{height:'1px',border:'none',backgroundColor:'#dddddd'}}  />

        <Flex style={{marginTop:'0.3rem',marginBottom:'0.3rem'}} onClick={()=>this.toAlipayFans()} >
          <Flex.Item style={{textAlign:'left',marginLeft:'0.3rem'}}>
            <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.4rem'}}>我的好友</span>
          </Flex.Item>
          <Flex.Item style={{textAlign:'right',marginRight:'0.3rem'}}>
            <img src={imgRightBack} style={{width:'0.6rem',height:'0.6rem',borderRadius:'0.6rem'}}/>
          </Flex.Item>
        </Flex>

        <hr style={{height:'1px',border:'none',backgroundColor:'#dddddd'}}  />

      </div>
    )
  }
}

export default connect(({personal}) => {
  personal
  return {personal}
})(Personal);

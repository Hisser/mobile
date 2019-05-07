import React from 'react';
import {connect} from "dva";
import {fetchPost} from "../../../utils/http";
import * as dataUtils from "../../../utils/dateUtils";
import {Flex, WhiteSpace, NavBar, Button, Icon,Toast} from 'antd-mobile';
import {routerRedux} from "dva/router";
import redPackimg from "../../../assets/redPacks.png";
import unUsedImg from "../../../assets/Unused.png";
import fiveImg from "../../../assets/five.png";
import * as wechatApi from "../../../wechatApi";

class Redpack  extends React.Component {


  queryRedPack=(state)=>{
    this.props.dispatch({
      type: 'redPack/fetch',
      payload: {
        state:state,
        accessToken:this.props.redPack.accessToken,
        userSecKey:this.props.redPack.userSecKey

      },
    });
  };

  goToBuy = ()=>{
    // window.location.href = "hdz_mainPage";
    window.location.href = "http://o.yuezijie.cn/#/";
  }




    componentDidMount(){
      window.scrollTo(0,0);
     /* setTimeout(function () {
        let param = {
          title: '居家网购,就要花得值！',
          link: window._global.url.host + "/api/redirect?redirectUrl="+ '/myRedPack',
          imgUrl: "https://yuezijie.oss-cn-beijing.aliyuncs.com/image/1545270420175.png?x-oss-process=style/w750",
          desc: '花的值省钱购物拿返现,5元新人红包限时领。自己领了朋友领，有好事就要分享！',
          success: function () {
            Toast.info('分享成功')
          }
        };
        wechatApi.share(param);
      },3000);*/

      // this.queryRedPack('SENDED');

    }



  render() {

    return (
      <div>
        <Flex>
          <Flex.Item style={{textAlign:'center',margin:'auto 0',height:'1rem',backgroundColor:'#fff'}}
                     onClick={()=>this.queryRedPack('SENDED')} >
            <span style={{lineHeight:'1rem',color:this.props.redPack.fontcolor1,fontFamily:'Microsoft YaHei'}}>未使用</span>
          </Flex.Item>
          <Flex.Item style={{textAlign:'center',margin:'auto 0',height:'1rem',backgroundColor:'#fff'}}
                     onClick={()=>this.queryRedPack('USED')}
          >
            <span style={{lineHeight:'1rem',color:this.props.redPack.fontcolor2,fontFamily:'Microsoft YaHei'}}>已使用</span>
          </Flex.Item>
          <Flex.Item style={{textAlign:'center',margin:'auto 0',height:'1rem',backgroundColor:'#fff'}}
                     onClick={()=>this.queryRedPack('EXPIRED')}
          >
            <span style={{lineHeight:'1rem',color:this.props.redPack.fontcolor3,fontFamily:'Microsoft YaHei'}}>已失效</span>
          </Flex.Item>
        </Flex>
        <WhiteSpace />
        { this.props.redPack.couponList.map((item, idx) => (
          <div  key= {idx}>


        <Flex style={{width:'95%',margin:'0 auto'}}>
                <Flex.Item style={{height:'4rem'}}>
            <div style={{
              backgroundImage: "url('"+redPackimg+"')",
              backgroundSize: '100% 100%',
              height:'100%',
              width:'100%',
              backgroundRepeat: 'no-repeat',
              }}>
              <div style={{paddingTop:'0.4rem',paddingLeft:'0.5rem',paddingRight:'0.5rem'}}>
                <div style={{width:'100%'}}>
                  {
                    item.couponName == '新人红包' ? <span style={{fontSize:'0.4rem',fontWeight:'700'}}>新人奖励5元红包</span> :
                      item.couponName == '推荐奖励' ? <span style={{fontSize:'0.4rem',fontWeight:'700'}}>推荐奖励5元红包</span> : null
                  }

                  {
                    item.couponState =='SENDED' ? <img src={unUsedImg} style={{float:'right',height:'0.7rem',width:'auto',right:'0.2rem'}} onClick={()=>this.goToBuy()}/>:
                      null
                  }
                  {/*<img src={unUsedImg} style={{float:'right',height:'0.7rem',width:'auto',right:'0.2rem'}}/>*/}
                </div>
                <div style={{width:'100%'}}>
                <span style={{fontSize:'0.3rem',fontWeight:'500'}}>有效期:{dataUtils.DateUtils.parseYMD(item.acceptTime)}--{dataUtils.DateUtils.parseYMD(item.endTime)}</span>
                </div>
              </div>
              <div style={{paddingTop:'0.4rem',paddingLeft:'0.5rem',paddingRight:'0.5rem',}}>
                <div style={{width:'24%',display:'inline-block',height:'2rem',}}>
                  <img src={fiveImg} style={{height:'auto',width:'100%',marginTop:'0.2rem'}}/>
                </div>
                <div style={{width:'73%',height:'rem',float:'right',paddingTop:'0.2rem',display:'inline-block'}}>
                  <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.3rem'}}>
                    {item.couponDesc}
                  </span>
                </div>
              </div>

            </div>
                </Flex.Item>
        </Flex>
            <WhiteSpace />
          </div>
        ))
        }
        {
          this.props.redPack.couponList==null ||this.props.redPack.couponList.length==0?
            <div style={{width:'100%',height:'1rem',textAlign:'center'}}>
              <span style={{lineHeight:'1rem',fontFamily:'Microsoft YaHei',fontSize:'0.4rem',color:'#a79f9b'}}>没有数据</span>
            </div>
            :null
        }
      </div>
    )
  }

}

export default connect(({redPack}) => {
  redPack
  return {redPack}
})(Redpack);

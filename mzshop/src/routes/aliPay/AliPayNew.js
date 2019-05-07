import React from 'react';
import {connect} from "dva";
import {Modal} from "antd-mobile/lib/index";
import alipay from "../../assets/alipay.png"
import alipayBac from "../../assets/alipay_bac.png"
import agree from "../../assets/agree.png";
import GoodsListView2 from '../../components/goodsListView/GoodsListView2.js'
import CommonUtil from '../../utils/CommonUtil';
import {routerRedux} from "dva/router";
import style from './Alipay.css';
const alert = Modal.alert;
// import {fetchPost} from "../../../utils/http";

const pageSize = 20;
class AliPayNew  extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,

      loadingInfo: '',
      isLoading: false,
    };
  }

  queryGoodsList = (pageNo) => {
    this.props.dispatch({
      type:'alipayGroup/queryHotList',
      payload:{
        pageNo: pageNo,
        pageSize: 20,
        cid:0,
        type:1
      },
    });
  }
  turnToGoodsDetail = (goodsId) => {
    this.props.dispatch(routerRedux.push({pathname: `/detail/${goodsId}/1`}));
  }

  componentDidMount(){
    if(CommonUtil.isAlipay()){
      this.queryGoodsList(1);
    }else{
      alert('请使用支付宝扫码领取');

    }
    // this.queryGoodsList(1);

  }

    onPress =()=>{
      this.props.dispatch({
        type: 'alipayGroup/onPress',
        payload: {
          channelId:this.props.alipayGroup.channelId
        },
      });

    }

    jionGroup =() =>{
      this.props.dispatch({
        type: 'alipayGroup/queryNew',
        payload: {
          channelId:this.props.alipayGroup.channelId
        },
      });

    }
  render(){
    const userIco = window.localStorage.getItem('userIco');
    const userName =window.localStorage.getItem('userName');
    return (
      <div style={{width:'100%',height:'100%'}}>
      <div style={{
        backgroundImage: "url('"+alipay+"')",
        // backgroundImage:"url(https://yuezijie.oss-cn-beijing.aliyuncs.com/image/rebateNewer1.png?x-oss-process=style/w750)",
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height:'100%',
      }}>
        <div style={{textAlign:'center'}}>
          <img src={agree} style={{width:'50%',marginTop:'90%'}} onClick={this.jionGroup}/>
        </div>

      </div>
        <div style={{textAlign:'center',marginTop:'-2.5rem'}}>
         <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.6rem',color:'#fed269'}}>淘宝今日必抢</span>
        </div>
        <div style={{
          width:'100%',
          height:'auto',
          backgroundImage:"url('"+alipayBac+"')",
          backgroundSize: '100% 100%',
          backgroundRepeat: 'repeat',
        }}>

        <div style={{
          width:'96%',
          marginLeft:'2%',
        }}>
        <GoodsListView2 pageSize={pageSize}
                        pageNo={this.state.pageNo}
                        hasMore={this.props.alipayGroup.hasMore}
                        goodsList={this.props.alipayGroup.goodsList}
                        changePageNo={this.queryGoodsList}
                        turnToGoodsDetail={this.turnToGoodsDetail}
                        channel ={this.props.alipayGroup.channel}
                        catId  ={0}
        />
        </div>
        </div>

          {this.props.alipayGroup.flag ?
            <div >
              <div id={'zezao'} style={{backgroundColor: '#F5F4F9', zIndex: '991', position: 'fixed', opacity: '1', top: '0', height: '100%', width: '100%'}}>
                  <div style={{backgroundColor:'#FFFFFF',width:'100%',height:'53%',textAlign:'center'}}>
                    <div style={{paddingTop:'12%'}}> <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.75rem',color:'#1b1b1b',fontWeight:600}}>该二维码尚未开启</span></div>
                    <div style={{paddingTop:'5%',paddingLeft:'10%',paddingRight:'10%',paddingBottom:'5%'}}> <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.45rem',color:'#757575'}}>开启后,推荐顾客扫码领红包,你可得赏金,赏金将存入以下支付宝</span></div>
                    <div style={{paddingTop:'3%'}}> <img src={userIco} style={{width:'3rem',height:'3rem',borderRadius:'0.3rem'}}/></div>
                    <div style={{padding:'3%'}}> <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.5rem',color:'#757575'}}>{userName}</span></div>
                  </div>

                  <div style={{textAlign:'center',marginTop:'1rem'}}>
                    <button className={style.button1}
                            onClick={this.onPress}>
                      立即开启</button>
                  </div>
                <div style={{padding:'2%',textAlign:'center'}}> <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.4rem',color:'#757575'}}>若你是顾客，请告知商家扫码开启活动</span></div>

              </div>
            </div>:null
          }
      </div>
    );
  };
}
export default connect(({alipayGroup}) => {
  alipayGroup
  return {alipayGroup}
})(AliPayNew);


import React from 'react';
import {ListView} from 'antd-mobile';
import {Flex} from 'antd-mobile';
import couponAfter from "../../../../src/assets/couponAfter.png";
import imgTmallLog from "../../../../src/assets/tmalllogo.png";
import imgTaobaoLog from "../../../../src/assets/taobaologo.png";
import imgJD from "../../../../src/assets/jd_square.png";
import imgPdd from "../../../../src/assets/pdd_square.png";
import imgBaoyou from "../../../../src/assets/baoyou.png";
import imgCouponbackimg from "../../../assets/couponback.png";
import imgCoupon from "../../../assets/quan2.png";
import imgCouponbackimg2 from "../../../assets/couponAfter2.png";
import imgFanimg from "../../../assets/fan.png";
import imgDao from "../../../../src/assets/daoshou.png";


class HotListResultItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  turnToGoodsDetail = (from, goodsId) => {
    if (goodsId !== null) {
      this.props.turnToGoodsDetail(from, goodsId);
    }
  }


  render() {

    const item= this.props.dataCoupon;

    let hasPlat = true;
    let platLogo = null;
    switch (item.from) {
      case 'taobao':
        platLogo = imgTaobaoLog;
        break;
      case 'tmall':
        platLogo = imgTmallLog;
        break;
      case 'jd':
        platLogo = imgJD;
        break;
      case 'pdd':
        platLogo = imgPdd;
        break;
      default:
        hasPlat = false;
    }


    let salesCount = item.salesNum > 10000 ? (item.salesNum / 10000).toFixed(1) + '万' : item.salesNum;
    let commissions = (item.commission*0.33).toFixed(2);
    let   daoshou ='';
    if(item.couponPrice === null){
      daoshou = (parseFloat(item.orgPrice)  - parseFloat(commissions)).toFixed(2);
    }else{
      daoshou = (parseFloat(item.orgPrice) - parseFloat(item.couponPrice) - parseFloat(commissions)).toFixed(2);
    }


    return (
      <div style={{borderRadius:'0.2rem'}}>
        <Flex align='start' style={{marginTop: '0.1rem'}} onClick={() => this.turnToGoodsDetail(item.from, item.goodsId)}>
          <Flex.Item style={{margin: '0.2rem 0 0 0.3rem',borderRadius:'0.2rem'}}>
            <img src={item.picUrl} style={{width: '3.6rem', height: '3.6rem', borderRadius: '0.2rem'}}/>
          </Flex.Item>

          <Flex.Item style={{margin: '0.36rem 0.3rem 0 -0.75rem', padding: 0}}>
            <div style={{height: '0.9rem', overflow: 'hidden'}}>
              <span style={{lineHeight: '0.4rem',fontFamily:'Microsoft YaHei',fontSize:'0.35rem',color:'#5e5e5e'}}>{ item.title}</span>
            </div>
            <Flex align='start' style={{marginTop: '0.15rem', color: 'rgb(173,173,173)', width: '100%'}}>
              <Flex.Item >
            <div style={{height:'0.5rem'}}>
              {
                this.props.catId ===0 ?<span style={{fontFamily:'Microsoft YaHei',fontSize:'0.35rem',color:'#808080'}}> 近两小时疯抢<span style={{fontFamily:'Microsoft YaHei',fontSize:'0.35rem',color:'#ff1505'}}> {item.salesNum2} </span>件</span> :
                  <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.35rem',}}> 今日疯抢<span style={{fontFamily:'Microsoft YaHei',fontSize:'0.35rem',color:'#ff1505'}}> {item.todayNum} </span>件</span>
              }
            </div>
              </Flex.Item>
            </Flex>

            <Flex align='start' style={{marginTop: '0.15rem', color: 'rgb(173,173,173)', width: '100%'}}>
              <Flex.Item >
                { item.from =='taobao'?  <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.35rem',color:'#a8a8a8'}}>淘宝价 :{item.orgPrice}元</span>:
                  item.from =='tmall'?<span style={{fontFamily:'Microsoft YaHei',fontSize:'0.35rem',color:'#a8a8a8'}}>天猫价 :{item.orgPrice}元</span> :null
                }

                {item.hasCoupon ?
                <div style={{
                  backgroundImage: "url('"+imgCoupon+"')",
                  backgroundSize: '1.5rem 0.5rem',
                  backgroundRepeat: 'no-repeat',
                  width: '1.5rem',
                  height: '0.5rem',
                  textAlign: 'center',
                  color: '#ffffff',
                  float: 'right',
                  fontSize: '0.25rem',

                }}><span style={{fontSize: '0.3rem',lineHeight:'0.5rem',fontFamily:'Microsoft YaHei',}}>{item.couponPrice}元券</span></div> : null}
              </Flex.Item>
            </Flex>

            <Flex align='start' style={{marginTop: '0.15rem', width: '100%'}}>
              <Flex.Item style={{marginTop:'0.1rem'}}>
                  <div style={{height:'0.5rem',textAlign:'center', display:'inline-block'}}>
                    <span style={{lineHeight:'0.5rem',fontFamily:'Microsoft YaHei',fontSize:'0.35rem',color:'#ff1505'}}>到手价 :{daoshou}元</span>
                  </div>
                <div style={{
                  backgroundImage: "url('"+imgFanimg+"')",
                  backgroundSize: '1.5rem 0.5rem',
                  backgroundRepeat: 'no-repeat',
                  width: '1.5rem',
                  height: '0.5rem',
                  textAlign: 'center',
                  float: 'right',
                  display:'inline-block'

                }}><span style={{fontSize: '0.3rem',lineHeight:'0.5rem',fontFamily:'Microsoft YaHei',color:'#ff1505'}}>返{commissions}</span></div>
              </Flex.Item>

              {/*<Flex.Item style={{paddingTop:'0.1rem'}}>*/}

              {/*</Flex.Item>*/}
            </Flex>


          </Flex.Item>

        </Flex>
      </div>
    );
  }
}

export default HotListResultItem;

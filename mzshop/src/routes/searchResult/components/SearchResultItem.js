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


class SearchResultItem extends React.Component {
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

    const {
      style,
      className = '',
      active,
      title,
      picUrl,
      price,
      orgPrice,
      salesNum,
      from,
      hasCoupon,
      couponPrice,
      goodsId,
      clickUrl,
      couponUrl,
      shopTitle,
      provcity,
      commission
    } = this.props.dataCoupon;

    let hasPlat = true;
    let platLogo = null;
    switch (from) {
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


    let salesCount = salesNum > 10000 ? (salesNum / 10000).toFixed(1) + '万' : salesNum;
    let commissions = (commission*0.33).toFixed(2);
    let   daoshou ='';
    if(couponPrice === null){
      daoshou = (parseFloat(orgPrice)  - parseFloat(commissions)).toFixed(2);
    }else{
      daoshou = (parseFloat(orgPrice) - parseFloat(couponPrice) - parseFloat(commissions)).toFixed(2);
    }


    return (
      <div>
        <Flex align='start' style={{marginTop: '0.1rem'}} onClick={() => this.turnToGoodsDetail(from, goodsId)}>
          <Flex.Item style={{margin: '0.2rem 0 0 0.3rem'}}>
            <img src={picUrl} style={{width: '3.6rem', height: '3.6rem', borderRadius: '0.2rem'}}/>
          </Flex.Item>

          <Flex.Item style={{margin: '0.36rem 0.3rem 0 -0.75rem', padding: 0}}>
            <div style={{height: '0.9rem', overflow: 'hidden'}}>
              <img src={platLogo} style={{width: '0.4rem', height: '0.4rem'}}/>
              <img src={imgBaoyou} style={{width: '0.8rem', height: '0.4rem', marginLeft: '0.2rem'}}/>
              <span style={{lineHeight: '0.45rem',fontSize: '0.4rem',fontFamily:'Microsoft YaHei',color:'#737373'}}>{title}</span>
            </div>

            {/*<div style={{marginTop: '0.18rem', verticalAlign: 'bottom'}}>*/}
              {/*<img src={platLogo} style={{width: '0.4rem', height: '0.4rem'}}/>*/}
              {/*<img src={imgBaoyou} style={{width: '0.8rem', height: '0.4rem', marginLeft: '0.2rem'}}/>*/}
            {/*</div>*/}

            <Flex align='start' style={{marginTop: '0.15rem', color: 'rgb(173,173,173)', width: '100%'}}>
              <Flex.Item >
                <span style={{lineHeight: '0.45rem',fontSize: '0.35rem',fontFamily:'Microsoft YaHei',color:'#737373'}}>原价:{orgPrice}</span>
              <div style={{
                backgroundImage: "url('"+imgFanimg+"')",
                backgroundSize: '1.4rem 0.5rem',
                backgroundRepeat: 'no-repeat',
                width: '1.4rem',
                height: '0.5rem',
                textAlign: 'center',
                color: '#d50f01',
                float: 'right',
                marginLeft:'0.2rem'
              }}><span style={{lineHeight: '0.5rem',fontSize: '0.3rem',fontFamily:'Microsoft YaHei'}}>返{commissions}</span></div>
                {hasCoupon ?
                <div style={{
                  backgroundImage: "url('"+imgCoupon+"')",
                  backgroundSize: '1.5rem 0.5rem',
                  backgroundRepeat: 'no-repeat',
                  width: '1.5rem',
                  height: '0.5rem',
                  textAlign: 'center',
                  color: '#ffffff',
                  float: 'right',

                }}><span style={{lineHeight:'0.5rem',fontSize: '0.3rem',fontFamily:'Microsoft YaHei',}}>{couponPrice}元券</span></div> : null}
              </Flex.Item>
            </Flex>

            <Flex align='start' style={{marginTop: '0.15rem', width: '100%'}}>
              <Flex.Item style={{marginRight:'-1rem',marginTop:'0.1rem'}}>

                  <div style={{height:'0.5rem',textAlign:'center'}}>
                    <img src={imgDao} style={{marginLeft:'-0.3rem',width: '1rem', height: 'auto', display: 'inline-block'}}/>
                    <span style={{marginLeft: '0.1rem',lineHeight:'0.5rem', color: 'rgb(254,62,47)',fontSize: '0.4rem',fontFamily:'Microsoft YaHei',}}>¥{daoshou}</span>
                  </div>
              </Flex.Item>

              <Flex.Item >
                <span style={{float: 'right',marginTop:'0.15rem',color: 'rgb(173,173,173)',fontFamily:'Microsoft YaHei',fontSize: '0.35rem',}}>月销：{salesCount}件</span>
              </Flex.Item>
            </Flex>

            <Flex align='start' style={{marginTop: '0.15rem', color: 'rgb(173,173,173)', width: '100%'}}>
              <Flex.Item >
                <div style={{width:'3rem',overflow:'hidden'}}>
                  <span style={{lineHeight:'0.5rem',fontSize: '0.3rem',fontFamily:'Microsoft YaHei',}}>{shopTitle}</span>
                </div>
              </Flex.Item>
              <Flex.Item >
                <span style={{float: 'right',lineHeight:'0.5rem',fontSize: '0.3rem',fontFamily:'Microsoft YaHei',}}>{provcity}</span>
              </Flex.Item>
            </Flex>

          </Flex.Item>

        </Flex>
      </div>
    );
  }
}

export default SearchResultItem;

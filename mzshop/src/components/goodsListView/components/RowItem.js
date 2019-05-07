/**
 * Created by Administrator on 2018/9/20 0020.
 */
import React from 'react';
import {Flex} from 'antd-mobile';
import styles from './RowItem.css';
import imgTmallLog from "../../../assets/tmalllogo.png";
import imgTaobaoLog from "../../../assets/taobaologo.png";
import imgJD from "../../../assets/jd_square.png";
import imgPdd from "../../../assets/pdd_square.png";
import imgBaoyou from "../../../assets/baoyou.png";
import imgCoupon from "../../../assets/quan2.png";
import imgFanimg from "../../../assets/fan.png";
import imgDao from "../../../../src/assets/daoshou.png";

class RowItem extends React.Component {
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
    let leftItem = this.props.leftItem;
    let rightItem = this.props.rightItem;
    let daoshouPrice1 =0;
    let daoshouPrice2 =0;
    let commissions1 = 0;
    let commissions2 = 0;
    let leftCouponPrice = 0;
    let rightCouponPrice = 0;
    let leftCount =0;
    let rightCount =0;
    let hasCouponAtLeast = false;

    let taoCashLeft = false;
    let platLogoLeft = null;
    if(leftItem!==null){
      switch (leftItem.from) {
        case 'taobao':
          platLogoLeft = imgTaobaoLog;
          taoCashLeft = true;
          break;
        case 'tmall':
          platLogoLeft = imgTmallLog;
          taoCashLeft = true;
          break;
        case 'jd':
          platLogoLeft = imgJD;
          break;
        case 'pdd':
          platLogoLeft = imgPdd;
          break;
      }
      hasCouponAtLeast = hasCouponAtLeast||leftItem.hasCoupon;
      commissions1 = (leftItem.commission*0.33).toFixed(2);

      if(leftItem.couponPrice){
        if(leftItem.orgPrice === null){
          daoshouPrice1 = (parseFloat(leftItem.price) - parseFloat(leftItem.couponPrice) - commissions1).toFixed(2);
        }else {
          daoshouPrice1 = (parseFloat(leftItem.orgPrice) - parseFloat(leftItem.couponPrice) - commissions1).toFixed(2);

        }
      }else{
        if(leftItem.orgPrice === null){
          daoshouPrice1 = (parseFloat(leftItem.price)  - commissions1).toFixed(2);
        }else{
          daoshouPrice1 = (parseFloat(leftItem.orgPrice)  - commissions1).toFixed(2);
        }
      }
      leftCouponPrice = parseInt(leftItem.couponPrice);
      leftCount = leftItem.salesNum > 10000 ? (leftItem.salesNum / 10000).toFixed(1) + '万' : leftItem.salesNum;

    }


    let platLogoRight = null;
    let taoCashRight = false;
    if(rightItem!==null) {
      switch (rightItem.from) {
        case 'taobao':
          platLogoRight = imgTaobaoLog;
          taoCashRight = true;
          break;
        case 'tmall':
          platLogoRight = imgTmallLog;
          taoCashRight = true;
          break;
        case 'jd':
          platLogoRight = imgJD;
          break;
        case 'pdd':
          platLogoRight = imgPdd;
          break;
      }
      hasCouponAtLeast = hasCouponAtLeast||rightItem.hasCoupon;
      commissions2 = (rightItem.commission*0.33).toFixed(2);
      if(rightItem.couponPrice){
        if(rightItem.orgPrice === null){
          daoshouPrice2 = (parseFloat(rightItem.price) - parseFloat(rightItem.couponPrice) - commissions2).toFixed(2);
        }else {
          daoshouPrice2 = (parseFloat(rightItem.orgPrice) - parseFloat(rightItem.couponPrice) - commissions2).toFixed(2);
        }
      }else{
        if(rightItem.orgPrice === null){
          daoshouPrice2 = (parseFloat(rightItem.price)  - commissions2).toFixed(2);
        }else {
          daoshouPrice2 = (parseFloat(rightItem.orgPrice) - commissions2).toFixed(2);
        }
      }

      rightCouponPrice = parseInt(rightItem.couponPrice);
      rightCount = rightItem.salesNum > 10000 ? (rightItem.salesNum / 10000).toFixed(1) + '万' : rightItem.salesNum;
    }


    return (
      <div>
        <Flex style={{backgroundColor: '#eeeeee'}}>
          <Flex.Item style={{marginTop: '0.2rem'}}>
            <div className={styles.divTop} onClick={() => {
              this.turnToGoodsDetail(leftItem.from, leftItem.goodsId)
            }}>
              <div className={styles.commodityContainer}>
                <img className={styles.commodityCardImg} src={leftItem.picUrl}/>
              </div>

              <div className={styles.commodityCardMsg}>
                <div className={styles.commodityCardTitleTmall}>
                  <img className={styles.commodityCardTitleFreePostage}
                       src={platLogoLeft}/>
                  <img className={styles.commodityCardTitleFreePostage} src={imgBaoyou}/>
                  <span style={{lineHeight: '0.4rem',fontFamily:'Microsoft YaHei',fontSize:'0.3rem',color:'#8f8f8f'}}>{leftItem.title}</span>
                </div>

                {/*<div className={styles.commodityCardKeywordV}>
                  {(leftItem.hasCoupon && leftItem.couponNum < 10000) ?
                    <span className={styles.commodityCardKeyword}>即将抢完</span> : null}
                  {(leftItem.couponPrice >= 10 && leftItem.couponPrice > leftItem.orgPrice / 3) ?
                    <span className={styles.commodityCardKeyword}>大额券</span> : null}
                  { taoCashLeft ?
                    <span className={styles.commodityCardKeyword}>淘礼金</span> : null}
                </div>*/}

                <Flex align='start' style={{marginTop: '0.1rem'}}>
                  <Flex.Item>
                    {
                      leftItem.orgPrice ?<span className={styles.commodityCardFootOriginPrice}>¥{leftItem.orgPrice}</span>
                        :
                        <span className={styles.commodityCardFootOriginPrice}>¥{leftItem.price}</span>
                    }

                  </Flex.Item>
                  {leftItem.hasCoupon ?
                  <Flex.Item>
                    {/*{hasCoupon ?*/}
                    <div style={{
                      backgroundImage: "url('"+imgCoupon+"')",
                      backgroundSize: '1.5rem 0.5rem',
                      backgroundRepeat: 'no-repeat',
                      width: '1.5rem',
                      height: '0.5rem',
                      textAlign: 'center',
                      color: '#ffffff',
                      float: 'right',
                      marginLeft:'0.5rem',
                      display:'block'
                    }}><span style={{lineHeight:'0.5rem',fontSize: '0.3rem',fontFamily:'Microsoft YaHei',}}>{leftCouponPrice}元券</span></div>

                  </Flex.Item>
                    : null}
                  <Flex.Item>
                    <div style={{
                      backgroundImage: "url('"+imgFanimg+"')",
                      backgroundSize: '1.5rem 0.5rem',
                      backgroundRepeat: 'no-repeat',
                      width: '1.5rem',
                      height: '0.5rem',
                      textAlign: 'center',
                      color: '#d50f01',
                      float: 'right',
                      display:'block'
                    }}><span style={{lineHeight:'0.5rem',fontSize: '0.3rem',fontFamily:'Microsoft YaHei',}}>返{commissions1}</span></div>
                  </Flex.Item>

                </Flex>

                  <div style={{height: '0.55rem'}}>
                    <Flex style={{marginTop: '0.1rem'}}>
                      <Flex.Item>
                        {/*<span className={styles.commodityCardFootPrice}>¥{leftItem.price}</span>*/}
                        <div style={{height:'0.5rem'}}>
                          <img src={imgDao} style={{width: '1rem', height: 'auto', display: 'inline-block',float:'left'}}/>
                          <span style={{marginLeft: '0.1rem',lineHeight:'0.5rem', color: 'rgb(254,62,47)',fontFamily:'Microsoft YaHei',fontSize: '0.4rem',}}>¥{daoshouPrice1}</span>

                          <span className={styles.commodityCardSalesNum}>已售{leftCount}件</span>
                        </div>
                      </Flex.Item>
                    </Flex>
                  </div>

              </div>
            </div>
          </Flex.Item>
          <Flex.Item style={{marginTop: '0.2rem'}}>
            {rightItem === null ? null :
              <div className={styles.divTop} onClick={() => {
                this.turnToGoodsDetail(rightItem.from, rightItem.goodsId)
              }}>
                <div className={styles.commodityContainer}>
                  <img className={styles.commodityCardImg} src={rightItem.picUrl}/>
                </div>

                <div className={styles.commodityCardMsg}>
                  <div className={styles.commodityCardTitleTmall}>
                    <img className={styles.commodityCardTitleFreePostage}
                         src={platLogoRight}/>
                    <img className={styles.commodityCardTitleFreePostage} src={imgBaoyou}/>
                    <span style={{lineHeight: '0.4rem',fontFamily:'Microsoft YaHei',fontSize:'0.3rem',color:'#8f8f8f'}}>{rightItem.title}</span>
                  </div>

                 {/* <div className={styles.commodityCardKeywordV}>
                    {(rightItem.hasCoupon && rightItem.couponNum < 10000) ?
                      <span className={styles.commodityCardKeyword}>即将抢完</span> : null}
                    {(rightItem.couponPrice >= 10 && rightItem.couponPrice > rightItem.orgPrice / 3) ?
                      <span className={styles.commodityCardKeyword}>大额券</span> : null}
                    { taoCashRight ?
                      <span className={styles.commodityCardKeyword}>淘礼金</span> : null}
                  </div>*/}
                  <Flex style={{marginTop: '0.1rem'}}>
                    <Flex.Item>
                      {
                        rightItem.orgPrice ?<span className={styles.commodityCardFootOriginPrice}>¥{rightItem.orgPrice}</span>
                          :
                          <span className={styles.commodityCardFootOriginPrice}>¥{rightItem.price}</span>
                      }
                    </Flex.Item>
                    {rightItem.hasCoupon ?
                      <Flex.Item>
                        {/*{hasCoupon ?*/}
                        <div style={{
                          backgroundImage: "url('"+imgCoupon+"')",
                          backgroundSize: '1.5rem 0.5rem',
                          backgroundRepeat: 'no-repeat',
                          width: '1.5rem',
                          height: '0.5rem',
                          textAlign: 'center',
                          color: '#ffffff',
                          float: 'right',
                          marginLeft:'0.5rem',
                          display:'block'
                        }}><span style={{lineHeight:'0.5rem',fontSize: '0.3rem',fontFamily:'Microsoft YaHei',}}>{rightCouponPrice}元券</span></div>

                      </Flex.Item>
                      : null}
                    <Flex.Item>
                      <div style={{
                        backgroundImage: "url('"+imgFanimg+"')",
                        backgroundSize: '1.5rem 0.5rem',
                        backgroundRepeat: 'no-repeat',
                        width: '1.5rem',
                        height: '0.5rem',
                        textAlign: 'center',
                        color: '#d50f01',
                        float: 'right',
                        display:'block'
                      }}><span style={{lineHeight:'0.5rem',fontSize: '0.3rem',fontFamily:'Microsoft YaHei',}}>返{commissions2}</span></div>
                    </Flex.Item>
                  </Flex>

                    <div style={{height: '0.55rem'}}>
                      <Flex style={{marginTop: '0.1rem'}}>
                        <Flex.Item>
                          <div style={{height:'0.5rem',width:'100%'}}>
                            <img src={imgDao} style={{width: '1rem', height: 'auto', display: 'inline-block',float:'left'}}/>
                            <span style={{marginLeft: '0.1rem',lineHeight:'0.5rem', color: 'rgb(254,62,47)',fontFamily:'Microsoft YaHei',fontSize: '0.4rem',}}>¥{daoshouPrice2}</span>
                            <span className={styles.commodityCardSalesNum}>已售{rightCount}件</span>
                          </div>
                        </Flex.Item>
                      </Flex>
                    </div>
                </div>
              </div>
            }
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default RowItem;

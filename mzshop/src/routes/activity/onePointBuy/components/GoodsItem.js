import React from 'react';
import {connect} from "dva";
import {Flex,Button} from 'antd-mobile';
import imgCouponbackimg from "../../../../../src/assets/couponback.png";


class GoodsItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  render() {
    let {
      title,
      picUrl,
      hasCoupon,
      goodsId,
      price,
      couponUrl,
      clickUrl,
      orgPrice,
      couponPrice,
    } = this.props.item;
    let backPrice = null;
    if (price){
      backPrice = 5;
    }
    if (couponUrl === null  || couponUrl.length===0){
      couponUrl = clickUrl;
    }

    return (
      <div style={{backgroundColor: 'rgb(245,54,100)', paddingLeft: '0.2rem', paddingRight: '0.2rem', paddingTop: '0.1rem',paddingBottom:'0.1rem',marginTop:'-0.1rem'}}>
        <div style={{backgroundColor: '#ffffff', borderRadius: '0.2rem', paddingBottom: '0.2rem',}}>
          <Flex align='start' style={{marginTop: '0.1rem'}}>
            <Flex.Item style={{margin: '0.2rem 0 0 0.3rem'}}>
              <img src={picUrl} style={{width: '3.6rem', height: '3.6rem', borderRadius: '0.2rem'}}/>
            </Flex.Item>

            <Flex.Item style={{margin: '0.36rem 0.3rem 0 -0.75rem', padding: 0}}>
              <div style={{height: '0.93rem', overflow: 'hidden'}}>
                <div style={{
                  border: '1px solid #f00',
                  borderRadius: '0.1rem',
                  // fontSize: '0.35rem',
                  margin: '0 auto',
                  color: '#f00',
                  display: 'inline-block',
                  fontFamily:'Microsoft YaHei',
                  textAlign:'center'
                }}>京东拼购
                </div>
                <span style={{lineHeight:'0.48rem',fontFamily:'Microsoft YaHei'}}>{title}</span>
              </div>

              <Flex align='start' style={{
                fontSize: '0.4rem',
                marginTop: '0.25rem',
                color: 'rgb(255,25,25)',
                width: '100%',
                fontWeight: 'bold'
              }}>
                <Flex.Item>
                  <span>券后价¥{price}</span>
                </Flex.Item>
                <Flex.Item>
                  <span style={{float: 'right'}}>奖¥{backPrice}</span>
                </Flex.Item>
              </Flex>

              <Flex align='start' style={{marginTop: '0.25rem', color: 'rgb(254,62,47)', width: '100%'}}>
                <Flex.Item>
                  <span
                    style={{fontSize: '0.3rem', lineHeight: '0.45rem', textAlign: 'center', color: 'rgb(160,160,160)'}}>拼购价¥{orgPrice}</span>
                </Flex.Item>
                {hasCoupon ?
                    <Flex.Item>
                      <div style={{
                        backgroundImage: "url('" + imgCouponbackimg + "')",
                        backgroundSize: '1.6rem 0.6rem',
                        backgroundRepeat: 'no-repeat',
                        width: '1.6rem',
                        height: '0.6rem',
                        textAlign: 'center',
                        paddingTop: '0.08rem',
                        color: '#ffffff',
                        float: 'right',
                        fontSize: '0.4rem',
                      }}>
                        <span style={{fontSize: '0.3rem'}}>{couponPrice}元劵</span>
                      </div>
                    </Flex.Item> : null}
              </Flex>

              <Flex align='start' style={{marginTop: '0.15rem', width: '100%'}}>
                <Flex.Item >
                  <Button onClick={() =>{this.props.showInform(goodsId,couponUrl,price)}}
                    style={{
                    backgroundColor: '#ff0000',
                    borderRadius: '0.35rem',
                    height: '0.7rem',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    color: '#fff',
                    fontSize: '0.35rem',
                    lineHeight: '0.7rem'
                  }}>领券购买</Button>
                </Flex.Item>
              </Flex>

            </Flex.Item>

          </Flex>
        </div>
      </div>
    );
  }
}

export default connect(({onePointBuy}) => {
  onePointBuy
  return {onePointBuy}
})(GoodsItem);

import React from 'react';
import {connect} from "dva";
import {Flex,Button} from 'antd-mobile';
import imgTmallLog from "../../../../../src/assets/tmalllogo.png";
import imgTaobaoLog from "../../../../../src/assets/taobaologo.png";
import imgJDLog from "../../../../../src/assets/jd_circle.png";
import imgPddLog from "../../../../../src/assets/pdd_circle.png";
import couponAfter from "../../../../../src/assets/couponAfter.png";
import imgCouponbackimg from "../../../../../src/assets/couponback.png";
import CopyToClipboard from 'react-copy-to-clipboard';


class TaoCashItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    let {
      title,
      picUrl,
      detailId,
      status,
    } = this.props.activityDetail;

    if (status === 'finish'){
      this.queryTaoCashUrl(detailId,title,picUrl);
    }

  }


  queryTaoCashUrl = (detailId,title,picUrl) => {
    this.props.dispatch({
      type: 'taoCash/queryTaoCashUrl',
      payload: {detailId: detailId, title: title, picUrl: picUrl}
    });

  }


  turnToActivityDetail = (detailId,type,goodsInfo,tbPwd) => {
    if (detailId !== null) {
      this.props.turnToActivityDetail(detailId,type,goodsInfo,tbPwd);
    }
  }


  render() {
    let {
      title,
      picUrl,
      shopTitle,
      shopDsr,
      salesNum,
      salesNumStr,
      hasCoupon,
      goodsId,
      from,
      couponNum,
      price,
      orgPrice,
      couponPrice,
      provcity
    } = this.props.activityDetail;
    // assistCount = assistCount === null ? 0 : assistCount;

     let platLogo = null;

    let info = "";
    let statusInfo = "";

    let plat = this.props.activityDetail.from;
    if(plat=='taobao'){
      platLogo = imgTaobaoLog;
    }else if(plat =='tmall'){
      platLogo = imgTmallLog;
    }else if(plat =='jd'){
      platLogo = imgJDLog;
    }else if(plat=='pdd'){
      platLogo = imgPddLog;
    }else{

    }


    return (
      <div  >
        <Flex align='start' style={{marginTop: '0.1rem'}} >
          <Flex.Item style={{margin: '0.2rem 0 0 0.3rem'}}>
            <img src={picUrl} style={{width: '3.6rem', height: '3.6rem', borderRadius: '0.2rem'}}/>
          </Flex.Item>

          <Flex.Item style={{margin: '0.36rem 0.3rem 0 -0.75rem', padding: 0}}>
            <div style={{height: '0.96rem', overflow: 'hidden'}}>
              <img src={platLogo} style={{width: '0.4rem', height: '0.4rem'}}/>
              <span style={{lineHeight: '0.48rem'}}>{title}</span>
            </div>

            <Flex align='start' style={{marginTop: '0.15rem', color: 'rgb(173,173,173)', width: '100%'}}>
              <Flex.Item>
              <span>原价 : {orgPrice}</span>
              </Flex.Item>
              <Flex.Item>
                <span  style={{float: 'right'}}>月销:{salesNum}件</span>
                {/*<div style={{float: 'right',color: 'rgb(20,30,20)'}}>月销:{salesNum}</div>*/}
              </Flex.Item>
            </Flex>

            <Flex align='start' style={{marginTop: '0.25rem', color: 'rgb(254,62,47)', width: '100%'}}>
              <Flex.Item>
                <div>
                <img src={couponAfter} style={{marginTop:'0.12rem',width: 'auto', height: '0.45rem',display: 'inline-block'}}/>
                <span style={{fontSize:'0.4rem',lineHeight:'0.45rem',textAlign:'center'}}>￥{price}</span>
                  <div style={{
                    backgroundImage: "url('"+imgCouponbackimg+"')",
                    backgroundSize: '1.6rem 0.7rem',
                    backgroundRepeat: 'no-repeat',
                    width: '1.6rem',
                    height: '0.7rem',
                    textAlign: 'center',
                    paddingTop: '0.08rem',
                    color: '#ffffff',
                    float: 'right',
                    fontSize: '0.4rem',
                  }}> <span style={{fontSize:'0.3rem'}}>{couponPrice}元劵</span></div>
                </div>
              </Flex.Item>
            </Flex>

            <Flex align='start' style={{marginTop: '0.15rem', color: 'rgb(173,173,173)', width: '100%'}}>
              <Flex.Item >
                <div style={{width:'3rem',overflow:'hidden'}}>
                  <span>{shopTitle}</span>
                </div>
              </Flex.Item>
              <Flex.Item >
                <span style={{float: 'right'}}>{provcity}</span>
              </Flex.Item>
            </Flex>

          </Flex.Item>

        </Flex>
      </div>
    );
  }
}

// export default TaoCashItem;
export default connect(({taoCash}) => {
  taoCash
  return {taoCash}
})(TaoCashItem);

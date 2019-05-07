import React from 'react';
import {connect} from "dva";
import {ListView} from 'antd-mobile';
import {Flex, WhiteSpace, NavBar, Button, Icon,Toast} from 'antd-mobile';
import BackToTop from '../../coupon/components/BackToTop.js'
import {routerRedux} from "dva/router";
import GoodsItem from "./components/GoodsItem";
import Inform from "./components/Inform";
import Rule from "./components/Rule";
import back from "../../../../src/assets/one/back.png";
import weChat from "../../../../src/assets/WeChatWorkNum.jpg";
import activityTimeImg from "../../../../src/assets/one/activityTime.png";
import * as wechatApi from "../../../wechatApi";

let pageIndex = 0;

function genData(pIndex = 0, numRows = 20) {
  const dataBlob = {};
  for (let i = 0; i < numRows; i++) {
    const ii = (pIndex * numRows) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

class OnePointBuy extends React.Component {

  commonData = {
    price: null,
    shareInit:false,
  }

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      pageNo: 1,
      loadingInfo: '',
      isLoading: false,
      informVisible: false,
    };
  }

  backPrevious = () => {
    document.referrer === '' ? this.props.dispatch(routerRedux.push("/")) : this.props.dispatch(routerRedux.goBack())
  }


  clearGoodsList = () => {
    this.props.dispatch({
      type: 'onePointBuy/clearGoodsList',
    });
  }

  queryGoodsList = (pageNo) => {
    let now = new Date();
    let endDate = new Date('2018/12/31 23:59:59');

    if (now>endDate){
      return;
    }

    this.props.dispatch({
      type: 'onePointBuy/queryGoodsList',
      payload: {
        pageNo: pageNo
      },
    });

    this.setState({pageNo: pageNo});
  }

  showInform = (goodsId, couponUrl, price) => {
    if (!this.commonData.shareInit){
      this.commonData.shareInit = true;
      // let param = {
      //   title: '一分钱购物活动火热进行中！！',
      //   link: window._global.url.host +"api/redirect?redirectUrl=" + '/#/onepointbuy',
      //   imgUrl: 'https://yuezijie.oss-cn-beijing.aliyuncs.com/image/1544496584022.png?x-oss-process=style/w750',
      //   desc: '赶快来参加吧!',
      //   success: function () {
      //     Toast.info('分享成功！')
      //   }
      // };
      // wechatApi.share(param);
    }


    this.props.dispatch({
      type: 'onePointBuy/genJdGoodsPromUrl',
      payload: {
        goodsId: goodsId,
        couponUrl: couponUrl,
      },
    });

    this.commonData.price = price;
    this.setState({informVisible: true});
  }

  closeInform = () => {
    this.setState({informVisible: false});
  }

  toCouponUrl = () => {
    this.setState({informVisible: false});
    window.location.href = this.props.onePointBuy.couponUrl;
  }

  componentDidMount() {
    this.queryGoodsList(1);
    setTimeout(function () {
      let param = {
        title: '京东全民拼购节，每单补贴5元，年底狂欢GO！',
        link: window._global.url.host + "/api/redirect?redirectUrl="+ '/onepointbuy',
        imgUrl: 'https://yuezijie.oss-cn-beijing.aliyuncs.com/image/1544496584022.png?x-oss-process=style/w750',
        desc: '赶快来参加吧!',
        success: function () {
          Toast.info('分享成功')
        }
      };
      wechatApi.share(param);
    },3000);

  }

  //组件销毁
  componentWillUnmount() {
    this.clearGoodsList();
  }

  componentWillReceiveProps(nextProps) {
    console.log("pppp");
    if (nextProps.onePointBuy.goodsList !== this.props.onePointBuy.goodsList) {
      if (nextProps.onePointBuy.goodsList === null || nextProps.onePointBuy.goodsList.length === 0) {
        this.rData = [];
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          isLoading: false,
          loadingInfo: '无数据',
        });
      } else {
        if (this.state.pageNo === 1) {
          pageIndex = 0;
          this.rData = genData(pageIndex);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
            loadingInfo: '',
          });
        } else {
          this.rData = {...this.rData, ...genData(++pageIndex)};
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
            loadingInfo: '',
          });
        }
      }
    }
  }

  onEndReached = (event) => {
    if (this.state.isLoading) {
      return;
    }

    if (this.props.onePointBuy.hasMore) {
      this.setState({isLoading: true});
      this.queryGoodsList(this.state.pageNo + 1);
      this.setState({loadingInfo: '加载中...'});
    }
    else {
      this.setState({loadingInfo: ''});
      this.setState({isLoading: false});
    }
  }

  render() {
    let index = 0;
    const row = (rowData, sectionID, rowID) => {
      if (this.props.onePointBuy.goodsList === null || index >= this.props.onePointBuy.goodsList.length) {
        return null;
      }
      const item = this.props.onePointBuy.goodsList[index++];
      return (
          <GoodsItem item={item} showInform={this.showInform}/>
      );
    };

    let width = document.documentElement.clientWidth;
    let height = width * 1206 / 750.0;

    let timeWidth = width * 580 / 750.0;
    let timeHeight = -200;

    let countdownTop = height * (475) / 1206.0;
    let countdown = null;
    let now = new Date();
    let startDate = new Date('2018/12/10 00:00:00');
    let endDate = new Date('2018/12/31 23:59:59');

    if (now>endDate){
      countdown = '活动已经结束';
    }else  if (now<startDate){
      countdown = '活动尚未开始';
    }else {
      if (now > new Date('2018/12/31 14:00:00')){
        countdown = '最后' + (24 - now.getHours()) + '小时';
      }else{
          if(now.getDate()>28){
            countdown = '最后'+ (32-now.getDate())+ '天';
          }else{
            countdown = '活动火热进行中';
          }
      }
    }

    return (
      <div style={{backgroundColor: 'rgb(233,48,60)', width: '100%'}}>

        <div style={styles.fixedTop}>
          {/*<NavBar leftContent={<span style={styles.back}> </span>}*/}
                  {/*rightContent={<Rule/>}*/}
                  {/*icon={<Icon type="left" style={styles.back_icon}/>}*/}
                  {/*style={styles.navbar}*/}
                  {/*onLeftClick={this.backPrevious}>*/}
            {/*<span style={styles.navTitle}>全民大拼购</span> </NavBar>*/}
          <Rule/>
        </div>

        <div style={{
          backgroundImage: "url('" + back + "')",
          backgroundSize: '100%,auto',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: 'auto',
          backgroundColor: 'rgb(233,48,60)',
        }}>

          <br style={{height: '0'}}/>

          <div style={{
            marginTop: countdownTop,
            fontSize: '0.7rem',
            fontWeight: 'bold',
            color: 'rgb(251,243,128)',
            textAlign: 'center'
          }}>
            <span >{countdown}</span>
          </div>

         {/* <div style={{
            position: 'relative',
            left: timeWidth,
            top: timeHeight,
            backgroundImage: "url('" + activityTimeImg + "')",
            backgroundSize: '100%,auto',
            backgroundRepeat: 'no-repeat',
            width: '62px',
            height: '57px',
            fontSize: '0.3rem',
            color: '#fff',
            textAlign: 'center',
            paddingTop: '16px',
          }}>
            <span style={{lineHeight: '10px'}}>活动时间</span>
            <br/>
            <span style={{lineHeight: '10px'}}>12月12日</span>
          </div>
*/}

          <div style={{
            textAlign:'center',
            marginBottom:'0.3rem',
            paddingTop:'0.2rem',
            paddingLeft:'2rem',
            paddingRight:'2rem',
          }}>
            <div  >
            <a href="https://yuezijie.oss-cn-beijing.aliyuncs.com/image/1544496584022.png?x-oss-process=style/w750">
              <button style={{
                // margin: '0.15rem',
                // backgroundColor: 'rgb(146,8,229)',
                // borderRadius: '0.4rem',
                // height: '0.8rem',
                // textAlign: 'center',
                // verticalAlign: 'middle',
                // color: '#fff',
                // lineHeight: '0.8rem',
                fontSize:'0.35rem',
                color: '#ffffff',
                backgroundColor: '#944afd',
                border: '0.2rem solid #944afd',
                borderRadius: '0.5rem',
                width: '5rem',
                height:'1rem',
              }}
              >点击此处，分享给好友</button>
            </a>
            </div>
          </div>

          <div style={{
            paddingLeft: '0.2rem',
            paddingRight: '0.2rem',
            paddingTop: '0.2rem',
            marginBottom: '0.5rem',
          }}>
            <div style={{backgroundColor: '#ffffff', borderRadius: '0.2rem', paddingBottom: '0.2rem',}}>

              <div style={{
                backgroundColor: 'rgb(251,246,190)',
                borderRadius: '0.2rem',
                paddingBottom: '0.2rem',
                color: 'rgb(255,53,64)',
                fontWeight: 'bold',
                paddingLeft: '1rem',
                paddingTop: '0.2rem'
              }}>
                奖励提现流程
              </div>

              <div style={{width: '100%', height: '2.5rem'}}>
                <div style={{float: 'left', width: '68%', paddingTop: '0.5rem'}}>
                  <div style={styles.no_text}>
                    <div style={styles.no}>1</div>
                    关注微信公众号"花得值"
                  </div>
                  <div style={styles.no_text}>
                    <div style={styles.no}>2</div>
                    点击底栏的"京东拼购"查看奖励
                  </div>
                </div>

                <div style={styles.weChat}>
                  <img style={styles.weChat_img} src={weChat}/>
                  <br/>
                  <span style={{fontSize:'0.2rem',fontFamily:'Microsoft YaHei'}}>长按识别关注公众号</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{backgroundColor:'#094bff'}}>
            <ListView
              dataSource={this.state.dataSource}
              renderFooter={() => (<div style={{padding: 10, textAlign: 'center'}}>
                {this.state.loadingInfo}
              </div>)}
              renderRow={row}
              pageSize={10}
              useBodyScroll
              scrollRenderAheadDistance={1000}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={1000}

              style={{ backgroundColor: 'rgb(233,48,60)' }}
            />
          </div>

        </div>


        <Inform
          visible={this.state.informVisible}
          price={this.commonData.price}
          closeInform={this.closeInform}
          toCouponUrl={this.toCouponUrl}
        />
        <BackToTop/>
      </div>
    )
  }
}

export default connect(({onePointBuy}) => {
  onePointBuy
  return {onePointBuy}
})(OnePointBuy);


const styles = {

  fixedTop: {
    zIndex: 900,
    position: 'absolute',
    top: '0.4rem',
    right: 15,
    width: '2rem',
    height:'1rem',
    // backgroundColor: '#fdde4a',
  },


  navTitle: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: '0.45rem',
  },

  back: {
    color: '#333',
    fontSize: '0.36rem',
  },

  back_icon: {
    color: '#333',
  },

  navbar: {
    backgroundColor: '#fdde4a',
    marginop: '0.3rem',
    marginBottom: '-0.2rem',
  },

  banner: {
    width: '100%',
    marginTop: '1rem',
  },


  no: {
    display: 'inline-block',
    backgroundColor: '#ff5555',
    borderRadius: '0.25rem',
    width: '0.5rem',
    height: '0.5rem',
    textAlign: 'center',
    lineHeight: '0.5rem',
    color: '#fff',
    marginRight: '0.2rem',
    fontWeight: '500',
  },

  no_text: {
    marginLeft: '0.2rem',
    marginTop: '0.25rem',
    marginBottom: '0.25rem',
    fontWeight: 'bold',
    color: 'rgb(134,134,134)',
    fontSize: '0.35rem',
  },

  weChat: {
    textAlign: 'center',
    color: '#333333',
    fontSize: '0.25rem',

    float: 'right',
    width: '30%',

  },

  weChat_img: {
    width: '2rem',
  },

};

import React from 'react';
import {connect} from "dva";
import {ListView} from 'antd-mobile';
import {Button, WhiteSpace, NavBar, Modal, Icon} from 'antd-mobile';
import styles from './TaoCashList.css';
import BackToTop from '../../../coupon/components/BackToTop.js'
import share from '../../../../assets/share.png';
import {routerRedux} from "dva/router";
import TaoCashItem from "../components/TaoCashItem";
import taoCashImg from '../../../../assets/bigCouponBanner.png';
import ImgOpenTaobao from '../../../../assets/openTaobao.png'
import ImgClose from '../../../../assets/close.png'
import Rule from "../components/Rule";
import * as wechatApi from "../../../../wechatApi";
import copy from 'copy-to-clipboard';
import CopyToClipboard from 'react-copy-to-clipboard';
import SearchResultItem from "../../../searchResult/components/SearchResultItem.js" ;

const pageSize = 20;
let pageIndex = 0;

function genData(pIndex = 0, numRows = 20) {
  const dataBlob = {};
  for (let i = 0; i < numRows; i++) {
    const ii = (pIndex * numRows) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}



class TaoCashList extends React.Component {

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      pageNo: 1,
      modelVisible:false,
      loadingInfo: '',
      isLoading: false,
      tbPwdModel:false,
    };
  }

  backPrevious = () => {
    document.referrer === '' ? this.props.dispatch(routerRedux.push("/")) : this.props.dispatch(routerRedux.goBack())
  }


  clearActivityRecordList = () => {
    this.props.dispatch({
      type: 'taoCash/clearActivityRecord',
    });
  }

  queryActivityRecordList = (pageNo) => {
    this.props.dispatch({
      type: 'taoCash/queryBigCoupon',
      payload: {
        pageNo: pageNo,
      },
    });

    this.setState({pageNo: pageNo,});
  }

  turnToActivityDetail = (detailId,type,goodsInfo,tbPwd) => {
    let goodsId = goodsInfo.goodsId;

    switch (type) {
      case 'detail':
         this.props.dispatch(routerRedux.push({pathname: `/myTaoCash/${goodsId}`}));
        break;
      case 'join':
        this.share(detailId,goodsInfo);
        break;
      case 'finish':
        // this.props.dispatch({type: 'taoCash/queryTaoCashUrl', payload: {detailId: detailId,title:title,picUrl:picUrl}});
        this.showTbPwdMode(true);
        break;
      case 'expired':
        this.props.dispatch(routerRedux.push({pathname: `/myTaoCash/${goodsId}`}));
        break;
    }
  }

  share=(detailId,goodsInfo)=>{
    this.showMode(true);

    let pic  =goodsInfo.picUrl;
    let title =goodsInfo.title;
    let url =  window._global.url.host + '/#/shareTaoCash/' + detailId;
    let param = {
      title: '三缺一，就差你了，你点一下我就能拿到淘礼金！',
      link:  url,
      imgUrl: pic,
      desc: title,
      success: ()=> {
        this.showMode(false);
        alert('分享成功');
      }
    };
    wechatApi.share(param);
  }

  showMode = (modelVisible) => {
    this.setState({modelVisible: modelVisible});
  }

  showTbPwdMode = (modelVisible) => {
    this.setState({tbPwdModel: modelVisible});
  }

  turnToGoodsDetail = (from,goodsId) => {
    let plat = '';
    if (from === 'taobao' || from == 'tmall') {
      plat = '1_';
    } else if (from === 'jd') {
      plat = '2_';
    } else if (from === 'pdd') {
      plat = '3_';
    }
    goodsId = plat + goodsId;
    this.props.dispatch(routerRedux.push({pathname: `/detail/${goodsId}/1`}));
  }

  componentDidMount() {
    this.queryActivityRecordList(1);
  }

  //组件销毁
  componentWillUnmount() {
    this.clearActivityRecordList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.taoCash.bigCoupon !== this.props.taoCash.bigCoupon) {
      if (nextProps.taoCash.bigCoupon === null || nextProps.taoCash.bigCoupon.length === 0) {
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

    // if (nextProps.taoCash.tbPwd !== this.props.taoCash.tbPwd){
    //   if (nextProps.taoCash.tbPwd != null && nextProps.taoCash.tbPwd != '') {
    //     copy(nextProps.taoCash.tbPwd);   //复制淘口令
    //   }
    // }
  }

  onEndReached = (event) => {
    if (this.state.isLoading) {
      return;
    }
       if (this.props.taoCash.hasMore) {
      this.setState({isLoading: true});
      this.queryActivityRecordList(this.state.pageNo + 1);
      this.setState({loadingInfo: '加载中...'});
    }
    else {
      this.setState({loadingInfo: '没有更多了'});
      this.setState({isLoading: false});
    }
  }

  render() {
    let index = 0;
    const row = (rowData, sectionID, rowID) => {

      if( this.props.taoCash.bigCoupon === null ||  !Array.isArray(this.props.taoCash.bigCoupon)){
        return null;
      }

      if( index >= this.props.taoCash.bigCoupon.length){
        return null;
      }
      const item =JSON.parse( this.props.taoCash.bigCoupon[index++].goodsInfo);
      // console.log(item);
      return (
        <div key={rowID}>
          <SearchResultItem dataCoupon={item} turnToGoodsDetail={this.turnToGoodsDetail}/>
        </div>
      );
    };

    let isShowTbPwdModel = this.props.taoCash.tbPwd!==null && this.state.tbPwdModel;
    let taoCashUrl = this.props.taoCash.taoCashUrl;

    return (
      <div >
        <div className={styles.fixedTop}>
          <NavBar leftContent={<span className={styles.back}>返回</span>}
                  // rightContent={<Rule/>}
                  icon={<Icon type="left" className={styles.back_icon}/>}
                  className={styles.navbar}
                  onLeftClick={this.backPrevious}>
            <span className={styles.navTitle}>超级省钱</span> </NavBar>
        </div>

        <WhiteSpace size="xl"/>
        <WhiteSpace size="xl"/>

        <div>
          <img className={styles.banner} src={taoCashImg}/>
        </div>


        {/*<div>*/}
          {/*<div className={styles.reminder}>*/}
            {/*选择任意淘宝商品发起礼金抢购更省钱*/}
          {/*</div>*/}
        {/*</div>*/}

        <div className={styles.tabsItem}>
          <ListView
            dataSource={this.state.dataSource}
            renderFooter={() => (<div className={styles.footer}>
              {this.state.loadingInfo}
            </div>)}
            renderRow={row}
            pageSize={10}
            useBodyScroll
            scrollRenderAheadDistance={1000}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={1000}
          />
        </div>

        {
          this.state.modelVisible?
            <div onClick={()=>this.showMode(false)}>
              <div id={'zezao'} className={styles.zezao}>
                <div style={{width: '30%', display: 'inline-block', float: 'right'}}>
                  <img src={share} style={{width: '100%', marginTop: '0'}}/>
                </div>
              </div>
              <div id={'zezao'} style={{position: 'fixed', zIndex: '995', top: '3.8rem', left: '2.5rem'}}>
              <span style={{fontSize: '0.5rem', fontFamily: 'Microsoft YaHei', color: 'white'}}>
               点击右上角进行分享
              </span>
              </div>
            </div> : <BackToTop/>
        }

    {/*    <div>
          <Modal visible={isShowTbPwdModel} transparent maskClosable={false}>
          <div className={styles.showTaokey}>
              <div className={styles.showTaokey_taokey}>
                <div>
                  <img className={styles.showTaokey_taokey_img} src={ImgOpenTaobao} alt="打开淘宝"/>

                  <div className={styles.showTaokey_tip}>
                    <span>没有【手机淘宝】APP</span>
                    <br/>
                    <a className={styles.showTaokey_a} href={taoCashUrl}>
                      点这里也能买&gt;
                    </a>
                  </div>

                </div>
                <CopyToClipboard text={this.props.taoCash.tbPwd} onCopy={this.Copy} >
                  <div onClick={() => this.showTbPwdMode(false)} className={styles.showTaokey_a_close}>
                    <img className={styles.showTaokey_a_close_img} src={ImgClose} alt=''/>
                  </div>
                </CopyToClipboard>
              </div>
            </div>
          </Modal>
        </div>*/}

      </div>
    )
  }
}
export default connect(({taoCash}) => {
  taoCash
  return {taoCash}
})(TaoCashList);

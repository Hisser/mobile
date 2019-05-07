/* eslint no-dupe-keys: 0 */
/* eslint no-dupe-keys: 0 */
import {ListView, WhiteSpace,List} from 'antd-mobile';
import React from 'react';
import styles from '../cutprice.css';
import {routerRedux} from "dva/router";
import {connect} from "dva/index";
import {CountTime} from "./CountTime";
import {fetchPost} from "../../../utils/http";
import * as wechatApi from "../../../wechatApi";
import imgTmallLog from "../../../assets/tmalllogo.png";
import imgTaobaoLog from "../../../assets/taobaologo.png";
import imgJD from "../../../assets/jd_square.png";
import imgPdd from "../../../assets/pdd_square.png";

const pageSize = 10;
let pageIndex = 0;

function genData(pIndex = 0, numRows = 10) {
  const dataBlob = {};
  for (let i = 0; i < numRows; i++) {
    const ii = (pIndex * numRows) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

class GoodsListView extends React.Component {
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
    };
  }

  turnToMyCut = (plat,goodsId) => {
    this.props.dispatch(routerRedux.push(`/mycut/${plat}/${goodsId}`));
  }

  tocutPriceDetail = (groupId) => {
    this.props.dispatch(routerRedux.push(`/cutpricedetail/${groupId}`));//砍价详情
  }

  //继续分享
  continueShare=(item)=>{
    var id   =item.detailId;
    var pic  =item.groupDetailVO.picurl;
    var title =item.groupDetailVO.title;
    var param = {
      title: '三缺一，就差你了，你点多少我就能得多少！',
      link:  window._global.url.host + "/api/redirect?redirectUrl=" + '/cutpricedetail/'+id,
      imgUrl: pic,
      desc: title,
      success: function (res) {
        alert('分享成功');
      },
      cancel: function (res) {
        alert('取消分享');
      },
      fail: function (res) {
        alert('分享失败');
      }
    };
    wechatApi.share(param);

  }


  toDetail = (from,goodsId) =>{
    if(goodsId!==null) {
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
  }


  queryGoodsList = (pageNo) => {
    this.props.dispatch({
      type: 'cutPrice/queryGoodsList',
      payload: {
        pageNo: pageNo,
        type:'cut'
      }
    });

    this.setState({pageNo: pageNo});
  }

  clearGoodsList = () => {
    this.props.dispatch({
      type: 'cutPrice/clearGoodsList',
    });
  }

  componentDidMount() {
    this.queryGoodsList(1);
  }

  //组件销毁
  componentWillUnmount() {
    this.clearGoodsList();
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.cutPrice.goodsList !== this.props.cutPrice.goodsList) {
      if ((nextProps.cutPrice.goodsList === null || nextProps.cutPrice.goodsList.length === 0) && this.state.pageNo <= 1) {
        pageIndex = 0;
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
        if (!this.props.cutPrice.hasMore1) {
          this.setState({loadingInfo: '没有更多了'});
        }
      }
    }
  }


  onEndReached = (event) => {
    if (this.state.isLoading) {
      return;
    }

    if (this.props.cutPrice.hasMore1) {
      this.setState({isLoading: true});
      this.queryGoodsList(this.state.pageNo + 1);
      this.setState({loadingInfo: '加载中...'});
    }
    else {
      this.setState({loadingInfo: '没有更多了'});
      this.setState({isLoading: false});
    }
  }

  render() {

    let index = 0;
    const row= (rowData, sectionID, rowID) => {

      if (this.props.cutPrice.goodsList === null || !Array.isArray(this.props.cutPrice.goodsList)){
        return null;
      }else if (index >= this.props.cutPrice.goodsList.length) {
        return null;
      }

      const item = this.props.cutPrice.goodsList[index++]
      let receiveNum = parseInt(item.receiveNum)+100;
      let platLogo = null;
      if(item!==null) {
        switch (item.plat) {
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
        }
      }

      return (
        <div style={{marginTop:'0.2rem',  display: 'flex',borderBottom:'0.01rem solid #a6a6a6'}}>
          <WhiteSpace size="lg"/>
          <div style={{width:'40%',textAlign:'center',margin:'0,auto',padding:'0.1rem'}}>
            <div style={{width:'100%',height:'100%'}}>
              <img src={item.picurl} style={{width:'100%',height:'auto'}} onClick={()=>this.toDetail(item.plat, item.goodsId)}/>
            </div>
          </div>
          <div style={{width:'60%',height:'auto',paddingLeft:'0.3rem',paddingTop:'0.3rem',paddingBottom:'0.3rem',margin:'0 ,auto',display:'flex',alignItems:'center'}}>
            <div style={{height:'auto',width:'95%',margin:'0 ,auto'}}>
              <div className={styles.span1}>
                <img style={{margin: '0 0.1rem',width:'0.36rem',height:'0.36rem'}}
                     src={platLogo}/>
                {item.title}
              </div>
              <div style={{height:'0.2rem',width:'100%'}}></div>
              <div style={{marginLeft: '0.1rem'}}>
                <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.35rem',color:'#6d6d6d'}}>券后价:</span>
                <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.38rem',fontWeight:'500',color:'#ff3407'}}> {(item.price)/100}元，砍多少返多少 </span>
              </div>
              <div style={{height:'0.2rem',width:'100%'}}></div>
              <div style={{marginLeft: '0.1rem',}}>
                <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.35rem',color:'#6d6d6d',float:'left',marginTop:'0.2rem'}}>{(parseInt(item.receiveNum)+100)}人已 0 元得</span>
                <button className={styles.button2} onClick={() => this.turnToMyCut(item.plat,item.goodsId)}>砍价0元得</button>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div >
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
        />
      </div>
    )
  }
}

export default connect(({cutPrice}) => {
  cutPrice
  return {cutPrice}
})(GoodsListView);

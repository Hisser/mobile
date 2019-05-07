/* eslint no-dupe-keys: 0 */
/* eslint no-dupe-keys: 0 */
import {ListView, WhiteSpace,List} from 'antd-mobile';
import React from 'react';
import share from '../../../assets/share.png';
import styles from '../cutprice.css';
// import styles1 from '../myhelpfree.css';
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

class GoodsListView2 extends React.Component {

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });


    this.state = {
      dataSource,
      plat: 'taobao',
      sort: 0,
      hasCoupon: true,
      pageNo: 1,

      loadingInfo: '',
      isLoading: false,
    };
  }



  clearMyFreeList = () => {
    this.props.dispatch({
      type: 'cutPrice/clearMyFreeList',
    });
  }

  queryGoodsList = (pageNo) => {
    this.props.dispatch({
      type: 'cutPrice/queryMyFreeList',
      payload: {
        pageNo: pageNo,
        type:'cut'
      }
    });

    this.setState({
        pageNo: pageNo,
      }
    )
  }

  componentDidMount() {
    this.queryGoodsList(1);
  }


  turnToMyCut = (plat,goodsId) => {
    this.props.dispatch(routerRedux.push(`/mycut/${plat}/${goodsId}`));
  }

  tocutPriceDetail = (groupId) => {
    this.props.dispatch(routerRedux.push(`/cutpricedetail/${groupId}`));//砍价详情
  }
  //单领补贴
  order =(from,goodsId)=>{

    let plat = '';
    if (from === 'taobao' || from == 'tmall') {
      plat = '1_';
    } else if (from === 'jd') {
      plat = '2_';
    } else if (from === 'pdd') {
      plat = '3_';
    }
    goodsId = plat + goodsId;
    this.props.dispatch(routerRedux.push({pathname: `/detail/${goodsId}`}));
  }
//点击图片跳转详情
  toDetail = (from,goodsId) =>{
    let plat = '';
    if (from === 'taobao' || from == 'tmall') {
      plat = '1_';
    } else if (from === 'jd') {
      plat = '2_';
    } else if (from === 'pdd') {
      plat = '3_';
    }
    goodsId = plat + goodsId;
    this.props.dispatch(routerRedux.push({pathname: `/detail/${goodsId}`}));
  }

  //继续分享
  continueShare=(item)=>{

    this.props.dispatch({type: 'cutPrice/showModel', payload: true});
    var id   =item.detailId;
    var pic  =item.picUrl;
    var title =item.title;
    var param = {
      title: '三缺一，就差你了，你点多少我就能得多少！',
      link: window._global.url.host + "/api/redirect?redirectUrl="+'/cutpricedetail/' + id,
      imgUrl: pic,
      desc: title,
      success: ()=>{
        this.props.dispatch({type: 'cutPrice/showModel', payload: false});
        alert('分享成功');

      }
    };
    wechatApi.share(param);

  }

  //组件销毁
  componentWillUnmount() {
    this.clearMyFreeList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cutPrice.myCutList!== this.props.cutPrice.myCutList) {
      if ((nextProps.cutPrice.myCutList === null || nextProps.cutPrice.myCutList.length === 0) &&  this.state.pageNo <= 1) {
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
            // loadingInfo: '加载中...',
          });
        } else {
          this.rData = {...this.rData, ...genData(++pageIndex)};
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
            // loadingInfo: '加载中...',
          });
        }
      }
      if (!this.props.cutPrice.hasMore1) {
        this.setState({loadingInfo: '没有更多了'});
      }
    }
  }

  onEndReached = (event) => {
    if (this.state.isLoading) {
      return;
    }

    if (this.props.cutPrice.hasMore2) {
      this.setState({isLoading: true});
      this.queryGoodsList(this.state.pageNo + 1);
    }
    else {
      this.setState({loadingInfo: '没有更多了'});
      this.setState({isLoading: false});
    }
  }


  render() {
    let index1 = 0;

    const row1= (rowData, sectionID, rowID) => {
      if(this.props.cutPrice.myCutList ===null || !Array.isArray(this.props.cutPrice.myCutList)){
        return null;
      }

      if (index1 >= this.props.cutPrice.myCutList.length) {
        return null;
      }
      const item1 = this.props.cutPrice.myCutList[index1++];

      let platLogo = null;
      if(item1!==null) {
        switch (item1.itemPlat) {
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
              <img src={item1.picUrl} style={{width:'100%',height:'100%'}} />
            </div>
          </div>
          <div style={{width:'60%',height:'auto',paddingLeft:'0.3rem',paddingTop:'0.3rem',paddingBottom:'0.3rem',margin:'0 ,auto',display:'flex',alignItems:'center'}}>
            <div style={{height:'auto',width:'95%',margin:'0 ,auto'}}>
              <div className={styles.span1}>
                <img style={{margin: '0 0.1rem',width:'0.36rem',height:'0.36rem'}}
                     src={platLogo}/>
                {item1.title}
              </div>
              <div style={{height:'0.2rem',width:'100%'}}></div>
              <div style={{marginLeft: '0.1rem'}}>
                <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.35rem',color:'#6d6d6d'}}>已砍价:<span style={{color:'red'}}>{item1.cutedPrice/100}</span>,还差<span style={{color:'red'}}>{(item1.itemPrice - item1.cutedPrice)/100}</span> 元</span>
              </div>
              <div style={{height:'0.2rem',width:'100%'}}></div>

              {
                item1.status==='expired'?
                  <div>
                    <div style={{marginLeft: '0.1rem'}}>
                      <span style={{fontSize: '0.4rem', fontWeight: '600',fontFamily:'Microsoft YaHei',color: 'red'}}>已过期</span>
                      {/*<button className={styles.button1} onClick={()=>this.turnToMyCut(item1.itemId)}>重新砍价</button>*/}
                    </div>
                  </div>:
                  item1.status === 'finish' ?
                    <div>
                    <div style={{marginLeft: '0.1rem', color: '#ff0000'}}>
                  <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.4rem',color:'#ff0000'}}>
                    砍价已完成
                  </span>
                    </div>
                      <div style={{height:'0.2rem',width:'100%'}}></div>
                    <div style={{marginLeft: '0.1rem'}}>
                {/*<button className={styles.button} onClick={()=>this.turnToMyCut(item1.groupDetailVO.groupDetailId)}>砍价详情</button>*/}
                <button className={styles.button} onClick={()=>this.order(item1.itemPlat,item1.itemId) }>下单领补贴</button>
                </div>
                    </div>:

                  <div>
                    <CountTime  time={item1.createdTime}/>
                    <WhiteSpace size="lg"/>
                    <div style={{marginLeft: '0.1rem'}}>
                      <button className={styles.button} onClick={()=>this.turnToMyCut(item1.itemPlat,item1.itemId)}>砍价详情</button>
                      <button className={styles.button1} onClick={()=>this.continueShare(item1) }>继续分享</button>
                    </div>
                  </div>
              }


            </div>
          </div>





        </div>
      );
    };

    return (
      <div >
        <ListView
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{padding: 15, textAlign: 'center'}}>
            {this.state.loadingInfo}
          </div>)}
          renderRow={row1}
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
})(GoodsListView2);

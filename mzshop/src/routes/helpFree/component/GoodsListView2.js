import {ListView, WhiteSpace,List,Modal} from 'antd-mobile';
import React from 'react';
import styles from '../helpfree.css';
import {routerRedux} from "dva/router";
import {connect} from "dva/index";
import {CountTime} from "./CountTime";
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
      modal: false,
      platGoodsId:'',
    };
  }


  clearMyFreeList = () => {
    this.props.dispatch({
      type: 'cutPrice/clearMyFreeList',
    });
  }

  queryGoodsList = (pageNo) => {
    this.props.dispatch({
      type: 'helpFree/queryMyFreeList',
      payload: {
        pageNo: pageNo,
        type:'free',
      }
    });

    this.setState({
        pageNo: pageNo,
      }
    )
  }

  showModal = (from, goodsId) => {
    let plat = '';
    if (from === 'taobao' || from == 'tmall') {
      plat = '1_';
    } else if (from === 'jd') {
      plat = '2_';
    } else if (from === 'pdd') {
      plat = '3_';
    }
    goodsId = plat + goodsId;

    this.setState({
      modal: true,
      platGoodsId:goodsId,
    });
  }

  componentDidMount() {
    this.queryGoodsList(1);
  }

  turnToMyHelpFree = (plat,goodsId) => {
    this.props.dispatch(routerRedux.push(`/myhelpfree/${plat}/${goodsId}`));
  }

  closeModal = () => {
    this.setState({modal: false,});

    this.props.dispatch(routerRedux.push({pathname: `/detail/${this.state.platGoodsId}`}));
  }

  turnToGoodsDetail = (from, goodsId) => {
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

  toDetail = (goodsId) =>{
    if(goodsId) {
      this.props.dispatch(routerRedux.push({pathname: `/detail/${goodsId}/1`}));
    }
  }

  turnToMyHelp = (goodsId) => {
    this.props.dispatch(routerRedux.push(`/myhelpfree/${goodsId}`));
  }


  share=(item)=>{
    this.props.dispatch({type: 'helpFree/showModel', payload: true});

    let id   =item.detailId;
    let pic  =item.picUrl;
    let title =item.title;
    let url =  window._global.url.host+ "/api/redirect?redirectUrl=" + '/helpfreedetail/' + id;
    let param = {
      title: '三缺一，就差你了，帮我免费拿这个宝贝！',
      link:  url,
      imgUrl: pic,
      desc: title,
      success: ()=> {
        this.props.dispatch({type: 'helpFree/showModel', payload: false});
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
    if (nextProps.helpFree.myFreeList!== this.props.helpFree.myFreeList) {
      if ((nextProps.helpFree.myFreeList === null || nextProps.helpFree.myFreeList.length === 0) &&  this.state.pageNo <= 1) {
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
    }
  }

  onEndReached = (event) => {
    if (this.state.isLoading) {
      return;
    }

    if (this.props.helpFree.hasMore2) {
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

      if (this.props.helpFree.myFreeList ===null || !Array.isArray(this.props.helpFree.myFreeList)) {
        return null;
      }

      if ( index1>= this.props.helpFree.myFreeList.length) {
        return null;
      }
      const item1 = this.props.helpFree.myFreeList[index1++];

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
              <img src={item1.picUrl} style={{width:'100%',height:'100%'}} onClick={()=>this.turnToGoodsDetail(item1.itemPlat,item1.itemId)}/>
            </div>
          </div>
          <div style={{width:'60%',height:'auto',paddingLeft:'0.3rem',paddingTop:'0.3rem',paddingBottom:'0.3rem',margin:'0 ,auto',display:'flex',alignItems:'center'}}>
            <div style={{height:'auto',width:'95%',margin:'0 ,auto'}}>
              <div style={{marginLeft: '0.1rem'}}>
                <div className={styles.span1}>
                  <img style={{margin: '0 0.1rem',width:'0.36rem',height:'0.36rem'}}
                       src={platLogo}/>
                  {item1.title}</div>
              </div>
              <div style={{height:'0.2rem',width:'100%'}}></div>
              <div style={{marginLeft: '0.1rem'}}>
                <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.35rem',color:'#6d6d6d'}}>需要{item1.assistNeed}人助力,还差<span style={{color:'red'}}>{(item1.assistNeed-item1.assistCount)}</span> 人</span>
              </div>
              <div style={{height:'0.2rem',width:'100%'}}></div>

              {item1.status === 'finish'?
                <div style={{marginLeft: '0.1rem', color: '#ff0000'}}>已完成助力</div> :
                (item1.status === 'expired'? null: <CountTime time={item1.createdTime} elapsedTime={this.elapsedTime}/>)}

              <div style={{height:'0.2rem',width:'100%'}}></div>
              {item1.status==='expired'  ?  <div>
                <div style={{marginLeft: '0.1rem'}}>
                  <span style={{fontSize: '0.4rem', fontWeight: '600',fontFamily:'Microsoft YaHei',color: 'red'}}>已过期</span>
                  {/*<button className={styles.button1} onClick={()=>this.turnToMyHelp(item1.itemId)}>重新助力</button>*/}
                </div>
              </div> :
                (item1.status==='finish'?
                    <div style={{marginLeft: '0.1rem'}}>
                    <button className={styles.button}
                            onClick={() => this.showModal(item1.itemPlat,item1.itemId)}>下单领补贴
                    </button>
                  </div>
                    :
                <div style={{marginLeft: '0.1rem'}}>
                  <button className={styles.button}
                          onClick={() => this.turnToMyHelpFree(item1.itemPlat,item1.itemId)}>助力详情
                  </button>
                  <button className={styles.button1} onClick={() => this.share(item1)}>继续分享</button>
                </div>
                )
              }
            </div>
          </div>
        </div>
      );
    };

    return (
      <div >
        <Modal
          visible={this.state.modal}
          transparent
          maskClosable={false}
          onClose={()=>this.closeModal()}
          title="提示"
          footer={[{ text: 'Ok', onPress: () => {  this.closeModal(); } }]}
        >
          <div style={{ height:'auto', overflow: 'scroll' }}>
            下单完成之后，请前往花得值APP查看补贴详情。
          </div>
        </Modal>

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


export default connect(({helpFree}) => {
  helpFree
  return {helpFree}
})(GoodsListView2);

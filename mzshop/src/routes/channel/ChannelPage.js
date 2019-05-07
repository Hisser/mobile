/**
 * Created by Administrator on 2018/9/22 0022.
 */

import React from 'react';
import {connect} from 'dva';
import {routerRedux} from "dva/router";
import {NavBar, Icon, WhiteSpace} from 'antd-mobile';
import styles from './ChannelPage.css';
import BackToTop from '../coupon/components/BackToTop.js'
import GoodsListView from '../../components/goodsListView/GoodsListView.js'
import GoodsListView2 from '../../components/goodsListView/GoodsListView2.js'
import {ListView} from 'antd-mobile';


const pageSize = 20;

class ChannelPage extends React.Component {

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    let channel = this.props.channel.channel;
    let catId = this.props.channel.catId;

    this.state = {
      dataSource,
      channel: channel,
      catId: catId,
      pageNo: 1,

      loadingInfo: '',
      isLoading: false,
    };
  }

  backPrevious = () => {
     // document.referrer === '' ? this.props.dispatch(routerRedux.push("/")) : this.props.dispatch(routerRedux.goBack())
   this.props.dispatch(routerRedux.goBack());
  //  window.history.back(-1);
  }

  clearGoodsList = () => {
    this.props.dispatch({
      type: 'channel/clearGoodsList',
    });
  }

  queryGoodsList = (pageNo) => {
    if(this.state.channel=='hot'){//实时疯狂榜
      console.log("----");
      let type =2;
      if(this.state.catId ==0){
          type =1;
      }
      this.props.dispatch({
        type:'channel/queryHotList',
        payload:{
          pageNo: pageNo,
          pageSize: 20,
          cid:this.state.catId,
          type:type
        },
      });
    }else if(this.state.channel=='album'){//专辑页面
      this.props.dispatch({
        type:'channel/queryAlbum',
        payload:{
          pageNo: pageNo,
          pageSize: pageSize,
          groupId: this.props.channel.groupId,
        }
      });
    }else {
      this.props.dispatch({
        type: 'channel/queryGoodsList',
        payload: {
          channel: this.state.channel,
          catId: this.state.catId,
          pageNo: pageNo,
          pageSize: pageSize,
        },
      });
    }
    this.setState({pageNo: pageNo});
  }

  turnToGoodsDetail = (goodsId) => {
    this.props.dispatch(routerRedux.push({pathname: `/detail/${goodsId}/1`}));
  }

  changeCatId = (catId) => {
    if (catId !== this.state.catId) {
      this.setState({
        catId: catId,
        pageNo:1,
      }, () => {
        this.clearGoodsList();
        window.scrollTo(0, 0);
        this.queryGoodsList(1);
      });
    }
  }

  componentDidMount() {
    this.queryGoodsList(1);
    window.scrollTo(0, 0);
  }

  //组件销毁
  componentWillUnmount() {
    this.setState({pageNo: 1});
    this.props.dispatch({type: 'channel/clearAllData'});
  }


  render() {

    let catId = this.state.catId;
    let catList = this.props.channel.titleList;

    var hasMenu = this.props.channel.channel == '9k9' || this.props.channel.channel == 'brand' ||this.props.channel.channel=='hot';
    let titleList = this.props.channel.titleList;
    let catName =(titleList.length > 0 ? titleList[0].catName : this.props.channel.defaults);
    let catIdFirst= titleList.length > 0 ? titleList[0].catId : 0;

    return (
      <div >
        <div className={styles.sectionTop2}>
          <div className={styles.fixedTop}>
            <NavBar leftContent={<span className={styles.back}>返回</span>}
                    icon={<Icon type="left" className={styles.back_icon}/>}
                    className={styles.navbar}
                    onLeftClick={this.backPrevious}>
              <span className={styles.navTitle}>{this.props.channel.title}</span> </NavBar>
            {hasMenu ?
              <div>
                  <NavBar leftContent={<div
                    className={`${(catIdFirst === this.state.catId) ? styles.title_left_select : styles.title_left}`}
                    onClick={() => this.changeCatId(catIdFirst)}
                    style={catName.length > 2 ? {width: '1.8rem'} : {width: '1rem'}}>{catName}</div>}
                          style={{backgroundColor: '#fdde4a'}}>
                    <div className={styles.title_div_1} style={catName.length > 2 ? {width: '7rem'} : {width: '8rem'}}>
                      <div className={styles.title_div_2}>
                        <div className={styles.title_div_3}>
                          {this.props.channel.titleList.map((item, index) => (
                            index > 0 ?
                              <label id={item.catId} key={item.catId}
                                     className={`${this.state.catId == item.catId ? styles.title_label_select : styles.title_label }`}
                                     style={{paddingBottom: '0.1rem'}}
                                     onClick={() => this.changeCatId(item.catId)}>{item.catName}</label> : null
                          ))}
                        </div>
                      </div>
                    </div>
                  </NavBar>

              </div>
              : null}
          </div>
        </div>

        <div>
          {hasMenu ?
            <div>
              <WhiteSpace size='xl'/>
              <WhiteSpace/>
              <WhiteSpace/>
            </div> : null}

          {
            this.props.channel.channel ==='hot' ?
              <GoodsListView2 pageSize={pageSize}
                             pageNo={this.state.pageNo}
                             hasMore={this.props.channel.hasMore}
                             goodsList={this.props.channel.goodsList}
                             changePageNo={this.queryGoodsList}
                             turnToGoodsDetail={this.turnToGoodsDetail}
                             channel ={this.props.channel.channel}
                              catId  ={catId}
              />
              :
              <GoodsListView pageSize={pageSize}
                             pageNo={this.state.pageNo}
                             hasMore={this.props.channel.hasMore}
                             goodsList={this.props.channel.goodsList}
                             changePageNo={this.queryGoodsList}
                             turnToGoodsDetail={this.turnToGoodsDetail}
                             groupId ={this.props.channel.groupId}
                             channel ={this.props.channel.channel}
              />
          }



        </div>
        <BackToTop/>
      </div>
    )
  }
}

export default connect(({channel}) => {
  channel
  return {channel}
})(ChannelPage);

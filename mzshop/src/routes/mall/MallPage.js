import React from 'react';
import {connect} from "dva";
import {ListView} from 'antd-mobile';
import {WhiteSpace, SearchBar, Modal,NavBar} from 'antd-mobile';
import BackToTop from '../coupon/components/BackToTop.js'
import GoodsListView from '../../components/goodsListView/GoodsListView.js'
import {routerRedux} from "dva/router";
import styles from './MallPage.css';
import imgBackPrevious from "../../assets/backPrevious2.png";
import imgBannerJd from "../../assets/banner/jd_banner.png";
import imgBannerTaobao from "../../assets/banner/taobao_banner.png";


const pageSize= 20;
class MallPage extends React.Component {

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    let channel = this.props.mall.channel;
    let catId = this.props.mall.catId;

    this.state = {
      dataSource,
      plat: this.props.mall.plat,
      channel: channel,
      catId: catId,
      pageNo: 1,

      loadingInfo: '',
      isLoading: false,
    };
  }

  backPrevious = () => {
    document.referrer === '' ? this.props.dispatch(routerRedux.push("/")) : this.props.dispatch(routerRedux.goBack())
  }


  clearGoodsList = () => {
    this.props.dispatch({
      type: 'mall/clearGoodsList',
    });
  }


  queryGoodsList = (pageNo) => {
    this.props.dispatch({
      type: 'mall/queryGoodsList',
      payload: {
        channel: this.state.channel,
        catId: this.state.catId,
        pageNo: pageNo,
        pageSize: pageSize,
      },
    });

    this.setState({pageNo: pageNo});
  }

  turnToGoodsDetail = (goodsId) => {
    this.props.dispatch(routerRedux.push({pathname: `/detail/${goodsId}`}));
  }

  changeSearchWord = (searchWord) => {
    if (searchWord === null || searchWord === '') {
      Modal.alert("搜索内容不能为空！")
      return;
    } else {
      this.props.dispatch(routerRedux.push(`/searchResult/${this.state.plat}/${searchWord}`));
    }
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

  bannerClick = () => {
    if (this.state.plat === 'jd') {
      this.props.dispatch({
        type: 'mall/turnToJdAdPage',
      });
    }else if (this.state.plat === 'taobao') {
      let  url = 'https://s.click.taobao.com/ABer6Lw';
      window.location.href = url;
    }
  }


  componentDidMount() {
    this.queryGoodsList(1);
    window.scrollTo(0, 0);
  }

  //组件销毁
  componentWillUnmount() {
    this.setState({pageNo: 1});
    this.props.dispatch({type: 'mall/clearAllData'});
  }


  render() {

    let catId = this.state.catId;
    let catList = this.props.mall.titleList;

    let imgBanner = null;
    if (this.state.plat === 'taobao') {
      imgBanner = imgBannerTaobao;
    } else if (this.state.plat === 'jd') {
      imgBanner = imgBannerJd;
    }

    return (
      <div >
        <div className={styles.flex_container}>
          <div className={styles.search_div}>
            <div className={styles.search_backPrevious} onClick={this.backPrevious}>
              <img className={styles.search_back_img} src={imgBackPrevious} alt=""/>
            </div>
            <SearchBar
              placeholder="请输入商品名称/宝贝标题"
              onSubmit={(value) => {
                this.changeSearchWord(value)
              }}
              onCancel={(value) => {
                this.changeSearchWord(value)
              }}
              maxLength={200}
              cancelText="搜索"
              showCancelButton
              defaultValue={this.state.searchWord}
              className={styles.search_bar}/>
          </div>
          <div >
            <NavBar leftContent={<div
              className={`${(catList.length  && catId === catList[0].catId) ? styles.title_left_select : styles.title_left}`}
              onClick={() => this.changeCatId(catList.length > 0 ? catList[0].catId : 0)}>{catList.length > 0 ? catList[0].catName : null}</div>}
                    style={{backgroundColor: '#fdde4a'}}>
              <div className={styles.title_div_1}>
                <div className={styles.title_div_2}>
                  <div className={styles.title_div_3}>
                    {catList.map((item, index) => (
                      index > 0 ?
                        <label id={item.catId} key={item.catId}
                               className={`${catId === item.catId ? styles.title_label_select : styles.title_label }`}
                               style={{paddingBottom: '0.1rem'}}
                               onClick={() => this.changeCatId(item.catId)}>{item.catName}</label> : null
                    ))}
                  </div>
                </div>
              </div>
            </NavBar>
          </div>

        </div>
        <WhiteSpace size="xl"/>
        <WhiteSpace size="xl"/>
        <WhiteSpace size="xl"/>
        <WhiteSpace size="xl"/>
        <WhiteSpace />
        <div onClick={()=>this.bannerClick()}>
          <img src={imgBanner} alt="" style={{width: '100%'}} />
        </div>

        <GoodsListView pageSize={pageSize}
                       pageNo={this.state.pageNo}
                       hasMore={this.props.mall.hasMore}
                       goodsList={this.props.mall.goodsList}
                       changePageNo={this.queryGoodsList}
                       turnToGoodsDetail={this.turnToGoodsDetail}/>

        <BackToTop/>
      </div>
    )
  }
}

export default connect(({mall}) => {
  mall
  return {mall}
})(MallPage);

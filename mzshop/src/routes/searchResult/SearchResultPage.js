import React from 'react';
import {connect} from "dva";
import {ListView} from 'antd-mobile';
import {List, WhiteSpace, SearchBar, Modal, Switch} from 'antd-mobile';
import searchResultStyles from './SearchResultPage.css';
import BackToTop from '../coupon/components/BackToTop.js'
import {routerRedux} from "dva/router";
import SearchResultItem from "./components/SearchResultItem";

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

class SearchResultPage extends React.Component {

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    let k = this.props.search.searchKey;
    let plat = this.props.search.plat;

    this.state = {
      dataSource,
      searchWord: k,
      plat: plat,
      sort: 0,
      hasCoupon: false,
      pageNo: 1,

      loadingInfo: '',
      isLoading: false,
    };

  }

  backPrevious = () => {
    document.referrer === '' ? this.props.dispatch(routerRedux.push("/")) : this.props.dispatch(routerRedux.goBack())
  }

  changeSearchWord = (searchWord) => {
    if (searchWord == null || searchWord == '') {
      Modal.alert("搜索内容不能为空！")
      return;
    } else {
      if (searchWord === this.state.searchWord) {
        this.clearGoodsList();
        this.queryGoodsList(1);
      } else {
        this.props.dispatch(routerRedux.push(`/searchResult/${this.state.plat}/${searchWord}`));
        this.setState({
          searchWord: searchWord,
        }, () => {
          this.clearGoodsList();
          window.scrollTo(0, 0);
          this.queryGoodsList(1);
        });
      }
    }
  }

  changeSort = (sort) => {
    this.setState({
      sort: sort,
    }, () => {
      this.clearGoodsList();
      window.scrollTo(0, 0);
      this.queryGoodsList(1);
    });
  }

  changePlat = (plat) => {
    if (plat === this.state.plat) {
      this.clearGoodsList();
      this.queryGoodsList(1);
    } else {
      this.props.dispatch(routerRedux.push(`/searchResult/${plat}/${this.state.searchWord}`));
      this.setState({
        plat: plat,
      }, () => {
        this.clearGoodsList();
        window.scrollTo(0, 0);
        this.queryGoodsList(1);
      });
    }


  }

  changeHasCoupon = (hasCoupon) => {
    this.setState({
      hasCoupon: hasCoupon,
    }, () => {
      this.clearGoodsList();
      window.scrollTo(0, 0);
      this.queryGoodsList(1);
    });
  }

  clearGoodsList = () => {
    this.props.dispatch({
      type: 'search/clearGoodsList',
    });
  }

  queryGoodsList = (pageNo) => {
    this.props.dispatch({
      type: 'search/searchGoodsList',
      payload: {
        searchWord: this.state.searchWord,
        sort: this.state.sort,
        hasCoupon: this.state.hasCoupon,
        plat: this.state.plat,
        pageNo: pageNo,
        pageSize: pageSize,
      },
    });

    this.setState({pageNo: pageNo,});
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
    this.queryGoodsList(1);
  }

  //组件销毁
  componentWillUnmount() {
    this.clearGoodsList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search.goodsList !== this.props.search.goodsList) {
      if (nextProps.search.goodsList === null || nextProps.search.goodsList.length === 0) {
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

    if (this.props.search.hasMore) {
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
    const row = (rowData, sectionID, rowID) => {
      if (this.props.search.goodsList === null || index >= this.props.search.goodsList.length) {
        return null;
      }
      const item = this.props.search.goodsList[index++];
      return (
        <div key={rowID}>
          <SearchResultItem dataCoupon={item} turnToGoodsDetail={this.turnToGoodsDetail}/>
        </div>
      );
    };

    return (
      <div >
        <div className={searchResultStyles.flex_container}>
          <div className={searchResultStyles.search_div}>
            <div className={searchResultStyles.search_close} onClick={this.backPrevious}>返回</div>
            <SearchBar
              placeholder="搜索商品，发现更多优选"
              onSubmit={(value) => {
                this.changeSearchWord(value)
              }}
              onCancel={(value) => {
                this.changeSearchWord(value)
              }}
              cancelText="搜索"
              maxLength={200}
              showCancelButton
              defaultValue={this.state.searchWord}
              className={searchResultStyles.search_bar}/>
          </div>
          <div >
            <div style={{width: '100%', height: '1rem', display: 'inline-block', float: 'center',backgroundColor:'#fdde4a'}}>
              <List >
                <List.Item style={{backgroundColor: '#fdde4a', color: '#ffffff'}}>
                  <div style={{width: '25%', float: 'left', textAlign: 'center'}}>
                    <label style={{fontSize: '0.35rem'}}
                           className={`${this.state.plat == 'taobao' ? searchResultStyles.label_plat_select : searchResultStyles.label_plat}`}
                           onClick={() => {
                             this.changePlat('taobao')
                           }}>淘宝&nbsp;&nbsp;&nbsp;
                    </label>
                  </div>
                  <div style={{width: '25%', float: 'left', textAlign: 'center'}}>
                    <label style={{fontSize: '0.35rem'}}
                           className={`${this.state.plat == 'tmall' ? searchResultStyles.label_plat_select : searchResultStyles.label_plat}`}
                           onClick={() => {
                             this.changePlat('tmall')
                           }}>天猫&nbsp;&nbsp;&nbsp;
                    </label>
                  </div>
                  <div style={{width: '25%', float: 'left', textAlign: 'center'}}>
                    <label style={{fontSize: '0.35rem'}}
                           className={`${this.state.plat == 'jd' ? searchResultStyles.label_plat_select : searchResultStyles.label_plat}`}
                           onClick={() => {
                             this.changePlat('jd')
                           }}>京东&nbsp;&nbsp;&nbsp;
                    </label>
                  </div>
                  <div style={{width: '25%', float: 'left', textAlign: 'center'}}>
                    <label style={{fontSize: '0.35rem'}}
                           className={`${this.state.plat == 'pdd' ? searchResultStyles.label_plat_select : searchResultStyles.label_plat}`}
                           onClick={() => {
                             this.changePlat('pdd')
                           }}>拼多多&nbsp;&nbsp;&nbsp;
                    </label>
                  </div>
                </List.Item>

                <List.Item>
                  <div style={{width: '25%', float: 'left', textAlign: 'center'}}>
                    <label style={{fontSize: '0.35rem'}}
                           className={`${this.state.sort == 0 ? searchResultStyles.label_select : searchResultStyles.label}`}
                           onClick={() => {
                             this.changeSort(0)
                           }}>综合&nbsp;&nbsp;&nbsp;
                    </label>
                  </div>
                  <div style={{width: '25%', float: 'left', textAlign: 'center'}}>
                    <label style={{fontSize: '0.35rem'}}
                           className={`${this.state.sort == 1 ? searchResultStyles.label_select : searchResultStyles.label}`}
                           onClick={() => {
                             this.changeSort(1)
                           }}>价格&nbsp;&nbsp;&nbsp;
                    </label>
                  </div>
                  <div style={{width: '25%', float: 'left', textAlign: 'center'}}>
                    <label style={{fontSize: '0.35rem'}}
                           className={`${this.state.sort == 2 ? searchResultStyles.label_select : searchResultStyles.label}`}
                           onClick={() => {
                             this.changeSort(2)
                           }}>销量&nbsp;&nbsp;&nbsp;
                    </label>
                  </div>
                  <div style={{width: '25%'}}><label style={{fontSize: '0.35rem'}}>有券&nbsp;&nbsp;&nbsp;</label>
                    <Switch
                      align={'middle'}
                      checked={this.state.hasCoupon}
                      platform={ 'ios' }
                      onClick={() => {
                        this.changeHasCoupon(!this.state.hasCoupon)
                      }}/>
                  </div>
                </List.Item>
              </List>
            </div>
          </div>
        </div>

        <WhiteSpace size="xl"/>
        <WhiteSpace size="xl"/>
        <WhiteSpace size="xl"/>
        <WhiteSpace size="xl"/>
        <WhiteSpace size="xl"/>
        <WhiteSpace size="xl"/>
        <WhiteSpace />

        <div className={searchResultStyles.tabsItem}>
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
        <BackToTop/>
      </div>
    )
  }
}

export default connect(({search}) => {
  search
  return {search}
})(SearchResultPage);

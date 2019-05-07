/**
 * Created by Administrator on 2018/9/22 0022.
 */
import React from 'react';
import {ListView} from 'antd-mobile';
import RowItem from "./components/RowItem";
import HotListResultItem from "../../routes/channel/HotList/HotListResultItem"

function genData(pIndex = 0, numRows = 20) {
  const dataBlob = {};
  for (let i = 0; i < numRows; i++) {
    const ii = (pIndex * numRows) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

class GoodsListView extends React.Component {

  static defaultProps = {
    pageSize: 20,
    pageNo: 1,
    hasMore:false,
    goodsList:[],
    changePageNo: () => {},
    turnToGoodsDetail:()=>{},
  };


  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      loadingInfo: '',
      isLoading: false,
    };
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
    this.props.turnToGoodsDetail(goodsId);
  }

  changePageNo=(pageNo)=>{
    this.props.changePageNo(pageNo);
  }

  componentDidMount() {
     if (this.props.pageNo === 1 && this.props.length>0) {
      this.rData = genData(0,this.props.pageSize);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
        loadingInfo: '',
      });
     }
  }

  //组件销毁
  componentWillUnmount() {
    this.rData = [];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      isLoading: false,
      loadingInfo: '',
    });
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.goodsList !== this.props.goodsList) {
      if ((nextProps.goodsList === null || nextProps.goodsList.length === 0) && nextProps.pageNo <= 1) {
        this.rData = [];
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          isLoading: false,
          loadingInfo: '无数据',
        });
      } else {
        if (nextProps.pageNo === 1) {
          this.rData = genData(nextProps.pageNo-1,nextProps.pageSize);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
            loadingInfo: '',
          });
        } else {
          this.rData = {...this.rData, ...genData(nextProps.pageNo-1,nextProps.pageSize)};
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
            loadingInfo: '',
          });
        }
      }
      if (!this.props.hasMore) {
        this.setState({loadingInfo: ''});
      }
    }
  }

  onEndReached = (event) => {
    if (this.state.isLoading) {
      return;
    }

    if (this.props.hasMore) {
      this.setState({isLoading: true});
      this.changePageNo(this.props.pageNo+1);
      this.setState({loadingInfo: '加载中...'});
    } else {
      this.setState({loadingInfo: ''});
      this.setState({isLoading: false});
    }
  }



  render() {
    let index = 0;
    let index1 =0;
    let goodsList = this.props.goodsList;
    const row = (rowData, sectionID, rowID) => {
      if (goodsList === null || !Array.isArray(goodsList)) {
        return null;
      }
      if (index >= goodsList.length) {
        return null;
      }
      let leftItem = null;
      let rightItem = null;

      if(this.props.groupId!=''&&this.props.groupId!=null){
        leftItem =JSON.parse(goodsList[index++].goodsInfo) ;
        if (index < goodsList.length) {
          rightItem = JSON.parse(goodsList[index++].goodsInfo);
        }
      }else{
      leftItem = goodsList[index++];
          if (index < goodsList.length) {
             rightItem = goodsList[index++];
           }
      }
      const item = this.props.goodsList[index1++];

      return (
        <div key={rowID}>
          {
            this.props.channel ==='hot'
            ? <HotListResultItem dataCoupon={item} turnToGoodsDetail={this.turnToGoodsDetail}/>
            :<RowItem leftItem={leftItem} rightItem={rightItem} turnToGoodsDetail={this.turnToGoodsDetail}/>
          }

        </div>
      );
    };


    return (
      <div >
        <ListView
          dataSource={this.state.dataSource}
          renderFooter={() => (
            <div style={{paddingTop:'1rem',textAlign: 'center',width:'100%', }}>
              <p style={{color:'#ff6666'}}>{this.state.loadingInfo}</p>

            <footer>
              <div>
                <div >
                  <ul style={{textAlign:'center',listStyle:'none'}}>
                    <li>
                      <a href="https://www.yuezijie.cn/anon/aboutUs.htm" ><span>关于我们</span></a>
                      <a href="https://www.yuezijie.cn/anon/aboutUs.htm#contact" ><span> | 联系我们</span></a>
                      <a href="https://www.yuezijie.cn/anon/provisions.htm" ><span> | 用户协议</span></a>
                      <a href="https://www.yuezijie.cn/anon/privacy.htm" ><span> | 隐私政策</span></a>
                    </li>
                    <li><span>重庆牵手众享科技有限公司</span></li>

                    <li> <a href="http://www.miitbeian.gov.cn" style={{color:'#9e9e9e'}}>渝ICP备16005041号-2</a> </li>

                    <li><span>Chongqing hand in hand co-share Technology Co.,Ltd</span></li>

                    <li style={{paddingBottom:'15px',fontSize:'12px'}}><span>公司地址:重庆市两江新区翠渝路46号重庆房子3A</span></li>
                  </ul>
                </div>
              </div>
            </footer>

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

export default GoodsListView;

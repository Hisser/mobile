import React from 'react';
import {connect} from "dva/index";
import {ListView} from "antd-mobile";


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



class OrderListView extends React.Component {
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

  queryOrderList = (pageNo,state) => {
    this.props.dispatch({
      type: 'order/queryOrderList',
      payload: {
        pageNo: pageNo,
        state: state
      }
    });

    this.setState({pageNo: pageNo});
  }

   clearOrderList = () => {
    this.props.dispatch({
      type: 'order/clearGoodsList',
    });
  }


  componentDidMount() {
     this.queryOrderList(1,this.props.states);
     window.scrollTo(0,0);
  }

  //组件销毁
  componentWillUnmount() {
    this.clearOrderList();
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.order.orderList !== this.props.order.orderList) {
      if ((nextProps.order.orderList === null || nextProps.order.orderList.length === 0) && this.state.pageNo <= 1) {
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
          this.rData = genData(pageIndex,nextProps.order.orderList.length);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
            loadingInfo: '',
          });
        } else {
          this.rData = {...this.rData, ...genData(++pageIndex,nextProps.order.orderList.length)};
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
            loadingInfo: '',
          });
        }
      }
    }


    if(nextProps.states !== this.props.states){
      this.clearOrderList();
      window.scrollTo(0,0);
      this.queryOrderList(1,nextProps.states);
    }
  }

  onEndReached = (event) => {
    // if (this.state.isLoading) {
    //   return;
    // }

    if (this.props.order.hasMore) {
      this.setState({isLoading: true});
      this.queryOrderList(this.state.pageNo + 1,this.props.states);
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

      if (this.props.order.orderList === null || !Array.isArray(this.props.order.orderList)) {
        return null;
      } else if (index >= this.props.order.orderList.length) {
        return null;
      }

      const item = this.props.order.orderList[index++];

      return (
        <div style={{marginTop:'0.2rem',width:'100%',margin:'0 auto'}}>

          {item.items.map((i,idx)=>(
            <div key={idx}>
              <div style={{ width:'30%',height:'2.5rem',margin:'0 auto',display: 'inline-block',borderRadius:'0.5rem',textAlign:'center',verticalAlign:'top'}}>
                <img src={item.items[idx].pictUrl} style={{width:'90%',height:'90%',borderRadius:'0.2rem',marginTop:'0.2rem'}}/>
              </div>
              <div style={{ width:'65%',height:'2rem',display: 'inline-block',textAlign:'center',paddingTop:'0.6rem',marginRight:'0.3rem'}}>
            <span style={{lineHeight:'0.5rem',paddingTop:'0.3rem',fontFamily:'Microsoft YaHei',fontSize:'0.35rem',fontWeight:'500'}}>
                   {item.items[idx].title}
            </span>
              </div>
            </div>
          ))}
          <div style={{width:'100%',height:'0.5rem'}}>
            <span style={{fontSize:'0.32rem',marginLeft:'0.3rem',fontFamily:'Microsoft YaHei'}}>{item.createTime} </span> &nbsp;&nbsp;
            <span style={{fontSize:'0.32rem',marginLeft:'0.4rem',fontFamily:'Microsoft YaHei'}}>订单金额:<span style={{color:'#ff1505'}}>{item.payAmount} </span></span> &nbsp;&nbsp;
            {/*{*/}
              {/*item.tradeStatus =='5' || item.tradeStatus =='2'  ?*/}
                {/*<span style={{fontSize:'0.32rem',fontFamily:'Microsoft YaHei'}}> 购物津贴:<span style={{color:'#ff5b22'}}>{item.allowance}</span> 元</span>*/}
                {/*:null*/}
            {/*}*/}
            {
              item.tradeStatus =='1' || item.tradeStatus =='2'?
                <span style={{fontSize:'0.32rem',fontFamily:'Microsoft YaHei'}}> 订单状态:<span style={{color:'green' ,fontWeight:'600'}}>进行中</span></span>
                :
              item.tradeStatus =='3' || item.tradeStatus =='4'  ?
                <span style={{fontSize:'0.32rem',fontFamily:'Microsoft YaHei'}}> 订单状态:<span style={{color:'#ff1505',fontWeight:'600'}}>无效</span></span>
                :
                item.tradeStatus =='5' ?
                  <span style={{fontSize:'0.32rem',fontFamily:'Microsoft YaHei'}}> 订单状态:<span style={{color:'green',fontWeight:'600'}}>审核中</span></span>
                  :null

            }

          </div>
          <div style={{width:'100%',height:'0.2rem',backgroundColor:'#d9d9d9'}}>
          </div>
        </div>
      );
    }
      return (
        <div>
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
      );
    }
}
export default connect(({order}) => {
  order
  return {order}
})(OrderListView);

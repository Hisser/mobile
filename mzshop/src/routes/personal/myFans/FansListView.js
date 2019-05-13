/**
 * Created by Administrator on 2018/9/22 0022.
 */
import React from 'react';
import {ListView,Flex,WhiteSpace} from 'antd-mobile';
import * as dataUtils from "../../../utils/dateUtils";


function genData(pIndex = 0, numRows = 10) {
  const dataBlob = {};
  for (let i = 0; i < numRows; i++) {
    const ii = (pIndex * numRows) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

class FansListView extends React.Component {

  static defaultProps = {
    pageSize: 10,
    pageNo: 1,
    hasMore:false,
    fansList:[],
    changePageNo: () => {},

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
    if (nextProps.fansList !== this.props.fansList) {
      if ((nextProps.fansList === null || nextProps.fansList.length === 0) && nextProps.pageNo <= 1) {
        this.rData = [];

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          isLoading: false,
          loadingInfo: '无数据',
        });
      } else {
        if (nextProps.pageNo === 1) {
          this.rData = genData(nextProps.pageNo-1,nextProps.pageSize);
          if(nextProps.count <=10){

            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(this.rData),
              isLoading: false,
              loadingInfo: '已全部加载,共计:'+nextProps.count+'人',
            });
            console.log(this.state.loadingInfo);
          }

        } else {
          this.rData = {...this.rData, ...genData(nextProps.pageNo-1,nextProps.pageSize)};
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
            loadingInfo: '',
          });
        }
      }
      /*if (!this.props.hasMore) {
        console.log('adasd');
        this.setState({loadingInfo: ''});
      }*/
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
      this.setState({loadingInfo: '已全部加载,共计:'+this.props.count+'人'});
      this.setState({isLoading: false});
    }
  }



  render() {
    let index = 0;
    let fansList = this.props.fansList;
    const row = (rowData, sectionID, rowID) => {
      if (fansList === null || !Array.isArray(fansList)) {
        return null;
      }
      if (index >= fansList.length) {
        return null;
      }

      const item = this.props.fansList[index++];

      return (
        <div key={rowID}>
          <WhiteSpace/>
          <WhiteSpace/>
          <Flex>
            <Flex.Item style={{textAlign:'center'}}>
              <img src={item.userIco}  style={{width:'1.2rem',height:'1.2rem',borderRadius:'0.6rem'}}/>

            </Flex.Item>
            <Flex.Item>

           <span style={{lineHeight: '0.4rem',fontFamily:'Microsoft YaHei',fontSize:'0.35rem',color:'#5e5e5e'}}>{item.nickName}</span>
            </Flex.Item>
            <Flex.Item>
               <span style={{lineHeight: '0.4rem',fontFamily:'Microsoft YaHei',fontSize:'0.35rem',color:'#5e5e5e'}}>
              { dataUtils.DateUtils.parseYMD(item.addTime)}
               </span>
            </Flex.Item>
          </Flex>

        </div>
      );
    };


    return (

      <div >
        <ListView
          dataSource={this.state.dataSource}
          renderFooter={() => (
            <div style={{paddingTop:'0.5rem',textAlign: 'center',width:'100%', }}>
              <p style={{color:'#aaaaaa'}}>{this.state.loadingInfo}</p>

              <footer>
                <div>
                  <div >
                    <ul style={{textAlign:'center',listStyle:'none',marginLeft:'-0.5rem'}}>
                      <li>
                        <a href="https://www.yuezijie.cn/anon/aboutUs.htm" style={{color:'#9e9e9e',fontWeight:'bold'}} ><span >关于我们</span></a>
                        <a href="https://www.yuezijie.cn/anon/aboutUs.htm#contact" style={{color:'#9e9e9e',fontWeight:'bold'}} ><span> | 联系我们</span></a>
                        <a href="https://www.yuezijie.cn/anon/provisions.htm" style={{color:'#9e9e9e',fontWeight:'bold'}}><span> | 用户协议</span></a>
                        <a href="https://www.yuezijie.cn/anon/privacy.htm" style={{color:'#9e9e9e',fontWeight:'bold'}}><span> | 隐私政策</span></a>
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
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={500}
        />
      </div>
    )
  }
}

export default FansListView;

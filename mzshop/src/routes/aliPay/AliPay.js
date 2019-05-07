import React from 'react';
import {connect} from "dva";
import {Modal} from "antd-mobile/lib/index";
import alipay from "../../assets/alipay.png"
import agree from "../../assets/agree.png";
import GoodsListView2 from '../../components/goodsListView/GoodsListView2.js'
const alert = Modal.alert;
// import {fetchPost} from "../../../utils/http";

const pageSize = 20;
class AliPay  extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,

      loadingInfo: '',
      isLoading: false,
    };
  }

  queryGoodsList = (pageNo) => {
    this.props.dispatch({
      type:'alipayGroup/queryHotList',
      payload:{
        pageNo: pageNo,
        pageSize: 20,
        cid:0,
        type:1
      },
    });
  }

  componentDidMount(){
    }


  render(){
    return (
      <div style={{width:'100%',height:'100%',backgroundColor:'#fdfeff',textAlign:'center'}}>
        <div style={{paddingTop:'80%'}}>
          <span style={{fontFamily:'Microsoft YaHei',fontSize:'0.4rem',color:'#757575'}}>请在支付宝中打开</span>
        </div>
      </div>
    );
  };
}
export default connect(({alipayGroup}) => {
  alipayGroup
  return {alipayGroup}
})(AliPay);


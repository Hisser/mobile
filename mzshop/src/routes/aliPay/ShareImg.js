import React from 'react';
import {connect} from "dva";
import {Modal} from "antd-mobile/lib/index";
import alipay from "../../assets/alipay.png"
import agree from "../../assets/agree.png";
import GoodsListView2 from '../../components/goodsListView/GoodsListView2.js'
const alert = Modal.alert;
// import {fetchPost} from "../../../utils/http";

const pageSize = 20;
class ShareImg  extends React.Component{

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
    let url='http://oss.yuezijie.cn/image/'+this.props.shareAli.url+'?x-oss-process=style/w750';
    return (
      <div style={{width:'100%',height:'100%',backgroundColor:'#fdfeff',textAlign:'center'}}>
          <img src={url} style={{width:'90%',height:'90%'}}/>
        <div style={{textAlign:'center',marginTop:'0.5rem'}}>
          {/*<button className={style.button2}>*/}
          <span style={{fontSize:'0.45rem',fontFamily:'Microsoft YaHei',color:'#aaaaaa'}}> 长按上方图片保存发送给好友</span>
          {/*</button>*/}
        </div>
      </div>
    );
  };
}
export default connect(({shareAli}) => {
  shareAli
  return {shareAli}
})(ShareImg);


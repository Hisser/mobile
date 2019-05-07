import React from "react";
import {connect} from "dva/index";
import {routerRedux} from "dva/router";
import styles from './cutpricedetail.css';
import {Button, Icon, NavBar,WhiteSpace} from "antd-mobile";
import user from '../../assets/user.png';
import * as CommonUtil from "../../utils/CommonUtil";
import {Process} from "./component/Process";
import {CountTime} from "./component/CountTime";
import WeChatWorkNum from '../../assets/WeChatWorkNum.jpg';
import ImgClose from '../../assets/close.png';

class CutPriceDetailComponent extends React.Component {




  CutPrice=()=>{
    var detailId=this.props.cutPriceDetail.list.detailId;
    this.props.dispatch({
      type: 'cutPriceDetail/cutPrice',
      payload: detailId,
    });
  };

  CutpriceS=()=> {
    this.props.dispatch(routerRedux.push(`/cutprice`));
  }

  CloseMask = () => {
    this.props.dispatch({
      type: 'cutPriceDetail/closeMask',
    });
  }

  componentDidMount(){

  }

  componentWillMount() {

    window.scrollTo(0,0);
  }




  render(){
    console.log('this.props.cutPriceDetail.isSubMP',this.props.cutPriceDetail);
    let createdTime = this.props.cutPriceDetail.list===null ? 0: this.props.cutPriceDetail.list.createdTime;
    let percent=(this.props.cutPriceDetail.list.cutedPrice/this.props.cutPriceDetail.list.itemPrice)*100;
    return(
    <div style={{backgroundColor:'#ff6060',height:'100%',overflow:'auto'}}>
      <div style={{height:'3rem',width:'100%'}}></div>
      <div style={{position:'relative',marginTop:'-1.5rem',textAlign:'center'}}>
        <img src={this.props.cutPriceDetail.list.userImg==null?user:this.props.cutPriceDetail.list.userImg} className={styles.userimg}/><br/>
        <span style={{fontSize:'0.38rem',fontFamily:'Microsoft YaHei'}}>{this.props.cutPriceDetail.list.nickName==null?'我们的男神':this.props.cutPriceDetail.list.nickName}</span>
      </div>

      <div style={{backgroundColor:'#fffdfd',width:'95%',margin:'0 auto',borderRadius:'0.2rem',marginTop:'-1.5rem'}}>

        <div style={{width:'100%'}}>
          {/*<div className={styles.div1}>*/}<div style={{height:'1.5rem',width:'100%'}}></div>
          <div className={styles.div2}>
            <div style={{width:'35%',height:'auto'}}>
              <img src={this.props.cutPriceDetail.list.picUrl} className={styles.pic}/>
            </div>

            <div style={{width:'65%',height:'auto',marginLeft:'0.5rem',}}>
              <div style={{maxHeight:'1.6rem',overflow:'hidden'}}>
                <WhiteSpace/>
                <span className={styles.span1}  >{this.props.cutPriceDetail.list.title}
                  </span>
                <WhiteSpace/>
              </div>
              {/**/}
              {/*<WhiteSpace/>*/}
              <div>
                 <span className={styles.span11}  >
                  ¥{(this.props.cutPriceDetail.list.itemPrice)/100}
                 </span>
              </div>
              <WhiteSpace/>
              <div>
                 <span className={styles.span11}>
                    {(this.props.cutPriceDetail.list.receiveNum)+100}人已0元拿
                 </span>
              </div>
              <WhiteSpace/>
            </div>

          </div>
          <WhiteSpace/>

          {/*</div>*/}
        </div>
        <div style={{width:'95%',margin:'0 auto'}}>
          <div style={{width:'100%', textAlign:'center'}}>
            <Process percent= { (this.props.cutPriceDetail.list.cutedPrice/this.props.cutPriceDetail.list.itemPrice)*100}/>
          </div>
          <div style={{width:'100%'}}>
            <div style={{width:'50%',backgroundColor:'#fffdfd',height:'0.8rem',display:'inline-block'}}>
              <span style={{lineHeight:'0.8rem',float:'left',color:'red',marginLeft:'0.3rem',fontSize:'0.35rem',fontWeight:'500',fontFamily:'Microsoft YaHei'}}> 已砍{(this.props.cutPriceDetail.list.cutedPrice)/100}元</span>
            </div>
            <div style={{width:'50%',backgroundColor:'#fffdfd',height:'0.8rem',display:'inline-block'}}>
              <span style={{lineHeight:'0.8rem',float:'right',marginRight:'0.3rem',fontSize:'0.35rem',fontWeight:'500',fontFamily:'Microsoft YaHei'}}> 还剩{(this.props.cutPriceDetail.list.itemPrice-this.props.cutPriceDetail.list.cutedPrice)/100}元</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        {
          this.props.cutPriceDetail.code===1?
            <div style={{textAlign:'center',width:'95%',marginTop:'0.5rem',margin:'0 auto',paddingTop:'0.5rem'}}>
              <span className={styles.span2}>已帮助好友砍价</span>
              <div style={{height:'0.3rem',width:'100%'}}></div>
              <Button style={{backgroundColor:'#FADA60',color:'red',borderRadius:'0.3rem', border:'1px solid #FADA60', fontFamily:'Microsoft YaHei',}}
                onClick={this.CutpriceS}>我也要0元得</Button>
            </div>:
            <div style={{textAlign:'center',width:'95%',marginTop:'0.5rem',margin:'0 auto',paddingTop:'0.5rem'}}>
              <Button style={{backgroundColor:'#FADA60',color:'red',borderRadius:'0.3rem', border:'1px solid #FADA60', fontFamily:'Microsoft YaHei',}}
                      onClick={this.CutPrice}>帮好友砍一刀</Button>
            </div>
        }


        {
          this.props.cutPriceDetail.isSubMP==false?
            <div >
              <div id={'zezao'} style={{backgroundColor: '#2a2b2c', zIndex: '991', position: 'fixed', opacity: '0.9', top: '0', height: '100%', width: '100%'}}>
                <div id={'zezao'} style={{position: 'fixed',width: '100%', zIndex: '995', top: '3rem'}}>

                  <div style={{width: '100%', textAlign: 'center'}}>
                    <div style={{position: 'relative', left: '2.6rem', top: '0.3rem', textAlign: 'center',}}
                         onClick={this.CloseMask}>
                      <img src={ImgClose} style={{marginLeft: '0rem', width: '0.8rem', height: '0.8rem'}}/>
                    </div>

                    <img src={WeChatWorkNum} style={{width: '5rem', height: '5rem'}}/>
                    <div style={{height: '2rem', fontSize: '0.4rem', fontFamily: 'Microsoft YaHei', color: 'white', marginTop: '0.5rem'}}>
                      长按识别二维码关注公众号!
                    </div>
                  </div>
                </div>
              </div>
            </div> : null
        }




        <div style={{height:'0.3rem',width:'100%'}}></div>
        <div style={{width:'95%',margin:'0 auto',marginTop:'0.3rem',marginBottom:'0.3rem',textAlign:'center'}}>
          <CountTime  time={createdTime} flag={'mycut'}/>
        </div>


        <div style={{textAlign:'center',width:'100%',marginTop:'0.5rem'}}>
          <div className={styles.div3}>
            <div style={{height:'0.2rem',width:'100%'}}></div>
            <div style={{width:'100%'}}>
              <div style={{width:'30%',display:'inline-block'}}>
                <hr style={{backgroundColor:'white'}}/>
              </div>
              <div style={{width:'30%',display:'inline-block'}}>
                <span style={{fontSize:'0.4rem',fontFamily:'Microsoft YaHei',marginTop:'0.1rem',color:'white'}}>我的砍价帮</span>
              </div>
              <div style={{width:'30%',display:'inline-block'}}>
                <hr/>
              </div>
            </div>
            <div style={{height:'0.2rem',width:'100%'}}></div>
            {this.props.cutPriceDetail.cutList!=null&&this.props.cutPriceDetail.cutList.length!=0?
              this.props.cutPriceDetail.cutList.map((item, idx) => (
                <div className={styles.div2}  key={idx}>
                  <img src={item.userImg} className={styles.pic1}/>
                  <div style={{textAlign:'center',height:'1rem',width:'4rem'}}>
                    <span style={{margin:'0 auto', lineHeight:'1rem',fontFamily:'Microsoft YaHei',color:'white'}}>{item.nickName}</span>
                  </div>
                  <div style={{marginLeft:'0.5rem',height:'1rem',width:'3rem'}}>
                    <span style={{lineHeight:'1rem', color: '#F8D254',fontFamily:'Microsoft YaHei'}}>帮砍{item.cutedPrice/100}元</span>
                  </div>
                </div>))
              :
              <div className={styles.div2}>
                <img src={user} className={styles.pic1}/>
                <div style={{textAlign:'center',height:'1rem',width:'7rem'}}>
                  <span style={{margin:'0 auto', lineHeight:'1rem', color: 'red',fontFamily:'Microsoft YaHei'}}>现在还没有人帮忙砍价哦</span>
                </div>
              </div>
            }
            <div style={{height:'0.5rem',  width:'100%'}}>

            </div>
          </div>
          <div style={{height:'0.3rem',  width:'100%'}}>

          </div>

        </div>




      </div>

    </div>)

}}
export default connect(({cutPriceDetail}) => {
  cutPriceDetail
  return {cutPriceDetail}
})(CutPriceDetailComponent);

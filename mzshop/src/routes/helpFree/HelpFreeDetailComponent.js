import React from "react";
import * as CommonUtil from "../../utils/CommonUtil";
import {connect} from "dva/index";
import {routerRedux} from "dva/router";
import styles from './helpfreedetail.css';
import {Button, Icon, Modal, WhiteSpace} from "antd-mobile";
import pic from '../../assets/picFashion.jpg';
import WeChatWorkNum from '../../assets/WeChatWorkNum.jpg';
import ImgClose from '../../assets/close.png'
import {CountTime} from "./component/CountTime";


class HelpFreeDetailComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  CloseMask = () => {
    this.props.dispatch({
      type: 'helpFreeDetail/closeMask',
      payload: '',
    });
  }


  HelpFree = () => {
    let detailId = this.props.helpFreeDetail.list.detailId;
    this.props.dispatch({
      type: 'helpFreeDetail/helpFree',
      payload: detailId,
    });
  }


  HelpFree1 = () => {
    this.props.dispatch(routerRedux.push(`/helpfree`));
  }



  componentDidMount(){

  }

  componentWillMount() {
    window.scrollTo(0,0);
  }


  render() {
    return (
      <div style={{textAlign:'#center',backgroundColor:'#ff6060'}}>
        <div style={{height:'1.5rem'}}></div>

        <div style={{position:'absolute',left:'50%',marginLeft:'-1rem',textAlign:'center'}}>
          <img src={this.props.helpFreeDetail.list.userImg==null?'':this.props.helpFreeDetail.list.userImg} className={styles.userimg}/><br/>
          <span>{this.props.helpFreeDetail.list.nickName==null?'':this.props.helpFreeDetail.list.nickName}</span>
        </div>

      <div style={{backgroundColor:'#fffdfd',width:'95%',height:'auto',margin:'1rem auto 0',borderRadius:'0.2rem'}}>

        <div style={{width:'100%'}}>
          <div className={styles.div1}>

            <div style={{backgroundColor:'#fffdfd',width:'95%',margin:'0.0rem auto 0',borderRadius:'0.2rem'}}>
              <div style={{width:'100%',paddingBottom:'0.4rem'}}>
                <div style={{height:'0.2rem'}}></div>
                <div className={styles.div2} style={{marginTop:'1.8rem',paddingBottom:'0.2rem'}}>
                  <div style={{width:'35%',height:'auto'}}>
                    <img src={this.props.helpFreeDetail.list.picUrl==null?'':this.props.helpFreeDetail.list.picUrl} className={styles.pic}/>
                  </div>

                  <div style={{width:'65%',height:'auto',marginLeft:'0.5rem'}}>
                    <WhiteSpace/>
                    <div className={styles.span1}  >{this.props.helpFreeDetail.list.title}
                  </div>
                    <WhiteSpace/>
                    <div className={styles.span11}> ¥{(this.props.helpFreeDetail.list.itemPrice) / 100}</div>
                    <div className={styles.span_receive_num}> {this.props.helpFreeDetail.list.receiveNum + 100}人已0元拿</div>
                  </div>
                </div>
              </div>


          </div>
        </div>

      </div>
      </div>

        {
          this.props.helpFreeDetail.code===1?
            <div style={{textAlign:'center',width:'95%',marginTop:'0.5rem',margin:'0 auto',paddingTop:'0.5rem'}}>
              <span className={styles.span2}>已帮助好友助力</span>
              <div style={{height:'0.3rem',width:'100%'}}></div>
              <Button onClick={this.HelpFree1} style={{backgroundColor:'#FADA60',color:'red',borderRadius:'0.3rem', border:'1px solid #FADA60', fontFamily:'Microsoft YaHei',}}>
                我也要免费拿</Button>
            </div>:
              <div style={{textAlign:'center',width:'95%',marginTop:'0.5rem',margin:'0 auto',paddingTop:'0.5rem'}}>
                <Button type="warning" onClick={this.HelpFree} style={{backgroundColor:'#FADA60',color:'red',borderRadius:'0.3rem', border:'1px solid #FADA60', fontFamily:'Microsoft YaHei',}}>
                  帮助好友助力</Button>
              </div>
        }

        {
          this.props.helpFreeDetail.isSubMP == false ?
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




        <div style={{textAlign:'center',marginTop:'0.5rem'}}>
          <CountTime  time={this.props.helpFreeDetail.list.createdTime} flag={'mycut'}/>
        </div>

        <div style={{textAlign:'center',width:'100%',marginTop:'0.5rem'}}>
          <div className={styles.div3}>
            <div style={{width:'100%'}}>
              <div style={{width:'30%',display:'inline-block'}}>
                <hr style={{backgroundColor:'white'}}/>
              </div>
              <div style={{width:'30%',display:'inline-block'}}>
                <span style={{fontSize:'0.4rem',fontFamily:'Microsoft YaHei',marginTop:'0.1rem',color:'white'}}>我的助力帮</span>
              </div>
              <div style={{width:'30%',display:'inline-block'}}>
                <hr/>
              </div>
            </div>

            {this.props.helpFreeDetail.freeList!=null&& this.props.helpFreeDetail.freeList.length!=0 ?
              this.props.helpFreeDetail.freeList.map((item, idx) => (
                <div key={idx} className={styles.div2}>
                  <img src={item.userImg} className={styles.pic1}/>
                  <div style={{textAlign:'center',height:'1rem',width:'4rem'}}>
                    <span style={{margin:'0 auto', lineHeight:'1rem',color:'white'}}>{item.nickName}</span>
                  </div>
                  <div style={{textAlign:'center',height:'1rem',width:'3rem'}}>
                    <span style={{margin:'0 auto',  color: '#F8D254', lineHeight:'1rem',fontFamily:'Microsoft YaHei'}}>助力成功</span>
                  </div>
                </div>))
              :
              <div className={styles.div2}>

                <div style={{textAlign:'center',height:'1rem',width:'100%'}}>
                  <span style={{margin:'0 auto', lineHeight:'1rem', color: 'red',fontFamily:'Microsoft YaHei'}}>现在还没有人助力哦</span>
                </div>
                {/*<span style={{margin: '0 auto', marginTop: '0.5rem', color: 'red'}}>助力成功</span>*/}
              </div>
            }
            <div style={{height:'0.3rem',width:'100%'}}>
            </div>
          </div>
          <div style={{height:'0.3rem',width:'100%'}}>
          </div>
        </div>

      </div>
    )
  }

}
export default connect(({helpFreeDetail}) => {
  helpFreeDetail
  return {helpFreeDetail}
})(HelpFreeDetailComponent);

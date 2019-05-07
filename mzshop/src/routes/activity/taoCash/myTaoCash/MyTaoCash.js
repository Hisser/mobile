import React from 'react';
import {connect} from "dva";
import {routerRedux} from "dva/router";
import {Button, WhiteSpace, NavBar, Modal, Icon} from 'antd-mobile';
import styles from './MyTaoCash.css';
import share from '../../../../assets/share.png';
import userImgDefault from '../../../../assets/user.png';
import {CountTime} from "../../../helpFree/component/CountTime";


class MyTaoCash extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modelVisible:false,
    };
  }

  backPrevious = () => {
    document.referrer === '' ? this.props.dispatch(routerRedux.push("/")) : this.props.dispatch(routerRedux.goBack())
  }


  joinTaoCashActivity = (goodsId) => {
    this.props.dispatch({
      type: 'taoCash/joinTaoCashActivity',
      payload: {
        goodsId: goodsId,
      },
    });
  }


  componentDidMount() {
    let goodsId = this.props.match.params.goodsId ;
    this.joinTaoCashActivity(goodsId);
  }

  //组件销毁
  componentWillUnmount() {

  }


  showMode = (modelVisible) => {
    this.setState({modelVisible: modelVisible});
  }

  showShareActionSheet = (detailId, pic, title) => {
    this.showMode(true);
    // let url = window._global.url.host + '/#/shareTaoCash/' + detailId;
    // let param = {
    //   title: '三缺一，就差你了，你点一下我就能拿到淘礼金！',
    //   link: url,
    //   imgUrl: pic,
    //   desc: title,
    //   success: function () {
    //     showMode(false);
    //     alert('分享成功');
    //   },
    // };
    // wechatApi.share(param);
  }

  render() {
    let {
      title,
      picUrl,
      itemPrice,
      itemPlat,
      commission,
      status,
      detailId,
      assistantList,
      userImg,
      nickName,
      receiveNum,
      assistNeed,
      assistCount,
      createdTime,
    } = this.props.taoCash.taoCashDetail;

    return (
        <div style={{height:'100%',backgroundColor:'#ff6060'}}>
          <div className={styles.fixedTop}>
            <NavBar leftContent={<span className={styles.back}>返回</span>}
                    icon={<Icon type="left" className={styles.back_icon}/>}
                    className={styles.navbar}
                    onLeftClick={this.backPrevious}>
              <span className={styles.navTitle}>淘礼金</span> </NavBar>
          </div>
          <div style={{height:'1.8rem'}}></div>

          <div style={{position:'absolute',left:'50%',marginLeft:'-1rem',marginTop:'-0.3rem',textAlign:'center'}}>
            <img src={userImg === null ? userImgDefault : userImg} className={styles.userimg}/><br/>
            <span style={{fontSize:'0.35rem',fontFamily:'Microsoft YaHei'}}>{nickName===null?'':nickName}</span>
          </div>

          <div style={{backgroundColor:'#fffdfd',width:'95%',margin:'0.7rem auto 0',borderRadius:'0.2rem'}}>
            <div style={{width:'100%'}}>
              <div style={{height:'0.2rem'}}></div>
              <div className={styles.div2} style={{marginTop:'1.8rem',paddingBottom:'0.2rem'}}>
                <div style={{width:'35%',height:'auto'}}>
                  <img src={picUrl==null?'':picUrl} className={styles.pic}/>
                </div>

                <div style={{width:'65%',height:'auto',marginLeft:'0.5rem'}}>
                  <WhiteSpace/>
                  <div className={styles.span1} >{title}
                  </div>
                  <WhiteSpace/>
                  <WhiteSpace/>
                  <div className={styles.span11}> ¥{(itemPrice) / 100}</div>
                  <div className={styles.span_receive_num}> {receiveNum + 100}人已0元拿</div>
                </div>
              </div>
            </div>

            <div style={{width:'95%',margin:'0 auto',marginTop:'0.5rem',paddingBottom:'0.5rem',textAlign:'center'}}>
              <div className={styles.span_receive_num}>只需要
                <i style={{color:'red',fontSize:'0.5rem'}}>{assistNeed -assistCount}</i> 位好友的帮忙您就可以领取1元淘礼金。</div>
            </div>
          </div>

          <div style={{width:'95%',margin:'0 auto',marginTop:'0.5rem',marginBottom:'0.5rem'}}>
            <Button style={{backgroundColor:'#FADA60',color:'red',borderRadius:'0.3rem', border:'1px solid #FADA60', fontFamily:'Microsoft YaHei',}}
                    onClick={()=>this.showShareActionSheet(detailId,picUrl,title)}>
              叫好友帮忙</Button>
          </div>

          <div style={{textAlign:'center'}}>
            <CountTime  time={createdTime} flag={'mycut'}/>
          </div>

          <div style={{textAlign:'center',width:'100%',marginTop:'0.5rem',backgroundColor:'#ff6060',height:'auto'}}>
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

              {assistantList!== null && assistantList.length!=0?
                assistantList.map((item, idx) => (
                  <div key={idx} className={styles.div2}>
                    <img src={item.userImg} className={styles.pic1}/>
                    <div style={{textAlign:'center',height:'1rem',width:'4rem'}}>
                      <span style={{margin:'0 auto', lineHeight:'1rem',fontFamily:'Microsoft YaHei',color:'white'}}>{item.nickName}</span>
                    </div>
                    <div style={{textAlign:'center',height:'1rem',width:'3rem'}}>
                      <span style={{margin:'0 auto', lineHeight:'1rem', color: 'green',fontFamily:'Microsoft YaHei'}}>已助力</span>
                    </div>
                  </div>))
                :
                <div className={styles.div2}>
                  <div style={{textAlign:'center',height:'1rem',width:'100%'}}>
                    <span style={{margin:'0 auto', lineHeight:'1rem', color: 'red',fontFamily:'Microsoft YaHei'}}>还没有人助力哦</span>
                  </div>
                </div>
              }
              <div style={{height:'0.5rem',  width:'100%'}}></div>
            </div>
            <div style={{height:'0.3rem',  width:'100%'}}>

            </div>
          </div>

          {
            this.state.modelVisible?
              <div onClick={()=>this.showMode(false)}>
                <div id={'zezao'} className={styles.zezao}>
                  <div style={{width: '30%', display: 'inline-block', float: 'right'}}>
                    <img src={share} style={{width: '100%', marginTop: '0'}}/>
                  </div>
                </div>
                <div id={'zezao'} style={{position: 'fixed', zIndex: '995', top: '3.8rem', left: '2.5rem'}}>
              <span style={{fontSize: '0.5rem', fontFamily: 'Microsoft YaHei', color: 'white'}}>
               点击右上角进行分享
              </span>
                </div>
              </div> : null
          }

        </div>
    )
  }
}
export default connect(({taoCash}) => {
  taoCash
  return {taoCash}
})(MyTaoCash);

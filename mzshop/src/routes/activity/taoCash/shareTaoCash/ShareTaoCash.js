import React from 'react';
import {connect} from "dva";
import {routerRedux} from "dva/router";
import {Button, WhiteSpace, NavBar, Modal, Icon} from 'antd-mobile';
import styles from './ShareTaoCash.css';
import userImgDefault from '../../../../assets/user.png';
import {CountTime} from "../../../helpFree/component/CountTime";


class ShareTaoCash extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modelVisible: false,
    };
  }

  backPrevious = () => {
    document.referrer === '' ? this.props.dispatch(routerRedux.push("/")) : this.props.dispatch(routerRedux.goBack())
  }


  queryTaoCashDetail = (detailId) => {
    this.props.dispatch({
      type: 'taoCash/queryTaoCashDetail',
      payload: {
        detailId: detailId,
      },
    });
  }


  componentDidMount() {
    let detailId = this.props.match.params.detailId;
    this.queryTaoCashDetail(detailId);
  }


  helpFree = (detailId) => {
    this.props.dispatch({
      type: 'taoCash/helpTaoCash',
      payload: detailId,
    });
  }


  joinTaoCash = (detailId) => {
    this.props.dispatch(routerRedux.push(`/taoCash`));
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
      createdTime,
    } = this.props.taoCash.taoCashDetail;

    return (
      <div style={{backgroundColor: '#ff6060', height: '100%'}}>
        <div className={styles.fixedTop}>
          <NavBar leftContent={<span className={styles.back}>返回</span>}
                  icon={<Icon type="left" className={styles.back_icon}/>}
                  className={styles.navbar}
                  onLeftClick={this.backPrevious}>
            <span className={styles.navTitle}>淘礼金</span> </NavBar>
        </div>

        <div style={{textAlign: '#center', backgroundColor: '#ff6060'}}>
          <div style={{height: '1.5rem'}}></div>
          <div style={{position: 'absolute', left: '50%', marginLeft: '-1rem', textAlign: 'center'}}>
            <img src={userImg == null ? userImgDefault : userImg}
                 className={styles.userimg}/><br/>
            <span>{nickName == null ? '' : nickName}</span>
          </div>

          <div style={{
            backgroundColor: '#fffdfd',
            width: '95%',
            height: 'auto',
            margin: '1rem auto 0',
            borderRadius: '0.2rem'
          }}>

            <div style={{width: '100%'}}>
              <div className={styles.div1}>
                <div
                  style={{backgroundColor: '#fffdfd', width: '95%', margin: '0.0rem auto 0', borderRadius: '0.2rem'}}>
                  <div style={{width: '100%', paddingBottom: '0.4rem'}}>
                    <div style={{height: '0.2rem'}}></div>
                    <div className={styles.div2} style={{marginTop: '1.8rem', paddingBottom: '0.2rem'}}>
                      <div style={{width: '35%', height: 'auto'}}>
                        <img
                          src={picUrl == null ? '' : picUrl}
                          className={styles.pic}/>
                      </div>

                      <div style={{width: '65%', height: 'auto', marginLeft: '0.5rem'}}>
                        <WhiteSpace/>
                        <div className={styles.span1}>{title}
                        </div>
                        <WhiteSpace/>
                        <div className={styles.span11}> ¥{(itemPrice) / 100}</div>
                        <div
                          className={styles.span_receive_num}> {receiveNum + 100}人已拿淘礼金
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {
            this.props.taoCash.assitStatus === 1 ?
              <div style={{
                textAlign: 'center',
                width: '95%',
                marginTop: '0.5rem',
                margin: '0 auto',
                paddingTop: '0.5rem'
              }}>
                <span className={styles.span2}>已帮助好友助力</span>
                <div style={{height: '0.3rem', width: '100%'}}></div>
                <Button onClick={() => this.joinTaoCash(detailId)} style={{
                  backgroundColor: '#FADA60',
                  color: 'red',
                  borderRadius: '0.3rem',
                  border: '1px solid #FADA60',
                  fontFamily: 'Microsoft YaHei',
                }}>
                  我也要参与</Button>
              </div> :
              <div style={{
                textAlign: 'center',
                width: '95%',
                marginTop: '0.5rem',
                margin: '0 auto',
                paddingTop: '0.5rem'
              }}>
                <Button type="warning" onClick={() => this.helpFree(detailId)} style={{
                  backgroundColor: '#FADA60',
                  color: 'red',
                  borderRadius: '0.3rem',
                  border: '1px solid #FADA60',
                  fontFamily: 'Microsoft YaHei',
                }}>
                  帮助好友助力</Button>
              </div>
          }

          <div style={{textAlign: 'center', marginTop: '0.5rem'}}>
            <CountTime time={createdTime} flag={'mycut'}/>
          </div>

          <div style={{textAlign: 'center', width: '100%', marginTop: '0.5rem'}}>
            <div className={styles.div3}>
              <div style={{width: '100%'}}>
                <div style={{width: '30%', display: 'inline-block'}}>
                  <hr style={{backgroundColor: 'white'}}/>
                </div>
                <div style={{width: '30%', display: 'inline-block'}}>
                  <span
                    style={{
                      fontSize: '0.4rem',
                      fontFamily: 'Microsoft YaHei',
                      marginTop: '0.1rem',
                      color: 'white'
                    }}>助力帮</span>
                </div>
                <div style={{width: '30%', display: 'inline-block'}}>
                  <hr/>
                </div>
              </div>

              {assistantList != null && assistantList.length != 0 ?
                assistantList.map((item, idx) => (
                  <div key={idx} className={styles.div2}>
                    <img src={item.userImg} className={styles.pic1}/>
                    <div style={{textAlign: 'center', height: '1rem', width: '4rem'}}>
                      <span style={{margin: '0 auto', lineHeight: '1rem', color: 'white'}}>{item.nickName}</span>
                    </div>
                    <div style={{textAlign: 'center', height: '1rem', width: '3rem'}}>
                      <span
                        style={{margin: '0 auto', color: '#F8D254', lineHeight: '1rem', fontFamily: 'Microsoft YaHei'}}>助力成功</span>
                    </div>
                  </div>))
                :
                <div className={styles.div2}>
                  <div style={{textAlign: 'center', height: '1rem', width: '100%'}}>
                    <span style={{margin: '0 auto', lineHeight: '1rem', color: 'red', fontFamily: 'Microsoft YaHei'}}>现在还没有人助力哦</span>
                  </div>
                </div>
              }
              <div style={{height: '0.3rem', width: '100%'}}>
              </div>
            </div>
            <div style={{height: '0.3rem', width: '100%'}}>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
export default connect(({taoCash}) => {
  taoCash
  return {taoCash}
})(ShareTaoCash);

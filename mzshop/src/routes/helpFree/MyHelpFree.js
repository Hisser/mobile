import {connect} from "dva/index";
import styles from './myhelpfree2.css';
import {Button, Icon, NavBar, WhiteSpace} from "antd-mobile";
import {routerRedux} from "dva/router";
import {CountTime} from "./component/CountTime";
import pic from '../../assets/picFashion.jpg';
import * as wechatApi from "../../wechatApi";
import share from '../../assets/share.png';


function MyHelpFree({dispatch, myHelpFree}) {
  window.scrollTo(0,0);

  //返回上一页
  function BackPrevious() {
    // document.referrer === '' ? dispatch(routerRedux.push("/")) : dispatch(routerRedux.push(`/helpfree`))
    dispatch(routerRedux.push(`/helpfree`))
  }

  function hideMode(hide) {
    dispatch({type: 'myHelpFree/showModel', payload: hide});
  }

  function showShareActionSheet (id,pic,title) {
    hideMode(true);
    let url =  window._global.url.host+ "/api/redirect?redirectUrl=" + '/helpfreedetail/' + id;
    let param = {
      title: '三缺一，就差你了，帮我免费拿这个宝贝！',
      link: url,
      imgUrl: pic,
      desc: title,
      success: function () {
        hideMode(false);
        alert('分享成功');
      },
    };
    wechatApi.share(param);
  }

  let createTime = myHelpFree.list===null ? 0: myHelpFree.list.createdTime;

  return (
    <div style={{height:'100%',backgroundColor:'#ff6060'}}>
      <div className={styles.fixedTop}>
        <NavBar leftContent={<span className={styles.back}>返回</span>}
                icon={<Icon type="left" className={styles.back_icon}/>}
                className={styles.navbar}
                onLeftClick={BackPrevious}>
          <span className={styles.navTitle}>助力享免单</span> </NavBar>
      </div>
      <div style={{height:'1.8rem'}}></div>

      <div style={{position:'absolute',left:'50%',marginLeft:'-1rem',marginTop:'-0.3rem',textAlign:'center'}}>
        <img src={myHelpFree.list.userImg===null?'':myHelpFree.list.userImg} className={styles.userimg}/><br/>
        <span style={{fontSize:'0.35rem',fontFamily:'Microsoft YaHei'}}>{myHelpFree.list.nickName===null?'':myHelpFree.list.nickName}</span>
      </div>

      <div style={{backgroundColor:'#fffdfd',width:'95%',margin:'0.7rem auto 0',borderRadius:'0.2rem'}}>
        <div style={{width:'100%'}}>
          <div style={{height:'0.2rem'}}></div>
            <div className={styles.div2} style={{marginTop:'1.8rem',paddingBottom:'0.2rem'}}>
              <div style={{width:'35%',height:'auto'}}>
                <img src={myHelpFree.list.picUrl==null?pic:myHelpFree.list.picUrl} className={styles.pic}/>
              </div>

              <div style={{width:'65%',height:'auto',marginLeft:'0.5rem'}}>
                <WhiteSpace/>
                  <div className={styles.span1}  >{myHelpFree.list.title}
                  </div>
                <WhiteSpace/>
                {/*<CountTime  time={createTime} flag={'mycut'}/>*/}
                <WhiteSpace/>
                <div className={styles.span11}> ¥{(myHelpFree.list.itemPrice) / 100}</div>
                <div className={styles.span_receive_num}> {myHelpFree.list.receiveNum + 100}人已0元拿</div>
              </div>
            </div>
        </div>

        <div style={{width:'95%',margin:'0 auto',marginTop:'0.5rem',paddingBottom:'0.5rem',textAlign:'center'}}>

          <div className={styles.span_receive_num}>只需要
            <i style={{color:'red',fontSize:'0.5rem'}}>{myHelpFree.list.assistNeed -myHelpFree.list.assistCount}</i> 位好友的帮忙您就可以免费领取了。</div>
        </div>

      </div>

      <div style={{width:'95%',margin:'0 auto',marginTop:'0.5rem',marginBottom:'0.5rem'}}>
        <Button style={{backgroundColor:'#FADA60',color:'red',borderRadius:'0.3rem', border:'1px solid #FADA60', fontFamily:'Microsoft YaHei',}}
                onClick={()=>showShareActionSheet(myHelpFree.list.detailId,myHelpFree.list.picUrl,myHelpFree.list.title)}>
          叫好友帮忙</Button>
      </div>

      <div style={{textAlign:'center'}}>
      <CountTime  time={createTime} flag={'mycut'}/>
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
          {/*<span style={{fontSize:'0.5rem',fontFamily:'Microsoft YaHei',marginTop:'0.1rem'}}>我的助力帮</span>*/}

          {myHelpFree.cutList!=null&&myHelpFree.cutList.length!=0?
            myHelpFree.cutList.map((item, idx) => (
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
              {/*<img src={user} className={styles.pic1}/>*/}
              <div style={{textAlign:'center',height:'1rem',width:'100%'}}>
                <span style={{margin:'0 auto', lineHeight:'1rem', color: 'red',fontFamily:'Microsoft YaHei'}}>还没有人助力哦</span>
              </div>
            </div>
          }
          <div style={{height:'0.5rem',  width:'100%'}}>

          </div>
        </div>
        <div style={{height:'0.3rem',  width:'100%'}}>

        </div>
      </div>

      {
        myHelpFree.modelVisible===true?
          <div onClick={()=>hideMode(false)}>
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

export default connect(({myHelpFree}) => {
  myHelpFree
  return {myHelpFree}
})(MyHelpFree);

/*我的砍价页面**/

import {connect} from "dva/index";
import styles from './mycut2.css';
import {Button, Icon, NavBar, WhiteSpace,ActionSheet,Toast} from "antd-mobile";
import {routerRedux} from "dva/router";
import share from '../../assets/share.png';
import {CountTime} from "./component/CountTime";
import user from '../../assets/user.png';
import pic from '../../assets/picFashion.jpg';
import * as wechatApi from "../../wechatApi";
import {Process} from "./component/Process";


function MyCut({dispatch, myCut}) {

  window.scrollTo(0,0);
  //返回上一页
  function BackPrevious() {
    //document.referrer === '' ? dispatch(routerRedux.push("/")) : dispatch(routerRedux.push(`/cutprice`))

     dispatch(routerRedux.push(`/cutprice`))
  }

  function hideMode() {
    dispatch({type: 'myCut/showModel', payload: false});
  }

  function showShareActionSheets (id,pic,title) {

    dispatch({type: 'myCut/showModel', payload: true});
    var param = {
      title: '三缺一，就差你了，你点多少我就能得多少！',
      link: window._global.url.host + "/api/redirect?redirectUrl="+'/cutpricedetail/' + id,
      imgUrl: pic,
      desc: title,
      success: function () {
        dispatch({type: 'myCut/showModel', payload: false});
        alert('分享成功');
      }
    };
    wechatApi.share(param);
  }
  let createdTime = myCut.list===null ? 0: myCut.list.createdTime;

  let percent=(myCut.list.cutedPrice/myCut.list.itemPrice)*100;

  return (
    <div style={{backgroundColor:'#ff6060',height:'100%',overflow:'auto'}}>
      <div className={styles.fixedTop}>
        <NavBar leftContent={<span className={styles.back}>返回</span>}
                icon={<Icon type="left" className={styles.back_icon}/>}
                className={styles.navbar}
                onLeftClick={BackPrevious}>
          <span className={styles.navTitle}>砍价免费拿</span> </NavBar>
      </div>
      <div style={{height:'3rem',width:'100%'}}></div>
      <div style={{position:'relative',marginTop:'-1.5rem',textAlign:'center'}}>
        <img src={myCut.list.userImg==null?user:myCut.list.userImg} className={styles.userimg}/><br/>
        <span style={{fontSize:'0.38rem',fontFamily:'Microsoft YaHei'}}>{myCut.list.nickName==null?'加载中...':myCut.list.nickName}</span>
      </div>

      <div style={{backgroundColor:'#fffdfd',width:'95%',margin:'0 auto',borderRadius:'0.2rem',marginTop:'-1.5rem'}}>

        <div style={{width:'100%'}}>
          {/*<div className={styles.div1}>*/}<div style={{height:'1.5rem',width:'100%'}}></div>
            <div className={styles.div2}>
              <div style={{width:'35%',height:'auto'}}>
                <img src={myCut.list.picUrl} className={styles.pic}/>
              </div>

              <div style={{width:'65%',height:'auto',marginLeft:'0.5rem',}}>
                <div style={{maxHeight:'1.65rem',overflow:'hidden'}}>
                  <div style={{height:'0.3rem',width:'100%'}}></div>
                  <span className={styles.span1}  >{myCut.list.title}
                  </span>
                </div>
                {/**/}
                {/*<WhiteSpace/>*/}
                <div style={{height:'0.3rem',width:'100%'}}></div>
                <div>
                 <span className={styles.span11}  >
                  ¥{(myCut.list.itemPrice)/100}
                 </span>
                </div>
                <div style={{height:'0.3rem',width:'100%'}}></div>
                <div>
                 <span className={styles.span11}>
                   {(myCut.list.receiveNum)+100}人已0元拿
                 </span>
                </div>
              </div>



            </div>
          <WhiteSpace/>

          {/*</div>*/}
        </div>
        <div style={{width:'95%',margin:'0 auto'}}>
          <div style={{width:'100%', textAlign:'center',paddingLeft:'0.1rem',paddingRight:'0.1rem'}}>
            <Process percent= { percent > 100?100:percent}/>
          </div>
          <div style={{width:'100%'}}>
            <div style={{width:'50%',backgroundColor:'#fffdfd',height:'0.8rem',display:'inline-block'}}>
              <span style={{lineHeight:'0.8rem',float:'left',color:'red',marginLeft:'0.3rem',fontSize:'0.35rem',fontWeight:'500',fontFamily:'Microsoft YaHei'}}> 已砍{(myCut.list.cutedPrice)/100}元</span>
            </div>
            <div style={{width:'50%',backgroundColor:'#fffdfd',height:'0.8rem',display:'inline-block'}}>
              <span style={{lineHeight:'0.8rem',float:'right',marginRight:'0.3rem',fontSize:'0.35rem',fontWeight:'500',fontFamily:'Microsoft YaHei'}}> 还剩{(myCut.list.itemPrice-myCut.list.cutedPrice)/100}元</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style={{height:'0.3rem',width:'100%'}}></div>
        <div style={{width:'95%',margin:'0 auto'}}>
          <Button style={{backgroundColor:'#FADA60',color:'red',borderRadius:'0.3rem', border:'1px solid #FADA60', fontFamily:'Microsoft YaHei',}}
                  onClick={()=>showShareActionSheets(myCut.list.detailId,myCut.list.picUrl,myCut.list.title)}>分享给好友，砍多少得多少</Button>
        </div>
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
            {myCut.cutList!=null&&myCut.cutList.length!=0?
              myCut.cutList.map((item, idx) => (
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

      {
        myCut.modelVisible===true?
          <div onClick={hideMode}>
            <div id={'zezao'} className={styles.zezao}>
              <div  style={{width:'30%',display:'inline-block',float:'right'}}>
                <img src={share} style={{width:'100%',marginTop:'0rem'}}/>
              </div>


            </div>
            <div id={'zezao'} style={{position:'fixed',zIndex:'996',top:'2.4rem',left:'2.5rem'}}>
          <span style={{fontSize:'0.5rem',fontFamily:'Microsoft YaHei',color:'white'}}>
           点击右上角进行分享
          </span>
            </div>

          </div>:null
      }

    </div>)

}

export default connect(({myCut}) => {
  myCut
  return {myCut}
})(MyCut);

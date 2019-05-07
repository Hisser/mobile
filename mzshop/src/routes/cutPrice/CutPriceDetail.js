import {connect} from "dva/index";
import {routerRedux} from "dva/router";
import styles from './cutpricedetail.css';
import {Button, Icon, NavBar,WhiteSpace} from "antd-mobile";
import CutPriceDetailComponent from "./CutPriceDetailComponent";

function CutPriceDetail({dispatch, cutPriceDetail}) {

  // window.scrollTo(0,0);
  //
  // //返回上一页
  function BackPrevious() {
    document.referrer === '' ? dispatch(routerRedux.push("/")) : dispatch(routerRedux.goBack())
  }
  //
  // function CutPrice(){
  //   var detailId=cutPriceDetail.list.detailId;
  //   var groupDetailId=cutPriceDetail.groupDetailVO.groupDetailId;
  //   dispatch({
  //     type: 'cutPriceDetail/cutPrice',
  //     payload: detailId,groupDetailId,
  //   });
  // }


  return(
    <div style={{backgroundColor:'#ff6060',height:'100%'}}>
      <div className={styles.fixedTop}>
        <NavBar leftContent={<span className={styles.back}>返回</span>}
                icon={<Icon type="left" className={styles.back_icon}/>}
                className={styles.navbar}
                onLeftClick={ BackPrevious}>
          <span className={styles.navTitle}>砍价详情</span> </NavBar>
      </div>
      {/*<div style={{backgroundColor:'#fffdfd',width:'95%',height:'auto',margin:'0 auto',borderRadius:'0.2rem',marginTop:'0.5rem'}}>*/}
        {/*<div style={{position:'absolute',left:'50%',marginLeft:'-1rem',marginTop:'0rem'}}>*/}
            {/*<img src={cutPriceDetail.list.userImg==null?user:cutPriceDetail.list.userImg} className={styles.userimg}/><br/>*/}
            {/*<span>{cutPriceDetail.list.nickName==null?'我们的男神':cutPriceDetail.list.nickName}</span>*/}
        {/*</div>*/}
        {/*<div style={{width:'100%',marginTop:'1.5rem'}}>*/}
          {/*<div className={styles.div1}>*/}
              {/*<div className={styles.div11}>*/}
                {/*<span style={{fontSize:'0.45rem',fontFamily:'Microsoft YaHei',color:'#636363'}}>我发现一件好货,来一起砍价0元拿</span>*/}
              {/*</div>*/}

              {/*<div className={styles.div2}>*/}
                {/*<img src={cutPriceDetail.groupDetailVO.picurl} className={styles.pic}/>*/}
                {/*<div style={{width:'65%',height:'3rem',marginLeft:'0.5rem'}}>*/}
                  {/*<WhiteSpace/>*/}
                  {/*<span className={styles.span1}  >{cutPriceDetail.groupDetailVO.title}</span>*/}
                  {/*<WhiteSpace/>*/}
                  {/*/!*<CountTime  time={cutPriceDetail.list.createdTime} flag={'mycut'}/>*!/*/}
                  {/*/!*<WhiteSpace/>*!/*/}
                  {/*<span className={styles.span11}>¥ {(cutPriceDetail.groupDetailVO.price-cutPriceDetail.groupDetailVO.couponPrice)/100}   15203人已0元拿  </span>*/}
                  {/*<WhiteSpace/>*/}
                  {/*<span className={styles.span12}> &nbsp;&nbsp;好友已砍:&nbsp;&nbsp;&nbsp;{cutPriceDetail.list.cutedPrice/100} </span>*/}
                {/*</div>*/}
              {/*</div>*/}

          {/*</div>*/}

        {/*</div>*/}

        {/*{*/}
          {/*cutPriceDetail.code===1?*/}
            {/*<div style={{textAlign:'center',width:'95%',marginTop:'0.5rem',margin:'0 auto',paddingTop:'0.5rem'}}>*/}
              {/*<span className={styles.span2}>已帮助好友砍价</span>*/}
              {/*<Button type="warning" onClick={()=>CutPrice()}>我也要砍价</Button>*/}
             {/*</div>*/}
            {/*:*/}
            {/*<div style={{textAlign:'center',width:'95%',marginTop:'0.5rem',margin:'0 auto',paddingTop:'0.5rem'}}>*/}
              {/*<Button type="warning" onClick={()=>CutPrice()}>帮助好友砍价</Button>*/}
            {/*</div>*/}
        {/*}*/}
        {/*<div style={{textAlign:'center',width:'100%',marginTop:'0.5rem'}}>*/}
          {/*<div className={styles.div3}>*/}
            {/*<span style={{fontSize:'0.5rem',fontFamily:'Microsoft YaHei',marginTop:'0.1rem'}}>砍价帮</span>*/}

            {/*{*/}
              {/*cutPriceDetail.cutList!=null&&cutPriceDetail.cutList.length!=0?*/}

              {/*cutPriceDetail.cutList.map((item, idx) => (*/}
              {/*<div key={idx} className={styles.div2}>*/}
                {/*<img src={item.userImg} className={styles.pic1}/><span*/}
                {/*style={{margin: '0 auto', marginTop: '0.25rem', marginLeft: '0.5rem'}}>{item.nickName}</span>*/}
                {/*<span style={{margin: '0 auto', marginTop: '0.25rem', color: 'green'}}>已砍{item.cutedPrice/100}</span>*/}
              {/*</div>))*/}
                {/*:*/}
                {/*<div className={styles.div2}>*/}
                  {/*<img src={user} className={styles.pic1}/><span*/}
                  {/*style={{margin: '0 auto', marginTop: '0.25rem', marginLeft: '0.5rem'}}>现在还没有人帮忙砍价哦</span>*/}
                  {/*/!*<span style={{margin: '0 auto', marginTop: '0.5rem', color: 'red'}}>助力成功</span>*!/*/}
                {/*</div>*/}
            {/*}*/}
            {/*<div style={{height:'0.3rem',width:'100%'}}>*/}

            {/*</div>*/}
          {/*</div>*/}
          {/*<div style={{height:'0.3rem',width:'100%'}}>*/}

          {/*</div>*/}
        {/*</div>*/}
      {/*</div>*/}
    <CutPriceDetailComponent/>

    </div>
  )

}

export default connect(({cutPriceDetail}) => {
  cutPriceDetail
  return {cutPriceDetail}
})(CutPriceDetail);

import {connect} from "dva/index";
import styles from './cutprice.css';
import styles1 from './mycut.css';
import React from "react";
import {Card, Carousel, Icon, NavBar, WhiteSpace, Button, List, Tabs,Flex} from "antd-mobile";
import {routerRedux} from "dva/router";
import tuijian from '../../assets/cutprice1.png';
import Rule from "./component/Rule";
import {CountTime} from "./component/CountTime";
//import {GoodsListView} from "./component/GoodsListView";
import GoodsListView from "./component/GoodsListView";
import GoodsListView2 from "./component/GoodsListView2";


const goodsList = [{
  name: '袁志豪',
  goods: '苹果X'
}, {
  name: '小明',
  goods: 'ipone4'
}, {
  name: '小东',
  goods: '苹果6'
}, {
  name: '小北',
  goods: '三星S8'
}, {
  name: '小村',
  goods: '蓝莓'
}
]

class CutPriceComponent extends React.Component {



  turnToMyCut() {
    this.props.dispatch(routerRedux.push(`/mycut`));
  }

 tocutPriceDetail() {
    this.props.dispatch(routerRedux.push(`/cutpricedetail`));//砍价详情
  }

changeFlag=(index)=> {
    this.props.dispatch({
      type: 'cutPrice/changeFlag',
      payload: {
        flag: index,
      }
    })

  }

  render() {
    return (
      <div>
        <div>
          <div>
            <img style={{
              height: '4rem',
              width: '100%',
              marginTop: '1.5rem'
            }} src={tuijian}/>
            {/*{goodsList.length > 0 ? (*/}


              {/*<Carousel className="my-carousel"*/}
                        {/*vertical*/}
                        {/*dots={false}*/}
                        {/*dragging={false}*/}
                        {/*swiping={false}*/}
                        {/*autoplay*/}
                        {/*infinite*/}
                        {/*style={{marginTop:'0.1rem'}}*/}
              {/*>*/}
                {/*{goodsList.map((item, idx) => (*/}
                  {/*<div key={idx} className={styles.gd}>*/}
                    {/*<span className={styles.span4}>恭喜@{item.name}砍价成功,0元领取了{item.goods}</span>*/}
                  {/*</div>*/}
                {/*))}*/}

              {/*</Carousel>*/}


            {/*) : <div>现在暂无用户获得商品</div>}*/}

          </div>

          {this.props.cutPrice.flag == 2 ? <GoodsListView2/> : <GoodsListView/>}

          <Flex style={{width:'100%',margin:'0',position: 'fixed',bottom:'0px',borderTop:'0.01rem solid #a6a6a6'}}>
            <Flex.Item style={{margin:'0'}}>
              <div style={{height:'1rem',width:'100%',textAlign:'center',backgroundColor:'#fff',borderBottom:this.props.cutPrice.borderBottom1}}
                   onClick={()=>this.changeFlag('1')}>
                <span style={{fontSize:'0.4rem',lineHeight:'1rem',fontFamily:'Microsoft YaHei',fontWeight:'500',color:this.props.cutPrice.fontcolor1}}>今日砍价</span>
              </div>
            </Flex.Item>
            <Flex.Item style={{margin:'0'}}>
              <div style={{height:'1rem',textAlign:'center',backgroundColor:'#FFF',borderBottom:this.props.cutPrice.borderBottom2}}
                   onClick={()=>this.changeFlag('2')}>
                <span style={{fontSize:'0.4rem',lineHeight:'1rem',fontFamily:'Microsoft YaHei',fontWeight:'500',color:this.props.cutPrice.fontcolor2}}>我的砍价</span>
              </div>
            </Flex.Item>
          </Flex>
        </div>

      </div>



    )
  }
}
export default connect(({cutPrice}) => {
  cutPrice
  return {cutPrice}
})(CutPriceComponent);

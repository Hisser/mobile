import {connect} from "dva/index";
import styles from './helpfree.css';
import styles1 from './myhelpfree.css';
import React from "react";
import {Card, Carousel, Icon, NavBar, WhiteSpace, Button, List, Tabs,Flex} from "antd-mobile";
import {routerRedux} from "dva/router";
import tuijian from '../../assets/helpfree1.png';
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

class HelpFreeComponent extends React.Component {
  turnToMyCut() {
    this.props.dispatch(routerRedux.push(`/`));
  }

  tocutPriceDetail() {
    this.props.dispatch(routerRedux.push(`/helpfreedetail`));//砍价详情
  }

  changeFlag=(index)=> {
    this.props.dispatch({
      type: 'helpFree/changeFlag',
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
            <img style={{height: '4rem', width: '100%', marginTop: '1.5rem'}} src={tuijian}/>
          </div>

          {this.props.helpFree.flag == 2 ? <GoodsListView2/> : <GoodsListView/>}

          <Flex style={{width:'100%',margin:'0',position: 'fixed',bottom:'0',borderTop:'0.01rem solid #a6a6a6'}}>
            <Flex.Item style={{margin:'0'}}>
              <div style={{width:'100%',textAlign:'center',backgroundColor:'#fff',borderBottom:this.props.helpFree.borderBottom1}}
                   onClick={()=>this.changeFlag('1')}>
                <span style={{fontSize:'0.4rem',lineHeight:'1.2rem',fontFamily:'Microsoft YaHei',fontWeight:'500',color:this.props.helpFree.fontcolor1}}>今日助力</span>
              </div>
            </Flex.Item>
            <Flex.Item style={{margin:'0'}}>
              <div style={{textAlign:'center',backgroundColor:'#FFF',borderBottom:this.props.helpFree.borderBottom2}}
                   onClick={()=>this.changeFlag('2')}>
                <span style={{fontSize:'0.4rem',lineHeight:'1.2rem',fontFamily:'Microsoft YaHei',fontWeight:'500',color:this.props.helpFree.fontcolor2}}>我的助力</span>
              </div>
            </Flex.Item>
          </Flex>
        </div>
      </div>

    )
  }
}
export default connect(({helpFree}) => {
  helpFree
  return {helpFree}
})(HelpFreeComponent);

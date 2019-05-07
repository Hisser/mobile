import React from 'react';
import {Icon,NavBar,Flex} from "antd-mobile";
import styles from './order.css';
import {connect} from "dva/index";
import {routerRedux} from "dva/router";
import OrderListView from "./components/OrderListView";
import Rule from "./components/Rule";

class OrderList extends React.Component {


  backPrevious = () => {
     this.props.dispatch(routerRedux.push("/"));
  }

  query =(index)=>{
    this.props.dispatch({
      type: 'order/changeFlag',
      payload: {
        Flag: index
      },
    });
  }

render() {
  return (
    <div>
      <div className={styles.fixedTop}>
        <NavBar leftContent={<span className={styles.back}>返回</span>}
                rightContent={<Rule/>}
                icon={<Icon type="left" className={styles.back_icon}/>}
                className={styles.navbar}
                onLeftClick={this.backPrevious}>
          <span className={styles.navTitle}>我的订单</span>
        </NavBar>
      </div>

      <div>
        <Flex style={{marginTop:'1.5rem',marginLeft:'0rem',zIndex:'900',position:'fixed',top:'0',left:'0',right:'0'}}>
          <Flex.Item >
            <div style={{height:'1rem',textAlign:'center',margin:'0 auto',backgroundColor:'white',borderBottom:this.props.order.borderBottom1}}
              onClick={()=>this.query('0')}
            >
              <span style={{lineHeight:'1rem',fontFamily:'Microsoft YaHei',fontSize:'0.35rem',fontWeight:this.props.order.fontWeight1,color:this.props.order.fontColor1}}> 全部</span>
            </div>

          </Flex.Item>
          <Flex.Item style={{marginLeft:'0rem'}}>
            <div style={{height:'1rem',textAlign:'center',margin:'0 auto',backgroundColor:'white',borderBottom:this.props.order.borderBottom2}}
                 onClick={()=>this.query('1')}
            >
              <span style={{lineHeight:'1rem',fontFamily:'Microsoft YaHei',fontSize:'0.35rem',fontWeight:this.props.order.fontWeight2,color:this.props.order.fontColor2}}> 进行中</span>
            </div>
          </Flex.Item>
          <Flex.Item style={{marginLeft:'0rem'}}>
            <div style={{height:'1rem',textAlign:'center',margin:'0 auto',backgroundColor:'white',borderBottom:this.props.order.borderBottom3}}
                 onClick={()=>this.query('2')}
            >
              <span style={{lineHeight:'1rem',fontFamily:'Microsoft YaHei',fontSize:'0.35rem',fontWeight:this.props.order.fontWeight3,color:this.props.order.fontColor3}}> 审核中</span>
            </div>
          </Flex.Item>
          <Flex.Item style={{marginLeft:'0rem'}}>
            <div style={{height:'1rem',textAlign:'center',margin:'0 auto',backgroundColor:'white',borderBottom:this.props.order.borderBottom4}}
                 onClick={()=>this.query('3')}
            >
              <span style={{lineHeight:'1rem',fontFamily:'Microsoft YaHei',fontSize:'0.35rem',fontWeight:this.props.order.fontWeight4,color:this.props.order.fontColor4}}> 无效</span>
            </div>
          </Flex.Item>

        </Flex>




      </div>
      <div style={{marginTop:'2.5rem'}}>
        <OrderListView states={this.props.order.flag}/>
      </div>


    </div>
  )

}
}
export default connect(({order}) => {
  order
  return {order}
})(OrderList);

import React from 'react';
import {connect} from "dva";
import {fetchPost} from "../../../utils/http";
import * as dataUtils from "../../../utils/dateUtils";
import {Flex, WhiteSpace, NavBar, Button, Icon,Toast} from 'antd-mobile';
import {routerRedux} from "dva/router";
import redPackimg from "../../../assets/redPacks.png";
import unUsedImg from "../../../assets/Unused.png";
import fiveImg from "../../../assets/five.png";
import * as wechatApi from "../../../wechatApi";
import FansListView from "./FansListView";
import styles from './Fans.css';
import {ListView} from "antd-mobile/lib/index";



class MyFans  extends React.Component {

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,

      pageNo: 1,

      loadingInfo: '',
      isLoading: false,
    };
  }


  componentDidMount(){
    window.scrollTo(0,0);
  }

  backPrevious = () => {
    this.props.dispatch(routerRedux.push("/"))
  }

  queryGoodsList = (pageNo) => {
    this.props.dispatch({
      type:'myFans/fetch',
      payload:{
        pageNo: pageNo,
      }
    });
    this.setState({pageNo: pageNo});

  }

  render() {

    return (
      <div>
        <div className={styles.fixedTop}>
            <NavBar leftContent={<span className={styles.back}>返回</span>}
                    icon={<Icon type="left" className={styles.back_icon}/>}
                    className={styles.navbar}
                    onLeftClick={this.backPrevious}>
              <span className={styles.navTitle}>我的粉丝</span>
            </NavBar>
        </div>
        <div style={{marginTop:'1.2rem'}}>
            <FansListView
                fansList = {this.props.myFans.fansList}
                hasMore ={this.props.myFans.hasMore}
                changePageNo={this.queryGoodsList}
                pageNo={this.state.pageNo}
                count = {this.props.myFans.count}

            />
        </div>

      </div>
    )
  }

}

export default connect(({myFans}) => {
  myFans
  return {myFans}
})(MyFans);

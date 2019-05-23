import React from 'react';
import {connect} from "dva";
import { Player, BigPlayButton ,LoadingSpinner,  ControlBar, PlayToggle } from 'video-react';
import alipayBac from "../../assets/bac.png";
import  playpost from "../../assets/playpost.png";
import Bac from "../../assets/alipay_bac.png";
import styles from "./play.css";
import {Flex, WhiteSpace, NavBar, Button, Icon,Toast,Modal} from 'antd-mobile';
import $ from 'jquery';
import {routerRedux} from "dva/router";


class Play  extends React.Component{

  constructor(props) {
    super(props);
  }
  state={

  }

  BackPrevious=()=> {
    this.props.dispatch(routerRedux.push("/"));
  }


  componentDidMount(){
    // alert('adsad')

  }


  render(){
    console.log(" this.props.play.plat", this.props.play.plat);
    return (

      <div style={{
        width:'100%',
        height:'100%',
        backgroundImage:"url('"+Bac+"')",
        backgroundSize: '100% 100%',
        backgroundRepeat: 'repeat',
        // marginTop:'1.3rem'

      }}>

        {
          this.props.play.plat!='' ?

            <div style={{
              width: '100%',
              height: '100%',

            }}>
              <div style={{
                width: '100%',
                height: '101%',
                overflowY: 'scroll'
              }}>
                <div style={{width: '100%', height: 'auto'}}>
                  {/*视频播放
              <Player poster={playpost} src="http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4">
                <BigPlayButton position="center" />
              </Player>*/}
                  <img src="https://oss.yuezijie.cn/image/shenqian.png?x-oss-process=style/w750"
                       style={{width: '100%', height: '100%'}}/>
                </div>
              </div>

            </div>

            :

            <div style={{
              width: '100%',
              height: '100%',
              marginTop:'1.3rem'
            }}>
              <div className={styles.fixedTop}>
              <NavBar leftContent={<span className={styles.back}>返回</span>}
                      icon={<Icon type="left" className={styles.back_icon}/>}
                      className={styles.navbar}
                      onLeftClick={this.BackPrevious}
              ><span className={styles.navTitle}>省钱指南</span>
              </NavBar>

            </div>
              <div style={{
                width: '100%',
                height: '101%',
                overflowY: 'scroll'
              }}>
                <div style={{width: '100%', height: 'auto'}}>
                  {/*视频播放
              <Player poster={playpost} src="http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4">
                <BigPlayButton position="center" />
              </Player>*/}
                  <img src="https://oss.yuezijie.cn/image/shenqian.png?x-oss-process=style/w750"
                       style={{width: '100%', height: '100%'}}/>
                </div>
              </div>

            </div>
        }
        </div>

    );
  };
}
export default connect(({play}) => {
  play
  return {play}
})(Play);



/**
 * Created by Administrator on 2018/8/2 0002.
 */

import React from 'react';
import styles from './XScrollTitle.css';
import {NavBar, Icon} from 'antd-mobile';
import ImgMenu from '../../../assets/menu.png';


const titles = [
  {title: '女装'},
  {title: '男装'},
  {title: '美妆护肤'},
  {title: '配饰'},
  {title: '母婴'},
  {title: '男鞋'},
  {title: '女鞋'},
  {title: '零食王国'},
  {title: '个人洗护'},
  {title: '手机周边'},
  {title: '数码家电'},
  {title: '内衣袜子'},
  {title: '日用家居'},
  {title: '文体娱乐'},
];

class XScrollTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleType: 1,
    };
  }

  static defaultProps = {
    titleList: []
  }

  render() {
    return (
      <div>
        <NavBar leftContent={<div
          className={styles.title_left}>{this.props.titleList.length > 0 ? this.props.titleList[0].catName : '精选'}</div>}
                rightContent={<img className={styles.title_right_img} src={ImgMenu}/>}
                style={{backgroundColor: '#fdde4a'}}>
          <div className={styles.title_div_1}>
            <div className={styles.title_div_2}>
              <div className={styles.title_div_3}>
                {this.props.titleList.map((item, index) => (
                  index > 0 ?
                    <label id={item.catId} key={item.catId} className={styles.title_label}
                           style={{paddingBottom: '0.1rem'}}>{item.catName}</label> : null))}
              </div>
            </div>
          </div>
        </NavBar>
      </div>
    );
  }
}

export default XScrollTitle;

import React from 'react';
import {connect} from 'dva';
import styles from './IndexPage.css';
import {routerRedux} from "dva/router";


function IndexPage({dispatch, activity}) {

  function Botton() {
    /*跳转页面*/
    dispatch(routerRedux.push('/activity'));
  }

  function ToCoupon() {
    /*跳转页面*/
    dispatch(routerRedux.push('/coupon'));
  }

  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome}/>
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>

        <li>
          <button onClick={Botton}>活动页面</button>
        </li>
        <li>
          <button onClick={ToCoupon}>小红书推荐</button>
        </li>

      </ul>

    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);

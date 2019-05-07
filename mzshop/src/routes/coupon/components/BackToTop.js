/**
 * Created by Administrator on 2018/7/30 0030.
 */

import React from 'react';
import ImgToTop from '../../../assets/toTop.png'

function BackTop() {
  var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(BackTop);
    window.scrollTo(0, currentScroll - (currentScroll / 5));
  }
}

class BackToTop extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '0.2rem',
        height: '1.3rem',
        width: '1.3rem',
        zIndex: 1000,
      }} onClick={BackTop}>
        <img style={{height: '100%',}} src={ImgToTop} alt="回顶部" />
      </div>
    );
  }
}

export default BackToTop;

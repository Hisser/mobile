import {connect} from "dva";
import styles from './mainPage.css';
import {routerRedux} from "dva/router";
import BackToTop from "../coupon/components/BackToTop";
import Nav from "./components/Nav";
import MainPages from "./MainPages";


function mainPage({dispatch, mainpage}) {
  window.scrollTo(0, 0);

  //跳转到搜索页面
  function turnToSearch() {
    dispatch(routerRedux.push('/search'));
  };




  //  进入主页 加载中数据  每日排行榜 精选  广告
  return (
    //<MainPageComponent/>
    <div>
      <MainPages/>
    {/*<Nav a={turnToSearch} Nav={mainpage.NavList} adList={mainpage.adList} goodsSelected={mainpage.goodsSelected}/>*/}
  <BackToTop />
  </div>

  );
}

export default connect(({mainpage}) => {
  mainpage
  return {mainpage};
})
(mainPage);


import React from 'react';
import {Router, Route, Switch,routerRedux} from 'dva/router';
import dynamic from 'dva/dynamic';
import CouponPage from "./routes/coupon/CouponPage";
import MainPage from "./routes/mainPage/mainPage";
import SearchPage from "./routes/search/SearchPage";
import SearchResultPage from "./routes/searchResult/SearchResultPage";
import AdDetail from "./routes/adDetail/AdDetail";
import HelpFree from "./routes/helpFree/HelpFree";
import MyHelpFree from "./routes/helpFree/MyHelpFree";
import HelpFreeDetail from "./routes/helpFree/HelpFreeDetail";
import CutPrice from "./routes/cutPrice/CutPrice";
import MyCut from "./routes/cutPrice/MyCut";
import CutPriceDetail from "./routes/cutPrice/CutPriceDetail";
import MallPage from "./routes/mall/MallPage";
import ChannelPage from "./routes/channel/ChannelPage";
import TaoCashList from "./routes/activity/taoCash/taoCashList/TaoCashList";
import MyTaoCash from "./routes/activity/taoCash/myTaoCash/MyTaoCash";
import ShareTaoCash from "./routes/activity/taoCash/shareTaoCash/ShareTaoCash";
import OnePointBuy from "./routes/activity/onePointBuy/OnePointBuy";
import Order from "./routes/Order/OrderList";
import ActivityNewer from "./routes/activity/activityNewer/ActivityNewer";
import Help from "./routes/help/Help";
import ActivityChannel from "./routes/activity/activityChannel/ActivityChannel";
import RebateNewer from "./routes/activity/rebateNewer/RebateNewer";
import Redpack from "./routes/personal/redPack/Redpack";
import AliPay from "./routes/aliPay/AliPay";
import AliPayNew from "./routes/aliPay/AliPayNew";
import AlipayCode from "./routes/aliPay/AlipayCode";
import InviteNewerAli from "./routes/aliPay/InviteNewerAli";
import MyFans from "./routes/personal/myFans/MyFans";

const { ConnectedRouter } = routerRedux;
function RouterConfig({history,app}) {

  const routes=[{
    path: "/",
    name: "MainPage",
    // models: ()=>[import('./models/mainpage')],
    component: MainPage
  },{
    path: "/taoCash",
    name: "TaoCashList",
    // models: ()=>[import('./models/taoCash')],
    component: TaoCashList
  },{
    path: "/mytaoCash/:goodsId",
    name: "MyTaoCash",
    // models: ()=>[import('./models/taoCash')],
    component: MyTaoCash
  },{
    path: "/shareTaoCash/:detailId",
    name: "ShareTaoCash",
    // models: ()=>[import('./models/taoCash')],
    component: ShareTaoCash
  },{
    path: "/detail/:id/:flag?",
    name: "CouponPage",
    // models: ()=>[import('./models/coupon')],
    component: CouponPage
  },{
    path: "/goodslist/:type/:groupId?",
    name: "ChannelPage",
    // models: ()=>[import('./models/channel')],
    component: ChannelPage
  },{
    path: "/ad/adDetail/:id/:flag?",
    name: "AdDetail",
    // models: ()=>[import('./models/addetail')],
    component: AdDetail
  },{
    path: "/search",
    name: "SearchPage",
    // models: ()=>[import('./models/search')],
    component: SearchPage
  },{
    path: "/searchResult/:plat/:searchWord",
    name: "SearchResultPage",
    // models: ()=>[import('./models/search')],
    component: SearchResultPage
  },{
    path: "/helpfree",
    name: "HelpFree",
    // models: ()=>[import('./models/helpFree')],
    component: HelpFree
  },{
    path:"/myhelpfree/:plat/:groupId",
    name:"MyHelpFree",
    // models: ()=>[import('./models/myHelpFree')],
    component:MyHelpFree
  },{
    path:"/helpfreedetail/:groupId",
    name:"HelpFreeDetail",
    // models: ()=>[import('./models/helpfreedetail')],
    component:HelpFreeDetail
  },{
    path:"/cutprice",
    name:"CutPrice",
    // models: ()=>[import('./models/cutprice')],
    component:CutPrice
  },{
    path:"/mycut/:plat/:groupId",
    name:"MyCut",
    // models: ()=>[import('./models/myCut')],
    component:MyCut
  },{
    path:"/cutpricedetail/:groupId",
    name:"CutPriceDetail",
    // models: ()=>[import('./models/cutpricedetail')],
    component:CutPriceDetail
  },{
    path:"/mall/:plat",
    name:"MallPage",
    // models: ()=>[import('./models/mall')],
    component:MallPage
  },{
    path:"/onepointbuy",
    name:"OnePointBuy",
    // models: ()=>[import('./models/onePointBuy')],
    component:OnePointBuy
  },{
    path:"/order",
    name:"Order",
    // models: ()=>[import('./models/order')],
    component:Order
  },{
    path:"/help",
    name:"Help",
    component:Help
  },{
    path:"/activityNewer/:channelId/:userId?",
    name:"ActivityNewer",
    // models: ()=>[import('./models/activityNewer')],
    component:ActivityNewer
  },{
    path:"/activityChannel",
    name:"ActivityChannel",
    // models: ()=>[import('./models/activityChannel')],
    component:ActivityChannel
  },{
    path:"/rebateNewer/:channelId?/:parentId?",
    name:"RebateNewer",
    component:RebateNewer
  },{
    path:"/myRedPack",
    name:"RedPack",
    component:Redpack
  },{
    path:"/alipayGroup/:channel?/:userId?",
    name:"Alipay",
    component:AliPay
  },{
    path:"/inviteNewer",
    name:"Invite",
    component:InviteNewerAli
  },{
    path:"/alipayGroupNew/:channel?",
    name:"AlipayNew",
    component:AliPayNew
  },{
    path:"/alipayCode/:channel?",
    name:"AlipayCode",
    component:AlipayCode
  },{
    path:"/myFans",
    name:"MyFans",
    component:MyFans
  }];




  return (
    <Router history={history}>
      <Switch>
        {
          routes.map(({path,name,component})=>{
            return (
              <Route path={path}  key={name} exact component={component}/>
            );
          })
        }
      </Switch>


    </Router>
  );
}

export default RouterConfig;

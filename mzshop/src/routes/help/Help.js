import {List , NavBar,WhiteSpace,Icon } from 'antd-mobile';
import React from "react";
import {routerRedux} from "dva/router";
import {connect} from "dva";

const Item = List.Item;
const Brief = Item.Brief;

class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // backPrevious = () => {
  //   document.referrer === '' ? this.props.dispatch(routerRedux.push("/")) : this.props.dispatch(routerRedux.goBack());
  // }

  render() {

    return (
      <div style={{padding:'0.3rem'}}>
        <div style={styles.fixedTop}>
          <div style={styles.centerTitle}>常见问答</div>
          {/*<NavBar*/}
                  {/*leftContent={<span style={styles.back}>返回</span>}*/}
                  {/*icon={<Icon type="left" style={styles.back_icon}/>}*/}
                  {/*style={styles.navbar}*/}
                  {/*onLeftClick={this.backPrevious}>*/}
            {/*<span style={styles.navTitle}>常见问答</span> */}
          {/*</NavBar>*/}
        </div>

        <WhiteSpace size="xl"/>
        <WhiteSpace size="xl"/>


        <p class="MsoNormal" style={{marginLeft:'0cm',textIndent:'0cm'}}>
          <b>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </b><b>使用花得值如何省钱？</b><b></b>
        </p>
        <p class="MsoNormal" style={{textIndent:'21.0pt'}}>
          （<span>1</span>）<b>领取大额优惠券购物直接省钱</b>：网店为了冲销量，会在第三方平台发放额外的优惠券，花得值是一款可以领淘宝、京东、拼多多等电商平台的额外优惠券的<span>APP</span>，领取优惠券后购买同一件商品可以抵扣相应的金额，能帮你省很多钱。<span></span>
        </p>
        <p class="MsoNormal" style={{textIndent:'21.0pt'}}>
          （<span>2</span>）<b>商城购物直接返现</b>：花得值聚集了大量网购会员，会员通过花得值去各大网上商城购物，购物完成后，花得值可从网上商城得到一定比例的销售提成，花得值再把提成与自己的会员分享，这就是现金返利的来源，丝毫不会影响您在各购物网站的权益。<span><br />
          </span>您或许会问：<span>"</span>你们是不是把价格提高然后再出售给消费者？<span>"</span>当然不是！ 花得值本身不出售任何商品，具体交易的所有流程均在合作商城进行。<b></b>
        </p>
        <p class="MsoNormal" style={{marginLeft:'0cm',textIndent:'0cm'}}>
          <b>2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </b><b>在花得值上购买，商品质</b><b>量和售后服务怎么保障？</b><b></b>
        </p>
        <p class="MsoNormal" style={{textIndent:'21.0pt'}}>
          花得值<span>APP</span>只是帮助用户获取到优惠的商品，用户在花得值下单，其实还是跳转到淘宝天猫、京东、拼多多，质量和服务由这些电商负责，与直接通过淘宝天猫京东拼多多下单享受的质量和服务是一样，没有任何差别。<span></span>
        </p>
        <p class="MsoNormal" style={{marginLeft:'0cm',textIndent:'0cm'}}>
          <b>3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </b><b>在花得值上网购，安全吗？</b><b></b>
        </p>
        <p class="MsoNormal" style={{textIndent:'21.0pt'}}>
          客户信息安全是各大电商的命根子，既然阿里、京东、拼多多敢于授权花得值发放优惠，他们就能够防止客户核心信息被我们掌握。况且下单的时候已经跳转进入他们的网站，支付安全在阿里、京东、拼多多的严密掌管中。<span></span>
        </p>
        <p class="MsoNormal" style={{marginLeft:'0cm',textIndent:'0cm'}}>
          <b>4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </b><b>我喜欢网易、苏宁、唯品会，你们有他们的内部隐藏优惠吗？</b><b></b>
        </p>
        <p class="MsoNormal" style={{textIndent:'18.0pt'}}>
          各家电商都有内部隐藏优惠。我们会争取更多电商的授权：网易、苏宁、美团、携程<span>......</span>，为大家争取更大范围的优惠！
        </p>
        <p class="MsoNormal" style={{marginLeft:'0cm',textIndent:'0cm'}}>
          <b>5.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </b><b>抵现卡上额度用完怎么办？</b><b></b>
        </p>
        <p class="MsoNormal" style={{textIndent:'18.0pt'}}>
          用户可以在花得值<span>APP</span>“红包”页面领取红包累积额度，每天签到也可领取额度，还可以联系给您卡的单位再领取一个充值码直接获得大额抵现额度。<span></span>
        </p>
        <p class="MsoNormal" style={{marginLeft:'0cm',textIndent:'0cm'}}>
          <b>6.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </b><b>怎么跟踪我的订单？</b><b></b>
        </p>
        <p class="MsoNormal" style={{textIndent:'18.0pt'}}>
          下单后<span>15-30</span>分钟（少数情况下<span>1</span>小时）内，您可回花得值账户查看订单信息；<span></span>
        </p>
        <p class="MsoNormal" style={{marginLeft:'0cm',textIndent:'0cm'}}>
          <b>7.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </b><b>我的订单返现什么时候到账？</b><b></b>
        </p>
        <p style={{textIndent:'21.0pt'}}>
          按商城的要求，须在<span>2</span>个月的退换货账期后，才能结算返现。不同商城的返现时间略有不同，例如：京东返利预计会在您下单后的<span>2</span>个月左右发放；<b></b>
        </p>
        <p class="MsoNormal" style={{marginLeft:'0cm',textIndent:'0cm'}}>
          <b>8.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </b><b>为什么我的订单没有返现补贴？</b><b></b>
        </p>
        <p>
          （<span>1</span>）<span>.</span>淘宝订单维权后，若淘宝订单状态显示交易成功，则花得值会按照实际成交金额重新计算返利。<span></span>
        </p>
        <p>
          （<span>2</span>）<span>.</span>如果用户在天猫订单确认收货前申请维权，可能造成订单无返利。<span></span>
        </p>
        <p class="MsoNormal">
          （<span>3</span>）<span>.</span>使用优惠券后的商品没有返现；<span></span>
        </p>
        <p>
          <b>通过花得值去淘宝网下单需注意：<span></span></b>
        </p>
        <p>
          1.聚划算商品，无跟单，无返现；<span></span>
        </p>
        <p>
          2.货到付款商品，无跟单，无返现；<span></span>
        </p>
        <p>
          3.虚拟类产品，无跟单，无返现（虚拟类产品指的是无实物性质，网上发布时默认无法选择物流运输的商品，例如：手机充值、游戏点卡等）；<span></span>
        </p>
        <p>
          4.天猫积分、天猫点券、天猫分期付款、信用卡分期付款、余额宝、蚂蚁花呗、集分宝抵扣部分仍可结算返利，淘金币、运费、关税、店铺优惠劵等抵扣部分无返现；<span></span>
        </p>
        <p>
          <b>通过花得值去京东网下单需注意：<span></span></b>
        </p>
        <div style={{border:'none',padding:'0cm 0cm 0cm 0cm'}}>
          <h4 style={{marginLeft:'0cm'}}>
            以下情况无返利<span></span>
          </h4>
        </div>
        <p>
          1、购买大闸蟹、婴幼1段奶粉、情趣计生、商用电器、农资绿植、汽车、农用物资、中西药品、黄金铂金饰品、金银投资、团购、拍卖、赠品、换购、票务卡券、服务类虚拟类商品、SMG员工内买专区商品，夺宝岛频道等特殊商品，抢购、预售的商品，京东到家订单，使用特殊优惠的订单，京东集团员工订单、企业用户、经销商、高校代理、京东乡村推广员及其发展的用户、京东家电专卖店的订单，京东帮等特殊情况无返利。<span></span>
        </p>
        <p>
          2、同一产品每人限购5件，超出5件将整单无返利（同一id、同一手机号码、同一付款（收款）账号、同一收货人等均视为同一人购买）。<span></span>
        </p>
        <p>
          3、发生退货/退款的商品无返利，其他商品有返利。发生换货订单，原订单有返利，换货新生成的订单无返利。<span></span>
        </p>
        <div style={{border:'none',padding:'0cm 0cm 0cm 0cm'}}>
          <h4 style={{marginLeft:'0cm'}}>
            其他注意事项<span></span>
          </h4>
        </div>
        <p class="MsoNormal" style={{marginLeft:'0cm',textIndent:'-18.0pt'}}>
          ·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          1、返利比例针对的是净销售额（即订单总金额扣除优惠、礼品卡、商城积分、商城账户余额等抵扣部分，缺货商品金额，以及运费金额），使用京豆，优惠券（包括但不限于：满减券 运费券等等），礼品卡，白条优惠券，商城账户余额的订单，抵扣部分无返利；<span></span>
        </p>
        <p class="MsoNormal" style={{marginLeft:'0cm',textIndent:'-18.0pt'}}>
          ·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          2、 系统自动拆分订单导致订单返利发生变化，以拆分后的订单返利为准；<span></span>
        </p>
        <p class="MsoNormal" style={{marginLeft:'0cm',textIndent:'-18.0pt'}}>
          ·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          3、 严禁在京东商城上以任何形式推广诱导他人点击自己的推广链接，一经查实，商家将有权扣除全部返利；<span></span>
        </p>
        <p class="MsoNormal" style={{marginLeft:'0cm',textIndent:'-18.0pt'}}>
          ·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          4、 不得通过各种途径发布、发放、销售京东优惠券或者进行代购行为，不得以人为手段恶意下小额订单，一经查实，商家有权取消订单并扣除所有返利所得；<span></span>
        </p>
        <p class="MsoNormal" style={{marginLeft:'0cm',textIndent:'-18.0pt'}}>
          ·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          5、 京东商城按完成时间确认返利。（如：2013年4月产生的订单，在4月30日前确认收货并无退换货，则该订单将按4月订单确认返利。若2013年4月产生的订单，在5月确认收货并无退换货，则该订单将按5月订单确认返利）；<span></span>
        </p>
        <p class="MsoNormal" style={{marginLeft:'0cm',textIndent:'-18.0pt'}}>
          ·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          6、刷单、批发、用于再度销售或者商业用途的订单，均无返利，一经发现以上行为，返利网将有权扣除对应返利；<span></span>
        </p>
        <p class="MsoNormal" style={{marginLeft:'0cm',textIndent:'-18.0pt'}}>
          ·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          7、 货物为优惠或使用优惠券或礼品卡的订单，订单中的跟单金额为0，返利按实际支付金额返利。<span></span>
        </p>

        <b>9.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </b><b>已经下单了但在花得值上查不到怎么办？</b><b></b>
        <p class="MsoNormal">
          1、若已经过了跟单时间但是未查询到订单，您可以查看该商城的详细返利规则及注意事项，确认您要购买的商品及订单信息是否有返现；（例如某些商城注意事项规定：开增值税发票的订单不跟单，不返现）<span></span>
        </p>
        <p>
          2、您的下单流程是否正确：<span></span>
        </p>
        <p>
          （<span>1</span>） 是否将商品提前放入了购物车，直接通过花得值跳转至商家购物车下单结算了；<span></span>
        </p>
        <p>
          （<span>2</span>） 若无法确认原因，您也可以及时联系商家取消订单，然后通过花得值“领券购买”重新下单（注意：重新下单时不要从之前的订单中直接点击商品购买）。下单后，可以等订单中心显示订单后再去商家网站付款。<span></span>
        </p>

      </div>
    )}
}

export default Help;

const styles = {

  fixedTop: {
    zIndex: 900,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#fdde4a',
  },


  navTitle: {
    color: '#333',
    fontSize: '0.45rem',
  },

  back: {
    color: '#333',
    fontSize: '0.36rem',
  },

  back_icon: {
    color: '#333',
  },

  navbar: {
    backgroundColor: '#fdde4a',
    marginop: '0.3rem',
    marginBottom: '-0.2rem',
  },

  centerTitle: {
    color: '#333',
    fontSize: '0.45rem',
    backgroundColor: '#fdde4a',
    marginop: '0.3rem',
    marginBottom: '-0.2rem',
    width:'100%',
    height:'0.8rem',
    textAlign:'center',
    paddingTop:'0.3rem',
  },


};

import {Modal, Button} from 'antd-mobile';
import React from "react";
import {connect} from "dva/index";
import closeImg from "../../../../../src/assets/close1.png";

class Inform extends React.Component {
  constructor(props) {
    super(props);

  }



  render() {
    let price = this.props.price;
    let backPrice = null;
    if (price){
      backPrice = 5;
    }

    return (
    <Modal
      visible={this.props.visible}
      transparent
      maskClosable={false}
    >
      <div style={styles.container}>

        <div style={styles.title_div}>
          <span style={styles.title}>小提示</span>
          <img src={closeImg} style={styles.close_img} onClick={()=>this.props.closeInform()}/>
        </div>

        <div style={styles.no_text}>
          <div style={styles.no}>1</div>
          跳转后先领券
        </div>
        <div style={styles.no_text}>
          <div style={styles.no}>2</div>
          参团券后实付
          <span style={styles.price_text}>¥{this.props.price}</span>
        </div>
        <div style={styles.no_text}>
          <div style={styles.no}>3</div>
          关注公众号，坐等
          <span style={styles.price_text}>¥{backPrice}</span>
          奖励到账
        </div>

        <div style={styles.info_text}>
          <span>奖励需在商家规定的退货周期后到账</span>
          <br/>
          <span>(预计2019年2月25号)</span>
        </div>

        <Button onClick={() =>{this.props.toCouponUrl()}}
                style={styles.button}>立即领券</Button>
      </div>
    </Modal>


    )
  }
}
export default Inform;


const styles = {

  container: {
    width: '100%',
    margin: '0 auto',
    color: '#000',
    textAlign:'left'
  },

  title_div: {
    width: '100%',
    margin: '0 auto',
    color: '#000',
    textAlign:'center',
  },

  title: {
    width: '2rem',
    margin: '0 auto',
    fontWeight:'bold',
  },

  close_img: {
    float:'right',
    width: '0.6rem',
    height: '0.6rem',
    borderRadius: '0.2rem',
  },


  no: {
    display: 'inline-block',
    backgroundColor: '#ff5555',
    borderRadius:'0.25rem',
    width:'0.5rem',
    height:'0.5rem',
    textAlign:'center',
    lineHeight: '0.5rem',
    color:'#fff',
    marginRight:'0.2rem',
    fontWeight:'500',
  },

  no_text: {
    marginLeft:'0.2rem',
    marginTop:'0.25rem',
    marginBottom:'0.25rem',
    fontWeight:'bold',
    color:'#333333',
    fontSize:'0.35rem',
  },

  price_text: {
    fontWeight:'bold',
    color:'#ff0000',
    fontSize:'0.4rem',
  },

  info_text: {
    margin:'0.2rem',
    color:'#ff6666',
    fontSize:'0.25rem',
    textAlign:'center',
  },

  button: {
    margin: '0.25rem',
    backgroundColor: '#ff0000',
    borderRadius: '0.4rem',
    height: '0.8rem',
    textAlign: 'center',
    verticalAlign: 'middle',
    color: '#fff',
    // fontSize: '0.2rem',
    lineHeight: '0.8rem',
  },
};


import React from 'react';
import share from '../../../assets/111.png';

export default  class AdDetailComponent extends React.Component {


  constructor(props) {
    super(props);
  }
  componentDidMount() {
      document.getElementById("goods_detail_content").innerHTML = this.props.adContent;
    // document.getElementById("goods_detail_content").childNodes[0].firstChild.style.marginTop='0rem';
       // console.log(document.getElementById("goods_detail_content").childNodes);
      // if(document.getElementById("goods_detail_content").childNodes[0].childNodes[0]){
      //    document.getElementById("goods_detail_content").childNodes[0].childNodes[0].style.width = '100%'
      // }

      // document.getElementById("goods_detail_content").firstChild.firstChild
  }


  render(){
    return (
      <div>
        {
          this.props.flag !=null? <div id='goods_detail_content' style={{marginTop:'0rem'}}></div> : <div id='goods_detail_content' style={{marginTop:'1.4rem'}}></div>
        }

      </div>
    );
  }

}

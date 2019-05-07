import { Progress, Button, WingBlank, WhiteSpace } from 'antd-mobile';
import React from 'react';

 export class Process extends React.Component {
  render() {
    return (

          <div style={{backgroundColor:'white',width:'95%'}} >
            <Progress
              percent={this.props.percent}
              // percent={100}
              position="normal"
              style={{height:'0.3rem',borderRadius:'0.14rem'}}
              barStyle={{ border: '0.15rem solid #FE733B',borderRadius: '0.14rem'}}
              />
          </div>
    );
  }
}

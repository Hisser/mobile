import React, {Component} from 'react'

export class CountTime extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hour: 0,
      min: 0,
      second: 0,
      remainingTime:  parseInt((props.time + 86400000 - new Date().getTime()) / 1000) ?
        parseInt((props.time + 86400000 - new Date().getTime()) / 1000) : 86400,
      isRender:false,
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.time!== this.props.time) {
      this.setState({
        remainingTime:parseInt((nextProps.time+86400000-new Date().getTime())/1000)
      })
    }
  }

  componentDidMount() {
    //倒计时总的秒数
    let interval = setInterval(() => {
      let msec = this.state.remainingTime;
      if (msec > 0) {
        let newHour = parseInt(msec / (60 * 60));
        let newMin = parseInt((msec - (newHour * 60 * 60)) / 60);
        let newSecond = msec - (newHour * 60 * 60) - (newMin * 60);
        this.setState({
          hour: newHour < 10 ? '0' + newHour : newHour,
          min: newMin < 10 ? '0' + newMin : newMin,
          second: newSecond < 10 ? '0' + newSecond : newSecond,
          remainingTime: --msec,
          isRender: true,
        })

      } else {
        this.setState({
          hour: 0,
          min: 0,
          second: 0,
          remainingTime: 0,
          isRender: true,
        });
          clearInterval(interval);


      }
    }, 1000);

  }

  render() {
    const {
      hour,
      min,
      second,
      isRender,
      remainingTime,
    } = this.state;

    return (

      this.props.flag == 'mycut' ?
        (
          <div style={{color: 'white', width: '100%', display: 'inline-block'}}>
            { isRender ? ( remainingTime<=0 ?
                <span style={{fontSize: '0.4rem', fontWeight: '600', fontFamily: 'Microsoft YaHei', color: 'red'}}>已过期</span> :
                <span style={{fontSize: '0.4rem', fontWeight: '600', fontFamily: 'Microsoft YaHei'}}>倒计时：{hour}:{min}:{second} 后结束</span>
            ) : null}
          </div>
        )
        :
        <div style={{marginLeft: '0.1rem', color: 'red', fontSize: '0.4rem', width: '100%', display: 'inline-block'}}>
          {
            isRender ? (remainingTime<= 0?
                <span style={{fontSize: '0.35rem', fontWeight: '600', fontFamily: 'Microsoft YaHei'}}>已过期</span> :
                <span style={{fontSize: '0.35rem', fontWeight: '600', fontFamily: 'Microsoft YaHei'}}>倒计时：{hour}:{min}:{second}</span>
            ) : null}
        </div>
    )
  }
}



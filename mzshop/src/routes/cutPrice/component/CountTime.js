import React, {Component} from 'react'

export class CountTime extends Component {

  state = {
    hour: 0,
    min: 0,
    second: 0,
    remainingTime: 86400,
    isRender:false
  };

  commonData = {
    //remainingTime: parseInt((this.props.time+86400000-new Date().getTime())/1000),
    remainingTime: null
  };

  componentWillReceiveProps(props) {
    // if (this.commonData.remainingTime === 86400) {
      this.commonData.remainingTime =parseInt((props.time+86400000-new Date().getTime())/1000)
    // }
  }

  componentDidMount() {

  }

  componentWillMount() {

    this.commonData.remainingTime = parseInt((this.props.time+


      -new Date().getTime())/1000)?parseInt((this.props.time+86400000-new Date().getTime())/1000):86400
    //倒计时总的秒数
    let interval = setInterval(() => {
      let msec = this.commonData.remainingTime;
      if (msec > 0) {
        this.commonData.remainingTime--;
        let newHour = parseInt(msec / (60 * 60));
        let newMin = parseInt((msec - (newHour * 60 * 60)) / 60);
        let newSecond = msec - (newHour * 60 * 60) - (newMin * 60);
        this.setState({
          hour: newHour < 10 ? '0' + newHour : newHour,
          min: newMin < 10 ? '0' + newMin : newMin,
          second: newSecond < 10 ? '0' + newSecond : newSecond,
          isRender:true
        })
      } else {
        clearInterval(interval)
        this.setState({
          isRender:true
        })
      }
    }, 1000)
  }

  render() {
    const {
      hour: _hour,
      min: _min,
      second: _second,
      isRender:_isRender
    } = this.state;

    return (

      this.props.flag =='mycut' ?

        (

          <div style={{
            color: 'white',
            width: '100%',
            display: 'inline-block'
          }}>
            { _isRender?( _hour===0&&_min===0&_second===0    ?
                <span style={{fontSize: '0.4rem', fontWeight: '600',fontFamily:'Microsoft YaHei',color: 'red'}}>已过期</span>   :
                <span style={{fontSize: '0.4rem', fontWeight: '600',fontFamily:'Microsoft YaHei'}}>倒计时：{_hour}:{_min}:{_second} 后结束</span>
            ):null}
          </div>
        )
        :
        <div style={{
          marginLeft:'0.1rem',
          color: 'red',
          fontSize: '0.4rem',
          width: '100%',
          display: 'inline-block'
        }}>
          {
            _isRender?(
              _hour===0&&_min===0&_second===0?
                <span style={{fontSize: '0.35rem', fontWeight: '600',fontFamily:'Microsoft YaHei'}}>已过期</span>:
                <span style={{fontSize: '0.35rem', fontWeight: '600',fontFamily:'Microsoft YaHei'}}>倒计时：{_hour}:{_min}:{_second}</span>
            ):null}

        </div>

    )
  }
}



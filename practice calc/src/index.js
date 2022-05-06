import ReactDOM from 'react-dom'
import React from 'react'


class Index extends React.Component {
    state = {
        second:0,
        minute:0,
        hour:0,
        startdisabled:false,
        interval:'',
    }
    onStartClick = ()=> {
        this.setState({
            startdisabled:true
        })
        let a = setInterval(()=> {
                const {second, minute, hour} = this.state
                if (second === 59) {
                    if(minute === 59){
                        this.setState({
                            second:0,
                            minute: 0,
                            hour: hour +1
                        })
                    }
                    else{
                        this.setState({
                            second: 0,
                            minute:minute + 1
                        })
                    }
                } else {
                    this.setState({
                        second: this.state.second + 1
                    })
                }
            }
            ,1000)
            this.setState({
                interval: a
            })
    }
    onStopClick = ()=> {
        clearInterval(this.state.interval)
        this.setState({
            startdisabled:false
        })
    }
    onIntervalClick = ()=>{
        setTimeout(()=>{
            clearInterval(this.state.interval)
        }, 10000)
        this.setState({
            startdisabled:false
        })
    }
    onRestartClick = ()=> {
        clearInterval(this.state.interval)
        this.setState({
            startdisabled:false,
            second:0,
            minute:0,
            hour:0
        })
    }
    render() {
        const {second, minute, hour, startdisabled, intervaldisabled} = this.state
        return <div className={'container my-5'}>
            <div className="row">
                <div className="col-md-4 offset-3">
                    <div className="card">
                        <div className="card-header">
                            <h1>StopWatch</h1>
                        </div>
                        <div className="card-body text-center"><h1>{hour}h:{minute}m:{second}s</h1></div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <button className={'btn btn-success mx-1'} onClick={this.onStartClick} disabled={startdisabled}>Start</button>
                                    <button className={'btn btn-warning mx-1'} onClick={this.onStopClick}>Stop</button>
                                    <button className={'btn btn-info mx-1'} onClick={this.onIntervalClick}>Interval</button>
                                    <button className={'btn btn-danger mx-1'} onClick={this.onRestartClick}>Restart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
ReactDOM.render(<Index/>, document.getElementById('root'))
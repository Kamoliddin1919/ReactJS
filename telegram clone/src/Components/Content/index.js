import React, {Component} from 'react';
import './index.css'

class Index extends Component {
    state={
     inputValue:''
    }
    changeMessage=(event)=>{
      this.setState({
          inputValue:event.target.value
      })
    }
    sendMessage=()=>{
     let from = 3
     let to = this.props.selectedUser.id
     let text = this.state.inputValue
     this.props.sendMessages(from,to, text)
        this.setState({
            inputValue:''
        })
    }

    render() {
        const{selectedUser,history}=this.props
        const{inputValue}=this.state
        return (
            <div>
                {selectedUser ? <div className={'content'}>
                   <div className="row">
                       <div className="col-md-12 content-header">
                            <h1>{selectedUser.firstName+' '+selectedUser.lastName+' '+selectedUser.phone}</h1>
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-12">
                           <input type="text" className={'form-control'} value={inputValue} onChange={this.changeMessage}/>
                           <button className={'btn btn-success'} onClick={this.sendMessage}>send</button>
                       </div>
                   </div>
                    <div className="row bg-white" style={{'height':'500px'}}>
                        <div className="col-md-12">
                        {history.map((item)=>{
                            return <div className={'row'}>
                                <div className={`col-md-7 message ${item.from ===3 ? 'offset-5' : ''}`}>
                                    <p className={'text'}>{item.text+' '}
                                        <span className={'date'}>{item.date}</span>
                                    </p>
                                </div>
                            </div>
                        })}</div>
                    </div>
                </div> : <div> </div>}
            </div>
        );
    }
}

export default Index;
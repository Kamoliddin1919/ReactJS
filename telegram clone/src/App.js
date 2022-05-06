import React, {Component} from 'react';
import Sider from './Components/Sider/index'
import Content from './Components/Content/index'
import './index.css'

class App extends Component {
    state={
        users:[],
        selectedUser:'',
        messages:[],
        history:[]
    }
    addUser=(firstName,lastName,phone)=>{
       let a=this.state.users
        a.push({id:a.length,firstName:firstName,lastName:lastName,phone:phone})
        this.setState({
            users:a,
            selectedUser:{}
        })
        localStorage.setItem('users',JSON.stringify(a))
    }
    sendMessages=(fromId,toId,text)=>{
     let date=new Date()
        let message={
        from:fromId,
         to:toId,
         text:text,
         date:date.getHours()+':'+date.getMinutes()}
        let a=this.state.messages
        a.push(message)
        this.setState({
            messages:a
        })
        localStorage.setItem('messages',JSON.stringify(a))
        this.getMessageHistory(this.state.users.filter(item=>item.id===toId)[0])
}

    componentDidMount() {
        let usersString=localStorage.getItem('users')
        if(usersString){
        let userArray=JSON.parse(usersString)
        this.setState({
            users:userArray
        })}
        let selectedUser=localStorage.getItem('selectedUser')
        if(selectedUser){
            let a=JSON.parse(selectedUser)
            this.setState({
                selectedUser:a
            })
           this.getMessageHistory(a)}
        let messages=localStorage.getItem('messages')
        if(messages){
            let a=JSON.parse(messages)
            this.setState({
                messages:a
            })
        }
    }
    selectUser=(user)=>{
        this.setState({
            selectedUser:user
        })
        localStorage.setItem('selectedUser',JSON.stringify(user))
        this.getMessageHistory(user)
    }

    getMessageHistory=(user)=>{
        let b=localStorage.getItem('messages')
        if(b){
        let messages=JSON.parse(b)
        let history=messages.filter(item=>item.from===3 && item.to===user.id || item.from===user.id && item.to===3)
        this.setState({
            history
        })
    }}

    render() {
        const {selectedUser,users,history}=this.state
        return (
            <div className={'container-fluid'}>
                <div className="row">
                    <div className="col-md-3 sider-parent">
                        <Sider users={users} addUser={this.addUser} selectUser={this.selectUser} selectedUser={selectedUser}/>
                    </div>
                    <div className="col-md-9 content-parent">
                        <Content selectedUser={selectedUser} sendMessages={this.sendMessages} history={history}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
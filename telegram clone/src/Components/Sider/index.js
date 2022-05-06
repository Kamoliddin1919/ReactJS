import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import './index.css'

class Index extends Component {
    state={
        modalVisible: false
    }
    modalToggle=()=>{
        this.setState({
            modalVisible:!this.state.modalVisible
        })
    }
    submitForm=(event)=>{
        event.preventDefault()
        let firstName=event.target[0].value;
        let lastName=event.target[1].value;
        let phone=event.target[2].value;
        this.props.addUser(firstName,lastName,phone)
    }
    userClicked=(user)=>{
     this.props.selectUser(user)
    }
    render() {
      const{modalVisible}=this.state
        const{users,selectedUser}=this.props
        return (
            <div className={'sider'}>
                <button className={'btn btn-dark btn-block mt-1'} onClick={this.modalToggle}>add user</button>
                <hr/>
                <ul className={'list-group'}>
                    {
                        users.map((item)=>(<li onClick={()=>this.userClicked(item)} className={`list-group-item user ${selectedUser.id===item.id ? 'active':''}`}>{item.firstName+' '+item.lastName}</li>))
                    }
                </ul>
            <Modal isOpen={modalVisible} toggle={this.modalToggle}>
                <ModalHeader>
                     Add user
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={this.submitForm} id={'addUser'}>
                        FirstName<input className={'form-control'} type="text"/>
                        LastName<input className={'form-control'} type="text"/>
                        Phone<input className={'form-control'} type="text"/>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-success'} onClick={this.modalToggle} form={'addUser'}>save</button>
                    <button className={'btn btn-danger'} onClick={this.modalToggle}>close</button>
                </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Index;
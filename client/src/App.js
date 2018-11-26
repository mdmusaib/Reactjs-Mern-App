import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
// import { addUser } from './actions';
// import { updateUser } from '../actions';
// import { deleteUser } from '../actions';



class App extends Component {

  componentDidMount(){
    axios.post('//localhost:5000/api/allUser')
      .then(res=> {if(res.status!== 400) {this.props.dispatch({ type: "USERS", data: res.data})}else{console.log(res)}})
      .catch(err=>console.log(err.response));
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    console.log('Event: Form Submit');
    const data={
      "username":this.refs.username.value,
      "address":this.refs.address.value,
      "contact":this.refs.contact.value,
      "email":this.refs.email.value
    }


  axios.post('//localhost:5000/api/add',data)
    .then(res=> {if(res.status !== 400){this.props.dispatch({ type: "ADDUSER", data: res.data})}else{console.log(res)}})
    .catch(err=>console.log(err.response));

   document.getElementById("myForm").reset();
  }

  handleDelete=(id)=>{
    const data={
      "id":id
    }
    axios.post('//localhost:5000/api/delete',data)
    .then(res=> {if(res.status !== 400){this.props.dispatch({type: "DELETEUSER" , data : id})}else{console.log(res)}})
    .catch(err=>console.log(err.response));
  }
  

  handleEdit=(data)=>{
    
    this.refs.username1.value=data.username;
    this.refs.address1.value=data.address;
    this.refs.contact1.value=data.contact;
    this.refs.email1.value=data.email;
    this.refs.userID.value=data._id;

  }

  handleUpdate=()=>{
    const updateData={
      "username": this.refs.username1.value,
      "address":this.refs.address1.value,
      "contact":this.refs.contact1.value,
      "email":this.refs.email1.value,
      "id":this.refs.userID.value
    }

    if(updateData.id != ""){

    axios.post('//localhost:5000/api/update',updateData)
      .then(res=> {if(res.status!== 400 && res.statusText == "OK") {this.props.dispatch({ type: "UPDATEUSER", data: res.data })}else{console.log(res)}})
      .catch(err=>console.log(err.response));

}else{
  alert("Something Error in Update!");
}
    // console.log("data",updateData);
    // console.log('id',this.refs.userID.value);
  }

  renderProducts=()=>{
        return this.props.user.map(user => 
            (
                    <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.address}</td>
                    <td>{user.contact}</td>
                    <td>{user.email}</td>
                    <td><button data-toggle="modal" data-target="#myModal1" onClick={this.handleEdit.bind(this,user)}>Edit</button></td>
                    <td><button  onClick={this.handleDelete.bind(this,user)}>Delete</button></td>
                </tr>
            )
            )
    }


  render() {
    console.log(this.props);
    return (
      <div>

<button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
  Add User
</button>

<div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
        <h4 className="modal-title" id="myModalLabel">Add User Information</h4>
      </div>
      <div className="modal-body">
    <form id="myForm">
  <div className="form-group">
    <label htmlFor="username">UserName:</label>
    <input type="username" class="form-control" ref="username" id="username" name="username" required />
  </div>
  <div className="form-group">
    <label htmlFor="address">Address:</label>
    <input type="text" class="form-control" id="address" ref="address" name="address" required />
  </div>
  <div className="form-group">
    <label htmlFor="contact">Contact:</label>
    <input type="text" class="form-control" id="contact" ref="contact" name="contact" required />
  </div>

  <div className="form-group">
    <label htmlFor="email">Email:</label>
    <input type="text" class="form-control" id="email" ref="email" name="email" required/>
  </div>

  <div className></div>
  </form>
      </div>
      
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSubmit}>Add</button>
      </div>
    </div>
  </div>
</div>
  

  <div className="modal fade" id="myModal1" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
        <h4 className="modal-title" id="myModalLabel">Edit User Information</h4>
      </div>
      <div className="modal-body">
      <form id="myForm1">
  <div class="form-group">
    <label htmlFor="username">UserName:</label>
    <input type="username" className="form-control" ref="username1"  required />
  </div>
  <div class="form-group">
    <label htmlFor="address">Address:</label>
    <input type="text" className="form-control"  ref="address1" required />
  </div>
  <div class="form-group">
    <label htmlFor="contact">Contact:</label>
    <input type="text" className="form-control"  ref="contact1"  required />
  </div>

  <div class="form-group">
    <label htmlFor="email">Email:</label>
    <input type="text" className="form-control" ref="email1"  required/>
  </div>
  <input type="hidden" ref="userID" />
  </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleUpdate}>Save</button>
      </div>
    </div>
  </div>
</div>



        <table className="table">
                    <thead>
                        <tr>
                            <th>UserName</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Edit Action </th>
                            <th>Delete Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderProducts()}
                    </tbody>
                </table>

        </div>
    )
  }
}
const mapStateToProps=state=>({
  user:state.user
});
export default connect(mapStateToProps)(App);
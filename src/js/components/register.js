import React,{Component} from "react";

class Register extends Component{
    constructor(props){
        super(props);
        this.username=null;
        this.pass=null;
        this.confirmPass=null;
        this.registerUser= this.registerUser.bind(this);
        this.resetData = this.resetData.bind(this);
    }
    registerUser(){
        console.log(this.username.value,this.pass.value,this.confirmPass.value)
        if(!this.username.value){
            alert("User name not provided");
            return;
        }
        if(!this.pass.value){
            alert("Password not provided");
            return;
        }
        if(!this.confirmPass.value){
            alert("Please re renter password");
            return;
        }
        if(this.pass.value!==this.confirmPass.value){
            alert("Passwords do not match");
            return;
        }
        let This = this;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST","/registerUser","async");
        xmlhttp.setRequestHeader("Content-Type","application/json");
        xmlhttp.send(JSON.stringify({username:this.username.value,password:this.pass.value}));
        xmlhttp.onreadystatechange=function(){
            if(this.readyState===4 && this.status===200){
                let text = JSON.parse(this.responseText);
                if(text.error){
                    alert(text.msg);
                }
                else alert(text.msg);
                This.resetData();
            }
        }
    }
    resetData(){
        this.username.value="";
        this.pass.value="";
        this.confirmPass.value="";
    }
    render(){
        return (<div>
            <h2>Register User</h2>
            <div>
                <p>User Name:</p>
                <input type="text" ref ={(e)=>this.username=e}/>
            </div>
            <div>
                <p>Password:</p>
                <input type="password" ref ={(e)=>this.pass=e}/>
            </div>
            <div>
                <p>Confirm Password:</p>
                <input type="password" ref ={(e)=>this.confirmPass=e}/>
            </div>
            <div>
                <button onClick={this.registerUser}>Register</button>
                <button onClick={this.resetData}>Reset</button>
            </div>
        </div>)
    }
}

export default Register;
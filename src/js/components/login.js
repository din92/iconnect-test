import React,{Component} from "react";

class Login extends Component{
    constructor(props){
        super(props);
        this.login= this.login.bind(this)
        this.resetData = this.resetData.bind(this);
    }
    login(){
        if(!this.username.value){
            alert("User name not provided");
            return;
        }
        if(!this.pass.value){
            alert("Password not provided");
            return;
        }
        let This = this;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST","/loginUser","async");
        xmlhttp.setRequestHeader("Content-Type","application/json");
        xmlhttp.send(JSON.stringify({username:this.username.value,password:this.pass.value}));
        xmlhttp.onreadystatechange=function(){
            if(this.readyState===4 && this.status===200){
                let text = JSON.parse(this.responseText);
                if(text.error){
                    alert(text.msg);
                }
                else {
                    document.cookie= text.token;
                    localStorage.setItem("token",text.token);
                    alert("login successfull");
                }
                This.resetData();
            }
        }
    }
    resetData(){
        this.username.value="";
        this.pass.value="";
    }
    render(){
        return (<div>
            <h2>Login User</h2>
            <div>
                <p>User Name:</p>
                <input type="text" ref ={(e)=>this.username=e}/>
            </div>
            <div>
                <p>Password:</p>
                <input type="password" ref ={(e)=>this.pass=e}/>
            </div>
         
            <div>
                <button onClick={this.login}>Login</button>
                <button onClick={this.resetData}>Cancel</button>
            </div>
        </div>)
    }
}

export default Login;
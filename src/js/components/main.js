import React,{Component} from "react";
import "../../styles/app.css";
import Menu from "../components/menu";

class Main extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (<div className="main">
            <Menu></Menu>
        </div>)
    }
}

export default Main;
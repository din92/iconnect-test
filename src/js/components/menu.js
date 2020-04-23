import React,{Component} from "react";
import { 
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from "react-router-dom";
import Register from "./register";
import Login from "./login";

class Menu extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div>
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route path="/login">
                        <Login></Login>
                    </Route>
                    <Route path="/register">
                        <Register></Register>
                    </Route>
                </Switch>
            </Router>
        </div>)
    }
}

export default Menu;
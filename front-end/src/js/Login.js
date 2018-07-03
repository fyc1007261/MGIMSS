import React , {Component} from 'react';
import { Redirect, Link} from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {redirect: false, filterUsername: '', filterPassWord: '', status: "login", newUsername: '', newPassword:''};
    }
    handleUsernameChange = (e) => {
        this.setState({filterUsername:e.target.value});
    };
    handlePasswordChange = (e) => {
        this.setState({filterPassWord:e.target.value});
    };
    handlenewUsernameChange = (e) => {
        this.setState({newUsername:e.target.value});
    };
    handlenewPasswordChange = (e) => {
        this.setState({newPassword:e.target.value});
    };
    handletoRegisterClick = () => {
        this.setState({status: "register"});
    };
    handletoLoginClick = () => {
        this.setState({status: "login"});
    };
    handleConfirmClick = () => {
        // let success = 0;
        // $.ajax({
        //     url:"/userlogin",
        //     data:{
        //         username:this.state.filterUsername,
        //         password:this.state.filterPassWord
        //     },
        //     context:document.body,
        //     async:false,
        //     type:"get",
        //     success: function(data) {
        //         if(data !== "null") {
        //             if(data === "false")
        //                 success = 1;
        //             else if (data === "admin")
        //                 success = 3;
        //             else
        //                 success = 2;
        //         }
        //     }
        // });
        // if(success === 2) {
        //     alert("Login Success !");
        //     setLogin(true);
        //     this.setState({redirect: true});
        // }
        // else if(success === 1)
        //     alert("The account is banned.");
        // else if(success === 3) {
        //     alert("Login Success !");
        //     setLogin(true);
        //     setAdmin(true);
            this.setState({redirect: true});
        // }
        // else
        //     alert("Failed, please try again.");
    };

    render() {
        if (this.state.redirect) {
            return (
                <Redirect push to="/mgimss"/>
            );
        }
        if(this.state.status === "login") {
            return (
                <div>
                    <div>
                        <p>
                            Login
                        </p>
                        <p>
                            <button onClick={this.handletoRegisterClick}>New user?</button>
                        </p>
                    </div>
                    <div>
                        <input type="text" placeholder="Username" value={this.state.filterUsername}
                               onChange={this.handleUsernameChange}/>
                        <input type="password" placeholder="Password" value={this.state.filterPassWord}
                               onChange={this.handlePasswordChange}/>
                    </div>
                    <div>
                        <button onClick={this.handleConfirmClick}>Login</button>
                    </div>
                </div>
            );
        }
        return(
            <div>
                <div>
                    <p>
                        Register
                    </p>
                    <p>
                        <button onClick={this.handletoLoginClick}>Have an account?</button>
                    </p>
                </div>
                <div>
                    <input type="text" placeholder="Username" value={this.state.newUsername}
                           onChange={this.handlenewUsernameChange}/>
                    <input type="password" placeholder="Password" value={this.state.newPassword}
                           onChange={this.handlenewPasswordChange}/>
                </div>
                <div>
                    <button onClick={this.handleConfirmClick}>Register</button>
                </div>
            </div>
        );
    }
}

export default Login;
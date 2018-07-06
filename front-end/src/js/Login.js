import React , {Component} from 'react';
import { Redirect} from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {filterUsername:'', filterPassWord:'', redirect:false};
    }

    handleUsernameChange = (e) => {
        this.setState({filterUsername:e.target.value});
    };
    handlePasswordChange = (e) => {
        this.setState({filterPassWord:e.target.value});
    };
    handleLoginClick = () => {
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
        if(this.state.redirect) {
            return(
                <Redirect push to="/mgimss"/>
            );
        }
        return(
            <div>
                <div>
                    <input type="text" placeholder="Username" value={this.state.filterUsername}
                           onChange={this.handleUsernameChange}/>
                    <input type="password" placeholder="Password" value={this.state.filterPassWord}
                           onChange={this.handlePasswordChange}/>
                </div>
                <div>
                    <button onClick={this.handleLoginClick}>Login</button>
                </div>
            </div>
        );
    }
}

class InputUsername extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.testUsername = this.testUsername.bind(this);
        this.state = {success: 0};
    }
    testUsername() {
        // const new_username = this.props.value;
        // let err = "";
        // $.ajax({
        //     url:"/checkusername",
        //     data:{
        //         username:new_username
        //     },
        //     context:document.body,
        //     async:false,
        //     type:"get",
        //     success: function(data) {
        //         if(data === "false") {
        //             err = "username already exists";
        //         }
        //     }
        // });
        // if(err !== "") {
        //     this.setState({success:-1});
        //     this.props.SetErr(1);
        // }
        // else {
        //     this.setState({success:1});
        //     this.props.SetErr(0);
        // }
    }
    handleChange(e) {
        const username = e.target.value;
        this.props.onUsernameChange(username);
        if(username.length < 6) {
            this.setState({success: 0});
            this.props.SetErr(1);
        }
        else {
            this.setState({success:1});
            this.props.SetErr(0);
        }
    }
    render() {
        if(this.state.success === 0) {
            return (
                <form>
                    <div className="col-md-2 col-md-offset-5">
                        <input type="text" className="form-control is-invalid" placeholder="Username" value={this.props.value} onChange={this.handleChange} required/>
                        <div className="invalid-feedback">
                            Username must be at least 6 letters
                        </div>
                    </div>
                </form>
            );
        }
        if(this.state.success === -1)  {
            return (
                <form>
                    <div className="col-md-2 col-md-offset-5">
                        <input type="text" className="form-control is-invalid" placeholder="Username" value={this.props.value} onChange={this.handleChange} required/>
                        <div className="invalid-feedback">
                            Username already exists
                        </div>
                    </div>
                </form>
            );
        }
        return (
            <form>
                <div className="col-md-2 col-md-offset-5">
                    <input type="text" className="form-control is-valid" placeholder="Username" value={this.props.value} onChange={this.handleChange} onBlur={this.testUsername} required/>
                    <div className="valid-feedback">
                        √
                    </div>
                </div>
            </form>
        );
    }
}

class InputPassword extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.testPassword = this.testPassword.bind(this);
        this.state = {success: 0};
    }
    testPassword() {
        const new_password = this.props.value;
        let p_valid = 0;
        for (let i = 0; i < new_password.length; i++) {
            if (new_password.charAt(i) >= '0' && new_password.charAt(i) <= '9') {
                if (p_valid === 0)
                    p_valid = 1;
                if (p_valid === 2) {
                    p_valid = 3;
                    break;
                }
            }
            if ((new_password.charAt(i) >= 'a' && new_password.charAt(i) <= 'z') || (new_password.charAt(i) >= 'A' && new_password.charAt(i) <= 'Z')) {
                if (p_valid === 0)
                    p_valid = 2;
                if (p_valid === 1) {
                    p_valid = 3;
                    break;
                }
            }
        }
        if (p_valid !== 3) {
            this.setState({success: -1});
            this.props.SetErr(1);
        }
        else {
            this.setState({success: 1});
            this.props.SetErr(0);
        }
    }
    handleChange(e) {
        const password = e.target.value;
        this.props.onPasswordChange(password);
        if(password.length < 8) {
            this.setState({success: 0});
            this.props.SetErr(1);
        }
        else {
            this.testPassword();
        }
    }
    render() {
        if(this.state.success === 0) {
            return (
                <form>
                    <div className="col-md-2 col-md-offset-5">
                        <input type="password" className="form-control is-invalid" placeholder="Password" value={this.props.value} onChange={this.handleChange} required/>
                        <div className="invalid-feedback">
                            Password must be at least 8 letters
                        </div>
                    </div>
                </form>
            );
        }
        if(this.state.success === -1)  {
            return (
                <form>
                    <div className="col-md-2 col-md-offset-5">
                        <input type="password" className="form-control is-invalid" placeholder="Password" value={this.props.value} onChange={this.handleChange} required/>
                        <div className="invalid-feedback">
                            Password must contain both number and letter
                        </div>
                    </div>
                </form>
            );
        }
        return (
            <form>
                <div className="col-md-2 col-md-offset-5">
                    <input type="password" className="form-control is-valid" placeholder="Password" value={this.props.value} onChange={this.handleChange} required/>
                    <div className="valid-feedback">
                        √
                    </div>
                </div>
            </form>
        );
    }
}

class InputPassword2 extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {success: 0};
    }
    handleChange(e) {
        const password2 = e.target.value;
        this.props.onPassword2Change(password2);
        const password = this.props.password;
        if(password !== password2) {
            this.setState({success: 0});
            this.props.SetErr(1);
        }
        else {
            this.setState({success:1});
            this.props.SetErr(0);
        }
    }
    render() {
        if(this.state.success === 0) {
            return (
                <form>
                    <div className="col-md-2 col-md-offset-5">
                        <input type="password" className="form-control is-invalid" placeholder="ConfirmPassword" value={this.props.value} onChange={this.handleChange} required/>
                        <div className="invalid-feedback">
                            The two inputs must be the same
                        </div>
                    </div>
                </form>
            );
        }
        return (
            <form>
                <div className="col-md-2 col-md-offset-5">
                    <input type="password" className="form-control is-valid" placeholder="ConfirmPassword" value={this.props.value} onChange={this.handleChange} required/>
                    <div className="valid-feedback">
                        √
                    </div>
                </div>
            </form>
        );
    }
}

class InputEmail extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {success: 0};
    }
    handleChange(e) {
        const email = e.target.value;
        this.props.onEmailChange(email);
        let re2 = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!re2.test(email)) {
            this.setState({success: 0});
            this.props.SetErr(1);
        }
        else {
            this.setState({success:1});
            this.props.SetErr(0);
        }
    }
    render() {
        if(this.state.success === 0) {
            return (
                <form>
                    <div className="col-md-2 col-md-offset-5">
                        <input type="text" className="form-control is-invalid" placeholder="Email" value={this.props.value} onChange={this.handleChange} required/>
                        <div className="invalid-feedback">
                            Invalid email format
                        </div>
                    </div>
                </form>
            );
        }
        return (
            <form>
                <div className="col-md-2 col-md-offset-5">
                    <input type="text" className="form-control is-valid" placeholder="Email" value={this.props.value} onChange={this.handleChange} required/>
                    <div className="valid-feedback">
                        √
                    </div>
                </div>
            </form>
        );
    }
}

class InputPhonenumber extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {success: 0};
    }
    handleChange(e) {
        const phonenumber = e.target.value;
        this.props.onPhonenumberChange(phonenumber);
        let re3=/^(1+\d{10})$/;
        if(!re3.test(phonenumber)) {
            this.setState({success: 0});
            this.props.SetErr(1);
        }
        else {
            this.setState({success:1});
            this.props.SetErr(0);
        }
    }
    render() {
        if(this.state.success === 0) {
            return (
                <form>
                    <div className="col-md-2 col-md-offset-5">
                        <input type="text" className="form-control is-invalid" placeholder="Phonenumber" value={this.props.value} onChange={this.handleChange} required/>
                        <div className="invalid-feedback">
                            Invalid phonenumber format
                        </div>
                    </div>
                </form>
            );
        }
        return (
            <form>
                <div className="col-md-2 col-md-offset-5">
                    <input type="text" className="form-control is-valid" placeholder="Phonenumber" value={this.props.value} onChange={this.handleChange} required/>
                    <div className="valid-feedback">
                        √
                    </div>
                </div>
            </form>
        );
    }
}

class Register extends Component {
    constructor() {
        super();
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setPassword2 = this.setPassword2.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPhonenumber = this.setPhonenumber.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
        this.SetErr1 = this.SetErr1.bind(this);
        this.SetErr2 = this.SetErr2.bind(this);
        this.SetErr3 = this.SetErr3.bind(this);
        this.SetErr4 = this.SetErr4.bind(this);
        this.SetErr5 = this.SetErr5.bind(this);
        this.state = {username:"", password:"", password2:"", email:"", phonenumber:"", err1:0, err2:0, err3:0, err4:0, err5:0, redirect: false};
    }
    setUsername(username) {
        this.setState({username : username});
    }
    setPassword(password) {
        this.setState({password : password});
    }
    setPassword2(password2) {
        this.setState({password2 : password2});
    }
    setEmail(email) {
        this.setState({email : email});
    }
    setPhonenumber(phonenumber) {
        this.setState({phonenumber : phonenumber});
    }
    checkUsername() {
        // const new_username = this.state.username;
        // let err = "";
        // $.ajax({
        //     url:"/checkusername",
        //     data:{
        //         username:new_username
        //     },
        //     context:document.body,
        //     async:false,
        //     type:"get",
        //     success: function(data) {
        //         if(data === "false") {
        //             err = "username already exists";
        //         }
        //     }
        // });
        // if(err !== "") {
        //     this.setState({err1:1});
        // }
        // else {
        //     this.setState({err:0});
        // }
    }
    SetErr1(err1) {
        this.setState({err1:err1});
    }
    SetErr2(err2) {
        this.setState({err2:err2});
    }
    SetErr3(err3) {
        this.setState({err3:err3});
    }
    SetErr4(err4) {
        this.setState({err4:err4});
    }
    SetErr5(err5) {
        this.setState({err5:err5});
    }
    handleRegisterClick = () => {
        this.checkUsername();
        let err1 = this.state.err1;
        let err2 = this.state.err2;
        let err3 = this.state.err3;
        let err4 = this.state.err4;
        let err5 = this.state.err5;
        if(err2 !== 0 || err3 !== 0 || err4 !== 0 || err5 !== 0 || err1 !== 0) {
            alert("Invalid input! Please check your information!");
        }
        else {
            // let new_username = this.state.username;
            // let new_password = this.state.password;
            // let new_email = this.state.email;
            // let new_phonenumber = this.state.phonenumber;
            // $.ajax({
            //     url:"/saveuser",
            //     data:{
            //         username:new_username,
            //         password:new_password,
            //         email:new_email,
            //         phonenumber:new_phonenumber
            //     },
            //     context:document.body,
            //     async:false,
            //     type:"get"
            // });
            // alert("Signup success");
            // $.ajax({
            //     url:"/userlogin",
            //     data:{
            //         username:new_username,
            //         password:new_password
            //     },
            //     context:document.body,
            //     async:false,
            //     type:"get"
            // });
            // setLogin(true);
            this.setState({redirect:true});
        }
    };

    render() {
        if(this.state.redirect) {
            return(
                <Redirect push to="/mgimss"/>
            );
        }
        return (
            <div>
                <div>
                    <InputUsername onUsernameChange={this.setUsername} value={this.state.username} SetErr={this.SetErr1}/>
                    <InputPassword onPasswordChange={this.setPassword} value={this.state.password} SetErr={this.SetErr2}/>
                    <InputPassword2 onPassword2Change={this.setPassword2} value={this.state.password2} password={this.state.password} SetErr={this.SetErr3}/>
                    <InputEmail onEmailChange={this.setEmail} value={this.state.email} SetErr={this.SetErr4}/>
                    <InputPhonenumber onPhonenumberChange={this.setPhonenumber} value={this.state.phonenumber} SetErr={this.SetErr5}/>
                </div>
                <div>
                    <button onClick={this.handleRegisterClick} >Register</button>
                </div>
            </div>
        );
    }
}

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {status: "login"};
    }

    handletoRegisterClick = () => {
        this.setState({status: "register"});
    };
    handletoLoginClick = () => {
        this.setState({status: "login"});
    };

    render() {
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
                    <Login/>
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
                <Register/>
            </div>
        );
    }
}

export default LoginPage;
import React , {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../css/css.css';
import '../css/bootstrap.css';
import '../css/style.css';
import '../css/font-awesome.css';

class Welcome extends Component {
    constructor() {
        super();
        this.state = {redirect:false};
    }
    handleLoginClick = () => {
        this.setState({redirect:true});
    };
    render() {
        console.log(this.state.redirect);
        if(this.state.redirect) {
            return (
                <Redirect push to="/login&register"/>
            );
        }
        return(
            <div>
                <div className="fade">
                </div>
                <header id="header" className="alt">
                    <div className="inner">
                        <h1>MGIMSS</h1>
                        <p>xxxxxxxx xxxxxxxxxx xxxx xxxxx x xxxxxx xxxxxx xxxx</p>
                    </div>
                </header>
                <div className="WelcomeButton">
                    <button className="button" onClick={this.handleLoginClick}>Start</button>
                </div>
            </div>
        );
    }
}

export default Welcome;
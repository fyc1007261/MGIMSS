import React , {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../css/css.css';

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
            return(
                <Redirect push to="/login"/>
            );
        }
        return(
            <div id="Welcome" className="alt">
                <div className="inner">
                    <h1>MGIMSS</h1>
                    <p>xxxxxx xxxxxx xxxxxx xxxxx xxxxxxx xxxxxxxxx xxxx</p>
                </div>
                <button onClick={this.handleLoginClick}>Login</button>
            </div>
        );
    }
}

export default Welcome;
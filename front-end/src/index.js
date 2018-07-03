import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import Welcome from './js/Welcome';
import Login from './js/Login';
import Main from './js/Main';

class MGIMSS extends Component {
    render() {
        return(
            <Router>
                <div>
                    <Route exact path="/" component={Welcome}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/mgimss" component={Main}/>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<MGIMSS />, document.getElementById('root'));
registerServiceWorker();

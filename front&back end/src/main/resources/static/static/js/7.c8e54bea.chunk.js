webpackJsonp([7],{268:function(e,t,a){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),r=a.n(n),s=a(9),c=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),u=function(e){function t(e){i(this,t);var a=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={modal:!1,large:!1,small:!1,primary:!1,success:!1,warning:!1,danger:!1,info:!1},a.toggle=a.toggle.bind(a),a.toggleLarge=a.toggleLarge.bind(a),a.toggleSmall=a.toggleSmall.bind(a),a.togglePrimary=a.togglePrimary.bind(a),a.toggleSuccess=a.toggleSuccess.bind(a),a.toggleWarning=a.toggleWarning.bind(a),a.toggleDanger=a.toggleDanger.bind(a),a.toggleInfo=a.toggleInfo.bind(a),a}return o(t,e),c(t,[{key:"toggle",value:function(){this.setState({modal:!this.state.modal})}},{key:"toggleLarge",value:function(){this.setState({large:!this.state.large})}},{key:"toggleSmall",value:function(){this.setState({small:!this.state.small})}},{key:"togglePrimary",value:function(){this.setState({primary:!this.state.primary})}},{key:"toggleSuccess",value:function(){this.setState({success:!this.state.success})}},{key:"toggleWarning",value:function(){this.setState({warning:!this.state.warning})}},{key:"toggleDanger",value:function(){this.setState({danger:!this.state.danger})}},{key:"toggleInfo",value:function(){this.setState({info:!this.state.info})}},{key:"render",value:function(){return r.a.createElement("div",{className:"animated fadeIn"},r.a.createElement(s._7,null,r.a.createElement(s.u,null,r.a.createElement(s.i,null,r.a.createElement(s.n,null,r.a.createElement("i",{className:"fa fa-align-justify"})," Bootstrap Modals"),r.a.createElement(s.j,null,r.a.createElement(s.e,{onClick:this.toggle,className:"mr-1"},"Launch demo modal"),r.a.createElement(s.Q,{isOpen:this.state.modal,toggle:this.toggle,className:this.props.className},r.a.createElement(s.T,{toggle:this.toggle},"Modal title"),r.a.createElement(s.R,null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),r.a.createElement(s.S,null,r.a.createElement(s.e,{color:"primary",onClick:this.toggle},"Do Something")," ",r.a.createElement(s.e,{color:"secondary",onClick:this.toggle},"Cancel"))),r.a.createElement(s.e,{onClick:this.toggleLarge,className:"mr-1"},"Launch large modal"),r.a.createElement(s.Q,{isOpen:this.state.large,toggle:this.toggleLarge,className:"modal-lg "+this.props.className},r.a.createElement(s.T,{toggle:this.toggleLarge},"Modal title"),r.a.createElement(s.R,null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),r.a.createElement(s.S,null,r.a.createElement(s.e,{color:"primary",onClick:this.toggleLarge},"Do Something")," ",r.a.createElement(s.e,{color:"secondary",onClick:this.toggleLarge},"Cancel"))),r.a.createElement(s.e,{onClick:this.toggleSmall,className:"mr-1"},"Launch small modal"),r.a.createElement(s.Q,{isOpen:this.state.small,toggle:this.toggleSmall,className:"modal-sm "+this.props.className},r.a.createElement(s.T,{toggle:this.toggleSmall},"Modal title"),r.a.createElement(s.R,null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),r.a.createElement(s.S,null,r.a.createElement(s.e,{color:"primary",onClick:this.toggleSmall},"Do Something")," ",r.a.createElement(s.e,{color:"secondary",onClick:this.toggleSmall},"Cancel"))),r.a.createElement("hr",null),r.a.createElement(s.e,{color:"primary",onClick:this.togglePrimary,className:"mr-1"},"Primary modal"),r.a.createElement(s.Q,{isOpen:this.state.primary,toggle:this.togglePrimary,className:"modal-primary "+this.props.className},r.a.createElement(s.T,{toggle:this.togglePrimary},"Modal title"),r.a.createElement(s.R,null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),r.a.createElement(s.S,null,r.a.createElement(s.e,{color:"primary",onClick:this.togglePrimary},"Do Something")," ",r.a.createElement(s.e,{color:"secondary",onClick:this.togglePrimary},"Cancel"))),r.a.createElement(s.e,{color:"success",onClick:this.toggleSuccess,className:"mr-1"},"Success modal"),r.a.createElement(s.Q,{isOpen:this.state.success,toggle:this.toggleSuccess,className:"modal-success "+this.props.className},r.a.createElement(s.T,{toggle:this.toggleSuccess},"Modal title"),r.a.createElement(s.R,null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),r.a.createElement(s.S,null,r.a.createElement(s.e,{color:"success",onClick:this.toggleSuccess},"Do Something")," ",r.a.createElement(s.e,{color:"secondary",onClick:this.toggleSuccess},"Cancel"))),r.a.createElement(s.e,{color:"warning",onClick:this.toggleWarning,className:"mr-1"},"Warning modal"),r.a.createElement(s.Q,{isOpen:this.state.warning,toggle:this.toggleWarning,className:"modal-warning "+this.props.className},r.a.createElement(s.T,{toggle:this.toggleWarning},"Modal title"),r.a.createElement(s.R,null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),r.a.createElement(s.S,null,r.a.createElement(s.e,{color:"warning",onClick:this.toggleWarning},"Do Something")," ",r.a.createElement(s.e,{color:"secondary",onClick:this.toggleWarning},"Cancel"))),r.a.createElement(s.e,{color:"danger",onClick:this.toggleDanger,className:"mr-1"},"Danger modal"),r.a.createElement(s.Q,{isOpen:this.state.danger,toggle:this.toggleDanger,className:"modal-danger "+this.props.className},r.a.createElement(s.T,{toggle:this.toggleDanger},"Modal title"),r.a.createElement(s.R,null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),r.a.createElement(s.S,null,r.a.createElement(s.e,{color:"danger",onClick:this.toggleDanger},"Do Something")," ",r.a.createElement(s.e,{color:"secondary",onClick:this.toggleDanger},"Cancel"))),r.a.createElement(s.e,{color:"info",onClick:this.toggleInfo,className:"mr-1"},"Info modal"),r.a.createElement(s.Q,{isOpen:this.state.info,toggle:this.toggleInfo,className:"modal-info "+this.props.className},r.a.createElement(s.T,{toggle:this.toggleInfo},"Modal title"),r.a.createElement(s.R,null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),r.a.createElement(s.S,null,r.a.createElement(s.e,{color:"primary",onClick:this.toggleInfo},"Do Something")," ",r.a.createElement(s.e,{color:"secondary",onClick:this.toggleInfo},"Cancel"))))))))}}]),t}(n.Component);t.default=u}});
//# sourceMappingURL=7.c8e54bea.chunk.js.map
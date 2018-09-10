webpackJsonp([9],{1015:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function l(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=n(0),c=n.n(o),i=n(5),s=n(60),u=n.n(s),p=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f="",m="",h="",d="",E=function(e){function t(){r(this,t);var e=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.handleChange=function(t){var n=t.target.value;e.props.onEmailChange(n),/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(n)?(e.setState({success:1}),e.props.SetErr(0)):(e.setState({success:0}),e.props.SetErr(1))},e.state={success:1},e}return l(t,e),p(t,[{key:"render",value:function(){return 0===this.state.success?c.a.createElement("form",null,c.a.createElement("div",null,c.a.createElement("input",{type:"text",className:"form-control is-invalid",placeholder:"Email",value:this.props.value,onChange:this.handleChange,required:!0}),c.a.createElement("div",{className:"invalid-feedback"},"Invalid email format"))):c.a.createElement("form",null,c.a.createElement("div",null,c.a.createElement("input",{type:"text",className:"form-control is-valid",placeholder:"Email",value:this.props.value,onChange:this.handleChange,required:!0}),c.a.createElement("div",{className:"valid-feedback"},"Looks good")))}}]),t}(o.Component),g=function(e){function t(){r(this,t);var e=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.handleChange=function(t){var n=t.target.value;e.props.onPhonenumberChange(n),/^(1+\d{10})$/.test(n)?(e.setState({success:1}),e.props.SetErr(0)):(e.setState({success:0}),e.props.SetErr(1))},e.state={success:1},e}return l(t,e),p(t,[{key:"render",value:function(){return 0===this.state.success?c.a.createElement("form",null,c.a.createElement("div",null,c.a.createElement("input",{type:"text",className:"form-control is-invalid",placeholder:"Phonenumber",value:this.props.value,onChange:this.handleChange,required:!0}),c.a.createElement("div",{className:"invalid-feedback"},"Invalid phonenumber format"))):c.a.createElement("form",null,c.a.createElement("div",null,c.a.createElement("input",{type:"text",className:"form-control is-valid",placeholder:"Phonenumber",value:this.props.value,onChange:this.handleChange,required:!0}),c.a.createElement("div",{className:"valid-feedback"},"Looks good")))}}]),t}(o.Component),b=function(e){function t(){r(this,t);var e=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.setEmail=function(t){e.setState({email:t})},e.setPhonenumber=function(t){e.setState({cell_phone:t})},e.SetErr1=function(t){e.setState({err1:t})},e.SetErr2=function(t){e.setState({err2:t})},e.ChangeProfile=function(){e.state.err1||e.state.err2?alert("Please check your information"):(u.a.ajax({url:"/user/update_user_info",data:{new_email:e.state.email,new_phone:e.state.cell_phone},context:document.body,async:!1,type:"get",success:function(e){alert("success")}}),e.props.SetChangeState())},e.state={cell_phone:m,email:h,err1:0,err2:0},e}return l(t,e),p(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"profile-card"},c.a.createElement("p",null,c.a.createElement("img",{src:d,alt:"avatar"})),c.a.createElement(i.E,{row:!0},c.a.createElement(i.u,{md:"3"},c.a.createElement(i.L,null,"Username")),c.a.createElement(i.u,{xs:"12",md:"9"},c.a.createElement("p",{className:"form-control-static"},f))),c.a.createElement(i.E,{row:!0},c.a.createElement(i.u,{md:"3"},c.a.createElement(i.L,null,"Cell Phone")),c.a.createElement(i.u,{xs:"12",md:"9"},c.a.createElement(g,{onPhonenumberChange:this.setPhonenumber,value:this.state.cell_phone,SetErr:this.SetErr1}))),c.a.createElement(i.E,{row:!0},c.a.createElement(i.u,{md:"3"},c.a.createElement(i.L,null,"Email")),c.a.createElement(i.u,{xs:"12",md:"9"},c.a.createElement(E,{onEmailChange:this.setEmail,value:this.state.email,SetErr:this.SetErr2}))),c.a.createElement(i._7,null,c.a.createElement(i.u,null),c.a.createElement(i.u,null),c.a.createElement(i.u,null,c.a.createElement(i.e,{block:!0,outline:!0,color:"success",className:"btn-pill",onClick:this.ChangeProfile},"Confirm")),c.a.createElement(i.u,null,c.a.createElement(i.e,{block:!0,outline:!0,color:"dark",className:"btn-pill",onClick:this.props.SetChangeState},"Cancel"))))}}]),t}(o.Component),A=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return l(t,e),p(t,[{key:"render",value:function(){return u.a.ajax({url:"/user/get_user_info",context:document.body,async:!1,type:"get",success:function(e){var t=u.a.parseJSON(e);f=t.username,m=t.phone,h=t.email,d=t.avatarURL}}),c.a.createElement(b,{SetChangeState:this.props.SetChangeState})}}]),t}(o.Component);t.a=A},1016:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function l(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=n(0),c=n.n(o),i=n(5),s=n(677),u=(n.n(s),n(60)),p=n.n(u),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),m=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return l(t,e),f(t,[{key:"render",value:function(){var e="",t=0,n="",r="",a="";return p.a.ajax({url:"/user/get_user_info",context:document.body,async:!1,type:"get",success:function(l){var o=p.a.parseJSON(l);e=o.username,n=o.phone,r=o.email,t=o.num,a=o.avatarURL}}),c.a.createElement("div",{className:"profile-card"},c.a.createElement("p",null,c.a.createElement("img",{src:a,alt:"avatar"})),c.a.createElement("h3",null,e),c.a.createElement(i._7,null,c.a.createElement(i.u,null),c.a.createElement(i.u,null),c.a.createElement(i.u,null),c.a.createElement(i.u,null,c.a.createElement(i.e,{block:!0,outline:!0,color:"primary",className:"btn-pill",onClick:this.props.SetChangeState},"Modify"))),c.a.createElement("ul",null,c.a.createElement("li",null,"Cell Phone ",c.a.createElement("span",null,n)),c.a.createElement("li",null,"Email ",c.a.createElement("span",null,r)),c.a.createElement("li",null,"Number of Appliances ",c.a.createElement("span",null,t))))}}]),t}(o.Component);t.a=m},284:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function l(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),c=n.n(o),i=n(5),s=n(1015),u=n(1016),p=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=function(e){function t(){r(this,t);var e=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.ChangeProfile=function(){e.setState({change:1})},e.CancelChange=function(){e.setState({change:0})},e.state={change:0},e}return l(t,e),p(t,[{key:"render",value:function(){return 1===this.state.change?c.a.createElement(i.u,{xs:"24",sm:"12",lg:"6"},c.a.createElement(i.i,null,c.a.createElement(s.a,{SetChangeState:this.CancelChange}))):c.a.createElement(i.u,{xs:"24",sm:"12",lg:"6"},c.a.createElement(i.i,null,c.a.createElement(u.a,{SetChangeState:this.ChangeProfile})))}}]),t}(o.Component);t.default=f},677:function(e,t,n){var r=n(678);"string"===typeof r&&(r=[[e.i,r,""]]);var a={hmr:!1};a.transform=void 0;n(245)(r,a);r.locals&&(e.exports=r.locals)},678:function(e,t,n){t=e.exports=n(244)(!0),t.push([e.i,".profile-card{padding:45px 25px 25px}.profile-card p{text-align:center}.profile-card p img{height:100px;border-radius:50%}.profile-card h3{text-align:center;font-size:22px;color:#555;margin:15px 0 0}.profile-card ul{padding:60px 0 0;text-align:left}.profile-card ul li{list-style:none;margin-bottom:15px;color:#555}.profile-card ul li span{float:right;color:#b5b5b5}","",{version:3,sources:["D:/\u5927\u4e8c\u6691\u5047\u9879\u76ee/MGIMSS/fron-end/src/css/profile_card.css"],names:[],mappings:"AAAA,cACE,sBAAuB,CACxB,AAED,gBACE,iBAAmB,CACpB,AAED,oBACE,aAAc,AACd,iBAAkB,CACnB,AAED,iBACE,kBAAmB,AACnB,eAAe,AACf,WAAc,AACd,eAAgB,CACjB,AAED,iBACE,iBAAiB,AACjB,eAAgB,CACjB,AAED,oBACE,gBAAgB,AAChB,mBAAmB,AACnB,UAAc,CACf,AAED,yBACE,YAAY,AACZ,aAAc,CACf",file:"profile_card.css",sourcesContent:[".profile-card {\r\n  padding:45px 25px 25px;\r\n}\r\n\r\n.profile-card p {\r\n  text-align: center;\r\n}\r\n\r\n.profile-card p img {\r\n  height: 100px;\r\n  border-radius:50%;\r\n}\r\n\r\n.profile-card h3 {\r\n  text-align: center;\r\n  font-size:22px;\r\n  color:#555555;\r\n  margin:15px 0 0;\r\n}\r\n\r\n.profile-card ul {\r\n  padding:60px 0 0;\r\n  text-align:left;\r\n}\r\n\r\n.profile-card ul li {\r\n  list-style:none;\r\n  margin-bottom:15px;\r\n  color:#555555;\r\n}\r\n\r\n.profile-card ul li span {\r\n  float:right;\r\n  color:#b5b5b5;\r\n}\r\n"],sourceRoot:""}])}});
//# sourceMappingURL=9.835ac7ee.chunk.js.map
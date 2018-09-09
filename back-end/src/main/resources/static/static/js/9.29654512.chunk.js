webpackJsonp([9],{1020:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=n(0),i=n.n(l),s=n(5),c=n(60),u=n.n(c),p=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),m="",f="",A="",h="",d=function(e){function t(){r(this,t);var e=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.handleChange=function(t){var n=t.target.value;e.props.onEmailChange(n),/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(n)?(e.setState({success:1}),e.props.SetErr(0)):(e.setState({success:0}),e.props.SetErr(1))},e.state={success:1},e}return o(t,e),p(t,[{key:"render",value:function(){return 0===this.state.success?i.a.createElement("form",null,i.a.createElement("div",null,i.a.createElement("input",{type:"text",className:"form-control is-invalid",placeholder:"Email",value:this.props.value,onChange:this.handleChange,required:!0}),i.a.createElement("div",{className:"invalid-feedback"},"Invalid email format"))):i.a.createElement("form",null,i.a.createElement("div",null,i.a.createElement("input",{type:"text",className:"form-control is-valid",placeholder:"Email",value:this.props.value,onChange:this.handleChange,required:!0}),i.a.createElement("div",{className:"valid-feedback"},"Looks good")))}}]),t}(l.Component),C=function(e){function t(){r(this,t);var e=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.handleChange=function(t){var n=t.target.value;e.props.onPhonenumberChange(n),/^(1+\d{10})$/.test(n)?(e.setState({success:1}),e.props.SetErr(0)):(e.setState({success:0}),e.props.SetErr(1))},e.state={success:1},e}return o(t,e),p(t,[{key:"render",value:function(){return 0===this.state.success?i.a.createElement("form",null,i.a.createElement("div",null,i.a.createElement("input",{type:"text",className:"form-control is-invalid",placeholder:"Phonenumber",value:this.props.value,onChange:this.handleChange,required:!0}),i.a.createElement("div",{className:"invalid-feedback"},"Invalid phonenumber format"))):i.a.createElement("form",null,i.a.createElement("div",null,i.a.createElement("input",{type:"text",className:"form-control is-valid",placeholder:"Phonenumber",value:this.props.value,onChange:this.handleChange,required:!0}),i.a.createElement("div",{className:"valid-feedback"},"Looks good")))}}]),t}(l.Component),E=function(e){function t(){r(this,t);var e=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.setEmail=function(t){e.setState({email:t})},e.setPhonenumber=function(t){e.setState({cell_phone:t})},e.SetErr1=function(t){e.setState({err1:t})},e.SetErr2=function(t){e.setState({err2:t})},e.ChangeProfile=function(){e.state.err1||e.state.err2?alert("Please check your information"):(u.a.ajax({url:"/user/update_user_info",data:{new_email:e.state.email,new_phone:e.state.cell_phone},context:document.body,async:!1,type:"get",success:function(e){alert("success")}}),e.props.SetChangeState())},e.state={cell_phone:f,email:A,err1:0,err2:0},e}return o(t,e),p(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"profile-card profile"},i.a.createElement("p",null,i.a.createElement("img",{src:h,alt:"avatar"})),i.a.createElement(s.E,{row:!0},i.a.createElement(s.u,{md:"3"},i.a.createElement(s.L,null,"Username")),i.a.createElement(s.u,{xs:"12",md:"9"},i.a.createElement("p",{className:"form-control-static"},m))),i.a.createElement(s.E,{row:!0},i.a.createElement(s.u,{md:"3"},i.a.createElement(s.L,null,"Cell Phone")),i.a.createElement(s.u,{xs:"12",md:"9"},i.a.createElement(C,{onPhonenumberChange:this.setPhonenumber,value:this.state.cell_phone,SetErr:this.SetErr1}))),i.a.createElement(s.E,{row:!0},i.a.createElement(s.u,{md:"3"},i.a.createElement(s.L,null,"Email")),i.a.createElement(s.u,{xs:"12",md:"9"},i.a.createElement(d,{onEmailChange:this.setEmail,value:this.state.email,SetErr:this.SetErr2}))),i.a.createElement(s._7,null,i.a.createElement(s.u,null),i.a.createElement(s.u,null),i.a.createElement(s.u,null,i.a.createElement(s.e,{block:!0,outline:!0,color:"success",className:"btn-pill",onClick:this.ChangeProfile},"Confirm")),i.a.createElement(s.u,null,i.a.createElement(s.e,{block:!0,outline:!0,color:"dark",className:"btn-pill",onClick:this.props.SetChangeState},"Cancel"))))}}]),t}(l.Component),b=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),p(t,[{key:"render",value:function(){return u.a.ajax({url:"/user/get_user_info",context:document.body,async:!1,type:"get",success:function(e){var t=u.a.parseJSON(e);m=t.username,f=t.phone,A=t.email,h=t.avatarURL}}),i.a.createElement(E,{SetChangeState:this.props.SetChangeState})}}]),t}(l.Component);t.a=b},1021:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=n(0),i=n.n(l),s=n(5),c=n(681),u=(n.n(c),n(60)),p=n.n(u),m=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(677);var f=function(e){function t(e){r(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.logout=n.logout.bind(n),n}return o(t,e),m(t,[{key:"logout",value:function(){p.a.ajax({url:"/logout",async:!1,type:"get",success:function(e){}})}},{key:"render",value:function(){var e="",t=0,n="",r="",a="";return p.a.ajax({url:"/user/get_user_info",context:document.body,async:!1,type:"get",success:function(o){var l=p.a.parseJSON(o);e=l.username,n=l.phone,r=l.email,t=l.num,a=l.avatarURL}}),i.a.createElement("div",{className:"profile-card"},i.a.createElement("p",null,i.a.createElement("img",{src:a,alt:"avatar"})),i.a.createElement("h3",null,e),i.a.createElement(s._7,null,i.a.createElement(s.u,{xs:{size:12},sm:{size:3},className:"user-button"},i.a.createElement(s.e,{block:!0,outline:!0,color:"danger",className:"btn-pill",onClick:this.logout},"Logout")),i.a.createElement(s.u,{xs:{size:12},sm:{size:3,offset:6},className:"user-button"},i.a.createElement(s.e,{block:!0,outline:!0,color:"primary",className:"btn-pill",onClick:this.props.SetChangeState},"Modify"))),i.a.createElement("ul",null,i.a.createElement("li",null,"Cell Phone ",i.a.createElement("span",null,n)),i.a.createElement("li",null,"Email ",i.a.createElement("span",null,r)),i.a.createElement("li",null,"Number of Appliances ",i.a.createElement("span",null,t))))}}]),t}(l.Component);t.a=f},285:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=n(0),i=n.n(l),s=n(5),c=n(1020),u=n(1021),p=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(677);var m=function(e){function t(){r(this,t);var e=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.ChangeProfile=function(){e.setState({change:1})},e.CancelChange=function(){e.setState({change:0})},e.state={change:0},e}return o(t,e),p(t,[{key:"render",value:function(){return 1===this.state.change?i.a.createElement(s.u,{xs:{size:12},sm:{size:12},lg:{size:6,offset:3},className:"profile"},i.a.createElement(s.i,null,i.a.createElement(c.a,{SetChangeState:this.CancelChange}))):i.a.createElement(s.u,{xs:{size:12},sm:{size:12},lg:{size:6,offset:3},className:"profile"},i.a.createElement(s.i,null,i.a.createElement(u.a,{SetChangeState:this.ChangeProfile})))}}]),t}(l.Component);t.default=m},677:function(e,t,n){var r=n(683);"string"===typeof r&&(r=[[e.i,r,""]]);var a={hmr:!1};a.transform=void 0;n(246)(r,a);r.locals&&(e.exports=r.locals)},681:function(e,t,n){var r=n(682);"string"===typeof r&&(r=[[e.i,r,""]]);var a={hmr:!1};a.transform=void 0;n(246)(r,a);r.locals&&(e.exports=r.locals)},682:function(e,t,n){t=e.exports=n(245)(!0),t.push([e.i,".profile-card{padding:45px 25px 25px}.profile-card p{text-align:center}.profile-card p img{height:100px;border-radius:50%}.profile-card h3{text-align:center;font-size:22px;color:#555;margin:15px 0 0}.profile-card ul{padding:60px 0 0;text-align:left}.profile-card ul li{list-style:none;margin-bottom:15px;color:#555}.profile-card ul li span{float:right;color:#b5b5b5}","",{version:3,sources:["D:/\u5927\u4e8c\u6691\u5047\u9879\u76ee/MGIMSS/fron-end/src/css/profile_card.css"],names:[],mappings:"AAAA,cACE,sBAAuB,CACxB,AAED,gBACE,iBAAmB,CACpB,AAED,oBACE,aAAc,AACd,iBAAkB,CACnB,AAED,iBACE,kBAAmB,AACnB,eAAe,AACf,WAAc,AACd,eAAgB,CACjB,AAED,iBACE,iBAAiB,AACjB,eAAgB,CACjB,AAED,oBACE,gBAAgB,AAChB,mBAAmB,AACnB,UAAc,CACf,AAED,yBACE,YAAY,AACZ,aAAc,CACf",file:"profile_card.css",sourcesContent:[".profile-card {\r\n  padding:45px 25px 25px;\r\n}\r\n\r\n.profile-card p {\r\n  text-align: center;\r\n}\r\n\r\n.profile-card p img {\r\n  height: 100px;\r\n  border-radius:50%;\r\n}\r\n\r\n.profile-card h3 {\r\n  text-align: center;\r\n  font-size:22px;\r\n  color:#555555;\r\n  margin:15px 0 0;\r\n}\r\n\r\n.profile-card ul {\r\n  padding:60px 0 0;\r\n  text-align:left;\r\n}\r\n\r\n.profile-card ul li {\r\n  list-style:none;\r\n  margin-bottom:15px;\r\n  color:#555555;\r\n}\r\n\r\n.profile-card ul li span {\r\n  float:right;\r\n  color:#b5b5b5;\r\n}\r\n"],sourceRoot:""}])},683:function(e,t,n){t=e.exports=n(245)(!0),t.push([e.i,".profile{top:65px;animation:bodyShowUp 1s ease-in-out;animation-delay:0s;animation-fill-mode:forwards;-moz-animation:bodyShowUp 1s ease-in-out;-moz-animation-delay:0s;-moz-animation-fill-mode:forwards;-webkit-animation:bodyShowUp 1s ease-in-out;-webkit-animation-fill-mode:forwards;-webkit-animation-delay:0s}.user-button{padding-top:20px}@keyframes bodyShowUp{0%{opacity:0}to{opacity:1}}@-webkit-keyframes bodyShowUp{0%{opacity:0}to{opacity:1}}","",{version:3,sources:["D:/\u5927\u4e8c\u6691\u5047\u9879\u76ee/MGIMSS/fron-end/src/css/profile.css"],names:[],mappings:"AACA,SACE,SAAS,AACT,oCAAqC,AACrC,mBAAoB,AACpB,6BAA8B,AAC9B,yCAA0C,AAC1C,wBAAyB,AACzB,kCAAmC,AACnC,4CAA6C,AAC7C,qCAAsC,AACtC,0BAA4B,CAC7B,AAED,aACE,gBAAkB,CACnB,AAGD,sBACE,GACE,SAAW,CACZ,AACD,GACE,SAAW,CACZ,CACF,AAED,8BAEE,GACE,SAAW,CACZ,AACD,GACE,SAAW,CACZ,CACF",file:"profile.css",sourcesContent:["\r\n.profile{\r\n  top:65px;\r\n  animation: bodyShowUp 1s ease-in-out;\r\n  animation-delay: 0s;\r\n  animation-fill-mode: forwards;\r\n  -moz-animation: bodyShowUp 1s ease-in-out;\r\n  -moz-animation-delay: 0s;\r\n  -moz-animation-fill-mode: forwards;\r\n  -webkit-animation: bodyShowUp 1s ease-in-out;\r\n  -webkit-animation-fill-mode: forwards;\r\n  -webkit-animation-delay: 0s; /* Safari \u548c Chrome */\r\n}\r\n\r\n.user-button{\r\n  padding-top: 20px;\r\n}\r\n\r\n\r\n@keyframes bodyShowUp {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n@-webkit-keyframes bodyShowUp /* Safari \u548c Chrome */\r\n{\r\n  from {\r\n    opacity: 0;\r\n  }\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n"],sourceRoot:""}])}});
//# sourceMappingURL=9.29654512.chunk.js.map
webpackJsonp([31],{258:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function r(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=n(0),i=n.n(l),s=n(5),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),p=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.toggle=n.toggle.bind(n),n.state={popoverOpen:!1},n}return r(t,e),c(t,[{key:"toggle",value:function(){this.setState({popoverOpen:!this.state.popoverOpen})}},{key:"render",value:function(){return i.a.createElement("span",null,i.a.createElement(s.e,{className:"mr-1",color:"secondary",id:"Popover-"+this.props.id,onClick:this.toggle},this.props.item.text),i.a.createElement(s._3,{placement:this.props.item.placement,isOpen:this.state.popoverOpen,target:"Popover-"+this.props.id,toggle:this.toggle},i.a.createElement(s._5,null,"Popover Title"),i.a.createElement(s._4,null,"Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.")))}}]),t}(l.Component),u=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.toggle=n.toggle.bind(n),n.state={popoverOpen:!1,popovers:[{placement:"top",text:"Top"},{placement:"bottom",text:"Bottom"},{placement:"left",text:"Left"},{placement:"right",text:"Right"}]},n}return r(t,e),c(t,[{key:"toggle",value:function(){this.setState({popoverOpen:!this.state.popoverOpen})}},{key:"render",value:function(){return i.a.createElement("div",{className:"animated fadeIn"},i.a.createElement(s.i,null,i.a.createElement(s.n,null,i.a.createElement("i",{className:"fa fa-align-justify"}),i.a.createElement("strong",null,"Popovers"),i.a.createElement("div",{className:"card-header-actions"},i.a.createElement("a",{href:"https://reactstrap.github.io/components/popovers/",rel:"noreferrer noopener",target:"_blank",className:"card-header-action"},i.a.createElement("small",{className:"text-muted"},"docs")))),i.a.createElement(s.j,null,i.a.createElement(s.e,{id:"Popover1",onClick:this.toggle},"Launch Popover"),i.a.createElement(s._3,{placement:"bottom",isOpen:this.state.popoverOpen,target:"Popover1",toggle:this.toggle},i.a.createElement(s._5,null,"Popover Title"),i.a.createElement(s._4,null,"Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.")))),i.a.createElement(s.i,null,i.a.createElement(s.n,null,i.a.createElement("i",{className:"fa fa-align-justify"}),i.a.createElement("strong",null,"Popovers"),i.a.createElement("small",null," list")),i.a.createElement(s.j,null,this.state.popovers.map(function(e,t){return i.a.createElement(p,{key:t,item:e,id:t})}))))}}]),t}(l.Component);t.default=u}});
//# sourceMappingURL=31.95510d2d.chunk.js.map
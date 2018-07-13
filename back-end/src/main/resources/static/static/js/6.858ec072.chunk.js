webpackJsonp([6],{269:function(e,t,a){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function l(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=a(0),c=a.n(o),s=a(60),i=a.n(s),m=a(3),u=a.n(m),d=a(9),g=a(473),E=(a.n(g),function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}()),b=function(e){function t(e){r(this,t);var a=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={bgColor:"rgb(255, 255, 255)"},a}return l(t,e),E(t,[{key:"componentDidMount",value:function(){var e=i.a.findDOMNode(this).parentNode.firstChild,t=window.getComputedStyle(e).getPropertyValue("background-color");this.setState({bgColor:t||this.state.bgColor})}},{key:"render",value:function(){return c.a.createElement("table",{className:"w-100"},c.a.createElement("tbody",null,c.a.createElement("tr",null,c.a.createElement("td",{className:"text-muted"},"HEX:"),c.a.createElement("td",{className:"font-weight-bold"},Object(g.rgbToHex)(this.state.bgColor))),c.a.createElement("tr",null,c.a.createElement("td",{className:"text-muted"},"RGB:"),c.a.createElement("td",{className:"font-weight-bold"},this.state.bgColor))))}}]),t}(o.Component),f=function(e){function t(){return r(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return l(t,e),E(t,[{key:"render",value:function(){var e=this.props,t=e.className,a=e.children,r=u()(t,"theme-color w-75 rounded mb-3");return c.a.createElement(d.u,{xl:"2",md:"4",sm:"6",xs:"12",className:"mb-4"},c.a.createElement("div",{className:r,style:{paddingTop:"75%"}}),a,c.a.createElement(b,null))}}]),t}(o.Component),h=function(e){function t(){return r(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return l(t,e),E(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"animated fadeIn"},c.a.createElement("div",{className:"card"},c.a.createElement("div",{className:"card-header"},c.a.createElement("i",{className:"icon-drop"})," Theme colors"),c.a.createElement("div",{className:"card-body"},c.a.createElement(d._7,null,c.a.createElement(f,{className:"bg-primary"},c.a.createElement("h6",null,"Brand Primary Color")),c.a.createElement(f,{className:"bg-secondary"},c.a.createElement("h6",null,"Brand Secondary Color")),c.a.createElement(f,{className:"bg-success"},c.a.createElement("h6",null,"Brand Success Color")),c.a.createElement(f,{className:"bg-danger"},c.a.createElement("h6",null,"Brand Danger Color")),c.a.createElement(f,{className:"bg-warning"},c.a.createElement("h6",null,"Brand Warning Color")),c.a.createElement(f,{className:"bg-info"},c.a.createElement("h6",null,"Brand Info Color")),c.a.createElement(f,{className:"bg-light"},c.a.createElement("h6",null,"Brand Light Color")),c.a.createElement(f,{className:"bg-dark"},c.a.createElement("h6",null,"Brand Dark Color"))))),c.a.createElement("div",{className:"card"},c.a.createElement("div",{className:"card-header"},c.a.createElement("i",{className:"icon-drop"})," Grays"),c.a.createElement("div",{className:"card-body"},c.a.createElement(d._7,{className:"mb-3"},c.a.createElement(f,{className:"bg-gray-100"},c.a.createElement("h6",null,"Gray 100 Color")),c.a.createElement(f,{className:"bg-gray-200"},c.a.createElement("h6",null,"Gray 200 Color")),c.a.createElement(f,{className:"bg-gray-300"},c.a.createElement("h6",null,"Gray 300 Color")),c.a.createElement(f,{className:"bg-gray-400"},c.a.createElement("h6",null,"Gray 400 Color")),c.a.createElement(f,{className:"bg-gray-500"},c.a.createElement("h6",null,"Gray 500 Color")),c.a.createElement(f,{className:"bg-gray-600"},c.a.createElement("h6",null,"Gray 600 Color")),c.a.createElement(f,{className:"bg-gray-700"},c.a.createElement("h6",null,"Gray 700 Color")),c.a.createElement(f,{className:"bg-gray-800"},c.a.createElement("h6",null,"Gray 800 Color")),c.a.createElement(f,{className:"bg-gray-900"},c.a.createElement("h6",null,"Gray 900 Color"))))),c.a.createElement("div",{className:"card"},c.a.createElement("div",{className:"card-header"},c.a.createElement("i",{className:"icon-drop"})," Additional colors"),c.a.createElement("div",{className:"card-body"},c.a.createElement(d._7,null,c.a.createElement(f,{className:"bg-blue"},c.a.createElement("h6",null,"Blue Color")),c.a.createElement(f,{className:"bg-light-blue"},c.a.createElement("h6",null,"Light Blue Color")),c.a.createElement(f,{className:"bg-indigo"},c.a.createElement("h6",null,"Indigo Color")),c.a.createElement(f,{className:"bg-purple"},c.a.createElement("h6",null,"Purple Color")),c.a.createElement(f,{className:"bg-pink"},c.a.createElement("h6",null,"Pink Color")),c.a.createElement(f,{className:"bg-red"},c.a.createElement("h6",null,"Red Color")),c.a.createElement(f,{className:"bg-orange"},c.a.createElement("h6",null,"Orange Color")),c.a.createElement(f,{className:"bg-yellow"},c.a.createElement("h6",null,"Yellow Color")),c.a.createElement(f,{className:"bg-green"},c.a.createElement("h6",null,"Green Color")),c.a.createElement(f,{className:"bg-teal"},c.a.createElement("h6",null,"Teal Color")),c.a.createElement(f,{className:"bg-cyan"},c.a.createElement("h6",null,"Cyan Color"))))))}}]),t}(o.Component);t.default=h},473:function(e,t,a){!function(e,a){a(t)}(0,function(e){"use strict";var t=function(){for(var e={},t=document.styleSheets,a="",r=t.length-1;r>-1;r--){for(var n=t[r].cssRules,l=n.length-1;l>-1;l--)if(".ie-custom-properties"===n[l].selectorText){a=n[l].cssText;break}if(a)break}return a=a.substring(a.lastIndexOf("{")+1,a.lastIndexOf("}")),a.split(";").forEach(function(t){if(t){var a=t.split(": ")[0],r=t.split(": ")[1];a&&r&&(e["--"+a.trim()]=r.trim())}}),e},a=function(){return Boolean(document.documentMode)&&document.documentMode>=10},r=function(e){return e.match(/^--.*/i)},n=function(e,n){void 0===n&&(n=document.body);var l;if(r(e)&&a()){l=t()[e]}else l=window.getComputedStyle(n,null).getPropertyValue(e).replace(/^\s/,"");return l},l=function(e){if("undefined"===typeof e)throw new Error("Hex color is not defined");if(!e.match(/^#(?:[0-9a-f]{3}){1,2}$/i))throw new Error(e+" is not a valid hex color");var t,a,r;return 7===e.length?(t=parseInt(e.substring(1,3),16),a=parseInt(e.substring(3,5),16),r=parseInt(e.substring(5,7),16)):(t=parseInt(e.substring(1,2),16),a=parseInt(e.substring(2,3),16),r=parseInt(e.substring(3,5),16)),"rgba("+t+", "+a+", "+r+")"},o=function(e,t){if(void 0===t&&(t=100),"undefined"===typeof e)throw new Error("Hex color is not defined");if(!e.match(/^#(?:[0-9a-f]{3}){1,2}$/i))throw new Error(e+" is not a valid hex color");var a,r,n;return 7===e.length?(a=parseInt(e.substring(1,3),16),r=parseInt(e.substring(3,5),16),n=parseInt(e.substring(5,7),16)):(a=parseInt(e.substring(1,2),16),r=parseInt(e.substring(2,3),16),n=parseInt(e.substring(3,5),16)),"rgba("+a+", "+r+", "+n+", "+t/100+")"},c=function(e){if("undefined"===typeof e)throw new Error("Hex color is not defined");var t=e.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);if(!t)throw new Error(e+" is not a valid rgb color");var a="0"+parseInt(t[1],10).toString(16),r="0"+parseInt(t[2],10).toString(16),n="0"+parseInt(t[3],10).toString(16);return"#"+a.slice(-2)+r.slice(-2)+n.slice(-2)};e.getStyle=n,e.hexToRgb=l,e.hexToRgba=o,e.rgbToHex=c,Object.defineProperty(e,"__esModule",{value:!0})})}});
//# sourceMappingURL=6.858ec072.chunk.js.map
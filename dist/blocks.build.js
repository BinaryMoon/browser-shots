!function(e){function t(n){if(r[n])return r[n].exports;var s=r[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var r={};t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});r(1)},function(e,t,r){"use strict";var n=r(2),s=(r.n(n),r(3)),o=(r.n(s),r(4)),__=wp.i18n.__;(0,wp.blocks.registerBlockType)("browser-shots/browser-shots",{title:__("Browser Shots","browser-shots"),description:__("Automatically embed screenshots of websites onto your site.","browser-shots"),icon:wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},wp.element.createElement("g",{"fill-rule":"evenodd"},wp.element.createElement("path",{d:"M18,5 L4,5 L4,19 L2,19 L2,5 C2,3.8954305 2.8954305,3 4,3 L18,3 L18,5 Z"}),wp.element.createElement("path",{"fill-rule":"nonzero",d:"M10,9 L11,7 L17,7 L18,9 L20,9 C21.1045695,9 22,9.8954305 22,11 L22,19 C22,20.1045695 21.1045695,21 20,21 L8,21 C6.8954305,21 6,20.1045695 6,19 L6,11 C6,9.8954305 6.8954305,9 8,9 L10,9 Z M12,9 L11,11 L8,11 L8,19 L20,19 L20,11 L17,11 L16,9 L12,9 Z"}),wp.element.createElement("path",{"fill-rule":"nonzero",d:"M14,18 C15.6568542,18 17,16.6568542 17,15 C17,13.3431458 15.6568542,12 14,12 C12.3431458,12 11,13.3431458 11,15 C11,16.6568542 12.3431458,18 14,18 Z M14,16 C13.4477153,16 13,15.5522847 13,15 C13,14.4477153 13.4477153,14 14,14 C14.5522847,14 15,14.4477153 15,15 C15,15.5522847 14.5522847,16 14,16 Z"}))),className:"browser-shots-block",category:"embed",keywords:[__("Browser Shots","browser-shots"),__("website","browser-shots"),__("screenshot","browser-shots")],edit:o.a,supports:{align:["left","center","right"]},save:function(){return null}})},function(e,t){},function(e,t){},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=r(5),i=(r.n(l),function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}()),a=wp.element,u=a.Component,p=a.Fragment,m=wp.i18n,__=m.__,_x=m._x,c=wp.components,w=c.PanelBody,h=c.SelectControl,b=c.TextControl,f=c.TextareaControl,g=c.Toolbar,d=c.ToggleControl,v=c.Button,E=c.ButtonGroup,y=c.PanelRow,C=c.ExternalLink,L=wp.editor,k=L.InspectorControls,_=L.BlockControls,x=function(e){function t(){n(this,t);var e=s(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.refresh=function(){var t=parseInt(e.state.version)+1;e.setState({version:t})},e.urlChange=function(t){e.props.setAttributes({url:t.target.value}),e.setState({url:t.target.value})},e.createPreviewImage=function(){var t=e.props.attributes,r=t.width,n=t.height,s=t.url,o=e.state.version,l="https://s0.wordpress.com/mshots/v1/"+encodeURI(s)+"?w="+r+"&h="+n+"&version="+o;return wp.element.createElement("div",null,wp.element.createElement("img",{src:l,alt:e.props.attributes.alt,width:r,height:n}))},e.state={html:e.props.attributes.html,welcome:""===e.props.attributes.url,version:"1",url:e.props.attributes.url,width:e.props.attributes.width,height:e.props.attributes.height,alt:e.props.attributes.alt,link:e.props.attributes.link,target:e.props.attributes.target,classname:e.props.attributes.classname,rel:e.props.attributes.rel,image_class:e.props.attributes.image_class,image_size:e.props.attributes.image_size},e}return o(t,e),i(t,[{key:"render",value:function(){var e=this,t=this.props.attributes,r=t.width,n=t.height,s=t.alt,o=t.link,l=t.target,i=t.rel,a=t.image_size,u=[{value:"",label:__("None","browser-shots")},{value:"nofollow",label:__("No Follow","browser-shots")}],m=[{icon:"edit",title:__("Edit URL","browser-shots"),onClick:function(){return e.setState({welcome:!0})}},{icon:"update",title:__("Refresh Image","browser-shots"),onClick:function(t){return e.refresh()}}],c=wp.element.createElement(k,null,wp.element.createElement(w,{title:__("Browser Shots Settings","browser-shots")},wp.element.createElement(f,{label:__("Alt Text (Alternative Text)"),value:s,onChange:function(t){e.props.setAttributes({alt:t})},help:wp.element.createElement("div",null,wp.element.createElement(C,{href:"https://www.w3.org/WAI/tutorials/images/decision-tree"},__("Describe the purpose of the image","browser-shots")),__("Leave empty if the image is purely decorative.","browser-shots"))}),wp.element.createElement("p",null,__("Image Dimensions","browser-shots")),wp.element.createElement(y,{className:"browser-shots-dimensions"},wp.element.createElement(b,{type:"number",label:__("Width","browser-shots"),value:r,min:100,max:1280,onChange:function(t){t>1280&&(t=1280),e.props.setAttributes({width:t,image_size:"custom"})}}),wp.element.createElement(b,{type:"number",label:__("Height","browser-shots"),value:n,min:100,max:960,onChange:function(t){t>960&&(t=960),e.props.setAttributes({height:t,image_size:"custom"})}})),wp.element.createElement(y,{className:"browser-shots-dimensions-options"},wp.element.createElement(E,null,wp.element.createElement(v,{isDefault:!0,isPrimary:"small"==a,onClick:function(t){e.props.setAttributes({width:320,height:240,image_size:"small"})}},_x("S","Small Image Size","browser-shots")),wp.element.createElement(v,{isDefault:!0,isPrimary:"medium"==a,onClick:function(t){e.props.setAttributes({width:640,height:480,image_size:"medium"})}},_x("M","Medium Image Size","browser-shots")),wp.element.createElement(v,{isDefault:!0,isPrimary:"large"==a,onClick:function(t){e.props.setAttributes({width:960,height:720,image_size:"large"})}},_x("L","Large Image Size","browser-shots")),wp.element.createElement(v,{isDefault:!0,isPrimary:"full"==a,onClick:function(t){e.props.setAttributes({width:1280,height:960,image_size:"full"})}},_x("XL","Extra Large Image Size","browser-shots"))),wp.element.createElement(v,{isDefault:!0,onClick:function(t){e.props.setAttributes({width:600,height:450,image_size:"medium"})}},_x("Reset","Reset Image Size to Default","browser-shots"))),wp.element.createElement(v,{onClick:function(t){e.refresh()},isDefault:!0},__("Refresh Image","browser-shots"))),wp.element.createElement(w,{title:__("Link Settings","browser-shots"),initialOpen:!1},wp.element.createElement(b,{label:__("Link Image to URL","browser-shots"),type:"text",value:o,onChange:function(t){e.props.setAttributes({link:t})}}),wp.element.createElement(d,{label:__("Open in New Tab","browser-shots"),onChange:function(t){var r=t?"_blank":"none";e.props.setAttributes({target:r})},checked:"_blank"===l}),wp.element.createElement(h,{label:__("Rel","browser-shots"),options:u,value:i,onChange:function(t){e.props.setAttributes({rel:t})}})));return wp.element.createElement(p,null,this.state.welcome&&wp.element.createElement(w,null,wp.element.createElement("div",{className:"browsershots-block"},wp.element.createElement("div",null,wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100",height:"100",viewBox:"0 0 24 24"},wp.element.createElement("g",{fill:"none","fill-rule":"evenodd"},wp.element.createElement("path",{fill:"#000000",d:"M18,5 L4,5 L4,19 C2.8954305,19 2,18.1045695 2,17 L2,5 C2,3.8954305 2.8954305,3 4,3 L16,3 C17.1045695,3 18,3.8954305 18,5 Z"}),wp.element.createElement("path",{stroke:"#000000","stroke-width":"2",d:"M16.6666667,8 L11.3333333,8 L10.5,10 L8,10 C7.44771525,10 7,10.4477153 7,11 L7,19 C7,19.5522847 7.44771525,20 8,20 L20,20 C20.5522847,20 21,19.5522847 21,19 L21,11 C21,10.4477153 20.5522847,10 20,10 L17.5,10 L16.6666667,8 Z"}),wp.element.createElement("circle",{cx:"14",cy:"15",r:"2",stroke:"#000000","stroke-width":"2"})))),wp.element.createElement("div",null,wp.element.createElement("label",{htmlFor:"browser-shots-url"},__("Enter a URL","browser-shots"))),wp.element.createElement("div",null,wp.element.createElement("input",{type:"text",id:"browser-shots-url",value:this.state.url,onChange:function(t){e.urlChange(t)}})),wp.element.createElement("div",null,wp.element.createElement("input",{className:"button button-primary",style:{marginTop:"25px"},type:"submit",id:"browsershots-input-submit",value:__("Find Image","browser-shots"),onClick:function(){""!==e.props.attributes.url&&e.setState({welcome:!1})}})))),!this.state.welcome&&wp.element.createElement(p,null,c,wp.element.createElement(_,null,wp.element.createElement(g,{controls:m})),wp.element.createElement("div",{className:"browser-shots-gutenberg-wrapper",style:{overflow:"hidden",maxWidth:"100%"}},this.createPreviewImage())))}}]),t}(u);t.a=x},function(e,t,r){var n,s;!function(){"use strict";function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var s=typeof n;if("string"===s||"number"===s)e.push(n);else if(Array.isArray(n)&&n.length){var l=r.apply(null,n);l&&e.push(l)}else if("object"===s)for(var i in n)o.call(n,i)&&n[i]&&e.push(i)}}return e.join(" ")}var o={}.hasOwnProperty;"undefined"!==typeof e&&e.exports?(r.default=r,e.exports=r):(n=[],void 0!==(s=function(){return r}.apply(t,n))&&(e.exports=s))}()}]);
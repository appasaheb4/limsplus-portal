"use strict";(self.webpackChunklimsplus_portal=self.webpackChunklimsplus_portal||[]).push([[981],{52981:function(e,t,i){i.r(t),i.d(t,{default:function(){return Q}});var o=i(74165),n=i(15861),l=i(1413),a=i(29439),s=i(47313),r=i(92126),c=i(10044),u=i(94936),d=(i(80594),i(74394)),m=i(40560),h=i(46417),p=(0,r.Pi)((function(){var e,t,i,o,n,a,s,r,u=(0,d.mZ)().hostCommunicationStore;return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(m.iA,{striped:!0,bordered:!0,hover:!0,children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{style:{color:"green"},children:"Communication Settins"}),(0,h.jsx)("th",{style:{color:"green"},children:"Value"})]})}),(0,h.jsxs)("tbody",{children:[(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:"Host IP address"}),(0,h.jsx)("td",{children:(0,h.jsx)(c.l0.II,{id:"hostIpAddress",placeholder:"Host Ip Address",value:null===(e=u.hostCommuication)||void 0===e||null===(t=e.tcpipCommunication)||void 0===t?void 0:t.hostIpAddress,onChange:function(e){var t;u.updateHostCommuication((0,l.Z)((0,l.Z)({},u.hostCommuication),{},{tcpipCommunication:(0,l.Z)((0,l.Z)({},null===(t=u.hostCommuication)||void 0===t?void 0:t.tcpipCommunication),{},{hostIpAddress:e})}))}})})]}),(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:"Port number"}),(0,h.jsxs)("td",{children:[" ",(0,h.jsx)(c.l0.II,{id:"portNumber",placeholder:"Port Number",value:null===(i=u.hostCommuication)||void 0===i||null===(o=i.tcpipCommunication)||void 0===o?void 0:o.portNumber,onChange:function(e){var t;u.updateHostCommuication((0,l.Z)((0,l.Z)({},u.hostCommuication),{},{tcpipCommunication:(0,l.Z)((0,l.Z)({},null===(t=u.hostCommuication)||void 0===t?void 0:t.tcpipCommunication),{},{portNumber:e})}))}})]})]}),(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:"Timeout"}),(0,h.jsxs)("td",{children:[" ",(0,h.jsx)(c.l0.II,{id:"timeout",placeholder:"Timeout",value:null===(n=u.hostCommuication)||void 0===n||null===(a=n.tcpipCommunication)||void 0===a?void 0:a.timeout,onChange:function(e){var t;u.updateHostCommuication((0,l.Z)((0,l.Z)({},u.hostCommuication),{},{tcpipCommunication:(0,l.Z)((0,l.Z)({},null===(t=u.hostCommuication)||void 0===t?void 0:t.tcpipCommunication),{},{timeout:e})}))}})]})]}),(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:"Response Time"}),(0,h.jsxs)("td",{children:[" ",(0,h.jsx)(c.l0.II,{id:"responseTime",placeholder:"Response Time",value:null===(s=u.hostCommuication)||void 0===s||null===(r=s.tcpipCommunication)||void 0===r?void 0:r.responseTime,onChange:function(e){var t;u.updateHostCommuication((0,l.Z)((0,l.Z)({},u.hostCommuication),{},{tcpipCommunication:(0,l.Z)((0,l.Z)({},null===(t=u.hostCommuication)||void 0===t?void 0:t.tcpipCommunication),{},{responseTime:e})}))}})]})]})]})]})})})),v=[{title:"COM1"},{title:"COM2"},{title:"COM3"},{title:"COM4"},{title:"COM5"}],f=[{title:"110"},{title:"300"},{title:"600"},{title:"1200"},{title:"2400"},{title:"4800"},{title:"9600"},{title:"14400"},{title:"19200"},{title:"38400"},{title:"57600"},{title:"115200"},{title:"128000"},{title:"256000"}],x=[{title:"1"},{title:"1.5"},{title:"2"}],g=[{title:"7"},{title:"8"}],C=[{title:"None (N)"},{title:"Odd (O)"},{title:"Even \u20ac"},{title:"Mark (M)"},{title:"Space (S)"}],j=[{title:"On"},{title:"Off"},{title:"None"},{title:"Hardware"}],b=[{title:"1381"},{title:"1394"}],y=(0,r.Pi)((function(){var e,t,i,o,n,a,s,r,c,u,p,y,Z,S,w=(0,d.mZ)().hostCommunicationStore;return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(m.iA,{striped:!0,bordered:!0,hover:!0,children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{style:{color:"green"},children:"Communication Settings"}),(0,h.jsx)("th",{style:{color:"green"},children:"Value"})]})}),(0,h.jsxs)("tbody",{children:[(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:"Com Port"}),(0,h.jsx)("td",{children:(0,h.jsxs)("select",{name:"defualtLab",value:null===(e=w.hostCommuication)||void 0===e||null===(t=e.serialPortCommunication)||void 0===t?void 0:t.comPort,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t,i=e.target.value;w.updateHostCommuication((0,l.Z)((0,l.Z)({},w.hostCommuication),{},{serialPortCommunication:(0,l.Z)((0,l.Z)({},null===(t=w.hostCommuication)||void 0===t?void 0:t.serialPortCommunication),{},{comPort:i})}))},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),v.map((function(e){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})})]}),(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:"Baud rate"}),(0,h.jsxs)("td",{children:[" ",(0,h.jsxs)("select",{name:"defualtLab",value:null===(i=w.hostCommuication)||void 0===i||null===(o=i.serialPortCommunication)||void 0===o?void 0:o.baudRate,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t,i=e.target.value;w.updateHostCommuication((0,l.Z)((0,l.Z)({},w.hostCommuication),{},{serialPortCommunication:(0,l.Z)((0,l.Z)({},null===(t=w.hostCommuication)||void 0===t?void 0:t.serialPortCommunication),{},{baudRate:i})}))},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),f.map((function(e){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})]})]}),(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:"Data bits"}),(0,h.jsx)("td",{children:(0,h.jsxs)("select",{name:"defualtLab",value:null===(n=w.hostCommuication)||void 0===n||null===(a=n.serialPortCommunication)||void 0===a?void 0:a.dataBits,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t,i=e.target.value;w.updateHostCommuication((0,l.Z)((0,l.Z)({},w.hostCommuication),{},{serialPortCommunication:(0,l.Z)((0,l.Z)({},null===(t=w.hostCommuication)||void 0===t?void 0:t.serialPortCommunication),{},{dataBits:i})}))},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),g.map((function(e){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})})]}),(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:"Stop bits"}),(0,h.jsx)("td",{children:(0,h.jsxs)("select",{name:"defualtLab",value:null===(s=w.hostCommuication)||void 0===s||null===(r=s.serialPortCommunication)||void 0===r?void 0:r.stopBits,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t,i=e.target.value;w.updateHostCommuication((0,l.Z)((0,l.Z)({},w.hostCommuication),{},{serialPortCommunication:(0,l.Z)((0,l.Z)({},null===(t=w.hostCommuication)||void 0===t?void 0:t.serialPortCommunication),{},{stopBits:i})}))},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),x.map((function(e){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})})]}),(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:"Parity"}),(0,h.jsxs)("td",{children:[" ",(0,h.jsxs)("select",{name:"defualtLab",value:null===(c=w.hostCommuication)||void 0===c||null===(u=c.serialPortCommunication)||void 0===u?void 0:u.parity,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t,i=e.target.value;w.updateHostCommuication((0,l.Z)((0,l.Z)({},w.hostCommuication),{},{serialPortCommunication:(0,l.Z)((0,l.Z)({},null===(t=w.hostCommuication)||void 0===t?void 0:t.serialPortCommunication),{},{parity:i})}))},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),C.map((function(e){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})]})]}),(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:"Flow control (Handshaking)"}),(0,h.jsxs)("td",{children:[" ",(0,h.jsxs)("select",{name:"defualtLab",value:null===(p=w.hostCommuication)||void 0===p||null===(y=p.serialPortCommunication)||void 0===y?void 0:y.flowControl,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t,i=e.target.value;w.updateHostCommuication((0,l.Z)((0,l.Z)({},w.hostCommuication),{},{serialPortCommunication:(0,l.Z)((0,l.Z)({},null===(t=w.hostCommuication)||void 0===t?void 0:t.serialPortCommunication),{},{flowControl:i})}))},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),j.map((function(e){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})]})]}),(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:"Protocol"}),(0,h.jsxs)("td",{children:[" ",(0,h.jsxs)("select",{name:"defualtLab",value:null===(Z=w.hostCommuication)||void 0===Z||null===(S=Z.serialPortCommunication)||void 0===S?void 0:S.protocol,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t,i=e.target.value;w.updateHostCommuication((0,l.Z)((0,l.Z)({},w.hostCommuication),{},{serialPortCommunication:(0,l.Z)((0,l.Z)({},null===(t=w.hostCommuication)||void 0===t?void 0:t.serialPortCommunication),{},{protocol:i})}))},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),b.map((function(e){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})]})]})]})]})})})),Z=function(e){var t=(0,s.useState)(e.data[0][1]),i=(0,a.Z)(t,2),o=i[0],n=i[1],l=(0,s.useState)(e.data[0][0]),r=(0,a.Z)(l,2),u=r[0],d=r[1];return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{className:"mb-2",children:(0,h.jsx)(c.aV,{space:2,direction:"row",justify:"center",fill:!0,children:(0,h.jsx)("div",{children:e.data.map((function(e,t){return(0,h.jsx)("div",{className:"mb-2",style:{display:"inline-block",marginLeft:2,marginBottom:2},children:(0,h.jsx)(c.EK.zx,{size:"medium",type:"solid",onClick:function(){n(e[1]),d(e[0])},style:{margin:4},children:e[0]},t)},t)}))})})}),(0,h.jsx)("div",{className:"rounded-lg overflow-auto",children:(0,h.jsxs)(m.iA,{bordered:!0,children:[(0,h.jsxs)("thead",{children:[(0,h.jsx)("th",{style:{color:"green"},children:u}),(0,h.jsx)("th",{style:{color:"green"},children:"Value"})]}),(0,h.jsx)("tbody",{children:o.map((function(e,t){return(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{children:"".concat(e.field_no,". ").concat(e.filed.charAt(0).toUpperCase()+e.filed.slice(1).replaceAll("_"," "))}),(0,h.jsx)("th",{children:e.value})]},t)}))})]})})]})},S=i(4942),w=i(93433),I=i(37762),N=i(43144),P=i(15671),k=(0,N.Z)((function e(t){var i=this;(0,P.Z)(this,e),this._blockStart=void 0,this._blockEnd=void 0,this._fileds=void 0,this._instrumentType="",this.parseSegment=function(e){var t=e.split(i._fileds.FIELD_DELIMITER);return"MSH"===t[0]&&(t[0]=i._fileds.FIELD_DELIMITER,t=["MSH"].concat(t)),{fields:t.shift(),values:t}},this.parse=function(e){switch(i._instrumentType){case"ERP":case"ERP_REG":if("MSH"!==e.slice(0,3))return null;break;case"URISED":if(e.slice(0,4)!==i._blockStart)return null;if(e.slice(e.length-12)!==i._blockEnd)return null;e=e.slice(4,-12);break;case"HORIBA_H550":if(console.log({start:e.slice(0,5),ss:i._blockStart}),console.log({end:e.slice(e.length-9),ss:i._blockEnd}),e.slice(0,5)!==i._blockStart)return null;if(e.slice(e.length-9)!==i._blockEnd)return null;e=e.slice(5,-9)}console.log({data:e});var t,o=[],n=new RegExp(i._fileds.NEW_LINE),l=e.split(n),a=(0,I.Z)(l);try{for(a.s();!(t=a.n()).done;){var s=t.value;if(""!==s){var r=s.replace(/  +/g,""),c=i.parseSegment(r);o.push(c)}}}catch(u){a.e(u)}finally{a.f()}return console.log({result:o}),o},this.parseString=function(e){return e&&"string"===typeof e?e=i.parse(e):null},this._blockStart=void 0!==t.blockStart?t.blockStart.replaceAll(/&amp;/g,"&").replaceAll(/&gt;/g,">").replaceAll(/&lt;/g,"<").replaceAll(/&quot;/g,'"').replaceAll(/\xe2\x80\x99/g,"\u2019").replaceAll(/\xe2\x80\xa6/g,"\u2026").toString():void 0,this._blockEnd=t.blockEnd?t.blockEnd.replaceAll(/&amp;/g,"&").replaceAll(/&gt;/g,">").replaceAll(/&lt;/g,"<").replaceAll(/&quot;/g,'"').replaceAll(/\xe2\x80\x99/g,"\u2019").replaceAll(/\xe2\x80\xa6/g,"\u2026").toString():void 0;var o={};t.fileds.map((function(e){return o[e.filed]=e.value.replaceAll(/&amp;/g,"&").replaceAll(/&gt;/g,">").replaceAll(/&lt;/g,"<").replaceAll(/&quot;/g,'"').replaceAll(/\xe2\x80\x99/g,"\u2019").replaceAll(/\xe2\x80\xa6/g,"\u2026").toString()})),this._fileds=o,this._instrumentType=t.instrumentType})),_=function(){function e(t,i,o){(0,P.Z)(this,e),this._message=void 0,this._config=void 0,t=new k(i).parseString(t),this._message=t,this._config=o}return(0,N.Z)(e,[{key:"getSegmentsByType",value:function(e){return this._message.segments.filter((function(t){return t.name===e}))}},{key:"process",value:function(){var e,t=[],i=(0,I.Z)(this._message);try{for(i.s();!(e=i.n()).done;){var o=e.value;console.log({message:o});var n=[];if(this._config.mapping[o.fields.toLowerCase()]){var l,a=(0,I.Z)(this._config.mapping[o.fields.toLowerCase()].values);try{for(a.s();!(l=a.n()).done;){var s=l.value;if(void 0!==s&&s.field&&o instanceof Object){var r=s.component[0],c=this._generateObject(s.field,o.values[r-1],s.field_no);s.mandatory&&n.push(c)}}}catch(u){a.e(u)}finally{a.f()}n.sort((function(e,t){return e.field_no-t.field_no})),t.push([[o.fields],n])}}}catch(u){i.e(u)}finally{i.f()}return console.log({obj:t}),t}},{key:"_generateObject",value:function(e,t,i){return{filed:e.split(".")[1],value:t,field_no:i}}}]),e}(),A=function(){function e(t,i,o){(0,P.Z)(this,e),this._message=void 0,this._interfaceManager=void 0,this._config=void 0,this._decoder=void 0,this._message=t,this._interfaceManager=i,this._config=o,this._decoder=this._setDynamicDecoder()}return(0,N.Z)(e,[{key:"decode",value:function(){return this._message?this._decoder.process():null}},{key:"_setDynamicDecoder",value:function(){return new _(this._message,this._interfaceManager,this._config)}}]),e}();function T(e,t,i){return new A(e,t,i).decode()}var H,M,O,R=(0,N.Z)((function e(){var t=this;(0,P.Z)(this,e),this.mapping=function(){var e=(0,n.Z)((0,o.Z)().mark((function e(t){var i,n,l,a,s,r,c,u,m,h,p,v,f,x;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=d.gg.segmentMappingStore.listSegmentMapping,n=[],l=[],a=void 0!==t.dataFlowFrom?t.dataFlowFrom.replaceAll(/&amp;/g,"&").replaceAll(/&gt;/g,">").replaceAll(/&lt;/g,"<").replaceAll(/&quot;/g,'"').replaceAll(/\xe2\x80\x99/g,"\u2019").replaceAll(/\xe2\x80\xa6/g,"\u2026"):void 0,s=(0,I.Z)(i);try{for(s.s();!(r=s.n()).done;)(c=r.value).equipmentType===t.instrumentType&&c.dataFlowFrom===a&&l.push({segments:c.segments,field:"".concat(null===(u=c.segments)||void 0===u?void 0:u.toLowerCase(),".").concat(null===(m=c.element_name)||void 0===m?void 0:m.toLowerCase().replaceAll(" ","_")),component:[Number(c.field_no),1],field_no:Number(c.field_no),mandatory:c.mandatory,default:""})}catch(o){s.e(o)}finally{s.f()}for(h=l.reduce((function(e,t){return e[t.segments]=[].concat((0,w.Z)(e[t.segments]||[]),[t]),e}),{}),p=Object.entries(h),v=0,f=p;v<f.length;v++)x=f[v],n.push((0,S.Z)({},x[0].toLowerCase()||"",{values:x[1]}));return e.abrupt("return",n);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.convetTo=function(e,i,a){return new Promise(function(){var s=(0,n.Z)((0,o.Z)().mark((function n(s,r){var c,u,m,h,p,v,f,x,g,C;return(0,o.Z)().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,t.mapping(i);case 3:if(c=o.sent,"HL7"!==e){o.next=14;break}u={},m=(0,I.Z)(c);try{for(m.s();!(h=m.n()).done;)for(p=h.value,v=0,f=Object.keys(p);v<f.length;v++)x=f[v],u[x]=p[x]}catch(n){m.e(n)}finally{m.f()}if(g={mapping:u},C=T(a,d.gg.hostCommunicationStore.selectedInterfaceManager,g)){o.next=12;break}return o.abrupt("return",alert("Please enter correct message"));case 12:d.gg.hostCommunicationStore.updateConvertTo((0,l.Z)((0,l.Z)({},d.gg.hostCommunicationStore.convertTo),{},{hl7:C})),d.gg.hostCommunicationStore.updateHostCommuication((0,l.Z)({},d.gg.hostCommunicationStore.hostCommuication));case 14:o.next=19;break;case 16:o.prev=16,o.t0=o.catch(0),r(o.t0);case 19:case"end":return o.stop()}}),n,null,[[0,16]])})));return function(e,t){return s.apply(this,arguments)}}())},this.newMessage=function(e){d.gg.hostCommunicationStore.updateHostCommuication((0,l.Z)((0,l.Z)({},d.gg.hostCommunicationStore.hostCommuication),{},{txtDataReceivefromInstrument:e,convertTo:""})),d.gg.hostCommunicationStore.updateConvertTo((0,l.Z)((0,l.Z)({},d.gg.hostCommunicationStore.convertTo),{},{hl7:void 0}))}})),D=new R,L=(0,N.Z)((function e(t,i){var o=this;(0,P.Z)(this,e),this._message=void 0,this._config=void 0,this.decode=function(){var e,t="",i=o._message.split(/[\n, ]+/),n=(0,I.Z)(i);try{var l=function(){var i=e.value,n=o._config.filter((function(e){return e.hexadecimal===i}));t=Array.isArray(n)&&n.length>0?t+n[0].ascii:t};for(n.s();!(e=n.n()).done;)l()}catch(a){n.e(a)}finally{n.f()}return t},this._message=t,this._config=i})),F=i(4793),E=(0,N.Z)((function e(){var t=this;(0,P.Z)(this,e),this.conversationMapping=(0,n.Z)((0,o.Z)().mark((function e(){var t,i,n,l,a;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=d.gg.dataConversationStore.listdataConversation,i=[],n=(0,I.Z)(t);try{for(n.s();!(l=n.n()).done;)a=l.value,i.push({hexadecimal:a.hexadecimal,ascii:void 0!==a.ascii?a.ascii.replaceAll(/&amp;/g,"&").replaceAll(/&gt;/g,">").replaceAll(/&lt;/g,"<").replaceAll(/&quot;/g,'"').replaceAll(/\xe2\x80\x99/g,"\u2019").replaceAll(/\xe2\x80\xa6/g,"\u2026").toString():void 0})}catch(o){n.e(o)}finally{n.f()}return e.abrupt("return",i);case 5:case"end":return e.stop()}}),e)}))),this.hextoascii=function(){var e=(0,n.Z)((0,o.Z)().mark((function e(i){var n,a;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.conversationMapping();case 2:return n=e.sent,e.next=5,n;case 5:if(e.t0=e.sent.length,!(e.t0>0)){e.next=9;break}o=i,s=(0,F.ZN)(n),a=new L(o,s).decode(),d.gg.hostCommunicationStore.updateHostCommuication((0,l.Z)((0,l.Z)({},d.gg.hostCommunicationStore.hostCommuication),{},{txtDataReceivefromInstrument:a}));case 9:case"end":return e.stop()}var o,s}),e)})));return function(t){return e.apply(this,arguments)}}()})),z=new E,V=i(83358),K=i(42490),B=(O=(0,r.Pi)((function(){var e,t,i,r,m,v,f,x,g,C,j,b,S,w,I=(0,d.mZ)(),N=I.loginStore,P=I.interfaceManagerStore,k=I.dataConversationStore,_=I.hostCommunicationStore,A=I.routerStore,T=I.segmentMappingStore,H=(0,s.useState)({}),O=(0,a.Z)(H,2),R=O[0],L=(O[1],(0,s.useState)({})),E=(0,a.Z)(L,2),V=E[0],B=E[1],Q=(0,s.useState)(!0),q=(0,a.Z)(Q,2),U=q[0],$=q[1];return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(c.h4,{children:[(0,h.jsx)(c.CD,{title:(null===(e=A.selectedComponents)||void 0===e?void 0:e.title)||""}),(0,h.jsx)(c.Nd,{store:N})]}),K.o.checkPermission((0,F.ZN)(A.userPermission),"Add")&&(0,h.jsx)(c.EK.Kn,{show:U,onClick:function(e){return $(!U)}}),(0,h.jsxs)("div",{className:"mx-auto",children:[(0,h.jsxs)("div",{className:"p-2 rounded-lg shadow-xl",children:[(0,h.jsxs)(c.rj,{cols:3,children:[(0,h.jsxs)(c.aV,{direction:"col",space:4,justify:"stretch",fill:!0,children:[(0,h.jsxs)(c.rj,{cols:2,children:[(0,h.jsx)(c.l0.ZD,{label:null!==(t=_.hostCommuication)&&void 0!==t&&t.manualAutomaticMode?"Automatic":"Manual",id:"manualMode",value:null===(i=_.hostCommuication)||void 0===i?void 0:i.manualAutomaticMode,onChange:function(e){_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{manualAutomaticMode:e}))}}),(0,h.jsxs)("div",{children:[(0,h.jsxs)("label",{children:["Connection Estabilished :"," ","".concat(null!==(r=_.hostCommuication)&&void 0!==r&&r.manualAutomaticMode?"On":"Off")]}),(0,h.jsx)("label",{style:{color:null!==(m=_.hostCommuication)&&void 0!==m&&m.manualAutomaticMode?"green":"red"},children:"Connection estabilished success."})]})]}),(0,h.jsx)(c.l0.SP,{label:"Instrument Type",id:"instrumentType",children:(0,h.jsxs)("select",{name:"instrumentType",value:null===(v=_.hostCommuication)||void 0===v?void 0:v.instrumentType,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t,i=e.target.value;_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{instrumentType:i}));var o=null===(t=P.listInterfaceManager)||void 0===t?void 0:t.find((function(e){return e.instrumentType===i}));_.updateSelectedInterfaceManager(o),_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{instrumentName:null===o||void 0===o?void 0:o.instrumentName}))},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),null===(f=P.listInterfaceManager)||void 0===f?void 0:f.map((function(e){return(0,h.jsx)("option",{value:e.instrumentType,children:"".concat(e.instrumentType," - ").concat(e.dataFlowFrom.replaceAll(/&amp;/g,"&").replaceAll(/&gt;/g,">").replaceAll(/&lt;/g,"<").replaceAll(/&quot;/g,'"').replaceAll(/\xe2\x80\x99/g,"\u2019").replaceAll(/\xe2\x80\xa6/g,"\u2026").toString())},e.instrumentType)}))]})}),(0,h.jsx)(c.l0.II,{label:"Instrument Name",id:"instrumentName",placeholder:"Instrument Name",value:null===(x=_.hostCommuication)||void 0===x?void 0:x.instrumentName,onChange:function(e){_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{instrumentName:e}))}}),(0,h.jsx)(c.l0.SP,{label:"Mode of Communication",id:"modeOfCommunication",children:(0,h.jsxs)("select",{name:"defualtLab",value:null===(g=_.hostCommuication)||void 0===g?void 0:g.modeOfCommunication,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t=e.target.value;_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{modeOfCommunication:t}))},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),[{title:"Broadcasting"},{title:"Host Query"},{title:"File based"}].map((function(e,t){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})}),(0,h.jsx)(c.l0.SP,{label:"Type of Query",id:"typeOfQuery",children:(0,h.jsxs)("select",{name:"defualtLab",value:null===(C=_.hostCommuication)||void 0===C?void 0:C.typeOfQuery,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t=e.target.value;_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{typeOfQuery:t}))},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),[{title:"Unidirectional"},{title:"Bidirectional"},{title:"Host Query\xa0"}].map((function(e,t){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})})]}),(0,h.jsxs)(c.aV,{direction:"col",space:4,justify:"stretch",fill:!0,children:[(0,h.jsx)(c.l0.SP,{label:"Mode of Connection ",id:"modeOfConnection",children:(0,h.jsxs)("select",{name:"defualtLab",value:null===(j=_.hostCommuication)||void 0===j?void 0:j.modeOfConnection,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t=e.target.value;_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{modeOfConnection:t}))},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),[{title:"Serial Port Communication"},{title:"TCP/IP Communication"}].map((function(e,t){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})}),"Serial Port Communication"===(null===(b=_.hostCommuication)||void 0===b?void 0:b.modeOfConnection)&&(0,h.jsx)(y,{}),"TCP/IP Communication"===(null===(S=_.hostCommuication)||void 0===S?void 0:S.modeOfConnection)&&(0,h.jsx)(p,{})]}),(0,h.jsxs)(c.aV,{direction:"col",space:10,align:"between",justify:"center",children:[(0,h.jsx)("label",{children:"Status : Pending"}),(0,h.jsx)("div",{className:"flex",children:(0,h.jsx)(c.EK.zx,{size:"medium",type:"solid",onClick:function(){},children:"Save Setting"})}),(0,h.jsx)("div",{className:"flex mb-2",children:(0,h.jsx)(c.EK.zx,{size:"medium",type:"solid",onClick:function(){},children:"Generate Driver"})})]}),(0,h.jsx)("div",{className:"clearfix"})]}),(0,h.jsxs)(c.rj,{cols:2,children:[(0,h.jsx)(c.l0.SP,{label:"Apply Filtr on",id:"applyFiltrOn",children:(0,h.jsxs)("select",{name:"defualtLab",value:null===(w=_.hostCommuication)||void 0===w?void 0:w.applyFiltrOn,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t=e.target.value;_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{applyFiltrOn:t}))},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),[{title:"Patient Data / QC Data"},{title:"Output Filter"},{title:"Import"}].map((function(e,t){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})}),(0,h.jsx)(c.l0.II,{label:"Log File",id:"logFileDataReceivefromInstrument",placeholder:"Log File",onChange:function(e){_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{logFileDataReceivefromInstrument:e}))}}),(0,h.jsx)("div",{className:"clerfix"})]}),(0,h.jsx)(u.UQ,{allowMultiple:!0,children:[{title:"Hex to ASCII"},{title:"Source File"},{title:"Send data to Intrument"},{title:"Convert to"},{title:"Output in"}].map((function(e){var t,i,a,s,r,d,m,p,v,f,x,g,C,j,b,y,S,w;return(0,h.jsxs)(u.Qd,{title:"".concat(e.title),children:["Hex to ASCII"===e.title&&(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(c.aV,{direction:"col",space:4,justify:"stretch",fill:!0,children:[(0,h.jsx)("div",{className:"grid grid-cols-3 gap-4",children:(0,h.jsx)("div",{className:"col-span-2",children:(0,h.jsx)(c.l0.$l,{label:"",id:"txtHexToAscii",disabled:void 0==k.listdataConversation||void 0===(null===(t=_.hostCommuication)||void 0===t?void 0:t.instrumentType)||!((null===(i=k.listdataConversation)||void 0===i?void 0:i.length)>0),placeholder:"Hex",value:null===(a=_.hostCommuication)||void 0===a?void 0:a.hex,onChange:function(e){z.hextoascii(e),_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{hex:e}))}})})}),(0,h.jsx)("div",{className:"clearfix"})]})}),"Source File"===e.title&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(c.rj,{cols:2,children:[(0,h.jsx)(c.l0.SP,{label:"Source File",id:"sourceFileDataReceivefromInstrument",children:(0,h.jsxs)("select",{name:"defualtLab",value:null===(s=_.hostCommuication)||void 0===s?void 0:s.sourceFileDataReceivefromInstrument,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t=e.target.value;_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{sourceFileDataReceivefromInstrument:t}))},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),[{title:"Hex decimal"},{title:"HL7"},{title:"ASTM"}].map((function(e,t){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})}),(0,h.jsx)(c.l0.SP,{label:"Source Repository",id:"SourceRepositoryDataReceivefromInstrument",children:(0,h.jsxs)("select",{name:"defualtLab",disabled:void 0==T.listSegmentMapping||void 0===(null===(r=_.hostCommuication)||void 0===r?void 0:r.instrumentType)||!((null===(d=T.listSegmentMapping)||void 0===d?void 0:d.length)>0),value:null===(m=_.hostCommuication)||void 0===m?void 0:m.SourceRepositoryDataReceivefromInstrument,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t=e.target.value;if(_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{SourceRepositoryDataReceivefromInstrument:t})),"Phiysical file Location"===t){var i;if(_.hostCommuication,null===(i=_.hostCommuication)||void 0===i||!i.instrumentType)return alert("Please entery instrument type");B({show:!0,title:"Import file!"})}},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),[{title:"Phiysical file Location"},{title:"Collection of a database"}].map((function(e,t){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})}),(0,h.jsx)("div",{className:"clearfix"})]}),(0,h.jsxs)(c.aV,{direction:"col",space:4,justify:"stretch",fill:!0,children:[(0,h.jsxs)("div",{className:"grid grid-cols-3 gap-4",children:[(0,h.jsx)("div",{className:"col-span-2",children:(0,h.jsx)(c.l0.$l,{label:"",id:"txtDataReceivefromInstrument",placeholder:"Source file (Data Received Data from Instrument)",disabled:void 0==T.listSegmentMapping||void 0===(null===(p=_.hostCommuication)||void 0===p?void 0:p.instrumentType)||!((null===(v=T.listSegmentMapping)||void 0===v?void 0:v.length)>0),value:null===(f=_.hostCommuication)||void 0===f?void 0:f.txtDataReceivefromInstrument,onChange:function(e){D.newMessage(e)}})}),(0,h.jsx)("div",{className:"flex flex-col items-center justify-center",children:(0,h.jsx)("div",{children:(0,h.jsx)(c.EK.zx,{size:"medium",type:"solid",onClick:function(){var e;M.emit("hostCommunicationSourceFile",null===(e=_.hostCommuication)||void 0===e?void 0:e.txtDataReceivefromInstrument)},children:"Send"})})})]}),(0,h.jsx)("div",{className:"clearfix"})]})]}),"Send data to Intrument"===e.title&&(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)("div",{className:"grid grid-cols-3 gap-4",children:[(0,h.jsx)("div",{className:"col-span-2",children:(0,h.jsx)(c.l0.$l,{label:"",id:"txtSendDatafromInstrument",placeholder:"Send data to Instrument",value:null===(x=_.hostCommuication)||void 0===x?void 0:x.txtSendDatafromInstrument,onChange:function(e){_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{txtSendDatafromInstrument:e}))}})}),(0,h.jsx)("div",{className:"flex flex-col items-center justify-center",children:(0,h.jsx)("div",{children:(0,h.jsx)(c.EK.zx,{size:"medium",type:"solid",onClick:function(){var e;M.emit("hostCommunicationSendDataToInstrument",null===(e=_.hostCommuication)||void 0===e?void 0:e.txtSendDatafromInstrument)},children:"Send"})})})]})}),"Convert to"===e.title&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(c.rj,{cols:2,children:[(0,h.jsx)(c.l0.SP,{label:"Convert to",id:"convertTo",children:(0,h.jsxs)("select",{name:"defualtLab",value:null===(g=_.hostCommuication)||void 0===g?void 0:g.convertTo,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(){var e=(0,n.Z)((0,o.Z)().mark((function e(t){var i,n;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.target.value,_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{convertTo:n,SourceRepositoryDataReceivefromInstrument:""})),e.next=4,D.convetTo(n,_.selectedInterfaceManager,(null===(i=_.hostCommuication)||void 0===i?void 0:i.txtDataReceivefromInstrument)||"");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),[{title:"Hex decimal"},{title:"HL7"},{title:"ASTM"}].map((function(e,t){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})}),(0,h.jsx)(c.l0.SP,{label:"Output Repository",id:"outputRepository",children:(0,h.jsxs)("select",{name:"defualtLab",value:null===(C=_.hostCommuication)||void 0===C?void 0:C.outputRepository,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t=e.target.value;_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{outputRepository:t}))},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),[{title:"Phiysical file Location"},{title:"Collection of a database"}].map((function(e,t){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})}),(0,h.jsx)("div",{className:"clearfix"})]}),(0,h.jsxs)(c.aV,{direction:"col",space:4,justify:"stretch",fill:!0,children:[(0,h.jsxs)("div",{className:"grid grid-cols-3 gap-4",children:[(0,h.jsx)("div",{className:"col-span-2",children:void 0!==(null===(j=_.convertTo)||void 0===j?void 0:j.hl7)&&(0,h.jsx)(Z,{data:(0,F.ZN)(_.convertTo.hl7)})}),(0,h.jsx)("div",{className:"flex flex-col items-center justify-center",children:(0,h.jsx)("div",{children:(0,h.jsx)(c.EK.zx,{size:"medium",type:"solid",onClick:function(){},children:"Convert"})})})]}),(0,h.jsx)("div",{className:"clearfix"})]})]}),"Output in"===e.title&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(c.aV,{direction:"col",space:4,justify:"start",children:[(0,h.jsx)(c.l0.SP,{label:"Output in",id:"outPutIn",children:(0,h.jsxs)("select",{name:"defualtLab",value:null===(b=_.hostCommuication)||void 0===b?void 0:b.outPutIn,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t=e.target.value;_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{outPutIn:t}))},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),[{title:"PDF"},{title:"CSV"},{title:"TXT"},{title:"Table/Collection"},{title:"API"},{title:"Graph"}].map((function(e,t){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})}),(0,h.jsx)("div",{className:"clearfix"})]}),(0,h.jsxs)(c.aV,{direction:"col",space:4,justify:"stretch",fill:!0,children:[(0,h.jsxs)("div",{className:"grid grid-cols-3 gap-4",children:[(0,h.jsx)("div",{className:"col-span-2",children:(0,h.jsx)(c.l0.$l,{id:"txtOutputin",placeholder:"Output in",value:null===(y=_.hostCommuication)||void 0===y?void 0:y.txtOutputin,onChange:function(e){_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{txtOutputin:e}))}})}),(0,h.jsx)("div",{className:"flex flex-col items-center justify-center",children:(0,h.jsx)("div",{children:(0,h.jsx)(c.EK.zx,{size:"medium",type:"solid",onClick:function(){},children:"Output"})})})]}),(0,h.jsx)("div",{className:"clearfix"})]}),(0,h.jsxs)(c.rj,{cols:2,children:[(0,h.jsx)(c.l0.SP,{label:"Output for Third party Software",id:"outputforThirdpartySoftware",children:(0,h.jsxs)("select",{name:"defualtLab",value:null===(S=_.hostCommuication)||void 0===S?void 0:S.outputforThirdpartySoftware,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t=e.target.value;_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{outputforThirdpartySoftware:t}))},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),[{title:"Serial to Serial"},{title:"HL7"},{title:"ASTM"}].map((function(e,t){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})}),(0,h.jsx)(c.l0.SP,{label:"Output Repository",id:"SourceRepositoryThiredPartySoftare",children:(0,h.jsxs)("select",{name:"defualtLab",value:null===(w=_.hostCommuication)||void 0===w?void 0:w.SourceRepositoryThiredPartySoftare,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md",onChange:function(e){var t=e.target.value;_.updateHostCommuication((0,l.Z)((0,l.Z)({},_.hostCommuication),{},{SourceRepositoryThiredPartySoftare:t}))},children:[(0,h.jsx)("option",{selected:!0,children:"Select"}),[{title:"Phiysical file Location"},{title:"Collection of a database"}].map((function(e,t){return(0,h.jsx)("option",{value:e.title,children:e.title},e.title)}))]})}),(0,h.jsx)("div",{className:"clearfix"})]})]})]})}))}),(0,h.jsx)("br",{}),(0,h.jsxs)(c.aV,{direction:"row",space:3,align:"center",children:[(0,h.jsx)(c.EK.zx,{size:"medium",type:"solid",icon:c.ny.vc,onClick:function(){},children:"Save"}),(0,h.jsx)(c.EK.zx,{size:"medium",type:"outline",icon:c.ny.JW,onClick:function(){window.location.reload()},children:"Clear"})]})]}),(0,h.jsx)("br",{}),(0,h.jsx)(c.WZ,(0,l.Z)((0,l.Z)({},R),{},{click:function(){}}))]}),(0,h.jsx)(c.Z9,(0,l.Z)((0,l.Z)({accept:".csv,.xlsx,.xls,.txt,.hl7"},V),{},{click:function(e){B({show:!1});var t=new FileReader;t.addEventListener("load",(function(e){var t=e.target.result.split(/\r/).join("\n");D.newMessage(t)})),t.addEventListener("error",(function(e){return alert(e.target.error.name)})),t.readAsText(e)},close:function(){B({show:!1})}}))]})})),(0,r.Pi)((function(e){var t=(0,d.mZ)().hostCommunicationStore;return H=(0,V.io)("restapi-hosturl".split("/api")[0],{transports:["websocket"]}),(0,s.useEffect)((function(){H.on("hostCommunicationSendDataToInstrument",(function(e){t.updateHostCommuication((0,l.Z)((0,l.Z)({},t.hostCommuication),{},{txtSendDatafromInstrument:e}))})),H.on("hostCommunicationSourceFile",(function(e){t.updateHostCommuication((0,l.Z)((0,l.Z)({},t.hostCommuication),{},{txtDataReceivefromInstrument:e}))}))}),[]),(0,h.jsx)(O,(0,l.Z)({},e))}))),Q=B}}]);
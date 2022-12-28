"use strict";(self.webpackChunklimsplus_portal=self.webpackChunklimsplus_portal||[]).push([[357],{41357:function(t,e,n){n.r(e);var o,i,s,r=n(72791),l=n(8907),a=n(40408),d=n(97892),c=n.n(d),u=n(78697),f=n(80184),v=(0,l.Pi)((function(){var t,e=(0,u.mZ)(),n=e.loginStore,l=e.loginActivityStore,d=e.routerStore;return(0,r.useEffect)((function(){l.fetchLoginActivity()}),[]),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(a.h4,{children:[(0,f.jsx)(a.CD,{title:(null===(t=d.selectedComponents)||void 0===t?void 0:t.title)||""}),(0,f.jsx)(a.Nd,{store:n})]}),(0,f.jsx)("div",{className:"mx-auto  flex-wrap",children:(0,f.jsx)("div",{className:"p-2 rounded-lg shadow-xl overflow-auto",children:(0,f.jsx)("div",{style:{position:"relative"},children:(0,f.jsx)(a.tM,{id:"_id",data:l.listLoginActivity||[],totalSize:l.listLoginActivityCount,columns:[{dataField:"_id",text:"Id",hidden:!0,csvExport:!1},{dataField:"userId",text:"User details",sort:!0,csvFormatter:function(t,e,n){return"UserId: ".concat(e.user.userId,", User Name: ").concat(e.user.fullName,",  Lab: ").concat(e.user.lab,", Role: ").concat(e.user.role)},filter:(0,a.DN)({getFilter:function(t){o=t}}),headerClasses:"textHeader5",editable:!1,formatter:function(t,e){var n,o,i,s;return(0,f.jsxs)("div",{children:[(0,f.jsxs)("h6",{children:["UserId: ".concat(null===(n=e.user)||void 0===n?void 0:n.userId)," "]}),(0,f.jsx)("h6",{children:"User Name: ".concat(null===(o=e.user)||void 0===o?void 0:o.fullName)}),(0,f.jsx)("h6",{children:"Lab: ".concat(null===(i=e.user)||void 0===i?void 0:i.lab)}),(0,f.jsx)("h6",{children:"Role: ".concat(null===(s=e.user)||void 0===s?void 0:s.role)})]})}},{dataField:"systemInfo",text:"System info",sort:!0,filter:(0,a.DN)({getFilter:function(t){i=t}}),csvFormatter:function(t,e,n){var o,i,s,r,l,a,d,c,u,f,v,m;return"Device:".concat(e.systemInfo.device,", OS, name:").concat(null===(o=e.systemInfo)||void 0===o||null===(i=o.workstation)||void 0===i||null===(s=i.os)||void 0===s?void 0:s.name,",  version:").concat(null===(r=e.systemInfo)||void 0===r||null===(l=r.workstation)||void 0===l||null===(a=l.os)||void 0===a?void 0:a.version,", Browser,name: ").concat(null===(d=e.systemInfo)||void 0===d||null===(c=d.workstation)||void 0===c||null===(u=c.browser)||void 0===u?void 0:u.name,"\n                    version:").concat(null===(f=e.systemInfo)||void 0===f||null===(v=f.workstation)||void 0===v||null===(m=v.browser)||void 0===m?void 0:m.version)},headerClasses:"textHeader5",formatter:function(t,e){var n,o,i,s,r,l,a,d,c,u,v,m,h;return(0,f.jsxs)("div",{children:[(0,f.jsxs)("h6",{children:["Device: ".concat(null===(n=e.systemInfo)||void 0===n?void 0:n.device)," "]}),(0,f.jsx)("h6",{children:" OS:"}),(0,f.jsx)("h6",{className:"ml-4",children:"name: ".concat(null===(o=e.systemInfo)||void 0===o||null===(i=o.workstation)||void 0===i||null===(s=i.os)||void 0===s?void 0:s.name,"\n                                      version:").concat(null===(r=e.systemInfo)||void 0===r||null===(l=r.workstation)||void 0===l||null===(a=l.os)||void 0===a?void 0:a.version)}),(0,f.jsx)("h6",{children:" Browser:"}),(0,f.jsx)("h6",{className:"ml-4",children:"name: ".concat(null===(d=e.systemInfo)||void 0===d||null===(c=d.workstation)||void 0===c||null===(u=c.browser)||void 0===u?void 0:u.name,"\n                                      version:").concat(null===(v=e.systemInfo)||void 0===v||null===(m=v.workstation)||void 0===m||null===(h=m.browser)||void 0===h?void 0:h.version)})]})}},{dataField:"ipInfo",text:"Ip Information",sort:!0,filter:(0,a.DN)({getFilter:function(t){s=t}}),headerClasses:"textHeader3",csvFormatter:function(t,e,n){return"Ip:".concat(e.systemInfo.ipInfo.ip,", Address:").concat(e.systemInfo.ipInfo.city,", ").concat(e.systemInfo.ipInfo.region,", ").concat(e.systemInfo.ipInfo.country,", Location:").concat(e.systemInfo.ipInfo.ll)},formatter:function(t,e){var n,o,i,s;return(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)("div",{children:[(0,f.jsxs)("h6",{children:["Ip: ",null===(n=e.systemInfo)||void 0===n||null===(o=n.ipInfo)||void 0===o?void 0:o.ip]}),e.systemInfo.ipInfo.city&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("h6",{children:["Address:"," ","".concat(e.systemInfo.ipInfo.city,", ").concat(e.systemInfo.ipInfo.region,", ").concat(e.systemInfo.ipInfo.country)]}),(0,f.jsxs)("h6",{children:["Location: ","".concat(null===(i=e.systemInfo)||void 0===i||null===(s=i.ipInfo)||void 0===s?void 0:s.ll)]})]})]})})}},{dataField:"dateOfEntry",text:"In",headerClasses:"textHeader4",sort:!0,csvFormatter:function(t,e,n){return e.dateOfEntry?c()(e.dateOfEntry).format("YYYY-MM-DD h:mm:ss a"):""},filter:(0,a.w9)(),filterRenderer:function(t,e){return(0,f.jsx)(a.fU,{onFilter:t,column:e})},formatter:function(t,e){return c()(e.dateOfEntry).format("YYYY-MM-DD h:mm:ss a")}},{dataField:"lastUpdated",text:"Out",headerClasses:"textHeader4",sort:!0,csvFormatter:function(t,e,n){return e.lastUpdated?c()(e.lastUpdated).format("YYYY-MM-DD h:mm:ss a"):""},filter:(0,a.w9)(),filterRenderer:function(t,e){return(0,f.jsx)(a.fU,{onFilter:t,column:e})},formatter:function(t,e){return e.lastUpdated?c()(e.lastUpdated).format("YYYY-MM-DD h:mm:ss a"):"Active User"}}],onPageSizeChange:function(t,e){l.fetchLoginActivity(t,e)},onFilter:function(t,e,n,o){l.LoginActivityService.filter({input:{type:t,filter:e,page:n,limit:o}})},clearAllFilter:function(){o(""),i(""),s("")},isEditModify:!1,isSelectRow:!1,fileName:"Login Activity"})})})})]})}));e.default=v}}]);
//# sourceMappingURL=357.beba3194.chunk.js.map
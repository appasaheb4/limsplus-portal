(this.webpackJsonplimsplus_portal=this.webpackJsonplimsplus_portal||[]).push([[10],{856:function(e,t,o){"use strict";o.r(t);var n,r,a,i,l,u=o(60),c=o(3),s=o(15),d=o(1),g=o.n(d),h=o(21),p=o(2),m=o(154),v=o(13),S=o(14),b=o(34),f=o(9),M=(o(58),o(24)),E=o(6),O=o(11),j=function e(){Object(S.a)(this,e),this.updateShortcutMenu=function(e){return new Promise((function(t,o){O.c.post("/auth/updateShortcutMenu",e).then((function(e){t(e)})).catch((function(e){o({error:e})}))}))}},y={shortcutMenuStore:new(Object(M.c)(.1)((r=function(){function e(){Object(S.a)(this,e),Object(v.a)(this,"shortcutMenuList",a,this),Object(v.a)(this,"isDragDropList",i,this),Object(v.a)(this,"updateShortcutMenu",l,this),Object(E.makeAutoObservable)(this)}return Object(b.a)(e,[{key:"ShortcutMenuService",get:function(){return new j}},{key:"updateDragDrop",value:function(e){this.isDragDropList=e}}]),e}(),a=Object(f.a)(r.prototype,"shortcutMenuList",[M.b,E.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),i=Object(f.a)(r.prototype,"isDragDropList",[M.b,E.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),Object(f.a)(r.prototype,"ShortcutMenuService",[E.computed],Object.getOwnPropertyDescriptor(r.prototype,"ShortcutMenuService"),r.prototype),l=Object(f.a)(r.prototype,"updateShortcutMenu",[E.action],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){e.shortcutMenuList=t}}}),Object(f.a)(r.prototype,"updateDragDrop",[E.action],Object.getOwnPropertyDescriptor(r.prototype,"updateDragDrop"),r.prototype),n=r))||n)},D=(g.a.createContext(y.shortcutMenuStore),o(26)),L=o(4),I=Object(h.a)((function(){var e,t,o,n,r,a,i=Object(L.b)().loginStore;Object(d.useEffect)((function(){var e,t=[];null===(e=L.a.routerStore.userRouter)||void 0===e||e.filter((function(e){e.children.filter((function(o){var n,r,a,i=(null===(n=D.a.loginStore.login)||void 0===n?void 0:n.shortcutMenu)&&(null===(r=D.a.loginStore.login)||void 0===r?void 0:r.shortcutMenu[D.a.loginStore.login.role||""])&&(null===(a=D.a.loginStore.login)||void 0===a?void 0:a.shortcutMenu[D.a.loginStore.login.role||""].filter((function(t){return t.category===e.name&&t.name===o.name})));i&&(null===i||void 0===i?void 0:i.length)>0?o.selected=!0:o.selected=!1,o.category=e.name,t.push(o)}))})),y.shortcutMenuStore.updateShortcutMenu(t)}),[]);return g.a.createElement(g.a.Fragment,null,g.a.createElement(p.a.Header,null,g.a.createElement(p.a.PageHeading,{title:(null===(e=L.a.routerStore.selectedComponents)||void 0===e?void 0:e.title)||""}),g.a.createElement(p.a.PageHeadingLabDetails,{store:i})),(null===(t=D.a.loginStore.login)||void 0===t?void 0:t.shortcutMenu)&&(null===(o=D.a.loginStore.login)||void 0===o?void 0:o.shortcutMenu[D.a.loginStore.login.role||""])&&(null===(n=D.a.loginStore.login)||void 0===n?void 0:n.shortcutMenu)&&(null===(r=D.a.loginStore.login)||void 0===r?void 0:r.shortcutMenu[D.a.loginStore.login.role||""].length)>0&&g.a.createElement("div",null,g.a.createElement("label",{className:"mt-2"},"Active:"),g.a.createElement(m.a,{onDragEnd:function(e){var t,o,n;console.log({user:D.a.loginStore.login});var r=Array.from((null===(t=D.a.loginStore.login)||void 0===t?void 0:t.shortcutMenu)&&(null===(o=D.a.loginStore.login)||void 0===o?void 0:o.shortcutMenu[D.a.loginStore.login.role||""])||[]),a=r.splice(e.source.index,1),i=Object(s.a)(a,1)[0];r.splice(e.destination.index,0,i),console.log({items:r}),D.a.loginStore.updateLogin(Object(c.a)(Object(c.a)({},D.a.loginStore.login),{},{shortcutMenu:Object(u.a)({},(null===(n=D.a.loginStore.login)||void 0===n?void 0:n.role)||"",r)})),y.shortcutMenuStore.updateDragDrop(!0)}},g.a.createElement(m.c,{droppableId:"characters",direction:"horizontal"},(function(e,t){var o,n,r;return g.a.createElement("ul",Object.assign({style:(r=t.isDraggingOver,{background:r?"lightblue":"none",display:"flex",padding:8,overflow:"auto"})},e.droppableProps,{ref:e.innerRef}),(null===(o=D.a.loginStore.login)||void 0===o?void 0:o.shortcutMenu)&&(null===(n=D.a.loginStore.login)||void 0===n?void 0:n.shortcutMenu[D.a.loginStore.login.role||""].map((function(e,t){return g.a.createElement(g.a.Fragment,null,g.a.createElement(m.b,{key:e.title,draggableId:e.title,index:t},(function(t,o){return g.a.createElement("div",Object.assign({className:"flex items-center bg-blue-500  p-2 m-2 rounded-md",ref:t.innerRef},t.draggableProps,t.dragHandleProps),g.a.createElement(p.a.Icons.IconContext,{color:"#fff",size:"22"},p.a.Icons.getIconTag(p.a.Icons.getIcons(e.icon)||p.a.Icons.IconBs.BsList)),g.a.createElement("li",{className:"m-2 text-white"},e.title))})))}))))}))),y.shortcutMenuStore.isDragDropList&&g.a.createElement("div",{className:"flex items-center justify-center"},g.a.createElement(p.a.Buttons.Button,{size:"medium",type:"solid",icon:p.a.Icon.Save,onClick:function(){var e,t,o,n;y.shortcutMenuStore.ShortcutMenuService.updateShortcutMenu({userRole:null===(e=D.a.loginStore.login)||void 0===e?void 0:e.role,selectedList:(null===(t=D.a.loginStore.login)||void 0===t?void 0:t.shortcutMenu)&&(null===(o=D.a.loginStore.login)||void 0===o?void 0:o.shortcutMenu[D.a.loginStore.login.role||""]),id:null===(n=D.a.loginStore.login)||void 0===n?void 0:n._id}).then((function(e){200===e.status?(p.a.Toast.success({message:"\ud83d\ude0aShortcut Menu updated."}),y.shortcutMenuStore.updateDragDrop(!1)):p.a.Toast.error({message:"\ud83d\ude14Please try agian."})}))}},"Update"),g.a.createElement("br",null)," ",g.a.createElement("br",null))),g.a.createElement("hr",null),g.a.createElement("div",{className:"flex-wrap"},g.a.createElement("label",{className:"mt-2"},"List:"),g.a.createElement("ul",{className:"grid grid-cols-6 p-2"},y.shortcutMenuStore.shortcutMenuList&&(null===(a=y.shortcutMenuStore.shortcutMenuList)||void 0===a?void 0:a.map((function(e,t){return g.a.createElement(g.a.Fragment,null,g.a.createElement("div",{className:"flex items-center bg-gray-500  p-2 m-2 rounded-md"},g.a.createElement("input",{type:"checkbox",className:"mr-2",name:e.name,value:e.name,checked:e.selected,onChange:function(){return function(e,t){var o=y.shortcutMenuStore.shortcutMenuList;o&&(o[t].selected=!o[t].selected),console.log({list:o}),y.shortcutMenuStore.updateShortcutMenu(o)}(0,t)}}),g.a.createElement(p.a.Icons.IconContext,{color:"#fff",size:"22"},p.a.Icons.getIconTag(p.a.Icons.getIcons(e.icon)||p.a.Icons.IconBs.BsList)),g.a.createElement("li",{className:"m-2 text-white"},e.title)))})))),g.a.createElement("br",null),g.a.createElement(p.a.List,{direction:"row",space:3,align:"center"},g.a.createElement(p.a.Buttons.Button,{size:"medium",type:"solid",icon:p.a.Icon.Save,onClick:function(){var e,t,o=null===(e=y.shortcutMenuStore.shortcutMenuList)||void 0===e?void 0:e.filter((function(e){return!0===e.selected}));console.log({selectedList:o});var n,r=null===(t=D.a.loginStore.login)||void 0===t?void 0:t.role;o&&(null===o||void 0===o?void 0:o.length)>0&&y.shortcutMenuStore.ShortcutMenuService.updateShortcutMenu({userRole:r,selectedList:o,id:null===(n=D.a.loginStore.login)||void 0===n?void 0:n._id}).then((function(e){console.log({res:e}),200===e.status?(p.a.Toast.success({message:"\ud83d\ude0aShortcut Menu updated."}),D.a.loginStore.updateLogin(Object(c.a)(Object(c.a)({},D.a.loginStore.login),{},{shortcutMenu:e.data.data.user.shortcutMenu}))):p.a.Toast.error({message:"\ud83d\ude14Please try agian."})}))}},"Update"))))}));t.default=I}}]);
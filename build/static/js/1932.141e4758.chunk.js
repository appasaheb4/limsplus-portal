"use strict";(self.webpackChunklimsplus_portal=self.webpackChunklimsplus_portal||[]).push([[1932],{41932:function(e,t,n){n.r(t);var i=n(1413),o=n(74165),a=n(15861),r=n(29439),s=n(72791),c=n(71672),l=n(51202),u=n(61134),p=n(10621),d=n(33657),v=n(17375),m=(n(70042),n(22414)),h=(n(3069),n(80184)),f=(0,c.Pi)((function(){var e,t=(0,m.mZ)(),n=t.receiptStore,c=t.routerStore,f=t.loginStore,g=(0,s.useState)(),P=(0,r.Z)(g,2),w=P[0],y=P[1],R=(0,u.cI)(),S=(R.control,R.handleSubmit,R.formState.errors,R.setValue,(0,s.useState)()),k=(0,r.Z)(S,2),x=k[0],Z=k[1],b=(0,s.useState)(),j=(0,r.Z)(b,2);j[0],j[1];return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(l.h4,{children:[(0,h.jsx)(l.CD,{title:(null===(e=c.selectedComponents)||void 0===e?void 0:e.title)||""}),(0,h.jsx)(l.Nd,{store:f})]}),(0,h.jsx)("div",{className:"p-3 rounded-lg shadow-xl overflow-auto",children:(0,h.jsx)(d.RF,{data:n.receiptList||[],totalSize:n.receiptListCount,isDelete:p.o.checkPermission(c.userPermission,"Delete"),isEditModify:p.o.checkPermission(c.userPermission,"Edit/Modify"),onPageSizeChange:function(e,t){},onFilter:function(e,t,n,i){},onReport:function(e){n.receiptService.generatePaymentReceipt({input:{headerId:null===e||void 0===e?void 0:e.headerId}}).then(function(){var e=(0,a.Z)((0,o.Z)().mark((function e(t){var n,i,a,r,s;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:null!==(n=t.generatePaymentReceipt)&&void 0!==n&&n.success?(console.log({labLogo:null===(i=t.generatePaymentReceipt)||void 0===i||null===(a=i.receiptData)||void 0===a||null===(r=a.headerDetails)||void 0===r?void 0:r.labLogo}),Z({show:!0,data:null===(s=t.generatePaymentReceipt)||void 0===s?void 0:s.receiptData})):l.FN.error({message:"\ud83d\ude14 ".concat(t.generatePaymentReceipt.message)});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}})}),(0,h.jsx)(v.q,(0,i.Z)((0,i.Z)({},x),{},{onClose:function(){Z({show:!1})},onReceiptUpload:function(e,t){w?window.open(t+w,"_blank"):n.receiptService.paymentReceiptUpload({input:{file:e}}).then((function(e){var n,i;e.paymentReceiptUpload.success&&(y(null===(n=e.paymentReceiptUpload)||void 0===n?void 0:n.receiptPath),window.open("".concat(t," ").concat(null===(i=e.paymentReceiptUpload)||void 0===i?void 0:i.receiptPath),"_blank"))}))}}))]})}));t.default=f}}]);
//# sourceMappingURL=1932.141e4758.chunk.js.map
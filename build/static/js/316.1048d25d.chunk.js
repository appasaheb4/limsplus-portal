"use strict";(self.webpackChunklimsplus_portal=self.webpackChunklimsplus_portal||[]).push([[316],{65316:function(e,t,a){a.r(t),a.d(t,{default:function(){return k}});var n,o,l,r=a(1413),i=a(29439),d=a(47313),s=a(92126),u=a(40560),c=a(10044),m=a(75627),v=a(42490),p=a(911),h=a(74394),f=a(4942),x=a(43701),b=a(16031),g=a.n(b),y=a(66233),C=a.n(y),j=a(36620),I=a(94118),P=a(10658),A=a.n(P),S=(a(35509),a(46417)),N=y.Search.SearchBar,F=y.Search.ClearSearchButton,E=y.CSVExport.ExportCSVButton,w=function(e){var t=e.id,a=e.data,n=e.totalSize,o=void 0===n?10:n,l=e.searchPlaceholder,s=void 0===l?"Search...":l,u=e.page,m=void 0===u?0:u,v=e.sizePerPage,p=void 0===v?10:v,h=e.columns,b=e.fileName,y=e.isEditModify,P=(e.isSelectRow,e.onSelectedRow,e.onUpdateItem),w=e.onPageSizeChange,Z=e.onFilter,k=e.clearAllFilter,V=e.onClickRow,D=(0,d.useState)(),T=(0,i.Z)(D,2),z=(T[0],T[1],(0,d.useState)(!1)),R=(0,i.Z)(z,2),O=R[0],M=R[1],q={cutome:!0,totalSize:o,paginationSize:5,pageStartIndex:0,firstPageText:"<<",prePageText:"<",nextPageText:">",lastPageText:">>",disablePageTitle:!0,paginationTotalRenderer:function(e,t,a){return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)("div",{className:"clearfix"}),(0,S.jsxs)("span",{children:["Showing ",e," to ",t," of ",a," Results"]})]})},hideSizePerPage:!0,showTotal:!1,alwaysShowAllBtns:!0,sizePerPageList:[{text:"10",value:10},{text:"20",value:20},{text:"30",value:30},{text:"40",value:40},{text:"50",value:50}],hidePageListOnlyOnePage:!0,sizePerPageRenderer:function(e){var t=e.options,a=e.currSizePerPage,n=e.onSizePerPageChange;return(0,S.jsxs)("div",{className:"btn-group items-center",role:"group",children:[(0,S.jsx)("input",{type:"number",min:"0",placeholder:"No",onChange:function(e){e.target.value&&n(e.target.value)},className:"mr-2 ml-2 leading-4 p-2 w-14 focus:outline-none focus:ring block  shadow-sm sm:text-base border border-gray-300 rounded-md"}),t.map((function(e){return(0,S.jsx)("button",{type:"button",onClick:function(){return n(e.page)},className:"btn  ".concat(a==="".concat(e.page)?"bg-primary":"bg-grey"),children:e.text},e.text)}))]})}},Q={placeholder:s},L=function(e,t){var a=t.data,n=t.cellEdit,l=t.page,r=t.sizePerPage,d=t.filters,s=t.sortField,u=t.sortOrder,c=t.searchText;if("cellEdit"===e&&y&&P&&P(n.newValue,n.dataField,n.rowId),"pagination"===e&&g().isEmpty(d)&&w&&w(l,r),"filter"===e||"pagination"===e&&!g().isEmpty(d)){if("pagination"===e){if(r>o)return alert("You have not more records.");if(l*r>o)return alert("You have not more records.")}for(var m={},v=0,p=Object.entries(d);v<p.length;v++){var h=(0,i.Z)(p[v],2),x=h[0],b=h[1],C=(0,f.Z)({},x,b.filterVal);m=Object.assign(m,C)}Z&&Z(e,m,"filter"===e&&1===l?0:l,r)}("search"===e&&setTimeout((function(){Z&&Z(e,{srText:c},l,r)}),2e3),"sort"===e)&&("asc"===u?a.sort((function(e,t){return e[s]>t[s]?1:t[s]>e[s]?-1:0})):a.sort((function(e,t){return e[s]>t[s]?-1:t[s]>e[s]?1:0})))},B=function(e){var t=e.columns,a=e.onColumnToggle,n=e.toggles;return(0,S.jsx)("div",{className:"btn-group btn-group-toggle","data-toggle":"buttons",children:t.map((function(e){return(0,r.Z)((0,r.Z)({},e),{},{toggle:n[e.dataField]})})).map((function(e,t){if(t>0)return(0,S.jsx)("button",{type:"button",className:" btn btn-primary  btn-sm whitespace-nowrap ".concat(e.toggle?"active":""),"data-toggle":"button","aria-pressed":e.toggle?"true":"false",onClick:function(){return a(e.dataField)},children:e.text},e.dataField)}))})},G={onClick:function(e,t,a){V&&V(t,a)}};return(0,S.jsx)(j.bN,{pagination:(0,j.ZP)(0!==o?q:{page:m,sizePerPage:p,totalSize:o}),keyField:t,columns:h,data:a,children:function(e){var n=e.paginationProps,o=e.paginationTableProps;return(0,S.jsx)(C(),{keyField:t,bootstrap4:!0,data:a,columns:h,search:!0,exportCSV:{fileName:"".concat(b,"_").concat(A()(new Date).format("YYYY-MM-DD HH:mm"),".csv"),noAutoBOM:!1,blobType:"text/csv;charset=ansi",exportAll:!1,onlyExportFiltered:!0},columnToggle:!0,children:function(e){return(0,S.jsxs)("div",{children:[(0,S.jsxs)("div",{className:"flex items-center",children:[(0,S.jsx)(N,(0,r.Z)((0,r.Z)((0,r.Z)({},Q),e.searchProps),{},{onChange:function(e){console.log({value:e})}})),(0,S.jsx)(F,(0,r.Z)({className:"inline-flex ml-4 bg-gray-500 items-center small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center h-9 text-white"},e.searchProps)),(0,S.jsx)("button",{className:"ml-2 px-2 focus:outline-none bg-gray-500 items-center  outline shadow-sm  font-medium  text-center rounded-md h-9 text-white",onClick:k,children:"Clear all filters"}),(0,S.jsx)(E,(0,r.Z)((0,r.Z)({className:"inline-flex m-2.5 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center h-9 text-white"},e.csvProps),{},{children:"Export CSV!!"})),O?(0,S.jsx)(c.EK.zx,{size:"medium",type:"outline",onClick:function(){M(!O)},children:(0,S.jsx)(c.PJ.IconFa.FaChevronUp,{})}):(0,S.jsx)(c.EK.zx,{size:"medium",type:"outline",onClick:function(){M(!O)},children:(0,S.jsx)(c.PJ.IconFa.FaChevronDown,{})})]}),O&&(0,S.jsx)("div",{className:"mb-2 overflow-auto h-10",children:(0,S.jsx)(B,(0,r.Z)({contextual:"primary",className:"list-custom-class",btnClassName:"list-btn-custom-class"},e.columnToggleProps))}),(0,S.jsx)("div",{className:"scrollTable",children:(0,S.jsx)(x.Z,(0,r.Z)((0,r.Z)((0,r.Z)({remote:!0},e.baseProps),{},{noDataIndication:"Table is Empty",hover:!0},o),{},{filter:(0,I.ZP)(),headerClasses:"bg-gray-500 text-white whitespace-nowrap",onTableChange:L,rowEvents:G}))}),(0,S.jsxs)("div",{className:"flex items-center gap-2 mt-2",children:[(0,S.jsx)(j.dE,(0,r.Z)({},Object.assign({},(0,r.Z)((0,r.Z)({},n),{},{hideSizePerPage:!1})))),(0,S.jsx)(j.yJ,(0,r.Z)({},n))]}),(0,S.jsx)("div",{className:"flex items-center gap-2 mt-2",children:(0,S.jsx)(j.NJ,(0,r.Z)({},n))})]})}})}})},Z=function(e){return(0,S.jsx)(w,{id:"_id",data:e.data,totalSize:e.totalSize,columns:[{dataField:"_id",text:"Id",hidden:!0,csvExport:!1},{dataField:"pId",text:"PId",sort:!0,filter:(0,c.DN)({getFilter:function(e){n=e}}),editable:!1,headerClasses:"textHeader3"},{dataField:"labId",text:"Lab Id",sort:!0,filter:(0,c.DN)({getFilter:function(e){o=e}}),editable:!1,headerClasses:"textHeader3"},{dataField:"rLab",text:"RLab",sort:!0,editable:!1},{dataField:"invoiceAC",text:"Invoice AC",sort:!0,editable:!1},{dataField:"customerName",text:"Customer Name",sort:!0,editable:!1},{dataField:"customerGroup",text:"Customer Group",sort:!0,editable:!1},{dataField:"acClass",text:"AC Class",sort:!0,editable:!1},{dataField:"acType",text:"AC Type",sort:!0,editable:!1},{dataField:"discountCharges",text:"Other Charges",sort:!0,editable:!1},{dataField:"invoiceDate",text:"Invoice Date",sort:!0,editable:!1},{dataField:"grossAmount",text:"Gross Amount",sort:!0,editable:!1},{dataField:"netAmount",text:"Net Amount",sort:!0,editable:!1},{dataField:"discountAmount",text:"Discount Amount",sort:!0,editable:!1},{dataField:"discountPer",text:"Discount %",sort:!0,editable:!1},{dataField:"miscellaneousCharges",text:"Miscellaneous Charges",sort:!0,editable:!1},{dataField:"allMiscCharges",text:"All Misc Charges",headerClasses:"textHeader3",sort:!0,csvFormatter:function(e,t){return e||""},editable:!1,formatter:function(e,t){var a;return(0,S.jsx)(S.Fragment,{children:(0,S.jsx)("div",{className:"flex flex-row gap-2",children:null===t||void 0===t||null===(a=t.allMiscCharges)||void 0===a?void 0:a.map((function(e){var t;return(0,S.jsx)("span",{children:(null===e||void 0===e?void 0:e.code)+" - "+(null===e||void 0===e||null===(t=e.amount)||void 0===t?void 0:t.toString())})}))})})}},{dataField:"amountPayable",text:"Amount Payable",sort:!0,editable:!1},{dataField:"receivedAmount",text:"Received Amount",sort:!0,editable:!1},{dataField:"balance",text:"Balance",sort:!0,editable:!1},{dataField:"modeOfPayment",text:"Mode Of Payment",sort:!0,editable:!1},{dataField:"paymentRemark",text:"Payment Remark",sort:!0,editable:!1},{dataField:"status",text:"Status",sort:!0,editable:!1},{dataField:"enteredBy",text:"Entered By",sort:!0,editable:!1}],isEditModify:e.isEditModify,isSelectRow:!0,fileName:"Payments",onSelectedRow:function(t){e.onSelectedRow&&e.onSelectedRow(t.map((function(e){return e._id})))},onUpdateItem:function(t,a,n){e.onUpdateItem&&e.onUpdateItem(t,a,n)},onPageSizeChange:function(t,a){e.onPageSizeChange&&e.onPageSizeChange(t,a)},onFilter:function(t,a,n,o){e.onFilter&&e.onFilter(t,a,n,o)},clearAllFilter:function(){n(""),o("")}})},k=(l=(0,s.Pi)((function(){var e,t,a,n,o,l,s,f,x,b,g,y,C,j,I,P,A,N,F,E,w,k,V,D,T,z,R=(0,h.mZ)(),O=R.loading,M=R.routerStore,q=R.loginStore,Q=R.paymentStore,L=R.transactionDetailsStore,B=(0,m.cI)(),G=B.control,H=B.handleSubmit,_=B.formState.errors,U=B.setValue,K=B.clearErrors,Y=B.setError,J=(0,d.useState)(),W=(0,i.Z)(J,2),$=(W[0],W[1]),X=(0,d.useState)(!1),ee=(0,i.Z)(X,2),te=ee[0],ae=ee[1],ne=(0,d.useState)(0),oe=(0,i.Z)(ne,2),le=oe[0],re=oe[1];U("modeOfPayment",null===(e=Q.payment)||void 0===e?void 0:e.modeOfPayment),(0,d.useEffect)((function(){var e;Q.updatePayment((0,r.Z)((0,r.Z)({},Q.payment),{},{enteredBy:null===(e=q.login)||void 0===e?void 0:e.userId}))}),[null===(t=q.login)||void 0===t?void 0:t.userId,Q]);var ie=function(e){var t,a,n="number"==typeof(null===(t=e.discountCharges)||void 0===t?void 0:t.amount)?Number.parseFloat(null===e||void 0===e||null===(a=e.discountCharges)||void 0===a?void 0:a.amount):0;return Number.parseFloat(null===e||void 0===e?void 0:e.netAmount)+Number.parseFloat(null===e||void 0===e?void 0:e.miscellaneousCharges)+n-Number.parseFloat(null===e||void 0===e?void 0:e.receivedAmount)},de=function(e){var t,a,n;console.log({payload:e}),Q.updatePayment((0,r.Z)((0,r.Z)({},Q.payment),{},{pId:Number.parseInt(null===e||void 0===e?void 0:e.pId),labId:Number.parseInt(null===e||void 0===e?void 0:e.labId),rLab:null===e||void 0===e?void 0:e.rLab,invoiceAC:Number.parseInt(null===e||void 0===e?void 0:e.invoiceAC),customerName:null===e||void 0===e?void 0:e.customerName,customerGroup:null===e||void 0===e?void 0:e.customerGroup,acClass:null===e||void 0===e?void 0:e.acClass,acType:null===e||void 0===e?void 0:e.accountType,discountCharges:"".concat(null===(t=e.discountCharges)||void 0===t?void 0:t.code," - ").concat(null===(a=e.discountCharges)||void 0===a||null===(n=a.amount)||void 0===n?void 0:n.toString()),invoiceDate:null===e||void 0===e?void 0:e.invoiceDate,grossAmount:Number.parseFloat(null===e||void 0===e?void 0:e.grossAmount),netAmount:Number.parseFloat(null===e||void 0===e?void 0:e.netAmount),discountAmount:Number.parseFloat(null===e||void 0===e?void 0:e.discountAmount),discountPer:Number.parseFloat(null===e||void 0===e?void 0:e.discountPer),miscellaneousCharges:Number.parseFloat(null===e||void 0===e?void 0:e.miscellaneousCharges),allMiscCharges:null===e||void 0===e?void 0:e.allMiscCharges,amountPayable:ie(e),patientOrderId:null===e||void 0===e?void 0:e.patientOrderId,transactionHeaderId:null===e||void 0===e?void 0:e._id,visitId:null===e||void 0===e?void 0:e.visitId})),re(Number.parseFloat(null===e||void 0===e?void 0:e.receivedAmount)),U("pId",null===e||void 0===e?void 0:e.pId),U("labId",null===e||void 0===e?void 0:e.labId),K("pId"),K("labId")};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(c.h4,{children:[(0,S.jsx)(c.CD,{title:(null===(a=M.selectedComponents)||void 0===a?void 0:a.title)||""}),(0,S.jsx)(c.Nd,{store:q})]}),v.o.checkPermission(M.userPermission,"Add")&&(0,S.jsx)(c.EK.Kn,{show:!te,onClick:function(){return ae(!te)}}),(0,S.jsxs)("div",{className:" mx-auto flex-wrap",children:[(0,S.jsxs)("div",{className:"p-2 rounded-lg shadow-xl "+(te?"shown":"hidden"),children:[(0,S.jsxs)(c.rj,{cols:3,children:[(0,S.jsxs)(c.aV,{direction:"col",space:4,justify:"stretch",fill:!0,children:[(0,S.jsx)(m.Qr,{control:G,render:function(e){var t,a,n=e.field.onChange;return(0,S.jsx)(c.l0.SP,{label:"PId",hasError:!!_.pId,children:(0,S.jsx)(c.FJ,{loader:O,placeholder:"Search by pId or customer name",data:{list:L.transactionHeaderList.filter((function(e){if(0!==(null===e||void 0===e?void 0:e.balance))return e}))||[],displayKey:["pId","customerName"]},disable:!1,displayValue:null===(t=Q.payment)||void 0===t||null===(a=t.pId)||void 0===a?void 0:a.toString(),hasError:!!_.pId,onFilter:function(e){},onSelect:function(e){n(e.pId),de(e)}})})},name:"pId",rules:{required:!0},defaultValue:(null===L||void 0===L?void 0:L.transactionHeaderList)||(null===(n=Q.payment)||void 0===n?void 0:n.pId)}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t,a,n=e.field.onChange;return(0,S.jsx)(c.l0.SP,{label:"Lab Id",hasError:!!_.labId,children:(0,S.jsx)(c.FJ,{loader:O,placeholder:"Search by labId or customer name",data:{list:L.transactionHeaderList.filter((function(e){if(0!==(null===e||void 0===e?void 0:e.balance))return e}))||[],displayKey:["labId","customerName"]},disable:!1,displayValue:null===(t=Q.payment)||void 0===t||null===(a=t.labId)||void 0===a?void 0:a.toString(),hasError:!!_.labId,onFilter:function(e){},onSelect:function(e){n(e.pId),de(e)}})})},name:"labId",rules:{required:!0},defaultValue:(null===L||void 0===L?void 0:L.transactionHeaderList)||(null===(o=Q.payment)||void 0===o?void 0:o.labId)}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t;return e.field.onChange,(0,S.jsx)(c.l0.II,{label:"RLab",placeholder:"RLab",hasError:!!_.rLab,disabled:!0,value:null===(t=Q.payment)||void 0===t?void 0:t.rLab})},name:"rLab",rules:{required:!1},defaultValue:null===(l=Q.payment)||void 0===l?void 0:l.rLab}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t,a;return e.field.onChange,(0,S.jsx)(c.l0.II,{label:"Invoice AC",placeholder:"Invoice AC",hasError:!!_.invoiceAC,disabled:!0,value:(null===(t=Q.payment)||void 0===t||null===(a=t.invoiceAC)||void 0===a?void 0:a.toString())||""})},name:"invoiceAC",rules:{required:!1},defaultValue:null===(s=Q.payment)||void 0===s?void 0:s.invoiceAC}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t;return e.field.onChange,(0,S.jsx)(c.l0.II,{label:"Customer Name",placeholder:"Customer Name",hasError:!!_.customerName,disabled:!0,value:null===(t=Q.payment)||void 0===t?void 0:t.customerName})},name:"customerName",rules:{required:!1},defaultValue:null===(f=Q.payment)||void 0===f?void 0:f.customerName}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t;return e.field.onChange,(0,S.jsx)(c.l0.II,{label:"Customer Group",placeholder:"Customer Group",hasError:!!_.customerGroup,disabled:!0,value:null===(t=Q.payment)||void 0===t?void 0:t.customerGroup})},name:"customerGroup",rules:{required:!1},defaultValue:null===(x=Q.payment)||void 0===x?void 0:x.customerGroup}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t;return e.field.onChange,(0,S.jsx)(c.l0.II,{label:"AC Class",placeholder:"AC Class",hasError:!!_.acClass,disabled:!0,value:null===(t=Q.payment)||void 0===t?void 0:t.acClass})},name:"acClass",rules:{required:!1},defaultValue:null===(b=Q.payment)||void 0===b?void 0:b.acClass}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t;return e.field.onChange,(0,S.jsx)(c.l0.II,{label:"Ac Type",placeholder:"Ac Type",hasError:!!_.acType,disabled:!0,value:null===(t=Q.payment)||void 0===t?void 0:t.acType})},name:"acType",rules:{required:!1},defaultValue:null===(g=Q.payment)||void 0===g?void 0:g.acType}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t;return e.field.onChange,(0,S.jsx)(c.l0.II,{label:"Other Charges",placeholder:"Other Charges",hasError:!!_.discountCharges,disabled:!0,value:null===(t=Q.payment)||void 0===t?void 0:t.discountCharges})},name:"discountCharges",rules:{required:!1},defaultValue:null===(y=Q.payment)||void 0===y?void 0:y.discountCharges}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t;return e.field.onChange,(0,S.jsx)(c.l0.II,{label:"Invoice Date",placeholder:"Invoice Date",hasError:!!_.invoiceDate,disabled:!0,value:null===(t=Q.payment)||void 0===t?void 0:t.invoiceDate})},name:"invoiceDate",rules:{required:!1},defaultValue:null===(C=Q.payment)||void 0===C?void 0:C.invoiceDate})]}),(0,S.jsxs)(c.aV,{direction:"col",space:4,justify:"stretch",fill:!0,children:[(0,S.jsx)(m.Qr,{control:G,render:function(e){var t,a;return e.field.onChange,(0,S.jsx)(c.l0.II,{label:"Gross Amount",placeholder:"Gross Amount",hasError:!!_.grossAmount,disabled:!0,value:null===(t=Q.payment)||void 0===t||null===(a=t.grossAmount)||void 0===a?void 0:a.toString()})},name:"grossAmount",rules:{required:!1},defaultValue:null===(j=Q.payment)||void 0===j?void 0:j.grossAmount}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t,a;return e.field.onChange,(0,S.jsx)(c.l0.II,{label:"Net Amount",placeholder:"Net Amount",hasError:!!_.netAmount,disabled:!0,value:null===(t=Q.payment)||void 0===t||null===(a=t.netAmount)||void 0===a?void 0:a.toString()})},name:"netAmount",rules:{required:!1},defaultValue:null===(I=Q.payment)||void 0===I?void 0:I.netAmount}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t,a;return e.field.onChange,(0,S.jsx)(c.l0.II,{label:"Discount Amount",placeholder:"Discount Amount",hasError:!!_.discountAmount,disabled:!0,value:null===(t=Q.payment)||void 0===t||null===(a=t.discountAmount)||void 0===a?void 0:a.toString()})},name:"discountAmount",rules:{required:!1},defaultValue:null===(P=Q.payment)||void 0===P?void 0:P.discountAmount}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t,a;return e.field.onChange,(0,S.jsx)(c.l0.II,{label:"Discount Per",placeholder:"Discount Per",hasError:!!_.discountPer,disabled:!0,value:null===(t=Q.payment)||void 0===t||null===(a=t.discountPer)||void 0===a?void 0:a.toString()})},name:"discountPer",rules:{required:!1},defaultValue:null===(A=Q.payment)||void 0===A?void 0:A.discountPer}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t,a;return e.field.onChange,(0,S.jsx)(c.l0.II,{label:"Miscellaneous Charges",placeholder:"Miscellaneous Charges",hasError:!!_.miscellaneousCharges,disabled:!0,value:null===(t=Q.payment)||void 0===t||null===(a=t.miscellaneousCharges)||void 0===a?void 0:a.toString()})},name:"miscellaneousCharges",rules:{required:!1},defaultValue:null===(N=Q.payment)||void 0===N?void 0:N.miscellaneousCharges}),(0,S.jsxs)(u.iA,{striped:!0,bordered:!0,children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{className:"p-0 text-xs",children:[(0,S.jsx)("th",{className:"text-white sticky left-0 z-10",children:"MISC CHARGES"}),(0,S.jsx)("th",{className:"text-white",children:"AMOUNT"})]})}),(0,S.jsx)("tbody",{className:"text-xs",children:null===(F=Q.payment)||void 0===F||null===(E=F.allMiscCharges)||void 0===E?void 0:E.map((function(e,t){return(0,S.jsxs)("tr",{children:[(0,S.jsx)("td",{className:"sticky left-0",children:(null===e||void 0===e?void 0:e.value)+" - "+(null===e||void 0===e?void 0:e.code)}),(0,S.jsx)("td",{className:"sticky left-0",children:(0,S.jsx)(c.l0.II,{style:{height:30},label:"",type:"number",placeholder:"Amount",value:e.amount,disabled:!0})})]},e.code)}))})]})]}),(0,S.jsxs)(c.aV,{direction:"col",space:4,justify:"stretch",fill:!0,children:[(0,S.jsx)(m.Qr,{control:G,render:function(e){var t,a=e.field.onChange;return(0,S.jsx)(c.l0.SP,{label:"Mode of payment",children:(0,S.jsxs)("select",{value:null===(t=Q.payment)||void 0===t?void 0:t.modeOfPayment,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ".concat(_.modeOfPayment?"border-red-500  ":"border-gray-300"," rounded-md"),onChange:function(e){var t=e.target.value;a(t),Q.updatePayment((0,r.Z)((0,r.Z)({},Q.payment),{},{modeOfPayment:t}))},children:[(0,S.jsx)("option",{selected:!0,children:"Select"}),(0,p.fc)(M.lookupItems,"MODE_OF_PAYMENT").map((function(e,t){return(0,S.jsx)("option",{value:e.code,children:(0,p.w9)(e)},t)}))]})})},name:"modeOfPayment",rules:{required:!0},defaultValue:""}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t,a=e.field.onChange;return(0,S.jsx)(c.l0.$l,{label:"Payment Remark",placeholder:"Payment Remark",hasError:!!_.paymentRemark,value:null===(t=Q.payment)||void 0===t?void 0:t.paymentRemark,onChange:function(e){a(e),Q.updatePayment((0,r.Z)((0,r.Z)({},Q.payment),{},{paymentRemark:e}))}})},name:"paymentRemark",rules:{required:!1},defaultValue:null===(w=Q.payment)||void 0===w?void 0:w.paymentRemark}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t,a;return e.field.onChange,(0,S.jsx)(c.l0.II,{label:"Amount Payable",placeholder:"Amount Payable",hasError:!!_.amountPayable,disabled:!0,value:null===(t=Q.payment)||void 0===t||null===(a=t.amountPayable)||void 0===a?void 0:a.toString()})},name:"amountPayable",rules:{required:!1},defaultValue:null===(k=Q.payment)||void 0===k?void 0:k.amountPayable}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t,a=e.field.onChange;return(0,S.jsx)(c.l0.II,{label:"Received Amount",placeholder:"Received Amount",type:"number",hasError:!!_.receivedAmount,value:null===(t=Q.payment)||void 0===t?void 0:t.receivedAmount,onChange:function(e){var t;if((null===(t=Q.payment)||void 0===t?void 0:t.amountPayable)-Number.parseFloat(e)<0)alert("Please enter correct amount!"),Y("receivedAmount",{type:"onBlur"});else if(""==e)Q.updatePayment((0,r.Z)((0,r.Z)({},Q.payment),{},{receivedAmount:e})),Y("receivedAmount",{type:"onBlur"});else{var n,o;a(Number.parseFloat(e)),Q.updatePayment((0,r.Z)((0,r.Z)({},Q.payment),{},{receivedAmount:Number.parseFloat(e),balance:(null===(n=Q.payment)||void 0===n?void 0:n.amountPayable)-Number.parseFloat(e),totalReceivedAmount:le+Number.parseFloat(e),status:(null===(o=Q.payment)||void 0===o?void 0:o.amountPayable)-Number.parseFloat(e)===0?"Complete":"Partial"})),K("receivedAmount")}}})},name:"receivedAmount",rules:{required:!0},defaultValue:null===(V=Q.payment)||void 0===V?void 0:V.receivedAmount}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t,a;return e.field.onChange,(0,S.jsx)(c.l0.II,{label:"Balance",placeholder:"Balance",type:"number",hasError:!!_.balance,value:null===(t=Q.payment)||void 0===t||null===(a=t.balance)||void 0===a?void 0:a.toString()})},name:"balance",rules:{required:!1},defaultValue:null===(D=Q.payment)||void 0===D?void 0:D.balance}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t;return e.field.onChange,(0,S.jsx)(c.l0.II,{label:"Status",placeholder:"Status",hasError:!!_.status,value:null===(t=Q.payment)||void 0===t?void 0:t.status,disabled:!0})},name:"status",rules:{required:!1},defaultValue:null===(T=Q.payment)||void 0===T?void 0:T.status}),(0,S.jsx)(m.Qr,{control:G,render:function(e){var t;return e.field.onChange,(0,S.jsx)(c.l0.II,{label:"Entered By",placeholder:"Entered By",hasError:!!_.status,value:null===(t=Q.payment)||void 0===t?void 0:t.enteredBy,disabled:!0})},name:"enteredBy",rules:{required:!1},defaultValue:null===(z=Q.payment)||void 0===z?void 0:z.enteredBy})]})]}),(0,S.jsx)("br",{}),(0,S.jsxs)(c.aV,{direction:"row",space:3,align:"center",children:[(0,S.jsx)(c.EK.zx,{size:"medium",type:"solid",icon:c.ny.vc,onClick:H((function(){Q.paymentService.create({input:(0,r.Z)({},Q.payment)}).then((function(e){e.createPayment.success&&c.FN.success({message:"\ud83d\ude0a ".concat(e.createPayment.message)})})),setTimeout((function(){window.location.reload()}),2e3)})),children:"Save"}),(0,S.jsx)(c.EK.zx,{size:"medium",type:"outline",icon:c.ny.JW,onClick:function(){window.location.reload()},children:"Clear"})]})]}),(0,S.jsx)("div",{className:"p-2 rounded-lg shadow-xl",children:(0,S.jsx)(Z,{data:Q.paymentList||[],totalSize:Q.paymentListCount,extraData:{lookupItems:M.lookupItems},isDelete:v.o.checkPermission(M.userPermission,"Delete"),isEditModify:v.o.checkPermission(M.userPermission,"Edit/Modify"),onDelete:function(e){return $(e)},onSelectedRow:function(e){$({show:!0,type:"Delete",id:e,title:"Are you sure?",body:"Delete selected items!"})},onUpdateItem:function(e,t,a){$({show:!0,type:"Update",data:{value:e,dataField:t,id:a},title:"Are you sure?",body:"Update deginisation!"})},onPageSizeChange:function(e,t){},onFilter:function(e,t,a,n){}})})]})]})})),(0,s.Pi)((function(e){var t=(0,h.mZ)(),a=t.loginStore,n=t.routerStore,o=t.paymentStore;return(0,d.useEffect)((function(){o.updatePayment((0,r.Z)((0,r.Z)({},o.payment),{},{modeOfPayment:(0,p.t9)(n.lookupItems,"MODE_OF_PAYMENT")}))}),[a.login,n.lookupItems]),(0,S.jsx)(l,(0,r.Z)({},e))})))}}]);
"use strict";(self.webpackChunklimsplus_portal=self.webpackChunklimsplus_portal||[]).push([[4366],{24366:function(e,t,a){a.r(t),a.d(t,{default:function(){return z}});var n,l,o,r=a(1413),i=a(29439),d=a(72791),s=a(71672),u=a(79476),c=a(51202),m=a(61134),v=a(10621),p=a(28337),h=a(22414),f=a(4942),x=a(2002),b=a(763),g=a.n(b),y=a(33294),C=a.n(y),j=a(36161),I=a(92746),P=a(97892),A=a.n(P),S=(a(26192),a(65028)),F=a(80184),N=y.Search.SearchBar,E=y.Search.ClearSearchButton,w=y.CSVExport.ExportCSVButton,Z=function(e){var t=e.id,a=e.data,n=e.totalSize,l=void 0===n?10:n,o=e.searchPlaceholder,s=void 0===o?"Search...":o,u=e.page,m=void 0===u?0:u,v=e.sizePerPage,p=void 0===v?10:v,h=e.columns,b=e.fileName,y=e.isEditModify,P=(e.isSelectRow,e.onSelectedRow,e.onUpdateItem),Z=e.onPageSizeChange,k=e.onFilter,D=e.clearAllFilter,V=e.onClickRow,z=(0,d.useState)(),T=(0,i.Z)(z,2),R=(T[0],T[1],(0,d.useState)(!1)),M=(0,i.Z)(R,2),O=M[0],q=M[1],Q={cutome:!0,totalSize:l,paginationSize:5,pageStartIndex:0,firstPageText:"<<",prePageText:"<",nextPageText:">",lastPageText:">>",disablePageTitle:!0,paginationTotalRenderer:function(e,t,a){return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)("div",{className:"clearfix"}),(0,F.jsxs)("span",{children:["Showing ",e," to ",t," of ",a," Results"]})]})},hideSizePerPage:!0,showTotal:!1,alwaysShowAllBtns:!0,sizePerPageList:[{text:"10",value:10},{text:"20",value:20},{text:"30",value:30},{text:"40",value:40},{text:"50",value:50}],hidePageListOnlyOnePage:!0,sizePerPageRenderer:function(e){var t=e.options,a=e.currSizePerPage,n=e.onSizePerPageChange;return(0,F.jsxs)("div",{className:"btn-group items-center",role:"group",children:[(0,F.jsx)("input",{type:"number",min:"0",placeholder:"No",onChange:function(e){e.target.value&&n(e.target.value)},className:"mr-2 ml-2 leading-4 p-2 w-14 focus:outline-none focus:ring block  shadow-sm sm:text-base border border-gray-300 rounded-md"}),t.map((function(e){return(0,F.jsx)("button",{type:"button",onClick:function(){return n(e.page)},className:"btn  ".concat(a==="".concat(e.page)?"bg-primary":"bg-grey"),children:e.text},e.text)}))]})}},L={placeholder:s},B=function(e,t){var a=t.data,n=t.cellEdit,o=t.page,r=t.sizePerPage,d=t.filters,s=t.sortField,u=t.sortOrder,c=t.searchText;if("cellEdit"===e&&y&&P&&P(n.newValue,n.dataField,n.rowId),"pagination"===e&&g().isEmpty(d)&&Z&&Z(o,r),"filter"===e||"pagination"===e&&!g().isEmpty(d)){if("pagination"===e){if(r>l)return alert("You have not more records.");if(o*r>l)return alert("You have not more records.")}for(var m={},v=0,p=Object.entries(d);v<p.length;v++){var h=(0,i.Z)(p[v],2),x=h[0],b=h[1],C=(0,f.Z)({},x,b.filterVal);m=Object.assign(m,C)}k&&(0,S.Ds)((function(){k(e,m,"filter"===e&&1===o?0:o,r)}))}("search"===e&&(0,S.Ds)((function(){k&&k(e,{srText:c},o,r)})),"sort"===e)&&("asc"===u?a.sort((function(e,t){return e[s]>t[s]?1:t[s]>e[s]?-1:0})):a.sort((function(e,t){return e[s]>t[s]?-1:t[s]>e[s]?1:0})))},G=function(e){var t=e.columns,a=e.onColumnToggle,n=e.toggles;return(0,F.jsx)("div",{className:"btn-group btn-group-toggle","data-toggle":"buttons",children:t.map((function(e){return(0,r.Z)((0,r.Z)({},e),{},{toggle:n[e.dataField]})})).map((function(e,t){if(t>0)return(0,F.jsx)("button",{type:"button",className:" btn btn-primary  btn-sm whitespace-nowrap ".concat(e.toggle?"active":""),"data-toggle":"button","aria-pressed":e.toggle?"true":"false",onClick:function(){return a(e.dataField)},children:e.text},e.dataField)}))})},H={onClick:function(e,t,a){V&&V(t,a)}};return(0,F.jsx)(j.bN,{pagination:(0,j.ZP)(0!==l?Q:{page:m,sizePerPage:p,totalSize:l}),keyField:t,columns:h,data:a,children:function(e){var n=e.paginationProps,l=e.paginationTableProps;return(0,F.jsx)(C(),{keyField:t,bootstrap4:!0,data:a,columns:h,search:!0,exportCSV:{fileName:"".concat(b,"_").concat(A()(new Date).format("YYYY-MM-DD HH:mm"),".csv"),noAutoBOM:!1,blobType:"text/csv;charset=ansi",exportAll:!1,onlyExportFiltered:!0},columnToggle:!0,children:function(e){return(0,F.jsxs)("div",{children:[(0,F.jsxs)("div",{className:"flex items-center flex-wrap",children:[(0,F.jsx)(N,(0,r.Z)((0,r.Z)((0,r.Z)({},L),e.searchProps),{},{onChange:function(e){console.log({value:e})}})),(0,F.jsx)(E,(0,r.Z)({className:"inline-flex ml-4 bg-gray-500 items-center small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center h-9 text-white"},e.searchProps)),(0,F.jsx)("button",{className:"ml-2 px-2 focus:outline-none bg-gray-500 items-center  outline shadow-sm  font-medium  text-center rounded-md h-9 text-white",onClick:D,children:"Clear all filters"}),(0,F.jsx)(w,(0,r.Z)((0,r.Z)({className:"inline-flex m-2.5 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center h-9 text-white"},e.csvProps),{},{children:"Export CSV!!"})),O?(0,F.jsx)(c.EK.zx,{size:"medium",type:"outline",onClick:function(){q(!O)},children:(0,F.jsx)(c.PJ.IconFa.FaChevronUp,{})}):(0,F.jsx)(c.EK.zx,{size:"medium",type:"outline",onClick:function(){q(!O)},children:(0,F.jsx)(c.PJ.IconFa.FaChevronDown,{})})]}),O&&(0,F.jsx)("div",{className:"mb-2 overflow-auto h-10",children:(0,F.jsx)(G,(0,r.Z)({contextual:"primary",className:"list-custom-class",btnClassName:"list-btn-custom-class"},e.columnToggleProps))}),(0,F.jsx)("div",{className:"scrollTable",children:(0,F.jsx)(x.Z,(0,r.Z)((0,r.Z)((0,r.Z)({remote:!0},e.baseProps),{},{noDataIndication:"Table is Empty",hover:!0},l),{},{filter:(0,I.ZP)(),headerClasses:"bg-gray-500 text-white whitespace-nowrap",onTableChange:B,rowEvents:H}))}),(0,F.jsxs)("div",{className:"flex items-center gap-2 mt-2",children:[(0,F.jsx)(j.dE,(0,r.Z)({},Object.assign({},(0,r.Z)((0,r.Z)({},n),{},{hideSizePerPage:!1})))),(0,F.jsx)(j.yJ,(0,r.Z)({},n))]}),(0,F.jsx)("div",{className:"flex items-center gap-2 mt-2",children:(0,F.jsx)(j.NJ,(0,r.Z)({},n))})]})}})}})},k=function(e){return(0,F.jsx)(Z,{id:"_id",data:e.data,totalSize:e.totalSize,columns:[{dataField:"_id",text:"Id",hidden:!0,csvExport:!1},{dataField:"pId",text:"PId",sort:!0,filter:(0,c.DN)({getFilter:function(e){n=e}}),headerStyle:{fontSize:0},sortCaret:function(e,t){return(0,c.t$)(e,t)},editable:!1,headerClasses:"textHeader3"},{dataField:"labId",text:"Lab Id",sort:!0,filter:(0,c.DN)({getFilter:function(e){l=e}}),headerStyle:{fontSize:0},sortCaret:function(e,t){return(0,c.t$)(e,t)},editable:!1,headerClasses:"textHeader3"},{dataField:"rLab",text:"RLab",sort:!0,editable:!1},{dataField:"invoiceAC",text:"Invoice AC",sort:!0,editable:!1},{dataField:"customerName",text:"Customer Name",sort:!0,editable:!1},{dataField:"customerGroup",text:"Customer Group",sort:!0,editable:!1},{dataField:"acClass",text:"AC Class",sort:!0,editable:!1},{dataField:"acType",text:"AC Type",sort:!0,editable:!1},{dataField:"discountCharges",text:"Other Charges",sort:!0,editable:!1},{dataField:"invoiceDate",text:"Invoice Date",sort:!0,editable:!1},{dataField:"grossAmount",text:"Gross Amount",sort:!0,editable:!1},{dataField:"netAmount",text:"Net Amount",sort:!0,editable:!1},{dataField:"discountAmount",text:"Discount Amount",sort:!0,editable:!1},{dataField:"discountPer",text:"Discount %",sort:!0,editable:!1},{dataField:"miscellaneousCharges",text:"Miscellaneous Charges",sort:!0,editable:!1},{dataField:"allMiscCharges",text:"All Misc Charges",headerClasses:"textHeader3",sort:!0,csvFormatter:function(e,t){return e||""},editable:!1,formatter:function(e,t){var a;return(0,F.jsx)(F.Fragment,{children:(0,F.jsx)("div",{className:"flex flex-row gap-2",children:null===t||void 0===t||null===(a=t.allMiscCharges)||void 0===a?void 0:a.map((function(e){var t;return(0,F.jsx)("span",{children:(null===e||void 0===e?void 0:e.code)+" - "+(null===e||void 0===e||null===(t=e.amount)||void 0===t?void 0:t.toString())})}))})})}},{dataField:"amountPayable",text:"Amount Payable",sort:!0,editable:!1},{dataField:"receivedAmount",text:"Received Amount",sort:!0,editable:!1},{dataField:"balance",text:"Balance",sort:!0,editable:!1},{dataField:"modeOfPayment",text:"Mode Of Payment",sort:!0,editable:!1},{dataField:"paymentRemark",text:"Payment Remark",sort:!0,editable:!1},{dataField:"status",text:"Status",sort:!0,editable:!1},{dataField:"enteredBy",text:"Entered By",sort:!0,editable:!1}],isEditModify:e.isEditModify,isSelectRow:!0,fileName:"Payments",onSelectedRow:function(t){e.onSelectedRow&&e.onSelectedRow(t.map((function(e){return e._id})))},onUpdateItem:function(t,a,n){e.onUpdateItem&&e.onUpdateItem(t,a,n)},onPageSizeChange:function(t,a){e.onPageSizeChange&&e.onPageSizeChange(t,a)},onFilter:function(t,a,n,l){e.onFilter&&e.onFilter(t,a,n,l)},clearAllFilter:function(){n(""),l("")}})},D=a(39567),V=a(75344),z=(o=(0,s.Pi)((function(){var e,t,a,n,l,o,s,f,x,b=(0,h.mZ)(),g=b.loading,y=b.routerStore,C=b.loginStore,j=b.paymentStore,I=b.transactionDetailsStore,P=(0,m.cI)(),A=P.control,S=P.handleSubmit,N=P.formState.errors,E=P.setValue,w=P.clearErrors,Z=P.setError,z=P.reset,T=(0,d.useState)(),R=(0,i.Z)(T,2),M=(R[0],R[1]),O=(0,d.useState)(!1),q=(0,i.Z)(O,2),Q=q[0],L=q[1],B=(0,d.useState)(0),G=(0,i.Z)(B,2),H=G[0],_=G[1];(0,d.useEffect)((function(){var e,t,a,n,l,o,r,i,d,s,u,c,m,v,p,h,f;E("modeOfPayment",null===(e=j.payment)||void 0===e?void 0:e.modeOfPayment),E("invoiceAc",null===(t=j.payment)||void 0===t?void 0:t.invoiceAC),E("rLab",null===(a=j.payment)||void 0===a?void 0:a.rLab),E("customerName",null===(n=j.payment)||void 0===n?void 0:n.customerName),E("customerGroup",null===(l=j.payment)||void 0===l?void 0:l.customerGroup),E("acClass",null===(o=j.payment)||void 0===o?void 0:o.acClass),E("acType",null===(r=j.payment)||void 0===r?void 0:r.acType),E("otherCharges",null===(i=j.payment)||void 0===i?void 0:i.discountCharges),E("invoiceDate",null===(d=j.payment)||void 0===d?void 0:d.invoiceDate),E("grossAmount",null===(s=j.payment)||void 0===s?void 0:s.grossAmount),E("netAmount",null===(u=j.payment)||void 0===u?void 0:u.netAmount),E("discountAmount",null===(c=j.payment)||void 0===c?void 0:c.discountAmount),E("discountPer",null===(m=j.payment)||void 0===m?void 0:m.discountPer),E("miscellaneousCharges",null===(v=j.payment)||void 0===v?void 0:v.miscellaneousCharges),E("amountPayable",null===(p=j.payment)||void 0===p?void 0:p.amountPayable),E("status",null===(h=j.payment)||void 0===h?void 0:h.status),E("balance",null===(f=j.payment)||void 0===f?void 0:f.balance)}),[j.payment]),(0,d.useEffect)((function(){var e;j.updatePayment((0,r.Z)((0,r.Z)({},j.payment),{},{enteredBy:null===(e=C.login)||void 0===e?void 0:e.userId}))}),[null===(e=C.login)||void 0===e?void 0:e.userId,j]);var U=function(e){var t,a,n="number"==typeof(null===(t=e.discountCharges)||void 0===t?void 0:t.amount)?Number.parseFloat(null===e||void 0===e||null===(a=e.discountCharges)||void 0===a?void 0:a.amount):0;return Number.parseFloat(null===e||void 0===e?void 0:e.netAmount)+Number.parseFloat(null===e||void 0===e?void 0:e.miscellaneousCharges)+n-Number.parseFloat(null===e||void 0===e?void 0:e.receivedAmount)},K=function(e){var t,a,n;j.updatePayment((0,r.Z)((0,r.Z)({},j.payment),{},{pId:Number.parseInt(null===e||void 0===e?void 0:e.pId),labId:Number.parseInt(null===e||void 0===e?void 0:e.labId),rLab:null===e||void 0===e?void 0:e.rLab,invoiceAC:Number.parseInt(null===e||void 0===e?void 0:e.invoiceAC),customerName:null===e||void 0===e?void 0:e.customerName,customerGroup:null===e||void 0===e?void 0:e.customerGroup,acClass:null===e||void 0===e?void 0:e.acClass,acType:null===e||void 0===e?void 0:e.accountType,discountCharges:"".concat(null===(t=e.discountCharges)||void 0===t?void 0:t.code," - ").concat(null===(a=e.discountCharges)||void 0===a||null===(n=a.amount)||void 0===n?void 0:n.toString()),invoiceDate:null===e||void 0===e?void 0:e.invoiceDate,grossAmount:Number.parseFloat(null===e||void 0===e?void 0:e.grossAmount),netAmount:Number.parseFloat(null===e||void 0===e?void 0:e.netAmount),discountAmount:Number.parseFloat(null===e||void 0===e?void 0:e.discountAmount),discountPer:Number.parseFloat(null===e||void 0===e?void 0:e.discountPer),miscellaneousCharges:Number.parseFloat(null===e||void 0===e?void 0:e.miscellaneousCharges),allMiscCharges:null===e||void 0===e?void 0:e.allMiscCharges,amountPayable:U(e),patientOrderId:null===e||void 0===e?void 0:e.patientOrderId,transactionHeaderId:null===e||void 0===e?void 0:e._id,visitId:null===e||void 0===e?void 0:e.visitId})),_(Number.parseFloat(null===e||void 0===e?void 0:e.receivedAmount)),E("pId",null===e||void 0===e?void 0:e.pId),E("labId",null===e||void 0===e?void 0:e.labId),w("pId"),w("labId")};return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsxs)(c.h4,{children:[(0,F.jsx)(c.CD,{title:(null===(t=y.selectedComponents)||void 0===t?void 0:t.title)||""}),(0,F.jsx)(c.Nd,{store:C})]}),v.o.checkPermission(y.userPermission,"Add")&&(0,F.jsx)(c.EK.Kn,{show:!Q,onClick:function(){return L(!Q)}}),(0,F.jsxs)("div",{className:" mx-auto flex-wrap",children:[(0,F.jsxs)("div",{className:"p-2 rounded-lg shadow-xl "+(Q?"shown":"hidden"),children:[(0,F.jsxs)(c.rj,{cols:3,children:[(0,F.jsxs)(c.aV,{direction:"col",space:4,justify:"stretch",fill:!0,children:[(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=t.onChange,n=t.value;return(0,F.jsx)(c.l0.SP,{label:"PId",hasError:!!N.pId,children:(0,F.jsx)(c.FJ,{loader:g,placeholder:"Search by pId or customer name",data:{list:I.transactionHeaderList.filter((function(e){if(0!==(null===e||void 0===e?void 0:e.balance))return e}))||[],displayKey:["pId","customerName"]},disable:!1,displayValue:null===n||void 0===n?void 0:n.toString(),hasError:!!N.pId,onFilter:function(e){},onSelect:function(e){a(e.pId),K(e)}})})},name:"pId",rules:{required:!0},defaultValue:(null===I||void 0===I?void 0:I.transactionHeaderList)||(null===(a=j.payment)||void 0===a?void 0:a.pId)}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=t.onChange,n=t.value;return(0,F.jsx)(c.l0.SP,{label:"Lab Id",hasError:!!N.labId,children:(0,F.jsx)(c.FJ,{loader:g,placeholder:"Search by labId or customer name",data:{list:I.transactionHeaderList.filter((function(e){if(0!==(null===e||void 0===e?void 0:e.balance))return e}))||[],displayKey:["labId","customerName"]},disable:!1,displayValue:null===n||void 0===n?void 0:n.toString(),hasError:!!N.labId,onFilter:function(e){},onSelect:function(e){a(e.pId),K(e)}})})},name:"labId",rules:{required:!0},defaultValue:(null===I||void 0===I?void 0:I.transactionHeaderList)||(null===(n=j.payment)||void 0===n?void 0:n.labId)}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=(t.onChange,t.value);return(0,F.jsx)(c.l0.II,{label:"RLab",placeholder:"RLab",hasError:!!N.rLab,disabled:!0,value:a})},name:"rLab",rules:{required:!1},defaultValue:""}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=(t.onChange,t.value);return(0,F.jsx)(c.l0.II,{label:"Invoice AC",placeholder:"Invoice AC",hasError:!!N.invoiceAC,disabled:!0,value:a})},name:"invoiceAC",rules:{required:!1},defaultValue:null===(l=j.payment)||void 0===l?void 0:l.invoiceAC}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=(t.onChange,t.value);return(0,F.jsx)(c.l0.II,{label:"Customer Name",placeholder:"Customer Name",hasError:!!N.customerName,disabled:!0,value:a})},name:"customerName",rules:{required:!1},defaultValue:""}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=(t.onChange,t.value);return(0,F.jsx)(c.l0.II,{label:"Customer Group",placeholder:"Customer Group",hasError:!!N.customerGroup,disabled:!0,value:a})},name:"customerGroup",rules:{required:!1},defaultValue:""}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=(t.onChange,t.value);return(0,F.jsx)(c.l0.II,{label:"AC Class",placeholder:"AC Class",hasError:!!N.acClass,disabled:!0,value:a})},name:"acClass",rules:{required:!1},defaultValue:""}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=(t.onChange,t.value);return(0,F.jsx)(c.l0.II,{label:"Ac Type",placeholder:"Ac Type",hasError:!!N.acType,disabled:!0,value:a})},name:"acType",rules:{required:!1},defaultValue:""}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=(t.onChange,t.value);return(0,F.jsx)(c.l0.II,{label:"Other Charges",placeholder:"Other Charges",hasError:!!N.discountCharges,disabled:!0,value:a})},name:"discountCharges",rules:{required:!1},defaultValue:""}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=(t.onChange,t.value);return(0,F.jsx)(c.l0.II,{label:"Invoice Date",placeholder:"Invoice Date",hasError:!!N.invoiceDate,disabled:!0,value:a})},name:"invoiceDate",rules:{required:!1},defaultValue:""})]}),(0,F.jsxs)(c.aV,{direction:"col",space:4,justify:"stretch",fill:!0,children:[(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=(t.onChange,t.value);return(0,F.jsx)(c.l0.II,{label:"Gross Amount",placeholder:"Gross Amount",hasError:!!N.grossAmount,disabled:!0,value:null===a||void 0===a?void 0:a.toString()})},name:"grossAmount",rules:{required:!1},defaultValue:""}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=(t.onChange,t.value);return(0,F.jsx)(c.l0.II,{label:"Net Amount",placeholder:"Net Amount",hasError:!!N.netAmount,disabled:!0,value:null===a||void 0===a?void 0:a.toString()})},name:"netAmount",rules:{required:!1},defaultValue:""}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=(t.onChange,t.value);return(0,F.jsx)(c.l0.II,{label:"Discount Amount",placeholder:"Discount Amount",hasError:!!N.discountAmount,disabled:!0,value:null===a||void 0===a?void 0:a.toString()})},name:"discountAmount",rules:{required:!1},defaultValue:""}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=(t.onChange,t.value);return(0,F.jsx)(c.l0.II,{label:"Discount Per",placeholder:"Discount Per",hasError:!!N.discountPer,disabled:!0,value:null===a||void 0===a?void 0:a.toString()})},name:"discountPer",rules:{required:!1},defaultValue:""}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=(t.onChange,t.value);return(0,F.jsx)(c.l0.II,{label:"Miscellaneous Charges",placeholder:"Miscellaneous Charges",hasError:!!N.miscellaneousCharges,disabled:!0,value:null===a||void 0===a?void 0:a.toString()})},name:"miscellaneousCharges",rules:{required:!1},defaultValue:""}),(0,F.jsxs)(u.iA,{striped:!0,bordered:!0,children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{className:"p-0 text-xs",children:[(0,F.jsx)("th",{className:"text-white sticky left-0 z-10",children:"MISC CHARGES"}),(0,F.jsx)("th",{className:"text-white",children:"AMOUNT"})]})}),(0,F.jsx)("tbody",{className:"text-xs",children:null===(o=j.payment)||void 0===o||null===(s=o.allMiscCharges)||void 0===s?void 0:s.map((function(e,t){return(0,F.jsxs)("tr",{children:[(0,F.jsx)("td",{className:"sticky left-0",children:(null===e||void 0===e?void 0:e.value)+" - "+(null===e||void 0===e?void 0:e.code)}),(0,F.jsx)("td",{className:"sticky left-0",children:(0,F.jsx)(c.l0.II,{style:{height:30},label:"",type:"number",placeholder:"Amount",value:e.amount,disabled:!0})})]},e.code)}))})]})]}),(0,F.jsxs)(c.aV,{direction:"col",space:4,justify:"stretch",fill:!0,children:[(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=t.onChange,n=t.value;return(0,F.jsx)(c.l0.SP,{label:"Mode of payment",children:(0,F.jsxs)("select",{value:n,className:"leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ".concat(N.modeOfPayment?"border-red  ":"border-gray-300"," rounded-md"),onChange:function(e){var t=e.target.value;a(t),j.updatePayment((0,r.Z)((0,r.Z)({},j.payment),{},{modeOfPayment:t}))},children:[(0,F.jsx)("option",{selected:!0,children:"Select"}),(0,p.fc)(y.lookupItems,"MODE_OF_PAYMENT").map((function(e,t){return(0,F.jsx)("option",{value:e.code,children:(0,p.w9)(e)},t)}))]})})},name:"modeOfPayment",rules:{required:!0},defaultValue:""}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=t.onChange,n=t.value;return(0,F.jsx)(c.l0.$l,{label:"Payment Remark",placeholder:"Payment Remark",hasError:!!N.paymentRemark,value:n,onChange:function(e){a(e),j.updatePayment((0,r.Z)((0,r.Z)({},j.payment),{},{paymentRemark:e}))}})},name:"paymentRemark",rules:{required:!1},defaultValue:""}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=(t.onChange,t.value);return(0,F.jsx)(c.l0.II,{label:"Amount Payable",placeholder:"Amount Payable",hasError:!!N.amountPayable,disabled:!0,value:null===a||void 0===a?void 0:a.toString()})},name:"amountPayable",rules:{required:!1},defaultValue:""}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=t.onChange;return t.value,(0,F.jsx)(c.l0.II,{label:"Received Amount",placeholder:"Received Amount",type:"number",hasError:!!N.receivedAmount,onChange:function(e){var t;if((null===(t=j.payment)||void 0===t?void 0:t.amountPayable)-Number.parseFloat(e)<0)alert("Please enter correct amount!"),Z("receivedAmount",{type:"onBlur"});else if(""==e)j.updatePayment((0,r.Z)((0,r.Z)({},j.payment),{},{receivedAmount:e})),Z("receivedAmount",{type:"onBlur"});else{var n,l;a(Number.parseFloat(e)),j.updatePayment((0,r.Z)((0,r.Z)({},j.payment),{},{receivedAmount:Number.parseFloat(e),balance:(null===(n=j.payment)||void 0===n?void 0:n.amountPayable)-Number.parseFloat(e),totalReceivedAmount:H+Number.parseFloat(e),status:(null===(l=j.payment)||void 0===l?void 0:l.amountPayable)-Number.parseFloat(e)===0?"Complete":"Partial"})),w("receivedAmount")}}})},name:"receivedAmount",rules:{required:!0},defaultValue:null===(f=j.payment)||void 0===f?void 0:f.receivedAmount}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=(t.onChange,t.value);return(0,F.jsx)(c.l0.II,{label:"Balance",placeholder:"Balance",type:"number",hasError:!!N.balance,value:null===a||void 0===a?void 0:a.toString()})},name:"balance",rules:{required:!1},defaultValue:""}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t=e.field,a=(t.onChange,t.value);return(0,F.jsx)(c.l0.II,{label:"Status",placeholder:"Status",hasError:!!N.status,value:a,disabled:!0})},name:"status",rules:{required:!1},defaultValue:""}),(0,F.jsx)(m.Qr,{control:A,render:function(e){var t,a=e.field;return a.onChange,a.value,(0,F.jsx)(c.l0.II,{label:"Entered By",placeholder:"Entered By",hasError:!!N.status,value:null===(t=j.payment)||void 0===t?void 0:t.enteredBy,disabled:!0})},name:"enteredBy",rules:{required:!1},defaultValue:null===(x=j.payment)||void 0===x?void 0:x.enteredBy})]})]}),(0,F.jsx)("br",{}),(0,F.jsxs)(c.aV,{direction:"row",space:3,align:"center",children:[(0,F.jsx)(c.EK.zx,{size:"medium",type:"solid",icon:c.ny.vc,onClick:S((function(){j.paymentService.create({input:(0,r.Z)({},j.payment)}).then((function(e){e.createPayment.success&&(c.FN.success({message:"\ud83d\ude0a ".concat(e.createPayment.message)}),L(!0),z(),(0,D.G)(),_(0),j.updatePayment(new V.F({})))}))})),children:"Save"}),(0,F.jsx)(c.EK.zx,{size:"medium",type:"outline",icon:c.ny.JW,onClick:function(){window.location.reload()},children:"Clear"})]})]}),(0,F.jsx)("div",{className:"p-2 rounded-lg shadow-xl",children:(0,F.jsx)(k,{data:j.paymentList||[],totalSize:j.paymentListCount,extraData:{lookupItems:y.lookupItems},isDelete:v.o.checkPermission(y.userPermission,"Delete"),isEditModify:v.o.checkPermission(y.userPermission,"Edit/Modify"),onDelete:function(e){return M(e)},onSelectedRow:function(e){M({show:!0,type:"Delete",id:e,title:"Are you sure?",body:"Delete selected items!"})},onUpdateItem:function(e,t,a){M({show:!0,type:"Update",data:{value:e,dataField:t,id:a},title:"Are you sure?",body:"Update deginisation!"})},onPageSizeChange:function(e,t){},onFilter:function(e,t,a,n){}})})]})]})})),(0,s.Pi)((function(e){var t=(0,h.mZ)(),a=t.loginStore,n=t.routerStore,l=t.paymentStore;return(0,d.useEffect)((function(){l.updatePayment((0,r.Z)((0,r.Z)({},l.payment),{},{modeOfPayment:(0,p.t9)(n.lookupItems,"MODE_OF_PAYMENT")}))}),[a.login,n.lookupItems]),(0,F.jsx)(o,(0,r.Z)({},e))})))}}]);
//# sourceMappingURL=4366.20830e43.chunk.js.map
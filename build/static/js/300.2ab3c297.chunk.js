"use strict";(self.webpackChunklimsplus_portal=self.webpackChunklimsplus_portal||[]).push([[300],{52300:function(e,t,a){a.r(t),a.d(t,{default:function(){return k}});var n=a(1413),o=a(29439),i=a(47313),r=a(92126),l=a(48703),s=a(75627),d=a(42490),c=a(10658),u=a.n(c),m=a(4942),x=a(43701),g=a(16031),p=a.n(g),f=a(66233),h=a.n(f),v=a(36620),b=a(94118),F=(a(35509),a(74629)),P=a(46417),C=f.Search.SearchBar,y=f.Search.ClearSearchButton,S=f.CSVExport.ExportCSVButton,w=function(e){var t=e.id,a=e.data,r=e.totalSize,s=void 0===r?10:r,d=e.searchPlaceholder,c=void 0===d?"Search...":d,g=e.page,f=void 0===g?0:g,w=e.sizePerPage,j=void 0===w?10:w,D=e.columns,N=e.fileName,Z=e.isEditModify,I=(e.isSelectRow,e.selectedItem),z=(e.onSelectedRow,e.onUpdateItem),T=e.onPageSizeChange,R=e.onFilter,E=e.clearAllFilter,k=e.onClickRow,A=(0,i.useState)(),Y=(0,o.Z)(A,2),M=(Y[0],Y[1],(0,i.useState)(!1)),L=(0,o.Z)(M,2),U=L[0],O=L[1],B={cutome:!0,totalSize:s,paginationSize:5,pageStartIndex:0,firstPageText:"<<",prePageText:"<",nextPageText:">",lastPageText:">>",disablePageTitle:!0,paginationTotalRenderer:function(e,t,a){return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)("div",{className:"clearfix"}),(0,P.jsxs)("span",{children:["Showing ",e," to ",t," of ",a," Results"]})]})},hideSizePerPage:!0,showTotal:!1,alwaysShowAllBtns:!0,sizePerPageList:[{text:"10",value:10},{text:"20",value:20},{text:"30",value:30},{text:"40",value:40},{text:"50",value:50}],hidePageListOnlyOnePage:!0,sizePerPageRenderer:function(e){var t=e.options,a=e.currSizePerPage,n=e.onSizePerPageChange;return(0,P.jsxs)("div",{className:"btn-group items-center",role:"group",children:[(0,P.jsx)("input",{type:"number",min:"0",placeholder:"No",onChange:function(e){e.target.value&&n(e.target.value)},className:"mr-2 ml-2 leading-4 p-2 w-14 focus:outline-none focus:ring block  shadow-sm sm:text-base border border-gray-300 rounded-md"}),t.map((function(e){return(0,P.jsx)("button",{type:"button",onClick:function(){return n(e.page)},className:"btn  ".concat(a==="".concat(e.page)?"bg-primary":"bg-grey"),children:e.text},e.text)}))]})}},_={placeholder:c},V=function(e,t){var a=t.data,n=t.cellEdit,i=t.page,r=t.sizePerPage,l=t.filters,d=t.sortField,c=t.sortOrder,u=t.searchText;if("cellEdit"===e&&Z&&z&&z(n.newValue,n.dataField,n.rowId),"pagination"===e&&p().isEmpty(l)&&T&&T(i,r),"filter"===e||"pagination"===e&&!p().isEmpty(l)){if("pagination"===e){if(r>s)return alert("You have not more records.");if(i*r>s)return alert("You have not more records.")}for(var x={},g=0,f=Object.entries(l);g<f.length;g++){var h=(0,o.Z)(f[g],2),v=h[0],b=h[1],P=(0,m.Z)({},v,b.filterVal);x=Object.assign(x,P)}R&&(0,F.Ds)((function(){R(e,x,"filter"===e&&1===i?0:i,r)}))}("search"===e&&(0,F.Ds)((function(){R&&R(e,{srText:u},i,r)})),"sort"===e)&&("asc"===c?a.sort((function(e,t){return e[d]>t[d]?1:t[d]>e[d]?-1:0})):a.sort((function(e,t){return e[d]>t[d]?-1:t[d]>e[d]?1:0})))},J=function(e){var t=e.columns,a=e.onColumnToggle,o=e.toggles;return(0,P.jsx)("div",{className:"btn-group btn-group-toggle","data-toggle":"buttons",children:t.map((function(e){return(0,n.Z)((0,n.Z)({},e),{},{toggle:o[e.dataField]})})).map((function(e,t){if(t>0)return(0,P.jsx)("button",{type:"button",className:" btn btn-primary  btn-sm whitespace-nowrap ".concat(e.toggle?"active":""),"data-toggle":"button","aria-pressed":e.toggle?"true":"false",onClick:function(){return a(e.dataField)},children:e.text},e.dataField)}))})},H={onClick:function(e,t,a){k&&k(t,a)}},G=function(e,t){return e._id==(null===I||void 0===I?void 0:I._id)?{backgroundColor:"#a9a9a9"}:0==e.balance?{backgroundColor:"#90EE90"}:void 0};return(0,P.jsx)(v.bN,{pagination:(0,v.ZP)(0!==s?B:{page:f,sizePerPage:j,totalSize:s}),keyField:t,columns:D,data:a,children:function(e){var o=e.paginationProps,i=e.paginationTableProps;return(0,P.jsx)(h(),{keyField:t,bootstrap4:!0,data:a,columns:D,search:!0,exportCSV:{fileName:"".concat(N,"_").concat(u()(new Date).format("YYYY-MM-DD HH:mm"),".csv"),noAutoBOM:!1,blobType:"text/csv;charset=ansi",exportAll:!1,onlyExportFiltered:!0},columnToggle:!0,children:function(e){return(0,P.jsxs)("div",{children:[(0,P.jsxs)("div",{className:"flex items-center",children:[(0,P.jsx)(C,(0,n.Z)((0,n.Z)((0,n.Z)({},_),e.searchProps),{},{onChange:function(e){console.log({value:e})}})),(0,P.jsx)(y,(0,n.Z)({className:"inline-flex ml-4 bg-gray-500 items-center small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center h-9 text-white"},e.searchProps)),(0,P.jsx)("button",{className:"ml-2 px-2 focus:outline-none bg-gray-500 items-center  outline shadow-sm  font-medium  text-center rounded-md h-9 text-white",onClick:E,children:"Clear all filters"}),(0,P.jsx)(S,(0,n.Z)((0,n.Z)({className:"inline-flex m-2.5 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center h-9 text-white"},e.csvProps),{},{children:"Export CSV!!"})),U?(0,P.jsx)(l.EK.zx,{size:"medium",type:"outline",onClick:function(){O(!U)},children:(0,P.jsx)(l.PJ.IconFa.FaChevronUp,{})}):(0,P.jsx)(l.EK.zx,{size:"medium",type:"outline",onClick:function(){O(!U)},children:(0,P.jsx)(l.PJ.IconFa.FaChevronDown,{})})]}),U&&(0,P.jsx)("div",{className:"mb-2 overflow-auto h-10",children:(0,P.jsx)(J,(0,n.Z)({contextual:"primary",className:"list-custom-class",btnClassName:"list-btn-custom-class"},e.columnToggleProps))}),(0,P.jsx)("div",{className:"scrollTable",children:(0,P.jsx)(x.Z,(0,n.Z)((0,n.Z)((0,n.Z)({remote:!0},e.baseProps),{},{noDataIndication:"Table is Empty",hover:!0},i),{},{filter:(0,b.ZP)(),headerClasses:"bg-gray-500 text-white whitespace-nowrap",onTableChange:V,rowEvents:H,rowStyle:G}))}),(0,P.jsxs)("div",{className:"flex items-center gap-2 mt-2",children:[(0,P.jsx)(v.dE,(0,n.Z)({},Object.assign({},(0,n.Z)((0,n.Z)({},o),{},{hideSizePerPage:!1})))),(0,P.jsx)(v.yJ,(0,n.Z)({},o))]}),(0,P.jsx)("div",{className:"flex items-center gap-2 mt-2",children:(0,P.jsx)(v.NJ,(0,n.Z)({},o))})]})}})}})},j=(0,r.Pi)((function(e){var t=(0,i.useState)({}),a=(0,o.Z)(t,2),n=a[0],r=a[1];return(0,P.jsx)(P.Fragment,{children:(0,P.jsx)("div",{style:{position:"relative"},children:(0,P.jsx)(w,{id:"_id",data:e.data,totalSize:e.totalSize,selectedItem:n,columns:[{dataField:"_id",text:"Id",hidden:!0,csvExport:!1},{dataField:"headerId",text:"Header Id",sort:!0,editable:!1},{dataField:"collectionCenter",text:"Collection Center",sort:!0,editable:!1},{dataField:"corporateCode",text:"Corporate Code",sort:!0,editable:!1},{dataField:"labId",text:"Lab Id",sort:!0,editable:!1},{dataField:"invoiceAc",text:"Invoice Ac",sort:!0,editable:!1},{dataField:"invoiceDate",text:"Invoice Date",sort:!0,editable:!1,formatter:function(e,t){return u()(t.invoiceDate).format("YYYY-MM-DD")}},{dataField:"actionDate",text:"Action Date",sort:!0,editable:!1,formatter:function(e,t){return u()(t.actionDate).format("YYYY-MM-DD")}},{dataField:"registrationDate",text:"Registration Date",sort:!0,editable:!1,formatter:function(e,t){return u()(t.registrationDate).format("YYYY-MM-DD")}},{dataField:"dueDate",text:"Due Date",sort:!0,editable:!1,formatter:function(e,t){return u()(t.dueDate).format("YYYY-MM-DD")}},{dataField:"reportingDate",text:"Reporting Date",sort:!0,editable:!1,formatter:function(e,t){return u()(t.reportingDate).format("YYYY-MM-DD")}},{dataField:"doctorId",text:"Doctor Id",sort:!0,editable:!1},{dataField:"pId",text:"PId",sort:!0,editable:!1},{dataField:"grossAmount",text:"Gross Amount",sort:!0,editable:!1},{dataField:"netAmount",text:"NetAmount",sort:!0,editable:!1},{dataField:"discountAmount",text:"Discount Amount",sort:!0,editable:!1},{dataField:"discountPer",text:"Discount Per",sort:!0,editable:!1},{dataField:"miscellaneousCharges",text:"Miscellaneous Charges",sort:!0,editable:!1},{dataField:"allMiscCharges",text:"All Misc Charges",headerClasses:"textHeader3",sort:!0,csvFormatter:function(e,t){return e||""},editable:!1,formatter:function(e,t){var a;return(0,P.jsx)(P.Fragment,{children:(0,P.jsx)("div",{className:"flex flex-row gap-2",children:null===t||void 0===t||null===(a=t.allMiscCharges)||void 0===a?void 0:a.map((function(e){var t;return(0,P.jsx)("span",{children:(null===e||void 0===e?void 0:e.code)+" - "+(null===e||void 0===e||null===(t=e.amount)||void 0===t?void 0:t.toString())})}))})})}},{dataField:"discountCharges",text:"Other Charges",sort:!0,editable:!1,formatter:function(e,t){var a,n,o;return(0,P.jsx)(P.Fragment,{children:(0,P.jsx)("div",{className:"flex flex-row gap-2",children:(null===t||void 0===t?void 0:t.discountCharges)&&(0,P.jsx)("span",{children:(null===t||void 0===t||null===(a=t.discountCharges)||void 0===a?void 0:a.code)+" - "+(null===t||void 0===t||null===(n=t.discountCharges)||void 0===n||null===(o=n.amount)||void 0===o?void 0:o.toString())})})})}},{dataField:"receivedAmount",text:"Received Amount",sort:!0,editable:!1},{dataField:"balance",text:"Balance",sort:!0,editable:!1},{dataField:"acClass",text:"AC Class",sort:!0,editable:!1},{dataField:"accountType",text:"Account Type",sort:!0,editable:!1},{dataField:"customerGroup",text:"Customer Group",sort:!0,editable:!1},{dataField:"status",text:"Status",sort:!0,editable:!1},{dataField:"enteredBy",text:"Entered By",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"operation",text:"Report",editable:!1,csvExport:!1,hidden:!e.isDelete,formatter:function(t,a){return(0,P.jsx)(P.Fragment,{children:(0,P.jsx)("div",{className:"flex flex-row",children:(0,P.jsx)(l.u,{tooltipText:"Generate PDF",children:(0,P.jsx)(l.PJ.IconContext,{color:"#fff",size:"20",onClick:function(){return e.onReport&&e.onReport(a)},children:l.PJ.getIconTag(l.PJ.Iconai.AiOutlineFilePdf)})})})})},headerClasses:"sticky right-0  bg-gray-500 text-white z-50",classes:function(e,t,a,n){return"sticky right-0 bg-gray-500"},style:function(t,a,n,o){var i;return{zIndex:(null===(i=e.data)||void 0===i?void 0:i.length)-n}}}],isEditModify:e.isEditModify,isSelectRow:!0,fileName:"Report Delivery",onSelectedRow:function(t){e.onSelectedRow&&e.onSelectedRow(t.map((function(e){return e._id})))},onUpdateItem:function(t,a,n){e.onUpdateItem&&e.onUpdateItem(t,a,n)},onPageSizeChange:function(t,a){e.onPageSizeChange&&e.onPageSizeChange(t,a)},onFilter:function(t,a,n,o){e.onFilter&&e.onFilter(t,a,n,o)},clearAllFilter:function(){},onClickRow:function(t,a){r(t),e.onClickRow&&e.onClickRow(t,a)}})})})})),D=f.Search.SearchBar,N=f.Search.ClearSearchButton,Z=f.CSVExport.ExportCSVButton,I=function(e){var t=e.id,a=e.data,r=e.totalSize,s=void 0===r?10:r,d=e.searchPlaceholder,c=void 0===d?"Search...":d,g=e.page,f=void 0===g?0:g,C=e.sizePerPage,y=void 0===C?10:C,S=e.columns,w=e.fileName,j=e.isEditModify,I=(e.isSelectRow,e.selectedItem),z=(e.onSelectedRow,e.onUpdateItem),T=e.onPageSizeChange,R=e.onFilter,E=e.clearAllFilter,k=e.onClickRow,A=(0,i.useState)(),Y=(0,o.Z)(A,2),M=(Y[0],Y[1],(0,i.useState)(!1)),L=(0,o.Z)(M,2),U=L[0],O=L[1],B={cutome:!0,totalSize:s,paginationSize:5,pageStartIndex:0,firstPageText:"<<",prePageText:"<",nextPageText:">",lastPageText:">>",disablePageTitle:!0,paginationTotalRenderer:function(e,t,a){return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)("div",{className:"clearfix"}),(0,P.jsxs)("span",{children:["Showing ",e," to ",t," of ",a," Results"]})]})},hideSizePerPage:!0,showTotal:!1,alwaysShowAllBtns:!0,sizePerPageList:[{text:"10",value:10},{text:"20",value:20},{text:"30",value:30},{text:"40",value:40},{text:"50",value:50}],hidePageListOnlyOnePage:!0,sizePerPageRenderer:function(e){var t=e.options,a=e.currSizePerPage,n=e.onSizePerPageChange;return(0,P.jsxs)("div",{className:"btn-group items-center",role:"group",children:[(0,P.jsx)("input",{type:"number",min:"0",placeholder:"No",onChange:function(e){e.target.value&&n(e.target.value)},className:"mr-2 ml-2 leading-4 p-2 w-14 focus:outline-none focus:ring block  shadow-sm sm:text-base border border-gray-300 rounded-md"}),t.map((function(e){return(0,P.jsx)("button",{type:"button",onClick:function(){return n(e.page)},className:"btn  ".concat(a==="".concat(e.page)?"bg-primary":"bg-grey"),children:e.text},e.text)}))]})}},_={placeholder:c},V=function(e,t){var a=t.data,n=t.cellEdit,i=t.page,r=t.sizePerPage,l=t.filters,d=t.sortField,c=t.sortOrder,u=t.searchText;if("cellEdit"===e&&j&&z&&z(n.newValue,n.dataField,n.rowId),"pagination"===e&&p().isEmpty(l)&&T&&T(i,r),"filter"===e||"pagination"===e&&!p().isEmpty(l)){if("pagination"===e){if(r>s)return alert("You have not more records.");if(i*r>s)return alert("You have not more records.")}for(var x={},g=0,f=Object.entries(l);g<f.length;g++){var h=(0,o.Z)(f[g],2),v=h[0],b=h[1],P=(0,m.Z)({},v,b.filterVal);x=Object.assign(x,P)}R&&(0,F.Ds)((function(){R(e,x,"filter"===e&&1===i?0:i,r)}))}("search"===e&&(0,F.Ds)((function(){R&&R(e,{srText:u},i,r)})),"sort"===e)&&("asc"===c?a.sort((function(e,t){return e[d]>t[d]?1:t[d]>e[d]?-1:0})):a.sort((function(e,t){return e[d]>t[d]?-1:t[d]>e[d]?1:0})))},J=function(e){var t=e.columns,a=e.onColumnToggle,o=e.toggles;return(0,P.jsx)("div",{className:"btn-group btn-group-toggle","data-toggle":"buttons",children:t.map((function(e){return(0,n.Z)((0,n.Z)({},e),{},{toggle:o[e.dataField]})})).map((function(e,t){if(t>0)return(0,P.jsx)("button",{type:"button",className:" btn btn-primary  btn-sm whitespace-nowrap ".concat(e.toggle?"active":""),"data-toggle":"button","aria-pressed":e.toggle?"true":"false",onClick:function(){return a(e.dataField)},children:e.text},e.dataField)}))})},H={onClick:function(e,t,a){k&&k(t,a)}},G=function(e,t){if(e._id==(null===I||void 0===I?void 0:I._id))return{backgroundColor:"#a9a9a9"}};return(0,P.jsx)(v.bN,{pagination:(0,v.ZP)(0!==s?B:{page:f,sizePerPage:y,totalSize:s}),keyField:t,columns:S,data:a,children:function(e){var o=e.paginationProps,i=e.paginationTableProps;return(0,P.jsx)(h(),{keyField:t,bootstrap4:!0,data:a,columns:S,search:!0,exportCSV:{fileName:"".concat(w,"_").concat(u()(new Date).format("YYYY-MM-DD HH:mm"),".csv"),noAutoBOM:!1,blobType:"text/csv;charset=ansi",exportAll:!1,onlyExportFiltered:!0},columnToggle:!0,children:function(e){return(0,P.jsxs)("div",{children:[(0,P.jsxs)("div",{className:"flex items-center",children:[(0,P.jsx)(D,(0,n.Z)((0,n.Z)((0,n.Z)({},_),e.searchProps),{},{onChange:function(e){console.log({value:e})}})),(0,P.jsx)(N,(0,n.Z)({className:"inline-flex ml-4 bg-gray-500 items-center small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center h-9 text-white"},e.searchProps)),(0,P.jsx)("button",{className:"ml-2 px-2 focus:outline-none bg-gray-500 items-center  outline shadow-sm  font-medium  text-center rounded-md h-9 text-white",onClick:E,children:"Clear all filters"}),(0,P.jsx)(Z,(0,n.Z)((0,n.Z)({className:"inline-flex m-2.5 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center h-9 text-white"},e.csvProps),{},{children:"Export CSV!!"})),U?(0,P.jsx)(l.EK.zx,{size:"medium",type:"outline",onClick:function(){O(!U)},children:(0,P.jsx)(l.PJ.IconFa.FaChevronUp,{})}):(0,P.jsx)(l.EK.zx,{size:"medium",type:"outline",onClick:function(){O(!U)},children:(0,P.jsx)(l.PJ.IconFa.FaChevronDown,{})})]}),U&&(0,P.jsx)("div",{className:"mb-2 overflow-auto h-10",children:(0,P.jsx)(J,(0,n.Z)({contextual:"primary",className:"list-custom-class",btnClassName:"list-btn-custom-class"},e.columnToggleProps))}),(0,P.jsx)("div",{className:"scrollTable",children:(0,P.jsx)(x.Z,(0,n.Z)((0,n.Z)((0,n.Z)({remote:!0},e.baseProps),{},{noDataIndication:"Table is Empty",hover:!0},i),{},{filter:(0,b.ZP)(),headerClasses:"bg-gray-500 text-white whitespace-nowrap",onTableChange:V,rowEvents:H,rowStyle:G}))}),(0,P.jsxs)("div",{className:"flex items-center gap-2 mt-2",children:[(0,P.jsx)(v.dE,(0,n.Z)({},Object.assign({},(0,n.Z)((0,n.Z)({},o),{},{hideSizePerPage:!1})))),(0,P.jsx)(v.yJ,(0,n.Z)({},o))]}),(0,P.jsx)("div",{className:"flex items-center gap-2 mt-2",children:(0,P.jsx)(v.NJ,(0,n.Z)({},o))})]})}})}})},z=(0,r.Pi)((function(e){return(0,P.jsx)(P.Fragment,{children:(0,P.jsx)("div",{style:{position:"relative"},children:(0,P.jsx)(I,{id:"_id",data:e.data,totalSize:e.totalSize,columns:[{dataField:"_id",text:"Id",hidden:!0,csvExport:!1},{dataField:"headerId",text:"Header Id",sort:!0,editable:!1},{dataField:"lineId",text:"Line Id",sort:!0,editable:!1},{dataField:"rLab",text:"RLab",sort:!0,editable:!1},{dataField:"pLab",text:"PLab",sort:!0,editable:!1},{dataField:"collectionCenter",text:"Collection Center",sort:!0,editable:!1},{dataField:"collectionCenterName",text:"Collection Center Name",sort:!0,editable:!1},{dataField:"corporateCode",text:"Corporate Code",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"invoiceAC",text:"Invoice AC",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"invoiceDate",text:"Invoice Date",sort:!0,csvFormatter:function(e){return e||""},editable:!1,formatter:function(e,t){return u()(t.invoiceDate).format("YYYY-MM-DD")}},{dataField:"actionDate",text:"Action Date",sort:!0,csvFormatter:function(e){return e||""},editable:!1,formatter:function(e,t){return u()(t.actionDate).format("YYYY-MM-DD")}},{dataField:"receipt",text:"Receipt",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"pId",text:"PId",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"labId",text:"LabId",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"acSub",text:"AC Sub",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"department",text:"Department",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"serviceType",text:"Service Type",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"panelCode",text:"Panel Code",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"panelName",text:"Panel Name",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"priceGroup",text:"Price Group",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"priceList",text:"Price List",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"grossAmount",text:"Gross Amount",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"netAmount",text:"Net Amount",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"discountAmount",text:"Discount Amount",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"discountPer",text:"Discount Per",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"miscellaneousCharges",text:"Miscellaneous Charges",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"transaction",text:"Transaction",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"acClass",text:"AC Class",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"accountType",text:"Account Type",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"customerGroup",text:"Customer Group",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"status",text:"Status",sort:!0,csvFormatter:function(e){return e||""},editable:!1},{dataField:"enteredBy",text:"Entered By",sort:!0,csvFormatter:function(e){return e||""},editable:!1}],isEditModify:e.isEditModify,isSelectRow:!0,fileName:"Order Delivered",onSelectedRow:function(t){e.onSelectedRow&&e.onSelectedRow(t.map((function(e){return e._id})))},onUpdateItem:function(t,a,n){e.onUpdateItem&&e.onUpdateItem(t,a,n)},onPageSizeChange:function(t,a){e.onPageSizeChange&&e.onPageSizeChange(t,a)},onFilter:function(t,a,n,o){e.onFilter&&e.onFilter(t,a,n,o)},clearAllFilter:function(){}})})})})),T=a(12828),R=(a(80594),a(65733)),E=(a(9479),(0,r.Pi)((function(){var e,t=(0,R.mZ)(),a=(t.loading,t.transactionDetailsStore),r=t.routerStore,c=t.loginStore,u=t.receiptStore,m=(0,s.cI)(),x=(m.control,m.handleSubmit,m.formState.errors,m.setValue,(0,i.useState)()),g=(0,o.Z)(x,2),p=g[0],f=g[1],h=(0,i.useState)(),v=(0,o.Z)(h,2),b=v[0],F=v[1],C=(0,i.useState)(),y=(0,o.Z)(C,2),S=y[0],w=y[1];return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)(l.h4,{children:[(0,P.jsx)(l.CD,{title:(null===(e=r.selectedComponents)||void 0===e?void 0:e.title)||""}),(0,P.jsx)(l.Nd,{store:c})]}),(0,P.jsxs)("div",{className:"p-3 rounded-lg shadow-xl overflow-auto",children:[(0,P.jsx)("span",{className:"font-bold text-lg underline",children:"Transaction Header"}),(0,P.jsx)(j,{data:a.transactionHeaderList||[],totalSize:a.transactionHeaderListCount,isDelete:d.o.checkPermission(r.userPermission,"Delete"),isEditModify:d.o.checkPermission(r.userPermission,"Edit/Modify"),onUpdate:function(e){return f(e)},onSelectedRow:function(e){f({show:!0,type:"delete",id:e,title:"Are you sure?",body:"Delete selected items!"})},onUpdateItem:function(e,t,a){f({show:!0,type:"update",data:{value:e,dataField:t,id:a},title:"Are you sure?",body:"Update items!"})},onPageSizeChange:function(e,t){},onFilter:function(e,t,a,n){},onClickRow:function(e,t){console.log({item:e}),a.transactionDetailsService.findByFieldsTransactionLine({input:{filter:{headerId:null===e||void 0===e?void 0:e.headerId}}})},onReport:function(e){u.receiptService.generatePaymentReceipt({input:{headerId:null===e||void 0===e?void 0:e.headerId}}).then((function(e){var t,a;null!==(t=e.generatePaymentReceipt)&&void 0!==t&&t.success?F({show:!0,data:null===(a=e.generatePaymentReceipt)||void 0===a?void 0:a.receiptData}):l.FN.error({message:"\ud83d\ude14 ".concat(e.generatePaymentReceipt.message)})}))}})]}),(0,P.jsxs)("div",{className:"p-3 rounded-lg shadow-xl overflow-auto",children:[(0,P.jsx)("span",{className:"font-bold text-lg underline",children:"Transaction Line"}),(0,P.jsx)(z,{data:a.transactionListList||[],totalSize:a.transactionListListCount,isDelete:d.o.checkPermission(r.userPermission,"Delete"),isEditModify:d.o.checkPermission(r.userPermission,"Edit/Modify"),onDelete:function(e){return f(e)},onSelectedRow:function(e){f({show:!0,type:"delete",id:e,title:"Are you sure?",body:"Delete selected items!"})},onUpdateItem:function(e,t,a){f({show:!0,type:"update",data:{value:e,dataField:t,id:a},title:"Are you sure?",body:"Update items!"})},onPageSizeChange:function(e,t){},onFilter:function(e,t,a,n){}}),(0,P.jsx)(l.WZ,(0,n.Z)((0,n.Z)({},p),{},{click:function(e){},onClose:function(){f({show:!1})}})),(0,P.jsx)(T.q,(0,n.Z)((0,n.Z)({},b),{},{onClose:function(){F({show:!1})},onReceiptUpload:function(e,t){S?window.open(t+S,"_blank"):u.receiptService.paymentReceiptUpload({input:{file:e}}).then((function(e){var a,n;e.paymentReceiptUpload.success&&(w(null===(a=e.paymentReceiptUpload)||void 0===a?void 0:a.receiptPath),window.open("".concat(t," ").concat(null===(n=e.paymentReceiptUpload)||void 0===n?void 0:n.receiptPath),"_blank"))}))}}))]})]})}))),k=E}}]);
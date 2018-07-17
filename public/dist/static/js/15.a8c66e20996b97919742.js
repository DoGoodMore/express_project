webpackJsonp([15],{TWnx:function(e,t){},jOXJ:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});a("9TmC");var n=a("+I6K"),s={name:"message-manager",data:function(){return{list:[],tableLoading:!1,tableKey:0,listQuery:{pageNum:1,pageSize:10},total:0,messageDetailDialogVisible:!1,messageInfo:{}}},methods:{lookDetailMessage:function(e){var t=this;this.messageInfo=e,e.isRead||Object(n.c)({id:e._id}).then(function(e){0===e.status&&t.getList()}),this.messageDetailDialogVisible=!0},isReadClassName:function(e){return e.row.isRead?"":"no-read"},handleSizeChange:function(e){this.listQuery.pageSize=e,this.getList()},handleCurrentChange:function(e){this.listQuery.pageNum=e,this.getList()},getList:function(){var e=this;this.tableLoading=!0,Object(n.b)(this.listQuery).then(function(t){var a=t.status,n=t.data,s=t.total;0===a&&(e.list=n,e.list&&e.list.length&&e.list.map(function(t){t.sendTime=e.changTime(t.sendTime)}),e.total=s,e.tableLoading=!1)}).catch(function(e){return console.log(e)})},handleDelete:function(e){var t=this;this.$confirm("确定要删除吗","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(n.a)({id:e._id}).then(function(e){0===e.status&&(t.$message({message:"操作成功",type:"success"}),t.getList())})}).catch(function(){})},changTime:function(e,t){if(!e)return"暂无数据";var a=new Date(e),n=a.getFullYear(),s=a.getMonth()+1,i=a.getDate(),l=a.getHours(),o=a.getMinutes(),r=a.getSeconds();return t?n+"年"+s+"月"+i+"日":n+"年"+s+"月"+i+"日-"+(l<10?"0"+l:l)+":"+(o<10?"0"+o:o)+":"+(r<10?"0"+r:r)}},created:function(){this.getList()}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"loading","row-class-name":e.isReadClassName,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"index"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"发送人"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.username))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"200",label:"发送时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.sendTime))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"500",label:"发送内容"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"message-content"},[e._v(e._s(t.row.content))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"280","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(a){e.lookDetailMessage(t.row)}}},[e._v("查看")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handleDelete(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("div",{staticClass:"pagination-container",staticStyle:{"text-align":"center","margin-top":"20px",position:"relative"}},[a("el-pagination",{attrs:{background:"","current-page":e.listQuery.pageNum,"page-sizes":[10,20,30,50],"page-size":e.listQuery.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:"提示","append-to-body":"",visible:e.messageDetailDialogVisible,width:"30%",center:""},on:{"update:visible":function(t){e.messageDetailDialogVisible=t}}},[a("el-form",{attrs:{"label-position":"left","label-width":"80px",model:e.messageInfo}},[a("el-form-item",{attrs:{label:"发送人"}},[a("el-input",{attrs:{disabled:""},model:{value:e.messageInfo.username,callback:function(t){e.$set(e.messageInfo,"username",t)},expression:"messageInfo.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"邮箱地址"}},[a("el-input",{attrs:{disabled:""},model:{value:e.messageInfo.email,callback:function(t){e.$set(e.messageInfo,"email",t)},expression:"messageInfo.email"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"发送时间"}},[a("el-input",{attrs:{disabled:""},model:{value:e.messageInfo.sendTime,callback:function(t){e.$set(e.messageInfo,"sendTime",t)},expression:"messageInfo.sendTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"发送内容"}},[a("el-input",{attrs:{disabled:"",type:"textarea",resize:"vertical",rows:"5"},model:{value:e.messageInfo.content,callback:function(t){e.$set(e.messageInfo,"content",t)},expression:"messageInfo.content"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.messageDetailDialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.messageDetailDialogVisible=!1}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var l=a("VU/8")(s,i,!1,function(e){a("TWnx")},null,null);t.default=l.exports}});
//# sourceMappingURL=15.a8c66e20996b97919742.js.map
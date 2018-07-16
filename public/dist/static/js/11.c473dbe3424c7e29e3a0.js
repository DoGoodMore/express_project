webpackJsonp([11],{Zmmt:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("wQuk"),i={name:"article-type-manager",data:function(){return{articleTypeDialogTitle:"",tableKey:0,list:[],tableLoading:!1,listQuery:{pageSize:10,pageNum:1},articleTypeDialog:!1,rules:{typeName:[{required:!0,message:"请输入类别名称",trigger:"blur"}],typeLevel:[{required:!0,message:"请选择类别等级",trigger:"blur"}],upperType:[{required:!1,message:"请选择父级类别",trigger:"blur"}],typePath:[{required:!0,message:"请输入类别路径",trigger:"blur"}]},form:{typeName:"",typeLevel:1,upperType:"",typePath:"",typeSort:""},upperTypeDisable:!0,typesData:[],total:0}},methods:{handleEditSubmit:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return!1;Object(l.f)(e.form).then(function(t){0===t.status&&(e.$message({message:"修改成功",type:"success"}),e.articleTypeDialog=!1,e.getAllUpperTypeList(),e.getDataList())})})},getAllUpperTypeList:function(){var e=this;Object(l.d)({}).then(function(t){var a=t.status,l=t.data;0===a&&(e.typesData=l)})},handleEdit:function(e){var t=this;this.articleTypeDialogTitle="修改类别",this.form=e,this.upperTypeDisable=1===this.form.typeLevel,1===this.form.typeLevel?(this.form.upperType="",this.rules.upperType[0].required=!1):this.rules.upperType[0].required=!0,0===this.form.typeSort&&(this.form.typeSort=""),this.articleTypeDialog=!0,this.$nextTick(function(){t.$refs.form.clearValidate()})},changTime:function(e,t){if(!e)return"暂无数据";var a=new Date(e),l=a.getFullYear(),i=a.getMonth()+1,r=a.getDate(),n=a.getHours(),o=a.getMinutes(),s=a.getSeconds();return t?l+"年"+i+"月"+r+"日":l+"年"+i+"月"+r+"日-"+(n<10?"0"+n:n)+":"+(o<10?"0"+o:o)+":"+(s<10?"0"+s:s)},resetForm:function(){this.form={typeName:"",typeLevel:1,upperType:"",typePath:"",typeSort:""},this.rules.upperType[0].required=!1},articleTypeDialogShow:function(){var e=this;this.resetForm(),this.articleTypeDialogTitle="新增类别",this.upperTypeDisable=!0,this.articleTypeDialog=!0,this.$nextTick(function(){e.$refs.form.clearValidate()})},handleAdd:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return!1;Object(l.a)(e.form).then(function(t){0===t.status&&(e.$message({message:"新增成功",type:"success"}),e.articleTypeDialog=!1,e.getAllUpperTypeList(),e.getDataList())})})},handleDelete:function(e){var t=this;this.$confirm("确定要删除吗","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(l.b)({id:e._id}).then(function(e){0===e.status&&(t.$message({message:"成功删除",type:"success"}),t.getAllUpperTypeList(),t.getDataList())})})},handleSizeChange:function(e){this.listQuery.pageSize=e,this.getDataList()},handleCurrentChange:function(e){this.listQuery.pageNum=e,this.getDataList()},getDataList:function(){var e=this;this.tableLoading=!0,Object(l.e)(this.listQuery).then(function(t){var a=t.status,l=t.data,i=t.total;0===a&&(e.total=i,e.list=l,e.tableLoading=!1)})},typeLevelChange:function(e){e=1===e,this.upperTypeDisable=e,this.rules.upperType[0].required=!e}},created:function(){this.getAllUpperTypeList(),this.getDataList()}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"loading",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"index",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"类别名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.typeName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"类别级别"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(1===t.row.typeLevel?"顶级类别":"子级类别"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"类别值"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.value))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"200",label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.changTime(t.row.create)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"280","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){e.handleEdit(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handleDelete(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("div",{staticClass:"pagination-container",staticStyle:{"text-align":"center","margin-top":"20px",position:"relative"}},[a("el-pagination",{attrs:{background:"","current-page":e.listQuery.pageNum,"page-sizes":[10,20,30,50],"page-size":e.listQuery.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),e._v(" "),a("el-button",{staticStyle:{position:"absolute",right:"40px",top:"0"},attrs:{type:"primary"},on:{click:e.articleTypeDialogShow}},[e._v("添加")])],1),e._v(" "),a("el-dialog",{attrs:{title:e.articleTypeDialogTitle,visible:e.articleTypeDialog},on:{"update:visible":function(t){e.articleTypeDialog=t}}},[a("el-form",{ref:"form",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:e.rules,model:e.form,"label-position":"left","label-width":"90px"}},[a("el-form-item",{attrs:{label:"类别名称",prop:"typeName"}},[a("el-input",{model:{value:e.form.typeName,callback:function(t){e.$set(e.form,"typeName",t)},expression:"form.typeName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"类别类型",prop:"typeLevel"}},[a("el-radio",{attrs:{disabled:"修改类别"===e.articleTypeDialogTitle,label:1},on:{change:e.typeLevelChange},model:{value:e.form.typeLevel,callback:function(t){e.$set(e.form,"typeLevel",t)},expression:"form.typeLevel"}},[e._v("一级类别")]),e._v(" "),a("el-radio",{attrs:{disabled:"修改类别"===e.articleTypeDialogTitle,label:2},on:{change:e.typeLevelChange},model:{value:e.form.typeLevel,callback:function(t){e.$set(e.form,"typeLevel",t)},expression:"form.typeLevel"}},[e._v("二级类别")])],1),e._v(" "),a("el-form-item",{attrs:{label:"父级类别",prop:"upperType"}},[a("el-select",{attrs:{disabled:e.upperTypeDisable,placeholder:"请选择类型"},model:{value:e.form.upperType,callback:function(t){e.$set(e.form,"upperType",t)},expression:"form.upperType"}},e._l(e.typesData,function(e){return a("el-option",{key:e._id,attrs:{label:e.typeName,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"类别路径",prop:"typePath"}},[a("el-input",{model:{value:e.form.typePath,callback:function(t){e.$set(e.form,"typePath",t)},expression:"form.typePath"}})],1),e._v(" "),1===e.form.typeLevel&&e.typesData.length&&"修改类别"===e.articleTypeDialogTitle?a("el-form-item",{attrs:{label:"排序",prop:"typeSort"}},[a("el-select",{attrs:{placeholder:"请选择类型"},model:{value:e.form.typeSort,callback:function(t){e.$set(e.form,"typeSort",t)},expression:"form.typeSort"}},e._l(e.typesData,function(e,t){return a("el-option",{key:e.value,attrs:{label:t+1,value:t+1}})}))],1):e._e(),e._v(" "),1===e.form.typeLevel&&e.typesData.length&&"新增类别"===e.articleTypeDialogTitle?a("el-form-item",{attrs:{label:"排序",prop:"typeSort"}},[a("el-select",{attrs:{placeholder:"请选择类型"},model:{value:e.form.typeSort,callback:function(t){e.$set(e.form,"typeSort",t)},expression:"form.typeSort"}},e._l(e.typesData.length+1,function(e,t){return a("el-option",{key:t,attrs:{label:e,value:e}})}))],1):e._e()],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.articleTypeDialog=!1}}},[e._v("取 消")]),e._v(" "),"新增类别"===e.articleTypeDialogTitle?a("el-button",{attrs:{type:"primary"},on:{click:e.handleAdd}},[e._v("确 定")]):a("el-button",{attrs:{type:"primary"},on:{click:e.handleEditSubmit}},[e._v("修 改")])],1)],1)],1)},staticRenderFns:[]};var n=a("VU/8")(i,r,!1,function(e){a("cWfu")},"data-v-5bfc8a8e",null);t.default=n.exports},cWfu:function(e,t){}});
//# sourceMappingURL=11.c473dbe3424c7e29e3a0.js.map
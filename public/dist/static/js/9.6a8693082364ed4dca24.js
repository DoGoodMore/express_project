webpackJsonp([9],{ZzWV:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("//Fk"),o=r.n(i),l=r("woOf"),a=r.n(l),n=r("5aCZ"),s=r("9TmC"),c=r("RY13"),f=r("wQuk"),m={name:"tinymce-demo",components:{Tinymce:n.default},data:function(){return{typeProps:{children:"children",label:"typeName",value:"typePath",disabled:"disabled"},typeList:[],tagsList:[],fileList:[],dialogImageUrl:"",dialogVisible:!1,form:{description:"",tags:[],content:"",title:"",imgFile:"",fileType:"",original:!0,from:{author:"",fromUrl:""},articleType:[]},rules:{description:[{required:!0,message:"请输入对应内容",trigger:"blur"}],content:[{required:!0,message:"请输入对应内容给",trigger:"blur"}],title:[{required:!0,message:"请输入文章标题",trigger:"blur"}],original:[{required:!0,message:"请选择是否为原创",trigger:"blur"}]},articleId:"",changeImg:!1}},methods:{getAllTypeList:function(){var e=this;return Object(f.c)({}).then(function(t){var r=t.status,i=t.data;e.$set(e,"typeList",[]),0===r&&i&&i.length&&(i.map(function(t){1===t.upperType&&e.typeList.push(a()(t,{disabled:!1,children:[]}))}),e.typeList.length&&(i.map(function(t){e.typeList.find(function(e){e.value===t.upperType&&e.children.push(t)})}),e.typeList.sort(function(e,t){return e.typeSort-t.typeSort}),e.typeList.map(function(e){e.children.length||(e.disabled=!0)})))})},handleChangeType:function(e,t){console.log(e,t),console.log(this.form.articleType)},updateArticleSubmit:function(){var e=this;this.$refs.form.validate(function(t){if(t){if(!e.form.tags.length)return void e.$message({message:"请选择正确的标签列表",type:"error"});if(!(e.form.original||e.form.from.author&&e.form.from.fromUrl))return void e.$message({message:"请输入正确的来源信息",type:"error"});var r=a()(e.form,{_id:e.articleId});e.changeImg||(r.imgFile=!1),Object(s.h)(r).then(function(t){0===t.status&&(e.$message({message:"操作成功",type:"success"}),e.$router.push("/home/article-list"))}).catch(function(e){return console.log(e)})}})},handleRemove:function(e,t){console.log(e,t)},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},changeImgList:function(e,t){this.$set(this,"fileList",t)},beforeUpload:function(){if(this.fileList.length-1)return this.$message({message:"封面图片只能上传一张...",type:"error"}),!1},uploadHttpRequest:function(e){var t=this,r=e.file;return new o.a(function(e,i){t.parseBase64(r).then(function(e){t.form.imgFile=e?e.split(";")[1].split(",")[1]:"",t.form.fileType=r.type,t.changeImg=!0})})},parseBase64:function(e){return new o.a(function(t,r){var i=new FileReader;i.readAsDataURL(e),i.onload=function(){t(this.result)}})},getTagList:function(){var e=this;Object(c.c)({}).then(function(t){var r=t.status,i=t.data;0===r&&(e.tagsList=i)})},getArticle:function(){var e=this;Object(s.c)({id:this.articleId}).then(function(t){var r=t.status,i=t.data;0===r&&(e.form.title=i.title,e.form.content=i.content,e.form.tags=i.tags,e.form.original=i.original,e.form.from.author=i.from.author,e.form.from.fromUrl=i.from.fromUrl,e.form.description=i.description,e.fileList=[{name:"poster",url:i.poster}],e.typeList.find(function(t){t.children&&t.children.length&&t.children.find(function(r){r.typePath===i.type&&e.$set(e.form,"articleType",[t.typePath,r.typePath])})}))})}},created:function(){this.articleId=this.$route.query.id,this.articleId||(this.$message({message:"获取文章信息失败",type:"error"}),this.$router.push("/home/article")),this.getTagList(),this.getArticle(),this.getAllTypeList()}},p={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"components-container"},[r("el-form",{ref:"form",attrs:{"label-position":"left","label-width":"100px",rules:e.rules,model:e.form}},[r("el-form-item",{attrs:{label:"类别",prop:"type"}},[r("el-cascader",{attrs:{"expand-trigger":"hover",options:e.typeList,props:e.typeProps},on:{change:e.handleChangeType},model:{value:e.form.articleType,callback:function(t){e.$set(e.form,"articleType",t)},expression:"form.articleType"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"标题",prop:"title"}},[r("el-input",{attrs:{placeholder:"请输入文章标题"},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"标签",prop:"tag"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",multiple:"",placeholder:"请选择对应标签"},model:{value:e.form.tags,callback:function(t){e.$set(e.form,"tags",t)},expression:"form.tags"}},e._l(e.tagsList,function(e,t){return r("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"图片",prop:"poster"}},[r("el-upload",{attrs:{"before-upload":e.beforeUpload,"file-list":e.fileList,"on-change":e.changeImgList,action:"http://172.16.28.97:3001/posts",accept:"image/*","list-type":"picture-card","on-preview":e.handlePictureCardPreview,"http-request":e.uploadHttpRequest,"on-remove":e.handleRemove}},[r("i",{staticClass:"el-icon-plus"})]),e._v(" "),r("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1),e._v(" "),r("el-form-item",{attrs:{label:"描述",prop:"description"}},[r("el-input",{attrs:{type:"textarea",rows:"6",placeholder:"请输入描述文字"},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"是否原创",prop:"original"}},[r("el-radio",{attrs:{label:!0},model:{value:e.form.original,callback:function(t){e.$set(e.form,"original",t)},expression:"form.original"}},[e._v("是")]),e._v(" "),r("el-radio",{attrs:{label:!1},model:{value:e.form.original,callback:function(t){e.$set(e.form,"original",t)},expression:"form.original"}},[e._v("否")])],1),e._v(" "),e.form.original?e._e():r("el-form-item",{attrs:{label:"原作者",prop:"fromAuthor"}},[r("el-input",{attrs:{placeholder:"请输入原文作者"},model:{value:e.form.from.author,callback:function(t){e.$set(e.form.from,"author",t)},expression:"form.from.author"}})],1),e._v(" "),e.form.original?e._e():r("el-form-item",{attrs:{label:"来源链接",prop:"fromUrl"}},[r("el-input",{attrs:{placeholder:"请输入原文链接"},model:{value:e.form.from.fromUrl,callback:function(t){e.$set(e.form.from,"fromUrl",t)},expression:"form.from.fromUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"内容",prop:"content"}},[r("div",[r("tinymce",{attrs:{height:300},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1)]),e._v(" "),r("el-form-item",{attrs:{label:"",prop:"review"}},[r("div",{staticClass:"editor-content",domProps:{innerHTML:e._s(e.form.content)}})]),e._v(" "),r("el-form-item",{attrs:{label:"",prop:"add"}},[r("el-button",{attrs:{type:"primary"},on:{click:e.updateArticleSubmit}},[e._v("修改")])],1)],1)],1)},staticRenderFns:[]};var u=r("VU/8")(m,p,!1,function(e){r("v/eb")},"data-v-85184a44",null);t.default=u.exports},"v/eb":function(e,t){}});
//# sourceMappingURL=9.6a8693082364ed4dca24.js.map
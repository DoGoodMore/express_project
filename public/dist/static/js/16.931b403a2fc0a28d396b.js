webpackJsonp([16],{"2atc":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("woOf"),i=a.n(r),s=a("//Fk"),n=a.n(s),c=a("oopf"),l=a("wQuk"),o=a("9TmC"),h=a("RY13"),u={components:{rightShow:c.default},name:"article-detail",data:function(){return{cardDataArr:[],tagsArr:[],typeList:[],breadcrumbData:[],listQuery:{pageNum:1,pageSize:10,articlePath:""},loading:null}},methods:{changTime:function(t,e){if(!t)return"暂无数据";var a=new Date(t),r=a.getFullYear(),i=a.getMonth()+1,s=a.getDate(),n=a.getHours(),c=a.getMinutes(),l=a.getSeconds();return e?r+"年"+i+"月"+s+"日":r+"年"+i+"月"+s+"日-"+(n<10?"0"+n:n)+":"+(c<10?"0"+c:c)+":"+(l<10?"0"+l:l)},handleSelect:function(t){t!==this.listQuery.articlePath&&(this.$router.push("/home/article-list?path="+t),this.getDataList())},createArticle:function(){this.$router.push("/home/add-article")},getAllTypeList:function(){var t=this;return new n.a(function(e,a){Object(l.c)({}).then(function(a){var r=a.status,s=a.data;t.$set(t,"typeList",[]),0===r&&s&&s.length&&(s.map(function(e){1===e.upperType&&t.typeList.push(i()(e,{children:[]}))}),t.typeList.length&&(s.map(function(e){t.typeList.find(function(t){t.value===e.upperType&&t.children.push(e)})}),t.typeList.sort(function(t,e){return t.typeSort-e.typeSort})),e())}).catch(function(t){return a(t)})})},getAllTagsList:function(){var t=this;return new n.a(function(e,a){Object(h.c)({}).then(function(r){var i=r.status,s=r.data;0===i?(t.tagsArr=s,e()):a(new Error("服务器错误"))}).catch(function(t){return a(t)})})},changeColorToRgb:function(t,e){var a=[],r=[];if(3===(t=t.replace(/#/,"")).length){for(var i=[],s=0;s<3;s++)i.push(t.charAt(s)+t.charAt(s));t=i.join("")}for(var n=0;n<3;n++)a[n]="0x"+t.substr(2*n,2),r.push(parseInt(Number(a[n])));return"rgba("+r.join(",")+", "+(e||1)+")"},getDataList:function(){var t=this;if(this.loading=this.$loading({lock:!0,text:"加载中...",background:"rgba(0, 0, 0, .9)"}),this.listQuery.articlePath=this.$route.query.path?this.$route.query.path:this.typeList[0].children.length?this.typeList[0].children[0].typePath:this.typeList[0].typePath,!this.typeList||!this.typeList.length)return this.$message({message:"请联系博主添加文章类型",type:"error"}),void this.$router.push("/home/index");this.$set(this,"breadcrumbData",[]),this.typeList.find(function(e){return e.children&&e.children.length?e.children.find(function(a){if(a.typePath===t.listQuery.articlePath)return t.breadcrumbData.push(e),t.breadcrumbData.push(a),!0}):e.typePath===t.listQuery.articlePath?(t.breadcrumbData.push(e),!0):void 0})||(this.typeList[0].children&&this.typeList[0].children.length?(this.breadcrumbData.push(this.typeList[0]),this.breadcrumbData.push(this.typeList[0].children[0]),this.listQuery.articlePath=this.typeList[0].children[0].typePath):(this.breadcrumbData.push(this.typeList[0]),this.listQuery.articlePath=this.typeList[0].typePath),this.$message({message:"对不起,没有找到对应的文章类型",type:"error"})),Object(o.e)(this.listQuery).then(function(e){t.$set(t,"cardDataArr",[]);var a=e.status,r=e.data;0===a&&(r&&r.length&&r.map(function(e,a){t.cardDataArr.push({id:e._id,title:e.title,tags:[],content:e.description,imgUrl:e.poster,author:e.author||"xyzzzzz",readCount:e.views,comments:e.comments.length,releaseTime:t.changTime(e.create)}),e.tags&&e.tags.length&&e.tags.map(function(e){t.tagsArr.find(function(r){if(e===r.value)return t.cardDataArr[a].tags.push(r),!0})})}),t.loading.close())})}},created:function(){var t=this;this.loading=this.$loading({lock:!0,text:"加载中...",background:"rgba(0, 0, 0, .9)"}),n.a.all([this.getAllTypeList(),this.getAllTagsList()]).then(function(){t.getDataList()})}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"width"},[a("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":t.listQuery.articlePath,mode:"horizontal"},on:{select:t.handleSelect}},[t._l(t.typeList,function(e){return[e.children.length?a("el-submenu",{key:e.value,attrs:{index:e.typePath}},[a("template",{slot:"title"},[t._v(t._s(e.typeName))]),t._v(" "),t._l(e.children,function(e){return a("el-menu-item",{key:e.value,attrs:{index:e.typePath}},[t._v(t._s(e.typeName))])})],2):a("el-menu-item",{key:e.value,attrs:{index:e.typePath}},[t._v(t._s(e.typeName))])]})],2),t._v(" "),a("el-breadcrumb",{staticStyle:{height:"50px","line-height":"50px","padding-left":"20px","margin-top":"20px","background-color":"rgb(240, 240, 240)"},attrs:{separator:">"}},t._l(t.breadcrumbData,function(e){return a("el-breadcrumb-item",{key:e._id},[t._v("\n            "+t._s(e.typeName)+"\n        ")])})),t._v(" "),a("el-row",{staticStyle:{"margin-top":"20px"},attrs:{gutter:20}},[a("el-col",{attrs:{span:18}},[a("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"10px"},attrs:{shadow:"never"}},[a("div",{staticClass:"clear-fix",attrs:{slot:"header"},slot:"header"},[a("span",{staticClass:"article-type-title"},[t._v(t._s(t.breadcrumbData[t.breadcrumbData.length-1]?t.breadcrumbData[t.breadcrumbData.length-1].typeName:""))]),t._v(" "),a("el-button",{staticClass:"create-article-btn",attrs:{type:"primary",size:"mini"},on:{click:t.createArticle}},[t._v("发表文章")])],1),t._v(" "),t.cardDataArr.length?a("div",t._l(t.cardDataArr,function(e,r){return a("el-card",{key:r,staticClass:"box-card",staticStyle:{"margin-top":"20px"},attrs:{shadow:"hover"}},[a("div",{staticClass:"clear-fix",staticStyle:{position:"relative"},on:{click:function(a){t.$router.push("/home/article-detail?id="+e.id)}}},[a("div",{staticClass:"card-left"},[a("div",{staticClass:"card-title"},[t._v(t._s(e.title))]),t._v(" "),t._l(e.tags,function(e){return a("a",{key:e.value,staticStyle:{display:"inline-block","margin-right":"8px"},attrs:{href:"javascript:;"}},[a("span",{staticClass:"tag",style:{background:t.changeColorToRgb(e.background,.2),color:e.color,borderColor:t.changeColorToRgb(e.color,.1)}},[t._v(t._s(e.label))])])}),t._v(" "),a("p",{staticStyle:{"margin-top":"10px","line-height":"20px"}},[t._v(t._s(e.content))]),t._v(" "),a("div",{staticClass:"card-data-info",style:e.imgUrl?{position:"absolute",bottom:"0",left:"0"}:{marginTop:"20px"}},[a("a",{attrs:{href:"javascript:;"}},[a("i",{staticClass:"icon-author"}),t._v("\n                                        "+t._s(e.author)+"\n                                    ")]),t._v(" "),a("a",{attrs:{href:"javascript:;"}},[a("i",{staticClass:"icon-views"}),t._v("\n                                        "+t._s(e.readCount)+"\n                                    ")]),t._v(" "),a("a",{attrs:{href:"javascript:;"}},[a("i",{staticClass:"icon-coments"}),t._v("\n                                        "+t._s(e.comments)+"\n                                    ")]),t._v(" "),a("a",{attrs:{href:"javascript:;"}},[a("i",{staticClass:"icon-date"}),t._v("\n                                        "+t._s(e.releaseTime)+"\n                                    ")])])],2),t._v(" "),a("div",{staticClass:"card-right"},[e.imgUrl?a("img",{attrs:{src:e.imgUrl,alt:"img"}}):t._e()])])])})):a("div",{staticClass:"no-article-data"},[a("span",[t._v("暂无数据")])])])],1),t._v(" "),a("right-show")],1)],1)},staticRenderFns:[]};var d=a("VU/8")(u,p,!1,function(t){a("6HPJ")},"data-v-346f8875",null);e.default=d.exports},"6HPJ":function(t,e){}});
//# sourceMappingURL=16.931b403a2fc0a28d396b.js.map
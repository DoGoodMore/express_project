webpackJsonp([5,11],{"/mvX":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("//Fk"),r=a.n(i),n=a("oopf"),s=a("9TmC"),l=a("RY13"),c=a("1AY1"),o={components:{rightShow:n.default,goToTop:c.default},name:"article-detail",data:function(){return{tagsArr:[{type:"info",text:"Node"},{type:"success",text:"Javascript"},{type:"error",text:"Vue"}],articleId:"",articleData:{comments:[],content:"",create:"",description:"",from:{},good:"",hot:"",noGood:"",original:"",poster:"",tags:[],title:"",update:"",views:"",__v:"",_id:""},preArticle:null,nextArticle:null,likeArticles:[],myBackToTopStyle:{right:"50px",bottom:"50px",width:"40px",height:"40px","border-radius":"4px","line-height":"45px",background:"#e7eaf1"},loading:null}},methods:{articleChange:function(t){this.$router.push("/home/article-detail?id="+t),this.$refs.goTop.backToTop(),this.getData()},changeColorToRgb:function(t,e){var a=[],i=[];if(3===(t=t.replace(/#/,"")).length){for(var r=[],n=0;n<3;n++)r.push(t.charAt(n)+t.charAt(n));t=r.join("")}for(var s=0;s<3;s++)a[s]="0x"+t.substr(2*s,2),i.push(parseInt(Number(a[s])));return"rgba("+i.join(",")+", "+(e||1)+")"},changTime:function(t,e){if(!t)return"暂无数据";var a=new Date(t),i=a.getFullYear(),r=a.getMonth()+1,n=a.getDate(),s=a.getHours(),l=a.getMinutes(),c=a.getSeconds();return e?i+"年"+r+"月"+n+"日":i+"年"+r+"月"+n+"日-"+(s<10?"0"+s:s)+":"+(l<10?"0"+l:l)+":"+(c<10?"0"+c:c)},handleSelect:function(t,e){console.log(t,e)},getArticleDetail:function(){var t=this;return new r.a(function(e,a){Object(s.d)({id:t.articleId}).then(function(a){var i=a.status,r=a.data,n=a.pre,s=a.next;0===i?(t.preArticle=n,t.nextArticle=s,e(r)):e([])}).catch(function(t){return a(t)})})},getTagList:function(){return new r.a(function(t,e){Object(l.c)({}).then(function(e){var a=e.status,i=e.data;t(0===a?i:[])}).catch(function(t){return e(t)})})},getLikeArticles:function(){var t=this,e=[];return this.articleData.tags&&this.articleData.tags.length&&this.articleData.tags.map(function(t){e.push(t.value)}),Object(s.g)({tags:e,id:this.articleData._id}).then(function(e){var a=e.status,i=e.data;0===a&&(t.likeArticles=i)})},getData:function(){var t=this;this.loading=this.$loading({lock:!0,text:"加载中...",background:"rgba(0, 0, 0, .9)"}),this.articleId=this.$route.query.id,this.articleId||(this.$message({message:"获取文章信息失败",type:"error"}),this.$router.push("/home/article")),r.a.all([this.getArticleDetail(),this.getTagList()]).then(function(e){var a=e[0],i=e[1],r=[];a.tags.length&&i.length&&a.tags.map(function(t){i.find(function(e){if(t===e.value)return r.push(e),!0})}),a.tags=r,t.articleData=a}).catch(function(t){return console.log(t)}).then(function(){return t.getLikeArticles()}).then(function(){return t.loading.close()})}},created:function(){this.getData()}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"width"},[a("go-to-top",{ref:"goTop",attrs:{transitionName:"fade",customStyle:t.myBackToTopStyle,visibilityHeight:300,backPosition:0}}),t._v(" "),a("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":"2",mode:"horizontal"},on:{select:t.handleSelect}},[a("el-menu-item",{attrs:{index:"1"}},[t._v("首页")]),t._v(" "),a("el-menu-item",{attrs:{index:"2"}},[t._v("所有文章")]),t._v(" "),a("el-submenu",{attrs:{index:"3"}},[a("template",{slot:"title"},[t._v("前端")]),t._v(" "),a("el-menu-item",{attrs:{index:"2-1"}},[t._v("Javascript")]),t._v(" "),a("el-menu-item",{attrs:{index:"2-2"}},[t._v("HTML")]),t._v(" "),a("el-menu-item",{attrs:{index:"2-3"}},[t._v("CSS")])],2),t._v(" "),a("el-submenu",{attrs:{index:"4"}},[a("template",{slot:"title"},[t._v("前端框架")]),t._v(" "),a("el-menu-item",{attrs:{index:"4-1"}},[t._v("Vue")]),t._v(" "),a("el-menu-item",{attrs:{index:"4-2"}},[t._v("React")]),t._v(" "),a("el-menu-item",{attrs:{index:"4-3"}},[t._v("Angular")]),t._v(" "),a("el-menu-item",{attrs:{index:"4-4"}},[t._v("JQuery")])],2),t._v(" "),a("el-menu-item",{attrs:{index:"5"}},[t._v("Node")]),t._v(" "),a("el-menu-item",{attrs:{index:"6"}},[t._v("Linux")])],1),t._v(" "),a("el-breadcrumb",{staticStyle:{height:"50px","line-height":"50px","margin-top":"20px","background-color":"rgb(240, 240, 240)"},attrs:{separator:">"}},[a("el-breadcrumb-item",[a("router-link",{attrs:{to:"/home/article-list"}},[t._v("所有文章")])],1),t._v(" "),a("el-breadcrumb-item",[a("a",{attrs:{href:"/"}},[t._v("前端")])]),t._v(" "),a("el-breadcrumb-item",[a("a",{attrs:{href:"javascript:;"}},[t._v("Javascript")])]),t._v(" "),a("el-breadcrumb-item",[a("a",{attrs:{href:"javascript:;"}},[t._v("初识javascript")])])],1),t._v(" "),a("el-row",{staticStyle:{"margin-top":"20px"},attrs:{gutter:20}},[a("el-col",{attrs:{span:18}},[a("div",{staticClass:"article-title"},[t._v("\n                "+t._s(t.articleData?t.articleData.title:"数据获取失败")+"\n            ")]),t._v(" "),a("div",{staticClass:"article-from"},[t.articleData.original?a("div",{staticClass:"copyright-area"},[t._v("文章为博主原创内容 如有转载请注明出处")]):a("div",{staticClass:"copyright-area"},[t._v("\n                    原文出处："),a("a",{attrs:{target:"_blank",href:t.articleData?t.articleData.from.fromUrl:"javascript:;"}},[t._v(t._s(t.articleData?t.articleData.from.author:"数据获取失败"))])])]),t._v(" "),a("div",{staticClass:"editor-content content",domProps:{innerHTML:t._s(t.articleData?t.articleData.content:"数据获取失败")}}),t._v(" "),a("div",{staticClass:"bottom",staticStyle:{"margin-top":"30px"}},[a("div",{staticClass:"tips"},[a("span",{staticStyle:{"margin-right":"10px"}},[t._v("标签:")]),t._v(" "),t._l(t.articleData.tags,function(e){return a("a",{key:e.value,staticStyle:{display:"inline-block","margin-right":"10px"},attrs:{href:"javascript:;"}},[a("span",{staticClass:"tag",style:{background:t.changeColorToRgb(e.background,.2),color:e.color,borderColor:t.changeColorToRgb(e.color,.1)}},[t._v(t._s(e.label))])])})],2),t._v(" "),a("div",{staticClass:"actions"},[a("a",{attrs:{href:"javascript:;"}},[a("i",{staticClass:"icon-good"}),t._v(t._s(t.articleData.good))]),t._v(" "),a("a",{attrs:{href:"javascript:;"}},[a("i",{staticClass:"icon-not-good"}),t._v(t._s(t.articleData.noGood))]),t._v(" "),a("a",{attrs:{href:"javascript:;"}},[a("i",{staticClass:"icon-coments"}),t._v(t._s(t.articleData?t.articleData.comments.length:0))])]),t._v(" "),a("div",{staticClass:"pre-or-next"},[a("div",{staticClass:"pre"},[a("i",{staticClass:"icon-pre"}),t._v("上一篇:\n                        "),t.preArticle?a("a",{attrs:{href:"javascript:;"},on:{click:function(e){t.articleChange(t.preArticle._id)}}},[t._v(t._s(t.preArticle.title))]):a("span",{staticStyle:{"margin-left":"10px"}},[t._v("已经是第一篇啦")])]),t._v(" "),a("div",{staticClass:"next"},[a("i",{staticClass:"icon-next"}),t._v("下一篇:\n                        "),t.nextArticle?a("a",{attrs:{href:"javascript:;"},on:{click:function(e){t.articleChange(t.nextArticle._id)}}},[t._v(t._s(t.nextArticle.title))]):a("span",{staticStyle:{"margin-left":"10px"}},[t._v("已经是最后一篇啦")])])]),t._v(" "),a("div",{staticClass:"comments"},[a("h4",[t._v("评论列表")]),t._v(" "),t.articleData&&t.articleData.comments.length?a("ul",t._l(t.articleData.comments,function(e,i){return a("li",{key:i},[a("div",{staticClass:"comment-header"},[t._v("\n                                #"),a("span",[t._v(t._s(i+1))]),t._v("楼\n                                "),a("span",{staticClass:"date"},[t._v(t._s(t.changTime(e.date)))]),t._v(" "),a("i",{staticClass:"username"},[t._v(t._s(e.username))])]),t._v(" "),a("p",{staticClass:"comment-content"},[t._v("\n                                "+t._s(e.content)+"\n                            ")])])})):a("div",{staticClass:"no-comments"},[t._v("\n                        暂无评论\n                    ")])]),t._v(" "),a("div",{staticClass:"related-articles"},[a("h4",[t._v("相关文章")]),t._v(" "),t.likeArticles.length?a("ul",t._l(t.likeArticles,function(e){return a("li",{key:e._id},[a("a",{attrs:{href:"javascript:;"},on:{click:function(a){t.$router.push("/home/article-detail?id="+e._id)}}},[t._v(t._s(e.title))])])})):a("div",{staticClass:"no-like-data"},[t._v("\n                        暂无其他相似文章\n                    ")])])])]),t._v(" "),a("right-show")],1)],1)},staticRenderFns:[]};var v=a("VU/8")(o,u,!1,function(t){a("YLqC")},"data-v-4776a1af",null);e.default=v.exports},"1AY1":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"BackToTop",props:{visibilityHeight:{type:Number,default:400},backPosition:{type:Number,default:0},customStyle:{type:Object,default:function(){return{right:"50px",bottom:"50px",width:"40px",height:"40px","border-radius":"4px","line-height":"45px",background:"#e7eaf1"}}},transitionName:{type:String,default:"fade"}},data:function(){return{visible:!1,interval:null}},mounted:function(){window.addEventListener("scroll",this.handleScroll)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleScroll),this.interval&&clearInterval(this.interval)},methods:{handleScroll:function(){this.visible=window.pageYOffset>this.visibilityHeight},backToTop:function(){var t=this,e=window.pageYOffset,a=0;this.interval=setInterval(function(){var i=Math.floor(t.easeInOutQuad(10*a,e,-e,500));i<=t.backPosition?(window.scrollTo(0,t.backPosition),clearInterval(t.interval)):window.scrollTo(0,i),a++},16.7)},easeInOutQuad:function(t,e,a,i){return(t/=i/2)<1?a/2*t*t+e:-a/2*(--t*(t-2)-1)+e}}},r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("transition",{attrs:{name:this.transitionName}},[e("div",{directives:[{name:"show",rawName:"v-show",value:this.visible,expression:"visible"}],staticClass:"back-to-ceiling",style:this.customStyle,on:{click:this.backToTop}},[e("svg",{staticClass:"Icon Icon--backToTopArrow",staticStyle:{height:"16px",width:"16px"},attrs:{width:"16",height:"16",viewBox:"0 0 17 17",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"}},[e("title",[this._v("回到顶部")]),this._v(" "),e("g",[e("path",{attrs:{d:"M12.036 15.59c0 .55-.453.995-.997.995H5.032c-.55 0-.997-.445-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29c.39-.39 1.026-.385 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z","fill-rule":"evenodd"}})])])])])},staticRenderFns:[]};var n=a("VU/8")(i,r,!1,function(t){a("AJeP")},"data-v-4137668c",null);e.default=n.exports},AJeP:function(t,e){},YLqC:function(t,e){}});
//# sourceMappingURL=5.7e970b02ee047448ffda.js.map
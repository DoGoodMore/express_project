webpackJsonp([5],{"1Kb4":function(t,a,e){t.exports=e.p+"static/img/img-test-1.637fc13.jpg"},UlHM:function(t,a,e){t.exports=e.p+"static/img/img-test-2.4bc13c0.jpg"},eTrs:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=e("//Fk"),n=e.n(r),i=e("1Kb4"),s=e.n(i),c=e("UlHM"),o=e.n(c),l=e("oopf"),u=e("9TmC"),g=e("RY13"),h=e("t5DY"),p={components:{rightShow:l.default},data:function(){return{topping:"",imgArr:[s.a,o.a,s.a,o.a],cardDataArr:[],tagsHot:[],hotArticle:[],listQuery:{pageNum:1,pageSize:5}}},methods:{changTime:function(t,a){if(!t)return"暂无数据";var e=new Date(t),r=e.getFullYear(),n=e.getMonth()+1,i=e.getDate(),s=e.getHours(),c=e.getMinutes(),o=e.getSeconds();return a?r+"年"+n+"月"+i+"日":r+"年"+n+"月"+i+"日-"+(s<10?"0"+s:s)+":"+(c<10?"0"+c:c)+":"+(o<10?"0"+o:o)},changeColorToRgb:function(t,a){var e=[],r=[];if(3===(t=t.replace(/#/,"")).length){for(var n=[],i=0;i<3;i++)n.push(t.charAt(i)+t.charAt(i));t=n.join("")}for(var s=0;s<3;s++)e[s]="0x"+t.substr(2*s,2),r.push(parseInt(Number(e[s])));return"rgba("+r.join(",")+", "+(a||1)+")"},getArticleListRecent:function(){var t=this;return new n.a(function(a,e){Object(u.e)(t.listQuery).then(function(t){var r=t.status,n=t.data;0===r?a(n):e(new Error("服务器错误"))}).catch(function(t){return e(t)})})},getAllTagsList:function(){return new n.a(function(t,a){Object(g.c)({}).then(function(e){0===e.status?t(e):a(new Error("服务器错误"))}).catch(function(t){return a(t)})})},getFileInfo:function(){var t=this;Object(h.c)({}).then(function(a){var e=a.status,r=a.data;0===e&&(t.topping=r.topping)})}},created:function(){var t=this;this.getFileInfo(),n.a.all([this.getArticleListRecent(),this.getAllTagsList()]).then(function(a){var e=a[0],r=a[1].data;t.$set(t,"cardDataArr",[]),e.length&&r.length&&e.map(function(a,e){t.cardDataArr.push({id:a._id,title:a.title,tags:[],content:a.description,imgUrl:a.poster,author:a.author||"xyzzzzz",readCount:a.views,comments:a.comments.length,releaseTime:t.changTime(a.create)}),a.tags&&a.tags.length&&a.tags.map(function(a){r.find(function(r){if(a===r.value)return t.cardDataArr[e].tags.push(r),!0})})})}).catch(function(t){return console.log(t)})}},v={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"width container"},[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:18}},[e("el-carousel",{attrs:{height:"300px",interval:5e3,arrow:"never"}},t._l(t.imgArr,function(t,a){return e("el-carousel-item",{key:a},[e("img",{attrs:{src:t,alt:"img"}})])})),t._v(" "),e("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"10px"},attrs:{shadow:"never"}},[t._v("\n                博主置顶\n                "),e("p",{staticClass:"topping-box"},[t._v(t._s(t.topping))])]),t._v(" "),e("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"10px"},attrs:{shadow:"never"}},[e("div",{staticClass:"clear-fix",attrs:{slot:"header"},slot:"header"},[e("span",[t._v("最新发布")])]),t._v(" "),t._l(t.cardDataArr,function(a,r){return e("el-card",{key:r,staticClass:"box-card",staticStyle:{"margin-top":"20px"},attrs:{shadow:"hover"}},[e("div",{staticClass:"clear-fix",staticStyle:{position:"relative"},on:{click:function(e){t.$router.push("/home/article-detail?id="+a.id)}}},[e("div",{staticClass:"card-left"},[e("div",{staticClass:"card-title"},[t._v(t._s(a.title))]),t._v(" "),t._l(a.tags,function(a){return e("a",{key:a.value,staticStyle:{display:"inline-block","margin-right":"8px"},attrs:{href:"javascript:;"}},[e("span",{staticClass:"tag",style:{background:t.changeColorToRgb(a.background,.2),color:a.color,borderColor:t.changeColorToRgb(a.color,.1)}},[t._v(t._s(a.label))])])}),t._v(" "),e("p",{staticStyle:{"margin-top":"10px","line-height":"20px"}},[t._v(t._s(a.content))]),t._v(" "),e("div",{staticClass:"card-data-info",style:a.imgUrl?{position:"absolute",bottom:"0",left:"0"}:{marginTop:"20px"}},[e("a",{attrs:{href:"javascript:;"}},[e("i",{staticClass:"icon-author"}),t._v("\n                                    "+t._s(a.author)+"\n                                ")]),t._v(" "),e("a",{attrs:{href:"javascript:;"}},[e("i",{staticClass:"icon-views"}),t._v("\n                                    "+t._s(a.readCount)+"\n                                ")]),t._v(" "),e("a",{attrs:{href:"javascript:;"}},[e("i",{staticClass:"icon-coments"}),t._v("\n                                    "+t._s(a.comments)+"\n                                ")]),t._v(" "),e("a",{attrs:{href:"javascript:;"}},[e("i",{staticClass:"icon-date"}),t._v("\n                                    "+t._s(a.releaseTime)+"\n                                ")])])],2),t._v(" "),e("div",{staticClass:"card-right"},[a.imgUrl?e("img",{attrs:{src:a.imgUrl,alt:"img"}}):t._e()])])])})],2)],1),t._v(" "),e("right-show")],1)],1)},staticRenderFns:[]};var d=e("VU/8")(p,v,!1,function(t){e("phF6")},"data-v-4b21c4a8",null);a.default=d.exports},phF6:function(t,a){}});
//# sourceMappingURL=5.9dbfce1e67416a1c9d9d.js.map
"use strict";(self["webpackChunkvue_w6_cli"]=self["webpackChunkvue_w6_cli"]||[]).push([[455],{3455:function(t,s,i){i.r(s),i.d(s,{default:function(){return b}});var a=i(6252),o=i(3577),c=i(9963);const d={class:"container"},e=(0,a._)("h2",{class:"text-center mt-3"},"商品列表",-1),n={class:"row row-cols-1 row-cols-lg-4 g-3"},r={class:"card h-100"},l=["src"],u={class:"card-body"},h={class:"card-text"},p=["onClick","disabled"],g=(0,a.Uk)("加入購物車 "),v={class:"spinner-border spinner-border-sm"};function m(t,s,i,m,w,_){const k=(0,a.up)("LoadingOverlay"),b=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)("div",d,[e,(0,a.Wm)(k,{active:w.isLoading},null,8,["active"]),(0,a._)("div",n,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(w.productsData,(t=>((0,a.wg)(),(0,a.iD)("div",{class:"col",key:t.id},[(0,a._)("div",r,[(0,a._)("img",{src:t.imageUrl,class:"card-img-top",alt:"..."},null,8,l),(0,a._)("div",u,[(0,a.Wm)(b,{class:"h5 card-title link-dark",to:`/product/${t.id}`},{default:(0,a.w5)((()=>[(0,a.Uk)((0,o.zw)(t.title),1)])),_:2},1032,["to"]),(0,a._)("p",h,(0,o.zw)(t.description),1),(0,a._)("button",{class:"btn btn-primary",onClick:s=>_.addCart(t.id),disabled:w.isLoadingItem===t.id},[g,(0,a.wy)((0,a._)("span",v,null,512),[[c.F8,w.isLoadingItem===t.id]])],8,p)])])])))),128))])])}var w={data(){return{productsData:[],isLoadingItem:"",isLoading:!1}},methods:{getProducts(){this.isLoading=!0,this.$http.get("https://vue3-course-api.hexschool.io/v2/api/chingno2004/products/all").then((t=>{this.productsData=t.data.products,this.isLoading=!1})).catch((t=>{console.log(t)}))},addCart(t,s=1){this.isLoadingItem=t,this.$http.post("https://vue3-course-api.hexschool.io/v2/api/chingno2004/cart",{data:{product_id:t,qty:s}}).then((t=>{console.log(t),alert(t.data.message),this.isLoadingItem=""})).catch((t=>{console.log(t)}))}},mounted(){this.getProducts()}},_=i(3744);const k=(0,_.Z)(w,[["render",m]]);var b=k}}]);
//# sourceMappingURL=455.35cd6a92.js.map
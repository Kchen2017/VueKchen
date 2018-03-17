//引入Vue组件
import Vue from "vue";
//引入自定组件
import App from "./app.vue";
import Home from "./components/home/home.vue";
import Vip from "./components/vip/vip.vue";
import ShoppingCart from "./components/shoppingCart/shoppingCart.vue";
import Search from "./components/search/search.vue";
import NewsList from "./components/news/newsList.vue";
import NewsDetail from "./components/news/newsDetail.vue";
import PicShare from "./components/pic/picShare.vue";
import PicDetail from "./components/pic/picDetail.vue";
import GoodList from "./components/goods/goodList.vue";
import GoodsDetail from "./components/goods/goodsDetail.vue";
import ProComment from "./components/goods/proComment.vue";

//引入mint-ui
import MintUi from "mint-ui";
Vue.use(MintUi);
import "mint-ui/lib/style.css";

//引入mui的样式
import "./static/vendor/mui/dist/css/mui.css";

//引入vue-preview插件  图片预览
import VuePreview from "vue-preview";
Vue.use(VuePreview);

//引入Qs插件
import Qs from "qs";
Vue.prototype.$qs = Qs;

//配置axios
import Axios from "axios";
Vue.prototype.$ajax = Axios;

//配置路由router
import VueRouter from "vue-router";
Vue.use(VueRouter);
let router = new VueRouter({
	linkActiveClass: "mui-active",
	routes: [
		{name: "default", path: "/", redirect: "home"},
		{name: "home", path: "/home", component: Home},
		{name: "vip", path: "/vip", component: Vip},
		{name: "shoppingCart", path: "/shoppingCart", component: ShoppingCart},
		{name: "search", path: "/search", component: Search},
		{name: "newsList", path: "/newsList", component: NewsList},
		{name: "newsDetail", path: "/newsDetail/:newsId", component: NewsDetail},
		{name: "picShare", path: "/picShare", component: PicShare},
		{name: "picDetail", path: "/picDetail", component: PicDetail},
		{name: "goodList", path: "/goodList", component: GoodList},
		{name: "goodsDetail", path: "/goodsDetail/:goodsId", component: GoodsDetail},
		{name: "proComment", path: "/proComment/:goodsId", component: ProComment},
	]
});

//y配置Vuex
import Vuex from "vuex";
Vue.use(Vuex);
let setOption = {
	state: {
		num: 0
	},
	getters: {
		getNum(state){
			return state.num;
		}
	},
	mutations: {
		add(state, data){
			state.num = data;
		},
		addL(state, data){
			state.num += data;
		},
		dis(state, data){
			state.num -= data;
		}
	},
	actions: {
		addNum({commit}, user){
			commit("add", user);
		},
		addPNum({commit}, user){
			commit("addL", user)
		},
		disNum({commit}, user){
			commit("dis", user)
		}
	}
}

let store = new Vuex.Store({
    modules: {
        //模块名:模块配置
        setOption,
    }
});

//引入自定义全局样式
import "./static/css/global.css";

//引入请求地址的配置文件
import HttpConfig from "./httpConfig.js";
Vue.prototype.$httpConfig = HttpConfig;

//设置全局组件
//轮播图组件
import MySwipe from "./components/common/mySwipe.vue";
Vue.component("my-swipe", MySwipe);

//返回导航栏
import NavBar from "./components/common/navBar.vue";
Vue.component("nav-bar", NavBar);

//评价栏组件
import Comment from "./components/common/comment.vue";
Vue.component("comment", Comment);

//注册时间格式过滤器momentjs插件
import Moment from "moment";
Vue.filter("timeTransform", (value) => {
	return Moment(value).format("YYYY-MM-DD hh:mm:ss");
});


//使用axios拦截器设定loading图案
Axios.interceptors.request.use(function (config) {
    MintUi.Indicator.open({ spinnerType: 'fading-circle' });
    return config;
}, function (error) {

	return Promise.reject(error);
});

Axios.interceptors.response.use(function (response) {
	MintUi.Indicator.close()
	return response;
}, function (error) {

	return Promise.reject(error);
});


new Vue({
	store,
	router,
	el: "#app",
	render: (c) => c(App)
})


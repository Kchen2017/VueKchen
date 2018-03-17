<template>
	<div>
		<!-- 顶端固定 -->
		<mt-header  fixed title="开启幸福之旅"></mt-header>
		<router-view></router-view>
		<!-- 底部导航栏 -->
		<nav class="mui-bar mui-bar-tab" ref="nav">
			<router-link class="mui-tab-item"  :to="{name: 'home'}">
				<span class="mui-icon icon-icon-test"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item"  :to="{name: 'vip'}">
				<span class="mui-icon icon-viphuiyuanhuangguan"></span>
				<span class="mui-tab-label">VIP</span>
			</router-link>
			<router-link class="mui-tab-item"  :to="{name: 'shoppingCart'}">
				<span class="mui-icon icon-weibiao45124"><span class="mui-badge" >{{numchange}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item"  :to="{name: 'search'}">
				<span class="mui-icon icon-caidan03"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
import VueBus from "./components/common/vueBus.js";
import Tools from "./components/common/productsTool.js";
export default {
	data(){
		return {
			proNum: 0
		}
	},
	mounted(){
		console.log(this.$refs.nav.getBoundingClientRect().height);
		VueBus.$on("getNavHeight", fn => {
			fn(this.$refs.nav.getBoundingClientRect().height);
		});

		VueBus.$on("addPro", num => {
			setTimeout(() => {
				this.$store.dispatch("addPNum", num);
			}, 1000);
				
			
		})
	},
	computed: {
		numchange(){
			
			return this.$store.getters.getNum;
		}
	},
	created(){
		console.log(Tools.totleNum());
		this.$store.dispatch("addNum", Tools.totleNum());
	}
}
</script>
<style>

</style>

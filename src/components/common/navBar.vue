<template>
<div>
	<header id="header" class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="back"></a>
        <h1 class="mui-title">{{newsTitle}}</h1>
    </header>
</div>
	
</mt-header>
</template>

<script>
export default {
	data(){
		return {

		}
	},
	methods: {
		back(){
			this.$router.go(-1);
		}
	},
	props: ["newsTitle"]
}
</script>

<style>

</style>
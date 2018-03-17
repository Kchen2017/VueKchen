<template>
	<div class="tmpl">
	<nav-bar newsTitle="商品评价"></nav-bar>
		<comment :artId="$route.params.goodsId"></comment>
	</div>
</template>

<script>
export default {
	data(){
		return {
			proId: ''
		}
	},
	created(){
		
	}
}
</script>

<style>

</style>
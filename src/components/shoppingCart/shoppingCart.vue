<template>
    <div class="tmpl">
    	<nav-bar newsTitle="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for="(item, index) in products" :key="item.id">
                    <mt-switch v-model="item.isSeleted"></mt-switch>
                    <img :src="item.images.small">
                    <div class="pay-calc">
                        <p>{{item.title}}</p>
                        <div class="calc">
                            <span>￥{{item.collect_count}}</span>
                            <span @click="distract(index)">-</span>
                            <span>{{item.num}}</span>
                            <span @click="add(index)">+</span>
                            <a href="javascript:;" @click="del(item.id)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{achange.count}}件，总价￥{{achange.totleMon}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
	import Tools from "../common/productsTool.js";
	export default {
		data(){
			return {
				products: [],
				idsfake: [],
				num: 0,
			}
		},
		created(){
			let products = Tools.getDate();
			let ids = "";
			for(let key in products){
				ids += key;
			}
			this.idsfake = ids.split("");
			ids = ids.split("").join(",");
		
			// this.$ajax.get(this.$httpConfig.getshopcarlist + ids)
			// .then(res => {

			// })
			// .catch(err => {
			this.$ajax.get(this.$httpConfig.douban)
			.then(res => {
				let arr = [];
				
				for (var i = 0; i < this.idsfake.length; i++) {
					res.data.subjects[this.idsfake[i]].num = products[this.idsfake[i]];
					res.data.subjects[this.idsfake[i]].id = this.idsfake[i];
					res.data.subjects[this.idsfake[i]].isSeleted = true;
					arr.push(res.data.subjects[this.idsfake[i]]);
				}

				this.products = arr;
				console.log(arr);
			})
			.catch(err => {
				console.log("失败！！！", err);
			})
			
		},
		methods: {
			add(id){
				let _this = this;
				this.products[id].num++;
				this.$store.dispatch("addPNum", 1);
				let kk = this.products[id].num - Tools.getDate()[this.products[id].id];
				console.log(kk,Tools.getDate()[this.products[id].id]);
				let obj = {
					id: _this.products[id].id,
					num: kk
				}
				Tools.addOrUpdata(obj);
		    },
		    distract(id){
		    	let _this = this;
		        this.products[id].num--;
		        this.$store.dispatch("disNum", 1);
		        let kk =  this.products[id].num - Tools.getDate()[this.products[id].id];
		        console.log(kk);
				let obj = {
					id: _this.products[id].id,
					num: kk
				}
				Tools.addOrUpdata(obj);
		    },
		    del(id){
		    	let ii = 0;
		    	Tools.delData(id);
		    	for (var i = 0; i < this.products.length; i++) {
		    		if(this.products[i].id == id){
		    			ii = this.products[i].num;
		    			console.log(ii);
		    			this.$store.dispatch("disNum", ii);
		    			this.products.splice(i--,1);

		    		}
		    	}
		    	
		    }
		},
		computed: {
			achange: function(){
				let totle = 0;
				for (var i = 0; i < this.products.length; i++) {
					if(this.products[i].isSeleted){
						totle += this.products[i].collect_count * this.products[i].num;
					}
				}
				return {
					totleMon: totle,
					count: this.products.length
				}
			}
		},
		beforeRouteLeave(to, from, next){
			if(confirm("确定离开么？")){
				next()
			}else{
				next(false);
			}
		}
	}
</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 40px;
    height: 40px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc {
	margin-left: 35px;
	margin-top: 5px;
}
.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>

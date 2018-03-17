<template>
    <div class="tmpl">
        <nav-bar newsTitle="商品详情"></nav-bar>
        <my-swipe :swipes="imgs"></my-swipe>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                    {{content.title}}
                </span></li>
                <li class="price-li">市场价：
                    <s>￥{{content.collect_count}}</s> 销售价：<span>￥{{content.collect_count}}</span></li>
                <li class="number-li">购买数量：<span @click="distract">-</span><span>{{num}}</span><span @click="add">+</span></li>
                <li>
                    <mt-button type="primary" >立即购买</mt-button>
                    <mt-button type="danger" @click="addGoods">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <transition name="ball" @after-enter="show=false">
            <div class="ball" v-show="show"></div>
        </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：{{content.id}}</li>
                <li>库存情况：{{content.collect_count}}件</li>
                <li>上架时间：{{content.year | timeTransform}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain @click="proDes(goodId)">图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain @click="proComment(goodId)">商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import VueBus from "../common/vueBus.js";
import Tools from "../common/productsTool.js";
export default {
    data(){
        return {
            content: {},
            imgs: [],
            num: 0,
            show: false,
            goodId: this.$route.params.goodsId
        }
    },
    created(){
        this.$ajax.get(this.$httpConfig.douban)
        .then(res => {
            this.imgs = res.data.subjects.slice(0,4);
            this.content = res.data.subjects[this.$route.params.goodsId]
        })
        .catch(err => {
            console.log("失败！！", err);
        })
    },
    methods: {
        add(){
           this.num++; 
        },
        distract(){
            if(this.num>0){
                this.num--;
            }  
        },
        addGoods(){
            this.show = true;
            VueBus.$emit("addPro", this.num);
            Tools.addOrUpdata({
                id: this.$route.params.goodsId,
                num: this.num
            })
        },
        proDes(id){
            this.$router.push({
                name: "newsDetail",
                params: {
                    newsId: id,
                    barTitle: "商品详情"
                }
            })
        },
        proComment(id){
            this.$router.push({
                name: "proComment",
                params: {
                    proId: id
                }
            })
        }
    }
}
</script>
<style scoped>
.ball-enter-active {
    animation: bounce-in 1s;
}

@keyframes bounce-in {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(140px, -50px, 0);
    }
    75% {
        transform: translate3d(160px, 0px, 0);
    }
    100% {
        transform: translate3d(70px, 300px, 0);
    }
}

.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}


/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
}

.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}


/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}


/*商品参数*/

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 400px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}

</style>

<template>
    <div class="tmpl">
        <nav-bar newsTitle="商品列表"></nav-bar>
        <ul class="mui-table-view mui-grid-view">
            <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="(item, index) in content" :key="index">
                <router-link :to='{name: "goodsDetail", params: {goodsId: index}}'>
                    <img class="mui-media-object"  v-lazy="item.images.large">
                    <div class="mui-media-body">{{item.title}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{item.collect_count}}</span>
                            <s>￥{{item.collect_count}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                热卖中
                            </div>
                            <div class="count">
                                剩{{item.collect_count}}件
                            </div>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            content: []
        }
    },
    created(){
        this.$ajax.get(this.$httpConfig.douban)
        .then(res => {
            console.log(res.data.subjects);
            this.content = res.data.subjects;
        })
        .catch(err => {
            console.log("失败！！", err);
        })
    }
}
</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
}
</style>

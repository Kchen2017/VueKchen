<template>

    <div class="tmpl" :style="{height: tmplHeight + 'px'}" ref="tmpl">
        <nav-bar newsTitle="新闻列表"></nav-bar>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"  :bottom-all-loaded="bottomAllLoaded" :auto-fill="isAutoFill" @bottom-status-change="handleBottomChange" ref="loadmore">
            <ul class="mui-table-view" >
                <li class="mui-table-view-cell mui-media" v-for="(list, index) in lists" :key="index">
                    <router-link :to="{name: 'newsDetail', params: {newsId: index, barTitle: '新闻详情'}}">
                        <img class="mui-media-object mui-pull-left"  v-lazy="list.images.small">
                        <div class="mui-media-body">
                            <span v-text="list.title"></span>
                            <div class="news-desc">

                                <p>点击数:{{list.rating.max}}</p>
                                <p>发表时间:{{list.year | timeTransform}}</p>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
           
        </mt-loadmore>
    </div>
</template>
<script>
import VueBus from "../common/vueBus.js";
export default {
    data(){
        return {
            lists: [],
            tmplHeight: 0,
            bottomAllLoaded: false,
            isAutoFill: false,
            indexNum: 16,

        }
    },
    created(){
        this.$ajax.get(this.$httpConfig.douban)
        .then(res => {
        	// console.log(res);
            this.lists = res.data.subjects.slice(0,16);
        })
        .catch(err => {
            console.log("获取数据失败！！",err);
        })
    },
    methods: {
        loadTop(){
            this.$ajax.get(this.$httpConfig.douban)
            .then(res => {
                let arr = [];
                arr = res.data.subjects.slice(this.indexNum, this.indexNum+2);
                console.log(arr);
                this.indexNum++;
                this.indexNum++;
                if(arr.length > 0){
                    this.lists = arr.concat(this.lists);
                }
                console.log(this.lists);
                this.$refs.loadmore.onTopLoaded();
            })
            .catch(err => {
                console.log("获取数据失败！！",err);
            })
        },
        loadBottom(){
            console.log(2);
            let indexPages = 0;
            this.$ajax.get(this.$httpConfig.douban)
            .then(res => {
                let arr = [];
                arr = res.data.subjects.slice(this.indexNum, this.indexNum+2);
                console.log(arr);
                this.indexNum++;
                this.indexNum++;
                if(arr.length > 0){
                    this.lists = this.lists.concat(arr);
                    this.$refs.loadmore.onBottomLoaded();
                }else{
                    this.bottomAllLoaded = true;
                }

                this.$refs.loadmore.onBottomLoaded();
            })
            .catch(err => {
                
                console.log("获取数据失败！！",err);
            })
        },
        handleBottomChange(s){
            
            console.log(s);
            
        }
    },
    mounted(){
        VueBus.$emit("getNavHeight", h => {
            console.log(this, "list");
            this.tmplHeight = document.documentElement.clientHeight - h - this.$refs.tmpl.getBoundingClientRect().top;
        }); 
    }
}
</script>
<style scoped>
img[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
}
.tmpl {
    overflow: scroll;
}

.mui-media-body p {
    color: #0bb0f5;
}

.news-desc p:nth-child(1) {
    float: left;
}

.news-desc p:nth-child(2) {
    float: right;
}
::-webkit-scrollbar{
  display:none;
}
</style>

<template>
    <div class="tmpl">
    <nav-bar newsTitle="图文详情"></nav-bar>
        <div class="photo-title">
            <p>{{content.title}}</p>
            <span>发起日期：{{content.year|timeTransform}}</span>
            <span>{{content.count}}次浏览</span>
            <span>分类：{{content.genres}}</span>
        </div>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item, index) in imgdd" :key="index"  >
                <img :src="item.src" alt="" @click="$preview.open(index, imgdd)" class="preview-img" height="100">
            </li>
            
        </ul>
        <div class="photo-desc">
            <p v-html="content.desc"></p>
        </div>
        <comment :artId="picID"></comment>
    </div>
</template>
<script>
export default {
    data(){
        return {
            content: {},
            imgdd: [],
            picID: this.$route.query.picId
        }
    },
    created(){
        console.log(this.$route.query.picId);
        this.$ajax.get(this.$httpConfig.douban)
        .then(res => {
            this.content = res.data.subjects[this.$route.query.picId];
            this.content.desc = "索马里海域外，中国商船遭遇劫持，船员全数沦为阶下囚."
            return this.$ajax.get(this.$httpConfig.douban)
        })
        .then(res => {
            let arr = [];
            res.data.subjects.forEach(function(ele, index){
                let item = {};
                item.w = 300;
                item.h = 300;
                if(index < 4){
                    item.src = ele.images.small
                    arr.push(item);
                }
            });
            this.imgdd = arr;

        })
        .catch(err => {
            console.log("失败", err);
        })
    },
    methods: {

    }
}
</script>
<style scoped>
li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
}

.mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
}

.mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
}

.photo-desc p {
    font-size: 18px;
}

.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    padding: 2 2;
}
</style>

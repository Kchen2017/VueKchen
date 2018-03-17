<template>
    <div class="tmpl">
    <nav-bar :newsTitle="newsTitle"></nav-bar>
        <div class="news-title">
            <p>{{content.title}}</p>
            <div>
                <span>{{content.collect_count}}次点击</span>
                <span>分类:{{content.subtype}}</span>
                <span>添加时间:{{content.year|timeTransform}}</span>
            </div>
        </div>
        <div class="news-content" v-html="content.dec"></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            content: {},
            newsTitle: this.$route.params.barTitle
        }
    },
    created(){
        console.log(this.$route.params.newsId);
        this.$ajax.get(this.$httpConfig.douban)
        .then(res => {
            this.content = res.data.subjects[this.$route.params.newsId];
            this.content.dec = "<p>索马里海域外，中国商船遭遇劫持，船员全数沦为阶下囚。<img src='https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2514175916.webp'></p>";
        })
        .catch(err => {
            console.log("获取失败!!", err);
        })
    }
}
</script>
<style scoped>
.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
}

.news-title span {
    margin-right: 30px;
}

.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}


/*主体文章的左右距离*/

.news-content {
    padding: 10 5;
}
</style>

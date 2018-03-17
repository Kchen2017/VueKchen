<template>
    <div >
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a @click="goback">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="commentText"></textarea>
                </li>
                <li>
                    <mt-button size="large" type="primary" @click="post">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>{{num}}条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(item, index) in contentCom" :key="index">
                    {{item.title}}：{{item.genres}} {{item.year|timeTransform}}
                </li>
                
            </ul>
            <mt-button size="large" type="primary" @click="add">加载更多按钮</mt-button>
            
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            contentCom: [],
            num: 0,
            indexNum: 10,
            commentText: ""
        }
    },
    created(){
        this.getMessage();
        // console.log(this.$qs.stringify({a: 1, b: 2}));
    },
    props: ["artId"],
    methods: {
        getMessage(){
            this.$ajax.get(this.$httpConfig.douban)
            .then(res => {
                this.contentCom = res.data.subjects.slice(0,this.indexNum);
                this.num = this.contentCom.length;
            })
            .catch(err => {
                console.log("失败!!!", err);

            })
            this.indexNum += 2;
        },
        add(){
            console.log(this.$qs.stringify({a: 1, b: 2}));
            this.getMessage();
        },
        post(){
            this.$ajax.post(this.$httpConfig.postComment + this.artId, {
                content: this.commentText
            },{
                transformRequest: function (data) {
                    return this.$qs.stringify(data);
                }
            })
            .then(res => {

            })
            .catch(err => {
                this.$ajax.get(this.$httpConfig.douban)
                .then(res => {
                    this.contentCom = res.data.subjects.slice(0,this.indexNum);
                    this.contentCom.unshift({
                        title: "我是人",
                        genres: this.commentText,
                        year: "2018"
                    })
                    this.num = this.contentCom.length;
                    this.commentText = "";
                })
                .catch(err => {
                    console.log("失败!!!", err);

                });


                console.log("失败!!!", err);
            })
        },
        goback(){
            if(this.commentText){
                if(confirm("您还没提交评论，确定离开？")){
                    this.$router.go(-1)
                }
                return;  
            }
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}
</style>

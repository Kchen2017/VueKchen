<template>
    <div class="tmpl">
    <nav-bar newsTitle="图文分享"></nav-bar>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="(item, index) in categerys" :key="index">
                    <a href="javascript:;" @click="catery(index)">{{item.genres[1]}}</a>
                </li>
                
            </ul>
        </div>
        <div class="photo-list"> 
            <ul>
                <li v-for="(item, index) in pics" :key="index">
                    <router-link :to="{name: 'picDetail', query: {'picId': index}}">
                        <img v-lazy="item.images.large">
                        <p>
                            <span>{{item.title}}</span>
                            <br>
                            <span>{{item.genres[0]}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            pics: [],
            categerys: []
        }
    },
    created(){

        this.$ajax.all([this.$ajax.get(this.$httpConfig.douban), this.$ajax.get(this.$httpConfig.douban)])
        .then(this.$ajax.spread((picRes, categeryRes) => {

            this.pics = picRes.data.subjects.slice(0,10);
            this.categerys = categeryRes.data.subjects.slice(0,10);
            console.log(this.pics, this.categerys);
        }))
        .catch(err => {
            console.log("失败！！！", err);
        })
    },
    methods: {
        catery(id){
            this.$ajax.get(this.$httpConfig.douban)
            .then(res => {
                this.pics = res.data.subjects.slice(id,10);
            })
            .catch(err => {
                console.log("失败！！！", err);
            })
        }
    }
}
</script>
<style>
img[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
}
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}



</style>

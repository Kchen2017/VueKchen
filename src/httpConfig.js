const remoteHost = "http://182.254.146.100:8899";

const config = {
	douban: "/v2/movie/in_theaters",
	lunbo: remoteHost + "/api/getlunbo",   //轮播图get请求
	newsList: remoteHost + "/api/getnewslist", //新闻列表
	postComment: remoteHost + "/api/postcomment/:", //拼接Id
	getshopcarlist: remoteHost + "/api/goods/getshopcarlist/"
};

export default config;
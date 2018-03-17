let locals = window.localStorage;

let tool = {
	getDate: function(){
		return JSON.parse(locals.getItem("products") || "{}");
	},
	addOrUpdata: function(item){
		let items = this.getDate();
		if(items[item.id]){
			items[item.id] += item.num;
		}else{
			items[item.id] = item.num;
		}
		this.saveData(items);
	},
	saveData(item){
		locals.setItem("products", JSON.stringify(item));
	},
	delData(index){
		let items = this.getDate();
		delete items[index];
		this.saveData(items);
	},
	totleNum(){
		let items = this.getDate();
		let num = 0;
		for(let key in items){
			num += items[key];
		}
		return num;
	}
}

export default tool;
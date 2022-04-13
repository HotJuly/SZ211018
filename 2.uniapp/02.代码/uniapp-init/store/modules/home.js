
const state ={
	initData:"我是Vuex的初始化数据",
	indexData:{}
}

const mutations={
	SETINDEXDATAMUTATION(state,data){
		state.indexData = data;
	}
}

const actions={
	async getIndexData({commit}){
		// action函数的this是store对象
		// store对象身上具有_vm属性,该属性存储的就是main.js中new Vue得到的vue实例对象
		// console.log('getIndexData',this)
		const result = await this._vm.$myAxios('/getIndexData');
		console.log('result',result)
		
		commit('SETINDEXDATAMUTATION',result);
	}
}

const getters={
	
}

export default{
	namespaced:true,
	state,
	mutations,
	actions,
	getters
}
const state = {
	cartList: [{
			"selected": true,
			"count": 3,
			"promId": 0,
			"showPoints": false,
			"itemTagList": [{
				"itemId": 1535004,
				"tagId": 128111157,
				"freshmanExclusive": false,
				"name": "暖冬特惠",
				"subType": 204,
				"forbidJump": false,
				"type": 2
			}],
			"rank": 1,
			"id": 1535004,
			"sellVolume": 4001,
			"primaryPicUrl": "https://yanxuan-item.nosdn.127.net/f79906f1b1fe86420ea40473de66ec0e.png",
			"soldOut": false,
			"sortFlag": 0,
			"commentCount": 0,
			"onSaleTime": 1538101761748,
			"picMode": 1,
			"commentWithPicCount": 0,
			"underShelf": false,
			"status": 2,
			"couponConflict": true,
			"forbiddenBuy": false,
			"promotionDesc": "暖冬特惠",
			"limitedFlag": 204,
			"pieceNum": 0,
			"itemSizeTableDetailFlag": false,
			"forbidExclusiveCal": false,
			"rewardShareFlag": false,
			"updateTime": 1575893634989,
			"showCommentEntrance": true,
			"pieceUnitDesc": "件",
			"specialPromTag": "",
			"counterPrice": 299,
			"categoryL2Id": 0,
			"retailPrice": 209,
			"primarySkuPreSellPrice": 0,
			"preLimitFlag": 0,
			"itemPromValid": true,
			"promTag": "暖冬特惠",
			"source": 0,
			"points": 0,
			"primarySkuPreSellStatus": 0,
			"extraServiceFlag": 0,
			"flashPageLink": "",
			"autoOnsaleTimeLeft": 0,
			"innerData": {},
			"saleCenterSkuId": 0,
			"pointsStatus": 0,
			"extraPrice": "",
			"colorNum": 0,
			"showTime": 0,
			"autoOnsaleTime": 0,
			"preemptionStatus": 1,
			"isPreemption": 0,
			"zcSearchFlag": false,
			"name": "男式色拉姆内衣套装2.0",
			"appExclusiveFlag": false,
			"itemType": 1,
			"listPicUrl": "https://yanxuan-item.nosdn.127.net/c2eeb1b872af1b8efc179a7515aacdaa.png",
			"pointsPrice": 0,
			"simpleDesc": "色拉姆发热面料，加厚升级",
			"seoTitle": "",
			"newItemFlag": false,
			"buttonType": 0,
			"primarySkuId": 1636062,
			"displaySkuId": 1636056,
			"productPlace": "",
			"itemSizeTableFlag": false
		},
		{
			"selected": false,
			"count": 8,
			"promId": 0,
			"showPoints": false,
			"itemTagList": [{
				"itemId": 1536001,
				"tagId": 128111157,
				"freshmanExclusive": false,
				"name": "暖冬特惠",
				"subType": 204,
				"forbidJump": false,
				"type": 2
			}],
			"rank": 1,
			"id": 1536001,
			"sellVolume": 3634,
			"primaryPicUrl": "https://yanxuan-item.nosdn.127.net/32b8b2d07b1c4327593a4a70993eeac2.png",
			"soldOut": false,
			"sortFlag": 0,
			"commentCount": 0,
			"onSaleTime": 1538101896296,
			"picMode": 1,
			"commentWithPicCount": 0,
			"underShelf": false,
			"status": 2,
			"couponConflict": true,
			"forbiddenBuy": false,
			"promotionDesc": "暖冬特惠",
			"limitedFlag": 204,
			"pieceNum": 0,
			"itemSizeTableDetailFlag": false,
			"forbidExclusiveCal": false,
			"rewardShareFlag": false,
			"updateTime": 1575894115275,
			"showCommentEntrance": true,
			"pieceUnitDesc": "件",
			"specialPromTag": "",
			"counterPrice": 299,
			"categoryL2Id": 0,
			"retailPrice": 209,
			"primarySkuPreSellPrice": 0,
			"preLimitFlag": 0,
			"itemPromValid": true,
			"promTag": "暖冬特惠",
			"source": 0,
			"points": 0,
			"primarySkuPreSellStatus": 0,
			"extraServiceFlag": 0,
			"flashPageLink": "",
			"autoOnsaleTimeLeft": 0,
			"innerData": {},
			"saleCenterSkuId": 0,
			"pointsStatus": 0,
			"extraPrice": "",
			"colorNum": 0,
			"showTime": 0,
			"autoOnsaleTime": 0,
			"preemptionStatus": 1,
			"isPreemption": 0,
			"zcSearchFlag": false,
			"name": "女式色拉姆内衣套装2.0",
			"appExclusiveFlag": false,
			"itemType": 1,
			"listPicUrl": "https://yanxuan-item.nosdn.127.net/02b61fb5700aed6761b7524d98ed0837.png",
			"pointsPrice": 0,
			"simpleDesc": "色拉姆发热面料，加厚升级",
			"seoTitle": "",
			"newItemFlag": false,
			"buttonType": 0,
			"primarySkuId": 1634105,
			"displaySkuId": 1634104,
			"productPlace": "",
			"itemSizeTableFlag": false
		}
	]
}

const mutations = {
	// 用于添加商品到购物车中
	ADDSHOPITEMMUTATION(state, good) {
		// console.log('ADDSHOPITEMMUTATION')
		/*
			需求:当用户点击加入购物车时,
				如果该商品在购物车列表中已经存在,那么就对已存在的商品数量+1
				如果该商品在购物车列表中不存在,那么就将当前商品加入到购物车中
		*/

		// 找到符合条件的元素就会返回对应元素,如果没找到就返回undefined
		const shopItem = state.cartList.find((shopItem) => {
			return shopItem.id === good.id
		})

		if (shopItem) {
			// console.log('+1',shopItem)
			shopItem.count += 1;
		} else {
			// console.log('=1',good)
			// 以下方法添加属性,不是响应式属性
			// 想要后续新增一个响应式属性,需要使用vm.$set或者Vue.set方法
			// good.count = 1;

			// 如何快速辨别一个属性是否是响应式属性
			// 打印该对象,查看对应属性值的书写方式,
			// 如果是(...)说明当前属性是响应式属性,如果是原值(例如=>count:2),说明是非响应式属性
			this._vm.$set(good, 'count', 1)
			state.cartList.push(good);
		}
	},
	CHANGECOUNTMUTATION(state, {
		type,
		index
	}) {
		// console.log('CHANGECOUNTMUTATION')
		const shopItem = state.cartList[index];
		if (type) {
			// 能进入这里说明需要数量+1
			shopItem.count += 1;
		} else {
			// 能进入这里说明需要数量-1
			if (shopItem.count === 1) {
				// 能进入这里就说明当前商品数量为1,再减少就要变为删除该商品
				state.cartList.splice(index, 1);
			} else {
				shopItem.count -= 1;
			}
		}
	},
	CHANGESELECTEDMUTATION(state, index) {
		const shopItem = state.cartList[index];
		shopItem.selected = !shopItem.selected;
	},
	CHANGEALLSELECTEDMUTATION(state,selected){
		state.cartList.forEach((shopItem)=>{
			shopItem.selected = selected;
		})
	}
}

const actions = {}

const getters = {
	isSelectedAll(state) {
		/*
			如果所有的商品都是选中状态,那么当前全选按钮也为选中状态
			如果有一个商品处于未选中状态,那么全选按钮就是未选中状态
			如果购物车中没有商品,那么全选按钮就是未选中状态
			返回值:布尔值
		*/
		if (!state.cartList.length) return false;

		const result = state.cartList.every((shopItem) => {
			return shopItem.selected
		})

		return result;
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}

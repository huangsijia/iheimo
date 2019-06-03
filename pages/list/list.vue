<template>
	<view class="list">
		<view class="time">
			<view class="time_space">
				<view @click="onShowDatePicker('rangetime')">
					<text>
						<template v-if="rangetime[0] == ''">
							全部
						</template>
						<template v-else>
							{{rangetime[0]}}&nbsp;-&nbsp;{{rangetime[1]}}
						</template>
					</text>&nbsp;&nbsp;
					<image src="../../static/img/icon-xiala.png" class="icon" v-if="showPicker"></image>
					<image src="../../static/img/icon-xiala1.png" class="icon" v-else></image>
				</view>
				<text @click="showArr">筛选</text>
			</view>
			<mx-date-picker :show="showPicker" :type="type" :value="value" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
		</view>
		<view class="chart">
			<view class="chart_top">
				<view class="radio" @click="radioFun(0)">
					<image src="../../static/img/icon-radio2.png" class="icon" v-if="isInCome"></image>
					<image src="../../static/img/icon-radio3.png" class="icon" v-else></image>
					支出：&yen;{{comeTotalAmount}}
				</view>
				<view class="radio" @click="radioFun(1)">
					<image src="../../static/img/icon-radio2.png" class="icon" v-if="!isInCome"></image>
					<image src="../../static/img/icon-radio3.png" class="icon" v-else></image>
					收入：&yen;{{outTotalAmount}}
				</view>
			</view>
		</view>
		<view v-if="list.length > 0 ">
			<view class="li" v-for="(item ,index) in list" :key="item" @click="toDetail(item)">
				<view class="liLeft">
					<view class="liLeftBorder">
						<image :src="'../../static/img/'+item.consumptionTypeIcon+'.png'" class="icon"></image>
					</view>
				</view>
				<view class="liRight">
					<view class="liRightTxt">
						<text class="remark">
							<text v-if="item && item.name">{{item.name}}</text>
							<text v-if="item && item.description">、{{item.description}}</text>
							<text v-if="item && item.location">、{{item.location}}</text>
						</text>
						<text class="createDate">{{item.date}}({{item.createBy}})</text>
					</view>
					<text :class="['amount',{'green':!isInCome}]">{{symbol}}{{item && item.amount}}元</text>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="noData">暂无数据</view>
		</view>
		<lvv-popup position="bottom" ref="filterLvvpopref">
			<view class="lvvpopref filterLvvpopref">
				<view class="iptName">
					<text class="title">筛选类型</text>
					<view class="type-ipt">
						<view class="type-ipt-left">
							<image src="../../static/img/icon-sousuo.png" class="icon"></image>
							<input type="text" v-model="name" placeholder="快速搜索流水">
						</view>
						<image src="../../static/img/icon-danchuang-guanbi.png" class="icon" @tap="clearModel('name')" v-if='name'></image>
					</view>
				</view>
				<view class="type">
					<view :class="['type_li',{'on':getAllIndex == index}]" v-for="(item,index) in all"
					 :key="item" @click="getAllFun(item,index)">
						{{item}}
					</view>
				</view>
				<text class="title">筛选分类</text>
				<text class="type_name red">支出</text>
				<view class="type">
					<view :class="['type_li',{'on':getConsumptionTypeIndex == index}]" v-for="(item,index) in getconsumptiontypeArr"
					 :key="item" @click="getConsumptionTypeArrFun(item,index)">
						{{item.name}}
					</view>
				</view>
				<text class="type_name green">收入</text>
				<view class="type">
					<view :class="['type_li',{'on':getComeTypeIndex == index}]" v-for="(item,index) in getInCometypeArr" :key="item"
					 @click="getComeTypeArrFun(item,index)">
						{{item.name}}
					</view>
				</view>
				<view class="button">
					<text class="reset" @click="resetFun">重置</text>
					<text class="complete" @click="completeFun">完成</text>
				</view>
			</view>
		</lvv-popup>
	</view>
</template>

<script>
	import lvvPopup from '../../components/lvv-popup/lvv-popup.vue'
	import MxDatePicker from "../../components/mx-datepicker/mx-datepicker.vue";
	import {mapState,mapMutations} from 'vuex'
	export default {
		computed: {
			...mapState(['out','come'])
		},
		components: {
			MxDatePicker,
			lvvPopup
		},
		data() {
			return {
				all:["最近一周","最近一个月","最近三个月","全部"],
				getAllIndex:-1,
				showPicker: false,
				rangetime: [],
				type: 'date',
				value: '',
				totalAmount: 0,
				comeTotalAmount: 0,
				outTotalAmount: 0,
				isInCome: true, //是否显示的是支出
				list: [],
				symbol: "-",
				pageSize: 15, // 每次最大返回条数
				pageIndex: 0, // 起始条数
				isLoadMore: true, // 加载更多
				getconsumptiontypeArr: [],
				getInCometypeArr: [],
				getConsumptionTypeIndex: -1,
				getComeTypeIndex: -1,
				consumptionTypeCode: "",
				name:''
			};
		},
		onPullDownRefresh() { //监听用户下拉动作，一般用于下拉刷新
			this.pageIndex = 0;
			this.isLoadMore = true;
			this.listFun();
		},
		methods: {
			clearModel(params) {
				this[params] = "";
			},
			showArr() {
				this.getComeTypeIndex = -1;
				this.getConsumptionTypeIndex = -1;
				this.$refs.filterLvvpopref.show();
			},
			getAllFun(item,index){
				let days = 7;
				let sTime ="";
				let eTime =""
				if(index==0){
					days = 7;
				}else if(index==1){
					days = 30;
				}else if(index == 2){
					days = 90;
				}else{
					days = 3064;
				}
				var recent =  new Date(new Date().getTime()-86400000*days);//最近三天
				sTime = recent.getFullYear()+"/"+ (recent.getMonth()+1)+"/"+ recent.getDate()+" 00:00:00";
				eTime = (new Date().getFullYear()) + "/" + (new Date().getMonth() + 1) + "/" + (new Date().getDate()) +" 23:59:59";
				
				this.rangetime =[sTime,eTime];
				this.getAllIndex = index;
			},
			getConsumptionTypeArrFun(item, index) {
				this.getConsumptionTypeIndex = index;
				this.getComeTypeIndex = -1;
				this.consumptionTypeCode = item.code;
				this.isInCome = true;
			},
			getComeTypeArrFun(item, index) {
				this.getComeTypeIndex = index;
				this.getConsumptionTypeIndex = -1;
				this.consumptionTypeCode = item.code;
				this.isInCome = false;
			},
			completeFun() {
				this.pageIndex = 0;
				this.isLoadMore = true;
				this.listFun();
				this.$refs.filterLvvpopref.close();
			},
			resetFun() {
				this.getAllIndex = -1;
				this.getComeTypeIndex = -1;
				this.getConsumptionTypeIndex = -1;
			},
			radioFun(num) {
				this.pageIndex = 0;
				if (num) {
					this.isInCome = false;
					this.symbol = "+";
				} else {
					this.isInCome = true;
					this.symbol = "-";
				}
				this.consumptionTypeCode = "";
				this.pageIndex = 0;
				this.isLoadMore = true;
				this.listFun();
			},
			onShowDatePicker(type) { //显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) { //选择
				//e.value 为选择的值
				//e.date 为原始的date对象
				this.showPicker = false;
				if (e) { // 因为cancel事件也绑定了这个函数，而且canel事件传的参数false
					this[this.type] = e.value;
					console.log(e);
				}
				this.pageIndex = 0;
				this.isLoadMore = true;
				this.listFun();
			},
			//分类列表
			listFun() {
				var dataName = "inComeList"
				if (this.isInCome) {
					dataName = "list"
				}
				var sendData = {
					startDate: this.rangetime[0],
					endDate: this.rangetime[1],
					consumptionTypeCode: this.consumptionTypeCode,
					name: this.name,
					pageSize: this.pageSize,
					pageIndex: this.pageIndex,
				}
				this.$public.API_GET({
					url: dataName,
					data: sendData,
					type: "POST",
					success: res => {
						uni.stopPullDownRefresh();
						if (!res.data.success) {
							uni.showToast({
								icon: 'none',
								title: res.data.message,
								duration: 2000
							});
							return false;
						}
						if (res.data.data.length < this.pageSize) {
							this.isLoadMore = false;
						}
						++this.pageIndex;
						//总额度
						this.totalAmount = this.$filter.formatMoney(res.data.extraData.totalAmount);
						if (this.isInCome) {
							this.comeTotalAmount = this.totalAmount;
						} else {
							this.outTotalAmount = this.totalAmount;
						}

						this.list = res.data.data;
						this.list.forEach(ele => {
							ele.amount = this.$filter.formatMoney(ele.amount)
						});
						this.list.forEach(ele => {
							ele.date = this.$filter.formatDate(ele.date)
						});
					}
				})
			},
			listFunMore() {
				var dataName = "inComeList"
				if (this.isInCome) {
					dataName = "list"
				}
				var sendData = {
					startDate: this.rangetime[0],
					endDate: this.rangetime[1],
					consumptionTypeCode: "",
					name: "",
					pageSize: this.pageSize,
					pageIndex: this.pageIndex,
				}
				this.$public.API_GET({
					url: dataName,
					data: sendData,
					type: "POST",
					success: res => {
						if (!res.data.success) {
							uni.showToast({
								icon: 'none',
								title: res.data.message,
								duration: 2000
							});
							return false;
						}
						if (res.data.data.length < this.pageSize) {
							this.isLoadMore = false;
						}
						++this.pageIndex;
						//总额度
						this.totalAmount = this.$filter.formatMoney(res.data.extraData.totalAmount);
						if (this.isInCome) {
							this.comeTotalAmount = this.totalAmount;
						} else {
							this.outTotalAmount = this.totalAmount;
						}

						this.list = this.list.concat(res.data.data);
						this.list.forEach(ele => {
							ele.amount = this.$filter.formatMoney(ele.amount)
						});
						this.list.forEach(ele => {
							ele.date = this.$filter.formatDate(ele.date)
						});
					}
				})
			},
			toDetail(params){
				uni.redirectTo({
					url: '/pages/detail/detail?params='+JSON.stringify(params)+"&isIncom="+this.isInCome
				});
			}
		},
		onReachBottom() { //页面上拉触底事件的处理函数
			if (this.isLoadMore) {
				this.listFunMore()
			}
		},
		mounted() {
			var n = new Date(new Date().getTime()-86400000*3);//最近三天
			this.rangetime[0] = n.getFullYear()+"/"+ (n.getMonth()+1)+"/"+ n.getDate()+" 00:00:00";
			this.rangetime[1] = (new Date().getFullYear()) + "/" + (new Date().getMonth() + 1) + "/" + (new Date().getDate()) +" 23:59:59";
			this.listFun();
			this.getconsumptiontypeArr = this.out;
			this.getInCometypeArr = this.come;
			this.outTotalAmount = this.$filter.formatMoney(this.outTotalAmount);
		}
	}
</script>

<style scoped="" lang="scss">
	@import '../../common/skin.scss';

	.list {
		.time {
			background: $main;
			padding: 30upx 24upx 50upx;

			text {
				color: $white;
			}
		}

		.time_space {
			display: flex;
			justify-content: space-between;
		}

		.chart {
			width: 90%;
			background: $white;
			margin: -24upx auto 60upx;
			border-radius: 10upx;
			box-shadow: 1upx 1upx 15upx $borderColor;
			display: flex;

			.chart_top {
				width: 80%;
				padding: 24upx;
				display: flex;
				justify-content: space-between;

				.radio {
					.icon {
						width: 30upx;
						height: 30upx;
						margin-right: 10upx;
					}
				}
			}
		}

		.li {
			display: flex;
			align-items: center;
			padding-left: 24upx;

			.liLeft {
				.liLeftBorder {
					width: 80upx;
					height: 80upx;
					line-height: 80upx;
					margin-right: 15upx;
					background: $bg;
					border-radius: 50%;
					text-align: center;
				}
			}

			.liRight {
				padding: 40upx 24upx;
				width: 100%;
				display: flex;
				justify-content: space-between;
				border-bottom: 1upx solid $borderColor;
			}

			.liRightTxt {
				width: 75%;
				display: flex;
				flex-direction: column;
			}

			.remark {
				color: $ft-333;
				font-size: 30upx;
			}

			.createDate {
				color: $ft-999;
				font-size: 24upx;
			}

			.amount {
				width: 25%;
				text-align: right;
				display: flex;
				flex-wrap:wrap;
			}
		}

		.noData {
			text-align: center;
		}

		.lvvpopref {
			width: 750upx;
			background: #FFFFFF;
			position: absolute;
			bottom: 0;
			font-size: 30upx;
			display: flex;
			flex-direction: column;

			.title {
				font-size: 32upx;
				color: $ft-666;
				font-weight: bold;
				border-bottom: 1px solid $borderColor;
				padding: 24upx 0;
				margin: 0 24upx 24upx;
			}

			.type_name {
				padding: 0 24upx 24upx;
				font-weight: bold;
			}
			.iptName{
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid $borderColor;
				padding: 24upx 0;
				margin: 0 24upx 24upx;
				.title{
					border:0;
					padding:0;
					margin: 0;
				}
				.type-ipt{
					display: flex;
					justify-content: space-between;
					align-items: center;
					background: $bg;
					height:60upx;
					line-height:60upx;
					border-radius: 60upx;
					padding: 0 15upx;
					.type-ipt-left{
						display: flex;
						align-items: center;
						input{
							margin-left:2%;
						}
					}
					
				}
			}
			.type {
				padding:0 24upx;
				display: flex;
				flex-wrap: wrap;
				font-size: 24upx;

				.type_li {
					position: relative;
					width: 22%;
					height: 60upx;
					line-height: 60upx;
					margin-bottom: 20upx;
					background: $bg;
					text-align: center;
					margin-right: 4%;
					border-radius: 5upx;

					&:nth-child(4n) {
						margin-right: 0
					}

					&.on {
						border: 1px solid $red;
						box-sizing: border-box;
						background: $white;

						&:after {
							content: " ";
							position: absolute;
							border-width: 0 0 30upx 40upx;
							bottom: 0;
							right: 0;
							border-style: solid;
							border-color: transparent transparent $red transparent;
						}

						&:before {
							content: " ";
							position: absolute;
							bottom: 2upx;
							right: 8upx;
							z-index: 999;
							width: 8upx;
							height: 16upx;
							border-color: $white;
							border-style: solid;
							border-width: 0 3upx 5upx 0;
							transform: rotate(45deg);
						}
					}


				}
			}

			.button {
				display: flex;

				text {
					width: 50%;
					text-align: center;
					height: 90upx;
					line-height: 90upx;
					font-size: 38upx;

					&.reset {
						background: $bg;
						color: $ft-333;
					}

					&.complete {
						background: $red;
						color: $white;
					}
				}
			}
		}

		.red {
			color: $red;
		}

		.green {
			color: $green !important;
		}
	}
</style>

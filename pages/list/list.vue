<template>
	<view class="list">
		<view class="time">
			<view class="" @click="onShowDatePicker('rangetime')">
				<text>{{rangetime}}</text>&nbsp;&nbsp;
				<text class="iconfont" v-if="showPicker">&#xe611;</text>
				<text class="iconfont" v-else>&#xe7b3;</text>
			</view>
			<mx-date-picker :show="showPicker" :type="type" :value="value" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
		</view>
		<view class="chart">
			<view class="chart_top">
				<view class="radio" @click="radioFun(0)">
					<text :class="['iconfont',{'on':isInCome}]">
						<text v-if="isInCome">&#xe6ba;</text>
						<text v-else>&#xe612;</text>
					</text>
					支出：&yen;{{out}}
				</view>
				<view class="radio" @click="radioFun(1)">
					<text :class="['iconfont',{'on':!isInCome}]">
						<text v-if="!isInCome">&#xe6ba;</text>
						<text v-else>&#xe612;</text>
					</text>
					收入：&yen;{{inCome}}
				</view>
			</view>
		</view>
		<view v-if="list.length > 0 ">
			<view class="li" v-for="(item ,index) in list" :key="item">
				<view class="liLeft">
					<view class="liLeftBorder">
						<text :class="[item && item.icon,'iconfont']"></text>
					</view>
				</view>
				<view class="liRight">
					<text class="remark">
						<text v-if="item && item.name">{{item.name}}</text>
						<text v-if="item && item.description">、{{item.description}}</text>
						<text v-if="item && item.location">、{{item.location}}</text>
					</text>
					<text class="amount">{{symbol}}{{item && item.amount}}元</text>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="noData">暂无数据</view>
		</view>
	</view>
</template>

<script>
	import MxDatePicker from "../../components/mx-datepicker/mx-datepicker.vue";
	export default {
		components: {
			MxDatePicker
		},
		data() {
			return {
				showPicker: false,
				rangetime: [],
				type: 'date',
				value: '',
				out: 0,
				inCome: 0,
				isInCome: true, //是否显示的是支出
				list: [],
				symbol: "-",
				pageSize: 10, // 每次最大返回条数
				pageIndex: 0, // 起始条数
				isLoadMore: true // 加载更多
			};
		},
		onPullDownRefresh() { //监听用户下拉动作，一般用于下拉刷新
			this.pageIndex = 0;
			this.isLoadMore = true;
			this.listFun();
		},
		methods: {
			radioFun(num) {
				this.pageIndex = 0;
				if (num) {
					this.isInCome = false;
					this.listFun();
					this.symbol = "+";
				} else {
					this.isInCome = true;
					this.listFun();
					this.symbol = "-";
				}
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
						if (!this.getMore) {
							uni.stopPullDownRefresh();
						}

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

						console.log(this.getMore)
						if (this.getMore) {
							this.list = this.list.concat(res.data.data);
						} else {
							this.list = res.data.data;
						}
						this.out = 0;
						this.inCome = 0;
						this.list.forEach((ele) => {
							if (this.isInCome) {
								this.out += Number(ele.amount);
							} else {
								this.inCome += Number(ele.amount)
							}
						})
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

						this.list = this.list.concat(res.data.data);
						this.out = 0;
						this.inCome = 0;
						this.list.forEach((ele) => {
							if (this.isInCome) {
								this.out += Number(ele.amount);
							} else {
								this.inCome += Number(ele.amount)
							}
						})
					}
				})
			},
		},
		onReachBottom() { //页面上拉触底事件的处理函数
			if (this.isLoadMore) {
				this.listFunMore()
			}
		},
		mounted() {
			this.rangetime[0] = (new Date().getFullYear()) + "/" + (new Date().getMonth() + 1) + "/" + (new Date().getDate()) +
				" 00:00:00";
			this.rangetime[1] = (new Date().getFullYear()) + "/" + (new Date().getMonth() + 1) + "/" + (new Date().getDate()) +
				" 23:59:59";
			this.listFun();
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
					.iconfont {
						font-size: 24upx;
						margin-right: 10upx;
					}

					.on {
						text {
							color: $main
						}

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
		}

		.noData {
			text-align: center;
		}
	}
</style>

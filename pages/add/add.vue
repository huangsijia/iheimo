<template>
	<view class="add">
		<view class="add_fixed">
			<view class="tab">
				<view class="tab_nav">
					<view :class="[{'on':tabIndex == $index},'li']" v-for="(item,$index) in listTab" :key="$index" @click="selectTab($index)">
						{{item}}
					</view>
				</view>
				<view class="tab_close" @click="tabClose">
					关闭
				</view>
			</view>
			<view class="resultOut">
				<view class="result">
					<view class="resultLeft">
						<view class="img">
							<text class="iconfont">{{record.img}}</text>
						</view>
						<text>{{record.msg}}</text>
					</view>
					<text>{{amount}}</text>
				</view>
				<text class="formula">{{formula}}</text>
			</view>

		</view>
		<view class="list">
			<view :class="[{'on':itemIndex == $index},'li']" v-for="(item,$index) in listShow" :key="$index" @click="selectList(item,$index)">
				<view class="img">
					<text class="iconfont">{{item.img}}</text>
				</view>
				<p>{{item.msg}}</p>
			</view>
		</view>
		<view class="key" v-if="showKey">
			<key @amountEmit="amountFun"></key>
		</view>
	</view>
</template>

<script>
	import key from '../../component/key.vue';
	export default {
		computed: {
			list0() {
				return this.$store.state.expenses;
			},
			list1() {
				return this.$store.state.income;
			},
		},
		components: {
			key,
		},
		data() {
			return {
				tabIndex: 0,
				listTab: ["支出", "收入"],
				itemIndex: 0,
				listShow: {},
				showKey: true,
				record: "",
				formula: "",
				amountArr: [],
				amountStr:"",
				amount: "0.00",
			};
		},
		methods: {
			amountFun(data) {
				this.amountArr.push(data.item);
				if(data.index != "3"){
					this.amount = this.amountArr.join("");
				}
				// console.log(this.amount)
				//点击C,清除所有
				if (this.amount.includes("C")) {
					this.amount = "0.00";
					this.formula = " ";
					this.amountArr = [];
					return;
				}
				//点击.
				if (this.amount.includes(".")) {
					this.amount = Array.from(new Set(this.amountArr)).join("");
					return;
				}
				//点击+
				if (this.amount.includes("+")) {
					this.formula = this.amount;
					let add = 0;
					let amountSplitAdd = this.amount.split("+");
					for(let i=0;i<amountSplitAdd.length;i++){
						add += Number(amountSplitAdd[i]);
					}
					this.amount = add;
					return;
				}
			},
			//关闭添加，显示流水列表
			tabClose() {},
			//切换tab
			selectTab(index) {
				this.tabIndex = index;
				this.listShow = this["list" + index];
			},
			//li切换class
			selectList(item, index) {
				this.itemIndex = index;
				this.record = item;
			},
		},
		mounted() {
			this.listShow = this.list0;
			this.record = this.list0[0];
		}
	}
</script>

<style scoped="" lang="scss">
	@import '../../common/skin.scss';

	.add {
		.add_fixed {
			width: 100%;
			position: fixed;
			top: 0;
		}

		.tab {
			position: relative;

			.tab_nav {
				display: flex;
				justify-content: center;
				background: $bg;

				view {
					width: 138upx;
					height: 49upx;
					line-height: 49upx;
					border: 1px solid $main;
					color: $main;
					text-align: center;
					margin: 10upx 0 40upx;

					&.on {
						background: $main;
						color: $white;
					}
				}
			}

			.tab_close {
				position: absolute;
				right: 48upx;
				top: 20%;
			}
		}

		.list {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			margin-top: 260upx;

			.li {
				text-align: center;
				margin-bottom: 40upx;

				&.on {
					.img {
						background: $main;
						color: $white;
					}
				}
			}
		}

		.img {
			width: 80upx;
			height: 80upx;
			line-height: 80upx;
			margin: 0 35upx;
			background: $bg;
			border-radius: 50%;
		}

		.result {
			height: 120upx;
			line-height: 120upx;
			border: 1px solid $borderColor;
			font-size: 50upx;
			padding-right: 24upx;
			display: flex;
			justify-content: space-between;
			text-align: center;
			background: $white;
			.resultLeft {
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				font-size: 30upx;

				.img {
					background: $main;
					color: $white;
				}
			}
		}

		.resultOut {
			position: relative;

			.formula {
				position: absolute;
				bottom: 2upx;
				right: 24upx;
				color: $ft-999;
				font-size: 24upx;
			}
		}

		.key {
			width: 100%;
			position: fixed;
			bottom: 0;
		}
	}
</style>

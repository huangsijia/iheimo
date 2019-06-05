<template>
	<view class="index">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<div class="title">
			<h3>记事本</h3>
		</div>
		<div class="ul">
			<ul class="" v-for="(item,$index) in list" :key="item">
				<li>
					<div class="listLeft"  @click="modifyFun(item)">
						<p>{{$index+1}}：{{item.note}}</p>
						<p class="mainFont">编辑</p>
					</div>
					<div class="date">
						<p class="mainFont" v-if="item.isComplete" @click="finishFun">已完成</p>
						<p>作者：{{item.createBy}}</p>
						<p>日期：{{item.createDate}}</p>
					</div>
				</li>
			</ul>
		</div>
		<view class="key">
			<index-key @calendarEmit="calendarFun" @categoryEmit="categoryFun" @completedEmit="completedFun" @remarkEmit="remarkFun"></index-key>
		</view>
		<lvv-popup position="bottom" ref="calendarLvvpopref">
			<view class="lvvpopref calendarLvvpopref">
				<calendar :date="date" :lunar="true" @change="change" @to-click="toClick" />
			</view>
		</lvv-popup>
		<lvv-popup position="bottom" ref="categoryLvvpopref">
			<view class="lvvpopref categoryLvvpopref">
				<view class="payList">
					<text class="text">选择分类</text>
					<view :class="[{'on':categoryIndex == $index},'payRow']" v-for="(item,$index) in categoryList" :key="item" @click="selectCategory(item,$index)" :code="item&&item.code">
						<image :src="'../../static/img/'+item.img+'.png'" class="icon"></image>
						<view class='payLi'>
							<text class="msg">{{item&&item.msg}}</text>
							<image :src="'../../static/img/icon-xuanzhong.png'" :class="[{'icon-xuanzhong':categoryIndex == $index},'icon']"></image>
						</view>
					</view>
				</view>
			</view>
		</lvv-popup>
		<lvv-popup position="bottom" ref="completedLvvpopref">
			<view class="lvvpopref completedLvvpopref">
				<view class="payList">
					<text class="text">是否完成</text>
					<view :class="[{'on':completedIndex == $index},'payRow']" v-for="(item,$index) in completedList" :key="item" @click="selectCompleted(item,$index)" :code="item&&item.code">
						<image :src="'../../static/img/'+item.img+'.png'" class="icon"></image>
						<view class='payLi'>
							<text class="msg">{{item&&item.msg}}</text>
							<image :src="'../../static/img/icon-xuanzhong.png'" :class="[{'icon-xuanzhong':completedIndex == $index},'icon']"></image>
						</view>
					</view>
				</view>
			</view>
		</lvv-popup>
		<lvv-popup position="bottom" ref="remarkLvvpopref">
			<view class="lvvpopref remarkLvvpopref">
				内容：<textarea v-model="remarkTxt" :focus="remarkFocus" maxlength="2000" />
				<span @click="addFun">发送</span>
			</view>
		</lvv-popup>
	</view>
</template>

<script>
	import indexKey from '../../component/indexKey.vue';
	import lvvPopup from '../../components/lvv-popup/lvv-popup.vue';
	import calendar from '../../components/uni-calendar/uni-calendar'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed: {
			categoryList() {
				return this.$store.state.categoryList;
			},
			completedList() {
				return this.$store.state.completedList;
			},
			...mapState(['out', 'come'])
		},
		components: {
			indexKey,
			lvvPopup,
			calendar
		},
		data() {
			return {
				list: [],
				date: new Date(),
				categoryTxt: "计划",
				categoryCode: "0",
				categoryIndex: 0,
				remarkTxt: "",
				remarkFocus: false,
				completedTxt: "已完成",
				completedCode: true,
				completedIndex: 0,
				pageSize: 150, // 每次最大返回条数
				pageIndex: 0, // 起始条数
				isLoadMore: true, // 加载更多
			}
		},
		onLoad() {
		},
		onPullDownRefresh() { //监听用户下拉动作，一般用于下拉刷新
			this.pageIndex = 0;
			this.isLoadMore = true;
			this.init();
		},
		methods: {
			...mapMutations(['login']),
			init() {
				let sendData = {
					pageSize: this.pageSize,
					pageIndex: this.pageIndex,
				}
				this.$public.API_GET({
					url: "noteBookList",
					type: "POST",
					data: sendData,
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
						this.list = res.data.data;
						this.list.forEach(ele => {
							ele.createDate = this.$filter.formatDate(ele.createDate)
						})
					}
				})
			},
			addFun() {
				if (!this.remarkTxt) {
					uni.showToast({
						icon: 'none',
						title: "请输入记事内容",
						duration: 2000
					});
					return false;
				}
				let sendData = {
					note: this.remarkTxt,
					type: this.categoryCode,
					isPrivate: false,
					isComplete: this.completedCode
				}
				this.$public.API_GET({
					url: "noteBook",
					type: "POST",
					data: sendData,
					success: res => {
						if (!res.data.success) {
							uni.showToast({
								icon: 'none',
								title: res.data.message,
								duration: 2000
							});
							return false;
						}
						this.pageIndex = 0;
						this.isLoadMore = true;
						this.init();
						this.$refs.remarkLvvpopref.close();
						this.remarkTxt = "";
						this.remarkFocus = false;
						this.completedTxt = "已完成";
						this.completedCode = true;
						this.completedIndex = 0;
						this.categoryTxt = "计划";
						this.categoryCode = 0;
						this.categoryIndex = 0;
					}
				})
			},
			modifyFun(params) {
				if(params.type == 1){
					params.categoryTxt ="备忘录"
				}else if(params.type == 2){
					params.categoryTxt ="总结"
				}else{
					params.categoryTxt ="计划"
				}
				params.categoryIndex = params.type;
				params.categoryCode = params.type;

				if(params.isComplete){
					params.completedTxt = "已完成";
					params.completedIndex = 0;
					params.completedCode = "true";
				}else{
					params.completedTxt = "未完成";
					params.completedIndex = 1;
					params.completedCode = "false";
				}
				uni.navigateTo({
					url: "/pages/indexDetail/indexDetail?params="+JSON.stringify(params)
				})
			},
			finishFun() {
				uni.redirectTo({
					url: "/pages/note/note"
				})
			},
			//日历
			calendarFun() {
				this.$refs.calendarLvvpopref.show();
			},
			change(e) {
				this.date = "完成日期：" + e.year + "-" + e.month + "-" + e.date;
			},
			toClick(e) {
				this.date = e.year + "-" + e.month + "-" + e.date;
			},
			categoryFun() {
				this.$refs.categoryLvvpopref.show();
			},
			//li切换class
			selectCategory(item, index) {
				this.categoryTxt = item.msg;
				this.categoryIndex = index;
				this.categoryCode = item.code;
				this.$refs.categoryLvvpopref.close();
			},
			completedFun() {
				this.$refs.completedLvvpopref.show();
			},
			//li切换class
			selectCompleted(item, index) {
				this.completedTxt = item.msg;
				this.completedIndex = index;
				this.completedCode = item.code;
				this.$refs.completedLvvpopref.close();
			},
			remarkFun() {
				this.$refs.remarkLvvpopref.show();
				this.remarkFocus = true;
			},
		},
		mounted() {
			this.init();
			var persion = uni.getStorageSync("persion");
			if(persion){
				this.login(persion);
			}
		}
	}
</script>

<style scoped="" lang="scss">
	@import '../../common/skin.scss';
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #F8F8F8;
	}
	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #F8F8F8;
		top: 0;
		z-index: 999;
	}
	.index {
		height: var(--status-bar-height);
		width: 100%;
		background: $bg;
		.mainFont {
			text-decoration: underline;
			color: $main;
		}
		.title {
			display: flex;
			justify-content: space-between;
			background: $bg;
			padding: 0 24upx;
			padding-bottom: 20upx;
		}
		h3 {
			color: $main;
			font-size: 40upx;
		}
		ul {
			padding: 0 24upx;
			
		}
		ul:last-child{
			margin-bottom: 150upx;
		}
		li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid $borderColor;
			padding: 24upx 0;
			color:$ft-333;
			.date {
				margin-left: 10upx;
				text-align: right;
				color:$ft-999;
			}
		}
		.listLeft{
			width: 60%;
		}
		.add {
			height: 80upx;
			line-height: 80upx
		}
		.remarkLvvpopref {
			overflow: auto;
			padding: 24upx 24upx 80upx 24upx;
			span {
				position: fixed;
				bottom: 24upx;
				right: 24upx;
				background: $main;
				padding: 2upx 20upx;
				display: inline-block;
				color: $white;
				border-radius: 2upx;
				z-index: 999;
			}
		}
	}
</style>

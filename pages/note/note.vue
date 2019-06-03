<template> 
	<view class="index">
		<div class="title">
			<h3>
				<template v-if="type == 1">备忘录</template>
				<template v-else-if="type == 2">总结</template>
				<template v-else>计划</template>
				已完成列表</h3>
		</div>
		<ul class="" v-for="(item,$index) in list" :key="item">
			<li>
				<div class="listLeft">
					<p>{{$index+1}}：{{item.note}}</p>
				</div>
				<div class="date">
					<p>作者：{{item.createBy}}</p>
					<p>日期：{{item.createDate}}</p>
				</div>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				type:0,
				pageSize: 150, // 每次最大返回条数
				pageIndex: 0, // 起始条数
				isLoadMore: true, // 加载更多
			}
		},
		onLoad(e) {
			this.type = e.type;
		},
		methods: {
			init() {
				let sendData = {
					pageSize: this.pageSize,
					pageIndex: this.pageIndex,
					type:this.type
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
		},
		mounted(){
			this.init();
		}		
	}
</script>

<style scoped="" lang="scss">
	@import '../../common/skin.scss';
	.index{
		height: var(--status-bar-height);  
		width: 100%;  
		background: $bg;
		.title{
			display: flex;
			justify-content: space-between;
			background: $bg;
			padding:0 24upx;
			padding-bottom: 20upx;
		}
		h3{
			color:$main;
			font-size: 40upx;
		}
		ul{
			padding:0 24upx;
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
			.listLeft{
				width: 60%;
			}
		}
	}
</style>

<template>
	<view class="home">
		<navigator url="/pages/personal/personal" hover-class="none" class="main">
			<view class="user">
				<image :src="'../../static/img/icon-touxiang.png'" class="icon"></image>
				<text>{{persion && persion.user.name}}</text>
			</view>
		</navigator>
		<view class="white list">
			<view class="list_li" v-for="(item,index) in list" :key="item" @click="toNoteFun(index)">
				<image :src="'../../static/img/'+item.img+'.png'" class="icon"></image>
				<view>{{item.txt}}</view>
			</view>
		</view>
		<view class="white about">
			<view class="li" v-for="(item,index) in about" :key="item">
				<navigator :url="item.url" hover-class="none">
					{{item.txt}}
					<image :src="'../../static/img/icon-shezhi-youjiantou.png'" class="icon"></image>
				</navigator>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		computed: {
			...mapState(['hasLogin'])
		},
		data() {
			return {
				persion: uni.getStorageSync("persion"),
				list: [{
						txt: '计划',
						img: "icon-richeng"
					},
					{
						txt: '备忘录',
						img: "icon-qingdan1"
					},
					{
						txt: '总结',
						img: "icon-jihua2"
					}
				],
				about: [{
						txt: '关于我们',
						url: "/pages/about/about"
					},
					{
						txt: '设置',
						url: "/pages/set/set"
					}
				]
			};
		},
		methods: {
			toNoteFun(params){
				uni.redirectTo({
					url: "/pages/note/note?type="+params
				})
			}
		},
		mounted() {
			if (!this.hasLogin) {
				uni.redirectTo({
					url: "/pages/mobile/mobile?redirect=/pages/home/home"
				})
			}
		},
		onLoad() {

		}
	}
</script>

<style scoped="" lang="scss">
	@import '../../common/skin.scss';

	.home {
		width: 100%;
		min-height: 100vh;
		background-color: $bg;
		overflow: hidden;

		.white {
			border-radius: 10upx;
			margin: 24upx;
			background: $white;
			box-shadow: 0 0 15upx $borderColor;
		}

		.list {
			padding: 24px 0;
			margin-top: -60upx;
			display: flex;

			.list_li {
				width: 33.33%;
				text-align: center;
				border-right: 1upx solid $borderColor;

				.icon {
					margin-bottom: 20upx;
				}
			}
		}

		.main {
			display: flex;
			align-items: center;
			background: $main;
			padding: 48upx 24upx 80upx 24upx;
		}

		.user {
			display: flex;
			align-items: center;
			color: $white;
			font-size: 30upx;

			.icon {
				margin-right: 24upx;
			}
		}

		.li {
			width: 100%;

			navigator {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30upx;
				height: 100upx;
				line-height: 100upx;
				border-bottom: 1px solid $borderColor;
				margin-left: 24upx;
			}

			&:last-child {
				navigator {
					border-bottom: 0;
				}
			}
		}
	}
</style>

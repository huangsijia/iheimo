<template>
	<view class="home">
		<view class="main user">
			<text class="iconfont">&#xe606;</text>
			<text>{{persion && persion.user.name}}</text>
		</view>
		<view class="white list">
			<view class="list_li" v-for="(item,index) in list" :key="item">
				<text class="iconfont">{{item.img}}</text>
				<view>{{item.txt}}</view>
			</view>
		</view>
		<view class="white about">
			<view class="li" v-for="(item,index) in about" :key="item">
				<navigator :url="item.url">
					{{item.txt}}
					<text class="iconfont">&#xe6aa;</text>
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
						txt: '日程',
						img: "\ue613"
					},
					{
						txt: '清单',
						img: "\ue60a"
					},
					{
						txt: '计划',
						img: "\ue6c1"
					},
					{
						txt: '总结',
						img: "\ue64f"
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
		methods: {},
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
				width: 25%;
				text-align: center;
				border-right: 1upx solid $borderColor;

				text {
					font-size: 60upx;
				}

				&:nth-child(1) {
					text {
						color: #56abe4;
					}
				}

				&:nth-child(2) {
					text {
						color: #3eb135;
					}
				}

				&:nth-child(3) {
					text {
						color: #1296db;
					}
				}

				&:nth-child(4) {
					border-right: 0;

					text {
						color: #ffbb00;
					}
				}
			}
		}

		.main {
			padding: 48upx 24upx 80upx 24upx;
			background: $main;
		}

		.user {
			display: flex;
			align-items: center;
			color: $white;
			font-size: 30upx;

			.iconfont {
				font-size: 80upx;
				margin-right: 24upx;
			}
		}

		.li {
				width: 100%;
			navigator{
				display: flex;
				justify-content: space-between;
				font-size: 30upx;
				height: 100upx;
				line-height: 100upx;
				border-bottom: 1px solid $borderColor;
				margin-left: 24upx;
			}
			&:last-child {
				navigator{
				border-bottom: 0;}
			}

			.iconfont {
				font-size: 60upx;
				padding-right: 12upx;
				color: $borderColor;
			}
		}
	}
</style>

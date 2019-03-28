<template>
	<view>
		<view class="loginMobile">
			<form class="form">
				<view class="section msg">
					<text class="iconfont font">&#xe60c;</text>
					<input v-model="info.msg" type="text" placeholder="请输入邮箱地址" placeholder-class="placeholder" value="" />
				</view>
				<view class="section password">
					<text class="iconfont font">&#xe769;</text>
					<input v-model="info.password" :password="isOpen?false:true" type="text" maxlength="20" placeholder="请输入6-20位密码"
					 placeholder-class="placeholder" value="" />
					<view class="eye" @click="isOpen=!isOpen">
						<text class="iconfont" v-if="isOpen">&#xe681;</text>
						<text class="iconfont" v-else>&#xe663;</text>
					</view>
				</view>
			</form>
			<view class="btn" @click="loginFun">
				登录
			</view>
			<view class="link">
				<navigator url="../index/index" hover-class="none">找回密码</navigator>
			</view>
			<view class="other">
				<view class="p">
					其他登录方式
				</view>
				<view class="link">
					<navigator url="../login/login" hover-class="none">微信登录</navigator>
					<navigator url="../index/index" hover-class="none">注册</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				// 表单数据
				info: {
					msg: "", // 手机号码
					password: "" // 密码
				},
				isOpen: false ,// 密码眼睛是不是开着
				redirect:""
			};
		},
		methods: {
			...mapMutations(['login']),
			// 检验输入的数据
			chechInfo() {
				if (!this.$public.reg.mailReg.test(this.info.msg)) {
					uni.showToast({
						icon: "none",
						title: '请输入正确的邮箱地址',
						duration: 2000
					})

					return false
				}

				if (!this.$public.reg.passwordReg.test(this.info.password)) {
					uni.showToast({
						icon: "none",
						title: '请输入6-20位密码',
						duration: 2000
					})

					return false
				}
				return true
			},
			// 登录
			loginFun() {
				if (!this.chechInfo()) {
					return false
				}
				this.$public.API_GET({
					url: "login",
					type:"POST",
					data: {
						userName: this.info.msg,
						password: this.info.password
					},
					success: (res) => {
						if (!res.data.success) {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
							return false;
						}
						this.login(res.data);
						uni.setStorageSync("persion",res.data);
						if (this.redirect) {
							uni.reLaunch({
								url: this.redirect
							});							
						} else {
							uni.reLaunch({
								url: '/pages/index/index'
							});
						}
					}
				});
			},
		},
		onLoad(e) {
			this.redirect = e.redirect;
		},
		mounted() {

		}
	}
</script>

<style scoped="" lang="scss">
	@import '../../common/skin.scss';

	.loginMobile {
		padding-top: 120upx;

		.p {
			text-align: center;
			display: block;
			color: $ft-666;
			font-size: 32upx;
		}

		.btn {
			margin-top: 380upx;
		}

		.other {
			.p {
				position: relative;
				color: $ft-cf;
				font-size: 24upx;
				text-align: center;
				margin-top: 100upx;

				&:before,
				&:after {
					content: " ";
					width: 200upx;
					height: 1upx;
					background: $ft-cf;
					display: block;
					position: absolute;
					top: 50%;
				}

				&:before {
					left: 10%;
				}

				&:after {
					right: 10%;
				}
			}
		}

		.link {
			width: 80%;
			margin: 24upx auto 0;
			display: flex;
			justify-content: space-between;
			font-size: 28upx;
		}

		.form {
			.section {
				width: 80%;
				margin: 0 auto;
				padding: 30upx 0;
				display: flex;
				align-items: center;
				border-bottom: 1px solid $borderColor;

				.font {
					margin-right: 20upx;
				}

				input {
					width: 80%;
				}
			}
		}

	}
</style>

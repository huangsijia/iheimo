<template>
	<view>
		<view class="loginMobile">
			<form class="form">
				<view class="mail">
					<view class="section">
						<image src="../../static/img/icon-shouji.png" class="icon"></image>
						<input v-model="mail" type="text" placeholder="请输入邮箱地址" placeholder-class="placeholder" />
					</view>
					<image src="../../static/img/icon-danchuang-guanbi.png" class="icon" v-if="mail" @tap="clearModel('mail')"></image>
				</view>
				<view class="password">
					<view class="section">
						<image src="../../static/img/icon-mima.png" class="icon"></image>
						<input v-model="password" :password="isOpen?false:true" type="text" maxlength="20" placeholder="请输入6-20位密码"
						 placeholder-class="placeholder" />
						<view class="eye" @click="isOpen=!isOpen">
							<image src="../../static/img/icon-yanjing.png" class="icon" v-if="isOpen"></image>
							<image src="../../static/img/icon-bukejian.png" class="icon" v-else></image>
						</view>
					</view>
					<image src="../../static/img/icon-danchuang-guanbi.png" class="icon" v-if="password" @tap="clearModel('password')"></image>
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
				mail: "",
				password: "", // 密码
				isOpen: false, // 密码眼睛是不是开着
				redirect: ""
			};
		},
		methods: {
			...mapMutations(['login']),
			clearModel(params) {
				this[params] = "";
			},
			// 检验输入的数据
			chechInfo() {
				if (!this.mail) {
					// if (!this.$public.reg.mailReg.test(this.mail) && !this.$public.reg.nameReg.test(this.mail)) {
					uni.showToast({
						icon: "none",
						title: '请输入正确的邮箱地址或者登录名',
						duration: 2000
					})

					return false
				}

				if (!this.$public.reg.passwordReg.test(this.password)) {
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
					type: "POST",
					data: {
						userName: this.mail,
						password: this.password
					},
					success: (res) => {
						if (!res.data.success) {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
							return false;
						}
						uni.showToast({
							icon: 'none',
							title: "登录成功",
							duration: 2000
						});
						this.login(res.data);
						uni.setStorageSync("persion", res.data);
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
			uni.showToast({
				icon: 'none',
				title: e.redirect,
				duration: 2000
			});
		},
		mounted() {

		}
	}
</script>

<style scoped="" lang="scss">
	@import '../../common/skin.scss';

	.loginMobile {
		padding-top: 120upx;
		.icon{
			margin-right: 20upx;
		}
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

			.mail,
			.password {
				width: 80%;
				margin: 0 auto;
				padding: 30upx 0;
				display: flex;
				align-items: center;
				border-bottom: 1px solid $borderColor;
				justify-content: space-between;
			}

			.section {
				width: 90%;
				display: flex;
				align-items: center;

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

<script>
import axios from "axios";
export default {
	components: {
		username: null,
		email: null,
		password: null
	},
	data() {
		return {
			isCreated: [false],
			errorSignup: null,
			error: false
		};
	},

	methods: {
		/* create Account - uses Axios to create the account */
		createAccount: function () {
			let responseBody = {
				username: this.username,
				password: this.password,
				email: this.email
			};
			axios
				.post("http://localhost:8080" + "/account/create", responseBody)
				.then((response) => {
					this.$cookies.set("username", response.data.username);
				})
				.catch((e) => {
					let errorMsg = e.response.data;
					console.log(errorMsg);
					this.errorSignup = errorMsg;
					this.error = true;
				});
		}
	}
};
</script>

<template>
	<div class="signup">
		<div class="information">
			<div class="MovieJunkie">
				<div class="inline">
					<img src="../assets/icons/camera_roll_30px.svg" />
				</div>
				<div class="inline" style="margin-left: 0.5rem">
					<div class="subtitle">Movie Junkie</div>
				</div>
			</div>
			<div class="Title">
				<div class="title">Join our network</div>
				<div class="paragraph">We’d love for you to join!</div>
			</div>
			<div class="NameInput">
				<div class="paragraph">Name*</div>
				<input class="sign-input" v-model="text" placeholder="Enter your name" />
			</div>
			<div class="EmailInput">
				<div class="paragraph">Email*</div>
				<input class="sign-input" v-model="text" placeholder="Enter your email" />
			</div>
			<div class="PasswordInput">
				<div class="paragraph">Password*</div>
				<input class="sign-input" v-model="text" placeholder="Enter your password" />
			</div>
			<div class="SignUpButton">
				<button @click="signUp">Sign up</button>
				<div class="LogIn">
					<div class="paragraph">Already have an account? Log in</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.information {
	width: 30rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: 30px;
	margin-left: 30px;
	margin-right: 30px;
}
.inline1 {
	display: inline-block;
	vertical-align: middle;
	height: 30px;
}
h2 {
	font-weight: 700;
	font-size: 31.25px;
	line-height: 30px;
	margin-left: 11px;
	font-family: "Roboto";
	color: black;
}
.Title {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-top: 48px;
}
.EmailInput {
	margin-top: 46px;
}
.UsernameInput {
	margin-top: 16px;
}
.PasswordInput {
	margin-top: 16px;
}
input {
	width: 520px;
	height: 76px;
}
.SignUpButton {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 37px;
	width: 30rem !important;
}
button {
	width: 100% !important;
	background-color: black;
	height: 50px;
	color: white;
	border-radius: 8px;
}
p {
	font-family: "Roboto";
	font-size: 16px;
	font-weight: 400;
	line-height: 19px;
	letter-spacing: 0em;
	color: black;
}
h1 {
	font-family: "Roboto";
	font-size: 49px;
	font-weight: 700;
	line-height: 57px;
	letter-spacing: 0em;
	text-align: left;
	color: black;
}
.LogIn {
	text-align: center;
}
.errorBox {
	width: 520px;
	height: 50px;
	top: 30px;
	background: rgba(232, 125, 125, 0.3);
	border-radius: 8px;
}
.Image {
	position: absolute;
	right: 41px;
	height: 700px;
	width: 700px;
	border-radius: 64px;
	background: url(.jpg);
}
.errorText {
	left: 51px;
	top: 16px;
	font-family: "Roboto";
	font-size: 16px;
	font-weight: 400;
	line-height: 19px;
	letter-spacing: 0em;
	text-align: left;
}
.errorIcon {
	position: absolute;
	left: 17px;
	top: 42px;
}
.error {
	position: relative;
}

.title {
	font-size: 3.052rem;
	font-weight: bold;
}

.subtitle {
	font-size: 1.25rem;
	font-weight: bold;
}

.paragraph {
	font-size: 1rem;
}

.sign-input {
	width: 28.4rem;
	font-size: 1rem;
	height: 1rem;
	border-radius: 0.5rem;
	padding: 0.75rem;
}
</style>

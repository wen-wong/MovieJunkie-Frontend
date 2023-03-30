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
					this.$router.push("/search");
				})
				.catch((e) => {
					let errorMsg = e.response.data.errorMsg;
					console.log(errorMsg);
					this.errorSignup = errorMsg;
					this.error = true;
				});
		},
		switchToLogin: function () {
			this.$router.push("/login");
		}
	}
};
</script>

<template>
	<div class="signup">
		<div class="information-container">
			<div class="MovieJunkie">
				<div class="inline1">
					<img src="../assets/icons/camera_roll_30px.svg" />
				</div>
				<div class="inline1" style="margin-left: 0.5rem">
					<div class="subtitle">Movie Junkie</div>
				</div>
			</div>
			<div class="Title">
				<div class="title">Join our network</div>
				<div class="paragraph">We’d love for you to join!</div>
			</div>
			<div class="EmailInput">
				<div class="paragraph">Email*</div>
				<input class="sign-input" v-model="email" placeholder="Enter your email" />
			</div>
			<div class="UsernameInput">
				<div class="paragraph">Username*</div>
				<input class="sign-input" v-model="username" placeholder="Enter your name" />
			</div>
			<div class="PasswordInput">
				<div class="paragraph">Password*</div>
				<input
					class="sign-input"
					v-model="password"
					type="password"
					placeholder="Enter your password"
				/>
			</div>
			<div class="SignUpButton">
				<button class="sign-button" @click="createAccount()">Sign up</button>
				<div class="LogIn">
					<div class="paragraph"><div class="inline">Already have an account?</div><div class="inline"><div class="switchToLogin" @click="switchToLogin()"> Log in</div></div></div>
				</div>
			</div>
			<div class="errorBox" v-if="error">
				<img src="../assets/icons/error_outline_24px_rounded.svg" alt="Error Icon" />
				<div class="errorText">Error: {{ errorSignup }}</div>
			</div>
		</div>
		<img
			class="image-container"
			src="/src/assets/images/denise-jans-Lq6rcifGjOU-unsplash.jpg"
		/>
	</div>
</template>

<style>
.signup {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.information-container {
	width: 27rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: 1rem;
}
.inline {
	display: inline-block
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
	width: 100%;
	margin-top: 46px;
}
.UsernameInput {
	width: 100%;
	margin-top: 16px;
}
.PasswordInput {
	width: 100%;
	margin-top: 16px;
}
.SignUpButton {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100% !important;
	margin-top: 37px;
}
.sign-button {
	width: 100%;
	background-color: black;
	height: 50px;
	color: white;
	border-radius: 8px;
	font-size: 1rem;
}

.LogIn {
	text-align: center;
}
.errorBox {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	padding: 1rem 1rem;
	width: 25rem;
	top: 30px;
	background: rgba(232, 125, 125, 0.3);
	border-radius: 8px;
	align-items: center;
	margin-top: 1rem;
}
.Image {
	border-radius: 64px;
}
.errorText {
	margin-left: 0.25rem;
	font-size: 16px;
	line-height: 19px;
	letter-spacing: 0em;
	text-align: left;
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

.description {
	margin-left: 1rem;
}

.paragraph {
	font-size: 1rem;
}

.sign-input {
	width: 95%;
	font-size: 1rem;
	height: 1rem;
	border-radius: 0.5rem;
	padding: 0.75rem;
	border: 1px solid grey;
}

.image-container {
	margin: 1rem 0rem;
	width: 60%;
	border-radius: 3rem 0.5rem 3rem 0.5rem;
}

.switchToLogin {
	margin-left: 5px;
	font-weight: bold;
	text-decoration: underline;
}

</style>

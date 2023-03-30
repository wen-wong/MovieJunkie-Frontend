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
			errorLogin: null,
			error: false
		};
	},

	methods: {
		/* login - uses Axios to login to the account */
		login: function () {
			if (this.username == "") {
				this.username = null;
			}

			if (this.email == "") {
				this.email = null;
			}

			if (this.password == "") {
				this.password = null;
			}

			let responseBody = {
				username: this.username,
				password: this.password,
				email: this.email
			};
			axios
				.post("http://localhost:8080" + "/account/login", responseBody)
				.then((response) => {
					this.$cookies.set("username", response.data.username);
					this.$router.push("/search");
					console.log(this.$cookies.get("username"));
				})
				.catch((e) => {
					let errorMsg = e.response.data.errorMsg;
					console.log(errorMsg);
					this.errorLogin = errorMsg;
					this.error = true;
				});
		},
		switchToSignUp: function () {
			this.$router.push("/");
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
				<div class="title">Welcome Back</div>
				<div class="paragraph">Let's start reviewing!</div>
			</div>
			<div class="UsernameInput">
				<div class="paragraph">Username</div>
				<input class="sign-input" v-model="username" placeholder="Enter your username" />
			</div>
			<div class="OrContainer">
				<hr>
				<p class="OR">OR</p>
			</div>
			<div class="EmailInput">
				<div class="paragraph">Email</div>
				<input class="sign-input" v-model="email" placeholder="Enter your email" />
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
			<div class="SignInButton">
				<button class="sign-button" @click="login()">Sign in</button>
				<div class="SignUp">
					<div class="paragraph"><div class="inline">Need an account?</div><div class="inline"><div class="switchToSignUp" @click="switchToSignUp()">Register here</div></div></div>
				</div>
			</div>
			<div class="errorBox" v-if="error">
				<img src="../assets/icons/error_outline_24px_rounded.svg" alt="Error Icon" />
				<div class="errorText">Error: {{ errorLogin }}</div>
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
	width: 30rem;
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
.SignInButton {
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
.SignUp {
	text-align: center;
}
.errorBox {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	padding: 1rem 1rem;
	width: 28rem;
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
	font-weight: bold;
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

.switchToSignUp {
	margin-left: 5px;
	font-weight: bold;
	text-decoration: underline;
}

.OrContainer {
	position: relative;
}

hr {
	color: #808080;
	margin-top: 10px;
	position: absolute;
	margin-top: 25px;
	width: 30rem;
}
.OR {
	text-align:center; 
	color: #808080;
	background:white; 
	padding: 5px;
	position:absolute;
	margin-left: 15rem;
	margin-top: 11px;
}

</style>



<script>
import axios from "axios";
export default {
    components: {
        username: null,
        email: null,
        password: null,
    },
    data() {
        return {
            isCreated: [false],
			errorSignup:null,
			error: false
        };
    },
    
    methods: {
        /* create Account - uses Axios to create the account */
        createAccount : function() {
			let responseBody = {username: this.username, password: this.password, email: this.email}
            axios.post('http://localhost:8080'+'/account/create', responseBody).then(response=>{
				this.$cookies.set("username", response.data.username);
            })
            .catch(e => {
                let errorMsg = e.response.data;
				console.log(errorMsg);
                this.errorSignup = errorMsg;
                this.error = true;
            })
        },      
    }
};
</script>

<template>
	<div class="signup">
		<div class="information">
			<div class="MovieJunkie">
				<div class="inline1">
					<img src="../assets/icons/camera_roll_30px.svg" />
				</div>
				<div class="inline1">
					<h2>Movie Junkie</h2>
				</div>
			</div>
			<div class="Title">
				<h1>Join our network</h1>
				<p>We’d love for you to join!</p>
			</div>
			<div class="EmailInput">
				<p>Email*</p>
				<input v-model="email" placeholder="Enter your email" />
			</div>
			<div class="UsernameInput">
				<p>Username*</p>
				<input v-model="username" placeholder="Enter your username" />
			</div>
			<div class="PasswordInput">
				<p>Password*</p>
				<input v-model="password" placeholder="Enter your password" type=password />
			</div>
			<div class="SignUpButton">
				<button @click="createAccount()">Sign up</button>
				<div class="LogIn">
					<p>Already have an account? Log in</p>
				</div>
			</div>
			<div class="error" v-if="error">
				<span class="inline2">
					<div class="errorIcon">
						<img src="../assets/icons/error_outline_24px_rounded.svg" />
					</div>
				</span>
				<span class="inline2">
					<div class="errorBox">
						<p>
							<div class="errorText">
								Error: {{errorSignup}}
							</div>
						</p>
					</div>
				</span>
			</div>
		</div>
		<div class="Image">
				<img src="/src/assets/images/denise-jans-Lq6rcifGjOU-unsplash.jpg" class="Image">
		</div>
	</div>
</template>

<style>
.information {
	margin-top: 30px;
	margin-left: 30px;
	margin-right:30px;
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
	margin-top: 37px;
	width: 520px;
}
button {
	background-color: black;
	width: 520px;
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
.errorText{
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
</style>

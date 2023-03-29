<script></script>

<template>
	<div class="login">
		<div class="information">
			<div class="MovieJunkie">
				<div class="inline">
					<img src="../assets/icons/camera_roll_30px.svg" />
				</div>
				<div class="inline">
					<h2>Movie Junkie</h2>
				</div>
			</div>
			<div class="Title">
				<h1>Welcome back</h1>
				<p>Let's start reviewing!</p>
			</div>
			<div class="NameInput">
				<p>Name*</p>
				<input v-model="text" placeholder="Enter your name" />
			</div>
			<div class="Line1"></div>
			<div class="Or">
				<p>OR</p>
			</div>
			<div class="Line2"></div>
			<div class="EmailInput">
				<p>Email*</p>
				<input v-model="text" placeholder="Enter your email" />
			</div>
			<div class="PasswordInput">
				<p>Password*</p>
				<input v-model="text" placeholder="Enter your password" type="password" />
			</div>
			<div class="SignUpButton">
				<button @click="login">Login</button>
				<div class="LogIn">
					<p>Need an Account? Register here</p>
				</div>
			</div>
		</div>
		<div class="Image">
			<img src="/src/assets/images/denise-jans-Lq6rcifGjOU-unsplash.jpg" class="Image" />
		</div>
	</div>
</template>

<style>
.information {
	margin-top: 30px;
	margin-left: 30px;
	margin-right: 30px;
}
.inline {
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
.NameInput {
	margin-top: 46px;
}
.EmailInput {
	margin-top: 22px;
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
.Line2 {
	position: absolute;
	width: 215px;
	height: 0px;
	left: 315px;
	top: 310px;

	/* Grey 500 */
	border: 1px solid #808080;
	transform: rotate(0.23deg);
}
.Line1 {
	position: absolute;
	width: 230px;
	height: 0px;
	left: 30x;
	top: 310px;

	/* Grey 500 */
	border: 1px solid #808080;
	transform: rotate(0.23deg);
}
.Or {
	position: absolute;
	width: 21px;
	height: 19px;
	left: 265px;
	top: 303px;

	/* Normal Text */
	font-family: "Roboto";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	/* identical to box height */

	/* Grey 500 */
	color: #808080;
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
.Image {
	position: absolute;
	right: 41px;
	top: 0px;
	height: 700px;
	width: 700px;
	border-radius: 64px;
	background: url(.jpg);
}
</style>

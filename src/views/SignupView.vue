<script>
</script>

<template>
	<div class="signup">
        <div class="information">
            <div class="MovieJunkie">
                <div class="inline">
                    <img src="../assets/icons/camera_roll_30px.svg">
                </div>
                <div class="inline">
                    <h2>Movie Junkie</h2>
                </div>
            </div>
            <div class="Title">
                <h1>Join our network</h1>
                <p>We’d love for you to join!</p>
            </div>
            <div class="NameInput">
                <p>Name*</p>
                <input v-model="text" placeholder="Enter your name"/>
            </div>
            <div class="EmailInput">
                <p>Email*</p>
                <input v-model="text" placeholder="Enter your email"/>
            </div>
            <div class="PasswordInput">
                <p>Password*</p>
                <input v-model="text" placeholder="Enter your password"/>
            </div>
            <div class="SignUpButton">
                <button @click="signUp">Sign up</button>
                <div class="LogIn">
                    <p>Already have an account? Log in</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.information {
    margin-top: 30px;
    margin-left: 30px;
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
</style>
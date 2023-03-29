<template>
	<div class="error-container">
		<div class="error-box">
			<div class="error-title">404 - NOT FOUND</div>
			<div>
				The given URL doesn't exist. Please return to the previous URL or return to Home.
			</div>
			<router-link :to="{ name: 'home' }">
				<div class="error-description">Return home from here</div>
			</router-link>
		</div>
	</div>
</template>
<style>
.error-container {
	padding-top: 10rem;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: hsl(260, 50%, 70%, 0.25);
}
.error-box {
	padding: 3rem 4rem;
	background-color: white;
	border-radius: 1rem;
}
.error-title {
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 0.5rem;
}
.error-description {
	text-decoration: underline;
}
</style>

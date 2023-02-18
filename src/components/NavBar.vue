<template>
	<div class="nav-container">
		<div class="nav-item-container">
			<img src="../assets/icons/camera_roll_30px.svg" alt="moviejunkie-logo" />
			<div class="nav-item item-left">Movie Junkie</div>
		</div>
		<div class="nav-item-container">
			<div class="nav-item item-right">Account</div>
			<img src="../assets/icons/exit_to_app_30px.svg" alt="moviejunkie-logo" />
		</div>
	</div>
</template>

<style>
.nav-container {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 2rem 0rem;
	padding: 1rem 4rem;
	font-size: 1.25rem;
}

.nav-item-container {
	display: flex;
	flex-direction: row;
}

.nav-item {
	font-weight: bold;
}

.item-left {
	margin-left: 0.5rem;
}

.item-right {
	margin-right: 0.5rem;
}
</style>

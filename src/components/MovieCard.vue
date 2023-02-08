<script>
export default {
	props: ["title", "description", "id"]
};
</script>

<template>
	<router-link :to="{ name: 'movie', params: { id: id } }">
		<div class="card">
			<div class="card-container">
				<div class="card-title">{{ title }}</div>
				<div>{{ description }}</div>
			</div>
		</div>
	</router-link>
</template>

<style>
.card {
	width: 100vh;
	min-height: 10rem;
	margin: 1rem 0rem;
	border: 0.01rem solid grey;
	color: grey;
	border-radius: 0.5rem;
}

.card:hover {
	color: var(--color-text);
	box-shadow: 0.5rem 0.5rem;
}

.card-title {
	font-size: 1.25rem;
	font-weight: bold;
}

.card-container {
	margin: 0.5rem 1rem;
	display: flex;
	flex-direction: column;
}
</style>

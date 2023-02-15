<script>
export default {
	props: ["title", "description", "id"]
};
</script>

<template>
	<!-- On Click routes the user to the specific movie with their ID -->
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
	width: 60rem;
	min-height: 10rem;
	margin: 1rem 0rem;
	border: 0.01rem solid hsl(0, 0%, 50%, 0.5);
	color: grey;
	border-radius: 0.5rem;
}

.card:hover {
	color: var(--color-text);
	box-shadow: 0px 5px 10px hsl(0, 0%, 50%);
}

.card-title {
	font-size: 1.25rem;
	font-weight: bold;
}

.card-container {
	margin: 1rem 1rem;
	display: flex;
	flex-direction: column;
}
</style>

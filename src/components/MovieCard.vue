<script>
export default {
	props: ["title", "description", "id", "image_url"],
	data() {
		return {
			hover: false
		};
	}
};
</script>

<template>
	<!-- On Click routes the user to the specific movie with their ID -->
	<router-link :to="{ name: 'movie', params: { id: id } }">
		<div
			class="movie-card"
			v-bind:style="[
				image_url != null
					? { backgroundImage: 'url(https://image.tmdb.org/t/p/w300' + image_url + ')' }
					: {}
			]"
			@mouseover.native="hover = true"
			@mouseleave.native="hover = false"
		>
			<div v-if="hover && image_url != null" class="card-title-overlay">
				<div class="card-title">{{ title }}</div>
			</div>
			<div v-if="image_url == null" class="card-title-overlay full">
				<div class="card-title">{{ title }}</div>
			</div>
		</div>
	</router-link>
</template>

<style>
.movie-card {
	width: 14rem;
	height: 23rem;
	margin: 0.75rem 0rem;
	color: grey;
	border-radius: 0.5rem;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	display: flex;
	flex-direction: column;
	justify-content: end;
}

.card:hover {
	color: var(--color-text);
	box-shadow: 0px 5px 10px hsl(0, 0%, 50%);
}

.card-title-overlay {
	display: flex;
	flex-direction: column;
	justify-content: end;
	border-radius: 0 0 0.5rem 0.5rem;
	height: 10rem;
	background: linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, #000000 70%);
}

.full {
	height: 23rem;
}

.card-title {
	margin: 1rem;
	font-size: 1.25rem;
	font-weight: bold;
	color: white;
}

.no-image {
	justify-content: center;
	border-radius: 1px solid grey;
}

.card-no-image {
	margin: 1rem;
	display: flex;
	flex-direction: row;
}
</style>

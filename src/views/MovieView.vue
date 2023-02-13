<script>
import axios from "axios";

export default {
	data() {
		return {
			id: window.location.pathname.split("/")[2],
			movie: {},
			actors: [],
			poster_url: ""
		};
	},
	methods: {
		async fetchMovie(id) {
			const movieResponse = await axios.get(
				"https://api.themoviedb.org/3/movie/" +
					id +
					"?api_key=f4a943efca00a3cd96ac56ff8ad1ea3c"
			);
			this.movie = movieResponse.data;
			this.poster_url = `https://image.tmdb.org/t/p/w300${this.movie.poster_path}`;
		},
		compareActors(a1, a2) {
			if (a1.popularity < a2.popularity) {
				return 1;
			} else return -1;
		},
		async fetchActors(id) {
			const actorResponse = await axios.get(
				"https://api.themoviedb.org/3/movie/" +
					id +
					"/credits?api_key=f4a943efca00a3cd96ac56ff8ad1ea3c"
			);
			this.actors = actorResponse.data.cast;
		},
		sortActors() {
			this.actors.sort(this.compareActors);
		}
	},
	async mounted() {
		await this.fetchMovie(this.id);
		await this.fetchActors(this.id);
		this.sortActors();
	}
};
</script>

<template>
	<div class="title">
		{{ movie.title }}
		<!-- {{ movie.release_date }}  this works -->
		<!-- {{ movie.release_date.split("-")[0] }} -->
		<!--but this somehow doesn't-->
	</div>

	<div class="outer-flex">
		<div class="flex1">
			<img class="poster" :src="poster_url" />
		</div>

		<div class="flex2">
			<div class="overview">
				{{ movie.overview }}
			</div>

			<div class="starring">Starring:</div>

			<div class="actors" v-for="actor in actors.slice(0, 7)">
				{{ actor.name + ",\xa0 " }}
			</div>
		</div>
	</div>
</template>

<style>
.outer-flex {
	display: flex;
	flex-direction: row;
}

.flex1 {
	/* border: 1px solid black;  */

	width: 300px;
	margin: 1rem;
}

.flex2 {
	/* border: 1px solid black;  */
	margin: 1rem;
	width: 100rem;
}

.title {
	font-size: 1.5rem;
	font-weight: bold;
	padding: 1rem;
	margin-left: 5rem;
}

.poster {
	border-radius: 8%;
}

.actors {
	display: inline-block;
}

.starring {
	font-size: 1.2rem;
	margin-top: 1rem;
}
.overview {
}
</style>

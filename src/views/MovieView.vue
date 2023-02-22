<script>
import axios from "axios";
import HashtagCard from "../components/HashtagCard.vue";

export default {
	components: {
		HashtagCard
	},
	data() {
		return {
			id: window.location.pathname.split("/")[2],
			movie: {},
			actors: [],
			poster_url: "",
			hashtags: [],
			hashtagBtnClicked: false
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
			this.poster_url = `https://image.tmdb.org/t/p/w200${this.movie.poster_path}`;
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
		},
		async fetchHashtags(id) {
			const hashtagResponse = await axios.get(
				"http://localhost:8080/movie/" +
				id +
				"/hashtags"
			);
			this.hashtags = hashtagResponse.data;
		},
		addHashtagBtn() {
			this.hashtagBtnClicked = !this.hashtagBtnClicked;
		},
		async addHashtag(text) {
			const addHashtagResponse = await axios.post(
				"http://localhost:8080/movie/" +
				this.id +
				"/hashtag/add?text=" +
				text
			);
			this.fetchHashtags(this.id);
			this.addHashtagBtn();
		}
	},
	async mounted() {
		await this.fetchMovie(this.id);
		await this.fetchActors(this.id);
		this.sortActors();
		await this.fetchHashtags(this.id);
	}
};
</script>
<template>
	<div class="title">
		{{ movie.title }}
		<!-- {{ movie.release_date }}  this works
		{{ movie.release_date.split("-")[0] }} -->
		<!--but this somehow doesn't-->
	</div>

	<hr class="hr" />

	<div class="outer-flex">
		<div class="flex1">
			<img class="poster" :src="poster_url" />

			<div class="tagline">"{{ movie.tagline }}"</div>
		</div>

		<div class="flex2">
			<div class="overview">
				{{ movie.overview }}
			</div>

			<div class="starring">Starring</div>

			<div>
				<div class="actors" v-for="actor in actors.slice(0, 7)">
					{{ actor.name + ",\xa0 " }}
				</div>
			</div>

			<div class="rating">
				Rating: {{ "\xa0" + Math.round(movie.vote_average * 100) / 10 }} %
			</div>

			<div class="release">Release date: {{ "\xa0" + movie.release_date }}</div>
			
			<div class="hashtag">
				<HashtagCard
					v-for="hashtag in hashtags"
					:title="hashtag.text"
				/>
				<v-btn class="btn" @click="addHashtagBtn()" v-if=!hashtagBtnClicked>Add hashtag</v-btn>
			</div>

			<div v-if=hashtagBtnClicked>
				<div>
					<input class="hashtag-bar"
						placeholder="Add a hashtag"
						v-model="hashtagText"
					/>
				</div>
				<div class="btn-container">
					<v-btn class="btn" @click="addHashtagBtn()">Cancel</v-btn>
					<v-btn class="btn" @click="addHashtag(hashtagText)">Add</v-btn>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.outer-flex {
	display: flex;
	flex-direction: row;
	padding-top: 0.5rem;
}

.flex1 {
	width: 300px;
	margin: 1rem;
	margin-left: 10rem;
}

.flex2 {
	display: flex;
	flex-direction: column;
	margin: 1rem;
	margin-right: 10rem;
	margin-left: 3rem;
	width: 100rem;
}

.title {
	font-size: 1.5rem;
	font-weight: bold;
	padding: 0.5rem;
	text-align: center;
}

.poster {
	border-radius: 8%;
	border: 0.1rem solid black;
}

.tagline {
	text-align: center;
	margin-top: 0.5rem;
}

.actors {
	display: inline-block;
}

.starring {
	font-size: 1rem;
	margin-top: 1rem;
}

.rating {
	font-size: 1rem;
	margin-top: 1rem;
}

.release {
	font-size: 1rem;
	margin-top: 1rem;
}

.hashtag {
	margin-top: 1rem;
}

.btn-container {
	margin-top: 0.75rem;
}

.btn {
    margin: 0.5rem 0.25rem;
    padding: 6px;
	border: 0.01rem solid grey;
	border-radius: 1rem;
}

.btn:hover {
    background-color: var(--color-text);
}

.hashtag-bar {
	margin-top: 1rem;
	font-size: 1rem;
	max-width: 10rem;
}


.overview {
	/* width: 80vh;
  padding: 1rem;
	min-height: 10rem;
	border: 0.01rem solid grey;
  background-color: rgb(230, 227, 232);
	color: rgb(0, 0, 0);
	border-radius: 0.5rem; */
	font-size: 0.9rem;
}

.hr {
	border: 0;
	height: 2px;
	background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgb(0, 0, 0), rgba(0, 0, 0, 0));
	width: 80%;
	margin: auto;
}

</style>
<script>
import axios from "axios";
import HashtagCard from "../components/HashtagCard.vue";
import PlaylistModal from "../components/PlaylistModal.vue";

export default {
	components: {
		HashtagCard,
		PlaylistModal
	},
	data() {
		return {
			id: window.location.pathname.split("/")[2],
			movie: {},
			actors: [],
			poster_url: "",
			hashtags: [],
			hashtagBtnClicked: false,
			playlists: [],
			playlistBtnClicked: false
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
				"http://localhost:8080/movie/" + id + "/hashtags"
			);
			this.hashtags = hashtagResponse.data;
		},
		addHashtagBtn() {
			this.hashtagBtnClicked = !this.hashtagBtnClicked;
		},
		async addHashtag(text) {
			const addHashtagResponse = await axios.post(
				"http://localhost:8080/movie/" + this.id + "/hashtag/add?text=" + text
			);
			this.fetchHashtags(this.id);
			this.addHashtagBtn();
		},
		togglePlaylistBtn() {
			this.playlistBtnClicked = !this.playlistBtnClicked;
		},
		async fetchPlaylists() {
			const playlistResponse = await axios.get(
				"http://localhost:8080/" + "tm" + "/playlists/"
			);
			const playlists = JSON.parse(JSON.stringify(playlistResponse.data));

			var items = [];
			playlists.forEach((element) => {
				items.push({
					name: element.title,
					description: element.description,
					id: element.id
				});
			});

			this.playlists = items;
			console.log(this.playlists);
		}
	},
	async mounted() {
		await this.fetchMovie(this.id);
		await this.fetchActors(this.id);
		this.sortActors();
		await this.fetchHashtags(this.id);
		await this.fetchPlaylists();
	}
};
</script>
<template>
	<button @click="$router.push('/search')" class="back-button">Back</button>

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
				<div class="hashtag-container">
					<HashtagCard v-for="hashtag in hashtags" :title="hashtag.text" />
				</div>
				<v-btn class="btn" @click="addHashtagBtn()" v-if="!hashtagBtnClicked"
					>Add tag</v-btn
				>
			</div>

			<div v-if="hashtagBtnClicked">
				<input class="hashtag-bar" placeholder="Add a hashtag" v-model="hashtagText" />
				<div class="btn-container">
					<v-btn class="btn" @click="addHashtagBtn()">Cancel</v-btn>
					<v-btn class="btn" @click="addHashtag(hashtagText)">Add</v-btn>
				</div>
			</div>
			<div class="hashtag">
				<v-btn class="btn" @click="togglePlaylistBtn()"> Add Movie to Playlist </v-btn>
			</div>

			<PlaylistModal
				v-show="playlistBtnClicked"
				@close-modal="playlistBtnClicked = false"
				:playlists="playlists"
			/>
			<!--<PlaylistModal
				v-model="playlistBtnClicked"
				title="Hello World!"
				@confirm="()=> togglePlaylistBtn()"
				>
			</PlaylistModal>-->
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

.back-button {
	margin-top: 1rem;
	margin-left: 1rem;
	width: 75px;
	height: 30px;
	border: none;
	color: hsla(260, 41%, 35%, 0.785);
	cursor: pointer;
	background-color: hsla(260, 35%, 60%, 0.25);
}

.title {
	font-size: 1.5rem;
	font-weight: bold;
	padding: 0.5rem;
	text-align: center;
	padding-top: 0px;
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

.hashtag-container {
	display: flex;
	flex-direction: row;
	margin-bottom: 1rem;
}

.btn-container {
	margin-top: 0.75rem;
}

.btn {
	margin: 0.5rem 0.25rem;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
	color: hsla(260, 41%, 35%, 0.785);
	cursor: pointer;
	background-color: hsla(260, 35%, 60%, 0.25);
}

.btn:hover {
	background-color: var(--color-text);
}

.hashtag-bar {
	width: 10rem;
	font-size: 1rem;
	height: 1rem;
	border-radius: 0.5rem;
	padding: 1rem;
	border: grey solid 1px;
	margin-bottom: 1rem;
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

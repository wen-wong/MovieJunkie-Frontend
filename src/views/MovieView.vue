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
			const username = this.$cookies.get("username");
			const playlistResponse = await axios.get(
				"http://localhost:8080/" + username + "/playlists/"
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
	<button @click="$router.push('/search')" class="btn back-button">Back</button>
	<div class="movie-container">
		<div class="movie-header">
			<div class="title">
				{{ movie.title }}
			</div>
			<hr class="hr" />
		</div>
		<div class="movie-poster">
			<img class="poster" :src="poster_url" />
			<div class="tagline">"{{ movie.tagline }}"</div>
		</div>
		<div class="movie-content">
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
					Rating:
					<span class="movie-descr"
						>{{ "\xa0" + Math.round(movie.vote_average * 100) / 10 }} %</span
					>
				</div>
				<div class="release">
					Release date: <span class="movie-descr">{{ "\xa0" + movie.release_date }}</span>
				</div>
				<div class="hashtag">
					<div class="hashtag-container">
						<HashtagCard v-for="hashtag in hashtags" :title="hashtag.text" />
					</div>
					<button class="btn" @click="addHashtagBtn()" v-if="!hashtagBtnClicked">
						Add tag
					</button>
				</div>
				<div v-if="hashtagBtnClicked">
					<input class="hashtag-bar" placeholder="Add a hashtag" v-model="hashtagText" />
					<div class="btn-container">
						<button class="btn" @click="addHashtagBtn()">Cancel</button>
						<button class="btn" @click="addHashtag(hashtagText)">Add</button>
					</div>
				</div>
				<div class="hashtag">
					<button class="btn" @click="togglePlaylistBtn()">Add Movie to Playlist</button>
				</div>
				<PlaylistModal
					v-show="playlistBtnClicked"
					@close-modal="playlistBtnClicked = false"
					:playlists="playlists"
				/>
			</div>
		</div>
	</div>

	<div class="outer-flex"></div>
</template>

<style>
.movie-container {
	width: 100vw;
	height: 100%;
	display: grid;
	align-items: center;
	grid-template-areas:
		"header header header header"
		"sidebar main main main";
}
.movie-header {
	grid-area: header;
	margin-bottom: 1rem;
}
.movie-poster {
	grid-area: sidebar;
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-self: flex-start;
}
.movie-content {
	grid-area: main;
}
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
	margin: 1rem 1rem 1rem 3rem;
}

.back-button {
	margin-top: 1rem !important;
	margin-left: 1rem !important;
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
	border-radius: 0.5rem;
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
	font-size: 1.25rem;
	font-weight: bold;
	margin-top: 1rem;
}

.rating {
	font-size: 1.25rem;
	font-weight: bold;
	margin-top: 1rem;
}

.release {
	font-size: 1.25rem;
	font-weight: bold;
}

.movie-descr {
	font-weight: normal;
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
	padding: 0.75rem 1.25rem;
	border-radius: 0.5rem;
	color: hsla(260, 41%, 35%, 0.785);
	font-size: 1rem;
	border: none;
	background: hsla(260, 35%, 60%, 0.25);
	cursor: pointer;
}

.btn:hover {
	background-color: white;
	border: 1px solid hsla(260, 41%, 35%, 0.785);
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
	font-size: 1rem;
	overflow-wrap: break-word;
}

.hr {
	border: 0;
	height: 2px;
	background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgb(0, 0, 0), rgba(0, 0, 0, 0));
	width: 80%;
	margin: auto;
}
</style>

<script>
import axios from "axios";

export default {
	data() {
		return {
			id: window.location.pathname.split("/")[2],
			movie: {},
      actors: [],
			poster_url: "",
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
		<!-- {{ movie.release_date }}  this works
		{{ movie.release_date.split("-")[0] }} --> 
		<!--but this somehow doesn't-->
  </div>

  <hr class="hr"/>

  <div class="outer-flex"> 
    <div class="flex1">   
			<img class="poster" :src="poster_url" />

      <div class="tagline">
      "{{ movie.tagline }}"
      </div>
    </div>

    <div class="flex2">
      <div class="overview">
        {{ movie.overview }}
      </div>

      <div class="starring">
        Starring
      </div>
    
      <div>
			<div class="actors" v-for="actor in actors.slice(0, 7)">
				{{ actor.name + ",\xa0 " }}
      </div>
      </div>
     
      <div class="rating">
        Rating: {{"\xa0" + Math.round(movie.vote_average * 100) / 10}} %
      </div>
     
      <div class="release">
        Release date: {{"\xa0" + movie.release_date}} 
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
  text-align:center;
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
  width:80%;
  margin:auto;
}

</style>
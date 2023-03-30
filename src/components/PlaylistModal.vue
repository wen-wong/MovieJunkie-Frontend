<script>
import axios from "axios";
export default {
	props: ["playlists"],
	methods: {
		async addMovieToPlaylist() {
			const tableRows = document.getElementsByClassName("playlist-row");
			console.log(tableRows);
			const movieId = window.location.pathname.split("/")[2];

			for (let item of tableRows) {
				if (item.lastChild.firstChild.checked) {
					console.log(item.firstChild.textContent);
					const playlistId = item.firstChild.textContent;
					const username = this.$cookies.get("username")
					const response = await axios.put(
						"http://localhost:8080/" +
							username +
							"/playlist/" +
							playlistId +
							"/add/?movieIds=" +
							movieId
					);
					console.log(response);
				}
			}

			console.log();
		},
		submitModal() {
			this.addMovieToPlaylist();
			console.log("Closing modal");
			this.$emit("close-modal", 0);
		}
	}
};
</script>

<template>
	<div class="modal-overlay" @click="$emit('close-modal')">
		<div class="modal" @click.stop>
			<div >
				<div class="title">Choose a Playlist</div>
				<table class="table-layout">
					<thead slot="head">
						<th>Id</th>
						<th>Name</th>
						<th>Select Playlist</th>
					</thead>
					<tbody slot="body" slot-scope="{ playlists }">
						<tr class="playlist-row" v-for="row in playlists" :row="row">
							<td>{{ row.id }}</td>
							<td>{{ row.name }}</td>
							<td><input type="checkbox" name="name1" class="checkbox"/></td>
						</tr>
					</tbody>
				</table>
				<v-btn class="btn-modal" @click="submitModal()"> Submit </v-btn>
			</div>
		</div>
	</div>
</template>

<style scoped>
.modal-overlay {
	color: hsl(260, 78%, 78%);
	position: absolute;
    top:0;
    left: 0;
    right: 0;
    
    margin: auto;
	display: flex;
	justify-content: center;
}

.modal {
	text-align: center;
	outline-color: white;
	background-color:  rgb(34, 34, 34);
	outline-width: 2;
	margin-top: 10%;
	padding: 60px 0;
	border-radius: 20px;	
	justify-content: center;
}

.container-div {
	background-color: #222222;
}

.table-layout {
	table-layout: fixed;
    width: 300px;
	
}

.playlist-row {
	margin-top: 10%;
	padding: 30px 0;
	text-align: center;
	border-radius: 10px;
}

.checkbox{
	width: 75px;
	height: 30px;
}
.btn-modal {
	margin: 0.5rem 0.25rem;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
	color: hsl(260, 78%, 78%);
	cursor: pointer;
	background-color: hsla(260, 35%, 60%, 0.25);
}
</style>

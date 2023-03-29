<template>
	<div class="modal-overlay" @click="$emit('close-modal')">
		<div class="modal" @click.stop>
			<div>
				<div class="title">Choose a Playlist</div>
				<table>
					<thead slot="head">
						<th>Id</th>
						<th>Name</th>
						<th>Select Playlist</th>
					</thead>
					<tbody slot="body" slot-scope="{ playlists }">
						<tr class="playlist-row" v-for="row in playlists" :row="row">
							<td>{{ row.id }}</td>
							<td>{{ row.name }}</td>
							<td><input type="checkbox" name="name1" checked="false" /></td>
						</tr>
					</tbody>
				</table>
				<v-btn class="btn" @click="submitModal()"> Submit </v-btn>
			</div>
		</div>
	</div>
</template>

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
					const response = await axios.put(
						"http://localhost:8080/" +
							"tm" +
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

<style scoped>
.modal-overlay {
	position: fixed;
	color: hsla(260, 41%, 35%, 0.785);
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
}

.modal {
	text-align: center;
	outline-color: white;
	background-color: white;
	outline-width: 2;
	margin-top: 10%;
	padding: 60px 0;
	border-radius: 20px;
}

.playlist-row {
	margin-top: 10%;
	padding: 60px 0;
	text-align: center;
	border-radius: 20px;
	background-color: white;
}
</style>

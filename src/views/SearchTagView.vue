<script>
import axios from "axios";
import { isProxy, toRaw } from "vue";

export default {
	data() {
		return {
			tagList: [],
			isTagList: false,
			selectedTagList: []
		};
	},
	methods: {
		changeSelection(index) {
			this.tagList[index].isActive = !this.tagList[index].isActive;
			this.tagList[index].isActive
				? this.selectedTagList.push(this.tagList[index])
				: this.selectedTagList.pop();
		},
		async fetchTags() {
			const tagResponse = await axios.get(`http://localhost:8080/hashtags`);
			this.tagList = tagResponse.data.result;
			if (this.tagList != undefined) {
				this.tagList.map((it) => {
					return {
						name: it.text,
						isActive: false
					};
				});
				console.log(this.tagList);
			}
			this.isTagList =
				this.tagList != undefined && this.tagList.length != null && this.tagList.length > 0;
		},
		async searchTags(event) {
			if (!event.target.value) {
				this.isTagList = false;
				return;
			}
			console.log(event.target.value);
			const tagResponse = await axios.get(
				`http://localhost:8080/hashtag/incomplete?hashtags=${event.target.value}`
			);
			this.tagList = tagResponse.data.results;
			this.isTagList = this.tagList.length != null && this.tagList.length > 0;
		}
	},
	async mounted() {
		await this.fetchTags();
	}
};
</script>
<template>
	<div class="search-tag-container">
		<div class="tag-container">
			<div class="tag-list-title">Choose your favorite tags</div>
			<div class="tag-list-search-container">
				<label for="tag-search">Search a tag</label>
				<input
					class="tag-input-search"
					type="search"
					name="tag-search"
					placeholder="Search for your favorite tags"
					@input="searchTags"
				/>
			</div>
			<div class="tag-list-container">
				<div
					v-for="(tag, index) in tagList"
					:keys="tag.name"
					:class="tag.isActive ? 'tag-search-active' : 'tag-search'"
					@click="changeSelection(index)"
				>
					{{ tag.name }}
				</div>
			</div>
		</div>
		<div class="tag-movie-container">
			<div v-for="tag in selectedTagList" class="tag-search-active">
				{{ tag.name }}
			</div>
		</div>
	</div>
</template>
<style>
.search-tag-container {
	margin: 5rem 0rem;
	width: 100vw;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}
.tag-container {
	width: 60%;
	padding: 2rem;
	background-color: white;
	border-radius: 1rem;
	box-shadow: 0px 5px 10px hsl(0, 0%, 50%);
}
.tag-list-title {
	font-weight: bold;
	margin-bottom: 1rem;
}
.tag-list-container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.tag-search {
	margin: 0.25rem 0.25rem;
	padding: 0.15rem 1rem;
	border-radius: 2rem;
	border: 1px solid #6a40bf;
	color: #6a40bf;
}
.tag-search:hover {
	margin: 0.25rem 0.25rem;
	padding: 0.15rem 1rem;
	border-radius: 2rem;
	border: 1px solid #6a40bf;
	color: white;
	background-color: #6a40bf;
}
.tag-search-active {
	margin: 0.25rem 0.25rem;
	padding: 0.15rem 1rem;
	border-radius: 2rem;
	border: 1px solid #6a40bf;
	color: white;
	background-color: #6a40bf;
}
.tag-movie-container {
	width: 60%;
	margin-top: 2rem;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.tag-input-search {
	width: 100%;
	font-size: 1rem;
	height: 1rem;
	border-radius: 0.5rem;
	padding: 1.5rem;
}
</style>

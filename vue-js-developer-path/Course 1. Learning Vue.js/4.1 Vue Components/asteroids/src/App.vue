<template>
	<div id="app">
		<AsteroidGrid
			:asteroids="asteroids"
			header="Near-Earth Objects"
			@remove="remove"
		></AsteroidGrid>
	</div>
</template>

<script>
import AsteroidGrid from "./components/AsteroidGrid.vue";
import axios from "axios";

export default {
	elname: "#app",
	components: {
		AsteroidGrid,
	},
	data() {
		return { asteroids: [] };
	},
	created() {
		this.fetchAsteroids();
	},
	methods: {
		remove: function(index) {
			this.asteroids.splice(index, 1);
		},
		fetchAsteroids: function() {
			let apiKey = "VR4DiS8WBwlNO88DyuEashtHn9HmsI49Ud6Uo7RQ";
			let url = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" + apiKey;
			axios
				.get(url)
				.then(res => (this.asteroids = res.data.near_earth_objects));
		},
	},
};
</script>

<style>
[v-cloak] {
	display: none;
}
</style>

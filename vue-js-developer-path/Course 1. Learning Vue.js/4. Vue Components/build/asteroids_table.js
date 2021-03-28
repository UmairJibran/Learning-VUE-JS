// requires stylesheet and vue to be loaded before
Vue.component("asteroids-table", {
	data: function () {
		return { show_details: true };
	},
	props: ["asteroids", "header"],
	computed: {
		near_earth_objects: function () {
			return this.asteroids.length;
		},
		nearest_earth_object: function () {
			let filtered_asteroids = this.asteroids.filter(function (object) {
				return object.close_approach_data.length > 0;
			});
			let simplified_asteroids = filtered_asteroids.map(function (asteroid) {
				return {
					name: asteroid.name,
					miss_distance: asteroid.close_approach_data[0].miss_distance.lunar,
				};
			});
			let sorted_asteroids_by_miss_distance = simplified_asteroids.sort(
				function (a, b) {
					return a.miss_distance - b.miss_distance;
				}
			);
			return sorted_asteroids_by_miss_distance[0].name;
		},
	},
	methods: {
		getCloseDate: function (asteroid) {
			return asteroid.close_approach_data.length > 0
				? asteroid.close_approach_data[0].close_approach_date
				: "N/A";
		},
		remove: function (index) {
			this.$emit("remove", index);
		},
	},
	template:
		'\
        <div>\
            <h2 class="text-5xl">{{header}}</h2>\
			<p\
				class="text-base"\
				v-cloak\
				v-if="near_earth_objects > 0 && show_details"\
			>\
				Showing {{near_earth_objects}} item(s)\
			</p>\
			<p\
				class="text-base"\
				v-cloak\
				v-if="near_earth_objects > 0 && show_details"\
			>\
				Nearest of them all:\
				<span class="font-bold text-lg">{{nearest_earth_object}}</span>\
			</p>\
			<a href="#" @click="show_details = !show_details">Show/Hide Details</a>\
			<table class="table-auto">\
				<thead>\
					<tr>\
						<th>#</th>\
						<th>Name</th>\
						<th>Close Approach Date</th>\
						<th>Miss Distance</th>\
						<th>Remove</th>\
					</tr>\
				</thead>\
				<tbody v-cloak>\
					<tr\
						v-for="(asteroid, index) in asteroids"\
						:key="asteroid.neo_reference_id"\
						class="border border-bottom"\
					>\
						<td>{{index + 1}}</td>\
						<td>{{asteroid.name}}</td>\
						<td>{{getCloseDate(asteroid)}}</td>\
						<td>\
							<ul v-if="asteroid.close_approach_data">\
								<li\
									v-for="(value,key) in asteroid.close_approach_data[0].miss_distance"\
								>\
									{{key}}: {{value}}\
								</li>\
							</ul>\
						</td>\
						<td>\
							<button\
								@click="remove(index)"\
								class="px-4 py-2 bg-yellow-400 border rounded-md"\
							>\
								Remove\
							</button>\
						</td>\
					</tr>\
				</tbody>\
			</table>\
            </div>\
    ',
});

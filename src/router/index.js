import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";
import MovieView from "../views/MovieView.vue";
import ErrorView from "../views/ErrorView.vue";
import SignupView from "../views/SignupView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView
		},
		{
			path: "/movies",
			name: "movies",
			component: SearchView
		},
		{
			path: "/movies/:id",
			name: "movie",
			component: MovieView
		},
		{
			path: "/:catchAll(.*)",
			name: "error",
			component: ErrorView
		},
		{
			path: "/signup",
			name: "signup",
			component: SignupView
		}
	]
});

export default router;

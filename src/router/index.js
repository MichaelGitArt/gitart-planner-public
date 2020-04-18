import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import ProfileGeneral from '@/views/Profile/General.vue';
import ProfilePersonal from '@/views/Profile/Personal.vue';

import store from '@/store'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/auth',
		name: 'Auth',
		beforeEnter: authStatus(false),
		component: () => import('@/views/Auth/Auth.vue')
	},
	{
		path: '/myprofile',
		name: 'MyProfile',
		beforeEnter: authStatus(true),
		component: ProfilePersonal
	},
	{
		path: '/profile/:slug',
		name: 'Profile',
		props: true,
		beforeEnter: authStatus(true),
		component: ProfileGeneral
	},
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router

// Check authentication status
function authStatus(status = false) {
	return (to, from, next) => {
		if (store.getters.userChecked) {
			authStatusSwitch(status, store.getters.user, next, from);
		} else {
			store.watch(state => state.auth.checked, () => {
				authStatusSwitch(status, store.getters.user, next, from);
			})
		}
	};
}

function authStatusSwitch(status, user, next, from) {
	switch (true) {
		case Boolean(!status && !user):
			return next();
		case Boolean(!status && user):
			return next(from);
		case Boolean(status && user):
			return next();
		case Boolean(status && !user):
			return next(from);
	}
}
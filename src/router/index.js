import Vue from 'vue'
import VueRouter from 'vue-router'
import multiguard from 'vue-router-multiguard';

import Home from '@/views/Home.vue'
import ProfileGeneral from '@/views/Profile/General.vue';
import ProfilePersonal from '@/views/Profile/Personal.vue';
import ProfileEdit from '@/views/Profile/Edit.vue';

import GroupMain from '@/views/Group/Main'
import GroupAdd from '@/views/Group/Add/Main'
import GroupJoin from '@/views/Group/Add/Join'
import GroupCreate from '@/views/Group/Add/Create'

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
		component: ProfilePersonal,
		children: [
			{
				path: 'edit',
				name: 'MyProfileEdit',
				component: ProfileEdit
			}
		]
	},
	{
		path: '/profile/:slug',
		name: 'Profile',
		props: true,
		beforeEnter: authStatus(true),
		component: ProfileGeneral
	},

	{
		path: '/group',
		name: 'GroupMain',
		beforeEnter: authStatus(true),
		component: GroupMain,
	},
	{
		path: '/group/add',
		name: 'GroupAdd',
		beforeEnter: multiguard([
			authStatus(true),
			(to, from, next) => {
				if (to.name === "GroupAdd") {
					next({ name: "GroupCreate" });
				}
				next();
			}
		]),
		component: GroupAdd,
		children: [
			{
				path: 'join',
				name: 'GroupJoin',
				component: GroupJoin
			},
			{
				path: 'create',
				name: 'GroupCreate',
				component: GroupCreate
			},
		]
	}
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
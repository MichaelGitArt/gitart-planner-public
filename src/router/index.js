import Vue from 'vue';
import VueRouter from 'vue-router';
import multiGuard from 'vue-router-multiguard';

import Home from '@/views/Home.vue';
import ProfileGeneral from '@/views/Profile/General.vue';
import ProfilePersonal from '@/views/Profile/Personal.vue';
import ProfileEdit from '@/views/Profile/Edit.vue';

import GroupMain from '@/views/Group/Main';
import GroupAdd from '@/views/Group/Add/Main';
import GroupJoin from '@/views/Group/Add/Join';
import GroupCreate from '@/views/Group/Add/Create';
import GroupSingle from '@/views/Group/Single/Main';

import store from '@/store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/auth',
		name: 'Auth',
		beforeEnter: authStatus(false),
		component: () => import('@/views/Auth/Auth.vue'),
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
				component: ProfileEdit,
			},
		],
	},
	{
		path: '/profile/:slug',
		name: 'Profile',
		props: true,
		beforeEnter: authStatus(true),
		component: ProfileGeneral,
	},

	{
		path: '/group',
		name: 'GroupMain',
		beforeEnter: authStatus(true),
		component: GroupMain,
	},
	{
		path: '/group/:code',
		name: 'GroupSingle',
		component: GroupSingle,
		props: true,
		beforeEnter: multiGuard([
			authStatus(true),
			(to, from, next) => {
				let time2 = Date.now();
				store.dispatch('group/fetchGroup', to.params.code).then((result) => {
					console.log(Date.now() - time2);
					if (result.success) {
						to.params.group = result.group;
						next();
					} else {
						switch (result.statusCode) {
							case 404:
								next('/404');
								break;
							default:
								next(from);
								store.$toast.open({
									message: result.statusCode + ': ' + result.message,
									type: 'error',
								});
						}
					}
				});
			},
		]),
	},
	{
		path: '/group-add',
		name: 'GroupAdd',
		beforeEnter: multiGuard([
			authStatus(true),
			(to, from, next) => {
				// If we are on top level route for adding group, move to child.
				// In the top level we have only tabs
				if (to.name === 'GroupAdd') {
					next({ name: 'GroupCreate' });
				}
				next();
			},
		]),
		component: GroupAdd,
		children: [
			{
				path: 'join',
				name: 'GroupJoin',
				component: GroupJoin,
			},
			{
				path: 'create',
				name: 'GroupCreate',
				component: GroupCreate,
			},
		],
	},
	{
		path: '/404',
		name: 'NotFound',
		component: () => import('@/views/Error/404.vue'),
	},
	{
		path: '*',
		component: () => import('@/views/Error/404.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;

// Check authentication status
function authStatus(status = false) {
	return (to, from, next) => {
		if (store.getters['auth/userChecked']) {
			authStatusSwitch(status, store.getters['auth/user'], next, from);
		} else {
			store.watch(
				(state) => state.auth.checked,
				() => {
					authStatusSwitch(status, store.getters['auth/user'], next, from);
				},
			);
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

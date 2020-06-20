import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';
import ProfileGeneral from '@/views/Profile/General.vue';
import ProfilePersonal from '@/views/Profile/Personal.vue';
import ProfileEdit from '@/views/Profile/Edit.vue';

import GroupMain from '@/views/Group/Main';
import GroupAdd from '@/views/Group/Add/Main';
import GroupJoin from '@/views/Group/Add/Join';
import GroupCreate from '@/views/Group/Add/Create';

import GroupSingle from '@/views/Group/Single/Main';
import GroupSingleFlow from '@/views/Group/Single/Flow';
import GroupSingleMembers from '@/views/Group/Single/Members';
import GroupSingleSchedule from '@/views/Group/Single/Schedule';
import GroupSingleSettings from '@/views/Group/Single/Settings';

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
		beforeEnter: authStatus(true),
		redirect: { name: 'GroupSingleFlow' },
		children: [
			{
				path: '/',
				props: true,

				name: 'GroupSingleFlow',
				component: GroupSingleFlow,
			},
			{
				path: 'm',
				name: 'GroupSingleMembers',
				component: GroupSingleMembers,
			},
			{
				path: 's',
				name: 'GroupSingleSchedule',
				component: GroupSingleSchedule,
			},
			{
				path: 'admin',
				name: 'GroupSingleSettings',
				component: GroupSingleSettings,
				beforeEnter(to, from, next) {
					store
						.dispatch('group/single/getGroup', to.params.code)
						.then((group) => {
							if (group.isAdmin) return next();

							store.$toast.error('Сорі, але ти не староста групи');
							next({
								name: 'GroupSingleFlow',
								params: { code: to.params.code },
							});
						});
				},
			},
		],
	},
	{
		path: '/group-add',
		name: 'GroupAdd',
		beforeEnter: authStatus(true),
		component: GroupAdd,
		redirect: { name: 'GroupCreate' },
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

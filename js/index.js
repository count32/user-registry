var users = [
	{id: 1, name: 'Jane', surname: 'Doe', email: 'Jane@gmail.com', zipcode: 14892},
	{id: 2, name: 'Joe', surname: 'Doe', email: 'JoeD@gmail.com', zipcode: 12098},
	{id: 3, name: 'Cleo', surname: 'Doe', email: 'Cleo@yahoo.com', zipcode: 13030}
];

function findUser (userId) {
	return users[findUserKey(userId)];
};

function findUserKey (userId) {
	for (var key = 0; key < users.length; key++) {
		if (users[key].id == userId) {
			return key;
		}
	}
};

var List = Vue.extend({
	template: '#user-list',
	data: function () {
		return {users: users, searchKey: ''};
	}
});

var User = Vue.extend({
	template: '#user',
	data: function () {
		return {user: findUser(this.$route.params.user_id)};
	}
});

var UserEdit = Vue.extend({
	template: '#user-edit',
	data: function () {
		return {user: findUser(this.$route.params.user_id)};
	},
	methods: {
		updateUser: function () {
			var user = this.$get('user');
			users[findUserKey(user.id)] = {
				id: user.id,
				name: user.name,
				surname: user.surname,
				email: user.email,
				zipcode: user.zipcode
			};
			router.go('/');
		}
	}
});

var UserDelete = Vue.extend({
	template: '#user-delete',
	data: function () {
		return {user: findUser(this.$route.params.user_id)};
	},
	methods: {
		deleteUser: function () {
			users.splice(findUserKey(this.$route.params.user_id), 1);
			router.go('/');
		}
	}
});

var AddUser = Vue.extend({
	template: '#add-user',
	data: function () {
		return {user: {name: '', surname: '', email: '', zipcode: ''}
		}
	},
	methods: {
		createUser: function() {
			var user = this.$get('user');
			users.push({
				id: Math.random().toString().split('.')[1],
				name: user.name,
				surname: user.surname,
				email: user.email,
				zipcode: user.zipcode
			});
			router.go('/');
		}
	}
});

var router = new VueRouter();
router.map({
	'/': {component: List},
	'/user/:user_id': {component: User, name: 'user'},
	'/add-user': {component: AddUser},
	'/user/:user_id/edit': {component: UserEdit, name: 'user-edit'},
	'/user/:user_id/delete': {component: UserDelete, name: 'user-delete'}
})
	.start(Vue.extend({}), '#app');

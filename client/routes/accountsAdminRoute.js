var AccountsAdminController = RouteController.extend({
    template: 'accountsAdmin'
});

Router.map(function () {
    this.route('accountsAdmin', {
        path :  '/accountsAdmin',
        controller :  AccountsAdminController,
		onBeforeAction: function() {
			if (Meteor.loggingIn()) {
				this.render(this.loadingTemplate);
			} else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
				this.redirect('/');
			}
		}
    });
});


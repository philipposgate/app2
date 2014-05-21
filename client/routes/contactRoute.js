var ContactController = RouteController.extend({
    template: 'contact'
});

Router.map(function () {
    this.route('contact', {
        path :  '/contact',
        controller :  ContactController,
		waitOn: function() {
		    return Meteor.subscribe('voltagePages');
		},
		action: function() {
		    Voltage.render(this);
		}        
    });
});


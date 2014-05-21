var AboutController = RouteController.extend({
    template: 'about'
});

Router.map(function () {
    this.route('about', {
        path :  '/about',
        controller :  AboutController,
		waitOn: function() {
		    return Meteor.subscribe('voltagePages');
		},
		action: function() {
		    Voltage.render(this);
		}        
    });
});


Template['navbar'].helpers({
		activeIfTemplateIs: function (template) {
	      var currentRoute = Router.current();
		  return currentRoute && template === currentRoute.lookupTemplate() ? 'active' : '';
	    }		
});

Template['navbar'].events({
});

Template['navbar'].rendered = function() {
	var thisTemplate = this;
	thisTemplate.$('.navbar-collapse').click('li', function() {
	  thisTemplate.$('.navbar-collapse').collapse('hide');
	});
};
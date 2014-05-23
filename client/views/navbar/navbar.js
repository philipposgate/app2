Template['navbar'].helpers({
		activeIfTemplateIs: function (template) {
	      var currentRoute = Router.current();
		  return currentRoute && template === currentRoute.lookupTemplate() ? 'active' : '';
	    }		
});

Template['navbar'].events({
});


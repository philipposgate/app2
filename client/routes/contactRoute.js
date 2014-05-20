var ContactController = RouteController.extend({
    template: 'contact'
});

Router.map(function () {
    this.route('contact', {
        path :  '/contact',
        controller :  ContactController
    });
});


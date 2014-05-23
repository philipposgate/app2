var CalendarController = RouteController.extend({
    template: 'calendar'
});

Router.map(function () {
    this.route('calendar', {
        path :  '/calendar',
        controller :  CalendarController
    });
});


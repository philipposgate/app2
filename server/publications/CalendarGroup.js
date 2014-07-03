Meteor.publish('CalendarGroup', function () {
	console.log("userID: " + this.userId);
    return CalendarGroup.find();
});

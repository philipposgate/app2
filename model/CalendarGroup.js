CalendarGroup = new Meteor.Collection('CalendarGroup');

// Collection2 already does schema checking"
// Add custom permission rules if needed"
CalendarGroup.allow({
    insert : function () {
        return true;
    },
    update : function () {
        return true;
    },
    remove : function () {
        return true;
    }
});

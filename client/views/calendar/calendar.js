
/** GLOBAL VARS */


Template['calendar'].helpers({
});

Template['calendar'].events({
});

Template['calendar'].created = function() {

	var thisTemplate = this;
	

	this.onShow_editTip = function()
	{
		//$("body").stepDelay(500, function() {$("#qtip-editTip").find("input.editTipWhat").focus();});
		$("#qtip-editTip").find("input.editTipWhat").focus();
	}
	

};

Template['calendar'].rendered = function() {

	var thisTemplate = this;
	
	// populated when user clicks/selects day(s)
	var selection = new Object(); 

	//SHOW viewTip ON EVENT-CLICK
	var viewTip = $('<div/>').qtip({
		id: 'viewTip',
		content: {
			text: ' ',
			title: {
				text: 'Create Event',
				button: true
			}
		},
		position: {
			my: 'bottom center',
			at: 'top center',
			target: 'mouse',
			viewport: thisTemplate.$('#calendar'),
			adjust: {
				mouse: false,
				scroll: false
			}
		},
		show: false,
		hide: false,
		style: 'qtip-bootstrap'
	}).qtip('api');
	
	// SHOW editTip ON DAY-CLICK
	var editTip = $('<div/>').qtip({
		id: 'editTip',
		show: false,
		hide: false,
		content: {
			text: ' ',
			title: {
				text: 'Create Event',
				button: true
			}
		},
		position: {
			my: 'bottom center',
			at: 'top center',
			target: 'mouse',
			viewport: thisTemplate.$('#calendar'),
			adjust: {
				mouse: false,
				scroll: false
			}
		},
		style: {
			classes: 'qtip-bootstrap'
		},
		events: {
			show: thisTemplate.onShow_editTip,
			move: thisTemplate.onShow_editTip
		}
	}).qtip('api');
	
	var getWhenText = function(startDate, endDate, allDay)
	{
		if (allDay)
		{
			if (!endDate || startDate.format('yyyyMMDD') == endDate.format('yyyyMMDD'))
			{
				return startDate.format('ddd, MMMM D');
			}
			else
			{
				return startDate.format('ddd, MMMM D') + " to " + endDate.format('ddd, MMMM d');
			}
		}
		else
		{
			if (startDate.format('yyyyMMDD') == endDate.format('yyyyMMDD'))
			{
				return startDate.format('ddd, MMMM D, h:mm a') + " to " + endDate.format('h:mm a');
			}
			else
			{
				return startDate.format('ddd, MMMM D, h:mm a') + " to " + endDate.format('ddd, MMMM D, h:mm a');
			}
		}
	}
	
	// Initialize FullCalendar
  	var initdate = new Date();
	var d = initdate.getDate();
	var m = initdate.getMonth();
	var y = initdate.getFullYear();

	this.$("#calendar").fullCalendar({header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			allDaySlot: true,
			selectable: true,
			editable: true,

			eventClick: function(data, jsEvent, view) {
				editTip.hide();
		
				var content = '<div class="viewTipWhen">' +
				'<h4>'+data.title+'</h4>' + 
				'<p>' + getWhenText(data.start, data.end, data.allDay) + '</p>';
				
				if (data.repeats && data.rrule)
				{
					var rule = new RRule(RRule.parseString(data.rrule));
					content += '<p>Repeats: ' + rule.toText() + '</p>';
		
				}
				
				if (data.location)
				{
					content += '<p>Location: ' + data.location + '</p>';
				}
				
				content += '<br /><a href="javascript:void(0)" class="btn btn-small btn-inverse editEventBtn" data-event-id="' + data.id + '">Edit Event</a>' +
				' <a href="javascript:void(0)" class="btn btn-small btn-danger deleteEventBtn">Delete Event</a>' +
				'</div>';
		
				//viewTip.set('content.title', data.calendar.title);
				viewTip.set('content.title', "Calendar Title");
				
				viewTip.set('content.text', content);
				viewTip.set('event_data', data);
				viewTip.reposition(jsEvent).show(jsEvent);
		
				$(".qtip-titlebar", "#qtip-viewTip").css("color", data.textColor);
				$(".qtip-titlebar", "#qtip-viewTip").css("background-color", data.color);
			},

	        dayClick: function(date, jsEvent, view) {
       			// FIRED WHEN USER CLICKS ON A DAY/TIME-SLOT 
				viewTip.hide();
				
				// FIRED WHEN USER CLICKS ON A DAY/TIME-SLOT 
				selection.startDate = date;
				selection.endDate = date;
				//selection.allDay = allDay;
			
				var editTipWhen = date.format('ddd, MMMM D');
				var content = $(".editTipContent");
				$(content).find(".editTipWhen").html(editTipWhen);
				$(content).find("input.editTipWhat").val("");
				
				editTip.set('content.text', content);
				editTip.reposition(jsEvent).show(jsEvent);

	        },

			events: [
				{
					title: 'All Day Event',
					start: new Date(y, m, 1),
					allDay: true
				},
				{
					title: 'Long Event',
					start: new Date(y, m, d-5),
					end: new Date(y, m, d-2)
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: new Date(y, m, d-3, 16, 0),
					allDay: true
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: new Date(y, m, d+4, 16, 0),
					allDay: true
				},
				{
					title: 'Meeting',
					start: new Date(y, m, d, 10, 30),
					allDay: true
				},
				{
					title: 'Lunch',
					start: new Date(y, m, d, 12, 0),
					end: new Date(y, m, d, 14, 0),
					allDay: false
				},
				{
					title: 'Birthday Party',
					start: new Date(y, m, d+1, 19, 0),
					end: new Date(y, m, d+1, 22, 30),
					allDay: false
				},
				{
					title: 'Click for Google',
					start: new Date(y, m, 28),
					end: new Date(y, m, 29)
				}
			]
		});  
		
		// HIDE QTIPs when user clicks away 
 		$("body").on("click", function(event) {
 		    if (!$(event.target).closest("#calendar .fc-content").length && !$(event.target).closest("#qtip-editTip").length) {
 				viewTip.hide();
 				editTip.hide();
 		    }
 		});		

};



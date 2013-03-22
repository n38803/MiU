//Shaun Thompson
//MiU 1303 - Project 3 [modified JS file]
//03/21/2013

var parseTracker = function(data){
	console.log(data);
};

$('#tracker').on('pageinit', function(){
	var tracker = $('#calform'),
		errorslink = $('#errorslink')
	;
	
	tracker.validate({
		invalidHandler: function(form, validator){
			errorslink.click();
			var html = '';
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not('[generated]');
				var legend = label.closest('fieldset').find('.ui-controlgroup-label');
				var fieldName = legend.length ? legend.text() : label.text();
				html += '<li>'+ fieldName +'</li>';
			};
			$("#formerrors ul").html(html);
		},
		submitHandler: function(){
			var data = tracker.serializeArray();
			parseTracker(data);
		
			//find value of selected radio button
			function getSelectedRadio(){
				var radio = document.forms[0].group;
				for(var i=0; i<radio.length; i++){
					if(radio[i].checked){
						groupValue = radio[i].value;
					};
				};
			};

			//Save data into local storage
			function storeData(data){
				if(!(data)){
					var id = Math.floor(Math.random()*1000000001);
				}else{
					id = data;
				}
		
			//Gather up all our form field values and store them in an object
			//Object properties contain array with form label and input values

			getSelectedRadio();
			var item			= {};
				item.date		= ["Date: ", $('date').value];
				item.type		= ["Meal Type: ", $('type').value];
				item.group		= ["Food Group: ", groupValue];
				item.name		= ["Food Name: ", $('name').value];
				item.calories	= ["Calories: ", $('calories').value];
				item.notes		= ["Additional Notes: ", $('notes').value];
			//Save data to local storage
				localStorage.setItem(id, JSON.stringify(item));
			
	};
		
		}
	});


});
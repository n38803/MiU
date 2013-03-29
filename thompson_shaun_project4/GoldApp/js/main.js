//Shaun Thompson
//MiU 1303 - Project 4 [modified JS file]
//03/28/2013

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
	
			//clear all data
			function clearLocal(){
				if(localStorage.length === 0){
					alert("There is no data to clear!");
				}else{
					localStorage.clear();
					alert("All meals have been erased.");
					window.location.reload();
					return false;
				};
			};
			
			//Write data from local storage
			function getData(){
				if(localStorage.length === 0){
					alert("There are no meals currently tracked so default information has been loaded.");
					autoFill();
				};
				toggleControls("on");
				var makeDiv = document.createElement('div');
				makeDiv.setAttribute("id", "items");
				var makeList = document.createElement('ul');
				makeDiv.appendChild(makeList);
				document.body.appendChild(makeDiv);
				$('items').style.display = "block";
				for(var i=0, len=localStorage.length; i<len;i++){
					var makeli = document.createElement('li');
					var linksLi = document.createElement('li');
					makeList.appendChild(makeli);
					var key = localStorage.key(i);
					var value = localStorage.getItem(key);
			
					//Convert the string from local storage
						var obj = JSON.parse(value);
						var makeSublist = document.createElement('ul');
						makeli.appendChild(makeSublist);
			
					//call image function
					getImage(obj.type[1], makeSublist);
			
					for(var n in obj){
						var makeSubli = document.createElement('li');
						makeSublist.appendChild(makeSubli);
						var optSubText = obj[n][0]+" "+obj[n][1];
						makeSubli.innerHTML = optSubText;		
						makeSublist.appendChild(linksLi);
					};
		
				//Create our edit & delete buttons for local storage
				makeItemLinks(localStorage.key(i), linksLi);
				};
			};
		
		}
	});


});
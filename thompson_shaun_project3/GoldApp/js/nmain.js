//Shaun Thompson
//MiU 1303 - Project 3 [modified JS file]
//03/21/2013

var parseTracker = function(data){
	console.log(data);
};

$(document).ready(function(){
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
			function storeData(key){
				//if there is no key, this is a brand new item & we need a new key
				if(!(key)){
					var id				= Math.floor(Math.random()*1000000001);
				}else{
					//set the id to the existing key that we're editing in order to rewrite local storage
					id = key;
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
			
			//Write data from local storage to browser
			function getData(){
				if(localStorage.length === 0){
					alert("There are no meals currently tracked so default information has been loaded.");
					autoFill();
				};

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

			//Make item(s)
			function makeItemLinks(key, linksLi){
		//add edit item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Meal Entry";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		//add delete item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Meal Entry";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	};
	
			//Delete Item
			function deleteItem(){
		var ask = confirm("This meal entry will be removed. Are you sure?");
		if(ask){
			localStorage.removeItem(this.key);
			window.location.reload();
		}else{
			alert("Entry will not be deleted.");
		};
	};
		
			//Edit Meal Entries
			function editItem() {
		var value = localStorage.getItem(this.key);	
		var item = JSON.parse(value);
		
		//show form again
		toggleControls("off");
		
		//populate form field with current localstorage
		$('date').value = item.date[1];
		$('type').value = item.type[1];
		var radios = document.forms[0].group;
		for (var i=0, j = radios.length; i < j; i++){
			if (radios[i].value == "Meat" && item.group[1] == "Meat"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Vegetable" && item.group[1] == "Vegetable"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Fruit" && item.group[1] == "Fruit"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Grain" && item.group[1] == "Grain"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Dairy" && item.group[1] == "Dairy"){
				radios[i].setAttribute("checked", "checked");
			};		
		};
		$('name').value = item.name[1];
		$('calories').value = item.calories[1];
		$('notes').value = item.notes[1];
		
		//remove initial listener from input save contact button
		save.removeEventListener("click", storeData);
		//change submit button to edit button
		$('submit').value = "Edit Meal Entry";
		var editSubmit = $('submit');
		//save key value established in this function as property of editsubmit
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
		

	};
	
		
		}
	});


});
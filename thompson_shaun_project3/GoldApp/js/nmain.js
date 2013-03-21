//Shaun Thompson
//MiU 1303 - Project 3 [modified JS file]
//03/21/2013

var parseHealthForm = function(data){
	console.log(data);
};

$(document).ready(function(){

	var calform = $('#calform'),
		errorslink = $('#errorslink')
	;
	
	calform.validate({
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
			var data = calform.seralizeArray();
			parseHealthForm(data);
		}
	});

});
$(document).ready(function()
	{
		listOfChecked = [];
		$(".popover ul li input").change(function(){
			if (this.checked){
				listOfChecked.push($(this).data("name"));
			}
			else{
				listOfChecked.pop($(this).data("id"));
			}
			//console.log(listOfChecked);
			$(".amenities h4").text(listOfChecked.join(","));
		});
		$.ajax({
			url: "http://localhost:5001/api/v1/status/",

			data: {},

			type: "GET",

			dataType: "json",
		})

		.done(function ( json ){
			//console.log("all good");
			$("div#api_status").addClass("available");
		})

		.fail(function (){
			//console.log("failed");
			$("div#api_status").removeClass("available");
		});
	});
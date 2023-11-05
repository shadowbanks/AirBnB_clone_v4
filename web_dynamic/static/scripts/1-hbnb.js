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
		})
	});
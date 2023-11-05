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

		$.ajax({
			url: "http://localhost:5001/api/v1/places_search/",
			type: 'POST',
			headers: { 'Content-Type': 'application/json' },
			data: JSON.stringify({}),
			success: function (response) {
				for (const r of response) {
					const article = ['<article>',
						'<div class="title_box">',
						`<h2>${r.name}</h2>`,
						`<div class="price_by_night">$${r.price_by_night}</div>`,
						'</div>',
						'<div class="information">',
						`<div class="max_guest">${r.max_guest} Guest(s)</div>`,
						`<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
						`<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
						'</div>',
						'<div class="description">',
						`${r.description}`,
						'</div>',
						'</article>'];
					$('SECTION.places').append(article.join(''));
				}
			},
			error: function (error) {
				console.log(error);
			}
		});
	});

$(document).ready(function()
	{
		listOfChecked = {};
		$(".popover ul li input").change(function(){
			if (this.checked){
				listOfChecked[$(this).data("name")] = $(this).data("name");
			}
			else{
				delete listOfChecked[$(this).data("name")];
			}
			//console.log(listOfChecked);
			$(".amenities h4").text(Object.values(listOfChecked).join(", "));
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
			success: fill_data,
			error: function (error) {
				console.log(error);
			}
		});

		$("button").on("click", function(){
			$("section.places").empty();
			$.ajax({
				url: "http://localhost:5001/api/v1/places_search/",
				data: JSON.stringify({"amenities": Object.keys(listOfChecked)}),
				type: "POST",
				contentType: "application/json",
				dataType: "JSON",
			})
			.done (fill_data)
			.fail (function (err)
			{
				console.log(err);
			});
		});

		function fill_data (response) {
			//console.log("Got here");
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
		};
	});

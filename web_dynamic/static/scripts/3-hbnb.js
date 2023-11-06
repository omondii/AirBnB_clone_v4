$(document).ready(function(){
	const amenityData = {}
	const amenitiesCheckboxes = $(".amenity_checkbox")
	amenitiesCheckboxes.change(function () {
		if ($(this).is(':checked')) {
			const amenityName = $(this).data("name")
			const amenityId = $(this).data('id')
			amenityData[amenityName] = amenityId
		}

		if (!$(this).is(':checked') && amenityData[$(this).data('name')]) {
			delete amenityData[$(this).data('name')]
		}

		const amenityNames = Object.keys(amenityData).join(', ')
		console.log(amenityData)
		$(".amenities_text").text(amenityNames)
	})
	$.ajax({
		url: "http://0.0.0.0:5001/api/v1/status/",
		type: "GET",
		success:  (response) => {
			if (response.status === "OK") {
				$("#api_status").addClass("available")
			} else {
				$("#api_status").removeClass("available")
			}
			console.log(response)
		}
	})
	$.ajax({
		url: "http://0.0.0.0:5001/api/v1/places_search",
		type: "POST",
		data: JSON.stringify({}),
		contentType: "application/json",
		success: (response) => {
			for (let place of response) {
				console.log(place)
				$('.places').append(
				`<article>
				<div class="title_box">
   <h2>${place.name}</h2>
    <div class="price_by_night">$${place.price_by_night}</div>
  </div>
  <div class="information">
    <div class="max_guest">${place.max_guest} Guests</div>
            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
  </div>
          <div class="description">
    ${place.description}
          </div>
</article>`)
			}
		}
	})
    
});

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
    
});

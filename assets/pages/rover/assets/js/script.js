$( "#MyForm" ).validate({
 
});

function DefaultDate() {
	if (document.getElementById("Curiosity").checked) {
		document.getElementById("PictureDate").value = "2012-08-06"
	}
	if (document.getElementById("Opportunity").checked) {
		document.getElementById("PictureDate").value = "2004-01-26"
	}
	if (document.getElementById("Spirit").checked) {
		document.getElementById("PictureDate").value = "2004-01-05"
	}
}

function GetData() {
    if ($( "#MyForm" ).valid()) {

		/* Example can be seen at https://api.nasa.gov/ */
		/* Manifests can be seen at https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity?api_key=DEMO_KEY */

		if (document.getElementById("Curiosity").checked) {
        	rover = document.getElementById("Curiosity").value;
    	}
		if (document.getElementById("Opportunity").checked) {
        	rover = document.getElementById("Opportunity").value;
    	}
		if (document.getElementById("Spirit").checked) {
        	rover = document.getElementById("Spirit").value;
    	}

		picturedate = document.getElementById("PictureDate").value;
	
		/* URL for AJAX Call */
		var myURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?earth_date=" + picturedate + "&page=1&api_key=DEMO_KEY";

		/* AJAX Method */
		var myMethod = "GET";

		/* Make sure the document is ready */
		$(document).ready(function() { 

			/* Perform AJAX call - Note that the AJAX function 
			does not have a selector */

			$.ajax({
			method: myMethod,
			url: myURL
			})

			/* AJAX complete - result is in msg */
			.done(function( msg ) {

				/* Your code to process the result goes here - display the returned message */
				fLen = msg.photos.length;
				document.getElementById("PhotosFound").innerHTML = fLen + " photos found"
				for (i = 0; i < 25; i++) {
					if (i < fLen) {
						document.getElementById("image" + i).src = msg.photos[i].img_src;
						document.getElementById("image" + i).title = msg.photos[i].camera.full_name;
						document.getElementById("anchor" + i).href = msg.photos[i].img_src;
						document.getElementById("image" + i).style.display = "inline";
					}
					else
					{
						document.getElementById("image" + i).src = "#";
						document.getElementById("anchor" + i).href = "#";
						document.getElementById("image" + i).style.display = "none";
					}
				}
			});
		});

	}
}

function ClearForm() {
	document.getElementById("Curiosity").checked = false;
	document.getElementById("Opportunity").checked = false;
	document.getElementById("Spirit").checked = false;
	document.getElementById("RoverError").innerHTML = "";
	document.getElementById("PictureDate").value = "";
	document.getElementById("PictureDateError").innerHTML = "";
}
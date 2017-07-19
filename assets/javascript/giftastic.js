$(document).ready(function() {
	// array for start buttons
	var topics = ["Pele",
		"Diego Maradona",
		"Lionel Messi",
		"Zinedine Zidane",
		"Ronaldo",
		"Ronaldinho",
		"Johan Cruyff",
		"Gianluigi Buffon",
		"Paolo Maldini",
		"Andres Iniesta"];
	// create buttons which we see when page loaded
	createButtons();


	// player buttons clicked this function starts
	function apiCall() {

		// q: string - Search query term or prhase
		// limit: 10 the maximum number of records to return

		var apiKey = "c327f67cfd5b4a219c7cb1f73b2c6494";
		var player = $(this).data('name');
		// HOST api.giphy.com
		// PATH GET /v1/gifs/search
		var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&limit=10&q=" + player;
		
		// run the ajax method to request the api
		$.ajax({
			url: queryURL,
			method: "GET"})
			// when request finished run response function
			.done(function(response) {
			// clear gif from webpage (when click on new soccer player we see only 10 gifs and they not append to each other)
			$('.gif').empty();
				// response.data (odject of soccer player from giphy)
				for (var i = 0; i < response.data.length; i++) {
					
					// create div for img and rating
					var gifDiv = $('<div class="gif">');
					
					// rating: string - filters results by specified rating
					var rating = "<p>Rating: " + response.data[i].rating + "</p>";
					
					// create gif
					// player name - alt (if gif doesn't load we see this alt)
					// data-state is still - this will change to animated when img is clicked
					// data-animated - path to the animated gif url
					// data-still - path to the still image url
					var gif = "<img class='gifImg' src='" + response.data[i].images.fixed_height_still.url
						 + "' alt='" + player + "' data-state='still' data-animated='" + response.data[i].images.fixed_height.url 
						 + "' data-still='" + response.data[i].images.fixed_height_still.url + "'>";
					
					// append rating and gif to gifDiv
					// prepend gifDiv to gifHolder 
					gifDiv.append(gif + rating);
					$('#gifHolder').prepend(gifDiv);
				} 
		});  
	} // end of apiCall funciton

	// when click to add is clicked then apiCall starts
	$(document).on('click', '.player', apiCall);

	// creates a new button
	function createButtons() {
		// empty the button holder
		$('#buttonHolder').empty();
		
		// for each index in the topics array: 
		// 1. create a button element
		// 2. add btn class, add data-name attribute and player name to it
		// 3. display the player name in the button text
		for (var i = 0; i < topics.length; i++) {
			var btn = $('<button>');
			btn.addClass('btn btn-warning player');
			btn.attr('data-name', topics[i]);
			btn.text(topics[i]);
			$('#buttonHolder').append(btn);
		}
	} // end of createButtons function

	$(document).on('click', '.gifImg', function() {
		// change the state of image to 'still'
		// change the src to the still image
		if ($(this).attr('data-state') == "animated") {
			$(this).attr('data-state', 'still');
			$(this).attr('src', $(this).data('still'));
		}

		// change the state of image to 'animated'
		// change the src to the animated image
		else {
			$(this).attr('data-state', 'animated');
			$(this).attr('src', $(this).data('animated'));
		}
	}); // end of .gifImg event listener

	// add player button
	$('#addPlayer').on('click', function() {
		// user input + trim delete whitespaces
		var input = $('#player-input').val().trim();
	
		// if user input has not already added this button
		// push input to topics and create button
		if ((input != "") && (topics.indexOf(input) == -1)) {
			topics.push(input);
			createButtons();
		}
		
		// if user input empty - alert
		else if (input == "") {
			// open modal error1
			$("#error1Modal").modal({
			backdrop: "static",
			keyboard: false});
			
		}
		// alert that this soccer player button already exsist
		else {
			// open modal error2
			$("#error2Modal").modal({
			backdrop: "static",
			keyboard: false});
		}

		// empty user input after you add a new button
		$('#player-input').val("");

		// need for not refresh page when you click to add a new soccer player
		return false;
	}); // end of addPlayer event listener
});
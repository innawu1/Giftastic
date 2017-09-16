
//Object for creating gif array and pushing values from input box into it
var gifDisplay = {gifArray: [],
				  gifButton: "",

				  //Function that creates buttons from the values entered at the gif-view ID 
				  renderGifButtons: function(){
				  $("#gif-view").empty();

				  for(var i = 0; i < this.gifArray.length; i++){
				  	  this.gifButton = $("<button>");
				  	  this.gifButton.addClass("gif btn btn-primary")
				  	  			    .attr("data-name", this.gifArray[i])
				  	  			    .text(this.gifArray[i]);

				  	  //Appends the created button to the page at the location of the gif-view ID
				  	  $("#gif-view").append(this.gifButton)
				  	  		        .append(" ");
			   		}

				   },


};

//Object for Giphy API
var api = {baseUrl: 'http://api.giphy.com/v1/gifs/search',
		   queryParams: {
		   	api_key: 'dc6zaTOxFJmzC',
		   	limit: 10
		   },

		   //Function that queries the 
		   toQueryString: function(){
		   	var queryString = '';
		   	for(var i in this.queryParams){
		   		queryString += '&' + i + '=' + this.queryParams[i];
		   	}
		   	return this.baseUrl + '?' + queryString.trim('&');
		   },

		   findImages: function(searchString, imageLimit, callBack){
		   	this.queryParams.limit = parseInt(imageLimit);
		   	this.queryParams.q = searchString;
		   	$("#gifs-appear-here").empty();
		   	$.ajax({
		   		url: this.toQueryString(),
		   		method: "GET"
		   	})
		   	.done(function(response) {
		   		if (response.hasOwnProperty('data') && Array.isArray(response.data)) {
            	for (var i = 0; i < response.data.length; i++) {
              	callBack(response.data[i].images.fixed_height.url, response.data[i].images.fixed_height_still.url, response.data[i].rating);
            	}
		   	}

		   });

		   }

	
};

$(document).ready(function(event){

$("#add-gif").on("click", function(event) {
	event.preventDefault();

	var gif = $("#gif-input").val().trim();
	gifDisplay.gifArray.push(gif);

	gifDisplay.renderGifButtons();

 

});

$(document).on("click",".gif", function(){

	var name = $(this).data("name").trim();
	if(name.length){
	api.findImages(name, 10 , function(img, still_img, rating){
		$('<div>')
            .addClass('item')
            .append(
              $('<p>').text('Rating: ' + rating))
            .append(
              $('<img>').addClass('giphy').attr('src', still_img)
              			.attr('data-still', still_img)
              			.attr('data-animate', img)
              			.attr('data-state', 'still'))
            .appendTo('#gifs-appear-here')
        });

		}

	
});

$(document).on("click",".giphy", function(){
var state = $(this).attr("data-state");
if (state === "still") {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
      } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});


});
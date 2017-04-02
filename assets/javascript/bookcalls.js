var subject = "fantasy";

var queryURL = "https://www.googleapis.com/books/v1/volumes?q=subject:" + subject + " &key=AIzaSyDLWrPgW350LzRa-B-z83xg5uKzAjROB1I";

// Creating an AJAX call for the specific movie button being clicked
$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {


  console.log(response);


  for (var i = 0; i < 10; i++) {
      var bookId = response.items[i].id;
      console.log(bookId);

      var queryByIdURL = "https://www.googleapis.com/books/v1/volumes/"+ bookId;

        
        $.ajax({
          url: queryByIdURL,
          method: "GET"
        }).done(function(responseById) {
        
          console.log(responseById);
          console.log(responseById.volumeInfo.title);
          console.log(responseById.volumeInfo.authors);
          console.log(responseById.volumeInfo.description);
          console.log(responseById.volumeInfo.categories);
          console.log(responseById.volumeInfo.maturityRating);
          console.log("average rating: " + responseById.volumeInfo.averageRating);
          console.log("number of ratings: " + responseById.volumeInfo.ratingsCount);
      });

  }
});

//query by book ID- get more category info but all in one string and desc is longer

 
      
         
   
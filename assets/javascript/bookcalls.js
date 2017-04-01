
 

        var subject = "fantasy";
        var queryURL = "https://www.googleapis.com/books/v1/volumes?q=subject:" + subject + " &key=AIzaSyDLWrPgW350LzRa-B-z83xg5uKzAjROB1I";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        
          console.log(response);
        

          for (var i = 0; i < 10; i++) {
          	console.log(response.items[i].volumeInfo.title);
          	console.log(response.items[i].volumeInfo.authors);
          	console.log(response.items[i].volumeInfo.description);
          	console.log(response.items[i].volumeInfo.categories);
          	console.log(response.items[i].volumeInfo.maturityRating);
          	console.log("average rating: " + response.items[i].volumeInfo.averageRating);
          	console.log("number of ratings: " + response.items[i].volumeInfo.ratingsCount);
          }
        });
         
   
var subject = "juvenile,fiction";

var queryURL = "https://www.googleapis.com/books/v1/volumes?q=subject:" + subject + "&printType=books&langRestrict=en&maxResults=40&key=AIzaSyDLWrPgW350LzRa-B-z83xg5uKzAjROB1I";

// Creating an AJAX call for the specific movie button being clicked
$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {


  console.log(response);
  //get categories only
  for (var i =0; i < 40; i++) {
    console.log(response.items[i].volumeInfo.categories);
    console.log(response.items[i].volumeInfo.title);
    console.log(response.items[i].volumeInfo.authors);
    console.log(response.items[i].volumeInfo.description);
    console.log(response.items[i].volumeInfo.pageCount);
    console.log(response.items[i].volumeInfo.imageLinks.thumbnail);
    console.log(response.items[i].volumeInfo.previewLink);
    console.log(response.items[i].volumeInfo.publishedDate);
    console.log(response.items[i].volumeInfo.averageRating);
    console.log(response.items[i].volumeInfo.ratingsCount);
    console.log(response.items[i].volumeInfo.maturityRating);

  }
  
 
  
});



 
      
         
   
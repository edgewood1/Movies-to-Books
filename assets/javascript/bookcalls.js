
// I think we want this broken out like this so that the movieSubject is swapped for the bookSubject?
// movieSubject = "Animation";

var bookSubject;

var movieSubject = "Adventure"; //for testing purposes- change this to be on click movie picked by user

switch (movieSubject) {
  case "Action":
    bookSubject = "action"
      break;
  case "Adventure":
    bookSubject = "adventure"
      break;
  case "Animation":
    bookSubject = "comics||animation||graphic novel"
      break;
  case "Comedy":
    bookSubject = "humor"
      break;
  case "Crime":
    bookSubject = "crime"
      break;
  case "Documentary":
    bookSubject = "history||biography||non-fiction"
      break;
  case "Drama":
    bookSubject = "melodrama"
      break;
  case "Family":
    bookSubject = "juvenile fiction"
      break;
  case "Fantasy":
    bookSubject = "fantasy"
      break;
  case "History":
    bookSubject = "history"
      break;
  case "Horror":
    bookSubject = "horror"
      break;
  case "Music":
    bookSubject = movieSubject;
      break;
  case "Mystery":
    bookSubject = "mystery"
      break;
  case "Romance":
    bookSubject = "romance"
      break;
  case "Science Fiction":
    bookSubject = "science fiction"
      break;
  case "TV Movie":
    bookSubject = "emotions"
      break;
  case "Thriller":
    bookSubject = "thriller"
      break;
  case "War":
    bookSubject = "war||fiction"
      break;
  case "Western":
    bookSubject = "western"
      break;
  default:
    bookSubject = movieSubject;
}


console.log(movieSubject);
console.log(bookSubject);


var queryURL = "https://www.googleapis.com/books/v1/volumes?q=subject:" + bookSubject + "&printType=books&langRestrict=en&maxResults=40&key=AIzaSyDLWrPgW350LzRa-B-z83xg5uKzAjROB1I";

// Creating an AJAX call for the specific movie button being clicked
$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {
  
  console.log(response);

  for (var i =0; i < 10; i++) {
    $("#book" + (i+1) + "Cover").attr("src", response.items[i].volumeInfo.imageLinks.thumbnail);
    $("#book" + (i+1) + "Title").html(response.items[i].volumeInfo.title);
    $("#modal" + (i+1) + "Title").html(response.items[i].volumeInfo.title);
    //get year out of published date
    var pubDateString = response.items[i].volumeInfo.publishedDate;
    var yearOnly = pubDateString.slice(0,4);

    $("#book" + (i+1) + "Year").html(yearOnly);
    $("#book" + (i+1) + "Author").html(response.items[i].volumeInfo.authors);
    $("#book" + (i+1) + "Info").html(response.items[i].volumeInfo.description);
    $("#book" + (i+1) + "PageCount").html(response.items[i].volumeInfo.pageCount);
    $("#book" + (i+1) + "PreviewLink").attr("href", response.items[i].volumeInfo.previewLink);


    console.log(response.items[i].volumeInfo.categories);
    console.log(response.items[i].volumeInfo.averageRating);
    console.log(response.items[i].volumeInfo.ratingsCount);
  }
   
});



  //get categories only
  for (var i =0; i < 40; i++) {


    console.log(response.items[i].volumeInfo.categories);
    console.log(response.items[i].volumeInfo.averageRating);
    console.log(response.items[i].volumeInfo.ratingsCount);
  }
   
});



 
      
         
   
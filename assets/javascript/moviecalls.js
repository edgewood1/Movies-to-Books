var doubles=[];
  var wellSection;
  var data;
  var url;
  var name = [];
  var genre = [];
  var name;
  var popularity;
  var posterPath;
  var bookSubject;
  var genreChosen;
  var release;
  var voteAverage;
  var voteCount;
  var releaseDate;
  var a;
  //OBJECT VARIABLES

    var finalGenre = [];
    var ge = [];
    var genreObj = {};
    var movieObj = {};
    var allMoviesObj = {};

function restart() {


//clear button

  $("#clear").on("click", function(event) {
    event.preventDefault();
    $("#results").empty();
    restart();
  });

  //search button

  $("#submitMovie").on("click", function(event) {
    event.preventDefault();
    // $("#row1").empty();
    var term = $("#movieTitle").val().trim();

//AJAX VARIABLES

    var base = "https://api.themoviedb.org/3/";
    var search = "search/movie?query='" + term + "'&";
    var genre = "genre/movie/list?";
    var keywordID = "/keyword/{14644}?";
    var keyword = "search/keyword?query='" + term + "'&";
    var key = "api_key=b287a269fa3356a822e8c1b358a6f0fc";

    var searchURL = base + search + key;
    var genreURL = base + genre + key;
    var keywordURL = base + keywordID + key;



// CREATE AJAX CALL for genre map

    $.ajax({
      url: genreURL,
      method: "GET"
    }).done(function(response) {
      var articleCounter = 0;
      data = response;

      for (i = 0; i < data.genres.length; i++) {
        var genreK = data.genres[i].id
        var genreV = data.genres[i].name
        genreObj[genreK] = genreV;
      }
      

// CREATE AJAX call for movie data
      $.ajax({
          url: searchURL,
          method: "GET"
        }).done(function(response) {
          var articleCounter = 0;
          data = response;

//CREATE MOVIE OBJECTS
            // $("#row2").empty();
          for (i = 0; i < data.results.length; i++) {

            movieObj["popularity"] = (data.results[i].popularity).toFixed(2);
            movieObj["posterPath"] = "https://image.tmdb.org/t/p/w92" + data.results[i].poster_path;
            movieObj["releaseDate"] = data.results[i].release_date;
            movieObj["voteAverage"] = data.results[i].vote_average;
            movieObj["voteCount"] = data.results[i].vote_count;
            genres = data.results[i].genre_ids; // genres is an array with all genre ids.

            
            for (var j = 0; j < genres.length; j++) { //loop to translate genres
              
              genres[j] = genres[j].toString();
              finalGenre.push(genreObj[genres[j]]); // placing genre values into final 
              movieObj["genres"] = finalGenre;
              movieObj["name"] = data.results[i].title;
              allMoviesObj["name"] = movieObj;
            }
            finalGenre = [];
///// ---

              if (!(allMoviesObj.name.posterPath=="https://image.tmdb.org/t/p/w92null")) {
                  articleCounter++;
         // var element2 = $("<div>").addClass("offset-md-1 col-md-2");
            var element2 = $("<div>").addClass("col-md-2");
            var element3 = $("<div>").addClass("hovereffect");
            
            var element4 = $("<img>").attr({"class":"img-thumbnail", "src": allMoviesObj.name.posterPath, "alt":"book cover", "id": allMoviesObj.name.name}).css({"width":"90%"}).on("click", next);
            var element5 = $("<p>").text(allMoviesObj.name.name).css("text-align", "center");
            var element6 = $("<p>").text(allMoviesObj.name.releaseDate).css("text-align", "center");
            // doubles.push(allMoviesObj.name.name);
            // console.log(doubles);

      $("#movieResults").append(element2);
            element2.append(element3);
            element2.append(element4);
            element2.append(element5);
            element2.append(element6);
          } //if loop
          } //for i
           // closes for
        function next() {
    var imgClicked=$(this).attr("id");
    for (k=0; k<allMoviesObj.name.genres.length; k++){
    genreChosen=allMoviesObj.name.genres[k]
    console.log(genreChosen);
  }
    // for (var k=0; k<articleCounter; k++){
    //   if (imgClicked===allMoviesObj.name.posterPath)
    //     {var moviePicked=allMoviesObj.name.name;}
    //     console.log(moviePicked);
      // $("#row1").empty();

      $("#movieChosen").html(imgClicked).css({"display": "block", "color": "white", "font-size": "150%"});
      articleCounter=0;
    // } //closes for k

}; //closes next()

        }); //closes function(response)2

    }); //closes function(response)1
  

  
}); //closes function event

////////////////////////////insert book calls


// I think we want this broken out like this so that the movieSubject is swapped for the bookSubject?
// movieSubject = "Animation";

// var bookSubject;

// var movieSubject = "Adventure"; //for testing purposes- change this to be on click movie picked by user

switch (genreChosen) {
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
   
});  // ajax closes




 
      
         
   

//////////////////////////////close book calls
}; //restart

restart();
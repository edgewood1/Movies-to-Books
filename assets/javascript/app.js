// Initialize Firebase
	var config = {
		apiKey: "AIzaSyBWFWAg2YMXu1TO-RUD2APOpX_Knds8m4o",
		authDomain: "movies-to-books-c3182.firebaseapp.com",
		databaseURL: "https://movies-to-books-c3182.firebaseio.com",
		projectId: "movies-to-books-c3182",
		storageBucket: "movies-to-books-c3182.appspot.com",
		messagingSenderId: "28649429385"
	};
	firebase.initializeApp(config);
	var database=firebase.database();

//moviecall variables  
  var data;
  var name;
  var genre = [];
  var name;
  var term;
  var popularity;
  var posterPath;
  var bookSubject;
  var genreObj =[];
  var genreChosen;
  var genreToSearch;
  var releaseDate;
  var movies={}; 
  var finalGenre = [];
  var lastFivePosters = [];
  var random;

// This counter can't be set at zero or it will reset every time the
// page is loaded. Probably needs to be modeled after the Coders Bay thing
// for it to work properly? Switching back to the other way of populating
// these images for now..
  // var counter = 0;

function onPageLoad() {
	$("#movieChosenDiv").hide();
	$("#bookResults").hide();
  $("#movieResults").hide();

	movieCall();
  $("#most-recent-posters").empty();
}

database.ref().orderByKey().limitToLast(3).
  on("child_added", function(snapshot) {
    //make sure that there's something in the database if you're going to read it 
    var exists = snapshot.exists();
      
    if (exists) {
      $("#most-recent-posters").append('<img class="img-fluid img-thumbnail recentPosters" src="' + snapshot.val().movieChosenPoster + '" alt="Recent Movies">');
    }
  });

function movieCall() {

//CLEARS THE MOVIE OBJECT FOR NEW USE  
  movies={};

//IF SEARCH BUTTON CLICK, STORE INPUT IN "TERM"

	$("#submitMovie").on("click", function(event) {

		// Prevents default submit button action/prevents page load
		event.preventDefault();

		// Set variable term equal to search input
		term = $("#movieTitle").val().trim();

		// Clears search box input
		$("#movieTitle").val("");

		// Shows movieResults div
		$("#movieResults").show();

		// Changes text of movieChosenDiv to tell user how to use
		$("#movieChosenDiv").html("<h2>Click the movie you want!</h2>");

		// Shows movieChosenDiv (it is hidden on page load)
		$("#movieChosenDiv").show();

    // Hides bookResults div when movies populate (imperative to do this after
    // first search, otherwise bookResults div will stay visible beneath movieResults div)
    $("#bookResults").hide();

//AJAX VARIABLES

	var base = "https://api.themoviedb.org/3/";
	var search = "search/movie?query='" + term + "'&";
	var genre = "genre/movie/list?";
	var key = "api_key=b287a269fa3356a822e8c1b358a6f0fc";

	var searchURL = base + search + key;
	var genreURL = base + genre + key;

// CREATE AJAX CALL for genre map
	$.ajax({
		url: genreURL,
		method: "GET"
	}).done(function(response) {
		data = response;

// Getting all the genre stuff and creating an array
	for (i = 0; i < data.genres.length; i++) {
		var genreKey = data.genres[i].id
		var genreValue = data.genres[i].name
			genreObj[genreKey] = genreValue;
		}

// CREATE AJAX call for movie data
	$.ajax({
		url: searchURL,
		method: "GET"
	}).done(function(response) {
		data = response;
    // console.log("response from search AJAX call: " + response);
    // console.log("data variable: " + data);
    // console.log("data.results[0]: " + data.results[0]);

//CREATE MOVIE OBJECTS
  $("#movieResults").empty(); 
  if (data.results.length === 0) {
    $("#movieChosenDiv").html("We're sorry. Your search did not return any results.<br>Check your spelling or try another movie title.")
    .css({"display": "block", "color": "white", "font-size": "120%", "border": "2px #FFFD8D solid"});
  } 
     
	for (i = 0; i < data.results.length; i++) {
		name = data.results[i].title;

		// Pulls only year from release date info
		var yearOnly = data.results[i].release_date.slice(0,4);

		movies[name] ={
			"title": name, 
			"posterPath": "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path, 
			"releaseDate": yearOnly
		};

		genres = data.results[i].genre_ids; 
            
//TRANSLATE GENRE ID'S

    for (var j = 0; j < genres.length; j++) { 
              
      genres[j] = genres[j].toString();
      finalGenre.push(genreObj[genres[j]]);             
    }
             
//ADD GENRE NAMES TO MOVIE OBJECT  

  movies[name].genre = finalGenre;
            
//clear the finalGenre, which is used in genre translation process

  finalGenre = [];

/// display all movies except those without a poster path
    // if (!(movies[name].posterPath=="https://image.tmdb.org/t/p/w500null")) {
    if (!(movies[name].posterPath=="https://image.tmdb.org/t/p/w500null") && !(movies[name].genre.length==0)) {
          var element2 = $("<div>").addClass("col-md-2 hovereffect");
          var element3 = $("<img>").attr({
            "class":"img-thumbnail", 
            "src": movies[name].posterPath,
            "alt":"book cover",
            "id": name
          }).css({"width":"90%"}).on("click", bookCall);
          var element4 = $("<p>").text(movies[name].title)
          .css("text-align", "center");
          var element5 = $("<p>").text(movies[name].releaseDate)
          .css("text-align", "center");
    
          $("#movieResults").append(element2);
          element2.append(element3);
          element2.append(element4);
          element2.append(element5);

      } //close the if-no-movie-poster display section

  } //close the for-i loop, which creates movie object and displays it.

}); //closes ajax movie call 

}); //closes ajax genre call
  
}); //closes submit button function event

}; //closes moviecall()

function bookCall() {

//GRAB THE MOVIE OBJECT CLICKED
  name = $(this).attr("id");
  console.log("movie = " + name);

//GRAB THE GENRES FROM THE MOVIE OBJECT
	genreChosen = movies[name].genre;

//GRAB random GENRE from those listed
  random = Math.floor((Math.random() * genreChosen.length));
  console.log("random number genre chosen is: " + genreChosen[random]);
  genreToSearch = genreChosen[random];
  
	console.log("genreToSearch = " + typeof(genreToSearch) + genreToSearch);

//DISPLAY NAME OF CLICKED MOVIE ON DISPLAY
	$("#movieChosenDiv").hide();
	$("#movieChosenDiv").html("<h2>Your movie is: <br><span id='movieChosen'>chosen movie title here</span></h2>");
	$("#movieChosenDiv").show();
  $("#movieChosen").html(movies[name].title)
  .css({"display": "block", "color": "white", "font-size": "150%"});

//EMPTY MOVIE RESULTS IN ORDERT TO DISPLAY BOOKS
   $("#movieResults").empty();

//if movie genre is undefined   

if (genreToSearch === undefined) {
    $("#movieChosenDiv").html("We're Sorry. The Movie Database does not have enough information on this movie.<br>Try to search for a similar movie title.")
    .css({"display": "block", "color": "white", "font-size": "120%", "border": "2px #FFFD8D solid"});
    $("#bookResults").hide();
    }
//if movie genre is defined
 else {  

// TRANSLATE GENRECHOSEN TO BOOKSUBJECT 
switch (genreToSearch) {
  case "Action":
    bookSubject = "action";
      break;
  case "Adventure":
    bookSubject = "adventure";
      break;
  case "Animation":
    bookSubject = "graphic novel||animation";
      break;
  case "Comedy":
    bookSubject = "humor";
      break;
  case "Crime":
    bookSubject = "crime";
      break;
  case "Documentary":
    bookSubject = "history||biography||non-fiction";
      break;
  case "Drama":
    bookSubject = "melodrama";
      break;
  case "Family":
    bookSubject = "animals";
      break;
  case "Fantasy":
    bookSubject = "fantasy";
      break;
  case "History":
    bookSubject = "history";
      break;
  case "Horror":
    bookSubject = "horror";
      break;
  case "Music":
    bookSubject = movieSubject;
      break;
  case "Mystery":
    bookSubject = "mystery";
      break;
  case "Romance":
    bookSubject = "romance";
      break;
  case "Science Fiction":
    bookSubject = "science fiction";
      break;
  case "TV Movie":
    bookSubject = "emotions";
      break;
  case "Thriller":
    bookSubject = "thriller";
      break;
  case "War":
    bookSubject = "war||fiction";
      break;
  case "Western":
    bookSubject = "western";
      break;
  default:
    bookSubject = genreChosen;
} //end of movie to book switch statements

console.log("book subject for bookCall = " + bookSubject);
var queryURL = "https://www.googleapis.com/books/v1/volumes?q=subject:" + bookSubject + "&printType=books&langRestrict=en&maxResults=40&key=AIzaSyDLWrPgW350LzRa-B-z83xg5uKzAjROB1I";

// Creating an AJAX call for the specific movie button being clicked

$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {

  console.log(response);

  
  if (response.items === undefined) {
    $("#bookResults").hide();
  }
  
  else {

    for (var i =0; i < 10; i++) {
      var bookDisplayed = $("<img>")
      .attr("data-toggle" , "modal")
      .attr("data-target" , "#moreInfo" + (i + 1))
      .attr("src", response.items[i].volumeInfo.imageLinks.thumbnail)
      .attr("alt:" ,response.items[i].volumeInfo.title)
      .addClass("img-thumbnail");
      var bookDisplayedTitle = $("<h5>")
      .html(response.items[i].volumeInfo.title);

       
      //get year out of published date
      var pubDateString = response.items[i].volumeInfo.publishedDate;
      var yearOnly = pubDateString.slice(0,4);
      var bookDisplayedYear = $("<p>")
      .html(yearOnly);

      
      $("#book" + (i+1)).append(bookDisplayed);
      $("#book" + (i+1)).append(bookDisplayedTitle);
      $("#book" + (i+1)).append(bookDisplayedYear);

      $("#modal" + (i+1) + "Title").html(response.items[i].volumeInfo.title);
      $("#book" + (i+1) + "Year").html(yearOnly);
      $("#book" + (i+1) + "Author").html(response.items[i].volumeInfo.authors);
      $("#book" + (i+1) + "Info").html(response.items[i].volumeInfo.description);
      $("#book" + (i+1) + "PageCount").html(response.items[i].volumeInfo.pageCount);
      $("#book" + (i+1) + "PreviewLink").attr("href", response.items[i].volumeInfo.previewLink);
     
    }// close for loop which populates books

  }// end of else- if response returns info then loop through and display

});  // close ajax call to google books

for (var i =0; i < 10; i++) {
  $("#book" + (i+1)).empty(); 
}// close for loop which clears book results book divs
  
$("#bookResults").show();

$("#most-recent-posters").empty();

// I removed the "database.ref(movies[name].title)" here because any movie with certain 
// punctuation in it (e.g. E.T.) breaks the code
  database.ref().push({
    searchTerm: term,
    movieChosenTitle: movies[name].title,
    movieChosenYear: movies[name].releaseDate,
    movieChosenPoster: movies[name].posterPath,
    // This is likely superfluous due to orderByKey option in Firebase that does the same thing.
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
} // end of else - if genre of movie is defined
} // close bookCall()

onPageLoad();
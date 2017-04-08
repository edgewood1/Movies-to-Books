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
  var url;
  var name;
  var genre = [];
  var name;
  var popularity;
  var posterPath;
  var bookSubject;
  var genreObj =[]
  var genreChosen=[];
  var releaseDate;
  var a;
  var movies={}; 
  var finalGenre = [];

function onPageLoad() {
	$("#movieChosenDiv").hide();
	$("#bookResults").hide();
	$("#movieResults").hide();
	movieCall();
}


function movieCall() {

//CLEARS THE MOVIE OBJECT FOR NEW USE  
  movies={};

//IF SEARCH BUTTON CLICK, STORE INPUT IN "TERM"

  $("#submitMovie").on("click", function(event) {
    event.preventDefault();
    var term = $("#movieTitle").val().trim();
	$("#movieTitle").val("");
	$("#movieResults").show();
	$("#movieChosenDiv").html("<h2>Click the movie you want!</h2>");
	$("#movieChosenDiv").show();

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
            
          for (i = 0; i < data.results.length; i++) {
            name = data.results[i].title;
			var yearOnly = data.results[i].release_date.slice(0,4);
            movies[name] ={"title": name, 
              "posterPath" : "https://image.tmdb.org/t/p/w92" + data.results[i].poster_path, 
                "releaseDate": yearOnly
                    };
            genres = data.results[i].genre_ids; 
            
//TRANSLATE GENRE ID'S

            for (var j = 0; j < genres.length; j++) { 
              
              genres[j] = genres[j].toString();
              finalGenre.push(genreObj[genres[j]]);             
                  }
            
//ADD GENRE NAMES TO MOVIE OBJECT  

            movies[name].genre= finalGenre;
            
//clear the finalGenre, which is used in genre translation process

            finalGenre = [];

//read database for current database poster

	database.ref().on("value", function(Snapshot) {

// Log everything that's coming out of snapshot
		console.log(Snapshot.val().name);
		
	});

//clear books so that we can display movies
          
            // $("#bookResults").empty();

/// display all movies except those without a poster path

            if (!(movies[name].posterPath=="https://image.tmdb.org/t/p/w92null")) {
                  
                  articleCounter++;
                  var element2 = $("<div>").addClass("col-md-2");
                  var element3 = $("<div>").addClass("hovereffect");
                  var element4 = $("<img>").attr({"class":"img-thumbnail", 
                      "src": movies[name].posterPath,
                       "alt":"book cover",
                       "id": name}).css({"width":"90%"}).on("click", bookCall);
                  var element5 = $("<p>").text(movies[name].title).css("text-align", "center");
                  var element6 = $("<p>").text(movies[name].releaseDate).css("text-align", "center");
            
                  $("#movieResults").append(element2);
                  element2.append(element3);
                  element2.append(element4);
                  element2.append(element5);
                  element2.append(element6);
      
              } //close the if-no-movie-poster display section
      
          } //close the for-i loop, which creates movie object and displays it.
           
       }); //closes ajax movie call 

    }); //closes ajax genre call
  
  }); //closes submit button function event

}; //closes moviecall()

function bookCall() {

	$("#bookResults").show();

//GRAB THE MOVIE OBJECT CLICKED
    name=$(this).attr("id");
    console.log("movie = " +name);

//DATABASE WRITE

	database.ref().set({
		name:movies[name].title,
		date:movies[name].releaseDate,
		posterPath:movies[name].posterPath
	});

//GRAB TEH GENRE FROM THE MOVIE OBJECT
    genreChosen=movies[name].genre;
    console.log("all genres = " + movies[name].genre);
//GRAB THE FIRST GENRE LISTED
    genreChosen=genreChosen[0];
    console.log("first genre = " + genreChosen);

//DISPLAY NAME OF CLICKED MOVIE ON DISPLAY
	$("#movieChosenDiv").hide();
	$("#movieChosenDiv").html("<h2>Your movie is: <br><span id='movieChosen'>chosen movie title here</span></h2>");
	$("#movieChosenDiv").show();
    $("#movieChosen").html(movies[name].title).css({"display": "block", "color": "white", "font-size": "150%"});

//EMPTY MOVIE RESULTS IN ORDERT TO DISPLAY BOOKS
   $("#movieResults").empty();

// TRANSLATE GENRECHOSEN TO BOOKSUBJECT --&& WHAT IF NO GENRE??

// If genreChosen = Action, then bookSubject = action;

switch (genreChosen) {
  case "Action":
    bookSubject = "action";
      break;
  case "Adventure":
    bookSubject = "adventure";
      break;
  case "Animation":
    bookSubject = "comics||animation||graphic novel";
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
    bookSubject = "juvenile fiction";
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
}
 
console.log("book subject for bookCall = " + bookSubject);
var queryURL = "https://www.googleapis.com/books/v1/volumes?q=subject:" + bookSubject + "&printType=books&langRestrict=en&maxResults=40&key=AIzaSyDLWrPgW350LzRa-B-z83xg5uKzAjROB1I";

// Creating an AJAX call for the specific movie button being clicked

$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {

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

      } // close for i
   
    });  // close ajax moviecall

  movieCall();

} // close bookCall() 

onPageLoad();


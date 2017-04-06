var doubles=[];
  var wellSection;
  var data;
  var url;
  var name = [];
  var genre = [];
  var name;
  var popularity;
  var posterPath;
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
    $("#row1").empty();
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


//*****HERE'S THE OBJECT THAT HOLDS ALL THE DATA - 
            // console.log(allMoviesObj);


//DISPLAY

          
            
            // for (var k; k<doubles.length; k++) {
            //   if (doubles[k]==allMoviesObj.name.name) {a=true;}
            //   else {a=false;}
            // }
        // console.log(allMoviesObj.name.posterPath);
              if (!(allMoviesObj.name.posterPath=="https://image.tmdb.org/t/p/w92null")) {
                  articleCounter++;
         // var element2 = $("<div>").addClass("offset-md-1 col-md-2");
            var element2 = $("<div>").addClass("col-md-2");
            var element3 = $("<div>").addClass("hovereffect");
            
            var element4 = $("<img>").attr({"data-toggle":"modal", "data-target":"#moreInfo1", "class":"img-thumbnail", "src": allMoviesObj.name.posterPath, "alt":"book cover", "id": allMoviesObj.name.name}).css("margin-left", "21%").on("click", next);
            var element5 = $("<p>").text(allMoviesObj.name.name).css("text-align", "center");
            var element6 = $("<p>").text(allMoviesObj.name.releaseDate).css("text-align", "center");
            // doubles.push(allMoviesObj.name.name);
            // console.log(doubles);

      $("#row1").append(element2);
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
    var genreChosen=allMoviesObj.name.genres[k]
    console.log(genreChosen);
  }
    // for (var k=0; k<articleCounter; k++){
    //   if (imgClicked===allMoviesObj.name.posterPath)
    //     {var moviePicked=allMoviesObj.name.name;}
    //     console.log(moviePicked);
      $("#row1").empty();
      $("#movieChosen").html(imgClicked).css({"display": "block", "color": "white", "font-size": "150%"});
      articleCounter=0;
    // } //closes for k

}; //closes next()

        }); //closes function(response)2

    }); //closes function(response)1
  

  // WAS HERE!!
}); //closes function event

}; //restart

restart();
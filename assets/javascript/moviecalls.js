function restart() {

  var wellSection;
  var data;
  var url;
  var name = [];
  $()

  $("#clear").on("click", function(event) {
    event.preventDefault();
    $("#results").empty();
    restart();
  });

  $("#search").on("click", function(event) {
    event.preventDefault();
    $("wellSection").empty();
    var term = $("#term").val().trim();

    // var movie = "star wars";
    //      var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

    var base = "https://api.themoviedb.org/3/";
    // var movie = 
    // var movie=
    var search = "search/movie?query='" + term + "'&"
      // var search="genre/movie/list?";
    var key = "api_key=b287a269fa3356a822e8c1b358a6f0fc";
    var url = base + search + key;
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: url,
        method: "GET"
      }).done(function(response) {

        // url="http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=";
        // var key="76x988g8wzg9w59d2bf5qqgu+q";
        // var search = url+key;
        // // "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=[your_api_key]&q=[search_keyword]&page_limit=[page_limit]"

        // ////ajax request
        // $.ajax({
        //   url: search,
        //   method: 'GET',
        // //first brackets below closes the ajax function
        // }).done(function(response) {

        var genre = [];
        var articleCounter = 0;
        data = response;

        console.log(data.results[0].overview)
          // console.log(data.genres[0]);
        for (i = 0; i < data.results.length; i++) {
          var name = data.results[i].title;

          //display
          articleCounter++;
          wellSection = $("<div>").addClass("container");
          $("#results").append(wellSection);
          wellSection = $("<div>").addClass("jumbotron");
          $("#results").append(wellSection);
          var wellSection1 = $("<button>");
          wellSection1.attr("type", "button").addClass("btn btn-primary").text(articleCounter);
          // wellSection.append(wellSection1);
          // wellSection1=$("<p>").append(data3.substring(0, 10));
          // wellSection.append(wellSection1);
          wellSection1 = $("<p>").prepend(name + "<br>");
          // wellSection.append(wellSection1);
          // wellSection1=$("<a>").attr("href", data2).text(data2).append("<br><br>");

          wellSection.append(wellSection1);

        } // closes if
      }) //coses function (results)

  }); //closes function event

}; //restart

restart();
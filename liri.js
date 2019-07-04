// Node Packages.
require("dotenv").config();

var keys = require("./keys");
var spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

// Spotify API Credentials. 
var spotify = new spotify({
    id: "e9f18b61cfc74f84ad01d6049f3ce1a8",
    secret: "e9f7e91b8c8e4c6bbd2b7874750c835d"
});

// API Trigger
var userInput = process.argv[2];
// Execute API Request 
var userQuery = process.argv.slice(3).join(" ");

// If 'userInput' matches any of the cases below, execute API request from that switch case index.
function userCommand(userInput, userQuery) {
    switch (userInput) {
        case "spotify-this":
            spotifyThis();
            break;
        case "movie-this":
            movieThis();
            break;
        case "concert-this":
            concertThis();
            break;
        case "do-what-it-says":
            doThis();
            break;    
        // If the 'userInput' doesn't match any switch case, print "Invalid Command".
        default:
            console.log("Invalid Command.");
    }
}

// Execute Switch Statement.
userCommand(userInput, userQuery);

// All possible API requests that will execute from the switch case statement.

// Spotify API.
function spotifyThis() {
    if (!userQuery) {
        userQuery = "The Sign Ace of Base";
    }
    // Spotify Search Query.
    spotify.search({ type: 'track', query: userQuery, limit: 1 }, function (error, data) {
        if (error) {
            return console.log("Error Occurred: " + error);
        }
        // Loop through the spotify data object array and return song data
        var spotifyAry = data.tracks.items;
        for (var i = 0; i < spotifyAry.length; i++) {
            // Content Container [Start].
            console.log('\n---------- ' + userInput + ' ----------\n');
            // Artists Name.
            console.log("Artists: " + data.tracks.items[i].album.artists[0].name + "\n");
            // Song Name.
            console.log("Song: " + data.tracks.items[i].name + "\n");
            // Album & Release Year.
            console.log("Album : " + data.tracks.items[i].album.name + " " + "(" + data.tracks.items[i].album.release_date + ")" + "\n");
            // Song Preview Link.
            console.log("Preview: " + data.tracks.items[i].preview_url + "\n");
            // Content Container [End].
            console.log('---------- ' + userInput + ' ----------');
        }
    });
}

// OMDB API.
function movieThis() {
    // OMDB URL Query.
    axios.get('http://www.omdbapi.com/?apikey=trilogy&t=' + userQuery)
        .then(function (response) {
            // Stringify response data to get back an object.
            let movieRatings = JSON.stringify(response.data.Ratings);

            // Content Container [Start].
            console.log('\n---------- ' + userInput + ' ----------\n');
            // Movie Title + Year.
            console.log("Movie Title: " + response.data.Title + " " + "(" + response.data.Year + ")\n");
            // Movie Rating.
            console.log("Movie Rating: " + movieRatings + "\n");
            // Country Produced.
            console.log("Country Produced: " + response.data.Country + "\n");
            // Language.
            console.log("Language: " + response.data.Language + "\n");
            // Movie Plot.
            console.log("Movie Plot: " + response.data.Plot + "\n");
            // Movie Cast.
            console.log("Movie Cast: " + response.data.Actors + "\n")

            // console.log(response)
            console.log('\n---------- ' + userInput + ' ----------\n');
            // Content Container [End].
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

// Bands In Town API.
function concertThis() {
    // Make a request for a user with a given ID
    axios.get("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // Content Container [Start].
            console.log('\n---------- ' + userInput + ' ----------\n');
            // Concert Venue Name.
            console.log("Venue: " + response.data[1].venue.name + "\n");
            // Concert Location.
            console.log("Location: " + response.data[1].venue.country + " " + "(" + response.data[1].venue.city + ")" + "\n");
            // Concert Date.
            var dateTimeFormat = moment(response.data[1].datetime).format("MM/DD/YY");
            console.log("Event Date: " + dateTimeFormat + "\n");
            // Content Container [End].
            console.log('\n---------- ' + userInput + ' ----------\n');
            // console.log(response)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

function doThis() {       

    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
    
        else {
        var defaultInput = data.split(",")  

        console.log(defaultInput[0])
        console.log(defaultInput[1])

        // type = defaultInput[0];
        // inputParameter = defaultInput[1];
        // switchType(type, inputParameter);

        }
    })
}
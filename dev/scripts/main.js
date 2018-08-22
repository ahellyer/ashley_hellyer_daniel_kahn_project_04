// app namespace
const app = {};

// getting desination info from user
app.events = function () {
    
    // Event listener for the form submit
    $('form').on('submit', function(e) {
        e.preventDefault();
        console.log('user submitted destination');
        
        // Stores value of the destination the user enters
        app.userInput = $('.userInput').val();
        console.log(app.userInput);
        
        // Gets movies with the user input
        app.getMovies();
    })
}

app.apiKey = '972b4433f3e8f302aee3055dd209330c';
// app.apiURL = 'https://api.themoviedb.org/3';
app.apiURL = 'https://api.themoviedb.org/3'

// Make AJAX request with user inputted country 
app.getMovies = function () {
    //do a general keyword search (/search/movie endpoint) - use query key value pair 

    console.log('getting movies');

    $.ajax({
        url: `${app.apiURL}/search/movie`,
        method: 'GET',
        dataType: 'json',
        
        // allows us to pass values as a query string
        data: {
            api_key: app.apiKey,
            // format: 'json',
            query: app.userInput
        }
    })
    .then( res => {
        // console.log(`Then running HELLO WORLD`);
        // console.log(res);
        const list = res.results[0];

        // console.log(list);

        const movieID = list.id;

        // console.log(movieID);

        $.ajax({
            url: `${app.apiURL}/movie/${movieID}`,
            method: 'GET',
            dataType: 'json',

            // allows us to pass values as a query string
            data: {
                api_key: app.apiKey,
            }
        })
        .then( res => {
            // console.log('Movie Details Object');
            console.log(res);
            
            const prodCountries = [];
            res.production_countries.forEach(item => {
                console.log(item);
                console.log(item.name);
                prodCountries.push(item.name);

            });
            console.log(prodCountries);


            
        });
        
        

        // list
        // .forEach( movie => console.log(movie));
    });
}

// Display three movies on the page
// For each movie display
//// Poster
//// Title
//// Plot summary
//// Audience rating (Example 82% or 8.2/10)
//// Top billed case (first n people from the credits)
//////  Example of credits query for Reservoir Dogs: https://api.themoviedb.org/3/movie/500/credits?api_key=972b4433f3e8f302aee3055dd209330c
app.displayMovies = function () {

}

// Start app
app.init = function () {
    app.events();
}

$(function () {
    app.init();
});

// Decide how to pick the three movies to display

// Result of Search for Trainspotting:
// https://api.themoviedb.org/3/search/movie?api_key=972b4433f3e8f302aee3055dd209330c&language=en-US&page=1&include_adult=false&query=trainspotting
// query is the input
// query: 'Trainspotting'
// {
//     "page": 1,
//     "total_results": 3,
//     "total_pages": 1,
//     "results": [
//         {
//             "vote_count": 4148,
//             "id": 627,
//             "video": false,
//             "vote_average": 7.9,
//             "title": "Trainspotting",
//             "popularity": 16.367,
//             "poster_path": "/p1O3eFsdb0GEIYu87xlwV7P4jM1.jpg",
//             "original_language": "en",
//             "original_title": "Trainspotting",
//             "genre_ids": [
//                 18,
//                 80
//             ],
//             "backdrop_path": "/Aw0z8bUhGljT0ots6udf1MTLEMi.jpg",
//             "adult": false,
//             "overview": "Mark Renton, deeply immersed in the Edinburgh drug scene, tries to clean up and get out, despite the allure of the drugs and influence of friends.",
//             "release_date": "1996-02-23"
//         },
//         {
//             "vote_count": 1359,
//             "id": 180863,
//             "video": false,
//             "vote_average": 7,
//             "title": "T2 Trainspotting",
//             "popularity": 12.001,
//             "poster_path": "/fbHXfr2N4pI2j7i9RLYiddjotBl.jpg",
//             "original_language": "en",
//             "original_title": "T2 Trainspotting",
//             "genre_ids": [
//                 80,
//                 18
//             ],
//             "backdrop_path": "/kR48L1E3OLOkQcnlmpi5wDj7ZZt.jpg",
//             "adult": false,
//             "overview": "After 20 years abroad, Mark Renton returns to Scotland and reunites with his old friends Sick Boy, Spud and Begbie.",
//             "release_date": "2017-01-27"
//         },
//         {
//             "vote_count": 15,
//             "id": 42758,
//             "video": false,
//             "vote_average": 6.3,
//             "title": "Small Faces",
//             "popularity": 2.007,
//             "poster_path": "/s9I3gLu9ySsfyM3JvlpSW9KrszF.jpg",
//             "original_language": "en",
//             "original_title": "Small Faces",
//             "genre_ids": [],
//             "backdrop_path": null,
//             "adult": false,
//             "overview": "Three teenage brothers, gang-member Bobby, troubled mama's boy Alan and self-assured prankster Lex, reside in a downtrodden section of Glasgow, Scotland, circa 1968. But while Bobby and Alan are beginning to experience the power of raging hormones, the story focuses on Lex, who begins a downward spiral after he accidentally shoots the leader of Bobby's gang. Lex's cockiness and immaturity unfortunately prevent him from understanding the effect his subsequent crimes will have on both himself, and on those around him.",
//             "release_date": "1996-04-05"
//         }
//     ]
// }
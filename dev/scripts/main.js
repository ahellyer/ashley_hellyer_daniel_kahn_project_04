// app namespace
const app = {};

// getting desination info from user
app.events = function () {
    
    // Event listener for the form submit
    $('form').on('submit', function(e) {
        e.preventDefault();
        console.log('user submitted destination');
        
        // Stores value of the destination the user enters
        app.userDestination = $('.userDestination').val();
        console.log(app.userDestination);
        
        // Gets movies with the user input
        app.getMovies();
    })
}

app.apiKey = '972b4433f3e8f302aee3055dd209330c';
// app.apiURL = 'https://api.themoviedb.org/3';
app.apiURL = 'https://api.themoviedb.org/3/search/movie'

// Make AJAX request with user inputted country 
app.getMovies = function () {
    //do a general keyword search (/search/movie endpoint) - use query key value pair 

    console.log('getting movies');

    $.ajax({
        url: app.apiURL,
        method: 'GET',
        dataType: 'json',
        
        // allows us to pass values as a query string
        data: {
            api_key: app.apiKey,
            // format: 'json',
            query: app.userDestination
        }
    })
    .then( res => {
        console.log(`Then running`);
        console.log(res);
        const list = res.results

        list
        .filter( movie => movie.vote_average > 5)
        .forEach( movie => console.log(movie));
    });
}

// Display movie on the page
app.displayMovies = function () {

}

// Start app
app.init = function () {
    app.events();
}

$(function () {
    app.init();
});
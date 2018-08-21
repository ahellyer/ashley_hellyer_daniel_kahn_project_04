// app namespace
const app = {};

// getting desination info from user
app.events = function () {
    $('form').on('submit', function(e) {
        e.preventDefault();
        console.log('user submitted destination');
        app.userDestination = $('.userDestination').val();
        console.log(app.userDestination);
       
    })
}

app.apiKey = '972b4433f3e8f302aee3055dd209330c';
app.apiURL = 'https://api.themoviedb.org/3';

// Make AJAX request with user inputted country 
app.getMovies = function () {
    //do a general keyword search (/search/movie endpoint) - use query key value pair 
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
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// ### Set up partials ###
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ### Route handlers ###

app.get('/', (req, res) => {
  res.render('index');
});

// #####################################
// ## Iteration 3.1: The /beers route ##
// #####################################

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { beersFromApi }))
    .catch(error => console.log(error));
})

// ###########################################
// ## Iteration 4.1: The /random-beer route ##
// ###########################################

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beerDetailsFromApi => res.render('random-beer', { beerDetailsFromApi }))
    .catch(error => console.log(error));
})

// #######################################
// ## Bonus: Iteration 6 - Beer details ##
// #######################################

app.get('/random-beer/:beerId', (req, res) => {
  punkAPI
    .getBeer(req.params.beerId)
    .then(beerDetailsFromApi => res.render('random-beer', { beerDetailsFromApi }))
    .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));

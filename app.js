const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
app.set('images', __dirname+"public/images");

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});


app.get('/beers', (req, res) => {


  punkAPI.getBeers()
  .then(beersFromApi => {
    //console.log('Beers from the database: ', beersFromApi);
    res.render("beers.hbs", {
      beersFrom: beersFromApi
    })
  })
  .catch(error => {
    console.log(error)
  });
});


app.get('/random-beer', (req, res) => {

  punkAPI.getRandom()
  .then(beerRandom => {
    console.log(beerRandom);
    res.render("random-beer.hbs", {
      randomB: beerRandom
    })

  })
  .catch(error => {
    console.log(error);
  })

})

app.get('/each-beer/:beerId', (req, res) => {

  const { beerId } = req.params;
  //console.log(beerId);
  punkAPI.getBeer(beerId)
  .then(beerID => {
    //console.log(beerID)
    res.render("eachBeer.hbs", {
      beerFromId: beerID
    })
  })
  .catch(error => {
    console.log(error);
  })
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));


const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => { });

app.get('/api/quotes/random', (req, res, next) => {
  res.status(200).send({ quote: getRandomElement(quotes) });
});

app.get('/api/quotes', (req, res, next) => {
  if ('person' in req.query) {
    const person = req.query.person;
    const result = quotes.filter(quote => quote.person === person);
    if (result.length > 0) {
      res.status(200).send({quotes: result});
    } else {
      res.status(404).send({quotes: []});
    }
  } else {
    res.status(200).send({quotes: quotes});
  }
});

app.post('/api/quotes', (req, res, next) => {
  if (('quote' in req.query) && ('person' in req.query)) {
    const newQuote = {quote: req.query.quote, person: req.query.person};
    quotes.push(newQuote);
    res.status(201).send({quote: newQuote});
  } else {
    res.status(400).send();
  }
});
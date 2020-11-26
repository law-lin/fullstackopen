const peopleRouter = require('express').Router();
const Person = require('../models/person');

peopleRouter.get('/', (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

peopleRouter.get('/info', (req, res) => {
  Person.find({}).then((people) => {
    res.send(
      `<p>Phonebook has info for ${people.length} people</p>${new Date()}`
    );
  });
});

peopleRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

peopleRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

peopleRouter.post('/', (req, res, next) => {
  const body = req.body;
  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({
      error: 'name or number missing',
    });
  }

  const person = new Person({ name: body.name, number: body.number });

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => res.json(savedAndFormattedPerson))
    .catch((err) => next(err));
});

peopleRouter.put('/:id', (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
});

module.exports = peopleRouter;

const Activity = require('../db/models/index').Activity;
const Itinerary = require('../db/models/index').Itinerary;

module.exports = function (app) {
    // INDEX
    app.get('/itineraries', function (req, res) {
        Itinerary.findAll({}).then((itineraries) => {
            res.send(itineraries);
        })
    });

    // GET new itinerary forms - yes
    app.get('/itineraries/new', function (req, res) {
        console.log('test')
        res.render('itineraries-new', { currentUser: req.user })
    });

    // GET single itinerary - yes, see a single itinerary by itself
    app.get('/itineraries/:id', function (req, res) {
        Itinerary.findById(req.params.id).then((itinerary) => {
            Activity.findAll({ where : { ItineraryId : req.params.id } }).then(function (activities) {
                res.render('itineraries-show', { currentUser: req.user, itinerary: itinerary, activities: activities })
            })
        })
    });

    // GET itinerary edit form - yes, change items of the itinerary
    app.get('/itineraries/:id/edit', function (req, res) {
        Itinerary.findById(req.params.id).then((itinerary) => {
            res.render('itineraries-edit', { currentUser: req.user, itinerary: itinerary })
        })
    });

    // GET itinerary index - yes, show a user's list of itineraries
    // completed as index page

    // POST new itinerary - yes
    app.post('/itineraries', function (req, res) {
        // TODO :: ADD VALIDATION, CHECK FORM IN NOT EMPTY
        console.log(req.body)
        req.body.UserId = req.user.id
        req.body.date = req.body.date
        Itinerary.create(req.body).catch(function (err) {
            console.log(err)
        });
        res.redirect('/')
    });

    // PUT (edit) itinerary - yes, save changes
    app.put('/itineraries/:id', function (req, res) {
        Itinerary.findById(req.params.id).then((itinerary) => {
            itinerary.update(req.body);
            res.redirect('/itineraries/' + itinerary.id + '/')
        })
    });

    // DELETE itinerary - yes
    app.get('/itineraries/:id/delete', function (req, res) {
        Itinerary.findById(req.params.id).then((itinerary) => {
            itinerary.destroy(function (result) {
            });
          res.send(JSON.stringify({success : 'Updated Successfully', status : 200}));
        })
    })
}

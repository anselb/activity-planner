const yelp = require('yelp-fusion');
require('dotenv').config();

const YELP_ID = process.env.YELP_ID
const YELP_KEY = process.env.YELP_KEY
const MEETUP_KEY = process.env.MEETUP_KEY
const EVENTBRITE_TOKEN = process.env.EVENTBRITE_TOKEN
const EVENTBRITE_KEY = process.env.EVENTBRITE_KEY

const Activity = require('../db/models/index').Activity;

module.exports = function(app) {
    // GET activity index - no

    // GET single activity - no

    // GET edit activity form - yes, change times

    // GET create actitity form - yes, will be a search
    app.get('/itineraries/:itinId/activities/new', function (req, res) {
        res.render('activities-new', { currentUser: req.user })
    });

    // POST new activity - yes, will be result from search
    app.post('/itineraries/:itinId/activities', function (req, res) {
        Activity.create(req.body).catch(function (err) {
            console.log(err)
        });
        res.redirect('/')
    });

    // PUT (edit) activity - yes, when the activity is changed

    // DELETE activity - yes, can remove from itinerary
    app.delete('/itineraries/:itinId/activities/:actId', function (req, res) {
        Activity.findById(req.params.actId).then((activity) => {
            activity.destroy(function (result) {});
            res.send();
        })
    })
}

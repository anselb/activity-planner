const yelp = require('yelp-fusion');
require('dotenv').config();

const YELP_ID = process.env.YELP_ID
const YELP_KEY = process.env.YELP_KEY
const MEETUP_KEY = process.env.MEETUP_KEY
const EVENTBRITE_TOKEN = process.env.EVENTBRITE_TOKEN
const EVENTBRITE_KEY = process.env.EVENTBRITE_KEY

const Activity = require('../db/models/index').Activity;

module.exports = function(app) {
    // GET activity index - yes, for map
    app.get('/itineraries/:itinId/activities/', function (req, res) {
        Activity.findAll({ where : { ItineraryId : req.params.itinId } }).then(function (activities) {
            res.send(activities)
        })
    });

    // GET single activity - no

    // GET edit activity form - yes, change times

    // GET create actitity form - yes, will be a search
    app.get('/itineraries/:itinId/activities/new', function (req, res) {
        const queryTerm = encodeURIComponent(req.query.term);
        const queryLocation = encodeURIComponent(req.query.location);

        if (!req.query.term) {
            console.log(queryTerm)
            res.render('activities-new', { itineraryId: req.params.itinId, term: "", location: "", currentUser: req.user })
        } else {
            const searchRequest = {
                term: queryTerm,
                location: queryLocation
            }

            yelp.accessToken(YELP_ID, YELP_KEY).then(response => {
                const client = yelp.client(response.jsonBody.access_token);
                return client.search(searchRequest)
            }).then(response => {
                return response.jsonBody.businesses
            }).then(result => {
                res.render('activities-new', { itineraryId: req.params.itinId, term: req.query.term, location: req.query.location, currentUser: req.user, yelpDatas: result });
            }).catch(err => {
                console.log(err)
            });

            // Promise.all([yelpAPI]).then(APIdata => {
            //     console.log(APIdata);
            //     // res.render('home', { itineraryId: req.params.itinId, term: req.query.term, location: req.query.location, currentUser: req.user, yelpDatas: APIdata[0] });
            // }).catch(err => {
            //     console.log(err)
            // })
        }

    });

    // POST new activity - yes, will be result from search
    app.post('/itineraries/:itinId/activities', function (req, res) {
        console.log(req.params.itinId)
        console.log(req.body)

        req.body.ItineraryId = req.params.itinId
        Activity.create(req.body).catch(function (err) {
            console.log(err)
        });

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({success : 'Updated Successfully', status : 200, redirect : '/'}));
    });

    // PUT (edit) activity - yes, when the activity is changed
    app.put('/itineraries/:itinId/activities/:actId', function (req, res) {
        Activity.findByIdAndUpdate(req.params.actId, req.body, function (err, activity) {
            res.redirect('/itineraries/' + req.params.itinId)
        })
    });

    // DELETE activity - yes, can remove from itinerary
    app.delete('/itineraries/:itinId/activities/:actId', function (req, res) {
        Activity.findById(req.params.actId).then((activity) => {
            activity.destroy(function (result) {});
            res.send();
        })
    })
}

const Itinerary = require('../db/models/index').Itinerary;
const User = require('../db/models/index').User;

module.exports = function(app) {

    /* GET home page. */
    app.get('/', function (req, res) {
      Itinerary.findAll({include: User, order: [['createdAt', 'DESC']] }).then((itineraries) => {
        res.render('index', {currentUser: req.user, itineraries: itineraries, GoogleAPI: process.env.Google_API});
      })
    });

}

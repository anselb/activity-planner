# Awesome Activities Finder


## Introduction
Awesome Activities Finder is a program that provide exciting stops that match your search through MeetUp and Yelp. View tips created by you and other users on a map of your surroundings.  that others have created for the areas that interest you. You are provided information about the business, meet-up you choose, as well as a Google Map with markers of your current location, the activity, and destination. If you prefer an activity near your current location, that is also an option!

This is personal project from Make School. You can reach us at through  ansel.bridgewater@students.makeschool.com and jeff.chiu@students.makeschool.com


## Table of Contents
1. Technologies Used
2. How to locally run Activity Chooser 
3. How to use Activity Chooser


### Technologies Used 
- [Express](https://expressjs.com/)
- [Sequelize](http://docs.sequelizejs.com/)
- [PostCss](https://github.com/postcss/postcss)

This project also uses a boilerplate CSS theme for bootstrap known as [Paper Kit Pro 2](https://www.creative-tim.com/product/paper-kit-2-pro).

[Google Maps Javascript API](https://developers.google.com/maps/documentation/directions/), [Yelp API Version 3.0](https://www.yelp.com/developers/v3/preview), and [Google Maps Geocoder API](https://developers.google.com/maps/documentation/geocoding/intro)

***

### Development
```
npm install
npm start
```
This will start an express app at http://localhost:8000.


### Production Build
```
npm run build
npm run build:start
```
This will create a production build and will start a server at http://localhost:8000/


### Deployment
Install the Heroku toolbelt.
```
heroku create myapp
git push heroku master
```


***
## How to use Awesome Activities Chooser

It's avaliable at
https://awesome-activities.herokuapp.com

-Awesome Activity Finder consists of three pages: 
1. Homepage
2. Activity Selection
3. Final Page with route and business information

User Stories

-At the homepage, the user should input a complete address and the time they want to arrive at their destination. They can select (from the Yelp API category filters) activity types that interest them. Additionally, they are able to select a preference for an activity near their current location or closer to their destination. On this page, they can see their current location according to the Google Maps API. 

-Once they hit the submit button, the user is taken to the second page where they are provided businesses that match their selection from the homepage. Here, they can see the estimated price of each business, as well as the category the business falls under. 


- Write responsive css for mobile usage
- Deal w/ security of API keys (and get new API keys...)

### Authors
- [Jeff Chiu](https://www.linkedin.com/in/jeffchiu1) - Front/Back End
- [Ansel Bridgewater](ansel.bridgewater@students.makeschool.com) - Front/Back End


### License 
This project is licensed under the MIT License - see the [LICENSE.](https://tldrlegal.com/license/mit-license) file for details

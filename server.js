// let express = require('express');
// let fs = require('fs');
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');
const URL = require('url');
var Promise = require('bluebird');
// let app = express();

// app.get('/', function (req, res) {

let urlObject = parseUrl('https://www.berlin.de/restaurants/stadtteile/charlottenburg/');

let options = {
    uri: urlObject.href,
    transform: function (body) {
        return cheerio.load(body);
    }
};
rp(options).then(function ($) {
    let restaurantLists = [];
    $('#bo_mainbar .i_list .linklist li a').filter(function (index, value) {
        restaurantLists.push(urlObject.protocol + '//' + urlObject.hostname + value.attribs.href);
    });
    return restaurantLists;
}).then(function (rl) {
    var sliced = rl.slice(0, 1);
    return grabRestaurants(sliced);
}).then(function (info) {
    console.log(info);
}).catch(function (err) {
    console.error(err);
});

// app.listen('8081');

var grabRestaurants = function (list) {
    return new Promise(function (resolve, reject) {
        let grabRestaurantInfoPromises = [];
        list.map(function (url) {
            grabRestaurantInfoPromises.push(grabRestaurantInfo(url));
        });
        Promise.all(grabRestaurantInfoPromises.map(function (el) {
            return el.reflect();
        })).filter(function (p) {
            return p.isFulfilled();
        }).map(function (result) {
            return result.value();
        }).then(function (restaurantInfo) {
            resolve(restaurantInfo);
        });
    });
};

let grabRestaurantInfo = function (url) {
    return new Promise(function (resolve, reject) {
        let restaurant = {url: url};
        var options = {
            uri: url,
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        rp(options)
            .then(function ($) {
                restaurant.name = $('.shofi-place .shofi-infobox h3.title').text();
                restaurant.type = $('.shofi-place .top-links a').text();
                restaurant.address = $('.shofi-place .shofi-infobox div.bde-contact span.street').text() + ", " + $('.shofi-place .shofi-infobox div.bde-contact span.city').text();
                restaurant.phone = $('.shofi-place .shofi-infobox ul.bde-contact li.tel').children().last().text();
                restaurant.website = $('.shofi-place .shofi-infobox ul.bde-contact li.web').children().last().text();
                let location = JSON.parse($('.shofi-place .shofi-map .geomap')[0].attribs.rel);
                restaurant.location = {lat: location.center_lat, lon: location.center_lon};
                resolve(restaurant);
            })
            .catch(function (err) {
                // Crawling failed or Cheerio choked...
                reject(err);
            });
    });
};

function parseUrl(url) {
    return URL.parse(url);
}
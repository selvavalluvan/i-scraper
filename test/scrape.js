'use strict';
const should = require('should');
const berlinScrape = require("../lib/berlin");
const sampleBerlinUrl = 'https://www.berlin.de/restaurants/stadtteile/charlottenburg/';

describe('scraping', function () {
    it('should scrape and print', function (done) {
        this.timeout(10000);
        berlinScrape(sampleBerlinUrl, 2).then(function (restaurants) {
            restaurants.should.have.length(2);
            done();
        }).catch(err => {
            console.error(err);
            done(err);
        });
    });
});
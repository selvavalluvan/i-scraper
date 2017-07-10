// nodejs imports
const Promise = require('bluebird');

//i-scraper imports
const prompt = require('./prompt');
const berlinScrape = require('./berlin');
const write = require('./write');


module.exports = function () {
    prompt().bind({}).then(function (result) {
        this.input = result;
        return berlinScrape(result.url);
    }).then(function (restaurants) {
        if (this.input.format === 'json') {
            return write.json(this.input.output, restaurants);
        } else {
            console.log(restaurants);
            return null;
        }
    }).then(function (file) {
        if(file) console.log("Scraped results are successfully written to file "+file);
    }).catch(function (error) {
        console.error(error);
        console.error("Something went wrong! (Enable debug mode to see trace.)")
    });
}();

//'https://www.berlin.de/restaurants/stadtteile/charlottenburg/'
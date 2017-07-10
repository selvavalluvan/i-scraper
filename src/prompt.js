// nodejs imports
const Promise = require('bluebird');
const prompt = require('prompt');
prompt.message = 'i-scraper';

let schema = {
    properties: {
        url: {
            pattern: /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
            description: 'Provide an URL to scrape',
            message: 'Not a valid URL. Please refer to the example \n https://www.berlin.de/restaurants/stadtteile/charlottenburg/',
            required: true
        },
        format: {
            pattern: /(json|csv|tsv|stdout)/,
            description: 'Please provide the output format. Allowed formats: json / csv / tsv. Please pick one of the above',
            message: 'Not a valid format. Allowed formats: json / csv / tsv. Please pick one of the above.' ,
            required: true,
            default: 'json'
        },
        output: {
            pattern: /^[a-zA-Z1-9\s\-]+$/,
            description: 'Provide the name of the output file. Leave empty if you are not picky.',
            message: 'Invalid output name. Choose alphanumeric word. No special characters except "-". Example: berlin-restaurants',
            required: true,
            default: 'scraped'
        }
    }
};

module.exports = function () {
    return new Promise(function (resolve, reject) {
        try {
            // Start the prompt
            prompt.start();

            // Get two properties from the user: email, password
            prompt.get(schema, function (err, result) {
                resolve(result);
            });
        } catch (e) {
            reject(e);
        }
    });
};

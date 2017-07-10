// nodejs imports
const URL = require('url');

module.exports = {
    parseUrl: function (url) {
        return URL.parse(url);
    }
};
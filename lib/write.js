// nodejs imports
const Promise = require('bluebird');
const fs = require('fs-extra');

exports.json = function (name, data) {
    return new Promise(function (resolve, reject) {
        fs.outputJson(name + '.json', data).then(() => {
            resolve(name);
        }).catch(err => {
            reject(err);
        });
    });
};

// nodejs imports
const Promise = require('bluebird');
const fs = require('fs-extra');
const json2csv = require('json2csv');

exports.json = function (name, data) {
    return new Promise(function (resolve, reject) {
        fs.outputJson(name + '.json', data).then(() => {
            resolve(name);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.csv = function (name, data) {
    return new Promise(function (resolve, reject) {
        let fields = data[0].keys;
        json2csv({data: data, fields: fields, quotes: ''}, function (err, csv) {
            if (err) {
                reject(err);
                return;
            }
            fs.outputFile(name + '.csv', csv).then(() => {
                resolve(name);
            }).catch(err => {
                reject(err);
            });
        });
    });
};

exports.tsv = function (name, data) {
    return new Promise(function (resolve, reject) {
        let fields = data[0].keys;
        json2csv({data: data, fields: fields, del: '\t', quotes: ''}, function (err, tsv) {
            if (err) {
                reject(err);
                return;
            }
            fs.outputFile(name + '.tsv', tsv).then(() => {
                resolve(name);
            }).catch(err => {
                reject(err);
            });
        });
    });
};
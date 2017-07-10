'use strict';
const fs = require('fs-extra');
const write = require('../lib/write');
let directory = __dirname+'/out/';
let fileName = 'test123';
let sampleJson = {hello: 'world'};

describe('writing', function () {
    it('should write json to file', function (done) {
        write.json(directory+fileName, sampleJson).then(() => fs.readJson(directory+fileName+'.json'))
        .then(data => {
            data.should.eql(sampleJson);
            done();
        }).catch(err => {
            console.error(err);
            done(err);
        });
    });

    after(function(done) {
        console.log('Teardown starting!');
        fs.remove(directory)
            .then(() => {
                console.log('Teardown success!');
                done()
            });
    });
});
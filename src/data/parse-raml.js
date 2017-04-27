const raml = require('raml-parser');
const Q = require('q');
const fs = require('fs');
const path = require('path');
const URL = require('url-parse');

const Log = require('log');
const log = new Log('info');

const transform = require('./transform.js').transform;

function postEndpoints(relativeUrl, method) {
    return Object.keys(method.body).map(contentType => {
        return {
            path: relativeUrl,
            method: method.method,
            contentType: contentType,
        };

    });
}

function getEndpoints(relativeUrl, method) {
    const endpoints = method.responses[200].body;

    return Object.keys(endpoints).map(contentType => {

        return {
            path: relativeUrl,
            method: method.method,
            contentType: contentType,
            body: (endpoints[contentType] && endpoints[contentType].example) ? endpoints[contentType].example : {}
        };

    });
}

function parseRamlFile(fileName) {
    const deferred = Q.defer();

    raml.loadFile(fileName).then(function (data) {

        const baseUri = new URL(data.baseUri);

        let endpointsToMock = [];

        data.resources.forEach(resource => {
            resource.methods.forEach(method => {
                switch (method.method) {
                    case "get":
                        endpointsToMock = endpointsToMock.concat(getEndpoints(baseUri.pathname + resource.relativeUri, method));
                        break;
                    case "post":
                        endpointsToMock = endpointsToMock.concat(postEndpoints(baseUri.pathname + resource.relativeUri, method));
                        break;
                }

            });
        });

        log.info(`Successfully parsed ${fileName}`);
        deferred.resolve(endpointsToMock);
    }, function (error) {
        log.info("Error parsing " + fileName);
        deferred.reject('Error parsing: ' + error);
    });

    return deferred.promise;
}

function parseRaml(directory) {
    const deferred = Q.defer();

    if(!directory.endsWith("/")) {
        directory = directory + "/";
    }
    fs.readdir(directory, (err, files) => {
        Q.all(files.filter(file => file.match(/\.raml$/))
            .map(file => parseRamlFile(directory + file)))
            .then(arrayOfEndpoints => {
                deferred.resolve(transform([].concat.apply([], arrayOfEndpoints)));
            })
            .catch(error => {
                deferred.reject("Error Parsing: " + error);
            });
    });

    return deferred.promise;
}

exports.parseRaml = parseRaml;
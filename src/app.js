'use strict';

const express = require('express');
const app = express();

const parseRaml = require('./data/parse-raml.js').parseRaml;
const mockEndpointForApp = require('./http/mock-endpoint.js').mockEndpoint;

const Log = require('log');
const log = new Log('info');

function addEndpoints(directory) {
    const mockEndpoint = endpoint => mockEndpointForApp(app, endpoint);
    return parseRaml(directory)
        .then(endpoints => {
            endpoints.forEach(mockEndpoint);
        });
}

function setUpExpress(port, directory) {
    app.use(function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "*");
        next();
    });

    return addEndpoints(directory)
        .then(() => {
            return app.listen(port, function () {
                log.info(new Array(37).join('='));
                log.info(`READY! Server listening on port ${port}`);
                log.info(new Array(37).join('='));
            });
        });
}

module.exports = setUpExpress;
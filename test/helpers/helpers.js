var request = require('request');
var Q = require('q');

const port = 3000;

function get(path, mediaType) {
    var dfd = Q.defer();

    var options = {
        url: 'http://localhost:' + port + path,
        headers: {}
    };

    if (mediaType) {
        options.headers["Accept"] = mediaType;
    }

    request(options, function (error, response, body) {
        if (error) {
            return dfd.reject(error);
        }

        dfd.resolve(body);
    });

    return dfd.promise;
}

function post(path, mediaType, data) {
    var dfd = Q.defer();

    var options = {
        url: 'http://localhost:' + port + path,
        headers: {},
        body: JSON.stringify(data),
        method: 'POST'
    };

    if (mediaType) {
        options.headers["Content-Type"] = mediaType;
    }

    request(options, function (error, response) {
        if (error) {
            return dfd.reject(error);
        }

        dfd.resolve(response);
    });

    return dfd.promise;
}

module.exports = {
  serverRequester: {
      get: get,
      post: post
  },
};
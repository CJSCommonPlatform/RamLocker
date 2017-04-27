const Log = require('log');
const log = new Log('info');

function logEndpoint(method, path, contentType) {
    log.info(`Mocking ${method.toUpperCase()} requests to ${path} with content type ${contentType}`);
}

function mockGetEndpoint(app, endpointToMock) {
    endpointToMock.endpoints.forEach(endpoint => {
        logEndpoint(endpointToMock.method, endpointToMock.path, endpoint.contentType)
    });

    app.get(endpointToMock.path, (req, res) => {
        const payload = endpointToMock.endpoints.find(endpoint =>
            endpoint.contentType === req.get("Accept")
        );

        if (payload) {
            log.info(`GET to ${endpointToMock.path} (Accept ${req.get("Accept")})`);

            res.set("Content-Type", payload.contentType);
            res.send(payload.body);
        } else {
            res.status(404).end();
        }
    });
}

function mockPostEndpoint(app, endpointToMock) {
    endpointToMock.endpoints.forEach(endpoint => {
        logEndpoint(endpointToMock.method, endpointToMock.path, endpoint.contentType)
    });

    app.post(endpointToMock.path, (req, res) => {

        const payload = endpointToMock.endpoints.find(endpoint =>
            endpoint.contentType === req.get("Content-Type")
        );

        if (payload) {
            log.info(`POST to ${endpointToMock.path} (Content-Type ${req.get("Content-Type")})`);
            res.status(202).end();
        } else {
            res.status(404).end();
        }
    });
}

function mockEndpoint(app, endpointToMock) {
    console.log(endpointToMock.path);

    switch (endpointToMock.method.toLowerCase()) {
        case "get":
            mockGetEndpoint(app, endpointToMock);
            break;
        case "post":
            mockPostEndpoint(app, endpointToMock);
            break;
        default:
            log.warn("No method found for this endpoint (currently only support POST or GET)");
            break;
    }
}

exports.mockEndpoint = mockEndpoint;
const ramLocker = require('../../dist/app.js');
const serverRequester = require('../helpers/helpers.js').serverRequester;
const exampleJson = require('./raml/examples/example.json');

describe("The RAML Mocking server", () => {
    let server;

    beforeAll((done) => {
        ramLocker(3000, "./test/e2e/raml/")
            .then(app => {
                server = app;
                done();
            });
    });

    afterAll(() => {
        server.close();
    });

    it("should respond to GET requests", (done) => {
        serverRequester.get('/test/get-endpoint', 'application/json')
            .then(function (body) {
                const response = JSON.parse(body);
                expect(response).toEqual(exampleJson);
                done();
            });
    });

    it("should respond to POST requests", (done) => {
        serverRequester.post('/test/post-endpoint', 'application/json', exampleJson)
            .then(function (response) {
                expect(response.statusCode).toBe(202);
                done();
            });
    });

});
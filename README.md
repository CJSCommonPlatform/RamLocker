# RAMLocker

Construct a mock Express HTTP server based on a spec set out in RAML v0.8 files.

## Quickstart

### How to use on your project

To install ramlocker on your project, we recommend using NPM

`npm install --save-dev ramlocker`

You can then require the file into your file using your package manager of choice and start the server using the function this returns. On large projects, it can take a while to parse the RAML and construct the endpoints so this is an asynchronous process, that exposes a promise you can use to capture the server if, say, you want to shut it down.  

```javascript 
let app;
const ramLocker = require('ramlocker');

ramLocker($PORT, $PATH_TO_RAML).then(server => {
    app = server;
});
```

### How to develop on this project

Check out the code. The first time you do this you will need to install the dependencies

`npm install`

We currently have some smoke tests to ensure we don't break the fundamental HTTP requests. More tests are definitely on the todo list! You can run these using

`gulp test`

We'll use a fairly standard pull request model if you want to submit back to the project

## API

### ramlocker(port, pathToRaml) : Promise(Server)

The global export is a function that takes a port to run the server on, and a path to your raml directory. It will search at this level for RAML documentation.

It returns a promise that will resovle to an `http.Server` object.

## TODOs

### Functionality

* HTTP methods that are not GET or POST
* Custom HTTP status codes
* Mock response based on schema (using fakerJS) if no example is presented
* Wildcard content-types (application/*)
* Validation of request bodies against schema (for non-GET requests)
* Validate URL parameters based on data types
* Allow any RAML that fits v0.8 schema, not just those which are defined according to the motivating project schema

### Technically

* More granular e2e tests + unit tests
* Linter
* Run tests on check-in
* Move RAML parsing to a stream-based API to prevent passing all routes across in one promise
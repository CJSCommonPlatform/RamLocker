# RAMLocker

Construct a mock Express HTTP server based on a spec set out in RAML v0.8 files.

## Quickstart

### How to use on your project

Currently we have not set the project up with any library repository. 

If you check out the project into your codebase, you can depend directly on the app.js file

This is sufficient to start up your mock server
```javascript 
const ramLocker = require('$PATH_TO_DIST/app.js');

ramLocker($PORT, $PATH_TO_RAML);
```

### How to develop on this project

Check out the code. The first time you do this you will need to install the dependencies

`npm install`

We currently have some smoke tests to ensure we don't break the fundamental HTTP requests. More tests are definitely on the todo list! You can run these using

`gulp test`

We'll use a fairly standard pull request model

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
* Upload to NPM repo to allow users to 
* Linter
* Run tests on check-in
* Move RAML parsing to a stream-based API to prevent passing all routes across in one promise
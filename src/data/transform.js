function transform(endpointsToMock) {
    return endpointsToMock.reduce((acc, val) => {
        const existingEndpoint = acc.find((item) =>
            item.path === val.path.replace(/{(\w+)}/gi, ':$1') && item.method.toLowerCase() === val.method.toLowerCase()
        );

        if (!existingEndpoint) {

            const newEndpoint = {
                path: val.path.replace(/{(\w+)}/gi, ':$1'),
                method: val.method,
                endpoints: [{contentType: val.contentType}]
            };
            if (val.body) {
                newEndpoint.endpoints[0].body = val.body;
            }
            acc.push(newEndpoint);

        } else {
            const newEndpoint = {
                contentType: val.contentType
            };
            if(val.body) {
                newEndpoint.body = val.body
            };
            existingEndpoint.endpoints.push(newEndpoint);
        }

        return acc;
    }, []);
};

exports.transform = transform;

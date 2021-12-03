const parseRequestBody = (req, callback) => {
    const data = [];
    req.on('data', chunk => {
        data.push(chunk);
    });

    req.on('end', async () => {
        req.body = await Buffer.concat(data).toString();
        if (req.headers["content-type"] === "application/json") {
            req.body = JSON.parse(req.body);
        }
        callback();
    });
};

const eventHub = {
    startRouter(req, res, callback) {
        return function () {
            callback(req, res);
        }    
    }
}

module.exports = {
    parseRequestBody,
    eventHub,
}
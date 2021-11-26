const parseRequestBody = (req, res, callback) => {
    const data = [];
    req.on('data', chunk => {
        data.push(chunk);
    });

    req.on('end', async () => {
        req.body = await Buffer.concat(data).toString();
        if (req.headers["content-type"] === "application/json") {
            req.body = JSON.parse(req.body);
        }
        callback(req, res);
    });
};

const eventHub = {
    startRouter(req, res, callback) {
        callback(req, res);
    }
}

module.exports = {
    parseRequestBody,
    eventHub,
}
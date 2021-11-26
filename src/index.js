const http = require('http');
require('dotenv').config();
const { PROCESS_PORT, METHODS } = require('./common/constants');
const router = require('./router/router');
const { parseRequestBody, eventHub } = require('./utils/utils');

const server = http.createServer((req, res) => {
    const startCallback = eventHub.startRouter(req, res, router);
    if (req.method === METHODS.POST) {
        parseRequestBody(req, startCallback);
    } else {
        startCallback();
    }
});

server.listen(process.env[PROCESS_PORT] || 8000);

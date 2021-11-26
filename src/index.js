const http = require('http');
require('dotenv').config();
const { PROCESS_PORT } = require('./common/constants');
const router = require('./router/router');

const server = http.createServer((req, res) => {
    const readyRes = router(req, res);
    readyRes.end();
});

server.listen(process.PROCESS_PORT || 8000);

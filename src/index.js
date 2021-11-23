const http = require('http');
require('dotenv').config();
const { PROCESS_PORT } = require('./common/constants');

const server = http.createServer((req, res) => {
    
});

server.listen(process.PROCESS_PORT || 8000);

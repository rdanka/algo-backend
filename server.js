const http = require('http');
const express = require('./rest.js')

const server = http.createServer(express);

server.listen(process.env.PORT);
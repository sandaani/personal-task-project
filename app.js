const http = require('http');

const HOSTNAME='localhost'
const PORT=9000

const server=http.createServer((req) => {});

server.listen(PORT, HOSTNAME, () => {
    console.log('server running on port ${PORT}')
})
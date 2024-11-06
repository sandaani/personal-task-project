const http = require('http');

const HOSTNAME='localhost'
const PORT=9000

const server=http.createServer((req, res) => {
    if (req.url.startsWith('/tasks')) {
        taskRoutes(req, res)
    } else {
        res.writeHead(404, 'Not Found', {'content-type': 'aplication/json'})
        res.end(Json.stringify( {
            message: 'sorry, page not found'
        }))
    }
});

server.listen(PORT, HOSTNAME, () => {
    console.log('server running on port ${PORT}')
})
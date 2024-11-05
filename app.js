const http = require('http');
const taskRoutes = require('./routes/taskRoutes');

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/tasks')) {
        taskRoutes(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

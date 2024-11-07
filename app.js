const http = require('http');
const taskRoutes = require('./routes/taskRoutes');
const { handleError } = require('./utils/errorHandler');

const PORT = 9000;

const server = http.createServer((req, res) => {
    try {
        if (req.url.startsWith('/tasks')) {
            taskRoutes(req, res);
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Route not found' }));
        }
    } catch (error) {
        handleError(error, res);
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

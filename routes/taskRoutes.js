const taskController = require('../controllers/taskControllers');

const taskRoutes = (req, res) => {
    if (req.method === 'GET' && req.url === '/tasks') {
        taskController.getTasks(req, res);
    } else if (req.method === 'POST' && req.url === '/tasks') {
        taskController.createTask(req, res);
    } else if (req.method === 'PUT' && req.url.startsWith('/tasks/')) {
        taskController.updateTask(req, res);
    } else if (req.method === 'DELETE' && req.url.startsWith('/tasks/')) {
        taskController.deleteTask(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

module.exports = taskRoutes;

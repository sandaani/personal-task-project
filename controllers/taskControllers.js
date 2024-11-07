const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const { readFile, writeFile } = require('../utils/fileHandler');
const filePath = path.join(__dirname, '../data/tasks.json');

// Helper function to read tasks from JSON file
const readTasks = () => readFile(filePath);

exports.getTasks = (req, res) => {
    const tasks = readTasks();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
};

exports.createTask = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Form submission error' }));
            return;
        }

        const tasks = readTasks();
        const newTask = { id: tasks.length + 1, ...fields, status: 'pending' };

        // Handle image upload if provided
        if (files.image) {
            const oldPath = files.image.path;
            const newPath = path.join(__dirname, '../uploads/', files.image.name);
            fs.renameSync(oldPath, newPath);
            newTask.image = `/uploads/${files.image.name}`;
        }

        tasks.push(newTask);
        writeFile(filePath, tasks);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newTask));
    });
};

exports.updateTask = (req, res) => {
    const taskId = parseInt(req.url.split('/').pop(), 10);
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Task not found' }));
        return;
    }

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Form submission error' }));
            return;
        }

        tasks[taskIndex] = { ...tasks[taskIndex], ...fields };

        if (files.image) {
            const oldPath = files.image.path;
            const newPath = path.join(__dirname, '../uploads/', files.image.name);
            fs.renameSync(oldPath, newPath);
            tasks[taskIndex].image = `/uploads/${files.image.name}`;
        }

        writeFile(filePath, tasks);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks[taskIndex]));
    });
};

exports.deleteTask = (req, res) => {
    const taskId = parseInt(req.url.split('/').pop(), 10);
    const tasks = readTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId);

    if (updatedTasks.length === tasks.length) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Task not found' }));
        return;
    }

    writeFile(filePath, updatedTasks);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Task deleted successfully' }));
};

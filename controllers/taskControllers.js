const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const { readFile, writeFile } = require('../utils/fileHandler');
const filePath = path.join(__dirname, '../data/tasks.json');

// Helper function to read tasks from JSON file
const readTasks = () => readFile(filePath);

// Get all tasks
exports.getTasks = (req, res) => {
    const tasks = readTasks();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
};

// Create a new task with optional image upload
exports.createTask = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error in form submission:', err);  // Log the error
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error in form submission' }));
            return;
        }

        console.log('Form Fields:', fields);  // Log the form fields
        console.log('Uploaded Files:', files);  // Log the uploaded files

        const tasks = readTasks();
        const newTask = { id: tasks.length + 1, ...fields, status: 'pending' };

        // Handle image upload if provided
        if (files.image && files.image.path) {
            const oldPath = files.image.path;
            const newPath = path.join(__dirname, '../uploads/', files.image.name);
            
            // Ensure the upload folder exists
            const uploadDir = path.join(__dirname, '../uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }

            // Rename the file to the new path
            fs.renameSync(oldPath, newPath);
            newTask.image = `/uploads/${files.image.name}`;
        }

        tasks.push(newTask);
        writeFile(filePath, tasks);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newTask));
    });
};

// Update an existing task by ID with optional image upload
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
            console.error('Error in form submission:', err);  // Log the error
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error in form submission' }));
            return;
        }

        console.log('Updated Form Fields:', fields);  // Log updated form fields
        console.log('Updated Files:', files);  // Log updated files

        // Update task details
        tasks[taskIndex] = { ...tasks[taskIndex], ...fields };

        // Handle image upload if provided
        if (files.image && files.image.path) {
            const oldPath = files.image.path;
            const newPath = path.join(__dirname, '../uploads/', files.image.name);
            
            // Ensure the upload folder exists
            const uploadDir = path.join(__dirname, '../uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }

            // Rename the file to the new path
            fs.renameSync(oldPath, newPath);
            tasks[taskIndex].image = `/uploads/${files.image.name}`;
        }

        writeFile(filePath, tasks);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks[taskIndex]));
    });
};

// Delete a task by ID
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

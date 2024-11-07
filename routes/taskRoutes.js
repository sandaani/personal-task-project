const { getTasks, CreateTask, updateTask, deleteTask } = require("../controllers/taskControllers");

const taskRoutes=(req, res) => {
    if (req.method === 'GET'){
        getTasks(req, res);
    } else if(req.method === 'POST'){
        CreateTask(req , res)
    } else if(req.method === 'PATCH'){
        updateTask(req, res)
    } else if (req.method === 'DELETE'){
        deleteTask(req , res)
    } else {
        res.WriteHead(404, 'data Not Found', { 'content-type': 'aplication/json'})
        res.end(JSON.stringify({
            message: "Unknown Method required."
        }))
    }
}

module.exports=taskRoutes;
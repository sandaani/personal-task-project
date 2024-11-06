const { getTasks } = require("../controllers/taskControllers");

const taskRoutes=(req, res) => {
    if (req.method === 'GET'){
        getTasks(req, res);
    } else if(req.method === 'POST'){
        createTask(req , res)
    } else if(req.method === 'PATCH'){
        updateTASK(req, res)
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
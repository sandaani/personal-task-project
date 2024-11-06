const taskRoutes=(req, res) => {
    if (req.method === 'GET'){
        getTasks(req, res);
    } else if(req.method === 'POST'){
        createTask(req , res)
    } else if(req.method === 'PATCH'){}
}
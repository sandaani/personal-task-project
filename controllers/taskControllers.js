const { readTasksfromfile } = require("../utils/fileHandler")

exports.getTasks=(req, res) => {
    const tasks=readTasksfromfile();
    res.writeHead(200, { 'content-type' : 'application/json'})
    res.end(JSON.stringify(tasks))

}
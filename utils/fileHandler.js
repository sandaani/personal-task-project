const fs=require('fs');
const path=require('path');

const filePath='./data/tasks.json';

exports.writeTasksToFile=(tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks))
}

exports.readTasksfromfile =() => {
    if (fs.existsSync(filePath)) {
        writeTasksToFile([])
        
    }

    const data=fs.readFileSync(filePath)
    return JSON.parse(data)

}
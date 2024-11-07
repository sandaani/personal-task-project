const fs = require('fs');

exports.readFile = (filePath) => {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]');
    } catch (error) {
        return [];
    }
};

exports.writeFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const app = require('./src/app'); // đường dẫn đúng đến file app.js
const process = require('process');

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
var path = require('path');

app.use(cors());

app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname+'/app.js'));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname+'/style.css'));
});
app.get('/favicon.png', (req, res) => {
    res.sendFile(path.join(__dirname+'/favicon.png'));
});

app.get('/download', (req,res) => {
    try {
        var URL = req.query.URL;

        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        ytdl(URL, {
            format: 'mp4',
            }).pipe(res);
    } catch(err) {
        next(err)
    }
});

// 404 Error
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

// Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});
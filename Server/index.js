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

app.get('/download', (req,res) => {

    var URL = req.query.URL;

    res.header('Content-Disposition', 'attachment; filename="video.mp4"');

    ytdl(URL, {
        format: 'mp4',
        quality: 'highestaudio'
        }).pipe(res);
});

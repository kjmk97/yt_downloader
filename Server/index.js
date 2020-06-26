const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const YoutubeMp3Downloader  = require('youtube-mp3-downloader');
const app = express();
var path = require('path');

app.use(cors());

app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/download', (req,res) => {

    var URL = req.query.URL;

    res.header('Content-Disposition', 'attachment; filename="video.mp4"');

    ytdl(URL, {
        format: 'mp4'
        }).pipe(res);
});

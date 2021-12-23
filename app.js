const path = require('path');
const fs = require('fs');
const execSync = require('child_process').execSync;
const audioconcat = require('audioconcat');

let audioPath = path.join(__dirname, 'AUDIO');
let outputPath = path.join(__dirname, 'OUTPUT');

audioFolder = fs.readdirSync(audioPath);

audioFolder.forEach(folder => {
  let wavPath = path.join(audioPath, folder);
  let songs = [];

  wavFolder = fs.readdirSync(wavPath);

  wavFolder.forEach((wav, i) => {
    let child = execSync(
      'ffmpeg.exe -i "' + wavPath + '\\' + wav + '" -acodec libmp3lame -b:a 320k "' + wavPath + '\\' + (i + 1) + '.mp3"',
    );

    songs.push(wavPath + '\\' + (i + 1) + '.mp3');
  });

  audioconcat(songs)
    .concat(outputPath + '\\' + folder + '.mp3')
    .on('start', function (command) {
      console.log('ffmpeg process started:', command);
    })
    .on('error', function (err, stdout, stderr) {
      console.error('Error:', err);
      console.error('ffmpeg stderr:', stderr);
    })
    .on('end', function (output) {
      console.error('Audio created in:', output);
    })
});

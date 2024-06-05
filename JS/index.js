document.addEventListener("DOMContentLoaded", function() {
    let back = document.getElementById('back');
    let playPauseButton = document.getElementById('playPause');
    let play = document.getElementById('play');
    let next = document.getElementById('next');
    let song = document.getElementById('audio');
    let progress = document.getElementById('progress');
    let songTitle = document.getElementById('song-title');
    let artist = document.getElementById('artist');
  

    
    let songs = [];
    let currentSongIndex = 0;

    // Função para carregar a música
    function loadSong(songIndex) {
        const songData = songs[songIndex];
        song.src = songData.src;
        songTitle.textContent = songData.title;
        artist.textContent = `Song by ${songData.artist}`;
        document.getElementById('img-player').src = songData.img;
        song.load();
    }

    // Carregar músicas de um arquivo JSON
    fetch('../media/songs.json')
        .then(response => response.json())
        .then(data => {
            songs = data;
            // Carrega a música inicial
            loadSong(currentSongIndex);
        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));

    song.onloadedmetadata = function() {
        progress.max = song.duration;
        progress.value = song.currentTime;
    }

    playPauseButton.addEventListener('click', function() {
        if (play.classList.contains("fa-pause")) {
            song.pause();
            play.classList.remove("fa-pause");
            play.classList.add("fa-play");
        } else {
            song.play();
            play.classList.add("fa-pause");
            play.classList.remove("fa-play");
        }
    });

    song.addEventListener('timeupdate', function() {
        progress.value = song.currentTime;
    });

    progress.addEventListener('input', function() {
        song.currentTime = progress.value;
    });

    song.addEventListener('ended', function() {
        play.classList.remove("fa-pause");
        play.classList.add("fa-play");
    });

    // Função para tocar a próxima música
    next.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        song.play();
        play.classList.add("fa-pause");
        play.classList.remove("fa-play");
    });

    // Função para tocar a música anterior
    back.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        song.play();
        play.classList.add("fa-pause");
        play.classList.remove("fa-play");
    });
});


document.addEventListener("DOMContentLoaded", function() {
    let home = document.getElementById('home');
    home.addEventListener('click', function() {
        window.location.href = "/";
    });
});

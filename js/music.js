// js/music.js

let player;
const VIDEO_ID = "yjuImlE3-LQ"; // your song
const START_TIME = 10;

// prevent multiple inits
if (!window.__musicInitialized) {
  window.__musicInitialized = true;

  window.onYouTubeIframeAPIReady = function () {
    if (player) return;

    player = new YT.Player("yt-player", {
      height: "0",
      width: "0",
      videoId: VIDEO_ID,
      playerVars: {
        start: START_TIME,
        autoplay: 0,
        controls: 0,
        loop: 1,
        playlist: VIDEO_ID,
      },
      events: {
        onReady: onPlayerReady,
      },
    });
  };

  function onPlayerReady() {
    // only play if user already tapped Start
    const shouldPlay = localStorage.getItem("musicStarted");
    if (shouldPlay === "true") {
      player.seekTo(START_TIME);
      player.playVideo();
    }
  }

  // load API once
  if (!document.getElementById("yt-api")) {
    const tag = document.createElement("script");
    tag.id = "yt-api";
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
}

// called manually after Start
window.startMusic = function () {
  localStorage.setItem("musicStarted", "true");
  if (player) {
    player.seekTo(START_TIME);
    player.playVideo();
  }
};

let player;
const VIDEO_ID = "yjuImlE3-LQ"; // song
const START_TIME = 10; // 0:10

function enableMusic() {
  localStorage.setItem("musicAllowed", "true");
  loadYouTubeAPI();
}

function loadYouTubeAPI() {
  if (window.YT && window.YT.Player) {
    onYouTubeIframeAPIReady();
    return;
  }

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}

function onYouTubeIframeAPIReady() {
  if (player) return;

  player = new YT.Player("yt-player", {
    height: "0",
    width: "0",
    videoId: VIDEO_ID,
    playerVars: {
      autoplay: 1,
      start: START_TIME,
      loop: 1,
      playlist: VIDEO_ID,
      controls: 0
    },
    events: {
      onReady: (e) => {
        if (localStorage.getItem("musicAllowed") === "true") {
          e.target.seekTo(START_TIME);
          e.target.playVideo();
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("musicAllowed") === "true") {
    loadYouTubeAPI();
  }
});

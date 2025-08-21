document.addEventListener("DOMContentLoaded", () => {
  // ----- SPA Navigation -----
  const pages = document.querySelectorAll("[data-page]");
  const navButtons = document.querySelectorAll("[data-nav-to]");

  function showPage(id) {
    pages.forEach(page => (page.hidden = true));
    const target = document.getElementById(id);
    if (target) target.hidden = false;
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-nav-to");
      showPage(id);
    });
  });

  showPage("front"); // start on front page

  // ----- DRAWINGS CAROUSEL -----
let drawings = []; // start empty
let currentIndex = 0;

const imgElement = document.querySelector(".drawing-img");
const drawingPrevBtn = document.getElementById("prev-drawing");
const drawingNextBtn = document.getElementById("next-drawing");

// Fetch all drawings from the server
fetch("/drawings")
  .then(res => res.json())
  .then(files => {
    drawings = files;
    if (drawings.length > 0) showDrawing(currentIndex);
  })
  .catch(err => console.error(err));

function showDrawing(index) {
  imgElement.src = drawings[index];
  imgElement.alt = `Drawing ${index + 1}`;
}

// Add event listeners to the buttons
drawingPrevBtn.addEventListener("click", () => {
  if (drawings.length === 0) return;
  currentIndex = (currentIndex - 1 + drawings.length) % drawings.length;
  showDrawing(currentIndex);
});

drawingNextBtn.addEventListener("click", () => {
  if (drawings.length === 0) return;
  currentIndex = (currentIndex + 1) % drawings.length;
  showDrawing(currentIndex);
});

  // ----- MUSIC BAR + SPLASH -----
  const splash = document.getElementById("splash-screen");
  const enterBtn = document.getElementById("enter-btn");
  const audio = document.getElementById("global-audio");
  const playBtn = document.getElementById("play-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  const trackInfo = document.getElementById("track-info");

  const tracks = [
    "assets/music/hola amiguito.wav",
    "assets/music/2.wav"
  ];
  let currentTrack = 0;

function loadTrack(index) {
  audio.src = tracks[index];
  audio.play().catch(err => console.log("Autoplay blocked:", err));

  // Extract file name without extension
  const fullPath = tracks[index];                      // e.g., "assets/music/hello world.wav"
  const fileName = fullPath.split("/").pop().split(".")[0]; // "hello world"

  // Update the span inside #track-info for scrolling
  trackInfo.innerHTML = `<span>♪ You're listening to "${fileName}"</span>`;
  
  // Restart scrolling animation
  const trackSpan = trackInfo.querySelector("span");
  trackSpan.style.animation = "none";            // stop current animation
  void trackSpan.offsetWidth;                    // force reflow
  trackSpan.style.animation = "scrollText 30s linear infinite"; // restart animation
}
  // Splash button -> hide splash + play music
  enterBtn.addEventListener("click", () => {
    splash.style.display = "none";
    audio.play().catch(err => console.log("Playback blocked:", err));
  });

  // Controls
  playBtn.addEventListener("click", () => audio.play());
  pauseBtn.addEventListener("click", () => audio.pause());

  nextBtn.addEventListener("click", () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
  });

  prevBtn.addEventListener("click", () => {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
  });

  // Auto-play next track when current ends
  audio.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
  });

  // Load first track on page load
  loadTrack(currentTrack);
});
document.addEventListener("DOMContentLoaded", () => {
  // ----- SPA Navigation -----
  const pages = document.querySelectorAll("[data-page]");
  const navButtons = document.querySelectorAll("[data-nav-to]");

  function showPage(id) {
    pages.forEach(page => page.hidden = true);
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
  const drawings = [
    "https://via.placeholder.com/400x300?text=Drawing+1",
    "https://via.placeholder.com/400x300?text=Drawing+2",
    "https://via.placeholder.com/400x300?text=Drawing+3"
  ];

  let currentIndex = 0;

  const imgElement = document.querySelector(".drawing-img");
  const prevBtn = document.getElementById("prev-drawing");
  const nextBtn = document.getElementById("next-drawing");

  function showDrawing(index) {
    imgElement.src = drawings[index];
    imgElement.alt = `Drawing ${index + 1}`;
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + drawings.length) % drawings.length;
    showDrawing(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % drawings.length;
    showDrawing(currentIndex);
  });
});

    // Music Bar //
document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash-screen");
  const enterBtn = document.getElementById("enter-btn");
  const audio = document.getElementById("global-audio");
  
  enterBtn.addEventListener("click", () => {
    splash.style.display = "none"; // hide splash
    audio.play().catch(err => console.log("Playback blocked:", err)); // start music
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("global-audio");
  const playBtn = document.getElementById("play-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  const trackInfo = document.getElementById("track-info");

  const tracks = [
    "assets/music/1.wav",
    "assets/music/2.wav"
  ];
  let currentTrack = 0;

  function loadTrack(index) {
    audio.src = tracks[index];
    audio.play().catch(err => console.log("Autoplay blocked:", err));
    trackInfo.textContent = `Track ${index + 1} of ${tracks.length}`;
  }

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
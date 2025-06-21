const epubUrl = "https://standardebooks.org/ebooks/lewis-carroll/alice-s-adventures-in-wonderland/downloads/lewis-carroll_alice-s-adventures-in-wonderland.epub";


const book = ePub(epubUrl);
const rendition = book.renderTo("epub-reader", {
  width: "100%",
  height: "100%",
  flow: "paginated"
});

rendition.display();

// Font size control
const fontSizeInput = document.getElementById("font-size");
fontSizeInput.addEventListener("input", (e) => {
  const size = e.target.value + "px";
  rendition.themes.fontSize(size);
});

// Theme toggle
const themeSelector = document.getElementById("theme-selector");
themeSelector.addEventListener("change", (e) => {
  const theme = e.target.value;
  document.body.className = theme;

  if (theme === "dark") {
    rendition.themes.register("dark", {
      body: { background: "#111", color: "#eee" },
      "::selection": { background: "#444" }
    });
    rendition.themes.select("dark");
  } else if (theme === "sepia") {
    rendition.themes.register("sepia", {
      body: { background: "#f4ecd8", color: "#5b4636" }
    });
    rendition.themes.select("sepia");
  } else {
    rendition.themes.select(null);
  }
});

// Swipe support
let startX = 0;
const readerEl = document.getElementById("epub-reader");

readerEl.addEventListener("touchstart", (e) => {
  startX = e.changedTouches[0].screenX;
});

readerEl.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].screenX - startX;
  if (dx > 50) rendition.prev();
  else if (dx < -50) rendition.next();
});

// Progress bar
book.ready.then(() => {
  const progressBar = document.getElementById("progress-bar");

  rendition.on("relocated", (location) => {
    const percentage = book.locations.percentageFromCfi(location.start.cfi);
    progressBar.style.width = `${Math.round(percentage * 100)}%`;
  });

  return book.locations.generate(1600);
});

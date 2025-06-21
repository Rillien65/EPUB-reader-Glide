// Set your public EPUB URL here (must have CORS enabled)
const epubUrl = "https://s3.amazonaws.com/moby-dick/moby-dick.epub";

const book = ePub(epubUrl);
const rendition = book.renderTo("epub-reader", {
  width: "100%",
  height: "100%",
  flow: "paginated", // or "scrolled" for vertical scrolling
});

rendition.display();

// Font size control
const fontSizeSlider = document.getElementById("font-size");
fontSizeSlider.addEventListener("input", (e) => {
  rendition.themes.fontSize(`${e.target.value}px`);
});

// Dark mode toggle
const themeToggle = document.getElementById("theme-toggle");
let dark = false;

themeToggle.addEventListener("click", () => {
  dark = !dark;
  document.body.classList.toggle("dark", dark);

  if (dark) {
    rendition.themes.register("dark", {
      body: {
        background: "#111",
        color: "#eee"
      },
      "::selection": {
        background: "#444"
      }
    });
    rendition.themes.select("dark");
  } else {
    rendition.themes.select(null);
  }
});

// Optional: Swipe navigation support for touch devices
let touchStartX = 0;
const readerArea = document.getElementById("epub-reader");

readerArea.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

readerArea.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  if (dx > 50) rendition.prev();
  if (dx < -50) rendition.next();
});

// Optional: Simple comment system (only in-page)
const form = document.getElementById("comment-form");
const commentBox = document.getElementById("comment");
const comments = document.getElementById("comments");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = commentBox.value.trim();
  if (text !== "") {
    const p = document.createElement("p");
    p.textContent = text;
    comments.appendChild(p);
    commentBox.value = "";
  }
});


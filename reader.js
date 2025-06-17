// Get EPUB URL from query string
const params = new URLSearchParams(window.location.search);
const epubUrl = decodeURIComponent(params.get("epubUrl"));
const bookId = btoa(epubUrl); // Safe unique key for localStorage

if (!epubUrl) {
  alert("No EPUB file URL provided!");
} else {
  const book = ePub(epubUrl);
  const rendition = book.renderTo("epub-reader", {
    width: "100%",
    height: "100%",
    flow: "scrolled-doc"
  });

  // Display saved location if exists
  const lastLocation = localStorage.getItem(`location-${bookId}`);
  if (lastLocation) {
    rendition.display(lastLocation);
  } else {
    rendition.display();
  }

  // Save new location
  rendition.on("relocated", (location) => {
    localStorage.setItem(`location-${bookId}`, location.start.cfi);
  });

  // Font size control
  const fontSlider = document.getElementById("font-size");
  fontSlider.addEventListener("input", () => {
    const size = fontSlider.value + "px";
    rendition.themes.fontSize(size);
  });

  // Dark/Light mode toggle
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", () => {
    const dark = document.body.classList.toggle("dark");
    rendition.themes.default({
      body: {
        background: dark ? "#111" : "#fff",
        color: dark ? "#eee" : "#111"
      }
    });
  });

  // Comments
  const commentForm = document.getElementById("comment-form");
  const commentBox = document.getElementById("comments");
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = document.getElementById("comment").value;
    if (!text) return;
    const existing = JSON.parse(localStorage.getItem(`comments-${bookId}`)) || [];
    existing.push({ time: new Date().toISOString(), text });
    localStorage.setItem(`comments-${bookId}`, JSON.stringify(existing));
    displayComments(existing);
    commentForm.reset();
  });

  function displayComments(list) {
    commentBox.innerHTML = "";
    list.forEach((c) => {
      const item = document.createElement("div");
      item.textContent = `[${new Date(c.time).toLocaleString()}] ${c.text}`;
      commentBox.appendChild(item);
    });
  }

  // Load comments
  const savedComments = JSON.parse(localStorage.getItem(`comments-${bookId}`)) || [];
  displayComments(savedComments);
}

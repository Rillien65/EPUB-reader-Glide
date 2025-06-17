const params = new URLSearchParams(window.location.search);
const epubUrl = decodeURIComponent(params.get('epubUrl'));

if (!epubUrl) {
  alert("No EPUB file URL provided!");
} else {
  const book = ePub(epubUrl);
  const rendition = book.renderTo("epub-reader", {
    width: "100%",
    height: "100%",
    flow: "scrolled-doc",
    spread: "auto",
  });
  rendition.display();

  const key = `epub-location-${epubUrl}`;
  const saved = localStorage.getItem(key);
  if (saved) rendition.display(saved);

  rendition.on("relocated", function (location) {
    localStorage.setItem(key, location.start.cfi);
  });
}

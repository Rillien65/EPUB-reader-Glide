document.addEventListener("DOMContentLoaded", () => {
  const book = ePub("https://yourfirebaseurl.com/book.epub");
  const rendition = book.renderTo("epub-reader", {
    width: "100%",
    height: "100%",
  });

  rendition.display();

  // Optional: Add swipe navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") book.nextPage();
    if (e.key === "ArrowLeft") book.prevPage();
  });
});

const options = {
  root: null,
  rootMargin: "500px",
  // threshold: 0.5, // Trigger when img is 50% visible
};

let video_observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry.target);
      // This collapsible is now visible, load the video
      const video = entry.target;
      let source = video.querySelector("source");
      source.src = source.dataset.src;
      video.load();

      // Optionally, unobserve the collapsible after loading the video
      observer.unobserve(entry.target);
    }
  });
}, options);

let img_observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry.target);
      // This collapsible is now visible, load the image
      const img = entry.target;
      img.src = img.dataset.src;

      // Optionally, unobserve the collapsible after loading the image
      observer.unobserve(entry.target);
    }
  });
}, options);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("video").forEach((video) => {
    if (video.querySelector("source").dataset.src === undefined) return;
    video_observer.observe(video);
  });
  document.querySelectorAll("img").forEach((img) => {
    if (img.dataset.src === undefined) return;
    img_observer.observe(img);
  });
});

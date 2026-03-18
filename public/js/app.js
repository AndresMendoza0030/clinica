document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".sede-btn");
  const map = document.getElementById("clinic-map");

  if (!buttons.length || !map) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      map.src = button.dataset.map;
    });
  });
});
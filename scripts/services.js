export function initializeServices() {
  document.querySelectorAll(".service").forEach((service) => {
    service.addEventListener("focusin", () => service.classList.add("is-focused"));
    service.addEventListener("focusout", () => service.classList.remove("is-focused"));
  });
}

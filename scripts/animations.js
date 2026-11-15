export function initializeAnimations() {
  const startupRevealElements = document.querySelectorAll(".startup-reveal");
  if (startupRevealElements.length) {
    const revealStartupElement = (element) => element.classList.add("is-visible");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      startupRevealElements.forEach(revealStartupElement);
    } else {
      const startupObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealStartupElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      startupRevealElements.forEach((element) => startupObserver.observe(element));
    }
  }
  const workflowRevealElements = document.querySelectorAll(".workflow-reveal");
  if (workflowRevealElements.length) {
    const revealWorkflowElement = (element) => element.classList.add("is-visible");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      workflowRevealElements.forEach(revealWorkflowElement);
    } else {
      const workflowObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealWorkflowElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      workflowRevealElements.forEach((element) => workflowObserver.observe(element));
    }
  }
  const revealElements = document.querySelectorAll(".product-reveal");
  if (revealElements.length) {
    const revealProductElement = (element) => element.classList.add("is-visible");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealElements.forEach(revealProductElement);
    } else {
      const productObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealProductElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealElements.forEach((element) => productObserver.observe(element));
    }
  }
  document.querySelectorAll(".capability-composition").forEach((composition) => {
    const connectionPaths = [
      "M365 278H420V245Q420 200 455 200H315",
      "M365 372H420V400Q420 445 455 445H315",
      "M835 278H780V245Q780 200 745 200H885",
      "M835 372H780V400Q780 445 745 445H885",
      "M600 478V580",
    ];
    const reveal = () => {
      const svg = composition.querySelector(".capability-connectors");
      if (svg && !svg.dataset.enhanced) {
        svg.querySelectorAll(".flow-dot").forEach((dot) => dot.remove());
        const paths = [...svg.querySelectorAll("path")];
        paths.forEach((path, index) => {
          path.setAttribute("d", connectionPaths[index]);
          const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          const motion = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
          dot.setAttribute("class", "flow-dot");
          dot.setAttribute("r", "4");
          motion.setAttribute("dur", `${3.6 + index * 0.18}s`);
          motion.setAttribute("begin", `${0.9 + index * 0.12}s`);
          motion.setAttribute("repeatCount", "indefinite");
          motion.setAttribute("path", connectionPaths[index]);
          dot.append(motion);
          svg.append(dot);
          [0, 1].forEach((position) => {
            const node = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            const length = path.getTotalLength() * position;
            const point = path.getPointAtLength(length);
            node.setAttribute("class", "connector-node");
            node.setAttribute("r", position ? "3" : "4");
            node.setAttribute("cx", point.x);
            node.setAttribute("cy", point.y);
            svg.append(node);
          });
        });
        svg.dataset.enhanced = "true";
      }
      composition.classList.add("is-visible");
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        reveal();
        currentObserver.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(composition);
  });
}

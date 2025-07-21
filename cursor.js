// cursor.js

const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
// We've added .lightbox-trigger to the list of interactive elements
const interactiveElements = document.querySelectorAll("a, button, .product-card, .lightbox-trigger");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

interactiveElements.forEach(el => {
    el.addEventListener("mouseover", () => {
        cursorOutline.classList.add('grow');
    });
    el.addEventListener("mouseleave", () => {
        cursorOutline.classList.remove('grow');
    });
});
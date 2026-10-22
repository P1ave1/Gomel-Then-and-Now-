// всегда стартуем с самого верха (видео-секция)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';   // отключаем «запоминание» позиции браузером
}

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// на всякий случай — и до load тоже
window.scrollTo(0, 0);

const butSvg = document.querySelector("#but_svg");
if (butSvg) {
    let rotated = false; // false = 0°, true = 180°

    butSvg.onclick = () => {
        // визуальные классы оверлея (как было)
        document.querySelector("#section").classList.toggle("active");
        document.querySelector("#video").classList.toggle("animated");
        document.querySelector("#h1").classList.toggle("active");
        document.querySelector("#p1").classList.toggle("active");
        document.querySelector("#but_start").classList.toggle("active");

        // переключение 0° ↔ 180°
        rotated = !rotated;
        butSvg.style.transition = "transform 0.5s ease";
        butSvg.style.transform = rotated ? "rotate(180deg)" : "rotate(0deg)";
    };
}

const footerBtn = document.querySelector("body footer");
const videoSection = document.querySelector("#article");   // видео-секция

if (footerBtn && videoSection) {
    function toggleFooter() {
        // как только видео-секция ушла из вида — показываем стрелку
        const rect = videoSection.getBoundingClientRect();
        const videoGone = rect.bottom <= 0;   // видео полностью ушло вверх

        footerBtn.classList.toggle("visible", videoGone);
    }

    window.addEventListener("scroll", toggleFooter, { passive: true });
    toggleFooter(); // проверка при загрузке
}